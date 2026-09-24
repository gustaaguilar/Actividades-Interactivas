/* ============================================================
   Motor genérico — Las plantas y sus partes
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

/* ---------------------- ESTADO GLOBAL ---------------------- */
let indicePantalla = 0;
let aciertos = 0;
let errores = 0;
let puntos = 0;
const evaluados = new Set(); // ids únicos ya evaluados (primer intento)

/* ---------------------- UTILIDADES -------------------------- */
function barajar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esOpcionCorta(texto) {
  return texto.length <= 10;
}

function evaluar(idUnico, esCorrecto, puntosPorAcierto = 10) {
  if (evaluados.has(idUnico)) return false;
  evaluados.add(idUnico);
  if (esCorrecto) {
    aciertos++;
    puntos += puntosPorAcierto;
  } else {
    errores++;
  }
  actualizarMarcador();
  return true;
}

function actualizarMarcador() {
  document.getElementById("marcador-aciertos").textContent = "✅ " + aciertos;
  document.getElementById("marcador-errores").textContent = "❌ " + errores;
  document.getElementById("marcador-puntos").textContent = "⭐ " + puntos;
}

/* ---------------------- COLA DE AUDIO ------------------------ */
let audioGen = 0;
let audioActual = null;

function detenerAudio() {
  audioGen++;
  if (audioActual) {
    try { audioActual.pause(); } catch (e) {}
    audioActual = null;
  }
}

function bloquearInteraccion(bloquear) {
  const cont = document.getElementById("pantalla-contenedor");
  if (bloquear) cont.classList.add("audio-bloqueando");
  else cont.classList.remove("audio-bloqueando");
  const btn = document.getElementById("btn-accion");
  // Mientras suena un audio, el botón se deshabilita siempre. Pero al
  // terminar NO se rehabilita automáticamente acá: eso quedaría pisando
  // la lógica propia de cada pantalla (ej. chequearFin), que sabe si la
  // actividad realmente se completó. Cada pantalla habilita el botón por
  // su cuenta cuando corresponde.
  if (btn && !btn.dataset.ignorarAudio && bloquear) {
    btn.disabled = true;
  }
}

// items: array de rutas de audio (strings) o null (se saltea)
function reproducirSecuencia(items, onComplete) {
  // Corta cualquier audio que estuviera sonando todavía. Sin esto, dos
  // llamadas seguidas (ej.: el audio de un ítem + el de confirmación,
  // disparados uno justo después del otro) se superponen: la cola solo
  // cancelaba el aviso de "terminé", pero el archivo anterior seguía
  // sonando de fondo.
  detenerAudio();
  const miGen = ++audioGen;
  const lista = items.filter(Boolean);
  let i = 0;
  bloquearInteraccion(true);

  function siguiente() {
    if (miGen !== audioGen) return; // se canceló por navegación
    if (i >= lista.length) {
      bloquearInteraccion(false);
      if (onComplete) onComplete();
      return;
    }
    const src = lista[i++];
    const a = new Audio("audio/" + src);
    audioActual = a;
    const avanzar = () => siguiente();
    a.addEventListener("ended", avanzar, { once: true });
    a.addEventListener("error", avanzar, { once: true });
    a.play().catch(avanzar);
  }
  siguiente();
}

function reproducirUnico(src, onComplete) {
  reproducirSecuencia([src], onComplete);
}

// Chicharra corta de error, sintetizada (no necesita un archivo de audio).
function reproducirSonidoError() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.28);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Si el navegador no soporta Web Audio, seguimos sin sonido de error.
  }
}

/* ---------------------- LIGHTBOX FOTO -------------------------- */
let lightboxZoom = false;

function abrirLightbox() {
  const img = document.getElementById("lightbox-img");
  img.src = DATOS.meta.fotoPerfil;
  img.style.transform = "scale(1)";
  document.getElementById("lightbox-frase").textContent = DATOS.meta.fraseLightbox;
  document.getElementById("lightbox-overlay").classList.remove("oculto");
  lightboxZoom = false;
}

function toggleZoomLightbox(e) {
  const img = document.getElementById("lightbox-img");
  if (!lightboxZoom) {
    const rect = img.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${xPct}% ${yPct}%`;
    img.style.transform = "scale(2.2)";
    lightboxZoom = true;
  } else {
    img.style.transform = "scale(1)";
    lightboxZoom = false;
  }
}

function cerrarLightbox() {
  document.getElementById("lightbox-overlay").classList.add("oculto");
  const img = document.getElementById("lightbox-img");
  img.style.transform = "scale(1)";
  lightboxZoom = false;
}

/* ---------------------- BOTÓN DE ACCIÓN -------------------------- */
function crearBotonAccion(texto, onClick, opts = {}) {
  const btn = document.createElement("button");
  btn.id = "btn-accion";
  btn.className = "btn-accion";
  btn.textContent = texto;
  if (opts.ignorarAudio) {
    btn.dataset.ignorarAudio = "1";
  } else {
    btn.disabled = true; // se habilita cuando termina el audio de instrucción
  }
  btn.addEventListener("click", onClick);
  return btn;
}

/* ---------------------- BLOQUE FOTO + FIRMA -------------------------- */
function crearBloqueFirma() {
  const wrap = document.createElement("div");
  wrap.className = "bloque-firma";
  const foto = document.createElement("img");
  foto.src = DATOS.meta.fotoPerfil;
  foto.className = "foto-perfil";
  foto.alt = "Profe Gustavo Aguilar";
  foto.addEventListener("click", abrirLightbox);
  const texto = document.createElement("div");
  texto.className = "texto-firma";
  texto.innerHTML = `${DATOS.meta.textoFirma}<br>✉️ ${DATOS.meta.mail}`;
  wrap.appendChild(foto);
  wrap.appendChild(texto);
  return wrap;
}

/* ---------------------- NAVEGACIÓN GENERAL -------------------------- */
function mostrarPantallaActual() {
  detenerAudio();
  const nombre = DATOS.ordenPantallas[indicePantalla];
  const pantalla = DATOS[nombre];
  renderPantalla(pantalla);
}

function avanzar() {
  if (indicePantalla < DATOS.ordenPantallas.length - 1) {
    indicePantalla++;
    mostrarPantallaActual();
  }
}

function reiniciarJuego() {
  aciertos = 0;
  errores = 0;
  puntos = 0;
  evaluados.clear();
  indicePantalla = 0;
  actualizarMarcador();
  mostrarPantallaActual();
}

/* ---------------------- DISPATCHER DE RENDER -------------------------- */
function renderPantalla(p) {
  const cont = document.getElementById("pantalla-contenedor");
  cont.innerHTML = "";
  cont.className = "pantalla pantalla-" + p.tipo;
  // narracionAnimada y hotspot ya muestran su propia imagen en tamaño real
  // (recuadro con <img>, no recortada). Si además ponemos la misma imagen
  // de fondo de pantalla completa (recortada con "cover"), se ve dos veces
  // y se confunde (ej.: "dos macetas"). Para esos tipos dejamos fondo blanco.
  const tiposConImagenPropia = ["narracionAnimada", "hotspot"];
  if (p.imagenFondo && !tiposConImagenPropia.includes(p.tipo)) {
    cont.style.backgroundImage = `url("${p.imagenFondo}")`;
    cont.style.backgroundColor = "";
  } else {
    cont.style.backgroundImage = "";
    cont.style.backgroundColor = tiposConImagenPropia.includes(p.tipo) ? "#ffffff" : "";
  }

  const renderers = {
    portada: renderPortada,
    video: renderVideo,
    narracionAnimada: renderNarracionAnimada,
    clasificar: renderClasificar,
    hotspot: renderHotspot,
    asociar: renderAsociar,
    trivia: renderTrivia,
    verdaderoFalso: renderVerdaderoFalso,
    cierre: renderCierre
  };

  const fn = renderers[p.tipo];
  if (fn) fn(p, cont);
}

/* ---------------------- PORTADA -------------------------- */
function renderPortada(p, cont) {
  const titulo = document.createElement("h1");
  titulo.className = "titulo-portada";
  titulo.textContent = p.titulo;
  cont.appendChild(titulo);

  const subtitulo = document.createElement("p");
  subtitulo.className = "subtitulo-portada";
  subtitulo.textContent = DATOS.meta.subtitulo;
  cont.appendChild(subtitulo);

  const filaInferior = document.createElement("div");
  filaInferior.className = "fila-inferior-portada";
  filaInferior.appendChild(crearBloqueFirma());

  const btn = crearBotonAccion(p.textoBoton || "▶️ Comenzar", avanzar);
  filaInferior.appendChild(btn);
  cont.appendChild(filaInferior);

  reproducirSecuencia([p.audio], () => {
    btn.disabled = false;
  });
}

/* ---------------------- API DE YOUTUBE (saber cuándo termina el video) ----
   Carga el script oficial una sola vez (aunque se vuelva a esta pantalla
   varias veces en modo revisión) y avisa por callback cuando está listo
   para crear el reproductor. */
let ytApiCargando = false;
let ytApiCallbacksPendientes = [];
function conApiDeYoutubeLista(callback) {
  if (window.YT && window.YT.Player) {
    callback();
    return;
  }
  ytApiCallbacksPendientes.push(callback);
  if (ytApiCargando) return;
  ytApiCargando = true;
  const anterior = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    if (anterior) anterior();
    ytApiCallbacksPendientes.forEach((cb) => cb());
    ytApiCallbacksPendientes = [];
  };
  const script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  // Si por algún motivo no carga (sin conexión al dominio de YouTube), no
  // dejamos a los chicos trabados: se habilita "Continuar" igual.
  script.onerror = () => {
    const b = document.getElementById("btn-accion");
    if (b) b.disabled = false;
  };
  document.head.appendChild(script);
}

/* ---------------------- VIDEO -------------------------- */
function renderVideo(p, cont) {
  const titulo = document.createElement("h2");
  titulo.className = "titulo-pantalla";
  titulo.textContent = "Antes de empezar…";
  cont.appendChild(titulo);

  const texto = document.createElement("p");
  texto.className = "texto-instruccion";
  texto.textContent = p.texto;
  cont.appendChild(texto);

  // Marco de video con la miniatura real de YouTube y el botón rojo de play,
  // visible dentro de la misma pantalla (no en un modal aparte). Al tocarlo,
  // la miniatura se reemplaza por el reproductor, que se reproduce ahí mismo.
  const marco = document.createElement("div");
  marco.className = "video-marco";
  marco.innerHTML = `
    <img class="video-miniatura" src="https://img.youtube.com/vi/${p.youtubeId}/hqdefault.jpg" alt="Miniatura del video">
    <button class="video-play-boton" aria-label="Reproducir video">▶</button>
  `;
  const idJugador = "video-jugador-yt";
  const reproducirAca = () => {
    marco.innerHTML = `<div id="${idJugador}"></div>`;
    conApiDeYoutubeLista(() => {
      new YT.Player(idJugador, {
        videoId: p.youtubeId,
        host: "https://www.youtube-nocookie.com",
        playerVars: { autoplay: 1, rel: 0 },
        events: {
          onReady: (e) => {
            e.target.getIframe().className = "video-iframe";
          },
          onStateChange: (e) => {
            // Recién cuando el video termina se habilita "Continuar".
            if (e.data === YT.PlayerState.ENDED) {
              const b = document.getElementById("btn-accion");
              if (b) b.disabled = false;
            }
          }
        }
      });
    });
  };
  marco.querySelector(".video-play-boton").addEventListener("click", reproducirAca);
  marco.querySelector(".video-miniatura").addEventListener("click", reproducirAca);
  cont.appendChild(marco);

  // El botón Continuar queda deshabilitado hasta que termine el video.
  const btn = crearBotonAccion(p.textoContinuar || "Continuar", avanzar);
  cont.appendChild(btn);

  reproducirSecuencia([p.audio], null);
}

/* ---------------------- NARRACIÓN ANIMADA -------------------------- */
function renderNarracionAnimada(p, cont) {
  const titulo = document.createElement("h2");
  titulo.className = "titulo-pantalla";
  titulo.textContent = p.tituloPantalla;
  cont.appendChild(titulo);

  const escena = document.createElement("div");
  escena.className = "escena-narracion";
  cont.appendChild(escena);

  const imgEscena = document.createElement("img");
  imgEscena.src = p.imagenFondo;
  imgEscena.alt = p.tituloPantalla || "Escena";
  escena.appendChild(imgEscena);

  const etiquetaActual = document.createElement("div");
  etiquetaActual.className = "etiqueta-paso oculto";
  escena.appendChild(etiquetaActual);

  const puntero = document.createElement("div");
  puntero.className = "puntero-narracion oculto";
  puntero.textContent = "👉";
  escena.appendChild(puntero);

  const btn = crearBotonAccion("Siguiente", avanzar);
  cont.appendChild(btn);

  function mostrarPaso(i) {
    if (i >= p.pasos.length) {
      reproducirSecuencia([p.audioCierre], () => {
        etiquetaActual.classList.add("oculto");
        puntero.classList.add("oculto");
        btn.disabled = false;
      });
      return;
    }
    const paso = p.pasos[i];
    puntero.style.left = paso.posicion.xPercent + "%";
    puntero.style.top = paso.posicion.yPercent + "%";
    puntero.classList.remove("oculto");
    puntero.classList.add("titileo");
    etiquetaActual.textContent = paso.etiqueta;
    etiquetaActual.style.left = paso.posicion.xPercent + "%";
    etiquetaActual.style.top = paso.posicion.yPercent + "%";
    etiquetaActual.classList.remove("oculto");
    reproducirSecuencia([paso.audio], () => mostrarPaso(i + 1));
  }

  reproducirSecuencia([p.audio], () => mostrarPaso(0));
}

/* ---------------------- CLASIFICAR -------------------------- */
function renderClasificar(p, cont) {
  const texto = document.createElement("p");
  texto.className = "texto-instruccion";
  texto.textContent = p.texto;
  cont.appendChild(texto);

  reproducirSecuencia([p.audio], null);

  const zonaCategorias = document.createElement("div");
  zonaCategorias.className = "categorias-clasificar";
  p.categorias.forEach((cat) => {
    const catEl = document.createElement("div");
    catEl.className = "categoria-drop" + (cat.colorClase ? " " + cat.colorClase : "");
    catEl.dataset.categoria = cat.id;
    catEl.innerHTML =
      (cat.icono ? `<img src="${cat.icono}" class="categoria-icono" alt="">` : "") +
      `<div class="categoria-etiqueta">${cat.etiqueta}</div><div class="categoria-items"></div>`;
    zonaCategorias.appendChild(catEl);
  });
  cont.appendChild(zonaCategorias);

  const bandeja = document.createElement("div");
  bandeja.className = "bandeja-items";
  cont.appendChild(bandeja);

  const btn = crearBotonAccion("Siguiente", avanzar);
  cont.appendChild(btn);

  let seleccionado = null;
  const items = barajar(p.items);

  items.forEach((item) => {
    const el = document.createElement("button");
    el.className = "item-clasificar";
    el.dataset.id = item.id;
    el.innerHTML = `<img src="${item.imagen}" alt="${item.texto}"><span>${item.texto}</span>`;
    el.addEventListener("click", () => {
      if (el.classList.contains("resuelto")) return;
      reproducirUnico(item.audio, null);
      document.querySelectorAll(".item-clasificar").forEach((n) => n.classList.remove("seleccionado"));
      el.classList.add("seleccionado");
      seleccionado = { item, el };
    });
    bandeja.appendChild(el);
  });

  function chequearFin() {
    if (bandeja.querySelectorAll(".item-clasificar:not(.resuelto)").length === 0) {
      btn.disabled = false;
    }
  }

  zonaCategorias.querySelectorAll(".categoria-drop").forEach((catEl) => {
    catEl.addEventListener("click", () => {
      if (!seleccionado) return;
      const { item, el } = seleccionado;
      const idUnico = p.id + "_" + item.id;
      const esCorrecto = item.categoriaCorrecta === catEl.dataset.categoria;
      evaluar(idUnico, esCorrecto);
      el.classList.add("resuelto", esCorrecto ? "correcto" : "incorrecto");
      el.disabled = true;
      // Si se equivocó, la tarjeta igual termina en la categoría correcta
      // (el error ya quedó registrado en el marcador) para no dejarla
      // "confirmada" en el lugar equivocado.
      const catDestino = esCorrecto
        ? catEl
        : zonaCategorias.querySelector(`.categoria-drop[data-categoria="${item.categoriaCorrecta}"]`);
      catDestino.querySelector(".categoria-items").appendChild(el);
      seleccionado = null;
      const audioAReproducir = esCorrecto ? item.audioConfirmacion : item.audioIncorrecta || item.audioConfirmacion;
      reproducirUnico(audioAReproducir, chequearFin);
    });
  });
}

/* ---------------------- HOTSPOT -------------------------- */
function renderHotspot(p, cont) {
  const texto = document.createElement("p");
  texto.className = "texto-instruccion";
  texto.textContent = p.texto;
  cont.appendChild(texto);

  const wrap = document.createElement("div");
  wrap.className = "hotspot-imagen-wrap";
  const img = document.createElement("img");
  img.src = p.imagenFondo;
  img.className = "hotspot-imagen";
  img.alt = "Planta";
  wrap.appendChild(img);
  cont.appendChild(wrap);

  p.zonas.forEach((zona) => {
    const btn = document.createElement("button");
    btn.className = "zona-hotspot";
    btn.dataset.id = zona.id;
    btn.style.left = zona.posicion.xPercent + "%";
    btn.style.top = zona.posicion.yPercent + "%";
    btn.addEventListener("click", () => manejarTapZona(zona));
    wrap.appendChild(btn);
  });

  const btn = crearBotonAccion("Siguiente", avanzar);
  cont.appendChild(btn);

  let indiceZona = 0;

  function pedirZona() {
    if (indiceZona >= p.zonas.length) {
      btn.disabled = false;
      return;
    }
    const zona = p.zonas[indiceZona];
    reproducirUnico(zona.audioNombre, null);
  }

  function manejarTapZona(zonaTocada) {
    if (indiceZona >= p.zonas.length) return;
    const zonaEsperada = p.zonas[indiceZona];
    const idUnico = p.id + "_" + zonaEsperada.id;
    const esCorrecto = zonaTocada.id === zonaEsperada.id;
    if (!esCorrecto) {
      evaluar(idUnico, false);
      return; // deja que sigan intentando encontrar la correcta
    }
    evaluar(idUnico, true);
    const btnZona = wrap.querySelector(`.zona-hotspot[data-id="${zonaEsperada.id}"]`);
    btnZona.classList.add("resuelto");
    reproducirUnico(zonaEsperada.audioConfirmacion, () => {
      indiceZona++;
      pedirZona();
    });
  }

  reproducirSecuencia([p.audio], pedirZona);
}

/* ---------------------- ASOCIAR -------------------------- */
// Un color distinto por cada par resuelto (5 pares: raíz/tallo/hoja/flor/fruto).
const COLORES_PAR = ["par-color-0", "par-color-1", "par-color-2", "par-color-3", "par-color-4"];

function renderAsociar(p, cont) {
  const texto = document.createElement("p");
  texto.className = "texto-instruccion";
  texto.textContent = p.texto;
  cont.appendChild(texto);

  reproducirSecuencia([p.audio], null);

  const grilla = document.createElement("div");
  grilla.className = "grilla-asociar";
  const colIzq = document.createElement("div");
  colIzq.className = "columna-asociar columna-asociar-izq";
  const colDer = document.createElement("div");
  colDer.className = "columna-asociar columna-asociar-der";
  grilla.appendChild(colIzq);
  grilla.appendChild(colDer);
  cont.appendChild(grilla);

  const btn = crearBotonAccion("Siguiente", avanzar);
  cont.appendChild(btn);

  const paresIzq = p.pares;
  const paresDer = barajar(p.pares);
  let seleccionIzq = null;

  paresIzq.forEach((par) => {
    const el = document.createElement("button");
    el.className = "item-asociar item-asociar-izq";
    el.dataset.id = par.id;
    el.innerHTML = `<img src="${par.izquierda.imagen}" alt="${par.izquierda.texto}"><span>${par.izquierda.texto}</span>`;
    el.addEventListener("click", () => {
      if (el.classList.contains("resuelto")) return;
      reproducirUnico(par.izquierda.audio, null);
      colIzq.querySelectorAll(".item-asociar").forEach((n) => n.classList.remove("seleccionado"));
      el.classList.add("seleccionado");
      seleccionIzq = par;
    });
    colIzq.appendChild(el);
  });

  paresDer.forEach((par) => {
    const el = document.createElement("button");
    el.className = "item-asociar item-asociar-der";
    el.dataset.id = par.id;
    el.innerHTML = `<span>${par.derecha.texto}</span>`;
    el.addEventListener("click", () => {
      if (el.classList.contains("resuelto")) return;
      reproducirUnico(par.derecha.audio, null);
      if (!seleccionIzq) return;
      const idUnico = p.id + "_" + seleccionIzq.id;
      const esCorrecto = seleccionIzq.id === par.id;
      const elIzq = colIzq.querySelector(`.item-asociar-izq[data-id="${seleccionIzq.id}"]`);
      if (esCorrecto) {
        evaluar(idUnico, true);
        // Cada par resuelto queda con su propio color (no todos en verde),
        // para poder distinguir de un vistazo qué palabra va con qué
        // función una vez que se van resolviendo.
        const indiceColor = p.pares.findIndex((x) => x.id === par.id) % COLORES_PAR.length;
        el.classList.add("resuelto", "correcto", `par-color-${indiceColor}`);
        elIzq.classList.add("resuelto", "correcto", `par-color-${indiceColor}`);
        reproducirUnico(seleccionIzq.audioConfirmacion, chequearFinAsociar);
        seleccionIzq = null;
      } else {
        evaluar(idUnico, false);
        el.classList.add("shake");
        setTimeout(() => el.classList.remove("shake"), 400);
      }
    });
    colDer.appendChild(el);
  });

  function chequearFinAsociar() {
    if (colIzq.querySelectorAll(".item-asociar:not(.resuelto)").length === 0) {
      btn.disabled = false;
    }
  }
}

/* ---------------------- TRIVIA (opción múltiple) --------------------------
   Sin botón "Verificar": tocar la opción correcta avanza sola a la
   siguiente pregunta (o a la pantalla siguiente si era la última).
   Tocar una opción incorrecta suena un error y pide reintentar, sin
   avanzar — pero solo el primer toque de cada pregunta cuenta para el
   puntaje (mismo patrón de evaluación única que el resto del sitio). */
function renderTrivia(p, cont) {
  const contenedorPregunta = document.createElement("div");
  contenedorPregunta.className = "contenedor-pregunta";
  cont.appendChild(contenedorPregunta);

  let indice = 0;

  function mostrarPregunta() {
    contenedorPregunta.innerHTML = "";
    if (indice >= p.preguntas.length) {
      avanzar();
      return;
    }
    const preg = p.preguntas[indice];
    const idUnico = p.id + "_" + preg.id;

    const img = document.createElement("img");
    img.src = preg.imagen;
    img.className = "imagen-pregunta";
    contenedorPregunta.appendChild(img);

    const texto = document.createElement("p");
    texto.className = "texto-pregunta";
    texto.textContent = preg.texto;
    contenedorPregunta.appendChild(texto);

    const opcionesEl = document.createElement("div");
    const opciones = barajar(preg.opciones);
    const cortas = opciones.every((o) => esOpcionCorta(o.texto));
    opcionesEl.className = "opciones " + (cortas ? "grid-2" : "lista-1");
    contenedorPregunta.appendChild(opcionesEl);

    opciones.forEach((op) => {
      const elOp = document.createElement("button");
      elOp.className = "opcion";
      elOp.textContent = op.texto;
      elOp.addEventListener("click", () => manejarRespuesta(op, elOp));
      opcionesEl.appendChild(elOp);
    });

    function manejarRespuesta(op, elOp) {
      const esCorrecto = !!op.correcta;
      if (esCorrecto) {
        evaluar(idUnico, true);
        opcionesEl.querySelectorAll(".opcion").forEach((n) => (n.disabled = true));
        elOp.classList.add("correcto");
        reproducirUnico(preg.audioCorrecta, () => {
          indice++;
          mostrarPregunta();
        });
      } else {
        evaluar(idUnico, false); // solo cuenta la primera vez que se contesta esta pregunta
        elOp.classList.add("incorrecto", "shake");
        reproducirSonidoError();
        reproducirUnico(p.audioIntentarDeNuevo, () => {
          elOp.classList.remove("incorrecto", "shake");
        });
      }
    }

    reproducirUnico(preg.audio, null);
  }

  reproducirSecuencia([p.audioInstruccion], mostrarPregunta);
}

/* ---------------------- VERDADERO O FALSO -------------------------- */
function renderVerdaderoFalso(p, cont) {
  // Sin botón "Siguiente" fijo aparte (igual que en trivia): el único
  // botón para avanzar es el que aparece tras responder cada afirmación,
  // y al llegar a la última pasa directo a la pantalla siguiente. Antes
  // convivían dos botones "Siguiente" (uno fijo abajo, otro por pregunta)
  // y confundía.
  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-vof";
  cont.appendChild(contenedor);

  let indice = 0;

  function mostrarAfirmacion() {
    contenedor.innerHTML = "";
    if (indice >= p.afirmaciones.length) {
      avanzar();
      return;
    }
    const af = p.afirmaciones[indice];
    const idUnico = p.id + "_" + af.id;

    const texto = document.createElement("p");
    texto.className = "texto-afirmacion";
    texto.textContent = af.texto;
    contenedor.appendChild(texto);

    const botones = document.createElement("div");
    botones.className = "botones-vof";
    contenedor.appendChild(botones);

    const btnV = document.createElement("button");
    btnV.className = "btn-vof";
    btnV.textContent = "✅ Verdadero";
    const btnF = document.createElement("button");
    btnF.className = "btn-vof";
    btnF.textContent = "❌ Falso";
    botones.appendChild(btnV);
    botones.appendChild(btnF);

    function responder(respuestaVerdadero) {
      btnV.disabled = true;
      btnF.disabled = true;
      const esCorrecto = respuestaVerdadero === af.esVerdadero;
      evaluar(idUnico, esCorrecto);
      (respuestaVerdadero ? btnV : btnF).classList.add(esCorrecto ? "correcto" : "incorrecto");
      reproducirUnico(af.audioConfirmacion, () => {
        const btnSiguiente = document.createElement("button");
        btnSiguiente.className = "btn-siguiente-pregunta";
        btnSiguiente.textContent = indice < p.afirmaciones.length - 1 ? "Siguiente" : "Continuar";
        btnSiguiente.addEventListener("click", () => {
          indice++;
          mostrarAfirmacion();
        });
        contenedor.appendChild(btnSiguiente);
      });
    }

    btnV.addEventListener("click", () => responder(true));
    btnF.addEventListener("click", () => responder(false));

    reproducirUnico(af.audio, null);
  }

  reproducirSecuencia([p.audioInstruccion], mostrarAfirmacion);
}

/* ---------------------- CIERRE -------------------------- */
function renderCierre(p, cont) {
  const titulo = document.createElement("h1");
  titulo.className = "titulo-cierre";
  titulo.textContent = "¡Terminaste!";
  cont.appendChild(titulo);

  const resumen = document.createElement("div");
  resumen.className = "resumen-cierre";
  const total = aciertos + errores;
  const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 0;
  resumen.innerHTML = `
    <div>✅ Aciertos: ${aciertos}</div>
    <div>❌ Errores: ${errores}</div>
    <div>📊 ${porcentaje}%</div>
    <div>⭐ Puntos: ${puntos}</div>
  `;
  cont.appendChild(resumen);

  const filaInferior = document.createElement("div");
  filaInferior.className = "fila-inferior-portada";
  filaInferior.appendChild(crearBloqueFirma());

  const btn = crearBotonAccion(p.textoBotonVolver || "🔄 Volver a jugar", reiniciarJuego, { ignorarAudio: true });
  filaInferior.appendChild(btn);
  cont.appendChild(filaInferior);

  reproducirUnico(p.audio, null);
}

/* ---------------------- INICIALIZACIÓN -------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lightbox-cerrar").addEventListener("click", cerrarLightbox);
  document.getElementById("lightbox-img").addEventListener("click", toggleZoomLightbox);

  actualizarMarcador();
  mostrarPantallaActual();
});
