/* Motor QueSepanTodos — © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
(function () {
  "use strict";
  var D = window.DATOS, P = D.pantallas;
  var st = { i: 0, aciertos: 0, errores: 0, puntos: 0 };
  var cur = {};
  var stage, btnSig, barra, pie, lblTit, lblPts, lblProg;
  var COLORES = ["#ff6b6b", "#4dabf7", "#51cf66", "#fcc419", "#cc5de8", "#ff922b", "#20c997"];
  var PAR = ["#ffd8a8", "#a5d8ff", "#eebefa", "#96f2d7", "#ffc9c9"];
  var NOMBRE = { cuadrado: "Cuadrado", rectangulo: "Rectángulo", triangulo: "Triángulo", circulo: "Círculo" };
  var TEST = !!window.__QST_TEST;

  function el(t, c, h) { var e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function vivo(tok) { return tok === cur; }

  /* ================= AUDIO: cola global ================= */
  var Q = [], sonando = null, gen = 0, auAct = null, AC = null, espera = [];
  function est(a) { return TEST ? 3 : Math.max(1300, a.t.length * 75); }
  function say(a, cb) { if (!a || !a.a) { if (cb) cb(); return; } Q.push({ a: a, cb: cb }); if (!sonando) sig(); }
  function sonido(ok) { Q.push({ b: ok ? 1 : 2 }); if (!sonando) sig(); }
  function idle() { return !sonando && !Q.length; }
  /* f se ejecuta cuando la cola queda vacía (o ya mismo si no suena nada) */
  function cuandoTermine(f) { if (idle()) f(); else espera.push(f); }
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
    try { au = new Audio("audio/" + it.a.a + ".mp3"); } catch (e) { au = null; }
    auAct = au;
    if (!au) { to = setTimeout(fin, est(it.a)); return; }
    to = setTimeout(fin, est(it.a) * 3 + 3000); /* seguro anti-cuelgue */
    au.onended = fin;
    au.onerror = function () { clearTimeout(to); to = setTimeout(fin, est(it.a)); };
    var p; try { p = au.play(); } catch (e) { clearTimeout(to); to = setTimeout(fin, est(it.a)); return; }
    if (p && p.catch) p.catch(function () { clearTimeout(to); to = setTimeout(fin, est(it.a)); });
  }
  function callar() { gen++; Q = []; espera = []; try { if (auAct) auAct.pause(); } catch (e) {} auAct = null; sonando = null; }
  function beep(ok) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime;
      o.type = ok ? "sine" : "triangle";
      if (ok) { o.frequency.setValueAtTime(660, t); o.frequency.setValueAtTime(990, t + 0.1); }
      else { o.frequency.setValueAtTime(240, t); o.frequency.setValueAtTime(180, t + 0.12); }
      g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + 0.34);
    } catch (e) {}
  }
  function bloquear() { stage.classList.add("bloq"); var tok = cur; cuandoTermine(function () { if (vivo(tok)) stage.classList.remove("bloq"); }); }
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

  /* ================= FORMAS SVG ================= */
  function formaG(tipo, color, rot) {
    var f = color || "#4dabf7", r = rot ? ' transform="rotate(' + rot + ' 50 50)"' : "", b;
    if (tipo === "trianguloAbierto")
      return '<polyline points="10,84 50,12 90,84" fill="none" stroke="' + f + '" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"' + r + '/>';
    switch (tipo) {
      case "cuadrado": b = '<rect x="18" y="18" width="64" height="64" rx="2"/>'; break;
      case "rectangulo": b = '<rect x="5" y="27" width="90" height="46" rx="2"/>'; break;
      case "rectLargo": b = '<rect x="3" y="38" width="94" height="24" rx="2"/>'; break;
      case "triangulo": b = '<polygon points="50,10 92,86 8,86"/>'; break;
      case "circulo": b = '<circle cx="50" cy="50" r="40"/>'; break;
      case "circChico": b = '<circle cx="50" cy="50" r="15"/>'; break;
    }
    return '<g fill="' + f + '" stroke="#33354a" stroke-width="4" stroke-linejoin="round"' + r + '>' + b + '</g>';
  }
  function forma(tipo, color, rot) { return '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">' + formaG(tipo, color, rot) + '</svg>'; }
  function colores(n) { return shuffle(COLORES).slice(0, n); }

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
  function titulo(s) { stage.appendChild(el("h2", "titulo may", s.titulo)); }
  function contenidoOpcion(op, i, cols) {
    var h = "";
    if (op.forma) h = '<div class="ico">' + forma(op.forma, cols[i]) + "</div>";
    else if (op.formas) h = '<div class="ico mini">' + op.formas.map(function (f, k) { return forma(f, COLORES[k + 1]); }).join("") + "</div>";
    else if (op.emoji) h = '<div class="ico emo">' + op.emoji + "</div>";
    if (op.label) h += '<div class="lab may">' + op.label + "</div>";
    return h;
  }

  /* ================= PANTALLAS ================= */
  var R = {};

  R.portada = function (s) {
    var w = el("div", "portada");
    w.appendChild(el("h1", "may", D.meta.titulo));
    w.appendChild(el("h3", "may", D.meta.subtitulo));
    w.appendChild(el("div", "badge", D.meta.nivel));
    w.appendChild(imagen(s.img, s.emoji, "pimg"));
    var fila = el("div", "pfila"), b = el("button", "btnGrande", "▶ COMENZAR");
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
    var capV = el("p", "cap may", s.texto);
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
    /* si el chico toca play mientras suena la consigna, se calla el audio */
    if (!TEST) conYT(function () {
      if (!vivo(tok)) return;
      try { new YT.Player(fr.id, { events: { onStateChange: function (e) { if (e.data === 1) callar(); } } }); } catch (e) {}
    });
    cur.ignorarAudio = true; completar(); say(s.audio);
  };

  R.opcion = function (s) {
    titulo(s);
    var cont = el("div", "cont"), preg = el("div", "preg may"), fig = el("div", "figura"), grid = el("div", "opciones interact");
    cont.appendChild(preg); cont.appendChild(fig); cont.appendChild(grid); stage.appendChild(cont);
    var n = s.items.length, tok = cur;
    function mostrar(k) {
      var it = s.items[k], res = false, botones = [];
      preg.innerHTML = it.pregunta + (n > 1 ? ' <span class="cnt">' + (k + 1) + "/" + n + "</span>" : "");
      fig.style.display = it.figura ? "" : "none";
      fig.innerHTML = it.figura ? forma(it.figura.forma, it.figura.color, it.figura.rot) : "";
      var ops = it.fijo ? it.opciones.slice() : shuffle(it.opciones), cols = colores(ops.length);
      grid.innerHTML = "";
      grid.className = "opciones interact c" + (ops.length === 3 ? 3 : 2) + (it.figura ? " bajo" : "");
      ops.forEach(function (op, i) {
        var b = el("button", "op", contenidoOpcion(op, i, cols)); b._ok = !!op.ok;
        b.onclick = function () {
          if (res) return;
          if (op.ok) {
            res = true; acierto(it); b.classList.add("ok");
            botones.forEach(function (o) { if (o !== b) o.classList.add("dim"); });
            sonido(true); say(it.conf); stage.classList.add("bloq");
            cuandoTermine(function () {
              if (!vivo(tok)) return;
              stage.classList.remove("bloq");
              if (k + 1 < n) setTimeout(function () { if (vivo(tok)) mostrar(k + 1); }, TEST ? 0 : 500);
              else completar();
            });
          } else {
            error(it); b.classList.add("mal");
            setTimeout(function () { b.classList.remove("mal"); }, 900);
            sonido(false); say(D.comunes.error); bloquear();
          }
        };
        botones.push(b); grid.appendChild(b);
      });
      if (k === 0 && s.intro) say(s.intro);
      say(it.audio); bloquear();
    }
    mostrar(0);
  };

  R.clasificar = function (s) {
    titulo(s);
    var items = shuffle(s.items), n = items.length, tok = cur;
    var cont = el("div", "cont"), cnt = el("div", "preg may"), obj = el("div", "objeto interact"), dest = el("div", "destinos interact");
    cont.appendChild(cnt); cont.appendChild(obj); cont.appendChild(dest); stage.appendChild(cont);
    var k = 0, res = false, botones = {};
    s.destinos.forEach(function (f, i) {
      var b = el("button", "op", '<div class="ico">' + forma(f, COLORES[i + 1]) + '</div><div class="lab may">' + NOMBRE[f] + "</div>");
      b.onclick = function () {
        if (res) return;
        var it = items[k];
        if (f === it.forma) {
          res = true; acierto(it); b.classList.add("ok"); obj.classList.add("okb");
          sonido(true); say(it.conf); stage.classList.add("bloq");
          cuandoTermine(function () {
            if (!vivo(tok)) return;
            stage.classList.remove("bloq"); b.classList.remove("ok"); obj.classList.remove("okb");
            k++; if (k < n) mostrar(); else { obj.innerHTML = '<span class="emo">🏅</span>'; completar(); }
          });
        } else {
          error(it); b.classList.add("mal"); setTimeout(function () { b.classList.remove("mal"); }, 900);
          sonido(false); say(D.comunes.error); bloquear();
        }
      };
      b._f = f; botones[f] = b; dest.appendChild(b);
    });
    function mostrar() {
      var it = items[k]; res = false; obj._f = it.forma;
      cnt.innerHTML = "Objeto " + (k + 1) + " de " + n;
      obj.innerHTML = ""; var im = imagen(it.img, it.emoji, "titila"); obj.appendChild(im);
      obj.onclick = function () { if (idle()) say(it.nombre); };
      say(it.nombre); bloquear();
    }
    say(s.intro); mostrar();
  };

  R.asociar = function (s) {
    titulo(s);
    var tok = cur, wrap = el("div", "asoc interact"), izq = el("div", "col"), der = el("div", "col");
    wrap.appendChild(izq); wrap.appendChild(der); stage.appendChild(wrap);
    var sel = null, selB = null, hechos = 0, nPar = 0;
    var cols = colores(s.pares.length);
    shuffle(s.pares).forEach(function (p, i) {
      var b = el("button", "ta", '<div class="ico">' + forma(p.forma, cols[i]) + '</div><div class="lab may">' + NOMBRE[p.forma] + "</div>");
      b.onclick = function () {
        if (p._hecho || !idle()) return;
        if (selB) selB.classList.remove("sel");
        sel = p; selB = b; b.classList.add("sel"); say(D.comunes.formas[p.forma]);
      };
      b._p = p; izq.appendChild(b);
    });
    shuffle(s.pares).forEach(function (p) {
      var b = el("button", "ta", ""); b.appendChild(imagen(p.img, p.emoji, "tim"));
      b.appendChild(el("div", "lab may", p.label));
      b.onclick = function () {
        if (p._hecho || !idle()) return;
        if (!sel) { say(p.nombre); return; }
        if (sel === p) {
          acierto(p); p._hecho = true;
          var c = PAR[nPar++ % PAR.length];
          [selB, b].forEach(function (x) { x.classList.remove("sel"); x.classList.add("hecho"); x.style.background = c; x.style.borderColor = c; });
          sel = null; selB = null; hechos++;
          sonido(true); say(p.conf); bloquear();
          if (hechos === s.pares.length) cuandoTermine(function () { if (vivo(tok)) completar(); });
        } else {
          error(sel); var a = selB;
          [a, b].forEach(function (x) { x.classList.add("mal"); });
          setTimeout(function () { a.classList.remove("mal", "sel"); b.classList.remove("mal"); }, 900);
          sel = null; selB = null;
          sonido(false); say(D.comunes.error); bloquear();
        }
      };
      b._p = p; der.appendChild(b);
    });
    say(s.intro); bloquear();
  };

  /* ---------- narración animada con puntero ---------- */
  var ESC = {};
  ESC.formas = function () {
    var t = [["cuadrado", "#4dabf7", 50], ["rectangulo", "#51cf66", 150], ["triangulo", "#ff922b", 250], ["circulo", "#fcc419", 350]], h = "";
    t.forEach(function (x) {
      h += '<g id="f_' + x[0] + '"><g transform="translate(' + (x[2] - 45) + ',12) scale(0.9)">' + formaG(x[0], x[1]) + "</g></g>";
      h += '<text id="l_' + x[0] + '" x="' + x[2] + '" y="128" text-anchor="middle" class="slbl" style="font-size:14px">' + NOMBRE[x[0]].toUpperCase() + "</text>";
    });
    return '<svg viewBox="0 0 400 140">' + h + "</svg>";
  };
  ESC.tele = function () {
    return '<svg viewBox="0 0 400 230">' +
      '<g id="obj"><rect x="15" y="25" width="170" height="170" rx="16" fill="#fff" stroke="#ccc" stroke-width="2"/>' +
      '<text x="100" y="135" font-size="80" text-anchor="middle">📺</text>' +
      '<image href="img/televisor.jpg" x="20" y="30" width="160" height="160" onerror="this.style.display=\'none\'"/></g>' +
      '<path id="flecha" d="M197 110 h44 M228 97 l14 13 l-14 13" stroke="#33354a" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<g id="forma"><g transform="translate(255,45) scale(1.4)">' + formaG("rectangulo", "#4dabf7") + "</g></g>" +
      '<text id="lforma" x="325" y="200" text-anchor="middle" class="slbl">RECTÁNGULO</text>' +
      '<text id="lupa" x="220" y="62" font-size="44" text-anchor="middle">🔍</text></svg>';
  };
  ESC.hoja = function () {
    var cx = [82, 136, 190, 243], tipos = ["cuadrado", "rectangulo", "triangulo", "circulo"],
      emo = [["🎲", "🧇"], ["📺", "🚪"], ["🍕", "⛺"], ["🕰️", "🍪"]], f = "", o = "", lin = "";
    cx.forEach(function (x, i) {
      f += '<g transform="translate(' + (x - 20) + ',64) scale(0.4)">' + formaG(tipos[i], COLORES[i + 1]) + "</g>";
      o += '<text x="' + x + '" y="165" font-size="32" text-anchor="middle">' + emo[i][0] + "</text>";
      o += '<text x="' + x + '" y="235" font-size="32" text-anchor="middle">' + emo[i][1] + "</text>";
      if (i) lin += '<line x1="' + (x - 27) + '" y1="64" x2="' + (x - 27) + '" y2="282" stroke="#e3e3e3" stroke-width="2"/>';
    });
    return '<svg viewBox="0 0 330 300">' +
      '<g id="hoja"><rect x="55" y="6" width="215" height="288" rx="6" fill="#fff" stroke="#adb5bd" stroke-width="2"/>' + lin + "</g>" +
      '<g id="lapices"><text x="27" y="70" font-size="30" text-anchor="middle">✏️</text><text x="27" y="115" font-size="30" text-anchor="middle">🖍️</text></g>' +
      '<text id="fecha" x="262" y="28" text-anchor="end" class="hand">FECHA: ___/___/___</text>' +
      '<text id="nombre" x="64" y="50" class="hand">NOMBRE Y APELLIDO: _________</text>' +
      '<g id="formasH">' + f + "</g><g id=\"objsH\">" + o + "</g>" +
      '<text id="foto" x="301" y="160" font-size="34" text-anchor="middle">📸</text></svg>';
  };
  R.narracion = function (s) {
    titulo(s);
    var tok = cur, esc = el("div", "escena"), cap = el("div", "cap may"), mano = el("div", "mano", "👆");
    esc.innerHTML = ESC[s.escena](); esc.appendChild(mano);
    stage.appendChild(esc); stage.appendChild(cap);
    var ocultos = {};
    s.pasos.forEach(function (p) { (p.mostrar || []).forEach(function (id) { ocultos[id] = 1; }); });
    Object.keys(ocultos).forEach(function (id) { var e = esc.querySelector("#" + id); if (e) e.setAttribute("class", (e.getAttribute("class") || "") + " oculto"); });
    var marcados = [];
    function clase(e, add, c) {
      var cl = (e.getAttribute("class") || "").split(" ").filter(function (x) { return x && x !== c; });
      if (add) cl.push(c); e.setAttribute("class", cl.join(" "));
    }
    function apuntar(e) {
      if (!e || !e.getBoundingClientRect) { mano.style.opacity = 0; return; }
      var r = e.getBoundingClientRect(), w = esc.getBoundingClientRect();
      var x = r.left - w.left + r.width / 2 - 18, y = r.bottom - w.top - 8;
      x = Math.max(0, Math.min(x, w.width - 40)); y = Math.max(0, Math.min(y, w.height - 44));
      mano.style.left = x + "px"; mano.style.top = y + "px"; mano.style.opacity = 1;
    }
    function paso(k) {
      if (!vivo(tok)) return;
      if (k >= s.pasos.length) { completar(); return; }
      var p = s.pasos[k];
      marcados.forEach(function (e) { clase(e, false, "titila"); }); marcados = [];
      (p.mostrar || []).forEach(function (id) { var e = esc.querySelector("#" + id); if (e) clase(e, false, "oculto"); });
      (p.marca || []).forEach(function (id) { var e = esc.querySelector("#" + id); if (e) { clase(e, true, "titila"); marcados.push(e); } });
      cap.textContent = p.texto; cap.classList.remove("aparece"); void cap.offsetWidth; cap.classList.add("aparece");
      requestAnimationFrame(function () { apuntar(marcados[0]); });
      say(p.audio, function () { paso(k + 1); });
    }
    paso(0);
  };

  R.cierre = function (s) {
    var w = el("div", "cierre");
    w.appendChild(imagen(s.img, s.emoji, "cimg"));
    w.appendChild(el("h1", "may", "¡Terminaste!"));
    var tot = st.aciertos + st.errores, pc = tot ? Math.round(st.aciertos / tot * 100) : 0;
    w.appendChild(el("div", "stats",
      '<div>✅<b>' + st.aciertos + '</b><span>Aciertos</span></div>' +
      '<div>❌<b>' + st.errores + '</b><span>Errores</span></div>' +
      '<div>📊<b>' + pc + '%</b><span>Total</span></div>' +
      '<div>⭐<b>' + st.puntos + '</b><span>Puntos</span></div>'));
    var fila = el("div", "pfila"), b = el("button", "btnGrande", "🔄 VOLVER A JUGAR");
    b.onclick = reiniciar; fila.appendChild(b); fila.appendChild(firma()); w.appendChild(fila);
    stage.appendChild(w); say(s.audio); completar();
  };

  /* ================= NAVEGACIÓN ================= */
  function limpiarEval(o) {
    if (Array.isArray(o)) o.forEach(limpiarEval);
    else if (o && typeof o === "object") { delete o._eval; delete o._hecho; Object.keys(o).forEach(function (k) { limpiarEval(o[k]); }); }
  }
  function reiniciar() { st.aciertos = st.errores = st.puntos = 0; limpiarEval(P); ir(0); }
  function ir(i) {
    if (i < 0 || i >= P.length) return;
    callar(); st.i = i; cur = { completa: false };
    var vf = stage.querySelector("iframe"); if (vf) vf.src = "about:blank"; vidAjuste = null;
    stage.className = ""; stage.innerHTML = "";
    var s = P[i], esp = s.tipo === "portada" || s.tipo === "cierre";
    document.body.setAttribute("data-tipo", s.tipo);
    barra.style.display = esp ? "none" : ""; pie.style.display = esp ? "none" : "";
    lblTit.textContent = D.meta.titulo; lblProg.textContent = i + " / " + (P.length - 2 > 0 ? P.length - 2 : P.length);
    btnSig.disabled = true;
    R[s.tipo](s); pts(); actSig();
  }
  function setVH() { document.documentElement.style.setProperty("--vh", window.innerHeight + "px"); }

  var iniciado = false;
  function init() {
    if (iniciado) return; iniciado = true;
    setVH(); window.addEventListener("resize", function () { setVH(); if (vidAjuste) vidAjuste(); });
    document.title = D.meta.titulo + " · QueSepanTodos";
    var app = document.getElementById("app");
    barra = el("div", "barra");
    lblTit = el("div", "btit"); lblPts = el("div", "bpts");
    barra.appendChild(lblTit); barra.appendChild(lblPts);
    stage = el("div"); stage.id = "escenario";
    pie = el("div", "pie"); lblProg = el("div", "prog");
    btnSig = el("button", "btnSig", "SIGUIENTE ➜"); btnSig.id = "btnSig";
    btnSig.onclick = function () { if (!btnSig.disabled) ir(st.i + 1); };
    pie.appendChild(lblProg); pie.appendChild(btnSig);
    app.appendChild(barra); app.appendChild(stage); app.appendChild(pie);
    ir(0);
  }
  window.QST = { ir: ir, st: st, cur: function () { return cur; }, idle: idle };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
