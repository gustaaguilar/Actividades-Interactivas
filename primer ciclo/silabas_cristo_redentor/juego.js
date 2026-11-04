/* ===== MOTOR DE JUEGO "SUBIDA" · versión SÍLABAS · QueSepanTodos.com =====
   Basado en el motor de "Escalando el Aconcagua": panel fijo abajo; con cada palabra armada
   Andi sube por el sendero hasta la banderita siguiente.
   Modos: 'armar' (tocar las sílabas en orden) y 'falta' (elegir la sílaba que falta).
   Todo el texto de las palabras va en imprenta minúscula.
   Sonidos sintetizados (0 KB), gráficos SVG/CSS, puntaje por primer intento. */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const S = { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: 1, primero: null, hechos: {} };
  const RAP = window.__RAPIDO ? 12 : 1;
  const ms = t => t / RAP;
  const LSk = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };
  const CLAVE = 'qst_silabas_cristo';
  let progreso = {}; try { progreso = JSON.parse(LSk.get(CLAVE) || '{}') || {}; } catch (e) { progreso = {}; }
  const guardarProg = () => LSk.set(CLAVE, JSON.stringify(progreso));
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

  /* ---------- GRÁFICOS ---------- */
  // camioneta 4×4 (mira a la derecha); Andi maneja y se ve por la ventanilla
  const RUEDA = x => `<g transform="translate(${x} 47)"><g class="rueda"><circle r="11" fill="#1d1b2f"/><circle r="5.5" fill="#ced4da"/><path d="M0 -9 V9 M-9 0 H9" stroke="#6c757d" stroke-width="2.4"/></g></g>`;
  const ANDI = `<svg viewBox="0 0 100 62" class="andi-svg auto-svg"><ellipse cx="52" cy="59" rx="44" ry="3.5" fill="#0003"/>
    <rect x="52" y="1.5" width="24" height="3.5" rx="1.5" fill="#495057"/><rect x="56" y="5" width="2" height="2" fill="#495057"/><rect x="70" y="5" width="2" height="2" fill="#495057"/>
    <path d="M6 45 L6 27 Q6 25 8 25 L46 25 L51 9 Q52 7 55 7 L74 7 Q77 7 78 9.5 L84.5 25.5 L93 27.5 Q97 28.5 97 33 L97 42 Q97 45 94 45 Z" fill="#e63946" stroke="#9d0208" stroke-width="2" stroke-linejoin="round"/>
    <rect x="6" y="21" width="40" height="4" rx="1" fill="#9d0208"/><rect x="8" y="35" width="86" height="3.5" fill="#fff" opacity=".75"/>
    <path d="M54.5 10.5 L74 10.5 L79.5 24.5 L50 24.5 Z" fill="#cdeafe" stroke="#9d0208" stroke-width="1.5"/>
    <g transform="translate(64 18)"><circle class="cuerpo" r="6.2" stroke-width="1.2"/><path d="M-6 -1.5 Q-6 -8 0 -8 Q6 -8 6 -1.5 Z" fill="#e63946"/><circle cx="-2" cy="1" r="1.1" fill="#1d1b2f"/><circle cx="2.4" cy="1" r="1.1" fill="#1d1b2f"/>
      <path class="boca-ok" d="M-2 3.3 Q0.2 5.2 2.4 3.3" fill="none" stroke="#1d1b2f" stroke-width="1" stroke-linecap="round"/><path class="boca-mal" d="M-2 4.8 Q0.2 3 2.4 4.8" fill="none" stroke="#1d1b2f" stroke-width="1" stroke-linecap="round"/></g>
    <rect x="92" y="30" width="5" height="4" rx="1" fill="#ffd166"/><rect x="2" y="29" width="5" height="4" rx="1" fill="#ff6b6b"/><rect x="88" y="42" width="11" height="4" rx="2" fill="#495057"/><rect x="1" y="42" width="9" height="4" rx="2" fill="#495057"/>
    ${RUEDA(26)}${RUEDA(77)}</svg>`;
  const MONTE_D = `
    <path d="M0 900 L0 520 L60 470 L110 500 L170 380 L230 430 L300 300 L360 360 L400 330 L400 900Z" fill="#9fb4c7"/>
    <path d="M0 900 L0 640 L80 560 L150 610 L215 150 L250 205 L275 175 L335 420 L400 470 L400 900Z" fill="#7d8ea3"/>
    <path d="M215 150 L250 205 L275 175 L296 255 L280 245 L262 262 L248 235 L232 255 L222 232 L200 240Z" fill="#fff"/>
    <path d="M0 900 L0 760 L90 700 L170 760 L260 690 L340 740 L400 720 L400 900Z" fill="#5f6f84"/>`;
  const MONTANA = `<svg class="monte m-alto" viewBox="0 0 400 900" preserveAspectRatio="xMidYMax slice">${MONTE_D}</svg><svg class="monte m-ancho" viewBox="0 110 400 420" preserveAspectRatio="xMidYMin slice">${MONTE_D}</svg>`;
  const CONDOR = `<svg viewBox="0 0 120 50"><path class="ala" d="M60 26 Q36 6 2 14 Q30 20 44 30 Z M60 26 Q84 6 118 14 Q90 20 76 30 Z" fill="#1d1b2f"/><ellipse cx="60" cy="28" rx="14" ry="6" fill="#1d1b2f"/><path d="M50 26 Q60 20 70 26" stroke="#fff" stroke-width="4" fill="none"/><circle cx="74" cy="25" r="4" fill="#e5989b"/></svg>`;

  /* ---------- PALABRAS Y SÍLABAS ---------- */
  const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const TILDE = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
  const sinTilde = s => s.replace(/[áéíóú]/g, c => TILDE[c]);
  const slug = p => sinTilde(p.replace(/-/g, '')).replace(/ñ/g, 'n').replace(/[^a-z]/g, '');
  // cómo suena (para no ofrecer una sílaba que suena igual a la correcta: za/sa, ce/se, va/ba, lla/ya, ha/a)
  const fon = x => sinTilde(x).replace(/^z/, 's').replace(/^c([ei])/, 's$1').replace(/^v/, 'b').replace(/^ll/, 'y').replace(/^h/, '');
  const CAMBIO = { m: 'n', n: 'm', p: 'b', b: 'p', d: 't', t: 'd', l: 'r', r: 'l', g: 'c', c: 'g', f: 'p', j: 'g' };
  const RARAS = /^(z[ei]|q|k|w|x|ge|gi|j[ei]?$)/;
  const RESERVA = ['ma', 'pe', 'lo', 'su', 'ti', 'ra', 'no', 'fe', 'de', 'bu'];
  const valida = (c, prohib) => !prohib.has(fon(c)) && !RARAS.test(c) && !/^[^aeiou]*$/.test(c) && !/(ii|uu|iu|ui)/.test(c);
  // todas las sílabas que pueden aparecer como botón falso (así cada una tiene su audio)
  function candidatos(base, todas) {
    const prohib = new Set(todas.map(fon)), out = [];
    base.forEach(s => {
      const b = sinTilde(s), m = b.match(/^(.*?)([aeiou])([^aeiou]*)$/);
      if (m) 'aeiou'.split('').forEach(v => { if (v !== m[2]) out.push(m[1] + v + m[3]); });
      if (CAMBIO[b[0]] && b.slice(0, 2) !== 'ch' && b.slice(0, 2) !== 'll') out.push(CAMBIO[b[0]] + b.slice(1));
    });
    return out.filter(c => valida(c, prohib));
  }
  function distractores(base, todas, n) {
    const prohib = new Set(todas.map(fon)), vistos = new Set(), out = [];
    mezclar(candidatos(base, todas)).concat(mezclar(RESERVA.filter(c => valida(c, prohib)))).forEach(c => {
      const f = fon(c); if (out.length >= n || vistos.has(f)) return;
      vistos.add(f); out.push(c);
    });
    return out;
  }
  const audioSil = s => 's_' + slug(s);
  function preguntas(T) {
    return mezclar(T.palabras).slice(0, NB).map(([p, emo]) => {
      const sil = p.split('-'), pal = sil.join(''), q = { pal, sil, emo, audio: 'w_' + slug(p), modo: T.modo };
      if (T.modo === 'falta') {
        q.hueco = Math.floor(Math.random() * sil.length);
        q.ops = mezclar([sil[q.hueco]].concat(distractores([sil[q.hueco]], sil, T.extra)));
      } else q.ops = mezclar(sil.concat(distractores(sil, sil, T.extra)));
      return q;
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
      <div class="port-escena"><div class="cielo-p"></div>${MONTANA}<div class="ruta-port"></div><div class="andi-port">${ANDI}</div><div class="cartel-port">Ruta 7 · Cristo Redentor</div></div>
      <button class="btn-jugar" id="bJugar">▶ ¡A jugar!</button>
      <button class="btn-oir-port" id="bOirPort">🔊 Escuchar</button>
      ${profeHTML()}<div class="port-fuente">© 2026 Gustavo Aguilar · QueSepanTodos.com</div></div>`;
    // el viaje siempre empieza en el primer tramo; los demás se van abriendo al completar cada uno
    $('#bJugar').onclick = () => { ctx(); SFX.clic(); subir(0); };
    $('#bOirPort').onclick = ev => { ev.stopPropagation(); ctx(); hablar('portada'); };
    activarLightbox();
    // cartel inicial: el primer toque destraba el sonido del celular y arranca el audio de bienvenida
    const arr = document.createElement('button'); arr.className = 'arranque'; arr.id = 'bArranque';
    arr.innerHTML = '<span class="arr-ico">🔊</span><span>Tocá para empezar</span>';
    $('.portada').appendChild(arr);
    arr.onclick = () => { ctx(); arr.remove(); hablar('portada'); };
  }

  /* ---------- MAPA DEL CAMINO ---------- */
  function mapa() {
    limpiar();
    M().className = 'p-mapa';
    const libre = i => D.meta.revision || i === 0 || (progreso[D.tramos[i - 1].id] || 0) > 0;
    M().innerHTML = barra('🗺️ Elegí el tramo', false) + `<div class="mapa"><div class="cielo-p"></div>${MONTANA}
      <svg class="sendero" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="rutaMapa" d="M10 99 C 20 92, 40 92, 30 86 S 72 80, 66 70 S 24 60, 34 52 S 74 44, 64 34 S 30 24, 42 16 S 60 8, 56 2" fill="none" stroke="#3f444b" stroke-width="5" stroke-linecap="round"/><path d="M10 99 C 20 92, 40 92, 30 86 S 72 80, 66 70 S 24 60, 34 52 S 74 44, 64 34 S 30 24, 42 16 S 60 8, 56 2" fill="none" stroke="#ffd166" stroke-width=".7" stroke-dasharray="2.2 2"/></svg>
      ${D.tramos.map((T, i) => { const tr = progreso[T.id] || 0, ok = libre(i);
        return `<button class="campo c${i + 1}${ok ? '' : ' cerrado'}" data-i="${i}">
          <span class="c-ico">${ok ? T.ico : '🔒'}</span>
          <span class="c-nom">${i + 1}. ${T.nombre}<small>${T.modo === 'falta' ? 'la sílaba que falta' : T.palabras[0][0].split('-').length + ' sílabas'}</small></span>
          <span class="c-tro">${tr ? TROFEOS[tr - 1].e : ''}</span></button>`; }).join('')}
      <button class="btn-fin" id="bFin" ${D.tramos.every(T => S.hechos[T.id]) ? '' : 'hidden'}>🏁 Ver mis resultados</button></div>`;
    conBarra();
    $$('.campo').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (!libre(i)) { SFX.triste(); b.classList.remove('sacude'); void b.offsetWidth; b.classList.add('sacude'); return; } SFX.clic(); subir(i); });
    $('#bFin').onclick = () => { SFX.clic(); cierre(); };
  }

  /* ---------- EL VIAJE (vista de costado: la camioneta avanza por la ruta 7 y el paisaje se mueve en capas) ---------- */
  // unidades de la escena: 200 de alto; la ruta va de y=150 a y=172
  const SEG = 170, XA = 80, EXTRA = 1500;                    // largo de cada tramo de ruta, lugar fijo de la camioneta, margen a la derecha
  const FW = XA + NB * SEG + EXTRA;                          // ancho del primer plano
  const PAISAJE = {   // colores y elementos de cada tramo (lo que se ve a los costados de la ruta)
    1: { tierra: ['#d9b77e', '#b8915a'], cerros: '#c08552', lejos: '#9db4cc', nieve: .15, deco: 'embalse', fin: 'dique' },
    2: { tierra: ['#cdb27a', '#a98d55'], cerros: '#b07a4f', lejos: '#93aac4', nieve: .25, deco: 'alamos', fin: 'valle' },
    3: { tierra: ['#c4ae8e', '#9c8566'], cerros: '#9a6b4b', lejos: '#8aa1bd', nieve: .4, deco: 'tren', fin: 'rios' },
    4: { tierra: ['#d6bf86', '#b39a5e'], cerros: '#a3714a', lejos: '#7f97b6', nieve: .55, deco: 'galeria', fin: 'puente' },
    5: { tierra: ['#eef3f8', '#cdd9e6'], cerros: '#8e7b6b', lejos: '#6f88aa', nieve: .85, deco: 'nevado', fin: 'tunel' }
  };
  function rnd(seed) { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
  // cordón de cerros: una línea quebrada a lo largo de todo el ancho, con nieve en las puntas más altas
  function cordon(r, ancho, base, alto, color, nieve, paso) {
    let x = 0, pts = [[0, base]], picos = [];
    while (x < ancho + paso) { const y = base - alto * (.35 + r() * .65); pts.push([x + paso * .5, y]); picos.push([x + paso * .5, y]); x += paso; pts.push([x, base - alto * r() * .3]); }
    pts.push([x, 200], [0, 200]);
    let s = `<path d="M${pts.map(p => p.map(n => n.toFixed(1)).join(' ')).join(' L')}Z" fill="${color}"/>`;
    if (nieve > 0) picos.forEach(([px, py]) => { if (py < base - alto * (1 - nieve)) { const h = (base - py) * .28; s += `<path d="M${px - h * .9} ${py + h} L${px} ${py} L${px + h * .9} ${py + h} L${px + h * .3} ${py + h * .75} L${px - h * .2} ${py + h * 1.05}Z" fill="#fff"/>`; } });
    return s;
  }
  const svgCapa = (ancho, interior, cls) => `<svg class="capa-svg ${cls || ''}" viewBox="0 0 ${ancho} 200" width="${ancho}" height="200" preserveAspectRatio="none">${interior}</svg>`;
  function capaLejos(T) { const P = PAISAJE[T.id], r = rnd(T.id * 31), ancho = FW * .22 + EXTRA;
    return svgCapa(ancho, cordon(r, ancho, 128, 95, P.lejos, P.nieve, 120)); }
  function capaMedio(T) { const P = PAISAJE[T.id], r = rnd(T.id * 53), ancho = FW * .5 + EXTRA;
    return svgCapa(ancho, cordon(r, ancho, 146, 70, P.cerros, P.nieve * .5, 90) + cordon(r, ancho, 150, 26, '#0000001a', 0, 60)); }
  const ALAMO = (x, y, k) => `<g transform="translate(${x} ${y})"><rect x="-1.4" y="-8" width="2.8" height="8" fill="#6b4f35"/><ellipse cy="${-22 - k * 6}" rx="5.5" ry="${17 + k * 6}" fill="${k ? '#2d6a4f' : '#40916c'}"/></g>`;
  const GUANACO = `<g><path d="M-9 -10 Q-10 -18 -4 -18 L8 -18 Q12 -18 12 -12 L12 -9 L9 -9 L9 0 L7 0 L7 -8 L-5 -8 L-5 0 L-7 0 L-7 -9 Z" fill="#c68b59"/><path d="M8 -17 L11 -33 Q12 -36 15 -35 L17 -33 L13 -30 L11 -17Z" fill="#c68b59"/><circle cx="14" cy="-33" r=".9" fill="#1d1b2f"/><path d="M14 -36 l1 -3 l1.2 3" fill="#a86f45"/></g>`;
  // vehículos que bajan por el otro carril (dibujados mirando a la derecha; el CSS los da vuelta)
  // w: ancho en unidades de la escena (la camioneta mide 74); h: alto/ancho del dibujo; todos apoyan las ruedas en y=159
  const VEHICULOS = [
    { w: 135, h: 50 / 120, svg: `<svg viewBox="0 0 120 50"><rect x="2" y="4" width="80" height="34" rx="3" fill="#457b9d"/><rect x="6" y="9" width="72" height="4" fill="#fff" opacity=".4"/><path d="M82 13 L101 13 L117 28 L117 40 L82 40Z" fill="#e9c46a" stroke="#b08900" stroke-width="2"/><path d="M86 16 L99 16 L110 28 L86 28Z" fill="#cdeafe"/><rect x="2" y="38" width="115" height="4" fill="#495057"/><circle cx="18" cy="42" r="8" fill="#1d1b2f"/><circle cx="36" cy="42" r="8" fill="#1d1b2f"/><circle cx="100" cy="42" r="8" fill="#1d1b2f"/><circle cx="18" cy="42" r="3" fill="#adb5bd"/><circle cx="36" cy="42" r="3" fill="#adb5bd"/><circle cx="100" cy="42" r="3" fill="#adb5bd"/></svg>` },
    { w: 140, h: 64 / 120, svg: `<svg viewBox="0 0 120 64"><rect x="2" y="2" width="114" height="52" rx="6" fill="#e63946"/><rect x="2" y="27" width="114" height="3" fill="#9d0208"/>${[0, 1, 2, 3, 4, 5].map(k => `<rect x="${8 + k * 17}" y="7" width="13" height="14" rx="2" fill="#cdeafe"/><rect x="${8 + k * 17}" y="33" width="13" height="12" rx="2" fill="#cdeafe"/>`).join('')}<path d="M108 7 L116 7 L116 45 L108 45Z" fill="#a8dadc"/><rect x="2" y="47" width="114" height="3" fill="#f1faee"/><circle cx="22" cy="55" r="8" fill="#1d1b2f"/><circle cx="96" cy="55" r="8" fill="#1d1b2f"/><circle cx="22" cy="55" r="3" fill="#adb5bd"/><circle cx="96" cy="55" r="3" fill="#adb5bd"/></svg>` },
    { w: 72, h: 50 / 100, svg: `<svg viewBox="0 0 100 50"><rect x="22" y="4" width="18" height="10" rx="2" fill="#f4a261" stroke="#9c6644" stroke-width="1.5"/><rect x="42" y="2" width="22" height="12" rx="2" fill="#2a9d8f" stroke="#1d6f65" stroke-width="1.5"/><rect x="66" y="6" width="12" height="8" rx="2" fill="#e9c46a" stroke="#b08900" stroke-width="1.5"/><rect x="18" y="14" width="64" height="2.5" fill="#495057"/><path d="M6 40 L6 30 Q6 26 10 26 L20 26 L30 16.5 L72 16.5 L84 26 L94 28 Q98 29 98 33 L98 40Z" fill="#ffd166" stroke="#b08900" stroke-width="2"/><path d="M33 19.5 L50 19.5 L50 26 L26 26Z M53 19.5 L70 19.5 L79 26 L53 26Z" fill="#cdeafe"/><circle cx="24" cy="41" r="7.5" fill="#1d1b2f"/><circle cx="80" cy="41" r="7.5" fill="#1d1b2f"/><circle cx="24" cy="41" r="3" fill="#adb5bd"/><circle cx="80" cy="41" r="3" fill="#adb5bd"/></svg>` }
  ];
  function capaFrente(T, ti) {
    const P = PAISAJE[T.id], r = rnd(T.id * 77), fin = XA + NB * SEG + 120;
    let fondo = '', frente = '';
    // franja de tierra y banquina
    fondo += `<defs><linearGradient id="gt${T.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.tierra[0]}"/><stop offset="1" stop-color="${P.tierra[1]}"/></linearGradient></defs>`;
    fondo += `<rect x="0" y="138" width="${FW}" height="62" fill="url(#gt${T.id})"/>`;
    // elementos propios del tramo, detrás de la ruta
    if (P.deco === 'embalse') fondo += `<path d="M0 140 Q${FW * .25} 128 ${FW * .5} 136 T${FW} 134 L${FW} 146 L0 146Z" fill="#2ec4b6"/><path d="M0 141 Q${FW * .25} 132 ${FW * .5} 139" stroke="#cbf3f0" stroke-width="1.5" fill="none" stroke-dasharray="10 18"/>`;
    for (let x = 30; x < FW; x += 40 + r() * 70) {
      const t = r();
      if (P.deco === 'alamos' && t < .7) fondo += ALAMO(x, 142, x % 2 ? 1 : 0) + ALAMO(x + 12, 143, x % 2 ? 0 : 1);
      else if (P.deco === 'embalse' && t < .12) fondo += `<g transform="translate(${x} 138)"><path d="M-9 0 L9 0 L6 3 L-6 3Z" fill="#e63946"/><path d="M0 -6 L0 2" stroke="#1d1b2f" stroke-width="1.2"/><path d="M-6 -4 L6 1" stroke="#ffd166" stroke-width="1.6"/></g>`;
      else if (P.deco === 'nevado' && t < .6) fondo += `<ellipse cx="${x}" cy="${143 + r() * 4}" rx="${10 + r() * 16}" ry="3.5" fill="#fff"/>`;
      else if (t < .35) fondo += `<g transform="translate(${x} 145)"><ellipse rx="7" ry="4" fill="#7a8f3c"/><ellipse cx="5" cy="-2" rx="4" ry="3.4" fill="#8fa84a"/></g>`;
      else if (t < .5) fondo += `<path d="M${x - 7} 147 Q${x - 6} 139 ${x} 139 Q${x + 7} 140 ${x + 7} 147Z" fill="#8d8173" stroke="#6d6156" stroke-width="1"/>`;
    }
    if (P.deco === 'tren') { // vías del viejo tren trasandino
      fondo += `<rect x="0" y="141" width="${FW}" height="1.6" fill="#6c5644"/><rect x="0" y="144.5" width="${FW}" height="1.6" fill="#6c5644"/>`;
      for (let x = 0; x < FW; x += 9) fondo += `<rect x="${x}" y="140.5" width="2.4" height="6.5" fill="#8b6b4f"/>`;
    }
    if (T.id >= 2 && T.id <= 4) for (let x = 260 + r() * 200; x < FW - 100; x += 380 + r() * 300) fondo += `<g transform="translate(${x} 145)">${GUANACO}</g>`;
    // la ruta 7
    fondo += `<rect x="0" y="149" width="${FW}" height="25" fill="#4a4e55"/><rect x="0" y="149" width="${FW}" height="2" fill="#f1f3f5"/><rect x="0" y="172" width="${FW}" height="2" fill="#f1f3f5"/>`;
    fondo += `<path d="M0 161.5 H${FW}" stroke="#ffd166" stroke-width="1.6" stroke-dasharray="12 10"/>`;
    // río Mendoza al costado (adelante de la ruta)
    fondo += `<rect x="0" y="176" width="${FW}" height="24" fill="#c2a97e"/><path d="M0 186 Q40 181 80 186 T160 186 T240 186 T320 186" stroke="#4ea8de" stroke-width="10" fill="none" transform="scale(${FW / 320} 1)"/>`;
    fondo += `<path d="M0 186 H${FW}" stroke="#bde0fe" stroke-width="1.4" stroke-dasharray="6 16"/>`;
    // galerías de hormigón sobre la ruta (tramo 4)
    if (P.deco === 'galeria') [XA + SEG * 2.5, XA + SEG * 4.5].forEach(x => { fondo += `<g transform="translate(${x} 0)"><rect x="-34" y="120" width="68" height="8" fill="#adb5bd"/><rect x="-34" y="128" width="5" height="21" fill="#868e96"/><rect x="29" y="128" width="5" height="21" fill="#868e96"/><path d="M-34 120 L-20 104 L20 104 L34 120Z" fill="#9c8566"/></g>`; });
    // carteles de kilómetro: uno por cada palabra armada
    for (let k = 1; k < NB; k++) { const x = XA + k * SEG + 28;
      fondo += `<g class="bandi" id="bf${k}" transform="translate(${x} 148)"><rect x="-1.2" y="-16" width="2.4" height="16" fill="#6c757d"/><rect class="tela" x="-9" y="-30" width="18" height="15" rx="2" stroke="#fff" stroke-width="1.2"/><text x="0" y="-19" text-anchor="middle" class="km-txt">${k}</text></g>`; }
    // cartel de salida y lugar de llegada
    const desde = ti === 0 ? 'Mendoza' : D.tramos[ti - 1].nombre;
    fondo += cartelVerde(XA - 52, 120, desde);
    const FIN = {
      dique: `<g class="campa" transform="translate(${fin + 70} 148)"><path d="M-70 -10 Q-20 -24 40 -14 L40 0 L-70 0Z" fill="#2ec4b6"/><path d="M38 -34 L56 -34 L66 0 L30 0Z" fill="#adb5bd" stroke="#6c757d" stroke-width="2"/><rect x="34" y="-38" width="26" height="5" fill="#868e96"/><path d="M60 -6 q10 4 4 10" stroke="#bde0fe" stroke-width="3" fill="none"/></g>`,
      valle: `<g class="campa" transform="translate(${fin + 60} 148)"><rect x="-50" y="-14" width="100" height="12" fill="#95d5b2"/><path d="M-50 -10 H50 M-50 -6 H50" stroke="#52b788" stroke-width="1.5"/>${[-44, -30, -16, -2, 12, 26, 40].map((x, k) => ALAMO(x, -14, k % 2)).join('')}<rect x="20" y="-28" width="22" height="14" fill="#f4d35e"/><path d="M16 -28 L31 -38 L46 -28Z" fill="#c1121f"/></g>`,
      rios: `<g class="campa" transform="translate(${fin + 60} 148)"><path d="M-60 -40 Q-30 -22 -6 -6 M60 -40 Q30 -22 6 -6" stroke="#4ea8de" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M0 -6 L0 2" stroke="#4ea8de" stroke-width="12"/><text x="-48" y="-44" class="km-txt" fill="#1d3557">Tupungato</text><text x="22" y="-44" class="km-txt" fill="#1d3557">Cuevas</text></g>`,
      puente: `<g class="campa" transform="translate(${fin + 60} 172)"><path d="M-52 0 L-52 -30 Q0 -62 52 -30 L52 0 L36 0 Q0 -38 -36 0Z" fill="#e9a23b" stroke="#a8641a" stroke-width="2.5"/><path d="M-36 0 Q0 -38 36 0" fill="#4ea8de"/><path d="M-26 -2 q6 -4 12 0 t12 0 t12 0 t12 0" stroke="#fff" stroke-width="2" fill="none"/><path d="M-40 -34 q4 -6 8 0 M20 -42 q4 -6 8 0" stroke="#f4a261" stroke-width="3" fill="none"/></g>`,
      tunel: `<g class="campa cruz" transform="translate(${fin + 80} 149)"><path d="M-80 0 L-60 -60 L-30 -86 L0 -120 L34 -84 L64 -66 L100 0Z" fill="#7d6e60"/><path d="M-30 -86 L-18 -76 L-8 -84 L0 -120 Z M0 -120 L12 -100 L24 -104 L34 -84 L14 -94Z" fill="#fff"/><path d="M-26 0 L-26 -26 Q0 -50 26 -26 L26 0Z" fill="#1d1b2f" stroke="#adb5bd" stroke-width="3"/>
        <g transform="translate(0 -120)" fill="#8a6d3b"><rect x="-6" y="-8" width="12" height="8" fill="#8d99ae"/><circle cx="0" cy="-27" r="3.2"/><path d="M-3 -24 L3 -24 L5 -8 L-5 -8 Z"/><rect x="-13" y="-23" width="26" height="2.6" rx="1.3"/></g>
        <g transform="translate(-74 0)"><rect x="-30" y="-24" width="40" height="24" fill="#e9ecef" stroke="#868e96"/><rect x="-26" y="-18" width="8" height="7" fill="#8ecae6"/><rect x="-12" y="-18" width="8" height="7" fill="#8ecae6"/><rect x="0" y="-12" width="7" height="12" fill="#6c757d"/><text x="-10" y="-27" text-anchor="middle" class="km-txt" fill="#1d3557">Aduana</text></g>
        <g class="arg" transform="translate(44 -30)"><rect x="-1.2" y="-26" width="2.4" height="26" fill="#5c4033"/><rect x="1.2" y="-26" width="20" height="5" fill="#74acdf"/><rect x="1.2" y="-21" width="20" height="5" fill="#fff"/><rect x="1.2" y="-16" width="20" height="5" fill="#74acdf"/><circle cx="11" cy="-18.5" r="1.6" fill="#f6b40e"/></g></g>`
    };
    fondo += FIN[P.fin] + cartelVerde(fin - 40, 118, T.nombre, 'c-meta');
    return svgCapa(FW, fondo);
  }
  function cartelVerde(x, y, txt, cls) {   // cartel de ruta, verde con letras blancas
    const w = Math.max(44, txt.length * 5.3 + 12);
    return `<g class="${cls || ''}" transform="translate(${x} ${y})"><rect x="-1.2" y="0" width="2.4" height="${149 - y}" fill="#6c757d"/><rect x="${-w / 2}" y="-14" width="${w}" height="14" rx="2.5" fill="#1b7f45" stroke="#fff" stroke-width="1.2"/>
      <text y="-4" text-anchor="middle" class="b-cartel">${txt}</text></g>`;
  }

  function subir(ti) {
    limpiar();
    const T = D.tramos[ti], Q = preguntas(T), P = PAISAJE[T.id] || PAISAJE[1];
    let qi = 0, vidas = 3, errT = 0, okT = 0, combo = 0, bloqueo = true, raf = 0, pos = 0;
    M().className = 'p-escalar';
    M().innerHTML = barra(`${T.ico} ${ti + 1}. ${T.nombre}`, false) + `<div class="escena t${T.id}">
      <div class="ladera lado" id="ladera" style="--c1:${T.cielo[0]};--c2:${T.cielo[1]}">
        <div class="cielo-p"></div>${T.id <= 2 ? '<div class="sol"></div>' : ''}
        <div class="capa" id="cLejos">${capaLejos(T)}</div>
        <div class="nube n1">☁️</div><div class="nube n2">☁️</div>
        <div class="capa" id="cMedio">${capaMedio(T)}</div>
        ${T.id === 4 ? `<div class="condor">${CONDOR}</div>` : ''}${T.id === 3 ? '<div class="viento"><i></i><i></i><i></i><i></i></div>' : ''}
        <div class="capa" id="cFrente">${capaFrente(T, ti)}</div>
        <div class="camion-op" id="camionOp"></div>
        <div class="andi" id="andi"><div class="andi-in" id="andiIn">${ANDI}</div></div>
        <div class="gcruza" id="gcruza"><svg viewBox="-12 -40 32 42">${GUANACO}</svg></div>
        ${T.id === 5 ? '<div class="copos">' + '<i></i>'.repeat(14) + '</div>' : ''}
        <div class="hud"><span class="vidas" id="vidas"></span><span class="combo" id="combo"></span><span class="alt" id="alt"></span></div>
        <div class="pv" id="pv"></div>
        <div class="cuenta" id="cuenta"></div>
      </div>
      <div class="panel" id="panel">
        <div class="objetivo" id="obj"></div>
        <div class="pulsos sil" id="pulsos"></div>
      </div>
      <div class="modal" id="modal"></div></div>`;
    conBarra();
    const lad = $('#ladera'), andi = $('#andi'), andiIn = $('#andiIn'), obj = $('#obj');
    const capas = [[$('#cLejos'), .22], [$('#cMedio'), .5], [$('#cFrente'), 1]];
    let cam = 0;   // cuánto avanzó la camioneta (en unidades de la escena)
    // escala: siempre se ven al menos 300 unidades de ruta a lo ancho; la escena se apoya abajo y arriba queda cielo
    const esc = () => Math.min((lad.clientHeight || 300) / 200, (lad.clientWidth || 360) / 300);
    const vista = () => (lad.clientWidth || 360) / esc();   // cuántas unidades entran a lo ancho
    function encuadre() {   // ubica las capas del paisaje y la camioneta según el espacio disponible
      const s = esc(), off = (lad.clientHeight || 300) - 200 * s;
      capas.forEach(([c, f]) => { const sv = c.firstElementChild; sv.style.width = (+sv.getAttribute('width')) * s + 'px'; sv.style.height = 200 * s + 'px'; c.style.top = off + 'px'; c.style.height = 200 * s + 'px'; c.style.transform = `translateX(${-cam * f * s}px)`; });
      andi.style.width = 74 * s + 'px'; andi.style.left = (XA - 37) * s + 'px'; andi.style.top = off + 128 * s + 'px';
      const co = $('#camionOp'); if (co && co.dataset.v) { const V = VEHICULOS[+co.dataset.v]; co.style.width = V.w * s + 'px'; co.style.top = off + (159 - V.w * V.h) * s + 'px'; }
      const g = $('#gcruza'); if (g) { g.style.width = 30 * s + 'px'; g.style.left = (XA + 44) * s + 'px'; g.style.top = off + 131 * s + 'px'; }
    }
    function ubicar(bob) { andiIn.style.transform = bob ? `translateY(${-bob}%)` : ''; }
    function caminar(i, cb, destino) {   // la camioneta maneja hasta el cartel de kilómetro siguiente (o hasta el destino indicado)
      const a = cam, b = destino !== undefined ? destino : i * SEG, dur = ms(1200), t0 = performance.now();
      andi.classList.add('anda'); SFX.motor();
      cancelAnimationFrame(raf);
      const f = now => {
        const k = Math.min(1, (now - t0) / dur), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        cam = a + (b - a) * e; encuadre(); ubicar(Math.abs(Math.sin(k * Math.PI * 12)) * 2.5);
        if (k < 1) raf = requestAnimationFrame(f); else { cam = b; andi.classList.remove('anda'); ubicar(0); encuadre(); cb && cb(); }
      };
      raf = requestAnimationFrame(f);
    }
    function resbalar() {   // un guanaco se cruza en la ruta: la camioneta frena de golpe
      const g = $('#gcruza'); g.classList.remove('cruza'); void g.offsetWidth; g.classList.add('cruza'); SFX.bocina();
      const t0 = performance.now(), dur = ms(700); cancelAnimationFrame(raf);
      const f = now => { const k = Math.min(1, (now - t0) / dur);
        andiIn.style.transform = `translateX(${Math.sin(k * 40) * 2 * (1 - k)}%) rotate(${Math.sin(k * 20) * 2 * (1 - k)}deg)`; if (k < 1) raf = requestAnimationFrame(f); else ubicar(0); };
      raf = requestAnimationFrame(f);
    }
    // camiones que bajan por el otro carril, cada tanto
    let ultimoV = -1;
    const camionOp = () => {   // pasa un vehículo distinto del anterior: camión, ómnibus de dos pisos o auto de turistas
      const c = $('#camionOp'); if (!c || !document.body.contains(c)) return;
      let v; do { v = Math.floor(Math.random() * VEHICULOS.length); } while (v === ultimoV); ultimoV = v;
      c.dataset.v = v; c.innerHTML = VEHICULOS[v].svg; encuadre();
      c.classList.remove('pasa'); void c.offsetWidth; c.classList.add('pasa'); T_(camionOp, 6000 + Math.random() * 5000);
    };
    T_(camionOp, 2500);
    function hud() {
      $('#vidas').textContent = '❤️'.repeat(Math.max(0, vidas)) + '🤍'.repeat(3 - Math.max(0, vidas));
      $('#alt').textContent = `🧩 ${okT}/${NB}`;
    }
    // casilleros de la palabra: en 'armar' se llenan en orden; en 'falta' solo está vacío el hueco
    function casilleros(q, lleno) {
      return `<span class="silabas">${q.sil.map((s, i) => {
        const ver = q.modo === 'falta' ? (i !== q.hueco || lleno) : (i < pos || lleno);
        const act = !lleno && (q.modo === 'falta' ? i === q.hueco : i === pos);
        return `<b class="cas${ver ? ' lleno' : ''}${act ? ' activo' : ''}${q.modo === 'falta' && i === q.hueco && lleno ? ' nuevo' : ''}">${ver ? s : '?'}</b>`;
      }).join('')}</span>`;
    }
    function pintarObj(q, lleno) {
      obj.innerHTML = `<span class="dibujo"><span class="emo" role="img" aria-label="${q.pal}">${q.emo}</span><button class="oir" id="oir" aria-label="Escuchar la palabra">🔊</button></span>
        ${lleno ? `<span class="pal-ok">${q.pal}</span>` : casilleros(q, false)}<span class="o-cont">${qi + 1}/${Q.length}</span>`;
      $('#oir').onclick = ev => { ev.stopPropagation(); SFX.clic(); hablar(q.audio); };
    }
    function mostrar() {
      const q = Q[qi]; q.fallas = 0; pos = 0;
      pintarObj(q, false);
      obj.classList.remove('entra'); void obj.offsetWidth; obj.classList.add('entra');
      $('#pv').innerHTML = '';
      $('#pulsos').innerHTML = q.ops.map(o => `<button class="pul" data-v="${o}">${o}</button>`).join('');
      $$('.pul').forEach(b => b.onclick = () => elegir(b, q));
      hablar(q.audio);
    }
    function evaluar(q, ok) {   // una sola vez por palabra: vale el primer intento
      const clave = T.id + ':' + q.pal;
      if (S.eval[clave] === undefined) { S.eval[clave] = ok; if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto; } else { S.errores++; errT++; } $('#pts').textContent = S.puntos; }
    }
    function elegir(b, q) {
      if (bloqueo || b.classList.contains('x') || b.classList.contains('usado')) return;
      const esperada = q.modo === 'falta' ? q.sil[q.hueco] : q.sil[pos];
      if (b.dataset.v === esperada) {
        b.classList.add('usado');
        const completa = q.modo === 'falta' || pos === q.sil.length - 1;
        hablar(audioSil(b.dataset.v), completa ? () => hablar(q.audio) : null);   // suena la sílaba; al completar, la palabra entera
        $$('.pul.titila').forEach(x => x.classList.remove('titila'));
        // las sílabas marcadas como error vuelven a estar disponibles: una que estaba fuera de orden puede ser la que sigue
        $$('.pul.x').forEach(x => x.classList.remove('x'));
        if (q.modo === 'armar') { pos++; if (pos < q.sil.length) { obj.querySelector('.silabas').outerHTML = casilleros(q, false); return; } }
        // palabra completa
        bloqueo = true; evaluar(q, true);
        okT++; combo = q.fallas ? 0 : combo + 1;
        $$('.pul').forEach(x => x.classList.add('apagado')); b.classList.remove('apagado'); b.classList.add('bien');
        obj.querySelector('.silabas').outerHTML = casilleros(q, true);
        SFX.bien(); if (combo >= 3) T_(() => SFX.combo(combo - 1), 150);
        T_(() => { pintarObj(q, true); }, q.modo === 'falta' ? 700 : 250);
        $('#combo').textContent = combo >= 3 ? `🔥 ${combo} seguidas` : '';
        $('#pv').innerHTML = '';
        T_(() => caminar(okT, () => {
          const f = $('#bf' + okT); if (f) { f.classList.add('ok'); SFX.aterriza(); }
          hud(); qi++;
          if (qi >= Q.length) { llegada(); return; }
          T_(() => { mostrar(); bloqueo = false; }, 300);
        }), q.modo === 'falta' ? 900 : 450);
      } else {
        evaluar(q, false); q.fallas++; combo = 0; vidas--; $('#combo').textContent = '';
        bloqueo = true;
        b.classList.add('x'); SFX.triste(); andiIn.classList.add('triste'); resbalar(); hud();
        // suena la sílaba que tocó (así escucha lo que eligió); en la primera ayuda, después repite la palabra
        hablar(audioSil(b.dataset.v), q.fallas === 1 ? () => hablar(q.audio) : null);
        if (q.fallas === 1) $('#pv').innerHTML = '<div class="pv-txt">💡 Escuchala otra vez y decila despacito</div>';
        else {   // segunda ayuda: la palabra escrita y la sílaba correcta titilando
          $('#pv').innerHTML = `<div class="pv-txt">💡 Mirá: <span class="pv-pal">${q.sil.join(' - ')}</span></div>`;
          $$('.pul').forEach(x => { if (x.dataset.v === esperada && !x.classList.contains('usado')) x.classList.add('titila'); });
        }
        T_(() => { andiIn.classList.remove('triste'); bloqueo = false; }, 1000);
      }
    }
    function llegada() {
      $('#pulsos').innerHTML = '';
      obj.innerHTML = `<span class="intro-txt">${T.ico} ¡Llegaste ${ti === D.tramos.length - 1 ? 'al' : 'a'} ${T.nombre}!</span>`;
      // la camioneta sigue hasta que se ve el lugar de llegada adelante
      const finX = XA + NB * SEG + 120 + 75, meta = Math.max(NB * SEG, finX - XA - 95 - Math.max(0, vista() - 300) * .3);
      caminar(0, () => { const c = $('.campa'); if (c) c.classList.add('arma'); }, meta);
      andi.classList.add('festeja'); SFX.bocina(); T_(() => SFX.combo(4), 700);
      T_(premio, 1300);
    }
    function premio() {
      const tr = trofeoDe(errT), ultimo = ti === D.tramos.length - 1, buen = errT <= 2;
      progreso[T.id] = Math.max(progreso[T.id] || 0, tr); guardarProg(); S.hechos[T.id] = tr;
      const md = $('#modal'); const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
      md.innerHTML = `<div class="m-caja"><canvas id="confeti"></canvas>
        <div class="curio"><span class="curio-pl">${T.ico}</span><span class="curio-tx"><b>🔎 ¿Sabías que…?</b>${T.curiosidad}</span></div>
        <div class="m-pts">${NB - Math.min(NB, errT)} / ${NB}</div>
        <div class="m-tit">${ultimo ? '¡Llegaste al Túnel Internacional!' : tr === 4 ? '¡Increíble!' : tr === 3 ? '¡Excelente!' : tr === 2 ? '¡Muy bien!' : '¡Lo lograste! Probá otra vez sin errores'}</div>
        <div class="m-alt">🧩 ${NB} palabras · ${errT === 0 ? 'sin errores' : errT === 1 ? '1 error' : errT + ' errores'}</div>
        <div class="m-tro"><span class="tro on gana">${TROFEOS[tr - 1].e}</span><span class="tro-nom">¡Trofeo de ${TROFEOS[tr - 1].n}!</span></div>
        <div class="m-cuenta"><small>Mis trofeos</small>${D.tramos.map(X => S.hechos[X.id] ? `<span class="${X.id === T.id ? 'nuevo' : ''}">${TROFEOS[S.hechos[X.id] - 1].e}</span>` : '<span class="vacio"></span>').join('')}</div>
        <div class="m-total">Total: ✅ ${S.aciertos} · ❌ ${S.errores} · 📊 ${pc}% · ⭐ ${S.puntos}</div>
        <div class="m-bots">${ultimo ? '<button class="btn-jugar" id="bCierre">🏁 Ver mis resultados</button>' : '<button class="btn-jugar" id="bSig">▶ Siguiente tramo</button>'}</div></div>`;
      md.classList.add('ver'); confeti($('#confeti'));
      if (buen) SFX.exito(); else SFX.casi();
      T_(() => SFX.trofeo(tr - 1), 300); T_(() => SFX.trofeo(tr), 750);
      // el botón para seguir se habilita recién cuando termina el audio de la curiosidad (así no se superponen)
      const bot = $('#bSig') || $('#bCierre');
      bot.disabled = true; bot.classList.add('espera');
      const aviso = document.createElement('div'); aviso.className = 'm-espera'; aviso.textContent = '🔊 Escuchá la curiosidad…'; bot.after(aviso);
      hablar('l' + T.id, () => hablar('tr' + tr, () => hablar('c' + T.id, () => { bot.disabled = false; bot.classList.remove('espera'); aviso.remove(); })));
      bot.onclick = () => { if (bot.disabled) return; SFX.clic(); if (ultimo) cierre(); else subir(ti + 1); };
    }
    window.onresize = () => { if (document.body.contains(andi)) encuadre(); };
    // largada: consigna + 3, 2, 1, ¡YA!
    hud(); ubicar(0); encuadre();
    obj.innerHTML = `<span class="intro-txt">${T.intro}</span><span class="saltar">👆 Tocá para empezar</span>`;
    let enIntro = true; $('.escena').addEventListener('pointerdown', () => { if (enIntro) cortarVoz(); });
    hablar('t' + T.id, () => {
      if (!enIntro) return; enIntro = false; const sl = $('.saltar'); if (sl) sl.remove();
      let c = 3; const el = $('#cuenta');
      const paso = () => {
        if (c > 0) { el.textContent = c; el.className = 'cuenta ver'; SFX.beep(false); c--; T_(paso, 700); }
        else { el.textContent = '¡Ya!'; el.className = 'cuenta ver ya'; SFX.beep(true); T_(() => { el.className = 'cuenta'; }, 600); bloqueo = false; mostrar(); }
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
    M().innerHTML = `<div class="cierre"><h1>🚙 ¡Terminaste el viaje!</h1>
      <div class="coleccion"><div class="col-tit">🗺️ Mi viaje · tocá una parada</div>
        <div class="col-fila">${D.tramos.map((T, i) => { const tr = S.hechos[T.id] || 0; return `<button class="col-pl${tr ? '' : ' falta'}" data-i="${i}"><span class="col-img">${tr ? T.ico : '❔'}</span><span class="col-tro">${tr ? TROFEOS[tr - 1].e : ''}</span><small>${T.nombre}</small></button>`; }).join('')}</div>
        <div class="col-txt" id="colTxt"></div></div>
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      ${window.QST_SCORM ? '<div class="aula-ok">✅ Tu puntaje ya quedó guardado en el aula</div>' : AULA ? '<button class="btn-aula" id="btnAula">🏫 Entregar en mi aula</button>' : ''}
      <div id="envioLugar"></div>
      <div class="cie-fila"><button class="btn-jugar" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };
    $('#btnOtra').onclick = () => { SFX.clic(); Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: S.intento + 1, hechos: {} }); subir(0); };
    const R0 = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, intento: S.intento, texto: textoAula(pc) };
    // botón de envío: módulo compartido del sitio; si no está, el propio del juego (mismos campos)
    const lugar = $('#envioLugar');
    if (window.QSTEnvio) lugar.appendChild(window.QSTEnvio.boton({ titulo: D.meta.titulo, grado: 'Lengua · 1.er grado', aciertos: S.aciertos, errores: S.errores, puntos: S.puntos, intento: S.intento }));
    else { lugar.innerHTML = '<button class="btn-env" id="btnEnviar">📤 Enviar mi tarea a mi docente</button>'; $('#btnEnviar').onclick = () => abrirEnvio(R0); }
    try { if (window.QST_FIN) window.QST_FIN(R0); } catch (e) { }
    const ba = $('#btnAula'); if (ba) ba.onclick = () => { SFX.clic(); abrirAula(R0.texto); };
    const verCurio = i => { const T = D.tramos[i], tr = S.hechos[T.id] || 0; $$('.col-pl').forEach(b => b.classList.toggle('sel', +b.dataset.i === i));
      $('#colTxt').innerHTML = tr ? `<b>${T.ico} ${T.nombre}:</b> ${T.curiosidad}` : `🔒 Completá el tramo hasta ${T.nombre} para descubrir su curiosidad.`; };
    $$('.col-pl').forEach(b => b.onclick = () => { SFX.clic(); verCurio(+b.dataset.i); });
    verCurio(Math.max(0, D.tramos.findIndex(T => S.hechos[T.id])));
    activarLightbox(); SFX.exito(); hablar('cierre');
  }

  /* ---------- ENTREGA EN EL AULA VIRTUAL (Moodle · Aulas EduTec) ---------- */
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
  window.JUEGO = { S, D, portada, mapa, subir, cierre, preguntas, distractores, candidatos, RESERVA, slug, VEHICULOS };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
