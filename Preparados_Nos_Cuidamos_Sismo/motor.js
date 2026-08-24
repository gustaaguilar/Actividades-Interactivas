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

    const pantalla = D.pantallas[idx];
    const cont = el("div", "pantalla pantalla-" + pantalla.tipo + " esperando-audio");
    app.appendChild(cont);

    switch (pantalla.tipo) {
      case "portada": renderPortada(cont, pantalla); return;
      case "cierre": renderCierre(cont, pantalla); return;
      case "video": renderVideo(cont, pantalla); return;
      case "narracion": renderNarracion(cont, pantalla); break;
      case "clasificar": renderClasificar(cont, pantalla); break;
      case "ordenar": renderOrdenar(cont, pantalla); break;
      case "trivia": renderTrivia(cont, pantalla); break;
      case "trivia_multi": renderTriviaMulti(cont, pantalla); break;
      case "asociar": renderAsociar(cont, pantalla); break;
      case "hotspot": renderHotspot(cont, pantalla); break;
      case "recorrido": renderRecorrido(cont, pantalla); break;
      case "sopaLetras": renderSopaLetras(cont, pantalla); break;
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
    if (idx < D.pantallas.length - 1) {
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
  function renderNarracion(cont, p) {
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <img class="img-pantalla" src="${p.imagen}" alt="${p.titulo}" />
      <p class="texto-narracion">${p.texto}</p>`;
    // Pantalla informativa: se marca resuelta cuando termina el audio (ver render()).
  }

  /* ---------- CLASIFICAR (tap-to-select, validación y justificación inmediata) ---------- */
  function renderClasificar(cont, p) {
    const items = shuffle(p.items);
    const resueltos = new Set(); // ids de items YA clasificados correctamente
    let seleccion = null; // { tipo: "item"|"categoria", id }

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <img class="img-pantalla" src="${p.imagen}" alt="${p.titulo}" />
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

      if (correcto) {
        resueltos.add(itemId);
        chip.classList.add("asignado", "correcto");
        chip.style.borderColor = cat.color;
        aciertos += 1; puntos += 5;
        colaAudio.reproducir(it.audioCorrecta || it.audio);

        // Recién se marca terminada la actividad DESPUÉS de resolver
        // correctamente el último ítem (evita el bug de cierre anticipado).
        if (resueltos.size === items.length) {
          feedback.textContent = "¡Listo! Ya clasificaste todo.";
          colaAudio.reproducir(p.audioConfirma, marcarResuelta);
        }
      } else {
        // Incorrecto: NO se coloca. Vuelve a quedar disponible para reintentar.
        errores += 1;
        chip.classList.add("incorrecto");
        setTimeout(() => chip.classList.remove("incorrecto"), 700);
        colaAudio.reproducir(it.audioIncorrecta || it.audio);
      }
    }

    function tocarItem(it, chip) {
      if (!interaccionHabilitada || resueltos.has(it.id)) return;
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
      if (seleccion && seleccion.tipo === "item") {
        intentarResolver(seleccion.id, cat.id);
      } else {
        seleccion = { tipo: "categoria", id: cat.id };
        limpiarSeleccionVisual();
        catBtn.classList.add("seleccionado");
      }
    }

    items.forEach((it) => {
      const chip = el("div", "item-chip", `<img src="${it.imagen}" alt="${it.texto}"/><span>${it.texto}</span>`);
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

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <img class="img-pantalla" src="${p.imagen}" alt="${p.titulo}" />
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="ordenar-opciones"></div>
      <div class="ordenar-resultado"></div>
      <div class="feedback"></div>`;

    const opcionesWrap = cont.querySelector(".ordenar-opciones");
    const resultadoWrap = cont.querySelector(".ordenar-resultado");
    const feedback = cont.querySelector(".feedback");

    pasosDesordenados.forEach((paso) => {
      const chip = el("div", "paso-chip", paso.texto);
      chip.dataset.id = paso.id;
      chip.addEventListener("click", () => {
        if (!interaccionHabilitada || chip.classList.contains("usado")) return;

        const esperado = p.pasos[siguienteEsperado];
        if (paso.id === esperado.id) {
          chip.classList.add("usado");
          colaAudio.reproducir(paso.audio);
          const numChip = el("div", "paso-numerado", `${siguienteEsperado + 1}. ${paso.texto}`);
          resultadoWrap.appendChild(numChip);
          aciertos += 1; puntos += 5;
          siguienteEsperado++;

          if (siguienteEsperado === p.pasos.length) {
            feedback.textContent = "¡Excelente! El orden es correcto.";
            colaAudio.reproducir(p.audioConfirma, marcarResuelta);
          }
        } else {
          errores += 1;
          chip.classList.add("incorrecto");
          setTimeout(() => chip.classList.remove("incorrecto"), 500);
        }
      });
      opcionesWrap.appendChild(chip);
    });
  }

  /* ---------- TRIVIA (una pregunta) ---------- */
  function renderTrivia(cont, p) {
    const opciones = shuffle(p.opciones);
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <img class="img-pantalla" src="${p.imagen}" alt="${p.titulo}" />
      <p class="instruccion">${p.instruccionTexto}</p>
      <p class="pregunta">${p.pregunta}</p>
      <div class="trivia-opciones"></div>
      <button id="btn-verificar" class="btn-verificar" disabled>Verificar</button>
      <div class="feedback"></div>`;

    const opcionesWrap = cont.querySelector(".trivia-opciones");
    const btnVerificar = cont.querySelector("#btn-verificar");
    const feedback = cont.querySelector(".feedback");
    let seleccionada = null;

    opciones.forEach((op) => {
      const btn = el("button", "opcion-btn", op.texto);
      btn.addEventListener("click", () => {
        if (!interaccionHabilitada || actividadResuelta) return;
        opcionesWrap.querySelectorAll(".opcion-btn").forEach((b) => b.classList.remove("seleccionada"));
        btn.classList.add("seleccionada");
        seleccionada = op;
        btnVerificar.disabled = false;
      });
      opcionesWrap.appendChild(btn);
    });

    btnVerificar.addEventListener("click", () => {
      if (actividadResuelta || !seleccionada) return;
      const ok = seleccionada.correcta;
      aciertos += ok ? 1 : 0;
      errores += ok ? 0 : 1;
      puntos += ok ? 10 : 0;
      feedback.textContent = ok ? "¡Correcto!" : "Esa no era, pero seguimos aprendiendo.";
      btnVerificar.disabled = true;
      const audioFeedback = ok ? p.audioConfirmaCorrecta : p.audioConfirmaIncorrecta;
      colaAudio.reproducir(audioFeedback, marcarResuelta);
    });
  }

  /* ---------- TRIVIA MÚLTIPLE (varias preguntas en la misma pantalla) ---------- */
  function renderTriviaMulti(cont, p) {
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <img class="img-pantalla" src="${p.imagen}" alt="${p.titulo}" />
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="trivia-multi-preguntas"></div>`;

    const wrap = cont.querySelector(".trivia-multi-preguntas");
    let resueltas = 0;
    const total = p.preguntas.length;

    p.preguntas.forEach((preg, iPreg) => {
      const opciones = shuffle(preg.opciones);
      const bloque = el("div", "trivia-multi-bloque");
      bloque.innerHTML = `
        <p class="pregunta">${iPreg + 1}. ${preg.pregunta}</p>
        <div class="trivia-opciones"></div>
        <button class="btn-verificar" disabled>Verificar</button>
        <div class="feedback"></div>`;
      const opcionesWrap = bloque.querySelector(".trivia-opciones");
      const btnVerificar = bloque.querySelector(".btn-verificar");
      const feedback = bloque.querySelector(".feedback");
      let seleccionada = null;
      let resuelta = false;

      opciones.forEach((op) => {
        const btn = el("button", "opcion-btn", op.texto);
        btn.addEventListener("click", () => {
          if (!interaccionHabilitada || resuelta) return;
          opcionesWrap.querySelectorAll(".opcion-btn").forEach((b) => b.classList.remove("seleccionada"));
          btn.classList.add("seleccionada");
          seleccionada = op;
          btnVerificar.disabled = false;
        });
        opcionesWrap.appendChild(btn);
      });

      btnVerificar.addEventListener("click", () => {
        if (resuelta || !seleccionada) return;
        resuelta = true;
        const ok = seleccionada.correcta;
        aciertos += ok ? 1 : 0;
        errores += ok ? 0 : 1;
        puntos += ok ? 10 : 0;
        feedback.textContent = ok ? "¡Correcto!" : "Esa no era.";
        btnVerificar.disabled = true;
        const audioFeedback = ok ? preg.audioConfirmaCorrecta : preg.audioConfirmaIncorrecta;
        colaAudio.reproducir(audioFeedback, () => {
          resueltas++;
          if (resueltas === total) marcarResuelta();
        });
      });

      wrap.appendChild(bloque);
    });
  }

  /* ---------- ASOCIAR (tap tarjeta izquierda + tap tarjeta derecha) ---------- */
  function renderAsociar(cont, p) {
    const izqs = shuffle(p.pares.map((par) => ({ id: par.id, texto: par.izq, imagen: par.izqImagen, audio: par.izqAudio })));
    const ders = shuffle(p.pares.map((par) => ({ id: par.id, texto: par.der, audio: par.derAudio })));
    let seleccionIzq = null;
    let resueltos = 0;

    cont.innerHTML = `
      <h2>${p.titulo}</h2>
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
        const chipIzq = colIzq.querySelector(`[data-id="${seleccionIzq}"]`);
        if (seleccionIzq === it.id) {
          const par = p.pares.find((x) => x.id === it.id);
          chip.classList.add("resuelto", "correcto");
          chipIzq.classList.add("resuelto", "correcto");
          colaAudio.reproducir(par.audioConfirmaPar);
          aciertos += 1; puntos += 5;
          resueltos++;
          seleccionIzq = null;
          if (resueltos === p.pares.length) {
            feedback.textContent = "¡Uniste todas las parejas correctamente!";
            marcarResuelta();
          }
        } else {
          errores += 1;
          chip.classList.add("incorrecto");
          setTimeout(() => chip.classList.remove("incorrecto"), 600);
        }
      });
      colDer.appendChild(chip);
    });
  }

  /* ---------- HOTSPOT (tocar zonas sobre una imagen) ---------- */
  function renderHotspot(cont, p) {
    let encontrados = 0;
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <p class="instruccion">${p.instruccionTexto}</p>
      <div class="hotspot-wrap">
        <img src="${p.imagen}" class="hotspot-img" alt="${p.titulo}" />
      </div>
      <p class="hotspot-descripcion"></p>
      <div class="feedback"></div>`;

    const wrap = cont.querySelector(".hotspot-wrap");
    const descripcion = cont.querySelector(".hotspot-descripcion");
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

    p.zonas.forEach((z) => {
      const zonaEl = el("button", "hotspot-zona");
      zonaEl.style.left = (z.x * 100) + "%";
      zonaEl.style.top = (z.y * 100) + "%";
      zonaEl.style.width = (z.w * 100) + "%";
      zonaEl.style.height = (z.h * 100) + "%";
      zonaEl.title = z.label;
      zonaEl.addEventListener("click", () => {
        if (!interaccionHabilitada || zonaEl.classList.contains("encontrada")) return;
        zonaEl.classList.add("encontrada");
        descripcion.textContent = z.label;
        colaAudio.reproducir(z.audio);
        aciertos += 1; puntos += 5;
        encontrados++;
        if (encontrados === p.zonas.length) {
          feedback.textContent = "¡Cortaste todos los suministros!";
          colaAudio.reproducir(p.audioConfirma, marcarResuelta);
        }
      });
      wrap.appendChild(zonaEl);
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
    const dirsUsadas = { H: 0, V: 0, D: 0 };
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

    // Direcciones permitidas por estándar: horizontal izq->der, vertical arriba->abajo, diagonal avanzando izq->der
    const direcciones = [
      { dr: 0, dc: 1, tipo: "H" },
      { dr: 1, dc: 0, tipo: "V" },
      { dr: 1, dc: 1, tipo: "D" }
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
          colocadas.push({ palabra, fila, col, dr: dir.dr, dc: dir.dc, audio: pObj.audio });
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
      <div class="feedback"></div>`;

    const gridWrap = cont.querySelector(".sopa-grid");
    gridWrap.style.gridTemplateColumns = `repeat(${TAM}, 1fr)`;
    const listaWrap = cont.querySelector(".sopa-lista");
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
      const li = el("div", "sopa-palabra", pal.palabra);
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
      // calcular dirección entre inicio y fin, y verificar coincidencia con alguna palabra
      const fin = { f, c };
      const df = fin.f - seleccionInicio.f, dcc = fin.c - seleccionInicio.c;
      let dr = Math.sign(df), dc = Math.sign(dcc);
      const match = colocadas.find((pal) => {
        if (pal.dr !== dr || pal.dc !== dc) return false;
        const finEsperadoF = pal.fila + pal.dr * (pal.palabra.length - 1);
        const finEsperadoC = pal.col + pal.dc * (pal.palabra.length - 1);
        return pal.fila === seleccionInicio.f && pal.col === seleccionInicio.c &&
               finEsperadoF === fin.f && finEsperadoC === fin.c;
      });
      if (match && !match.encontrada) {
        match.encontrada = true;
        for (let i = 0; i < match.palabra.length; i++) {
          celdas[match.fila + match.dr * i][match.col + match.dc * i].classList.add("sopa-encontrada");
        }
        listaWrap.querySelector(`[data-palabra="${match.palabra}"]`).classList.add("tachada");
        colaAudio.reproducir(match.audio);
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
  render();
})();
