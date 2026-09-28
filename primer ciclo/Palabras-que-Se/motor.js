// ============================================================
// PALABRAS QUE SÉ — motor.js
// Engine genérico: construye las pantallas a partir de datos.js
// ============================================================

// ---------- Estado global ----------
const estado = {
  pantallas: [],
  indice: 0,
  aciertos: 0,
  errores: 0,
  puntos: 0,
  instruccionesReproducidas: new Set(),
  audioBloqueando: false,
  diaActual: null, // id del día en curso, para "Volver a jugar"
  palabrasActivas: [], // vocabulario acumulado hasta el día en curso
};

// ---------- Utilidades ----------
function mezclar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Los distractores salen del vocabulario YA ACUMULADO en el día en curso
// (estado.palabrasActivas), no de todo el paquete — así no aparecen como
// opción palabras que todavía no se enseñaron. Si por algún motivo hay muy
// pocas activas, cae de respaldo a todo el vocabulario.
function distractores(actual, campo, cantidad) {
  const pool =
    estado.palabrasActivas && estado.palabrasActivas.length > cantidad
      ? estado.palabrasActivas
      : PALABRAS;
  const otras = pool.filter((p) => p.id !== actual.id);
  return mezclar(otras).slice(0, cantidad).map((p) => p[campo]);
}

// Reproduce una lista de audios en cola. Bloquea la interacción/"Siguiente"
// hasta que termine el último (estándar global del sitio).
let audioActualElemento = null;

function reproducirCola(urls, alTerminar) {
  estado.audioBloqueando = true;
  actualizarBotonSiguiente();
  const cola = [...urls];

  function siguienteAudio() {
    if (cola.length === 0) {
      estado.audioBloqueando = false;
      audioActualElemento = null;
      actualizarBotonSiguiente();
      if (alTerminar) alTerminar();
      return;
    }
    const audio = new Audio(cola.shift());
    audioActualElemento = audio;
    audio.onended = siguienteAudio;
    audio.onerror = siguienteAudio; // no trabar el flujo si falta un archivo
    audio.play().catch(siguienteAudio);
  }
  siguienteAudio();
}

// Corta cualquier audio en curso y desbloquea el flujo. Usado por las
// flechas de revisión rápida para poder saltar de pantalla al instante.
function detenerAudioActual() {
  if (audioActualElemento) {
    audioActualElemento.onended = null;
    audioActualElemento.onerror = null;
    audioActualElemento.pause();
    audioActualElemento = null;
  }
  estado.audioBloqueando = false;
  actualizarBotonSiguiente();
}

function actualizarBotonSiguiente() {
  const btn = document.getElementById("btn-siguiente");
  if (!btn) return;
  btn.disabled = estado.audioBloqueando;
}

// ---------- Construcción de pantallas ----------
// Pantallas base: portada + selector de día. Las pantallas del día elegido
// se agregan recién cuando el usuario toca un día (ver iniciarDia).
function construirPantallasBase() {
  return [{ tipo: "portada" }, { tipo: "seleccionDia" }];
}

// Palabras acumuladas hasta (e incluyendo) el día indicado: todas las de
// los días anteriores + las del día elegido, en orden cronológico.
function palabrasAcumuladasHasta(diaId) {
  const indiceDia = DIAS.findIndex((d) => d.id === diaId);
  const ids = DIAS.slice(0, indiceDia + 1).flatMap((d) => d.palabras);
  return ids.map((id) => PALABRAS.find((p) => p.id === id)).filter(Boolean);
}

function construirPantallasDia(palabras) {
  const lista = [];
  palabras.forEach((p) => {
    lista.push({ tipo: "presentacion", palabra: p });
    lista.push({ tipo: "reconocimiento", palabra: p });
    lista.push({ tipo: "asociacion", palabra: p });
    lista.push({ tipo: "lectura", palabra: p });
  });
  lista.push({ tipo: "cierre" });
  return lista;
}

// Arma y arranca la secuencia de un día (acumulativa) a partir del selector.
function iniciarDia(diaId) {
  const dia = DIAS.find((d) => d.id === diaId);
  if (!dia || dia.pendiente) return; // día sin vocabulario todavía

  const palabras = palabrasAcumuladasHasta(diaId);
  estado.diaActual = diaId;
  estado.palabrasActivas = palabras;
  estado.aciertos = 0;
  estado.errores = 0;
  estado.puntos = 0;
  estado.instruccionesReproducidas.clear();
  estado.pantallas = [...construirPantallasBase(), ...construirPantallasDia(palabras)];
  irAPantalla(2); // primera pantalla después de portada + selector
}

// Vuelve al selector de día, descartando las pantallas del día en curso.
function volverASelectorDia() {
  estado.pantallas = construirPantallasBase();
  irAPantalla(1);
}

// ---------- Navegación ----------
function irAPantalla(indice) {
  estado.indice = indice;
  const pantalla = estado.pantallas[indice];
  renderizar(pantalla);
}

function avanzar() {
  if (estado.audioBloqueando) return;
  if (estado.indice < estado.pantallas.length - 1) {
    irAPantalla(estado.indice + 1);
  }
}

// Avanza a la siguiente pantalla cortando cualquier audio en curso — usado
// por la exposición cronometrada de Presentación para saltar de tarjeta
// sin esperar a que termine el audio.
function avanzarAutomatico() {
  detenerAudioActual();
  if (estado.indice < estado.pantallas.length - 1) irAPantalla(estado.indice + 1);
}

// ---------- Render principal ----------
const contenedor = document.getElementById("contenedor");

function renderizar(pantalla) {
  contenedor.innerHTML = "";
  contenedor.className = `pantalla pantalla-${pantalla.tipo}`;

  switch (pantalla.tipo) {
    case "portada": return renderPortada();
    case "seleccionDia": return renderSeleccionDia();
    case "cierre": return renderCierre();
    case "presentacion": return renderPresentacion(pantalla.palabra);
    case "reconocimiento": return renderSeleccion(pantalla.palabra, "reconocimiento");
    case "asociacion": return renderSeleccion(pantalla.palabra, "asociacion");
    case "lectura": return renderSeleccion(pantalla.palabra, "lectura");
  }
}

// ---------- Portada ----------
function renderPortada() {
  contenedor.innerHTML = `
    <div class="portada-caja">
      <img class="imagen-portada" src="${CONFIG.imagenPortada}" alt="${CONFIG.titulo}">
      <h1>${CONFIG.titulo}</h1>
      <p class="frase-portada">${CONFIG.frasePortada}</p>
      <img class="foto-perfil" src="${PERFIL.foto}" alt="Foto de perfil" onclick="abrirLightbox()">
      <button class="btn-primario" id="btn-comenzar">Comenzar</button>
    </div>
    <div id="lightbox" class="lightbox oculto" onclick="cerrarLightbox()">
      <div class="lightbox-contenido">
        <img src="${PERFIL.foto}" alt="Foto de perfil">
        <p>${PERFIL.mensajeLightbox}</p>
        <p class="contacto">${PERFIL.contacto}</p>
      </div>
    </div>
  `;
  document.getElementById("btn-comenzar").addEventListener("click", avanzar);
  ocultarBarraInferior(true);
}

function abrirLightbox() {
  document.getElementById("lightbox").classList.remove("oculto");
}
function cerrarLightbox() {
  document.getElementById("lightbox").classList.add("oculto");
}

// ---------- Selector de día (acumulativo) ----------
function renderSeleccionDia() {
  ocultarBarraInferior(true);
  const botonesHTML = DIAS.map((d) => {
    if (d.pendiente) {
      return `<button class="dia-boton dia-pendiente" disabled>${d.nombre}<span class="dia-etiqueta">Próximamente</span></button>`;
    }
    const cantidadAcumulada = palabrasAcumuladasHasta(d.id).length;
    return `<button class="dia-boton" data-dia="${d.id}">${d.nombre}<span class="dia-etiqueta">${cantidadAcumulada} palabras</span></button>`;
  }).join("");

  contenedor.innerHTML = `
    <h1 class="titulo-chico">¿Qué día practicamos?</h1>
    <p class="subtitulo">Cada día suma las palabras de los días anteriores</p>
    <div class="grid-dias">${botonesHTML}</div>
  `;

  document.querySelectorAll(".dia-boton[data-dia]").forEach((btn) => {
    btn.addEventListener("click", () => iniciarDia(btn.dataset.dia));
  });
}

// ---------- Escena 1: Presentación (Doman puro) ----------
// Exposición breve y cronometrada: la palabra aparece, se escucha su
// pronunciación, y a los pocos segundos avanza sola — no hay botón ni
// espera del estudiante. Esto es intencional: el método pide reconocimiento
// visual instantáneo, no tiempo para "leer" analíticamente letra por letra.
function renderPresentacion(p) {
  ocultarBarraInferior(true); // no hay acción manual en esta pantalla
  contenedor.innerHTML = `<div class="palabra-doman">${p.palabra}</div>`;

  function exponerPalabraYAvanzar() {
    reproducirCola([p.audioPalabra]); // suena mientras se expone; no bloquea el timer
    setTimeout(avanzarAutomatico, CONFIG.tiempoExposicionMs);
  }

  if (!estado.instruccionesReproducidas.has("presentacion")) {
    estado.instruccionesReproducidas.add("presentacion");
    // La instrucción se escucha una sola vez, ANTES de empezar a cronometrar
    // tarjetas, para no restarle tiempo de exposición a la primera palabra.
    reproducirCola([INSTRUCCIONES.presentacion.audio], exponerPalabraYAvanzar);
  } else {
    exponerPalabraYAvanzar();
  }
}

// ---------- Escenas de selección (reconocimiento / asociación / lectura) ----------
function renderSeleccion(p, tipoEscena) {
  ocultarBarraInferior(true); // avanza sola en los dos casos; no hace falta botón
  let promptHTML, opciones, audiosPrevios;

  if (tipoEscena === "reconocimiento") {
    // Imagen -> elegir palabra (texto)
    promptHTML = `<img class="imagen-principal" src="${p.imagen}" alt="pregunta">`;
    const textos = mezclar([p.palabra, ...distractores(p, "palabra", 2)]);
    opciones = textos.map((t) => ({ valor: t, correcto: t === p.palabra, tipo: "texto" }));
    audiosPrevios = [p.audioPalabra];
  } else if (tipoEscena === "asociacion") {
    // Palabra -> elegir imagen
    promptHTML = `<div class="palabra-grande">${p.palabra}</div>`;
    const imgs = mezclar([p.imagen, ...distractores(p, "imagen", 2)]);
    opciones = imgs.map((img) => ({ valor: img, correcto: img === p.imagen, tipo: "imagen" }));
    audiosPrevios = [p.audioPalabra];
  } else {
    // Lectura: frase -> elegir la imagen de escena que corresponde
    promptHTML = `<div class="frase-grande">${p.frase}</div>`;
    const imgs = mezclar([p.imagenFrase, ...distractores(p, "imagenFrase", 2)]);
    opciones = imgs.map((img) => ({ valor: img, correcto: img === p.imagenFrase, tipo: "imagen" }));
    audiosPrevios = [p.audioFrase];
  }

  const opcionesHTML = opciones
    .map(
      (o, i) =>
        o.tipo === "texto"
          ? `<button class="opcion opcion-texto" data-i="${i}">${o.valor}</button>`
          : `<button class="opcion opcion-imagen" data-i="${i}"><img src="${o.valor}" alt="opción"></button>`
    )
    .join("");

  contenedor.innerHTML = `
    <div class="prompt">${promptHTML}</div>
    <div class="grid-opciones">${opcionesHTML}</div>
  `;

  let yaEvaluado = false;
  document.querySelectorAll(".opcion").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      if (yaEvaluado || estado.audioBloqueando) return; // single-attempt
      yaEvaluado = true;
      const correcto = opciones[i].correcto;
      marcarResultado(btn, correcto);
      document.querySelectorAll(".opcion").forEach((b) => (b.disabled = true));

      if (!correcto) {
        // Mostrar la correcta, reproducir su audio, y avanzar SOLA apenas
        // termina — el audio de refuerzo ya es el "tiempo para pensar".
        const idxCorrecta = opciones.findIndex((o) => o.correcto);
        document.querySelectorAll(".opcion")[idxCorrecta].classList.add("correcta");
        const audioCorrecto = tipoEscena === "lectura" ? p.audioFrase : p.audioPalabra;
        reproducirCola([audioCorrecto], avanzarAutomatico);
      } else {
        // Acierto: pausa breve para que se alcance a ver el refuerzo verde,
        // y avanza sola — no hace falta reflexionar sobre algo ya resuelto.
        setTimeout(avanzarAutomatico, CONFIG.pausaAciertoMs);
      }
    });
  });

  reproducirInstruccionYPalabra(tipoEscena, ...audiosPrevios);
}

// ---------- Instrucciones + audio de la palabra al entrar a la escena ----------
function reproducirInstruccionYPalabra(tipoEscena, ...audiosExtra) {
  const cola = [];
  if (!estado.instruccionesReproducidas.has(tipoEscena)) {
    cola.push(INSTRUCCIONES[tipoEscena].audio);
    estado.instruccionesReproducidas.add(tipoEscena);
  }
  cola.push(...audiosExtra);
  reproducirCola(cola);
}

// ---------- Puntaje (single-attempt) ----------
function marcarResultado(elemento, correcto) {
  elemento.classList.add(correcto ? "correcta" : "incorrecta");
  if (correcto) {
    estado.aciertos++;
    estado.puntos += CONFIG.puntosPorAcierto;
  } else {
    estado.errores++;
  }
}

// ---------- Cierre ----------
function renderCierre() {
  ocultarBarraInferior(true);
  const total = estado.aciertos + estado.errores;
  const porcentaje = total > 0 ? Math.round((estado.aciertos / total) * 100) : 0;
  const dia = DIAS.find((d) => d.id === estado.diaActual);

  contenedor.innerHTML = `
    <div class="cierre-caja">
      <h2>¡Terminaste ${dia ? dia.nombre : "la práctica"}!</h2>
      <p>✅ Aciertos: ${estado.aciertos}</p>
      <p>❌ Errores: ${estado.errores}</p>
      <p>📊 ${porcentaje}%</p>
      <p>⭐ ${estado.puntos} puntos</p>
      <img class="foto-perfil" src="${PERFIL.foto}" alt="Foto de perfil" onclick="abrirLightbox()">
      <div class="fila-botones-cierre">
        <button class="btn-secundario" id="btn-otro-dia">Elegir otro día</button>
        <button class="btn-primario" id="btn-reiniciar">Volver a jugar</button>
      </div>
    </div>
    <div id="lightbox" class="lightbox oculto" onclick="cerrarLightbox()">
      <div class="lightbox-contenido">
        <img src="${PERFIL.foto}" alt="Foto de perfil">
        <p>${PERFIL.mensajeLightbox}</p>
        <p class="contacto">${PERFIL.contacto}</p>
      </div>
    </div>
  `;
  document.getElementById("btn-reiniciar").addEventListener("click", () => iniciarDia(estado.diaActual));
  document.getElementById("btn-otro-dia").addEventListener("click", volverASelectorDia);
}

// ---------- Barra inferior (Siguiente) ----------
function ocultarBarraInferior(ocultar) {
  const barra = document.getElementById("barra-inferior");
  if (barra) barra.style.display = ocultar ? "none" : "flex";
}

// ---------- Corrección de altura real de ventana ----------
// En muchos navegadores (celulares, tablets, y algunos netbooks) 100vh incluye
// espacio de barras del navegador que no es visible, y eso empuja la barra
// inferior ("Siguiente") fuera de la pantalla. Se calcula la altura real con
// JS y se expone como variable CSS.
function ajustarAlturaReal() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}

// ---------- Inicio ----------
function iniciar() {
  ajustarAlturaReal();
  window.addEventListener("resize", ajustarAlturaReal);
  window.addEventListener("orientationchange", ajustarAlturaReal);
  estado.pantallas = construirPantallasBase();
  document.getElementById("btn-siguiente").addEventListener("click", avanzar);
  irAPantalla(0);
}

document.addEventListener("DOMContentLoaded", iniciar);
