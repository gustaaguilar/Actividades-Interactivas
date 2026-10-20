/* ============================================================
   motor.js — QueSepanTodos.com · Profe Gustavo Aguilar
   Motor genérico de paquetes interactivos (mecánicas de arte:
   narración animada, clasificarUno, buscar, cuál destaca, V/F,
   mezclar colores, ¿qué color sale?, taller de dibujo con mezclador,
   pasos, foto, autoevaluación).
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
        'C90 58 92 68 96 82C88 76 80 66 74 58C70 64 64 70 56 73C58 80 52 86 46 86C46 82 45 78 42 76C28 76 12 66 8 52Z',
      mancha: 'M52 9C61 8 66 16 74 17C83 18 90 24 91 34C92 43 86 48 89 56C92 65 92 76 84 82C77 88 68 85 61 90C53 95 43 95 35 90C27 85 17 87 12 78C7 70 13 62 10 53C7 44 7 34 14 26C21 19 30 21 37 15C42 11 46 9 52 9Z' +
        circ(93, 12, 4.5) + circ(7, 91, 3.5) + circ(97, 62, 3) + circ(22, 8, 2.5),
      triangulo: poly([[50, 8], [94, 90], [6, 90]]),
      nube: 'M22 78C8 78 4 60 17 55C14 40 30 31 42 38C47 22 74 22 78 40C93 37 99 60 86 72C83 77 79 78 74 78Z',
      circulo: circ(50, 50, 45),
      flor: circ(50, 22, 18) + circ(77, 41, 18) + circ(67, 73, 18) + circ(33, 73, 18) + circ(23, 41, 18) + circ(50, 50, 16),
      hoja: 'M50 4C80 20 92 52 50 96C8 52 20 20 50 4Z',
      cuadrado: poly([[10, 10], [90, 10], [90, 90], [10, 90]]),
      rectangulo: poly([[3, 25], [97, 25], [97, 75], [3, 75]]),
      rombo: poly([[50, 3], [95, 50], [50, 97], [5, 50]]),
      ovalo: 'M3 50A47 33 0 1 1 97 50A47 33 0 1 1 3 50Z',
      gota: 'M50 4C66 30 82 46 82 64A32 32 0 0 1 18 64C18 46 34 30 50 4Z',
      luna: 'M60 6A45 45 0 1 0 60 94A36 36 0 1 1 60 6Z',
      montania: poly([[2, 92], [36, 20], [52, 42], [68, 26], [98, 92]]),
      ala: 'M6 72C16 34 56 6 96 10C84 24 90 32 74 38C88 44 80 56 62 58C72 66 58 76 46 74C36 82 18 84 6 72Z',
      cola: 'M6 60C20 30 50 70 72 40C80 28 82 16 94 6C96 30 88 50 76 62C56 84 26 70 14 76Z',
      pata: 'M38 4H62V80Q76 84 80 96H20Q24 84 38 80Z',
      ojo: circ(50, 50, 44)
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
    estrella: [], mancha: [], triangulo: [], nube: [], circulo: []
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
    return f.rot ? `<g transform="rotate(${f.rot} ${f.cx} ${f.cy})">${o}</g>` : o;
  }
  /* círculo cromático de 12 colores (orden de Itten): 0 amarillo, 2 naranja, 4 rojo, 6 violeta, 8 azul, 10 verde */
  const RUEDA = ['#f4e500', '#fdc60b', '#f18e1c', '#ea621f', '#e32322', '#c4037d', '#6d398b', '#454e99', '#2a71b0', '#0696bb', '#008e5b', '#8cbb26'];
  function ruedaSVG(c) {
    const R = c.r, ri = c.ri == null ? R * 0.55 : c.ri, marcar = c.marcar || null, a0 = -105;
    let o = '';
    for (let k = 0; k < 12; k++) {
      const a1 = (a0 + k * 30) * Math.PI / 180, a2 = (a0 + (k + 1) * 30) * Math.PI / 180;
      const p = (rr, a) => f1(c.cx + rr * Math.cos(a)) + ' ' + f1(c.cy + rr * Math.sin(a));
      const on = !marcar || marcar.includes(k);
      o += `<path d="M${p(ri, a1)}L${p(R, a1)}A${R} ${R} 0 0 1 ${p(R, a2)}L${p(ri, a2)}A${ri} ${ri} 0 0 0 ${p(ri, a1)}Z" fill="${RUEDA[k]}" opacity="${on ? 1 : 0.18}" stroke="#ffffff" stroke-width="2"/>`;
    }
    if (c.flecha) { // une dos sectores opuestos (complementarios)
      const am = k => (a0 + k * 30 + 15) * Math.PI / 180, rm = (R + ri) / 2;
      const [i, j] = c.flecha;
      o += `<line x1="${f1(c.cx + rm * Math.cos(am(i)))}" y1="${f1(c.cy + rm * Math.sin(am(i)))}" x2="${f1(c.cx + rm * Math.cos(am(j)))}" y2="${f1(c.cy + rm * Math.sin(am(j)))}" stroke="#2b2118" stroke-width="4" stroke-dasharray="8 6"/>`;
    }
    return o;
  }
  /* balanza (sube y baja según el peso visual): cx, cy (apoyo), w (largo), ang (grados, + = baja a la derecha) */
  function balanzaSVG(c) {
    const w = c.w || 200, a = c.ang || 0, col = c.color || '#5b4636';
    return `<polygon points="${c.cx - 16},${c.cy + 28} ${c.cx + 16},${c.cy + 28} ${c.cx},${c.cy}" fill="${col}"/>` +
      `<g transform="rotate(${a} ${c.cx} ${c.cy})"><rect x="${c.cx - w / 2}" y="${c.cy - 6}" width="${w}" height="10" rx="5" fill="${col}"/>` +
      `<circle cx="${c.cx - w / 2 + 8}" cy="${c.cy - 12}" r="${c.pi || 10}" fill="${c.ci || '#e8262f'}"/><circle cx="${c.cx + w / 2 - 8}" cy="${c.cy - 12}" r="${c.pd || 10}" fill="${c.cd || '#1f64d6'}"/></g>`;
  }
  /* criatura fantástica armada con formas (cuerpo, cabeza, alas, cola, patas, 4 ojos) */
  function criaturaSVG(c) {
    const k = c.size / 200, col = c.colores || ['#e63946', '#ffb703', '#3a86ff', '#06d6a0'], L = c.linea || '#222';
    const e = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${L}" stroke-width="2"/><circle cx="${cx + 1}" cy="${cy + 1}" r="${r * 0.48}" fill="#111"/>`;
    let o = `<g transform="translate(${c.cx - 100 * k} ${c.cy - 100 * k}) scale(${f1(k * 1000) / 1000})" stroke="${L}" stroke-width="3" stroke-linejoin="round">`;
    const sin = c.sin || [];
    if (!sin.includes('cola')) o += `<path d="M150 112C188 104 196 64 178 36" fill="none" stroke="${col[3]}" stroke-width="13" stroke-linecap="round"/>`;
    if (!sin.includes('cola')) o += `<path d="M176 30L192 22L186 40Z" fill="${col[3]}"/>`;
    if (!sin.includes('alas')) o += `<path d="M100 92C92 46 120 14 168 10C156 30 164 38 148 48C162 56 146 70 130 72C138 84 118 90 104 96Z" fill="${col[2]}"/>`;
    [66, 88, 122, 144].forEach((x, j) => { const h = sin.includes('patas') ? 150 : 184; if (sin.includes('patas')) { o += `<rect x="${x - 8}" y="128" width="16" height="26" rx="6" fill="${col[1]}"/>`; return; } o += `<path d="M${x - 7} 128H${x + 7}V184Q${x + 16} 186 ${x + 16} 194H${x - 12}Q${x - 12} 186 ${x - 7} 184Z" fill="${col[1]}"/>`; });
    o += `<ellipse cx="108" cy="118" rx="62" ry="38" fill="${col[0]}"/>`;
    o += [[88, 108], [112, 100], [132, 116], [100, 130], [124, 136]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${col[3]}" stroke-width="2"/>`).join('');
    o += `<path d="M38 52L30 22L50 44Z" fill="${col[2]}"/><path d="M62 46L70 16L76 46Z" fill="${col[2]}"/>`;
    o += `<circle cx="52" cy="72" r="34" fill="${col[1]}"/>`;
    o += sin.includes('ojos') ? e(42, 66, 9) + e(64, 64, 9) : e(38, 62, 9) + e(62, 60, 9) + e(44, 84, 7) + e(66, 82, 7);
    o += `<path d="M36 96Q52 104 70 94" fill="none" stroke-width="3" stroke-linecap="round"/>`;
    return o + '</g>';
  }
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function capaSVG(c, w, h) {
    let inner = '';
    if (c.tipo === 'fondo') inner = fondoSVG(c, w, h);
    else if (c.tipo === 'figura') inner = figuraSVG(c);
    else if (c.tipo === 'texto') inner = `<text x="${c.x}" y="${c.y}" font-size="${c.size || 16}" fill="${c.fill || '#2b2118'}" text-anchor="middle" font-weight="800" font-family="'Baloo 2',system-ui,sans-serif">${esc(c.t)}</text>`;
    else if (c.tipo === 'path') inner = `<path d="${c.d}" fill="${c.fill || 'none'}" stroke="${c.stroke || '#1b1b1b'}" stroke-width="${c.sw || 4}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (c.tipo === 'criatura') inner = criaturaSVG(c);
    else if (c.tipo === 'rueda') inner = ruedaSVG(c);
    else if (c.tipo === 'balanza') inner = balanzaSVG(c);
    else if (c.tipo === 'paleta') inner = (c.colores || []).map((col, j) => `<rect x="${c.x + j * (c.lado + (c.sep || 6))}" y="${c.y}" width="${c.lado}" height="${c.lado}" rx="${c.lado * 0.2}" fill="${col}" stroke="#2b2118" stroke-width="2"/>`).join('');
    else if (c.tipo === 'img') inner = `<image href="${c.src}" x="${c.x || 0}" y="${c.y || 0}" width="${c.w || w}" height="${c.h || h}" preserveAspectRatio="xMidYMid slice"/>`;
    else if (c.tipo === 'forma') inner = `<g transform="${c.flip ? `translate(${c.cx + c.size / 2} ${c.cy - c.size / 2}) scale(${-c.size / 100} ${c.size / 100})` : `translate(${c.cx - c.size / 2} ${c.cy - c.size / 2}) scale(${c.size / 100})`}${c.rot ? ` rotate(${c.rot} 50 50)` : ''}"><path d="${FORMAS[c.forma]}" fill="${c.fill || '#e63946'}" fill-opacity="${c.op == null ? 1 : c.op}"${c.stroke ? ` stroke="${c.stroke}" stroke-width="${(c.sw || 3) * 100 / c.size}"` : ''} style="mix-blend-mode:${c.blend || 'normal'}"/></g>`;
    else if (c.tipo === 'aro') inner = `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="none" stroke="${c.stroke}" stroke-width="${c.sw || 5}"/>`;
    else if (c.tipo === 'puntos') {
      const r = rng(c.seed || 3), cols = c.colores || ['#1b1b1b'];
      for (let k = 0; k < (c.n || 15); k++) {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * c.r;
        inner += `<circle cx="${f1(c.cx + Math.cos(a) * d)}" cy="${f1(c.cy + Math.sin(a) * d * 0.75)}" r="${f1(c.r * (0.04 + r() * 0.04))}" fill="${cols[k % cols.length]}"/>`;
      }
    }
    else if (c.tipo === 'rect') inner = `<rect x="${c.x || 0}" y="${c.y || 0}" width="${c.w || w}" height="${c.h || h}" rx="${c.rx || 0}" fill="${c.fill || '#fff'}"` + (c.stroke ? ` stroke="${c.stroke}" stroke-width="2"` : '') + '/>';
    else if (c.tipo === 'grupo') inner = (c.capas || []).map(x => capaSVG(x, w, h)).join('');
    return `<g class="capa${c.oculto ? ' oculto' : ''}"${c.id ? ` data-capa="${c.id}"` : ''}>${inner}</g>`;
  }
  function escenaSVG(e, extra) {
    return `<svg class="escena" viewBox="0 0 ${e.w} ${e.h}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">` +
      e.capas.map(c => capaSVG(c, e.w, e.h)).join('') + (extra || '') + '</svg>';
  }
  function iconoForma(id) { return `<svg viewBox="0 0 100 100" class="ico"><path d="${FORMAS[id]}" fill="currentColor"/>${detallesSVG(id, '', 0.55, '#ffffff', '#ffffff').replace(/transform="" /g, '')}</svg>`; }

  /* visual genérico: {img} foto · {emoji} · {escena} SVG · {color} mancha */
  function visualHTML(v, cls) {
    if (!v) return '';
    let h = '';
    if (v.img) h = `<img src="${v.img}" alt="" onerror="this.style.visibility='hidden'">`;
    else if (v.emoji) h = `<div class="v-emoji">${v.emoji}</div>`;
    else if (v.escena) h = escenaSVG(v.escena);
    else if (v.paleta) h = `<div class="v-paleta">${v.paleta.map(c => `<i style="background:${c}"></i>`).join('')}</div>`;
    else if (v.color) h = `<svg viewBox="0 0 100 100"><path d="${FORMAS.mancha}" fill="${v.color}"/></svg>`;
    return `<div class="visual ${cls || ''}">${h}${v.label ? `<span class="v-label">${v.label}</span>` : ''}</div>`;
  }
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
      if (g === AQ.gen && !AQ.cur) siguienteAudio(); // si el callback ya encoló y arrancó otro audio, no pisarlo
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
  const REQUIERE = { clasificarUno: 1, buscar: 1, cualDestaca: 1, vf: 1, autoeval: 1, mezclar: 1, queSale: 1, elegir: 1, asociar: 1 };
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
      <div class="cie-fila"><button class="btn grande" id="btnOtra">🔄 Volver a jugar</button>${profeHTML()}</div>
      ${D.meta.youtube ? `<a class="btn yt" href="${D.meta.youtube}" target="_blank" rel="noopener">▶ Suscribite al canal</a>` : ''}</div>`;
    $('#btnOtra').onclick = () => {
      Object.assign(S, { aciertos: 0, errores: 0, puntos: 0, eval: {}, fotoURL: null, obraURL: null, taller: null });
      ir(0);
    };
    try { if (window.QSTEnvio) M.querySelector('.cierre').insertBefore(QSTEnvio.boton({ titulo: D.meta.titulo, grado: D.meta.grado, aciertos: S.aciertos, errores: S.errores, puntos: S.puntos }), M.querySelector('.yt')); } catch (e) {} // 📤 botón común de envío (recursos/enviar-tarea.js)
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
      <div class="cats${P.categorias.length === 3 ? ' tres' : P.categorias.length > 3 ? ' cuatro' : ''}" id="cats">${P.categorias.map(c => `<button class="btn cat" data-cat="${c.id}">${c.label}${c.sub ? `<small>${c.sub}</small>` : ''}</button>`).join('')}</div></div>`;
    const carta = $('#carta'), cats = $('#cats');
    let primero = true;
    function mostrar() {
      const it = items[idx];
      $('#cont').textContent = (idx + 1) + ' / ' + items.length;
      carta.className = 'carta'; carta.innerHTML = it.escena ? escenaSVG(it.escena) : visualHTML(it, 'en-carta');
      void carta.offsetWidth; carta.classList.add('entra');
      if (it.audio && !primero) bloquearHasta(cats, it.audio);
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
    primero = false;
    bloquearHasta(cats, [P.instr, items[0].audio]);
    carta.onclick = () => { const it = items[idx]; if (it && it.audio && !audioOcupado()) play(it.audio); };
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
      escenaSVG(P.mini || { w: 300, h: 225, capas: [{ tipo: 'fondo', seed: 61, paleta: 'mixta', bg: '#fff', paso: 22, tipos: ['flor', 'puntos', 'onda', 'hoja', 'aro'] }] });
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

  /* =================== COLORES Y MEZCLAS =================== */
  const MEZCLAS = { 'amarillo+rojo': 'naranja', 'amarillo+azul': 'verde', 'azul+rojo': 'violeta', 'blanco+negro': 'gris' };
  const mezclaDe = (a, b) => MEZCLAS[[a, b].sort().join('+')] || null;
  const hexRgb = h => { const n = parseInt(h.slice(1, 7), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  const rgbHex = c => '#' + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const difColor = (a, b) => { const x = hexRgb(a), y = hexRgb(b); return Math.abs(x[0] - y[0]) + Math.abs(x[1] - y[1]) + Math.abs(x[2] - y[2]); };
  function manchaSVG(color, extra) {
    return `<svg viewBox="0 0 100 100" class="mancha-svg"${extra || ''}><path d="${FORMAS.mancha}" fill="${color}"/></svg>`;
  }
  function frascoSVG(color) {
    return `<svg viewBox="0 0 80 100" class="frasco-svg"><rect x="22" y="4" width="36" height="14" rx="4" fill="#5b4636"/>` +
      `<path d="M18 22H62Q70 22 70 32V86Q70 96 60 96H20Q10 96 10 86V32Q10 22 18 22Z" fill="#ffffff" stroke="#c9bba6" stroke-width="3"/>` +
      `<path d="M13 44H67V86Q67 93 60 93H20Q13 93 13 86Z" fill="${color}"/><rect x="18" y="30" width="7" height="50" rx="3" fill="#ffffff" opacity=".55"/></svg>`;
  }
  function bolSVG() {
    return `<svg viewBox="0 0 220 130" class="bol-svg">
      <defs><clipPath id="clBol"><ellipse cx="110" cy="40" rx="88" ry="20"/></clipPath></defs>
      <path d="M8 38Q110 205 212 38Z" fill="#f2ede4" stroke="#bfb19c" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="110" cy="38" rx="102" ry="26" fill="#e7dfd2" stroke="#bfb19c" stroke-width="4"/>
      <g clip-path="url(#clBol)">
        <ellipse id="bolVacio" cx="110" cy="40" rx="88" ry="20" fill="#d9cfc0"/>
        <g id="bolGiro"><rect id="bolA" x="0" y="-60" width="110" height="200" fill="none"/><rect id="bolB" x="110" y="-60" width="110" height="200" fill="none"/></g>
        <ellipse id="bolRes" cx="110" cy="40" rx="88" ry="20" fill="none" opacity="0"/>
      </g></svg>`;
  }

  /* ---- Laboratorio de mezclas: tocar dos frascos ---- */
  R.mezclar = function (P, M) {
    const C = D.colores; let ri = 0, sel = [], bloq = false;
    const frascos = barajar(P.frascos);
    M.innerHTML = `<div class="lab">
      <div class="enunciado"><span id="enun"></span> <span class="cont" id="cont"></span></div>
      <div class="lab-fila">
        <div class="lab-meta" id="meta"><div class="emo" id="emo"></div><div class="meta-c" id="metaC"></div><div class="meta-n" id="metaN"></div></div>
        <div class="lab-bol"><div id="bol">${bolSVG()}</div><div class="bol-n" id="bolN">🥣</div></div>
      </div>
      <div class="frascos" id="fr">${frascos.map(n => `<button class="frasco" data-c="${n}">${frascoSVG(C[n])}<span>${n}</span></button>`).join('')}</div></div>`;
    const fr = $('#fr'), bol = $('#bol'), bolN = $('#bolN');
    const giro = $('#bolGiro', bol), A = $('#bolA', bol), B = $('#bolB', bol), res = $('#bolRes', bol), vac = $('#bolVacio', bol);
    function vaciar() {
      sel = []; $$('.frasco', fr).forEach(b => b.classList.remove('on'));
      A.setAttribute('fill', 'none'); B.setAttribute('fill', 'none'); res.setAttribute('opacity', '0');
      vac.setAttribute('opacity', '1'); giro.classList.remove('gira'); bolN.textContent = '🥣'; bolN.style.color = '';
    }
    function ronda() {
      const rd = P.rondas[ri];
      $('#cont').textContent = (ri + 1) + ' / ' + P.rondas.length;
      $('#enun').innerHTML = rd.texto;
      $('#emo').textContent = rd.emoji;
      $('#metaC').innerHTML = manchaSVG(C[rd.objetivo]);
      $('#metaN').textContent = rd.objetivo; $('#metaN').style.color = C[rd.objetivo];
      const meta = $('#meta'); meta.classList.remove('bien'); meta.classList.add('titila');
      vaciar();
      bloquearHasta(fr, ri === 0 ? [P.instr, rd.audio] : rd.audio);
    }
    $$('.frasco', fr).forEach(b => b.onclick = () => {
      if (fr.classList.contains('espera') || bloq) return;
      const n = b.dataset.c, k = sel.indexOf(n);
      if (k >= 0) { sel.splice(k, 1); b.classList.remove('on'); }
      else { sel.push(n); b.classList.add('on'); }
      A.setAttribute('fill', sel[0] ? C[sel[0]] : 'none'); B.setAttribute('fill', sel[1] ? C[sel[1]] : (sel[0] ? C[sel[0]] : 'none'));
      vac.setAttribute('opacity', sel.length ? '0' : '1');
      pararAudio(); play('c_' + n);
      if (sel.length < 2) return;
      // mezclar
      bloq = true;
      const rd = P.rondas[ri], sale = mezclaDe(sel[0], sel[1]), ok = sale === rd.objetivo;
      giro.classList.remove('gira'); void giro.getBoundingClientRect(); giro.classList.add('gira');
      setTimeout(() => {
        res.setAttribute('fill', C[sale]); res.setAttribute('opacity', '1');
        bolN.textContent = '= ' + sale; bolN.style.color = C[sale];
        evaluar(S.i + ':r' + ri, ok);
        pararAudio();
        if (ok) {
          sonido('ok'); $('#meta').classList.remove('titila'); $('#meta').classList.add('bien');
          bloquearHasta(fr, rd.ok, () => { bloq = false; ri++; if (ri < P.rondas.length) ronda(); else { fr.classList.add('espera'); completar(); } });
        } else {
          sonido('mal'); bol.classList.remove('mal'); void bol.offsetWidth; bol.classList.add('mal');
          bloquearHasta(fr, P.err, () => { bloq = false; vaciar(); });
        }
      }, window.__RAPIDO ? 5 : 1300);
    });
    ronda();
  };

  /* ---- ¿Qué color sale? (A + B = ?) ---- */
  R.queSale = function (P, M) {
    const C = D.colores; let ri = 0;
    M.innerHTML = `<div class="qsale">
      <div class="enunciado">¿Qué color sale? <span class="cont" id="cont"></span></div>
      <div class="ecu" id="ecu"></div>
      <div class="ops" id="ops"></div></div>`;
    const ecu = $('#ecu'), ops = $('#ops');
    const bloque = (n, cls) => `<div class="eb ${cls || ''}">${manchaSVG(C[n])}<span style="color:${C[n]}">${n}</span></div>`;
    function ronda() {
      const rd = P.rondas[ri];
      $('#cont').textContent = (ri + 1) + ' / ' + P.rondas.length;
      ecu.innerHTML = bloque(rd.a) + '<b class="sig">+</b>' + bloque(rd.b) + '<b class="sig">=</b><div class="eb inc titila" id="inc"><div class="preg">?</div></div>';
      ops.innerHTML = barajar(P.opciones).map(n => `<button class="op-c" data-c="${n}">${manchaSVG(C[n])}<span>${n}</span></button>`).join('');
      $$('.op-c', ops).forEach(b => b.onclick = () => {
        if (ops.classList.contains('espera')) return;
        const ok = b.dataset.c === rd.res;
        evaluar(S.i + ':r' + ri, ok);
        if (ok) {
          sonido('ok'); b.classList.add('bien'); $$('.op-c', ops).forEach(x => { if (x !== b) x.classList.add('apagada'); });
          const inc = $('#inc'); inc.classList.remove('titila'); inc.innerHTML = manchaSVG(C[rd.res]) + `<span style="color:${C[rd.res]}">${rd.res}</span>`; inc.classList.add('entra');
          bloquearHasta(ops, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(); else { ops.classList.add('espera'); completar(); } });
        } else {
          sonido('mal'); b.classList.remove('mal'); void b.offsetWidth; b.classList.add('mal');
          bloquearHasta(ops, P.err);
        }
      });
      bloquearHasta(ops, ri === 0 ? [P.instr, rd.audio] : rd.audio);
    }
    ronda();
  };

  /* ---- Elegir (opción múltiple con imágenes, emoji, escenas o colores) ---- */
  R.elegir = function (P, M) {
    let ri = 0;
    M.innerHTML = `<div class="elegir">
      <div class="enunciado"><span id="enun"></span> <span class="cont" id="cont"></span></div>
      <div class="el-visual" id="vis"></div>
      <div class="ops-el" id="ops"></div></div>`;
    const ops = $('#ops'), vis = $('#vis');
    function ronda() {
      const rd = P.rondas[ri];
      $('#cont').textContent = (ri + 1) + ' / ' + P.rondas.length;
      $('#enun').innerHTML = rd.texto;
      vis.innerHTML = rd.visual ? visualHTML(rd.visual, 'grande') : ''; vis.hidden = !rd.visual;
      const lista = rd.fijo ? rd.opciones : barajar(rd.opciones);
      const soloTexto = lista.every(o => !o.img && !o.emoji && !o.escena && !o.color && !o.paleta);
      ops.className = 'ops-el' + (soloTexto ? ' texto' : '') + (lista.length === 4 && !soloTexto ? ' cuatro' : '');
      ops.innerHTML = lista.map(o => `<button class="op-el" data-id="${o.id}">${soloTexto ? `<span class="v-label">${o.label}</span>` : visualHTML(o)}</button>`).join('');
      if (rd.visual) { const v = $('.visual', vis); if (v) v.classList.add('titila'); }
      $$('.op-el', ops).forEach(b => b.onclick = () => {
        if (ops.classList.contains('espera')) return;
        const ok = b.dataset.id === String(rd.correcta);
        evaluar(S.i + ':r' + ri, ok);
        if (ok) {
          sonido('ok'); b.classList.add('bien'); $$('.op-el', ops).forEach(x => { if (x !== b) x.classList.add('apagada'); });
          const v = $('.visual', vis); if (v) v.classList.remove('titila');
          if (rd.revela && v) { v.outerHTML = visualHTML(rd.revela, 'grande entra'); }
          bloquearHasta(ops, rd.ok, () => { ri++; if (ri < P.rondas.length) ronda(); else { ops.classList.add('espera'); completar(); } });
        } else {
          sonido('mal'); b.classList.remove('mal'); void b.offsetWidth; b.classList.add('mal');
          bloquearHasta(ops, P.err);
        }
      });
      bloquearHasta(ops, ri === 0 ? [P.instr, rd.audio] : rd.audio);
    }
    ronda();
  };

  /* ---- Asociar (tocar uno de la izquierda y su pareja de la derecha) ---- */
  const COL_PARES = ['#e63946', '#3a86ff', '#2a9d8f', '#fb8500', '#8338ec', '#ff006e', '#6a994e', '#0096c7'];
  R.asociar = function (P, M) {
    const izq = barajar(P.pares), der = barajar(P.pares);
    M.innerHTML = `<div class="asociar">
      <div class="enunciado">${P.texto || ''} <span class="cont" id="cont">0 / ${P.pares.length}</span></div>
      <div class="as-cols" id="cols">
        <div class="as-col">${izq.map(p => `<button class="as-it izq" data-id="${p.id}">${visualHTML(p.izq)}</button>`).join('')}</div>
        <div class="as-col">${der.map(p => `<button class="as-it der" data-id="${p.id}">${visualHTML(p.der)}</button>`).join('')}</div>
      </div></div>`;
    const cols = $('#cols'); let sel = null, hechos = 0;
    const par = id => P.pares.find(p => String(p.id) === id);
    function tocar(b) {
      if (cols.classList.contains('espera') || b.classList.contains('resuelto')) return;
      const lado = b.classList.contains('izq') ? 'izq' : 'der', p = par(b.dataset.id);
      if (!sel || sel.lado === lado) {
        $$('.as-it.' + lado, cols).forEach(x => x.classList.remove('sel'));
        b.classList.add('sel'); sel = { lado, b };
        const a = p[lado].audio; if (a) { pararAudio(); play(a); }
        return;
      }
      const a = sel.b, ok = a.dataset.id === b.dataset.id;
      const pi = par(lado === 'izq' ? b.dataset.id : a.dataset.id);
      evaluar(S.i + ':' + pi.id, ok);
      pararAudio();
      if (ok) {
        const c = COL_PARES[hechos % COL_PARES.length]; hechos++;
        [a, b].forEach(x => { x.classList.remove('sel'); x.classList.add('resuelto'); x.style.borderColor = c; x.style.background = c + '22'; });
        $('#cont').textContent = hechos + ' / ' + P.pares.length; sonido('ok'); sel = null;
        bloquearHasta(cols, p.ok, () => { if (hechos === P.pares.length) { cols.classList.add('espera'); completar(); } });
      } else {
        sonido('mal'); [a, b].forEach(x => { x.classList.remove('sel', 'mal'); void x.offsetWidth; x.classList.add('mal'); }); sel = null;
        bloquearHasta(cols, P.err);
      }
    }
    $$('.as-it', cols).forEach(b => b.onclick = () => tocar(b));
    bloquearHasta(cols, P.instr);
  };

  /* ---- Taller de arte configurable (actividad abierta) ----
     P.colores [nombres de D.colores o hex] · P.grupos [{t, c:[...]}] · P.mezclar
     P.texturas [{id, img, n, audio}] · P.herramientas [...] · P.sellos [...]
     P.plantilla 'monstruo' | 'horizonte' · P.nombre {label, placeholder} */
  const HERR = {
    lapiz: ['✏️', 't_lapiz'], linea: ['〰️', 't_linea'], mancha: ['🫧', 't_mancha'], punto: ['⚫', 't_punto'], circulo: ['⭕', 't_circulo'],
    sello: ['⭐', 't_sello'], balde: ['🪣', 't_balde'], nailon: ['🛍️', 't_nailon'], goma: ['🧽', 't_goma']
  };
  const PLANTILLAS = {
    monstruo(c) {
      const G = '#a3a3a3';
      c.lineWidth = 7; c.strokeStyle = '#2b2b2b'; c.lineJoin = 'round'; c.lineCap = 'round';
      const sh = (fn) => { c.beginPath(); fn(); c.fillStyle = G; c.fill(); c.stroke(); };
      const el = (x, y, rx, ry, r) => () => c.ellipse(x, y, rx, ry, r || 0, 0, Math.PI * 2);
      sh(el(318, 705, 58, 78)); sh(el(482, 705, 58, 78));
      sh(el(200, 470, 46, 118, 0.45)); sh(el(600, 470, 46, 118, -0.45));
      sh(el(400, 500, 190, 205));
      sh(el(400, 540, 102, 112));
      [[300, 400, 22], [500, 420, 26], [290, 580, 18], [515, 600, 20]].forEach(([x, y, r]) => sh(el(x, y, r, r)));
      sh(() => { c.moveTo(300, 150); c.lineTo(285, 52); c.lineTo(345, 120); c.closePath(); });
      sh(() => { c.moveTo(500, 150); c.lineTo(515, 52); c.lineTo(455, 120); c.closePath(); });
      sh(el(400, 235, 140, 118));
      [[335, 215, 34], [400, 180, 38], [465, 215, 34]].forEach(([x, y, r]) => { sh(el(x, y, r, r)); c.beginPath(); c.arc(x + 4, y + 4, r * 0.42, 0, Math.PI * 2); c.fillStyle = '#1b1b1b'; c.fill(); });
      c.beginPath(); c.moveTo(340, 285); c.quadraticCurveTo(400, 330, 460, 285); c.stroke();
      c.beginPath(); c.moveTo(370, 300); c.lineTo(380, 322); c.lineTo(392, 306); c.moveTo(410, 306); c.lineTo(422, 322); c.lineTo(432, 300); c.stroke();
    },
    eje(c) {
      c.save(); c.setLineDash([18, 14]); c.lineWidth = 4; c.strokeStyle = '#b8b0a4';
      c.beginPath(); c.moveTo(400, 0); c.lineTo(400, 800); c.stroke(); c.restore();
    },
    dividida(c, P) {
      c.lineWidth = 6; c.strokeStyle = '#2b2b2b'; c.beginPath(); c.moveTo(400, 0); c.lineTo(400, 800); c.stroke();
      const et = (P && P.etiquetas) || ['A', 'B'];
      c.font = '800 34px "Baloo 2", system-ui, sans-serif'; c.fillStyle = '#c9c0b2'; c.textAlign = 'center';
      c.fillText(et[0], 200, 50); c.fillText(et[1], 600, 50);
      if (P && P.ejeEspejo) { c.save(); c.setLineDash([16, 12]); c.lineWidth = 3; c.strokeStyle = '#c9c0b2'; c.beginPath(); c.moveTo(P.ejeEspejo, 70); c.lineTo(P.ejeEspejo, 800); c.stroke(); c.restore(); }
    },
    planos(c) {
      c.save(); c.setLineDash([16, 12]); c.lineWidth = 3; c.strokeStyle = '#c9c0b2';
      [300, 540].forEach(y => { c.beginPath(); c.moveTo(0, y); c.lineTo(800, y); c.stroke(); }); c.restore();
      c.font = '800 28px "Baloo 2", system-ui, sans-serif'; c.fillStyle = '#c9c0b2'; c.textAlign = 'right';
      c.fillText('fondo', 785, 40); c.fillText('medio', 785, 335); c.fillText('primer plano', 785, 575);
    },
    horizonte(c) {
      c.lineWidth = 6; c.strokeStyle = '#2b2b2b'; c.lineCap = 'round';
      c.beginPath(); c.moveTo(0, 420); c.bezierCurveTo(200, 370, 300, 470, 450, 410); c.bezierCurveTo(600, 360, 700, 430, 800, 400); c.stroke();
      c.font = '800 34px "Baloo 2", system-ui, sans-serif'; c.fillStyle = '#b8b0a4'; c.textAlign = 'center';
      c.fillText('cielo', 400, 220); c.fillText('tierra', 400, 640);
    }
  };

  R.taller = function (P, M) {
    const C = D.colores || {};
    const hexDe = x => C[x] || x;
    const T = S.taller || (S.taller = {
      tool: (P.herramientas || ['mancha'])[0], tam: 2, color: hexDe((P.colores || ['#e63946'])[0]), sello: (P.sellos || ['estrella'])[0], url: null, nombre: '',
      paleta: (P.colores || []).map(n => ({ hex: hexDe(n), n: C[n] ? n : null }))
    });
    const herrs = P.herramientas || ['lapiz', 'mancha', 'punto', 'circulo', 'sello', 'balde', 'goma'];
    if (T.espejo === undefined) T.espejo = P.espejo === 'activo';
    const TX = {}; (P.texturas || []).forEach(t => { const im = new Image(); im.src = t.img; TX[t.id] = { im, t, pat: null }; });
    M.innerHTML = `<div class="taller">
      <div class="tl-izq">
        ${P.balanza ? `<div class="tl-balanza" id="tlBal"><svg viewBox="0 0 240 60"><g id="balG">${balanzaSVG({ cx: 120, cy: 34, w: 200, ang: 0, pi: 9, pd: 9 })}</g></svg><span id="balTxt">Dibujá y mirá la balanza</span></div>` : ''}
        ${P.nombre ? `<label class="tl-nombre"><span>✏️ ${P.nombre.label}</span><input id="tlNom" maxlength="32" placeholder="${P.nombre.placeholder || ''}" value=""></label>` : ''}
        <div class="tl-lienzo" id="tl"><canvas id="cv" width="800" height="800"></canvas>
          ${P.mezclar ? `<div class="mezclador" id="mz" hidden>
            <div class="mz-tit">🥣 Tocá dos colores para mezclarlos</div>
            <div class="mz-bol"><div id="mzBol">${bolSVG()}</div><div class="bol-n" id="mzN"></div></div>
            <div class="paleta grande" id="mzPal"></div>
            <button class="btn chico" id="mzCerrar">✕ Cerrar</button></div>` : ''}</div></div>
      <div class="tl-panel" id="panel"><div class="tl-herr" id="herr"></div></div></div>`;
    const tl = $('#tl'), cv = $('#cv'), herr = $('#herr'), panel = $('#panel'), mz = $('#mz');
    const nom = $('#tlNom'); if (nom) { nom.value = T.nombre; nom.oninput = () => { T.nombre = nom.value; }; nom.onfocus = () => { if (P.nombre.audio) decir(P.nombre.audio); }; }
    const cF = cv.getContext ? cv.getContext('2d') : null;
    const hayCanvas = !!(cF && window.Path2D);
    const hist = [];
    function lienzoInicial() {
      cF.globalCompositeOperation = 'source-over'; cF.globalAlpha = 1;
      cF.fillStyle = '#fff'; cF.fillRect(0, 0, 800, 800);
      if (P.plantilla && PLANTILLAS[P.plantilla]) { cF.save(); PLANTILLAS[P.plantilla](cF, P); cF.restore(); }
    }
    if (hayCanvas) {
      lienzoInicial();
      if (T.url) { const im = new Image(); im.onload = () => cF.drawImage(im, 0, 0); im.src = T.url; }
    }
    S.salir = () => { if (hayCanvas) { try { T.url = cv.toDataURL('image/png'); } catch (e) { } } };
    const TAM = { lapiz: [5, 9, 15], mancha: [110, 190, 300], linea: [10, 24, 46], punto: [9, 17, 30], circulo: [32, 65, 120], sello: [110, 190, 310], nailon: [150, 250, 380], goma: [24, 50, 90] };
    const tam = () => TAM[T.tool] ? TAM[T.tool][T.tam - 1] : 0;
    const esTx = () => T.color.indexOf('tx:') === 0;
    function relleno(ctx) {
      if (!esTx()) return T.color;
      const x = TX[T.color.slice(3)];
      if (!x || !x.im.complete || !x.im.naturalWidth) return '#c8c0b4';
      if (!x.pat) { x.pat = ctx.createPattern(x.im, 'repeat'); try { x.pat.setTransform(new DOMMatrix().scale(0.45)); } catch (e) { } }
      return x.pat;
    }

    function guardarHist() { try { hist.push(cF.getImageData(0, 0, 800, 800)); if (hist.length > 6) hist.shift(); } catch (e) { } }
    function forma(id, x, y, s, rot, flip) {
      const k = s / 100;
      cF.save(); cF.translate(x, y); if (flip) cF.scale(-1, 1); cF.rotate(rot || 0); cF.translate(-s / 2, -s / 2); cF.scale(k, k);
      if (id === 'ojo') {
        cF.fillStyle = '#fff'; cF.fill(new Path2D(FORMAS.ojo)); cF.lineWidth = 4; cF.strokeStyle = '#1b1b1b'; cF.stroke(new Path2D(FORMAS.ojo));
        cF.fillStyle = '#1b1b1b'; cF.beginPath(); cF.arc(54, 54, 20, 0, Math.PI * 2); cF.fill();
        cF.fillStyle = '#fff'; cF.beginPath(); cF.arc(46, 44, 6, 0, Math.PI * 2); cF.fill();
      } else { cF.fillStyle = relleno(cF); cF.fill(new Path2D(FORMAS[id]), 'nonzero'); }
      cF.restore();
    }
    const RECTOS = ['nube', 'casa', 'arbol', 'montania', 'sol', 'cuadrado', 'rectangulo', 'pata', 'ojo', 'circulo', 'rombo', 'ovalo', 'triangulo', 'estrella', 'corazon'];
    function estampar(x, y) {
      const azar = { s: 0.85 + Math.random() * 0.3, r: Math.random() * Math.PI * 2, r2: RECTOS.includes(T.sello) ? 0 : (Math.random() - 0.5) * 0.5 };
      unaVez(x, y, azar, false);
      if (T.espejo && enEspejo(x)) unaVez(espX(x), y, azar, true);
    }
    const EJE = P.ejeEspejo || 400;
    const espX = x => 2 * EJE - x;
    const enEspejo = x => x <= 2 * EJE;
    function unaVez(x, y, z, flip) {
      cF.globalCompositeOperation = 'source-over'; cF.globalAlpha = 1;
      if (T.tool === 'mancha') forma('mancha', x, y, tam() * z.s, z.r, flip);
      else if (T.tool === 'punto') { cF.fillStyle = relleno(cF); cF.beginPath(); cF.arc(x, y, tam(), 0, Math.PI * 2); cF.fill(); }
      else if (T.tool === 'circulo') { const r = tam(); cF.strokeStyle = relleno(cF); cF.lineWidth = Math.max(6, r * 0.2); cF.beginPath(); cF.arc(x, y, r, 0, Math.PI * 2); cF.stroke(); }
      else if (T.tool === 'sello') forma(T.sello, x, y, tam(), z.r2, flip);
      else if (T.tool === 'nailon') {
        cF.save(); cF.globalCompositeOperation = 'multiply'; cF.globalAlpha = 0.62;
        forma(T.sello, x, y, tam(), 0, flip); cF.restore();
      }
    }
    function balde(x, y) {
      x = Math.max(0, Math.min(799, x | 0)); y = Math.max(0, Math.min(799, y | 0));
      const W = 800, H = 800, img = cF.getImageData(0, 0, W, H), d = img.data, i0 = (y * W + x) * 4;
      const r0 = d[i0], g0 = d[i0 + 1], b0 = d[i0 + 2], tx = esTx(), c1 = tx ? [0, 0, 0] : hexRgb(T.color);
      if (!tx && Math.abs(r0 - c1[0]) + Math.abs(g0 - c1[1]) + Math.abs(b0 - c1[2]) < 12) return;
      const tol = tx ? 60 : 110, vis = new Uint8Array(W * H), st = [x, y];
      const ok = p => { const k = p * 4; return Math.abs(d[k] - r0) + Math.abs(d[k + 1] - g0) + Math.abs(d[k + 2] - b0) <= tol; };
      while (st.length) {
        const yy = st.pop(); let xx = st.pop(), p = yy * W + xx;
        while (xx >= 0 && !vis[p] && ok(p)) { xx--; p--; }
        xx++; p++; let up = false, dn = false;
        while (xx < W && !vis[p] && ok(p)) {
          vis[p] = 1;
          if (yy > 0) { const q = p - W; if (!vis[q] && ok(q)) { if (!up) { st.push(xx, yy - 1); up = true; } } else up = false; }
          if (yy < H - 1) { const q = p + W; if (!vis[q] && ok(q)) { if (!dn) { st.push(xx, yy + 1); dn = true; } } else dn = false; }
          xx++; p++;
        }
      }
      // máscara de la zona → se pinta con color o textura
      const m = document.createElement('canvas'); m.width = W; m.height = H; const mc = m.getContext('2d');
      const md = mc.createImageData(W, H);
      for (let p = 0; p < W * H; p++) if (vis[p]) md.data[p * 4 + 3] = 255;
      mc.putImageData(md, 0, 0);
      // engorda 1 px la máscara para tapar el borde suavizado
      const m2 = document.createElement('canvas'); m2.width = W; m2.height = H; m2.getContext('2d').drawImage(m, 0, 0);
      mc.drawImage(m2, 1, 0); mc.drawImage(m2, -1, 0); mc.drawImage(m2, 0, 1); mc.drawImage(m2, 0, -1);
      mc.globalCompositeOperation = 'source-in'; mc.fillStyle = relleno(mc); mc.fillRect(0, 0, W, H);
      cF.globalCompositeOperation = 'source-over'; cF.globalAlpha = 1; cF.drawImage(m, 0, 0);
    }

    let balEstado = null;
    function medir() {
      if (!P.balanza || !hayCanvas) return;
      const n = 80, t = document.createElement('canvas'); t.width = n; t.height = n;
      const tc = t.getContext('2d'); tc.drawImage(cv, 0, 0, n, n);
      const d = tc.getImageData(0, 0, n, n).data; let mom = 0, masa = 0;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const k = (y * n + x) * 4, w = (765 - d[k] - d[k + 1] - d[k + 2]) / 765;
        if (w < 0.06) continue;
        masa += w; mom += w * (x + 0.5 - n / 2) / (n / 2);
      }
      const r = masa > 4 ? mom / masa : 0, ang = Math.max(-18, Math.min(18, r * 60));
      const g = $('#balG'); if (g) g.innerHTML = balanzaSVG({ cx: 120, cy: 34, w: 200, ang, pi: 9, pd: 9 });
      const est = masa <= 4 ? 'vacio' : Math.abs(r) < 0.07 ? 'eq' : r < 0 ? 'izq' : 'der';
      $('#balTxt').textContent = est === 'vacio' ? 'Dibujá y mirá la balanza' : est === 'eq' ? '⚖️ ¡Equilibrada!' : est === 'izq' ? '⬅️ Cargada a la izquierda' : 'Cargada a la derecha ➡️';
      $('#tlBal').className = 'tl-balanza ' + est;
      if (est !== balEstado && est !== 'vacio' && balEstado !== null && D.audios['bal_' + est] && !audioOcupado()) play('bal_' + est);
      balEstado = est;
    }
    function nombreDe(hex) { return Object.keys(C).find(k => C[k] === hex) || null; }
    function swatches(attr) {
      const sw = (hex) => `<button class="sw${hex === T.color ? ' on' : ''}" data-${attr}="${hex}" style="background:${hex}" aria-label="${nombreDe(hex) || 'color'}"></button>`;
      let h = '';
      if (P.grupos) h = P.grupos.map(g => `<div class="grupo"><small>${g.t}</small><div class="paleta">${g.c.map(n => sw(hexDe(n))).join('')}</div></div>`).join('') +
        (T.paleta.length > P.grupos.reduce((a, g) => a + g.c.length, 0) ? `<div class="grupo"><small>nuevos</small><div class="paleta">${T.paleta.filter(c => !P.grupos.some(g => g.c.map(hexDe).includes(c.hex))).map(c => sw(c.hex)).join('')}</div></div>` : '');
      else h = `<div class="paleta">${T.paleta.map(c => sw(c.hex)).join('')}</div>`;
      if (P.texturas) h += `<div class="grupo"><small>texturas</small><div class="paleta">${P.texturas.map(t => `<button class="sw tx${T.color === 'tx:' + t.id ? ' on' : ''}" data-${attr}="tx:${t.id}" style="background-image:url('${t.img}')" aria-label="${t.n}"></button>`).join('')}</div></div>`;
      return h;
    }
    function herramientas() {
      const conForma = T.tool === 'sello' || T.tool === 'nailon';
      herr.innerHTML =
        `<div class="fila-h">${herrs.map(t => `<button class="hb tool${T.tool === t ? ' on' : ''}" data-tool="${t}" data-audio="${HERR[t][1]}">${HERR[t][0]}</button>`).join('')}</div>` +
        (conForma && P.sellos ? `<div class="fila-h">${P.sellos.map(s => `<button class="hb sello${T.sello === s ? ' on' : ''}" data-sello="${s}">${s === 'ojo' ? '👁️' : iconoForma(s)}</button>`).join('')}</div>` : '') +
        `<div class="fila-h">${TAM[T.tool] ? [1, 2, 3].map(n => `<button class="hb tam${T.tam === n ? ' on' : ''}" data-tam="${n}" data-audio="tam_${n}"><i style="width:${6 + n * 6}px;height:${6 + n * 6}px"></i></button>`).join('') : ''}
           ${P.espejo ? `<button class="hb espejo${T.espejo ? ' on' : ''}" data-acc="espejo" data-audio="${T.espejo ? 't_espejo_no' : 't_espejo'}">🪞 Espejo ${T.espejo ? 'sí' : 'no'}</button>` : ''}
           <button class="hb" data-acc="deshacer" data-audio="t_deshacer">↩️</button><button class="hb" data-acc="borrar" data-audio="t_borrar">🗑️</button><button class="hb" data-acc="guardar">💾 Guardar</button></div>` +
        `<div class="fila-h pal-fila">${swatches('color')}${P.mezclar ? '<button class="hb mezclar" id="bMez">🥣 Mezclar</button>' : ''}</div>`;
      $$('[data-tool]', herr).forEach(b => b.onclick = () => { T.tool = b.dataset.tool; herramientas(); decir(b.dataset.audio); });
      $$('[data-sello]', herr).forEach(b => b.onclick = () => { T.sello = b.dataset.sello; herramientas(); if (D.audios['s_' + T.sello]) decir('s_' + T.sello); });
      $$('[data-tam]', herr).forEach(b => b.onclick = () => { T.tam = +b.dataset.tam; herramientas(); decir(b.dataset.audio); });
      $$('[data-color]', herr).forEach(b => b.onclick = () => {
        T.color = b.dataset.color; if (T.tool === 'goma') T.tool = herrs[0]; herramientas();
        if (esTx()) { const t = TX[T.color.slice(3)]; if (t && t.t.audio) decir(t.t.audio); }
        else { const n = nombreDe(T.color); if (n && D.audios['c_' + n]) decir('c_' + n); }
      });
      $$('[data-acc]', herr).forEach(b => b.onclick = () => {
        if (!hayCanvas) return;
        const a = b.dataset.acc;
        if (a === 'espejo') { T.espejo = !T.espejo; herramientas(); decir(b.dataset.audio); return; }
        if (a === 'deshacer') { const d = hist.pop(); if (d) cF.putImageData(d, 0, 0); decir(b.dataset.audio); medir(); }
        else if (a === 'borrar') { guardarHist(); lienzoInicial(); decir(b.dataset.audio); medir(); }
        else guardarObra();
      });
      const bm = $('#bMez', herr); if (bm) bm.onclick = abrirMezclador;
      ajustarLienzo();
    }
    function ajustarLienzo() {
      const izq = $('.tl-izq', M); if (!izq) return;
      tl.style.width = '';
      if (innerWidth > innerHeight) return; // en horizontal, lienzo y panel van lado a lado
      const extra = Array.from(izq.children).filter(c => c !== tl).reduce((a, c) => a + c.offsetHeight + 5, 0);
      const libre = M.clientHeight - panel.offsetHeight - extra - 22;
      const natural = tl.offsetWidth;
      if (libre > 120 && libre < natural) tl.style.width = Math.floor(libre) + 'px';
    }
    window.addEventListener('resize', ajustarLienzo);
    const salirPrev = S.salir; S.salir = () => { window.removeEventListener('resize', ajustarLienzo); if (salirPrev) salirPrev(); };
    function guardarObra() {
      let url;
      if (P.nombre && T.nombre.trim()) {
        const o = document.createElement('canvas'); o.width = 800; o.height = 880; const c = o.getContext('2d');
        c.fillStyle = '#fff9ef'; c.fillRect(0, 0, 800, 880); c.drawImage(cv, 0, 0);
        c.fillStyle = '#2b2118'; c.textAlign = 'center'; let t = 44;
        const txt = (P.nombre.prefijo || '') + T.nombre.trim();
        do { c.font = `800 ${t}px "Baloo 2", system-ui, sans-serif`; t -= 2; } while (t > 18 && c.measureText(txt).width > 760);
        c.fillText(txt, 400, 855); url = o.toDataURL('image/png');
      } else url = cv.toDataURL('image/png');
      S.obraURL = url; descargar(url, P.archivo); decir('p_guardar');
    }
    function decir(k) { if (!k || !D.audios[k]) return; pararAudio(); play(k); }

    /* --- mezclador --- */
    let mzSel = [];
    function pintarMz() {
      const mzBol = $('#mzBol');
      $('#mzPal').innerHTML = T.paleta.map(c => `<button class="sw${mzSel.includes(c.hex) ? ' on' : ''}" data-mz="${c.hex}" style="background:${c.hex}"></button>`).join('');
      const a = mzSel[0], b = mzSel[1] || mzSel[0];
      $('#bolA', mzBol).setAttribute('fill', a || 'none'); $('#bolB', mzBol).setAttribute('fill', b || 'none');
      $('#bolVacio', mzBol).setAttribute('opacity', a ? '0' : '1');
      $$('[data-mz]', mz).forEach(s => s.onclick = () => elegirMz(s.dataset.mz));
    }
    function abrirMezclador() {
      const mzBol = $('#mzBol');
      mzSel = []; mz.hidden = false; $('#mzN').textContent = '';
      $('#bolRes', mzBol).setAttribute('opacity', '0'); $('#bolGiro', mzBol).classList.remove('gira');
      pintarMz(); decir('mz_abrir');
    }
    function cerrarMz() { mz.hidden = true; mz.classList.remove('espera'); }
    if (mz) $('#mzCerrar').onclick = cerrarMz;
    function elegirMz(hex) {
      if (mz.classList.contains('espera')) return;
      const k = mzSel.indexOf(hex);
      if (k >= 0) mzSel.splice(k, 1); else mzSel.push(hex);
      pintarMz();
      const n = nombreDe(hex); if (n && k < 0) decir('c_' + n);
      if (mzSel.length < 2) return;
      mz.classList.add('espera');
      const mzBol = $('#mzBol'), mzN = $('#mzN');
      const na = nombreDe(mzSel[0]), nb = nombreDe(mzSel[1]), nomb = (na && nb) ? mezclaDe(na, nb) : null;
      const hex2 = nomb ? C[nomb] : rgbHex(hexRgb(mzSel[0]).map((v, j) => (v + hexRgb(mzSel[1])[j]) / 2));
      const giro = $('#bolGiro', mzBol); giro.classList.remove('gira'); void giro.getBoundingClientRect(); giro.classList.add('gira');
      setTimeout(() => {
        const res = $('#bolRes', mzBol); res.setAttribute('fill', hex2); res.setAttribute('opacity', '1');
        mzN.textContent = nomb ? '= ' + nomb : '= ✨'; mzN.style.color = hex2;
        const ya = T.paleta.find(c => difColor(c.hex, hex2) < 24);
        let aud = 'mz_ya';
        if (!ya && T.paleta.length < 16) { T.paleta.push({ hex: hex2, n: nomb }); aud = nomb ? 'mz_' + nomb : 'mz_nuevo'; sonido('ok'); }
        T.color = ya ? ya.hex : hex2; if (T.tool === 'goma') T.tool = herrs[0];
        herramientas();
        pararAudio(); play(aud, () => { cerrarMz(); });
      }, window.__RAPIDO ? 5 : 1300);
    }

    // dibujo con puntero
    let trazo = null;
    const pos = ev => { const r = tl.getBoundingClientRect(); return [(ev.clientX - r.left) / (r.width || 1) * 800, (ev.clientY - r.top) / (r.height || 1) * 800]; };
    const esTrazo = () => T.tool === 'linea' || T.tool === 'lapiz' || T.tool === 'goma';
    cv.addEventListener('pointerdown', ev => {
      if (!hayCanvas || panel.classList.contains('espera') || tl.classList.contains('espera')) return;
      ev.preventDefault(); try { cv.setPointerCapture(ev.pointerId); } catch (e) { }
      const [x, y] = pos(ev);
      guardarHist();
      if (T.tool === 'balde') { balde(x, y); if (T.espejo && enEspejo(x) && Math.abs(x - EJE) > 6) balde(espX(x), y); medir(); return; }
      if (esTrazo()) {
        cF.globalCompositeOperation = 'source-over'; cF.globalAlpha = 1;
        cF.strokeStyle = T.tool === 'goma' ? '#ffffff' : relleno(cF); cF.lineCap = 'round'; cF.lineJoin = 'round'; cF.lineWidth = tam();
        segmento(x, y, x + 0.1, y + 0.1);
      } else estampar(x, y);
      trazo = { x, y };
    });
    cv.addEventListener('pointermove', ev => {
      if (!trazo) return;
      const [x, y] = pos(ev);
      if (esTrazo()) { segmento(trazo.x, trazo.y, x, y); trazo.x = x; trazo.y = y; return; }
      if (T.tool === 'nailon') return; // el nailon se apoya de a una pieza
      const paso = T.tool === 'punto' ? tam() * 3 : tam() * 0.9;
      if (Math.hypot(x - trazo.x, y - trazo.y) > paso) { estampar(x, y); trazo.x = x; trazo.y = y; }
    });
    function segmento(x1, y1, x2, y2) {
      cF.beginPath(); cF.moveTo(x1, y1); cF.lineTo(x2, y2); cF.stroke();
      if (T.espejo && enEspejo(x1) && enEspejo(x2)) { cF.beginPath(); cF.moveTo(espX(x1), y1); cF.lineTo(espX(x2), y2); cF.stroke(); }
    }
    const soltar = () => { if (trazo) medir(); trazo = null; };
    cv.addEventListener('pointerup', soltar); cv.addEventListener('pointercancel', soltar);

    herramientas();
    tl.classList.add('espera'); panel.classList.add('espera');
    play(P.instr, () => { tl.classList.remove('espera'); panel.classList.remove('espera'); completar(); });
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
