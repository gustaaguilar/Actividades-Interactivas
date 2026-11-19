// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: narracion, hotspot (img/svg), trivia (img/red svg, completar),
//  vf, video YT, asociar, clasificar (uno a uno), ordenar, sopa de letras, crucigrama.
//  Pantalla "Tocá para empezar", un solo reproductor de voz, botón 📖 para releer
//  el texto y envío de la tarea con ../../recursos/enviar-tarea.js
// ============================================================
(function () {
  'use strict';

  // ---------- Audios (función pura: la usa también el extractor) ----------
  // Correcciones de pronunciación para gTTS (el texto en pantalla no cambia)
  const ORD = { 1: 'primer', 2: 'segundo', 3: 'tercer', 4: 'cuarto', 5: 'quinto', 6: 'sexto', 7: 'séptimo' };
  function pron(t) {
    t = String(t).replace(/<[^>]+>/g, '').replace(/_{3,}/g, ', espacio en blanco, ');
    return t.replace(/\b([1-7])\s*[°º]\s*grado/g, (m, n) => ORD[n] + ' grado');
  }
  function audiosDePantalla(p) {
    const L = [];
    const add = (k, t) => { if (t) L.push({ id: p.id + '_' + k, t: pron(t) }); };
    add('inst', p.inst);
    switch (p.tipo) {
      case 'narracion': p.pasos.forEach((s, i) => add('p' + i, s.texto)); break;
      case 'hotspot': p.marcadores.forEach((m, i) => add('m' + i, m.titulo + '. ' + m.texto)); break;
      case 'trivia': p.preguntas.forEach((q, i) => { add('q' + i, q.decir || q.q); add('q' + i + '_ok', q.conf); }); break;
      case 'crucigrama': p.palabras.forEach((w, i) => add('w' + i, w.conf)); add('fin', p.fin); break;
      case 'vf': p.afirmaciones.forEach((a, i) => { add('a' + i, a.decir || a.t); add('a' + i + '_ok', a.conf); }); break;
      case 'asociar': p.pares.forEach((r, i) => { add('pa' + i, r.sub ? r.a + ', ' + r.sub : r.a); add('pb' + i, r.b); add('par' + i, r.conf); }); break;
      case 'clasificar': p.items.forEach((it, i) => { add('it' + i, it.t); add('it' + i + '_ok', it.conf); }); add('fin', p.fin); break;
      case 'ordenar': p.items.forEach((it, i) => add('o' + i, it.decir || it.t)); add('fin', p.fin); break;
      case 'sopa': p.palabras.forEach((w, i) => add('w' + i, w.decir || w.w)); add('fin', p.fin); break;
    }
    return L;
  }
  function listarAudios(D) {
    const L = [{ id: 'g_error', t: pron(D.globales.error) }, { id: 'g_cierre', t: pron(D.globales.cierre) }];
    if (D.meta.audioPortada) L.unshift({ id: 'portada', t: pron(D.meta.audioPortada) });
    if (D.globales.lupaMapa) L.push({ id: 'g_lupa_mapa', t: pron(D.globales.lupaMapa) });
    if (D.globales.lupaImg) L.push({ id: 'g_lupa_img', t: pron(D.globales.lupaImg) });
    if (D.globales.cruciMal) L.push({ id: 'g_cruci_mal', t: pron(D.globales.cruciMal) });
    D.pantallas.forEach(p => L.push(...audiosDePantalla(p)));
    return L;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { audiosDePantalla, listarAudios };
  if (typeof window === 'undefined') return;
  window.QST = { audiosDePantalla, listarAudios };
  // Enganche solo para pruebas automáticas (sin botones visibles)
  window.QST.ir = i => ir(i);

  // ---------- Utilidades ----------
  const D = (typeof DATOS !== 'undefined') ? DATOS : window.DATOS;
  const $ = s => document.querySelector(s);
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function aid(p, k) { return p.id + '_' + k; }
  function fig(src, cls) {
    const im = el('img', cls || 'fig'); im.alt = ''; im.src = src; im.draggable = false;
    im.onerror = () => { const ph = el('div', (cls || 'fig') + ' ph', '🖼️<small>' + src.split('/').pop() + '</small>'); if (im.parentNode) im.parentNode.replaceChild(ph, im); };
    return im;
  }

  function figGrande(src) {
    const box = el('div', 'figBox');
    const poner = s => { box.innerHTML = ''; if (s) box.appendChild(fig(s, 'figG')); };
    poner(src);
    return { box, poner };
  }

  // ---------- Estado ----------
  const E = { idx: -1, aciertos: 0, errores: 0, puntos: 0, completo: false, bloq: false };
  const N = D.pantallas.length;

  // ---------- Cola de audio global ----------
  const AQ = { cola: [], actual: null, gen: 0 };
  function pararAudio() {
    AQ.gen++; AQ.cola = []; clearTimeout(guardia);
    if (AQ.actual) { try { AQ.actual.onended = AQ.actual.onerror = null; AQ.actual.pause(); } catch (e) {} }
    AQ.actual = null; actualizarSig();
  }
  // Un solo reproductor para todo el paquete (si se crea uno nuevo por audio,
  // Chrome del celular bloquea los que suenan solos, sin un toque reciente)
  let AU = null, guardia = null;
  function reproductor() { if (!AU) { AU = new Audio(); AU.preload = 'auto'; } return AU; }
  function reproducirSiguiente() {
    clearTimeout(guardia);
    if (!AQ.cola.length) { AQ.actual = null; actualizarSig(); return; }
    const it = AQ.cola.shift();
    const g = ++AQ.gen;
    const a = reproductor();
    AQ.actual = a;
    let hecho = false;
    const fin = () => {
      if (hecho || g !== AQ.gen) return; hecho = true;
      clearTimeout(guardia); AQ.actual = null;
      if (it.cb) it.cb();
      if (g === AQ.gen) reproducirSiguiente();
    };
    a.onended = fin; a.onerror = fin;
    a.onloadedmetadata = () => { if (g !== AQ.gen) return; clearTimeout(guardia); const d = isFinite(a.duration) ? a.duration : 30; guardia = setTimeout(fin, (d + 4) * 1000); };
    guardia = setTimeout(fin, 40000);
    try { a.src = 'audio/' + it.id + '.mp3'; const pr = a.play(); if (pr && pr.catch) pr.catch(fin); } catch (e) { setTimeout(fin, 0); }
    actualizarSig();
  }
  function hablar(ids, opt) {
    opt = opt || {};
    if (opt.interrumpir) pararAudio();
    if (!Array.isArray(ids)) ids = [ids];
    if (opt.bloquear) setBloq(true);
    const final = () => { if (opt.bloquear) setBloq(false); if (opt.cb) opt.cb(); };
    if (!ids.length) { final(); return; }
    ids.forEach((id, i) => AQ.cola.push({ id: id, cb: i === ids.length - 1 ? final : null }));
    if (!AQ.actual) reproducirSiguiente(); else actualizarSig();
  }
  function audioOcupado() { return !!AQ.actual || AQ.cola.length > 0; }

  // ---------- Sonidos sintetizados (sin archivos) ----------
  let ctx = null;
  function abrirCtx() { try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.resume) ctx.resume(); } catch (e) {} }
  function tono(frecs, dur, tipo) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      frecs.forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = tipo || 'sine'; o.frequency.value = f;
        const t0 = ctx.currentTime + i * dur * 0.8;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.25, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + dur + 0.05);
      });
    } catch (e) {}
  }
  const chime = () => tono([784, 1047, 1319], 0.18);
  const buzz = () => tono([220, 180], 0.16, 'square');

  // ---------- Puntaje ----------
  function acierto() { E.aciertos++; E.puntos += 10; $('#pts').textContent = E.puntos; }
  function error() { E.errores++; }

  // ---------- Bloqueo / Siguiente ----------
  function setBloq(b) { E.bloq = b; const m = $('#main'); if (m) m.classList.toggle('bloq', b); }
  function setCompleto() { E.completo = true; actualizarSig(); }
  function actualizarSig() {
    const b = $('#btnSig'); if (!b) return;
    b.disabled = !(E.completo && (E.ignorarAudio || !audioOcupado()));
    b.classList.toggle('listo', !b.disabled);
  }

  // ---------- Navegación ----------
  function ir(i) {
    const zv = $('#zoomVista'); if (zv) zv.classList.remove('abierto');
    const vm = document.querySelector('.vidwrap iframe'); if (vm) vm.src = 'about:blank';
    pararAudio(); setBloq(false); E.completo = false; E.ignorarAudio = false;
    E.idx = i;
    if (i < 0) return portada();
    if (i >= N) return cierre();
    render();
  }
  function reiniciar() { E.aciertos = 0; E.errores = 0; E.puntos = 0; $('#pts').textContent = '0'; ir(-1); }

  // ---------- Esqueleto de pantalla ----------
  function base(p) {
    document.body.classList.remove('en-portada', 'en-cierre');
    $('#tit').textContent = p.titulo;
    $('#prog').textContent = (E.idx + 1) + ' / ' + N;
    const m = $('#main'); m.innerHTML = ''; m.className = 'tipo-' + p.tipo + (p.modo ? ' modo-' + p.modo : '');
    const ins = el('p', 'inst', p.inst); m.appendChild(ins);
    // 📖 releer el texto: visible desde que se leyó (y con flecha + rótulo para que no parezca adorno)
    const lb = $('#btnLibro');
    if (lb) {
      const ver = !!(D.texto && (p.libro || (E.vioTexto && p.libro !== false)));
      lb.classList.toggle('ver', ver);
      if (ver && p.tipo !== 'narracion') m.insertBefore(el('p', 'tipLibro', '👆 ¿Necesitás releer el texto? Tocá <b>📖 Texto</b>, arriba'), ins);
    }
    if (p.esTexto) E.vioTexto = true;
    actualizarSig();
    return m;
  }
  function render() {
    const p = D.pantallas[E.idx];
    const m = base(p);
    const R = { narracion: rNarracion, hotspot: rHotspot, trivia: rTrivia, vf: rVF, asociar: rAsociar, clasificar: rClasificar, ordenar: rOrdenar, sopa: rSopa, video: rVideo, crucigrama: rCrucigrama }[p.tipo];
    const arrancar = R(p, m) || (() => {});
    const btn = p.lupa ? ponerLupa(p, m) : null;
    hablar([aid(p, 'inst')], { bloquear: p.tipo !== 'video', cb: () => {
      if (!btn) return arrancar();
      btn.classList.add('titila2');
      hablar([p.lupa === 'imagen' ? 'g_lupa_img' : 'g_lupa_mapa'], { bloquear: true, cb: () => { btn.classList.remove('titila2'); arrancar(); } });
    } });
  }

  // ======================= LUPA (zoom sobre mapas/imágenes) =======================
  function ponerLupa(p, m) {
    const tip = el('p', 'tipLupa', p.lupa === 'imagen'
      ? '🔍 Tocá la lupa para ampliar la imagen, recorrela con el dedo y cerrala con ✕'
      : '🔍 Tocá la lupa para ampliar el mapa, recorrelo con el dedo y cerralo con ✕');
    const ins = m.querySelector('.inst'); ins.after(tip);
    const btn = el('button', 'lupaBtn', '🔍'); btn.setAttribute('aria-label', 'Ampliar');
    btn.onclick = e => { e.stopPropagation(); abrirZoom(p.img); };
    m.appendChild(btn);
    const ubicar = () => {
      const im = m.querySelector('.hsImg, .figG, .fig');
      if (!im || !document.body.contains(btn)) return;
      const R = im.getBoundingClientRect(), M = m.getBoundingClientRect();
      btn.style.left = (R.right - M.left - 50) + 'px'; btn.style.top = (R.top - M.top + 6) + 'px';
    };
    const im = m.querySelector('.hsImg, .figG, .fig');
    if (im) im.addEventListener('load', ubicar);
    requestAnimationFrame(ubicar); setTimeout(ubicar, 300);
    window.addEventListener('resize', ubicar);
    return btn;
  }
  const Z = { s: 1, tx: 0, ty: 0, bw: 0, bh: 0 };
  function abrirZoom(src) {
    const ov = $('#zoomVista'), im = $('#zImg');
    im.onload = () => {
      const vw = innerWidth * 0.96, vh = innerHeight * 0.86;
      const r = Math.min(vw / im.naturalWidth, vh / im.naturalHeight);
      Z.bw = im.naturalWidth * r; Z.bh = im.naturalHeight * r; Z.s = 1;
      Z.tx = (innerWidth - Z.bw) / 2; Z.ty = (innerHeight - Z.bh) / 2; aplicarZ(false);
    };
    im.src = src; ov.classList.add('abierto');
  }
  function aplicarZ(anim) {
    const im = $('#zImg');
    im.style.transition = anim ? 'all .3s' : 'none';
    im.style.width = (Z.bw * Z.s) + 'px'; im.style.height = (Z.bh * Z.s) + 'px';
    im.style.left = Z.tx + 'px'; im.style.top = Z.ty + 'px';
  }
  function limitarZ() {
    const w = Z.bw * Z.s, h = Z.bh * Z.s;
    Z.tx = w <= innerWidth ? (innerWidth - w) / 2 : Math.min(0, Math.max(innerWidth - w, Z.tx));
    Z.ty = h <= innerHeight ? (innerHeight - h) / 2 : Math.min(0, Math.max(innerHeight - h, Z.ty));
  }
  function initZoom() {
    const ov = $('#zoomVista'), im = $('#zImg');
    let ini = null, movido = false;
    im.addEventListener('pointerdown', e => { e.preventDefault(); ini = { x: e.clientX, y: e.clientY, tx: Z.tx, ty: Z.ty }; movido = false; im.setPointerCapture(e.pointerId); });
    im.addEventListener('pointermove', e => {
      if (!ini) return;
      const dx = e.clientX - ini.x, dy = e.clientY - ini.y;
      if (Math.abs(dx) + Math.abs(dy) > 8) movido = true;
      if (movido && Z.s > 1) { Z.tx = ini.tx + dx; Z.ty = ini.ty + dy; limitarZ(); aplicarZ(false); }
    });
    im.addEventListener('pointerup', e => {
      if (!ini) return; const fue = movido; ini = null;
      if (fue) return;
      const ns = Z.s > 1 ? 1 : 2.8;
      Z.tx = e.clientX - (e.clientX - Z.tx) * ns / Z.s; Z.ty = e.clientY - (e.clientY - Z.ty) * ns / Z.s; Z.s = ns;
      limitarZ(); aplicarZ(true);
    });
    $('#zCerrar').onclick = () => ov.classList.remove('abierto');
  }

  // ======================= NARRACIÓN =======================
  function rNarracion(p, m) {
    let paso = 0, caja, mano, stage, tarjetas = [];
    if (p.modo === 'svg') {
      stage = el('div', 'escenaWrap');
      const box = el('div', 'escenaBox'); box.innerHTML = ESCENAS[p.escena];
      mano = el('div', 'mano', '👆'); box.appendChild(mano);
      stage.appendChild(box); m.appendChild(stage);
    } else {
      if (p.img) m.appendChild(fig(p.img, 'fig figS'));
      const g = el('div', 'tarjetas n' + p.pasos.length);
      p.pasos.forEach(s => {
        const c = el('div', 'tarjeta oculta');
        if (s.img) c.appendChild(fig(s.img, 'tImg')); else c.appendChild(el('div', 'tIco', s.ico));
        c.appendChild(el('div', 'tEtq', s.etq));
        g.appendChild(c); tarjetas.push(c);
      });
      mano = el('div', 'mano', '👆');
      m.appendChild(g);
    }
    caja = el('div', 'subt', '&nbsp;'); m.appendChild(caja);
    function mostrar(i) {
      const s = p.pasos[i];
      caja.textContent = s.texto; caja.classList.remove('titila'); void caja.offsetWidth; caja.classList.add('titila');
      if (p.modo === 'svg') {
        const g = stage.querySelector('#' + s.mostrar); if (g) g.classList.add('ver');
        mano.style.left = s.x + '%'; mano.style.top = s.y + '%'; mano.classList.add('ver');
      } else {
        tarjetas.forEach(t => t.classList.remove('actual'));
        const t = tarjetas[i]; t.classList.remove('oculta'); t.classList.add('actual'); t.appendChild(mano); mano.classList.add('ver');
      }
    }
    function sig() {
      if (paso >= p.pasos.length) { mano.classList.remove('ver'); tarjetas.forEach(t => t.classList.remove('actual')); setCompleto(); return; }
      mostrar(paso);
      const i = paso++;
      hablar([aid(p, 'p' + i)], { bloquear: true, cb: sig });
    }
    return sig;
  }

  // ======================= HOTSPOT =======================
  function rHotspot(p, m) {
    const wrap = el('div', 'hsWrap'), box = el('div', 'hsBox');
    if (p.escena) { box.innerHTML = ESCENAS[p.escena]; box.querySelector('svg').setAttribute('class', 'hsImg hsSvg'); }
    else box.appendChild(fig(p.img, 'hsImg'));
    const info = el('div', 'info', '<b>👉 Tocá un marcador</b>');
    const vistos = new Set();
    p.marcadores.forEach((mk, i) => {
      const b = el('button', 'mk', mk.etq);
      b.style.left = mk.x + '%'; b.style.top = mk.y + '%';
      b.onclick = () => {
        box.querySelectorAll('.mk').forEach(x => x.classList.remove('activo'));
        b.classList.add('activo', 'visto');
        info.innerHTML = '<b>' + mk.titulo + '</b><span>' + mk.texto + '</span>';
        info.classList.remove('titila'); void info.offsetWidth; info.classList.add('titila');
        vistos.add(i);
        hablar([aid(p, 'm' + i)], { interrumpir: true });
        if (vistos.size === p.marcadores.length) setCompleto();
      };
      box.appendChild(b);
    });
    wrap.appendChild(box); m.appendChild(wrap); m.appendChild(info);
  }

  // ======================= TRIVIA =======================
  function rTrivia(p, m) {
    let red = null;
    if (p.escena) {
      const w = el('div', 'escenaWrap redWrap'); red = el('div', 'escenaBox'); red.innerHTML = ESCENAS[p.escena];
      w.appendChild(red); m.appendChild(w);
    } else if (p.img) m.appendChild(fig(p.img, 'fig'));
    const marcar = q => {
      if (!red) return;
      red.querySelectorAll('.blanco').forEach(x => x.classList.remove('titila3'));
      if (q && q.llenar) { const b = red.querySelector('#' + q.llenar + 'q'); if (b) b.classList.add('titila3'); }
    };
    const llenar = q => {
      if (!red || !q.llenar) return;
      const a = red.querySelector('#' + q.llenar), b = red.querySelector('#' + q.llenar + 'q');
      if (a) a.classList.add('ver'); if (b) { b.classList.remove('titila3'); b.style.display = 'none'; }
    };
    const cont = el('div', 'tarjetaPreg'); m.appendChild(cont);
    let qi = 0;
    function mostrar(conAudio) {
      const q = p.preguntas[qi]; let evaluada = false;
      cont.innerHTML = ''; marcar(q);
      cont.appendChild(el('div', 'contador', 'Pregunta ' + (qi + 1) + ' de ' + p.preguntas.length));
      if (q.frase) cont.appendChild(el('div', 'frase', q.frase.replace(/_{3,}/, '<span class="hueco">______</span>')));
      const pq = el('div', 'preg titila', q.q); cont.appendChild(pq);
      const cortas = q.ops.every(o => o.length <= 10);
      const g = el('div', 'ops ' + (cortas ? 'dos' : 'una'));
      barajar(q.ops.map((t, i) => ({ t, i }))).forEach(o => {
        const b = el('button', 'op', o.t);
        b.dataset.ok = o.i === q.ok ? '1' : '0';
        b.onclick = () => {
          if (b.classList.contains('mal') || g.classList.contains('resuelto')) return;
          if (o.i === q.ok) {
            if (!evaluada) { evaluada = true; acierto(); }
            b.classList.add('bien'); g.classList.add('resuelto'); chime(); llenar(q);
            const h = cont.querySelector('.hueco'); if (h) { h.textContent = q.ops[q.ok]; h.classList.add('lleno'); }
            hablar([aid(p, 'q' + qi + '_ok')], { interrumpir: true, bloquear: true, cb: () => { qi++; if (qi < p.preguntas.length) mostrar(); else setCompleto(); } });
          } else {
            if (!evaluada) { evaluada = true; error(); }
            b.classList.add('mal'); buzz(); hablar(['g_error'], { interrumpir: true });
          }
        };
        g.appendChild(b);
      });
      cont.appendChild(g);
      if (conAudio !== false) hablar([aid(p, 'q' + qi)], { interrumpir: true });
    }
    mostrar(false);
    return () => hablar([aid(p, 'q0')]);
  }

  // ======================= VERDADERO / FALSO =======================
  function rVF(p, m) {
    const FG = figGrande(p.afirmaciones[0].img || p.img); m.appendChild(FG.box);
    const cont = el('div', 'tarjetaPreg vfCont'); m.appendChild(cont);
    let ai = 0;
    function mostrar(conAudio) {
      const a = p.afirmaciones[ai]; let evaluada = false;
      if (a.img) FG.poner(a.img);
      cont.innerHTML = '';
      cont.appendChild(el('div', 'contador', 'Afirmación ' + (ai + 1) + ' de ' + p.afirmaciones.length));
      cont.appendChild(el('div', 'preg titila', a.t));
      const g = el('div', 'ops dos vfops');
      [['✅ Verdadero', true], ['❌ Falso', false]].forEach(([t, v]) => {
        const b = el('button', 'op', t);
        b.onclick = () => {
          if (b.classList.contains('mal') || g.classList.contains('resuelto')) return;
          if (v === a.v) {
            if (!evaluada) { evaluada = true; acierto(); }
            b.classList.add('bien'); g.classList.add('resuelto'); chime();
            hablar([aid(p, 'a' + ai + '_ok')], { interrumpir: true, bloquear: true, cb: () => { ai++; if (ai < p.afirmaciones.length) mostrar(); else setCompleto(); } });
          } else {
            if (!evaluada) { evaluada = true; error(); }
            b.classList.add('mal'); buzz(); hablar(['g_error'], { interrumpir: true });
          }
        };
        g.appendChild(b);
      });
      cont.appendChild(g);
      if (conAudio !== false) hablar([aid(p, 'a' + ai)], { interrumpir: true });
    }
    mostrar(false);
    return () => hablar([aid(p, 'a0')]);
  }

  // ======================= ASOCIAR =======================
  const COLORES = ['#1e88e5', '#8e24aa', '#f4511e', '#00897b', '#c0ca33', '#6d4c41', '#d81b60'];
  function rAsociar(p, m) {
    if (p.img) m.appendChild(figGrande(p.img).box);
    const g = el('div', 'asoc'); const colA = el('div', 'colA'), colB = el('div', 'colB');
    let sel = null, hechos = 0; const evaluado = new Set();
    const bA = p.pares.map((r, i) => { const b = el('button', 'aso a', r.a + (r.sub ? '<small class="sig">' + r.sub + '</small>' : '')); b.dataset.i = i; return b; });
    const bB = p.pares.map((r, i) => { const b = el('button', 'aso b', r.b); b.dataset.i = i; return b; });
    barajar(bA).forEach(b => colA.appendChild(b));
    barajar(bB).forEach(b => colB.appendChild(b));
    bA.forEach(b => b.onclick = () => {
      if (b.classList.contains('resuelto')) return;
      bA.forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = +b.dataset.i;
      hablar([aid(p, 'pa' + sel)], { interrumpir: true });
    });
    bB.forEach(b => b.onclick = () => {
      if (b.classList.contains('resuelto')) return;
      const j = +b.dataset.i;
      if (sel === null) { hablar([aid(p, 'pb' + j)], { interrumpir: true }); return; }
      const i = sel;
      if (i === j) {
        if (!evaluado.has(i)) { evaluado.add(i); acierto(); }
        const c = COLORES[hechos % COLORES.length];
        [bA[i], b].forEach(x => { x.classList.remove('sel'); x.classList.add('resuelto'); x.style.background = c; x.style.borderColor = c; });
        sel = null; hechos++; chime();
        hablar([aid(p, 'par' + i)], { interrumpir: true, bloquear: true, cb: () => { if (hechos === p.pares.length) setCompleto(); } });
      } else {
        if (!evaluado.has(i)) { evaluado.add(i); error(); }
        b.classList.add('sacude'); setTimeout(() => b.classList.remove('sacude'), 450);
        buzz(); hablar(['g_error'], { interrumpir: true });
      }
    });
    g.appendChild(colA); g.appendChild(colB); m.appendChild(g);
  }

  // ======================= CLASIFICAR (uno por vez) =======================
  function rClasificar(p, m) {
    const orden = barajar(p.items.map((it, i) => i));
    const FG = figGrande(p.items[orden[0]].img || p.img); m.appendChild(FG.box);
    let k = 0;
    const carta = el('button', 'carta titila'); m.appendChild(carta);
    const cats = el('div', 'cats n' + p.categorias.length);
    const listas = p.categorias.map((c, ci) => {
      const b = el('button', 'cat'); b.appendChild(el('div', 'catNom', c));
      const l = el('div', 'chips'); b.appendChild(l); cats.appendChild(b);
      b.onclick = () => elegir(ci, b);
      return l;
    });
    m.appendChild(cats);
    let evaluado = false;
    function mostrar(conAudio) {
      if (k >= orden.length) { carta.style.visibility = 'hidden'; hablar([aid(p, 'fin')], { bloquear: true, cb: setCompleto }); return; }
      const i = orden[k]; evaluado = false;
      if (p.items[i].img) FG.poner(p.items[i].img);
      carta.textContent = p.items[i].t; carta.classList.remove('titila'); void carta.offsetWidth; carta.classList.add('titila');
      carta.onclick = () => hablar([aid(p, 'it' + i)], { interrumpir: true });
      if (conAudio !== false) hablar([aid(p, 'it' + i)], { interrumpir: true });
    }
    function elegir(ci, b) {
      if (k >= orden.length) return;
      const i = orden[k], it = p.items[i];
      if (ci === it.cat) {
        if (!evaluado) { evaluado = true; acierto(); }
        chime(); listas[ci].appendChild(el('span', 'chip', it.t));
        b.classList.add('ok'); setTimeout(() => b.classList.remove('ok'), 500);
        k++;
        if (it.conf) hablar([aid(p, 'it' + i + '_ok')], { interrumpir: true, bloquear: true, cb: mostrar });
        else { pararAudio(); mostrar(); }
      } else {
        if (!evaluado) { evaluado = true; error(); }
        b.classList.add('sacude'); setTimeout(() => b.classList.remove('sacude'), 450);
        buzz(); hablar(['g_error'], { interrumpir: true });
      }
    }
    mostrar(false);
    return () => hablar([aid(p, 'it' + orden[0])]);
  }

  // ======================= ORDENAR (tocar en orden) =======================
  function rOrdenar(p, m) {
    if (p.img && !p.sinFig) m.appendChild(fig(p.img, 'fig figS'));
    const conImg = p.items.some(it => it.img);
    const g = el('div', 'orden n' + p.items.length + (conImg ? ' conImg' : ' soloTxt'));
    let sigue = 0; const evaluado = new Set();
    const cartas = p.items.map((it, i) => {
      const c = el('button', 'oc');
      if (it.img) c.appendChild(fig(it.img, 'ocImg')); else if (it.ico) c.appendChild(el('div', 'ocIco', it.ico));
      c.appendChild(el('div', 'ocTxt', it.t));
      c.onclick = () => {
        if (c.classList.contains('puesto')) return;
        if (i === sigue) {
          if (!evaluado.has(sigue)) { evaluado.add(sigue); acierto(); }
          c.classList.add('puesto'); c.appendChild(el('div', 'num', String(sigue + 1)));
          chime(); sigue++;
          const ids = [aid(p, 'o' + i)];
          if (sigue === p.items.length) ids.push(aid(p, 'fin'));
          hablar(ids, { interrumpir: true, bloquear: true, cb: () => { if (sigue === p.items.length) setCompleto(); } });
        } else {
          if (!evaluado.has(sigue)) { evaluado.add(sigue); error(); }
          c.classList.add('sacude'); setTimeout(() => c.classList.remove('sacude'), 450);
          buzz(); hablar(['g_error'], { interrumpir: true });
        }
      };
      return c;
    });
    barajar(cartas).forEach(c => g.appendChild(c));
    m.appendChild(g);
  }

  // ======================= SOPA DE LETRAS =======================
  function armarSopa(palabras, n) {
    const DIRS = [[0, 1], [1, 0], [1, 1]];
    for (let intento = 0; intento < 200; intento++) {
      const G = Array.from({ length: n }, () => Array(n).fill(''));
      const pos = []; let ok = true;
      const orden = palabras.map((w, i) => i).sort((a, b) => palabras[b].length - palabras[a].length);
      const dirPor = {}; orden.forEach((wi, k) => dirPor[wi] = k % 3);
      for (const wi of orden) {
        const w = palabras[wi]; let puesto = false;
        const dirs = [dirPor[wi], (dirPor[wi] + 1) % 3, (dirPor[wi] + 2) % 3];
        for (const di of dirs) {
          const [dr, dc] = DIRS[di];
          const cand = [];
          for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
            if (r + dr * (w.length - 1) >= n || c + dc * (w.length - 1) >= n) continue;
            let v = true;
            for (let k = 0; k < w.length; k++) { const x = G[r + dr * k][c + dc * k]; if (x && x !== w[k]) { v = false; break; } }
            if (v) cand.push([r, c]);
          }
          if (cand.length) {
            const [r, c] = cand[Math.floor(Math.random() * cand.length)];
            for (let k = 0; k < w.length; k++) G[r + dr * k][c + dc * k] = w[k];
            pos[wi] = { r, c, dr, dc, len: w.length }; puesto = true; break;
          }
        }
        if (!puesto) { ok = false; break; }
      }
      if (!ok) continue;
      const dirsUsadas = new Set(pos.map(q => q.dr + ',' + q.dc));
      if (dirsUsadas.size < Math.min(3, palabras.length) && intento < 150) continue;
      const AB = 'ABCDEFGHIJLMNOPRSTUV';
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!G[r][c]) G[r][c] = AB[Math.floor(Math.random() * AB.length)];
      return { G, pos };
    }
    throw new Error('No se pudo armar la sopa');
  }
  function rSopa(p, m) {
    const n = p.tam || 10;
    const W = p.palabras.map(x => x.w.toUpperCase());
    const { G } = armarSopa(W, n);
    const top = el('div', 'sopaTop');
    top.appendChild(fig(p.img, 'figMini'));
    const lista = el('div', 'palabras');
    const chips = W.map(w => { const c = el('span', 'pchip', w); lista.appendChild(c); return c; });
    top.appendChild(lista); m.appendChild(top);
    const wrap = el('div', 'sopaWrap');
    const grid = el('div', 'sopa'); grid.style.gridTemplateColumns = 'repeat(' + n + ',1fr)';
    const celdas = [];
    for (let r = 0; r < n; r++) { celdas.push([]); for (let c = 0; c < n; c++) { const d = el('div', 'celda', G[r][c]); grid.appendChild(d); celdas[r].push(d); } }
    wrap.appendChild(grid); m.appendChild(wrap);
    let ini = null, pendienteFallo = false; const halladas = new Set();
    function celdaEn(x, y) {
      const R = grid.getBoundingClientRect(); const cw = R.width / n, ch = R.height / n;
      const c = Math.floor((x - R.left) / cw), r = Math.floor((y - R.top) / ch);
      if (x < R.left - cw * 0.5 || x > R.right + cw * 0.5 || y < R.top - ch * 0.5 || y > R.bottom + ch * 0.5) return null;
      return [Math.max(0, Math.min(n - 1, r)), Math.max(0, Math.min(n - 1, c))];
    }
    grid.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      if (E.bloq) return;
      const rc = celdaEn(ev.clientX, ev.clientY); if (!rc) return;
      const [r, c] = rc;
      if (!ini) { ini = [r, c]; celdas[r][c].classList.add('ini'); return; }
      const [r0, c0] = ini; celdas[r0][c0].classList.remove('ini'); ini = null;
      if (r0 === r && c0 === c) return;
      let a = [r0, c0], b = [r, c];
      if (b[0] < a[0] || (b[0] === a[0] && b[1] < a[1])) [a, b] = [b, a];
      const dr = Math.sign(b[0] - a[0]), dc = Math.sign(b[1] - a[1]);
      const lr = Math.abs(b[0] - a[0]), lc = Math.abs(b[1] - a[1]);
      const recta = (dr === 0 && dc === 1) || (dr === 1 && dc === 0) || (dr === 1 && dc === 1 && lr === lc);
      if (!recta) return;
      const len = Math.max(lr, lc) + 1; let s = ''; const cs = [];
      for (let k = 0; k < len; k++) { const cc = celdas[a[0] + dr * k][a[1] + dc * k]; s += cc.textContent; cs.push(cc); }
      const wi = W.findIndex((w, i) => w === s && !halladas.has(i));
      if (wi >= 0) {
        halladas.add(wi);
        if (pendienteFallo) { error(); pendienteFallo = false; } else acierto();
        const col = COLORES[wi % COLORES.length];
        cs.forEach(cc => { cc.classList.add('hallada'); cc.style.background = col; });
        chips[wi].classList.add('ok'); chips[wi].style.background = col; chime();
        const ids = [aid(p, 'w' + wi)];
        if (halladas.size === W.length) ids.push(aid(p, 'fin'));
        hablar(ids, { interrumpir: true, bloquear: halladas.size === W.length, cb: () => { if (halladas.size === W.length) setCompleto(); } });
      } else if (len >= 3) {
        pendienteFallo = true; cs.forEach(cc => { cc.classList.add('fallo'); setTimeout(() => cc.classList.remove('fallo'), 450); });
        buzz(); hablar(['g_error'], { interrumpir: true });
      }
    });
    ['contextmenu', 'selectstart'].forEach(t => grid.addEventListener(t, e => e.preventDefault()));
  }

  // ======================= VIDEO DE YOUTUBE (incrustado) =======================
  let ytCargando = false, ytCola = [];
  function conYT(f) {
    if (window.YT && window.YT.Player) { f(); return; }
    ytCola.push(f);
    if (ytCargando) return; ytCargando = true;
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { if (prev) prev(); const c = ytCola; ytCola = []; c.forEach(g => g()); };
    const sc = document.createElement('script'); sc.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(sc);
  }
  function rVideo(p, m) {
    const caja = el('div', 'vidbox'), wrap = el('div', 'vidwrap'), fr = document.createElement('iframe');
    fr.id = 'ytv' + Date.now();
    fr.src = 'https://www.youtube-nocookie.com/embed/' + p.yt + '?rel=0&playsinline=1&modestbranding=1&enablejsapi=1';
    fr.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen');
    fr.setAttribute('allowfullscreen', ''); fr.setAttribute('title', p.texto || 'Video');
    const cap = el('p', 'vidcap', '📺 ' + (p.texto || ''));
    wrap.appendChild(fr); caja.appendChild(wrap); caja.appendChild(cap); m.appendChild(caja);
    function ajustar() {
      if (!document.body.contains(caja)) { window.removeEventListener('resize', ajustar); return; }
      const w = caja.clientWidth, h = caja.clientHeight - cap.offsetHeight - 8;
      if (!w || !h) return;
      if (w / h > 16 / 9) { wrap.style.height = h + 'px'; wrap.style.width = Math.floor(h * 16 / 9) + 'px'; }
      else { wrap.style.width = w + 'px'; wrap.style.height = Math.floor(w * 9 / 16) + 'px'; }
    }
    ajustar(); requestAnimationFrame(ajustar); window.addEventListener('resize', ajustar);
    // si tocan play mientras suena la consigna, se calla el audio
    if (!/jsdom/i.test(navigator.userAgent)) conYT(() => {
      try { new YT.Player(fr.id, { events: { onStateChange: e => { if (e.data === 1) pararAudio(); } } }); } catch (e) {}
    });
    E.ignorarAudio = true; setCompleto();
    return () => {};
  }

  // ======================= ESCENAS SVG =======================
  const ESCENAS = {};

  // ======================= CRUCIGRAMA =======================
  // p.palabras: { w, dir:'H'|'V', f, c, pista, conf } · numeración automática por posición
  function rCrucigrama(p, m) {
    const W = p.palabras.map(x => Object.assign({}, x, { w: x.w.toUpperCase() }));
    let filas = 0, cols = 0;
    W.forEach(x => { const lf = x.dir === 'V' ? x.f + x.w.length : x.f + 1, lc = x.dir === 'H' ? x.c + x.w.length : x.c + 1; filas = Math.max(filas, lf); cols = Math.max(cols, lc); });
    const C = {}; const key = (f, c) => f + ',' + c;
    W.forEach((x, wi) => { x.celdas = []; for (let k = 0; k < x.w.length; k++) { const f = x.f + (x.dir === 'V' ? k : 0), c = x.c + (x.dir === 'H' ? k : 0); const K = key(f, c); C[K] = C[K] || { f, c, sol: x.w[k], val: '', pal: [] }; C[K].pal.push(wi); x.celdas.push(C[K]); } });
    // numeración
    const inicios = W.map((x, i) => i).sort((a, b) => W[a].f - W[b].f || W[a].c - W[b].c);
    let n = 0; const numDe = {};
    inicios.forEach(i => { const K = key(W[i].f, W[i].c); if (!numDe[K]) numDe[K] = ++n; W[i].num = numDe[K]; });
    const cuerpo = el('div', 'cruciCuerpo');
    const gw = el('div', 'cruciWrap'); const grid = el('div', 'cruci');
    grid.style.gridTemplateColumns = 'repeat(' + cols + ',1fr)'; grid.style.setProperty('--cols', cols); grid.style.setProperty('--filas', filas);
    for (let f = 0; f < filas; f++) for (let c = 0; c < cols; c++) {
      const K = key(f, c), cel = C[K];
      const d = el('div', cel ? 'cc' : 'cc vacia');
      if (cel) {
        if (numDe[K]) d.appendChild(el('span', 'ccNum', String(numDe[K])));
        cel.txt = el('span', 'ccL', ''); d.appendChild(cel.txt); cel.el = d;
        d.onclick = () => tocarCelda(cel);
      }
      grid.appendChild(d);
    }
    gw.appendChild(grid); cuerpo.appendChild(gw);
    const lado = el('div', 'cruciLado');
    const pista = el('div', 'pista titila'); lado.appendChild(pista);
    const nav = el('div', 'pistaNav');
    const bAnt = el('button', 'pnBtn', '◀'), bSig = el('button', 'pnBtn', '▶');
    const lista = el('div', 'pistaChips');
    nav.appendChild(bAnt); nav.appendChild(lista); nav.appendChild(bSig); lado.appendChild(nav);
    const chips = inicios.map(i => { const ch = el('button', 'pchip2', W[i].num + (W[i].dir === 'H' ? '→' : '↓')); ch.onclick = () => elegir(i, 0); lista.appendChild(ch); W[i].chip = ch; return ch; });
    const teclado = el('div', 'teclado');
    ['QWERTYUIOP', 'ASDFGHJKLÑ', 'ZXCVBNM⌫'].forEach(fila => {
      const r = el('div', 'tfila');
      [...fila].forEach(L => { const t = el('button', 'tecla' + (L === '⌫' ? ' borrar' : ''), L); t.onclick = () => L === '⌫' ? borrar() : escribir(L); r.appendChild(t); });
      teclado.appendChild(r);
    });
    lado.appendChild(teclado); cuerpo.appendChild(lado); m.appendChild(cuerpo);
    let act = -1, pos = 0; const resueltas = new Set(), evaluada = new Set();
    function pintar() {
      Object.values(C).forEach(cel => { cel.el.classList.remove('enPal', 'cursor'); cel.txt.textContent = cel.val; });
      if (act < 0) return;
      W[act].celdas.forEach(cel => cel.el.classList.add('enPal'));
      if (!resueltas.has(act)) W[act].celdas[pos].el.classList.add('cursor');
      W.forEach(x => x.chip.classList.toggle('actual', x === W[act]));
      const x = W[act];
      pista.innerHTML = '<b>' + x.num + ' ' + (x.dir === 'H' ? 'Horizontal →' : 'Vertical ↓') + '</b> · ' + x.w.length + ' letras<br>' + x.pista;
      pista.classList.remove('titila'); void pista.offsetWidth; pista.classList.add('titila');
    }
    function elegir(i, k) {
      act = i;
      pos = k != null ? k : W[i].celdas.findIndex(cel => !cel.val); if (pos < 0) pos = 0;
      pintar();
    }
    function tocarCelda(cel) {
      // si la celda es cruce y ya está en la palabra activa, cambia de dirección
      let i;
      if (cel.pal.includes(act)) i = (cel.pal.length > 1 && W[act].celdas[pos] === cel) ? cel.pal.find(j => j !== act) : act;
      else { i = cel.pal.find(j => !resueltas.has(j)); if (i == null) i = cel.pal[0]; }
      if (resueltas.has(i)) { const o = cel.pal.find(j => !resueltas.has(j)); if (o != null) i = o; }
      elegir(i, W[i].celdas.indexOf(cel));
    }
    function sigPalabra() {
      for (let s = 1; s <= W.length; s++) { const j = inicios[(inicios.indexOf(act) + s) % W.length]; if (!resueltas.has(j)) return elegir(j, null); }
    }
    function escribir(L) {
      if (act < 0 || resueltas.has(act) || E.bloq) return;
      const x = W[act]; let k = pos;
      // letra ya fija (cruce resuelto): si escriben esa misma letra, solo avanza
      if (x.celdas[k] && x.celdas[k].fija && x.celdas[k].sol === L) { pos = Math.min(k + 1, x.celdas.length - 1); pintar(); if (x.celdas.every(cel => cel.val)) revisar(act); return; }
      while (k < x.celdas.length && x.celdas[k].fija) k++;
      if (k >= x.celdas.length) return;
      x.celdas[k].val = L; pos = Math.min(k + 1, x.celdas.length - 1);
      tono([660], 0.05);
      pintar();
      if (x.celdas.every(cel => cel.val)) revisar(act);
    }
    function borrar() {
      if (act < 0 || resueltas.has(act)) return;
      const x = W[act];
      let k = x.celdas[pos].val && !x.celdas[pos].fija ? pos : pos - 1;
      while (k >= 0 && x.celdas[k].fija) k--;
      if (k < 0) return;
      x.celdas[k].val = ''; pos = k; pintar();
    }
    function revisar(i) {
      const x = W[i];
      if (x.celdas.every(cel => cel.val === cel.sol)) {
        if (!evaluada.has(i)) { evaluada.add(i); acierto(); }
        resueltas.add(i); x.celdas.forEach(cel => { cel.fija = true; cel.el.classList.add('bien'); }); x.chip.classList.add('ok');
        chime(); pintar();
        const fin = resueltas.size === W.length;
        hablar(fin ? [aid(p, 'w' + i), aid(p, 'fin')] : [aid(p, 'w' + i)], { interrumpir: true, bloquear: true, cb: () => { if (fin) { act = -1; pintar(); pista.innerHTML = '🎉 ¡Crucigrama completo!'; setCompleto(); } else sigPalabra(); } });
      } else {
        if (!evaluada.has(i)) { evaluada.add(i); error(); }
        buzz();
        x.celdas.forEach(cel => { if (!cel.fija && cel.val !== cel.sol) cel.el.classList.add('mal'); });
        hablar([D.globales.cruciMal ? 'g_cruci_mal' : 'g_error'], { interrumpir: true });
        setTimeout(() => { x.celdas.forEach(cel => { cel.el.classList.remove('mal'); if (!cel.fija && cel.val !== cel.sol) cel.val = ''; }); pos = Math.max(0, x.celdas.findIndex(cel => !cel.val)); pintar(); }, 900);
      }
    }
    bAnt.onclick = () => { const k = inicios.indexOf(act); for (let s = 1; s <= W.length; s++) { const j = inicios[(k - s + W.length * 2) % W.length]; if (!resueltas.has(j)) return elegir(j, null); } };
    bSig.onclick = () => sigPalabra();
    // tamaño de casillero según el lugar libre (sin scroll, en vertical y en horizontal)
    function ajustar() {
      if (!document.body.contains(grid)) { window.removeEventListener('resize', ajustar); return; }
      const R = gw.getBoundingClientRect(); if (!R.width || !R.height) return;
      const t = Math.max(12, Math.floor(Math.min((R.width - cols * 2) / cols, (R.height - filas * 2) / filas, 38)));
      grid.style.gridTemplateColumns = 'repeat(' + cols + ',' + t + 'px)'; grid.style.gridAutoRows = t + 'px';
      grid.style.fontSize = Math.round(t * 0.62) + 'px';
    }
    ajustar(); requestAnimationFrame(ajustar); setTimeout(ajustar, 200); window.addEventListener('resize', ajustar);
    elegir(inicios[0], 0);
    window.QST.cruci = { W, escribir, elegir };
  }

  // ======================= PORTADA / CIERRE =======================
  function firma() {
    const f = el('div', 'firma');
    const im = fig(D.meta.fotoMini || D.meta.foto, 'foto'); f.appendChild(im);
    const t = el('div', 'firmaTxt', '<span>' + D.meta.firma + '</span><span>✉️ ' + D.meta.mail + '</span>');
    f.appendChild(t);
    f.addEventListener('click', e => { if (e.target.classList.contains('foto') || e.target.closest('.foto')) abrirLB(); });
    return f;
  }
  function portada() {
    document.body.classList.add('en-portada'); document.body.classList.remove('en-cierre');
    const m = $('#main'); m.innerHTML = ''; m.className = 'portada';
    m.appendChild(fig(D.meta.portada, 'figPortada'));
    m.appendChild(el('div', 'etiqueta', D.meta.etiqueta));
    m.appendChild(el('h1', '', D.meta.titulo));
    m.appendChild(el('p', 'sub', D.meta.subtitulo));
    const fila = el('div', 'filaPortada');
    const b = el('button', 'btnGrande', '▶ Comenzar'); b.onclick = () => ir(0);
    fila.appendChild(b); fila.appendChild(firma()); m.appendChild(fila);
    if (D.meta.audioPortada) {
      const esc = el('button', 'btnEscuchar', '🔊 Escuchar'); esc.onclick = () => hablar(['portada'], { interrumpir: true });
      m.appendChild(esc);
    }
    // "Tocá para empezar": una sola vez por carga; destraba el sonido en celulares
    if (!E.arrancado) {
      const arr = el('button', 'arranque'); arr.id = 'bArranque';
      arr.innerHTML = '<span class="arr-ico">🔊</span><span>Tocá para empezar</span>';
      document.body.appendChild(arr);
      arr.onclick = () => {
        E.arrancado = true; abrirCtx(); reproductor();
        arr.remove();
        if (D.meta.audioPortada) hablar(['portada']); else ir(0);
      };
    } else if (D.meta.audioPortada) hablar(['portada']);
  }
  function cierre() {
    document.body.classList.add('en-cierre'); document.body.classList.remove('en-portada');
    $('#tit').textContent = '¡Misión cumplida!'; $('#prog').textContent = '';
    const m = $('#main'); m.innerHTML = ''; m.className = 'cierre';
    m.appendChild(fig(D.meta.cierreImg, 'figPortada'));
    const tot = E.aciertos + E.errores;
    const pct = tot ? Math.round(E.aciertos * 100 / tot) : 0;
    m.appendChild(el('div', 'stats',
      '<div>✅<b>' + E.aciertos + '</b><small>Aciertos</small></div>' +
      '<div>❌<b>' + E.errores + '</b><small>Errores</small></div>' +
      '<div>📊<b>' + pct + '%</b><small>Total</small></div>' +
      '<div>⭐<b>' + E.puntos + '</b><small>Puntos</small></div>'));
    const fila = el('div', 'filaPortada');
    const b = el('button', 'btnGrande', '🔄 Volver a jugar'); b.onclick = reiniciar;
    fila.appendChild(b); fila.appendChild(firma()); m.appendChild(fila);
    try { if (window.QSTEnvio) m.appendChild(QSTEnvio.boton({ titulo: D.meta.titulo, parte: D.meta.parte || '', grado: D.meta.grado || D.meta.etiqueta, aciertos: E.aciertos, errores: E.errores, puntos: E.puntos })); } catch (e) {}
    E.completo = true; hablar(['g_cierre']);
  }

  // ---------- Texto para releer (📖) ----------
  function abrirTexto() {
    const ov = $('#textoVista'); if (!ov) return;
    ov.querySelector('.tvCuerpo').innerHTML = D.texto; ov.classList.add('abierto');
  }

  // ---------- Lightbox con zoom ----------
  function abrirLB() {
    const lb = $('#lightbox'), im = $('#lbImg');
    im.src = D.meta.foto; im.classList.remove('zoom'); im.style.transformOrigin = '50% 50%';
    lb.classList.add('abierto');
  }
  function initLB() {
    const lb = $('#lightbox'), im = $('#lbImg');
    im.addEventListener('click', e => {
      if (im.classList.contains('zoom')) { im.classList.remove('zoom'); return; }
      const R = im.getBoundingClientRect();
      im.style.transformOrigin = ((e.clientX - R.left) / R.width * 100) + '% ' + ((e.clientY - R.top) / R.height * 100) + '%';
      im.classList.add('zoom');
    });
    $('#lbCerrar').onclick = () => { lb.classList.remove('abierto'); im.classList.remove('zoom'); };
  }

  // ---------- Inicio ----------
  function init() {
    document.title = D.meta.titulo + ' · QueSepanTodos';
    $('#btnSig').onclick = () => { if (!$('#btnSig').disabled) ir(E.idx + 1); };
    if (D.meta.revision) {
      const f = $('footer'), pa = el('button', 'revBtn', '◀'), pb = el('button', 'revBtn', '▶');
      pa.title = 'Anterior (revisión)'; pb.title = 'Siguiente (revisión)';
      pa.onclick = () => ir(Math.max(-1, E.idx - 1)); pb.onclick = () => ir(Math.min(N, E.idx + 1));
      const r = el('div', 'revNav'); r.appendChild(pa); r.appendChild(pb); f.insertBefore(r, $('#btnSig'));
    }
    initLB(); initZoom();
    const lb = $('#btnLibro'); if (lb) lb.onclick = abrirTexto;
    const tc = $('#tvCerrar'); if (tc) tc.onclick = () => $('#textoVista').classList.remove('abierto');
    portada();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
