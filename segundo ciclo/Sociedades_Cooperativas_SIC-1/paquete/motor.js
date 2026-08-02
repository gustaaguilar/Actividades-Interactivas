// =========================================================
// motor.js — Sociedades Cooperativas (SIC)
// =========================================================

var main = document.getElementById("main");
var progresoBar = document.getElementById("progreso-bar");

// -----------------------------------------------------
// Construcción de la lista de pantallas (state machine)
// -----------------------------------------------------
var SCREENS = [];
SCREENS.push({ tipo: "portada" });
SCREENS.push({ tipo: "concepto" });
for (var i = 0; i < DATA.legajos.length; i++) {
  SCREENS.push({ tipo: "legajo", data: DATA.legajos[i] });
}
SCREENS.push({ tipo: "casos" });
for (var s = 0; s < DATA.sopas.length; s++) {
  SCREENS.push({ tipo: "sopa", data: DATA.sopas[s] });
}
for (var p = 0; p < DATA.puzzles.length; p++) {
  SCREENS.push({ tipo: "puzzle", data: DATA.puzzles[p] });
}
SCREENS.push({ tipo: "quiz" });
SCREENS.push({ tipo: "cierre" });

var pantallaActual = 0;
var puntajeQuiz = 0;
var totalGlobal = 0;
var aciertosGlobales = 0;

function actualizarProgreso() {
  var pct = Math.round((pantallaActual / (SCREENS.length - 1)) * 100);
  progresoBar.style.width = pct + "%";
}

function irAPantalla(indice) {
  pantallaActual = indice;
  actualizarProgreso();
  var pantalla = SCREENS[indice];
  main.innerHTML = "";
  main.scrollTop = 0;
  window.scrollTo(0, 0);

  switch (pantalla.tipo) {
    case "portada": renderPortada(); break;
    case "concepto": renderConcepto(); break;
    case "legajo": renderLegajo(pantalla.data); break;
    case "casos": renderCasos(); break;
    case "sopa": renderSopa(pantalla.data); break;
    case "puzzle": renderPuzzle(pantalla.data); break;
    case "quiz": renderQuiz(); break;
    case "cierre": renderCierre(); break;
  }
}

function siguientePantalla() {
  if (pantallaActual < SCREENS.length - 1) {
    irAPantalla(pantallaActual + 1);
  }
}

var audioActual = null;

function detenerAudioActual() {
  if (audioActual) {
    try { audioActual.pause(); audioActual.currentTime = 0; } catch (e) {}
    audioActual = null;
  }
}

function reproducirAudio(src, onEnded) {
  detenerAudioActual();
  if (!src) { if (onEnded) onEnded(); return; }
  try {
    var audio = new Audio(src);
    audioActual = audio;
    if (onEnded) audio.addEventListener("ended", onEnded);
    audio.play().catch(function () { if (onEnded) onEnded(); });
  } catch (e) { if (onEnded) onEnded(); }
}

function reproducirAudioEncadenado(lista, onFinalizado) {
  var i = 0;
  function siguiente() {
    if (i >= lista.length) { if (onFinalizado) onFinalizado(); return; }
    var src = lista[i];
    i++;
    reproducirAudio(src, siguiente);
  }
  siguiente();
}

function crearBotonAudio(src) {
  var btn = document.createElement("button");
  btn.className = "btn-audio";
  btn.innerHTML = "🔊";
  btn.onclick = function () { reproducirAudio(src); };
  return btn;
}

// -----------------------------------------------------
// PORTADA
// -----------------------------------------------------
function renderPortada() {
  var d = DATA.portada;
  var html = "";
  html += '<img class="pantalla-img" src="' + d.imagen + '" alt="Portada">';
  html += "<h1>" + d.titulo + "</h1>";
  html += '<p class="texto">Sistemas de Información Contable</p>';
  html += '<div class="fila-comenzar">';
  html += '<button class="btn-principal" id="btn-comenzar">Comenzar</button>';
  html += '<img class="foto-thumb" id="foto-thumb" src="' + DATA.meta.foto + '" alt="Profe">';
  html += "</div>";
  html += '<p class="firma">' + DATA.meta.firma + "</p>";
  main.innerHTML = html;

  document.getElementById("btn-comenzar").onclick = siguientePantalla;
  document.getElementById("foto-thumb").onclick = abrirLightbox;
}

function abrirLightbox() {
  document.getElementById("lightbox").classList.add("activo");
}
document.getElementById("lightbox-cerrar").onclick = function () {
  document.getElementById("lightbox").classList.remove("activo");
};

// -----------------------------------------------------
// CONCEPTO
// -----------------------------------------------------
function renderConcepto() {
  var d = DATA.concepto;
  var html = "";
  html += '<img class="pantalla-img" src="' + d.imagen + '" alt="Concepto">';
  html += "<h2>¿Qué es una Cooperativa?</h2>";
  html += '<p class="texto">' + d.texto + "</p>";
  main.innerHTML = html;
  main.appendChild(crearBotonAudio(d.audio));

  var btn = document.createElement("button");
  btn.className = "btn-principal";
  btn.textContent = "Continuar";
  btn.disabled = true;
  btn.onclick = siguientePantalla;
  main.appendChild(btn);

  reproducirAudio(d.audio, function () { btn.disabled = false; });
}

// -----------------------------------------------------
// LEGAJOS (formulario con opciones, un ítem a la vez)
// -----------------------------------------------------
function renderLegajo(legajo) {
  var indiceItem = 0;
  dibujarItemLegajo();

  function dibujarItemLegajo() {
    var item = legajo.items[indiceItem];
    var html = "";
    html += '<img class="pantalla-img" src="' + legajo.imagen + '" alt="' + legajo.titulo + '">';
    html += "<h2>" + legajo.titulo + "</h2>";
    html += '<div class="contador">Pregunta ' + (indiceItem + 1) + " de " + legajo.items.length + "</div>";
    html += '<p class="texto">' + item.pregunta + "</p>";
    html += '<div class="opciones" id="opciones-legajo"></div>';
    main.innerHTML = html;
    main.insertBefore(crearBotonAudio(item.audio), document.getElementById("opciones-legajo"));

    var contOpciones = document.getElementById("opciones-legajo");
    item.opciones.forEach(function (op, idx) {
      var b = document.createElement("button");
      b.className = "opcion";
      b.textContent = op;
      b.onclick = function () { elegirOpcionLegajo(idx, item, contOpciones); };
      contOpciones.appendChild(b);
    });

    reproducirAudio(item.audio);
  }

  function elegirOpcionLegajo(idx, item, contenedor) {
    var botones = contenedor.querySelectorAll(".opcion");
    botones.forEach(function (b, i) {
      b.classList.add("deshabilitada");
      if (i === item.correcta) b.classList.add("correcta");
      else if (i === idx && idx !== item.correcta) b.classList.add("incorrecta");
    });

    totalGlobal++;
    if (idx === item.correcta) aciertosGlobales++;

    var btnSig = document.createElement("button");
    btnSig.className = "btn-principal";
    btnSig.textContent = (indiceItem < legajo.items.length - 1) ? "Siguiente" : "Continuar";
    btnSig.disabled = true;
    btnSig.onclick = function () {
      if (indiceItem < legajo.items.length - 1) {
        indiceItem++;
        dibujarItemLegajo();
      } else {
        siguientePantalla();
      }
    };
    main.appendChild(btnSig);

    reproducirAudio(item.audio_feedback, function () { btnSig.disabled = false; });
  }
}

// -----------------------------------------------------
// CASOS — ¿Qué tipo de Cooperativa es?
// -----------------------------------------------------
function renderCasos() {
  var indiceCaso = 0;
  dibujarCaso();

  function dibujarCaso() {
    var caso = DATA.casos.items[indiceCaso];
    var html = "";
    html += '<img class="pantalla-img" src="' + caso.imagen + '" alt="Caso">';
    html += "<h2>" + DATA.casos.titulo + "</h2>";
    html += '<div class="contador">Caso ' + (indiceCaso + 1) + " de " + DATA.casos.items.length + "</div>";
    html += '<p class="texto">' + caso.texto + "</p>";
    html += '<div class="clases-grid" id="clases-grid"></div>';
    main.innerHTML = html;
    main.insertBefore(crearBotonAudio(caso.audio), document.getElementById("clases-grid"));

    var grid = document.getElementById("clases-grid");
    DATA.casos.clases.forEach(function (clase, idx) {
      var b = document.createElement("button");
      b.className = "clase-btn";
      b.textContent = clase;
      b.onclick = function () { elegirClase(idx, caso, grid); };
      grid.appendChild(b);
    });

    reproducirAudioEncadenado([caso.audio, DATA.casos.audio_consigna]);
  }

  function elegirClase(idx, caso, grid) {
    var botones = grid.querySelectorAll(".clase-btn");
    botones.forEach(function (b, i) {
      b.style.pointerEvents = "none";
      if (i === caso.correcta) b.classList.add("correcta");
      else if (i === idx) b.classList.add("incorrecta");
    });

    totalGlobal++;
    var esCorrecta = (idx === caso.correcta);
    if (esCorrecta) aciertosGlobales++;

    var btnSig = document.createElement("button");
    btnSig.className = "btn-principal";
    btnSig.textContent = (indiceCaso < DATA.casos.items.length - 1) ? "Siguiente" : "Continuar";
    btnSig.disabled = true;
    btnSig.onclick = function () {
      if (indiceCaso < DATA.casos.items.length - 1) {
        indiceCaso++;
        dibujarCaso();
      } else {
        siguientePantalla();
      }
    };
    main.appendChild(btnSig);

    reproducirAudio(esCorrecta ? caso.audio_acierto : null, function () { btnSig.disabled = false; });
  }
}

// -----------------------------------------------------
// SOPA DE LETRAS
// -----------------------------------------------------
var ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generarGrillaSopa(palabras, tam) {
  var grilla = [];
  for (var r = 0; r < tam; r++) {
    grilla.push(new Array(tam).fill(null));
  }
  // Solo direcciones "al derecho": horizontal (izq-der), vertical (arriba-abajo)
  // y diagonal descendente hacia la derecha. Nunca invertidas.
  var direcciones = [
    { dr: 0, dc: 1 },  // horizontal izq -> der
    { dr: 1, dc: 0 },  // vertical arriba -> abajo
    { dr: 1, dc: 1 }   // diagonal abajo-derecha
  ];

  palabras.forEach(function (palabra) {
    var colocada = false;
    var intentos = 0;
    while (!colocada && intentos < 200) {
      intentos++;
      var dir = direcciones[Math.floor(Math.random() * direcciones.length)];
      var fila0 = Math.floor(Math.random() * tam);
      var col0 = Math.floor(Math.random() * tam);
      var filaF = fila0 + dir.dr * (palabra.length - 1);
      var colF = col0 + dir.dc * (palabra.length - 1);
      if (filaF < 0 || filaF >= tam || colF < 0 || colF >= tam) continue;

      var cabe = true;
      for (var k = 0; k < palabra.length; k++) {
        var fr = fila0 + dir.dr * k;
        var cc = col0 + dir.dc * k;
        var actual = grilla[fr][cc];
        if (actual !== null && actual !== palabra[k]) { cabe = false; break; }
      }
      if (!cabe) continue;

      for (var k2 = 0; k2 < palabra.length; k2++) {
        var fr2 = fila0 + dir.dr * k2;
        var cc2 = col0 + dir.dc * k2;
        grilla[fr2][cc2] = palabra[k2];
      }
      colocada = true;
    }
  });

  for (var r2 = 0; r2 < tam; r2++) {
    for (var c2 = 0; c2 < tam; c2++) {
      if (grilla[r2][c2] === null) {
        grilla[r2][c2] = ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
      }
    }
  }
  return grilla;
}

function renderSopa(sopa) {
  var palabras = sopa.palabras.map(function (p) { return p.palabra; });
  var maxLen = Math.max.apply(null, palabras.map(function (p) { return p.length; }));
  var tam = Math.max(12, maxLen + 2);
  var grilla = generarGrillaSopa(palabras, tam);
  var encontradas = {};
  var seleccionInicio = null;

  // Tamaño de celda dinámico para que la grilla entre en el ancho de pantalla
  var anchoDisponible = Math.min(window.innerWidth, 720) - 40; // margen del contenedor
  var celdaPx = Math.floor(anchoDisponible / tam);
  celdaPx = Math.max(18, Math.min(32, celdaPx));
  var fontPx = Math.max(10, Math.floor(celdaPx * 0.45));

  var html = "";
  html += '<img class="pantalla-img img-sopa" src="' + sopa.imagen + '" alt="' + sopa.titulo + '">';
  html += "<h2>" + sopa.titulo + "</h2>";
  html += '<p class="texto">Tocá la primera y la última letra de cada palabra.</p>';
  html += '<div id="sopa-grid" style="grid-template-columns:repeat(' + tam + ',' + celdaPx + 'px);"></div>';
  html += '<div class="lista-palabras" id="lista-palabras"></div>';
  main.innerHTML = html;

  main.insertBefore(crearBotonAudio(sopa.audio_consigna), document.getElementById("sopa-grid"));

  var gridEl = document.getElementById("sopa-grid");
  var celdas = [];
  for (var r = 0; r < tam; r++) {
    celdas.push([]);
    for (var c = 0; c < tam; c++) {
      var celda = document.createElement("div");
      celda.className = "sopa-celda";
      celda.style.width = celdaPx + "px";
      celda.style.height = celdaPx + "px";
      celda.style.fontSize = fontPx + "px";
      celda.textContent = grilla[r][c];
      celda.dataset.r = r;
      celda.dataset.c = c;
      celda.onclick = function () { manejarClickCelda(this); };
      gridEl.appendChild(celda);
      celdas[r].push(celda);
    }
  }

  var listaEl = document.getElementById("lista-palabras");
  sopa.palabras.forEach(function (p) {
    var chip = document.createElement("span");
    chip.className = "palabra-chip";
    chip.textContent = p.palabra;
    chip.id = "chip-" + p.palabra;
    listaEl.appendChild(chip);
  });

  reproducirAudio(sopa.audio_consigna);

  function manejarClickCelda(celdaEl) {
    var r = parseInt(celdaEl.dataset.r);
    var c = parseInt(celdaEl.dataset.c);

    if (!seleccionInicio) {
      seleccionInicio = { r: r, c: c };
      celdaEl.classList.add("seleccion");
      return;
    }

    var r0 = seleccionInicio.r, c0 = seleccionInicio.c;
    var dr = Math.sign(r - r0), dc = Math.sign(c - c0);
    // Solo se admite seleccionar "al derecho": izq->der, arriba->abajo, diagonal abajo-derecha
    var esDireccionValida = (dr === 0 && dc === 1) || (dr === 1 && dc === 0) || (dr === 1 && dc === 1);
    var esLineaValida = esDireccionValida && ((r === r0) || (c === c0) || (Math.abs(r - r0) === Math.abs(c - c0)));

    if (esLineaValida && !(r === r0 && c === c0)) {
      var pasos = Math.max(Math.abs(r - r0), Math.abs(c - c0));
      var coordenadas = [];
      var letras = "";
      for (var k = 0; k <= pasos; k++) {
        var fr = r0 + dr * k, cc = c0 + dc * k;
        coordenadas.push({ r: fr, c: cc });
        letras += grilla[fr][cc];
      }

      var match = sopa.palabras.find(function (p) {
        return !encontradas[p.palabra] && p.palabra === letras;
      });

      if (match) {
        coordenadas.forEach(function (coord) {
          celdas[coord.r][coord.c].classList.remove("seleccion");
          celdas[coord.r][coord.c].classList.add("encontrada");
        });
        encontradas[match.palabra] = true;
        document.getElementById("chip-" + match.palabra).classList.add("encontrada");
        reproducirAudio(match.audio);
        verificarSopaCompleta();
      } else {
        celdas[r0][c0].classList.remove("seleccion");
      }
    } else {
      celdas[r0][c0].classList.remove("seleccion");
    }
    seleccionInicio = null;
  }

  function verificarSopaCompleta() {
    if (Object.keys(encontradas).length === sopa.palabras.length) {
      var btn = document.createElement("button");
      btn.className = "btn-principal";
      btn.textContent = "Continuar";
      btn.onclick = siguientePantalla;
      main.appendChild(btn);
    }
  }
}

// -----------------------------------------------------
// PUZZLE DE DEFINICIONES (tap-to-match)
// -----------------------------------------------------
function mezclarArray(arr) {
  var copia = arr.slice();
  for (var i = copia.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = copia[i]; copia[i] = copia[j]; copia[j] = tmp;
  }
  return copia;
}

function renderPuzzle(puzzle) {
  var terminoSeleccionado = null;
  var definicionSeleccionada = null;
  var acoplados = 0;

  var html = "";
  html += '<img class="pantalla-img" src="' + puzzle.imagen + '" alt="' + puzzle.titulo + '">';
  html += "<h2>" + puzzle.titulo + "</h2>";
  html += '<p class="texto">Uní cada término con su definición.</p>';
  html += '<div class="puzzle-cols">';
  html += '<div class="puzzle-col" id="col-terminos"></div>';
  html += '<div class="puzzle-col" id="col-definiciones"></div>';
  html += "</div>";
  main.innerHTML = html;

  var colTerminos = document.getElementById("col-terminos");
  var colDefiniciones = document.getElementById("col-definiciones");

  var definicionesMezcladas = mezclarArray(puzzle.pares);

  puzzle.pares.forEach(function (par) {
    var el = document.createElement("div");
    el.className = "puzzle-item";
    el.textContent = par.termino;
    el.dataset.termino = par.termino;
    el.onclick = function () { seleccionarTermino(el, par); };
    colTerminos.appendChild(el);
  });

  definicionesMezcladas.forEach(function (par) {
    var el = document.createElement("div");
    el.className = "puzzle-item";
    el.textContent = par.definicion;
    el.dataset.termino = par.termino;
    el.onclick = function () { seleccionarDefinicion(el, par); };
    colDefiniciones.appendChild(el);
  });

  function seleccionarTermino(el, par) {
    if (el.classList.contains("acoplado")) return;
    if (terminoSeleccionado) terminoSeleccionado.el.classList.remove("seleccionado");
    terminoSeleccionado = { el: el, par: par };
    el.classList.add("seleccionado");
    intentarAcoplar();
  }

  function seleccionarDefinicion(el, par) {
    if (el.classList.contains("acoplado")) return;
    if (definicionSeleccionada) definicionSeleccionada.el.classList.remove("seleccionado");
    definicionSeleccionada = { el: el, par: par };
    el.classList.add("seleccionado");
    intentarAcoplar();
  }

  function intentarAcoplar() {
    if (!terminoSeleccionado || !definicionSeleccionada) return;
    if (terminoSeleccionado.par.termino === definicionSeleccionada.par.termino) {
      terminoSeleccionado.el.classList.remove("seleccionado");
      definicionSeleccionada.el.classList.remove("seleccionado");
      terminoSeleccionado.el.classList.add("acoplado");
      definicionSeleccionada.el.classList.add("acoplado");
      reproducirAudio(terminoSeleccionado.par.audio);
      acoplados++;
      terminoSeleccionado = null;
      definicionSeleccionada = null;
      if (acoplados === puzzle.pares.length) {
        var btn = document.createElement("button");
        btn.className = "btn-principal";
        btn.textContent = "Continuar";
        btn.onclick = siguientePantalla;
        main.appendChild(btn);
      }
    } else {
      var tEl = terminoSeleccionado.el, dEl = definicionSeleccionada.el;
      setTimeout(function () {
        tEl.classList.remove("seleccionado");
        dEl.classList.remove("seleccionado");
      }, 500);
      terminoSeleccionado = null;
      definicionSeleccionada = null;
    }
  }
}

// -----------------------------------------------------
// QUIZ FINAL
// -----------------------------------------------------
function renderQuiz() {
  var indicePregunta = 0;
  puntajeQuiz = 0;
  dibujarPregunta();

  function dibujarPregunta() {
    var q = DATA.quiz[indicePregunta];
    var html = "";
    html += "<h2>Quiz Final</h2>";
    html += '<div class="contador">Pregunta ' + (indicePregunta + 1) + " de " + DATA.quiz.length + "</div>";
    html += '<img class="pantalla-img" src="' + q.imagen + '" alt="Pregunta ' + (indicePregunta + 1) + '">';
    html += '<p class="texto">' + q.pregunta + "</p>";
    html += '<div class="opciones" id="opciones-quiz"></div>';
    main.innerHTML = html;

    var cont = document.getElementById("opciones-quiz");
    q.opciones.forEach(function (op, idx) {
      var b = document.createElement("button");
      b.className = "opcion";
      b.textContent = op;
      b.onclick = function () { elegirOpcionQuiz(idx, q, cont); };
      cont.appendChild(b);
    });
  }

  function elegirOpcionQuiz(idx, q, cont) {
    var botones = cont.querySelectorAll(".opcion");
    botones.forEach(function (b, i) {
      b.classList.add("deshabilitada");
      if (i === q.correcta) b.classList.add("correcta");
      else if (i === idx) b.classList.add("incorrecta");
    });
    totalGlobal++;
    if (idx === q.correcta) { puntajeQuiz++; aciertosGlobales++; }

    var btnSig = document.createElement("button");
    btnSig.className = "btn-principal";
    btnSig.textContent = (indicePregunta < DATA.quiz.length - 1) ? "Siguiente" : "Ver resultado";
    btnSig.disabled = true;
    btnSig.onclick = function () {
      if (indicePregunta < DATA.quiz.length - 1) {
        indicePregunta++;
        dibujarPregunta();
      } else {
        mostrarResultadoQuiz();
      }
    };
    main.appendChild(btnSig);

    reproducirAudio(q.audio_feedback, function () { btnSig.disabled = false; });
  }

  function mostrarResultadoQuiz() {
    var html = "";
    html += "<h2>¡Terminaste el Quiz!</h2>";
    html += '<div class="puntaje">' + puntajeQuiz + " / " + DATA.quiz.length + "</div>";
    html += '<p class="texto">' + mensajeSegunPuntaje(puntajeQuiz, DATA.quiz.length) + "</p>";
    main.innerHTML = html;

    var btn = document.createElement("button");
    btn.className = "btn-principal";
    btn.textContent = "Continuar";
    btn.onclick = siguientePantalla;
    main.appendChild(btn);
  }

  function mensajeSegunPuntaje(puntaje, total) {
    var pct = puntaje / total;
    if (pct === 1) return "¡Excelente! Dominás el tema por completo.";
    if (pct >= 0.7) return "¡Muy bien! Conocés bien las Sociedades Cooperativas.";
    if (pct >= 0.4) return "Vas bien, pero conviene repasar algunos puntos.";
    return "Te recomendamos repasar el tema nuevamente.";
  }
}

// -----------------------------------------------------
// CIERRE
// -----------------------------------------------------
function renderCierre() {
  var d = DATA.cierre;
  var pct = totalGlobal > 0 ? Math.round((aciertosGlobales / totalGlobal) * 100) : 0;

  var html = "";
  html += '<img class="pantalla-img img-cierre" src="' + d.imagen + '" alt="Cierre">';
  html += "<h2>" + d.mensaje + "</h2>";

  html += '<div class="puntaje">' + aciertosGlobales + " / " + totalGlobal + " (" + pct + "%)</div>";
  html += '<p class="texto">Aciertos: ' + aciertosGlobales + " · Errores: " + (totalGlobal - aciertosGlobales) + "</p>";

  html += '<div class="video-card">';
  html += "<h3>" + d.video.texto + "</h3>";
  html += "<p>" + d.video.bajada + "</p>";
  html += '<a class="btn-video" href="' + d.video.url + '" target="_blank" rel="noopener">' + d.video.boton + "</a>";
  html += "</div>";

  html += '<div class="fila-comenzar">';
  html += '<img class="foto-thumb" id="foto-thumb-cierre" src="' + DATA.meta.foto + '" alt="Profe">';
  html += "</div>";
  html += '<p class="firma">' + DATA.meta.firma + "</p>";

  main.innerHTML = html;
  main.insertBefore(crearBotonAudio(d.audio), main.children[1]);

  var videoCard = document.querySelector(".video-card");
  main.insertBefore(crearBotonAudio(d.video.audio_texto), videoCard);

  document.getElementById("foto-thumb-cierre").onclick = abrirLightbox;

  reproducirAudioEncadenado([d.audio, d.video.audio_texto, d.video.audio_boton]);
}

// -----------------------------------------------------
// INICIO
// -----------------------------------------------------
irAPantalla(0);
