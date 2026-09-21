// motor.js — motor genérico del paquete "Manos que Cuidan"
// QueSepanTodos.com — Profe Gustavo Aguilar
// Arquitectura de 3 archivos: index.html + datos.js + motor.js (este archivo)

(function () {
  "use strict";

  // ---------- Estado global ----------
  const state = {
    indice: 0,
    aciertos: 0,
    errores: 0,
    puntos: 0,
    evaluados: {},      // id -> true una vez evaluado en el primer intento
    ciclo: null,        // "primerCiclo" | "segundoCiclo"
    audioQueue: [],
    audioPlaying: false,
    audioGenCounter: 0, // evita condición de carrera si se dispara una nueva cola mientras suena la anterior
  };

  const ORDEN_PANTALLAS = [
    "portada",
    "video",
    "ciclo",
    "explicacion",
    "asociarMomentos",
    "ordenarPasos",
    "asociarPasos",
    "cronometro",
    "triviaTecnica",
    "sopaDeLetras",
    "armarOracion",
    "cierre",
  ];

  // ---------- Helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function el(tag, cls, txt) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function audioUrl(id) { return "audio/" + id + ".mp3"; }

  // Intervalo activo (usado por el cronómetro): se limpia siempre al
  // cambiar de pantalla, para que no siga corriendo en segundo plano.
  let intervaloActivo = null;
  function limpiarIntervalo() {
    if (intervaloActivo) { clearInterval(intervaloActivo); intervaloActivo = null; }
  }

  // Devuelve la variante de un dato según el ciclo elegido (o "segundoCiclo"
  // por defecto, para que el modo revisión y cualquier estado sin ciclo
  // elegido funcionen igual).
  function porCiclo(obj) {
    return obj[state.ciclo] || obj.segundoCiclo;
  }

  // ---------- Efectos de sonido (acierto / error) ----------
  // Se generan por código (Web Audio API) para no depender de mp3 sueltos.
  let _ctxAudioFx = null;
  function tono(frecuencias, duracionMs) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!_ctxAudioFx) _ctxAudioFx = new AC();
      const ctx = _ctxAudioFx;
      if (ctx.state === "suspended") ctx.resume(); // algunos navegadores lo crean pausado
      const ahora = ctx.currentTime;
      frecuencias.forEach(function (freq, i) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const inicio = ahora + i * (duracionMs / 1000);
        gain.gain.setValueAtTime(0.0001, inicio);
        gain.gain.exponentialRampToValueAtTime(0.22, inicio + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, inicio + duracionMs / 1000);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(inicio);
        osc.stop(inicio + duracionMs / 1000 + 0.03);
      });
    } catch (e) { /* silencioso: si el navegador bloquea audio, no rompe el juego */ }
  }
  function tonoAcierto() { tono([660, 880], 110); }
  function tonoError() { tono([220], 180); }

  // ---------- Cola de audio global (sin superposición) ----------
  const playerEl = new Audio();
  playerEl.preload = "auto";

  function detenerAudio() {
    state.audioGenCounter++;
    state.audioQueue = [];
    state.audioPlaying = false;
    try { playerEl.pause(); playerEl.currentTime = 0; } catch (e) {}
  }

  function reproducirCola(ids, onAllDone, ignorarAudioParaSiguiente) {
    detenerAudio();
    const miGen = state.audioGenCounter;
    // Nota: no se toca el estado del botón Continuar al iniciar la
    // reproducción — lo controla quien llama (setBtnSiguienteHabilitado
    // antes de esta llamada) y, si ignorarAudioParaSiguiente es falso,
    // se habilita automáticamente recién cuando termina este audio.
    if (!ids || !ids.length) {
      if (!ignorarAudioParaSiguiente) setBtnSiguienteHabilitado(true);
      if (onAllDone) onAllDone();
      return;
    }
    let idx = 0;
    function playNext() {
      if (miGen !== state.audioGenCounter) return; // se canceló / cambió de pantalla
      if (idx >= ids.length) {
        state.audioPlaying = false;
        if (!ignorarAudioParaSiguiente) setBtnSiguienteHabilitado(true);
        if (onAllDone) onAllDone();
        return;
      }
      state.audioPlaying = true;
      playerEl.src = audioUrl(ids[idx]);
      idx++;
      playerEl.onended = playNext;
      playerEl.onerror = playNext; // si falta un mp3 puntual, no traba el flujo
      try {
        const p = playerEl.play();
        if (p && typeof p.catch === "function") p.catch(playNext);
      } catch (e) {
        playNext();
      }
    }
    playNext();
  }

  function setBtnSiguienteHabilitado(v) {
    const btn = $("#btnSiguiente");
    if (btn) btn.disabled = !v;
  }

  // ---------- Navegación ----------
  // Paquete final: sin botones de avanzar/retroceder manuales — cada
  // pantalla pasa a la siguiente sola (avanzar() disparado por la propia
  // mecánica) o mediante el botón Continuar cuando hace falta confirmar.
  function avanzar() {
    if ($("#btnSiguiente") && $("#btnSiguiente").disabled) return;
    detenerAudio();
    limpiarIntervalo();
    state.indice++;
    if (state.indice >= ORDEN_PANTALLAS.length) state.indice = ORDEN_PANTALLAS.length - 1;
    renderPantallaActual();
  }

  function reiniciar() {
    detenerAudio();
    limpiarIntervalo();
    state.indice = 0;
    state.aciertos = 0;
    state.errores = 0;
    state.puntos = 0;
    state.evaluados = {};
    state.ciclo = null;
    renderPantallaActual();
  }

  function marcarEvaluado(id, esCorrecto) {
    if (state.evaluados[id]) return; // patrón: se computa una sola vez según el primer intento
    state.evaluados[id] = true;
    if (esCorrecto) { state.aciertos++; state.puntos += 10; }
    else { state.errores++; }
  }

  // Para mecánicas de feedback inmediato por intento (armar oración,
  // ordenar pasos): cada toque cuenta como un intento real, sin
  // "una sola vez" — cada pieza correcta ya queda fija (no se puede
  // volver a tocar), así que no hay riesgo de duplicar aciertos.
  function sumarIntento(esCorrecto) {
    if (esCorrecto) {
      state.aciertos++;
      state.puntos += 10;
      tonoAcierto();
    } else {
      state.errores++;
      tonoError();
    }
  }

  // El encabezado ya no muestra el puntaje en vivo: muestra una barra de
  // progreso con la pantalla actual sobre el total (el puntaje sigue
  // calculándose igual por dentro, para el resumen final de "cierre").
  function actualizarProgreso() {
    const total = ORDEN_PANTALLAS.length;
    const actual = state.indice + 1;
    const barra = $("#progresoBarraInterior");
    if (barra) barra.style.width = (actual / total * 100) + "%";
    const texto = $("#progresoTexto");
    if (texto) texto.textContent = actual + " / " + total;
  }

  // Pantallas que pasan solas a la siguiente (o tienen su propio botón de
  // acción) y por lo tanto no necesitan mostrar el footer con "Continuar".
  const SIN_FOOTER = ["portada", "asociarMomentos", "asociarPasos", "cierre"];

  // ---------- Render dispatcher ----------
  function renderPantallaActual() {
    const nombre = ORDEN_PANTALLAS[state.indice];
    const cont = $("#pantalla");
    cont.innerHTML = "";
    cont.className = "pantalla pantalla-" + nombre;
    const footer = $("#footer");
    footer.style.display = SIN_FOOTER.indexOf(nombre) !== -1 ? "none" : "flex";
    actualizarProgreso();

    const renderers = {
      portada: renderPortada,
      video: renderVideo,
      ciclo: renderCiclo,
      explicacion: renderExplicacion,
      asociarMomentos: function (c) { renderAsociarGenerico(c, datos.asociarMomentos); },
      ordenarPasos: renderOrdenarPasos,
      asociarPasos: function (c) { renderAsociarGenerico(c, datos.asociarPasos); },
      cronometro: renderCronometro,
      triviaTecnica: renderTriviaTecnica,
      sopaDeLetras: renderSopa,
      armarOracion: renderArmarOracion,
      cierre: renderCierre,
    };
    renderers[nombre](cont);
  }

  // ---------- PORTADA ----------
  function renderPortada(cont) {
    const wrap = el("div", "portada-wrap");

    if (datos.meta.imagenPortada) {
      const imgPortada = el("img", "portada-imagen");
      imgPortada.src = datos.meta.imagenPortada;
      imgPortada.alt = datos.meta.titulo;
      wrap.appendChild(imgPortada);
    }

    const h1 = el("h1", "portada-titulo", datos.meta.titulo);
    const sub = el("p", "portada-subtitulo", datos.meta.subtitulo);
    wrap.appendChild(h1);
    wrap.appendChild(sub);

    const firma = el("div", "firma-profe");
    const foto = el("img", "foto-profe");
    foto.src = datos.meta.fotoProfe;
    foto.alt = "Foto del profe";
    foto.addEventListener("click", abrirLightbox);
    const firmaTexto = el("div", "firma-texto");
    firmaTexto.innerHTML =
      "💻 Informática Educativa · " + datos.meta.autor + "<br>✉️ " + datos.meta.mail;
    firma.appendChild(foto);
    firma.appendChild(firmaTexto);

    const btnComenzar = el("button", "btn btn-primario", "Comenzar ▶");
    btnComenzar.addEventListener("click", function () {
      avanzar();
      reproducirCola(["intro_video"], null, true); // Continuar siempre habilitado en la pantalla de video
    });

    const fila = el("div", "portada-fila");
    fila.appendChild(firma);
    fila.appendChild(btnComenzar);
    wrap.appendChild(fila);

    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(true); // la portada nunca bloquea el avance (la usa el botón "Comenzar")
    reproducirCola(["intro_portada"], null, true);
  }

  function abrirLightbox(ev) {
    let zoomed = ev.currentTarget.dataset.zoomed === "1";
    const lb = el("div", "lightbox");
    const img = el("img", "lightbox-img");
    img.src = datos.meta.fotoProfe;
    const cerrar = el("button", "lightbox-cerrar", "✕");
    const frase = el("div", "lightbox-frase", datos.meta.fraseLightbox);
    lb.appendChild(img);
    lb.appendChild(cerrar);
    lb.appendChild(frase);
    document.body.appendChild(lb);

    let zoomIn = false;
    img.addEventListener("click", function (e) {
      zoomIn = !zoomIn;
      if (zoomIn) {
        const rect = img.getBoundingClientRect();
        const ox = ((e.clientX - rect.left) / rect.width) * 100;
        const oy = ((e.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = ox + "% " + oy + "%";
        img.style.transform = "scale(2.2)";
      } else {
        img.style.transform = "scale(1)";
      }
    });
    function cerrarLb() {
      img.style.transform = "scale(1)";
      document.body.removeChild(lb);
    }
    cerrar.addEventListener("click", cerrarLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) cerrarLb(); });
  }

  // ---------- Carga diferida de la API de YouTube (una sola vez) ----------
  function cargarYouTubeAPI(callback) {
    if (window.YT && window.YT.Player) { callback(); return; }
    window.__ytApiCallbacks = window.__ytApiCallbacks || [];
    window.__ytApiCallbacks.push(callback);
    if (window.__ytApiCargando) return;
    window.__ytApiCargando = true;
    const previo = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (previo) previo();
      window.__ytApiCallbacks.forEach(function (cb) { cb(); });
      window.__ytApiCallbacks = [];
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  // ---------- VIDEO (único, vista previa embebida en la pantalla) ----------
  function renderVideo(cont) {
    const v = datos.video;
    const wrap = el("div", "video-wrap");
    const h2 = el("h2", "", "Mirá el video");
    const instr = el("p", "instruccion", "Mirá el video completo. Cuando termine, se habilita Continuar.");
    wrap.appendChild(h2);
    wrap.appendChild(instr);

    const caja = el("div", "video-embed");
    const divPlayer = el("div");
    divPlayer.id = "ytPlayerVideo";
    caja.appendChild(divPlayer);
    wrap.appendChild(caja);

    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(false); // se habilita recién cuando el video termina
    reproducirCola(["intro_video"], null, true);

    cargarYouTubeAPI(function () {
      // si el usuario ya cambió de pantalla, el contenedor ya no existe
      if (!document.getElementById("ytPlayerVideo")) return;
      new YT.Player("ytPlayerVideo", {
        videoId: v.id,
        host: "https://www.youtube-nocookie.com",
        playerVars: { rel: 0 },
        events: {
          onStateChange: function (e) {
            if (e.data === YT.PlayerState.ENDED) setBtnSiguienteHabilitado(true);
          }
        }
      });
    });
  }

  // ---------- SELECTOR DE CICLO ----------
  // Ya no elige video (hay uno solo): define qué versión de las
  // actividades de lectura se muestra en las pantallas siguientes.
  function renderCiclo(cont) {
    const d = datos.cicloSelector;
    const wrap = el("div", "video-wrap");
    wrap.appendChild(el("h2", "", d.titulo));
    wrap.appendChild(el("p", "instruccion", d.instruccion));

    const botones = el("div", "video-botones");
    const btns = [];
    d.opciones.forEach(function (op) {
      const btn = el("button", "btn btn-ciclo", op.etiqueta);
      btn.addEventListener("click", function () {
        state.ciclo = op.id;
        btns.forEach(function (b) { b.classList.remove("seleccionado"); });
        btn.classList.add("seleccionado");
        setBtnSiguienteHabilitado(true);
      });
      btns.push(btn);
      botones.appendChild(btn);
    });
    wrap.appendChild(botones);

    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(false);
    reproducirCola(["ciclo_intro"], null, true);
  }

  // ---------- EXPLICACIÓN (narración animada) ----------
  function renderExplicacion(cont) {
    const d = datos.explicacion;
    const wrap = el("div", "explicacion-wrap");
    const h2 = el("h2", "", d.titulo);
    wrap.appendChild(h2);

    const escena = el("div", "explicacion-escena");
    const imgFondo = el("img", "explicacion-img");
    imgFondo.src = d.imagen;
    imgFondo.alt = d.titulo;
    const puntero = el("div", "puntero-narracion", "👉");
    const texto = el("p", "explicacion-texto");
    escena.appendChild(imgFondo);
    escena.appendChild(puntero);
    wrap.appendChild(escena);
    wrap.appendChild(texto);
    cont.appendChild(wrap);

    setBtnSiguienteHabilitado(false);

    // Reparte el audio único en fragmentos de texto sincronizados por tiempo estimado
    let pasoIdx = 0;
    function mostrarPaso() {
      if (pasoIdx >= d.pasos.length) return;
      const paso = d.pasos[pasoIdx];
      texto.textContent = paso.texto;
      escena.className = "explicacion-escena marcador-" + paso.marcador;
      pasoIdx++;
      const duracionEstimadaMs = Math.max(2200, paso.texto.length * 55);
      if (pasoIdx < d.pasos.length) setTimeout(mostrarPaso, duracionEstimadaMs);
    }
    mostrarPaso();
    reproducirCola([d.audioId], null, false);
  }

  // ---------- ASOCIAR (genérico: momentos y pasos del lavado) ----------
  function renderAsociarGenerico(cont, d) {
    const wrap = el("div", "asociar-wrap");
    wrap.appendChild(el("h2", "", d.titulo));
    wrap.appendChild(el("p", "instruccion", d.instruccion));

    const cols = el("div", "asociar-columnas");
    const colTexto = el("div", "asociar-col asociar-col-texto");
    const colImg = el("div", "asociar-col asociar-col-img");

    const paresBarajadosTexto = shuffle(d.pares);
    const paresBarajadosImg = shuffle(d.pares);

    let seleccionTexto = null;
    let seleccionImg = null;
    const resueltos = new Set();

    paresBarajadosTexto.forEach(function (p) {
      const item = el("div", "asociar-item asociar-texto", p.texto);
      item.dataset.id = p.id;
      item.addEventListener("click", function () {
        if (resueltos.has(p.id)) return;
        reproducirCola([p.audioId], null, true);
        $all(".asociar-texto", colTexto).forEach(function (n) { n.classList.remove("activo"); });
        item.classList.add("activo");
        seleccionTexto = p.id;
        intentarUnir();
      });
      colTexto.appendChild(item);
    });

    paresBarajadosImg.forEach(function (p) {
      const item = el("div", "asociar-item asociar-img");
      item.dataset.id = p.id;
      const img = el("img");
      img.src = p.imagen;
      img.alt = p.texto;
      item.appendChild(img);
      item.addEventListener("click", function () {
        if (resueltos.has(p.id)) return;
        $all(".asociar-img", colImg).forEach(function (n) { n.classList.remove("activo"); });
        item.classList.add("activo");
        seleccionImg = p.id;
        intentarUnir();
      });
      colImg.appendChild(item);
    });

    function intentarUnir() {
      if (!seleccionTexto || !seleccionImg) return;
      const ok = seleccionTexto === seleccionImg;
      const par = d.pares.find(function (x) { return x.id === seleccionTexto; });
      marcarEvaluado((d.introAudioId || "asociar") + "_" + seleccionTexto, ok);
      if (ok) {
        tonoAcierto();
        resueltos.add(seleccionTexto);
        $all('.asociar-item[data-id="' + seleccionTexto + '"]').forEach(function (n) {
          n.classList.remove("activo");
          n.classList.add("resuelto-" + colorPorIndice(d.pares.findIndex(function (x) { return x.id === seleccionTexto; })));
        });
        reproducirCola([par.audioId], function () {
          if (resueltos.size === d.pares.length) {
            setBtnSiguienteHabilitado(true);
            setTimeout(function () { avanzar(); }, 700); // completa la actividad: avanza solo, sin botón "Verificar"
          }
        }, true);
      } else {
        tonoError();
        el2FlashError(colTexto.querySelector('[data-id="' + seleccionTexto + '"]'));
        el2FlashError(colImg.querySelector('[data-id="' + seleccionImg + '"]'));
      }
      seleccionTexto = null;
      seleccionImg = null;
    }

    cols.appendChild(colTexto);
    cols.appendChild(colImg);
    wrap.appendChild(cols);
    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(false);
    reproducirCola([d.introAudioId], null, true);
  }

  function colorPorIndice(i) {
    const colores = ["a", "b", "c", "d", "e", "f", "g"];
    return colores[i % colores.length];
  }

  function el2FlashError(node) {
    if (!node) return;
    node.classList.add("error-flash");
    setTimeout(function () { node.classList.remove("error-flash"); }, 500);
  }

  // ---------- SECUENCIA ORDENADA (genérico: ordenar pasos y armar oración) ----------
  // Al tocar un ítem: si es el que sigue en el orden correcto, sube a la
  // zona de armado (suena acierto y suma punto). Si no, se queda en la
  // bandeja (suena error y suma error), sin moverse.
  function renderSecuenciaOrdenada(cont, opts) {
    // opts: { wrapClass, tituloTexto, instruccionTexto, introAudioId,
    //         items (array de {id, etiqueta, imagen?}), onCompleta(function),
    //         reproducirAudioPorItem (bool), usarImagenes (bool) }
    const wrap = el("div", opts.wrapClass || "armar-wrap");
    wrap.appendChild(el("h2", "", opts.tituloTexto));
    wrap.appendChild(el("p", "instruccion", opts.instruccionTexto));

    const zonaArmado = el("div", "armar-zona destacado" + (opts.usarImagenes ? " armar-zona-img" : ""));
    const bandejaPiezas = el("div", "armar-bandeja");
    wrap.appendChild(zonaArmado);
    wrap.appendChild(bandejaPiezas);
    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(false);

    const items = opts.items;
    const barajadas = shuffle(items.map(function (it, i) { return { it: it, i: i }; }));
    let siguienteEsperado = 0;

    barajadas.forEach(function (obj) {
      let pieza;
      if (opts.usarImagenes) {
        pieza = document.createElement("img");
        pieza.className = "armar-pieza-img";
        pieza.src = obj.it.imagen;
        pieza.alt = obj.it.etiqueta;
      } else {
        pieza = el("div", "armar-pieza", obj.it.etiqueta);
      }
      pieza.dataset.idx = obj.i;
      pieza.addEventListener("click", function () {
        if (pieza.classList.contains("usada")) return;
        const esCorrecta = obj.i === siguienteEsperado;
        sumarIntento(esCorrecta);
        if (esCorrecta) {
          pieza.classList.add("usada");
          if (opts.usarImagenes) {
            const colocada = document.createElement("img");
            colocada.className = "armar-colocada-img";
            colocada.src = obj.it.imagen;
            colocada.alt = obj.it.etiqueta;
            zonaArmado.appendChild(colocada);
          } else {
            zonaArmado.appendChild(el("span", "armar-colocada", obj.it.etiqueta));
          }
          siguienteEsperado++;
          if (opts.reproducirAudioPorItem && obj.it.audioId) {
            reproducirCola([obj.it.audioId], null, true);
          }
          if (siguienteEsperado === items.length) {
            setTimeout(function () {
              if (opts.onCompleta) opts.onCompleta();
            }, 300);
          }
        } else {
          pieza.classList.add("error-flash");
          setTimeout(function () { pieza.classList.remove("error-flash"); }, 450);
        }
      });
      bandejaPiezas.appendChild(pieza);
    });

    // introAudioId puede ser un solo id o un array de ids (para encadenar,
    // por ejemplo, la consigna con un recordatorio aparte).
    if (opts.introAudioId) {
      const idsIntro = Array.isArray(opts.introAudioId) ? opts.introAudioId : [opts.introAudioId];
      reproducirCola(idsIntro, null, true);
    }
  }

  // ---------- ORDENAR PASOS ----------
  function renderOrdenarPasos(cont) {
    const d = datos.ordenarPasos;
    const items = d.pasos.map(function (p) { return { id: p.id, etiqueta: p.texto, imagen: p.imagen, audioId: p.audioId }; });
    renderSecuenciaOrdenada(cont, {
      wrapClass: "armar-wrap",
      tituloTexto: d.titulo,
      instruccionTexto: d.instruccion,
      introAudioId: d.introAudioId,
      items: items,
      usarImagenes: true,
      reproducirAudioPorItem: true,
      onCompleta: function () { setBtnSiguienteHabilitado(true); }
    });
  }

  // ---------- CRONÓMETRO (20 segundos) ----------
  function renderCronometro(cont) {
    const d = datos.cronometro;
    const wrap = el("div", "cronometro-wrap");
    wrap.appendChild(el("h2", "", d.titulo));
    const instr = el("p", "instruccion", d.instruccion);
    wrap.appendChild(instr);

    const escena = el("div", "cronometro-escena");
    let video = null;
    if (d.video) {
      // Video real del chico frotándose las manos (en loop, para cubrir los
      // 20 segundos aunque el clip original sea más corto). Sin sonido propio:
      // el audio del paquete lo maneja la cola de narración.
      video = document.createElement("video");
      video.className = "cronometro-video";
      video.src = d.video;
      if (d.imagenFondo) video.poster = d.imagenFondo;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      escena.appendChild(video);
    } else if (d.imagenFondo) {
      const img = el("img", "cronometro-img");
      img.src = d.imagenFondo;
      img.alt = d.titulo;
      escena.appendChild(img);
    }
    // Burbujitas que aparecen mientras el chico "se frota las manos"
    // (se activan/detienen junto con la animación, vía la clase "activo").
    const posicionesBurbujas = [20, 38, 55, 70, 85];
    posicionesBurbujas.forEach(function (izq, i) {
      const burbuja = el("div", "cronometro-burbuja", "🫧");
      burbuja.style.left = izq + "%";
      burbuja.style.animationDelay = (i * 0.3) + "s";
      escena.appendChild(burbuja);
    });
    const numero = el("div", "cronometro-numero", String(d.segundos));
    escena.appendChild(numero);
    wrap.appendChild(escena);

    const barra = el("div", "cronometro-barra");
    const barraInterior = el("div", "cronometro-barra-interior");
    barraInterior.style.width = "100%";
    barra.appendChild(barraInterior);
    wrap.appendChild(barra);

    const btnEmpezar = el("button", "btn btn-primario", "▶ Empezar");
    wrap.appendChild(btnEmpezar);

    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(false);

    btnEmpezar.addEventListener("click", function () {
      if (intervaloActivo) return;
      btnEmpezar.disabled = true;
      escena.classList.add("activo"); // arranca la animación de frotado + burbujas
      if (video) {
        video.currentTime = 0;
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(function () {}); // si el navegador bloquea el play, no rompe el juego
      }
      let restante = d.segundos;
      intervaloActivo = setInterval(function () {
        restante--;
        if (restante < 0) restante = 0;
        numero.textContent = String(restante);
        barraInterior.style.width = (restante / d.segundos * 100) + "%";
        if (restante <= 0) {
          limpiarIntervalo();
          escena.classList.remove("activo"); // se detiene justo a los 20 segundos
          if (video) video.pause();
          tonoAcierto();
          reproducirCola([d.audioCierre], function () {
            setBtnSiguienteHabilitado(true);
          }, true);
        }
      }, 1000);
    });

    reproducirCola([d.audioIntro], null, true);
  }

  // ---------- TRIVIA DE TÉCNICA ----------
  function renderTriviaTecnica(cont) {
    const base = datos.triviaTecnica;
    const d = porCiclo(base);
    const wrap = el("div", "trivia-wrap");
    wrap.appendChild(el("h2", "", base.titulo));
    const cajaPregunta = el("div", "trivia-caja");
    wrap.appendChild(cajaPregunta);
    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(false);

    let idx = 0;
    let primeraPregunta = true;
    function mostrarPregunta() {
      cajaPregunta.innerHTML = "";
      if (idx >= d.preguntas.length) {
        setBtnSiguienteHabilitado(true);
        return;
      }
      const p = d.preguntas[idx];
      const preg = el("p", "trivia-pregunta destacado", p.pregunta);
      cajaPregunta.appendChild(preg);

      // Primer ciclo (recién aprenden a leer): opciones con imagen + texto.
      // Segundo ciclo: siempre solo texto, aunque la pregunta tenga imágenes cargadas.
      const conImagenes = state.ciclo === "primerCiclo" && !!p.imagenesOpciones;
      const opcionesIdx = shuffle(p.opciones.map(function (_, i) { return i; }));
      const esCorta = p.opciones.every(function (o) { return o.length <= 10; });
      const lista = el("div", "trivia-opciones " + (conImagenes ? "con-imagenes" : (esCorta ? "grilla2" : "lista1")));
      let respondido = false;

      opcionesIdx.forEach(function (origIdx) {
        let btn;
        if (conImagenes) {
          btn = el("button", "btn btn-opcion con-imagen");
          const img = el("img");
          img.src = p.imagenesOpciones[origIdx];
          img.alt = p.opciones[origIdx];
          const txt = el("span", "", p.opciones[origIdx]);
          btn.appendChild(img);
          btn.appendChild(txt);
        } else {
          btn = el("button", "btn btn-opcion", p.opciones[origIdx]);
        }
        btn.addEventListener("click", function () {
          if (respondido) return;
          respondido = true;
          const ok = origIdx === p.correcta;
          marcarEvaluado(p.id, ok);
          if (ok) tonoAcierto(); else tonoError();
          btn.classList.add(ok ? "correcta" : "incorrecta");
          if (!ok) {
            const correctaBtn = $all(".btn-opcion", lista)[opcionesIdx.indexOf(p.correcta)];
            if (correctaBtn) correctaBtn.classList.add("correcta");
          }
          reproducirCola([p.audioExplicacion ? (p.id + "_explicacion") : null].filter(Boolean), function () {
            idx++;
            setTimeout(mostrarPregunta, 300);
          }, true);
        });
        lista.appendChild(btn);
      });

      cajaPregunta.appendChild(lista);
      const colaInicial = primeraPregunta ? [base.introAudioId, p.id + "_pregunta"] : [p.id + "_pregunta"];
      primeraPregunta = false;
      reproducirCola(colaInicial, null, true);
    }
    mostrarPregunta();
  }

  // ---------- SOPA DE LETRAS ----------
  const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function renderSopa(cont) {
    const base = datos.sopaDeLetras;
    const dCiclo = porCiclo(base);
    const wrap = el("div", "sopa-wrap");
    wrap.appendChild(el("h2", "", base.titulo));
    wrap.appendChild(el("p", "instruccion", base.instruccion));

    const N = dCiclo.tamano;
    const palabras = dCiclo.palabras;
    // dr y dc nunca son negativos: toda palabra horizontal o diagonal se lee
    // siempre de izquierda a derecha (y de arriba hacia abajo), nunca al revés.
    const direcciones = [
      { dr: 0, dc: 1 },  // horizontal, de izquierda a derecha
      { dr: 1, dc: 0 },  // vertical, de arriba hacia abajo
      { dr: 1, dc: 1 },  // diagonal, de izquierda a derecha
    ];

    // Arma una sopa completa (todas las palabras ubicadas al azar en
    // alguna de las tres direcciones). Puede salir "toda horizontal" por
    // puro azar, así que se prueba varias veces hasta lograr variedad.
    function generarUnaSopa() {
      const gridIntento = Array.from({ length: N }, function () { return Array(N).fill(null); });
      const colocadasIntento = [];
      function colocar(palabra) {
        for (let intento = 0; intento < 200; intento++) {
          const dir = direcciones[Math.floor(Math.random() * direcciones.length)];
          const maxR = N - (dir.dr ? palabra.length : 1);
          const maxC = N - (dir.dc ? palabra.length : 1);
          if (maxR < 0 || maxC < 0) continue;
          const r0 = Math.floor(Math.random() * (maxR + 1));
          const c0 = Math.floor(Math.random() * (maxC + 1));
          let cabe = true;
          for (let i = 0; i < palabra.length; i++) {
            const r = r0 + dir.dr * i, c = c0 + dir.dc * i;
            const actual = gridIntento[r][c];
            if (actual !== null && actual !== palabra[i]) { cabe = false; break; }
          }
          if (!cabe) continue;
          for (let i = 0; i < palabra.length; i++) {
            const r = r0 + dir.dr * i, c = c0 + dir.dc * i;
            gridIntento[r][c] = palabra[i];
          }
          colocadasIntento.push({ palabra: palabra, r0: r0, c0: c0, dir: dir });
          return true;
        }
        return false;
      }
      shuffle(palabras).forEach(colocar);
      return { grid: gridIntento, colocadas: colocadasIntento };
    }

    // Para que haya variedad de formas (no todas horizontales), se vuelve a
    // armar la sopa hasta que entren todas las palabras y quede al menos una
    // vertical y otra en diagonal (en la práctica se logra casi siempre en
    // pocos intentos); si por mala suerte no se logra en 40 intentos, se usa
    // la última sopa igual (con todas las palabras ubicadas, aunque falte
    // variedad esa vez).
    let resultado = null;
    for (let intentoSopa = 0; intentoSopa < 40; intentoSopa++) {
      resultado = generarUnaSopa();
      if (resultado.colocadas.length < palabras.length) continue;
      const tieneVertical = resultado.colocadas.some(function (x) { return x.dir.dr === 1 && x.dir.dc === 0; });
      const tieneDiagonal = resultado.colocadas.some(function (x) { return x.dir.dr === 1 && x.dir.dc === 1; });
      if (tieneVertical && tieneDiagonal) break;
    }
    const grid = resultado.grid;
    const colocadas = resultado.colocadas;

    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      if (grid[r][c] === null) grid[r][c] = ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
    }

    const gridEl = el("div", "sopa-grid");
    gridEl.style.gridTemplateColumns = "repeat(" + N + ", 1fr)";
    const celdas = [];
    for (let r = 0; r < N; r++) {
      celdas.push([]);
      for (let c = 0; c < N; c++) {
        const cel = el("div", "sopa-celda", grid[r][c]);
        cel.dataset.r = r; cel.dataset.c = c;
        gridEl.appendChild(cel);
        celdas[r].push(cel);
      }
    }

    const listaPalabras = el("div", "sopa-lista");
    const chips = {};
    palabras.forEach(function (p) {
      const chip = el("div", "sopa-chip", p);
      listaPalabras.appendChild(chip);
      chips[p] = chip;
    });

    let inicioSel = null;
    let encontradas = 0;

    function limpiarSeleccionTemp() {
      $all(".sopa-celda.seleccion-temp", gridEl).forEach(function (c) { c.classList.remove("seleccion-temp"); });
    }

    // Mecánica por toque: primera letra + última letra de la palabra
    // (en lugar de arrastrar), para que sea más fácil de marcar.
    function manejarClickCelda(cel) {
      if (!inicioSel) {
        inicioSel = cel;
        cel.classList.add("seleccion-temp");
        return;
      }
      if (inicioSel === cel) {
        // tocar la misma celda cancela la selección
        limpiarSeleccionTemp();
        inicioSel = null;
        return;
      }
      const ok = evaluarSeleccion(inicioSel, cel);
      if (!ok) {
        tonoError();
        el2FlashError(inicioSel);
        el2FlashError(cel);
      }
      limpiarSeleccionTemp();
      inicioSel = null;
    }

    function evaluarSeleccion(a, b) {
      const r1 = +a.dataset.r, c1 = +a.dataset.c, r2 = +b.dataset.r, c2 = +b.dataset.c;
      const dr = Math.sign(r2 - r1), dc = Math.sign(c2 - c1);
      // Alineada en horizontal, vertical o diagonal (en cualquiera de los dos sentidos:
      // la palabra siempre se coloca de izquierda a derecha, pero se puede seleccionar
      // tocando cualquiera de sus dos extremos, en cualquier orden).
      const esValida = (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc));
      if (!esValida || (r1 === r2 && c1 === c2)) return false;
      const largo = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;
      let letras = "";
      const path = [];
      for (let i = 0; i < largo; i++) {
        const r = r1 + dr * i, c = c1 + dc * i;
        letras += grid[r][c];
        path.push(celdas[r][c]);
      }
      const letrasInvertidas = letras.split("").reverse().join("");
      const match = colocadas.find(function (p) {
        return !p.encontrada && (p.palabra === letras || p.palabra === letrasInvertidas);
      });
      if (match) {
        match.encontrada = true;
        encontradas++;
        tonoAcierto();
        path.forEach(function (c) { c.classList.add("encontrada"); });
        chips[match.palabra].classList.add("resuelta");
        reproducirCola(["sopa_" + match.palabra], function () {
          if (encontradas === palabras.length) setBtnSiguienteHabilitado(true);
        }, true);
        return true;
      }
      return false;
    }

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        celdas[r][c].addEventListener("click", function () { manejarClickCelda(this); });
      }
    }
    gridEl.style.webkitUserSelect = "none";
    gridEl.style.userSelect = "none";

    wrap.appendChild(gridEl);
    wrap.appendChild(listaPalabras);
    cont.appendChild(wrap);

    // Ajusta el tamaño de letra al tamaño real de cada celda (la grilla
    // cambia de N según el ciclo: 6x6 en primero, 10x10 en segundo), para
    // que las letras aprovechen el espacio disponible y no queden chicas.
    requestAnimationFrame(function () {
      const celdaPx = gridEl.clientWidth / N;
      const fontPx = Math.max(14, Math.min(34, Math.round(celdaPx * 0.58)));
      gridEl.style.fontSize = fontPx + "px";
    });

    setBtnSiguienteHabilitado(false);
    reproducirCola([base.introAudioId], null, true);
  }

  // ---------- ARMAR ORACIÓN ----------
  function renderArmarOracion(cont) {
    const base = datos.armarOracion;
    const dCiclo = porCiclo(base);
    const oraciones = dCiclo.oraciones;
    const prefijoAudio = state.ciclo === "primerCiclo" ? "oracion_p" : "oracion_";

    const wrap = el("div", "armar-wrap-contenedor");
    cont.appendChild(wrap);

    let idx = 0;
    function mostrarOracion() {
      wrap.innerHTML = "";
      if (idx >= oraciones.length) {
        setBtnSiguienteHabilitado(true);
        return;
      }
      const oracion = oraciones[idx];
      const palabras = oracion.texto.split(" ");
      const items = palabras.map(function (w) { return { etiqueta: w }; });
      const idOracion = prefijoAudio + (idx + 1);

      if (oracion.imagen) {
        const img = el("img", "armar-oracion-img");
        img.src = oracion.imagen;
        img.alt = oracion.texto;
        wrap.appendChild(img);
      }

      renderSecuenciaOrdenada(wrap, {
        wrapClass: "armar-wrap",
        tituloTexto: base.titulo,
        instruccionTexto: base.instruccion,
        // Al arrancar la actividad, después de la consigna, recuerda mayúscula
        // inicial y punto final.
        introAudioId: idx === 0 ? [base.introAudioId, "armar_mayuscula"] : null,
        items: items,
        reproducirAudioPorItem: false,
        onCompleta: function () {
          reproducirCola([idOracion], function () {
            idx++;
            setTimeout(mostrarOracion, 400);
          }, true);
        }
      });
    }
    mostrarOracion();
    setBtnSiguienteHabilitado(false);
  }

  // ---------- CIERRE ----------
  function renderCierre(cont) {
    const total = state.aciertos + state.errores;
    const pct = total > 0 ? Math.round((state.aciertos / total) * 100) : 0;
    const wrap = el("div", "cierre-wrap");
    wrap.appendChild(el("h2", "", datos.cierre.titulo));
    wrap.appendChild(el("p", "", datos.cierre.mensaje));

    const stats = el("div", "cierre-stats");
    stats.appendChild(el("div", "stat", "✅ Aciertos: " + state.aciertos));
    stats.appendChild(el("div", "stat", "❌ Errores: " + state.errores));
    stats.appendChild(el("div", "stat", "📊 " + pct + "%"));
    stats.appendChild(el("div", "stat", "⭐ " + state.puntos + " puntos"));
    wrap.appendChild(stats);

    wrap.appendChild(el("p", "cierre-frase", datos.cierre.fraseFinal));

    const btnReiniciar = el("button", "btn btn-primario", "Volver a jugar 🔁");
    btnReiniciar.addEventListener("click", reiniciar);
    wrap.appendChild(btnReiniciar);

    cont.appendChild(wrap);
    setBtnSiguienteHabilitado(false);
    reproducirCola(["cierre_texto"], null, true);
  }

  // ---------- Init ----------
  document.addEventListener("DOMContentLoaded", function () {
    const btnSig = $("#btnSiguiente");
    btnSig.addEventListener("click", avanzar);
    renderPantallaActual();
  });
})();
