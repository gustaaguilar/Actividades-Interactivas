/* motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
   Mecánicas: portada, narracion (animada con puntero), trivia (opciones texto/figura, V/F,
   escribir en el visual), pesca (figuras geométricas), sopa, cierre (+ enviar resultados).
   Los visuales se dibujan por código con DIB(spec). */
(function () {
  'use strict';
  var D = window.DATOS, P = D.pantallas, M = D.meta;
  var RA = 'audio/', RI = 'img/', FALLBACK = 500;
  var est = { i: 0, aciertos: 0, errores: 0, puntos: 0, intento: 1 };
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
    /* Un solo reproductor para todo el paquete: Android (Samsung, WebView de apps) solo deja sonar sin tocar la pantalla a un reproductor que ya sonó una vez con un toque. */
    try { el = AU.p || (AU.p = new Audio()); el.src = RA + it.au + '.mp3'; } catch (e) { setTimeout(term, FALLBACK); return; }
    AU.el = el;
    el.onended = term;
    el.onerror = function () { setTimeout(term, FALLBACK); };
    try { var p = el.play(); if (p && p.catch) p.catch(function () { setTimeout(term, FALLBACK); }); }
    catch (e) { setTimeout(term, FALLBACK); }
  }
  /* Destraba el reproductor con el primer toque, por si el primer audio no sale de un toque. */
  var SILENCIO = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  function destrabar() {
    document.removeEventListener('pointerdown', destrabar, true);
    if (AU.sonando) return;
    try { AU.p = AU.p || new Audio(); AU.p.src = SILENCIO; var q = AU.p.play(); if (q && q.catch) q.catch(function () {}); } catch (e) {}
  }
  document.addEventListener('pointerdown', destrabar, true);
  function cortar() {
    AU.gen++; AU.cola = []; AU.imp = 0;
    if (AU.el) { try { AU.el.onended = null; AU.el.onerror = null; AU.el.pause(); } catch (e) {} }
    AU.el = null; AU.sonando = false;
  }
  function libre() { return !AU.sonando && !AU.cola.length; }
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
    '<header id="cab"><span class="ctit">🚀 ' + esc(M.corto || M.titulo) + '</span><span class="cpant" id="cpant"></span>' +
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
    $('#ind').textContent = conPie ? (n + ' / ' + (P.length - 2)) : '';
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
  /* Lupa: cualquier imagen con clase .zoom se amplía al tocarla */
  function activarZoom(raiz) {
    $$('img.zoom', raiz).forEach(function (im) {
      im.onclick = function () {
        if (scr.bloq) return;
        var ov = document.createElement('div'); ov.className = 'lb';
        ov.innerHTML = '<button class="lbx" aria-label="Cerrar">✕</button><div class="lbmarco"><img src="' + im.getAttribute('src') + '" alt="" style="max-height:80vh"></div>';
        $('.lbx', ov).onclick = function () { ov.parentNode.removeChild(ov); };
        document.body.appendChild(ov);
      };
    });
  }

  /* ================= Puntero animado ================= */
  function apuntar(el) {
    AP.el = el || null;
    var p = $('#ptr'); if (!p) return;
    if (!el) { p.style.display = 'none'; return; }
    var r = el.getBoundingClientRect(), mr = main.getBoundingClientRect();
    p.style.display = 'block';
    p.style.left = (r.left - mr.left + r.width / 2 - 14) + 'px';
    p.style.top = (r.top - mr.top + r.height / 2 - 4) + 'px';
  }

  /* ================= DIBUJOS (SVG/HTML por código) ================= */
  var FIG = {
    cuadrado: '<rect x="10" y="10" width="80" height="80"/>',
    rectangulo: '<rect x="4" y="25" width="132" height="60"/>',
    circulo: '<circle cx="50" cy="50" r="42"/>',
    triangulo: '<polygon points="50,8 92,90 8,90"/>',
    equilatero: '<polygon points="50,12 94,88 6,88"/>',
    trirect: '<polygon points="10,10 10,90 90,90"/>',
    trirectEsc: '<polygon points="8,20 8,82 132,82"/>',
    rombo: '<polygon points="70,8 132,50 70,92 8,50"/>',
    trapecio: '<polygon points="35,22 105,22 136,85 4,85"/>',
    obtuso: '<polygon points="4,85 136,85 112,35"/>',
    trirectGuarda: '<polygon points="90,10 90,90 10,90"/>'
  };
  var ANCHO = { rectangulo: 140, trirectEsc: 140, rombo: 140, trapecio: 140, obtuso: 140 };
  function svgFig(f, c, h, id, extra) {
    var w = ANCHO[f] || 100;
    return '<svg class="fig' + (extra ? ' ' + extra : '') + '"' + (id ? ' id="' + id + '"' : '') + ' viewBox="0 0 ' + w + ' 100" style="height:' + (h || 10) + 'vh" xmlns="http://www.w3.org/2000/svg">' +
      '<g fill="' + (c || '#f59e0b') + '" stroke="#1e2a5a" stroke-width="2.5" stroke-linejoin="round">' + FIG[f] + '</g></svg>';
  }
  function persona(tipo, color, mitad) {
    var cuerpo = tipo === 'm'
      ? '<circle cx="12" cy="6" r="5"/><polygon points="12,12 20,30 4,30"/><rect x="7" y="29" width="3.5" height="9" rx="1.5"/><rect x="13.5" y="29" width="3.5" height="9" rx="1.5"/><rect x="3" y="13" width="3" height="11" rx="1.5" transform="rotate(20 4 13)"/><rect x="18" y="13" width="3" height="11" rx="1.5" transform="rotate(-20 20 13)"/>'
      : '<circle cx="12" cy="6" r="5"/><rect x="6" y="12" width="12" height="15" rx="3"/><rect x="7" y="26" width="4" height="12" rx="1.8"/><rect x="13" y="26" width="4" height="12" rx="1.8"/><rect x="2.5" y="12.5" width="3.5" height="12" rx="1.7"/><rect x="18" y="12.5" width="3.5" height="12" rx="1.7"/>';
    var clip = mitad ? '<clipPath id="cm' + (++persona.n) + '"><rect x="0" y="0" width="12" height="40"/></clipPath>' : '';
    return '<svg class="pers" viewBox="0 0 24 40" xmlns="http://www.w3.org/2000/svg">' + clip +
      '<g fill="' + (color || '#1e4d8c') + '"' + (mitad ? ' clip-path="url(#cm' + persona.n + ')"' : '') + '>' + cuerpo + '</g></svg>';
  }
  persona.n = 0;

  function DIB(s) {
    if (!s) return '';
    if (typeof s === 'string') return s;
    if (Array.isArray(s)) return s.map(DIB).join('');
    var f = DIBS[s.t]; return f ? f(s) : '';
  }
  var DIBS = {
    /* Figuras musicales: s.items = [['negra','id', 'rótulo'], ...]; s.h alto en vh */
    notas: function (s) {
      function glifo(n) {
        var hueca = n === 'redonda' || n === 'blanca', cabeza = '<ellipse cx="15" cy="64" rx="10" ry="7" transform="rotate(-22 15 64)" fill="' + (hueca ? '#fff' : '#1d1b2f') + '" stroke="#1d1b2f" stroke-width="' + (hueca ? 4 : 2) + '"/>';
        if (n === 'redonda') return '<ellipse cx="20" cy="64" rx="13" ry="8.5" fill="#fff" stroke="#1d1b2f" stroke-width="5"/>';
        var o = cabeza + '<line x1="24" y1="61" x2="24" y2="10" stroke="#1d1b2f" stroke-width="3"/>';
        if (n === 'corchea' || n === 'semicorchea') o += '<path d="M24 10 Q26 22 37 28 Q41 32 38 42 Q37 32 24 26 Z" fill="#1d1b2f"/>';
        if (n === 'semicorchea') o += '<path d="M24 22 Q26 34 37 40 Q41 44 38 54 Q37 44 24 38 Z" fill="#1d1b2f"/>';
        return o;
      }
      return '<div class="notas"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + s.items.map(function (x) {
        return '<span class="nota"' + (x[1] ? ' id="' + x[1] + '"' : '') + '><svg viewBox="0 0 44 80" style="height:' + (s.h || 9) + 'vh">' + glifo(x[0]) + '</svg>' + (x[2] ? '<small>' + x[2] + '</small>' : '') + '</span>';
      }).join('<span class="nmas">' + (s.sep || '') + '</span>') + '</div>';
    },
    /* Cuerpo geométrico en perspectiva, con partes destacables: s.f = cubo | prisma | prisma_tri | piramide | piramide_tri */
    cuerpo: function (s) {
      var id = s.id || 'cp', st = 'stroke="#1e3a8a" stroke-width="2.5" stroke-linejoin="round"', o = '';
      function P(pts) { return pts.map(function (p) { return p.join(','); }).join(' '); }
      var V, caras, ocultas = [];
      if (s.f === 'cubo' || s.f === 'prisma') {
        var w = s.f === 'cubo' ? 60 : 90, h = 60, d = 26;
        var A = [10, 30 + d], B = [10 + w, 30 + d], C = [10 + w, 30 + d + h], Dd = [10, 30 + d + h], E = [10 + d, 30], F = [10 + w + d, 30], G = [10 + w + d, 30 + h];
        caras = [[A, B, C, Dd, '#7dd3fc'], [A, E, F, B, '#bae6fd'], [B, F, G, C, '#38bdf8']]; V = [A, B, C, Dd, E, F, G];
        ocultas = [[[10 + d, 30], [10 + d, 30 + h]], [[10 + d, 30 + h], [10, 30 + d + h]], [[10 + d, 30 + h], [10 + w + d, 30 + h]]];
      } else if (s.f === 'prisma_tri') {
        var A = [14, 110], B = [74, 110], C = [44, 60], D2 = [44 + 46, 98], E = [74 + 46, 72], F = [44 + 46 + 0, 34];
        A = [14, 112]; B = [64, 112]; C = [39, 70]; var A2 = [64, 86], B2 = [114, 86], C2 = [89, 44];
        caras = [[A, B, C, '#7dd3fc'], [B, B2, C2, C, '#38bdf8'], [C, C2, [89 - 50 + 0, 44], C, '#bae6fd']];
        caras = [[A, B, C, '#7dd3fc'], [B, B2, C2, C, '#38bdf8'], [A, C, C2, [39, 44], '#bae6fd']];
        caras = [[A, B, C, '#7dd3fc'], [B, B2, C2, C, '#38bdf8']]; V = [A, B, C, B2, C2]; ocultas = [[A, [39, 86]], [[39, 86], B2], [[39, 86], C2]];
      } else {
        var tri = s.f === 'piramide_tri';
        var A = [12, 108], B = [82, 108], C = [118, 88], D3 = [48, 88], T = [64, 14];
        if (tri) { caras = [[A, B, T, '#7dd3fc'], [B, C, T, '#38bdf8']]; V = [A, B, C, T]; ocultas = [[A, C]]; }
        else { caras = [[A, B, T, '#7dd3fc'], [B, C, T, '#38bdf8']]; V = [A, B, C, D3, T]; ocultas = [[A, D3], [D3, C], [D3, T]]; }
      }
      ocultas.forEach(function (l) { o += '<line x1="' + l[0][0] + '" y1="' + l[0][1] + '" x2="' + l[1][0] + '" y2="' + l[1][1] + '" stroke="#1e3a8a" stroke-width="1.6" stroke-dasharray="5 4"/>'; });
      caras.forEach(function (c, i) { var col = c.pop(); o += '<polygon id="' + id + '_c' + i + '" class="cara" points="' + P(c) + '" fill="' + col + '" fill-opacity=".85" ' + st + '/>'; });
      var a = caras[0]; o += '<line id="' + id + '_a" class="arista" x1="' + a[0][0] + '" y1="' + a[0][1] + '" x2="' + a[1][0] + '" y2="' + a[1][1] + '" stroke="#f59e0b" stroke-width="0" stroke-linecap="round"/>';
      o += '<circle id="' + id + '_v" class="vert" cx="' + V[V.length - 1][0] + '" cy="' + V[V.length - 1][1] + '" r="0" fill="#dc2626"/>';
      return '<svg class="cuerpo" viewBox="0 0 136 124" style="height:' + (s.h || 20) + 'vh"' + (s.id ? ' id="' + id + '"' : '') + '>' + o + '</svg>';
    },
    img: function (s) { return '<img class="vimg' + (s.zoom === false ? '' : ' zoom') + '"' + (s.id ? ' id="' + s.id + '"' : '') + ' src="' + RI + s.src + '" alt="" style="max-height:' + (s.h || 26) + 'vh">'; },
    fila: function (s) { return '<div class="vfila' + (s.cls ? ' ' + s.cls : '') + '"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + DIB(s.items) + '</div>'; },
    col: function (s) { return '<div class="vcol"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + DIB(s.items) + '</div>'; },
    caja: function (s) { return '<div class="vcaja ' + (s.cls || '') + '"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + (s.titulo ? '<div class="vcajatit">' + esc(s.titulo) + '</div>' : '') + DIB(s.items) + '</div>'; },
    txt: function (s) { return '<div class="vtxt ' + (s.cls || '') + '"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + s.h + '</div>'; },
    fig: function (s) {
      var lab = s.n !== undefined ? '<span class="fnum">' + s.n + '</span>' : '';
      return '<span class="figw' + (s.cls ? ' ' + s.cls : '') + '"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + svgFig(s.f, s.c, s.h, null) + lab + '</span>';
    },
    /* Pizarra de precios */
    precios: function (s) {
      return '<div class="pizarra"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + (s.titulo ? '<div class="pztit">' + esc(s.titulo) + '</div>' : '') +
        s.items.map(function (x, i) { return '<div class="pzfila" id="' + (s.id || 'pz') + '_' + i + '"><span>' + x[0] + '</span><b>' + esc(x[1]) + '</b></div>'; }).join('') + '</div>';
    },
    /* Globos del tiro al blanco */
    globos: function (s) {
      var G = [['rojo', '#dc2626', '1.000'], ['azul', '#1d4ed8', '100'], ['amarillo', '#eab308', '10'], ['verde', '#16a34a', '1']];
      return '<div class="globos">' + G.map(function (g) {
        return '<div class="globo" id="gl_' + g[0] + '"><svg viewBox="0 0 60 90" style="height:' + (s.h || 11) + 'vh"><ellipse cx="30" cy="32" rx="26" ry="30" fill="' + g[1] + '" stroke="#1e2a5a" stroke-width="2"/>' +
          '<ellipse cx="21" cy="21" rx="6" ry="9" fill="#fff" opacity=".45"/><polygon points="26,61 34,61 30,67" fill="' + g[1] + '"/><path d="M30 67 Q24 76 31 88" stroke="#64748b" fill="none" stroke-width="1.5"/></svg>' +
          '<b>' + g[2] + '</b></div>';
      }).join('') + '</div>';
    },
    premios: function () {
      var Pz = [['A', '300 a 1.000'], ['B', '1.001 a 1.500'], ['C', '1.501 a 3.000'], ['D', '3.001 a 5.000']];
      return '<div class="premios">' + Pz.map(function (x) { return '<div class="premio" id="pr_' + x[0] + '">🎁 <b>Premio ' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('') + '</div>';
    },
    /* Guarda / secuencia de figuras */
    guarda: function (s) {
      return '<div class="guarda"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + s.seq.map(function (f, i) {
        var hu = s.huecos && s.huecos.indexOf(i) >= 0;
        var cls = 'gfig' + (s.marcar && i >= s.marcar[0] && i <= s.marcar[1] ? ' gmarca' : '') + (s.malas && s.malas.indexOf(i) >= 0 ? ' gmal' : '');
        return '<span class="' + cls + '" id="' + (s.id || 'gu') + '_' + i + '">' + (hu ? '<span class="ghueco">?</span>' : svgFig(f, s.c || '#f59e0b', s.h || 8)) + '</span>';
      }).join('') + '</div>';
    },
    /* Gráfico de barras */
    barras: function (s) {
      var W = 300, H = 190, x0 = 34, y0 = 160, top = 22, n = s.datos.length, bw = (W - x0 - 10) / n;
      var sc = (y0 - top) / s.max, out = '<svg class="barras" viewBox="0 0 ' + W + ' ' + H + '" style="height:' + (s.h || 30) + 'vh"' + (s.id ? ' id="' + s.id + '"' : '') + '>';
      out += '<text x="' + (W / 2) + '" y="14" class="btit">' + esc(s.titulo || '') + '</text>';
      for (var v = 0; v <= s.max; v += s.paso) {
        var y = y0 - v * sc;
        out += '<line x1="' + x0 + '" x2="' + (W - 6) + '" y1="' + y + '" y2="' + y + '" class="bgrid"/><text x="' + (x0 - 4) + '" y="' + (y + 3.5) + '" class="beje">' + v + '</text>';
      }
      s.datos.forEach(function (d, i) {
        var h = d[1] * sc, x = x0 + i * bw + bw * 0.22, w = bw * 0.56;
        var hid = s.ocultas || d[3];
        out += '<rect class="barra' + (hid ? ' oc' : '') + '" id="' + (s.id || 'b') + '_' + i + '" x="' + x + '" y="' + (y0 - h) + '" width="' + w + '" height="' + h + '" fill="' + d[2] + '"/>';
        if (s.valores && d[1] > 0) out += '<text x="' + (x + w / 2) + '" y="' + (y0 - h - 3) + '" class="bval' + (hid ? ' oc' : '') + '" id="' + (s.id || 'b') + '_' + i + 'v">' + String(d[1]).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '</text>';
        var lab = String(d[0]).split('|');
        lab.forEach(function (l, k) { out += '<text x="' + (x + w / 2) + '" y="' + (y0 + 11 + k * 9) + '" class="blab">' + esc(l) + '</text>'; });
      });
      return out + '<line x1="' + x0 + '" x2="' + (W - 6) + '" y1="' + y0 + '" y2="' + y0 + '" class="bbase"/></svg>';
    },
    /* Tabla con celdas para completar: '?' = celda vacía con id */
    tabla: function (s) {
      var id = s.id || 'tb';
      function th(c, k) { return c === '?' ? '<th class="vac" id="' + id + '_h' + k + '">?</th>' : '<th>' + c + '</th>'; }
      function td(c, r, k) { return c === '?' ? '<td class="vac" id="' + id + '_' + r + '_' + k + '">?</td>' : '<td>' + c + '</td>'; }
      /* tablas de una sola fila con muchas columnas: en pantallas angostas se muestran en vertical (mismos ids) */
      var angosta = (main.clientWidth || window.innerWidth) < 600;
      if (angosta && s.filas.length === 1 && s.cab.length >= 5) {
        return '<table class="vtabla vert" id="' + id + '"><tbody>' + s.cab.map(function (c, k) {
          return '<tr' + (k === 0 ? ' id="' + id + '_f0"' : '') + '>' + th(c, k) + (k === 0 ? '<th>' + s.filas[0][0] + '</th>' : td(s.filas[0][k], 0, k)) + '</tr>';
        }).join('') + '</tbody></table>';
      }
      return '<table class="vtabla"' + ' id="' + id + '"><thead><tr>' + s.cab.map(th).join('') + '</tr></thead><tbody>' +
        s.filas.map(function (f, r) {
          return '<tr id="' + id + '_f' + r + '">' + f.map(function (c, k) { return td(c, r, k); }).join('') + '</tr>';
        }).join('') + '</tbody></table>';
    },
    /* Pictograma vertical (columnas) */
    picto: function (s) {
      var id = s.id || 'pc';
      return '<div class="picto"' + ' id="' + id + '"><div class="pclave">Clave: ' + persona() + ' = ' + esc(s.vale) + '</div><div class="pcols">' +
        s.cols.map(function (c, i) {
          var ic = ''; for (var k = 0; k < c[1]; k++) ic += persona();
          return '<div class="pcol"><div class="pstack" id="' + id + '_' + i + '">' + ic + '</div><div class="plab">' + esc(c[0]) + '</div></div>';
        }).join('') + '</div></div>';
    },
    /* Pictograma horizontal varones (v) / mujeres (m) */
    pictoH: function (s) {
      return '<div class="pictoH"><div class="pclave">' + persona('v', '#2b7bc0') + ' = 4 varones &nbsp; ' + persona('m', '#2b7bc0') + ' = 4 mujeres</div><table>' +
        s.filas.map(function (f, i) {
          return '<tr id="ph_' + i + '"><th>' + esc(f[0]) + '</th><td>' + f[1].split('').map(function (t) { return persona(t, '#2b7bc0'); }).join('') + '<span id="ph_' + i + '_x"></span></td></tr>';
        }).join('') + '</table></div>';
    },
    /* Cuenta vertical */
    cuenta: function (s) {
      var id = s.id || 'cu';
      return '<div class="cuenta' + (s.mal ? ' cmal' : '') + '" id="' + id + '"><div class="cfila"><span></span><span class="' + (s.a === '?' ? 'vac' : '') + '" id="' + id + '_a">' + esc(s.a) + '</span></div>' +
        '<div class="cfila clin"><span>' + s.op + '</span><span>' + esc(s.b) + '</span></div>' +
        '<div class="cfila"><span></span><span class="cres" id="' + id + '_r">' + esc(s.r) + '</span></div></div>';
    },
    calc: function (s) {
      return '<div class="calcu"><div class="cdisp"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + esc(s.disp) + '</div><div class="cteclas">' +
        '789÷456×123−0.=+'.split('').map(function (k) { return '<span>' + k + '</span>'; }).join('') + '</div></div>';
    },
    /* Vasos en bandejas de "por" */
    bandejas: function (s) {
      var id = s.id || 'bj', llenas = Math.floor(s.n / s.por), resto = s.n % s.por, out = '<div class="bandejas" id="' + id + '">';
      function vaso() { return '<span class="vaso">🥤</span>'; }
      for (var b = 0; b < llenas; b++) { var v = ''; for (var k = 0; k < s.por; k++) v += vaso(); out += '<div class="bandeja' + (s.ocultas ? ' oc' : '') + '" id="' + id + '_b' + b + '">' + v + '</div>'; }
      if (resto) { var r = ''; for (var q = 0; q < resto; q++) r += vaso(); out += '<div class="sueltos' + (s.ocultas ? ' oc' : '') + '" id="' + id + '_s">' + r + '</div>'; }
      return out + '</div>';
    },
    /* Distintivos con compás */
    distintivo: function (s) {
      var o = '<svg class="distin" viewBox="0 0 120 120" style="height:' + (s.h || 22) + 'vh"' + (s.id ? ' id="' + s.id + '"' : '') + '>';
      if (s.m === 'pilar') o += '<circle id="ds_ext" cx="60" cy="60" r="55" fill="#1e2a5a"/><circle id="ds_int" cx="60" cy="60" r="38" fill="#f59e0b"/>';
      else if (s.m === 'guada') o += '<circle cx="60" cy="60" r="55" fill="#e5c58a" stroke="#c9a96b"/><circle cx="60" cy="60" r="36" fill="#93c5c9"/>' +
        '<polygon points="10,60 26,46 26,54 94,54 94,46 110,60 94,74 94,66 26,66 26,74" fill="#1e2a5a"/>';
      else if (s.m === 'paso') {
        var oc = function (v) { return v ? '' : ' class="oc"'; };
        o += '<circle id="dp_fill"' + oc(s.pintado) + ' cx="60" cy="60" r="38" fill="#f59e0b"/>' +
          '<path id="dp_anillo"' + oc(s.anillo) + ' fill-rule="evenodd" fill="#1e2a5a" d="M60 5a55 55 0 1 0 0.01 0zM60 22a38 38 0 1 0 0.01 0z"/>' +
          '<circle id="dp_int"' + oc(s.pintado) + ' cx="60" cy="60" r="38" fill="none" stroke="#1e2a5a" stroke-width="1.5"/>' +
          '<circle id="dp_ext"' + oc(s.anillo) + ' cx="60" cy="60" r="55" fill="none" stroke="#1e2a5a" stroke-width="1.5"/>' +
          '<circle id="dp_centro" cx="60" cy="60" r="2.8" fill="#dc2626"/>';
      }
      return o + '</svg>';
    },
    /* Tarjeta de la pesca */
    tarjeta: function (s) { return '<div class="tarjeta"' + (s.id ? ' id="' + s.id + '"' : '') + '>🎣 ' + esc(s.txt) + '</div>'; },
    /* Mini-tarjetas de cálculo (para opciones) */
    pasos: function (s) { return '<div class="mpasos">' + s.l.map(function (x) { return '<div>' + esc(x) + '</div>'; }).join('') + '</div>'; },
    /* Muñequitos sueltos (para escribir en pictogramas) */
    pers: function (s) { var o = ''; for (var k = 0; k < (s.n || 1); k++) o += persona(s.tipo, s.tipo ? '#2b7bc0' : null, s.mitad); return o; },
    /* Triángulos numerados (pág. 42) */
    tris: function () {
      var T = [
        ['10,10 10,90 90,90', '10,80 20,80 20,90', 30, 70],
        ['6,30 136,72 44,90', null, 60, 70],
        ['8,12 132,12 8,88', '8,12 18,12 18,22', 40, 40],
        ['50,10 94,86 6,86', null, 50, 68],
        ['4,50 136,12 120,90', null, 95, 55],
        ['10,12 136,80 34,90', null, 48, 66]];
      return '<div class="tris">' + T.map(function (t, i) {
        var w = i === 0 || i === 3 ? 100 : 140;
        return '<svg viewBox="0 0 ' + w + ' 100" style="height:11vh"><polygon points="' + t[0] + '" fill="#3b6fb6" stroke="#1e2a5a" stroke-width="2"/>' +
          (t[1] ? '<polygon points="' + t[1] + '" fill="#f59e0b"/>' : '') +
          '<text x="' + t[2] + '" y="' + t[3] + '" class="trinum">' + (i + 1) + '</text></svg>';
      }).join('') + '</div>';
    },
    /* Figuras formadas por dos piezas */
    union: function (s) {
      var o = '<svg viewBox="0 0 220 110" style="height:16vh" class="union">', st = ' stroke="#1e2a5a" stroke-width="2.5" stroke-linejoin="round"';
      if (s.m === 'cuadrado') o += '<polygon points="60,10 60,100 150,100"' + st + ' fill="#c8a26b"/><polygon points="60,10 150,10 150,100"' + st + ' fill="#b48a52"/>';
      else if (s.m === 'rect') o += '<polygon points="20,15 20,95 200,95"' + st + ' fill="#3b82f6"/><polygon points="20,15 200,15 200,95"' + st + ' fill="#2563eb"/>';
      else if (s.m === 'doscuad') o += '<rect x="20" y="15" width="90" height="85"' + st + ' fill="#c8a26b"/><rect x="110" y="15" width="90" height="85"' + st + ' fill="#b48a52"/>';
      return o + '</svg><div class="vtxt">¡Así quedan juntas!</div>';
    },
    /* Filas de sillas: "extra" filas ocultas que aparecen después */
    sillas: function (s) {
      var id = s.id || 'si', o = '<div class="sillas" id="' + id + '">', tot = s.filas + (s.extra || 0);
      for (var f = 0; f < tot; f++) {
        o += '<div class="sfila' + (f >= s.filas ? ' oc nueva' : '') + '" id="' + id + '_' + f + '"><span class="sic">🪑🪑🪑🪑🪑🪑🪑🪑 …</span><b>' + s.por + '</b></div>';
      }
      return o + '</div>';
    },
    /* Dos circunferencias iguales que se tocan (pág. 53) */
    circs: function () {
      return '<svg viewBox="0 0 220 110" style="height:18vh" class="circs"><defs><pattern id="cuad" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#cbd5e1" stroke-width=".6"/></pattern></defs>' +
        '<rect width="220" height="110" fill="url(#cuad)"/><circle cx="60" cy="55" r="45" fill="none" stroke="#1e2a5a" stroke-width="2"/><circle cx="150" cy="55" r="45" fill="none" stroke="#1e2a5a" stroke-width="2"/>' +
        '<circle cx="60" cy="55" r="2.5"/><circle cx="150" cy="55" r="2.5"/></svg>';
    },
    botellas: function (s) {
      var o = '<div class="botellas">';
      s.b.forEach(function (g) {
        for (var k = 0; k < g[2]; k++) {
          var hh = 40 + 60 * g[1];
          o += '<svg class="botella" viewBox="0 0 40 110" style="height:' + (s.h || 12) * (0.45 + 0.55 * g[1]) + 'vh"><rect x="15" y="' + (108 - hh - 10) + '" width="10" height="10" rx="2" fill="#1d4ed8"/>' +
            '<rect x="5" y="' + (108 - hh) + '" width="30" height="' + hh + '" rx="7" fill="#bfdbfe" stroke="#1e3a8a" stroke-width="2"/>' +
            '<rect x="5" y="' + (108 - hh * 0.62) + '" width="30" height="' + (hh * 0.3) + '" fill="#fff" stroke="#1e3a8a" stroke-width="1"/>' +
            '<text x="20" y="' + (108 - hh * 0.62 + hh * 0.2) + '" class="botlab">' + g[0] + '</text></svg>';
        }
      });
      return o + '</div>';
    },
    /* Desarrollos planos (redes) dibujados en cuadrícula */
    red: function (s) {
      var u = 22, st = ' fill="#93c5fd" stroke="#1e3a8a" stroke-width="2" stroke-linejoin="round"', o = '', W = 0, H = 0;
      function q(x, y, w, h) { o += '<rect x="' + x * u + '" y="' + y * u + '" width="' + (w || 1) * u + '" height="' + (h || 1) * u + '"' + st + '/>'; W = Math.max(W, (x + (w || 1)) * u); H = Math.max(H, (y + (h || 1)) * u); }
      function t(pts) { o += '<polygon points="' + pts.map(function (p) { return p[0] * u + ',' + p[1] * u; }).join(' ') + '"' + st + '/>'; pts.forEach(function (p) { W = Math.max(W, p[0] * u); H = Math.max(H, p[1] * u); }); }
      var f = s.f;
      if (f === 'cubo') { q(1, 0); q(0, 1); q(1, 1); q(2, 1); q(3, 1); q(1, 2); }
      else if (f === 'fila6') { for (var i = 0; i < 6; i++) q(i, 0); }
      else if (f === 'cubo_mal') { q(0, 0); q(1, 0); q(1, 1); q(2, 1); q(2, 2); q(3, 2); q(3, 3); }
      else if (f === 'piramide') { q(1, 1); t([[1, 1], [2, 1], [1.5, 0]]); t([[1, 2], [2, 2], [1.5, 3]]); t([[1, 1], [1, 2], [0, 1.5]]); t([[2, 1], [2, 2], [3, 1.5]]); }
      else if (f === 'prisma_tri') { q(0, 1, 1, 2); q(1, 1, 1, 2); q(2, 1, 1, 2); t([[1, 1], [2, 1], [1.5, 0.15]]); t([[1, 3], [2, 3], [1.5, 3.85]]); }
      else if (f === 'prisma_cuad') { q(0, 1, 1, 2); q(1, 1, 1, 2); q(2, 1, 1, 2); q(3, 1, 1, 2); q(1, 0); q(1, 3); }
      else if (f === 'prisma_cuad_mal') { q(0, 1, 1, 2); q(1, 1, 1, 2); q(2, 1, 1, 2); q(1, 0); q(1, 3); q(2, 3); }
      var pad = 4;
      return '<svg class="red" viewBox="' + (-pad) + ' ' + (-pad) + ' ' + (W + 2 * pad) + ' ' + (H + 2 * pad) + '" style="height:' + (s.h || 14) + 'vh"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + o + '</svg>';
    },
    /* Recta de probabilidad 0 a 1, con marcas cada 0,1 y puntos opcionales */
    recta: function (s) {
      var x0 = 30, x1 = 470, y = 55, o = '<svg class="recta" viewBox="0 0 500 100" style="height:' + (s.h || 14) + 'vh"' + (s.id ? ' id="' + s.id + '"' : '') + '>';
      o += '<text x="250" y="16" class="rtit">− PROBABLE +</text><line x1="' + x0 + '" x2="' + x1 + '" y1="' + y + '" y2="' + y + '" stroke="#1e2a5a" stroke-width="3"/>';
      for (var k = 0; k <= 10; k++) { var x = x0 + (x1 - x0) * k / 10; o += '<line x1="' + x + '" x2="' + x + '" y1="' + (y - 8) + '" y2="' + (y + 8) + '" stroke="#1e2a5a" stroke-width="2"/>'; }
      o += '<text x="' + x0 + '" y="' + (y + 30) + '" class="rlab">0</text><text x="' + x1 + '" y="' + (y + 30) + '" class="rlab">1</text>';
      o += '<text x="' + x0 + '" y="' + (y - 18) + '" class="rlab2">Imposible</text><text x="' + x1 + '" y="' + (y - 18) + '" class="rlab2">Seguro</text>';
      (s.puntos || []).forEach(function (p, i) {
        var x = x0 + (x1 - x0) * p[1];
        o += '<g id="' + (s.id || 'rp') + '_' + i + '"' + (p[3] ? ' class="oc"' : '') + '><circle cx="' + x + '" cy="' + y + '" r="8" fill="' + (p[2] || '#16a34a') + '" stroke="#fff" stroke-width="2"/>' +
          '<text x="' + x + '" y="' + (y + 30) + '" class="rpt" fill="' + (p[2] || '#16a34a') + '">' + p[0] + '</text></g>';
      });
      return o + '</svg>';
    },
    /* Tarjetas del sorteo: s.g = [[país, color, cantidad], ...] */
    tarjetas: function (s) {
      var o = '<div class="tarjetas"' + (s.id ? ' id="' + s.id + '"' : '') + '>';
      s.g.forEach(function (g, i) {
        o += '<div class="tgrupo" id="' + (s.id || 'tj') + '_' + i + '"><div class="tcartas">';
        for (var k = 0; k < g[2]; k++) o += '<span class="tcarta" style="background:' + g[1] + '"></span>';
        o += '</div><b>' + g[0] + ': ' + g[2] + '</b></div>';
      });
      return o + '</div>';
    },
    pre: function (s) { return '<pre class="vpre"' + (s.id ? ' id="' + s.id + '"' : '') + '>' + s.h + '</pre>'; }
  };


  /* ================= Encajar: achica imágenes solo si la pantalla no entra (sin scroll) ================= */
  var ENC = { t: null }, AP = { el: null };
  function encajar() {
    var els = $$('img.vimg, img.sdecor, img.pdecor, img.pimg, img.cimg, svg.barras, svg.botella, svg.red, svg.recta, svg.distin, svg.union, .tris svg, .picto .pers, .pictoH .pers, .estanque .pez svg', main);
    var txt = $$('.vpre, .cuenta, .vtabla, .pizarra, .premio, .cdisp, .cteclas span, .globo b, .picto .plab, .sfila, .tarjeta', main), txt2 = $$('.tpreg, .opc, .vtxt, .chip', main);
    els.forEach(function (e) {
      if (e.dataset.sb === undefined) { e.dataset.sb = e.getAttribute('style') || ''; }   /* estilo original del dibujo */
      if (!e.dataset.h0) {
        e.setAttribute('style', e.dataset.sb);
        var cs = getComputedStyle(e);
        var mh = parseFloat(cs.maxHeight) || parseFloat(cs.height) || e.getBoundingClientRect().height;
        if (mh) e.dataset.h0 = mh;
      }
    });
    txt.concat(txt2).forEach(function (e) { if (!e.dataset.f0) { e.style.fontSize = ''; e.dataset.f0 = parseFloat(getComputedStyle(e).fontSize); } });
    function aplicar(f) {
      els.forEach(function (e) {
        if (!e.dataset.h0) return;
        var ff = e.parentNode && e.parentNode.classList && e.parentNode.classList.contains('deco') ? Math.min(f, 1.1) * (f < 1 ? f * f : 1) : f; /* la decorativa se achica primero */ /* la imagen decorativa no le gana lugar al contenido */
        var v = Math.max(Math.min(40, e.dataset.h0), e.dataset.h0 * ff) + 'px';
        e.style.maxHeight = v;
        if (e.tagName.toLowerCase() === 'svg') {
          var vb = (e.getAttribute('viewBox') || '').split(/[ ,]+/), hh = parseFloat(v);
          if (vb.length === 4 && +vb[3]) {   /* ancho explícito, sin pasarse del ancho disponible */
            var caja = e.closest ? e.closest('.opc, .vcaja') : null, disp = caja ? caja.clientWidth - 14 : main.clientWidth * 0.94;
            if (disp && hh * vb[2] / vb[3] > disp) hh = disp * vb[3] / vb[2];
            e.style.width = (hh * vb[2] / vb[3]) + 'px';
          }
          e.style.height = hh + 'px'; e.style.maxHeight = hh + 'px'; e.style.maxWidth = '100%';
        }
      });
      txt.forEach(function (e) { e.style.fontSize = Math.max(10, e.dataset.f0 * Math.min(f, e.classList.contains('vpre') || e.classList.contains('vert') ? 1.7 : 1.35)) + 'px'; });
      /* textos de pregunta/opciones: solo se achican un poco cuando la imagen ya llegó al mínimo */
      txt2.forEach(function (e) { e.style.fontSize = (f < 0.45 ? e.dataset.f0 * Math.max(0.8, f / 0.45) : e.dataset.f0) + 'px'; });
    }
    function entra() { return main.scrollHeight <= main.clientHeight && main.scrollWidth <= main.clientWidth; }
    /* busca el tamaño más grande que entra en ESTA pantalla (celular, tablet, netbook o notebook) */
    var lo = 0.3, hi = 2.6;
    aplicar(hi);
    if (!entra()) {
      for (var k = 0; k < 9; k++) { var m = (lo + hi) / 2; aplicar(m); if (entra()) lo = m; else hi = m; }
      aplicar(lo);
    }
    if (AP.el && document.body.contains(AP.el)) apuntar(AP.el);
  }
  function pedirEncaje() { clearTimeout(ENC.t); ENC.t = setTimeout(encajar, 60); }
  if (window.MutationObserver) new MutationObserver(pedirEncaje).observe(main, { childList: true, subtree: true });
  main.addEventListener('load', pedirEncaje, true);
  window.addEventListener('resize', function () { $$('[data-h0]', main).forEach(function (e) { delete e.dataset.h0; if (e.dataset.sb !== undefined) e.setAttribute('style', e.dataset.sb); });
    $$('[data-f0]', main).forEach(function (e) { delete e.dataset.f0; e.style.fontSize = ''; }); pedirEncaje(); });

  var R = {};
  R.vacia = function () { main.innerHTML = '<p>Pantalla sin contenido</p>'; completar(); };

  /* ---------- PORTADA ---------- */
  R.portada = function () {
    main.innerHTML = '<div class="portada"><img class="pimg" src="' + RI + M.imgPortada + '" alt="">' +
      '<h1>' + esc(M.titulo) + '</h1>' + (M.parte ? '<div class="parte">' + esc(M.parte) + '</div>' : '') + '<span class="grado">' + esc(M.grado) + '</span>' +
      '<p class="sub">' + esc(M.subtitulo) + '</p>' +
      '<div class="pfila"><button class="btn" id="bcom">▶ Comenzar</button>' + firmaHTML() + '</div>' +
      '<p class="fuente">' + esc(M.fuente) + '<br>' + esc(M.licencia) + '</p></div>';
    activarFoto(main);
    $('#bcom').onclick = function () { bip(true); est.aciertos = est.errores = est.puntos = 0; $('#cpts').textContent = '⭐ 0'; ir(1); };
  };

  /* ---------- CIERRE ---------- */
  function porcentaje() { var t = est.aciertos + est.errores; return t ? Math.round(est.aciertos / t * 100) : 0; }
  R.cierre = function (p) {
    var pc = porcentaje();
    main.innerHTML = '<div class="cierre"><img class="cimg" src="' + RI + M.imgCierre + '" alt=""><h2>¡Terminaste! 🎉</h2>' +
      '<div class="stats"><div>✅<b>' + est.aciertos + '</b>Aciertos</div><div>❌<b>' + est.errores + '</b>Errores</div>' +
      '<div>📊<b>' + pc + '%</b>Total</div><div>⭐<b>' + est.puntos + '</b>Puntos</div></div>' +
      '<button class="btn benv" id="benv">📤 Enviar mi tarea a mi docente</button>' +
      '<div class="pfila"><button class="btn" id="bvol">🔄 Volver a jugar</button>' + firmaHTML() + '</div>' +
      '<p class="fuente cfuente">' + esc(M.fuente) + '</p></div>';
    activarFoto(main);
    $('#bvol').onclick = function () { est.aciertos = est.errores = est.puntos = 0; est.intento++; $('#cpts').textContent = '⭐ 0'; ir(0); };
    if (window.QSTEnvio) {   /* botón único del sitio (recursos/enviar-tarea.js): estudiante, curso y docente */
      var nb = QSTEnvio.boton({ titulo: M.titulo, parte: M.parte || '', grado: M.grado || '', aciertos: est.aciertos, errores: est.errores, puntos: est.puntos, intento: est.intento });
      var vb = $('#benv'); vb.parentNode.replaceChild(nb, vb);
    } else $('#benv').onclick = pedirDatos;
    encolar(p.audio);
  };

  /* ---------- ENVIAR RESULTADOS (siempre responde) ---------- */
  function pedirDatos() {
    var prev = {}; try { prev = JSON.parse(localStorage.getItem('qst_envio') || '{}'); } catch (e) {}
    var ov = document.createElement('div'); ov.className = 'lb envio';
    ov.innerHTML = '<button class="lbx" aria-label="Cerrar">✕</button><div class="envcaja"><h3>📤 Enviar mi tarea</h3>' +
      '<label>Nombre y apellido del estudiante: <input id="envEst" maxlength="50" autocomplete="off"></label>' +
      '<label>Curso: <input id="envCur" maxlength="25" autocomplete="off" placeholder="ej.: 3.° A"></label>' +
      '<label>Nombre y apellido del docente <small>(opcional)</small>: <input id="envDoc" maxlength="50" autocomplete="off"></label>' +
      '<button class="btn" id="envOk">Listo ✅</button><p class="envmsg" id="envMsg"></p></div>';
    document.body.appendChild(ov);
    $('#envEst').value = prev.est || ''; $('#envCur').value = prev.cur || ''; $('#envDoc').value = prev.doc || '';
    $('.lbx', ov).onclick = function () { ov.parentNode.removeChild(ov); };
    $('#envOk').onclick = function () {
      var d = { est: $('#envEst').value.trim(), cur: $('#envCur').value.trim(), doc: $('#envDoc').value.trim() };
      if (!d.est) { $('#envMsg').textContent = 'Escribí tu nombre y apellido 🙂'; $('#envEst').focus(); return; }
      if (!d.cur) { $('#envMsg').textContent = 'Escribí tu curso 🙂'; $('#envCur').focus(); return; }
      try { localStorage.setItem('qst_envio', JSON.stringify(d)); } catch (e) {}
      ov.parentNode.removeChild(ov);
      compartir(d);
    };
  }
  function ajustar(x, txt, max, px, negrita) {
    var t = String(txt), f = function (n) { x.font = (negrita ? 'bold ' : '') + n + 'px Trebuchet MS, sans-serif'; };
    f(px); while (px > 13 && x.measureText(t).width > max) { px--; f(px); }
    return t;
  }
  function tarjetaPNG(d) {
    var c = document.createElement('canvas'); c.width = 640; c.height = 500;
    var x = c.getContext('2d'); if (!x) return null;
    x.fillStyle = '#fffdf7'; x.fillRect(0, 0, 640, 500);
    x.fillStyle = '#1e2a5a'; x.fillRect(0, 0, 640, 70);
    x.fillStyle = '#fff'; x.fillText(ajustar(x, '🚀 ' + (M.corto || M.titulo), 600, 26, true), 20, 45);
    x.fillStyle = '#1e2a5a';
    x.fillText(ajustar(x, '👤 Estudiante: ' + d.est, 592, 23, true), 24, 110);
    x.fillText(ajustar(x, '🏫 Curso: ' + d.cur, 592, 21, false), 24, 142);
    if (d.doc) x.fillText(ajustar(x, '👩‍🏫 Docente: ' + d.doc, 592, 21, false), 24, 174);
    x.fillStyle = '#334155'; x.fillText(ajustar(x, M.grado + (M.parte ? ' · ' + M.parte : ''), 592, 18, false), 24, d.doc ? 206 : 174);
    var v = [['✅ Aciertos', est.aciertos], ['❌ Errores', est.errores], ['📊 Total', porcentaje() + '%'], ['⭐ Puntos', est.puntos]];
    v.forEach(function (q, i) {
      var bx = 24 + i * 152; x.fillStyle = '#fff'; x.strokeStyle = '#dbe7f7'; x.lineWidth = 3;
      x.fillRect(bx, 228, 140, 110); x.strokeRect(bx, 228, 140, 110);
      x.fillStyle = '#1e2a5a'; x.font = '18px Trebuchet MS, sans-serif'; x.fillText(q[0], bx + 10, 258);
      x.font = 'bold 40px Trebuchet MS, sans-serif'; x.fillText(String(q[1]), bx + 14, 313);
    });
    var f = new Date();
    x.font = '18px Trebuchet MS, sans-serif'; x.fillStyle = '#334155';
    x.fillText('Intento n.° ' + est.intento + '  ·  ' + f.toLocaleDateString('es-AR') + ' ' + f.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }), 24, 380);
    x.fillStyle = '#64748b'; x.font = '16px Trebuchet MS, sans-serif';
    x.fillText('QueSepanTodos.com · Profe Gustavo Aguilar', 24, 470);
    return c;
  }
  function textoRes(d) {
    return '🚀 ' + M.titulo + (M.parte ? ' — ' + M.parte : '') + ' (' + M.grado + ')\n👤 Estudiante: ' + d.est + '\n🏫 Curso: ' + d.cur + (d.doc ? '\n👩‍🏫 Docente: ' + d.doc : '') +
      '\n✅ Aciertos: ' + est.aciertos + '\n❌ Errores: ' + est.errores +
      '\n📊 Total: ' + porcentaje() + '%\n⭐ Puntos: ' + est.puntos + '\nIntento n.° ' + est.intento + ' · ' + new Date().toLocaleDateString('es-AR');
  }
  function compartir(d) {
    var nom = d.est;
    var c = null; try { c = tarjetaPNG(d); } catch (e) {}
    var txt = textoRes(d);
    function mostrar(url) {
      var ov = document.createElement('div'); ov.className = 'lb envio';
      ov.innerHTML = '<button class="lbx" aria-label="Cerrar">✕</button><div class="envcaja">' +
        (url ? '<img class="envimg" src="' + url + '" alt="Mis resultados">' : '<pre class="vpre">' + esc(txt) + '</pre>') +
        '<p class="envmsg">Mantené apretada la imagen para compartirla, o sacá una captura de pantalla 📸</p>' +
        '<div class="envbot"><a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(txt) + '">💬 WhatsApp</a>' +
        (url ? '<a class="btn" download="resultados_' + nom.replace(/[^\wáéíóúñÁÉÍÓÚÑ]+/g, '_') + '.png" href="' + url + '">⬇️ Guardar</a>' : '') + '</div></div>';
      document.body.appendChild(ov);
      $('.lbx', ov).onclick = function () { ov.parentNode.removeChild(ov); };
    }
    if (!c || !c.toBlob) { mostrar(null); return; }
    var url = c.toDataURL('image/png');
    c.toBlob(function (blob) {
      try {
        var file = new File([blob], 'mis_resultados.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
          navigator.share({ files: [file], text: txt, title: M.titulo }).catch(function () { mostrar(url); });
          return;
        }
      } catch (e) {}
      mostrar(url);
    }, 'image/png');
  }

  /* ---------- NARRACIÓN ANIMADA (puntero sincronizado con audio) ---------- */
  R.narracion = function (p) {
    main.innerHTML = '<div class="narr"><div class="nvis" id="nvis">' + DIB(p.vis) + '</div><div class="ncap" id="ncap"></div></div><div class="puntero" id="ptr">👆</div>';
    activarZoom(main);
    var tok = scr.tok, k = 0, prev = [];
    bloquear();
    function paso() {
      if (!vigente(tok)) return;
      prev.forEach(function (e) { e.classList.remove('titila', 'brilla'); }); prev = [];
      if (k >= p.pasos.length) { apuntar(null); desbloquear(); completar(); return; }
      var s = p.pasos[k];
      (s.mostrar || []).forEach(function (id) { var e = document.getElementById(id); if (e) e.classList.remove('oc'); });
      (s.destacar || []).forEach(function (id) {
        var e = document.getElementById(id); if (!e) return;
        e.classList.add(e instanceof SVGElement && e.tagName.toLowerCase() !== 'svg' ? 'brilla' : 'titila'); prev.push(e);
      });
      var cap = $('#ncap');
      if (!p.acumular) cap.innerHTML = '';
      $$('.chip', cap).forEach(function (c) { c.classList.remove('titila'); c.classList.add('prev'); });
      if (s.chip) { var ch = document.createElement('div'); ch.className = 'chip titila'; ch.innerHTML = s.chip; cap.appendChild(ch); }
      setTimeout(function () { if (vigente(tok)) apuntar(s.apuntar ? document.getElementById(s.apuntar) : null); }, 80);
      encolar(s.audio, function () { k++; paso(); }, true);
    }
    paso();
    scr.repetir = function () { cortar(); ir(est.i); };
  };

  /* ---------- TRIVIA (opciones de texto o figura · V/F · escribe en el visual) ----------
     Convención: la PRIMERA opción de it.opc es la correcta (se barajan al mostrar). */
  R.trivia = function (p) {
    main.innerHTML = '<div class="triv"><div class="tvis" id="tvis"></div><div class="tprog" id="tprog"></div>' +
      '<div class="tpreg" id="tpreg"></div><div class="topc" id="topc"></div></div><div class="puntero" id="ptr">👆</div>';
    var tok = scr.tok, k = 0, reg = {}, resuelto = false, visActual = null;
    function item(primero) {
      var it = p.items[k]; resuelto = false;
      /* el ítem sin visual propio conserva el visual vigente (con lo ya escrito) */
      var v = it.vis || (visActual !== null ? visActual : p.vis);
      if (v !== visActual || it.vis) {
        $('#tvis').innerHTML = p.deco ? DIB({ t: 'fila', cls: 'deco', items: [{ t: 'img', src: p.deco, h: 30, zoom: false }, v] }) : DIB(v);
        visActual = v; activarZoom($('#tvis'));
      }
      $$('#tvis .titila').forEach(function (e) { e.classList.remove('titila'); });
      (it.destacar || []).forEach(function (id) { var e = document.getElementById(id); if (e) e.classList.add('titila'); });
      setTimeout(function () { if (vigente(tok)) apuntar(it.apuntar ? document.getElementById(it.apuntar) : null); }, 80);
      $('#tprog').textContent = p.items.length > 1 ? (k + 1) + ' de ' + p.items.length : '';
      var pr = $('#tpreg'); pr.innerHTML = it.preg; pr.classList.add('titila');
      var ops;
      if (p.vf) ops = [{ t: '✅ Verdadero', ok: !!it.v }, { t: '❌ Falso', ok: !it.v }];
      else ops = mezclar(it.opc.map(function (o, i) { return { t: o, ok: i === 0 }; }));
      var figs = ops.some(function (o) { return typeof o.t !== 'string'; });
      var largo = figs ? 0 : Math.max.apply(null, ops.map(function (o) { return o.t.length; }));
      var cont = $('#topc');
      cont.className = 'topc ' + (figs ? (ops.length > 2 ? 'cuatro' : 'dos') : (largo <= 12 ? 'dos' : (largo <= 20 ? 'dos medio' : 'uno'))); cont.innerHTML = '';
      ops.forEach(function (o) {
        var b = document.createElement('button'); b.className = 'opc' + (figs ? ' fopc' : '');
        if (typeof o.t === 'string') b.textContent = o.t; else b.innerHTML = DIB(o.t);
        b._ok = o.ok;
        b.onclick = function () { elegir(b, o.ok, it); };
        cont.appendChild(b);
      });
      instruir([primero ? p.instr : null, it.audio]);
    }
    function elegir(b, esOk, it) {
      if (scr.bloq || resuelto) return;
      if (esOk) {
        resuelto = true; b.classList.add('ok');
        $$('.opc', $('#topc')).forEach(function (x) { if (x !== b) x.classList.add('atenuada'); });
        bip(true); evaluar(reg, k, true); cortar(); apuntar(null);
        $('#tpreg').classList.remove('titila');
        (it.escribir || []).forEach(function (w) {
          var e = document.getElementById(w.id); if (!e) return;
          e.innerHTML = DIB(w.h); e.classList.remove('vac', 'oc'); e.classList.add('escrito');
        });
        (it.mostrar || []).forEach(function (id) { var e = document.getElementById(id); if (e) e.classList.remove('oc'); });
        if (it.visOk) $('#tvis').innerHTML = DIB(it.visOk);
        encolar(it.conf, function () { setTimeout(siguiente, 700); }, true);
      } else {
        b.classList.add('mal', 'sacude'); bip(false); evaluar(reg, k, false);
        if ((it.pista || p.pista) && AU.imp === 0) { cortar(); encolar(it.pista || p.pista); }
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

  /* ---------- PESCA DE FIGURAS ---------- */
  R.pesca = function (p) {
    main.innerHTML = '<div class="pesca"><img class="pdecor" src="' + RI + p.img + '" alt=""><div class="tprog" id="tprog"></div>' +
      '<div id="ptarj"></div><div class="estanque" id="estanque"></div><div class="pescadas" id="pescadas"></div></div>';
    var tok = scr.tok, k = 0, reg = {}, resuelto = false;
    var est2 = $('#estanque');
    mezclar(p.figuras).forEach(function (f, i) {
      var d = document.createElement('button'); d.className = 'pez'; d.dataset.id = f.id;
      d.style.animationDelay = (i * 0.37 % 2) + 's';
      d.innerHTML = svgFig(f.f, f.c, 8.5);
      d.onclick = function () { pescar(d); };
      est2.appendChild(d);
    });
    function item(primero) {
      var it = p.items[k]; resuelto = false;
      $('#tprog').textContent = (k + 1) + ' de ' + p.items.length;
      $('#ptarj').innerHTML = DIB({ t: 'tarjeta', txt: it.txt });
      $('#ptarj .tarjeta').classList.add('titila');
      instruir([primero ? p.instr : null, it.audio]);
    }
    function pescar(d) {
      if (scr.bloq || resuelto) return;
      var it = p.items[k];
      if (d.dataset.id === it.ok) {
        resuelto = true; bip(true); evaluar(reg, k, true); cortar();
        d.classList.add('subiendo');
        $('#ptarj .tarjeta').classList.remove('titila');
        setTimeout(function () {
          if (!vigente(tok)) return;
          d.classList.remove('subiendo'); d.classList.add('pescado'); d.onclick = null;
          $('#pescadas').appendChild(d);
        }, 700);
        encolar(it.conf, function () { setTimeout(siguiente, 600); }, true);
      } else {
        bip(false); evaluar(reg, k, false);
        d.classList.add('sacude'); setTimeout(function () { d.classList.remove('sacude'); }, 450);
        if (it.pista && AU.imp === 0) { cortar(); encolar(it.pista); }
      }
    }
    function siguiente() {
      if (!vigente(tok)) return;
      k++;
      if (k < p.items.length) item(false); else { $('#ptarj').innerHTML = '<div class="tarjeta">🎉 ¡Pescaste todas las figuras!</div>'; completar(); }
    }
    item(true);
    scr.repetir = function () { if (!resuelto) instruir([p.items[k].audio]); };
  };

  /* ---------- SOPA DE LETRAS (siempre de izquierda a derecha) ---------- */
  function generarSopa(palabras, N) {
    var DIRS = [[0, 1], [1, 0], [1, 1]];
    for (var intento = 0; intento < 600; intento++) {
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
      if (Object.keys(usadas).length < 3) continue;
      var ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var r3 = 0; r3 < N; r3++) for (var c3 = 0; c3 < N; c3++) if (!g[r3][c3]) g[r3][c3] = ABC[Math.floor(Math.random() * ABC.length)];
      return { g: g, ubic: ubic };
    }
    return null;
  }
  R.sopa = function (p) {
    var N = p.n, words = p.palabras.map(function (x) { return x.w; }), S = generarSopa(words, N);
    var pal = ['#f59e0b', '#8b5cf6', '#0891b2', '#db2777', '#65a30d', '#ea580c', '#2563eb'];
    var html = (p.img ? '<img class="sdecor" src="' + RI + p.img + '" alt="">' : '') + '<div class="sopa" id="sopa" style="grid-template-columns:repeat(' + N + ',1fr)">';
    for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) html += '<div class="cel" id="c' + r + '_' + c + '">' + S.g[r][c] + '</div>';
    html += '</div><div class="spal" id="spal">' + p.palabras.map(function (x, i) { return '<span id="sw' + i + '">' + x.w + '</span>'; }).join('') + '</div>';
    main.innerHTML = html;
    var reg = {}, ini = null, hall = 0;
    function celda(e) {
      var g = $('#sopa').getBoundingClientRect();
      var cx = e.clientX, cy = e.clientY;
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

  window.QST = { ir: ir, est: est, estado: function () { return scr; }, generarSopa: generarSopa, DIB: DIB };
  ir(0);
})();
