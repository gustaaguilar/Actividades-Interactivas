// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: portada, video, unir, recta, ordenar,
//  explica (narración animada), antpos (anterior/posterior), cierre
// ============================================================
(function () {
  "use strict";
  const D = DATOS;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const barajar = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const COLORES = ["#ef5350", "#ff8a3d", "#f4b400", "#2fb86b", "#26a6c9", "#2b7de9", "#9b6cf0", "#e05fb0", "#8d6e63", "#00a88f"];

  // ---------------- ESTADO ----------------
  const E = { idx: 0, aciertos: 0, errores: 0, puntos: 0, completa: false, estado: {} };

  // ---------------- AUDIO (cola global) ----------------
  const A = { cola: [], sonando: false, gen: 0, actual: null, esperas: [], faltantes: {} };

  function textoDe(id) { return D.audios[id] || ""; }

  function tts(texto, gen, listo) {
    // Respaldo: voz del navegador cuando el mp3 todavía no existe
    let hecho = false;
    const fin = () => { if (hecho) return; hecho = true; if (gen === A.gen) listo(); };
    try {
      if (!("speechSynthesis" in window) || !texto) { setTimeout(fin, 300); return; }
      const u = new SpeechSynthesisUtterance(texto.replace(/[¡!¿?]/g, m => (m === "!" || m === "?") ? m : ""));
      u.lang = "es-AR"; u.rate = 0.95;
      const voces = speechSynthesis.getVoices();
      const v = voces.find(x => /es[-_]AR/i.test(x.lang)) || voces.find(x => /^es/i.test(x.lang));
      if (v) u.voice = v;
      u.onend = fin; u.onerror = fin;
      speechSynthesis.speak(u);
      setTimeout(fin, 1500 + texto.length * 110); // seguro por si onend no llega
    } catch (e) { setTimeout(fin, 300); }
  }

  function siguienteAudio() {
    const gen = A.gen;
    if (!A.cola.length) {
      A.sonando = false; A.actual = null;
      const w = A.esperas; A.esperas = [];
      w.forEach(f => f());
      actualizarSiguiente();
      return;
    }
    A.sonando = true;
    const id = A.cola.shift();
    const cont = () => { if (gen === A.gen) siguienteAudio(); };
    if (A.faltantes[id] || typeof Audio === "undefined") { tts(textoDe(id), gen, cont); return; }
    let a;
    try { a = new Audio("audio/" + id + ".mp3"); } catch (e) { tts(textoDe(id), gen, cont); return; }
    A.actual = a;
    let resuelto = false;
    const usarTTS = () => { if (resuelto) return; resuelto = true; A.faltantes[id] = true; tts(textoDe(id), gen, cont); };
    a.onended = () => { if (resuelto) return; resuelto = true; cont(); };
    a.onerror = usarTTS;
    const p = a.play();
    if (p && p.catch) p.catch(usarTTS);
  }

  function hablar(ids) { // encola (no corta lo que suena)
    ids = [].concat(ids).filter(Boolean);
    if (!ids.length) return;
    A.cola.push(...ids);
    if (!A.sonando) siguienteAudio();
    actualizarSiguiente();
  }
  function callar() {
    A.gen++; A.cola = []; A.sonando = false; A.esperas = [];
    if (A.actual) { try { A.actual.pause(); } catch (e) {} A.actual = null; }
    try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch (e) {}
  }
  function decir(ids) { callar(); hablar(ids); } // corta y dice (toques del alumno)
  function alTerminarAudio(f) { if (!A.sonando && !A.cola.length) f(); else A.esperas.push(f); }

  // efectos cortos por código (sin archivos)
  let ctx = null;
  function tono(frecs, tipo, dur) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      frecs.forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = tipo; o.frequency.value = f;
        const t = ctx.currentTime + i * dur;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur + 0.02);
      });
    } catch (e) {}
  }
  const sonidoOk = () => tono([660, 880, 1175], "sine", 0.11);
  const sonidoError = () => tono([220, 180], "square", 0.14);

  // ---------------- UTILIDADES DE PANTALLA ----------------
  function ico(key, px) {
    const info = D.imagenes[key] || { archivo: "", emoji: "❓" };
    const s = el("span", "ico");
    if (px) { s.style.width = px + "px"; s.style.height = px + "px"; }
    const img = new Image();
    img.alt = key; img.draggable = false;
    img.onerror = () => {
      const e = el("span", "emo", info.emoji);
      img.replaceWith(e);
      let intentos = 0;
      const medir = () => { const t = Math.min(s.clientWidth, s.clientHeight) || px; if (t) e.style.fontSize = Math.round(t * 0.8) + "px"; else if (intentos++ < 30) requestAnimationFrame(medir); };
      medir();
    };
    img.src = info.archivo;
    s.appendChild(img);
    return s;
  }
  function tamIco(s, px) {
    s.style.width = px + "px"; s.style.height = px + "px";
    const e = s.querySelector(".emo"); if (e) e.style.fontSize = Math.round(px * 0.8) + "px";
  }
  function consigna(p) {
    const c = el("div", "consigna");
    c.appendChild(el("span", null, p.texto || ""));
    if (p.instruccion) {
      const b = el("button", null, "🔊"); b.title = "Escuchar de nuevo";
      b.onclick = () => { bloquear(); hablar(p.instruccion); alTerminarAudio(desbloquear); };
      c.appendChild(b);
    }
    return c;
  }
  const P = () => $("#pantalla");
  function bloquear() { P().classList.add("bloq"); }
  function desbloquear() { P().classList.remove("bloq"); }
  function instruccion(p) {
    if (!p.instruccion) return;
    bloquear(); hablar(p.instruccion); alTerminarAudio(desbloquear);
  }
  function evaluar(item, ok) {
    if (item.evaluado) return;
    item.evaluado = true;
    if (ok) { E.aciertos++; E.puntos += 10; } else E.errores++;
    $("#puntos").textContent = "⭐ " + E.puntos;
  }
  function completar() { E.completa = true; actualizarSiguiente(); }
  function actualizarSiguiente() {
    const p = D.pantallas[E.idx];
    const b = $("#btnSiguiente");
    if (!p || !b) return;
    b.disabled = p.tipo === "video" ? false : !(E.completa && !A.sonando && !A.cola.length);
  }
  let alRedimensionar = null;
  window.addEventListener("resize", () => { if (alRedimensionar) alRedimensionar(); });
  window.addEventListener("orientationchange", () => setTimeout(() => { if (alRedimensionar) alRedimensionar(); }, 300));

  // ---------------- NAVEGACIÓN ----------------
  function ir(i) {
    callar();
    if (i < 0 || i >= D.pantallas.length) return;
    E.idx = i; E.completa = false; E.estado = {}; alRedimensionar = null;
    const p = D.pantallas[i];
    const cont = P();
    cont.innerHTML = ""; cont.className = ""; desbloquear();
    $("#titulo").textContent = p.titulo || D.meta.titulo;
    $("#progreso div").style.width = (i / (D.pantallas.length - 1) * 100) + "%";
    $("#pie").style.display = (p.tipo === "portada" || p.tipo === "cierre" || p.tipo === "video") ? "none" : "flex";
    const r = RENDER[p.tipo];
    if (r) r(p, cont); else cont.appendChild(el("div", "consigna", "Pantalla sin tipo: " + p.tipo));
    actualizarSiguiente();
  }

  // ---------------- FIRMA / LIGHTBOX ----------------
  function firma() {
    const f = el("div", "firma");
    const foto = el("div", "foto");
    const img = new Image(); img.alt = "Profe Gustavo Aguilar";
    img.onerror = () => { foto.textContent = "👨‍🏫"; };
    img.src = D.meta.foto; foto.appendChild(img);
    foto.onclick = abrirLightbox;
    f.appendChild(foto);
    f.appendChild(el("div", null, D.meta.firma + "<br>✉️ " + D.meta.mail));
    return f;
  }
  function abrirLightbox() {
    const lb = $("#lightbox"), img = $("#lightbox img");
    img.src = D.meta.foto; img.style.transform = ""; img.dataset.z = "0";
    $("#lightbox .frase").textContent = D.meta.frase;
    lb.classList.add("abierto");
  }
  function initLightbox() {
    const lb = $("#lightbox"), img = $("#lightbox img");
    img.onclick = ev => {
      if (img.dataset.z === "1") { img.style.transform = ""; img.dataset.z = "0"; img.style.cursor = "zoom-in"; return; }
      const r = img.getBoundingClientRect();
      img.style.transformOrigin = ((ev.clientX - r.left) / r.width * 100) + "% " + ((ev.clientY - r.top) / r.height * 100) + "%";
      img.style.transform = "scale(2.3)"; img.dataset.z = "1"; img.style.cursor = "zoom-out";
    };
    $("#lightbox .cerrar").onclick = () => { lb.classList.remove("abierto"); img.style.transform = ""; img.dataset.z = "0"; };
  }

  // ---------------- RENDERIZADORES ----------------
  const RENDER = {};

  RENDER.portada = (p, c) => {
    c.classList.add("portada");
    c.appendChild(el("h1", null, D.meta.titulo));
    if (D.meta.lema) c.appendChild(el("div", "lema", D.meta.lema));
    c.appendChild(el("h2", null, D.meta.subtitulo));
    const h = el("div", "heroimg"); h.appendChild(ico(D.meta.portada)); c.appendChild(h);
    const fila = el("div", "filaPortada");
    const b = el("button", "btn azul", "▶ Comenzar");
    b.onclick = () => { try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} ir(E.idx + 1); };
    fila.appendChild(b); fila.appendChild(firma());
    c.appendChild(fila);
  };

  RENDER.video = (p, c) => {
    c.appendChild(consigna(p));
    const caja = el("div", "videoCaja");
    const f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + p.videoId + "?rel=0&modestbranding=1&playsinline=1";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    f.allowFullscreen = true; f.title = "Video";
    caja.appendChild(f); c.appendChild(caja);
    const a = el("a", "linkYT", "↗ Si el video no se ve, tocá acá para abrirlo en YouTube");
    a.href = "https://youtu.be/" + p.videoId; a.target = "_blank"; a.rel = "noopener";
    c.appendChild(a);
    // botón Siguiente pegado debajo del video (no depende del pie de página)
    const sig = el("button", "btn", "Siguiente ➜"); sig.style.marginTop = "6px";
    sig.onclick = () => ir(E.idx + 1);
    c.appendChild(sig);
    $("#pie").style.display = "none";
    function medir() {
      const libre = c.clientHeight - c.firstChild.offsetHeight - a.offsetHeight - sig.offsetHeight - 50;
      let w = Math.min(c.clientWidth * 0.96, Math.max(160, libre) * 16 / 9);
      caja.style.width = Math.round(w) + "px"; caja.style.height = Math.round(w * 9 / 16) + "px";
    }
    alRedimensionar = medir; medir();
    E.completa = true;
    hablar(p.instruccion); // no bloquea: Siguiente queda siempre habilitado
  };

  RENDER.unir = (p, c) => {
    c.appendChild(consigna(p));
    const zona = el("div", "unir interactivo");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("class", "lineas");
    const izq = el("div", "colIzq"), der = el("div", "colDer");
    zona.append(svg, izq, der); c.appendChild(zona);
    const items = p.pares.map((par, k) => ({ par, color: COLORES[(par.n - 1) % COLORES.length], evaluado: false, hecho: false }));
    let sel = null; const lineas = [];
    const tarjetas = [];
    barajar(items).forEach(it => {
      const t = el("div", "tarjeta");
      for (let k = 0; k < it.par.cant; k++) t.appendChild(ico(it.par.imgs[k % it.par.imgs.length], 30));
      t.onclick = () => {
        if (it.hecho) return;
        tarjetas.forEach(x => x.el.classList.remove("sel"));
        sel = it; t.classList.add("sel"); decir(it.par.audio);
      };
      it.el = t; tarjetas.push(it); izq.appendChild(t);
    });
    const nums = {};
    p.pares.map(x => x.n).forEach(n => {
      const b = el("div", "numero", n); nums[n] = b;
      b.onclick = () => {
        if (b.classList.contains("hecha")) return;
        if (!sel) { decir(["n" + n, "e_elegi"]); return; }
        const it = sel;
        if (it.par.n === n) {
          evaluar(it, true); it.hecho = true; sel = null;
          it.el.classList.remove("sel"); it.el.classList.add("hecha", "pop");
          it.el.style.borderColor = it.color; it.el.style.background = it.color + "22";
          b.classList.add("hecha", "pop"); b.style.background = it.color; b.style.borderColor = it.color;
          lineas.push({ a: it.el, b, color: it.color }); dibujar();
          sonidoOk(); decir(it.par.ok);
          if (items.every(x => x.hecho)) { hablar(p.fin); completar(); }
        } else {
          evaluar(it, false); sonidoError();
          b.classList.remove("sacude"); void b.offsetWidth; b.classList.add("sacude");
          decir("e_contar");
        }
      };
      der.appendChild(b);
    });
    function dibujar() {
      const r = zona.getBoundingClientRect();
      const hz = zona.classList.contains("horizontal");
      svg.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
      svg.innerHTML = lineas.map(l => {
        const ra = l.a.getBoundingClientRect(), rb = l.b.getBoundingClientRect();
        const x1 = hz ? ra.left + ra.width / 2 - r.left : ra.right - r.left, y1 = hz ? ra.bottom - r.top : ra.top + ra.height / 2 - r.top;
        const x2 = hz ? rb.left + rb.width / 2 - r.left : rb.left - r.left, y2 = hz ? rb.top - r.top : rb.top + rb.height / 2 - r.top;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${l.color}" stroke-width="5" stroke-linecap="round"/>` +
               `<circle cx="${x1}" cy="${y1}" r="6" fill="${l.color}"/><circle cx="${x2}" cy="${y2}" r="6" fill="${l.color}"/>`;
      }).join("");
    }
    function ajustar() {
      const rz = zona.getBoundingClientRect();
      zona.classList.toggle("horizontal", rz.width > rz.height * 1.35);
      tarjetas.forEach(it => {
        const t = it.el, n = it.par.cant;
        const w = t.clientWidth - 12, h = t.clientHeight - 8;
        let mejor = 10;
        for (let filas = 1; filas <= 5; filas++) {
          const cols = Math.ceil(n / filas);
          const s = Math.floor(Math.min((w - (cols - 1) * 2) / cols, (h - (filas - 1) * 2) / filas));
          if (s > mejor) mejor = s;
        }
        t.querySelectorAll(".ico").forEach(s => tamIco(s, Math.max(12, mejor)));
      });
      dibujar();
    }
    alRedimensionar = ajustar;
    requestAnimationFrame(ajustar);
    instruccion(p);
  };

  RENDER.recta = (p, c) => {
    c.appendChild(consigna(p));
    const recta = el("div", "recta interactivo");
    const rana = ico(p.img); rana.classList.add("ranaSalta");
    const linea = el("div", "linea");
    const cas = {};
    for (let n = p.desde; n <= p.hasta; n++) {
      const k = el("div", "casilla", n);
      if (p.ocultos.includes(n)) k.classList.add("vacia");
      cas[n] = k; linea.appendChild(k);
    }
    recta.append(rana, linea);
    const esc = el("div", "escena"); esc.style.width = "100%"; esc.style.marginTop = "auto"; esc.appendChild(recta);
    c.appendChild(esc);
    const items = p.ocultos.map(n => ({ n, evaluado: false }));
    let actual = 0;
    const fichas = el("div", "fichas interactivo"); fichas.style.marginBottom = "auto";
    c.appendChild(fichas);
    barajar(p.ocultos).forEach((n, k) => {
      const f = el("button", "ficha", n); f.style.background = COLORES[(n - 1) % COLORES.length];
      f.onclick = () => {
        const it = items[actual]; if (!it) return;
        if (n === it.n) {
          evaluar(it, true); sonidoOk();
          const k2 = cas[n]; k2.classList.remove("vacia", "titila"); k2.classList.add("lista", "pop");
          f.classList.add("usada"); saltar(n);
          actual++;
          if (actual < items.length) { cas[items[actual].n].classList.add("titila"); decir("n" + n); }
          else { decir(["n" + n, p.fin]); completar(); }
        } else {
          evaluar(it, false); sonidoError();
          f.classList.remove("sacude"); void f.offsetWidth; f.classList.add("sacude");
          decir(p.error);
        }
      };
      fichas.appendChild(f);
    });
    let posRana = p.desde;
    function saltar(n) {
      posRana = n;
      const k = cas[n], rr = recta.getBoundingClientRect(), rk = k.getBoundingClientRect();
      rana.style.left = (rk.left - rr.left + rk.width / 2) + "px";
    }
    alRedimensionar = () => saltar(posRana);
    requestAnimationFrame(() => saltar(p.desde));
    cas[items[0].n].classList.add("titila");
    instruccion(p);
  };

  RENDER.ordenar = (p, c) => {
    c.appendChild(consigna(p));
    const z = el("div", "ordenar interactivo");
    const g = ico(p.img); g.classList.add("guia"); z.appendChild(g);
    const huecos = el("div", "huecos"), globos = el("div", "globos");
    const total = p.hasta - p.desde + 1;
    const hs = [];
    for (let k = 0; k < total; k++) { const h = el("div", "hueco"); hs.push(h); huecos.appendChild(h); }
    const items = Array.from({ length: total }, (_, k) => ({ n: p.desde + k, evaluado: false }));
    let esperado = 0;
    hs[0].classList.add("titila");
    barajar(items.map(x => x.n)).forEach(n => {
      const b = el("button", "globo", n);
      const col = COLORES[(n - 1) % COLORES.length]; b.style.background = col; b.style.borderTopColor = col; b.style.color = "#fff";
      b.style.setProperty("border-color", "transparent");
      b.onclick = () => {
        const it = items[esperado]; if (!it) return;
        if (n === it.n) {
          evaluar(it, true); sonidoOk();
          const h = hs[esperado]; h.textContent = n; h.classList.remove("titila"); h.classList.add("lista", "pop"); h.style.background = col; h.style.borderColor = col;
          b.classList.add("usado"); esperado++;
          if (esperado < total) { hs[esperado].classList.add("titila"); decir("n" + n); }
          else { decir(["n" + n, p.fin]); completar(); }
        } else {
          evaluar(it, false); sonidoError();
          b.classList.remove("sacude"); void b.offsetWidth; b.classList.add("sacude");
          decir(p.error);
        }
      };
      globos.appendChild(b);
    });
    z.append(huecos, globos); c.appendChild(z);
    instruccion(p);
  };

  function armarTren(nums, loco) {
    const t = el("div", "tren");
    const l = ico(loco); l.classList.add("loco"); t.appendChild(l);
    const vag = nums.map((n, k) => {
      const v = el("div", "vagon" + (k === 1 ? " central" : ""));
      const cart = el("div", "cartel", n == null ? "?" : n);
      if (n == null) cart.classList.add("vacio");
      v.appendChild(cart); v.appendChild(el("span", "flecha", "👇")); t.appendChild(v);
      return { v, cart };
    });
    return { t, vag };
  }

  RENDER.explica = (p, c) => {
    const cons = el("div", "consigna"); cons.appendChild(el("span", null, "Escuchá y mirá el tren 👀"));
    const rep = el("button", null, "🔁"); rep.title = "Repetir"; cons.appendChild(rep); c.appendChild(cons);
    const esc = el("div", "escena"); esc.style.cssText = "position:relative;width:100%;flex-direction:column;align-items:center;margin-top:auto";
    const { t, vag } = armarTren(p.numeros, p.img);
    const rot = el("div", "rotulos");
    const locoSpacer = el("div"); locoSpacer.style.cssText = "flex:0 0 auto;width:clamp(80px,20vw,150px)";
    rot.appendChild(locoSpacer);
    const rotulos = p.numeros.map(() => { const r = el("div", "rotulo"); r.style.width = "clamp(66px,17vw,120px)"; rot.appendChild(r); return r; });
    const mano = el("div", "mano", "👇"); mano.style.opacity = "0";
    esc.append(t, rot, mano); c.appendChild(esc);
    const txt = el("div", "explicaTexto", "&nbsp;"); txt.style.marginBottom = "auto"; c.appendChild(txt);
    const nombres = ["anterior", "", "posterior"];
    function apuntar(k) {
      const re = esc.getBoundingClientRect(), rv = vag[k].v.getBoundingClientRect();
      mano.style.opacity = "1";
      mano.style.left = (rv.left - re.left + rv.width / 2) + "px";
      mano.style.top = (rv.top - re.top - mano.offsetHeight - 4) + "px";
      vag.forEach((x, i) => x.v.classList.toggle("titila", i === k));
    }
    function correr() {
      callar(); E.completa = false; actualizarSiguiente();
      rotulos.forEach(r => r.textContent = ""); txt.innerHTML = "&nbsp;";
      const gen = A.gen;
      let i = 0;
      const paso = () => {
        if (gen !== A.gen) return;
        if (i >= p.pasos.length) { vag.forEach(x => x.v.classList.remove("titila")); completar(); return; }
        const s = p.pasos[i];
        apuntar(s.marca); txt.innerHTML = s.texto;
        if (nombres[s.marca]) rotulos[s.marca].textContent = nombres[s.marca];
        i++;
        hablar(s.audio); alTerminarAudio(() => setTimeout(paso, 350));
      };
      paso();
    }
    rep.onclick = correr;
    alRedimensionar = () => { const v = vag.find(x => x.v.classList.contains("titila")); if (v) apuntar(vag.indexOf(v)); };
    setTimeout(correr, 300);
  };

  RENDER.antpos = (p, c) => {
    c.appendChild(consigna(p));
    const cont = el("div", "rotulo"); c.appendChild(cont);
    const esc = el("div", "escena"); esc.style.cssText = "width:100%;margin-top:auto"; c.appendChild(esc);
    const preg = el("div", "explicaTexto"); c.appendChild(preg);
    const ops = el("div", "opciones interactivo"); ops.style.marginBottom = "auto"; c.appendChild(ops);
    const blanks = [];
    p.items.forEach(n => {
      blanks.push({ n, lado: "ant", resp: n - 1, evaluado: false });
      blanks.push({ n, lado: "pos", resp: n + 1, evaluado: false });
    });
    let b = 0, tren = null;
    function mostrarItem() {
      const bl = blanks[b];
      if (bl.lado === "ant") {
        esc.innerHTML = ""; tren = armarTren([null, bl.n, null], p.img); esc.appendChild(tren.t);
        const des = (p.desafio || []).includes(bl.n);
        cont.innerHTML = "Tren " + (b / 2 + 1) + " de " + p.items.length + (des ? ' · <span class="chipDesafio">⭐ ¡Desafío!</span>' : "");
      }
      const k = bl.lado === "ant" ? 0 : 2;
      tren.vag.forEach((x, i) => { x.cart.classList.toggle("titila", i === k); x.v.classList.toggle("activo", i === k); x.v.classList.toggle("espera", i !== k && x.cart.classList.contains("vacio")); });
      preg.innerHTML = bl.lado === "ant" ? `¿Qué número va <b>antes</b> del <b>${bl.n}</b>?` : `¿Qué número va <b>después</b> del <b>${bl.n}</b>?`;
      const distr = bl.lado === "ant" ? [bl.n - 1, bl.n + 1, bl.n - 2] : [bl.n + 1, bl.n - 1, bl.n + 2];
      ops.innerHTML = "";
      barajar(distr).forEach(v => {
        const o = el("button", "ficha", v); o.style.background = COLORES[(v - 1 + 20) % COLORES.length];
        o.onclick = () => responder(v, o);
        ops.appendChild(o);
      });
      bloquear(); hablar("q_" + bl.lado + bl.n); alTerminarAudio(desbloquear);
    }
    function responder(v, o) {
      const bl = blanks[b];
      if (v === bl.resp) {
        evaluar(bl, true); sonidoOk();
        const cart = tren.vag[bl.lado === "ant" ? 0 : 2].cart;
        cart.textContent = v; cart.classList.remove("vacio", "titila"); cart.classList.add("lista", "pop");
        tren.vag.forEach(x => x.v.classList.remove("activo", "espera"));
        bloquear(); decir("ok_" + bl.lado + bl.n);
        b++;
        alTerminarAudio(() => {
          desbloquear();
          if (b < blanks.length) setTimeout(mostrarItem, bl.lado === "pos" ? 500 : 150);
          else { ops.innerHTML = ""; preg.innerHTML = "¡Completaste todos los trenes! 🎉"; completar(); }
        });
      } else {
        evaluar(bl, false); sonidoError();
        o.classList.remove("sacude"); void o.offsetWidth; o.classList.add("sacude");
        decir(bl.lado === "ant" ? "e_ant" : "e_pos");
      }
    }
    bloquear(); hablar(p.instruccion); alTerminarAudio(mostrarItem);
  };

  RENDER.cierre = (p, c) => {
    c.classList.add("cierre");
    c.appendChild(el("h1", null, "¡Terminaste! 🎉")).style.cssText = "margin:0;color:var(--azulO);font-size:clamp(28px,8vw,46px)";
    const h = el("div", "heroimg"); h.appendChild(ico(D.meta.cierre)); c.appendChild(h);
    const tot = E.aciertos + E.errores;
    const pct = tot ? Math.round(E.aciertos / tot * 100) : 0;
    c.appendChild(el("div", "marcador",
      `<div>✅ Aciertos: ${E.aciertos}</div><div>❌ Errores: ${E.errores}</div><div>📊 Total: ${pct}%</div><div>⭐ Puntos: ${E.puntos}</div>`));
    const fila = el("div", "filaPortada");
    const b = el("button", "btn", "🔄 Volver a jugar");
    b.onclick = () => { E.aciertos = 0; E.errores = 0; E.puntos = 0; $("#puntos").textContent = "⭐ 0"; ir(0); };
    fila.append(b, firma()); c.appendChild(fila);
    hablar(p.audio);
  };

  // ---------------- INICIO ----------------
  function iniciar() {
    $("#btnSiguiente").onclick = () => ir(E.idx + 1);
    initLightbox();
    try { if ("speechSynthesis" in window) speechSynthesis.getVoices(); } catch (e) {}
    ir(0);
  }
  window.MOTOR = { E, A, ir, textoDe };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
