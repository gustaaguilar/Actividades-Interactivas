// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: narracion (svg/tarjetas), hotspot, trivia, vf,
//  asociar, clasificar (uno a uno), ordenar, sopa de letras.
// ============================================================
(function () {
  'use strict';

  // ---------- Audios (función pura: la usa también el extractor) ----------
  // Correcciones de pronunciación para gTTS (el texto en pantalla no cambia)
  const ORD = { 1: 'primer', 2: 'segundo', 3: 'tercer', 4: 'cuarto', 5: 'quinto', 6: 'sexto', 7: 'séptimo' };
  function pron(t) {
    return t.replace(/\bISCAMEN\b|\bIscamen\b/g, 'Iscamén')
            .replace(/\bTIE\b/g, 'Tíe')
            .replace(/\b([1-7])\s*[°º]\s*grado/g, (m, n) => ORD[n] + ' grado');
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
    b.disabled = !(E.completo && !audioOcupado());
    b.classList.toggle('listo', !b.disabled);
  }

  // ---------- Navegación ----------
  function ir(i) {
    const zv = $('#zoomVista'); if (zv) zv.classList.remove('abierto');
    pararAudio(); setBloq(false); E.completo = false;
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
    const R = { narracion: rNarracion, hotspot: rHotspot, trivia: rTrivia, vf: rVF, asociar: rAsociar, clasificar: rClasificar, ordenar: rOrdenar, sopa: rSopa }[p.tipo];
    const arrancar = R(p, m) || (() => {});
    const btn = p.lupa ? ponerLupa(p, m) : null;
    hablar([aid(p, 'inst')], { bloquear: true, cb: () => {
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
    box.appendChild(fig(p.img, 'hsImg'));
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
    if (p.img) m.appendChild(fig(p.img, 'fig'));
    const cont = el('div', 'tarjetaPreg'); m.appendChild(cont);
    let qi = 0;
    function mostrar(conAudio) {
      const q = p.preguntas[qi]; let evaluada = false;
      cont.innerHTML = '';
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
            b.classList.add('bien'); g.classList.add('resuelto'); chime();
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

  // ======================= ESCENAS SVG =======================
  const ESCENAS = {
    oasis: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#e3f5ff"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#cielo)"/>
      <rect y="108" width="400" height="152" fill="#ecd6a2"/>
      <g id="montes"><polygon points="200,112 250,50 275,78 318,18 352,58 378,30 400,52 400,112" fill="#8d6e63"/>
        <polygon points="305,34 318,18 331,35 322,31 314,37" fill="#fff"/><polygon points="370,38 378,30 387,40 379,37" fill="#fff"/><polygon points="244,58 250,50 257,60 250,57" fill="#fff"/></g>
      <g id="desierto" class="capa"><circle cx="40" cy="30" r="16" fill="#ffd54f"/>
        <path d="M0,200 Q50,180 100,205 T200,215 L200,260 L0,260Z" fill="#e0c07e"/>
        <g fill="#8a8f4a"><circle cx="40" cy="176" r="6"/><circle cx="48" cy="178" r="5"/><circle cx="85" cy="232" r="6"/><circle cx="92" cy="234" r="4"/><circle cx="330" cy="200" r="6"/><circle cx="338" cy="203" r="5"/><circle cx="270" cy="245" r="5"/><circle cx="20" cy="240" r="5"/><circle cx="370" cy="150" r="5"/></g></g>
      <g id="rio" class="capa"><path d="M335,32 C325,55 305,78 285,92 S250,112 232,128 S178,188 128,258" stroke="#1e88e5" stroke-width="6" fill="none" stroke-linecap="round"/></g>
      <g id="dique" class="capa"><ellipse cx="292" cy="84" rx="20" ry="8" fill="#42a5f5"/><rect x="266" y="88" width="20" height="9" rx="2" fill="#78909c" transform="rotate(-30 276 92)"/><text x="300" y="112" font-size="10" fill="#37474f" font-family="sans-serif">dique</text></g>
      <g id="canales" class="capa" stroke="#4fc3f7" stroke-width="2.5" fill="none" stroke-dasharray="5 3">
        <path d="M232,130 L140,138"/><path d="M215,145 L150,178"/><path d="M200,160 L215,205"/><path d="M185,172 L105,200"/><path d="M162,200 L110,228"/></g>
      <g id="verde" class="capa"><path d="M95,132 L230,126 L240,150 L222,212 L150,222 L96,236 L84,196 Z" fill="#66bb6a" opacity=".85"/>
        <g stroke="#2e7d32" stroke-width="2"><line x1="120" y1="160" x2="180" y2="155"/><line x1="118" y1="168" x2="178" y2="163"/><line x1="160" y1="190" x2="215" y2="186"/><line x1="158" y1="198" x2="212" y2="194"/><line x1="100" y1="210" x2="150" y2="206"/></g>
        <g fill="#1b5e20"><rect x="228" y="118" width="4" height="22" rx="2"/><rect x="100" y="120" width="4" height="20" rx="2"/><rect x="215" y="195" width="4" height="22" rx="2"/></g></g>
      <g id="ciudad" class="capa"><rect x="104" y="116" width="12" height="22" fill="#b0bec5"/><rect x="118" y="108" width="14" height="30" fill="#90a4ae"/><rect x="134" y="120" width="10" height="18" fill="#cfd8dc"/>
        <g fill="#fff59d"><rect x="121" y="113" width="3" height="3"/><rect x="126" y="113" width="3" height="3"/><rect x="121" y="120" width="3" height="3"/><rect x="107" y="121" width="3" height="3"/></g></g>
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
    E.completo = true; hablar(['g_cierre']);
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
    initLB(); initZoom();
    portada();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
