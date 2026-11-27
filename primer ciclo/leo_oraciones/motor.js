/* ===== MOTOR "LEO ORACIONES" · QueSepanTodos.com =====
   Paquete de lectura de oraciones para 1.° y 2.° grado. Cada pantalla es una página del cuadernillo:
   'unir' (oraciones con su dibujo), 'marca' (una oración por vez y se toca el dibujo correcto) y 'vf' (verdadero o falso).
   La oración no se lee en voz alta antes de responder (es para que la lean los chicos); al acertar, se escucha.
   Un solo reproductor de voz, pantalla inicial «Tocá para empezar», puntaje por primer intento. */
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


  /* ---------- AYUDAS ---------- */
  const mezclar = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // mezcla para que ningún dibujo quede enfrente de su palabra u oración
  const mezclarDistinto = (a, igual) => { for (let k = 0; k < 40; k++) { const m = mezclar(a); if (!m.some((x, i) => igual(x, i))) return m; } return mezclar(a); };
  const ALT = { sirena_mar: '🧜‍♀️🌊', sirena_roca: '🧜‍♀️🪨', sirena_playa: '🧜‍♀️🏖️' };
  const imagen = (k, cls) => `<span class="dib ${cls || ''}"><img src="img/${k}.jpg" alt="" data-alt="${ALT[k] || '🖼️'}" onerror="QSTsinImagen(this)"></span>`;
  window.QSTsinImagen = img => { const s = document.createElement('span'); s.className = 'dib-alt'; s.textContent = img.dataset.alt; img.replaceWith(s); };
  const COLORES = ['#ffb703', '#3a86ff', '#8338ec', '#ef476f'];
  const ANDI = `<svg viewBox="0 0 40 40" class="andi"><circle cx="20" cy="22" r="15" fill="#48cae4" stroke="#0077b6" stroke-width="2"/>
    <path d="M6 18 Q7 4 20 4 Q33 4 34 18 Z" fill="#1d3557"/><rect x="5" y="16" width="30" height="4" rx="2" fill="#e63946"/>
    <circle cx="15" cy="24" r="2.4" fill="#1d1b2f"/><circle cx="25" cy="24" r="2.4" fill="#1d1b2f"/>
    <path d="M15 30 Q20 34 25 30" fill="none" stroke="#1d1b2f" stroke-width="2" stroke-linecap="round"/></svg>`;
  const LIBRO = `<svg viewBox="0 0 220 130" class="libro"><path d="M110 22 Q60 4 12 16 V118 Q60 106 110 122 Z" fill="#fff" stroke="#264653" stroke-width="4" stroke-linejoin="round"/>
    <path d="M110 22 Q160 4 208 16 V118 Q160 106 110 122 Z" fill="#fff" stroke="#264653" stroke-width="4" stroke-linejoin="round"/>
    ${[38, 54, 70, 86].map(y => `<path d="M26 ${y} Q60 ${y - 6} 96 ${y + 2}" stroke="#90a4ae" stroke-width="4" stroke-linecap="round" fill="none"/>`).join('')}
    <circle cx="160" cy="56" r="20" fill="#ffd166" stroke="#f4a261" stroke-width="3"/><path d="M134 100 L152 76 L166 92 L176 82 L192 100 Z" fill="#8bc34a" stroke="#558b2f" stroke-width="3" stroke-linejoin="round"/></svg>`;

  /* ---------- BARRA Y TEMPORIZADORES ---------- */
  const M = () => $('#pantalla');
  let timers = [];
  const T_ = (f, t) => timers.push(setTimeout(f, ms(t)));
  const limpiar = () => { timers.forEach(clearTimeout); timers = []; callarVoz(); };
  function barra(titulo) {
    return `<div class="barra"><div class="b-tit">${titulo}</div><div class="b-pts">⭐ <span id="pts">${S.puntos}</span></div>
      <button class="b-ico" id="bMudo" aria-label="Sonido">${mudo ? '🔇' : '🔊'}</button></div>`;
  }
  function conBarra() { $('#bMudo').onclick = () => { mudo = !mudo; $('#bMudo').textContent = mudo ? '🔇' : '🔊'; if (mudo) callarVoz(); }; }

  /* ---------- PORTADA ---------- */
  function portada() {
    limpiar(); const m = D.meta;
    M().className = 'p-portada';
    M().innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div><h1 class="port-tit">${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <div class="port-escena">${LIBRO}<div class="andi-port">${ANDI}</div></div>
      <div class="port-partes">${Object.keys(D.partes).map(k => `<span>${D.partes[k].ico} ${D.partes[k].nombre}</span>`).join('')}</div>
      <div class="port-fila"><button class="btn-jugar" id="bJugar">▶ Comenzar</button>${profeHTML()}</div>
      <button class="btn-oir-port" id="bOirPort">🔊 Escuchar</button>
      <div class="port-fuente">📚 ${m.fuente}<br>© 2026 Gustavo Aguilar · QueSepanTodos.com</div></div>`;
    $('#bJugar').onclick = () => { ctx(); SFX.clic(); pantalla(0); };
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
  let yaArranco = false;

  /* ---------- PANTALLAS ---------- */
  function pantalla(pi) {
    limpiar();
    const P = D.pantallas[pi], parte = D.partes[P.parte], primera = pi === 0 || D.pantallas[pi - 1].parte !== P.parte;
    const total = D.pantallas.length;
    M().className = 'p-act';
    M().innerHTML = barra(`📖 ${D.meta.titulo}`) + `<div class="act">
      <div class="cabeza"><div class="parte">${parte.ico} Parte ${P.parte} · ${parte.nombre}</div>
        <div class="consigna"><span class="c-txt">${parte.consigna}</span><button class="oir" id="bOirC" aria-label="Escuchar la consigna">🔊</button></div></div>
      <div class="zona" id="zona"></div>
      <div class="pie"><button class="flecha${D.meta.revision ? '' : ' oculta'}" id="bAnt" aria-label="Anterior">◀</button>
        <div class="avance"><div class="av-txt">Pantalla ${pi + 1} de ${total}</div><div class="av-barra"><i style="width:${Math.round((pi + 1) / total * 100)}%"></i></div></div>
        <button class="btn-sig" id="bSig" disabled>Siguiente ▶</button>
        <button class="flecha${D.meta.revision ? '' : ' oculta'}" id="bPos" aria-label="Posterior">▶</button></div></div>`;
    conBarra();
    const zona = $('#zona'), bSig = $('#bSig');
    let bloqueo = true, hechos = 0;
    const N = P.items.length;
    // la consigna se escucha completa en la primera pantalla de cada parte; mientras suena, no se puede tocar
    const destrabar = () => { bloqueo = false; zona.classList.remove('espera'); };
    zona.classList.add('espera');
    if (primera) hablar('i' + P.parte, destrabar); else T_(destrabar, 200);
    $('#bOirC').onclick = () => { SFX.clic(); hablar('i' + P.parte); };
    $('#bAnt').onclick = () => { if (pi > 0) pantalla(pi - 1); else portada(); };
    $('#bPos').onclick = () => { if (pi < total - 1) pantalla(pi + 1); else cierre(); };
    bSig.onclick = () => { if (bSig.disabled) return; SFX.clic(); if (pi < total - 1) pantalla(pi + 1); else cierre(); };
    function evaluar(clave, ok) {   // vale el primer intento de cada oración
      if (S.eval[clave] === undefined) { S.eval[clave] = ok; if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto; } else S.errores++; $('#pts').textContent = S.puntos; }
    }
    function terminar() {   // pantalla completa: Siguiente se habilita cuando termina el último audio
      const fin = document.createElement('div'); fin.className = 'listo'; fin.innerHTML = '🌟 ¡Muy bien! Tocá <b>Siguiente</b>.'; zona.appendChild(fin);
      bSig.disabled = false; bSig.classList.add('late');
    }
    const sacudir = el => { el.classList.remove('sac'); void el.offsetWidth; el.classList.add('sac'); };

    if (P.tipo === 'unir') {
      // oraciones a la izquierda, dibujos (mezclados) a la derecha: se toca la oración y después el dibujo (o al revés)
      const dibs = mezclarDistinto(P.items.map(x => x.img), (x, i) => x === P.items[i].img);
      zona.innerHTML = `<div class="unir"><div class="u-col">${P.items.map(it => `<button class="u-or" data-id="${it.id}"><span class="u-pin"></span><span class="or">${it.t}</span></button>`).join('')}</div>
        <div class="u-col u-dibs">${dibs.map(k => `<button class="u-dib" data-k="${k}">${imagen(k)}<span class="u-pin"></span></button>`).join('')}</div></div>`;
      let selO = null, selD = null; const fallas = {}; let color = 0;
      const limpiarSel = () => { $$('.sel', zona).forEach(x => x.classList.remove('sel')); selO = selD = null; };
      const probar = () => {
        if (!selO || !selD) return;
        const it = P.items.find(x => x.id === selO.dataset.id), ok = it.img === selD.dataset.k, o = selO, d = selD;
        evaluar(it.id, ok); limpiarSel();
        if (ok) {
          const c = COLORES[color++ % COLORES.length];
          [o, d].forEach(x => { x.classList.add('hecho'); x.style.setProperty('--c', c); });
          SFX.bien(); hechos++; bloqueo = true;
          hablar(it.id, () => { bloqueo = false; if (hechos >= N) terminar(); });
        } else {
          SFX.error(); [o, d].forEach(sacudir);
          fallas[it.id] = (fallas[it.id] || 0) + 1;
          aviso(fallas[it.id] >= 2 ? '💡 Mirá el dibujo que titila.' : '🔎 Volvé a leer la oración y probá con otro dibujo.');
          if (fallas[it.id] >= 2) { const b = zona.querySelector(`.u-dib[data-k="${it.img}"]`); b.classList.add('titila'); T_(() => b.classList.remove('titila'), 2600); }
        }
      };
      $$('.u-or', zona).forEach(b => b.onclick = () => { if (bloqueo || b.classList.contains('hecho')) return; SFX.clic(); $$('.u-or.sel', zona).forEach(x => x.classList.remove('sel')); selO = b; b.classList.add('sel'); probar(); });
      $$('.u-dib', zona).forEach(b => b.onclick = () => { if (bloqueo || b.classList.contains('hecho')) return; SFX.clic(); $$('.u-dib.sel', zona).forEach(x => x.classList.remove('sel')); selD = b; b.classList.add('sel'); probar(); });
    } else {
      // de a una oración por vez, en el mismo lugar
      let qi = 0;
      zona.innerHTML = `<div class="una"><div class="puntos">${P.items.map((_, i) => `<i data-i="${i}"></i>`).join('')}</div><div id="item" class="item"></div><div class="pv" id="pv"></div></div>`;
      const mostrar = () => {
        const it = P.items[qi]; let fallas = 0;
        $$('.puntos i', zona).forEach((x, i) => { x.className = i < qi ? 'ok' : i === qi ? 'ahora' : ''; });
        $('#pv').innerHTML = '';
        const el = $('#item'); delete el.dataset.listo;
        if (P.tipo === 'marca') {
          const ops = mezclar(it.ops);
          el.innerHTML = `<div class="oracion">${it.t}</div><div class="ops n${ops.length}">${ops.map(k => `<button class="op" data-k="${k}">${imagen(k)}</button>`).join('')}</div>`;
          $$('.op', el).forEach(b => b.onclick = () => {
            if (bloqueo || b.classList.contains('x') || el.dataset.listo) return;
            const ok = b.dataset.k === it.ok; evaluar(it.id, ok);
            if (ok) { el.dataset.listo = 1; b.classList.add('bien'); $$('.op', el).forEach(x => { if (x !== b) x.classList.add('apagada'); }); responder(it); }
            else { fallas++; b.classList.add('x'); sacudir(b); SFX.error(); aviso(fallas >= 2 ? '💡 Mirá el dibujo que titila.' : '🔎 Volvé a leer la oración. ¿Qué dice?');
              if (fallas >= 2) $$('.op', el).forEach(x => { if (x.dataset.k === it.ok) x.classList.add('titila'); }); }
          });
        } else {
          el.innerHTML = `<div class="vf-dib">${imagen(it.img)}</div><div class="oracion">${it.t}</div>
            <div class="vf-bots"><button class="vf v" data-v="1">✔ Verdadero</button><button class="vf f" data-v="0">✘ Falso</button></div>`;
          $$('.vf', el).forEach(b => b.onclick = () => {
            if (bloqueo || b.classList.contains('x') || el.dataset.listo) return;
            const ok = (b.dataset.v === '1') === it.v; evaluar(it.id, ok);
            if (ok) { el.dataset.listo = 1; b.classList.add('bien'); $$('.vf', el).forEach(x => { if (x !== b) x.classList.add('apagada'); }); $('#pv').innerHTML = `<div class="explica">${it.ex}</div>`; responder(it); }
            else { b.classList.add('x'); sacudir(b); SFX.error(); aviso('🔎 Mirá bien el dibujo y volvé a leer la oración.'); }
          });
        }
        el.classList.remove('entra'); void el.offsetWidth; el.classList.add('entra');
      };
      const responder = it => {
        SFX.bien(); bloqueo = true; hechos++;
        hablar(it.id, () => T_(() => {
          bloqueo = false;
          if (hechos >= N) { $$('.puntos i', zona).forEach(x => x.className = 'ok'); terminar(); }
          else { qi++; mostrar(); }
        }, 500));
      };
      mostrar();
    }
    function aviso(t) { let pv = $('#pv'); if (!pv) { pv = document.createElement('div'); pv.className = 'pv'; pv.id = 'pv'; zona.appendChild(pv); } pv.innerHTML = `<div class="pv-txt">${t}</div>`; }
  }

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
    M().innerHTML = `<div class="cierre"><canvas id="confeti"></canvas><h1>🌟 ¡Terminaste!</h1><div class="cie-sub">Leíste ${Object.keys(S.eval).length} oraciones</div>
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      ${window.QST_SCORM ? '<div class="aula-ok">✅ Tu puntaje ya quedó guardado en el aula</div>' : AULA ? '<button class="btn-aula" id="btnAula">🏫 Entregar en mi aula</button>' : ''}
      <div id="envioLugar"></div>
      <div class="cie-fila"><button class="btn-jugar" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };
    $('#btnOtra').onclick = () => { SFX.clic(); Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, intento: S.intento + 1 }); portada(); };
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
  window.JUEGO = { S, D, portada, pantalla, cierre };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
