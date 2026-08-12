// ============================================================
// MOTOR.JS - Motor genérico de actividades interactivas
// Maravillas en los mares - Estándar Profe Gustavo Aguilar
// VERSIÓN 2 - con puntaje, gate de audio, altavoz, nuevos tipos
// ============================================================

(function () {
  "use strict";

  let idxActual = 0;
  let audioActual = null;
  let audioTerminado = false;   // se pone true cuando terminó de sonar el audio de la pantalla
  let actividadLista = false;   // se pone true cuando la actividad de la pantalla está resuelta/completa
  let interaccionBloqueada = false; // bloquea clics mientras suena un audio
  let generacionActual = 0;     // se incrementa en cada renderizar(); evita que un audio
                                 // "atrasado" de una pantalla anterior dispare su callback
                                 // ya estando en una pantalla nueva (condición de carrera)

  // ---------- Puntaje global ----------
  const puntaje = { correctos: 0, incorrectos: 0 };
  const preguntasContadas = new Set(); // evita contar más de una vez la misma pregunta

  const app = document.getElementById("app");
  const btnSiguiente = document.getElementById("btnSiguiente");
  const btnAnterior = document.getElementById("btnAnterior");
  const indicador = document.getElementById("indicador");
  const barraProgreso = document.getElementById("barraProgreso");
  const marcadorPuntaje = document.getElementById("marcadorPuntaje");
  const btnAltavoz = document.getElementById("btnAltavoz");

  // El botón "Anterior" queda desactivado (recorrido solo hacia adelante)
  if (btnAnterior) {
    btnAnterior.style.display = "none";
  }

  // ---------- Utilidades ----------
  function limpiar(el) { while (el.firstChild) el.removeChild(el.firstChild); }

  function crear(tag, clase, texto) {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function intentarHabilitarSiguiente() {
    if (audioTerminado && actividadLista) {
      btnSiguiente.disabled = false;
      btnSiguiente.classList.remove("deshabilitado");
    }
  }

  function habilitarSiguiente() {
    actividadLista = true;
    intentarHabilitarSiguiente();
  }

  function deshabilitarSiguiente() {
    actividadLista = false;
    btnSiguiente.disabled = true;
    btnSiguiente.classList.add("deshabilitado");
  }

  function actualizarMarcadorPuntaje() {
    if (marcadorPuntaje) {
      marcadorPuntaje.textContent = `✅ ${puntaje.correctos}  ❌ ${puntaje.incorrectos}`;
    }
  }

  function registrarResultado(claveUnica, esCorrecto) {
    if (preguntasContadas.has(claveUnica)) return;
    preguntasContadas.add(claveUnica);
    if (esCorrecto) puntaje.correctos++; else puntaje.incorrectos++;
    actualizarMarcadorPuntaje();
  }

  // Suma un error SIN deduplicar (para interacciones sueltas, ej. cada
  // toque incorrecto en el ejercicio de ordenar palabras).
  function sumarErrorDirecto() {
    puntaje.incorrectos++;
    actualizarMarcadorPuntaje();
  }

  // ---------- Cola global de audio ----------
  function reproducirAudio(src, alTerminar) {
    detenerAudio();
    const miGeneracion = generacionActual;
    if (!src) {
      audioTerminado = true;
      intentarHabilitarSiguiente();
      if (alTerminar) alTerminar();
      return;
    }
    audioActual = new Audio(src);
    interaccionBloqueada = true;
    app.classList.add("audio-en-curso");
    const finalizar = () => {
      // Si mientras sonaba este audio ya se pasó a otra pantalla, no hacemos nada:
      // evita que un callback atrasado interfiera con la pantalla nueva.
      if (miGeneracion !== generacionActual) return;
      interaccionBloqueada = false;
      app.classList.remove("audio-en-curso");
      if (alTerminar) alTerminar();
    };
    audioActual.addEventListener("ended", finalizar);
    audioActual.addEventListener("error", finalizar);
    audioActual.play().catch(finalizar);
  }

  function detenerAudio() {
    if (audioActual) {
      audioActual.pause();
      audioActual = null;
    }
  }

  function bloqueaClicSiInteraccionBloqueada(handler) {
    return function (ev) {
      if (interaccionBloqueada) return;
      handler(ev);
    };
  }

  function reproducirAudioSecundario(src) {
    try {
      const a = new Audio(src);
      a.play().catch(() => {});
    } catch (e) { /* noop */ }
  }

  // ---------- Render principal ----------
  function renderizar(i) {
    generacionActual++;
    detenerAudio();
    limpiar(app);
    const pantalla = DATOS.pantallas[i];
    indicador.textContent = `${i + 1} / ${DATOS.pantallas.length}`;
    if (barraProgreso) {
      const pct = Math.round(((i + 1) / DATOS.pantallas.length) * 100);
      barraProgreso.style.width = pct + "%";
    }
    btnSiguiente.textContent = i === DATOS.pantallas.length - 1 ? "Finalizar" : "Siguiente ▶";
    audioTerminado = !(pantalla.audio || pantalla.audioSecuencia);
    deshabilitarSiguiente();

    if (btnAltavoz) {
      btnAltavoz.onclick = () => {
        if (pantalla.audioSecuencia) {
          reproducirSecuenciaPersonajes(pantalla, true);
        } else if (pantalla.audio) {
          reproducirAudioSecundario(pantalla.audio);
        }
      };
    }

    const constructor = CONSTRUCTORES[pantalla.tipo];
    if (!constructor) {
      app.appendChild(crear("p", "error", "Tipo de pantalla no implementado: " + pantalla.tipo));
      audioTerminado = true;
      habilitarSiguiente();
      return;
    }
    constructor(pantalla);

    if (pantalla.audioSecuencia) {
      reproducirSecuenciaPersonajes(pantalla, false);
    } else if (pantalla.tipo === "opcionMultipleGrupo") {
      // Este tipo gestiona su propia cadena de audio (pregunta -> respuesta -> siguiente pregunta)
      // dentro de su propio constructor; no se reproduce audio automático acá.
    } else if (pantalla.audio) {
      reproducirAudio(pantalla.audio, () => {
        audioTerminado = true;
        intentarHabilitarSiguiente();
      });
    }
  }

  // ---------- Constructores por tipo de pantalla ----------
  const CONSTRUCTORES = {};

  CONSTRUCTORES.portada = function (p) {
    const cont = crear("div", "pantalla portada");
    const h1 = crear("h1", "titulo-principal", p.titulo);
    const sub = crear("p", "subtitulo", p.subtitulo);
    const img = crear("img", "imagen-portada");
    img.src = p.imagen; img.alt = p.titulo;
    cont.appendChild(img);
    cont.appendChild(h1);
    cont.appendChild(sub);

    const perfilCont = crear("div", "perfil-container");
    const thumb = crear("img", "perfil-thumb");
    thumb.src = "img/foto_perfil.jpg";
    thumb.alt = "Foto de perfil";
    const label = crear("p", "perfil-label", "📸 Informática Educativa · Profe Gustavo Aguilar");
    perfilCont.appendChild(thumb);
    perfilCont.appendChild(label);
    thumb.addEventListener("click", () => abrirLightbox(thumb.src));
    cont.appendChild(perfilCont);

    app.appendChild(cont);
    habilitarSiguiente();
  };

  function abrirLightbox(src) {
    const overlay = crear("div", "lightbox-overlay");
    const img = crear("img", "lightbox-img");
    img.src = src;
    const cerrar = crear("button", "lightbox-cerrar", "✕");
    const tagline = crear("p", "lightbox-tagline", "Menos prisa, más vida 🧉🫂");
    cerrar.addEventListener("click", () => overlay.remove());
    overlay.appendChild(img);
    overlay.appendChild(cerrar);
    overlay.appendChild(tagline);
    document.body.appendChild(overlay);
  }

  CONSTRUCTORES.texto = function (p) {
    const cont = crear("div", "pantalla texto-pantalla");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    if (p.imagen) {
      const img = crear("img", "imagen-ilustrativa");
      img.src = p.imagen; img.alt = p.titulo;
      cont.appendChild(img);
    }
    const parrafo = crear("p", "cuerpo-texto");
    parrafo.textContent = p.texto;
    cont.appendChild(parrafo);
    app.appendChild(cont);
    habilitarSiguiente();
  };

  CONSTRUCTORES.personajes = function (p) {
    const cont = crear("div", "pantalla personajes-pantalla");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    const grupo = crear("div", "grupo-personajes");
    p.personajes.forEach((pj, idx) => {
      const tarjeta = crear("div", "tarjeta-personaje tarjeta-sombreada");
      tarjeta.dataset.idx = idx;
      const img = crear("img", "img-personaje");
      img.src = pj.imagen; img.alt = pj.nombre;
      const nombre = crear("h3", "nombre-personaje", pj.nombre);
      const frase = crear("p", "frase-personaje", pj.frase);
      tarjeta.appendChild(img);
      tarjeta.appendChild(nombre);
      tarjeta.appendChild(frase);
      grupo.appendChild(tarjeta);
    });
    cont.appendChild(grupo);
    app.appendChild(cont);
    habilitarSiguiente();
  };

  function reproducirSecuenciaPersonajes(pantalla, esReplay) {
    const cont = app.querySelector(".personajes-pantalla");
    const tarjetas = cont ? cont.querySelectorAll(".tarjeta-personaje") : [];
    let idxSeg = 0;

    function limpiarIluminados() {
      tarjetas.forEach(t => t.classList.remove("tarjeta-iluminada"));
    }

    function siguienteSegmento() {
      if (idxSeg >= pantalla.audioSecuencia.length) {
        if (!esReplay) {
          audioTerminado = true;
          intentarHabilitarSiguiente();
        }
        return;
      }
      const seg = pantalla.audioSecuencia[idxSeg];
      limpiarIluminados();
      if (tarjetas[seg.personajeIdx]) tarjetas[seg.personajeIdx].classList.add("tarjeta-iluminada");
      idxSeg++;
      reproducirAudio(seg.audio, siguienteSegmento);
    }
    siguienteSegmento();
  }

  CONSTRUCTORES.reflexionOral = function (p) {
    const cont = crear("div", "pantalla reflexion-oral");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    if (p.subtitulo) cont.appendChild(crear("p", "subtitulo", p.subtitulo));
    const lista = crear("ul", "lista-preguntas");
    p.preguntas.forEach(q => lista.appendChild(crear("li", null, q)));
    cont.appendChild(lista);
    app.appendChild(cont);
    habilitarSiguiente();
  };

  CONSTRUCTORES.imagenGrande = function (p) {
    const cont = crear("div", "pantalla imagen-grande-pantalla");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    const img = crear("img", "imagen-grande");
    img.src = p.imagen; img.alt = p.titulo;
    cont.appendChild(img);
    if (p.instruccion) cont.appendChild(crear("p", "instruccion", p.instruccion));
    app.appendChild(cont);
    habilitarSiguiente();
  };

  CONSTRUCTORES.sabiasQue = function (p) {
    const cont = crear("div", "pantalla sabias-que");
    const caja = crear("div", "caja-sabiasque");
    caja.appendChild(crear("h3", "sabiasque-titulo", "💡 " + p.titulo));
    if (p.imagen) {
      const img = crear("img", "sabiasque-img");
      img.src = p.imagen; img.alt = "Tilde";
      caja.appendChild(img);
    }
    const texto = crear("p", "sabiasque-texto");
    texto.textContent = p.texto;
    caja.appendChild(texto);

    if (p.imagenContenido) {
      const imgContenido = crear("img", "sabiasque-img-contenido");
      imgContenido.src = p.imagenContenido;
      imgContenido.alt = "Ejemplo de infografía";
      caja.appendChild(imgContenido);
    }

    if (p.comparacionVisual) {
      const zonaComp = crear("div", "zona-comparacion-visual");
      const grande = crear("div", "item-comparacion item-grande");
      const imgG = crear("img", "img-comparacion-grande");
      imgG.src = p.comparacionVisual.grande.imagen;
      grande.appendChild(imgG);
      grande.appendChild(crear("p", "etiqueta-comparacion", p.comparacionVisual.grande.etiqueta));

      const chico = crear("div", "item-comparacion item-chico");
      const imgC = crear("img", "img-comparacion-chico");
      imgC.src = p.comparacionVisual.chico.imagen;
      chico.appendChild(imgC);
      chico.appendChild(crear("p", "etiqueta-comparacion", p.comparacionVisual.chico.etiqueta));

      zonaComp.appendChild(grande);
      zonaComp.appendChild(chico);
      caja.appendChild(zonaComp);
    }

    cont.appendChild(caja);
    app.appendChild(cont);
    habilitarSiguiente();
  };

  function crearBotonOpcion(op) {
    const boton = crear("button", "opcion-btn");
    if (op.imagen) {
      const img = crear("img", "opcion-imagen");
      img.src = op.imagen; img.alt = op.texto;
      boton.appendChild(img);
    }
    boton.appendChild(crear("span", "opcion-texto", op.texto));
    return boton;
  }

  CONSTRUCTORES.opcionMultiple = function (p) {
    const cont = crear("div", "pantalla opcion-multiple");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    if (p.contexto) cont.appendChild(crear("p", "contexto-caja", p.contexto));
    if (p.imagen) {
      const img = crear("img", "imagen-pequena-apoyo");
      img.src = p.imagen; img.alt = "";
      cont.appendChild(img);
    }
    cont.appendChild(crear("p", "pregunta", p.pregunta));
    const lista = crear("div", "lista-opciones");
    let resuelto = false;

    p.opciones.forEach(op => {
      const boton = crearBotonOpcion(op);
      boton.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
        if (resuelto) return;
        resuelto = true;
        Array.from(lista.children).forEach(b => b.disabled = true);
        if (op.correcta) {
          boton.classList.add("correcta");
          mostrarFeedback(cont, p.feedbackCorrecto, true);
          if (p.puntuable) registrarResultado(p.id, true);
          const seguir = () => continuarLuegoDeDesafio(p, cont);
          if (p.audioCorrecto) reproducirAudio(p.audioCorrecto, seguir);
          else seguir();
        } else {
          boton.classList.add("incorrecta");
          mostrarFeedback(cont, p.feedbackIncorrecto, false);
          if (p.puntuable) registrarResultado(p.id, false);
          setTimeout(() => {
            resuelto = false;
            Array.from(lista.children).forEach(b => { b.disabled = false; b.classList.remove("incorrecta"); });
            const fb = cont.querySelector(".feedback");
            if (fb) fb.remove();
          }, 1800);
        }
      }));
      lista.appendChild(boton);
    });
    cont.appendChild(lista);
    app.appendChild(cont);
  };

  function continuarLuegoDeDesafio(p, cont) {
    if (p.confirmacionFundamento && p.preguntaFundamento) {
      const wrap = crear("div", "fundamento-wrap");
      wrap.appendChild(crear("p", "instruccion", p.preguntaFundamento.texto));
      const lista = crear("div", "lista-opciones");
      let resuelto = false;
      p.preguntaFundamento.opciones.forEach(op => {
        const boton = crearBotonOpcion(op);
        boton.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
          if (resuelto) return;
          resuelto = true;
          Array.from(lista.children).forEach(b => b.disabled = true);
          if (op.correcta) {
            boton.classList.add("correcta");
            registrarResultado((p.id || "") + "_fundamento", true);
            if (p.preguntaFundamento.audioCorrecto) {
              reproducirAudio(p.preguntaFundamento.audioCorrecto, habilitarSiguiente);
            } else {
              habilitarSiguiente();
            }
          } else {
            boton.classList.add("incorrecta");
            registrarResultado((p.id || "") + "_fundamento", false);
            setTimeout(() => {
              resuelto = false;
              Array.from(lista.children).forEach(b => { b.disabled = false; b.classList.remove("incorrecta"); });
            }, 1500);
          }
        }));
        lista.appendChild(boton);
      });
      wrap.appendChild(lista);
      cont.appendChild(wrap);
      if (p.preguntaFundamento.audioPregunta) {
        reproducirAudio(p.preguntaFundamento.audioPregunta, () => {});
      }
    } else {
      habilitarSiguiente();
    }
  }

  function mostrarFeedback(cont, texto, correcto) {
    const fb = crear("p", "feedback " + (correcto ? "feedback-correcto" : "feedback-incorrecto"), texto);
    cont.appendChild(fb);
  }

  // ---------- Grupo de preguntas de opción múltiple (reemplaza tablas/preguntas abiertas) ----------
  // Recorrido secuencial guiado por audio: pregunta -> respuesta -> audio de
  // acierto específico -> siguiente pregunta. modoDisplay "acumular" (default)
  // deja las preguntas resueltas visibles y marcadas; "reemplazar" muestra
  // una sola pregunta por vez, ocupando siempre el mismo espacio en pantalla.
  CONSTRUCTORES.opcionMultipleGrupo = function (p) {
    const cont = crear("div", "pantalla opcion-multiple-grupo");
    cont.appendChild(crear("h2", "titulo", p.titulo));

    if (p.imagenesComparacion) {
      const zona = crear("div", "zona-comparacion-visual");
      p.imagenesComparacion.forEach(ic => {
        const item = crear("div", "item-comparacion" + (ic.escala === "grande" ? " comparacion-grande" : ""));
        const img = crear("img", "img-comparacion-media");
        img.src = ic.imagen; img.alt = ic.etiqueta;
        item.appendChild(img);
        item.appendChild(crear("p", "etiqueta-comparacion", ic.etiqueta));
        zona.appendChild(item);
      });
      cont.appendChild(zona);
    }

    const zonaPreguntas = crear("div", "zona-preguntas-secuencial");
    cont.appendChild(zonaPreguntas);
    app.appendChild(cont);

    const modoReemplazar = p.modoDisplay === "reemplazar";

    function iniciarPregunta(qIdx) {
      if (qIdx >= p.preguntas.length) {
        audioTerminado = true;
        habilitarSiguiente();
        return;
      }
      const pregunta = p.preguntas[qIdx];

      if (modoReemplazar) limpiar(zonaPreguntas);

      const bloque = crear("div", "bloque-pregunta-mc bloque-revelado");
      if (pregunta.imagen) {
        const img = crear("img", "icono-pregunta-mc");
        img.src = pregunta.imagen; img.alt = "";
        bloque.appendChild(img);
      }
      bloque.appendChild(crear("p", "pregunta-texto", pregunta.texto));
      const lista = crear("div", "lista-opciones");
      let resuelta = false;
      pregunta.opciones.forEach(op => {
        const boton = crearBotonOpcion(op);
        boton.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
          if (resuelta) return;
          resuelta = true;
          Array.from(lista.children).forEach(b => b.disabled = true);
          const clave = `${p.id}_${qIdx}`;
          if (op.correcta) {
            boton.classList.add("correcta");
            registrarResultado(clave, true);
            reproducirAudio(pregunta.audioCorrecto, () => iniciarPregunta(qIdx + 1));
          } else {
            boton.classList.add("incorrecta");
            registrarResultado(clave, false);
            setTimeout(() => {
              resuelta = false;
              Array.from(lista.children).forEach(b => { b.disabled = false; b.classList.remove("incorrecta"); });
            }, 1500);
          }
        }));
        lista.appendChild(boton);
      });
      bloque.appendChild(lista);
      zonaPreguntas.appendChild(bloque);

      // El audio de la pregunta suena al revelarse; mientras suena, la
      // interacción queda bloqueada (misma cola global de audio).
      if (pregunta.audioPregunta) {
        reproducirAudio(pregunta.audioPregunta, () => {});
      }
    }

    // Cadena completa: primero el audio introductorio de la pantalla,
    // luego la primera pregunta, y así sucesivamente.
    if (p.audio) {
      reproducirAudio(p.audio, () => iniciarPregunta(0));
    } else {
      iniciarPregunta(0);
    }
  };

  // ---------- Ordenar palabras ----------
  CONSTRUCTORES.ordenarPalabras = function (p) {
    const cont = crear("div", "pantalla ordenar-palabras");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    if (p.imagen) {
      const img = crear("img", "imagen-ilustrativa");
      img.src = p.imagen; img.alt = p.titulo;
      cont.appendChild(img);
    }
    if (p.pistas) {
      const pistas = crear("ul", "lista-pistas");
      p.pistas.forEach(pi => pistas.appendChild(crear("li", null, pi)));
      cont.appendChild(pistas);
    }
    cont.appendChild(crear("p", "consigna", p.consigna));

    const zonaRespuesta = crear("div", "zona-respuesta-ordenar");
    const zonaBanco = crear("div", "zona-banco-palabras");

    // Validación INMEDIATA palabra por palabra: si la palabra tocada es la
    // que corresponde al siguiente lugar de la definición, sube al cuadro
    // de respuesta. Si no, se queda en el banco y cuenta como un error.
    const palabrasMezcladas = shuffle(p.palabrasOrden.map((palabra, idx) => ({ palabra, idOriginal: idx })));
    const seleccionActual = [];

    function renderBanco() {
      limpiar(zonaBanco);
      palabrasMezcladas.forEach(item => {
        if (seleccionActual.includes(item.idOriginal)) return;
        const chip = crear("button", "chip-palabra-ordenar", item.palabra);
        chip.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
          const siguientePosicionEsperada = seleccionActual.length;
          if (item.idOriginal === siguientePosicionEsperada) {
            seleccionActual.push(item.idOriginal);
            actualizar();
            if (seleccionActual.length === p.palabrasOrden.length) {
              registrarResultado(p.id, true);
              zonaRespuesta.classList.add("respuesta-correcta");
              if (p.audioOracionCompleta) {
                reproducirAudio(p.audioOracionCompleta, habilitarSiguiente);
              } else {
                habilitarSiguiente();
              }
            }
          } else {
            sumarErrorDirecto();
            chip.classList.add("error-temp");
            setTimeout(() => chip.classList.remove("error-temp"), 500);
          }
        }));
        zonaBanco.appendChild(chip);
      });
    }

    function renderRespuesta() {
      limpiar(zonaRespuesta);
      seleccionActual.forEach((idOriginal, pos) => {
        const palabra = p.palabrasOrden[idOriginal];
        const chip = crear("button", "chip-palabra-ordenar chip-en-respuesta", palabra);
        chip.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
          // Solo se puede retirar la última palabra colocada, para no romper el orden
          if (pos !== seleccionActual.length - 1) return;
          seleccionActual.pop();
          zonaRespuesta.classList.remove("respuesta-correcta");
          actualizar();
        }));
        zonaRespuesta.appendChild(chip);
      });
    }

    function actualizar() {
      renderBanco();
      renderRespuesta();
    }

    cont.appendChild(zonaRespuesta);
    cont.appendChild(zonaBanco);
    app.appendChild(cont);
    actualizar();
  };

  CONSTRUCTORES.asociar = function (p) {
    const cont = crear("div", "pantalla asociar-pantalla");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    if (p.instruccion) cont.appendChild(crear("p", "instruccion", p.instruccion));

    const zona = crear("div", "zona-asociar");
    const colIzq = crear("div", "col-asociar");
    const colDer = crear("div", "col-asociar");

    const izquierdas = shuffle(p.pares.slice());
    const derechas = shuffle(p.pares.map(par => par.derecha));

    let seleccionIzq = null;
    const resueltos = new Set();

    izquierdas.forEach(par => {
      const btn = crear("button", "asociar-item asociar-item-imagen");
      btn.dataset.valor = par.izquierda;
      if (par.imagen) {
        const img = crear("img", "asociar-item-img");
        img.src = par.imagen; img.alt = par.izquierda;
        btn.appendChild(img);
      }
      btn.appendChild(crear("span", null, par.izquierda));
      btn.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
        if (resueltos.has(par.izquierda)) return;
        Array.from(colIzq.children).forEach(b => b.classList.remove("seleccionado"));
        btn.classList.add("seleccionado");
        seleccionIzq = par.izquierda;
      }));
      colIzq.appendChild(btn);
    });

    derechas.forEach(txt => {
      const btn = crear("button", "asociar-item", txt);
      btn.dataset.valor = txt;
      btn.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
        if (!seleccionIzq) return;
        const parCorrecto = p.pares.find(par => par.izquierda === seleccionIzq);
        if (parCorrecto && parCorrecto.derecha === txt) {
          resueltos.add(seleccionIzq);
          const btnIzq = Array.from(colIzq.children).find(b => b.dataset.valor === seleccionIzq);
          btnIzq.classList.add("emparejado");
          btnIzq.disabled = true;
          btn.classList.add("emparejado");
          btn.disabled = true;
          seleccionIzq = null;
          registrarResultado(`${p.id}_${parCorrecto.izquierda}`, true);
          const revisarFinal = () => {
            if (resueltos.size === p.pares.length) habilitarSiguiente();
          };
          if (parCorrecto.audioCorrecto) reproducirAudio(parCorrecto.audioCorrecto, revisarFinal);
          else revisarFinal();
        } else {
          btn.classList.add("error-temp");
          setTimeout(() => btn.classList.remove("error-temp"), 600);
        }
      }));
      colDer.appendChild(btn);
    });

    zona.appendChild(colIzq);
    zona.appendChild(colDer);
    cont.appendChild(zona);
    app.appendChild(cont);
  };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  CONSTRUCTORES.clasificar = function (p) {
    const cont = crear("div", "pantalla clasificar-pantalla");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    if (p.teoria) cont.appendChild(crear("p", "contexto-caja", p.teoria));
    cont.appendChild(crear("p", "pregunta", p.pregunta));

    const lista = crear("div", "lista-opciones lista-opciones-clasificar");
    let resuelto = false;
    p.opciones.forEach(op => {
      const boton = crear("button", "opcion-btn opcion-larga", op.texto);
      boton.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
        if (resuelto) return;
        if (op.correcta) {
          resuelto = true;
          boton.classList.add("correcta");
          Array.from(lista.children).forEach(b => b.disabled = true);
          mostrarFeedback(cont, p.feedbackCorrecto, true);
          if (p.puntuable) registrarResultado(p.id, true);
          if (p.audioCorrecto) reproducirAudio(p.audioCorrecto, habilitarSiguiente);
          else habilitarSiguiente();
        } else {
          boton.classList.add("incorrecta");
          mostrarFeedback(cont, p.feedbackIncorrecto, false);
          if (p.puntuable) registrarResultado(p.id, false);
          setTimeout(() => {
            boton.classList.remove("incorrecta");
            const fb = cont.querySelector(".feedback");
            if (fb) fb.remove();
          }, 1500);
        }
      }));
      lista.appendChild(boton);
    });
    cont.appendChild(lista);
    app.appendChild(cont);
  };

  CONSTRUCTORES.sopaLetras = function (p) {
    const cont = crear("div", "pantalla sopa-pantalla");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    cont.appendChild(crear("p", "instruccion", "Tocá la primera letra y luego la última letra de cada palabra."));

    const { grid, ubicaciones } = generarSopa(p.palabras, p.filas, p.columnas);
    const encontradas = new Set();

    const tabla = crear("div", "grid-sopa");
    tabla.style.gridTemplateColumns = `repeat(${p.columnas}, 1fr)`;
    let seleccionInicio = null;
    const celdas = [];

    for (let f = 0; f < p.filas; f++) {
      for (let c = 0; c < p.columnas; c++) {
        const celda = crear("button", "celda-sopa", grid[f][c]);
        celda.dataset.f = f; celda.dataset.c = c;
        celda.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => manejarSeleccion(f, c, celda)));
        tabla.appendChild(celda);
        celdas.push(celda);
      }
    }
    cont.appendChild(tabla);

    const listaPalabras = crear("div", "lista-palabras-sopa");
    p.palabras.forEach(pal => {
      const chip = crear("span", "chip-palabra", pal);
      chip.dataset.palabra = pal;
      listaPalabras.appendChild(chip);
    });
    cont.appendChild(listaPalabras);
    app.appendChild(cont);

    function manejarSeleccion(f, c, celda) {
      if (!seleccionInicio) {
        seleccionInicio = { f, c };
        celda.classList.add("seleccionada");
        return;
      }
      const fin = { f, c };
      const encontrada = ubicaciones.find(u =>
        (u.inicio.f === seleccionInicio.f && u.inicio.c === seleccionInicio.c && u.fin.f === fin.f && u.fin.c === fin.c) ||
        (u.fin.f === seleccionInicio.f && u.fin.c === seleccionInicio.c && u.inicio.f === fin.f && u.inicio.c === fin.c)
      );
      celdas.forEach(cel => cel.classList.remove("seleccionada"));
      if (encontrada && !encontradas.has(encontrada.palabra)) {
        encontradas.add(encontrada.palabra);
        pintarPalabra(encontrada, celdas, p.columnas);
        const chip = listaPalabras.querySelector(`[data-palabra="${encontrada.palabra}"]`);
        if (chip) chip.classList.add("chip-encontrada");
        if (encontradas.size === p.palabras.length) habilitarSiguiente();
      }
      seleccionInicio = null;
    }
  };

  function pintarPalabra(u, celdas, columnas) {
    const df = Math.sign(u.fin.f - u.inicio.f);
    const dc = Math.sign(u.fin.c - u.inicio.c);
    let f = u.inicio.f, c = u.inicio.c;
    while (true) {
      const idx = f * columnas + c;
      celdas[idx].classList.add("celda-encontrada");
      if (f === u.fin.f && c === u.fin.c) break;
      f += df; c += dc;
    }
  }

  function generarSopa(palabras, filas, columnas) {
    const grid = Array.from({ length: filas }, () => Array(columnas).fill(""));
    const ubicaciones = [];
    const direcciones = [{ df: 0, dc: 1 }, { df: 1, dc: 0 }];

    palabras.forEach(palabra => {
      let colocada = false;
      let intentos = 0;
      while (!colocada && intentos < 150) {
        intentos++;
        const dir = direcciones[Math.floor(Math.random() * direcciones.length)];
        const maxF = dir.df === 1 ? filas - palabra.length : filas - 1;
        const maxC = dir.dc === 1 ? columnas - palabra.length : columnas - 1;
        if (maxF < 0 || maxC < 0) continue;
        const f0 = Math.floor(Math.random() * (maxF + 1));
        const c0 = Math.floor(Math.random() * (maxC + 1));
        let cabe = true;
        for (let i = 0; i < palabra.length; i++) {
          const f = f0 + dir.df * i, c = c0 + dir.dc * i;
          if (grid[f][c] !== "" && grid[f][c] !== palabra[i]) { cabe = false; break; }
        }
        if (!cabe) continue;
        for (let i = 0; i < palabra.length; i++) {
          const f = f0 + dir.df * i, c = c0 + dir.dc * i;
          grid[f][c] = palabra[i];
        }
        ubicaciones.push({
          palabra,
          inicio: { f: f0, c: c0 },
          fin: { f: f0 + dir.df * (palabra.length - 1), c: c0 + dir.dc * (palabra.length - 1) }
        });
        colocada = true;
      }
    });

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let f = 0; f < filas; f++) {
      for (let c = 0; c < columnas; c++) {
        if (grid[f][c] === "") grid[f][c] = letras[Math.floor(Math.random() * letras.length)];
      }
    }
    return { grid, ubicaciones };
  }

  CONSTRUCTORES.memojuego = function (p) {
    const cont = crear("div", "pantalla memojuego-pantalla");
    cont.appendChild(crear("h2", "titulo", p.titulo));
    cont.appendChild(crear("p", "instruccion", "Tocá una carta y después la que creas que es su pareja."));

    let cartas = [];
    p.pares.forEach((par, i) => {
      cartas.push({ id: i, texto: par.a, grupo: i, audio: par.audioA });
      cartas.push({ id: i, texto: par.b, grupo: i, audio: par.audioB });
    });
    cartas = shuffle(cartas);

    const grid = crear("div", "grid-memojuego");
    let primeraCarta = null;
    let bloqueoTemp = false;
    let paresResueltos = 0;

    cartas.forEach(carta => {
      const boton = crear("button", "carta-memo", carta.texto);
      boton.dataset.grupo = carta.grupo;
      boton.addEventListener("click", bloqueaClicSiInteraccionBloqueada(() => {
        if (bloqueoTemp || boton.classList.contains("resuelta") || boton === primeraCarta) return;
        boton.classList.add("volteada");
        if (carta.audio) reproducirAudioSecundario(carta.audio);

        if (!primeraCarta) {
          primeraCarta = boton;
          return;
        }
        bloqueoTemp = true;
        if (primeraCarta.dataset.grupo === boton.dataset.grupo) {
          primeraCarta.classList.add("resuelta");
          boton.classList.add("resuelta");
          paresResueltos++;
          primeraCarta = null;
          bloqueoTemp = false;
          if (paresResueltos === p.pares.length) habilitarSiguiente();
        } else {
          setTimeout(() => {
            primeraCarta.classList.remove("volteada");
            boton.classList.remove("volteada");
            primeraCarta = null;
            bloqueoTemp = false;
          }, 900);
        }
      }));
      grid.appendChild(boton);
    });
    cont.appendChild(grid);
    app.appendChild(cont);
  };

  CONSTRUCTORES.cierre = function (p) {
    const cont = crear("div", "pantalla cierre-pantalla");
    if (p.imagen) {
      const img = crear("img", "imagen-cierre");
      img.src = p.imagen; img.alt = p.titulo;
      cont.appendChild(img);
    }
    cont.appendChild(crear("h1", "titulo-cierre", p.titulo));
    const parrafo = crear("p", "cuerpo-texto");
    parrafo.textContent = p.texto;
    cont.appendChild(parrafo);

    if (p.mostrarPuntaje) {
      const total = puntaje.correctos + puntaje.incorrectos;
      const pct = total > 0 ? Math.round((puntaje.correctos / total) * 100) : 0;
      const cajaPuntaje = crear("div", "caja-puntaje-final");
      cajaPuntaje.appendChild(crear("h3", null, "Tu puntaje"));
      cajaPuntaje.appendChild(crear("p", "puntaje-detalle", `✅ Aciertos: ${puntaje.correctos}   ❌ Errores: ${puntaje.incorrectos}`));
      cajaPuntaje.appendChild(crear("p", "puntaje-porcentaje", `${pct}% de respuestas correctas`));
      cont.appendChild(cajaPuntaje);
    }

    if (p.fotoPerfil) {
      const perfilCont = crear("div", "perfil-container");
      const thumb = crear("img", "perfil-thumb");
      thumb.src = p.fotoPerfil;
      thumb.alt = "Foto de perfil";
      thumb.addEventListener("click", () => abrirLightbox(thumb.src));
      perfilCont.appendChild(thumb);
      cont.appendChild(perfilCont);
    }

    if (p.botonVolver) {
      const btnVolver = crear("button", "boton-volver-jugar", "🔄 Volver a jugar");
      btnVolver.addEventListener("click", () => {
        idxActual = 0;
        puntaje.correctos = 0;
        puntaje.incorrectos = 0;
        preguntasContadas.clear();
        actualizarMarcadorPuntaje();
        renderizar(idxActual);
      });
      cont.appendChild(btnVolver);
    }

    app.appendChild(cont);
    habilitarSiguiente();
  };

  // ---------- Navegación ----------
  btnSiguiente.addEventListener("click", () => {
    if (btnSiguiente.disabled) return;
    if (idxActual < DATOS.pantallas.length - 1) {
      idxActual++;
      renderizar(idxActual);
      window.scrollTo(0, 0);
    }
  });

  // ---------- Inicio ----------
  document.addEventListener("DOMContentLoaded", () => {
    actualizarMarcadorPuntaje();
    renderizar(idxActual);
  });

  // Exponer para testing (jsdom)
  window.__MOTOR_TEST__ = {
    renderizar,
    avanzarA(i) { idxActual = i; renderizar(i); },
    get idxActual() { return idxActual; },
    DATOS,
    puntaje
  };
})();
