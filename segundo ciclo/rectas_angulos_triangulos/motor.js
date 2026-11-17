// ============================================================
//  motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
//  Motor genérico: narracion, hotspot (img/svg), trivia (img/red svg), vf, video YT,
//  asociar, clasificar (uno a uno), ordenar, sopa de letras, oracion (armar palabra por palabra),
//  mapa (tocar la zona de un dibujo SVG), cuadro (completar un cuadro comparativo).
//  Figuras geométricas dibujadas por código (FIG): rectas, ángulos, triángulos, relojes, prisma, cuerpos.
//  Pantalla inicial «Tocá para empezar» y un solo reproductor de voz.
//  Paquete: Rectas, ángulos y triángulos
// ============================================================
(function () {
  'use strict';

  // ---------- Audios (función pura: la usa también el extractor) ----------
  // Correcciones de pronunciación para gTTS (el texto en pantalla no cambia)
  const ORD = { 1: 'primer', 2: 'segundo', 3: 'tercer', 4: 'cuarto', 5: 'quinto', 6: 'sexto', 7: 'séptimo' };
  function pron(t) {
    return t.replace(/\b([1-7])\s*[°º]\s*grado/g, (m, n) => ORD[n] + ' grado').replace(/(\d+)\s*°/g, '$1 grados');
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
      case 'clasificar': case 'mapa': case 'cuadro': p.items.forEach((it, i) => { if (!(it.fig && !it.decir)) add('it' + i, it.decir || it.t); add('it' + i + '_ok', it.conf); }); add('fin', p.fin); break;
      case 'ordenar': p.items.forEach((it, i) => add('o' + i, it.decir || it.t)); add('fin', p.fin); break;
      case 'sopa': p.palabras.forEach((w, i) => add('w' + i, w.decir || w.w)); add('fin', p.fin); break;
      case 'oracion': p.oraciones.forEach((o, i) => add('or' + i, o.t)); add('fin', p.fin); break;
    }
    return L;
  }
  function listarAudios(D) {
    const L = [{ id: 'g_error', t: pron(D.globales.error) }, { id: 'g_cierre', t: pron(D.globales.cierre) }];
    if (D.globales.portada) L.push({ id: 'g_portada', t: pron(D.globales.portada) });
    L.push(
               { id: 'g_lupa_mapa', t: pron(D.globales.lupaMapa) }, { id: 'g_lupa_img', t: pron(D.globales.lupaImg) });
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
  // Un solo reproductor de voz para todo el paquete (Chrome del celular bloquea los Audio nuevos que suenan solos)
  const AQ = { cola: [], actual: null, gen: 0, to: null };
  let AU = null;
  function reproductor() { if (!AU) { AU = new Audio(); AU.preload = 'auto'; } return AU; }
  function pararAudio() {
    AQ.gen++; AQ.cola = []; clearTimeout(AQ.to);
    if (AU) { try { AU.onended = AU.onerror = AU.onloadedmetadata = null; AU.pause(); } catch (e) {} }
    AQ.actual = null; actualizarSig();
  }
  function reproducirSiguiente() {
    if (!AQ.cola.length) { AQ.actual = null; actualizarSig(); return; }
    const it = AQ.cola.shift();
    const g = ++AQ.gen;
    const a = reproductor();
    AQ.actual = a;
    let hecho = false;
    const fin = () => {
      if (hecho || g !== AQ.gen) return; hecho = true; clearTimeout(AQ.to);
      AQ.actual = null;
      if (it.cb) it.cb();
      if (g === AQ.gen) reproducirSiguiente();
    };
    a.onended = fin; a.onerror = fin;
    a.onloadedmetadata = () => { if (g !== AQ.gen) return; clearTimeout(AQ.to); if (isFinite(a.duration)) AQ.to = setTimeout(fin, (a.duration + 3) * 1000); };
    clearTimeout(AQ.to); AQ.to = setTimeout(fin, 30000);
    a.src = 'audio/' + it.id + '.mp3';
    let pr; try { pr = a.play(); } catch (e) { fin(); }
    if (pr && pr.catch) pr.catch(fin);
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
    }
    const figQ = el('div', 'figQ');
    const imgFija = (!p.escena && p.img) ? fig(p.img, 'fig') : null;
    if (!p.escena) m.appendChild(figQ);
    const ponerFig = q => { if (red) return; figQ.innerHTML = ''; if (q.fig) figQ.innerHTML = FIG(q.fig, 'geo geoQ'); else if (imgFija) figQ.appendChild(imgFija); };
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
      cont.innerHTML = ''; marcar(q); ponerFig(q);
      cont.appendChild(el('div', 'contador', 'Pregunta ' + (qi + 1) + ' de ' + p.preguntas.length));
      const pq = el('div', 'preg titila', q.q); cont.appendChild(pq);
      const conFig = q.ops.some(o => typeof o === 'object');
      const cortas = !conFig && q.ops.every(o => o.length <= 10);
      const g = el('div', 'ops ' + (conFig ? 'figs n' + q.ops.length : cortas ? 'dos' : 'una'));
      barajar(q.ops.map((t, i) => ({ t, i }))).forEach(o => {
        const b = el('button', 'op', typeof o.t === 'object' ? FIG(o.t.fig, 'geo geoOp') + (o.t.t ? '<span>' + o.t.t + '</span>' : '') : o.t);
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
    const conFig = p.items.some(it => it.fig);
    const FG = figGrande(p.items[orden[0]].img || p.img); m.appendChild(FG.box);
    let k = 0;
    const carta = el('button', 'carta titila'); m.appendChild(carta);
    const cats = el('div', 'cats n' + p.categorias.length + (p.items.some(it => it.fig) ? ' conFig' : ''));
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
      const it = p.items[i], conAud = !(it.fig && !it.decir);
      carta.classList.toggle('sinAud', !conAud);
      if (it.fig) { carta.innerHTML = FIG(it.fig, 'geo geoCarta'); carta.classList.add('cartaFig'); }
      else { carta.textContent = it.t; carta.classList.remove('cartaFig'); }
      carta.classList.remove('titila'); void carta.offsetWidth; carta.classList.add('titila');
      carta.onclick = () => { if (conAud) hablar([aid(p, 'it' + i)], { interrumpir: true }); };
      if (conFig) FG.box.style.display = 'none';
      if (conAudio !== false && conAud) hablar([aid(p, 'it' + i)], { interrumpir: true });
    }
    function elegir(ci, b) {
      if (k >= orden.length) return;
      const i = orden[k], it = p.items[i];
      if (ci === it.cat) {
        if (!evaluado) { evaluado = true; acierto(); }
        chime(); listas[ci].appendChild(el('span', 'chip' + (it.fig ? ' chipFig' : ''), it.fig ? FIG(it.fig, 'geo geoChip') : it.t));
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
    return () => { const it0 = p.items[orden[0]]; if (!(it0.fig && !it0.decir)) hablar([aid(p, 'it' + orden[0])]); };
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
    const orden = p.enOrden ? p.items.map((it, i) => i) : barajar(p.items.map((it, i) => i));
    const carta = el('button', 'carta titila'); m.appendChild(carta);
    const wrap = el('div', 'escenaWrap'), box = el('div', 'escenaBox ' + (p.ancho ? 'ancho' : 'alto'));
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
      const cat = z.dataset.cat != null ? +z.dataset.cat : zi;
      if (cat === it.cat) {
        if (!evaluado) { evaluado = true; acierto(); }
        chime();
        if (z.tagName.toLowerCase() === 'line') { z.style.stroke = z.dataset.c; z.style.strokeOpacity = '.85'; z.style.strokeWidth = '9'; }
        else if (z.tagName.toLowerCase() === 'circle') { z.style.fill = z.dataset.c; z.style.fillOpacity = '1'; }
        else { z.style.fill = z.dataset.c; z.style.fillOpacity = p.ancho ? '1' : '.55'; }
        const t = box.querySelector('#zt' + cat); if (t) t.classList.add('ver');
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

  // ======================= GEOMETRÍA DIBUJADA POR CÓDIGO =======================
  // Cada función devuelve { g: '<g>…</g>', b: [minX, minY, maxX, maxY] } en coordenadas SVG (y hacia abajo).
  const GC = { linea: '#1a4f8b', rojo: '#e53935', verde: '#2e7d32', naranja: '#ef6c00', violeta: '#7b1fa2', gris: '#90a4ae', relleno: '#e3f0ff' };
  const rad = d => d * Math.PI / 180;
  const f1 = n => Math.round(n * 10) / 10;
  const P = (x, y) => f1(x) + ',' + f1(y);
  function caja(pts, pad) { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); return [Math.min(...xs) - pad, Math.min(...ys) - pad, Math.max(...xs) + pad, Math.max(...ys) + pad]; }
  function svgDe(o, cls, ancho) {
    const b = o.b, w = b[2] - b[0], h = b[3] - b[1];
    return '<svg class="' + (cls || 'geo') + '" viewBox="' + f1(b[0]) + ' ' + f1(b[1]) + ' ' + f1(w) + ' ' + f1(h) + '"' + (ancho ? ' style="max-width:' + ancho + 'px"' : '') +
      ' xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800">' + o.g + '</svg>';
  }
  function flecha(x1, y1, x2, y2, col, w) {
    const a = Math.atan2(y2 - y1, x2 - x1), L = 11;
    const p1 = [x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)], p2 = [x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)];
    return '<path d="M' + P(x2, y2) + ' L' + P(p1[0], p1[1]) + ' L' + P(p2[0], p2[1]) + 'Z" fill="' + col + '"/>' +
      '<line x1="' + f1(x1) + '" y1="' + f1(y1) + '" x2="' + f1(x2 - 6 * Math.cos(a)) + '" y2="' + f1(y2 - 6 * Math.sin(a)) + '" stroke="' + col + '" stroke-width="' + (w || 4) + '" stroke-linecap="round"/>';
  }
  // Recta "infinita" con flechas en ambos extremos, centrada en (cx,cy), dirección ang (grados, antihorario)
  function recta(cx, cy, ang, L, col, w) {
    const dx = Math.cos(rad(ang)) * L / 2, dy = -Math.sin(rad(ang)) * L / 2;
    return flecha(cx, cy, cx + dx, cy + dy, col, w) + flecha(cx, cy, cx - dx, cy - dy, col, w);
  }
  function cuadradito(vx, vy, a1, a2, s, col) {
    const u = [Math.cos(rad(a1)), -Math.sin(rad(a1))], v = [Math.cos(rad(a2)), -Math.sin(rad(a2))];
    return '<path d="M' + P(vx + u[0] * s, vy + u[1] * s) + ' L' + P(vx + (u[0] + v[0]) * s, vy + (u[1] + v[1]) * s) + ' L' + P(vx + v[0] * s, vy + v[1] * s) +
      '" fill="none" stroke="' + col + '" stroke-width="3"/>';
  }
  function arco(vx, vy, a1, a2, r, col, relleno) {
    const x1 = vx + r * Math.cos(rad(a1)), y1 = vy - r * Math.sin(rad(a1)), x2 = vx + r * Math.cos(rad(a2)), y2 = vy - r * Math.sin(rad(a2));
    const grande = ((a2 - a1) % 360 + 360) % 360 > 180 ? 1 : 0;
    return (relleno ? '<path d="M' + P(vx, vy) + ' L' + P(x1, y1) + ' A' + r + ',' + r + ' 0 ' + grande + ',0 ' + P(x2, y2) + 'Z" fill="' + relleno + '" opacity=".35"/>' : '') +
      '<path d="M' + P(x1, y1) + ' A' + r + ',' + r + ' 0 ' + grande + ',0 ' + P(x2, y2) + '" fill="none" stroke="' + col + '" stroke-width="3"/>';
  }
  // Par de rectas: tipo = 'recta' | 'paralelas' | 'perpendiculares' | 'oblicuas'
  function figRectas(tipo, rot, n) {
    rot = rot || 0; const c = GC.linea; let g = '';
    if (tipo === 'recta') g = recta(0, 0, rot, 200, c);
    else if (tipo === 'paralelas') {
      n = n || 2; const nx = -Math.sin(rad(rot)), ny = -Math.cos(rad(rot));
      for (let i = 0; i < n; i++) { const d = (i - (n - 1) / 2) * 44; g += recta(nx * d, ny * d, rot, 200, i % 2 ? GC.naranja : c); }
    } else if (tipo === 'perpendiculares') {
      g = recta(0, 0, rot, 190, c) + recta(0, 0, rot + 90, 150, GC.naranja) + cuadradito(0, 0, rot, rot + 90, 16, GC.rojo);
    } else {
      g = recta(0, 0, rot, 200, c) + recta(0, 0, rot + 38, 190, GC.naranja);
    }
    return { g, b: [-112, -88, 112, 88] };
  }
  // Ángulo: abertura a (grados), rotación rot; muestra marca (arco o cuadradito) y opcionalmente los grados
  function figAngulo(a, rot, o) {
    o = o || {}; rot = rot || 0; const L = o.L || 120, c = o.col || GC.linea;
    const a1 = rot, a2 = rot + a;
    const p1 = [L * Math.cos(rad(a1)), -L * Math.sin(rad(a1))], p2 = [L * Math.cos(rad(a2)), -L * Math.sin(rad(a2))];
    let g = '';
    g += a === 90 ? cuadradito(0, 0, a1, a2, 20, GC.rojo) : arco(0, 0, a1, a2, 30, GC.rojo, o.relleno === false ? null : '#ffcdd2');
    g += flecha(0, 0, p1[0], p1[1], c, 5) + flecha(0, 0, p2[0], p2[1], c, 5);
    g += '<circle cx="0" cy="0" r="6" fill="' + GC.rojo + '"/>';
    if (o.grados) { const m = (a1 + a2) / 2, r = a < 50 ? 64 : 52; g += '<text x="' + f1(r * Math.cos(rad(m))) + '" y="' + f1(-r * Math.sin(rad(m)) + 7) + '" font-size="20" fill="' + GC.rojo + '" text-anchor="middle">' + a + '°</text>'; }
    return { g, b: caja([[0, 0], p1, p2], 24) };
  }
  // Triángulo genérico con puntos en coordenadas "matemáticas" (y hacia arriba)
  function figTri(pts, o) {
    o = o || {}; const Q = pts.map(p => [p[0], -p[1]]);
    let g = '<polygon points="' + Q.map(p => P(p[0], p[1])).join(' ') + '" fill="' + (o.relleno || GC.relleno) + '" stroke="' + GC.linea + '" stroke-width="4" stroke-linejoin="round"/>';
    const cen = [(Q[0][0] + Q[1][0] + Q[2][0]) / 3, (Q[0][1] + Q[1][1] + Q[2][1]) / 3];
    for (let i = 0; i < 3; i++) {
      const A = Q[i], B = Q[(i + 1) % 3], M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      const dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
      let nx = -uy, ny = ux; if ((M[0] - cen[0]) * nx + (M[1] - cen[1]) * ny < 0) { nx = -nx; ny = -ny; }
      const t = o.ticks ? o.ticks[i] : 0;
      for (let k = 0; k < t; k++) { const off = (k - (t - 1) / 2) * 7, cx = M[0] + ux * off, cy = M[1] + uy * off; g += '<line x1="' + f1(cx - nx * 8) + '" y1="' + f1(cy - ny * 8) + '" x2="' + f1(cx + nx * 8) + '" y2="' + f1(cy + ny * 8) + '" stroke="' + GC.naranja + '" stroke-width="3.5"/>'; }
      if (o.lados && o.lados[i]) g += '<text x="' + f1(M[0] + nx * 22) + '" y="' + f1(M[1] + ny * 22 + 6) + '" font-size="17" fill="' + GC.linea + '" text-anchor="middle">' + o.lados[i] + '</text>';
    }
    (o.angulos || []).forEach((tipo, i) => {
      if (!tipo) return;
      const V = Q[i], A = Q[(i + 1) % 3], B = Q[(i + 2) % 3];
      const aA = Math.atan2(-(A[1] - V[1]), A[0] - V[0]) * 180 / Math.PI, aB = Math.atan2(-(B[1] - V[1]), B[0] - V[0]) * 180 / Math.PI;
      let a1 = aA, a2 = aB; let d = ((a2 - a1) % 360 + 360) % 360; if (d > 180) { a1 = aB; a2 = aA; }
      if (tipo === 'recto') g += cuadradito(V[0], V[1], a1, a2, 16, GC.rojo);
      else g += arco(V[0], V[1], a1, a2, tipo === 'obtuso' ? 24 : 20, tipo === 'obtuso' ? GC.violeta : GC.verde, null);
    });
    return { g, b: caja(Q, o.lados ? 34 : 18) };
  }
  const TRI = {
    equilatero: { pts: [[0, 0], [120, 0], [60, 103.9]], ticks: [1, 1, 1], lados: ['6 cm', '6 cm', '6 cm'] },
    isosceles: { pts: [[0, 0], [100, 0], [50, 109.1]], ticks: [0, 2, 2], lados: ['5 cm', '6 cm', '6 cm'] },
    escaleno: { pts: [[0, 0], [120, 0], [45, 66.1]], ticks: [0, 0, 0], lados: ['6 cm', '5 cm', '4 cm'] },
    rectangulo: { pts: [[0, 0], [130, 0], [0, 90]], angulos: ['recto', 'agudo', 'agudo'] },
    obtusangulo: { pts: [[0, 0], [150, 0], [-45, 70]], angulos: ['obtuso', 'agudo', 'agudo'] },
    acutangulo: { pts: [[0, 0], [130, 0], [75, 100]], angulos: ['agudo', 'agudo', 'agudo'] }
  };
  function figTriTipo(t, o) {
    const d = TRI[t]; o = Object.assign({}, o || {});
    const conLados = o.lados !== false, conAng = o.angulos !== false;
    return figTri(d.pts, { ticks: conLados ? d.ticks : null, lados: conLados ? d.lados : null, angulos: conAng ? d.angulos : null, relleno: o.relleno });
  }
  // Reloj con las agujas formando un ángulo
  function figReloj(h, mi) {
    let g = '<circle cx="0" cy="0" r="92" fill="#fff" stroke="' + GC.linea + '" stroke-width="7"/>';
    for (let i = 1; i <= 12; i++) { const a = rad(90 - i * 30); g += '<text x="' + f1(74 * Math.cos(a)) + '" y="' + f1(-74 * Math.sin(a) + 7) + '" font-size="19" text-anchor="middle" fill="#37474f">' + i + '</text>'; }
    const ah = 90 - ((h % 12) + mi / 60) * 30, am = 90 - mi * 6;
    let a1 = am, a2 = ah; let d = ((a2 - a1) % 360 + 360) % 360; if (d > 180) { a1 = ah; a2 = am; }
    const dd = ((ah - am) % 360 + 360) % 360, recto = Math.abs(dd - 90) < 0.5 || Math.abs(dd - 270) < 0.5;
    g += recto ? cuadradito(0, 0, a1, a2, 18, GC.rojo) : arco(0, 0, a1, a2, 26, GC.rojo, '#ffcdd2');
    g += '<line x1="0" y1="0" x2="' + f1(48 * Math.cos(rad(ah))) + '" y2="' + f1(-48 * Math.sin(rad(ah))) + '" stroke="#263238" stroke-width="8" stroke-linecap="round"/>';
    g += '<line x1="0" y1="0" x2="' + f1(66 * Math.cos(rad(am))) + '" y2="' + f1(-66 * Math.sin(rad(am))) + '" stroke="' + GC.linea + '" stroke-width="5" stroke-linecap="round"/>';
    g += '<circle cx="0" cy="0" r="7" fill="' + GC.rojo + '"/>';
    return { g, b: [-104, -104, 104, 104] };
  }
  // Prisma rectangular en perspectiva caballera (zonas tocables opcionales)
  const PR = { A: [40, 95], B: [190, 95], C: [190, 185], D: [40, 185], A2: [100, 50], B2: [250, 50], C2: [250, 140], D2: [100, 140] };
  function figPrisma(o) {
    o = o || {}; const p = k => P(PR[k][0], PR[k][1]);
    const caras = [['frente', 'A B C D', '#bbdefb'], ['arriba', 'A A2 B2 B', '#e3f2fd'], ['costado', 'B B2 C2 C', '#90caf9']];
    let g = '';
    caras.forEach(([n, ks, col], i) => {
      const pts = ks.split(' ').map(p).join(' ');
      g += o.tocar ? '<polygon class="zona" data-cat="' + i + '" data-c="' + ['#ffb74d', '#81c784', '#ba68c8'][i] + '" points="' + pts + '" fill="' + col + '"/>'
                   : '<polygon class="cara_' + n + '" points="' + pts + '" fill="' + col + '"/>';
    });
    // aristas ocultas (punteadas)
    [['A2', 'D2'], ['D2', 'C2'], ['D', 'D2']].forEach(([a, b]) => { g += '<line x1="' + PR[a][0] + '" y1="' + PR[a][1] + '" x2="' + PR[b][0] + '" y2="' + PR[b][1] + '" stroke="#78909c" stroke-width="2.5" stroke-dasharray="6 5" pointer-events="none"/>'; });
    const vis = [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'A2'], ['A2', 'B2'], ['B', 'B2'], ['B2', 'C2'], ['C', 'C2']];
    vis.forEach(([a, b], i) => { g += '<line class="arista_' + i + '" x1="' + PR[a][0] + '" y1="' + PR[a][1] + '" x2="' + PR[b][0] + '" y2="' + PR[b][1] + '" stroke="' + GC.linea + '" stroke-width="4.5" stroke-linecap="round" pointer-events="none"/>'; });
    if (o.tocar) vis.forEach(([a, b]) => { g += '<line class="zona zArista" data-cat="3" data-c="' + GC.rojo + '" x1="' + PR[a][0] + '" y1="' + PR[a][1] + '" x2="' + PR[b][0] + '" y2="' + PR[b][1] + '" stroke="#000" stroke-opacity="0" stroke-width="18" stroke-linecap="round"/>'; });
    ['A', 'B', 'C', 'D', 'A2', 'B2', 'C2'].forEach(k => {
      g += o.tocar ? '<circle class="zona zVert" data-cat="4" data-c="' + GC.rojo + '" cx="' + PR[k][0] + '" cy="' + PR[k][1] + '" r="13" fill="#fff" fill-opacity=".01" stroke="' + GC.linea + '" stroke-width="0"/>'
                   + '<circle cx="' + PR[k][0] + '" cy="' + PR[k][1] + '" r="5" fill="' + GC.linea + '" pointer-events="none"/>'
                   : '<circle cx="' + PR[k][0] + '" cy="' + PR[k][1] + '" r="5" fill="' + GC.linea + '"/>';
    });
    return { g, b: [20, 30, 270, 205] };
  }
  // Cuerpos simples para "plana o curva"
  function figCuerpo(t) {
    let g = '';
    if (t === 'esfera') g = '<defs><radialGradient id="gEsf" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#ef6c00"/></radialGradient></defs><circle cx="0" cy="0" r="62" fill="url(#gEsf)" stroke="#bf360c" stroke-width="3"/><path d="M-62,0 Q0,26 62,0" fill="none" stroke="#fff" stroke-width="5"/>';
    else if (t === 'cilindro') g = '<path d="M-48,-55 L-48,55 A48,16 0 0,0 48,55 L48,-55" fill="#e53935" stroke="#8e0000" stroke-width="3"/><ellipse cx="0" cy="-55" rx="48" ry="16" fill="#cfd8dc" stroke="#8e0000" stroke-width="3"/><rect x="-48" y="-12" width="96" height="30" fill="#fff" opacity=".85"/>';
    else if (t === 'cono') g = '<path d="M-36,-30 L0,75 L36,-30Z" fill="#d7a35b" stroke="#8d6e63" stroke-width="3"/><path d="M-36,-30 L-6,-10 M-24,-30 L6,-4 M-10,-30 L18,-6 M6,-30 L28,-14" stroke="#8d6e63" stroke-width="2"/><circle cx="-14" cy="-42" r="24" fill="#f8bbd0"/><circle cx="14" cy="-44" r="24" fill="#fce4ec"/><circle cx="0" cy="-62" r="22" fill="#f48fb1"/>';
    else if (t === 'dado') g = '<path d="M-50,-20 L10,-20 L10,40 L-50,40Z" fill="#fff" stroke="#37474f" stroke-width="3"/><path d="M-50,-20 L-25,-45 L35,-45 L10,-20Z" fill="#eceff1" stroke="#37474f" stroke-width="3"/><path d="M10,-20 L35,-45 L35,15 L10,40Z" fill="#cfd8dc" stroke="#37474f" stroke-width="3"/><circle cx="-20" cy="10" r="6"/><circle cx="-34" cy="-6" r="5"/><circle cx="-6" cy="26" r="5"/><circle cx="5" cy="-33" r="4.5"/><circle cx="22" cy="0" r="4.5"/><circle cx="22" cy="18" r="4.5"/>';
    else if (t === 'ladrillo') g = '<path d="M-70,-5 L40,-5 L40,40 L-70,40Z" fill="#d84315" stroke="#6d2a0a" stroke-width="3"/><path d="M-70,-5 L-40,-30 L70,-30 L40,-5Z" fill="#ff7043" stroke="#6d2a0a" stroke-width="3"/><path d="M40,-5 L70,-30 L70,15 L40,40Z" fill="#bf360c" stroke="#6d2a0a" stroke-width="3"/>';
    else if (t === 'caja') g = '<path d="M-75,-10 L35,-10 L35,50 L-75,50Z" fill="#a1887f" stroke="#4e342e" stroke-width="3"/><path d="M-75,-10 L-40,-45 L70,-45 L35,-10Z" fill="#bcaaa4" stroke="#4e342e" stroke-width="3"/><path d="M35,-10 L70,-45 L70,15 L35,50Z" fill="#8d6e63" stroke="#4e342e" stroke-width="3"/><rect x="-55" y="8" width="60" height="22" rx="4" fill="#fff" opacity=".8"/>';
    return { g, b: [-85, -90, 85, 85] };
  }
  // Punto de entrada: spec → <svg>
  function FIG(s, cls, ancho) {
    if (!s) return '';
    const o = s.f === 'rectas' ? figRectas(s.tipo, s.rot, s.n)
      : s.f === 'angulo' ? figAngulo(s.a, s.rot, s)
      : s.f === 'tri' ? figTriTipo(s.tipo, s)
      : s.f === 'reloj' ? figReloj(s.h, s.m || 0)
      : s.f === 'prisma' ? figPrisma(s)
      : s.f === 'cuerpo' ? figCuerpo(s.tipo) : null;
    return o ? svgDe(o, cls, ancho) : '';
  }
  // Envuelve un dibujo en un grupo trasladado/escalado (para componer escenas de narración)
  function G(s, x, y, esc, extra) {
    const o = s.f === 'rectas' ? figRectas(s.tipo, s.rot, s.n) : s.f === 'angulo' ? figAngulo(s.a, s.rot, s) : s.f === 'tri' ? figTriTipo(s.tipo, s)
      : s.f === 'reloj' ? figReloj(s.h, s.m || 0) : s.f === 'prisma' ? figPrisma(s) : figCuerpo(s.tipo);
    const cx = (o.b[0] + o.b[2]) / 2, cy = (o.b[1] + o.b[3]) / 2;
    return '<g ' + (extra || '') + ' transform="translate(' + x + ',' + y + ') scale(' + esc + ') translate(' + f1(-cx) + ',' + f1(-cy) + ')">' + o.g + '</g>';
  }

  // ======================= ESCENAS SVG (narraciones y prisma para tocar) =======================
  const HDR = (w, h, cls) => '<svg viewBox="0 0 ' + w + ' ' + h + '" class="' + (cls || 'escena') + '" xmlns="http://www.w3.org/2000/svg" font-family="Nunito,Arial,sans-serif" font-weight="800" text-anchor="middle">';
  const panel = (x, y, w, h) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="#fff" stroke="#cfe0f5" stroke-width="2"/>';
  const rotulo = (x, y, t, col, fs) => '<rect x="' + (x - t.length * (fs || 15) * 0.33 - 10) + '" y="' + (y - (fs || 15) - 3) + '" width="' + (t.length * (fs || 15) * 0.66 + 20) + '" height="' + ((fs || 15) + 12) + '" rx="10" fill="' + col + '"/><text x="' + x + '" y="' + (y + 2) + '" font-size="' + (fs || 15) + '" fill="#fff">' + t + '</text>';
  const ESCENAS = {
    rectas: HDR(420, 300) + '<rect width="420" height="300" fill="#f3f8ff"/>' +
      panel(8, 8, 198, 136) + panel(214, 8, 198, 136) + panel(8, 156, 198, 136) + panel(214, 156, 198, 136) +
      '<g id="c_recta" class="capa">' + G({ f: 'rectas', tipo: 'recta', rot: 12 }, 107, 66, 0.82) + rotulo(107, 132, 'recta', GC.linea) + '</g>' +
      '<g id="c_par" class="capa">' + G({ f: 'rectas', tipo: 'paralelas', rot: 0 }, 313, 66, 0.82) + rotulo(313, 132, 'paralelas', GC.verde) + '</g>' +
      '<g id="c_perp" class="capa">' + G({ f: 'rectas', tipo: 'perpendiculares', rot: 0 }, 107, 214, 0.72) + rotulo(107, 280, 'perpendiculares', GC.rojo) + '</g>' +
      '<g id="c_obl" class="capa">' + G({ f: 'rectas', tipo: 'oblicuas', rot: 0 }, 313, 214, 0.72) + rotulo(313, 280, 'oblicuas', GC.naranja) + '</g></svg>',

    angulos: HDR(420, 300) + '<rect width="420" height="300" fill="#f3f8ff"/>' + panel(8, 8, 238, 284) + panel(254, 8, 158, 284) +
      // ángulo grande de 55° con vértice en (40,250)
      '<g id="c_abert" class="capa"><path d="M40,250 L105,250 A65,65 0 0,0 77.3,196.8Z" fill="#ffcdd2"/><path d="M105,250 A65,65 0 0,0 77.3,196.8" fill="none" stroke="#e53935" stroke-width="4"/>' + rotulo(118, 214, 'abertura', GC.rojo, 14) + '</g>' +
      '<g>' + flecha(40, 250, 230, 250, GC.linea, 6) + flecha(40, 250, 149, 94.3, GC.linea, 6) + '</g>' +
      '<g id="c_lados" class="capa">' + rotulo(170, 276, 'lado', GC.linea, 14) + rotulo(66, 150, 'lado', GC.linea, 14) + '</g>' +
      '<g id="c_vert" class="capa"><circle cx="40" cy="250" r="9" fill="#e53935"/>' + rotulo(48, 284, 'vértice', GC.rojo, 14) + '</g>' +
      '<g id="c_agudo" class="capa">' + G({ f: 'angulo', a: 40, rot: 0, L: 90 }, 300, 62, 0.5) + '<text x="368" y="52" font-size="15" fill="' + GC.verde + '">agudo</text><text x="368" y="72" font-size="12" fill="#37474f">menos de 90°</text></g>' +
      '<g id="c_recto" class="capa">' + G({ f: 'angulo', a: 90, rot: 0, L: 90 }, 300, 150, 0.5) + '<text x="368" y="142" font-size="15" fill="' + GC.rojo + '">recto</text><text x="368" y="162" font-size="12" fill="#37474f">90°</text></g>' +
      '<g id="c_obtuso" class="capa">' + G({ f: 'angulo', a: 130, rot: 0, L: 90 }, 300, 244, 0.5) + '<text x="368" y="236" font-size="15" fill="' + GC.violeta + '">obtuso</text><text x="368" y="256" font-size="12" fill="#37474f">más de 90°</text></g></svg>',

    triLados: HDR(420, 250) + '<rect width="420" height="250" fill="#f3f8ff"/>' + panel(6, 34, 132, 210) + panel(144, 34, 132, 210) + panel(282, 34, 132, 210) +
      '<g id="c_tl0" class="capa">' + rotulo(210, 22, 'Según sus lados', GC.linea, 15) + '</g>' +
      '<g id="c_equi" class="capa">' + G({ f: 'tri', tipo: 'equilatero', angulos: false }, 72, 125, 0.72) + rotulo(72, 205, 'equilátero', GC.verde, 14) + '<text x="72" y="232" font-size="11.5" fill="#37474f">3 lados iguales</text></g>' +
      '<g id="c_iso" class="capa">' + G({ f: 'tri', tipo: 'isosceles', angulos: false }, 210, 122, 0.66) + rotulo(210, 205, 'isósceles', GC.naranja, 14) + '<text x="210" y="232" font-size="11.5" fill="#37474f">2 lados iguales</text></g>' +
      '<g id="c_esc" class="capa">' + G({ f: 'tri', tipo: 'escaleno', angulos: false }, 348, 125, 0.72) + rotulo(348, 205, 'escaleno', GC.violeta, 14) + '<text x="348" y="232" font-size="11.5" fill="#37474f">3 lados desiguales</text></g></svg>',

    triAngulos: HDR(420, 250) + '<rect width="420" height="250" fill="#f3f8ff"/>' + panel(6, 34, 132, 210) + panel(144, 34, 132, 210) + panel(282, 34, 132, 210) +
      rotulo(210, 22, 'Según sus ángulos', GC.linea, 15) +
      '<g id="c_rect" class="capa">' + G({ f: 'tri', tipo: 'rectangulo', lados: false }, 72, 125, 0.75) + rotulo(72, 205, 'rectángulo', GC.rojo, 14) + '<text x="72" y="232" font-size="11.5" fill="#37474f">1 ángulo recto</text></g>' +
      '<g id="c_obt" class="capa">' + G({ f: 'tri', tipo: 'obtusangulo', lados: false }, 210, 125, 0.62) + rotulo(210, 205, 'obtusángulo', GC.violeta, 14) + '<text x="210" y="232" font-size="11.5" fill="#37474f">1 ángulo obtuso</text></g>' +
      '<g id="c_acu" class="capa">' + G({ f: 'tri', tipo: 'acutangulo', lados: false }, 348, 122, 0.75) + rotulo(348, 205, 'acutángulo', GC.verde, 14) + '<text x="348" y="232" font-size="11.5" fill="#37474f">3 ángulos agudos</text></g></svg>',

    prisma: HDR(420, 300) + '<rect width="420" height="300" fill="#f3f8ff"/>' +
      '<g transform="translate(-6,30)">' + figPrisma().g +
      '<g id="c_cara" class="capa"><polygon points="40,95 190,95 190,185 40,185" fill="#ffb74d" opacity=".85"/>' + rotulo(115, 145, 'cara', GC.naranja, 16) + '</g>' +
      '<g id="c_arista" class="capa"><line x1="40" y1="95" x2="190" y2="95" stroke="#e53935" stroke-width="9" stroke-linecap="round"/>' + rotulo(115, 80, 'arista', GC.rojo, 15) + '</g>' +
      '<g id="c_vert" class="capa"><circle cx="190" cy="95" r="11" fill="#e53935"/>' + rotulo(200, 30, 'vértice', GC.rojo, 15) + '<line x1="196" y1="38" x2="191" y2="84" stroke="#e53935" stroke-width="3"/></g></g>' +
      '<g id="c_cuenta" class="capa">' + rotulo(205, 268, '6 caras · 12 aristas · 8 vértices', GC.linea, 15) + '</g>' +
      '<g id="c_curva" class="capa">' + panel(300, 40, 112, 210) + G({ f: 'cuerpo', tipo: 'esfera' }, 356, 100, 0.55) + G({ f: 'cuerpo', tipo: 'cilindro' }, 356, 190, 0.5) +
      '<text x="356" y="238" font-size="12.5" fill="' + GC.naranja + '">superficie curva</text></g></svg>',

    prismaTocar: svgDe(figPrisma({ tocar: true }), 'mapaSvg prismaSvg')
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
    // 🔊 Tocá para empezar: el primer toque destraba el sonido (Chrome/Safari bloquean el audio antes de tocar)
    if (!E.arrancado) {
      const arr = el('button', 'arranque', '<span class="arr-ico">🔊</span><span>Tocá para empezar</span>'); arr.id = 'bArranque';
      arr.onclick = () => {
        E.arrancado = true;
        try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.resume) ctx.resume(); } catch (e) {}
        arr.remove();
        hablar([D.globales.portada ? 'g_portada' : aid(D.pantallas[0], 'inst')]);
      };
      m.appendChild(arr);
    }
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
