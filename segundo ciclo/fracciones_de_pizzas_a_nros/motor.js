// =====================================================================
// MOTOR GENÉRICO - Profe Gustavo Aguilar / QueSepanTodos.com
// Paquete: Fracciones (4to grado) — v2 (ajustes de revisión)
// =====================================================================

var idxPantalla = 0;
var aciertos = 0;
var errores = 0;
var totalPreguntas = 0;

// ---- Cola de audio global (nunca se superponen dos audios) ----
var colaAudio = [];
var reproduciendo = false;
var audioActual = null;
var generacionAudio = 0;

function limpiarColaAudio() {
  generacionAudio++;
  colaAudio = [];
  reproduciendo = false;
  if (audioActual) {
    audioActual.pause();
    audioActual.onended = null;
    audioActual = null;
  }
  document.body.classList.remove("esperando-audio");
}

function encolarAudio(src, cb) {
  if (!src) { if (cb) cb(); return; }
  colaAudio.push({ src: src, cb: cb, gen: generacionAudio });
  procesarColaAudio();
}

function procesarColaAudio() {
  if (reproduciendo || colaAudio.length === 0) return;
  var item = colaAudio.shift();
  if (item.gen !== generacionAudio) { procesarColaAudio(); return; }
  reproduciendo = true;
  document.body.classList.add("esperando-audio");
  var audio = new Audio(item.src);
  audioActual = audio;
  var miGen = item.gen;
  audio.onended = function () {
    if (miGen !== generacionAudio) return;
    reproduciendo = false;
    document.body.classList.remove("esperando-audio");
    if (item.cb) item.cb();
    procesarColaAudio();
  };
  audio.onerror = function () {
    if (miGen !== generacionAudio) return;
    reproduciendo = false;
    document.body.classList.remove("esperando-audio");
    if (item.cb) item.cb();
    procesarColaAudio();
  };
  audio.play().catch(function () {
    if (miGen !== generacionAudio) return;
    reproduciendo = false;
    document.body.classList.remove("esperando-audio");
    if (item.cb) item.cb();
    procesarColaAudio();
  });
}

// ---- Tipos de pantalla que bloquean "Siguiente" hasta completar actividad ----
var TIPOS_CON_ACTIVIDAD = ["multiple", "clasificar", "asociar", "ordenar", "colorearFraccion", "puzzle"];

function iniciar() {
  totalPreguntas = contarActividades();
  idxPantalla = 0;
  aciertos = 0;
  errores = 0;
  renderPantalla();
}

function contarActividades() {
  var n = 0;
  DATOS.pantallas.forEach(function (p) {
    if (p.tipo === "multiple") n += p.preguntas.length;
    else if (p.tipo === "clasificar") n += p.items.length;
    else if (p.tipo === "asociar") n += p.pares.length;
    else if (p.tipo === "ordenar") n += p.items.length;
    else if (p.tipo === "colorearFraccion") n += p.figuras.length;
  });
  return n;
}

function irASiguiente() {
  if (idxPantalla < DATOS.pantallas.length - 1) {
    idxPantalla++;
    renderPantalla();
  }
}

function bloquearSiguiente(bloquear) {
  var btn = document.getElementById("btn-siguiente");
  if (!btn) return;
  btn.disabled = !!bloquear;
}

function renderPantalla() {
  limpiarColaAudio();
  var cont = document.getElementById("contenedor");
  cont.innerHTML = "";
  var p = DATOS.pantallas[idxPantalla];

  var necesitaActividad = TIPOS_CON_ACTIVIDAD.indexOf(p.tipo) !== -1;
  bloquearSiguiente(necesitaActividad);

  var navBar = document.getElementById("nav-inferior");
  navBar.style.display = (p.tipo === "portada" || p.tipo === "cierre") ? "none" : "flex";

  switch (p.tipo) {
    case "portada": renderPortada(p, cont); break;
    case "narracion": renderNarracion(p, cont); break;
    case "narracionAnimada": renderNarracionAnimada(p, cont); break;
    case "multiple": renderMultiple(p, cont); break;
    case "clasificar": renderClasificar(p, cont); break;
    case "asociar": renderAsociar(p, cont); break;
    case "ordenar": renderOrdenar(p, cont); break;
    case "colorearFraccion": renderColorearFraccion(p, cont); break;
    case "puzzle": renderPuzzle(p, cont); break;
    case "cierre": renderCierre(p, cont); break;
  }

  var barra = document.getElementById("progreso-barra");
  if (barra) {
    var pct = Math.round((idxPantalla / (DATOS.pantallas.length - 1)) * 100);
    barra.style.width = pct + "%";
  }
}

// ---------------------------------------------------------------
// UTILIDADES DE FRACCIONES (numerador/línea/denominador + SVG)
// ---------------------------------------------------------------

// Muestra una fracción en dígitos ("4/5") como fracción real:
// numerador arriba, línea horizontal, denominador abajo.
function fraccionHTML(num, den, idPrefix) {
  var idNum = idPrefix ? ' id="' + idPrefix + '-num"' : '';
  var idDen = idPrefix ? ' id="' + idPrefix + '-den"' : '';
  return '<span class="fraccion-real">' +
    '<span class="fr-num"' + idNum + '>' + num + '</span>' +
    '<span class="fr-den"' + idDen + '>' + den + '</span>' +
    '</span>';
}

// Detecta si un texto es una fracción en dígitos ("4/5") y devuelve
// {num, den} o null si no matchea.
function parsearFraccion(texto) {
  var m = /^(\d{1,2})\/(\d{1,2})$/.exec((texto || "").trim());
  if (!m) return null;
  return { num: parseInt(m[1], 10), den: parseInt(m[2], 10) };
}

// Si el texto es una fracción en dígitos, devuelve el HTML de fracción
// real; si no, devuelve el texto tal cual.
function textoOFraccionHTML(texto) {
  var frac = parsearFraccion(texto);
  if (frac) return fraccionHTML(frac.num, frac.den);
  return texto;
}

// Dibuja una fracción como pizza(s) SVG: numerador/denominador exactos,
// determinístico (sin IA). Si numerador > denominador, usa varias
// figuras (como corresponde a una fracción impropia).
// opts.contiguo (default true): partes coloreadas contiguas o salteadas.
function svgFiguraFraccion(numerador, denominador, opts) {
  opts = opts || {};
  var color = opts.color || "#ff8c42";
  var colorLinea = opts.colorLinea || "#1a1a1a";
  var contiguo = opts.contiguo !== false;
  var numFiguras = Math.max(1, Math.ceil(numerador / denominador));
  var diametro = numFiguras >= 3 ? 100 : 140;
  var espacio = 14;
  var totalAncho = numFiguras * diametro + (numFiguras - 1) * espacio;
  var alto = diametro;
  var svg = '<svg viewBox="0 0 ' + totalAncho + ' ' + alto + '" class="figura-fraccion-svg" preserveAspectRatio="xMidYMid meet">';
  var restante = numerador;

  for (var fi = 0; fi < numFiguras; fi++) {
    var cx = fi * (diametro + espacio) + diametro / 2;
    var cy = alto / 2;
    var r = diametro / 2 - 4;
    var coloreadasAqui = Math.min(denominador, restante);
    restante -= coloreadasAqui;

    var indicesColoreados = [];
    if (contiguo) {
      for (var k = 0; k < coloreadasAqui; k++) indicesColoreados.push(k);
    } else {
      for (var k2 = 0; k2 < coloreadasAqui; k2++) {
        indicesColoreados.push(Math.floor((k2 * denominador) / coloreadasAqui));
      }
    }

    if (denominador === 1) {
      var relleno1 = indicesColoreados.length > 0 ? color : "#ffffff";
      svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + relleno1 + '" stroke="' + colorLinea + '" stroke-width="2.5"/>';
      continue;
    }

    for (var s = 0; s < denominador; s++) {
      var a1 = (s / denominador) * 2 * Math.PI - Math.PI / 2;
      var a2 = ((s + 1) / denominador) * 2 * Math.PI - Math.PI / 2;
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      var largeArc = (a2 - a1) > Math.PI ? 1 : 0;
      var relleno = indicesColoreados.indexOf(s) !== -1 ? color : "#ffffff";
      svg += '<path d="M' + cx.toFixed(2) + ',' + cy.toFixed(2) +
        ' L' + x1.toFixed(2) + ',' + y1.toFixed(2) +
        ' A' + r + ',' + r + ' 0 ' + largeArc + ',1 ' + x2.toFixed(2) + ',' + y2.toFixed(2) + ' Z" ' +
        'fill="' + relleno + '" stroke="' + colorLinea + '" stroke-width="2.5" stroke-linejoin="round"/>';
    }
  }
  svg += '</svg>';
  return svg;
}

// ---------------------------------------------------------------
// PORTADA
// ---------------------------------------------------------------
function renderPortada(p, cont) {
  var html = '<div class="pantalla portada">' +
    '<h1>' + p.titulo + '</h1>' +
    (p.subtitulo ? '<h2>' + p.subtitulo + '</h2>' : '') +
    '<img class="imagen-portada" src="' + p.imagen + '" alt="' + p.titulo + '">' +
    '<button id="btn-comenzar" class="btn-primario">Comenzar</button>' +
    renderFotoPerfil() +
    '</div>';
  cont.innerHTML = html;
  document.getElementById("btn-comenzar").addEventListener("click", function () {
    irASiguiente();
  });
  activarLightbox();
  encolarAudio(p.audio);
}

// Bloque de foto de perfil: círculo clickeable + texto fijo debajo
// (siempre visible en pantalla, sin necesidad de abrir la foto).
// Al hacer clic se abre el lightbox: solo la foto ampliada con zoom
// (pellizco táctil o rueda/gestos en PC) y la frase personal debajo.
function renderFotoPerfil() {
  return '<div class="foto-perfil-wrap">' +
    '<img id="foto-perfil" class="foto-perfil" src="assets/images/profe.jpg" alt="Profe Gustavo Aguilar">' +
    '<p class="foto-perfil-caption">💻 Informática Educativa · Profe Gustavo Aguilar</p>' +
    '<p class="foto-perfil-email">✉️ profegustaaguilar@gmail.com</p>' +
    '</div>' +
    '<div id="lightbox" class="lightbox oculto">' +
    '<div class="lightbox-contenido">' +
    '<div class="lightbox-zoom-wrap" id="lightbox-zoom-wrap">' +
    '<img id="lightbox-imagen" class="lightbox-imagen" src="assets/images/profe.jpg" alt="Profe Gustavo Aguilar">' +
    '</div>' +
    '<p class="lightbox-tagline">Menos prisa, más vida 🧉🫂</p>' +
    '<p class="lightbox-ayuda-zoom">Pellizcá con dos dedos o usá el zoom de tu PC para acercar la imagen</p>' +
    '<button id="cerrar-lightbox" class="btn-secundario">Cerrar</button>' +
    '</div></div>';
}

function activarLightbox() {
  var foto = document.getElementById("foto-perfil");
  var lightbox = document.getElementById("lightbox");
  var cerrar = document.getElementById("cerrar-lightbox");
  if (foto && lightbox) {
    foto.addEventListener("click", function () {
      lightbox.classList.remove("oculto");
      activarZoomImagen();
    });
  }
  if (cerrar && lightbox) {
    cerrar.addEventListener("click", function () { lightbox.classList.add("oculto"); });
  }
}

// Zoom simple sobre la imagen del lightbox: pellizco (dos dedos) en
// táctil, rueda del mouse en PC, y doble click/doble tap para
// alternar entre 1x y 2.5x.
function activarZoomImagen() {
  var wrap = document.getElementById("lightbox-zoom-wrap");
  var img = document.getElementById("lightbox-imagen");
  if (!wrap || !img) return;

  var escala = 1;
  var ESCALA_MIN = 1, ESCALA_MAX = 3.5;
  var distanciaInicial = null;
  var escalaInicial = 1;

  function aplicarEscala() {
    img.style.transform = "scale(" + escala + ")";
  }

  img.style.transform = "scale(1)";

  wrap.addEventListener("wheel", function (ev) {
    ev.preventDefault();
    var delta = ev.deltaY < 0 ? 0.15 : -0.15;
    escala = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, escala + delta));
    aplicarEscala();
  }, { passive: false });

  wrap.addEventListener("dblclick", function () {
    escala = escala > 1 ? 1 : 2.5;
    aplicarEscala();
  });

  wrap.addEventListener("touchstart", function (ev) {
    if (ev.touches.length === 2) {
      var dx = ev.touches[0].clientX - ev.touches[1].clientX;
      var dy = ev.touches[0].clientY - ev.touches[1].clientY;
      distanciaInicial = Math.sqrt(dx * dx + dy * dy);
      escalaInicial = escala;
    }
  }, { passive: true });

  wrap.addEventListener("touchmove", function (ev) {
    if (ev.touches.length === 2 && distanciaInicial) {
      ev.preventDefault();
      var dx = ev.touches[0].clientX - ev.touches[1].clientX;
      var dy = ev.touches[0].clientY - ev.touches[1].clientY;
      var distanciaActual = Math.sqrt(dx * dx + dy * dy);
      escala = Math.min(ESCALA_MAX, Math.max(ESCALA_MIN,
        escalaInicial * (distanciaActual / distanciaInicial)));
      aplicarEscala();
    }
  }, { passive: false });

  wrap.addEventListener("touchend", function (ev) {
    if (ev.touches.length < 2) distanciaInicial = null;
  });
}

// ---------------------------------------------------------------
// NARRACIÓN (informativa estática, sin bloqueo)
// ---------------------------------------------------------------
function renderNarracion(p, cont) {
  var html = '<div class="pantalla narracion">' +
    '<h2>' + p.titulo + '</h2>' +
    (p.imagen ? '<img class="imagen-narracion" src="' + p.imagen + '" alt="' + p.titulo + '">' : '') +
    '<p class="texto-narracion">' + p.texto + '</p>' +
    '</div>';
  cont.innerHTML = html;
  encolarAudio(p.audio);
}

// ---------------------------------------------------------------
// NARRACIÓN ANIMADA (estándar global: señalización sincronizada al
// audio, estilo "Teo cuenta y suma", para pantallas conceptuales)
// ---------------------------------------------------------------
function renderNarracionAnimada(p, cont) {
  var html = '<div class="pantalla narracion-animada">' +
    '<h2>' + p.titulo + '</h2>' +
    '<div class="escena-animada" id="escena-animada">' +
    p.escenaHtml +
    '<div class="mano-indicadora oculto" id="mano-indicadora">👉</div>' +
    '<div class="etiqueta-paso oculto" id="etiqueta-paso"></div>' +
    '</div>' +
    '<p class="texto-narracion texto-narracion-animada">' + p.textoCompleto + '</p>' +
    '</div>';
  cont.innerHTML = html;

  // Si la pantalla pide una figura de fracción generada por código
  // (en vez de tenerla escrita a mano en el HTML de la escena), se
  // inserta acá, determinísticamente, igual que en el resto del motor.
  if (p.figurasFraccion) {
    p.figurasFraccion.forEach(function (fig) {
      var destino = document.getElementById(fig.targetId);
      if (destino) {
        destino.innerHTML = svgFiguraFraccion(fig.num, fig.den, { contiguo: fig.contiguo !== false });
      }
    });
  }

  function mostrarPaso(i) {
    var paso = p.pasos[i];
    var mano = document.getElementById("mano-indicadora");
    var etiqueta = document.getElementById("etiqueta-paso");
    var escena = document.getElementById("escena-animada");

    if (paso.targetId) {
      var el = document.getElementById(paso.targetId);
      if (el && mano && escena) {
        var rEl = el.getBoundingClientRect();
        var rEscena = escena.getBoundingClientRect();
        var xCentro = rEl.left - rEscena.left + rEl.width / 2;
        var yCentro = rEl.top - rEscena.top + rEl.height / 2;
        // La mano se corre a la izquierda del número para señalarlo
        // sin taparlo (el emoji 👉 apunta hacia la derecha).
        var xMano = rEl.left - rEscena.left - 10;
        mano.style.left = xMano + "px";
        mano.style.top = yCentro + "px";
        mano.classList.remove("oculto");
        if (etiqueta) {
          etiqueta.textContent = paso.texto || "";
          etiqueta.style.left = xCentro + "px";
          etiqueta.style.top = (rEl.top - rEscena.top - 34) + "px";
          etiqueta.classList.toggle("oculto", !paso.texto);
        }
      }
    } else {
      if (mano) mano.classList.add("oculto");
      if (etiqueta) etiqueta.classList.add("oculto");
    }

    encolarAudio(paso.audio, function () {
      if (i < p.pasos.length - 1) mostrarPaso(i + 1);
    });
  }

  mostrarPaso(0);
}

// ---------------------------------------------------------------
// MULTIPLE (opción múltiple, varias preguntas por pantalla)
// ---------------------------------------------------------------
function renderMultiple(p, cont) {
  var idxPregunta = 0;
  var respondidasOk = new Array(p.preguntas.length).fill(false);

  function renderPregunta(conInstruccion) {
    var q = p.preguntas[idxPregunta];
    var opciones = q.opciones.map(function (op, i) { return { texto: op, idx: i }; });
    var mezcladas = mezclarArray(opciones.slice());

    var figuraHtml = "";
    if (q.figuraFraccion) {
      figuraHtml = '<div class="figura-fraccion-wrap">' +
        svgFiguraFraccion(q.figuraFraccion.num, q.figuraFraccion.den, { contiguo: true }) +
        '</div>';
    }

    var html = '<div class="pantalla multiple">' +
      '<h2>' + p.titulo + '</h2>' +
      '<p class="instruccion">' + p.instruccion + '</p>' +
      '<p class="contador-pregunta">Pregunta ' + (idxPregunta + 1) + ' de ' + p.preguntas.length + '</p>' +
      '<p class="pregunta-texto">' + q.pregunta + '</p>' +
      (q.imagen ? '<img class="imagen-pregunta" src="' + q.imagen + '" alt="pregunta">' : '') +
      figuraHtml +
      '<div class="opciones-lista"></div>' +
      '<p class="feedback oculto" id="feedback-multiple"></p>' +
      '</div>';
    cont.innerHTML = html;

    var lista = cont.querySelector(".opciones-lista");
    // Si todas las opciones son cortas (fracciones o una sola palabra),
    // se acomodan en grilla de 2 columnas para no desperdiciar espacio
    // a los costados ni estirar la pantalla hacia abajo.
    var todasCortas = q.opciones.every(function (t) {
      return parsearFraccion(t) !== null || (t.indexOf(" ") === -1 && t.length <= 10);
    });
    if (todasCortas) lista.classList.add("opciones-lista-grid");
    mezcladas.forEach(function (op) {
      var btn = document.createElement("button");
      btn.className = "opcion-btn";
      btn.innerHTML = textoOFraccionHTML(op.texto);
      btn.addEventListener("click", function () {
        if (document.body.classList.contains("esperando-audio")) return;
        if (respondidasOk[idxPregunta]) return;
        if (op.idx === q.correcta) {
          btn.classList.add("correcta");
          respondidasOk[idxPregunta] = true;
          aciertos++;
          var fb = document.getElementById("feedback-multiple");
          fb.textContent = q.textoCorrecta;
          fb.classList.remove("oculto");
          fb.classList.add("ok");
          deshabilitarOpciones();
          encolarAudio(q.audioCorrecta, function () {
            avanzarOSiguientePregunta();
          });
        } else {
          btn.classList.add("incorrecta");
          errores++;
          btn.disabled = true;
        }
      });
      lista.appendChild(btn);
    });

    function deshabilitarOpciones() {
      lista.querySelectorAll(".opcion-btn").forEach(function (b) { b.disabled = true; });
    }

    // El contenido (incluida imagen/figura) ya está visible; el audio
    // se reproduce en paralelo, nunca antes de mostrar la pantalla.
    if (conInstruccion) encolarAudio(p.audioInstruccion);
    encolarAudio(q.audioPregunta);
  }

  function avanzarOSiguientePregunta() {
    if (idxPregunta < p.preguntas.length - 1) {
      idxPregunta++;
      renderPregunta(false);
    } else {
      bloquearSiguiente(false);
    }
  }

  renderPregunta(true);
}

// ---------------------------------------------------------------
// CLASIFICAR (tap-to-select en categorías, con vista previa de figura)
// ---------------------------------------------------------------
function renderClasificar(p, cont) {
  var pendientes = p.items.map(function (it, i) { return i; });
  pendientes = mezclarArray(pendientes);
  var completados = 0;
  var conFigura = !!p.mostrarFigura;

  var html = '<div class="pantalla clasificar">' +
    '<h2>' + p.titulo + '</h2>' +
    '<p class="instruccion">' + p.instruccion + '</p>' +
    '<div class="items-clasificar"></div>' +
    (conFigura ? '<div class="figura-clasificar-preview" id="figura-clasificar-preview"></div>' : '') +
    '<div class="categorias-clasificar"></div>' +
    '<p class="feedback oculto" id="feedback-clasificar"></p>' +
    '</div>';
  cont.innerHTML = html;

  var contItems = cont.querySelector(".items-clasificar");
  var contCategorias = cont.querySelector(".categorias-clasificar");

  var seleccionado = null;

  pendientes.forEach(function (i) {
    var it = p.items[i];
    var chip = document.createElement("button");
    chip.className = "item-chip";
    chip.innerHTML = textoOFraccionHTML(it.texto);
    chip.dataset.idx = i;
    chip.addEventListener("click", function () {
      if (document.body.classList.contains("esperando-audio")) return;
      if (chip.classList.contains("resuelto")) return;
      contItems.querySelectorAll(".item-chip").forEach(function (c) { c.classList.remove("seleccionado"); });
      chip.classList.add("seleccionado");
      seleccionado = i;
      if (conFigura) {
        var frac = parsearFraccion(it.texto);
        var previewEl = document.getElementById("figura-clasificar-preview");
        if (frac && previewEl) {
          previewEl.innerHTML = svgFiguraFraccion(frac.num, frac.den, { contiguo: false });
        }
      }
    });
    contItems.appendChild(chip);
  });

  p.categorias.forEach(function (catNombre, catIdx) {
    var catBtn = document.createElement("button");
    catBtn.className = "categoria-btn";
    catBtn.textContent = catNombre;
    catBtn.addEventListener("click", function () {
      if (document.body.classList.contains("esperando-audio")) return;
      if (seleccionado === null) return;
      var it = p.items[seleccionado];
      var chip = contItems.querySelector('.item-chip[data-idx="' + seleccionado + '"]');
      var fb = document.getElementById("feedback-clasificar");
      if (it.categoria === catIdx) {
        chip.classList.add("resuelto", "correcta");
        chip.disabled = true;
        aciertos++;
        completados++;
        fb.textContent = it.textoConfirmacion;
        fb.className = "feedback ok";
        seleccionado = null;
        encolarAudio(it.audio, function () {
          if (completados === p.items.length) bloquearSiguiente(false);
        });
      } else {
        errores++;
        chip.classList.add("shake");
        setTimeout(function () { chip.classList.remove("shake"); }, 400);
      }
    });
    contCategorias.appendChild(catBtn);
  });

  encolarAudio(p.audioInstruccion);
}

// ---------------------------------------------------------------
// ASOCIAR (unir dos columnas)
// ---------------------------------------------------------------
function renderAsociar(p, cont) {
  var izquierda = p.pares.map(function (par, i) { return { texto: par.izquierda, idx: i }; });
  var derecha = p.pares.map(function (par, i) { return { texto: par.derecha, idx: i }; });
  izquierda = mezclarArray(izquierda);
  derecha = mezclarArray(derecha);
  var resueltos = 0;
  var selIzq = null;

  var html = '<div class="pantalla asociar">' +
    '<h2>' + p.titulo + '</h2>' +
    '<p class="instruccion">' + p.instruccion + '</p>' +
    '<div class="asociar-columnas">' +
    '<div class="columna-izquierda"></div>' +
    '<div class="columna-derecha"></div>' +
    '</div>' +
    '<p class="feedback oculto" id="feedback-asociar"></p>' +
    '</div>';
  cont.innerHTML = html;

  var colIzq = cont.querySelector(".columna-izquierda");
  var colDer = cont.querySelector(".columna-derecha");

  izquierda.forEach(function (el) {
    var btn = document.createElement("button");
    btn.className = "asociar-chip";
    btn.innerHTML = textoOFraccionHTML(el.texto);
    btn.dataset.idx = el.idx;
    btn.addEventListener("click", function () {
      if (document.body.classList.contains("esperando-audio")) return;
      if (btn.classList.contains("resuelto")) return;
      colIzq.querySelectorAll(".asociar-chip").forEach(function (c) { c.classList.remove("seleccionado"); });
      btn.classList.add("seleccionado");
      selIzq = el.idx;
    });
    colIzq.appendChild(btn);
  });

  derecha.forEach(function (el) {
    var btn = document.createElement("button");
    btn.className = "asociar-chip";
    btn.textContent = el.texto;
    btn.dataset.idx = el.idx;
    btn.addEventListener("click", function () {
      if (document.body.classList.contains("esperando-audio")) return;
      if (selIzq === null) return;
      if (btn.classList.contains("resuelto")) return;
      var fb = document.getElementById("feedback-asociar");
      if (el.idx === selIzq) {
        var izqBtn = colIzq.querySelector('.asociar-chip[data-idx="' + selIzq + '"]');
        izqBtn.classList.add("resuelto", "correcta");
        izqBtn.disabled = true;
        btn.classList.add("resuelto", "correcta");
        btn.disabled = true;
        aciertos++;
        resueltos++;
        fb.textContent = p.pares[el.idx].izquierda + " es " + p.pares[el.idx].derecha + ".";
        fb.className = "feedback ok";
        var audioPar = p.pares[el.idx].audio;
        selIzq = null;
        encolarAudio(audioPar, function () {
          if (resueltos === p.pares.length) bloquearSiguiente(false);
        });
      } else {
        errores++;
        btn.classList.add("shake");
        setTimeout(function () { btn.classList.remove("shake"); }, 400);
      }
    });
    colDer.appendChild(btn);
  });

  encolarAudio(p.audioInstruccion);
}

// ---------------------------------------------------------------
// ORDENAR (tocar en secuencia correcta; apila figura+orden al acertar)
// ---------------------------------------------------------------
function renderOrdenar(p, cont) {
  var items = p.items.map(function (it, i) { return { texto: it.texto, orden: it.orden, audio: it.audio, idx: i }; });
  items = mezclarArray(items);
  var siguienteOrden = 1;

  var html = '<div class="pantalla ordenar">' +
    '<h2>' + p.titulo + '</h2>' +
    '<p class="instruccion">' + p.instruccion + '</p>' +
    '<div class="items-ordenar"></div>' +
    '<div class="ordenar-figuras-lista" id="ordenar-figuras-lista"></div>' +
    '<p class="feedback oculto" id="feedback-ordenar"></p>' +
    '</div>';
  cont.innerHTML = html;

  var contItems = cont.querySelector(".items-ordenar");
  var contFiguras = document.getElementById("ordenar-figuras-lista");

  items.forEach(function (it) {
    var btn = document.createElement("button");
    btn.className = "item-chip";
    btn.innerHTML = textoOFraccionHTML(it.texto);
    btn.addEventListener("click", function () {
      if (document.body.classList.contains("esperando-audio")) return;
      if (btn.classList.contains("resuelto")) return;
      var fb = document.getElementById("feedback-ordenar");
      if (it.orden === siguienteOrden) {
        btn.classList.add("resuelto", "correcta");
        btn.disabled = true;
        var span = document.createElement("span");
        span.className = "orden-numero";
        span.textContent = siguienteOrden;
        btn.prepend(span);
        aciertos++;

        var frac = parsearFraccion(it.texto);
        if (frac && contFiguras) {
          var fila = document.createElement("div");
          fila.className = "ordenar-figura-fila";
          fila.innerHTML = '<span class="orden-numero-grande">' + siguienteOrden + '</span>' +
            svgFiguraFraccion(frac.num, frac.den, { contiguo: true });
          contFiguras.appendChild(fila);
        }

        siguienteOrden++;
        var completo = siguienteOrden > items.length;
        encolarAudio(it.audio, function () {
          if (completo) {
            fb.textContent = "¡Muy bien! Las ordenaste todas correctamente.";
            fb.className = "feedback ok";
            encolarAudio(p.audioFelicitacion, function () {
              bloquearSiguiente(false);
            });
          }
        });
      } else {
        errores++;
        btn.classList.add("shake");
        setTimeout(function () { btn.classList.remove("shake"); }, 400);
      }
    });
    contItems.appendChild(btn);
  });

  encolarAudio(p.audioInstruccion);
}

// ---------------------------------------------------------------
// COLOREAR FRACCIÓN (tocar partes hasta llegar a la fracción pedida)
// ---------------------------------------------------------------
function renderColorearFraccion(p, cont) {
  var idxFigura = 0;

  function renderFigura(conInstruccion) {
    var f = p.figuras[idxFigura];
    var html = '<div class="pantalla colorear-fraccion">' +
      '<h2>' + p.titulo + '</h2>' +
      '<p class="instruccion">' + p.instruccion + '</p>' +
      '<p class="contador-pregunta">Figura ' + (idxFigura + 1) + ' de ' + p.figuras.length + '</p>' +
      '<p class="objetivo-fraccion">Coloreá ' + fraccionHTML(f.numerador, f.denominador) + ' de la figura</p>' +
      '<div class="figura-svg-wrap" id="figura-svg-wrap"></div>' +
      '<button id="btn-verificar" class="btn-secundario">Verificar</button>' +
      '<p class="feedback oculto" id="feedback-colorear"></p>' +
      '</div>';
    cont.innerHTML = html;

    var wrap = document.getElementById("figura-svg-wrap");
    wrap.innerHTML = generarFiguraSVG(f.forma, f.partes);

    var partes = wrap.querySelectorAll(".parte-figura");
    partes.forEach(function (parte) {
      parte.addEventListener("click", function () {
        parte.classList.toggle("coloreada");
      });
    });

    document.getElementById("btn-verificar").addEventListener("click", function () {
      var coloreadas = wrap.querySelectorAll(".parte-figura.coloreada").length;
      var fb = document.getElementById("feedback-colorear");
      if (coloreadas === f.numerador) {
        fb.textContent = f.textoCorrecta;
        fb.className = "feedback ok";
        partes.forEach(function (parte) { parte.style.pointerEvents = "none"; });
        document.getElementById("btn-verificar").disabled = true;
        aciertos++;
        encolarAudio(f.audioCorrecta, function () { avanzarOFigura(); });
      } else {
        fb.textContent = "Todavía no. Revisá cuántas partes coloreaste.";
        fb.className = "feedback error";
        errores++;
      }
    });

    if (conInstruccion) encolarAudio(p.audioInstruccion);
    encolarAudio(f.audioConsigna);
  }

  function avanzarOFigura() {
    if (idxFigura < p.figuras.length - 1) {
      idxFigura++;
      renderFigura(false);
    } else {
      bloquearSiguiente(false);
    }
  }

  renderFigura(true);
}

function generarFiguraSVG(forma, partes) {
  var w = 300, h = 220, cx = w / 2, cy = h / 2;
  if (forma === "circulo") {
    var r = 90;
    var paths = "";
    for (var i = 0; i < partes; i++) {
      var a1 = (i / partes) * 2 * Math.PI - Math.PI / 2;
      var a2 = ((i + 1) / partes) * 2 * Math.PI - Math.PI / 2;
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      var largeArc = (a2 - a1) > Math.PI ? 1 : 0;
      paths += '<path class="parte-figura" d="M' + cx + ',' + cy + ' L' + x1 + ',' + y1 +
        ' A' + r + ',' + r + ' 0 ' + largeArc + ',1 ' + x2 + ',' + y2 + ' Z"></path>';
    }
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" class="figura-svg">' + paths + '</svg>';
  } else if (forma === "grilla") {
    var cols = partes <= 6 ? 3 : 4;
    var rows = Math.ceil(partes / cols);
    var cellW = w / cols, cellH = h / rows;
    var rects = "";
    var n = 0;
    for (var r2 = 0; r2 < rows && n < partes; r2++) {
      for (var c2 = 0; c2 < cols && n < partes; c2++) {
        rects += '<rect class="parte-figura" x="' + (c2 * cellW) + '" y="' + (r2 * cellH) +
          '" width="' + cellW + '" height="' + cellH + '"></rect>';
        n++;
      }
    }
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" class="figura-svg">' + rects + '</svg>';
  } else {
    // rectangulo dividido en columnas verticales
    var cw = w / partes;
    var rects2 = "";
    for (var j = 0; j < partes; j++) {
      rects2 += '<rect class="parte-figura" x="' + (j * cw) + '" y="0" width="' + cw + '" height="' + h + '"></rect>';
    }
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" class="figura-svg">' + rects2 + '</svg>';
  }
}

// ---------------------------------------------------------------
// ROMPECABEZAS DE FRACCIONES (arrastrar y soltar, piezas con
// muescas redondeadas que encastran, generadas por código)
// ---------------------------------------------------------------
function generarSignosPuzzle(filas, columnas, seed) {
  var s = seed;
  function rand() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  }
  var horiz = [];
  for (var r = 0; r < filas - 1; r++) {
    horiz.push([]);
    for (var c = 0; c < columnas; c++) horiz[r].push(rand() < 0.5 ? 1 : -1);
  }
  var vert = [];
  for (var r2 = 0; r2 < filas; r2++) {
    vert.push([]);
    for (var c2 = 0; c2 < columnas - 1; c2++) vert[r2].push(rand() < 0.5 ? 1 : -1);
  }
  return { horiz: horiz, vert: vert };
}

function signosDePiezaPuzzle(r, c, filas, columnas, signos) {
  var top = r === 0 ? 0 : -signos.horiz[r - 1][c];
  var bottom = r === filas - 1 ? 0 : signos.horiz[r][c];
  var left = c === 0 ? 0 : -signos.vert[r][c - 1];
  var right = c === columnas - 1 ? 0 : signos.vert[r][c];
  return { top: top, right: right, bottom: bottom, left: left };
}

function generarPiezaPathPuzzle(W, H, edges, r) {
  var sf = { top: 1, right: 1, bottom: 1, left: 1 };
  var d = "M 0 0 ";

  if (edges.top === 0) {
    d += "L " + W + " 0 ";
  } else {
    var midT = W / 2;
    var sweepT = edges.top === 1 ? sf.top : 1 - sf.top;
    d += "L " + (midT - r) + " 0 A " + r + " " + r + " 0 0 " + sweepT + " " + (midT + r) + " 0 L " + W + " 0 ";
  }

  if (edges.right === 0) {
    d += "L " + W + " " + H + " ";
  } else {
    var midR = H / 2;
    var sweepR = edges.right === 1 ? sf.right : 1 - sf.right;
    d += "L " + W + " " + (midR - r) + " A " + r + " " + r + " 0 0 " + sweepR + " " + W + " " + (midR + r) + " L " + W + " " + H + " ";
  }

  if (edges.bottom === 0) {
    d += "L 0 " + H + " ";
  } else {
    var midB = W / 2;
    var sweepB = edges.bottom === 1 ? sf.bottom : 1 - sf.bottom;
    d += "L " + (midB + r) + " " + H + " A " + r + " " + r + " 0 0 " + sweepB + " " + (midB - r) + " " + H + " L 0 " + H + " ";
  }

  if (edges.left === 0) {
    d += "Z";
  } else {
    var midL = H / 2;
    var sweepL = edges.left === 1 ? sf.left : 1 - sf.left;
    d += "L 0 " + (midL + r) + " A " + r + " " + r + " 0 0 " + sweepL + " 0 " + (midL - r) + " L 0 0 Z";
  }

  return d;
}

// Sonidos de acierto/error del rompecabezas: generados por código
// (Web Audio API), sin depender de ningún archivo de audio.
var audioCtxPuzzle = null;
function reproducirTonoPuzzle(frecuencias, duracion) {
  try {
    if (!audioCtxPuzzle) audioCtxPuzzle = new (window.AudioContext || window.webkitAudioContext)();
    var ahora = audioCtxPuzzle.currentTime;
    frecuencias.forEach(function (freq, i) {
      var osc = audioCtxPuzzle.createOscillator();
      var gain = audioCtxPuzzle.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.16, ahora + i * duracion);
      gain.gain.exponentialRampToValueAtTime(0.001, ahora + (i + 1) * duracion);
      osc.connect(gain);
      gain.connect(audioCtxPuzzle.destination);
      osc.start(ahora + i * duracion);
      osc.stop(ahora + (i + 1) * duracion);
    });
  } catch (e) { /* Web Audio no disponible: se ignora en silencio */ }
}
function sonidoCorrectoPuzzle() { reproducirTonoPuzzle([660, 880], 0.12); }
function sonidoIncorrectoPuzzle() { reproducirTonoPuzzle([220, 165], 0.15); }

function renderPuzzle(p, cont) {
  var filas = p.filas, columnas = p.columnas;
  var signos = generarSignosPuzzle(filas, columnas, p.seed || 1);
  var totalPiezas = filas * columnas;
  var colocadas = 0;

  var htmlInicial = '<div class="pantalla puzzle">' +
    '<h2>' + p.titulo + '</h2>' +
    '<p class="instruccion">' + p.instruccion + '</p>' +
    '<p class="contador-pregunta" id="puzzle-contador">0 de ' + totalPiezas + ' piezas ubicadas</p>' +
    '<div class="puzzle-campo" id="puzzle-campo"></div>' +
    '<p class="feedback oculto" id="feedback-puzzle"></p>' +
    '</div>';
  cont.innerHTML = htmlInicial;

  // Piezas con muescas redondeadas que encastran (estilo del
  // rompecabezas original en papel). Tamaño responsive: entra sin
  // scroll horizontal ni vertical, ni en celular ni en notebook.
  var pantallaEl = cont.querySelector(".pantalla");
  var anchoDisponible = pantallaEl.clientWidth || 320;
  var ALTO_OBJETIVO = 430;
  var factorPad = 1.44;
  var trayCols = columnas;
  var cellSize;
  var maxTrayCols = Math.min(totalPiezas, 8);
  while (true) {
    cellSize = Math.floor(anchoDisponible / (trayCols * factorPad));
    cellSize = Math.max(30, Math.min(60, cellSize));
    var boxSizeProb = Math.round(cellSize * factorPad);
    var altoProb = filas * cellSize + 24 + Math.ceil(totalPiezas / trayCols) * boxSizeProb + 20;
    if (altoProb <= ALTO_OBJETIVO || trayCols >= maxTrayCols) break;
    trayCols++;
  }
  var pad = Math.round(cellSize * 0.22);
  var boxSize = cellSize + 2 * pad;

  var frameW = columnas * cellSize;
  var frameH = filas * cellSize;
  var campoAncho = Math.max(frameW, trayCols * boxSize);
  var frameLeft = Math.round((campoAncho - frameW) / 2);
  var trayTop = frameH + 24;
  var trayH = Math.ceil(totalPiezas / trayCols) * boxSize + 20;
  var campoAlto = trayTop + trayH;

  var campo = document.getElementById("puzzle-campo");
  campo.style.width = campoAncho + "px";
  campo.style.height = campoAlto + "px";

  // Marco guía: SOLO los contornos con la forma de cada pieza (sin
  // ninguna imagen ni pista de color detrás).
  var marcoSvg = '<svg width="' + frameW + '" height="' + frameH + '" viewBox="0 0 ' + frameW + ' ' + frameH + '" class="puzzle-marco-svg">';
  for (var rr = 0; rr < filas; rr++) {
    for (var cc = 0; cc < columnas; cc++) {
      var edgesSlot = signosDePiezaPuzzle(rr, cc, filas, columnas, signos);
      var dSlot = generarPiezaPathPuzzle(cellSize, cellSize, edgesSlot, pad * 0.8);
      marcoSvg += '<path d="' + dSlot + '" transform="translate(' + (cc * cellSize) + ',' + (rr * cellSize) + ')" ' +
        'fill="#fff8ef" stroke="#e0b98a" stroke-width="2"></path>';
    }
  }
  marcoSvg += '</svg>';

  var marcoDiv = document.createElement("div");
  marcoDiv.className = "puzzle-marco";
  marcoDiv.style.left = frameLeft + "px";
  marcoDiv.style.top = "0px";
  marcoDiv.style.width = frameW + "px";
  marcoDiv.style.height = frameH + "px";
  marcoDiv.innerHTML = marcoSvg;
  campo.appendChild(marcoDiv);

  // Posiciones "hogar" (correctas, dentro del marco) de cada pieza,
  // y posiciones iniciales desordenadas dentro de la bandeja.
  var piezas = [];
  var idx = 0;
  for (var r = 0; r < filas; r++) {
    for (var c = 0; c < columnas; c++) {
      piezas.push({
        r: r, c: c,
        homeLeft: frameLeft + c * cellSize - pad,
        homeTop: r * cellSize - pad,
        idx: idx
      });
      idx++;
    }
  }
  var orden = mezclarArray(piezas.map(function (x, i) { return i; }));

  orden.forEach(function (piezaIdx, posicion) {
    var pieza = piezas[piezaIdx];
    var edges = signosDePiezaPuzzle(pieza.r, pieza.c, filas, columnas, signos);
    var d = generarPiezaPathPuzzle(cellSize, cellSize, edges, pad * 0.8);
    var clipId = "puzzle-clip-" + pieza.r + "-" + pieza.c;

    var trayCol = posicion % trayCols;
    var trayRow = Math.floor(posicion / trayCols);
    var startLeft = trayCol * boxSize;
    var startTop = trayTop + trayRow * boxSize;

    var div = document.createElement("div");
    div.className = "pieza-puzzle";
    div.dataset.r = pieza.r;
    div.dataset.c = pieza.c;
    div.dataset.homeLeft = pieza.homeLeft;
    div.dataset.homeTop = pieza.homeTop;
    div.dataset.trayLeft = startLeft;
    div.dataset.trayTop = startTop;
    div.style.width = boxSize + "px";
    div.style.height = boxSize + "px";
    div.style.left = startLeft + "px";
    div.style.top = startTop + "px";

    var imgX = -(pieza.c * cellSize) + pad;
    var imgY = -(pieza.r * cellSize) + pad;
    div.innerHTML =
      '<svg width="' + boxSize + '" height="' + boxSize + '" viewBox="0 0 ' + boxSize + ' ' + boxSize + '">' +
      '<defs><clipPath id="' + clipId + '"><path d="' + d + '" transform="translate(' + pad + ',' + pad + ')"></path></clipPath></defs>' +
      '<g clip-path="url(#' + clipId + ')">' +
      '<rect x="0" y="0" width="' + boxSize + '" height="' + boxSize + '" fill="#ffffff"></rect>' +
      '<image href="' + p.imagen + '" x="' + imgX + '" y="' + imgY + '" width="' + frameW + '" height="' + frameH + '"></image>' +
      '</g>' +
      '<path d="' + d + '" transform="translate(' + pad + ',' + pad + ')" fill="none" stroke="#2a2a2a" stroke-width="2"></path>' +
      '</svg>';

    campo.appendChild(div);

    var dragging = false;
    var offsetX = 0, offsetY = 0;

    function alPresionar(ev) {
      if (document.body.classList.contains("esperando-audio")) return;
      if (div.classList.contains("colocada")) return;
      dragging = true;
      div.classList.add("arrastrando");
      var pt = ev.touches ? ev.touches[0] : ev;
      var rectCampo = campo.getBoundingClientRect();
      offsetX = pt.clientX - rectCampo.left - parseFloat(div.style.left);
      offsetY = pt.clientY - rectCampo.top - parseFloat(div.style.top);
      div.style.zIndex = 50;
      ev.preventDefault();
    }

    function alMover(ev) {
      if (!dragging) return;
      var pt = ev.touches ? ev.touches[0] : ev;
      var rectCampo = campo.getBoundingClientRect();
      var nuevoLeft = pt.clientX - rectCampo.left - offsetX;
      var nuevoTop = pt.clientY - rectCampo.top - offsetY;
      div.style.left = nuevoLeft + "px";
      div.style.top = nuevoTop + "px";
      ev.preventDefault();
    }

    function alSoltar() {
      if (!dragging) return;
      dragging = false;
      div.classList.remove("arrastrando");
      div.style.zIndex = 10;
      var actualLeft = parseFloat(div.style.left);
      var actualTop = parseFloat(div.style.top);

      // Buscar el lugar del marco más cercano a donde soltó la pieza
      // (propio o ajeno), para distinguir acierto de error real.
      var distPropia = Math.hypot(actualLeft - pieza.homeLeft, actualTop - pieza.homeTop);
      var umbral = cellSize * 0.35;

      if (distPropia < umbral) {
        div.style.left = pieza.homeLeft + "px";
        div.style.top = pieza.homeTop + "px";
        div.classList.add("colocada");
        sonidoCorrectoPuzzle();
        colocadas++;
        document.getElementById("puzzle-contador").textContent = colocadas + " de " + totalPiezas + " piezas ubicadas";
        if (colocadas === totalPiezas) {
          var fb = document.getElementById("feedback-puzzle");
          fb.textContent = "¡Armaste el rompecabezas completo!";
          fb.className = "feedback ok";
          encolarAudio(p.audioCompleto, function () { bloquearSiguiente(false); });
        }
        return;
      }

      var minDist = Infinity;
      piezas.forEach(function (otra) {
        var dist = Math.hypot(actualLeft - otra.homeLeft, actualTop - otra.homeTop);
        if (dist < minDist) minDist = dist;
      });
      if (minDist < umbral) {
        // Soltó la pieza en un lugar del marco que no es el suyo.
        sonidoIncorrectoPuzzle();
        div.classList.add("shake");
        setTimeout(function () { div.classList.remove("shake"); }, 400);
        div.style.left = div.dataset.trayLeft + "px";
        div.style.top = div.dataset.trayTop + "px";
      }
      // Si no soltó cerca de ningún lugar del marco, se queda donde
      // la dejó (sigue en la bandeja, sin sonido ni penalidad).
    }

    div.addEventListener("mousedown", alPresionar);
    div.addEventListener("touchstart", alPresionar, { passive: false });
    window.addEventListener("mousemove", alMover);
    window.addEventListener("touchmove", alMover, { passive: false });
    window.addEventListener("mouseup", alSoltar);
    window.addEventListener("touchend", alSoltar);
  });

  encolarAudio(p.audioInstruccion);
}


// ---------------------------------------------------------------
// CIERRE
// ---------------------------------------------------------------
function renderCierre(p, cont) {
  var intentos = aciertos + errores;
  var pct = intentos > 0 ? Math.round((aciertos / intentos) * 100) : 100;
  var html = '<div class="pantalla cierre">' +
    '<h1>' + p.titulo + '</h1>' +
    '<img class="imagen-cierre" src="' + p.imagen + '" alt="Cierre">' +
    '<div class="resultados">' +
    '<p>✅ Aciertos: ' + aciertos + '</p>' +
    '<p>❌ Errores: ' + errores + '</p>' +
    '<p>⭐ Total: ' + pct + '%</p>' +
    '</div>' +
    '<button id="btn-jugar-de-nuevo" class="btn-primario">Volver a jugar</button>' +
    renderFotoPerfil() +
    '</div>';
  cont.innerHTML = html;
  document.getElementById("btn-jugar-de-nuevo").addEventListener("click", function () {
    iniciar();
  });
  activarLightbox();
  encolarAudio(p.audio);
}

// ---------------------------------------------------------------
// UTILIDADES
// ---------------------------------------------------------------
function mezclarArray(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

document.addEventListener("DOMContentLoaded", function () {
  iniciar();
  var btnSig = document.getElementById("btn-siguiente");
  if (btnSig) {
    btnSig.addEventListener("click", function () {
      if (document.body.classList.contains("esperando-audio")) return;
      irASiguiente();
    });
  }
});
