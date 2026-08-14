// ============================================================
// MOTOR DEL PAQUETE - San Martín
// ============================================================

let ESTACION_ACTUAL = -1; // -1 = portada, 0..13 = estaciones, 14 = cierre
let JUEGO_RESUELTO = false;
let ACIERTOS = 0;
let ERRORES = 0;

function sumarAcierto(){
  ACIERTOS++;
  const el = document.getElementById('cntOk');
  if(el) el.textContent = ACIERTOS;
}
function sumarError(){
  ERRORES++;
  const el = document.getElementById('cntErr');
  if(el) el.textContent = ERRORES;
}

const app = document.getElementById('app');
const audioPlayer = document.getElementById('audioPlayer');

function reproducir(src){
  audioPlayer.src = src;
  audioPlayer.play().catch(()=>{});
}

function barraProgreso(){
  const total = ESTACIONES.length;
  const actual = ESTACION_ACTUAL < 0 ? 0 : (ESTACION_ACTUAL >= total ? total : ESTACION_ACTUAL+1);
  const pct = Math.round((actual/total)*100);
  return `<div class="barra-progreso"><div class="barra-progreso-fill" style="width:${pct}%"></div></div>`;
}

function abrirFoto(src, caption){
  document.getElementById('lightboxImg').src = src;
  const capEl = document.getElementById('lightboxCaption');
  if(caption){ capEl.textContent = caption; capEl.style.display = 'block'; }
  else { capEl.style.display = 'none'; }
  document.getElementById('lightboxOverlay').classList.add('activo');
}
function cerrarFoto(){
  document.getElementById('lightboxOverlay').classList.remove('activo');
}

// ---------- PORTADA ----------
function renderPortada(){
  app.innerHTML = `
    <img src="imagenes/00_portada.jpg" class="img-estacion">
    <div class="contenido" style="align-items:center; text-align:center;">
      <h1 style="margin-bottom:2px;">San Martín</h1>
      <h2 style="color:#555;font-size:0.95em; margin-top:0;">El Libertador de América</h2>
      <button class="btn btn-secundario" style="width:100%;" onclick="reproducir('${AUDIO_PORTADA}')">🔊 Escuchá el mensaje de bienvenida</button>
      <p>Un recorrido interactivo por la vida del Padre de la Patria, con 14 estaciones para conocer, escuchar y jugar.</p>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center;">
        <button class="btn btn-principal" onclick="reproducir('${AUDIO_PORTADA}'); irA(0)">Comenzar ▶</button>
        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
          <img src="imagenes/gustavo_avengers.jpg" class="foto-personal foto-clickeable" style="width:92px;height:92px;object-fit:cover;margin:0;" onclick="abrirFoto('imagenes/gustavo_avengers.jpg', 'Menos prisa, más vida 🧉🫂')">
          <div style="font-size:0.72em; color:#666; max-width:130px;">📸 Informática Educativa · Profe Gustavo Aguilar</div>
        </div>
      </div>
    </div>
  `;
}

// ---------- CIERRE ----------
function renderCierre(){
  const total = ACIERTOS + ERRORES;
  const pct = total > 0 ? Math.round((ACIERTOS/total)*100) : 0;
  let msgTexto, msgColor, msgFondo;
  if(pct >= 90){ msgTexto='⭐ ¡Excelente! ¡Sos un gran patriota!'; msgColor='#2B8A3E'; msgFondo='#D3F9D8'; }
  else if(pct >= 70){ msgTexto='👍 ¡Muy bien! ¡Seguís aprendiendo!'; msgColor='#E67700'; msgFondo='#FFF9DB'; }
  else if(pct >= 50){ msgTexto='💪 ¡Podés mejorar! ¡Intentá de nuevo!'; msgColor='#D9480F'; msgFondo='#FFE8CC'; }
  else { msgTexto='📚 Repasá el tema y volvé a intentarlo.'; msgColor='#C92A2A'; msgFondo='#FFE3E3'; }

  app.innerHTML = `
    <div class="card-top">
      <h1>¡Muy bien!</h1>
    </div>
    <div class="contenido" style="align-items:center; text-align:center;">
      <button class="btn btn-secundario" style="width:100%;" onclick="reproducir('${AUDIO_CIERRE_FELICITACIONES}')">🔊 Escuchá el mensaje de despedida</button>
      <p>Completaste todo el recorrido por la vida de José de San Martín. ¡Gracias por acompañarnos!</p>
      <div class="cierre-resultados" style="width:100%;">
        <h2>🏆 Tu resultado</h2>
        <div class="resultado-item"><span>✅ Aciertos</span><span class="resultado-num" style="color:#2B8A3E">${ACIERTOS}</span></div>
        <div class="resultado-item"><span>❌ Errores</span><span class="resultado-num" style="color:#C92A2A">${ERRORES}</span></div>
        <div class="resultado-item"><span>📊 Total</span><span class="resultado-num" style="color:#1A365D">${total}</span></div>
        <div class="resultado-pct">${pct}%</div>
        <div style="text-align:center;font-size:1em;font-weight:bold;padding:8px;border-radius:10px;background:${msgFondo};color:${msgColor}">${msgTexto}</div>
      </div>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center;">
        <button class="btn btn-secundario" onclick="reiniciar()">🔄 Volver a empezar</button>
        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
          <img src="imagenes/gustavo_avengers.jpg" class="foto-personal foto-clickeable" style="width:92px;height:92px;object-fit:cover;margin:0;" onclick="abrirFoto('imagenes/gustavo_avengers.jpg', 'Menos prisa, más vida 🧉🫂')">
          <div style="font-size:0.72em; color:#666; max-width:130px;">📸 Informática Educativa · Profe Gustavo Aguilar</div>
        </div>
      </div>
    </div>
  `;
  reproducir(AUDIO_CIERRE_FELICITACIONES);
}

function reiniciar(){
  ACIERTOS = 0;
  ERRORES = 0;
  irA(0);
}

// ---------- NAVEGACIÓN GENERAL ----------
function irA(idx){
  ESTACION_ACTUAL = idx;
  JUEGO_RESUELTO = false;
  if(idx === -1) return renderPortada();
  if(idx >= ESTACIONES.length) return renderCierre();
  renderEstacion(ESTACIONES[idx]);
}

function siguienteEstacion(){
  irA(ESTACION_ACTUAL + 1);
}

// ---------- ESTRUCTURA DE UNA ESTACIÓN ----------
function renderEstacion(est){
  app.innerHTML = `
    ${barraProgreso()}
    <div class="contador-global">✅ <span id="cntOk">${ACIERTOS}</span> &nbsp;|&nbsp; ❌ <span id="cntErr">${ERRORES}</span></div>
    <img src="${est.imagen}" class="img-estacion" alt="${est.titulo}">
    <div class="contenido">
      <h2>${est.id}. ${est.titulo}</h2>
      <div class="consigna">
        <button class="btn-audio" onclick="reproducir('${est.audioNarracion}')">🔊</button>
        <span>Narración: tocá el parlante para volver a escuchar.</span>
      </div>
      <div id="zonaJuego"></div>
    </div>
    <div class="footer-nav">
      <button class="btn btn-nav" onclick="irA(${ESTACION_ACTUAL-1})" ${ESTACION_ACTUAL<=0?'disabled':''}>◀ Anterior</button>
      <button class="btn btn-principal" id="btnSiguiente" onclick="siguienteEstacion()" disabled>Siguiente ▶</button>
    </div>
  `;
  renderConsignaYJuego(est);

  // Los juegos de "identificación" preguntan directamente por un dato que la
  // narración dice de forma textual, así que ahí se escucha primero la
  // consigna (la pregunta) y recién después la narración (la explicación),
  // para no regalar la respuesta antes de tiempo.
  const consignaAReproducir = est.infografia ? est.infografia.audioConsigna : est.audioConsigna;
  const tipoConAudioPropio = est.juego.tipo === 'multiple' || est.juego.tipo === 'vf' || est.juego.tipo === 'laberinto';
  if(est.juego.tipo === 'identificacion'){
    reproducir(est.audioConsigna);
    audioPlayer.onended = ()=>{ reproducir(est.audioNarracion); audioPlayer.onended = null; };
  } else {
    reproducir(est.audioNarracion);
    audioPlayer.onended = ()=>{
      reproducir(consignaAReproducir);
      audioPlayer.onended = tipoConAudioPropio ? ()=>{
        if(window.__reproducirPrimeraPregunta) window.__reproducirPrimeraPregunta();
        audioPlayer.onended = null;
      } : null;
    };
  }
}

function habilitarSiguiente(){
  JUEGO_RESUELTO = true;
  const btn = document.getElementById('btnSiguiente');
  if(btn) btn.disabled = false;
}

function renderConsignaYJuego(est){
  if(est.infografia){
    return renderInfografia(est);
  }
  renderJuegoReal(est);
}

function renderInfografia(est){
  const zona = document.getElementById('zonaJuego');
  const info = est.infografia;
  zona.innerHTML = `
    <div class="consigna" style="margin-bottom:6px;">
      <button class="btn-audio" onclick="reproducir('${info.audioConsigna}')">🔊</button>
      <span>${info.consignaTexto}</span>
    </div>
    <div class="info-cont" id="infoCont" style="position:relative;">
      <img src="${info.imagen || est.imagen}" style="width:100%;border-radius:12px;display:block;">
      ${info.puntos.map(p=>`<button class="info-punto" data-n="${p.n}" style="left:${p.x}%;top:${p.y}%;">${p.n}</button>`).join('')}
    </div>
    <div id="infoDescripcion" class="consigna" style="display:none;"></div>
    <button class="btn btn-principal" id="btnContinuarInfo" style="margin-top:10px;" disabled>Continuar ▶</button>
  `;
  const vistos = new Set();
  document.querySelectorAll('.info-punto').forEach(btn=>{
    btn.onclick = ()=>{
      const n = +btn.dataset.n;
      const p = info.puntos.find(x=>x.n===n);
      reproducir(p.audio);
      btn.classList.add('visto');
      vistos.add(n);
      const desc = document.getElementById('infoDescripcion');
      desc.style.display = 'flex';
      desc.innerHTML = `<button class="btn-audio" onclick="reproducir('${p.audio}')">🔊</button><span>${p.texto}</span>`;
      if(vistos.size === info.puntos.length){
        document.getElementById('btnContinuarInfo').disabled = false;
      }
    };
  });
  document.getElementById('btnContinuarInfo').onclick = ()=>{
    renderJuegoReal(est);
  };
}

function renderJuegoReal(est){
  const zona = document.getElementById('zonaJuego');
  const consignaHtml = `
    <div class="consigna" style="margin-bottom:6px;">
      <button class="btn-audio" onclick="reproducir('${est.audioConsigna}')">🔊</button>
      <span>${est.consignaTexto}</span>
    </div>
    <div id="juegoInterno"></div>
  `;
  zona.innerHTML = consignaHtml;
  const cont = document.getElementById('juegoInterno');
  const j = est.juego;
  switch(j.tipo){
    case 'identificacion': return juegoIdentificacion(cont, j);
    case 'orden': return juegoOrden(cont, j);
    case 'asociacion': return juegoAsociacion(cont, j);
    case 'multiple': return juegoMultiple(cont, j);
    case 'mapa': return juegoMapa(cont, j);
    case 'sopa': return juegoSopa(cont, j);
    case 'laberinto': return juegoLaberinto(cont, j);
    case 'vf': return juegoVF(cont, j);
    case 'completar': return juegoCompletar(cont, j);
  }
}

// ============================================================
// 1) IDENTIFICACIÓN (multiple choice de una sola pregunta)
// ============================================================
function juegoIdentificacion(cont, j){
  cont.innerHTML = `<div class="id-opciones">
    ${j.opciones.map((o,i)=>`<button class="opcion" data-i="${i}">${o.texto}</button>`).join('')}
  </div><div id="fbId"></div>`;
  cont.querySelectorAll('.opcion').forEach(btn=>{
    btn.onclick = ()=>{
      if(JUEGO_RESUELTO) return;
      const i = +btn.dataset.i;
      const correcta = j.opciones[i].correcta;
      cont.querySelectorAll('.opcion').forEach(b=>b.style.pointerEvents='none');
      btn.classList.add(correcta ? 'correcta' : 'incorrecta');
      if(correcta) sumarAcierto(); else sumarError();
      document.getElementById('fbId').innerHTML = `<div class="feedback ${correcta?'bien':'mal'}">${correcta?'¡Muy bien!':'No es correcto. La respuesta correcta era: '+j.opciones.find(o=>o.correcta).texto}</div>`;
      if(correcta && j.audioRefuerzo){
        reproducir(j.audioRefuerzo);
        audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended = null; };
      } else {
        habilitarSiguiente();
      }
    };
  });
}

// ============================================================
// 2) ORDEN CRONOLÓGICO (tocar en orden 1,2,3,4)
// ============================================================
function juegoOrden(cont, j){
  const orden = j.items.map((it,i)=>({t:it.t, audio:it.audio, i})).sort(()=>Math.random()-0.5);
  let siguienteEsperado = 0;
  cont.innerHTML = `<div id="listaOrden">
    ${orden.map(o=>`<div class="orden-item" data-orig="${o.i}"><span class="num">?</span>${o.t}</div>`).join('')}
  </div><div id="fbOrden"></div>`;
  let contador = 1;
  cont.querySelectorAll('.orden-item').forEach(el=>{
    el.onclick = ()=>{
      if(JUEGO_RESUELTO || el.classList.contains('puesto')) return;
      const orig = +el.dataset.orig;
      if(orig === siguienteEsperado){
        const numColocado = contador++;
        el.querySelector('.num').textContent = numColocado;
        el.classList.add('puesto');
        siguienteEsperado++;
        sumarAcierto();
        const item = j.items[orig];
        if(item.audio) reproducir(item.audio);
        if(siguienteEsperado === j.items.length){
          document.getElementById('fbOrden').innerHTML = `<div class="feedback bien">¡Excelente! Orden correcto.</div>`;
          if(item.audio){
            audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended = null; };
          } else {
            habilitarSiguiente();
          }
        }
      } else {
        sumarError();
        el.style.background = '#fdecea';
        setTimeout(()=>{ el.style.background=''; }, 400);
      }
    };
  });
}

// ============================================================
// 3) ASOCIACIÓN (unir pares por clicks: seleccionar A, luego B)
// ============================================================
function juegoAsociacion(cont, j){
  const izq = j.pares.map((p,i)=>({t:p.a,i})).sort(()=>Math.random()-0.5);
  const der = j.pares.map((p,i)=>({t:p.b,i})).sort(()=>Math.random()-0.5);
  cont.innerHTML = `<div class="grid-2">
    <div>${izq.map(o=>`<div class="item-match" data-side="a" data-i="${o.i}">${o.t}</div>`).join('')}</div>
    <div>${der.map(o=>`<div class="item-match" data-side="b" data-i="${o.i}">${o.t}</div>`).join('')}</div>
  </div><div id="fbAsoc"></div>`;
  let selA = null;
  let resueltos = 0;
  cont.querySelectorAll('.item-match').forEach(el=>{
    el.onclick = ()=>{
      if(el.classList.contains('ok')) return;
      if(el.dataset.side === 'a'){
        cont.querySelectorAll('[data-side="a"]').forEach(e=>e.classList.remove('sel'));
        el.classList.add('sel');
        selA = el;
      } else {
        if(!selA) return;
        const iA = +selA.dataset.i;
        const iB = +el.dataset.i;
        if(iA === iB){
          selA.classList.add('ok'); selA.classList.remove('sel');
          el.classList.add('ok');
          resueltos++;
          sumarAcierto();
          const par = j.pares[iA];
          if(par.audio) reproducir(par.audio);
          if(resueltos === j.pares.length){
            document.getElementById('fbAsoc').innerHTML = `<div class="feedback bien">¡Todas las asociaciones correctas!</div>`;
            if(par.audio){
              audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended = null; };
            } else {
              habilitarSiguiente();
            }
          }
        } else {
          sumarError();
          el.style.background = '#fdecea';
          setTimeout(()=>{ el.style.background=''; }, 400);
        }
        selA.classList.remove('sel');
        selA = null;
      }
    };
  });
}

// ============================================================
// 4) MULTIPLE CHOICE (varias preguntas seguidas)
// ============================================================
function juegoMultiple(cont, j){
  let idx = 0, correctas = 0;
  function renderP(reproducirAudio){
    const p = j.preguntas[idx];
    cont.innerHTML = `
      <div class="contador">Pregunta ${idx+1} de ${j.preguntas.length}</div>
      <div class="consigna" style="margin-bottom:6px;">
        ${p.audioP ? `<button class="btn-audio" onclick="reproducir('${p.audioP}')">🔊</button>` : ''}
        <span style="font-weight:bold;">${p.p}</span>
      </div>
      <div class="opciones">
        ${p.opciones.map((o,i)=>`<button class="opcion" data-i="${i}">${o}</button>`).join('')}
      </div><div id="fbMulti"></div>`;
    if(p.audioP && reproducirAudio) reproducir(p.audioP);
    cont.querySelectorAll('.opcion').forEach(btn=>{
      btn.onclick = ()=>{
        const i = +btn.dataset.i;
        const ok = i === p.correcta;
        if(ok){ correctas++; sumarAcierto(); } else sumarError();
        cont.querySelectorAll('.opcion').forEach(b=>b.style.pointerEvents='none');
        btn.classList.add(ok?'correcta':'incorrecta');
        if(!ok) cont.querySelectorAll('.opcion')[p.correcta].classList.add('correcta');
        const avanzar = ()=>{
          idx++;
          if(idx < j.preguntas.length){ renderP(true); }
          else {
            cont.innerHTML = `<div class="feedback bien">Respondiste correctamente ${correctas} de ${j.preguntas.length} preguntas.</div>`;
            habilitarSiguiente();
          }
        };
        if(ok && p.audioR){
          reproducir(p.audioR);
          audioPlayer.onended = ()=>{ audioPlayer.onended = null; setTimeout(avanzar, 300); };
        } else {
          setTimeout(avanzar, 1200);
        }
      };
    });
  }
  renderP(false);
  // Reproduce la audio de la primera pregunta recién cuando termine la
  // secuencia inicial de narración+consigna, para que no se pisen.
  window.__reproducirPrimeraPregunta = ()=>{ if(j.preguntas[0].audioP) reproducir(j.preguntas[0].audioP); };
}

// ============================================================
// 5) MAPA INTERACTIVO
// ============================================================
function juegoMapa(cont, j){
  let correctos = 0;
  const totalCorrectas = j.regiones.filter(r=>r.correcta).length;
  cont.innerHTML = `<div class="mapa-cont" style="height:280px; background:#cfe8ff;">
    <svg viewBox="${j.viewBox}" style="width:100%;height:100%;">
      ${j.regiones.map((r,i)=>r.hitbox ? `<rect data-i="${i}" data-hit="1" x="${r.hitbox.x}" y="${r.hitbox.y}" width="${r.hitbox.w}" height="${r.hitbox.h}" fill="transparent" style="cursor:pointer;"/>` : '').join('')}
      ${j.regiones.map((r,i)=>`<path data-i="${i}" d="${r.path}" fill="none" stroke="#4a4a4a" stroke-width="1" style="cursor:pointer;"/>`).join('')}
    </svg>
  </div>
  <div class="id-opciones" style="margin-top:6px;">
    ${j.regiones.map((r,i)=>`<span class="palabra-chip" data-etiqueta="${i}" style="display:inline-block;margin:3px;">${r.nombre}</span>`).join('')}
  </div>
  <div id="fbMapa" style="margin-top:8px;"></div>`;
  const marcarEtiqueta = (i, color) => {
    const chip = cont.querySelector(`[data-etiqueta="${i}"]`);
    if(chip){ chip.style.background = color; chip.style.color = '#fff'; }
  };
  function manejarClick(i){
    const r = j.regiones[i];
    const pathEl = cont.querySelector(`path[data-i="${i}"]`);
    if(pathEl.dataset.resuelto) return;
    pathEl.dataset.resuelto = "1";
    cont.querySelectorAll(`[data-i="${i}"]`).forEach(el=>el.dataset.resuelto = "1");
    if(r.correcta){
      pathEl.setAttribute('fill', r.color);
      pathEl.setAttribute('fill-opacity', '0.8');
      marcarEtiqueta(i, r.color);
      correctos++;
      sumarAcierto();
      if(r.audio) reproducir(r.audio);
      if(correctos === totalCorrectas){
        document.getElementById('fbMapa').innerHTML = `<div class="feedback bien">¡Encontraste los tres países del Plan Continental!</div>`;
        habilitarSiguiente();
      }
    } else {
      pathEl.setAttribute('fill', r.color || '#e53935');
      pathEl.setAttribute('fill-opacity', '0.7');
      marcarEtiqueta(i, r.color || '#e53935');
      sumarError();
    }
  }
  cont.querySelectorAll('svg path, svg rect[data-hit]').forEach(el=>{
    el.onclick = ()=> manejarClick(+el.dataset.i);
  });
}

// ============================================================
// 6) SOPA DE LETRAS
// ============================================================
function generarSopa(palabras, tam){
  const grid = Array.from({length:tam}, ()=>Array(tam).fill(''));
  const dirs = [[0,1],[1,0],[1,1]];
  const ubicaciones = [];
  palabras.forEach(p=>{
    let colocada = false, intentos = 0;
    while(!colocada && intentos < 200){
      intentos++;
      const dir = dirs[Math.floor(Math.random()*dirs.length)];
      const maxR = tam - dir[0]*p.length;
      const maxC = tam - dir[1]*p.length;
      if(maxR < 0 || maxC < 0) continue;
      const r0 = Math.floor(Math.random()*maxR);
      const c0 = Math.floor(Math.random()*maxC);
      let cabe = true;
      for(let k=0;k<p.length;k++){
        const r = r0+dir[0]*k, c = c0+dir[1]*k;
        if(grid[r][c] !== '' && grid[r][c] !== p[k]){ cabe = false; break; }
      }
      if(!cabe) continue;
      const celdas = [];
      for(let k=0;k<p.length;k++){
        const r = r0+dir[0]*k, c = c0+dir[1]*k;
        grid[r][c] = p[k];
        celdas.push(r*tam+c);
      }
      ubicaciones.push({palabra:p, celdas});
      colocada = true;
    }
  });
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<tam;r++) for(let c=0;c<tam;c++)
    if(grid[r][c]==='') grid[r][c] = letras[Math.floor(Math.random()*letras.length)];
  return {grid, ubicaciones};
}

function juegoSopa(cont, j){
  const TAM = 10;
  const palabras = j.palabras.map(p => typeof p === 'string' ? {p, audio:null} : p);
  const {grid, ubicaciones} = generarSopa(palabras.map(p=>p.p), TAM);
  let primerToque = null;
  let encontradas = new Set();
  cont.innerHTML = `
    <div class="sopa-grid" id="sopaGrid">
      ${grid.flat().map((l,i)=>`<div class="sopa-cell" data-i="${i}">${l}</div>`).join('')}
    </div>
    <div class="lista-palabras" id="listaPal">
      ${palabras.map(p=>`<span class="palabra-chip" data-p="${p.p}">${p.p}</span>`).join('')}
    </div>`;
  const celdas = cont.querySelectorAll('.sopa-cell');

  function limpiarSeleccion(){
    if(primerToque !== null) celdas[primerToque].classList.remove('sel');
    primerToque = null;
  }

  celdas.forEach(c=>{
    c.onclick = ()=>{
      const i = +c.dataset.i;
      const yaEncontrada = c.classList.contains('encontrada');

      if(primerToque === null){
        primerToque = i;
        if(!yaEncontrada) c.classList.add('sel');
        return;
      }
      if(primerToque === i){
        limpiarSeleccion();
        return;
      }

      // Buscar si (primerToque, i) coincide con el inicio y fin de alguna palabra (en cualquier orden)
      let encontrada = null;
      ubicaciones.forEach(u=>{
        if(encontradas.has(u.palabra)) return;
        const inicio = u.celdas[0], fin = u.celdas[u.celdas.length-1];
        if((inicio === primerToque && fin === i) || (inicio === i && fin === primerToque)){
          encontrada = u;
        }
      });

      if(encontrada){
        encontradas.add(encontrada.palabra);
        sumarAcierto();
        encontrada.celdas.forEach(idx=>{
          celdas[idx].classList.remove('sel');
          celdas[idx].classList.add('encontrada');
        });
        cont.querySelector(`.palabra-chip[data-p="${encontrada.palabra}"]`).classList.add('encontrada');
        const pObj = palabras.find(p=>p.p === encontrada.palabra);
        if(pObj && pObj.audio) reproducir(pObj.audio);
        primerToque = null;
        if(encontradas.size === palabras.length){
          if(pObj && pObj.audio){
            audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended = null; };
          } else {
            habilitarSiguiente();
          }
        }
      } else {
        sumarError();
        celdas[primerToque].style.background = '#fdecea';
        c.style.background = '#fdecea';
        setTimeout(()=>{
          celdas[primerToque] && (celdas[primerToque].style.background = '');
          c.style.background = '';
          limpiarSeleccion();
        }, 500);
      }
    };
  });
}

// ============================================================
// 7) LABERINTO CON DESAFÍOS MATEMÁTICOS
// ============================================================
function juegoLaberinto(cont, j){
  let paso = 0;
  function render(reproducirAudio){
    const d = j.desafios[paso];
    cont.innerHTML = `
      <div class="laberinto-pasos">
        ${j.desafios.map((_,i)=>`<div class="paso-circ ${i<paso?'hecho':(i===paso?'activo':'')}">${i<paso?'✓':i+1}</div>`).join('')}
      </div>
      <div class="pregunta-desafio">
        <div class="consigna" style="margin-bottom:6px;">
          ${d.audioP ? `<button class="btn-audio" onclick="reproducir('${d.audioP}')">🔊</button>` : ''}
          <span>${d.enunciado}</span>
        </div>
        <input type="number" class="input-desafio" id="inputDesafio">
        <br><button class="btn btn-principal" style="margin-top:10px;" id="btnResp">Responder</button>
        <div id="fbLab" style="margin-top:8px;"></div>
      </div>`;
    if(d.audioP && reproducirAudio) reproducir(d.audioP);
    document.getElementById('btnResp').onclick = ()=>{
      const val = +document.getElementById('inputDesafio').value;
      if(val === d.respuesta){
        sumarAcierto();
        document.getElementById('fbLab').innerHTML = `<div class="feedback bien">${d.textoR || '¡Correcto! Avanzás por la cordillera.'}</div>`;
        const avanzar = ()=>{
          paso++;
          if(paso === j.desafios.length){
            cont.innerHTML = `<div class="laberinto-pasos">${j.desafios.map(()=>`<div class="paso-circ hecho">✓</div>`).join('')}</div><div class="feedback bien">¡Llegaste a Chile cruzando toda la cordillera!</div>`;
            habilitarSiguiente();
          } else render(true);
        };
        if(d.audioR){
          reproducir(d.audioR);
          audioPlayer.onended = ()=>{ audioPlayer.onended = null; setTimeout(avanzar, 300); };
        } else {
          setTimeout(avanzar, 900);
        }
      } else {
        sumarError();
        document.getElementById('fbLab').innerHTML = `<div class="feedback mal">No es el número correcto, ¡probá de nuevo!</div>`;
      }
    };
  }
  render(false);
  window.__reproducirPrimeraPregunta = ()=>{ if(j.desafios[0].audioP) reproducir(j.desafios[0].audioP); };
}

// ============================================================
// 8) VERDADERO O FALSO
// ============================================================
function juegoVF(cont, j){
  let idx = 0, correctas = 0;
  function render(reproducirAudio){
    const a = j.afirmaciones[idx];
    cont.innerHTML = `
      <div class="contador">Afirmación ${idx+1} de ${j.afirmaciones.length}</div>
      <div class="consigna" style="margin-bottom:6px;">
        ${a.audioP ? `<button class="btn-audio" onclick="reproducir('${a.audioP}')">🔊</button>` : ''}
        <span style="font-weight:bold;">${a.texto}</span>
      </div>
      <div style="display:flex; gap:12px; justify-content:center;">
        <button class="btn" style="background:var(--verde);" id="btnV">Verdadero</button>
        <button class="btn" style="background:#e53935;" id="btnF">Falso</button>
      </div>
      <div id="fbVF" style="margin-top:8px;"></div>`;
    if(a.audioP && reproducirAudio) reproducir(a.audioP);
    const responder = (respuesta)=>{
      const ok = respuesta === a.valor;
      if(ok){ correctas++; sumarAcierto(); } else sumarError();
      document.getElementById('fbVF').innerHTML = `<div class="feedback ${ok?'bien':'mal'}">${ok?'¡Correcto!':'La respuesta correcta era: '+(a.valor?'Verdadero':'Falso')}</div>`;
      document.getElementById('btnV').disabled = true;
      document.getElementById('btnF').disabled = true;
      const avanzar = ()=>{
        idx++;
        if(idx < j.afirmaciones.length) render(true);
        else {
          cont.innerHTML = `<div class="feedback bien">Respondiste correctamente ${correctas} de ${j.afirmaciones.length}.</div>`;
          habilitarSiguiente();
        }
      };
      if(ok && a.audioR){
        reproducir(a.audioR);
        audioPlayer.onended = ()=>{ audioPlayer.onended = null; setTimeout(avanzar, 300); };
      } else {
        setTimeout(avanzar, 1100);
      }
    };
    document.getElementById('btnV').onclick = ()=>responder(true);
    document.getElementById('btnF').onclick = ()=>responder(false);
  }
  render(false);
  window.__reproducirPrimeraPregunta = ()=>{ if(j.afirmaciones[0].audioP) reproducir(j.afirmaciones[0].audioP); };
}

// ============================================================
// 9) COMPLETAR FRASES (banco de palabras)
// ============================================================
function juegoCompletar(cont, j){
  let idx = 0, correctas = 0;
  function render(){
    const f = j.frases[idx];
    // Armar hasta 5 opciones: la correcta + hasta 4 distractores del banco, mezcladas
    const distractores = j.banco.filter(p => p !== f.respuesta).sort(()=>Math.random()-0.5).slice(0, 4);
    const opciones = [f.respuesta, ...distractores].sort(()=>Math.random()-0.5);
    cont.innerHTML = `
      <div class="contador">Máxima ${idx+1} de ${j.frases.length}</div>
      <div class="frase">${f.texto.replace('___','<span class="blank" id="hueco">?</span>')}</div>
      <div class="banco-palabras">
        ${opciones.map(p=>`<span class="chip-palabra" data-p="${p}">${p}</span>`).join('')}
      </div>
      <div id="fbComp" style="margin-top:8px;"></div>`;
    cont.querySelectorAll('.chip-palabra').forEach(chip=>{
      chip.onclick = ()=>{
        if(chip.classList.contains('usada')) return;
        const val = chip.dataset.p;
        const ok = val === f.respuesta;
        if(ok) sumarAcierto(); else sumarError();
        document.getElementById('hueco').textContent = val;
        cont.querySelectorAll('.chip-palabra').forEach(c=>c.classList.add('usada'));
        if(ok) correctas++;
        document.getElementById('fbComp').innerHTML = `<div class="feedback ${ok?'bien':'mal'}">${ok?'¡Correcto!':'La palabra correcta era: '+f.respuesta}</div>`;
        const avanzar = ()=>{
          idx++;
          if(idx < j.frases.length) render();
          else {
            cont.innerHTML = `<div class="feedback bien">Completaste ${correctas} de ${j.frases.length} máximas correctamente.</div>`;
            habilitarSiguiente();
          }
        };
        if(ok && f.audio){
          reproducir(f.audio);
          audioPlayer.onended = ()=>{ audioPlayer.onended = null; setTimeout(avanzar, 300); };
        } else {
          setTimeout(avanzar, 1300);
        }
      };
    });
  }
  render();
}

// ---------- INICIO ----------
irA(-1);
