/* motor.js — Censo de Fluidez Lectora · QueSepanTodos.com
   Reconocimiento de voz (Web Speech API, Chrome) + alineación con el texto de la ficha
   + revisión docente + planilla. */
(function (global) {
"use strict";

/* ================= ALINEACIÓN (lógica pura, testeable) ================= */
const NUM = {"0":"cero","1":"uno","2":"dos","3":"tres","4":"cuatro","5":"cinco","6":"seis","7":"siete","8":"ocho","9":"nueve","10":"diez"};
function norm(w) {
  w = String(w).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
  return NUM[w] || w;
}
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({length: n + 1}, (_, j) => j), cur = new Array(n + 1);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    [prev, cur] = [cur, prev];
  }
  return prev[n];
}
function sim(a, b) { if (!a || !b) return 0; return 1 - lev(a, b) / Math.max(a.length, b.length); }
// Umbral para aceptar como "leída bien": palabras cortas deben coincidir exacto.
function umbral(w) { return w.length <= 3 ? 1 : (w.length <= 5 ? 0.8 : 0.75); }

/**
 * Alinea las palabras oídas con las del texto.
 * texto: array de palabras normalizadas. oidas: [{w (normalizada), t (ms)}]
 * Devuelve {estado[], oyo[], tiempo[], ultima, repeticiones, inserciones}
 *   estado: null (no alcanzada) | 'ok' | 'error' | 'dudosa'
 */
const NUMPAL = new Set(("cero uno un una dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciseis diecisiete dieciocho diecinueve " +
  "veinte veintiuno veintidos veintitres veinticuatro veinticinco veintiseis veintisiete veintiocho veintinueve treinta cuarenta cincuenta sesenta setenta ochenta noventa " +
  "cien ciento doscientos trescientos cuatrocientos quinientos seiscientos setecientos ochocientos novecientos mil").split(" "));
function alinear(texto, oidas, opts) {
  const V = (opts && opts.ventana) || 5;
  const N = texto.length;
  const estado = new Array(N).fill(null), oyo = new Array(N).fill(null), tiempo = new Array(N).fill(null);
  const coincide = (h, j) => j >= 0 && j < N && !!h && sim(h, texto[j]) >= umbral(texto[j]);
  // ¿las oídas k..k+len-1 coinciden en orden con el texto j..j+len-1?
  const secuencia = (k, j, len) => { for (let d = 0; d < len; d++) { if (k + d >= oidas.length || !coincide(oidas[k + d].w, j + d)) return false; } return true; };
  let p = 0, rep = 0, ins = 0;
  for (let k = 0; k < oidas.length && p < N; k++) {
    const h = oidas[k].w; if (!h) continue;
    // 0) número escrito con cifras ("1681", "1816") leído en palabras: "mil seiscientos ochenta y uno"
    if (/^\d+$/.test(texto[p]) && NUMPAL.has(h)) {
      tiempo[p] = oidas[k].t;
      while (k + 1 < oidas.length && (NUMPAL.has(oidas[k + 1].w) || (oidas[k + 1].w === "y" && k + 2 < oidas.length && NUMPAL.has(oidas[k + 2].w)))) k++;
      estado[p] = "ok"; p++; continue;
    }
    // 1) coincidencia exacta o casi exacta en la ventana siguiente (penalizando saltos)
    let mejor = -1, puntaje = 0;
    for (let j = p; j < Math.min(p + V, N); j++) {
      const s = sim(h, texto[j]);
      if (s >= umbral(texto[j])) { const sc = s - 0.06 * (j - p); if (sc > puntaje) { puntaje = sc; mejor = j; } }
    }
    if (mejor >= 0) {
      // el reconocedor suele perder palabras cortas ("y", "a", "la"): quedan "a confirmar";
      // una palabra larga salteada es más probablemente una omisión real
      for (let j = p; j < mejor; j++) if (!estado[j]) estado[j] = texto[j].length <= 4 ? "dudosa" : "omitida";
      tiempo[mejor] = oidas[k].t;
      if (h === texto[mejor]) { estado[mejor] = "ok"; oyo[mejor] = null; }
      else { estado[mejor] = "error"; oyo[mejor] = h; } // parecida pero distinta: "tenebrosas" por "tenebrosos"
      p = mejor + 1; continue;
    }
    // 2) palabra partida en 2 o 3 pedazos ("lu ga res", "a orillas" → "aorillas")
    let unida = false;
    for (const n of [2, 3]) {
      if (k + n - 1 >= oidas.length) break;
      const partes = oidas.slice(k, k + n).map(o => o.w);
      if (partes.join("") === texto[p]) {
        const silabeo = partes.every(x => x.length <= 3);
        estado[p] = silabeo ? "error" : "ok"; oyo[p] = silabeo ? partes.join("-") : null;
        tiempo[p] = oidas[k].t; p++; k += n - 1; unida = true; break;
      }
    }
    if (unida) continue;
    // 3) salteó un renglón: tres palabras seguidas coinciden más adelante
    let salto = -1;
    for (let j = p + V; j < Math.min(p + 30, N); j++) if (secuencia(k, j, 3)) { salto = j; break; }
    if (salto >= 0) {
      for (let j = p; j < salto; j++) if (!estado[j]) estado[j] = "omitida";
      estado[salto] = "ok"; tiempo[salto] = oidas[k].t; p = salto + 1; continue;
    }
    // 4) repetición / relectura de algo ya leído (palabra suelta o un renglón entero)
    let esRep = false;
    for (let j = Math.max(0, p - 3); j < p; j++) if (coincide(h, j)) { esRep = true; break; }
    if (!esRep) for (let j = Math.max(0, p - 30); j < p - 3; j++) if (secuencia(k, j, 2)) { esRep = true; break; }
    if (esRep) { rep++; continue; }
    // 5) sustitución: se parece a la esperada, o la siguiente oída ya corresponde a la siguiente del texto
    const sigCoincide = k + 1 < oidas.length && coincide(oidas[k + 1].w, p + 1);
    if (sim(h, texto[p]) >= 0.34 || sigCoincide) {
      estado[p] = "error"; oyo[p] = h; tiempo[p] = oidas[k].t; p++;
      continue;
    }
    ins++; // palabra agregada que no está en el texto
  }
  let ultima = -1;
  for (let j = N - 1; j >= 0; j--) if (estado[j] === "ok" || estado[j] === "error") { ultima = j; break; }
  for (let j = ultima + 1; j < N; j++) estado[j] = null; // marcas colgando al final no cuentan
  return { estado, oyo, tiempo, ultima, repeticiones: rep, inserciones: ins };
}

/** Métricas a partir de las marcas finales. */
function metricas(estado, ultima, tiempo, segUsados, segTotal, pausaSeg, t0) {
  const leidas = ultima + 1;
  let errores = 0, dudosas = 0, omitidas = 0, pausas = [];
  let tPrev = t0;
  for (let j = 0; j <= ultima; j++) {
    if (estado[j] === "error") errores++;
    else if (estado[j] === "omitida") { errores++; omitidas++; }
    else if (estado[j] === "dudosa") dudosas++;
    if (tiempo && tiempo[j] != null) {
      if (tPrev != null && j > 0 && tiempo[j] - tPrev > pausaSeg * 1000) pausas.push(j);
      tPrev = tiempo[j];
    }
  }
  const correctas = Math.max(0, leidas - errores);
  const precision = leidas ? Math.round(correctas / leidas * 100) : 0;
  const ppm = segUsados > 0 && segUsados < segTotal ? Math.round(leidas * 60 / segUsados) : leidas;
  return { leidas, errores, omitidas, dudosas, correctas, precision, pausas, ppm };
}

/**
 * Une los resultados del reconocedor en un solo texto, sin duplicados.
 * Chrome en Android (y algunas versiones de escritorio) devuelve el mismo fragmento
 * dos veces o en forma acumulada ("hola" + "hola", "las cuevas" + "las cuevas son"):
 * si un fragmento contiene al anterior lo reemplaza; si es igual o está contenido, se descarta.
 */
function unirResultados(textos) {
  const piezas = [];
  const n = t => t.toLowerCase().replace(/\s+/g, " ").trim();
  for (const bruto of textos) {
    const t = String(bruto || "").trim(); if (!t) continue;
    const ult = piezas[piezas.length - 1];
    if (ult !== undefined) {
      const a = n(ult), b = n(t);
      if (b.startsWith(a)) { piezas[piezas.length - 1] = t; continue; } // acumulado: reemplaza
      if (a.startsWith(b) || a.endsWith(b)) continue;                    // repetido o ya incluido
    }
    piezas.push(t);
  }
  return piezas.join(" ");
}
function textosDe(results) { return Array.from(results).map(r => r[0] && r[0].transcript); }

const API = { norm, sim, lev, alinear, metricas, unirResultados };
API.archivoPalabra = w => { const n = String(w).toLowerCase().replace(/[^a-záéíóúüñ]/g, "")
  .replace(/[áéíóú]/g, c => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] + "1").replace(/ü/g, "u2").replace(/ñ/g, "n1");
  return /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/.test(n) ? n + "_" : n; };
if (typeof module !== "undefined" && module.exports) { module.exports = API; }
global.QSTFluidez = API;
if (typeof document === "undefined") return;

/* ================= APLICACIÓN ================= */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const ES_ANDROID = /Android/i.test(navigator.userAgent);
const CLAVE = "qst_censo_fluidez_v1";

const S = {
  ficha: null, palabras: [], modo: "voz", nombre: "", curso: "",
  corriendo: false, t0: 0, tFin: 0, seg: 0, timer: null,
  finales: [], interino: "", oidas: [], rec: null, recActivo: false,
  estado: [], oyo: [], tiempo: [], ultima: -1, rep: 0, ins: 0,
  grabar: false, verMarcas: false, stream: null, mr: null, trozos: [], audioURL: null, analizador: null,
  planilla: []
};

function mostrar(id) {
  $$(".pantalla").forEach(p => p.classList.toggle("activa", p.id === id));
  const am = document.getElementById("audioModelo"); if (id !== "modelo" && am && !am.paused) am.pause();
}

/* ---------- portada / firma / lightbox ---------- */
function firma() {
  $$("[data-firma]").forEach(el => {
    el.innerHTML = `<img src="${META.fotoMini || META.foto}" alt="Profe"><div><b>${META.autor}</b><small>${META.mail}</small></div>`;
    const img = el.querySelector("img");
    img.onerror = () => { const d = document.createElement("div"); d.className = "sinfoto"; d.textContent = "👨‍🏫"; img.replaceWith(d); };
    img.onclick = abrirLB;
  });
}
function abrirLB() {
  const lb = $("#lb"), img = lb.querySelector("img");
  img.src = META.foto; img.style.transform = ""; img.dataset.z = "0"; lb.classList.add("ver");
}
$("#lb img").addEventListener("click", e => {
  const img = e.currentTarget;
  if (img.dataset.z === "1") { img.style.transform = ""; img.dataset.z = "0"; return; }
  const r = img.getBoundingClientRect();
  img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  img.style.transform = "scale(2.2)"; img.dataset.z = "1";
});
$("#lb button").onclick = () => { const lb = $("#lb"); lb.classList.remove("ver"); const i = lb.querySelector("img"); i.style.transform = ""; i.dataset.z = "0"; };

/* ---------- planilla (localStorage con try/catch) ---------- */
function cargarPlanilla() { try { S.planilla = JSON.parse(localStorage.getItem(CLAVE) || "[]"); } catch (e) { S.planilla = []; } }
function guardarPlanilla() { try { localStorage.setItem(CLAVE, JSON.stringify(S.planilla)); } catch (e) {} }

/* ---------- configuración ---------- */
function initConfig() {
  const sel = $("#selFicha");
  sel.innerHTML = FICHAS.map((f, i) => `<option value="${i}">${f.grado} — ${f.titulo} (${f.renglones[f.renglones.length - 1].n} palabras)</option>`).join("");
  $$(".modo").forEach(b => b.onclick = () => elegirModo(b.dataset.modo));
  if (META.presentacion) { $("#sobreTxt").textContent = META.presentacion; $("#sobreFuente").textContent = "Fuente: " + (META.fuentePresentacion || ""); }
  else $("#sobre").style.display = "none";
  const desc = () => { const f = FICHAS[+sel.value]; $("#fichaDesc").textContent = f.descripcion ? `«${f.titulo}» — ${f.descripcion}. ${f.fuente || ""}` : ""; };
  sel.onchange = desc; desc();
  $("#chkGrabar").checked = !ES_ANDROID; // en Android, micrófono compartido puede fallar
  if (!SR) { elegirModo("manual"); $('[data-modo="voz"]').disabled = true; $('[data-modo="voz"] span').textContent = "No disponible en este navegador. Usá Google Chrome."; }
}
function elegirModo(m) {
  S.modo = m;
  $$(".modo").forEach(b => b.classList.toggle("sel", b.dataset.modo === m));
  $("#opcsVoz").style.display = m === "voz" ? "" : "none";
  $("#btnProbar").style.display = m === "voz" ? "" : "none";
  $("#pruebaMic").style.display = m === "voz" ? "" : "none";
}

/* ---------- prueba de micrófono ---------- */
let recPrueba = null;
$("#btnProbar").onclick = () => {
  const box = $("#pruebaMic");
  if (recPrueba) { recPrueba.stop(); return; }
  recPrueba = new SR(); recPrueba.lang = META.idioma; recPrueba.continuous = true; recPrueba.interimResults = true;
  box.innerHTML = "🎙️ Escuchando… decí en voz alta: <b>«Las cuevas son lugares oscuros»</b>";
  $("#btnProbar").textContent = "⏹ Terminar prueba";
  let txt = "";
  recPrueba.onresult = e => { txt = unirResultados(textosDe(e.results)); box.innerHTML = `🎙️ Oí: <b>${esc(txt)}</b>`; };
  recPrueba.onerror = e => { box.innerHTML = "⚠️ " + mensajeError(e.error); };
  recPrueba.onend = () => {
    recPrueba = null; $("#btnProbar").textContent = "🎤 Probar micrófono";
    if (txt) box.innerHTML = `✅ El micrófono funciona. Oí: <b>${esc(txt)}</b>`;
  };
  try { recPrueba.start(); } catch (e) { box.textContent = "⚠️ No se pudo iniciar el micrófono."; }
  setTimeout(() => recPrueba && recPrueba.stop(), 9000);
};
function mensajeError(c) {
  return ({
    "not-allowed": "El navegador no tiene permiso para usar el micrófono. Tocá el candado de la barra de direcciones y permitilo.",
    "service-not-allowed": "El reconocimiento de voz está bloqueado en este navegador o por la política del equipo.",
    "network": "No hay conexión con el servicio de reconocimiento de voz. Revisá internet o usá el modo manual.",
    "audio-capture": "No se detecta ningún micrófono conectado.",
    "no-speech": "No se escuchó ninguna voz. Acercá el micrófono y probá de nuevo."
  })[c] || ("Error del micrófono: " + c);
}

/* ---------- preparar ficha ---------- */
function prepararFicha(practica) {
  S.practica = practica === true;
  if (S.practica) {
    S.ficha = FICHAS[+$("#pFicha").value];
    S.nombre = $("#pNombre").value.trim(); S.curso = "";
    S.modo = "voz"; S.grabar = false; S.verMarcas = false;
  } else {
    S.ficha = FICHAS[+$("#selFicha").value];
    S.nombre = $("#inNombre").value.trim(); S.curso = $("#inCurso").value.trim();
    S.grabar = S.modo === "voz" && $("#chkGrabar").checked;
    S.verMarcas = S.modo === "voz" && $("#chkMarcas").checked;
  }
  S.palabras = [];
  S.ficha.renglones.forEach((r, ri) => r.t.split(/\s+/).filter(Boolean).forEach(w => S.palabras.push({ w, n: norm(w), r: ri })));
  const total = S.ficha.renglones[S.ficha.renglones.length - 1].n;
  // número impreso en la ficha para cada palabra (el recuadro del renglón manda: así el resultado coincide con el papel)
  { let i = 0; S.ficha.renglones.forEach(r => { const k = r.t.split(/\s+/).filter(Boolean).length; for (let pos = 0; pos < k; pos++) S.palabras[i++].num = r.n - (k - 1 - pos); }); }
  if (total !== S.palabras.length) console.info("Conteo impreso", total, "≠ palabras separadas", S.palabras.length, "(se usa el conteo impreso)");
  resetToma();
  const rec = S.practica ? recordDe(S.nombre, S.ficha.id) : 0;
  $("#lecTit").innerHTML = `${S.ficha.titulo}<small>${S.ficha.grado}${S.nombre ? " · " + esc(S.nombre) : ""}${S.curso ? " · " + esc(S.curso) : ""}` +
    (rec ? ` · <span class="record">🏆 Tu récord: ${rec}</span>` : "") + `</small>`;
  renderTexto($("#texto"));
  const t = $("#texto");
  t.className = "texto oculto" + (S.verMarcas ? " marcas" : "") + (S.modo === "manual" ? " manual-live" : "") + (S.practica ? " practica-live" : "");
  $("#capaInicioTxt").innerHTML = S.practica
    ? "Cuando estés listo, tocá <b>Empezar</b>. Leé en voz alta, claro y sin apurarte. Las palabras bien leídas se pintan de verde."
    : S.modo === "voz"
    ? "Cuando el estudiante esté listo, tocá <b>Empezar</b>. El texto aparece después de la cuenta regresiva y el programa empieza a escuchar."
    : "Modo manual: mientras lee, <b>tocá cada palabra mal leída</b>. Al terminar el minuto marcás la última palabra que leyó.";
  $("#capaInicio").classList.add("ver"); $("#capaFin").classList.remove("ver");
  $("#btnDetener").disabled = true; relojPintar(META.segundos);
  mostrar("lectura");
  ajustarFuente(t);
}
function resetToma() {
  const N = S.palabras.length;
  S.estado = new Array(N).fill(null); S.oyo = new Array(N).fill(null); S.tiempo = new Array(N).fill(null);
  S.ultima = -1; S.rep = 0; S.ins = 0; S.finales = []; S.interino = ""; S.oidas = []; S.seg = 0; S.lista = {};
  if (S.audioURL) { URL.revokeObjectURL(S.audioURL); S.audioURL = null; }
}
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]); }
function renderTexto(cont) {
  let h = `<h3 class="ficha-tit">${esc(S.ficha.titulo)}</h3>` + (S.ficha.fuente ? `<div class="ficha-fuente">${esc(S.ficha.fuente)}</div>` : ""), i = 0;
  S.ficha.renglones.forEach(r => {
    const ws = r.t.split(/\s+/).filter(Boolean).map(w => `<span class="w" data-i="${i++}">${esc(w)}</span>`).join(" ");
    h += `<div class="reng${r.p ? " par" : ""}"><span class="ln"${S.ficha.espaciado ? ` style="line-height:${S.ficha.espaciado}"` : ""}>${ws}</span><span class="cnt">${r.n}</span></div>`;
  });
  if (S.ficha.autor) h += `<div class="ficha-autor">${esc(S.ficha.autor)}</div>`;
  cont.innerHTML = h;
}
// Tamaño de letra: que entre el texto completo si se puede, entre 18 y 34 px.
function ajustarFuente(cont) {
  const h = cont.clientHeight, w = cont.clientWidth, lineas = S.ficha.renglones.length + 3;
  const total = S.ficha.renglones[S.ficha.renglones.length - 1].n;
  const tope = total <= 60 ? 46 : total <= 100 ? 40 : 34; // letra más grande en los textos cortos (1° y 2° grado)
  const alto = 1.8 * ((S.ficha.espaciado || 1.75) / 1.75);
  let fs = Math.max(18, Math.min(tope, Math.floor((h * 0.95) / (lineas * alto))));
  const largo = Math.max(...S.ficha.renglones.map(r => r.t.length));
  fs = Math.floor(Math.max(15, Math.min(fs, (w - 60) / (largo * 0.52 + 4)))); // que cada renglón entre en una línea
  cont.style.fontSize = fs + "px";
}

/* ---------- toma ---------- */
$("#btnEmpezar").onclick = async () => {
  $("#capaInicio").classList.remove("ver");
  if (S.modo === "voz" && S.grabar) await iniciarGrabacion();
  if (S.modo === "voz") iniciarRec();
  const capa = $("#capaCuenta"), num = $("#cuentaNum"); capa.classList.add("ver");
  for (const n of [3, 2, 1]) { num.textContent = n; num.style.animation = "none"; void num.offsetWidth; num.style.animation = ""; await espera(900); }
  capa.classList.remove("ver");
  $("#texto").classList.remove("oculto"); $("#texto").scrollTop = 0;
  S.oidas = []; S.finales = []; S.interino = "";
  S.corriendo = true; S.t0 = performance.now(); $("#btnDetener").disabled = false;
  S.timer = setInterval(tic, 200);
  if (S.practica) pintarVivo();
};
function espera(ms) { return new Promise(r => setTimeout(r, ms)); }
function tic() {
  const s = (performance.now() - S.t0) / 1000;
  relojPintar(Math.max(0, META.segundos - s));
  if (s >= META.segundos) terminar(false);
}
function relojPintar(resta) {
  $("#relojTxt").textContent = Math.ceil(resta);
  $("#reloj .pr").style.strokeDashoffset = (163.4 * (1 - resta / META.segundos)).toFixed(1);
  $("#reloj").classList.toggle("fin", resta <= 10);
}
$("#btnDetener").onclick = () => terminar(true);

async function terminar(manual) {
  if (!S.corriendo) return;
  S.corriendo = false; clearInterval(S.timer);
  S.tFin = performance.now(); S.seg = Math.min(META.segundos, (S.tFin - S.t0) / 1000);
  $("#btnDetener").disabled = true;
  if (!manual) $("#capaFin").classList.add("ver");
  if (S.modo === "voz") {
    // margen para que lleguen las últimas palabras reconocidas (latencia del servicio)
    await espera(1600);
    detenerRec(); detenerGrabacion();
    await espera(400);
    procesar(true);
  }
  await espera(manual ? 200 : 900);
  $("#capaFin").classList.remove("ver");
  if (S.practica) abrirAutoeval(); else abrirRevision();
}

/* ---------- reconocimiento de voz ---------- */
function iniciarRec() {
  S.recActivo = true; S.finales = []; S.interino = "";
  const nuevo = () => {
    const r = new SR(); r.lang = META.idioma; r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
    r.onresult = e => {
      // texto completo de esta sesión del reconocedor (finales + provisorios), sin duplicados
      S.interino = unirResultados(textosDe(e.results));
      procesar(false);
    };
    r.onerror = e => {
      if (e.error === "no-speech" || e.error === "aborted") return;
      $("#escuchaTxt").textContent = "⚠️ " + mensajeError(e.error);
      if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") S.recActivo = false;
    };
    r.onend = () => {
      // se reinicia solo si sigue la toma (el servicio corta tras silencios)
      if (S.recActivo) { if (S.interino) { S.finales.push(S.interino); S.interino = ""; } try { S.rec = nuevo(); S.rec.start(); } catch (e) {} }
      else escucha(false);
    };
    return r;
  };
  S.rec = nuevo();
  try { S.rec.start(); escucha(true); } catch (e) { escucha(false); }
}
function detenerRec() { S.recActivo = false; if (S.rec) try { S.rec.stop(); } catch (e) {} escucha(false); }
function escucha(on) {
  $("#escucha").classList.toggle("on", on);
  if (on) $("#escuchaTxt").textContent = "escuchando"; else if (!/⚠️/.test($("#escuchaTxt").textContent)) $("#escuchaTxt").textContent = "en espera";
}

// Convierte finales + interino en lista de palabras con marca de tiempo estable.
function actualizarOidas() {
  const ws = (S.finales.join(" ") + " " + S.interino).split(/\s+/).map(norm).filter(Boolean);
  const ahora = performance.now();
  for (let i = 0; i < ws.length; i++) {
    if (!S.oidas[i]) S.oidas[i] = { w: ws[i], t: ahora };
    else if (S.oidas[i].w !== ws[i]) S.oidas[i].w = ws[i]; // corrección del ASR: conserva el tiempo
  }
  S.oidas.length = ws.length;
}
function procesar(final) {
  if (!S.corriendo && !final) return;
  actualizarOidas();
  let oidas = S.oidas.filter(o => o.t >= S.t0 - 300);
  if (final) oidas = oidas.filter(o => o.t <= S.t0 + S.seg * 1000 + 1100); // latencia tolerada después del minuto
  const R = alinear(S.palabras.map(p => p.n), oidas);
  S.estado = R.estado; S.oyo = R.oyo; S.tiempo = R.tiempo; S.ultima = R.ultima; S.rep = R.repeticiones; S.ins = R.inserciones;
  pintarVivo();
  if (S.corriendo && S.ultima === S.palabras.length - 1) setTimeout(() => terminar(true), 1200);
}
function pintarVivo() {
  const cont = $("#texto");
  if (S.verMarcas) pintar(cont, false);
  if (S.practica) cont.querySelectorAll(".w").forEach(el => {
    const j = +el.dataset.i, st = S.estado[j];
    el.className = "w" + (st ? " " + st : "") + (j === S.ultima + 1 ? " sig" : "");
  });
  // seguir la lectura: mantener visible el renglón actual
  const sig = cont.querySelector(`.w[data-i="${Math.min(S.ultima + 1, S.palabras.length - 1)}"]`);
  if (sig) {
    const top = sig.offsetTop - cont.clientHeight * 0.35;
    if (top > cont.scrollTop + 10) cont.scrollTop = top;
  }
}

/* ---------- grabación y nivel ---------- */
async function iniciarGrabacion() {
  try {
    S.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: true } });
    S.trozos = [];
    S.mr = new MediaRecorder(S.stream);
    S.mr.ondataavailable = e => e.data.size && S.trozos.push(e.data);
    S.mr.onstop = () => { const b = new Blob(S.trozos, { type: S.mr.mimeType || "audio/webm" }); S.audioURL = URL.createObjectURL(b); mostrarAudio(); };
    S.mr.start(500);
    // medidor de nivel
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      const ac = new AC(), src = ac.createMediaStreamSource(S.stream), an = ac.createAnalyser();
      an.fftSize = 512; src.connect(an); S.analizador = { ac, an };
      const buf = new Uint8Array(an.fftSize), barra = $("#nivel i"); $("#nivel").style.display = "block";
      const loop = () => {
        if (!S.analizador) return;
        an.getByteTimeDomainData(buf); let m = 0; for (const v of buf) m = Math.max(m, Math.abs(v - 128));
        barra.style.width = Math.min(100, m / 64 * 100) + "%"; requestAnimationFrame(loop);
      };
      loop();
    }
  } catch (e) { S.mr = null; S.stream = null; }
}
function detenerGrabacion() {
  try { if (S.mr && S.mr.state !== "inactive") S.mr.stop(); } catch (e) {}
  if (S.stream) S.stream.getTracks().forEach(t => t.stop());
  if (S.analizador) { try { S.analizador.ac.close(); } catch (e) {} S.analizador = null; }
  $("#nivel").style.display = "none"; S.stream = null;
}
function mostrarAudio() {
  const a = $("#audioRev");
  if (S.audioURL) { a.src = S.audioURL; a.style.display = ""; } else { a.removeAttribute("src"); a.style.display = "none"; }
}

/* ---------- toque en modo manual (durante la lectura) ---------- */
$("#texto").addEventListener("click", e => {
  const w = e.target.closest(".w"); if (!w || S.modo !== "manual" || !S.corriendo) return;
  const i = +w.dataset.i;
  S.estado[i] = S.estado[i] === "error" ? null : "error";
  w.classList.toggle("error", S.estado[i] === "error");
});

/* ---------- revisión docente ---------- */
let modoUltima = false;
function abrirRevision() {
  if (S.modo === "manual") {
    // lo no tocado se considera bien; la última palabra la marca el/la docente
    S.ultima = -1; for (let j = S.estado.length - 1; j >= 0; j--) if (S.estado[j]) { S.ultima = j; break; }
    modoUltima = true;
  } else modoUltima = S.ultima < 0;
  $("#revTit").innerHTML = `Revisión · ${esc(S.ficha.titulo)}<small>${S.ficha.grado}${S.nombre ? " · " + esc(S.nombre) : ""}${S.curso ? " · " + esc(S.curso) : ""}</small>`;
  renderTexto($("#textoRev"));
  mostrar("revision");
  ajustarFuente($("#textoRev"));
  mostrarAudio();
  renderListaDocente();
  refrescarRevision();
  const u = $(`#textoRev .w[data-i="${Math.max(0, S.ultima)}"]`); if (u) $("#textoRev").scrollTop = Math.max(0, u.offsetTop - $("#textoRev").clientHeight * 0.5);
}
function estadoFinal(j) {
  if (j > S.ultima) return "fuera";
  return S.estado[j] || "ok";
}
function pintar(cont, rev) {
  const m = rev ? calcular() : null;
  const pausas = new Set(m ? m.pausas : []);
  cont.querySelectorAll(".w").forEach(el => {
    const j = +el.dataset.i;
    const st = rev ? estadoFinal(j) : (S.estado[j] || "");
    el.className = "w" + (st ? " " + st : "") + (rev && j === S.ultima ? " ultima" : "") + (pausas.has(j) ? " pausa" : "");
    if (rev && st === "error" && S.oyo[j]) el.dataset.oyo = S.oyo[j]; else delete el.dataset.oyo;
  });
  return m;
}
function calcular() {
  const est = S.estado.map((s, j) => (j <= S.ultima ? (s || "ok") : null));
  return conImpreso(metricas(est, S.ultima, S.modo === "voz" ? S.tiempo : null, S.seg, META.segundos, META.pausaLarga, S.t0));
}
// Ajusta "palabras leídas" al número impreso en la ficha (difiere solo si la ficha trae un conteo corrido)
function conImpreso(m) {
  if (S.ultima < 0 || !S.palabras[S.ultima] || S.palabras[S.ultima].num == null) return m;
  const L = S.palabras[S.ultima].num;
  if (L === m.leidas) return m;
  m.leidas = L; m.correctas = Math.max(0, L - m.errores);
  m.precision = L ? Math.round(m.correctas / L * 100) : 0;
  m.ppm = S.seg > 0 && S.seg < META.segundos ? Math.round(L * 60 / S.seg) : L;
  return m;
}
function refrescarRevision() {
  const m = pintar($("#textoRev"), true);
  $("#kLeidas").textContent = m.leidas; $("#kCorr").textContent = m.correctas; $("#kErr").textContent = m.errores;
  $("#kPrec").textContent = m.precision + "%"; $("#kPausas").textContent = S.modo === "voz" ? m.pausas.length : "—";
  const x = [];
  x.push(`⏱️ Tiempo de lectura: <b>${Math.round(S.seg)} s</b>` + (m.ppm !== m.leidas ? ` → ritmo equivalente <b>${m.ppm} palabras/min</b>` : ""));
  if (m.dudosas) x.push(`🔎 <b>${m.dudosas}</b> palabra(s) a confirmar (grises). Si las leyó bien, dejalas así: cuentan como correctas.`);
  if (S.modo === "voz") x.push(`↩️ Repeticiones/autocorrecciones: <b>${S.rep}</b> · Palabras agregadas: <b>${S.ins}</b>`);
  if (S.ultima < 0) x.push("📍 Tocá la <b>última palabra</b> que leyó en el minuto.");
  $("#kExtra").innerHTML = x.join("<br>");
  $("#btnUltima").classList.toggle("on", modoUltima);
  $("#btnGuardar").disabled = S.ultima < 0;
}
$("#btnUltima").onclick = () => { modoUltima = !modoUltima; refrescarRevision(); };
$("#textoRev").addEventListener("click", e => {
  const w = e.target.closest(".w"); if (!w) return;
  const j = +w.dataset.i;
  if (modoUltima || j > S.ultima) {
    // mover el final; lo que queda adentro sin marca cuenta como leído bien
    S.ultima = j; modoUltima = false; refrescarRevision(); return;
  }
  const ciclo = { ok: "error", dudosa: "error", error: "omitida", omitida: "ok" };
  const actual = S.estado[j] || "ok";
  S.estado[j] = ciclo[actual];
  refrescarRevision();
});
$("#btnRepetir").onclick = () => prepararFicha();

$("#btnGuardar").onclick = () => {
  const m = calcular();
  S.planilla.push({
    fecha: new Date().toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" }),
    nombre: S.nombre || "(sin nombre)", curso: S.curso, ficha: `${S.ficha.grado} · ${S.ficha.titulo}`,
    modo: S.modo === "voz" ? "Voz" : "Manual", seg: Math.round(S.seg),
    leidas: m.leidas, correctas: m.correctas, errores: m.errores, omitidas: m.omitidas,
    precision: m.precision, ppm: m.ppm, pausas: S.modo === "voz" ? m.pausas.length : "", rep: S.modo === "voz" ? S.rep : "",
    lista: Object.assign({}, S.lista), listaTxt: resumenLista(S.lista, false)
  });
  guardarPlanilla(); abrirPlanilla();
};

/* ---------- planilla ---------- */
function abrirPlanilla() {
  const t = $("#tabla");
  if (!S.planilla.length) t.innerHTML = `<div class="vacio">Todavía no hay tomas guardadas en este dispositivo.</div>`;
  else t.innerHTML = `<table><thead><tr><th>Estudiante</th><th>Grado</th><th>Ficha</th><th>Leídas/min</th><th>Correctas</th><th>Errores</th><th>Precisión</th><th>Pausas</th><th>Lista control</th><th>Modo</th><th>Fecha</th></tr></thead><tbody>` +
    S.planilla.slice().reverse().map(r => `<tr><td>${esc(r.nombre)}</td><td>${esc(r.curso)}</td><td>${esc(r.ficha)}</td><td><b>${r.leidas}</b>${r.ppm !== r.leidas ? ` <small>(${r.ppm}/min)</small>` : ""}</td><td>${r.correctas}</td><td>${r.errores}</td><td>${r.precision}%</td><td>${r.pausas}</td><td>${esc(r.listaTxt || "")}</td><td>${r.modo}</td><td>${r.fecha}</td></tr>`).join("") + `</tbody></table>`;
  mostrar("cierre");
}
$("#btnCSV").onclick = () => {
  const LC = META.listaControl || [], NOM = { si: "Sí", casi: "Más o menos", no: "Todavía no" };
  const cab = ["Fecha", "Estudiante", "Grado", "Ficha", "Modo", "Segundos", "Palabras leidas", "Palabras correctas", "Errores", "Omitidas", "Precision %", "Ritmo equivalente ppm", "Pausas largas", "Repeticiones", "Lista de control"].concat(LC.map(it => it.txt));
  const filas = S.planilla.map(r => [r.fecha, r.nombre, r.curso, r.ficha, r.modo, r.seg, r.leidas, r.correctas, r.errores, r.omitidas, r.precision, r.ppm, r.pausas, r.rep, r.listaTxt || ""]
    .concat(LC.map(it => (r.lista && NOM[r.lista[it.id]]) || "")));
  const csv = "﻿" + [cab, ...filas].map(f => f.map(v => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = "censo_fluidez_" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a); a.click(); a.remove();
};
let borrarArmado = false;
$("#btnBorrar").onclick = () => {
  const b = $("#btnBorrar");
  if (!borrarArmado) { borrarArmado = true; b.textContent = "⚠️ Tocá de nuevo para confirmar"; setTimeout(() => { borrarArmado = false; b.textContent = "🗑️ Vaciar planilla"; }, 3500); return; }
  S.planilla = []; guardarPlanilla(); borrarArmado = false; b.textContent = "🗑️ Vaciar planilla"; abrirPlanilla();
};
$("#btnNueva").onclick = () => { $("#inNombre").value = ""; mostrar("config"); $("#inNombre").focus(); };

/* ================= MODO PRÁCTICA ================= */
const CLAVE_P = "qst_fluidez_practica_v1";
function leerHist() { try { return JSON.parse(localStorage.getItem(CLAVE_P) || "{}"); } catch (e) { return {}; } }
function guardarHist(h) { try { localStorage.setItem(CLAVE_P, JSON.stringify(h)); } catch (e) {} }
function claveAlumno(n) { return norm(n || "invitado") || "invitado"; }
function intentosDe(nombre, fichaId) { return (leerHist()[claveAlumno(nombre)] || []).filter(x => x.ficha === fichaId); }
function recordDe(nombre, fichaId) { return intentosDe(nombre, fichaId).reduce((m, x) => Math.max(m, x.valor), 0); }

function initPractica() {
  const sel = $("#pFicha");
  sel.innerHTML = FICHAS.map((f, i) => `<option value="${i}">${f.grado} — ${f.titulo}</option>`).join("");
  sel.onchange = graficoPractica;
  let tmo; $("#pNombre").addEventListener("input", () => { clearTimeout(tmo); tmo = setTimeout(graficoPractica, 300); });
  if (!SR) { $("#btnPracticar").disabled = true; $("#btnPracticar").title = "Necesita Google Chrome (reconocimiento de voz)"; }
}
function abrirPractica() { mostrar("practica"); graficoPractica(); }
function graficoPractica() {
  const f = FICHAS[+$("#pFicha").value], n = $("#pNombre").value.trim();
  $("#btnModelo").style.display = f.audio ? "" : "none";
  $("#pProgTit").textContent = n ? `📈 Progreso de ${n} con «${f.titulo}»` : "📈 Mi progreso (escribí tu nombre para verlo)";
  dibujarProgreso($("#pGrafico"), n ? intentosDe(n, f.id) : []);
}

/* ---------- lista de control ---------- */
function itemsLista(ficha) {
  const lineas = ficha.renglones.map(r => r.t), txt = lineas.join(" ");
  const tiene = {
    coma: /,/.test(txt), punto: /\./.test(txt), pregunta: /[¿?]/.test(txt), exclamacion: /[¡!]/.test(txt),
    dialogo: lineas.some(l => /^\s*[—–-]\s*\S/.test(l)) || /:\s*[—–-]/.test(txt)
  };
  return (META.listaControl || []).filter(it => !it.si || tiene[it.si]);
}
function resumenLista(lista, largo) {
  const items = itemsLista(S.ficha), resp = items.filter(it => lista && lista[it.id]);
  if (!resp.length) return "";
  const c = { si: 0, casi: 0, no: 0 }; resp.forEach(it => c[lista[it.id]]++);
  if (!largo) return `${c.si}/${items.length} sí` + (c.casi ? ` · ${c.casi} más o menos` : "") + (c.no ? ` · ${c.no} todavía no` : "");
  const mejorar = items.find(it => lista[it.id] === "no") || items.find(it => lista[it.id] === "casi");
  return `📝 Tu lista de control: <b>✅ ${c.si}</b> · <b>🟡 ${c.casi}</b> · <b>⏳ ${c.no}</b>` +
    (mejorar ? ` — Para la próxima: <b>«${esc(mejorar.txt)}»</b>` : " — ¡Leíste con mucha expresión! 👏");
}
let aeIdx = 0, aeItems = [];
function abrirAutoeval() {
  aeItems = itemsLista(S.ficha); aeIdx = 0;
  if (!aeItems.length || S.ultima < 0) { mostrarLogro(); return; }
  mostrar("autoeval"); mostrarItemAE();
}
function mostrarItemAE() {
  const it = aeItems[aeIdx];
  $("#aePaso").textContent = `${aeIdx + 1} de ${aeItems.length}`;
  const el = $("#aeItem"); el.textContent = it.txt;
  oirItemAE();
}
// las opciones se habilitan cuando termina el audio de la pregunta (con un tope por seguridad)
function oirItemAE() {
  const it = aeItems[aeIdx]; if (!it) return;
  const btns = $$(".ae-opc .btn"); btns.forEach(b => (b.disabled = true));
  const habilitar = () => { clearTimeout(tope); btns.forEach(b => (b.disabled = false)); };
  const tope = setTimeout(habilitar, 7000);
  reproducir(`audio/lc_${it.id}.mp3`, it.txt, null, habilitar);
}
$("#aeOir").onclick = oirItemAE;
$$(".ae-opc .btn").forEach(b => b.onclick = () => {
  if (!aeItems[aeIdx]) return;
  S.lista[aeItems[aeIdx].id] = b.dataset.r;
  aeIdx++;
  if (aeIdx < aeItems.length) mostrarItemAE(); else { if (window.speechSynthesis) speechSynthesis.cancel(); mostrarLogro(); }
});
function renderListaDocente() {
  const items = itemsLista(S.ficha), cont = $("#lcDocItems");
  $("#lcDoc").style.display = items.length ? "" : "none";
  cont.innerHTML = items.map(it => `<div class="lcd" data-id="${it.id}">${esc(it.txt)}<div class="b3">` +
    ["si", "casi", "no"].map(r => `<button data-r="${r}" class="${S.lista[it.id] === r ? "on" : ""}">${{ si: "Sí", casi: "Más o menos", no: "Todavía no" }[r]}</button>`).join("") + `</div></div>`).join("");
  cont.querySelectorAll(".lcd button").forEach(b => b.onclick = () => {
    const id = b.closest(".lcd").dataset.id;
    S.lista[id] = S.lista[id] === b.dataset.r ? undefined : b.dataset.r;
    if (!S.lista[id]) delete S.lista[id];
    renderListaDocente();
  });
}

/* ---------- lectura modelo (audio de la colección) ---------- */
function abrirModelo() {
  S.ficha = FICHAS[+$("#pFicha").value];
  if (!S.ficha.audio) return;
  $("#modTit").innerHTML = `Escuchá cómo se lee<small>${esc(S.ficha.titulo)} · ${S.ficha.grado}</small>`;
  const cont = $("#textoModelo"); renderTexto(cont);
  const a = $("#audioModelo");
  if (!a.src || !a.src.endsWith(S.ficha.audio)) a.src = S.ficha.audio;
  a.currentTime = 0; $("#modProg").style.width = "0";
  $("#btnModPlay").textContent = "▶ Escuchar";
  mostrar("modelo"); ajustarFuente(cont);
}
(function () {
  const a = $("#audioModelo"); let actual = -1;
  a.addEventListener("play", () => ($("#btnModPlay").textContent = "⏸ Pausa"));
  a.addEventListener("pause", () => ($("#btnModPlay").textContent = a.ended ? "↺ Escuchar de nuevo" : "▶ Seguir"));
  a.addEventListener("ended", () => { $("#btnModPlay").textContent = "↺ Escuchar de nuevo"; marcar(-1); });
  a.addEventListener("timeupdate", () => {
    if (a.duration) $("#modProg").style.width = (a.currentTime / a.duration * 100) + "%";
    const tt = (S.ficha && S.ficha.audioRenglones) || [];
    let i = -1; for (let k = 0; k < tt.length; k++) if (a.currentTime >= tt[k]) i = k;
    if (i !== actual) marcar(i);
  });
  function marcar(i) {
    actual = i;
    const rs = $$("#textoModelo .reng"); rs.forEach((r, k) => r.classList.toggle("suena", k === i));
    const cont = $("#textoModelo");
    if (rs[i]) { const top = rs[i].offsetTop - cont.clientHeight * 0.35; cont.scrollTop = Math.max(0, top); }
  }
})();

function mostrarLogro() {
  const m = conImpreso(metricas(S.estado.map((s, j) => (j <= S.ultima ? (s === "dudosa" ? "ok" : (s || "ok")) : null)), S.ultima, null, S.seg, META.segundos, META.pausaLarga, S.t0));
  // palabras por minuto bien leídas (si terminó el texto antes del minuto, se lleva a ritmo por minuto)
  const valor = S.seg > 0 && S.seg < META.segundos ? Math.round(m.correctas * 60 / S.seg) : m.correctas;
  const previo = recordDe(S.nombre, S.ficha.id), primera = intentosDe(S.nombre, S.ficha.id).length === 0;
  const h = leerHist(), k = claveAlumno(S.nombre);
  (h[k] = h[k] || []).push({ ficha: S.ficha.id, fecha: new Date().toISOString(), valor, leidas: m.leidas, correctas: m.correctas, precision: m.precision, lista: S.lista });
  guardarHist(h);
  const nuevoRecord = !primera && valor > previo;
  $("#lLista").innerHTML = resumenLista(S.lista, true);
  const est = [m.leidas > 0, m.precision >= 90, primera ? m.precision >= 95 : valor >= previo];
  $("#lEstrellas").innerHTML = est.map(e => `<span class="${e ? "" : "off"}">⭐</span>`).join("");
  $("#lNum").textContent = valor;
  $("#lOk").textContent = m.correctas; $("#lErr").textContent = m.errores; $("#lPrec").textContent = m.precision + "%";
  $("#lRec").textContent = Math.max(previo, valor);
  let msj;
  if (m.leidas === 0) msj = "No te escuché bien. Acercate al micrófono y probá de nuevo.";
  else if (primera) msj = "¡Primera lectura registrada! Leé otra vez y tratá de superar esta marca.";
  else if (nuevoRecord) msj = `¡Nuevo récord! Leíste ${valor - previo} palabra${valor - previo === 1 ? "" : "s"} más que tu mejor marca. 🎉`;
  else if (valor === previo) msj = "¡Igualaste tu récord! Estás muy cerca de superarlo.";
  else msj = `Tu récord es ${previo}. Practicá las palabras marcadas y volvé a intentarlo.`;
  if (m.leidas > 0 && m.precision < 85) msj += " Leé un poco más despacio para no equivocarte.";
  $("#lMsj").textContent = msj;
  // palabras para practicar (errores del minuto, sin repetir)
  const vistas = new Set(), chips = [];
  for (let j = 0; j <= S.ultima; j++) if (S.estado[j] === "error" || S.estado[j] === "omitida") {
    const w = S.palabras[j].w.replace(/[.,;:¡!¿?«»"“”()—–…-]/g, "");
    if (!vistas.has(w.toLowerCase())) { vistas.add(w.toLowerCase()); chips.push(w); }
  }
  $("#lChips").innerHTML = chips.length ? chips.map(w => `<button class="chip">${esc(w)}</button>`).join("")
    : `<div class="vacio" style="padding:10px">¡No hay palabras para practicar! Leíste todo muy bien. 👏</div>`;
  $$("#lChips .chip").forEach(c => c.onclick = () => reproducir(`audio/palabras/${archivoPalabra(c.textContent)}.mp3`, c.textContent, c));
  mostrar("logro");
  dibujarProgreso($("#lGrafico"), intentosDe(S.nombre, S.ficha.id));
  if (nuevoRecord || (primera && m.leidas > 0)) confeti();
}

/* ---------- audio: MP3 pregrabados (gTTS) con respaldo en la voz del navegador ---------- */
// nombre de archivo de una palabra: minúsculas, sin signos; tildes y ñ se marcan con "1" (á→a1, ñ→n1)
// Windows no permite archivos llamados CON, PRN, AUX, NUL, COM1-9 o LPT1-9 (aunque tengan extensión): se les agrega "_"
const RESERVADOS_WIN = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/;
function archivoPalabra(w) {
  const n = String(w).toLowerCase().replace(/[^a-záéíóúüñ]/g, "")
    .replace(/[áéíóú]/g, c => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" })[c] + "1").replace(/ü/g, "u2").replace(/ñ/g, "n1");
  return RESERVADOS_WIN.test(n) ? n + "_" : n;
}
const repro = new Audio(); let reproFin = null;
function reproducir(src, txtRespaldo, el, alTerminar) {
  try { repro.pause(); } catch (e) {}
  if (window.speechSynthesis) speechSynthesis.cancel();
  if (reproFin) reproFin(); // cierra el anterior
  let hecho = false;
  const fin = () => { if (hecho) return; hecho = true; reproFin = null; if (el) el.classList.remove("hablando"); if (alTerminar) alTerminar(); };
  reproFin = fin;
  if (el) el.classList.add("hablando");
  repro.onended = fin;
  repro.onerror = () => { if (hecho) return; decir(txtRespaldo, null, fin); };
  repro.src = src;
  repro.play().catch(() => { if (!hecho) decir(txtRespaldo, null, fin); });
}
function decir(txt, el, alTerminar) {
  if (!window.speechSynthesis) { if (alTerminar) alTerminar(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(txt); u.lang = META.idioma; u.rate = 0.8;
  const vs = speechSynthesis.getVoices(), v = vs.find(x => x.lang === "es-AR") || vs.find(x => /^es-(US|MX|419)/.test(x.lang)) || vs.find(x => /^es/.test(x.lang));
  if (v) u.voice = v;
  if (el) el.classList.add("hablando");
  u.onend = u.onerror = () => { if (el) el.classList.remove("hablando"); if (alTerminar) alTerminar(); };
  setTimeout(() => speechSynthesis.speak(u), 120); // en Android, hablar justo después de cancel() corta el audio
}

// Gráfico de barras (una serie): palabras bien leídas por minuto en cada intento.
function dibujarProgreso(cont, intentos) {
  if (!intentos.length) { cont.innerHTML = `<div class="vacio">Todavía no hay lecturas guardadas con este texto.</div>`; return; }
  const datos = intentos.slice(-12), W = Math.max(200, cont.clientWidth), H = Math.max(110, cont.clientHeight);
  const mL = 34, mR = 8, mT = 22, mB = 22, pw = W - mL - mR, ph = H - mT - mB;
  const maxV = Math.max(...datos.map(d => d.valor), 10), paso = maxV > 120 ? 50 : maxV > 60 ? 25 : 10, top = Math.ceil(maxV / paso) * paso;
  const y = v => mT + ph - v / top * ph, bw = Math.min(46, pw / datos.length * 0.62), gx = i => mL + pw / datos.length * (i + 0.5);
  const iMax = datos.reduce((b, d, i) => (d.valor >= datos[b].valor ? i : b), 0), iUlt = datos.length - 1;
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Palabras bien leídas por minuto en cada intento">`;
  for (let v = 0; v <= top; v += paso)
    svg += `<line x1="${mL}" x2="${W - mR}" y1="${y(v)}" y2="${y(v)}" stroke="#e6edf4" stroke-width="1"/><text x="${mL - 6}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#5b6776">${v}</text>`;
  datos.forEach((d, i) => {
    const x = gx(i) - bw / 2, yy = y(d.valor), h = Math.max(2, mT + ph - yy), r = Math.min(4, bw / 2, h);
    const path = `M${x},${mT + ph} V${yy + r} Q${x},${yy} ${x + r},${yy} H${x + bw - r} Q${x + bw},${yy} ${x + bw},${yy + r} V${mT + ph} Z`;
    const f = new Date(d.fecha), et = `${f.getDate()}/${f.getMonth() + 1}`;
    svg += `<path d="${path}" fill="${i === iUlt ? "#1e88d6" : "#8cc4ee"}"/>`;
    svg += `<text x="${gx(i)}" y="${H - 6}" text-anchor="middle" font-size="11" fill="#5b6776">${et}</text>`;
    if (i === iUlt || i === iMax) svg += `<text x="${gx(i)}" y="${yy - 6}" text-anchor="middle" font-size="12" font-weight="800" fill="#1d2733">${i === iMax && i !== iUlt ? "🏆 " : ""}${d.valor}</text>`;
    svg += `<rect class="hit" data-i="${i}" x="${gx(i) - pw / datos.length / 2}" y="${mT}" width="${pw / datos.length}" height="${ph}" fill="transparent"/>`;
  });
  svg += `<line x1="${mL}" x2="${W - mR}" y1="${mT + ph}" y2="${mT + ph}" stroke="#9aa7b4" stroke-width="1"/></svg><div class="gtip"></div>`;
  cont.innerHTML = svg;
  const tip = cont.querySelector(".gtip");
  cont.querySelectorAll(".hit").forEach(r => {
    const ver = () => {
      const d = datos[+r.dataset.i], f = new Date(d.fecha);
      tip.innerHTML = `<b>${d.valor}</b> palabras/min · ${d.precision}% precisión<br>${f.toLocaleDateString("es-AR")} ${f.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}`;
      tip.style.left = Math.min(W - 90, Math.max(90, gx(+r.dataset.i))) + "px"; tip.style.top = y(d.valor) + "px"; tip.style.display = "block";
    };
    r.addEventListener("mouseenter", ver); r.addEventListener("click", ver);
    r.addEventListener("mouseleave", () => (tip.style.display = "none"));
  });
}

function confeti() {
  const cv = $("#confeti"), ctx = cv.getContext("2d"); if (!ctx) return;
  cv.width = cv.clientWidth; cv.height = cv.clientHeight;
  const cols = ["#1e88d6", "#2e9d57", "#ffd54a", "#e0663a", "#b9a7d9"];
  const ps = Array.from({ length: 120 }, () => ({ x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * 0.5, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 3, r: Math.random() * 6, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6 }));
  const t0 = performance.now();
  (function loop(t) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.a += 0.1; ctx.fillStyle = p.c; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillRect(-4, -2, 8, 4); ctx.restore(); });
    if (t - t0 < 2800) requestAnimationFrame(loop); else ctx.clearRect(0, 0, cv.width, cv.height);
  })(t0);
}

/* ---------- navegación ---------- */
$("#btnComenzar").onclick = () => mostrar("config");
$("#btnPreparar").onclick = prepararFicha;
$("#btnVolverCfg").onclick = () => S.practica ? abrirPractica() : mostrar("config");
$("#btnPracticar").onclick = abrirPractica;
$("#btnPracInicio").onclick = () => mostrar("portada");
$("#btnPracEmpezar").onclick = () => prepararFicha(true);
$("#btnModelo").onclick = abrirModelo;
$("#btnModPlay").onclick = () => { const a = $("#audioModelo"); if (a.paused) a.play().catch(() => {}); else a.pause(); };
$("#btnModVolver").onclick = abrirPractica;
$("#btnModLeer").onclick = () => prepararFicha(true);
$("#btnPracOtra").onclick = () => prepararFicha(true);
$("#btnPracCambiar").onclick = abrirPractica;
$("#btnVerPlanilla").onclick = abrirPlanilla;
window.addEventListener("resize", () => {
  if ($("#lectura").classList.contains("activa")) ajustarFuente($("#texto"));
  if ($("#revision").classList.contains("activa")) ajustarFuente($("#textoRev"));
  if ($("#practica").classList.contains("activa")) graficoPractica();
  if ($("#logro").classList.contains("activa")) dibujarProgreso($("#lGrafico"), intentosDe(S.nombre, S.ficha.id));
});

/* ---------- inicio ---------- */
$("#tituloApp").textContent = META.titulo; $("#subApp").textContent = META.subtitulo;
if (!SR) { const a = $("#avisoNav"); a.style.display = ""; a.textContent = "Este navegador no tiene reconocimiento de voz. Para el modo asistido usá Google Chrome actualizado. El modo manual funciona igual."; }
else if (location.protocol === "file:") { const a = $("#avisoNav"); a.style.display = ""; a.textContent = "Abierto como archivo local: Chrome puede pedir permiso del micrófono en cada toma. Publicado en la web (https) funciona mejor."; }
firma(); cargarPlanilla(); initConfig(); initPractica(); imagenes();
// Ilustraciones: la del texto (portada y práctica) y la de un chico leyendo (lista de control).
// Si el archivo no está, se mantiene el dibujo/emoji de respaldo.
function imagenes() {
  const f = FICHAS[0];
  const poner = (id, src, alCargar) => {
    const img = document.getElementById(id); if (!img || !src) return;
    img.onload = () => { img.style.display = "block"; if (alCargar) alCargar(); };
    img.onerror = () => { img.style.display = "none"; };
    img.src = src;
  };
  poner("imgPortada", f.imagen, () => { const svg = document.querySelector("#portada svg.ilus"); if (svg) svg.style.display = "none"; });
  poner("imgPractica", f.imagen);
  poner("imgLectora", META.imagenLectora, () => { const e = document.getElementById("emojiLectora"); if (e) e.style.display = "none"; });
}
global.QSTFluidezApp = S;
})(typeof window !== "undefined" ? window : globalThis);
