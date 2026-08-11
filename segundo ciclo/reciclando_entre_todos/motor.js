// motor.js — Motor "Los Materiales" (version ilustrada, 6 modulos)
// Tipos soportados: portada, narracion, clasificar, clasificarUno,
// sopaDeLetras, memojuego, asociar, ordenar, multiple, flipcards,
// detective, balanza, cierre

(function () {
  "use strict";

  let idx = 0;
  let aciertos = 0;
  let errores = 0;
  let puntos = 0;
  let completado = false;
  let actividadLista = false;
  let audioReproduciendo = false;

  const PUNTOS_POR_ACIERTO = 10;

  const app = document.getElementById("app");
  const audioPlayer = document.getElementById("audioPlayer");
  let colaAudio = [];

  // ---------- COLA DE AUDIO GLOBAL ----------
  function limpiarColaAudio() {
    colaAudio = [];
    audioReproduciendo = false;
    audioPlayer.onended = null;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  function encolarAudio(src, alTerminar) {
    if (!src) { if (alTerminar) alTerminar(); return; }
    colaAudio.push({ src, alTerminar });
    if (!audioReproduciendo) reproducirSiguienteAudio();
  }

  function reproducirSiguienteAudio() {
    if (colaAudio.length === 0) {
      audioReproduciendo = false;
      intentarHabilitarSiguiente();
      return;
    }
    audioReproduciendo = true;
    const item = colaAudio.shift();
    audioPlayer.src = item.src;
    // Tanto si el audio termina bien como si falla, hay que avisar que
    // "terminó" y seguir con la cola — si no, la pantalla queda esperando
    // para siempre un aviso que nunca llega (Ajuste #9).
    const finalizar = () => {
      audioPlayer.onended = null;
      audioPlayer.onerror = null;
      if (item.alTerminar) item.alTerminar();
      reproducirSiguienteAudio();
    };
    audioPlayer.onended = finalizar;
    audioPlayer.onerror = finalizar;
    audioPlayer.play().catch(finalizar);
  }

  // Bloquea la interacción de una pantalla hasta que termine su audio de consigna,
  // para que los chicos no puedan tocar nada antes de escuchar la instrucción completa.
  // Ya NO atenuamos visualmente el contenido mientras suena el audio (a pedido
  // de Gustavo, para que la imagen y el texto se sigan viendo con normalidad).
  // Solo el botón "Siguiente" queda deshabilitado hasta que termine el audio
  // (eso ya lo maneja marcarCompletado/intentarHabilitarSiguiente).
  function reproducirInstruccionYDesbloquear(cont, audioSrc) {
    if (!audioSrc) return;
    encolarAudio(audioSrc);
  }

  // ---------- UTILIDADES ----------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function crear(tag, props, ...hijos) {
    const el = document.createElement(tag);
    if (props) {
      for (const k in props) {
        if (k === "class") el.className = props[k];
        else if (k === "html") el.innerHTML = props[k];
        else el.setAttribute(k, props[k]);
      }
    }
    hijos.forEach((h) => {
      if (h) el.appendChild(typeof h === "string" ? document.createTextNode(h) : h);
    });
    return el;
  }

  function marcarCompletado() {
    actividadLista = true;
    setTimeout(intentarHabilitarSiguiente, 0);
  }

  function intentarHabilitarSiguiente() {
    if (actividadLista && !audioReproduciendo && colaAudio.length === 0) {
      completado = true;
      const btn = document.getElementById("btnSiguiente");
      if (btn) btn.classList.remove("bloqueado");
    }
  }

  function registrarAcierto() { aciertos++; puntos += PUNTOS_POR_ACIERTO; actualizarHeader(); }
  function registrarError() { errores++; }

  // ---------- NAVEGACIÓN ----------
  function irAPantalla(nuevoIdx) {
    limpiarColaAudio();
    idx = nuevoIdx;
    completado = false;
    actividadLista = false;
    render();
  }

  function siguiente() {
    if (!completado) return;
    if (idx < DATOS.pantallas.length - 1) irAPantalla(idx + 1);
  }

  // ---------- LIGHTBOX FOTO ----------
  function abrirLightbox() {
    const overlay = crear("div", { class: "lightbox-overlay" });
    overlay.addEventListener("click", () => overlay.remove());
    const mailFila = crear(
      "p",
      { class: "lightbox-mail" },
      crear("span", { class: "icono-sobre" }, "✉️"),
      " " + DATOS.contactoMail
    );
    const caja = crear(
      "div",
      { class: "lightbox-caja" },
      crear("img", { src: DATOS.fotoPerfil, class: "lightbox-img" }),
      crear("p", { class: "lightbox-frase" }, "Menos prisa, más vida 🧉🫂"),
      crear("p", { class: "lightbox-contacto" }, DATOS.contactoTexto),
      mailFila
    );
    caja.addEventListener("click", (e) => e.stopPropagation());
    overlay.appendChild(caja);
    document.body.appendChild(overlay);
  }

  // ---------- HEADER (progreso + puntos) ----------
  function actualizarHeader() {
    const barra = document.getElementById("progresoBarra");
    const texto = document.getElementById("progresoTexto");
    const puntosEl = document.getElementById("puntosTexto");
    const total = DATOS.pantallas.length;
    const pct = Math.round(((idx + 1) / total) * 100);
    if (barra) barra.style.width = pct + "%";
    if (texto) texto.textContent = pct + "%";
    if (puntosEl) puntosEl.textContent = puntos;
  }

  function renderHeader() {
    const header = crear("div", { class: "header-app" });
    header.appendChild(crear("div", { class: "header-titulo" }, DATOS.titulo.toUpperCase()));
    const progCont = crear(
      "div",
      { class: "header-progreso" },
      crear("span", { class: "header-label" }, "PROGRESO"),
      crear("div", { class: "progreso-track" }, crear("div", { id: "progresoBarra", class: "progreso-fill" })),
      crear("span", { id: "progresoTexto", class: "progreso-pct" }, "0%")
    );
    header.appendChild(progCont);
    header.appendChild(
      crear("div", { class: "header-puntos" }, "⭐ ", crear("span", { id: "puntosTexto" }, String(puntos)), " puntos")
    );
    return header;
  }

  function renderModuloBadge(p) {
    if (!p.modulo) return null;
    return crear("div", { class: "modulo-badge" }, p.modulo);
  }

  // ---------- BARRA DE NAVEGACIÓN ----------
  function barraNavegacion(sinBloqueo) {
    if (sinBloqueo) marcarCompletado();
    const esUltima = idx === DATOS.pantallas.length - 1;
    const btn = crear(
      "button",
      { id: "btnSiguiente", class: "btn-siguiente" + (completado ? "" : " bloqueado") },
      esUltima ? "Finalizar" : "Siguiente →"
    );
    if (!esUltima) btn.addEventListener("click", siguiente);
    else btn.style.display = "none";
    return btn;
  }

  // ============================================================
  // RENDER POR TIPO
  // ============================================================

  function renderPortada(p) {
    app.innerHTML = "";
    const cont = crear("div", { class: "pantalla portada" });
    cont.appendChild(crear("img", { src: p.imagen, class: "portada-img" }));
    cont.appendChild(crear("h1", { class: "portada-titulo" }, p.titulo));
    cont.appendChild(crear("p", { class: "portada-subtitulo" }, p.subtitulo));
    const fotoBtn = crear("img", { src: DATOS.fotoPerfil, class: "portada-foto" });
    fotoBtn.addEventListener("click", abrirLightbox);
    cont.appendChild(fotoBtn);
    cont.appendChild(crear("p", { class: "contacto-linea" }, DATOS.contactoTexto));
    cont.appendChild(crear("p", { class: "contacto-linea" }, "✉️ " + DATOS.contactoMail));
    const btnComenzar = crear("button", { class: "btn-comenzar" }, "Comenzar");
    btnComenzar.addEventListener("click", siguiente);
    cont.appendChild(btnComenzar);
    app.appendChild(cont);
    completado = true;
  }

  function renderNarracion(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla narracion" });
    if (p.imagen) cont.appendChild(crear("img", { src: p.imagen, class: "narracion-img" }));
    cont.appendChild(crear("p", { class: "narracion-texto" }, p.texto));
    app.appendChild(cont);
    app.appendChild(barraNavegacion(true));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  function renderClasificar(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla clasificar" });
    if (p.imagen) cont.appendChild(crear("img", { src: p.imagen, class: "clasificar-img-contexto" }));
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    let seleccionado = null;
    const restantes = new Set(p.items.map((_, i) => i));
    const itemEls = [];

    const filaItems = crear("div", { class: "fila-items" });
    p.items.forEach((item, i) => {
      const b = crear("button", { class: "item-clasificar" }, item.texto);
      b.addEventListener("click", () => {
        if (!restantes.has(i)) return;
        itemEls.forEach((el) => el.classList.remove("seleccionado"));
        b.classList.add("seleccionado");
        seleccionado = i;
        if (item.audio) encolarAudio(item.audio);
      });
      itemEls.push(b);
      filaItems.appendChild(b);
    });
    cont.appendChild(filaItems);

    const filaCategorias = crear("div", { class: "fila-categorias" });
    p.categorias.forEach((cat) => {
      const casillero = crear("div", { class: "casillero" }, crear("h3", null, cat));
      const listaEl = crear("div", { class: "casillero-lista" });
      casillero.appendChild(listaEl);
      casillero.addEventListener("click", () => {
        if (seleccionado === null) return;
        const item = p.items[seleccionado];
        if (item.categoria === cat) {
          registrarAcierto();
          if (item.audioConfirma) encolarAudio(item.audioConfirma);
          listaEl.appendChild(crear("div", { class: "chip-correcto" }, item.texto));
          itemEls[seleccionado].remove();
          restantes.delete(seleccionado);
          seleccionado = null;
          if (restantes.size === 0) marcarCompletado();
        } else {
          registrarError();
          casillero.classList.add("shake");
          setTimeout(() => casillero.classList.remove("shake"), 400);
        }
      });
      filaCategorias.appendChild(casillero);
    });
    cont.appendChild(filaCategorias);

    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  // Versión visual de "clasificar": los residuos son imágenes grandes y los
  // contenedores son tachos ilustrados de color. Al acertar, el residuo "cae"
  // animado dentro del contenedor y desaparece (Ajuste #2).
  function renderClasificarVisual(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla clasificar-visual" });
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    let seleccionado = null;
    const restantes = new Set(p.items.map((_, i) => i));
    const itemEls = [];

    const filaItems = crear("div", { class: "fila-residuos" });
    p.items.forEach((item, i) => {
      const b = crear("button", { class: "residuo-item" });
      b.appendChild(crear("img", { src: item.imagen, class: "residuo-img", alt: item.texto }));
      b.addEventListener("click", () => {
        if (!restantes.has(i)) return;
        itemEls.forEach((el) => el.el.classList.remove("seleccionado"));
        b.classList.add("seleccionado");
        seleccionado = i;
        if (item.audio) encolarAudio(item.audio);
      });
      itemEls.push({ i, el: b });
      filaItems.appendChild(b);
    });
    cont.appendChild(filaItems);

    const filaContenedores = crear("div", { class: "fila-contenedores" });
    p.contenedores.forEach((cont2) => {
      const tacho = crear("button", { class: "contenedor-item" });
      tacho.appendChild(crear("img", { src: cont2.imagen, class: "contenedor-img", alt: cont2.nombre }));
      tacho.addEventListener("click", () => {
        if (seleccionado === null) return;
        const item = p.items[seleccionado];
        const btnEl = itemEls.find((x) => x.i === seleccionado).el;
        if (item.categoria === cont2.nombre) {
          registrarAcierto();
          if (item.audioConfirma) encolarAudio(item.audioConfirma);
          // Efecto: el residuo "cae" dentro del contenedor y desaparece.
          const rectResiduo = btnEl.getBoundingClientRect();
          const rectTacho = tacho.getBoundingClientRect();
          const dx = (rectTacho.left + rectTacho.width / 2) - (rectResiduo.left + rectResiduo.width / 2);
          const dy = (rectTacho.top + rectTacho.height / 2) - (rectResiduo.top + rectResiduo.height / 2);
          btnEl.style.setProperty("--dx", dx + "px");
          btnEl.style.setProperty("--dy", dy + "px");
          btnEl.classList.add("cayendo-en-contenedor");
          tacho.classList.add("tacho-recibiendo");
          setTimeout(() => tacho.classList.remove("tacho-recibiendo"), 350);
          setTimeout(() => { btnEl.remove(); }, 420);
          restantes.delete(seleccionado);
          seleccionado = null;
          if (restantes.size === 0) marcarCompletado();
        } else {
          registrarError();
          tacho.classList.add("shake");
          setTimeout(() => tacho.classList.remove("shake"), 400);
        }
      });
      filaContenedores.appendChild(tacho);
    });
    cont.appendChild(filaContenedores);

    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  function renderClasificarUno(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla clasificar-uno" });
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    let actual = 0;
    const imgCont = crear("div", { class: "cu-imagen-cont" });
    const botonesCont = crear("div", { class: "cu-botones" });
    cont.appendChild(imgCont);
    cont.appendChild(botonesCont);
    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();

    function mostrarItem() {
      if (actual >= p.items.length) { marcarCompletado(); return; }
      const item = p.items[actual];
      imgCont.innerHTML = "";
      imgCont.appendChild(crear("img", { src: item.imagen, class: "cu-imagen" }));
      imgCont.appendChild(crear("p", { class: "cu-etiqueta" }, item.etiqueta));
      botonesCont.innerHTML = "";
      p.categorias.forEach((cat) => {
        const b = crear("button", { class: "btn-categoria-grande" }, cat);
        b.addEventListener("click", () => {
          if (item.categoria === cat) {
            registrarAcierto();
            b.classList.add("correcto-flash");
            const audioConf = p.audioConfirma && p.audioConfirma[cat];
            if (audioConf) encolarAudio(audioConf);
          } else {
            registrarError();
            b.classList.add("error-flash");
          }
          setTimeout(() => { actual++; mostrarItem(); }, 500);
        });
        botonesCont.appendChild(b);
      });
      if (item.audioNombre) encolarAudio(item.audioNombre);
    }
    reproducirInstruccionYDesbloquear(cont, p.audio);
    mostrarItem();
  }

  function renderMultiple(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla multiple" });
    if (p.imagen) cont.appendChild(crear("img", { src: p.imagen, class: "clasificar-img-contexto" }));
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    let actual = 0;
    const preguntaCont = crear("div", { class: "mp-pregunta-cont" });
    cont.appendChild(preguntaCont);
    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();

    function mostrarPregunta() {
      if (actual >= p.preguntas.length) { marcarCompletado(); return; }
      const q = p.preguntas[actual];
      preguntaCont.innerHTML = "";
      if (q.imagen) preguntaCont.appendChild(crear("img", { src: q.imagen, class: "vf-imagen" }));
      preguntaCont.appendChild(crear("h3", { class: "mp-pregunta" }, q.pregunta));
      const opcionesCont = crear("div", { class: "mp-opciones" });
      let respondido = false;
      shuffle(q.opciones).forEach((op) => {
        const b = crear("button", { class: "mp-opcion" }, op);
        b.addEventListener("click", () => {
          if (respondido) return;
          respondido = true;
          if (op === q.correcta) {
            registrarAcierto();
            b.classList.add("correcto-flash");
            if (q.audioConfirma) {
              encolarAudio(q.audioConfirma, () => { actual++; mostrarPregunta(); });
            } else {
              setTimeout(() => { actual++; mostrarPregunta(); }, 600);
            }
          } else {
            registrarError();
            b.classList.add("error-flash");
            setTimeout(() => { actual++; mostrarPregunta(); }, 600);
          }
        });
        opcionesCont.appendChild(b);
      });
      preguntaCont.appendChild(opcionesCont);
      // Altavoz para volver a escuchar la pregunta (Ajuste #5)
      const btnAltavoz = crear("button", { class: "btn-altavoz", title: "Escuchar de nuevo" }, "🔊");
      btnAltavoz.addEventListener("click", () => { if (q.audio) encolarAudio(q.audio); });
      preguntaCont.appendChild(btnAltavoz);
      if (q.audio) encolarAudio(q.audio);
    }
    mostrarPregunta();
  }

  function renderAsociar(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla asociar" });
    if (p.imagen) cont.appendChild(crear("img", { src: p.imagen, class: "clasificar-img-contexto" }));
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    const colIzq = crear("div", { class: "asociar-col" });
    const colDer = crear("div", { class: "asociar-col" });
    const conceptos = shuffle(p.pares.map((par, i) => ({ ...par, i })));
    const funciones = shuffle(p.pares.map((par, i) => ({ ...par, i })));

    let seleccionIzq = null;
    const emparejados = new Set();
    const elIzq = {}, elDer = {};
    const PALETA_PAREJAS = ["#fde68a", "#a7f3d0", "#bfdbfe", "#fbcfe8", "#fecaca", "#ddd6fe", "#fed7aa", "#bbf7d0"];

    conceptos.forEach((par) => {
      const b = crear("button", { class: "asociar-item" }, par.concepto);
      b.addEventListener("click", () => {
        if (emparejados.has(par.i)) return;
        Object.values(elIzq).forEach((el) => el.classList.remove("seleccionado"));
        b.classList.add("seleccionado");
        seleccionIzq = par.i;
      });
      elIzq[par.i] = b;
      colIzq.appendChild(b);
    });

    funciones.forEach((par) => {
      const b = crear("button", { class: "asociar-item" }, par.funcion);
      b.addEventListener("click", () => {
        if (emparejados.has(par.i)) return;
        if (seleccionIzq === null) return;
        if (seleccionIzq === par.i) {
          registrarAcierto();
          const color = PALETA_PAREJAS[emparejados.size % PALETA_PAREJAS.length];
          elIzq[par.i].classList.add("asociar-emparejado");
          b.classList.add("asociar-emparejado");
          elIzq[par.i].style.background = color;
          b.style.background = color;
          emparejados.add(par.i);
          seleccionIzq = null;
          if (par.audioConcepto) encolarAudio(par.audioConcepto);
          if (par.audioFuncion) encolarAudio(par.audioFuncion);
          if (emparejados.size === p.pares.length) marcarCompletado();
        } else {
          registrarError();
          b.classList.add("error-flash");
          setTimeout(() => b.classList.remove("error-flash"), 400);
        }
      });
      elDer[par.i] = b;
      colDer.appendChild(b);
    });

    cont.appendChild(crear("div", { class: "asociar-filas" }, colIzq, colDer));
    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  function renderOrdenar(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla ordenar" });
    if (p.imagen) cont.appendChild(crear("img", { src: p.imagen, class: "clasificar-img-contexto" }));
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    const destino = crear("div", { class: "ordenar-destino" });
    const banco = crear("div", { class: "ordenar-banco" });
    cont.appendChild(destino);
    cont.appendChild(banco);

    let posEsperada = 0;
    const palabrasMezcladas = shuffle(p.items.map((texto, i) => ({ texto, i })));
    window.__ultimoOrdenarBotones = [];

    palabrasMezcladas.forEach((pal) => {
      const b = crear("button", { class: "ordenar-palabra" }, pal.texto);
      window.__ultimoOrdenarBotones.push({ el: b, i: pal.i });
      b.addEventListener("click", () => {
        if (b.disabled) return;
        if (pal.i === posEsperada) {
          registrarAcierto();
          b.disabled = true;
          b.classList.add("usada");
          destino.appendChild(crear("span", { class: "ordenar-colocada" }, pal.texto + " "));
          posEsperada++;
          if (posEsperada === p.items.length) {
            if (p.oracionAudio) encolarAudio(p.oracionAudio);
            marcarCompletado();
          }
        } else {
          registrarError();
          b.classList.add("error-flash");
          setTimeout(() => b.classList.remove("error-flash"), 400);
        }
      });
      banco.appendChild(b);
    });

    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  // ---------- FLIPCARDS ----------
  // ---------- PRESENTACIÓN DE CONTENEDORES (Ajuste #10) ----------
  function renderPresentarContenedores(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla presentar-contenedores" });
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    const vistos = new Set();
    const grande = crear("div", { class: "presentar-grande" });
    const imgGrande = crear("img", { class: "presentar-img-grande" });
    const nombreGrande = crear("h3", { class: "presentar-nombre-grande" }, "👆 Tocá un contenedor");
    grande.appendChild(imgGrande);
    grande.appendChild(nombreGrande);
    cont.appendChild(grande);

    const filaIconos = crear("div", { class: "fila-contenedores presentar-iconos" });
    p.contenedores.forEach((c, i) => {
      const btn = crear("button", { class: "contenedor-item presentar-icono" });
      btn.appendChild(crear("img", { src: c.imagen, class: "contenedor-img" }));
      const marca = crear("span", { class: "presentar-check" }, "");
      btn.appendChild(marca);
      btn.addEventListener("click", () => {
        imgGrande.setAttribute("src", c.imagen);
        nombreGrande.textContent = c.nombre;
        if (c.audio) encolarAudio(c.audio);
        if (!vistos.has(i)) {
          vistos.add(i);
          registrarAcierto();
          marca.textContent = "✔";
          btn.classList.add("presentar-visto");
          if (vistos.size === p.contenedores.length) marcarCompletado();
        }
      });
      filaIconos.appendChild(btn);
    });
    cont.appendChild(filaIconos);

    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  // ---------- FLIPCARDS ----------
  function renderFlipcards(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla flipcards" });
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    const grid = crear("div", { class: "flip-grid" });
    let reveladas = 0;

    p.items.forEach((item) => {
      const card = crear("div", { class: "flip-card" });
      const frente = crear(
        "div",
        { class: "flip-frente" },
        crear("img", { src: item.imagen, class: "flip-img" }),
        crear("span", { class: "flip-nombre" }, item.frente)
      );
      const dorso = crear(
        "div",
        { class: "flip-dorso" },
        crear("span", { class: "flip-dorso-texto" }, item.dorsoTexto)
      );
      card.appendChild(frente);
      card.appendChild(dorso);
      card.addEventListener("click", () => {
        if (card.classList.contains("volteada")) return;
        card.classList.add("volteada");
        registrarAcierto();
        if (item.audio) encolarAudio(item.audio);
        reveladas++;
        if (reveladas === p.items.length) marcarCompletado();
      });
      grid.appendChild(card);
    });

    cont.appendChild(grid);
    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
  }

  // ---------- MEMOJUEGO ----------
  function renderMemojuego(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla memojuego" });
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    const cartas = [];
    p.pares.forEach((par, i) => {
      cartas.push({ parId: i, lado: par.a });
      cartas.push({ parId: i, lado: par.b });
    });
    const mezcladas = shuffle(cartas);
    window.__ultimoMemoCartas = [];

    let primera = null, bloqueado = false, encontrados = 0;
    const grid = crear("div", { class: "memo-grid" });

    function contenidoLado(lado) {
      if (lado.tipo === "imagen") {
        const wrap = crear("div", { class: "memo-cara-contenido" });
        wrap.appendChild(crear("img", { src: lado.valor, class: "memo-img" }));
        wrap.appendChild(crear("span", { class: "memo-etiqueta" }, lado.etiqueta || ""));
        return wrap;
      }
      return crear("span", { class: "memo-texto" }, lado.valor);
    }

    mezcladas.forEach((carta) => {
      const cardEl = crear("div", { class: "memo-carta" });
      const back = crear("div", { class: "memo-dorso" }, "?");
      const front = crear("div", { class: "memo-frente" }, contenidoLado(carta.lado));
      cardEl.appendChild(back);
      cardEl.appendChild(front);

      cardEl.addEventListener("click", () => {
        if (bloqueado || cardEl.classList.contains("volteada") || cardEl.classList.contains("resuelta")) return;
        cardEl.classList.add("volteada");
        if (carta.lado.audio) encolarAudio(carta.lado.audio);
        if (primera === null) {
          primera = { carta, el: cardEl };
        } else {
          bloqueado = true;
          const segunda = { carta, el: cardEl };
          if (primera.carta.parId === segunda.carta.parId && primera.el !== segunda.el) {
            registrarAcierto();
            primera.el.classList.add("resuelta");
            segunda.el.classList.add("resuelta");
            const parAcertado = p.pares[primera.carta.parId];
            if (parAcertado && parAcertado.audioConfirma) encolarAudio(parAcertado.audioConfirma);
            encontrados++;
            primera = null; bloqueado = false;
            if (encontrados === p.pares.length) marcarCompletado();
          } else {
            registrarError();
            setTimeout(() => {
              primera.el.classList.remove("volteada");
              segunda.el.classList.remove("volteada");
              primera = null; bloqueado = false;
            }, 800);
          }
        }
      });
      grid.appendChild(cardEl);
      window.__ultimoMemoCartas.push({ el: cardEl, parId: carta.parId });
    });

    cont.appendChild(grid);
    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  // ---------- SOPA DE LETRAS ----------
  const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Direcciones permitidas: siempre de izquierda a derecha en columnas.
  // horizontal (0,1) / vertical hacia abajo (1,0) / diagonal abajo-derecha (1,1) / diagonal arriba-derecha (-1,1)
  const DIRECCIONES = [[0, 1], [1, 0], [1, 1], [-1, 1]];

  function generarGrilla(palabras) {
    const maxLen = Math.max(...palabras.map((w) => w.length));
    const size = Math.max(maxLen + 2, 10);
    const grid = Array.from({ length: size }, () => Array(size).fill(null));
    const ubicaciones = [];

    function cabe(palabra, r, c, dr, dc) {
      for (let i = 0; i < palabra.length; i++) {
        const rr = r + dr * i, cc = c + dc * i;
        if (rr < 0 || rr >= size || cc < 0 || cc >= size) return false;
        const actual = grid[rr][cc];
        if (actual !== null && actual !== palabra[i]) return false;
      }
      return true;
    }

    // Se le asigna a cada palabra una dirección "preferida" distinta (rotando
    // entre las 4 disponibles) para que no tiendan a quedar todas iguales.
    const direccionesRotadas = shuffle(DIRECCIONES);

    palabras.forEach((palabraOriginal, idxPalabra) => {
      const palabra = palabraOriginal.replace(/[ÁÉÍÓÚ]/g, (m) => ({ Á: "A", É: "E", Í: "I", Ó: "O", Ú: "U" }[m]));
      let colocada = false;
      let intentos = 0;
      const preferida = direccionesRotadas[idxPalabra % direccionesRotadas.length];

      function colocarEn(r, c, dr, dc) {
        const celdas = [];
        for (let i = 0; i < palabra.length; i++) {
          const rr = r + dr * i, cc = c + dc * i;
          grid[rr][cc] = palabra[i];
          celdas.push([rr, cc]);
        }
        ubicaciones.push({ palabra: palabraOriginal, palabraNormalizada: palabra, celdas });
        colocada = true;
      }

      // Primero se intenta varias veces con la dirección preferida (para lograr variedad real);
      // si no entra, se prueba con cualquiera de las 4 direcciones permitidas.
      while (!colocada && intentos < 80) {
        intentos++;
        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);
        if (cabe(palabra, r, c, preferida[0], preferida[1])) colocarEn(r, c, preferida[0], preferida[1]);
      }
      while (!colocada && intentos < 200) {
        intentos++;
        const [dr, dc] = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)];
        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);
        if (cabe(palabra, r, c, dr, dc)) colocarEn(r, c, dr, dc);
      }

      if (!colocada) {
        outer:
        for (let r = 0; r < size && !colocada; r++) {
          for (let c = 0; c < size && !colocada; c++) {
            for (const [dr, dc] of DIRECCIONES) {
              if (cabe(palabra, r, c, dr, dc)) { colocarEn(r, c, dr, dc); break outer; }
            }
          }
        }
      }
    });

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === null) grid[r][c] = ABC[Math.floor(Math.random() * ABC.length)];
      }
    }
    return { grid, size, ubicaciones };
  }

  function renderSopaDeLetras(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla sopa" });
    cont.appendChild(crear("p", { class: "instruccion" }, p.instruccion));

    const { grid, size, ubicaciones } = generarGrilla(p.palabras);
    const encontradas = new Set();
    window.__ultimaSopaUbicaciones = ubicaciones;

    const listaEl = crear("div", { class: "sopa-lista" });
    p.palabras.forEach((pal) => {
      listaEl.appendChild(crear("span", { class: "sopa-palabra-pendiente", id: "sopa-" + pal }, pal));
    });
    cont.appendChild(listaEl);

    const gridEl = crear("div", { class: "sopa-grid" });
    gridEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    let inicio = null;
    const celdasEl = [];
    for (let r = 0; r < size; r++) {
      celdasEl[r] = [];
      for (let c = 0; c < size; c++) {
        const celda = crear("button", { class: "sopa-celda", "data-r": r, "data-c": c }, grid[r][c]);
        celda.addEventListener("click", () => manejarClickCelda(r, c, celda));
        gridEl.appendChild(celda);
        celdasEl[r][c] = celda;
      }
    }

    function limpiarSeleccionVisual() { celdasEl.flat().forEach((el) => el.classList.remove("sopa-celda-sel")); }

    function manejarClickCelda(r, c, celda) {
      // Nota: no bloqueamos el click aunque la celda ya pertenezca a una palabra
      // encontrada, porque dos palabras pueden cruzarse compartiendo una celda
      // y esa celda puede ser el inicio/fin de otra palabra todavía no encontrada.
      if (inicio === null) { inicio = { r, c, el: celda }; celda.classList.add("sopa-celda-sel"); return; }
      const fin = { r, c };
      const dr = Math.sign(fin.r - inicio.r);
      const dc = Math.sign(fin.c - inicio.c);
      const esLinea = (dr === 0 && dc !== 0) || (dc === 0 && dr !== 0) || (Math.abs(fin.r - inicio.r) === Math.abs(fin.c - inicio.c) && dr !== 0);
      if (!esLinea && !(fin.r === inicio.r && fin.c === inicio.c)) {
        registrarError(); limpiarSeleccionVisual(); inicio = null; return;
      }
      const largo = Math.max(Math.abs(fin.r - inicio.r), Math.abs(fin.c - inicio.c)) + 1;
      const celdasRuta = [];
      for (let i = 0; i < largo; i++) celdasRuta.push([inicio.r + dr * i, inicio.c + dc * i]);
      const letrasRuta = celdasRuta.map(([rr, cc]) => grid[rr][cc]).join("");
      const letrasRutaInv = letrasRuta.split("").reverse().join("");
      const match = ubicaciones.find((u) => !encontradas.has(u.palabra) && (u.palabraNormalizada === letrasRuta || u.palabraNormalizada === letrasRutaInv));
      if (match) {
        registrarAcierto();
        encontradas.add(match.palabra);
        celdasRuta.forEach(([rr, cc]) => celdasEl[rr][cc].classList.add("sopa-celda-encontrada"));
        const labelEl = document.getElementById("sopa-" + match.palabra);
        if (labelEl) labelEl.classList.add("sopa-palabra-encontrada");
        const audioPalabra = p.audiosPalabras && p.audiosPalabras[match.palabra];
        if (audioPalabra) encolarAudio(audioPalabra);
        if (encontradas.size === p.palabras.length) marcarCompletado();
      } else {
        registrarError();
      }
      limpiarSeleccionVisual();
      inicio = null;
    }

    cont.appendChild(gridEl);
    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  // ---------- DETECTIVE ----------
  function renderDetective(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla detective" });

    const pistasBox = crear("div", { class: "detective-pistas" });
    p.pistas.forEach((pista) => pistasBox.appendChild(crear("p", { class: "detective-pista" }, "🔍 " + pista)));
    cont.appendChild(pistasBox);

    const cajaMisterio = crear("div", { class: "detective-caja" });
    const imgMisterio = crear("img", { src: p.imagen, class: "detective-img oculto-blur" });
    cajaMisterio.appendChild(imgMisterio);
    cont.appendChild(cajaMisterio);

    cont.appendChild(crear("h3", { class: "detective-pregunta" }, p.pregunta));

    const opcionesCont = crear("div", { class: "detective-opciones" });
    shuffle(p.opciones).forEach((op) => {
      const b = crear("button", { class: "detective-opcion" }, op);
      b.addEventListener("click", () => {
        if (op === p.correcta) {
          registrarAcierto();
          b.classList.add("correcto-flash");
          imgMisterio.classList.remove("oculto-blur");
          if (p.audioConfirma) encolarAudio(p.audioConfirma);
          marcarCompletado();
        } else {
          registrarError();
          b.classList.add("error-flash");
          setTimeout(() => b.classList.remove("error-flash"), 400);
        }
      });
      opcionesCont.appendChild(b);
    });
    cont.appendChild(opcionesCont);

    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();
    reproducirInstruccionYDesbloquear(cont, p.audio);
  }

  // ---------- BALANZA ----------
  function renderBalanza(p) {
    app.innerHTML = "";
    app.appendChild(renderHeader());
    const badge = renderModuloBadge(p);
    if (badge) app.appendChild(badge);
    const cont = crear("div", { class: "pantalla balanza" });

    let actual = 0;
    const rondaCont = crear("div", { class: "balanza-ronda-cont" });
    cont.appendChild(rondaCont);
    app.appendChild(cont);
    app.appendChild(barraNavegacion(false));
    actualizarHeader();

    function mostrarRonda() {
      if (actual >= p.rondas.length) { marcarCompletado(); return; }
      const ronda = p.rondas[actual];
      rondaCont.innerHTML = "";
      rondaCont.appendChild(crear("h3", { class: "balanza-pregunta" }, ronda.pregunta));
      const opcionesCont = crear("div", { class: "balanza-opciones" });
      ronda.opciones.forEach((op) => {
        const b = crear(
          "button",
          { class: "balanza-opcion" },
          crear("img", { src: op.imagen, class: "balanza-img" }),
          crear("span", null, op.texto)
        );
        b.addEventListener("click", () => {
          if (op.texto === ronda.correcta) { registrarAcierto(); b.classList.add("correcto-flash"); if (ronda.audioConfirma) encolarAudio(ronda.audioConfirma); }
          else { registrarError(); b.classList.add("error-flash"); }
          setTimeout(() => { actual++; mostrarRonda(); }, 600);
        });
        opcionesCont.appendChild(b);
      });
      rondaCont.appendChild(opcionesCont);
      if (ronda.audio) encolarAudio(ronda.audio);
    }
    mostrarRonda();
  }

  // ---------- CIERRE ----------
  function renderCierre(p) {
    app.innerHTML = "";
    const total = aciertos + errores;
    const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 0;

    const cont = crear("div", { class: "pantalla cierre" });
    cont.appendChild(crear("img", { src: p.imagen, class: "cierre-img" }));
    cont.appendChild(crear("p", { class: "cierre-texto" }, p.texto));

    const resumen = crear(
      "div",
      { class: "cierre-resumen" },
      crear("p", null, `✅ Aciertos: ${aciertos}`),
      crear("p", null, `❌ Errores: ${errores}`),
      crear("p", { class: "cierre-porcentaje" }, `${porcentaje}% de aciertos`),
      crear("p", { class: "cierre-puntos" }, `⭐ ${puntos} puntos`)
    );
    cont.appendChild(resumen);

    const fotoBtn = crear("img", { src: DATOS.fotoPerfil, class: "cierre-foto" });
    fotoBtn.addEventListener("click", abrirLightbox);
    cont.appendChild(fotoBtn);
    cont.appendChild(crear("p", { class: "contacto-linea" }, DATOS.contactoTexto));
    cont.appendChild(crear("p", { class: "contacto-linea" }, "✉️ " + DATOS.contactoMail));

    const btnReiniciar = crear("button", { class: "btn-comenzar" }, "🔄 Volver a jugar");
    btnReiniciar.addEventListener("click", reiniciarJuego);
    cont.appendChild(btnReiniciar);

    app.appendChild(cont);
    if (p.audio) encolarAudio(p.audio);
    completado = true;
  }

  function reiniciarJuego() {
    aciertos = 0;
    errores = 0;
    puntos = 0;
    irAPantalla(0);
  }

  // ============================================================
  // DESPACHADOR
  // ============================================================
  function render() {
    const p = DATOS.pantallas[idx];
    switch (p.tipo) {
      case "portada": renderPortada(p); break;
      case "narracion": renderNarracion(p); break;
      case "clasificar": renderClasificar(p); break;
      case "clasificarVisual": renderClasificarVisual(p); break;
      case "presentarContenedores": renderPresentarContenedores(p); break;
      case "clasificarUno": renderClasificarUno(p); break;
      case "sopaDeLetras": renderSopaDeLetras(p); break;
      case "memojuego": renderMemojuego(p); break;
      case "asociar": renderAsociar(p); break;
      case "ordenar": renderOrdenar(p); break;
      case "multiple": renderMultiple(p); break;
      case "flipcards": renderFlipcards(p); break;
      case "detective": renderDetective(p); break;
      case "balanza": renderBalanza(p); break;
      case "cierre": renderCierre(p); break;
      default: app.innerHTML = `<p>Tipo de pantalla no soportado: ${p.tipo}</p>`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => { render(); });

  window.__motor = { render, DATOS: () => DATOS, estado: () => ({ idx, aciertos, errores, puntos, completado }) };
})();
