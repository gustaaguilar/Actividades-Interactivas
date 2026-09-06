/* ============================================================
   PREPARADOS NOS CUIDAMOS - Qué hacer frente a un sismo
   motor.js — Motor del juego
   ============================================================ */

(function () {
  "use strict";

  const D = window.DATOS;
  const app = document.getElementById("app");

  /* ---------- Estado global ---------- */
  let idx = 0;
  let aciertos = 0;
  let errores = 0;
  let puntos = 0;
  // Paquete de un solo recorrido lineal (sin selector de ciclo).
  let pantallasActuales = [D.portada, ...D.pantallas];

  /* ---------- Cola de audio global SERIAL (nunca se solapan dos audios) ---------- */
  // Cada llamada a reproducir() encola un audio; solo arranca el siguiente
  // cuando el anterior terminó por completo. Así evitamos que, por ejemplo,
  // el audio de "acierto" de un ítem se pise con el audio final de la
  // actividad cuando ambos se disparan casi al mismo tiempo.
  const colaAudio = {
    activo: null,
    cola: [],
    reproduciendo: false,

    reset() {
      if (this.activo) { this.activo.pause(); this.activo = null; }
      this.cola = [];
      this.reproduciendo = false;
    },

    hayPendientes() {
      return this.reproduciendo || this.cola.length > 0;
    },

    reproducir(src, callback) {
      this.cola.push({ src, callback });
      this._procesarSiguiente();
    },

    _procesarSiguiente() {
      if (this.reproduciendo) return; // ya hay uno sonando, espera a que termine
      const item = this.cola.shift();
      if (!item) { actualizarSiguiente(); return; }

      if (!item.src) {
        if (item.callback) item.callback();
        actualizarSiguiente();
        this._procesarSiguiente();
        return;
      }

      this.reproduciendo = true;
      const a = new Audio(item.src);
      this.activo = a;
      const terminar = () => {
        this.reproduciendo = false;
        this.activo = null;
        if (item.callback) item.callback();
        actualizarSiguiente();
        this._procesarSiguiente();
      };
      a.addEventListener("ended", terminar);
      a.addEventListener("error", terminar);
      a.play().catch(terminar); // en testeo headless / sin archivo, no rompe el flujo
    }
  };

  /* ---------- Utilidades ---------- */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  // Header de imagen reutilizable: usa diagrama SVG propio si está definido,
  // o la imagen JPG normal si no. Evita repetir el condicional en cada
  // función de render (clasificar, trivia, asociar, narracion).
  function headerImagenHtml(p) {
    if (p.diagramaSvg) return `<div class="diagrama-svg-wrap">${p.diagramaSvg}</div>`;
    if (!p.imagen) return "";
    return `<img class="img-pantalla${p.imagenGrande ? " img-pantalla-grande" : ""}" src="${p.imagen}" alt="${p.titulo}" />`;
  }

  // Feedback visual inmediato al tocar una opción: titila el marco brevemente
  // para que se note el toque, sin depender solo del audio.
  function titilear(elemento) {
    elemento.classList.remove("titilar");
    void elemento.offsetWidth; // fuerza reflow para poder reiniciar la animación
    elemento.classList.add("titilar");
  }

  function bloquePerfil(contexto) {
    const wrap = el("div", "perfil-block " + contexto);
    wrap.innerHTML = `
      <img src="img/profe.jpg" class="perfil-foto" alt="Profe Gustavo Aguilar" />
      <div class="perfil-txt">
        💻 Informática Educativa · Profe Gustavo Aguilar<br/>
        ✉️ profegustaaguilar@gmail.com
      </div>`;
    wrap.querySelector(".perfil-foto").addEventListener("click", abrirLightboxPerfil);
    return wrap;
  }

  function abrirLightboxPerfil() {
    const lb = el("div", "lightbox-perfil");
    lb.innerHTML = `
      <div class="lightbox-perfil-inner">
        <img src="img/profe.jpg" alt="Profe Gustavo Aguilar" class="lightbox-perfil-img" />
        <p class="tagline">Menos prisa, más vida 🧉🫂</p>
        <p class="lightbox-zoom-hint">Tocá la foto para hacer zoom</p>
        <button class="btn-cerrar-lightbox">✕</button>
      </div>`;
    const imgPerfil = lb.querySelector(".lightbox-perfil-img");
    imgPerfil.addEventListener("click", (e) => {
      e.stopPropagation();
      imgPerfil.classList.toggle("zoom-activo");
    });
    lb.querySelector(".btn-cerrar-lightbox").addEventListener("click", () => lb.remove());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.remove(); });
    document.body.appendChild(lb);
  }

  function abrirLightboxImagen(src, alt) {
    const lb = el("div", "lightbox-imagen");
    lb.innerHTML = `
      <img src="${src}" alt="${alt || ''}" />
      <button class="btn-cerrar-lightbox">✕ Cerrar</button>`;
    lb.querySelector(".btn-cerrar-lightbox").addEventListener("click", () => lb.remove());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.remove(); });
    document.body.appendChild(lb);
  }

  /* ---------- Flags de habilitación por pantalla ---------- */
  let interaccionHabilitada = false;
  let actividadResuelta = false;
  let siguienteCb = null;
  // Pantallas tipo "video" (material complementario) nunca deben bloquear
  // el botón Continuar por audio ni por conectividad del video.
  let ignorarAudioParaSiguiente = false;

  function actualizarSiguiente() {
    const btn = document.getElementById("btn-siguiente");
    if (!btn) return;
    const audioListo = ignorarAudioParaSiguiente || !colaAudio.hayPendientes();
    btn.disabled = !(actividadResuelta && audioListo);
  }

  function marcarResuelta() {
    actividadResuelta = true;
    actualizarSiguiente();
  }

  /* ---------- Barra inferior (Siguiente) ---------- */
  function crearBarraInferior(onSiguiente, textoBoton) {
    const barra = el("div", "barra-inferior");
    const btn = el("button", "btn-siguiente", textoBoton || "Siguiente ➜");
    btn.id = "btn-siguiente";
    btn.disabled = true;
    btn.addEventListener("click", () => { if (!btn.disabled) onSiguiente(); });
    barra.appendChild(btn);
    return barra;
  }

  /* ---------- Render principal ---------- */
  function render() {
    app.innerHTML = "";
    colaAudio.reset();
    interaccionHabilitada = false;
    actividadResuelta = false;
    ignorarAudioParaSiguiente = false;

    const pantalla = pantallasActuales[idx];
    const cont = el("div", "pantalla pantalla-" + pantalla.tipo + " esperando-audio");
    app.appendChild(cont);

    switch (pantalla.tipo) {
      case "portada": renderPortada(cont, pantalla); return;
      case "cierre": renderCierre(cont, pantalla); return;
      case "video": renderVideo(cont, pantalla); return;
      case "narracion": renderNarracion(cont, pantalla); break;
      case "textoResaltado": renderTextoResaltado(cont, pantalla); break;
      case "clasificar": renderClasificar(cont, pantalla); break;
      case "ordenar": renderOrdenar(cont, pantalla); break;
      case "trivia": renderTrivia(cont, pantalla); break;
      case "trivia_multi": renderTriviaMulti(cont, pantalla); break;
      case "asociar": renderAsociar(cont, pantalla); break;
      case "hotspot": renderHotspot(cont, pantalla); break;
      case "recorrido": renderRecorrido(cont, pantalla); break;
      case "sopaLetras": renderSopaLetras(cont, pantalla); break;
      case "memojuego": renderMemojuego(cont, pantalla); break;
      case "puzzleImagen": renderPuzzleImagen(cont, pantalla); break;
      default: cont.appendChild(el("p", "", "Tipo de pantalla no implementado: " + pantalla.tipo));
    }

    const barra = crearBarraInferior(irSiguiente);
    app.appendChild(barra);

    // Instrucción inicial + (si existe) audio de la pregunta/situación,
    // en cadena serial: bloquea interacción hasta que terminen los dos.
    function habilitarInteraccion() {
      interaccionHabilitada = true;
      cont.classList.remove("esperando-audio");
      // Las pantallas de narración no tienen actividad: quedan resueltas
      // recién cuando termina el audio de instrucción/narración.
      if (pantalla.tipo === "narracion") marcarResuelta();
      actualizarSiguiente();
    }

    colaAudio.reproducir(pantalla.audioInstr, () => {
      if (pantalla.audioPregunta) {
        colaAudio.reproducir(pantalla.audioPregunta, habilitarInteraccion);
      } else {
        habilitarInteraccion();
      }
    });
    actualizarSiguiente();
  }

  function irSiguiente() {
    if (idx < pantallasActuales.length - 1) {
      idx++;
      render();
      window.scrollTo(0, 0);
    }
  }

  function reiniciarJuego() {
    idx = 0; aciertos = 0; errores = 0; puntos = 0;
    render();
  }

  /* ---------- VIDEO (material complementario, no bloquea el avance) ---------- */
  // A diferencia del resto de las pantallas, acá el botón Continuar está
  // SIEMPRE habilitado desde el arranque: no depende de audio ni de que el
  // video se haya reproducido, para que un problema de conectividad nunca
  // trabe al alumno. El iframe de YouTube recién se carga cuando tocan
  // play (lazy load), así no autoplaya ni consume datos de entrada.
  function renderVideo(cont, p) {
    cont.classList.remove("esperando-audio");
    const claseVertical = p.vertical ? " video-vertical" : "";
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <p class="instruccion">${p.texto}</p>
      <div class="video-wrap${claseVertical}">
        <button class="video-play-overlay" aria-label="Reproducir video">
          <span class="video-play-icono">▶</span>
          <span class="video-play-texto">Tocá para reproducir</span>
        </button>
      </div>
      <p class="video-fuente">${p.fuente || ""}</p>`;

    const wrap = cont.querySelector(".video-wrap");
    const overlay = cont.querySelector(".video-play-overlay");
    overlay.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.className = "video-iframe";
      iframe.src = `https://www.youtube-nocookie.com/embed/${p.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
      iframe.title = p.titulo;
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      wrap.innerHTML = "";
      wrap.appendChild(iframe);
    });

    const barra = crearBarraInferior(irSiguiente, "Continuar ➜");
    app.appendChild(barra);

    // Continuar habilitado de entrada, pase lo que pase con el video o el
    // audio (falla de conectividad, audio no cargado, etc.). El audio de
    // instrucción se reproduce igual, solo que nunca bloquea el avance.
    ignorarAudioParaSiguiente = true;
    interaccionHabilitada = true;
    marcarResuelta();
    colaAudio.reproducir(p.audioInstr);
  }

  /* ---------- PORTADA ---------- */
  function renderPortada(cont, p) {
    cont.innerHTML = `
      <div class="portada-caja">
        <img class="portada-img" src="${p.imagen}" alt="${p.titulo}" />
        <h1>${p.titulo}</h1>
        <p class="subtitulo">${p.subtitulo}</p>
        <button id="btn-comenzar" class="btn-comenzar">Comenzar</button>
      </div>`;
    cont.querySelector(".portada-caja").appendChild(bloquePerfil("portada"));
    cont.querySelector("#btn-comenzar").addEventListener("click", () => {
      idx = 1;
      render();
    });
  }

  /* ---------- CIERRE ---------- */
  function renderCierre(cont, p) {
    const total = aciertos + errores;
    const pct = total > 0 ? Math.round((aciertos / total) * 100) : 0;
    cont.innerHTML = `
      <div class="cierre-caja">
        <img class="portada-img" src="${p.imagen}" alt="${p.titulo}" />
        <h1>${p.titulo}</h1>
        <div class="cierre-stats">
          <div class="cierre-stat">✅ <span>Aciertos</span><strong>${aciertos}</strong></div>
          <div class="cierre-stat">❌ <span>Errores</span><strong>${errores}</strong></div>
          <div class="cierre-stat">📊 <span>Total</span><strong>${pct}%</strong></div>
          <div class="cierre-stat">⭐ <span>Puntos</span><strong>${puntos}</strong></div>
        </div>
        <button id="btn-volver-jugar" class="btn-comenzar">Volver a jugar</button>
      </div>`;
    cont.querySelector(".cierre-caja").appendChild(bloquePerfil("cierre"));
    cont.querySelector("#btn-volver-jugar").addEventListener("click", reiniciarJuego);
  }

  /* ---------- NARRACIÓN ---------- */
  /* ---------- TEXTO RESALTADO (tocar palabras clave para revelar su
       definición; se resuelve cuando se tocaron todas) ---------- */
  function renderTextoResaltado(cont, p) {
    const visitados = new Set();
    const totalResaltables = p.segmentos.filter((s) => s.resaltado).length;

    const segmentosHtml = p.segmentos.map((seg, i) => {
      if (!seg.resaltado) return `<span>${seg.texto}</span>`;
      return `<span class="resaltable" data-idx="${i}">${seg.texto}</span>`;
    }).join("");

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      ${headerImagenHtml(p)}
      <p class="instruccion">${p.instruccionTexto}</p>
      <p class="texto-resaltado">${segmentosHtml}</p>
      <p class="resaltado-contador"></p>
      <div class="feedback"></div>`;

    const contador = cont.querySelector(".resaltado-contador");
    function actualizarContador() {
      contador.textContent = `Palabras descubiertas: ${visitados.size} / ${totalResaltables}`;
    }
    actualizarContador();

    cont.querySelectorAll(".resaltable").forEach((span) => {
      span.addEventListener("click", () => {
        if (!interaccionHabilitada) return;
        const idx = Number(span.dataset.idx);
        const seg = p.segmentos[idx];
        titilear(span);
        span.classList.add("resaltado-activo");
        colaAudio.reproducir(seg.audioDefinicion);
        if (!visitados.has(idx)) {
          visitados.add(idx);
          actualizarContador();
          if (visitados.size === totalResaltables) {
            cont.querySelector(".feedback").textContent = "¡Descubriste todas las palabras clave!";
            colaAudio.reproducir(p.audioConfirma, marcarResuelta);
          }
        }
      });
    });
  }

  function renderNarracion(cont, p) {
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      ${headerImagenHtml(p)}
      ${p.fuenteImagen ? `<p class="img-fuente">${p.fuenteImagen}</p>` : ""}
      <p class="texto-narracion">${p.texto}</p>`;
    // Pantalla informativa: se marca resuelta cuando termina el audio (ver render()).
  }

  /* ---------- CLASIFICAR (tap-to-select, validación y justificación inmediata) ---------- */
  function renderClasificar(cont, p) {
    const items = shuffle(p.items);
    const resueltos = new Set(); // ids de items YA clasificados correctamente
    const evaluados = new Set(); // ids de items cuyo PRIMER intento ya puntuó
    let seleccion = null; // { tipo: "item"|"categoria", id }

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      ${headerImagenHtml(p)}
      ${p.fuenteImagen ? `<p class="img-fuente">${p.fuenteImagen}</p>` : ""}
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="clasificar-items"></div>
      <div class="clasificar-categorias"></div>
      <div class="feedback"></div>`;

    const itemsWrap = cont.querySelector(".clasificar-items");
    const catsWrap = cont.querySelector(".clasificar-categorias");
    const feedback = cont.querySelector(".feedback");

    const chipsPorId = {};

    function limpiarSeleccionVisual() {
      itemsWrap.querySelectorAll(".item-chip").forEach((c) => c.classList.remove("seleccionado"));
      catsWrap.querySelectorAll(".categoria-chip").forEach((c) => c.classList.remove("seleccionado"));
    }

    function intentarResolver(itemId, catId) {
      const it = items.find((x) => x.id === itemId);
      const cat = p.categorias.find((c) => c.id === catId);
      const chip = chipsPorId[itemId];
      const correcto = it.categoria === catId;

      seleccion = null;
      limpiarSeleccionVisual();

      // Puntuación coherente: cada ítem cuenta una sola vez, según el
      // resultado de su PRIMER intento. Los reintentos posteriores permiten
      // seguir jugando/aprendiendo, pero ya no modifican el conteo.
      const esPrimerIntento = !evaluados.has(itemId);
      if (esPrimerIntento) evaluados.add(itemId);

      if (correcto) {
        resueltos.add(itemId);
        chip.classList.add("asignado", "correcto");
        chip.style.borderColor = cat.color;
        if (esPrimerIntento) { aciertos += 1; puntos += 5; }
        colaAudio.reproducir(it.audioCorrecta || it.audio);

        // Recién se marca terminada la actividad DESPUÉS de resolver
        // correctamente el último ítem (evita el bug de cierre anticipado).
        if (resueltos.size === items.length) {
          feedback.textContent = "¡Listo! Ya clasificaste todo.";
          colaAudio.reproducir(p.audioConfirma, marcarResuelta);
        }
      } else {
        // Incorrecto: NO se coloca. Vuelve a quedar disponible para reintentar.
        if (esPrimerIntento) errores += 1;
        chip.classList.add("incorrecto");
        setTimeout(() => chip.classList.remove("incorrecto"), 700);
        colaAudio.reproducir(it.audioIncorrecta || it.audio);
      }
    }

    function tocarItem(it, chip) {
      if (!interaccionHabilitada || resueltos.has(it.id)) return;
      titilear(chip);
      if (seleccion && seleccion.tipo === "categoria") {
        intentarResolver(it.id, seleccion.id);
      } else {
        seleccion = { tipo: "item", id: it.id };
        limpiarSeleccionVisual();
        chip.classList.add("seleccionado");
        colaAudio.reproducir(it.audio); // nombre del objeto, al tocarlo
      }
    }

    function tocarCategoria(cat, catBtn) {
      if (!interaccionHabilitada) return;
      titilear(catBtn);
      if (seleccion && seleccion.tipo === "item") {
        intentarResolver(seleccion.id, cat.id);
      } else {
        seleccion = { tipo: "categoria", id: cat.id };
        limpiarSeleccionVisual();
        catBtn.classList.add("seleccionado");
      }
    }

    items.forEach((it) => {
      const imgHtml = it.imagen ? `<img src="${it.imagen}" alt="${it.texto}"/>` : "";
      const chip = el("div", "item-chip", `${imgHtml}<span>${it.texto}</span>`);
      chip.dataset.id = it.id;
      chip.addEventListener("click", () => tocarItem(it, chip));
      itemsWrap.appendChild(chip);
      chipsPorId[it.id] = chip;
    });

    p.categorias.forEach((cat) => {
      const catBtn = el("div", "categoria-chip", cat.nombre);
      catBtn.dataset.id = cat.id;
      catBtn.style.borderColor = cat.color;
      catBtn.addEventListener("click", () => tocarCategoria(cat, catBtn));
      catsWrap.appendChild(catBtn);
    });
  }

  /* ---------- ORDENAR (tap-to-select, validación inmediata paso a paso) ---------- */
  function renderOrdenar(cont, p) {
    const pasosDesordenados = shuffle(p.pasos);
    let siguienteEsperado = 0;
    const esOracion = !!p.estiloOracion;
    const posicionesEvaluadas = new Set(); // posiciones cuyo primer intento ya puntuó

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      ${headerImagenHtml(p)}
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="ordenar-opciones"></div>
      <div class="ordenar-resultado${esOracion ? " ordenar-resultado-oracion" : ""}"></div>
      <div class="feedback"></div>`;

    const opcionesWrap = cont.querySelector(".ordenar-opciones");
    const resultadoWrap = cont.querySelector(".ordenar-resultado");
    const feedback = cont.querySelector(".feedback");

    pasosDesordenados.forEach((paso) => {
      const chip = el("div", "paso-chip", paso.texto);
      chip.dataset.id = paso.id;
      chip.addEventListener("click", () => {
        if (!interaccionHabilitada || chip.classList.contains("usado")) return;
        titilear(chip);

        const posicionActual = siguienteEsperado;
        const esPrimerIntento = !posicionesEvaluadas.has(posicionActual);
        if (esPrimerIntento) posicionesEvaluadas.add(posicionActual);

        const esperado = p.pasos[siguienteEsperado];
        if (paso.id === esperado.id) {
          chip.classList.add("usado");
          colaAudio.reproducir(paso.audio);
          const numChip = esOracion
            ? el("span", "paso-palabra", paso.texto)
            : el("div", "paso-numerado", `${siguienteEsperado + 1}. ${paso.texto}`);
          resultadoWrap.appendChild(numChip);
          if (esPrimerIntento) { aciertos += 1; puntos += 5; }
          siguienteEsperado++;

          if (siguienteEsperado === p.pasos.length) {
            feedback.textContent = "¡Excelente! El orden es correcto.";
            colaAudio.reproducir(p.audioConfirma, marcarResuelta);
          }
        } else {
          if (esPrimerIntento) errores += 1;
          chip.classList.add("incorrecto");
          setTimeout(() => chip.classList.remove("incorrecto"), 500);
          colaAudio.reproducir(p.audioError);
        }
      });
      opcionesWrap.appendChild(chip);
    });
  }

  /* ---------- TRIVIA (una pregunta, resolución automática) ---------- */
  function renderTrivia(cont, p) {
    const opciones = shuffle(p.opciones);
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      ${headerImagenHtml(p)}
      <p class="instruccion">${p.instruccionTexto}</p>
      <p class="pregunta">${p.pregunta}</p>
      <div class="trivia-opciones"></div>
      <div class="feedback"></div>`;

    const opcionesWrap = cont.querySelector(".trivia-opciones");
    const feedback = cont.querySelector(".feedback");
    let resuelta = false;
    let yaEvaluada = false; // la pregunta puntúa una sola vez, en su primer intento

    opciones.forEach((op) => {
      const imgHtml = op.imagen ? `<img src="${op.imagen}" alt="${op.texto}" class="opcion-icono"/>` : "";
      const btn = el("button", "opcion-btn", `${imgHtml}<span>${op.texto}</span>`);
      btn.addEventListener("click", () => {
        if (!interaccionHabilitada || resuelta) return;
        titilear(btn);
        const esPrimerIntento = !yaEvaluada;
        yaEvaluada = true;
        if (op.correcta) {
          resuelta = true;
          btn.classList.add("seleccionada", "correcto");
          opcionesWrap.querySelectorAll(".opcion-btn").forEach((b) => { if (b !== btn) b.disabled = true; });
          if (esPrimerIntento) { aciertos += 1; puntos += 10; }
          feedback.textContent = "¡Correcto!";
          colaAudio.reproducir(p.audioConfirmaCorrecta || op.audioJustifica, marcarResuelta);
        } else {
          if (esPrimerIntento) errores += 1;
          btn.classList.add("incorrecto");
          setTimeout(() => btn.classList.remove("incorrecto"), 700);
          feedback.textContent = "Esa no era, probá con otra.";
          colaAudio.reproducir(op.audioJustifica || p.audioConfirmaIncorrecta);
        }
      });
      opcionesWrap.appendChild(btn);
    });
  }

  /* ---------- TRIVIA MÚLTIPLE (una pregunta a la vez, mismo espacio) ---------- */
  function renderTriviaMulti(cont, p) {
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      ${headerImagenHtml(p)}
      <p class="instruccion">${p.instruccionTexto}</p>
      <p class="trivia-multi-contador"></p>
      <div class="trivia-multi-activa"></div>
      <div class="feedback"></div>`;

    const contador = cont.querySelector(".trivia-multi-contador");
    const activa = cont.querySelector(".trivia-multi-activa");
    const feedback = cont.querySelector(".feedback");
    const total = p.preguntas.length;
    let iActual = 0;

    function mostrarPregunta(i) {
      const preg = p.preguntas[i];
      const opciones = shuffle(preg.opciones);
      contador.textContent = `Pregunta ${i + 1} de ${total}`;
      activa.innerHTML = `
        <p class="pregunta">${preg.pregunta}</p>
        <div class="trivia-opciones"></div>`;
      const opcionesWrap = activa.querySelector(".trivia-opciones");
      let resuelta = false;
      let yaEvaluada = false; // cada pregunta puntúa una sola vez, en su primer intento

      colaAudio.reproducir(preg.audioPregunta);

      opciones.forEach((op) => {
        const btn = el("button", "opcion-btn", op.texto);
        btn.addEventListener("click", () => {
          if (!interaccionHabilitada || resuelta) return;
          titilear(btn);
          const esPrimerIntento = !yaEvaluada;
          yaEvaluada = true;
          if (op.correcta) {
            resuelta = true;
            btn.classList.add("correcto");
            opcionesWrap.querySelectorAll(".opcion-btn").forEach((b) => { if (b !== btn) b.disabled = true; });
            if (esPrimerIntento) { aciertos += 1; puntos += 10; }
            feedback.textContent = "¡Correcto!";
            colaAudio.reproducir(preg.audioConfirmaCorrecta, () => {
              iActual++;
              if (iActual < total) {
                feedback.textContent = "";
                mostrarPregunta(iActual);
              } else {
                feedback.textContent = "¡Respondiste todas las preguntas!";
                marcarResuelta();
              }
            });
          } else {
            if (esPrimerIntento) errores += 1;
            btn.classList.add("incorrecto");
            setTimeout(() => btn.classList.remove("incorrecto"), 700);
            feedback.textContent = "Esa no era, probá con otra.";
            colaAudio.reproducir(op.audioJustifica || preg.audioConfirmaIncorrecta);
          }
        });
        opcionesWrap.appendChild(btn);
      });
    }

    mostrarPregunta(0);
  }

  /* ---------- ASOCIAR (tap tarjeta izquierda + tap tarjeta derecha) ---------- */
  const COLORES_PARES = ["#43a047", "#1e88e5", "#fb8c00", "#8e24aa", "#00897b", "#d81b60"];

  function renderAsociar(cont, p) {
    const izqs = shuffle(p.pares.map((par) => ({ id: par.id, texto: par.izq, imagen: par.izqImagen, audio: par.izqAudio })));
    const ders = shuffle(p.pares.map((par) => ({ id: par.id, texto: par.der, audio: par.derAudio })));
    let seleccionIzq = null;
    let resueltos = 0;
    const evaluados = new Set(); // ids de pares cuyo primer intento ya puntuó

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      ${headerImagenHtml(p)}
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="asociar-columnas">
        <div class="asociar-col asociar-izq"></div>
        <div class="asociar-col asociar-der"></div>
      </div>
      <div class="feedback"></div>`;

    const colIzq = cont.querySelector(".asociar-izq");
    const colDer = cont.querySelector(".asociar-der");
    const feedback = cont.querySelector(".feedback");

    izqs.forEach((it) => {
      const imgHtml = it.imagen ? `<img src="${it.imagen}" alt="${it.texto}" class="asociar-icono"/>` : "";
      const chip = el("div", "asociar-chip", `${imgHtml}<span>${it.texto}</span>`);
      chip.dataset.id = it.id;
      chip.addEventListener("click", () => {
        if (!interaccionHabilitada || chip.classList.contains("resuelto")) return;
        titilear(chip);
        colaAudio.reproducir(it.audio);
        colIzq.querySelectorAll(".asociar-chip").forEach((c) => c.classList.remove("seleccionado"));
        chip.classList.add("seleccionado");
        seleccionIzq = it.id;
      });
      colIzq.appendChild(chip);
    });

    ders.forEach((it) => {
      const chip = el("div", "asociar-chip", it.texto);
      chip.dataset.id = it.id;
      chip.addEventListener("click", () => {
        if (!interaccionHabilitada || chip.classList.contains("resuelto") || !seleccionIzq) return;
        titilear(chip);
        const chipIzq = colIzq.querySelector(`[data-id="${seleccionIzq}"]`);
        const esPrimerIntento = !evaluados.has(seleccionIzq);
        if (esPrimerIntento) evaluados.add(seleccionIzq);

        if (seleccionIzq === it.id) {
          const par = p.pares.find((x) => x.id === it.id);
          const colorPar = COLORES_PARES[resueltos % COLORES_PARES.length];
          chip.classList.add("resuelto", "correcto");
          chipIzq.classList.add("resuelto", "correcto");
          chip.style.borderColor = colorPar;
          chip.style.background = colorPar + "22";
          chipIzq.style.borderColor = colorPar;
          chipIzq.style.background = colorPar + "22";
          colaAudio.reproducir(par.audioConfirmaPar);
          if (esPrimerIntento) { aciertos += 1; puntos += 5; }
          resueltos++;
          seleccionIzq = null;
          if (resueltos === p.pares.length) {
            feedback.textContent = "¡Uniste todas las parejas correctamente!";
            marcarResuelta();
          }
        } else {
          if (esPrimerIntento) errores += 1;
          chip.classList.add("incorrecto");
          setTimeout(() => chip.classList.remove("incorrecto"), 600);
        }
      });
      colDer.appendChild(chip);
    });
  }

  /* ---------- HOTSPOT (tocar zonas sobre una imagen) ---------- */
  /* ---------- MEMOJUEGO (memoria: dar vuelta cartas y encontrar pares) ---------- */
  function renderMemojuego(cont, p) {
    // Cada elemento de p.pares genera 2 cartas iguales (o imagen+texto si se
    // define parImagen/parTexto por separado). Para mantenerlo simple y con
    // pocos assets, usamos pares imagen-imagen (dos cartas idénticas).
    const cartas = [];
    p.pares.forEach((par) => {
      cartas.push({ parId: par.id, imagen: par.imagen, audio: par.audio, cartaId: par.id + "-a" });
      cartas.push({ parId: par.id, imagen: par.imagen, audio: par.audio, cartaId: par.id + "-b" });
    });
    const cartasMezcladas = shuffle(cartas);

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="memo-grid"></div>
      <div class="feedback"></div>`;

    const grid = cont.querySelector(".memo-grid");
    const feedback = cont.querySelector(".feedback");
    let volteadas = [];
    let bloqueado = false;
    let paresResueltos = 0;

    cartasMezcladas.forEach((carta) => {
      const cartaEl = el("div", "memo-carta");
      cartaEl.dataset.parId = carta.parId;
      cartaEl.innerHTML = `
        <div class="memo-carta-inner">
          <div class="memo-carta-dorso">?</div>
          <div class="memo-carta-frente"><img src="${carta.imagen}" alt=""/></div>
        </div>`;
      cartaEl.addEventListener("click", () => {
        if (!interaccionHabilitada || bloqueado) return;
        if (cartaEl.classList.contains("volteada") || cartaEl.classList.contains("resuelta")) return;
        if (volteadas.length >= 2) return;

        cartaEl.classList.add("volteada");
        colaAudio.reproducir(carta.audio);
        volteadas.push({ carta, cartaEl });

        if (volteadas.length === 2) {
          bloqueado = true;
          const [a, b] = volteadas;
          if (a.carta.parId === b.carta.parId) {
            setTimeout(() => {
              a.cartaEl.classList.add("resuelta");
              b.cartaEl.classList.add("resuelta");
              aciertos += 1; puntos += 5;
              paresResueltos++;
              volteadas = [];
              bloqueado = false;
              if (paresResueltos === p.pares.length) {
                feedback.textContent = "¡Encontraste todos los pares!";
                colaAudio.reproducir(p.audioConfirma, marcarResuelta);
              }
            }, 500);
          } else {
            errores += 1;
            setTimeout(() => {
              a.cartaEl.classList.remove("volteada");
              b.cartaEl.classList.remove("volteada");
              volteadas = [];
              bloqueado = false;
            }, 900);
          }
        }
      });
      grid.appendChild(cartaEl);
    });
  }

  /* ---------- PUZZLE DE IMAGEN (rompecabezas: tocar dos piezas para intercambiarlas) ---------- */
  function renderPuzzleImagen(cont, p) {
    const filas = p.filas || 2;
    const columnas = p.columnas || 3;
    const totalPiezas = filas * columnas;

    // "posiciones[i]" = qué pieza (índice de imagen correcto) está
    // actualmente en la casilla i de la grilla.
    let posiciones = shuffle([...Array(totalPiezas).keys()]);
    // Evitar que arranque ya resuelto por azar
    while (posiciones.every((v, i) => v === i)) posiciones = shuffle([...Array(totalPiezas).keys()]);

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="puzzle-grid" style="grid-template-columns: repeat(${columnas}, 1fr);"></div>
      <div class="feedback"></div>`;

    const grid = cont.querySelector(".puzzle-grid");
    const feedback = cont.querySelector(".feedback");
    let seleccionada = null;
    let resuelto = false;

    function piezaEstilo(indiceCorrecto) {
      const col = indiceCorrecto % columnas;
      const fila = Math.floor(indiceCorrecto / columnas);
      const px = columnas > 1 ? (col / (columnas - 1)) * 100 : 0;
      const py = filas > 1 ? (fila / (filas - 1)) * 100 : 0;
      return `background-image:url('${p.imagen}'); background-size:${columnas * 100}% ${filas * 100}%; background-position:${px}% ${py}%;`;
    }

    function pintarGrid() {
      grid.innerHTML = "";
      posiciones.forEach((piezaIdx, casillaIdx) => {
        const pieza = el("button", "puzzle-pieza");
        pieza.style.cssText = piezaEstilo(piezaIdx);
        pieza.dataset.casilla = casillaIdx;
        if (piezaIdx === casillaIdx) pieza.classList.add("correcta");
        pieza.addEventListener("click", () => {
          if (!interaccionHabilitada || resuelto) return;
          if (seleccionada === null) {
            seleccionada = casillaIdx;
            pieza.classList.add("seleccionada");
          } else if (seleccionada === casillaIdx) {
            pieza.classList.remove("seleccionada");
            seleccionada = null;
          } else {
            const tmp = posiciones[seleccionada];
            posiciones[seleccionada] = posiciones[casillaIdx];
            posiciones[casillaIdx] = tmp;
            seleccionada = null;
            pintarGrid();
            if (posiciones.every((v, i) => v === i)) {
              resuelto = true;
              feedback.textContent = "¡Armaste la imagen completa!";
              aciertos += 1; puntos += 10;
              colaAudio.reproducir(p.audioConfirma, marcarResuelta);
            }
          }
        });
        grid.appendChild(pieza);
      });
    }
    pintarGrid();
  }

  /* ---------- HOTSPOT (tocar zonas en una imagen) ---------- */
  function renderHotspot(cont, p) {
    const encontrados = new Set(); // ids distintos ya descubiertos (una zona puede repetirse, ej. "Ovarios" aparece 2 veces)
    const totalTerminos = new Set([
      ...p.zonas.map((z) => z.id),
      ...((p.extras || []).map((ex) => ex.id))
    ]).size;

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="hotspot-wrap${p.imagenGrande ? " hotspot-wrap-grande" : ""}">
        <img src="${p.imagen}" class="hotspot-img" alt="${p.titulo}" />
      </div>
      <div class="hotspot-extras"></div>
      <p class="hotspot-contador"></p>
      <div class="hotspot-definiciones"></div>
      <div class="feedback"></div>`;

    const wrap = cont.querySelector(".hotspot-wrap");
    const extrasWrap = cont.querySelector(".hotspot-extras");
    const contador = cont.querySelector(".hotspot-contador");
    const definiciones = cont.querySelector(".hotspot-definiciones");
    const feedback = cont.querySelector(".feedback");

    if (p.ampliable) {
      const btnAmpliar = el("button", "btn-ampliar", "🔍");
      btnAmpliar.type = "button";
      btnAmpliar.addEventListener("click", (e) => {
        e.stopPropagation();
        abrirLightboxImagen(p.imagen, p.titulo);
      });
      wrap.appendChild(btnAmpliar);
    }

    function actualizarContador() {
      contador.textContent = `Palabras descubiertas: ${encontrados.size} / ${totalTerminos}`;
    }
    actualizarContador();

    function marcarEncontrado(item) {
      const yaEncontrado = encontrados.has(item.id);
      encontrados.add(item.id);
      // El texto de la definición siempre aparece en el MISMO lugar (se
      // reemplaza), para que la pantalla no crezca hacia abajo con cada
      // palabra nueva descubierta.
      definiciones.innerHTML = `<strong>${item.label}:</strong> ${item.definicionTexto}`;
      if (!yaEncontrado) {
        aciertos += 1; puntos += 5;
        actualizarContador();
        if (encontrados.size === totalTerminos) {
          feedback.textContent = "¡Descubriste todas las palabras clave!";
          colaAudio.reproducir(p.audioConfirma, marcarResuelta);
        }
      }
    }

    p.zonas.forEach((z) => {
      const zonaEl = el("button", "hotspot-zona");
      zonaEl.style.left = (z.x * 100) + "%";
      zonaEl.style.top = (z.y * 100) + "%";
      zonaEl.style.width = (z.w * 100) + "%";
      zonaEl.style.height = (z.h * 100) + "%";
      zonaEl.title = z.label;
      zonaEl.addEventListener("click", () => {
        if (!interaccionHabilitada) return;
        titilear(zonaEl);
        zonaEl.classList.add("encontrada");
        colaAudio.reproducir(z.audioPalabra, () => colaAudio.reproducir(z.audioDefinicion));
        marcarEncontrado(z);
      });
      wrap.appendChild(zonaEl);
    });

    (p.extras || []).forEach((ex) => {
      const chip = el("button", "hotspot-extra-chip", ex.label);
      chip.addEventListener("click", () => {
        if (!interaccionHabilitada) return;
        titilear(chip);
        chip.classList.add("encontrada");
        colaAudio.reproducir(ex.audioPalabra, () => colaAudio.reproducir(ex.audioDefinicion));
        marcarEncontrado(ex);
      });
      extrasWrap.appendChild(chip);
    });
  }

  /* ---------- RECORRIDO (tocar puntos en orden) ---------- */
  function renderRecorrido(cont, p) {
    let siguienteEsperado = 0;
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="recorrido-wrap">
        <img src="${p.imagen}" class="recorrido-img" alt="${p.titulo}" />
      </div>
      <div class="recorrido-descripcion">
        <img class="recorrido-descripcion-img" style="display:none" alt="" />
        <p class="recorrido-descripcion-texto"></p>
      </div>
      <div class="feedback"></div>`;

    const wrap = cont.querySelector(".recorrido-wrap");
    const descImg = cont.querySelector(".recorrido-descripcion-img");
    const descTexto = cont.querySelector(".recorrido-descripcion-texto");
    const feedback = cont.querySelector(".feedback");

    p.puntos.forEach((pt, i) => {
      const ptEl = el("button", "recorrido-punto", String(i + 1));
      ptEl.style.left = (pt.x * 100) + "%";
      ptEl.style.top = (pt.y * 100) + "%";
      ptEl.title = pt.label;
      ptEl.addEventListener("click", () => {
        if (!interaccionHabilitada || i !== siguienteEsperado) return;
        ptEl.classList.add("visitado");
        descTexto.textContent = pt.label;
        if (pt.imagen) {
          descImg.src = pt.imagen;
          descImg.alt = pt.label;
          descImg.style.display = "block";
        }
        colaAudio.reproducir(pt.audio);
        aciertos += 1; puntos += 5;
        siguienteEsperado++;
        if (siguienteEsperado === p.puntos.length) {
          feedback.textContent = "¡Llegaste al Punto de Encuentro!";
          colaAudio.reproducir(p.audioLlegada, marcarResuelta);
        }
      });
      wrap.appendChild(ptEl);
    });
  }

  /* ---------- SOPA DE LETRAS ---------- */
  function renderSopaLetras(cont, p) {
    const TAM = 12;
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    const grid = Array.from({ length: TAM }, () => Array(TAM).fill(null));
    const dirsUsadas = { H: 0, Vd: 0, Vu: 0, Dd: 0, Du: 0 };
    const colocadas = [];

    function puedeColocar(palabra, fila, col, dr, dc) {
      for (let i = 0; i < palabra.length; i++) {
        const f = fila + dr * i, c = col + dc * i;
        if (f < 0 || f >= TAM || c < 0 || c >= TAM) return false;
        if (grid[f][c] !== null && grid[f][c] !== palabra[i]) return false;
      }
      return true;
    }
    function colocar(palabra, fila, col, dr, dc) {
      for (let i = 0; i < palabra.length; i++) {
        grid[fila + dr * i][col + dc * i] = palabra[i];
      }
    }

    // Direcciones permitidas: horizontal SOLO izq->der (nunca al revés);
    // vertical en ambos sentidos; diagonal en ambos sentidos (siempre
    // avanzando de izquierda a derecha en columnas, nunca der->izq).
    const direcciones = [
      { dr: 0, dc: 1, tipo: "H" },   // horizontal, izquierda a derecha
      { dr: 1, dc: 0, tipo: "Vd" },  // vertical, arriba a abajo
      { dr: -1, dc: 0, tipo: "Vu" }, // vertical, abajo a arriba
      { dr: 1, dc: 1, tipo: "Dd" },  // diagonal, arriba-izq a abajo-der
      { dr: -1, dc: 1, tipo: "Du" }  // diagonal, abajo-izq a arriba-der
    ];

    p.palabras.forEach((pObj, idxPal) => {
      const palabra = pObj.palabra.toUpperCase();
      // Forzar variedad de direcciones rotando el orden de preferencia
      const dirsOrden = direcciones.slice(idxPal % direcciones.length).concat(direcciones.slice(0, idxPal % direcciones.length));
      let colocada = false;
      for (let intento = 0; intento < 200 && !colocada; intento++) {
        const dir = dirsOrden[intento % dirsOrden.length];
        const fila = Math.floor(Math.random() * TAM);
        const col = Math.floor(Math.random() * TAM);
        if (puedeColocar(palabra, fila, col, dir.dr, dir.dc)) {
          colocar(palabra, fila, col, dir.dr, dir.dc);
          dirsUsadas[dir.tipo]++;
          colocadas.push({
            palabra, fila, col, dr: dir.dr, dc: dir.dc,
            audioPalabra: pObj.audio, audioDefinicion: pObj.audioDefinicion, definicionTexto: pObj.definicionTexto
          });
          colocada = true;
        }
      }
    });

    // Rellenar vacíos con letras random
    for (let f = 0; f < TAM; f++) {
      for (let c = 0; c < TAM; c++) {
        if (grid[f][c] === null) grid[f][c] = letras[Math.floor(Math.random() * letras.length)];
      }
    }

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="sopa-layout">
        <div class="sopa-grid"></div>
        <div class="sopa-lista"></div>
      </div>
      <div class="sopa-definicion-actual"></div>
      <div class="feedback"></div>`;

    const gridWrap = cont.querySelector(".sopa-grid");
    gridWrap.style.gridTemplateColumns = `repeat(${TAM}, minmax(0, 1fr))`;
    const listaWrap = cont.querySelector(".sopa-lista");
    const definicionActual = cont.querySelector(".sopa-definicion-actual");
    const feedback = cont.querySelector(".feedback");

    const celdas = [];
    for (let f = 0; f < TAM; f++) {
      celdas.push([]);
      for (let c = 0; c < TAM; c++) {
        const celda = el("button", "sopa-celda", grid[f][c]);
        celda.dataset.f = f; celda.dataset.c = c;
        gridWrap.appendChild(celda);
        celdas[f].push(celda);
      }
    }

    colocadas.forEach((pal) => {
      const li = el("div", "sopa-item-pendiente", pal.palabra);
      li.dataset.palabra = pal.palabra;
      listaWrap.appendChild(li);
    });

    // Hook interno para testeo automatizado (jsdom): expone las posiciones reales.
    window.__sopaColocadas = colocadas.map((pal) => ({
      inicio: { f: pal.fila, c: pal.col },
      fin: { f: pal.fila + pal.dr * (pal.palabra.length - 1), c: pal.col + pal.dc * (pal.palabra.length - 1) }
    }));

    let seleccionInicio = null;
    let encontradas = 0;

    function celdaClick(f, c) {
      if (!interaccionHabilitada) return;
      if (!seleccionInicio) {
        seleccionInicio = { f, c };
        celdas[f][c].classList.add("sopa-sel-inicio");
        return;
      }
      // Se acepta tocar los dos extremos de una palabra en CUALQUIER orden
      // (por ejemplo, para palabras que van de abajo hacia arriba, es
      // natural tocar primero la letra de más arriba en pantalla).
      const toqueA = seleccionInicio, toqueB = { f, c };
      const match = colocadas.find((pal) => {
        if (pal.encontrada) return false;
        const inicioF = pal.fila, inicioC = pal.col;
        const finF = pal.fila + pal.dr * (pal.palabra.length - 1);
        const finC = pal.col + pal.dc * (pal.palabra.length - 1);
        const ordenNormal = toqueA.f === inicioF && toqueA.c === inicioC && toqueB.f === finF && toqueB.c === finC;
        const ordenInverso = toqueA.f === finF && toqueA.c === finC && toqueB.f === inicioF && toqueB.c === inicioC;
        return ordenNormal || ordenInverso;
      });
      if (match) {
        match.encontrada = true;
        for (let i = 0; i < match.palabra.length; i++) {
          celdas[match.fila + match.dr * i][match.col + match.dc * i].classList.add("sopa-encontrada");
        }
        const li = listaWrap.querySelector(`[data-palabra="${match.palabra}"]`);
        li.classList.remove("sopa-item-pendiente");
        li.classList.add("sopa-item-tachada");
        // La definición siempre aparece en el MISMO lugar debajo de la sopa
        // (se reemplaza con cada palabra nueva), para no estirar la pantalla.
        definicionActual.innerHTML = `<strong>${match.palabra}:</strong> ${match.definicionTexto || ""}`;
        colaAudio.reproducir(match.audioPalabra, () => colaAudio.reproducir(match.audioDefinicion));
        encontradas++;
        if (encontradas === colocadas.length) {
          aciertos += 1; puntos += 10;
          feedback.textContent = "¡Encontraste todas las palabras!";
          marcarResuelta();
        }
      }
      celdas[seleccionInicio.f][seleccionInicio.c].classList.remove("sopa-sel-inicio");
      seleccionInicio = null;
    }

    for (let f = 0; f < TAM; f++) {
      for (let c = 0; c < TAM; c++) {
        celdas[f][c].addEventListener("click", () => celdaClick(f, c));
      }
    }
  }

  /* ---------- Init ---------- */
  // Hook de testeo (jsdom): permite saltar a una pantalla puntual sin
  // tener que navegar por toda la secuencia. No afecta el uso normal.
  window.__irAPantalla = function (i) { idx = i; render(); };
  window.__getStats = function () { return { aciertos, errores, puntos }; };
  render();
})();
