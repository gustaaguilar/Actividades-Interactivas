/* ===== MOTOR DE JUEGO "EL DADO DE LAS CONSTELACIONES" · QueSepanTodos.com =====
   Matemática · Nivel Inicial (sala de 5). Se toca el dado, gira y cae en una cara con su constelación;
   el chico pinta en la grilla la misma cantidad de puntitos y toca «Listo». Si está bien, los puntitos
   quedan encerrados con un color y se vuelve a tirar, hasta completar la grilla entera.
   El dado nunca saca más de lo que queda por pintar. Puntaje por primer intento de cada tirada.
   Un solo reproductor de voz (para que no quede mudo en celulares) y sonidos sintetizados. */
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
  const MAXPINTA = 9;   // se puede pintar de más (hasta 9) para que el error sea posible; «Listo» controla

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
    dado: () => { for (let i = 0; i < 9; i++) { const t = i * 0.13 + i * i * 0.004; ruido(t, .06, .35, 3500, 1200); tono(300 + Math.random() * 300, t, .04, 'square', .04); } ruido(1.25, .12, .35, 1200, 400); },
    pinta: n => tono(392 * Math.pow(2, (Math.min(n, 9) * 2) / 12), 0, .12, 'triangle', .12),
    despinta: () => tono(330, 0, .1, 'triangle', .08, 220),
    error: () => { tono(330, 0, .18, 'triangle', .1); tono(262, .18, .3, 'triangle', .1, 220); },
    tope: () => tono(160, 0, .15, 'square', .06),
    encierra: () => { tono(523, 0, .1, 'triangle', .1); tono(659, .08, .1, 'triangle', .1); tono(784, .16, .22, 'triangle', .1); ruido(0, .3, .12, 6000, 2000); },
    combo: n => { [0, 4, 7, 12].slice(0, Math.min(4, n)).forEach((s, i) => tono(523 * Math.pow(2, s / 12), i * .07, .12, 'triangle', .1)); },
    exito: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tono(f, i * .12, .2, 'square', .09)),
    casi: () => { tono(392, 0, .3, 'sawtooth', .06, 370); tono(370, .32, .3, 'sawtooth', .06, 349); tono(349, .64, .6, 'sawtooth', .06, 300); },
    trofeo: i => tono(880 + i * 220, 0, .2, 'triangle', .12),
    clic: () => tono(660, 0, .05, 'square', .05),
    brillo: k => tono(784 + k * 90, 0, .08, 'sine', .07)
  };

  /* ---------- VOZ (mp3 opcionales: si faltan, el juego sigue sin voz) ---------- */
  // SIEMPRE el mismo reproductor: los celulares solo dejan sonar audio en un reproductor ya «destrabado» por un toque.
  let voz = null, vozFin = null, vozGen = 0;
  const reproductor = () => { if (!voz) { try { voz = new Audio(); voz.preload = 'auto'; } catch (e) { voz = null; } } return voz; };
  function hablar(k, cb) {
    const gen = ++vozGen, el = reproductor();
    try { if (el) { el.onended = null; el.onerror = null; el.pause(); } } catch (e) { }
    vozFin = null;
    if (mudo || !k || window.__RAPIDO || !el) { if (cb) setTimeout(cb, 0); return; }
    let listo = false; const fin = () => { if (listo || gen !== vozGen) return; listo = true; vozFin = null; if (cb) cb(); };
    vozFin = fin; el.onended = fin; el.onerror = fin;
    el.src = (window.QST_AUDIO && window.QST_AUDIO[k]) || ('audio/' + k + '.mp3');
    const p = el.play(); if (p && p.catch) p.catch(fin);
    setTimeout(fin, 15000);   // por las dudas, si el audio nunca avisa que terminó
  }
  function callarVoz() { vozGen++; vozFin = null; try { if (voz) { voz.onended = null; voz.onerror = null; voz.pause(); } } catch (e) { } }
  function cortarVoz() { try { if (voz) voz.pause(); } catch (e) { } const f = vozFin; if (f) f(); }

  /* ---------- EL DADO ---------- */
  // posición de los puntos de cada constelación en una cuadrícula de 3 × 3 (columna, fila), como el dado de la sala
  const CONST = {
    1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[2, 0], [1, 1], [0, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]],
    5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]]
  };
  // dónde va cada cara en el cubo (opuestas suman 7) y cómo se gira el cubo para que quede de frente
  const CARA = { 1: 'rotateY(0deg)', 6: 'rotateY(180deg)', 3: 'rotateY(90deg)', 4: 'rotateY(-90deg)', 2: 'rotateX(90deg)', 5: 'rotateX(-90deg)' };
  const MIRA = { 1: [0, 0], 6: [0, 180], 3: [0, -90], 4: [0, 90], 2: [-90, 0], 5: [90, 0] };
  function caraHTML(n) {
    return `<div class="cara" data-n="${n}">${CONST[n].map(([c, f]) => `<i class="pto" style="left:${11 + c * 28}%;top:${11 + f * 28}%;background:${D.colores[n]}"></i>`).join('')}</div>`;
  }
  const dadoHTML = (id, cls) => `<div class="dado-esc ${cls || ''}" ${id ? `id="${id}"` : ''}><div class="dado">${[1, 2, 3, 4, 5, 6].map(caraHTML).join('')}</div></div>`;
  // ubica las caras según el tamaño real del dado (en px, para navegadores viejos)
  function armarDado(esc) {
    if (!esc) return; const d = $('.dado', esc), s = d.offsetWidth || 120;
    $$('.cara', d).forEach(c => { c.style.transform = CARA[c.dataset.n] + ` translateZ(${s / 2}px)`; });
  }
  const giro = { x: 0, y: 0 };
  function ponerDado(d, n, animar) {
    const [a, b] = MIRA[n];
    if (animar) { giro.x = Math.ceil(giro.x / 360) * 360 + 720 + a; giro.y = Math.ceil(giro.y / 360) * 360 + 1080 + b; }
    else { giro.x = a; giro.y = b; }
    d.style.transition = animar ? `transform ${ms(1400)}ms cubic-bezier(.15,.75,.25,1)` : 'none';
    d.style.transform = `translateZ(${-(d.offsetWidth || 120) / 2}px) rotateX(${giro.x}deg) rotateY(${giro.y}deg)`;
  }

  /* ---------- GRILLA DE PUNTITOS ---------- */
  const CEL = 100, R = 23;
  function grillaSVG(N) {
    const W = N.cols * CEL, H = N.filas * CEL;
    let celdas = '';
    for (let i = 0; i < N.cols * N.filas; i++) {
      const cx = (i % N.cols) * CEL + CEL / 2, cy = Math.floor(i / N.cols) * CEL + CEL / 2;
      celdas += `<g class="celda" data-i="${i}"><rect x="${cx - CEL / 2}" y="${cy - CEL / 2}" width="${CEL}" height="${CEL}" fill="transparent"/><circle class="punto" cx="${cx}" cy="${cy}" r="${R}"/></g>`;
    }
    return `<svg class="grilla" viewBox="-12 -12 ${W + 24} ${H + 24}" preserveAspectRatio="xMidYMid meet">
      <rect x="-10" y="-10" width="${W + 20}" height="${H + 20}" rx="18" class="hoja"/>
      <g id="encierros"></g><g id="celdas">${celdas}</g></svg>`;
  }
  const centro = (N, i) => [(i % N.cols) * CEL + CEL / 2, Math.floor(i / N.cols) * CEL + CEL / 2];
  // dibuja el encierro: une los puntitos del grupo con un «óvalo» de color (árbol de distancias mínimas)
  function encierro(N, idx, color) {
    const P = idx.map(i => centro(N, i)), en = [0], aristas = [];
    while (en.length < P.length) {
      let mejor = null;
      en.forEach(a => P.forEach((p, b) => { if (en.includes(b)) return; const d = Math.hypot(p[0] - P[a][0], p[1] - P[a][1]); if (!mejor || d < mejor.d) mejor = { a, b, d }; }));
      en.push(mejor.b); aristas.push([P[mejor.a], P[mejor.b]]);
    }
    // también se unen todos los vecinos de al lado, y los bloques de 2 × 2 se rellenan (queda un óvalo parejo)
    idx.forEach((i, a) => idx.forEach((j, b) => { if (b > a && Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]) <= CEL + 1) aristas.push([P[a], P[b]]); }));
    const cuad = idx.filter(i => i % N.cols < N.cols - 1 && [i + 1, i + N.cols, i + N.cols + 1].every(j => idx.includes(j))).map(i => centro(N, i));
    const forma = (w, r) => cuad.map(([x, y]) => `<rect x="${x}" y="${y}" width="${CEL}" height="${CEL}"/>`).join('') + P.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="${r}"/>`).join('') + aristas.map(([p, q]) => `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke-width="${w}" stroke-linecap="round"/>`).join('');
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'enc');
    g.innerHTML = `<g fill="${color}" stroke="${color}">${forma(80, 40)}</g><g fill="#fffdf6" stroke="#fffdf6">${forma(66, 33)}</g><g fill="${color}" stroke="${color}" opacity=".22">${forma(66, 33)}</g>`;
    return g;
  }

  /* ---------- BARRA ---------- */
  const M = () => $('#pantalla');
  let timers = [];
  const T_ = (f, t) => timers.push(setTimeout(f, ms(t)));
  const limpiar = () => { timers.forEach(clearTimeout); timers = []; callarVoz(); const m = $('#manito'); if (m) m.className = ''; };
  function barra(titulo) {
    return `<header class="barra"><div class="b-tit">${titulo}</div><div class="b-pts">⭐ <b id="pts">${S.puntos}</b></div>
      <button class="b-ico" id="bOir" aria-label="Escuchar la consigna">🔁</button>
      <button class="b-ico" id="bMudo" aria-label="Sonido">${mudo ? '🔇' : '🔊'}</button></header>`;
  }
  function conBarra(oir) {
    const bm = $('#bMudo'); if (bm) bm.onclick = () => { mudo = !mudo; LSk.set('qst_mudo', mudo ? '1' : '0'); bm.textContent = mudo ? '🔇' : '🔊'; if (mudo) cortarVoz(); };
    const bo = $('#bOir'); if (bo) bo.onclick = () => { ctx(); oir(); };
  }
  // la manito que señala (el dado, o cada puntito del dado al contar)
  function manitoA(el) {
    const m = $('#manito'); if (!m || !el) return;
    const r = el.getBoundingClientRect();
    m.style.left = (r.left + r.width / 2) + 'px'; m.style.top = (r.top + r.height / 2) + 'px'; m.className = 'ver';
  }
  const sinManito = () => { const m = $('#manito'); if (m) m.className = ''; };

  /* ---------- PORTADA ---------- */
  function portada() {
    limpiar(); const m = D.meta;
    M().className = 'p-portada';
    M().innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div><h1 class="port-tit">${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <div class="port-escena">${dadoHTML('dadoPort', 'gira')}<div class="port-hoja">${grillaSVG({ cols: 4, filas: 3 })}</div></div>
      <button class="btn-jugar" id="bJugar">▶ ¡A jugar!</button>
      <button class="btn-oir-port" id="bOirPort">🔊 Escuchar</button>
      ${profeHTML()}<div class="port-fuente">🎲 ${m.fuente}<br>© 2026 Gustavo Aguilar · QueSepanTodos.com</div></div>`;
    armarDado($('#dadoPort'));
    // muestra de la hoja: dos grupos ya encerrados
    const N = { cols: 4, filas: 3 }, enc = $('.port-hoja #encierros');
    [[[0, 1, 4], '#e63946'], [[3, 7, 11], '#3a86ff'], [[9, 10], '#2a9d8f']].forEach(([idx, c]) => { enc.appendChild(encierro(N, idx, c)); idx.forEach(i => { const p = $(`.port-hoja .celda[data-i="${i}"] .punto`); p.style.fill = c; }); });
    $('#bJugar').onclick = () => { ctx(); SFX.clic(); jugar(0); };
    $('#bOirPort').onclick = ev => { ev.stopPropagation(); ctx(); hablar('portada'); };
    activarLightbox();
    // cartel inicial: el primer toque destraba el sonido del celular y arranca el audio de bienvenida
    if (!S.arrancado) {
      const arr = document.createElement('button'); arr.className = 'arranque'; arr.id = 'bArranque';
      arr.innerHTML = '<span class="arr-ico">🔊</span><span>Tocá para empezar</span>';
      $('.portada').appendChild(arr);
      arr.onclick = () => { S.arrancado = true; ctx(); arr.remove(); hablar('portada'); };
    }
  }

  /* ---------- EL JUEGO ---------- */
  function jugar(ni) {
    limpiar();
    const N = D.niveles[ni], TOTAL = N.cols * N.filas;
    const cel = Array.from({ length: TOTAL }, () => ({ e: 'vacio' }));   // vacio | act (pintado ahora) | hecho (encerrado)
    let fase = 'tirar', valor = 0, sel = [], turno = 0, errN = 0, okN = 0, combo = 0, bloqueo = true, ultimaVoz = 't' + N.id;
    M().className = 'p-jugar';
    M().innerHTML = barra(`🎲 ${N.nombre} · ${TOTAL} puntitos`) + `<div class="juego">
      <div class="zona-dado">
        <div class="dado-caja">${dadoHTML('dadoJ')}<div class="dado-tx" id="dadoTx"></div></div>
        <div class="lado">
          <div class="cuenta-pint" id="cuentaP"></div>
          <button class="btn-listo" id="bListo" disabled>✋ ¡Listo!</button>
          <div class="progreso"><div class="prog-barra"><i id="progI"></i></div><span id="progT"></span></div>
        </div>
      </div>
      <div class="zona-grilla" id="zonaG">${grillaSVG(N)}</div>
      <div class="pista" id="pista"></div>
      <div class="modal" id="modal"></div></div>`;
    conBarra(() => hablar(ultimaVoz));
    const esc = $('#dadoJ'), dado = $('.dado', esc), bListo = $('#bListo');
    armarDado(esc); ponerDado(dado, 1 + Math.floor(Math.random() * 6), false);
    const alCambiar = () => { armarDado(esc); ponerDado(dado, valor || 1, false); }; window.addEventListener('resize', alCambiar);
    const vacios = () => cel.filter(c => c.e === 'vacio').length;
    const color = () => D.encierros[turno % D.encierros.length];
    function hud() {
      const hechos = cel.filter(c => c.e === 'hecho').length;
      $('#progI').style.width = (hechos / TOTAL * 100) + '%'; $('#progT').textContent = `${hechos} de ${TOTAL}`;
      $('#cuentaP').innerHTML = fase === 'pintar' ? `<span class="cp-num">${sel.length}</span><span class="cp-tx">pintados</span>` : '';
      bListo.disabled = !(fase === 'pintar' && sel.length > 0);
    }
    function pintarCelda(i) {
      const c = cel[i], p = $(`#celdas .celda[data-i="${i}"] .punto`);
      p.setAttribute('class', 'punto ' + c.e + (c.e === 'act' ? ' nuevo' : ''));
      p.style.fill = c.e === 'vacio' ? '' : c.color;
    }
    function evaluar(clave, ok) {   // vale el primer intento de cada tirada
      if (S.eval[clave] === undefined) { S.eval[clave] = ok; if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto; } else { S.errores++; errN++; } $('#pts').textContent = S.puntos; }
    }
    const pista = t => { $('#pista').innerHTML = t ? `<span>${t}</span>` : ''; };

    // ----- turno: tirar el dado -----
    function nuevoTurno(primero) {
      fase = 'tirar'; sel = []; valor = 0; bloqueo = false; hud(); pista('');
      esc.classList.add('tocame'); $('#dadoTx').textContent = '👆 Tocá el dado';
      T_(() => manitoA(esc), 300);
      ultimaVoz = primero ? 't' + N.id : 'tira';
      hablar(ultimaVoz);
    }
    esc.onclick = () => {
      if (fase !== 'tirar' || bloqueo) return;
      fase = 'rodando'; bloqueo = true; ctx(); callarVoz(); sinManito();
      esc.classList.remove('tocame'); $('#dadoTx').textContent = '';
      // el dado nunca saca más puntitos de los que quedan por pintar
      valor = 1 + Math.floor(Math.random() * Math.min(6, vacios())); esc.dataset.valor = valor;
      esc.classList.add('rueda'); SFX.dado(); ponerDado(dado, valor, true);
      T_(() => { esc.classList.remove('rueda'); llego(); }, 1450);
    };
    function llego() {
      // los puntitos de la cara brillan uno por uno
      const ptos = $$(`.cara[data-n="${valor}"] .pto`, dado);
      ptos.forEach((p, k) => T_(() => { p.classList.add('brilla'); SFX.brillo(k); }, k * 160));
      $('#dadoTx').textContent = '🎨 Pintá los puntitos';
      fase = 'pintar'; turno++; hud();
      ultimaVoz = 's' + valor;
      hablar(ultimaVoz, () => { if (fase === 'pintar') bloqueo = false; });
      T_(() => ptos.forEach(p => p.classList.remove('brilla')), ptos.length * 160 + 900);
    }

    // ----- pintar y despintar puntitos -----
    $$('#celdas .celda').forEach(g => g.onclick = () => {
      if (fase !== 'pintar' || bloqueo) return;
      const i = +g.dataset.i, c = cel[i];
      if (c.e === 'hecho') { SFX.tope(); return; }
      if (c.e === 'act') {   // tocar uno pintado lo despinta
        c.e = 'vacio'; sel = sel.filter(x => x !== i); pintarCelda(i); SFX.despinta(); hud(); return;
      }
      if (sel.length >= MAXPINTA) { SFX.tope(); return; }
      c.e = 'act'; c.color = color(); sel.push(i); pintarCelda(i);
      SFX.pinta(sel.length); hablar('n' + sel.length); hud(); pista('');
    });

    // ----- «Listo»: se controla la cantidad -----
    bListo.onclick = () => {
      if (fase !== 'pintar' || bloqueo || !sel.length) return;
      SFX.clic(); callarVoz();
      const clave = N.id + ':' + turno;
      if (sel.length === valor) {
        evaluar(clave, true); okN++; combo++; bloqueo = true; fase = 'encerrando'; hud();
        const g = encierro(N, sel, color()); $('#encierros').appendChild(g);
        sel.forEach(i => { cel[i].e = 'hecho'; pintarCelda(i); });
        SFX.encierra(); if (combo >= 3) T_(() => SFX.combo(combo - 1), 300);
        $('#dadoTx').textContent = combo >= 3 ? `🔥 ¡${combo} seguidas!` : '⭐ ¡Muy bien!';
        sel = []; hud();
        hablar('b' + valor, () => T_(() => { if (!vacios()) completo(); else nuevoTurno(false); }, 400));
      } else {
        evaluar(clave, false); combo = 0; bloqueo = true; SFX.error();
        const falta = sel.length < valor;
        esc.classList.remove('sacude'); void esc.offsetWidth; esc.classList.add('sacude');
        pista(falta ? `💡 Te faltan puntitos. Mirá el dado: ¿cuántos tiene?` : `💡 Pintaste de más. Tocá un puntito pintado para despintarlo.`);
        hablar(falta ? 'falta' : 'sobra', () => contarDado(() => { bloqueo = false; }));
      }
    };
    // la manito recorre los puntitos del dado mientras la voz cuenta «uno, dos, tres…»
    function contarDado(fin) {
      const ptos = $$(`.cara[data-n="${valor}"] .pto`, dado); let k = 0;
      const paso = () => {
        if (k > 0) ptos[k - 1].classList.remove('brilla');
        if (k >= ptos.length) { sinManito(); fin(); return; }
        const p = ptos[k]; manitoA(p); p.classList.add('brilla'); SFX.brillo(k); k++;
        let ok = false; const sig = () => { if (ok) return; ok = true; T_(paso, 250); };
        hablar('n' + k, sig);
      };
      paso();
    }

    // ----- grilla completa -----
    function completo() {
      fase = 'fin'; bloqueo = true; window.removeEventListener('resize', alCambiar);
      $('#dadoTx').textContent = '🏁 ¡Grilla completa!'; $('#zonaG').classList.add('festeja');
      SFX.exito(); T_(premio, 1300);
    }
    function premio() {
      const tr = trofeoDe(errN), ultimo = ni === D.niveles.length - 1;
      S.hechos[N.id] = tr;
      const md = $('#modal'), t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
      md.innerHTML = `<div class="m-caja"><canvas id="confeti"></canvas>
        <div class="m-tit">${N.ico} ¡Completaste la grilla de ${TOTAL} puntitos!</div>
        <div class="m-pts">🎲 ${turno} tiradas</div>
        <div class="m-alt">${errN === 0 ? 'sin errores' : errN === 1 ? '1 error' : errN + ' errores'}</div>
        <div class="m-tro"><span class="tro on gana">${TROFEOS[tr - 1].e}</span><span class="tro-nom">¡Trofeo de ${TROFEOS[tr - 1].n}!</span></div>
        <div class="m-cuenta"><small>Mis trofeos</small>${D.niveles.map(X => S.hechos[X.id] ? `<span class="${X.id === N.id ? 'nuevo' : ''}">${TROFEOS[S.hechos[X.id] - 1].e}</span>` : '<span class="vacio"></span>').join('')}</div>
        <div class="m-total">Total: ✅ ${S.aciertos} · ❌ ${S.errores} · 📊 ${pc}% · ⭐ ${S.puntos}</div>
        <div class="m-bots">${ultimo ? '<button class="btn-jugar" id="bSig">🏁 Ver mis resultados</button>' : '<button class="btn-jugar" id="bSig">▶ Siguiente nivel</button>'}</div></div>`;
      md.classList.add('ver'); confeti($('#confeti'));
      if (errN <= 2) SFX.exito(); else SFX.casi();
      T_(() => SFX.trofeo(tr - 1), 300); T_(() => SFX.trofeo(tr), 750);
      const bot = $('#bSig'); bot.disabled = true; bot.classList.add('espera');
      hablar('l' + N.id, () => hablar('tr' + tr, () => { bot.disabled = false; bot.classList.remove('espera'); }));
      bot.onclick = () => { if (bot.disabled) return; SFX.clic(); if (ultimo) cierre(); else jugar(ni + 1); };
    }

    // largada
    hud();
    T_(() => nuevoTurno(true), 300);
  }

  function confeti(cv) {
    if (!cv || !cv.getContext) return; let x = null; try { x = cv.getContext('2d'); } catch (e) { } if (!x) return;
    const W = cv.width = cv.offsetWidth || 320, H = cv.height = cv.offsetHeight || 300, col = ['#e63946', '#ffb703', '#2a9d8f', '#3a86ff', '#8338ec', '#fb8500'];
    const P = Array.from({ length: 70 }, () => ({ x: W / 2, y: H * .3, vx: (Math.random() - .5) * 9, vy: -Math.random() * 8 - 2, r: Math.random() * 6, c: col[Math.floor(Math.random() * 6)], g: .2 + Math.random() * .1 }));
    let t = 0; (function f() { x.clearRect(0, 0, W, H); P.forEach(p => { p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += .2; x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c; x.fillRect(-4, -2, 8, 4); x.restore(); }); if (++t < 110) requestAnimationFrame(f); else x.clearRect(0, 0, W, H); })();
  }

  /* ---------- CIERRE ---------- */
  function cierre() {
    limpiar();
    const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
    M().className = 'p-cierre';
    M().innerHTML = `<div class="cierre"><h1>🎲 ¡Terminaste el juego!</h1>
      <div class="trofeos-f">${D.niveles.map(N => { const tr = S.hechos[N.id] || 0; return `<div>${tr ? TROFEOS[tr - 1].e : '❔'}<small>${N.nombre} · ${N.cols * N.filas} puntitos</small></div>`; }).join('')}</div>
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      ${window.QST_SCORM ? '<div class="aula-ok">✅ Tu puntaje ya quedó guardado en el aula</div>' : AULA ? '<button class="btn-aula" id="btnAula">🏫 Entregar en mi aula</button>' : ''}
      <div id="envioLugar"></div>
      <div class="cie-fila"><button class="btn-jugar" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };
    $('#btnOtra').onclick = () => { SFX.clic(); Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: S.intento + 1, hechos: {} }); portada(); };
    const R0 = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, intento: S.intento, texto: textoAula(pc) };
    // botón de envío: módulo compartido del sitio; si no está, el propio del juego (mismos campos)
    const lugar = $('#envioLugar');
    if (window.QSTEnvio) lugar.appendChild(window.QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.grado, aciertos: S.aciertos, errores: S.errores, puntos: S.puntos, intento: S.intento }));
    else { lugar.innerHTML = '<button class="btn-env" id="btnEnviar">📤 Enviar mi tarea a mi docente</button>'; $('#btnEnviar').onclick = () => abrirEnvio(R0); }
    try { if (window.QST_FIN) window.QST_FIN(R0); } catch (e) { }
    const ba = $('#btnAula'); if (ba) ba.onclick = () => { SFX.clic(); abrirAula(R0.texto); };
    activarLightbox(); SFX.exito(); hablar('cierre');
  }
  function textoAula(pc) {
    const tro = D.niveles.map(N => { const tr = S.hechos[N.id] || 0; return `${N.nombre}: ${tr ? 'trofeo de ' + TROFEOS[tr - 1].n : 'sin completar'}`; }).join(' · ');
    return `${D.meta.titulo} · ${D.meta.subtitulo}\nAciertos: ${S.aciertos} · Errores: ${S.errores} · Total: ${pc}% · Puntos: ${S.puntos}\nTrofeos: ${tro}${S.intento > 1 ? '\nIntento ' + S.intento : ''}\n${fechaHora()} · QueSepanTodos.com`;
  }

  /* ---------- ENTREGA EN EL AULA VIRTUAL (Moodle · Aulas EduTec) ---------- */
  const AULA = (() => { try { const u = new URLSearchParams(location.search).get('aula'); return u && /^https:\/\//i.test(u) ? u : ''; } catch (e) { return ''; } })();
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
      <label>Curso<input id="enCur" maxlength="20" placeholder="ej.: sala de 5 A" value="${escH(g.curso)}"></label>
      <label>Nombre y apellido del docente (opcional)<input id="enDoc" maxlength="45" value="${escH(g.docente)}"></label>
      <div class="envio-msj" id="enMsj"></div>
      <button class="btn enviar" id="enOk">📤 Enviar</button></div>`;
    m.classList.add('ver');
    $('.envio-x', m).onclick = () => m.classList.remove('ver');
    $('#enOk').onclick = () => {
      const d = { estudiante: $('#enNom').value.replace(/\s+/g, ' ').trim(), curso: $('#enCur').value.replace(/\s+/g, ' ').trim(), docente: $('#enDoc').value.replace(/\s+/g, ' ').trim() };
      if (!d.estudiante) { $('#enMsj').textContent = '✏️ Escribí tu nombre y apellido, así tu docente sabe que es tuyo.'; $('#enNom').focus(); return; }
      if (!d.curso) { $('#enMsj').textContent = '✏️ Falta tu curso (por ejemplo: sala de 5 A).'; $('#enCur').focus(); return; }
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
  window.JUEGO = { S, D, portada, jugar, cierre, CONST };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
