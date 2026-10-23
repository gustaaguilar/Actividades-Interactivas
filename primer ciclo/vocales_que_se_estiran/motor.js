/* ============================================================
   Motor — Vocales que se estiran (1.er grado, conciencia fonológica)
   QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Mecánicas: portada, presentacion (sobres narrados con manito),
   sobres (guardar en el sobre de su vocal), rodear (tocar los que
   empiezan con la vocal), unir (parejas con línea), cierre.
   ============================================================ */
(function () {
  'use strict';
  var D = window.DATOS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var main, btnSig, mano, alRedimensionar = null;

  /* ---------------- estado ---------------- */
  var S = { i: 0, ac: 0, er: 0, pts: 0, evaluados: {}, listo: false, sonando: false };

  function evaluar(id, ok) {
    if (S.evaluados[id]) return false;          // solo cuenta el primer intento
    S.evaluados[id] = true;
    if (ok) { S.ac++; S.pts += D.meta.puntosPorAcierto || 10; } else { S.er++; }
    marcador();
    return true;
  }
  function marcador() {
    $('#mAc').textContent = '✅ ' + S.ac;
    $('#mEr').textContent = '❌ ' + S.er;
    $('#mPt').textContent = '⭐ ' + S.pts;
  }

  /* ---------------- utilidades ---------------- */
  function barajar(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function img(src, cls, alt) { var i = el('img', cls); i.src = src; i.alt = alt || ''; i.draggable = false; return i; }
  function foto(p) { return 'img/' + p + '.jpg'; }
  function vocal(p) { return p.charAt(0); }
  function V(v) { return D.vocales[v]; }
  // palabra escrita con la primera letra destacada en el color de su vocal
  function escrita(p) {
    var t = D.palabras[p], v = vocal(p);
    return '<b style="color:' + V(v).color + '">' + t.charAt(0) + '</b>' + t.slice(1);
  }
  function puntitos(n) {
    var c = el('div', 'puntitos');
    for (var k = 0; k < n; k++) c.appendChild(el('i'));
    c.marcar = function (actual) {
      var is = c.querySelectorAll('i');
      for (var k = 0; k < is.length; k++) is[k].className = k < actual ? 'hecho' : (k === actual ? 'on' : '');
    };
    return c;
  }
  function reanimar(e, cls) { e.classList.remove(cls); void e.offsetWidth; e.classList.add(cls); }

  /* ---------------- sonidos cortos (sin archivo) ---------------- */
  var ctx = null;
  function tono(f1, f2, dur, vol, tipo) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
      o.type = tipo || 'sine';
      o.frequency.setValueAtTime(f1, t);
      o.frequency.exponentialRampToValueAtTime(f2, t + dur);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur);
    } catch (e) {}
  }
  function bip() { tono(880, 1320, 0.15, 0.15, 'triangle'); }
  function chicharra() { tono(300, 140, 0.28, 0.18, 'sine'); }

  /* ---------------- cola de audio global ---------------- */
  var gen = 0, actual = null;
  function detener() {
    gen++;
    if (actual) { try { actual.pause(); } catch (e) {} actual = null; }
    S.sonando = false; actualizarSig();
    if (main) main.classList.remove('bloq');
  }
  // claves: archivos de audio/ (consignas gTTS o palabras de la docente). bloquear: true = bloquea la interacción
  function sonar(claves, fin, opts) {
    opts = opts || {};
    detener();
    var mi = ++gen, lista = (claves || []).filter(Boolean), k = 0;
    S.sonando = true; actualizarSig();
    if (opts.bloquear !== false) main.classList.add('bloq');
    function sig() {
      if (mi !== gen) return;
      if (k >= lista.length) {
        actual = null; S.sonando = false; main.classList.remove('bloq'); actualizarSig();
        if (opts.alTerminarPaso) opts.alTerminarPaso(null);
        if (fin) fin();
        return;
      }
      var clave = lista[k++];
      if (opts.alEmpezar) opts.alEmpezar(clave, k - 1);
      var a;
      try { a = new Audio('audio/' + clave + '.mp3'); } catch (e) { setTimeout(sig, 0); return; }
      actual = a;
      var listo = false, avanza = function () { if (listo) return; listo = true; setTimeout(sig, opts.pausa || 0); };
      a.onended = avanza; a.onerror = avanza;
      try { var pr = a.play(); if (pr && pr.catch) pr.catch(avanza); } catch (e) { avanza(); }
    }
    sig();
  }

  /* ---------------- manito que señala ---------------- */
  function senalar(elem) {
    if (!elem) { mano.classList.remove('ver'); return; }
    var r = elem.getBoundingClientRect();
    mano.style.left = (r.left + r.width * 0.55) + 'px';
    mano.style.top = (r.top + r.height * 0.55) + 'px';
    mano.classList.add('ver');
  }

  /* ---------------- botón Siguiente ---------------- */
  function actualizarSig() { if (btnSig) btnSig.disabled = !(S.listo && !S.sonando); }
  function habilitar() { S.listo = true; actualizarSig(); }

  /* ---------------- lightbox de la foto ---------------- */
  function firma(conCredito) {
    var f = el('div', 'profe');
    var i = img(D.meta.foto, '', 'Profe Gustavo Aguilar');
    i.onclick = function () {
      var lb = $('#lightbox'), li = $('#lbImg');
      li.src = D.meta.foto; li.style.transform = ''; li.dataset.z = '';
      $('#lbFrase').textContent = D.meta.frase;
      lb.classList.add('ver');
    };
    f.appendChild(i);
    f.appendChild(el('div', '', D.meta.autor + '<br><small>✉️ ' + D.meta.mail + '</small>' +
      (conCredito && D.meta.creditoAudios ? '<br><small class="credito">🎙️ ' + D.meta.creditoAudios + '</small>' : '')));
    return f;
  }
  function initLightbox() {
    var li = $('#lbImg');
    li.onclick = function (e) {
      if (li.dataset.z) { li.style.transform = ''; li.dataset.z = ''; return; }
      var r = li.getBoundingClientRect();
      li.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + '% ' + ((e.clientY - r.top) / r.height * 100) + '%';
      li.style.transform = 'scale(2.4)'; li.dataset.z = '1';
    };
    $('#lbCerrar').onclick = function () { $('#lightbox').classList.remove('ver'); li.style.transform = ''; li.dataset.z = ''; };
  }

  /* ---------------- sobre (componente) ---------------- */
  function crearSobre(v) {
    var s = el('button', 'sobre');
    s.dataset.v = v;
    s.style.setProperty('--c', V(v).color);
    s.style.setProperty('--co', V(v).oscuro);
    s.appendChild(el('div', 'fondo'));
    var ref = el('div', 'ref'); ref.appendChild(img(foto(V(v).ref), '', D.palabras[V(v).ref])); s.appendChild(ref);
    s.appendChild(el('div', 'bolsillo'));
    s.appendChild(el('span', 'letra', v));
    var n = el('span', 'cuenta'); n.hidden = true; s.appendChild(n); s.cuenta = n;
    return s;
  }
  function filaSobres() {
    var f = el('div', 'sobres'), m = {};
    ['a', 'e', 'i', 'o', 'u'].forEach(function (v) { var s = crearSobre(v); m[v] = s; f.appendChild(s); });
    f.mapa = m;
    return f;
  }

  /* ================= NAVEGACIÓN ================= */
  function ir(n) {
    if (n < 0 || n >= D.pantallas.length) return;
    detener();
    senalar(null);
    alRedimensionar = null;
    S.i = n; S.listo = false; actualizarSig();
    var p = D.pantallas[n];
    main.innerHTML = '';
    $('#titulo').textContent = p.titulo || D.meta.titulo;
    $('#pie').hidden = (p.tipo === 'portada' || p.tipo === 'cierre');
    $('#navPrev').disabled = n === 0;
    $('#navNext').disabled = n === D.pantallas.length - 1;
    (R[p.tipo] || function () { main.textContent = 'Pantalla sin motor: ' + p.tipo; habilitar(); })(p);
  }
  function siguiente() { ir(S.i + 1); }

  /* ================= RENDERERS ================= */
  var R = {};

  /* ---------- portada ---------- */
  R.portada = function (p) {
    var c = el('div', 'col portada entra');
    c.appendChild(el('div', 'chip', D.meta.area));
    c.appendChild(el('h1', '', 'Vocales <span>que se estiran</span>'));
    c.appendChild(el('div', 'sub', D.meta.subtitulo));
    c.appendChild(el('p', 'desc', D.meta.descripcion));
    c.appendChild(img(p.img, 'foto port-img', 'Abeja, elefante, iguana, oso y uva'));
    var info = el('button', 'btn-info', '📘 Para docentes y familias');
    info.onclick = function () { $('#modalCuerpo').innerHTML = D.meta.fundamentos; $('#modal').classList.add('ver'); $('#modal .hoja').scrollTop = 0; };
    c.appendChild(info);
    var f = el('div', 'fila');
    f.appendChild(firma(true));
    var b = el('button', 'btn grande', '▶️ Comenzar');
    b.disabled = true; b.onclick = siguiente;
    f.appendChild(b);
    c.appendChild(f);
    main.appendChild(c);
    sonar([p.audio], function () { b.disabled = false; b.classList.add('titila'); });
  };

  /* ---------- presentación de los sobres (manito + audio) ---------- */
  R.presentacion = function (p) {
    var c = el('div', 'col entra');
    var fs = filaSobres(); fs.classList.add('grandes');
    var cap = el('div', 'caption', '👀 Mirá y escuchá con atención.');
    c.appendChild(fs); c.appendChild(cap);
    main.appendChild(c);
    var vs = ['a', 'e', 'i', 'o', 'u'], claves = [p.intro];
    vs.forEach(function (v) { claves.push('pr_' + v, V(v).ref); });
    claves.push(p.fin);
    function apagar() { for (var v in fs.mapa) fs.mapa[v].classList.remove('titila', 'activo'); }
    sonar(claves, function () {
      apagar(); senalar(null); habilitar();
      cap.innerHTML = '👆 Tocá un sobre para escucharlo otra vez.';
      vs.forEach(function (v) {
        fs.mapa[v].onclick = function () {
          apagar(); fs.mapa[v].classList.add('activo');
          cap.innerHTML = '<span class="grande" style="color:' + V(v).color + '">' + v + '</span> &nbsp;' + escrita(V(v).ref);
          sonar([V(v).ref], function () { fs.mapa[v].classList.remove('activo'); }, { bloquear: false });
        };
      });
    }, {
      alEmpezar: function (cl) {
        var v = /^pr_([aeiou])$/.exec(cl);
        if (v) {
          v = v[1]; apagar();
          fs.mapa[v].classList.add('titila', 'activo');
          senalar(fs.mapa[v]);
          cap.innerHTML = '<span class="grande" style="color:' + V(v).color + '">' + v + '</span> &nbsp;' + escrita(V(v).ref);
          reanimar(cap, 'entra');
        } else if (cl === p.fin) {
          apagar(); senalar(null);
          cap.innerHTML = 'Cada palabra empieza con el sonido de su vocal.';
          reanimar(cap, 'entra');
        }
      }
    });
  };

  /* ---------- sobres atrapa palabras ---------- */
  R.sobres = function (p) {
    var lista = barajar(p.tarjetas), k = 0;
    var c = el('div', 'col entra');
    c.appendChild(el('div', 'enunciado', 'Guardá cada dibujo en el sobre que <b>empieza igual</b>.'));
    var zona = el('div', 'zona-tarjeta');
    var tarjeta = el('button', 'tarjeta-grande');
    var tImg = img('', '', '');
    var parlante = el('span', 'parlante', '🔊');
    var tTxt = el('div', 'escrita');
    tarjeta.appendChild(tImg); tarjeta.appendChild(parlante); tarjeta.appendChild(tTxt);
    zona.appendChild(tarjeta);
    var fs = filaSobres();
    var pt = puntitos(lista.length);
    c.appendChild(zona); c.appendChild(fs); c.appendChild(pt);
    main.appendChild(c);
    var bloqueo = false;

    function mostrar(primera) {
      var w = lista[k];
      tarjeta.style.visibility = 'visible';
      tImg.src = foto(w); tImg.alt = D.palabras[w];
      tTxt.innerHTML = ''; tTxt.classList.remove('ver');
      reanimar(tarjeta, 'entra');
      pt.marcar(k);
      bloqueo = false;
      sonar(primera ? [p.instr, w] : [w]);
    }
    tarjeta.onclick = function () { if (!bloqueo) sonar([lista[k]], null, { bloquear: false }); };

    ['a', 'e', 'i', 'o', 'u'].forEach(function (v) {
      var s = fs.mapa[v];
      s.onclick = function () {
        if (bloqueo || k >= lista.length) return;
        var w = lista[k], id = p.id + '_' + w;
        if (vocal(w) === v) {
          bloqueo = true;
          evaluar(id, true); bip();
          tTxt.innerHTML = escrita(w); tTxt.classList.add('ver');
          volarA(tarjeta, s, function () {
            var n = (+s.dataset.n || 0) + 1; s.dataset.n = n;
            s.cuenta.textContent = n; s.cuenta.hidden = false; reanimar(s, 'late');
          });
          sonar(['emp_' + v], function () {
            k++;
            if (k < lista.length) mostrar(false);
            else { pt.marcar(k); tarjeta.style.visibility = 'hidden'; sonar([p.fin], habilitar); }
          });
        } else {
          evaluar(id, false); chicharra();
          reanimar(s, 'sacude');
          sonar([p.no, w]);
        }
      };
    });
    mostrar(true);
  };

  // la tarjeta "vuela" hasta el sobre (copia fija animada)
  function volarA(origen, destino, fin) {
    try {
      var a = origen.getBoundingClientRect(), b = destino.getBoundingClientRect();
      var cl = origen.cloneNode(true);
      cl.className = 'tarjeta-grande volando';
      cl.style.left = a.left + 'px'; cl.style.top = a.top + 'px';
      cl.style.width = a.width + 'px'; cl.style.height = a.height + 'px';
      document.body.appendChild(cl);
      origen.style.visibility = 'hidden';
      var dx = (b.left + b.width / 2) - (a.left + a.width / 2), dy = (b.top + b.height * 0.6) - (a.top + a.height / 2);
      requestAnimationFrame(function () {
        cl.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(.18)';
        cl.style.opacity = '0.2';
      });
      setTimeout(function () { if (cl.parentNode) cl.parentNode.removeChild(cl); if (fin) fin(); }, 650);
    } catch (e) { if (fin) fin(); }
  }

  /* ---------- rodear los que empiezan con la vocal ---------- */
  R.rodear = function (p) {
    var k = 0;
    var pt = puntitos(p.filas.length);
    function mostrar() {
      main.innerHTML = '';
      senalar(null);
      var f = p.filas[k], v = f.v;
      var c = el('div', 'col entra');
      c.appendChild(el('div', 'enunciado', 'Tocá los dibujos que empiezan con <b style="color:' + V(v).color + '">' + v + '</b>.'));
      var fila = el('div', 'rodear');
      var tab = el('div', 'vocal-tab', v); tab.style.background = V(v).color;
      fila.appendChild(tab);
      var g = el('div', 'grid4');
      var items = barajar(f.ok.concat(f.otros)), botones = {}, faltan = f.ok.length;
      items.forEach(function (w) {
        var b = el('button', 'dibujo');
        b.appendChild(img(foto(w), '', D.palabras[w]));
        var circ = el('div', 'circulo'); circ.style.borderColor = V(v).color; b.appendChild(circ);
        var tx = el('div', 'escrita'); b.appendChild(tx);
        b.onclick = function () {
          if (b.classList.contains('hecho')) return;
          var id = p.id + '_' + v + '_' + w;
          if (f.ok.indexOf(w) >= 0) {
            evaluar(id, true); bip();
            b.classList.add('hecho');
            tx.innerHTML = escrita(w); tx.classList.add('ver');
            faltan--;
            if (faltan === 0) {
              for (var z in botones) if (!botones[z].classList.contains('hecho')) botones[z].classList.add('apagada');
              sonar([w, 'emp_' + v], function () {
                k++;
                if (k < p.filas.length) setTimeout(mostrar, 300);
                else { pt.marcar(k); sonar([p.fin], habilitar); }
              });
            } else sonar([w, 'emp_' + v], null, { bloquear: false });
          } else {
            evaluar(id, false); chicharra();
            b.classList.add('mal'); reanimar(b, 'sacude');
            sonar([w, p.no], function () { b.classList.remove('mal'); });
          }
        };
        botones[w] = b;
        g.appendChild(b);
      });
      fila.appendChild(g);
      c.appendChild(fila);
      pt.marcar(k);
      c.appendChild(pt);
      main.appendChild(c);
      // la docente nombra cada dibujo antes de empezar (la manito señala cada uno)
      var claves = (k === 0 ? [p.instr] : []).concat(['ro_' + v]).concat(items);
      sonar(claves, function () {
        senalar(null);
        for (var z in botones) botones[z].classList.remove('titila');
      }, {
        pausa: 250,
        alEmpezar: function (cl) {
          for (var z in botones) botones[z].classList.remove('titila');
          if (botones[cl]) { botones[cl].classList.add('titila'); senalar(botones[cl]); }
          else senalar(null);
        }
      });
    }
    mostrar();
  };

  /* ---------- unir los que empiezan igual ---------- */
  R.unir = function (p) {
    var c = el('div', 'col entra');
    c.appendChild(el('div', 'enunciado', 'Uní los dibujos que <b>empiezan igual</b>.'));
    var caja = el('div', 'unir');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'lineas');
    var gA = el('div', 'grupo'), gB = el('div', 'grupo');
    caja.appendChild(gA); caja.appendChild(gB); caja.appendChild(svg);
    c.appendChild(caja);
    var pt = puntitos(p.grupoA.length);
    c.appendChild(pt);
    main.appendChild(c);

    var sel = null, hechas = [], quedan = p.grupoA.length;
    function crear(w, lado, grupo) {
      var b = el('button', 'dibujo chico');
      b.appendChild(img(foto(w), '', D.palabras[w]));
      var tx = el('div', 'escrita'); b.appendChild(tx); b.tx = tx;
      b.w = w; b.lado = lado;
      b.onclick = function () { tocar(b); };
      grupo.appendChild(b);
      return b;
    }
    barajar(p.grupoA).forEach(function (w) { crear(w, 'A', gA); });
    barajar(p.grupoB).forEach(function (w) { crear(w, 'B', gB); });

    function punto(b, haciaOtro) {
      var r = b.getBoundingClientRect(), cr = caja.getBoundingClientRect();
      var horizontal = getComputedStyle(caja).flexDirection === 'row';
      if (horizontal) return { x: (haciaOtro === 'der' ? r.right : r.left) - cr.left, y: r.top + r.height / 2 - cr.top };
      return { x: r.left + r.width / 2 - cr.left, y: (haciaOtro === 'der' ? r.bottom : r.top) - cr.top };
    }
    function dibujar() {
      var cr = caja.getBoundingClientRect();
      svg.setAttribute('viewBox', '0 0 ' + cr.width + ' ' + cr.height);
      svg.innerHTML = '';
      hechas.forEach(function (h) {
        var a = punto(h.a, 'der'), b = punto(h.b, 'izq');
        var ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ln.setAttribute('x1', a.x); ln.setAttribute('y1', a.y); ln.setAttribute('x2', b.x); ln.setAttribute('y2', b.y);
        ln.setAttribute('stroke', h.color); ln.setAttribute('stroke-width', '7'); ln.setAttribute('stroke-linecap', 'round');
        svg.appendChild(ln);
        [a, b].forEach(function (q) {
          var ci = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          ci.setAttribute('cx', q.x); ci.setAttribute('cy', q.y); ci.setAttribute('r', '8'); ci.setAttribute('fill', h.color);
          svg.appendChild(ci);
        });
      });
    }
    alRedimensionar = dibujar;

    function tocar(b) {
      if (b.classList.contains('hecho')) return;
      if (!sel || sel.lado === b.lado) {
        if (sel) sel.classList.remove('sel');
        sel = b; b.classList.add('sel');
        sonar([b.w], null, { bloquear: false });
        return;
      }
      var a = sel; sel = null; a.classList.remove('sel');
      var A = a.lado === 'A' ? a : b, B = a.lado === 'A' ? b : a;
      var id = p.id + '_' + vocal(A.w);
      if (vocal(A.w) === vocal(B.w)) {
        evaluar(id, true); bip();
        var v = vocal(A.w), col = V(v).color;
        [A, B].forEach(function (x) { x.classList.add('hecho'); x.style.borderColor = col; x.tx.innerHTML = escrita(x.w); x.tx.classList.add('ver'); });
        hechas.push({ a: A, b: B, color: col });
        dibujar();
        quedan--; pt.marcar(p.grupoA.length - quedan);
        if (quedan === 0) sonar([b.w, 'par_' + v, p.fin], habilitar);
        else sonar([b.w, 'par_' + v], null, { bloquear: false });
      } else {
        evaluar(id, false); chicharra();
        [a, b].forEach(function (x) { x.classList.add('mal'); reanimar(x, 'sacude'); });
        sonar([b.w, p.no], function () { a.classList.remove('mal'); b.classList.remove('mal'); }, { bloquear: false });
      }
    }
    pt.marcar(0);
    sonar([p.instr]);
  };

  /* ---------- cierre ---------- */
  R.cierre = function (p) {
    var total = S.ac + S.er, pct = total ? Math.round(S.ac / total * 100) : 0;
    var c = el('div', 'col cierre entra');
    c.appendChild(el('h1', '', '¡Terminaste!'));
    c.appendChild(img(p.img, 'foto', 'Auto, estrella, isla, olla y urraca'));
    var st = el('div', 'stats');
    st.innerHTML = '<div>✅ Aciertos<b>' + S.ac + '</b></div><div>❌ Errores<b>' + S.er + '</b></div><div>📊 Total<b>' + pct + '%</b></div><div>⭐ Puntos<b>' + S.pts + '</b></div>';
    c.appendChild(st);
    var f = el('div', 'fila');
    var volver = el('button', 'btn', '🔄 Volver a jugar');
    volver.onclick = function () { S.ac = 0; S.er = 0; S.pts = 0; S.evaluados = {}; marcador(); ir(0); };
    f.appendChild(volver);
    try {
      if (window.QSTEnvio) f.appendChild(QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.area, aciertos: S.ac, errores: S.er, puntos: S.pts }));
    } catch (e) {}
    c.appendChild(f);
    var f2 = el('div', 'fila');
    f2.appendChild(firma());
    var yt = el('a', 'yt', '▶️ Suscribite al canal');
    yt.href = D.meta.canal; yt.target = '_blank'; yt.rel = 'noopener';
    f2.appendChild(yt);
    c.appendChild(f2);
    main.appendChild(c);
    sonar([p.audio], null, { bloquear: false });
  };

  /* ================= INICIO ================= */
  function iniciar() {
    main = $('#pantalla'); btnSig = $('#btnSig');
    mano = el('div', 'mano', '👆'); document.body.appendChild(mano);
    document.body.classList.toggle('revision', !!D.meta.revision);
    btnSig.onclick = siguiente;
    $('#navPrev').onclick = function () { ir(S.i - 1); };
    $('#navNext').onclick = function () { ir(S.i + 1); };
    initLightbox();
    $('#modalCerrar').onclick = function () { $('#modal').classList.remove('ver'); };
    $('#modal').onclick = function (e) { if (e.target === this) this.classList.remove('ver'); };
    window.addEventListener('resize', function () { senalar(null); if (alRedimensionar) alRedimensionar(); });
    marcador();
    ir(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  window.__QST = { S: S, ir: ir, R: R };
})();
