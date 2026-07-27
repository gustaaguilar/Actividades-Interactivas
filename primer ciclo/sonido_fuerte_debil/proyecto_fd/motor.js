/* ============================================================
   Sonido Fuerte / Sonido Débil - Primer Ciclo
   motor.js — Lógica del paquete
   ============================================================ */

const estado = {
  indiceClasificar: 0,
  indicePuzzle: 0,
  aciertos: 0,
  errores: 0,
  ordenClasificar: [],
  puzzles: [],
};

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

/* ---------- utilidades varias ---------- */
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

/* ============================================================
   PORTADA
   ============================================================ */
function initPortada() {
  document.getElementById("btn-comenzar").addEventListener("click", () => {
    iniciarConsignaInicial();
  });

  document.querySelector(".foto-perfil-wrap").addEventListener("click", abrirLightbox);
  const fotoCierre = document.getElementById("cierre-foto-perfil");
  if (fotoCierre) fotoCierre.addEventListener("click", abrirLightbox);
  document.getElementById("lightbox-cerrar").addEventListener("click", cerrarLightbox);

  reproducir(NARRACION.bienvenida);
}

function abrirLightbox() {
  document.getElementById("lightbox").classList.add("activo");
}
function cerrarLightbox() {
  document.getElementById("lightbox").classList.remove("activo");
  if (audioActual) audioActual.pause();
}

/* ============================================================
   CONSIGNA INICIAL (con ilustración fija, sin audio de ejemplo suelto)
   ============================================================ */
function iniciarConsignaInicial() {
  mostrarPantalla("pantalla-consigna");

  const debilEj = ESCENAS.find(e => e.id === EJEMPLO_ILUSTRACION.debil);
  const fuerteEj = ESCENAS.find(e => e.id === EJEMPLO_ILUSTRACION.fuerte);

  document.getElementById("ilustracion-debil").src = debilEj.img;
  document.getElementById("ilustracion-fuerte").src = fuerteEj.img;

  reproducir(NARRACION.consigna_inicio);

  document.getElementById("btn-empezar-clasificar").addEventListener("click", () => {
    iniciarClasificar();
  }, { once: true });
}

/* ============================================================
   CLASIFICAR (12 escenas)
   ============================================================ */
function iniciarClasificar() {
  estado.ordenClasificar = mezclar(ESCENAS.map(e => e.id));
  estado.indiceClasificar = 0;
  mostrarPantalla("pantalla-clasificar");
  reproducir(NARRACION.consigna_clasificar, () => renderClasificar());
}

function renderClasificar() {
  if (estado.indiceClasificar >= estado.ordenClasificar.length) {
    iniciarMemojuego("debil");
    return;
  }
  const id = estado.ordenClasificar[estado.indiceClasificar];
  const escena = ESCENAS.find(e => e.id === id);

  const cont = document.getElementById("clasificar-contenido");
  cont.innerHTML = `
    <div class="progreso">Imagen ${estado.indiceClasificar + 1} de ${estado.ordenClasificar.length}</div>
    <div class="tarjeta-clasificar">
      <img src="${escena.img}" alt="${escena.nombre}" class="img-clasificar" id="img-actual" />
      <div class="opciones-color">
        <div class="opcion">
          <button class="circulo circulo-debil" data-tipo="debil" aria-label="Sonido débil"></button>
          <span class="etiqueta-opcion" style="color:var(--color-debil)">Débil</span>
        </div>
        <div class="opcion">
          <button class="circulo circulo-fuerte" data-tipo="fuerte" aria-label="Sonido fuerte"></button>
          <span class="etiqueta-opcion" style="color:var(--color-fuerte)">Fuerte</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById("img-actual").addEventListener("click", () => {
    reproducir(escena.sfx);
  });

  document.querySelectorAll(".circulo").forEach(btn => {
    btn.addEventListener("click", () => manejarRespuestaClasificar(btn, escena));
  });

  reproducir(escena.sfx);
}

function manejarRespuestaClasificar(btn, escena) {
  const correcta = btn.dataset.tipo === escena.tipo;
  if (correcta) {
    estado.aciertos++;
    btn.classList.add("correcto");
    const audioAcierto = escena.tipo === "debil" ? NARRACION.acierto_debil : NARRACION.acierto_fuerte;
    // acierto específico (ej. "Muy bien, es sonido fuerte") -> nombre descriptivo -> siguiente
    reproducir(audioAcierto, () => {
      reproducir(escena.audioNombre, () => {
        estado.indiceClasificar++;
        renderClasificar();
      });
    });
  } else {
    estado.errores++;
    btn.classList.add("incorrecto");
    reproducir(NARRACION.error, () => {
      btn.classList.remove("incorrecto");
    });
  }
}

/* ============================================================
   MEMOJUEGO (uno para débiles, otro para fuertes)
   ============================================================ */
let memoEstado = null;

function iniciarMemojuego(tipo) {
  mostrarPantalla("pantalla-memo");
  const escenasTipo = ESCENAS.filter(e => e.tipo === tipo);
  const cartas = mezclar([...escenasTipo, ...escenasTipo]);

  memoEstado = { tipo, cartas, primeraCarta: null, bloqueado: false, paresEncontrados: 0 };

  const titulo = document.getElementById("memo-titulo");
  titulo.textContent = tipo === "debil" ? "Memojuego: Sonidos Débiles" : "Memojuego: Sonidos Fuertes";
  titulo.style.color = tipo === "debil" ? "var(--color-debil)" : "var(--color-fuerte)";

  const tablero = document.getElementById("tablero-memo");
  tablero.innerHTML = "";
  cartas.forEach((escena, idx) => {
    const carta = document.createElement("div");
    carta.className = "carta-memo";
    carta.dataset.idx = idx;
    carta.dataset.escenaId = escena.id;
    carta.innerHTML = `
      <div class="carta-cara carta-dorso">❓</div>
      <div class="carta-cara carta-frente">
        <img src="${escena.img}" alt="${escena.nombre}" />
      </div>
    `;
    carta.addEventListener("click", () => manejarClickMemo(carta, escena));
    tablero.appendChild(carta);
  });

  reproducir(tipo === "debil" ? NARRACION.consigna_memo_debil : NARRACION.consigna_memo_fuerte);
}

function manejarClickMemo(carta, escena) {
  if (memoEstado.bloqueado) return;
  if (carta.classList.contains("volteada") || carta.classList.contains("emparejada")) return;

  carta.classList.add("volteada");
  reproducir(escena.sfx);

  if (!memoEstado.primeraCarta) {
    memoEstado.primeraCarta = carta;
    return;
  }

  const primera = memoEstado.primeraCarta;
  memoEstado.primeraCarta = null;

  if (primera.dataset.escenaId === carta.dataset.escenaId && primera !== carta) {
    primera.classList.add("emparejada");
    carta.classList.add("emparejada");
    estado.aciertos++;
    memoEstado.paresEncontrados++;
    // se deja sonar el efecto de la imagen (ya sonando desde el click) hasta que se toque la próxima carta

    const totalPares = memoEstado.cartas.length / 2;
    if (memoEstado.paresEncontrados >= totalPares) {
      setTimeout(() => {
        if (memoEstado.tipo === "debil") {
          iniciarMemojuego("fuerte");
        } else {
          iniciarPuzzles();
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
   PUZZLES DOBLES (4: 2 débiles + 2 fuertes)
   ============================================================ */
function iniciarPuzzles() {
  estado.puzzles = mezclar(PUZZLES_IDS);
  estado.indicePuzzle = 0;
  mostrarPantalla("pantalla-puzzle");
  renderPuzzle();
}

let piezaSeleccionada = null;

function renderPuzzle() {
  if (estado.indicePuzzle >= estado.puzzles.length) {
    mostrarCierre();
    return;
  }
  const id = estado.puzzles[estado.indicePuzzle];
  const escena = ESCENAS.find(e => e.id === id);
  const filas = CONFIG.puzzleFilas;
  const cols = CONFIG.puzzleColumnas;
  const total = filas * cols;

  const cont = document.getElementById("puzzle-contenido");
  const colorTipo = escena.tipo === "debil" ? "var(--color-debil)" : "var(--color-fuerte)";
  const etiquetaTipo = escena.tipo === "debil" ? "Débil" : "Fuerte";

  cont.innerHTML = `
    <div class="progreso">Rompecabezas ${estado.indicePuzzle + 1} de ${estado.puzzles.length}</div>
    <h3 style="color:${colorTipo}">Armá el rompecabezas de sonido ${etiquetaTipo}</h3>
    <button class="btn-escuchar" id="btn-escuchar-puzzle">🔊 Escuchar sonido</button>
    <div class="tablero-puzzle" id="tablero-puzzle" style="--cols:${cols}; --filas:${filas};"></div>
  `;

  document.getElementById("btn-escuchar-puzzle").addEventListener("click", () => {
    reproducir(escena.sfx, null, 3000);
  });

  // consigna hablada según tipo (tope 3s por las dudas de que el mp3 sea más largo)
  const consignaAudio = escena.tipo === "debil" ? NARRACION.consigna_puzzle_debil : NARRACION.consigna_puzzle_fuerte;
  reproducir(consignaAudio, null, 3000);

  const tablero = document.getElementById("tablero-puzzle");
  const posiciones = mezclar([...Array(total).keys()]);
  piezaSeleccionada = null;

  posiciones.forEach((piezaIdx, slotIdx) => {
    const pieza = document.createElement("div");
    pieza.className = "pieza-puzzle";
    pieza.dataset.piezaIdx = piezaIdx;
    pieza.dataset.slotIdx = slotIdx;
    const col = piezaIdx % cols;
    const row = Math.floor(piezaIdx / cols);
    pieza.style.backgroundImage = `url('${escena.img}')`;
    pieza.style.backgroundSize = `${cols * 100}% ${filas * 100}%`;
    pieza.style.backgroundPosition = `${(col * 100) / (cols - 1)}% ${(row * 100) / (filas - 1)}%`;
    pieza.addEventListener("click", () => seleccionarPieza(pieza, escena));
    tablero.appendChild(pieza);
  });
}

function seleccionarPieza(pieza, escena) {
  if (!piezaSeleccionada) {
    piezaSeleccionada = pieza;
    pieza.classList.add("seleccionada");
    return;
  }
  if (piezaSeleccionada === pieza) {
    pieza.classList.remove("seleccionada");
    piezaSeleccionada = null;
    return;
  }
  const slotA = piezaSeleccionada.dataset.slotIdx;
  const slotB = pieza.dataset.slotIdx;
  piezaSeleccionada.dataset.slotIdx = slotB;
  pieza.dataset.slotIdx = slotA;

  const tablero = document.getElementById("tablero-puzzle");
  const piezas = Array.from(tablero.children);
  piezas.sort((a, b) => a.dataset.slotIdx - b.dataset.slotIdx)
        .forEach(p => tablero.appendChild(p));

  piezaSeleccionada.classList.remove("seleccionada");
  piezaSeleccionada = null;

  verificarPuzzleCompleto(escena);
}

function verificarPuzzleCompleto(escena) {
  const tablero = document.getElementById("tablero-puzzle");
  const piezas = Array.from(tablero.children);
  const completo = piezas.every(p => p.dataset.piezaIdx === p.dataset.slotIdx);
  if (completo) {
    estado.aciertos++;
    reproducir(NARRACION.acierto, () => {
      reproducir(escena.sfx, () => {
        estado.indicePuzzle++;
        renderPuzzle();
      }, 3000);
    });
  }
}

/* ============================================================
   CIERRE
   ============================================================ */
function mostrarCierre() {
  mostrarPantalla("pantalla-cierre");
  const total = estado.aciertos + estado.errores;
  const porcentaje = total > 0 ? Math.round((estado.aciertos / total) * 100) : 100;

  document.getElementById("resultado-aciertos").textContent = estado.aciertos;
  document.getElementById("resultado-errores").textContent = estado.errores;
  document.getElementById("resultado-porcentaje").textContent = porcentaje + "%";

  let audioCierre;
  if (porcentaje >= 80) audioCierre = NARRACION.cierre_excelente;
  else if (porcentaje >= 50) audioCierre = NARRACION.cierre_bien;
  else audioCierre = NARRACION.cierre_practicar;

  reproducir(audioCierre);

  document.getElementById("btn-reiniciar").addEventListener("click", () => {
    estado.aciertos = 0;
    estado.errores = 0;
    mostrarPantalla("pantalla-portada");
  }, { once: true });
}

/* ---------- precarga de imágenes (evita que no carguen en el primer render) ---------- */
function precargarImagenes() {
  ESCENAS.forEach(e => {
    const img = new Image();
    img.src = e.img;
  });
}

/* ---------- arranque ---------- */
document.addEventListener("DOMContentLoaded", () => {
  precargarImagenes();
  initPortada();
});
