// ==========================================================
// MOTOR - La Panadería de Mateo
// ==========================================================

let idxActual = 0;
let stats = { aciertos: 0, errores: 0 };
let audioActual = null;
let interaccionHabilitada = false; // true cuando terminó el audio de instrucción (permite tocar elementos)
let actividadResuelta = false;     // true cuando la actividad ya se resolvió Y terminó su audio de confirmación

const app = document.getElementById("app");

function iniciar() {
  idxActual = 0;
  stats = { aciertos: 0, errores: 0 };
  render();
}

function totalPantallas() {
  return DATOS.pantallas.length;
}

function irA(indice) {
  detenerAudio();
  idxActual = indice;
  render();
}

function siguiente() {
  if (idxActual < totalPantallas() - 1) {
    irA(idxActual + 1);
  }
}

// ---------------------------------------------------------
// AUDIO
// ---------------------------------------------------------
function detenerAudio() {
  if (audioActual) {
    audioActual.pause();
    audioActual = null;
  }
}

function reproducirAudio(src, onFin) {
  detenerAudio();
  if (!src) { if (onFin) onFin(); return; }
  const audio = new Audio(src);
  audioActual = audio;
  const terminar = () => { if (onFin) onFin(); };
  audio.addEventListener("ended", terminar);
  audio.addEventListener("error", terminar); // si falta el archivo, no traba la actividad
  audio.play().catch(terminar);
}

// Bloquea la interacción hasta que termine el audio de instrucción
function reproducirInstruccion(src, callback) {
  interaccionHabilitada = false;
  actualizarEstadoBoton();
  reproducirAudio(src, () => {
    interaccionHabilitada = true;
    actualizarEstadoBoton();
    if (callback) callback();
  });
}

// Baraja un array de opciones (strings) preservando cuál es la correcta.
// Devuelve { opciones: [...barajadas], correcta: nuevoIndice }
function barajarOpciones(opciones, indiceCorrecta) {
  const conFlag = opciones.map((texto, i) => ({ texto, esCorrecta: i === indiceCorrecta }));
  for (let i = conFlag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [conFlag[i], conFlag[j]] = [conFlag[j], conFlag[i]];
  }
  return {
    opciones: conFlag.map(o => o.texto),
    correcta: conFlag.findIndex(o => o.esCorrecta)
  };
}

// Baraja un array de opciones que ya traen su propio flag "correcta" (selección múltiple)
function barajarConFlagPropio(opciones) {
  const copia = opciones.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Reproduce una lista de audios en secuencia (ignora los que sean undefined/null)
function reproducirCadena(archivos, callbackFinal) {
  const lista = archivos.filter(Boolean);
  function siguiente(i) {
    if (i >= lista.length) { if (callbackFinal) callbackFinal(); return; }
    reproducirAudio(lista[i], () => siguiente(i + 1));
  }
  siguiente(0);
}

const AUDIO_VERIFICAR = "audio/nota_verificar.mp3";

function actualizarEstadoBoton() {
  const btn = document.getElementById("btn-siguiente");
  if (btn) btn.disabled = !(interaccionHabilitada && actividadResuelta);
}

// Marca la actividad como resuelta recién cuando termina el audio de confirmación
// (o de inmediato si esa pantalla no tiene audio de confirmación).
function resolverActividad(audioConfirmacion) {
  reproducirAudio(audioConfirmacion, () => {
    actividadResuelta = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// PROGRESO Y PUNTAJE
// ---------------------------------------------------------
function sumarPunto(correcto) {
  if (correcto) stats.aciertos++; else stats.errores++;
}

function barraProgreso() {
  const total = totalPantallas() - 1; // sin contar portada como "pantalla de contenido"
  const actual = idxActual;
  const pct = Math.round((idxActual / (totalPantallas() - 1)) * 100);
  return `
    <div class="progreso-wrap">
      <div class="progreso"><div class="progreso-barra" style="width:${pct}%"></div></div>
      <span class="progreso-contador">${actual}/${total}</span>
    </div>`;
}

function encabezadoPerfil() {
  return `
    <div class="perfil-mini" onclick="abrirLightbox()">
      <img src="img/perfil.jpg" alt="Profe Gustavo Aguilar" />
      <span>💻 Informática Educativa · Profe Gustavo Aguilar</span>
      <span class="perfil-mail">✉️ profegustaaguilar@gmail.com</span>
    </div>`;
}

function abrirLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.add("visible");
}
function cerrarLightbox() {
  document.getElementById("lightbox").classList.remove("visible");
}

// ---------------------------------------------------------
// RENDER PRINCIPAL
// ---------------------------------------------------------
function render() {
  const p = DATOS.pantallas[idxActual];
  interaccionHabilitada = false;
  actividadResuelta = false;

  switch (p.tipo) {
    case "portada": renderPortada(p); break;
    case "cierre": renderCierre(p); break;
    case "info": renderInfo(p); break;
    case "hotspot": renderHotspot(p); break;
    case "opcion": renderOpcion(p); break;
    case "seleccion-multiple": renderSeleccionMultiple(p); break;
    case "reloj": renderReloj(p); break;
    case "clasificar": renderClasificar(p); break;
    case "input-numero": renderInputNumero(p); break;
    case "ordenar": renderOrdenar(p); break;
    case "tabla": renderTabla(p); break;
    case "unir": renderUnir(p); break;
    case "armar-numero": renderArmarNumero(p); break;
    case "slider": renderSlider(p); break;
    case "trivia": renderTrivia(p); break;
    default: app.innerHTML = "<p>Pantalla no encontrada</p>";
  }
}

function marcoPantalla(contenidoHtml, imagen, zoomable, imagenAbajo) {
  const imgHtml = !imagen ? "" : zoomable
    ? `<div class="img-zoomable-wrap" onclick="abrirImagenZoom('${imagen}')">
         <img class="img-pantalla" src="${imagen}" alt="" />
         <span class="badge-zoom">🔍 Tocar para ampliar</span>
       </div>`
    : `<img class="img-pantalla" src="${imagen}" alt="" />`;
  const partes = imagenAbajo
    ? [`<div class="contenido">${contenidoHtml}</div>`, imgHtml]
    : [imgHtml, `<div class="contenido">${contenidoHtml}</div>`];
  return `
    ${barraProgreso()}
    <div class="pantalla">
      ${partes.join("")}
    </div>`;
}

function abrirImagenZoom(src) {
  const lb = document.getElementById("img-lightbox");
  document.getElementById("img-lightbox-contenido").src = src;
  lb.classList.add("visible");
}
function cerrarImagenZoom() {
  document.getElementById("img-lightbox").classList.remove("visible");
}

function botonSiguiente(texto = "Siguiente ➜") {
  return `<button id="btn-siguiente" class="btn btn-siguiente" disabled onclick="siguiente()">${texto}</button>`;
}

// ---------------------------------------------------------
// PORTADA / CIERRE
// ---------------------------------------------------------
function renderPortada(p) {
  app.innerHTML = `
    <div class="portada">
      <img src="img/portada.jpg" class="img-portada" alt="El Horno de Mateo" />
      <h1>${DATOS.titulo}</h1>
      <p>${DATOS.subtitulo}</p>
      ${encabezadoPerfil()}
      <button class="btn btn-comenzar" onclick="siguiente()">Comenzar 🥐</button>
      <p class="cita">${DATOS.cita}</p>
    </div>
    ${lightboxHtml()}`;
}

function renderCierre(p) {
  const total = stats.aciertos + stats.errores;
  const pct = total > 0 ? Math.round((stats.aciertos / total) * 100) : 0;
  const estrellas = pct >= 90 ? "⭐⭐⭐" : pct >= 60 ? "⭐⭐" : "⭐";
  app.innerHTML = `
    <div class="cierre">
      <img src="img/cierre.jpg" class="img-portada" alt="¡Gracias por jugar!" />
      <h1>¡Terminaste el desafío!</h1>
      <div class="resultados">
        <p>✅ Aciertos: <strong>${stats.aciertos}</strong></p>
        <p>❌ Errores: <strong>${stats.errores}</strong></p>
        <p>📊 Total: <strong>${pct}%</strong></p>
        <p class="estrellas">${estrellas}</p>
      </div>
      ${encabezadoPerfil()}
      <button class="btn btn-comenzar" onclick="iniciar()">Volver a jugar 🔄</button>
      <p class="cita">${DATOS.cita}</p>
    </div>
    ${lightboxHtml()}`;
}

function lightboxHtml() {
  return `
    <div id="lightbox" class="lightbox" onclick="cerrarLightbox()">
      <div class="lightbox-contenido">
        <img src="img/perfil.jpg" alt="Profe Gustavo Aguilar" />
        <p>Menos prisa, más vida 🧉🫂</p>
      </div>
    </div>`;
}

// ---------------------------------------------------------
// INFO (narrativa)
// ---------------------------------------------------------
function renderInfo(p) {
  app.innerHTML = marcoPantalla(`
    <p class="texto-narrativo">${p.texto}</p>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);
  reproducirInstruccion(p.audioIntro, () => {
    actividadResuelta = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// HOTSPOT
// ---------------------------------------------------------
function renderHotspot(p) {
  let resueltos = 0;
  const totalPuntos = p.puntos.length;

  const marcarResueltoVisual = (i) => {
    document.getElementById(`punto-${i}`).classList.add("resuelto");
  };

  app.innerHTML = `
    ${barraProgreso()}
    <div class="pantalla">
      <button class="btn-ampliar" onclick="abrirImagenZoom('${p.imagen}')">🔍 Ampliar imagen</button>
      <div class="hotspot-wrap">
        <img class="img-pantalla" src="${p.imagen}" alt="" />
        ${p.puntos.map((pt, i) => `
          <button id="punto-${i}" class="hotspot-punto" style="left:${pt.x}%; top:${pt.y}%"
            onclick="mostrarPreguntaHotspot(${i})">🔍</button>
        `).join("")}
      </div>
      <div class="contenido">
        <p class="pregunta">${p.pregunta}</p>
        <div id="hotspot-modal"></div>
        ${botonSiguiente()}
      </div>
    </div>`;

  const correctasBarajadas = {}; // guarda el índice correcto (post-barajado) de cada punto

  window.mostrarPreguntaHotspot = (i) => {
    if (!interaccionHabilitada) return;
    const pt = p.puntos[i];
    const barajado = barajarOpciones(pt.opciones, pt.correcta);
    correctasBarajadas[i] = barajado.correcta;
    const modal = document.getElementById("hotspot-modal");
    modal.innerHTML = `
      <div class="mini-pregunta">
        <p>${pt.pregunta}</p>
        <div id="hotspot-opciones-${i}" class="hotspot-opciones-oculto">
          ${barajado.opciones.map((op, j) => `
            <button class="btn-opcion" onclick="responderHotspot(${i}, ${j})">${op}</button>
          `).join("")}
        </div>
        <div id="hotspot-feedback"></div>
      </div>`;
    reproducirAudio(pt.audioPregunta, () => {
      const cont = document.getElementById(`hotspot-opciones-${i}`);
      if (cont) cont.classList.remove("hotspot-opciones-oculto");
    });
  };

  window.responderHotspot = (i, j) => {
    if (!interaccionHabilitada) return;
    const pt = p.puntos[i];
    const correcto = j === correctasBarajadas[i];
    sumarPunto(correcto);
    document.getElementById("hotspot-feedback").innerHTML =
      `<p class="${correcto ? "feedback-ok" : "feedback-no"}">${correcto ? "¡Correcto! 🎉" : "Intentá de nuevo la próxima 💪"}</p>`;
    if (correcto) {
      resueltos++;
      marcarResueltoVisual(i);
      if (resueltos === totalPuntos) {
        resolverActividad(pt.audioCorrecta);
      } else {
        reproducirAudio(pt.audioCorrecta);
      }
    }
  };

  reproducirInstruccion(p.audioIntro, () => {
    // recién ahora se pueden tocar los hotspots
  });
}

// ---------------------------------------------------------
// OPCION MULTIPLE (una sola correcta)
// ---------------------------------------------------------
function renderOpcion(p) {
  const { opciones, correcta } = barajarOpciones(p.opciones, p.correcta);

  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta}</p>
    <div id="opciones" class="opciones">
      ${opciones.map((op, i) => `<button class="btn-opcion" onclick="responderOpcion(${i})">${op}</button>`).join("")}
    </div>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  let respondido = false;
  window.responderOpcion = (i) => {
    if (!interaccionHabilitada || respondido) return;
    respondido = true;
    const correcto = i === correcta;
    sumarPunto(correcto);
    document.querySelectorAll(".btn-opcion").forEach((b, idx) => {
      b.disabled = true;
      if (idx === correcta) b.classList.add("correcta");
      else if (idx === i) b.classList.add("incorrecta");
    });
    document.getElementById("feedback").innerHTML =
      `<p class="${correcto ? "feedback-ok" : "feedback-no"}">${correcto ? "¡Muy bien! 🎉" : "Esa no era... ¡fijate cuál se marcó en verde!"}</p>`;
    resolverActividad(correcto ? p.audioCorrecta : p.audioIncorrecta);
  };

  reproducirInstruccion(p.audioIntro);
}

// ---------------------------------------------------------
// SELECCION MULTIPLE (varias correctas)
// ---------------------------------------------------------
function renderSeleccionMultiple(p) {
  const opciones = barajarConFlagPropio(p.opciones);

  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta} <span class="nota-verificar">Luego, pulsá el botón Verificar.</span></p>
    <div id="opciones" class="opciones">
      ${opciones.map((op, i) => `
        <label class="check-opcion">
          <input type="checkbox" id="chk-${i}" />
          <span>${op.texto}</span>
        </label>`).join("")}
    </div>
    <button class="btn" onclick="verificarSeleccionMultiple()">Verificar</button>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  let verificado = false;
  window.verificarSeleccionMultiple = () => {
    if (!interaccionHabilitada || verificado) return;
    verificado = true;
    let todoCorrecto = true;
    opciones.forEach((op, i) => {
      const marcado = document.getElementById(`chk-${i}`).checked;
      if (marcado !== op.correcta) todoCorrecto = false;
      document.getElementById(`chk-${i}`).disabled = true;
    });
    sumarPunto(todoCorrecto);
    document.getElementById("feedback").innerHTML =
      `<p class="${todoCorrecto ? "feedback-ok" : "feedback-no"}">${todoCorrecto ? "¡Perfecto! 🎉" : "Casi... revisá cuáles cálculos daban 7+7+7"}</p>`;
    resolverActividad(p.audioCorrecta);
  };

  interaccionHabilitada = false;
  actualizarEstadoBoton();
  reproducirCadena([p.audioIntro, AUDIO_VERIFICAR], () => {
    interaccionHabilitada = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// RELOJ
// ---------------------------------------------------------
function renderReloj(p) {
  const horas = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutos = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta} <span class="nota-verificar">Luego, pulsá el botón Verificar.</span></p>
    <div class="reloj-armar">
      <select id="sel-hora">${horas.map(h => `<option value="${h}">${h}</option>`).join("")}</select>
      <span>:</span>
      <select id="sel-min">${minutos.map(m => `<option value="${m}">${String(m).padStart(2, "0")}</option>`).join("")}</select>
      <button class="btn" onclick="verificarReloj()">Verificar</button>
    </div>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  let verificado = false;
  window.verificarReloj = () => {
    if (!interaccionHabilitada || verificado) return;
    const h = parseInt(document.getElementById("sel-hora").value, 10);
    const m = parseInt(document.getElementById("sel-min").value, 10);
    const correcto = h === p.horaObjetivo.h && m === p.horaObjetivo.m;
    if (correcto) verificado = true;
    sumarPunto(correcto);
    document.getElementById("feedback").innerHTML =
      `<p class="${correcto ? "feedback-ok" : "feedback-no"}">${correcto ? "¡Exacto! 🎉" : "Todavía no... probá de nuevo"}</p>`;
    if (correcto) {
      resolverActividad(p.audioCorrecta);
    } else {
      reproducirAudio(p.audioIncorrecta);
    }
  };

  interaccionHabilitada = false;
  actualizarEstadoBoton();
  reproducirCadena([p.audioIntro, AUDIO_VERIFICAR], () => {
    interaccionHabilitada = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// CLASIFICAR (tocar ficha, tocar categoría)
// ---------------------------------------------------------
function renderClasificar(p) {
  let seleccionActual = null;
  let clasificadas = 0;

  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta}</p>
    <div id="fichas" class="fichas">
      ${p.fichas.map((f, i) => `<button class="ficha" id="ficha-${i}" onclick="seleccionarFicha(${i})">${f.texto}</button>`).join("")}
    </div>
    <div class="categorias">
      ${p.categorias.map((c, i) => `<div class="categoria" id="cat-${i}" onclick="asignarCategoria(${i})">${c.nombre}<div class="cat-lista" id="cat-lista-${i}"></div></div>`).join("")}
    </div>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  window.seleccionarFicha = (i) => {
    if (!interaccionHabilitada) return;
    const btn = document.getElementById(`ficha-${i}`);
    if (btn.disabled) return;
    document.querySelectorAll(".ficha").forEach(f => f.classList.remove("seleccionada"));
    btn.classList.add("seleccionada");
    seleccionActual = i;
    reproducirAudio(p.fichas[i].audio);
  };

  window.asignarCategoria = (catIdx) => {
    if (seleccionActual === null || !interaccionHabilitada) return;
    const idxFicha = seleccionActual;
    const ficha = p.fichas[idxFicha];
    const correcto = ficha.categoria === catIdx;
    sumarPunto(correcto);
    if (!correcto) {
      const catEl = document.getElementById(`cat-${catIdx}`);
      catEl.classList.add("shake");
      setTimeout(() => catEl.classList.remove("shake"), 400);
      return;
    }
    const fichaEl = document.getElementById(`ficha-${idxFicha}`);
    fichaEl.disabled = true;
    fichaEl.classList.add("usada");
    document.getElementById(`cat-lista-${catIdx}`).innerHTML += `<span>${ficha.texto}</span>`;
    clasificadas++;
    seleccionActual = null;
    document.querySelectorAll(".ficha").forEach(f => f.classList.remove("seleccionada"));

    if (clasificadas === p.fichas.length) {
      document.getElementById("feedback").innerHTML = `<p class="feedback-ok">¡Actividad completa! 🎉</p>`;
      resolverActividad(p.categorias[catIdx].audioOk);
    } else {
      reproducirAudio(p.categorias[catIdx].audioOk);
    }
  };

  reproducirInstruccion(p.audioIntro);
}

// ---------------------------------------------------------
// INPUT NUMERICO
// ---------------------------------------------------------
function renderInputNumero(p) {
  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta} <span class="nota-verificar">Luego, pulsá el botón Verificar.</span></p>
    ${p.pista ? `<p class="pista">💡 ${p.pista}</p>` : ""}
    <div class="input-numero-wrap">
      <input type="text" inputmode="decimal" id="input-resp" placeholder="Tu respuesta" />
      <button class="btn" onclick="verificarInputNumero()">Verificar</button>
    </div>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  let acertado = false;
  window.verificarInputNumero = () => {
    if (!interaccionHabilitada || acertado) return;
    const raw = document.getElementById("input-resp").value.replace(",", ".").trim();
    const val = parseFloat(raw);
    const correcto = !isNaN(val) && Math.abs(val - p.respuesta) < 0.01;
    sumarPunto(correcto);
    document.getElementById("feedback").innerHTML =
      `<p class="${correcto ? "feedback-ok" : "feedback-no"}">${correcto ? "¡Correcto! 🎉" : "No es esa... ¡probá otra vez!"}</p>`;
    if (correcto) {
      acertado = true;
      resolverActividad(p.audioCorrecta);
    } else {
      reproducirAudio(p.audioIncorrecta);
    }
  };

  interaccionHabilitada = false;
  actualizarEstadoBoton();
  reproducirCadena([p.audioIntro, p.audioPista, AUDIO_VERIFICAR], () => {
    interaccionHabilitada = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// ORDENAR (click en orden)
// ---------------------------------------------------------
function renderOrdenar(p) {
  let posicionActual = 0;

  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta}</p>
    <div id="disponibles" class="fichas">
      ${p.elementos.map((e, i) => `<button class="ficha" id="orden-${i}" onclick="elegirOrden(${i})">${e.texto}</button>`).join("")}
    </div>
    <p>Tu orden:</p>
    <div id="secuencia" class="secuencia"></div>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  window.elegirOrden = (i) => {
    if (!interaccionHabilitada) return;
    const btn = document.getElementById(`orden-${i}`);
    if (btn.disabled) return;

    const esperado = p.ordenCorrecto[posicionActual];
    if (i !== esperado) {
      sumarPunto(false);
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 400);
      return;
    }

    sumarPunto(true);
    btn.disabled = true;
    btn.classList.add("usada");
    document.getElementById("secuencia").innerHTML += `<span class="chip">${p.elementos[i].texto}</span> `;
    posicionActual++;

    if (posicionActual === p.ordenCorrecto.length) {
      document.getElementById("feedback").innerHTML = `<p class="feedback-ok">¡Orden correcto! 🎉</p>`;
      resolverActividad(p.audioCorrecta);
    } else {
      reproducirAudio(p.elementos[i].audio);
    }
  };

  reproducirInstruccion(p.audioIntro);
}

// ---------------------------------------------------------
// TABLA (completar celdas o filas)
// ---------------------------------------------------------
function renderTabla(p) {
  let html = "";
  if (p.celdas) {
    html = `<div class="tabla-grid">
      ${p.celdas.map((c, i) => c.dado
        ? `<div class="celda dada">${c.valor}</div>`
        : `<input type="number" class="celda-input" id="celda-${i}" />`
      ).join("")}
    </div>`;
  } else if (p.filas) {
    html = `<div class="tabla-filas">
      <div class="fila-header"><span>${p.etiquetaFila}</span><span>Cantidad de bolsitas</span></div>
      ${p.filas.map((f, i) => `
        <div class="fila">
          <span>${f.dado}</span>
          ${f.esInput ? `<input type="number" class="celda-input" id="fila-${i}" />` : `<span class="celda dada">${f.valor}</span>`}
        </div>`).join("")}
    </div>`;
  }

  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta} <span class="nota-verificar">Luego, pulsá el botón Verificar.</span></p>
    ${html}
    <button class="btn" onclick="verificarTabla()">Verificar</button>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  window.verificarTabla = () => {
    if (!interaccionHabilitada) return;
    let correcto = true;
    if (p.celdas) {
      p.celdas.forEach((c, i) => {
        if (!c.dado) {
          const input = document.getElementById(`celda-${i}`);
          if (parseInt(input.value, 10) !== c.valor) { correcto = false; input.classList.add("error"); }
          else input.classList.add("ok");
        }
      });
    } else if (p.filas) {
      p.filas.forEach((f, i) => {
        if (f.esInput) {
          const input = document.getElementById(`fila-${i}`);
          if (parseInt(input.value, 10) !== f.valor) { correcto = false; input.classList.add("error"); }
          else input.classList.add("ok");
        }
      });
    }
    sumarPunto(correcto);
    document.getElementById("feedback").innerHTML =
      `<p class="${correcto ? "feedback-ok" : "feedback-no"}">${correcto ? "¡Todo correcto! 🎉" : "Hay algún valor para revisar (marcado en rojo)"}</p>`;
    resolverActividad(correcto ? p.audioCorrecta : null);
  };

  interaccionHabilitada = false;
  actualizarEstadoBoton();
  reproducirCadena([p.audioIntro, AUDIO_VERIFICAR], () => {
    interaccionHabilitada = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// UNIR (click-click)
// ---------------------------------------------------------
function renderUnir(p) {
  const izq = p.pares.map((x, i) => ({ texto: x.izq, i }));
  const der = p.pares.map((x, i) => ({ texto: x.der, i })).sort(() => Math.random() - 0.5);
  let seleccionIzq = null;
  let resueltos = 0;

  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta}</p>
    <div class="unir-wrap">
      <div class="col-izq">${izq.map(x => `<button class="btn-unir" id="izq-${x.i}" onclick="clickIzq(${x.i})">${x.texto}</button>`).join("")}</div>
      <div class="col-der">${der.map(x => `<button class="btn-unir" id="der-${x.i}" onclick="clickDer(${x.i})">${x.texto}</button>`).join("")}</div>
    </div>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  window.clickIzq = (i) => {
    if (!interaccionHabilitada) return;
    if (document.getElementById(`izq-${i}`).classList.contains("unida")) return;
    document.querySelectorAll(".col-izq .btn-unir").forEach(b => b.classList.remove("seleccionada"));
    document.getElementById(`izq-${i}`).classList.add("seleccionada");
    seleccionIzq = i;
  };

  window.clickDer = (i) => {
    if (seleccionIzq === null || !interaccionHabilitada) return;
    if (document.getElementById(`der-${i}`).classList.contains("unida")) return;
    const correcto = seleccionIzq === i;
    sumarPunto(correcto);
    if (correcto) {
      document.getElementById(`izq-${seleccionIzq}`).classList.add("unida");
      document.getElementById(`der-${i}`).classList.add("unida");
      resueltos++;
      if (resueltos === p.pares.length) {
        document.getElementById("feedback").innerHTML = `<p class="feedback-ok">¡Uniste todos los pares! 🎉</p>`;
        resolverActividad(p.audioCorrecta);
      }
    } else {
      const derEl = document.getElementById(`der-${i}`);
      derEl.classList.add("shake");
      setTimeout(() => derEl.classList.remove("shake"), 400);
    }
    document.querySelectorAll(".col-izq .btn-unir").forEach(b => b.classList.remove("seleccionada"));
    seleccionIzq = null;
  };

  reproducirInstruccion(p.audioIntro);
}

// ---------------------------------------------------------
// ARMAR NUMERO (sumar fichas hasta el objetivo)
// ---------------------------------------------------------
function renderArmarNumero(p) {
  let total = 0;
  const usadas = new Set();

  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta} <span class="nota-verificar">Cuando termines, pulsá el botón Verificar.</span></p>
    <p class="objetivo">Objetivo: <strong>${p.objetivo}</strong></p>
    <p class="total-actual">Total actual: <span id="total-num">0</span></p>
    <div id="fichas-num" class="fichas">
      ${p.fichas.map((f, i) => `<button class="ficha" id="fnum-${i}" onclick="tocarFicha(${i})">${f}</button>`).join("")}
    </div>
    <button class="btn" onclick="verificarArmarNumero()">Verificar</button>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  window.tocarFicha = (i) => {
    if (!interaccionHabilitada || usadas.has(i)) return;
    const btn = document.getElementById(`fnum-${i}`);
    const nuevoTotal = total + p.fichas[i];

    if (nuevoTotal > p.objetivo) {
      // Se pasaría del objetivo: se rechaza, no se suma, cuenta error
      sumarPunto(false);
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 400);
      return;
    }

    sumarPunto(true);
    usadas.add(i);
    total = nuevoTotal;
    btn.classList.add("usada");
    btn.disabled = true;
    document.getElementById("total-num").textContent = total;

    if (total === p.objetivo) {
      document.getElementById("feedback").innerHTML = `<p class="feedback-ok">¡Formaste el número exacto! 🎉</p>`;
      resolverActividad(p.audioCorrecta);
    }
  };

  // Salida de emergencia: por si con las fichas que quedan disponibles ya no se puede
  // llegar exacto al objetivo (aunque nunca se haya tocado una ficha que "se pasara").
  window.verificarArmarNumero = () => {
    if (!interaccionHabilitada || actividadResuelta) return;
    if (total === p.objetivo) {
      document.getElementById("feedback").innerHTML = `<p class="feedback-ok">¡Formaste el número exacto! 🎉</p>`;
      resolverActividad(p.audioCorrecta);
      return;
    }
    sumarPunto(false);
    document.getElementById("feedback").innerHTML =
      `<p class="feedback-no">Te quedaste en ${total}. El objetivo era ${p.objetivo}. ¡Igual podés seguir! 💪</p>`;
    resolverActividad(p.audioNoExacto);
  };

  interaccionHabilitada = false;
  actualizarEstadoBoton();
  reproducirCadena([p.audioIntro, AUDIO_VERIFICAR], () => {
    interaccionHabilitada = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// SLIDER (jarra medidora)
// ---------------------------------------------------------
function renderSlider(p) {
  app.innerHTML = marcoPantalla(`
    <p class="pregunta">${p.pregunta} <span class="nota-verificar">Luego, pulsá el botón Verificar.</span></p>
    <div class="jarra-wrap">
      <div class="jarra-indicador-grande" id="jarra-indicador-grande">0 ml</div>
      <div class="jarra">
        <div id="jarra-nivel" class="jarra-nivel" style="height:0%"></div>
      </div>
      <input type="range" id="slider-ml" min="0" max="${p.maxMl}" value="0" step="10"
        oninput="moverSlider(this.value)" />
      <p><span id="slider-valor">0</span> ml</p>
    </div>
    <button class="btn" onclick="verificarSlider()">Verificar</button>
    <div id="feedback"></div>
    ${botonSiguiente()}
  `, p.imagen, p.zoomable, p.imagenAbajo);

  window.moverSlider = (val) => {
    document.getElementById("slider-valor").textContent = val;
    document.getElementById("jarra-indicador-grande").textContent = val + " ml";
    const pct = (val / p.maxMl) * 100;
    document.getElementById("jarra-nivel").style.height = pct + "%";
  };

  let acertado = false;
  window.verificarSlider = () => {
    if (!interaccionHabilitada || acertado) return;
    const val = parseInt(document.getElementById("slider-ml").value, 10);
    const correcto = Math.abs(val - p.objetivoMl) <= p.tolerancia;
    sumarPunto(correcto);
    document.getElementById("feedback").innerHTML =
      `<p class="${correcto ? "feedback-ok" : "feedback-no"}">${correcto ? "¡Justo! 🎉" : "Todavía no llegaste al nivel correcto"}</p>`;
    if (correcto) {
      acertado = true;
      resolverActividad(p.audioCorrecta);
    } else {
      reproducirAudio(p.audioIncorrecta);
    }
  };

  interaccionHabilitada = false;
  actualizarEstadoBoton();
  reproducirCadena([p.audioIntro, AUDIO_VERIFICAR], () => {
    interaccionHabilitada = true;
    actualizarEstadoBoton();
  });
}

// ---------------------------------------------------------
// TRIVIA (varias preguntas en una pantalla)
// ---------------------------------------------------------
function renderTrivia(p) {
  let idxPregunta = 0;
  let preguntaHabilitada = false;
  let opcionesBarajadas = [];
  let correctaBarajada = -1;

  function mostrarPregunta() {
    preguntaHabilitada = false;
    const preg = p.preguntas[idxPregunta];
    const imagenPreg = preg.imagen || p.imagen;
    const barajado = barajarOpciones(preg.opciones, preg.correcta);
    opcionesBarajadas = barajado.opciones;
    correctaBarajada = barajado.correcta;

    document.getElementById("trivia-imagen").innerHTML =
      `<img class="img-pantalla" src="${imagenPreg}" alt="" />`;
    document.getElementById("trivia-cuerpo").innerHTML = `
      <p class="pregunta">Pregunta ${idxPregunta + 1} de ${p.preguntas.length}</p>
      <p class="pregunta">${preg.pregunta}</p>
      <div id="trivia-opciones" class="opciones trivia-opciones-oculto">
        ${opcionesBarajadas.map((op, i) => `<button class="btn-opcion" onclick="responderTrivia(${i})">${op}</button>`).join("")}
      </div>
      <div id="trivia-feedback"></div>`;

    reproducirAudio(preg.audioPregunta, () => {
      preguntaHabilitada = true;
      const cont = document.getElementById("trivia-opciones");
      if (cont) cont.classList.remove("trivia-opciones-oculto");
    });
  }

  app.innerHTML = `
    ${barraProgreso()}
    <div class="pantalla">
      <div id="trivia-imagen"></div>
      <div class="contenido">
        <div id="trivia-cuerpo"></div>
        ${p.esFinal ? "" : botonSiguiente()}
      </div>
    </div>`;

  window.responderTrivia = (i) => {
    if (!interaccionHabilitada || !preguntaHabilitada) return;
    preguntaHabilitada = false;
    const preg = p.preguntas[idxPregunta];
    const correcto = i === correctaBarajada;
    sumarPunto(correcto);
    document.querySelectorAll("#trivia-opciones .btn-opcion").forEach((b, idx) => {
      b.disabled = true;
      if (idx === correctaBarajada) b.classList.add("correcta");
      else if (idx === i) b.classList.add("incorrecta");
    });
    document.getElementById("trivia-feedback").innerHTML =
      `<p class="${correcto ? "feedback-ok" : "feedback-no"}">${correcto ? "¡Correcto! 🎉" : "Esa no era"}</p>`;

    reproducirAudio(correcto ? preg.audioCorrecta : preg.audioIncorrecta, () => {
      idxPregunta++;
      if (idxPregunta < p.preguntas.length) {
        mostrarPregunta();
      } else if (p.esFinal) {
        // Trivia final: pasa directo al cierre, sin pantalla intermedia
        siguiente();
      } else {
        actividadResuelta = true;
        interaccionHabilitada = true;
        actualizarEstadoBoton();
        document.getElementById("trivia-cuerpo").innerHTML =
          `<p class="feedback-ok">¡Completaste todas las preguntas! 🎉</p>`;
      }
    });
  };

  reproducirInstruccion(p.audioIntro, () => mostrarPregunta());
}

// ---------------------------------------------------------
// INICIO
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", iniciar);
