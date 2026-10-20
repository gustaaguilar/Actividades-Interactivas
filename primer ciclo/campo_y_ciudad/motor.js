/* ============================================================
   Motor — Campo y ciudad (2.º grado)
   QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Mecánicas: portada, lectura (narrada con resaltado), trivia,
   ordenarEscenas, opinion, armarOracion, dosOpciones, multi,
   narracion (puntero animado), clasificar, sopa, cierre.
   ============================================================ */
(function () {
  'use strict';
  var D = window.DATOS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var main, btnSig;

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
  function img(src, cls, alt) { var i = el('img', cls); i.src = src; i.alt = alt || ''; return i; }
  // imagen a un lado y actividad al otro en pantallas apaisadas (arriba/abajo en celulares)
  function dosCol(foto) {
    var c = el('div', 'col dosCol'), pan = el('div', 'panel');
    if (foto) c.appendChild(foto);
    c.appendChild(pan); c.panel = pan;
    return c;
  }
  function sinHtml(s) { return String(s).replace(/<[^>]+>/g, ''); }
  function puntitos(n) {
    var c = el('div', 'puntitos');
    for (var k = 0; k < n; k++) c.appendChild(el('i'));
    c.marcar = function (actual) {
      var is = c.querySelectorAll('i');
      for (var k = 0; k < is.length; k++) is[k].className = k < actual ? 'hecho' : (k === actual ? 'on' : '');
    };
    return c;
  }

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
  var gen = 0, actual = null, raf = 0;
  function detener() {
    gen++;
    if (actual) { try { actual.pause(); } catch (e) {} actual = null; }
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    S.sonando = false; actualizarSig();
    if (main) main.classList.remove('bloq');
  }
  // claves: array de claves de D.audios (o null). bloquear: true = bloquea interacción mientras suena.
  function sonar(claves, fin, opts) {
    opts = opts || {};
    detener();
    var mi = ++gen, lista = (claves || []).filter(Boolean), k = 0;
    S.sonando = true; actualizarSig();
    if (opts.bloquear !== false) main.classList.add('bloq');
    function sig() {
      if (mi !== gen) return;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      if (k >= lista.length) {
        actual = null; S.sonando = false; main.classList.remove('bloq'); actualizarSig();
        if (fin) fin();
        return;
      }
      var clave = lista[k++];
      if (opts.alEmpezar) opts.alEmpezar(clave);
      var a;
      try { a = new Audio('audio/' + clave + '.mp3'); } catch (e) { setTimeout(sig, 0); return; }
      actual = a;
      var listo = false, avanza = function () { if (listo) return; listo = true; sig(); };
      a.onended = avanza; a.onerror = avanza;
      if (opts.progreso) {
        var tick = function () { if (mi !== gen || actual !== a) return; opts.progreso(clave, a); raf = requestAnimationFrame(tick); };
        raf = requestAnimationFrame(tick);
      }
      try { var pr = a.play(); if (pr && pr.catch) pr.catch(avanza); } catch (e) { avanza(); }
    }
    sig();
  }

  /* ---------------- botón Siguiente ---------------- */
  function actualizarSig() { if (btnSig) btnSig.disabled = !(S.listo && !S.sonando); }
  function habilitar() { S.listo = true; actualizarSig(); }

  /* ---------------- botón 📖 del cuento ---------------- */
  function mostrarLibro(clave) {
    var b = $('#libro'), av = $('#libroAviso');
    if (!clave) { b.hidden = true; av.hidden = true; return; }
    b.hidden = false; b.dataset.cuento = clave;
    av.hidden = false;
    setTimeout(function () {
      var r = b.getBoundingClientRect();
      av.style.top = (r.bottom + 10) + 'px';
      av.style.right = Math.max(6, window.innerWidth - r.right - 8) + 'px';
    }, 30);
  }
  function abrirCuento(clave) {
    var c = D.cuentos[clave]; if (!c) return;
    var h = '<h2>' + c.titulo + '</h2>', ultima = '';
    c.parrafos.forEach(function (p) {
      if (p.img !== ultima) { h += '<img src="' + p.img + '" alt="">'; ultima = p.img; }
      h += '<p>' + p.texto + '</p>';
    });
    if (c.ensenanza) h += '<p class="ens">Enseñanza: ' + c.ensenanza + '</p>';
    $('#modalCuerpo').innerHTML = h;
    $('#modal').classList.add('ver');
    $('#libroAviso').hidden = true;
    $('#modal .hoja').scrollTop = 0;
  }

  /* ---------------- lightbox de la foto ---------------- */
  function firma() {
    var f = el('div', 'profe');
    var i = img(D.meta.foto, '', 'Profe Gustavo Aguilar');
    i.onclick = function () {
      var lb = $('#lightbox'), li = $('#lbImg');
      li.src = D.meta.foto; li.style.transform = ''; li.dataset.z = '';
      $('#lbFrase').textContent = D.meta.frase;
      lb.classList.add('ver');
    };
    f.appendChild(i);
    f.appendChild(el('div', '', D.meta.autor + '<br><small>✉️ ' + D.meta.mail + '</small>'));
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

  /* ================= NAVEGACIÓN ================= */
  function ir(n) {
    if (n < 0 || n >= D.pantallas.length) return;
    detener();
    S.i = n; S.listo = false; actualizarSig();
    var p = D.pantallas[n];
    main.innerHTML = '';
    $('#titulo').textContent = p.titulo || D.meta.titulo;
    $('#pie').hidden = (p.tipo === 'portada' || p.tipo === 'cierre');
    mostrarLibro(p.libro);
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
    c.appendChild(el('h1', '', 'Campo <span>y ciudad</span>'));
    c.appendChild(el('div', 'sub', D.meta.subtitulo));
    c.appendChild(img(p.img, 'foto port-img', 'Ratón de campo y ratón de ciudad'));
    var f = el('div', 'fila');
    f.appendChild(firma());
    var b = el('button', 'btn grande', '▶️ Comenzar');
    b.disabled = true; b.onclick = siguiente;
    f.appendChild(b);
    c.appendChild(f);
    main.appendChild(c);
    sonar([p.audio], function () { b.disabled = false; b.classList.add('titila'); });
  };

  /* ---------- lectura narrada con resaltado de palabras ---------- */
  R.lectura = function (p) {
    var cu = D.cuentos[p.cuento];
    var foto = img(cu.parrafos[0].img, 'foto lect-img', cu.titulo);
    var c = dosCol(foto);
    var caja = el('div', 'parrafo');
    var pts = puntitos(cu.parrafos.length);
    c.panel.appendChild(caja); c.panel.appendChild(pts);
    var repetir = el('button', 'btn sec', '🔁 Escuchar otra vez');
    repetir.hidden = true;
    c.panel.appendChild(repetir);
    main.appendChild(c);

    var palabras = [], cortes = [];
    function prepararParrafo(par) {
      caja.innerHTML = '';
      palabras = []; cortes = [];
      var trozos = par.texto.split(/(\s+)/), total = par.texto.replace(/\s+/g, '').length, acum = 0;
      trozos.forEach(function (t) {
        if (/^\s+$/.test(t)) { caja.appendChild(document.createTextNode(' ')); return; }
        if (!t) return;
        var s = el('span', 'w'); s.textContent = t; caja.appendChild(s);
        acum += t.length; palabras.push(s); cortes.push(acum / total);
      });
      caja.classList.add('leyendo');
      if (foto.getAttribute('src') !== par.img) foto.src = par.img;
    }
    function leer() {
      repetir.hidden = true;
      var claves = [p.instr].concat(cu.parrafos.map(function (x) { return x.audio; })).concat([p.fin]);
      sonar(claves, function () {
        caja.classList.remove('leyendo');
        palabras.forEach(function (w) { w.style.background = ''; });
        pts.marcar(cu.parrafos.length);
        repetir.hidden = false;
        habilitar();
      }, {
        alEmpezar: function (clave) {
          var idx = -1;
          cu.parrafos.forEach(function (x, k) { if (x.audio === clave) idx = k; });
          if (idx >= 0) { prepararParrafo(cu.parrafos[idx]); pts.marcar(idx); }
          else if (clave === p.instr) { caja.innerHTML = '<span>📖 ' + cu.titulo + '</span>'; }
        },
        progreso: function (clave, a) {
          if (!palabras.length || !a.duration || isNaN(a.duration)) return;
          var f = a.currentTime / a.duration;
          for (var k = 0; k < palabras.length; k++) {
            var ini = k === 0 ? 0 : cortes[k - 1];
            palabras[k].style.background = (f >= ini && f < cortes[k]) ? '#ffe27a' : (f >= cortes[k] ? '#fff2b8' : '');
          }
        }
      });
    }
    repetir.onclick = function () { S.listo = S.listo; leer(); };
    leer();
  };

  /* ---------- trivia (opción múltiple, una pregunta por vez) ---------- */
  R.trivia = function (p) {
    var k = 0, c;
    function mostrar() {
      main.innerHTML = '';
      var q = p.preguntas[k], id = p.id + '_' + q.id;
      var pt = puntitos(p.preguntas.length); pt.marcar(k);
      var cc = dosCol(img(q.img, 'foto trivia-img')); main.appendChild(cc); c = cc.panel;
      c.appendChild(el('div', 'enunciado entra', q.texto));
      var ops = barajar(q.opciones);
      var cortas = ops.every(function (o) { return sinHtml(o.t).length <= 12; });
      var box = el('div', 'ops' + (cortas ? ' g2' : ''));
      ops.forEach(function (o) {
        var b = el('button', 'op', o.t);
        b.onclick = function () {
          if (o.c) {
            evaluar(id, true);
            var todos = box.querySelectorAll('.op');
            for (var z = 0; z < todos.length; z++) { todos[z].disabled = true; if (todos[z] !== b) todos[z].classList.add('apagada'); }
            b.classList.add('bien');
            sonar([q.ok], function () {
              k++;
              if (k < p.preguntas.length) mostrar(); else { pt.marcar(k); habilitar(); }
            });
          } else {
            evaluar(id, false);
            b.classList.add('mal', 'sacude'); chicharra();
            sonar(['error'], function () { b.classList.remove('mal', 'sacude'); });
          }
        };
        box.appendChild(b);
      });
      c.appendChild(box);
      c.appendChild(pt);
      sonar(k === 0 ? [p.instr, q.audio] : [q.audio]);
    }
    mostrar();
  };

  /* ---------- ordenar escenas ---------- */
  R.ordenarEscenas = function (p) {
    var c = el('div', 'col');
    c.appendChild(el('div', 'enunciado', p.texto));
    var g = el('div', 'escenas');
    var esperado = 0;
    var orden = barajar(p.escenas.map(function (e, i) { return i; }));
    if (orden.join() === '0,1,2,3') orden = [2, 0, 3, 1];
    orden.forEach(function (idx) {
      var e = p.escenas[idx];
      var b = el('button', 'carta');
      b.appendChild(img(e.img, '', e.texto));
      b.appendChild(el('span', 'num', String(idx + 1)));
      b.appendChild(el('span', 'cap', e.texto));
      b.onclick = function () {
        if (b.classList.contains('bien')) return;
        var id = p.id + '_' + esperado;
        if (idx === esperado) {
          evaluar(id, true);
          b.classList.add('bien'); bip();
          esperado++;
          if (esperado === p.escenas.length) sonar([e.audio, p.fin], habilitar);
          else sonar([e.audio]);
        } else {
          evaluar(id, false);
          b.classList.add('mal', 'sacude'); chicharra();
          setTimeout(function () { b.classList.remove('mal', 'sacude'); }, 450);
        }
      };
      g.appendChild(b);
    });
    c.appendChild(g);
    main.appendChild(c);
    sonar([p.instr]);
  };

  /* ---------- opinión (no suma puntaje) ---------- */
  R.opinion = function (p) {
    var cc = dosCol(img(p.img, 'foto trivia-img')), c = cc.panel;
    c.appendChild(el('div', 'enunciado', p.texto));
    var box = el('div', 'ops g2');
    var ens = el('div', 'ens entra', '💡 <b>Enseñanza:</b> ' + p.ensenanza); ens.hidden = true;
    p.opciones.forEach(function (o) {
      var b = el('button', 'op', o.t);
      b.style.fontSize = 'clamp(20px,6vw,30px)';
      b.onclick = function () {
        var todos = box.querySelectorAll('.op');
        for (var z = 0; z < todos.length; z++) { todos[z].disabled = true; if (todos[z] !== b) todos[z].classList.add('apagada'); }
        b.classList.add('bien');
        sonar([o.audio, p.ensenanzaAudio], habilitar, { alEmpezar: function (cl) { if (cl === p.ensenanzaAudio) ens.hidden = false; } });
      };
      box.appendChild(b);
    });
    c.appendChild(box); c.appendChild(ens);
    main.appendChild(cc);
    sonar([p.instr]);
  };

  /* ---------- armar oración ---------- */
  R.armarOracion = function (p) {
    var k = 0, c;
    function mostrar() {
      main.innerHTML = '';
      var o = p.oraciones[k], id = p.id + '_' + k, palabras = o.texto.split(' '), pos = 0, fallo = false;
      var pt = puntitos(p.oraciones.length); pt.marcar(k);
      var cc = dosCol(img(o.img, 'foto trivia-img')); main.appendChild(cc); c = cc.panel;
      var arm = el('div', 'armado'); c.appendChild(arm);
      var banco = el('div', 'banco'); c.appendChild(banco);
      c.appendChild(pt);
      var mezcla = barajar(palabras.map(function (w, i) { return i; }));
      if (mezcla.join() === palabras.map(function (w, i) { return i; }).join()) mezcla.reverse();
      mezcla.forEach(function (i) {
        var b = el('button', 'palabra'); b.textContent = palabras[i];
        b.onclick = function () {
          if (b.textContent === palabras[pos]) {
            bip();
            b.classList.add('usada');
            arm.appendChild(el('span', 'ok-palabra entra', palabras[pos]));
            pos++;
            if (pos === palabras.length) {
              evaluar(id, !fallo);
              arm.classList.add('lista');
              sonar([o.audio], function () {
                k++;
                if (k < p.oraciones.length) setTimeout(mostrar, 300); else { pt.marcar(k); habilitar(); }
              });
            }
          } else {
            fallo = true;
            if (!S.evaluados[id]) { /* el error se registra al terminar la oración */ }
            b.classList.add('sacude'); chicharra();
            setTimeout(function () { b.classList.remove('sacude'); }, 420);
          }
        };
        banco.appendChild(b);
      });
      if (k === 0) sonar([p.instr]);
    }
    mostrar();
  };

  /* ---------- dos opciones (¿quién fue?, campo/ciudad, sí/no) ---------- */
  R.dosOpciones = function (p) {
    var k = 0, items = p.items, c;
    function mostrar() {
      main.innerHTML = '';
      var it = items[k], id = p.id + '_' + it.id;
      var pt = puntitos(items.length); pt.marcar(k);
      var foto = it.img ? img(it.img, 'foto item-img entra') : (p.img ? img(p.img, 'foto item-img') : null);
      var cc = foto ? dosCol(foto) : el('div', 'col'); main.appendChild(cc); c = foto ? cc.panel : cc;
      c.appendChild(el('div', 'item-frase entra', it.texto));
      var duo = el('div', 'duo');
      var conf = el('div', 'conf');
      p.opciones.forEach(function (o) {
        var b = el('button', 'opg ' + o.id);
        if (o.img) b.appendChild(img(o.img, '', o.t));
        b.appendChild(el('span', '', o.t));
        if (o.sub) b.appendChild(el('small', '', o.sub));
        b.onclick = function () {
          if (o.id === it.c) {
            evaluar(id, true);
            var todos = duo.querySelectorAll('.opg');
            for (var z = 0; z < todos.length; z++) { todos[z].disabled = true; if (todos[z] !== b) todos[z].classList.add('apagada'); }
            b.classList.add('bien');
            conf.textContent = sinHtml(D.audios[it.ok] || '');
            sonar([it.ok], function () {
              k++;
              if (k < items.length) setTimeout(mostrar, 250); else { pt.marcar(k); habilitar(); }
            });
          } else {
            evaluar(id, false);
            b.classList.add('mal', 'sacude'); chicharra();
            sonar(['error'], function () { b.classList.remove('mal', 'sacude'); });
          }
        };
        duo.appendChild(b);
      });
      c.appendChild(duo); c.appendChild(conf); c.appendChild(pt);
      sonar(k === 0 ? [p.instr, it.audio] : [it.audio]);
    }
    mostrar();
  };

  /* ---------- selección múltiple directa (sin Verificar) ---------- */
  R.multi = function (p) {
    var cc = dosCol(img(p.img, 'foto multi-img')), c = cc.panel;
    c.appendChild(el('div', 'enunciado', p.texto));
    var box = el('div', 'ops');
    var faltan = p.opciones.filter(function (o) { return o.c; }).length;
    barajar(p.opciones).forEach(function (o, n) {
      var b = el('button', 'op', o.t);
      b.style.textAlign = 'left';
      b.onclick = function () {
        b.disabled = true;
        var id = p.id + '_' + sinHtml(o.t);
        if (o.c) {
          evaluar(id, true); b.classList.add('bien'); bip();
          faltan--;
          if (faltan === 0) {
            var todos = box.querySelectorAll('.op');
            for (var z = 0; z < todos.length; z++) { todos[z].disabled = true; if (!todos[z].classList.contains('bien')) todos[z].classList.add('apagada'); }
            sonar([o.audio, p.fin], habilitar);
          } else sonar([o.audio]);
        } else {
          evaluar(id, false); b.classList.add('mal', 'sacude'); chicharra();
          sonar([p.err]);
        }
      };
      box.appendChild(b);
    });
    c.appendChild(box);
    main.appendChild(cc);
    sonar([p.instr]);
  };

  /* ---------- narración animada con puntero ---------- */
  R.narracion = function (p) {
    var c = el('div', 'col');
    var esc = el('div', 'escena');
    var fondo = img(p.img, '', p.titulo);
    var mano = el('div', 'mano', '👆');
    var etiq = el('div', 'etiq');
    esc.appendChild(fondo); esc.appendChild(etiq); esc.appendChild(mano);
    var cap = el('div', 'caption', '👀 Mirá y escuchá con atención.');
    c.appendChild(esc); c.appendChild(cap);
    var pt = puntitos(p.pasos.length); c.appendChild(pt);
    main.appendChild(c);
    var claves = [p.intro].concat(p.pasos.map(function (x) { return x.audio; })).concat([p.fin]);
    sonar(claves, function () { mano.classList.remove('ver'); etiq.classList.remove('ver'); pt.marcar(p.pasos.length); habilitar(); }, {
      alEmpezar: function (cl) {
        var idx = -1;
        p.pasos.forEach(function (x, k) { if (x.audio === cl) idx = k; });
        if (idx < 0) { if (cl === p.fin) { cap.innerHTML = sinHtml(D.audios[p.fin]); mano.classList.remove('ver'); etiq.classList.remove('ver'); } return; }
        var ps = p.pasos[idx];
        if (ps.img && fondo.getAttribute('src') !== ps.img) fondo.src = ps.img;
        mano.style.left = ps.x + '%'; mano.style.top = ps.y + '%'; mano.classList.add('ver');
        etiq.textContent = ps.etiqueta;
        etiq.style.left = Math.min(84, Math.max(16, ps.x)) + '%'; etiq.style.top = ps.y + '%'; etiq.classList.add('ver');
        cap.innerHTML = ps.texto; cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra');
        pt.marcar(idx);
      }
    });
  };

  /* ---------- clasificar (tocar tarjeta y luego categoría) ---------- */
  R.clasificar = function (p) {
    var c = el('div', 'col');
    c.appendChild(el('div', 'enunciado', p.texto));
    var cats = el('div', 'cats');
    var zonas = {};
    p.categorias.forEach(function (ct) {
      var z = el('button', 'cat ' + ct.id);
      if (ct.img) z.appendChild(img(ct.img, '', ct.t));
      z.appendChild(el('b', '', ct.t));
      var dentro = el('div', 'dentro'); z.appendChild(dentro);
      z.dentro = dentro; zonas[ct.id] = z;
      cats.appendChild(z);
    });
    var bandeja = el('div', 'bandeja');
    var sel = null, quedan = p.items.length;
    function marcarZonas(on) { for (var z in zonas) zonas[z].classList.toggle('lista-para', on); }
    barajar(p.items).forEach(function (it) {
      var t = el('button', 'tarjeta', '<span class="e">' + it.e + '</span>' + it.t);
      t.onclick = function () {
        if (t.classList.contains('bien') || t.classList.contains('mal')) return;
        var ts = bandeja.querySelectorAll('.tarjeta'); for (var z = 0; z < ts.length; z++) ts[z].classList.remove('sel');
        t.classList.add('sel'); sel = { it: it, t: t }; marcarZonas(true);
        sonar([it.audio], null, { bloquear: false });
      };
      bandeja.appendChild(t);
    });
    p.categorias.forEach(function (ct) {
      zonas[ct.id].onclick = function () {
        if (!sel) return;
        var it = sel.it, t = sel.t, ok = it.cat === ct.id;
        evaluar(p.id + '_' + it.id, ok);
        t.classList.remove('sel'); t.classList.add(ok ? 'bien' : 'mal');
        if (ok) bip(); else chicharra();
        zonas[it.cat].dentro.appendChild(t);   // siempre termina en su lugar correcto
        sel = null; marcarZonas(false); quedan--;
        sonar([it.ok], function () { if (quedan === 0) habilitar(); });
      };
    });
    c.appendChild(cats); c.appendChild(bandeja);
    main.appendChild(c);
    sonar([p.instr]);
  };

  /* ---------- sopa de letras (siempre de izquierda a derecha / hacia abajo) ---------- */
  R.sopa = function (p) {
    var n = p.tam || 9, grid = [], k, r, q;
    var DIRS = [[0, 1], [1, 0], [1, 1]];   // horizontal, vertical abajo, diagonal abajo-derecha
    var colores = ['#e5534b', '#2d8cf0', '#27ae60', '#f58b3a', '#8e44ad', '#16a085', '#c0392b', '#d35400'];
    var ubic = null;
    for (var intento = 0; intento < 200 && !ubic; intento++) {
      grid = []; for (r = 0; r < n; r++) { grid.push([]); for (q = 0; q < n; q++) grid[r].push(''); }
      ubic = [];
      var dirs = barajar([0, 1, 2]), palabras = barajar(p.palabras.slice()).sort(function (a, b) { return b.p.length - a.p.length; });
      for (k = 0; k < palabras.length && ubic; k++) {
        var w = palabras[k].p, d = DIRS[dirs[k % 3]], puesto = false;
        for (var t = 0; t < 150 && !puesto; t++) {
          var r0 = Math.floor(Math.random() * (n - d[0] * (w.length - 1)));
          var c0 = Math.floor(Math.random() * (n - d[1] * (w.length - 1)));
          var cabe = true;
          for (var m = 0; m < w.length; m++) { var g = grid[r0 + d[0] * m][c0 + d[1] * m]; if (g && g !== w[m]) { cabe = false; break; } }
          if (cabe) {
            for (m = 0; m < w.length; m++) grid[r0 + d[0] * m][c0 + d[1] * m] = w[m];
            ubic.push({ w: palabras[k], r: r0, c: c0, d: d });
            puesto = true;
          }
        }
        if (!puesto) ubic = null;
      }
    }
    var letras = 'abcdefghijlmnoprstuv';
    for (r = 0; r < n; r++) for (q = 0; q < n; q++) if (!grid[r][q]) grid[r][q] = letras[Math.floor(Math.random() * letras.length)];

    var c = el('div', 'col');
    var wrap = el('div', 'sopa-wrap');
    var gEl = el('div', 'grilla'); gEl.style.gridTemplateColumns = 'repeat(' + n + ',1fr)';
    var celdas = [];
    for (r = 0; r < n; r++) for (q = 0; q < n; q++) {
      var ce = el('div', 'celda'); ce.textContent = grid[r][q]; ce.dataset.r = r; ce.dataset.c = q;
      celdas.push(ce); gEl.appendChild(ce);
    }
    var lado = el('div', 'col'); lado.style.width = 'auto';
    lado.appendChild(img(p.img, 'sopa-mini'));
    var lista = el('div', 'lista-sopa');
    var marcas = {};
    p.palabras.forEach(function (w) { var s = el('span', '', w.p); marcas[w.p] = s; lista.appendChild(s); });
    lado.appendChild(lista);
    wrap.appendChild(gEl); wrap.appendChild(lado);
    c.appendChild(wrap);
    main.appendChild(c);

    var ini = null, halladas = 0;
    function celdaEn(x, y) {   // celda más cercana al punto tocado (tolerancia)
      var mejor = null, dm = 1e9;
      celdas.forEach(function (ce) {
        var b = ce.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2, dd = (cx - x) * (cx - x) + (cy - y) * (cy - y);
        if (dd < dm) { dm = dd; mejor = ce; }
      });
      return mejor;
    }
    gEl.addEventListener('click', function (e) {
      var ce = celdaEn(e.clientX, e.clientY); if (!ce) return;
      var rr = +ce.dataset.r, cc = +ce.dataset.c;
      if (!ini) { ini = { r: rr, c: cc, el: ce }; ce.classList.add('ini'); return; }
      ini.el.classList.remove('ini');
      var a = ini, b = { r: rr, c: cc }; ini = null;
      if (b.r < a.r || (b.r === a.r && b.c < a.c)) { var tmp = a; a = b; b = tmp; }   // acepta tocar al revés
      var hallada = null;
      ubic.forEach(function (u) {
        var L = u.w.p.length;
        if (!marcas[u.w.p].classList.contains('ok') && u.r === a.r && u.c === a.c && u.r + u.d[0] * (L - 1) === b.r && u.c + u.d[1] * (L - 1) === b.c) hallada = u;
      });
      if (!hallada) { if (!(a.r === b.r && a.c === b.c)) chicharra(); return; }
      var col = colores[halladas % colores.length];
      for (var m = 0; m < hallada.w.p.length; m++) {
        var x = celdas[(hallada.r + hallada.d[0] * m) * n + hallada.c + hallada.d[1] * m];
        x.classList.add('hall'); x.style.background = col;
      }
      marcas[hallada.w.p].classList.add('ok');
      evaluar(p.id + '_' + hallada.w.p, true); bip();
      halladas++;
      if (halladas === p.palabras.length) sonar([hallada.w.audio, p.fin], habilitar);
      else sonar([hallada.w.audio], null, { bloquear: false });
    });
    sonar([p.instr]);
  };

  /* ---------- cierre ---------- */
  R.cierre = function (p) {
    var total = S.ac + S.er, pct = total ? Math.round(S.ac / total * 100) : 0;
    var c = el('div', 'col cierre entra');
    c.appendChild(el('h1', '', '¡Terminaste!'));
    c.appendChild(img(p.img, 'foto', 'Ratones saludando'));
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
    document.body.classList.toggle('revision', !!D.meta.revision);
    btnSig.onclick = siguiente;
    $('#navPrev').onclick = function () { ir(S.i - 1); };
    $('#navNext').onclick = function () { ir(S.i + 1); };
    $('#libro').onclick = function () { abrirCuento(this.dataset.cuento); };
    $('#modalCerrar').onclick = function () { $('#modal').classList.remove('ver'); };
    $('#modal').onclick = function (e) { if (e.target === this) this.classList.remove('ver'); };
    initLightbox();
    window.addEventListener('resize', function () { var p = D.pantallas[S.i]; if (p && p.libro) mostrarLibro(p.libro); });
    marcador();
    ir(0);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  window.__QST = { S: S, ir: ir, R: R };
})();
