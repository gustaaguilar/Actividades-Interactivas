/* motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
   Mecánicas: portada, narracion (animada), asociar, trivia (reloj/digital/vf/fijo),
   ponerHora, clasificar, duracion, sopa, invitacion, cierre. */
(function () {
  'use strict';
  var D = window.DATOS, P = D.pantallas, M = D.meta;
  var RA = 'audio/', RI = 'img/', FALLBACK = 500;
  var est = { i: 0, aciertos: 0, errores: 0, puntos: 0 };
  var scr = {};
  var app = document.getElementById('app');

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function mezclar(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ================= AUDIO: cola global ================= */
  var AU = { cola: [], gen: 0, sonando: false, el: null, imp: 0 };
  function encolar(a, cb, imp) {
    if (imp) AU.imp++;
    AU.cola.push({ au: a ? (a.au || a) : null, cb: cb, imp: !!imp });
    if (!AU.sonando) sig();
    actualizarNav();
  }
  function sig() {
    if (!AU.cola.length) { AU.sonando = false; AU.el = null; actualizarNav(); return; }
    var it = AU.cola.shift(), g = AU.gen, fin = false;
    AU.sonando = true; actualizarNav();
    function term() {
      if (fin || g !== AU.gen) return; fin = true;
      if (it.imp) AU.imp = Math.max(0, AU.imp - 1);
      if (it.cb) { try { it.cb(); } catch (e) { console.error(e); } }
      if (g === AU.gen) sig();
    }
    if (!it.au) { setTimeout(term, 0); return; }
    var el;
    try { el = new Audio(RA + it.au + '.mp3'); } catch (e) { setTimeout(term, FALLBACK); return; }
    AU.el = el;
    el.onended = term;
    el.onerror = function () { setTimeout(term, FALLBACK); };
    try { var p = el.play(); if (p && p.catch) p.catch(function () { setTimeout(term, FALLBACK); }); }
    catch (e) { setTimeout(term, FALLBACK); }
  }
  function cortar() {
    AU.gen++; AU.cola = []; AU.imp = 0;
    if (AU.el) { try { AU.el.onended = null; AU.el.onerror = null; AU.el.pause(); } catch (e) {} }
    AU.el = null; AU.sonando = false;
  }
  function libre() { return !AU.sonando && !AU.cola.length; }
  /* audio propio de un elemento al tocarlo (no corta confirmaciones) */
  function tocar(a) { if (!a || AU.imp > 0) return; cortar(); encolar(a); }

  var actx = null;
  function bip(ok) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var t = actx.currentTime, notas = ok ? [660, 990] : [200, 160];
      notas.forEach(function (f, k) {
        var o = actx.createOscillator(), g = actx.createGain(), t0 = t + k * 0.12;
        o.type = ok ? 'sine' : 'square'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(ok ? 0.25 : 0.07, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
        o.connect(g); g.connect(actx.destination); o.start(t0); o.stop(t0 + 0.22);
      });
    } catch (e) {}
  }

  /* ================= Puntaje (primer intento) ================= */
  function evaluar(reg, key, ok) {
    if (reg[key] !== undefined) return;
    reg[key] = ok;
    if (ok) { est.aciertos++; est.puntos += 10; } else est.errores++;
    var c = $('#cpts'); if (c) c.textContent = '⭐ ' + est.puntos;
  }

  /* ================= Estructura ================= */
  app.innerHTML =
    '<header id="cab"><span class="ctit">⏰ ' + esc(M.titulo) + '</span><span class="cpant" id="cpant"></span>' +
    '<button id="brep" title="Repetir consigna">🔊</button><span class="cpts" id="cpts">⭐ 0</span></header>' +
    '<main id="esc"></main>' +
    '<footer id="pie">' + (M.revision ? '<button class="bnav rev" id="brA">◀</button>' : '<span></span>') +
    '<span id="ind"></span><button class="bnav" id="bsig" disabled>Siguiente ▶</button>' +
    (M.revision ? '<button class="bnav rev" id="brS">▶</button>' : '') + '</footer>';
  var main = $('#esc');
  $('#bsig').onclick = function () { if (scr.completa && libre()) ir(est.i + 1); };
  $('#brep').onclick = function () { if (scr.repetir && libre() && !scr.bloq) scr.repetir(); };
  if (M.revision) {
    $('#brA').onclick = function () { if (est.i > 0) ir(est.i - 1); };
    $('#brS').onclick = function () { if (est.i < P.length - 1) ir(est.i + 1); };
  }

  function actualizarNav() {
    var b = $('#bsig'); if (!b) return;
    var ok = !!(scr.completa && libre());
    b.disabled = !ok; b.classList.toggle('listo', ok);
    var r = $('#brep'); if (r) r.classList.toggle('sonando', !libre());
  }
  function bloquear() { scr.bloq = true; main.classList.add('bloq'); }
  function desbloquear() { scr.bloq = false; main.classList.remove('bloq'); }
  function instruir(lista, cb) {
    bloquear();
    lista = lista.filter(Boolean);
    if (!lista.length) { desbloquear(); if (cb) cb(); return; }
    lista.forEach(function (a, k) {
      encolar(a, k === lista.length - 1 ? function () { desbloquear(); if (cb) cb(); } : null, true);
    });
  }
  function completar() { scr.completa = true; actualizarNav(); }
  function vigente(tok) { return tok === scr.tok; }

  function ir(n) {
    cortar();
    est.i = n;
    scr = { completa: false, bloq: false, tok: Math.random(), repetir: null };
    main.innerHTML = ''; main.className = '';
    var p = P[n];
    var conPie = p.tipo !== 'portada' && p.tipo !== 'cierre';
    $('#pie').classList.toggle('oculto', !conPie && !M.revision);
    $('#bsig').style.visibility = conPie ? 'visible' : 'hidden';
    var total = P.length - 2;
    $('#ind').textContent = conPie ? (n + ' / ' + total) : '';
    $('#cpant').textContent = p.titulo || '';
    actualizarNav();
    (R[p.tipo] || R.vacia)(p);
  }

  /* ================= Firma y lightbox ================= */
  function firmaHTML() {
    return '<div class="firma"><img src="' + (M.fotoMini || M.foto) + '" alt="Profe Gustavo Aguilar" class="fotoProfe">' +
      '<div><b>' + esc(M.autor) + '</b><br>✉️ ' + esc(M.mail) + '</div></div>';
  }
  function activarFoto(raiz) { $$('.fotoProfe', raiz).forEach(function (im) { im.onclick = abrirLightbox; }); }
  function abrirLightbox() {
    var ov = document.createElement('div'); ov.className = 'lb';
    ov.innerHTML = '<button class="lbx" aria-label="Cerrar">✕</button><div class="lbmarco"><img src="' + M.foto + '" alt=""></div>' +
      '<p class="lbfrase">Menos prisa, más vida 🧉🫂</p><p class="lbdatos">' + esc(M.autor) + '<br>✉️ ' + esc(M.mail) + '</p>';
    var img = $('img', ov), z = false;
    img.onclick = function (e) {
      if (!z) {
        var r = img.getBoundingClientRect();
        var x = r.width ? (e.clientX - r.left) / r.width * 100 : 50, y = r.height ? (e.clientY - r.top) / r.height * 100 : 50;
        img.style.transformOrigin = x + '% ' + y + '%'; img.style.transform = 'scale(2.4)';
      } else img.style.transform = 'scale(1)';
      z = !z;
    };
    $('.lbx', ov).onclick = function () { img.style.transform = 'scale(1)'; ov.parentNode.removeChild(ov); };
    document.body.appendChild(ov);
  }

  /* ================= Reloj SVG ================= */
  function svgReloj(o) {
    var id = o.id, s = '<svg class="reloj" viewBox="-24 -24 248 248" id="' + id + '" xmlns="http://www.w3.org/2000/svg">';
    s += '<circle cx="100" cy="100" r="98" class="rbor"/><circle cx="100" cy="100" r="90" class="rfondo"/>';
    s += '<path id="' + id + '_sector" d="" fill="none"/>';
    for (var t = 0; t < 60; t++) {
      var a = t * 6 * Math.PI / 180, g = t % 5 === 0, r1 = g ? 80 : 84;
      s += '<line class="rtick' + (g ? ' g' : '') + '" x1="' + (100 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (100 - r1 * Math.cos(a)).toFixed(1) +
        '" x2="' + (100 + 88 * Math.sin(a)).toFixed(1) + '" y2="' + (100 - 88 * Math.cos(a)).toFixed(1) + '"/>';
    }
    s += '<g id="' + id + '_nums">';
    for (var n = 1; n <= 12; n++) {
      var b = n * 30 * Math.PI / 180;
      s += '<text class="rnum" id="' + id + '_num' + n + '" x="' + (100 + 66 * Math.sin(b)).toFixed(1) + '" y="' + (106 - 66 * Math.cos(b)).toFixed(1) + '">' + n + '</text>';
    }
    s += '</g>';
    if (o.minutos) {
      s += '<g id="' + id + '_minutos" class="' + (o.minVisibles ? '' : 'oculto') + '">';
      for (var k = 1; k <= 12; k++) {
        var c = k * 30 * Math.PI / 180;
        s += '<text class="rmin" id="' + id + '_min' + k + '" x="' + (100 + 110 * Math.sin(c)).toFixed(1) + '" y="' + (104 - 110 * Math.cos(c)).toFixed(1) + '">' + (k * 5) + '</text>';
      }
      s += '</g>';
    }
    s += '<line id="' + id + '_aguH" class="aguH' + (o.sinH ? ' oculto' : '') + '" x1="100" y1="100" x2="100" y2="52"/>';
    s += '<line id="' + id + '_aguM" class="aguM" x1="100" y1="100" x2="100" y2="26"/>';
    s += '<circle cx="100" cy="100" r="6" class="rcen"/>';
    if (o.interactivo) {
      for (var q = 1; q <= 12; q++) {
        var d = q * 30 * Math.PI / 180;
        s += '<circle class="rhit" data-n="' + q + '" cx="' + (100 + 66 * Math.sin(d)).toFixed(1) + '" cy="' + (100 - 66 * Math.cos(d)).toFixed(1) + '" r="17" fill="#000" fill-opacity="0"/>';
      }
    }
    return s + '</svg>';
  }
  var angulos = {};
  function rot(eid, a) { angulos[eid] = a; var e = document.getElementById(eid); if (e) e.setAttribute('transform', 'rotate(' + a.toFixed(2) + ' 100 100)'); }
  function ponerAgujas(id, h, m) { rot(id + '_aguH', ((h % 12) + m / 60) * 30); rot(id + '_aguM', m * 6); }
  function animar(ms, paso, cb) {
    var t0 = null, raf = window.requestAnimationFrame || function (f) { return setTimeout(function () { f(Date.now()); }, 16); };
    function f(ts) {
      if (t0 === null) t0 = ts;
      var q = Math.min(1, (ts - t0) / ms), e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
      paso(e); if (q < 1) raf(f); else if (cb) cb();
    }
    raf(f);
  }
  function animarReloj(id, de, a, ms, cb) {
    var x = de[0] * 60 + de[1], y = a[0] * 60 + a[1];
    animar(ms, function (e) { var t = x + (y - x) * e, hh = Math.floor(t / 60); ponerAgujas(id, hh, t - hh * 60); }, cb);
  }
  function animarRot(eid, a, ms, cb) {
    var de = angulos[eid] || 0;
    animar(ms, function (e) { rot(eid, de + (a - de) * e); }, cb);
  }
  function arco(deg, r) {
    if (deg <= 0) return '';
    if (deg >= 359.9) return 'M100,' + (100 - r) + ' A' + r + ',' + r + ' 0 1,1 99.99,' + (100 - r) + ' Z';
    var a = deg * Math.PI / 180;
    return 'M100,100 L100,' + (100 - r) + ' A' + r + ',' + r + ' 0 ' + (deg > 180 ? 1 : 0) + ',1 ' + (100 + r * Math.sin(a)).toFixed(2) + ',' + (100 - r * Math.cos(a)).toFixed(2) + ' Z';
  }
  function hora12(h, m) { return (h % 12 === 0 ? 12 : h % 12) + ':' + (m < 10 ? '0' : '') + m; }

  /* ================= Puntero animado ================= */
  function apuntar(el) {
    var p = $('#ptr'); if (!p) return;
    if (!el) { p.style.display = 'none'; return; }
    var r = el.getBoundingClientRect(), mr = main.getBoundingClientRect();
    p.style.display = 'block';
    p.style.left = (r.left - mr.left + r.width / 2 - 14) + 'px';
    p.style.top = (r.top - mr.top + r.height / 2 - 4) + 'px';
  }

  var R = {};
  R.vacia = function () { main.innerHTML = '<p>Pantalla sin contenido</p>'; completar(); };

  /* ---------- PORTADA ---------- */
  R.portada = function () {
    main.innerHTML = '<div class="portada"><img class="pimg" src="' + RI + M.imgPortada + '" alt="">' +
      '<h1>' + esc(M.titulo) + ' ⏰</h1><span class="grado">' + esc(M.grado) + '</span>' +
      '<p class="sub">' + esc(M.subtitulo) + '</p>' +
      '<div class="pfila"><button class="btn" id="bcom">▶ Comenzar</button>' + firmaHTML() + '</div>' +
      '<p class="fuente">' + esc(M.fuente) + '<br>' + esc(M.licencia) + '</p></div>';
    activarFoto(main);
    $('#bcom').onclick = function () { bip(true); est.aciertos = est.errores = est.puntos = 0; $('#cpts').textContent = '⭐ 0'; ir(1); };
  };

  /* ---------- CIERRE ---------- */
  R.cierre = function (p) {
    var t = est.aciertos + est.errores, pc = t ? Math.round(est.aciertos / t * 100) : 0;
    main.innerHTML = '<div class="cierre"><img class="cimg" src="' + RI + M.imgCierre + '" alt=""><h2>¡Terminaste! 🎉</h2>' +
      '<div class="stats"><div>✅<b>' + est.aciertos + '</b>Aciertos</div><div>❌<b>' + est.errores + '</b>Errores</div>' +
      '<div>📊<b>' + pc + '%</b>Total</div><div>⭐<b>' + est.puntos + '</b>Puntos</div></div>' +
      '<div class="pfila"><button class="btn" id="bvol">🔄 Volver a jugar</button>' + firmaHTML() + '</div></div>';
    activarFoto(main);
    $('#bvol').onclick = function () { est.aciertos = est.errores = est.puntos = 0; $('#cpts').textContent = '⭐ 0'; ir(0); };
    encolar(p.audio);
  };

  /* ---------- NARRACIÓN ANIMADA ---------- */
  var VIS = {
    partes: {
      init: function (c) {
        c.innerHTML = svgReloj({ id: 'np', minutos: true }) + '<div class="digital oculto" id="np_dig">4:00</div>';
        ponerAgujas('np', 4, 0);
      },
      paso: function (s) {
        if (s.destacar === 'minutos') $('#np_minutos').classList.remove('oculto');
        if (s.destacar === 'dig') $('#np_dig').classList.remove('oculto');
      },
      el: function (k) { return document.getElementById(k === 'dig' ? 'np_dig' : 'np_' + k); }
    },
    equiv: {
      init: function (c) {
        c.innerHTML = svgReloj({ id: 'ne', sinH: true });
        ponerAgujas('ne', 12, 0);
      },
      paso: function (s) {
        var sec = $('#ne_sector');
        sec.setAttribute('fill', s.color); sec.setAttribute('fill-opacity', '0.28');
        animar(2200, function (e) { var g = s.giro * e; sec.setAttribute('d', arco(g, 88)); rot('ne_aguM', g); });
      },
      el: function (k) { return document.getElementById('ne_' + k); }
    },
    formatos: {
      init: function (c) {
        c.innerHTML = '<div class="fsol" id="fsol">☀️ 🌙</div><div class="fmt">' +
          '<div class="fcol"><div class="flab">Formato de 12 horas<br><small>(reloj común)</small></div><div class="digital" id="f12">--:--</div></div>' +
          '<div class="fcol"><div class="flab">Formato de 24 horas<br><small>(de 00:00 a 23:59)</small></div><div class="digital" id="f24">--:--</div></div></div>';
      },
      paso: function (s) {
        if (s.d12) $('#f12').textContent = s.d12;
        if (s.d24) $('#f24').textContent = s.d24;
        $('#fsol').textContent = s.icono || '☀️ 🌙';
      },
      el: function (k) { return document.getElementById(k); }
    }
  };
  R.narracion = function (p) {
    main.innerHTML = '<div class="narr"><div class="nvis" id="nvis"></div><div class="ncap" id="ncap"></div></div><div class="puntero" id="ptr">👆</div>';
    var V = VIS[p.visual], tok = scr.tok, k = 0, prevDest = null;
    V.init($('#nvis'));
    bloquear();
    function paso() {
      if (!vigente(tok)) return;
      if (prevDest) prevDest.classList.remove(prevDest.tagName.toLowerCase() === 'div' ? 'titila' : 'brilla');
      if (k >= p.pasos.length) { apuntar(null); desbloquear(); completar(); return; }
      var s = p.pasos[k];
      V.paso(s);
      var cap = $('#ncap');
      if (!p.acumular) cap.innerHTML = '';
      $$('.chip', cap).forEach(function (c) { c.classList.remove('titila'); c.classList.add('prev'); });
      var ch = document.createElement('div'); ch.className = 'chip titila'; ch.textContent = s.chip;
      if (s.color) ch.style.color = s.color;
      cap.appendChild(ch);
      var d = s.destacar ? V.el(s.destacar) : null;
      if (d) { d.classList.add(d.tagName.toLowerCase() === 'div' ? 'titila' : 'brilla'); prevDest = d; } else prevDest = null;
      setTimeout(function () { if (vigente(tok)) apuntar(s.apuntar ? V.el(s.apuntar) : null); }, 60);
      encolar(s.audio, function () { k++; paso(); }, true);
    }
    paso();
    scr.repetir = function () { cortar(); ir(est.i); };
  };

  /* ---------- ASOCIAR ---------- */
  R.asociar = function (p) {
    var pal = ['#f59e0b', '#8b5cf6', '#0891b2', '#db2777', '#65a30d', '#ea580c'];
    main.innerHTML = '<div class="decor-svg">' + svgReloj({ id: 'ad', sinH: true }) + '</div><div class="asoc"><div class="acol" id="cA"></div><div class="acol" id="cB"></div></div>';
    var sec = $('#ad_sector'); sec.setAttribute('d', arco(90, 88)); sec.setAttribute('fill', '#15803d'); sec.setAttribute('fill-opacity', '.3'); ponerAgujas('ad', 12, 15);
    var reg = {}, sel = { a: null, b: null }, hechos = 0, col = 0;
    function carta(i, lado) {
      var par = p.pares[i], b = document.createElement('button');
      b.className = 'tarj'; b.textContent = lado === 'a' ? par.a : par.b; b.dataset.i = i; b.dataset.lado = lado;
      b.onclick = function () {
        if (scr.bloq || b.classList.contains('par')) return;
        tocar(lado === 'a' ? par.auA : par.auB);
        if (sel[lado]) sel[lado].classList.remove('sel');
        sel[lado] = b; b.classList.add('sel');
        if (sel.a && sel.b) revisar();
      };
      return b;
    }
    function revisar() {
      var a = sel.a, b = sel.b, ia = +a.dataset.i, ib = +b.dataset.i;
      a.classList.remove('sel'); b.classList.remove('sel'); sel = { a: null, b: null };
      if (ia === ib) {
        var c = pal[col++ % pal.length];
        [a, b].forEach(function (x) { x.classList.add('par'); x.style.background = c; x.style.borderColor = c; });
        bip(true); evaluar(reg, ia, true); hechos++;
        cortar(); encolar(p.pares[ia].conf, null, true);
        if (hechos === p.pares.length) { encolar(p.fin, null, true); completar(); }
      } else {
        bip(false); evaluar(reg, ia, false);
        [a, b].forEach(function (x) { x.classList.add('sacude'); setTimeout(function () { x.classList.remove('sacude'); }, 450); });
        if (p.pista && AU.imp === 0) { cortar(); encolar(p.pista); }
      }
    }
    var cA = $('#cA'), cB = $('#cB');
    mezclar(p.pares.map(function (x, i) { return i; })).forEach(function (i) { cA.appendChild(carta(i, 'a')); });
    mezclar(p.pares.map(function (x, i) { return i; })).forEach(function (i) { cB.appendChild(carta(i, 'b')); });
    instruir([p.instr]);
    scr.repetir = function () { instruir([p.instr]); };
  };

  /* ---------- TRIVIA (reloj / digital / fijo / V-F) ---------- */
  function htmlFijo(f) {
    if (f.tipo === 'invitacion') {
      return '<div class="invit"><img src="' + RI + f.img + '" alt=""><div class="invtxt"><div class="invtit">¡Estás invitado a mi cumpleaños!</div>' +
        '<div>📅 <b>Día:</b> ' + esc(f.dia) + '</div><div>⏰ <b>Hora:</b> ' + esc(f.hora) + '</div>' +
        '<div>📍 <b>Lugar:</b> ' + esc(f.lugar) + '</div><div>🎁 <b>No olvides:</b> ' + esc(f.olvides) + '</div></div></div>';
    }
    return '';
  }
  R.trivia = function (p) {
    main.innerHTML = '<div class="triv"><div class="tvis" id="tvis"></div><div class="tprog" id="tprog"></div>' +
      '<div class="tpreg" id="tpreg"></div><div class="topc" id="topc"></div></div>';
    var tok = scr.tok, k = 0, reg = {}, resuelto = false;
    if (p.fijo) $('#tvis').innerHTML = htmlFijo(p.fijo);
    else if (p.img) $('#tvis').innerHTML = '<img class="decor" src="' + RI + p.img + '" alt="">';
    function item(primero) {
      var it = p.items[k]; resuelto = false;
      if (it.reloj) { $('#tvis').innerHTML = svgReloj({ id: 'tr' }); ponerAgujas('tr', it.reloj[0], it.reloj[1]); }
      else if (it.digital) $('#tvis').innerHTML = '<div class="digital grande">' + esc(it.digital) + '</div>';
      $('#tprog').textContent = (k + 1) + ' de ' + p.items.length;
      var pr = $('#tpreg'); pr.textContent = it.preg; pr.classList.add('titila');
      var opciones, ok;
      if (p.vf) { opciones = ['✅ Verdadero', '❌ Falso']; ok = it.v ? opciones[0] : opciones[1]; }
      else { opciones = mezclar(it.opc); ok = it.ok; }
      var largo = Math.max.apply(null, opciones.map(function (o) { return o.length; }));
      var cont = $('#topc'); cont.className = 'topc ' + (largo <= 12 ? 'dos' : 'uno'); cont.innerHTML = '';
      opciones.forEach(function (o) {
        var b = document.createElement('button'); b.className = 'opc'; b.textContent = o;
        b.onclick = function () { elegir(b, o === ok, it); };
        cont.appendChild(b);
      });
      instruir([primero ? p.instr : null, it.audio]);
    }
    function elegir(b, esOk, it) {
      if (scr.bloq || resuelto) return;
      if (esOk) {
        resuelto = true; b.classList.add('ok');
        $$('.opc', $('#topc')).forEach(function (x) { if (x !== b) x.classList.add('atenuada'); });
        bip(true); evaluar(reg, k, true); cortar();
        $('#tpreg').classList.remove('titila');
        var luego = function () { encolar(it.conf, function () { setTimeout(siguiente, 600); }, true); };
        if (it.animarA) animarReloj('tr', it.reloj, it.animarA, 1800, function () { if (vigente(tok)) luego(); });
        else luego();
      } else {
        b.classList.add('mal', 'sacude'); bip(false); evaluar(reg, k, false);
        if (it.pista && AU.imp === 0) { cortar(); encolar(it.pista); }
      }
    }
    function siguiente() {
      if (!vigente(tok)) return;
      k++;
      if (k < p.items.length) item(false); else completar();
    }
    item(true);
    scr.repetir = function () { if (!resuelto) instruir([p.items[k].audio]); };
  };

  /* ---------- PONER LA HORA ---------- */
  R.ponerHora = function (p) {
    main.innerHTML = '<div class="ph"><div class="tpreg" id="phq"></div><div id="phv">' + svgReloj({ id: 'ph', interactivo: true }) + '</div>' +
      '<div class="phpaso titila" id="phpaso"></div></div>';
    var tok = scr.tok, k = 0, fase = 'M', reg = {};
    function txtPaso() {
      $('#phpaso').innerHTML = fase === 'M' ? '👉 Tocá el número para la <span style="color:#dc2626">aguja grande</span> (minutos)'
        : '👉 Tocá el número para la <span style="color:#1d4ed8">aguja pequeña</span> (horas)';
      $('#ph_aguM').classList.toggle('brilla', fase === 'M');
      $('#ph_aguH').classList.toggle('brilla', fase === 'H');
    }
    function item(primero) {
      var it = p.items[k]; fase = 'M';
      ponerAgujas('ph', 12, 0);
      $('#phq').innerHTML = (k + 1) + ' de ' + p.items.length + ' · Poné el reloj a ' + esc(it.txt) + ' <span class="digital mini">' + esc(it.dig) + '</span>';
      txtPaso();
      instruir([primero ? p.instr : null, it.audio, primero ? p.pasoM : null]);
    }
    $$('.rhit', main).forEach(function (c) {
      c.addEventListener('click', function () {
        if (scr.bloq || fase === 'fin') return;
        var n = +c.getAttribute('data-n'), it = p.items[k];
        c.classList.add('toque'); setTimeout(function () { c.classList.remove('toque'); }, 350);
        if (fase === 'M') {
          var mm = (n % 12) * 5;
          animarRot('ph_aguM', mm * 6 + (mm === 0 && angulos.ph_aguM > 180 ? 360 : 0), 500, function () {
            if (!vigente(tok)) return;
            if (mm === it.m) {
              bip(true); rot('ph_aguM', mm * 6); fase = 'H'; txtPaso();
              rot('ph_aguH', 0);
              if (k === 0) { cortar(); encolar(p.pasoH, null, true); }
            } else {
              bip(false); evaluar(reg, k, false);
              if (AU.imp === 0) { cortar(); encolar(p.pistaM); }
              setTimeout(function () { if (vigente(tok)) animarRot('ph_aguM', 0, 400); }, 500);
            }
          });
        } else if (fase === 'H') {
          var objetivo = ((it.h % 12) + it.m / 60) * 30;
          if (n % 12 === it.h % 12) {
            fase = 'fin'; $('#ph_aguH').classList.remove('brilla'); $('#phpaso').classList.remove('titila');
            $('#phpaso').innerHTML = '✅ ' + esc(it.dig);
            animarRot('ph_aguH', objetivo, 600, function () {
              if (!vigente(tok)) return;
              bip(true); evaluar(reg, k, true); cortar();
              encolar(it.conf, function () { setTimeout(siguiente, 600); }, true);
            });
          } else {
            bip(false); evaluar(reg, k, false);
            animarRot('ph_aguH', (n % 12) * 30, 400, function () { setTimeout(function () { if (vigente(tok) && fase === 'H') animarRot('ph_aguH', 0, 400); }, 450); });
            if (AU.imp === 0) { cortar(); encolar(p.pistaH); }
          }
        }
      });
    });
    function siguiente() {
      if (!vigente(tok)) return;
      k++;
      if (k < p.items.length) item(false); else { $('#phpaso').innerHTML = '🎉 ¡Pusiste todas las horas!'; completar(); }
    }
    item(true);
    scr.repetir = function () { if (fase !== 'fin') instruir([p.items[k].audio]); };
  };

  /* ---------- CLASIFICAR ---------- */
  R.clasificar = function (p) {
    main.innerHTML = '<div class="clas"><img class="decor" src="' + RI + p.img + '" alt=""><div class="cats" id="cats"></div><div class="cartas" id="cartas"></div></div>';
    var reg = {}, sel = null, puestas = 0;
    p.cats.forEach(function (c) {
      var d = document.createElement('div'); d.className = 'cat ' + c.id; d.dataset.c = c.id;
      d.innerHTML = '<div class="cattit">' + esc(c.txt) + '</div><div class="catcont"></div>';
      d.onclick = function () {
        if (scr.bloq) return;
        if (!sel) { tocar(c.audio); return; }
        var i = +sel.dataset.i, carta = p.cartas[i];
        if (carta.cat === c.id) {
          bip(true); evaluar(reg, i, true);
          var u = document.createElement('div'); u.className = 'ubic'; u.textContent = carta.txt;
          $('.catcont', d).appendChild(u);
          sel.parentNode.removeChild(sel); sel = null; puestas++;
          if (puestas === p.cartas.length) { cortar(); encolar(p.fin, null, true); completar(); }
        } else {
          bip(false); evaluar(reg, i, false);
          var s = sel; s.classList.add('sacude'); setTimeout(function () { s.classList.remove('sacude'); }, 450);
          s.classList.remove('sel'); sel = null;
          if (p.pista && AU.imp === 0) { cortar(); encolar(p.pista); }
        }
      };
      $('#cats').appendChild(d);
    });
    mezclar(p.cartas.map(function (x, i) { return i; })).forEach(function (i) {
      var b = document.createElement('button'); b.className = 'carta'; b.textContent = p.cartas[i].txt; b.dataset.i = i;
      b.onclick = function () {
        if (scr.bloq) return;
        tocar(p.cartas[i].audio);
        if (sel) sel.classList.remove('sel');
        sel = b; b.classList.add('sel');
      };
      $('#cartas').appendChild(b);
    });
    instruir([p.instr]);
    scr.repetir = function () { instruir([p.instr]); };
  };

  /* ---------- DURACIÓN (tabla) ---------- */
  R.duracion = function (p) {
    var filas = p.filas.map(function (f, i) {
      return '<tr id="df' + i + '"><td>' + esc(f.act) + '</td><td>' + hora12(f.ini[0], f.ini[1]) + '</td><td>' + hora12(f.fin[0], f.fin[1]) + '</td><td class="dcel"></td></tr>';
    }).join('');
    main.innerHTML = '<div class="dur"><table class="tdur"><thead><tr><th>Actividad</th><th>Comienza</th><th>Termina</th><th>Duración</th></tr></thead><tbody>' + filas + '</tbody></table>' +
      '<div class="drel"><div>Comienza' + svgReloj({ id: 'da' }) + '</div><div>Termina' + svgReloj({ id: 'db' }) + '</div></div>' +
      '<div class="tpreg" id="dq"></div><div class="topc dos" id="dop"></div></div>';
    var tok = scr.tok, k = 0, reg = {}, resuelto = false;
    function fila(primero) {
      var f = p.filas[k]; resuelto = false;
      $$('.tdur tr').forEach(function (tr) { tr.classList.remove('actual', 'titila'); });
      $('#df' + k).classList.add('actual', 'titila');
      ponerAgujas('da', f.ini[0], f.ini[1]); ponerAgujas('db', f.fin[0], f.fin[1]);
      $('#dq').textContent = f.audio.tx;
      var cont = $('#dop'); cont.innerHTML = '';
      mezclar(p.opc).forEach(function (o) {
        var b = document.createElement('button'); b.className = 'opc'; b.textContent = o;
        b.onclick = function () {
          if (scr.bloq || resuelto) return;
          if (o === f.ok) {
            resuelto = true; b.classList.add('ok');
            $$('.opc', cont).forEach(function (x) { if (x !== b) x.classList.add('atenuada'); });
            var cel = $('#df' + k + ' .dcel'); cel.textContent = f.ok; cel.classList.add('escrito');
            bip(true); evaluar(reg, k, true); cortar();
            encolar(f.conf, function () { setTimeout(siguiente, 600); }, true);
          } else {
            b.classList.add('mal', 'sacude'); bip(false); evaluar(reg, k, false);
            if (p.pista && AU.imp === 0) { cortar(); encolar(p.pista); }
          }
        };
        cont.appendChild(b);
      });
      instruir([primero ? p.instr : null, f.audio]);
    }
    function siguiente() {
      if (!vigente(tok)) return;
      k++;
      if (k < p.filas.length) fila(false);
      else { $$('.tdur tr').forEach(function (tr) { tr.classList.remove('actual', 'titila'); }); completar(); }
    }
    fila(true);
    scr.repetir = function () { if (!resuelto) instruir([p.filas[k].audio]); };
  };

  /* ---------- SOPA DE LETRAS (siempre de izquierda a derecha) ---------- */
  function generarSopa(palabras, N) {
    var DIRS = [[0, 1], [1, 0], [1, 1]];
    for (var intento = 0; intento < 400; intento++) {
      var g = [], ok = true, ubic = {};
      for (var r = 0; r < N; r++) { g.push([]); for (var c = 0; c < N; c++) g[r].push(''); }
      var orden = palabras.slice().sort(function (a, b) { return b.length - a.length; });
      var dirsBase = mezclar(DIRS);
      for (var w = 0; w < orden.length && ok; w++) {
        var pal = orden[w], prefer = dirsBase[w % 3], dirs = [prefer].concat(mezclar(DIRS.filter(function (d) { return d !== prefer; })));
        var puesto = false;
        for (var di = 0; di < dirs.length && !puesto; di++) {
          var d = dirs[di], cands = [];
          for (var r2 = 0; r2 < N; r2++) for (var c2 = 0; c2 < N; c2++) {
            var er = r2 + d[0] * (pal.length - 1), ec = c2 + d[1] * (pal.length - 1);
            if (er >= N || ec >= N) continue;
            var cabe = true;
            for (var x = 0; x < pal.length; x++) { var l = g[r2 + d[0] * x][c2 + d[1] * x]; if (l && l !== pal[x]) { cabe = false; break; } }
            if (cabe) cands.push([r2, c2]);
          }
          if (cands.length) {
            var cc = cands[Math.floor(Math.random() * cands.length)];
            for (var y = 0; y < pal.length; y++) g[cc[0] + d[0] * y][cc[1] + d[1] * y] = pal[y];
            ubic[pal] = { r: cc[0], c: cc[1], d: d }; puesto = true;
          }
        }
        if (!puesto) ok = false;
      }
      if (!ok) continue;
      var usadas = {}; for (var u in ubic) usadas[ubic[u].d.join()] = 1;
      if (Object.keys(usadas).length < 3) continue; /* variedad forzada de direcciones */
      var ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var r3 = 0; r3 < N; r3++) for (var c3 = 0; c3 < N; c3++) if (!g[r3][c3]) g[r3][c3] = ABC[Math.floor(Math.random() * ABC.length)];
      return { g: g, ubic: ubic };
    }
    return null;
  }
  R.sopa = function (p) {
    var N = p.n, words = p.palabras.map(function (x) { return x.w; }), S = generarSopa(words, N);
    var pal = ['#f59e0b', '#8b5cf6', '#0891b2', '#db2777', '#65a30d', '#ea580c', '#2563eb'];
    var html = '<div class="sopa" id="sopa" style="grid-template-columns:repeat(' + N + ',1fr)">';
    for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) html += '<div class="cel" id="c' + r + '_' + c + '">' + S.g[r][c] + '</div>';
    html += '</div><div class="spal" id="spal">' + p.palabras.map(function (x, i) { return '<span id="sw' + i + '">' + x.w + '</span>'; }).join('') + '</div>';
    main.innerHTML = html;
    var reg = {}, ini = null, hall = 0;
    function celda(e) {
      var g = $('#sopa').getBoundingClientRect();
      var cx = e.clientX, cy = e.clientY;
      if (e.changedTouches && e.changedTouches.length) { cx = e.changedTouches[0].clientX; cy = e.changedTouches[0].clientY; }
      var c = Math.floor((cx - g.left) / (g.width / N)), r = Math.floor((cy - g.top) / (g.height / N));
      return [Math.max(0, Math.min(N - 1, r)), Math.max(0, Math.min(N - 1, c))];
    }
    $('#sopa').addEventListener('click', function (e) {
      if (scr.bloq) return;
      var rc = celda(e);
      if (!ini) { ini = rc; $('#c' + rc[0] + '_' + rc[1]).classList.add('ini'); return; }
      var a = ini, b = rc; $('#c' + a[0] + '_' + a[1]).classList.remove('ini'); ini = null;
      if (a[0] === b[0] && a[1] === b[1]) return;
      if (b[0] < a[0] || (b[0] === a[0] && b[1] < a[1])) { var t = a; a = b; b = t; }
      var dr = b[0] - a[0], dc = b[1] - a[1];
      var encontrada = -1;
      p.palabras.forEach(function (x, i) {
        var u = S.ubic[x.w]; if (reg[i] !== undefined) return;
        var fr = u.r + u.d[0] * (x.w.length - 1), fc = u.c + u.d[1] * (x.w.length - 1);
        if (u.r === a[0] && u.c === a[1] && fr === b[0] && fc === b[1]) encontrada = i;
      });
      if (encontrada < 0) { bip(false); return; }
      var x = p.palabras[encontrada], u = S.ubic[x.w], col = pal[encontrada % pal.length];
      for (var k = 0; k < x.w.length; k++) { var el = $('#c' + (u.r + u.d[0] * k) + '_' + (u.c + u.d[1] * k)); el.classList.add('hall'); el.style.background = col; }
      var sp = $('#sw' + encontrada); sp.classList.add('hall'); sp.style.background = col;
      bip(true); evaluar(reg, encontrada, true); hall++;
      cortar(); encolar(x.audio, null, true);
      if (hall === p.palabras.length) { encolar(p.fin, null, true); completar(); }
    });
    instruir([p.instr]);
    scr.repetir = function () { instruir([p.instr]); };
  };

  /* ---------- MI INVITACIÓN ---------- */
  R.invitacion = function (p) {
    main.innerHTML = '<div class="miinv"><img class="decor" src="' + RI + p.img + '" alt="">' +
      '<div class="tarjinv"><div class="invtit">🎈 ¡Estás invitado a mi cumpleaños! 🎈</div>' +
      '<label>📅 Día: <input id="iv1" maxlength="30"></label><label>⏰ Hora: <input id="iv2" maxlength="20" placeholder="ej.: 17:00"></label>' +
      '<label>📍 Lugar: <input id="iv3" maxlength="40"></label><label>🎁 No olvides: <input id="iv4" maxlength="40"></label>' +
      '<div style="text-align:center;font-weight:bold;color:#db2777">¡No faltes, te espero! 💗</div></div>' +
      '<button class="btn" id="bliv">🎉 ¡Lista!</button></div>';
    $('#bliv').onclick = function () {
      if (scr.bloq) return;
      bip(true); cortar(); encolar(p.lista, null, true);
      $$('.tarjinv input').forEach(function (i) { i.blur(); });
    };
    instruir([p.instr], completar);
    scr.repetir = function () { instruir([p.instr]); };
  };

  window.QST = { ir: ir, est: est, estado: function () { return scr; }, generarSopa: generarSopa };
  ir(0);
})();
