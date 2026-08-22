// ============================================================
// MOTOR — Teo cuenta y suma
// ============================================================

const app = document.getElementById("app");

const estado = {
  idx: -1, // -1 = portada
  aciertos: 0,
  errores: 0,
  puntos: 0
};

// ---------------- COLA GLOBAL DE AUDIO ----------------
let colaAudio = [];
let audioActual = null;
let generacionAudio = 0;

function limpiarCola() {
  generacionAudio++;
  if (audioActual) { audioActual.onended = null; audioActual.onerror = null; audioActual.pause(); }
  colaAudio = [];
  audioActual = null;
}

function encolarAudio(...srcs) {
  srcs.filter(Boolean).forEach(src => colaAudio.push(src));
}

function reproducirCola(onFinCola) {
  const miGeneracion = generacionAudio;
  const paso = () => {
    if (miGeneracion !== generacionAudio) return; // pantalla cambió, se cancela
    if (colaAudio.length === 0) { if (onFinCola) onFinCola(); return; }
    const src = colaAudio.shift();
    audioActual = new Audio(src);
    const finalizar = () => { if (miGeneracion === generacionAudio) paso(); };
    audioActual.onended = finalizar;
    audioActual.onerror = finalizar; // nunca se pierde el callback
    audioActual.play().catch(finalizar);
  };
  paso();
}

// ---------------- SHUFFLE ----------------
function mezclar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------- BOTÓN SIGUIENTE ----------------
function crearBarraInferior(onSiguiente) {
  const barra = document.createElement("div");
  barra.className = "barra-inferior";
  const btn = document.createElement("button");
  btn.className = "btn-siguiente";
  btn.textContent = "Siguiente ➜";
  btn.disabled = true;
  btn.onclick = onSiguiente;
  barra.appendChild(btn);
  return { barra, btn };
}

function desbloquear(btn) { btn.disabled = false; }

// ---------------- BOTÓN ALTAVOZ (repetir consigna en cualquier pantalla) ----------------
function crearBotonAltavoz(audioSrc, onFin) {
  const btn = document.createElement("button");
  btn.className = "btn-altavoz";
  btn.id = "btnAltavoz";
  btn.textContent = "🔊";
  btn.onclick = () => {
    limpiarCola();
    encolarAudio(audioSrc);
    reproducirCola(onFin);
  };
  return btn;
}

// ---------------- NAVEGACIÓN ----------------
function avanzar() {
  estado.idx++;
  render();
}

function reiniciarPaquete() {
  estado.idx = -1;
  estado.aciertos = 0;
  estado.errores = 0;
  estado.puntos = 0;
  render();
}

// ---------------- RENDER PRINCIPAL ----------------
function render() {
  limpiarCola();
  app.innerHTML = "";

  if (estado.idx === -1) return renderPortada();
  if (estado.idx >= PACKAGE.pantallas.length) return renderCierre();

  const pantalla = PACKAGE.pantallas[estado.idx];
  const dispatch = {
    camino: renderCamino,
    demoCamino: renderDemoCamino,
    demoConteo: renderDemoConteo,
    opcionMultiple: renderOpcionMultiple,
    compararNumeros: renderCompararNumeros,
    ordenar: renderOrdenar,
    pictogramaCompletar: renderPictogramaCompletar
  };
  (dispatch[pantalla.tipo] || renderDesconocido)(pantalla);
}

function renderDesconocido(p) {
  app.innerHTML = `<p>Tipo de pantalla desconocido: ${p.tipo}</p>`;
}

// ---------------- BLOQUE PERFIL (portada / cierre) ----------------
function bloquePerfil() {
  const cont = document.createElement("div");
  cont.className = "bloque-perfil";
  cont.innerHTML = `
    <img src="${PERFIL.foto}" class="foto-perfil" alt="Foto de perfil" />
    <div class="datos-perfil">
      <div>${PERFIL.nombre}</div>
      <div>✉️ ${PERFIL.mail}</div>
    </div>
  `;
  const foto = cont.querySelector(".foto-perfil");
  foto.onclick = () => abrirLightbox();
  return cont;
}

function abrirLightbox() {
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <button class="lightbox-cerrar">✕</button>
    <img src="${PERFIL.foto}" class="lightbox-img" alt="Foto de perfil" />
    <div class="lightbox-tagline">${PERFIL.tagline}</div>
  `;
  lb.querySelector(".lightbox-cerrar").onclick = () => lb.remove();
  document.body.appendChild(lb);
}

// ---------------- PORTADA ----------------
function renderPortada() {
  const p = PACKAGE.portada;
  const cont = document.createElement("div");
  cont.className = "pantalla portada";
  cont.innerHTML = `
    <img src="${p.imagen}" class="imagen-portada" alt="Portada" />
    <h1>${p.titulo}</h1>
    <p class="subtitulo">${p.subtitulo}</p>
    <button class="btn-speaker" id="btnSpeakerPortada">🔊</button>
    <button class="btn-comenzar">Comenzar ▶</button>
  `;
  const fila = document.createElement("div");
  fila.className = "fila-portada";
  fila.appendChild(cont.querySelector(".btn-comenzar"));
  fila.appendChild(bloquePerfil());
  cont.appendChild(fila);
  app.appendChild(cont);

  cont.querySelector("#btnSpeakerPortada").onclick = () => {
    limpiarCola();
    encolarAudio(p.audio);
    reproducirCola();
  };
  cont.querySelector(".btn-comenzar").onclick = avanzar;
}

// ---------------- CIERRE ----------------
function renderCierre() {
  const p = PACKAGE.cierre;
  const total = estado.aciertos + estado.errores;
  const pct = total > 0 ? Math.round((estado.aciertos / total) * 100) : 0;
  const cont = document.createElement("div");
  cont.className = "pantalla cierre";
  cont.innerHTML = `
    <img src="${p.imagen}" class="imagen-cierre" alt="Cierre" />
    <h1>¡Terminaste la actividad, Teo te felicita!</h1>
    <p>✅ Aciertos: ${estado.aciertos}</p>
    <p>❌ Errores: ${estado.errores}</p>
    <p>📊 % de aciertos: ${pct}%</p>
    <p>⭐ Puntos: ${estado.puntos}</p>
    <button class="btn-volver">🔄 Volver a jugar</button>
  `;
  cont.appendChild(bloquePerfil());
  app.appendChild(cont);

  cont.querySelector(".btn-volver").onclick = reiniciarPaquete;

  encolarAudio(p.audio);
  reproducirCola();
}

// Construye la pista reutilizable por la pantalla real de "camino" y por
// la pantalla demostrativa. Se adapta al ancho real disponible: en pantallas
// grandes (PC/notebook) entra todo en una sola fila recta; en pantallas
// angostas (celular) se arma en serpiente (filas alternadas) para que entre
// completo sin scroll horizontal.
function construirCaminoPista(pista, pasos, animalito, iconoAnimalito, espejarIcono) {
  pista.innerHTML = `<div class="camino-teo" id="teo">🐢</div>`;

  const ANCHO_CASILLERO = 48; // 42px de casillero + 6px de gap
  const ANCHO_INICIO = 48;
  const ANCHO_DESTINO = 96;
  const anchoDisponible = pista.clientWidth || 320;
  const anchoNecesarioUnaFila = ANCHO_INICIO + pasos * ANCHO_CASILLERO + ANCHO_DESTINO;
  const COLUMNAS = anchoNecesarioUnaFila <= anchoDisponible ? pasos : 5;

  const filasCont = document.createElement("div");
  filasCont.className = "camino-filas";
  pista.appendChild(filasCont);

  const inicio = document.createElement("div");
  inicio.className = "casillero-inicio";
  inicio.textContent = "🚩";

  let pasoActualIdx = 1;
  let filaIdx = 0;
  let primeraFila = true;
  while (pasoActualIdx <= pasos || primeraFila) {
    const fila = document.createElement("div");
    fila.className = "camino-fila" + (filaIdx % 2 === 1 ? " fila-impar" : "");
    if (primeraFila) fila.appendChild(inicio);
    let enEstaFila = 0;
    while (enEstaFila < COLUMNAS && pasoActualIdx <= pasos) {
      const casillero = document.createElement("div");
      casillero.className = "casillero";
      casillero.dataset.paso = pasoActualIdx;
      fila.appendChild(casillero);
      pasoActualIdx++;
      enEstaFila++;
    }
    if (pasoActualIdx > pasos) {
      const animalitoDiv = document.createElement("div");
      animalitoDiv.className = "camino-destino";
      if (iconoAnimalito) {
        const claseEspejo = espejarIcono ? " icono-espejado" : "";
        animalitoDiv.innerHTML = `<img src="${iconoAnimalito}" class="camino-destino-img${claseEspejo}" alt="${animalito}" />`;
      } else {
        animalitoDiv.textContent = "🏁";
      }
      fila.appendChild(animalitoDiv);
    }
    filasCont.appendChild(fila);
    filaIdx++;
    primeraFila = false;
    if (enEstaFila === 0 && pasoActualIdx > pasos) break;
  }
  return { inicio };
}

function moverElementoA(pista, elemento, destino) {
  const pistaRect = pista.getBoundingClientRect();
  const elRect = elemento.getBoundingClientRect();
  destino.style.left = (elRect.left - pistaRect.left) + "px";
  destino.style.top = (elRect.top - pistaRect.top) + "px";
  const filaDelElemento = elemento.closest(".camino-fila");
  const vaHaciaIzquierda = filaDelElemento && filaDelElemento.classList.contains("fila-impar");
  destino.style.transform = vaHaciaIzquierda ? "scaleX(1)" : "scaleX(-1)";
}

// ================================================================
// TIPO: CAMINO (juego de la oca de Teo — contar pasos exactos)
// ================================================================
function renderCamino(p) {
  const cont = document.createElement("div");
  cont.className = "pantalla camino";
  cont.innerHTML = `
    <button class="btn-altavoz" id="btnAltavoz">🔊</button>
    <h2>¿Cuántos pasos debe dar Teo para llegar hasta el ${p.animalito.toLowerCase()}?</h2>
    <div class="camino-pista" id="pista"></div>
    <div class="camino-controles">
      <button class="btn-menos" id="btnMenos">−</button>
      <span class="camino-numero" id="numeroActual">0</span>
      <button class="btn-mas" id="btnMas">+</button>
    </div>
    <button class="btn-verificar" id="btnVerificar">Verificar</button>
    <div class="camino-feedback" id="feedback"></div>
  `;
  app.appendChild(cont);

  const pista = cont.querySelector("#pista");
  const { inicio } = construirCaminoPista(pista, p.pasos, p.animalito, p.iconoAnimalito, p.espejarIcono);

  let numero = 0;
  let interaccionBloqueada = true;
  let animando = false;
  const numeroActual = cont.querySelector("#numeroActual");
  const btnMenos = cont.querySelector("#btnMenos");
  const btnMas = cont.querySelector("#btnMas");
  const btnVerificar = cont.querySelector("#btnVerificar");
  const btnAltavoz = cont.querySelector("#btnAltavoz");
  const feedback = cont.querySelector("#feedback");
  const teo = cont.querySelector("#teo");

  const { barra, btn } = crearBarraInferior(avanzar);
  app.appendChild(barra);

  function actualizarNumero() { numeroActual.textContent = numero; }

  btnMas.onclick = () => { if (!interaccionBloqueada && !animando) { numero++; actualizarNumero(); } };
  btnMenos.onclick = () => { if (!interaccionBloqueada && !animando && numero > 0) { numero--; actualizarNumero(); } };

  btnAltavoz.onclick = () => {
    if (animando) return;
    limpiarCola();
    encolarAudio(p.audioConsigna);
    reproducirCola(() => { interaccionBloqueada = false; });
  };

  btnVerificar.onclick = () => {
    if (interaccionBloqueada || animando) return;
    if (numero === p.pasos) {
      animando = true;
      estado.aciertos++; estado.puntos += 10;
      feedback.textContent = "";
      limpiarCola();
      animarPasos(1);
    } else {
      estado.errores++;
      feedback.textContent = numero < p.pasos ? "Faltan pasos, ¡Teo vuelve al inicio!" : "Sobran pasos, ¡Teo vuelve al inicio!";
      limpiarCola();
      encolarAudio(p.audioIncorrecto);
      reproducirCola();
      numero = 0;
      actualizarNumero();
      moverTeoA(inicio);
    }
  };

  function moverTeoA(elemento) { moverElementoA(pista, elemento, teo); }

  function animarPasos(pasoActual) {
    if (pasoActual > p.pasos) {
      animando = false;
      feedback.textContent = `¡Llegaste hasta el ${p.animalito.toLowerCase()} en ${p.pasos} pasos!`;
      encolarAudio(p.audioCorrecto);
      reproducirCola(() => { desbloquear(btn); avanzar(); });
      return;
    }
    const casillero = pista.querySelector(`.casillero[data-paso="${pasoActual}"]`);
    casillero.textContent = pasoActual;
    moverTeoA(casillero);
    feedback.textContent = "Paso " + pasoActual;
    // El audio del conteo ("uno", "dos"...) marca el ritmo del avance:
    // recién pasa al siguiente casillero cuando termina de decir el número.
    encolarAudio(PACKAGE.audioConteo(pasoActual));
    reproducirCola(() => animarPasos(pasoActual + 1));
  }

  // Posición inicial de Teo sobre la banderita de salida
  moverTeoA(inicio);

  // Bloqueo de interacción hasta que termine la consigna
  encolarAudio(p.audioConsigna);
  reproducirCola(() => { interaccionBloqueada = false; });
}

// ================================================================
// TIPO: DEMO CAMINO (mano señaladora enseña cómo se juega, no interactiva)
// ================================================================
function renderDemoCamino(p) {
  const cont = document.createElement("div");
  cont.className = "pantalla camino demo";
  cont.innerHTML = `
    <button class="btn-altavoz" id="btnAltavoz">🔊</button>
    <h2>Mirá cómo Teo resuelve esta actividad</h2>
    <div class="camino-pista" id="pista"></div>
    <div class="camino-controles">
      <button class="btn-menos" id="btnMenos" disabled>−</button>
      <span class="camino-numero" id="numeroActual">0</span>
      <button class="btn-mas" id="btnMas" disabled>+</button>
    </div>
    <button class="btn-verificar" id="btnVerificar" disabled>Verificar</button>
    <div class="camino-feedback" id="feedback"></div>
  `;
  app.appendChild(cont);

  const pista = cont.querySelector("#pista");
  const { inicio } = construirCaminoPista(pista, p.pasosDemo, "animalito", p.iconoAnimalito, false);
  const teo = cont.querySelector("#teo");
  const numeroActual = cont.querySelector("#numeroActual");
  const btnMas = cont.querySelector("#btnMas");
  const btnVerificar = cont.querySelector("#btnVerificar");
  const feedback = cont.querySelector("#feedback");

  const mano = document.createElement("div");
  mano.className = "mano-demo";
  mano.textContent = "👉";
  pista.appendChild(mano);

  const { barra, btn } = crearBarraInferior(avanzar);
  app.appendChild(barra);

  cont.querySelector("#btnAltavoz").onclick = () => {
    limpiarCola();
    encolarAudio(p.audioIntro);
    reproducirCola();
  };

  function moverManoA(elemento) { moverElementoA(pista, elemento, mano); }
  function pulso(elemento) {
    elemento.classList.add("presionado");
    setTimeout(() => elemento.classList.remove("presionado"), 260);
  }

  moverManoA(inicio);

  function contarCasillero(pasoActual) {
    if (pasoActual > p.pasosDemo) { return presionarMas(1); }
    const casillero = pista.querySelector(`.casillero[data-paso="${pasoActual}"]`);
    casillero.textContent = pasoActual;
    moverManoA(casillero);
    feedback.textContent = "Contando: " + pasoActual;
    encolarAudio(PACKAGE.audioConteo(pasoActual));
    reproducirCola(() => contarCasillero(pasoActual + 1));
  }

  function presionarMas(vez) {
    if (vez > p.pasosDemo) {
      feedback.textContent = "Ahora toca Verificar...";
      moverManoA(btnVerificar);
      pulso(btnVerificar);
      setTimeout(() => caminarTeo(1), 500);
      return;
    }
    moverManoA(btnMas);
    pulso(btnMas);
    numeroActual.textContent = vez;
    setTimeout(() => presionarMas(vez + 1), 500);
  }

  function caminarTeo(pasoActual) {
    if (pasoActual > p.pasosDemo) {
      feedback.textContent = "¡Así se hace! Ahora te toca a vos.";
      encolarAudio(p.audioCorrecto);
      reproducirCola(() => desbloquear(btn));
      return;
    }
    const casillero = pista.querySelector(`.casillero[data-paso="${pasoActual}"]`);
    moverElementoA(pista, casillero, teo);
    feedback.textContent = "Paso " + pasoActual;
    encolarAudio(PACKAGE.audioConteo(pasoActual));
    reproducirCola(() => caminarTeo(pasoActual + 1));
  }

  encolarAudio(p.audioIntro);
  reproducirCola(() => contarCasillero(1));
}

// ================================================================
// TIPO: DEMO CONTEO (mano señaladora enseña a contar objetos y elegir)
// ================================================================
function renderDemoConteo(p) {
  const cont = document.createElement("div");
  cont.className = "pantalla opcion-multiple demo";
  cont.innerHTML = `
    <button class="btn-altavoz" id="btnAltavoz">🔊</button>
    <h2>Mirá cómo se cuenta y se elige la respuesta</h2>
    <div class="demo-imagen-cont" id="imgCont">
      <img src="${p.imagen}" class="imagen-pregunta" alt="" />
      <div class="mano-demo" id="mano">👉</div>
    </div>
    <div class="opciones" id="opciones"></div>
    <div class="feedback" id="feedback"></div>
  `;
  app.appendChild(cont);

  const { barra, btn } = crearBarraInferior(avanzar);
  app.appendChild(barra);

  const imgCont = cont.querySelector("#imgCont");
  const mano = cont.querySelector("#mano");
  const contOpciones = cont.querySelector("#opciones");
  const feedback = cont.querySelector("#feedback");

  cont.querySelector("#btnAltavoz").onclick = () => {
    limpiarCola();
    encolarAudio(p.audioIntro);
    reproducirCola();
  };

  function moverManoAPunto(pct) {
    mano.style.left = pct.x + "%";
    mano.style.top = pct.y + "%";
  }

  const opcionesEls = [];
  p.opciones.forEach(op => {
    const b = document.createElement("button");
    b.className = "opcion";
    b.textContent = op.texto;
    b.disabled = true;
    contOpciones.appendChild(b);
    opcionesEls.push({ el: b, op });
  });

  function contarPunto(i) {
    if (i >= p.puntosConteo.length) {
      feedback.textContent = "";
      const correcta = opcionesEls.find(o => o.op.correcta);
      const rectOpciones = contOpciones.getBoundingClientRect();
      const rectBtn = correcta.el.getBoundingClientRect();
      mano.style.left = (rectBtn.left - imgCont.getBoundingClientRect().left + rectBtn.width/2) + "px";
      mano.style.top = (rectBtn.top - imgCont.getBoundingClientRect().top + rectBtn.height/2) + "px";
      correcta.el.classList.add("correcta");
      encolarAudio(p.audioCorrecto);
      reproducirCola(() => desbloquear(btn));
      return;
    }
    moverManoAPunto(p.puntosConteo[i]);
    feedback.textContent = "Contando: " + (i + 1);
    encolarAudio(PACKAGE.audioConteo(i + 1));
    reproducirCola(() => contarPunto(i + 1));
  }

  encolarAudio(p.audioIntro);
  reproducirCola(() => contarPunto(0));
}

// ================================================================
// TIPO: OPCIÓN MÚLTIPLE (numeración, sumas, pictogramas)
// ================================================================
function renderOpcionMultiple(p) {
  const cont = document.createElement("div");
  cont.className = "pantalla opcion-multiple";
  cont.innerHTML = `
    <h2>${p.pregunta}</h2>
    ${p.imagenPregunta ? `<img src="${p.imagenPregunta}" class="imagen-pregunta" alt="" />` : ""}
    <div class="opciones" id="opciones"></div>
    <div class="feedback" id="feedback"></div>
  `;
  app.appendChild(cont);

  let interaccionBloqueada = true;
  cont.insertBefore(crearBotonAltavoz(p.audioConsigna, () => { interaccionBloqueada = false; }), cont.firstChild);

  const { barra, btn } = crearBarraInferior(avanzar);
  app.appendChild(barra);

  const contOpciones = cont.querySelector("#opciones");
  const feedback = cont.querySelector("#feedback");
  let resuelto = false;

  const opcionesMezcladas = mezclar(p.opciones);
  opcionesMezcladas.forEach(op => {
    const b = document.createElement("button");
    b.className = "opcion";
    if (op.icono) {
      b.innerHTML = `<span class="opcion-texto">${op.texto}</span><img src="${op.icono}" class="opcion-icono" alt="" />`;
    } else {
      b.textContent = op.texto;
    }
    b.onclick = () => {
      if (interaccionBloqueada || resuelto) return;
      if (op.correcta) {
        resuelto = true;
        b.classList.add("correcta");
        estado.aciertos++; estado.puntos += 10;
        limpiarCola();
        encolarAudio(op.audio, p.audioCorrecto);
        reproducirCola(() => desbloquear(btn));
      } else {
        b.classList.add("incorrecta");
        estado.errores++;
        limpiarCola();
        encolarAudio(p.audioIncorrecto);
        reproducirCola();
      }
    };
    contOpciones.appendChild(b);
  });

  encolarAudio(p.audioConsigna);
  reproducirCola(() => { interaccionBloqueada = false; });
}

// ================================================================
// TIPO: COMPARAR NÚMEROS (mayor / menor) — varias rondas
// ================================================================
function renderCompararNumeros(p) {
  const cont = document.createElement("div");
  cont.className = "pantalla comparar-numeros";
  cont.innerHTML = `
    <h2>${p.pregunta}</h2>
    <div class="ronda-info" id="rondaInfo"></div>
    <div class="par-numeros" id="parNumeros"></div>
    <div class="feedback" id="feedback"></div>
  `;
  app.appendChild(cont);

  let interaccionBloqueada = true;
  cont.insertBefore(crearBotonAltavoz(p.audioConsigna, () => { interaccionBloqueada = false; }), cont.firstChild);

  const { barra, btn } = crearBarraInferior(avanzar);
  app.appendChild(barra);

  const rondaInfo = cont.querySelector("#rondaInfo");
  const parNumeros = cont.querySelector("#parNumeros");
  const feedback = cont.querySelector("#feedback");
  let ronda = 0;

  function pintarRonda() {
    parNumeros.innerHTML = "";
    if (ronda >= p.pares.length) {
      rondaInfo.textContent = "¡Completaste todas las rondas!";
      feedback.textContent = "";
      desbloquear(btn);
      return;
    }
    rondaInfo.textContent = `Ronda ${ronda + 1} de ${p.pares.length}`;
    const [a, b] = mezclar(p.pares[ronda]);
    const correcto = p.modo === "mayor" ? Math.max(a, b) : Math.min(a, b);
    [a, b].forEach(num => {
      const btnNum = document.createElement("button");
      btnNum.className = "burbuja-numero";
      btnNum.textContent = num;
      btnNum.onclick = () => {
        if (interaccionBloqueada) return;
        if (num === correcto) {
          estado.aciertos++; estado.puntos += 10;
          btnNum.classList.add("correcta");
          limpiarCola();
          encolarAudio(p.audioCorrecto);
          reproducirCola(() => { ronda++; pintarRonda(); });
        } else {
          estado.errores++;
          btnNum.classList.add("incorrecta");
          limpiarCola();
          encolarAudio(p.audioIncorrecto);
          reproducirCola();
        }
      };
      parNumeros.appendChild(btnNum);
    });
  }

  encolarAudio(p.audioConsigna);
  reproducirCola(() => { interaccionBloqueada = false; pintarRonda(); });
}

// ================================================================
// TIPO: ORDENAR NÚMEROS (menor a mayor, tocando en secuencia)
// ================================================================
function renderOrdenar(p) {
  const cont = document.createElement("div");
  cont.className = "pantalla ordenar";
  cont.innerHTML = `
    <h2>${p.pregunta}</h2>
    <div class="ordenar-seleccion" id="seleccion"></div>
    <div class="ordenar-numeros" id="numeros"></div>
    <div class="feedback" id="feedback"></div>
  `;
  app.appendChild(cont);

  let interaccionBloqueada = true;
  cont.insertBefore(crearBotonAltavoz(p.audioConsigna, () => { interaccionBloqueada = false; }), cont.firstChild);

  const { barra, btn } = crearBarraInferior(avanzar);
  app.appendChild(barra);

  const seleccion = cont.querySelector("#seleccion");
  const numerosCont = cont.querySelector("#numeros");
  const feedback = cont.querySelector("#feedback");

  const ordenCorrecto = p.numeros.slice().sort((a, b) => a - b);
  const numerosMezclados = mezclar(p.numeros);
  let siguienteEsperado = 0;

  numerosMezclados.forEach(num => {
    const b = document.createElement("button");
    b.className = "burbuja-numero";
    b.textContent = num;
    b.onclick = () => {
      if (interaccionBloqueada || b.disabled) return;
      if (num === ordenCorrecto[siguienteEsperado]) {
        b.disabled = true;
        b.classList.add("correcta");
        const chip = document.createElement("span");
        chip.className = "chip-numero";
        chip.textContent = num;
        seleccion.appendChild(chip);
        siguienteEsperado++;
        estado.puntos += 2;
        if (siguienteEsperado === ordenCorrecto.length) {
          estado.aciertos++;
          limpiarCola();
          encolarAudio(p.audioCorrecto);
          reproducirCola(() => desbloquear(btn));
        }
      } else {
        estado.errores++;
        feedback.textContent = "Ese no va ahí, ¡fijate cuál es el siguiente más chico!";
        limpiarCola();
        encolarAudio(p.audioError);
        reproducirCola();
      }
    };
    numerosCont.appendChild(b);
  });

  encolarAudio(p.audioConsigna);
  reproducirCola(() => { interaccionBloqueada = false; });
}

// ================================================================
// TIPO: PICTOGRAMA COMPLETAR (contar íconos y colocar el número)
// ================================================================
function renderPictogramaCompletar(p) {
  const cont = document.createElement("div");
  cont.className = "pantalla pictograma-completar";
  cont.innerHTML = `<h2>${p.pregunta}</h2><div class="categorias" id="categorias"></div>`;
  app.appendChild(cont);

  let interaccionBloqueada = true;
  cont.insertBefore(crearBotonAltavoz(p.audioConsigna, () => { interaccionBloqueada = false; }), cont.firstChild);

  const { barra, btn } = crearBarraInferior(avanzar);
  app.appendChild(barra);

  const contCategorias = cont.querySelector("#categorias");
  let resueltas = 0;

  p.categorias.forEach((cat, i) => {
    const bloque = document.createElement("div");
    bloque.className = "categoria-bloque";
    bloque.innerHTML = `
      <div class="categoria-iconos">${(cat.icono ? `<img src="${cat.icono}" class="icono-mini" alt="">`.repeat(cat.cantidad) : "🐾".repeat(cat.cantidad))}</div>
      <div class="categoria-nombre">${cat.nombre}</div>
      <div class="categoria-controles">
        <button class="btn-menos" data-i="${i}">−</button>
        <span class="categoria-numero" id="num${i}">0</span>
        <button class="btn-mas" data-i="${i}">+</button>
      </div>
      <div class="categoria-estado" id="estado${i}"></div>
    `;
    contCategorias.appendChild(bloque);

    let valor = 0;
    const spanNum = bloque.querySelector(`#num${i}`);
    const estadoDiv = bloque.querySelector(`#estado${i}`);
    let resuelta = false;

    bloque.querySelector(".btn-mas").onclick = () => {
      if (interaccionBloqueada || resuelta) return;
      valor++; spanNum.textContent = valor;
    };
    bloque.querySelector(".btn-menos").onclick = () => {
      if (interaccionBloqueada || resuelta || valor === 0) return;
      valor--; spanNum.textContent = valor;
    };

    const verificarBtn = document.createElement("button");
    verificarBtn.className = "btn-verificar-mini";
    verificarBtn.textContent = "Verificar";
    verificarBtn.onclick = () => {
      if (interaccionBloqueada || resuelta) return;
      if (valor === cat.cantidad) {
        resuelta = true;
        estadoDiv.textContent = "✅ " + cat.nombre + ": " + valor;
        estado.aciertos++; estado.puntos += 5;
        resueltas++;
        limpiarCola();
        encolarAudio(p.audioCorrecto);
        reproducirCola(() => { desbloquear(btn); avanzar(); });
      } else {
        estado.errores++;
        estadoDiv.textContent = "❌ Contá de nuevo";
        limpiarCola();
        encolarAudio(p.audioIncorrecto);
        reproducirCola();
      }
    };
    bloque.appendChild(verificarBtn);
  });

  encolarAudio(p.audioConsigna);
  reproducirCola(() => { interaccionBloqueada = false; });
}

// ---------------- INICIO ----------------
render();
