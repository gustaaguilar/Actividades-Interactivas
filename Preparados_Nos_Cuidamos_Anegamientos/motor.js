// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: narracion, hotspot (img/svg), trivia (img/red svg), vf, video YT,
//  asociar, clasificar (uno a uno), ordenar, sopa de letras, oracion (armar palabra por palabra).
//  Paquete: Preparados nos cuidamos — Anegamientos e inundaciones
// ============================================================
(function () {
  'use strict';

  // ---------- Audios (función pura: la usa también el extractor) ----------
  // Correcciones de pronunciación para gTTS (el texto en pantalla no cambia)
  const ORD = { 1: 'primer', 2: 'segundo', 3: 'tercer', 4: 'cuarto', 5: 'quinto', 6: 'sexto', 7: 'séptimo' };
  function pron(t) {
    return t.replace(/\b([1-7])\s*[°º]\s*grado/g, (m, n) => ORD[n] + ' grado');
  }
  function audiosDePantalla(p) {
    const L = [];
    const add = (k, t) => { if (t) L.push({ id: p.id + '_' + k, t: pron(t) }); };
    add('inst', p.inst);
    switch (p.tipo) {
      case 'narracion': p.pasos.forEach((s, i) => add('p' + i, s.texto)); break;
      case 'hotspot': p.marcadores.forEach((m, i) => add('m' + i, m.titulo + '. ' + m.texto)); break;
      case 'trivia': p.preguntas.forEach((q, i) => { add('q' + i, q.q); add('q' + i + '_ok', q.conf); }); break;
      case 'vf': p.afirmaciones.forEach((a, i) => { add('a' + i, a.t); add('a' + i + '_ok', a.conf); }); break;
      case 'asociar': p.pares.forEach((r, i) => { add('pa' + i, r.sub ? r.a + ', ' + r.sub : r.a); add('pb' + i, r.b); add('par' + i, r.conf); }); break;
      case 'clasificar': p.items.forEach((it, i) => { add('it' + i, it.t); add('it' + i + '_ok', it.conf); }); add('fin', p.fin); break;
      case 'ordenar': p.items.forEach((it, i) => add('o' + i, it.decir || it.t)); add('fin', p.fin); break;
      case 'sopa': p.palabras.forEach((w, i) => add('w' + i, w.decir || w.w)); add('fin', p.fin); break;
      case 'oracion': p.oraciones.forEach((o, i) => add('or' + i, o.t)); add('fin', p.fin); break;
    }
    return L;
  }
  function listarAudios(D) {
    const L = [{ id: 'g_error', t: pron(D.globales.error) }, { id: 'g_cierre', t: pron(D.globales.cierre) },
               { id: 'g_lupa_mapa', t: pron(D.globales.lupaMapa) }, { id: 'g_lupa_img', t: pron(D.globales.lupaImg) }];
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
    AQ.gen++; AQ.cola = [];
    if (AQ.actual) { try { AQ.actual.onended = AQ.actual.onerror = null; AQ.actual.pause(); } catch (e) {} }
    AQ.actual = null; actualizarSig();
  }
  function reproducirSiguiente() {
    if (!AQ.cola.length) { AQ.actual = null; actualizarSig(); return; }
    const it = AQ.cola.shift();
    const g = AQ.gen;
    const a = new Audio('audio/' + it.id + '.mp3');
    AQ.actual = a;
    let hecho = false;
    const fin = () => {
      if (hecho || g !== AQ.gen) return; hecho = true;
      AQ.actual = null;
      if (it.cb) it.cb();
      if (g === AQ.gen) reproducirSiguiente();
    };
    a.onended = fin; a.onerror = fin;
    const pr = a.play(); if (pr && pr.catch) pr.catch(fin);
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
  const bip = () => tono([988], 0.09);

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
    actualizarSig();
    return m;
  }
  function render() {
    const p = D.pantallas[E.idx];
    const m = base(p);
    const R = { narracion: rNarracion, hotspot: rHotspot, trivia: rTrivia, vf: rVF, asociar: rAsociar, clasificar: rClasificar, ordenar: rOrdenar, sopa: rSopa, video: rVideo, oracion: rOracion }[p.tipo];
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

  // ======================= ARMAR ORACIÓN (palabra por palabra) =======================
  function rOracion(p, m) {
    if (p.img) m.appendChild(fig(p.img, 'fig figS'));
    const cont = el('div', 'oraCont'); m.appendChild(cont);
    let oi = 0;
    function mostrar() {
      const pal = p.oraciones[oi].t.split(/\s+/);
      cont.innerHTML = '';
      cont.appendChild(el('div', 'contador', 'Oración ' + (oi + 1) + ' de ' + p.oraciones.length));
      const linea = el('div', 'oraLinea titila'); cont.appendChild(linea);
      const banco = el('div', 'oraBanco'); cont.appendChild(banco);
      let k = 0, evaluado = false;
      barajar(pal.map((w, i) => ({ w, i }))).forEach(x => {
        const b = el('button', 'pal', x.w);
        b.onclick = () => {
          if (b.classList.contains('usada') || k >= pal.length) return;
          if (x.w === pal[k]) {
            if (!evaluado) acierto();
            evaluado = false; k++;
            b.classList.add('usada'); linea.appendChild(el('span', 'palOk', x.w));
            if (k < pal.length) { bip(); return; }
            chime(); linea.classList.add('lista');
            hablar([aid(p, 'or' + oi)], { interrumpir: true, bloquear: true, cb: () => {
              oi++;
              if (oi < p.oraciones.length) mostrar();
              else hablar([aid(p, 'fin')], { bloquear: true, cb: setCompleto });
            } });
          } else {
            if (!evaluado) { evaluado = true; error(); }
            b.classList.add('sacude'); setTimeout(() => b.classList.remove('sacude'), 450); buzz();
          }
        };
        banco.appendChild(b);
      });
    }
    mostrar();
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
    const caja = el('div', 'vidbox'), wrap = el('div', 'vidwrap' + (p.vertical ? ' vert' : '')), fr = document.createElement('iframe');
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
      const ra = p.vertical ? 9 / 16 : 16 / 9;
      if (w / h > ra) { wrap.style.height = h + 'px'; wrap.style.width = Math.floor(h * ra) + 'px'; }
      else { wrap.style.width = w + 'px'; wrap.style.height = Math.floor(w / ra) + 'px'; }
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
  const LLUVIA = (x0, x1, y0, y1, n) => { let s = ''; for (let i = 0; i < n; i++) { const x = x0 + ((i * 37) % (x1 - x0)), y = y0 + ((i * 53) % (y1 - y0)); s += `<line x1="${x}" y1="${y}" x2="${x - 4}" y2="${y + 10}"/>`; } return `<g stroke="#90caf9" stroke-width="1.6" stroke-linecap="round" opacity=".8">${s}</g>`; };
  const NENE = (x, y, c) => `<g><circle cx="${x}" cy="${y}" r="5" fill="#ffcc80"/><rect x="${x - 5}" y="${y + 5}" width="10" height="13" rx="4" fill="${c}"/></g>`;
  const ESCENAS = {
    // ---------- Sismo vs. anegamiento ----------
    comparar: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="260" fill="#f4f9ff"/>
      <line x1="200" y1="6" x2="200" y2="180" stroke="#bbdefb" stroke-width="3" stroke-dasharray="6 6"/>
      <rect x="40" y="6" width="120" height="24" rx="10" fill="#6d4c41"/><text x="100" y="23" font-size="14" fill="#fff">SISMO</text>
      <rect x="240" y="6" width="120" height="24" rx="10" fill="#1565c0"/><text x="300" y="23" font-size="14" fill="#fff">ANEGAMIENTO</text>
      <g id="cs_sismo" class="capa">
        <rect x="22" y="70" width="80" height="78" fill="#ffe0b2" stroke="#8d6e63" stroke-width="2.5"/>
        <polygon points="16,72 62,44 108,72" fill="#a1887f"/>
        <rect x="52" y="116" width="20" height="32" fill="#8d6e63"/>
        <path d="M12,96 l-6,6 6,6 M112,96 l6,6 -6,6" stroke="#e65100" stroke-width="2.5" fill="none"/>
        <path d="M76,140 C110,140 130,150 150,150" stroke="#2e7d32" stroke-width="3" fill="none" stroke-dasharray="5 4"/>
        <polygon points="156,150 146,144 146,156" fill="#2e7d32"/>
        <line x1="170" y1="118" x2="170" y2="158" stroke="#2e7d32" stroke-width="3"/><polygon points="170,118 190,124 170,131" fill="#43a047"/>
        ${NENE(160, 140, '#e53935')}${NENE(181, 140, '#1e88e5')}
        <text x="100" y="176" font-size="12" fill="#2e7d32">Salimos al punto de encuentro</text></g>
      <g id="cs_agua" class="capa">
        ${LLUVIA(214, 396, 34, 120, 26)}
        <rect x="228" y="118" width="98" height="18" fill="#a1887f"/>
        <rect x="234" y="76" width="86" height="42" fill="#e3f2fd" stroke="#1565c0" stroke-width="2.5"/>
        <polygon points="226,78 277,54 328,78" fill="#5c6bc0"/>
        <rect x="206" y="132" width="194" height="22" fill="#42a5f5" opacity=".75"/>
        <path d="M206,134 q8,-5 16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0 t16,0" stroke="#1e88e5" stroke-width="2" fill="none"/>
        <path d="M344,124 l20,20 M364,124 l-20,20" stroke="#e53935" stroke-width="4" stroke-linecap="round"/>
        <text x="354" y="170" font-size="10.5" fill="#c62828">Salir a la calle,</text>
        <text x="354" y="182" font-size="10.5" fill="#c62828">más peligroso</text></g>
      <g id="cs_arriba" class="capa">
        <path d="M250,130 V104" stroke="#2e7d32" stroke-width="4" fill="none"/><polygon points="250,96 242,108 258,108" fill="#2e7d32"/>
        ${NENE(272, 96, '#e53935')}${NENE(290, 96, '#1e88e5')}${NENE(306, 96, '#8e24aa')}
        <rect x="206" y="160" width="100" height="20" rx="8" fill="#2e7d32"/><text x="256" y="174" font-size="10" fill="#fff">¡A la zona alta!</text></g>
      <g id="cs_k1" class="capa"><rect x="12" y="194" width="120" height="44" rx="12" fill="#fff8e1" stroke="#ffb300" stroke-width="3"/>
        <text x="72" y="214" font-size="13" fill="#e65100">1. Prevención</text><text x="72" y="230" font-size="10" fill="#6d4c41">revisar antes</text></g>
      <g id="cs_k2" class="capa"><rect x="140" y="194" width="120" height="44" rx="12" fill="#fff8e1" stroke="#ffb300" stroke-width="3"/>
        <text x="200" y="214" font-size="12" fill="#e65100">2. Corte de servicios</text><text x="200" y="230" font-size="10" fill="#6d4c41">cortar la energía</text></g>
      <g id="cs_k3" class="capa"><rect x="268" y="194" width="120" height="44" rx="12" fill="#fff8e1" stroke="#ffb300" stroke-width="3"/>
        <text x="328" y="214" font-size="12.5" fill="#e65100">3. Resguardo</text><text x="328" y="230" font-size="10" fill="#6d4c41">en sectores elevados</text></g>
    </svg>`,

    // ---------- Escuela: revisión preventiva (hotspot) ----------
    escuela: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="260" fill="#e8f1f8"/>
      ${LLUVIA(4, 396, 2, 70, 34)}
      <rect x="0" y="215" width="400" height="45" fill="#bcaaa4"/>
      <rect x="0" y="206" width="66" height="9" fill="#9e9e9e"/>
      <rect x="8" y="222" width="56" height="26" rx="3" fill="#6d4c41"/><rect x="11" y="230" width="50" height="16" fill="#64b5f6"/>
      <path d="M12,232 q6,-3 12,0 t12,0 t12,0 t12,0" stroke="#e3f2fd" stroke-width="1.5" fill="none"/>
      <text x="36" y="257" font-size="8.5" fill="#3e2723">acequia</text>
      <rect x="136" y="224" width="150" height="26" rx="8" fill="#a1887f"/><ellipse cx="211" cy="237" rx="56" ry="7" fill="#90caf9" opacity=".9"/>
      <text x="211" y="257" font-size="8.5" fill="#3e2723">patio (sector bajo)</text>
      <rect x="70" y="201" width="262" height="14" fill="#a1887f"/>
      <rect x="196" y="207" width="30" height="4" fill="#8d6e63"/><rect x="200" y="211" width="22" height="4" fill="#8d6e63"/>
      <rect x="70" y="112" width="262" height="89" fill="#fff8e1" stroke="#8d6e63" stroke-width="2.5"/>
      <line x1="158" y1="112" x2="158" y2="201" stroke="#8d6e63" stroke-width="2.5"/><line x1="262" y1="112" x2="262" y2="201" stroke="#8d6e63" stroke-width="2.5"/>
      <polygon points="60,113 201,84 342,113" fill="#a1887f"/>
      <rect x="332" y="109" width="24" height="7" rx="2" fill="#78909c"/><rect x="348" y="115" width="6" height="100" fill="#90a4ae"/>
      <circle cx="338" cy="107" r="3" fill="#7cb342"/><path d="M334,108 q4,-6 8,-2" stroke="#8d6e63" stroke-width="2" fill="none"/>
      <rect x="352" y="213" width="30" height="6" fill="#37474f"/><path d="M356,213 v6 M362,213 v6 M368,213 v6 M374,213 v6" stroke="#90a4ae" stroke-width="1.5"/>
      <text x="114" y="124" font-size="8" fill="#8d6e63">aula</text>
      <rect x="80" y="134" width="20" height="24" rx="2" fill="#eceff1" stroke="#37474f" stroke-width="2"/><path d="M91,138 l-4,8 h5 l-4,8" stroke="#fbc02d" stroke-width="2" fill="none"/>
      <rect x="112" y="130" width="36" height="24" fill="#bbdefb" stroke="#8d6e63" stroke-width="2"/>
      <rect x="104" y="195" width="30" height="6" rx="2" fill="#fafafa" stroke="#616161" stroke-width="1.5"/><path d="M134,198 q10,0 12,-8" stroke="#424242" stroke-width="1.5" fill="none"/>
      <rect x="166" y="174" width="88" height="27" fill="#bcaaa4" stroke="#8d6e63" stroke-width="2"/><rect x="160" y="188" width="8" height="6" fill="#a1887f"/><rect x="160" y="194" width="14" height="7" fill="#a1887f"/>
      <rect x="168" y="118" width="84" height="14" rx="5" fill="#2e7d32"/><text x="210" y="128.5" font-size="8" fill="#fff">zona alta y segura</text>
      ${NENE(182, 152, '#e53935')}${NENE(200, 152, '#1e88e5')}${NENE(218, 152, '#8e24aa')}${NENE(236, 152, '#43a047')}
      <rect x="236" y="134" width="20" height="15" rx="3" fill="#fff" stroke="#c62828" stroke-width="2"/><path d="M246,137 v9 M241.5,141.5 h9" stroke="#c62828" stroke-width="3"/>
      <text x="297" y="124" font-size="8" fill="#8d6e63">dirección</text>
      <rect x="270" y="170" width="54" height="5" fill="#8d6e63"/><rect x="274" y="175" width="4" height="26" fill="#8d6e63"/><rect x="316" y="175" width="4" height="26" fill="#8d6e63"/>
      <rect x="280" y="148" width="18" height="22" rx="2" fill="#37474f"/><rect x="302" y="156" width="16" height="14" fill="#1565c0"/><rect x="302" y="150" width="16" height="6" fill="#c62828"/>
    </svg>`,

    // ---------- Evacuación vertical (narración animada) ----------
    vertical: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="260" fill="#e8f1f8"/>
      ${LLUVIA(4, 396, 2, 70, 34)}
      <rect x="0" y="215" width="400" height="45" fill="#bcaaa4"/>
      <rect x="0" y="206" width="56" height="9" fill="#9e9e9e"/>
      <rect x="70" y="201" width="262" height="14" fill="#a1887f"/>
      <rect x="70" y="112" width="262" height="89" fill="#fff8e1" stroke="#8d6e63" stroke-width="2.5"/>
      <line x1="158" y1="112" x2="158" y2="178" stroke="#8d6e63" stroke-width="2.5"/>
      <polygon points="60,113 201,84 342,113" fill="#a1887f"/>
      <text x="114" y="124" font-size="8.5" fill="#8d6e63">aula</text>
      <text x="270" y="124" font-size="8.5" fill="#8d6e63">SUM / sector más alto</text>
      <rect x="212" y="170" width="116" height="31" fill="#bcaaa4" stroke="#8d6e63" stroke-width="2"/><rect x="204" y="186" width="8" height="15" fill="#a1887f"/><rect x="196" y="194" width="8" height="7" fill="#a1887f"/>
      <rect x="140" y="224" width="150" height="26" rx="8" fill="#a1887f"/><ellipse cx="215" cy="237" rx="58" ry="8" fill="#64b5f6" opacity=".9"/>
      <text x="215" y="257" font-size="8.5" fill="#3e2723">patio (sector bajo)</text>
      <g id="v_aula" class="capa">${NENE(84, 180, '#e53935')}${NENE(102, 180, '#1e88e5')}${NENE(120, 180, '#8e24aa')}${NENE(138, 180, '#43a047')}</g>
      <g id="v_botiquin" class="capa"><circle cx="152" cy="167" r="6" fill="#ffcc80"/><rect x="146" y="173" width="12" height="18" rx="4" fill="#5d4037"/>
        <rect x="154" y="178" width="14" height="11" rx="2" fill="#fff" stroke="#c62828" stroke-width="1.6"/><path d="M161,180 v7 M157.5,183.5 h7" stroke="#c62828" stroke-width="2"/></g>
      <g id="v_camino" class="capa"><path d="M150,196 C180,196 196,188 214,166" stroke="#2e7d32" stroke-width="4" fill="none" stroke-dasharray="6 5"/><polygon points="219,159 207,163 216,171" fill="#2e7d32"/>
        <path d="M206,214 l22,10 M228,214 l-22,10" stroke="#e53935" stroke-width="4" stroke-linecap="round"/>
        <rect x="290" y="226" width="74" height="16" rx="6" fill="#c62828"/><text x="327" y="237.5" font-size="8.5" fill="#fff">lejos del patio</text></g>
      <g id="v_resguardo" class="capa"><rect x="214" y="132" width="112" height="38" fill="#c8e6c9" opacity=".7"/>
        <rect x="216" y="102" width="108" height="16" rx="6" fill="#2e7d32"/><text x="270" y="113.5" font-size="9.5" fill="#fff">zona alta y segura</text>
        ${NENE(226, 150, '#e53935')}${NENE(244, 150, '#1e88e5')}${NENE(262, 150, '#8e24aa')}${NENE(280, 150, '#43a047')}${NENE(298, 150, '#fb8c00')}
        <circle cx="316" cy="146" r="6" fill="#ffcc80"/><rect x="310" y="152" width="12" height="18" rx="4" fill="#5d4037"/></g>
      <g id="v_planta" class="capa"><rect x="282" y="6" width="112" height="62" rx="10" fill="#fff" stroke="#1565c0" stroke-width="2.5"/>
        <text x="338" y="20" font-size="8.5" fill="#0d47a1">Si tu escuela tiene</text><text x="338" y="30" font-size="8.5" fill="#0d47a1">planta alta:</text>
        <path d="M292,60 h8 v-6 h8 v-6 h8 v-6 h8" stroke="#2e7d32" stroke-width="3" fill="none"/><text x="309" y="40" font-size="7.5" fill="#2e7d32">escalera</text>
        <rect x="350" y="38" width="20" height="24" fill="#cfd8dc" stroke="#78909c" stroke-width="1.5"/><path d="M348,36 l24,28 M372,36 l-24,28" stroke="#e53935" stroke-width="3"/>
        <text x="382" y="56" font-size="7" fill="#c62828" text-anchor="start"></text></g>
      <g id="v_calle" class="capa"><rect x="0" y="196" width="56" height="20" fill="#42a5f5" opacity=".85"/>
        <path d="M2,202 q6,-4 12,0 t12,0 t12,0 t12,0 M2,209 q6,-4 12,0 t12,0 t12,0 t12,0" stroke="#e3f2fd" stroke-width="1.8" fill="none"/>
        <rect x="2" y="170" width="56" height="20" rx="6" fill="#c62828"/><text x="30" y="179" font-size="7.5" fill="#fff">correntada:</text><text x="30" y="187.5" font-size="7.5" fill="#fff">no salimos</text></g>
      <g id="v_espera" class="capa"><rect x="40" y="4" width="220" height="22" rx="9" fill="#1565c0"/>
        <text x="150" y="19" font-size="10.5" fill="#fff">Esperamos: Defensa Civil · 911</text></g>
    </svg>`,

    // ---------- Revisión técnica posterior (hotspot) ----------
    revision: `<svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="260" fill="#eef3f7"/>
      <circle cx="372" cy="24" r="16" fill="#ffe082"/>
      <rect x="0" y="215" width="400" height="45" fill="#bcaaa4"/>
      <rect x="0" y="206" width="66" height="9" fill="#9e9e9e"/>
      <rect x="8" y="222" width="56" height="26" rx="3" fill="#6d4c41"/><rect x="11" y="224" width="50" height="22" fill="#6d8fa8"/>
      <path d="M6,222 q-4,6 -6,16 M62,221 q8,5 16,1 q8,-4 14,3" stroke="#6d8fa8" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="70" y="201" width="250" height="14" fill="#a1887f"/>
      <rect x="70" y="112" width="250" height="89" fill="#fff8e1" stroke="#8d6e63" stroke-width="2.5"/>
      <polygon points="60,113 195,84 330,113" fill="#a1887f"/>
      <polygon points="262,96 284,98 278,108 266,108" fill="#5d4037"/><path d="M264,96 l6,-8 M278,97 l8,-6" stroke="#5d4037" stroke-width="2"/>
      <rect x="318" y="110" width="26" height="6" rx="2" fill="#78909c" transform="rotate(32 324 113)"/>
      <rect x="82" y="134" width="20" height="26" rx="2" fill="#eceff1" stroke="#37474f" stroke-width="2"/>
      <path d="M88,164 q-2,4 0,6 q2,-2 0,-6 M96,166 q-2,4 0,6 q2,-2 0,-6" fill="#42a5f5"/>
      <rect x="140" y="128" width="32" height="28" fill="#bbdefb" stroke="#8d6e63" stroke-width="2"/>
      <path d="M144,130 l10,12 -6,6 10,6 M164,130 l-4,10 8,6" stroke="#455a64" stroke-width="1.5" fill="none"/>
      <path d="M200,114 q4,22 -6,40 q-6,10 4,18" stroke="#212121" stroke-width="2" fill="none"/><path d="M196,170 l-4,4 M200,172 l4,4" stroke="#fbc02d" stroke-width="2"/>
      <ellipse cx="250" cy="198" rx="50" ry="5" fill="#8d6e63" opacity=".85"/>
      <rect x="326" y="160" width="66" height="55" fill="#efebe9" stroke="#8d6e63" stroke-width="2"/><polygon points="322,161 359,146 396,161" fill="#a1887f"/>
      <rect x="346" y="176" width="24" height="39" fill="#8d6e63"/><rect x="328" y="200" width="62" height="14" fill="#64b5f6" opacity=".85"/>
      <text x="359" y="172" font-size="8" fill="#5d4037">depósito</text>
      <rect x="136" y="224" width="150" height="26" rx="8" fill="#a1887f"/><ellipse cx="211" cy="237" rx="56" ry="7" fill="#8d6e63" opacity=".9"/>
      <text x="211" y="257" font-size="8.5" fill="#3e2723">patio con barro</text>
    </svg>`,

    // ---------- El agua de inundación (narración animada) ----------
    agua: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="260" fill="#f3f6f4"/>
      <rect x="0" y="150" width="400" height="110" fill="#d7ccc8"/>
      <g id="a_charco" class="capa"><ellipse cx="200" cy="198" rx="190" ry="54" fill="#8d9f87"/><ellipse cx="200" cy="198" rx="168" ry="42" fill="#7a8f74"/>
        <path d="M60,196 q10,-5 20,0 t20,0 t20,0 M260,206 q10,-5 20,0 t20,0 t20,0" stroke="#a5b59f" stroke-width="2" fill="none"/>
        <rect x="112" y="104" width="176" height="20" rx="8" fill="#5d4037"/><text x="200" y="118" font-size="10.5" fill="#fff">potencialmente contaminada</text></g>
      <g id="a_servidas" class="capa"><rect x="58" y="176" width="30" height="12" rx="3" fill="#78909c"/><rect x="50" y="172" width="10" height="20" rx="2" fill="#607d8b"/>
        <path d="M88,182 q8,2 10,10" stroke="#6d6a3f" stroke-width="4" fill="none"/><text x="74" y="166" font-size="10" fill="#3e2723">aguas servidas</text></g>
      <g id="a_quimicos" class="capa"><rect x="150" y="186" width="16" height="22" rx="3" fill="#ab47bc"/><rect x="154" y="180" width="8" height="7" fill="#6a1b9a"/>
        <path d="M152,200 h12" stroke="#fff" stroke-width="2"/><text x="160" y="176" font-size="10" fill="#4a148c">químicos</text></g>
      <g id="a_residuos" class="capa"><path d="M236,206 q-6,-18 12,-20 q18,2 12,20 z" fill="#37474f"/><path d="M244,186 l4,-6 4,6" stroke="#37474f" stroke-width="2" fill="none"/>
        <rect x="262" y="196" width="14" height="10" rx="2" fill="#ef6c00"/><text x="252" y="174" font-size="10" fill="#263238">residuos</text></g>
      <g id="a_cortantes" class="capa"><polygon points="322,190 334,170 338,192" fill="#b3e5fc" stroke="#0277bd" stroke-width="1.5"/><polygon points="340,194 350,178 354,196" fill="#b3e5fc" stroke="#0277bd" stroke-width="1.5"/>
        <path d="M358,188 l14,-4" stroke="#757575" stroke-width="3"/><text x="342" y="164" font-size="10" fill="#01579b">elementos cortantes</text></g>
      <g id="a_prohibido" class="capa"><rect x="70" y="8" width="210" height="46" rx="12" fill="#fff" stroke="#c62828" stroke-width="3"/>
        <circle cx="98" cy="31" r="16" fill="none" stroke="#c62828" stroke-width="4"/>${NENE(98, 23, '#1e88e5')}<line x1="87" y1="20" x2="109" y2="42" stroke="#c62828" stroke-width="4"/>
        <text x="190" y="27" font-size="11" fill="#c62828">No tocar, no caminar</text><text x="190" y="43" font-size="11" fill="#c62828">ni jugar en el agua</text></g>
      <g id="a_comida" class="capa"><rect x="292" y="8" width="102" height="72" rx="12" fill="#fff" stroke="#ef6c00" stroke-width="3"/>
        <circle cx="314" cy="36" r="10" fill="#e53935"/><path d="M314,26 q2,-6 6,-6" stroke="#558b2f" stroke-width="2" fill="none"/>
        <path d="M328,36 h20" stroke="#ef6c00" stroke-width="3"/><polygon points="354,36 346,31 346,41" fill="#ef6c00"/>
        <rect x="358" y="26" width="22" height="24" rx="3" fill="#546e7a"/><rect x="355" y="22" width="28" height="5" rx="2" fill="#37474f"/>
        <text x="343" y="70" font-size="10.5" fill="#e65100">se desecha</text></g>
    </svg>`
  };

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
    if (D.meta.fuente) m.appendChild(el('p', 'fuente', '📚 ' + D.meta.fuente));
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
    try { if (window.QSTEnvio) m.appendChild(QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.grado, aciertos: E.aciertos, errores: E.errores, puntos: E.puntos })); } catch (e) {} // 📤 botón común de envío (recursos/enviar-tarea.js)
    E.intento = (E.intento || 0) + 1;
    E.completo = true; hablar(['g_cierre']);
  }

  // ---------- Enviar resultados (tarjeta PNG para compartir) ----------
  function abrirEnvio(pct) {
    const ov = el('div', 'envOv');
    ov.innerHTML = '<div class="envCaja"><b>📤 Enviar mis resultados</b>' +
      '<input id="envNom" placeholder="Tu nombre y apellido" maxlength="40">' +
      '<input id="envGr" placeholder="Grado y división (ej.: 7° A)" maxlength="20">' +
      '<div class="envBtns"><button class="envNo">Cancelar</button><button class="envSi">Enviar</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('.envNo').onclick = () => ov.remove();
    ov.querySelector('.envSi').onclick = () => {
      const nom = ov.querySelector('#envNom').value.trim(), gr = ov.querySelector('#envGr').value.trim();
      if (!nom) { ov.querySelector('#envNom').focus(); return; }
      ov.remove(); compartir(nom, gr, pct);
    };
  }
  function compartir(nom, gr, pct) {
    const c = document.createElement('canvas'); c.width = 720; c.height = 900;
    const g = c.getContext('2d'); if (!g) return;
    g.fillStyle = '#fff8f0'; g.fillRect(0, 0, 720, 900);
    g.fillStyle = '#bf360c'; g.fillRect(0, 0, 720, 150);
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.font = 'bold 40px sans-serif'; g.fillText(D.meta.titulo, 360, 70);
    g.font = 'bold 24px sans-serif'; g.fillText(D.meta.etiqueta, 360, 115);
    g.fillStyle = '#263238'; g.font = 'bold 36px sans-serif'; g.fillText(nom, 360, 220);
    g.font = '28px sans-serif'; g.fillText(gr || '', 360, 265);
    const filas = [['✅ Aciertos', E.aciertos], ['❌ Errores', E.errores], ['📊 Total', pct + '%'], ['⭐ Puntos', E.puntos], ['🔁 Intento', E.intento || 1]];
    filas.forEach((f, i) => {
      const y = 330 + i * 92; g.fillStyle = '#fff'; g.fillRect(110, y - 50, 500, 76);
      g.fillStyle = '#455a64'; g.textAlign = 'left'; g.font = 'bold 32px sans-serif'; g.fillText(f[0], 140, y);
      g.fillStyle = '#bf360c'; g.textAlign = 'right'; g.fillText(String(f[1]), 580, y);
    });
    g.textAlign = 'center'; g.fillStyle = '#607d8b'; g.font = '22px sans-serif';
    g.fillText(new Date().toLocaleString('es-AR'), 360, 820); g.fillText('QueSepanTodos.com · Profe Gustavo Aguilar', 360, 860);
    const txt = '📚 ' + D.meta.titulo + '\n👤 ' + nom + (gr ? ' · ' + gr : '') + '\n✅ ' + E.aciertos + ' · ❌ ' + E.errores + ' · 📊 ' + pct + '% · ⭐ ' + E.puntos;
    const url = c.toDataURL('image/png');
    let f = null;
    try { const bin = atob(url.split(',')[1]), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); f = new File([u], 'resultados.png', { type: 'image/png' }); } catch (e) {}
    // 1) Compartir directo (funciona con el paquete publicado en https)
    if (f && window.isSecureContext && navigator.canShare && navigator.canShare({ files: [f] })) {
      navigator.share({ files: [f], text: txt }).catch(e => { if (!e || e.name !== 'AbortError') verTarjeta(url, txt); });
      return;
    }
    // 2) Si el navegador no deja compartir (archivo abierto sin publicar, navegador viejo): se muestra la tarjeta
    verTarjeta(url, txt);
  }
  function verTarjeta(url, txt) {
    const ov = el('div', 'envOv');
    ov.innerHTML = '<div class="envCaja envTarj"><b>📸 Tus resultados</b>' +
      '<img alt="Tarjeta de resultados" src="' + url + '">' +
      '<small>Mantené apretada la imagen para guardarla o compartirla, o sacale una captura de pantalla y mandásela a la seño.</small>' +
      '<div class="envBtns"><a class="envSi" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(txt) + '">💬 WhatsApp</a>' +
      '<a class="envNo" download="resultados.png" href="' + url + '">⬇️ Guardar</a></div>' +
      '<button class="envNo envCerrar">Cerrar</button></div>';
    document.body.appendChild(ov);
    ov.querySelector('.envCerrar').onclick = () => ov.remove();
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
    portada();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
