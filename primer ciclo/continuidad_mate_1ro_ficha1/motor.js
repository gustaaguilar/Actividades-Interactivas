/* ============================================================
   motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
   Motor genérico de paquetes interactivos — núcleo común
   (cola de audio, navegación, puntaje, portada/cierre, lightbox)
   + mecánicas de numeración: narraCuadro, adivina, opcion,
   completar (cuadroNumerico) y pasos.
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
      if (g === AQ.gen) siguienteAudio();
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
  function sacudir(el) { el.classList.remove('mal'); void el.offsetWidth; el.classList.add('mal'); }
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

  /* ---- Cuadro de números (HTML) ---- */
  function cuadroHTML(opts) {
    const c = D.cuadro, cols = c.columnas, filas = Math.ceil((c.hasta - c.desde + 1) / cols);
    let h = `<div class="cuadro${opts && opts.activo ? ' activo' : ''}" style="--cols:${cols};--filas:${filas}">`;
    for (let n = c.desde; n <= c.hasta; n++) h += `<div class="celda" data-n="${n}">${n}</div>`;
    return h + '</div>';
  }
  function celda(cont, n) { return $(`.celda[data-n="${n}"]`, cont); }
  function limpiarCuadro(cont) { $$('.celda', cont).forEach(e => e.classList.remove('luz', 'fila', 'col', 'mal', 'bien', 'titila')); }

  /* =================== NAVEGACIÓN =================== */
  const REQUIERE = { adivina: 1, opcion: 1, completar: 1 };
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

  /* ---- Narración animada sobre el cuadro de números ---- */
  R.narraCuadro = function (P, M) {
    M.innerHTML = `<div class="narra">
      <div class="cuadro-wrap" id="cw">${cuadroHTML()}<div class="mano">👆</div></div>
      <div class="caption" id="cap"></div>
      <button class="btn chico" id="btnRep">🔁 Escuchar otra vez</button></div>`;
    const cw = $('#cw'), mano = $('.mano', cw), cap = $('#cap'), c = D.cuadro;
    function aplicar(st) {
      limpiarCuadro(cw);
      const luz = [].concat(st.resaltar || []);
      if (st.fila != null) for (let n = st.fila; n < st.fila + c.columnas; n++) luz.push(n);
      if (st.columna != null) for (let n = c.desde + st.columna; n <= c.hasta; n += c.columnas) luz.push(n);
      if (st.rango) for (let n = st.rango[0]; n <= st.rango[1]; n++) luz.push(n);
      luz.forEach(n => { const e = celda(cw, n); if (e) e.classList.add('luz'); });
      const obj = st.apuntar != null ? celda(cw, st.apuntar) : null;
      if (obj) {
        const r0 = cw.getBoundingClientRect(), r1 = obj.getBoundingClientRect();
        const x = r0.width ? (r1.left - r0.left + r1.width / 2) / r0.width * 100 : 50;
        const y = r0.height ? (r1.top - r0.top + r1.height * 0.6) / r0.height * 100 : 50;
        mano.style.left = x + '%'; mano.style.top = y + '%'; mano.classList.add('ver');
        obj.classList.add('titila');
      } else mano.classList.remove('ver');
      cap.innerHTML = st.texto || ''; cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra');
    }
    function correr() {
      let i = 0;
      const paso = () => {
        if (i >= P.pasos.length) { mano.classList.remove('ver'); completar(); return; }
        const st = P.pasos[i++]; aplicar(st); play(st.audio, paso);
      };
      paso();
    }
    $('#btnRep').onclick = () => { pararAudio(); correr(); };
    correr();
  };

  /* ---- Pistas (lista numerada, se revelan con su audio) ---- */
  function pistasHTML(pistas) {
    return `<ol class="pistas">${pistas.map(p => `<li class="oculta">${p.texto}</li>`).join('')}</ol>`;
  }
  function revelarPistas(cont, pistas, previo, cb) {
    const lis = $$('.pistas li', cont);
    const keys = [].concat(previo || []);
    const n0 = keys.length;
    keys.push(...pistas.map(p => p.audio));
    // se revela cada pista cuando empieza su audio: encadenamos por callbacks
    let k = 0;
    const lanzar = () => {
      if (k >= keys.length) { lis.forEach(l => l.classList.remove('oculta', 'titila')); if (cb) cb(); return; }
      const j = k - n0;
      if (j >= 0 && lis[j]) { lis.forEach(l => l.classList.remove('titila')); lis[j].classList.remove('oculta'); lis[j].classList.add('titila'); }
      play(keys[k++], lanzar);
    };
    lanzar();
  }

  /* ---- Adivinar tocando el cuadro ---- */
  R.adivina = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="adivina">
      <div class="col-izq"><img class="masc" src="${P.img}" alt="" onerror="this.style.display='none'"><div id="pz"></div><span class="cont" id="cont"></span></div>
      <div class="cuadro-wrap" id="cw">${cuadroHTML({ activo: true })}</div></div>`;
    const cw = $('#cw'), pz = $('#pz');
    function ronda(primero) {
      const rd = P.rondas[ri];
      $('#cont').textContent = (ri + 1) + ' / ' + P.rondas.length;
      limpiarCuadro(cw);
      pz.innerHTML = pistasHTML(rd.pistas);
      cw.classList.add('espera');
      revelarPistas(pz, rd.pistas, primero ? P.instr : null, () => cw.classList.remove('espera'));
    }
    $$('.celda', cw).forEach(e => e.onclick = () => {
      if (cw.classList.contains('espera')) return;
      const rd = P.rondas[ri], n = +e.dataset.n, ok = n === rd.respuesta;
      evaluar(S.i + ':' + rd.id, ok);
      if (ok) {
        sonido('ok'); e.classList.add('bien');
        bloquearHasta(cw, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(false); else { cw.classList.add('espera'); completar(); } });
      } else {
        sonido('mal'); sacudir(e); e.classList.add('mal-luz'); setTimeout(() => e.classList.remove('mal-luz'), 900);
        bloquearHasta(cw, P.err);
      }
    });
    ronda(true);
  };

  /* ---- Opción múltiple (serie con hueco / número en palabras / pistas) ---- */
  R.opcion = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="opcion${P.conCuadro ? ' con-cuadro' : ''}">
      <div class="col-izq" id="vis"></div>
      <div class="col-der"><div class="enunciado"><span class="cont" id="cont"></span></div><div id="preg"></div><div class="ops" id="ops"></div></div></div>`;
    const vis = $('#vis'), preg = $('#preg'), ops = $('#ops');
    function ronda(primero) {
      const rd = P.rondas[ri];
      $('#cont').textContent = P.rondas.length > 1 ? (ri + 1) + ' / ' + P.rondas.length : '';
      vis.innerHTML = P.conCuadro ? `<div class="cuadro-wrap">${cuadroHTML()}</div>` : `<img class="masc grande" src="${P.img}" alt="" onerror="this.style.display='none'">`;
      let h = '';
      if (rd.serie) h += `<div class="serie">${rd.serie.map(n => n == null ? '<div class="tarjeta hueco titila">?</div>' : `<div class="tarjeta">${n}</div>`).join('')}</div>`;
      if (rd.palabra) h += `<button class="palabra titila" id="pal">🔊 ${rd.palabra}</button>`;
      if (rd.pistas) h += pistasHTML(rd.pistas);
      preg.innerHTML = h;
      ops.innerHTML = barajar(rd.opciones).map(n => `<button class="btn op" data-n="${n}">${n}</button>`).join('');
      const pal = $('#pal', preg);
      if (pal) pal.onclick = () => { if (!ops.classList.contains('espera')) { pararAudio(); play(rd.audio); } };
      ops.classList.add('espera');
      const intro = [primero ? P.instr : null, rd.audio].filter(Boolean);
      if (rd.pistas) revelarPistas(preg, rd.pistas, intro, () => ops.classList.remove('espera'));
      else play(intro, () => ops.classList.remove('espera'));
      $$('.op', ops).forEach(b => b.onclick = () => {
        if (ops.classList.contains('espera')) return;
        const ok = +b.dataset.n === rd.respuesta;
        evaluar(S.i + ':' + rd.id, ok);
        if (ok) {
          sonido('ok'); b.classList.add('bien');
          const h = $('.hueco', preg); if (h) { h.textContent = rd.respuesta; h.classList.remove('titila'); h.classList.add('bien'); }
          if (pal) pal.classList.remove('titila');
          bloquearHasta(ops, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(false); else { ops.classList.add('espera'); completar(); } });
        } else {
          sonido('mal'); sacudir(b);
          bloquearHasta(ops, P.err);
        }
      });
    }
    ronda(true);
  };

  /* ---- Completar el cuadro (tocar tarjeta → tocar casillero) ---- */
  R.completar = function (P, M) {
    const ncols = Math.max(...P.filas.map(f => f.length));
    // valor correcto de cada casillero vacío: se deduce de la fila (decena) y la columna
    const tabla = P.filas.map(f => { const base = f.find(v => v != null); const i0 = f.indexOf(base); return f.map((v, j) => ({ v, correcto: base - i0 + j })); });
    M.innerHTML = `<div class="completar">
      <div class="tabla" id="tb" style="--cols:${ncols}">${tabla.map(f => f.map(c => c.v != null ? `<div class="casi dado">${c.v}</div>` : `<div class="casi vacio" data-c="${c.correcto}"></div>`).join('')).join('')}</div>
      <div class="enunciado">TOCÁ UNA TARJETA Y DESPUÉS SU CASILLERO</div>
      <div class="tarjetas" id="tj">${barajar(P.tarjetas).map(n => `<button class="tarjeta mov" data-n="${n}">${n}</button>`).join('')}</div></div>`;
    const tb = $('#tb'), tj = $('#tj'), zona = $('.completar', M);
    let sel = null;
    $$('.mov', tj).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera') || b.classList.contains('usada')) return;
      $$('.mov', tj).forEach(x => x.classList.remove('sel'));
      sel = b; b.classList.add('sel');
      pararAudio(); play('n_' + b.dataset.n);
    });
    $$('.vacio', tb).forEach(c => c.onclick = () => {
      if (zona.classList.contains('espera') || !sel || c.classList.contains('lleno')) return;
      const n = +sel.dataset.n, ok = +c.dataset.c === n;
      evaluar(S.i + ':' + n, ok);
      if (ok) {
        sonido('ok'); c.textContent = n; c.classList.add('lleno', 'bien');
        sel.classList.remove('sel'); sel.classList.add('usada'); sel = null;
        if (!$$('.mov:not(.usada)', tj).length) { pararAudio(); bloquearHasta(zona, P.ok, () => { zona.classList.add('espera'); completar(); }); }
      } else {
        sonido('mal'); sacudir(c); sacudir(sel);
        pararAudio(); bloquearHasta(zona, P.err);
      }
    });
    bloquearHasta(zona, P.instr);
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
  window.MOTOR = { ir, S, AQ, play, pararAudio, audiosUsados: () => Object.keys(D.audios) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
