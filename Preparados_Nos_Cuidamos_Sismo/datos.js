/* ============================================================
   PREPARADOS NOS CUIDAMOS - Qué hacer frente a un sismo
   datos.js — Contenido de todas las pantallas (v2, revisión completa)
   Basado en: Plan de Contingencia Modelo DGE/Defensa Civil Mendoza 2025
              y Plan de Acción Familiar (P.A.F.) Defensa Civil Mendoza
   ============================================================ */

window.DATOS = {
  titulo: "Preparados nos cuidamos",
  subtitulo: "Qué hacer frente a un sismo",

  pantallas: [

    /* ---------- 0. PORTADA ---------- */
    {
      id: "portada",
      tipo: "portada",
      titulo: "Preparados nos cuidamos",
      subtitulo: "Qué hacer frente a un sismo",
      imagen: "img/portada.jpg"
    },

    /* ---------- 0b. VIDEO INFORMATIVO (material complementario) ---------- */
    {
      id: "video-info",
      tipo: "video",
      titulo: "Antes de empezar, mirá este video",
      texto: "El Gobierno de Mendoza preparó este video con información clave sobre qué hacer frente a un sismo. Tocá el botón de play para verlo, y cuando termines, tocá Continuar para seguir con las actividades.",
      audioInstr: "audio/00b_instr.mp3",
      youtubeId: "K9TyuJr9dEk",
      vertical: true,
      fuente: "Fuente: Gobierno de Mendoza"
    },

    /* ---------- 1. ¿Qué es un sismo? ---------- */
    {
      id: "p01",
      tipo: "narracion",
      titulo: "¿Qué es un sismo?",
      imagen: "img/01_que_es_sismo.jpg",
      texto: "Un sismo es un movimiento de la tierra. A veces es suave y casi no se siente, y a veces es fuerte. Mendoza es una zona sísmica, por eso en la escuela y en casa nos preparamos: si sabemos qué hacer, nos cuidamos entre todos.",
      audioInstr: "audio/01_instr.mp3"
    },

    /* ---------- 2. Clasificar: zonas seguras del aula ---------- */
    {
      id: "p02",
      tipo: "clasificar",
      titulo: "Zonas seguras del aula",
      instruccionTexto: "Tocá cada lugar del aula y despues tocá la categoría Zona Segura o Zona de Riesgo para ubicarlo. Se clasifica al toque, no hace falta ningún botón más.",
      audioInstr: "audio/02_instr.mp3",
      imagen: "img/02_aula_base.jpg",
      categorias: [
        { id: "segura", nombre: "Zona Segura", color: "#2e7d32" },
        { id: "riesgo", nombre: "Zona de Riesgo", color: "#c62828" }
      ],
      items: [
        { id: "columna",  texto: "Al lado de una columna",        imagen: "img/02_item_columna.png",  categoria: "segura", audio: "audio/02_item_columna.mp3", audioCorrecta: "audio/02_columna_correcta.mp3", audioIncorrecta: "audio/02_columna_incorrecta.mp3" },
        { id: "escritorio", texto: "Debajo del escritorio",       imagen: "img/02_item_escritorio.png", categoria: "segura", audio: "audio/02_item_escritorio.mp3", audioCorrecta: "audio/02_escritorio_correcta.mp3", audioIncorrecta: "audio/02_escritorio_incorrecta.mp3" },
        { id: "ventana",  texto: "Al lado de la ventana",         imagen: "img/02_item_ventana.png",  categoria: "riesgo", audio: "audio/02_item_ventana.mp3", audioCorrecta: "audio/02_ventana_correcta.mp3", audioIncorrecta: "audio/02_ventana_incorrecta.mp3" },
        { id: "estufa",   texto: "Cerca de la estufa",            imagen: "img/02_item_estufa.png",   categoria: "riesgo", audio: "audio/02_item_estufa.mp3", audioCorrecta: "audio/02_estufa_correcta.mp3", audioIncorrecta: "audio/02_estufa_incorrecta.mp3" },
        { id: "biblioteca", texto: "Debajo de la biblioteca (mueble alto)", imagen: "img/02_item_biblioteca.png", categoria: "riesgo", audio: "audio/02_item_biblioteca.mp3", audioCorrecta: "audio/02_biblioteca_correcta.mp3", audioIncorrecta: "audio/02_biblioteca_incorrecta.mp3" },
        { id: "filabancos", texto: "Entre las filas de bancos",   imagen: "img/02_item_filabancos.png", categoria: "segura", audio: "audio/02_item_filabancos.mp3", audioCorrecta: "audio/02_filabancos_correcta.mp3", audioIncorrecta: "audio/02_filabancos_incorrecta.mp3" }
      ],
      audioConfirma: "audio/02_confirma.mp3"
    },

    /* ---------- 3. Ordenar: Posición Lateral de Seguridad ---------- */
    {
      id: "p03",
      tipo: "ordenar",
      titulo: "La Posición de Seguridad",
      instruccionTexto: "Tocá los pasos en el orden correcto para ponerte en la Posición de Seguridad durante un sismo. Esto es mientras estás agachado y quieto: después, al caminar para evacuar, las manos van libres.",
      audioInstr: "audio/03_instr.mp3",
      imagen: "img/03_pls.jpg",
      pasos: [
        { id: "a", texto: "Agachate al costado de tu banco",            audio: "audio/03_paso_a.mp3" },
        { id: "b", texto: "Ponete de costado, en posición fetal",       audio: "audio/03_paso_b.mp3" },
        { id: "c", texto: "Poné un brazo sobre tu cabeza para protegerte", audio: "audio/03_paso_c.mp3" },
        { id: "d", texto: "Quedate quieto y esperá la indicación del docente", audio: "audio/03_paso_d.mp3" }
      ],
      audioConfirma: "audio/03_confirma.mp3"
    },

    /* ---------- 4. Trivia: manos al caminar (evacuar) ---------- */
    {
      id: "p04",
      tipo: "trivia",
      titulo: "¿Qué hago con mis manos al caminar?",
      instruccionTexto: "Elegí la opción correcta y después pulsá Verificar.",
      audioInstr: "audio/04_instr.mp3",
      audioPregunta: "audio/04_pregunta.mp3",
      imagen: "img/04_manos.jpg",
      pregunta: "Cuando terminaste de estar agachado y empezás a caminar hacia la zona segura, ¿para qué usamos las manos?",
      opciones: [
        { texto: "Para taparnos la cabeza",   correcta: false },
        { texto: "Para sostenernos y no perder el equilibrio", correcta: true },
        { texto: "Para aplaudir",             correcta: false }
      ],
      audioConfirmaCorrecta: "audio/04_correcta.mp3",
      audioConfirmaIncorrecta: "audio/04_incorrecta.mp3"
    },

    /* ---------- 5. Ordenar: secuencia durante el sismo ---------- */
    {
      id: "p05",
      tipo: "ordenar",
      titulo: "Durante el sismo",
      instruccionTexto: "Tocá los pasos en el orden correcto de lo que hacemos durante el sismo.",
      audioInstr: "audio/05_instr.mp3",
      imagen: "img/05_durante.jpg",
      pasos: [
        { id: "a", texto: "Mantener la calma",                          audio: "audio/05_paso_a.mp3" },
        { id: "b", texto: "Alejarme de ventanas y objetos que puedan caer", audio: "audio/05_paso_b.mp3" },
        { id: "c", texto: "Ubicarme en la zona segura del aula",        audio: "audio/05_paso_c.mp3" },
        { id: "d", texto: "Esperar la indicación de la seño o el profe", audio: "audio/05_paso_d.mp3" }
      ],
      audioConfirma: "audio/05_confirma.mp3"
    },

    /* ---------- 6a/6b/6c. Mitos y verdades (partido en 3 pantallas) ---------- */
    {
      id: "p06a",
      tipo: "trivia",
      titulo: "Mitos y verdades (1 de 3)",
      instruccionTexto: "Leé la frase y decidí si es Verdadero o Falso. Elegí tu respuesta y pulsá Verificar.",
      audioInstr: "audio/06a_instr.mp3",
      audioPregunta: "audio/06a_pregunta.mp3",
      imagen: "img/06a_mitos.jpg",
      pregunta: "Durante un sismo hay que correr y gritar.",
      opciones: [
        { texto: "Verdadero", correcta: false },
        { texto: "Falso", correcta: true }
      ],
      audioConfirmaCorrecta: "audio/06a_correcta.mp3",
      audioConfirmaIncorrecta: "audio/06a_incorrecta.mp3"
    },
    {
      id: "p06b",
      tipo: "trivia",
      titulo: "Mitos y verdades (2 de 3)",
      instruccionTexto: "Leé la frase y decidí si es Verdadero o Falso. Elegí tu respuesta y pulsá Verificar.",
      audioInstr: "audio/06b_instr.mp3",
      audioPregunta: "audio/06b_pregunta.mp3",
      imagen: "img/06b_mitos.jpg",
      pregunta: "Hay que alejarse de las ventanas y los vidrios.",
      opciones: [
        { texto: "Verdadero", correcta: true },
        { texto: "Falso", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/06b_correcta.mp3",
      audioConfirmaIncorrecta: "audio/06b_incorrecta.mp3"
    },
    {
      id: "p06c",
      tipo: "trivia",
      titulo: "Mitos y verdades (3 de 3)",
      instruccionTexto: "Leé la frase y decidí si es Verdadero o Falso. Elegí tu respuesta y pulsá Verificar.",
      audioInstr: "audio/06c_instr.mp3",
      audioPregunta: "audio/06c_pregunta.mp3",
      imagen: "img/06c_mitos.jpg",
      pregunta: "Se puede usar el ascensor para bajar más rápido.",
      opciones: [
        { texto: "Verdadero", correcta: false },
        { texto: "Falso", correcta: true }
      ],
      audioConfirmaCorrecta: "audio/06c_correcta.mp3",
      audioConfirmaIncorrecta: "audio/06c_incorrecta.mp3"
    },

    /* ---------- 7. Asociar: roles en la escuela ---------- */
    {
      id: "p07",
      tipo: "asociar",
      titulo: "¿Quién hace qué?",
      instruccionTexto: "Uní cada persona con la tarea que le toca hacer durante la emergencia. Tocá una tarjeta y después su pareja.",
      audioInstr: "audio/07_instr.mp3",
      imagen: "img/07_roles.jpg",
      pares: [
        {
          id: "director", izq: "La directora", izqImagen: "img/07_icono_directora.png", izqAudio: "audio/07_izq_director.mp3",
          der: "Organiza la evacuación y llama a los servicios de emergencia", derAudio: "audio/07_der_director.mp3",
          audioConfirmaPar: "audio/07_confirma_director.mp3"
        },
        {
          id: "docente", izq: "La seño o el profe", izqImagen: "img/07_icono_docente.png", izqAudio: "audio/07_izq_docente.mp3",
          der: "Guía a los alumnos a la zona segura y cuenta que estén todos", derAudio: "audio/07_der_docente.mp3",
          audioConfirmaPar: "audio/07_confirma_docente.mp3"
        },
        {
          id: "celador", izq: "El celador o la celadora", izqImagen: "img/07_icono_celador.png", izqAudio: "audio/07_izq_celador.mp3",
          der: "Abre las puertas y corta el gas, la luz y el agua", derAudio: "audio/07_der_celador.mp3",
          audioConfirmaPar: "audio/07_confirma_celador.mp3"
        },
        {
          id: "alumno", izq: "Los alumnos", izqImagen: "img/07_icono_alumnos.png", izqAudio: "audio/07_izq_alumno.mp3",
          der: "Se ubican en la zona segura y ayudan a sus compañeros", derAudio: "audio/07_der_alumno.mp3",
          audioConfirmaPar: "audio/07_confirma_alumno.mp3"
        }
      ]
    },

    /* ---------- 8. Hotspot: cortar los suministros ---------- */
    {
      id: "p08",
      tipo: "hotspot",
      titulo: "Cortamos los suministros",
      instruccionTexto: "Tocá en la imagen la llave de gas, la de agua y la luz para cortarlas después del sismo.",
      audioInstr: "audio/08_instr.mp3",
      imagen: "img/08_suministros.jpg",
      zonas: [
        { id: "gas",  x: 0.16, y: 0.00, w: 0.16, h: 0.36, label: "Llave de gas cortada 🚫",     audio: "audio/08_gas.mp3" },
        { id: "agua", x: 0.44, y: 0.00, w: 0.16, h: 0.34, label: "Llave de agua cortada 🚫",    audio: "audio/08_agua.mp3" },
        { id: "luz",  x: 0.70, y: 0.00, w: 0.22, h: 0.40, label: "Tablero de luz cortado 🚫",   audio: "audio/08_luz.mp3" }
      ],
      audioConfirma: "audio/08_confirma.mp3"
    },

    /* ---------- 9. Recorrido: evacuación al punto de encuentro ---------- */
    {
      id: "p09",
      tipo: "recorrido",
      titulo: "Vamos al Punto de Encuentro",
      instruccionTexto: "Tocá los números en orden para seguir el camino de evacuación hasta el Punto de Encuentro.",
      audioInstr: "audio/09_instr.mp3",
      imagen: "img/09_recorrido.jpg",
      puntos: [
        { id: "1", x: 0.22, y: 0.48, label: "Salgo del aula",      imagen: "img/09_punto1.jpg", audio: "audio/09_punto1.mp3" },
        { id: "2", x: 0.50, y: 0.68, label: "Camino por el pasillo sin correr", imagen: "img/09_punto2.jpg", audio: "audio/09_punto2.mp3" },
        { id: "3", x: 0.83, y: 0.48, label: "Salgo por la puerta señalizada", imagen: "img/09_punto3.jpg", audio: "audio/09_punto3.mp3" },
        { id: "4", x: 0.85, y: 0.15, label: "Llego al Punto de Encuentro", imagen: "img/09_punto4.jpg", audio: "audio/09_punto4.mp3" }
      ],
      audioLlegada: "audio/09_llegada.mp3"
    },

    /* ---------- 10. Sopa de letras: vocabulario ---------- */
    {
      id: "p10",
      tipo: "sopaLetras",
      titulo: "Sopa de letras",
      instruccionTexto: "Tocá la primera letra y la última letra de cada palabra escondida. Pueden estar en horizontal, vertical o en diagonal.",
      audioInstr: "audio/10_instr.mp3",
      imagen: "img/10_sopa.jpg",
      palabras: [
        { palabra: "SISMO", audio: "audio/10_sismo.mp3" },
        { palabra: "CALMA", audio: "audio/10_calma.mp3" },
        { palabra: "EVACUAR", audio: "audio/10_evacuar.mp3" },
        { palabra: "SEGURO", audio: "audio/10_seguro.mp3" },
        { palabra: "ZONA", audio: "audio/10_zona.mp3" },
        { palabra: "AYUDA", audio: "audio/10_ayuda.mp3" }
      ]
    },

    /* ---------- 11. Trivia: en el punto de encuentro ---------- */
    {
      id: "p11",
      tipo: "trivia",
      titulo: "En el Punto de Encuentro",
      instruccionTexto: "Elegí la opción correcta y pulsá Verificar.",
      audioInstr: "audio/11_instr.mp3",
      audioPregunta: "audio/11_pregunta.mp3",
      imagen: "img/11_punto_encuentro.jpg",
      pregunta: "Una vez en el Punto de Encuentro, ¿qué es lo primero que hace la seño o el profe?",
      opciones: [
        { texto: "Cuenta a todos los alumnos para verificar que estén",  correcta: true },
        { texto: "Manda a los chicos a jugar",  correcta: false },
        { texto: "Se va a su casa",             correcta: false }
      ],
      audioConfirmaCorrecta: "audio/11_correcta.mp3",
      audioConfirmaIncorrecta: "audio/11_incorrecta.mp3"
    },

    /* ---------- 12. Clasificar: revisar la escuela ---------- */
    {
      id: "p12",
      tipo: "clasificar",
      titulo: "Revisamos la escuela",
      instruccionTexto: "Después del sismo hay que revisar el edificio. Tocá cada imagen y despues tocá Hay Daño o Está Bien para clasificarla. Se clasifica al toque, no hace falta ningún botón más.",
      audioInstr: "audio/12_instr.mp3",
      imagen: "img/12_revision.jpg",
      categorias: [
        { id: "dano", nombre: "Hay Daño", color: "#c62828" },
        { id: "bien", nombre: "Está Bien", color: "#2e7d32" }
      ],
      items: [
        { id: "vidrio",  texto: "Vidrio roto",        imagen: "img/12_item_vidrio.png",  categoria: "dano", audio: "audio/12_item_vidrio.mp3", audioCorrecta: "audio/12_vidrio_correcta.mp3", audioIncorrecta: "audio/12_vidrio_incorrecta.mp3" },
        { id: "grieta",  texto: "Grieta en la pared",  imagen: "img/12_item_grieta.png",  categoria: "dano", audio: "audio/12_item_grieta.mp3", audioCorrecta: "audio/12_grieta_correcta.mp3", audioIncorrecta: "audio/12_grieta_incorrecta.mp3" },
        { id: "puerta",  texto: "Puerta que abre bien", imagen: "img/12_item_puerta.png", categoria: "bien", audio: "audio/12_item_puerta.mp3", audioCorrecta: "audio/12_puerta_correcta.mp3", audioIncorrecta: "audio/12_puerta_incorrecta.mp3" },
        { id: "pared",   texto: "Pared lisa, sin marcas", imagen: "img/12_item_pared.png", categoria: "bien", audio: "audio/12_item_pared.mp3", audioCorrecta: "audio/12_pared_correcta.mp3", audioIncorrecta: "audio/12_pared_incorrecta.mp3" }
      ],
      audioConfirma: "audio/12_confirma.mp3"
    },

    /* ---------- 13. Narración: la mochila de emergencia ---------- */
    {
      id: "p13",
      tipo: "narracion",
      titulo: "La Mochila de Emergencia",
      imagen: "img/13_mochila.jpg",
      texto: "En casa también nos preparamos. La Mochila de Emergencia tiene todo lo necesario para usar rápido si hay que salir de casa: agua, linterna, botiquín, documentos y algo de comida. ¡Vamos a armarla juntos!",
      audioInstr: "audio/13_instr.mp3"
    },

    /* ---------- 14. Clasificar: armar la mochila ---------- */
    {
      id: "p14",
      tipo: "clasificar",
      titulo: "Armamos la mochila",
      instruccionTexto: "Tocá cada objeto y despues tocá Va en la Mochila o No Va para clasificarlo. Se clasifica al toque, no hace falta ningún botón más.",
      audioInstr: "audio/14_instr.mp3",
      imagen: "img/14_mochila_base.jpg",
      categorias: [
        { id: "va", nombre: "Va en la Mochila", color: "#2e7d32" },
        { id: "noVa", nombre: "No Va", color: "#c62828" }
      ],
      items: [
        { id: "agua",     texto: "Botella de agua",         imagen: "img/14_item_agua.png",     categoria: "va",   audio: "audio/14_item_agua.mp3", audioCorrecta: "audio/14_agua_correcta.mp3", audioIncorrecta: "audio/14_agua_incorrecta.mp3" },
        { id: "linterna", texto: "Linterna a pilas",        imagen: "img/14_item_linterna.png", categoria: "va",   audio: "audio/14_item_linterna.mp3", audioCorrecta: "audio/14_linterna_correcta.mp3", audioIncorrecta: "audio/14_linterna_incorrecta.mp3" },
        { id: "botiquin", texto: "Botiquín",                imagen: "img/14_item_botiquin.png", categoria: "va",   audio: "audio/14_item_botiquin.mp3", audioCorrecta: "audio/14_botiquin_correcta.mp3", audioIncorrecta: "audio/14_botiquin_incorrecta.mp3" },
        { id: "documentos", texto: "Documentos de la familia", imagen: "img/14_item_documentos.png", categoria: "va", audio: "audio/14_item_documentos.mp3", audioCorrecta: "audio/14_documentos_correcta.mp3", audioIncorrecta: "audio/14_documentos_incorrecta.mp3" },
        { id: "juguete",  texto: "Un juguete grande",        imagen: "img/14_item_juguete.png",  categoria: "noVa", audio: "audio/14_item_juguete.mp3", audioCorrecta: "audio/14_juguete_correcta.mp3", audioIncorrecta: "audio/14_juguete_incorrecta.mp3" },
        { id: "television", texto: "Un televisor",          imagen: "img/14_item_television.png", categoria: "noVa", audio: "audio/14_item_television.mp3", audioCorrecta: "audio/14_television_correcta.mp3", audioIncorrecta: "audio/14_television_incorrecta.mp3" }
      ],
      audioConfirma: "audio/14_confirma.mp3"
    },

    /* ---------- 15. Trivia: punto de reunión familiar ---------- */
    {
      id: "p15",
      tipo: "trivia",
      titulo: "El punto de reunión familiar",
      instruccionTexto: "Elegí la opción correcta y pulsá Verificar.",
      audioInstr: "audio/15_instr.mp3",
      audioPregunta: "audio/15_pregunta.mp3",
      imagen: "img/15_reunion_familiar.jpg",
      pregunta: "¿Por qué es importante que la familia elija un punto de reunión antes de que pase algo?",
      opciones: [
        { texto: "Porque si no están todos juntos cuando pasa el sismo, ahí saben dónde encontrarse", correcta: true },
        { texto: "Porque es un juego",  correcta: false },
        { texto: "No es importante",    correcta: false }
      ],
      audioConfirmaCorrecta: "audio/15_correcta.mp3",
      audioConfirmaIncorrecta: "audio/15_incorrecta.mp3"
    },

    /* ---------- 16. Clasificar: zonas seguras en casa ---------- */
    {
      id: "p16",
      tipo: "clasificar",
      titulo: "Zonas seguras en casa",
      instruccionTexto: "Tocá cada lugar de la casa y despues tocá Zona Segura o Zona de Riesgo para ubicarlo. Se clasifica al toque, no hace falta ningún botón más.",
      audioInstr: "audio/16_instr.mp3",
      imagen: "img/16_casa_base.jpg",
      categorias: [
        { id: "segura", nombre: "Zona Segura", color: "#2e7d32" },
        { id: "riesgo", nombre: "Zona de Riesgo", color: "#c62828" }
      ],
      items: [
        { id: "marco",   texto: "Marco de una puerta reforzada", imagen: "img/16_item_marco.png",   categoria: "segura", audio: "audio/16_item_marco.mp3", audioCorrecta: "audio/16_marco_correcta.mp3", audioIncorrecta: "audio/16_marco_incorrecta.mp3" },
        { id: "mesa",    texto: "Debajo de una mesa firme",      imagen: "img/16_item_mesa.png",     categoria: "segura", audio: "audio/16_item_mesa.mp3", audioCorrecta: "audio/16_mesa_correcta.mp3", audioIncorrecta: "audio/16_mesa_incorrecta.mp3" },
        { id: "alacena", texto: "Cerca de la alacena de la cocina", imagen: "img/16_item_alacena.png", categoria: "riesgo", audio: "audio/16_item_alacena.mp3", audioCorrecta: "audio/16_alacena_correcta.mp3", audioIncorrecta: "audio/16_alacena_incorrecta.mp3" },
        { id: "espejo",  texto: "Debajo de un espejo grande",    imagen: "img/16_item_espejo.png",   categoria: "riesgo", audio: "audio/16_item_espejo.mp3", audioCorrecta: "audio/16_espejo_correcta.mp3", audioIncorrecta: "audio/16_espejo_incorrecta.mp3" }
      ],
      audioConfirma: "audio/16_confirma.mp3"
    },

    /* ---------- 17. Ordenar: repaso Antes / Durante / Después ---------- */
    {
      id: "p17",
      tipo: "ordenar",
      titulo: "Repasamos todo",
      instruccionTexto: "Tocá en el orden correcto estos tres momentos frente a un sismo.",
      audioInstr: "audio/17_instr.mp3",
      imagen: "img/17_repaso.jpg",
      pasos: [
        { id: "a", texto: "Conozco las zonas seguras y tengo mi mochila lista", audio: "audio/17_paso_a.mp3" },
        { id: "b", texto: "Mantengo la calma y me ubico en la zona segura",   audio: "audio/17_paso_b.mp3" },
        { id: "c", texto: "Voy al Punto de Encuentro y espero indicaciones",  audio: "audio/17_paso_c.mp3" }
      ],
      audioConfirma: "audio/17_confirma.mp3"
    },

    /* ---------- 18a-e. Desafío final (partido en 5 pantallas) ---------- */
    {
      id: "p18a",
      tipo: "trivia",
      titulo: "Desafío final (1 de 5)",
      instruccionTexto: "Respondé la pregunta y pulsá Verificar.",
      audioInstr: "audio/18a_instr.mp3",
      audioPregunta: "audio/18a_pregunta.mp3",
      imagen: "img/06a_mitos.jpg",
      pregunta: "¿Qué hacemos primero al sentir un sismo?",
      opciones: [
        { texto: "Mantener la calma", correcta: true },
        { texto: "Salir corriendo", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/18a_correcta.mp3",
      audioConfirmaIncorrecta: "audio/18a_incorrecta.mp3"
    },
    {
      id: "p18b",
      tipo: "trivia",
      titulo: "Desafío final (2 de 5)",
      instruccionTexto: "Respondé la pregunta y pulsá Verificar.",
      audioInstr: "audio/18b_instr.mp3",
      audioPregunta: "audio/18b_pregunta.mp3",
      imagen: "img/02_aula_base.jpg",
      pregunta: "¿Dónde nos ubicamos en el aula?",
      opciones: [
        { texto: "En la zona segura, cerca de columnas o debajo del banco", correcta: true },
        { texto: "Cerca de la ventana", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/18b_correcta.mp3",
      audioConfirmaIncorrecta: "audio/18b_incorrecta.mp3"
    },
    {
      id: "p18c",
      tipo: "trivia",
      titulo: "Desafío final (3 de 5)",
      instruccionTexto: "Respondé la pregunta y pulsá Verificar.",
      audioInstr: "audio/18c_instr.mp3",
      audioPregunta: "audio/18c_pregunta.mp3",
      imagen: "img/11_punto_encuentro.jpg",
      pregunta: "¿A dónde vamos después de evacuar?",
      opciones: [
        { texto: "Al Punto de Encuentro", correcta: true },
        { texto: "A jugar al patio", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/18c_correcta.mp3",
      audioConfirmaIncorrecta: "audio/18c_incorrecta.mp3"
    },
    {
      id: "p18d",
      tipo: "trivia",
      titulo: "Desafío final (4 de 5)",
      instruccionTexto: "Respondé la pregunta y pulsá Verificar.",
      audioInstr: "audio/18d_instr.mp3",
      audioPregunta: "audio/18d_pregunta.mp3",
      imagen: "img/13_mochila.jpg",
      pregunta: "¿Qué tenemos lista en casa para una emergencia?",
      opciones: [
        { texto: "La Mochila de Emergencia", correcta: true },
        { texto: "La play", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/18d_correcta.mp3",
      audioConfirmaIncorrecta: "audio/18d_incorrecta.mp3"
    },
    {
      id: "p18e",
      tipo: "trivia",
      titulo: "Desafío final (5 de 5)",
      instruccionTexto: "Respondé la pregunta y pulsá Verificar.",
      audioInstr: "audio/18e_instr.mp3",
      audioPregunta: "audio/18e_pregunta.mp3",
      imagen: "img/18_desafio.jpg",
      pregunta: "Saber qué hacer frente a un sismo es...",
      opciones: [
        { texto: "Cuidarnos entre todos", correcta: true },
        { texto: "Perder el tiempo", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/18e_correcta.mp3",
      audioConfirmaIncorrecta: "audio/18e_incorrecta.mp3"
    },

    /* ---------- 19. Hotspot: el plano real de la escuela ---------- */
    {
      id: "p19",
      tipo: "hotspot",
      titulo: "El plano de mi escuela",
      instruccionTexto: "Este es el plano real de una escuela. Podés tocar la lupa para verlo más grande. Cuando termines de mirarlo, cerralo para volver y tocar las dos Zonas de Seguridad, el extintor y el botiquín.",
      audioInstr: "audio/19_instr.mp3",
      imagen: "img/19_plano_escuela.jpg",
      ampliable: true,
      zonas: [
        { id: "zona1", x: 0.24, y: 0.06, w: 0.15, h: 0.23, label: "Zona de Seguridad", audio: "audio/19_zona1.mp3" },
        { id: "zona2", x: 0.43, y: 0.06, w: 0.36, h: 0.14, label: "Playón Deportivo, Zona de Seguridad", audio: "audio/19_zona2.mp3" },
        { id: "extintor", x: 0.465, y: 0.60, w: 0.05, h: 0.08, label: "Extintor", audio: "audio/19_extintor.mp3" },
        { id: "botiquin", x: 0.42, y: 0.68, w: 0.07, h: 0.08, label: "Botiquín", audio: "audio/19_botiquin.mp3" }
      ],
      audioConfirma: "audio/19_confirma.mp3"
    },

    /* ---------- 20. CIERRE ---------- */
    {
      id: "cierre",
      tipo: "cierre",
      titulo: "¡Ya estamos preparados!",
      imagen: "img/cierre.jpg"
    }

  ]
};
