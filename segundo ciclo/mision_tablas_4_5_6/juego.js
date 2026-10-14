/* ===== MOTOR DE JUEGO "MISIÓN ESPACIAL" · QueSepanTodos.com =====
   Caen 3 asteroides con números; al tocar el correcto la nave de Andi lo destruye y avanza hacia el planeta.
   Sonidos sintetizados (0 KB), gráficos SVG/CSS, puntaje por primer intento, tarjeta para la seño. */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const S = { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: 1, primero: null, proc: null, hechos: {} };
  const RAP = window.__RAPIDO ? 12 : 1;
  const ms = t => t / RAP;
  let parar = null;
  const LSk = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  const CLAVE = 'qst_mision456';
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
    laser: () => { tono(1800, 0, .18, 'sawtooth', .07, 300); tono(1200, .02, .14, 'square', .04, 200); },
    boom: () => { ruido(0, .55, .45, 1200, 80); tono(90, 0, .4, 'sine', .2, 40); },
    warp: () => { ruido(0, .7, .18, 300, 3000); tono(200, 0, .6, 'sine', .06, 900); },
    choque: () => { tono(160, 0, .22, 'square', .1, 90); ruido(0, .2, .25, 600, 200); },
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
      const op = new Set([p]); mezclar([t * (k + 1), t * (k - 1), p + 1, p - 1, (t + 1) * k, (t - 1) * k, p + 2, p - 2]).forEach(x => { if (op.size < 3 && x > 0 && x !== p) op.add(x); });
      return { t, k, res: p, obj: `${t} × ${k}`, audio: `p${t}_${k}`, ops: mezclar([...op]) };
    });
  }

  /* ---------- BARRA ---------- */
  const M = () => $('#pantalla');
  let timers = [];
  const T_ = (f, t) => timers.push(setTimeout(f, ms(t)));
  const limpiar = () => { timers.forEach(clearTimeout); timers = []; if (parar) { parar(); parar = null; } callarVoz(); };
  function barra(titulo, conMapa) {
    return `<header class="barra"><button class="b-ico" id="bMapa" ${conMapa ? '' : 'hidden'} aria-label="Volver al mapa">🗺️</button>
      <div class="b-tit">${titulo}</div><div class="b-pts">⭐ <b id="pts">${S.puntos}</b></div>
      <button class="b-ico" id="bMudo" aria-label="Sonido">${mudo ? '🔇' : '🔊'}</button></header>`;
  }
  function conBarra() {
    const bm = $('#bMudo'); if (bm) bm.onclick = () => { mudo = !mudo; LSk.set('qst_mudo', mudo ? '1' : '0'); bm.textContent = mudo ? '🔇' : '🔊'; if (mudo) cortarVoz(); };
    const bp = $('#bMapa'); if (bp) bp.onclick = () => { SFX.clic(); mapa(); };
  }

  /* ---------- GRÁFICOS DEL ESPACIO ---------- */
  const PLANETA = {
    tierra: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#2e86de"/><path d="M22 30 Q35 18 48 28 Q44 42 30 44 Q20 40 22 30Z M55 55 Q70 48 80 60 Q74 78 58 76 Q50 66 55 55Z M60 18 Q70 16 74 24 Q66 28 60 18Z" fill="#43a047"/><circle cx="50" cy="50" r="46" fill="none" stroke="#9fd3ff" stroke-width="4" opacity=".6"/></svg>`,
    luna: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#cfd4da"/><circle cx="34" cy="36" r="9" fill="#adb5bd"/><circle cx="62" cy="60" r="12" fill="#adb5bd"/><circle cx="66" cy="28" r="5" fill="#adb5bd"/><circle cx="30" cy="68" r="6" fill="#adb5bd"/><path d="M50 4 A46 46 0 0 1 50 96 A40 46 0 0 0 50 4Z" fill="#0002"/></svg>`,
    marte: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#e2582b"/><ellipse cx="38" cy="40" rx="14" ry="7" fill="#b9411b"/><ellipse cx="64" cy="64" rx="10" ry="5" fill="#b9411b"/><ellipse cx="50" cy="8" rx="16" ry="4" fill="#fff" opacity=".85"/><path d="M50 4 A46 46 0 0 1 50 96 A40 46 0 0 0 50 4Z" fill="#0002"/></svg>`,
    jupiter: `<svg viewBox="0 0 100 100"><defs><clipPath id="cj"><circle cx="50" cy="50" r="46"/></clipPath></defs><g clip-path="url(#cj)"><rect width="100" height="100" fill="#e9c49a"/><rect y="20" width="100" height="9" fill="#c98b5b"/><rect y="38" width="100" height="6" fill="#d9a77a"/><rect y="52" width="100" height="10" fill="#b8744a"/><rect y="72" width="100" height="7" fill="#c98b5b"/><ellipse cx="66" cy="62" rx="10" ry="6" fill="#c0392b"/></g><path d="M50 4 A46 46 0 0 1 50 96 A40 46 0 0 0 50 4Z" fill="#0002"/></svg>`,
    saturno: `<svg viewBox="0 0 120 100"><ellipse cx="60" cy="50" rx="58" ry="14" fill="none" stroke="#d8c48f" stroke-width="7"/><circle cx="60" cy="50" r="34" fill="#e8d29b"/><rect x="26" y="40" width="68" height="6" fill="#d1b26f" opacity=".8"/><rect x="26" y="56" width="68" height="5" fill="#d1b26f" opacity=".8"/><path d="M8 52 Q60 72 112 52" fill="none" stroke="#f1e2b5" stroke-width="7"/></svg>`,
    neptuno: `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#3d6fe0"/><rect x="4" y="38" width="92" height="7" fill="#5c8df0" opacity=".7"/><rect x="4" y="60" width="92" height="5" fill="#2c55b8" opacity=".7"/><ellipse cx="36" cy="54" rx="9" ry="5" fill="#1d3f99"/><path d="M50 4 A46 46 0 0 1 50 96 A40 46 0 0 0 50 4Z" fill="#0002"/></svg>`
  };
  // la nave de Andi (Andi va en la cabina)
  const NAVE = `<div class="nave-in"><svg viewBox="0 0 100 150" class="nave-svg">
      <path d="M50 4 C78 30 82 70 76 112 L24 112 C18 70 22 30 50 4Z" fill="#f1f3f5" stroke="#495057" stroke-width="3"/>
      <path d="M50 4 C62 15 69 28 72 40 L28 40 C31 28 38 15 50 4Z" fill="#e63946"/>
      <path d="M24 82 L4 120 L26 112Z M76 82 L96 120 L74 112Z" fill="#e63946" stroke="#9d0208" stroke-width="2"/>
      <rect x="40" y="112" width="20" height="10" fill="#6c757d"/>
      <circle cx="50" cy="70" r="20" fill="#bde0fe" stroke="#495057" stroke-width="4"/></svg>
      <div class="cabina">${ANDI}</div><div class="fuego"></div><div class="escudo"></div></div>`;
  const ROCA = `<svg viewBox="0 0 100 100" class="roca-svg"><path d="M50 4 L78 12 L96 40 L90 74 L66 96 L30 94 L8 72 L4 38 L22 12Z" fill="#8d6e63" stroke="#4e342e" stroke-width="4"/><circle cx="30" cy="30" r="8" fill="#6d4c41"/><circle cx="72" cy="70" r="10" fill="#6d4c41"/><circle cx="70" cy="28" r="5" fill="#6d4c41"/></svg>`;
  const ESTRELLAS = `<div class="estrellas e1"></div><div class="estrellas e2"></div>`;

  /* ---------- PORTADA ---------- */
  function portada() {
    limpiar(); const m = D.meta;
    M().className = 'p-portada';
    M().innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div><h1 class="port-tit">${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <div class="port-escena">${ESTRELLAS}<div class="pp p1">${PLANETA.saturno}</div><div class="pp p2">${PLANETA.marte}</div><div class="pp p3">${PLANETA.luna}</div><div class="nave-port">${NAVE}</div></div>
      <button class="btn-jugar" id="bJugar">🚀 ¡Despegar!</button>
      ${profeHTML()}<div class="port-fuente">© 2026 Gustavo Aguilar · QueSepanTodos.com</div></div>`;
    $('#bJugar').onclick = () => { ctx(); SFX.clic(); mapa(); };
    activarLightbox();
  }

  /* ---------- MAPA: el viaje por el sistema solar ---------- */
  function mapa() {
    limpiar();
    M().className = 'p-mapa';
    const libre = i => D.meta.revision || i === 0 || (progreso[D.tramos[i - 1].id] || 0) > 0;
    M().innerHTML = barra('🚀 Elegí la misión', false) + `<div class="mapa">${ESTRELLAS}
      <svg class="sendero" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 96 C 20 88, 22 80, 30 74 S 74 64, 70 56 S 24 46, 30 38 S 72 28, 70 20 S 46 10, 50 6" fill="none" stroke="#fff" stroke-width="1.2" stroke-dasharray="2 2" opacity=".7"/></svg>
      <div class="tierra-m">${PLANETA.tierra}</div>
      ${D.tramos.map((T, i) => { const tr = progreso[T.id] || 0, ok = libre(i);
        return `<button class="campo c${i + 1}${ok ? '' : ' cerrado'}" data-i="${i}">
          <span class="c-ico">${ok ? PLANETA[T.destino] : '🔒'}</span>
          <span class="c-nom">${i + 1}. ${T.nombre}<small>${T.tipo === 'falta' ? 'Falta un número' : 'Tabla del ' + T.tabla.join(', del ')}</small></span>
          <span class="c-tro">${tr ? TROFEOS[tr - 1].e : ''}</span></button>`; }).join('')}
      <button class="btn-fin" id="bFin" ${D.tramos.every(T => S.hechos[T.id]) ? '' : 'hidden'}>🏁 Ver mis resultados</button></div>`;
    conBarra();
    $$('.campo').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (!libre(i)) { SFX.triste(); b.classList.remove('sacude'); void b.offsetWidth; b.classList.add('sacude'); return; } SFX.clic(); mision(i); });
    $('#bFin').onclick = () => { SFX.clic(); cierre(); };
  }

  /* ---------- LA MISIÓN: asteroides con números caen; Andi dispara al correcto ---------- */
  const CARRILES = [18, 50, 82];
  function mision(ti) {
    limpiar();
    const T = D.tramos[ti], Q = preguntas(T);
    let qi = 0, vidas = 3, errT = 0, okT = 0, combo = 0, bloqueo = true, raf = 0, activo = false, t0 = 0, q = null, rocas = [];
    M().className = 'p-mision';
    M().innerHTML = barra(`🚀 ${ti + 1}. ${T.nombre}`, true) + `<div class="escena">
      <div class="campo-esp" id="cesp">${ESTRELLAS}<div class="warp" id="warp"></div>
        <div class="destino" id="destino">${PLANETA[T.destino]}</div>
        <div class="hud"><span class="vidas" id="vidas"></span><span class="combo" id="combo"></span>
          <span class="viaje"><i class="v-tierra">🌍</i><span class="v-pista"><i class="v-cohete" id="vCohete">🚀</i></span><i class="v-dest">${PLANETA[T.destino]}</i></span></div>
        <div id="rocas"></div>
        <div class="laser" id="laser"></div>
        <div class="nave" id="nave">${NAVE}</div>
        <div class="cuenta" id="cuenta"></div>
      </div>
      <div class="panel" id="panel"><div class="objetivo" id="obj"></div><div class="pv" id="pv"></div></div>
      <div class="modal" id="modal"></div></div>`;
    conBarra();
    const cesp = $('#cesp'), nave = $('#nave'), obj = $('#obj'), cont = $('#rocas');
    const dur = () => T.seg * 1000 / RAP;
    parar = () => { activo = false; cancelAnimationFrame(raf); };
    function hud() {
      $('#destino').style.setProperty('--esc', .35 + .45 * okT / Q.length);
      $('#vidas').textContent = '❤️'.repeat(Math.max(0, vidas)) + '🤍'.repeat(3 - Math.max(0, vidas));
      $('#vCohete').style.left = (okT / Q.length * 100) + '%';
    }
    function naveA(pct) { nave.style.left = pct + '%'; }
    // movimiento de las rocas (requestAnimationFrame: se pueden pausar y saber dónde están)
    function mover(now) {
      if (!activo) return;
      const H = cesp.clientHeight || 500, fin = H * 0.66, ini = -H * 0.18, d = dur();
      rocas.forEach(r => {
        if (r.quieta) return;
        let k = ((now - t0) / d + r.desfase) % 1; if (k < 0) k += 1;
        r.y = ini + (fin - ini) * k;
        r.el.style.transform = `translate(-50%, ${r.y}px) rotate(${k * r.giro}deg)`;
        r.el.querySelector('.num').style.transform = `rotate(${-k * r.giro}deg)`;
      });
      raf = requestAnimationFrame(mover);
    }
    function mostrar() {
      q = Q[qi]; q.fallas = 0;
      obj.innerHTML = `<span class="o-num">${q.obj}</span><span class="o-cont">${qi + 1}/${Q.length}</span>`;
      obj.classList.remove('entra'); void obj.offsetWidth; obj.classList.add('entra');
      $('#pv').innerHTML = '';
      const des = mezclar([0, .1, .2]);
      cont.innerHTML = q.ops.map((o, i) => `<button class="roca" data-v="${o}" style="left:${CARRILES[i]}%">${ROCA}<span class="num">${o}</span></button>`).join('');
      rocas = $$('.roca', cont).map((el, i) => ({ el, desfase: des[i] * -1, giro: (Math.random() < .5 ? -1 : 1) * (40 + Math.random() * 60), y: 0, quieta: false }));
      rocas.forEach(r => r.el.onpointerdown = ev => { ev.preventDefault(); elegir(r); });
      rocas.forEach(r => r.el.onclick = () => elegir(r));
      t0 = performance.now(); activo = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(mover);
    }
    function elegir(r) {
      if (bloqueo || r.el.classList.contains('x') || r.quieta) return;
      bloqueo = true;
      const ok = +r.el.dataset.v === q.res, clave = T.id + ':' + q.t + 'x' + q.k, i = rocas.indexOf(r);
      if (S.eval[clave] === undefined) { S.eval[clave] = ok; if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto; } else { S.errores++; errT++; } $('#pts').textContent = S.puntos; }
      if (ok) {
        okT++; combo = q.fallas ? 0 : combo + 1;
        activo = false; cancelAnimationFrame(raf); rocas.forEach(x => x.quieta = true);
        naveA(CARRILES[i]); SFX.clic();
        obj.innerHTML = `<span class="o-num">${q.obj.replace('<b class="hueco">?</b>', `<b class="hueco lleno">${q.res}</b>`)}${T.tipo === 'falta' ? '' : ` = <b class="hueco lleno">${q.res}</b>`}</span><span class="o-cont">${qi + 1}/${Q.length}</span>`;
        $('#pv').innerHTML = ''; $('#combo').textContent = combo >= 3 ? `🔥 ${combo} seguidas` : '';
        T_(() => {   // ¡disparo!
          const H = cesp.clientHeight, nTop = nave.offsetTop, yR = r.y + r.el.offsetHeight * .5;
          const L = $('#laser'); L.style.left = CARRILES[i] + '%'; L.style.top = yR + 'px'; L.style.height = Math.max(10, nTop - yR) + 'px';
          L.classList.remove('dispara'); void L.offsetWidth; L.classList.add('dispara'); SFX.laser();
          T_(() => { r.el.classList.add('boom'); SFX.boom(); rocas.forEach(x => { if (x !== r) x.el.classList.add('se-va'); }); if (combo >= 3) SFX.combo(combo - 1); }, 140);
          T_(() => { $('#warp').classList.add('ver'); cesp.classList.add('rapido'); SFX.warp(); hud(); }, 520);
          T_(() => {
            $('#warp').classList.remove('ver'); cesp.classList.remove('rapido'); naveA(50); qi++;
            if (qi >= Q.length) { llegada(); return; }
            mostrar(); bloqueo = false;
          }, 1350);
        }, 260);
      } else {
        q.fallas++; combo = 0; vidas--; $('#combo').textContent = '';
        r.el.classList.add('x'); SFX.choque();
        const n = $('.nave-in', nave); n.classList.remove('golpe'); void n.offsetWidth; n.classList.add('golpe'); nave.classList.add('triste'); hud();
        $('#pv').innerHTML = T.tipo === 'falta'
          ? `<div class="pv-txt">💡 ${q.t} grupos de… ¿cuántos para llegar a ${q.t * q.k}?</div>` + (q.fallas >= 2 ? grupos(q.t, q.k) : '')
          : `<div class="pv-txt">💡 ${q.t} × ${q.k} son ${q.t} grupos de ${q.k}</div>` + grupos(q.t, q.k);
        T_(() => SFX.triste(), 250);
        T_(() => { nave.classList.remove('triste'); bloqueo = false; }, 900);
      }
    }
    function llegada() {   // el planeta se acerca y la nave aterriza
      activo = false; cont.innerHTML = '';
      obj.innerHTML = `<span class="intro-txt">🪐 ¡Llegaste a ${T.nombre}!</span>`;
      $('#destino').classList.add('llega'); SFX.warp();
      T_(() => { nave.classList.add('aterriza'); SFX.combo(4); }, 900);
      T_(fin, 2100);
    }
    function fin() {
      const tr = trofeoDe(errT), ultimo = ti === D.tramos.length - 1, buen = errT <= 3;
      progreso[T.id] = Math.max(progreso[T.id] || 0, tr); guardarProg(); S.hechos[T.id] = 1;
      const md = $('#modal'); const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
      md.innerHTML = `<div class="m-caja"><canvas id="confeti"></canvas>
        <div class="curio"><span class="curio-pl">${PLANETA[T.destino]}</span><span class="curio-tx"><b>🔭 ¿Sabías que…?</b>${T.curiosidad}</span></div>
        <div class="m-pts">${10 - Math.min(10, errT)} / 10</div>
        <div class="m-tit">${ultimo ? '¡Misión cumplida! Llegaste a Neptuno' : tr === 4 ? '¡Increíble!' : tr === 3 ? '¡Excelente!' : tr === 2 ? '¡Muy bien!' : '¡Lo lograste! Probá otra vez con menos errores'}</div>
        <div class="m-alt">🪐 ${T.nombre} · ${errT === 0 ? 'sin errores' : errT === 1 ? '1 error' : errT + ' errores'}</div>
        <div class="m-tro">${TROFEOS.map((x, i) => `<span class="tro${i < tr ? ' on' : ''}" style="--d:${i * .3}s">${x.e}</span>`).join('')}</div>
        <div class="m-total">Total: ✅ ${S.aciertos} · ❌ ${S.errores} · 📊 ${pc}% · ⭐ ${S.puntos}</div>
        <div class="m-bots">${ultimo ? '<button class="btn-jugar" id="bCierre">🏁 Ver mis resultados</button>' : '<button class="btn-jugar" id="bSig">▶ Siguiente misión</button>'}</div></div>`;
      md.classList.add('ver'); confeti($('#confeti'));
      if (buen) SFX.exito(); else SFX.casi();
      TROFEOS.forEach((x, i) => { if (i < tr) T_(() => SFX.trofeo(i), 400 + i * 300); });
      hablar('l' + T.id, () => hablar('tr' + tr, () => hablar('c' + T.id)));
      const bs = $('#bSig'); if (bs) bs.onclick = () => { SFX.clic(); mision(ti + 1); };
      const bc = $('#bCierre'); if (bc) bc.onclick = () => { SFX.clic(); cierre(); };
    }
    // largada: consigna (se corta tocando) + 3, 2, 1, ¡YA!
    hud(); naveA(50);
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
    M().innerHTML = `<div class="cierre"><h1>🚀 ¡Misión cumplida!</h1>
      <div class="coleccion"><div class="col-tit">🪐 Mi colección de planetas · tocá uno</div>
        <div class="col-fila">${D.tramos.map((T, i) => { const tr = progreso[T.id] || 0; return `<button class="col-pl${tr ? '' : ' falta'}" data-i="${i}"><span class="col-img">${tr ? PLANETA[T.destino] : '❔'}</span><span class="col-tro">${tr ? TROFEOS[tr - 1].e : ''}</span><small>${T.nombre}</small></button>`; }).join('')}</div>
        <div class="col-txt" id="colTxt"></div></div>
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      <button class="btn-env" id="btnEnviar">📤 Enviar mis resultados a la seño</button>
      <div class="cie-fila"><button class="btn-jugar" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };
    $('#btnOtra').onclick = () => { SFX.clic(); Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: S.intento + 1, hechos: {} }); mapa(); };
    $('#btnEnviar').onclick = () => abrirEnvio({ aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, proc: null });
    const verCurio = i => { const T = D.tramos[i], tr = progreso[T.id] || 0; $$('.col-pl').forEach(b => b.classList.toggle('sel', +b.dataset.i === i));
      $('#colTxt').innerHTML = tr ? `<b>🔭 ${T.nombre}:</b> ${T.curiosidad}` : `🔒 Completá la misión a ${T.nombre} para descubrir su curiosidad.`; };
    $$('.col-pl').forEach(b => b.onclick = () => { SFX.clic(); verCurio(+b.dataset.i); });
    verCurio(Math.max(0, D.tramos.findIndex(T => progreso[T.id])));
    activarLightbox(); SFX.exito(); hablar('cierre');
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
  window.JUEGO = { S, D, portada, mapa, mision, cierre, preguntas };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
