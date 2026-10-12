// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: narracion, hotspot (img/svg), trivia (img/red svg), vf, video YT,
//  asociar, clasificar (uno a uno), ordenar, sopa de letras, oracion (armar palabra por palabra).
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
  // ======================= ESCENAS SVG =======================
  const ESCENAS = {
    triangulo: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="260" fill="#fff8f0"/>
      <polygon points="200,58 82,206 318,206" fill="none" stroke="#ffccbc" stroke-width="6" stroke-dasharray="10 8" stroke-linejoin="round"/>
      <g id="t_comb" class="capa">
        <line x1="82" y1="206" x2="200" y2="58" stroke="#8d6e63" stroke-width="6" stroke-linecap="round"/>
        <rect x="14" y="196" width="118" height="58" rx="12" fill="#ede7f6" stroke="#6a1b9a" stroke-width="3"/>
        <g transform="translate(40,206)"><rect x="0" y="6" width="44" height="11" rx="5" fill="#8d6e63" transform="rotate(-14 22 11)"/><rect x="2" y="8" width="44" height="11" rx="5" fill="#6d4c41" transform="rotate(14 24 13)"/></g>
        <text x="73" y="246" font-size="15" fill="#4a148c">Combustible</text></g>
      <g id="t_oxi" class="capa">
        <line x1="82" y1="206" x2="318" y2="206" stroke="#42a5f5" stroke-width="6" stroke-linecap="round"/>
        <rect x="268" y="196" width="118" height="58" rx="12" fill="#e3f2fd" stroke="#1565c0" stroke-width="3"/>
        <circle cx="300" cy="218" r="14" fill="#90caf9"/><circle cx="314" cy="212" r="11" fill="#90caf9"/>
        <text x="306" y="223" font-size="13" fill="#0d47a1">O₂</text>
        <text x="346" y="224" font-size="12" fill="#0d47a1">del aire</text>
        <text x="327" y="246" font-size="15" fill="#0d47a1">Oxígeno</text></g>
      <g id="t_calor" class="capa">
        <line x1="318" y1="206" x2="200" y2="58" stroke="#e53935" stroke-width="6" stroke-linecap="round"/>
        <rect x="140" y="4" width="120" height="54" rx="12" fill="#ffebee" stroke="#c62828" stroke-width="3"/>
        <polygon points="166,16 170,26 180,26 172,32 175,42 166,36 157,42 160,32 152,26 162,26" fill="#ffb300"/>
        <text x="216" y="30" font-size="16" fill="#b71c1c">Calor</text>
        <text x="216" y="48" font-size="10" fill="#b71c1c">chispa · llama</text></g>
      <g id="t_fuego" class="capa">
        <path d="M200,186 C168,186 158,160 172,136 C178,150 186,152 186,140 C186,124 196,112 200,96 C208,116 230,128 228,156 C226,176 214,186 200,186Z" fill="#ff7043"/>
        <path d="M200,186 C184,186 180,170 188,156 C192,164 198,164 198,154 C204,162 216,168 212,178 C210,184 206,186 200,186Z" fill="#ffd54f"/>
        <text x="200" y="196" font-size="12" fill="#bf360c">¡combustión!</text></g>
      <g id="t_falta" class="capa">
        <rect x="104" y="72" width="192" height="24" rx="10" fill="#263238" opacity=".85"/>
        <text x="200" y="89" font-size="12.5" fill="#fff">Si falta uno… ¡se apaga!</text></g>
    </svg>`,

    corrosion: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <defs><linearGradient id="gMet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd8dc"/><stop offset=".45" stop-color="#eceff1"/><stop offset="1" stop-color="#90a4ae"/></linearGradient></defs>
      <rect width="400" height="260" fill="#e8f4fd"/>
      <g id="c_metal" class="capa">
        <rect x="60" y="168" width="280" height="50" rx="8" fill="url(#gMet)" stroke="#607d8b" stroke-width="2"/>
        <path d="M80,178 h120" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/>
        <text x="200" y="200" font-size="15" fill="#37474f">Metal (hierro)</text></g>
      <g id="c_agua" class="capa">
        <path d="M104,40 C96,54 90,62 90,70 a14,14 0 0 0 28,0 C118,62 112,54 104,40Z" fill="#29b6f6"/>
        <path d="M134,70 C130,78 127,82 127,86 a7,7 0 0 0 14,0 C141,82 138,78 134,70Z" fill="#4fc3f7"/>
        <text x="104" y="112" font-size="13" fill="#01579b">Humedad (agua)</text>
        <path d="M112,120 L150,160" stroke="#0288d1" stroke-width="3"/><polygon points="156,166 144,160 152,152" fill="#0288d1"/></g>
      <g id="c_oxi" class="capa">
        <circle cx="286" cy="62" r="22" fill="#90caf9"/><circle cx="310" cy="54" r="18" fill="#90caf9"/><circle cx="300" cy="76" r="16" fill="#90caf9"/>
        <text x="298" y="70" font-size="17" fill="#0d47a1">O₂</text>
        <text x="298" y="112" font-size="13" fill="#0d47a1">Oxígeno del aire</text>
        <path d="M288,120 L250,160" stroke="#1565c0" stroke-width="3"/><polygon points="244,166 246,152 256,160" fill="#1565c0"/></g>
      <g id="c_oxido" class="capa">
        <ellipse cx="120" cy="176" rx="34" ry="9" fill="#bf5b1f" opacity=".85"/>
        <ellipse cx="205" cy="172" rx="26" ry="7" fill="#a0461a" opacity=".85"/>
        <ellipse cx="285" cy="178" rx="38" ry="10" fill="#c1661f" opacity=".85"/>
        <ellipse cx="165" cy="212" rx="40" ry="6" fill="#8d3b12" opacity=".8"/>
        <ellipse cx="300" cy="210" rx="26" ry="6" fill="#a0461a" opacity=".8"/>
        <rect x="128" y="128" width="144" height="26" rx="10" fill="#fff3e0" stroke="#bf5b1f" stroke-width="2"/>
        <text x="200" y="146" font-size="13" fill="#8d3b12">óxido (herrumbre)</text></g>
      <g id="c_lento" class="capa">
        <path d="M232,170 l8,14 -6,10 9,12 -4,12" stroke="#4e342e" stroke-width="2.5" fill="none"/>
        <text x="200" y="244" font-size="14" fill="#4e342e">⏳ lento, pero continuo: el metal se debilita</text></g>
    </svg>`,

    esquemas: `<svg viewBox="0 0 400 230" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="230" fill="#fffaf3"/>
      <line x1="200" y1="10" x2="200" y2="222" stroke="#ffe0b2" stroke-width="2"/>
      <rect x="44" y="6" width="112" height="24" rx="8" fill="#1a237e"/><text x="100" y="23" font-size="13" fill="#fff">CORROSIÓN</text>
      <rect x="8" y="42" width="86" height="28" rx="8" fill="#fff" stroke="#1a237e" stroke-width="2.5"/>
      <rect x="106" y="42" width="86" height="28" rx="8" fill="#fff" stroke="#1a237e" stroke-width="2.5"/>
      <path d="M51,70 L80,104 M149,70 L120,104" stroke="#1565c0" stroke-width="2.5"/>
      <polygon points="80,110 74,100 84,100" fill="#1565c0"/><polygon points="120,110 116,100 126,100" fill="#1565c0"/>
      <rect x="22" y="112" width="156" height="34" rx="6" fill="#bf5b1f"/>
      <ellipse cx="60" cy="122" rx="18" ry="5" fill="#8d3b12"/><ellipse cx="140" cy="136" rx="22" ry="5" fill="#8d3b12"/>
      <text x="100" y="134" font-size="12" fill="#fff">Metal oxidado</text>
      <path d="M100,146 V172" stroke="#1565c0" stroke-width="2.5"/><polygon points="100,178 95,168 105,168" fill="#1565c0"/>
      <rect x="40" y="180" width="120" height="28" rx="8" fill="#fff3e0" stroke="#bf5b1f" stroke-width="2"/><text x="100" y="199" font-size="12.5" fill="#8d3b12">herrumbre</text>
      <rect x="246" y="6" width="112" height="24" rx="8" fill="#c62828"/><text x="302" y="23" font-size="13" fill="#fff">COMBUSTIÓN</text>
      <rect x="208" y="42" width="92" height="28" rx="8" fill="#fff" stroke="#c62828" stroke-width="2.5"/>
      <rect x="306" y="42" width="88" height="28" rx="8" fill="#fff" stroke="#c62828" stroke-width="2.5"/>
      <path d="M254,70 L282,98 M350,70 L318,98" stroke="#e53935" stroke-width="2.5"/>
      <path d="M296,152 C278,152 272,138 280,124 C284,132 288,132 288,124 C288,114 294,108 296,98 C302,110 314,118 312,134 C310,146 304,152 296,152Z" fill="#ff7043"/>
      <path d="M296,152 C287,152 285,144 289,136 C292,141 295,140 295,134 C299,139 305,143 303,148 C302,151 299,152 296,152Z" fill="#ffd54f"/>
      <rect x="276" y="152" width="40" height="7" rx="3" fill="#6d4c41"/>
      <text x="236" y="120" font-size="10" fill="#1565c0">+ oxígeno</text><text x="236" y="132" font-size="10" fill="#1565c0">del aire</text>
      <path d="M318,128 H332" stroke="#e53935" stroke-width="2.5"/><polygon points="314,128 322,123 322,133" fill="#e53935"/><polygon points="338,128 330,123 330,133" fill="#e53935"/>
      <rect x="338" y="114" width="58" height="28" rx="8" fill="#fff" stroke="#c62828" stroke-width="2.5"/>
      <path d="M296,160 V172" stroke="#e53935" stroke-width="2.5"/><polygon points="296,178 291,168 301,168" fill="#e53935"/>
      <rect x="246" y="180" width="100" height="28" rx="8" fill="#fff" stroke="#c62828" stroke-width="2.5"/>
      <g fill="#c62828" font-size="20"><text id="x1q" class="blanco" x="51" y="63">?</text><text id="x2q" class="blanco" x="149" y="63">?</text>
        <text id="x3q" class="blanco" x="254" y="63">?</text><text id="x4q" class="blanco" x="350" y="63">?</text>
        <text id="x5q" class="blanco" x="367" y="135">?</text><text id="x6q" class="blanco" x="296" y="201">?</text></g>
      <g fill="#2e7d32" font-size="13"><text id="x1" class="capa" x="51" y="61">oxígeno</text><text id="x2" class="capa" x="149" y="61">humedad</text>
        <text id="x3" class="capa" x="254" y="61" font-size="12">combustible</text><text id="x4" class="capa" x="350" y="61">calor</text>
        <text id="x5" class="capa" x="367" y="133" font-size="11.5">energía</text><text id="x6" class="capa" x="296" y="199">productos</text></g>
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
    try { if (window.QSTEnvio) m.appendChild(QSTEnvio.boton({ titulo: D.meta.titulo, grado: "Cs. Naturales · 6.° grado", aciertos: E.aciertos, errores: E.errores, puntos: E.puntos })); } catch (e) {} // 📤 botón común de envío (recursos/enviar-tarea.js)
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
