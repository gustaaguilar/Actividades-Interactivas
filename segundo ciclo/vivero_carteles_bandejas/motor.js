/* ============================================================
   EL VIVERO — Carteles y bandejas
   motor.js — Motor del juego (genérico, reutilizable en otros paquetes)
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
      if (this.reproduciendo) return;
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

  // Opciones cortas (una palabra o número, <= 10 caracteres) -> grilla de 2
  // columnas. Opciones largas -> lista de una columna. Detección automática.
  function aplicarLayoutOpciones(wrap, opciones) {
    const promedio = opciones.reduce((s, o) => s + o.texto.length, 0) / opciones.length;
    wrap.classList.toggle("trivia-opciones-grid", promedio <= 10);
  }

  function bloquePerfil(contexto) {
    const meta = D.meta || {};
    const wrap = el("div", "perfil-block " + contexto);
    wrap.innerHTML = `
      <img src="img/profe.jpg" class="perfil-foto" alt="Profe Gustavo Aguilar" />
      <div class="perfil-txt">
        💻 Informática Educativa · Profe Gustavo Aguilar<br/>
        ✉️ ${meta.mail || "profegustaaguilar@gmail.com"}
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
    let zoomActivo = false;
    imgPerfil.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!zoomActivo) {
        const rect = imgPerfil.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        imgPerfil.style.transformOrigin = `${x}% ${y}%`;
      }
      zoomActivo = !zoomActivo;
      imgPerfil.classList.toggle("zoom-activo", zoomActivo);
    });
    lb.querySelector(".btn-cerrar-lightbox").addEventListener("click", () => lb.remove());
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.remove(); });
    document.body.appendChild(lb);
  }

  /* ---------- Flags de habilitación por pantalla ---------- */
  let interaccionHabilitada = false;
  let actividadResuelta = false;

  function actualizarSiguiente() {
    const btn = document.getElementById("btn-siguiente");
    if (!btn) return;
    const audioListo = !colaAudio.hayPendientes();
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

    const pantalla = D.pantallas[idx];
    const cont = el("div", "pantalla pantalla-" + pantalla.tipo + " esperando-audio");
    app.appendChild(cont);

    switch (pantalla.tipo) {
      case "portada": renderPortada(cont, pantalla); return;
      case "cierre": renderCierre(cont, pantalla); return;
      case "narracion": renderNarracion(cont, pantalla); break;
      case "clasificar": renderClasificar(cont, pantalla); break;
      case "ordenar": renderOrdenar(cont, pantalla); break;
      case "trivia": renderTrivia(cont, pantalla); break;
      case "asociar": renderAsociar(cont, pantalla); break;
      case "hotspot": renderHotspot(cont, pantalla); break;
      default: cont.appendChild(el("p", "", "Tipo de pantalla no implementado: " + pantalla.tipo));
    }

    const barra = crearBarraInferior(irSiguiente);
    app.appendChild(barra);

    function habilitarInteraccion() {
      interaccionHabilitada = true;
      cont.classList.remove("esperando-audio");
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
  }

  /* ---------- CLASIFICAR (tap-to-select; primer intento define el puntaje) ---------- */
  function renderClasificar(cont, p) {
    const items = shuffle(p.items);
    const resueltos = new Set();   // ids YA clasificados correctamente
    const evaluados = new Set();   // ids cuyo PRIMER intento ya se contó (acierto o error)
    let seleccion = null;

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
    const catsPorId = {};

    function limpiarSeleccionVisual() {
      itemsWrap.querySelectorAll(".item-chip").forEach((c) => c.classList.remove("seleccionado"));
      catsWrap.querySelectorAll(".categoria-chip").forEach((c) => c.classList.remove("seleccionado"));
    }

    function intentarResolver(itemId, catId) {
      const it = items.find((x) => x.id === itemId);
      const cat = p.categorias.find((c) => c.id === catId);
      const chip = chipsPorId[itemId];
      const catBtn = catsPorId[catId];
      const correcto = it.categoria === catId;

      // El puntaje solo se computa la primera vez que se evalúa este ítem.
      const esPrimerIntento = !evaluados.has(itemId);
      if (esPrimerIntento) evaluados.add(itemId);

      seleccion = null;
      limpiarSeleccionVisual();

      // Destello en la categoría tocada, se haya tocado antes o después del
      // ítem: si se tocó primero ya lo tenía por tocarCategoria(), pero si se
      // tocó segundo (el caso más común: ítem primero, categoría después) se
      // resuelve acá directo y nunca recibía señal visual propia.
      catBtn.classList.add("parpadeo");

      if (correcto) {
        resueltos.add(itemId);
        chip.classList.add("asignado", "correcto", "parpadeo");
        chip.style.borderColor = cat.color;
        if (esPrimerIntento) { aciertos += 1; puntos += 5; }
        colaAudio.reproducir(it.audioCorrecta || it.audio);

        if (resueltos.size === items.length) {
          feedback.textContent = "¡Listo! Ya clasificaste todo.";
          colaAudio.reproducir(p.audioConfirma, marcarResuelta);
        }
      } else {
        if (esPrimerIntento) errores += 1;
        chip.classList.add("incorrecto", "parpadeo");
        catBtn.classList.add("incorrecto");
        setTimeout(() => { chip.classList.remove("incorrecto"); catBtn.classList.remove("incorrecto"); }, 700);
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
        chip.classList.add("seleccionado", "parpadeo");
        colaAudio.reproducir(it.audio);
      }
    }

    function tocarCategoria(cat, catBtn) {
      if (!interaccionHabilitada) return;
      if (seleccion && seleccion.tipo === "item") {
        intentarResolver(seleccion.id, cat.id);
      } else {
        seleccion = { tipo: "categoria", id: cat.id };
        limpiarSeleccionVisual();
        catBtn.classList.add("seleccionado", "parpadeo");
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
      catsPorId[cat.id] = catBtn;
    });
  }

  /* ---------- ORDENAR (tap-to-select; primer intento por paso define el puntaje) ---------- */
  function renderOrdenar(cont, p) {
    const pasosDesordenados = shuffle(p.pasos);
    let siguienteEsperado = 0;
    const posicionesEvaluadas = new Set(); // índices de paso cuyo primer intento ya se contó

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

        const posActual = siguienteEsperado;
        const esperado = p.pasos[posActual];
        const esPrimerIntento = !posicionesEvaluadas.has(posActual);

        if (paso.id === esperado.id) {
          if (esPrimerIntento) posicionesEvaluadas.add(posActual);
          chip.classList.add("usado");
          colaAudio.reproducir(paso.audio);
          const numChip = el("div", "paso-numerado parpadeo", `${posActual + 1}. ${paso.texto}`);
          resultadoWrap.appendChild(numChip);
          if (esPrimerIntento) { aciertos += 1; puntos += 5; }
          siguienteEsperado++;

          if (siguienteEsperado === p.pasos.length) {
            feedback.textContent = "¡Excelente! El orden es correcto.";
            colaAudio.reproducir(p.audioConfirma, marcarResuelta);
          }
        } else {
          if (esPrimerIntento) { posicionesEvaluadas.add(posActual); errores += 1; }
          chip.classList.add("incorrecto");
          setTimeout(() => chip.classList.remove("incorrecto"), 500);
        }
      });
      opcionesWrap.appendChild(chip);
    });
  }

  /* ---------- TRIVIA (tap-to-select; se corrige al toque, sin botón Verificar;
     reintento libre hasta acertar, primer intento define el puntaje) ---------- */
  function renderTrivia(cont, p) {
    const opciones = shuffle(p.opciones);
    cont.innerHTML = `
      <h2>${p.titulo}</h2>
      <img class="img-pantalla" src="${p.imagen}" alt="${p.titulo}" />
      <p class="instruccion">${p.instruccionTexto}</p>
      <p class="pregunta">${p.pregunta}</p>
      <div class="trivia-opciones"></div>
      <div class="feedback"></div>`;

    const opcionesWrap = cont.querySelector(".trivia-opciones");
    aplicarLayoutOpciones(opcionesWrap, opciones);
    const feedback = cont.querySelector(".feedback");
    let resuelta = false;
    let primerIntentoHecho = false; // el puntaje solo se computa la primera vez

    opciones.forEach((op) => {
      const btn = el("button", "opcion-btn", op.texto);
      btn.addEventListener("click", () => {
        if (!interaccionHabilitada || resuelta) return;

        const esPrimerIntento = !primerIntentoHecho;
        if (esPrimerIntento) primerIntentoHecho = true;

        opcionesWrap.querySelectorAll(".opcion-btn").forEach((b) => b.classList.remove("seleccionada", "parpadeo"));
        btn.classList.add("seleccionada", "parpadeo");

        if (op.correcta) {
          resuelta = true;
          if (esPrimerIntento) { aciertos += 1; puntos += 10; }
          feedback.textContent = "¡Correcto!";
          colaAudio.reproducir(p.audioConfirmaCorrecta, marcarResuelta);
        } else {
          if (esPrimerIntento) errores += 1;
          feedback.textContent = "Esa no era, pero seguimos aprendiendo.";
          btn.classList.add("incorrecto");
          setTimeout(() => btn.classList.remove("incorrecto", "seleccionada"), 700);
          colaAudio.reproducir(p.audioConfirmaIncorrecta);
        }
      });
      opcionesWrap.appendChild(btn);
    });
  }

  // Paleta de colores distintivos para marcar cada pareja resuelta en "asociar"
  // (nunca el mismo verde genérico repetido: así se distinguen de un vistazo).
  const PALETA_PARES = [
    { borde: "#2e7d32", fondo: "#e8f5e9" }, // verde
    { borde: "#1565c0", fondo: "#e3f2fd" }, // azul
    { borde: "#ef6c00", fondo: "#fff3e0" }, // naranja
    { borde: "#6a1b9a", fondo: "#f3e5f5" }, // violeta
    { borde: "#00838f", fondo: "#e0f7fa" }, // turquesa
    { borde: "#ad1457", fondo: "#fce4ec" }, // rosa
    { borde: "#558b2f", fondo: "#f1f8e9" }, // verde oliva
    { borde: "#5d4037", fondo: "#efebe9" }  // marrón
  ];

  /* ---------- ASOCIAR (tap tarjeta izquierda + tap tarjeta derecha; primer intento por par) ---------- */
  function renderAsociar(cont, p) {
    const colorDePar = (parId) => {
      const idx = p.pares.findIndex((x) => x.id === parId);
      return PALETA_PARES[idx % PALETA_PARES.length];
    };
    const izqs = shuffle(p.pares.map((par) => ({ id: par.id, texto: par.izq, imagen: par.izqImagen, audio: par.izqAudio })));
    const ders = shuffle(p.pares.map((par) => ({ id: par.id, texto: par.der, audio: par.derAudio })));
    let seleccionIzq = null;
    let resueltos = 0;
    const evaluados = new Set(); // ids de pares cuyo primer intento ya se contó

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
        colIzq.querySelectorAll(".asociar-chip").forEach((c) => c.classList.remove("seleccionado", "parpadeo"));
        chip.classList.add("seleccionado", "parpadeo");
        seleccionIzq = it.id;
      });
      colIzq.appendChild(chip);
    });

    ders.forEach((it) => {
      const chip = el("div", "asociar-chip", it.texto);
      chip.dataset.id = it.id;
      chip.addEventListener("click", () => {
        if (!interaccionHabilitada || chip.classList.contains("resuelto") || !seleccionIzq) return;
        const idIzqActual = seleccionIzq;
        const chipIzq = colIzq.querySelector(`[data-id="${idIzqActual}"]`);
        const esPrimerIntento = !evaluados.has(idIzqActual);
        if (esPrimerIntento) evaluados.add(idIzqActual);

        if (idIzqActual === it.id) {
          const par = p.pares.find((x) => x.id === it.id);
          const color = colorDePar(it.id);
          chip.classList.add("resuelto", "correcto");
          chipIzq.classList.add("resuelto", "correcto");
          chip.style.borderColor = color.borde;
          chip.style.background = color.fondo;
          chipIzq.style.borderColor = color.borde;
          chipIzq.style.background = color.fondo;
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

  /* ---------- HOTSPOT (tocar zonas sobre una imagen) — disponible para futuros paquetes ---------- */
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
          feedback.textContent = "¡Encontraste todo!";
          colaAudio.reproducir(p.audioConfirma, marcarResuelta);
        }
      });
      wrap.appendChild(zonaEl);
    });
  }

  /* ---------- Init ---------- */
  // Hook de testeo (jsdom): permite saltar a una pantalla puntual.
  window.__irAPantalla = function (i) { idx = i; render(); };
  render();
})();
