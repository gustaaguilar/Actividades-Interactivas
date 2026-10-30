// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: narracion, hotspot (img/svg), trivia (img/red svg), vf, video YT,
//  asociar, clasificar (uno a uno), ordenar, sopa de letras, oracion (armar palabra por palabra),
//  mapa (tocar la zona del mapa SVG), cuadro (completar un cuadro comparativo).
//  Paquete: Los pueblos originarios de Mendoza
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
      case 'clasificar': case 'mapa': case 'cuadro': p.items.forEach((it, i) => { add('it' + i, it.t); add('it' + i + '_ok', it.conf); }); add('fin', p.fin); break;
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
    const R = { narracion: rNarracion, hotspot: rHotspot, trivia: rTrivia, vf: rVF, asociar: rAsociar, clasificar: rClasificar, ordenar: rOrdenar, sopa: rSopa, video: rVideo, oracion: rOracion, mapa: rMapa, cuadro: rCuadro }[p.tipo];
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
    if (p.alto) m.classList.add('conMapa');
    if (p.modo === 'svg') {
      stage = el('div', 'escenaWrap');
      const box = el('div', 'escenaBox' + (p.alto ? ' alto' : '')); box.innerHTML = ESCENAS[p.escena];
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
        stage.querySelectorAll('.zf_' + s.mostrar.replace(/^c_/, '')).forEach(x => x.classList.add('ver'));
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

  // ======================= MAPA (tocar la zona que corresponde) =======================
  function rMapa(p, m) {
    const orden = barajar(p.items.map((it, i) => i));
    const carta = el('button', 'carta titila'); m.appendChild(carta);
    const wrap = el('div', 'escenaWrap'), box = el('div', 'escenaBox alto');
    box.innerHTML = ESCENAS[p.escena]; wrap.appendChild(box); m.appendChild(wrap);
    const zonas = Array.from(box.querySelectorAll('.zona'));
    let k = 0, evaluado = false;
    function mostrar(conAudio) {
      if (k >= orden.length) { carta.style.visibility = 'hidden'; hablar([aid(p, 'fin')], { bloquear: true, cb: setCompleto }); return; }
      const i = orden[k]; evaluado = false;
      carta.textContent = p.items[i].t; carta.classList.remove('titila'); void carta.offsetWidth; carta.classList.add('titila');
      carta.onclick = () => hablar([aid(p, 'it' + i)], { interrumpir: true });
      if (conAudio !== false) hablar([aid(p, 'it' + i)], { interrumpir: true });
    }
    zonas.forEach((z, zi) => z.addEventListener('click', () => {
      if (E.bloq || k >= orden.length) return;
      const i = orden[k], it = p.items[i];
      if (zi === it.cat) {
        if (!evaluado) { evaluado = true; acierto(); }
        chime();
        z.style.fill = z.dataset.c; z.style.fillOpacity = '.55';
        const t = box.querySelector('#zt' + zi); if (t) t.classList.add('ver');
        z.classList.remove('zbien'); void z.getBBox; z.classList.add('zbien');
        k++;
        if (it.conf) hablar([aid(p, 'it' + i + '_ok')], { interrumpir: true, bloquear: true, cb: mostrar });
        else { pararAudio(); mostrar(); }
      } else {
        if (!evaluado) { evaluado = true; error(); }
        z.classList.add('zmal'); setTimeout(() => z.classList.remove('zmal'), 500);
        buzz(); hablar(['g_error'], { interrumpir: true });
      }
    }));
    mostrar(false);
    return () => hablar([aid(p, 'it' + orden[0])]);
  }

  // ======================= CUADRO COMPARATIVO (completar casilleros) =======================
  function rCuadro(p, m) {
    if (p.img) m.appendChild(fig(p.img, 'fig figC'));
    const orden = barajar(p.items.map((it, i) => i));
    const carta = el('button', 'carta titila'); m.appendChild(carta);
    const tabla = el('div', 'cuadro'); tabla.style.gridTemplateColumns = '0.8fr' + ' 1.1fr'.repeat(p.columnas.length);
    tabla.appendChild(el('div', 'cuEsq', 'Características'));
    p.columnas.forEach(c => tabla.appendChild(el('div', 'cuCol', c)));
    const celdas = {};
    p.filas.forEach((f, fi) => {
      tabla.appendChild(el('div', 'cuFila', f));
      p.columnas.forEach((c, ci) => {
        const d = el('button', 'cuCelda', '');
        d.onclick = () => elegir(fi, ci, d);
        celdas[fi + '_' + ci] = d; tabla.appendChild(d);
      });
    });
    m.appendChild(tabla);
    let k = 0, evaluado = false;
    function mostrar(conAudio) {
      if (k >= orden.length) { carta.style.visibility = 'hidden'; hablar([aid(p, 'fin')], { bloquear: true, cb: setCompleto }); return; }
      const i = orden[k]; evaluado = false;
      carta.textContent = p.items[i].t; carta.classList.remove('titila'); void carta.offsetWidth; carta.classList.add('titila');
      carta.onclick = () => hablar([aid(p, 'it' + i)], { interrumpir: true });
      if (conAudio !== false) hablar([aid(p, 'it' + i)], { interrumpir: true });
    }
    function elegir(fi, ci, d) {
      if (k >= orden.length || d.classList.contains('llena')) return;
      const i = orden[k], it = p.items[i];
      if (it.f === fi && it.c === ci) {
        if (!evaluado) { evaluado = true; acierto(); }
        chime(); d.textContent = it.t; d.classList.add('llena', 'entra'); k++;
        if (it.conf) hablar([aid(p, 'it' + i + '_ok')], { interrumpir: true, bloquear: true, cb: mostrar });
        else { pararAudio(); mostrar(); }
      } else {
        if (!evaluado) { evaluado = true; error(); }
        d.classList.add('sacude'); setTimeout(() => d.classList.remove('sacude'), 450);
        buzz(); hablar(['g_error'], { interrumpir: true });
      }
    }
    mostrar(false);
    return () => hablar([aid(p, 'it' + orden[0])]);
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
  const ESCENAS = {
    // ---------- Mapa de Mendoza (narración) ----------
    mapaNarr: `<svg viewBox="0 0 300 488" class="escena mapaSvg" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle"><defs><clipPath id="clipN"><path d="M49.9,122.9 L47.8,118.0 L47.1,116.9 L44.8,114.9 L43.8,113.7 L43.2,112.3 L43.2,110.7 L44.3,105.9 L44.1,104.2 L43.5,102.9 L43.1,101.6 L43.6,99.9 L44.6,99.1 L46.8,98.5 L48.3,96.5 L48.9,93.1 L49.4,91.6 L50.6,89.3 L49.6,87.5 L48.1,86.9 L46.9,86.2 L44.7,83.9 L41.1,79.4 L40.1,76.9 L38.4,68.1 L38.4,66.2 L38.5,64.7 L39.1,63.4 L40.6,63.3 L39.9,60.9 L39.8,59.5 L39.9,57.9 L39.7,56.2 L38.9,54.5 L37.9,53.6 L35.2,52.0 L34.0,49.5 L34.2,43.5 L33.3,42.2 L44.4,40.1 L47.2,40.1 L48.8,40.8 L51.8,41.4 L65.0,38.1 L72.8,37.8 L74.1,37.1 L75.2,36.0 L75.7,34.6 L75.5,28.9 L76.0,27.5 L76.7,26.5 L78.0,25.7 L82.2,24.3 L83.6,23.6 L86.1,21.7 L87.4,20.9 L89.6,20.5 L93.2,20.6 L96.6,21.2 L98.3,20.8 L99.3,19.9 L100.4,17.3 L101.2,16.2 L102.8,15.7 L104.5,13.6 L105.6,12.9 L107.3,12.9 L108.9,13.8 L112.4,18.0 L113.1,19.5 L114.0,20.9 L115.3,22.2 L118.6,23.0 L121.8,22.2 L123.1,22.4 L124.6,43.1 L125.7,44.0 L138.9,43.9 L142.4,42.0 L154.2,33.5 L156.5,31.6 L157.4,30.0 L158.9,28.7 L167.0,28.2 L168.4,27.8 L170.8,26.7 L173.4,24.5 L181.6,22.0 L184.0,22.1 L186.4,23.6 L188.1,25.6 L188.8,26.7 L189.5,29.4 L192.9,31.5 L193.8,32.3 L194.7,33.2 L196.2,35.7 L203.0,37.1 L204.1,36.6 L206.3,36.2 L208.8,35.9 L212.8,35.0 L217.2,35.0 L218.9,34.5 L221.3,34.3 L226.3,37.9 L226.5,41.4 L228.4,48.9 L229.9,50.0 L231.2,51.7 L231.2,53.7 L231.9,54.9 L232.5,56.3 L232.8,58.5 L233.7,61.0 L234.1,63.3 L235.4,70.0 L236.3,72.0 L237.2,72.9 L238.4,74.2 L238.6,75.6 L238.9,77.0 L239.9,78.8 L238.7,81.3 L238.3,83.6 L238.9,87.7 L238.9,89.7 L237.9,90.5 L238.1,93.8 L239.5,97.3 L239.1,99.8 L239.3,101.6 L239.8,103.2 L240.4,110.7 L240.0,117.2 L240.5,119.3 L240.9,123.1 L242.5,126.9 L242.7,128.4 L242.5,132.0 L242.6,133.6 L243.2,135.5 L249.6,146.7 L251.0,148.2 L252.3,151.9 L253.6,156.2 L255.2,159.0 L256.8,164.5 L257.0,166.1 L258.7,168.1 L261.2,169.8 L262.3,170.7 L263.3,171.9 L264.1,173.3 L264.8,177.1 L265.7,178.2 L266.8,179.0 L267.7,179.8 L268.2,181.1 L268.7,183.6 L269.9,185.7 L270.0,186.9 L269.6,189.4 L269.3,193.7 L269.0,195.5 L268.1,196.7 L266.7,196.1 L265.8,197.6 L264.9,199.2 L265.3,202.3 L265.5,208.7 L266.3,210.2 L265.4,211.9 L267.1,213.9 L267.7,215.5 L268.1,222.5 L269.7,227.8 L270.0,229.6 L270.5,230.9 L273.7,234.4 L281.7,250.3 L283.4,256.2 L283.6,257.9 L282.9,262.2 L284.1,266.4 L284.3,267.8 L285.8,271.3 L286.2,272.6 L286.1,274.0 L284.8,278.7 L285.5,279.7 L286.2,281.0 L285.8,282.9 L285.2,284.1 L286.1,289.2 L286.2,290.5 L285.4,295.6 L285.1,302.9 L284.8,304.6 L282.8,309.2 L282.0,317.5 L279.2,330.4 L278.7,336.4 L277.8,340.2 L277.8,341.6 L278.2,344.2 L248.8,344.3 L243.7,344.3 L168.8,344.3 L167.5,344.9 L166.4,346.1 L165.7,351.6 L165.6,354.9 L165.7,356.2 L168.1,367.1 L168.6,412.7 L168.6,472.1 L156.6,470.5 L155.5,469.8 L154.3,468.4 L152.2,464.1 L151.2,463.1 L149.9,462.6 L145.5,462.5 L143.3,461.6 L140.4,461.4 L138.3,460.4 L135.7,457.5 L134.4,456.9 L125.8,457.7 L122.3,457.2 L119.0,456.2 L116.6,454.6 L115.3,452.0 L113.9,445.8 L112.0,443.4 L110.8,442.7 L107.6,441.4 L104.8,440.9 L100.4,438.9 L97.6,438.7 L85.7,440.9 L82.2,440.6 L78.8,440.0 L75.9,438.9 L70.6,435.6 L68.2,433.5 L63.4,427.3 L63.0,426.2 L64.4,424.0 L65.0,422.2 L65.0,420.6 L64.9,418.7 L64.7,415.2 L63.7,413.9 L61.5,412.8 L59.8,412.0 L56.8,409.6 L55.8,408.3 L54.9,405.0 L54.3,403.5 L53.5,402.3 L51.3,400.2 L50.0,399.6 L49.0,398.6 L48.4,397.1 L47.0,395.7 L46.0,394.6 L40.6,392.8 L39.6,392.1 L38.7,391.0 L37.3,388.1 L35.3,382.9 L35.1,381.6 L33.6,375.9 L32.3,374.3 L31.2,373.8 L29.9,374.1 L29.1,375.1 L28.0,375.5 L26.8,374.8 L25.9,373.2 L25.1,371.1 L24.8,369.5 L24.7,368.2 L25.1,366.9 L26.0,366.0 L26.4,364.1 L26.5,361.7 L26.2,360.2 L25.7,359.0 L24.5,357.4 L22.0,355.6 L22.1,354.0 L22.9,351.3 L24.5,349.2 L24.7,346.9 L22.7,341.9 L23.3,339.3 L24.2,338.4 L24.7,337.3 L22.8,336.9 L22.2,333.6 L26.5,329.2 L26.2,326.6 L25.2,324.8 L22.1,316.5 L22.1,315.2 L22.8,312.2 L22.8,310.6 L22.4,307.3 L23.0,303.9 L22.5,302.7 L21.5,301.6 L20.5,300.2 L18.9,294.8 L18.8,293.5 L20.9,292.5 L20.9,289.6 L18.5,288.2 L15.5,287.8 L12.8,286.9 L11.5,283.7 L14.0,279.6 L24.5,276.1 L25.7,270.4 L25.5,264.6 L26.7,258.6 L31.9,245.9 L30.8,244.2 L29.8,243.0 L29.2,241.5 L30.8,240.8 L32.1,240.0 L33.6,237.5 L34.2,231.2 L35.2,228.4 L36.5,227.0 L39.3,224.5 L40.4,222.9 L41.9,218.9 L42.9,217.1 L46.0,214.4 L46.6,212.9 L46.6,211.0 L46.3,208.6 L46.2,206.1 L46.7,204.3 L47.8,203.1 L51.3,202.5 L52.7,202.5 L54.1,202.9 L56.5,203.7 L57.1,202.4 L61.8,200.3 L61.5,197.6 L59.9,194.4 L59.1,191.9 L59.4,190.5 L59.7,189.2 L60.3,183.0 L60.3,179.1 L59.6,176.9 L58.4,176.6 L56.7,176.8 L56.8,174.5 L57.4,171.3 L57.5,169.9 L56.3,163.5 L56.3,161.7 L59.2,158.9 L60.0,158.0 L60.0,156.7 L58.2,154.1 L57.6,152.7 L57.7,151.1 L59.1,146.5 L58.8,144.9 L59.0,143.3 L60.7,142.4 L61.5,141.1 L61.7,137.3 L62.0,136.0 L62.7,134.7 L64.4,132.4 L64.9,131.1 L64.9,129.5 L63.7,126.6 L63.1,122.1 L61.6,120.2 L59.3,118.9 L56.9,117.9 L54.6,118.3 L51.6,122.5 L49.9,122.9Z"/></clipPath></defs><rect width="300" height="488" fill="#eaf4f4"/><path d="M49.9,122.9 L47.8,118.0 L47.1,116.9 L44.8,114.9 L43.8,113.7 L43.2,112.3 L43.2,110.7 L44.3,105.9 L44.1,104.2 L43.5,102.9 L43.1,101.6 L43.6,99.9 L44.6,99.1 L46.8,98.5 L48.3,96.5 L48.9,93.1 L49.4,91.6 L50.6,89.3 L49.6,87.5 L48.1,86.9 L46.9,86.2 L44.7,83.9 L41.1,79.4 L40.1,76.9 L38.4,68.1 L38.4,66.2 L38.5,64.7 L39.1,63.4 L40.6,63.3 L39.9,60.9 L39.8,59.5 L39.9,57.9 L39.7,56.2 L38.9,54.5 L37.9,53.6 L35.2,52.0 L34.0,49.5 L34.2,43.5 L33.3,42.2 L44.4,40.1 L47.2,40.1 L48.8,40.8 L51.8,41.4 L65.0,38.1 L72.8,37.8 L74.1,37.1 L75.2,36.0 L75.7,34.6 L75.5,28.9 L76.0,27.5 L76.7,26.5 L78.0,25.7 L82.2,24.3 L83.6,23.6 L86.1,21.7 L87.4,20.9 L89.6,20.5 L93.2,20.6 L96.6,21.2 L98.3,20.8 L99.3,19.9 L100.4,17.3 L101.2,16.2 L102.8,15.7 L104.5,13.6 L105.6,12.9 L107.3,12.9 L108.9,13.8 L112.4,18.0 L113.1,19.5 L114.0,20.9 L115.3,22.2 L118.6,23.0 L121.8,22.2 L123.1,22.4 L124.6,43.1 L125.7,44.0 L138.9,43.9 L142.4,42.0 L154.2,33.5 L156.5,31.6 L157.4,30.0 L158.9,28.7 L167.0,28.2 L168.4,27.8 L170.8,26.7 L173.4,24.5 L181.6,22.0 L184.0,22.1 L186.4,23.6 L188.1,25.6 L188.8,26.7 L189.5,29.4 L192.9,31.5 L193.8,32.3 L194.7,33.2 L196.2,35.7 L203.0,37.1 L204.1,36.6 L206.3,36.2 L208.8,35.9 L212.8,35.0 L217.2,35.0 L218.9,34.5 L221.3,34.3 L226.3,37.9 L226.5,41.4 L228.4,48.9 L229.9,50.0 L231.2,51.7 L231.2,53.7 L231.9,54.9 L232.5,56.3 L232.8,58.5 L233.7,61.0 L234.1,63.3 L235.4,70.0 L236.3,72.0 L237.2,72.9 L238.4,74.2 L238.6,75.6 L238.9,77.0 L239.9,78.8 L238.7,81.3 L238.3,83.6 L238.9,87.7 L238.9,89.7 L237.9,90.5 L238.1,93.8 L239.5,97.3 L239.1,99.8 L239.3,101.6 L239.8,103.2 L240.4,110.7 L240.0,117.2 L240.5,119.3 L240.9,123.1 L242.5,126.9 L242.7,128.4 L242.5,132.0 L242.6,133.6 L243.2,135.5 L249.6,146.7 L251.0,148.2 L252.3,151.9 L253.6,156.2 L255.2,159.0 L256.8,164.5 L257.0,166.1 L258.7,168.1 L261.2,169.8 L262.3,170.7 L263.3,171.9 L264.1,173.3 L264.8,177.1 L265.7,178.2 L266.8,179.0 L267.7,179.8 L268.2,181.1 L268.7,183.6 L269.9,185.7 L270.0,186.9 L269.6,189.4 L269.3,193.7 L269.0,195.5 L268.1,196.7 L266.7,196.1 L265.8,197.6 L264.9,199.2 L265.3,202.3 L265.5,208.7 L266.3,210.2 L265.4,211.9 L267.1,213.9 L267.7,215.5 L268.1,222.5 L269.7,227.8 L270.0,229.6 L270.5,230.9 L273.7,234.4 L281.7,250.3 L283.4,256.2 L283.6,257.9 L282.9,262.2 L284.1,266.4 L284.3,267.8 L285.8,271.3 L286.2,272.6 L286.1,274.0 L284.8,278.7 L285.5,279.7 L286.2,281.0 L285.8,282.9 L285.2,284.1 L286.1,289.2 L286.2,290.5 L285.4,295.6 L285.1,302.9 L284.8,304.6 L282.8,309.2 L282.0,317.5 L279.2,330.4 L278.7,336.4 L277.8,340.2 L277.8,341.6 L278.2,344.2 L248.8,344.3 L243.7,344.3 L168.8,344.3 L167.5,344.9 L166.4,346.1 L165.7,351.6 L165.6,354.9 L165.7,356.2 L168.1,367.1 L168.6,412.7 L168.6,472.1 L156.6,470.5 L155.5,469.8 L154.3,468.4 L152.2,464.1 L151.2,463.1 L149.9,462.6 L145.5,462.5 L143.3,461.6 L140.4,461.4 L138.3,460.4 L135.7,457.5 L134.4,456.9 L125.8,457.7 L122.3,457.2 L119.0,456.2 L116.6,454.6 L115.3,452.0 L113.9,445.8 L112.0,443.4 L110.8,442.7 L107.6,441.4 L104.8,440.9 L100.4,438.9 L97.6,438.7 L85.7,440.9 L82.2,440.6 L78.8,440.0 L75.9,438.9 L70.6,435.6 L68.2,433.5 L63.4,427.3 L63.0,426.2 L64.4,424.0 L65.0,422.2 L65.0,420.6 L64.9,418.7 L64.7,415.2 L63.7,413.9 L61.5,412.8 L59.8,412.0 L56.8,409.6 L55.8,408.3 L54.9,405.0 L54.3,403.5 L53.5,402.3 L51.3,400.2 L50.0,399.6 L49.0,398.6 L48.4,397.1 L47.0,395.7 L46.0,394.6 L40.6,392.8 L39.6,392.1 L38.7,391.0 L37.3,388.1 L35.3,382.9 L35.1,381.6 L33.6,375.9 L32.3,374.3 L31.2,373.8 L29.9,374.1 L29.1,375.1 L28.0,375.5 L26.8,374.8 L25.9,373.2 L25.1,371.1 L24.8,369.5 L24.7,368.2 L25.1,366.9 L26.0,366.0 L26.4,364.1 L26.5,361.7 L26.2,360.2 L25.7,359.0 L24.5,357.4 L22.0,355.6 L22.1,354.0 L22.9,351.3 L24.5,349.2 L24.7,346.9 L22.7,341.9 L23.3,339.3 L24.2,338.4 L24.7,337.3 L22.8,336.9 L22.2,333.6 L26.5,329.2 L26.2,326.6 L25.2,324.8 L22.1,316.5 L22.1,315.2 L22.8,312.2 L22.8,310.6 L22.4,307.3 L23.0,303.9 L22.5,302.7 L21.5,301.6 L20.5,300.2 L18.9,294.8 L18.8,293.5 L20.9,292.5 L20.9,289.6 L18.5,288.2 L15.5,287.8 L12.8,286.9 L11.5,283.7 L14.0,279.6 L24.5,276.1 L25.7,270.4 L25.5,264.6 L26.7,258.6 L31.9,245.9 L30.8,244.2 L29.8,243.0 L29.2,241.5 L30.8,240.8 L32.1,240.0 L33.6,237.5 L34.2,231.2 L35.2,228.4 L36.5,227.0 L39.3,224.5 L40.4,222.9 L41.9,218.9 L42.9,217.1 L46.0,214.4 L46.6,212.9 L46.6,211.0 L46.3,208.6 L46.2,206.1 L46.7,204.3 L47.8,203.1 L51.3,202.5 L52.7,202.5 L54.1,202.9 L56.5,203.7 L57.1,202.4 L61.8,200.3 L61.5,197.6 L59.9,194.4 L59.1,191.9 L59.4,190.5 L59.7,189.2 L60.3,183.0 L60.3,179.1 L59.6,176.9 L58.4,176.6 L56.7,176.8 L56.8,174.5 L57.4,171.3 L57.5,169.9 L56.3,163.5 L56.3,161.7 L59.2,158.9 L60.0,158.0 L60.0,156.7 L58.2,154.1 L57.6,152.7 L57.7,151.1 L59.1,146.5 L58.8,144.9 L59.0,143.3 L60.7,142.4 L61.5,141.1 L61.7,137.3 L62.0,136.0 L62.7,134.7 L64.4,132.4 L64.9,131.1 L64.9,129.5 L63.7,126.6 L63.1,122.1 L61.6,120.2 L59.3,118.9 L56.9,117.9 L54.6,118.3 L51.6,122.5 L49.9,122.9Z" fill="#fff6e0" stroke="#6d4c41" stroke-width="2.2" stroke-linejoin="round"/><g class="capa zf_zH"><path d="M-16.9,-65.6 L320.2,-65.6 L320.2,258.3 L239.3,248.5 L198.9,237.8 L163.1,229.6 L131.5,229.6 L97.8,228.0 L53.9,214.8 L-16.9,196.8Z" clip-path="url(#clipN)" fill="#fbc02d" opacity=".55"/></g><g class="capa zf_zPu"><path d="M107.9,228.5 L131.5,229.6 L163.1,229.6 L198.9,237.8 L239.3,248.5 L320.2,258.3 L320.2,549.4 L118.0,549.4 L118.0,360.8Z" clip-path="url(#clipN)" fill="#ef6c00" opacity=".55"/></g><g class="capa zf_zPe"><path d="M-16.9,196.8 L53.9,214.8 L97.8,228.0 L107.9,228.5 L118.0,360.8 L118.0,549.4 L-16.9,549.4Z" clip-path="url(#clipN)" fill="#2e7d32" opacity=".55"/></g><path d="M35,48 L44,32 L53,48Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M41,38 L44,32 L47,38Z" fill="#fff"/><path d="M40,78 L49,62 L58,78Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M46,68 L49,62 L52,68Z" fill="#fff"/><path d="M45,108 L54,92 L63,108Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M51,98 L54,92 L57,98Z" fill="#fff"/><path d="M64,138 L73,122 L82,138Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M70,128 L73,122 L76,128Z" fill="#fff"/><path d="M58,168 L67,152 L76,168Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M64,158 L67,152 L70,158Z" fill="#fff"/><path d="M61,198 L70,182 L79,198Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M67,188 L70,182 L73,188Z" fill="#fff"/><path d="M41,228 L50,212 L59,228Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M47,218 L50,212 L53,218Z" fill="#fff"/><path d="M33,258 L42,242 L51,258Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M39,248 L42,242 L45,248Z" fill="#fff"/><path d="M14,288 L23,272 L32,288Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M20,278 L23,272 L26,278Z" fill="#fff"/><path d="M24,318 L33,302 L42,318Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M30,308 L33,302 L36,308Z" fill="#fff"/><path d="M24,348 L33,332 L42,348Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M30,338 L33,332 L36,338Z" fill="#fff"/><path d="M27,378 L36,362 L45,378Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M33,368 L36,362 L39,368Z" fill="#fff"/><path d="M48,408 L57,392 L66,408Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M54,398 L57,392 L60,398Z" fill="#fff"/><path d="M65,438 L74,422 L83,438Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M71,428 L74,422 L77,428Z" fill="#fff"/><path d="M41.4,35.9 L42.7,37.8 L44.2,39.2 L47.8,40.2 L49.1,41.3 L49.6,43.6 L48.6,45.0 L49.8,46.4 L53.7,46.8 L55.2,46.4 L58.2,44.8 L59.6,43.8 L60.8,42.7 L61.7,41.2 L62.5,39.7 L63.2,37.1 L63.8,33.6 L64.6,31.4 L64.8,29.8 L64.8,27.8 L64.3,26.0 L62.9,23.5 L63.4,22.0 L64.4,20.8 L66.9,18.4 L67.7,16.9 L68.3,15.3 L68.8,13.4 L69.4,9.4 L69.8,7.6 L70.9,5.9 L75.6,1.0 L77.9,-0.6 L79.4,-2.1 L80.7,-3.9 L82.8,-7.9 L84.0,-11.3 L85.1,-16.9 L86.1,-18.8 L89.3,-23.4 L89.7,-25.7 L89.2,-28.8 L89.3,-33.6 L89.1,-35.3 L88.1,-38.5 L88.0,-40.2 L88.3,-41.7" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M228.4,48.9 L229.9,50.1 L231.2,51.7 L231.2,53.7 L232.2,55.6 L232.8,58.5 L233.7,61.0 L234.0,63.3 L235.4,70.0 L236.3,72.0 L237.9,73.5 L238.5,75.6 L239.5,77.9 L238.7,81.3 L238.3,83.6 L238.9,87.7 L238.9,89.7 L237.5,91.5 L238.1,93.8 L239.5,97.3 L239.1,99.8 L239.2,101.6 L239.8,103.2 L240.4,110.7 L240.0,117.2 L240.5,119.3 L240.8,123.1 L242.5,126.9 L242.7,128.4 L242.5,132.0 L242.6,133.6 L243.2,135.5 L249.6,146.7 L251.0,148.2 L252.3,151.9 L253.6,156.2 L255.2,159.0 L256.8,164.5 L257.0,166.1 L258.7,168.1 L261.2,169.8 L263.3,171.9 L264.1,173.3 L264.8,177.1 L266.8,179.0 L268.2,181.1 L268.7,183.6 L269.9,185.7 L269.5,189.4 L269.3,193.7 L269.0,195.5 L267.6,196.7 L266.0,196.5 L264.8,199.2 L265.3,202.3 L265.5,208.7 L266.3,210.2 L265.4,211.9 L267.1,213.9 L267.7,215.5 L268.1,222.5 L269.7,227.8 L270.0,229.6 L273.7,234.4 L281.7,250.3 L283.4,256.2 L283.6,257.9 L282.9,262.2 L284.1,266.4 L284.6,268.8 L285.8,271.3 L286.1,274.0 L284.8,278.8 L286.0,280.4 L286.1,282.1 L285.4,283.6 L286.1,289.2 L285.4,295.6 L285.1,302.9 L284.8,304.6 L282.8,309.2 L282.0,317.5 L279.2,330.5 L278.7,336.4 L277.8,340.2 L278.3,344.5 L277.6,347.3 L276.6,348.9 L274.0,350.1 L273.0,351.4 L271.4,354.6 L267.8,359.5 L267.2,361.1 L263.5,365.3 L262.9,366.9 L263.7,369.2 L264.0,371.2 L263.8,373.1 L263.2,376.4 L263.1,378.1 L263.2,379.9 L263.7,381.4 L264.5,382.8 L265.6,384.1 L266.4,387.3 L266.3,391.1 L265.9,393.1 L265.3,395.0 L266.8,400.4 L267.7,404.5 L267.7,406.3 L267.2,413.4 L266.7,415.2 L265.6,416.7 L264.3,418.0 L263.5,419.3 L263.3,420.9 L264.2,424.3 L264.7,428.1 L265.5,430.8 L265.3,432.7 L264.6,435.7 L266.8,438.0 L267.8,439.4 L265.2,439.5 L263.4,440.5 L262.9,443.5 L265.6,444.2 L267.0,444.9 L272.0,448.9 L271.6,450.7 L271.9,452.6 L275.1,454.6 L279.8,455.5 L284.8,460.8 L290.1,469.0 L292.1,470.9 L294.7,471.8 L297.9,472.0 L301.8,470.2 L304.5,471.3 L305.4,472.9 L305.9,474.7 L306.0,476.2 L305.9,479.6 L307.4,482.1 L308.0,483.5 L308.8,486.8 L309.8,488.8 L310.4,490.3 L312.1,490.5 L314.3,490.0 L317.0,490.9 L325.0,496.8 L327.7,497.9 L331.2,496.3 L330.7,497.9 L331.0,501.3 L331.3,502.9 L331.4,507.8 L331.7,509.6 L333.4,512.0 L334.2,513.6 L334.2,515.5 L331.2,518.4 L328.4,518.6 L327.0,519.4 L324.6,523.1 L322.4,525.0 L321.3,527.1 L322.7,529.9 L325.0,531.6 L329.6,532.5 L333.2,535.6 L335.7,536.3 L338.6,539.0 L340.6,545.1 L341.9,546.4 L345.0,547.3 L346.4,548.2 L350.8,553.0 L355.1,555.2 L357.4,557.5 L358.9,558.6 L373.2,566.5 L376.2,569.1 L380.0,570.6 L382.3,572.3 L385.5,572.7 L389.6,574.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2364.0,-5902.0 L-2366.3,-5901.7" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2670.9,-5715.2 L-2673.3,-5713.2 L-2673.6,-5710.9 L-2676.0,-5709.2 L-2676.7,-5707.4 L-2675.8,-5706.0 L-2674.9,-5704.3 L-2675.4,-5702.5 L-2677.1,-5701.0 L-2678.1,-5699.5 L-2678.0,-5697.8 L-2679.3,-5695.5 L-2681.1,-5694.2 L-2683.7,-5692.6 L-2685.5,-5690.7 L-2686.6,-5689.0 L-2687.6,-5687.7 L-2689.7,-5685.1 L-2690.0,-5682.7 L-2692.7,-5681.8 L-2695.1,-5681.8 L-2693.9,-5679.2 L-2692.4,-5677.6 L-2693.5,-5675.7 L-2695.0,-5673.8 L-2695.5,-5670.1 L-2697.0,-5668.9 L-2699.0,-5668.9 L-2700.8,-5667.7 L-2702.1,-5665.7 L-2703.2,-5663.5 L-2703.7,-5662.0 L-2704.9,-5659.5 L-2706.2,-5657.4 L-2707.5,-5656.4 L-2708.9,-5654.1 L-2710.3,-5652.6 L-2712.7,-5651.4 L-2715.5,-5650.9 L-2717.8,-5650.9 L-2719.7,-5650.8 L-2722.3,-5650.6 L-2724.9,-5650.0 L-2726.2,-5648.2 L-2727.4,-5647.1 L-2732.0,-5648.1 L-2732.5,-5645.0 L-2735.9,-5643.1 L-2737.6,-5643.2 L-2741.6,-5643.8 L-2742.4,-5642.3 L-2742.7,-5640.7 L-2744.4,-5638.5 L-2745.4,-5636.0" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2965.7,-5560.7 L-2964.6,-5561.9 L-2964.2,-5563.7 L-2964.5,-5565.6 L-2964.4,-5567.2 L-2963.4,-5568.5 L-2960.9,-5569.8 L-2958.7,-5571.2 L-2954.8,-5572.2 L-2953.1,-5572.8 L-2948.9,-5571.6 L-2947.0,-5570.4 L-2945.1,-5570.1 L-2942.5,-5571.3 L-2940.8,-5571.7 L-2939.2,-5571.1 L-2937.8,-5569.5 L-2935.8,-5565.4 L-2934.3,-5563.3 L-2933.0,-5562.2 L-2931.5,-5561.6 L-2929.7,-5561.5 L-2926.4,-5562.0 L-2924.1,-5563.3 L-2923.0,-5566.9 L-2922.2,-5570.0 L-2921.4,-5572.5 L-2920.1,-5574.2 L-2918.8,-5576.0 L-2917.1,-5577.0 L-2915.0,-5575.8 L-2913.8,-5572.9 L-2913.2,-5571.1 L-2911.4,-5571.0 L-2908.8,-5568.5 L-2907.0,-5566.1 L-2904.9,-5564.6 L-2902.7,-5564.2 L-2900.9,-5563.0 L-2899.8,-5561.0 L-2899.3,-5558.3 L-2898.0,-5556.9 L-2896.3,-5554.6 L-2896.0,-5552.9 L-2895.4,-5551.4 L-2892.6,-5548.6 L-2891.6,-5546.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2955.6,-5506.5 L-2956.2,-5508.5 L-2958.4,-5512.7 L-2959.6,-5516.7 L-2960.7,-5520.0 L-2959.3,-5524.0 L-2959.7,-5527.5 L-2959.2,-5529.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2941.1,-5439.8 L-2940.8,-5437.9 L-2941.1,-5435.8 L-2940.6,-5434.3 L-2938.9,-5433.7 L-2937.6,-5432.8 L-2935.9,-5431.6 L-2934.5,-5430.1 L-2928.9,-5426.0 L-2927.1,-5424.8 L-2924.2,-5422.5" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2366.0,-5920.7 L-2366.6,-5918.8 L-2366.1,-5915.8 L-2365.9,-5913.5 L-2365.9,-5910.6 L-2365.4,-5908.2 L-2364.0,-5905.2 L-2363.6,-5903.6 L-2364.0,-5902.1" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2367.1,-5901.1 L-2368.1,-5899.6 L-2369.9,-5900.0 L-2371.5,-5899.7 L-2373.1,-5898.8 L-2374.4,-5897.8 L-2380.2,-5896.9 L-2384.5,-5894.5 L-2392.6,-5894.7 L-2402.2,-5893.9 L-2405.1,-5893.0 L-2406.4,-5892.2 L-2410.0,-5888.2 L-2413.8,-5885.5 L-2418.3,-5878.9 L-2420.3,-5877.3 L-2422.6,-5878.9 L-2424.0,-5880.8 L-2425.4,-5882.1 L-2427.1,-5882.3 L-2429.8,-5880.6 L-2433.6,-5880.0 L-2437.7,-5879.0 L-2439.2,-5877.3 L-2439.7,-5875.4 L-2440.7,-5873.8 L-2443.9,-5870.5 L-2445.1,-5867.7 L-2446.1,-5866.4 L-2447.6,-5865.2 L-2448.5,-5862.1 L-2449.9,-5859.6 L-2452.1,-5857.9 L-2463.3,-5853.3 L-2466.4,-5852.9 L-2475.0,-5853.8 L-2477.6,-5853.6 L-2480.3,-5853.1 L-2485.1,-5851.8 L-2486.7,-5851.8 L-2489.9,-5852.4 L-2493.1,-5852.6 L-2496.2,-5853.3 L-2498.9,-5852.4 L-2500.1,-5851.3 L-2501.2,-5849.5 L-2508.1,-5847.1 L-2510.7,-5845.7 L-2524.7,-5834.6 L-2528.4,-5830.0 L-2528.9,-5825.3 L-2531.1,-5821.7 L-2533.1,-5818.0 L-2534.2,-5816.2 L-2541.4,-5812.4 L-2544.4,-5811.9 L-2547.5,-5812.0 L-2550.6,-5812.6 L-2553.3,-5813.8 L-2562.0,-5820.2 L-2563.4,-5820.7 L-2565.0,-5821.0 L-2566.6,-5821.1 L-2568.1,-5821.4 L-2572.3,-5823.3 L-2577.4,-5819.7 L-2579.5,-5817.9 L-2582.1,-5817.2 L-2585.0,-5814.1 L-2587.9,-5811.7 L-2590.3,-5809.2 L-2593.6,-5807.2 L-2595.1,-5805.3 L-2594.8,-5800.4 L-2595.3,-5798.3 L-2596.4,-5797.1 L-2596.9,-5791.8 L-2599.1,-5790.7 L-2599.6,-5788.4 L-2599.8,-5786.6 L-2600.7,-5785.1 L-2603.5,-5783.3 L-2605.1,-5781.9 L-2606.9,-5780.7 L-2609.6,-5780.2 L-2611.1,-5778.5 L-2611.3,-5775.8 L-2614.5,-5774.8 L-2615.6,-5773.5 L-2616.9,-5770.3 L-2618.1,-5768.4 L-2618.9,-5770.6 L-2621.0,-5770.9 L-2621.1,-5765.8 L-2622.0,-5762.5 L-2622.8,-5760.9 L-2626.9,-5760.2 L-2627.1,-5754.9 L-2628.1,-5753.3 L-2628.6,-5750.8 L-2631.1,-5746.8 L-2632.8,-5743.0 L-2636.1,-5739.5 L-2638.0,-5738.3 L-2639.2,-5737.1 L-2640.6,-5735.6 L-2645.6,-5732.1 L-2647.3,-5730.3 L-2649.4,-5725.7 L-2650.7,-5723.7 L-2653.7,-5724.0 L-2655.1,-5723.4 L-2656.0,-5721.0 L-2657.5,-5720.1 L-2658.5,-5718.0 L-2658.5,-5716.1 L-2660.1,-5714.9 L-2670.8,-5715.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2745.4,-5636.0 L-2747.5,-5633.6 L-2748.7,-5632.5 L-2750.5,-5631.8 L-2750.9,-5630.2 L-2754.5,-5628.8 L-2756.0,-5627.0 L-2759.0,-5620.0 L-2760.2,-5618.2 L-2761.9,-5617.2 L-2763.6,-5614.3 L-2764.7,-5612.9 L-2764.7,-5610.3 L-2770.2,-5602.6 L-2770.0,-5600.9 L-2769.4,-5597.9 L-2770.5,-5596.0 L-2772.2,-5595.1 L-2772.2,-5593.3 L-2770.6,-5592.7 L-2771.3,-5591.3 L-2773.1,-5590.5 L-2771.9,-5589.5 L-2771.5,-5587.1 L-2771.3,-5585.4 L-2768.7,-5582.5 L-2768.3,-5580.7 L-2767.5,-5578.2 L-2767.8,-5571.8 L-2768.3,-5570.3 L-2769.6,-5568.7 L-2771.7,-5568.1 L-2772.9,-5566.1 L-2775.4,-5564.4 L-2776.9,-5564.2 L-2782.3,-5566.3 L-2784.0,-5567.8 L-2787.2,-5568.1 L-2789.5,-5568.9 L-2795.9,-5569.1 L-2796.4,-5571.5 L-2798.4,-5572.3 L-2799.9,-5573.1 L-2802.9,-5578.5 L-2804.8,-5580.6 L-2807.5,-5580.7 L-2808.6,-5579.0 L-2810.1,-5577.3 L-2811.6,-5578.7 L-2814.8,-5580.6 L-2815.5,-5582.4 L-2813.2,-5584.6 L-2812.3,-5586.5 L-2811.7,-5588.7 L-2812.2,-5591.4 L-2814.6,-5592.4 L-2817.5,-5592.5 L-2819.7,-5592.2 L-2822.2,-5592.5 L-2824.4,-5591.9 L-2825.0,-5589.6 L-2826.4,-5588.3 L-2827.9,-5588.8 L-2829.3,-5587.8 L-2829.3,-5586.2 L-2831.2,-5585.6 L-2833.3,-5583.8 L-2834.7,-5583.1 L-2838.9,-5582.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2840.0,-5582.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2840.0,-5582.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2840.0,-5582.6 L-2842.3,-5581.5 L-2844.0,-5579.6 L-2849.8,-5578.7 L-2854.5,-5575.8 L-2856.0,-5574.5 L-2860.4,-5572.6 L-2861.4,-5570.8 L-2862.1,-5568.6 L-2863.1,-5566.8 L-2864.8,-5566.1 L-2866.5,-5566.3 L-2868.5,-5566.5 L-2870.8,-5564.0 L-2870.9,-5559.1 L-2871.0,-5557.4 L-2869.9,-5556.3 L-2869.8,-5552.4 L-2869.3,-5550.0 L-2869.1,-5547.4 L-2869.6,-5544.2 L-2870.6,-5541.8 L-2871.9,-5540.1 L-2873.5,-5539.1 L-2875.3,-5538.7 L-2878.3,-5539.9 L-2880.2,-5539.9 L-2888.3,-5545.5 L-2891.2,-5545.7" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2965.7,-5560.7 L-2965.6,-5558.4 L-2964.9,-5556.2 L-2963.9,-5554.4 L-2961.3,-5550.9 L-2960.7,-5549.2 L-2962.1,-5546.2 L-2962.6,-5540.5 L-2962.4,-5538.2 L-2962.0,-5536.6 L-2959.7,-5530.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2955.6,-5506.5 L-2955.7,-5504.3 L-2955.5,-5502.2 L-2954.6,-5498.3 L-2954.3,-5495.0 L-2954.3,-5493.3 L-2955.0,-5490.0 L-2957.0,-5489.2 L-2958.6,-5488.8 L-2958.5,-5487.0 L-2957.2,-5485.5 L-2957.2,-5483.6 L-2958.8,-5481.5 L-2958.2,-5478.8 L-2957.3,-5467.7 L-2955.8,-5466.3 L-2954.1,-5464.7 L-2953.3,-5462.4 L-2953.2,-5460.1 L-2952.3,-5458.6 L-2950.9,-5457.7 L-2949.1,-5457.4 L-2944.7,-5448.3 L-2944.1,-5445.0 L-2943.2,-5443.1 L-2941.6,-5441.6 L-2941.3,-5439.9" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2924.2,-5421.3 L-2923.8,-5419.6 L-2926.5,-5416.9 L-2928.7,-5414.6 L-2930.9,-5411.8 L-2939.1,-5406.5 L-2941.5,-5405.7 L-2942.6,-5404.6 L-2943.3,-5403.1 L-2943.8,-5399.6 L-2944.6,-5398.0 L-2945.7,-5396.7 L-2946.8,-5395.5 L-2949.5,-5393.7 L-2950.5,-5392.6 L-2950.9,-5390.8 L-2950.2,-5388.9 L-2948.8,-5387.3 L-2949.3,-5385.9 L-2950.5,-5384.9 L-2950.4,-5381.5 L-2950.1,-5379.5 L-2949.1,-5378.2 L-2949.1,-5376.3 L-2949.4,-5374.5 L-2948.6,-5373.0 L-2949.9,-5370.9 L-2950.9,-5367.7 L-2950.9,-5366.0 L-2951.8,-5364.2 L-2951.4,-5361.3 L-2951.9,-5359.7 L-2952.8,-5358.4 L-2954.1,-5357.1 L-2955.4,-5354.2 L-2957.9,-5349.4 L-2959.1,-5348.5 L-2960.8,-5348.0 L-2964.1,-5347.8 L-2963.7,-5345.3 L-2962.8,-5343.8 L-2963.9,-5342.2 L-2964.5,-5339.9 L-2962.3,-5336.3 L-2961.1,-5330.4 L-2961.5,-5326.8 L-2962.5,-5323.8 L-2962.7,-5320.9 L-2960.7,-5318.0 L-2958.0,-5316.9 L-2951.9,-5316.5 L-2949.6,-5315.2 L-2947.7,-5312.4 L-2947.4,-5310.5 L-2947.7,-5308.7 L-2946.6,-5303.5 L-2946.8,-5301.7 L-2950.1,-5298.9 L-2951.2,-5296.3 L-2951.1,-5294.8 L-2951.9,-5292.1 L-2954.7,-5291.5 L-2961.8,-5292.9 L-2964.3,-5291.0" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2964.3,-5291.0 L-2965.1,-5287.9 L-2965.6,-5286.5 L-2966.4,-5285.1 L-2968.5,-5283.1 L-2969.9,-5280.4 L-2969.3,-5278.7 L-2969.4,-5276.9 L-2970.4,-5273.5 L-2971.9,-5271.9 L-2976.8,-5271.9 L-2978.2,-5271.2 L-2979.5,-5269.5 L-2980.5,-5267.6 L-2981.0,-5265.7 L-2981.1,-5262.9 L-2981.2,-5261.4 L-2981.9,-5259.6 L-2983.2,-5258.1 L-2984.5,-5257.0 L-2985.6,-5255.5 L-2986.1,-5252.8 L-2987.0,-5250.6 L-2989.9,-5249.3 L-2993.2,-5248.3 L-2995.3,-5247.2 L-2996.6,-5244.5 L-2997.5,-5240.5 L-2997.5,-5236.6 L-2996.3,-5233.7 L-2996.3,-5235.4 L-2994.6,-5235.9 L-2991.4,-5234.7 L-2990.7,-5232.7 L-2991.0,-5230.5 L-2990.6,-5228.9 L-2988.1,-5229.5 L-2985.5,-5228.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30.2,286.0 L30.3,289.4 L33.0,297.9 L33.7,302.2 L34.2,304.3 L35.5,307.0 L36.0,309.5 L37.2,311.6 L38.2,313.9 L37.2,316.2 L37.3,319.1 L38.8,321.3 L41.0,322.1 L42.6,322.7 L44.0,324.5 L44.7,327.6 L45.7,329.1 L47.1,329.6 L49.1,329.5 L50.5,331.0 L51.9,331.6 L53.1,333.1 L54.7,333.7 L61.2,333.3 L63.1,333.5 L66.5,336.9 L67.3,338.5 L67.4,340.2 L67.2,343.9 L68.8,347.5 L69.0,349.3 L69.1,351.3 L69.4,353.0 L71.3,359.3 L72.9,361.7 L73.4,363.1 L73.4,365.0 L72.7,368.7 L71.2,371.7 L70.6,373.6 L71.1,375.1 L71.8,378.0 L71.8,381.6 L71.6,383.1 L71.8,385.0 L73.0,387.6 L73.0,390.2 L72.6,391.9 L72.0,393.4 L70.9,394.7 L69.0,395.0 L68.3,397.3 L66.7,399.7 L65.8,402.4 L64.5,410.7 L64.4,413.7 L64.7,415.2 L64.9,418.7 L65.0,420.6 L65.0,422.2 L64.4,424.0 L63.2,425.3 L63.4,427.3 L68.2,433.5 L70.6,435.6 L75.9,438.9 L78.8,440.0 L82.2,440.6 L85.7,440.9 L97.6,438.7 L100.4,438.9 L104.8,440.9 L107.5,441.4 L110.8,442.7 L113.9,445.8 L115.3,452.0 L116.6,454.6 L119.0,456.2 L122.3,457.2 L125.8,457.7 L134.4,456.9 L135.7,457.5 L138.3,460.4 L139.7,461.4 L142.5,461.4 L144.8,462.4 L149.9,462.6 L152.2,464.2 L154.2,468.4 L155.5,469.8 L195.5,475.6 L198.4,477.1 L200.4,478.8 L202.3,481.3 L203.9,484.0 L204.8,486.7 L204.9,490.4 L204.0,493.4 L202.4,495.7 L197.8,498.8 L195.6,500.8 L194.1,503.6 L193.8,507.5 L194.0,509.0 L194.6,510.8 L195.2,512.4 L197.4,514.0 L199.9,513.6 L203.3,514.6 L205.2,516.6 L208.9,524.1 L210.7,526.6 L212.9,528.7 L215.4,529.9 L220.6,529.5 L222.3,528.7 L227.5,529.4 L229.1,528.9 L232.2,527.0 L237.9,525.9 L239.5,526.0 L240.9,526.7 L241.8,529.1 L241.8,530.8 L243.7,536.1 L246.1,539.6 L248.1,541.9 L255.9,545.9 L259.0,546.5 L261.0,548.0 L262.6,548.5 L265.8,549.0 L268.2,550.5 L270.4,552.2 L274.1,553.0 L276.5,554.1 L278.6,555.9 L280.2,558.2 L281.1,560.8 L281.5,564.6 L282.3,565.9 L284.0,566.5 L285.8,566.7 L293.8,568.6 L296.8,568.7 L305.7,567.2 L322.9,569.3 L325.0,570.2 L326.8,570.5 L329.1,571.5 L331.9,571.8 L333.5,572.5 L334.7,573.5 L338.1,573.7 L340.0,574.5 L341.1,575.5 L343.9,574.8 L345.3,573.9 L347.9,572.2 L349.7,572.0 L353.2,572.7 L359.1,574.9 L361.6,576.6 L363.5,577.0 L366.5,576.0 L370.0,576.1 L379.9,574.3 L389.1,574.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M389.6,574.3 L391.4,575.5 L396.3,574.8 L398.4,575.5 L418.5,578.3 L423.3,578.4 L445.2,586.2 L450.1,589.4 L454.4,590.4 L461.2,598.0 L467.2,599.6 L469.7,600.9 L471.6,602.7 L473.4,605.4 L474.5,606.8 L476.9,607.9 L485.7,613.6 L487.7,615.5 L490.2,616.5 L502.6,618.1 L507.5,622.0 L509.0,622.5 L512.3,622.7 L514.3,623.9 L515.8,624.2 L518.0,626.3 L518.9,627.9 L519.9,629.9 L529.1,631.1 L531.1,632.0 L532.7,632.0 L534.1,631.2 L536.6,631.2 L540.7,632.8 L550.4,634.4 L553.2,636.1 L556.7,639.9 L558.3,645.7 L559.6,647.9 L561.7,649.5 L562.9,651.2 L563.6,652.9 L566.1,654.8 L567.3,656.0 L568.6,656.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-945.2,-3519.2 L-947.0,-3518.7 L-949.9,-3518.4 L-952.5,-3520.3 L-954.8,-3522.9 L-963.9,-3529.1 L-968.0,-3533.6 L-984.5,-3556.8 L-985.9,-3559.1 L-988.9,-3563.1 L-996.7,-3571.1 L-998.5,-3575.0 L-1001.5,-3578.8 L-1006.9,-3583.4 L-1011.2,-3588.5 L-1013.6,-3591.2 L-1019.4,-3599.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1035.2,-3608.6 L-1033.8,-3607.9 L-1031.8,-3607.3 L-1029.9,-3604.6 L-1027.7,-3603.0 L-1024.1,-3601.3 L-1020.9,-3601.3 L-1019.4,-3599.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-945.1,-3519.2 L-943.4,-3519.7 L-941.8,-3518.7 L-938.6,-3520.0 L-933.9,-3515.8 L-931.4,-3516.7 L-929.6,-3515.3 L-926.6,-3513.1 L-925.0,-3512.6 L-923.8,-3511.7 L-923.1,-3510.2 L-921.9,-3509.2 L-921.0,-3511.1 L-917.3,-3509.2 L-916.5,-3507.3 L-916.1,-3505.7 L-915.2,-3504.4 L-914.3,-3503.0 L-911.1,-3501.6 L-909.8,-3500.2 L-908.5,-3499.4 L-907.4,-3498.2 L-907.1,-3496.2 L-908.6,-3494.8 L-906.6,-3492.3 L-904.4,-3492.3 L-902.5,-3492.3 L-901.3,-3490.8 L-899.7,-3491.2 L-898.5,-3490.2 L-896.8,-3491.5 L-894.8,-3492.2 L-893.2,-3491.7 L-888.8,-3486.5 L-887.1,-3486.3 L-885.7,-3487.2 L-883.8,-3486.8 L-882.2,-3488.9 L-877.7,-3491.0 L-873.0,-3492.3 L-870.6,-3493.8 L-870.4,-3496.0 L-871.0,-3498.9 L-871.1,-3502.5 L-869.8,-3503.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M89.0,-42.8 L91.2,-43.9 L97.1,-44.6 L103.3,-43.3 L106.0,-43.7 L108.6,-44.6 L111.0,-43.8 L112.7,-41.9 L113.4,-40.1 L113.7,-38.4 L114.7,-37.1 L116.3,-36.5 L117.4,-34.7 L118.0,-32.8 L118.1,-31.1 L118.0,-29.4 L117.0,-25.4 L117.9,-23.5 L120.1,-23.4 L122.1,-24.1 L124.0,-23.6 L126.1,-24.2 L128.2,-23.6 L130.8,-23.2 L132.1,-22.3 L134.9,-22.0 L136.4,-22.6 L137.7,-23.3 L139.3,-24.9 L140.6,-26.4 L142.8,-25.5 L145.1,-25.6 L147.2,-27.0 L154.2,-28.1 L157.2,-23.6 L159.1,-21.6 L160.7,-19.6 L161.8,-17.0 L162.3,-13.5 L162.3,-10.4 L159.9,1.5 L160.7,4.5 L160.8,6.7 L161.8,9.2 L164.8,12.6 L166.0,14.6 L167.0,17.2 L167.4,19.7 L165.7,21.0 L165.6,23.6 L167.9,25.0 L170.6,25.0 L181.6,22.0 L184.0,22.1 L186.4,23.6 L188.1,25.6 L189.5,29.4 L192.8,31.5 L194.6,33.2 L196.2,35.7 L203.0,37.1 L204.6,36.5 L206.0,37.5 L211.0,37.6 L213.4,37.1 L215.4,38.3 L216.6,39.4 L219.6,39.2 L221.4,39.9 L222.9,42.2 L228.4,48.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2690.1,-5660.0 L-2690.7,-5658.0 L-2692.2,-5656.9 L-2694.2,-5656.6 L-2696.1,-5656.7 L-2697.6,-5656.6 L-2699.7,-5656.6 L-2703.5,-5657.0 L-2706.0,-5657.0" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2430.0,-5676.8 L-2431.6,-5676.6 L-2434.0,-5675.7 L-2437.2,-5672.8 L-2439.2,-5670.5 L-2442.7,-5665.0 L-2443.2,-5663.6 L-2444.1,-5660.0 L-2444.8,-5658.6 L-2445.7,-5657.2 L-2446.9,-5652.7 L-2449.6,-5648.9 L-2454.7,-5644.3 L-2456.7,-5644.3 L-2459.2,-5643.3 L-2466.7,-5644.3 L-2468.8,-5644.0 L-2471.1,-5641.4 L-2472.1,-5639.5 L-2473.2,-5635.8 L-2474.9,-5633.7 L-2484.2,-5628.3 L-2489.8,-5627.7 L-2493.0,-5625.7 L-2494.4,-5624.2 L-2496.8,-5623.3 L-2498.8,-5622.5 L-2498.6,-5620.7 L-2500.9,-5618.8 L-2502.4,-5618.0 L-2504.6,-5618.8 L-2506.1,-5619.1 L-2515.4,-5618.4 L-2517.5,-5617.8 L-2521.2,-5619.5 L-2524.0,-5619.5 L-2526.5,-5620.7 L-2529.3,-5621.2 L-2531.5,-5620.3 L-2535.4,-5620.5 L-2541.2,-5622.8 L-2544.3,-5623.5 L-2550.5,-5622.9 L-2551.9,-5623.5 L-2553.2,-5624.6 L-2554.6,-5625.3 L-2556.3,-5624.6 L-2557.5,-5626.1 L-2559.3,-5626.3 L-2560.4,-5627.9 L-2560.7,-5629.6 L-2563.2,-5631.9 L-2565.2,-5633.0 L-2571.4,-5634.3 L-2573.4,-5635.0 L-2575.3,-5637.4 L-2577.1,-5638.5 L-2578.5,-5639.8 L-2578.0,-5641.4 L-2584.1,-5648.7 L-2584.2,-5650.4 L-2585.2,-5651.6 L-2585.0,-5653.2 L-2585.9,-5655.0 L-2588.3,-5656.4 L-2589.6,-5658.3 L-2590.5,-5660.7 L-2592.4,-5661.5 L-2597.2,-5664.5 L-2606.7,-5667.3 L-2608.3,-5666.3 L-2610.4,-5666.2 L-2614.8,-5666.7 L-2616.7,-5666.1 L-2620.4,-5663.2 L-2622.6,-5662.7 L-2624.3,-5661.9 L-2625.9,-5661.1 L-2626.6,-5659.6 L-2628.2,-5659.0 L-2629.3,-5660.0 L-2630.8,-5659.1 L-2634.5,-5658.6 L-2634.7,-5657.1 L-2637.6,-5656.2 L-2638.1,-5657.8 L-2639.6,-5656.7 L-2641.3,-5657.2 L-2644.0,-5658.7 L-2645.3,-5659.9 L-2650.6,-5663.4 L-2654.5,-5667.3 L-2656.8,-5668.6 L-2659.8,-5668.4 L-2664.1,-5666.4 L-2665.6,-5666.2 L-2667.2,-5667.6 L-2670.1,-5666.5 L-2673.8,-5666.1 L-2676.0,-5664.7 L-2678.2,-5664.6 L-2680.0,-5663.3 L-2681.2,-5661.8 L-2682.4,-5660.5 L-2684.3,-5660.0 L-2685.7,-5660.7 L-2686.9,-5662.0 L-2688.4,-5662.5 L-2689.9,-5661.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1897.5,-4755.2 L-1899.7,-4756.8 L-1901.7,-4756.9 L-1902.9,-4755.0 L-1903.2,-4751.8 L-1903.8,-4750.1 L-1904.5,-4748.7 L-1906.0,-4747.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1894.3,-4769.4 L-1894.4,-4761.1 L-1895.1,-4757.0 L-1897.5,-4755.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1990.1,-4677.1 L-1984.3,-4672.1 L-1982.1,-4669.0 L-1980.4,-4665.0 L-1979.9,-4663.4 L-1978.5,-4661.0 L-1977.2,-4660.2 L-1975.4,-4659.7 L-1973.7,-4660.0 L-1970.3,-4661.2 L-1967.9,-4660.8 L-1966.5,-4662.2 L-1965.5,-4667.1 L-1964.6,-4668.9 L-1963.4,-4670.1 L-1962.1,-4670.8 L-1960.6,-4671.2 L-1958.8,-4671.7 L-1957.2,-4672.4 L-1948.5,-4678.8 L-1947.2,-4680.1 L-1944.0,-4684.8 L-1941.5,-4690.2 L-1941.2,-4691.7 L-1940.7,-4694.9 L-1939.2,-4697.8 L-1936.4,-4698.0 L-1934.8,-4698.3 L-1933.6,-4700.0 L-1930.7,-4699.2 L-1928.4,-4699.7 L-1927.1,-4701.3 L-1926.1,-4703.2 L-1925.6,-4705.0 L-1925.0,-4709.6 L-1924.4,-4711.8 L-1923.3,-4713.7 L-1920.9,-4716.3 L-1919.7,-4719.9 L-1919.2,-4721.6 L-1917.4,-4722.5 L-1916.4,-4723.8 L-1916.1,-4728.4 L-1916.6,-4733.3 L-1916.6,-4734.9 L-1916.1,-4736.6 L-1916.8,-4738.9 L-1917.3,-4742.5 L-1917.3,-4744.2 L-1916.1,-4746.2 L-1913.9,-4745.2 L-1911.2,-4745.6 L-1908.1,-4747.6 L-1906.0,-4747.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M53.9,217.3 L97.8,229.6 L131.5,231.2 L163.1,231.2 L198.9,239.4 L239.3,250.1 L279.8,258.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="189" cy="51" rx="12" ry="6" fill="#64b5f6"/><ellipse cx="203" cy="61" rx="8" ry="5" fill="#64b5f6"/><ellipse cx="179" cy="42" rx="7" ry="4" fill="#64b5f6"/><circle cx="129" cy="89" r="3.6" fill="#c62828" stroke="#fff" stroke-width="1.2"/><text x="135" y="93" font-size="9.5" fill="#4e342e" text-anchor="start">Ciudad de Mendoza</text><circle cx="163" cy="230" r="3.6" fill="#c62828" stroke="#fff" stroke-width="1.2"/><text x="169" y="234" font-size="9.5" fill="#4e342e" text-anchor="start">San Rafael</text><circle cx="79" cy="301" r="3.6" fill="#c62828" stroke="#fff" stroke-width="1.2"/><text x="85" y="304" font-size="9.5" fill="#4e342e" text-anchor="start">Malargüe</text><text x="12" y="244" font-size="11" fill="#78909c" transform="rotate(-90 12 244)">CHILE</text><text x="150" y="13" font-size="11" fill="#78909c">SAN JUAN</text><text x="291" y="140" font-size="11" fill="#78909c" transform="rotate(90 291 140)">SAN LUIS</text><text x="268" y="420" font-size="11" fill="#78909c">LA PAMPA</text><text x="120" y="481" font-size="11" fill="#78909c">NEUQUÉN</text><g id="c_zH" class="capa"><rect x="104" y="152" width="92" height="22" rx="10" fill="#fbc02d" stroke="#fff" stroke-width="2"/><text x="150" y="168" font-size="13" fill="#fff">Huarpes</text></g><g id="c_zPu" class="capa"><rect x="159" y="305" width="92" height="22" rx="10" fill="#ef6c00" stroke="#fff" stroke-width="2"/><text x="205" y="321" font-size="13" fill="#fff">Puelches</text></g><g id="c_zPe" class="capa"><rect x="39" y="352" width="92" height="22" rx="10" fill="#2e7d32" stroke="#fff" stroke-width="2"/><text x="85" y="368" font-size="13" fill="#fff">Pehuenches</text></g><g id="c_guan" class="capa"><ellipse cx="189" cy="51" rx="28" ry="22" fill="none" stroke="#1565c0" stroke-width="3" stroke-dasharray="5 4"/><rect x="39" y="37" width="118" height="18" rx="8" fill="#1565c0"/><text x="98" y="50" font-size="9.5" fill="#fff">Lagunas de Guanacache</text></g><g id="c_andes" class="capa"><rect x="64" y="120" width="74" height="30" rx="8" fill="#6d4c41"/><text x="101" y="132" font-size="9" fill="#fff">cordillera</text><text x="101" y="144" font-size="9" fill="#fff">de los Andes</text></g><g id="c_rosa" class="capa"><circle cx="258" cy="455" r="22" fill="#fff" stroke="#90a4ae" stroke-width="1.5"/>
    <path d="M258,437 L263,455 L258,473 L253,455Z" fill="#c62828"/><path d="M240,455 L258,450 L276,455 L258,460Z" fill="#455a64"/>
    <text x="258" y="430" font-size="10" fill="#c62828">N</text><text x="258" y="488" font-size="10" fill="#455a64">S</text>
    <text x="288" y="459" font-size="10" fill="#455a64">E</text><text x="228" y="459" font-size="10" fill="#455a64">O</text></g></svg>`,

    // ---------- Mapa de Mendoza (tocar la zona) ----------
    mapaInter: `<svg viewBox="0 0 300 488" class="mapaSvg" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle"><defs><clipPath id="clipI"><path d="M49.9,122.9 L47.8,118.0 L47.1,116.9 L44.8,114.9 L43.8,113.7 L43.2,112.3 L43.2,110.7 L44.3,105.9 L44.1,104.2 L43.5,102.9 L43.1,101.6 L43.6,99.9 L44.6,99.1 L46.8,98.5 L48.3,96.5 L48.9,93.1 L49.4,91.6 L50.6,89.3 L49.6,87.5 L48.1,86.9 L46.9,86.2 L44.7,83.9 L41.1,79.4 L40.1,76.9 L38.4,68.1 L38.4,66.2 L38.5,64.7 L39.1,63.4 L40.6,63.3 L39.9,60.9 L39.8,59.5 L39.9,57.9 L39.7,56.2 L38.9,54.5 L37.9,53.6 L35.2,52.0 L34.0,49.5 L34.2,43.5 L33.3,42.2 L44.4,40.1 L47.2,40.1 L48.8,40.8 L51.8,41.4 L65.0,38.1 L72.8,37.8 L74.1,37.1 L75.2,36.0 L75.7,34.6 L75.5,28.9 L76.0,27.5 L76.7,26.5 L78.0,25.7 L82.2,24.3 L83.6,23.6 L86.1,21.7 L87.4,20.9 L89.6,20.5 L93.2,20.6 L96.6,21.2 L98.3,20.8 L99.3,19.9 L100.4,17.3 L101.2,16.2 L102.8,15.7 L104.5,13.6 L105.6,12.9 L107.3,12.9 L108.9,13.8 L112.4,18.0 L113.1,19.5 L114.0,20.9 L115.3,22.2 L118.6,23.0 L121.8,22.2 L123.1,22.4 L124.6,43.1 L125.7,44.0 L138.9,43.9 L142.4,42.0 L154.2,33.5 L156.5,31.6 L157.4,30.0 L158.9,28.7 L167.0,28.2 L168.4,27.8 L170.8,26.7 L173.4,24.5 L181.6,22.0 L184.0,22.1 L186.4,23.6 L188.1,25.6 L188.8,26.7 L189.5,29.4 L192.9,31.5 L193.8,32.3 L194.7,33.2 L196.2,35.7 L203.0,37.1 L204.1,36.6 L206.3,36.2 L208.8,35.9 L212.8,35.0 L217.2,35.0 L218.9,34.5 L221.3,34.3 L226.3,37.9 L226.5,41.4 L228.4,48.9 L229.9,50.0 L231.2,51.7 L231.2,53.7 L231.9,54.9 L232.5,56.3 L232.8,58.5 L233.7,61.0 L234.1,63.3 L235.4,70.0 L236.3,72.0 L237.2,72.9 L238.4,74.2 L238.6,75.6 L238.9,77.0 L239.9,78.8 L238.7,81.3 L238.3,83.6 L238.9,87.7 L238.9,89.7 L237.9,90.5 L238.1,93.8 L239.5,97.3 L239.1,99.8 L239.3,101.6 L239.8,103.2 L240.4,110.7 L240.0,117.2 L240.5,119.3 L240.9,123.1 L242.5,126.9 L242.7,128.4 L242.5,132.0 L242.6,133.6 L243.2,135.5 L249.6,146.7 L251.0,148.2 L252.3,151.9 L253.6,156.2 L255.2,159.0 L256.8,164.5 L257.0,166.1 L258.7,168.1 L261.2,169.8 L262.3,170.7 L263.3,171.9 L264.1,173.3 L264.8,177.1 L265.7,178.2 L266.8,179.0 L267.7,179.8 L268.2,181.1 L268.7,183.6 L269.9,185.7 L270.0,186.9 L269.6,189.4 L269.3,193.7 L269.0,195.5 L268.1,196.7 L266.7,196.1 L265.8,197.6 L264.9,199.2 L265.3,202.3 L265.5,208.7 L266.3,210.2 L265.4,211.9 L267.1,213.9 L267.7,215.5 L268.1,222.5 L269.7,227.8 L270.0,229.6 L270.5,230.9 L273.7,234.4 L281.7,250.3 L283.4,256.2 L283.6,257.9 L282.9,262.2 L284.1,266.4 L284.3,267.8 L285.8,271.3 L286.2,272.6 L286.1,274.0 L284.8,278.7 L285.5,279.7 L286.2,281.0 L285.8,282.9 L285.2,284.1 L286.1,289.2 L286.2,290.5 L285.4,295.6 L285.1,302.9 L284.8,304.6 L282.8,309.2 L282.0,317.5 L279.2,330.4 L278.7,336.4 L277.8,340.2 L277.8,341.6 L278.2,344.2 L248.8,344.3 L243.7,344.3 L168.8,344.3 L167.5,344.9 L166.4,346.1 L165.7,351.6 L165.6,354.9 L165.7,356.2 L168.1,367.1 L168.6,412.7 L168.6,472.1 L156.6,470.5 L155.5,469.8 L154.3,468.4 L152.2,464.1 L151.2,463.1 L149.9,462.6 L145.5,462.5 L143.3,461.6 L140.4,461.4 L138.3,460.4 L135.7,457.5 L134.4,456.9 L125.8,457.7 L122.3,457.2 L119.0,456.2 L116.6,454.6 L115.3,452.0 L113.9,445.8 L112.0,443.4 L110.8,442.7 L107.6,441.4 L104.8,440.9 L100.4,438.9 L97.6,438.7 L85.7,440.9 L82.2,440.6 L78.8,440.0 L75.9,438.9 L70.6,435.6 L68.2,433.5 L63.4,427.3 L63.0,426.2 L64.4,424.0 L65.0,422.2 L65.0,420.6 L64.9,418.7 L64.7,415.2 L63.7,413.9 L61.5,412.8 L59.8,412.0 L56.8,409.6 L55.8,408.3 L54.9,405.0 L54.3,403.5 L53.5,402.3 L51.3,400.2 L50.0,399.6 L49.0,398.6 L48.4,397.1 L47.0,395.7 L46.0,394.6 L40.6,392.8 L39.6,392.1 L38.7,391.0 L37.3,388.1 L35.3,382.9 L35.1,381.6 L33.6,375.9 L32.3,374.3 L31.2,373.8 L29.9,374.1 L29.1,375.1 L28.0,375.5 L26.8,374.8 L25.9,373.2 L25.1,371.1 L24.8,369.5 L24.7,368.2 L25.1,366.9 L26.0,366.0 L26.4,364.1 L26.5,361.7 L26.2,360.2 L25.7,359.0 L24.5,357.4 L22.0,355.6 L22.1,354.0 L22.9,351.3 L24.5,349.2 L24.7,346.9 L22.7,341.9 L23.3,339.3 L24.2,338.4 L24.7,337.3 L22.8,336.9 L22.2,333.6 L26.5,329.2 L26.2,326.6 L25.2,324.8 L22.1,316.5 L22.1,315.2 L22.8,312.2 L22.8,310.6 L22.4,307.3 L23.0,303.9 L22.5,302.7 L21.5,301.6 L20.5,300.2 L18.9,294.8 L18.8,293.5 L20.9,292.5 L20.9,289.6 L18.5,288.2 L15.5,287.8 L12.8,286.9 L11.5,283.7 L14.0,279.6 L24.5,276.1 L25.7,270.4 L25.5,264.6 L26.7,258.6 L31.9,245.9 L30.8,244.2 L29.8,243.0 L29.2,241.5 L30.8,240.8 L32.1,240.0 L33.6,237.5 L34.2,231.2 L35.2,228.4 L36.5,227.0 L39.3,224.5 L40.4,222.9 L41.9,218.9 L42.9,217.1 L46.0,214.4 L46.6,212.9 L46.6,211.0 L46.3,208.6 L46.2,206.1 L46.7,204.3 L47.8,203.1 L51.3,202.5 L52.7,202.5 L54.1,202.9 L56.5,203.7 L57.1,202.4 L61.8,200.3 L61.5,197.6 L59.9,194.4 L59.1,191.9 L59.4,190.5 L59.7,189.2 L60.3,183.0 L60.3,179.1 L59.6,176.9 L58.4,176.6 L56.7,176.8 L56.8,174.5 L57.4,171.3 L57.5,169.9 L56.3,163.5 L56.3,161.7 L59.2,158.9 L60.0,158.0 L60.0,156.7 L58.2,154.1 L57.6,152.7 L57.7,151.1 L59.1,146.5 L58.8,144.9 L59.0,143.3 L60.7,142.4 L61.5,141.1 L61.7,137.3 L62.0,136.0 L62.7,134.7 L64.4,132.4 L64.9,131.1 L64.9,129.5 L63.7,126.6 L63.1,122.1 L61.6,120.2 L59.3,118.9 L56.9,117.9 L54.6,118.3 L51.6,122.5 L49.9,122.9Z"/></clipPath></defs><rect width="300" height="488" fill="#eaf4f4"/><path d="M49.9,122.9 L47.8,118.0 L47.1,116.9 L44.8,114.9 L43.8,113.7 L43.2,112.3 L43.2,110.7 L44.3,105.9 L44.1,104.2 L43.5,102.9 L43.1,101.6 L43.6,99.9 L44.6,99.1 L46.8,98.5 L48.3,96.5 L48.9,93.1 L49.4,91.6 L50.6,89.3 L49.6,87.5 L48.1,86.9 L46.9,86.2 L44.7,83.9 L41.1,79.4 L40.1,76.9 L38.4,68.1 L38.4,66.2 L38.5,64.7 L39.1,63.4 L40.6,63.3 L39.9,60.9 L39.8,59.5 L39.9,57.9 L39.7,56.2 L38.9,54.5 L37.9,53.6 L35.2,52.0 L34.0,49.5 L34.2,43.5 L33.3,42.2 L44.4,40.1 L47.2,40.1 L48.8,40.8 L51.8,41.4 L65.0,38.1 L72.8,37.8 L74.1,37.1 L75.2,36.0 L75.7,34.6 L75.5,28.9 L76.0,27.5 L76.7,26.5 L78.0,25.7 L82.2,24.3 L83.6,23.6 L86.1,21.7 L87.4,20.9 L89.6,20.5 L93.2,20.6 L96.6,21.2 L98.3,20.8 L99.3,19.9 L100.4,17.3 L101.2,16.2 L102.8,15.7 L104.5,13.6 L105.6,12.9 L107.3,12.9 L108.9,13.8 L112.4,18.0 L113.1,19.5 L114.0,20.9 L115.3,22.2 L118.6,23.0 L121.8,22.2 L123.1,22.4 L124.6,43.1 L125.7,44.0 L138.9,43.9 L142.4,42.0 L154.2,33.5 L156.5,31.6 L157.4,30.0 L158.9,28.7 L167.0,28.2 L168.4,27.8 L170.8,26.7 L173.4,24.5 L181.6,22.0 L184.0,22.1 L186.4,23.6 L188.1,25.6 L188.8,26.7 L189.5,29.4 L192.9,31.5 L193.8,32.3 L194.7,33.2 L196.2,35.7 L203.0,37.1 L204.1,36.6 L206.3,36.2 L208.8,35.9 L212.8,35.0 L217.2,35.0 L218.9,34.5 L221.3,34.3 L226.3,37.9 L226.5,41.4 L228.4,48.9 L229.9,50.0 L231.2,51.7 L231.2,53.7 L231.9,54.9 L232.5,56.3 L232.8,58.5 L233.7,61.0 L234.1,63.3 L235.4,70.0 L236.3,72.0 L237.2,72.9 L238.4,74.2 L238.6,75.6 L238.9,77.0 L239.9,78.8 L238.7,81.3 L238.3,83.6 L238.9,87.7 L238.9,89.7 L237.9,90.5 L238.1,93.8 L239.5,97.3 L239.1,99.8 L239.3,101.6 L239.8,103.2 L240.4,110.7 L240.0,117.2 L240.5,119.3 L240.9,123.1 L242.5,126.9 L242.7,128.4 L242.5,132.0 L242.6,133.6 L243.2,135.5 L249.6,146.7 L251.0,148.2 L252.3,151.9 L253.6,156.2 L255.2,159.0 L256.8,164.5 L257.0,166.1 L258.7,168.1 L261.2,169.8 L262.3,170.7 L263.3,171.9 L264.1,173.3 L264.8,177.1 L265.7,178.2 L266.8,179.0 L267.7,179.8 L268.2,181.1 L268.7,183.6 L269.9,185.7 L270.0,186.9 L269.6,189.4 L269.3,193.7 L269.0,195.5 L268.1,196.7 L266.7,196.1 L265.8,197.6 L264.9,199.2 L265.3,202.3 L265.5,208.7 L266.3,210.2 L265.4,211.9 L267.1,213.9 L267.7,215.5 L268.1,222.5 L269.7,227.8 L270.0,229.6 L270.5,230.9 L273.7,234.4 L281.7,250.3 L283.4,256.2 L283.6,257.9 L282.9,262.2 L284.1,266.4 L284.3,267.8 L285.8,271.3 L286.2,272.6 L286.1,274.0 L284.8,278.7 L285.5,279.7 L286.2,281.0 L285.8,282.9 L285.2,284.1 L286.1,289.2 L286.2,290.5 L285.4,295.6 L285.1,302.9 L284.8,304.6 L282.8,309.2 L282.0,317.5 L279.2,330.4 L278.7,336.4 L277.8,340.2 L277.8,341.6 L278.2,344.2 L248.8,344.3 L243.7,344.3 L168.8,344.3 L167.5,344.9 L166.4,346.1 L165.7,351.6 L165.6,354.9 L165.7,356.2 L168.1,367.1 L168.6,412.7 L168.6,472.1 L156.6,470.5 L155.5,469.8 L154.3,468.4 L152.2,464.1 L151.2,463.1 L149.9,462.6 L145.5,462.5 L143.3,461.6 L140.4,461.4 L138.3,460.4 L135.7,457.5 L134.4,456.9 L125.8,457.7 L122.3,457.2 L119.0,456.2 L116.6,454.6 L115.3,452.0 L113.9,445.8 L112.0,443.4 L110.8,442.7 L107.6,441.4 L104.8,440.9 L100.4,438.9 L97.6,438.7 L85.7,440.9 L82.2,440.6 L78.8,440.0 L75.9,438.9 L70.6,435.6 L68.2,433.5 L63.4,427.3 L63.0,426.2 L64.4,424.0 L65.0,422.2 L65.0,420.6 L64.9,418.7 L64.7,415.2 L63.7,413.9 L61.5,412.8 L59.8,412.0 L56.8,409.6 L55.8,408.3 L54.9,405.0 L54.3,403.5 L53.5,402.3 L51.3,400.2 L50.0,399.6 L49.0,398.6 L48.4,397.1 L47.0,395.7 L46.0,394.6 L40.6,392.8 L39.6,392.1 L38.7,391.0 L37.3,388.1 L35.3,382.9 L35.1,381.6 L33.6,375.9 L32.3,374.3 L31.2,373.8 L29.9,374.1 L29.1,375.1 L28.0,375.5 L26.8,374.8 L25.9,373.2 L25.1,371.1 L24.8,369.5 L24.7,368.2 L25.1,366.9 L26.0,366.0 L26.4,364.1 L26.5,361.7 L26.2,360.2 L25.7,359.0 L24.5,357.4 L22.0,355.6 L22.1,354.0 L22.9,351.3 L24.5,349.2 L24.7,346.9 L22.7,341.9 L23.3,339.3 L24.2,338.4 L24.7,337.3 L22.8,336.9 L22.2,333.6 L26.5,329.2 L26.2,326.6 L25.2,324.8 L22.1,316.5 L22.1,315.2 L22.8,312.2 L22.8,310.6 L22.4,307.3 L23.0,303.9 L22.5,302.7 L21.5,301.6 L20.5,300.2 L18.9,294.8 L18.8,293.5 L20.9,292.5 L20.9,289.6 L18.5,288.2 L15.5,287.8 L12.8,286.9 L11.5,283.7 L14.0,279.6 L24.5,276.1 L25.7,270.4 L25.5,264.6 L26.7,258.6 L31.9,245.9 L30.8,244.2 L29.8,243.0 L29.2,241.5 L30.8,240.8 L32.1,240.0 L33.6,237.5 L34.2,231.2 L35.2,228.4 L36.5,227.0 L39.3,224.5 L40.4,222.9 L41.9,218.9 L42.9,217.1 L46.0,214.4 L46.6,212.9 L46.6,211.0 L46.3,208.6 L46.2,206.1 L46.7,204.3 L47.8,203.1 L51.3,202.5 L52.7,202.5 L54.1,202.9 L56.5,203.7 L57.1,202.4 L61.8,200.3 L61.5,197.6 L59.9,194.4 L59.1,191.9 L59.4,190.5 L59.7,189.2 L60.3,183.0 L60.3,179.1 L59.6,176.9 L58.4,176.6 L56.7,176.8 L56.8,174.5 L57.4,171.3 L57.5,169.9 L56.3,163.5 L56.3,161.7 L59.2,158.9 L60.0,158.0 L60.0,156.7 L58.2,154.1 L57.6,152.7 L57.7,151.1 L59.1,146.5 L58.8,144.9 L59.0,143.3 L60.7,142.4 L61.5,141.1 L61.7,137.3 L62.0,136.0 L62.7,134.7 L64.4,132.4 L64.9,131.1 L64.9,129.5 L63.7,126.6 L63.1,122.1 L61.6,120.2 L59.3,118.9 L56.9,117.9 L54.6,118.3 L51.6,122.5 L49.9,122.9Z" fill="#fff6e0" stroke="#6d4c41" stroke-width="2.2" stroke-linejoin="round"/><path id="zona0" class="zona" data-c="#fbc02d" d="M-16.9,-65.6 L320.2,-65.6 L320.2,258.3 L239.3,248.5 L198.9,237.8 L163.1,229.6 L131.5,229.6 L97.8,228.0 L53.9,214.8 L-16.9,196.8Z" clip-path="url(#clipI)" fill="#ffffff" fill-opacity="0"/><path id="zona1" class="zona" data-c="#ef6c00" d="M107.9,228.5 L131.5,229.6 L163.1,229.6 L198.9,237.8 L239.3,248.5 L320.2,258.3 L320.2,549.4 L118.0,549.4 L118.0,360.8Z" clip-path="url(#clipI)" fill="#ffffff" fill-opacity="0"/><path id="zona2" class="zona" data-c="#2e7d32" d="M-16.9,196.8 L53.9,214.8 L97.8,228.0 L107.9,228.5 L118.0,360.8 L118.0,549.4 L-16.9,549.4Z" clip-path="url(#clipI)" fill="#ffffff" fill-opacity="0"/><path d="M49.9,122.9 L47.8,118.0 L47.1,116.9 L44.8,114.9 L43.8,113.7 L43.2,112.3 L43.2,110.7 L44.3,105.9 L44.1,104.2 L43.5,102.9 L43.1,101.6 L43.6,99.9 L44.6,99.1 L46.8,98.5 L48.3,96.5 L48.9,93.1 L49.4,91.6 L50.6,89.3 L49.6,87.5 L48.1,86.9 L46.9,86.2 L44.7,83.9 L41.1,79.4 L40.1,76.9 L38.4,68.1 L38.4,66.2 L38.5,64.7 L39.1,63.4 L40.6,63.3 L39.9,60.9 L39.8,59.5 L39.9,57.9 L39.7,56.2 L38.9,54.5 L37.9,53.6 L35.2,52.0 L34.0,49.5 L34.2,43.5 L33.3,42.2 L44.4,40.1 L47.2,40.1 L48.8,40.8 L51.8,41.4 L65.0,38.1 L72.8,37.8 L74.1,37.1 L75.2,36.0 L75.7,34.6 L75.5,28.9 L76.0,27.5 L76.7,26.5 L78.0,25.7 L82.2,24.3 L83.6,23.6 L86.1,21.7 L87.4,20.9 L89.6,20.5 L93.2,20.6 L96.6,21.2 L98.3,20.8 L99.3,19.9 L100.4,17.3 L101.2,16.2 L102.8,15.7 L104.5,13.6 L105.6,12.9 L107.3,12.9 L108.9,13.8 L112.4,18.0 L113.1,19.5 L114.0,20.9 L115.3,22.2 L118.6,23.0 L121.8,22.2 L123.1,22.4 L124.6,43.1 L125.7,44.0 L138.9,43.9 L142.4,42.0 L154.2,33.5 L156.5,31.6 L157.4,30.0 L158.9,28.7 L167.0,28.2 L168.4,27.8 L170.8,26.7 L173.4,24.5 L181.6,22.0 L184.0,22.1 L186.4,23.6 L188.1,25.6 L188.8,26.7 L189.5,29.4 L192.9,31.5 L193.8,32.3 L194.7,33.2 L196.2,35.7 L203.0,37.1 L204.1,36.6 L206.3,36.2 L208.8,35.9 L212.8,35.0 L217.2,35.0 L218.9,34.5 L221.3,34.3 L226.3,37.9 L226.5,41.4 L228.4,48.9 L229.9,50.0 L231.2,51.7 L231.2,53.7 L231.9,54.9 L232.5,56.3 L232.8,58.5 L233.7,61.0 L234.1,63.3 L235.4,70.0 L236.3,72.0 L237.2,72.9 L238.4,74.2 L238.6,75.6 L238.9,77.0 L239.9,78.8 L238.7,81.3 L238.3,83.6 L238.9,87.7 L238.9,89.7 L237.9,90.5 L238.1,93.8 L239.5,97.3 L239.1,99.8 L239.3,101.6 L239.8,103.2 L240.4,110.7 L240.0,117.2 L240.5,119.3 L240.9,123.1 L242.5,126.9 L242.7,128.4 L242.5,132.0 L242.6,133.6 L243.2,135.5 L249.6,146.7 L251.0,148.2 L252.3,151.9 L253.6,156.2 L255.2,159.0 L256.8,164.5 L257.0,166.1 L258.7,168.1 L261.2,169.8 L262.3,170.7 L263.3,171.9 L264.1,173.3 L264.8,177.1 L265.7,178.2 L266.8,179.0 L267.7,179.8 L268.2,181.1 L268.7,183.6 L269.9,185.7 L270.0,186.9 L269.6,189.4 L269.3,193.7 L269.0,195.5 L268.1,196.7 L266.7,196.1 L265.8,197.6 L264.9,199.2 L265.3,202.3 L265.5,208.7 L266.3,210.2 L265.4,211.9 L267.1,213.9 L267.7,215.5 L268.1,222.5 L269.7,227.8 L270.0,229.6 L270.5,230.9 L273.7,234.4 L281.7,250.3 L283.4,256.2 L283.6,257.9 L282.9,262.2 L284.1,266.4 L284.3,267.8 L285.8,271.3 L286.2,272.6 L286.1,274.0 L284.8,278.7 L285.5,279.7 L286.2,281.0 L285.8,282.9 L285.2,284.1 L286.1,289.2 L286.2,290.5 L285.4,295.6 L285.1,302.9 L284.8,304.6 L282.8,309.2 L282.0,317.5 L279.2,330.4 L278.7,336.4 L277.8,340.2 L277.8,341.6 L278.2,344.2 L248.8,344.3 L243.7,344.3 L168.8,344.3 L167.5,344.9 L166.4,346.1 L165.7,351.6 L165.6,354.9 L165.7,356.2 L168.1,367.1 L168.6,412.7 L168.6,472.1 L156.6,470.5 L155.5,469.8 L154.3,468.4 L152.2,464.1 L151.2,463.1 L149.9,462.6 L145.5,462.5 L143.3,461.6 L140.4,461.4 L138.3,460.4 L135.7,457.5 L134.4,456.9 L125.8,457.7 L122.3,457.2 L119.0,456.2 L116.6,454.6 L115.3,452.0 L113.9,445.8 L112.0,443.4 L110.8,442.7 L107.6,441.4 L104.8,440.9 L100.4,438.9 L97.6,438.7 L85.7,440.9 L82.2,440.6 L78.8,440.0 L75.9,438.9 L70.6,435.6 L68.2,433.5 L63.4,427.3 L63.0,426.2 L64.4,424.0 L65.0,422.2 L65.0,420.6 L64.9,418.7 L64.7,415.2 L63.7,413.9 L61.5,412.8 L59.8,412.0 L56.8,409.6 L55.8,408.3 L54.9,405.0 L54.3,403.5 L53.5,402.3 L51.3,400.2 L50.0,399.6 L49.0,398.6 L48.4,397.1 L47.0,395.7 L46.0,394.6 L40.6,392.8 L39.6,392.1 L38.7,391.0 L37.3,388.1 L35.3,382.9 L35.1,381.6 L33.6,375.9 L32.3,374.3 L31.2,373.8 L29.9,374.1 L29.1,375.1 L28.0,375.5 L26.8,374.8 L25.9,373.2 L25.1,371.1 L24.8,369.5 L24.7,368.2 L25.1,366.9 L26.0,366.0 L26.4,364.1 L26.5,361.7 L26.2,360.2 L25.7,359.0 L24.5,357.4 L22.0,355.6 L22.1,354.0 L22.9,351.3 L24.5,349.2 L24.7,346.9 L22.7,341.9 L23.3,339.3 L24.2,338.4 L24.7,337.3 L22.8,336.9 L22.2,333.6 L26.5,329.2 L26.2,326.6 L25.2,324.8 L22.1,316.5 L22.1,315.2 L22.8,312.2 L22.8,310.6 L22.4,307.3 L23.0,303.9 L22.5,302.7 L21.5,301.6 L20.5,300.2 L18.9,294.8 L18.8,293.5 L20.9,292.5 L20.9,289.6 L18.5,288.2 L15.5,287.8 L12.8,286.9 L11.5,283.7 L14.0,279.6 L24.5,276.1 L25.7,270.4 L25.5,264.6 L26.7,258.6 L31.9,245.9 L30.8,244.2 L29.8,243.0 L29.2,241.5 L30.8,240.8 L32.1,240.0 L33.6,237.5 L34.2,231.2 L35.2,228.4 L36.5,227.0 L39.3,224.5 L40.4,222.9 L41.9,218.9 L42.9,217.1 L46.0,214.4 L46.6,212.9 L46.6,211.0 L46.3,208.6 L46.2,206.1 L46.7,204.3 L47.8,203.1 L51.3,202.5 L52.7,202.5 L54.1,202.9 L56.5,203.7 L57.1,202.4 L61.8,200.3 L61.5,197.6 L59.9,194.4 L59.1,191.9 L59.4,190.5 L59.7,189.2 L60.3,183.0 L60.3,179.1 L59.6,176.9 L58.4,176.6 L56.7,176.8 L56.8,174.5 L57.4,171.3 L57.5,169.9 L56.3,163.5 L56.3,161.7 L59.2,158.9 L60.0,158.0 L60.0,156.7 L58.2,154.1 L57.6,152.7 L57.7,151.1 L59.1,146.5 L58.8,144.9 L59.0,143.3 L60.7,142.4 L61.5,141.1 L61.7,137.3 L62.0,136.0 L62.7,134.7 L64.4,132.4 L64.9,131.1 L64.9,129.5 L63.7,126.6 L63.1,122.1 L61.6,120.2 L59.3,118.9 L56.9,117.9 L54.6,118.3 L51.6,122.5 L49.9,122.9Z" fill="none" stroke="#6d4c41" stroke-width="2.2" pointer-events="none"/><g pointer-events="none"><path d="M35,48 L44,32 L53,48Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M41,38 L44,32 L47,38Z" fill="#fff"/><path d="M40,78 L49,62 L58,78Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M46,68 L49,62 L52,68Z" fill="#fff"/><path d="M45,108 L54,92 L63,108Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M51,98 L54,92 L57,98Z" fill="#fff"/><path d="M64,138 L73,122 L82,138Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M70,128 L73,122 L76,128Z" fill="#fff"/><path d="M58,168 L67,152 L76,168Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M64,158 L67,152 L70,158Z" fill="#fff"/><path d="M61,198 L70,182 L79,198Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M67,188 L70,182 L73,188Z" fill="#fff"/><path d="M41,228 L50,212 L59,228Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M47,218 L50,212 L53,218Z" fill="#fff"/><path d="M33,258 L42,242 L51,258Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M39,248 L42,242 L45,248Z" fill="#fff"/><path d="M14,288 L23,272 L32,288Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M20,278 L23,272 L26,278Z" fill="#fff"/><path d="M24,318 L33,302 L42,318Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M30,308 L33,302 L36,308Z" fill="#fff"/><path d="M24,348 L33,332 L42,348Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M30,338 L33,332 L36,338Z" fill="#fff"/><path d="M27,378 L36,362 L45,378Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M33,368 L36,362 L39,368Z" fill="#fff"/><path d="M48,408 L57,392 L66,408Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M54,398 L57,392 L60,398Z" fill="#fff"/><path d="M65,438 L74,422 L83,438Z" fill="#a1887f" stroke="#6d4c41" stroke-width="1"/><path d="M71,428 L74,422 L77,428Z" fill="#fff"/><path d="M41.4,35.9 L42.7,37.8 L44.2,39.2 L47.8,40.2 L49.1,41.3 L49.6,43.6 L48.6,45.0 L49.8,46.4 L53.7,46.8 L55.2,46.4 L58.2,44.8 L59.6,43.8 L60.8,42.7 L61.7,41.2 L62.5,39.7 L63.2,37.1 L63.8,33.6 L64.6,31.4 L64.8,29.8 L64.8,27.8 L64.3,26.0 L62.9,23.5 L63.4,22.0 L64.4,20.8 L66.9,18.4 L67.7,16.9 L68.3,15.3 L68.8,13.4 L69.4,9.4 L69.8,7.6 L70.9,5.9 L75.6,1.0 L77.9,-0.6 L79.4,-2.1 L80.7,-3.9 L82.8,-7.9 L84.0,-11.3 L85.1,-16.9 L86.1,-18.8 L89.3,-23.4 L89.7,-25.7 L89.2,-28.8 L89.3,-33.6 L89.1,-35.3 L88.1,-38.5 L88.0,-40.2 L88.3,-41.7" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M228.4,48.9 L229.9,50.1 L231.2,51.7 L231.2,53.7 L232.2,55.6 L232.8,58.5 L233.7,61.0 L234.0,63.3 L235.4,70.0 L236.3,72.0 L237.9,73.5 L238.5,75.6 L239.5,77.9 L238.7,81.3 L238.3,83.6 L238.9,87.7 L238.9,89.7 L237.5,91.5 L238.1,93.8 L239.5,97.3 L239.1,99.8 L239.2,101.6 L239.8,103.2 L240.4,110.7 L240.0,117.2 L240.5,119.3 L240.8,123.1 L242.5,126.9 L242.7,128.4 L242.5,132.0 L242.6,133.6 L243.2,135.5 L249.6,146.7 L251.0,148.2 L252.3,151.9 L253.6,156.2 L255.2,159.0 L256.8,164.5 L257.0,166.1 L258.7,168.1 L261.2,169.8 L263.3,171.9 L264.1,173.3 L264.8,177.1 L266.8,179.0 L268.2,181.1 L268.7,183.6 L269.9,185.7 L269.5,189.4 L269.3,193.7 L269.0,195.5 L267.6,196.7 L266.0,196.5 L264.8,199.2 L265.3,202.3 L265.5,208.7 L266.3,210.2 L265.4,211.9 L267.1,213.9 L267.7,215.5 L268.1,222.5 L269.7,227.8 L270.0,229.6 L273.7,234.4 L281.7,250.3 L283.4,256.2 L283.6,257.9 L282.9,262.2 L284.1,266.4 L284.6,268.8 L285.8,271.3 L286.1,274.0 L284.8,278.8 L286.0,280.4 L286.1,282.1 L285.4,283.6 L286.1,289.2 L285.4,295.6 L285.1,302.9 L284.8,304.6 L282.8,309.2 L282.0,317.5 L279.2,330.5 L278.7,336.4 L277.8,340.2 L278.3,344.5 L277.6,347.3 L276.6,348.9 L274.0,350.1 L273.0,351.4 L271.4,354.6 L267.8,359.5 L267.2,361.1 L263.5,365.3 L262.9,366.9 L263.7,369.2 L264.0,371.2 L263.8,373.1 L263.2,376.4 L263.1,378.1 L263.2,379.9 L263.7,381.4 L264.5,382.8 L265.6,384.1 L266.4,387.3 L266.3,391.1 L265.9,393.1 L265.3,395.0 L266.8,400.4 L267.7,404.5 L267.7,406.3 L267.2,413.4 L266.7,415.2 L265.6,416.7 L264.3,418.0 L263.5,419.3 L263.3,420.9 L264.2,424.3 L264.7,428.1 L265.5,430.8 L265.3,432.7 L264.6,435.7 L266.8,438.0 L267.8,439.4 L265.2,439.5 L263.4,440.5 L262.9,443.5 L265.6,444.2 L267.0,444.9 L272.0,448.9 L271.6,450.7 L271.9,452.6 L275.1,454.6 L279.8,455.5 L284.8,460.8 L290.1,469.0 L292.1,470.9 L294.7,471.8 L297.9,472.0 L301.8,470.2 L304.5,471.3 L305.4,472.9 L305.9,474.7 L306.0,476.2 L305.9,479.6 L307.4,482.1 L308.0,483.5 L308.8,486.8 L309.8,488.8 L310.4,490.3 L312.1,490.5 L314.3,490.0 L317.0,490.9 L325.0,496.8 L327.7,497.9 L331.2,496.3 L330.7,497.9 L331.0,501.3 L331.3,502.9 L331.4,507.8 L331.7,509.6 L333.4,512.0 L334.2,513.6 L334.2,515.5 L331.2,518.4 L328.4,518.6 L327.0,519.4 L324.6,523.1 L322.4,525.0 L321.3,527.1 L322.7,529.9 L325.0,531.6 L329.6,532.5 L333.2,535.6 L335.7,536.3 L338.6,539.0 L340.6,545.1 L341.9,546.4 L345.0,547.3 L346.4,548.2 L350.8,553.0 L355.1,555.2 L357.4,557.5 L358.9,558.6 L373.2,566.5 L376.2,569.1 L380.0,570.6 L382.3,572.3 L385.5,572.7 L389.6,574.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2364.0,-5902.0 L-2366.3,-5901.7" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2670.9,-5715.2 L-2673.3,-5713.2 L-2673.6,-5710.9 L-2676.0,-5709.2 L-2676.7,-5707.4 L-2675.8,-5706.0 L-2674.9,-5704.3 L-2675.4,-5702.5 L-2677.1,-5701.0 L-2678.1,-5699.5 L-2678.0,-5697.8 L-2679.3,-5695.5 L-2681.1,-5694.2 L-2683.7,-5692.6 L-2685.5,-5690.7 L-2686.6,-5689.0 L-2687.6,-5687.7 L-2689.7,-5685.1 L-2690.0,-5682.7 L-2692.7,-5681.8 L-2695.1,-5681.8 L-2693.9,-5679.2 L-2692.4,-5677.6 L-2693.5,-5675.7 L-2695.0,-5673.8 L-2695.5,-5670.1 L-2697.0,-5668.9 L-2699.0,-5668.9 L-2700.8,-5667.7 L-2702.1,-5665.7 L-2703.2,-5663.5 L-2703.7,-5662.0 L-2704.9,-5659.5 L-2706.2,-5657.4 L-2707.5,-5656.4 L-2708.9,-5654.1 L-2710.3,-5652.6 L-2712.7,-5651.4 L-2715.5,-5650.9 L-2717.8,-5650.9 L-2719.7,-5650.8 L-2722.3,-5650.6 L-2724.9,-5650.0 L-2726.2,-5648.2 L-2727.4,-5647.1 L-2732.0,-5648.1 L-2732.5,-5645.0 L-2735.9,-5643.1 L-2737.6,-5643.2 L-2741.6,-5643.8 L-2742.4,-5642.3 L-2742.7,-5640.7 L-2744.4,-5638.5 L-2745.4,-5636.0" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2965.7,-5560.7 L-2964.6,-5561.9 L-2964.2,-5563.7 L-2964.5,-5565.6 L-2964.4,-5567.2 L-2963.4,-5568.5 L-2960.9,-5569.8 L-2958.7,-5571.2 L-2954.8,-5572.2 L-2953.1,-5572.8 L-2948.9,-5571.6 L-2947.0,-5570.4 L-2945.1,-5570.1 L-2942.5,-5571.3 L-2940.8,-5571.7 L-2939.2,-5571.1 L-2937.8,-5569.5 L-2935.8,-5565.4 L-2934.3,-5563.3 L-2933.0,-5562.2 L-2931.5,-5561.6 L-2929.7,-5561.5 L-2926.4,-5562.0 L-2924.1,-5563.3 L-2923.0,-5566.9 L-2922.2,-5570.0 L-2921.4,-5572.5 L-2920.1,-5574.2 L-2918.8,-5576.0 L-2917.1,-5577.0 L-2915.0,-5575.8 L-2913.8,-5572.9 L-2913.2,-5571.1 L-2911.4,-5571.0 L-2908.8,-5568.5 L-2907.0,-5566.1 L-2904.9,-5564.6 L-2902.7,-5564.2 L-2900.9,-5563.0 L-2899.8,-5561.0 L-2899.3,-5558.3 L-2898.0,-5556.9 L-2896.3,-5554.6 L-2896.0,-5552.9 L-2895.4,-5551.4 L-2892.6,-5548.6 L-2891.6,-5546.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2955.6,-5506.5 L-2956.2,-5508.5 L-2958.4,-5512.7 L-2959.6,-5516.7 L-2960.7,-5520.0 L-2959.3,-5524.0 L-2959.7,-5527.5 L-2959.2,-5529.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2941.1,-5439.8 L-2940.8,-5437.9 L-2941.1,-5435.8 L-2940.6,-5434.3 L-2938.9,-5433.7 L-2937.6,-5432.8 L-2935.9,-5431.6 L-2934.5,-5430.1 L-2928.9,-5426.0 L-2927.1,-5424.8 L-2924.2,-5422.5" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2366.0,-5920.7 L-2366.6,-5918.8 L-2366.1,-5915.8 L-2365.9,-5913.5 L-2365.9,-5910.6 L-2365.4,-5908.2 L-2364.0,-5905.2 L-2363.6,-5903.6 L-2364.0,-5902.1" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2367.1,-5901.1 L-2368.1,-5899.6 L-2369.9,-5900.0 L-2371.5,-5899.7 L-2373.1,-5898.8 L-2374.4,-5897.8 L-2380.2,-5896.9 L-2384.5,-5894.5 L-2392.6,-5894.7 L-2402.2,-5893.9 L-2405.1,-5893.0 L-2406.4,-5892.2 L-2410.0,-5888.2 L-2413.8,-5885.5 L-2418.3,-5878.9 L-2420.3,-5877.3 L-2422.6,-5878.9 L-2424.0,-5880.8 L-2425.4,-5882.1 L-2427.1,-5882.3 L-2429.8,-5880.6 L-2433.6,-5880.0 L-2437.7,-5879.0 L-2439.2,-5877.3 L-2439.7,-5875.4 L-2440.7,-5873.8 L-2443.9,-5870.5 L-2445.1,-5867.7 L-2446.1,-5866.4 L-2447.6,-5865.2 L-2448.5,-5862.1 L-2449.9,-5859.6 L-2452.1,-5857.9 L-2463.3,-5853.3 L-2466.4,-5852.9 L-2475.0,-5853.8 L-2477.6,-5853.6 L-2480.3,-5853.1 L-2485.1,-5851.8 L-2486.7,-5851.8 L-2489.9,-5852.4 L-2493.1,-5852.6 L-2496.2,-5853.3 L-2498.9,-5852.4 L-2500.1,-5851.3 L-2501.2,-5849.5 L-2508.1,-5847.1 L-2510.7,-5845.7 L-2524.7,-5834.6 L-2528.4,-5830.0 L-2528.9,-5825.3 L-2531.1,-5821.7 L-2533.1,-5818.0 L-2534.2,-5816.2 L-2541.4,-5812.4 L-2544.4,-5811.9 L-2547.5,-5812.0 L-2550.6,-5812.6 L-2553.3,-5813.8 L-2562.0,-5820.2 L-2563.4,-5820.7 L-2565.0,-5821.0 L-2566.6,-5821.1 L-2568.1,-5821.4 L-2572.3,-5823.3 L-2577.4,-5819.7 L-2579.5,-5817.9 L-2582.1,-5817.2 L-2585.0,-5814.1 L-2587.9,-5811.7 L-2590.3,-5809.2 L-2593.6,-5807.2 L-2595.1,-5805.3 L-2594.8,-5800.4 L-2595.3,-5798.3 L-2596.4,-5797.1 L-2596.9,-5791.8 L-2599.1,-5790.7 L-2599.6,-5788.4 L-2599.8,-5786.6 L-2600.7,-5785.1 L-2603.5,-5783.3 L-2605.1,-5781.9 L-2606.9,-5780.7 L-2609.6,-5780.2 L-2611.1,-5778.5 L-2611.3,-5775.8 L-2614.5,-5774.8 L-2615.6,-5773.5 L-2616.9,-5770.3 L-2618.1,-5768.4 L-2618.9,-5770.6 L-2621.0,-5770.9 L-2621.1,-5765.8 L-2622.0,-5762.5 L-2622.8,-5760.9 L-2626.9,-5760.2 L-2627.1,-5754.9 L-2628.1,-5753.3 L-2628.6,-5750.8 L-2631.1,-5746.8 L-2632.8,-5743.0 L-2636.1,-5739.5 L-2638.0,-5738.3 L-2639.2,-5737.1 L-2640.6,-5735.6 L-2645.6,-5732.1 L-2647.3,-5730.3 L-2649.4,-5725.7 L-2650.7,-5723.7 L-2653.7,-5724.0 L-2655.1,-5723.4 L-2656.0,-5721.0 L-2657.5,-5720.1 L-2658.5,-5718.0 L-2658.5,-5716.1 L-2660.1,-5714.9 L-2670.8,-5715.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2745.4,-5636.0 L-2747.5,-5633.6 L-2748.7,-5632.5 L-2750.5,-5631.8 L-2750.9,-5630.2 L-2754.5,-5628.8 L-2756.0,-5627.0 L-2759.0,-5620.0 L-2760.2,-5618.2 L-2761.9,-5617.2 L-2763.6,-5614.3 L-2764.7,-5612.9 L-2764.7,-5610.3 L-2770.2,-5602.6 L-2770.0,-5600.9 L-2769.4,-5597.9 L-2770.5,-5596.0 L-2772.2,-5595.1 L-2772.2,-5593.3 L-2770.6,-5592.7 L-2771.3,-5591.3 L-2773.1,-5590.5 L-2771.9,-5589.5 L-2771.5,-5587.1 L-2771.3,-5585.4 L-2768.7,-5582.5 L-2768.3,-5580.7 L-2767.5,-5578.2 L-2767.8,-5571.8 L-2768.3,-5570.3 L-2769.6,-5568.7 L-2771.7,-5568.1 L-2772.9,-5566.1 L-2775.4,-5564.4 L-2776.9,-5564.2 L-2782.3,-5566.3 L-2784.0,-5567.8 L-2787.2,-5568.1 L-2789.5,-5568.9 L-2795.9,-5569.1 L-2796.4,-5571.5 L-2798.4,-5572.3 L-2799.9,-5573.1 L-2802.9,-5578.5 L-2804.8,-5580.6 L-2807.5,-5580.7 L-2808.6,-5579.0 L-2810.1,-5577.3 L-2811.6,-5578.7 L-2814.8,-5580.6 L-2815.5,-5582.4 L-2813.2,-5584.6 L-2812.3,-5586.5 L-2811.7,-5588.7 L-2812.2,-5591.4 L-2814.6,-5592.4 L-2817.5,-5592.5 L-2819.7,-5592.2 L-2822.2,-5592.5 L-2824.4,-5591.9 L-2825.0,-5589.6 L-2826.4,-5588.3 L-2827.9,-5588.8 L-2829.3,-5587.8 L-2829.3,-5586.2 L-2831.2,-5585.6 L-2833.3,-5583.8 L-2834.7,-5583.1 L-2838.9,-5582.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2840.0,-5582.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2840.0,-5582.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2840.0,-5582.6 L-2842.3,-5581.5 L-2844.0,-5579.6 L-2849.8,-5578.7 L-2854.5,-5575.8 L-2856.0,-5574.5 L-2860.4,-5572.6 L-2861.4,-5570.8 L-2862.1,-5568.6 L-2863.1,-5566.8 L-2864.8,-5566.1 L-2866.5,-5566.3 L-2868.5,-5566.5 L-2870.8,-5564.0 L-2870.9,-5559.1 L-2871.0,-5557.4 L-2869.9,-5556.3 L-2869.8,-5552.4 L-2869.3,-5550.0 L-2869.1,-5547.4 L-2869.6,-5544.2 L-2870.6,-5541.8 L-2871.9,-5540.1 L-2873.5,-5539.1 L-2875.3,-5538.7 L-2878.3,-5539.9 L-2880.2,-5539.9 L-2888.3,-5545.5 L-2891.2,-5545.7" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2965.7,-5560.7 L-2965.6,-5558.4 L-2964.9,-5556.2 L-2963.9,-5554.4 L-2961.3,-5550.9 L-2960.7,-5549.2 L-2962.1,-5546.2 L-2962.6,-5540.5 L-2962.4,-5538.2 L-2962.0,-5536.6 L-2959.7,-5530.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2955.6,-5506.5 L-2955.7,-5504.3 L-2955.5,-5502.2 L-2954.6,-5498.3 L-2954.3,-5495.0 L-2954.3,-5493.3 L-2955.0,-5490.0 L-2957.0,-5489.2 L-2958.6,-5488.8 L-2958.5,-5487.0 L-2957.2,-5485.5 L-2957.2,-5483.6 L-2958.8,-5481.5 L-2958.2,-5478.8 L-2957.3,-5467.7 L-2955.8,-5466.3 L-2954.1,-5464.7 L-2953.3,-5462.4 L-2953.2,-5460.1 L-2952.3,-5458.6 L-2950.9,-5457.7 L-2949.1,-5457.4 L-2944.7,-5448.3 L-2944.1,-5445.0 L-2943.2,-5443.1 L-2941.6,-5441.6 L-2941.3,-5439.9" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2924.2,-5421.3 L-2923.8,-5419.6 L-2926.5,-5416.9 L-2928.7,-5414.6 L-2930.9,-5411.8 L-2939.1,-5406.5 L-2941.5,-5405.7 L-2942.6,-5404.6 L-2943.3,-5403.1 L-2943.8,-5399.6 L-2944.6,-5398.0 L-2945.7,-5396.7 L-2946.8,-5395.5 L-2949.5,-5393.7 L-2950.5,-5392.6 L-2950.9,-5390.8 L-2950.2,-5388.9 L-2948.8,-5387.3 L-2949.3,-5385.9 L-2950.5,-5384.9 L-2950.4,-5381.5 L-2950.1,-5379.5 L-2949.1,-5378.2 L-2949.1,-5376.3 L-2949.4,-5374.5 L-2948.6,-5373.0 L-2949.9,-5370.9 L-2950.9,-5367.7 L-2950.9,-5366.0 L-2951.8,-5364.2 L-2951.4,-5361.3 L-2951.9,-5359.7 L-2952.8,-5358.4 L-2954.1,-5357.1 L-2955.4,-5354.2 L-2957.9,-5349.4 L-2959.1,-5348.5 L-2960.8,-5348.0 L-2964.1,-5347.8 L-2963.7,-5345.3 L-2962.8,-5343.8 L-2963.9,-5342.2 L-2964.5,-5339.9 L-2962.3,-5336.3 L-2961.1,-5330.4 L-2961.5,-5326.8 L-2962.5,-5323.8 L-2962.7,-5320.9 L-2960.7,-5318.0 L-2958.0,-5316.9 L-2951.9,-5316.5 L-2949.6,-5315.2 L-2947.7,-5312.4 L-2947.4,-5310.5 L-2947.7,-5308.7 L-2946.6,-5303.5 L-2946.8,-5301.7 L-2950.1,-5298.9 L-2951.2,-5296.3 L-2951.1,-5294.8 L-2951.9,-5292.1 L-2954.7,-5291.5 L-2961.8,-5292.9 L-2964.3,-5291.0" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2964.3,-5291.0 L-2965.1,-5287.9 L-2965.6,-5286.5 L-2966.4,-5285.1 L-2968.5,-5283.1 L-2969.9,-5280.4 L-2969.3,-5278.7 L-2969.4,-5276.9 L-2970.4,-5273.5 L-2971.9,-5271.9 L-2976.8,-5271.9 L-2978.2,-5271.2 L-2979.5,-5269.5 L-2980.5,-5267.6 L-2981.0,-5265.7 L-2981.1,-5262.9 L-2981.2,-5261.4 L-2981.9,-5259.6 L-2983.2,-5258.1 L-2984.5,-5257.0 L-2985.6,-5255.5 L-2986.1,-5252.8 L-2987.0,-5250.6 L-2989.9,-5249.3 L-2993.2,-5248.3 L-2995.3,-5247.2 L-2996.6,-5244.5 L-2997.5,-5240.5 L-2997.5,-5236.6 L-2996.3,-5233.7 L-2996.3,-5235.4 L-2994.6,-5235.9 L-2991.4,-5234.7 L-2990.7,-5232.7 L-2991.0,-5230.5 L-2990.6,-5228.9 L-2988.1,-5229.5 L-2985.5,-5228.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30.2,286.0 L30.3,289.4 L33.0,297.9 L33.7,302.2 L34.2,304.3 L35.5,307.0 L36.0,309.5 L37.2,311.6 L38.2,313.9 L37.2,316.2 L37.3,319.1 L38.8,321.3 L41.0,322.1 L42.6,322.7 L44.0,324.5 L44.7,327.6 L45.7,329.1 L47.1,329.6 L49.1,329.5 L50.5,331.0 L51.9,331.6 L53.1,333.1 L54.7,333.7 L61.2,333.3 L63.1,333.5 L66.5,336.9 L67.3,338.5 L67.4,340.2 L67.2,343.9 L68.8,347.5 L69.0,349.3 L69.1,351.3 L69.4,353.0 L71.3,359.3 L72.9,361.7 L73.4,363.1 L73.4,365.0 L72.7,368.7 L71.2,371.7 L70.6,373.6 L71.1,375.1 L71.8,378.0 L71.8,381.6 L71.6,383.1 L71.8,385.0 L73.0,387.6 L73.0,390.2 L72.6,391.9 L72.0,393.4 L70.9,394.7 L69.0,395.0 L68.3,397.3 L66.7,399.7 L65.8,402.4 L64.5,410.7 L64.4,413.7 L64.7,415.2 L64.9,418.7 L65.0,420.6 L65.0,422.2 L64.4,424.0 L63.2,425.3 L63.4,427.3 L68.2,433.5 L70.6,435.6 L75.9,438.9 L78.8,440.0 L82.2,440.6 L85.7,440.9 L97.6,438.7 L100.4,438.9 L104.8,440.9 L107.5,441.4 L110.8,442.7 L113.9,445.8 L115.3,452.0 L116.6,454.6 L119.0,456.2 L122.3,457.2 L125.8,457.7 L134.4,456.9 L135.7,457.5 L138.3,460.4 L139.7,461.4 L142.5,461.4 L144.8,462.4 L149.9,462.6 L152.2,464.2 L154.2,468.4 L155.5,469.8 L195.5,475.6 L198.4,477.1 L200.4,478.8 L202.3,481.3 L203.9,484.0 L204.8,486.7 L204.9,490.4 L204.0,493.4 L202.4,495.7 L197.8,498.8 L195.6,500.8 L194.1,503.6 L193.8,507.5 L194.0,509.0 L194.6,510.8 L195.2,512.4 L197.4,514.0 L199.9,513.6 L203.3,514.6 L205.2,516.6 L208.9,524.1 L210.7,526.6 L212.9,528.7 L215.4,529.9 L220.6,529.5 L222.3,528.7 L227.5,529.4 L229.1,528.9 L232.2,527.0 L237.9,525.9 L239.5,526.0 L240.9,526.7 L241.8,529.1 L241.8,530.8 L243.7,536.1 L246.1,539.6 L248.1,541.9 L255.9,545.9 L259.0,546.5 L261.0,548.0 L262.6,548.5 L265.8,549.0 L268.2,550.5 L270.4,552.2 L274.1,553.0 L276.5,554.1 L278.6,555.9 L280.2,558.2 L281.1,560.8 L281.5,564.6 L282.3,565.9 L284.0,566.5 L285.8,566.7 L293.8,568.6 L296.8,568.7 L305.7,567.2 L322.9,569.3 L325.0,570.2 L326.8,570.5 L329.1,571.5 L331.9,571.8 L333.5,572.5 L334.7,573.5 L338.1,573.7 L340.0,574.5 L341.1,575.5 L343.9,574.8 L345.3,573.9 L347.9,572.2 L349.7,572.0 L353.2,572.7 L359.1,574.9 L361.6,576.6 L363.5,577.0 L366.5,576.0 L370.0,576.1 L379.9,574.3 L389.1,574.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M389.6,574.3 L391.4,575.5 L396.3,574.8 L398.4,575.5 L418.5,578.3 L423.3,578.4 L445.2,586.2 L450.1,589.4 L454.4,590.4 L461.2,598.0 L467.2,599.6 L469.7,600.9 L471.6,602.7 L473.4,605.4 L474.5,606.8 L476.9,607.9 L485.7,613.6 L487.7,615.5 L490.2,616.5 L502.6,618.1 L507.5,622.0 L509.0,622.5 L512.3,622.7 L514.3,623.9 L515.8,624.2 L518.0,626.3 L518.9,627.9 L519.9,629.9 L529.1,631.1 L531.1,632.0 L532.7,632.0 L534.1,631.2 L536.6,631.2 L540.7,632.8 L550.4,634.4 L553.2,636.1 L556.7,639.9 L558.3,645.7 L559.6,647.9 L561.7,649.5 L562.9,651.2 L563.6,652.9 L566.1,654.8 L567.3,656.0 L568.6,656.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-945.2,-3519.2 L-947.0,-3518.7 L-949.9,-3518.4 L-952.5,-3520.3 L-954.8,-3522.9 L-963.9,-3529.1 L-968.0,-3533.6 L-984.5,-3556.8 L-985.9,-3559.1 L-988.9,-3563.1 L-996.7,-3571.1 L-998.5,-3575.0 L-1001.5,-3578.8 L-1006.9,-3583.4 L-1011.2,-3588.5 L-1013.6,-3591.2 L-1019.4,-3599.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1035.2,-3608.6 L-1033.8,-3607.9 L-1031.8,-3607.3 L-1029.9,-3604.6 L-1027.7,-3603.0 L-1024.1,-3601.3 L-1020.9,-3601.3 L-1019.4,-3599.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-945.1,-3519.2 L-943.4,-3519.7 L-941.8,-3518.7 L-938.6,-3520.0 L-933.9,-3515.8 L-931.4,-3516.7 L-929.6,-3515.3 L-926.6,-3513.1 L-925.0,-3512.6 L-923.8,-3511.7 L-923.1,-3510.2 L-921.9,-3509.2 L-921.0,-3511.1 L-917.3,-3509.2 L-916.5,-3507.3 L-916.1,-3505.7 L-915.2,-3504.4 L-914.3,-3503.0 L-911.1,-3501.6 L-909.8,-3500.2 L-908.5,-3499.4 L-907.4,-3498.2 L-907.1,-3496.2 L-908.6,-3494.8 L-906.6,-3492.3 L-904.4,-3492.3 L-902.5,-3492.3 L-901.3,-3490.8 L-899.7,-3491.2 L-898.5,-3490.2 L-896.8,-3491.5 L-894.8,-3492.2 L-893.2,-3491.7 L-888.8,-3486.5 L-887.1,-3486.3 L-885.7,-3487.2 L-883.8,-3486.8 L-882.2,-3488.9 L-877.7,-3491.0 L-873.0,-3492.3 L-870.6,-3493.8 L-870.4,-3496.0 L-871.0,-3498.9 L-871.1,-3502.5 L-869.8,-3503.6" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M89.0,-42.8 L91.2,-43.9 L97.1,-44.6 L103.3,-43.3 L106.0,-43.7 L108.6,-44.6 L111.0,-43.8 L112.7,-41.9 L113.4,-40.1 L113.7,-38.4 L114.7,-37.1 L116.3,-36.5 L117.4,-34.7 L118.0,-32.8 L118.1,-31.1 L118.0,-29.4 L117.0,-25.4 L117.9,-23.5 L120.1,-23.4 L122.1,-24.1 L124.0,-23.6 L126.1,-24.2 L128.2,-23.6 L130.8,-23.2 L132.1,-22.3 L134.9,-22.0 L136.4,-22.6 L137.7,-23.3 L139.3,-24.9 L140.6,-26.4 L142.8,-25.5 L145.1,-25.6 L147.2,-27.0 L154.2,-28.1 L157.2,-23.6 L159.1,-21.6 L160.7,-19.6 L161.8,-17.0 L162.3,-13.5 L162.3,-10.4 L159.9,1.5 L160.7,4.5 L160.8,6.7 L161.8,9.2 L164.8,12.6 L166.0,14.6 L167.0,17.2 L167.4,19.7 L165.7,21.0 L165.6,23.6 L167.9,25.0 L170.6,25.0 L181.6,22.0 L184.0,22.1 L186.4,23.6 L188.1,25.6 L189.5,29.4 L192.8,31.5 L194.6,33.2 L196.2,35.7 L203.0,37.1 L204.6,36.5 L206.0,37.5 L211.0,37.6 L213.4,37.1 L215.4,38.3 L216.6,39.4 L219.6,39.2 L221.4,39.9 L222.9,42.2 L228.4,48.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2690.1,-5660.0 L-2690.7,-5658.0 L-2692.2,-5656.9 L-2694.2,-5656.6 L-2696.1,-5656.7 L-2697.6,-5656.6 L-2699.7,-5656.6 L-2703.5,-5657.0 L-2706.0,-5657.0" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-2430.0,-5676.8 L-2431.6,-5676.6 L-2434.0,-5675.7 L-2437.2,-5672.8 L-2439.2,-5670.5 L-2442.7,-5665.0 L-2443.2,-5663.6 L-2444.1,-5660.0 L-2444.8,-5658.6 L-2445.7,-5657.2 L-2446.9,-5652.7 L-2449.6,-5648.9 L-2454.7,-5644.3 L-2456.7,-5644.3 L-2459.2,-5643.3 L-2466.7,-5644.3 L-2468.8,-5644.0 L-2471.1,-5641.4 L-2472.1,-5639.5 L-2473.2,-5635.8 L-2474.9,-5633.7 L-2484.2,-5628.3 L-2489.8,-5627.7 L-2493.0,-5625.7 L-2494.4,-5624.2 L-2496.8,-5623.3 L-2498.8,-5622.5 L-2498.6,-5620.7 L-2500.9,-5618.8 L-2502.4,-5618.0 L-2504.6,-5618.8 L-2506.1,-5619.1 L-2515.4,-5618.4 L-2517.5,-5617.8 L-2521.2,-5619.5 L-2524.0,-5619.5 L-2526.5,-5620.7 L-2529.3,-5621.2 L-2531.5,-5620.3 L-2535.4,-5620.5 L-2541.2,-5622.8 L-2544.3,-5623.5 L-2550.5,-5622.9 L-2551.9,-5623.5 L-2553.2,-5624.6 L-2554.6,-5625.3 L-2556.3,-5624.6 L-2557.5,-5626.1 L-2559.3,-5626.3 L-2560.4,-5627.9 L-2560.7,-5629.6 L-2563.2,-5631.9 L-2565.2,-5633.0 L-2571.4,-5634.3 L-2573.4,-5635.0 L-2575.3,-5637.4 L-2577.1,-5638.5 L-2578.5,-5639.8 L-2578.0,-5641.4 L-2584.1,-5648.7 L-2584.2,-5650.4 L-2585.2,-5651.6 L-2585.0,-5653.2 L-2585.9,-5655.0 L-2588.3,-5656.4 L-2589.6,-5658.3 L-2590.5,-5660.7 L-2592.4,-5661.5 L-2597.2,-5664.5 L-2606.7,-5667.3 L-2608.3,-5666.3 L-2610.4,-5666.2 L-2614.8,-5666.7 L-2616.7,-5666.1 L-2620.4,-5663.2 L-2622.6,-5662.7 L-2624.3,-5661.9 L-2625.9,-5661.1 L-2626.6,-5659.6 L-2628.2,-5659.0 L-2629.3,-5660.0 L-2630.8,-5659.1 L-2634.5,-5658.6 L-2634.7,-5657.1 L-2637.6,-5656.2 L-2638.1,-5657.8 L-2639.6,-5656.7 L-2641.3,-5657.2 L-2644.0,-5658.7 L-2645.3,-5659.9 L-2650.6,-5663.4 L-2654.5,-5667.3 L-2656.8,-5668.6 L-2659.8,-5668.4 L-2664.1,-5666.4 L-2665.6,-5666.2 L-2667.2,-5667.6 L-2670.1,-5666.5 L-2673.8,-5666.1 L-2676.0,-5664.7 L-2678.2,-5664.6 L-2680.0,-5663.3 L-2681.2,-5661.8 L-2682.4,-5660.5 L-2684.3,-5660.0 L-2685.7,-5660.7 L-2686.9,-5662.0 L-2688.4,-5662.5 L-2689.9,-5661.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1897.5,-4755.2 L-1899.7,-4756.8 L-1901.7,-4756.9 L-1902.9,-4755.0 L-1903.2,-4751.8 L-1903.8,-4750.1 L-1904.5,-4748.7 L-1906.0,-4747.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1894.3,-4769.4 L-1894.4,-4761.1 L-1895.1,-4757.0 L-1897.5,-4755.2" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M-1990.1,-4677.1 L-1984.3,-4672.1 L-1982.1,-4669.0 L-1980.4,-4665.0 L-1979.9,-4663.4 L-1978.5,-4661.0 L-1977.2,-4660.2 L-1975.4,-4659.7 L-1973.7,-4660.0 L-1970.3,-4661.2 L-1967.9,-4660.8 L-1966.5,-4662.2 L-1965.5,-4667.1 L-1964.6,-4668.9 L-1963.4,-4670.1 L-1962.1,-4670.8 L-1960.6,-4671.2 L-1958.8,-4671.7 L-1957.2,-4672.4 L-1948.5,-4678.8 L-1947.2,-4680.1 L-1944.0,-4684.8 L-1941.5,-4690.2 L-1941.2,-4691.7 L-1940.7,-4694.9 L-1939.2,-4697.8 L-1936.4,-4698.0 L-1934.8,-4698.3 L-1933.6,-4700.0 L-1930.7,-4699.2 L-1928.4,-4699.7 L-1927.1,-4701.3 L-1926.1,-4703.2 L-1925.6,-4705.0 L-1925.0,-4709.6 L-1924.4,-4711.8 L-1923.3,-4713.7 L-1920.9,-4716.3 L-1919.7,-4719.9 L-1919.2,-4721.6 L-1917.4,-4722.5 L-1916.4,-4723.8 L-1916.1,-4728.4 L-1916.6,-4733.3 L-1916.6,-4734.9 L-1916.1,-4736.6 L-1916.8,-4738.9 L-1917.3,-4742.5 L-1917.3,-4744.2 L-1916.1,-4746.2 L-1913.9,-4745.2 L-1911.2,-4745.6 L-1908.1,-4747.6 L-1906.0,-4747.8" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M53.9,217.3 L97.8,229.6 L131.5,231.2 L163.1,231.2 L198.9,239.4 L239.3,250.1 L279.8,258.3" fill="none" stroke="#42a5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="189" cy="51" rx="12" ry="6" fill="#64b5f6"/><ellipse cx="203" cy="61" rx="8" ry="5" fill="#64b5f6"/><ellipse cx="179" cy="42" rx="7" ry="4" fill="#64b5f6"/><circle cx="129" cy="89" r="3.6" fill="#c62828" stroke="#fff" stroke-width="1.2"/><text x="135" y="93" font-size="9.5" fill="#4e342e" text-anchor="start">Ciudad de Mendoza</text><circle cx="163" cy="230" r="3.6" fill="#c62828" stroke="#fff" stroke-width="1.2"/><text x="169" y="234" font-size="9.5" fill="#4e342e" text-anchor="start">San Rafael</text><circle cx="79" cy="301" r="3.6" fill="#c62828" stroke="#fff" stroke-width="1.2"/><text x="85" y="304" font-size="9.5" fill="#4e342e" text-anchor="start">Malargüe</text><text x="12" y="244" font-size="11" fill="#78909c" transform="rotate(-90 12 244)">CHILE</text><text x="150" y="13" font-size="11" fill="#78909c">SAN JUAN</text><text x="291" y="140" font-size="11" fill="#78909c" transform="rotate(90 291 140)">SAN LUIS</text><text x="268" y="420" font-size="11" fill="#78909c">LA PAMPA</text><text x="120" y="481" font-size="11" fill="#78909c">NEUQUÉN</text></g><path d="M-16.9,-65.6 L320.2,-65.6 L320.2,258.3 L239.3,248.5 L198.9,237.8 L163.1,229.6 L131.5,229.6 L97.8,228.0 L53.9,214.8 L-16.9,196.8Z" clip-path="url(#clipI)" fill="none" stroke="#8d6e63" stroke-width="1.6" stroke-dasharray="5 4" pointer-events="none"/><path d="M107.9,228.5 L131.5,229.6 L163.1,229.6 L198.9,237.8 L239.3,248.5 L320.2,258.3 L320.2,549.4 L118.0,549.4 L118.0,360.8Z" clip-path="url(#clipI)" fill="none" stroke="#8d6e63" stroke-width="1.6" stroke-dasharray="5 4" pointer-events="none"/><path d="M-16.9,196.8 L53.9,214.8 L97.8,228.0 L107.9,228.5 L118.0,360.8 L118.0,549.4 L-16.9,549.4Z" clip-path="url(#clipI)" fill="none" stroke="#8d6e63" stroke-width="1.6" stroke-dasharray="5 4" pointer-events="none"/><g id="zt0" class="zt" pointer-events="none"><rect x="104" y="152" width="92" height="22" rx="10" fill="#fbc02d" stroke="#fff" stroke-width="2"/><text x="150" y="168" font-size="13" fill="#fff">Huarpes</text></g><g id="zt1" class="zt" pointer-events="none"><rect x="159" y="305" width="92" height="22" rx="10" fill="#ef6c00" stroke="#fff" stroke-width="2"/><text x="205" y="321" font-size="13" fill="#fff">Puelches</text></g><g id="zt2" class="zt" pointer-events="none"><rect x="39" y="352" width="92" height="22" rx="10" fill="#2e7d32" stroke="#fff" stroke-width="2"/><text x="85" y="368" font-size="13" fill="#fff">Pehuenches</text></g><g pointer-events="none"><g ><circle cx="258" cy="455" r="22" fill="#fff" stroke="#90a4ae" stroke-width="1.5"/>
    <path d="M258,437 L263,455 L258,473 L253,455Z" fill="#c62828"/><path d="M240,455 L258,450 L276,455 L258,460Z" fill="#455a64"/>
    <text x="258" y="430" font-size="10" fill="#c62828">N</text><text x="258" y="488" font-size="10" fill="#455a64">S</text>
    <text x="288" y="459" font-size="10" fill="#455a64">E</text><text x="228" y="459" font-size="10" fill="#455a64">O</text></g></g></svg>`,

    // ---------- Viviendas: choza y toldo ----------
    viviendas: `<svg viewBox="0 0 400 260" class="escena" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">
      <defs><linearGradient id="cieloV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bbdefb"/><stop offset="1" stop-color="#fff8e1"/></linearGradient></defs>
      <rect width="400" height="260" fill="url(#cieloV)"/>
      <path d="M0,70 L40,40 L70,62 L110,30 L150,64 L190,44 L230,66 L270,34 L310,60 L350,38 L400,66 V100 H0Z" fill="#b0bec5" opacity=".7"/>
      <rect x="0" y="180" width="400" height="80" fill="#e0c9a6"/>
      <line x1="200" y1="8" x2="200" y2="222" stroke="#8d6e63" stroke-width="2.5" stroke-dasharray="6 6"/>
      <rect x="40" y="8" width="120" height="22" rx="10" fill="#f9a825"/><text x="100" y="24" font-size="13" fill="#fff">HUARPES</text>
      <rect x="216" y="8" width="168" height="22" rx="10" fill="#ef6c00"/><text x="300" y="24" font-size="11.5" fill="#fff">PUELCHES Y PEHUENCHES</text>
      <g id="v_choza" class="capa">
        <rect x="62" y="122" width="88" height="62" rx="6" fill="#a1887f" stroke="#6d4c41" stroke-width="2.5"/>
        <path d="M70,140 h20 M100,132 h24 M118,160 h22 M72,168 h18" stroke="#8d6e63" stroke-width="2"/>
        <rect x="94" y="150" width="22" height="34" rx="4" fill="#4e342e"/>
        <polygon points="50,126 106,86 162,126" fill="#e6c36a" stroke="#b8902f" stroke-width="2.5"/>
        <path d="M66,120 l14,-12 M84,122 l16,-16 M106,122 l14,-16 M126,122 l14,-12 M92,108 l12,-10" stroke="#b8902f" stroke-width="1.8"/>
        <text x="106" y="200" font-size="10" fill="#4e342e">choza de barro,</text><text x="106" y="212" font-size="10" fill="#4e342e">ramas y paja</text></g>
      <g id="v_totora" class="capa">
        <ellipse cx="34" cy="226" rx="32" ry="10" fill="#64b5f6"/>
        <path d="M14,224 q-2,-26 4,-44 M22,224 q0,-30 8,-46 M30,226 q2,-28 -2,-48 M40,224 q2,-24 10,-40 M48,226 q-2,-22 4,-36" stroke="#558b2f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <rect x="2" y="238" width="96" height="16" rx="7" fill="#1565c0"/><text x="50" y="249.5" font-size="9" fill="#fff">juncos y totora</text></g>
      <g id="v_toldo" class="capa">
        <path d="M228,184 L234,126 L320,118 L330,184 Z" fill="#8d6e63" stroke="#4e342e" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M234,126 L320,118 L330,110 L242,116 Z" fill="#a1887f" stroke="#4e342e" stroke-width="2"/>
        <path d="M256,124 L258,184 M280,122 L282,184 M302,120 L305,184" stroke="#6d4c41" stroke-width="2" stroke-dasharray="4 5"/>
        <path d="M262,184 L266,146 Q281,140 296,144 L300,184 Z" fill="#3e2723"/>
        <path d="M232,184 v-62 M326,184 v-72 M242,116 v-8 M330,110 v-8" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>
        <text x="279" y="200" font-size="10" fill="#4e342e">toldo de palos</text><text x="279" y="212" font-size="10" fill="#4e342e">y cueros de guanaco</text></g>
      <g id="v_mover" class="capa">
        <rect x="336" y="158" width="44" height="14" rx="7" fill="#8d6e63" stroke="#4e342e" stroke-width="2"/>
        <path d="M332,178 h52 M334,184 h48" stroke="#5d4037" stroke-width="3" stroke-linecap="round"/>
        <path d="M346,156 v-6 M370,156 v-6" stroke="#4e342e" stroke-width="2"/>
        <path d="M334,140 h32" stroke="#2e7d32" stroke-width="3"/><polygon points="374,140 364,134 364,146" fill="#2e7d32"/>
        <text x="358" y="128" font-size="9" fill="#2e7d32">se desarma</text><text x="358" y="200" font-size="9" fill="#2e7d32">y se lleva</text></g>
      <g id="v_conc" class="capa">
        <rect x="104" y="228" width="292" height="26" rx="12" fill="#2e7d32"/>
        <text x="250" y="245.5" font-size="11" fill="#fff">Cada vivienda, según su forma de vida</text></g>
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
