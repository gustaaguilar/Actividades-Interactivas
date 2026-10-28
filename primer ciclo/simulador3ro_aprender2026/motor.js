// Dibujos por código (SVG) para los ítems de Matemática
var Visual = (function () {
  var AZUL = "#1f4e9c", TINTA = "#1d2b45", CELESTE = "#dbe8ff", AMARILLO = "#ffd36b";
  function e(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function svg(w, h, body) { return '<svg class="vis-svg" viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg" role="img">' + body + "</svg>"; }
  function t(x, y, s, size, color, extra) { return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 18) + '" fill="' + (color || TINTA) + '" text-anchor="middle" font-family="sans-serif" ' + (extra || "") + ">" + e(s) + "</text>"; }

  function reloj(h, m, cx, cy, r, label) {
    var s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#fff" stroke="' + AZUL + '" stroke-width="' + r * 0.06 + '"/>';
    for (var i = 0; i < 60; i++) {
      var a = i * 6 * Math.PI / 180, r1 = i % 5 ? r * 0.9 : r * 0.82, r2 = r * 0.95;
      s += '<line x1="' + (cx + Math.sin(a) * r1) + '" y1="' + (cy - Math.cos(a) * r1) + '" x2="' + (cx + Math.sin(a) * r2) + '" y2="' + (cy - Math.cos(a) * r2) + '" stroke="' + TINTA + '" stroke-width="' + (i % 5 ? 1 : 3) + '"/>';
    }
    for (var n = 1; n <= 12; n++) { var b = n * 30 * Math.PI / 180; s += t(cx + Math.sin(b) * r * 0.67, cy - Math.cos(b) * r * 0.67 + r * 0.09, n, r * 0.2, TINTA, 'font-weight="bold"'); }
    var ah = ((h % 12) + m / 60) * 30 * Math.PI / 180, am = m * 6 * Math.PI / 180;
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.sin(ah) * r * 0.48) + '" y2="' + (cy - Math.cos(ah) * r * 0.48) + '" stroke="' + TINTA + '" stroke-width="' + r * 0.08 + '" stroke-linecap="round"/>';
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.sin(am) * r * 0.78) + '" y2="' + (cy - Math.cos(am) * r * 0.78) + '" stroke="#d6453d" stroke-width="' + r * 0.045 + '" stroke-linecap="round"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * 0.06 + '" fill="' + TINTA + '"/>';
    if (label) s += t(cx, cy + r + 30, label, 22, AZUL, 'font-weight="bold"');
    return s;
  }

  function recta(v) {
    var n = (v.hasta - v.desde) / v.paso, W = 640, x0 = 40, L = 560, s = "";
    s += '<line x1="20" y1="60" x2="620" y2="60" stroke="' + TINTA + '" stroke-width="3"/><polygon points="620,52 636,60 620,68" fill="' + TINTA + '"/>';
    for (var i = 0; i <= n; i++) {
      var val = v.desde + i * v.paso, x = x0 + i * L / n;
      s += '<line x1="' + x + '" y1="48" x2="' + x + '" y2="72" stroke="' + TINTA + '" stroke-width="3"/>';
      if (val === v.incognita) s += '<rect class="titila" x="' + (x - 30) + '" y="86" width="60" height="38" rx="8" fill="' + AMARILLO + '" stroke="' + AZUL + '" stroke-width="3"/>' + t(x, 113, "?", 26, TINTA, 'font-weight="bold"');
      else if (v.mostrar.indexOf(val) >= 0) s += t(x, 112, val, 22, TINTA, 'font-weight="bold"');
    }
    return svg(W, 140, s);
  }

  function serie(v) {
    var n = v.nums.length, w = 110, gap = v.sinFlechas ? 20 : 40, W = n * w + (n - 1) * gap + 20, s = "";
    v.nums.forEach(function (x, i) {
      var px = 10 + i * (w + gap), q = x === "?";
      s += '<rect ' + (q ? 'class="titila" ' : "") + 'x="' + px + '" y="20" width="' + w + '" height="70" rx="12" fill="' + (q ? AMARILLO : CELESTE) + '" stroke="' + AZUL + '" stroke-width="3"/>' + t(px + w / 2, 66, x, 32, TINTA, 'font-weight="bold"');
      if (!v.sinFlechas && i < n - 1) s += t(px + w + gap / 2, 64, "→", 26, AZUL);
    });
    return svg(W, 110, s);
  }

  function valorPos(v) {
    var nom = ["Centenas", "Decenas", "Unidades"], s = "";
    v.num.split("").forEach(function (d, i) {
      var x = 20 + i * 130, mk = i === v.marca;
      s += t(x + 60, 30, nom[i], 18, "#4a5a78");
      s += '<rect ' + (mk ? 'class="titila" ' : "") + 'x="' + x + '" y="42" width="120" height="100" rx="12" fill="' + (mk ? AMARILLO : "#fff") + '" stroke="' + AZUL + '" stroke-width="3"/>' + t(x + 60, 115, d, 60, TINTA, 'font-weight="bold"');
    });
    return svg(410, 160, s);
  }

  function grupos(v) {
    var s = "", x = 10, y = 20;
    for (var i = 0; i < v.c; i++) { s += '<rect x="' + x + '" y="' + y + '" width="90" height="90" rx="6" fill="#c98b4a" stroke="#7a4f22" stroke-width="3"/><rect x="' + x + '" y="' + y + '" width="90" height="22" fill="#a86f34"/>' + t(x + 45, y + 68, "100", 26, "#fff", 'font-weight="bold"'); x += 104; }
    if (v.c) x += 16;
    for (var j = 0; j < v.d; j++) { s += '<path d="M' + (x + 8) + " " + (y + 30) + " Q" + (x + 26) + " " + (y + 10) + " " + (x + 44) + " " + (y + 30) + " L" + (x + 48) + " " + (y + 90) + " L" + (x + 4) + " " + (y + 90) + ' Z" fill="#7cc4ff" stroke="' + AZUL + '" stroke-width="3"/>' + t(x + 26, y + 70, "10", 20, TINTA, 'font-weight="bold"'); x += 58; }
    if (v.d) x += 16;
    for (var k = 0; k < v.u; k++) { var cx = x + (k % 4) * 26 + 12, cy = y + 30 + Math.floor(k / 4) * 30; s += '<circle cx="' + cx + '" cy="' + cy + '" r="10" fill="#ff7a90" stroke="#b03a52" stroke-width="2"/>'; }
    x += Math.min(v.u, 4) * 26 + 10;
    return svg(Math.max(x, 200), 130, s);
  }

  function arreglo(v) {
    var s = "", c = 54;
    for (var f = 0; f < v.filas; f++) for (var k = 0; k < v.cols; k++) {
      var x = 20 + k * c, y = 16 + f * c;
      if (v.icono === "nene") s += '<circle cx="' + (x + 20) + '" cy="' + (y + 12) + '" r="10" fill="#f2c08f"/><rect x="' + (x + 8) + '" y="' + (y + 22) + '" width="24" height="20" rx="8" fill="#5b8def"/>';
      else s += '<rect x="' + (x + 8) + '" y="' + (y + 2) + '" width="26" height="18" rx="3" fill="#e36b3a"/><rect x="' + (x + 6) + '" y="' + (y + 20) + '" width="30" height="8" rx="2" fill="#b4492a"/><rect x="' + (x + 8) + '" y="' + (y + 28) + '" width="4" height="14" fill="#7a3a1e"/><rect x="' + (x + 30) + '" y="' + (y + 28) + '" width="4" height="14" fill="#7a3a1e"/>';
    }
    return svg(40 + v.cols * c, 30 + v.filas * c, s);
  }

  function barras(v) {
    var W = 520, H = 300, x0 = 50, y0 = 250, max = 10, s = t(W / 2, 24, v.titulo, 20, AZUL, 'font-weight="bold"');
    for (var g = 0; g <= max; g++) { var y = y0 - g * 20; s += '<line x1="' + x0 + '" y1="' + y + '" x2="' + (W - 10) + '" y2="' + y + '" stroke="#d5dceb"/>' + t(x0 - 16, y + 6, g, 15, "#4a5a78"); }
    var cols = ["#f6c343", "#e5534b", "#f39237", "#8e6bd6"], bw = 70, sp = (W - x0 - 10) / v.datos.length;
    v.datos.forEach(function (d, i) { var h = d[1] * 20, x = x0 + i * sp + (sp - bw) / 2; s += '<rect x="' + x + '" y="' + (y0 - h) + '" width="' + bw + '" height="' + h + '" fill="' + cols[i % 4] + '"/>' + t(x + bw / 2, y0 + 24, d[0], 17, TINTA, 'font-weight="bold"'); });
    s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + (W - 10) + '" y2="' + y0 + '" stroke="' + TINTA + '" stroke-width="2"/><line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="40" stroke="' + TINTA + '" stroke-width="2"/>';
    return svg(W, H, s);
  }

  function monedas(v) {
    var s = "", x = 10;
    v.lista.forEach(function (m) {
      var r = m >= 100 ? 44 : m >= 50 ? 40 : 34, oro = m >= 50;
      s += '<circle cx="' + (x + r) + '" cy="60" r="' + r + '" fill="' + (oro ? "#f2c94c" : "#cfd6e0") + '" stroke="' + (oro ? "#b8860b" : "#7d8794") + '" stroke-width="4"/><circle cx="' + (x + r) + '" cy="60" r="' + (r - 8) + '" fill="none" stroke="' + (oro ? "#d4a017" : "#a0a9b5") + '" stroke-width="2"/>' + t(x + r, 68, "$" + m, r * 0.5, TINTA, 'font-weight="bold"');
      x += r * 2 + 14;
    });
    return svg(x, 120, s);
  }

  function regla(v) {
    var cm = 44, x0 = 30, s = "";
    var px1 = x0 + v.desde * cm, px2 = x0 + v.hasta * cm;
    s += '<rect x="' + (px1 + 26) + '" y="20" width="' + (px2 - px1 - 26 - 30) + '" height="30" fill="#f6c343" stroke="#a87b00" stroke-width="2"/>';
    s += '<rect x="' + px1 + '" y="20" width="26" height="30" fill="#e98aa0" stroke="#a54a60" stroke-width="2"/>';
    s += '<polygon points="' + (px2 - 30) + ',20 ' + px2 + ',35 ' + (px2 - 30) + ',50" fill="#f1d6a8" stroke="#a87b00" stroke-width="2"/><polygon points="' + (px2 - 9) + ',30 ' + px2 + ',35 ' + (px2 - 9) + ',40" fill="' + TINTA + '"/>';
    s += '<line x1="' + px1 + '" y1="50" x2="' + px1 + '" y2="70" stroke="#d6453d" stroke-dasharray="4 3" stroke-width="2"/><line x1="' + px2 + '" y1="50" x2="' + px2 + '" y2="70" stroke="#d6453d" stroke-dasharray="4 3" stroke-width="2"/>';
    s += '<rect x="10" y="70" width="' + (13 * cm + 40) + '" height="70" rx="6" fill="#fff6d8" stroke="#a87b00" stroke-width="2"/>';
    for (var i = 0; i <= 13 * 10; i++) { var x = x0 + i * cm / 10, L = i % 10 === 0 ? 26 : i % 5 === 0 ? 18 : 10; s += '<line x1="' + x + '" y1="70" x2="' + x + '" y2="' + (70 + L) + '" stroke="' + TINTA + '" stroke-width="' + (i % 10 ? 1 : 2) + '"/>'; if (i % 10 === 0) s += t(x, 124, i / 10, 18, TINTA, 'font-weight="bold"'); }
    s += t(13 * cm + 30, 136, "cm", 14, "#4a5a78");
    return svg(13 * cm + 60, 150, s);
  }

  function poligono(n, cx, cy, r, fill) {
    var p = [];
    for (var i = 0; i < n; i++) { var a = (i * 360 / n - 90) * Math.PI / 180; p.push((cx + Math.cos(a) * r).toFixed(1) + "," + (cy + Math.sin(a) * r).toFixed(1)); }
    return '<polygon points="' + p.join(" ") + '" fill="' + (fill || CELESTE) + '" stroke="' + AZUL + '" stroke-width="4" stroke-linejoin="round"/>';
  }

  function figuraNombre(f, cx, cy) {
    if (f === "triangulo") return poligono(3, cx, cy + 8, 52, "#ffe0a3");
    if (f === "cuadrado") return '<rect x="' + (cx - 42) + '" y="' + (cy - 42) + '" width="84" height="84" fill="#c9f0d0" stroke="' + AZUL + '" stroke-width="4"/>';
    if (f === "circulo") return '<circle cx="' + cx + '" cy="' + cy + '" r="45" fill="#ffd0dc" stroke="' + AZUL + '" stroke-width="4"/>';
    if (f === "rombo") return '<polygon points="' + cx + "," + (cy - 40) + " " + (cx + 62) + "," + cy + " " + cx + "," + (cy + 40) + " " + (cx - 62) + "," + cy + '" fill="#ffe7b0" stroke="' + AZUL + '" stroke-width="4" stroke-linejoin="round"/>';
    if (f === "trapecio") return '<polygon points="' + (cx - 30) + "," + (cy - 34) + " " + (cx + 30) + "," + (cy - 34) + " " + (cx + 60) + "," + (cy + 34) + " " + (cx - 60) + "," + (cy + 34) + '" fill="#cdeff7" stroke="' + AZUL + '" stroke-width="4" stroke-linejoin="round"/>';
    return '<rect x="' + (cx - 58) + '" y="' + (cy - 28) + '" width="116" height="56" fill="#dcd2ff" stroke="' + AZUL + '" stroke-width="4"/>';
  }

  var NOMBRES = { cubo: "Cubo", esfera: "Esfera", piramide: "Pirámide", cilindro: "Cilindro", cono: "Cono", prisma: "Prisma triangular",
    cuadrado: "Cuadrado", rectangulo: "Rectángulo", rombo: "Rombo", trapecio: "Trapecio", triangulo: "Triángulo", circulo: "Círculo" };
  function cuerpo(c, cx, cy) {
    var s = "";
    if (c === "cubo") {
      s += '<polygon points="' + (cx - 45) + "," + (cy - 20) + " " + (cx + 25) + "," + (cy - 20) + " " + (cx + 25) + "," + (cy + 50) + " " + (cx - 45) + "," + (cy + 50) + '" fill="#7cb7ff" stroke="' + AZUL + '" stroke-width="3"/>';
      s += '<polygon points="' + (cx - 45) + "," + (cy - 20) + " " + (cx - 20) + "," + (cy - 45) + " " + (cx + 50) + "," + (cy - 45) + " " + (cx + 25) + "," + (cy - 20) + '" fill="#b5d6ff" stroke="' + AZUL + '" stroke-width="3"/>';
      s += '<polygon points="' + (cx + 25) + "," + (cy - 20) + " " + (cx + 50) + "," + (cy - 45) + " " + (cx + 50) + "," + (cy + 25) + " " + (cx + 25) + "," + (cy + 50) + '" fill="#4f93e6" stroke="' + AZUL + '" stroke-width="3"/>';
    } else if (c === "esfera") {
      s += '<defs><radialGradient id="gEsf" cx="35%" cy="35%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#ff8a5c"/></radialGradient></defs><circle cx="' + cx + '" cy="' + cy + '" r="50" fill="url(#gEsf)" stroke="#c4532a" stroke-width="3"/>';
    } else if (c === "piramide") {
      s += '<polygon points="' + cx + "," + (cy - 55) + " " + (cx - 55) + "," + (cy + 40) + " " + (cx + 15) + "," + (cy + 55) + '" fill="#ffd36b" stroke="#a87b00" stroke-width="3"/><polygon points="' + cx + "," + (cy - 55) + " " + (cx + 15) + "," + (cy + 55) + " " + (cx + 55) + "," + (cy + 35) + '" fill="#e8b23a" stroke="#a87b00" stroke-width="3"/>';
    } else if (c === "cono") {
      s += '<path d="M' + cx + " " + (cy - 55) + " L" + (cx + 42) + " " + (cy + 40) + " A42 13 0 0 1 " + (cx - 42) + " " + (cy + 40) + ' Z" fill="#ffc2d4" stroke="#b03a62" stroke-width="3"/><ellipse cx="' + cx + '" cy="' + (cy + 40) + '" rx="42" ry="13" fill="none" stroke="#b03a62" stroke-width="2" stroke-dasharray="5 4"/>';
    } else if (c === "prisma") {
      s += '<polygon points="' + (cx - 50) + "," + (cy + 40) + " " + (cx - 20) + "," + (cy + 40) + " " + (cx - 35) + "," + (cy - 30) + '" fill="#d8c9ff" stroke="#5b3fb3" stroke-width="3"/>';
      s += '<polygon points="' + (cx - 35) + "," + (cy - 30) + " " + (cx + 35) + "," + (cy - 45) + " " + (cx + 50) + "," + (cy + 25) + " " + (cx - 20) + "," + (cy + 40) + '" fill="#b9a3f5" stroke="#5b3fb3" stroke-width="3"/>';
    } else if (c === "cilindro") {
      s += '<rect x="' + (cx - 40) + '" y="' + (cy - 40) + '" width="80" height="85" fill="#9be3b0" stroke="#2f8a4a" stroke-width="3"/><ellipse cx="' + cx + '" cy="' + (cy + 45) + '" rx="40" ry="13" fill="#7fd09a" stroke="#2f8a4a" stroke-width="3"/><rect x="' + (cx - 38.5) + '" y="' + (cy + 20) + '" width="77" height="25" fill="#9be3b0"/><ellipse cx="' + cx + '" cy="' + (cy - 40) + '" rx="40" ry="13" fill="#c9f2d5" stroke="#2f8a4a" stroke-width="3"/>';
    }
    return s;
  }

  function billetes(v) {
    var s = "", x = 10, y = 10, W = 560;
    v.lista.forEach(function (g) {
      for (var i = 0; i < g[1]; i++) {
        if (x + 100 > W) { x = 10; y += 56; }
        var c = g[0] >= 100 ? "#9fd6a8" : "#f5c08a", b = g[0] >= 100 ? "#2f8a4a" : "#b8660b";
        s += '<rect x="' + x + '" y="' + y + '" width="96" height="48" rx="6" fill="' + c + '" stroke="' + b + '" stroke-width="2"/><circle cx="' + (x + 22) + '" cy="' + (y + 24) + '" r="12" fill="none" stroke="' + b + '" stroke-width="2"/>' + t(x + 62, y + 31, "$" + g[0], 18, TINTA, 'font-weight="bold"');
        x += 104;
      }
      x = 10; y += 64;
    });
    return svg(W, y, s);
  }
  function esOpcion(o) { return /^(fig|cuerpo):/.test(o); }
  function opcion(o) {
    var p = o.split(":");
    if (p[0] === "fig") return svg(160, 110, figuraNombre(p[1], 80, 55));
    return svg(160, 140, cuerpo(p[1], 80, 72));
  }
  function nombre(o) { return NOMBRES[o.split(":")[1]] || o; }

  function render(v) {
    if (!v) return '<div class="decor">🧮</div>';
    switch (v.tipo) {
      case "reloj": return svg(240, 240, reloj(v.h, v.m, 120, 120, 105));
      case "relojes": return svg(480, 270, reloj(v.a[0], v.a[1], 120, 115, 95, v.ra) + reloj(v.b[0], v.b[1], 360, 115, 95, v.rb));
      case "recta": return recta(v);
      case "serie": return serie(v);
      case "valorPos": return valorPos(v);
      case "grupos": return grupos(v);
      case "arreglo": return arreglo(v);
      case "barras": return barras(v);
      case "monedas": return monedas(v);
      case "regla": return regla(v);
      case "billetes": return billetes(v);
      case "figura": return svg(220, 200, poligono(v.lados, 110, 105, 85));
      case "figuras": return svg(560, 140, v.lista.map(function (f, i) { return figuraNombre(f, 70 + i * 140, 70); }).join(""));
      case "cuerpos":
        if (v.lista.length === 1) return svg(200, 160, cuerpo(v.lista[0], 100, 78));
        return svg(v.lista.length * 140, 175, v.lista.map(function (c, i) { return cuerpo(c, 70 + i * 140, 72) + (v.nombres ? t(70 + i * 140, 162, NOMBRES[c], 18, TINTA, 'font-weight="bold"') : ""); }).join(""));
      case "plano": {
        var s = "", cw = 150, ch = 100, cols = v.cols;
        v.celdas.forEach(function (c, i) { var x = 10 + (i % cols) * cw, y = 10 + Math.floor(i / cols) * ch; s += '<rect x="' + x + '" y="' + y + '" width="' + (cw - 8) + '" height="' + (ch - 8) + '" rx="10" fill="#f1f6ff" stroke="' + AZUL + '" stroke-width="2"/>' + t(x + (cw - 8) / 2, y + 48, c[0], 36) + t(x + (cw - 8) / 2, y + 80, c[1], 16, TINTA, 'font-weight="bold"'); });
        return svg(20 + cols * cw, 20 + Math.ceil(v.celdas.length / cols) * ch, s);
      }
      case "semana": {
        var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], s2 = "";
        dias.forEach(function (d, i) { var x = 6 + i * 92, hoy = i === v.hoy; s2 += '<rect ' + (hoy ? 'class="titila" ' : "") + 'x="' + x + '" y="30" width="86" height="60" rx="8" fill="' + (hoy ? AMARILLO : "#fff") + '" stroke="' + AZUL + '" stroke-width="2"/>' + t(x + 43, 66, d, 15, TINTA, 'font-weight="bold"'); if (hoy) s2 += t(x + 43, 22, "hoy", 16, "#d6453d", 'font-weight="bold"'); });
        return svg(656, 100, s2);
      }
      case "decor": return '<div class="decor">' + e(v.e) + "</div>";
    }
    return '<div class="decor">🧮</div>';
  }
  return { render: render, esOpcion: esOpcion, opcion: opcion, nombre: nombre };
})();

// Motor del Simulador de evaluación — QueSepanTodos.com · Profe Gustavo Aguilar
(function () {
  "use strict";
  var D = window.DATOS;
  var app = document.getElementById("app");
  var S = null; // estado de la prueba en curso

  // ---------- utilidades ----------
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function sampleOrdenado(n, k) { var idx = []; for (var i = 0; i < n; i++) idx.push(i); return shuffle(idx).slice(0, k).sort(function (a, b) { return a - b; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function img(src, emoji, cls) { return '<img src="' + esc(src) + '" class="' + (cls || "") + '" alt="" data-emoji="' + esc(emoji) + '" onerror="qstImgFail(this)">'; }
  window.qstImgFail = function (el) { var d = document.createElement("div"); d.className = (el.className || "") + " emoji-fb"; d.textContent = el.getAttribute("data-emoji") || "📘"; if (el.parentNode) el.parentNode.replaceChild(d, el); };
  function letra(i) { return "ABCD".charAt(i); }

  // ---------- audio: cola global, sin superposición ----------
  var AU = { el: null, gen: 0 };
  function callar() { AU.gen++; if (AU.el) { try { AU.el.pause(); } catch (e) {} AU.el = null; } }
  function hablar(lista) {
    callar(); var g = AU.gen; lista = (lista || []).filter(Boolean);
    (function sig(i) {
      if (g !== AU.gen || i >= lista.length) return;
      var a; try { a = new Audio(lista[i]); } catch (e) { return; }
      AU.el = a;
      a.onended = function () { if (g === AU.gen) sig(i + 1); };
      a.onerror = function () { if (g === AU.gen) sig(i + 1); };
      try { var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    })(0);
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  // ---------- firma del profe + lightbox ----------
  function firma() {
    return '<div class="firma"><button class="foto-btn" id="fotoBtn" aria-label="Ver foto">' + img(D.meta.fotoMini || D.meta.foto, "👨‍🏫", "foto") + '</button>' +
      '<div class="firma-txt"><div>💻 Informática Educativa · Profe Gustavo Aguilar</div><div class="mail">✉️ ' + esc(D.meta.mail) + '</div></div></div>';
  }
  function activarFirma() {
    var b = document.getElementById("fotoBtn"); if (!b) return;
    b.onclick = function () {
      var lb = document.createElement("div"); lb.className = "lightbox";
      lb.innerHTML = '<button class="lb-cerrar" aria-label="Cerrar">✕</button><div class="lb-zona">' + img(D.meta.foto, "👨‍🏫", "lb-img") + '</div><div class="lb-frase">Menos prisa, más vida 🧉🫂</div>';
      document.body.appendChild(lb);
      var zona = lb.querySelector(".lb-zona"); var zoom = false;
      zona.onclick = function (e) {
        var im = zona.querySelector(".lb-img"); if (!im) return;
        if (!zoom) { var r = im.getBoundingClientRect(); var x = ((e.clientX - r.left) / (r.width || 1)) * 100; var y = ((e.clientY - r.top) / (r.height || 1)) * 100; im.style.transformOrigin = x + "% " + y + "%"; im.style.transform = "scale(2.2)"; }
        else { im.style.transform = "scale(1)"; }
        zoom = !zoom;
      };
      lb.querySelector(".lb-cerrar").onclick = function () { lb.remove(); };
    };
  }

  // ---------- pantallas ----------
  function portada() {
    S = null; callar();
    app.innerHTML = '<section class="pantalla portada">' +
      '<div class="portada-img">' + img(D.meta.portada, "📝", "pimg") + '</div>' +
      '<h1>' + esc(D.meta.titulo) + '</h1><p class="sub">' + esc(D.meta.subtitulo) + '</p><p class="desc">' + esc(D.meta.descripcion) + '</p>' +
      '<div class="portada-pie"><button class="btn grande" id="comenzar">Comenzar ▶</button>' + firma() + '</div></section>';
    document.getElementById("comenzar").onclick = elegirMateria;
    activarFirma();
  }

  function elegirMateria() {
    app.innerHTML = '<section class="pantalla materias"><div class="barra"><span class="chip">' + esc(D.meta.grado) + '</span><button class="link" id="inicio">⌂ Volver al inicio</button></div>' +
      '<h2>¿Qué materia querés practicar?</h2><div class="tarjetas">' +
      '<button class="tarjeta" data-m="lengua"><span class="t-emoji">' + D.lengua.emoji + '</span><span class="t-nom">' + D.lengua.nombre + '</span><span class="t-det">Leés textos y respondés preguntas</span></button>' +
      '<button class="tarjeta" data-m="matematica"><span class="t-emoji">' + D.matematica.emoji + '</span><span class="t-nom">' + D.matematica.nombre + '</span><span class="t-det">Números, cuentas, problemas, figuras y medidas</span></button>' +
      '</div></section>';
    hablar(["audio/ui_materias.mp3"]);
    document.getElementById("inicio").onclick = portada;
    Array.prototype.forEach.call(app.querySelectorAll(".tarjeta"), function (b) { b.onclick = function () { instrucciones(b.getAttribute("data-m")); }; });
  }

  // Toma una variante al azar de cada "slot", en el orden del simulador oficial
  function porSlot(lista) {
    var slots = {}, orden = [];
    lista.forEach(function (q, i) { if (!slots[q.slot]) { slots[q.slot] = []; orden.push(q.slot); } slots[q.slot].push(i); });
    orden.sort(function (a, b) { return a - b; });
    return orden.map(function (sl) { var v = slots[sl]; return v[Math.floor(Math.random() * v.length)]; });
  }
  function armarPrueba(materia) {
    var pasos = [], items = [];
    if (materia === "lengua") {
      D.lengua.textos.forEach(function (t) {
        pasos.push({ tipo: "texto", texto: t });
        porSlot(t.preguntas).forEach(function (qi) {
          var q = t.preguntas[qi];
          items.push({ texto: t, p: q.p, ops: shuffle(q.ops), correcta: q.ops[0], grupo: q.cap, exp: q.exp, audioP: "audio/l_" + t.id + "_" + (qi + 1) + ".mp3", audioE: "audio/le_" + t.id + "_" + (qi + 1) + ".mp3" });
          pasos.push({ tipo: "item", n: items.length - 1 });
        });
      });
    } else {
      var M = D.matematica;
      porSlot(M.items).forEach(function (qi) {
        var q = M.items[qi], k = pad2(qi + 1);
        items.push({ p: q.p, ops: shuffle(q.ops), correcta: q.ops[0], grupo: q.eje, exp: q.exp, visual: q.visual, audioP: "audio/m_" + k + ".mp3", audioE: "audio/me_" + k + ".mp3" });
        pasos.push({ tipo: "item", n: items.length - 1 });
      });
    }
    return { materia: materia, pasos: pasos, items: items, resp: items.map(function () { return null; }), paso: 0 };
  }

  function instrucciones(materia) {
    var nombre = D[materia].nombre;
    var txtL = "Vas a leer dos textos. Después de cada uno vas a responder preguntas.";
    var txtM = "Vas a resolver problemas y preguntas de matemática. Podés usar lápiz y papel para hacer las cuentas.";
    app.innerHTML = '<section class="pantalla instr"><div class="barra"><span class="chip">' + esc(nombre) + '</span><button class="link" id="inicio">⌂ Volver al inicio</button></div>' +
      '<div class="instr-emoji">' + D[materia].emoji + '</div><h2>Antes de empezar</h2><ul class="lista-instr">' +
      '<li>' + (materia === "lengua" ? txtL : txtM) + '</li>' +
      '<li>Son <b>10 preguntas</b>. Cada una tiene 4 opciones y solo <b>una</b> es correcta.</li>' +
      '<li>Tocá la opción que elegís y después tocá <b>Continuar</b>.</li>' +
      '<li>Las respuestas se ven recién al final, como en la prueba de verdad.</li></ul>' +
      '<button class="btn grande" id="empezar">Empezar la prueba ▶</button></section>';
    document.getElementById("inicio").onclick = portada;
    hablar(["audio/ui_inst_" + materia + ".mp3"]);
    document.getElementById("empezar").onclick = function () { S = armarPrueba(materia); mostrarPaso(); };
  }

  function barraPrueba(contador) {
    return '<div class="barra"><span class="chip">' + esc(D[S.materia].nombre) + '</span><span class="contador">' + contador + '</span><button class="link" id="salir">⌂ Volver al inicio</button></div>';
  }
  function activarSalir() {
    document.getElementById("salir").onclick = function () {
      confirmar("Si salís ahora, se pierde lo que respondiste. ¿Querés salir?", "Sí, salir", "Seguir con la prueba", portada);
    };
  }
  function respondidas() { return S.resp.filter(function (r) { return r !== null; }).length; }

  function mostrarPaso() {
    var p = S.pasos[S.paso];
    if (p.tipo === "texto") return pantallaTexto(p.texto);
    pantallaItem(p.n, false);
  }

  function pantallaTexto(t) {
    app.innerHTML = '<section class="pantalla prueba">' + barraPrueba(respondidas() + "/" + S.items.length) +
      '<div class="cuerpo texto-cuerpo"><p class="consigna">📖 Leé el texto con atención. Después vas a responder preguntas.</p>' +
      '<article class="lectura"><div class="lect-img">' + img(t.imagen, t.emoji, "timg") + '</div><span class="genero">' + esc(t.genero) + '</span><h3>' + esc(t.titulo) + '</h3>' +
      t.parrafos.map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") + '<p class="fuente">' + esc(t.fuente) + '</p></article></div>' +
      '<div class="nav">' + (S.paso > 0 ? '<button class="btn sec" id="ant">◀ Anterior</button>' : '<span></span>') + '<button class="btn" id="cont">Continuar ▶</button></div></section>';
    activarSalir(); hablar(["audio/ui_texto.mp3"]);
    var a = document.getElementById("ant"); if (a) a.onclick = function () { S.paso--; mostrarPaso(); };
    document.getElementById("cont").onclick = function () { S.paso++; mostrarPaso(); };
  }

  function verTexto(t) {
    var m = document.createElement("div"); m.className = "modal";
    m.innerHTML = '<div class="modal-caja texto-modal"><button class="lb-cerrar" aria-label="Cerrar">✕</button><article class="lectura"><span class="genero">' + esc(t.genero) + '</span><h3>' + esc(t.titulo) + '</h3>' +
      t.parrafos.map(function (x) { return "<p>" + esc(x) + "</p>"; }).join("") + '</article><button class="btn" id="volverPreg">Volver a la pregunta</button></div>';
    document.body.appendChild(m);
    var cerrar = function () { m.remove(); };
    m.querySelector(".lb-cerrar").onclick = cerrar; m.querySelector("#volverPreg").onclick = cerrar;
  }

  function opcionesHTML(it, nItem, modoRevision) {
    var dibujo = it.ops.every(function (o) { return Visual.esOpcion(o); });
    var cortas = dibujo || it.ops.every(function (o) { return o.length <= 10; });
    var r = S.resp[nItem];
    return '<div class="ops ' + (cortas ? "grid2" : "") + (dibujo ? " dib" : "") + '">' + it.ops.map(function (o, i) {
      var cls = "op";
      if (!modoRevision && r === o) cls += " sel";
      if (modoRevision) { if (o === it.correcta) cls += " ok"; else if (r === o) cls += " mal"; else cls += " apagada"; }
      var marca = modoRevision ? (o === it.correcta ? " ✔" : (r === o ? " ✘" : "")) : "";
      return '<button class="' + cls + '" data-i="' + i + '"><span class="letra">' + letra(i) + '</span><span class="op-txt">' + (dibujo ? Visual.opcion(o) + '<span class="op-nom">' + (modoRevision ? esc(Visual.nombre(o)) : "") + marca + '</span>' : esc(o) + marca) + '</span></button>';
    }).join("") + '</div>';
  }

  function visualItem(it) {
    if (it.texto) {
      return '<div class="vis vis-texto"><div class="mini">' + img(it.texto.imagen, it.texto.emoji, "mimg") + '</div>' +
        '<div class="ver-texto-zona"><button class="btn-texto" id="verTexto">📖 Ver el texto</button><span class="flecha-lbl">⬅ Tocá para leer el texto otra vez</span></div></div>';
    }
    if (!it.visual && it.ops.every(function (o) { return Visual.esOpcion(o); })) return "";
    return '<div class="vis">' + Visual.render(it.visual) + '</div>';
  }

  function pantallaItem(n, revision) {
    var it = S.items[n];
    var contador = revision ? "Revisión " + (n + 1) + "/" + S.items.length : "Pregunta " + (n + 1) + " de " + S.items.length;
    var nav;
    if (revision) {
      nav = '<div class="nav"><button class="btn sec" id="ant" ' + (n === 0 ? "disabled" : "") + '>◀ Anterior</button><button class="btn sec" id="aRes">Resultados</button><button class="btn" id="cont" ' + (n === S.items.length - 1 ? "disabled" : "") + '>Siguiente ▶</button></div>';
    } else {
      nav = '<div class="nav">' + (S.paso > 0 ? '<button class="btn sec" id="ant">◀ Anterior</button>' : '<span></span>') + '<button class="btn" id="cont" ' + (S.resp[n] === null ? "disabled" : "") + '>Continuar ▶</button></div>';
    }
    var correc = "";
    if (revision) {
      var bien = S.resp[n] === it.correcta;
      correc = '<div class="correccion ' + (bien ? "c-ok" : "c-mal") + '">' + (bien ? "✅ ¡Bien! " : "❌ La respuesta correcta es la marcada en verde. ") + esc(it.exp) + ' <button class="btn-oir chico" id="oirE" aria-label="Escuchar la explicación">🔊</button></div>';
    }
    app.innerHTML = '<section class="pantalla prueba">' + (revision ? '<div class="barra"><span class="chip">' + esc(D[S.materia].nombre) + '</span><span class="contador">' + contador + '</span><button class="link" id="aRes2">Resultados</button></div>' : barraPrueba(contador)) +
      '<div class="cuerpo">' + visualItem(it) + '<div class="preg-fila"><p class="pregunta">' + esc(it.p).replace(/\n/g, "<br>") + '</p><button class="btn-oir" id="oirP" aria-label="Escuchar la pregunta">🔊</button></div>' + opcionesHTML(it, n, revision) + correc + '</div>' + nav + '</section>';

    if (it.texto) document.getElementById("verTexto").onclick = function () { callar(); verTexto(it.texto); };
    document.getElementById("oirP").onclick = function () { hablar([it.audioP]); };
    if (revision) {
      hablar([it.audioE]);
      document.getElementById("oirE").onclick = function () { hablar([it.audioE]); };
      document.getElementById("aRes").onclick = resultados; document.getElementById("aRes2").onclick = resultados;
      document.getElementById("ant").onclick = function () { if (n > 0) pantallaItem(n - 1, true); };
      document.getElementById("cont").onclick = function () { if (n < S.items.length - 1) pantallaItem(n + 1, true); };
      return;
    }
    activarSalir(); hablar([it.audioP]);
    Array.prototype.forEach.call(app.querySelectorAll(".op"), function (b) {
      b.onclick = function () {
        S.resp[n] = it.ops[+b.getAttribute("data-i")];
        Array.prototype.forEach.call(app.querySelectorAll(".op"), function (x) { x.classList.remove("sel"); });
        b.classList.add("sel");
        document.getElementById("cont").disabled = false;
        var c = app.querySelector(".contador"); if (c) c.textContent = contador;
      };
    });
    var a = document.getElementById("ant"); if (a) a.onclick = function () { S.paso--; mostrarPaso(); };
    document.getElementById("cont").onclick = function () {
      if (S.resp[n] === null) return;
      if (S.paso < S.pasos.length - 1) { S.paso++; mostrarPaso(); }
      else confirmar("Respondiste las " + S.items.length + " preguntas. ¿Querés entregar la prueba?", "Sí, entregar", "Revisar antes", finalizar);
    };
  }

  function confirmar(msg, si, no, accion) {
    var m = document.createElement("div"); m.className = "modal";
    m.innerHTML = '<div class="modal-caja chica"><p>' + esc(msg) + '</p><div class="nav"><button class="btn sec" id="mNo">' + esc(no) + '</button><button class="btn" id="mSi">' + esc(si) + '</button></div></div>';
    document.body.appendChild(m);
    m.querySelector("#mNo").onclick = function () { m.remove(); };
    m.querySelector("#mSi").onclick = function () { m.remove(); accion(); };
  }

  // ---------- resultados ----------
  function calcular() {
    var ac = 0; S.items.forEach(function (it, i) { if (S.resp[i] === it.correcta) ac++; });
    var er = S.items.length - ac;
    return { ac: ac, er: er, pct: Math.round(ac * 100 / ((ac + er) || 1)), pts: ac * 10 };
  }
  function finalizar() {
    var k = D.meta.clave + "_" + S.materia + "_intentos";
    var n = (parseInt(lsGet(k), 10) || 0) + 1; lsSet(k, String(n));
    S.intento = n; S.fecha = new Date(); S.res = calcular();
    resultados();
  }
  function nombreGrupo(g) {
    if (S.materia === "lengua") return D.capacidades[g] || g;
    return (D.matematica.ejes[g] || {}).nombre || g;
  }
  function resultados() {
    var R = S.res, grupos = {}, orden = [];
    S.items.forEach(function (it, i) {
      if (!grupos[it.grupo]) { grupos[it.grupo] = { ok: 0, tot: 0 }; orden.push(it.grupo); }
      grupos[it.grupo].tot++; if (S.resp[i] === it.correcta) grupos[it.grupo].ok++;
    });
    var banda = R.pct >= 80 ? 1 : R.pct >= 60 ? 2 : R.pct >= 40 ? 3 : 4;
    var msg = D.mensajesFinal[banda - 1];
    app.innerHTML = '<section class="pantalla resultados"><div class="barra"><span class="chip">' + esc(D[S.materia].nombre) + '</span><span class="contador">Intento ' + S.intento + '</span>' + '<span></span></div>' +
      '<div class="cuerpo"><h2>' + msg + '</h2><div class="stats">' +
      '<div class="stat"><b>✅ ' + R.ac + '</b><span>Aciertos</span></div><div class="stat"><b>❌ ' + R.er + '</b><span>Errores</span></div>' +
      '<div class="stat"><b>' + R.pct + '%</b><span>Total</span></div><div class="stat"><b>⭐ ' + R.pts + '</b><span>Puntos</span></div></div>' +
      '<div class="desglose"><h3>¿Cómo te fue en cada parte?</h3>' + orden.map(function (g) {
        var x = grupos[g]; var w = Math.round(x.ok * 100 / x.tot);
        return '<div class="fila"><span class="f-nom">' + esc(nombreGrupo(g)) + '</span><span class="f-bar"><i style="width:' + w + '%"></i></span><span class="f-num">' + x.ok + ' de ' + x.tot + '</span></div>';
      }).join("") + '</div>' +
      '<div class="acciones"><button class="btn" id="revisar">🔍 Revisar mis respuestas</button><button class="btn enviar" id="enviar">📤 Enviar mi tarea a mi docente</button>' +
      '<button class="btn sec" id="otra">🔄 Volver a jugar</button></div>' + firma() + '</div></section>';
    hablar(["audio/res_" + banda + ".mp3"]);
    document.getElementById("revisar").onclick = function () { pantallaItem(0, true); };
    document.getElementById("enviar").onclick = formularioEnvio;
    document.getElementById("otra").onclick = portada;
    activarFirma();
  }

  // ---------- envío a la docente ----------
  function formularioEnvio() {
    var prev = {}; try { prev = JSON.parse(lsGet("qst_envio") || "{}") || {}; } catch (e) { prev = {}; }
    var m = document.createElement("div"); m.className = "modal";
    m.innerHTML = '<div class="modal-caja"><button class="lb-cerrar" aria-label="Cerrar">✕</button><h3>📤 Enviar mi tarea a mi docente</h3>' +
      '<label>Nombre y apellido del estudiante<input id="fEst" value="' + esc(prev.est || "") + '" autocomplete="name"></label>' +
      '<label>Curso<input id="fCur" placeholder="ej.: 3.° A" value="' + esc(prev.cur || "") + '"></label>' +
      '<label>Nombre y apellido del docente (opcional)<input id="fDoc" value="' + esc(prev.doc || "") + '"></label>' +
      '<p class="aviso" id="fAviso"></p><button class="btn grande" id="fOk">Generar y enviar</button></div>';
    document.body.appendChild(m);
    m.querySelector(".lb-cerrar").onclick = function () { m.remove(); };
    m.querySelector("#fOk").onclick = function () {
      var est = m.querySelector("#fEst").value.trim(), cur = m.querySelector("#fCur").value.trim(), doc = m.querySelector("#fDoc").value.trim();
      var av = m.querySelector("#fAviso");
      if (!est) { av.textContent = "Escribí tu nombre y apellido, así tu docente sabe que es tu tarea 🙂"; m.querySelector("#fEst").focus(); return; }
      if (!cur) { av.textContent = "Contanos en qué curso estás (por ejemplo: 3.° A) 🙂"; m.querySelector("#fCur").focus(); return; }
      lsSet("qst_envio", JSON.stringify({ est: est, cur: cur, doc: doc }));
      m.remove(); enviar({ est: est, cur: cur, doc: doc });
    };
  }

  function textoResultados(d) {
    var R = S.res, f = S.fecha;
    return "📝 " + D.meta.titulo + " · " + D[S.materia].nombre + "\n👤 Estudiante: " + d.est + "\n🏫 Curso: " + d.cur + (d.doc ? "\n👩‍🏫 Docente: " + d.doc : "") +
      "\n📚 " + D.meta.grado + " · " + D[S.materia].nombre + "\n✅ Aciertos: " + R.ac + "\n❌ Errores: " + R.er + "\n📊 Total: " + R.pct + "%\n⭐ Puntos: " + R.pts +
      "\n🔁 Intento n.° " + S.intento + "\n🗓️ " + f.toLocaleDateString("es-AR") + " " + f.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) + "\nQueSepanTodos.com · Profe Gustavo Aguilar";
  }

  function dibujarTarjeta(d) {
    var c = document.createElement("canvas"); c.width = 900; c.height = 1200;
    var x = c.getContext && c.getContext("2d"); if (!x) return null;
    var R = S.res, f = S.fecha;
    x.fillStyle = "#eef4ff"; x.fillRect(0, 0, 900, 1200);
    x.fillStyle = "#1f4e9c"; x.fillRect(0, 0, 900, 170);
    function txt(t, y, size, color, bold, maxW) {
      size = size; x.font = (bold ? "bold " : "") + size + "px sans-serif";
      while (x.measureText(t).width > (maxW || 800) && size > 18) { size -= 2; x.font = (bold ? "bold " : "") + size + "px sans-serif"; }
      x.fillStyle = color; x.textAlign = "center"; x.fillText(t, 450, y);
    }
    txt(D.meta.titulo, 80, 48, "#fff", true); txt(D.meta.grado + " · " + D[S.materia].nombre, 135, 34, "#dce8ff", false);
    var y = 240;
    txt("Estudiante: " + d.est, y, 40, "#1d2b45", true); y += 60;
    txt("Curso: " + d.cur, y, 36, "#1d2b45", false); y += 55;
    if (d.doc) { txt("Docente: " + d.doc, y, 34, "#1d2b45", false); y += 55; }
    y += 20;
    var cajas = [["✅ " + R.ac, "Aciertos"], ["❌ " + R.er, "Errores"], [R.pct + "%", "Total"], ["⭐ " + R.pts, "Puntos"]];
    cajas.forEach(function (cj, i) {
      var cx = 60 + (i % 2) * 400, cy = y + Math.floor(i / 2) * 210;
      x.fillStyle = "#fff"; x.fillRect(cx, cy, 380, 180); x.strokeStyle = "#1f4e9c"; x.lineWidth = 4; x.strokeRect(cx, cy, 380, 180);
      x.fillStyle = "#1d2b45"; x.textAlign = "center"; x.font = "bold 60px sans-serif"; x.fillText(cj[0], cx + 190, cy + 95);
      x.font = "30px sans-serif"; x.fillStyle = "#4a5a78"; x.fillText(cj[1], cx + 190, cy + 145);
    });
    y += 450;
    txt("Intento n.° " + S.intento + " · " + f.toLocaleDateString("es-AR") + " " + f.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }), y, 30, "#4a5a78", false); y += 70;
    txt("QueSepanTodos.com · Profe Gustavo Aguilar", 1150, 30, "#1f4e9c", true);
    return c;
  }

  function enviar(d) {
    var c = null; try { c = dibujarTarjeta(d); } catch (e) { c = null; }
    var texto = textoResultados(d);
    var nombreArch = "resultados-" + S.materia + "-" + d.est.replace(/\s+/g, "_") + ".png";
    function respaldo() { mostrarTarjeta(c, texto, nombreArch); }
    if (!c || !c.toBlob) return respaldo();
    try {
      c.toBlob(function (blob) {
        try {
          var file = blob ? new File([blob], nombreArch, { type: "image/png" }) : null;
          if (file && navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
            navigator.share({ files: [file], text: texto, title: D.meta.titulo }).catch(function (err) { if (!err || err.name !== "AbortError") respaldo(); });
          } else respaldo();
        } catch (e) { respaldo(); }
      }, "image/png");
    } catch (e) { respaldo(); }
  }

  function mostrarTarjeta(c, texto, nombreArch) {
    var url = ""; try { url = c ? c.toDataURL("image/png") : ""; } catch (e) { url = ""; }
    var m = document.createElement("div"); m.className = "modal";
    m.innerHTML = '<div class="modal-caja"><button class="lb-cerrar" aria-label="Cerrar">✕</button><h3>Tus resultados</h3>' +
      (url ? '<img class="tarjeta-img" src="' + url + '" alt="Tarjeta de resultados">' : '<pre class="tarjeta-txt">' + esc(texto) + '</pre>') +
      '<div class="nav"><a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(texto) + '">💬 WhatsApp</a>' +
      (url ? '<a class="btn sec" download="' + esc(nombreArch) + '" href="' + url + '">⬇️ Guardar</a>' : "") + '</div>' +
      '<p class="tip">Si no se abre, mantené apretada la imagen para guardarla o sacá una captura de pantalla y mandásela a tu docente.</p></div>';
    document.body.appendChild(m);
    m.querySelector(".lb-cerrar").onclick = function () { m.remove(); };
  }

  // exponer para pruebas
  window.QST = { portada: portada, estado: function () { return S; }, armarPrueba: armarPrueba };
  portada();
})();
