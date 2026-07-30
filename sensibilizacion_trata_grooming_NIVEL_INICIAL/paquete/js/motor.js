// =========================================================
// MOTOR.JS - NIVEL INICIAL
// =========================================================

var estado = {
    cuentoIndiceActual: 0,
    cualidadesElegidas: [],
    semaforoIndice: 0
};

var audioActual = null;

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
    setTimeout(finalizar, 8000);
}

function mostrarPantalla(id) {
    var pantallas = document.querySelectorAll(".pantalla");
    for (var i = 0; i < pantallas.length; i++) pantallas[i].classList.remove("activa");
    var destino = document.getElementById(id);
    if (destino) destino.classList.add("activa");
    window.scrollTo(0, 0);
}

// ---------------------------------------------------------
// INICIO / PORTADA
// ---------------------------------------------------------
function iniciarPaquete() {
    mostrarPantalla("pantalla-cuento-intro");
    reproducirAudio("audio/bienvenida.mp3");
}

function abrirLightbox() { document.getElementById("lightbox").classList.add("activo"); }
function cerrarLightbox() { document.getElementById("lightbox").classList.remove("activo"); }

// ---------------------------------------------------------
// CUENTO "LOS GUARDA SECRETOS"
// ---------------------------------------------------------
function abrirVideoCuento() { window.open(DATOS.cuento.url, "_blank"); }

function irAQuienLeCuento() {
    estado.cuentoIndiceActual = 0;
    mostrarPantalla("pantalla-a-quien-le-cuento");
    reproducirAudio("audio/intro_a_quien_le_cuento.mp3", function () {
        renderizarSituacionCuento();
    });
}

function renderizarSituacionCuento() {
    if (estado.cuentoIndiceActual >= DATOS.aQuienLeCuento.length) {
        irAMemojuegoConfianza();
        return;
    }
    var situacion = DATOS.aQuienLeCuento[estado.cuentoIndiceActual];
    document.getElementById("progreso-cuento").textContent =
        "Situación " + (estado.cuentoIndiceActual + 1) + " de " + DATOS.aQuienLeCuento.length;
    document.getElementById("texto-situacion-cuento").textContent = situacion.texto;

    var grid = document.getElementById("grid-personas-confianza");
    grid.innerHTML = "";
    DATOS.personasConfianza.forEach(function (persona) {
        var div = document.createElement("div");
        div.className = "tarjeta-persona";
        div.innerHTML = '<img src="' + persona.img + '" alt="' + persona.nombre + '">' +
            '<div class="nombre-persona">' + persona.nombre + '</div>';
        div.onclick = function () { elegirPersonaConfianza(persona); };
        grid.appendChild(div);
    });

    reproducirAudio(situacion.audio);
}

function repetirAudioCuento() {
    var situacion = DATOS.aQuienLeCuento[estado.cuentoIndiceActual];
    reproducirAudio(situacion.audio);
}

function elegirPersonaConfianza(persona) {
    var situacion = DATOS.aQuienLeCuento[estado.cuentoIndiceActual];
    reproducirAudio(persona.audio, function () {
        if (situacion.importante) {
            reproducirAudio(DATOS.refuerzoImportante, function () {
                estado.cuentoIndiceActual++;
                renderizarSituacionCuento();
            });
        } else {
            estado.cuentoIndiceActual++;
            renderizarSituacionCuento();
        }
    });
}

// ---------------------------------------------------------
// MEMOJUEGO DE PERSONAS DE CONFIANZA
// ---------------------------------------------------------
var memo = {
    cartas: [],
    volteadas: [],
    resueltas: [],
    bloqueado: false
};

function irAMemojuegoConfianza() {
    mostrarPantalla("pantalla-memojuego");
    reproducirAudio(DATOS.memojuegoConfianza.consigna);
    construirMemojuego();
}

function construirMemojuego() {
    var pares = DATOS.personasConfianza.concat(DATOS.personasConfianza);
    memo.cartas = mezclarArray(pares);
    memo.volteadas = [];
    memo.resueltas = [];
    memo.bloqueado = false;
    renderizarMemojuego();
}

function mezclarArray(array) {
    var copia = array.slice();
    for (var i = copia.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = copia[i]; copia[i] = copia[j]; copia[j] = tmp;
    }
    return copia;
}

function renderizarMemojuego() {
    var grid = document.getElementById("grid-memojuego");
    grid.innerHTML = "";
    memo.cartas.forEach(function (carta, idx) {
        var bocaArriba = memo.volteadas.indexOf(idx) !== -1 || memo.resueltas.indexOf(idx) !== -1;
        var div = document.createElement("div");
        div.className = "carta-memo" + (bocaArriba ? " volteada" : "") + (memo.resueltas.indexOf(idx) !== -1 ? " resuelta" : "");
        div.innerHTML = bocaArriba
            ? '<img src="' + carta.img + '" alt="carta">'
            : '<div class="dorso-carta">🔒</div>';
        div.onclick = function () { voltearCartaMemo(idx); };
        grid.appendChild(div);
    });
    document.getElementById("contador-memojuego").textContent =
        (memo.resueltas.length / 2) + " / " + DATOS.personasConfianza.length;
}

function voltearCartaMemo(idx) {
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
            reproducirAudio(c1.audioMemo, function () {
                memo.resueltas.push(i1, i2);
                memo.volteadas = [];
                memo.bloqueado = false;
                renderizarMemojuego();

                if (memo.resueltas.length === memo.cartas.length) {
                    reproducirAudio(DATOS.memojuegoConfianza.cierre, function () {
                        irAMural();
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

// ---------------------------------------------------------
// MURAL DE CUALIDADES ("Mi cuerpo es valioso")
// ---------------------------------------------------------
function irAMural() {
    estado.cualidadesElegidas = [];
    mostrarPantalla("pantalla-mural");
    reproducirAudio("audio/intro_mural.mp3");
    renderizarMural();
}

function renderizarMural() {
    var grid = document.getElementById("grid-cualidades");
    grid.innerHTML = "";
    DATOS.cualidades.forEach(function (c) {
        var elegida = estado.cualidadesElegidas.indexOf(c.id) !== -1;
        var div = document.createElement("div");
        div.className = "tarjeta-cualidad" + (elegida ? " elegida" : "");
        div.innerHTML = '<div class="icono-cualidad">' + c.icono + '</div>' +
            '<div class="texto-cualidad">' + c.texto + '</div>';
        div.onclick = function () { elegirCualidad(c); };
        grid.appendChild(div);
    });
    document.getElementById("contador-mural").textContent =
        estado.cualidadesElegidas.length + " / " + DATOS.cualidades.length;

    if (estado.cualidadesElegidas.length === DATOS.cualidades.length) {
        document.getElementById("btn-cierre-mural").style.display = "inline-block";
    }
}

function elegirCualidad(cualidad) {
    if (estado.cualidadesElegidas.indexOf(cualidad.id) !== -1) return;
    reproducirAudio(cualidad.audio, function () {
        estado.cualidadesElegidas.push(cualidad.id);
        renderizarMural();
    });
}

function irACierreMural() {
    mostrarPantalla("pantalla-cierre-mural");
    reproducirAudio("audio/cierre_mural.mp3");
}

// ---------------------------------------------------------
// EL SEMÁFORO DE LOS LÍMITES
// ---------------------------------------------------------
function irASemaforo() {
    estado.semaforoIndice = 0;
    mostrarPantalla("pantalla-semaforo");
    reproducirAudio("audio/intro_semaforo.mp3", function () {
        renderizarSemaforo();
    });
}

function renderizarSemaforo() {
    if (estado.semaforoIndice >= DATOS.semaforo.length) {
        irACierreFinal();
        return;
    }
    var situacion = DATOS.semaforo[estado.semaforoIndice];
    document.getElementById("progreso-semaforo").textContent =
        "Situación " + (estado.semaforoIndice + 1) + " de " + DATOS.semaforo.length;
    document.getElementById("img-situacion-semaforo").src = situacion.img;
    document.getElementById("resultado-semaforo").classList.remove("activo");

    reproducirAudio(situacion.audio);
}

function repetirAudioSemaforo() {
    var situacion = DATOS.semaforo[estado.semaforoIndice];
    reproducirAudio(situacion.audio);
}

function elegirColorSemaforo(colorElegido) {
    var situacion = DATOS.semaforo[estado.semaforoIndice];
    var info = DATOS.coloresSemaforo[colorElegido];

    var resultado = document.getElementById("resultado-semaforo");
    resultado.style.background = info.color;
    resultado.textContent = info.texto;
    resultado.classList.add("activo");

    reproducirAudio(info.audio, function () {
        estado.semaforoIndice++;
        renderizarSemaforo();
    });
}

// ---------------------------------------------------------
// CIERRE COMUN
// ---------------------------------------------------------
function irACierreFinal() {
    mostrarPantalla("pantalla-cierre-final");
    document.getElementById("img-cierre-final").src = DATOS.imagenCierre;
    reproducirAudio("audio/cierre_linea_145.mp3");
}

function volverAlInicio() {
    estado.cuentoIndiceActual = 0;
    estado.cualidadesElegidas = [];
    estado.semaforoIndice = 0;
    mostrarPantalla("pantalla-portada");
}

// ---------------------------------------------------------
// INIT
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("titulo-portada").textContent = DATOS.portada.titulo;
    document.getElementById("subtitulo-portada").textContent = DATOS.portada.subtitulo;
    document.getElementById("pantalla-portada").style.backgroundImage =
        "url('" + DATOS.portada.imagenFondo + "')";
    document.getElementById("credito-cuento").textContent = DATOS.cuento.credito;
    document.getElementById("linea145-numero").textContent = DATOS.lineaAyuda.numero;
    document.getElementById("linea145-texto").textContent = DATOS.lineaAyuda.texto;
    document.getElementById("fuente-texto").textContent = DATOS.fuente.texto;
    document.getElementById("fuente-logo").src = DATOS.fuente.logo;
});
