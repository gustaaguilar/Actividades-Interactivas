// ===== MOTOR GENÉRICO - "Las tablas del 2 y 3" =====

const app = document.getElementById('app');
let aciertos = 0;
let errores = 0;
let pantallaActual = 0;
let escenaActual = 0;

// ---- Cola de audio global (no overlap) ----
const colaAudio = {
  actual: null,
  reproducir(src, onEnded) {
    this.detener();
    const audio = new Audio(src);
    this.actual = audio;
    audio.onended = () => { this.actual = null; if (onEnded) onEnded(); };
    audio.onerror = () => { this.actual = null; if (onEnded) onEnded(); }; // si falta el mp3, no bloquear
    audio.play().catch(() => { this.actual = null; if (onEnded) onEnded(); });
    return audio;
  },
  detener() {
    if (this.actual) { this.actual.pause(); this.actual = null; }
  }
};

// ---- Sonidos de acierto/error (tonos sintéticos, sin archivos externos) ----
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function sonidoAcierto() {
  const ctx = getAudioCtx();
  const ahora = ctx.currentTime;
  [523.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.25, ahora + i * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.001, ahora + i * 0.09 + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ahora + i * 0.09);
    osc.stop(ahora + i * 0.09 + 0.22);
  });
}
function sonidoError() {
  const ctx = getAudioCtx();
  const ahora = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(160, ahora);
  osc.frequency.exponentialRampToValueAtTime(90, ahora + 0.18);
  gain.gain.setValueAtTime(0.2, ahora);
  gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ahora);
  osc.stop(ahora + 0.2);
}

// Mezcla los numeros asignados a las regiones de cada escena (misma cantidad de
// cada numero, pero repartidos al azar en zonas distintas). Se llama al reiniciar.
function mezclarAleatorio(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function reordenarNumerosDeZonas() {
  datosPaquete.escenas.forEach(escena => {
    const numeros = escena.regiones.map(r => r.numero);
    mezclarAleatorio(numeros);
    escena.regiones.forEach((r, i) => { r.numero = numeros[i]; });
  });
}

// Mapa numero -> color correcto (derivado de las tarjetas)
function mapaNumeroColor() {
  const mapa = {};
  datosPaquete.tarjetas.forEach(t => {
    t.items.forEach(it => { mapa[it.resultado] = { color: t.color, hex: t.hex }; });
  });
  return mapa;
}

function render() {
  app.innerHTML = '';
  colaAudio.detener();
  const pantallas = [renderPortada, renderPrincipal, renderCierre];
  pantallas[pantallaActual]();
}

function bloquearSiguiente(bloquear) {
  const btn = document.querySelector('.btn-siguiente');
  if (btn) btn.disabled = bloquear;
}

// ================= PORTADA =================
function renderPortada() {
  const p = datosPaquete.perfil;
  const div = document.createElement('div');
  div.className = 'pantalla portada';
  div.innerHTML = `
    <h1>${datosPaquete.titulo}</h1>
    <p class="subtitulo">${datosPaquete.grado}</p>
    <img src="assets/portada.jpg" class="imagen-portada" alt="" onerror="this.style.display='none'">
    <div class="perfil" id="perfilThumb">
      <img src="${p.foto}" class="perfil-foto" alt="Foto del profe" onerror="this.style.display='none'">
      <div class="perfil-texto">
        <div>${p.nombre}</div>
        <div>${p.email}</div>
      </div>
    </div>
    <button class="btn-siguiente" id="btnEmpezar">Empezar 🎨</button>
    <div id="lightbox" class="lightbox oculto">
      <div class="lightbox-contenido">
        <span class="cerrar-lightbox">✕</span>
        <img src="${p.foto}" id="imgLightbox" alt="Foto del profe">
        <p class="frase-lightbox">${p.frase}</p>
      </div>
    </div>
  `;
  app.appendChild(div);

  document.getElementById('perfilThumb').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('oculto');
  });
  document.querySelector('.cerrar-lightbox').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('lightbox').classList.add('oculto');
    document.getElementById('imgLightbox').classList.remove('zoom');
  });
  const imgLb = document.getElementById('imgLightbox');
  let zoomed = false;
  imgLb.addEventListener('click', (e) => {
    const rect = imgLb.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (!zoomed) {
      imgLb.style.transformOrigin = `${x}% ${y}%`;
      imgLb.classList.add('zoom');
    } else {
      imgLb.classList.remove('zoom');
    }
    zoomed = !zoomed;
  });

  document.getElementById('btnEmpezar').addEventListener('click', () => {
    pantallaActual = 1;
    render();
  });

  colaAudio.reproducir('audio/instr_portada.mp3');
}

// ================= PANTALLA PRINCIPAL: TARJETAS + PALETA + DIBUJO =================
function renderPrincipal() {
  const escena = datosPaquete.escenas[escenaActual];
  const esUltimaEscena = escenaActual === datosPaquete.escenas.length - 1;
  const mapa = mapaNumeroColor();
  const div = document.createElement('div');
  div.className = 'pantalla principal';
  div.innerHTML = `
    <h2>${datosPaquete.titulo}</h2>
    <p class="instruccion">Resolvé cada cuenta con la cabeza. Elegí el color de esa tarjeta en la paleta y tocá los sectores del dibujo que tengan ese resultado.</p>
    <div class="grid-tarjetas-mini" id="gridTarjetas"></div>
    <div class="contenedor-colorear">
      <div class="paleta" id="paleta"></div>
      <svg viewBox="${escena.viewBox}" class="dibujo-svg ${escena.imagenFondo ? 'fondo-blanco' : ''}" id="dibujoSvg"></svg>
    </div>
    <p class="aviso-terminaste oculto" id="avisoTerminaste">¡Terminaste! 🎉</p>
    <button class="btn-siguiente" id="btnSigColorear" disabled>${esUltimaEscena ? 'Ver resultados 🏁' : 'Siguiente dibujo ➡️'}</button>
  `;
  app.appendChild(div);

  // ---- Tarjetas de referencia (cuentas siempre visibles, sin resultado) ----
  const grid = document.getElementById('gridTarjetas');
  datosPaquete.tarjetas.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tarjeta-mini';
    card.style.borderColor = t.hex;
    card.innerHTML = `
      <div class="tarjeta-mini-titulo" style="background:${t.hex}">${t.color}</div>
      ${t.items.map(it => `<div class="cuenta-mini">${it.mult} = ___</div>`).join('')}
    `;
    grid.appendChild(card);
  });

  // ---- Paleta ----
  const paletaDiv = document.getElementById('paleta');
  let colorSeleccionado = null;

  datosPaquete.tarjetas.forEach(t => {
    const sw = document.createElement('div');
    sw.className = 'swatch';
    sw.style.background = t.hex;
    sw.dataset.hex = t.hex;
    sw.dataset.color = t.color;
    sw.title = t.color;
    sw.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach(s => s.classList.remove('activo'));
      document.querySelectorAll('.tarjeta-mini').forEach(c => c.classList.remove('activo'));
      sw.classList.add('activo');
      const idx = Array.from(paletaDiv.children).indexOf(sw);
      grid.children[idx].classList.add('activo');
      colorSeleccionado = t.hex;
      const archivoColor = t.color.toLowerCase().replace(/ /g, '_').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      colaAudio.reproducir(`audio/nombre_${archivoColor}.mp3`);
    });
    paletaDiv.appendChild(sw);
  });

  // ---- Dibujo ----
  const svg = document.getElementById('dibujoSvg');
  const totalRegiones = escena.regiones.length;
  const evaluadas = new Set();
  let avisoMostrado = false;

  function actualizarBotonSiguiente() {
    const pintadas = svg.querySelectorAll('.region.pintado').length;
    const completo = pintadas >= totalRegiones;
    document.getElementById('btnSigColorear').disabled = !completo;
    if (completo && esUltimaEscena && !avisoMostrado) {
      avisoMostrado = true;
      document.getElementById('avisoTerminaste').classList.remove('oculto');
      colaAudio.reproducir('audio/escena_completa.mp3');
    }
  }

  escena.regiones.forEach(r => {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', r.puntos);
    poly.setAttribute('class', escena.imagenFondo ? 'region region-bajo-imagen' : 'region');
    poly.setAttribute('data-id', r.id);
    poly.setAttribute('fill', '#ffffff');
    poly.addEventListener('click', () => {
      if (!colorSeleccionado) return;
      const correcto = mapa[r.numero];
      const esCorrecto = correcto && correcto.hex === colorSeleccionado;
      if (esCorrecto) {
        poly.setAttribute('fill', colorSeleccionado);
        poly.classList.add('pintado');
        const pista = svg.querySelector(`.etiqueta-pista[data-id="${r.id}"]`);
        if (pista) pista.classList.add('oculto');
        if (!evaluadas.has(r.id)) {
          evaluadas.add(r.id);
          aciertos++;
        }
        colaAudio.detener();
        sonidoAcierto();
        actualizarBotonSiguiente();
      } else {
        if (!evaluadas.has(r.id)) {
          evaluadas.add(r.id);
          errores++;
        }
        colaAudio.detener();
        sonidoError();
      }
    });
    svg.appendChild(poly);

    if (!escena.imagenFondo) {
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', r.cx);
      label.setAttribute('y', r.cy);
      label.setAttribute('class', 'etiqueta-region');
      label.setAttribute('text-anchor', 'middle');
      label.textContent = r.numero;
      svg.appendChild(label);
    }
  });

  // Si la escena tiene imagen de fondo (lineas), va ARRIBA de los poligonos
  // para que el color pintado se vea "por debajo" de las lineas negras.
  if (escena.imagenFondo) {
    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', escena.imagenFondo);
    img.setAttribute('href', escena.imagenFondo);
    img.setAttribute('x', '0');
    img.setAttribute('y', '0');
    const vb = escena.viewBox.split(' ');
    img.setAttribute('width', vb[2]);
    img.setAttribute('height', vb[3]);
    img.setAttribute('class', 'imagen-fondo-lineas');
    svg.appendChild(img);

    // Mostramos el numero como pista chiquita SOLO mientras el sector no esta pintado
    escena.regiones.forEach(r => {
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', r.cx);
      label.setAttribute('y', r.cy);
      label.setAttribute('class', 'etiqueta-region etiqueta-pista');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('data-id', r.id);
      label.textContent = r.numero;
      svg.appendChild(label);
    });
  }

  document.getElementById('btnSigColorear').addEventListener('click', () => {
    if (esUltimaEscena) {
      pantallaActual = 2;
    } else {
      escenaActual++;
    }
    render();
  });

  colaAudio.reproducir('audio/instr_colorear.mp3');
}

// ================= CIERRE =================
function renderCierre() {
  const total = aciertos + errores;
  const porcentaje = total > 0 ? Math.round((aciertos / total) * 100) : 0;
  const puntos = aciertos * 10;

  const div = document.createElement('div');
  div.className = 'pantalla cierre';
  div.innerHTML = `
    <h1>¡Terminaste! 🎉</h1>
    <img src="assets/festejo.jpg" class="imagen-festejo" alt="" onerror="this.style.display='none'">
    <div class="resultados">
      <p>✅ Aciertos: ${aciertos}</p>
      <p>❌ Errores: ${errores}</p>
      <p>📊 Porcentaje: ${porcentaje}%</p>
      <p>⭐ Puntos: ${puntos}</p>
    </div>
    <div class="perfil" id="perfilThumbCierre">
      <img src="${datosPaquete.perfil.foto}" class="perfil-foto" alt="Foto del profe" onerror="this.style.display='none'">
      <div class="perfil-texto">
        <div>${datosPaquete.perfil.nombre}</div>
        <div>${datosPaquete.perfil.email}</div>
      </div>
    </div>
    <button class="btn-siguiente" id="btnVolverJugar">Volver a jugar 🔄</button>
  `;
  app.appendChild(div);

  document.getElementById('btnVolverJugar').addEventListener('click', () => {
    aciertos = 0; errores = 0; pantallaActual = 0; escenaActual = 0;
    reordenarNumerosDeZonas();
    render();
  });

  colaAudio.reproducir('audio/cierre.mp3');
}

render();
