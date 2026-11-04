/* ===== MOTOR DE JUEGO "EL TREN DE LAS RIMAS" · QueSepanTodos.com =====
   Cada estación es un tramo del viaje. Con cada rima encontrada se engancha un vagón nuevo al tren.
   Modos: 'cual' (¿qué dibujo rima con el de la locomotora?), 'grupos' (llevar el dibujo al vagón con el que rima)
   y 'parejas' (tocar dos dibujos que riman). Todo el texto va en imprenta minúscula.
   Usa un solo reproductor de voz (para que no quede mudo en celulares), sonidos sintetizados y puntaje por primer intento. */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const S = { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: 1, primero: null, hechos: {} };
  const RAP = window.__RAPIDO ? 12 : 1;
  const ms = t => t / RAP;
  const LSk = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  const TROFEOS = [{ n: 'bronce', e: '🥉' }, { n: 'plata', e: '🥈' }, { n: 'oro', e: '🥇' }, { n: 'diamante', e: '💎' }];
  const trofeoDe = err => err === 0 ? 4 : err === 1 ? 3 : err <= 3 ? 2 : 1;
  const NB = D.meta.porTramo || 8;

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
    enganche: () => { tono(220, 0, .06, 'square', .12); tono(330, .07, .06, 'square', .1); ruido(0, .12, .25, 3000, 800); },
    error: () => { tono(330, 0, .18, 'triangle', .1); tono(262, .18, .3, 'triangle', .1, 220); },
    silbato: () => { tono(880, 0, .35, 'sine', .08, 860); tono(1108, 0, .35, 'sine', .06, 1080); tono(880, .45, .6, 'sine', .08, 840); tono(1108, .45, .6, 'sine', .06, 1060); },
    aterriza: () => tono(880, 0, .08, 'triangle', .07),
    combo: n => { [0, 4, 7, 12].slice(0, Math.min(4, n)).forEach((s, i) => tono(523 * Math.pow(2, s / 12), i * .07, .12, 'triangle', .1)); },
    triste: () => { tono(392, 0, .18, 'triangle', .1); tono(330, .18, .18, 'triangle', .1); tono(262, .36, .35, 'triangle', .1, 220); },
    exito: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tono(f, i * .12, .2, 'square', .09)),
    casi: () => { tono(392, 0, .3, 'sawtooth', .06, 370); tono(370, .32, .3, 'sawtooth', .06, 349); tono(349, .64, .6, 'sawtooth', .06, 300); },
    trofeo: i => tono(880 + i * 220, 0, .2, 'triangle', .12),
    beep: hi => tono(hi ? 988 : 494, 0, hi ? .45 : .18, 'square', .1),
    clic: () => tono(660, 0, .05, 'square', .05),
    bien: () => { tono(660, 0, .1, 'square', .08); tono(990, .08, .16, 'square', .08); },
    motor: () => { tono(70, 0, 1, 'sawtooth', .07, 120); tono(140, 0, 1, 'square', .025, 230); ruido(0, .9, .08, 300, 900); },
    bocina: () => { tono(415, 0, .22, 'square', .08); tono(415, .3, .4, 'square', .08); tono(523, .3, .4, 'square', .05); },
    piedra: () => { ruido(0, .35, .3, 2500, 300); tono(300, .05, .25, 'triangle', .08, 120); [0.3, .45, .58].forEach(t => tono(220, t, .05, 'square', .05)); ruido(.15, .4, .15, 5000, 2500); }
  };


  /* ---------- VOZ (mp3 opcionales: si faltan, el juego sigue sin voz) ---------- */
  // juego ágil: voces cortas, nunca bloquean (tocar la pantalla corta la voz y sigue)
  // Se usa SIEMPRE el mismo reproductor: los celulares solo dejan sonar audio sin un toque reciente
  // en un reproductor que ya se "destrabó" con un toque. Si se creara uno nuevo para cada audio,
  // los que suenan solos (la curiosidad después de la llegada, por ejemplo) quedarían mudos.
  let voz = null, vozFin = null, vozGen = 0;
  const reproductor = () => { if (!voz) { try { voz = new Audio(); voz.preload = 'auto'; } catch (e) { voz = null; } } return voz; };
  function hablar(k, cb) {
    const gen = ++vozGen, el = reproductor();
    try { if (el) { el.onended = null; el.onerror = null; el.pause(); } } catch (e) { }
    vozFin = null;
    if (mudo || !k || window.__RAPIDO || !el) { if (cb) setTimeout(cb, 0); return; }
    let listo = false; const fin = () => { if (listo || gen !== vozGen) return; listo = true; vozFin = null; if (cb) cb(); };
    vozFin = fin; el.onended = fin; el.onerror = fin;
    el.src = 'audio/' + k + '.mp3';
    const p = el.play(); if (p && p.catch) p.catch(fin);
    setTimeout(fin, 25000);   // por las dudas, si el audio nunca avisa que terminó
  }
  function callarVoz() { vozGen++; vozFin = null; try { if (voz) { voz.onended = null; voz.onerror = null; voz.pause(); } } catch (e) { } }
  function cortarVoz() { try { if (voz) voz.pause(); } catch (e) { } const f = vozFin; if (f) f(); }


  /* ---------- PALABRAS Y RIMAS ---------- */
  const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const escrita = p => (D.escritura && D.escritura[p]) || p;
  // la rima: desde la vocal acentuada hasta el final (avión → "ón"; soldado → "ado"; cepillo → "illo")
  function rima(p) {
    const w = escrita(p), t = w.search(/[áéíóú]/);
    if (t >= 0) return w.slice(t).normalize('NFD').replace(/[̀-ͯ]/g, '');
    const v = [...w].map((c, i) => 'aeiou'.includes(c) ? i : -1).filter(i => i >= 0);
    return w.slice(v.length > 1 ? v[v.length - 2] : 0);
  }
  const riman = (a, b) => a !== b && rima(a) === rima(b);
  const audioDe = p => 'w_' + p;
  function dibujo(p, cls) {   // imagen del dibujo; si todavía no está, el emoji o la palabra escrita
    const e = D.palabras[p] || '';
    return `<span class="dib ${cls || ''}" data-p="${p}"><img src="img/${p}.jpg" alt="${escrita(p)}" data-alt="${e || escrita(p)}" onerror="QSTsinImagen(this)"></span>`;
  }
  // si falta la imagen del dibujo, se muestra el emoji o la palabra escrita (para poder probar antes de tener las imágenes)
  window.QSTsinImagen = img => { const s = document.createElement('span'); s.className = 'dib-alt'; s.textContent = img.dataset.alt; img.replaceWith(s); };
  // tramo "cual": por ronda, el dibujo que rima y dos que no (que tampoco riman entre sí)
  function rondasCual(T) {
    const todas = Object.keys(D.palabras);
    return mezclar(T.rondas).map(([modelo, ok]) => {
      const usadas = [rima(modelo)], dis = [];
      mezclar(todas).forEach(p => { if (dis.length < 2 && !usadas.includes(rima(p))) { usadas.push(rima(p)); dis.push(p); } });
      return { tipo: 'cual', modelo, ok, ops: mezclar([ok].concat(dis)) };
    });
  }
  function itemsGrupos(T) {
    return T.grupos.map(g => ({ modelos: g.modelos, items: mezclar(g.dibujos) }));
  }

  /* ---------- GRÁFICOS DEL TREN ---------- */
  const ANDI = `<g class="andi-cara"><circle cx="20" cy="22" r="15" fill="#48cae4" stroke="#0077b6" stroke-width="2"/>
    <path d="M6 18 Q7 4 20 4 Q33 4 34 18 Z" fill="#1d3557"/><rect x="5" y="16" width="30" height="4" rx="2" fill="#e63946"/>
    <circle cx="15" cy="24" r="2.4" fill="#1d1b2f"/><circle cx="25" cy="24" r="2.4" fill="#1d1b2f"/>
    <path class="boca-ok" d="M15 30 Q20 34 25 30" fill="none" stroke="#1d1b2f" stroke-width="2" stroke-linecap="round"/>
    <path class="boca-mal" d="M15 32 Q20 28 25 32" fill="none" stroke="#1d1b2f" stroke-width="2" stroke-linecap="round"/></g>`;
  const RUEDAS = xs => xs.map(x => `<g transform="translate(${x} 0)"><g class="rueda"><circle r="9" fill="#1d1b2f"/><circle r="4" fill="#adb5bd"/><path d="M0 -7 V7 M-7 0 H7" stroke="#495057" stroke-width="2"/></g></g>`).join('');
  // locomotora mirando a la derecha; el cartel blanco del frente muestra el dibujo de la ronda
  const LOCO = `<svg viewBox="0 0 160 120" class="loco-svg">
    <rect x="96" y="6" width="16" height="26" rx="3" fill="#264653"/><rect x="92" y="2" width="24" height="8" rx="3" fill="#2a9d8f"/>
    <g class="humo"><circle cx="104" cy="-6" r="7" fill="#fff" opacity=".8"/><circle cx="116" cy="-16" r="9" fill="#fff" opacity=".6"/></g>
    <rect x="8" y="22" width="56" height="62" rx="8" fill="#e63946" stroke="#9d0208" stroke-width="3"/>
    <rect x="16" y="30" width="40" height="28" rx="6" fill="#cdeafe"/>
    <svg x="18" y="27" width="36" height="34" viewBox="0 0 40 40">${ANDI}</svg>
    <path d="M60 46 H140 Q152 46 152 58 V84 H60 Z" fill="#f4a261" stroke="#9c6644" stroke-width="3"/>
    <rect x="60" y="40" width="80" height="8" rx="4" fill="#e76f51"/>
    <path d="M152 70 L160 84 L148 84 Z" fill="#6c757d"/>
    <rect x="2" y="84" width="152" height="10" rx="4" fill="#264653"/>
    <g transform="translate(0 100)">${RUEDAS([28, 70, 112, 140])}</g></svg>`;
  const VAGON = (color, contenido) => `<div class="vagon"><svg viewBox="0 0 120 90" class="vagon-svg"><rect x="4" y="10" width="112" height="56" rx="8" fill="${color}" stroke="#00000033" stroke-width="3"/>
    <rect x="0" y="66" width="120" height="8" rx="3" fill="#264653"/><path d="M-6 70 H4" stroke="#264653" stroke-width="4"/><g transform="translate(0 80)">${RUEDAS([28, 92])}</g></svg>
    <div class="vagon-carga">${contenido}</div></div>`;
  const COLORES = ['#ffb703', '#2a9d8f', '#8338ec', '#fb8500', '#3a86ff', '#ef476f', '#06d6a0', '#e9c46a'];
  // cartel de la estación a la izquierda (el globo de la locomotora queda a la derecha): «Estación» y el nombre en una o dos líneas
  function cartelEstacion(nombre) {
    let lin = [nombre];
    if (nombre.length > 12) { const w = nombre.split(' '); let mejor = null;
      for (let i = 1; i < w.length; i++) { const l = [w.slice(0, i).join(' '), w.slice(i).join(' ')], m = Math.max(l[0].length, l[1].length); if (!mejor || m < mejor.m) mejor = { l, m }; }
      if (mejor) lin = mejor.l; }
    const alto = 14 + lin.length * 12;
    return `<g transform="translate(46 ${104 - alto})"><rect x="-42" y="0" width="84" height="${alto}" rx="4" fill="#1d3557" stroke="#fff" stroke-width="2"/>
      <text y="10" text-anchor="middle" class="est-sub">Estación</text>${lin.map((l, i) => `<text y="${22 + i * 12}" text-anchor="middle" class="est-txt"${l.length > 13 ? ' textLength="76" lengthAdjust="spacingAndGlyphs"' : ''}>${l}</text>`).join('')}</g>`;
  }
  function estacionSVG(T) {   // fondo de la estación: cerros, árboles según el lugar, edificio y cartel
    const deco = {
      1: '<ellipse cx="300" cy="150" rx="140" ry="16" fill="#4ea8de"/><path d="M262 148 l8 -6 l8 6 Z" fill="#e63946"/>' + [160, 215, 340, 380].map(x => `<g transform="translate(${x} 150)"><rect x="-3" y="-20" width="6" height="20" fill="#6b4f35"/><circle cy="-30" r="18" fill="#40916c"/></g>`).join(''),
      2: [150, 190, 230, 330, 370].map(x => `<g transform="translate(${x} 152)"><rect x="-2" y="-14" width="4" height="14" fill="#7a5c3e"/><ellipse cy="-22" rx="16" ry="11" fill="#8a9a5b"/><circle cx="-6" cy="-22" r="2" fill="#3a4a1b"/><circle cx="5" cy="-19" r="2" fill="#3a4a1b"/></g>`).join(''),
      3: '<path d="M240 152 L270 96 L300 120 L330 80 L370 152 Z" fill="#c1543a"/><path d="M270 96 L280 120 L300 120 Z M330 80 L340 110 L352 104 Z" fill="#e9a23b"/><path d="M240 152 Q300 140 400 150 L400 156 L240 156 Z" fill="#4ea8de"/>',
      4: [160, 215, 330, 380].map(x => `<g transform="translate(${x} 150)"><rect x="-2" y="-30" width="4" height="30" fill="#6b4f35"/><path d="M-14 -30 Q0 -44 14 -30" fill="#40916c"/><circle cx="-4" cy="-24" r="4" fill="#6a2c70"/><circle cx="4" cy="-24" r="4" fill="#6a2c70"/><circle cx="0" cy="-18" r="4" fill="#6a2c70"/></g>`).join('') + [60, 160, 240, 340].map((x, k) => `<g class="fuego" style="animation-delay:${k * .5}s" transform="translate(${x} ${40 + k % 2 * 18})">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M0 0 L${(Math.cos(a / 57.3) * 14).toFixed(1)} ${(Math.sin(a / 57.3) * 14).toFixed(1)}" stroke="${['#ffd166', '#ef476f', '#06d6a0', '#fff'][k]}" stroke-width="2.5" stroke-linecap="round"/>`).join('')}</g>`).join('')
    }[T.id] || '';
    return `<svg class="est-svg" viewBox="0 0 400 200" preserveAspectRatio="xMinYMax slice">
      <path d="M0 150 L50 92 L95 120 L150 70 L210 130 L270 86 L330 118 L400 74 L400 160 L0 160 Z" fill="#9db4cc"/>
      <path d="M150 70 L162 84 L150 82 L140 86 Z M270 86 L280 98 L266 96 Z M400 74 L392 84 L384 82 Z" fill="#fff"/>
      <rect x="0" y="150" width="400" height="50" fill="#c9b37e"/>${deco}
      <g transform="translate(62 150)"><rect x="-58" y="-44" width="116" height="44" fill="#f1e3c8" stroke="#9c6644" stroke-width="2"/><path d="M-66 -44 L0 -66 L66 -44 Z" fill="#9c2f2f"/>
        <rect x="-44" y="-30" width="16" height="22" fill="#8ecae6"/><rect x="28" y="-30" width="16" height="22" fill="#8ecae6"/><rect x="-10" y="-30" width="20" height="30" fill="#7a5c3e"/></g>
      ${cartelEstacion(T.estacion)}
      <rect x="0" y="176" width="400" height="5" fill="#6c757d"/><rect x="0" y="190" width="400" height="5" fill="#6c757d"/>
      ${Array.from({ length: 27 }, (_, k) => `<rect x="${k * 15}" y="174" width="6" height="24" fill="#7a5c3e"/>`).join('')}</svg>`;
  }

  /* ---------- BARRA ---------- */
  const M = () => $('#pantalla');
  let timers = [];
  const T_ = (f, t) => timers.push(setTimeout(f, ms(t)));
  const limpiar = () => { timers.forEach(clearTimeout); timers = []; callarVoz(); };
  function barra(titulo) {
    return `<header class="barra"><div class="b-tit">${titulo}</div><div class="b-pts">⭐ <b id="pts">${S.puntos}</b></div>
      <button class="b-ico" id="bMudo" aria-label="Sonido">${mudo ? '🔇' : '🔊'}</button></header>`;
  }
  function conBarra() {
    const bm = $('#bMudo'); if (bm) bm.onclick = () => { mudo = !mudo; LSk.set('qst_mudo', mudo ? '1' : '0'); bm.textContent = mudo ? '🔇' : '🔊'; if (mudo) cortarVoz(); };
  }

  /* ---------- PORTADA ---------- */
  function portada() {
    limpiar(); const m = D.meta;
    M().className = 'p-portada';
    M().innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div><h1 class="port-tit">${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <div class="port-escena"><div class="cielo-p" style="--c1:#8ecae6;--c2:#e3f4ff"></div>${estacionSVG({ id: 1, estacion: 'de las rimas' })}
        <div class="tren-port"><div class="loco">${LOCO}<div class="loco-cartel">${dibujo('gato')}</div></div>${VAGON('#ffb703', dibujo('pato', 'chico'))}</div></div>
      <button class="btn-jugar" id="bJugar">▶ ¡A jugar!</button>
      <button class="btn-oir-port" id="bOirPort">🔊 Escuchar</button>
      ${profeHTML()}<div class="port-fuente">📚 ${m.fuente}<br>© 2026 Gustavo Aguilar · QueSepanTodos.com</div></div>`;
    $('#bJugar').onclick = () => { ctx(); SFX.clic(); jugar(0); };
    $('#bOirPort').onclick = ev => { ev.stopPropagation(); ctx(); hablar('portada'); };
    activarLightbox();
    // cartel inicial: el primer toque destraba el sonido del celular y arranca el audio de bienvenida
    const arr = document.createElement('button'); arr.className = 'arranque'; arr.id = 'bArranque';
    arr.innerHTML = '<span class="arr-ico">🔊</span><span>Tocá para empezar</span>';
    $('.portada').appendChild(arr);
    arr.onclick = () => { ctx(); arr.remove(); hablar('portada'); };
  }

  /* ---------- EL VIAJE ---------- */
  function jugar(ti) {
    limpiar();
    const T = D.tramos[ti];
    // lista de "pasos" del tramo, cada uno es un ítem que se evalúa una vez
    let pasos = [];
    if (T.tipo === 'cual') pasos = rondasCual(T);
    else if (T.tipo === 'grupos') itemsGrupos(T).forEach((g, gi) => g.items.forEach(([p, k]) => pasos.push({ tipo: 'grupos', gi, modelos: g.modelos, p, k })));
    else T.tableros.forEach((tb, bi) => pasos.push({ tipo: 'parejas', bi, pares: tb }));
    const totalItems = T.tipo === 'parejas' ? T.tableros.reduce((a, t) => a + t.length, 0) : pasos.length;
    let qi = 0, errT = 0, okT = 0, combo = 0, bloqueo = true, vagones = 0;
    M().className = 'p-jugar';
    M().innerHTML = barra(`${T.ico} ${ti + 1}. ${T.estacion}`) + `<div class="escena t${T.id}">
      <div class="anden" id="anden" style="--c1:${T.cielo[0]};--c2:${T.cielo[1]}">
        <div class="cielo-p"></div>${estacionSVG(T)}
        <div class="hud"><span class="combo" id="combo"></span><span class="alt" id="alt"></span></div>
        <div class="tren" id="tren"><div class="vagones" id="vagones"></div><div class="loco" id="loco">${LOCO}<div class="loco-cartel" id="cartel"></div></div></div>
        <div class="pv" id="pv"></div><div class="cuenta" id="cuenta"></div>
      </div>
      <div class="panel" id="panel"><div class="consigna" id="consigna"></div><div class="opciones" id="ops"></div></div>
      <div class="modal" id="modal"></div></div>`;
    conBarra();
    const cartel = $('#cartel'), ops = $('#ops'), consigna = $('#consigna'), loco = $('#loco');
    const hud = () => { $('#alt').textContent = `🚃 ${okT}/${totalItems}`; };
    function evaluar(clave, ok) {   // vale el primer intento de cada ítem
      if (S.eval[clave] === undefined) { S.eval[clave] = ok; if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto; } else { S.errores++; errT++; } $('#pts').textContent = S.puntos; }
    }
    function sumarVagon(contenido) {   // con cada acierto se engancha un vagón nuevo al tren
      const v = document.createElement('div'); v.innerHTML = VAGON(COLORES[vagones % COLORES.length], contenido); vagones++;
      const el = v.firstElementChild; el.classList.add('nuevo'); $('#vagones').appendChild(el);
      SFX.enganche(); loco.classList.remove('chucu'); void loco.offsetWidth; loco.classList.add('chucu');
    }
    function error(btn, pista) {
      combo = 0; $('#combo').textContent = '';
      if (btn) { btn.classList.add('x'); btn.classList.remove('sel'); }
      SFX.error(); loco.classList.remove('sacude'); void loco.offsetWidth; loco.classList.add('sacude');
      loco.classList.add('triste'); T_(() => loco.classList.remove('triste'), 900);
      if (pista) $('#pv').innerHTML = `<div class="pv-txt">💡 ${pista}</div>`;
    }
    function acierto() {
      okT++; combo++; hud(); SFX.bien(); if (combo >= 3) { T_(() => SFX.combo(combo - 1), 150); $('#combo').textContent = `🔥 ${combo} seguidas`; }
      $('#pv').innerHTML = '';
    }
    const escuchar = p => `<button class="oir" data-oir="${p}" aria-label="Escuchar">🔊</button>`;
    function activarOir() { $$('[data-oir]').forEach(b => b.onclick = ev => { ev.stopPropagation(); SFX.clic(); hablar(audioDe(b.dataset.oir)); }); }

    // sigue cuando terminó el audio (más un respiro) y pasó el tiempo mínimo de la animación
    function trasAudio(min, fn) {
      let audio = false, tiempo = false, hecho = false;
      const ir = () => { if (audio && tiempo && !hecho) { hecho = true; fn(); } };
      T_(() => { tiempo = true; ir(); }, min);
      return () => { if (!audio) { audio = true; T_(ir, 350); } };
    }
    function mostrar() {
      const P = pasos[qi]; $('#pv').innerHTML = ''; bloqueo = false;
      if (P.tipo === 'cual') {
        P.fallas = 0;
        cartel.innerHTML = dibujo(P.modelo) + `<span class="cartel-pal">${escrita(P.modelo)}</span>` + escuchar(P.modelo);
        consigna.innerHTML = `<span>¿Qué rima con <b>${escrita(P.modelo)}</b>?</span>`;
        ops.className = 'opciones tres';
        ops.innerHTML = P.ops.map(p => `<button class="op" data-p="${p}">${dibujo(p)}<span class="op-pal">${escrita(p)}</span></button>`).join('');
        $$('.op', ops).forEach(b => b.onclick = () => elegirCual(b, P));
        hablar(audioDe(P.modelo));
      } else if (P.tipo === 'grupos') {
        P.fallas = 0;
        cartel.innerHTML = dibujo(P.p) + `<span class="cartel-pal">${escrita(P.p)}</span>` + escuchar(P.p);
        consigna.innerHTML = `<span>¿Con qué rima <b>${escrita(P.p)}</b>?</span>`;
        ops.className = 'opciones dos';
        ops.innerHTML = P.modelos.map((m, k) => `<button class="op opgrupo" data-k="${k}"><span class="riman">Riman con</span>${dibujo(m)}<span class="op-pal">${escrita(m)}</span></button>`).join('');
        $$('.op', ops).forEach(b => b.onclick = () => elegirGrupo(b, P));
        hablar(audioDe(P.p));
      } else {
        P.hechas = 0; P.sel = null;
        cartel.innerHTML = '<span class="cartel-star">🎡</span>';
        consigna.innerHTML = 'Tocá dos dibujos que rimen';
        ops.className = 'opciones parejas';
        ops.innerHTML = mezclar(P.pares.flat()).map(p => `<button class="op" data-p="${p}">${dibujo(p)}<span class="op-pal">${escrita(p)}</span></button>`).join('');
        $$('.op', ops).forEach(b => b.onclick = () => elegirPareja(b, P));
      }
      activarOir();
      cartel.classList.remove('entra'); void cartel.offsetWidth; cartel.classList.add('entra');
    }
    function siguiente() {
      qi++; hud();
      if (qi >= pasos.length) { llegada(); return; }
      T_(mostrar, 350);
    }
    function elegirCual(b, P) {
      if (bloqueo || b.classList.contains('x')) return;
      const p = b.dataset.p, ok = p === P.ok;
      evaluar(T.id + ':' + P.modelo, ok);
      if (ok) {
        bloqueo = true; acierto();
        b.classList.add('bien'); $$('.op', ops).forEach(x => { if (x !== b) x.classList.add('apagado'); });
        // se escuchan las dos palabras juntas: así se oye la rima
        hablar(audioDe(P.modelo), () => hablar(audioDe(p), trasAudio(1900, siguiente)));
        T_(() => sumarVagon(dibujo(P.modelo, 'chico') + dibujo(p, 'chico')), 500);
      } else {
        P.fallas++; hablar(audioDe(p));
        error(b, P.fallas >= 2 ? `Escuchá cómo termina: ${escrita(P.modelo)}…` : `${escrita(p)} no rima con ${escrita(P.modelo)}`);
        if (P.fallas >= 2) $$('.op', ops).forEach(x => { if (x.dataset.p === P.ok) x.classList.add('titila'); });
      }
    }
    function elegirGrupo(b, P) {
      if (bloqueo || b.classList.contains('x')) return;
      const k = +b.dataset.k, ok = k === P.k;
      evaluar(T.id + ':' + P.p, ok);
      if (ok) {
        bloqueo = true; acierto(); b.classList.add('bien');
        hablar(audioDe(P.p), () => hablar(audioDe(P.modelos[k]), trasAudio(1800, siguiente)));
        T_(() => sumarVagon(dibujo(P.p, 'chico')), 500);
      } else {
        P.fallas++; hablar(audioDe(P.modelos[k]));
        error(b, `${escrita(P.p)} no rima con ${escrita(P.modelos[k])}`);
        if (P.fallas >= 2) $$('.op', ops).forEach(x => { if (+x.dataset.k === P.k) x.classList.add('titila'); });
      }
    }
    function elegirPareja(b, P) {
      if (bloqueo || b.classList.contains('hecha')) return;
      const p = b.dataset.p;
      if (!P.sel) { P.sel = b; b.classList.add('sel'); SFX.clic(); hablar(audioDe(p)); return; }
      if (P.sel === b) { b.classList.remove('sel'); P.sel = null; return; }
      const a = P.sel, pa = a.dataset.p; P.sel = null;
      const par = P.pares.find(x => x.includes(pa));
      if (riman(pa, p)) {
        evaluar(T.id + ':' + P.bi + ':' + par.join('-'), true);
        bloqueo = true; acierto(); a.classList.remove('sel');
        [a, b].forEach(x => x.classList.add('bien', 'hecha'));
        P.hechas++; const ultima = P.hechas >= P.pares.length;
        T_(() => { sumarVagon(dibujo(pa, 'chico') + dibujo(p, 'chico')); [a, b].forEach(x => x.classList.add('fuera')); }, 600);
        // se destraba recién cuando terminan de sonar las dos palabras (así se escucha la rima completa)
        hablar(audioDe(pa), () => hablar(audioDe(p), trasAudio(ultima ? 1700 : 600, () => { if (ultima) siguiente(); else bloqueo = false; })));
      } else {
        evaluar(T.id + ':' + P.bi + ':' + par.join('-'), false);   // el error se cuenta a la pareja del primer dibujo
        hablar(audioDe(p));
        a.classList.remove('sel'); error(null, `${escrita(pa)} y ${escrita(p)} no riman`);
        [a, b].forEach(x => { x.classList.remove('sac'); void x.offsetWidth; x.classList.add('sac'); });
      }
    }
    function llegada() {
      bloqueo = true; ops.innerHTML = ''; cartel.innerHTML = '<span class="cartel-star">🏁</span>';
      consigna.innerHTML = `${T.ico} ¡Llegamos a ${T.estacion}!`;
      SFX.silbato(); $('#tren').classList.add('llega');
      T_(premio, 1600);
    }
    function premio() {
      const tr = trofeoDe(errT), ultimo = ti === D.tramos.length - 1;
      S.hechos[T.id] = tr;
      const md = $('#modal'); const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
      md.innerHTML = `<div class="m-caja"><canvas id="confeti"></canvas>
        <div class="curio"><span class="curio-pl">${T.ico}</span><span class="curio-tx"><b>🔎 ¿Sabías que…?</b>${T.curiosidad}</span></div>
        <div class="m-pts">${totalItems - Math.min(totalItems, errT)} / ${totalItems}</div>
        <div class="m-tit">${ultimo ? '¡Llegaste a la Fiesta de la Vendimia!' : tr === 4 ? '¡Increíble!' : tr === 3 ? '¡Excelente!' : tr === 2 ? '¡Muy bien!' : '¡Lo lograste! Probá otra vez sin errores'}</div>
        <div class="m-alt">🚃 ${vagones} vagones · ${errT === 0 ? 'sin errores' : errT === 1 ? '1 error' : errT + ' errores'}</div>
        <div class="m-tro"><span class="tro on gana">${TROFEOS[tr - 1].e}</span><span class="tro-nom">¡Trofeo de ${TROFEOS[tr - 1].n}!</span></div>
        <div class="m-cuenta"><small>Mis trofeos</small>${D.tramos.map(X => S.hechos[X.id] ? `<span class="${X.id === T.id ? 'nuevo' : ''}">${TROFEOS[S.hechos[X.id] - 1].e}</span>` : '<span class="vacio"></span>').join('')}</div>
        <div class="m-total">Total: ✅ ${S.aciertos} · ❌ ${S.errores} · 📊 ${pc}% · ⭐ ${S.puntos}</div>
        <div class="m-bots">${ultimo ? '<button class="btn-jugar" id="bCierre">🏁 Ver mis resultados</button>' : '<button class="btn-jugar" id="bSig">▶ Siguiente estación</button>'}</div></div>`;
      md.classList.add('ver'); confeti($('#confeti'));
      if (errT <= 2) SFX.exito(); else SFX.casi();
      T_(() => SFX.trofeo(tr - 1), 300); T_(() => SFX.trofeo(tr), 750);
      // el botón para seguir se habilita recién cuando termina el audio de la curiosidad (así no se superponen)
      const bot = $('#bSig') || $('#bCierre');
      bot.disabled = true; bot.classList.add('espera');
      const aviso = document.createElement('div'); aviso.className = 'm-espera'; aviso.textContent = '🔊 Escuchá la curiosidad…'; bot.after(aviso);
      hablar('l' + T.id, () => hablar('tr' + tr, () => hablar('c' + T.id, () => { bot.disabled = false; bot.classList.remove('espera'); aviso.remove(); })));
      bot.onclick = () => { if (bot.disabled) return; SFX.clic(); if (ultimo) cierre(); else jugar(ti + 1); };
    }
    // largada: consigna + 3, 2, 1, ¡ya!
    hud();
    cartel.innerHTML = '<span class="cartel-star">🚂</span>';
    consigna.innerHTML = `<span class="intro-txt">${T.intro}</span><span class="saltar">👆 Tocá para empezar</span>`;
    let enIntro = true; $('.escena').addEventListener('pointerdown', () => { if (enIntro) cortarVoz(); });
    hablar('t' + T.id, () => {
      if (!enIntro) return; enIntro = false; const sl = $('.saltar'); if (sl) sl.remove();
      let c = 3; const el = $('#cuenta');
      const paso = () => {
        if (c > 0) { el.textContent = c; el.className = 'cuenta ver'; SFX.beep(false); c--; T_(paso, 700); }
        else { el.textContent = '¡Ya!'; el.className = 'cuenta ver ya'; SFX.beep(true); SFX.silbato(); T_(() => { el.className = 'cuenta'; }, 600); mostrar(); }
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
    M().innerHTML = `<div class="cierre"><h1>🚂 ¡Terminaste el viaje!</h1>
      <div class="coleccion"><div class="col-tit">🗺️ Mi viaje · tocá una parada</div>
        <div class="col-fila">${D.tramos.map((T, i) => { const tr = S.hechos[T.id] || 0; return `<button class="col-pl${tr ? '' : ' falta'}" data-i="${i}"><span class="col-img">${tr ? T.ico : '❔'}</span><span class="col-tro">${tr ? TROFEOS[tr - 1].e : ''}</span><small>${T.estacion}</small></button>`; }).join('')}</div>
        <div class="col-txt" id="colTxt"></div></div>
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      ${window.QST_SCORM ? '<div class="aula-ok">✅ Tu puntaje ya quedó guardado en el aula</div>' : AULA ? '<button class="btn-aula" id="btnAula">🏫 Entregar en mi aula</button>' : ''}
      <div id="envioLugar"></div>
      <div class="cie-fila"><button class="btn-jugar" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };
    $('#btnOtra').onclick = () => { SFX.clic(); Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: S.intento + 1, hechos: {} }); jugar(0); };
    const R0 = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, intento: S.intento, texto: textoAula(pc) };
    // botón de envío: módulo compartido del sitio; si no está, el propio del juego (mismos campos)
    const lugar = $('#envioLugar');
    if (window.QSTEnvio) lugar.appendChild(window.QSTEnvio.boton({ titulo: D.meta.titulo, grado: 'Lengua · 1.° y 2.° grado', aciertos: S.aciertos, errores: S.errores, puntos: S.puntos, intento: S.intento }));
    else { lugar.innerHTML = '<button class="btn-env" id="btnEnviar">📤 Enviar mi tarea a mi docente</button>'; $('#btnEnviar').onclick = () => abrirEnvio(R0); }
    try { if (window.QST_FIN) window.QST_FIN(R0); } catch (e) { }
    const ba = $('#btnAula'); if (ba) ba.onclick = () => { SFX.clic(); abrirAula(R0.texto); };
    const verCurio = i => { const T = D.tramos[i], tr = S.hechos[T.id] || 0; $$('.col-pl').forEach(b => b.classList.toggle('sel', +b.dataset.i === i));
      $('#colTxt').innerHTML = tr ? `<b>${T.ico} ${T.estacion}:</b> ${T.curiosidad}` : `🔒 Llegá a ${T.estacion} para descubrir su curiosidad.`; };
    $$('.col-pl').forEach(b => b.onclick = () => { SFX.clic(); verCurio(+b.dataset.i); });
    verCurio(Math.max(0, D.tramos.findIndex(T => S.hechos[T.id])));
    activarLightbox(); SFX.exito(); hablar('cierre');
  }

  /* ---------- ENTREGA EN EL AULA VIRTUAL (Moodle · Aulas EduTec) ---------- */
  const AULA = (() => { try { const u = new URLSearchParams(location.search).get('aula'); return u && /^https:\/\//i.test(u) ? u : ''; } catch (e) { return ''; } })();
  function textoAula(pc) {
    const tro = D.tramos.map(T => { const tr = S.hechos[T.id] || 0; return `${T.estacion}: ${tr ? 'trofeo de ' + TROFEOS[tr - 1].n : 'sin completar'}`; }).join(' · ');
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
    $('#lbCerrar').addEventListener('click', () => { lb.classList.remove('ver'); im.classList.remove('zoom'); im.style.transformOrigin = '50% 50%'; });
  }

  /* ---- Envío propio (solo si falta el módulo compartido recursos/enviar-tarea.js) ----
     Mismos campos y misma memoria que el módulo: estudiante y curso obligatorios, docente opcional. */
  const LSe = { get() { try { return JSON.parse(localStorage.getItem('qst_envio')) || {}; } catch (e) { return {}; } }, set(d) { try { localStorage.setItem('qst_envio', JSON.stringify(d)); } catch (e) { } } };
  const escH = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function abrirEnvio(R0) {
    let m = $('#envio');
    if (!m) { m = document.createElement('div'); m.id = 'envio'; document.body.appendChild(m); }
    const g = LSe.get();
    m.innerHTML = `<div class="envio-caja"><button class="envio-x" aria-label="Cerrar">✕</button>
      <h2>📤 Enviar mi tarea a mi docente</h2>
      <label>Nombre y apellido del estudiante<input id="enNom" maxlength="45" autocomplete="name" value="${escH(g.estudiante)}"></label>
      <label>Curso<input id="enCur" maxlength="20" placeholder="ej.: 1.° A" value="${escH(g.curso)}"></label>
      <label>Nombre y apellido del docente (opcional)<input id="enDoc" maxlength="45" value="${escH(g.docente)}"></label>
      <div class="envio-msj" id="enMsj"></div>
      <button class="btn enviar" id="enOk">📤 Enviar</button></div>`;
    m.classList.add('ver');
    $('.envio-x', m).onclick = () => m.classList.remove('ver');
    $('#enOk').onclick = () => {
      const d = { estudiante: $('#enNom').value.replace(/\s+/g, ' ').trim(), curso: $('#enCur').value.replace(/\s+/g, ' ').trim(), docente: $('#enDoc').value.replace(/\s+/g, ' ').trim() };
      if (!d.estudiante) { $('#enMsj').textContent = '✏️ Escribí tu nombre y apellido, así tu docente sabe que es tuyo.'; $('#enNom').focus(); return; }
      if (!d.curso) { $('#enMsj').textContent = '✏️ Falta tu curso (por ejemplo: 1.° A).'; $('#enCur').focus(); return; }
      LSe.set(d);
      const canvas = tarjeta(R0, d), texto = textoResultados(R0, d);
      const nombreArch = 'resultados_' + d.estudiante.replace(/\s+/g, '_').replace(/[^\wáéíóúñÁÉÍÓÚÑ_]/g, '') + '.png';
      let url = '', file = null;
      try { url = canvas.toDataURL('image/png'); } catch (e) { }
      try {
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
      mostrar();
    };
  }
  function verTarjeta(m, url, texto, nombreArch) {
    m.innerHTML = `<div class="envio-caja"><button class="envio-x" aria-label="Cerrar">✕</button>
      <h2>📤 Tu tarjeta de resultados</h2>
      ${url ? `<img class="envio-img" src="${url}" alt="Tarjeta con tus resultados">` : ''}
      <div class="envio-msj">Mantené apretada la imagen para guardarla o compartirla, o sacale una captura de pantalla. Después mandásela a tu docente.</div>
      <div class="envio-bots"><a class="btn enviar" href="https://wa.me/?text=${encodeURIComponent(texto)}" target="_blank" rel="noopener">💬 WhatsApp</a>
      ${url ? `<a class="btn guardar" href="${url}" download="${nombreArch}">⬇️ Guardar</a>` : ''}</div></div>`;
    m.classList.add('ver');
    $('.envio-x', m).onclick = () => m.classList.remove('ver');
  }
  function fechaHora() {
    const d = new Date(), z = n => String(n).padStart(2, '0');
    return z(d.getDate()) + '/' + z(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + z(d.getHours()) + ':' + z(d.getMinutes());
  }
  function textoResultados(R0, d) {
    const lim = s => String(s).replace(/<[^>]+>/g, '');
    let t = `📚 ${lim(D.meta.titulo)} (${lim(D.meta.area).replace(/^\W+/, '')})\n👤 ${d.estudiante} · ${d.curso}${d.docente ? '\n👩‍🏫 Docente: ' + d.docente : ''}\n✅ Aciertos: ${R0.aciertos} · ❌ Errores: ${R0.errores} · 📊 ${R0.pc}% · ⭐ ${R0.puntos}`;
    if (S.intento > 1 && S.primero) t += `\n🔁 Intento ${S.intento} (primer intento: ${S.primero.pc}%)`;
    return t + `\n🕒 ${fechaHora()} · QueSepanTodos.com`;
  }
  function tarjeta(R0, d) {
    const W = 1080, H = 1240;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d'); if (!x) return c;
    const lim = s => String(s).replace(/<[^>]+>/g, '').replace(/[\u{1F300}-\u{1FAFF}☀-➿️]/gu, '').trim();
    const rr = (X, Y, w, h, r, fill) => { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); x.fillStyle = fill; x.fill(); };
    const F = (sz, w) => `${w || 700} ${sz}px "Baloo 2", Arial, sans-serif`;
    const ajusta = (txt, sz, w, max) => { let s = sz; x.font = F(s, w); while (x.measureText(txt).width > max && s > 22) { s -= 2; x.font = F(s, w); } };
    x.fillStyle = '#fff9ef'; x.fillRect(0, 0, W, H);
    const g = x.createLinearGradient(0, 0, W, 0); ['#e63946', '#fb8500', '#ffb703', '#2a9d8f', '#3a86ff', '#8338ec'].forEach((col, i) => g.addColorStop(i / 5, col));
    x.fillStyle = g; x.fillRect(0, 0, W, 24); x.fillRect(0, H - 24, W, 24);
    x.textAlign = 'center'; x.fillStyle = '#7a6a5a'; x.font = F(34); x.fillText('Resultados de la actividad', W / 2, 96);
    x.fillStyle = '#2b2118'; const tit = lim(D.meta.titulo); ajusta(tit, 62, 800, W - 100); x.fillText(tit, W / 2, 180);
    x.fillStyle = '#7a6a5a'; const st = lim(D.meta.area) + ' · ' + lim(D.meta.subtitulo); ajusta(st, 36, 700, W - 100); x.fillText(st, W / 2, 236);
    rr(70, 280, W - 140, d.docente ? 230 : 170, 28, '#ffffff'); x.strokeStyle = '#eadcc6'; x.lineWidth = 4; x.stroke();
    x.fillStyle = '#2b2118'; ajusta(d.estudiante, 56, 800, W - 200); x.fillText(d.estudiante, W / 2, 360);
    x.fillStyle = '#7a6a5a'; ajusta(d.curso, 38, 700, W - 200); x.fillText(d.curso, W / 2, 418);
    if (d.docente) { const dt = 'Docente: ' + d.docente; ajusta(dt, 34, 700, W - 200); x.fillText(dt, W / 2, 476); }
    const by = d.docente ? 560 : 500;
    [['Aciertos', R0.aciertos, '#2ecc71'], ['Errores', R0.errores, '#e63946'], ['Total', R0.pc + '%', '#3a86ff'], ['Puntos', R0.puntos, '#fb8500']].forEach(([t, v, col], i) => {
      const bw = (W - 140 - 3 * 24) / 4, bx = 70 + i * (bw + 24);
      rr(bx, by, bw, 230, 26, '#ffffff'); x.strokeStyle = col; x.lineWidth = 6; x.stroke();
      x.fillStyle = '#7a6a5a'; x.font = F(34); x.fillText(t, bx + bw / 2, by + 62);
      x.fillStyle = col; x.font = F(92, 800); x.fillText(String(v), bx + bw / 2, by + 180);
    });
    const y = by + 300;
    x.font = F(36, 800);
    if (S.intento > 1 && S.primero) { x.fillStyle = '#8338ec'; x.fillText(`Intento ${S.intento} · en el primer intento: ${S.primero.pc}%`, W / 2, y); }
    else { x.fillStyle = '#2a9d8f'; x.fillText('Primer intento', W / 2, y); }
    x.fillStyle = '#7a6a5a'; x.font = F(32, 600); x.fillText('Enviado el ' + fechaHora(), W / 2, H - 230);
    x.font = F(30); x.fillText(lim(D.meta.autor || ''), W / 2, H - 160);
    x.fillStyle = '#e63946'; x.font = F(40, 800); x.fillText('QueSepanTodos.com', W / 2, H - 90);
    return c;
  }


  function init() { initLightbox(); portada(); }
  window.JUEGO = { S, D, portada, jugar, cierre, rima, riman, rondasCual };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
