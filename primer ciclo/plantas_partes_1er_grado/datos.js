/* ============================================================
   Las plantas y sus partes — 1er grado
   QueSepanTodos.com · Profe Gustavo Aguilar
   Convención para el generador de audios (Colab):
   cada bloque hablado se escribe SIEMPRE como
       audio: "archivo.mp3", texto: "..."
   en ese orden y uno junto al otro, para que el script
   de extracción los pueda parsear con una sola expresión
   regular. No romper este orden en ningún lugar del archivo.
   ============================================================ */

const DATOS = {

  meta: {
    titulo: "Las plantas y sus partes",
    subtitulo: "¿Qué necesitan las plantas para vivir? ¿Cómo son sus partes?",
    grado: "1er grado",
    ciclo: "Primer Ciclo",
    area: "Ciencias Naturales",
    autor: "Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    fotoPerfil: "assets/images/profe.jpg",
    fraseLightbox: "Menos prisa, más vida 🧉🫂",
    textoFirma: "💻 Informática Educativa · Profe Gustavo Aguilar"
  },

  // ------------------------------------------------------------
  // PANTALLA 1 — PORTADA
  // ------------------------------------------------------------
  portada: {
    id: "portada",
    tipo: "portada",
    imagenFondo: "assets/images/portada_planta.jpg",
    titulo: "Las plantas y sus partes",
    audio: "portada_bienvenida.mp3",
    texto: "¡Hola! Bienvenido a Las plantas y sus partes. Tocá el botón Comenzar para empezar a jugar y aprender.",
    textoBoton: "▶️ Comenzar"
  },

  // ------------------------------------------------------------
  // PANTALLA 2 — VIDEO DE PRESENTACIÓN
  // ------------------------------------------------------------
  video: {
    id: "intro-video",
    tipo: "video",
    imagenFondo: "assets/images/video_intro.jpg",
    youtubeId: "SKVr4_Ezmgk",
    audio: "video_intro.mp3",
    texto: "Antes de empezar, vamos a mirar un video sobre las plantas y sus partes. Prestá mucha atención. Cuando termine, vas a poder tocar Continuar para seguir aprendiendo.",
    textoBoton: "🎬 Ver el video",
    textoContinuar: "Continuar"
  },

  // ------------------------------------------------------------
  // PANTALLA 3 — EXPLICACIÓN ANIMADA: ¿QUÉ NECESITAN LAS PLANTAS?
  // ------------------------------------------------------------
  explicacionNecesidades: {
    id: "exp-necesidades",
    tipo: "narracionAnimada",
    imagenFondo: "assets/images/necesidades_escena.jpg",
    tituloPantalla: "¿Qué necesitan las plantas para vivir?",
    audio: "exp_necesidades_intro.mp3",
    texto: "Las plantas están vivas, igual que nosotros, y necesitan varias cosas para vivir y crecer sanas. Mirá y escuchá con atención.",
    pasos: [
      {
        id: "sol",
        etiqueta: "Luz del sol",
        posicion: { xPercent: 29, yPercent: 16 },
        audio: "exp_necesidades_sol.mp3",
        texto: "La luz del sol ayuda a las plantas a hacer su alimento."
      },
      {
        id: "aire",
        etiqueta: "Aire",
        posicion: { xPercent: 50, yPercent: 15 },
        audio: "exp_necesidades_aire.mp3",
        texto: "Las plantas necesitan aire para respirar."
      },
      {
        id: "agua",
        etiqueta: "Agua",
        posicion: { xPercent: 71, yPercent: 24 },
        audio: "exp_necesidades_agua.mp3",
        texto: "El agua es importante para que las plantas crezcan fuertes y sanas."
      },
      {
        id: "tierra",
        etiqueta: "Tierra y nutrientes",
        posicion: { xPercent: 38, yPercent: 44 },
        audio: "exp_necesidades_tierra.mp3",
        texto: "La tierra sostiene la planta y le da los nutrientes que necesita para vivir."
      }
    ],
    audioCierre: "exp_necesidades_cierre.mp3",
    textoCierre: "Con amor y cuidado, las plantas crecen y nos dan muchas cosas buenas. Ahora vamos a jugar con lo que aprendimos."
  },

  // ------------------------------------------------------------
  // PANTALLA 4 — ACTIVIDAD: CLASIFICAR (necesita / no necesita)
  //   (equivalente interactivo de "colorea, tachá el intruso y
  //    pegá lo que necesita la planta para vivir")
  // ------------------------------------------------------------
  actividadClasificarNecesidades: {
    id: "act-clasificar-necesidades",
    tipo: "clasificar",
    imagenFondo: "assets/images/clasificar_fondo.jpg",
    audio: "act_clasificar_instruccion.mp3",
    texto: "Tocá cada tarjeta y después tocá la maceta verde si la planta LA NECESITA para vivir, o el tacho rojo si NO la necesita.",
    categorias: [
      { id: "necesita", etiqueta: "La planta LO necesita", icono: "assets/images/maceta_necesita.png", colorClase: "categoria-verde" },
      { id: "no_necesita", etiqueta: "La planta NO lo necesita", icono: "assets/images/tacho_no_necesita.png", colorClase: "categoria-roja" }
    ],
    items: [
      {
        id: "sol",
        etiqueta: "sol",
        imagen: "assets/images/icono_sol.png",
        audio: "item_sol.mp3",
        texto: "Sol",
        categoriaCorrecta: "necesita",
        audioConfirmacion: "conf_sol.mp3",
        textoConfirmacion: "¡Muy bien! El sol le da luz a la planta para hacer su alimento.",
        audioIncorrecta: "conf_sol_incorrecta.mp3",
        textoIncorrecta: "No era esa. El sol SÍ lo necesita la planta: le da luz para hacer su alimento."
      },
      {
        id: "aire",
        etiqueta: "aire",
        imagen: "assets/images/icono_aire.png",
        audio: "item_aire.mp3",
        texto: "Aire",
        categoriaCorrecta: "necesita",
        audioConfirmacion: "conf_aire.mp3",
        textoConfirmacion: "¡Correcto! El aire ayuda a la planta a respirar.",
        audioIncorrecta: "conf_aire_incorrecta.mp3",
        textoIncorrecta: "No era esa. El aire SÍ lo necesita la planta: lo usa para respirar."
      },
      {
        id: "agua",
        etiqueta: "agua",
        imagen: "assets/images/icono_agua.png",
        audio: "item_agua.mp3",
        texto: "Agua",
        categoriaCorrecta: "necesita",
        audioConfirmacion: "conf_agua.mp3",
        textoConfirmacion: "¡Exacto! El agua hace que la planta crezca fuerte y sana.",
        audioIncorrecta: "conf_agua_incorrecta.mp3",
        textoIncorrecta: "No era esa. El agua SÍ la necesita la planta: la ayuda a crecer fuerte y sana."
      },
      {
        id: "tierra",
        etiqueta: "tierra",
        imagen: "assets/images/icono_tierra.png",
        audio: "item_tierra.mp3",
        texto: "Tierra",
        categoriaCorrecta: "necesita",
        audioConfirmacion: "conf_tierra.mp3",
        textoConfirmacion: "¡Bien! La tierra sostiene a la planta y le da nutrientes.",
        audioIncorrecta: "conf_tierra_incorrecta.mp3",
        textoIncorrecta: "No era esa. La tierra SÍ la necesita la planta: la sostiene y le da nutrientes."
      },
      {
        id: "dulce",
        etiqueta: "dulce",
        imagen: "assets/images/icono_dulce.png",
        audio: "item_dulce.mp3",
        texto: "Dulce",
        categoriaCorrecta: "no_necesita",
        audioConfirmacion: "conf_dulce.mp3",
        textoConfirmacion: "¡Claro! El dulce es el intruso: las plantas no comen dulces para vivir.",
        audioIncorrecta: "conf_dulce_incorrecta.mp3",
        textoIncorrecta: "No era esa. El dulce NO lo necesita la planta: es el intruso."
      }
    ]
  },

  // ------------------------------------------------------------
  // PANTALLA 5 — EXPLICACIÓN ANIMADA: LAS PARTES DE LA PLANTA
  // ------------------------------------------------------------
  explicacionPartes: {
    id: "exp-partes",
    tipo: "narracionAnimada",
    imagenFondo: "assets/images/partes_planta.jpg",
    tituloPantalla: "Las partes de la planta",
    audio: "exp_partes_intro.mp3",
    texto: "Las plantas tienen distintas partes y cada una cumple una función muy importante. Vamos a conocerlas.",
    pasos: [
      {
        id: "raiz",
        etiqueta: "Raíz",
        posicion: { xPercent: 48, yPercent: 83 },
        audio: "exp_partes_raiz.mp3",
        texto: "La raíz absorbe agua y nutrientes del suelo y sujeta la planta a la tierra."
      },
      {
        id: "tallo",
        etiqueta: "Tallo",
        posicion: { xPercent: 49, yPercent: 58 },
        audio: "exp_partes_tallo.mp3",
        texto: "El tallo sostiene la planta y transporta el agua y el alimento."
      },
      {
        id: "hoja",
        etiqueta: "Hoja",
        posicion: { xPercent: 30, yPercent: 50 },
        audio: "exp_partes_hoja.mp3",
        texto: "La hoja hace el alimento de la planta usando la luz del sol."
      },
      {
        id: "flor",
        etiqueta: "Flor",
        posicion: { xPercent: 44, yPercent: 15 },
        audio: "exp_partes_flor.mp3",
        texto: "De la flor nacen los frutos."
      },
      {
        id: "fruto",
        etiqueta: "Fruto",
        posicion: { xPercent: 62, yPercent: 25 },
        audio: "exp_partes_fruto.mp3",
        texto: "El fruto contiene las semillas."
      }
    ],
    audioCierre: "exp_partes_cierre.mp3",
    textoCierre: "Raíz, tallo, hoja, flor y fruto: cada parte ayuda a la planta a vivir. Ahora vamos a jugar."
  },

  // ------------------------------------------------------------
  // PANTALLA 6 — ACTIVIDAD: HOTSPOT SOBRE LA IMAGEN
  //   (equivalente interactivo de "escribí cada palabra en su
  //    lugar" sobre el árbol)
  // ------------------------------------------------------------
  actividadHotspotPartes: {
    id: "act-hotspot-partes",
    tipo: "hotspot",
    imagenFondo: "assets/images/arbol_hotspot.jpg",
    audio: "act_hotspot_instruccion.mp3",
    texto: "Este es un árbol. Tocá cada parte que te voy nombrando: raíz, tallo, hoja, flor y fruto.",
    // Coordenadas en % relativas al tamaño renderizado de la imagen real,
    // calibradas contra arbol_hotspot.jpg (imagen final ya integrada).
    zonas: [
      {
        id: "raiz",
        etiqueta: "raíz",
        posicion: { xPercent: 50, yPercent: 90 },
        audioNombre: "hotspot_pedido_raiz.mp3",
        textoNombre: "Tocá la raíz.",
        audioConfirmacion: "hotspot_conf_raiz.mp3",
        textoConfirmacion: "¡Esa es la raíz! Absorbe agua y nutrientes del suelo."
      },
      {
        id: "tallo",
        etiqueta: "tallo",
        posicion: { xPercent: 50, yPercent: 64 },
        audioNombre: "hotspot_pedido_tallo.mp3",
        textoNombre: "Ahora tocá el tallo.",
        audioConfirmacion: "hotspot_conf_tallo.mp3",
        textoConfirmacion: "¡Muy bien! El tallo transporta el agua y el alimento."
      },
      {
        id: "hoja",
        etiqueta: "hoja",
        posicion: { xPercent: 45, yPercent: 20 },
        audioNombre: "hotspot_pedido_hoja.mp3",
        textoNombre: "Tocá una hoja.",
        audioConfirmacion: "hotspot_conf_hoja.mp3",
        textoConfirmacion: "¡Correcto! La hoja hace el alimento de la planta."
      },
      {
        id: "flor",
        etiqueta: "flor",
        posicion: { xPercent: 73, yPercent: 7 },
        audioNombre: "hotspot_pedido_flor.mp3",
        textoNombre: "Tocá la flor.",
        audioConfirmacion: "hotspot_conf_flor.mp3",
        textoConfirmacion: "¡Exacto! De la flor nacen los frutos."
      },
      {
        id: "fruto",
        etiqueta: "fruto",
        posicion: { xPercent: 26, yPercent: 40 },
        audioNombre: "hotspot_pedido_fruto.mp3",
        textoNombre: "Por último, tocá el fruto.",
        audioConfirmacion: "hotspot_conf_fruto.mp3",
        textoConfirmacion: "¡Bien! El fruto contiene las semillas."
      }
    ]
  },

  // ------------------------------------------------------------
  // PANTALLA 7 — ACTIVIDAD NUEVA: ASOCIAR PARTE ↔ FUNCIÓN
  // ------------------------------------------------------------
  actividadAsociarFunciones: {
    id: "act-asociar-funciones",
    tipo: "asociar",
    imagenFondo: "assets/images/asociar_fondo.jpg",
    audio: "act_asociar_instruccion.mp3",
    texto: "Uní cada parte de la planta con lo que hace. Tocá una palabra y después tocá su función.",
    pares: [
      {
        id: "raiz",
        izquierda: { texto: "Raíz", imagen: "assets/images/icono_raiz.png", audio: "asociar_raiz.mp3" },
        derecha: { texto: "Absorbe agua y nutrientes del suelo", audio: "asociar_raiz_funcion.mp3" },
        audioConfirmacion: "asociar_conf_raiz.mp3",
        textoConfirmacion: "¡Bien! La raíz absorbe agua y nutrientes."
      },
      {
        id: "tallo",
        izquierda: { texto: "Tallo", imagen: "assets/images/icono_tallo.png", audio: "asociar_tallo.mp3" },
        derecha: { texto: "Sostiene la planta y transporta el agua", audio: "asociar_tallo_funcion.mp3" },
        audioConfirmacion: "asociar_conf_tallo.mp3",
        textoConfirmacion: "¡Correcto! El tallo sostiene y transporta el agua."
      },
      {
        id: "hoja",
        izquierda: { texto: "Hoja", imagen: "assets/images/icono_hoja.png", audio: "asociar_hoja.mp3" },
        derecha: { texto: "Hace el alimento de la planta", audio: "asociar_hoja_funcion.mp3" },
        audioConfirmacion: "asociar_conf_hoja.mp3",
        textoConfirmacion: "¡Exacto! La hoja hace el alimento con la luz del sol."
      },
      {
        id: "flor",
        izquierda: { texto: "Flor", imagen: "assets/images/icono_flor.png", audio: "asociar_flor.mp3" },
        derecha: { texto: "De ella nacen los frutos", audio: "asociar_flor_funcion.mp3" },
        audioConfirmacion: "asociar_conf_flor.mp3",
        textoConfirmacion: "¡Muy bien! De la flor nacen los frutos."
      },
      {
        id: "fruto",
        izquierda: { texto: "Fruto", imagen: "assets/images/icono_fruto.png", audio: "asociar_fruto.mp3" },
        derecha: { texto: "Contiene las semillas", audio: "asociar_fruto_funcion.mp3" },
        audioConfirmacion: "asociar_conf_fruto.mp3",
        textoConfirmacion: "¡Bien! El fruto contiene las semillas."
      }
    ]
  },

  // ------------------------------------------------------------
  // PANTALLA 8 — ACTIVIDAD NUEVA: TRIVIA (opción múltiple)
  // ------------------------------------------------------------
  actividadTrivia: {
    id: "act-trivia",
    tipo: "trivia",
    imagenFondo: "assets/images/trivia_fondo.jpg",
    audioInstruccion: "act_trivia_instruccion.mp3",
    textoInstruccion: "Elegí la respuesta correcta tocándola.",
    // Audio genérico para cualquier respuesta incorrecta (no hay botón
    // Verificar: si te equivocás, suena un error y podés reintentar).
    audioIntentarDeNuevo: "intentar_de_nuevo.mp3",
    textoIntentarDeNuevo: "No es esa. Intentá de nuevo.",
    preguntas: [
      {
        id: "trivia1",
        audio: "trivia1_pregunta.mp3",
        texto: "¿Qué le da a la planta la luz para hacer su alimento?",
        imagen: "assets/images/icono_sol.png",
        opciones: [
          { texto: "El sol", correcta: true },
          { texto: "Un juguete", correcta: false },
          { texto: "Una piedra", correcta: false }
        ],
        audioCorrecta: "trivia1_correcta.mp3",
        textoCorrecta: "¡Correcto! El sol le da la luz que la planta necesita."
      },
      {
        id: "trivia2",
        audio: "trivia2_pregunta.mp3",
        texto: "¿Qué parte de la planta está debajo de la tierra?",
        imagen: "assets/images/icono_raiz.png",
        opciones: [
          { texto: "La flor", correcta: false },
          { texto: "La raíz", correcta: true },
          { texto: "El fruto", correcta: false }
        ],
        audioCorrecta: "trivia2_correcta.mp3",
        textoCorrecta: "¡Correcto! La raíz está debajo de la tierra."
      },
      {
        id: "trivia3",
        audio: "trivia3_pregunta.mp3",
        texto: "¿De qué parte de la planta nacen los frutos?",
        imagen: "assets/images/icono_flor.png",
        opciones: [
          { texto: "De la raíz", correcta: false },
          { texto: "Del tallo", correcta: false },
          { texto: "De la flor", correcta: true }
        ],
        audioCorrecta: "trivia3_correcta.mp3",
        textoCorrecta: "¡Correcto! De la flor nacen los frutos."
      },
      {
        id: "trivia4",
        audio: "trivia4_pregunta.mp3",
        texto: "¿Qué parte transporta el agua desde la raíz hasta las hojas?",
        imagen: "assets/images/icono_tallo.png",
        opciones: [
          { texto: "El tallo", correcta: true },
          { texto: "El fruto", correcta: false },
          { texto: "La flor", correcta: false }
        ],
        audioCorrecta: "trivia4_correcta.mp3",
        textoCorrecta: "¡Correcto! El tallo transporta el agua hasta las hojas."
      }
    ]
  },

  // ------------------------------------------------------------
  // PANTALLA 9 — ACTIVIDAD NUEVA: VERDADERO O FALSO
  // ------------------------------------------------------------
  actividadVerdaderoFalso: {
    id: "act-vof",
    tipo: "verdaderoFalso",
    imagenFondo: "assets/images/vof_fondo.jpg",
    audioInstruccion: "act_vof_instruccion.mp3",
    textoInstruccion: "Escuchá cada afirmación y decidí si es verdadera o falsa.",
    afirmaciones: [
      {
        id: "vof1",
        audio: "vof1.mp3",
        texto: "El sol ayuda a la planta a hacer su alimento.",
        esVerdadero: true,
        audioConfirmacion: "vof1_conf.mp3",
        textoConfirmacion: "¡Verdadero! El sol le da la luz que la planta necesita."
      },
      {
        id: "vof2",
        audio: "vof2.mp3",
        texto: "La raíz nace de la flor.",
        esVerdadero: false,
        audioConfirmacion: "vof2_conf.mp3",
        textoConfirmacion: "¡Falso! La raíz está debajo de la tierra, no nace de la flor."
      },
      {
        id: "vof3",
        audio: "vof3.mp3",
        texto: "El fruto contiene las semillas.",
        esVerdadero: true,
        audioConfirmacion: "vof3_conf.mp3",
        textoConfirmacion: "¡Verdadero! Adentro del fruto están las semillas."
      },
      {
        id: "vof4",
        audio: "vof4.mp3",
        texto: "Las plantas no necesitan agua para vivir.",
        esVerdadero: false,
        audioConfirmacion: "vof4_conf.mp3",
        textoConfirmacion: "¡Falso! Las plantas sí necesitan agua para crecer fuertes y sanas."
      },
      {
        id: "vof5",
        audio: "vof5.mp3",
        texto: "La hoja hace el alimento de la planta.",
        esVerdadero: true,
        audioConfirmacion: "vof5_conf.mp3",
        textoConfirmacion: "¡Verdadero! La hoja hace el alimento usando la luz del sol."
      }
    ]
  },

  // ------------------------------------------------------------
  // PANTALLA 10 — CIERRE
  // ------------------------------------------------------------
  cierre: {
    id: "cierre",
    tipo: "cierre",
    imagenFondo: "assets/images/cierre_planta.jpg",
    audio: "cierre.mp3",
    texto: "¡Muy bien! Aprendiste qué necesitan las plantas para vivir y cuáles son sus partes. ¡Felicitaciones!",
    textoBotonVolver: "🔄 Volver a jugar"
  },

  // Orden de reproducción de las pantallas
  ordenPantallas: [
    "portada",
    "video",
    "explicacionNecesidades",
    "actividadClasificarNecesidades",
    "explicacionPartes",
    "actividadHotspotPartes",
    "actividadAsociarFunciones",
    "actividadTrivia",
    "actividadVerdaderoFalso",
    "cierre"
  ]
};
