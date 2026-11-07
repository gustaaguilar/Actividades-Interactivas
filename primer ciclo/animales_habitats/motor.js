/* Motor QueSepanTodos — © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Sombras, sonidos y comidas de los animales (Sala de 4). ES5 para tablets viejas. */
(function () {
  "use strict";
  var D = window.DATOS, P = D.pantallas.filter(function (s) { return !(s.soloConVideo && !D.meta.video); });
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
  var Q = [], sonando = null, gen = 0, auAct = null, AC = null, espera = [], faltan = {};
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
    if (it.a.efecto && !it.a.t && faltan[it.a.ruta]) { to = setTimeout(fin, 10); return; }
    /* un solo reproductor reutilizado: ya quedó habilitado con el primer toque, así las
       narraciones encadenadas (que no vienen de un toque) también suenan en tablets y celulares */
    try { au = reproductor(); au.onended = au.onerror = null; au.src = it.a.ruta || ("audio/" + it.a.a + ".mp3"); } catch (e) { au = null; }
    auAct = au;
    /* si falta el sonido real, se lee el texto de respaldo con la voz del dispositivo */
    function plan() {
      clearTimeout(to);
      if (it.a.efecto) { faltan[it.a.ruta] = 1; if (!it.a.t) { to = setTimeout(fin, 10); return; } }
      to = setTimeout(fin, est(it.a) * 3 + 4000); hablar(it.a, fin);
    }
    if (!au) { plan(); return; }
    to = setTimeout(fin, est(it.a) * 3 + 3000); /* seguro anti-cuelgue */
    au.onended = fin;
    au.onerror = function () { if (my === gen && !done) plan(); };
    var p; try { p = au.play(); } catch (e) { plan(); return; }
    if (p && p.catch) p.catch(function (err) {
      if (err && err.name === "NotAllowedError") { clearTimeout(to); to = setTimeout(fin, est(it.a)); }
    });
  }
  var AU = null;
  function reproductor() { if (!AU) { AU = new Audio(); AU.preload = "auto"; } return AU; }
  /* habilita el reproductor en el primer toque del chico */
  function habilitar() {
    try {
      var r = reproductor();
      if (!sonando && !r.src) { r.muted = true; var p = r.play(); if (p && p.catch) p.catch(function () {}); r.pause(); r.muted = false; }
    } catch (e) {}
    document.removeEventListener("touchend", habilitar, true); document.removeEventListener("click", habilitar, true);
  }
  document.addEventListener("touchend", habilitar, true); document.addEventListener("click", habilitar, true);
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
        addC(b, "suena"); say(a.nombre); if (a.sonido) say(a.sonido);
        say(a.hace, function () { remC(b, "suena"); }); bloquear();
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
        } else if (par.alt && par.alt.indexOf(it._cid) >= 0) {
          remC(a, "sel"); sel = null;
          addC(b, "toque"); setTimeout(function () { remC(b, "toque"); }, 700);
          say(D.comunes.tambien); bloquear();
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
    var der = shuffle(s.pares).map(function (p) { return { img: p.c.img, emoji: p.c.emoji, nombre: p.c.nombre, _k: p.a.id, _cid: p.c.id, _par: p }; });
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

  /* Avanzar tras acierto o marcar error (opción única) */
  function responder(b, botones, it, ok, tok, sigF) {
    if (ok) {
      acierto(it); addC(b, "ok");
      botones.forEach(function (o) { if (o !== b) addC(o, "dim"); });
      sonido(true); say(it.conf); addC(stage, "bloq");
      cuandoTermine(function () { if (!vivo(tok)) return; remC(stage, "bloq"); sigF(); });
      return true;
    }
    error(it); addC(b, "mal"); setTimeout(function () { remC(b, "mal"); }, 900);
    sonido(false); say(D.comunes.error); bloquear();
    return false;
  }

  /* ¿Por dónde va? — tierra / agua / aire */
  R.clasificar = function (s) {
    titulo(s);
    var tok = cur, items = shuffle(s.items), n = items.length, k = 0;
    var cont = el("div", "cont"), cnt = el("div", "cnt centro"), obj = el("div", "objeto interact"), dest = el("div", "destinos interact");
    cont.appendChild(cnt); cont.appendChild(obj); cont.appendChild(dest); stage.appendChild(cont);
    var botones = [], res = false;
    var DEST = s.destinos || ["tierra", "agua", "aire"];
    dest.style.gridTemplateColumns = "repeat(" + DEST.length + ",1fr)";
    DEST.forEach(function (m) {
      var L = D.lugares[m], b = el("button", "op lugar");
      b.appendChild(imagen(L.img, L.e, "timg")); b.appendChild(el("div", "lab", L.n));
      b.onclick = function () {
        if (res) return;
        var it = items[k];
        if (responder(b, [], it, it.medio === m, tok, function () {
          remC(b, "ok"); k++;
          if (k < n) mostrar(); else { obj.innerHTML = '<span class="emo">🏅</span>'; completar(); }
        })) res = true;
      };
      b._m = m; botones.push(b); dest.appendChild(b);
    });
    function mostrar() {
      var it = items[k]; res = false;
      cnt.textContent = (k + 1) + " de " + n;
      obj.innerHTML = ""; obj.appendChild(imagen(it.img, it.emoji, "timg titila"));
      obj.onclick = function () { if (idle()) say(it.nombre); };
      say(it.nombre); bloquear();
    }
    say(s.intro); mostrar();
  };

  /* ¿Cuál es? — pregunta escrita y leída + 3 imágenes */
  R.elegir = function (s) {
    titulo(s);
    var tok = cur, n = s.items.length;
    var cont = el("div", "cont"), fila = el("div", "sonfila"), parl = el("button", "parlante chico interact", "🔊"), preg = el("div", "preg"), grid = el("div", "opciones c3 interact");
    fila.appendChild(parl); fila.appendChild(preg);
    cont.appendChild(fila); cont.appendChild(grid); stage.appendChild(cont);
    var it = null;
    parl.onclick = function () { if (it && idle()) { say(it.pregunta); bloquear(); } };
    function mostrar(k) {
      it = s.items[k]; var res = false, botones = [];
      preg.innerHTML = it.texto + ' <span class="cnt">' + (k + 1) + "/" + n + "</span>";
      grid.innerHTML = "";
      shuffle(it.opciones).forEach(function (op) {
        var b = el("button", "op"); b.appendChild(imagen(op.img, op.emoji, "timg"));
        b.onclick = function () {
          if (res) return;
          if (responder(b, botones, it, op.ok, tok, function () {
            if (k + 1 < n) setTimeout(function () { if (vivo(tok)) mostrar(k + 1); }, TEST ? 0 : 450); else completar();
          })) res = true;
        };
        botones.push(b); grid.appendChild(b);
      });
      if (k === 0) say(s.intro);
      say(it.pregunta); bloquear();
    }
    mostrar(0);
  };

  /* Seleccionar los que corresponden: cada acierto "se va" a la escena de fondo */
  R.seleccionar = function (s) {
    titulo(s);
    var tok = cur, total = s.items.filter(function (x) { return x.ok; }).length, hechos = 0;
    var esc = el("div", "selesc"), fondo = imagen(s.fondo, s.fondoEmoji, "selfondo"), capa = el("div", "selcapa");
    esc.appendChild(fondo); esc.appendChild(capa);
    var grid = el("div", "selgrid interact");
    stage.appendChild(esc); stage.appendChild(grid);
    var pos = [[8, 16], [30, 50], [52, 20], [70, 52], [86, 22], [18, 62], [62, 70], [40, 30]];
    shuffle(s.items).forEach(function (it) {
      var b = el("button", "tarj"); b.appendChild(imagen(it.img, it.emoji, "timg"));
      b.onclick = function () {
        if (it._hecho || !idle()) return;
        if (it.ok) {
          it._hecho = true; acierto(it); addC(b, "ido");
          var m = imagen(it.img, it.emoji, "nadador"), p = pos[hechos % pos.length];
          m.style.left = p[0] + "%"; m.style.top = p[1] + "%"; capa.appendChild(m);
          hechos++; sonido(true); say(it.dice); bloquear();
          if (hechos === total) { say(s.fin); cuandoTermine(function () { if (vivo(tok)) completar(); }); }
        } else {
          error(it); addC(b, "mal"); setTimeout(function () { remC(b, "mal"); }, 900);
          sonido(false); say(it.dice); bloquear();
        }
      };
      grid.appendChild(b);
    });
    say(s.intro); bloquear();
  };

  /* Memojuego: animal ↔ su hábitat (cartas boca abajo) */
  R.memo = function (s) {
    titulo(s);
    var tok = cur, grid = el("div", "memo interact"), abiertas = [], hechos = 0, nPar = 0;
    var cartas = [];
    s.pares.forEach(function (p) {
      cartas.push({ k: p.id, img: p.a.img, emoji: p.a.emoji, nombre: p.a.nombre, par: p });
      cartas.push({ k: p.id, img: p.h.img, emoji: p.h.emoji, nombre: p.h.nombre, par: p, hab: true });
    });
    shuffle(cartas).forEach(function (c) {
      var b = el("button", "carta" + (c.hab ? " chab" : "")), dorso = el("div", "dorso", "🐾"), cara = el("div", "cara");
      cara.appendChild(imagen(c.img, c.emoji, "timg"));
      b.appendChild(dorso); b.appendChild(cara); b._c = c;
      b.onclick = function () {
        if (b._hecho || b._abierta || abiertas.length >= 2 || !idle()) return;
        b._abierta = true; addC(b, "abierta"); abiertas.push(b); say(c.nombre);
        if (abiertas.length === 2) {
          var x = abiertas[0], y = abiertas[1];
          if (x._c.k === y._c.k && x._c.hab !== y._c.hab) {
            var col = PAR[nPar++ % PAR.length];
            [x, y].forEach(function (z) { z._hecho = true; addC(z, "hecha"); z.style.borderColor = col; z.style.boxShadow = "0 0 0 4px " + col + "66"; });
            abiertas = []; acierto(c.par); hechos++;
            sonido(true); say(c.par.conf); bloquear();
            if (hechos === s.pares.length) cuandoTermine(function () { if (vivo(tok)) completar(); });
          } else {
            bloquear();
            cuandoTermine(function () {
              setTimeout(function () {
                [x, y].forEach(function (z) { z._abierta = false; remC(z, "abierta"); });
                abiertas = [];
              }, TEST ? 0 : 700);
            });
          }
        }
      };
      grid.appendChild(b);
    });
    stage.appendChild(grid);
    say(s.intro); bloquear();
  };

  /* Rompecabezas de 4 piezas (tocar pieza, después su lugar) */
  R.puzzle = function (s) {
    titulo(s);
    var tok = cur, wrap = el("div", "puz"), tablero = el("div", "puztab"), bandeja = el("div", "puzban interact"), capa = el("div", "puzcapa");
    tablero.appendChild(capa); wrap.appendChild(tablero); wrap.appendChild(bandeja); stage.appendChild(wrap);
    var pos = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"], sel = null, puestas = 0, huecos = [];
    function fondo(e, k) { e.style.backgroundImage = "url('" + s.img + "')"; e.style.backgroundSize = "200% 200%"; e.style.backgroundPosition = pos[k]; }
    for (var k = 0; k < 4; k++) {
      var h = el("button", "hueco interact"); h._k = k; huecos.push(h); tablero.insertBefore(h, capa);
      (function (h) {
        h.onclick = function () {
          if (!sel || h._lleno || !idle()) return;
          var pz = sel; sel = null; remC(pz, "sel");
          if (pz._k === h._k) {
            h._lleno = true; fondo(h, h._k); addC(h, "lleno"); pz.style.visibility = "hidden";
            acierto(pz._it); puestas++; sonido(true);
            if (puestas === 4) {
              (s.animales || []).forEach(function (a, i) {
                var m = imagen(a.img, a.emoji, "puzani"); m.style.left = a.x + "%"; m.style.top = a.y + "%";
                m.style.animationDelay = (i * 0.25) + "s"; capa.appendChild(m);
              });
              addC(tablero, "completo"); addC(wrap, "listo"); say(s.fin); bloquear();
              cuandoTermine(function () { if (vivo(tok)) completar(); });
            }
          } else {
            error(pz._it); addC(h, "mal"); setTimeout(function () { remC(h, "mal"); }, 800);
            sonido(false); say(D.comunes.pieza); bloquear();
          }
        };
      })(h);
    }
    shuffle([0, 1, 2, 3]).forEach(function (k) {
      var pz = el("button", "pieza"); pz._k = k; pz._it = {}; fondo(pz, k);
      pz.onclick = function () { if (!idle()) return; if (sel) remC(sel, "sel"); sel = pz; addC(pz, "sel"); };
      bandeja.appendChild(pz);
    });
    say(s.intro); bloquear();
  };

  /* ¿Quién se equivocó de casa? — rondas con un intruso */
  R.intruso = function (s) {
    titulo(s);
    var tok = cur, n = s.rondas.length;
    var esc = el("div", "intesc"), fondo = el("div", "intfondo"), grid = el("div", "intgrid interact"), cnt = el("div", "cnt intcnt");
    esc.appendChild(fondo); esc.appendChild(grid); esc.appendChild(cnt); stage.appendChild(esc);
    function mostrar(k) {
      var R0 = s.rondas[k], res = false;
      cnt.textContent = (k + 1) + " de " + n;
      fondo.innerHTML = ""; fondo.appendChild(imagen(R0.img, R0.emoji, "intimg"));
      grid.innerHTML = "";
      shuffle(R0.animales).forEach(function (a) {
        var b = el("button", "intani"); b.appendChild(imagen(a.img, a.emoji, "timg"));
        b.onclick = function () {
          if (res || !idle()) return;
          if (a.intruso) {
            res = true; acierto(R0); addC(b, "fuera"); sonido(true); say(R0.conf); addC(stage, "bloq");
            cuandoTermine(function () {
              if (!vivo(tok)) return; remC(stage, "bloq");
              if (k + 1 < n) setTimeout(function () { if (vivo(tok)) mostrar(k + 1); }, TEST ? 0 : 450); else completar();
            });
          } else {
            error(R0); addC(b, "mal"); setTimeout(function () { remC(b, "mal"); }, 900);
            sonido(false); say(a.dice); bloquear();
          }
        };
        grid.appendChild(b);
      });
      if (k === 0) say(s.intro);
      say(R0.pregunta); bloquear();
    }
    mostrar(0);
  };

  /* Narración con manito: lugar → transporte */
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
    b.onclick = reiniciar; fila.appendChild(b); fila.appendChild(firma()); w.appendChild(fila);
    try { if (window.QSTEnvio) w.appendChild(QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.area, aciertos: st.aciertos, errores: st.errores, puntos: st.puntos })); } catch (e) {}
    stage.appendChild(w); say(s.audio); completar();
  };

  /* ================= NAVEGACIÓN ================= */
  function limpiarEval(o) {
    if (Array.isArray(o)) o.forEach(limpiarEval);
    else if (o && typeof o === "object") { delete o._eval; delete o._oido; delete o._hecho; Object.keys(o).forEach(function (k) { limpiarEval(o[k]); }); }
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
