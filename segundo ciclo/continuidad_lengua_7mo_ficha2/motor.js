/* ============================================================
   motor.js v2 — QueSepanTodos.com · Profe Gustavo Aguilar
   Motor genérico de paquetes interactivos — Matemática
   Núcleo: cola de audio, navegación, puntaje de primer intento,
   portada/cierre con lightbox.
   Mecánicas: pasos (narración con visual), opcion (única o
   múltiple), vf, completar (cuadro numérico), asociar, recta.
   Lengua: lectura (narrada o propia + botón 📖 Texto), huecos, ordenar.
   Visuales dibujados por código: serie, fila, personas, autos,
   recta, fraccion, tabla, tarjetasPuntaje, texto, img.
   ============================================================ */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* =================== ESTADO =================== */
  const S = { i: 0, aciertos: 0, errores: 0, puntos: 0, eval: {}, completo: false, salir: null };
  function evaluar(clave, ok, proceso) {
    if (S.eval[clave] !== undefined) return;   // solo cuenta el primer intento
    S.eval[clave] = ok;
    if (proceso) { S.proc = S.proc || {}; const q = S.proc[proceso] = S.proc[proceso] || { ok: 0, tot: 0 }; q.tot++; if (ok) q.ok++; }
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
    const respaldo = () => {
      if (fallo || hecho) return; fallo = true;
      AQ.timer = setTimeout(fin, window.__RAPIDO ? 5 : Math.min(7000, 350 + textoAudio(it.k).length * 45));
    };
    let a;
    try { a = new Audio('audio/' + it.k + '.mp3'); } catch (e) { respaldo(); return; }
    AQ.el = a; a.onended = fin; a.onerror = respaldo;
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
      const notas = tipo === 'ok' ? [660, 880] : tipo === 'pip' ? [990] : [220, 180];
      notas.forEach((f, j) => {
        const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + j * 0.12;
        o.type = tipo === 'mal' ? 'triangle' : 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + 0.22);
      });
    } catch (e) { }
  }

  /* =================== UTILIDADES =================== */
  function barajar(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function bloquearHasta(el, keys, cb) { el.classList.add('espera'); play(keys, () => { el.classList.remove('espera'); if (cb) cb(); }); }
  function completar() { S.completo = true; actualizarNav(); }
  function sacudir(el) { if (!el) return; el.classList.remove('mal'); void el.offsetWidth; el.classList.add('mal'); }
  // "3/4" → fracción apilada (solo patrones número/número aislados)
  function fmt(v) {
    return String(v).replace(/(^|[^\d.,/])(\d+)\/(\d+)(?![\d/])/g, (m, pre, a, b) => `${pre}<span class="frac"><span>${a}</span><span>${b}</span></span>`);
  }
  const num = v => typeof v === 'number' ? v : parseFloat(String(v).replace(/\./g, '').replace(',', '.'));
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

  /* =================== VISUALES (por código) =================== */
  const COLORES = ['#e63946', '#2a9d8f', '#ffb703', '#3a86ff', '#8338ec', '#fb8500'];
  function autoSVG(color) {
    return `<svg viewBox="0 0 120 60" class="auto-svg"><path d="M8 42 L10 30 Q12 24 20 23 L38 21 L50 10 Q54 7 60 7 L84 7 Q92 7 97 13 L106 23 Q116 25 116 33 L116 42 Z" fill="${color}" stroke="#1b1b1b" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M54 12 L62 12 L62 22 L44 22 Z M67 12 L84 12 Q89 12 92 16 L97 22 L67 22 Z" fill="#cfe8ff" stroke="#1b1b1b" stroke-width="2"/>
      <circle cx="32" cy="44" r="10" fill="#222"/><circle cx="32" cy="44" r="4" fill="#bbb"/><circle cx="92" cy="44" r="10" fill="#222"/><circle cx="92" cy="44" r="4" fill="#bbb"/></svg>`;
  }
  function fraccionSVG(v) {
    const pin = '#22c55e', vac = '#ffffff', tr = '#1b1b1b';
    if (v.forma === 'circulo') {
      const n = v.partes, k = v.circulos || 1; let out = '', resto = v.pintadas;
      for (let c = 0; c < k; c++) {
        let s = `<svg viewBox="-52 -52 104 104" class="fr-circ">`;
        for (let i = 0; i < n; i++) {
          const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
          const x0 = 48 * Math.cos(a0), y0 = 48 * Math.sin(a0), x1 = 48 * Math.cos(a1), y1 = 48 * Math.sin(a1);
          s += `<path d="M0 0 L${x0.toFixed(2)} ${y0.toFixed(2)} A48 48 0 ${n === 1 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="${resto > 0 ? (v.gris ? '#bdbdbd' : pin) : vac}" stroke="${tr}" stroke-width="2"/>`;
          resto--;
        }
        if (v.cuartos) s += `<line x1="0" y1="-50" x2="0" y2="50" stroke="${tr}" stroke-width="5.5" stroke-linecap="round"/><line x1="-50" y1="0" x2="50" y2="0" stroke="${tr}" stroke-width="5.5" stroke-linecap="round"/>`;
        out += s + '</svg>';
      }
      return `<div class="fr-wrap">${out}</div>`;
    }
    if (v.forma === 'cuadros') { // grupos de grillas (enteros)
      return `<div class="fr-wrap">${v.grupos.map(g => {
        let s = `<div class="fr-grid" style="--c:${g.cols}">`;
        for (let i = 0; i < g.filas * g.cols; i++) s += `<i class="${(g.mapa ? g.mapa[i] : i < g.pintadas) ? 'p' : ''}"></i>`;
        return s + '</div>';
      }).join('')}</div>`;
    }
    if (v.forma === 'barras') { // barras de cereal
      let s = '<div class="fr-wrap barras">';
      for (let i = 0; i < v.n; i++) s += `<div class="barra">${v.emoji || '🍫'}</div>`;
      return s + (v.nota ? `<div class="fr-nota">${v.nota}</div>` : '') + '</div>';
    }
    if (v.forma === 'reloj') {
      const m = v.minutos, a = m / 60 * 2 * Math.PI, x = 40 * Math.sin(a), y = -40 * Math.cos(a);
      const large = m > 30 ? 1 : 0;
      let s = `<svg viewBox="-52 -52 104 104" class="fr-circ"><circle r="48" fill="#fff" stroke="${tr}" stroke-width="3"/>`;
      if (m > 0 && m < 60) s += `<path d="M0 0 L0 -44 A44 44 0 ${large} 1 ${(44 * Math.sin(a)).toFixed(2)} ${(-44 * Math.cos(a)).toFixed(2)} Z" fill="${pin}" opacity=".55"/>`;
      for (let h = 0; h < 12; h++) { const b = h / 12 * 2 * Math.PI; s += `<line x1="${(42 * Math.sin(b)).toFixed(1)}" y1="${(-42 * Math.cos(b)).toFixed(1)}" x2="${(47 * Math.sin(b)).toFixed(1)}" y2="${(-47 * Math.cos(b)).toFixed(1)}" stroke="${tr}" stroke-width="${h % 3 ? 1.5 : 3}"/>`; }
      s += `<line x1="0" y1="0" x2="0" y2="-40" stroke="${tr}" stroke-width="3" stroke-linecap="round"/><line x1="0" y1="0" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#e63946" stroke-width="3" stroke-linecap="round"/><circle r="3.5" fill="${tr}"/></svg>`;
      return `<div class="fr-wrap">${s}</div>`;
    }
    return '';
  }
  function rectaSVG(v, id) {
    // v: {min, max, paso (marca chica), cada (cada cuántas marcas va etiqueta), etiquetas:[..] opcional, marca: valor}
    const W = 600, x0 = 30, x1 = 570, n = Math.round((v.max - v.min) / v.paso);
    const X = val => x0 + (val - v.min) / (v.max - v.min) * (x1 - x0);
    let s = `<svg viewBox="0 0 ${W} 116" class="recta-svg"${id ? ` id="${id}"` : ''}><line x1="${x0 - 18}" y1="60" x2="${x1 + 18}" y2="60" stroke="#3b2a6b" stroke-width="4"/>
      <path d="M${x1 + 22} 60 l-12 -7 v14 Z M${x0 - 22} 60 l12 -7 v14 Z" fill="#3b2a6b"/>`;
    for (let i = 0; i <= n; i++) {
      const val = v.min + i * v.paso, x = X(val), big = i % (v.cada || 1) === 0;
      s += `<line x1="${x.toFixed(1)}" y1="${big ? 42 : 50}" x2="${x.toFixed(1)}" y2="${big ? 78 : 70}" stroke="#3b2a6b" stroke-width="${big ? 3.5 : 2}"/>`;
      if (big) s += `<text x="${x.toFixed(1)}" y="106" text-anchor="middle" class="rt">${v.fmt ? v.fmt(val) : fmtNum(val, v.dec)}</text>`;
    }
    if (v.marca != null) s += `<circle cx="${X(v.marca).toFixed(1)}" cy="60" r="9" fill="#e63946" stroke="#fff" stroke-width="2"/><path d="M${X(v.marca).toFixed(1)} 30 l-9 -14 h18 Z" fill="#e63946"/><text x="${X(v.marca).toFixed(1)}" y="12" text-anchor="middle" class="rt q">?</text>`;
    s += '<g class="marcas"></g></svg>';
    return s;
  }
  function fmtNum(n, dec) {
    if (dec) { const r = +n.toFixed(dec); return Number.isInteger(r) ? String(r) : r.toFixed(dec).replace('.', ','); }
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  function visualHTML(v) {
    if (!v) return '';
    switch (v.tipo) {
      case 'figura':
        if (v.cajas) {   // opciones marcables DENTRO de la imagen: casilleros tocables
          const pc = n => (n * 100).toFixed(2) + '%';
          return `<div class="fig-wrap"><img class="figura" src="${v.src}" alt="">${v.cajas.map((c, j) => { const z = c.zona, b = c.caja;
            return `<button class="hot" data-v="${'ABCD'[j]}" aria-label="Opción ${'ABCD'[j]}" style="left:${pc(z[0])};top:${pc(z[1])};width:${pc(z[2] - z[0])};height:${pc(z[3] - z[1])}"><i class="caja" style="left:${pc((b[0] - z[0]) / (z[2] - z[0]))};top:${pc((b[1] - z[1]) / (z[3] - z[1]))};width:${pc((b[2] - b[0]) / (z[2] - z[0]))};height:${pc((b[3] - b[1]) / (z[3] - z[1]))}"><svg viewBox="0 0 10 10"><path class="tilde" d="M2 5.3 4.2 7.4 8.2 2.6"/><path class="cruz" d="M2.5 2.5 7.5 7.5M7.5 2.5 2.5 7.5"/></svg></i></button>`; }).join('')}</div>`;
        }
        return `<img class="figura" src="${v.src}" alt="">`;
      case 'img': return `<img class="masc grande" src="${v.src}" alt="" onerror="this.style.display='none'">`;
      case 'serie': return `<div class="serie">${v.nums.map(n => n == null ? '<div class="tarjeta hueco titila">?</div>' : `<div class="tarjeta">${n}</div>`).join('')}</div>`;
      case 'fila': return `<div class="fila-num" style="--c:${v.valores.length}">${v.valores.map((n, i) => `<div class="fc${n == null ? ' vacia' : ''}${(v.resaltar || []).includes(i) ? ' luz' : ''}">${n == null ? '' : n}</div>`).join('')}</div>`;
      case 'personas': {
        const caras = ['🧔', '👩', '🧑', '👧', '👦', '👱‍♀️'];
        return `<div class="personas">${v.tickets.map((t, i) => `<div class="persona${v.destacar === i ? ' dest titila' : ''}"><div class="cara">${caras[i % caras.length]}</div>${v.nombres && v.nombres[i] ? `<div class="pn">${v.nombres[i]}</div>` : ''}<div class="ticket">${t == null ? '?' : t}</div></div>`).join('')}</div>`;
      }
      case 'autos': return `<div class="autos">${v.autos.map(a => `<div class="auto-c">${autoSVG(a.color)}<div class="cont-v">${a.n}</div></div>`).join('')}</div>`;
      case 'recta': return `<div class="recta-wrap">${rectaSVG(v)}</div>`;
      case 'fraccion': return fraccionSVG(v);
      case 'tabla': return `<table class="tabla-datos"><thead><tr>${v.cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${v.filas.map(f => `<tr>${f.map(c => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>${v.fuente ? `<div class="fuente-t">${v.fuente}</div>` : ''}`;
      case 'tarjetasPuntaje': return `<div class="puntajes">${v.valores ? `<div class="pt-val">${v.valores}</div>` : ''}<div class="pt-fila">${v.jugadores.map(j => `<div class="pt-caja"><div class="pt-nom">${j.nombre}</div>${j.lineas.map(l => `<div>${l}</div>`).join('')}</div>`).join('')}</div></div>`;
      case 'svg': return `<div class="vis-svg">${v.html}</div>${v.pie ? `<div class="fr-nota">${fmt(v.pie)}</div>` : ''}`;
      case 'emoji': return `<div class="vis-emoji">${v.e}</div>`;
      case 'texto': return `<div class="vis-texto">${fmt(v.html)}</div>`;
      case 'posiciones': return `<table class="tabla-datos pos"><thead><tr>${v.cab.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody><tr>${v.cifras.map((c, i) => `<td class="${(v.resaltar || []).includes(i) ? 'luz' : ''}">${c}</td>`).join('')}</tr></tbody></table>`;
    }
    return '';
  }

  /* =================== NAVEGACIÓN =================== */
  const REQUIERE = { opcion: 1, vf: 1, completar: 1, asociar: 1, recta: 1, huecos: 1, ordenar: 1, lectura: 1 };
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
    document.body.classList.toggle('sin-barras', P.tipo === 'portada' || P.tipo === 'cierre');
    $('#titulo').innerHTML = P.titulo || '';
    $('#prog').textContent = i + ' / ' + (D.pantallas.length - 2);
    pintarPuntos();
    const bt = $('#btnTexto'); if (bt) { bt.hidden = ['portada', 'cierre', 'lectura'].includes(P.tipo); ubicarAviso(); }
    const lc = $('#lector'); if (lc) lc.classList.remove('ver');
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
    activarLightbox(); play(P.audio);
  };
  R.cierre = function (P, M) {
    const t = S.aciertos + S.errores, pc = t ? Math.round(S.aciertos / t * 100) : 0;
    M.innerHTML = `<div class="cierre">
      <h1>🎉 ¡Terminaste!</h1>
      <img class="cie-img" src="${P.img}" alt="" onerror="this.style.display='none'">
      <div class="stats"><div>✅ Aciertos<b>${S.aciertos}</b></div><div>❌ Errores<b>${S.errores}</b></div><div>📊 Total<b>${pc}%</b></div><div>⭐ Puntos<b>${S.puntos}</b></div></div>
      ${S.proc ? `<table class="resumen"><tr><th>Proceso evaluado</th><th>Primer intento</th></tr>${Object.keys(S.proc).map(k => `<tr><td>${k}</td><td>${S.proc[k].ok} de ${S.proc[k].tot}</td></tr>`).join('')}</table>` : ''}
      <button class="btn enviar" id="btnEnviar">📤 Enviar mis resultados a la seño</button>
      <div class="cie-fila"><button class="btn grande" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div></div>`;
    S.intento = S.intento || 1;
    if (!S.primero) S.primero = { aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos };   // puntaje del primer intento
    $('#btnOtra').onclick = () => { Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, proc: null, intento: S.intento + 1 }); ir(0); };
    $('#btnEnviar').onclick = () => abrirEnvio({ aciertos: S.aciertos, errores: S.errores, pc, puntos: S.puntos, proc: S.proc });
    activarLightbox(); play(P.audio);
  };

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
  window.MOTOR_TARJETA = (nom, gr) => tarjeta({ aciertos: S.aciertos, errores: S.errores, pc: 0, puntos: S.puntos, proc: S.proc }, nom, gr);

  /* ---- Narración por pasos: cada paso puede cambiar el visual ---- */
  R.pasos = function (P, M) {
    M.innerHTML = `<div class="pasos">
      <div class="vis" id="vis"></div>
      <div class="puntitos">${P.pasos.map(() => '<i></i>').join('')}</div>
      <div class="caption grande" id="cap"></div>
      <button class="btn chico" id="btnRep">🔁 Escuchar otra vez</button></div>`;
    const cap = $('#cap'), vis = $('#vis'), dots = $$('.puntitos i', M);
    let actual = null;
    function correr() {
      let i = 0;
      const paso = () => {
        if (i >= P.pasos.length) { completar(); return; }
        const st = P.pasos[i];
        const v = st.visual || (i === 0 ? (P.visual || { tipo: 'img', src: P.img }) : null);
        if (v && v !== actual) { vis.innerHTML = visualHTML(v); actual = v; vis.classList.remove('entra'); void vis.offsetWidth; vis.classList.add('entra'); }
        dots.forEach((d, j) => { d.classList.toggle('on', j === i); d.classList.toggle('hecho', j < i); });
        cap.innerHTML = fmt(st.texto); cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra');
        if (st.tab) { tabPrep(vis, st.tab); if (st.tab.fin != null) tabRecorrer(vis, st.tab, st.tab.demora || 1800); } else if (vis.querySelector('.mano-tab')) tabPrep(vis, null);
        i++; play(st.audio, paso);
      };
      paso();
    }
    $('#btnRep').onclick = () => { pararAudio(); actual = null; correr(); };
    correr();
  };


  /* ---- Tablero animado: casillero nombrado titila + manito que recorre los saltos ---- */
  const TB = { gen: 0 };
  function tabCas(vis, n) { return vis.querySelector(`.cas[data-n="${n}"]`); }
  function tabPrep(vis, t) {
    TB.gen++;
    const sv = vis.querySelector('.vis-svg');
    $$('.cas', vis).forEach(c => c.classList.remove('luz', 'meta', 'pisa'));
    if (!sv || !t) { const m = vis.querySelector('.mano-tab'); if (m) m.remove(); return; }
    (t.luz || [t.ini]).forEach(n => { const c = tabCas(vis, n); if (c) c.classList.add('luz'); });
    sv.style.position = 'relative';
    let m = sv.querySelector('.mano-tab'); if (!m) { m = document.createElement('div'); m.className = 'mano-tab'; m.innerHTML = '👆<b></b>'; sv.appendChild(m); }
    m.querySelector('b').textContent = ''; tabMano(sv, m, t.ini, true);
  }
  function tabMano(sv, m, n, sinAnim) {
    const c = tabCas(sv, n); if (!c) return;
    const a = c.getBoundingClientRect(), b = sv.getBoundingClientRect();
    if (sinAnim) { m.style.transition = 'none'; void m.offsetWidth; }
    m.style.left = (a.left - b.left + a.width / 2) + 'px'; m.style.top = (a.top - b.top + a.height * 0.72) + 'px';
    if (sinAnim) { void m.offsetWidth; m.style.transition = ''; }
  }
  function tabRecorrer(vis, t, demora) {
    const g = ++TB.gen, sv = vis.querySelector('.vis-svg'); if (!sv || !t || t.fin == null) return;
    const m = sv.querySelector('.mano-tab'); if (!m) return;
    const paso = t.fin > t.ini ? 1 : -1, total = Math.abs(t.fin - t.ini), rap = window.__RAPIDO ? 10 : 1;
    $$('.cas', vis).forEach(c => c.classList.remove('luz'));
    const ini = tabCas(vis, t.ini); if (ini) ini.classList.add('pisa');
    let k = 0;
    const salto = () => {
      if (g !== TB.gen) return;
      if (k >= total) { const f = tabCas(vis, t.fin); if (f) f.classList.add('meta'); return; }
      k++; const n = t.ini + paso * k;
      tabMano(sv, m, n); m.querySelector('b').textContent = (paso > 0 ? '+' : '−') + k; sonido('pip');
      const c = tabCas(vis, n); if (c && k < total) c.classList.add('pisa');
      setTimeout(salto, 650 / rap);
    };
    setTimeout(salto, (demora == null ? 300 : demora) / rap);
  }

  /* ---- Pistas ---- */
  function pistasHTML(pistas) { return `<ol class="pistas">${pistas.map(p => `<li class="oculta">${p.texto}</li>`).join('')}</ol>`; }

  /* ---- Opción múltiple (única o varias correctas) ---- */
  R.opcion = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="opcion">
      <div class="col-izq" id="vis"></div>
      <div class="col-der"><span class="cont" id="cont"></span><div id="preg"></div><div class="ops" id="ops"></div><div id="ver"></div></div></div>`;
    const vis = $('#vis'), preg = $('#preg'), ops = $('#ops'), ver = $('#ver');
    function ronda(primero) {
      const rd = P.rondas[ri], multi = Array.isArray(rd.respuestas);
      $('#cont').textContent = P.rondas.length > 1 ? (ri + 1) + ' / ' + P.rondas.length : '';
      const v = rd.visual || P.visual || { tipo: 'img', src: P.img };
      vis.innerHTML = visualHTML(v);
      vis.className = 'col-izq v-' + v.tipo;
      if (rd.tab) setTimeout(() => tabPrep(vis, rd.tab), 30);
      const hot = !!(P.fijo && v.cajas);
      $('.opcion', M).classList.toggle('con-cajas', hot);
      $('.opcion', M).classList.toggle('fig-grande', !!v.grande);
      let h = '';
      if (rd.texto) h += `<div class="enunciado preg-txt">${fmt(rd.texto)}</div>`;
      if (rd.palabra) h += `<button class="palabra titila" id="pal">🔊 ${rd.palabra}</button>`;
      preg.innerHTML = h;
      const lim = D.lectura ? 24 : 10;   // en Lengua las opciones son palabras: entran en 2 columnas
      const largas = rd.opciones.some(o => String(o).replace(/<[^>]+>/g, '').length > lim);
      ops.className = 'ops' + (largas ? ' una-col' : (D.lectura ? ' corta' : ''));
      if (P.fijo) {   // formato de prueba: orden fijo con letras A-D
        const soloL = rd.opciones.every(o => o === '');
        ops.className = 'ops fijo' + (soloL ? ' solo-letras' : (largas || rd.opciones.some(o => String(o).length > 6) ? ' una-col' : ''));
        ops.innerHTML = hot ? '' : rd.opciones.map((o, j) => { const L = 'ABCD'[j]; return `<button class="btn op" data-v="${L}"><b class="letra-op">${L}</b>${o === '' ? '' : ' ' + fmt(o)}</button>`; }).join('');
        ops.hidden = hot;
      } else
      ops.innerHTML = barajar(rd.opciones).map(o => `<button class="btn op" data-v="${String(o).replace(/"/g, '&quot;')}">${fmt(o)}</button>`).join('');
      const directo = multi && D.meta.multiDirecto;   // 1.° y 2.°: cada toque correcto queda marcado y suma
      ver.innerHTML = multi && !directo ? `<button class="btn verif" id="bVer">✔ Verificar</button>` : '';
      const pal = $('#pal', preg);
      if (pal) pal.onclick = () => { if (!ops.classList.contains('espera')) { pararAudio(); play(rd.audio); } };
      const zona = hot ? $('.fig-wrap', vis) : ops;
      const botones = () => hot ? $$('.hot', vis) : $$('.op', ops);
      zona.classList.add('espera'); ver.classList.add('espera');
      play([primero ? P.instr : null, rd.audio].filter(Boolean), () => { zona.classList.remove('espera'); ver.classList.remove('espera'); });
      const correctas = multi ? rd.respuestas.map(String) : [String(rd.respuesta)];
      const acertar = (sinBip) => {
        if (!sinBip) sonido('ok');
        botones().forEach(b => { if (correctas.includes(b.dataset.v)) { b.classList.remove('x'); b.classList.add('bien'); } });
        const hu = $('.hueco', vis); if (hu) { hu.textContent = rd.respuesta; hu.classList.remove('titila'); hu.classList.add('bien'); }
        // estándar: la respuesta queda escrita DENTRO de su lugar en el visual
        if (!multi) {
          if (v.tipo === 'fila') {
            const idx = v.valores.map((x, j) => x != null ? j : -1).filter(j => j >= 0);
            const i0 = idx[0], i1 = idx[idx.length - 1], a = v.valores[i0], b = v.valores[i1];
            const paso = (b - a) / (i1 - i0), j = Math.round((num(rd.respuesta) - a) / paso) + i0;
            const celda = $$('.fc', vis)[j];
            if (celda && !v.valores[j]) { celda.textContent = rd.respuesta; celda.classList.add('bien'); }
          }
          if (v.tipo === 'personas' && v.destacar != null) {
            const t = $$('.ticket', vis)[v.destacar]; if (t) { t.textContent = rd.respuesta; t.classList.add('bien'); }
          }
          if (v.tipo === 'recta') { const q = $('.recta-svg .rt.q', vis); if (q) { q.textContent = rd.respuesta; q.classList.add('ok'); } }
        }
        if (pal) pal.classList.remove('titila');
        if (rd.tab) tabRecorrer(vis, rd.tab);
        ver.classList.add('espera');
        bloquearHasta(zona, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(false); else { zona.classList.add('espera'); completar(); } });
      };
      if (!multi) {
        botones().forEach(b => b.onclick = ev => {
          ev.stopPropagation();
          if (zona.classList.contains('espera') || b.classList.contains('bien')) return;
          const ok = b.dataset.v === correctas[0];
          if (P.fijo) evaluar(S.i + ':' + rd.id, ok, rd.proceso);
          evaluar(S.i + ':' + rd.id, ok);
          if (ok) acertar(); else { sonido('mal'); if (hot) { b.classList.add('x'); sacudir(b.firstElementChild); } else sacudir(b); bloquearHasta(zona, (rd.pistas && rd.pistas[b.dataset.v]) || P.err); }
        });
      } else if (directo) {
        const hechas = new Set();
        $$('.op', ops).forEach(b => b.onclick = () => {
          if (ops.classList.contains('espera') || b.classList.contains('bien') || b.classList.contains('x')) return;
          const v = b.dataset.v, ok = correctas.includes(v);
          evaluar(S.i + ':' + rd.id + ':' + v, ok);
          if (ok) { sonido('ok'); b.classList.add('bien'); hechas.add(v); if (hechas.size === correctas.length) acertar(true); }
          else { sonido('mal'); sacudir(b); b.classList.add('x'); bloquearHasta(ops, P.err); }
        });
      } else {
        $$('.op', ops).forEach(b => b.onclick = () => { if (!ops.classList.contains('espera')) b.classList.toggle('sel'); });
        $('#bVer').onclick = () => {
          if (ops.classList.contains('espera')) return;
          const sel = $$('.op.sel', ops).map(b => b.dataset.v);
          if (!sel.length) return;
          const ok = sel.length === correctas.length && sel.every(s => correctas.includes(s));
          evaluar(S.i + ':' + rd.id, ok);
          if (ok) { $$('.op', ops).forEach(b => b.classList.remove('sel')); acertar(); }
          else { sonido('mal'); $$('.op.sel', ops).forEach(b => { sacudir(b); b.classList.remove('sel'); }); bloquearHasta(ops, P.err); }
        };
      }
    }
    ronda(true);
  };

  /* ---- Verdadero / Falso (una afirmación a la vez) ---- */
  R.vf = function (P, M) {
    let idx = 0;
    const et = P.etiquetas || ['✅ Verdadero', '❌ Falso'];
    M.innerHTML = `<div class="vf">
      <div class="col-izq" id="vis">${visualHTML(P.visual || { tipo: 'img', src: P.img })}</div>
      <div class="col-der">${P.enunciado ? `<div class="enunciado vf-enun">${fmt(P.enunciado)}</div>` : ''}<span class="cont" id="cont"></span><div class="afirma" id="afirma"></div>
      <div class="vf-bots" id="bots"><button class="btn v" data-v="1">${et[0]}</button><button class="btn f" data-v="0">${et[1]}</button></div></div></div>`;
    const af = $('#afirma'), bots = $('#bots');
    $('#vis').className = 'col-izq v-' + ((P.visual || {}).tipo || 'img');
    function mostrar(primero) {
      const it = P.items[idx];
      $('#cont').textContent = (idx + 1) + ' / ' + P.items.length;
      af.className = 'afirma'; af.innerHTML = fmt(it.texto); void af.offsetWidth; af.classList.add('entra', 'titila');
      if (it.tab || $('#vis .cas')) setTimeout(() => tabPrep($('#vis'), it.tab || null), 30);
      bloquearHasta(bots, primero ? [P.instr, it.audio] : it.audio);
    }
    $$('button', bots).forEach(b => b.onclick = () => {
      if (bots.classList.contains('espera')) return;
      const it = P.items[idx], ok = (b.dataset.v === '1') === it.v;
      evaluar(S.i + ':' + it.id, ok);
      if (ok) {
        sonido('ok'); af.classList.remove('titila'); af.classList.add('bien');
        if (it.tab) tabRecorrer($('#vis'), it.tab);
        bloquearHasta(bots, it.ok, () => { idx++; if (idx < P.items.length) mostrar(false); else { bots.classList.add('espera'); completar(); } });
      } else { sonido('mal'); sacudir(af); bloquearHasta(bots, P.err); }
    });
    mostrar(true);
  };

  /* ---- Completar el cuadro (tocar tarjeta → tocar casillero) ---- */
  R.completar = function (P, M) {
    const ncols = Math.max(...P.filas.map(f => f.length)), paso = P.paso || 1;
    const tabla = P.filas.map(f => { const base = f.find(v => v != null); const i0 = f.indexOf(base); return f.map((v, j) => ({ v, correcto: base + (j - i0) * paso })); });
    M.innerHTML = `<div class="completar">
      <div class="tabla${P.filas.length > 6 ? ' grande' : ''}${ncols > 6 ? ' ancha' : ''}" id="tb" style="--cols:${ncols};--filas:${P.filas.length}">${tabla.map(f => f.map(c => c.v != null ? `<div class="casi dado">${fmtNum(c.v)}</div>` : `<div class="casi vacio" data-c="${c.correcto}"></div>`).join('')).join('')}</div>
      <div class="enunciado">TOCÁ UNA TARJETA Y DESPUÉS SU CASILLERO</div>
      <div class="tarjetas" id="tj">${barajar(P.tarjetas).map(n => `<button class="tarjeta mov" data-n="${n}">${n}</button>`).join('')}</div></div>`;
    const tb = $('#tb'), tj = $('#tj'), zona = $('.completar', M);
    let sel = null;
    $$('.mov', tj).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera') || b.classList.contains('usada')) return;
      $$('.mov', tj).forEach(x => x.classList.remove('sel'));
      sel = b; b.classList.add('sel');
      if (P.audioTarjeta) { pararAudio(); play(P.audioTarjeta + b.dataset.n); }
    });
    $$('.vacio', tb).forEach(c => c.onclick = () => {
      if (zona.classList.contains('espera') || !sel || c.classList.contains('lleno')) return;
      const n = +sel.dataset.n, ok = +c.dataset.c === n;
      evaluar(S.i + ':' + n, ok);
      if (ok) {
        sonido('ok'); c.textContent = n; c.classList.add('lleno', 'bien');
        sel.classList.remove('sel'); sel.classList.add('usada'); sel = null;
        if (!$$('.mov:not(.usada)', tj).length) { pararAudio(); bloquearHasta(zona, P.ok, () => { zona.classList.add('espera'); completar(); }); }
      } else { sonido('mal'); sacudir(c); sacudir(sel); pararAudio(); bloquearHasta(zona, P.err); }
    });
    bloquearHasta(zona, P.instr);
  };

  /* ---- Asociar (tocar izquierda → tocar derecha) ---- */
  R.asociar = function (P, M) {
    const der = barajar(P.pares.map((p, i) => ({ t: p.b, i })));
    const izq = barajar(P.pares.map((p, i) => ({ t: p.a, i })));
    M.innerHTML = `<div class="asociar">
      ${P.cab ? `<div class="as-cab"><span>${P.cab[0]}</span><span>${P.cab[1]}</span></div>` : ''}
      <div class="as-cols"><div class="as-col" id="ai">${izq.map(x => `<button class="as-it" data-i="${x.i}">${fmt(x.t)}</button>`).join('')}</div>
      <div class="as-col" id="ad">${der.map(x => `<button class="as-it" data-i="${x.i}">${fmt(x.t)}</button>`).join('')}</div></div></div>`;
    const zona = $('.asociar', M); let sel = null, hechos = 0;
    $$('#ai .as-it', M).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera') || b.classList.contains('ok')) return;
      $$('#ai .as-it', M).forEach(x => x.classList.remove('sel')); sel = b; b.classList.add('sel');
    });
    $$('#ad .as-it', M).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera') || !sel || b.classList.contains('ok')) return;
      const i = +sel.dataset.i, ok = +b.dataset.i === i;
      evaluar(S.i + ':' + i, ok);
      if (ok) {
        sonido('ok'); const col = COLORES[hechos % COLORES.length]; hechos++;
        [sel, b].forEach(x => { x.classList.remove('sel'); x.classList.add('ok'); x.style.background = col; x.style.borderColor = col; });
        sel = null;
        const fin = hechos === P.pares.length;
        bloquearHasta(zona, P.pares[i].ok, fin ? () => { play(P.ok, () => { zona.classList.add('espera'); completar(); }); zona.classList.add('espera'); } : null);
      } else { sonido('mal'); sacudir(b); sacudir(sel); bloquearHasta(zona, P.err); }
    });
    bloquearHasta(zona, P.instr);
  };

  /* ---- Recta numérica: ubicar cada ficha tocando la recta ---- */
  R.recta = function (P, M) {
    let idx = 0;
    const r = P.recta, snap = P.snap || r.paso;
    M.innerHTML = `<div class="recta-act">
      <div class="fichas" id="fichas">${P.items.map((it, j) => `<div class="ficha" data-j="${j}" style="--col:${COLORES[j % COLORES.length]}">🏃 ${fmt(it.etiqueta)}</div>`).join('')}</div>
      <div class="enunciado" id="enun"></div>
      <div class="recta-wrap tocable" id="rw">${rectaSVG(r, 'rsvg')}</div></div>`;
    const svg = $('#rsvg'), marcas = $('.marcas', svg), zona = $('.recta-act', M), x0 = 30, x1 = 570;
    const X = val => x0 + (val - r.min) / (r.max - r.min) * (x1 - x0);
    function mostrar(primero) {
      const it = P.items[idx];
      $$('.ficha', M).forEach(f => f.classList.toggle('actual', +f.dataset.j === idx));
      $$('.ficha', M)[idx].classList.add('titila');
      $('#enun').innerHTML = `UBICÁ A ${fmt(it.etiqueta)}`;
      bloquearHasta(zona, primero ? [P.instr, it.audio] : it.audio);
    }
    svg.addEventListener('click', ev => {
      if (zona.classList.contains('espera') || idx >= P.items.length) return;
      const b = svg.getBoundingClientRect(); if (!b.width) return;
      const xs = (ev.clientX - b.left) / b.width * 600;
      const val = r.min + Math.round(((xs - x0) / (x1 - x0) * (r.max - r.min)) / snap) * snap;
      tocar(val);
    });
    function tocar(val) {
      const it = P.items[idx], ok = Math.abs(val - it.valor) < snap / 2;
      evaluar(S.i + ':' + it.id, ok);
      const ficha = $$('.ficha', M)[idx];
      if (ok) {
        sonido('ok');
        marcas.insertAdjacentHTML('beforeend', `<g><circle cx="${X(it.valor).toFixed(1)}" cy="60" r="10" fill="${COLORES[idx % COLORES.length]}" stroke="#fff" stroke-width="2"/><text x="${X(it.valor).toFixed(1)}" y="${idx % 2 ? 36 : 28}" text-anchor="middle" class="rt nm" fill="${COLORES[idx % COLORES.length]}">${it.corto || ''}</text></g>`);
        ficha.classList.remove('titila', 'actual'); ficha.classList.add('ubicada');
        bloquearHasta(zona, it.ok, () => { idx++; if (idx < P.items.length) mostrar(false); else { zona.classList.add('espera'); completar(); } });
      } else {
        sonido('mal'); sacudir(ficha);
        const m = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        m.setAttribute('x', X(val)); m.setAttribute('y', 66); m.setAttribute('class', 'rt x'); m.setAttribute('text-anchor', 'middle'); m.textContent = '✖';
        marcas.appendChild(m); setTimeout(() => m.remove(), 900);
        bloquearHasta(zona, P.err);
      }
    }
    R.recta._tocar = tocar;   // para el test
    mostrar(true);
  };

  /* =================== LENGUA: lectura, huecos, ordenar =================== */
  // Texto de lectura (D.lectura = { titulo, img, parrafos: [[{ t, audio }]] })
  function textoHTML(conAudio) {
    const L = D.lectura;
    return `<div class="lec-texto"><h2 class="lec-tit">${L.titulo}</h2>${L.parrafos.map((par, pi) => `<p class="lec-par" data-p="${pi}">${par.map((o, oi) => `<span class="lec-or" data-k="${o.audio}">${o.t}</span>`).join(' ')}${conAudio ? ` <button class="lec-oir" data-p="${pi}" aria-label="Escuchar el párrafo">🔊</button>` : ''}</p>`).join('')}</div>`;
  }
  function leerOraciones(cont, keys, cb) {
    // lee una lista de oraciones resaltando la que suena
    let i = 0;
    const sig = () => {
      $$('.lec-or', cont).forEach(x => x.classList.remove('leyendo'));
      if (i >= keys.length) { if (cb) cb(); return; }
      const k = keys[i++], sp = $(`.lec-or[data-k="${k}"]`, cont);
      if (sp) { sp.classList.add('leyendo'); try { sp.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) { } }
      play(k, sig);
    };
    sig();
  }
  R.lectura = function (P, M) {
    const L = D.lectura, todas = L.parrafos.flat().map(o => o.audio);
    M.innerHTML = `<div class="lectura">
      ${L.img ? `<img class="lec-img" src="${L.img}" alt="" onerror="this.style.display='none'">` : ''}
      <div class="lec-col">${textoHTML(!P.narrado)}
      <div class="lec-bots">${P.narrado ? '<button class="btn chico" id="btnRep">🔁 Escuchar otra vez</button>' : '<span class="lec-ayuda">Tocá 🔊 si querés escuchar un párrafo</span>'}</div></div></div>`;
    const cont = $('.lectura', M);
    if (P.narrado) {
      const correr = () => { pararAudio(); play(P.instr, () => leerOraciones(cont, todas, completar)); };
      $('#btnRep').onclick = () => { pararAudio(); leerOraciones(cont, todas, completar); };
      correr();
    } else {
      $$('.lec-oir', cont).forEach(b => b.onclick = () => { pararAudio(); leerOraciones(cont, L.parrafos[+b.dataset.p].map(o => o.audio)); });
      play(P.instr); completar();
    }
  };
  function initLector() {
    if (!D.lectura || $('#btnTexto')) return;
    const b = document.createElement('button');
    b.id = 'btnTexto'; b.className = 'btn-texto'; b.innerHTML = '📖<span class="tx"> Texto</span>'; b.setAttribute('aria-label', 'Ver el texto'); b.hidden = true;
    $('header').insertBefore(b, $('#puntos'));
    const m = document.createElement('div'); m.id = 'lector';
    m.innerHTML = `<div class="lector-caja"><button id="lectorCerrar" aria-label="Cerrar">✕</button>${D.lectura.img ? `<img class="lec-img mini" src="${D.lectura.img}" alt="">` : ''}${textoHTML(true)}</div>`;
    document.body.appendChild(m);
    const av = document.createElement('button');
    av.id = 'avisoTexto'; av.className = 'aviso-texto'; av.hidden = true;
    av.innerHTML = `<i class="av-flecha"></i>${D.lectura.aviso || 'Tocá para leer el texto'} <span class="av-mano">👆</span>`;
    $('header').appendChild(av);
    b.onclick = av.onclick = () => { m.classList.add('ver'); };
    window.addEventListener('resize', ubicarAviso);
    $('#lectorCerrar').onclick = () => { m.classList.remove('ver'); pararAudio(); actualizarNav(); };
    $$('.lec-oir', m).forEach(x => x.onclick = () => { pararAudio(); leerOraciones(m, D.lectura.parrafos[+x.dataset.p].map(o => o.audio)); });
  }

  function ubicarAviso() {
    const b = $('#btnTexto'), av = $('#avisoTexto'); if (!b || !av) return;
    av.hidden = b.hidden; document.body.classList.toggle('con-aviso', !b.hidden); if (b.hidden) return;
    const h = $('header').getBoundingClientRect(), r = b.getBoundingClientRect();
    const cx = r.left + r.width / 2 - h.left;
    av.style.right = Math.max(4, h.width - cx - 22) + 'px';
  }

  /* ---- Completar frases con palabras (un hueco a la vez) ---- */
  // P.frases: [{ id, html: 'SE LLAMA ___', resp: ['BATATA'], ico, ok }], P.banco: palabras (incluye distractores)
  R.huecos = function (P, M) {
    let fi = 0, hi = 0;
    P.frases.forEach(f => { f._usadas = []; });
    M.innerHTML = `<div class="huecos${P.visual ? ' con-vis' : ''}">
      ${P.visual ? `<div class="vis hu-vis">${visualHTML(P.visual)}</div>` : ''}
      <div class="hu-der">
      ${P.texto ? `<div class="enunciado preg-txt">${P.texto}</div>` : ''}
      <div class="hu-frases">${P.frases.map((f, i) => { let h = 0; return `<div class="hu-frase" data-f="${i}">${f.ico ? `<span class="hu-ico">${f.ico}</span>` : ''}<span>${f.html.replace(/___/g, () => `<span class="hueco-p" data-h="${h++}"></span>`)}</span></div>`; }).join('')}</div>
      <div class="hu-banco" id="banco">${barajar(P.banco).map(w => `<button class="btn pal" data-w="${w}">${w}</button>`).join('')}</div></div></div>`;
    const zona = $('.huecos', M), banco = $('#banco');
    const actual = () => $(`.hu-frase[data-f="${fi}"] .hueco-p[data-h="${hi}"]`, M);
    const marcar = () => { $$('.hueco-p', M).forEach(x => x.classList.remove('titila')); const a = actual(); if (a) a.classList.add('titila'); };
    $$('.pal', banco).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera') || fi >= P.frases.length) return;
      const f = P.frases[fi];
      // f.libre: los huecos de la frase aceptan sus palabras en cualquier orden
      const pend = f.libre ? f.resp.filter(r => !(f._usadas || []).includes(r)) : [f.resp[hi]];
      const ok = pend.includes(b.dataset.w);
      if (ok && f.libre) (f._usadas = f._usadas || []).push(b.dataset.w);
      evaluar(S.i + ':' + f.id + ':' + hi, ok);
      if (ok) {
        sonido('ok'); const a = actual(); a.textContent = b.dataset.w; a.classList.remove('titila'); a.classList.add('lleno');
        if (P.usarUnaVez !== false) b.classList.add('usada');
        hi++;
        if (hi >= f.resp.length) {
          f._usadas = [];
          $(`.hu-frase[data-f="${fi}"]`, M).classList.add('bien');
          fi++; hi = 0;
          const fin = fi >= P.frases.length;
          bloquearHasta(zona, f.ok || null, () => { if (fin) play(P.ok, () => { zona.classList.add('espera'); completar(); }); else marcar(); });
          if (fin) zona.classList.add('espera');
        } else marcar();
      } else { sonido('mal'); sacudir(b); sacudir(actual()); bloquearHasta(zona, (f.err) || P.err); }
    });
    marcar();
    bloquearHasta(zona, P.instr);
  };

  /* ---- Ordenar: tocar en el orden correcto ---- */
  // P.items: textos en el orden correcto; se muestran mezclados
  R.ordenar = function (P, M) {
    let n = 0;
    const mez = (function () { let m; do { m = barajar(P.items.map((t, i) => ({ t, i }))); } while (m.every((x, j) => x.i === j)); return m; })();
    M.innerHTML = `<div class="ordenar">
      ${P.visual ? `<div class="vis or-vis">${visualHTML(P.visual)}</div>` : ''}
      ${P.texto ? `<div class="enunciado preg-txt">${P.texto}</div>` : ''}
      <div class="or-lista">${mez.map(x => `<button class="or-it" data-i="${x.i}"><b class="or-num"></b><span>${x.t}</span></button>`).join('')}</div></div>`;
    const zona = $('.ordenar', M);
    $$('.or-it', M).forEach(b => b.onclick = () => {
      if (zona.classList.contains('espera') || b.classList.contains('ok')) return;
      const ok = +b.dataset.i === n;
      evaluar(S.i + ':' + n, ok);
      if (ok) {
        sonido('ok'); b.classList.add('ok'); $('.or-num', b).textContent = ++n;
        if (n === P.items.length) { zona.classList.add('espera'); bloquearHasta(zona, P.ok, () => { zona.classList.add('espera'); completar(); }); }
      } else { sonido('mal'); sacudir(b); bloquearHasta(zona, P.err); }
    });
    bloquearHasta(zona, P.instr);
  };

  /* =================== ARRANQUE =================== */
  function init() {
    document.title = D.meta.titulo + ' · QueSepanTodos';
    document.body.classList.toggle('revision', !!D.meta.revision);
    document.body.classList.toggle('lengua', !!D.lectura);
    $('#btnSig').onclick = () => { if (!$('#btnSig').disabled) ir(S.i + 1); };
    $('#navPrev').onclick = () => ir(S.i - 1);
    $('#navNext').onclick = () => ir(S.i + 1);
    $('#revPrev').onclick = () => ir(S.i - 1);
    $('#revNext').onclick = () => ir(S.i + 1);
    initLightbox(); initLector();
    ir(0);
  }
  window.MOTOR = { ir, S, AQ, play, pararAudio, R, audiosUsados: () => Object.keys(D.audios) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
