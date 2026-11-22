/* ===== MOTOR "EL ROBOT DE LAS PALABRAS" · QueSepanTodos.com =====
   Juego de lectura para 1.° y 2.° grado. Se toca el robot y su pantalla gira como una tragamonedas:
   parte 1, giran palabras y se elige el dibujo entre 9; parte 2, giran dibujos y se elige la palabra entre 9.
   Cada acierto enciende una luz del robot (10 por parte). La palabra no se lee en voz alta antes de responder;
   al acertar, se escucha. Un solo reproductor de voz, pantalla inicial «Tocá para empezar», puntaje por primer intento. */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const S = { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: 1, primero: null, hechos: {} };
  const RAP = window.__RAPIDO ? 12 : 1;
  const ms = t => t / RAP;
  const LSk = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } } };

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


  Object.assign(SFX, {
    tic: () => tono(1500, 0, .025, 'square', .045),
    palanca: () => { ruido(0, .25, .25, 1800, 400); [0, .06, .12, .18].forEach(t => tono(260, t, .04, 'square', .06)); },
    para: () => { tono(1046.5, 0, .5, 'triangle', .1); tono(1318.5, .05, .5, 'triangle', .08); tono(1568, .1, .6, 'triangle', .07); },
    luz: i => { tono(523.25 * Math.pow(2, i / 12), 0, .12, 'square', .07); tono(523.25 * Math.pow(2, (i + 7) / 12), .08, .2, 'triangle', .08); },
    fiesta: () => { [0, 4, 7, 12, 16, 19, 24].forEach((s, i) => tono(392 * Math.pow(2, s / 12), i * .09, .22, 'square', .07)); tono(784, .7, .6, 'triangle', .1); tono(988, .7, .6, 'triangle', .08); tono(1175, .7, .7, 'triangle', .07); }
  });

  /* ---------- AYUDAS ---------- */
  const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const ALT = { w_sirena: '🧜‍♀️🌊' };
  const imagen = (k, cls) => `<span class="dib ${cls || ''}"><img src="img/${k}.jpg" alt="" data-alt="${ALT[k] || '🖼️'}" onerror="QSTsinImagen(this)"></span>`;
  window.QSTsinImagen = img => { const s = document.createElement('span'); s.className = 'dib-alt'; s.textContent = img.dataset.alt; img.replaceWith(s); };
  const COLORES = ['#ffb703', '#3a86ff', '#8338ec', '#ef476f'];
  const PAL = D.palabras, POR = {}; PAL.forEach(p => { POR[p.k] = p; });
  const R = D.meta.rondas, N = D.meta.opciones;
  const LUZ = ['#ff595e', '#ff924c', '#ffca3a', '#c5ca30', '#8ac926', '#2ec4b6', '#1982c4', '#4267ac', '#6a4c93', '#e056fd'];

  /* ---------- EL ROBOT (dibujado por código) ---------- */
  function robotSVG() {
    const bombis = [];
    for (let x = 70; x <= 230; x += 20) { bombis.push([x, 150]); bombis.push([x, 254]); }
    for (let y = 172; y <= 232; y += 20) { bombis.push([58, y]); bombis.push([242, y]); }
    return `<svg viewBox="0 0 300 360" aria-hidden="true">
      <line x1="150" y1="40" x2="150" y2="18" stroke="#0077b6" stroke-width="6" stroke-linecap="round"/>
      <circle id="antena" cx="150" cy="13" r="11" fill="#ff595e" stroke="#9d0208" stroke-width="3"/>
      <rect x="64" y="60" width="18" height="40" rx="7" fill="#ffb703" stroke="#b36b00" stroke-width="3"/>
      <rect x="218" y="60" width="18" height="40" rx="7" fill="#ffb703" stroke="#b36b00" stroke-width="3"/>
      <rect x="80" y="36" width="140" height="88" rx="28" fill="#48cae4" stroke="#0077b6" stroke-width="5"/>
      <g class="ojos"><g class="ojo-normal"><circle cx="122" cy="76" r="16" fill="#fff" stroke="#0077b6" stroke-width="3"/><circle cx="178" cy="76" r="16" fill="#fff" stroke="#0077b6" stroke-width="3"/>
        <circle class="pupila" cx="124" cy="78" r="8" fill="#1d3557"/><circle class="pupila" cx="180" cy="78" r="8" fill="#1d3557"/>
        <circle cx="127" cy="74" r="3" fill="#fff"/><circle cx="183" cy="74" r="3" fill="#fff"/></g>
        <g class="ojo-feliz"><path d="M106 82 Q122 62 138 82" fill="none" stroke="#1d3557" stroke-width="7" stroke-linecap="round"/><path d="M162 82 Q178 62 194 82" fill="none" stroke="#1d3557" stroke-width="7" stroke-linecap="round"/></g></g>
      <circle cx="100" cy="102" r="7" fill="#ff8fab" opacity=".8"/><circle cx="200" cy="102" r="7" fill="#ff8fab" opacity=".8"/>
      <path class="boca" d="M132 102 Q150 116 168 102" fill="none" stroke="#1d3557" stroke-width="6" stroke-linecap="round"/>
      <rect x="134" y="122" width="32" height="14" fill="#90a4ae" stroke="#546e7a" stroke-width="3"/>
      <rect x="20" y="168" width="26" height="74" rx="13" fill="#48cae4" stroke="#0077b6" stroke-width="4"/>
      <circle cx="33" cy="248" r="13" fill="#ffb703" stroke="#b36b00" stroke-width="3"/>
      <g id="palanca"><line x1="262" y1="204" x2="284" y2="148" stroke="#adb5bd" stroke-width="8" stroke-linecap="round"/>
        <circle cx="285" cy="143" r="14" fill="#ff595e" stroke="#9d0208" stroke-width="3"/><circle cx="281" cy="139" r="4" fill="#fff" opacity=".7"/></g>
      <rect x="40" y="134" width="220" height="196" rx="30" fill="#3a86ff" stroke="#1d4ed8" stroke-width="5"/>
      <circle cx="262" cy="204" r="11" fill="#546e7a" stroke="#263238" stroke-width="3"/>
      <rect x="56" y="148" width="188" height="108" rx="16" fill="#ffd166" stroke="#b36b00" stroke-width="4"/>
      <rect x="68" y="160" width="164" height="84" rx="8" fill="#fff" stroke="#b36b00" stroke-width="3"/>
      ${bombis.map(([x, y], i) => `<circle class="bombi${i % 2 ? ' par' : ''}" cx="${x}" cy="${y}" r="4.6"/>`).join('')}
      <rect x="52" y="274" width="196" height="34" rx="17" fill="#1d3a8a" stroke="#1d4ed8" stroke-width="3"/>
      ${LUZ.map((c, i) => `<circle class="luz" id="lz${i}" cx="${69 + i * 18.4}" cy="291" r="7.2"/>`).join('')}
      <rect x="78" y="326" width="54" height="24" rx="10" fill="#1d4ed8"/><rect x="168" y="326" width="54" height="24" rx="10" fill="#1d4ed8"/>
    </svg>`;
  }
  const robotHTML = () => `<button class="robot" id="robot" aria-label="Tocá el robot">${robotSVG()}<div class="ventana" id="ventana"><div class="cinta" id="cinta"></div></div><span class="mano">👆</span></button>`;

  // la pantalla del robot: una cinta de palabras (parte 1) o de dibujos (parte 2) que gira como una tragamonedas
  const celdaHTML = (k, p) => k === '?' ? '<div class="celda"><span class="c-pal c-preg">?</span></div>'
    : p === 1 ? `<div class="celda"><span class="c-pal">${POR[k].t}</span></div>` : `<div class="celda">${imagen(k)}</div>`;
  function ajustarCinta() {
    const v = $('#ventana'); if (!v) return;
    const h = v.clientHeight, w = v.clientWidth;
    $$('.c-pal', v).forEach(s => { const n = Math.max(3, s.textContent.length); s.style.fontSize = Math.round(Math.min(h * .62, w * .9 / (n * .56))) + 'px'; });
  }
  let giroGen = 0;
  const cuadro = f => (window.requestAnimationFrame ? window.requestAnimationFrame(f) : setTimeout(f, 16));
  function rodar(lista, p, dur, sonar, cb) {
    const cinta = $('#cinta'); if (!cinta) return;
    const n = lista.length, fin = n - 1, gen = ++giroGen, d = window.__GIRO_RAPIDO ? 30 : dur;
    cinta.style.setProperty('--n', n);
    cinta.innerHTML = lista.map(k => celdaHTML(k, p)).join(''); ajustarCinta();
    cinta.style.transform = 'translateY(0)';
    if (n < 2) { if (cb) cb(); return; }
    const t0 = Date.now(); let ult = 0;
    const paso = () => {
      if (gen !== giroGen) return;
      const t = Math.min(1, (Date.now() - t0) / d), pos = (1 - Math.pow(1 - t, 3)) * fin;
      cinta.style.transform = `translateY(${(-pos / n * 100).toFixed(3)}%)`;
      cinta.classList.toggle('borroso', t < .5);
      if (sonar && Math.floor(pos) !== ult) { ult = Math.floor(pos); SFX.tic(); }
      if (t < 1) cuadro(paso); else { cinta.classList.remove('borroso'); if (cb) cb(); }
    };
    cuadro(paso);
  }
  function luces(n) { LUZ.forEach((c, i) => { const l = $('#lz' + i); if (!l) return; l.classList.toggle('on', i < n); l.style.fill = i < n ? c : ''; l.style.color = c; }); }

  /* ---------- BARRA Y TEMPORIZADORES ---------- */
  const M = () => $('#pantalla');
  let timers = [];
  const T_ = (f, t) => timers.push(setTimeout(f, ms(t)));
  const limpiar = () => { timers.forEach(clearTimeout); timers = []; giroGen++; callarVoz(); };
  function barra(titulo, p) {
    const rev = D.meta.revision;
    return `<div class="barra">${rev ? '<button class="flecha" id="bAnt" aria-label="Anterior">◀</button>' : ''}<div class="b-tit">${titulo}</div><div class="b-pts">⭐ <span id="pts">${S.puntos}</span></div>
      <button class="b-ico" id="bMudo" aria-label="Sonido">${mudo ? '🔇' : '🔊'}</button>${rev ? '<button class="flecha" id="bPos" aria-label="Posterior">▶</button>' : ''}</div>`;
  }
  // al silenciar se corta la voz pero se sigue el juego (cortarVoz avisa que terminó)
  function conBarra() { $('#bMudo').onclick = () => { mudo = !mudo; LSk.set('qst_mudo', mudo ? '1' : '0'); $('#bMudo').textContent = mudo ? '🔇' : '🔊'; if (mudo) cortarVoz(); }; }

  /* ---------- PORTADA ---------- */
  let yaArranco = false;
  function portada() {
    limpiar(); const m = D.meta;
    M().className = 'p-portada';
    M().innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div><h1 class="port-tit">${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <div class="port-escena">${robotHTML()}</div>
      <div class="port-partes">${Object.keys(D.partes).map(k => `<span>${D.partes[k].ico} ${D.partes[k].nombre}</span>`).join('')}</div>
      <div class="port-fila"><button class="btn-jugar" id="bJugar">▶ Comenzar</button>${profeHTML()}</div>
      <button class="btn-oir-port" id="bOirPort">🔊 Escuchar</button>
      <div class="port-fuente">📚 ${m.fuente}<br>© 2026 Gustavo Aguilar · QueSepanTodos.com</div></div>`;
    $('#robot').classList.add('demo');
    let actual = PAL[Math.floor(Math.random() * PAL.length)].k;
    rodar([actual], 1, 0, false);
    const demo = () => { const otras = mezclar(PAL.map(x => x.k).filter(k => k !== actual)).slice(0, 5); rodar([actual, ...otras], 1, 1100, false); actual = otras[4]; T_(demo, 2400); };
    T_(demo, 900);
    $('#robot').onclick = () => { ctx(); SFX.palanca(); };
    $('#bJugar').onclick = () => { ctx(); SFX.clic(); S.colas = null; parte(1); };
    $('#bOirPort').onclick = ev => { ev.stopPropagation(); ctx(); hablar('portada'); };
    activarLightbox();
    // pantalla inicial: el primer toque destraba el sonido del celular y arranca el audio de bienvenida
    if (!yaArranco) {
      const arr = document.createElement('button'); arr.className = 'arranque'; arr.id = 'bArranque';
      arr.innerHTML = '<span class="arr-ico">🔊</span><span>Tocá para empezar</span>';
      $('.portada').appendChild(arr);
      arr.onclick = () => { yaArranco = true; ctx(); arr.remove(); hablar('portada'); };
    }
  }

  /* ---------- EL JUEGO ---------- */
  function preparar() { const ks = mezclar(PAL.map(p => p.k)); S.colas = { 1: ks.slice(0, R), 2: ks.slice(R, 2 * R) }; }
  // 9 opciones: la correcta, hasta 3 que empiezan con la misma letra (así hay que leer toda la palabra) y otras al azar.
  // Nunca van juntas dos palabras con dibujos parecidos (flor y rosa).
  function opciones(meta) {
    const t = POR[meta].t, fuera = new Set([meta]);
    (D.parecidos || []).forEach(g => { if (g.includes(t)) PAL.forEach(p => { if (g.includes(p.t)) fuera.add(p.k); }); });
    // de cada grupo de parecidos entra uno solo
    const grupo = t => (D.parecidos || []).findIndex(g => g.includes(t)), usados = new Set();
    const libres = mezclar(PAL.filter(p => !fuera.has(p.k))).filter(p => { const g = grupo(p.t); if (g < 0) return true; if (usados.has(g)) return false; usados.add(g); return true; });
    const misma = libres.filter(p => p.k[2] === meta[2]).slice(0, 3);
    const resto = libres.filter(p => !misma.includes(p)).slice(0, N - 1 - misma.length);
    return mezclar([meta, ...misma.map(p => p.k), ...resto.map(p => p.k)]);
  }
  function parte(p) {
    limpiar(); if (!S.colas) preparar();
    const P = D.partes[p], cola = S.colas[p];
    M().className = 'p-juego';
    M().innerHTML = barra(`🤖 ${D.meta.titulo}`) + `<div class="juego">
      <div class="cabeza"><div class="parte">${P.ico} Parte ${p} de 2 · ${P.nombre} · <span id="ronda">Ronda 1 de ${R}</span></div>
        <div class="consigna"><span class="c-txt">${P.consigna}</span><button class="oir" id="bOirC" aria-label="Escuchar la consigna">🔊</button></div></div>
      <div class="medio"><div class="lado"><div class="escena">${robotHTML()}</div><div class="cartel" id="cartel"></div></div>
        <div class="grilla" id="grilla"></div></div></div>`;
    conBarra();
    if (D.meta.revision) { $('#bAnt').onclick = () => p === 1 ? portada() : parte(1); $('#bPos').onclick = () => p === 1 ? parte(2) : cierre(); }
    const robot = $('#robot'), cartel = $('#cartel'), grilla = $('#grilla');
    let ronda = 0, estado = 'espera', meta = null, fallas = 0, actual = '?';
    rodar(['?'], p, 0, false); luces(0); tapar();
    const msj = t => { $('#ronda').textContent = `Ronda ${Math.min(ronda + 1, R)} de ${R}`; cartel.innerHTML = `<span class="msj">${t}</span>`; };
    const listo = () => { estado = 'listo'; robot.classList.add('listo'); msj('👆 ¡Tocá el robot!'); };
    msj('🔊 Escuchá la consigna…');
    hablar('i' + p, listo);
    $('#bOirC').onclick = () => { if (estado === 'espera') return; if (estado === 'listo' || estado === 'eligiendo') { SFX.clic(); hablar('i' + p); } };
    function tapar() { grilla.innerHTML = Array.from({ length: N }, () => '<button class="carta tapada" tabindex="-1"></button>').join(''); }
    robot.onclick = () => {
      if (estado !== 'listo') return;
      estado = 'girando'; ctx(); callarVoz();
      meta = cola[ronda]; fallas = 0;
      robot.classList.remove('listo', 'feliz'); robot.classList.add('tirar', 'girando'); $('#ventana').classList.remove('brilla');
      T_(() => robot.classList.remove('tirar'), 650);
      SFX.palanca(); msj(p === 1 ? '🎰 ¡Giran las palabras!' : '🎰 ¡Giran los dibujos!');
      const otras = mezclar(PAL.map(x => x.k).filter(k => k !== meta && k !== actual)).slice(0, 16);
      rodar([actual, ...otras, meta], p, 2300, true, () => {
        actual = meta; robot.classList.remove('girando'); $('#ventana').classList.add('brilla'); SFX.para();
        mostrarOpciones();
      });
    };
    function mostrarOpciones() {
      const ops = opciones(meta);
      grilla.innerHTML = ops.map((k, i) => `<button class="carta da${p === 2 && POR[k].t.length > 7 ? ' largo' : ''}" data-k="${k}" style="animation-delay:${i * 45}ms">${p === 1 ? imagen(k) : `<span class="pal">${POR[k].t}</span>`}</button>`).join('');
      estado = 'eligiendo';
      msj(p === 1 ? '🔎 Leé la palabra y tocá su dibujo.' : '🔎 Mirá el dibujo y tocá su nombre.');
      $$('.carta', grilla).forEach(b => b.onclick = () => elegir(b));
    }
    function elegir(b) {
      if (estado !== 'eligiendo' || b.classList.contains('x')) return;
      const ok = b.dataset.k === meta;
      evaluar('p' + p + '_' + meta, ok);
      if (ok) {
        estado = 'acierto'; b.classList.add('bien');
        $$('.carta', grilla).forEach(x => { if (x !== b) x.classList.add('apagada'); });
        robot.classList.add('feliz'); SFX.bien(); T_(() => SFX.luz(ronda), 180);
        luces(ronda + 1); const l = $('#lz' + ronda); if (l) { l.classList.remove('prende'); void l.getBoundingClientRect(); l.classList.add('prende'); }
        msj(`🌟 ¡Muy bien! <b class="dicho">${POR[meta].t}</b>`);
        hablar(meta, () => T_(() => {
          robot.classList.remove('feliz'); ronda++;
          if (ronda >= R) finParte(); else { tapar(); listo(); }
        }, 450));
      } else {
        fallas++; b.classList.add('x'); sacudir(b); SFX.error();
        msj(fallas >= 2 ? '💡 Mirá la que titila.' : p === 1 ? '🔎 Volvé a leer la palabra del robot.' : '🔎 Leé bien cada palabra.');
        if (fallas >= 2) { const c = grilla.querySelector(`.carta[data-k="${meta}"]`); c.classList.remove('titila'); void c.offsetWidth; c.classList.add('titila'); }
      }
    }
    function finParte() {
      estado = 'fin'; robot.classList.add('fiesta', 'feliz'); SFX.fiesta();
      cartel.innerHTML = `<span class="msj">🎉 ¡Encendiste las ${R} luces!</span><button class="btn-sig late" id="bSig">Siguiente ▶</button>`;
      $('#bSig').onclick = () => { SFX.clic(); if (p === 1) parte(2); else cierre(); };
    }
  }
  function evaluar(clave, ok) {   // vale el primer intento de cada ronda
    if (S.eval[clave] === undefined) { S.eval[clave] = ok; if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto; } else S.errores++; const e = $('#pts'); if (e) e.textContent = S.puntos; }
  }
  const sacudir = el => { el.classList.remove('sac'); void el.offsetWidth; el.classList.add('sac'); };


  function confeti(cv) {
    if (!cv || !cv.getContext) return; const c = cv.getContext('2d'); if (!c) return;
    const r = cv.parentNode.getBoundingClientRect(); cv.width = r.width; cv.height = r.height;
    const P = Array.from({ length: 70 }, () => ({ x: Math.random() * cv.width, y: -Math.random() * cv.height, v: 2 + Math.random() * 3, c: COLORES[Math.floor(Math.random() * 4)], s: 5 + Math.random() * 6 }));
    let n = 0; (function paso() { c.clearRect(0, 0, cv.width, cv.height); P.forEach(p => { p.y += p.v; c.fillStyle = p.c; c.fillRect(p.x, p.y, p.s, p.s * .6); }); if (++n < 140) requestAnimationFrame(paso); else c.clearRect(0, 0, cv.width, cv.height); })();
  }

  /* ---------- CIERRE ---------- */
  function cierre() {
    limpiar();
    const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
    M().className = 'p-cierre';
    M().innerHTML = `<div class="cierre"><canvas id="confeti"></canvas><h1>🌟 ¡Terminaste!</h1><div class="cie-sub">Leíste ${Object.keys(S.eval).length} palabras</div>
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      ${window.QST_SCORM ? '<div class="aula-ok">✅ Tu puntaje ya quedó guardado en el aula</div>' : AULA ? '<button class="btn-aula" id="btnAula">🏫 Entregar en mi aula</button>' : ''}
      <div id="envioLugar"></div>
      <div class="cie-fila"><button class="btn-jugar" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };
    $('#btnOtra').onclick = () => { SFX.clic(); Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: S.intento + 1, colas: null }); portada(); };
    const R0 = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, intento: S.intento, texto: textoAula(pc) };
    const lugar = $('#envioLugar');
    if (window.QSTEnvio) lugar.appendChild(window.QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.grado, aciertos: S.aciertos, errores: S.errores, puntos: S.puntos, intento: S.intento }));
    else { lugar.innerHTML = '<button class="btn-env" id="btnEnviar">📤 Enviar mi tarea a mi docente</button>'; $('#btnEnviar').onclick = () => abrirEnvio(R0); }
    try { if (window.QST_FIN) window.QST_FIN(R0); } catch (e) { }
    const ba = $('#btnAula'); if (ba) ba.onclick = () => { SFX.clic(); abrirAula(R0.texto); };
    activarLightbox(); confeti($('#confeti')); SFX.exito(); hablar('cierre');
  }

  /* ---------- ENTREGA EN EL AULA VIRTUAL (Moodle · Aulas EduTec) ---------- */
  const AULA = (() => { try { const u = new URLSearchParams(location.search).get('aula'); return u && /^https:\/\//i.test(u) ? u : ''; } catch (e) { return ''; } })();
  function textoAula(pc) {
    return `${D.meta.titulo} · ${D.meta.grado}\nAciertos: ${S.aciertos} · Errores: ${S.errores} · Total: ${pc}% · Puntos: ${S.puntos}${S.intento > 1 ? '\nIntento ' + S.intento : ''}\n${fechaHora()} · QueSepanTodos.com`;
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
  window.JUEGO = { S, D, portada, parte, cierre };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
