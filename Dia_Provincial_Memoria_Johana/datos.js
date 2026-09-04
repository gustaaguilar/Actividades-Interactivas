/* ============================================================
   DÍA PROVINCIAL EN MEMORIA DE JOHANA
   Actividades interactivas — datos.js (v2, revisión completa)
   Basado en la propuesta pedagógica de la Dirección de
   Acompañamiento Escolar (DGE Mendoza) — Ley número 8723
   ============================================================ */

window.DATOS = {

  /* ============================================================
     PORTADA (selector de ciclo)
     ============================================================ */
  portada: {
    id: "portada",
    tipo: "portada",
    titulo: "Jornada Institucional en Memoria de Johana Chacón",
    subtitulo: "4 de septiembre · Construcción colectiva de conciencia ciudadana y derechos",
    imagen: "img/portada.jpg"
  },

  /* ============================================================
     RAMA A — 1° a 3° grado: autocuidado, derechos y juego
     ============================================================ */
  ramaA: [

    /* ---------- A0. Video introductorio (short) ---------- */
    {
      id: "a00-video",
      tipo: "video",
      titulo: "Antes de empezar, mirá este video",
      texto: "Este video nos cuenta cuáles son los derechos que tienen todos los chicos y chicas. Tocá el botón de play para verlo, y cuando termines, tocá Continuar.",
      audioInstr: "audio/a00_instr.mp3",
      youtubeId: "AnwzMUeIh4g",
      vertical: true,
      fuente: "Fuente: video educativo sobre la Convención de los Derechos del Niño"
    },

    /* ---------- A1. Intro ---------- */
    {
      id: "a01-intro",
      tipo: "narracion",
      titulo: "Hoy vamos a hablar de cuidarnos",
      imagen: "img/a01_intro.jpg",
      texto: "Cada 4 de septiembre, en todas las escuelas de Mendoza recordamos un día muy importante. Es un día para pensar en nuestros derechos, para aprender a cuidarnos y para saber que siempre hay alguien a quien podemos pedir ayuda.",
      audioInstr: "audio/a01_instr.mp3"
    },

    /* ---------- A2. Clasificar: Mi mano, mi escudo ---------- */
    {
      id: "a02-mano-escudo",
      tipo: "clasificar",
      titulo: "Mi mano, mi escudo",
      imagen: "img/a02_manoescudo.jpg",
      instruccionTexto: "Tocá cada persona y llevala a la categoría que corresponda. Pensá: ¿a quién le puedo pedir ayuda con confianza?",
      audioInstr: "audio/a02_instr.mp3",
      audioConfirma: "audio/a02_confirma.mp3",
      categorias: [
        { id: "confianza", nombre: "💛 Persona de confianza", color: "#f9a825" },
        { id: "cuidado", nombre: "🤔 Necesito tener cuidado", color: "#5c6bc0" }
      ],
      items: [
        { id: "mama", texto: "Mamá o papá", imagen: "img/a02_item_mama.jpg", categoria: "confianza",
          audio: "audio/a02_item_mama.mp3",
          audioCorrecta: "audio/a02_ok_mama.mp3",
          audioIncorrecta: "audio/a02_no_mama.mp3" },
        { id: "maestra", texto: "Mi maestra o maestro", imagen: "img/a02_item_maestra.jpg", categoria: "confianza",
          audio: "audio/a02_item_maestra.mp3",
          audioCorrecta: "audio/a02_ok_maestra.mp3",
          audioIncorrecta: "audio/a02_no_maestra.mp3" },
        { id: "abuela", texto: "Mi abuela o abuelo", imagen: "img/a02_item_abuela.jpg", categoria: "confianza",
          audio: "audio/a02_item_abuela.mp3",
          audioCorrecta: "audio/a02_ok_abuela.mp3",
          audioIncorrecta: "audio/a02_no_abuela.mp3" },
        { id: "desconocido", texto: "Alguien que no conozco en la calle", imagen: "img/a02_item_desconocido.jpg", categoria: "cuidado",
          audio: "audio/a02_item_desconocido.mp3",
          audioCorrecta: "audio/a02_ok_desconocido.mp3",
          audioIncorrecta: "audio/a02_no_desconocido.mp3" },
        { id: "internet", texto: "Alguien que conocí hoy en internet", imagen: "img/a02_item_internet.jpg", categoria: "cuidado",
          audio: "audio/a02_item_internet.mp3",
          audioCorrecta: "audio/a02_ok_internet.mp3",
          audioIncorrecta: "audio/a02_no_internet.mp3" },
        { id: "secreto", texto: "Alguien que me pide guardar un secreto que me hace sentir mal", imagen: "img/a02_item_secreto.jpg", categoria: "cuidado",
          audio: "audio/a02_item_secreto.mp3",
          audioCorrecta: "audio/a02_ok_secreto.mp3",
          audioIncorrecta: "audio/a02_no_secreto.mp3" }
      ]
    },

    /* ---------- A2b. Semáforo del cuidado (clasificar, 3 categorías) ---------- */
    {
      id: "a02b-semaforo",
      tipo: "clasificar",
      titulo: "El semáforo del cuidado",
      imagen: "img/a02b_semaforo.jpg",
      instruccionTexto: "Mirá cada situación y llevala al color del semáforo que corresponda: verde si está todo bien, amarillo si hay que tener cuidado, o rojo si hay que pedir ayuda ya.",
      audioInstr: "audio/a02b_instr.mp3",
      audioConfirma: "audio/a02b_confirma.mp3",
      categorias: [
        { id: "verde", nombre: "🟢 Todo bien", color: "#43a047" },
        { id: "amarillo", nombre: "🟡 Cuidado", color: "#fdd835" },
        { id: "rojo", nombre: "🔴 Pedir ayuda ya", color: "#e53935" }
      ],
      items: [
        { id: "jugar", texto: "Jugar con mis compañeros en el recreo", imagen: "img/a02b_item_jugar.jpg", categoria: "verde",
          audio: "audio/a02b_item_jugar.mp3", audioCorrecta: "audio/a02b_ok_jugar.mp3", audioIncorrecta: "audio/a02b_no_jugar.mp3" },
        { id: "abrazo", texto: "Un abrazo de mamá o papá", imagen: "img/a02b_item_abrazo.jpg", categoria: "verde",
          audio: "audio/a02b_item_abrazo.mp3", audioCorrecta: "audio/a02b_ok_abrazo.mp3", audioIncorrecta: "audio/a02b_no_abrazo.mp3" },
        { id: "auto", texto: "Un desconocido me invita a subir a su auto", imagen: "img/a02b_item_auto.jpg", categoria: "rojo",
          audio: "audio/a02b_item_auto.mp3", audioCorrecta: "audio/a02b_ok_auto.mp3", audioIncorrecta: "audio/a02b_no_auto.mp3" },
        { id: "miedo", texto: "Alguien me pide guardar un secreto que me da miedo", imagen: "img/a02b_item_miedo.jpg", categoria: "rojo",
          audio: "audio/a02b_item_miedo.mp3", audioCorrecta: "audio/a02b_ok_miedo.mp3", audioIncorrecta: "audio/a02b_no_miedo.mp3" },
        { id: "chat", texto: "Chatear con alguien que no conozco", imagen: "img/a02b_item_chat.jpg", categoria: "amarillo",
          audio: "audio/a02b_item_chat.mp3", audioCorrecta: "audio/a02b_ok_chat.mp3", audioIncorrecta: "audio/a02b_no_chat.mp3" },
        { id: "perdido", texto: "Perder de vista a mi familia en un lugar con mucha gente", imagen: "img/a02b_item_perdido.jpg", categoria: "amarillo",
          audio: "audio/a02b_item_perdido.mp3", audioCorrecta: "audio/a02b_ok_perdido.mp3", audioIncorrecta: "audio/a02b_no_perdido.mp3" }
      ]
    },

    /* ---------- A3. Narración: cuentos y derechos (paráfrasis) ---------- */
    {
      id: "a03-cuentos",
      tipo: "narracion",
      titulo: "Los cuentos también hablan de derechos",
      imagen: "img/a03_cuentos.jpg",
      texto: "Alicia, Cenicienta, Pulgarcito, Caperucita y muchos otros personajes de cuentos nos ayudan a pensar en algo importante: todos los chicos y chicas del mundo tienen derecho a jugar, a descansar, a estudiar, a tener una familia que los cuide y a no sufrir. Cuando algo nos hace sentir mal, tenemos derecho a decir \"no\" y a pedir ayuda.",
      audioInstr: "audio/a03_instr.mp3"
    },

    /* ---------- A3b. Memojuego: ¿Quién me cuida? ---------- */
    {
      id: "a03b-memojuego",
      tipo: "memojuego",
      titulo: "¿Quién me cuida? Memojuego",
      instruccionTexto: "Tocá dos cartas para darlas vuelta. Si son iguales, forman una pareja. Encontrá todas las parejas.",
      audioInstr: "audio/a03b_instr.mp3",
      audioConfirma: "audio/a03b_confirma.mp3",
      pares: [
        { id: "casa", imagen: "img/a03b_par_casa.jpg", audio: "audio/a03b_par_casa.mp3" },
        { id: "escuela", imagen: "img/a03b_par_escuela.jpg", audio: "audio/a03b_par_escuela.mp3" },
        { id: "familia", imagen: "img/a03b_par_familia.jpg", audio: "audio/a03b_par_familia.mp3" },
        { id: "abrazo", imagen: "img/a03b_par_abrazo.jpg", audio: "audio/a03b_par_abrazo.mp3" }
      ]
    },

    /* ---------- A4. Trivia: derechos (resolución automática) ---------- */
    {
      id: "a04-trivia-derechos",
      tipo: "trivia",
      titulo: "¿Qué derecho es?",
      imagen: "img/a04_trivia.jpg",
      instruccionTexto: "Tocá la respuesta correcta.",
      audioInstr: "audio/a04_instr.mp3",
      audioPregunta: "audio/a04_pregunta.mp3",
      pregunta: "Cenicienta quería dejar de trabajar tanto y poder jugar. ¿Qué derecho representa esto?",
      audioConfirmaCorrecta: "audio/a04_ok.mp3",
      audioConfirmaIncorrecta: "audio/a04_no.mp3",
      opciones: [
        { texto: "Derecho a jugar y descansar", correcta: true, audioJustifica: "audio/a04_ok.mp3" },
        { texto: "Derecho a comer golosinas todo el día", correcta: false, audioJustifica: "audio/a04_no_golosinas.mp3" },
        { texto: "Derecho a no ir nunca a la escuela", correcta: false, audioJustifica: "audio/a04_no_escuela.mp3" },
        { texto: "Derecho a tener muchos juguetes", correcta: false, audioJustifica: "audio/a04_no_juguetes.mp3" }
      ]
    },

    /* ---------- A4b. Sopa de letras ---------- */
    {
      id: "a04b-sopaletras",
      tipo: "sopaLetras",
      titulo: "Sopa de letras: palabras del cuidado",
      instruccionTexto: "Tocá la primera letra y la última letra de cada palabra escondida. Pueden estar en horizontal, vertical o en diagonal.",
      audioInstr: "audio/a04b_instr.mp3",
      imagen: "img/a04b_sopa.jpg",
      palabras: [
        { palabra: "AYUDA", audio: "audio/a04b_ayuda.mp3" },
        { palabra: "CUIDAR", audio: "audio/a04b_cuidar.mp3" },
        { palabra: "FAMILIA", audio: "audio/a04b_familia.mp3" },
        { palabra: "ESCUDO", audio: "audio/a04b_escudo.mp3" },
        { palabra: "DERECHO", audio: "audio/a04b_derecho.mp3" },
        { palabra: "CONFIANZA", audio: "audio/a04b_confianza.mp3" }
      ]
    },

    /* ---------- A5. Ordenar: pasos para pedir ayuda ---------- */
    {
      id: "a05-ordenar-ayuda",
      tipo: "ordenar",
      titulo: "Pasos para pedir ayuda",
      imagen: "img/a05_ordenar.jpg",
      instruccionTexto: "Tocá los pasos en el orden correcto, del primero al último.",
      audioInstr: "audio/a05_instr.mp3",
      audioConfirma: "audio/a05_confirma.mp3",
      audioError: "audio/a05_error.mp3",
      pasos: [
        { id: "p1", texto: "Si algo me hace sentir mal, no me quedo callado o callada", audio: "audio/a05_p1.mp3" },
        { id: "p2", texto: "Busco a una persona de confianza", audio: "audio/a05_p2.mp3" },
        { id: "p3", texto: "Le cuento lo que me pasó, con mis palabras", audio: "audio/a05_p3.mp3" },
        { id: "p4", texto: "Sigo pidiendo ayuda hasta que alguien me escuche", audio: "audio/a05_p4.mp3" }
      ]
    },

    /* ---------- A5b, A5c, A5d. Puzzles de imagen ---------- */
    {
      id: "a05b-puzzle1",
      tipo: "puzzleImagen",
      titulo: "Rompecabezas: personas de confianza",
      instruccionTexto: "Tocá dos piezas para intercambiarlas y armar la imagen completa.",
      audioInstr: "audio/a05b_instr.mp3",
      audioConfirma: "audio/a05b_confirma.mp3",
      imagen: "img/a05b_puzzle1.jpg",
      filas: 2, columnas: 3
    },
    {
      id: "a05c-puzzle2",
      tipo: "puzzleImagen",
      titulo: "Rompecabezas: jugando seguros",
      instruccionTexto: "Tocá dos piezas para intercambiarlas y armar la imagen completa.",
      audioInstr: "audio/a05c_instr.mp3",
      audioConfirma: "audio/a05c_confirma.mp3",
      imagen: "img/a05c_puzzle2.jpg",
      filas: 2, columnas: 3
    },
    {
      id: "a05d-puzzle3",
      tipo: "puzzleImagen",
      titulo: "Rompecabezas: mi escudo protector",
      instruccionTexto: "Tocá dos piezas para intercambiarlas y armar la imagen completa.",
      audioInstr: "audio/a05d_instr.mp3",
      audioConfirma: "audio/a05d_confirma.mp3",
      imagen: "img/a05d_puzzle3.jpg",
      filas: 2, columnas: 3
    },

    /* ---------- A6, A7. Asociaciones texto-imagen (situación-acción) ---------- */
    {
      id: "a06-asociar-situaciones",
      tipo: "asociar",
      titulo: "¿Qué hago en cada situación?",
      instruccionTexto: "Uní cada situación con lo que deberías hacer.",
      audioInstr: "audio/a06_instr.mp3",
      pares: [
        { id: "incomodo", izq: "Algo me hace sentir incómodo", izqImagen: "img/a06_sit_incomodo.jpg", izqAudio: "audio/a06_izq_incomodo.mp3",
          der: "Le digo que no y se lo cuento a un adulto de confianza", derAudio: "audio/a06_der_incomodo.mp3",
          audioConfirmaPar: "audio/a06_confirma_incomodo.mp3" },
        { id: "perdido", izq: "Me perdí en un lugar con mucha gente", izqImagen: "img/a06_sit_perdido.jpg", izqAudio: "audio/a06_izq_perdido.mp3",
          der: "Busco a alguien con uniforme o a otra familia con chicos", derAudio: "audio/a06_der_perdido.mp3",
          audioConfirmaPar: "audio/a06_confirma_perdido.mp3" },
        { id: "lastimado", izq: "Me lastimé jugando", izqImagen: "img/a06_sit_lastimado.jpg", izqAudio: "audio/a06_izq_lastimado.mp3",
          der: "Le aviso enseguida a un adulto de confianza", derAudio: "audio/a06_der_lastimado.mp3",
          audioConfirmaPar: "audio/a06_confirma_lastimado.mp3" }
      ]
    },
    {
      id: "a07-asociar-derechos",
      tipo: "asociar",
      titulo: "Cada derecho con su imagen",
      instruccionTexto: "Uní cada derecho con la imagen que lo representa.",
      audioInstr: "audio/a07_instr.mp3",
      pares: [
        { id: "jugar", izq: "Derecho a jugar", izqImagen: "img/a07_der_jugar.jpg", izqAudio: "audio/a07_izq_jugar.mp3",
          der: "Chicos jugando en el patio", derAudio: "audio/a07_der_jugar.mp3",
          audioConfirmaPar: "audio/a07_confirma_jugar.mp3" },
        { id: "estudiar", izq: "Derecho a estudiar", izqImagen: "img/a07_der_estudiar.jpg", izqAudio: "audio/a07_izq_estudiar.mp3",
          der: "Chicos aprendiendo en la escuela", derAudio: "audio/a07_der_estudiar.mp3",
          audioConfirmaPar: "audio/a07_confirma_estudiar.mp3" },
        { id: "familia", izq: "Derecho a una familia que cuide", izqImagen: "img/a07_der_familia.jpg", izqAudio: "audio/a07_izq_familia.mp3",
          der: "Familia abrazada y feliz", derAudio: "audio/a07_der_familia.mp3",
          audioConfirmaPar: "audio/a07_confirma_familia.mp3" }
      ]
    },

    /* ---------- A8. Cierre ---------- */
    {
      id: "a08-cierre",
      tipo: "cierre",
      titulo: "¡Muy bien! Ya sabés cómo cuidarte",
      imagen: "img/a08_cierre.jpg"
    }
  ],

  /* ============================================================
     RAMA B — 4° a 7° grado: solidaridad, memoria, justicia y juego
     ============================================================ */
  ramaB: [

    /* ---------- B1. Intro institucional ---------- */
    {
      id: "b01-intro",
      tipo: "narracion",
      titulo: "¿Por qué existe este día?",
      imagen: "img/b01_intro.jpg",
      texto: "Cada 4 de septiembre, las escuelas de Mendoza conmemoran el Día Provincial de la Construcción Colectiva de Conciencia Ciudadana, en memoria de Johana Chacón. Más que repasar lo que pasó, esta jornada nos invita a fortalecer nuestros derechos, a construir vínculos respetuosos e igualitarios, y a saber que siempre podemos pedir ayuda si algo no está bien.",
      audioInstr: "audio/b01_instr.mp3"
    },

    /* ---------- B2. Clasificar: juego de roles solidario ---------- */
    {
      id: "b02-juego-roles",
      tipo: "clasificar",
      titulo: "¿Qué harías vos?",
      imagen: "img/b02_roles.jpg",
      instruccionTexto: "Clasificá cada situación según sea una actitud solidaria o una actitud que podemos mejorar.",
      audioInstr: "audio/b02_instr.mp3",
      audioConfirma: "audio/b02_confirma.mp3",
      categorias: [
        { id: "solidaria", nombre: "🤝 Actitud solidaria", color: "#43a047" },
        { id: "revisar", nombre: "😕 Podemos mejorarla", color: "#e53935" }
      ],
      items: [
        { id: "ayudar-caida", texto: "Un compañero se cae y me detengo a ayudarlo", imagen: "img/b02_item_ayudar.jpg", categoria: "solidaria",
          audio: "audio/b02_item_ayudar.mp3", audioCorrecta: "audio/b02_ok_ayudar.mp3", audioIncorrecta: "audio/b02_no_ayudar.mp3" },
        { id: "compartir", texto: "Comparto mi merienda con quien no trajo", imagen: "img/b02_item_compartir.jpg", categoria: "solidaria",
          audio: "audio/b02_item_compartir.mp3", audioCorrecta: "audio/b02_ok_compartir.mp3", audioIncorrecta: "audio/b02_no_compartir.mp3" },
        { id: "colecta", texto: "Organizamos una colecta para una familia que lo necesita", imagen: "img/b02_item_colecta.jpg", categoria: "solidaria",
          audio: "audio/b02_item_colecta.mp3", audioCorrecta: "audio/b02_ok_colecta.mp3", audioIncorrecta: "audio/b02_no_colecta.mp3" },
        { id: "ignorar", texto: "Sigo caminando y no miro cuando alguien la está pasando mal", imagen: "img/b02_item_ignorar.jpg", categoria: "revisar",
          audio: "audio/b02_item_ignorar.mp3", audioCorrecta: "audio/b02_ok_ignorar.mp3", audioIncorrecta: "audio/b02_no_ignorar.mp3" },
        { id: "reirse", texto: "Me río de un compañero que se equivocó", imagen: "img/b02_item_reirse.jpg", categoria: "revisar",
          audio: "audio/b02_item_reirse.mp3", audioCorrecta: "audio/b02_ok_reirse.mp3", audioIncorrecta: "audio/b02_no_reirse.mp3" },
        { id: "silencio", texto: "Guardo silencio cuando veo una injusticia", imagen: "img/b02_item_silencio.jpg", categoria: "revisar",
          audio: "audio/b02_item_silencio.mp3", audioCorrecta: "audio/b02_ok_silencio.mp3", audioIncorrecta: "audio/b02_no_silencio.mp3" }
      ]
    },

    /* ---------- B2b. Cofre de valores (reemplaza a "Cápsula del tiempo" pasiva) ---------- */
    {
      id: "b02b-cofre",
      tipo: "clasificar",
      titulo: "El cofre de los valores",
      imagen: "img/b02b_cofre.jpg",
      instruccionTexto: "Imaginate tu escuela dentro de unos años. ¿Qué valores sumarías al cofre para que nunca se pierdan, y cuáles no ayudan a construir una escuela mejor?",
      audioInstr: "audio/b02b_instr.mp3",
      audioConfirma: "audio/b02b_confirma.mp3",
      categorias: [
        { id: "suma", nombre: "✨ Va al cofre", color: "#ffb300" },
        { id: "no-suma", nombre: "🚫 No suma", color: "#78909c" }
      ],
      items: [
        { id: "respeto", texto: "Respeto por los demás", imagen: "img/b02b_item_respeto.jpg", categoria: "suma",
          audio: "audio/b02b_item_respeto.mp3", audioCorrecta: "audio/b02b_ok_respeto.mp3", audioIncorrecta: "audio/b02b_no_respeto.mp3" },
        { id: "empatia", texto: "Empatía con quien la está pasando mal", imagen: "img/b02b_item_empatia.jpg", categoria: "suma",
          audio: "audio/b02b_item_empatia.mp3", audioCorrecta: "audio/b02b_ok_empatia.mp3", audioIncorrecta: "audio/b02b_no_empatia.mp3" },
        { id: "companerismo", texto: "Compañerismo", imagen: "img/b02b_item_companerismo.jpg", categoria: "suma",
          audio: "audio/b02b_item_companerismo.mp3", audioCorrecta: "audio/b02b_ok_companerismo.mp3", audioIncorrecta: "audio/b02b_no_companerismo.mp3" },
        { id: "indiferencia", texto: "Indiferencia ante lo que le pasa a otros", imagen: "img/b02b_item_indiferencia.jpg", categoria: "no-suma",
          audio: "audio/b02b_item_indiferencia.mp3", audioCorrecta: "audio/b02b_ok_indiferencia.mp3", audioIncorrecta: "audio/b02b_no_indiferencia.mp3" },
        { id: "burla", texto: "Burlarse de los demás", imagen: "img/b02b_item_burla.jpg", categoria: "no-suma",
          audio: "audio/b02b_item_burla.mp3", audioCorrecta: "audio/b02b_ok_burla.mp3", audioIncorrecta: "audio/b02b_no_burla.mp3" }
      ]
    },

    /* ---------- Sopa de letras: valores solidarios (intercalada, justo
         después de trabajar esos valores en el cofre) ---------- */
    {
      id: "b02c-sopaletras-valores",
      tipo: "sopaLetras",
      titulo: "Sopa de letras: valores solidarios",
      instruccionTexto: "Tocá la primera letra y la última letra de cada palabra escondida.",
      audioInstr: "audio/b07c_instr.mp3",
      imagen: "img/b07c_sopa.jpg",
      palabras: [
        { palabra: "RESPETO", audio: "audio/b07c_respeto.mp3" },
        { palabra: "EMPATIA", audio: "audio/b07c_empatia.mp3" },
        { palabra: "SOLIDARIO", audio: "audio/b07c_solidario.mp3" },
        { palabra: "AYUDA", audio: "audio/b07c_ayuda.mp3" }
      ]
    },

    /* ---------- B3b. Línea de tiempo: nuestros derechos (NO narra el caso,
         recorre el marco de derechos, como pide el memo de la DGE) ---------- */
    {
      id: "b03b-linea-derechos",
      tipo: "ordenar",
      titulo: "Línea de tiempo: nuestros derechos",
      imagen: "img/b03b_linea.jpg",
      instruccionTexto: "Ordená estos hechos del más antiguo al más reciente.",
      audioInstr: "audio/b03b_instr.mp3",
      audioConfirma: "audio/b03b_confirma.mp3",
      audioError: "audio/b03b_error.mp3",
      pasos: [
        { id: "h1", texto: "1989: se aprueba la Convención Internacional sobre los Derechos del Niño.", audio: "audio/b03b_h1.mp3" },
        { id: "h2", texto: "2005: Argentina sanciona la Ley número 26.061 de protección integral.", audio: "audio/b03b_h2.mp3" },
        { id: "h3", texto: "2006: se sanciona la Ley de Educación Sexual Integral, número 26.150.", audio: "audio/b03b_h3.mp3" },
        { id: "h4", texto: "La Ley número 8723 declara este día para seguir construyendo conciencia ciudadana.", audio: "audio/b03b_h4.mp3" }
      ]
    },

    /* ---------- B4. Narración: la memoria como compromiso colectivo ---------- */
    {
      id: "b04-memoria-compromiso",
      tipo: "narracion",
      titulo: "La memoria es compromiso",
      imagen: "img/b04_escuela_real.jpg",
      imagenGrande: true,
      fuenteImagen: "Fuente: MDZ / Foto: Mercedes Gómez",
      texto: "La memoria se construye entre todos cuando se transforma en compromiso y en acción para proteger derechos. Cada escuela, cada familia y cada comunidad tiene un rol: enseñar a pedir ayuda, construir vínculos respetuosos e igualitarios, y estar atentos para que ninguna situación que vulnere derechos pase desapercibida.",
      audioInstr: "audio/b04_instr.mp3"
    },

    /* ---------- B5. Trivia múltiple: marco legal (secuencial) ---------- */
    {
      id: "b05-trivia-leyes",
      tipo: "trivia_multi",
      titulo: "¿Qué protege cada ley?",
      imagen: "img/b05_leyes.jpg",
      instruccionTexto: "Respondé cada pregunta sobre las leyes que protegen nuestros derechos.",
      audioInstr: "audio/b05_instr.mp3",
      preguntas: [
        {
          pregunta: "¿Qué protege la Ley número 26.061?",
          audioPregunta: "audio/b05_q1_pregunta.mp3",
          opciones: [
            { texto: "Los derechos de niños, niñas y adolescentes", correcta: true },
            { texto: "El tránsito vehicular", correcta: false, audioJustifica: "audio/b05_q1_no1.mp3" },
            { texto: "Los impuestos provinciales", correcta: false, audioJustifica: "audio/b05_q1_no2.mp3" },
            { texto: "El comercio exterior", correcta: false, audioJustifica: "audio/b05_q1_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/b05_q1_ok.mp3",
          audioConfirmaIncorrecta: "audio/b05_q1_no.mp3"
        },
        {
          pregunta: "¿Qué busca prevenir la Ley número 26.364?",
          audioPregunta: "audio/b05_q2_pregunta.mp3",
          opciones: [
            { texto: "La trata de personas", correcta: true },
            { texto: "Los accidentes de tránsito", correcta: false, audioJustifica: "audio/b05_q2_no1.mp3" },
            { texto: "La evasión de impuestos", correcta: false, audioJustifica: "audio/b05_q2_no2.mp3" },
            { texto: "La contaminación ambiental", correcta: false, audioJustifica: "audio/b05_q2_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/b05_q2_ok.mp3",
          audioConfirmaIncorrecta: "audio/b05_q2_no.mp3"
        },
        {
          pregunta: "¿Qué busca erradicar la Ley número 26.485?",
          audioPregunta: "audio/b05_q3_pregunta.mp3",
          opciones: [
            { texto: "La violencia contra las mujeres", correcta: true },
            { texto: "El uso de celulares en clase", correcta: false, audioJustifica: "audio/b05_q3_no1.mp3" },
            { texto: "Las faltas escolares", correcta: false, audioJustifica: "audio/b05_q3_no2.mp3" },
            { texto: "Los ruidos molestos", correcta: false, audioJustifica: "audio/b05_q3_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/b05_q3_ok.mp3",
          audioConfirmaIncorrecta: "audio/b05_q3_no.mp3"
        },
        {
          pregunta: "¿Qué garantiza la Ley número 26.150?",
          audioPregunta: "audio/b05_q4_pregunta.mp3",
          opciones: [
            { texto: "La Educación Sexual Integral en las escuelas", correcta: true },
            { texto: "El transporte escolar gratuito", correcta: false, audioJustifica: "audio/b05_q4_no1.mp3" },
            { texto: "Los útiles escolares gratuitos", correcta: false, audioJustifica: "audio/b05_q4_no2.mp3" },
            { texto: "Los feriados escolares", correcta: false, audioJustifica: "audio/b05_q4_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/b05_q4_ok.mp3",
          audioConfirmaIncorrecta: "audio/b05_q4_no.mp3"
        }
      ]
    },

    /* ---------- B5b. Verdadero o falso relámpago (vínculos y cuidado,
         sin datos puntuales del caso, según pide el memo de la DGE) ---------- */
    {
      id: "b05b-vf-relampago",
      tipo: "trivia_multi",
      titulo: "Verdadero o falso relámpago",
      imagen: "img/b05b_vf.jpg",
      instruccionTexto: "Respondé rápido: ¿verdadero o falso?",
      audioInstr: "audio/b05b_instr.mp3",
      preguntas: [
        {
          pregunta: "Los vínculos respetuosos e igualitarios ayudan a prevenir la violencia.",
          audioPregunta: "audio/b05b_q1_pregunta.mp3",
          opciones: [
            { texto: "Verdadero", correcta: true },
            { texto: "Falso", correcta: false, audioJustifica: "audio/b05b_q1_no.mp3" }
          ],
          audioConfirmaCorrecta: "audio/b05b_q1_ok.mp3",
          audioConfirmaIncorrecta: "audio/b05b_q1_no.mp3"
        },
        {
          pregunta: "Pedir ayuda a un adulto de confianza es un signo de debilidad.",
          audioPregunta: "audio/b05b_q2_pregunta.mp3",
          opciones: [
            { texto: "Verdadero", correcta: false, audioJustifica: "audio/b05b_q2_no1.mp3" },
            { texto: "Falso", correcta: true }
          ],
          audioConfirmaCorrecta: "audio/b05b_q2_ok.mp3",
          audioConfirmaIncorrecta: "audio/b05b_q2_no.mp3"
        },
        {
          pregunta: "La Educación Sexual Integral solo habla de biología.",
          audioPregunta: "audio/b05b_q3_pregunta.mp3",
          opciones: [
            { texto: "Verdadero", correcta: false, audioJustifica: "audio/b05b_q3_no1.mp3" },
            { texto: "Falso", correcta: true }
          ],
          audioConfirmaCorrecta: "audio/b05b_q3_ok.mp3",
          audioConfirmaIncorrecta: "audio/b05b_q3_no.mp3"
        }
      ]
    },

    /* ---------- B6. Asociar: derechos y quién los garantiza ---------- */
    {
      id: "b06-asociar-garantes",
      tipo: "asociar",
      titulo: "¿Quién nos ayuda a cuidar nuestros derechos?",
      imagen: "img/b06_asociar.jpg",
      instruccionTexto: "Uní cada institución con la forma en que nos cuida.",
      audioInstr: "audio/b06_instr.mp3",
      pares: [
        { id: "familia", izq: "La familia", izqImagen: "img/b06_familia.jpg", izqAudio: "audio/b06_izq_familia.mp3",
          der: "Brinda cuidado y contención", derAudio: "audio/b06_der_familia.mp3",
          audioConfirmaPar: "audio/b06_confirma_familia.mp3" },
        { id: "escuela", izq: "La escuela", izqImagen: "img/b06_escuela.jpg", izqAudio: "audio/b06_izq_escuela.mp3",
          der: "Enseña y acompaña", derAudio: "audio/b06_der_escuela.mp3",
          audioConfirmaPar: "audio/b06_confirma_escuela.mp3" },
        { id: "estado", izq: "El Estado", izqImagen: "img/b06_estado.jpg", izqAudio: "audio/b06_izq_estado.mp3",
          der: "Hace cumplir las leyes", derAudio: "audio/b06_der_estado.mp3",
          audioConfirmaPar: "audio/b06_confirma_estado.mp3" },
        { id: "comunidad", izq: "La comunidad", izqImagen: "img/b06_comunidad.jpg", izqAudio: "audio/b06_izq_comunidad.mp3",
          der: "Construye redes de apoyo", derAudio: "audio/b06_der_comunidad.mp3",
          audioConfirmaPar: "audio/b06_confirma_comunidad.mp3" }
      ]
    },

    /* ---------- B6b, B6c. Rompecabezas de texto (definiciones, palabra por palabra) ---------- */
    {
      id: "b06b-rompecabezas1",
      tipo: "ordenar",
      titulo: "Rompecabezas de ideas: memoria",
      imagen: "img/b06b_memoria.jpg",
      instruccionTexto: "Armá la definición ordenando las palabras, una por una. Recordá: la oración empieza con mayúscula y termina con punto.",
      audioInstr: "audio/b06b_instr.mp3",
      audioConfirma: "audio/b06b_oracion.mp3",
      audioError: "audio/b06b_error.mp3",
      estiloOracion: true,
      pasos: [
        { id: "m1", texto: "La", audio: "audio/b06b_m1.mp3" },
        { id: "m2", texto: "memoria", audio: "audio/b06b_m2.mp3" },
        { id: "m3", texto: "nos", audio: "audio/b06b_m3.mp3" },
        { id: "m4", texto: "ayuda", audio: "audio/b06b_m4.mp3" },
        { id: "m5", texto: "a", audio: "audio/b06b_m5.mp3" },
        { id: "m6", texto: "construir", audio: "audio/b06b_m6.mp3" },
        { id: "m7", texto: "un", audio: "audio/b06b_m7.mp3" },
        { id: "m8", texto: "futuro", audio: "audio/b06b_m8.mp3" },
        { id: "m9", texto: "mejor.", audio: "audio/b06b_m9.mp3" }
      ]
    },
    {
      id: "b06c-rompecabezas2",
      tipo: "ordenar",
      titulo: "Rompecabezas de ideas: justicia",
      imagen: "img/b06c_justicia.jpg",
      instruccionTexto: "Armá la definición ordenando las palabras, una por una. Recordá: la oración empieza con mayúscula y termina con punto.",
      audioInstr: "audio/b06c_instr.mp3",
      audioConfirma: "audio/b06c_oracion.mp3",
      audioError: "audio/b06c_error.mp3",
      estiloOracion: true,
      pasos: [
        { id: "j1", texto: "La", audio: "audio/b06c_j1.mp3" },
        { id: "j2", texto: "justicia", audio: "audio/b06c_j2.mp3" },
        { id: "j3", texto: "protege", audio: "audio/b06c_j3.mp3" },
        { id: "j4", texto: "los", audio: "audio/b06c_j4.mp3" },
        { id: "j5", texto: "derechos", audio: "audio/b06c_j5.mp3" },
        { id: "j6", texto: "de", audio: "audio/b06c_j6.mp3" },
        { id: "j7", texto: "todas", audio: "audio/b06c_j7.mp3" },
        { id: "j8", texto: "las", audio: "audio/b06c_j8.mp3" },
        { id: "j9", texto: "personas.", audio: "audio/b06c_j9.mp3" }
      ]
    },

    /* ---------- Sopa de letras: memoria y justicia (intercalada, justo
         después de trabajar esos conceptos en los rompecabezas) ---------- */
    {
      id: "b06e-sopaletras-memoria",
      tipo: "sopaLetras",
      titulo: "Sopa de letras: memoria y justicia",
      instruccionTexto: "Tocá la primera letra y la última letra de cada palabra escondida.",
      audioInstr: "audio/b07b_instr.mp3",
      imagen: "img/b07b_sopa.jpg",
      palabras: [
        { palabra: "MEMORIA", audio: "audio/b07b_memoria.mp3" },
        { palabra: "JUSTICIA", audio: "audio/b07b_justicia.mp3" },
        { palabra: "DERECHOS", audio: "audio/b07b_derechos.mp3" },
        { palabra: "LEY", audio: "audio/b07b_ley.mp3" },
        { palabra: "COMUNIDAD", audio: "audio/b07b_comunidad.mp3" }
      ]
    },
    {
      id: "b06d-rompecabezas3",
      tipo: "ordenar",
      titulo: "Rompecabezas de ideas: compromiso",
      imagen: "img/b06d_compromiso.jpg",
      instruccionTexto: "Armá la frase de compromiso colectivo ordenando las palabras, una por una. Recordá: la oración empieza con mayúscula y termina con punto.",
      audioInstr: "audio/b06d_instr.mp3",
      audioConfirma: "audio/b06d_oracion.mp3",
      audioError: "audio/b06d_error.mp3",
      estiloOracion: true,
      pasos: [
        { id: "c1", texto: "Toda", audio: "audio/b06d_c1.mp3" },
        { id: "c2", texto: "la", audio: "audio/b06d_c2.mp3" },
        { id: "c3", texto: "comunidad", audio: "audio/b06d_c3.mp3" },
        { id: "c4", texto: "educativa", audio: "audio/b06d_c4.mp3" },
        { id: "c5", texto: "se", audio: "audio/b06d_c5.mp3" },
        { id: "c6", texto: "compromete", audio: "audio/b06d_c6.mp3" },
        { id: "c7", texto: "a", audio: "audio/b06d_c7.mp3" },
        { id: "c8", texto: "cuidar", audio: "audio/b06d_c8.mp3" },
        { id: "c9", texto: "y", audio: "audio/b06d_c9.mp3" },
        { id: "c10", texto: "proteger", audio: "audio/b06d_c10.mp3" },
        { id: "c11", texto: "los", audio: "audio/b06d_c11.mp3" },
        { id: "c12", texto: "derechos", audio: "audio/b06d_c12.mp3" },
        { id: "c13", texto: "de", audio: "audio/b06d_c13.mp3" },
        { id: "c14", texto: "niñas,", audio: "audio/b06d_c14.mp3" },
        { id: "c15", texto: "niños", audio: "audio/b06d_c15.mp3" },
        { id: "c16", texto: "y", audio: "audio/b06d_c16.mp3" },
        { id: "c17", texto: "adolescentes.", audio: "audio/b06d_c17.mp3" }
      ]
    },

    /* ---------- B7. Clasificar: ideas de campaña ---------- */
    {
      id: "b07-campania",
      tipo: "clasificar",
      titulo: "Los derechos en acción",
      imagen: "img/b07_mural_real.jpg",
      imagenGrande: true,
      fuenteImagen: "Fuente: MDZ / Foto: gentileza Silvia Minoli",
      instruccionTexto: "Pensemos en nuestra campaña de concientización: ¿qué ideas ayudan a informar?",
      audioInstr: "audio/b07_instr.mp3",
      audioConfirma: "audio/b07_confirma.mp3",
      categorias: [
        { id: "buena", nombre: "✅ Ayuda a informar", color: "#43a047" },
        { id: "mala", nombre: "❌ No ayuda", color: "#e53935" }
      ],
      items: [
        { id: "carteles", texto: "Hacer carteles informativos", imagen: "img/b07_item_carteles.jpg", categoria: "buena",
          audio: "audio/b07_item_carteles.mp3", audioCorrecta: "audio/b07_ok_carteles.mp3", audioIncorrecta: "audio/b07_no_carteles.mp3" },
        { id: "podcast", texto: "Grabar un podcast entre compañeros", imagen: "img/b07_item_podcast.jpg", categoria: "buena",
          audio: "audio/b07_item_podcast.mp3", audioCorrecta: "audio/b07_ok_podcast.mp3", audioIncorrecta: "audio/b07_no_podcast.mp3" },
        { id: "mural", texto: "Pintar un mural colectivo", imagen: "img/b07_item_mural.jpg", categoria: "buena",
          audio: "audio/b07_item_mural.mp3", audioCorrecta: "audio/b07_ok_mural.mp3", audioIncorrecta: "audio/b07_no_mural.mp3" },
        { id: "burlarse", texto: "Burlarse de un compañero por el tema", imagen: "img/b07_item_burlarse.jpg", categoria: "mala",
          audio: "audio/b07_item_burlarse.mp3", audioCorrecta: "audio/b07_ok_burlarse.mp3", audioIncorrecta: "audio/b07_no_burlarse.mp3" },
        { id: "ignorarlo", texto: "Ignorar el tema y no participar", imagen: "img/b07_item_ignorarlo.jpg", categoria: "mala",
          audio: "audio/b07_item_ignorarlo.mp3", audioCorrecta: "audio/b07_ok_ignorarlo.mp3", audioIncorrecta: "audio/b07_no_ignorarlo.mp3" }
      ]
    },

    /* ---------- B7b, B7c. Sopas de letras ---------- */
    /* ---------- B7d, B7e. Puzzles de imagen ---------- */
    {
      id: "b07d-puzzle1",
      tipo: "puzzleImagen",
      titulo: "Rompecabezas: comunidad unida",
      instruccionTexto: "Tocá dos piezas para intercambiarlas y armar la imagen completa.",
      audioInstr: "audio/b07d_instr.mp3",
      audioConfirma: "audio/b07d_confirma.mp3",
      imagen: "img/b07d_puzzle1.jpg",
      filas: 2, columnas: 3
    },
    {
      id: "b07e-puzzle2",
      tipo: "puzzleImagen",
      titulo: "Rompecabezas: mural colectivo",
      instruccionTexto: "Tocá dos piezas para intercambiarlas y armar la imagen completa.",
      audioInstr: "audio/b07e_instr.mp3",
      audioConfirma: "audio/b07e_confirma.mp3",
      imagen: "img/b07e_puzzle2.jpg",
      filas: 2, columnas: 3
    },

    /* ---------- B7f. Mapa de la empatía ---------- */
    {
      id: "b07f-mapa-empatia",
      tipo: "clasificar",
      titulo: "Mapa de la empatía",
      imagen: "img/b07f_empatia.jpg",
      instruccionTexto: "Uní cada situación con la emoción que probablemente sienta esa persona.",
      audioInstr: "audio/b07f_instr.mp3",
      audioConfirma: "audio/b07f_confirma.mp3",
      categorias: [
        { id: "triste", nombre: "😢 Tristeza", color: "#5c6bc0" },
        { id: "miedo", nombre: "😨 Miedo", color: "#8e24aa" },
        { id: "alivio", nombre: "🙂 Alivio", color: "#43a047" }
      ],
      items: [
        { id: "excluido", texto: "Un compañero queda afuera del juego", imagen: "img/b07f_item_excluido.jpg", categoria: "triste",
          audio: "audio/b07f_item_excluido.mp3", audioCorrecta: "audio/b07f_ok_excluido.mp3", audioIncorrecta: "audio/b07f_no_excluido.mp3" },
        { id: "amenazado", texto: "Alguien recibe una amenaza en el chat", imagen: "img/b07f_item_amenazado.jpg", categoria: "miedo",
          audio: "audio/b07f_item_amenazado.mp3", audioCorrecta: "audio/b07f_ok_amenazado.mp3", audioIncorrecta: "audio/b07f_no_amenazado.mp3" },
        { id: "ayudado", texto: "Alguien recibe ayuda justo cuando la necesitaba", imagen: "img/b07f_item_ayudado.jpg", categoria: "alivio",
          audio: "audio/b07f_item_ayudado.mp3", audioCorrecta: "audio/b07f_ok_ayudado.mp3", audioIncorrecta: "audio/b07f_no_ayudado.mp3" }
      ]
    },

    /* ---------- B8. Cierre ---------- */
    {
      id: "b08-cierre",
      tipo: "cierre",
      titulo: "Memoria, justicia y derechos para todos y todas",
      imagen: "img/b08_cierre.jpg"
    }
  ]
};
