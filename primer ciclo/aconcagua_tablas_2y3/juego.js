/* ===== MOTOR DE JUEGO "ESCALADA" · QueSepanTodos.com =====
   v2: panel fijo con 3 pulsadores abajo; con cada acierto Andi sube por el sendero en zigzag hasta la banderita siguiente.
   Sonidos sintetizados (0 KB), gráficos SVG/CSS, puntaje por primer intento, tarjeta para la seño. */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const S = { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: 1, primero: null, proc: null, hechos: {} };
  const RAP = window.__RAPIDO ? 12 : 1;
  const ms = t => t / RAP;
  const LSk = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  const CLAVE = 'qst_aconcagua23';
  let progreso = {}; try { progreso = JSON.parse(LSk.get(CLAVE) || '{}') || {}; } catch (e) { progreso = {}; }
  const guardarProg = () => LSk.set(CLAVE, JSON.stringify(progreso));
  const TROFEOS = [{ n: 'bronce', e: '🥉' }, { n: 'plata', e: '🥈' }, { n: 'oro', e: '🥇' }, { n: 'diamante', e: '💎' }];
  const trofeoDe = err => err === 0 ? 4 : err === 1 ? 3 : err <= 3 ? 2 : 1;

  /* ---------- SONIDO (Web Audio, sin archivos) ---------- */
  let ac = null, mudo = LSk.get('qst_mudo') === '1';
  function ctx() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); } catch (e) { ac = null; } return ac; }
  function tono(f, t0, dur, tipo, vol, f2) {
    const a = ctx(); if (!a || mudo) return;
    const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
    o.type = tipo || 'square'; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  function ruido(t0, dur, vol, desde, hasta) {
    const a = ctx(); if (!a || mudo) return;
    const n = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = a.createBufferSource(), fl = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime + t0;
    fl.type = 'bandpass'; fl.frequency.setValueAtTime(desde, t); fl.frequency.exponentialRampToValueAtTime(hasta, t + dur);
    g.gain.setValueAtTime(vol, t); s.buffer = buf; s.connect(fl); fl.connect(g); g.connect(a.destination); s.start(t);
  }
  const SFX = {
    salto: () => tono(320, 0, .22, 'sine', .14, 720),
    resorte: () => { tono(180, 0, .25, 'triangle', .14, 900); tono(784, .05, .09, 'square', .07); tono(1175, .13, .14, 'square', .07); },
    sube: () => ruido(0, .5, .3, 400, 4000),
    aterriza: () => tono(140, 0, .12, 'sine', .14, 80),
    combo: n => { [0, 4, 7, 12].slice(0, Math.min(4, n)).forEach((s, i) => tono(523 * Math.pow(2, s / 12), i * .07, .12, 'triangle', .1)); },
    triste: () => { tono(392, 0, .18, 'triangle', .1); tono(330, .18, .18, 'triangle', .1); tono(262, .36, .35, 'triangle', .1, 220); },
    exito: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tono(f, i * .12, .2, 'square', .09)),
    casi: () => { tono(392, 0, .3, 'sawtooth', .06, 370); tono(370, .32, .3, 'sawtooth', .06, 349); tono(349, .64, .6, 'sawtooth', .06, 300); },
    trofeo: i => tono(880 + i * 220, 0, .2, 'triangle', .12),
    beep: hi => tono(hi ? 988 : 494, 0, hi ? .45 : .18, 'square', .1),
    clic: () => tono(660, 0, .05, 'square', .05),
    bien: () => { tono(660, 0, .1, 'square', .08); tono(990, .08, .16, 'square', .08); },
    pasos: () => { for (let i = 0; i < 6; i++) ruido(i * .15 / RAP, .06, .25, 900, 300); },
    piedra: () => { ruido(0, .35, .3, 2500, 300); tono(300, .05, .25, 'triangle', .08, 120); [0.3, .45, .58].forEach(t => tono(220, t, .05, 'square', .05)); }
  };

  /* ---------- VOZ (mp3 opcionales: si faltan, el juego sigue sin voz) ---------- */
  // juego ágil: voces cortas, nunca bloquean (tocar la pantalla corta la voz y sigue)
  let voz = null, vozFin = null;
  function hablar(k, cb) {
    try { if (voz) { voz.onended = null; voz.onerror = null; voz.pause(); } } catch (e) { }
    vozFin = null;
    if (mudo || !k || window.__RAPIDO) { if (cb) setTimeout(cb, 0); return; }
    voz = new Audio('audio/' + k + '.mp3'); let listo = false; const fin = () => { if (!listo) { listo = true; vozFin = null; if (cb) cb(); } };
    vozFin = fin; voz.onended = fin; voz.onerror = fin; const p = voz.play(); if (p && p.catch) p.catch(fin);
    setTimeout(fin, 12000);
  }
  function callarVoz() { vozFin = null; try { if (voz) { voz.onended = null; voz.onerror = null; voz.pause(); } } catch (e) { } }
  function cortarVoz() { try { if (voz) voz.pause(); } catch (e) { } const f = vozFin; if (f) f(); }

  /* ---------- GRÁFICOS ---------- */
  const ANDI = `<svg viewBox="0 0 80 84" class="andi-svg"><ellipse cx="40" cy="80" rx="20" ry="4" fill="#0003"/>
    <circle class="cuerpo" cx="40" cy="48" r="27" stroke-width="3"/>
    <path d="M15 40 Q16 14 40 13 Q64 14 65 40 Z" fill="#e63946"/><rect x="13" y="36" width="54" height="8" rx="4" fill="#fff"/><circle cx="40" cy="11" r="6" fill="#fff"/>
    <path d="M21 31 L29 31 M51 31 L59 31" stroke="#9d0208" stroke-width="3"/>
    <circle cx="31" cy="52" r="4.5" fill="#1d1b2f"/><circle cx="49" cy="52" r="4.5" fill="#1d1b2f"/><circle cx="32.5" cy="50.5" r="1.5" fill="#fff"/><circle cx="50.5" cy="50.5" r="1.5" fill="#fff"/>
    <path class="boca-ok" d="M31 62 Q40 70 49 62" fill="none" stroke="#1d1b2f" stroke-width="3" stroke-linecap="round"/>
    <path class="boca-mal" d="M31 66 Q40 59 49 66" fill="none" stroke="#1d1b2f" stroke-width="3" stroke-linecap="round"/>
    <circle cx="24" cy="60" r="4" fill="#ff8fab" opacity=".6"/><circle cx="56" cy="60" r="4" fill="#ff8fab" opacity=".6"/></svg>`;
  const MONTE_D = `
    <path d="M0 900 L0 520 L60 470 L110 500 L170 380 L230 430 L300 300 L360 360 L400 330 L400 900Z" fill="#9fb4c7"/>
    <path d="M0 900 L0 640 L80 560 L150 610 L215 150 L250 205 L275 175 L335 420 L400 470 L400 900Z" fill="#7d8ea3"/>
    <path d="M215 150 L250 205 L275 175 L296 255 L280 245 L262 262 L248 235 L232 255 L222 232 L200 240Z" fill="#fff"/>
    <path d="M0 900 L0 760 L90 700 L170 760 L260 690 L340 740 L400 720 L400 900Z" fill="#5f6f84"/>`;
  const MONTANA = `<svg class="monte m-alto" viewBox="0 0 400 900" preserveAspectRatio="xMidYMax slice">${MONTE_D}</svg><svg class="monte m-ancho" viewBox="0 110 400 420" preserveAspectRatio="xMidYMin slice">${MONTE_D}</svg>`;
  const CONDOR = `<svg viewBox="0 0 120 50"><path class="ala" d="M60 26 Q36 6 2 14 Q30 20 44 30 Z M60 26 Q84 6 118 14 Q90 20 76 30 Z" fill="#1d1b2f"/><ellipse cx="60" cy="28" rx="14" ry="6" fill="#1d1b2f"/><path d="M50 26 Q60 20 70 26" stroke="#fff" stroke-width="4" fill="none"/><circle cx="74" cy="25" r="4" fill="#e5989b"/></svg>`;
  function grupos(a, b) {
    const col = ['#e63946', '#fb8500', '#2a9d8f', '#3a86ff', '#8338ec', '#ef476f', '#06d6a0', '#ffb703', '#118ab2', '#9b5de5'];
    return `<div class="grupos">${Array.from({ length: a }, (_, i) => `<span class="grupo" style="border-color:${col[i % 10]}">${('<i style="background:' + col[i % 10] + '"></i>').repeat(b)}</span>`).join('')}</div>`;
  }
  const miles = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  /* ---------- PREGUNTAS (siempre 3 opciones distintas) ---------- */
  const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function preguntas(T) {
    let base = []; T.tabla.forEach(t => { for (let k = 1; k <= 10; k++) base.push([t, k]); });
    return mezclar(base).slice(0, 10).map(([t, k]) => {
      const p = t * k;
      if (T.tipo === 'falta') {
        const op = new Set([k]); mezclar([k - 1, k + 1, k + 2, k - 2, t, k + 3]).forEach(x => { if (op.size < 3 && x >= 1 && x <= 12 && x !== k) op.add(x); });
        return { t, k, res: k, obj: `${t} × <b class="hueco">?</b> = ${p}`, audio: `f${t}_${k}`, ops: mezclar([...op]) };
      }
      const op = new Set([p]); mezclar([t * (k + 1), t * (k - 1), p + 1, p - 1, (t === 2 ? 3 : 2) * k, p + 2]).forEach(x => { if (op.size < 3 && x > 0 && x !== p) op.add(x); });
      return { t, k, res: p, obj: `${t} × ${k}`, audio: `p${t}_${k}`, ops: mezclar([...op]) };
    });
  }

  /* ---------- BARRA ---------- */
  const M = () => $('#pantalla');
  let timers = [];
  const T_ = (f, t) => timers.push(setTimeout(f, ms(t)));
  const limpiar = () => { timers.forEach(clearTimeout); timers = []; callarVoz(); };
  function barra(titulo, conMapa) {
    return `<header class="barra"><button class="b-ico" id="bMapa" ${conMapa ? '' : 'hidden'} aria-label="Volver al mapa">🗺️</button>
      <div class="b-tit">${titulo}</div><div class="b-pts">⭐ <b id="pts">${S.puntos}</b></div>
      <button class="b-ico" id="bMudo" aria-label="Sonido">${mudo ? '🔇' : '🔊'}</button></header>`;
  }
  function conBarra() {
    const bm = $('#bMudo'); if (bm) bm.onclick = () => { mudo = !mudo; LSk.set('qst_mudo', mudo ? '1' : '0'); bm.textContent = mudo ? '🔇' : '🔊'; if (mudo) cortarVoz(); };
    const bp = $('#bMapa'); if (bp) bp.onclick = () => { SFX.clic(); mapa(); };
  }

  /* ---------- PORTADA ---------- */
  function portada() {
    limpiar(); const m = D.meta;
    M().className = 'p-portada';
    M().innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div><h1 class="port-tit">${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <div class="port-escena"><div class="cielo-p"></div>${MONTANA}<div class="andi-port">${ANDI}</div><div class="bandera">🚩</div></div>
      <button class="btn-jugar" id="bJugar">▶ ¡A escalar!</button>
      ${profeHTML()}<div class="port-fuente">© 2026 Gustavo Aguilar · QueSepanTodos.com</div></div>`;
    $('#bJugar').onclick = () => { ctx(); SFX.clic(); mapa(); };
    activarLightbox();
  }

  /* ---------- MAPA DE LA MONTAÑA ---------- */
  function mapa() {
    limpiar();
    M().className = 'p-mapa';
    const libre = i => D.meta.revision || i === 0 || (progreso[D.tramos[i - 1].id] || 0) > 0;
    M().innerHTML = barra('🏔️ Elegí el tramo', false) + `<div class="mapa"><div class="cielo-p"></div>${MONTANA}
      <svg class="sendero" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M18 94 C 40 82, 70 84, 72 70 S 30 58, 34 46 S 66 34, 58 22 S 52 10, 54 6" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="3 2.5" opacity=".9"/></svg>
      ${D.tramos.map((T, i) => { const tr = progreso[T.id] || 0, ok = libre(i);
        return `<button class="campo c${i + 1}${ok ? '' : ' cerrado'}" data-i="${i}">
          <span class="c-ico">${ok ? (i === 3 ? '🚩' : '⛺') : '🔒'}</span>
          <span class="c-nom">${i + 1}. ${T.nombre}<small>${miles(T.hasta)} m</small></span>
          <span class="c-tro">${tr ? TROFEOS[tr - 1].e : ''}</span></button>`; }).join('')}
      <button class="btn-fin" id="bFin" ${D.tramos.every(T => S.hechos[T.id]) ? '' : 'hidden'}>🏁 Ver mis resultados</button></div>`;
    conBarra();
    $$('.campo').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (!libre(i)) { SFX.triste(); b.classList.remove('sacude'); void b.offsetWidth; b.classList.add('sacude'); return; } SFX.clic(); escalar(i); });
    $('#bFin').onclick = () => { SFX.clic(); cierre(); };
  }

  /* ---------- LA ESCALADA (v2: panel fijo abajo + sendero en zigzag por la ladera) ---------- */
  const PASO = 120, MB = 80, MT = 150, NB = 10;            // unidades del mundo (ancho 400)
  const HW = MB + NB * PASO + MT;                           // alto del mundo
  const XS = [200, 315, 85, 305, 100, 320, 90, 300, 110, 290, 200];
  const PTS = XS.map((x, i) => ({ x, y: HW - MB - i * PASO }));
  const PAISAJE = {   // ladera, detalles y clima de cada tramo
    1: { suelo: ['#b08d63', '#8f6e4b'], borde: '#6f5338', deco: 'verde', fin: 'carpa' },
    2: { suelo: ['#a08a74', '#7d6a58'], borde: '#5d4e40', deco: 'manchas', fin: 'carpa' },
    3: { suelo: ['#dfe7ef', '#b9c6d4'], borde: '#8fa0b3', deco: 'nieve', fin: 'refugio' },
    4: { suelo: ['#f3f7fb', '#cfdbe8'], borde: '#9fb1c6', deco: 'hielo', fin: 'cumbre' }
  };
  function rnd(seed) { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
  function mundoSVG(T) {
    const P = PAISAJE[T.id] || PAISAJE[1], r = rnd(T.id * 77), cumbre = P.fin === 'cumbre';
    // borde de la ladera (izq. y der.), se angosta hacia arriba
    const izq = [], der = [];
    for (let y = HW; y >= -10; y -= 60) { const k = 1 - y / HW; izq.push([Math.max(0, 6 + k * (cumbre ? 120 : 30) + r() * 18), y]); der.push([Math.min(400, 394 - k * (cumbre ? 120 : 30) - r() * 18), y]); }
    const topY = cumbre ? PTS[NB].y - 40 : -10;
    const lad = `M${izq.filter(p => p[1] >= topY).map(p => p.join(' ')).join(' L')} L200 ${topY} L${der.filter(p => p[1] >= topY).reverse().map(p => p.join(' ')).join(' L')} Z`;
    let deco = '';
    for (let i = 0; i < 46; i++) {
      const x = 30 + r() * 340, y = 40 + r() * (HW - 60), lejos = PTS.some(p => Math.hypot(p.x - x, p.y - y) < 42);
      if (lejos) continue;
      const t = r();
      if (P.deco === 'verde' && t < .5) deco += `<g transform="translate(${x} ${y})"><circle r="9" fill="#5a8f3c"/><circle cx="8" cy="3" r="7" fill="#6aa84f"/><circle cx="-7" cy="4" r="6" fill="#4e7d33"/></g>`;
      else if ((P.deco === 'manchas' && t < .35) || P.deco === 'nieve' && t < .6) deco += `<ellipse cx="${x}" cy="${y}" rx="${14 + r() * 18}" ry="${5 + r() * 5}" fill="#fff" opacity=".9"/>`;
      else if (P.deco === 'hielo' && t < .5) deco += `<path d="M${x} ${y} l6 -14 l6 14 z" fill="#d6ecff" stroke="#a9cbe8"/>`;
      else deco += `<path d="M${x - 10} ${y + 5} Q${x - 9} ${y - 7} ${x} ${y - 8} Q${x + 11} ${y - 6} ${x + 11} ${y + 5} Z" fill="#7b8794" stroke="#5c6670" stroke-width="1.5"/>`;
    }
    // sendero
    const camino = PTS.map((p, i) => (i ? 'L' : 'M') + p.x + ' ' + p.y).join(' ');
    const alt = i => T.desde + (T.hasta - T.desde) * i / NB;
    const flags = PTS.slice(1, NB).map((p, j) => { const i = j + 1, lado = p.x < 200 ? -1 : 1;
      return `<g class="bandi" id="bf${i}" transform="translate(${p.x + lado * 26} ${p.y})"><rect x="-1.5" y="-38" width="3" height="40" fill="#5c4033"/><path class="tela" d="M1.5 -38 L24 -31 L1.5 -24 Z"/>
        <text x="${lado < 0 ? 4 : 8}" y="-44" text-anchor="middle" class="b-alt">${miles(alt(i))} m</text></g>`; }).join('');
    const top = PTS[NB], base = PTS[0];
    const fin = P.fin === 'carpa'
      ? `<g class="campa" transform="translate(${top.x + 58} ${top.y + 4})"><path d="M-34 0 L0 -44 L34 0 Z" fill="#fb8500" stroke="#b35f00" stroke-width="3"/><path d="M0 -44 L0 0 M-8 0 L0 -18 L8 0" stroke="#7a3f00" stroke-width="3" fill="#7a3f00"/></g>`
      : P.fin === 'refugio'
        ? `<g class="campa" transform="translate(${top.x + 62} ${top.y + 4})"><rect x="-30" y="-30" width="60" height="30" fill="#c1121f"/><path d="M-36 -28 L0 -52 L36 -28 Z" fill="#6c757d"/><rect x="-7" y="-18" width="14" height="18" fill="#fff"/></g>`
        : `<g class="campa cruz" transform="translate(${top.x} ${top.y - 6})"><rect x="-2" y="-58" width="4" height="58" fill="#5c4033"/><g class="arg"><rect x="2" y="-58" width="40" height="9" fill="#74acdf"/><rect x="2" y="-49" width="40" height="9" fill="#fff"/><rect x="2" y="-40" width="40" height="9" fill="#74acdf"/><circle cx="22" cy="-44.5" r="3" fill="#f6b40e"/></g></g>`;
    return `<svg class="mundo-svg" viewBox="0 0 400 ${HW}" preserveAspectRatio="none">
      <defs><linearGradient id="gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.suelo[0]}"/><stop offset="1" stop-color="${P.suelo[1]}"/></linearGradient></defs>
      <path d="${lad}" fill="url(#gs)" stroke="${P.borde}" stroke-width="4"/>${deco}
      <path d="${camino}" fill="none" stroke="#0002" stroke-width="22" stroke-linejoin="round" stroke-linecap="round" transform="translate(0 4)"/>
      <path d="${camino}" fill="none" stroke="#f3e2c0" stroke-width="18" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="${camino}" fill="none" stroke="#d4b98c" stroke-width="2" stroke-dasharray="6 9"/>
      <g id="huellas"></g>
      <g transform="translate(${base.x - 62} ${base.y + 6})"><rect x="-26" y="-14" width="52" height="16" rx="6" fill="#6c757d"/><text y="-1" text-anchor="middle" class="b-base">${miles(T.desde)} m</text></g>
      ${flags}${fin}
      <text x="${top.x}" y="${top.y - (P.fin === 'cumbre' ? 80 : 62)}" text-anchor="middle" class="b-meta">${T.nombre} · ${miles(T.hasta)} m</text></svg>`;
  }

  function escalar(ti) {
    limpiar();
    const T = D.tramos[ti], Q = preguntas(T), P = PAISAJE[T.id] || PAISAJE[1];
    let qi = 0, vidas = 3, errT = 0, okT = 0, combo = 0, bloqueo = true, raf = 0;
    M().className = 'p-escalar';
    M().innerHTML = barra(`⛺ ${ti + 1}. ${T.nombre}`, true) + `<div class="escena t${T.id}">
      <div class="ladera" id="ladera" style="--c1:${T.cielo[0]};--c2:${T.cielo[1]}">
        <div class="cielo-p"></div><div class="fondo-m">${MONTANA}</div>
        <div class="nube n1">☁️</div><div class="nube n2">☁️</div>${T.id === 2 ? `<div class="condor">${CONDOR}</div>` : ''}${T.id === 4 ? '<div class="viento"><i></i><i></i><i></i><i></i></div>' : ''}
        <div class="mundo" id="mundo">${mundoSVG(T)}<div class="andi" id="andi"><div class="andi-in" id="andiIn">${ANDI}</div></div></div>
        <div class="hud"><span class="vidas" id="vidas"></span><span class="combo" id="combo"></span><span class="alt" id="alt"></span></div>
        <div class="pv" id="pv"></div>
        <div class="cuenta" id="cuenta"></div>
      </div>
      <div class="panel" id="panel">
        <div class="objetivo" id="obj"></div>
        <div class="pulsos" id="pulsos"></div>
      </div>
      <div class="modal" id="modal"></div></div>`;
    conBarra();
    const lad = $('#ladera'), mundo = $('#mundo'), andi = $('#andi'), andiIn = $('#andiIn'), obj = $('#obj');
    let pos = { x: PTS[0].x, y: PTS[0].y };
    const altura = () => T.desde + (T.hasta - T.desde) * okT / NB;
    const esc = () => { const W = lad.clientWidth || 360, H = lad.clientHeight || 400; return Math.min(W / 400, H / (3.1 * PASO)); };
    function encuadre(y, sinAnim) {   // la vista sube con Andi (queda a media altura)
      const s = esc(), W = lad.clientWidth || 360, H = lad.clientHeight || 400, alto = HW * s;
      mundo.style.width = 400 * s + 'px'; mundo.style.height = alto + 'px'; mundo.style.left = (W - 400 * s) / 2 + 'px';
      let ty = H * 0.6 - y * s; ty = Math.min(0, Math.max(H - alto, ty));
      if (sinAnim) { mundo.style.transition = 'none'; void mundo.offsetWidth; }
      mundo.style.transform = `translateY(${ty}px)`;
      if (sinAnim) { void mundo.offsetWidth; mundo.style.transition = ''; }
    }
    function ubicar(x, y, bob) { andi.style.left = (x / 400 * 100) + '%'; andi.style.top = (y / HW * 100) + '%'; andiIn.style.transform = bob ? `translateY(${-bob}%)` : ''; }
    function caminar(i, cb) {   // de la banderita actual a la siguiente, con pasitos
      const a = { x: pos.x, y: pos.y }, b = PTS[i], dur = ms(1000), t0 = performance.now();
      andi.classList.toggle('izq', b.x < a.x); andi.classList.add('camina');
      encuadre(b.y); SFX.pasos();
      cancelAnimationFrame(raf);
      const f = now => {
        const k = Math.min(1, (now - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        ubicar(a.x + (b.x - a.x) * e, a.y + (b.y - a.y) * e, Math.abs(Math.sin(k * Math.PI * 6)) * 14);
        if (k < 1) raf = requestAnimationFrame(f); else { pos = { x: b.x, y: b.y }; andi.classList.remove('camina'); huellas(a, b); cb && cb(); }
      };
      raf = requestAnimationFrame(f);
    }
    function huellas(a, b) {
      const g = $('#huellas'); if (!g) return; let h = '';
      for (let k = 1; k < 7; k++) { const x = a.x + (b.x - a.x) * k / 7, y = a.y + (b.y - a.y) * k / 7, d = k % 2 ? 4 : -4;
        h += `<ellipse cx="${x + d}" cy="${y + d / 2}" rx="3.2" ry="5" fill="#7a5c3e" opacity=".55" transform="rotate(${Math.atan2(b.y - a.y, b.x - a.x) * 57.3 + 90} ${x + d} ${y + d / 2})"/>`; }
      g.insertAdjacentHTML('beforeend', h);
    }
    function resbalar() {   // se desprende una piedrita, Andi resbala y se agarra
      const p = document.createElement('div'); p.className = 'piedrita'; p.style.left = andi.style.left; p.style.top = andi.style.top; mundo.appendChild(p);
      T_(() => p.remove(), 1400);
      const t0 = performance.now(), dur = ms(900); cancelAnimationFrame(raf);
      const f = now => { const k = Math.min(1, (now - t0) / dur), caida = k < .3 ? k / .3 : 1 - (k - .3) / .7;
        ubicar(pos.x + Math.sin(k * 40) * 3 * (1 - k), pos.y + 22 * caida, 0); if (k < 1) raf = requestAnimationFrame(f); else ubicar(pos.x, pos.y, 0); };
      raf = requestAnimationFrame(f);
    }
    function hud() {
      $('#vidas').textContent = '❤️'.repeat(Math.max(0, vidas)) + '🤍'.repeat(3 - Math.max(0, vidas));
      $('#alt').textContent = `⛰️ ${miles(altura())} m`;
    }
    function mostrar() {
      const q = Q[qi]; q.fallas = 0;
      obj.innerHTML = `<span class="o-num">${q.obj}</span><span class="o-cont">${qi + 1}/${Q.length}</span>`;
      obj.classList.remove('entra'); void obj.offsetWidth; obj.classList.add('entra');
      $('#pv').innerHTML = '';
      $('#pulsos').innerHTML = q.ops.map(o => `<button class="pul" data-v="${o}">${o}</button>`).join('');
      $$('.pul').forEach(b => b.onclick = () => elegir(b, q));
    }
    function elegir(b, q) {
      if (bloqueo || b.classList.contains('x')) return;
      bloqueo = true;
      const ok = +b.dataset.v === q.res, clave = T.id + ':' + q.t + 'x' + q.k;
      if (S.eval[clave] === undefined) { S.eval[clave] = ok; if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto; } else { S.errores++; errT++; } $('#pts').textContent = S.puntos; }
      b.classList.add('apreta');
      if (ok) {
        okT++; combo = q.fallas ? 0 : combo + 1;
        b.classList.add('bien'); SFX.bien(); if (combo >= 3) T_(() => SFX.combo(combo - 1), 150);
        obj.innerHTML = `<span class="o-num">${q.obj.replace('<b class="hueco">?</b>', `<b class="hueco lleno">${q.res}</b>`)}${T.tipo === 'falta' ? '' : ` = <b class="hueco lleno">${q.res}</b>`}</span><span class="o-cont">${qi + 1}/${Q.length}</span>`;
        $('#combo').textContent = combo >= 3 ? `🔥 ${combo} seguidas` : '';
        $('#pv').innerHTML = '';
        caminar(okT, () => {
          const f = $('#bf' + okT); if (f) { f.classList.add('ok'); SFX.aterriza(); }
          hud(); qi++;
          if (qi >= Q.length) { llegada(); return; }
          T_(() => { mostrar(); bloqueo = false; }, 150);
        });
      } else {
        q.fallas++; combo = 0; vidas--; $('#combo').textContent = '';
        b.classList.add('x'); SFX.piedra(); andiIn.classList.add('triste'); resbalar(); hud();
        $('#pv').innerHTML = T.tipo === 'falta'
          ? `<div class="pv-txt">💡 ${q.t} grupos de… ¿cuántos para llegar a ${q.t * q.k}?</div>` + (q.fallas >= 2 ? grupos(q.t, q.k) : '')
          : `<div class="pv-txt">💡 ${q.t} × ${q.k} son ${q.t} grupos de ${q.k}</div>` + grupos(q.t, q.k);
        T_(() => SFX.triste(), 250);
        T_(() => { andiIn.classList.remove('triste'); bloqueo = false; }, 1100);
      }
    }
    function llegada() {   // campamento / refugio / cumbre
      $('#pulsos').innerHTML = ''; obj.innerHTML = `<span class="intro-txt">${P.fin === 'cumbre' ? '🇦🇷 ¡Llegaste a la cumbre!' : (P.fin === 'refugio' ? '🛖 ' : '⛺ ') + '¡Llegaste a ' + T.nombre + '!'}</span>`;
      const c = $('.campa'); if (c) c.classList.add('arma');
      andi.classList.add('festeja'); SFX.combo(4);
      T_(cumbre, 1300);
    }
    function cumbre() {
      const tr = trofeoDe(errT), ultimo = ti === D.tramos.length - 1, buen = errT <= 3;
      progreso[T.id] = Math.max(progreso[T.id] || 0, tr); guardarProg(); S.hechos[T.id] = tr;
      const md = $('#modal'); const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
      md.innerHTML = `<div class="m-caja"><canvas id="confeti"></canvas>
        <div class="curio"><span class="curio-pl">${T.ico}</span><span class="curio-tx"><b>🔎 ¿Sabías que…?</b>${T.curiosidad}</span></div>
        <div class="m-pts">${10 - Math.min(10, errT)} / 10</div>
        <div class="m-tit">${ultimo ? '¡Llegaste a la cumbre del Aconcagua!' : tr === 4 ? '¡Increíble!' : tr === 3 ? '¡Excelente!' : tr === 2 ? '¡Muy bien!' : '¡Lo lograste! Probá otra vez sin errores'}</div>
        <div class="m-alt">⛰️ ${miles(T.hasta)} m · ${errT === 0 ? 'sin errores' : errT === 1 ? '1 error' : errT + ' errores'}</div>
        <div class="m-tro"><span class="tro on gana">${TROFEOS[tr - 1].e}</span><span class="tro-nom">¡Trofeo de ${TROFEOS[tr - 1].n}!</span></div>
        <div class="m-cuenta"><small>Mis trofeos</small>${D.tramos.map(X => S.hechos[X.id] ? `<span class="${X.id === T.id ? 'nuevo' : ''}">${TROFEOS[S.hechos[X.id] - 1].e}</span>` : '<span class="vacio"></span>').join('')}</div>
        <div class="m-total">Total: ✅ ${S.aciertos} · ❌ ${S.errores} · 📊 ${pc}% · ⭐ ${S.puntos}</div>
        <div class="m-bots">${ultimo ? '<button class="btn-jugar" id="bCierre">🏁 Ver mis resultados</button>' : '<button class="btn-jugar" id="bSig">▶ Siguiente tramo</button>'}</div></div>`;
      md.classList.add('ver'); confeti($('#confeti'));
      if (buen) SFX.exito(); else SFX.casi();
      T_(() => SFX.trofeo(tr - 1), 300); T_(() => SFX.trofeo(tr), 750);
      hablar('l' + T.id, () => hablar('tr' + tr, () => hablar('c' + T.id)));
      const bs = $('#bSig'); if (bs) bs.onclick = () => { SFX.clic(); escalar(ti + 1); };
      const bc = $('#bCierre'); if (bc) bc.onclick = () => { SFX.clic(); cierre(); };
    }
    // ajuste al girar el celular
    window.onresize = () => { if (document.body.contains(mundo)) encuadre(pos.y, true); };
    // largada: consigna + 3, 2, 1, ¡YA!
    hud(); ubicar(pos.x, pos.y, 0); encuadre(pos.y, true);
    obj.innerHTML = `<span class="intro-txt">${T.intro}</span><span class="saltar">👆 Tocá para empezar</span>`;
    let enIntro = true; $('.escena').addEventListener('pointerdown', () => { if (enIntro) cortarVoz(); });
    hablar('t' + T.id, () => {
      if (!enIntro) return; enIntro = false; const sl = $('.saltar'); if (sl) sl.remove();
      let c = 3; const el = $('#cuenta');
      const paso = () => {
        if (c > 0) { el.textContent = c; el.className = 'cuenta ver'; SFX.beep(false); c--; T_(paso, 700); }
        else { el.textContent = '¡YA!'; el.className = 'cuenta ver ya'; SFX.beep(true); T_(() => { el.className = 'cuenta'; }, 600); bloqueo = false; mostrar(); }
      };
      T_(paso, 400);
    });
  }

  function confeti(cv) {
    if (!cv || !cv.getContext) return; const x = cv.getContext('2d'); if (!x) return;
    const W = cv.width = cv.offsetWidth || 320, H = cv.height = cv.offsetHeight || 300, col = ['#e63946', '#ffb703', '#2a9d8f', '#3a86ff', '#8338ec', '#fb8500'];
    const P = Array.from({ length: 70 }, () => ({ x: W / 2, y: H * .3, vx: (Math.random() - .5) * 9, vy: -Math.random() * 8 - 2, r: Math.random() * 6, c: col[Math.floor(Math.random() * 6)], g: .2 + Math.random() * .1 }));
    let t = 0; (function f() { x.clearRect(0, 0, W, H); P.forEach(p => { p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-4, -2, 8, 4); x.restore(); }); if (++t < 110) requestAnimationFrame(f); else x.clearRect(0, 0, W, H); })();
  }

  /* ---------- CIERRE ---------- */
  function cierre() {
    limpiar();
    const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
    M().className = 'p-cierre';
    M().innerHTML = `<div class="cierre"><h1>🏔️ ¡Terminaste la expedición!</h1>
      <div class="coleccion"><div class="col-tit">🏔️ Mi expedición · tocá una parada</div>
        <div class="col-fila">${D.tramos.map((T, i) => { const tr = progreso[T.id] || 0; return `<button class="col-pl${tr ? '' : ' falta'}" data-i="${i}"><span class="col-img">${tr ? T.ico : '❔'}</span><span class="col-tro">${tr ? TROFEOS[tr - 1].e : ''}</span><small>${T.nombre}</small></button>`; }).join('')}</div>
        <div class="col-txt" id="colTxt"></div></div>
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      ${window.QST_SCORM ? '<div class="aula-ok">✅ Tu puntaje ya quedó guardado en el aula</div>' : AULA ? '<button class="btn-aula" id="btnAula">🏫 Entregar en mi aula</button>' : ''}
      <button class="btn-env" id="btnEnviar">📤 Enviar mis resultados a la seño</button>
      <div class="cie-fila"><button class="btn-jugar" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };
    $('#btnOtra').onclick = () => { SFX.clic(); Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: S.intento + 1, hechos: {} }); mapa(); };
    $('#btnEnviar').onclick = () => abrirEnvio({ aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, proc: null });
    const R0 = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, intento: S.intento, texto: textoAula(pc) };
    try { if (window.QST_FIN) window.QST_FIN(R0); } catch (e) { }
    const ba = $('#btnAula'); if (ba) ba.onclick = () => { SFX.clic(); abrirAula(R0.texto); };
    const verCurio = i => { const T = D.tramos[i], tr = progreso[T.id] || 0; $$('.col-pl').forEach(b => b.classList.toggle('sel', +b.dataset.i === i));
      $('#colTxt').innerHTML = tr ? `<b>${T.ico} ${T.nombre}:</b> ${T.curiosidad}` : `🔒 Completá el tramo hasta ${T.nombre} para descubrir su curiosidad.`; };
    $$('.col-pl').forEach(b => b.onclick = () => { SFX.clic(); verCurio(+b.dataset.i); });
    verCurio(Math.max(0, D.tramos.findIndex(T => progreso[T.id])));
    activarLightbox(); SFX.exito(); hablar('cierre');
  }

  /* ---------- ENTREGA EN EL AULA VIRTUAL (Moodle · Aulas EduTec) ----------
     El docente agrega al enlace del juego: ?aula=<dirección de la tarea de Moodle>.
     El botón copia el texto con los resultados y abre esa tarea para pegarlo en «Agregar entrega». */
  const AULA = (() => { try { const u = new URLSearchParams(location.search).get('aula'); return u && /^https:\/\//i.test(u) ? u : ''; } catch (e) { return ''; } })();
  function textoAula(pc) {
    const tro = D.tramos.map(T => { const tr = S.hechos[T.id] || progreso[T.id] || 0; return `${T.nombre}: ${tr ? 'trofeo de ' + TROFEOS[tr - 1].n : 'sin completar'}`; }).join(' · ');
    return `${D.meta.titulo} · ${D.meta.subtitulo}\nAciertos: ${S.aciertos} · Errores: ${S.errores} · Total: ${pc}% · Puntos: ${S.puntos}\nTrofeos: ${tro}${S.intento > 1 ? '\nIntento ' + S.intento : ''}\n${fechaHora()} · QueSepanTodos.com`;
  }
  function copiar(txt, ta) {
    const viejo = () => { try { ta.removeAttribute('readonly'); ta.select(); ta.setSelectionRange(0, 99999); const ok = document.execCommand('copy'); ta.setAttribute('readonly', ''); return ok; } catch (e) { return false; } };
    try { if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt).then(() => true, viejo); } catch (e) { }
    return Promise.resolve(viejo());
  }
  function abrirAula(txt) {
    let m = $('#aulaM'); if (m) m.remove();
    m = document.createElement('div'); m.id = 'aulaM';
    m.innerHTML = `<div class="aula-caja"><button class="envio-x" id="aulaX" aria-label="Cerrar">✕</button><h2>🏫 Entregar en mi aula</h2>
      <ol class="aula-pasos"><li>Tocá <b>Copiar y abrir mi aula</b>.</li><li>En la tarea tocá <b>Agregar entrega</b>.</li><li>Mantené apretado el cuadro de texto, elegí <b>Pegar</b> y tocá <b>Guardar cambios</b>.</li></ol>
      <textarea id="aulaTxt" readonly rows="5">${txt}</textarea>
      <button class="btn-aula" id="aulaIr">📋 Copiar y abrir mi aula</button><div class="envio-msj" id="aulaMsj"></div></div>`;
    document.body.appendChild(m);
    $('#aulaX').onclick = () => m.remove();
    $('#aulaIr').onclick = () => {
      const ta = $('#aulaTxt');
      copiar(txt, ta).then(ok => {
        $('#aulaMsj').textContent = ok ? '✔ Texto copiado. Ahora pegalo en tu entrega.' : 'Mantené apretado el texto, elegí Copiar y después abrí tu aula.';
        const w = window.open(AULA, '_blank'); if (!w) location.href = AULA;
      });
    };
  }

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
    $('#lbCerrar').addEventListener('click', () => { lb.classList.remove('ver'); im.classList.remove('zoom'); im.style.transformOrigin = '50% 50%'; $('#lbFrase').textContent = D.meta.frase; });
    // tocar una figura la amplía (misma ventana, sin la frase)
    document.addEventListener('click', ev => {
      const f = ev.target.closest && ev.target.closest('.figura'); if (!f) return;
      im.src = f.src; im.classList.remove('zoom'); $('#lbFrase').textContent = '🔍 Tocá la imagen para acercar'; lb.classList.add('ver');
    });
  }


  /* ---- Enviar resultados a la docente: tarjeta PNG + compartir (WhatsApp, etc.) ---- */
  const LS = { get(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  function abrirEnvio(R0) {
    let m = $('#envio');
    if (!m) { m = document.createElement('div'); m.id = 'envio'; document.body.appendChild(m); }
    m.innerHTML = `<div class="envio-caja"><button class="envio-x" aria-label="Cerrar">✕</button>
      <h2>📤 Enviar a la seño</h2>
      <label>Nombre y apellido<input id="enNom" maxlength="40" autocomplete="name" value="${LS.get('qst_nombre').replace(/"/g, '&quot;')}"></label>
      <label>Grado y división<input id="enGr" maxlength="20" placeholder="Ej.: 3.º B" value="${LS.get('qst_grado').replace(/"/g, '&quot;')}"></label>
      <div class="envio-msj" id="enMsj"></div>
      <button class="btn enviar" id="enOk">Armar mi tarjeta y compartir</button></div>`;
    m.classList.add('ver');
    $('.envio-x', m).onclick = () => m.classList.remove('ver');
    $('#enOk').onclick = () => {
      const nom = $('#enNom').value.trim(), gr = $('#enGr').value.trim();
      if (!nom) { $('#enMsj').textContent = 'Escribí tu nombre y apellido.'; $('#enNom').focus(); return; }
      LS.set('qst_nombre', nom); LS.set('qst_grado', gr);
      const canvas = tarjeta(R0, nom, gr), texto = textoResultados(R0, nom, gr);
      const nombreArch = 'resultados_' + nom.replace(/\s+/g, '_').replace(/[^\wáéíóúñÁÉÍÓÚÑ_]/g, '') + '.png';
      let url = '', file = null;
      try { url = canvas.toDataURL('image/png'); } catch (e) { }
      try {   // armado sincrónico: así el menú de compartir no pierde el toque del chico
        const bin = atob(url.split(',')[1]), u8 = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
        file = new File([u8], nombreArch, { type: 'image/png' });
      } catch (e) { file = null; }
      const mostrar = () => verTarjeta(m, url, texto, nombreArch);
      try {
        if (file && navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: D.meta.titulo, text: texto })
            .then(() => m.classList.remove('ver'))
            .catch(e => { if (!e || e.name !== 'AbortError') mostrar(); });
          return;
        }
      } catch (e) { }
      mostrar();   // sin menú de compartir (computadora, paquete sin publicar, navegador viejo)
    };
  }
  function verTarjeta(m, url, texto, nombreArch) {
    m.innerHTML = `<div class="envio-caja"><button class="envio-x" aria-label="Cerrar">✕</button>
      <h2>📤 Tu tarjeta de resultados</h2>
      ${url ? `<img class="envio-img" src="${url}" alt="Tarjeta con tus resultados">` : ''}
      <div class="envio-msj">Mantené apretada la imagen para guardarla o compartirla, o sacale una captura de pantalla. Después mandásela a tu seño.</div>
      <div class="envio-bots"><a class="btn enviar" href="https://wa.me/?text=${encodeURIComponent(texto)}" target="_blank" rel="noopener">💬 WhatsApp</a>
      ${url ? `<a class="btn guardar" href="${url}" download="${nombreArch}">⬇️ Guardar</a>` : ''}</div></div>`;
    m.classList.add('ver');
    $('.envio-x', m).onclick = () => m.classList.remove('ver');
  }
  function fechaHora() {
    const d = new Date(), z = n => String(n).padStart(2, '0');
    return z(d.getDate()) + '/' + z(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + z(d.getHours()) + ':' + z(d.getMinutes());
  }
  function textoResultados(R0, nom, gr) {
    const lim = s => String(s).replace(/<[^>]+>/g, '');
    let t = `📚 ${lim(D.meta.titulo)} (${lim(D.meta.area).replace(/^\W+/, '')})\n👤 ${nom}${gr ? ' · ' + gr : ''}\n✅ Aciertos: ${R0.aciertos} · ❌ Errores: ${R0.errores} · 📊 ${R0.pc}% · ⭐ ${R0.puntos}`;
    if (S.intento > 1 && S.primero) t += `\n🔁 Intento ${S.intento} (primer intento: ${S.primero.pc}%)`;
    if (R0.proc) t += '\n' + Object.keys(R0.proc).map(k => `• ${k}: ${R0.proc[k].ok} de ${R0.proc[k].tot}`).join('\n');
    return t + `\n🕒 ${fechaHora()} · QueSepanTodos.com`;
  }
  function tarjeta(R0, nom, gr) {
    const W = 1080, procs = R0.proc ? Object.keys(R0.proc) : [], H = 1180 + (procs.length ? 70 + procs.length * 58 : 0);
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d'); if (!x) return c;
    const lim = s => String(s).replace(/<[^>]+>/g, '').replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF\uFE0F]/gu, '').trim();
    const rr = (X, Y, w, h, r, fill) => { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); x.fillStyle = fill; x.fill(); };
    const F = (sz, w) => `${w || 700} ${sz}px "Baloo 2", Arial, sans-serif`;
    x.fillStyle = '#fff9ef'; x.fillRect(0, 0, W, H);
    const g = x.createLinearGradient(0, 0, W, 0); ['#e63946', '#fb8500', '#ffb703', '#2a9d8f', '#3a86ff', '#8338ec'].forEach((col, i) => g.addColorStop(i / 5, col));
    x.fillStyle = g; x.fillRect(0, 0, W, 24); x.fillRect(0, H - 24, W, 24);
    x.textAlign = 'center'; x.fillStyle = '#7a6a5a'; x.font = F(34); x.fillText('Resultados de la actividad', W / 2, 96);
    x.fillStyle = '#2b2118'; x.font = F(62, 800);
    const tit = lim(D.meta.titulo); let ts = 62; while (x.measureText(tit).width > W - 100 && ts > 34) { ts -= 2; x.font = F(ts, 800); }
    x.fillText(tit, W / 2, 180);
    x.fillStyle = '#7a6a5a'; x.font = F(36); const ar = lim(D.meta.area || ''), sb = lim(D.meta.subtitulo || ''); const st = sb.toLowerCase().includes(ar.toLowerCase()) ? sb : [ar, sb].filter(Boolean).join(' · '); let ss = 36; while (x.measureText(st).width > W - 100 && ss > 22) { ss -= 2; x.font = F(ss); } x.fillText(st, W / 2, 236);
    rr(70, 280, W - 140, 170, 28, '#ffffff'); x.strokeStyle = '#eadcc6'; x.lineWidth = 4; x.stroke();
    x.fillStyle = '#2b2118'; x.font = F(56, 800); let ns = 56; while (x.measureText(nom).width > W - 200 && ns > 30) { ns -= 2; x.font = F(ns, 800); }
    x.fillText(nom, W / 2, 360); x.fillStyle = '#7a6a5a'; x.font = F(38); x.fillText(gr || ' ', W / 2, 418);
    const cajas = [['Aciertos', R0.aciertos, '#2ecc71'], ['Errores', R0.errores, '#e63946'], ['Total', R0.pc + '%', '#3a86ff'], ['Puntos', R0.puntos, '#fb8500']];
    cajas.forEach(([t, v, col], i) => {
      const bw = (W - 140 - 3 * 24) / 4, bx = 70 + i * (bw + 24), by = 500;
      rr(bx, by, bw, 230, 26, '#ffffff'); x.strokeStyle = col; x.lineWidth = 6; x.stroke();
      x.fillStyle = '#7a6a5a'; x.font = F(34); x.fillText(t, bx + bw / 2, by + 62);
      x.fillStyle = col; x.font = F(92, 800); x.fillText(String(v), bx + bw / 2, by + 180);
    });
    let y = 800;
    if (S.intento > 1 && S.primero) { x.fillStyle = '#8338ec'; x.font = F(36, 800); x.fillText(`Intento ${S.intento} · en el primer intento: ${S.primero.pc}%`, W / 2, y); y += 60; }
    else { x.fillStyle = '#2a9d8f'; x.font = F(36, 800); x.fillText('Primer intento', W / 2, y); y += 60; }
    if (procs.length) {
      x.textAlign = 'left'; x.font = F(32, 800); x.fillStyle = '#2b2118'; x.fillText('Proceso evaluado', 90, y + 10); x.textAlign = 'right'; x.fillText('Aciertos', W - 90, y + 10); y += 30;
      procs.forEach(k => { y += 58; x.textAlign = 'left'; x.font = F(32); x.fillStyle = '#2b2118'; let kk = k; while (x.measureText(kk).width > W - 330 && kk.length > 8) kk = kk.slice(0, -2); x.fillText(kk === k ? k : kk + '…', 90, y); x.textAlign = 'right'; x.fillText(`${R0.proc[k].ok} de ${R0.proc[k].tot}`, W - 90, y); });
      y += 40; x.textAlign = 'center';
    }
    x.fillStyle = '#7a6a5a'; x.font = F(32, 600); x.fillText('Enviado el ' + fechaHora(), W / 2, H - 230);
    x.fillStyle = '#7a6a5a'; x.font = F(30); x.fillText(lim(D.meta.autor || ''), W / 2, H - 160);
    x.fillStyle = '#e63946'; x.font = F(40, 800); x.fillText('QueSepanTodos.com', W / 2, H - 90);
    return c;
  }


  function init() { initLightbox(); portada(); }
  window.JUEGO = { S, D, portada, mapa, escalar, cierre, preguntas };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
