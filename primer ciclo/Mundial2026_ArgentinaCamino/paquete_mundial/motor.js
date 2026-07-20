// ============================================================
// MOTOR - El camino de Argentina, Mundial 2026
// ============================================================

const TOTAL_PARTIDOS_EST = PARTIDOS.length * 2; // 16 (8 partidos x 2)
const IDX_MALVINAS = 14; // justo despues de las 7 primeras fechas (Argelia..Inglaterra = 14 estaciones)
const TOTAL_ESTACIONES = TOTAL_PARTIDOS_EST + 1; // 17

let ESTACION_ACTUAL = -1;
let ACIERTOS = 0;
let ERRORES = 0;

const app = document.getElementById('app');
const audioPlayer = document.getElementById('audioPlayer');

function reproducir(src){
  if(!src) return;
  audioPlayer.src = src;
  audioPlayer.play().catch(()=>{});
}

function sumarAcierto(){ ACIERTOS++; actualizarContador(); }
function sumarError(){ ERRORES++; actualizarContador(); }
function actualizarContador(){
  const ok = document.getElementById('cntOk');
  const err = document.getElementById('cntErr');
  if(ok) ok.textContent = ACIERTOS;
  if(err) err.textContent = ERRORES;
}

function abrirFoto(src, caption){
  document.getElementById('lightboxImg').src = src;
  const capEl = document.getElementById('lightboxCaption');
  if(caption){ capEl.textContent = caption; capEl.style.display = 'block'; }
  else { capEl.style.display = 'none'; }
  document.getElementById('lightboxOverlay').classList.add('activo');
}
function cerrarFoto(){ document.getElementById('lightboxOverlay').classList.remove('activo'); }

function barraProgreso(){
  const actual = ESTACION_ACTUAL < 0 ? 0 : Math.min(ESTACION_ACTUAL+1, TOTAL_ESTACIONES);
  const pct = Math.round((actual/TOTAL_ESTACIONES)*100);
  return `<div class="barra-progreso"><div class="barra-progreso-fill" style="width:${pct}%"></div></div>`;
}
function contadorGlobal(){
  return `<div class="contador-global">✅ <span id="cntOk">${ACIERTOS}</span> &nbsp;|&nbsp; ❌ <span id="cntErr">${ERRORES}</span></div>`;
}

// ---------- NAVEGACIÓN ----------
function irA(idx){
  ESTACION_ACTUAL = idx;
  if(idx === -1) return renderPortada();
  if(idx >= TOTAL_ESTACIONES) return renderCierre();
  if(idx === IDX_MALVINAS) return renderMalvinas();
  // Antes de Malvinas los indices mapean directo a los primeros 7 partidos.
  // Despues de Malvinas, se corren un lugar hacia atras para mapear al resto (la Final).
  const idxPartidos = idx < IDX_MALVINAS ? idx : idx - 1;
  const partidoIdx = Math.floor(idxPartidos/2);
  const esA = idxPartidos % 2 === 0;
  const partido = PARTIDOS[partidoIdx];
  if(esA) renderEstacionA(partido);
  else renderEstacionB(partido);
}
function siguienteEstacion(){ irA(ESTACION_ACTUAL + 1); }
function habilitarSiguiente(){
  const btn = document.getElementById('btnSiguiente');
  if(btn) btn.disabled = false;
}

// ---------- PORTADA ----------
function renderPortada(){
  app.innerHTML = `
    <img src="${PORTADA_MUN.imagen}" class="img-estacion">
    <div class="contenido" style="align-items:center; text-align:center;">
      <h1>${PORTADA_MUN.titulo}</h1>
      <h2 style="color:#555;font-size:1em;">${PORTADA_MUN.subtitulo}</h2>
      <p>Recorrer los 8 partidos del equipo, jugando y aprendiendo los valores que nos dejó.</p>
      <button class="btn btn-secundario" style="width:100%;" onclick="reproducir('${PORTADA_MUN.audioBienvenida}')">🔊 Escuchá el mensaje de bienvenida</button>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center;">
        <button class="btn btn-principal" onclick="irA(0)">Comenzar ▶</button>
        <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
          <img src="imagenes/gustavo_avengers.jpg" class="foto-personal foto-clickeable" style="width:92px;height:92px;object-fit:cover;" onclick="abrirFoto('imagenes/gustavo_avengers.jpg', 'Menos prisa, más vida 🧉🫂')">
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
  app.innerHTML = `
    <img src="${IMAGEN_CIERRE}" class="img-estacion">
    <div class="contenido" style="align-items:center; text-align:center;">
      <h1>¡Gracias, campeones de corazón!</h1>
      <div class="consigna">
        <button class="btn-audio" onclick="reproducir('${AUDIO_CIERRE}')">🔊</button>
        <span>Escuchá la reflexión final.</span>
      </div>
      <div style="background:linear-gradient(135deg,#FFF9DB,#fff); border-radius:16px; padding:20px; width:100%;">
        <div style="font-size:2.2em; font-weight:900; color:#E67700;">${pct}%</div>
        <div>✅ ${ACIERTOS} aciertos &nbsp; | &nbsp; ❌ ${ERRORES} errores</div>
      </div>
      <div style="display:flex; align-items:center; gap:14px; justify-content:center;">
        <button class="btn btn-secundario" onclick="reiniciar()">🔄 Volver a jugar</button>
        <img src="imagenes/gustavo_avengers.jpg" class="foto-personal foto-clickeable" style="width:92px;height:92px;object-fit:cover;" onclick="abrirFoto('imagenes/gustavo_avengers.jpg', 'Menos prisa, más vida 🧉🫂')">
      </div>
    </div>
  `;
  reproducir(AUDIO_CIERRE);
}
function reiniciar(){ ACIERTOS=0; ERRORES=0; irA(-1); }

// ---------- ARMAZÓN COMÚN ----------
function armazonEstacion(imagen, titulo, subtitulo, contenidoInterno){
  app.innerHTML = `
    ${barraProgreso()}
    ${contadorGlobal()}
    <img src="${imagen}" class="img-estacion">
    <div class="contenido">
      <h2>${titulo}</h2>
      ${subtitulo ? `<div style="margin-top:-8px;color:#888;font-size:0.85em;">${subtitulo}</div>` : ''}
      <div id="zonaJuego"></div>
    </div>
    <div class="footer-nav">
      <button class="btn btn-nav" onclick="irA(${ESTACION_ACTUAL-1})" ${ESTACION_ACTUAL<=0?'disabled':''}>◀ Anterior</button>
      <button class="btn btn-principal" id="btnSiguiente" onclick="siguienteEstacion()" disabled>Siguiente ▶</button>
    </div>
  `;
  document.getElementById('zonaJuego').innerHTML = contenidoInterno;
}

// ============================================================
// ESTACIÓN ESPECIAL: Las Malvinas
// ============================================================
function renderMalvinas(){
  const m = MALVINAS;
  armazonEstacion(m.imagen, m.titulo, "", `
    <div class="consigna">
      <button class="btn-audio" onclick="reproducir('${m.audioConsigna}')">🔊</button>
      <span>Armá este último rompecabezas.</span>
    </div>
    <div id="juegoMalvinas"></div>
  `);
  reproducir(m.audioConsigna);
  const cont = document.getElementById('juegoMalvinas');
  juegoPuzzle(cont, m, ()=>{
    reproducir(m.audioFinal);
    audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended=null; };
  });
}

// ============================================================
// ESTACIÓN A: el juego de cada partido
// ============================================================
function renderEstacionA(p){
  armazonEstacion(p.imagen, p.titulo, p.subtitulo, `
    <div class="consigna">
      <button class="btn-audio" onclick="reproducir('${p.audioConsigna}')">🔊</button>
      <span id="txtConsignaA">Cargando...</span>
    </div>
    <div id="juegoA"></div>
  `);

  const esAdivinanza = (p.juego.tipo === 'identificacion' || p.juego.tipo === 'asociacion');
  document.getElementById('txtConsignaA').textContent = 'Escuchá la consigna y resolvé el juego.';

  if(esAdivinanza){
    // Consigna primero para no regalar la respuesta con la narracion
    reproducir(p.audioConsigna);
    audioPlayer.onended = ()=>{ audioPlayer.onended=null; };
  } else {
    reproducir(p.audioNarracion);
    audioPlayer.onended = ()=>{ reproducir(p.audioConsigna); audioPlayer.onended=null; };
  }

  const cont = document.getElementById('juegoA');
  switch(p.juego.tipo){
    case 'rompecabezas': return juegoPuzzle(cont, p);
    case 'identificacion': return juegoIdentificacion(cont, p);
    case 'asociacion': return juegoAsociacion(cont, p);
    case 'sopa': return juegoSopa(cont, p);
    case 'memoria': return juegoMemoria(cont, p);
  }
}

// ---- Rompecabezas ----
function juegoPuzzle(cont, p, onResuelto){
  const j = p.juego;
  const total = j.filas * j.columnas;
  let orden;
  do { orden = [...Array(total).keys()].sort(()=>Math.random()-0.5); }
  while(orden.every((v,i)=>v===i));

  cont.innerHTML = `<div class="puzzle-grid" id="puzzleGrid" style="grid-template-columns:repeat(${j.columnas},1fr); grid-template-rows:repeat(${j.filas},1fr);"></div>`;
  const grid = document.getElementById('puzzleGrid');
  let seleccionado = null;

  function pintar(){
    grid.innerHTML = '';
    orden.forEach((piezaOriginal,pos)=>{
      const fila = Math.floor(piezaOriginal/j.columnas);
      const col = piezaOriginal % j.columnas;
      const div = document.createElement('div');
      div.className = 'puzzle-pieza';
      div.style.backgroundImage = `url('${p.imagen}')`;
      div.style.backgroundSize = `${j.columnas*100}% ${j.filas*100}%`;
      div.style.backgroundPosition = `${(col/(j.columnas-1))*100}% ${(fila/(j.filas-1))*100}%`;
      div.onclick = ()=>manejarClick(pos);
      grid.appendChild(div);
    });
  }
  function manejarClick(pos){
    if(orden.every((v,i)=>v===i)) return;
    if(seleccionado===null){ seleccionado=pos; grid.children[pos].classList.add('sel'); }
    else if(seleccionado===pos){ grid.children[pos].classList.remove('sel'); seleccionado=null; }
    else {
      [orden[seleccionado],orden[pos]] = [orden[pos],orden[seleccionado]];
      seleccionado = null;
      pintar();
      if(orden.every((v,i)=>v===i)){
        sumarAcierto();
        cont.insertAdjacentHTML('beforeend', `<div class="feedback bien">¡Lo armaste!</div>`);
        if(onResuelto) onResuelto();
        else habilitarSiguiente();
      }
    }
  }
  pintar();
}

// ---- Identificación ----
function juegoIdentificacion(cont, p){
  const j = p.juego;
  cont.innerHTML = `<div class="opciones">${j.opciones.map((o,i)=>`<button class="opcion" data-i="${i}">${o.texto}</button>`).join('')}</div>`;
  cont.querySelectorAll('.opcion').forEach(btn=>{
    btn.onclick = ()=>{
      const i = +btn.dataset.i;
      const o = j.opciones[i];
      reproducir(o.audio);
      cont.querySelectorAll('.opcion').forEach(b=>b.style.pointerEvents='none');
      btn.classList.add(o.correcta?'correcta':'incorrecta');
      if(o.correcta) sumarAcierto(); else sumarError();
      audioPlayer.onended = ()=>{
        reproducir(p.audioNarracion);
        audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended=null; };
      };
      cont.insertAdjacentHTML('beforeend', `<div class="feedback ${o.correcta?'bien':'mal'}">${o.correcta?'¡Correcto!':'No era esa. Escuchá la narración.'}</div>`);
    };
  });
}

// ---- Asociación (bidireccional, con audio en ambos lados) ----
function juegoAsociacion(cont, p){
  const j = p.juego;
  const pares = j.pares.map((par,id)=>({id, ...par}));
  const izq = [...pares].sort(()=>Math.random()-0.5);
  const der = [...pares].sort(()=>Math.random()-0.5);
  cont.innerHTML = `<div class="grid-2">
    <div>${izq.map(x=>`<div class="item-match" data-side="a" data-id="${x.id}">${x.a}</div>`).join('')}</div>
    <div>${der.map(x=>`<div class="item-match" data-side="b" data-id="${x.id}">${x.b}</div>`).join('')}</div>
  </div>`;
  let seleccionado = null;
  let resueltos = 0;

  cont.querySelectorAll('.item-match').forEach(el=>{
    el.onclick = ()=>{
      if(el.classList.contains('ok')) return;
      const id = +el.dataset.id;
      const side = el.dataset.side;
      const par = pares[id];
      reproducir(side==='a' ? par.audioA : par.audioB);

      if(!seleccionado){ el.classList.add('sel'); seleccionado={el,side,id}; return; }
      if(seleccionado.side===side){ seleccionado.el.classList.remove('sel'); el.classList.add('sel'); seleccionado={el,side,id}; return; }

      if(seleccionado.id===id){
        seleccionado.el.classList.add('ok'); seleccionado.el.classList.remove('sel');
        el.classList.add('ok');
        resueltos++;
        sumarAcierto();
        if(resueltos===pares.length){
          cont.insertAdjacentHTML('afterend', `<div class="feedback bien">¡Todo asociado! Escuchá cómo fue el partido.</div>`);
          reproducir(p.audioNarracion);
          audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended=null; };
        }
      } else {
        sumarError();
        el.style.background = '#fdecea';
        setTimeout(()=>{ el.style.background=''; }, 400);
      }
      seleccionado.el.classList.remove('sel');
      seleccionado = null;
    };
  });
}

// ---- Sopa de letras ----
function generarSopa(palabras, tam){
  const grid = Array.from({length:tam}, ()=>Array(tam).fill(''));
  const dirs = [[0,1],[1,0],[1,1]];
  const ubicaciones = [];
  palabras.forEach(p=>{
    let colocada=false, intentos=0;
    while(!colocada && intentos<200){
      intentos++;
      const dir = dirs[Math.floor(Math.random()*dirs.length)];
      const maxR = tam - dir[0]*p.length;
      const maxC = tam - dir[1]*p.length;
      if(maxR<0 || maxC<0) continue;
      const r0 = Math.floor(Math.random()*maxR);
      const c0 = Math.floor(Math.random()*maxC);
      let cabe=true;
      for(let k=0;k<p.length;k++){
        const r=r0+dir[0]*k, c=c0+dir[1]*k;
        if(grid[r][c]!=='' && grid[r][c]!==p[k]){cabe=false;break;}
      }
      if(!cabe) continue;
      const celdas=[];
      for(let k=0;k<p.length;k++){
        const r=r0+dir[0]*k, c=c0+dir[1]*k;
        grid[r][c]=p[k]; celdas.push(r*tam+c);
      }
      ubicaciones.push({palabra:p, celdas});
      colocada=true;
    }
  });
  const letras='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<tam;r++) for(let c=0;c<tam;c++)
    if(grid[r][c]==='') grid[r][c]=letras[Math.floor(Math.random()*letras.length)];
  return {grid, ubicaciones};
}

function juegoSopa(cont, p){
  const j = p.juego;
  const TAM=10;
  const {grid, ubicaciones} = generarSopa(j.palabras, TAM);
  let seleccion=[]; let encontradas=new Set();
  cont.innerHTML = `
    <div class="sopa-grid" id="sopaGrid">${grid.flat().map((l,i)=>`<div class="sopa-cell" data-i="${i}">${l}</div>`).join('')}</div>
    <div class="lista-palabras">${j.palabras.map(pl=>`<span class="palabra-chip" data-p="${pl}">${pl}</span>`).join('')}</div>`;
  const celdas = cont.querySelectorAll('.sopa-cell');
  celdas.forEach(c=>{
    c.onclick = ()=>{
      const i = +c.dataset.i;
      const idxSel = seleccion.indexOf(i);
      if(idxSel>=0){ seleccion.splice(idxSel,1); c.classList.remove('sel'); }
      else { seleccion.push(i); c.classList.add('sel'); }
      ubicaciones.forEach(u=>{
        if(encontradas.has(u.palabra)) return;
        const setSel = new Set(seleccion);
        if(u.celdas.length===seleccion.length && u.celdas.every(x=>setSel.has(x))){
          encontradas.add(u.palabra);
          u.celdas.forEach(idx=>{ celdas[idx].classList.remove('sel'); celdas[idx].classList.add('encontrada'); });
          cont.querySelector(`.palabra-chip[data-p="${u.palabra}"]`).classList.add('encontrada');
          seleccion=[];
          if(encontradas.size===j.palabras.length){
            sumarAcierto();
            cont.insertAdjacentHTML('beforeend', `<div class="feedback bien">¡Encontraste todas! Escuchá cómo fue el partido.</div>`);
            reproducir(p.audioNarracion);
            audioPlayer.onended = ()=>{ habilitarSiguiente(); audioPlayer.onended=null; };
          }
        }
      });
    };
  });
}

// ---- Memojuego (texto) ----
function juegoMemoria(cont, p){
  const j = p.juego;
  let cartas = [];
  j.pares.forEach(par=>{
    cartas.push({id:par.id, texto:par.texto, audio:par.audio});
    cartas.push({id:par.id, texto:par.texto, audio:par.audio});
  });
  cartas = cartas.sort(()=>Math.random()-0.5);
  cont.innerHTML = `<div class="memo-grid" id="memoGrid">${cartas.map((c,i)=>`<div class="memo-card" data-i="${i}"><span class="signo">?</span><span class="txt"></span></div>`).join('')}</div>`;
  const grid = document.getElementById('memoGrid');
  let volteadas=[]; let bloqueado=false; let encontradas=0;

  grid.querySelectorAll('.memo-card').forEach(card=>{
    card.onclick = ()=>{
      const i = +card.dataset.i;
      if(bloqueado || card.classList.contains('encontrada') || card.classList.contains('volteada')) return;
      card.classList.add('volteada');
      card.querySelector('.txt').textContent = cartas[i].texto;
      volteadas.push(i);
      if(volteadas.length===2){
        bloqueado=true;
        const [a,b] = volteadas;
        if(cartas[a].id===cartas[b].id){
          sumarAcierto();
          reproducir(cartas[a].audio);
          grid.children[a].classList.add('encontrada');
          grid.children[b].classList.add('encontrada');
          encontradas++;
          volteadas=[]; bloqueado=false;
          if(encontradas===j.pares.length){
            setTimeout(()=>{
              cont.insertAdjacentHTML('afterend', `<div class="feedback bien">¡Encontraste todos los pares!</div>`);
              habilitarSiguiente();
            }, 300);
          }
        } else {
          sumarError();
          setTimeout(()=>{
            grid.children[a].classList.remove('volteada');
            grid.children[b].classList.remove('volteada');
            grid.children[a].querySelector('.txt').textContent='';
            grid.children[b].querySelector('.txt').textContent='';
            volteadas=[]; bloqueado=false;
          }, 1300);
        }
      }
    };
  });
}

// ============================================================
// ESTACIÓN B: armar la frase-valor
// ============================================================
function renderEstacionB(p){
  armazonEstacion(p.imagen, "Armá la frase", p.titulo, `
    <div class="consigna">
      <button class="btn-audio" onclick="reproducir('${AUDIO_CONSIGNA_FRASE}')">🔊</button>
      <span>Tocá las palabras en el orden correcto.</span>
    </div>
    <div class="frase-armada" id="fraseArmada"></div>
    <div class="banco-palabras" id="bancoPalabras"></div>
  `);
  reproducir(AUDIO_CONSIGNA_FRASE);
  construirFrase(p.fraseValor);
}

function construirFrase(palabrasObj){
  const armadaEl = document.getElementById('fraseArmada');
  const bancoEl = document.getElementById('bancoPalabras');
  armadaEl.innerHTML = '';
  const mezcladas = palabrasObj.map((w,i)=>({...w, i})).sort(()=>Math.random()-0.5);
  bancoEl.innerHTML = mezcladas.map(w=>`<span class="chip-palabra" data-i="${w.i}">${w.texto}</span>`).join('');

  let siguienteEsperado = 0;
  bancoEl.querySelectorAll('.chip-palabra').forEach(chip=>{
    chip.onclick = ()=>{
      if(chip.classList.contains('usada')) return;
      const i = +chip.dataset.i;
      reproducir(palabrasObj[i].audio);
      if(i === siguienteEsperado){
        armadaEl.insertAdjacentHTML('beforeend', `<span>${palabrasObj[i].texto}</span>`);
        chip.classList.add('usada');
        siguienteEsperado++;
        sumarAcierto();
        if(siguienteEsperado === palabrasObj.length){
          setTimeout(()=>{
            armadaEl.insertAdjacentHTML('afterend', `<div class="feedback bien">¡Armaste la frase!</div>`);
            habilitarSiguiente();
          }, 400);
        }
      } else {
        sumarError();
        chip.style.background = '#e53935';
        setTimeout(()=>{ chip.style.background=''; }, 400);
      }
    };
  });
}

// ---------- INICIO ----------
irA(-1);
