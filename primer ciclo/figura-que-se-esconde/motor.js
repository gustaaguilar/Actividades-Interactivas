/* ============================================================
   motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
   Motor genérico de paquetes interactivos (mecánicas de arte:
   narración animada, clasificarUno, buscar, cuál destaca, V/F,
   taller de dibujo, pasos, foto, autoevaluación).
   ============================================================ */
(function () {
  'use strict';
  const D = window.DATOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  /* =================== ARTE: SVG generativo =================== */
  function rng(seed) { // mulberry32
    let a = (seed >>> 0) || 1;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f1 = n => Math.round(n * 10) / 10;
  function poly(pts) {
    let a = 0;
    for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; a += p[0] * q[1] - q[0] * p[1]; }
    if (a < 0) pts = pts.slice().reverse(); // horario en pantalla → unión con nonzero
    return 'M' + pts.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L') + 'Z';
  }
  function circ(cx, cy, r) { return `M${cx - r} ${cy}A${r} ${r} 0 1 1 ${cx + r} ${cy}A${r} ${r} 0 1 1 ${cx - r} ${cy}Z`; }
  function puntosEstrella(cx, cy, R, r) {
    const p = [];
    for (let k = 0; k < 10; k++) { const a = (-90 + k * 36) * Math.PI / 180, rr = k % 2 ? r : R; p.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
    return p;
  }
  const FORMAS = (function () {
    const rayos = [];
    for (let k = 0; k < 8; k++) {
      const a = k * 45 * Math.PI / 180, w = 13 * Math.PI / 180;
      rayos.push(poly([[50 + 31 * Math.cos(a - w), 50 + 31 * Math.sin(a - w)], [50 + 48 * Math.cos(a), 50 + 48 * Math.sin(a)], [50 + 31 * Math.cos(a + w), 50 + 31 * Math.sin(a + w)]]));
    }
    return {
      estrella: poly(puntosEstrella(50, 54, 48, 20)),
      corazon: 'M50 90C20 68 4 50 8 29C12 10 37 6 50 27C63 6 88 10 92 29C96 50 80 68 50 90Z',
      sol: circ(50, 50, 27) + rayos.join(''),
      arbol: 'M44 64C38 67 29 68 23 63A13 13 0 0 1 16 42A16 16 0 0 1 31 22A20 20 0 0 1 69 22A16 16 0 0 1 84 42A13 13 0 0 1 77 63C71 68 62 67 56 64C55 75 56 86 62 95L38 95C44 86 45 75 44 64Z',
      casa: poly([[50, 8], [68, 23.6], [68, 12], [78, 12], [78, 32.3], [95, 47], [83, 47], [83, 93], [17, 93], [17, 47], [5, 47]]),
      pez: 'M8 52C10 38 26 26 44 25C47 16 58 12 66 14C62 20 60 25 60 28C66 31 70 38 74 44C80 36 88 26 96 20C92 34 90 44 88 51' +
        'C90 58 92 68 96 82C88 76 80 66 74 58C70 64 64 70 56 73C58 80 52 86 46 86C46 82 45 78 42 76C28 76 12 66 8 52Z'
    };
  })();
  // Detalles interiores (líneas de ilustración): l = línea, b = círculo blanco, p = pupila
  const DETALLES = {
    pez: [['l', 'M33 36C39 44 39 58 33 66'], ['l', 'M8 52L15 54'], ['l', 'M78 47L90 33M79 51L91 51M78 55L90 69'], ['l', 'M50 30C52 24 56 20 61 18'],
          ['b', circ(21, 45, 5.5)], ['p', circ(22, 45, 2.6)]],
    casa: [['l', 'M42 93L42 68L58 68L58 93'], ['l', 'M24 55H36V67H24ZM30 55V67M24 61H36'], ['l', 'M64 55H76V67H64ZM70 55V67M64 61H76']],
    sol: [['p', circ(41, 45, 3.2)], ['p', circ(59, 45, 3.2)], ['l', 'M39 57C45 64 55 64 61 57']],
    arbol: [['l', 'M49 92C49 84 50 76 50 68M50 78L55 72'], ['l', 'M26 50C30 56 38 58 44 56'], ['l', 'M74 50C70 56 62 58 56 56']],
    corazon: [['l', 'M22 30C23 23 30 19 36 22']],
    estrella: []
  };
  function oscuro(hex) { if (!hex || hex[0] !== '#' || hex.length < 7) return false; const n = parseInt(hex.slice(1, 7), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; return (r * 299 + g * 587 + b * 114) / 1000 < 90; }
  function detallesSVG(forma, tr, k, color, fondoOjo) {
    return (DETALLES[forma] || []).map(([t, d]) =>
      t === 'l' ? `<path transform="${tr}" d="${d}" fill="none" stroke="${color}" stroke-width="${f1(2.6 / k)}" stroke-linecap="round" stroke-linejoin="round"/>` :
      t === 'b' ? `<path transform="${tr}" d="${d}" fill="${fondoOjo}" stroke="${color}" stroke-width="${f1(2 / k)}"/>` :
      `<path transform="${tr}" d="${d}" fill="${color}"/>`).join('');
  }

  function elemento(tipo, x, y, s, c, r) {
    const sw = f1(Math.max(1.5, s * 0.1));
    switch (tipo) {
      case 'flor': {
        let o = '', pr = s * 0.2, d = s * 0.24;
        for (let k = 0; k < 5; k++) { const a = k * 72 * Math.PI / 180 + r() * 0.5; o += `<circle cx="${f1(x + d * Math.cos(a))}" cy="${f1(y + d * Math.sin(a))}" r="${f1(pr)}" fill="${c}"/>`; }
        return o + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(pr * 0.8)}" fill="#fff3b0"/>`;
      }
      case 'puntos': {
        let o = ''; const n = 4 + Math.floor(r() * 4);
        for (let k = 0; k < n; k++) o += `<circle cx="${f1(x + (r() - 0.5) * s)}" cy="${f1(y + (r() - 0.5) * s)}" r="${f1(s * (0.05 + r() * 0.07))}" fill="${c}"/>`;
        return o;
      }
      case 'onda': {
        const h = s / 3, a = r() * 180;
        return `<path transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})" d="M${f1(x - s / 2)} ${f1(y)}q${f1(s / 8)} ${f1(-h)} ${f1(s / 4)} 0t${f1(s / 4)} 0t${f1(s / 4)} 0t${f1(s / 4)} 0" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
      }
      case 'zigzag': {
        const a = r() * 180, p = [];
        for (let k = 0; k < 6; k++) p.push(f1(x - s / 2 + k * s / 5) + ',' + f1(y + (k % 2 ? -s / 6 : s / 6)));
        return `<polyline transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})" points="${p.join(' ')}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
      }
      case 'hoja': {
        const a = r() * 180;
        return `<g transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(s * 0.38)}" ry="${f1(s * 0.16)}" fill="${c}"/><line x1="${f1(x - s * 0.34)}" y1="${f1(y)}" x2="${f1(x + s * 0.34)}" y2="${f1(y)}" stroke="#ffffff" stroke-opacity=".6" stroke-width="${f1(sw / 2)}"/></g>`;
      }
      case 'aro': return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s * 0.28)}" fill="none" stroke="${c}" stroke-width="${sw}"/>`;
      case 'linea': {
        const a = r() * Math.PI, dx = Math.cos(a) * s / 2, dy = Math.sin(a) * s / 2;
        return `<line x1="${f1(x - dx)}" y1="${f1(y - dy)}" x2="${f1(x + dx)}" y2="${f1(y + dy)}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
      }
      case 'casita': {
        const w = s * 0.62, h = s * 0.42;
        return `<rect x="${f1(x - w / 2)}" y="${f1(y - h / 4)}" width="${f1(w)}" height="${f1(h)}" fill="${c}"/>` +
          `<polygon points="${f1(x - w / 2 - s * 0.06)},${f1(y - h / 4)} ${f1(x)},${f1(y - h / 4 - s * 0.3)} ${f1(x + w / 2 + s * 0.06)},${f1(y - h / 4)}" fill="#6d2e1f"/>` +
          `<rect x="${f1(x - w * 0.12)}" y="${f1(y + h * 0.3)}" width="${f1(w * 0.24)}" height="${f1(h * 0.45)}" fill="#fff" fill-opacity=".8"/>`;
      }
      case 'nube':
        return `<g fill="#ffffff" stroke="${c}" stroke-width="${f1(sw * 0.6)}"><circle cx="${f1(x - s * 0.2)}" cy="${f1(y + s * 0.05)}" r="${f1(s * 0.18)}"/><circle cx="${f1(x + s * 0.2)}" cy="${f1(y + s * 0.05)}" r="${f1(s * 0.18)}"/><circle cx="${f1(x)}" cy="${f1(y - s * 0.07)}" r="${f1(s * 0.24)}"/></g>` +
          `<rect x="${f1(x - s * 0.2)}" y="${f1(y - s * 0.02)}" width="${f1(s * 0.4)}" height="${f1(s * 0.2)}" fill="#ffffff"/>`;
      case 'estrellita': return `<path d="${poly(puntosEstrella(x, y, s * 0.3, s * 0.13))}" fill="${c}"/>`;
      case 'arbolito':
        return `<rect x="${f1(x - s * 0.06)}" y="${f1(y)}" width="${f1(s * 0.12)}" height="${f1(s * 0.35)}" fill="#7f4f24"/><circle cx="${f1(x)}" cy="${f1(y - s * 0.08)}" r="${f1(s * 0.25)}" fill="${c}"/>`;
      case 'corazoncito': {
        const k = s * 0.55 / 100;
        return `<path transform="translate(${f1(x - 50 * k)} ${f1(y - 50 * k)}) scale(${f1(k * 1000) / 1000})" d="${FORMAS.corazon}" fill="${c}"/>`;
      }
    }
    return '';
  }

  let UID = 0;
  function fondoSVG(o, w, h) {
    const r = rng(o.seed || 1), x0 = o.x || 0, y0 = o.y || 0, W = o.w || w, H = o.h || h;
    const pal = Array.isArray(o.paleta) ? o.paleta : (D.paletas[o.paleta] || D.paletas.mixta);
    const tipos = o.tipos || ['flor', 'puntos', 'onda', 'hoja', 'aro'];
    const paso = o.paso || 26, dens = o.densidad == null ? 1 : o.densidad;
    let s = `<svg x="${x0}" y="${y0}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" overflow="hidden">`;
    if (o.bg !== 'none') s += `<rect width="${W}" height="${H}" fill="${o.bg || '#fff'}"/>`;
    for (let y = paso / 2; y < H + paso / 2; y += paso) {
      for (let x = paso / 2; x < W + paso / 2; x += paso) {
        if (r() > dens) continue;
        const t = tipos[Math.floor(r() * tipos.length)], c = pal[Math.floor(r() * pal.length)];
        s += elemento(t, x + (r() - 0.5) * paso * 0.7, y + (r() - 0.5) * paso * 0.7, paso * (0.75 + r() * 0.5), c, r);
      }
    }
    return s + '</svg>';
  }
  function figuraSVG(f) {
    const s = f.size, k = s / 100, tx = f1(f.cx - s / 2), ty = f1(f.cy - s / 2), d = FORMAS[f.forma];
    const tr = `translate(${tx} ${ty}) scale(${f1(k * 1000) / 1000})`;
    let o = '';
    if (f.halo) { const hc = f.haloColor || '#ffffff'; o += `<path transform="${tr}" d="${d}" fill="${hc}" stroke="${hc}" stroke-width="${f1((f.haloW || 26) / k)}" stroke-linejoin="round"/>`; }
    if (f.compleja) {
      const id = 'cp' + (++UID);
      o += `<clipPath id="${id}"><path transform="${tr}" d="${d}"/></clipPath><g clip-path="url(#${id})">` +
        fondoSVG(Object.assign({ bg: '#fff', densidad: 1, paso: 16 }, f.compleja, { x: f.cx - s / 2, y: f.cy - s / 2, w: s, h: s })) + '</g>';
      o += `<path transform="${tr}" d="${d}" fill="none" stroke="${f.stroke || '#333'}" stroke-width="${f1((f.strokeW || 3) / k)}" stroke-linejoin="round"/>`;
      if (!f.sinDetalles) o += detallesSVG(f.forma, tr, k, f.stroke || '#333', '#ffffff');
    } else {
      const fill = f.fill || '#e63946';
      o += `<path transform="${tr}" d="${d}" fill="${fill}"` + (f.strokeW ? ` stroke="${f.stroke || '#1b1b1b'}" stroke-width="${f1(f.strokeW / k)}" stroke-linejoin="round"` : '') + '/>';
      const dc = f.detalle || (oscuro(fill) ? '#ffffff' : (f.strokeW && oscuro(f.stroke || '#1b1b1b') ? (f.stroke || '#1b1b1b') : '#1b1b1b'));
      if (!f.sinDetalles) o += detallesSVG(f.forma, tr, k, dc, '#ffffff');
    }
    return o;
  }
  function capaSVG(c, w, h) {
    let inner = '';
    if (c.tipo === 'fondo') inner = fondoSVG(c, w, h);
    else if (c.tipo === 'figura') inner = figuraSVG(c);
    else if (c.tipo === 'rect') inner = `<rect x="${c.x || 0}" y="${c.y || 0}" width="${c.w || w}" height="${c.h || h}" rx="${c.rx || 0}" fill="${c.fill || '#fff'}"` + (c.stroke ? ` stroke="${c.stroke}" stroke-width="2"` : '') + '/>';
    else if (c.tipo === 'grupo') inner = (c.capas || []).map(x => capaSVG(x, w, h)).join('');
    return `<g class="capa${c.oculto ? ' oculto' : ''}"${c.id ? ` data-capa="${c.id}"` : ''}>${inner}</g>`;
  }
  function escenaSVG(e, extra) {
    return `<svg class="escena" viewBox="0 0 ${e.w} ${e.h}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">` +
      e.capas.map(c => capaSVG(c, e.w, e.h)).join('') + (extra || '') + '</svg>';
  }
  function iconoForma(id) { return `<svg viewBox="0 0 100 100" class="ico"><path d="${FORMAS[id]}" fill="currentColor"/>${detallesSVG(id, '', 0.55, '#ffffff', '#ffffff').replace(/transform="" /g, '')}</svg>`; }

  window.ARTE = { FORMAS, escenaSVG, fondoSVG, figuraSVG, elemento, rng };

  /* =================== ESTADO =================== */
  const S = { i: 0, aciertos: 0, errores: 0, puntos: 0, eval: {}, completo: false, fotoURL: null, obraURL: null, taller: null, salir: null };

  function evaluar(clave, ok) {
    if (S.eval[clave] !== undefined) return;
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
  function descargar(url, nombre) {
    const a = document.createElement('a'); a.href = url; a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
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

  /* =================== NAVEGACIÓN =================== */
  const REQUIERE = { clasificarUno: 1, buscar: 1, cualDestaca: 1, vf: 1, autoeval: 1 };
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
    $('#btnOtra').onclick = () => {
      Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, fotoURL: null, obraURL: null, taller: null });
      ir(0);
    };
    activarLightbox();
    play(P.audio);
  };

  /* ---- Narración animada (puntero sincronizado con audio) ---- */
  R.narracion = function (P, M) {
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
      if (st.apuntar) { mano.style.left = st.apuntar[0] + '%'; mano.style.top = st.apuntar[1] + '%'; mano.classList.add('ver'); }
      else mano.classList.remove('ver');
      cap.innerHTML = st.texto || ''; cap.classList.remove('entra'); void cap.offsetWidth; cap.classList.add('entra');
    }
    function correr() {
      Object.keys(ini).forEach(id => capa(id).classList.toggle('oculto', ini[id]));
      let i = 0;
      const paso = () => {
        if (i >= P.pasos.length) { $$('.resalta,.atenua', svg).forEach(g => g.classList.remove('resalta', 'atenua')); mano.classList.remove('ver'); completar(); return; }
        const st = P.pasos[i++]; aplicar(st); play(st.audio, paso);
      };
      paso();
    }
    $('#btnRep').onclick = () => { pararAudio(); correr(); };
    correr();
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

  /* ---- Clasificar de a uno ---- */
  R.clasificarUno = function (P, M) {
    const items = barajar(P.items); let idx = 0;
    M.innerHTML = `<div class="clasi">
      <div class="enunciado">${P.texto} <span class="cont" id="cont"></span></div>
      <div class="carta" id="carta"></div>
      <div class="cats" id="cats">${P.categorias.map(c => `<button class="btn cat" data-cat="${c.id}">${c.label}<small>${c.sub}</small></button>`).join('')}</div></div>`;
    const carta = $('#carta'), cats = $('#cats');
    function mostrar() {
      const it = items[idx];
      $('#cont').textContent = (idx + 1) + ' / ' + items.length;
      carta.className = 'carta'; carta.innerHTML = escenaSVG(it.escena);
      void carta.offsetWidth; carta.classList.add('entra');
    }
    $$('.cat', cats).forEach(b => b.onclick = () => {
      if (cats.classList.contains('espera')) return;
      const it = items[idx], ok = b.dataset.cat === it.cat;
      evaluar(S.i + ':' + it.id, ok);
      if (ok) {
        sonido('ok'); carta.classList.add('bien');
        bloquearHasta(cats, it.ok, () => { idx++; if (idx < items.length) mostrar(); else { cats.classList.add('espera'); completar(); } });
      } else {
        sonido('mal'); carta.classList.remove('mal'); void carta.offsetWidth; carta.classList.add('mal');
        bloquearHasta(cats, P.err);
      }
    });
    mostrar();
    bloquearHasta(cats, P.instr);
  };

  /* ---- Buscar la figura escondida ---- */
  R.buscar = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="buscar"><div class="enunciado" id="enun"></div><div class="lienzo" id="lz"></div></div>`;
    const lz = $('#lz');
    function ronda() {
      const rd = P.rondas[ri], e = rd.escena; let fallos = 0, hallado = false;
      $('#enun').innerHTML = rd.texto;
      lz.style.width = `min(94vw, calc(62vh * ${e.w / e.h}))`;
      lz.innerHTML = escenaSVG(e, '<g id="marcas"></g>');
      const svg = $('svg', lz), marcas = $('#marcas', svg), b = rd.blanco;
      svg.addEventListener('click', ev => {
        if (lz.classList.contains('espera') || hallado) return;
        const r = svg.getBoundingClientRect();
        if (!r.width) return;
        const x = (ev.clientX - r.left) / r.width * e.w, y = (ev.clientY - r.top) / r.height * e.h;
        if (Math.hypot(x - b.cx, y - b.cy) < Math.max(b.size * 0.6, 26)) {
          hallado = true; sonido('ok');
          marcas.innerHTML = `<circle class="anillo-ok" cx="${b.cx}" cy="${b.cy}" r="${b.size * 0.7}"/>`;
          bloquearHasta(lz, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(); else completar(); });
        } else {
          fallos++;
          const m = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          m.setAttribute('x', x); m.setAttribute('y', y); m.setAttribute('class', 'marca-x'); m.textContent = '✖';
          marcas.appendChild(m); setTimeout(() => m.remove(), 900);
          if (fallos === 3 && rd.pista) {
            marcas.insertAdjacentHTML('beforeend', `<circle class="pista" cx="${b.cx}" cy="${b.cy}" r="${b.size * 0.9}"/>`);
            play(rd.pista);
          }
        }
      });
      bloquearHasta(lz, rd.instr);
    }
    ronda();
  };

  /* ---- ¿Cuál se destaca más? ---- */
  R.cualDestaca = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="cual"><div class="enunciado">${P.texto} <span class="cont" id="cont"></span></div><div class="duo" id="duo"></div></div>`;
    const duo = $('#duo');
    function ronda() {
      const rd = P.rondas[ri];
      $('#cont').textContent = (ri + 1) + ' / ' + P.rondas.length;
      const esc = f => ({ w: 300, h: 225, capas: [Object.assign({ tipo: 'fondo' }, rd.fondo), Object.assign({ tipo: 'figura' }, f)] });
      const ops = barajar([{ ok: true, e: esc(rd.buena) }, { ok: false, e: esc(rd.mala) }]);
      duo.innerHTML = ops.map((o, j) => `<button class="carta op" data-ok="${o.ok ? 1 : 0}">${escenaSVG(o.e)}<span class="letra">${'AB'[j]}</span><span class="truco">✨ ${rd.truco}</span></button>`).join('');
      $$('.op', duo).forEach(b => b.onclick = () => {
        if (duo.classList.contains('espera')) return;
        const ok = b.dataset.ok === '1';
        evaluar(S.i + ':r' + ri, ok);
        if (ok) {
          sonido('ok'); b.classList.add('bien');
          bloquearHasta(duo, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(); else { duo.classList.add('espera'); completar(); } });
        } else {
          sonido('mal'); b.classList.remove('mal'); void b.offsetWidth; b.classList.add('mal');
          bloquearHasta(duo, P.err);
        }
      });
      bloquearHasta(duo, ri === 0 ? P.instr : null);
    }
    ronda();
  };

  /* ---- Verdadero / Falso ---- */
  R.vf = function (P, M) {
    let idx = 0;
    M.innerHTML = `<div class="vf">
      <div class="vf-escena sin-foto" id="vfesc"><img class="vf-foto" src="${P.img}" alt=""><div class="vf-cuadro" id="cuadro"></div><div class="lupa">🔍</div></div>
      <div class="enunciado"><span class="cont" id="cont"></span></div>
      <div class="afirma" id="afirma"></div>
      <div class="vf-bots" id="bots"><button class="btn v" data-v="1">✅ Verdadero</button><button class="btn f" data-v="0">❌ Falso</button></div></div>`;
    const af = $('#afirma'), bots = $('#bots'), esc = $('#vfesc'), cuadro = $('#cuadro'), foto = $('.vf-foto', esc), mk = P.marco;
    const conFoto = () => { esc.classList.remove('sin-foto'); esc.classList.add('con-foto');
      Object.assign(cuadro.style, { left: mk.x + '%', top: mk.y + '%', width: mk.w + '%', height: mk.h + '%' }); };
    if (foto.complete && foto.naturalWidth) conFoto(); else { foto.onload = conFoto; foto.onerror = () => foto.remove(); }
    function mostrar(primero) {
      const it = P.items[idx];
      $('#cont').textContent = (idx + 1) + ' / ' + P.items.length;
      cuadro.innerHTML = escenaSVG(it.cuadro).replace('xMidYMid meet', 'xMidYMid slice');
      cuadro.classList.remove('entra'); void cuadro.offsetWidth; cuadro.classList.add('entra');
      af.className = 'afirma'; af.textContent = it.texto; void af.offsetWidth; af.classList.add('entra', 'titila');
      bloquearHasta(bots, primero ? [P.instr, it.audio] : it.audio);
    }
    $$('button', bots).forEach(b => b.onclick = () => {
      if (bots.classList.contains('espera')) return;
      const it = P.items[idx], ok = (b.dataset.v === '1') === it.v;
      evaluar(S.i + ':' + idx, ok);
      if (ok) {
        sonido('ok'); af.classList.remove('titila'); af.classList.add('bien');
        bloquearHasta(bots, it.ok, () => { idx++; if (idx < P.items.length) mostrar(false); else { bots.classList.add('espera'); completar(); } });
      } else {
        sonido('mal'); af.classList.remove('mal'); void af.offsetWidth; af.classList.add('mal');
        bloquearHasta(bots, P.err);
      }
    });
    mostrar(true);
  };

  /* ---- Foto de la obra en papel ---- */
  R.foto = function (P, M) {
    M.innerHTML = `<div class="foto">
      ${P.texto ? `<div class="enunciado">${P.texto}</div>` : ''}
      <div class="marco"><img id="fprev" src="${S.fotoURL || P.img}" alt="" onerror="this.style.visibility='hidden'"></div>
      <input type="file" accept="image/*" capture="environment" id="finCam" hidden>
      <input type="file" accept="image/*" id="finGal" hidden>
      <div class="fila" id="fbots"><button class="btn" id="bCam">📷 Sacar foto</button><button class="btn sec" id="bGal">🖼️ Elegir de la galería</button><button class="btn sec" id="bSave" ${S.fotoURL ? '' : 'hidden'}>💾 Guardar</button></div></div>`;
    const fb = $('#fbots');
    $('#bCam').onclick = () => { play(P.boton); $('#finCam').click(); };
    $('#bGal').onclick = () => $('#finGal').click();
    const cargar = ev => {
      const f = ev.target.files && ev.target.files[0]; if (!f) return;
      if (S.fotoURL) { try { URL.revokeObjectURL(S.fotoURL); } catch (e) { } }
      S.fotoURL = URL.createObjectURL(f);
      $('#fprev').src = S.fotoURL; $('#fprev').style.visibility = 'visible';
      $('#bSave').hidden = false; sonido('ok'); pararAudio(); play(P.ok);
    };
    $('#finCam').onchange = cargar; $('#finGal').onchange = cargar;
    $('#bSave').onclick = () => { if (S.fotoURL) descargar(S.fotoURL, P.archivo); };
    bloquearHasta(fb, P.instr);
  };

  /* ---- Autoevaluación ---- */
  R.autoeval = function (P, M) {
    let idx = 0;
    const mini = S.fotoURL || S.obraURL;
    const miniHTML = mini ? `<img src="${mini}" alt="Mi obra">` :
      escenaSVG({ w: 300, h: 225, capas: [{ tipo: 'fondo', seed: 61, paleta: 'mixta', bg: '#fff', paso: 22, tipos: ['flor', 'puntos', 'onda', 'hoja', 'aro'] }, { tipo: 'figura', forma: 'corazon', cx: 150, cy: 112, size: 130, fill: '#e63946', stroke: '#1b1b1b', strokeW: 6, halo: true }] });
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
      bloquearHasta(bots, it[b.dataset.r], () => {
        idx++;
        if (idx < P.items.length) mostrar(false);
        else { bots.classList.add('espera'); pr.className = 'afirma bien'; pr.textContent = '🌟 ¡Gracias por mirar tu obra!'; play(P.fin, completar); }
      });
    });
    mostrar(true);
  };

  /* ---- Taller de dibujo (actividad abierta) ---- */
  R.taller = function (P, M) {
    const T = S.taller || (S.taller = { forma: null, cx: 400, cy: 400, size: 380, fill: '#e63946', borde: 2, aire: false, tool: 'fino', color: '#3a86ff', sello: P.sellos[0], fondoURL: null, tab: 'fig' });
    const TABS = [['fig', '⭐ Figura', 'ta_tab1'], ['fon', '🖌️ Fondo', 'ta_tab2'], ['des', '🪄 Destacar', 'ta_tab3'], ['pru', '👀 Prueba', 'ta_tab4']];
    M.innerHTML = `<div class="taller">
      <div class="tl-lienzo" id="tl"><canvas id="cvF" width="800" height="800"></canvas><canvas id="cvG" width="800" height="800"></canvas><div class="tl-aviso" id="aviso">Elegí tu figura ⭐</div></div>
      <div class="tl-panel" id="panel"><div class="tabs">${TABS.map(t => `<button class="tab" data-tab="${t[0]}">${t[1]}</button>`).join('')}</div><div class="tl-herr" id="herr"></div></div></div>`;
    const tl = $('#tl'), cvF = $('#cvF'), cvG = $('#cvG'), herr = $('#herr'), panel = $('#panel');
    const cF = cvF.getContext ? cvF.getContext('2d') : null, cG = cvG.getContext ? cvG.getContext('2d') : null;
    const hayCanvas = !!(cF && cG && window.Path2D);
    const hist = [];
    if (hayCanvas) {
      cF.fillStyle = '#fff'; cF.fillRect(0, 0, 800, 800);
      if (T.fondoURL) { const im = new Image(); im.onload = () => cF.drawImage(im, 0, 0); im.src = T.fondoURL; }
    }
    S.salir = () => { if (hayCanvas) { try { T.fondoURL = cvF.toDataURL('image/png'); } catch (e) { } } };

    function dibujarFigura() {
      $('#aviso').style.display = T.forma ? 'none' : '';
      if (!hayCanvas) return;
      cG.clearRect(0, 0, 800, 800);
      if (!T.forma) return;
      const p = new Path2D(FORMAS[T.forma]), k = T.size / 100;
      cG.save(); cG.translate(T.cx - T.size / 2, T.cy - T.size / 2); cG.scale(k, k);
      cG.lineJoin = 'round'; cG.lineCap = 'round';
      if (T.aire) { cG.fillStyle = '#fff'; cG.strokeStyle = '#fff'; cG.lineWidth = 70 / k; cG.stroke(p); cG.fill(p); }
      cG.fillStyle = T.fill; cG.fill(p);
      const tinta = oscuro(T.fill) ? '#ffffff' : '#1b1b1b';
      if (T.borde) { cG.lineWidth = (T.borde === 1 ? 7 : 18) / k; cG.strokeStyle = tinta; cG.stroke(p); }
      (DETALLES[T.forma] || []).forEach(([t, d]) => {
        const q = new Path2D(d);
        if (t === 'l') { cG.lineWidth = 7 / k; cG.strokeStyle = tinta; cG.stroke(q); }
        else if (t === 'b') { cG.fillStyle = '#ffffff'; cG.fill(q); cG.lineWidth = 5 / k; cG.strokeStyle = tinta; cG.stroke(q); }
        else { cG.fillStyle = tinta; cG.fill(q); }
      });
      cG.restore();
    }
    // sellos: SVG → imagen (cache)
    const cacheSello = {};
    function imgSello(tipo, color) {
      const k = tipo + '|' + color;
      if (!cacheSello[k]) {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100" width="200" height="200">${elemento(tipo, 0, 0, tipo === 'corazoncito' ? 150 : 95, color, rng(7))}</svg>`;
        const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); cacheSello[k] = im;
      }
      return cacheSello[k];
    }
    function sellar(x, y) {
      const im = imgSello(T.sello, T.color), rot = (Math.random() - 0.5) * 0.8, s = 150;
      const pintar = () => { cF.save(); cF.translate(x, y); cF.rotate(rot); cF.drawImage(im, -s / 2, -s / 2, s, s); cF.restore(); };
      if (im.complete && im.naturalWidth) pintar(); else im.addEventListener('load', pintar, { once: true });
    }
    function guardarHist() { try { hist.push(cF.getImageData(0, 0, 800, 800)); if (hist.length > 10) hist.shift(); } catch (e) { } }

    function herramientas() {
      $$('.tab', panel).forEach(b => b.classList.toggle('on', b.dataset.tab === T.tab));
      const pal = (sel, attr) => `<div class="paleta">${P.colores.map(c => `<button class="sw${c === sel ? ' on' : ''}" data-${attr}="${c}" style="background:${c}" aria-label="color"></button>`).join('')}</div>`;
      let h = '';
      if (T.tab === 'fig') {
        h = `<div class="fila-h">${P.formas.map(f => `<button class="hb forma${T.forma === f.id ? ' on' : ''}" data-forma="${f.id}" data-audio="${f.audio}">${iconoForma(f.id)}</button>`).join('')}</div>
             <div class="fila-h"><button class="hb" data-tam="-1">➖ Más chica</button><button class="hb" data-tam="1">➕ Más grande</button></div>`;
      } else if (T.tab === 'fon') {
        const tools = [['fino', '✏️', 't_fino'], ['grueso', '🖍️', 't_grueso'], ['puntos', '✨', 't_puntos'], ['sellos', '🌸', 't_sellos'], ['goma', '🧽', 't_goma']];
        h = `<div class="fila-h">${tools.map(t => `<button class="hb tool${T.tool === t[0] ? ' on' : ''}" data-tool="${t[0]}" data-audio="${t[2]}">${t[1]}</button>`).join('')}
             <button class="hb" data-acc="deshacer" data-audio="t_deshacer">↩️</button><button class="hb" data-acc="borrar" data-audio="t_borrar">🗑️</button></div>` +
          (T.tool === 'sellos' ? `<div class="fila-h">${P.sellos.map(s => `<button class="hb sello${T.sello === s ? ' on' : ''}" data-sello="${s}"><svg viewBox="-50 -50 100 100" class="ico">${elemento(s, 0, 0, s === 'corazoncito' ? 150 : 95, T.color, rng(7))}</svg></button>`).join('')}</div>` : '') +
          pal(T.color, 'color');
      } else if (T.tab === 'des') {
        h = pal(T.fill, 'fill') +
          `<div class="fila-h"><button class="hb${T.borde === 0 ? ' on' : ''}" data-borde="0" data-audio="d_borde0">Sin borde</button><button class="hb${T.borde === 1 ? ' on' : ''}" data-borde="1" data-audio="d_borde1">Borde fino</button><button class="hb${T.borde === 2 ? ' on' : ''}" data-borde="2" data-audio="d_borde2">Borde grueso</button>
           <button class="hb${T.aire ? ' on' : ''}" data-aire="1" data-audio="d_aire">☁️ Aire</button></div>`;
      } else {
        h = `<div class="fila-h"><button class="btn" id="bOjo">👀 Prueba del ojo</button><button class="btn sec" id="bGuardar">💾 Guardar mi obra</button></div>
             <div class="fila-h" id="rOjo" hidden><span>¿Se ve tu figura?</span><button class="hb" data-ojo="si">👍 Sí</button><button class="hb" data-ojo="no">👎 Todavía no</button></div>`;
      }
      herr.innerHTML = h;
      $$('[data-forma]', herr).forEach(b => b.onclick = () => { T.forma = b.dataset.forma; dibujarFigura(); herramientas(); decir(b.dataset.audio); });
      $$('[data-tam]', herr).forEach(b => b.onclick = () => { T.size = Math.max(160, Math.min(640, T.size + 60 * (+b.dataset.tam))); dibujarFigura(); });
      $$('[data-tool]', herr).forEach(b => b.onclick = () => { T.tool = b.dataset.tool; herramientas(); decir(b.dataset.audio); });
      $$('[data-sello]', herr).forEach(b => b.onclick = () => { T.sello = b.dataset.sello; herramientas(); });
      $$('[data-color]', herr).forEach(b => b.onclick = () => { T.color = b.dataset.color; if (T.tool === 'goma') T.tool = 'fino'; herramientas(); });
      $$('[data-fill]', herr).forEach(b => b.onclick = () => { T.fill = b.dataset.fill; dibujarFigura(); herramientas(); });
      $$('[data-borde]', herr).forEach(b => b.onclick = () => { T.borde = +b.dataset.borde; dibujarFigura(); herramientas(); decir(b.dataset.audio); });
      $$('[data-aire]', herr).forEach(b => b.onclick = () => { T.aire = !T.aire; dibujarFigura(); herramientas(); decir(b.dataset.audio); });
      $$('[data-acc]', herr).forEach(b => b.onclick = () => {
        if (!hayCanvas) return;
        if (b.dataset.acc === 'deshacer') { const d = hist.pop(); if (d) cF.putImageData(d, 0, 0); }
        else { guardarHist(); cF.globalCompositeOperation = 'source-over'; cF.fillStyle = '#fff'; cF.fillRect(0, 0, 800, 800); }
        decir(b.dataset.audio);
      });
      const bOjo = $('#bOjo', herr);
      if (bOjo) {
        bOjo.onclick = () => {
          if (!T.forma) { T.tab = 'fig'; herramientas(); decir('ta_tab1'); return; }
          pararAudio(); tl.classList.add('borroso'); panel.classList.add('espera');
          play('p_ojo', () => { tl.classList.remove('borroso'); panel.classList.remove('espera'); $('#rOjo').hidden = false; });
        };
        $$('[data-ojo]', herr).forEach(b => b.onclick = () => { pararAudio(); play(b.dataset.ojo === 'si' ? 'p_si' : 'p_no'); if (b.dataset.ojo === 'no') { T.tab = 'des'; herramientas(); } });
        $('#bGuardar').onclick = () => {
          if (!hayCanvas) return;
          const o = document.createElement('canvas'); o.width = 800; o.height = 800;
          const c = o.getContext('2d'); c.fillStyle = '#fff'; c.fillRect(0, 0, 800, 800); c.drawImage(cvF, 0, 0); c.drawImage(cvG, 0, 0);
          S.obraURL = o.toDataURL('image/png'); descargar(S.obraURL, P.archivo); pararAudio(); play('p_guardar');
        };
      }
    }
    function decir(k) { if (!k) return; pararAudio(); play(k); }
    $$('.tab', panel).forEach(b => b.onclick = () => {
      T.tab = b.dataset.tab; herramientas();
      decir(TABS.find(t => t[0] === T.tab)[2]);
    });

    // dibujo con puntero
    let trazo = null;
    const pos = ev => { const r = tl.getBoundingClientRect(); return [(ev.clientX - r.left) / (r.width || 1) * 800, (ev.clientY - r.top) / (r.height || 1) * 800]; };
    function lluvia(x, y) {
      const cols = P.colores.filter(c => c !== '#ffffff');
      for (let k = 0; k < 4; k++) {
        const a = Math.random() * Math.PI * 2, d = Math.random() * 34;
        cF.fillStyle = cols[Math.floor(Math.random() * cols.length)];
        cF.beginPath(); cF.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 3 + Math.random() * 5, 0, Math.PI * 2); cF.fill();
      }
    }
    tl.addEventListener('pointerdown', ev => {
      if (!hayCanvas || panel.classList.contains('espera') || tl.classList.contains('espera')) return;
      ev.preventDefault(); try { tl.setPointerCapture(ev.pointerId); } catch (e) { }
      const [x, y] = pos(ev);
      if (T.tab === 'fon') {
        guardarHist();
        if (T.tool === 'sellos') { sellar(x, y); return; }
        if (T.tool === 'puntos') { cF.globalCompositeOperation = 'source-over'; lluvia(x, y); trazo = { x, y }; return; }
        cF.globalCompositeOperation = T.tool === 'goma' ? 'destination-out' : 'source-over';
        cF.strokeStyle = T.color; cF.lineCap = 'round'; cF.lineJoin = 'round';
        cF.lineWidth = T.tool === 'fino' ? 8 : T.tool === 'grueso' ? 24 : 46;
        cF.beginPath(); cF.moveTo(x, y); cF.lineTo(x + 0.1, y + 0.1); cF.stroke();
        trazo = { x, y };
      } else if (T.forma) { T.cx = x; T.cy = y; dibujarFigura(); trazo = { mover: true }; }
      else if (T.tab === 'fig') decir('ta_tab1');
    });
    tl.addEventListener('pointermove', ev => {
      if (!trazo) return;
      const [x, y] = pos(ev);
      if (trazo.mover) { T.cx = x; T.cy = y; dibujarFigura(); return; }
      if (T.tool === 'puntos') { lluvia(x, y); return; }
      cF.beginPath(); cF.moveTo(trazo.x, trazo.y); cF.lineTo(x, y); cF.stroke(); trazo.x = x; trazo.y = y;
    });
    const soltar = () => { trazo = null; if (cF) cF.globalCompositeOperation = 'source-over'; };
    tl.addEventListener('pointerup', soltar); tl.addEventListener('pointercancel', soltar);

    herramientas(); dibujarFigura();
    tl.classList.add('espera'); panel.classList.add('espera');
    play(P.instr, () => { tl.classList.remove('espera'); panel.classList.remove('espera'); });
  };

  /* =================== ARRANQUE =================== */
  function init() {
    document.title = D.meta.titulo + ' · QueSepanTodos';
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
