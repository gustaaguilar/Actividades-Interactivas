// ============================================================
// ESCUCHAR, ESCRIBIR Y PINTAR - Primer ciclo, Alfabetización inicial
// motor.js - Motor de renderizado e interactividad (v2 + tipos nuevos)
// ============================================================

var estado = {
  pantallaActual: 0,
  audioActual: null,
  bloqueado: false,
  puntaje: { aciertos: 0, errores: 0 },
  completado: {}
};

var TIPOS_CON_ACTIVIDAD = ["flipcards", "ordenar", "mapa", "zonasInfo", "clasificar", "clasificar2col", "vf", "asociar", "multiple", "completar", "sopa", "narracion", "narracionAnimada", "lineaTiempo", "dictado", "pintar", "discriminar", "billetes", "concordancia"];

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

// Reproduce el sonido de error (si está definido en meta.audioError).
function encolarError(callback) {
  if (DATOS.meta && DATOS.meta.audioError) {
    encolarAudio(DATOS.meta.audioError, callback);
  } else if (callback) {
    callback();
  }
}

// ------------------------------------------------------------
// NÚMEROS EN PALABRAS + VOZ DINÁMICA (para la devolución de
// billetes, donde el monto armado puede ser cualquier combinación:
// no se puede grabar de antemano un audio para cada valor posible,
// así que se arma el texto en el momento y se lee con la voz del
// navegador). Si el navegador no tiene síntesis de voz disponible,
// no pasa nada: el texto ya se muestra siempre en pantalla.
// ------------------------------------------------------------
function numeroALetras(n) {
  if (n === 0) return "cero";
  var UNI = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  var ESP = { 10: "diez", 11: "once", 12: "doce", 13: "trece", 14: "catorce", 15: "quince", 16: "dieciséis", 17: "diecisiete", 18: "dieciocho", 19: "diecinueve" };
  var DEC = { 2: "veinte", 3: "treinta", 4: "cuarenta", 5: "cincuenta", 6: "sesenta", 7: "setenta", 8: "ochenta", 9: "noventa" };
  var CIEN = { 1: "ciento", 2: "doscientos", 3: "trescientos", 4: "cuatrocientos", 5: "quinientos", 6: "seiscientos", 7: "setecientos", 8: "ochocientos", 9: "novecientos" };

  function menorQueCien(n) {
    if (n < 10) return UNI[n];
    if (n < 20) return ESP[n];
    if (n === 20) return "veinte";
    if (n < 30) return "veinti" + UNI[n - 20];
    var d = Math.floor(n / 10), u = n % 10;
    return DEC[d] + (u > 0 ? " y " + UNI[u] : "");
  }

  if (n < 100) return menorQueCien(n);
  if (n === 100) return "cien";
  var c = Math.floor(n / 100), resto = n % 100;
  return CIEN[c] + (resto > 0 ? " " + menorQueCien(resto) : "");
}

function hablarDinamico(texto) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-AR";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch (e) {
    // Silencioso: si la síntesis de voz falla, el texto ya quedó
    // escrito en pantalla igual.
  }
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
    case "dictado": renderDictado(datos, cont); break;
    case "pintar": renderPintar(datos, cont); break;
    case "discriminar": renderDiscriminar(datos, cont); break;
    case "billetes": renderBilletes(datos, cont); break;
    case "concordancia": renderConcordancia(datos, cont); break;
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
  img.alt = datos.titulo || "Portada";
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

  // Sin imagen de cierre a propósito: el paquete se usa tanto con adultos
  // como con chicos, así que la pantalla final queda solo con el
  // resultado y la foto de perfil (en el lightbox), sin una ilustración
  // que asuma un público en particular.
  if (datos.imagen) {
    var img = crear("img", "cierre-imagen");
    img.src = datos.imagen;
    img.alt = "Cierre";
    wrap.appendChild(img);
  }

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
// ------------------------------------------------------------
// Helper genérico: armar una oración tocando palabras mezcladas en
// el orden correcto. Sin ninguna pista de audio previa — el alumno
// deduce por lectura cuál palabra sigue. Cada acierto agrega un
// renglón nuevo (crece de arriba hacia abajo) y reproduce el audio
// de la oración TAL COMO VA QUEDANDO hasta ese renglón (cada vez más
// larga), hasta que el último renglón lee la oración completa. Cada
// error suena un aviso y la palabra se queda donde estaba, disponible
// para reintentar. Usado por "dictado", "ordenar" y la primera parte
// de "pintar".
// ------------------------------------------------------------
function armarOracionPorPartes(items, audiosLinea, cont, opts) {
  opts = opts || {};
  var elegidos = [];
  var opciones = barajar(items);
  var evaluada = new Array(items.length).fill(false);

  var zonaOpciones = crear("div", "zona-opciones-ordenar");
  var zonaHistorial = crear("div", "historial-oracion");

  function agregarLineaHistorial() {
    var texto = elegidos.map(function (it) { return it.texto; }).join(" ");
    zonaHistorial.appendChild(crear("div", "historial-linea", texto));
  }

  function refrescar() {
    zonaOpciones.innerHTML = "";
    opciones.forEach(function (item) {
      if (elegidos.indexOf(item) !== -1) return;
      var btn = crear("button", "btn-opcion-ordenar", item.texto);
      btn.onclick = function () {
        if (estado.bloqueado) return;
        var pos = elegidos.length;
        if (item === items[pos]) {
          if (!evaluada[pos]) { registrarAcierto(); evaluada[pos] = true; }
          elegidos.push(item);
          agregarLineaHistorial();
          refrescar();
          var completo = elegidos.length === items.length;
          estado.bloqueado = true;
          var audioLinea = audiosLinea ? audiosLinea[pos] : null;
          encolarAcierto(audioLinea, function () {
            estado.bloqueado = false;
            if (completo && opts.onCompleta) opts.onCompleta();
          });
        } else {
          if (!evaluada[pos]) { registrarError(); evaluada[pos] = true; }
          btn.classList.add("incorrecto");
          estado.bloqueado = true;
          encolarError(function () {
            estado.bloqueado = false;
            btn.classList.remove("incorrecto");
          });
        }
      };
      zonaOpciones.appendChild(btn);
    });
  }
  refrescar();

  cont.appendChild(crear("p", "subtitulo-zona", opts.tituloHistorial || "Se va armando así:"));
  cont.appendChild(zonaHistorial);
  cont.appendChild(crear("p", "subtitulo-zona", opts.tituloOpciones || "Palabras:"));
  cont.appendChild(zonaOpciones);
}

function renderOrdenar(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.imagen) {
    var imgOrdenar = crear("img", "imagen-actividad");
    imgOrdenar.src = datos.imagen;
    imgOrdenar.alt = datos.titulo;
    cont.appendChild(imgOrdenar);
  }

  var resultadoOrdenar = crear("div", "resultado-verificacion");
  resultadoOrdenar.id = "resultado-ordenar";

  armarOracionPorPartes(datos.items, datos.audiosLinea, cont, {
    tituloHistorial: "Cómo va creciendo la oración:",
    tituloOpciones: "Palabras:",
    onCompleta: function () {
      marcarCompleta(estado.pantallaActual);
      resultadoOrdenar.innerHTML = "<p class='feedback-correcto'>✓ ¡Muy bien! Armaste la oración correctamente.</p>";
    }
  });
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

  var TAM = 10;
  var grid = [];
  for (var i = 0; i < TAM; i++) {
    grid.push(new Array(TAM).fill(null));
  }

  // Nunca de derecha a izquierda: todas las direcciones avanzan hacia
  // la derecha o se mantienen verticales (nunca dc = -1).
  var direcciones = [
    { dr: 0, dc: 1 },   // horizontal, izquierda a derecha
    { dr: 1, dc: 0 },   // vertical, de arriba hacia abajo
    { dr: -1, dc: 0 },  // vertical, de abajo hacia arriba
    { dr: 1, dc: 1 },   // diagonal, bajando hacia la derecha
    { dr: -1, dc: 1 },  // diagonal, subiendo hacia la derecha
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
      // Rango de la celda INICIAL para que, avanzando (largo-1) pasos en
      // esta dirección, la palabra entera quede siempre dentro de la
      // grilla (funciona para dr/dc positivos, negativos o en 0).
      var minRow = (dir.dr === -1) ? (palabra.length - 1) : 0;
      var maxRow = (dir.dr === 1) ? (TAM - palabra.length) : (TAM - 1);
      var minCol = (dir.dc === -1) ? (palabra.length - 1) : 0;
      var maxCol = (dir.dc === 1) ? (TAM - palabra.length) : (TAM - 1);
      if (maxRow < minRow || maxCol < minCol) continue;
      var row = minRow + Math.floor(Math.random() * (maxRow - minRow + 1));
      var col = minCol + Math.floor(Math.random() * (maxCol - minCol + 1));

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
  var layoutSopa = crear("div", "sopa-layout");
  layoutSopa.appendChild(tableroWrap);

  var panelDef = crear("div", "panel-definiciones");
  layoutSopa.appendChild(panelDef);
  cont.appendChild(layoutSopa);

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
        // Chime + la palabra, y a continuación su definición (tal como
        // queda escrita en el panel), sin repetir la palabra en ese
        // segundo audio.
        encolarAcierto(match.audio, function () {
          if (match.audioDef) encolarAudio(match.audioDef);
        });
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

  // Primero el título de esta sopa en particular ("Sopa de letras de
  // colores"), después la consigna genérica de cómo jugar.
  if (datos.audioTitulo) {
    encolarAudio(datos.audioTitulo, function () {
      if (datos.audio) encolarAudio(datos.audio);
    });
  } else if (datos.audio) {
    encolarAudio(datos.audio);
  }
}

// ------------------------------------------------------------
// 17. DICTADO PROGRESIVO — se dicta una palabra, se ubica en su
// lugar, y recién ahí se dicta la palabra siguiente. Sin imagen
// de fondo (a propósito, para que no se adivine por la imagen).
// ------------------------------------------------------------
function renderDictado(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  var resultadoDictado = crear("div", "resultado-verificacion");
  resultadoDictado.id = "resultado-dictado";

  // La imagen que representa la oración queda oculta hasta terminar
  // de armarla y escucharla completa (no es una pista previa: recién
  // aparece como premio, junto con el botón "Siguiente").
  var imgWrapDictado = null;
  if (datos.imagen) {
    imgWrapDictado = crear("div", "dictado-imagen-wrap oculto");
    var imgDictado = crear("img", "imagen-actividad imagen-dictado");
    imgDictado.src = datos.imagen;
    imgDictado.alt = datos.titulo;
    imgWrapDictado.appendChild(imgDictado);
  }

  armarOracionPorPartes(datos.items, datos.audiosLinea, cont, {
    tituloHistorial: "Se va armando así:",
    tituloOpciones: "Palabras:",
    onCompleta: function () {
      marcarCompleta(estado.pantallaActual);
      resultadoDictado.innerHTML = "<p class='feedback-correcto'>✓ ¡Muy bien! Escribiste la oración completa.</p>";
      if (imgWrapDictado) imgWrapDictado.classList.remove("oculto");
    }
  });
  cont.appendChild(resultadoDictado);
  if (imgWrapDictado) cont.appendChild(imgWrapDictado);

  // Solo se escucha la consigna general al entrar. Ninguna palabra
  // se dicta de antemano: el alumno elige por lectura/deducción cuál
  // va primero, y recién al acertar empieza a sonar el audio.
  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 18. PINTAR — se escucha una oración (ej. "El pomelo es amarillo")
// y hay que tocar el color correcto para pintar la imagen.
// ------------------------------------------------------------
function renderPintar(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  // Layout en dos columnas en pantallas anchas (notebook): a la
  // izquierda el dibujo + armado de la oración, a la derecha la
  // paleta de colores, para aprovechar el espacio y evitar el
  // scroll vertical. En celular se apila igual que antes.
  var layout = crear("div", "pintar-layout");
  var colPrincipal = crear("div", "pintar-col-principal");
  var colPaleta = crear("div", "pintar-col-paleta");
  layout.appendChild(colPrincipal);
  layout.appendChild(colPaleta);
  cont.appendChild(layout);

  var imgWrap = crear("div", "pintar-imagen-wrap");
  var img = crear("img", "imagen-actividad imagen-pintar");
  img.src = datos.imagenContorno;
  img.alt = datos.titulo;
  imgWrap.appendChild(img);
  colPrincipal.appendChild(imgWrap);

  // 1° etapa: armar la oración tocando las palabras mezcladas, con
  // audio acumulado en cada renglón (igual que dictado/ordenar).
  armarOracionPorPartes(datos.items, datos.audiosLinea, colPrincipal, {
    tituloHistorial: "Se va armando así:",
    tituloOpciones: "Palabras:",
    onCompleta: function () { mostrarPaleta(); }
  });

  // 2° etapa: recién al armar bien la oración se habilita, como
  // premio, la paleta para elegir el color y pintar el dibujo.
  var paleta = crear("div", "paleta-colores oculto");
  var resuelto = false;

  function mostrarPaleta() {
    paleta.classList.remove("oculto");
    paleta.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (DATOS.meta && DATOS.meta.audioPaleta) encolarAudio(DATOS.meta.audioPaleta);
  }

  var opciones = barajar(datos.opciones);
  opciones.forEach(function (op) {
    var swatch = crear("button", "swatch-color");
    swatch.style.background = op.hex;
    swatch.setAttribute("aria-label", op.nombre);
    swatch.onclick = function () {
      if (estado.bloqueado || resuelto) return;
      if (op.correcta) {
        registrarAcierto();
        resuelto = true;
        img.src = datos.imagenColor;
        swatch.classList.add("correcto");
        paleta.querySelectorAll(".swatch-color").forEach(function (s) { s.disabled = true; });
        estado.bloqueado = true;
        marcarCompleta(estado.pantallaActual);
        encolarAcierto(op.audio, function () { estado.bloqueado = false; });
      } else {
        registrarError();
        swatch.classList.add("incorrecto");
        setTimeout(function () { swatch.classList.remove("incorrecto"); }, 500);
        reproducirManual(op.audio);
      }
    };
    paleta.appendChild(swatch);
  });

  colPaleta.appendChild(crear("p", "subtitulo-zona", "Ahora elegí el color y pintá:"));
  colPaleta.appendChild(paleta);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 19. DISCRIMINAR — la consigna aparece SOLO EN TEXTO (sin audio,
// a propósito) con un círculo del color de referencia; abajo hay
// una escena con varios elementos y solo se "pintan" los correctos.
// ------------------------------------------------------------
function renderDiscriminar(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  var filaTexto = crear("div", "consigna-visual");
  var textoRef = crear("span", "texto-consigna-visual", datos.textoConsigna);
  var circulo = crear("span", "circulo-color-indicador");
  circulo.style.background = datos.colorIndicador || "#4a9c4a";
  filaTexto.appendChild(textoRef);
  filaTexto.appendChild(circulo);
  cont.appendChild(filaTexto);

  var wrap = crear("div", "zonas-info-centro");
  var contenedor = crear("div", "zonas-info-wrap discriminar-wrap");
  var img = crear("img", "zonas-info-imagen");
  img.src = datos.imagen;
  img.alt = datos.titulo;
  contenedor.appendChild(img);

  var encontradas = {};
  var totalCorrectas = datos.zonas.filter(function (z) { return z.correcta; }).length;

  datos.zonas.forEach(function (z, i) {
    var marcador = crear("button", "zona-discriminar");
    marcador.style.left = z.x + "%";
    marcador.style.top = z.y + "%";
    marcador.onclick = function () {
      if (estado.bloqueado || encontradas[i]) return;
      if (z.correcta) {
        registrarAcierto();
        encontradas[i] = true;
        marcador.classList.add("acertada");
        // Pinta ESA manzana puntual de verde (superpone el sprite
        // recortado en la posición exacta), en vez de solo marcarla.
        var pintada = crear("img", "manzana-pintada-overlay");
        pintada.src = datos.imagenPintada || "assets/img/manzana_verde.png";
        pintada.alt = "";
        pintada.style.left = z.x + "%";
        pintada.style.top = z.y + "%";
        contenedor.appendChild(pintada);
        estado.bloqueado = true;
        encolarAudio(DATOS.meta && DATOS.meta.audioCorrecto, function () { estado.bloqueado = false; });
        if (Object.keys(encontradas).length === totalCorrectas) {
          marcarCompleta(estado.pantallaActual);
        }
      } else {
        registrarError();
        marcador.classList.add("error-temp");
        estado.bloqueado = true;
        encolarError(function () {
          estado.bloqueado = false;
          marcador.classList.remove("error-temp");
        });
      }
    };
    contenedor.appendChild(marcador);
  });

  wrap.appendChild(contenedor);
  cont.appendChild(wrap);

  if (datos.audio) encolarAudio(datos.audio);
}

// ------------------------------------------------------------
// 20. BILLETES — armar un monto exacto combinando billetes de
// $100 y $10 (centenas y decenas). Con botón "Verificar" y opción
// de sacar el último billete si se equivocaron.
// ------------------------------------------------------------
function renderBilletes(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  if (datos.contexto) {
    var filaContexto = crear("div", "fila-consigna fila-contexto-billetes");
    filaContexto.appendChild(crear("p", "contexto-billetes", datos.contexto));
    if (datos.audioContexto) {
      var btnCtx = crear("button", "btn-audio-consigna", "🔊");
      btnCtx.setAttribute("aria-label", "Escuchar de nuevo");
      btnCtx.onclick = function () { reproducirManual(datos.audioContexto); };
      filaContexto.appendChild(btnCtx);
    }
    cont.appendChild(filaContexto);
  }
  cont.appendChild(crear("p", "objetivo-billetes", "Monto a armar: <strong>$" + datos.objetivo + "</strong>"));

  var agregados = [];
  var resuelto = false;

  var bandeja = crear("div", "bandeja-total");
  var totalTexto = crear("p", "total-billetes-texto");
  var desglose = crear("p", "desglose-valor");
  var resultado = crear("div", "resultado-verificacion");
  resultado.id = "resultado-billetes";

  function calcularTotal() {
    return agregados.reduce(function (a, b) { return a + b; }, 0);
  }

  function refrescarBandeja() {
    bandeja.innerHTML = "";
    agregados.forEach(function (valor) {
      var billeteData = datos.billetes.filter(function (b) { return b.valor === valor; })[0];
      var chip = crear("img", "chip-billete");
      chip.src = billeteData.imagen;
      chip.alt = "$" + valor;
      bandeja.appendChild(chip);
    });
    var total = calcularTotal();
    totalTexto.innerHTML = "Tu total: <strong>$" + total + "</strong>";
    var centenas = Math.floor(total / 100);
    var decenas = Math.floor((total % 100) / 10);
    desglose.textContent = "Centenas: " + centenas + "   ·   Decenas: " + decenas;
  }
  refrescarBandeja();

  var banco = crear("div", "banco-billetes");
  datos.billetes.forEach(function (b) {
    var btn = crear("button", "btn-billete");
    var imgBillete = crear("img", "img-billete-banco");
    imgBillete.src = b.imagen;
    imgBillete.alt = "$" + b.valor;
    btn.appendChild(imgBillete);
    btn.appendChild(crear("span", "etiqueta-billete", "$" + b.valor));
    btn.onclick = function () {
      if (estado.bloqueado || resuelto) return;
      agregados.push(b.valor);
      refrescarBandeja();
    };
    banco.appendChild(btn);
  });

  var btnQuitar = crear("button", "btn-quitar-billete", "↩ Quitar el último billete");
  btnQuitar.onclick = function () {
    if (estado.bloqueado || resuelto || agregados.length === 0) return;
    agregados.pop();
    refrescarBandeja();
  };

  var btnVerificar = crear("button", "btn-verificar", "Verificar");
  btnVerificar.onclick = function () {
    if (estado.bloqueado || resuelto) return;
    var total = calcularTotal();
    if (total === datos.objetivo) {
      registrarAcierto();
      resuelto = true;
      resultado.innerHTML = "<p class='feedback-correcto'>✓ ¡Justo! Armaste $" + total + ".</p>";
      estado.bloqueado = true;
      marcarCompleta(estado.pantallaActual);
      // El monto armado puede ser cualquier combinación de billetes, así
      // que la frase se arma en el momento y se lee con la voz del
      // navegador (no se puede grabar de antemano un audio para cada
      // valor posible).
      encolarAudio(DATOS.meta && DATOS.meta.audioCorrecto, function () {
        estado.bloqueado = false;
        hablarDinamico("Correcto, armaste " + numeroALetras(total) + " pesos.");
      });
    } else {
      registrarError();
      var falta = datos.objetivo - total;
      var msg = falta > 0
        ? "Todavía no. Llevás $" + total + ", te faltan $" + falta + "."
        : "Te pasaste. Llevás $" + total + ", son $" + (-falta) + " de más.";
      resultado.innerHTML = "<p class='feedback-incorrecto'>" + msg + "</p>";
      var frase = falta > 0
        ? "Te falta. Llevás " + numeroALetras(total) + " pesos, son " + numeroALetras(falta) + " pesos de menos."
        : "Te pasaste. Llevás " + numeroALetras(total) + " pesos, son " + numeroALetras(-falta) + " pesos de más.";
      estado.bloqueado = true;
      encolarAudio(DATOS.meta && DATOS.meta.audioError, function () {
        estado.bloqueado = false;
        hablarDinamico(frase);
      });
    }
  };

  cont.appendChild(crear("p", "subtitulo-zona", "Banco de billetes:"));
  cont.appendChild(banco);
  cont.appendChild(crear("p", "subtitulo-zona", "Tu bandeja:"));
  cont.appendChild(bandeja);
  cont.appendChild(totalTexto);
  cont.appendChild(desglose);
  var filaBotones = crear("div", "fila-botones-billetes");
  filaBotones.appendChild(btnQuitar);
  filaBotones.appendChild(btnVerificar);
  cont.appendChild(filaBotones);
  cont.appendChild(resultado);

  // Orden: primero (solo en la pantalla que lo tenga, la primera del
  // bloque) el aviso de que los montos son bajos a propósito, después
  // el título de esta pantalla en particular (con su monto y
  // contexto), después la consigna genérica de cómo se juega, y por
  // último el contexto de la changa/feria.
  if (datos.avisoAudio) encolarAudio(datos.avisoAudio);
  if (datos.audioTitulo) encolarAudio(datos.audioTitulo);
  if (datos.audio) encolarAudio(datos.audio);
  if (datos.audioContexto) encolarAudio(datos.audioContexto);
}

// ------------------------------------------------------------
// 21. CONCORDANCIA (unir con flecha) — varias columnas (artículo /
// sustantivo con imagen / verbo / predicado), desordenadas. Tocar
// un nodo reproduce su audio; tocar dos nodos de columnas seguidas
// los une con una línea si el enlace es correcto (concordancia de
// género y número). Cuando se completan las 4 oraciones (cadena
// artículo->sustantivo->verbo->predicado) aparece cada una escrita
// abajo con su audio completo.
// ------------------------------------------------------------
function renderConcordancia(datos, cont) {
  cont.appendChild(crearCabecera(datos));

  var wrap = crear("div", "concordancia-wrap");
  var svgNS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "concordancia-lineas");
  wrap.appendChild(svg);

  var columnasDiv = crear("div", "concordancia-columnas");
  wrap.appendChild(columnasDiv);

  var nodosEl = {};
  var nodosInfo = {};
  var enlacesHechos = {};
  var lineasDom = {};
  var seleccionado = null;
  var resueltas = new Array(datos.oraciones.length).fill(false);

  // Un color distinto por oración, para que cuando hay varias líneas
  // dibujadas se pueda distinguir de un vistazo cuál tramo pertenece a
  // cuál oración. Cada enlace (par de columnas consecutivas) de la
  // cadena de una oración se pinta con el color de ESA oración.
  var COLORES_ORACION = ["#a13a2e", "#1f6fa3", "#2e8b3d", "#8e44ad", "#c07a1e", "#2b8f8f"];
  var colorPorEnlace = {};
  datos.oraciones.forEach(function (or, idx) {
    var color = COLORES_ORACION[idx % COLORES_ORACION.length];
    for (var ci = 0; ci < or.cadena.length - 1; ci++) {
      colorPorEnlace[or.cadena[ci] + "|" + or.cadena[ci + 1]] = color;
    }
  });

  datos.nodos.forEach(function (columna, colIdx) {
    var colDiv = crear("div", "concordancia-columna");
    columna.forEach(function (nodo) {
      var btn = crear("button", "concordancia-nodo");
      if (nodo.imagen) {
        var img = crear("img", "concordancia-nodo-img");
        img.src = nodo.imagen;
        img.alt = nodo.texto;
        // Si la imagen carga después de haber dibujado las líneas, su
        // caja puede cambiar de tamaño y dejar las líneas desalineadas
        // (o directamente fuera de vista). Redibujamos apenas termine
        // de cargar (o falle), y el CSS además le reserva un tamaño
        // fijo para minimizar el corrimiento.
        img.onload = redibujarTodo;
        img.onerror = redibujarTodo;
        btn.appendChild(img);
      }
      btn.appendChild(crear("span", "concordancia-nodo-texto", nodo.texto));
      btn.onclick = function () { manejarClick(nodo.id, colIdx, btn); };
      colDiv.appendChild(btn);
      nodosEl[nodo.id] = btn;
      nodosInfo[nodo.id] = { col: colIdx, texto: nodo.texto, audio: nodo.audio };
    });
    columnasDiv.appendChild(colDiv);
  });

  var zonaResueltas = crear("div", "historial-oracion concordancia-resueltas");
  var resultado = crear("div", "resultado-verificacion");

  function esEnlaceValido(a, b) {
    return datos.enlaces.some(function (e) { return e.from === a && e.to === b; });
  }

  function dibujarLinea(idA, idB) {
    var elA = nodosEl[idA], elB = nodosEl[idB];
    var rectWrap = wrap.getBoundingClientRect();
    var ra = elA.getBoundingClientRect(), rb = elB.getBoundingClientRect();
    var x1 = ra.right - rectWrap.left, y1 = ra.top + ra.height / 2 - rectWrap.top;
    var x2 = rb.left - rectWrap.left, y2 = rb.top + rb.height / 2 - rectWrap.top;
    var linea = document.createElementNS(svgNS, "line");
    linea.setAttribute("x1", x1); linea.setAttribute("y1", y1);
    linea.setAttribute("x2", x2); linea.setAttribute("y2", y2);
    linea.setAttribute("class", "concordancia-linea");
    var color = colorPorEnlace[idA + "|" + idB];
    if (color) linea.style.stroke = color;
    svg.appendChild(linea);
    lineasDom[idA + "|" + idB] = linea;
  }

  // Vuelve a trazar todas las líneas ya hechas (por ejemplo si la
  // ventana cambia de tamaño y las posiciones de los nodos se mueven).
  function redibujarTodo() {
    svg.innerHTML = "";
    lineasDom = {};
    Object.keys(enlacesHechos).forEach(function (clave) {
      var partes = clave.split("|");
      dibujarLinea(partes[0], partes[1]);
    });
  }
  window.addEventListener("resize", redibujarTodo);

  // Chequea y marca las oraciones completas de forma INMEDIATA y
  // sincrónica (no espera a que termine de sonar ningún audio): apenas
  // se completa la cadena de una oración, esta función la marca como
  // resuelta, la escribe abajo y habilita "Siguiente" si correspondía,
  // todo en el momento. El audio de "¡Correcto!" + la oración se
  // encola aparte solo para escucharse (en el orden que le toque en la
  // cola), sin condicionar nada del estado ni de la navegación — así
  // el alumno puede seguir uniendo mientras ese audio todavía no le
  // tocó el turno de sonar.
  function revisarOracionesCompletas() {
    datos.oraciones.forEach(function (or, idx) {
      if (resueltas[idx]) return;
      var completa = true;
      for (var i = 0; i < or.cadena.length - 1; i++) {
        if (!enlacesHechos[or.cadena[i] + "|" + or.cadena[i + 1]]) { completa = false; break; }
      }
      if (!completa) return;
      resueltas[idx] = true;
      registrarAcierto();
      zonaResueltas.appendChild(crear("div", "historial-linea", or.texto));
      encolarAcierto(or.audio);
      if (resueltas.every(function (r) { return r; })) {
        marcarCompleta(estado.pantallaActual);
        resultado.innerHTML = "<p class='feedback-correcto'>✓ ¡Armaste las 4 oraciones!</p>";
      }
    });
  }

  function limpiarSeleccion() {
    if (seleccionado) nodosEl[seleccionado.id].classList.remove("seleccionado");
    seleccionado = null;
  }

  // OJO: a propósito, esta pantalla NO usa estado.bloqueado para frenar
  // los clics mientras suena el audio (a diferencia de otras
  // actividades). Acá el estado de selección/unión es puramente
  // sincrónico (no depende de que un audio termine), mientras que el
  // audio de cada palabra se reproduce en cola por separado (ver
  // encolarAudio/procesarColaAudio) y nunca se superpone. Antes SÍ se
  // bloqueaba durante el audio de confirmación de cada unión, y eso
  // producía un bug real: si el alumno tocaba la palabra siguiente
  // mientras todavía sonaba el audio de la unión anterior, ese clic se
  // perdía en silencio (sin ningún aviso) porque llegaba con
  // estado.bloqueado en true; el clic de después quedaba mal
  // interpretado como si fuera "la primera palabra" de una unión
  // nueva, y la línea del medio (columna 2 a columna 3) nunca se
  // llegaba a trazar en el primer intento. Al no bloquear más los
  // clics, cada toque se procesa en el momento, en el orden en que
  // ocurre, y el bug queda resuelto de raíz (no es un parche de
  // timing).
  function manejarClick(id, col, btn) {
    if (!seleccionado) {
      seleccionado = { id: id, col: col };
      btn.classList.add("seleccionado");
      encolarAudio(nodosInfo[id].audio);
      return;
    }
    if (seleccionado.id === id) {
      // Tocar de nuevo el mismo nodo que ya está seleccionado: NO lo
      // deselecciona (antes sí lo hacía, pero eso rompía el patrón de
      // "tocar el nodo compartido dos veces" — una vez que un nodo
      // queda auto-seleccionado por haber cerrado el enlace anterior,
      // ver más abajo, volver a tocarlo para arrancar el enlace
      // siguiente terminaba cancelando la selección en vez de
      // mantenerla). Simplemente se repite su audio y sigue
      // seleccionado. Para cancelar una selección, se toca cualquier
      // otro nodo de una columna no consecutiva.
      encolarAudio(nodosInfo[id].audio);
      return;
    }
    if (col !== seleccionado.col + 1) {
      // No son columnas consecutivas: reinicia la selección en el
      // nodo nuevo (más simple para el alumno que "no pasa nada").
      limpiarSeleccion();
      seleccionado = { id: id, col: col };
      btn.classList.add("seleccionado");
      encolarAudio(nodosInfo[id].audio);
      return;
    }

    var desde = seleccionado.id, hasta = id;
    limpiarSeleccion();

    if (enlacesHechos[desde + "|" + hasta]) return; // ya unidos

    if (esEnlaceValido(desde, hasta)) {
      enlacesHechos[desde + "|" + hasta] = true;
      dibujarLinea(desde, hasta);
      nodosEl[desde].classList.add("conectado");
      nodosEl[hasta].classList.add("conectado");
      // Solo se escucha la palabra tocada (sin el sonido de "Correcto"
      // en cada unión parcial: eso confunde con las palabras que se
      // van leyendo). El "Correcto" queda reservado para cuando se
      // completa la oración entera. El chequeo de "oración completa"
      // se hace YA (no espera a que termine este audio), para que el
      // botón Siguiente y el listado de abajo se actualicen sin
      // demora aunque la cola de audio todavía tenga pendientes.
      encolarAudio(nodosInfo[hasta].audio);
      revisarOracionesCompletas();
      // CLAVE: el nodo "hasta" que se acaba de unir queda seleccionado
      // automáticamente para seguir la cadena. Antes, después de cada
      // unión, la selección quedaba en null y el alumno tenía que
      // volver a tocar ESE MISMO nodo una segunda vez para arrancar la
      // unión siguiente — si tocaba los 4 nodos de la oración en una
      // sola pasada (artículo, sustantivo, verbo, predicado, un toque
      // cada uno), se armaban los enlaces 1-2 y 3-4 pero el del medio
      // (2-3) quedaba siempre sin tocar dos veces y nunca se formaba,
      // aunque recién en el segundo intento (tocando de nuevo el
      // sustantivo y el verbo) sí se completaba. Con el nodo "hasta"
      // auto-seleccionado, tocar los 4 nodos en orden, una sola vez
      // cada uno, encadena las 3 uniones sin pasos extra. Si la
      // columna de "hasta" es la última (predicado), el próximo toque
      // simplemente no va a ser consecutivo y arranca una selección
      // nueva sin problema.
      if (col < datos.nodos.length - 1) {
        seleccionado = { id: hasta, col: col };
        btn.classList.add("seleccionado");
      }
    } else {
      registrarError();
      btn.classList.add("incorrecto");
      // En vez de un sonido de error genérico, se escucha la palabra
      // que se tocó (la que no concuerda), para que quede claro cuál
      // no encajó. El resaltado rojo se saca solo, a los 500ms (no
      // depende de la cola de audio).
      encolarAudio(nodosInfo[hasta].audio);
      setTimeout(function () { btn.classList.remove("incorrecto"); }, 500);
    }
  }

  cont.appendChild(wrap);
  cont.appendChild(crear("p", "subtitulo-zona", "Oraciones armadas:"));
  cont.appendChild(zonaResueltas);
  cont.appendChild(resultado);

  // Red de seguridad: aunque las imágenes ya reservan su tamaño por
  // CSS, un reflow tardío (fuentes, layout) también podría desalinear
  // alguna línea — un redibujado extra a los 400ms no tiene costo.
  setTimeout(redibujarTodo, 400);

  if (datos.audio) encolarAudio(datos.audio);
}
