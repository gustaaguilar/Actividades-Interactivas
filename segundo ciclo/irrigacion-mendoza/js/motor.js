// =====================================================
// Irrigación de Mendoza — Motor del paquete (v4)
// Profe Gustavo Aguilar — Informática Educativa
// =====================================================

(function () {
  "use strict";

  const app = document.getElementById("app");
  const pantallas = DATOS_PAQUETE.pantallas;

  let indice = 0;
  let aciertos = 0;
  let errores = 0;
  let puntos = 0;
  const yaEvaluado = {};

  // ---------- Utilidades ----------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function crear(tag, clase, texto) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto !== undefined && texto !== null) el.textContent = texto;
    return el;
  }

  function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function reproducirAudio(src) {
    return new Promise((resolve) => {
      if (!src) return resolve();
      let resuelto = false;
      const terminar = () => { if (!resuelto) { resuelto = true; resolve(); } };
      try {
        const audio = new Audio(src);
        audio.addEventListener("ended", terminar);
        audio.addEventListener("error", terminar);
        const p = audio.play();
        if (p && typeof p.catch === "function") p.catch(terminar);
      } catch (e) {
        // Si el navegador no puede crear/reproducir el audio por el motivo
        // que sea, no se rompe la actividad: se sigue igual.
        terminar();
        return;
      }
      // Salvaguarda: si por algún motivo el audio nunca dispara "ended"
      // (bloqueo del navegador, archivo con metadata rara, etc.), no se
      // congela la actividad: se libera igual pasados 8 segundos.
      setTimeout(terminar, 8000);
    });
  }

  // Color de texto con buen contraste según el color de fondo (fórmula de luminancia)
  function colorTexto(hexColor) {
    try {
      const hex = hexColor.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return lum > 0.6 ? "#2b1d10" : "#ffffff";
    } catch (e) {
      return "#ffffff";
    }
  }

  // ---------- Efectos sonoros (Web Audio API, sin archivos) ----------
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
    }
    return audioCtx;
  }
  function sfxAcierto() {
    try {
      const ctx = getAudioCtx();
      const t0 = ctx.currentTime;
      [660, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t0 + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.25, t0 + i * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.09 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0 + i * 0.09);
        osc.stop(t0 + i * 0.09 + 0.2);
      });
    } catch (e) { /* silencioso si el navegador no soporta AudioContext */ }
  }
  function sfxError() {
    try {
      const ctx = getAudioCtx();
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = 180;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.3);
    } catch (e) { /* silencioso */ }
  }

  // ---------- Header ----------
  function renderHeader(contenedor, pantalla) {
    const header = crear("div", "header-paquete");
    const total = pantallas.length;
    const pct = Math.round(((indice + 1) / total) * 100);

    const barraWrap = crear("div", "barra-progreso-wrap");
    const barraFill = crear("div", "barra-progreso-fill");
    barraFill.style.width = pct + "%";
    barraWrap.appendChild(barraFill);
    barraWrap.appendChild(crear("span", "barra-progreso-texto", `${indice + 1} de ${total}`));
    header.appendChild(barraWrap);

    contenedor.appendChild(header);
  }

  // Bloque de identidad del profe: foto + textos debajo (portada y cierre)
  function crearPerfilProfe(claseExtra) {
    const bloque = crear("div", "perfil-profe" + (claseExtra ? " " + claseExtra : ""));
    const foto = crear("img", "profe-foto");
    foto.src = "assets/profe.jpg";
    foto.alt = "Profe Gustavo Aguilar";
    foto.addEventListener("click", abrirLightboxProfe);
    bloque.appendChild(foto);
    bloque.appendChild(crear("p", "profe-linea", "💻 Informática Educativa"));
    bloque.appendChild(crear("p", "profe-linea", "Profe Gustavo Aguilar"));
    bloque.appendChild(crear("p", "profe-linea profe-mail", "✉️ profegustaaguilar@gmail.com"));
    return bloque;
  }

  function abrirLightboxProfe() {
    const overlay = crear("div", "lightbox-overlay");
    overlay.addEventListener("click", () => overlay.remove());
    const caja = crear("div", "lightbox-caja");
    caja.addEventListener("click", (e) => e.stopPropagation());
    const img = crear("img", "lightbox-img");
    img.src = "assets/profe.jpg";
    caja.appendChild(img);
    caja.appendChild(crear("p", "lightbox-frase", "Menos prisa, más vida 🧉🫂"));
    const cerrar = crear("button", "lightbox-cerrar", "✕");
    cerrar.addEventListener("click", () => overlay.remove());
    caja.appendChild(cerrar);
    overlay.appendChild(caja);
    document.body.appendChild(overlay);
  }

  // ---------- Navegación ----------
  function siguiente() {
    if (indice < pantallas.length - 1) {
      indice++;
      render();
    }
  }

  function botonSiguiente(contenedor, bloqueadoInicial) {
    const btn = crear("button", "btn btn-siguiente", "Siguiente ➜");
    btn.disabled = !!bloqueadoInicial;
    btn.addEventListener("click", siguiente);
    contenedor.appendChild(btn);
    return btn;
  }

  function registrarResultado(idPantalla, correcta) {
    if (yaEvaluado[idPantalla]) return;
    yaEvaluado[idPantalla] = true;
    if (correcta) { aciertos++; puntos += 10; } else { errores++; }
  }

  // ---------- Render principal ----------
  function render() {
    app.innerHTML = "";
    const pantalla = pantallas[indice];
    const vista = crear("div", "pantalla pantalla-" + pantalla.tipo);
    renderHeader(vista, pantalla);

    switch (pantalla.tipo) {
      case "portada": renderPortada(vista, pantalla); break;
      case "rompecabezas": renderRompecabezas(vista, pantalla); break;
      case "rompecabezas-imagen": renderRompecabezasImagen(vista, pantalla); break;
      case "sopa": renderSopa(vista, pantalla); break;
      case "opciones": renderOpciones(vista, pantalla); break;
      case "seleccion-multiple": renderSeleccionMultiple(vista, pantalla); break;
      case "asociar": renderAsociar(vista, pantalla); break;
      case "categorizar": renderCategorizar(vista, pantalla); break;
      case "mapa": renderMapa(vista, pantalla); break;
      case "simulacion": renderSimulacion(vista, pantalla); break;
      case "cierre": renderCierre(vista, pantalla); break;
      default: vista.appendChild(crear("p", "", "Tipo no implementado: " + pantalla.tipo));
    }
    app.appendChild(vista);
  }

  // ---------- Portada ----------
  function renderPortada(vista, p) {
    const img = crear("img", "imagen-portada"); img.src = p.imagen;
    vista.appendChild(img);
    vista.appendChild(crear("h1", "titulo-portada", p.titulo));
    vista.appendChild(crear("h2", "subtitulo-portada", p.subtitulo));
    vista.appendChild(crearPerfilProfe());
    const btn = crear("button", "btn btn-comenzar", "Comenzar ▶");
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      await reproducirAudio(p.audio);
      siguiente();
    });
    vista.appendChild(btn);
  }

  // ---------- Rompecabezas de oraciones ----------
  function renderRompecabezas(vista, p) {
    const img = crear("img", "imagen-info");
    img.src = (p.oraciones[0] && p.oraciones[0].imagen) || p.imagen;
    vista.appendChild(img);
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const zonaArmado = crear("div", "zona-armado");
    const bancoPalabras = crear("div", "banco-palabras");
    vista.appendChild(zonaArmado);
    vista.appendChild(bancoPalabras);

    const btnCont = crear("div", "contenedor-boton");
    vista.appendChild(btnCont);
    const btnSig = crear("button", "btn btn-siguiente", "Siguiente ➜");
    btnSig.disabled = true;
    btnCont.appendChild(btnSig);
    btnSig.addEventListener("click", () => {
      if (btnSig.disabled) return;
      yaEvaluado[p.id] = true;
      siguiente();
    });
    let oracionActual = 0;
    let bloqueado = true; // se desbloquea cuando terminan de sonar título + consigna

    function cargarOracion() {
      zonaArmado.innerHTML = "";
      bancoPalabras.innerHTML = "";
      const oracion = p.oraciones[oracionActual];
      img.src = oracion.imagen || p.imagen;
      const palabras = oracion.texto.split(" ");
      const orden = shuffle(palabras.map((palabra, i) => ({ palabra, i })));
      let colocadas = 0;

      const slots = palabras.map(() => {
        const slot = crear("span", "slot-palabra");
        zonaArmado.appendChild(slot);
        return slot;
      });

      orden.forEach((item) => {
        const chip = crear("button", "chip-palabra", item.palabra);
        chip.disabled = bloqueado;
        chip.addEventListener("click", () => {
          if (chip.disabled || bloqueado) return;
          if (item.i !== colocadas) {
            chip.classList.add("incorrecta");
            errores++;
            sfxError();
            reproducirAudio("assets/audio/rompecabezas_recordatorio.mp3");
            setTimeout(() => chip.classList.remove("incorrecta"), 400);
            return;
          }
          slots[colocadas].textContent = item.palabra;
          chip.disabled = true;
          chip.classList.add("usada");
          colocadas++;
          aciertos++; puntos += 2;
          sfxAcierto();
          if (colocadas === palabras.length) {
            const esUltima = oracionActual === p.oraciones.length - 1;
            if (esUltima) btnSig.textContent = "🔊 Escuchando...";
            (async () => {
              try {
                await reproducirAudio(oracion.audio);
              } catch (e) { /* nunca debe bloquear el avance */ }
              if (esUltima) {
                // Última oración: el alumno confirma manualmente con el botón,
                // que recién ahora queda habilitado.
                btnSig.textContent = "Siguiente ➜";
                btnSig.disabled = false;
              } else {
                // Oraciones intermedias: se pasa sola a la siguiente, sin
                // necesitar un toque extra por cada oración.
                oracionActual++;
                cargarOracion();
              }
            })();
          }
        });
        bancoPalabras.appendChild(chip);
      });
    }

    cargarOracion();

    (async () => {
      await reproducirAudio(p.audioTitulo);
      await reproducirAudio(p.audioInstruccion);
      bloqueado = false;
      [...bancoPalabras.querySelectorAll(".chip-palabra")].forEach((c) => {
        if (!c.classList.contains("usada")) c.disabled = false;
      });
    })();
  }

  // ---------- Rompecabezas de imagen (armar por piezas) ----------
  function renderRompecabezasImagen(vista, p) {
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const n = p.piezas || 3;
    const contenedor = crear("div", "rompecabezas-imagen-grid");
    contenedor.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    vista.appendChild(contenedor);

    const total = n * n;
    let mezclado = shuffle([...Array(total).keys()]);
    let vueltas = 0;
    while (mezclado.every((v, i) => v === i) && vueltas < 10) {
      mezclado = shuffle([...Array(total).keys()]);
      vueltas++;
    }

    function aplicarSlice(tile, idxCorrecto) {
      const fila = Math.floor(idxCorrecto / n);
      const col = idxCorrecto % n;
      const paso = n > 1 ? 100 / (n - 1) : 0;
      tile.style.backgroundImage = `url(${p.imagen})`;
      tile.style.backgroundSize = `${n * 100}% ${n * 100}%`;
      tile.style.backgroundPosition = `${col * paso}% ${fila * paso}%`;
      tile.dataset.correcto = idxCorrecto;
    }

    const tiles = [];
    for (let i = 0; i < total; i++) {
      const tile = crear("button", "pieza-rompecabezas");
      tile.dataset.pos = i;
      aplicarSlice(tile, mezclado[i]);
      tiles.push(tile);
      contenedor.appendChild(tile);
    }

    const zonaFinal = crear("div", "zona-final-rompecabezas");
    vista.appendChild(zonaFinal);

    const btnCont = crear("div", "contenedor-boton");
    vista.appendChild(btnCont);
    const btnSig = botonSiguiente(btnCont, true);

    let seleccionada = null;

    async function verificarResuelto() {
      const listo = tiles.every((t) => t.dataset.correcto === t.dataset.pos);
      if (listo) {
        tiles.forEach((t) => { t.disabled = true; t.classList.add("resuelto"); });
        registrarResultado(p.id, true);
        if (p.textoFinal) zonaFinal.appendChild(crear("p", "texto-final-rompecabezas", p.textoFinal));
        await reproducirAudio(p.audioFinal);
        btnSig.disabled = false;
      }
    }

    tiles.forEach((tile) => {
      tile.addEventListener("click", () => {
        if (tile.disabled) return;
        if (!seleccionada) {
          seleccionada = tile;
          tile.classList.add("seleccionada");
          return;
        }
        if (seleccionada === tile) {
          tile.classList.remove("seleccionada");
          seleccionada = null;
          return;
        }
        const idxA = +seleccionada.dataset.correcto;
        const idxB = +tile.dataset.correcto;
        aplicarSlice(seleccionada, idxB);
        aplicarSlice(tile, idxA);
        // Efecto de acierto si alguna de las dos piezas quedó en su lugar correcto; si no, error.
        const aCorrecta = seleccionada.dataset.correcto === seleccionada.dataset.pos;
        const bCorrecta = tile.dataset.correcto === tile.dataset.pos;
        if (aCorrecta || bCorrecta) sfxAcierto(); else sfxError();
        seleccionada.classList.remove("seleccionada");
        seleccionada = null;
        verificarResuelto();
      });
    });

    (async () => {
      await reproducirAudio(p.audioTitulo);
      await reproducirAudio(p.audioInstruccion);
    })();
  }

  // ---------- Sopa de letras (direcciones variadas) ----------
  function renderSopa(vista, p) {
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const filas = p.filas, columnas = p.columnas;
    const grid = Array.from({ length: filas }, () => Array(columnas).fill(null));

    const DIRS = [
      { dr: 0, dc: 1, cat: "horizontal" },
      { dr: 1, dc: 0, cat: "vertical" },
      { dr: -1, dc: 0, cat: "vertical" },
      { dr: 1, dc: 1, cat: "diagonal" },
      { dr: -1, dc: 1, cat: "diagonal" }
    ];

    function categoriasNecesarias(n) {
      const base = ["horizontal", "vertical", "diagonal"];
      const cats = [];
      for (let i = 0; i < n; i++) cats.push(base[i % base.length]);
      return shuffle(cats);
    }

    const categoriasAsignadas = categoriasNecesarias(p.palabras.length);
    const ubicaciones = [];

    p.palabras.forEach((pal, idx) => {
      const palabra = pal.palabra;
      const catPref = categoriasAsignadas[idx];
      let colocado = false;
      let intentos = 0;
      const ordenDirs = shuffle(DIRS.filter((d) => d.cat === catPref)).concat(shuffle(DIRS));
      while (!colocado && intentos < 400) {
        const dir = ordenDirs[intentos % ordenDirs.length];
        intentos++;
        const filaMin = dir.dr < 0 ? (palabra.length - 1) : 0;
        const filaMax = dir.dr > 0 ? (filas - palabra.length) : (filas - 1);
        const colMin = dir.dc < 0 ? (palabra.length - 1) : 0;
        const colMax = dir.dc > 0 ? (columnas - palabra.length) : (columnas - 1);
        if (filaMin > filaMax || colMin > colMax) continue;
        const filaInicio = filaMin + Math.floor(Math.random() * (filaMax - filaMin + 1));
        const colInicio = colMin + Math.floor(Math.random() * (colMax - colMin + 1));
        let libre = true;
        for (let k = 0; k < palabra.length; k++) {
          const f = filaInicio + dir.dr * k, c = colInicio + dir.dc * k;
          if (grid[f][c] && grid[f][c] !== palabra[k]) { libre = false; break; }
        }
        if (!libre) continue;
        for (let k = 0; k < palabra.length; k++) {
          const f = filaInicio + dir.dr * k, c = colInicio + dir.dc * k;
          grid[f][c] = palabra[k];
        }
        const filaFin = filaInicio + dir.dr * (palabra.length - 1);
        const colFin = colInicio + dir.dc * (palabra.length - 1);
        ubicaciones.push(Object.assign({}, pal, { filaInicio, colInicio, filaFin, colFin }));
        colocado = true;
      }
      if (!colocado) {
        // Respaldo: horizontal forzado, garantiza que la palabra siempre entre
        for (let f = 0; f < filas && !colocado; f++) {
          for (let c = 0; c <= columnas - palabra.length && !colocado; c++) {
            let libre = true;
            for (let k = 0; k < palabra.length; k++) {
              if (grid[f][c + k] && grid[f][c + k] !== palabra[k]) libre = false;
            }
            if (libre) {
              for (let k = 0; k < palabra.length; k++) grid[f][c + k] = palabra[k];
              ubicaciones.push(Object.assign({}, pal, { filaInicio: f, colInicio: c, filaFin: f, colFin: c + palabra.length - 1 }));
              colocado = true;
            }
          }
        }
      }
    });

    const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < columnas; c++) {
        if (!grid[f][c]) grid[f][c] = ABC[Math.floor(Math.random() * ABC.length)];
      }
    }

    const tabla = crear("div", "grid-sopa");
    tabla.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    const celdas = [];
    for (let f = 0; f < filas; f++) {
      celdas.push([]);
      for (let c = 0; c < columnas; c++) {
        const celda = crear("button", "celda-sopa", grid[f][c]);
        celda.dataset.fila = f;
        celda.dataset.col = c;
        tabla.appendChild(celda);
        celdas[f].push(celda);
      }
    }
    vista.appendChild(tabla);

    const listaEncontradas = crear("div", "lista-encontradas");
    p.palabras.forEach((pal) => {
      const chip = crear("span", "palabra-pendiente", pal.palabra);
      chip.dataset.palabra = pal.palabra;
      listaEncontradas.appendChild(chip);
    });
    vista.appendChild(listaEncontradas);

    let inicioSel = null;
    let encontradas = 0;
    const palabrasHalladas = new Set();

    function limpiarSeleccion() {
      celdas.flat().forEach((c) => c.classList.remove("seleccionada"));
    }

    celdas.flat().forEach((celda) => {
      celda.addEventListener("click", () => {
        // Nota: no se bloquean celdas "halladas" porque dos palabras pueden
        // compartir una celda con la misma letra (intersección válida).
        if (!inicioSel) {
          inicioSel = celda;
          celda.classList.add("seleccionada");
          return;
        }
        const f1 = +inicioSel.dataset.fila, c1 = +inicioSel.dataset.col;
        const f2 = +celda.dataset.fila, c2 = +celda.dataset.col;

        const match = ubicaciones.find((u) =>
          (u.filaInicio === f1 && u.colInicio === c1 && u.filaFin === f2 && u.colFin === c2) ||
          (u.filaInicio === f2 && u.colInicio === c2 && u.filaFin === f1 && u.colFin === c1)
        );
        if (match && !palabrasHalladas.has(match.palabra)) {
          palabrasHalladas.add(match.palabra);
          const dr = Math.sign(match.filaFin - match.filaInicio);
          const dc = Math.sign(match.colFin - match.colInicio);
          for (let k = 0; k < match.palabra.length; k++) {
            celdas[match.filaInicio + dr * k][match.colInicio + dc * k].classList.add("hallada");
          }
          const chipTxt = listaEncontradas.querySelector(`[data-palabra="${match.palabra}"]`);
          if (chipTxt) chipTxt.classList.add("hallada-txt");
          reproducirAudio(match.audio);
          encontradas++;
          if (encontradas === p.palabras.length) {
            registrarResultado(p.id, true);
            const btnCont = crear("div", "contenedor-boton");
            vista.appendChild(btnCont);
            botonSiguiente(btnCont, false);
          }
        }
        limpiarSeleccion();
        inicioSel = null;
      });
    });

    window.__motorTest && (window.__motorTest.ultimaSopa = ubicaciones);

    (async () => { await reproducirAudio(p.audioInstruccion); })();
  }

  // ---------- Opciones (una correcta) con justificación ----------
  function renderOpciones(vista, p) {
    if (p.imagen) { const img = crear("img", "imagen-actividad"); img.src = p.imagen; vista.appendChild(img); }
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const grid = crear("div", "grid-opciones");
    vista.appendChild(grid);
    const justificacionDiv = crear("p", "justificacion oculto", p.justificacion || "");
    vista.appendChild(justificacionDiv);

    let resuelto = false;
    shuffle(p.opciones).forEach((op) => {
      const boton = crear("button", "opcion", op);
      boton.addEventListener("click", async () => {
        if (resuelto) return;
        resuelto = true;
        const correcta = op === p.correcta;
        [...grid.children].forEach((b) => (b.disabled = true));
        boton.classList.add(correcta ? "correcta" : "incorrecta");
        if (!correcta) {
          [...grid.children].forEach((b) => { if (b.textContent === p.correcta) b.classList.add("correcta"); });
        }
        registrarResultado(p.id, correcta);
        justificacionDiv.classList.remove("oculto");
        await reproducirAudio(p.audioJustificacion);
        const btnCont = crear("div", "contenedor-boton");
        vista.appendChild(btnCont);
        botonSiguiente(btnCont, false);
      });
      grid.appendChild(boton);
    });

    (async () => { await reproducirAudio(p.audioInstruccion); })();
  }

  // ---------- Selección múltiple con justificación ----------
  function renderSeleccionMultiple(vista, p) {
    if (p.imagen) { const img = crear("img", "imagen-actividad"); img.src = p.imagen; vista.appendChild(img); }
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const grid = crear("div", "grid-opciones");
    vista.appendChild(grid);
    const justificacionDiv = crear("p", "justificacion oculto", p.justificacion || "");
    vista.appendChild(justificacionDiv);

    const seleccionadas = new Set();
    let resuelto = false;

    shuffle(p.opciones).forEach((op) => {
      const boton = crear("button", "opcion", op);
      boton.addEventListener("click", async () => {
        if (resuelto) return;
        if (seleccionadas.has(op)) { seleccionadas.delete(op); boton.classList.remove("seleccionada"); return; }
        if (seleccionadas.size >= p.cantidadRequerida) return;
        seleccionadas.add(op); boton.classList.add("seleccionada");
        if (seleccionadas.size === p.cantidadRequerida) {
          resuelto = true;
          const correctas = p.correctas.every((c) => seleccionadas.has(c));
          [...grid.children].forEach((b) => {
            b.disabled = true;
            if (p.correctas.includes(b.textContent)) b.classList.add("correcta");
            else if (seleccionadas.has(b.textContent)) b.classList.add("incorrecta");
          });
          registrarResultado(p.id, correctas);
          justificacionDiv.classList.remove("oculto");
          await reproducirAudio(p.audioJustificacion);
          const btnCont = crear("div", "contenedor-boton");
          vista.appendChild(btnCont);
          botonSiguiente(btnCont, false);
        }
      });
      grid.appendChild(boton);
    });

    (async () => { await reproducirAudio(p.audioInstruccion); })();
  }

  // ---------- Asociar (sin revelar color hasta acertar; color/contraste por par) ----------
  function renderAsociar(vista, p) {
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    if (p.imagenContexto) {
      const imgCtx = crear("img", "imagen-contexto");
      imgCtx.src = p.imagenContexto;
      vista.appendChild(imgCtx);
    }

    const contenedor = crear("div", "contenedor-asociar");
    const colTextos = crear("div", "columna-textos");
    const hayImagenes = p.pares.some((x) => x.imagen);
    const colDerecha = crear("div", "columna-imagenes" + (hayImagenes ? " grid-cuadrado" : ""));
    contenedor.appendChild(colTextos);
    contenedor.appendChild(colDerecha);
    vista.appendChild(contenedor);

    const pares = p.pares;
    let seleccionTexto = null;
    let resueltos = 0;
    let huboError = false;

    pares.forEach((par) => {
      const btn = crear("button", "opcion opcion-texto", par.texto);
      btn.dataset.texto = par.texto;
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        [...colTextos.children].forEach((b) => b.classList.remove("activo"));
        btn.classList.add("activo");
        seleccionTexto = par;
      });
      colTextos.appendChild(btn);
    });

    shuffle(pares).forEach((par) => {
      let btn;
      if (par.imagen) {
        btn = crear("button", "opcion-imagen");
        // Una sola columna, apiladas: cada cuadrado se dimensiona según
        // cuántos pares hay, para que todos entren sin scroll y lo más
        // grandes posible.
        const tam = `min(64vw, ${Math.max(9, Math.floor(54 / pares.length))}vh)`;
        btn.style.width = tam;
        btn.style.height = tam;
        const img = crear("img"); img.src = par.imagen;
        btn.appendChild(img);
      } else {
        btn = crear("button", "opcion opcion-texto", par.textoDerecha);
      }
      btn.dataset.texto = par.texto;
      btn.addEventListener("click", async () => {
        if (btn.disabled || !seleccionTexto) return;
        const correcta = seleccionTexto.texto === par.texto;
        if (correcta) {
          const color = par.color || "#2e8b3d";
          const textoColor = colorTexto(color);
          btn.style.background = color; btn.style.borderColor = color; btn.style.color = textoColor;
          btn.classList.add("correcta-color"); btn.disabled = true;
          [...colTextos.children].forEach((b) => {
            if (b.dataset.texto === par.texto) {
              b.classList.remove("activo");
              b.style.background = color; b.style.borderColor = color; b.style.color = textoColor;
              b.classList.add("correcta-color"); b.disabled = true;
            }
          });
          resueltos++;
          await reproducirAudio(par.audio);
        } else {
          btn.classList.add("incorrecta"); huboError = true;
          setTimeout(() => btn.classList.remove("incorrecta"), 500);
        }
        seleccionTexto = null;
        if (resueltos === pares.length) {
          registrarResultado(p.id, !huboError);
          const btnCont = crear("div", "contenedor-boton");
          vista.appendChild(btnCont);
          botonSiguiente(btnCont, false);
        }
      });
      colDerecha.appendChild(btn);
    });

    (async () => { await reproducirAudio(p.audioInstruccion); })();
  }

  // ---------- Categorizar (columnas con imagen de encabezado) ----------
  function renderCategorizar(vista, p) {
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const banco = crear("div", "banco-items");
    vista.appendChild(banco);

    const columnas = crear("div", "contenedor-columnas");
    const mapaColumnas = {};
    p.columnas.forEach((col) => {
      const divCol = crear("div", "columna-drop");
      divCol.dataset.columna = col.nombre;
      const imgCol = crear("img", "imagen-columna"); imgCol.src = col.imagen;
      divCol.appendChild(imgCol);
      divCol.appendChild(crear("h3", "", col.nombre));
      columnas.appendChild(divCol);
      mapaColumnas[col.nombre] = divCol;
    });
    vista.appendChild(columnas);

    const items = shuffle(p.items);
    let colocados = 0;
    let huboError = false;
    let activo = null;

    items.forEach((item) => {
      const chip = crear("button", "chip-item", item.texto);
      chip.addEventListener("click", () => {
        if (chip.disabled) return;
        [...banco.children].forEach((c) => c.classList.remove("activo"));
        chip.classList.add("activo");
        activo = { chip, item };
      });
      banco.appendChild(chip);
    });

    Object.values(mapaColumnas).forEach((col) => {
      col.addEventListener("click", async () => {
        if (!activo) return;
        const correcta = activo.item.columna === col.dataset.columna;
        if (correcta) {
          activo.chip.disabled = true;
          activo.chip.classList.remove("activo");
          activo.chip.classList.add("colocado");
          col.appendChild(activo.chip);
          colocados++;
          await reproducirAudio(activo.item.audio);
        } else {
          huboError = true;
          activo.chip.classList.add("incorrecta");
          setTimeout(() => activo.chip.classList.remove("incorrecta"), 500);
        }
        activo = null;
        if (colocados === items.length) {
          registrarResultado(p.id, !huboError);
          const btnCont = crear("div", "contenedor-boton");
          vista.appendChild(btnCont);
          botonSiguiente(btnCont, false);
        }
      });
    });

    (async () => { await reproducirAudio(p.audioInstruccion); })();
  }

  // ---------- Mapa interactivo — arrastrar y soltar real ----------
  function renderMapa(vista, p) {
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const cont = crear("div", "contenedor-mapa");
    const img = crear("img", "imagen-mapa");
    img.src = p.imagen;
    cont.appendChild(img);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "overlay-mapa");
    svg.setAttribute("viewBox", "0 0 1024 558");

    const zonasEl = {};
    p.zonas.forEach((zona) => {
      const circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circulo.setAttribute("cx", zona.x);
      circulo.setAttribute("cy", zona.y);
      circulo.setAttribute("r", zona.radio);
      circulo.setAttribute("class", "zona-mapa");
      circulo.dataset.nombre = zona.nombre;
      svg.appendChild(circulo);
      zonasEl[zona.nombre] = { circulo, zona };
    });
    cont.appendChild(svg);
    vista.appendChild(cont);

    const banco = crear("div", "banco-items banco-mapa");
    let resueltos = 0;
    let huboError = false;

    shuffle(p.zonas).forEach((zona) => {
      const chip = crear("button", "chip-item chip-arrastrable", zona.nombre);
      chip.dataset.nombre = zona.nombre;
      banco.appendChild(chip);
      habilitarArrastre(chip, zona);
    });
    vista.appendChild(banco);

    function habilitarArrastre(chip, zona) {
      let arrastrando = false;

      function alSoltar(clientX, clientY) {
        arrastrando = false;
        chip.classList.remove("arrastrando");
        const mapaRect = cont.getBoundingClientRect();
        const xRel = ((clientX - mapaRect.left) / mapaRect.width) * 1024;
        const yRel = ((clientY - mapaRect.top) / mapaRect.height) * 558;

        let acierto = false;
        for (const nombre in zonasEl) {
          const z = zonasEl[nombre].zona;
          const dist = Math.hypot(xRel - z.x, yRel - z.y);
          if (dist <= z.radio) {
            if (nombre === zona.nombre) {
              acierto = true;
              zonasEl[nombre].circulo.classList.add("correcta");
              chip.classList.add("colocado");
              chip.disabled = true;
              // Fijar el chip en el mapa, en el punto donde se soltó dentro de la zona
              chip.style.position = "absolute";
              chip.style.left = ((xRel / 1024) * 100) + "%";
              chip.style.top = ((yRel / 558) * 100) + "%";
              chip.style.transform = "translate(-50%, -50%)";
              cont.appendChild(chip);
              reproducirAudio(zona.audio);
              resueltos++;
            } else {
              zonasEl[nombre].circulo.classList.add("incorrecta");
              huboError = true;
              setTimeout(() => zonasEl[nombre].circulo.classList.remove("incorrecta"), 500);
            }
            break;
          }
        }
        if (!acierto) {
          // Error o fuera de zona: vuelve a su lugar original en el banco
          chip.style.position = "";
          chip.style.left = "";
          chip.style.top = "";
          chip.style.transform = "";
        }
        if (resueltos === p.zonas.length) {
          registrarResultado(p.id, !huboError);
          const btnCont = crear("div", "contenedor-boton");
          vista.appendChild(btnCont);
          botonSiguiente(btnCont, false);
        }
      }

      chip.addEventListener("mousedown", () => {
        if (chip.disabled) return;
        arrastrando = true;
        chip.classList.add("arrastrando");
      });
      document.addEventListener("mousemove", (e) => {
        if (!arrastrando) return;
        chip.style.position = "fixed";
        chip.style.left = (e.clientX - 40) + "px";
        chip.style.top = (e.clientY - 20) + "px";
      });
      document.addEventListener("mouseup", (e) => {
        if (!arrastrando) return;
        alSoltar(e.clientX, e.clientY);
      });

      chip.addEventListener("touchstart", () => {
        if (chip.disabled) return;
        arrastrando = true;
        chip.classList.add("arrastrando");
      }, { passive: true });
      chip.addEventListener("touchmove", (e) => {
        if (!arrastrando) return;
        const t = e.touches[0];
        chip.style.position = "fixed";
        chip.style.left = (t.clientX - 40) + "px";
        chip.style.top = (t.clientY - 20) + "px";
      }, { passive: true });
      chip.addEventListener("touchend", (e) => {
        if (!arrastrando) return;
        const t = e.changedTouches[0];
        alSoltar(t.clientX, t.clientY);
      });

      chip._soltarEnPunto = alSoltar;
    }

    (async () => { await reproducirAudio(p.audioInstruccion); })();
  }

  // ---------- Simulación de riego (escena SVG animada, audio secuencial) ----------
  function renderSimulacion(vista, p) {
    vista.appendChild(crear("h2", "titulo-pantalla", p.titulo));
    vista.appendChild(crear("p", "instruccion", p.instruccion));

    const marco = crear("div", "escena-simulacion-marco");
    const fondoImg = crear("img", "escena-simulacion-fondo");
    fondoImg.src = p.imagenFondo;
    marco.appendChild(fondoImg);

    const escena = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    escena.setAttribute("class", "escena-simulacion-overlay");
    escena.setAttribute("viewBox", p.viewBox || "0 0 1024 572");
    escena.setAttribute("preserveAspectRatio", "none");

    // Compuerta: pequeño ícono dibujado sobre la foto, en el punto de partida
    const compuerta = document.createElementNS("http://www.w3.org/2000/svg", "g");
    compuerta.setAttribute("class", "icono-compuerta");
    const cBase = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    cBase.setAttribute("x", p.compuerta.x - 10);
    cBase.setAttribute("y", p.compuerta.y - 22);
    cBase.setAttribute("width", 20);
    cBase.setAttribute("height", 30);
    cBase.setAttribute("rx", 2);
    compuerta.appendChild(cBase);
    escena.appendChild(compuerta);

    const trazo = document.createElementNS("http://www.w3.org/2000/svg", "path");
    trazo.setAttribute("d", p.path);
    trazo.setAttribute("class", "trazo-agua");
    escena.appendChild(trazo);

    const longitudTotal = trazo.getTotalLength ? (() => { try { return trazo.getTotalLength(); } catch (e) { return 1000; } })() : 1000;
    trazo.style.strokeDasharray = longitudTotal;
    trazo.style.strokeDashoffset = longitudTotal;

    // Cada punto de riego: un ramal corto (si corresponde, tipo "T" desde el
    // canal principal hacia la hilera/árbol) y un destello/brillo final que
    // aparece sobre la foto real.
    const nodosEl = {};
    p.nodos.forEach((nodo) => {
      const tieneRamal = nodo.ramalX !== undefined && nodo.ramalY !== undefined;
      const finX = tieneRamal ? nodo.ramalX : nodo.cx;
      const finY = tieneRamal ? nodo.ramalY : nodo.cy;

      const grupo = document.createElementNS("http://www.w3.org/2000/svg", "g");
      grupo.setAttribute("class", "nodo-riego");

      let ramal = null;
      let longitudRamal = 0;
      if (tieneRamal) {
        ramal = document.createElementNS("http://www.w3.org/2000/svg", "path");
        ramal.setAttribute("d", `M${nodo.cx},${nodo.cy} L${nodo.ramalX},${nodo.ramalY}`);
        ramal.setAttribute("class", "ramal-agua");
        escena.appendChild(ramal);
        longitudRamal = ramal.getTotalLength ? (() => { try { return ramal.getTotalLength(); } catch (e) { return 80; } })() : 80;
        ramal.style.strokeDasharray = longitudRamal;
        ramal.style.strokeDashoffset = longitudRamal;
      }

      const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      halo.setAttribute("cx", finX); halo.setAttribute("cy", finY); halo.setAttribute("r", 26);
      halo.setAttribute("class", "halo-riego");
      grupo.appendChild(halo);

      const gota = document.createElementNS("http://www.w3.org/2000/svg", "text");
      gota.setAttribute("x", finX); gota.setAttribute("y", finY + 6);
      gota.setAttribute("text-anchor", "middle");
      gota.setAttribute("class", "icono-gota");
      gota.textContent = "💧";
      grupo.appendChild(gota);

      const etiqueta = document.createElementNS("http://www.w3.org/2000/svg", "text");
      etiqueta.setAttribute("x", finX); etiqueta.setAttribute("y", finY - 34);
      etiqueta.setAttribute("class", "etiqueta-nodo");
      etiqueta.setAttribute("text-anchor", "middle");
      etiqueta.textContent = nodo.nombre;
      grupo.appendChild(etiqueta);

      escena.appendChild(grupo);
      nodosEl[nodo.nombre] = { grupo, ramal, longitudRamal };
    });

    marco.appendChild(escena);
    vista.appendChild(marco);

    const zonaPrediccion = crear("div", "zona-prediccion");
    zonaPrediccion.appendChild(crear("p", "pregunta-prediccion", p.prediccion.pregunta));
    const gridPred = crear("div", "grid-opciones");
    zonaPrediccion.appendChild(gridPred);
    vista.appendChild(zonaPrediccion);

    const zonaAccion = crear("div", "zona-accion");
    vista.appendChild(zonaAccion);

    const btnCont = crear("div", "contenedor-boton");
    vista.appendChild(btnCont);
    const btnSig = botonSiguiente(btnCont, true);

    let prediccionElegida = null;

    (async () => { await reproducirAudio(p.audioIntro); await reproducirAudio(p.prediccion.audio); })();

    p.prediccion.opciones.forEach((op) => {
      const boton = crear("button", "opcion", op);
      boton.addEventListener("click", () => {
        if (prediccionElegida) return;
        prediccionElegida = op;
        [...gridPred.children].forEach((b) => (b.disabled = true));
        boton.classList.add("seleccionada");
        mostrarBotonCompuerta();
      });
      gridPred.appendChild(boton);
    });

    function mostrarBotonCompuerta() {
      const btnAbrir = crear("button", "btn btn-abrir-compuerta", "Abrir la compuerta 🚰");
      btnAbrir.addEventListener("click", () => {
        btnAbrir.disabled = true;
        iniciarAnimacion();
      });
      zonaAccion.appendChild(btnAbrir);
    }

    function iniciarAnimacion() {
      trazo.classList.add("fluyendo");
      compuerta.classList.add("abierta");
      const total = p.nodos.length;
      const duracionTramo = 2600; // ms por tramo — ritmo pausado para escuchar cada explicación

      (async () => {
        for (let i = 0; i < total; i++) {
          const objetivo = longitudTotal * (1 - (i + 1) / total);
          trazo.style.transition = `stroke-dashoffset ${duracionTramo}ms linear`;
          void trazo.offsetHeight; // forzar reflow para aplicar la transición
          trazo.style.strokeDashoffset = objetivo;
          await esperar(duracionTramo);

          const nodo = p.nodos[i];
          const { grupo, ramal, longitudRamal } = nodosEl[nodo.nombre];
          if (ramal) {
            ramal.classList.add("fluyendo");
            void ramal.offsetHeight;
            ramal.style.transition = "stroke-dashoffset 450ms linear";
            ramal.style.strokeDashoffset = 0;
            await esperar(450);
          }
          grupo.classList.add("regado");
          await reproducirAudio(nodo.audio); // se espera a que termine antes de seguir al próximo tramo
          await esperar(250);
        }

        const correcta = prediccionElegida === p.prediccion.correcta;
        const resultado = crear(
          "p",
          "resultado-prediccion",
          correcta
            ? "¡Correcto! Predijiste bien el recorrido del agua."
            : `El agua llegó primero a "${p.prediccion.correcta}".`
        );
        zonaAccion.appendChild(resultado);
        registrarResultado(p.id, correcta);
        await reproducirAudio(p.audioFinal);
        btnSig.disabled = false;
      })();
    }
  }

  // ---------- Cierre ----------
  function renderCierre(vista, p) {
    vista.appendChild(crear("h1", "titulo-cierre", p.titulo));
    const total = aciertos + errores;
    const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 100;

    const stats = crear("div", "stats-cierre");
    stats.appendChild(crear("p", "stat", `✅ Aciertos: ${aciertos}`));
    stats.appendChild(crear("p", "stat", `❌ Errores: ${errores}`));
    stats.appendChild(crear("p", "stat", `📊 ${porcentaje}%`));
    stats.appendChild(crear("p", "stat", `⭐ Puntos: ${puntos}`));
    vista.appendChild(stats);

    vista.appendChild(crearPerfilProfe());

    const btn = crear("button", "btn btn-repetir", "Volver a jugar");
    btn.addEventListener("click", () => {
      indice = 0; aciertos = 0; errores = 0; puntos = 0;
      Object.keys(yaEvaluado).forEach((k) => delete yaEvaluado[k]);
      render();
    });
    vista.appendChild(btn);

    reproducirAudio(p.audio);
  }

  // Corrección del clásico bug de "100vh" en navegadores móviles: la barra de
  // direcciones se muestra/oculta dinámicamente y 100vh no la tiene en cuenta,
  // dejando contenido (como el botón Siguiente) empujado fuera del área visible
  // real. Se calcula la altura real disponible y se expone como variable CSS.
  function ajustarAlturaReal() {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  }
  ajustarAlturaReal();
  window.addEventListener("resize", ajustarAlturaReal);
  window.addEventListener("orientationchange", ajustarAlturaReal);

  document.addEventListener("DOMContentLoaded", render);

  // Exponer utilidades internas para testing automatizado
  window.__motorTest = { render: () => render(), get indice() { return indice; } };
})();
