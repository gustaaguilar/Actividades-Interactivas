/* tutorial.js — Tutoriales animados del Censo de Fluidez Lectora (QueSepanTodos.com)
   Una mano recorre la herramienta real, toca los botones y una narración explica cada opción.
   Dos recorridos: DOCENTE (tomar el censo) y ESTUDIANTE (practicar).
   Audios de narración: tutorial/d01.mp3… y tutorial/e01.mp3… (gTTS). Si faltan, se muestran solo los subtítulos.
   Parámetros de URL para grabar el video: ?tutorial=docente|estudiante&grabar=1 
   © 2026 Gustavo Aguilar · QueSepanTodos.com · Licencia CC BY-NC-ND 4.0 (https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es) */
(function () {
"use strict";
const $ = s => document.querySelector(s);
const espera = ms => new Promise(r => setTimeout(r, ms));

/* ================= GUIONES ================= */
// Cada paso: t = narración (y subtítulo) · a = elemento que señala la mano · tocar = lo toca al final de la narración
// escribir = texto que se tipea en el campo · pre/durante/post = acciones del paso
const gradoCorto = () => ((FICHAS[0].grado || "").match(/\d/) || ["4"])[0] + "° A";

const DOCENTE = [
  { t: "Bienvenidos al Censo de Fluidez Lectora. Esta herramienta sirve para tomar el censo de fluidez en un dispositivo, y también para que los estudiantes practiquen la lectura." },
  { a: "#btnComenzar", t: "Con el botón azul, Tomar el censo, empieza el camino del docente." },
  { a: "#btnPracticar", t: "El botón verde, Practicar lectura, es para que los chicos practiquen solos." },
  { a: "#btnComenzar", tocar: true, t: "Veamos cómo se toma el censo. Tocamos Tomar el censo." },
  { a: "#inNombre", escribir: () => "Juana Pérez", t: "Primero escribís el nombre del estudiante," },
  { a: "#inCurso", escribir: gradoCorto, t: "y el grado con la división." },
  { a: "#selFicha", t: "En Ficha de lectura elegís el texto. Cada texto trae el conteo de palabras por renglón, igual que la ficha en papel." },
  { a: '[data-modo="voz"]', t: "Después elegís el modo. En el modo asistido por voz, el programa escucha la lectura, cuenta las palabras y marca los errores. Al final, vos revisás y confirmás." },
  { a: '[data-modo="manual"]', t: "El modo manual no usa micrófono ni internet: mientras el chico lee, vos tocás las palabras que lee mal." },
  { a: "#chkGrabar", t: "Podés grabar el audio de la lectura, para volver a escucharlo en la revisión," },
  { a: "#chkMarcas", t: "y elegir si las marcas de colores se ven mientras lee. Vienen ocultas, para no distraer." },
  { a: "#sobre summary", t: "En Sobre esta propuesta está la presentación del material de la Dirección General de Escuelas." },
  { a: "#btnProbar", t: "Antes de la primera toma, conviene probar el micrófono en el lugar donde vas a trabajar." },
  { a: "#btnPreparar", tocar: true, t: "Cuando está todo listo, tocás Preparar lectura." },
  { a: "#texto", t: "El texto aparece borroso, así nadie lo lee antes de tiempo." },
  { a: "#btnEmpezar", tocar: true, pre: () => lecturaSimulada(), t: "Cuando el estudiante está listo, tocás Empezar." },
  { t: "Después de la cuenta regresiva aparece el texto y corre el minuto. El programa escucha y sigue la lectura, y la pantalla no se apaga mientras dura. En este ejemplo, el tiempo está acortado.",
    durante: () => hasta(() => $("#revision.activa"), 60000) },
  { a: ".kpi.grande", t: "Al terminar aparece la revisión. Arriba están las palabras leídas en el minuto, igual que en el papel," },
  { a: "#kCorr", t: "y abajo, las correctas, los errores, la precisión y las pausas largas." },
  { a: ".leyenda", t: "Los colores muestran cómo leyó cada palabra: verde, bien; naranja, error; violeta, omitida; y gris, las que el micrófono no llegó a captar." },
  { a: () => $("#textoRev .w.ok"), tocar: true, t: "Si el programa se equivocó, tocás la palabra y cambiás su marca." },
  { a: "#btnUltima", t: "Con Última palabra corregís hasta dónde llegó en el minuto." },
  { a: "#lcDoc summary", tocar: true, post: async () => { await espera(500); await tocarEn($("#lcDocItems .lcd button")); },
    t: "En Lista de control registrás cómo leyó: entonación, ritmo, pausas y comprensión." },
  { a: "#btnGuardar", tocar: true, t: "Por último, tocás Guardar." },
  { a: "#tabla", t: "El resultado queda en la planilla, junto con todas las tomas hechas en este dispositivo." },
  { a: "#btnCSV", t: "Con Descargar planilla la bajás para abrirla en Excel," },
  { a: "#btnCompartir", t: "y con Compartir la mandás por WhatsApp, por correo o a tu Drive." },
  { a: "#btnNueva", t: "Con Nueva toma seguís con el próximo estudiante." },
  { a: "#btnBorrar", t: "Y cuando terminás con el curso, podés vaciar la planilla. Pide confirmación, para no borrarla por error." },
  { t: "Recordá: el programa ayuda a contar y a marcar, pero la última palabra la tiene siempre el docente. ¡Listo! Ya sabés tomar el censo de fluidez." },
];

const ESTUDIANTE = [
  { t: "¡Hola! Te voy a mostrar cómo practicar la lectura con esta herramienta." },
  { a: "#btnPracticar", tocar: true, t: "Tocá Practicar lectura." },
  { a: "#pNombre", escribir: () => "Lucas", post: () => { const i = $("#pNombre"); i.dispatchEvent(new Event("input")); },
    t: "Escribí tu nombre. Así el programa guarda tus lecturas y tu récord." },
  { a: "#pFicha", t: "Acá elegís el texto que querés leer." },
  { a: "#pGrafico", t: "En este gráfico vas a ver cómo mejorás cada vez que leés." },
  { a: "#btnModelo", tocar: true, t: "Antes de leer, podés escuchar cómo se lee el texto. Tocá Escuchá cómo se lee." },
  { a: "#btnModPlay", tocar: true, t: "Tocá Escuchar, y seguí con la vista el renglón resaltado." },
  { a: "#textoModelo", durante: () => espera(8000), post: async () => { const a = $("#audioModelo"); if (!a.paused) await tocarEn($("#btnModPlay")); } },
  { a: "#btnModLeer", tocar: true, t: "Cuando termines de escuchar, tocá: Ya escuché, a leer." },
  { a: "#btnEmpezar", tocar: true, pre: () => lecturaSimulada(), t: "Cuando estés listo, tocá Empezar, y leé en voz alta, claro y sin apurarte." },
  { t: "Mientras leés, las palabras bien leídas se pintan de verde, y la raya azul te marca la que sigue.",
    pre: () => { window.__tutMute = true; }, durante: () => hasta(() => $("#autoeval.activa"), 60000) },
  { a: "#aeItem", t: "Al terminar, respondés la lista de control: preguntas para pensar cómo leíste." },
  { a: '.ae-opc [data-r="si"]', tocar: true, t: "Contestá con sinceridad: sí, más o menos, o todavía no.",
    post: async () => { const r = ["casi", "si", "no", "si", "si", "casi", "si", "si"]; let k = 0;
      while ($("#autoeval.activa")) { await espera(700); await tocarEn($(`.ae-opc [data-r="${r[k++ % r.length]}"]`)); } window.__tutMute = false; } },
  { a: "#lEstrellas", t: "Después ves tus estrellas, y cuántas palabras leíste en un minuto." },
  { a: "#lRec", t: "Si superás tu récord, ¡hay festejo!" },
  { a: () => $("#lChips .chip"), tocar: true, post: () => espera(1500), t: "En Palabras para practicar están las que te costaron. Tocalas para escuchar cómo se dicen." },
  { a: "#lGrafico", t: "Y en el gráfico ves tu progreso con este texto." },
  { a: "#btnPracOtra", t: "Con Leer otra vez, volvés a intentarlo. ¡Cada día, un poco mejor!" },
  { t: "¡Listo! Ya sabés cómo practicar. ¡A leer!" },
];
const GUIONES = { docente: { pasos: DOCENTE, pref: "d", titulo: "Tutorial para docentes · Tomar el censo" },
                  estudiante: { pasos: ESTUDIANTE, pref: "e", titulo: "Tutorial para estudiantes · Practicar lectura" } };
window.QST_TUTORIAL = GUIONES; // para extraer la lista de audios

/* ================= CAPA VISUAL ================= */
const css = `
#tut-bloqueo{position:fixed;inset:0;z-index:80;display:none}
#tut-mano{position:fixed;z-index:95;left:50%;top:110%;font-size:58px;line-height:1;pointer-events:none;display:none;
  transition:left .9s cubic-bezier(.45,.05,.3,1),top .9s cubic-bezier(.45,.05,.3,1);transform:translate(-38%,-6%);filter:drop-shadow(0 4px 6px rgba(0,0,0,.35))}
#tut-mano.toca{animation:tutToca .45s}
@keyframes tutToca{50%{transform:translate(-38%,-6%) scale(.82)}}
.tut-onda{position:fixed;z-index:94;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;border:4px solid #ffd54a;pointer-events:none;animation:tutOnda .7s ease-out forwards}
@keyframes tutOnda{to{transform:scale(4.5);opacity:0}}
.tut-foco{outline:4px solid #ffd54a !important;outline-offset:3px;border-radius:10px;transition:outline-color .3s}
#tut-sub{position:fixed;left:0;right:0;margin:0 auto;bottom:14px;z-index:96;width:fit-content;max-width:min(900px,92vw);background:rgba(20,30,45,.9);color:#fff;
  font:700 clamp(15px,2.6vh,22px)/1.35 Nunito,system-ui,sans-serif;padding:10px 18px;border-radius:14px;text-align:center;display:none}
#tut-sub.arriba{bottom:auto;top:46px}
#tut-ctrl{position:fixed;top:10px;right:10px;z-index:97;display:none;gap:8px}
#tut-ctrl button{background:#fff;border:2px solid #1e88d6;color:#0d5fa3;font:800 15px Nunito,sans-serif;border-radius:12px;padding:6px 12px;cursor:pointer}
#tut-tit{position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:97;background:rgba(30,136,214,.92);color:#fff;font:800 12px Nunito,sans-serif;padding:3px 12px;border-radius:0 0 10px 10px;display:none;white-space:nowrap}
#tut-menu{position:fixed;inset:0;z-index:99;background:rgba(10,30,50,.6);display:none;align-items:center;justify-content:center;padding:16px}
#tut-menu .caja{background:#fff;border-radius:20px;padding:20px;max-width:520px;width:100%;display:flex;flex-direction:column;gap:12px;font-family:Nunito,sans-serif}
#tut-menu h3{margin:0;color:#0d5fa3;font-size:22px}
#tut-menu p{margin:0;color:#5b6776}
#tut-menu .op{text-align:left;border:3px solid #d8e6f2;border-radius:16px;padding:12px 14px;background:#fbfdff;cursor:pointer;font:inherit}
#tut-menu .op b{display:block;font-size:18px;color:#1d2733}#tut-menu .op span{color:#5b6776;font-size:14px}
#tut-menu .op:hover{border-color:#1e88d6}
#tut-menu .vids{display:flex;gap:10px;flex-wrap:wrap}
#tut-menu .vid{flex:1 1 180px;text-align:left;border:3px solid #f3d6d6;border-radius:16px;padding:10px 14px;background:#fffafa;cursor:pointer;font:inherit}
#tut-menu .vid b{display:block;font-size:16px;color:#1d2733}#tut-menu .vid span{color:#5b6776;font-size:13px}
#tut-menu .vid:hover{border-color:#e53935}
#tut-menu h4{margin:4px 0 0;color:#5b6776;font-size:15px}
#tut-video{position:fixed;inset:0;z-index:100;background:rgba(5,15,25,.85);display:none;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:16px}
#tut-video .marco{width:min(960px,94vw);aspect-ratio:16/9;max-height:78vh;background:#000;border-radius:12px;overflow:hidden}
#tut-video iframe{width:100%;height:100%;border:0;display:block}
#tut-video button{background:#fff;border:0;color:#0d5fa3;font:800 16px Nunito,sans-serif;border-radius:12px;padding:8px 20px;cursor:pointer}
`;
function montar() {
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  document.body.insertAdjacentHTML("beforeend", `
    <div id="tut-bloqueo"></div><div id="tut-mano">👆</div><div id="tut-sub"></div><div id="tut-tit"></div>
    <div id="tut-ctrl"><button id="tut-pausa">⏸ Pausa</button><button id="tut-salir">✕ Salir</button></div>
    <div id="tut-menu"><div class="caja"><h3>❓ ¿Cómo se usa?</h3><p>Elegí un tutorial. Una mano te muestra cada paso mientras una voz lo explica.</p>
      <button class="op" data-t="docente"><b>📋 Para docentes: tomar el censo</b><span>Datos, modos, lectura, revisión, lista de control, planilla y cómo compartirla · 3 min</span></button>
      <button class="op" data-t="estudiante"><b>🏋️ Para estudiantes: practicar</b><span>Escuchar cómo se lee, leer, lista de control, récord y progreso · 2 min</span></button>
      <h4>🎬 O miralo en video (YouTube)</h4>
      <div class="vids"><button class="vid" data-v="6pNZtKvQmdM"><b>▶ Video para docentes</b><span>Tomar el censo · 4:51</span></button>
        <button class="vid" data-v="p7Q_wTAwxzc"><b>▶ Video para estudiantes</b><span>Practicar lectura · 3:08</span></button></div>
      <button class="op" data-t="x" style="text-align:center"><b>✕ Cerrar</b></button></div></div>
    <div id="tut-video"><div class="marco"></div><button type="button">✕ Cerrar video</button></div>`);
  $("#btnTutorial").onclick = () => ($("#tut-menu").style.display = "flex");
  document.querySelectorAll("#tut-menu .op").forEach(b => b.onclick = () => {
    $("#tut-menu").style.display = "none";
    if (b.dataset.t !== "x") iniciar(b.dataset.t);
  });
  // videos de YouTube: el iframe se crea al abrir y se destruye al cerrar (no queda sonando ni consumiendo datos)
  document.querySelectorAll("#tut-menu .vid").forEach(b => b.onclick = () => {
    $("#tut-menu").style.display = "none";
    $("#tut-video .marco").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.v}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Video tutorial"></iframe>`;
    $("#tut-video").style.display = "flex";
  });
  const cerrarVideo = () => { $("#tut-video .marco").innerHTML = ""; $("#tut-video").style.display = "none"; };
  $("#tut-video button").onclick = cerrarVideo;
  $("#tut-video").onclick = e => { if (e.target.id === "tut-video") cerrarVideo(); };
  $("#tut-pausa").onclick = () => {
    T.pausado = !T.pausado; $("#tut-pausa").textContent = T.pausado ? "▶ Seguir" : "⏸ Pausa";
    if (T.pausado) T.voz.pause(); else if (T.voz.src && !T.voz.ended && T.hablando) T.voz.play().catch(() => {});
  };
  $("#tut-salir").onclick = () => terminar(true);
}

/* ================= MOTOR DEL TUTORIAL ================= */
const T = { activo: false, pausado: false, voz: new Audio(), hablando: false, t0: 0, log: [], respaldo: null, grabar: false };
window.__tutLog = T.log;
// registro de la mano (posición y toques) para dibujarla fluida a 30 cuadros/s al armar el video
T.mano = []; window.__tutMano = T.mano;
const tAhora = () => Math.round(performance.now() - T.t0);

async function pausable(ms) { let r = ms; while (r > 0) { await espera(100); if (!T.pausado) r -= 100; if (!T.activo) throw "fin"; } }
async function hasta(cond, max) { let t = 0; while (!cond() && t < max) { await pausable(200); t += 200; } }
function elemento(a) { return typeof a === "function" ? a() : (a ? $(a) : null); }

let foco = null;
async function mover(el) {
  const m = $("#tut-mano");
  if (foco) foco.classList.remove("tut-foco");
  if (!el) { m.style.top = "115%"; T.mano.push({ tipo: "mover", t: tAhora(), x: parseFloat(m.style.left) || innerWidth / 2, y: innerHeight * 1.15 }); return; }
  el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  await espera(250);
  const r = el.getBoundingClientRect();
  m.style.display = "block";
  const mx = Math.min(innerWidth - 30, r.left + Math.min(r.width * 0.5, 60)), my = Math.min(innerHeight - 40, r.top + r.height * 0.55);
  m.style.left = mx + "px"; m.style.top = my + "px";
  T.mano.push({ tipo: "mover", t: tAhora(), x: mx, y: my });
  foco = el; el.classList.add("tut-foco");
  // el subtítulo se corre arriba si la mano señala algo en la parte baja de la pantalla
  $("#tut-sub").classList.toggle("arriba", r.top + r.height / 2 > innerHeight * 0.62);
  await pausable(950);
}
async function tocarEn(el) {
  if (!el) return;
  await mover(el);
  const m = $("#tut-mano"); m.classList.remove("toca"); void m.offsetWidth; m.classList.add("toca");
  const r = el.getBoundingClientRect(), o = document.createElement("div");
  o.className = "tut-onda"; o.style.left = (r.left + Math.min(r.width * 0.5, 60)) + "px"; o.style.top = (r.top + r.height * 0.55) + "px";
  document.body.appendChild(o); setTimeout(() => o.remove(), 800);
  T.mano.push({ tipo: "toca", t: tAhora(), x: parseFloat(o.style.left), y: parseFloat(o.style.top) });
  await espera(220);
  if (el.tagName === "SUMMARY") el.parentElement.open = !el.parentElement.open; else el.click();
  await pausable(450);
}
async function escribir(el, txt) {
  el.focus(); el.value = "";
  for (const c of txt) { el.value += c; await pausable(90); }
  el.blur();
}
function narrar(texto, archivo) {
  $("#tut-sub").textContent = texto; $("#tut-sub").style.display = "block";
  return new Promise(res => {
    let fin = false;
    const listo = () => { if (fin) return; fin = true; T.hablando = false; res(); };
    const estimado = () => pausable(Math.max(2200, texto.length * 68)).then(listo, listo);
    const v = T.voz; T.hablando = true;
    v.onended = listo; v.onerror = () => estimado();
    v.src = archivo;
    v.play().catch(() => estimado());
  });
}
async function ejecutar(p, n, pref) {
  if (p.pre) await p.pre();
  const el = elemento(p.a);
  if (p.a) await mover(el);
  const tareas = [];
  if (p.t) tareas.push(narrar(p.t, `${META.recursos || ""}tutorial/${pref}${String(n).padStart(2, "0")}.mp3`));
  if (p.escribir && el) tareas.push(escribir(el, p.escribir()));
  if (p.durante) tareas.push(p.durante());
  await Promise.all(tareas);
  if (p.tocar && el) await tocarEn(el);
  if (p.post) await p.post();
  await pausable(300);
}

/* ---------- lectura simulada (sin micrófono): "lee" el texto con dos errores ---------- */
function lecturaSimulada() {
  const palabras = FICHAS[0].renglones.map(r => r.t).join(" ").replace(/[.,;:¡!¿?«»"“”()—–…]/g, "").split(/\s+/).filter(Boolean);
  // un error de sustitución (cambia la última letra) y una omisión de una palabra larga
  const iErr = palabras.findIndex((w, i) => i > 3 && w.length > 5);
  const iOmi = palabras.findIndex((w, i) => i > iErr + 4 && w.length > 6);
  const leidas = palabras.map((w, i) => i === iErr ? w.slice(0, -1) + (w.endsWith("a") ? "o" : "a") : w).filter((w, i) => i !== iOmi);
  class Res { constructor(t, f) { this[0] = { transcript: t, confidence: .9 }; this.isFinal = f; this.length = 1; } }
  window.__SRTutorial = class {
    start() {
      const self = this; let i = 0, finales = [], actual = [];
      self.iv = setInterval(() => {
        const S = window.QSTFluidezApp;
        if (!S || !S.corriendo || T.pausado || i >= leidas.length) return;
        actual.push(leidas[i++]);
        const fin = actual.length >= 5, res = finales.map(t => new Res(t, true));
        res.push(new Res(actual.join(" "), fin));
        if (fin) { finales.push(actual.join(" ")); actual = []; }
        self.onresult && self.onresult({ resultIndex: 0, results: res });
      }, 380);
    }
    stop() { clearInterval(this.iv); setTimeout(() => this.onend && this.onend(), 30); }
    abort() { this.stop(); }
  };
}

/* ---------- respaldo de los datos reales del dispositivo ---------- */
const CLAVES = ["qst_censo_fluidez_v1", "qst_fluidez_practica_v1"];
function respaldar() { const r = {}; try { CLAVES.forEach(k => (r[k] = localStorage.getItem(k))); } catch (e) {} return r; }
function restaurar(r) { try { CLAVES.forEach(k => (r[k] == null ? localStorage.removeItem(k) : localStorage.setItem(k, r[k]))); } catch (e) {} }
function sembrarPractica() {
  // historial de ejemplo para "Lucas" (3 lecturas anteriores), así se ven el gráfico y el récord
  // la lectura simulada va a ~2,6 palabras por segundo: en 20 s lee ~52; si el texto es más corto, el valor se lleva a palabras por minuto
  const total = FICHAS[0].renglones[FICHAS[0].renglones.length - 1].n, base = total < 52 ? 150 : 50;
  const h = {}, hoy = Date.now();
  h["lucas"] = [0.55, 0.68, 0.8].map((f, k) => ({ ficha: FICHAS[0].id, fecha: new Date(hoy - (3 - k) * 86400000).toISOString(), valor: Math.round(base * f), leidas: Math.round(base * f), correctas: Math.round(base * f), precision: 90 + k * 3, lista: {} }));
  try { localStorage.setItem("qst_fluidez_practica_v1", JSON.stringify(h)); localStorage.removeItem("qst_censo_fluidez_v1"); } catch (e) {}
  if (window.QSTFluidezApp) window.QSTFluidezApp.planilla = [];
}

async function iniciar(cual) {
  if (T.activo) return;
  const g = GUIONES[cual]; if (!g) return;
  T.activo = true; T.pausado = false; T.respaldo = respaldar(); T.segundos = META.segundos;
  META.segundos = 20; // el minuto se acorta en el tutorial
  $("#chkGrabar").checked = false; $("#chkMarcas").checked = false;
  sembrarPractica();
  ["#tut-bloqueo", "#tut-tit"].forEach(s => ($(s).style.display = "block"));
  $("#tut-tit").textContent = "❓ " + g.titulo;
  $("#tut-ctrl").style.display = T.grabar ? "none" : "flex";
  T.t0 = performance.now(); T.log.length = 0; T.mano.length = 0; window.__tutT0wall = Date.now();
  if (T.grabar && new URLSearchParams(location.search).get("sinmano") === "1") {
    const st = document.createElement("style"); st.textContent = "#tut-mano,.tut-onda{visibility:hidden !important}"; document.head.appendChild(st);
  }
  document.querySelectorAll(".pantalla").forEach(p => p.classList.toggle("activa", p.id === "portada"));
  try {
    for (let k = 0; k < g.pasos.length; k++) await ejecutar(g.pasos[k], k + 1, g.pref);
    await pausable(800);
    terminar(false);
  } catch (e) { if (e !== "fin") { console.error(e); terminar(true); } }
}
function terminar(cancelado) {
  if (!T.activo) return;
  T.activo = false; T.voz.pause();
  restaurar(T.respaldo); META.segundos = T.segundos; window.__SRTutorial = null; window.__tutMute = false;
  if (T.grabar) { window.__tutFin = true; $("#tut-sub").textContent = ""; return; }
  location.href = location.pathname; // vuelve a la portada con los datos reales intactos
}

/* ---------- registro de audios que suenan (para armar el video con sonido) ---------- */
const playOriginal = HTMLMediaElement.prototype.play;
HTMLMediaElement.prototype.play = function () {
  if (T.activo) T.log.push({ src: this.src || this.currentSrc, t: Math.round(performance.now() - T.t0), desde: this.currentTime || 0 });
  return playOriginal.apply(this, arguments);
};
const pauseOriginal = HTMLMediaElement.prototype.pause;
HTMLMediaElement.prototype.pause = function () {
  if (T.activo && !this.paused) T.log.push({ src: this.src || this.currentSrc, t: Math.round(performance.now() - T.t0), pausa: true });
  return pauseOriginal.apply(this, arguments);
};

montar();
const q = new URLSearchParams(location.search);
if (q.get("tutorial")) { T.grabar = q.get("grabar") === "1"; setTimeout(() => iniciar(q.get("tutorial")), 800); }
})();
