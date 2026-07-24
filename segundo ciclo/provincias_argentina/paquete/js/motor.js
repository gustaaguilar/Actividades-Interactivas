// ============================================================
// MOTOR - "Provincias de Argentina"
// ============================================================

// ---------- Utilidades generales ----------
function mezclar(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function elegirAlAzar(array, cantidad) {
  return mezclar(array).slice(0, cantidad);
}

var audioActual = null;
function reproducir(src) {
  if (!src) return;
  if (audioActual) {
    audioActual.pause();
    audioActual.currentTime = 0;
  }
  audioActual = new Audio(src);
  audioActual.play().catch(() => {});
}

function reproducirSecuencia(srcs) {
  const lista = srcs.filter(Boolean);
  if (lista.length === 0) return;
  let i = 0;
  function siguiente() {
    if (i >= lista.length) return;
    if (audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;
    }
    audioActual = new Audio(lista[i]);
    audioActual.addEventListener("ended", () => {
      i++;
      siguiente();
    });
    audioActual.play().catch(() => {});
  }
  siguiente();
}

// Reproduce el audio completo y recién entonces ejecuta el callback
function reproducirYLuego(src, callback) {
  if (!src) { callback(); return; }
  if (audioActual) { audioActual.pause(); audioActual.currentTime = 0; }
  audioActual = new Audio(src);
  audioActual.addEventListener("ended", callback);
  audioActual.play().catch(() => callback());
}

function feedbackSonoro(ok) {
  reproducir(ok ? AUDIOS_GENERALES.correcto : AUDIOS_GENERALES.incorrecto);
}

// ---------- Puntaje global ----------
var puntaje = { correctas: 0, incorrectas: 0 };
function sumarResultado(ok) {
  if (ok) puntaje.correctas++;
  else puntaje.incorrectas++;
}

// ---------- Navegación entre pantallas ----------
var ORDEN_PANTALLAS = [
  "portada", "mapa", "donde-queda", "union", "vof",
  "opcion-multiple", "sopa-0", "sopa-1", "sopa-2",
  "rompecabezas", "memoria", "cierre"
];
var indiceActual = 0;

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
  const el = document.getElementById(`pantalla-${id}`);
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
    case "mapa": return initMapa();
    case "donde-queda": return initDondeQueda();
    case "union": return initUnion();
    case "vof": return initVoF();
    case "opcion-multiple": return initOpcionMultiple();
    case "sopa-0": return initSopa(0);
    case "sopa-1": return initSopa(1);
    case "sopa-2": return initSopa(2);
    case "rompecabezas": return initRompecabezas();
    case "memoria": return initMemoria();
    case "cierre": return initCierre();
  }
}

// ============================================================
// PANTALLA 1 - PORTADA
// ============================================================
function initPortada() {
  // el audio de bienvenida se dispara solo con el altavoz (autoplay bloqueado por navegadores)
}
function reproducirBienvenida() {
  reproducir(AUDIOS_GENERALES.portada);
}

// Helper reutilizable: mapa mini con una provincia resaltada + su imagen
function renderMapaMini(contenedorId, key) {
  const cont = document.getElementById(contenedorId);
  if (!cont) return;
  let svg = `<svg viewBox="${MAPA_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">`;
  for (const k in PROVINCIAS_SVG) {
    const activa = k === key ? ' style="fill:var(--amarillo)"' : "";
    svg += `<path class="provincia-path"${activa} d="${PROVINCIAS_SVG[k].d}"/>`;
  }
  svg += `</svg>`;
  const info = PROVINCIAS_INFO[key];
  cont.innerHTML = svg + (info ? `<div><strong>${info.nombre}</strong></div><img src="${info.imagen}" alt="${info.nombre}">` : "");
  cont.classList.add("visible");
}

// ============================================================
// PANTALLA 2 - MAPA INTERACTIVO
// ============================================================
var mapaInicializado = false;
function initMapa() {
  reproducir(AUDIOS_GENERALES.mapaConsigna);
  if (mapaInicializado) return;
  mapaInicializado = true;

  const cont = document.getElementById("mapa-svg-contenedor");
  let svg = `<svg viewBox="${MAPA_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">`;
  for (const key in PROVINCIAS_SVG) {
    svg += `<path id="mapa-${key}" class="provincia-path" data-key="${key}" d="${PROVINCIAS_SVG[key].d}"/>`;
  }
  svg += `</svg>`;
  cont.innerHTML = svg;

  cont.querySelectorAll(".provincia-path").forEach(path => {
    path.addEventListener("click", () => {
      const key = path.dataset.key;
      cont.querySelectorAll(".provincia-path").forEach(p => p.classList.remove("activa"));
      path.classList.add("activa");
      const info = PROVINCIAS_INFO[key];
      document.getElementById("mapa-info-nombre").textContent = info.nombre;
      document.getElementById("mapa-info-texto").textContent = info.texto;
      document.getElementById("mapa-info-panel").classList.add("visible");
      reproducir(info.audio);
    });
  });
}

// ============================================================
// PANTALLA 3 - ¿DÓNDE QUEDA?
// ============================================================
var dqPreguntas = [];
var dqIndice = 0;

function initDondeQueda() {
  dqPreguntas = elegirAlAzar(PROVINCIAS_KEYS, 6);
  dqIndice = 0;

  const cont = document.getElementById("dq-svg-contenedor");
  let svg = `<svg viewBox="${MAPA_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">`;
  for (const key in PROVINCIAS_SVG) {
    svg += `<path id="dq-${key}" class="provincia-path" data-key="${key}" d="${PROVINCIAS_SVG[key].d}"/>`;
  }
  svg += `</svg>`;
  cont.innerHTML = svg;

  cont.querySelectorAll(".provincia-path").forEach(path => {
    path.addEventListener("click", () => onClickDondeQueda(path));
  });

  document.getElementById("dq-altavoz-btn").onclick = () => {
    if (dqIndice < dqPreguntas.length) reproducir(audioDondeQueda(dqPreguntas[dqIndice]));
  };

  setTimeout(mostrarPreguntaDondeQueda, 300);
}

function mostrarPreguntaDondeQueda() {
  if (dqIndice >= dqPreguntas.length) {
    document.getElementById("dq-siguiente-btn").style.display = "inline-block";
    document.getElementById("dq-progreso").textContent = "¡Completaste las 6 preguntas!";
    document.getElementById("dq-pregunta-texto").textContent = "";
    return;
  }
  const key = dqPreguntas[dqIndice];
  document.getElementById("dq-progreso").textContent = `Pregunta ${dqIndice + 1} de 6`;
  document.getElementById("dq-pregunta-texto").textContent = `¿Dónde queda ${PROVINCIAS_INFO[key].nombre}?`;
  document.getElementById("dq-feedback").textContent = "";
  document.querySelectorAll("#dq-svg-contenedor .provincia-path").forEach(p => {
    p.classList.remove("correcta", "incorrecta", "activa");
  });
  reproducir(audioDondeQueda(key));
}

function onClickDondeQueda(path) {
  if (dqIndice >= dqPreguntas.length) return;
  const objetivo = dqPreguntas[dqIndice];
  const elegido = path.dataset.key;
  const feedback = document.getElementById("dq-feedback");
  if (elegido === objetivo) {
    path.classList.add("correcta");
    feedback.textContent = `¡Correcto! Es ${PROVINCIAS_INFO[objetivo].nombre}.`;
    sumarResultado(true);
    feedbackSonoro(true);
    dqIndice++;
    setTimeout(mostrarPreguntaDondeQueda, 1400);
  } else {
    path.classList.add("incorrecta");
    feedback.textContent = "Probá de nuevo.";
    sumarResultado(false);
    feedbackSonoro(false);
    setTimeout(() => path.classList.remove("incorrecta"), 700);
  }
}

// ============================================================
// PANTALLA 4 - UNIÓN PROVINCIA <-> IMAGEN
// ============================================================
var unionSeleccionNombre = null;
var unionSeleccionImagen = null;
var unionResueltas = new Set();
var unionClaves = [];

function initUnion() {
  reproducir(AUDIOS_GENERALES.unionConsigna);
  unionClaves = elegirAlAzar(PROVINCIAS_KEYS, 6);
  unionResueltas = new Set();
  unionSeleccionNombre = null;
  unionSeleccionImagen = null;

  const nombresCol = document.getElementById("union-nombres");
  const imagenesCol = document.getElementById("union-imagenes");
  nombresCol.innerHTML = "";
  imagenesCol.innerHTML = "";

  const nombresMezclados = mezclar(unionClaves);
  const imagenesMezcladas = mezclar(unionClaves);

  nombresMezclados.forEach(key => {
    const div = document.createElement("div");
    div.className = "union-item union-nombre";
    div.dataset.key = key;
    div.textContent = PROVINCIAS_INFO[key].nombre;
    div.addEventListener("click", () => seleccionarUnion("nombre", div));
    nombresCol.appendChild(div);
  });

  imagenesMezcladas.forEach(key => {
    const div = document.createElement("div");
    div.className = "union-item union-imagen";
    div.dataset.key = key;
    div.innerHTML = `<img src="${PROVINCIAS_INFO[key].imagen}" alt="${PROVINCIAS_INFO[key].nombre}">`;
    div.addEventListener("click", () => {
      reproducir(PROVINCIAS_INFO[key].audio);
      seleccionarUnion("imagen", div);
    });
    imagenesCol.appendChild(div);
  });

  document.getElementById("union-siguiente-btn").style.display = "none";
}

function seleccionarUnion(tipo, el) {
  if (el.classList.contains("resuelta")) return;
  if (tipo === "nombre") {
    if (unionSeleccionNombre) unionSeleccionNombre.classList.remove("seleccionada");
    unionSeleccionNombre = el;
    el.classList.add("seleccionada");
  } else {
    if (unionSeleccionImagen) unionSeleccionImagen.classList.remove("seleccionada");
    unionSeleccionImagen = el;
    el.classList.add("seleccionada");
  }
  if (unionSeleccionNombre && unionSeleccionImagen) {
    verificarUnion();
  }
}

function verificarUnion() {
  const a = unionSeleccionNombre;
  const b = unionSeleccionImagen;
  if (a.dataset.key === b.dataset.key) {
    a.classList.add("resuelta");
    b.classList.add("resuelta");
    a.classList.remove("seleccionada");
    b.classList.remove("seleccionada");
    sumarResultado(true);
    unionResueltas.add(a.dataset.key);
    if (unionResueltas.size === unionClaves.length) {
      document.getElementById("union-siguiente-btn").style.display = "inline-block";
    }
  } else {
    sumarResultado(false);
    setTimeout(() => {
      a.classList.remove("seleccionada");
      b.classList.remove("seleccionada");
    }, 600);
  }
  unionSeleccionNombre = null;
  unionSeleccionImagen = null;
}

// ============================================================
// PANTALLA 5 - VERDADERO O FALSO
// ============================================================
var vofIndice = 0;

function initVoF() {
  vofIndice = 0;
  const fondo = document.getElementById("vof-fondo-mapa");
  if (fondo && !fondo.dataset.listo) {
    let svg = `<svg viewBox="${MAPA_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">`;
    for (const k in PROVINCIAS_SVG) svg += `<path d="${PROVINCIAS_SVG[k].d}" fill="var(--azul)"/>`;
    svg += `</svg>`;
    fondo.innerHTML = svg;
    fondo.dataset.listo = "1";
  }
  reproducir(VOF_CONSIGNA_AUDIO);
  document.getElementById("vof-siguiente-btn").style.display = "none";
  setTimeout(mostrarVoF, 1400);
}

function mostrarVoF() {
  if (vofIndice >= AFIRMACIONES_VOF.length) {
    document.getElementById("vof-siguiente-btn").style.display = "inline-block";
    document.getElementById("vof-progreso").textContent = "¡Completaste las 6 afirmaciones!";
    document.getElementById("vof-texto").textContent = "";
    document.getElementById("vof-botones").style.display = "none";
    return;
  }
  const item = AFIRMACIONES_VOF[vofIndice];
  document.getElementById("vof-progreso").textContent = `Afirmación ${vofIndice + 1} de 6`;
  document.getElementById("vof-texto").textContent = item.texto;
  document.getElementById("vof-feedback").textContent = "";
  document.getElementById("vof-botones").style.display = "flex";
  reproducir(item.audio);
}

function responderVoF(valor) {
  const item = AFIRMACIONES_VOF[vofIndice];
  const feedback = document.getElementById("vof-feedback");
  const ok = valor === item.valor;
  sumarResultado(ok);
  setTimeout(() => feedbackSonoro(ok), 300);
  feedback.textContent = ok ? "¡Correcto!" : `Incorrecto. Era ${item.valor ? "Verdadero" : "Falso"}.`;
  vofIndice++;
  setTimeout(mostrarVoF, 1600);
}

// ============================================================
// PANTALLA 6 - OPCIÓN MÚLTIPLE
// ============================================================
var omIndice = 0;

function initOpcionMultiple() {
  omIndice = 0;
  reproducir(OM_CONSIGNA_AUDIO);
  document.getElementById("om-siguiente-btn").style.display = "none";
  setTimeout(mostrarOM, 1400);
}

function mostrarOM() {
  if (omIndice >= PREGUNTAS_OM.length) {
    document.getElementById("om-siguiente-btn").style.display = "inline-block";
    document.getElementById("om-progreso").textContent = "¡Completaste las 4 preguntas!";
    document.getElementById("om-pregunta").textContent = "";
    document.getElementById("om-opciones").innerHTML = "";
    return;
  }
  const item = PREGUNTAS_OM[omIndice];
  document.getElementById("om-progreso").textContent = `Pregunta ${omIndice + 1} de 4`;
  document.getElementById("om-pregunta").textContent = item.pregunta;
  document.getElementById("om-feedback").textContent = "";
  document.getElementById("om-mapa-mini").classList.remove("visible");
  document.getElementById("om-mapa-mini").innerHTML = "";
  const cont = document.getElementById("om-opciones");
  cont.innerHTML = "";
  item.opciones.forEach((op, idx) => {
    const btn = document.createElement("button");
    btn.className = "om-opcion-btn";
    btn.textContent = op;
    btn.addEventListener("click", () => responderOM(idx, btn));
    cont.appendChild(btn);
  });
  reproducir(item.audio);
}

function responderOM(idx, btn) {
  const item = PREGUNTAS_OM[omIndice];
  const ok = idx === item.correcta;
  sumarResultado(ok);
  feedbackSonoro(ok);
  document.querySelectorAll("#om-opciones button").forEach(b => b.disabled = true);
  btn.classList.add(ok ? "correcta" : "incorrecta");
  document.getElementById("om-feedback").textContent = ok
    ? "¡Correcto!"
    : `Incorrecto. Era: ${item.opciones[item.correcta]}`;
  if (ok) {
    const key = PROVINCIAS_KEYS.find(k => PROVINCIAS_INFO[k].nombre === item.opciones[item.correcta]);
    if (key) renderMapaMini("om-mapa-mini", key);
  }
  omIndice++;
  setTimeout(mostrarOM, ok ? 2200 : 1500);
}

// ============================================================
// PANTALLAS 7-9 - SOPA DE LETRAS
// ============================================================
var sopaEstado = {};

function generarGrilla(palabras, tam) {
  const grilla = Array.from({ length: tam }, () => Array(tam).fill(null));
  const direcciones = [
    { dr: 0, dc: 1 },   // horizontal
    { dr: 1, dc: 0 },   // vertical
    { dr: 1, dc: 1 }    // diagonal
  ];
  const ubicaciones = [];

  function cabe(palabra, r, c, dir) {
    for (let i = 0; i < palabra.length; i++) {
      const rr = r + dir.dr * i;
      const cc = c + dir.dc * i;
      if (rr < 0 || rr >= tam || cc < 0 || cc >= tam) return false;
      const actual = grilla[rr][cc];
      if (actual !== null && actual !== palabra[i]) return false;
    }
    return true;
  }

  function colocar(palabra, r, c, dir) {
    for (let i = 0; i < palabra.length; i++) {
      const rr = r + dir.dr * i;
      const cc = c + dir.dc * i;
      grilla[rr][cc] = palabra[i];
    }
  }

  palabras.forEach(palabra => {
    let colocada = false;
    for (let intento = 0; intento < 200 && !colocada; intento++) {
      const dir = direcciones[Math.floor(Math.random() * direcciones.length)];
      const r = Math.floor(Math.random() * tam);
      const c = Math.floor(Math.random() * tam);
      if (cabe(palabra, r, c, dir)) {
        colocar(palabra, r, c, dir);
        ubicaciones.push({ palabra, r, c, dir });
        colocada = true;
      }
    }
    if (!colocada) {
      // fallback: horizontal en la primera fila libre, garantiza que siempre se ubique
      for (let r = 0; r < tam && !colocada; r++) {
        if (cabe(palabra, r, 0, direcciones[0])) {
          colocar(palabra, r, 0, direcciones[0]);
          ubicaciones.push({ palabra, r, c: 0, dir: direcciones[0] });
          colocada = true;
        }
      }
    }
  });

  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < tam; r++) {
    for (let c = 0; c < tam; c++) {
      if (grilla[r][c] === null) {
        grilla[r][c] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
  }

  return { grilla, ubicaciones };
}

function initSopa(indice) {
  const datos = SOPAS[indice];
  reproducir(datos.consignaAudio);

  const tam = Math.max(...datos.palabras.map(p => p.length)) + 2;
  const { grilla } = generarGrilla(datos.palabras, tam);

  sopaEstado[indice] = {
    tam,
    encontradas: new Set(),
    seleccionActual: []
  };

  document.getElementById(`sopa-${indice}-titulo`).textContent = datos.titulo;
  const listaEl = document.getElementById(`sopa-${indice}-lista`);
  listaEl.innerHTML = datos.palabras
    .map(p => `<span class="sopa-palabra" id="sopa-${indice}-palabra-${p}">${p}</span>`)
    .join(" ");

  const mapaMini = document.getElementById(`sopa-${indice}-mapa-mini`);
  mapaMini.classList.remove("visible");
  mapaMini.innerHTML = "";

  const grillaEl = document.getElementById(`sopa-${indice}-grilla`);
  grillaEl.style.setProperty("--tam", tam);
  grillaEl.innerHTML = "";
  for (let r = 0; r < tam; r++) {
    for (let c = 0; c < tam; c++) {
      const span = document.createElement("span");
      span.className = "sopa-celda";
      span.textContent = grilla[r][c];
      span.dataset.r = r;
      span.dataset.c = c;
      span.addEventListener("click", () => onTocarCeldaSopa(indice, span));
      grillaEl.appendChild(span);
    }
  }

  document.getElementById(`sopa-${indice}-siguiente-btn`).style.display = "none";
}

// Selección letra por letra (tap secuencial), se pinta verde progresivamente.
// - Tocar la última celda seleccionada la deshace (permite corregir sin perder todo).
// - Cualquier toque que rompa la línea reinicia la selección, reciclando ese
//   mismo toque como el nuevo inicio (así una corrección nunca se "pierde").
// - Una celda ya usada por una palabra encontrada puede volver a tocarse, porque
//   dos palabras pueden compartir una misma letra en la grilla.
function onTocarCeldaSopa(indice, celda) {
  const estado = sopaEstado[indice];
  const sel = estado.seleccionActual;

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
    sel.push(celda);
    celda.classList.add("sopa-sel-temp");
    verificarSeleccionActualSopa(indice);
    return;
  }

  const dr = Math.sign(+sel[1].dataset.r - sel[0].dataset.r);
  const dc = Math.sign(+sel[1].dataset.c - sel[0].dataset.c);
  const ultimo = sel[sel.length - 1];
  const espR = +ultimo.dataset.r + dr, espC = +ultimo.dataset.c + dc;

  if (+celda.dataset.r === espR && +celda.dataset.c === espC) {
    sel.push(celda);
    celda.classList.add("sopa-sel-temp");
    verificarSeleccionActualSopa(indice);
  } else {
    limpiarSeleccionSopa(indice);
    sel.push(celda);
    celda.classList.add("sopa-sel-temp");
  }
}

function limpiarSeleccionSopa(indice) {
  sopaEstado[indice].seleccionActual.forEach(c => c.classList.remove("sopa-sel-temp"));
  sopaEstado[indice].seleccionActual.length = 0; // vaciar en el lugar (no reasignar)
}

function verificarSeleccionActualSopa(indice) {
  const estado = sopaEstado[indice];
  const sel = estado.seleccionActual;
  const texto = sel.map(c => c.textContent).join("");
  const textoInv = texto.split("").reverse().join("");
  const datos = SOPAS[indice];

  const encontrada = datos.palabras.find(p =>
    (p === texto || p === textoInv) && !estado.encontradas.has(p)
  );

  if (encontrada) {
    estado.encontradas.add(encontrada);
    sel.forEach(c => { c.classList.remove("sopa-sel-temp"); c.classList.add("sopa-encontrada"); });
    const chip = document.getElementById(`sopa-${indice}-palabra-${encontrada}`);
    if (chip) chip.classList.add("sopa-palabra-lista");
    sumarResultado(true);
    feedbackSonoro(true);
    estado.seleccionActual.length = 0;

    const key = SOPA_PALABRA_A_KEY[encontrada];
    if (key) renderMapaMini(`sopa-${indice}-mapa-mini`, key);

    if (estado.encontradas.size === datos.palabras.length) {
      document.getElementById(`sopa-${indice}-siguiente-btn`).style.display = "inline-block";
    }
    return;
  }

  // si ya no puede seguir creciendo hacia ninguna palabra restante, reiniciar
  const maxLargo = Math.max(...datos.palabras
    .filter(p => !estado.encontradas.has(p))
    .map(p => p.length));
  if (sel.length >= maxLargo) {
    setTimeout(() => limpiarSeleccionSopa(indice), 200);
  }
}

// ============================================================
// PANTALLA 10 - ROMPECABEZAS DE ORACIONES
// ============================================================
var rpIndice = 0;
var rpPalabrasOriginal = [];
var rpSiguientePos = 0;

function initRompecabezas() {
  rpIndice = 0;
  reproducir(ROMPECABEZAS_CONSIGNA_AUDIO);
  document.getElementById("rp-siguiente-btn").style.display = "none";
  setTimeout(mostrarRompecabezas, 1400);
}

function mostrarRompecabezas() {
  if (rpIndice >= ORACIONES.length) {
    document.getElementById("rp-siguiente-btn").style.display = "inline-block";
    document.getElementById("rp-progreso").textContent = "¡Armaste las 2 oraciones!";
    document.getElementById("rp-banco").innerHTML = "";
    document.getElementById("rp-armado").innerHTML = "";
    return;
  }
  const item = ORACIONES[rpIndice];
  document.getElementById("rp-progreso").textContent = `Oración ${rpIndice + 1} de 2`;
  document.getElementById("rp-feedback").textContent = "";
  rpPalabrasOriginal = item.texto.split(" "); // el punto final queda pegado a la última palabra
  rpSiguientePos = 0;

  const banco = document.getElementById("rp-banco");
  const armado = document.getElementById("rp-armado");
  banco.innerHTML = "";
  armado.innerHTML = "";

  mezclar(rpPalabrasOriginal).forEach(palabra => {
    const chip = document.createElement("span");
    chip.className = "rp-chip";
    chip.textContent = palabra;
    chip.dataset.palabra = palabra;
    chip.addEventListener("click", () => tocarPalabraRompecabezas(chip, item));
    banco.appendChild(chip);
  });
}

// Mecánica tipo JClic: cada palabra se valida al toque contra la próxima
// posición esperada de la oración. Si es correcta, queda fija en su lugar;
// si no, se queda abajo en el banco y se registra el error (nunca se traba).
function tocarPalabraRompecabezas(chip, item) {
  if (chip.classList.contains("colocada")) return;
  const esperada = rpPalabrasOriginal[rpSiguientePos];

  if (chip.dataset.palabra === esperada) {
    chip.classList.add("colocada");
    chip.onclick = null;
    document.getElementById("rp-armado").appendChild(chip);
    sumarResultado(true);
    feedbackSonoro(true);
    rpSiguientePos++;
    document.getElementById("rp-feedback").textContent = "";

    if (rpSiguientePos === rpPalabrasOriginal.length) {
      document.getElementById("rp-feedback").textContent = "¡Muy bien! Oración correcta.";
      rpIndice++;
      reproducirYLuego(item.audio, () => setTimeout(mostrarRompecabezas, 400));
    }
  } else {
    sumarResultado(false);
    feedbackSonoro(false);
    chip.classList.add("chip-error");
    document.getElementById("rp-feedback").textContent = "Esa palabra no va ahí. Fijate cuál sigue.";
    setTimeout(() => chip.classList.remove("chip-error"), 500);
  }
}

// ============================================================
// PANTALLA 11 - MEMOJUEGO
// ============================================================
var memoriaClaves = [];
var memoriaVolteadas = [];
var memoriaResueltas = new Set();
var memoriaBloqueado = false;

function initMemoria() {
  reproducir(AUDIOS_GENERALES.memoriaConsigna);
  memoriaClaves = elegirAlAzar(PROVINCIAS_KEYS, 8);
  memoriaVolteadas = [];
  memoriaResueltas = new Set();
  memoriaBloqueado = false;

  const cartas = [];
  memoriaClaves.forEach(key => {
    cartas.push({ key, tipo: "nombre" });
    cartas.push({ key, tipo: "imagen" });
  });
  const mezcladas = mezclar(cartas);

  const tablero = document.getElementById("memoria-tablero");
  tablero.innerHTML = "";
  mezcladas.forEach((carta, idx) => {
    const div = document.createElement("div");
    div.className = "memoria-carta";
    div.dataset.key = carta.key;
    div.dataset.tipo = carta.tipo;
    div.dataset.idx = idx;

    const interior = document.createElement("div");
    interior.className = "memoria-carta-interior";

    const dorso = document.createElement("div");
    dorso.className = "memoria-dorso";
    dorso.textContent = "?";

    const frente = document.createElement("div");
    frente.className = "memoria-frente";
    if (carta.tipo === "nombre") {
      frente.textContent = PROVINCIAS_INFO[carta.key].nombre;
    } else {
      const img = document.createElement("img");
      img.src = PROVINCIAS_INFO[carta.key].imagen;
      img.alt = PROVINCIAS_INFO[carta.key].nombre;
      frente.appendChild(img);
    }

    interior.appendChild(dorso);
    interior.appendChild(frente);
    div.appendChild(interior);
    div.addEventListener("click", () => voltearCarta(div));
    tablero.appendChild(div);
  });

  document.getElementById("memoria-siguiente-btn").style.display = "none";
}

function voltearCarta(carta) {
  if (memoriaBloqueado) return;
  if (carta.classList.contains("volteada") || carta.classList.contains("resuelta")) return;
  carta.classList.add("volteada");
  memoriaVolteadas.push(carta);

  if (memoriaVolteadas.length === 2) {
    memoriaBloqueado = true;
    const [a, b] = memoriaVolteadas;
    const esPar = a.dataset.key === b.dataset.key && a.dataset.tipo !== b.dataset.tipo;
    setTimeout(() => {
      if (esPar) {
        a.classList.add("resuelta");
        b.classList.add("resuelta");
        memoriaResueltas.add(a.dataset.key);
        sumarResultado(true);
        reproducir(PROVINCIAS_INFO[a.dataset.key].audio);
        if (memoriaResueltas.size === memoriaClaves.length) {
          document.getElementById("memoria-siguiente-btn").style.display = "inline-block";
        }
      } else {
        a.classList.remove("volteada");
        b.classList.remove("volteada");
        sumarResultado(false);
      }
      memoriaVolteadas = [];
      memoriaBloqueado = false;
    }, 900);
  }
}

// ============================================================
// PANTALLA 12 - CIERRE
// ============================================================
function initCierre() {
  const total = puntaje.correctas + puntaje.incorrectas;
  const pct = total > 0 ? Math.round((puntaje.correctas / total) * 100) : 0;
  document.getElementById("cierre-resultado").textContent =
    `Respondiste bien ${puntaje.correctas} de ${total} (${pct}%)`;
  reproducir(AUDIOS_GENERALES.cierre);
}

function jugarDeNuevo() {
  puntaje.correctas = 0;
  puntaje.incorrectas = 0;
  indiceActual = 0;
  mapaInicializado = false;
  mostrarPantalla(ORDEN_PANTALLAS[0]);
  reproducir(AUDIOS_GENERALES.cierreBoton);
}

// ---------- Init general ----------
document.addEventListener("DOMContentLoaded", () => {
  mostrarPantalla(ORDEN_PANTALLAS[0]);

  document.getElementById("btn-comenzar").addEventListener("click", irSiguiente);
  document.getElementById("mapa-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("dq-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("union-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("vof-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("om-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("sopa-0-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("sopa-1-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("sopa-2-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("rp-siguiente-btn").addEventListener("click", irSiguiente);
  document.getElementById("memoria-siguiente-btn").addEventListener("click", irSiguiente);

  document.querySelectorAll(".vof-btn").forEach(btn => {
    btn.addEventListener("click", () => responderVoF(btn.dataset.valor === "true"));
  });

  document.getElementById("btn-jugar-de-nuevo").addEventListener("click", jugarDeNuevo);
  document.getElementById("btn-altavoz-portada").addEventListener("click", reproducirBienvenida);

  // lightbox de la foto (portada y cierre comparten el mismo comportamiento)
  const lightbox = document.getElementById("lightbox");
  ["portada-thumb", "cierre-thumb"].forEach(id => {
    const thumb = document.getElementById(id);
    if (thumb && lightbox) {
      thumb.addEventListener("click", () => lightbox.classList.add("visible"));
    }
  });
  if (lightbox) {
    document.getElementById("lightbox-cerrar").addEventListener("click", () => {
      lightbox.classList.remove("visible");
    });
  }
});
