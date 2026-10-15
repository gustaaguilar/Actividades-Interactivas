// datos.js — "El misterio de las mayúsculas y la novela" (7mo grado) — v2
// Contenido concreto atado a la historia de El extraño caso del Dr. Jekyll y Mr. Hyde,
// alineado a las consignas del cuadernillo de la docente.
const DATOS = {
  meta: {
    titulo: "El misterio de las mayúsculas y la novela",
    subtitulo: "Lengua · 7mo grado · A partir de El extraño caso del Dr. Jekyll y Mr. Hyde",
    autor: "Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    grado: "Lengua · 7.º grado",
    flechasRevision: false,
    fotoPerfil: "img/profe.jpg",
    portada: "img/portada.jpg",
    portadaRespaldo: "img/escena_calle_niebla.jpg"
  },

  pantallas: [

    // 0 -- VIDEO ------------------------------------------------------
    {
      id: "video-sintesis",
      tipo: "video",
      titulo: "Antes de empezar...",
      textoIntro: "Mirá este resumen animado del cuento. Te va a ayudar a resolver las actividades que siguen.",
      audioIntro: "audio/video_intro.mp3",
      videoId: "_XEHypV0Wq8",
      duracionSegundosFallback: 240
    },

    // 1 -- Mayúsculas en la tapa ---------------------------------------
    {
      id: "mayus-tapa-trivia",
      tipo: "trivia",
      titulo: "La tapa del libro",
      instruccion: "Pensá en la tapa de El extraño caso del Dr. Jekyll y Mr. Hyde y respondé.",
      instruccionAudio: "audio/mtapa_instr.mp3",
      imagen: "img/escena_libro_capitulos.jpg",
      items: [
        {
          pregunta: "¿Qué datos suele presentar la tapa de un libro?",
          preguntaAudio: "audio/mtapa_p1.mp3",
          opciones: ["Título y autor", "El final de la historia", "El precio en otros países", "Nada importante"],
          correcta: 0,
          audioCorrecta: "audio/mtapa_r1.mp3",
          explicacion: "La tapa presenta el título de la obra y el nombre del autor, entre otros datos como la editorial."
        },
        {
          pregunta: "En \"El extraño caso del Dr. Jekyll y Mr. Hyde\", Robert Louis Stevenson es...",
          preguntaAudio: "audio/mtapa_p2.mp3",
          opciones: ["El autor del libro", "Un personaje de la historia", "El editor", "El traductor"],
          correcta: 0,
          audioCorrecta: "audio/mtapa_r2.mp3",
          explicacion: "Robert Louis Stevenson es el escritor escocés que escribió esta novela en 1886."
        },
        {
          pregunta: "¿Por qué \"El extraño caso del Dr. Jekyll y Mr. Hyde\" se escribe con mayúsculas iniciales en cada palabra principal?",
          preguntaAudio: "audio/mtapa_p3.mp3",
          opciones: [
            "Porque es el título de una obra literaria",
            "Porque son nombres de instituciones",
            "Porque están al final de una oración",
            "Porque sí, no hay ninguna razón"
          ],
          correcta: 0,
          audioCorrecta: "audio/mtapa_r3.mp3",
          explicacion: "Las palabras principales de los títulos de obras literarias llevan mayúscula inicial."
        }
      ]
    },

    // 2 -- Clasificar palabras de la tapa -------------------------------
    {
      id: "mayus-clasificar",
      tipo: "clasificar",
      titulo: "¿Por qué lleva mayúscula?",
      instruccion: "Tocá primero la categoría correcta para cada palabra o nombre de la tapa.",
      instruccionAudio: "audio/mclas_instr.mp3",
      preguntaAudio: "audio/mclas_pregunta.mp3",
      imagen: "img/escena_libro_lupa.jpg",
      categorias: ["Nombre propio", "Abreviatura", "Inicio del título"],
      items: [
        { texto: "Robert", categoriaCorrecta: 0, audioPalabra: "audio/mclas_1.mp3", audioCorrecta: "audio/mclas_1r.mp3", justificacion: "Es el nombre del autor: nombre propio." },
        { texto: "Louis Stevenson", categoriaCorrecta: 0, audioPalabra: "audio/mclas_2.mp3", audioCorrecta: "audio/mclas_2r.mp3", justificacion: "Es el apellido del autor: nombre propio." },
        { texto: "Dr.", categoriaCorrecta: 1, audioPalabra: "audio/mclas_3.mp3", audioCorrecta: "audio/mclas_3r.mp3", justificacion: "\"Dr.\" abrevia \"Doctor\": es una abreviatura." },
        { texto: "Mr.", categoriaCorrecta: 1, audioPalabra: "audio/mclas_4.mp3", audioCorrecta: "audio/mclas_4r.mp3", justificacion: "\"Mr.\" abrevia el tratamiento en inglés: es una abreviatura." },
        { texto: "El (de \"El extraño caso...\")", categoriaCorrecta: 2, audioPalabra: "audio/mclas_5.mp3", audioCorrecta: "audio/mclas_5r.mp3", justificacion: "Es la primera palabra del título de la obra." },
        { texto: "Hyde", categoriaCorrecta: 0, audioPalabra: "audio/mclas_6.mp3", audioCorrecta: "audio/mclas_6r.mp3", justificacion: "Es el apellido de un personaje: nombre propio." }
      ]
    },

    // 3 -- Biografía del autor: colores -> significado ------------------
    {
      id: "mayus-biografia-asociar",
      tipo: "asociar",
      titulo: "La biografía de Stevenson",
      instruccion: "En la biografía del autor, ciertas palabras se marcan de colores según el motivo de su mayúscula. Uní cada color con su significado.",
      instruccionAudio: "audio/mbio_instr.mp3",
      imagen: "img/escena_carta_pluma.jpg",
      pares: [
        { izquierda: "Mayúsculas en rojo", derecha: "Indican el inicio de una oración", audioIzq: "audio/mbio_i1.mp3", audioDer: "audio/mbio_d1.mp3", audioPar: "audio/mbio_par1.mp3" },
        { izquierda: "Mayúsculas en celeste", derecha: "Son abreviaturas", audioIzq: "audio/mbio_i2.mp3", audioDer: "audio/mbio_d2.mp3", audioPar: "audio/mbio_par2.mp3" },
        { izquierda: "Mayúsculas en verde", derecha: "Nombran un lugar geográfico", audioIzq: "audio/mbio_i3.mp3", audioDer: "audio/mbio_d3.mp3", audioPar: "audio/mbio_par3.mp3" }
      ]
    },

    // 4 -- Repaso mayúsculas (incluye el ítem corregido) ----------------
    {
      id: "mayus-repaso",
      tipo: "verdaderoFalso",
      titulo: "Repaso: mayúsculas",
      instruccion: "Leé cada afirmación y decidí si es verdadera o falsa.",
      instruccionAudio: "audio/mayus_repaso_instr.mp3",
      imagen: "img/escena_farol.jpg",
      items: [
        { afirmacion: "La primera letra de la primera palabra de una oración se escribe con mayúscula.", valor: true, audio: "audio/mayus_rep_1.mp3", justificacion: "No es la palabra entera, sino su primera letra la que va en mayúscula." },
        { afirmacion: "Los ríos y montañas se escriben con mayúscula inicial.", valor: true, audio: "audio/mayus_rep_2.mp3", justificacion: "Son nombres propios de accidentes geográficos." },
        { afirmacion: "Las palabras en medio de una oración siempre llevan mayúscula.", valor: false, audio: "audio/mayus_rep_3.mp3", justificacion: "Solo la llevan si son nombres propios o siguen un punto." },
        { afirmacion: "\"Mr. Hyde\" combina abreviatura y nombre propio, ambos con mayúscula.", valor: true, audio: "audio/mayus_rep_4.mp3", justificacion: "\"Mr.\" es abreviatura y \"Hyde\" es apellido: los dos llevan mayúscula." }
      ]
    },

    // 5 -- Abreviaturas -------------------------------------------------
    {
      id: "mayus-abreviaturas",
      tipo: "trivia",
      titulo: "Las abreviaturas",
      instruccion: "Respondé sobre cómo se escriben las abreviaturas.",
      instruccionAudio: "audio/mayus_abrev_instr.mp3",
      imagen: "img/escena_carta_pluma.jpg",
      items: [
        {
          pregunta: "¿Qué signo de puntuación acompaña casi siempre a una abreviatura?",
          preguntaAudio: "audio/mayus_abrev_p1.mp3",
          opciones: ["El punto", "La coma", "Los dos puntos", "El guion"],
          correcta: 0,
          audioCorrecta: "audio/mayus_abrev_r1.mp3",
          explicacion: "Las abreviaturas terminan con punto: Dr., Mr., Sr., etc."
        },
        {
          pregunta: "\"Dr.\" es la abreviatura de...",
          preguntaAudio: "audio/mayus_abrev_p2.mp3",
          opciones: ["Doctor", "Director", "Dirección", "Derecho"],
          correcta: 0,
          audioCorrecta: "audio/mayus_abrev_r2.mp3",
          explicacion: "Dr. abrevia \"Doctor\", como en Dr. Jekyll."
        },
        {
          pregunta: "¿Qué pasa si una abreviatura queda al final de la oración?",
          preguntaAudio: "audio/mayus_abrev_p3.mp3",
          opciones: [
            "El punto de la abreviatura funciona también como punto final",
            "Se ponen dos puntos seguidos",
            "Se elimina el punto de la abreviatura",
            "Se agrega una coma"
          ],
          correcta: 0,
          audioCorrecta: "audio/mayus_abrev_r3.mp3",
          explicacion: "Un solo punto cumple las dos funciones: cerrar la abreviatura y la oración."
        }
      ]
    },

    // 6 -- ¿Robert fuera de posición inicial? ---------------------------
    {
      id: "mayus-robert-posicion",
      tipo: "trivia",
      titulo: "¿Y si no fuera la primera palabra?",
      instruccion: "Pensá esta situación y respondé.",
      instruccionAudio: "audio/mrobert_instr.mp3",
      imagen: "img/escena_libro_lupa.jpg",
      items: [
        {
          pregunta: "Si la palabra \"Robert\" no estuviera al inicio de la oración, ¿igual se escribiría con mayúscula?",
          preguntaAudio: "audio/mrobert_p1.mp3",
          opciones: [
            "Sí, porque es un nombre propio",
            "No, porque ya no sería la primera palabra",
            "Solo a veces, según el día",
            "No, nunca en medio de una oración"
          ],
          correcta: 0,
          audioCorrecta: "audio/mrobert_r1.mp3",
          explicacion: "Los nombres propios llevan mayúscula sin importar el lugar que ocupen en la oración."
        }
      ]
    },

    // 7 -- Marco narrativo (concepto) -----------------------------------
    {
      id: "marco-narracion",
      tipo: "narracionAnimada",
      titulo: "El marco narrativo y la caracterización",
      imagen: "img/escena_puerta_misteriosa.jpg",
      pasos: [
        { texto: "Se llama marco de una narración a los ambientes y al tiempo en los que se desarrollan las acciones.", audio: "audio/marco_paso1.mp3", imagen: "img/escena_calle_niebla.jpg" },
        { texto: "En el capítulo 1, ese marco es una calle de Londres, con una puerta extraña que llama la atención de Utterson y Enfield.", audio: "audio/marco_paso2.mp3", imagen: "img/escena_puerta_misteriosa.jpg" },
        { texto: "Los personajes están caracterizados: los conocemos por los datos que da el narrador u otro personaje.", audio: "audio/marco_paso3.mp3", imagen: "img/item_utterson_arrugado.jpg" },
        { texto: "Eso es la caracterización directa: alguien lo describe explícitamente, como cuando se describe a Utterson.", audio: "audio/marco_paso4.mp3", imagen: "img/marco_directa.jpg", imagenRespaldo: "img/escena_libro_lupa.jpg" },
        { texto: "También podemos deducir cómo son a través de sus pensamientos, comentarios, acciones, reacciones y gestos.", audio: "audio/marco_paso5.mp3", imagen: "img/marco_indirecta.jpg", imagenRespaldo: "img/item_utterson_testamento.jpg" },
        { texto: "Eso es la caracterización indirecta: por ejemplo, lo que deducimos de Hyde por cómo actúa, sin que nadie lo diga directamente.", audio: "audio/marco_paso6.mp3", imagen: "img/item_hyde_se_aleja.jpg" }
      ]
    },

    // 8 -- Trivia directa/indirecta con Utterson -------------------------
    {
      id: "marco-trivia",
      tipo: "trivia",
      titulo: "¿Directa o indirecta?",
      instruccion: "Leé cada fragmento y elegí si la caracterización es directa o indirecta.",
      instruccionAudio: "audio/marco_trivia_instr.mp3",
      imagen: "img/escena_personaje_sombra.jpg",
      items: [
        {
          pregunta: "\"Utterson, el notario, era un hombre de cara arrugada, jamás iluminada por una sonrisa.\"",
          preguntaAudio: "audio/marco_trivia_p1.mp3",
          opciones: ["Caracterización directa", "Caracterización indirecta"],
          correcta: 0,
          audioCorrecta: "audio/marco_trivia_r1.mp3",
          imagen: "img/item_utterson_arrugado.jpg",
          explicacion: "El narrador lo describe explícitamente: es directa."
        },
        {
          pregunta: "Hyde atropella a una niña en la calle y, sin inmutarse, sigue caminando.",
          preguntaAudio: "audio/marco_trivia_p2.mp3",
          opciones: ["Caracterización directa", "Caracterización indirecta"],
          correcta: 1,
          audioCorrecta: "audio/marco_trivia_r2.mp3",
          imagen: "img/item_hyde_se_aleja.jpg",
          explicacion: "Deducimos su crueldad a partir de sus acciones: es indirecta."
        },
        {
          pregunta: "Utterson revisa el testamento de Jekyll y descubre, preocupado, que todo queda para Hyde.",
          preguntaAudio: "audio/marco_trivia_p3.mp3",
          opciones: ["Caracterización directa", "Caracterización indirecta"],
          correcta: 1,
          audioCorrecta: "audio/marco_trivia_r3.mp3",
          imagen: "img/item_utterson_testamento.jpg",
          explicacion: "Lo inferimos por su reacción y su preocupación: es indirecta."
        },
        {
          pregunta: "Utterson tiene pesadillas con una figura sin rostro, señal de lo mucho que le inquieta el asunto.",
          preguntaAudio: "audio/marco_trivia_p4.mp3",
          opciones: ["Caracterización directa", "Caracterización indirecta"],
          correcta: 1,
          audioCorrecta: "audio/marco_trivia_r4.mp3",
          imagen: "img/item_utterson_pesadilla.jpg",
          explicacion: "Se deduce de sus pensamientos y sueños: es indirecta."
        }
      ]
    },

    // 9 -- Retrato de Mr. Hyde (clasificar) ------------------------------
    {
      id: "marco-retrato-hyde",
      tipo: "clasificar",
      titulo: "Un retrato de Mr. Hyde",
      instruccion: "Elegí si cada característica describe o no a Mr. Hyde, según lo que viste en el video y leíste en el libro.",
      instruccionAudio: "audio/hyde_instr.mp3",
      preguntaAudio: "audio/hyde_pregunta.mp3",
      imagen: "img/escena_personaje_sombra.jpg",
      categorias: ["Describe a Hyde", "No lo describe"],
      items: [
        { texto: "desagradable", categoriaCorrecta: 0, imagen: "img/item_hyde_desagradable.jpg", audioPalabra: "audio/hyde_1.mp3", audioCorrecta: "audio/hyde_1r.mp3", justificacion: "Todos los que lo ven sienten un rechazo inmediato hacia él." },
        { texto: "amable con los desconocidos", categoriaCorrecta: 1, imagen: "img/item_hyde_amenaza.jpg", audioPalabra: "audio/hyde_2.mp3", audioCorrecta: "audio/hyde_2r.mp3", justificacion: "Al contrario: Hyde es violento y despiadado con quienes se cruzan en su camino." },
        { texto: "violento", categoriaCorrecta: 0, imagen: "img/item_hyde_hostil.jpg", audioPalabra: "audio/hyde_3.mp3", audioCorrecta: "audio/hyde_3r.mp3", justificacion: "Atropella a una niña y más adelante comete un crimen: es violento." },
        { texto: "de aspecto extraño e inquietante", categoriaCorrecta: 0, imagen: "img/item_hyde_inquietante.jpg", audioPalabra: "audio/hyde_4.mp3", audioCorrecta: "audio/hyde_4r.mp3", justificacion: "Quienes lo describen no saben explicar bien por qué, pero su sola presencia genera rechazo." },
        { texto: "alegre y sonriente todo el tiempo", categoriaCorrecta: 1, imagen: "img/item_hyde_serio.jpg", audioPalabra: "audio/hyde_5.mp3", audioCorrecta: "audio/hyde_5r.mp3", justificacion: "Es hosco y despierta desconfianza, no alegría." }
      ]
    },

    // 10 -- Ambientes: la puerta / la calle / la casa --------------------
    {
      id: "marco-ambientes",
      tipo: "trivia",
      titulo: "Los ambientes del capítulo 1",
      instruccion: "Pensá qué clima genera cada lugar del capítulo 1.",
      instruccionAudio: "audio/ambientes_instr.mp3",
      imagen: "img/escena_puerta_misteriosa.jpg",
      items: [
        {
          pregunta: "La puerta que ven Utterson y Enfield, sucia y sin ventanas, ¿qué clima genera?",
          imagen: "img/ambiente_puerta.jpg", imagenRespaldo: "img/escena_puerta_misteriosa.jpg",
          preguntaAudio: "audio/ambientes_p1.mp3",
          opciones: ["Un clima de misterio e intriga", "Un clima alegre y familiar", "Ningún clima en especial", "Un clima cómico"],
          correcta: 0,
          audioCorrecta: "audio/ambientes_r1.mp3",
          explicacion: "Una puerta descuidada y sin ventanas, en medio de una calle prolija, genera intriga desde el principio."
        },
        {
          pregunta: "La calle donde está esa puerta es descripta como prolija y agradable. ¿Para qué sirve ese contraste?",
          imagen: "img/ambiente_calle.jpg", imagenRespaldo: "img/escena_calle_niebla.jpg",
          preguntaAudio: "audio/ambientes_p2.mp3",
          opciones: [
            "Para resaltar todavía más lo extraño de la puerta",
            "Para no generar ningún efecto",
            "Porque no tiene relación con la puerta",
            "Para hacer reír al lector"
          ],
          correcta: 0,
          audioCorrecta: "audio/ambientes_r2.mp3",
          explicacion: "El contraste entre una calle agradable y una puerta siniestra refuerza el misterio."
        },
        {
          pregunta: "La casa de Jekyll, vista desde ese laboratorio con la puerta extraña, ¿qué sugiere sobre su dueño?",
          imagen: "img/ambiente_casa.jpg", imagenRespaldo: "img/escena_dos_caminos.jpg",
          preguntaAudio: "audio/ambientes_p3.mp3",
          opciones: [
            "Que hay un lado oculto detrás de su vida respetable",
            "Que Jekyll es una persona sin secretos",
            "Que la casa está deshabitada",
            "Que Jekyll vive en la pobreza"
          ],
          correcta: 0,
          audioCorrecta: "audio/ambientes_r3.mp3",
          explicacion: "El contraste entre la fachada respetable y esa puerta escondida anticipa el doble aspecto de Jekyll."
        }
      ]
    },

    // 11 -- Campo semántico (concepto) -----------------------------------
    {
      id: "campo-narracion",
      tipo: "narracionAnimada",
      animacionLetras: true,
      titulo: "El campo semántico",
      imagen: "img/escena_palabras_flotando.jpg",
      pasos: [
        { texto: "El campo semántico es el conjunto de palabras con significados relacionados, porque refieren a un mismo tema.", audio: "audio/campo_paso1.mp3", palabras: ["campo", "semántico"] },
        { texto: "En la escena de la puerta misteriosa, muchas palabras se relacionan con el misterio y lo siniestro.", audio: "audio/campo_paso2.mp3", palabras: ["sucia", "siniestra", "inquietante", "oscura", "misterio"] },
        { texto: "Un determinado campo semántico contribuye a generar ciertos climas en un texto.", audio: "audio/campo_paso3.mp3", palabras: ["clima", "tensión", "intriga"] },
        { texto: "Por eso, identificar ese campo semántico nos ayuda a entender por qué una escena nos genera cierta sensación.", audio: "audio/campo_paso4.mp3", palabras: ["MISTERIO"] }
      ]
    },

    // 12 -- Clasificar campo semántico del misterio ----------------------
    {
      id: "campo-clasificar",
      tipo: "clasificar",
      titulo: "El campo semántico de la puerta misteriosa",
      instruccion: "Decidí si cada palabra pertenece al campo semántico del misterio en la escena de la puerta.",
      instruccionAudio: "audio/campoclas_instr.mp3",
      preguntaAudio: "audio/campoclas_pregunta.mp3",
      imagen: "img/escena_ambiente_niebla.jpg",
      categorias: ["Pertenece al campo del misterio", "No pertenece"],
      items: [
        { texto: "sucia", categoriaCorrecta: 0, audioPalabra: "audio/campo_clas_1.mp3", audioCorrecta: "audio/campo_clas_1r.mp3", justificacion: "Describe el deterioro de la puerta, aporta al clima siniestro." },
        { texto: "siniestra", categoriaCorrecta: 0, audioPalabra: "audio/campo_clas_2.mp3", audioCorrecta: "audio/campo_clas_2r.mp3", justificacion: "Nombra directamente la sensación de amenaza que genera el lugar." },
        { texto: "ensalada", categoriaCorrecta: 1, audioPalabra: "audio/campo_clas_3.mp3", audioCorrecta: "audio/campo_clas_3r.mp3", justificacion: "No tiene relación con el clima de misterio de la escena." },
        { texto: "descuidada", categoriaCorrecta: 0, audioPalabra: "audio/campo_clas_4.mp3", audioCorrecta: "audio/campo_clas_4r.mp3", justificacion: "Refuerza la idea de abandono y contraste con la calle prolija." },
        { texto: "bicicleta", categoriaCorrecta: 1, audioPalabra: "audio/campo_clas_5.mp3", audioCorrecta: "audio/campo_clas_5r.mp3", justificacion: "No tiene relación con el clima de misterio de la escena." },
        { texto: "inquietante", categoriaCorrecta: 0, audioPalabra: "audio/campo_clas_6.mp3", audioCorrecta: "audio/campo_clas_6r.mp3", justificacion: "Describe justamente la sensación que produce ese lugar." },
        { texto: "silenciosa", categoriaCorrecta: 0, audioPalabra: "audio/campo_clas_7.mp3", audioCorrecta: "audio/campo_clas_7r.mp3", justificacion: "El silencio contribuye al clima de misterio." },
        { texto: "cumpleaños", categoriaCorrecta: 1, audioPalabra: "audio/campo_clas_8.mp3", audioCorrecta: "audio/campo_clas_8r.mp3", justificacion: "No tiene relación con el clima de misterio de la escena." }
      ]
    },

    // 13 -- Desafío de escritor: parafrasear ------------------------------
    {
      id: "escritor-parafrasear",
      tipo: "trivia",
      titulo: "Desafío de escritor",
      instruccion: "Elegí la mejor forma de expresar la misma idea con otras palabras.",
      instruccionAudio: "audio/parafrasear_instr.mp3",
      imagen: "img/escena_farol.jpg",
      items: [
        {
          pregunta: "\"Las luces, inmóviles por la ausencia de viento, proyectaban un patrón regular de claridad y sombra.\" ¿Cuál es la mejor forma de decir esto con otras palabras?",
          preguntaAudio: "audio/parafrasear_p1.mp3",
          opciones: [
            "Como no soplaba viento, las luces quietas dibujaban una alternancia pareja de luz y oscuridad",
            "Las luces se movían mucho porque había mucho viento esa noche",
            "No había ninguna luz encendida en la calle",
            "Las sombras eran de distintos colores según el clima"
          ],
          correcta: 0,
          audioCorrecta: "audio/parafrasear_r1.mp3",
          explicacion: "Mantiene la misma idea (luces quietas por falta de viento, generando un patrón de luz y sombra) con otras palabras."
        }
      ]
    },

    // 14 -- La novela (concepto) -------------------------------------------
    {
      id: "novela-narracion",
      tipo: "narracionAnimada",
      titulo: "La novela",
      imagen: "img/escena_libro_capitulos.jpg",
      pasos: [
        { texto: "La novela es una creación literaria ficcional que se organiza en capítulos numerados y, a veces, titulados.", audio: "audio/novela_paso1.mp3", imagen: "img/escena_libro_capitulos.jpg" },
        { texto: "Los hechos que se narran se organizan de manera que generan la intriga, el esqueleto que sostiene la novela.", audio: "audio/novela_paso2.mp3", imagen: "img/novela_esqueleto.jpg", imagenRespaldo: "img/escena_libro_capitulos.jpg" },
        { texto: "En El extraño caso del Dr. Jekyll y Mr. Hyde, la intriga central es descubrir qué relación oculta existe entre Jekyll y Hyde.", audio: "audio/novela_paso3.mp3", imagen: "img/novela_doble_cara.jpg", imagenRespaldo: "img/escena_personaje_sombra.jpg" },
        { texto: "Las acciones que componen la novela son el argumento; los personajes las llevan a cabo en un tiempo y espacio determinados.", audio: "audio/novela_paso4.mp3", imagen: "img/escena_engranajes_historia.jpg" },
        { texto: "Mediante las diferentes situaciones, se crea la tensión narrativa, que genera expectativa, incertidumbre e intriga en el lector.", audio: "audio/novela_paso5.mp3", imagen: "img/novela_tension.jpg", imagenRespaldo: "img/escena_puerta_misteriosa.jpg" }
      ]
    },

    // 15 -- Ficha de personaje: Utterson (asociar) --------------------------
    {
      id: "novela-ficha-utterson",
      tipo: "asociar",
      titulo: "Ficha de personaje: Utterson",
      instruccion: "Completá la ficha de Utterson uniendo cada dato con su categoría.",
      instruccionAudio: "audio/ficha_instr.mp3",
      imagen: "img/escena_libro_lupa.jpg",
      pares: [
        { izquierda: "Rasgos del personaje", derecha: "Abogado de profesión, hosco, nunca sonríe", audioIzq: "audio/ficha_i1.mp3", audioDer: "audio/ficha_d1.mp3", audioPar: "audio/ficha_par1.mp3" },
        { izquierda: "Tipo de personaje", derecha: "Protagonista: es quien investiga toda la historia", audioIzq: "audio/ficha_i2.mp3", audioDer: "audio/ficha_d2.mp3", audioPar: "audio/ficha_par2.mp3" },
        { izquierda: "Cita textual", derecha: "\"Utterson, el notario, era un hombre de cara arrugada, jamás iluminada por una sonrisa\"", audioIzq: "audio/ficha_i3.mp3", audioDer: "audio/ficha_d3.mp3", audioPar: "audio/ficha_par3.mp3" },
        { izquierda: "Relación con Jekyll", derecha: "Es su viejo amigo y también su abogado", audioIzq: "audio/ficha_i4.mp3", audioDer: "audio/ficha_d4.mp3", audioPar: "audio/ficha_par4.mp3" }
      ]
    },

    // 16 -- Verdadero/falso sobre la novela ----------------------------------
    {
      id: "novela-vf",
      tipo: "verdaderoFalso",
      titulo: "Repaso: la novela",
      instruccion: "Decidí si cada afirmación es verdadera o falsa.",
      instruccionAudio: "audio/novela_vf_instr.mp3",
      imagen: "img/escena_balanza_equilibrio.jpg",
      items: [
        { afirmacion: "La intriga es el esqueleto que sostiene la novela.", valor: true, audio: "audio/novela_vf_1.mp3", justificacion: "Así se la define en el texto.", imagen: "img/novela_esqueleto.jpg", imagenRespaldo: "img/escena_libro_capitulos.jpg" },
        { afirmacion: "En esta novela, la intriga es descubrir la relación entre Jekyll y Hyde.", valor: true, audio: "audio/novela_vf_2.mp3", justificacion: "Esa es justamente la pregunta que persigue a Utterson durante toda la historia.", imagen: "img/novela_doble_cara.jpg", imagenRespaldo: "img/escena_personaje_sombra.jpg" },
        { afirmacion: "El argumento son las acciones que componen la novela.", valor: true, audio: "audio/novela_vf_3.mp3", justificacion: "Correcto, así se define el argumento.", imagen: "img/escena_engranajes_historia.jpg" },
        { afirmacion: "La tensión narrativa nunca genera incertidumbre en el lector.", valor: false, audio: "audio/novela_vf_4.mp3", justificacion: "Al contrario: la tensión narrativa genera incertidumbre, expectativa e intriga.", imagen: "img/novela_tension.jpg", imagenRespaldo: "img/escena_puerta_misteriosa.jpg" },
        { afirmacion: "El testamento de Jekyll es uno de los elementos que alimenta la intriga.", valor: true, audio: "audio/novela_vf_5.mp3", justificacion: "Que Jekyll deje todo a Hyde despierta las sospechas de Utterson.", imagen: "img/item_utterson_testamento.jpg" }
      ]
    },

    // 17 -- Asociar términos de la novela --------------------------------
    {
      id: "novela-asociar",
      tipo: "asociar",
      titulo: "Términos de la novela",
      instruccion: "Uní cada término con su definición.",
      instruccionAudio: "audio/novela_asociar_instr.mp3",
      imagen: "img/escena_engranajes_historia.jpg",
      pares: [
        { izquierda: "Intriga", derecha: "El esqueleto que sostiene la novela", audioIzq: "audio/novela_as_i1.mp3", audioDer: "audio/novela_as_d1.mp3", audioPar: "audio/novela_as_par1.mp3" },
        { izquierda: "Argumento", derecha: "Las acciones que componen la novela", audioIzq: "audio/novela_as_i2.mp3", audioDer: "audio/novela_as_d2.mp3", audioPar: "audio/novela_as_par2.mp3" },
        { izquierda: "Tensión narrativa", derecha: "Genera expectativa e incertidumbre en el lector", audioIzq: "audio/novela_as_i3.mp3", audioDer: "audio/novela_as_d3.mp3", audioPar: "audio/novela_as_par3.mp3" },
        { izquierda: "Conflicto", derecha: "Lo que existe entre el equilibrio inicial y el final", audioIzq: "audio/novela_as_i4.mp3", audioDer: "audio/novela_as_d4.mp3", audioPar: "audio/novela_as_par4.mp3" }
      ]
    },

    // 18 -- Clasificar personajes reales ----------------------------------
    {
      id: "novela-personajes-clasificar",
      tipo: "clasificar",
      titulo: "Personajes: ¿qué rol cumplen?",
      instruccion: "Clasificá a cada personaje según el rol que cumple en la historia.",
      instruccionAudio: "audio/personajes_instr.mp3",
      preguntaAudio: "audio/personajes_pregunta.mp3",
      imagen: "img/escena_tres_personajes.jpg",
      categorias: ["Protagonista", "Antagonista", "Secundario"],
      items: [
        { texto: "Utterson", categoriaCorrecta: 0, audioPalabra: "audio/pers_1.mp3", audioCorrecta: "audio/pers_1r.mp3", justificacion: "Es quien investiga y guía al lector a lo largo de toda la trama.", imagen: "img/item_utterson_arrugado.jpg" },
        { texto: "Hyde", categoriaCorrecta: 1, audioPalabra: "audio/pers_2.mp3", audioCorrecta: "audio/pers_2r.mp3", justificacion: "Es quien genera el conflicto y se opone a la vida ordenada de los demás personajes.", imagen: "img/item_hyde_inquietante.jpg" },
        { texto: "Lanyon", categoriaCorrecta: 2, audioPalabra: "audio/pers_3.mp3", audioCorrecta: "audio/pers_3r.mp3", justificacion: "Es un viejo amigo de Jekyll que colabora con la trama, sin ser el eje central.", imagen: "img/pers_lanyon.jpg", imagenRespaldo: "img/escena_tres_personajes.jpg" },
        { texto: "Poole", categoriaCorrecta: 2, audioPalabra: "audio/pers_4.mp3", audioCorrecta: "audio/pers_4r.mp3", justificacion: "El mayordomo de Jekyll interactúa con los personajes principales, pero no es el centro de la historia.", imagen: "img/pers_poole.jpg", imagenRespaldo: "img/escena_tres_personajes.jpg" },
        { texto: "Enfield", categoriaCorrecta: 2, audioPalabra: "audio/pers_5.mp3", audioCorrecta: "audio/pers_5r.mp3", justificacion: "Es quien le cuenta a Utterson lo que vio, pero no protagoniza la investigación.", imagen: "img/pers_enfield.jpg", imagenRespaldo: "img/escena_tres_personajes.jpg" }
      ]
    },

    // 19 -- Secuencia narrativa (concepto) --------------------------------
    {
      id: "secuencia-narracion",
      tipo: "narracionAnimada",
      titulo: "La secuencia narrativa",
      imagen: "img/escena_linea_hechos.jpg",
      pasos: [
        { texto: "La secuencia narrativa es la disposición de los hechos de la historia: cómo se relacionan los hechos importantes y los secundarios.", audio: "audio/secuencia_paso1.mp3", imagen: "img/escena_linea_hechos.jpg" },
        { texto: "Se denomina núcleos narrativos a los hechos que hacen que la acción avance.", audio: "audio/secuencia_paso2.mp3", imagen: "img/escena_engranajes_historia.jpg" },
        { texto: "En los primeros capítulos, un núcleo narrativo clave es cuando Enfield le cuenta a Utterson lo que vio hacer a Hyde.", audio: "audio/secuencia_paso3.mp3", imagen: "img/sec_enfield_cuenta.jpg", imagenRespaldo: "img/escena_reloj_calle.jpg" },
        { texto: "A partir de ahí, cada hecho lleva al siguiente: descubrir el testamento, investigar a Hyde, visitar a Lanyon.", audio: "audio/secuencia_paso4.mp3", imagen: "img/escena_linea_hechos.jpg" }
      ]
    },

    // 20 -- Ordenar la secuencia real ---------------------------------------
    {
      id: "secuencia-ordenar",
      tipo: "lineaTiempo",
      titulo: "Ordená la secuencia",
      instruccion: "Tocá los hechos en el orden correcto en que ocurren en los primeros capítulos.",
      instruccionAudio: "audio/secuencia_ordenar_instr.mp3",
      imagen: "img/escena_reloj_calle.jpg",
      textoIntro: "Utterson y Enfield caminan por Londres y se detienen frente a una puerta extraña.",
      audioIntro: "audio/secuencia_intro.mp3",
      items: [
        { texto: "Enfield le cuenta a Utterson que vio a Hyde atropellar a una niña.", audio: "audio/secuencia_h1.mp3", imagen: "img/sec_enfield_cuenta.jpg", imagenRespaldo: "img/escena_reloj_calle.jpg" },
        { texto: "Utterson descubre que el testamento de Jekyll deja todo a Hyde.", audio: "audio/secuencia_h2.mp3", imagen: "img/item_utterson_testamento.jpg" },
        { texto: "Utterson tiene pesadillas con una figura sin rostro.", audio: "audio/secuencia_h3.mp3", imagen: "img/item_utterson_pesadilla.jpg" },
        { texto: "Utterson espera en la calle y finalmente conoce a Hyde en persona.", audio: "audio/secuencia_h4.mp3", imagen: "img/sec_utterson_espera.jpg", imagenRespaldo: "img/escena_reloj_calle.jpg" },
        { texto: "Utterson visita a Jekyll en una cena y le pregunta por el testamento.", audio: "audio/secuencia_h5.mp3", imagen: "img/sec_cena_jekyll.jpg", imagenRespaldo: "img/escena_reloj_calle.jpg" }
      ]
    },

    // 21 -- Trivia principal/secundario ---------------------------------
    {
      id: "secuencia-trivia",
      tipo: "trivia",
      titulo: "Principales y secundarios",
      instruccion: "Respondé sobre los personajes principales y secundarios.",
      instruccionAudio: "audio/secuencia_trivia_instr.mp3",
      imagen: "img/escena_grupo_personajes.jpg",
      items: [
        {
          pregunta: "¿Quién organiza a los personajes en principales y secundarios?",
          preguntaAudio: "audio/secuencia_trivia_p1.mp3",
          opciones: ["Su importancia para que avance el relato", "El orden en que aparecen", "La cantidad de líneas que dicen", "Su edad"],
          correcta: 0,
          audioCorrecta: "audio/secuencia_trivia_r1.mp3",
          explicacion: "Se organizan según su importancia para que avance el relato."
        },
        {
          pregunta: "¿Qué es un antagonista, como Hyde en esta historia?",
          preguntaAudio: "audio/secuencia_trivia_p2.mp3",
          opciones: ["Alguien que se opone al protagonista", "El narrador de la historia", "Un personaje sin importancia", "El autor del libro"],
          correcta: 0,
          audioCorrecta: "audio/secuencia_trivia_r2.mp3",
          explicacion: "El antagonista se opone al protagonista o personaje principal."
        },
        {
          pregunta: "Personajes como Lanyon o Poole son...",
          preguntaAudio: "audio/secuencia_trivia_p3.mp3",
          opciones: [
            "Secundarios: colaboran con la trama interactuando con los principales",
            "Los verdaderos protagonistas de la novela",
            "Los antagonistas de la historia",
            "Personajes que nunca aparecen"
          ],
          correcta: 0,
          audioCorrecta: "audio/secuencia_trivia_r3.mp3",
          explicacion: "Colaboran con la trama en tanto interactúan con los personajes principales."
        },
        {
          pregunta: "El momento en que Enfield le cuenta a Utterson lo que vio es un núcleo narrativo porque...",
          preguntaAudio: "audio/secuencia_trivia_p4.mp3",
          opciones: [
            "Hace avanzar la acción: dispara toda la investigación",
            "Es solo una descripción del paisaje",
            "Es el título del capítulo",
            "No tiene ninguna importancia"
          ],
          correcta: 0,
          audioCorrecta: "audio/secuencia_trivia_r4.mp3",
          explicacion: "A partir de ese relato, Utterson decide investigar: la acción avanza desde ahí."
        }
      ]
    },

    // 22 -- Sopa de letras ------------------------------------------------
    {
      id: "sopa-de-letras",
      tipo: "sopaDeLetras",
      titulo: "Sopa de letras",
      instruccion: "Buscá las palabras relacionadas con lo que aprendimos. Tocá la primera y la última letra de cada una.",
      instruccionAudio: "audio/sopa_instr.mp3",
      imagen: "img/escena_palabras_flotando.jpg",
      tamano: 14,
      palabras: ["MAYUSCULA", "ABREVIATURA", "NOVELA", "JEKYLL", "HYDE", "UTTERSON", "PROTAGONISTA", "ANTAGONISTA", "MISTERIO"]
    },

    // 23 -- Ortografía (concepto) -----------------------------------------
    {
      id: "ortografia-narracion",
      tipo: "narracionAnimada",
      titulo: "Argentina y argentina",
      imagen: "img/escena_bandera_mapa.jpg",
      pasos: [
        { texto: "Los nombres de países se escriben siempre con mayúscula inicial, porque son nombres propios: Argentina.", audio: "audio/orto_paso1.mp3" },
        { texto: "Pero el gentilicio, la palabra que indica de dónde es alguien o algo, se escribe con minúscula: un plato argentino, una escuela argentina.", audio: "audio/orto_paso2.mp3" },
        { texto: "Es la misma raíz de palabra, pero cumple funciones distintas: nombre propio de país versus adjetivo gentilicio.", audio: "audio/orto_paso3.mp3" },
        { texto: "Esta regla se repite con todos los países: Inglaterra (nombre propio, como el país donde transcurre esta historia) e inglés o inglesa (gentilicio, minúscula).", audio: "audio/orto_paso4.mp3" }
      ]
    },

    // 24 -- Trivia Argentina/argentina -------------------------------------
    {
      id: "ortografia-trivia",
      tipo: "trivia",
      titulo: "Nombre propio o gentilicio",
      instruccion: "Elegí la opción correctamente escrita en cada caso.",
      instruccionAudio: "audio/orto_trivia_instr.mp3",
      imagen: "img/escena_pasaporte_mapa.jpg",
      items: [
        {
          pregunta: "Nací en ___ y me encanta el mate.",
          preguntaAudio: "audio/orto_trivia_p1.mp3",
          opciones: ["Argentina", "argentina"],
          correcta: 0,
          audioCorrecta: "audio/orto_trivia_r1.mp3",
          explicacion: "Acá nombra al país: nombre propio, con mayúscula."
        },
        {
          pregunta: "Ese asado es bien ___.",
          preguntaAudio: "audio/orto_trivia_p2.mp3",
          opciones: ["Argentino", "argentino"],
          correcta: 1,
          audioCorrecta: "audio/orto_trivia_r2.mp3",
          explicacion: "Acá es un adjetivo gentilicio: minúscula."
        },
        {
          pregunta: "La historia de Jekyll y Hyde transcurre en ___.",
          preguntaAudio: "audio/orto_trivia_p3.mp3",
          opciones: ["Inglaterra", "inglaterra"],
          correcta: 0,
          audioCorrecta: "audio/orto_trivia_r3.mp3",
          explicacion: "Nombra al país: nombre propio, con mayúscula."
        },
        {
          pregunta: "Utterson tiene un típico acento ___.",
          preguntaAudio: "audio/orto_trivia_p4.mp3",
          opciones: ["Inglés", "inglés"],
          correcta: 1,
          audioCorrecta: "audio/orto_trivia_r4.mp3",
          explicacion: "Es gentilicio, funciona como adjetivo: minúscula."
        }
      ]
    },

    // 25 -- Clasificar nombre propio / gentilicio ---------------------------
    {
      id: "ortografia-clasificar",
      tipo: "clasificar",
      titulo: "Nombre propio o gentilicio",
      instruccion: "Tocá si cada palabra es nombre propio de país o gentilicio.",
      instruccionAudio: "audio/orto_clas_instr.mp3",
      preguntaAudio: "audio/orto_clas_pregunta.mp3",
      imagen: "img/escena_banderas_mundo.jpg",
      categorias: ["Nombre propio de país", "Gentilicio"],
      items: [
        { texto: "Argentina", categoriaCorrecta: 0, audioPalabra: "audio/orto_c_1.mp3", audioCorrecta: "audio/orto_c_1r.mp3", justificacion: "Nombra al país: nombre propio." },
        { texto: "mendocino", categoriaCorrecta: 1, audioPalabra: "audio/orto_c_2.mp3", audioCorrecta: "audio/orto_c_2r.mp3", justificacion: "Indica de dónde es alguien: gentilicio, minúscula." },
        { texto: "Escocia", categoriaCorrecta: 0, audioPalabra: "audio/orto_c_3.mp3", audioCorrecta: "audio/orto_c_3r.mp3", justificacion: "Nombra al país natal de Stevenson: nombre propio." },
        { texto: "escocés", categoriaCorrecta: 1, audioPalabra: "audio/orto_c_4.mp3", audioCorrecta: "audio/orto_c_4r.mp3", justificacion: "Es el gentilicio de Escocia: minúscula." },
        { texto: "Inglaterra", categoriaCorrecta: 0, audioPalabra: "audio/orto_c_5.mp3", audioCorrecta: "audio/orto_c_5r.mp3", justificacion: "Nombra al país donde transcurre la historia: nombre propio." },
        { texto: "inglés", categoriaCorrecta: 1, audioPalabra: "audio/orto_c_6.mp3", audioCorrecta: "audio/orto_c_6r.mp3", justificacion: "Es el gentilicio: minúscula." }
      ]
    },

    // 26 -- Repaso general V/F ------------------------------------------
    {
      id: "repaso-vf",
      tipo: "verdaderoFalso",
      titulo: "Repaso general",
      instruccion: "Último repaso: verdadero o falso.",
      instruccionAudio: "audio/repaso_vf_instr.mp3",
      imagen: "img/escena_repaso_final.jpg",
      items: [
        { afirmacion: "El nombre de un país siempre se escribe con mayúscula.", valor: true, audio: "audio/repaso_vf_1.mp3", justificacion: "Es un nombre propio." },
        { afirmacion: "La caracterización indirecta la dice explícitamente el narrador.", valor: false, audio: "audio/repaso_vf_2.mp3", justificacion: "Eso es la caracterización directa; la indirecta se deduce, como con Hyde." },
        { afirmacion: "El campo semántico agrupa palabras relacionadas por su significado.", valor: true, audio: "audio/repaso_vf_3.mp3", justificacion: "Correcto, esa es su definición." },
        { afirmacion: "Hyde es el antagonista de la historia.", valor: true, audio: "audio/repaso_vf_4.mp3", justificacion: "Se opone a la vida ordenada de Jekyll y los demás personajes." },
        { afirmacion: "Los núcleos narrativos son los hechos que hacen avanzar la historia.", valor: true, audio: "audio/repaso_vf_5.mp3", justificacion: "Correcto." }
      ]
    },

    // 27 -- Repaso general asociar ----------------------------------------
    {
      id: "repaso-asociar",
      tipo: "asociar",
      titulo: "Repaso general: uní los conceptos",
      instruccion: "Uní cada concepto con su definición.",
      instruccionAudio: "audio/repaso_asociar_instr.mp3",
      imagen: "img/escena_mapa_conceptos.jpg",
      pares: [
        { izquierda: "Marco narrativo", derecha: "Ambientes y tiempo en que se desarrolla la acción", audioIzq: "audio/repaso_as_i1.mp3", audioDer: "audio/repaso_as_d1.mp3", audioPar: "audio/repaso_as_par1.mp3" },
        { izquierda: "Campo semántico", derecha: "Palabras con significados relacionados", audioIzq: "audio/repaso_as_i2.mp3", audioDer: "audio/repaso_as_d2.mp3", audioPar: "audio/repaso_as_par2.mp3" },
        { izquierda: "Gentilicio", derecha: "Palabra que indica de dónde es alguien, se escribe en minúscula", audioIzq: "audio/repaso_as_i3.mp3", audioDer: "audio/repaso_as_d3.mp3", audioPar: "audio/repaso_as_par3.mp3" },
        { izquierda: "Núcleo narrativo", derecha: "Hecho que hace avanzar la acción de la historia", audioIzq: "audio/repaso_as_i4.mp3", audioDer: "audio/repaso_as_d4.mp3", audioPar: "audio/repaso_as_par4.mp3" },
        { izquierda: "Protagonista", derecha: "Personaje central, como Utterson en esta historia", audioIzq: "audio/repaso_as_i5.mp3", audioDer: "audio/repaso_as_d5.mp3", audioPar: "audio/repaso_as_par5.mp3" }
      ]
    }
  ]
};
