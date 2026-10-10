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
SCREENS.push({ tipo: "principiosInfo" });
SCREENS.push({ tipo: "principiosAsoc" });
SCREENS.push({ tipo: "simbolosInfo" });
SCREENS.push({ tipo: "emblema" });
SCREENS.push({ tipo: "coloresAsoc" });
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
var tokenPantalla = 0;
var puntajeQuiz = 0;
var totalGlobal = 0;
var aciertosGlobales = 0;

function actualizarProgreso() {
  var pct = Math.round((pantallaActual / (SCREENS.length - 1)) * 100);
  progresoBar.style.width = pct + "%";
}

function irAPantalla(indice) {
  tokenPantalla++;
  detenerAudioActual();
  pantallaActual = indice;
  actualizarProgreso();
  if (typeof actualizarRevision === "function") actualizarRevision();
  var pantalla = SCREENS[indice];
  main.innerHTML = "";
  main.scrollTop = 0;
  window.scrollTo(0, 0);

  switch (pantalla.tipo) {
    case "portada": renderPortada(); break;
    case "concepto": renderConcepto(); break;
    case "principiosInfo": renderPrincipiosInfo(); break;
    case "principiosAsoc": renderPrincipiosAsoc(); break;
    case "simbolosInfo": renderSimbolosInfo(); break;
    case "emblema": renderPreguntasEmblema(); break;
    case "coloresAsoc": renderColoresAsoc(); break;
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
    main.insertBefore(crearBotonAudio(q.audio), cont);

    reproducirAudio(q.audio);
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
  var d = DATA.cierre, r = resumenResultados();
  var html = "";
  html += '<img class="pantalla-img img-cierre" src="' + d.imagen + '" alt="Cierre">';
  html += "<h2>" + d.mensaje + "</h2>";
  html += '<div class="puntaje">' + r.pct + "% de aciertos</div>";
  html += '<p class="texto stats">✅ Aciertos: ' + r.aciertos + " · ❌ Errores: " + r.errores + " · ⭐ " + r.puntos + " puntos</p>";

  html += '<div class="video-card">';
  html += "<h3>" + d.video.texto + "</h3>";
  html += "<p>" + d.video.bajada + "</p>";
  html += '<a class="btn-video" href="' + d.video.url + '" target="_blank" rel="noopener">' + d.video.boton + "</a>";
  html += "</div>";

  html += '<div class="fila-cierre">';
  html += '<button class="btn-principal btn-chico" id="btn-enviar">📤 Enviar mis resultados al docente</button>';
  html += '<button class="btn-secundario btn-chico" id="btn-rejugar">🔄 Volver a jugar</button>';
  html += "</div>";

  html += '<div class="fila-comenzar fila-pie">';
  html += '<img class="foto-thumb foto-chica" id="foto-thumb-cierre" src="' + DATA.meta.foto + '" alt="Profe">';
  html += '<p class="firma">' + DATA.meta.firma + "</p>";
  html += "</div>";

  main.innerHTML = html;
  main.insertBefore(crearBotonAudio(d.audio), main.children[1]);

  var videoCard = document.querySelector(".video-card");
  main.insertBefore(crearBotonAudio(d.video.audio_texto), videoCard);

  document.getElementById("foto-thumb-cierre").onclick = abrirLightbox;
  document.getElementById("btn-enviar").onclick = abrirEnvio;
  document.getElementById("btn-rejugar").onclick = volverAJugar;

  reproducirAudioEncadenado([d.audio, d.video.audio_texto, d.video.audio_boton]);
}

// -----------------------------------------------------
// UTILIDADES NUEVAS: sonidos, mezclar, SVG
// -----------------------------------------------------
var _ac = null;
function tono(freqs, dur) {
  try {
    _ac = _ac || new (window.AudioContext || window.webkitAudioContext)();
    var t = _ac.currentTime;
    freqs.forEach(function (f, i) {
      var o = _ac.createOscillator(), g = _ac.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t + i * dur);
      g.gain.exponentialRampToValueAtTime(0.25, t + i * dur + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (i + 1) * dur);
      o.connect(g); g.connect(_ac.destination);
      o.start(t + i * dur); o.stop(t + (i + 1) * dur + 0.02);
    });
  } catch (e) {}
}
function sonidoAcierto() { tono([660, 880], 0.12); }
function sonidoError() { tono([220, 160], 0.18); }

function mezclar(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

var COLORES_BANDERA = ["#e53935", "#fb8c00", "#fdd835", "#43a047", "#4fc3f7", "#1e40af", "#8e24aa"];

function svgBandera() {
  var s = '<svg viewBox="0 0 140 98" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bandera del Cooperativismo">';
  COLORES_BANDERA.forEach(function (c, i) { s += '<rect x="0" y="' + (i * 14) + '" width="140" height="14" fill="' + c + '"/>'; });
  return s + "</svg>";
}

// variantes: correcto | unpino | azul | tres
function svgEmblema(variante) {
  var verde = variante === "azul" ? "#1f4e79" : "#2e7d32";
  var pino = function (cx, esc) {
    var k = esc || 1;
    var pts = [[cx, 72 - 52 * k], [cx + 15 * k, 72 - 22 * k], [cx + 7 * k, 72 - 22 * k], [cx + 7 * k, 72], [cx - 7 * k, 72], [cx - 7 * k, 72 - 22 * k], [cx - 15 * k, 72 - 22 * k]];
    return '<polygon points="' + pts.map(function (p) { return p[0] + "," + p[1]; }).join(" ") + '" fill="' + verde + '"/>';
  };
  var s = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Emblema">';
  s += '<defs><clipPath id="cp' + variante + '"><circle cx="50" cy="50" r="44"/></clipPath></defs>';
  s += '<circle cx="50" cy="50" r="46" fill="#f2c200" stroke="' + verde + '" stroke-width="5"/>';
  s += '<rect x="0" y="72" width="100" height="9" fill="' + verde + '" clip-path="url(#cp' + variante + ')"/>';
  if (variante === "unpino") s += pino(50, 1.1);
  else if (variante === "tres") s += pino(28, 0.8) + pino(50, 0.8) + pino(72, 0.8);
  else s += pino(34) + pino(66);
  return s + "</svg>";
}

// -----------------------------------------------------
// PRINCIPIOS — informativa interactiva (sin imagen)
// -----------------------------------------------------
function renderPrincipiosInfo() {
  var d = DATA.principios, tk = tokenPantalla;
  var html = "<h2>" + d.titulo + "</h2>";
  html += '<p class="texto chico">' + d.bajada + "</p>";
  html += '<div class="lista-principios" id="lista-principios"></div>';
  main.innerHTML = html;

  var lista = document.getElementById("lista-principios");
  var filas = [];
  var listo = false;
  d.items.forEach(function (p, i) {
    var f = document.createElement("button");
    f.className = "principio-fila oculta";
    f.style.borderLeftColor = p.color;
    f.innerHTML = '<span class="pnum" style="background:' + p.color + '">' + (i + 1) + "</span>" +
      '<span class="ptxt"><b>' + p.nombre + '</b><span class="pdef def-oculta">' + p.def + "</span></span>";
    f.onclick = function () { if (listo) reproducirAudio(p.audio); };
    lista.appendChild(f);
    filas.push(f);
  });

  var btn = document.createElement("button");
  btn.className = "btn-principal";
  btn.textContent = "Continuar";
  btn.disabled = true;
  btn.onclick = siguientePantalla;
  main.appendChild(btn);

  var i = 0;
  function mostrar() {
    if (tk !== tokenPantalla) return;
    if (i >= filas.length) { listo = true; btn.disabled = false; return; }
    var f = filas[i], def = f.querySelector(".pdef");
    f.classList.remove("oculta");
    f.classList.add("activa");
    var t = setTimeout(function () { def.classList.remove("def-oculta"); }, 1700);
    var actual = d.items[i];
    reproducirAudio(actual.audio, function () {
      clearTimeout(t);
      def.classList.remove("def-oculta");
      f.classList.remove("activa");
      i++;
      setTimeout(mostrar, 250);
    });
  }
  reproducirAudio(d.audio_intro, mostrar);
}

// -----------------------------------------------------
// ASOCIACIÓN genérica (principios y colores) — puntúa primer intento
// -----------------------------------------------------
var PASTELES = ["#ffd6d6", "#ffe3c2", "#fff4b8", "#d4edda", "#d0f0fb", "#d6dcf7", "#ead6f5"];

function renderAsociacion(cfg) {
  var tk = tokenPantalla;
  var bloqueado = true, selI = null, selD = null, hechos = 0, evaluado = {};
  var n = cfg.pares.length;

  var html = "<h2>" + cfg.titulo + "</h2>";
  html += '<p class="texto chico">' + cfg.consigna + "</p>";
  html += '<div class="puzzle-cols asoc' + (cfg.compacto ? " compacto" : "") + '">';
  html += '<div class="puzzle-col" id="asoc-izq"></div><div class="puzzle-col" id="asoc-der"></div></div>';
  main.innerHTML = html;
  main.insertBefore(crearBotonAudio(cfg.audio), main.children[2]);

  var colI = document.getElementById("asoc-izq"), colD = document.getElementById("asoc-der");

  function crear(par, lado) {
    var b = document.createElement("button");
    b.className = "puzzle-item asoc-item";
    b.setAttribute("data-id", par.id);
    b.innerHTML = lado === "i" ? par.izqHtml || par.izq : par.der;
    b.onclick = function () { elegir(lado, b); };
    return b;
  }
  cfg.pares.forEach(function (p) { colI.appendChild(crear(p, "i")); });
  mezclar(cfg.pares).forEach(function (p) { colD.appendChild(crear(p, "d")); });

  var btn = document.createElement("button");
  btn.className = "btn-principal";
  btn.textContent = "Continuar";
  btn.disabled = true;
  btn.onclick = siguientePantalla;
  main.appendChild(btn);

  function elegir(lado, el) {
    if (bloqueado || el.classList.contains("acoplado")) return;
    if (lado === "i") { if (selI) selI.classList.remove("seleccionado"); selI = el; }
    else { if (selD) selD.classList.remove("seleccionado"); selD = el; }
    el.classList.add("seleccionado");
    if (selI && selD) evaluar();
  }

  function evaluar() {
    var a = selI, b = selD, id = a.getAttribute("data-id");
    selI = null; selD = null;
    var ok = a.getAttribute("data-id") === b.getAttribute("data-id");
    if (!evaluado[id]) { evaluado[id] = true; totalGlobal++; if (ok) aciertosGlobales++; }
    if (ok) {
      sonidoAcierto();
      var par = cfg.pares.filter(function (p) { return p.id === id; })[0];
      var acento = par.acento || "#3c8c5c";
      [a, b].forEach(function (x) {
        x.classList.remove("seleccionado");
        x.classList.add("acoplado");
        x.style.borderColor = acento;
        x.style.background = par.pastel || PASTELES[hechos % PASTELES.length];
      });
      hechos++;
      if (hechos === n) btn.disabled = false;
    } else {
      sonidoError();
      [a, b].forEach(function (x) { x.classList.add("error"); });
      setTimeout(function () { [a, b].forEach(function (x) { x.classList.remove("error", "seleccionado"); }); }, 550);
    }
  }

  reproducirAudio(cfg.audio, function () { if (tk === tokenPantalla) bloqueado = false; });
}

function renderPrincipiosAsoc() {
  var d = DATA.principiosAsoc;
  renderAsociacion({ titulo: d.titulo, consigna: d.consigna, audio: d.audio, pares: d.pares.map(function (p, i) {
    return { id: p.id, izq: "<b>" + p.izq + "</b>", der: p.der };
  }) });
}

function renderColoresAsoc() {
  var d = DATA.coloresAsoc, cols = DATA.simbolos.colores;
  renderAsociacion({ titulo: d.titulo, consigna: d.consigna, audio: d.audio, compacto: true,
    pares: cols.filter(function (c) { return c.nombre === "Amarillo" || c.nombre === "Verde"; }).map(function (c) {
      return { id: c.nombre, izqHtml: '<span class="swatch" style="background:' + c.hex + '"></span><b>' + c.nombre + "</b>",
        der: c.significado, acento: c.hex, pastel: "#eef7ee" };
    }) });
}

// -----------------------------------------------------
// SÍMBOLOS — informativa con pestañas
// -----------------------------------------------------
function renderSimbolosInfo() {
  var d = DATA.simbolos, tk = tokenPantalla;
  var html = "<h2>" + d.titulo + "</h2>";
  html += '<div class="sim-svgs"><div class="sim-bandera">' + svgBandera() + '</div><div class="sim-emblema">' + svgEmblema("correcto") + "</div></div>";
  html += '<div class="sim-tabs" id="sim-tabs"></div>';
  html += '<div class="sim-texto" id="sim-texto"><span class="gris">' + d.bajada + "</span></div>";
  main.innerHTML = html;

  var tabs = document.getElementById("sim-tabs"), caja = document.getElementById("sim-texto");
  var vistos = {}, listo = false, botones = {};

  var btn = document.createElement("button");
  btn.className = "btn-principal";
  btn.textContent = "Continuar";
  btn.disabled = true;
  btn.onclick = siguientePantalla;
  main.appendChild(btn);

  function textoTab(t) {
    if (t.id !== "colores") return t.texto;
    return '<ul class="lista-colores">' + d.colores.map(function (c) {
      return '<li><span class="swatch" style="background:' + c.hex + '"></span><span><b>' + c.nombre + ":</b> " + c.significado + "</span></li>";
    }).join("") + "</ul>";
  }

  d.tabs.forEach(function (t) {
    var b = document.createElement("button");
    b.className = "sim-tab";
    b.textContent = t.label;
    b.onclick = function () {
      if (!listo) return;
      Object.keys(botones).forEach(function (k) { botones[k].classList.remove("activa"); });
      b.classList.add("activa");
      caja.innerHTML = textoTab(t);
      reproducirAudio(t.audio, function () {
        vistos[t.id] = true;
        b.classList.add("visto");
        if (d.tabs.every(function (x) { return vistos[x.id]; })) btn.disabled = false;
      });
    };
    botones[t.id] = b;
    tabs.appendChild(b);
  });

  reproducirAudio(d.audio_intro, function () {
    if (tk !== tokenPantalla) return;
    listo = true;
    Object.keys(botones).forEach(function (k) { botones[k].classList.add("titila"); });
  });
}

// -----------------------------------------------------
// PREGUNTAS genéricas (emblema) — una por vez, primer intento
// -----------------------------------------------------
function renderPreguntasEmblema() {
  var d = DATA.emblema, indice = 0;
  dibujar();

  function dibujar() {
    var item = d.items[indice];
    var html = "<h2>" + d.titulo + "</h2>";
    html += '<div class="contador">Pregunta ' + (indice + 1) + " de " + d.items.length + "</div>";
    html += '<p class="texto">' + item.pregunta + "</p>";
    html += '<div class="opciones' + (item.tipo === "svg" ? " dos" : "") + '" id="opc-emb"></div>';
    main.innerHTML = html;
    var cont = document.getElementById("opc-emb");
    main.insertBefore(crearBotonAudio(item.audio), cont);

    var lista = item.opciones.map(function (o, i) { return { v: o, ok: i === item.correcta }; });
    mezclar(lista).forEach(function (o) {
      var b = document.createElement("button");
      b.className = "opcion" + (item.tipo === "svg" ? " opcion-svg" : "");
      if (item.tipo === "svg") b.innerHTML = svgEmblema(o.v); else b.textContent = o.v;
      b.onclick = function () { elegir(b, o.ok, cont, item); };
      b._ok = o.ok;
      cont.appendChild(b);
    });
    reproducirAudio(item.audio);
  }

  function elegir(btnElegido, ok, cont, item) {
    if (cont.getAttribute("data-resuelta")) return;
    cont.setAttribute("data-resuelta", "1");
    cont.querySelectorAll(".opcion").forEach(function (b) {
      b.classList.add("deshabilitada");
      if (b._ok) b.classList.add("correcta");
    });
    if (!ok) btnElegido.classList.add("incorrecta");
    totalGlobal++;
    if (ok) { aciertosGlobales++; sonidoAcierto(); } else sonidoError();

    var ultimo = indice >= d.items.length - 1;
    var sig = document.createElement("button");
    sig.className = "btn-principal";
    sig.textContent = ultimo ? "Continuar" : "Siguiente";
    sig.disabled = true;
    sig.onclick = function () { if (ultimo) siguientePantalla(); else { indice++; dibujar(); } };
    main.appendChild(sig);
    reproducirAudio(item.audio_feedback, function () { sig.disabled = false; });
  }
}

// -----------------------------------------------------
// ENVÍO DE RESULTADOS AL DOCENTE (tarjeta PNG + WhatsApp)
// -----------------------------------------------------
var intentoNro = 1;

function resumenResultados() {
  var errores = totalGlobal - aciertosGlobales;
  var pct = totalGlobal > 0 ? Math.round((aciertosGlobales / totalGlobal) * 100) : 0;
  return { aciertos: aciertosGlobales, errores: errores, pct: pct, puntos: aciertosGlobales * 10 };
}

function guardarLS(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function leerLS(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }

function abrirEnvio() {
  var m = document.getElementById("modal-envio");
  document.getElementById("env-alumno").value = leerLS("sic_alumno");
  document.getElementById("env-curso").value = leerLS("sic_curso");
  document.getElementById("env-docente").value = leerLS("sic_docente");
  document.getElementById("env-form").style.display = "block";
  document.getElementById("env-resultado").style.display = "none";
  m.classList.add("activo");
}

function cerrarEnvio() { document.getElementById("modal-envio").classList.remove("activo"); }

function generarTarjeta(datos) {
  var r = resumenResultados();
  var c = document.createElement("canvas");
  c.width = 640; c.height = 760;
  var x = c.getContext("2d");
  x.fillStyle = "#ffffff"; x.fillRect(0, 0, 640, 760);
  x.fillStyle = "#1f4e79"; x.fillRect(0, 0, 640, 110);
  x.fillStyle = "#ffffff"; x.font = "bold 34px Arial"; x.textAlign = "center";
  x.fillText("Sociedades Cooperativas", 320, 56);
  x.font = "20px Arial"; x.fillText("Sistemas de Información Contable", 320, 88);
  x.textAlign = "left"; x.fillStyle = "#333";
  var y = 170;
  [["Alumno/a", datos.alumno], ["Curso", datos.curso || "-"], ["Docente", datos.docente || "-"]].forEach(function (f) {
    x.font = "bold 24px Arial"; x.fillText(f[0] + ":", 40, y);
    x.font = "24px Arial"; x.fillText(f[1], 190, y);
    y += 48;
  });
  x.fillStyle = "#f2f4f6"; x.fillRect(30, y + 4, 580, 300);
  x.fillStyle = "#1e5631"; x.font = "bold 32px Arial"; x.fillText("✅ Aciertos: " + r.aciertos, 60, y + 60);
  x.fillStyle = "#7a1f1f"; x.fillText("❌ Errores: " + r.errores, 60, y + 120);
  x.fillStyle = "#1f4e79"; x.fillText("📊 Porcentaje: " + r.pct + "%", 60, y + 180);
  x.fillStyle = "#b8860b"; x.fillText("⭐ Puntos: " + r.puntos, 60, y + 240);
  x.fillStyle = "#555"; x.font = "20px Arial";
  x.fillText("Intento n.º " + intentoNro + "  ·  " + new Date().toLocaleDateString("es-AR"), 40, y + 350);
  x.fillStyle = "#888"; x.font = "18px Arial"; x.textAlign = "center";
  x.fillText("QueSepanTodos.com · Profe Gustavo Aguilar", 320, 730);
  return c;
}

function textoWhatsApp(d) {
  var r = resumenResultados();
  return "📚 *Sociedades Cooperativas (SIC)*\n👤 Alumno/a: " + d.alumno + "\n🏫 Curso: " + (d.curso || "-") +
    "\n👩‍🏫 Docente: " + (d.docente || "-") + "\n✅ Aciertos: " + r.aciertos + "\n❌ Errores: " + r.errores +
    "\n📊 Porcentaje: " + r.pct + "%\n⭐ Puntos: " + r.puntos + "\n🔁 Intento n.º " + intentoNro +
    "\n📅 " + new Date().toLocaleDateString("es-AR");
}

function confirmarEnvio() {
  var datos = {
    alumno: document.getElementById("env-alumno").value.trim(),
    curso: document.getElementById("env-curso").value.trim(),
    docente: document.getElementById("env-docente").value.trim()
  };
  if (!datos.alumno) { document.getElementById("env-alumno").focus(); return; }
  guardarLS("sic_alumno", datos.alumno); guardarLS("sic_curso", datos.curso); guardarLS("sic_docente", datos.docente);

  var canvas = generarTarjeta(datos);
  var texto = textoWhatsApp(datos);
  var url = canvas.toDataURL("image/png");

  document.getElementById("env-form").style.display = "none";
  var res = document.getElementById("env-resultado");
  res.style.display = "block";
  document.getElementById("env-img").src = url;
  document.getElementById("env-wa").href = "https://wa.me/?text=" + encodeURIComponent(texto);
  var dl = document.getElementById("env-guardar");
  dl.href = url; dl.download = "resultados_cooperativas.png";

  var compartir = function () {
    try {
      canvas.toBlob(function (blob) {
        try {
          var file = new File([blob], "resultados_cooperativas.png", { type: "image/png" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], text: texto }).catch(function () {});
          }
        } catch (e) {}
      }, "image/png");
    } catch (e) {}
  };
  document.getElementById("env-compartir").onclick = compartir;
  compartir();
}

document.getElementById("env-cancelar").onclick = cerrarEnvio;
document.getElementById("env-cerrar2").onclick = cerrarEnvio;
document.getElementById("env-ok").onclick = confirmarEnvio;

function volverAJugar() {
  totalGlobal = 0; aciertosGlobales = 0; puntajeQuiz = 0;
  intentoNro++;
  configurarRevision();
irAPantalla(0);
}

// -----------------------------------------------------
// FLECHAS DE REVISIÓN (solo si meta.revision)
// -----------------------------------------------------
function configurarRevision() {
  if (!DATA.meta.revision) return;
  var nav = document.getElementById("nav-revision");
  nav.classList.add("activo");
  document.body.classList.add("con-revision");
  document.getElementById("rev-ant").onclick = function () { if (pantallaActual > 0) irAPantalla(pantallaActual - 1); };
  document.getElementById("rev-sig").onclick = function () { if (pantallaActual < SCREENS.length - 1) irAPantalla(pantallaActual + 1); };
}
function actualizarRevision() {
  var el = document.getElementById("rev-pos");
  if (el) el.textContent = (pantallaActual + 1) + " / " + SCREENS.length + " · " + SCREENS[pantallaActual].tipo;
}

// -----------------------------------------------------
// INICIO
// -----------------------------------------------------
configurarRevision();
irAPantalla(0);
