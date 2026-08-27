// ============================================================
// EL ESPEJO AFRICANO - Contextualización histórico-geográfica
// motor.js - Motor de renderizado e interactividad (v2)
// ============================================================

var estado = {
  pantallaActual: 0,
  audioActual: null,
  bloqueado: false,
  puntaje: { aciertos: 0, errores: 0 },
  completado: {}
};

var TIPOS_CON_ACTIVIDAD = ["flipcards", "ordenar", "mapa", "zonasInfo", "clasificar", "clasificar2col", "vf", "asociar", "multiple", "completar", "sopa", "narracion", "narracionAnimada", "lineaTiempo"];

function marcarCompleta(idx) {
  if (!estado.completado[idx]) {
    estado.completado[idx] = true;
  }
  actualizarBotonesNav();
}

// ------------------------------------------------------------
// COLA DE AUDIO (sin superposición nunca)
// ------------------------------------------------------------
var colaAudio = [];
var audioReproduciendo = false;

function limpiarColaAudio() {
  colaAudio = [];
  audioReproduciendo = false;
  if (estado.audioActual) {
    estado.audioActual.pause();
    estado.audioActual.currentTime = 0;
  }
  estado.bloqueado = false;
}

function encolarAudio(src, callback) {
  if (!src) {
    if (callback) callback();
    return;
  }
  colaAudio.push({ src: src, callback: callback });
  procesarColaAudio();
}

function procesarColaAudio() {
  if (audioReproduciendo || colaAudio.length === 0) return;
  audioReproduciendo = true;
  var item = colaAudio.shift();
  var audio = new Audio(item.src);
  estado.audioActual = audio;

  function terminar() {
    audioReproduciendo = false;
    if (item.callback) item.callback();
    procesarColaAudio();
  }

  audio.onended = terminar;
  audio.onerror = terminar;
  audio.play().catch(terminar);
}

// Reproducción manual (botón altavoz): no interrumpe, se encola igual,
// pero primero se limpia lo pendiente para que suene ya.
function reproducirManual(src) {
  colaAudio = [];
  if (estado.audioActual) {
    estado.audioActual.pause();
    estado.audioActual.currentTime = 0;
  }
  audioReproduciendo = false;
  encolarAudio(src);
}

// Reproduce "Correcto" y luego el audio del ítem, en secuencia.
function encolarAcierto(srcItem, callback) {
  if (DATOS.meta && DATOS.meta.audioCorrecto) {
    encolarAudio(DATOS.meta.audioCorrecto);
  }
  encolarAudio(srcItem, callback);
}

// ------------------------------------------------------------
// PUNTAJE GLOBAL
// ------------------------------------------------------------
function registrarAcierto() { estado.puntaje.aciertos++; }
function registrarError() { estado.puntaje.errores++; }
function reiniciarPuntaje() { estado.puntaje = { aciertos: 0, errores: 0 }; }

// ------------------------------------------------------------
// INICIO Y NAVEGACIÓN
// ------------------------------------------------------------
function iniciarApp() {
  renderPantalla(0);
}

function irAPantalla(idx) {
  if (idx < 0 || idx >= DATOS.pantallas.length) return;
  limpiarColaAudio();
  estado.pantallaActual = idx;
  renderPantalla(idx);
  var cont = document.getElementById("pantalla-contenedor");
  if (cont) cont.scrollTop = 0;
  window.scrollTo(0, 0);
}

function siguiente() { irAPantalla(estado.pantallaActual + 1); }
function anterior() { irAPantalla(estado.pantallaActual - 1); }

function reiniciarPaquete() {
  reiniciarPuntaje();
  estado.completado = {};
  irAPantalla(0);
}

// ------------------------------------------------------------
// LIGHTBOX FOTO DEL PROFE (con zoom táctil/click)
// ------------------------------------------------------------
function abrirLightbox() {
  var lb = document.getElementById("lightbox");
  if (lb) lb.classList.add("activo");
}
function cerrarLightbox() {
  var lb = document.getElementById("lightbox");
  var img = document.getElementById("lightbox-img");
  if (lb) lb.classList.remove("activo");
  // Al cerrar, siempre reseteamos el zoom para la próxima apertura
  if (img) {
    img.classList.remove("zoom");
    img.style.transformOrigin = "50% 50%";
  }
}
(function () {
  var btnCerrar = document.getElementById("lightbox-cerrar");
  if (btnCerrar) btnCerrar.onclick = cerrarLightbox;

  var img = document.getElementById("lightbox-img");
  if (img) {
    img.onclick = function (ev) {
      if (img.classList.contains("zoom")) {
        img.classList.remove("zoom");
        img.style.transformOrigin = "50% 50%";
      } else {
        // Centra el zoom en el punto exacto donde tocaron/clickearon la foto
        var rect = img.getBoundingClientRect();
        var x = ((ev.clientX - rect.left) / rect.width) * 100;
        var y = ((ev.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = x + "% " + y + "%";
        img.classList.add("zoom");
      }
    };
  }
})();

// ------------------------------------------------------------
// UTILIDADES
// ------------------------------------------------------------
function crear(tag, className, html) {
  var el = document.createElement(tag);
  if (className) el.className = className;
  if (html !== undefined) el.innerHTML = html;
  return el;
}

function barajar(arrOriginal) {
  var arr = arrOriginal.slice();
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

function actualizarBarraProgreso() {
  var total = DATOS.pantallas.length;
  var pct = Math.round(((estado.pantallaActual + 1) / total) * 100);
  var barra = document.getElementById("barra-progreso-interna");
  if (barra) barra.style.width = pct + "%";
  var texto = document.getElementById("texto-progreso");
  if (texto) texto.textContent = "Pantalla " + (estado.pantallaActual + 1) + " de " + total;
}

// ------------------------------------------------------------
// CABECERA COMÚN (título + botón audio + consigna)
// ------------------------------------------------------------
function crearCabecera(datos) {
  var header = crear("div", "cabecera-pantalla");
  header.appendChild(crear("h2", "titulo-pantalla", datos.titulo));

  if (datos.consigna) {
    var fila = crear("div", "fila-consigna");
    fila.appendChild(crear("p", "texto-consigna", datos.consigna));
    if (datos.audio) {
      var btn = crear("button", "btn-audio-consigna", "🔊");
      btn.setAttribute("aria-label", "Escuchar consigna");
      btn.onclick = function () { reproducirManual(datos.audio); };
      fila.appendChild(btn);
    }
    header.appendChild(fila);
  }
  return header;
}

// ------------------------------------------------------------
// RENDER PRINCIPAL
// ------------------------------------------------------------
function renderPantalla(idx) {
  var datos = DATOS.pantallas[idx];
  var cont = document.getElementById("pantalla-contenedor");
  cont.innerHTML = "";
  cont.className = "pantalla tipo-" + datos.tipo;

  switch (datos.tipo) {
    case "portada": renderPortada(datos, cont); break;
    case "narracion": renderNarracion(datos, cont); break;
    case "narracionAnimada": renderNarracionAnimada(datos, cont); break;
    case "flipcards": renderFlipcards(datos, cont); break;
    case "ordenar": renderOrdenar(datos, cont); break;
    case "mapa": renderMapa(datos, cont); break;
    case "zonasInfo": renderZonasInfo(datos, cont); break;
    case "lineaTiempo": renderLineaTiempo(datos, cont); break;
    case "clasificar": renderClasificar(datos, cont); break;
    case "clasificar2col": renderClasificar2col(datos, cont); break;
    case "vf": renderVF(datos, cont); break;
    case "asociar": renderAsociar(datos, cont); break;
    case "multiple": renderMultiple(datos, cont); break;
    case "completar": renderCompletar(datos, cont); break;
    case "sopa": renderSopa(datos, cont); break;
    case "cierre": renderCierre(datos, cont); break;
  }

  actualizarBarraProgreso();
  actualizarBotonesNav();
}

function actualizarBotonesNav() {
  var btnAnt = document.getElementById("btn-anterior");
  var btnSig = document.getElementById("btn-siguiente");
  if (btnAnt) btnAnt.disabled = (estado.pantallaActual === 0);
  if (btnSig) {
    btnSig.textContent = (estado.pantallaActual === DATOS.pantallas.length - 1) ? "Finalizar ✓" : "Siguiente →";
    var datosActual = DATOS.pantallas[estado.pantallaActual];
    var requiereActividad = TIPOS_CON_ACTIVIDAD.indexOf(datosActual.tipo) !== -1;
    btnSig.disabled = requiereActividad && !estado.completado[estado.pantallaActual];
  }
}

// ------------------------------------------------------------
// 1. PORTADA
// ------------------------------------------------------------
function renderPortada(datos, cont) {
  var wrap = crear("div", "portada-wrap");

  var img = crear("img", "portada-imagen");
  img.src = datos.imagen;
  img.alt = "El Espejo Africano";
  wrap.appendChild(img);

  var textos = crear("div", "portada-textos");
  textos.appendChild(crear("h1", "portada-titulo", datos.titulo));
  textos.appendChild(crear("p", "portada-subtitulo", datos.subtitulo));

  var fila = crear("div", "fila-comenzar");
  var btn = crear("button", "btn-comenzar", "Comenzar");
  btn.onclick = function () { siguiente(); };
  fila.appendChild(btn);

  if (DATOS.meta && DATOS.meta.foto) {
    var foto = crear("img", "foto-thumb");
    foto.id = "foto-thumb";
    foto.src = DATOS.meta.foto;
    foto.alt = "Profe";
    foto.onclick = abrirLightbox;
    fila.appendChild(foto);
  }
  textos.appendChild(fila);

  if (DATOS.meta && DATOS.meta.firma) {
    textos.appendChild(crear("p", "firma", DATOS.meta.firma));
  }
  if (DATOS.meta && DATOS.meta.mail) {
    textos.appendChild(crear("p", "mail-contacto", DATOS.meta.mail));
  }

  wrap.appendChild(textos);
  cont.appendChild(wrap);
}

// ------------------------------------------------------------
// 2. NARRACIÓN SIMPLE (autoplay)
// ------------------------------------------------------------
function renderNarracion(datos, cont) {
  var wrap = crear("div", "narracion-wrap");
  wrap.appendChild(crear("h2", "titulo-pantalla", datos.titulo));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    wrap.appendChild(img);
  }

  if (datos.audio) {
    var btn = crear("button", "btn-audio-consigna btn-audio-narracion", "🔊 Escuchar de nuevo");
    btn.onclick = function () { reproducirManual(datos.audio); };
    wrap.appendChild(btn);
  }

  wrap.appendChild(crear("div", "texto-narracion", datos.texto));
  cont.appendChild(wrap);

  // "Siguiente" queda bloqueado hasta que termine el audio de la pantalla
  // (si no hay audio, se marca completa de inmediato).
  if (datos.audio) {
    encolarAudio(datos.audio, function () { marcarCompleta(estado.pantallaActual); });
  } else {
    marcarCompleta(estado.pantallaActual);
  }
}

// ------------------------------------------------------------
// 2b. NARRACIÓN ANIMADA (mano indicadora sincronizada con el audio,
//     recorre distintas zonas de una escena/maqueta HTML)
// ------------------------------------------------------------
function renderNarracionAnimada(datos, cont) {
  var wrap = crear("div", "narracion-animada-wrap");
  wrap.appendChild(crear("h2", "titulo-pantalla", datos.titulo));

  if (datos.imagen) {
    var imgDecor = crear("img", "imagen-actividad imagen-narracion-animada");
    imgDecor.src = datos.imagen;
    imgDecor.alt = datos.titulo;
    wrap.appendChild(imgDecor);
  }

  var escena = crear("div", "escena-animada");
  escena.id = "escena-animada";
  escena.innerHTML = datos.escenaHtml;

  var mano = crear("div", "mano-indicadora oculto", "👉");
  mano.id = "mano-indicadora";
  var etiqueta = crear("div", "etiqueta-paso oculto");
  etiqueta.id = "etiqueta-paso";
  escena.appendChild(mano);
  escena.appendChild(etiqueta);

  wrap.appendChild(escena);
  wrap.appendChild(crear("p", "texto-narracion texto-narracion-animada", datos.textoCompleto));
  cont.appendChild(wrap);

  function mostrarPaso(i) {
    if (i >= datos.pasos.length) {
      marcarCompleta(estado.pantallaActual);
      return;
    }
    var paso = datos.pasos[i];
    var manoEl = document.getElementById("mano-indicadora");
    var etiquetaEl = document.getElementById("etiqueta-paso");
    var escenaEl = document.getElementById("escena-animada");

    if (paso.targetId) {
      var el = document.getElementById(paso.targetId);
      if (el && manoEl && escenaEl) {
        var rEl = el.getBoundingClientRect();
        var rEscena = escenaEl.getBoundingClientRect();
        var xCentro = rEl.left - rEscena.left + rEl.width / 2;
        var yCentro = rEl.top - rEscena.top + rEl.height / 2;
        var xMano = rEl.left - rEscena.left - 10;
        manoEl.style.left = xMano + "px";
        manoEl.style.top = yCentro + "px";
        manoEl.classList.remove("oculto");
        if (etiquetaEl) {
          etiquetaEl.textContent = paso.texto || "";
          etiquetaEl.style.left = xCentro + "px";
          etiquetaEl.style.top = (rEl.top - rEscena.top - 34) + "px";
          etiquetaEl.classList.toggle("oculto", !paso.texto);
        }
        document.querySelectorAll(".zona-noticia").forEach(function (z) { z.classList.remove("zona-activa"); });
        el.classList.add("zona-activa");
      }
    } else {
      if (manoEl) manoEl.classList.add("oculto");
      if (etiquetaEl) etiquetaEl.classList.add("oculto");
    }

    encolarAudio(paso.audio, function () { mostrarPaso(i + 1); });
  }

  mostrarPaso(0);
}

// ------------------------------------------------------------
// ZONAS INFO (números sobre una imagen real; al tocarlos se abre
// una tarjeta con nombre + descripción; bloquea "Siguiente" hasta
// que se tocaron todos)
// ------------------------------------------------------------
function renderZonasInfo(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  var centro = crear("div", "zonas-info-centro");
  var wrap = crear("div", "zonas-info-wrap");
  var img = crear("img", "zonas-info-imagen");
  img.src = datos.imagen;
  img.alt = datos.titulo;
  wrap.appendChild(img);
  centro.appendChild(wrap);

  var panel = crear("div", "mapa-panel-info", "<p class='mapa-placeholder'>Tocá un número para ver la información. Tenés que tocarlos todos.</p>");
  var visitados = {};

  datos.zonas.forEach(function (z, i) {
    var marcador = crear("button", "mapa-marcador zona-info-marcador", z.numero);
    marcador.style.left = z.x + "%";
    marcador.style.top = z.y + "%";
    marcador.onclick = function () {
      document.querySelectorAll(".zona-info-marcador").forEach(function (m) { m.classList.remove("activo"); });
      marcador.classList.add("activo", "visitado");
      panel.innerHTML = "<h3>" + z.nombre + "</h3><p>" + z.descripcion + "</p>";
      panel.classList.remove("visible");
      void panel.offsetWidth; // reinicia la animación de titileo en cada toque
      panel.classList.add("visible");
      reproducirManual(z.audio);
      visitados[i] = true;
      if (Object.keys(visitados).length === datos.zonas.length) {
        marcarCompleta(estado.pantallaActual);
      }
    };
    wrap.appendChild(marcador);
  });

  cont.appendChild(centro);
  cont.appendChild(panel);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 18. CIERRE (con puntaje y jugar de nuevo)
// ------------------------------------------------------------
function renderCierre(datos, cont) {
  var wrap = crear("div", "cierre-wrap");

  var img = crear("img", "cierre-imagen");
  img.src = datos.imagen;
  img.alt = "Cierre";
  wrap.appendChild(img);

  var textos = crear("div", "cierre-textos");
  textos.appendChild(crear("h2", "titulo-pantalla", datos.titulo));

  if (datos.audio) {
    var btn = crear("button", "btn-audio-consigna btn-audio-narracion", "🔊 Escuchar de nuevo");
    btn.onclick = function () { reproducirManual(datos.audio); };
    textos.appendChild(btn);
  }

  textos.appendChild(crear("div", "texto-narracion", datos.texto));

  // ---- Resumen de puntaje ----
  var totalResp = estado.puntaje.aciertos + estado.puntaje.errores;
  var pct = totalResp > 0 ? Math.round((estado.puntaje.aciertos / totalResp) * 100) : 0;
  var resumen = crear("div", "resumen-puntaje");
  resumen.innerHTML =
    "<h3>Tu resultado</h3>" +
    "<div class='resumen-fila'><span class='resumen-etiqueta'>Aciertos:</span><span class='resumen-valor ok'>" + estado.puntaje.aciertos + "</span></div>" +
    "<div class='resumen-fila'><span class='resumen-etiqueta'>Errores:</span><span class='resumen-valor mal'>" + estado.puntaje.errores + "</span></div>" +
    "<div class='resumen-fila'><span class='resumen-etiqueta'>Porcentaje de aciertos:</span><span class='resumen-valor pct'>" + pct + "%</span></div>";
  textos.appendChild(resumen);

  var btnReiniciar = crear("button", "btn-comenzar btn-jugar-de-nuevo", "🔄 Jugar de nuevo");
  btnReiniciar.onclick = function () { reiniciarPaquete(); };
  textos.appendChild(btnReiniciar);

  if (DATOS.meta && DATOS.meta.foto) {
    var fila = crear("div", "fila-comenzar");
    var foto = crear("img", "foto-thumb");
    foto.id = "foto-thumb-cierre";
    foto.src = DATOS.meta.foto;
    foto.alt = "Profe";
    foto.onclick = abrirLightbox;
    fila.appendChild(foto);
    textos.appendChild(fila);
  }
  if (DATOS.meta && DATOS.meta.firma) {
    textos.appendChild(crear("p", "firma", DATOS.meta.firma));
  }
  if (DATOS.meta && DATOS.meta.mail) {
    textos.appendChild(crear("p", "mail-contacto", DATOS.meta.mail));
  }

  wrap.appendChild(textos);
  cont.appendChild(wrap);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 3 / 15. FLIPCARDS (autoplay consigna + audio por tarjeta + bloqueo secuencial)
// ------------------------------------------------------------
function renderFlipcards(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    cont.appendChild(img);
  }

  var grid = crear("div", "grid-flipcards");
  var escuchadas = {};
  datos.tarjetas.forEach(function (t, idx) {
    var card = crear("div", "flipcard");
    var inner = crear("div", "flipcard-inner");
    var frente = crear("div", "flipcard-frente", t.frente);
    var reversoHtml = "";
    var reversoClase = "flipcard-reverso";
    if (t.imagen) {
      reversoClase += " flipcard-reverso-horizontal";
      reversoHtml += "<img class='flipcard-reverso-img' src='" + t.imagen + "' alt=''>";
      reversoHtml += "<span class='flipcard-reverso-texto'>" + t.reverso + "</span>";
    } else {
      reversoHtml += "<span>" + t.reverso + "</span>";
    }
    var reverso = crear("div", reversoClase, reversoHtml);
    inner.appendChild(frente);
    inner.appendChild(reverso);
    card.appendChild(inner);
    card.onclick = function () {
      if (estado.bloqueado) return;
      var yaVolteada = card.classList.contains("volteada");
      card.classList.toggle("volteada");
      if (!yaVolteada && t.audio) {
        estado.bloqueado = true;
        encolarAudio(t.audio, function () {
          estado.bloqueado = false;
          escuchadas[idx] = true;
          if (Object.keys(escuchadas).length === datos.tarjetas.length) {
            marcarCompleta(estado.pantallaActual);
          }
        });
      }
    };
    grid.appendChild(card);
  });
  cont.appendChild(grid);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 4 / 14. ORDENAR (secuencia cronológica) — sin botón verificar,
// coloca en el momento si es correcto, no hace nada si es incorrecto
// ------------------------------------------------------------
function renderOrdenar(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var imgOrdenar = crear("img", "imagen-actividad");
    imgOrdenar.src = datos.imagen;
    imgOrdenar.alt = datos.titulo;
    cont.appendChild(imgOrdenar);
  }

  var elegidos = [];
  var opciones = barajar(datos.items);
  var evaluada = new Array(datos.items.length).fill(false);

  var zonaElegidos = crear("div", "zona-elegidos");
  var zonaOpciones = crear("div", "zona-opciones-ordenar");

  function refrescar() {
    zonaElegidos.innerHTML = "";
    for (var i = 0; i < datos.items.length; i++) {
      var slot = crear("div", "slot-orden", "");
      if (elegidos[i]) {
        slot.appendChild(crear("span", "slot-texto", elegidos[i].texto));
        slot.classList.add("slot-lleno", "correcto");
      } else {
        slot.appendChild(crear("span", "slot-texto slot-vacio", "___"));
      }
      zonaElegidos.appendChild(slot);
    }

    zonaOpciones.innerHTML = "";
    opciones.forEach(function (item) {
      if (elegidos.indexOf(item) !== -1) return;
      var btn = crear("button", "btn-opcion-ordenar", item.texto);
      btn.onclick = function () {
        if (estado.bloqueado) return;
        var siguientePos = elegidos.length;
        if (item === datos.items[siguientePos]) {
          if (!evaluada[siguientePos]) { registrarAcierto(); evaluada[siguientePos] = true; }
          elegidos.push(item);
          refrescar();
          var completo = elegidos.length === datos.items.length;
          if (completo) {
            marcarCompleta(estado.pantallaActual);
            var res = document.getElementById("resultado-ordenar");
            if (res) res.innerHTML = "<p class='feedback-correcto'>✓ ¡Muy bien! Armaste la oración correctamente.</p>";
            estado.bloqueado = true;
            // Un solo audio de confirmación al completar la oración entera,
            // en vez de un audio por cada palabra (evita que suene repetitivo).
            encolarAcierto(datos.oracionAudio, function () { estado.bloqueado = false; });
          }
        } else {
          if (!evaluada[siguientePos]) { registrarError(); evaluada[siguientePos] = true; }
        }
      };
      zonaOpciones.appendChild(btn);
    });
  }
  refrescar();

  cont.appendChild(crear("p", "subtitulo-zona", "Tu orden:"));
  cont.appendChild(zonaElegidos);
  cont.appendChild(crear("p", "subtitulo-zona", "Opciones:"));
  cont.appendChild(zonaOpciones);
  var resultadoOrdenar = crear("div", "resultado-verificacion");
  resultadoOrdenar.id = "resultado-ordenar";
  cont.appendChild(resultadoOrdenar);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 5. MAPA INTERACTIVO (con siluetas reales de África y Sudamérica)
// ------------------------------------------------------------
function renderMapa(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  var mapaWrap = crear("div", "mapa-wrap");

  var imgMapa = crear("img", "mapa-imagen-base");
  imgMapa.src = datos.imagenMapa;
  imgMapa.alt = "Mapa de África y Sudamérica";
  mapaWrap.appendChild(imgMapa);

  var svgNS = "http://www.w3.org/2000/svg";
  var svgRuta = document.createElementNS(svgNS, "svg");
  svgRuta.setAttribute("viewBox", "0 0 100 100");
  svgRuta.setAttribute("class", "mapa-svg-ruta");
  svgRuta.setAttribute("preserveAspectRatio", "none");
  var rutaPath = document.createElementNS(svgNS, "path");
  rutaPath.setAttribute("d", "M71.66,49.55 Q47.84,52.6 24.04,75.79");
  rutaPath.setAttribute("class", "mapa-ruta-linea");
  svgRuta.appendChild(rutaPath);
  mapaWrap.appendChild(svgRuta);

  var panel = crear("div", "mapa-panel-info", "<p class='mapa-placeholder'>Tocá un número del mapa para ver la información.</p>");

  var visitados = {};

  datos.puntos.forEach(function (p, i) {
    var marcador = crear("button", "mapa-marcador", (i + 1));
    marcador.style.left = p.x + "%";
    marcador.style.top = p.y + "%";
    marcador.onclick = function () {
      document.querySelectorAll(".mapa-marcador").forEach(function (m) { m.classList.remove("activo"); });
      marcador.classList.add("activo");
      var htmlPanel = "<h3>" + p.titulo + "</h3><p>" + p.texto + "</p>";
      if (p.imagen) {
        htmlPanel += "<img class='mapa-panel-imagen' src='" + p.imagen + "' alt='" + p.titulo + "'>";
      }
      panel.innerHTML = htmlPanel;
      panel.classList.add("visible");
      reproducirManual(p.audio);
      visitados[i] = true;
      if (Object.keys(visitados).length === datos.puntos.length) {
        marcarCompleta(estado.pantallaActual);
      }
    };
    mapaWrap.appendChild(marcador);
  });

  cont.appendChild(mapaWrap);
  cont.appendChild(panel);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// LÍNEA DE TIEMPO INTERACTIVA — puntos numerados sobre una línea,
// cada uno con ícono; al tocar se abre un popup con la info del hecho.
// No requiere imágenes generadas (íconos con emoji inline).
// Sirve como pantalla informativa previa a la actividad "ordenar".
// ------------------------------------------------------------
function renderLineaTiempo(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  var wrap = crear("div", "linea-tiempo-wrap");
  var linea = crear("div", "linea-tiempo-linea");
  wrap.appendChild(linea);

  var marcadores = crear("div", "linea-tiempo-marcadores");
  var panel = crear("div", "linea-tiempo-panel", "<p class='mapa-placeholder'>Tocá un punto de la línea de tiempo para ver la información.</p>");

  var visitados = {};

  datos.puntos.forEach(function (p, i) {
    var marcador = crear("button", "linea-tiempo-marcador");
    marcador.innerHTML = "<span class='linea-tiempo-icono'>" + (p.icono || "📌") + "</span><span class='linea-tiempo-numero'>" + (i + 1) + "</span>";
    marcador.setAttribute("aria-label", p.titulo);
    marcador.onclick = function () {
      document.querySelectorAll(".linea-tiempo-marcador").forEach(function (m) { m.classList.remove("activo"); });
      marcador.classList.add("activo");
      panel.innerHTML = "<h3>" + p.titulo + "</h3><p>" + p.texto + "</p>";
      panel.classList.add("visible");
      if (p.audio) reproducirManual(p.audio);
      visitados[i] = true;
      if (Object.keys(visitados).length === datos.puntos.length) {
        marcarCompleta(estado.pantallaActual);
      }
    };
    marcadores.appendChild(marcador);
  });

  wrap.appendChild(marcadores);
  cont.appendChild(wrap);
  cont.appendChild(panel);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 6. CLASIFICAR (3 categorías) — sin botón verificar
// ------------------------------------------------------------
function renderClasificar(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    cont.appendChild(img);
  }

  var asignados = {};
  var seleccionado = null;

  var zonaItems = crear("div", "zona-items-clasificar");
  var zonaCategorias = crear("div", "zona-categorias");

  var cajas = {};
  datos.categorias.forEach(function (cat) {
    var caja = crear("div", "caja-categoria");
    caja.appendChild(crear("h4", "caja-categoria-titulo", cat));
    var lista = crear("div", "caja-categoria-lista");
    caja.appendChild(lista);
    caja.onclick = function () {
      if (seleccionado === null || estado.bloqueado) return;
      var idx = seleccionado;
      var item = datos.items[idx];
      if (item.categoria === cat) {
        registrarAcierto();
        asignados[idx] = cat;
        seleccionado = null;
        refrescar();
        estado.bloqueado = true;
        encolarAudio(item.audioConfirma, function () {
          estado.bloqueado = false;
          if (Object.keys(asignados).length === datos.items.length) {
            marcarCompleta(estado.pantallaActual);
          }
        });
      } else {
        registrarError();
        seleccionado = null;
        refrescar();
      }
    };
    cajas[cat] = { caja: caja, lista: lista };
    zonaCategorias.appendChild(caja);
  });

  function refrescar() {
    zonaItems.innerHTML = "";
    datos.categorias.forEach(function (cat) { cajas[cat].lista.innerHTML = ""; });

    datos.items.forEach(function (item, idx) {
      if (asignados[idx] !== undefined) {
        var chip = crear("div", "chip-asignado correcto", item.texto);
        cajas[asignados[idx]].lista.appendChild(chip);
      } else {
        var btn = crear("button", "btn-item-clasificar", item.texto);
        if (seleccionado === idx) btn.classList.add("seleccionado");
        btn.onclick = function () {
          seleccionado = (seleccionado === idx) ? null : idx;
          refrescar();
          reproducirManual(item.audio);
        };
        zonaItems.appendChild(btn);
      }
    });
  }
  refrescar();

  cont.appendChild(crear("p", "subtitulo-zona", "1) Tocá un elemento:"));
  cont.appendChild(zonaItems);
  cont.appendChild(crear("p", "subtitulo-zona", "2) Tocá la categoría:"));
  cont.appendChild(zonaCategorias);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 12 / 13. CLASIFICAR 2 COLUMNAS — sin botón verificar
// ------------------------------------------------------------
function renderClasificar2col(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    cont.appendChild(img);
  }

  var asignados = {};
  var seleccionado = null;

  var zonaItems = crear("div", "zona-items-clasificar");
  var zonaColumnas = crear("div", "zona-2-columnas");

  var cajas = [];
  datos.columnas.forEach(function (nombreCol, colIdx) {
    var caja = crear("div", "caja-categoria caja-columna");
    caja.appendChild(crear("h4", "caja-categoria-titulo", nombreCol));
    var lista = crear("div", "caja-categoria-lista");
    caja.appendChild(lista);
    caja.onclick = function () {
      if (seleccionado === null || estado.bloqueado) return;
      var idx = seleccionado;
      var item = datos.items[idx];
      if (item.columna === colIdx) {
        registrarAcierto();
        asignados[idx] = colIdx;
        seleccionado = null;
        refrescar();
        estado.bloqueado = true;
        if (datos.esVerdaderoFalso) {
          var audioVF = (colIdx === 0) ? (DATOS.meta && DATOS.meta.audioVerdadero) : (DATOS.meta && DATOS.meta.audioFalso);
          encolarAudio(audioVF, function () {
            encolarAudio(item.audioConfirma, function () {
              estado.bloqueado = false;
              if (Object.keys(asignados).length === datos.items.length) {
                marcarCompleta(estado.pantallaActual);
              }
            });
          });
        } else {
          encolarAcierto(item.audio, function () {
            estado.bloqueado = false;
            if (Object.keys(asignados).length === datos.items.length) {
              marcarCompleta(estado.pantallaActual);
            }
          });
        }
      } else {
        registrarError();
        seleccionado = null;
        refrescar();
      }
    };
    cajas.push({ caja: caja, lista: lista });
    zonaColumnas.appendChild(caja);
  });

  function refrescar() {
    zonaItems.innerHTML = "";
    cajas.forEach(function (c) { c.lista.innerHTML = ""; });

    datos.items.forEach(function (item, idx) {
      if (asignados[idx] !== undefined) {
        var chip = crear("div", "chip-asignado correcto", item.texto);
        cajas[asignados[idx]].lista.appendChild(chip);
      } else {
        var btn = crear("button", "btn-item-clasificar", item.texto);
        if (seleccionado === idx) btn.classList.add("seleccionado");
        btn.onclick = function () {
          seleccionado = (seleccionado === idx) ? null : idx;
          refrescar();
        };
        zonaItems.appendChild(btn);
      }
    });
  }
  refrescar();

  cont.appendChild(crear("p", "subtitulo-zona", "1) Tocá un elemento:"));
  cont.appendChild(zonaItems);
  cont.appendChild(crear("p", "subtitulo-zona", "2) Tocá la columna:"));
  cont.appendChild(zonaColumnas);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 7 / 17. VERDADERO O FALSO — revelado secuencial bloqueante
// ------------------------------------------------------------
function renderVF(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    cont.appendChild(img);
  }

  var contador = crear("p", "subtitulo-zona");
  cont.appendChild(contador);

  var slotUnico = crear("div", "lista-vf");
  cont.appendChild(slotUnico);

  var evaluada = new Array(datos.afirmaciones.length).fill(false);
  var resueltas = 0;

  function mostrarAfirmacion(i) {
    var af = datos.afirmaciones[i];
    contador.textContent = "Afirmación " + (i + 1) + " de " + datos.afirmaciones.length;
    slotUnico.innerHTML = "";

    var item = crear("div", "item-vf item-vf-activo");
    item.appendChild(crear("p", "texto-afirmacion", af.texto));

    var botones = crear("div", "botones-vf");
    var btnV = crear("button", "btn-vf", "Verdadero");
    var btnF = crear("button", "btn-vf", "Falso");
    var justif = crear("p", "justificacion-vf", af.justificacion);
    justif.style.display = "none";

    function elegir(respuesta) {
      if (estado.bloqueado) return;
      var acerto = (respuesta === af.valor);
      if (acerto) {
        if (!evaluada[i]) { registrarAcierto(); evaluada[i] = true; }
        var elegido = respuesta ? btnV : btnF;
        elegido.classList.add("correcto");
      } else {
        if (!evaluada[i]) { registrarError(); evaluada[i] = true; }
        var incorrecto = respuesta ? btnV : btnF;
        incorrecto.classList.add("incorrecto");
        return; // no avanza si es incorrecto, puede reintentar
      }
      btnV.disabled = true;
      btnF.disabled = true;
      justif.style.display = "block";
      item.classList.remove("item-vf-activo");
      estado.bloqueado = true;

      // Un solo audio de confirmación (chime + justificación).
      encolarAcierto(af.audioJustif, function () {
        estado.bloqueado = false;
        resueltas++;
        if (i + 1 < datos.afirmaciones.length) {
          mostrarAfirmacion(i + 1);
        } else {
          marcarCompleta(estado.pantallaActual);
        }
      });
    }

    btnV.onclick = function () { elegir(true); };
    btnF.onclick = function () { elegir(false); };

    botones.appendChild(btnV);
    botones.appendChild(btnF);
    item.appendChild(botones);
    item.appendChild(justif);
    slotUnico.appendChild(item);

    estado.bloqueado = true;
    encolarAudio(af.audio, function () { estado.bloqueado = false; });
  }

  if (datos.audio) {
    estado.bloqueado = true;
    encolarAudio(datos.audio, function () { estado.bloqueado = false; mostrarAfirmacion(0); });
  } else {
    mostrarAfirmacion(0);
  }
}

// ------------------------------------------------------------
// 8 / 11. ASOCIAR (pares) — con separador de columnas y audio
// ------------------------------------------------------------
function renderAsociar(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    cont.appendChild(img);
  }

  var izquierda = barajar(datos.pares.map(function (p, i) { return { texto: p.izq, audio: p.audioIzq, id: i }; }));
  var derecha = barajar(datos.pares.map(function (p, i) { return { texto: p.der, audio: p.audioDer, id: i }; }));

  var PALETA_PAREJAS = ["#ffd6a5", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fdffb6", "#ffadad"];

  var seleccionIzq = null;
  var resueltos = {};

  var fila = crear("div", "fila-asociar");
  var bloqueIzq = crear("div", "bloque-asociar");
  bloqueIzq.appendChild(crear("h4", "asociar-titulo", "Conceptos"));
  var colIzq = crear("div", "columna-asociar");
  bloqueIzq.appendChild(colIzq);

  var bloqueDer = crear("div", "bloque-asociar");
  bloqueDer.appendChild(crear("h4", "asociar-titulo", "Definiciones"));
  var colDer = crear("div", "columna-asociar");
  bloqueDer.appendChild(colDer);

  fila.appendChild(bloqueIzq);
  fila.appendChild(bloqueDer);
  cont.appendChild(fila);

  function refrescar() {
    colIzq.innerHTML = "";
    colDer.innerHTML = "";

    izquierda.forEach(function (obj) {
      var btn = crear("button", "btn-asociar", obj.texto);
      if (resueltos[obj.id]) {
        btn.classList.add("correcto");
        var color = PALETA_PAREJAS[obj.id % PALETA_PAREJAS.length];
        btn.style.background = color;
        btn.style.borderColor = color;
        btn.style.color = "#333";
      }
      if (seleccionIzq === obj.id) btn.classList.add("seleccionado");
      btn.disabled = !!resueltos[obj.id] || estado.bloqueado;
      btn.onclick = function () {
        if (estado.bloqueado) return;
        seleccionIzq = obj.id;
        refrescar();
        reproducirManual(obj.audio);
      };
      colIzq.appendChild(btn);
    });

    derecha.forEach(function (obj) {
      var btn = crear("button", "btn-asociar", obj.texto);
      if (resueltos[obj.id]) {
        btn.classList.add("correcto");
        var color = PALETA_PAREJAS[obj.id % PALETA_PAREJAS.length];
        btn.style.background = color;
        btn.style.borderColor = color;
        btn.style.color = "#333";
      }
      btn.disabled = !!resueltos[obj.id] || estado.bloqueado;
      btn.onclick = function () {
        if (estado.bloqueado || seleccionIzq === null) {
          if (seleccionIzq === null) reproducirManual(obj.audio);
          return;
        }
        if (seleccionIzq === obj.id) {
          registrarAcierto();
          resueltos[obj.id] = true;
          seleccionIzq = null;
          estado.bloqueado = true;
          refrescar();
          encolarAcierto(obj.audio, function () {
            estado.bloqueado = false;
            refrescar();
            if (Object.keys(resueltos).length === datos.pares.length) {
              marcarCompleta(estado.pantallaActual);
            }
          });
        } else {
          registrarError();
          seleccionIzq = null;
          refrescar();
        }
      };
      colDer.appendChild(btn);
    });
  }
  refrescar();

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 9. OPCIÓN MÚLTIPLE — audio de pregunta y de la opción correcta
// ------------------------------------------------------------
function renderMultiple(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    cont.appendChild(img);
  }

  var contador = crear("p", "subtitulo-zona");
  cont.appendChild(contador);

  var bloque = crear("div", "bloque-pregunta");
  cont.appendChild(bloque);

  var evaluada = new Array(datos.preguntas.length).fill(false);
  var pregActual = 0;

  function mostrarPregunta(i) {
    var preg = datos.preguntas[i];
    contador.textContent = "Pregunta " + (i + 1) + " de " + datos.preguntas.length;
    bloque.innerHTML = "";
    bloque.appendChild(crear("p", "texto-pregunta", preg.pregunta));
    var opciones = crear("div", "opciones-multiple");

    // Barajamos las opciones (y su audio correspondiente) juntos,
    // así la correcta no queda siempre en el mismo lugar.
    var indices = preg.opciones.map(function (_, idx) { return idx; });
    indices = barajar(indices);

    indices.forEach(function (opIdxOriginal) {
      var opTexto = preg.opciones[opIdxOriginal];
      var btn = crear("button", "btn-opcion-multiple", opTexto);
      btn.onclick = function () {
        if (estado.bloqueado) return;
        var esCorrecta = (opIdxOriginal === preg.correcta);
        if (esCorrecta) {
          if (!evaluada[i]) { registrarAcierto(); evaluada[i] = true; }
          btn.classList.add("correcto");
          opciones.querySelectorAll(".btn-opcion-multiple").forEach(function (b) { b.disabled = true; });
          var audioOp = preg.audioOpciones ? preg.audioOpciones[opIdxOriginal] : null;
          estado.bloqueado = true;
          encolarAcierto(audioOp, function () {
            estado.bloqueado = false;
            if (i + 1 < datos.preguntas.length) {
              mostrarPregunta(i + 1);
            } else {
              marcarCompleta(estado.pantallaActual);
            }
          });
        } else {
          if (!evaluada[i]) { registrarError(); evaluada[i] = true; }
          btn.classList.add("incorrecto");
          btn.disabled = true;
        }
      };
      opciones.appendChild(btn);
    });

    bloque.appendChild(opciones);
    if (preg.audioPregunta) encolarAudio(preg.audioPregunta);
  }

  if (datos.audio) encolarAudio(datos.audio);
  mostrarPregunta(0);
}

// ------------------------------------------------------------
// 10. COMPLETAR TEXTO — sin botón verificar
// ------------------------------------------------------------
function renderCompletar(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var img = crear("img", "imagen-actividad");
    img.src = datos.imagen;
    img.alt = datos.titulo;
    cont.appendChild(img);
  }

  var huecos = [];
  var parrafo = crear("p", "parrafo-completar");
  var seleccionActiva = null; // { palabra, audio }
  var huecoActivo = null;

  datos.partes.forEach(function (parte) {
    if (parte.texto !== undefined) {
      parrafo.appendChild(document.createTextNode(parte.texto));
    } else {
      var idx = huecos.length;
      var span = crear("span", "hueco-completar", "____");
      span.onclick = function () {
        if (estado.bloqueado) return;
        if (huecos[idx].valor !== null) return;
        if (seleccionActiva !== null) {
          intentarRellenar(idx, seleccionActiva);
        } else {
          huecoActivo = idx;
          marcarHuecoActivo();
        }
      };
      huecos.push({ span: span, respuesta: parte.hueco, valor: null });
      parrafo.appendChild(span);
    }
  });

  cont.appendChild(parrafo);

  function marcarHuecoActivo() {
    huecos.forEach(function (h) { h.span.classList.remove("hueco-activo"); });
    if (huecoActivo !== null) huecos[huecoActivo].span.classList.add("hueco-activo");
  }

  function intentarRellenar(idxHueco, palabraObj) {
    if (palabraObj.palabra === huecos[idxHueco].respuesta) {
      registrarAcierto();
      huecos[idxHueco].valor = palabraObj.palabra;
      huecos[idxHueco].span.textContent = palabraObj.palabra;
      huecos[idxHueco].span.classList.add("hueco-lleno", "correcto");
      huecos[idxHueco].span.classList.remove("hueco-activo");
      seleccionActiva = null;
      huecoActivo = null;
      estado.bloqueado = true;
      encolarAcierto(palabraObj.audio, function () {
        estado.bloqueado = false;
        if (huecos.every(function (h) { return h.valor !== null; })) {
          marcarCompleta(estado.pantallaActual);
        }
      });
      refrescarBanco();
    } else {
      registrarError();
      seleccionActiva = null;
      huecoActivo = null;
      marcarHuecoActivo();
      refrescarBanco();
    }
  }

  var banco = crear("div", "banco-palabras");
  cont.appendChild(banco);

  function refrescarBanco() {
    banco.innerHTML = "";
    datos.banco.forEach(function (palabraObj) {
      var usada = huecos.some(function (h) { return h.valor === palabraObj.palabra; });
      var btn = crear("button", "btn-palabra-banco", palabraObj.palabra);
      if (usada) { btn.disabled = true; btn.classList.add("usada"); }
      btn.onclick = function () {
        if (estado.bloqueado || usada) return;
        if (huecoActivo !== null) {
          intentarRellenar(huecoActivo, palabraObj);
        } else {
          seleccionActiva = palabraObj;
          banco.querySelectorAll(".btn-palabra-banco").forEach(function (b) { b.classList.remove("seleccionada"); });
          btn.classList.add("seleccionada");
        }
      };
      banco.appendChild(btn);
    });
  }
  refrescarBanco();

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 16. SOPA DE LETRAS — con listado visible + audio y texto al encontrar
// ------------------------------------------------------------
function renderSopa(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  var TAM = 14;
  var grid = [];
  for (var i = 0; i < TAM; i++) {
    grid.push(new Array(TAM).fill(null));
  }

  var direcciones = [
    { dr: 0, dc: 1 },  // horizontal, izquierda a derecha
    { dr: 1, dc: 0 },  // vertical, arriba a abajo
    { dr: 1, dc: 1 },  // diagonal, avanzando hacia la derecha
  ];

  var colocadas = [];

  datos.palabras.forEach(function (p, idxPalabra) {
    var palabra = p.palabra.toUpperCase();
    var colocada = false;
    var intentos = 0;
    // Se fuerza variedad direccional: se arranca probando la dirección
    // que le toca por turno a esta palabra (rotando el array) y, si no
    // entra, se prueban las otras antes de reintentar con más margen.
    var ordenDirecciones = direcciones.slice(idxPalabra % direcciones.length).concat(direcciones.slice(0, idxPalabra % direcciones.length));
    while (!colocada && intentos < 300) {
      intentos++;
      var dir = ordenDirecciones[intentos % ordenDirecciones.length];
      var maxRow = (dir.dr === 1) ? TAM - palabra.length : TAM - 1;
      var maxCol = (dir.dc === 1) ? TAM - palabra.length : TAM - 1;
      if (maxRow < 0 || maxCol < 0) continue;
      var row = Math.floor(Math.random() * (maxRow + 1));
      var col = Math.floor(Math.random() * (maxCol + 1));

      var cabe = true;
      for (var k = 0; k < palabra.length; k++) {
        var r = row + dir.dr * k;
        var c = col + dir.dc * k;
        if (grid[r][c] !== null && grid[r][c] !== palabra[k]) { cabe = false; break; }
      }
      if (!cabe) continue;

      for (var k2 = 0; k2 < palabra.length; k2++) {
        var r2 = row + dir.dr * k2;
        var c2 = col + dir.dc * k2;
        grid[r2][c2] = palabra[k2];
      }
      colocadas.push({ palabra: palabra, def: p.definicion, audio: p.audio, row: row, col: col, dir: dir, encontrada: false });
      colocada = true;
    }
  });

  var LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (var r = 0; r < TAM; r++) {
    for (var c = 0; c < TAM; c++) {
      if (grid[r][c] === null) grid[r][c] = LETRAS[Math.floor(Math.random() * LETRAS.length)];
    }
  }

  var tableroWrap = crear("div", "tablero-sopa-wrap");
  var tablero = crear("div", "tablero-sopa");
  tablero.style.gridTemplateColumns = "repeat(" + TAM + ", 1fr)";
  tableroWrap.appendChild(tablero);

  var celdas = [];
  for (var r3 = 0; r3 < TAM; r3++) {
    celdas.push([]);
    for (var c3 = 0; c3 < TAM; c3++) {
      var celda = crear("div", "celda-sopa", grid[r3][c3]);
      celda.setAttribute("data-r", r3);
      celda.setAttribute("data-c", c3);
      tablero.appendChild(celda);
      celdas[r3].push(celda);
    }
  }
  cont.appendChild(tableroWrap);

  var panelDef = crear("div", "panel-definiciones");
  cont.appendChild(panelDef);

  function refrescarPanel() {
    panelDef.innerHTML = "";
    colocadas.forEach(function (p) {
      var d = crear("div", "definicion-item" + (p.encontrada ? " encontrada" : ""));
      if (p.encontrada) {
        d.innerHTML = "<strong>" + p.palabra + ":</strong> " + p.def;
      } else {
        d.innerHTML = "<strong>" + p.palabra + "</strong> — buscala en la sopa de letras";
      }
      panelDef.appendChild(d);
    });
  }
  refrescarPanel();

  var inicioSel = null;

  function limpiarSeleccionTemporal() {
    tablero.querySelectorAll(".celda-sel-temp").forEach(function (c) { c.classList.remove("celda-sel-temp"); });
  }

  // Las celdas son chicas en celular (para entrar sin scroll horizontal),
  // así que en vez de depender del toque exacto sobre la celda literal,
  // buscamos la celda más cercana al punto tocado (con tolerancia).
  function celdaMasCercana(x, y) {
    var mejor = null;
    var mejorDist = Infinity;
    for (var r = 0; r < TAM; r++) {
      for (var c = 0; c < TAM; c++) {
        var rect = celdas[r][c].getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var d = Math.hypot(x - cx, y - cy);
        if (d < mejorDist) { mejorDist = d; mejor = { r: r, c: c, celda: celdas[r][c], radio: Math.max(rect.width, rect.height) }; }
      }
    }
    if (mejor && mejorDist <= mejor.radio * 1.4) return mejor;
    return null;
  }

  function procesarToque(r, c, celda) {
    if (inicioSel === null) {
      limpiarSeleccionTemporal();
      inicioSel = { r: r, c: c };
      celda.classList.add("celda-sel-temp");
      return;
    }

    var dr = r - inicioSel.r;
    var dc = c - inicioSel.c;
    var pasos = Math.max(Math.abs(dr), Math.abs(dc));
    var stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    var stepC = dc === 0 ? 0 : dc / Math.abs(dc);
    var esLineaRecta = (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc));

    if (esLineaRecta && pasos > 0) {
      var letras = "";
      var coords = [];
      for (var k = 0; k <= pasos; k++) {
        var rr = inicioSel.r + stepR * k;
        var cc = inicioSel.c + stepC * k;
        letras += grid[rr][cc];
        coords.push([rr, cc]);
      }
      var letrasInv = letras.split("").reverse().join("");

      var match = colocadas.find(function (p) {
        return !p.encontrada && (p.palabra === letras || p.palabra === letrasInv);
      });

      if (match) {
        match.encontrada = true;
        coords.forEach(function (rc) {
          celdas[rc[0]][rc[1]].classList.add("celda-encontrada");
        });
        registrarAcierto();
        refrescarPanel();
        encolarAcierto(match.audio);
        if (colocadas.every(function (p) { return p.encontrada; })) {
          marcarCompleta(estado.pantallaActual);
        }
      }
    }

    limpiarSeleccionTemporal();
    inicioSel = null;
  }

  tablero.addEventListener("click", function (ev) {
    var resultado = celdaMasCercana(ev.clientX, ev.clientY);
    if (resultado) procesarToque(resultado.r, resultado.c, resultado.celda);
  });

  if (datos.audio) encolarAudio(datos.audio);
}
