// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: narracion, hotspot (img/svg), trivia (img/red svg), vf, video YT,
//  asociar, clasificar (uno a uno), ordenar, sopa de letras.
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
    const R = { narracion: rNarracion, hotspot: rHotspot, trivia: rTrivia, vf: rVF, asociar: rAsociar, clasificar: rClasificar, ordenar: rOrdenar, sopa: rSopa, video: rVideo }[p.tipo];
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
  const ESCENAS = {
    circuito: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif">
      <rect width="400" height="260" fill="#fdf6e3"/>
      <rect y="214" width="400" height="46" fill="#d7ccc8"/>
      <g><circle cx="322" cy="52" r="32" fill="#f2c9a0"/>
        <ellipse cx="324" cy="42" rx="22" ry="15" fill="#f8bbd0" stroke="#ec407a" stroke-width="2"/>
        <path d="M308,40 q6,-6 12,0 q6,6 12,0 M310,48 q7,-5 14,0 q5,4 10,0" stroke="#ec407a" stroke-width="1.5" fill="none"/>
        <rect x="296" y="86" width="52" height="122" rx="18" fill="#64b5f6"/>
        <line x1="324" y1="58" x2="324" y2="196" stroke="#f06292" stroke-width="6" stroke-linecap="round"/>
        <path d="M302,112 Q220,150 132,190" stroke="#f2c9a0" stroke-width="17" fill="none" stroke-linecap="round"/>
        <circle cx="124" cy="193" r="13" fill="#f2c9a0"/></g>
      <g><rect x="48" y="178" width="52" height="38" rx="7" fill="#e53935"/><path d="M48,186 q-16,10 0,22" stroke="#e53935" stroke-width="5" fill="none"/></g>
      <g id="estimulo" class="capa"><path d="M62,170 q-8,-12 0,-24 q8,-12 0,-24 M76,170 q-8,-12 0,-24 q8,-12 0,-24 M90,170 q-8,-12 0,-24 q8,-12 0,-24" stroke="#ff7043" stroke-width="3" fill="none"/>
        <text x="74" y="110" font-size="15" font-weight="900" fill="#d84315" text-anchor="middle">¡calor!</text></g>
      <g id="receptor" class="capa"><circle cx="124" cy="193" r="22" fill="none" stroke="#ffb300" stroke-width="4"/>
        <text x="124" y="236" font-size="12" font-weight="800" fill="#6d4c41" text-anchor="middle">receptores de la piel</text></g>
      <g id="ida" class="capa"><path d="M140,178 Q220,132 300,100 L318,66" stroke="#1e88e5" stroke-width="4" fill="none" stroke-dasharray="8 5"/>
        <polygon points="318,58 312,72 324,70" fill="#1e88e5"/>
        <text x="200" y="118" font-size="13" font-weight="800" fill="#1565c0" text-anchor="middle" transform="rotate(-22 200 118)">nervios sensitivos →</text></g>
      <g id="centro" class="capa"><ellipse cx="324" cy="42" rx="30" ry="22" fill="none" stroke="#ffb300" stroke-width="4"/>
        <line x1="336" y1="70" x2="336" y2="190" stroke="#ffb300" stroke-width="3" stroke-dasharray="4 3"/>
        <text x="255" y="22" font-size="13" font-weight="800" fill="#6a1b9a" text-anchor="middle">cerebro y médula</text></g>
      <g id="vuelta" class="capa"><path d="M314,70 L306,124 Q232,168 150,206" stroke="#e53935" stroke-width="4" fill="none" stroke-dasharray="8 5"/>
        <polygon points="142,210 156,200 156,212" fill="#e53935"/>
        <text x="236" y="188" font-size="13" font-weight="800" fill="#c62828" text-anchor="middle" transform="rotate(-24 236 188)">← nervios motores</text></g>
      <g id="respuesta" class="capa"><path d="M112,170 l22,-38 M128,176 l24,-34" stroke="#43a047" stroke-width="4" stroke-linecap="round"/>
        <polygon points="138,124 150,130 136,138" fill="#43a047"/>
        <text x="290" y="250" font-size="15" font-weight="900" fill="#2e7d32" text-anchor="middle">¡retiramos la mano!</text></g>
    </svg>`,

    cuerpoSN: `<svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="400" rx="14" fill="#f3f8ff"/>
      <rect x="86" y="92" width="30" height="28" fill="#f2c9a0"/>
      <rect x="70" y="114" width="66" height="152" rx="22" fill="#bbdefb"/>
      <rect x="78" y="258" width="22" height="128" rx="10" fill="#90a4ae"/><rect x="104" y="258" width="22" height="128" rx="10" fill="#90a4ae"/>
      <path d="M88,128 L64,252" stroke="#f2c9a0" stroke-width="18" stroke-linecap="round"/>
      <circle cx="100" cy="60" r="44" fill="#f2c9a0"/>
      <circle cx="66" cy="70" r="3" fill="#5d4037"/>
      <path d="M58,52 Q60,22 98,20 Q134,22 136,52 Q132,70 100,70 Q64,70 58,52Z" fill="#f8bbd0" stroke="#d81b60" stroke-width="2"/>
      <path d="M70,40 q8,-8 16,0 q8,8 16,0 q8,-8 16,0 M68,54 q10,-6 20,0 q10,6 20,0 q8,-5 16,0" stroke="#d81b60" stroke-width="1.5" fill="none"/>
      <ellipse cx="124" cy="76" rx="14" ry="9" fill="#ce93d8" stroke="#8e24aa" stroke-width="1.5"/>
      <path d="M114,74 h20 M114,79 h20" stroke="#8e24aa" stroke-width="1"/>
      <rect x="106" y="68" width="10" height="34" rx="4" fill="#f06292"/>
      <line x1="111" y1="100" x2="111" y2="262" stroke="#ec407a" stroke-width="7" stroke-linecap="round"/>
      <g stroke="#fbc02d" stroke-width="2.2" fill="none" stroke-linecap="round">
        <path d="M111,136 Q86,150 70,240"/><path d="M111,150 L80,160"/><path d="M111,150 L132,162"/>
        <path d="M111,190 L80,198"/><path d="M111,190 L132,200"/><path d="M111,225 L82,232"/><path d="M111,225 L132,236"/>
        <path d="M111,260 L89,384"/><path d="M111,260 L115,384"/></g>
    </svg>`,

    redSN: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="260" fill="#fffaf0"/>
      <g id="r1" class="capa"><rect x="130" y="8" width="140" height="30" rx="14" fill="#2e7d32"/><text x="200" y="28" font-size="14" fill="#fff">Sistema nervioso</text></g>
      <g id="r2" class="capa"><path d="M170,38 L105,62" stroke="#78909c" stroke-width="2"/><rect x="25" y="62" width="160" height="28" rx="12" fill="#1565c0"/><text x="105" y="81" font-size="12.5" fill="#fff">Sistema nervioso central</text></g>
      <g id="r3" class="capa"><path d="M80,90 L55,120" stroke="#78909c" stroke-width="2"/><rect x="10" y="120" width="92" height="26" rx="12" fill="#ef6c00"/><text x="56" y="138" font-size="12.5" fill="#fff">Encéfalo</text></g>
      <g id="r4" class="capa" font-size="11"><path d="M56,146 L33,184 M56,146 L93,184 M56,146 L152,184" stroke="#78909c" stroke-width="2"/>
        <rect x="4" y="184" width="58" height="26" rx="10" fill="#ad1457"/><text x="33" y="201" fill="#fff">cerebro</text>
        <rect x="64" y="184" width="58" height="26" rx="10" fill="#6a1b9a"/><text x="93" y="201" fill="#fff">cerebelo</text>
        <rect x="124" y="184" width="58" height="34" rx="10" fill="#c2185b"/><text x="153" y="198" fill="#fff">tronco</text><text x="153" y="211" fill="#fff">encefálico</text></g>
      <g id="r5" class="capa"><path d="M130,90 L160,120" stroke="#78909c" stroke-width="2"/><rect x="112" y="120" width="104" height="26" rx="12" fill="#ef6c00"/><text x="164" y="138" font-size="12.5" fill="#fff">Médula espinal</text></g>
      <g id="r6" class="capa"><path d="M230,38 L310,62" stroke="#78909c" stroke-width="2"/><rect x="228" y="62" width="168" height="28" rx="12" fill="#00838f"/><text x="312" y="81" font-size="12.5" fill="#fff">Sistema nervioso periférico</text>
        <text x="312" y="106" font-size="10.5" fill="#455a64" font-weight="700">nervios que recorren el cuerpo</text></g>
      <g id="r7" class="capa" font-size="10.5"><path d="M312,112 L268,140 M312,112 L356,140" stroke="#78909c" stroke-width="2"/>
        <rect x="226" y="140" width="84" height="74" rx="10" fill="#e0f7fa" stroke="#00838f" stroke-width="2"/>
        <text x="268" y="158" font-size="12" fill="#006064">Somático</text><text x="268" y="176" font-weight="700" fill="#37474f">sentidos y</text><text x="268" y="190" font-weight="700" fill="#37474f">movimientos</text><text x="268" y="204" font-weight="700" fill="#37474f">voluntarios</text>
        <rect x="314" y="140" width="84" height="74" rx="10" fill="#e0f7fa" stroke="#00838f" stroke-width="2"/>
        <text x="356" y="158" font-size="12" fill="#006064">Autónomo</text><text x="356" y="176" font-weight="700" fill="#37474f">funciones</text><text x="356" y="190" font-weight="700" fill="#37474f">involuntarias</text><text x="356" y="204" font-weight="700" fill="#37474f">(respiración...)</text></g>
    </svg>`,

    cuerpoGl: `<svg viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="200" height="400" rx="14" fill="#fff8f0"/>
      <path d="M68,112 L40,236 M132,112 L160,236" stroke="#f2c9a0" stroke-width="18" stroke-linecap="round"/>
      <rect x="86" y="72" width="28" height="30" fill="#f2c9a0"/>
      <path d="M62,104 Q100,94 138,104 L136,250 Q100,262 64,250Z" fill="#f2c9a0"/>
      <rect x="66" y="246" width="30" height="140" rx="13" fill="#f2c9a0"/><rect x="104" y="246" width="30" height="140" rx="13" fill="#f2c9a0"/>
      <circle cx="100" cy="42" r="32" fill="#f2c9a0"/>
      <ellipse cx="100" cy="32" rx="22" ry="14" fill="#f8bbd0" opacity=".7"/>
      <circle cx="100" cy="40" r="5" fill="#8e24aa"/>
      <path d="M90,84 q10,10 20,0 q-2,10 -10,10 q-8,0 -10,-10Z" fill="#e53935"/>
      <circle cx="91" cy="90" r="2" fill="#ffb300"/><circle cx="109" cy="90" r="2" fill="#ffb300"/>
      <ellipse cx="100" cy="120" rx="10" ry="8" fill="#9ccc65"/>
      <ellipse cx="78" cy="180" rx="9" ry="14" fill="#bcaaa4"/><ellipse cx="122" cy="180" rx="9" ry="14" fill="#bcaaa4"/>
      <path d="M70,168 q8,-10 16,0Z M114,168 q8,-10 16,0Z" fill="#ffa000"/>
      <path d="M88,190 Q112,180 130,192 Q112,198 88,196Z" fill="#ffd54f" stroke="#f9a825"/>
      <ellipse cx="82" cy="232" rx="6" ry="4" fill="#f06292"/><ellipse cx="118" cy="232" rx="6" ry="4" fill="#f06292"/>
      <path d="M86,232 Q100,222 114,232" stroke="#f06292" stroke-width="2" fill="none"/>
      <text x="30" y="226" font-size="9" fill="#ad1457">♀ mujeres</text>
      <ellipse cx="122" cy="262" rx="6" ry="7" fill="#7986cb"/><ellipse cx="134" cy="262" rx="6" ry="7" fill="#7986cb"/>
      <text x="168" y="282" font-size="9" fill="#283593">♂ varones</text>
    </svg>`,

    redEndo: `<svg viewBox="0 0 400 220" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <rect width="400" height="220" fill="#fffaf0"/>
      <rect x="120" y="6" width="160" height="28" rx="14" fill="#6a1b9a"/><text x="200" y="26" font-size="14" fill="#fff">Sistema endocrino</text>
      <path d="M200,34 V60 M200,90 V112 M200,142 V164" stroke="#78909c" stroke-width="2"/>
      <text x="236" y="52" font-size="11" fill="#546e7a">formado por</text>
      <text x="238" y="106" font-size="11" fill="#546e7a">que producen</text>
      <text x="240" y="158" font-size="11" fill="#546e7a">que viajan por</text>
      <rect x="140" y="60" width="120" height="30" rx="10" fill="#fff" stroke="#8e24aa" stroke-width="2.5"/>
      <rect x="140" y="112" width="120" height="30" rx="10" fill="#fff" stroke="#8e24aa" stroke-width="2.5"/>
      <rect x="140" y="164" width="120" height="30" rx="10" fill="#fff" stroke="#8e24aa" stroke-width="2.5"/>
      <path d="M260,75 H286" stroke="#78909c" stroke-width="2"/><text x="340" y="52" font-size="11" fill="#546e7a">por ejemplo</text>
      <rect x="286" y="60" width="108" height="92" rx="10" fill="#fff" stroke="#8e24aa" stroke-width="2.5"/>
      <g font-size="12" fill="#37474f"><text x="340" y="80">hipófisis</text><text x="340" y="98">tiroides</text><text x="340" y="116">páncreas</text></g>
      <rect x="292" y="124" width="96" height="22" rx="6" fill="none"/>
      <g fill="#c62828" font-size="20"><text id="e1q" class="blanco" x="200" y="83">?</text><text id="e2q" class="blanco" x="200" y="135">?</text><text id="e3q" class="blanco" x="200" y="187">?</text><text id="e4q" class="blanco" x="340" y="140">?</text></g>
      <g fill="#2e7d32" font-size="15"><text id="e1" class="capa" x="200" y="81">glándulas</text><text id="e2" class="capa" x="200" y="133">hormonas</text><text id="e3" class="capa" x="200" y="185">la sangre</text><text id="e4" class="capa" x="340" y="138" font-size="12">suprarrenales</text></g>
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
    const env = el('button', 'btnEnviar', '📤 Enviar mis resultados a la seño');
    env.onclick = () => abrirEnvio(pct); m.appendChild(env);
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
    g.fillStyle = '#f1f8e9'; g.fillRect(0, 0, 720, 900);
    g.fillStyle = '#2e7d32'; g.fillRect(0, 0, 720, 150);
    g.fillStyle = '#fff'; g.textAlign = 'center'; g.font = 'bold 40px sans-serif'; g.fillText(D.meta.titulo, 360, 70);
    g.font = 'bold 24px sans-serif'; g.fillText(D.meta.etiqueta, 360, 115);
    g.fillStyle = '#263238'; g.font = 'bold 36px sans-serif'; g.fillText(nom, 360, 220);
    g.font = '28px sans-serif'; g.fillText(gr || '', 360, 265);
    const filas = [['✅ Aciertos', E.aciertos], ['❌ Errores', E.errores], ['📊 Total', pct + '%'], ['⭐ Puntos', E.puntos], ['🔁 Intento', E.intento || 1]];
    filas.forEach((f, i) => {
      const y = 330 + i * 92; g.fillStyle = '#fff'; g.fillRect(110, y - 50, 500, 76);
      g.fillStyle = '#455a64'; g.textAlign = 'left'; g.font = 'bold 32px sans-serif'; g.fillText(f[0], 140, y);
      g.fillStyle = '#2e7d32'; g.textAlign = 'right'; g.fillText(String(f[1]), 580, y);
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
