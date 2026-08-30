// =====================================================
// Irrigación de Mendoza — 5to grado
// Datos de contenido — Profe Gustavo Aguilar
// v4 — audio título/consigna en rompecabezas, rompecabezas
//      de imagen, segunda sopa, mapa fijado, simulación
//      con audio secuencial, contraste y layouts corregidos
// =====================================================

var DATOS_PAQUETE = {
  titulo: "Irrigación de Mendoza",
  grado: "5to grado",

  pantallas: [

    // 1 — Portada -----------------------------------------
    {
      id: "portada",
      tipo: "portada",
      titulo: "Irrigación de Mendoza",
      subtitulo: "Cómo el agua transformó el desierto",
      imagen: "assets/img/portada.jpg",
      audio: "assets/audio/01_portada.mp3",
      audioTexto: "Irrigación de Mendoza. Cómo el agua transformó el desierto. Tocá comenzar para empezar."
    },

    // 2 — Rompecabezas: clima árido ------------------------
    {
      id: "clima-arido",
      tipo: "rompecabezas",
      titulo: "Mendoza, un clima árido",
      imagen: "assets/img/02_clima_arido.jpg",
      instruccion: "Tocá las palabras en orden para armar la oración.",
      audioTitulo: "assets/audio/r02_titulo.mp3",
      audioInstruccion: "assets/audio/rompecabezas_instruccion.mp3",
      oraciones: [
        { texto: "Mendoza tiene un clima árido, con pocas lluvias.", imagen: "assets/img/02a_clima_arido.jpg", audio: "assets/audio/02a_clima_arido.mp3" },
        { texto: "El agua es un recurso fundamental en Mendoza.", imagen: "assets/img/02b_clima_arido.jpg", audio: "assets/audio/02b_clima_arido.mp3" },
        { texto: "El agua es fundamental para vivir y producir.", imagen: "assets/img/02c_clima_arido.jpg", audio: "assets/audio/02c_clima_arido.mp3" }
      ]
    },

    // 3 — Rompecabezas: qué son los sistemas de riego -------
    {
      id: "que-son-sistemas-riego",
      tipo: "rompecabezas",
      titulo: "¿Qué son los sistemas de riego?",
      imagen: "assets/img/04_sistemas_riego.jpg",
      instruccion: "Tocá las palabras en orden para armar la oración.",
      audioTitulo: "assets/audio/r04_titulo.mp3",
      audioInstruccion: "assets/audio/rompecabezas_instruccion.mp3",
      oraciones: [
        { texto: "Los sistemas de riego llevan agua a los cultivos.", imagen: "assets/img/04a_definicion.jpg", audio: "assets/audio/04a_definicion.mp3" },
        { texto: "Ejemplos son acequias, canales, represas y diques.", imagen: "assets/img/04b_ejemplos.jpg", audio: "assets/audio/04b_ejemplos.mp3" }
      ]
    },

    // 4 — Sopa de letras 1 ------------------------------------
    {
      id: "sopa-letras",
      tipo: "sopa",
      titulo: "Sopa de letras",
      instruccion: "Tocá la primera y la última letra de cada palabra escondida.",
      audioInstruccion: "assets/audio/15_instruccion.mp3",
      filas: 8,
      columnas: 10,
      palabras: [
        { palabra: "ACEQUIA", audio: "assets/audio/15_acequia.mp3" },
        { palabra: "CANAL", audio: "assets/audio/15_canal.mp3" },
        { palabra: "DIQUE", audio: "assets/audio/15_dique.mp3" },
        { palabra: "RIEGO", audio: "assets/audio/15_riego.mp3" },
        { palabra: "OASIS", audio: "assets/audio/15_oasis.mp3" },
        { palabra: "RIO", audio: "assets/audio/15_rio.mp3" }
      ]
    },

    // 5 — Asociar: sistema de riego con su nombre ------------
    {
      id: "actividad-asociar-sistemas",
      tipo: "asociar",
      titulo: "Uní cada sistema con su nombre",
      instruccion: "Tocá cada palabra y luego la imagen que le corresponde.",
      audioInstruccion: "assets/audio/16_instruccion.mp3",
      pares: [
        { texto: "Acequia", imagen: "assets/img/20_acequia.jpg", audio: "assets/audio/16_acequia.mp3", color: "#e05252" },
        { texto: "Canal", imagen: "assets/img/20_canal.jpg", audio: "assets/audio/16_canal.mp3", color: "#2e86c1" },
        { texto: "Represa", imagen: "assets/img/20_represa.jpg", audio: "assets/audio/16_represa.mp3", color: "#f2a71b" },
        { texto: "Dique", imagen: "assets/img/20_dique.jpg", audio: "assets/audio/16_dique.mp3", color: "#4c9a4c" }
      ]
    },

    // 6 — Rompecabezas de imagen 1: acequia de mi barrio -----
    {
      id: "rompecabezas-imagen-acequia",
      tipo: "rompecabezas-imagen",
      titulo: "Armá el rompecabezas: la acequia de mi barrio",
      instruccion: "Tocá dos piezas para intercambiarlas y armar la imagen.",
      audioTitulo: "assets/audio/imgpuzzle1_titulo.mp3",
      audioInstruccion: "assets/audio/imgpuzzle_instruccion.mp3",
      imagen: "assets/img/rompecabezas/rompecabezas-1-acequia-barrio.jpg",
      piezas: 3,
      textoFinal: "Las acequias de nuestros barrios siguen llevando agua desde los ríos hasta cada cuadra, regando los árboles que dan sombra en las calles de Mendoza.",
      audioFinal: "assets/audio/imgpuzzle1_final.mp3"
    },

    // 7 — Rompecabezas: acequias mendocinas ------------------
    {
      id: "acequias-mendocinas",
      tipo: "rompecabezas",
      titulo: "Las acequias mendocinas",
      imagen: "assets/img/09_acequias_mendocinas.jpg",
      instruccion: "Tocá las palabras en orden para armar la oración.",
      audioTitulo: "assets/audio/r09_titulo.mp3",
      audioInstruccion: "assets/audio/rompecabezas_instruccion.mp3",
      oraciones: [
        { texto: "Las acequias vienen de los pueblos originarios.", imagen: "assets/img/09a_pueblos_originarios.jpg", audio: "assets/audio/09a_pueblos_originarios.mp3" },
        { texto: "Ellos aprovechaban los cursos de agua natural.", imagen: "assets/img/09b_pueblos_originarios.jpg", audio: "assets/audio/09b_pueblos_originarios.mp3" }
      ]
    },

    // 8 — Rompecabezas: avances siglo XIX --------------------
    {
      id: "avances-siglo-xix",
      tipo: "rompecabezas",
      titulo: "Avances tecnológicos en el siglo XIX",
      imagen: "assets/img/10_avances_xix.jpg",
      instruccion: "Tocá las palabras en orden para armar la oración.",
      audioTitulo: "assets/audio/r10_titulo.mp3",
      audioInstruccion: "assets/audio/rompecabezas_instruccion.mp3",
      oraciones: [
        { texto: "En el siglo diecinueve hubo grandes avances.", imagen: "assets/img/10a_avances_xix.jpg", audio: "assets/audio/10a_avances_xix.mp3" },
        { texto: "Se mejoró mucho el uso del agua.", imagen: "assets/img/10b_avances_xix.jpg", audio: "assets/audio/10b_avances_xix.mp3" }
      ]
    },

    // 9 — Asociar: cultivos ----------------------------------
    {
      id: "actividad-asociar-cultivos",
      tipo: "asociar",
      titulo: "Uní cada cultivo con su imagen",
      instruccion: "Tocá cada palabra y luego la imagen que le corresponde.",
      audioInstruccion: "assets/audio/17_instruccion.mp3",
      pares: [
        { texto: "Viñedos", imagen: "assets/img/15_vinedos.jpg", audio: "assets/audio/17_vinedos.mp3", color: "#8e44ad" },
        { texto: "Frutales", imagen: "assets/img/16_frutales.jpg", audio: "assets/audio/17_frutales.mp3", color: "#e67e22" },
        { texto: "Hortalizas", imagen: "assets/img/17_hortalizas.jpg", audio: "assets/audio/17_hortalizas.mp3", color: "#27ae60" }
      ]
    },

    // 10 — Categorizar: antes y después -----------------------
    {
      id: "actividad-antes-despues",
      tipo: "categorizar",
      titulo: "Antes y después del riego",
      instruccion: "Tocá cada frase y luego el momento al que corresponde.",
      audioInstruccion: "assets/audio/18_instruccion.mp3",
      columnas: [
        { nombre: "Antes", imagen: "assets/img/18_antes.jpg" },
        { nombre: "Después", imagen: "assets/img/19_despues.jpg" }
      ],
      items: [
        { texto: "Pocas zonas cultivadas", columna: "Antes", audio: "assets/audio/18_antes1.mp3" },
        { texto: "Dependencia de las lluvias", columna: "Antes", audio: "assets/audio/18_antes2.mp3" },
        { texto: "Mayor producción agrícola", columna: "Después", audio: "assets/audio/18_despues1.mp3" },
        { texto: "Crecimiento de pueblos y ciudades", columna: "Después", audio: "assets/audio/18_despues2.mp3" },
        { texto: "Nuevas actividades económicas", columna: "Después", audio: "assets/audio/18_despues3.mp3" }
      ]
    },

    // 11 — Rompecabezas: territorios irrigados ---------------
    {
      id: "territorios-irrigados",
      tipo: "rompecabezas",
      titulo: "Territorios irrigados",
      imagen: "assets/img/14_territorios_irrigados.jpg",
      instruccion: "Tocá las palabras en orden para armar la oración.",
      audioTitulo: "assets/audio/r14_titulo.mp3",
      audioInstruccion: "assets/audio/rompecabezas_instruccion.mp3",
      oraciones: [
        { texto: "Un territorio irrigado recibe agua artificialmente.", imagen: "assets/img/14a_territorios_irrigados.jpg", audio: "assets/audio/14a_territorios_irrigados.mp3" },
        { texto: "Allí es posible la producción agrícola.", imagen: "assets/img/14b_desarrollo.jpg", audio: "assets/audio/14b_desarrollo.mp3" }
      ]
    },

    // 12 — Asociar: ríos y oasis ------------------------------
    {
      id: "actividad-asociar-rios-oasis",
      tipo: "asociar",
      titulo: "Uní cada río con su oasis",
      instruccion: "Mirá el mapa y tocá cada río y luego el oasis que riega.",
      audioInstruccion: "assets/audio/19_instruccion.mp3",
      imagenContexto: "assets/img/mapa-oasis.jpg",
      pares: [
        { texto: "Río Mendoza", textoDerecha: "Oasis Norte", audio: "assets/audio/19_norte.mp3", color: "#2e86c1" },
        { texto: "Río Tunuyán", textoDerecha: "Valle de Uco", audio: "assets/audio/19_uco.mp3", color: "#4c9a4c" },
        { texto: "Río Diamante y Atuel", textoDerecha: "Oasis Sur", audio: "assets/audio/19_sur.mp3", color: "#e67e22" }
      ]
    },

    // 13 — Rompecabezas de imagen 2: canal del oasis ---------
    {
      id: "rompecabezas-imagen-canal",
      tipo: "rompecabezas-imagen",
      titulo: "Armá el rompecabezas: el canal del oasis",
      instruccion: "Tocá dos piezas para intercambiarlas y armar la imagen.",
      audioTitulo: "assets/audio/imgpuzzle2_titulo.mp3",
      audioInstruccion: "assets/audio/imgpuzzle_instruccion.mp3",
      imagen: "assets/img/rompecabezas/rompecabezas-2-canal-oasis.jpg",
      piezas: 3,
      textoFinal: "Los canales de riego transforman la tierra seca en viñedos y cultivos productivos, llevando el agua de la montaña hasta cada oasis.",
      audioFinal: "assets/audio/imgpuzzle2_final.mp3"
    },

    // 14 — Sopa de letras 2 ------------------------------------
    {
      id: "sopa-letras-2",
      tipo: "sopa",
      titulo: "Sopa de letras 2",
      instruccion: "Tocá la primera y la última letra de cada palabra escondida.",
      audioInstruccion: "assets/audio/15_instruccion.mp3",
      filas: 9,
      columnas: 12,
      palabras: [
        { palabra: "HUARPES", audio: "assets/audio/sopa2_huarpes.mp3" },
        { palabra: "COMPUERTA", audio: "assets/audio/sopa2_compuerta.mp3" },
        { palabra: "MENDOZA", audio: "assets/audio/sopa2_mendoza.mp3" },
        { palabra: "DIAMANTE", audio: "assets/audio/sopa2_diamante.mp3" },
        { palabra: "CULTIVO", audio: "assets/audio/sopa2_cultivo.mp3" },
        { palabra: "ARIDO", audio: "assets/audio/sopa2_arido.mp3" }
      ]
    },

    // 15 — SIMULACIÓN escena 1: acequia urbana ----------------
    {
      id: "simulacion-acequia-urbana",
      tipo: "simulacion",
      titulo: "El recorrido del agua: la acequia de mi barrio",
      instruccion: "Predecí y después abrí la compuerta para comprobar.",
      imagenFondo: "assets/img/simulacion/urbana.jpg",
      viewBox: "0 0 1024 572",
      audioIntro: "assets/audio/simu1_intro.mp3",
      audioFinal: "assets/audio/simu1_final.mp3",
      textoIntro: "Mirá esta acequia de nuestro barrio. Vamos a ver cómo el agua llega a los árboles.",
      textoFinal: "Así funcionan las acequias que todavía hoy riegan las calles arboladas de Mendoza.",
      prediccion: {
        pregunta: "¿Qué árbol de la vereda recibirá agua primero?",
        audio: "assets/audio/simu1_prediccion.mp3",
        opciones: ["Árbol 1", "Árbol 2", "Árbol 3", "Árbol 4"],
        correcta: "Árbol 1"
      },
      compuerta: { x: 190, y: 430 },
      path: "M190,435 L300,415 L400,400 L500,378 L600,363 L670,356 L730,347 L790,340 L850,332 L900,328",
      nodos: [
        { nombre: "Árbol 1", cx: 400, cy: 400, audio: "assets/audio/simu1_arbol1.mp3", textoAudio: "El árbol uno recibió agua." },
        { nombre: "Árbol 2", cx: 670, cy: 356, audio: "assets/audio/simu1_arbol2.mp3", textoAudio: "El árbol dos recibió agua." },
        { nombre: "Árbol 3", cx: 790, cy: 340, audio: "assets/audio/simu1_arbol3.mp3", textoAudio: "El árbol tres recibió agua." },
        { nombre: "Árbol 4", cx: 900, cy: 328, audio: "assets/audio/simu1_arbol4.mp3", textoAudio: "El árbol cuatro recibió agua." }
      ]
    },

    // 16 — SIMULACIÓN escena 2: canal rural / oasis -----------
    {
      id: "simulacion-canal-rural",
      tipo: "simulacion",
      titulo: "El recorrido del agua: el canal del oasis",
      instruccion: "Predecí y después abrí la compuerta para comprobar.",
      escenario: "rural",
      imagenFondo: "assets/img/simulacion/rural.jpg",
      viewBox: "0 0 1024 559",
      audioIntro: "assets/audio/simu2_intro.mp3",
      audioFinal: "assets/audio/simu2_final.mp3",
      textoIntro: "Ahora miremos un canal de riego en el campo mendocino.",
      textoFinal: "Así el agua del canal transforma la tierra árida en un oasis productivo.",
      prediccion: {
        pregunta: "¿Qué hilera de plantas recibirá agua primero?",
        audio: "assets/audio/simu2_prediccion.mp3",
        opciones: ["Hilera 1", "Hilera 2", "Hilera 3"],
        correcta: "Hilera 1"
      },
      compuerta: { x: 90, y: 250 },
      path: "M90,255 L200,330 L330,375 L430,405 L520,430 L600,450 L710,472 L800,490 L850,498",
      nodos: [
        { nombre: "Hilera 1", cx: 330, cy: 375, ramalX: 383, ramalY: 321, audio: "assets/audio/simu2_hilera1.mp3", textoAudio: "La hilera uno recibió agua." },
        { nombre: "Hilera 2", cx: 520, cy: 430, ramalX: 516, ramalY: 360, audio: "assets/audio/simu2_hilera2.mp3", textoAudio: "La hilera dos recibió agua." },
        { nombre: "Hilera 3", cx: 710, cy: 472, ramalX: 649, ramalY: 389, audio: "assets/audio/simu2_hilera3.mp3", textoAudio: "La hilera tres recibió agua." }
      ]
    },

    // 17 — Rompecabezas de imagen 3: dique y montaña ---------
    {
      id: "rompecabezas-imagen-dique",
      tipo: "rompecabezas-imagen",
      titulo: "Armá el rompecabezas: el dique en la montaña",
      instruccion: "Tocá dos piezas para intercambiarlas y armar la imagen.",
      audioTitulo: "assets/audio/imgpuzzle3_titulo.mp3",
      audioInstruccion: "assets/audio/imgpuzzle_instruccion.mp3",
      imagen: "assets/img/rompecabezas/rompecabezas-3-dique-montana.jpg",
      piezas: 3,
      textoFinal: "Los diques retienen el agua de deshielo en la montaña y la liberan de a poco, asegurando que llegue agua durante todo el año a los oasis irrigados.",
      audioFinal: "assets/audio/imgpuzzle3_final.mp3"
    },

    // 18 — Opciones: ¿cuál no es sistema de riego? ------------
    {
      id: "actividad-opciones-tipos-riego",
      tipo: "opciones",
      titulo: "¿Cuál no es un sistema de riego?",
      instruccion: "Elegí la opción que no corresponde a un sistema de riego.",
      audioInstruccion: "assets/audio/20_instruccion.mp3",
      imagen: "assets/img/22_opciones.jpg",
      opciones: ["Acequia", "Canal", "Nube", "Represa"],
      correcta: "Nube",
      justificacion: "La nube no es un sistema de riego: es parte del ciclo del agua, no una construcción humana.",
      audioJustificacion: "assets/audio/20_justificacion.mp3"
    },

    // 19 — Mapa: oasis drag & drop -----------------------------
    {
      id: "actividad-mapa-oasis",
      tipo: "mapa",
      titulo: "Los oasis irrigados de Mendoza",
      instruccion: "Arrastrá cada nombre hasta el círculo del oasis que le corresponde.",
      audioInstruccion: "assets/audio/21_instruccion.mp3",
      imagen: "assets/img/mapa-oasis.jpg",
      zonas: [
        { nombre: "Oasis Norte", x: 400, y: 130, radio: 75, audio: "assets/audio/21_norte.mp3", textoAudio: "Este es el Oasis Norte, regado por el Río Mendoza." },
        { nombre: "Valle de Uco", x: 415, y: 270, radio: 65, audio: "assets/audio/21_uco.mp3", textoAudio: "Este es el Valle de Uco, regado por el Río Tunuyán." },
        { nombre: "Oasis Sur", x: 390, y: 400, radio: 80, audio: "assets/audio/21_sur.mp3", textoAudio: "Este es el Oasis Sur, regado por los ríos Diamante y Atuel." }
      ]
    },

    // 20 — Pregunta a) ------------------------------------------
    {
      id: "pregunta-a",
      tipo: "opciones",
      titulo: "a) ¿Por qué Mendoza necesita sistemas de riego?",
      instruccion: "Elegí la respuesta correcta.",
      audioInstruccion: "assets/audio/22_instruccion.mp3",
      imagen: "assets/img/24_pregunta_a.jpg",
      opciones: [
        "Porque tiene clima árido y pocas lluvias",
        "Porque está cerca del mar",
        "Porque llueve todos los días",
        "Porque no hay ríos en la provincia"
      ],
      correcta: "Porque tiene clima árido y pocas lluvias",
      justificacion: "Mendoza recibe muy pocas lluvias durante el año, por eso necesita construir sistemas de riego para poder cultivar.",
      audioJustificacion: "assets/audio/22_justificacion.mp3"
    },

    // 21 — Pregunta b) --------------------------------------------
    {
      id: "pregunta-b",
      tipo: "seleccion-multiple",
      titulo: "b) Nombrá tres formas de transportar agua",
      instruccion: "Tocá las tres opciones correctas.",
      audioInstruccion: "assets/audio/23_instruccion.mp3",
      imagen: "assets/img/25_pregunta_b.jpg",
      opciones: ["Acequias", "Canales", "Represas", "Nubes", "Diques", "Semáforos"],
      correctas: ["Acequias", "Canales", "Diques"],
      cantidadRequerida: 3,
      justificacion: "Acequias, canales y diques son construcciones que transportan y distribuyen el agua hacia los cultivos.",
      audioJustificacion: "assets/audio/23_justificacion.mp3"
    },

    // 22 — Pregunta c) --------------------------------------------
    {
      id: "pregunta-c",
      tipo: "asociar",
      titulo: "c) ¿Qué productos agrícolas se producen gracias al riego?",
      instruccion: "Uní cada producto con su imagen.",
      audioInstruccion: "assets/audio/24_instruccion.mp3",
      pares: [
        { texto: "Uvas (viñedos)", imagen: "assets/img/26_uvas.jpg", audio: "assets/audio/24_uvas.mp3", color: "#8e44ad" },
        { texto: "Duraznos (frutales)", imagen: "assets/img/26_duraznos.jpg", audio: "assets/audio/24_duraznos.mp3", color: "#e67e22" },
        { texto: "Tomates (hortalizas)", imagen: "assets/img/26_tomates.jpg", audio: "assets/audio/24_tomates.mp3", color: "#c0392b" }
      ]
    },

    // 23 — Rompecabezas: investigar ---------------------------------
    {
      id: "investigar",
      tipo: "rompecabezas",
      titulo: "Para investigar",
      imagen: "assets/img/27_investigar.jpg",
      instruccion: "Tocá las palabras en orden para armar la oración.",
      audioTitulo: "assets/audio/r25_titulo.mp3",
      audioInstruccion: "assets/audio/rompecabezas_instruccion.mp3",
      oraciones: [
        { texto: "Mendoza es una gran provincia productora de vino.", imagen: "assets/img/25a_investigar.jpg", audio: "assets/audio/25a_investigar.mp3" },
        { texto: "También produce frutas, hortalizas y aceite de oliva.", imagen: "assets/img/25b_investigar.jpg", audio: "assets/audio/25b_investigar.mp3" }
      ]
    },

    // 24 — Cierre -----------------------------------------------------
    {
      id: "cierre",
      tipo: "cierre",
      titulo: "¡Actividad completada!",
      audio: "assets/audio/26_cierre.mp3",
      audioTexto: "¡Muy bien! Completaste la actividad sobre irrigación de Mendoza."
    }
  ]
};
