/* motor.js — QueSepanTodos · Artes Visuales
   Mecánicas: narracion, pasos, clasificarUno, cualDestaca, vf, tallerLuz,
   foto, autoeval, portada, cierre. */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const f1 = n => Math.round(n * 10) / 10;
  function poly(pts) { let a = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; } if (a < 0) pts = pts.slice().reverse(); return 'M' + pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L') + 'Z'; }
  function circ(cx, cy, r) { return `M${cx - r} ${cy}A${r} ${r} 0 1 1 ${cx + r} ${cy}A${r} ${r} 0 1 1 ${cx - r} ${cy}Z`; }
  function puntosEstrella(cx, cy, R, r) { const p = []; for (let k = 0; k < 10; k++) { const a = (-90 + k * 36) * Math.PI / 180, rr = k % 2 ? r : R; p.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); } return p; }
  const FORMAS = {
    circulo:   circ(50, 50, 44),
    cuadrado:  poly([[10,10],[90,10],[90,90],[10,90]]),
    triangulo: poly([[50,10],[90,88],[10,88]]),
    estrella:  poly(puntosEstrella(50, 54, 48, 20)),
    corazon:   'M50 90C20 68 4 50 8 29C12 10 37 6 50 27C63 6 88 10 92 29C96 50 80 68 50 90Z',
    hoja:      'M50 6C78 22 92 48 84 74C76 92 58 96 50 96C42 96 24 92 16 74C8 48 22 22 50 6Z',
    mariposa:  'M50 50C30 30 4 22 4 42C4 60 24 66 50 66C76 66 96 60 96 42C96 22 70 30 50 50ZM50 50C30 70 4 78 4 58C4 40 24 34 50 34C76 34 96 40 96 58C96 78 70 70 50 50ZM50 46L52 54L50 62L48 54Z',
    esfera:    circ(50, 50, 46),
    pera:      'M50 6C56 6 62 14 62 24C62 34 56 40 56 46C56 50 58 52 62 56C68 62 76 70 76 80C76 92 64 96 50 96C36 96 24 92 24 80C24 70 32 62 38 56C42 52 44 50 44 46C44 40 38 34 38 24C38 14 44 6 50 6Z',
    jarron:    'M50 4C56 4 62 8 62 14C62 18 58 22 56 26C56 30 62 36 68 44C74 52 78 62 78 74C78 88 66 96 50 96C34 96 22 88 22 74C22 62 26 52 32 44C38 36 44 30 44 26C42 22 38 18 38 14C38 8 44 4 50 4Z',
    sol:       circ(50, 50, 30)
  };
  /* tono más claro / más oscuro de un color */
  function tono(hex, f) {
    const n = parseInt(hex.slice(1, 7), 16), c = [n >> 16, (n >> 8) & 255, n & 255];
    return '#' + c.map(v => Math.round(f > 0 ? v + (255 - v) * f : v * (1 + f))).map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
  }
  /* foco de luz en el gradiente (en % de la figura) y desplazamiento de la sombra */
  const LUZ = { arriba: [50, 18, 0, 1], izq: [22, 36, 1, 0.55], der: [78, 36, -1, 0.55], frente: [40, 34, 0.25, 0.9] };
  let GID = 0;
  function capaSVG(c, e) {
    let inner = '';
    if (c.tipo === 'rect') inner = `<rect x="${c.x || 0}" y="${c.y || 0}" width="${c.w || e.w}" height="${c.h || e.h}" rx="${c.rx || 0}" fill="${c.fill || '#fff'}"/>`;
    else if (c.tipo === 'texto') inner = `<text x="${c.x}" y="${c.y}" font-size="${c.size || 16}" fill="${c.fill || '#2b2118'}" text-anchor="middle" font-weight="800" font-family="'Baloo 2',system-ui,sans-serif">${c.t}</text>`;
    else if (c.tipo === 'grupo') inner = (c.capas || []).map(x => capaSVG(x, e)).join('');
    else if (c.tipo === 'figura') {
      const s = c.size, k = s / 100, tx = f1(c.cx - s / 2), ty = f1(c.cy - s / 2);
      const tr = `translate(${tx} ${ty}) scale(${f1(k * 1000) / 1000})`;
      const d = FORMAS[c.forma] || FORMAS.circulo;
      let relleno = c.fill || '#333', defs = '', sombra = '';
      if (c.luz && LUZ[c.luz] && relleno[0] === '#') {
        const L = LUZ[c.luz], id = 'luz' + (++GID);
        defs = `<defs><radialGradient id="${id}" cx="${L[0]}%" cy="${L[1]}%" r="85%" fx="${L[0]}%" fy="${L[1]}%"><stop offset="0%" stop-color="${tono(relleno, 0.65)}"/><stop offset="28%" stop-color="${tono(relleno, 0.12)}"/><stop offset="62%" stop-color="${relleno}"/><stop offset="100%" stop-color="${tono(relleno, -0.62)}"/></radialGradient></defs>`;
        relleno = `url(#${id})`;
        if (c.sombra !== false) {
          const piso = c.piso != null ? c.piso : c.cy + s * 0.46;
          sombra = `<ellipse cx="${f1(c.cx + L[2] * s * 0.42)}" cy="${f1(piso)}" rx="${f1(s * (0.42 + Math.abs(L[2]) * 0.2))}" ry="${f1(s * 0.09)}" fill="#000" opacity="0.28"/>`;
        }
      }
      inner = defs + sombra + `<path transform="${tr}" d="${d}" fill="${relleno}"${c.strokeW ? ` stroke="${c.stroke}" stroke-width="${f1(c.strokeW / k)}"` : ''} stroke-linejoin="round"/>`;
    }
    return `<g class="capa${c.oculto ? ' oculto' : ''}"${c.id ? ` data-capa="${c.id}"` : ''}>${inner}</g>`;
  }
  function escenaSVG(e) {
    return `<svg class="escena" viewBox="0 0 ${e.w} ${e.h}" xmlns="http://www.w3.org/2000/svg">${e.capas.map(c => capaSVG(c, e)).join('')}</svg>`;
  }

  const S = { i: 0, aciertos: 0, errores: 0, puntos: 0, eval: {}, completo: false, fotoURL: null, taller: null, salir: null };
  function evaluar(clave, ok) {
    if (S.eval[clave] !== undefined) return;
    S.eval[clave] = ok;
    if (ok) { S.aciertos++; S.puntos += D.meta.puntosPorAcierto || 10; } else S.errores++;
    pintarPuntos();
  }

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
    const g = AQ.gen; let hecho = false, fallo = false;
    const fin = () => { if (hecho || g !== AQ.gen) return; hecho = true; AQ.cur = null; if (it.cb) { try { it.cb(); } catch (e) {} } if (g === AQ.gen && !AQ.cur) siguienteAudio(); };
    const respaldo = () => { if (fallo || hecho) return; fallo = true; AQ.timer = setTimeout(fin, Math.min(7000, 350 + textoAudio(it.k).length * 45)); };
    let a; try { a = new Audio('audio/' + it.k + '.mp3'); } catch (e) { respaldo(); return; }
    AQ.el = a; a.onended = fin; a.onerror = respaldo;
    try { const p = a.play(); if (p && p.catch) p.catch(respaldo); } catch (e) { respaldo(); }
  }
  function pararAudio() {
    AQ.gen++; if (AQ.el) { try { AQ.el.onended = null; AQ.el.onerror = null; AQ.el.pause(); } catch (e) {} }
    clearTimeout(AQ.timer); AQ.q = []; AQ.cur = null; AQ.el = null; actualizarNav();
  }
  const audioOcupado = () => !!AQ.cur || AQ.q.length > 0;

  let actx = null;
  function sonido(tipo) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notas = tipo === 'ok' ? [660, 880] : [220, 180];
      notas.forEach((f, j) => { const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + j * 0.12;
        o.type = tipo === 'ok' ? 'sine' : 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 0.22); });
    } catch (e) {}
  }

  function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function bloquearHasta(el, keys, cb) { el.classList.add('espera'); play(keys, () => { el.classList.remove('espera'); if (cb) cb(); }); }
  function completar() { S.completo = true; actualizarNav(); }
  function descargar(url, nombre) { const a = document.createElement('a'); a.href = url; a.download = nombre; document.body.appendChild(a); a.click(); a.remove(); }
  function profeHTML() {
    const m = D.meta;
    return `<div class="profe"><img src="${m.fotoMini || m.foto}" alt="Profe" id="fotoProfe" onerror="this.outerHTML='<div class=&quot;profe-emoji&quot; id=&quot;fotoProfe&quot;>👨‍🏫</div>'"><div class="profe-txt"><div>${m.autor}</div><div class="mail">✉️ ${m.mail}</div></div></div>`;
  }
  function activarLightbox() {
    const f = $('#fotoProfe'); if (!f) return;
    f.addEventListener('click', () => { const lb = $('#lightbox'), im = $('#lbImg'); im.src = D.meta.foto; im.classList.remove('zoom'); im.style.transformOrigin = '50% 50%'; lb.classList.add('ver'); });
  }
  function initLightbox() {
    const lb = $('#lightbox'), im = $('#lbImg');
    $('#lbFrase').textContent = D.meta.frase;
    im.addEventListener('click', ev => {
      const r = im.getBoundingClientRect();
      if (!im.classList.contains('zoom')) { const px = r.width ? ((ev.clientX - r.left) / r.width * 100) : 50, py = r.height ? ((ev.clientY - r.top) / r.height * 100) : 50; im.style.transformOrigin = px + '% ' + py + '%'; im.classList.add('zoom'); }
      else im.classList.remove('zoom');
    });
    $('#lbCerrar').addEventListener('click', () => { lb.classList.remove('ver'); im.classList.remove('zoom'); im.style.transformOrigin = '50% 50%'; });
  }

  const REQUIERE = { clasificarUno: 1, cualDestaca: 1, vf: 1, autoeval: 1, tallerLuz: 1 };
  function actualizarNav() {
    const P = D.pantallas[S.i], b = $('#btnSig'); if (!b || !P) return;
    b.disabled = audioOcupado() || (REQUIERE[P.tipo] && !S.completo);
    $('#navPrev').disabled = S.i === 0; $('#navNext').disabled = S.i >= D.pantallas.length - 1;
    $('#revPrev').style.visibility = S.i === 0 ? 'hidden' : 'visible';
    $('#revNext').style.visibility = S.i >= D.pantallas.length - 1 ? 'hidden' : 'visible';
  }
  function pintarPuntos() { const p = $('#puntos'); if (p) p.textContent = '⭐ ' + S.puntos; }
  function ir(i) {
    if (i < 0 || i >= D.pantallas.length) return;
    if (S.salir) { try { S.salir(); } catch (e) {} S.salir = null; }
    pararAudio(); S.i = i; S.completo = false;
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

  const R = {};

  R.portada = (P, M) => {
    const m = D.meta;
    M.innerHTML = `<div class="portada">
      <div class="port-area">${m.area}</div>
      <h1>${m.titulo}</h1><div class="port-sub">${m.subtitulo}</div>
      <img class="port-img" src="${P.img}" alt="" onerror="this.style.display='none'">
      <div class="port-fila"><button class="btn grande" id="btnComenzar">▶ Comenzar</button>${profeHTML()}</div>
      <div class="port-fuente">${m.fuente}</div></div>`;
    $('#btnComenzar').onclick = () => ir(1);
    activarLightbox(); play(P.audio);
  };

  R.cierre = (P, M) => {
    const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
    M.innerHTML = `<div class="cierre">
      <h1>🎉 ¡Terminaste!</h1>
      <img class="cie-img" src="${P.img}" alt="" onerror="this.style.display='none'">
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      <div class="cie-fila"><button class="btn grande" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div>
      ${D.meta.youtube ? `<a class="btn yt" href="${D.meta.youtube}" target="_blank" rel="noopener">▶ Suscribite al canal</a>` : ''}</div>`;
    $('#btnOtra').onclick = () => { Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, fotoURL: null, taller: null }); ir(0); };
    try { if (window.QSTEnvio) M.querySelector('.cierre').insertBefore(QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.grado || 'Artes Visuales · 5.º grado', aciertos: S.aciertos, errores: S.errores, puntos: S.puntos }), M.querySelector('.yt')); } catch (e) {}
    activarLightbox(); play(P.audio);
  };

  R.narracion = (P, M) => {
    const e = P.escena;
    M.innerHTML = `<div class="narra">
      <div class="lienzo" style="width:min(94vw, calc(50vh * ${e.w / e.h}))">${escenaSVG(e)}<div class="mano">👆</div></div>
      <div class="caption" id="cap"></div>
      <button class="btn chico" id="btnRep">🔁 Escuchar otra vez</button></div>`;
    const svg = $('svg', M), mano = $('.mano', M), cap = $('#cap');
    const ini = {}; $$('[data-capa]', svg).forEach(g => ini[g.dataset.capa] = g.classList.contains('oculto'));
    const capa = id => $(`[data-capa="${id}"]`, svg);
    function aplicar(st) {
      (st.ocultar || []).forEach(id => capa(id) && capa(id).classList.add('oculto'));
      (st.mostrar || []).forEach(id => capa(id) && capa(id).classList.remove('oculto'));
      $$('.resalta,.atenua', svg).forEach(g => g.classList.remove('resalta', 'atenua'));
      if (st.resaltar && capa(st.resaltar)) capa(st.resaltar).classList.add('resalta');
      if (st.atenuar && capa(st.atenuar)) capa(st.atenuar).classList.add('atenua');
      if (st.apuntar) { mano.style.left = st.apuntar[0] + '%'; mano.style.top = st.apuntar[1] + '%'; mano.classList.add('ver'); } else mano.classList.remove('ver');
      cap.innerHTML = st.texto || ''; cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra');
    }
    function correr() {
      Object.keys(ini).forEach(id => capa(id).classList.toggle('oculto', ini[id]));
      let i = 0;
      const paso = () => { if (i >= P.pasos.length) { $$('.resalta,.atenua', svg).forEach(g => g.classList.remove('resalta', 'atenua')); mano.classList.remove('ver'); completar(); return; } const st = P.pasos[i++]; aplicar(st); play(st.audio, paso); };
      paso();
    }
    $('#btnRep').onclick = () => { pararAudio(); correr(); };
    correr();
  };

  R.pasos = (P, M) => {
    M.innerHTML = `<div class="pasos">
      <img class="pas-img" src="${P.img}" alt="" onerror="this.style.visibility='hidden'">
      <div class="puntitos">${P.pasos.map(() => '<i></i>').join('')}</div>
      <div class="caption grande" id="cap"></div>
      <button class="btn chico" id="btnRep">🔁 Escuchar otra vez</button></div>`;
    const cap = $('#cap'), dots = $$('.puntitos i', M);
    function correr() {
      let i = 0;
      const paso = () => { if (i >= P.pasos.length) { completar(); return; } const st = P.pasos[i]; dots.forEach((d, j) => { d.classList.toggle('on', j === i); d.classList.toggle('hecho', j < i); }); cap.innerHTML = st.texto; cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra'); i++; play(st.audio, paso); };
      paso();
    }
    $('#btnRep').onclick = () => { pararAudio(); correr(); };
    correr();
  };

  R.clasificarUno = (P, M) => {
    const items = barajar(P.items); let idx = 0;
    M.innerHTML = `<div class="clasi">
      <div class="enunciado">${P.texto} <span class="cont" id="cont"></span></div>
      <div class="carta" id="carta"></div>
      <div class="cats" id="cats">${P.categorias.map(c => `<button class="btn cat" data-cat="${c.id}">${c.label}<small>${c.sub}</small></button>`).join('')}</div></div>`;
    const carta = $('#carta'), cats = $('#cats');
    function mostrar() { const it = items[idx]; $('#cont').textContent = (idx + 1) + ' / ' + items.length; carta.className = 'carta'; carta.innerHTML = escenaSVG(it.escena); void carta.offsetWidth; carta.classList.add('entra'); }
    $$('.cat', cats).forEach(b => b.onclick = () => {
      if (cats.classList.contains('espera')) return;
      const it = items[idx], ok = b.dataset.cat === it.cat;
      evaluar(S.i + ':' + it.id, ok);
      if (ok) { sonido('ok'); carta.classList.add('bien'); bloquearHasta(cats, it.ok, () => { idx++; if (idx < items.length) mostrar(); else { cats.classList.add('espera'); completar(); } }); }
      else { sonido('mal'); carta.classList.remove('mal'); void carta.offsetWidth; carta.classList.add('mal'); bloquearHasta(cats, P.err); }
    });
    mostrar(); bloquearHasta(cats, P.instr);
  };

  R.cualDestaca = (P, M) => {
    let ri = 0;
    M.innerHTML = `<div class="cual"><div class="enunciado">${P.texto} <span class="cont" id="cont"></span></div><div class="duo" id="duo"></div></div>`;
    const duo = $('#duo');
    function ronda() {
      const rd = P.rondas[ri];
      $('#cont').textContent = (ri + 1) + ' / ' + P.rondas.length;
      const crear = (c) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: c.fondo }].concat(c.capas) });
      const ops = barajar([{ ok: true, e: crear(rd.buena) }, { ok: false, e: crear(rd.mala) }]);
      duo.innerHTML = ops.map((o, j) => `<button class="carta op" data-ok="${o.ok ? 1 : 0}">${escenaSVG(o.e)}<span class="letra">${'AB'[j]}</span><span class="truco">✨ ${rd.truco}</span></button>`).join('');
      $$('.op', duo).forEach(b => b.onclick = () => {
        if (duo.classList.contains('espera')) return;
        const ok = b.dataset.ok === '1';
        evaluar(S.i + ':r' + ri, ok);
        if (ok) { sonido('ok'); b.classList.add('bien'); bloquearHasta(duo, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(); else { duo.classList.add('espera'); completar(); } }); }
        else { sonido('mal'); b.classList.remove('mal'); void b.offsetWidth; b.classList.add('mal'); bloquearHasta(duo, P.err); }
      });
      bloquearHasta(duo, ri === 0 ? P.instr : null);
    }
    ronda();
  };

  R.vf = (P, M) => {
    let idx = 0;
    M.innerHTML = `<div class="vf">
      <div class="vf-escena sin-foto"><div class="vf-cuadro" id="cuadro"></div></div>
      <div class="enunciado"><span class="cont" id="cont"></span></div>
      <div class="afirma" id="afirma"></div>
      <div class="vf-bots" id="bots"><button class="btn v" data-v="1">✅ Verdadero</button><button class="btn f" data-v="0">❌ Falso</button></div></div>`;
    const af = $('#afirma'), bots = $('#bots'), cuadro = $('#cuadro');
    function mostrar(primero) {
      const it = P.items[idx];
      $('#cont').textContent = (idx + 1) + ' / ' + P.items.length;
      cuadro.innerHTML = escenaSVG(it.cuadro);
      cuadro.classList.remove('entra'); void cuadro.offsetWidth; cuadro.classList.add('entra');
      af.className = 'afirma'; af.textContent = it.texto; void af.offsetWidth; af.classList.add('entra', 'titila');
      bloquearHasta(bots, primero ? [P.instr, it.audio] : it.audio);
    }
    $$('button', bots).forEach(b => b.onclick = () => {
      if (bots.classList.contains('espera')) return;
      const it = P.items[idx], ok = (b.dataset.v === '1') === it.v;
      evaluar(S.i + ':' + idx, ok);
      if (ok) { sonido('ok'); af.classList.remove('titila'); af.classList.add('bien'); bloquearHasta(bots, it.ok, () => { idx++; if (idx < P.items.length) mostrar(false); else { bots.classList.add('espera'); completar(); } }); }
      else { sonido('mal'); af.classList.remove('mal'); void af.offsetWidth; af.classList.add('mal'); bloquearHasta(bots, P.err); }
    });
    mostrar(true);
  };

  R.foto = (P, M) => {
    M.innerHTML = `<div class="foto">
      ${P.texto ? `<div class="enunciado">${P.texto}</div>` : ''}
      <div class="marco"><img id="fprev" src="${S.fotoURL || P.img}" alt="" onerror="this.style.visibility='hidden'"></div>
      <input type="file" accept="image/*" capture="environment" id="finCam" hidden>
      <input type="file" accept="image/*" id="finGal" hidden>
      <div class="fila" id="fbots"><button class="btn" id="bCam">📷 Sacar foto</button><button class="btn sec" id="bGal">🖼️ Elegir de la galería</button><button class="btn sec" id="bSave" ${S.fotoURL ? '' : 'hidden'}>💾 Guardar</button></div></div>`;
    const fb = $('#fbots');
    $('#bCam').onclick = () => { play(P.boton); $('#finCam').click(); };
    $('#bGal').onclick = () => $('#finGal').click();
    const cargar = ev => { const f = ev.target.files && ev.target.files[0]; if (!f) return; if (S.fotoURL) { try { URL.revokeObjectURL(S.fotoURL); } catch (e) {} } S.fotoURL = URL.createObjectURL(f); $('#fprev').src = S.fotoURL; $('#fprev').style.visibility = 'visible'; $('#bSave').hidden = false; sonido('ok'); pararAudio(); play(P.ok); };
    $('#finCam').onchange = cargar; $('#finGal').onchange = cargar;
    $('#bSave').onclick = () => { if (S.fotoURL) descargar(S.fotoURL, P.archivo); };
    bloquearHasta(fb, P.instr);
  };

  R.autoeval = (P, M) => {
    let idx = 0;
    const mini = S.fotoURL;
    const miniHTML = mini ? `<img src="${mini}" alt="Mi obra">` : escenaSVG({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#d4c8b0' }, { tipo: 'figura', forma: 'esfera', cx: 150, cy: 105, size: 140, fill: '#e63946', luz: 'izq', piso: 180 }] });
    M.innerHTML = `<div class="auto">
      <div class="mini">${miniHTML}</div>
      <div class="enunciado"><span class="cont" id="cont"></span></div>
      <div class="afirma" id="preg"></div>
      <div class="vf-bots" id="bots"><button class="btn v" data-r="si">👍 Sí</button><button class="btn sec" data-r="no">🌱 Todavía no</button></div></div>`;
    const pr = $('#preg'), bots = $('#bots');
    function mostrar(primero) {
      const it = P.items[idx];
      $('#cont').textContent = (idx + 1) + ' / ' + P.items.length;
      pr.className = 'afirma'; pr.innerHTML = it.texto; void pr.offsetWidth; pr.classList.add('entra', 'titila');
      bloquearHasta(bots, primero ? [P.instr, it.audio] : it.audio);
    }
    $$('button', bots).forEach(b => b.onclick = () => {
      if (bots.classList.contains('espera')) return;
      const it = P.items[idx];
      pr.classList.remove('titila'); pr.classList.add(b.dataset.r === 'si' ? 'bien' : 'neutro');
      bloquearHasta(bots, it[b.dataset.r], () => { idx++; if (idx < P.items.length) mostrar(false); else { bots.classList.add('espera'); pr.className = 'afirma bien'; pr.textContent = '🌟 ¡Gracias por mirar tu obra!'; play(P.fin, completar); } });
    });
    mostrar(true);
  };

  /* ---------- TALLER LUZ (nueva mecánica) ---------- */
  R.tallerLuz = (P, M) => {
    const T = S.taller || (S.taller = { modo: 'luz', forma: 'esfera', luz: 'arriba', tono: 'claro', pintado: {}, hist: [] });
    const NOMBRE = { esfera: 'Esfera', pera: 'Pera', jarron: 'Jarrón' };
    M.innerHTML = `<div class="taller">
      <div class="tl-lienzo" id="tl"><canvas id="cv" width="800" height="800"></canvas></div>
      <div class="tl-panel" id="panel">
        <div class="tabs">
          <button class="tab" data-tab="luz">💡 Mover la luz</button>
          <button class="tab" data-tab="pintar">🖌️ Pintar yo</button>
          <button class="tab" data-tab="acc">💾 Guardar</button>
        </div>
        <div class="tl-herr" id="herr"></div>
      </div></div>`;
    const tl = $('#tl'), cv = $('#cv'), herr = $('#herr'), panel = $('#panel');
    const c = cv.getContext ? cv.getContext('2d') : null;
    const hayCanvas = !!c && !!window.Path2D;
    if (!hayCanvas) { tl.innerHTML = '<div style="padding:20px;text-align:center;font-weight:700">Este dispositivo no soporta el taller.</div>'; return; }
    S.salir = () => {};

    const MARGEN = 100, AREA = 600, CENTRO = 400;
    // Forma a path2d y puntos normalizados (0..100 dentro del área de la figura)
    function pathForma(id) {
      const box = { w: 100, h: 100 };
      const k = AREA / 100;
      const p = new Path2D(FORMAS[id]);
      return { path: p, k, box };
    }
    function puntoLuz() {
      const d = 0.55; // distancia del centro de la figura al "foco"
      switch (T.luz) {
        case 'arriba': return { x: 400, y: 400 - AREA * d };
        case 'izq':    return { x: 400 - AREA * d, y: 400 };
        case 'der':    return { x: 400 + AREA * d, y: 400 };
        case 'apagada':return { x: 400, y: 400 };
      }
      return { x: 400, y: 200 };
    }
    function dibujarLuz() {
      c.fillStyle = '#f4f4f4'; c.fillRect(0, 0, 800, 800);
      // Dibujar sombra proyectada (elipse) al lado opuesto de la luz
      if (T.luz !== 'apagada') {
        const l = puntoLuz();
        const dx = l.x - 400, dy = l.y - 400;
        const sombraX = 400 + dx * 0.8, sombraY = 400 + dy * 0.8;
        c.save();
        c.translate(sombraX, sombraY);
        c.scale(1.1, 0.55);
        c.beginPath();
        c.arc(0, 0, AREA * 0.5, 0, Math.PI * 2);
        const grd = c.createRadialGradient(0, 0, 0, 0, 0, AREA * 0.5);
        grd.addColorStop(0, 'rgba(0,0,0,0.55)');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        c.fillStyle = grd;
        c.fill();
        c.restore();
      }
      // Dibujar la figura con gradiente radial según la posición de la luz
      const f = pathForma(T.forma);
      c.save();
      c.translate(400, 400);
      c.scale(f.k, f.k);
      c.translate(-50, -50);
      if (T.luz === 'apagada') {
        c.fillStyle = '#2b2b2b';
        c.fill(f.path);
      } else {
        const l = puntoLuz();
        // Coordenadas de luz en el espacio de la forma (0..100)
        const lx = 50 + (l.x - 400) / AREA * 100;
        const ly = 50 + (l.y - 400) / AREA * 100;
        const grad = c.createRadialGradient(lx, ly, 2, lx, ly, 85);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, '#f0f0f0');
        grad.addColorStop(0.65, '#a8a8a8');
        grad.addColorStop(0.9, '#5a5a5a');
        grad.addColorStop(1, '#1a1a1a');
        c.fillStyle = grad;
        c.fill(f.path);
        c.strokeStyle = 'rgba(0,0,0,0.15)'; c.lineWidth = 1.5 / f.k * 2; c.stroke(f.path);
      }
      c.restore();
    }
    function dibujarPintura() {
      c.fillStyle = '#f4f4f4'; c.fillRect(0, 0, 800, 800);
      const f = pathForma(T.forma);
      // Contorno de la figura en blanco
      c.save();
      c.translate(400, 400);
      c.scale(f.k, f.k);
      c.translate(-50, -50);
      c.fillStyle = '#ffffff';
      c.fill(f.path);
      c.strokeStyle = '#222'; c.lineWidth = 2 / f.k * 2; c.stroke(f.path);
      // Aplicar pintura guardada (cada píxel pintado en coordenadas normalizadas)
      const memo = T.pintado || {};
      Object.keys(memo).forEach(k => {
        const [px, py] = k.split('_').map(Number);
        c.beginPath();
        c.arc(px, py, 6, 0, Math.PI * 2);
        c.fillStyle = memo[k];
        c.fill();
      });
      c.restore();
    }
    function redibujar() {
      if (T.modo === 'luz') dibujarLuz();
      else if (T.modo === 'pintar') dibujarPintura();
      else dibujarLuz(); // por defecto mostramos el modo luz
    }
    function herramientas() {
      $$('.tab', panel).forEach(b => b.classList.toggle('on', b.dataset.tab === T.modo));
      let h = '';
      if (T.modo === 'acc') {
        h = `<div class="fila-h"><button class="btn" id="bGuardar">💾 ${D.audios.t_guardar ? 'Guardar' : 'Guardar'}</button>
             <button class="btn sec" id="bBorrarP">🧽 ${D.audios.t_borrar ? 'Borrar' : 'Borrar'}</button>
             <button class="btn sec" id="bDeshacer">↩️</button></div>`;
      } else if (T.modo === 'luz') {
        h = `<div class="fila-h">${P.formas.map(f => `<button class="hb forma${T.forma === f.id ? ' on' : ''}" data-forma="${f.id}" data-audio="${f.audio}">${NOMBRE[f.id]}</button>`).join('')}</div>
             <div class="fila-h">${P.luces.map(l => `<button class="hb${T.luz === l.id ? ' on' : ''}" data-luz="${l.id}" data-audio="${l.audio}">${l.emoji} ${l.id === 'arriba' ? 'Arriba' : l.id === 'izq' ? 'Izq.' : l.id === 'der' ? 'Der.' : 'Noche'}</button>`).join('')}</div>`;
      } else if (T.modo === 'pintar') {
        h = `<div class="fila-h">${P.formas.map(f => `<button class="hb forma${T.forma === f.id ? ' on' : ''}" data-forma="${f.id}" data-audio="${f.audio}">${NOMBRE[f.id]}</button>`).join('')}</div>
             <div class="fila-h">${P.tonos.map(t => `<button class="hb${T.tono === t.id ? ' on' : ''}" data-tono="${t.id}" data-audio="${t.audio}" style="background:${t.color};color:${t.id==='claro'||t.id==='medio'?'#333':'#fff'}">●</button>`).join('')}</div>
             <div class="fila-h"><button class="hb" id="bUndo" data-audio="t_deshacer">↩️</button><button class="hb" id="bClear" data-audio="t_borrar">🗑️</button></div>`;
      }
      herr.innerHTML = h;
      $$('[data-forma]', herr).forEach(b => b.onclick = () => { T.forma = b.dataset.forma; T.pintado = {}; redibujar(); herramientas(); decir(b.dataset.audio); });
      $$('[data-luz]', herr).forEach(b => b.onclick = () => { T.luz = b.dataset.luz; redibujar(); herramientas(); decir(b.dataset.audio); });
      $$('[data-tono]', herr).forEach(b => b.onclick = () => { T.tono = b.dataset.tono; herramientas(); decir(b.dataset.audio); });
      const bG = $('#bGuardar', herr); if (bG) bG.onclick = () => { const url = cv.toDataURL('image/png'); descargar(url, P.archivo); decir('t_guardar'); };
      const bC = $('#bBorrarP', herr) || $('#bClear', herr);
      if (bC) bC.onclick = () => { T.hist.push(JSON.parse(JSON.stringify(T.pintado))); T.pintado = {}; redibujar(); decir('t_borrar'); };
      const bU = $('#bUndo', herr); if (bU) bU.onclick = () => { T.pintado = T.hist.pop() || {}; redibujar(); decir('t_deshacer'); };
    }
    function decir(k) { if (!k) return; pararAudio(); play(k); }

    $$('.tab', panel).forEach(b => b.onclick = () => {
      const t = b.dataset.tab;
      if (t === 'acc') { T.modo = 'acc'; herramientas(); return; }
      T.modo = t; herramientas(); redibujar();
      decir(t === 'luz' ? 'ta_modo1' : 'ta_modo2');
    });

    // Pintar con puntero (solo en modo pintar)
    let pintando = false;
    function pos(ev) { const r = tl.getBoundingClientRect(); return [(ev.clientX - r.left) / (r.width || 1) * 800, (ev.clientY - r.top) / (r.height || 1) * 800]; }
    function pintarPunto(x, y) {
      const px = (x - 400) / (AREA) * 100, py = (y - 400) / (AREA) * 100;
      if (Math.hypot(px, py) > 60) return; // fuera del área aproximada de la figura
      const color = (P.tonos.find(t => t.id === T.tono) || P.tonos[0]).color;
      T.pintado[`${Math.round(px * 10) / 10}_${Math.round(py * 10) / 10}`] = color;
      dibujarPintura();
    }
    tl.addEventListener('pointerdown', ev => {
      if (panel.classList.contains('espera') || T.modo !== 'pintar') return;
      ev.preventDefault(); try { tl.setPointerCapture(ev.pointerId); } catch (e) {}
      T.hist.push(JSON.parse(JSON.stringify(T.pintado)));
      if (T.hist.length > 20) T.hist.shift();
      pintando = true;
      const [x, y] = pos(ev); pintarPunto(x, y);
    });
    tl.addEventListener('pointermove', ev => {
      if (!pintando) return; ev.preventDefault();
      const [x, y] = pos(ev); pintarPunto(x, y);
    });
    const soltar = () => { pintando = false; };
    tl.addEventListener('pointerup', soltar); tl.addEventListener('pointercancel', soltar);

    herramientas(); redibujar();
    tl.classList.add('espera'); panel.classList.add('espera');
    play(P.instr, () => { tl.classList.remove('espera'); panel.classList.remove('espera'); });
  };

  function init() {
    document.title = D.meta.titulo + ' · QueSepanTodos';
    document.body.classList.toggle('revision', !!D.meta.revision);
    $('#btnSig').onclick = () => { if (!$('#btnSig').disabled) ir(S.i + 1); };
    $('#navPrev').onclick = () => ir(S.i - 1);
    $('#navNext').onclick = () => ir(S.i + 1);
    $('#revPrev').onclick = () => ir(S.i - 1);
    $('#revNext').onclick = () => ir(S.i + 1);
    initLightbox(); ir(0);
  }
  window.MOTOR = { ir, S, AQ, play, pararAudio };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
