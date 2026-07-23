// ============================================================
// MOTOR - "Forraje Verde Hidropónico"
// ============================================================

function mezclar(array) {
  var a = array.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

var audioActual = null;
function reproducir(src) {
  if (!src) return;
  if (audioActual) { audioActual.pause(); audioActual.currentTime = 0; }
  audioActual = new Audio(src);
  audioActual.play().catch(function () {});
}

// Reproduce el audio completo y recién entonces ejecuta el callback (usado
// cuando hay que esperar a que termine de sonar antes de avanzar de pantalla/ronda).
function reproducirYLuego(src, callback) {
  if (!src) { callback(); return; }
  if (audioActual) { audioActual.pause(); audioActual.currentTime = 0; }
  audioActual = new Audio(src);
  audioActual.addEventListener("ended", callback);
  audioActual.play().catch(function () { callback(); });
}

// ---------- Puntaje global ----------
var puntaje = { correctas: 0, incorrectas: 0 };
function sumarResultado(ok) {
  if (ok) puntaje.correctas++; else puntaje.incorrectas++;
}
function feedbackSonoro(ok) {
  reproducir(ok ? AUDIOS_GENERALES.correcto : AUDIOS_GENERALES.incorrecto);
}

// ---------- Navegación ----------
var ORDEN_PANTALLAS = [
  "portada", "que-es", "asociacion", "objetivos", "proceso",
  "armar-frase", "completar", "sopa", "crucigrama", "vof", "cierre"
];
var indiceActual = 0;

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(function (p) { p.classList.remove("activa"); });
  var el = document.getElementById("pantalla-" + id);
  if (el) el.classList.add("activa");
  window.scrollTo(0, 0);
  iniciarPantalla(id);
}

function irSiguiente() {
  indiceActual++;
  if (indiceActual >= ORDEN_PANTALLAS.length) indiceActual = ORDEN_PANTALLAS.length - 1;
  mostrarPantalla(ORDEN_PANTALLAS[indiceActual]);
}

function iniciarPantalla(id) {
  switch (id) {
    case "portada": return initPortada();
    case "que-es": return initQueEs();
    case "asociacion": return initAsociacion();
    case "objetivos": return initObjetivos();
    case "proceso": return initProceso();
    case "armar-frase": return initArmarFrase();
    case "completar": return initCompletar();
    case "sopa": return initSopa();
    case "crucigrama": return initCrucigrama();
    case "vof": return initVoF();
    case "cierre": return initCierre();
  }
}

// ============================================================
// PANTALLA 1 - PORTADA
// ============================================================
function initPortada() {
  // el audio de bienvenida se dispara solo con el botón de altavoz (autoplay bloqueado por navegadores)
}
function reproducirBienvenida() {
  reproducir(AUDIOS_GENERALES.portada);
}

// ============================================================
// PANTALLA 2 - ¿QUÉ ES EL FVH?
// ============================================================
var queEsInicializado = false;
function initQueEs() {
  reproducir(AUDIOS_GENERALES.queEsFvh);
  if (queEsInicializado) return;
  queEsInicializado = true;
  document.getElementById("que-es-texto").textContent = TEXTO_QUE_ES_FVH;
  document.getElementById("que-es-img").src = IMAGENES_CONTEXTO.sequia;
}

// ============================================================
// PANTALLA 3 - ASOCIACIÓN
// ============================================================
var asocSeleccionPregunta = null;
var asocSeleccionRespuesta = null;
var asocResueltas = new Set();

function initAsociacion() {
  reproducir(ASOCIACION_CONSIGNA_AUDIO);
  asocSeleccionPregunta = null;
  asocSeleccionRespuesta = null;
  asocResueltas = new Set();

  var colP = document.getElementById("asoc-preguntas");
  var colR = document.getElementById("asoc-respuestas");
  colP.innerHTML = "";
  colR.innerHTML = "";

  ASOCIACION_ITEMS.forEach(function (item) {
    var p = document.createElement("div");
    p.className = "union-item";
    p.dataset.key = item.key;
    p.textContent = item.pregunta;
    p.addEventListener("click", function () { seleccionarAsoc("pregunta", p); });
    colP.appendChild(p);
  });

  mezclar(ASOCIACION_ITEMS).forEach(function (item) {
    var r = document.createElement("div");
    r.className = "union-item asoc-respuesta";
    r.dataset.key = item.key;
    r.textContent = item.respuesta;
    r.addEventListener("click", function () { seleccionarAsoc("respuesta", r); });
    colR.appendChild(r);
  });

  document.getElementById("asoc-siguiente-btn").style.display = "none";
}

function seleccionarAsoc(tipo, el) {
  if (el.classList.contains("resuelta")) return;
  if (tipo === "pregunta") {
    if (asocSeleccionPregunta) asocSeleccionPregunta.classList.remove("seleccionada");
    asocSeleccionPregunta = el;
    el.classList.add("seleccionada");
  } else {
    if (asocSeleccionRespuesta) asocSeleccionRespuesta.classList.remove("seleccionada");
    asocSeleccionRespuesta = el;
    el.classList.add("seleccionada");
  }
  if (asocSeleccionPregunta && asocSeleccionRespuesta) verificarAsoc();
}

function verificarAsoc() {
  var a = asocSeleccionPregunta, b = asocSeleccionRespuesta;
  var ok = a.dataset.key === b.dataset.key;
  feedbackSonoro(ok);
  sumarResultado(ok);
  if (ok) {
    a.classList.add("resuelta"); b.classList.add("resuelta");
    a.classList.remove("seleccionada"); b.classList.remove("seleccionada");
    asocResueltas.add(a.dataset.key);
    var item = ASOCIACION_ITEMS.find(function (i) { return i.key === a.dataset.key; });
    setTimeout(function () { reproducir(item.audio); }, 500);
    if (asocResueltas.size === ASOCIACION_ITEMS.length) {
      document.getElementById("asoc-siguiente-btn").style.display = "inline-block";
    }
  } else {
    setTimeout(function () {
      a.classList.remove("seleccionada"); b.classList.remove("seleccionada");
    }, 600);
  }
  asocSeleccionPregunta = null;
  asocSeleccionRespuesta = null;
}

// ============================================================
// PANTALLA 4 - IDENTIFICAR OBJETIVOS
// ============================================================
var objetivosEncontrados = 0;
function initObjetivos() {
  reproducir(OBJETIVOS_CONSIGNA_AUDIO);
  objetivosEncontrados = 0;
  var cont = document.getElementById("objetivos-opciones");
  cont.innerHTML = "";
  var mezcladas = mezclar(OBJETIVOS_OPCIONES.map(function (o, i) { return Object.assign({ idx: i }, o); }));
  mezcladas.forEach(function (op) {
    var div = document.createElement("div");
    div.className = "union-item";
    div.dataset.idx = op.idx;
    div.textContent = op.texto;
    div.addEventListener("click", function () { tocarObjetivo(div, op); });
    cont.appendChild(div);
  });
  document.getElementById("objetivos-siguiente-btn").style.display = "none";
  document.getElementById("objetivos-feedback").textContent = "";
}

function tocarObjetivo(div, op) {
  if (div.classList.contains("bloqueada")) return;
  var totalCorrectas = OBJETIVOS_OPCIONES.filter(function (o) { return o.correcta; }).length;

  if (op.correcta) {
    div.classList.add("bloqueada", "resuelta");
    objetivosEncontrados++;
    sumarResultado(true);
    feedbackSonoro(true);
    document.getElementById("objetivos-feedback").textContent =
      "¡Correcto! (" + objetivosEncontrados + " de " + totalCorrectas + ")";
    if (objetivosEncontrados === totalCorrectas) {
      document.getElementById("objetivos-siguiente-btn").style.display = "inline-block";
    }
  } else {
    div.classList.add("bloqueada", "incorrecta-marca");
    sumarResultado(false);
    feedbackSonoro(false);
    document.getElementById("objetivos-feedback").textContent = "Ese no es un objetivo del proyecto.";
  }
}

// ============================================================
// PANTALLA 5 - ORDENÁ EL PROCESO PRODUCTIVO
// ============================================================
var procesoSiguienteIdx = 0;

function initProceso() {
  reproducir(PROCESO_CONSIGNA_AUDIO);
  procesoSiguienteIdx = 0;
  var banco = document.getElementById("proceso-banco");
  var armado = document.getElementById("proceso-armado");
  banco.innerHTML = "";
  armado.innerHTML = "";
  document.getElementById("proceso-feedback").textContent = "";
  document.getElementById("proceso-siguiente-btn").style.display = "none";

  var mezclados = mezclar(PASOS_PROCESO.map(function (p, i) { return Object.assign({ idx: i }, p); }));
  mezclados.forEach(function (paso) {
    var chip = document.createElement("div");
    chip.className = "rp-chip proceso-chip";
    chip.dataset.idx = paso.idx;
    chip.textContent = paso.nombre;
    chip.addEventListener("click", function () { tocarPasoProceso(chip); });
    banco.appendChild(chip);
  });
}

function tocarPasoProceso(chip) {
  var idx = +chip.dataset.idx;
  var feedback = document.getElementById("proceso-feedback");
  if (idx === procesoSiguienteIdx) {
    sumarResultado(true);
    feedbackSonoro(true);
    feedback.textContent = "¡Correcto! " + PASOS_PROCESO[idx].nombre;
    chip.classList.add("colocada");
    chip.onclick = null;
    document.getElementById("proceso-armado").appendChild(chip);
    procesoSiguienteIdx++;
    if (procesoSiguienteIdx === PASOS_PROCESO.length) {
      document.getElementById("proceso-siguiente-btn").style.display = "inline-block";
    }
  } else {
    sumarResultado(false);
    feedbackSonoro(false);
    feedback.textContent = "Ese paso todavía no corresponde. Probá con otro.";
    chip.classList.add("chip-error");
    setTimeout(function () { chip.classList.remove("chip-error"); }, 500);
  }
}

// ============================================================
// PANTALLA 6 - ARMÁ LA FRASE
// ============================================================
var afIndice = 0;
var afPalabrasOriginal = [];
var afSiguientePos = 0;

function initArmarFrase() {
  afIndice = 0;
  document.getElementById("af-siguiente-btn").style.display = "none";
  reproducirYLuego(ARMAR_FRASE_CONSIGNA_AUDIO, function () {
    mostrarArmarFrase();
  });
}

function mostrarArmarFrase() {
  if (afIndice >= FRASES_PROCESO.length) {
    document.getElementById("af-siguiente-btn").style.display = "inline-block";
    document.getElementById("af-progreso").textContent = "¡Armaste las 8 frases!";
    document.getElementById("af-banco").innerHTML = "";
    document.getElementById("af-armado").innerHTML = "";
    document.getElementById("af-imagen").style.display = "none";
    return;
  }
  var item = FRASES_PROCESO[afIndice];
  afSiguientePos = 0;
  document.getElementById("af-progreso").textContent = "Etapa " + (afIndice + 1) + " de 8";
  document.getElementById("af-feedback").textContent = "";
  document.getElementById("af-imagen").style.display = "block";
  document.getElementById("af-imagen").src = item.imagen;
  reproducir(ETAPA_AUDIOS[afIndice]);

  afPalabrasOriginal = item.texto.split(" "); // incluye el punto final pegado a la ultima palabra
  var banco = document.getElementById("af-banco");
  var armado = document.getElementById("af-armado");
  banco.innerHTML = "";
  armado.innerHTML = "";

  mezclar(afPalabrasOriginal).forEach(function (palabra) {
    var chip = document.createElement("span");
    chip.className = "rp-chip";
    chip.textContent = palabra;
    chip.dataset.palabra = palabra;
    chip.addEventListener("click", function () { tocarPalabraFrase(chip, item); });
    banco.appendChild(chip);
  });
}

// Mecánica tipo JClic: cada palabra se valida al toque contra la próxima
// posición esperada de la oración. Si es correcta, queda fija en su lugar;
// si no, vuelve a quedar en el banco (nunca se traba en un estado a medio armar).
function tocarPalabraFrase(chip, item) {
  if (chip.classList.contains("colocada")) return;
  var esperada = afPalabrasOriginal[afSiguientePos];

  if (chip.dataset.palabra === esperada) {
    chip.classList.add("colocada");
    chip.onclick = null;
    document.getElementById("af-armado").appendChild(chip);
    sumarResultado(true);
    feedbackSonoro(true);
    afSiguientePos++;
    document.getElementById("af-feedback").textContent = "";

    if (afSiguientePos === afPalabrasOriginal.length) {
      document.getElementById("af-feedback").textContent = "¡Muy bien! Escuchá la frase...";
      afIndice++;
      reproducirYLuego(item.audio, function () {
        mostrarArmarFrase();
      });
    }
  } else {
    sumarResultado(false);
    feedbackSonoro(false);
    chip.classList.add("chip-error");
    document.getElementById("af-feedback").textContent = "Esa palabra no va ahí. Fijate cuál sigue.";
    setTimeout(function () { chip.classList.remove("chip-error"); }, 500);
  }
}

// ============================================================
// PANTALLA 7 - COMPLETAR TEXTO
// ============================================================
function initCompletar() {
  reproducir(COMPLETAR_CONSIGNA_AUDIO);
  var cont = document.getElementById("completar-texto");
  cont.innerHTML = "";
  var opciones = mezclar(COMPLETAR_TEXTO.filter(function (b) { return b.tipo === "blanco"; }).map(function (b) { return b.respuesta; }));

  COMPLETAR_TEXTO.forEach(function (parte, idx) {
    if (parte.tipo === "texto") {
      cont.appendChild(document.createTextNode(parte.contenido));
    } else {
      var select = document.createElement("select");
      select.className = "completar-select";
      select.dataset.respuesta = parte.respuesta;
      var vacio = document.createElement("option");
      vacio.textContent = "___";
      vacio.value = "";
      select.appendChild(vacio);
      opciones.forEach(function (op) {
        var o = document.createElement("option");
        o.textContent = op;
        o.value = op;
        select.appendChild(o);
      });
      cont.appendChild(select);
    }
  });

  document.getElementById("completar-feedback").textContent = "";
  document.getElementById("completar-verificar-btn").style.display = "inline-block";
  document.getElementById("completar-siguiente-btn").style.display = "none";
}

function verificarCompletar() {
  var selects = document.querySelectorAll(".completar-select");
  var ok = true;
  selects.forEach(function (s) {
    var bien = s.value === s.dataset.respuesta;
    s.classList.toggle("resuelta", bien);
    s.classList.toggle("incorrecta-marca", !bien);
    if (!bien) ok = false;
  });
  feedbackSonoro(ok);
  sumarResultado(ok);
  document.getElementById("completar-feedback").textContent = ok
    ? "¡Perfecto! Completaste el texto correctamente."
    : "Todavía hay espacios incorrectos (marcados en rojo).";
  if (ok) {
    reproducir(COMPLETAR_AUDIO_FINAL);
    document.getElementById("completar-verificar-btn").style.display = "none";
    document.getElementById("completar-siguiente-btn").style.display = "inline-block";
  }
}

// ============================================================
// PANTALLA 8 - SOPA DE LETRAS
// ============================================================
var sopaEstado = {};

function generarGrilla(palabras, tam) {
  var grilla = [];
  for (var r = 0; r < tam; r++) { grilla.push(new Array(tam).fill(null)); }
  var direcciones = [{ dr: 0, dc: 1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }];
  var ubicaciones = [];

  function cabe(palabra, r, c, dir) {
    for (var i = 0; i < palabra.length; i++) {
      var rr = r + dir.dr * i, cc = c + dir.dc * i;
      if (rr < 0 || rr >= tam || cc < 0 || cc >= tam) return false;
      var actual = grilla[rr][cc];
      if (actual !== null && actual !== palabra[i]) return false;
    }
    return true;
  }
  function colocar(palabra, r, c, dir) {
    for (var i = 0; i < palabra.length; i++) {
      grilla[r + dir.dr * i][c + dir.dc * i] = palabra[i];
    }
  }

  palabras.forEach(function (palabra) {
    var colocada = false;
    for (var intento = 0; intento < 200 && !colocada; intento++) {
      var dir = direcciones[Math.floor(Math.random() * direcciones.length)];
      var r = Math.floor(Math.random() * tam);
      var c = Math.floor(Math.random() * tam);
      if (cabe(palabra, r, c, dir)) {
        colocar(palabra, r, c, dir);
        ubicaciones.push({ palabra: palabra, r: r, c: c, dir: dir });
        colocada = true;
      }
    }
    if (!colocada) {
      for (var rr = 0; rr < tam && !colocada; rr++) {
        if (cabe(palabra, rr, 0, direcciones[0])) {
          colocar(palabra, rr, 0, direcciones[0]);
          ubicaciones.push({ palabra: palabra, r: rr, c: 0, dir: direcciones[0] });
          colocada = true;
        }
      }
    }
  });

  var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var r2 = 0; r2 < tam; r2++) {
    for (var c2 = 0; c2 < tam; c2++) {
      if (grilla[r2][c2] === null) grilla[r2][c2] = letras[Math.floor(Math.random() * letras.length)];
    }
  }
  return { grilla: grilla, ubicaciones: ubicaciones };
}

function initSopa() {
  reproducir(SOPA_CONSIGNA_AUDIO);
  var tam = Math.max.apply(null, SOPA_PALABRAS.map(function (p) { return p.length; })) + 2;
  var res = generarGrilla(SOPA_PALABRAS, tam);
  sopaEstado = { tam: tam, encontradas: new Set(), seleccionActual: [] };

  var listaEl = document.getElementById("sopa-lista");
  listaEl.innerHTML = SOPA_PALABRAS.map(function (p) {
    return '<span class="sopa-palabra" id="sopa-palabra-' + p + '">' + p + "</span>";
  }).join(" ");

  var grillaEl = document.getElementById("sopa-grilla");
  grillaEl.style.setProperty("--tam", tam);
  grillaEl.innerHTML = "";
  for (var r = 0; r < tam; r++) {
    for (var c = 0; c < tam; c++) {
      var span = document.createElement("span");
      span.className = "sopa-celda";
      span.textContent = res.grilla[r][c];
      span.dataset.r = r;
      span.dataset.c = c;
      span.addEventListener("click", function (e) { onTocarCeldaSopa(e.target); });
      grillaEl.appendChild(span);
    }
  }
  document.getElementById("sopa-siguiente-btn").style.display = "none";
}

// Selección letra por letra (tap secuencial), se pinta verde progresivamente.
// - Tocar la última celda seleccionada la deshace (permite corregir sin perder todo).
// - Cualquier toque que rompa la línea reinicia la selección por completo (nunca
//   "recicla" un toque equivocado como si fuera un nuevo intento válido).
// - Una celda ya usada por una palabra encontrada puede volver a tocarse, porque
//   dos palabras pueden compartir una misma letra en la grilla.
function onTocarCeldaSopa(celda) {
  var sel = sopaEstado.seleccionActual;

  // tocar la ultima celda seleccionada = deshacer ese paso
  if (sel.length > 0 && celda === sel[sel.length - 1]) {
    celda.classList.remove("sopa-sel-temp");
    sel.pop();
    return;
  }

  if (sel.length === 0) {
    sel.push(celda);
    celda.classList.add("sopa-sel-temp");
    return;
  }

  if (sel.length === 1) {
    // el segundo toque define la direccion de la linea
    sel.push(celda);
    celda.classList.add("sopa-sel-temp");
    verificarSeleccionActualSopa();
    return;
  }

  var dr = Math.sign(+sel[1].dataset.r - sel[0].dataset.r);
  var dc = Math.sign(+sel[1].dataset.c - sel[0].dataset.c);
  var ultimo = sel[sel.length - 1];
  var espR = +ultimo.dataset.r + dr, espC = +ultimo.dataset.c + dc;

  if (+celda.dataset.r === espR && +celda.dataset.c === espC) {
    sel.push(celda);
    celda.classList.add("sopa-sel-temp");
    verificarSeleccionActualSopa();
  } else {
    // no sigue la linea: reiniciamos, pero este mismo toque arranca la nueva seleccion
    limpiarSeleccionSopa();
    sel.push(celda);
    celda.classList.add("sopa-sel-temp");
  }
}

function limpiarSeleccionSopa() {
  sopaEstado.seleccionActual.forEach(function (c) { c.classList.remove("sopa-sel-temp"); });
  sopaEstado.seleccionActual.length = 0; // vaciar en el lugar (no reasignar) para no perder referencias locales
}

function verificarSeleccionActualSopa() {
  var sel = sopaEstado.seleccionActual;
  var texto = sel.map(function (c) { return c.textContent; }).join("");
  var textoInv = texto.split("").reverse().join("");
  var encontrada = SOPA_PALABRAS.find(function (p) {
    return (p === texto || p === textoInv) && !sopaEstado.encontradas.has(p);
  });
  if (encontrada) {
    sopaEstado.encontradas.add(encontrada);
    sel.forEach(function (c) { c.classList.remove("sopa-sel-temp"); c.classList.add("sopa-encontrada"); });
    var chip = document.getElementById("sopa-palabra-" + encontrada);
    if (chip) chip.classList.add("sopa-palabra-lista");
    sumarResultado(true);
    reproducir(SOPA_AUDIOS[encontrada]);
    sopaEstado.seleccionActual.length = 0;
    if (sopaEstado.encontradas.size === SOPA_PALABRAS.length) {
      document.getElementById("sopa-siguiente-btn").style.display = "inline-block";
    }
    return;
  }

  // si ya no puede seguir creciendo hacia ninguna palabra restante, reiniciar
  var maxLargo = Math.max.apply(null, SOPA_PALABRAS
    .filter(function (p) { return !sopaEstado.encontradas.has(p); })
    .map(function (p) { return p.length; }));
  if (sel.length >= maxLargo) {
    setTimeout(limpiarSeleccionSopa, 200);
  }
}

// ============================================================
// PANTALLA 9 - CRUCIGRAMA (filas separadas con pistas)
// ============================================================
function initCrucigrama() {
  reproducir(CRUCIGRAMA_CONSIGNA_AUDIO);
  var cont = document.getElementById("crucigrama-cont");
  cont.innerHTML = "";
  CRUCIGRAMA_ITEMS.forEach(function (item, idx) {
    var fila = document.createElement("div");
    fila.className = "cruci-fila";

    var pista = document.createElement("div");
    pista.className = "cruci-pista";
    pista.innerHTML = "<strong>" + (idx + 1) + ".</strong> " + item.pista +
      ' <button class="cruci-audio-btn" data-audio="' + item.audio + '">🔊</button>';

    var cajas = document.createElement("div");
    cajas.className = "cruci-cajas";
    for (var i = 0; i < item.palabra.length; i++) {
      var input = document.createElement("input");
      input.className = "cruci-caja";
      input.maxLength = 1;
      input.dataset.idx = idx;
      input.dataset.pos = i;
      cajas.appendChild(input);
    }

    fila.appendChild(pista);
    fila.appendChild(cajas);
    cont.appendChild(fila);
  });

  // Autoavance: al escribir una letra, el cursor salta solo al siguiente casillero
  // de la misma palabra (y con Backspace en un casillero vacío, vuelve al anterior).
  cont.querySelectorAll(".cruci-caja").forEach(function (input) {
    input.addEventListener("input", function () {
      input.value = input.value.toUpperCase();
      if (input.value) {
        var siguiente = document.querySelector(
          '.cruci-caja[data-idx="' + input.dataset.idx + '"][data-pos="' + (+input.dataset.pos + 1) + '"]'
        );
        if (siguiente) siguiente.focus();
      }
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && !input.value) {
        var anterior = document.querySelector(
          '.cruci-caja[data-idx="' + input.dataset.idx + '"][data-pos="' + (+input.dataset.pos - 1) + '"]'
        );
        if (anterior) anterior.focus();
      }
    });
  });

  cont.querySelectorAll(".cruci-audio-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { reproducir(btn.dataset.audio); });
  });

  document.getElementById("crucigrama-feedback").textContent = "";
  document.getElementById("crucigrama-verificar-btn").style.display = "inline-block";
  document.getElementById("crucigrama-siguiente-btn").style.display = "none";
}

function verificarCrucigrama() {
  var ok = true;
  CRUCIGRAMA_ITEMS.forEach(function (item, idx) {
    var letras = document.querySelectorAll('.cruci-caja[data-idx="' + idx + '"]');
    var construida = Array.from(letras).map(function (i) { return (i.value || "").toUpperCase(); }).join("");
    var bien = construida === item.palabra;
    letras.forEach(function (i) { i.classList.toggle("resuelta", bien); i.classList.toggle("incorrecta-marca", !bien); });
    if (!bien) ok = false;
  });
  feedbackSonoro(ok);
  sumarResultado(ok);
  document.getElementById("crucigrama-feedback").textContent = ok
    ? "¡Te felicito! Completaste todas las palabras."
    : "Todavía hay palabras incorrectas o incompletas.";
  if (ok) {
    document.getElementById("crucigrama-verificar-btn").style.display = "none";
    document.getElementById("crucigrama-siguiente-btn").style.display = "inline-block";
  }
}

// ============================================================
// PANTALLA 10 - VERDADERO O FALSO
// ============================================================
var vofIndice = 0;
function initVoF() {
  vofIndice = 0;
  reproducir(VOF_CONSIGNA_AUDIO);
  document.getElementById("vof-siguiente-btn").style.display = "none";
  mostrarVoF();
}
function mostrarVoF() {
  if (vofIndice >= AFIRMACIONES_VOF.length) {
    document.getElementById("vof-siguiente-btn").style.display = "inline-block";
    document.getElementById("vof-progreso").textContent = "¡Completaste las 6 afirmaciones!";
    document.getElementById("vof-texto").textContent = "";
    document.getElementById("vof-botones").style.display = "none";
    return;
  }
  var item = AFIRMACIONES_VOF[vofIndice];
  document.getElementById("vof-progreso").textContent = "Afirmación " + (vofIndice + 1) + " de 6";
  document.getElementById("vof-imagen").src = item.imagen;
  document.getElementById("vof-texto").textContent = item.texto;
  document.getElementById("vof-feedback").textContent = "";
  document.getElementById("vof-botones").style.display = "flex";
  reproducir(item.audio);
}
function responderVoF(valor) {
  var item = AFIRMACIONES_VOF[vofIndice];
  var ok = valor === item.valor;
  sumarResultado(ok);
  setTimeout(function () { feedbackSonoro(ok); }, 300);
  document.getElementById("vof-feedback").textContent = ok ? "¡Correcto!" : ("Incorrecto. Era " + (item.valor ? "Verdadero" : "Falso") + ".");
  vofIndice++;
  setTimeout(mostrarVoF, 1600);
}

// ============================================================
// PANTALLA 11 - CIERRE
// ============================================================
function initCierre() {
  var total = puntaje.correctas + puntaje.incorrectas;
  var pct = total > 0 ? Math.round((puntaje.correctas / total) * 100) : 0;
  document.getElementById("cierre-resultado").textContent = "Respondiste bien " + puntaje.correctas + " de " + total + " (" + pct + "%)";
  document.getElementById("cierre-texto").textContent = CIERRE_TEXTO;
  document.getElementById("cierre-imagen").src = CIERRE_IMAGEN;
  reproducir(AUDIOS_GENERALES.cierre);
}

function jugarDeNuevo() {
  puntaje.correctas = 0;
  puntaje.incorrectas = 0;
  indiceActual = 0;
  mostrarPantalla(ORDEN_PANTALLAS[0]);
}

// ---------- Init general ----------
document.addEventListener("DOMContentLoaded", function () {
  mostrarPantalla(ORDEN_PANTALLAS[0]);

  document.getElementById("btn-comenzar").addEventListener("click", irSiguiente);
  document.getElementById("btn-altavoz-portada").addEventListener("click", reproducirBienvenida);
  document.getElementById("que-es-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("asoc-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("objetivos-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("proceso-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("af-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("completar-verificar-btn").addEventListener("click", verificarCompletar);
  document.getElementById("completar-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("sopa-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("crucigrama-verificar-btn").addEventListener("click", verificarCrucigrama);
  document.getElementById("crucigrama-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("vof-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("btn-jugar-de-nuevo").addEventListener("click", jugarDeNuevo);

  document.querySelectorAll(".vof-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { responderVoF(btn.dataset.valor === "true"); });
  });

  var thumb = document.getElementById("portada-thumb");
  var lightbox = document.getElementById("lightbox");
  if (thumb && lightbox) {
    thumb.addEventListener("click", function () { lightbox.classList.add("visible"); });
    document.getElementById("lightbox-cerrar").addEventListener("click", function () {
      lightbox.classList.remove("visible");
    });
  }
});
