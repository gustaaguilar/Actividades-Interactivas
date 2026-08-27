// ============================================================
// LAS PARTES DE LA NOTICIA - 4to grado
// datos.js - Contenido de todas las pantallas
// ============================================================

// HTML reutilizado como "mini noticia" de ejemplo para las
// pantallas de narración animada (puntero sincronizado).
var MINI_NOTICIA_HTML =
  '<div class="mini-noticia">' +
    '<div id="z-volanta" class="zona-noticia zn-volanta">DEPORTES ESCOLARES</div>' +
    '<div id="z-titulo" class="zona-noticia zn-titulo">Nuestra escuela ganó el torneo</div>' +
    '<div id="z-copete" class="zona-noticia zn-copete">El equipo de 4° y 5° grado venció en la final.</div>' +
    '<div id="z-foto" class="zona-noticia zn-foto"><img src="assets/img/mockup_foto_trofeo.jpg" alt="Foto de la noticia" class="zn-foto-img"></div>' +
    '<div id="z-epigrafe" class="zona-noticia zn-epigrafe">Los chicos festejando con la copa.</div>' +
    '<div id="z-cuerpo" class="zona-noticia zn-cuerpo">El sábado se jugó la final y nuestro equipo ganó 3 a 1.</div>' +
  '</div>';

var DATOS = {

  titulo: "Las partes de la noticia",
  subtitulo: "Volanta, título, copete, foto, epígrafe y cuerpo",
  nivel: "Primaria · 4° grado",

  meta: {
    foto: "assets/img/profe.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    audioCorrecto: "assets/audio/correcto.mp3",
    audioVerdadero: "assets/audio/verdadero.mp3",
    audioFalso: "assets/audio/falso.mp3"
  },

  pantallas: [

    // ---------- 0. PORTADA ----------
    {
      id: 1,
      tipo: "portada",
      imagen: "assets/img/portada.jpg",
      titulo: "Las partes de la noticia",
      subtitulo: "Volanta, título, copete, foto, epígrafe y cuerpo"
    },

    // ---------- 1. ¿QUÉ ES UNA NOTICIA? (panorama general) ----------
    {
      id: 2,
      tipo: "narracionAnimada",
      titulo: "¿Qué es una noticia?",
      escenaHtml: MINI_NOTICIA_HTML,
      textoCompleto: "Una noticia cuenta un hecho real y reciente. Para que se entienda bien, se organiza siempre en las mismas partes: la volanta, el título, el copete, la foto, el epígrafe y el cuerpo. Vamos a conocerlas una por una.",
      pasos: [
        { targetId: null, texto: "", audio: "assets/audio/p02_intro.mp3" },
        { targetId: "z-volanta", texto: "Volanta", audio: "assets/audio/p02_volanta.mp3" },
        { targetId: "z-titulo", texto: "Título", audio: "assets/audio/p02_titulo.mp3" },
        { targetId: "z-copete", texto: "Copete", audio: "assets/audio/p02_copete.mp3" },
        { targetId: "z-foto", texto: "Foto", audio: "assets/audio/p02_foto.mp3" },
        { targetId: "z-epigrafe", texto: "Epígrafe", audio: "assets/audio/p02_epigrafe.mp3" },
        { targetId: "z-cuerpo", texto: "Cuerpo", audio: "assets/audio/p02_cuerpo.mp3" }
      ]
    },

    // ---------- 2. VOLANTA ----------
    {
      id: 3,
      tipo: "narracionAnimada",
      titulo: "La volanta",
      escenaHtml: MINI_NOTICIA_HTML,
      textoCompleto: "La volanta es el texto pequeño que va arriba del título. Agrega información y se refiere al tema general de la noticia.",
      pasos: [
        { targetId: "z-volanta", texto: "Volanta", audio: "assets/audio/p03_volanta.mp3" }
      ]
    },

    // ---------- 3. TÍTULO ----------
    {
      id: 4,
      tipo: "narracionAnimada",
      titulo: "El título",
      escenaHtml: MINI_NOTICIA_HTML,
      textoCompleto: "El título es el texto que llama la atención sobre el hecho. Se escribe con letras grandes y presenta el tema en una sola frase.",
      pasos: [
        { targetId: "z-titulo", texto: "Título", audio: "assets/audio/p04_titulo.mp3" }
      ]
    },

    // ---------- 4. COPETE ----------
    {
      id: 5,
      tipo: "narracionAnimada",
      titulo: "El copete",
      escenaHtml: MINI_NOTICIA_HTML,
      textoCompleto: "El copete es un resumen de la información principal de la noticia. Va ubicado debajo del título, antes del cuerpo.",
      pasos: [
        { targetId: "z-copete", texto: "Copete", audio: "assets/audio/p05_copete.mp3" }
      ]
    },

    // ---------- 5. FOTO Y EPÍGRAFE ----------
    {
      id: 6,
      tipo: "narracionAnimada",
      titulo: "La foto y el epígrafe",
      escenaHtml: MINI_NOTICIA_HTML,
      textoCompleto: "La foto o dibujo muestra el hecho que se cuenta en la noticia. Debajo de la foto suele haber un epígrafe: un texto breve que explica lo que se ve en la imagen.",
      pasos: [
        { targetId: "z-foto", texto: "Foto", audio: "assets/audio/p06_foto.mp3" },
        { targetId: "z-epigrafe", texto: "Epígrafe", audio: "assets/audio/p06_epigrafe.mp3" }
      ]
    },

    // ---------- 6. CUERPO DE LA NOTICIA ----------
    {
      id: 7,
      tipo: "narracionAnimada",
      titulo: "El cuerpo de la noticia",
      escenaHtml: MINI_NOTICIA_HTML,
      textoCompleto: "El cuerpo es el texto completo que desarrolla cada detalle de la noticia. Ahí se cuenta todo lo que pasó, cuándo, dónde y por qué.",
      pasos: [
        { targetId: "z-cuerpo", texto: "Cuerpo", audio: "assets/audio/p07_cuerpo.mp3" }
      ]
    },

    // ---------- 7. PUZZLE: VOLANTA ----------
    {
      id: 8,
      tipo: "ordenar",
      titulo: "Armá la oración: la volanta",
      imagen: "assets/img/img_volanta.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/p08_instr.mp3",
      oracionAudio: "assets/audio/p08_oracion.mp3",
      items: [
        { texto: "La", orden: 1 },
        { texto: "volanta", orden: 2 },
        { texto: "es", orden: 3 },
        { texto: "el", orden: 4 },
        { texto: "texto", orden: 5 },
        { texto: "pequeño", orden: 6 },
        { texto: "que", orden: 7 },
        { texto: "va", orden: 8 },
        { texto: "arriba", orden: 9 },
        { texto: "del", orden: 10 },
        { texto: "título.", orden: 11 }
      ]
    },

    // ---------- 8. PUZZLE: TÍTULO ----------
    {
      id: 9,
      tipo: "ordenar",
      titulo: "Armá la oración: el título",
      imagen: "assets/img/img_titulo.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/p09_instr.mp3",
      oracionAudio: "assets/audio/p09_oracion.mp3",
      items: [
        { texto: "El", orden: 1 },
        { texto: "título", orden: 2 },
        { texto: "es", orden: 3 },
        { texto: "el", orden: 4 },
        { texto: "texto", orden: 5 },
        { texto: "que", orden: 6 },
        { texto: "llama", orden: 7 },
        { texto: "la", orden: 8 },
        { texto: "atención", orden: 9 },
        { texto: "sobre", orden: 10 },
        { texto: "el", orden: 11 },
        { texto: "hecho.", orden: 12 }
      ]
    },

    // ---------- 9. PUZZLE: COPETE ----------
    {
      id: 10,
      tipo: "ordenar",
      titulo: "Armá la oración: el copete",
      imagen: "assets/img/img_copete.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/p10_instr.mp3",
      oracionAudio: "assets/audio/p10_oracion.mp3",
      items: [
        { texto: "El", orden: 1 },
        { texto: "copete", orden: 2 },
        { texto: "es", orden: 3 },
        { texto: "un", orden: 4 },
        { texto: "resumen", orden: 5 },
        { texto: "de", orden: 6 },
        { texto: "la", orden: 7 },
        { texto: "información", orden: 8 },
        { texto: "principal.", orden: 9 }
      ]
    },

    // ---------- 10. PUZZLE: FOTO ----------
    {
      id: 11,
      tipo: "ordenar",
      titulo: "Armá la oración: la foto",
      imagen: "assets/img/img_foto.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/p11_instr.mp3",
      oracionAudio: "assets/audio/p11_oracion.mp3",
      items: [
        { texto: "La", orden: 1 },
        { texto: "foto", orden: 2 },
        { texto: "muestra", orden: 3 },
        { texto: "el", orden: 4 },
        { texto: "hecho", orden: 5 },
        { texto: "que", orden: 6 },
        { texto: "se", orden: 7 },
        { texto: "cuenta", orden: 8 },
        { texto: "en", orden: 9 },
        { texto: "la", orden: 10 },
        { texto: "noticia.", orden: 11 }
      ]
    },

    // ---------- 11. PUZZLE: EPÍGRAFE ----------
    {
      id: 12,
      tipo: "ordenar",
      titulo: "Armá la oración: el epígrafe",
      imagen: "assets/img/img_epigrafe.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/p12_instr.mp3",
      oracionAudio: "assets/audio/p12_oracion.mp3",
      items: [
        { texto: "El", orden: 1 },
        { texto: "epígrafe", orden: 2 },
        { texto: "es", orden: 3 },
        { texto: "el", orden: 4 },
        { texto: "texto", orden: 5 },
        { texto: "breve", orden: 6 },
        { texto: "que", orden: 7 },
        { texto: "explica", orden: 8 },
        { texto: "la", orden: 9 },
        { texto: "foto.", orden: 10 }
      ]
    },

    // ---------- 12. PUZZLE: CUERPO ----------
    {
      id: 13,
      tipo: "ordenar",
      titulo: "Armá la oración: el cuerpo",
      imagen: "assets/img/img_cuerpo.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/p13_instr.mp3",
      oracionAudio: "assets/audio/p13_oracion.mp3",
      items: [
        { texto: "El", orden: 1 },
        { texto: "cuerpo", orden: 2 },
        { texto: "desarrolla", orden: 3 },
        { texto: "el", orden: 4 },
        { texto: "texto", orden: 5 },
        { texto: "completo", orden: 6 },
        { texto: "de", orden: 7 },
        { texto: "la", orden: 8 },
        { texto: "noticia.", orden: 9 }
      ]
    },

    // ---------- 13. SOPA DE LETRAS ----------
    {
      id: 14,
      tipo: "sopa",
      titulo: "Sopa de letras: partes de la noticia",
      imagen: "assets/img/img_sopa.jpg",
      consigna: "Buscá las 6 partes de la noticia en la sopa de letras. Tocá la primera y la última letra de cada palabra.",
      audio: "assets/audio/p14_instr.mp3",
      palabras: [
        { palabra: "VOLANTA", definicion: "Texto pequeño que va arriba del título.", audio: "assets/audio/p14_volanta.mp3" },
        { palabra: "TITULO", definicion: "Texto que llama la atención sobre el hecho.", audio: "assets/audio/p14_titulo.mp3" },
        { palabra: "COPETE", definicion: "Resumen de la información principal.", audio: "assets/audio/p14_copete.mp3" },
        { palabra: "FOTO", definicion: "Imagen que muestra el hecho.", audio: "assets/audio/p14_foto.mp3" },
        { palabra: "EPIGRAFE", definicion: "Texto breve que explica la foto.", audio: "assets/audio/p14_epigrafe.mp3" },
        { palabra: "CUERPO", definicion: "Texto completo de la noticia.", audio: "assets/audio/p14_cuerpo.mp3" }
      ]
    },

    // ---------- 14. ZONAS INFO: NOTICIA DE LA FLOR ----------
    {
      id: 15,
      tipo: "zonasInfo",
      titulo: "Descubrí las partes: la flor gigante",
      consigna: "Tocá cada número sobre la noticia y descubrí qué parte es. Tenés que tocarlos todos para poder avanzar.",
      audio: "assets/audio/p15_instr.mp3",
      imagen: "assets/img/noticia_flor.jpg",
      zonas: [
        { numero: 1, x: 9,  y: 8,  nombre: "Volanta",  descripcion: "\"EVENTO EXTRAORDINARIO\" es la volanta: el texto pequeño que va arriba del título.", audio: "assets/audio/p15_z1.mp3" },
        { numero: 2, x: 9,  y: 20, nombre: "Título",    descripcion: "\"La flor más grande del mundo se abre sin público\" es el título de la noticia.", audio: "assets/audio/p15_z2.mp3" },
        { numero: 3, x: 9,  y: 35, nombre: "Copete",    descripcion: "El párrafo que resume la información principal, debajo del título, es el copete.", audio: "assets/audio/p15_z3.mp3" },
        { numero: 4, x: 40, y: 58, nombre: "Foto",      descripcion: "La fotografía de la flor gigante muestra el hecho que se cuenta en la noticia.", audio: "assets/audio/p15_z4.mp3" },
        { numero: 5, x: 68, y: 78, nombre: "Epígrafe",  descripcion: "\"Un ejemplar de Amorphophallus\" explica brevemente lo que muestra la foto: es el epígrafe.", audio: "assets/audio/p15_z5.mp3" },
        { numero: 6, x: 12, y: 90, nombre: "Cuerpo",    descripcion: "El texto largo que empieza \"MADRID - 18 de mayo de 2020...\" es el cuerpo de la noticia.", audio: "assets/audio/p15_z6.mp3" }
      ]
    },

    // ---------- 15. MULTIPLE: NOTICIA DE LA FLOR ----------
    {
      id: 16,
      tipo: "multiple",
      titulo: "Elegí la parte correcta: la flor gigante",
      consigna: "Leé cada pregunta y elegí la opción correcta.",
      audio: "assets/audio/p16_instr.mp3",
      imagen: "assets/img/noticia_flor.jpg",
      preguntas: [
        {
          pregunta: "¿Cuál de estas opciones es la VOLANTA de la noticia?",
          opciones: ["EVENTO EXTRAORDINARIO", "La flor más grande del mundo se abre sin público", "MADRID - 18 DE MAYO 2020"],
          correcta: 0,
          audioPregunta: "assets/audio/p16_preg1.mp3",
          audioOpciones: ["assets/audio/p16_op1a.mp3", "assets/audio/p16_op1b.mp3", "assets/audio/p16_op1c.mp3"]
        },
        {
          pregunta: "¿Cuál de estas opciones es el TÍTULO de la noticia?",
          opciones: ["La flor más grande del mundo se abre sin público", "EVENTO EXTRAORDINARIO", "Un ejemplar de Amorphophallus"],
          correcta: 0,
          audioPregunta: "assets/audio/p16_preg2.mp3",
          audioOpciones: ["assets/audio/p16_op2a.mp3", "assets/audio/p16_op2b.mp3", "assets/audio/p16_op2c.mp3"]
        },
        {
          pregunta: "¿Cuál de estas opciones es el COPETE de la noticia?",
          opciones: ["El evento que sólo ocurre cada tres años y suele atraer a miles de visitantes, se tuvo que seguir por streaming debido a la pandemia.", "La flor más grande del mundo se abre sin público", "Un ejemplar de Amorphophallus"],
          correcta: 0,
          audioPregunta: "assets/audio/p16_preg3.mp3",
          audioOpciones: ["assets/audio/p16_op3a.mp3", "assets/audio/p16_op3b.mp3", "assets/audio/p16_op3c.mp3"]
        },
        {
          pregunta: "¿Cuál de estas opciones es el EPÍGRAFE de la noticia?",
          opciones: ["Un ejemplar de Amorphophallus", "EVENTO EXTRAORDINARIO", "MADRID - 18 DE MAYO 2020 - 17:57"],
          correcta: 0,
          audioPregunta: "assets/audio/p16_preg4.mp3",
          audioOpciones: ["assets/audio/p16_op4a.mp3", "assets/audio/p16_op4b.mp3", "assets/audio/p16_op4c.mp3"]
        }
      ]
    },

    // ---------- 16. ZONAS INFO: NOTICIA DE REALIDAD VIRTUAL ----------
    {
      id: 17,
      tipo: "zonasInfo",
      titulo: "Descubrí las partes: la realidad virtual",
      consigna: "Tocá cada número sobre la noticia y descubrí qué parte es. Tenés que tocarlos todos para poder avanzar.",
      audio: "assets/audio/p17_instr.mp3",
      imagen: "assets/img/noticia_rv.jpg",
      zonas: [
        { numero: 1, x: 14, y: 6,  nombre: "Volanta",  descripcion: "\"Empresas de tecnología desarrollan dispositivos de realidad virtual al alcance del gran público\" es la volanta.", audio: "assets/audio/p17_z1.mp3" },
        { numero: 2, x: 14, y: 14, nombre: "Título",    descripcion: "\"La realidad virtual ya está aquí\" es el título de la noticia.", audio: "assets/audio/p17_z2.mp3" },
        { numero: 3, x: 14, y: 22, nombre: "Copete",    descripcion: "El párrafo que resume la idea principal, debajo del título, es el copete.", audio: "assets/audio/p17_z3.mp3" },
        { numero: 4, x: 78, y: 38, nombre: "Foto",      descripcion: "La fotografía del chico con el casco de realidad virtual muestra el hecho de la noticia.", audio: "assets/audio/p17_z4.mp3" },
        { numero: 5, x: 63, y: 60, nombre: "Epígrafe",  descripcion: "\"La realidad virtual sumerge al usuario en una recreación de la realidad\" explica la foto: es el epígrafe.", audio: "assets/audio/p17_z5.mp3" },
        { numero: 6, x: 20, y: 78, nombre: "Cuerpo",    descripcion: "El texto largo que empieza \"Hace unos años, la realidad virtual estaba...\" es el cuerpo de la noticia.", audio: "assets/audio/p17_z6.mp3" }
      ]
    },

    // ---------- 17. MULTIPLE: NOTICIA DE REALIDAD VIRTUAL ----------
    {
      id: 18,
      tipo: "multiple",
      titulo: "Elegí la parte correcta: la realidad virtual",
      consigna: "Leé cada pregunta y elegí la opción correcta.",
      audio: "assets/audio/p18_instr.mp3",
      imagen: "assets/img/noticia_rv.jpg",
      preguntas: [
        {
          pregunta: "¿Cuál de estas opciones es la VOLANTA de la noticia?",
          opciones: ["Empresas de tecnología desarrollan dispositivos de realidad virtual al alcance del gran público.", "La realidad virtual ya está aquí", "La realidad virtual va mucho más allá de los videojuegos."],
          correcta: 0,
          audioPregunta: "assets/audio/p18_preg1.mp3",
          audioOpciones: ["assets/audio/p18_op1a.mp3", "assets/audio/p18_op1b.mp3", "assets/audio/p18_op1c.mp3"]
        },
        {
          pregunta: "¿Cuál de estas opciones es el TÍTULO de la noticia?",
          opciones: ["La realidad virtual ya está aquí", "Jueves 24 de agosto de 2017", "La realidad virtual sumerge al usuario en una recreación de la realidad."],
          correcta: 0,
          audioPregunta: "assets/audio/p18_preg2.mp3",
          audioOpciones: ["assets/audio/p18_op2a.mp3", "assets/audio/p18_op2b.mp3", "assets/audio/p18_op2c.mp3"]
        },
        {
          pregunta: "¿Cuál de estas opciones es el COPETE de la noticia?",
          opciones: ["La realidad virtual va mucho más allá de los videojuegos. Ya no es un sueño del futuro: esta tecnología está entre nosotros y va a cambiar nuestras vidas.", "La realidad virtual ya está aquí", "Empresas de tecnología desarrollan dispositivos de realidad virtual al alcance del gran público."],
          correcta: 0,
          audioPregunta: "assets/audio/p18_preg3.mp3",
          audioOpciones: ["assets/audio/p18_op3a.mp3", "assets/audio/p18_op3b.mp3", "assets/audio/p18_op3c.mp3"]
        },
        {
          pregunta: "¿Cuál de estas opciones es el EPÍGRAFE de la noticia?",
          opciones: ["La realidad virtual sumerge al usuario en una recreación de la realidad.", "La realidad virtual ya está aquí", "Hace unos años, la realidad virtual estaba reservada a la investigación."],
          correcta: 0,
          audioPregunta: "assets/audio/p18_preg4.mp3",
          audioOpciones: ["assets/audio/p18_op4a.mp3", "assets/audio/p18_op4b.mp3", "assets/audio/p18_op4c.mp3"]
        }
      ]
    },

    // ---------- 18. ASOCIAR: TÉRMINO CON DEFINICIÓN ----------
    {
      id: 19,
      tipo: "asociar",
      titulo: "Uní cada parte con su definición",
      imagen: "assets/img/img_asociar.jpg",
      consigna: "Tocá una parte de la noticia y después su definición para formar la pareja.",
      audio: "assets/audio/p19_instr.mp3",
      pares: [
        { izq: "Volanta",  audioIzq: "assets/audio/p19_izq1.mp3", der: "Texto pequeño que va arriba del título y agrega información sobre el tema.", audioDer: "assets/audio/p19_der1.mp3" },
        { izq: "Título",   audioIzq: "assets/audio/p19_izq2.mp3", der: "Texto que llama la atención sobre el hecho.", audioDer: "assets/audio/p19_der2.mp3" },
        { izq: "Copete",   audioIzq: "assets/audio/p19_izq3.mp3", der: "Resumen de la información principal, debajo del título.", audioDer: "assets/audio/p19_der3.mp3" },
        { izq: "Foto",     audioIzq: "assets/audio/p19_izq4.mp3", der: "Imagen que muestra el hecho que se cuenta.", audioDer: "assets/audio/p19_der4.mp3" },
        { izq: "Epígrafe", audioIzq: "assets/audio/p19_izq5.mp3", der: "Texto breve que explica lo que se ve en la foto.", audioDer: "assets/audio/p19_der5.mp3" },
        { izq: "Cuerpo",   audioIzq: "assets/audio/p19_izq6.mp3", der: "Texto completo que desarrolla cada detalle de la noticia.", audioDer: "assets/audio/p19_der6.mp3" }
      ]
    },

    // ---------- 19. VERDADERO O FALSO: REALIDAD VIRTUAL ----------
    {
      id: 20,
      tipo: "vf",
      titulo: "Verdadero o falso: la realidad virtual",
      consigna: "Leé cada afirmación sobre la noticia de realidad virtual y elegí si es verdadera o falsa.",
      audio: "assets/audio/p20_instr.mp3",
      imagen: "assets/img/noticia_rv.jpg",
      afirmaciones: [
        {
          texto: "La realidad virtual permite vivir simulaciones, como recorrer las pirámides de Egipto sin salir de casa.",
          valor: true,
          audio: "assets/audio/p20_af1.mp3",
          justificacion: "Verdadero: la noticia cuenta que con la realidad virtual se podrán vivir experiencias como esa sin moverse de casa.",
          audioJustif: "assets/audio/p20_just1.mp3"
        },
        {
          texto: "La realidad virtual solamente se usa para jugar videojuegos.",
          valor: false,
          audio: "assets/audio/p20_af2.mp3",
          justificacion: "Falso: la noticia dice que la realidad virtual va mucho más allá de los videojuegos, y que se usa en entretenimiento, investigación y medicina.",
          audioJustif: "assets/audio/p20_just2.mp3"
        },
        {
          texto: "Los simuladores de realidad virtual se usan en el ejército y en medicina para entrenar y planificar operaciones.",
          valor: true,
          audio: "assets/audio/p20_af3.mp3",
          justificacion: "Verdadero: la noticia cuenta que los simuladores se usan en el ejército para entrenamiento y también en medicina para planificar operaciones.",
          audioJustif: "assets/audio/p20_just3.mp3"
        }
      ]
    },

    // ---------- 20. CIERRE ----------
    {
      id: 21,
      tipo: "cierre",
      imagen: "assets/img/cierre.jpg",
      titulo: "¡Muy bien!",
      texto: "Ya conocés las seis partes de la noticia: volanta, título, copete, foto, epígrafe y cuerpo. La próxima vez que leas un diario vas a poder reconocerlas todas.",
      audio: "assets/audio/p21_cierre.mp3"
    }

  ]
};
