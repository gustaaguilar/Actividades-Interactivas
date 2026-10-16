// motor.js — motor genérico reutilizable para paquetes QueSepanTodos.com
(function () {
  "use strict";

  const app = document.getElementById("app");

  const state = {
    screen: "portada", // 'portada' | number (index en DATOS.pantallas) | 'cierre'
    aciertos: 0,
    errores: 0,
    puntos: 0,
    intento: 1
  };


  // ---------------- Ajuste a la pantalla: nunca hay que hacer scroll ----------------
  // 1) Altura real del visor (en celulares 100vh incluye la barra del navegador y tapa el botón).
  // 2) Si aun así el contenido no entra, la pantalla se reduce lo justo (nunca por debajo de 55%).
  let ajustePendiente = false;
  function fijarAltura() {
    const h = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
    document.documentElement.style.setProperty("--app-h", Math.round(h) + "px");
  }
  function ajustarPantalla() {
    ajustePendiente = false;
    const p = app.querySelector(".pantalla");
    if (!p || p.classList.contains("portada-hero")) return;
    p.style.setProperty("--s", "1"); p.classList.remove("escalada");
    if (p.scrollHeight <= p.clientHeight + 1) return;
    let s = 1;
    for (let i = 0; i < 5; i++) {
      const visual = p.scrollHeight * s, disp = app.clientHeight - parseFloat(getComputedStyle(app).paddingTop) - parseFloat(getComputedStyle(app).paddingBottom);
      if (visual <= disp + 1) break;
      s = Math.max(0.55, s * disp / visual);
      p.classList.add("escalada"); p.style.setProperty("--s", s.toFixed(3));
    }
  }
  function pedirAjuste() {
    if (ajustePendiente) return;
    ajustePendiente = true;
    (window.requestAnimationFrame || setTimeout)(ajustarPantalla);
  }
  fijarAltura();
  window.addEventListener("resize", () => { fijarAltura(); pedirAjuste(); });
  window.addEventListener("orientationchange", () => setTimeout(() => { fijarAltura(); pedirAjuste(); }, 200));
  if (window.visualViewport) window.visualViewport.addEventListener("resize", () => { fijarAltura(); pedirAjuste(); });
  if (window.MutationObserver) new MutationObserver(pedirAjuste).observe(app, { childList: true, subtree: true, characterData: true });
  app.addEventListener("load", pedirAjuste, true);

  // ---------------- Cola de audio global ----------------
  let audioQueue = [];
  let audioGenId = 0;
  let audioBusy = false;

  let audioActual = null;
  function limpiarCola() {
    // Corta el audio que esté sonando: al cambiar de pantalla (o con las flechas) nunca se superponen voces.
    if (audioActual) { try { audioActual.pause(); } catch (e) {} audioActual = null; }
    audioGenId++;
    audioQueue = [];
    audioBusy = false;
  }

  function encolarAudio(src, cb) {
    if (src) audioQueue.push({ src, cb: cb || null });
    else if (cb) audioQueue.push({ src: null, cb });
    procesarCola(audioGenId);
  }

  function procesarCola(genId) {
    if (audioBusy || audioQueue.length === 0) return;
    if (genId !== audioGenId) return;
    audioBusy = true;
    const item = audioQueue.shift();
    const terminar = () => {
      audioBusy = false;
      if (item.cb) item.cb();
      procesarCola(genId);
    };
    if (!item.src) { terminar(); return; }
    const a = new Audio(item.src);
    audioActual = a;
    a.addEventListener("ended", terminar);
    a.addEventListener("error", terminar); // audio aún no generado: no bloquea el flujo
    a.play().catch(terminar);
  }

  function colaVacia() {
    return audioQueue.length === 0 && !audioBusy;
  }

  // ---------------- Utilidades ----------------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function crearEl(tag, cls, html) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html !== undefined) el.innerHTML = html;
    return el;
  }

  function esCorta(texto) {
    return texto.length <= 10;
  }

  // ---------------- Render principal ----------------
  function render() {
    app.innerHTML = "";
    limpiarCola();
    if (state.screen === "portada") { renderPortada(); actualizarFlechas(); return; }
    if (state.screen === "cierre") { renderCierre(); actualizarFlechas(); return; }
    const pantalla = DATOS.pantallas[state.screen];
    switch (pantalla.tipo) {
      case "trivia": renderTrivia(pantalla); break;
      case "clasificar": renderClasificar(pantalla); break;
      case "verdaderoFalso": renderVerdaderoFalso(pantalla); break;
      case "asociar": renderAsociar(pantalla); break;
      case "narracionAnimada": renderNarracionAnimada(pantalla); break;
      case "lineaTiempo": renderLineaTiempo(pantalla); break;
      case "video": renderVideo(pantalla); break;
      case "sopaDeLetras": renderSopaDeLetras(pantalla); break;
    }
    actualizarFlechas();
  }

  function irSiguiente() {
    if (state.screen === "portada") { state.screen = 0; render(); return; }
    if (state.screen === "cierre") return;
    if (state.screen + 1 >= DATOS.pantallas.length) { state.screen = "cierre"; render(); return; }
    state.screen++;
    render();
  }

  function barraProgreso() {
    if (state.screen === "portada" || state.screen === "cierre") return "";
    const total = DATOS.pantallas.length;
    const pct = Math.round(((state.screen + 1) / total) * 100);
    return `<div class="progreso"><div class="progreso-barra" style="width:${pct}%"></div></div>`;
  }

  // Ejecuta fn recién cuando terminó TODO el audio pendiente (confirmaciones incluidas)
  function alTerminarAudio(fn) {
    const gen = audioGenId;
    encolarAudio(null, () => { if (gen === audioGenId) fn(); });
  }

  function botonSiguiente(habilitado, onClick, texto) {
    const btn = crearEl("button", "btn-siguiente", texto || "Siguiente ➜");
    btn.disabled = !habilitado;
    // El botón se usa UNA sola vez y desaparece al tocarlo: así nunca queda un "Continuar" viejo
    // visible en el ítem/paso siguiente (permitía saltear actividades o dejaba la pantalla trabada).
    btn.addEventListener("click", () => {
      if (btn.dataset.usado) return;
      btn.dataset.usado = "1";
      btn.remove();
      onClick();
    });
    return btn;
  }

  // ---------------- Portada ----------------
  function renderPortada() {
    const wrap = crearEl("div", "pantalla portada portada-hero");
    wrap.innerHTML = `
      <div class="hero">
        <img class="hero-img" src="${DATOS.meta.portada || DATOS.meta.portadaRespaldo}" alt="${DATOS.meta.titulo}" />
        <div class="hero-velo"></div>
        <div class="hero-texto">
          <h1>${DATOS.meta.titulo}</h1>
          <p class="subtitulo">${DATOS.meta.subtitulo}</p>
        </div>
      </div>
      <div class="portada-pie">
        <div class="firma-portada">
          <img class="foto-mini" src="${DATOS.meta.fotoPerfil}" alt="Profe" />
          <div class="firma-texto">
            <strong>💻 Informática Educativa · ${DATOS.meta.autor}</strong>
            <span>✉️ ${DATOS.meta.mail}</span>
          </div>
        </div>
        <button class="btn-comenzar">Comenzar ▶</button>
      </div>
    `;
    app.appendChild(wrap);
    const hi = wrap.querySelector(".hero-img");
    hi.onerror = () => { if (DATOS.meta.portadaRespaldo && hi.getAttribute("src") !== DATOS.meta.portadaRespaldo) hi.setAttribute("src", DATOS.meta.portadaRespaldo); };
    wrap.querySelector(".foto-mini").addEventListener("click", () => abrirLightbox());
    wrap.querySelector(".btn-comenzar").addEventListener("click", irSiguiente);
  }

  function abrirLightbox() {
    const lb = crearEl("div", "lightbox");
    lb.innerHTML = `
      <button class="lightbox-cerrar">✕</button>
      <img src="${DATOS.meta.fotoPerfil}" alt="Profe" />
      <p>Menos prisa, más vida 🧉🫂</p>
      <p class="lightbox-mail">✉️ ${DATOS.meta.mail}</p>
    `;
    document.body.appendChild(lb);
    lb.querySelector(".lightbox-cerrar").addEventListener("click", () => lb.remove());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.remove(); });
  }

  // ---------------- Cierre ----------------
  function renderCierre() {
    const total = state.aciertos + state.errores;
    const pct = total > 0 ? Math.round((state.aciertos / total) * 100) : 0;
    const wrap = crearEl("div", "pantalla cierre");
    wrap.innerHTML = `
      <h2>¡Actividad completada! 🎉</h2>
      <div class="resultados">
        <p>✅ Aciertos: <strong>${state.aciertos}</strong></p>
        <p>❌ Errores: <strong>${state.errores}</strong></p>
        <p>📊 Porcentaje: <strong>${pct}%</strong></p>
        <p>⭐ Puntos: <strong>${state.puntos}</strong></p>
      </div>
      <div class="firma-portada">
        <img class="foto-mini" src="${DATOS.meta.fotoPerfil}" alt="Profe" />
        <div class="firma-texto">
          <strong>💻 Informática Educativa · ${DATOS.meta.autor}</strong>
          <span>✉️ ${DATOS.meta.mail}</span>
        </div>
      </div>
      <button class="btn-enviar">📤 Enviar mi tarea a mi docente</button>
      <button class="btn-comenzar">Volver a jugar ↺</button>
    `;
    app.appendChild(wrap);
    wrap.querySelector(".foto-mini").addEventListener("click", () => abrirLightbox());
    wrap.querySelector(".btn-enviar").addEventListener("click", () => abrirFormularioEnvio(pct));
    wrap.querySelector(".btn-comenzar").addEventListener("click", () => {
      state.intento++;
      state.aciertos = 0; state.errores = 0; state.puntos = 0; state.screen = "portada";
      render();
    });
  }

  // ---------------- Enviar tarea al docente ----------------
  function leerEnvio() {
    try { return JSON.parse(localStorage.getItem("qst_envio")) || {}; } catch (e) { return {}; }
  }
  function guardarEnvio(d) {
    try { localStorage.setItem("qst_envio", JSON.stringify(d)); } catch (e) {}
  }

  function abrirFormularioEnvio(pct) {
    const previo = leerEnvio();
    const ov = crearEl("div", "envio-overlay");
    ov.innerHTML = `
      <div class="envio-caja">
        <button class="envio-cerrar" aria-label="Cerrar">✕</button>
        <div class="envio-form">
          <h3>📤 Enviar mi tarea</h3>
          <label>Nombre y apellido
            <input type="text" id="envio-nombre" autocomplete="name" /></label>
          <label>Curso
            <input type="text" id="envio-curso" placeholder="ej.: 3.° A" /></label>
          <label>Nombre y apellido del docente (opcional)
            <input type="text" id="envio-docente" /></label>
          <p class="envio-msg" id="envio-msg"></p>
          <button class="btn-comenzar" id="envio-generar">Generar mi tarjeta</button>
        </div>
        <div class="envio-resultado" style="display:none"></div>
      </div>`;
    document.body.appendChild(ov);
    const $ = (s) => ov.querySelector(s);
    $("#envio-nombre").value = previo.nombre || "";
    $("#envio-curso").value = previo.curso || "";
    $("#envio-docente").value = previo.docente || "";
    $(".envio-cerrar").addEventListener("click", () => ov.remove());
    $("#envio-generar").addEventListener("click", () => {
      const nombre = $("#envio-nombre").value.trim();
      const curso = $("#envio-curso").value.trim();
      const docente = $("#envio-docente").value.trim();
      const msg = $("#envio-msg");
      if (!nombre) { msg.textContent = "Escribí tu nombre y apellido para continuar 🙂"; $("#envio-nombre").focus(); return; }
      if (!curso) { msg.textContent = "Contanos tu curso para continuar 🙂"; $("#envio-curso").focus(); return; }
      guardarEnvio({ nombre, curso, docente });
      generarTarjeta({ nombre, curso, docente, pct }, ov);
    });
  }

  function textoEnvio(d) {
    const f = new Date();
    const fecha = f.toLocaleDateString("es-AR") + " " + f.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    return { fecha, texto:
      `📚 ${DATOS.meta.titulo}\n👤 ${d.nombre}\n🏫 Curso: ${d.curso}\n` +
      (d.docente ? `👩‍🏫 Docente: ${d.docente}\n` : "") +
      `✅ Aciertos: ${state.aciertos}\n❌ Errores: ${state.errores}\n📊 ${d.pct}%\n⭐ Puntos: ${state.puntos}\n` +
      `🔁 Intento n.° ${state.intento}\n🕒 ${fecha}\nQueSepanTodos.com · ${DATOS.meta.autor}` };
  }

  function dibujarTarjeta(d, fecha) {
    const c = document.createElement("canvas");
    c.width = 800; c.height = 760;
    const g = c.getContext("2d");
    if (!g) return null;
    g.fillStyle = "#1c1530"; g.fillRect(0, 0, 800, 760);
    g.strokeStyle = "#e8b04a"; g.lineWidth = 6; g.strokeRect(12, 12, 776, 736);
    const ajustar = (txt, max, px, bold) => {
      let s = px;
      do { g.font = `${bold ? "bold " : ""}${s}px sans-serif`; s -= 2; } while (g.measureText(txt).width > max && s > 12);
    };
    g.textAlign = "center"; g.fillStyle = "#e8b04a";
    ajustar(DATOS.meta.titulo, 700, 38, true);
    g.fillText(DATOS.meta.titulo, 400, 80);
    g.fillStyle = "#cfc6e8";
    ajustar(DATOS.meta.grado || "", 700, 24);
    g.fillText(DATOS.meta.grado || "", 400, 120);
    g.textAlign = "left"; g.fillStyle = "#ffffff";
    let y = 190;
    const linea = (txt, px) => { ajustar(txt, 700, px || 30); g.fillText(txt, 50, y); y += 52; };
    linea("👤 " + d.nombre); linea("🏫 Curso: " + d.curso);
    if (d.docente) linea("👩‍🏫 Docente: " + d.docente);
    y += 10; g.fillStyle = "#7fe3d0";
    linea("✅ Aciertos: " + state.aciertos); linea("❌ Errores: " + state.errores);
    linea("📊 Porcentaje: " + d.pct + "%"); linea("⭐ Puntos: " + state.puntos);
    g.fillStyle = "#cfc6e8"; linea("🔁 Intento n.° " + state.intento, 24); linea("🕒 " + fecha, 24);
    g.textAlign = "center"; g.fillStyle = "#e8b04a"; g.font = "bold 22px sans-serif";
    g.fillText("QueSepanTodos.com · " + DATOS.meta.autor, 400, 725);
    return c;
  }

  function generarTarjeta(d, ov) {
    const { fecha, texto } = textoEnvio(d);
    let canvas = null, dataUrl = null;
    try { canvas = dibujarTarjeta(d, fecha); dataUrl = canvas && canvas.toDataURL("image/png"); } catch (e) {}
    ov.querySelector(".envio-form").style.display = "none";
    const res = ov.querySelector(".envio-resultado");
    res.style.display = "block";
    res.innerHTML = `
      <h3>¡Tarjeta lista! 🎉</h3>
      ${dataUrl ? `<img class="envio-tarjeta" src="${dataUrl}" alt="Tarjeta de resultados" />` : `<pre class="envio-texto"></pre>`}
      <p class="envio-ayuda">Mantené apretada la imagen para guardarla, o sacá una captura de pantalla.</p>
      <div class="envio-botones">
        <button class="btn-comenzar" id="envio-wsp">💬 WhatsApp</button>
        <button class="btn-comenzar" id="envio-guardar">⬇️ Guardar</button>
      </div>`;
    const pre = res.querySelector(".envio-texto"); if (pre) pre.textContent = texto;
    res.querySelector("#envio-wsp").addEventListener("click", () => {
      window.open("https://wa.me/?text=" + encodeURIComponent(texto), "_blank");
    });
    res.querySelector("#envio-guardar").addEventListener("click", () => {
      if (!dataUrl) return;
      const a = document.createElement("a");
      a.href = dataUrl; a.download = "mi-tarea.png"; document.body.appendChild(a); a.click(); a.remove();
    });
    // Intenta compartir la imagen; si no se puede, queda la tarjeta en pantalla con las otras opciones.
    try {
      if (canvas && navigator.share && canvas.toBlob) {
        canvas.toBlob((blob) => {
          if (!blob) return;
          const file = new File([blob], "mi-tarea.png", { type: "image/png" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: DATOS.meta.titulo, text: texto }).catch(() => {});
          }
        }, "image/png");
      }
    } catch (e) {}
  }

  // ---------------- Encabezado de actividad ----------------
  function encabezado(pantalla) {
    return `
      ${barraProgreso()}
      <h2>${pantalla.titulo}</h2>
      <p class="instruccion">${pantalla.instruccion || ""}</p>
      ${pantalla.imagen ? `<img class="img-escena" src="${pantalla.imagen}" alt="${pantalla.titulo}" />` : ""}
    `;
  }

  function reproducirInstruccion(pantalla, luego) {
    encolarAudio(pantalla.instruccionAudio, luego);
  }

  // Imagen propia del ítem/paso (imagen) -> respaldo (imagenRespaldo) -> imagen de la pantalla.
  // Si un archivo todavía no existe, pasa al siguiente de la cadena: nunca queda una imagen rota.
  function imagenDelItem(wrap, pantalla, item) {
    const img = wrap.querySelector(".img-escena");
    if (!img) return;
    const cadena = [item.imagen, item.imagenRespaldo, pantalla.imagen].filter(Boolean);
    let i = 0;
    img.onerror = () => { i++; if (i < cadena.length) img.setAttribute("src", cadena[i]); };
    if (cadena.length && img.getAttribute("src") !== cadena[0]) img.setAttribute("src", cadena[0]);
    img.setAttribute("alt", item.imagenAlt || pantalla.titulo);
  }

  // ---------------- Trivia (opción múltiple) ----------------
  function renderTrivia(pantalla) {
    const wrap = crearEl("div", "pantalla trivia");
    wrap.innerHTML = encabezado(pantalla);
    const zona = crearEl("div", "zona-item");
    wrap.appendChild(zona);
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    let idx = 0;
    const bloqueado = { valor: true };

    function pintarBloqueo() {
      zona.querySelectorAll("button.opcion").forEach(b => b.disabled = bloqueado.valor);
    }

    function mostrarItem() {
      if (idx >= pantalla.items.length) { irSiguiente(); return; }
      footer.innerHTML = "";
      const item = pantalla.items[idx];
      imagenDelItem(wrap, pantalla, item);
      const opcionesBarajadas = shuffle(item.opciones.map((o, i) => ({ texto: o, esCorrecta: i === item.correcta })));
      const corta = opcionesBarajadas.every(o => esCorta(o.texto));
      zona.innerHTML = `
        <p class="pregunta">${item.pregunta}</p>
        <div class="opciones ${corta ? 'grid-2' : 'lista-1'}"></div>
        <p class="feedback"></p>
      `;
      const cont = zona.querySelector(".opciones");
      let evaluado = false;   // ya se computó el primer intento
      let resuelto = false;
      opcionesBarajadas.forEach(op => {
        const btn = crearEl("button", "opcion", op.texto);
        btn.addEventListener("click", () => {
          if (resuelto || btn.disabled) return;
          const feedback = zona.querySelector(".feedback");
          if (op.esCorrecta) {
            resuelto = true;
            btn.classList.add("correcta");
            if (!evaluado) { state.aciertos++; state.puntos += 10; }
            evaluado = true;
            feedback.textContent = "✅ " + (item.explicacion || "¡Correcto!");
            cont.querySelectorAll("button").forEach(b => b.disabled = true);
            limpiarCola();
            encolarAudio(item.audioCorrecta);
            alTerminarAudio(verificarAvance);
          } else {
            btn.classList.add("incorrecta");
            btn.disabled = true;
            if (!evaluado) { state.errores++; evaluado = true; }
            feedback.textContent = "❌ Esa no es. Probá con otra opción.";
          }
        });
        cont.appendChild(btn);
      });
      bloqueado.valor = true;
      pintarBloqueo();
      limpiarCola();
      encolarAudio(item.preguntaAudio, () => { bloqueado.valor = false; pintarBloqueo(); });
    }

    function verificarAvance() {
      footer.innerHTML = "";
      const esUltimo = idx === pantalla.items.length - 1;
      const btn = botonSiguiente(true, () => {
        if (esUltimo) { irSiguiente(); }
        else { idx++; mostrarItem(); }
      }, esUltimo ? "Siguiente ➜" : "Continuar ➜");
      footer.appendChild(btn);
    }

    reproducirInstruccion(pantalla, () => mostrarItem());
  }

  // ---------------- Clasificar ----------------
  function renderClasificar(pantalla) {
    const wrap = crearEl("div", "pantalla clasificar");
    wrap.innerHTML = encabezado(pantalla);
    const zona = crearEl("div", "zona-item");
    wrap.appendChild(zona);
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    let idx = 0;

    function mostrarItem() {
      if (idx >= pantalla.items.length) { irSiguiente(); return; }
      footer.innerHTML = "";
      const item = pantalla.items[idx];
      imagenDelItem(wrap, pantalla, item);
      zona.innerHTML = `
        <p class="texto-clasificar">${item.texto}</p>
        <div class="categorias"></div>
        <p class="feedback"></p>
      `;
      const cont = zona.querySelector(".categorias");
      let evaluado = false;   // ya se computó el primer intento
      let resuelto = false;
      pantalla.categorias.forEach((cat, i) => {
        const btn = crearEl("button", "opcion categoria", cat);
        btn.disabled = true;
        btn.addEventListener("click", () => {
          if (resuelto || btn.disabled) return;
          const feedback = zona.querySelector(".feedback");
          if (i === item.categoriaCorrecta) {
            resuelto = true;
            btn.classList.add("correcta");
            if (!evaluado) { state.aciertos++; state.puntos += 10; }
            evaluado = true;
            feedback.textContent = "✅ " + (item.justificacion || "¡Correcto!");
            cont.querySelectorAll("button").forEach(b => b.disabled = true);
            limpiarCola();
            encolarAudio(item.audioCorrecta);
            alTerminarAudio(verificarAvance);
          } else {
            btn.classList.add("incorrecta");
            btn.disabled = true;
            if (!evaluado) { state.errores++; evaluado = true; }
            feedback.textContent = "❌ Esa no es. Probá con otra categoría.";
          }
        });
        cont.appendChild(btn);
      });
      limpiarCola();
      // 1) pregunta genérica de la pantalla ("¿Por qué lleva mayúscula?", etc.)
      // 2) el audio propio del ítem (la palabra/frase)
      // 3) recién ahí se habilitan los botones
      encolarAudio(pantalla.preguntaAudio, () => {
        encolarAudio(item.audioPalabra, () => {
          cont.querySelectorAll("button").forEach(b => b.disabled = false);
        });
      });
    }

    function verificarAvance() {
      footer.innerHTML = "";
      const esUltimo = idx === pantalla.items.length - 1;
      const btn = botonSiguiente(true, () => {
        if (esUltimo) { irSiguiente(); }
        else { idx++; mostrarItem(); }
      }, esUltimo ? "Siguiente ➜" : "Continuar ➜");
      footer.appendChild(btn);
    }

    reproducirInstruccion(pantalla, () => mostrarItem());
  }

  // ---------------- Video (síntesis del cuento) ----------------
  function renderVideo(pantalla) {
    const wrap = crearEl("div", "pantalla video-pantalla");
    wrap.innerHTML = `
      ${barraProgreso()}
      <h2>${pantalla.titulo}</h2>
      <p class="instruccion">${pantalla.textoIntro || ""}</p>
      <div class="video-envoltorio">
        <iframe id="video-youtube" width="100%" height="100%"
          src="https://www.youtube.com/embed/${pantalla.videoId}?enablejsapi=1&rel=0"
          title="${pantalla.titulo}" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    `;
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    // El Siguiente queda activo desde el inicio: el video es largo y se puede avanzar sin verlo completo.
    const btn = botonSiguiente(true, irSiguiente, "Siguiente ➜");
    footer.appendChild(btn);

    function habilitar() { btn.disabled = false; }
    // Gancho de testing: permite simular el fin del video sin depender de la red/API real
    window.__debugCompletarVideo = habilitar;

    // Intento real vía YouTube IFrame API (requiere conexión a internet)
    function iniciarAPI() {
      if (!window.YT || !window.YT.Player) return;
      new window.YT.Player("video-youtube", {
        events: {
          onStateChange: (ev) => {
            if (ev.data === window.YT.PlayerState.ENDED) habilitar();
          }
        }
      });
    }
    if (window.YT && window.YT.Player) {
      iniciarAPI();
    } else if (!window.__SKIP_YT_API__) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      window.onYouTubeIframeAPIReady = iniciarAPI;
    }

    // Red de seguridad: si la API no responde (sin conexión, bloqueada, etc.),
    // se habilita igual pasada la duración aproximada del video + margen.
    const segundos = pantalla.duracionSegundosFallback || 240;
    setTimeout(habilitar, segundos * 1000);

    encolarAudio(pantalla.audioIntro);
  }

  // ---------------- Sopa de letras ----------------
  function renderSopaDeLetras(pantalla) {
    const wrap = crearEl("div", "pantalla sopa");
    wrap.innerHTML = encabezado(pantalla);
    const zona = crearEl("div", "zona-item sopa-zona");
    wrap.appendChild(zona);
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    const N = pantalla.tamano || 12;
    const palabras = pantalla.palabras.map(p => p.toUpperCase());
    const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let grilla, ubicaciones;

    function generar() {
      grilla = Array.from({ length: N }, () => Array(N).fill(null));
      ubicaciones = [];
      const direcciones = [[0, 1], [1, 0], [1, 1]]; // horizontal, vertical, diagonal (siempre hacia adelante: sin espejado para 7mo grado)
      // Se coloca de la más larga a la más corta: así las palabras grandes, más difíciles
      // de encajar, tienen el tablero libre antes de que se llene de letras ya usadas.
      const ordenColocacion = palabras.map((p, i) => i).sort((a, b) => palabras[b].length - palabras[a].length);
      for (const idxPalabra of ordenColocacion) {
        const palabra = palabras[idxPalabra];
        let colocada = false;

        // 1) intentos al azar (rápido, cubre la mayoría de los casos)
        for (let intento = 0; intento < 300 && !colocada; intento++) {
          const [dr, dc] = direcciones[Math.floor(Math.random() * direcciones.length)];
          const maxR = N - (dr ? palabra.length : 1);
          const maxC = N - (dc ? palabra.length : 1);
          if (maxR < 0 || maxC < 0) continue;
          const r0 = Math.floor(Math.random() * (maxR + 1));
          const c0 = Math.floor(Math.random() * (maxC + 1));
          if (intentarColocar(palabra, r0, c0, dr, dc)) colocada = true;
        }

        // 2) si el azar no encontró lugar, se revisan TODAS las posiciones posibles
        //    (garantiza que la palabra entre siempre que el tablero tenga espacio real)
        if (!colocada) {
          busquedaExhaustiva:
          for (const [dr, dc] of direcciones) {
            const maxR = N - (dr ? palabra.length : 1);
            const maxC = N - (dc ? palabra.length : 1);
            if (maxR < 0 || maxC < 0) continue;
            for (let r0 = 0; r0 <= maxR && !colocada; r0++) {
              for (let c0 = 0; c0 <= maxC && !colocada; c0++) {
                if (intentarColocar(palabra, r0, c0, dr, dc)) { colocada = true; break busquedaExhaustiva; }
              }
            }
          }
        }
      }
      for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
        if (grilla[r][c] === null) grilla[r][c] = ABC[Math.floor(Math.random() * ABC.length)];
      }
    }

    function intentarColocar(palabra, r0, c0, dr, dc) {
      for (let i = 0; i < palabra.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        if (grilla[r][c] !== null && grilla[r][c] !== palabra[i]) return false;
      }
      for (let i = 0; i < palabra.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        grilla[r][c] = palabra[i];
      }
      ubicaciones.push({ palabra, r0, c0, dr, dc });
      return true;
    }
    generar();

    window.__debugSopaUbicaciones = () => ubicaciones;

    zona.innerHTML = `
      <div class="sopa-lista"></div>
      <div class="sopa-grilla" style="grid-template-columns:repeat(${N}, 1fr)"></div>
    `;
    const lista = zona.querySelector(".sopa-lista");
    palabras.forEach(p => {
      const chip = crearEl("span", "sopa-chip", p);
      chip.dataset.palabra = p;
      lista.appendChild(chip);
    });

    const grillaEl = zona.querySelector(".sopa-grilla");
    const celdas = [];
    for (let r = 0; r < N; r++) {
      celdas.push([]);
      for (let c = 0; c < N; c++) {
        const cel = crearEl("button", "sopa-celda", grilla[r][c]);
        cel.dataset.r = r; cel.dataset.c = c;
        grillaEl.appendChild(cel);
        celdas[r].push(cel);
      }
    }

    let inicioSel = null;
    let encontradas = 0;

    function celdaClick(r, c) {
      if (!inicioSel) { inicioSel = { r, c }; celdas[r][c].classList.add("sopa-seleccion"); return; }
      const fin = { r, c };
      // Verificar si la línea inicio->fin coincide con alguna ubicación (en cualquiera de los dos sentidos)
      const match = ubicaciones.find(u => {
        const rf = u.r0 + u.dr * (u.palabra.length - 1);
        const cf = u.c0 + u.dc * (u.palabra.length - 1);
        const directo = (inicioSel.r === u.r0 && inicioSel.c === u.c0 && fin.r === rf && fin.c === cf);
        const inverso = (fin.r === u.r0 && fin.c === u.c0 && inicioSel.r === rf && inicioSel.c === cf);
        return directo || inverso;
      });
      if (match && !match.encontrada) {
        match.encontrada = true;
        encontradas++;
        for (let i = 0; i < match.palabra.length; i++) {
          const rr = match.r0 + match.dr * i, cc = match.c0 + match.dc * i;
          celdas[rr][cc].classList.remove("sopa-seleccion");
          celdas[rr][cc].classList.add("sopa-encontrada");
        }
        const chip = lista.querySelector(`[data-palabra="${match.palabra}"]`);
        if (chip) chip.classList.add("sopa-chip-encontrada");
        state.aciertos++; state.puntos += 10;
      } else {
        celdas[inicioSel.r][inicioSel.c].classList.remove("sopa-seleccion");
      }
      inicioSel = null;
      if (encontradas === palabras.length) {
        alTerminarAudio(() => { footer.innerHTML = ""; footer.appendChild(botonSiguiente(true, irSiguiente)); });
      }
    }

    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
      celdas[r][c].addEventListener("click", () => celdaClick(r, c));
    }

    reproducirInstruccion(pantalla);
  }

  // ---------------- Verdadero / Falso ----------------
  function renderVerdaderoFalso(pantalla) {
    const wrap = crearEl("div", "pantalla vf");
    wrap.innerHTML = encabezado(pantalla);
    const zona = crearEl("div", "zona-item");
    wrap.appendChild(zona);
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    let idx = 0;

    function mostrarItem() {
      if (idx >= pantalla.items.length) { irSiguiente(); return; }
      footer.innerHTML = "";
      const item = pantalla.items[idx];
      imagenDelItem(wrap, pantalla, item);
      zona.innerHTML = `
        <p class="afirmacion">${item.afirmacion}</p>
        <div class="opciones grid-2">
          <button class="opcion" data-v="true">Verdadero</button>
          <button class="opcion" data-v="false">Falso</button>
        </div>
        <p class="feedback"></p>
      `;
      let evaluado = false;   // ya se computó el primer intento
      let resuelto = false;
      zona.querySelectorAll("button.opcion").forEach(btn => {
        btn.addEventListener("click", () => {
          if (resuelto || btn.disabled) return;
          const eligeV = btn.dataset.v === "true";
          const feedback = zona.querySelector(".feedback");
          if (eligeV === item.valor) {
            resuelto = true;
            btn.classList.add("correcta");
            if (!evaluado) { state.aciertos++; state.puntos += 10; }
            evaluado = true;
            feedback.textContent = "✅ " + item.justificacion;
            zona.querySelectorAll("button.opcion").forEach(b => b.disabled = true);
            limpiarCola();
            encolarAudio(item.audio);
            alTerminarAudio(verificarAvance);
          } else {
            btn.classList.add("incorrecta");
            btn.disabled = true;
            if (!evaluado) { state.errores++; evaluado = true; }
            feedback.textContent = "❌ Esa no es. Pensalo de nuevo y probá con la otra.";
          }
        });
      });
    }

    function verificarAvance() {
      footer.innerHTML = "";
      const esUltimo = idx === pantalla.items.length - 1;
      const btn = botonSiguiente(true, () => {
        if (esUltimo) { irSiguiente(); }
        else { idx++; mostrarItem(); }
      }, esUltimo ? "Siguiente ➜" : "Continuar ➜");
      footer.appendChild(btn);
    }

    reproducirInstruccion(pantalla, () => mostrarItem());
  }

  // ---------------- Asociar / memojuego ----------------
  function renderAsociar(pantalla) {
    const wrap = crearEl("div", "pantalla asociar");
    wrap.innerHTML = encabezado(pantalla);
    const zona = crearEl("div", "zona-item asociar-cols");
    wrap.appendChild(zona);
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    const colores = ["c1", "c2", "c3", "c4", "c5", "c6"];
    const izquierdas = pantalla.pares.map((p, i) => ({ texto: p.izquierda, i, audio: p.audioIzq }));
    const derechasArr = shuffle(pantalla.pares.map((p, i) => ({ texto: p.derecha, i, audio: p.audioDer })));

    zona.innerHTML = `<div class="col-izq"></div><div class="col-der"></div>`;
    const colIzq = zona.querySelector(".col-izq");
    const colDer = zona.querySelector(".col-der");

    const intentoUsado = new Array(pantalla.pares.length).fill(false);
    const resuelto = new Array(pantalla.pares.length).fill(false);
    let seleccionIzq = null;

    izquierdas.forEach(it => {
      const btn = crearEl("button", "item-asociar izq", it.texto);
      btn.dataset.i = it.i;
      btn.addEventListener("click", () => {
        if (resuelto[it.i]) return;
        colIzq.querySelectorAll("button").forEach(b => b.classList.remove("seleccionado"));
        btn.classList.add("seleccionado");
        seleccionIzq = it.i;
        encolarAudio(it.audio);
      });
      colIzq.appendChild(btn);
    });

    derechasArr.forEach(it => {
      const btn = crearEl("button", "item-asociar der", it.texto);
      btn.dataset.i = it.i;
      btn.addEventListener("click", () => {
        if (resuelto[it.i]) return;
        if (seleccionIzq === null) { encolarAudio(it.audio); return; }
        const esCorrecto = seleccionIzq === it.i;
        const par = pantalla.pares[it.i];
        if (esCorrecto) {
          resuelto[it.i] = true;
          const color = colores[it.i % colores.length];
          btn.classList.add("resuelto", color);
          colIzq.querySelector(`button[data-i="${it.i}"]`).classList.add("resuelto", color);
          if (!intentoUsado[it.i]) { state.aciertos++; state.puntos += 10; }
          encolarAudio(par.audioPar);
        } else {
          if (!intentoUsado[seleccionIzq]) { intentoUsado[seleccionIzq] = true; state.errores++; }
          btn.classList.add("shake");
          setTimeout(() => btn.classList.remove("shake"), 400);
          encolarAudio(it.audio);
        }
        colIzq.querySelectorAll("button").forEach(b => b.classList.remove("seleccionado"));
        seleccionIzq = null;
        chequearCompleto();
      });
      colDer.appendChild(btn);
    });

    function chequearCompleto() {
      if (resuelto.every(r => r)) {
        alTerminarAudio(() => { footer.innerHTML = ""; footer.appendChild(botonSiguiente(true, irSiguiente)); });
      }
    }

    reproducirInstruccion(pantalla);
  }

  // ---------------- Narración animada ----------------
  function renderNarracionAnimada(pantalla) {
    const wrap = crearEl("div", "pantalla narracion");
    const media = pantalla.animacionLetras
      ? `<div class="escena-letras" style="background-image:linear-gradient(rgba(20,12,40,.45),rgba(20,12,40,.6)),url('${pantalla.imagen}')"><canvas></canvas></div>`
      : (pantalla.imagen ? `<img class="img-escena" src="${pantalla.imagen}" alt="${pantalla.titulo}" />` : "");
    wrap.innerHTML = `
      ${barraProgreso()}
      <h2>${pantalla.titulo}</h2>
      ${media}
      <div class="texto-narracion"><span class="puntero">👉</span><span class="texto-actual"></span></div>
    `;
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    const textoActual = wrap.querySelector(".texto-actual");
    const letras = pantalla.animacionLetras ? crearAnimacionLetras(wrap.querySelector(".escena-letras")) : null;
    let idx = 0;

    function mostrarPaso() {
      footer.innerHTML = "";
      const paso = pantalla.pasos[idx];
      textoActual.textContent = paso.texto;
      textoActual.classList.remove("titileo"); void textoActual.offsetWidth; textoActual.classList.add("titileo");
      if (letras) letras.formar(paso.palabras || []);
      else imagenDelItem(wrap, pantalla, paso);
      limpiarCola();
      encolarAudio(paso.audio, () => {
        footer.innerHTML = "";
        const esUltimo = idx === pantalla.pasos.length - 1;
        footer.appendChild(botonSiguiente(true, () => {
          if (esUltimo) { irSiguiente(); }
          else { idx++; mostrarPaso(); }
        }, esUltimo ? "Siguiente ➜" : "Continuar ➜"));
      });
    }

    mostrarPaso();
  }

  // ---------------- Animación de letras que forman palabras (campo semántico) ----------------
  // Dibujada por código (canvas): no suma peso. Se detiene sola cuando la pantalla deja de existir.
  function crearAnimacionLetras(cont) {
    const canvas = cont.querySelector("canvas");
    let ctx = null;
    try { ctx = canvas.getContext && canvas.getContext("2d"); } catch (e) { ctx = null; }
    let palabrasActuales = [];
    if (!ctx) {
      // Sin canvas (equipos muy limitados): muestra las palabras como texto simple.
      const fallback = crearEl("div", "palabras-estaticas");
      cont.appendChild(fallback);
      canvas.style.display = "none";
      return { formar(p) { fallback.textContent = p.join("  ·  "); } };
    }
    const reducir = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let W = 0, H = 0, dpr = 1;
    let letras = [];      // letras de la palabra actual
    let polvo = [];       // letras tenues de fondo que flotan siempre
    let tInicio = 0, vivo = true;

    function medir() {
      const r = cont.getBoundingClientRect();
      W = Math.max(200, Math.round(r.width)); H = Math.max(120, Math.round(r.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    medir();

    const ABC = "abcdefghilmnoprstuvz";
    function iniciarPolvo() {
      polvo = [];
      for (let i = 0; i < 18; i++) {
        polvo.push({ ch: ABC[Math.floor(Math.random() * ABC.length)], x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - .5) * 12, vy: (Math.random() - .5) * 8, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .6,
          s: 12 + Math.random() * 16, a: .12 + Math.random() * .18 });
      }
    }

    // Reparte las palabras en renglones y elige el tamaño de letra más grande que entre
    function disponer(palabras) {
      let tam = Math.min(46, Math.floor(H / 3.2));
      for (; tam >= 14; tam -= 2) {
        ctx.font = `bold ${tam}px Georgia, serif`;
        const esp = tam * .5, renglones = [[]], anchos = [0];
        palabras.forEach(p => {
          const w = ctx.measureText(p).width;
          let r = renglones.length - 1;
          if (anchos[r] > 0 && anchos[r] + esp + w > W * .88) { renglones.push([]); anchos.push(0); r++; }
          renglones[r].push({ p, w }); anchos[r] += (anchos[r] > 0 ? esp : 0) + w;
        });
        if (renglones.length * tam * 1.25 <= H * .86 && Math.max(...anchos) <= W * .92) return { tam, renglones, anchos, esp };
      }
      return null;
    }

    function formar(palabras) {
      palabrasActuales = palabras;
      const viejas = letras.map(l => ({ ...l, saliendo: true, t0: 0 }));
      letras = [];
      const lay = palabras.length ? disponer(palabras) : null;
      if (lay) {
        const altoTotal = lay.renglones.length * lay.tam * 1.25;
        let y = (H - altoTotal) / 2 + lay.tam * .95, n = 0;
        lay.renglones.forEach((rg, ri) => {
          let x = (W - lay.anchos[ri]) / 2;
          rg.forEach(({ p, w }, pi) => {
            ctx.font = `bold ${lay.tam}px Georgia, serif`;
            let xl = x;
            const destacada = (palabras.length === 1) || pi === 0 && ri === 0;
            for (const ch of p) {
              const cw = ctx.measureText(ch).width;
              letras.push({ ch, tx: xl + cw / 2, ty: y, x: Math.random() * W, y: Math.random() * H, rot: (Math.random() - .5) * 8,
                tam: lay.tam, retraso: n * 0.028 + Math.random() * .12, color: destacada ? "#ffd27a" : "#f1e7c8" });
              xl += cw; n++;
            }
            x += w + lay.esp;
          });
          y += lay.tam * 1.25;
        });
      }
      // las letras anteriores se disuelven donde estén
      letras = viejas.concat(letras);
      tInicio = performance.now();
      if (reducir) { letras = letras.filter(l => !l.saliendo); letras.forEach(l => { l.x = l.tx; l.y = l.ty; l.rot = 0; }); dibujar(0); }
    }

    function ease(t) { t = Math.max(0, Math.min(1, t)); return 1 - Math.pow(1 - t, 3); }

    let ultimo = performance.now();
    function dibujar(dt) {
      ctx.clearRect(0, 0, W, H);
      polvo.forEach(p => {
        p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = p.a; ctx.fillStyle = "#cfe9e4";
        ctx.font = `${p.s}px Georgia, serif`; ctx.textAlign = "center"; ctx.fillText(p.ch, 0, 0); ctx.restore();
      });
      const seg = (performance.now() - tInicio) / 1000;
      letras = letras.filter(l => !(l.saliendo && seg > .9));
      letras.forEach(l => {
        ctx.save(); ctx.textAlign = "center";
        if (l.saliendo) {
          l.y -= 18 * dt; l.x += (l.x % 2 ? 1 : -1) * 10 * dt;
          ctx.globalAlpha = Math.max(0, 1 - seg / .9); ctx.fillStyle = l.color;
          ctx.font = `bold ${l.tam}px Georgia, serif`; ctx.translate(l.x, l.y); ctx.fillText(l.ch, 0, 0);
        } else {
          const t = ease((seg - .5 - l.retraso) / 1.4);
          if (t < 1 && !reducir) { l.x += ((l.x - W / 2) % 3 ? 1 : -1) * Math.sin(seg * 3 + l.tx) * 6 * dt; }
          const x = l.x + (l.tx - l.x) * t, y = l.y + (l.ty - l.y) * t;
          const brillo = t > .98 ? .55 + .25 * Math.sin(seg * 2.2 + l.tx * .05) : 0;
          ctx.globalAlpha = Math.min(1, .25 + t);
          ctx.translate(x, y); ctx.rotate(l.rot * (1 - t));
          ctx.shadowColor = "rgba(255,210,122," + brillo + ")"; ctx.shadowBlur = brillo ? 10 : 0;
          ctx.fillStyle = l.color; ctx.font = `bold ${l.tam}px Georgia, serif`; ctx.fillText(l.ch, 0, 0);
        }
        ctx.restore();
      });
    }

    function cuadro(ahora) {
      if (!cont.isConnected) { vivo = false; return; }
      const r = cont.getBoundingClientRect();
      if (Math.abs(r.width - W) > 2 || Math.abs(r.height - H) > 2) { medir(); formar(palabrasActuales); }
      const dt = Math.min(.05, (ahora - ultimo) / 1000); ultimo = ahora;
      dibujar(dt);
      if (vivo) requestAnimationFrame(cuadro);
    }
    iniciarPolvo();
    if (!reducir && window.requestAnimationFrame) requestAnimationFrame(cuadro);
    else dibujar(0);
    window.addEventListener("resize", () => { if (cont.isConnected) { medir(); formar(palabrasActuales); } });
    return { formar };
  }

  // ---------------- Línea de tiempo (ordenar) ----------------
  function renderLineaTiempo(pantalla) {
    const wrap = crearEl("div", "pantalla lineatiempo");
    wrap.innerHTML = encabezado(pantalla);
    if (pantalla.textoIntro) {
      wrap.insertAdjacentHTML("beforeend", `<p class="intro-historia">${pantalla.textoIntro}</p>`);
    }
    const zona = crearEl("div", "zona-item");
    wrap.appendChild(zona);
    const footer = crearEl("div", "footer-pantalla");
    wrap.appendChild(footer);
    app.appendChild(wrap);

    zona.innerHTML = `<div class="fichas-disponibles"></div><ol class="orden-armado"></ol><p class="feedback"></p>`;
    const cont = zona.querySelector(".fichas-disponibles");
    const armado = zona.querySelector(".orden-armado");
    const feedback = zona.querySelector(".feedback");

    const barajadas = shuffle(pantalla.items.map((it, i) => ({ ...it, orig: i })));
    let siguienteEsperado = 0;
    let errorEnEsteItem = false;
    let erroresRegistrados = new Set();

    barajadas.forEach(it => {
      const btn = crearEl("button", "ficha-evento", it.texto);
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        encolarAudio(it.audio);
        if (it.orig === siguienteEsperado) {
          btn.disabled = true;
          btn.classList.add("usada");
          const li = crearEl("li", "", it.texto);
          armado.appendChild(li);
          imagenDelItem(wrap, pantalla, it);
          feedback.textContent = "";
          siguienteEsperado++;
          if (siguienteEsperado === pantalla.items.length) {
            state.aciertos += pantalla.items.length - erroresRegistrados.size;
            state.errores += erroresRegistrados.size;
            state.puntos += 10 * (pantalla.items.length - erroresRegistrados.size);
            alTerminarAudio(() => { footer.innerHTML = ""; footer.appendChild(botonSiguiente(true, irSiguiente)); });
          }
        } else {
          erroresRegistrados.add(siguienteEsperado);
          feedback.textContent = "❌ Ese hecho todavía no corresponde. Probá con otro.";
        }
      });
      cont.appendChild(btn);
    });

    reproducirInstruccion(pantalla, () => { if (pantalla.audioIntro) encolarAudio(pantalla.audioIntro); });
  }

  // ---------------- Flechas de revisión rápida (avanzar/retroceder sin completar la actividad) ----------------
  function totalPantallas() { return DATOS.pantallas.length; }

  function irAnterior() {
    if (state.screen === "portada") return;
    if (state.screen === "cierre") { state.screen = totalPantallas() - 1; render(); return; }
    if (state.screen === 0) { state.screen = "portada"; render(); return; }
    state.screen--;
    render();
  }

  function irSiguienteRevision() {
    if (state.screen === "cierre") return;
    if (state.screen === "portada") { state.screen = 0; render(); return; }
    if (state.screen + 1 >= totalPantallas()) { state.screen = "cierre"; render(); return; }
    state.screen++;
    render();
  }

  function actualizarFlechas() {
    const btnPrev = document.getElementById("flecha-anterior");
    const btnNext = document.getElementById("flecha-siguiente");
    if (!btnPrev || !btnNext) return;
    btnPrev.disabled = state.screen === "portada";
    btnNext.disabled = state.screen === "cierre";
  }

  function crearFlechasRevision() {
    const nav = crearEl("div", "nav-revision");
    nav.innerHTML = `
      <button id="flecha-anterior" title="Pantalla anterior (revisión)">◀</button>
      <button id="flecha-siguiente" title="Pantalla siguiente (revisión)">▶</button>
    `;
    document.body.appendChild(nav);
    document.getElementById("flecha-anterior").addEventListener("click", irAnterior);
    document.getElementById("flecha-siguiente").addEventListener("click", irSiguienteRevision);
  }

  // ---------------- Init ----------------
  // Flechas de revisión: para la versión final se desactivan con meta.flechasRevision = false
  if (DATOS.meta.flechasRevision !== false) crearFlechasRevision();
  render();
  window.__motorState = state; // utilizado por el script de testing (jsdom)
})();
