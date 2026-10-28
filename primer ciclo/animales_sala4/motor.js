/* Motor QueSepanTodos — © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Sombras, sonidos y comidas de los animales (Sala de 4). ES5 para tablets viejas. */
/* ===== Botón "Enviar mi tarea a mi docente" — RESPALDO INTEGRADO =====
   Se usa solo si no cargó el módulo compartido ../../recursos/enviar-tarea.js
   (por ejemplo, al abrir el paquete suelto o en otra carpeta).
   Pide nombre y curso, arma una tarjeta PNG con el resultado y la comparte (o muestra WhatsApp / Guardar). */
(function () {
  "use strict";
  if (window.QSTEnvio && typeof window.QSTEnvio.boton === "function") return;
  var KEY = "qst_envio", KI = "qst_intentos", FUENTE = "Andika,'Comic Sans MS','Segoe UI',Arial,sans-serif";

  function lee(k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } }
  function guarda(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function p2(n) { return (n < 10 ? "0" : "") + n; }
  function fechaHora() { var d = new Date(); return p2(d.getDate()) + "/" + p2(d.getMonth() + 1) + "/" + d.getFullYear() + " " + p2(d.getHours()) + ":" + p2(d.getMinutes()); }

  function estilos() {
    if (document.getElementById("qstenv-css")) return;
    var s = el("style"); s.id = "qstenv-css";
    s.textContent =
      ".qstenv-btn{border:0;border-radius:30px;background:#3b5bdb;color:#fff;font-family:inherit;font-size:clamp(15px,4.2vw,20px);font-weight:700;padding:10px 22px;box-shadow:0 4px 0 #2b45a8;cursor:pointer}" +
      ".qstenv-btn:active{transform:translateY(2px);box-shadow:0 2px 0 #2b45a8}" +
      ".qstenv{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.72);z-index:80;display:flex;align-items:center;justify-content:center;padding:12px;overflow:auto}" +
      ".qstenv .caja{background:#fff;border-radius:20px;padding:16px;width:100%;max-width:420px;max-height:96vh;overflow:auto;text-align:center;font-family:inherit;color:#2b2d42}" +
      ".qstenv h3{font-size:19px;color:#2b8a3e;margin-bottom:4px}" +
      ".qstenv p{font-size:14px;opacity:.8;margin-bottom:8px}" +
      ".qstenv label{display:block;text-align:left;font-size:14px;font-weight:700;margin:8px 0 2px}" +
      ".qstenv input{width:100%;font-family:inherit;font-size:17px;padding:10px;border:3px solid #c3e6cb;border-radius:12px;-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}" +
      ".qstenv input:focus{outline:0;border-color:#3b5bdb}" +
      ".qstenv .err{color:#e03131;font-weight:700;font-size:14px;min-height:18px;margin-top:6px}" +
      ".qstenv .acc{display:flex;flex-direction:column;gap:8px;margin-top:10px}" +
      ".qstenv .acc button,.qstenv .acc a{display:block;border:0;border-radius:24px;padding:11px 14px;font-family:inherit;font-size:17px;font-weight:700;color:#fff;text-decoration:none;cursor:pointer}" +
      ".qstenv .ok{background:#2f9e44}.qstenv .wa{background:#25a244}.qstenv .az{background:#3b5bdb}.qstenv .gr{background:#868e96}" +
      ".qstenv .vista{max-width:100%;max-height:48vh;border-radius:12px;box-shadow:0 2px 8px #0003;-webkit-user-select:auto;user-select:auto;-webkit-touch-callout:default}" +
      ".qstenv small{display:block;font-size:12px;opacity:.7;margin-top:6px}";
    document.head.appendChild(s);
  }

  /* ---------- tarjeta PNG ---------- */
  function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
  function ajusta(c, txt, max, base, peso) { var s = base; c.font = peso + " " + s + "px " + FUENTE; while (c.measureText(txt).width > max && s > 22) { s -= 2; c.font = peso + " " + s + "px " + FUENTE; } return s; }
  function lineas(c, txt, max, n) {
    var pal = String(txt).split(" "), out = [], l = "";
    pal.forEach(function (w) { var t = l ? l + " " + w : w; if (c.measureText(t).width > max && l) { out.push(l); l = w; } else l = t; });
    if (l) out.push(l);
    if (out.length > n) { out = out.slice(0, n); out[n - 1] = out[n - 1].replace(/\s*\S*$/, "") + "…"; }
    return out;
  }
  function tarjeta(d) {
    var cv = document.createElement("canvas"); cv.width = 1080; cv.height = 1350;
    var c = cv.getContext && cv.getContext("2d"); if (!c) return null;
    c.fillStyle = "#fff8e6"; c.fillRect(0, 0, 1080, 1350);
    c.fillStyle = "#2b8a3e"; c.fillRect(0, 0, 1080, 170);
    c.fillStyle = "#fff"; c.textAlign = "center"; c.textBaseline = "alphabetic";
    c.font = "700 66px " + FUENTE; c.fillText("¡Terminé mi tarea!", 540, 112);
    c.fillStyle = "#2b2d42"; c.font = "700 48px " + FUENTE;
    var y = 250; lineas(c, d.titulo, 940, 2).forEach(function (l) { c.fillText(l, 540, y); y += 58; });
    c.font = "400 30px " + FUENTE; c.globalAlpha = 0.7; c.fillText(d.grado || "", 540, y + 4); c.globalAlpha = 1;
    y += 70;
    function dato(rot, val) {
      c.fillStyle = "#6c757d"; c.font = "400 28px " + FUENTE; c.fillText(rot, 540, y); y += 54;
      c.fillStyle = "#2b2d42"; ajusta(c, val, 940, 56, "700"); c.fillText(val, 540, y); y += 70;
    }
    dato("Estudiante", d.estudiante); dato("Curso", d.curso); if (d.docente) dato("Docente", d.docente);
    var tot = d.aciertos + d.errores, pc = tot ? Math.round(d.aciertos / tot * 100) : 0;
    var bx = [["✅", d.aciertos, "Aciertos"], ["❌", d.errores, "Errores"], ["📊", pc + "%", "Total"], ["⭐", d.puntos, "Puntos"]];
    var by = Math.max(y + 10, 900), i;
    for (i = 0; i < 4; i++) {
      var x0 = 50 + i * 245;
      c.save(); c.shadowColor = "rgba(0,0,0,.18)"; c.shadowBlur = 12; c.shadowOffsetY = 4; c.fillStyle = "#fff"; rr(c, x0, by, 225, 200, 22); c.fill(); c.restore();
      c.fillStyle = "#2b2d42"; c.font = "400 44px " + FUENTE; c.fillText(bx[i][0], x0 + 112, by + 62);
      c.font = "700 60px " + FUENTE; c.fillText(String(bx[i][1]), x0 + 112, by + 128);
      c.font = "400 26px " + FUENTE; c.fillText(bx[i][2], x0 + 112, by + 170);
    }
    c.fillStyle = "#2b2d42"; c.font = "700 36px " + FUENTE; c.fillText("Intento n.° " + d.intento + "   ·   " + d.fecha, 540, by + 280);
    c.fillStyle = "#2b8a3e"; c.fillRect(0, 1262, 1080, 88);
    c.fillStyle = "#fff"; c.font = "700 32px " + FUENTE; c.fillText("QueSepanTodos.com · Profe Gustavo Aguilar", 540, 1318);
    return cv;
  }
  function texto(d) {
    var tot = d.aciertos + d.errores, pc = tot ? Math.round(d.aciertos / tot * 100) : 0;
    return "📤 Tarea: " + d.titulo + "\n👤 " + d.estudiante + " · " + d.curso + (d.docente ? "\n👩‍🏫 Docente: " + d.docente : "") +
      "\n✅ Aciertos: " + d.aciertos + "  ❌ Errores: " + d.errores + "  📊 " + pc + "%  ⭐ " + d.puntos +
      "\n🔁 Intento n.° " + d.intento + " · " + d.fecha + "\nQueSepanTodos.com";
  }

  /* ---------- ventanas ---------- */
  function cerrar(ov) { if (ov && ov.parentNode) ov.parentNode.removeChild(ov); }
  function nombreArchivo(d) { return "tarea-" + String(d.estudiante).toLowerCase().replace(/[^a-z0-9áéíóúñ]+/g, "-").replace(/^-|-$/g, "") + ".png"; }

  function vista(d, cv, ov) {
    var caja = ov.querySelector(".caja"), txt = texto(d), url = cv ? cv.toDataURL("image/png") : null;
    caja.innerHTML = "<h3>✅ ¡Tarjeta lista!</h3><p>Mandásela a tu docente.</p>";
    if (url) { var im = new Image(); im.className = "vista"; im.alt = "Tarjeta de la tarea"; im.src = url; caja.appendChild(im); }
    var acc = el("div", "acc");
    var puedeCompartir = false;
    function archivo(cb) { cv.toBlob(function (b) { try { cb(new File([b], nombreArchivo(d), { type: "image/png" })); } catch (e) { cb(null); } }, "image/png"); }
    function compartir() {
      if (!cv || !cv.toBlob || !window.File || !navigator.share) return;
      archivo(function (f) {
        try {
          var datos = { files: [f], title: d.titulo, text: txt };
          if (f && navigator.canShare && navigator.canShare(datos)) navigator.share(datos).catch(function () {});
        } catch (e) {}
      });
    }
    try { puedeCompartir = !!(cv && cv.toBlob && window.File && navigator.share && navigator.canShare); } catch (e) {}
    if (puedeCompartir) { var b1 = el("button", "az", "📲 Compartir tarjeta"); b1.onclick = compartir; acc.appendChild(b1); }
    var wa = el("a", "wa", "💬 Enviar por WhatsApp"); wa.href = "https://wa.me/?text=" + encodeURIComponent(txt); wa.target = "_blank"; wa.rel = "noopener"; acc.appendChild(wa);
    if (url) { var gu = el("a", "ok", "⬇️ Guardar imagen"); gu.href = url; gu.download = nombreArchivo(d); acc.appendChild(gu); }
    var x = el("button", "gr", "Cerrar"); x.onclick = function () { cerrar(ov); }; acc.appendChild(x);
    caja.appendChild(acc);
    if (url) caja.appendChild(el("small", "", "Si no se guarda sola, mantené apretada la imagen o sacá una captura de pantalla."));
    if (puedeCompartir) setTimeout(compartir, 50);   /* intenta abrir el menú de compartir enseguida */
  }

  function formulario(o) {
    estilos();
    var G = lee(KEY) || {}, ov = el("div", "qstenv"), caja = el("div", "caja");
    caja.innerHTML = "<h3>📤 Enviar mi tarea a mi docente</h3><p>Escribí tus datos para armar la tarjeta con tu resultado.</p>" +
      "<label>Nombre y apellido del estudiante</label><input id=\"qe_n\" type=\"text\" maxlength=\"60\" autocomplete=\"off\" autocapitalize=\"words\">" +
      "<label>Curso</label><input id=\"qe_c\" type=\"text\" maxlength=\"30\" placeholder=\"ej.: Sala de 4 · Turno mañana\" autocomplete=\"off\">" +
      "<label>Nombre del docente (opcional)</label><input id=\"qe_d\" type=\"text\" maxlength=\"60\" autocomplete=\"off\" autocapitalize=\"words\">" +
      "<div class=\"err\" id=\"qe_e\"></div>";
    var acc = el("div", "acc"), go = el("button", "ok", "Armar tarjeta"), no = el("button", "gr", "Cancelar");
    acc.appendChild(go); acc.appendChild(no); caja.appendChild(acc); ov.appendChild(caja); document.body.appendChild(ov);
    var n = caja.querySelector("#qe_n"), c = caja.querySelector("#qe_c"), dd = caja.querySelector("#qe_d"), er = caja.querySelector("#qe_e");
    n.value = G.estudiante || ""; c.value = G.curso || ""; dd.value = G.docente || "";
    no.onclick = function () { cerrar(ov); };
    go.onclick = function () {
      var nom = n.value.replace(/^\s+|\s+$/g, ""), cur = c.value.replace(/^\s+|\s+$/g, ""), doc = dd.value.replace(/^\s+|\s+$/g, "");
      if (!nom) { er.textContent = "Escribí el nombre del estudiante."; n.focus(); return; }
      if (!cur) { er.textContent = "Escribí el curso."; c.focus(); return; }
      guarda(KEY, { estudiante: nom, curso: cur, docente: doc });
      var d = { titulo: o.titulo, grado: o.grado, estudiante: nom, curso: cur, docente: doc, aciertos: o.aciertos, errores: o.errores,
                puntos: o.puntos, intento: o.intento, fecha: fechaHora() }, cv = null;
      try { cv = tarjeta(d); } catch (e) { cv = null; }
      vista(d, cv, ov);
    };
    setTimeout(function () { try { (n.value ? c : n).focus(); } catch (e) {} }, 50);
  }

  window.QSTEnvio = {
    respaldo: true,
    boton: function (o) {
      estilos();
      var I = lee(KI) || {}; I[o.titulo] = (I[o.titulo] || 0) + 1; guarda(KI, I);
      var datos = { titulo: o.titulo, grado: o.grado, aciertos: o.aciertos, errores: o.errores, puntos: o.puntos, intento: I[o.titulo] };
      var b = el("button", "qstenv-btn", "📤 Enviar mi tarea a mi docente");
      b.onclick = function () { formulario(datos); };
      return b;
    }
  };
})();

(function () {
  "use strict";
  var D = window.DATOS, P = D.pantallas;
  var st = { i: 0, aciertos: 0, errores: 0, puntos: 0 };
  var cur = {};
  var stage, btnSig, barra, pie, lblTit, lblPts, lblProg;
  var PAR = ["#ff8787", "#4dabf7", "#69db7c", "#ffd43b", "#da77f2", "#ffa94d", "#38d9a9"];
  var TEST = !!window.__QST_TEST;

  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function vivo(tok) { return tok === cur; }
  function addC(e, c) { e.classList.add(c); }
  function remC(e, c) { e.classList.remove(c); }

  /* ================= AUDIO: cola global ================= */
  var Q = [], sonando = null, gen = 0, auAct = null, AC = null, espera = [];
  function est(a) { return TEST ? 3 : Math.max(1300, a.t.length * 75); }
  function say(a, cb) { if (!a || !a.a) { if (cb) cb(); return; } Q.push({ a: a, cb: cb }); if (!sonando) sig(); }
  function sonido(ok) { Q.push({ b: ok ? 1 : 2 }); if (!sonando) sig(); }
  function idle() { return !sonando && !Q.length; }
  function cuandoTermine(f) { if (idle()) f(); else espera.push(f); }
  /* Si falta el mp3 (versión de prueba), lee el texto con la voz del dispositivo */
  var voz = null;
  function elegirVoz() {
    try {
      var vs = window.speechSynthesis.getVoices(), m = null;
      for (var i = 0; i < vs.length; i++) { if (/^es[-_]AR/i.test(vs[i].lang)) { m = vs[i]; break; } }
      if (!m) for (i = 0; i < vs.length; i++) { if (/^es/i.test(vs[i].lang)) { m = vs[i]; break; } }
      voz = m;
    } catch (e) {}
  }
  function hablar(a, fin) {
    if (TEST || !window.speechSynthesis || !window.SpeechSynthesisUtterance) { setTimeout(fin, est(a)); return; }
    try {
      if (!voz) elegirVoz();
      var u = new SpeechSynthesisUtterance(a.t.replace(/[🖤✨🔊]/g, ""));
      u.lang = "es-AR"; if (voz) u.voice = voz; u.rate = 0.95;
      u.onend = fin; u.onerror = fin;
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    } catch (e) { setTimeout(fin, est(a)); }
  }
  function sig() {
    if (!Q.length) {
      sonando = null; auAct = null;
      var c = espera; espera = []; c.forEach(function (f) { f(); });
      actSig(); return;
    }
    var it = Q.shift(), my = ++gen, done = false, au = null, to;
    sonando = it;
    function fin() {
      if (done || my !== gen) return; done = true; clearTimeout(to);
      try { if (au) au.pause(); } catch (e) {}
      var g = gen; if (it.cb) it.cb(); if (g === gen) sig();
    }
    if (it.b) { beep(it.b === 1); to = setTimeout(fin, TEST ? 2 : 380); return; }
    if (TEST) { to = setTimeout(fin, est(it.a)); return; }
    try { au = new Audio("audio/" + it.a.a + ".mp3"); } catch (e) { au = null; }
    auAct = au;
    function plan() { clearTimeout(to); to = setTimeout(fin, est(it.a) * 3 + 4000); hablar(it.a, fin); }
    if (!au) { plan(); return; }
    to = setTimeout(fin, est(it.a) * 3 + 3000); /* seguro anti-cuelgue */
    au.onended = fin;
    au.onerror = function () { if (my === gen && !done) plan(); };
    var p; try { p = au.play(); } catch (e) { plan(); return; }
    if (p && p.catch) p.catch(function (err) {
      if (err && err.name === "NotAllowedError") { clearTimeout(to); to = setTimeout(fin, est(it.a)); }
    });
  }
  function callar() {
    gen++; Q = []; espera = [];
    try { if (auAct) auAct.pause(); } catch (e) {}
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    auAct = null; sonando = null;
  }
  function beep(ok) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var t = AC.currentTime, notas = ok ? [660, 880, 1175] : [240, 180];
      notas.forEach(function (f, k) {
        var o = AC.createOscillator(), g = AC.createGain(), t0 = t + k * 0.09;
        o.type = ok ? "sine" : "triangle"; o.frequency.setValueAtTime(f, t0);
        g.gain.setValueAtTime(0.0001, t); g.gain.setValueAtTime(0.2, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.25);
        o.connect(g); g.connect(AC.destination); o.start(t0); o.stop(t0 + 0.27);
      });
    } catch (e) {}
  }
  function bloquear() { addC(stage, "bloq"); var tok = cur; cuandoTermine(function () { if (vivo(tok)) remC(stage, "bloq"); }); }
  function actSig() {
    if (!btnSig) return;
    var ok = cur.completa && (cur.ignorarAudio || idle());
    btnSig.disabled = !ok;
    btnSig.classList.toggle("listo", !!ok);
  }
  function completar() { cur.completa = true; actSig(); }
  function acierto(it) { if (!it._eval) { it._eval = true; st.aciertos++; st.puntos += 10; } pts(); }
  function error(it) { if (!it._eval) { it._eval = true; st.errores++; } pts(); }
  function pts() { lblPts.textContent = "⭐ " + st.puntos; }

  /* ================= UTILIDADES UI ================= */
  function imagen(src, emoji, cls) {
    var w = el("div", "imgbox " + (cls || "")), i = new Image();
    i.alt = ""; i.draggable = false;
    i.onerror = function () { w.innerHTML = '<span class="emo">' + (emoji || "🖼️") + "</span>"; };
    i.src = src; w.appendChild(i); return w;
  }
  function firma() {
    var f = el("div", "firma"), ph = el("div", "foto");
    ph.appendChild(imagen(D.meta.fotoMini || D.meta.foto, "👨‍🏫")); ph.onclick = lightbox;
    f.appendChild(ph);
    f.appendChild(el("div", "firmatxt", "<b>" + D.meta.autor + "</b><span>" + D.meta.mail + "</span>"));
    return f;
  }
  function lightbox() {
    var ov = el("div", "lb"), cont = el("div", "lbimg"), img = new Image(), z = false;
    img.src = D.meta.foto; img.onerror = function () { cont.innerHTML = '<span class="emo">👨‍🏫</span>'; };
    img.onclick = function (e) {
      var r = img.getBoundingClientRect();
      if (!z) { img.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%"; img.style.transform = "scale(2.5)"; }
      else img.style.transform = "";
      z = !z;
    };
    cont.appendChild(img);
    var x = el("button", "lbx", "✕"); x.onclick = function () { document.body.removeChild(ov); };
    ov.appendChild(cont);
    ov.appendChild(el("div", "lbfrase", "Menos prisa, más vida 🧉🫂<small>" + D.meta.autor + "<br>" + D.meta.mail + "</small>"));
    ov.appendChild(x); document.body.appendChild(ov);
  }
  function titulo(s) {
    stage.appendChild(el("h2", "titulo", s.titulo));
    if (s.consigna) stage.appendChild(el("div", "consigna", s.consigna));
  }

  /* ================= PANTALLAS ================= */
  var R = {};

  R.portada = function (s) {
    var w = el("div", "portada");
    w.appendChild(el("h1", "", D.meta.titulo));
    w.appendChild(el("h3", "", D.meta.subtitulo));
    w.appendChild(el("div", "badge", D.meta.nivel));
    w.appendChild(imagen(s.img, s.emoji, "pimg"));
    var fila = el("div", "pfila"), b = el("button", "btnGrande", "▶ Comenzar");
    b.onclick = function () { beep(true); ir(1); };
    fila.appendChild(b); fila.appendChild(firma()); w.appendChild(fila);
    w.appendChild(el("div", "lic", D.meta.licencia));
    stage.appendChild(w);
    say(s.audio); completar();
  };

  /* Video incrustado en la pantalla (botón rojo de YouTube) */
  var ytCargando = false, ytCola = [], vidAjuste = null;
  function conYT(f) {
    if (window.YT && window.YT.Player) { f(); return; }
    ytCola.push(f);
    if (ytCargando) return; ytCargando = true;
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { if (prev) prev(); var c = ytCola; ytCola = []; c.forEach(function (g) { g(); }); };
    var sc = document.createElement("script"); sc.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(sc);
  }
  R.video = function (s) {
    titulo(s);
    var caja = el("div", "vidbox"), wrap = el("div", "vidwrap"), fr = document.createElement("iframe");
    fr.id = "ytv" + Date.now();
    fr.src = "https://www.youtube-nocookie.com/embed/" + D.meta.video + "?rel=0&playsinline=1&modestbranding=1&enablejsapi=1";
    fr.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen");
    fr.setAttribute("allowfullscreen", ""); fr.setAttribute("title", "Video");
    var capV = el("p", "cap", s.texto);
    wrap.appendChild(fr); caja.appendChild(wrap); caja.appendChild(capV);
    stage.appendChild(caja);
    function ajustar() {
      var w = caja.clientWidth, h = caja.clientHeight - capV.offsetHeight - 10;
      if (!w || !h) return;
      if (w / h > 16 / 9) { wrap.style.height = h + "px"; wrap.style.width = Math.floor(h * 16 / 9) + "px"; }
      else { wrap.style.width = w + "px"; wrap.style.height = Math.floor(w * 9 / 16) + "px"; }
    }
    ajustar(); requestAnimationFrame(ajustar);
    vidAjuste = ajustar;
    var tok = cur;
    if (!TEST) conYT(function () {
      if (!vivo(tok)) return;
      try { new YT.Player(fr.id, { events: { onStateChange: function (e) { if (e.data === 1) callar(); } } }); } catch (e) {}
    });
    cur.ignorarAudio = true; completar(); say(s.audio);
  };

  /* Explorar: tocar cada animal para oír cómo hace */
  R.explorar = function (s) {
    titulo(s);
    var tok = cur, grid = el("div", "explora interact"), oidos = 0;
    s.animales.forEach(function (a) {
      var b = el("button", "tarj");
      b.appendChild(imagen(a.img, a.emoji, "timg"));
      b.appendChild(el("span", "tilde", "✔"));
      b.onclick = function () {
        if (!idle()) return;
        addC(b, "suena"); say(a.hace, function () { remC(b, "suena"); }); bloquear();
        if (!a._oido) {
          a._oido = true; oidos++; addC(b, "oido");
          if (oidos === s.animales.length) cuandoTermine(function () { if (vivo(tok)) completar(); });
        }
      };
      grid.appendChild(b);
    });
    stage.appendChild(grid);
    say(s.intro); bloquear();
  };

  /* Unir con una línea (sombras y comidas). izq/der: elementos con ._k = clave del par */
  function unir(s, izqItems, derItems, op) {
    var tok = cur, wrap = el("div", "unir interact"), izq = el("div", "ucol"), der = el("div", "ucol der");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "lineas");
    wrap.appendChild(izq); wrap.appendChild(svg); wrap.appendChild(der);
    wrap.style.setProperty("--filas", izqItems.length);
    stage.appendChild(wrap);
    var sel = null, hechos = [], nPar = 0, total = izqItems.length;
    function dibujar() {
      var w = wrap.getBoundingClientRect(), h = "";
      svg.setAttribute("width", w.width); svg.setAttribute("height", w.height);
      hechos.forEach(function (x) {
        var a = x.i.getBoundingClientRect(), b = x.d.getBoundingClientRect();
        var x1 = a.right - w.left, y1 = a.top + a.height / 2 - w.top, x2 = b.left - w.left, y2 = b.top + b.height / 2 - w.top;
        h += '<circle cx="' + x1 + '" cy="' + y1 + '" r="6" fill="' + x.c + '"/><circle cx="' + x2 + '" cy="' + y2 + '" r="6" fill="' + x.c + '"/>' +
          '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + x.c + '" stroke-width="6" stroke-linecap="round" class="traza"/>';
      });
      svg.innerHTML = h;
    }
    cur.redibujar = dibujar;
    function tarjeta(it, lado) {
      var b = el("button", "utar " + lado);
      b.appendChild(imagen(it.img, it.emoji, lado === "izq" && op.sombra ? "timg sil" : "timg"));
      b._it = it; return b;
    }
    izqItems.forEach(function (it) {
      var b = tarjeta(it, "izq");
      b.onclick = function () {
        if (b._hecho || !idle()) return;
        if (sel) remC(sel, "sel");
        sel = b; addC(b, "sel");
        say(op.sombra ? D.comunes.sombra : it.nombre);
      };
      izq.appendChild(b);
    });
    derItems.forEach(function (it) {
      var b = tarjeta(it, "der");
      b.onclick = function () {
        if (b._hecho || !idle()) return;
        if (!sel) { addC(b, "toque"); setTimeout(function () { remC(b, "toque"); }, 500); say(it.nombre); if (op.sombra) say(D.comunes.elegi); return; }
        var a = sel, par = a._it._par;
        if (a._it._k === it._k) {
          acierto(par); a._hecho = b._hecho = true;
          var c = PAR[nPar++ % PAR.length];
          [a, b].forEach(function (x) { remC(x, "sel"); addC(x, "hecho"); x.style.borderColor = c; x.style.background = c + "33"; });
          if (op.sombra) addC(a, "revela");
          hechos.push({ i: a, d: b, c: c }); dibujar();
          sel = null;
          sonido(true); say(par.conf); bloquear();
          if (hechos.length === total) cuandoTermine(function () { if (vivo(tok)) completar(); });
        } else {
          error(par);
          [a, b].forEach(function (x) { addC(x, "mal"); });
          setTimeout(function () { remC(a, "mal"); remC(a, "sel"); remC(b, "mal"); }, 900);
          sel = null;
          sonido(false); say(D.comunes.error); bloquear();
        }
      };
      der.appendChild(b);
    });
    requestAnimationFrame(dibujar);
    say(s.intro); bloquear();
  }
  R.sombras = function (s) {
    titulo(s);
    var izq = shuffle(s.pares).map(function (p) { return { img: p.img, emoji: p.emoji, nombre: p.nombre, _k: p.id, _par: p }; });
    var der = shuffle(s.pares).map(function (p) { return { img: p.img, emoji: p.emoji, nombre: p.nombre, _k: p.id, _par: p }; });
    unir(s, izq, der, { sombra: true });
  };
  R.unirComida = function (s) {
    titulo(s);
    var izq = shuffle(s.pares).map(function (p) { return { img: p.a.img, emoji: p.a.emoji, nombre: p.a.nombre, _k: p.a.id, _par: p }; });
    var der = shuffle(s.pares).map(function (p) { return { img: p.c.img, emoji: p.c.emoji, nombre: p.c.nombre, _k: p.a.id, _par: p }; });
    unir(s, izq, der, {});
  };

  /* ¿Quién hace este sonido? */
  R.sonidos = function (s) {
    titulo(s);
    var tok = cur, n = s.items.length;
    var cont = el("div", "cont"), arriba = el("div", "sonfila"), parl = el("button", "parlante interact", "🔊"), cnt = el("div", "cnt"), grid = el("div", "opciones c3 interact");
    arriba.appendChild(parl); arriba.appendChild(cnt);
    cont.appendChild(arriba); cont.appendChild(grid); stage.appendChild(cont);
    var it = null;
    parl.onclick = function () { if (it && idle()) { addC(parl, "suena"); say(it.sonido, function () { remC(parl, "suena"); }); bloquear(); } };
    function mostrar(k) {
      it = s.items[k]; var res = false, botones = [];
      cnt.textContent = (k + 1) + " de " + n;
      grid.innerHTML = "";
      shuffle(it.opciones).forEach(function (op) {
        var b = el("button", "op"); b.appendChild(imagen(op.img, op.emoji, "timg"));
        b.onclick = function () {
          if (res) return;
          if (op.ok) {
            res = true; acierto(it); addC(b, "ok");
            botones.forEach(function (o) { if (o !== b) addC(o, "dim"); });
            sonido(true); say(it.conf); addC(stage, "bloq");
            cuandoTermine(function () {
              if (!vivo(tok)) return;
              remC(stage, "bloq");
              if (k + 1 < n) setTimeout(function () { if (vivo(tok)) mostrar(k + 1); }, TEST ? 0 : 450);
              else completar();
            });
          } else {
            error(it); addC(b, "mal"); setTimeout(function () { remC(b, "mal"); }, 900);
            sonido(false); say(D.comunes.error); bloquear();
          }
        };
        botones.push(b); grid.appendChild(b);
      });
      if (k === 0) say(s.intro);
      say(D.comunes.quien); addC(parl, "suena"); say(it.sonido, function () { remC(parl, "suena"); }); bloquear();
    }
    mostrar(0);
  };

  /* ¿Qué come? (animal + 4 comidas) */
  R.comida = function (s) {
    titulo(s);
    var tok = cur, n = s.items.length;
    var cont = el("div", "cont comida"), arriba = el("div", "animalq"), preg = el("div", "preg"), grid = el("div", "opciones c4 interact");
    cont.appendChild(arriba); cont.appendChild(preg); cont.appendChild(grid); stage.appendChild(cont);
    function mostrar(k) {
      var it = s.items[k], res = false, botones = [];
      arriba.innerHTML = ""; arriba.appendChild(imagen(it.img, it.emoji, "timg titila"));
      arriba.onclick = function () { if (idle() && !res) { say(it.pregunta); bloquear(); } };
      preg.innerHTML = it.texto + ' <span class="cnt">' + (k + 1) + "/" + n + "</span>";
      grid.innerHTML = "";
      shuffle(it.opciones).forEach(function (op) {
        var b = el("button", "op"); b.appendChild(imagen(op.img, op.emoji, "timg"));
        b.onclick = function () {
          if (res) return;
          if (op.ok) {
            res = true; acierto(it); addC(b, "ok");
            botones.forEach(function (o) { if (o !== b) addC(o, "dim"); });
            sonido(true); say(it.conf); addC(stage, "bloq");
            cuandoTermine(function () {
              if (!vivo(tok)) return;
              remC(stage, "bloq");
              if (k + 1 < n) setTimeout(function () { if (vivo(tok)) mostrar(k + 1); }, TEST ? 0 : 450);
              else completar();
            });
          } else {
            error(it); addC(b, "mal"); setTimeout(function () { remC(b, "mal"); }, 900);
            sonido(false); say(D.comunes.error); bloquear();
          }
        };
        botones.push(b); grid.appendChild(b);
      });
      if (k === 0) say(s.intro);
      say(it.pregunta); bloquear();
    }
    mostrar(0);
  };

  /* Narración con manito: animal → comida */
  R.narracion = function (s) {
    titulo(s);
    var tok = cur, esc = el("div", "escena narr"), cap = el("div", "cap"), mano = el("div", "mano", "👆"), filas = {};
    s.escena.forEach(function (f) {
      var r = el("div", "nfila");
      r.appendChild(imagen(f.a.img, f.a.emoji, "timg"));
      r.appendChild(el("div", "flecha", "➜"));
      var c = imagen(f.c.img, f.c.emoji, "timg comidaN oculto"); r.appendChild(c);
      r._c = c; filas[f.id] = r; esc.appendChild(r);
    });
    esc.appendChild(mano);
    stage.appendChild(esc); stage.appendChild(cap);
    var marcados = [];
    function apuntar(e) {
      if (!e) { mano.style.opacity = 0; return; }
      var r = e.getBoundingClientRect(), w = esc.getBoundingClientRect();
      var x = r.left - w.left + r.width / 2 - 18, y = r.top - w.top + r.height / 2;
      mano.style.left = Math.max(0, Math.min(x, w.width - 40)) + "px"; mano.style.top = Math.max(0, Math.min(y, w.height - 44)) + "px"; mano.style.opacity = 1;
    }
    function paso(k) {
      if (!vivo(tok)) return;
      if (k >= s.pasos.length) { completar(); return; }
      var p = s.pasos[k];
      marcados.forEach(function (e) { remC(e, "titila"); }); marcados = [];
      (p.marca || []).forEach(function (id) { var f = filas[id]; if (f) { remC(f._c, "oculto"); addC(f, "titila"); marcados.push(f); } });
      cap.textContent = p.texto; remC(cap, "aparece"); void cap.offsetWidth; addC(cap, "aparece");
      requestAnimationFrame(function () { apuntar(marcados[0] ? marcados[0]._c : null); });
      say(p.audio, function () { paso(k + 1); });
    }
    paso(0);
  };

  /* Memojuego: tarjetas para dar vuelta y formar parejas (animal–sombra / animal–comida) */
  R.memo = function (s) {
    titulo(s);
    var tok = cur, n = s.pares.length, hechos = 0, lock = false, abiertas = [];
    var cont = el("div", "cont memo"), grid = el("div", "memogrid interact");
    cont.appendChild(grid); stage.appendChild(cont);

    var cartas = [];
    s.pares.forEach(function (p, k) {
      cartas.push({ par: p, k: k, cara: p.a, sil: false });
      cartas.push({ par: p, k: k, cara: p.b, sil: !!p.b.sil });
    });
    cartas = shuffle(cartas);

    cartas.forEach(function (c) {
      var b = el("button", "mcarta"), dorso = el("div", "dorso", "🐾"), frente = el("div", "frente");
      frente.appendChild(imagen(c.cara.img, c.cara.emoji, "timg" + (c.sil ? " sil" : "")));
      b.appendChild(dorso); b.appendChild(frente);
      c.e = b; b.onclick = function () { voltear(c); };
      grid.appendChild(b);
    });

    function tapar(c) { c.abierta = false; remC(c.e, "volt"); remC(c.e, "mal"); }

    function voltear(c) {
      if (lock || c.hecha || c.abierta) return;
      c.abierta = true; addC(c.e, "volt"); abiertas.push(c);
      if (c.cara.nombre) say(c.cara.nombre);                                  /* animal o comida: se oye su nombre */
      else if (c.sil && !c.oida) { c.oida = true; say(D.comunes.sombra); }    /* sombra: ¿de quién será? (solo la 1.ª vez) */
      if (abiertas.length < 2) return;

      var a = abiertas[0], b = abiertas[1]; abiertas = [];
      if (a.k === b.k) {                                                      /* ¡pareja! */
        a.hecha = b.hecha = true; hechos++;
        var col = PAR[a.k % PAR.length];
        [a, b].forEach(function (x) { addC(x.e, "hecha"); addC(x.e, "revela"); x.e.style.borderColor = col; x.e.style.boxShadow = "0 0 0 4px " + col; });
        acierto(a.par);
        sonido(true); say(a.par.conf); bloquear();
        if (hechos === n) cuandoTermine(function () { if (vivo(tok)) completar(); });
      } else {                                                                /* no son pareja: se vuelven a tapar */
        lock = true; error(a.par);
        addC(a.e, "mal"); addC(b.e, "mal"); sonido(false);
        setTimeout(function () { if (!vivo(tok)) return; tapar(a); tapar(b); lock = false; }, TEST ? 0 : 1000);
      }
    }

    /* Tamaño de tarjeta: el mayor que entra sin scroll (prueba 2 a 6 columnas) */
    function disponer() {
      var W = cont.clientWidth, H = cont.clientHeight, N = cartas.length, gap = 8, mejor = null;
      if (!W || !H) { W = 320; H = 420; }
      for (var c = 2; c <= 6; c++) {
        var r = Math.ceil(N / c), sz = Math.floor(Math.min((W - (c - 1) * gap) / c, (H - (r - 1) * gap) / r));
        if (!mejor || sz > mejor.sz) mejor = { c: c, sz: sz };
      }
      grid.style.gridTemplateColumns = "repeat(" + mejor.c + "," + mejor.sz + "px)";
      grid.style.gridAutoRows = mejor.sz + "px";
    }
    cur.redibujar = disponer; disponer();
    requestAnimationFrame(disponer);
    say(s.intro); bloquear();
  };

  R.cierre = function (s) {
    var w = el("div", "cierre");
    w.appendChild(imagen(s.img, s.emoji, "cimg"));
    w.appendChild(el("h1", "", "¡Terminaste!"));
    var tot = st.aciertos + st.errores, pc = tot ? Math.round(st.aciertos / tot * 100) : 0;
    w.appendChild(el("div", "stats",
      '<div>✅<b>' + st.aciertos + '</b><span>Aciertos</span></div>' +
      '<div>❌<b>' + st.errores + '</b><span>Errores</span></div>' +
      '<div>📊<b>' + pc + '%</b><span>Total</span></div>' +
      '<div>⭐<b>' + st.puntos + '</b><span>Puntos</span></div>'));
    var fila = el("div", "pfila"), b = el("button", "btnGrande", "🔄 Volver a jugar");
    b.onclick = reiniciar; fila.appendChild(b);
    /* "Enviar mi tarea" va pegado al botón de volver a jugar; la firma queda al final */
    try { if (window.QSTEnvio) fila.appendChild(QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.area, aciertos: st.aciertos, errores: st.errores, puntos: st.puntos })); } catch (e) {}
    fila.appendChild(firma()); w.appendChild(fila);
    stage.appendChild(w); say(s.audio); completar();
  };

  /* ================= NAVEGACIÓN ================= */
  function limpiarEval(o) {
    if (Array.isArray(o)) o.forEach(limpiarEval);
    else if (o && typeof o === "object") { delete o._eval; delete o._oido; Object.keys(o).forEach(function (k) { limpiarEval(o[k]); }); }
  }
  function reiniciar() { st.aciertos = st.errores = st.puntos = 0; limpiarEval(P); ir(0); }
  function ir(i) {
    if (i < 0 || i >= P.length) return;
    callar(); st.i = i; cur = { completa: false };
    var vf = stage.querySelector("iframe"); if (vf) vf.src = "about:blank"; vidAjuste = null;
    stage.className = ""; stage.innerHTML = "";
    var s = P[i], esp = s.tipo === "portada" || s.tipo === "cierre";
    document.body.setAttribute("data-tipo", s.tipo);
    barra.style.display = esp && !D.meta.revision ? "none" : ""; pie.style.display = esp ? "none" : "";
    lblTit.textContent = D.meta.tituloCorto || D.meta.titulo; lblProg.textContent = i + " / " + (P.length - 2);
    btnSig.disabled = true;
    R[s.tipo](s); pts(); actSig();
  }
  function setVH() { document.documentElement.style.setProperty("--vh", window.innerHeight + "px"); }

  var iniciado = false;
  function init() {
    if (iniciado) return; iniciado = true;
    setVH();
    window.addEventListener("resize", function () { setVH(); if (vidAjuste) vidAjuste(); if (cur.redibujar) cur.redibujar(); });
    try { if (window.speechSynthesis) { elegirVoz(); window.speechSynthesis.onvoiceschanged = elegirVoz; } } catch (e) {}
    document.title = D.meta.titulo + " · QueSepanTodos";
    var app = document.getElementById("app");
    barra = el("div", "barra");
    lblTit = el("div", "btit"); lblPts = el("div", "bpts");
    if (D.meta.revision) {
      var ant = el("button", "nav", "◀"), sgt = el("button", "nav", "▶");
      ant.onclick = function () { ir(st.i - 1); }; sgt.onclick = function () { ir(st.i + 1); };
      barra.appendChild(ant); barra.appendChild(lblTit); barra.appendChild(lblPts); barra.appendChild(sgt);
    } else { barra.appendChild(lblTit); barra.appendChild(lblPts); }
    stage = el("div"); stage.id = "escenario";
    pie = el("div", "pie"); lblProg = el("div", "prog");
    btnSig = el("button", "btnSig", "Siguiente ➜"); btnSig.id = "btnSig";
    btnSig.onclick = function () { if (!btnSig.disabled) ir(st.i + 1); };
    pie.appendChild(lblProg); pie.appendChild(btnSig);
    app.appendChild(barra); app.appendChild(stage); app.appendChild(pie);
    ir(0);
  }
  window.QST = { ir: ir, st: st, cur: function () { return cur; }, idle: idle };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
