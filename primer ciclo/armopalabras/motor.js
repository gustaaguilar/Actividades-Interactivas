/* =========================================================
   MOTOR — Armando Palabras
   ========================================================= */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
const pantalla = $("#pantalla");
const META = window.DATOS.meta;
const AUDIOS = window.DATOS.audios;
const PANTALLAS = window.DATOS.pantallas;
const estado = { indice: 0, aciertos: 0, errores: 0, puntos: 0, intento: 1, yaEvaluado: {} };
const R = {};

let _audioCtx = null;
function _ctxAudio() {
  if (!_audioCtx) { try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} }
  if (_audioCtx && _audioCtx.state === "suspended") { try { _audioCtx.resume(); } catch(e) {} }
  return _audioCtx;
}
function sfxOk() {
  const ctx = _ctxAudio(); if (!ctx) return;
  const t = ctx.currentTime;
  [660, 880].forEach((f, i) => {
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = "sine"; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t + i * 0.08); g.gain.exponentialRampToValueAtTime(0.15, t + i * 0.08 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 0.16);
    o.connect(g).connect(ctx.destination); o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.2);
  });
}
function sfxErr() {
  const ctx = _ctxAudio(); if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type = "square"; o.frequency.value = 190;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
  o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.3);
}

let colaAudio = [], reproduciendo = false, audioActual = null, genAudio = 0;
function encolar(key, onEnd) {
  if (!key) { if (onEnd) setTimeout(onEnd, 0); return; }
  colaAudio.push({ key, onEnd });
  if (!reproduciendo) _siguienteEnCola();
}
function _siguienteEnCola() {
  if (colaAudio.length === 0) { reproduciendo = false; return; }
  reproduciendo = true;
  const item = colaAudio.shift(); const miGen = genAudio; const texto = AUDIOS[item.key] || "";
  let audio; try { audio = new Audio("audio/" + item.key + ".mp3"); } catch(e) { audio = null; }
  audioActual = audio;
  const terminar = () => { if (miGen !== genAudio) return; if (item.onEnd) item.onEnd(); _siguienteEnCola(); };
  const fallback = () => {
    if (miGen !== genAudio) return;
    let hecho = false; const fin = () => { if (hecho) return; hecho = true; terminar(); };
    if ("speechSynthesis" in window) {
      try {
        const u = new SpeechSynthesisUtterance(texto); u.lang = "es-AR"; u.onend = fin; u.onerror = fin;
        window.speechSynthesis.speak(u); setTimeout(fin, Math.max(2500, 400 + texto.length * 70)); return;
      } catch(e) {}
    }
    setTimeout(fin, 400 + texto.length * 55);
  };
  if (!audio) { fallback(); return; }
  audio.onended = terminar; audio.onerror = fallback;
  const p = audio.play(); if (p && p.catch) p.catch(fallback);
}
function pararAudio() {
  genAudio++; colaAudio = []; reproduciendo = false;
  if (audioActual) { try { audioActual.pause(); audioActual.src = ""; } catch(e) {} audioActual = null; }
  if ("speechSynthesis" in window) try { window.speechSynthesis.cancel(); } catch(e) {}
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function actualizarStats() { $("#sA").textContent = estado.aciertos; $("#sE").textContent = estado.errores; $("#sP").textContent = estado.puntos; }

function htmlAfiche() {}

R.portada = function () {
  pantalla.innerHTML =
    '<div class="pantalla portada">' +
      '<img class="portada-img" src="img/portada.jpg" alt="" onclick="abrirLightbox(\'img/portada.jpg\', true)">' +
      '<div class="portada-txt">' +
        '<h1>' + META.titulo + '</h1>' + '<div class="meta-linea">' + META.area + '</div>' +
      '</div>' +
      '<div class="portada-pie">' +
        '<div class="foto-firma">' +
          '<img src="' + META.fotoMini + '" class="foto-mini" id="fotoMini" alt="Profe" onclick="abrirLightbox(\'profe.jpg\', true)">' +
          '<div class="firma"><div>💻 Informática Educativa · Profe Gustavo Aguilar</div><div>✉️ ' + META.mail + '</div></div>' +
        '</div>' +
        '<button class="btn-principal" id="btnComenzar">▶ Comenzar</button>' +
      '</div>' +
    '</div>';
  $("#btnComenzar").onclick = function () { irA(1); };
  encolar("portada");
};

R.opcionMultiple = function (p) {
  const items = shuffle(p.items.slice());
  let idx = 0;
  const render = function () {
    const it = items[idx]; const opciones = shuffle(it.opciones.slice()); const cortas = opciones.every(function (o) { return o.length <= 10; });
    pantalla.innerHTML =
      '<div class="pantalla opcion-multiple">' +
        (it.imagen ? '<img class="escena" src="' + it.imagen + '" alt="">' : '') +
        (it.pregunta ? '<div class="pregunta">' + it.pregunta + '</div>' : '') +
        '<div class="opciones ' + (cortas ? 'cortas' : 'largas') + '">' +
          opciones.map(function (o) { return '<button class="opcion" data-v="' + o.replace(/"/g,'&quot;') + '">' + o + '</button>'; }).join("") +
        '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>' + (idx < items.length - 1 ? 'Siguiente ▶' : 'Continuar ▶') + '</button>' +
      '</div>';
    const key = 'om_' + p._id + '_' + idx;
    pararAudio(); pantalla.classList.add("bloqueado");
    const cola = []; if (idx === 0 && p.audioInstr) cola.push(p.audioInstr); 
    if (it.audioPregunta) cola.push(it.audioPregunta);
    if (cola.length === 0) { setTimeout(function () { pantalla.classList.remove("bloqueado"); }, 150); }
    else { let pendientes = cola.length; cola.forEach(function (k) { encolar(k, function () { pendientes--; if (pendientes === 0) pantalla.classList.remove("bloqueado"); }); }); }
    
    let respondido = false;
    $$(".opcion").forEach(function (btn) {
      btn.onclick = function () {
        if (respondido) return;
        const valor = btn.dataset.v; const ok = valor === it.correcta;
        if (ok) {
          respondido = true; btn.classList.add("ok"); 
          $$(".opcion").forEach(function (b) { b.disabled = true; }); 
          if (!estado.yaEvaluado[key]) { estado.yaEvaluado[key] = true; estado.aciertos++; estado.puntos += META.puntosPorAcierto; actualizarStats(); }
          encolar(it.audioOk, function () { $("#btnSig").disabled = false; });
        } else {
          btn.classList.add("err"); btn.disabled = true; 
          if (!estado.yaEvaluado[key]) { estado.yaEvaluado[key] = true; estado.errores++; actualizarStats(); }
          encolar(it.audioErr);
        }
      };
    });
    $("#btnSig").onclick = function () { if (idx < items.length - 1) { idx++; render(); } else siguientePantalla(); };
  };
  render();
};

R.escribirPalabra = function (p) {
  const items = shuffle(p.items.slice());
  let idx = 0;
  const render = function () {
    const it = items[idx]; const palabra = it.palabra; const largo = palabra.length; let letras = [];
    const filas = ["qwertyuiop".split(""), "asdfghjklñ".split(""), "zxcvbnm".split("")];
    pantalla.innerHTML =
      '<div class="pantalla escribir">' +
        (it.imagen ? '<img class="escena" src="' + it.imagen + '" alt="" style="max-height:25vh; margin-bottom:2vh;">' : '') +
        '<div class="casilleros" id="casilleros">' + Array.from({length: largo}).map(function(_, i){ return '<div class="casillero" data-i="' + i + '"></div>'; }).join("") + '</div>' +
        '<div class="teclado" id="teclado">' +
          filas.map(function (fila, j) {
            const letrasFila = fila.map(function (l) { return '<button class="tecla" data-l="' + l + '">' + l + '</button>'; }).join("");
            const extras = (j === 2) ? '<button class="tecla tecla-borrar" id="tBorrar">⌫</button><button class="tecla tecla-verificar" id="tVerificar" disabled>✓</button>' : "";
            return '<div class="teclado-fila">' + letrasFila + extras + '</div>';
          }).join("") +
        '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>' + (idx < items.length - 1 ? 'Siguiente ▶' : 'Continuar ▶') + '</button>' +
      '</div>';
    const bloqueado = function () { return pantalla.classList.contains("bloqueado"); };
    const actualizar = function () {
      const cas = $$(".casillero"); cas.forEach(function (c, i) { c.textContent = letras[i] || ""; c.classList.toggle("activo", i === letras.length && letras.length < largo); });
      const v = $("#tVerificar"); if (v) v.disabled = letras.length !== largo;
    };
    const insertar = function (l) { if (bloqueado()) return; if (letras.length >= largo) return; letras.push(l.toLowerCase()); actualizar(); };
    const borrar = function () { if (bloqueado()) return; if (letras.length === 0) return; letras.pop(); actualizar(); };
    const verificar = function () {
      if (bloqueado()) return; if (letras.length !== largo) return;
      const armada = letras.join(""); const ok = norm(armada) === norm(palabra); const key = 'ep_' + p._id + '_' + idx;
      if (!estado.yaEvaluado[key]) {
        estado.yaEvaluado[key] = true;
        if (ok) { estado.aciertos++; estado.puntos += META.puntosPorAcierto; } else { estado.errores++; }
        actualizarStats();
      }
      if (ok) {
        sfxOk(); $$(".casillero").forEach(function (c, i) { c.textContent = palabra[i].toLowerCase(); c.classList.add("ok"); c.classList.remove("activo"); });
        $$(".tecla").forEach(function (b) { b.disabled = true; }); encolar(it.audioOk, function () { $("#btnSig").disabled = false; });
      } else {
        sfxErr(); const cas = $("#casilleros"); cas.classList.add("err");
        encolar(it.audioErr, function () { setTimeout(function () { cas.classList.remove("err"); letras = []; actualizar(); }, 400); });
      }
    };
    $$(".tecla[data-l]").forEach(function (b) { b.onclick = function () { insertar(b.dataset.l); }; });
    $("#tBorrar").onclick = borrar; $("#tVerificar").onclick = verificar;
    window._teclado = { insertar, borrar, verificar, activo: true };
    actualizar(); pararAudio(); pantalla.classList.add("bloqueado");
    const cola = []; if (idx === 0 && p.audioInstr) cola.push(p.audioInstr); if (it.audioPregunta) cola.push(it.audioPregunta);
    if (cola.length === 0) { setTimeout(function () { pantalla.classList.remove("bloqueado"); }, 150); }
    else { let pendientes = cola.length; cola.forEach(function (k) { encolar(k, function () { pendientes--; if (pendientes === 0) pantalla.classList.remove("bloqueado"); }); }); }
    $("#btnSig").onclick = function () { window._teclado = null; if (idx < items.length - 1) { idx++; render(); } else siguientePantalla(); };
  };
  render();
};

R.ordenar = function (p) {
  const items = p.items;
  let idx = 0;
  const render = function () {
    const it = p.items[idx]; const correctas = it.palabras.map(function (w) { return w.toLowerCase(); }); const total = correctas.length;
    const piezas = it.palabras.map(function (w, i) {
      const disp = w.toLowerCase();
      return { w: w.toLowerCase(), display: disp, id: i };
    });
    const pool = shuffle(piezas.slice());
    pantalla.innerHTML =
      '<div class="pantalla ordenar">' +
        '<img class="escena" src="' + it.imagen + '" alt="" style="max-height:25vh; margin-bottom:2vh;">' +
        '<div class="oracion-zona" id="oracion"><span class="ph">Armá la palabra tocando las sílabas en orden…</span></div>' +
        '<div class="pool" id="pool">' + pool.map(function (pz) { return '<button class="pieza" data-id="' + pz.id + '" data-w="' + pz.w + '">' + pz.display + '</button>'; }).join("") + '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>' + (idx < items.length - 1 ? 'Siguiente ▶' : 'Continuar ▶') + '</button>' +
      '</div>';
    const armado = []; const evaluadas = {}; const key = 'or_' + p._id + '_' + idx;
    pararAudio(); if (idx === 0 && p.audioInstr) encolar(p.audioInstr);
    const pintar = function () {
      const z = $("#oracion");
      if (armado.length === 0) { z.innerHTML = '<span class="ph">Armá la palabra tocando las sílabas en orden…</span>'; return; }
      const partes = armado.map(function (pz, i) { return pz.w; });
      z.innerHTML = partes.join("");
    };
    $$(".pieza").forEach(function (btn) {
      btn.onclick = function () {
        const id = btn.dataset.id; const w = btn.dataset.w; const pos = armado.length; const esperada = correctas[pos];
        if (!evaluadas[id]) {
          evaluadas[id] = true; const evalKey = key + '_' + id;
          if (!estado.yaEvaluado[evalKey]) {
            estado.yaEvaluado[evalKey] = true;
            if (w === esperada) { estado.aciertos++; estado.puntos += META.puntosPorAcierto; } else { estado.errores++; }
            actualizarStats();
          }
        }
        if (w === esperada) {
          sfxOk(); btn.classList.add("ok"); btn.style.opacity = ".25"; btn.disabled = true;
          armado.push({ w, id }); pintar();
          if (armado.length === total) {
            const z = $("#oracion"); let txt = armado.map(function (pz) { return pz.w; }).join("");
            z.innerHTML = txt; z.classList.add("ok"); encolar(it.oracionAudio, function () { $("#btnSig").disabled = false; });
          }
        } else { sfxErr(); btn.classList.add("err"); setTimeout(function () { btn.classList.remove("err"); }, 400); }
      };
    });
    $("#btnSig").onclick = function () { if (idx < items.length - 1) { idx++; render(); } else siguientePantalla(); };
  };
  render();
};

R.cierre = function () {
  const total = estado.aciertos + estado.errores; const pct = total > 0 ? Math.round(estado.aciertos / total * 100) : 0;
  pantalla.innerHTML =
    '<div class="pantalla cierre">' +
      '<img class="portada-img" src="img/cierre.jpg" alt="" onclick="abrirLightbox(\'img/cierre.jpg\', true)">' +
      '<h2>¡Terminaste!</h2>' +
      '<div class="resultados">' +
        '<div>✅ Aciertos: <b>' + estado.aciertos + '</b></div>' +
        '<div>❌ Errores: <b>' + estado.errores + '</b></div>' +
        '<div>📊 Porcentaje: <b>' + pct + '%</b></div>' +
        '<div>⭐ Puntos: <b>' + estado.puntos + '</b></div>' +
      '</div>' +
      '<div class="cierre-botones">' +
        '<button class="btn-principal" id="btnEnviar">📤 Enviar mi tarea a mi docente</button>' +
        '<button class="btn-sec" id="btnRejugar">🔁 Volver a jugar</button>' +
      '</div>' +
    '</div>';
  $("#btnRejugar").onclick = function () {
    estado.indice = 0; estado.aciertos = 0; estado.errores = 0; estado.puntos = 0; estado.yaEvaluado = {}; estado.intento++;
    actualizarStats(); irA(0);
  };
  $("#btnEnviar").onclick = abrirFormEnvio;
  encolar("cierre");
};

function abrirLightbox(src, mostrarFrase) {
  const lb = $("#lightbox"), img = $("#lbImg"), frase = $("#lbFrase");
  img.src = src;
  img.classList.remove("zoom"); 
  img.style.transformOrigin = "center"; 
  lb.hidden = false;
  
  frase.style.display = (src.includes("profe") || mostrarFrase === true) ? "block" : "none";
  if (frase.style.display === "block") frase.textContent = "Menos prisa, más vida 🧉🫂";

  $("#lbClose").onclick = function () { lb.hidden = true; img.classList.remove("zoom"); };
  
  img.onclick = function (e) {
    if (img.classList.contains("zoom")) { 
      img.classList.remove("zoom"); 
      img.style.transformOrigin = "center"; 
    } else { 
      const r = img.getBoundingClientRect(); 
      const x = ((e.clientX - r.left) / r.width) * 100; 
      const y = ((e.clientY - r.top) / r.height) * 100; 
      img.style.transformOrigin = x + "% " + y + "%"; 
      img.classList.add("zoom"); 
    }
  };
}
window.abrirLightbox = abrirLightbox;

function irA(i) { pararAudio(); estado.indice = i; render(); }
function siguientePantalla() { if (estado.indice < PANTALLAS.length - 1) irA(estado.indice + 1); }
function anteriorPantalla() { if (estado.indice > 0) irA(estado.indice - 1); }
function render() { window._teclado = null; const p = PANTALLAS[estado.indice]; p._id = estado.indice; const fn = R[p.tipo]; if (!fn) { pantalla.innerHTML = '<div class="pantalla">Tipo ' + p.tipo + ' no soportado</div>'; return; } fn(p); actualizarNav(); }
function actualizarNav() {
  const nav = $("#navRev"); if (!META.revision) { nav.innerHTML = ""; return; }
  nav.innerHTML = '<button id="navPrev">◀</button><span>' + (estado.indice + 1) + ' / ' + PANTALLAS.length + '</span><button id="navNext">▶</button>';
  $("#navPrev").onclick = anteriorPantalla; $("#navNext").onclick = siguientePantalla;
}

function abrirFormEnvio() {
  let prev = {}; try { prev = JSON.parse(localStorage.getItem("qst_envio") || "{}"); } catch(e) {}
  const modal = $("#modalEnvio"); modal.hidden = false;
  modal.innerHTML =
    '<div class="envio-card">' +
      '<h3>📤 Enviar mi tarea</h3>' +
      '<label>Nombre y apellido del estudiante</label>' +
      '<input id="envEst" value="' + (prev.estudiante || "") + '" placeholder="Ej.: Ana Pérez">' +
      '<label>Curso</label>' +
      '<input id="envCur" value="' + (prev.curso || "") + '" placeholder="ej.: 3.° A">' +
      '<label>Nombre y apellido del docente (opcional)</label>' +
      '<input id="envDoc" value="' + (prev.docente || "") + '" placeholder="Opcional">' +
      '<div class="envio-msg" id="envMsg"></div>' +
      '<div class="row"><button class="btn-sec" id="envCancelar">Cancelar</button><button class="btn-principal" id="envGenerar">Generar tarjeta</button></div>' +
    '</div>';
  $("#envCancelar").onclick = function () { modal.hidden = true; };
  $("#envGenerar").onclick = function () {
    const est = $("#envEst").value.trim(), cur = $("#envCur").value.trim(), doc = $("#envDoc").value.trim(); const msg = $("#envMsg");
    if (!est) { msg.textContent = "Escribí el nombre del estudiante."; $("#envEst").focus(); return; }
    if (!cur) { msg.textContent = "Escribí el curso."; $("#envCur").focus(); return; }
    try { localStorage.setItem("qst_envio", JSON.stringify({ estudiante: est, curso: cur, docente: doc })); } catch(e) {}
    mostrarTarjeta(est, cur, doc);
  };
}

function mostrarTarjeta(est, cur, doc) {
  const total = estado.aciertos + estado.errores; const pct = total > 0 ? Math.round(estado.aciertos / total * 100) : 0;
  const ahora = new Date(); const fecha = ahora.toLocaleDateString("es-AR") + " " + ahora.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  const cv = document.createElement("canvas"); cv.width = 720; cv.height = 980; const ctx = cv.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, cv.height); g.addColorStop(0, "#dbeafe"); g.addColorStop(1, "#fef3c7");
  ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.fillStyle = "#1e3a8a"; ctx.font = "800 40px 'Baloo 2', sans-serif"; ctx.textAlign = "center"; ctx.fillText(META.titulo, 360, 80);
  ctx.font = "600 26px 'Baloo 2', sans-serif"; ctx.fillStyle = "#3b82f6"; ctx.fillText(META.subtitulo || "", 360, 118);
  ctx.fillStyle = "#fff"; ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 3; roundRect(ctx, 40, 160, 640, 700, 22); ctx.fill(); ctx.stroke();
  ctx.fillStyle = "#1e3a8a"; ctx.font = "700 26px 'Baloo 2', sans-serif"; ctx.textAlign = "left";
  let y = 220;
  const linea = function (k, v) {
    ctx.fillStyle = "#475569"; ctx.font = "600 22px 'Baloo 2', sans-serif"; ctx.fillText(k, 70, y);
    ctx.fillStyle = "#1e3a8a"; ctx.font = "800 24px 'Baloo 2', sans-serif"; ctx.fillText(v, 70, y + 30);
    y += 68;
  };
  linea("Estudiante", est); linea("Curso", cur); if (doc) linea("Docente", doc); linea("Grado / Área", META.area);
  linea("✅ Aciertos", String(estado.aciertos)); linea("❌ Errores", String(estado.errores)); linea("📊 Porcentaje", pct + "%");
  linea("⭐ Puntos", String(estado.puntos)); linea("Intento", "#" + estado.intento); linea("Fecha y hora", fecha);
  ctx.fillStyle = "#94a3b8"; ctx.font = "600 20px 'Baloo 2', sans-serif"; ctx.textAlign = "center"; ctx.fillText("QueSepanTodos.com · Profe Gustavo Aguilar", 360, 920);
  const modal = $("#modalEnvio");
  cv.toBlob(function (blob) {
    if (!blob) { modal.hidden = true; return; }
    const url = URL.createObjectURL(blob);
    const texto = "Mi tarea — " + META.titulo + "\nEstudiante: " + est + "\nCurso: " + cur + (doc ? "\nDocente: " + doc : "") + "\nÁrea: " + META.area + "\n✅ " + estado.aciertos + " · ❌ " + estado.errores + " · " + pct + "% · ⭐ " + estado.puntos + "\nFecha: " + fecha + "\nQueSepanTodos.com · Profe Gustavo Aguilar";
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], "tarea.png", { type: "image/png" })] })) {
      navigator.share({ files: [new File([blob], "tarea.png", { type: "image/png" })], title: "Mi tarea — " + META.titulo, text: texto }).catch(function () { mostrarFallback(url, texto, modal); }); modal.hidden = true;
    } else { mostrarFallback(url, texto, modal); }
  }, "image/png");
}
function mostrarFallback(url, texto, modal) {
  modal.innerHTML =
    '<div class="envio-card">' +
      '<h3>Tu tarjeta de tarea</h3>' +
      '<div class="tarjeta-wrap"><img src="' + url + '" style="max-width:100%;border-radius:10px;border:1px solid #e2e8f0"></div>' +
      '<p style="font-size:13px;color:#475569;text-align:center">Mantené apretada la imagen para guardarla o sacá una captura.</p>' +
      '<div class="tarjeta-botones">' +
        '<a class="btn-principal" style="text-decoration:none;text-align:center" target="_blank" href="https://wa.me/?text=' + encodeURIComponent(texto) + '">💬 WhatsApp</a>' +
        '<a class="btn-sec" style="text-decoration:none;text-align:center" download="tarea.png" href="' + url + '">⬇️ Guardar</a>' +
      '</div>' +
      '<button class="btn-sec" id="cerrarEnvio" style="margin-top:10px">✕ Cerrar</button>' +
    '</div>';
  $("#cerrarEnvio").onclick = function () { modal.hidden = true; };
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

document.addEventListener("keydown", function (e) {
  const t = window._teclado; if (!t || !t.activo) return;
  if (e.key === "Backspace") { e.preventDefault(); t.borrar(); return; }
  if (e.key === "Enter") { e.preventDefault(); t.verificar(); return; }
  if (e.key.length === 1) { const k = e.key.toLowerCase(); if (/^[a-zñ]$/i.test(k)) { e.preventDefault(); t.insertar(k); } }
});

actualizarStats();
render();