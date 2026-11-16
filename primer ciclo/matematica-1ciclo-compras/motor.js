/* =========================================================
   MOTOR — Nuestras compras · Higiene Personal
   ========================================================= */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
const pantalla = $("#pantalla");
const META = window.DATOS.meta;
const AUDIOS = window.DATOS.audios;
const PANTALLAS = window.DATOS.pantallas;
const estado = { indice: 0, aciertos: 0, errores: 0, puntos: 0, intento: 1, yaEvaluado: {} };
const R = {};
let tokenRender = 0;
function autoAvanzar(fn, ms) { const t = tokenRender; setTimeout(function () { if (t === tokenRender) fn(); }, ms || 900); }

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

let colaAudio = [], reproduciendo = false, audioActual = null, genAudio = 0, ARRANCO = false;
let _voz = null; try { _voz = new Audio(); } catch(e) {}
function encolar(key, onEnd) {
  if (!key) { if (onEnd) setTimeout(onEnd, 0); return; }
  colaAudio.push({ key, onEnd });
  if (!reproduciendo) _siguienteEnCola();
}
function _siguienteEnCola() {
  if (colaAudio.length === 0) { reproduciendo = false; return; }
  reproduciendo = true;
  const item = colaAudio.shift(); const miGen = genAudio; const texto = AUDIOS[item.key] || "";
  let audio = _voz; if (audio) { try { audio.onended = null; audio.onerror = null; audio.src = "audio/" + item.key + ".mp3"; } catch(e) { audio = null; } }
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
  if (audioActual) { try { audioActual.pause(); audioActual.onended = null; audioActual.onerror = null; } catch(e) {} audioActual = null; }
  if ("speechSynthesis" in window) try { window.speechSynthesis.cancel(); } catch(e) {}
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
function actualizarStats() { $("#sA").textContent = estado.aciertos; $("#sE").textContent = estado.errores; $("#sP").textContent = estado.puntos; }

function htmlAfiche(letraAfiche) {
  const src = letraAfiche === "A" ? "img/afiche_a.jpg" : "img/afiche_b.jpg";
  return `
    <div class="afiche-wrapper">
      <img src="${src}" class="afiche-img" onclick="abrirLightbox('${src}', false)">
      <div class="afiche-hint" onclick="abrirLightbox('${src}', false)">🔍 Tocá el afiche para ampliar</div>
    </div>`;
}

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
  if (ARRANCO) { encolar("portada"); return; }
  if (document.getElementById("bArranque")) return;
  const arr = document.createElement("button"); arr.className = "arranque"; arr.id = "bArranque";
  arr.innerHTML = '<span class="arr-ico">🔊</span><span>Tocá para empezar</span>';
  arr.onclick = function () { ARRANCO = true; _ctxAudio(); arr.remove(); encolar("portada"); };
  document.body.appendChild(arr);
};

R.opcionMultiple = function (p) {
  const items = shuffle(p.items.slice());
  let idx = 0;
  const render = function () {
    const it = items[idx]; const opciones = shuffle(it.opciones.slice()); const cortas = opciones.every(function (o) { return o.length <= 12; });
    tokenRender++;
    pantalla.innerHTML =
      '<div class="pantalla opcion-multiple' + (p.mostrarAfiche ? ' con-afiche' : '') + '">' +
        (p.mostrarAfiche ? '<div class="col-afiche">' + htmlAfiche(p.mostrarAfiche) + '</div><div class="col-juego">' : '') +
        (it.pregunta ? '<div class="pregunta">' + it.pregunta + '</div>' : '') +
        '<div class="opciones ' + (cortas ? 'cortas' : 'largas') + '">' +
          opciones.map(function (o) { return '<button class="opcion" data-v="' + o.replace(/"/g,'&quot;') + '">' + o + '</button>'; }).join("") +
        '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>' + (idx < items.length - 1 ? 'Siguiente ▶' : 'Continuar ▶') + '</button>' +
        (p.mostrarAfiche ? '</div>' : '') +
      '</div>';
    const key = 'om_' + p._id + '_' + idx;
    pararAudio(); pantalla.classList.add("bloqueado");
    const cola = []; if (idx === 0 && p.audioInstr) cola.push(p.audioInstr); 
    if (idx === 0 && p.audioAfiche && p.mostrarAfiche) cola.push(p.audioAfiche);
    if (it.audioPregunta) cola.push(it.audioPregunta);
    if (cola.length === 0) { setTimeout(function () { pantalla.classList.remove("bloqueado"); }, 150); }
    else { let pendientes = cola.length; cola.forEach(function (k) { encolar(k, function () { pendientes--; if (pendientes === 0) pantalla.classList.remove("bloqueado"); }); }); }
    
    let respondido = false;
    $$(".opcion").forEach(function (btn) {
      btn.onclick = function () {
        if (respondido) return;
        const valor = btn.dataset.v; const ok = valor === it.correcta;
        
        if (ok) {
          respondido = true;
          btn.classList.add("ok"); 
          $$(".opcion").forEach(function (b) { b.disabled = true; }); 
          if (!estado.yaEvaluado[key]) { estado.yaEvaluado[key] = true; estado.aciertos++; estado.puntos += META.puntosPorAcierto; actualizarStats(); }
          sfxOk();
          encolar(it.audioOk, function () { $("#btnSig").disabled = false; autoAvanzar(function () { $("#btnSig").click(); }); });
        } else {
          btn.classList.add("err"); sfxErr();
          btn.disabled = true; 
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
      '<div class="pantalla escribir' + (p.mostrarAfiche ? ' con-afiche' : '') + '">' +
        (p.mostrarAfiche ? '<div class="col-afiche">' + htmlAfiche(p.mostrarAfiche) + '</div><div class="col-juego">' : '') +
        '<div class="pregunta">' + it.textoPregunta + '</div>' +
        '<div class="casilleros" id="casilleros">' + Array.from({length: largo}).map(function(_, i){ return '<div class="casillero" data-i="' + i + '"></div>'; }).join("") + '</div>' +
        '<div class="teclado" id="teclado">' +
          filas.map(function (fila, j) {
            const letrasFila = fila.map(function (l) { return '<button class="tecla" data-l="' + l + '">' + l + '</button>'; }).join("");
            const extras = (j === 2) ? '<button class="tecla tecla-borrar" id="tBorrar">⌫</button><button class="tecla tecla-verificar" id="tVerificar" disabled>✓</button>' : "";
            return '<div class="teclado-fila">' + letrasFila + extras + '</div>';
          }).join("") +
        '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>' + (idx < items.length - 1 ? 'Siguiente ▶' : 'Continuar ▶') + '</button>' +
        (p.mostrarAfiche ? '</div>' : '') +
      '</div>';
    tokenRender++;
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
        $$(".tecla").forEach(function (b) { b.disabled = true; }); encolar(it.audioOk, function () { $("#btnSig").disabled = false; autoAvanzar(function () { $("#btnSig").click(); }); });
      } else {
        sfxErr(); const cas = $("#casilleros"); cas.classList.add("err");
        encolar(it.audioErr, function () { setTimeout(function () { cas.classList.remove("err"); letras = []; actualizar(); }, 400); });
      }
    };
    $$(".tecla[data-l]").forEach(function (b) { b.onclick = function () { insertar(b.dataset.l); }; });
    $("#tBorrar").onclick = borrar; $("#tVerificar").onclick = verificar;
    window._teclado = { insertar, borrar, verificar, activo: true };
    actualizar(); pararAudio(); pantalla.classList.add("bloqueado");
    const cola = []; if (idx === 0 && p.audioInstr) cola.push(p.audioInstr); 
    if (idx === 0 && p.audioAfiche && p.mostrarAfiche) cola.push(p.audioAfiche);
    if (it.audioPregunta) cola.push(it.audioPregunta);
    if (cola.length === 0) { setTimeout(function () { pantalla.classList.remove("bloqueado"); }, 150); }
    else { let pendientes = cola.length; cola.forEach(function (k) { encolar(k, function () { pendientes--; if (pendientes === 0) pantalla.classList.remove("bloqueado"); }); }); }
    $("#btnSig").onclick = function () { window._teclado = null; if (idx < items.length - 1) { idx++; render(); } else siguientePantalla(); };
  };
  render();
};

R.sopaDeLetras = function (p) {
  const size = 10;
  const grid = Array(size).fill(null).map(() => Array(size).fill(""));
  const dirs = [[0,1], [1,0], [1,1]];
  const puestas = [];
  
  const ordenDirs = shuffle(dirs.slice());
  p.palabras.forEach((w, wi) => {
    let wNorm = norm(w); let placed = false; let attempts = 0;
    while (!placed && attempts < 300) {
      let dir = attempts < 150 ? ordenDirs[wi % ordenDirs.length] : dirs[Math.floor(Math.random() * dirs.length)]; let row = Math.floor(Math.random() * size); let col = Math.floor(Math.random() * size); let fits = true;
      for (let i = 0; i < wNorm.length; i++) {
        let r = row + i * dir[0]; let c = col + i * dir[1];
        if (r >= size || c >= size || (grid[r][c] !== "" && grid[r][c] !== wNorm[i])) { fits = false; break; }
      }
      if (fits) {
        for (let i = 0; i < wNorm.length; i++) { grid[row + i * dir[0]][col + i * dir[1]] = wNorm[i]; }
        puestas.push({ palabra: w, norm: wNorm, row, col, dir, found: false }); placed = true;
      }
      attempts++;
    }
  });

  const letras = "abcdefghijklmnñopqrstuvwxyz";
  for (let r = 0; r < size; r++) { for (let c = 0; c < size; c++) { if (grid[r][c] === "") grid[r][c] = letras[Math.floor(Math.random() * letras.length)]; } }

  let seleccionados = [];
  
  const updateUI = () => {
    const gridHtml = grid.map((fila, r) => fila.map((l, c) => `<div class="sopa-celda" data-r="${r}" data-c="${c}">${l}</div>`).join("")).join("");
    
    pantalla.innerHTML = 
      '<div class="pantalla sopa">' +
        '<div class="pregunta" style="margin:0;">Encontrá los productos</div>' +
        '<div class="sopa-layout">' +
          '<div class="sopa-afiche-col">' + htmlAfiche(p.mostrarAfiche) + '</div>' +
          '<div class="sopa-grid-col">' +
            '<div class="sopa-grid" style="grid-template-columns:repeat(' + size + ', 1fr);">' + gridHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>Continuar ▶</button>' +
      '</div>';

    $$(".sopa-celda").forEach(el => {
      el.onclick = () => {
        if (el.classList.contains("ok")) return;
        if (seleccionados.length === 2) {
          seleccionados.forEach(s => { const prev = $(`.sopa-celda[data-r="${s.r}"][data-c="${s.c}"]`); if (prev) prev.classList.remove("sel", "inicio"); });
          seleccionados = [];
        }
        el.classList.add("sel"); seleccionados.push({ r: parseInt(el.dataset.r), c: parseInt(el.dataset.c) });
        if (seleccionados.length === 1) { el.classList.add("inicio"); } else if (seleccionados.length === 2) { checkSelection(); }
      };
    });
  };

  const checkSelection = () => {
    const a = seleccionados[0]; const b = seleccionados[1]; let dr = b.r - a.r; let dc = b.c - a.c;
    if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
      let len = Math.max(Math.abs(dr), Math.abs(dc)) + 1; let stepR = dr === 0 ? 0 : dr / Math.abs(dr); let stepC = dc === 0 ? 0 : dc / Math.abs(dc);
      let str = "";
      for (let i = 0; i < len; i++) { let r = a.r + i * stepR; let c = a.c + i * stepC; str += grid[r][c]; }
      const match = puestas.find(pz => !pz.found && (pz.norm === str || pz.norm.split('').reverse().join('') === str));
      if (match) {
        match.found = true;
        for (let i = 0; i < len; i++) {
          let r = a.r + i * stepR; let c = a.c + i * stepC;
          const celda = $(`.sopa-celda[data-r="${r}"][data-c="${c}"]`); celda.classList.remove("sel", "inicio"); celda.classList.add("ok");
        }
        seleccionados = []; sfxOk();
        const idxWord = p.palabras.indexOf(match.palabra); encolar(p.audiosOk[idxWord] || "a6_1");
        if (puestas.every(x => x.found)) {
          const key = 'sl_' + p._id;
          if (!estado.yaEvaluado[key]) { estado.yaEvaluado[key] = true; estado.aciertos += p.palabras.length; estado.puntos += p.palabras.length * META.puntosPorAcierto; actualizarStats(); }
          $("#btnSig").disabled = false;
        }
      } else {
        sfxErr();
        setTimeout(() => { seleccionados.forEach(s => { const prev = $(`.sopa-celda[data-r="${s.r}"][data-c="${s.c}"]`); if (prev) prev.classList.remove("sel", "inicio"); }); seleccionados = []; }, 400);
      }
    } else {
      seleccionados.forEach(s => { const prev = $(`.sopa-celda[data-r="${s.r}"][data-c="${s.c}"]`); if (prev) prev.classList.remove("sel", "inicio"); }); seleccionados = [];
    }
  };

  updateUI(); 
  const ajustarSopa = () => {
    const g = $(".sopa-grid"); if (!g) { window.removeEventListener("resize", ajustarSopa); return; }
    const col = $(".sopa-grid-col"); const disp = Math.min(col.clientWidth, col.clientHeight || col.clientWidth);
    g.style.width = disp + "px"; g.style.height = disp + "px";
    const celda = disp / size; g.style.fontSize = Math.round(celda * 0.62) + "px";
  };
  requestAnimationFrame(ajustarSopa); window.addEventListener("resize", ajustarSopa);
  pararAudio(); pantalla.classList.add("bloqueado");
  encolar(p.audioInstr, function () { if (!p.audioAfiche) pantalla.classList.remove("bloqueado"); });
  if (p.audioAfiche) encolar(p.audioAfiche, function () { pantalla.classList.remove("bloqueado"); });
  $("#btnSig").onclick = siguientePantalla;
};

R.cuentaVertical = function (p) {
  let idx = 0;
  const render = function () {
    const it = p.items[idx];
    pantalla.innerHTML =
      '<div class="pantalla opcion-multiple">' +
        '<div class="pregunta">' + it.contexto + '</div>' +
        '<div class="cuenta-container" id="cuentas">' +
          '<div class="cuenta-opcion" data-idx="0"><div>' + it.cuenta1.a + '</div><div>' + it.cuenta1.op + ' ' + it.cuenta1.b + '</div><div class="linea"></div><div class="resultado" id="res-0"></div></div>' +
          '<div class="cuenta-opcion" data-idx="1"><div>' + it.cuenta2.a + '</div><div>' + it.cuenta2.op + ' ' + it.cuenta2.b + '</div><div class="linea"></div><div class="resultado" id="res-1"></div></div>' +
        '</div>' +
        '<div class="resultado-pregunta" id="pregResultado" style="display:none;">El resultado es: <span id="huecoResultado" style="display:inline-block; min-width:80px; border-bottom:2px solid #1e3a8a; height:1.5em;"></span></div>' +
        '<div class="opciones cortas" id="opcionesResultado" style="display:none; margin-top:2vh;">' +
          it.opcionesResultado.map(function(o){ return '<button class="opcion" data-res="'+o+'">'+o+'</button>'; }).join("") +
        '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>' + (idx < p.items.length - 1 ? 'Siguiente ▶' : 'Continuar ▶') + '</button>' +
      '</div>';

    const key = 'cv_' + p._id + '_' + idx;
    pararAudio(); pantalla.classList.add("bloqueado");
    const cola = []; if (idx === 0 && p.audioInstr) cola.push(p.audioInstr); if (it.audioPregunta) cola.push(it.audioPregunta);
    if (p.audioElegirCuenta) cola.push(p.audioElegirCuenta);
    if (cola.length === 0) { setTimeout(function () { pantalla.classList.remove("bloqueado"); }, 150); }
    else { let pendientes = cola.length; cola.forEach(function (k) { encolar(k, function () { pendientes--; if (pendientes === 0) pantalla.classList.remove("bloqueado"); }); }); }

    let cuentaElegida = false;
    let procesandoResultado = false;
    
    $$(".cuenta-opcion").forEach(btn => {
      btn.onclick = function (e) {
        e.preventDefault();
        if (cuentaElegida) return;
        
        const container = $("#cuentas");
        container.classList.add("bloqueado");

        const op = parseInt(btn.dataset.idx);
        if (op === it.correcta) {
          cuentaElegida = true;
          btn.classList.add("ok");
          sfxOk();
          if (!estado.yaEvaluado[key+'_c']) { estado.yaEvaluado[key+'_c'] = true; estado.aciertos++; actualizarStats(); }
          encolar(it.audioCuentaOk, function() {
            $("#pregResultado").style.display = "flex";
            const ops = $("#opcionesResultado"); ops.style.display = "grid";
            if (p.audioElegirResultado) { ops.classList.add("bloqueado"); encolar(p.audioElegirResultado, function () { ops.classList.remove("bloqueado"); }); }
          });
        } else {
          btn.classList.add("err");
          sfxErr();
          if (!estado.yaEvaluado[key+'_c']) { estado.yaEvaluado[key+'_c'] = true; estado.errores++; actualizarStats(); }
          encolar(it.audioCuentaErr, function() {
            setTimeout(() => { btn.classList.remove("err"); container.classList.remove("bloqueado"); }, 400);
          });
        }
      };
    });

    $("#opcionesResultado").addEventListener("click", function(e) {
      if (e.target.tagName !== "BUTTON" || procesandoResultado) return;
      const val = e.target.dataset.res;
      const num = parseInt(val.replace("$",""));
      if (num === it.resultado) {
        procesandoResultado = true;
        e.target.classList.add("ok");
        $$("#opcionesResultado .opcion").forEach(b => b.disabled = true);
        sfxOk();
        $("#huecoResultado").textContent = num;
        $("#huecoResultado").style.color = "#16a34a";
        $("#huecoResultado").style.fontWeight = "800";
        $("#huecoResultado").style.borderBottom = "none";
        const correctaBtn = $(`.cuenta-opcion[data-idx="${it.correcta}"] .resultado`);
        if (correctaBtn) correctaBtn.textContent = num;
        if (!estado.yaEvaluado[key+'_res']) {
          estado.yaEvaluado[key+'_res'] = true;
          estado.aciertos++; estado.puntos += META.puntosPorAcierto;
          actualizarStats();
        }
        encolar(it.audioResultadoOk, function() { $("#btnSig").disabled = false; });
      } else {
        sfxErr();
        e.target.classList.add("err");
        if (!estado.yaEvaluado[key+'_res']) { estado.yaEvaluado[key+'_res'] = true; estado.errores++; actualizarStats(); }
        encolar(it.audioResultadoErr, function() {
          setTimeout(() => e.target.classList.remove("err"), 400);
        });
      }
    });

    $("#btnSig").onclick = function () { if (idx < p.items.length - 1) { idx++; render(); } else siguientePantalla(); };
  };
  render();
};

R.ordenar = function (p) {
  let idx = 0;
  const render = function () {
    const it = p.items[idx]; const correctas = it.palabras.map(function (w) { return w.toLowerCase(); }); const total = correctas.length;
    const piezas = it.palabras.map(function (w, i) {
      const disp = (i === 0) ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase();
      const sufijo = (i === total - 1) ? "." : "";
      return { w: w.toLowerCase(), display: disp + sufijo, id: i };
    });
    const pool = shuffle(piezas.slice());
    pantalla.innerHTML =
      '<div class="pantalla ordenar">' +
        '<img class="escena-ordenar" src="' + it.imagen + '" alt="">' +
        '<div class="oracion-zona" id="oracion"><span class="ph">Armá la oración tocando las palabras en orden…</span></div>' +
        '<div class="pool" id="pool">' + pool.map(function (pz) { return '<button class="pieza" data-id="' + pz.id + '" data-w="' + pz.w + '">' + pz.display + '</button>'; }).join("") + '</div>' +
        '<button class="btn-siguiente" id="btnSig" disabled>' + (idx < p.items.length - 1 ? 'Siguiente ▶' : 'Continuar ▶') + '</button>' +
      '</div>';
    const armado = []; const evaluadas = {}; const key = 'or_' + p._id + '_' + idx;
    pararAudio(); if (idx === 0 && p.audioInstr) encolar(p.audioInstr);
    const pintar = function () {
      const z = $("#oracion");
      if (armado.length === 0) { z.innerHTML = '<span class="ph">Armá la oración tocando las palabras en orden…</span>'; return; }
      const partes = armado.map(function (pz, i) { let d = pz.w; if (i === 0) d = d.charAt(0).toUpperCase() + d.slice(1); return d; });
      z.innerHTML = partes.join(" ");
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
            const z = $("#oracion"); let txt = armado.map(function (pz, i) { let d = pz.w; if (i === 0) d = d.charAt(0).toUpperCase() + d.slice(1); return d; }).join(" ");
            z.innerHTML = txt + "."; z.classList.add("ok"); encolar(it.oracionAudio, function () { $("#btnSig").disabled = false; });
          }
        } else { sfxErr(); btn.classList.add("err"); setTimeout(function () { btn.classList.remove("err"); }, 400); }
      };
    });
    $("#btnSig").onclick = function () { if (idx < p.items.length - 1) { idx++; render(); } else siguientePantalla(); };
  };
  render();
};

R.narracionAnimada = function (p) {
  const pasos = p.pasos;
  pantalla.innerHTML =
    '<div class="pantalla narracion">' +
      '<div class="narracion-escena" id="escena">' +
        '<div class="narracion-puntero" id="puntero">👉</div>' +
        pasos.map(function (s, i) { return '<div class="narracion-paso" data-i="' + i + '">' + s.html + '</div>'; }).join("") +
      '</div>' +
      '<button class="btn-siguiente" id="btnSig" disabled>Continuar ▶</button>' +
    '</div>';
  const mostrarPaso = function (i) {
    $$(".narracion-paso").forEach(function (el) { el.classList.remove("activo"); });
    const el = $('.narracion-paso[data-i="' + i + '"]');
    if (el) {
      el.classList.add("activo"); const rect = el.getBoundingClientRect(); const esc = $("#escena").getBoundingClientRect(); const ptr = $("#puntero");
      ptr.style.left = (rect.left - esc.left + rect.width / 2 - 22) + "px"; ptr.style.top = (rect.top - esc.top - 44) + "px";
    }
    encolar(pasos[i].audio, function () { if (i < pasos.length - 1) mostrarPaso(i + 1); else $("#btnSig").disabled = false; });
  };
  setTimeout(function () { mostrarPaso(0); }, 200);
  $("#btnSig").onclick = siguientePantalla;
};

R.cierre = function () {
  const total = estado.aciertos + estado.errores; const pct = total > 0 ? Math.round(estado.aciertos / total * 100) : 0;
  pantalla.innerHTML =
    '<div class="pantalla cierre">' +
      '<img class="portada-img" src="img/portada.jpg" alt="" onclick="abrirLightbox(\'img/portada.jpg\', true)">' +
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

function irA(i) { tokenRender++; pararAudio(); estado.indice = i; render(); }
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