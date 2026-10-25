/* =========================================================
   MOTOR QST — renovación de paquetes JClic a HTML5
   QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Tipos: portada, identificar, ordenar, completar, rompecabezas,
          asociar, memoria, sopa, cierre
   Todo por toque (sin arrastrar) para que funcione en Android.
   ========================================================= */
var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
var pantalla = $("#pantalla");
var META = window.DATOS.meta;
var PANTALLAS = window.DATOS.pantallas;
var estado = { indice: 0, aciertos: 0, errores: 0, puntos: 0, intento: 1, yaEvaluado: {} };
var R = {};

/* ---------- sonidos cortos (sin archivos) ---------- */
var _audioCtx = null;
function _ctxAudio() {
  if (!_audioCtx) { try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  if (_audioCtx && _audioCtx.state === "suspended") { try { _audioCtx.resume(); } catch (e) {} }
  return _audioCtx;
}
function _tono(frecs, tipo, vol, dur, paso) {
  var ctx = _ctxAudio(); if (!ctx) return; var t = ctx.currentTime;
  frecs.forEach(function (f, i) {
    var o = ctx.createOscillator(), g = ctx.createGain(); var t0 = t + i * paso;
    o.type = tipo; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + dur + 0.05);
  });
}
function sfxOk() { _tono([660, 880], "sine", 0.15, 0.16, 0.08); }
function sfxErr() { _tono([190], "square", 0.10, 0.26, 0); }
function sfxFin() { _tono([523, 659, 784, 1047], "sine", 0.14, 0.22, 0.11); }

/* ---------- cola de audio global (sin superposición) ---------- */
var colaAudio = [], reproduciendo = false, audioActual = null, genAudio = 0;
function encolar(archivo, onEnd) {
  if (!archivo) { if (onEnd) setTimeout(onEnd, 0); return; }
  colaAudio.push({ archivo: archivo, onEnd: onEnd });
  if (!reproduciendo) _siguienteEnCola();
}
function _siguienteEnCola() {
  if (colaAudio.length === 0) { reproduciendo = false; return; }
  reproduciendo = true;
  var item = colaAudio.shift(), miGen = genAudio, audio = null, hecho = false;
  var terminar = function () { if (hecho || miGen !== genAudio) return; hecho = true; if (item.onEnd) item.onEnd(); _siguienteEnCola(); };
  try { audio = new Audio("audio/" + item.archivo); } catch (e) { audio = null; }
  audioActual = audio;
  if (!audio) { setTimeout(terminar, 50); return; }
  audio.onended = terminar; audio.onerror = function () { setTimeout(terminar, 50); };
  var p = audio.play(); if (p && p.catch) p.catch(function () { setTimeout(terminar, 50); });
}
function pararAudio() {
  genAudio++; colaAudio = []; reproduciendo = false;
  if (audioActual) { try { audioActual.pause(); audioActual.removeAttribute("src"); } catch (e) {} audioActual = null; }
}
/* Reproduce una lista de audios y llama a fin() cuando terminan todos */
function reproducirLista(lista, fin) {
  lista = (lista || []).filter(Boolean);
  if (!lista.length) { setTimeout(fin, 120); return; }
  var pend = lista.length;
  lista.forEach(function (a) { encolar(a, function () { pend--; if (pend === 0) fin(); }); });
}
/* Mientras suena la consigna, la pantalla no responde a toques */
function bloquearDurante(lista, luego) {
  pantalla.classList.add("bloqueado");
  reproducirLista(lista, function () { pantalla.classList.remove("bloqueado"); if (luego) luego(); });
}

/* ---------- utilidades ---------- */
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function mezclarDistinto(a) { if (a.length < 2) return a.slice(); var b; var n = 0; do { b = shuffle(a.slice()); n++; } while (n < 20 && b.every(function (x, i) { return x === a[i]; })); return b; }
function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function norm(s) { return String(s).toLowerCase().replace(/ñ/g, "\u0001").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\u0001/g, "ñ").trim(); }
function actualizarStats() { $("#sA").textContent = estado.aciertos; $("#sE").textContent = estado.errores; $("#sP").textContent = estado.puntos; }
/* Puntaje de un solo intento: cada ítem se cuenta una vez, según el primer intento */
function evaluar(key, ok) {
  if (estado.yaEvaluado[key]) return;
  estado.yaEvaluado[key] = true;
  if (ok) { estado.aciertos++; estado.puntos += META.puntosPorAcierto || 10; } else { estado.errores++; }
  actualizarStats();
}
var PALETA = ["#fde68a", "#bfdbfe", "#fbcfe8", "#bbf7d0", "#ddd6fe", "#fed7aa", "#a5f3fc", "#fecaca", "#d9f99d", "#e9d5ff", "#fef08a", "#c7d2fe"];

function htmlConsigna(p) {
  return p.consigna ? '<div class="consigna">' + esc(p.consigna) + '</div>' : "";
}
function htmlEscena(p, clase) {
  return p.imagen ? '<img class="escena ' + (clase || "") + '" src="' + p.imagen + '" alt="">' : "";
}
function htmlCelda(c) {
  var h = "";
  if (c.imagen) h += '<img src="' + c.imagen + '" alt="">';
  if (c.texto) h += '<span>' + esc(c.texto) + '</span>';
  return h;
}
function botonSiguiente() { return '<button class="btn-siguiente" id="btnSig" disabled>Siguiente ▶</button>'; }
function habilitarSiguiente() { var b = $("#btnSig"); if (b) b.disabled = false; }
function conectarSiguiente() { var b = $("#btnSig"); if (b) b.onclick = function () { siguientePantalla(); }; }
/* Feedback de pantalla terminada: sonido + mensaje final + audio final */
function terminarPantalla(p, extra) {
  sfxFin();
  var f = $("#final"); if (f) { f.innerHTML = "✔ " + esc(p.final || "¡Muy bien!"); f.classList.add("visible"); }
  reproducirLista([].concat(extra || [], p.audioFinal ? [p.audioFinal] : []), habilitarSiguiente);
}

/* =================== PORTADA =================== */
R.portada = function (p) {
  pantalla.innerHTML =
    '<div class="pantalla portada">' +
      '<img class="portada-img" src="' + (p.imagen || "img/portada.jpg") + '" alt="">' +
      '<div class="portada-txt"><h1>' + esc(META.titulo) + '</h1><div class="meta-linea">' + esc(META.area) + '</div></div>' +
      '<div class="portada-pie">' +
        '<div class="foto-firma">' +
          '<img src="profe_mini.jpg" class="foto-mini" alt="Profe" onclick="abrirLightbox(\'profe.jpg\')">' +
          '<div class="firma"><div>💻 Informática Educativa · Profe Gustavo Aguilar</div><div>✉️ ' + esc(META.mail) + '</div></div>' +
        '</div>' +
        '<button class="btn-principal" id="btnComenzar">▶ Comenzar</button>' +
      '</div>' +
    '</div>';
  $("#btnComenzar").onclick = function () { _ctxAudio(); siguientePantalla(); };
  if (p.audio) encolar(p.audio);
};

/* =================== IDENTIFICAR ===================
   Tocar la/las opciones correctas (sílaba, letra, número, imagen…) */
R.identificar = function (p) {
  var celdas = p.mezclar === false ? p.celdas.slice() : shuffle(p.celdas.slice());
  var cols = Math.min(p.cols || celdas.length, celdas.length);
  var conImg = celdas.some(function (c) { return c.imagen; });
  pantalla.innerHTML =
    '<div class="pantalla identificar">' + htmlConsigna(p) + htmlEscena(p) +
      '<div class="grilla ' + (conImg ? "con-img" : "") + (cols >= 5 ? " muchas" : "") + '" style="grid-template-columns:repeat(' + cols + ',minmax(0,1fr))">' +
        celdas.map(function (c, i) { return '<button class="celda" data-i="' + i + '">' + htmlCelda(c) + '</button>'; }).join("") +
      '</div>' +
      '<div class="final" id="final"></div>' + botonSiguiente() +
    '</div>';
  var faltan = celdas.filter(function (c) { return c.ok; }).length, key = "id_" + p._id, terminado = false;
  $$(".celda").forEach(function (b) {
    b.onclick = function () {
      if (terminado || b.classList.contains("ok") || b.classList.contains("tachada")) return;
      var c = celdas[+b.dataset.i];
      if (c.ok) {
        evaluar(key, true); sfxOk(); b.classList.add(p.tachar ? "tachada" : "ok"); faltan--;
        if (c.audio) encolar(c.audio);
        if (faltan === 0) {
          terminado = true;
          $$(".celda").forEach(function (x) {
            if (p.tachar) { if (!x.classList.contains("tachada")) x.classList.add("ok"); }
            else if (!x.classList.contains("ok")) x.classList.add("apagada");
          });
          terminarPantalla(p);
        }
      } else {
        evaluar(key, false); sfxErr(); b.classList.add("err");
        setTimeout(function () { b.classList.remove("err"); }, 450);
      }
    };
  });
  conectarSiguiente();
  bloquearDurante([p.audio, p.audioPalabra]);
};

/* =================== ORDENAR (armar palabra / oración) =================== */
R.ordenar = function (p) {
  var piezas = p.piezas.map(function (t, i) { return { t: t, i: i }; });
  var pool = mezclarDistinto(piezas);
  var unir = p.juntar ? "" : " ";
  pantalla.innerHTML =
    '<div class="pantalla ordenar">' + htmlConsigna(p) + htmlEscena(p) +
      '<div class="zona-armado" id="armado"><span class="ph">Tocá las piezas en orden…</span></div>' +
      '<div class="pool" id="pool">' + pool.map(function (pz) { return '<button class="pieza" data-i="' + pz.i + '">' + esc(pz.t) + '</button>'; }).join("") + '</div>' +
      '<div class="final" id="final"></div>' + botonSiguiente() +
    '</div>';
  var armado = [], key = "or_" + p._id;
  $$(".pieza").forEach(function (b) {
    b.onclick = function () {
      if (b.disabled) return;
      var esperado = p.piezas[armado.length];
      var ok = norm(b.textContent) === norm(esperado);
      if (ok) {
        evaluar(key + "_" + armado.length, true); sfxOk();
        b.disabled = true; b.classList.add("usada"); armado.push(esperado);
        $("#armado").innerHTML = armado.map(esc).join(unir);
        if (armado.length === p.piezas.length) { $("#armado").classList.add("ok"); terminarPantalla(p, p.audioCompleto); }
      } else {
        evaluar(key + "_" + armado.length, false); sfxErr(); b.classList.add("err");
        setTimeout(function () { b.classList.remove("err"); }, 450);
      }
    };
  });
  conectarSiguiente();
  bloquearDurante([p.audio, p.audioPalabra]);
};

/* =================== COMPLETAR (huecos con opciones) =================== */
R.completar = function (p) {
  /* p.partes: [ "texto", {hueco:"respuesta", opciones:[...]}, "texto" ] */
  var huecos = [];
  /* cada palabra (texto + huecos) va en un bloque que no se corta: nunca queda "helad / o" */
  var html = "", palabra = "";
  var cerrar = function () { if (palabra) { html += '<span class="pal">' + palabra + '</span>'; palabra = ""; } };
  p.partes.forEach(function (x) {
    if (typeof x === "string") {
      x.split(/( +)/).forEach(function (t) {
        if (!t) return;
        if (/^ +$/.test(t)) { cerrar(); html += " "; } else palabra += '<span class="txt">' + esc(t) + '</span>';
      });
    } else {
      huecos.push(x); palabra += '<span class="hueco" data-h="' + (huecos.length - 1) + '">' + "_".repeat(Math.max(1, Math.min(10, x.hueco.split("|")[0].length))) + '</span>';
    }
  });
  cerrar();
  pantalla.innerHTML =
    '<div class="pantalla completar">' + htmlConsigna(p) + htmlEscena(p) +
      '<div class="texto-completar ' + (p.grande ? "grande" : "") + '" id="texto">' + html + '</div>' +
      '<div class="opciones" id="opciones"></div>' +
      '<div class="final" id="final"></div>' + botonSiguiente() +
    '</div>';
  var ajustarTexto = function () {
    var t = $("#texto"); if (!t) return;
    t.style.fontSize = ""; var fs = parseFloat(getComputedStyle(t).fontSize), ancho = t.parentNode.clientWidth;
    while (t.scrollWidth > ancho && fs > 16) { fs -= 2; t.style.fontSize = fs + "px"; }
  };
  window.onresize = ajustarTexto; setTimeout(ajustarTexto, 0);
  var actual = 0;
  var mostrar = function () {
    $$(".hueco").forEach(function (h, i) { h.classList.toggle("activo", i === actual); });
    var hz = huecos[actual]; var ops = shuffle(hz.opciones.slice());
    var cortas = ops.every(function (o) { return o.length <= 10; });
    var cont = $("#opciones"); cont.className = "opciones " + (cortas ? "cortas" : "largas");
    var largo = Math.max.apply(null, ops.map(function (o) { return o.length; }));
    var ncol = largo <= 4 ? 4 : largo <= 6 ? 3 : 2;
    if (cortas && ops.length >= 3) cont.style.gridTemplateColumns = "repeat(" + Math.min(ops.length, ncol) + ",minmax(0,1fr))"; else cont.style.gridTemplateColumns = "";
    cont.innerHTML = ops.map(function (o) { return '<button class="opcion" data-v="' + esc(o) + '">' + esc(o) + '</button>'; }).join("");
    $$(".opcion", cont).forEach(function (b) {
      b.onclick = function () {
        var key = "co_" + p._id + "_" + actual;
        var aceptadas = hz.hueco.split("|").map(norm);
        if (aceptadas.indexOf(norm(b.dataset.v)) >= 0) {
          evaluar(key, true); sfxOk();
          var h = $$(".hueco")[actual]; h.textContent = hz.hueco.split("|")[0]; h.classList.remove("activo"); h.classList.add("ok"); ajustarTexto();
          actual++;
          if (actual < huecos.length) mostrar();
          else { $("#opciones").innerHTML = ""; terminarPantalla(p, p.audioCompleto); }
        } else {
          evaluar(key, false); sfxErr(); b.classList.add("err"); b.disabled = true;
        }
      };
    });
  };
  mostrar();
  conectarSiguiente();
  bloquearDurante([p.audio, p.audioPalabra]);
};

/* =================== ROMPECABEZAS (tocar dos piezas para cambiarlas) =================== */
R.rompecabezas = function (p) {
  var f = p.filas || 3, c = p.cols || 2, n = f * c;
  var orden = []; for (var i = 0; i < n; i++) orden.push(i);
  orden = mezclarDistinto(orden);
  pantalla.innerHTML =
    '<div class="pantalla rompecabezas">' + htmlConsigna(p) +
      '<div class="puzzle-wrap"><div class="puzzle" id="puzzle"></div></div>' +
      '<div class="ayuda-puzzle">Tocá dos piezas para cambiarlas de lugar.</div>' +
      '<div class="final" id="final"></div>' + botonSiguiente() +
    '</div>';
  var img = new Image(), sel = -1, terminado = false;
  var armar = function () {
    var cont = $("#puzzle"); if (!cont) return;
    var maxW = Math.min(cont.parentNode.clientWidth, 560), maxH = cont.parentNode.clientHeight;
    var ratio = img.naturalWidth / img.naturalHeight || 1;
    var w = maxW, h = w / ratio; if (h > maxH) { h = maxH; w = h * ratio; }
    cont.style.width = w + "px"; cont.style.height = h + "px";
    cont.style.gridTemplateColumns = "repeat(" + c + ",1fr)"; cont.style.gridTemplateRows = "repeat(" + f + ",1fr)";
    cont.innerHTML = orden.map(function (pieza, pos) {
      var px = pieza % c, py = Math.floor(pieza / c);
      return '<div class="pz" data-pos="' + pos + '" style="background-image:url(\'' + p.imagen + '\');background-size:' + (c * 100) + '% ' + (f * 100) + '%;background-position:' + (c > 1 ? px / (c - 1) * 100 : 0) + '% ' + (f > 1 ? py / (f - 1) * 100 : 0) + '%"></div>';
    }).join("");
    $$(".pz", cont).forEach(function (el) {
      el.onclick = function () {
        if (terminado) return;
        var pos = +el.dataset.pos;
        if (sel < 0) { sel = pos; el.classList.add("sel"); return; }
        if (sel === pos) { sel = -1; el.classList.remove("sel"); return; }
        var t = orden[sel]; orden[sel] = orden[pos]; orden[pos] = t; sel = -1;
        _tono([520], "sine", 0.08, 0.08, 0);
        armar();
        if (orden.every(function (v, i) { return v === i; })) {
          terminado = true; evaluar("rz_" + p._id, true);
          $("#puzzle").classList.add("resuelto"); terminarPantalla(p);
        }
      };
    });
  };
  img.onload = armar; img.src = p.imagen;
  window.onresize = function () { if (PANTALLAS[estado.indice] === p) armar(); };
  conectarSiguiente();
  bloquearDurante([p.audio, p.audioPalabra]);
};

/* =================== ASOCIAR (tocar uno de cada columna) =================== */
R.asociar = function (p) {
  /* p.izq: [celda], p.der: [celda], p.pares: [[iIzq, iDer], ...] */
  var izq = p.izq.map(function (c, i) { return { c: c, i: i }; });
  var der = p.der.map(function (c, i) { return { c: c, i: i }; });
  izq = shuffle(izq); der = shuffle(der);
  var conImg = p.izq.concat(p.der).some(function (c) { return c.imagen; });
  pantalla.innerHTML =
    '<div class="pantalla asociar">' + htmlConsigna(p) + htmlEscena(p, "chica") +
      '<div class="columnas ' + (conImg ? "con-img" : "") + '">' +
        '<div class="col" id="colIzq">' + izq.map(function (o) { return '<button class="celda" data-i="' + o.i + '">' + htmlCelda(o.c) + '</button>'; }).join("") + '</div>' +
        '<div class="col" id="colDer">' + der.map(function (o) { return '<button class="celda" data-i="' + o.i + '">' + htmlCelda(o.c) + '</button>'; }).join("") + '</div>' +
      '</div>' +
      '<div class="final" id="final"></div>' + botonSiguiente() +
    '</div>';
  var parDe = {}; p.pares.forEach(function (pr) { (parDe[pr[0]] = parDe[pr[0]] || []).push(pr[1]); });
  var hechos = 0, selIzq = null, color = 0;
  var izqPendientes = p.izq.length;
  $$("#colIzq .celda").forEach(function (b) {
    b.onclick = function () {
      if (b.classList.contains("hecho")) return;
      $$("#colIzq .celda").forEach(function (x) { x.classList.remove("sel"); });
      b.classList.add("sel"); selIzq = b;
      var c = p.izq[+b.dataset.i]; if (c.audio) { pararAudio(); encolar(c.audio); }
    };
  });
  $$("#colDer .celda").forEach(function (b) {
    b.onclick = function () {
      var cd = p.der[+b.dataset.i];
      if (!selIzq) { if (cd.audio) { pararAudio(); encolar(cd.audio); } b.classList.add("pista"); setTimeout(function () { b.classList.remove("pista"); }, 400); return; }
      if (b.classList.contains("hecho") && !p.derRepetible) return;
      var i = +selIzq.dataset.i, j = +b.dataset.i, key = "as_" + p._id + "_" + i;
      if ((parDe[i] || []).indexOf(j) >= 0) {
        evaluar(key, true); sfxOk();
        var col = PALETA[color++ % PALETA.length];
        selIzq.classList.remove("sel"); selIzq.classList.add("hecho"); selIzq.style.background = col;
        if (!p.derRepetible) { b.classList.add("hecho"); b.style.background = col; } else { b.style.boxShadow = "0 0 0 3px #16a34a inset"; }
        selIzq = null; hechos++;
        if (hechos === izqPendientes) terminarPantalla(p, cd.audio); else if (cd.audio) encolar(cd.audio);
      } else {
        evaluar(key, false); sfxErr(); b.classList.add("err"); setTimeout(function () { b.classList.remove("err"); }, 450);
      }
    };
  });
  conectarSiguiente();
  bloquearDurante([p.audio, p.audioPalabra]);
};

/* =================== MEMORIA (buscar los iguales) =================== */
R.memoria = function (p) {
  /* p.pares: [[celdaA, celdaB], ...] */
  var cartas = [];
  p.pares.forEach(function (par, k) { cartas.push({ c: par[0], k: k }); cartas.push({ c: par[1], k: k }); });
  cartas = shuffle(cartas);
  var n = cartas.length, cols = n <= 8 ? 4 : (n <= 12 ? 4 : (n <= 16 ? 4 : 5));
  pantalla.innerHTML =
    '<div class="pantalla memoria">' + htmlConsigna(p) +
      '<div class="tablero" style="grid-template-columns:repeat(' + cols + ',minmax(0,1fr))">' +
        cartas.map(function (x, i) { return '<button class="carta" data-i="' + i + '"><div class="dorso">?</div><div class="frente">' + htmlCelda(x.c) + '</div></button>'; }).join("") +
      '</div>' +
      '<div class="final" id="final"></div>' + botonSiguiente() +
    '</div>';
  var abiertas = [], encontrados = 0, ocupado = false, color = 0;
  $$(".carta").forEach(function (b) {
    b.onclick = function () {
      if (ocupado || b.classList.contains("abierta")) return;
      var x = cartas[+b.dataset.i];
      b.classList.add("abierta"); abiertas.push(b);
      if (x.c.audio) { pararAudio(); encolar(x.c.audio); }
      if (abiertas.length === 2) {
        var a = cartas[+abiertas[0].dataset.i], bb = cartas[+abiertas[1].dataset.i];
        if (a.k === bb.k) {
          evaluar("me_" + p._id + "_" + a.k, true); sfxOk();
          var col = PALETA[color++ % PALETA.length];
          abiertas.forEach(function (el) { el.classList.add("par"); el.querySelector(".frente").style.background = col; });
          abiertas = []; encontrados++;
          if (encontrados === p.pares.length) terminarPantalla(p);
        } else {
          ocupado = true;
          setTimeout(function () { abiertas.forEach(function (el) { el.classList.remove("abierta"); }); abiertas = []; ocupado = false; }, 1100);
        }
      }
    };
  });
  conectarSiguiente();
  bloquearDurante([p.audio, p.audioPalabra]);
};

/* =================== SOPA DE LETRAS (siempre de izquierda a derecha) =================== */
function generarSopa(palabras, maxCols) {
  palabras = palabras.map(function (w) { return norm(w).replace(/[^a-zñ]/g, ""); });
  var largo = Math.max.apply(null, palabras.map(function (w) { return w.length; }));
  var cols = Math.max(largo, Math.min(maxCols, largo + 2)), filas = Math.max(palabras.length + 2, Math.min(10, cols));
  var dirs = [[0, 1], [1, 0], [1, 1]];
  for (var intento = 0; intento < 400; intento++) {
    var g = []; for (var r = 0; r < filas; r++) { g.push(new Array(cols).fill("")); }
    var ubic = [], fallo = false;
    var orden = shuffle(palabras.map(function (w, i) { return i; }));
    for (var k = 0; k < orden.length && !fallo; k++) {
      var w = palabras[orden[k]], puesto = false;
      var dirsW = shuffle(dirs.slice()); dirsW.sort(function (a, b) { return a === dirs[k % 3] ? -1 : 0; });
      for (var t = 0; t < 200 && !puesto; t++) {
        var d = dirsW[t % dirsW.length];
        var r0 = Math.floor(Math.random() * (filas - d[0] * (w.length - 1)));
        var c0 = Math.floor(Math.random() * (cols - d[1] * (w.length - 1)));
        if (r0 < 0 || c0 < 0) continue;
        var okp = true;
        for (var L = 0; L < w.length; L++) { var ch = g[r0 + d[0] * L][c0 + d[1] * L]; if (ch && ch !== w[L]) { okp = false; break; } }
        if (!okp) continue;
        for (L = 0; L < w.length; L++) g[r0 + d[0] * L][c0 + d[1] * L] = w[L];
        ubic[orden[k]] = { r: r0, c: c0, d: d, w: w }; puesto = true;
      }
      if (!puesto) fallo = true;
    }
    if (fallo) continue;
    var usadas = {}; ubic.forEach(function (u) { usadas[u.d.join()] = 1; });
    if (palabras.length >= 3 && Object.keys(usadas).length < 2) continue;
    var abc = "abcdefghijlmnopqrstuvz";
    for (r = 0; r < filas; r++) for (var c = 0; c < cols; c++) if (!g[r][c]) g[r][c] = abc[Math.floor(Math.random() * abc.length)];
    return { g: g, ubic: ubic, filas: filas, cols: cols };
  }
  return null;
}
R.sopa = function (p) {
  var s = generarSopa(p.palabras, 10);
  pantalla.innerHTML =
    '<div class="pantalla sopa">' + htmlConsigna(p) +
      '<div class="sopa-pistas">' + p.palabras.map(function (w, i) {
        var pista = (p.pistas && p.pistas[i]) || null;
        return '<div class="pista-sopa" data-i="' + i + '">' + (pista && pista.imagen ? '<img src="' + pista.imagen + '" alt="">' : '') + '<span>' + esc(norm(w)) + '</span></div>';
      }).join("") + '</div>' +
      '<div class="sopa-grilla" id="sg" style="grid-template-columns:repeat(' + s.cols + ',minmax(0,1fr));max-width:min(96vw,' + ((p.palabras.length > 6 ? 40 : 44) * s.cols / s.g.length).toFixed(1) + 'vh)">' +
        s.g.map(function (fila, r) { return fila.map(function (ch, c) { return '<div class="ls" data-r="' + r + '" data-c="' + c + '">' + ch + '</div>'; }).join(""); }).join("") +
      '</div>' +
      '<div class="ayuda-puzzle">Tocá la primera y la última letra de cada palabra.</div>' +
      '<div class="final" id="final"></div>' + botonSiguiente() +
    '</div>';
  var ini = null, halladas = 0, color = 0, hallada = {};
  var celda = function (r, c) { return $('.ls[data-r="' + r + '"][data-c="' + c + '"]'); };
  var grilla = $("#sg");
  var tocar = function (el) {
    if (!el || !el.classList.contains("ls")) return;
    var r = +el.dataset.r, c = +el.dataset.c;
    if (!ini) { ini = { r: r, c: c }; el.classList.add("sel"); return; }
    celda(ini.r, ini.c).classList.remove("sel");
    var a = ini; ini = null;
    var idx = -1;
    s.ubic.forEach(function (u, i) {
      if (hallada[i]) return;
      var fr = u.r + u.d[0] * (u.w.length - 1), fc = u.c + u.d[1] * (u.w.length - 1);
      if (u.r === a.r && u.c === a.c && fr === r && fc === c) idx = i;
    });
    if (idx >= 0) {
      hallada[idx] = true; halladas++; evaluar("so_" + p._id + "_" + idx, true); sfxOk();
      var u = s.ubic[idx], col = PALETA[color++ % PALETA.length];
      for (var L = 0; L < u.w.length; L++) { var e = celda(u.r + u.d[0] * L, u.c + u.d[1] * L); e.style.background = col; e.classList.add("hallada"); }
      var pi = $('.pista-sopa[data-i="' + idx + '"]'); pi.classList.add("hallada"); pi.style.background = col;
      if (p.pistas && p.pistas[idx] && p.pistas[idx].audio) encolar(p.pistas[idx].audio);
      if (halladas === s.ubic.length) terminarPantalla(p);
    } else { sfxErr(); grilla.classList.add("err"); setTimeout(function () { grilla.classList.remove("err"); }, 400); }
  };
  grilla.addEventListener("click", function (e) { tocar(e.target.closest ? e.target.closest(".ls") : e.target); });
  conectarSiguiente();
  bloquearDurante([p.audio, p.audioPalabra]);
};

/* =================== CIERRE =================== */
R.cierre = function (p) {
  var total = estado.aciertos + estado.errores, pct = total > 0 ? Math.round(estado.aciertos / total * 100) : 0;
  pantalla.innerHTML =
    '<div class="pantalla cierre">' +
      '<img class="portada-img" src="' + (p.imagen || "img/cierre.jpg") + '" alt="">' +
      '<h2>¡Terminaste!</h2>' +
      '<div class="resultados">' +
        '<div>✅ Aciertos: <b>' + estado.aciertos + '</b></div><div>❌ Errores: <b>' + estado.errores + '</b></div>' +
        '<div>📊 Porcentaje: <b>' + pct + '%</b></div><div>⭐ Puntos: <b>' + estado.puntos + '</b></div>' +
      '</div>' +
      '<div class="foto-firma chica"><img src="profe_mini.jpg" class="foto-mini" alt="Profe" onclick="abrirLightbox(\'profe.jpg\')"><div class="firma"><div>💻 Informática Educativa · Profe Gustavo Aguilar</div><div>✉️ ' + esc(META.mail) + '</div></div></div>' +
      '<div class="cierre-botones">' +
        '<button class="btn-principal" id="btnEnviar">📤 Enviar mi tarea a mi docente</button>' +
        '<button class="btn-sec" id="btnRejugar">🔁 Volver a jugar</button>' +
      '</div>' +
    '</div>';
  $("#btnRejugar").onclick = function () {
    estado.aciertos = 0; estado.errores = 0; estado.puntos = 0; estado.yaEvaluado = {}; estado.intento++;
    actualizarStats(); irA(0);
  };
  $("#btnEnviar").onclick = abrirFormEnvio;
  sfxFin();
  if (p.audio) encolar(p.audio);
};

/* =================== LIGHTBOX (foto del profe) =================== */
function abrirLightbox(src) {
  var lb = $("#lightbox"), img = $("#lbImg");
  img.src = src; img.classList.remove("zoom"); img.style.transformOrigin = "center"; lb.hidden = false;
  $("#lbClose").onclick = function () { lb.hidden = true; img.classList.remove("zoom"); };
  img.onclick = function (e) {
    if (img.classList.contains("zoom")) { img.classList.remove("zoom"); img.style.transformOrigin = "center"; return; }
    var r = img.getBoundingClientRect();
    img.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%";
    img.classList.add("zoom");
  };
}
window.abrirLightbox = abrirLightbox;

/* =================== NAVEGACIÓN =================== */
function irA(i) { pararAudio(); estado.indice = i; render(); }
function siguientePantalla() { if (estado.indice < PANTALLAS.length - 1) irA(estado.indice + 1); }
function anteriorPantalla() { if (estado.indice > 0) irA(estado.indice - 1); }
function render() {
  var p = PANTALLAS[estado.indice]; p._id = estado.indice;
  pantalla.classList.remove("bloqueado");
  var fn = R[p.tipo];
  if (!fn) { pantalla.innerHTML = '<div class="pantalla">Tipo ' + esc(p.tipo) + ' no soportado</div>'; return; }
  fn(p); actualizarNav();
}
function actualizarNav() {
  var nav = $("#navRev"); document.body.classList.toggle("revision", !!META.revision);
  if (!META.revision) { nav.innerHTML = ""; return; }
  nav.innerHTML = '<button id="navPrev">◀</button><span>' + (estado.indice + 1) + ' / ' + PANTALLAS.length + '</span><button id="navNext">▶</button>';
  $("#navPrev").onclick = anteriorPantalla; $("#navNext").onclick = siguientePantalla;
}

/* =================== ENVÍO DE LA TAREA =================== */
function abrirFormEnvio() {
  var prev = {}; try { prev = JSON.parse(localStorage.getItem("qst_envio") || "{}"); } catch (e) {}
  var modal = $("#modalEnvio"); modal.hidden = false;
  modal.innerHTML =
    '<div class="envio-card">' +
      '<h3>📤 Enviar mi tarea</h3>' +
      '<label>Nombre y apellido del estudiante</label><input id="envEst" value="' + esc(prev.estudiante || "") + '" placeholder="Ej.: Ana Pérez">' +
      '<label>Curso</label><input id="envCur" value="' + esc(prev.curso || "") + '" placeholder="ej.: 1.° A">' +
      '<label>Nombre y apellido del docente (opcional)</label><input id="envDoc" value="' + esc(prev.docente || "") + '" placeholder="Opcional">' +
      '<div class="envio-msg" id="envMsg"></div>' +
      '<div class="row"><button class="btn-sec" id="envCancelar">Cancelar</button><button class="btn-principal" id="envGenerar">Generar tarjeta</button></div>' +
    '</div>';
  $("#envCancelar").onclick = function () { modal.hidden = true; };
  $("#envGenerar").onclick = function () {
    var est = $("#envEst").value.trim(), cur = $("#envCur").value.trim(), doc = $("#envDoc").value.trim(), msg = $("#envMsg");
    if (!est) { msg.textContent = "Escribí el nombre del estudiante."; $("#envEst").focus(); return; }
    if (!cur) { msg.textContent = "Escribí el curso."; $("#envCur").focus(); return; }
    try { localStorage.setItem("qst_envio", JSON.stringify({ estudiante: est, curso: cur, docente: doc })); } catch (e) {}
    mostrarTarjeta(est, cur, doc);
  };
}
function mostrarTarjeta(est, cur, doc) {
  var total = estado.aciertos + estado.errores, pct = total > 0 ? Math.round(estado.aciertos / total * 100) : 0;
  var ahora = new Date(), fecha = ahora.toLocaleDateString("es-AR") + " " + ahora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  var cv = document.createElement("canvas"); cv.width = 720; cv.height = 980; var ctx = cv.getContext("2d");
  var g = ctx.createLinearGradient(0, 0, 0, cv.height); g.addColorStop(0, "#dbeafe"); g.addColorStop(1, "#fef3c7");
  ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
  var ajustar = function (txt, max, tam, peso) { var t = tam; do { ctx.font = peso + " " + t + "px 'Baloo 2', sans-serif"; t -= 2; } while (ctx.measureText(txt).width > max && t > 12); };
  ctx.textAlign = "center"; ctx.fillStyle = "#1e3a8a"; ajustar(META.titulo, 640, 40, "800"); ctx.fillText(META.titulo, 360, 80);
  ctx.fillStyle = "#3b82f6"; ajustar(META.area || "", 640, 26, "600"); ctx.fillText(META.area || "", 360, 118);
  ctx.fillStyle = "#fff"; ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 3; roundRect(ctx, 40, 160, 640, 700, 22); ctx.fill(); ctx.stroke();
  ctx.textAlign = "left"; var y = 215;
  var linea = function (k, v) {
    ctx.fillStyle = "#475569"; ctx.font = "600 22px 'Baloo 2', sans-serif"; ctx.fillText(k, 70, y);
    ctx.fillStyle = "#1e3a8a"; ajustar(v, 580, 24, "800"); ctx.fillText(v, 70, y + 30); y += 66;
  };
  linea("Estudiante", est); linea("Curso", cur); if (doc) linea("Docente", doc);
  linea("✅ Aciertos", String(estado.aciertos)); linea("❌ Errores", String(estado.errores)); linea("📊 Porcentaje", pct + "%");
  linea("⭐ Puntos", String(estado.puntos)); linea("Intento", "n.° " + estado.intento); linea("Fecha y hora", fecha);
  ctx.fillStyle = "#94a3b8"; ctx.font = "600 20px 'Baloo 2', sans-serif"; ctx.textAlign = "center"; ctx.fillText("QueSepanTodos.com · Profe Gustavo Aguilar", 360, 920);
  var modal = $("#modalEnvio");
  var texto = "Mi tarea — " + META.titulo + "\nEstudiante: " + est + "\nCurso: " + cur + (doc ? "\nDocente: " + doc : "") + "\n" + (META.area || "") + "\n✅ " + estado.aciertos + " · ❌ " + estado.errores + " · " + pct + "% · ⭐ " + estado.puntos + "\nIntento n.° " + estado.intento + "\nFecha: " + fecha + "\nQueSepanTodos.com · Profe Gustavo Aguilar";
  var seguir = function (blob) {
    var url = blob ? URL.createObjectURL(blob) : cv.toDataURL("image/png");
    var archivo = null; try { archivo = blob ? new File([blob], "tarea.png", { type: "image/png" }) : null; } catch (e) {}
    if (archivo && navigator.share && navigator.canShare && navigator.canShare({ files: [archivo] })) {
      navigator.share({ files: [archivo], title: "Mi tarea — " + META.titulo, text: texto }).then(function () { modal.hidden = true; }).catch(function () { mostrarFallback(url, texto, modal); });
    } else { mostrarFallback(url, texto, modal); }
  };
  if (cv.toBlob) cv.toBlob(seguir, "image/png"); else seguir(null);
}
function mostrarFallback(url, texto, modal) {
  modal.hidden = false;
  modal.innerHTML =
    '<div class="envio-card">' +
      '<h3>Tu tarjeta de tarea</h3>' +
      '<div class="tarjeta-wrap"><img src="' + url + '" alt="Tarjeta"></div>' +
      '<p class="nota">Mantené apretada la imagen para guardarla o sacá una captura.</p>' +
      '<div class="tarjeta-botones">' +
        '<a class="btn-principal" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(texto) + '">💬 WhatsApp</a>' +
        '<a class="btn-sec" download="tarea.png" href="' + url + '">⬇️ Guardar</a>' +
      '</div>' +
      '<button class="btn-sec" id="cerrarEnvio">✕ Cerrar</button>' +
    '</div>';
  $("#cerrarEnvio").onclick = function () { modal.hidden = true; };
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

actualizarStats();
render();
