// =========================================================
// MOTOR.JS
// "Informarse protege. Hablar ayuda. Actuar transforma."
// =========================================================

var estado = {
    ciclo: null,
    mochilaGuardados: [],
    mochilaIndiceActivo: null,
    clasificarIndice: 0,
    ruletaGirando: false,
    ruletaResultado: null,
    reglaIndiceActual: 0,
    reglaPalabrasColocadas: [],
    cuestionarioIndice: 0,
    cuestionarioCorrectas: 0,
    muralDescubiertos: []
};

var audioActual = null;

// reproducirAudio ahora espera al evento 'ended' real antes de avisar que
// terminó (en vez de usar tiempos fijos adivinados que cortaban el audio).
// Incluye un timeout de seguridad por si el audio no puede reproducirse
// (bloqueo del navegador, archivo faltante, etc.) para no trabar la actividad.
function reproducirAudio(ruta, onEnded) {
    if (!ruta) { if (onEnded) onEnded(); return; }
    if (audioActual) { audioActual.pause(); }

    var terminado = false;
    function finalizar() {
        if (terminado) return;
        terminado = true;
        if (onEnded) onEnded();
    }

    audioActual = new Audio(ruta);
    audioActual.addEventListener("ended", finalizar);
    audioActual.addEventListener("error", finalizar);
    audioActual.play().catch(finalizar);

    // Seguridad: si por algún motivo 'ended' nunca dispara, no dejamos
    // la actividad trabada para siempre.
    setTimeout(finalizar, 8000);
}

function mostrarPantalla(id) {
    var pantallas = document.querySelectorAll(".pantalla");
    for (var i = 0; i < pantallas.length; i++) {
        pantallas[i].classList.remove("activa");
    }
    var destino = document.getElementById(id);
    if (destino) destino.classList.add("activa");
    window.scrollTo(0, 0);
}

function mezclarArray(array) {
    var copia = array.slice();
    for (var i = copia.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = copia[i]; copia[i] = copia[j]; copia[j] = tmp;
    }
    return copia;
}

// ---------------------------------------------------------
// INICIO / PORTADA
// ---------------------------------------------------------
function iniciarPaquete() {
    reproducirAudio("audio/bienvenida.mp3");
    mostrarPantalla("pantalla-seleccion");
}

function abrirLightbox() { document.getElementById("lightbox").classList.add("activo"); }
function cerrarLightbox() { document.getElementById("lightbox").classList.remove("activo"); }

// ---------------------------------------------------------
// SELECCION DE CICLO
// ---------------------------------------------------------
function elegirCiclo(ciclo) {
    estado.ciclo = ciclo;
    if (ciclo === "primero") {
        mostrarPantalla("pantalla-pc-intro-mochila");
        reproducirAudio("audio/pc_intro_mochila.mp3");
    } else {
        mostrarPantalla("pantalla-st-intro-navegacion");
        reproducirAudio("audio/st_intro_navegacion.mp3");
    }
}

function volverASeleccion() {
    estado.mochilaGuardados = [];
    estado.clasificarIndice = 0;
    estado.reglaIndiceActual = 0;
    estado.reglaPalabrasColocadas = [];
    estado.cuestionarioIndice = 0;
    estado.cuestionarioCorrectas = 0;
    estado.muralDescubiertos = [];
    mostrarPantalla("pantalla-seleccion");
}

// ===========================================================
// PRIMER CICLO - MOCHILA (opción múltiple + fundamentación en audio)
// ===========================================================

function irAMochila() {
    mostrarPantalla("pantalla-pc-mochila");
    reproducirAudio("audio/pc_consigna_mochila.mp3");
    renderizarMochila();
}

function renderizarMochila() {
    var grid = document.getElementById("grid-mochila");
    grid.innerHTML = "";
    DATOS.mochila.forEach(function (item, idx) {
        var guardado = estado.mochilaGuardados.indexOf(item.id) !== -1;
        var div = document.createElement("div");
        div.className = "item-imagen" + (guardado ? " guardado" : "");
        div.innerHTML = '<img src="' + item.img + '" alt="' + item.texto + '" loading="lazy">';
        div.onclick = function () { abrirPreguntaMochila(idx); };
        grid.appendChild(div);
    });
    document.getElementById("contador-mochila").textContent =
        estado.mochilaGuardados.length + " / " + DATOS.mochila.length;

    if (estado.mochilaGuardados.length === DATOS.mochila.length) {
        document.getElementById("btn-cierre-mochila").style.display = "inline-block";
    }
}

function abrirPreguntaMochila(idx) {
    var item = DATOS.mochila[idx];
    estado.mochilaIndiceActivo = idx;
    reproducirAudio(item.audio);

    document.getElementById("texto-pregunta-mochila").textContent = item.pregunta;

    var opcionesConIndice = item.opciones.map(function (texto, i) {
        return { texto: texto, esCorrecta: i === item.correcta };
    });
    var mezcladas = mezclarArray(opcionesConIndice);

    var cont = document.getElementById("opciones-pregunta-mochila");
    cont.innerHTML = "";
    mezcladas.forEach(function (op) {
        var btn = document.createElement("button");
        btn.className = "btn-opcion-mochila";
        btn.textContent = op.texto;
        btn.onclick = function () { responderPreguntaMochila(op.esCorrecta, idx); };
        cont.appendChild(btn);
    });

    document.getElementById("feedback-mochila").textContent = "";
    document.getElementById("panel-pregunta-mochila").classList.add("activo");
}

function responderPreguntaMochila(esCorrecta, idx) {
    var feedback = document.getElementById("feedback-mochila");
    var item = DATOS.mochila[idx];

    if (esCorrecta) {
        feedback.textContent = "¡Muy bien!";
        feedback.className = "feedback-mochila correcto";

        if (estado.mochilaGuardados.indexOf(item.id) === -1) {
            estado.mochilaGuardados.push(item.id);
        }

        // Se escucha la fundamentación completa antes de cerrar el panel.
        reproducirAudio(item.fundamentoAudio, function () {
            document.getElementById("panel-pregunta-mochila").classList.remove("activo");
            renderizarMochila();
        });
    } else {
        reproducirAudio(DATOS.feedbackMochila.incorrecto);
        feedback.textContent = "Pensalo de nuevo...";
        feedback.className = "feedback-mochila incorrecto";
    }
}

function irACierreMochila() {
    mostrarPantalla("pantalla-pc-cierre-mochila");
    reproducirAudio("audio/pc_cierre_mochila.mp3");
}

function irACaperucita() {
    mostrarPantalla("pantalla-pc-intro-caperucita");
    reproducirAudio("audio/pc_intro_caperucita.mp3");
    document.getElementById("credito-caperucita").textContent = DATOS.videos.caperucita.credito;
}
function abrirVideoCaperucita() { window.open(DATOS.videos.caperucita.url, "_blank"); }

// ===========================================================
// PRIMER CICLO - CLASIFICAR (Lo comparto / Lo cuido)
// ===========================================================

function irAClasificar() {
    estado.clasificarIndice = 0;
    mostrarPantalla("pantalla-pc-clasificar");
    document.getElementById("img-clasificar").src = DATOS.imagenClasificar;
    renderizarClasificar();
}

function renderizarClasificar() {
    if (estado.clasificarIndice >= DATOS.datosPersonales.length) {
        irAReglas();
        return;
    }
    var dato = DATOS.datosPersonales[estado.clasificarIndice];
    document.getElementById("dato-actual-texto").textContent = dato.texto;
    document.getElementById("progreso-clasificar").textContent =
        "Dato " + (estado.clasificarIndice + 1) + " de " + DATOS.datosPersonales.length;

    // Primero se escucha el dato, y al terminar, la pregunta "¿Lo comparto o lo cuido?"
    reproducirAudio(dato.audio, function () {
        reproducirAudio(DATOS.preguntaComparteCuida);
    });
}

function clasificarDato(categoriaElegida) {
    var dato = DATOS.datosPersonales[estado.clasificarIndice];
    var correcto = dato.categoria === categoriaElegida;
    if (correcto) {
        var audioFeedback = categoriaElegida === "cuidar"
            ? "audio/pc_feedback_correcto_cuidar.mp3"
            : "audio/pc_feedback_correcto_compartir.mp3";
        reproducirAudio(audioFeedback, function () {
            estado.clasificarIndice++;
            renderizarClasificar();
        });
    } else {
        reproducirAudio("audio/pc_feedback_intentalo.mp3");
    }
}

// ===========================================================
// PRIMER CICLO - REGLAS (puzzle de palabras con audio por palabra)
// ===========================================================

function irAReglas() {
    estado.reglaIndiceActual = 0;
    mostrarPantalla("pantalla-pc-reglas");
    reproducirAudio("audio/pc_intro_reglas.mp3");
    renderizarRegla();
}

function renderizarRegla() {
    if (estado.reglaIndiceActual >= DATOS.reglas.length) {
        irACierreFinal();
        return;
    }
    var regla = DATOS.reglas[estado.reglaIndiceActual];
    estado.reglaPalabrasColocadas = [];

    document.getElementById("img-regla").src = regla.img;
    document.getElementById("progreso-regla").textContent =
        "Regla " + (estado.reglaIndiceActual + 1) + " de " + DATOS.reglas.length;

    var palabras = regla.palabras;
    var mezcladas = mezclarArray(palabras.map(function (p, i) {
        return { texto: p.texto, audio: p.audio, indiceOriginal: i };
    }));

    var bancoEl = document.getElementById("banco-palabras");
    var armadoEl = document.getElementById("frase-armada");
    bancoEl.innerHTML = "";
    armadoEl.innerHTML = "";

    for (var i = 0; i < palabras.length; i++) {
        var hueco = document.createElement("span");
        hueco.className = "hueco-palabra";
        hueco.dataset.posicion = i;
        armadoEl.appendChild(hueco);
    }

    mezcladas.forEach(function (item) {
        var btn = document.createElement("button");
        btn.className = "btn-palabra";
        btn.textContent = item.texto;
        btn.onclick = function () { colocarPalabra(item, btn, palabras); };
        bancoEl.appendChild(btn);
    });

    var mensaje = document.getElementById("mensaje-regla-completa");
    mensaje.classList.remove("activo");
    document.getElementById("btn-siguiente-regla").style.display = "none";
}

function colocarPalabra(item, boton, palabrasCompletas) {
    var siguientePosicion = estado.reglaPalabrasColocadas.length;

    if (item.indiceOriginal === siguientePosicion) {
        estado.reglaPalabrasColocadas.push(item.texto);
        var hueco = document.querySelector('.hueco-palabra[data-posicion="' + siguientePosicion + '"]');
        hueco.textContent = item.texto;
        hueco.classList.add("completo");
        boton.disabled = true;
        boton.classList.add("usado");

        var esUltimaPalabra = estado.reglaPalabrasColocadas.length === palabrasCompletas.length;

        // El audio de la palabra se escucha completo antes de continuar con
        // cualquier otro audio (evita que se corten uno a otro).
        reproducirAudio(item.audio, function () {
            if (esUltimaPalabra) {
                var regla = DATOS.reglas[estado.reglaIndiceActual];
                document.getElementById("mensaje-regla-completa").classList.add("activo");
                // Recién cuando termina la frase completa aparece "Siguiente".
                reproducirAudio(regla.audio, function () {
                    document.getElementById("btn-siguiente-regla").style.display = "inline-block";
                });
            }
        });
    } else {
        boton.classList.add("shake");
        setTimeout(function () { boton.classList.remove("shake"); }, 400);
    }
}

function siguienteRegla() {
    estado.reglaIndiceActual++;
    renderizarRegla();
}

// ===========================================================
// SEGUNDO Y TERCER CICLO
// ===========================================================

function abrirVideoNavegacion() { window.open(DATOS.videos.navegacionSegura.url, "_blank"); }

// ---------- RULETA ----------
function irARuleta() {
    mostrarPantalla("pantalla-st-ruleta");
    reproducirAudio("audio/st_consigna_ruleta.mp3");
    document.getElementById("credito-navegacion").textContent = DATOS.videos.navegacionSegura.credito;
    construirRuletaSVG();
}

function construirRuletaSVG() {
    var svg = document.getElementById("svg-ruleta");
    var n = DATOS.ruleta.length;
    var radio = 140, cx = 150, cy = 150;
    var colores = ["#E8734A", "#4CAF7D", "#F0A73C", "#E05A4E"];
    var html = "";
    for (var i = 0; i < n; i++) {
        var a0 = (360 / n) * i, a1 = (360 / n) * (i + 1);
        var x1 = cx + radio * Math.cos(Math.PI * a0 / 180);
        var y1 = cy + radio * Math.sin(Math.PI * a0 / 180);
        var x2 = cx + radio * Math.cos(Math.PI * a1 / 180);
        var y2 = cy + radio * Math.sin(Math.PI * a1 / 180);
        html += '<path d="M' + cx + ',' + cy + ' L' + x1 + ',' + y1 +
            ' A' + radio + ',' + radio + ' 0 0,1 ' + x2 + ',' + y2 + ' Z" fill="' +
            colores[i % colores.length] + '" stroke="white" stroke-width="2"/>';
        var am = (a0 + a1) / 2;
        var tx = cx + (radio * 0.62) * Math.cos(Math.PI * am / 180);
        var ty = cy + (radio * 0.62) * Math.sin(Math.PI * am / 180);
        html += '<text x="' + tx + '" y="' + ty + '" fill="white" font-size="16" font-weight="bold" text-anchor="middle">' + (i + 1) + '</text>';
    }
    svg.innerHTML = html;
    svg.style.transform = "rotate(0deg)";
}

function girarRuleta() {
    if (estado.ruletaGirando) return;
    estado.ruletaGirando = true;
    document.getElementById("situacion-caja").classList.remove("activo");
    document.getElementById("resultado-tipo-ruleta").classList.remove("activo");

    var n = DATOS.ruleta.length;
    var indiceElegido = Math.floor(Math.random() * n);
    var gradosPorSector = 360 / n;
    var anguloFinal = (5 * 360) + (360 - (indiceElegido * gradosPorSector) - gradosPorSector / 2);

    document.getElementById("svg-ruleta").style.transform = "rotate(" + anguloFinal + "deg)";

    setTimeout(function () {
        estado.ruletaGirando = false;
        estado.ruletaResultado = DATOS.ruleta[indiceElegido];
        mostrarSituacionRuleta(estado.ruletaResultado);
    }, 3600);
}

function mostrarSituacionRuleta(situacion) {
    document.getElementById("texto-situacion").textContent = situacion.texto;
    document.getElementById("situacion-caja").classList.add("activo");
    reproducirAudio(situacion.audio);
}

function elegirTipoRuleta(tipoElegido) {
    var situacion = estado.ruletaResultado;
    if (!situacion) return;
    var infoTipo = DATOS.mensajesRuleta[situacion.tipo];
    reproducirAudio(infoTipo.audio);

    var resultado = document.getElementById("resultado-tipo-ruleta");
    resultado.style.background = infoTipo.color;
    resultado.textContent = "Esta situación es: " + situacion.tipo.toUpperCase();
    resultado.classList.add("activo");
}

// ---------- CUESTIONARIO (con audio de pregunta y de fundamentación) ----------
function irACuestionario() {
    estado.cuestionarioIndice = 0;
    estado.cuestionarioCorrectas = 0;
    mostrarPantalla("pantalla-st-cuestionario");
    reproducirAudio("audio/st_intro_cuestionario.mp3", function () {
        renderizarCuestionario();
    });
}

function renderizarCuestionario() {
    if (estado.cuestionarioIndice >= DATOS.cuestionario.length) {
        mostrarCierreCuestionario();
        return;
    }
    var item = DATOS.cuestionario[estado.cuestionarioIndice];
    document.getElementById("progreso-cuestionario").textContent =
        "Pregunta " + (estado.cuestionarioIndice + 1) + " de " + DATOS.cuestionario.length;
    document.getElementById("pregunta-cuestionario-texto").textContent = item.pregunta;

    var opcionesConIndice = item.opciones.map(function (t, i) { return { texto: t, esCorrecta: i === item.correcta }; });
    var mezcladas = mezclarArray(opcionesConIndice);

    var cont = document.getElementById("opciones-cuestionario");
    cont.innerHTML = "";
    mezcladas.forEach(function (op) {
        var btn = document.createElement("button");
        btn.className = "btn-opcion-cuestionario";
        btn.textContent = op.texto;
        btn.onclick = function () { responderCuestionario(op.esCorrecta); };
        cont.appendChild(btn);
    });
    document.getElementById("feedback-cuestionario").textContent = "";

    reproducirAudio(item.audioPregunta);
}

function responderCuestionario(esCorrecta) {
    var feedback = document.getElementById("feedback-cuestionario");
    var item = DATOS.cuestionario[estado.cuestionarioIndice];

    if (esCorrecta) {
        feedback.textContent = "¡Correcto!";
        feedback.className = "feedback-cuestionario correcto";
        estado.cuestionarioCorrectas++;

        reproducirAudio(item.audioFundamento, function () {
            estado.cuestionarioIndice++;
            renderizarCuestionario();
        });
    } else {
        reproducirAudio("audio/st_cuestionario_incorrecto.mp3");
        feedback.textContent = "Esa no es la opción más segura...";
        feedback.className = "feedback-cuestionario incorrecto";
    }
}

function mostrarCierreCuestionario() {
    mostrarPantalla("pantalla-st-cierre-cuestionario");
    document.getElementById("resumen-cuestionario").textContent =
        "Respondiste correctamente " + estado.cuestionarioCorrectas + " de " + DATOS.cuestionario.length + " preguntas.";
    document.getElementById("btn-continuar-cuestionario").style.display = "none";

    reproducirAudio("audio/st_cuestionario_cierre.mp3", function () {
        document.getElementById("btn-continuar-cuestionario").style.display = "inline-block";
    });
}

// ---------- MURAL DE COMPROMISOS (con audio de situación) ----------
function irAMural() {
    mostrarPantalla("pantalla-st-mural");
    reproducirAudio("audio/st_intro_mural.mp3");
    renderizarMural();
}

function renderizarMural() {
    var grid = document.getElementById("grid-mural");
    grid.innerHTML = "";
    DATOS.compromisos.forEach(function (c, idx) {
        var descubierto = estado.muralDescubiertos.indexOf(c.id) !== -1;
        var div = document.createElement("div");
        div.className = "tarjeta-compromiso" + (descubierto ? " descubierta" : " oculta");
        div.innerHTML = '<div class="icono-tarjeta">' + c.icono + '</div>' +
            '<div class="texto-compromiso">' + c.texto + '</div>';
        div.onclick = function () { abrirSituacionMural(idx); };
        grid.appendChild(div);
    });
}

function abrirSituacionMural(idx) {
    var c = DATOS.compromisos[idx];
    document.getElementById("situacion-mural-texto").textContent = c.situacion;

    var opcionesConIndice = c.opciones.map(function (t, i) { return { texto: t, esCorrecta: i === c.correcta }; });
    var mezcladas = mezclarArray(opcionesConIndice);

    var cont = document.getElementById("opciones-situacion-mural");
    cont.innerHTML = "";
    mezcladas.forEach(function (op) {
        var btn = document.createElement("button");
        btn.className = "btn-opcion-mural";
        btn.textContent = op.texto;
        btn.onclick = function () { responderSituacionMural(op.esCorrecta, idx); };
        cont.appendChild(btn);
    });

    document.getElementById("feedback-mural").textContent = "";
    document.getElementById("modal-situacion-mural").classList.add("activo");

    reproducirAudio(c.audioSituacion);
}

function responderSituacionMural(esCorrecta, idx) {
    var feedback = document.getElementById("feedback-mural");
    var c = DATOS.compromisos[idx];
    if (esCorrecta) {
        feedback.textContent = "¡Correcto!";
        feedback.className = "feedback-mural correcto";
        if (estado.muralDescubiertos.indexOf(c.id) === -1) estado.muralDescubiertos.push(c.id);

        reproducirAudio(c.audio, function () {
            document.getElementById("modal-situacion-mural").classList.remove("activo");
            renderizarMural();
        });
    } else {
        reproducirAudio("audio/st_mural_feedback_incorrecto.mp3");
        feedback.textContent = "Pensalo de nuevo...";
        feedback.className = "feedback-mural incorrecto";
    }
}

function cerrarModalMural() {
    document.getElementById("modal-situacion-mural").classList.remove("activo");
}

// ---------- MEMOJUEGO (reemplaza la actividad de colorear) ----------
var memo = {
    cartas: [],          // array de 20 posiciones con {id, img, audio}
    volteadas: [],       // índices actualmente boca arriba (máx 2)
    resueltas: [],       // índices ya emparejados
    bloqueado: false
};

function irAMemojuego() {
    mostrarPantalla("pantalla-st-memojuego");
    reproducirAudio(DATOS.memojuego.consigna);
    construirMemojuego();
}

function construirMemojuego() {
    var pares = DATOS.memojuego.cartas.concat(DATOS.memojuego.cartas);
    memo.cartas = mezclarArray(pares);
    memo.volteadas = [];
    memo.resueltas = [];
    memo.bloqueado = false;
    renderizarMemojuego();
}

function renderizarMemojuego() {
    var grid = document.getElementById("grid-memojuego");
    grid.innerHTML = "";
    memo.cartas.forEach(function (carta, idx) {
        var boca_arriba = memo.volteadas.indexOf(idx) !== -1 || memo.resueltas.indexOf(idx) !== -1;
        var div = document.createElement("div");
        div.className = "carta-memo" + (boca_arriba ? " volteada" : "") + (memo.resueltas.indexOf(idx) !== -1 ? " resuelta" : "");
        div.innerHTML = boca_arriba
            ? '<img src="' + carta.img + '" alt="carta">'
            : '<div class="dorso-carta">🔒</div>';
        div.onclick = function () { voltearCarta(idx); };
        grid.appendChild(div);
    });
    document.getElementById("contador-memojuego").textContent =
        (memo.resueltas.length / 2) + " / " + DATOS.memojuego.cartas.length;
}

function voltearCarta(idx) {
    if (memo.bloqueado) return;
    if (memo.volteadas.indexOf(idx) !== -1 || memo.resueltas.indexOf(idx) !== -1) return;
    if (memo.volteadas.length >= 2) return;

    memo.volteadas.push(idx);
    renderizarMemojuego();

    if (memo.volteadas.length === 2) {
        memo.bloqueado = true;
        var i1 = memo.volteadas[0], i2 = memo.volteadas[1];
        var c1 = memo.cartas[i1], c2 = memo.cartas[i2];

        if (c1.id === c2.id) {
            reproducirAudio(c1.audio, function () {
                memo.resueltas.push(i1, i2);
                memo.volteadas = [];
                memo.bloqueado = false;
                renderizarMemojuego();

                if (memo.resueltas.length === memo.cartas.length) {
                    reproducirAudio(DATOS.memojuego.cierre, function () {
                        irARompecabezas();
                    });
                }
            });
        } else {
            setTimeout(function () {
                memo.volteadas = [];
                memo.bloqueado = false;
                renderizarMemojuego();
            }, 900);
        }
    }
}

// ---------- ROMPECABEZAS DE CIERRE (6 piezas, tap-to-swap) ----------
var rompecabezas = {
    orden: [],       // orden actual: rompecabezas.orden[posicion] = índice de pieza original
    seleccionada: null
};

function irARompecabezas() {
    mostrarPantalla("pantalla-st-rompecabezas");
    construirRompecabezas();
}

function construirRompecabezas() {
    var total = DATOS.rompecabezas.columnas * DATOS.rompecabezas.filas;
    var indices = [];
    for (var i = 0; i < total; i++) indices.push(i);

    // Mezclamos asegurando que no quede ya resuelto de entrada
    do {
        rompecabezas.orden = mezclarArray(indices);
    } while (rompecabezas.orden.every(function (v, i) { return v === i; }));

    rompecabezas.seleccionada = null;
    document.getElementById("btn-finalizar-rompecabezas").style.display = "none";
    renderizarRompecabezas();
}

function renderizarRompecabezas() {
    var cols = DATOS.rompecabezas.columnas;
    var filas = DATOS.rompecabezas.filas;
    var cont = document.getElementById("grid-rompecabezas");
    cont.innerHTML = "";
    cont.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";

    rompecabezas.orden.forEach(function (piezaOriginal, posicion) {
        var col = piezaOriginal % cols;
        var fila = Math.floor(piezaOriginal / cols);
        var div = document.createElement("div");
        div.className = "pieza-rompecabezas";
        if (rompecabezas.seleccionada === posicion) div.classList.add("seleccionada");
        if (piezaOriginal === posicion) div.classList.add("correcta");
        div.style.backgroundImage = "url('" + DATOS.rompecabezas.imagen + "')";
        div.style.backgroundSize = (cols * 100) + "% " + (filas * 100) + "%";
        div.style.backgroundPosition = (col * 100 / (cols - 1)) + "% " + (fila * 100 / (filas - 1)) + "%";
        div.onclick = function () { tocarPiezaRompecabezas(posicion); };
        cont.appendChild(div);
    });
}

function tocarPiezaRompecabezas(posicion) {
    if (rompecabezas.seleccionada === null) {
        rompecabezas.seleccionada = posicion;
        renderizarRompecabezas();
        return;
    }
    if (rompecabezas.seleccionada === posicion) {
        rompecabezas.seleccionada = null;
        renderizarRompecabezas();
        return;
    }
    // Intercambiamos las dos piezas seleccionadas
    var tmp = rompecabezas.orden[posicion];
    rompecabezas.orden[posicion] = rompecabezas.orden[rompecabezas.seleccionada];
    rompecabezas.orden[rompecabezas.seleccionada] = tmp;
    rompecabezas.seleccionada = null;
    renderizarRompecabezas();

    var resuelto = rompecabezas.orden.every(function (v, i) { return v === i; });
    if (resuelto) {
        reproducirAudio(DATOS.rompecabezas.audioFinal, function () {
            document.getElementById("btn-finalizar-rompecabezas").style.display = "inline-block";
        });
    }
}

function finalizarRompecabezas() {
    irACierreFinal();
}

// ===========================================================
// CIERRE COMUN
// ===========================================================
function irACierreFinal() {
    mostrarPantalla("pantalla-cierre-final");
    reproducirAudio("audio/cierre_linea_145.mp3");
}

// ---------------------------------------------------------
// INIT
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("titulo-portada").textContent = DATOS.portada.titulo;
    document.getElementById("subtitulo-portada").textContent = DATOS.portada.subtitulo;
    document.getElementById("pantalla-portada").style.backgroundImage =
        "url('" + DATOS.portada.imagenFondo + "')";
    document.getElementById("linea145-numero").textContent = DATOS.lineaAyuda.numero;
    document.getElementById("linea145-texto").textContent = DATOS.lineaAyuda.texto;
    document.getElementById("fuente-texto").textContent = DATOS.fuente.texto;
    document.getElementById("fuente-logo").src = DATOS.fuente.logo;
});
