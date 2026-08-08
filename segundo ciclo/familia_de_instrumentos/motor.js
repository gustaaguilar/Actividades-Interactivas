/* ============================================================
   Familia de Instrumentos - Segundo Ciclo
   motor.js — Lógica del paquete
   ============================================================ */

const estado = {
  tandaActual: 0,
  colocados: {},      // id -> true cuando ya se ubicó bien en la tanda actual
  instrSeleccionado: null,
  memoIndex: 0,
  sopaIndex: 0,
  puzzleIndex: 0,
  aciertos: 0,
  errores: 0,
};

const ORDEN_FAMILIAS = ["cuerda", "percusion", "viento"];

/* ---------- utilidades de audio ---------- */
let audioActual = null;

function reproducir(src, cb, maxMs) {
  if (audioActual) {
    audioActual.pause();
    audioActual.onended = null;
    audioActual.onerror = null;
  }
  const a = new Audio(src);
  audioActual = a;
  a.onended = cb || null;
  a.onerror = () => { if (cb) cb(); };
  a.play().catch(() => { if (cb) cb(); });
  if (maxMs) {
    setTimeout(() => {
      if (audioActual === a && !a.paused) {
        a.pause();
        a.onended = null;
        a.onerror = null;
        if (cb) cb();
      }
    }, maxMs);
  }
  return a;
}

function mezclar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.remove("activa"));
  document.getElementById(id).classList.add("activa");
}

function porId(id) {
  return INSTRUMENTOS.find(i => i.id === id);
}

function precargarImagenes() {
  INSTRUMENTOS.forEach(i => { const img = new Image(); img.src = i.img; });
  PUZZLES.forEach(p => { const img = new Image(); img.src = p.img; });
}

/* ============================================================
   PORTADA
   ============================================================ */
function initPortada() {
  document.getElementById("btn-comenzar").addEventListener("click", iniciarConsignaInicial);
  document.querySelectorAll(".foto-perfil-wrap").forEach(el => el.addEventListener("click", abrirLightbox));
  document.getElementById("lightbox-cerrar").addEventListener("click", cerrarLightbox);
  reproducir(NARRACION.bienvenida);
}
function abrirLightbox() { document.getElementById("lightbox").classList.add("activo"); }
function cerrarLightbox() {
  document.getElementById("lightbox").classList.remove("activo");
  if (audioActual) audioActual.pause();
}

/* ============================================================
   CONSIGNA INICIAL
   ============================================================ */
function iniciarConsignaInicial() {
  mostrarPantalla("pantalla-consigna");
  document.getElementById("ej-cuerda").src = porId("violin").img;
  document.getElementById("ej-percusion").src = porId("bombo").img;
  document.getElementById("ej-viento").src = porId("trompeta").img;
  reproducir(NARRACION.consigna_inicio);
  document.getElementById("btn-empezar-clasificar").addEventListener("click", () => {
    iniciarTanda(0);
  }, { once: true });
}

/* ============================================================
   CLASIFICAR (3 tandas)
   ============================================================ */
function iniciarTanda(n) {
  estado.tandaActual = n;
  estado.ordenTanda = mezclar(TANDAS_CLASIFICAR[n]);
  estado.colocados = {};
  estado.instrSeleccionado = null;
  mostrarPantalla("pantalla-clasificar");
  renderTanda();
  if (n === 0) reproducir(NARRACION.consigna_clasificar);
}

function renderTanda() {
  const ids = estado.ordenTanda;
  const cont = document.getElementById("clasificar-contenido");

  const bandeja = ids.map(id => {
    const inst = porId(id);
    const colocado = estado.colocados[id];
    return `<button class="ficha-instrumento ${colocado ? "colocada" : ""}" data-id="${id}" ${colocado ? "disabled" : ""}>
      <img src="${inst.img}" alt="${inst.nombre}" />
      <span>${inst.nombre}</span>
    </button>`;
  }).join("");

  const columnas = ORDEN_FAMILIAS.map(fam => `
    <div class="columna-familia" data-familia="${fam}" style="border-color:${FAMILIAS[fam].color}">
      <h4 style="color:${FAMILIAS[fam].color}">${FAMILIAS[fam].nombre}</h4>
      <div class="slots-familia" id="slots-${fam}"></div>
    </div>
  `).join("");

  cont.innerHTML = `
    <div class="progreso">Grupo ${estado.tandaActual + 1} de ${TANDAS_CLASIFICAR.length}</div>
    <div class="bandeja-instrumentos">${bandeja}</div>
    <div class="columnas-familias">${columnas}</div>
  `;

  // repoblar slots con lo ya colocado
  ids.forEach(id => {
    if (estado.colocados[id]) agregarChipColocado(id);
  });

  document.querySelectorAll(".ficha-instrumento").forEach(btn => {
    btn.addEventListener("click", () => seleccionarInstrumento(btn));
  });
  document.querySelectorAll(".columna-familia").forEach(col => {
    col.addEventListener("click", () => intentarColocar(col.dataset.familia));
  });
}

function agregarChipColocado(id) {
  const inst = porId(id);
  const slots = document.getElementById(`slots-${inst.familia}`);
  if (!slots) return;
  const chip = document.createElement("div");
  chip.className = "chip-colocado";
  chip.innerHTML = `<img src="${inst.img}" alt="${inst.nombre}" /><span>${inst.nombre}</span>`;
  slots.appendChild(chip);
}

function seleccionarInstrumento(btn) {
  if (btn.disabled) return;
  document.querySelectorAll(".ficha-instrumento").forEach(b => b.classList.remove("seleccionada"));
  btn.classList.add("seleccionada");
  estado.instrSeleccionado = btn.dataset.id;
  const inst = porId(btn.dataset.id);
  reproducir(inst.audioNombre, () => {
    reproducir(inst.sfx);
  });
}

function intentarColocar(familia) {
  if (!estado.instrSeleccionado) return;
  const inst = porId(estado.instrSeleccionado);
  const correcta = inst.familia === familia;

  if (correcta) {
    estado.aciertos++;
    estado.colocados[inst.id] = true;
    estado.instrSeleccionado = null;
    renderTanda(); // la ficha aparece en su columna de inmediato
    const audioAcierto = NARRACION["acierto_" + familia];
    reproducir(audioAcierto, () => {
      verificarTandaCompleta();
    });
  } else {
    estado.errores++;
    reproducir(NARRACION.error);
  }
}

function verificarTandaCompleta() {
  const ids = TANDAS_CLASIFICAR[estado.tandaActual];
  const completa = ids.every(id => estado.colocados[id]);
  if (completa) {
    setTimeout(() => {
      if (estado.tandaActual + 1 < TANDAS_CLASIFICAR.length) {
        iniciarTanda(estado.tandaActual + 1);
      } else {
        iniciarMemojuego(0);
      }
    }, 600);
  }
}

/* ============================================================
   MEMOJUEGOS (uno por familia)
   ============================================================ */
let memoEstado = null;

function iniciarMemojuego(idxFamilia) {
  estado.memoIndex = idxFamilia;
  const familia = ORDEN_FAMILIAS[idxFamilia];
  mostrarPantalla("pantalla-memo");

  const instrumentos = INSTRUMENTOS.filter(i => i.familia === familia);
  const cartas = mezclar([...instrumentos, ...instrumentos]);
  memoEstado = { familia, cartas, primeraCarta: null, bloqueado: false, paresEncontrados: 0 };

  const titulo = document.getElementById("memo-titulo");
  titulo.textContent = "Memojuego: " + FAMILIAS[familia].nombre;
  titulo.style.color = FAMILIAS[familia].color;

  const tablero = document.getElementById("tablero-memo");
  tablero.innerHTML = "";
  cartas.forEach((inst, idx) => {
    const carta = document.createElement("div");
    carta.className = "carta-memo";
    carta.dataset.idx = idx;
    carta.dataset.instId = inst.id;
    carta.innerHTML = `
      <div class="carta-cara carta-dorso">🎵</div>
      <div class="carta-cara carta-frente"><img src="${inst.img}" alt="${inst.nombre}" /></div>
    `;
    carta.addEventListener("click", () => manejarClickMemo(carta, inst));
    tablero.appendChild(carta);
  });

  reproducir(NARRACION["consigna_memo_" + familia]);
}

function manejarClickMemo(carta, inst) {
  if (memoEstado.bloqueado) return;
  if (carta.classList.contains("volteada") || carta.classList.contains("emparejada")) return;

  carta.classList.add("volteada");
  reproducir(inst.sfx);

  if (!memoEstado.primeraCarta) {
    memoEstado.primeraCarta = carta;
    return;
  }
  const primera = memoEstado.primeraCarta;
  memoEstado.primeraCarta = null;

  if (primera.dataset.instId === carta.dataset.instId && primera !== carta) {
    primera.classList.add("emparejada");
    carta.classList.add("emparejada");
    estado.aciertos++;
    memoEstado.paresEncontrados++;

    const total = memoEstado.cartas.length / 2;
    if (memoEstado.paresEncontrados >= total) {
      setTimeout(() => {
        if (estado.memoIndex + 1 < ORDEN_FAMILIAS.length) {
          iniciarMemojuego(estado.memoIndex + 1);
        } else {
          iniciarSopa(0);
        }
      }, 1200);
    }
  } else {
    estado.errores++;
    memoEstado.bloqueado = true;
    setTimeout(() => {
      primera.classList.remove("volteada");
      carta.classList.remove("volteada");
      memoEstado.bloqueado = false;
    }, 900);
  }
}

/* ============================================================
   SOPA DE LETRAS (una por familia)
   ============================================================ */
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let sopaEstado = null;

function generarSopa(palabras, tam) {
  const grid = Array.from({ length: tam }, () => Array(tam).fill(null));
  const direcciones = [[0,1],[1,0],[1,1]]; // solo hacia la derecha, hacia abajo, o diagonal abajo-derecha
  const ubicadas = [];

  const ordenadas = palabras.slice().sort((a,b) => b.length - a.length);

  ordenadas.forEach(palabra => {
    let colocada = false;
    let intentos = 0;
    while (!colocada && intentos < 200) {
      intentos++;
      const [dr, dc] = direcciones[Math.floor(Math.random()*direcciones.length)];
      const fila = Math.floor(Math.random()*tam);
      const col = Math.floor(Math.random()*tam);
      const filaFin = fila + dr*(palabra.length-1);
      const colFin = col + dc*(palabra.length-1);
      if (filaFin < 0 || filaFin >= tam || colFin < 0 || colFin >= tam) continue;

      let cabe = true;
      for (let k = 0; k < palabra.length; k++) {
        const r = fila + dr*k, c = col + dc*k;
        const actual = grid[r][c];
        if (actual !== null && actual !== palabra[k]) { cabe = false; break; }
      }
      if (!cabe) continue;

      for (let k = 0; k < palabra.length; k++) {
        const r = fila + dr*k, c = col + dc*k;
        grid[r][c] = palabra[k];
      }
      ubicadas.push({ palabra, fila, col, dr, dc });
      colocada = true;
    }
  });

  for (let r = 0; r < tam; r++) {
    for (let c = 0; c < tam; c++) {
      if (!grid[r][c]) grid[r][c] = ABC[Math.floor(Math.random()*ABC.length)];
    }
  }
  return { grid, ubicadas };
}

function iniciarSopa(idxFamilia) {
  estado.sopaIndex = idxFamilia;
  const familia = ORDEN_FAMILIAS[idxFamilia];
  mostrarPantalla("pantalla-sopa");

  const palabras = SOPAS[familia];
  const tam = 12;
  const { grid, ubicadas } = generarSopa(palabras, tam);
  sopaEstado = { familia, ubicadas, encontradas: new Set(), celdaInicio: null, avanzada: false };

  const titulo = document.getElementById("sopa-titulo");
  titulo.textContent = "Sopa de letras: " + FAMILIAS[familia].nombre;
  titulo.style.color = FAMILIAS[familia].color;

  const listaEl = document.getElementById("sopa-lista");
  listaEl.innerHTML = palabras.map(p => `<span class="palabra-sopa" data-palabra="${p}">${p}</span>`).join(" ");
  document.getElementById("sopa-imagen-encontrado").innerHTML = "";

  const tablero = document.getElementById("tablero-sopa");
  tablero.innerHTML = "";
  tablero.style.setProperty("--tam", tam);
  for (let r = 0; r < tam; r++) {
    for (let c = 0; c < tam; c++) {
      const celda = document.createElement("div");
      celda.className = "celda-sopa";
      celda.textContent = grid[r][c];
      celda.dataset.r = r;
      celda.dataset.c = c;
      celda.addEventListener("click", () => manejarClickSopa(celda));
      tablero.appendChild(celda);
    }
  }

  reproducir(NARRACION["consigna_sopa_" + familia]);
}

function manejarClickSopa(celda) {
  // cualquier toque de letra corta el audio del instrumento que estuviera sonando
  if (audioActual) { audioActual.pause(); }

  if (!sopaEstado.celdaInicio) {
    sopaEstado.celdaInicio = celda;
    celda.classList.add("celda-inicio");
    return;
  }
  const r1 = parseInt(sopaEstado.celdaInicio.dataset.r), c1 = parseInt(sopaEstado.celdaInicio.dataset.c);
  const r2 = parseInt(celda.dataset.r), c2 = parseInt(celda.dataset.c);
  sopaEstado.celdaInicio.classList.remove("celda-inicio");

  const match = sopaEstado.ubicadas.find(u => {
    const rf = u.fila + u.dr*(u.palabra.length-1);
    const cf = u.col + u.dc*(u.palabra.length-1);
    return (u.fila === r1 && u.col === c1 && rf === r2 && cf === c2) ||
           (u.fila === r2 && u.col === c2 && rf === r1 && cf === c1);
  });

  if (match && !sopaEstado.encontradas.has(match.palabra)) {
    sopaEstado.encontradas.add(match.palabra);
    for (let k = 0; k < match.palabra.length; k++) {
      const r = match.fila + match.dr*k, c = match.col + match.dc*k;
      const cel = document.querySelector(`.celda-sopa[data-r="${r}"][data-c="${c}"]`);
      if (cel) cel.classList.add("celda-encontrada");
    }
    const chip = document.querySelector(`.palabra-sopa[data-palabra="${match.palabra}"]`);
    if (chip) chip.classList.add("palabra-encontrada");
    estado.aciertos++;

    const instId = PALABRA_A_INSTRUMENTO[match.palabra];
    if (instId) {
      const inst = porId(instId);
      const cajaImg = document.getElementById("sopa-imagen-encontrado");
      cajaImg.innerHTML = `<img src="${inst.img}" alt="${inst.nombre}" />`;
      reproducir(inst.audioNombre, () => {
        reproducir(inst.sfx, () => intentarAvanzarSopa(), 4000);
      });
      setTimeout(intentarAvanzarSopa, 6000); // resguardo por si el audio se corta antes de tiempo
    } else {
      intentarAvanzarSopa();
    }
  }
  sopaEstado.celdaInicio = null;
}

function intentarAvanzarSopa() {
  if (sopaEstado.avanzada) return;
  if (sopaEstado.encontradas.size >= sopaEstado.ubicadas.length) {
    sopaEstado.avanzada = true;
    if (estado.sopaIndex + 1 < ORDEN_FAMILIAS.length) {
      iniciarSopa(estado.sopaIndex + 1);
    } else {
      iniciarPuzzles();
    }
  }
}

/* ============================================================
   PUZZLES (6: 2 por familia)
   ============================================================ */
let piezaSeleccionada = null;

function iniciarPuzzles() {
  estado.puzzleIndex = 0;
  mostrarPantalla("pantalla-puzzle");
  renderPuzzle();
}

function renderPuzzle() {
  if (estado.puzzleIndex >= PUZZLES.length) {
    iniciarPuzzlesTexto();
    return;
  }
  const p = PUZZLES[estado.puzzleIndex];
  const inst = porId(p.instrumentoId);
  const color = FAMILIAS[inst.familia].color;

  const cont = document.getElementById("puzzle-contenido");
  cont.innerHTML = `
    <div class="progreso">Rompecabezas ${estado.puzzleIndex + 1} de ${PUZZLES.length}</div>
    <h3 style="color:${color}">${FAMILIAS[inst.familia].nombre}: ${inst.nombre}</h3>
    <button class="btn-escuchar" id="btn-escuchar-puzzle">🔊 Escuchar sonido</button>
    <div id="puzzle-carga" style="padding:40px; color:#888;">Cargando imagen…</div>
    <div class="tablero-puzzle" id="tablero-puzzle" style="--cols:${CONFIG.puzzleColumnas};--filas:${CONFIG.puzzleFilas}; display:none;"></div>
  `;

  document.getElementById("btn-escuchar-puzzle").addEventListener("click", () => {
    reproducir(inst.sfx, null, 4000);
  });

  reproducir(NARRACION["consigna_puzzle_" + inst.familia], null, 4000);

  // esperar a que la imagen esté realmente lista antes de armar las piezas (evita el "cuadro gris")
  const loader = new Image();
  loader.onload = () => construirPiezas(p, inst);
  loader.onerror = () => construirPiezas(p, inst); // igual construye; el navegador reintentará el recurso
  loader.src = p.img;
  if (loader.complete) construirPiezas(p, inst);
}

function construirPiezas(p, inst) {
  const filas = CONFIG.puzzleFilas, cols = CONFIG.puzzleColumnas, total = filas*cols;
  const cargaEl = document.getElementById("puzzle-carga");
  const tablero = document.getElementById("tablero-puzzle");
  if (!tablero || tablero.dataset.armado) return; // evita doble armado si onload+complete disparan ambos
  tablero.dataset.armado = "1";
  if (cargaEl) cargaEl.style.display = "none";
  tablero.style.display = "grid";

  const posiciones = mezclar([...Array(total).keys()]);
  piezaSeleccionada = null;

  posiciones.forEach((piezaIdx, slotIdx) => {
    const pieza = document.createElement("div");
    pieza.className = "pieza-puzzle";
    pieza.dataset.piezaIdx = piezaIdx;
    pieza.dataset.slotIdx = slotIdx;
    const col = piezaIdx % cols, row = Math.floor(piezaIdx / cols);
    pieza.style.backgroundImage = `url('${p.img}')`;
    pieza.style.backgroundSize = `${cols*100}% ${filas*100}%`;
    pieza.style.backgroundPosition = `${(col*100)/(cols-1)}% ${(row*100)/(filas-1)}%`;
    pieza.addEventListener("click", () => seleccionarPieza(pieza, inst));
    tablero.appendChild(pieza);
  });
}

function seleccionarPieza(pieza, inst) {
  if (!piezaSeleccionada) { piezaSeleccionada = pieza; pieza.classList.add("seleccionada"); return; }
  if (piezaSeleccionada === pieza) { pieza.classList.remove("seleccionada"); piezaSeleccionada = null; return; }

  const slotA = piezaSeleccionada.dataset.slotIdx, slotB = pieza.dataset.slotIdx;
  piezaSeleccionada.dataset.slotIdx = slotB;
  pieza.dataset.slotIdx = slotA;

  const tablero = document.getElementById("tablero-puzzle");
  Array.from(tablero.children).sort((a,b) => a.dataset.slotIdx - b.dataset.slotIdx).forEach(p => tablero.appendChild(p));

  piezaSeleccionada.classList.remove("seleccionada");
  piezaSeleccionada = null;
  verificarPuzzleCompleto(inst);
}

function verificarPuzzleCompleto(inst) {
  const tablero = document.getElementById("tablero-puzzle");
  const piezas = Array.from(tablero.children);
  const completo = piezas.every(p => p.dataset.piezaIdx === p.dataset.slotIdx);
  if (completo) {
    estado.aciertos++;
    reproducir(inst.audioNombre, () => {
      reproducir(inst.sfx, () => {
        estado.puzzleIndex++;
        renderPuzzle();
      }, 7000);
    });
  }
}

/* ============================================================
   PUZZLES DE TEXTO (6: 2 por familia)
   ============================================================ */
function iniciarPuzzlesTexto() {
  estado.puzzleTextoIndex = 0;
  mostrarPantalla("pantalla-puzzle-texto");
  renderPuzzleTexto();
}

function mezclarLetras(palabra) {
  let letras;
  do {
    letras = mezclar(palabra.split(""));
  } while (letras.join("") === palabra && palabra.length > 1);
  return letras;
}

function renderPuzzleTexto() {
  if (estado.puzzleTextoIndex >= PUZZLES_TEXTO.length) {
    mostrarCierre();
    return;
  }
  const pt = PUZZLES_TEXTO[estado.puzzleTextoIndex];
  const inst = porId(pt.instrumentoId);
  const color = FAMILIAS[inst.familia].color;
  const letras = mezclarLetras(pt.palabra);
  const progreso = new Array(pt.palabra.length).fill(null);

  const cont = document.getElementById("puzzle-texto-contenido");
  cont.innerHTML = `
    <div class="progreso">Puzzle de texto ${estado.puzzleTextoIndex + 1} de ${PUZZLES_TEXTO.length}</div>
    <h3 style="color:${color}">${FAMILIAS[inst.familia].nombre}</h3>
    <img src="${inst.img}" class="img-puzzle-texto" alt="${inst.nombre}" />
    <div class="slots-palabra" id="slots-palabra"></div>
    <div class="letras-disponibles" id="letras-disponibles"></div>
  `;

  reproducir(NARRACION["consigna_puzzletexto_" + inst.familia], null, 4000);

  const slotsEl = document.getElementById("slots-palabra");
  const letrasEl = document.getElementById("letras-disponibles");

  function renderSlots() {
    slotsEl.innerHTML = progreso.map(l => `<div class="slot-letra">${l || ""}</div>`).join("");
  }
  renderSlots();

  letras.forEach((letra, idx) => {
    const tile = document.createElement("button");
    tile.className = "tile-letra";
    tile.textContent = letra;
    tile.dataset.idx = idx;
    tile.addEventListener("click", () => {
      if (tile.disabled) return;
      const siguienteIdx = progreso.findIndex(x => x === null);
      if (siguienteIdx === -1) return;
      if (letra === pt.palabra[siguienteIdx]) {
        progreso[siguienteIdx] = letra;
        tile.disabled = true;
        tile.classList.add("usada");
        renderSlots();
        if (progreso.every(x => x !== null)) {
          estado.aciertos++;
          reproducir(inst.audioNombre, () => {
            reproducir(inst.sfx, () => {
              estado.puzzleTextoIndex++;
              renderPuzzleTexto();
            }, 7000);
          });
        }
      } else {
        estado.errores++;
        tile.classList.add("shake-tile");
        setTimeout(() => tile.classList.remove("shake-tile"), 300);
      }
    });
    letrasEl.appendChild(tile);
  });
}

/* ============================================================
   CIERRE
   ============================================================ */
function mostrarCierre() {
  mostrarPantalla("pantalla-cierre");
  const total = estado.aciertos + estado.errores;
  const porcentaje = total > 0 ? Math.round((estado.aciertos/total)*100) : 100;
  document.getElementById("resultado-aciertos").textContent = estado.aciertos;
  document.getElementById("resultado-errores").textContent = estado.errores;
  document.getElementById("resultado-porcentaje").textContent = porcentaje + "%";

  let audioCierre;
  if (porcentaje >= 80) audioCierre = NARRACION.cierre_excelente;
  else if (porcentaje >= 50) audioCierre = NARRACION.cierre_bien;
  else audioCierre = NARRACION.cierre_practicar;
  reproducir(audioCierre);

  document.getElementById("btn-reiniciar").addEventListener("click", () => {
    estado.aciertos = 0; estado.errores = 0;
    mostrarPantalla("pantalla-portada");
  }, { once: true });
}

/* ---------- arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  precargarImagenes();
  initPortada();
});
