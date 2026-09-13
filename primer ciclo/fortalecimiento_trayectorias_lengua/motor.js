/* ============================================================
   MOTOR - Fortalecimiento de Trayectorias
   ============================================================ */

// Puntero de trazado: lápiz diagonal (apuntando abajo-a-la-derecha, como si estuviera
// escribiendo). La punta de grafito queda exactamente en la esquina (100,100) del viewBox,
// calculada con geometría de rotación exacta (no aproximación visual), para poder anclarla
// con precisión milimétrica vía CSS transform:translate(-100%,-100%) — mismo principio que
// usamos para la manito (evitar que el ancla dependa de "a ojo").
const SVG_LAPIZ = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="24.34,37.06 35.64,48.36 48.36,35.64 37.06,24.34" fill="#f472b6" stroke="#c23b8f" stroke-width="1.5" stroke-linejoin="round"/>
  <circle cx="30.7" cy="30.7" r="9" fill="#f472b6" stroke="#c23b8f" stroke-width="1.5"/>
  <polygon points="35.64,48.36 44.14,56.86 56.86,44.14 48.36,35.64" fill="#cfd4da" stroke="#9199a3" stroke-width="1.5" stroke-linejoin="round"/>
  <line x1="38.2" y1="45.9" x2="45.9" y2="38.2" stroke="#9199a3" stroke-width="1.3"/>
  <line x1="41.4" y1="49.1" x2="49.1" y2="41.4" stroke="#9199a3" stroke-width="1.3"/>
  <polygon points="44.14,56.86 80.91,93.63 93.63,80.91 56.86,44.14" fill="#ffb703" stroke="#c98a00" stroke-width="1.5" stroke-linejoin="round"/>
  <polygon points="80.91,93.63 93.64,97.88 97.88,93.64 93.63,80.91" fill="#f5c531" stroke="#c98a00" stroke-width="1.5" stroke-linejoin="round"/>
  <polygon points="93.64,97.88 97.88,93.64 100,100" fill="#2b2b2b"/>
</svg>`;

const COMUN = {
  acierto: "audio/comun_correcto.mp3",
  error: "audio/comun_reintenta.mp3",
  pulsaSiguiente: "audio/comun_pulsa_siguiente.mp3",
  clickFallback: null
};

const EM = {
  idx: 0,
  aciertos: 0,
  errores: 0,
  root: null,
  els: {},
  zoomActivo: false,
  audiosActivos: [],
  tipoLetra: "mayuscula",
  flujo: null
};

// Mapa de sustitución: qué pantalla de trazado (demo/trazo) o repaso usar
// según el tipo de letra elegido en el selector (s01b). Las pantallas de
// identificación/narración/quiz (s09,s10,s11,s13,s14,s16,s17o,s18) no
// dependen de la forma de la letra, así que se comparten en los 3 flujos.
const MAPA_TIPOGRAFIA = {
  mayuscula: { A_DEMO: "s12demo", A_TRAZO: "s12", E_DEMO: "s15demo", E_TRAZO: "s15", I_DEMO: "s16demo", I_TRAZO: "s17", O_DEMO: "s17odemo", O_TRAZO: "s17otrazo", U_DEMO: "s18demo", U_TRAZO: "s19", REPASO: "s20" },
  minuscula: { A_DEMO: "smin_a_demo", A_TRAZO: "smin_a_trazo", E_DEMO: "smin_e_demo", E_TRAZO: "smin_e_trazo", I_DEMO: "smin_i_demo", I_TRAZO: "smin_i_trazo", O_DEMO: "smin_o_demo", O_TRAZO: "smin_o_trazo", U_DEMO: "smin_u_demo", U_TRAZO: "smin_u_trazo", REPASO: "s20min" },
  cursiva: { A_DEMO: "scur_a_demo", A_TRAZO: "scur_a_trazo", E_DEMO: "scur_e_demo", E_TRAZO: "scur_e_trazo", I_DEMO: "scur_i_demo", I_TRAZO: "scur_i_trazo", O_DEMO: "scur_o_demo", O_TRAZO: "scur_o_trazo", U_DEMO: "scur_u_demo", U_TRAZO: "scur_u_trazo", REPASO: "s20cur" },
  cursivaMayuscula: { A_DEMO: "scurmay_a_demo", A_TRAZO: "scurmay_a_trazo", E_DEMO: "scurmay_e_demo", E_TRAZO: "scurmay_e_trazo", I_DEMO: "scurmay_i_demo", I_TRAZO: "scurmay_i_trazo", O_DEMO: "scurmay_o_demo", O_TRAZO: "scurmay_o_trazo", U_DEMO: "scurmay_u_demo", U_TRAZO: "scurmay_u_trazo", REPASO: "s20curmay" }
};

const FLUJO_BASE = [
  "s01", "s01b", "s02", "s03", "s04", "s05", "s06", "s07", "s08",
  "s09", "s10", "s11", "@A_DEMO", "@A_TRAZO",
  "s13", "s14", "@E_DEMO", "@E_TRAZO",
  "s16", "@I_DEMO", "@I_TRAZO",
  "s17o", "@O_DEMO", "@O_TRAZO",
  "s18", "@U_DEMO", "@U_TRAZO",
  "@REPASO",
  // Se sacaron s25 (manzana) y s26 (trazado de números): actividades de
  // números fuera de todos los grupos de letras, a pedido de Gustavo.
  "s21", "s22", "s23", "s24", "s27"
];

function construirFlujo(tipo) {
  const tabla = MAPA_TIPOGRAFIA[tipo] || MAPA_TIPOGRAFIA.mayuscula;
  const porId = {};
  DATOS.pantallas.forEach((p) => { porId[p.id] = p; });
  return FLUJO_BASE.map((id) => {
    const idReal = id.startsWith("@") ? tabla[id.slice(1)] : id;
    const p = porId[idReal];
    if (!p) throw new Error("Pantalla no encontrada en el flujo: " + idReal);
    return p;
  });
}

// Transforma un texto visible según la tipografía elegida: en minúscula o
// cursiva, todo el contenido (títulos, instrucciones, palabras, letras)
// se muestra en minúscula; en mayúscula queda tal cual está escrito en datos.js.
function t(s) {
  if (typeof s !== "string") return s;
  if (EM.tipoLetra === "minuscula" || EM.tipoLetra === "cursiva") return s.toLowerCase();
  if (EM.tipoLetra === "cursivaMayuscula") return s.toUpperCase();
  return s;
}

/* ---------------- utilidades de audio ---------------- */
function pararTodosLosAudios() {
  const activos = EM.audiosActivos.slice();
  EM.audiosActivos = [];
  activos.forEach((entrada) => {
    try { entrada.audio.pause(); } catch (e) { /* noop */ }
    if (entrada.resolver) entrada.resolver();
  });
}

function reproducirAudio(src) {
  return new Promise((resolve) => {
    if (!src) { resolve(); return; }
    const a = new Audio(src);
    let resuelto = false;
    let timeoutId = null;
    const entrada = { audio: a, resolver: null };
    const terminar = () => {
      if (resuelto) return;
      resuelto = true;
      if (timeoutId) clearTimeout(timeoutId);
      const i = EM.audiosActivos.indexOf(entrada);
      if (i !== -1) EM.audiosActivos.splice(i, 1);
      resolve();
    };
    entrada.resolver = terminar;
    EM.audiosActivos.push(entrada);
    a.addEventListener("ended", terminar);
    a.addEventListener("error", terminar);
    // si el archivo de audio todavía no fue generado (desarrollo), no trabar el juego
    timeoutId = setTimeout(terminar, 6000);
    a.play().catch(terminar);
  });
}

function reproducirAudioConProgreso(src, onProgreso) {
  return new Promise((resolve) => {
    if (!src) { resolve(); return; }
    const a = new Audio(src);
    let resuelto = false;
    let raf = null;
    const entrada = { audio: a, resolver: null };
    const terminar = () => {
      if (resuelto) return;
      resuelto = true;
      if (raf) cancelAnimationFrame(raf);
      if (timeoutId) clearTimeout(timeoutId);
      const i = EM.audiosActivos.indexOf(entrada);
      if (i !== -1) EM.audiosActivos.splice(i, 1);
      if (onProgreso) onProgreso(1);
      resolve();
    };
    entrada.resolver = terminar;
    EM.audiosActivos.push(entrada);
    function tick() {
      if (resuelto) return;
      if (a.duration && isFinite(a.duration) && a.duration > 0 && onProgreso) {
        onProgreso(Math.min(1, a.currentTime / a.duration));
      }
      raf = requestAnimationFrame(tick);
    }
    // Respaldo: si el audio no existe o falla, la animación no debe cortarse de golpe.
    // Se anima igual durante una duración fija para que el demo siga siendo útil.
    const DURACION_RESPALDO_MS = 3200;
    function animarConRespaldo() {
      if (resuelto) return;
      const inicioMs = performance.now();
      function pasoRespaldo() {
        if (resuelto) return;
        const prog = Math.min(1, (performance.now() - inicioMs) / DURACION_RESPALDO_MS);
        if (onProgreso) onProgreso(prog);
        if (prog >= 1) { terminar(); return; }
        raf = requestAnimationFrame(pasoRespaldo);
      }
      raf = requestAnimationFrame(pasoRespaldo);
    }
    a.addEventListener("ended", terminar);
    a.addEventListener("error", animarConRespaldo);
    const timeoutId = setTimeout(terminar, 9000);
    a.play().then(() => { raf = requestAnimationFrame(tick); }).catch(animarConRespaldo);
  });
}

async function reproducirSecuencia(lista) {
  for (const src of lista) {
    // eslint-disable-next-line no-await-in-loop
    await reproducirAudio(src);
  }
}

/* ---------------- navegación general ---------------- */
function bloquearSiguiente(bloq) {
  const btn = EM.els.btnSiguiente;
  if (!btn) return;
  btn.disabled = !!bloq;
  btn.classList.toggle("oculto", EM.flujo[EM.idx].tipo === "portada" || EM.flujo[EM.idx].tipo === "cierre");
}

function avanzar() {
  if (EM.idx < EM.flujo.length - 1) {
    EM.idx += 1;
    render(EM.idx);
  }
}

function reiniciarPaquete() {
  EM.idx = 0;
  EM.aciertos = 0;
  EM.errores = 0;
  render(0);
}

function marcarAcierto() { EM.aciertos += 1; }
function marcarError() { EM.errores += 1; }

function actualizarProgreso() {
  const total = EM.flujo.length;
  const pct = Math.round(((EM.idx) / (total - 1)) * 100);
  EM.els.progresoBarra.style.width = pct + "%";
  EM.els.progresoTexto.textContent = `${EM.idx + 1} / ${total}`;
}

/* ---------------- ícono con imagen real + fallback a emoji ---------------- */
function crearIconoEl(imgNombre, emojiFallback, claseImg) {
  const wrap = document.createElement("span");
  wrap.className = "icono-wrap";
  if (imgNombre) {
    const img = document.createElement("img");
    img.src = `assets/images/${imgNombre}.png`;
    img.alt = emojiFallback || imgNombre;
    if (claseImg) img.className = claseImg;
    img.addEventListener("error", () => {
      const span = document.createElement("span");
      span.textContent = emojiFallback || "🖼️";
      if (claseImg) span.className = claseImg;
      if (wrap.contains(img)) wrap.replaceChild(span, img);
    });
    wrap.appendChild(img);
  } else {
    const span = document.createElement("span");
    span.textContent = emojiFallback || "";
    if (claseImg) span.className = claseImg;
    wrap.appendChild(span);
  }
  return wrap;
}

/* ---------------- shuffle ---------------- */
function mezclar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- lightbox foto de perfil ---------------- */
function abrirLightbox() {
  EM.els.lightbox.classList.add("visible");
}
function cerrarLightbox() {
  EM.els.lightbox.classList.remove("visible");
  EM.els.lightboxImg.style.transform = "scale(1)";
  EM.els.lightboxImg.style.transformOrigin = "center center";
  EM.zoomActivo = false;
}
function toggleZoomLightbox(e) {
  const img = EM.els.lightboxImg;
  if (!EM.zoomActivo) {
    const rect = img.getBoundingClientRect();
    const ox = ((e.clientX - rect.left) / rect.width) * 100;
    const oy = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${ox}% ${oy}%`;
    img.style.transform = "scale(2.4)";
    EM.zoomActivo = true;
  } else {
    img.style.transform = "scale(1)";
    EM.zoomActivo = false;
  }
}

function bloqueThumb() {
  const div = document.createElement("div");
  div.className = "thumb-profe";
  div.innerHTML = `
    <img src="${DATOS.fotoPerfil}" alt="Profe Gustavo Aguilar" onerror="this.style.display='none'; this.parentElement.querySelector('.thumb-fallback').style.display='flex';">
    <div class="thumb-fallback">👨‍🏫</div>
    <div class="thumb-texto">
      <div>💻 Informática Educativa</div>
      <div>Profe Gustavo Aguilar</div>
      <div>✉️ ${DATOS.contacto}</div>
    </div>
  `;
  div.querySelector("img").addEventListener("click", abrirLightbox);
  div.querySelector(".thumb-fallback").addEventListener("click", abrirLightbox);
  return div;
}

/* ============================================================
   RENDER PRINCIPAL
   ============================================================ */
function render(i) {
  pararTodosLosAudios();
  if (EM.limpiadoresResize) {
    EM.limpiadoresResize.forEach((fn) => fn());
    EM.limpiadoresResize = [];
  }
  const p = EM.flujo[i];
  EM.els.contenido.innerHTML = "";
  EM.els.contenido.classList.remove("bloqueado");
  actualizarProgreso();
  bloquearSiguiente(true);

  switch (p.tipo) {
    case "portada": renderPortada(p); break;
    case "selectorTipoLetra": renderSelectorTipoLetra(p); break;
    case "trazo": renderTrazo(p); break;
    case "trazoDemo": renderTrazoDemo(p); break;
    case "clasificar": renderClasificar(p); break;
    case "seleccionar": renderSeleccionar(p); break;
    case "asociar": renderAsociar(p); break;
    case "narracionDividida": renderNarracion(p); break;
    case "completar": renderCompletar(p); break;
    case "oraciones": renderOraciones(p); break;
    case "cierre": renderCierre(p); break;
    default: break;
  }
}

/* ---------------- 1. PORTADA ---------------- */
function renderPortada(p) {
  const div = document.createElement("div");
  div.className = "pantalla portada";
  div.innerHTML = `
    <h1>${t(p.titulo)}</h1>
    <p class="bajada">${p.bajada}</p>
    <button class="btn-comenzar">▶ Comenzar</button>
  `;
  div.appendChild(bloqueThumb());
  EM.els.contenido.appendChild(div);
  div.querySelector(".btn-comenzar").addEventListener("click", () => {
    reproducirAudio(p.audio);
    avanzar();
  });
  bloquearSiguiente(true);
}

/* ---------------- 1b. SELECTOR DE TIPO DE LETRA ---------------- */
function renderSelectorTipoLetra(p) {
  const div = document.createElement("div");
  div.className = "pantalla selector-tipo-letra";
  div.innerHTML = `<h2>${t(p.titulo)}</h2><p class="instruccion">${t(p.instruccion)}</p>`;
  const cont = document.createElement("div");
  cont.className = "opciones-tipo-letra";
  div.appendChild(cont);
  EM.els.contenido.appendChild(div);

  EM.els.contenido.classList.add("bloqueado");
  reproducirAudio(p.audio).then(() => { EM.els.contenido.classList.remove("bloqueado"); });

  p.opciones.forEach((op) => {
    const btn = document.createElement("button");
    btn.className = "opcion-tipo-letra-btn";
    btn.innerHTML = `<span class="opcion-tipo-letra-ejemplo tipo-${op.tipo}">${op.ejemplo}</span><span>${op.nombre}</span>`;
    btn.addEventListener("click", () => {
      EM.tipoLetra = op.tipo;
      EM.flujo = construirFlujo(op.tipo);
      if (EM.els.app) {
        EM.els.app.classList.remove("tipo-mayuscula", "tipo-minuscula", "tipo-cursiva", "tipo-cursivaMayuscula");
        EM.els.app.classList.add("tipo-" + op.tipo);
      }
      reproducirAudio(op.audio).then(() => avanzar());
    });
    cont.appendChild(btn);
  });

  bloquearSiguiente(true);
}

/* ---------------- 9. CIERRE ---------------- */
function renderCierre(p) {
  const total = EM.aciertos + EM.errores;
  const pct = total > 0 ? Math.round((EM.aciertos / total) * 100) : 100;
  const estrellas = pct >= 90 ? "⭐⭐⭐" : pct >= 60 ? "⭐⭐" : "⭐";
  const div = document.createElement("div");
  div.className = "pantalla cierre";
  div.innerHTML = `
    <h1>${t(p.titulo)}</h1>
    <div class="cierre-icono"></div>
    <div class="resumen">
      <div class="resumen-item">✅ Aciertos: <b>${EM.aciertos}</b></div>
      <div class="resumen-item">❌ Errores: <b>${EM.errores}</b></div>
      <div class="resumen-item">📊 Total: <b>${pct}%</b></div>
      <div class="resumen-item">${estrellas}</div>
    </div>
    <button class="btn-comenzar">↺ Volver a jugar</button>
  `;
  if (p.img || p.icono) {
    div.querySelector(".cierre-icono").appendChild(crearIconoEl(p.img, p.icono || "🎉", "cierre-icono-img"));
  }
  div.appendChild(bloqueThumb());
  EM.els.contenido.appendChild(div);
  div.querySelector(".btn-comenzar").addEventListener("click", reiniciarPaquete);
  reproducirAudio(p.audio);
  bloquearSiguiente(true);
}

/* ============================================================
   2. TRAZO (canvas + guía punteada)
   ============================================================ */
function generarPatron(tipo, seed) {
  const n = 40;
  const pts = [];
  for (let i = 0; i <= n; i += 1) {
    const t = i / n;
    const x = t * 100;
    let y = 50;
    if (tipo === "onda") y = 50 + Math.sin(t * Math.PI * 2 * 3 + seed) * 30;
    else if (tipo === "zigzag") { const c = (t * 8 + seed) % 2; y = 50 + (c < 1 ? 28 : -28); }
    else if (tipo === "bucle") y = 50 + Math.sin(t * Math.PI * 2 * 4 + seed) * 22 + Math.cos(t * Math.PI * 2 * 2) * 12;
    else if (tipo === "camino") y = 50 + Math.sin(t * Math.PI * 2 * 2.2 + seed) * (38 * Math.sin(t * Math.PI + 0.3));
    pts.push([x, Math.max(8, Math.min(92, y))]);
  }
  return pts;
}

/* Normaliza los datos de un camino a una lista de segmentos [{puntos:[[x,y],...]}, ...].
   Soporta tanto el formato viejo (puntos / patron+seed) como el nuevo (segmentos múltiples,
   usado para unificar letras con varios trazos -A, E, 4- en una sola ventana). */
function normalizarSegmentos(pathData) {
  if (pathData.segmentos) return pathData.segmentos;
  const puntos = pathData.puntos ? pathData.puntos : generarPatron(pathData.patron, pathData.seed || 1);
  return [{ puntos }];
}

/* Inserta puntos intermedios entre vértices consecutivos de un segmento, para que
   la cobertura de trazo exija recorrer todo el camino y no solo tocar sus extremos
   (bug detectado: en la letra A, los extremos de la barra horizontal caen sobre las
   diagonales, y sin densificar, trazar solo las diagonales "tocaba" ambos extremos
   de la barra sin que el dedo pasara realmente por ella). */
function densificarPuntos(puntos, pasoMax) {
  if (puntos.length < 2) return puntos.slice();
  const paso = pasoMax || 3; // % del viewBox 0-100
  const resultado = [puntos[0]];
  for (let i = 1; i < puntos.length; i += 1) {
    const a = puntos[i - 1];
    const b = puntos[i];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const pasos = Math.max(1, Math.ceil(dist / paso));
    for (let s = 1; s <= pasos; s += 1) {
      const t = s / pasos;
      resultado.push([a[0] + dx * t, a[1] + dy * t]);
    }
  }
  return resultado;
}

/* Dibuja en el svg dado la guía de un segmento: una banda gruesa hueca (el "molde" a colorear)
   más la línea punteada fina en el centro, que marca por dónde tiene que pasar el dedo. */
function dibujarGuiaSegmento(svg, puntos) {
  const svgNS = "http://www.w3.org/2000/svg";
  const d = puntos.map((pt, idx) => `${idx === 0 ? "M" : "L"}${pt[0]},${pt[1]}`).join(" ");
  const banda = document.createElementNS(svgNS, "path");
  banda.setAttribute("d", d);
  banda.setAttribute("class", "guia-banda");
  svg.appendChild(banda);
  const guia = document.createElementNS(svgNS, "path");
  guia.setAttribute("d", d);
  guia.setAttribute("class", "guia-linea");
  svg.appendChild(guia);
}

function crearCajaTrazo(pathData, opts, onComplete) {
  const wrap = document.createElement("div");
  wrap.className = "caja-trazo";
  if (opts.alto) wrap.style.height = opts.alto + "px";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.classList.add("guia-svg");

  if (opts.fondoLetra) {
    const t = document.createElementNS(svgNS, "text");
    t.setAttribute("x", "50"); t.setAttribute("y", "68");
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("class", "letra-fondo");
    t.textContent = opts.fondoLetra;
    svg.appendChild(t);
  }
  if (opts.numero) {
    const t = document.createElementNS(svgNS, "text");
    t.setAttribute("x", "50"); t.setAttribute("y", "68");
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("class", "letra-fondo");
    t.textContent = opts.numero;
    svg.appendChild(t);
  }

  // Punto extra (ej. el puntito de la "i"): un objetivo circular aparte que hay que
  // tocar/pintar además del cuerpo de la letra, para que la vocal quede completa.
  let puntoEl = null;
  if (opts.puntoExtra) {
    const { cx, cy, r } = opts.puntoExtra;
    puntoEl = document.createElementNS(svgNS, "circle");
    puntoEl.setAttribute("cx", cx); puntoEl.setAttribute("cy", cy); puntoEl.setAttribute("r", r);
    puntoEl.setAttribute("class", "guia-punto-extra");
    svg.appendChild(puntoEl);
  }

  const segmentos = normalizarSegmentos(pathData);
  const puntos = []; // todos los puntos densificados de todos los segmentos, en orden (para cobertura y animación)
  const rangosSegmento = []; // [inicio, fin) de índices en `puntos` para cada segmento
  segmentos.forEach((seg) => {
    dibujarGuiaSegmento(svg, seg.puntos);
    const densos = densificarPuntos(seg.puntos);
    const inicioIdx = puntos.length;
    densos.forEach((pt) => puntos.push(pt));
    rangosSegmento.push([inicioIdx, puntos.length]);
  });

  function iconoOverlay(punto, imgNombre, emoji, clase) {
    if (!imgNombre && !emoji) return;
    const cont = document.createElement("div");
    cont.className = `icono-trazo-overlay ${clase}`;
    cont.style.left = punto[0] + "%";
    cont.style.top = punto[1] + "%";
    cont.appendChild(crearIconoEl(imgNombre, emoji, "icono-trazo-img"));
    wrap.appendChild(cont);
  }
  iconoOverlay(puntos[0], opts.imgInicio, opts.iconoInicio, "icono-trazo-inicio");
  iconoOverlay(puntos[puntos.length - 1], opts.imgFin, opts.iconoFin, "icono-trazo-fin");

  const canvas = document.createElement("canvas");
  canvas.className = "trazo-canvas";
  const check = document.createElement("div");
  check.className = "trazo-check";
  check.textContent = "✔";
  const mano = document.createElement("div");
  mano.className = "puntero-lapiz";
  mano.innerHTML = SVG_LAPIZ;

  wrap.appendChild(svg);
  wrap.appendChild(canvas);
  wrap.appendChild(check);
  wrap.appendChild(mano);

  function moverMano(px, py) {
    mano.style.left = px + "px";
    mano.style.top = py + "px";
    mano.classList.add("visible");
  }
  function ocultarMano() { mano.classList.remove("visible"); }
  function ocultarManoSiCompleto() {
    if (completo && !opts.libre) ocultarMano();
  }

  let completo = false;
  let cuerpoCompleto = false; // se pone true una vez que el cuerpo de la letra está bien trazado, y queda así (no depende de la posición actual del dedo)
  let puntoPintado = !opts.puntoExtra; // si no hay punto que pintar (la mayoría de las letras), ya arranca "hecho"
  let visitados = new Set();
  let dibujando = false;
  let ctx;

  const trazosGuardados = []; // trazos ya dibujados, en % relativo, para poder redibujarlos si el canvas se redimensiona
  let trazoActual = null;

  function redibujarTrazosGuardados() {
    const rect = wrap.getBoundingClientRect();
    trazosGuardados.forEach((trazo) => {
      if (trazo.length < 2) return;
      ctx.beginPath();
      trazo.forEach((pt, i) => {
        const px = (pt[0] / 100) * rect.width;
        const py = (pt[1] / 100) * rect.height;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    });
  }

  function ajustarCanvas() {
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 22;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ff7a3d";
    redibujarTrazosGuardados(); // el resize (o el propio montaje) limpia el canvas: recuperamos lo ya dibujado
  }
  ajustarCanvas(); // primera pasada (por si ya está montado)
  requestAnimationFrame(ajustarCanvas); // pasada real: se ejecuta ya insertado en el DOM
  window.addEventListener("resize", ajustarCanvas);
  EM.limpiadoresResize = EM.limpiadoresResize || [];
  EM.limpiadoresResize.push(() => window.removeEventListener("resize", ajustarCanvas));

  function posARelativo(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
      px: clientX - rect.left,
      py: clientY - rect.top
    };
  }

  function intentarCompletarTodo() {
    if (cuerpoCompleto && puntoPintado && !completo) {
      completo = true;
      wrap.classList.add("completo");
      check.classList.add("visible");
      ocultarMano();
      reproducirAudio(COMUN.acierto);
      if (onComplete) onComplete();
    }
  }

  function chequearCobertura(px, py) {
    for (let idx2 = 0; idx2 < puntos.length; idx2 += 1) {
      if (visitados.has(idx2)) continue;
      const dx = puntos[idx2][0] - px;
      const dy = puntos[idx2][1] - py;
      if (Math.sqrt(dx * dx + dy * dy) < 9) visitados.add(idx2);
    }
    const todosSegmentosCubiertos = rangosSegmento.every(([ini, fin]) => {
      let cubiertos = 0;
      for (let i = ini; i < fin; i += 1) if (visitados.has(i)) cubiertos += 1;
      return cubiertos / (fin - ini) >= 0.8;
    });
    // "Llegó al final" se exige sobre la posición ACTUAL del dedo (radio moderado), no sobre
    // el historial de visitados con el radio general: eso evitaba que el trazo se diera por
    // terminado antes de que el dedo realmente llegara a la punta del último tramo. El radio
    // (7) es más generoso que antes para no exigirle al chico una precisión de milímetros.
    const finalPt = puntos[puntos.length - 1];
    const dxFinal = finalPt[0] - px;
    const dyFinal = finalPt[1] - py;
    const llegoAlFinal = Math.sqrt(dxFinal * dxFinal + dyFinal * dyFinal) < 8;
    if (todosSegmentosCubiertos && llegoAlFinal && !cuerpoCompleto) {
      cuerpoCompleto = true;
      intentarCompletarTodo();
    }
  }

  // Chequea si el toque cayó sobre el punto extra (ej. el puntito de la "i") y lo pinta.
  function chequearPuntoExtra(px, py) {
    if (!opts.puntoExtra || puntoPintado) return;
    const { cx, cy, r } = opts.puntoExtra;
    const dx = cx - px;
    const dy = cy - py;
    if (Math.sqrt(dx * dx + dy * dy) < r) {
      puntoPintado = true;
      if (puntoEl) puntoEl.classList.add("pintado");
      intentarCompletarTodo();
    }
  }

  function inicio(e) {
    if (completo && !opts.libre) return;
    dibujando = true;
    const { px, py, x, y } = posARelativo(e.clientX, e.clientY);
    ctx.beginPath();
    ctx.moveTo(px, py);
    trazoActual = [[x, y]];
    trazosGuardados.push(trazoActual);
    moverMano(px, py);
    if (!opts.libre) { chequearCobertura(x, y); chequearPuntoExtra(x, y); }
  }
  function mover(e) {
    const { px, py, x, y } = posARelativo(e.clientX, e.clientY);
    moverMano(px, py);
    if (!dibujando) return;
    ctx.lineTo(px, py);
    ctx.stroke();
    if (trazoActual) trazoActual.push([x, y]);
    if (!opts.libre) { chequearCobertura(x, y); chequearPuntoExtra(x, y); }
  }
  function fin() { dibujando = false; trazoActual = null; ocultarManoSiCompleto(); }
  function entra(e) {
    if (completo && !opts.libre) return;
    const { px, py } = posARelativo(e.clientX, e.clientY);
    moverMano(px, py);
  }
  function sale() { ocultarManoSiCompleto(); }

  canvas.addEventListener("pointerenter", entra);
  canvas.addEventListener("pointerdown", (e) => { canvas.setPointerCapture(e.pointerId); inicio(e); });
  canvas.addEventListener("pointermove", mover);
  canvas.addEventListener("pointerup", fin);
  canvas.addEventListener("pointercancel", fin);
  canvas.addEventListener("pointerleave", sale);

  if (opts.libre) {
    const btn = document.createElement("button");
    btn.className = "btn-listo-trazo";
    btn.textContent = "✅ Ya practiqué";
    btn.addEventListener("click", () => {
      if (completo) return;
      completo = true;
      wrap.classList.add("completo");
      check.classList.add("visible");
      reproducirAudio(COMUN.acierto);
      if (onComplete) onComplete();
    });
    wrap.appendChild(btn);
  }

  return wrap;
}

function renderTrazo(p) {
  const div = document.createElement("div");
  div.className = "pantalla trazo-pantalla";
  div.innerHTML = `<h2>${t(p.titulo)}</h2><p class="instruccion">${t(p.instruccion)}</p>`;

  if (p.secuencial && p.caminos.length > 1) {
    renderTrazoSecuencial(p, div);
    return;
  }

  const esLetraONumero = !!p.fondoLetra || p.caminos.some((c) => c.letra || c.numero);
  const cont = document.createElement("div");
  const variasLetrasONumeros = esLetraONumero && p.caminos.length > 1;
  cont.className = esLetraONumero
    ? (variasLetrasONumeros ? "grid-trazos grid-trazos-repaso" : "grid-trazos")
    : (p.caminos.length > 1 ? "fila-trazos" : "grid-trazos");
  if (variasLetrasONumeros) cont.style.setProperty("--n-cols", p.caminos.length);
  div.appendChild(cont);
  EM.els.contenido.appendChild(div);

  EM.els.contenido.classList.add("bloqueado");
  reproducirAudio(p.audio).then(() => { EM.els.contenido.classList.remove("bloqueado"); });

  let completados = 0;
  const totalCaminos = p.caminos.length;

  p.caminos.forEach((camino) => {
    const opts = {
      libre: p.libre,
      alto: p.caminos.length === 1 ? (camino.largo ? 380 : 260) : 130,
      iconoInicio: camino.icono,
      imgInicio: camino.img,
      iconoFin: camino.iconoFin,
      imgFin: camino.imgFin,
      fondoLetra: p.fondoLetra || camino.letra,
      numero: camino.numero,
      puntoExtra: camino.puntoExtra
    };
    const caja = crearCajaTrazo(camino, opts, () => {
      completados += 1;
      if (!p.libre) marcarAcierto();
      if (completados >= totalCaminos) bloquearSiguiente(false);
    });
    cont.appendChild(caja);
  });

  if (p.libre) bloquearSiguiente(false); // práctica libre: no exige validación estricta salvo el botón "Ya practiqué" (igual ya cuenta arriba)
}

// Modo secuencial: en vez de mostrar todos los caminos juntos en una grilla (que en pantallas
// chicas de celular no entran todos, ej. el repaso de las 5 vocales), se muestra UNO por vez,
// siempre en el mismo lugar/tamaño grande: al completarlo desaparece y aparece el siguiente.
function renderTrazoSecuencial(p, div) {
  const cont = document.createElement("div");
  cont.className = "grid-trazos";
  const progreso = document.createElement("p");
  progreso.className = "progreso-secuencial";
  div.appendChild(progreso);
  div.appendChild(cont);
  EM.els.contenido.appendChild(div);

  EM.els.contenido.classList.add("bloqueado");
  reproducirAudio(p.audio).then(() => { EM.els.contenido.classList.remove("bloqueado"); });

  let indice = 0;
  const total = p.caminos.length;

  function mostrarActual() {
    progreso.textContent = `${indice + 1} / ${total}`;
    cont.innerHTML = "";
    const camino = p.caminos[indice];
    const opts = {
      libre: p.libre,
      alto: camino.largo ? 380 : 260,
      iconoInicio: camino.icono,
      imgInicio: camino.img,
      iconoFin: camino.iconoFin,
      imgFin: camino.imgFin,
      fondoLetra: p.fondoLetra || camino.letra,
      numero: camino.numero,
      puntoExtra: camino.puntoExtra
    };
    const caja = crearCajaTrazo(camino, opts, () => {
      if (!p.libre) marcarAcierto();
      indice += 1;
      if (indice >= total) {
        bloquearSiguiente(false);
      } else {
        setTimeout(mostrarActual, 700);
      }
    });
    cont.appendChild(caja);
  }
  mostrarActual();
}

function renderTrazoDemo(p) {
  const div = document.createElement("div");
  div.className = "pantalla trazo-pantalla";
  div.innerHTML = `<h2>${t(p.titulo)}</h2><p class="instruccion">${t(p.instruccion)}</p>`;
  const cont = document.createElement("div");
  cont.className = "grid-trazos";
  div.appendChild(cont);
  const avisoSiguiente = document.createElement("p");
  avisoSiguiente.className = "aviso-siguiente";
  avisoSiguiente.textContent = "👉 ¡Muy bien! Ahora tocá Siguiente para continuar.";
  div.appendChild(avisoSiguiente);
  EM.els.contenido.appendChild(div);

  const wrap = document.createElement("div");
  wrap.className = "caja-trazo caja-trazo-demo";
  wrap.style.height = "260px";

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.classList.add("guia-svg");

  if (p.fondoLetra || p.numero) {
    const t = document.createElementNS(svgNS, "text");
    t.setAttribute("x", "50"); t.setAttribute("y", "68");
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("class", "letra-fondo");
    t.textContent = p.fondoLetra || p.numero;
    svg.appendChild(t);
  }
  if (p.puntoExtra) {
    const { cx, cy, r } = p.puntoExtra;
    const puntoDemo = document.createElementNS(svgNS, "circle");
    puntoDemo.setAttribute("cx", cx); puntoDemo.setAttribute("cy", cy); puntoDemo.setAttribute("r", r);
    puntoDemo.setAttribute("class", "guia-punto-extra");
    svg.appendChild(puntoDemo);
  }

  const segmentos = normalizarSegmentos(p.camino);
  const puntos = [];
  segmentos.forEach((seg) => {
    dibujarGuiaSegmento(svg, seg.puntos);
    densificarPuntos(seg.puntos).forEach((pt) => puntos.push(pt));
  });

  const mano = document.createElement("div");
  mano.className = "puntero-lapiz puntero-lapiz-demo";
  mano.innerHTML = SVG_LAPIZ;

  wrap.appendChild(svg);
  wrap.appendChild(mano);
  cont.appendChild(wrap);

  function moverManoPorcentaje(px, py) {
    const rect = wrap.getBoundingClientRect();
    mano.style.left = (rect.width * px) / 100 + "px";
    mano.style.top = (rect.height * py) / 100 + "px";
  }

  requestAnimationFrame(() => {
    moverManoPorcentaje(puntos[0][0], puntos[0][1]);
    mano.classList.add("visible");
  });

  EM.els.contenido.classList.add("bloqueado");
  bloquearSiguiente(true);

  reproducirAudioConProgreso(p.audio, (prog) => {
    const idxFloat = prog * (puntos.length - 1);
    const i0 = Math.floor(idxFloat);
    const i1 = Math.min(puntos.length - 1, i0 + 1);
    const frac = idxFloat - i0;
    const x = puntos[i0][0] + (puntos[i1][0] - puntos[i0][0]) * frac;
    const y = puntos[i0][1] + (puntos[i1][1] - puntos[i0][1]) * frac;
    moverManoPorcentaje(x, y);
  }).then(() => {
    mano.classList.remove("visible");
    EM.els.contenido.classList.remove("bloqueado");
    bloquearSiguiente(false);
    avisoSiguiente.classList.add("visible");
    reproducirAudio(COMUN.pulsaSiguiente);
  });
}

/* ============================================================
   3. CLASIFICAR
   ============================================================ */
function renderClasificar(p) {
  const div = document.createElement("div");
  div.className = "pantalla clasificar-pantalla";
  div.innerHTML = `<h2>${t(p.titulo)}</h2><p class="instruccion">${t(p.instruccion)}</p>`;
  const items = mezclar(p.items);

  const filaItems = document.createElement("div");
  filaItems.className = "fila-chips";
  const cajas = document.createElement("div");
  cajas.className = "dos-cajas";
  div.appendChild(filaItems);
  div.appendChild(cajas);
  EM.els.contenido.appendChild(div);

  EM.els.contenido.classList.add("bloqueado");
  reproducirAudio(p.audio).then(() => { EM.els.contenido.classList.remove("bloqueado"); });

  [["A", p.cajaA], ["B", p.cajaB]].forEach(([g, data]) => {
    const cajaEl = document.createElement("div");
    cajaEl.className = "caja-clasif";
    cajaEl.dataset.g = g;
    const iconoDiv = document.createElement("div");
    iconoDiv.className = "caja-icono";
    iconoDiv.appendChild(crearIconoEl(data.img, data.icono, "caja-icono-img"));
    const nombreDiv = document.createElement("div");
    nombreDiv.textContent = t(data.nombre);
    const listaDiv = document.createElement("div");
    listaDiv.className = "lista-clasificados";
    cajaEl.appendChild(iconoDiv);
    cajaEl.appendChild(nombreDiv);
    cajaEl.appendChild(listaDiv);
    cajas.appendChild(cajaEl);
  });

  let seleccionado = null;
  let restantes = items.length;

  items.forEach((it) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = t(it.texto);
    chip.addEventListener("click", () => {
      reproducirAudio(it.audio);
      if (seleccionado) seleccionado.classList.remove("seleccionado");
      seleccionado = chip;
      chip.classList.add("seleccionado");
    });
    chip.dataset.grupo = it.grupo;
    filaItems.appendChild(chip);
  });

  cajas.querySelectorAll(".caja-clasif").forEach((caja) => {
    caja.addEventListener("click", () => {
      if (!seleccionado) return;
      const ok = seleccionado.dataset.grupo === caja.dataset.g;
      if (ok) {
        marcarAcierto();
        seleccionado.classList.add("resuelto");
        seleccionado.disabled = true;
        const chipTexto = seleccionado.textContent;
        seleccionado.classList.remove("seleccionado");
        seleccionado = null;
        restantes -= 1;
        reproducirAudio(COMUN.acierto).then(() => {
          const audioTipo = caja.dataset.g === "A" ? "audio/s06_palabra_corta.mp3" : "audio/s06_palabra_larga.mp3";
          reproducirAudio(audioTipo);
        });
        const listaDiv = caja.querySelector(".lista-clasificados");
        if (listaDiv) {
          const palabraSpan = document.createElement("span");
          palabraSpan.className = "palabra-clasificada";
          palabraSpan.textContent = chipTexto;
          listaDiv.appendChild(palabraSpan);
        }
        if (restantes <= 0) bloquearSiguiente(false);
      } else {
        marcarError();
        caja.classList.add("shake");
        reproducirAudio(COMUN.error);
        setTimeout(() => caja.classList.remove("shake"), 400);
      }
    });
  });
}

/* ============================================================
   4. SELECCIONAR (encerrar / elegir varios correctos)
   ============================================================ */
function renderSeleccionar(p) {
  const div = document.createElement("div");
  div.className = "pantalla seleccionar-pantalla";
  div.innerHTML = `<h2>${t(p.titulo)}</h2><p class="instruccion">${t(p.instruccion)}</p>`;
  const disperso = p.disposicion === "dispersa";
  const cont = document.createElement("div");
  cont.className = disperso ? "campo-disperso" : "grid-opciones-cortas";
  div.appendChild(cont);
  EM.els.contenido.appendChild(div);

  EM.els.contenido.classList.add("bloqueado");
  reproducirAudio(p.audio).then(() => { EM.els.contenido.classList.remove("bloqueado"); });

  const items = mezclar(p.items);
  const totalCorrectos = items.filter((i) => i.correcto).length;
  let encontrados = 0;

  // posiciones pseudoaleatorias deterministas para el modo disperso.
  // Cada ítem queda centrado en su celda de grilla, con un jitter acotado a
  // una fracción chica de esa celda: así nunca puede invadir la celda vecina
  // y no hay riesgo de que dos letras/números terminen pegados.
  function pos(idx, total) {
    const cols = Math.min(5, total);
    const filas = Math.ceil(total / cols);
    const fila = Math.floor(idx / cols);
    const col = idx % cols;
    const cellW = 78 / cols;
    const cellH = 74 / filas;
    const centroX = col * cellW + cellW / 2 + 8;
    const centroY = fila * cellH + cellH / 2 + 8;
    const az = Math.sin(idx * 12.9898) * 43758.5453;
    const jitterX = az - Math.floor(az); // 0..1
    const bz = Math.sin(idx * 78.233) * 12345.678;
    const jitterY = bz - Math.floor(bz);
    const margenX = cellW * 0.14; // jitter acotado: se queda bien adentro de su propia celda
    const margenY = cellH * 0.14;
    return {
      left: centroX + (jitterX - 0.5) * 2 * margenX,
      top: centroY + (jitterY - 0.5) * 2 * margenY,
      rot: (jitterX - 0.5) * 22
    };
  }

  items.forEach((it, idx) => {
    const btn = document.createElement("button");
    if (disperso) {
      btn.className = items.length > 10 ? "letra-dispersa densa" : "letra-dispersa";
      btn.textContent = t(it.texto);
      const { left, top, rot } = pos(idx, items.length);
      btn.style.left = left + "%";
      btn.style.top = top + "%";
      btn.style.transform = `translate(-50%,-50%) rotate(${rot.toFixed(1)}deg)`;
    } else {
      btn.className = "opcion-card";
      if (it.icono || it.img) {
        const iconoDiv = document.createElement("div");
        iconoDiv.className = "opcion-icono";
        iconoDiv.appendChild(crearIconoEl(it.img, it.icono, "opcion-icono-img"));
        btn.appendChild(iconoDiv);
      } else {
        const textoDiv = document.createElement("div");
        textoDiv.textContent = t(it.texto);
        btn.appendChild(textoDiv);
      }
    }
    btn.addEventListener("click", () => {
      const promesaAudioItem = reproducirAudio(it.audio);
      if (btn.classList.contains("resuelto") || btn.classList.contains("incorrecto-fijo")) return;
      if (it.correcto) {
        marcarAcierto();
        btn.classList.add("resuelto");
        btn.style.transform = disperso ? "translate(-50%,-50%) rotate(0deg)" : "";
        encontrados += 1;
        if (encontrados >= totalCorrectos) {
          bloquearSiguiente(false);
          promesaAudioItem.then(() => reproducirAudio("audio/s08_cierre.mp3"));
        }
      } else {
        marcarError();
        btn.classList.add("shake");
        reproducirAudio(COMUN.error);
        setTimeout(() => btn.classList.remove("shake"), 400);
      }
    });
    cont.appendChild(btn);
  });
}

/* ============================================================
   5. ASOCIAR (parejas)
   ============================================================ */
function renderAsociar(p) {
  const div = document.createElement("div");
  div.className = "pantalla asociar-pantalla";
  div.innerHTML = `<h2>${t(p.titulo)}</h2><p class="instruccion">${t(p.instruccion)}</p>`;
  const cont = document.createElement("div");
  cont.className = "dos-columnas";
  const colIzq = document.createElement("div"); colIzq.className = "columna";
  const colDer = document.createElement("div"); colDer.className = "columna columna-derecha-grid";
  cont.appendChild(colIzq); cont.appendChild(colDer);
  div.appendChild(cont);
  EM.els.contenido.appendChild(div);

  EM.els.contenido.classList.add("bloqueado");
  reproducirAudio(p.audio).then(() => { EM.els.contenido.classList.remove("bloqueado"); });

  const PALETA_PARES = ["#ffd54a", "#5dc9f5", "#ff8a5c", "#7ee08a", "#c98af0"];

  const izqData = p.pares.map((par, idx) => ({ ...par, idx }));
  const derData = mezclar(p.pares.map((par, idx) => ({ ...par, idx })));

  let elegidoIzq = null;
  let resueltos = 0;

  izqData.forEach((par) => {
    const btn = document.createElement("button");
    btn.className = "carta-asociar";
    btn.textContent = t(par.izq);
    btn.addEventListener("click", () => {
      if (btn.classList.contains("resuelto")) return;
      reproducirAudio(par.izqAudio);
      if (elegidoIzq) elegidoIzq.el.classList.remove("seleccionado");
      elegidoIzq = { el: btn, idx: par.idx };
      btn.classList.add("seleccionado");
    });
    colIzq.appendChild(btn);
  });

  derData.forEach((par) => {
    const btn = document.createElement("button");
    btn.className = "carta-asociar carta-derecha";
    const iconoDiv = document.createElement("div");
    iconoDiv.className = "carta-icono";
    iconoDiv.appendChild(crearIconoEl(par.derImg, par.derIcono, "carta-icono-img"));
    btn.appendChild(iconoDiv);
    if (par.derPuntos) {
      const puntosDiv = document.createElement("div");
      puntosDiv.className = "mini-puntos";
      puntosDiv.textContent = "●".repeat(par.derPuntos);
      btn.appendChild(puntosDiv);
    }
    btn.addEventListener("click", () => {
      if (btn.classList.contains("resuelto") || !elegidoIzq) return;
      if (elegidoIzq.idx === par.idx) {
        reproducirAudio(par.derAudio);
        marcarAcierto();
        const color = PALETA_PARES[par.idx % PALETA_PARES.length];
        btn.classList.add("resuelto");
        btn.style.background = color;
        elegidoIzq.el.classList.add("resuelto");
        elegidoIzq.el.classList.remove("seleccionado");
        elegidoIzq.el.style.background = color;
        elegidoIzq = null;
        resueltos += 1;
        if (resueltos >= p.pares.length) bloquearSiguiente(false);
      } else {
        marcarError();
        btn.classList.add("shake");
        reproducirAudio(COMUN.error).then(() => {
          setTimeout(() => reproducirAudio(par.derAudio), 2000);
        });
        setTimeout(() => btn.classList.remove("shake"), 400);
      }
    });
    colDer.appendChild(btn);
  });
}

/* ============================================================
   6. NARRACIÓN DIVIDIDA (presentación de vocal)
   ============================================================ */
function renderNarracion(p) {
  const div = document.createElement("div");
  div.className = "pantalla narracion-pantalla";
  div.innerHTML = `
    <h2>${t(p.titulo)}</h2>
    ${p.gesto ? `<p class="gesto">🖐️ Gesto: ${t(p.gesto)}</p>` : ""}
    <div class="circulo-narracion"></div>
    <p class="texto-fragmento"></p>
  `;
  EM.els.contenido.appendChild(div);
  const textoEl = div.querySelector(".texto-fragmento");
  const circulo = div.querySelector(".circulo-narracion");

  function pintarIcono(frag) {
    circulo.innerHTML = "";
    circulo.appendChild(crearIconoEl(frag.img, frag.icono, "icono-central-img"));
  }
  pintarIcono(p.fragmentos[0]);

  EM.els.contenido.classList.add("bloqueado");
  (async () => {
    for (const frag of p.fragmentos) {
      textoEl.textContent = t(frag.texto);
      pintarIcono(frag);
      circulo.classList.add("pulso");
      // eslint-disable-next-line no-await-in-loop
      await reproducirAudio(frag.audioFrag);
      circulo.classList.remove("pulso");
    }
    EM.els.contenido.classList.remove("bloqueado");
    bloquearSiguiente(false);
  })();
}

/* ============================================================
   7. COMPLETAR (vocal faltante) - carrusel dentro de la pantalla
   ============================================================ */
function renderCompletar(p) {
  const div = document.createElement("div");
  div.className = "pantalla completar-pantalla";
  div.innerHTML = `
    <h2>${t(p.titulo)}</h2>
    <p class="instruccion">${t(p.instruccion)}</p>
    <div class="mini-progreso"></div>
    <div class="palabra-icono"></div>
    <div class="palabra-armada"></div>
    <div class="grid-opciones-cortas opciones-vocales"></div>
  `;
  EM.els.contenido.appendChild(div);

  const miniProgreso = div.querySelector(".mini-progreso");
  const iconoEl = div.querySelector(".palabra-icono");
  const armadaEl = div.querySelector(".palabra-armada");
  const opcionesEl = div.querySelector(".opciones-vocales");

  let sub = 0;

  function mostrarItem() {
    const it = p.items[sub];
    miniProgreso.textContent = `${sub + 1} / ${p.items.length}`;
    iconoEl.innerHTML = "";
    iconoEl.appendChild(crearIconoEl(it.img, it.icono, "palabra-icono-img"));
    armadaEl.textContent = t(it.partes.join(" _ "));
    opcionesEl.innerHTML = "";
    let resuelto = false;

    EM.els.contenido.classList.add("bloqueado");
    reproducirAudio(it.audio).then(() => EM.els.contenido.classList.remove("bloqueado"));

    mezclar(p.opciones).forEach((op) => {
      const btn = document.createElement("button");
      btn.className = "opcion-card opcion-vocal";
      btn.textContent = t(op);
      btn.addEventListener("click", () => {
        if (resuelto) return;
        if (op === it.correcta) {
          resuelto = true;
          marcarAcierto();
          btn.classList.add("resuelto");
          armadaEl.textContent = t(it.palabra);
          reproducirAudio(COMUN.acierto).then(() => {
            sub += 1;
            if (sub < p.items.length) mostrarItem();
            else bloquearSiguiente(false);
          });
        } else {
          marcarError();
          btn.classList.add("shake");
          reproducirAudio(COMUN.error);
          setTimeout(() => btn.classList.remove("shake"), 400);
        }
      });
      opcionesEl.appendChild(btn);
    });
  }
  EM.els.contenido.classList.add("bloqueado");
  reproducirAudio(p.audio).then(() => {
    EM.els.contenido.classList.remove("bloqueado");
    mostrarItem();
  });
}

/* ============================================================
   8. ORACIONES - carrusel de oraciones con palabra faltante
   ============================================================ */
function renderOraciones(p) {
  const div = document.createElement("div");
  div.className = "pantalla completar-pantalla";
  div.innerHTML = `
    <h2>${t(p.titulo)}</h2>
    <p class="instruccion">${t(p.instruccion)}</p>
    <div class="mini-progreso"></div>
    <div class="oracion-icono"></div>
    <div class="oracion-armada"></div>
    <div class="grid-opciones-cortas opciones-vocales"></div>
  `;
  EM.els.contenido.appendChild(div);

  const miniProgreso = div.querySelector(".mini-progreso");
  const iconoEl = div.querySelector(".oracion-icono");
  const oracionEl = div.querySelector(".oracion-armada");
  const opcionesEl = div.querySelector(".opciones-vocales");

  let sub = 0;

  function mostrarItem() {
    const it = p.items[sub];
    miniProgreso.textContent = `${sub + 1} / ${p.items.length}`;
    iconoEl.innerHTML = "";
    if (it.img || it.icono) iconoEl.appendChild(crearIconoEl(it.img, it.icono, "oracion-icono-img"));
    const rayitas = "_ ".repeat(it.correcta.length).trim();
    oracionEl.textContent = t(`${it.antes} ${rayitas} ${it.despues}`);
    opcionesEl.innerHTML = "";
    let resuelto = false;

    EM.els.contenido.classList.add("bloqueado");
    reproducirAudio(it.audio).then(() => EM.els.contenido.classList.remove("bloqueado"));

    mezclar(it.opciones).forEach((op) => {
      const btn = document.createElement("button");
      btn.className = "opcion-card opcion-vocal";
      btn.textContent = t(op);
      btn.addEventListener("click", () => {
        if (resuelto) return;
        if (op === it.correcta) {
          resuelto = true;
          marcarAcierto();
          btn.classList.add("resuelto");
          oracionEl.textContent = t(`${it.antes} ${it.correcta} ${it.despues}`);
          reproducirAudio(COMUN.acierto).then(() => {
            if (it.oracionAudio) {
              EM.els.contenido.classList.add("bloqueado");
              return reproducirAudio(it.oracionAudio).then(() => {
                EM.els.contenido.classList.remove("bloqueado");
              });
            }
            return Promise.resolve();
          }).then(() => {
            sub += 1;
            if (sub < p.items.length) mostrarItem();
            else bloquearSiguiente(false);
          });
        } else {
          marcarError();
          btn.classList.add("shake");
          reproducirAudio(COMUN.error);
          setTimeout(() => btn.classList.remove("shake"), 400);
        }
      });
      opcionesEl.appendChild(btn);
    });
  }
  mostrarItem();
}

/* ============================================================
   INICIO
   ============================================================ */
function iniciarMotor() {
  EM.flujo = construirFlujo(EM.tipoLetra);
  EM.els.app = document.getElementById("app");
  EM.els.contenido = document.getElementById("contenido");
  EM.els.btnSiguiente = document.getElementById("btnSiguiente");
  EM.els.progresoBarra = document.getElementById("progresoBarra");
  EM.els.progresoTexto = document.getElementById("progresoTexto");
  EM.els.lightbox = document.getElementById("lightbox");
  EM.els.lightboxImg = document.getElementById("lightboxImg");

  EM.els.btnSiguiente.addEventListener("click", avanzar);
  document.getElementById("btnCerrarLightbox").addEventListener("click", cerrarLightbox);
  EM.els.lightboxImg.addEventListener("click", toggleZoomLightbox);

  render(0);
}

document.addEventListener("DOMContentLoaded", iniciarMotor);
