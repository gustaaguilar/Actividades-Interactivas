/* ============================================================
   motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
   Núcleo común (cola de audio, navegación, puntaje, portada/cierre,
   lightbox, pasos) + mecánicas de datos y decimales:
   narra (gráfico / latas / cien / cuenta), opcion, vf, marcar,
   sumar (juntar fichas hasta un objetivo) y barras (completar gráfico).
   Visuales dibujados por código (SVG/HTML), sin imágenes pesadas.
   ============================================================ */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* =================== ESTADO =================== */
  const S = { i: 0, aciertos: 0, errores: 0, puntos: 0, eval: {}, completo: false, salir: null };

  function evaluar(clave, ok) {
    if (S.eval[clave] !== undefined) return;   // solo cuenta el primer intento
    S.eval[clave] = ok;
    if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto || 10; } else S.errores++;
    pintarPuntos();
  }

  /* =================== AUDIO: cola global =================== */
  const AQ = { q: [], cur: null, gen: 0, el: null, timer: null };
  function textoAudio(k) { return (D.audios && D.audios[k]) || ''; }
  function play(keys, cb) {
    keys = [].concat(keys || []).filter(Boolean);
    if (!keys.length) { if (cb) setTimeout(cb, 0); return; }
    keys.forEach((k, j) => AQ.q.push({ k, cb: j === keys.length - 1 ? cb : null }));
    if (!AQ.cur) siguienteAudio();
    actualizarNav();
  }
  function siguienteAudio() {
    const it = AQ.q.shift();
    if (!it) { AQ.cur = null; actualizarNav(); return; }
    AQ.cur = it;
    const g = AQ.gen;
    let hecho = false, fallo = false;
    const fin = () => {
      if (hecho || g !== AQ.gen) return;
      hecho = true; AQ.cur = null;
      if (it.cb) { try { it.cb(); } catch (e) { console.error(e); } }
      if (g === AQ.gen && !AQ.cur) siguienteAudio();   // si el callback ya lanzó otro audio, no pisarlo
    };
    const respaldo = () => { // sin archivo o reproducción bloqueada: tiempo de lectura
      if (fallo || hecho) return; fallo = true;
      AQ.timer = setTimeout(fin, window.__RAPIDO ? 5 : Math.min(7000, 350 + textoAudio(it.k).length * 45));
    };
    let a;
    try { a = new Audio('audio/' + it.k + '.mp3'); } catch (e) { respaldo(); return; }
    AQ.el = a;
    a.onended = fin;
    a.onerror = respaldo;
    try { const p = a.play(); if (p && p.catch) p.catch(respaldo); else if (!p && window.__SIN_AUDIO) respaldo(); } catch (e) { respaldo(); }
  }
  function pararAudio() {
    AQ.gen++;
    if (AQ.el) { try { AQ.el.onended = null; AQ.el.onerror = null; AQ.el.pause(); } catch (e) { } }
    clearTimeout(AQ.timer);
    AQ.q = []; AQ.cur = null; AQ.el = null;
    actualizarNav();
  }
  const audioOcupado = () => !!AQ.cur || AQ.q.length > 0;

  let actx = null;
  function sonido(tipo) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notas = tipo === 'ok' ? [660, 880] : [220, 180];
      notas.forEach((f, j) => {
        const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + j * 0.12;
        o.type = tipo === 'ok' ? 'sine' : 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 0.22);
      });
    } catch (e) { }
  }

  /* =================== UTILIDADES =================== */
  function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function bloquearHasta(el, keys, cb) {
    el.classList.add('espera');
    play(keys, () => { el.classList.remove('espera'); if (cb) cb(); });
  }
  function completar() { S.completo = true; actualizarNav(); }
  function sacudir(el) { if (!el) return; el.classList.remove('mal'); void el.offsetWidth; el.classList.add('mal'); }
  const coma = v => String(Math.round(v * 1000) / 1000).replace('.', ',');
  const cent = v => Math.round(v * 100);           // trabajar en centésimos evita errores de coma flotante
  function profeHTML() {
    const m = D.meta;
    return `<div class="profe"><img src="${m.fotoMini || m.foto}" alt="Profe" id="fotoProfe" onerror="this.outerHTML='<div class=&quot;profe-emoji&quot; id=&quot;fotoProfe&quot;>👨‍🏫</div>'">
      <div class="profe-txt"><div>${m.autor}</div><div class="mail">✉️ ${m.mail}</div></div></div>`;
  }
  function activarLightbox() {
    const f = $('#fotoProfe'); if (!f) return;
    f.addEventListener('click', () => {
      const lb = $('#lightbox'), im = $('#lbImg');
      im.src = D.meta.foto; im.classList.remove('zoom'); im.style.transformOrigin = '50% 50%';
      lb.classList.add('ver');
    });
  }
  function initLightbox() {
    const lb = $('#lightbox'), im = $('#lbImg');
    $('#lbFrase').textContent = D.meta.frase;
    im.addEventListener('click', ev => {
      const r = im.getBoundingClientRect();
      if (!im.classList.contains('zoom')) {
        const px = r.width ? ((ev.clientX - r.left) / r.width * 100) : 50, py = r.height ? ((ev.clientY - r.top) / r.height * 100) : 50;
        im.style.transformOrigin = px + '% ' + py + '%'; im.classList.add('zoom');
      } else im.classList.remove('zoom');
    });
    $('#lbCerrar').addEventListener('click', () => { lb.classList.remove('ver'); im.classList.remove('zoom'); im.style.transformOrigin = '50% 50%'; });
  }

  /* =================== VISUALES DIBUJADOS POR CÓDIGO =================== */
  const G = { W: 420, H: 272, x0: 46, y0: 222, yTop: 30 };
  function gY(v, max) { return G.y0 - v / max * (G.y0 - G.yTop); }
  function totalGraf(g) {
    if (g.total) return g.total;
    return g.cats.reduce((a, c) => a + (typeof c.val === 'number' ? c.val : Object.values(c.val).reduce((x, y) => x + y, 0)), 0);
  }
  function txtValor(v, fmt, tot) {
    if (fmt === 'dec') return (v / tot).toFixed(2).replace('.', ',');
    if (fmt === 'pct') return Math.round(v / tot * 100) + '%';
    return String(v);
  }
  /* Gráfico de barras (simple o doble). o: {formato, luz[], ocultar{}, valores{}, etiq{}, anim, malk, malv} */
  function svgGrafico(g, o) {
    o = o || {};
    const n = g.cats.length, gw = (G.W - 8 - G.x0) / n, tot = totalGraf(g), fmt = o.formato || 'votos';
    const luz = o.luz && o.luz.length ? o.luz : null;
    const conLuz = k => !luz || luz.some(l => k === l || k.indexOf(l + '-') === 0);
    let s = `<svg class="graf" viewBox="0 0 ${G.W} ${G.H}" xmlns="http://www.w3.org/2000/svg">`;
    const tit = fmt === 'votos' ? g.titulo : (g.tituloRel || g.titulo);
    if (tit) s += `<text x="${G.W / 2}" y="17" class="g-tit">${tit}</text>`;
    for (let t = 0; t <= g.max + 1e-9; t += g.paso) {
      const y = gY(t, g.max);
      s += `<line x1="${G.x0}" x2="${G.W - 8}" y1="${y}" y2="${y}" class="g-grid"/><text x="${G.x0 - 6}" y="${y + 4}" class="g-eje">${fmt === 'votos' ? t : txtValor(t, fmt, tot)}</text>`;
    }
    const series = g.series || [{ id: '' }];
    const m = series.length, bw = m === 1 ? gw * 0.5 : gw * 0.3;
    g.cats.forEach((c, i) => {
      const cx = G.x0 + gw * (i + 0.5);
      series.forEach((se, j) => {
        const k = m === 1 ? c.id : c.id + '-' + se.id;
        let v = m === 1 ? c.val : c.val[se.id];
        if (o.valores && o.valores[k] != null) v = o.valores[k];
        const x = cx + (j - (m - 1) / 2) * (bw + 3) - bw / 2, col = m === 1 ? c.color : se.color;
        const cls = 'barra' + (conLuz(k) ? '' : ' atenua') + (o.anim === true || (o.anim && o.anim.indexOf(k) >= 0) ? ' crece' : '') + (o.resalta && o.resalta.indexOf(k) >= 0 ? ' resalta' : '');
        if (o.ocultar && o.ocultar[k]) {
          s += `<rect x="${x}" y="${G.yTop}" width="${bw}" height="${G.y0 - G.yTop}" class="g-slot${o.actual === k ? ' titila-svg' : ''}" data-k="${k}"/>`;
          if (o.malk === k) s += `<rect x="${x}" y="${gY(o.malv, g.max)}" width="${bw}" height="${G.y0 - gY(o.malv, g.max)}" class="barra malbar"/>`;
          return;
        }
        if (o.malk === k) s += `<rect x="${x}" y="${gY(o.malv, g.max)}" width="${bw}" height="${G.y0 - gY(o.malv, g.max)}" class="barra malbar"/>`;
        s += `<rect x="${x}" y="${gY(v, g.max)}" width="${bw}" height="${G.y0 - gY(v, g.max)}" fill="${col}" class="${cls}${o.actual === k ? ' titila-svg' : ''}" data-k="${k}" rx="2"/>`;
        const verEtiq = m === 1 ? true : !!(o.etiq && o.etiq[k]);
        if (verEtiq) s += `<text x="${x + bw / 2}" y="${gY(v, g.max) - 5}" class="g-val${conLuz(k) ? '' : ' atenua'}${m > 1 ? ' chica' : ''}">${txtValor(v, fmt, tot)}</text>`;
      });
      const catLuz = !luz || luz.some(l => l === c.id || l.indexOf(c.id + '-') === 0);
      s += `<text x="${cx}" y="${G.y0 + 20}" class="g-cat${catLuz ? '' : ' atenua'}">${c.emoji ? c.emoji + ' ' : ''}${c.nombre}</text>`;
    });
    s += `<line x1="${G.x0}" x2="${G.W - 8}" y1="${G.y0}" y2="${G.y0}" class="g-base"/>`;
    if (g.series) {
      const lx = G.W / 2 - 70;
      g.series.forEach((se, j) => { s += `<rect x="${lx + j * 90}" y="${G.H - 17}" width="14" height="14" fill="${se.color}" rx="2"/><text x="${lx + j * 90 + 19}" y="${G.H - 5}" class="g-ley">${se.nombre}</text>`; });
    }
    return s + '</svg>';
  }
  /* Latas de pintura (6, en grilla 3×2) */
  function lataSVG(l, x, y, esc, extra) {
    const w = 60 * esc, h = 66 * esc;
    return `<g class="lata${extra || ''}" data-k="${l.id}">
      <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${7 * esc}" fill="${l.color}" stroke="#0003" stroke-width="2"/>
      <ellipse cx="${x}" cy="${y - h / 2}" rx="${w / 2}" ry="${8 * esc}" fill="${l.tapa || l.color}" stroke="#0003" stroke-width="2"/>
      <path d="M${x - w / 2 + 4} ${y - h / 2 - 2} Q ${x} ${y - h / 2 - 34 * esc} ${x + w / 2 - 4} ${y - h / 2 - 2}" fill="none" stroke="#8a8a8a" stroke-width="${2.5 * esc}"/>
      <rect x="${x - 25 * esc}" y="${y - 10 * esc}" width="${50 * esc}" height="${22 * esc}" rx="4" fill="#fff"/>
      <text x="${x}" y="${y + 6 * esc}" class="l-lit" style="font-size:${15 * esc}px">${coma(l.litros)} L</text></g>`;
  }
  function svgLatas(o) {
    const L = D.latas, luz = o.luz && o.luz.length ? o.luz : null;
    let s = `<svg class="latas" viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg">`;
    L.forEach((l, i) => {
      const x = 70 + (i % 3) * 140, y = 70 + Math.floor(i / 3) * 122;
      s += lataSVG(l, x, y, 1, luz && luz.indexOf(l.id) < 0 ? ' atenua' : (luz ? ' resalta' : ''));
      s += `<text x="${x}" y="${y + 52}" class="l-nom${luz && luz.indexOf(l.id) < 0 ? ' atenua' : ''}">${l.nombre}</text>`;
    });
    return s + '</svg>';
  }
  function lataMini(l) { return `<svg viewBox="0 0 70 80" class="lmini">${lataSVG(l, 35, 46, 0.8)}</svg>`; }
  /* Cuadrícula de 100 */
  function cienHTML(o) {
    let h = `<div class="cien">`;
    for (let i = 0; i < 100; i++) h += `<i class="${i < o.n ? 'on' : ''}" style="${i < o.n ? 'background:' + (o.color || '#fb8500') : ''}"></i>`;
    return h + `</div><div class="cien-rot">${o.rotulo || (o.n + ' de 100')}</div>`;
  }
  /* Cuenta vertical con la coma debajo de la coma (o mal alineada, como la hizo Ramiro) */
  function cuentaHTML(c, o) {
    const filas = [c.a, c.b].map(String);
    const res = o.verR ? String(c.r) : (o.mal != null ? String(o.mal) : null);
    const todas = res != null ? filas.concat(res) : filas;
    let cols, celdas;
    if (o.derecha) {                  // alineada a la derecha (error de Ramiro)
      const L = Math.max(...todas.map(t => t.length));
      cols = L;
      celdas = t => { const a = Array(L - t.length).fill('').concat(t.split('')); return a.map(ch => ({ ch, cl: ch === ',' ? 'c-coma' : 'c-dig' })); };
    } else {
      const partes = todas.map(t => t.split(','));
      const mi = Math.max(...partes.map(p => p[0].length)), md = Math.max(0, ...partes.map(p => (p[1] || '').length));
      cols = mi + (md ? 1 + md : 0);
      celdas = t => {
        const [e, d = ''] = t.split(',');
        const a = Array(mi - e.length).fill({ ch: '', cl: 'c-ent' }).concat(e.split('').map(ch => ({ ch, cl: 'c-ent' })));
        if (md) { a.push({ ch: t.indexOf(',') >= 0 ? ',' : '', cl: 'c-coma' }); for (let j = 0; j < md; j++) a.push({ ch: d[j] || '', cl: 'c-dec' }); }
        return a;
      };
    }
    const fila = (t, op, cls) => `<div class="cf ${cls || ''}"><span class="c-op">${op || ''}</span>${celdas(t).map(x => `<span class="${x.cl}">${x.ch}</span>`).join('')}</div>`;
    let h = `<div class="cuenta${o.luz ? ' luz-' + o.luz : ''}" style="--cols:${cols + 1}">`;
    h += fila(filas[0]) + fila(filas[1], c.op) + '<div class="c-linea"></div>';
    if (o.verR) h += fila(String(c.r), '', 'c-res bien-t');
    else if (o.mal != null) h += fila(String(o.mal), '', 'c-res mal-t');
    else h += `<div class="cf c-res"><span class="c-op"></span><span class="c-hueco titila">?</span></div>`;
    return h + (o.mal != null && !o.verR ? '<div class="c-marca">✗</div>' : '') + '</div>';
  }
  function visualHTML(o) {
    const t = o.tipo;
    let h = '';
    if (t === 'grafico') h = svgGrafico(D.graficos[o.graf], o);
    else if (t === 'latas') h = svgLatas(o);
    else if (t === 'cien') h = cienHTML(o);
    else if (t === 'cuenta') h = cuentaHTML(o.cuenta, o);
    else if (t === 'img') h = `<img class="vis-img" src="${o.src}" alt="" onerror="this.style.visibility='hidden'">`;
    return `<div class="vis vis-${t}">${h}<div class="mano">👆</div></div>`;
  }
  function apuntar(cont, k) {
    const mano = $('.mano', cont); if (!mano) return;
    const vis = $('.vis', cont);
    const obj = k ? (k === 'coma' ? $('.c-coma', cont) : $(`[data-k="${k}"]`, cont)) : null;
    if (!obj) { mano.classList.remove('ver'); return; }
    const r0 = vis.getBoundingClientRect(), r1 = obj.getBoundingClientRect();
    const x = r0.width ? (r1.left - r0.left + r1.width / 2) / r0.width * 100 : 50;
    const y = r0.height ? (r1.top - r0.top + Math.min(r1.height * 0.5, 40)) / r0.height * 100 : 50;
    mano.style.left = x + '%'; mano.style.top = y + '%'; mano.classList.add('ver');
  }

  /* =================== NAVEGACIÓN =================== */
  const REQUIERE = { opcion: 1, vf: 1, marcar: 1, sumar: 1, barras: 1 };
  function actualizarNav() {
    const P = D.pantallas[S.i], b = $('#btnSig'); if (!b || !P) return;
    b.disabled = audioOcupado() || (REQUIERE[P.tipo] && !S.completo);
    $('#navPrev').disabled = S.i === 0;
    $('#navNext').disabled = S.i >= D.pantallas.length - 1;
    $('#revPrev').style.visibility = S.i === 0 ? 'hidden' : 'visible';
    $('#revNext').style.visibility = S.i >= D.pantallas.length - 1 ? 'hidden' : 'visible';
  }
  function pintarPuntos() { const p = $('#puntos'); if (p) p.textContent = '⭐ ' + S.puntos; }
  function ir(i) {
    if (i < 0 || i >= D.pantallas.length) return;
    if (S.salir) { try { S.salir(); } catch (e) { } S.salir = null; }
    pararAudio();
    S.i = i; S.completo = false;
    const P = D.pantallas[i], M = $('#pantalla');
    M.innerHTML = ''; M.className = 'p-' + P.tipo;
    const conBarra = P.tipo !== 'portada' && P.tipo !== 'cierre';
    document.body.classList.toggle('sin-barras', !conBarra);
    $('#titulo').innerHTML = P.titulo || '';
    $('#prog').textContent = i + ' / ' + (D.pantallas.length - 2);
    pintarPuntos();
    const r = R[P.tipo];
    if (r) r(P, M); else M.innerHTML = '<p>Pantalla desconocida: ' + P.tipo + '</p>';
    actualizarNav();
  }

  /* =================== RENDERERS =================== */
  const R = {};

  R.portada = function (P, M) {
    const m = D.meta;
    M.innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div>
      <h1>${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <img class="port-img" src="${P.img}" alt="" onerror="this.style.display='none'">
      <div class="port-fila"><button class="btn grande" id="btnComenzar">▶ Comenzar</button>${profeHTML()}</div>
      <div class="port-fuente">${m.fuente}</div></div>`;
    $('#btnComenzar').onclick = () => ir(1);
    activarLightbox();
    play(P.audio);
  };

  R.cierre = function (P, M) {
    const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
    M.innerHTML = `<div class="cierre">
      <h1>🎉 ¡Terminaste!</h1>
      <img class="cie-img" src="${P.img}" alt="" onerror="this.style.display='none'">
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      <div class="cie-fila"><button class="btn grande" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    $('#btnOtra').onclick = () => { Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {} }); ir(0); };
    activarLightbox();
    play(P.audio);
  };

  /* ---- Pasos con imagen (narración dividida) ---- */
  R.pasos = function (P, M) {
    M.innerHTML = `<div class="pasos">
      <img class="pas-img" src="${P.img}" alt="" onerror="this.style.visibility='hidden'">
      <div class="puntitos">${P.pasos.map(() => '<i></i>').join('')}</div>
      <div class="caption grande" id="cap"></div>
      <button class="btn chico" id="btnRep">🔁 Escuchar otra vez</button></div>`;
    const cap = $('#cap'), dots = $$('.puntitos i', M);
    function correr() {
      let i = 0;
      const paso = () => {
        if (i >= P.pasos.length) { completar(); return; }
        const st = P.pasos[i];
        dots.forEach((d, j) => { d.classList.toggle('on', j === i); d.classList.toggle('hecho', j < i); });
        cap.innerHTML = st.texto; cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra');
        i++; play(st.audio, paso);
      };
      paso();
    }
    $('#btnRep').onclick = () => { pararAudio(); correr(); };
    correr();
  };

  /* ---- Narración animada sobre un visual (gráfico, latas, cien, cuenta) ---- */
  R.narra = function (P, M) {
    M.innerHTML = `<div class="narra">
      <div class="vis-wrap" id="vw"></div>
      <div class="lado"><div class="puntitos">${P.pasos.map(() => '<i></i>').join('')}</div><div class="caption" id="cap"></div>
      <button class="btn chico" id="btnRep">🔁 Escuchar otra vez</button></div></div>`;
    const vw = $('#vw'), cap = $('#cap'), dots = $$('.puntitos i', M);
    function aplicar(st, j) {
      const o = Object.assign({}, P.visual, st.visual || {}, { anim: j === 0 ? true : st.anim });
      vw.innerHTML = visualHTML(o);
      apuntar(vw, st.apuntar);
      dots.forEach((d, q) => { d.classList.toggle('on', q === j); d.classList.toggle('hecho', q < j); });
      cap.innerHTML = st.texto || ''; cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra');
    }
    function correr() {
      let i = 0;
      const paso = () => {
        if (i >= P.pasos.length) { const m = $('.mano', vw); if (m) m.classList.remove('ver'); completar(); return; }
        const st = P.pasos[i]; aplicar(st, i); i++; play(st.audio, paso);
      };
      paso();
    }
    $('#btnRep').onclick = () => { pararAudio(); correr(); };
    correr();
  };

  function botonesOpciones(ops, lista) {
    const largas = lista.some(x => String(x).length > 10);
    ops.classList.toggle('una', largas);
    const mezcla = barajar(lista.map((t, i) => ({ t, i })));
    ops.innerHTML = mezcla.map(x => `<button class="btn op" data-i="${x.i}">${x.t}</button>`).join('');
  }

  /* ---- Opción múltiple con visual por código ---- */
  R.opcion = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="opcion">
      <div class="col-izq"><div class="vis-wrap" id="vw"></div></div>
      <div class="col-der"><div id="preg" class="preg"></div><div class="ops" id="ops"></div></div></div>`;
    const vw = $('#vw'), preg = $('#preg'), ops = $('#ops');
    function ronda(primero) {
      const rd = P.rondas[ri];
      const o = Object.assign({}, P.visual, rd.visual || {}, { anim: primero });
      vw.innerHTML = visualHTML(o);
      const cont = P.rondas.length > 1 ? `<span class="cont">${ri + 1} / ${P.rondas.length}</span> ` : '';
      preg.innerHTML = (rd.expr ? `<div class="expr titila">${rd.expr}</div>` : '') + `<div class="pregunta entra">${cont}${rd.pregunta}</div>`;
      ops.classList.remove('resuelto');
      botonesOpciones(ops, rd.opciones);
      ops.classList.add('espera');
      play([primero ? P.instr : null, rd.audio].filter(Boolean), () => ops.classList.remove('espera'));
      $$('.op', ops).forEach(b => b.onclick = () => {
        if (ops.classList.contains('espera')) return;
        const ok = +b.dataset.i === 0;                     // la primera opción del dato es la correcta
        evaluar(S.i + ':' + rd.id, ok);
        if (ok) {
          sonido('ok'); b.classList.add('bien'); ops.classList.add('resuelto');   // correcta iluminada, el resto atenuado
          if (rd.alAcertar) { vw.innerHTML = visualHTML(Object.assign({}, o, rd.alAcertar, { anim: false })); }
          const e = $('.expr', preg); if (e) e.classList.remove('titila');
          bloquearHasta(ops, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(false); else { ops.classList.add('espera'); completar(); } });
        } else {
          sonido('mal'); sacudir(b); b.classList.add('tachada');
          bloquearHasta(ops, rd.err || P.err);
        }
      });
    }
    ronda(true);
  };

  /* ---- Verdadero o falso (una afirmación por vez) ---- */
  R.vf = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="opcion">
      <div class="col-izq"><div class="vis-wrap" id="vw"></div></div>
      <div class="col-der"><div id="preg" class="preg"></div>
      <div class="ops vf-ops" id="ops"><button class="btn op v" data-v="1">✔ Verdadero</button><button class="btn op f" data-v="0">✘ Falso</button></div></div></div>`;
    const vw = $('#vw'), preg = $('#preg'), ops = $('#ops');
    function ronda(primero) {
      const a = P.afirmaciones[ri];
      vw.innerHTML = visualHTML(Object.assign({}, P.visual, a.visual || {}, { anim: primero }));
      preg.innerHTML = `<div class="afirma titila entra"><span class="cont">${ri + 1} / ${P.afirmaciones.length}</span> <b>${a.quien}</b> ${a.texto}</div>`;
      $$('.op', ops).forEach(b => b.classList.remove('bien', 'tachada')); ops.classList.remove('resuelto');
      ops.classList.add('espera');
      play([primero ? P.instr : null, a.audio].filter(Boolean), () => ops.classList.remove('espera'));
    }
    $$('.op', ops).forEach(b => b.onclick = () => {
      if (ops.classList.contains('espera')) return;
      const a = P.afirmaciones[ri], ok = (b.dataset.v === '1') === a.v;
      evaluar(S.i + ':' + a.id, ok);
      if (ok) {
        sonido('ok'); b.classList.add('bien'); ops.classList.add('resuelto'); $('.afirma', preg).classList.remove('titila');
        bloquearHasta(ops, a.ok, () => { ri++; if (ri < P.afirmaciones.length) ronda(false); else { ops.classList.add('espera'); completar(); } });
      } else { sonido('mal'); sacudir(b); b.classList.add('tachada'); bloquearHasta(ops, P.err); }
    });
    ronda(true);
  };

  /* ---- Marcar todas las correctas + Verificar ---- */
  R.marcar = function (P, M) {
    M.innerHTML = `<div class="opcion">
      <div class="col-izq"><div class="vis-wrap" id="vw">${visualHTML(Object.assign({}, P.visual, { anim: true }))}</div></div>
      <div class="col-der"><div class="pregunta">${P.consigna}</div>
      <div class="chips" id="ch">${barajar(P.chips).map(c => `<button class="chip" data-t="${c.t}">${c.t}</button>`).join('')}</div>
      <button class="btn verif" id="ver">✔ Verificar</button></div></div>`;
    const ch = $('#ch'), zona = $('.col-der', M);
    const porT = {}; P.chips.forEach(c => porT[c.t] = c);
    $$('.chip', ch).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera') || ch.classList.contains('listo')) return;
      b.classList.toggle('sel'); b.classList.remove('malchip');
      pararAudio(); play(porT[b.dataset.t].audio);
    });
    $('#ver').onclick = () => {
      if (zona.classList.contains('espera') || ch.classList.contains('listo')) return;
      const sel = $$('.chip.sel', ch);
      if (!sel.length) { pararAudio(); bloquearHasta(zona, P.vacio); return; }
      const ok = $$('.chip', ch).every(b => b.classList.contains('sel') === !!porT[b.dataset.t].ok);
      evaluar(S.i + ':m', ok);
      pararAudio();
      if (ok) {
        sonido('ok'); ch.classList.add('listo'); sel.forEach(b => b.classList.add('bien'));
        bloquearHasta(zona, P.ok, () => { zona.classList.add('espera'); completar(); });
      } else {
        sonido('mal');
        sel.filter(b => !porT[b.dataset.t].ok).forEach(b => { b.classList.add('malchip'); sacudir(b); });
        bloquearHasta(zona, P.err);
      }
    };
    bloquearHasta(zona, P.instr);
  };

  /* ---- Sumar fichas hasta un objetivo (votos o litros) ---- */
  R.sumar = function (P, M) {
    let ri = 0, elegidas = [];
    const encontrados = [], F = {}; P.fichas.forEach(f => F[f.id] = f);
    const fijas = P.fijas || [];
    const u = P.unidad;
    M.innerHTML = `<div class="sumar">
      <div class="meta-obj">🎯 ${P.objetivoTxt} <b>${coma(P.objetivo)} ${u}</b> <span class="cont" id="cont"></span></div>
      <div class="balde" id="bd"></div>
      <div class="suma" id="sm"></div>
      <div class="fichas" id="fx">${P.fichas.map(f => `<button class="ficha" data-id="${f.id}">${f.lata ? lataMini(f) : `<span class="emo">${f.emoji}</span>`}<span class="f-nom">${f.nombre}</span><span class="f-val">${coma(f.valor)} ${u}</span><span class="f-cnt"></span></button>`).join('')}</div>
      <button class="btn verif" id="ver">✔ Verificar</button></div>`;
    const bd = $('#bd'), sm = $('#sm'), fx = $('#fx'), zona = $('.sumar', M);
    const cuenta = id => fijas.concat(elegidas).filter(x => x === id).length;
    function pintar(res) {
      const todas = fijas.map(id => ({ id, fija: true })).concat(elegidas.map((id, j) => ({ id, j })));
      bd.innerHTML = todas.length ? todas.map(x => `<button class="enbalde${x.fija ? ' fija' : ''}" ${x.fija ? '' : `data-j="${x.j}"`} style="--c:${F[x.id].color || '#3a86ff'}">${F[x.id].emoji || ''} ${F[x.id].nombre} <b>${coma(F[x.id].valor)}</b>${x.fija ? ' 🔒' : ' ✕'}</button>`).join('') : `<span class="vacio-txt">${P.vacioTxt}</span>`;
      const ter = todas.map(x => coma(F[x.id].valor));
      sm.innerHTML = ter.length ? ter.join(' + ') + ' = ' + (res != null ? `<b class="${cent(res) === cent(P.objetivo) ? 'okt' : 'malt'}">${coma(res)} ${u}</b>` : '<b class="titila-t">?</b>') : '';
      $$('.ficha', fx).forEach(b => { const c = cuenta(b.dataset.id); b.querySelector('.f-cnt').textContent = c ? '×' + c : ''; b.classList.toggle('agotada', !!P.maxCada && c >= P.maxCada); b.classList.toggle('sel', c > 0); });
      $$('.enbalde[data-j]', bd).forEach(b => b.onclick = () => { if (zona.classList.contains('espera')) return; elegidas.splice(+b.dataset.j, 1); pintar(); });
    }
    $$('.ficha', fx).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera')) return;
      const id = b.dataset.id;
      if (P.maxCada && cuenta(id) >= P.maxCada) return;
      if (P.exactas && elegidas.length >= P.exactas) return;
      elegidas.push(id); pintar(); pararAudio(); play(F[id].audio);
    });
    function ronda(primero) {
      const rd = P.rondas[ri];
      elegidas = []; zona.classList.remove('resuelto'); pintar();
      $('#cont').textContent = P.rondas.length > 1 ? (ri + 1) + ' / ' + P.rondas.length : '';
      bloquearHasta(zona, rd.instr);
    }
    $('#ver').onclick = () => {
      if (zona.classList.contains('espera')) return;
      pararAudio();
      if (!elegidas.length || (P.exactas && elegidas.length !== P.exactas)) { bloquearHasta(zona, P.errCant); return; }
      const rd = P.rondas[ri];
      const total = fijas.concat(elegidas).reduce((a, id) => a + cent(F[id].valor), 0) / 100;
      const clave = elegidas.slice().sort().join('+');
      if (cent(total) === cent(P.objetivo) && encontrados.indexOf(clave) >= 0) { pintar(total); bloquearHasta(zona, P.errRep); return; }
      const ok = cent(total) === cent(P.objetivo);
      evaluar(S.i + ':' + rd.id, ok);
      pintar(total);
      if (ok) {
        sonido('ok'); encontrados.push(clave); sm.classList.add('bien-s'); zona.classList.add('resuelto');
        bloquearHasta(zona, (P.okPor && P.okPor[clave]) || rd.ok, () => {
          sm.classList.remove('bien-s'); ri++;
          if (ri < P.rondas.length) ronda(false); else { zona.classList.add('espera'); completar(); }
        });
      } else {
        sonido('mal'); sacudir(sm);
        bloquearHasta(zona, cent(total) > cent(P.objetivo) ? P.errMas : P.errMenos);
      }
    };
    ronda(true);
  };

  /* ---- Completar / corregir barras de un gráfico doble tocando la altura ---- */
  R.barras = function (P, M) {
    const g = D.graficos[P.graf];
    let fi = 0;
    const est = { ocultar: {}, valores: {}, etiq: {}, anim: false };
    P.faltantes.forEach(f => { if (f.desde == null) est.ocultar[f.k] = true; else est.valores[f.k] = f.desde; });
    M.innerHTML = `<div class="opcion barras">
      <div class="col-izq"><div class="vis-wrap tocable" id="vw"></div></div>
      <div class="col-der"><table class="tabla-d" id="tb"></table><div class="pregunta" id="preg"></div></div></div>`;
    const vw = $('#vw'), tb = $('#tb'), preg = $('#preg'), zona = $('.barras', M);
    function tabla() {
      const f = P.faltantes[fi] || {};
      let h = `<tr><th>Género</th>${g.series.map(s => `<th style="color:${s.color}">${s.nombre}</th>`).join('')}</tr>`;
      g.cats.forEach(c => { h += `<tr><td>${c.nombre}</td>${g.series.map(s => { const k = c.id + '-' + s.id; const mod = P.tablaMod && P.tablaMod[k]; return `<td class="${f.k === k ? 'luz-td titila' : ''}">${mod || c.val[s.id]}</td>`; }).join('')}</tr>`; });
      tb.innerHTML = h;
    }
    function dibujar(extra) { vw.innerHTML = visualHTML(Object.assign({ tipo: 'grafico', graf: P.graf }, est, { actual: (P.faltantes[fi] || {}).k }, extra || {})); }
    function paso(primero) {
      const f = P.faltantes[fi];
      tabla(); dibujar(primero ? { anim: true } : null);
      preg.innerHTML = `<span class="cont">${fi + 1} / ${P.faltantes.length}</span> ${f.texto}`;
      preg.classList.remove('entra'); void preg.offsetWidth; preg.classList.add('entra');
      bloquearHasta(zona, [primero ? P.instr : null, f.audio].filter(Boolean));
    }
    function valorEn(ev) {
      const svg = $('svg', vw); if (!svg) return null;
      const r = svg.getBoundingClientRect(); if (!r.height) return null;
      const yv = (ev.clientY - r.top) / r.height * G.H;
      const v = Math.round((G.y0 - yv) / (G.y0 - G.yTop) * g.max / g.paso) * g.paso;
      return Math.max(0, Math.min(g.max, v));
    }
    vw.addEventListener('click', ev => {
      if (zona.classList.contains('espera') || fi >= P.faltantes.length) return;
      const v = valorEn(ev); if (v == null) return;
      responder(v);
    });
    /* Línea guía con el valor al mover el mouse (solo PC; en el celular no hay puntero) */
    const NS = 'http://www.w3.org/2000/svg';
    function quitarGuia() { $$('.guia', vw).forEach(e => e.remove()); }
    vw.addEventListener('pointermove', ev => {
      if (ev.pointerType && ev.pointerType !== 'mouse') return;
      if (zona.classList.contains('espera') || fi >= P.faltantes.length) { quitarGuia(); return; }
      const v = valorEn(ev), svg = $('svg', vw); if (v == null) return;
      let ln = $('line.guia', svg), tx = $('text.guia', svg);
      if (!ln) {
        ln = document.createElementNS(NS, 'line'); ln.setAttribute('class', 'guia'); ln.setAttribute('x1', G.x0); ln.setAttribute('x2', G.W - 8); svg.appendChild(ln);
        tx = document.createElementNS(NS, 'text'); tx.setAttribute('class', 'guia'); tx.setAttribute('x', G.W - 10); svg.appendChild(tx);
      }
      const y = gY(v, g.max);
      ln.setAttribute('y1', y); ln.setAttribute('y2', y); tx.setAttribute('y', y - 5); tx.textContent = v;
    });
    vw.addEventListener('pointerleave', quitarGuia);
    function responder(v) {
      const f = P.faltantes[fi], ok = v === f.val;
      evaluar(S.i + ':' + f.k, ok);
      if (ok) {
        sonido('ok'); delete est.ocultar[f.k]; est.valores[f.k] = f.val; est.etiq[f.k] = true;
        dibujar({ anim: [f.k], actual: null, resalta: [f.k], luz: [f.k] });   // la barra acertada iluminada, el resto atenuado
        bloquearHasta(zona, f.ok, () => { fi++; if (fi < P.faltantes.length) paso(false); else { tabla(); dibujar({ actual: null, luz: P.faltantes.map(x => x.k), resalta: P.faltantes.map(x => x.k) }); zona.classList.add('espera'); completar(); } });
      } else {
        sonido('mal');
        dibujar({ malk: f.k, malv: v });
        bloquearHasta(zona, P.err, () => dibujar());
      }
    }
    MOTOR.responderBarra = responder;   // usado por el test automático
    paso(true);
  };

  /* =================== ARRANQUE =================== */
  function init() {
    document.title = D.meta.titulo + ' · QueSepanTodos';
    document.body.classList.toggle('revision', !!D.meta.revision);
    $('#btnSig').onclick = () => { if (!$('#btnSig').disabled) ir(S.i + 1); };
    $('#navPrev').onclick = () => ir(S.i - 1);
    $('#navNext').onclick = () => ir(S.i + 1);
    $('#revPrev').onclick = () => ir(S.i - 1);
    $('#revNext').onclick = () => ir(S.i + 1);
    initLightbox();
    ir(0);
  }
  const MOTOR = window.MOTOR = { ir, S, AQ, play, pararAudio, audiosUsados: () => Object.keys(D.audios) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
