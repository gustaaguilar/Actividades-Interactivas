// ============================================================
// ESCUCHAR, ESCRIBIR Y PINTAR - Primer ciclo, Alfabetización inicial
// (pensado para usarse tanto con adultos como con chicos)
// Contextualizado en Lavalle (melón, uva, tomate, cosecha, parral)
// datos.js - Contenido de todas las pantallas
//
// v3 — ajustes pedidos después de la segunda revisión completa:
//  - "Costa de Araujo" pasó a "Lavalle" en todo el paquete, para que
//    sirva para todo el departamento y no solo un distrito.
//  - Dictado: ahora cada oración muestra una imagen recién al
//    terminar de armarla y escucharla completa (antes no llevaba
//    imagen a propósito; sigue sin ninguna pista ANTES de terminar).
//  - El recordatorio "la primera palabra va con mayúscula y la
//    última tiene el punto final" ahora se escucha SOLO en la
//    primera pantalla de cada grupo que arma oraciones (dictado,
//    pintar, ordenar), no en todas, para que no sea repetitivo.
//  - Billetes: el texto que se lee en voz alta dice "pesos" en
//    palabras (nunca "$"), para que gTTS no lo lea como "dólares".
//    Se agregó audio para el contexto ("En la feria de Lavalle...")
//    y el monto a armar.
//  - Sopas de letras: se intercala cada una justo después de su
//    bloque relacionado (ya no van todas juntas al final), tienen
//    audio de título propio, y cada palabra tiene también un audio
//    con su definición (además del audio de la palabra sola).
//  - Concordancia: los recuadros del predicado ahora llevan el
//    punto final por escrito.
// ============================================================

var DATOS = {

  titulo: "Escuchar, escribir y pintar",
  subtitulo: "Dictado, colores y billetes — Lavalle",
  nivel: "Primer ciclo · Alfabetización inicial",

  meta: {
    foto: "assets/img/profe.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    // Sonidos de acierto/error (tonos generados, no son locución —
    // por eso no están en manifest_audio.json / no se generan con gTTS).
    audioCorrecto: "assets/audio/acierto.mp3",
    audioError: "assets/audio/error.mp3",
    // Se escucha apenas aparece la paleta de colores en "armá la oración
    // y pintá", justo después del audio de la oración completa.
    audioPaleta: "assets/audio/pintar_paleta.mp3"
  },

  pantallas: [

    // ---------- 0. PORTADA ----------
    {
      id: 1,
      tipo: "portada",
      imagen: "assets/img/portada.jpg",
      titulo: "Escuchar, escribir y pintar",
      subtitulo: "Dictado, colores y billetes — Lavalle"
    },

    // ============================================================
    // BLOQUE A — ARMAR LA ORACIÓN AL DICTADO (palabras mezcladas,
    // sin pista de audio previa; cada acierto lee la oración tal
    // como va quedando, cada vez más larga). Al completarla y
    // escuchar la oración entera, aparece una imagen que la
    // representa y se habilita "Siguiente".
    // ============================================================

    {
      id: 2,
      tipo: "dictado",
      titulo: "Escribí escuchando: las monedas",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. A medida que acertés, vas a escuchar cómo se va leyendo cada vez más larga, hasta escuchar la oración completa. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/dictado_instr_intro.mp3",
      items: [
        { texto: "Las", audio: "assets/audio/d01_w1.mp3" },
        { texto: "monedas", audio: "assets/audio/d01_w2.mp3" },
        { texto: "son", audio: "assets/audio/d01_w3.mp3" },
        { texto: "redondas.", audio: "assets/audio/d01_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d01_w1.mp3",
        "assets/audio/d01_acum2.mp3",
        "assets/audio/d01_acum3.mp3",
        "assets/audio/d01_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d01_oracion.mp3",
      imagen: "assets/img/dic_monedas.jpg"
    },

    {
      id: 3,
      tipo: "dictado",
      titulo: "Escribí escuchando: los pomos",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/dictado_instr_repeat.mp3",
      items: [
        { texto: "Los", audio: "assets/audio/d02_w1.mp3" },
        { texto: "pomos", audio: "assets/audio/d02_w2.mp3" },
        { texto: "son", audio: "assets/audio/d02_w3.mp3" },
        { texto: "largos.", audio: "assets/audio/d02_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d02_w1.mp3",
        "assets/audio/d02_acum2.mp3",
        "assets/audio/d02_acum3.mp3",
        "assets/audio/d02_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d02_oracion.mp3",
      imagen: "assets/img/dic_pomos.jpg"
    },

    {
      id: 4,
      tipo: "dictado",
      titulo: "Escribí escuchando: la masa",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/dictado_instr_repeat.mp3",
      items: [
        { texto: "La", audio: "assets/audio/d03_w1.mp3" },
        { texto: "masa", audio: "assets/audio/d03_w2.mp3" },
        { texto: "es", audio: "assets/audio/d03_w3.mp3" },
        { texto: "blanca.", audio: "assets/audio/d03_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d03_w1.mp3",
        "assets/audio/d03_acum2.mp3",
        "assets/audio/d03_acum3.mp3",
        "assets/audio/d03_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d03_oracion.mp3",
      imagen: "assets/img/dic_masa.jpg"
    },

    {
      id: 5,
      tipo: "dictado",
      titulo: "Escribí escuchando: el palo",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/dictado_instr_repeat.mp3",
      items: [
        { texto: "El", audio: "assets/audio/d04_w1.mp3" },
        { texto: "palo", audio: "assets/audio/d04_w2.mp3" },
        { texto: "es", audio: "assets/audio/d04_w3.mp3" },
        { texto: "duro.", audio: "assets/audio/d04_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d04_w1.mp3",
        "assets/audio/d04_acum2.mp3",
        "assets/audio/d04_acum3.mp3",
        "assets/audio/d04_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d04_oracion.mp3",
      imagen: "assets/img/dic_palo.jpg"
    },

    {
      id: 6,
      tipo: "dictado",
      titulo: "Escribí escuchando: la foca",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/dictado_instr_repeat.mp3",
      items: [
        { texto: "La", audio: "assets/audio/d05_w1.mp3" },
        { texto: "foca", audio: "assets/audio/d05_w2.mp3" },
        { texto: "es", audio: "assets/audio/d05_w3.mp3" },
        { texto: "negra.", audio: "assets/audio/d05_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d05_w1.mp3",
        "assets/audio/d05_acum2.mp3",
        "assets/audio/d05_acum3.mp3",
        "assets/audio/d05_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d05_oracion.mp3",
      imagen: "assets/img/dic_foca.jpg"
    },

    {
      id: 7,
      tipo: "dictado",
      titulo: "Escribí escuchando: los fideos",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/dictado_instr_repeat.mp3",
      items: [
        { texto: "Los", audio: "assets/audio/d06_w1.mp3" },
        { texto: "fideos", audio: "assets/audio/d06_w2.mp3" },
        { texto: "son", audio: "assets/audio/d06_w3.mp3" },
        { texto: "largos.", audio: "assets/audio/d06_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d06_w1.mp3",
        "assets/audio/d06_acum2.mp3",
        "assets/audio/d06_acum3.mp3",
        "assets/audio/d06_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d06_oracion.mp3",
      imagen: "assets/img/dic_fideos.jpg"
    },

    {
      id: 8,
      tipo: "dictado",
      titulo: "Escribí escuchando: el foco",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/dictado_instr_repeat.mp3",
      items: [
        { texto: "El", audio: "assets/audio/d07_w1.mp3" },
        { texto: "foco", audio: "assets/audio/d07_w2.mp3" },
        { texto: "es", audio: "assets/audio/d07_w3.mp3" },
        { texto: "amarillo.", audio: "assets/audio/d07_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d07_w1.mp3",
        "assets/audio/d07_acum2.mp3",
        "assets/audio/d07_acum3.mp3",
        "assets/audio/d07_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d07_oracion.mp3",
      imagen: "assets/img/dic_foco.jpg"
    },

    {
      id: 9,
      tipo: "dictado",
      titulo: "Escribí escuchando: la falda",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/dictado_instr_repeat.mp3",
      items: [
        { texto: "La", audio: "assets/audio/d08_w1.mp3" },
        { texto: "falda", audio: "assets/audio/d08_w2.mp3" },
        { texto: "es", audio: "assets/audio/d08_w3.mp3" },
        { texto: "celeste.", audio: "assets/audio/d08_w4.mp3" }
      ],
      audiosLinea: [
        "assets/audio/d08_w1.mp3",
        "assets/audio/d08_acum2.mp3",
        "assets/audio/d08_acum3.mp3",
        "assets/audio/d08_oracion.mp3"
      ],
      oracionAudio: "assets/audio/d08_oracion.mp3",
      imagen: "assets/img/dic_falda.jpg"
    },

    // ---------- Sopa de letras del bloque de dictado (intercalada
    // justo después, en vez de ir todas juntas al final) ----------
    {
      id: 10,
      tipo: "sopa",
      titulo: "Sopa de letras: palabras del dictado",
      consigna: "Encontrá las palabras escondidas en la sopa de letras. Tocá la primera letra de la palabra y después la última.",
      audio: "assets/audio/sopa_instr.mp3",
      audioTitulo: "assets/audio/sopa3_titulo.mp3",
      tituloAudioTexto: "Sopa de letras de palabras del dictado.",
      // "audioDef" de cada palabra reutiliza el audio de la oración
      // completa de su pantalla de dictado (d0X_oracion.mp3, ya
      // grabado) en vez de una definición tipo adivinanza — así, al
      // encontrar la palabra en la sopa, se escucha la misma oración
      // que se armó en el dictado.
      palabras: [
        { palabra: "monedas", definicion: "Las monedas son redondas.", audio: "assets/audio/d01_w2.mp3", audioDef: "assets/audio/d01_oracion.mp3" },
        { palabra: "pomos", definicion: "Los pomos son largos.", audio: "assets/audio/d02_w2.mp3", audioDef: "assets/audio/d02_oracion.mp3" },
        { palabra: "masa", definicion: "La masa es blanca.", audio: "assets/audio/d03_w2.mp3", audioDef: "assets/audio/d03_oracion.mp3" },
        { palabra: "palo", definicion: "El palo es duro.", audio: "assets/audio/d04_w2.mp3", audioDef: "assets/audio/d04_oracion.mp3" },
        { palabra: "foca", definicion: "La foca es negra.", audio: "assets/audio/d05_w2.mp3", audioDef: "assets/audio/d05_oracion.mp3" },
        { palabra: "foco", definicion: "El foco es amarillo.", audio: "assets/audio/d07_w2.mp3", audioDef: "assets/audio/d07_oracion.mp3" }
      ]
    },

    // ============================================================
    // BLOQUE B — ARMAR LA ORACIÓN Y PINTAR DEL COLOR CORRECTO
    // (1° se arma la oración con audio acumulado, igual que dictado;
    // recién al completarla se habilita, como premio, la paleta de
    // colores, ubicada al costado de la oración para aprovechar el
    // espacio y evitar el scroll vertical)
    // ============================================================

    {
      id: 11,
      tipo: "pintar",
      titulo: "Armá la oración y pintá: el pomelo",
      consigna: "Armá la oración tocando las palabras en el orden correcto. Cuando esté completa, vas a poder elegir el color correcto para pintar el dibujo. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/pintar_instr_intro.mp3",
      oracionTexto: "El pomelo es amarillo.",
      items: [
        { texto: "El", audio: "assets/audio/pi01_acum1.mp3" },
        { texto: "pomelo", audio: "assets/audio/pi01_acum2.mp3" },
        { texto: "es", audio: "assets/audio/pi01_acum3.mp3" },
        { texto: "amarillo.", audio: "assets/audio/pi01_oracion.mp3" }
      ],
      audiosLinea: [
        "assets/audio/pi01_acum1.mp3",
        "assets/audio/pi01_acum2.mp3",
        "assets/audio/pi01_acum3.mp3",
        "assets/audio/pi01_oracion.mp3"
      ],
      oracionAudio: "assets/audio/pi01_oracion.mp3",
      imagenContorno: "assets/img/fruta_pomelo_contorno.jpg",
      imagenColor: "assets/img/fruta_pomelo_color.jpg",
      opciones: [
        { nombre: "amarillo", hex: "#f3d33f", correcta: true, audio: "assets/audio/color_amarillo.mp3" },
        { nombre: "verde", hex: "#5cb85c", correcta: false, audio: "assets/audio/color_verde.mp3" },
        { nombre: "morado", hex: "#8e5fb0", correcta: false, audio: "assets/audio/color_morado.mp3" }
      ]
    },

    {
      id: 12,
      tipo: "pintar",
      titulo: "Armá la oración y pintá: la uva",
      consigna: "Armá la oración tocando las palabras en el orden correcto. Cuando esté completa, vas a poder elegir el color correcto para pintar el dibujo.",
      audio: "assets/audio/pintar_instr.mp3",
      oracionTexto: "La uva es morada.",
      items: [
        { texto: "La", audio: "assets/audio/pi02_acum1.mp3" },
        { texto: "uva", audio: "assets/audio/pi02_acum2.mp3" },
        { texto: "es", audio: "assets/audio/pi02_acum3.mp3" },
        { texto: "morada.", audio: "assets/audio/pi02_oracion.mp3" }
      ],
      audiosLinea: [
        "assets/audio/pi02_acum1.mp3",
        "assets/audio/pi02_acum2.mp3",
        "assets/audio/pi02_acum3.mp3",
        "assets/audio/pi02_oracion.mp3"
      ],
      oracionAudio: "assets/audio/pi02_oracion.mp3",
      imagenContorno: "assets/img/fruta_uva_contorno.jpg",
      imagenColor: "assets/img/fruta_uva_color.jpg",
      opciones: [
        { nombre: "morado", hex: "#8e5fb0", correcta: true, audio: "assets/audio/color_morado.mp3" },
        { nombre: "rojo", hex: "#c0392b", correcta: false, audio: "assets/audio/color_rojo.mp3" },
        { nombre: "amarillo", hex: "#f3d33f", correcta: false, audio: "assets/audio/color_amarillo.mp3" }
      ]
    },

    {
      id: 13,
      tipo: "pintar",
      titulo: "Armá la oración y pintá: el melón",
      consigna: "Armá la oración tocando las palabras en el orden correcto. Cuando esté completa, vas a poder elegir el color correcto para pintar el dibujo.",
      audio: "assets/audio/pintar_instr.mp3",
      oracionTexto: "El melón es verde.",
      items: [
        { texto: "El", audio: "assets/audio/pi03_acum1.mp3" },
        { texto: "melón", audio: "assets/audio/pi03_acum2.mp3" },
        { texto: "es", audio: "assets/audio/pi03_acum3.mp3" },
        { texto: "verde.", audio: "assets/audio/pi03_oracion.mp3" }
      ],
      audiosLinea: [
        "assets/audio/pi03_acum1.mp3",
        "assets/audio/pi03_acum2.mp3",
        "assets/audio/pi03_acum3.mp3",
        "assets/audio/pi03_oracion.mp3"
      ],
      oracionAudio: "assets/audio/pi03_oracion.mp3",
      imagenContorno: "assets/img/fruta_melon_contorno.jpg",
      imagenColor: "assets/img/fruta_melon_color.jpg",
      opciones: [
        { nombre: "verde", hex: "#5cb85c", correcta: true, audio: "assets/audio/color_verde.mp3" },
        { nombre: "celeste", hex: "#5bc0de", correcta: false, audio: "assets/audio/color_celeste.mp3" },
        { nombre: "rojo", hex: "#c0392b", correcta: false, audio: "assets/audio/color_rojo.mp3" }
      ]
    },

    {
      id: 14,
      tipo: "pintar",
      titulo: "Armá la oración y pintá: la naranja",
      consigna: "Armá la oración tocando las palabras en el orden correcto. Cuando esté completa, vas a poder elegir el color correcto para pintar el dibujo.",
      audio: "assets/audio/pintar_instr.mp3",
      oracionTexto: "La naranja es anaranjada.",
      items: [
        { texto: "La", audio: "assets/audio/pi04_acum1.mp3" },
        { texto: "naranja", audio: "assets/audio/pi04_acum2.mp3" },
        { texto: "es", audio: "assets/audio/pi04_acum3.mp3" },
        { texto: "anaranjada.", audio: "assets/audio/pi04_oracion.mp3" }
      ],
      audiosLinea: [
        "assets/audio/pi04_acum1.mp3",
        "assets/audio/pi04_acum2.mp3",
        "assets/audio/pi04_acum3.mp3",
        "assets/audio/pi04_oracion.mp3"
      ],
      oracionAudio: "assets/audio/pi04_oracion.mp3",
      imagenContorno: "assets/img/fruta_naranja_contorno.jpg",
      imagenColor: "assets/img/fruta_naranja_color.jpg",
      opciones: [
        { nombre: "anaranjado", hex: "#e8792e", correcta: true, audio: "assets/audio/color_anaranjado.mp3" },
        { nombre: "morado", hex: "#8e5fb0", correcta: false, audio: "assets/audio/color_morado.mp3" },
        { nombre: "verde", hex: "#5cb85c", correcta: false, audio: "assets/audio/color_verde.mp3" }
      ]
    },

    {
      id: 15,
      tipo: "pintar",
      titulo: "Armá la oración y pintá: el tomate",
      consigna: "Armá la oración tocando las palabras en el orden correcto. Cuando esté completa, vas a poder elegir el color correcto para pintar el dibujo.",
      audio: "assets/audio/pintar_instr.mp3",
      oracionTexto: "El tomate es rojo.",
      items: [
        { texto: "El", audio: "assets/audio/pi05_acum1.mp3" },
        { texto: "tomate", audio: "assets/audio/pi05_acum2.mp3" },
        { texto: "es", audio: "assets/audio/pi05_acum3.mp3" },
        { texto: "rojo.", audio: "assets/audio/pi05_oracion.mp3" }
      ],
      audiosLinea: [
        "assets/audio/pi05_acum1.mp3",
        "assets/audio/pi05_acum2.mp3",
        "assets/audio/pi05_acum3.mp3",
        "assets/audio/pi05_oracion.mp3"
      ],
      oracionAudio: "assets/audio/pi05_oracion.mp3",
      imagenContorno: "assets/img/fruta_tomate_contorno.jpg",
      imagenColor: "assets/img/fruta_tomate_color.jpg",
      opciones: [
        { nombre: "rojo", hex: "#c0392b", correcta: true, audio: "assets/audio/color_rojo.mp3" },
        { nombre: "amarillo", hex: "#f3d33f", correcta: false, audio: "assets/audio/color_amarillo.mp3" },
        { nombre: "celeste", hex: "#5bc0de", correcta: false, audio: "assets/audio/color_celeste.mp3" }
      ]
    },

    {
      id: 16,
      tipo: "pintar",
      titulo: "Armá la oración y pintá: el parral",
      consigna: "Armá la oración tocando las palabras en el orden correcto. Cuando esté completa, vas a poder elegir el color correcto para pintar el dibujo.",
      audio: "assets/audio/pintar_instr.mp3",
      oracionTexto: "El parral es verde.",
      items: [
        { texto: "El", audio: "assets/audio/pi06_acum1.mp3" },
        { texto: "parral", audio: "assets/audio/pi06_acum2.mp3" },
        { texto: "es", audio: "assets/audio/pi06_acum3.mp3" },
        { texto: "verde.", audio: "assets/audio/pi06_oracion.mp3" }
      ],
      audiosLinea: [
        "assets/audio/pi06_acum1.mp3",
        "assets/audio/pi06_acum2.mp3",
        "assets/audio/pi06_acum3.mp3",
        "assets/audio/pi06_oracion.mp3"
      ],
      oracionAudio: "assets/audio/pi06_oracion.mp3",
      imagenContorno: "assets/img/parral_contorno.jpg",
      imagenColor: "assets/img/parral_color.jpg",
      opciones: [
        { nombre: "verde", hex: "#5cb85c", correcta: true, audio: "assets/audio/color_verde.mp3" },
        { nombre: "morado", hex: "#8e5fb0", correcta: false, audio: "assets/audio/color_morado.mp3" },
        { nombre: "anaranjado", hex: "#e8792e", correcta: false, audio: "assets/audio/color_anaranjado.mp3" }
      ]
    },

    // ---------- Sopa de letras del bloque de pintar (colores) ----------
    {
      id: 17,
      tipo: "sopa",
      titulo: "Sopa de letras: colores",
      consigna: "Encontrá las palabras escondidas en la sopa de letras. Tocá la primera letra de la palabra y después la última.",
      audio: "assets/audio/sopa_instr.mp3",
      audioTitulo: "assets/audio/sopa2_titulo.mp3",
      tituloAudioTexto: "Sopa de letras de colores.",
      palabras: [
        { palabra: "amarillo", definicion: "El pomelo es amarillo.", audio: "assets/audio/color_amarillo.mp3", audioDef: "assets/audio/sopa2_amarillo_def.mp3" },
        { palabra: "verde", definicion: "El melón es verde.", audio: "assets/audio/color_verde.mp3", audioDef: "assets/audio/sopa2_verde_def.mp3" },
        { palabra: "rojo", definicion: "El tomate es rojo.", audio: "assets/audio/color_rojo.mp3", audioDef: "assets/audio/sopa2_rojo_def.mp3" },
        { palabra: "morado", definicion: "La uva es morada.", audio: "assets/audio/color_morado.mp3", audioDef: "assets/audio/sopa2_morado_def.mp3" },
        { palabra: "celeste", definicion: "El cielo es celeste.", audio: "assets/audio/color_celeste.mp3", audioDef: "assets/audio/sopa2_celeste_def.mp3" }
      ]
    },

    // ============================================================
    // BLOQUE C — COLOREAR DISCRIMINANDO (SOLO LAS MANZANAS)
    // La escena arranca sin pintar; cada manzana acertada se pinta
    // de verde de verdad, en su lugar exacto.
    // ============================================================

    {
      id: 18,
      tipo: "discriminar",
      titulo: "Pintá solo las manzanas",
      consigna: "Tocá solamente las manzanas para pintarlas de verde. Si tocás otra fruta, no pasa nada: probá de nuevo.",
      audio: "assets/audio/discriminar_instr.mp3",
      textoConsigna: "La manzana es verde.",
      colorIndicador: "#4a9c4a",
      imagen: "assets/img/escena_manzanas.jpg",
      imagenPintada: "assets/img/manzana_verde.png",
      zonas: [
        { x: 14, y: 24, correcta: true },
        { x: 34, y: 62, correcta: true },
        { x: 58, y: 20, correcta: true },
        { x: 82, y: 58, correcta: true },
        { x: 24, y: 82, correcta: false },
        { x: 46, y: 40, correcta: false },
        { x: 70, y: 82, correcta: false },
        { x: 90, y: 22, correcta: false }
      ]
    },

    // ============================================================
    // BLOQUE D — BILLETES (pesos reales: $10, $20, $50 y $100),
    // montos menores a $100 o entre $100 y $150. El texto que se
    // lee en voz alta dice "pesos" en palabras (nunca "$"), y hay
    // audio para el contexto y el monto a armar, con parlante para
    // volver a escucharlo.
    // ============================================================

    {
      id: 19,
      tipo: "billetes",
      titulo: "Armá $70: un cajón de duraznos",
      audioTitulo: "assets/audio/billete70_titulo.mp3",
      tituloAudioTexto: "Armá 70 pesos: un cajón de duraznos.",
      // Se escucha una sola vez, al entrar a la primera pantalla del
      // bloque: aclara que los montos son bajos a propósito (son un
      // ejemplo para practicar la mecánica de armar un monto con
      // billetes), no precios reales ni actualizados.
      avisoAudio: "assets/audio/billetes_aviso.mp3",
      avisoAudioTexto: "Los montos que usamos en esta actividad son bajos a propósito: son solo un ejemplo para practicar cómo armar un monto con billetes, no reflejan precios reales ni actualizados.",
      consigna: "Tocá los billetes de cien, cincuenta, veinte y diez pesos hasta juntar el monto exacto. Si te equivocás, podés sacar el último billete.",
      audio: "assets/audio/billetes_instr.mp3",
      objetivo: 70,
      contexto: "En la feria de Lavalle, un cajón de duraznos cuesta $70.",
      audioContexto: "assets/audio/billete70_contexto.mp3",
      contextoAudioTexto: "En la feria de Lavalle, un cajón de duraznos cuesta 70 pesos. Armá el monto de 70 pesos.",
      billetes: [
        { valor: 100, imagen: "assets/img/billete_100.jpg" },
        { valor: 50, imagen: "assets/img/billete_50.jpg" },
        { valor: 20, imagen: "assets/img/billete_20.jpg" },
        { valor: 10, imagen: "assets/img/billete_10.jpg" }
      ]
    },

    {
      id: 20,
      tipo: "billetes",
      titulo: "Armá $130: un día de changa",
      audioTitulo: "assets/audio/billete130_titulo.mp3",
      tituloAudioTexto: "Armá 130 pesos: un día de changa.",
      consigna: "Tocá los billetes de cien, cincuenta, veinte y diez pesos hasta juntar el monto exacto. Si te equivocás, podés sacar el último billete.",
      audio: "assets/audio/billetes_instr.mp3",
      objetivo: 130,
      contexto: "Un día de changa ayudando en la cosecha se paga $130.",
      audioContexto: "assets/audio/billete130_contexto.mp3",
      contextoAudioTexto: "Un día de changa ayudando en la cosecha se paga 130 pesos. Armá el monto de 130 pesos.",
      billetes: [
        { valor: 100, imagen: "assets/img/billete_100.jpg" },
        { valor: 50, imagen: "assets/img/billete_50.jpg" },
        { valor: 20, imagen: "assets/img/billete_20.jpg" },
        { valor: 10, imagen: "assets/img/billete_10.jpg" }
      ]
    },

    {
      id: 21,
      tipo: "billetes",
      titulo: "Armá $40: un kilo de tomates",
      audioTitulo: "assets/audio/billete40_titulo.mp3",
      tituloAudioTexto: "Armá 40 pesos: un kilo de tomates.",
      consigna: "Tocá los billetes de cien, cincuenta, veinte y diez pesos hasta juntar el monto exacto. Si te equivocás, podés sacar el último billete.",
      audio: "assets/audio/billetes_instr.mp3",
      objetivo: 40,
      contexto: "En la feria de Lavalle, un kilo de tomates cuesta $40.",
      audioContexto: "assets/audio/billete40_contexto.mp3",
      contextoAudioTexto: "En la feria de Lavalle, un kilo de tomates cuesta 40 pesos. Armá el monto de 40 pesos.",
      billetes: [
        { valor: 100, imagen: "assets/img/billete_100.jpg" },
        { valor: 50, imagen: "assets/img/billete_50.jpg" },
        { valor: 20, imagen: "assets/img/billete_20.jpg" },
        { valor: 10, imagen: "assets/img/billete_10.jpg" }
      ]
    },

    {
      id: 22,
      tipo: "billetes",
      titulo: "Armá $90: atar los sarmientos",
      audioTitulo: "assets/audio/billete90_titulo.mp3",
      tituloAudioTexto: "Armá 90 pesos: atar los sarmientos.",
      consigna: "Tocá los billetes de cien, cincuenta, veinte y diez pesos hasta juntar el monto exacto. Si te equivocás, podés sacar el último billete.",
      audio: "assets/audio/billetes_instr.mp3",
      objetivo: 90,
      contexto: "Atar los sarmientos del parral una mañana se paga $90.",
      audioContexto: "assets/audio/billete90_contexto.mp3",
      contextoAudioTexto: "Atar los sarmientos del parral una mañana se paga 90 pesos. Armá el monto de 90 pesos.",
      billetes: [
        { valor: 100, imagen: "assets/img/billete_100.jpg" },
        { valor: 50, imagen: "assets/img/billete_50.jpg" },
        { valor: 20, imagen: "assets/img/billete_20.jpg" },
        { valor: 10, imagen: "assets/img/billete_10.jpg" }
      ]
    },

    {
      id: 23,
      tipo: "billetes",
      titulo: "Armá $160: una bolsa de melones",
      audioTitulo: "assets/audio/billete160_titulo.mp3",
      tituloAudioTexto: "Armá 160 pesos: una bolsa de melones.",
      consigna: "Tocá los billetes de cien, cincuenta, veinte y diez pesos hasta juntar el monto exacto. Si te equivocás, podés sacar el último billete.",
      audio: "assets/audio/billetes_instr.mp3",
      objetivo: 160,
      contexto: "En la feria de Lavalle, una bolsa de melones cuesta $160.",
      audioContexto: "assets/audio/billete160_contexto.mp3",
      contextoAudioTexto: "En la feria de Lavalle, una bolsa de melones cuesta 160 pesos. Armá el monto de 160 pesos.",
      billetes: [
        { valor: 100, imagen: "assets/img/billete_100.jpg" },
        { valor: 50, imagen: "assets/img/billete_50.jpg" },
        { valor: 20, imagen: "assets/img/billete_20.jpg" },
        { valor: 10, imagen: "assets/img/billete_10.jpg" }
      ]
    },

    // ---------- Sopa de letras del bloque de billetes (el dinero) ----------
    {
      id: 24,
      tipo: "sopa",
      titulo: "Sopa de letras: el dinero",
      consigna: "Encontrá las palabras escondidas en la sopa de letras. Tocá la primera letra de la palabra y después la última.",
      audio: "assets/audio/sopa_instr.mp3",
      audioTitulo: "assets/audio/sopa4_titulo.mp3",
      tituloAudioTexto: "Sopa de letras del dinero.",
      palabras: [
        { palabra: "pesos", definicion: "La moneda de la Argentina.", audio: "assets/audio/sopa4_pesos.mp3", audioDef: "assets/audio/sopa4_pesos_def.mp3" },
        { palabra: "billetes", definicion: "Sirven para pagar montos grandes.", audio: "assets/audio/sopa4_billetes.mp3", audioDef: "assets/audio/sopa4_billetes_def.mp3" },
        { palabra: "diez", definicion: "El número 10.", audio: "assets/audio/sopa4_diez.mp3", audioDef: "assets/audio/sopa4_diez_def.mp3" },
        { palabra: "veinte", definicion: "El número 20.", audio: "assets/audio/sopa4_veinte.mp3", audioDef: "assets/audio/sopa4_veinte_def.mp3" },
        { palabra: "cien", definicion: "El número 100.", audio: "assets/audio/sopa4_cien.mp3", audioDef: "assets/audio/sopa4_cien_def.mp3" }
      ]
    },

    // ============================================================
    // BLOQUE E — ARMAR ORACIONES, SUMANDO PALABRAS DE A UNA
    // (contextualizadas en Lavalle). Mismo mecanismo que dictado:
    // renglones con audio acumulado, sin pista previa.
    // ============================================================

    {
      id: 25,
      tipo: "ordenar",
      titulo: "Armá la oración: la cosecha",
      imagen: "assets/img/img_cosecha.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/ordenar_instr.mp3",
      items: [
        { texto: "La", orden: 1 },
        { texto: "cosecha", orden: 2 },
        { texto: "de", orden: 3 },
        { texto: "melón", orden: 4 },
        { texto: "es", orden: 5 },
        { texto: "grande.", orden: 6 }
      ],
      audiosLinea: [
        "assets/audio/o01_acum1.mp3",
        "assets/audio/o01_acum2.mp3",
        "assets/audio/o01_acum3.mp3",
        "assets/audio/o01_acum4.mp3",
        "assets/audio/o01_acum5.mp3",
        "assets/audio/o01_oracion.mp3"
      ],
      oracionAudio: "assets/audio/o01_oracion.mp3"
    },

    {
      id: 26,
      tipo: "ordenar",
      titulo: "Armá la oración: el parral",
      imagen: "assets/img/img_parral_oracion.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/ordenar_instr_repeat.mp3",
      items: [
        { texto: "Las", orden: 1 },
        { texto: "uvas", orden: 2 },
        { texto: "del", orden: 3 },
        { texto: "parral", orden: 4 },
        { texto: "son", orden: 5 },
        { texto: "dulces.", orden: 6 }
      ],
      audiosLinea: [
        "assets/audio/o02_acum1.mp3",
        "assets/audio/o02_acum2.mp3",
        "assets/audio/o02_acum3.mp3",
        "assets/audio/o02_acum4.mp3",
        "assets/audio/o02_acum5.mp3",
        "assets/audio/o02_oracion.mp3"
      ],
      oracionAudio: "assets/audio/o02_oracion.mp3"
    },

    {
      id: 27,
      tipo: "ordenar",
      titulo: "Armá la oración: el tomate",
      imagen: "assets/img/img_tomate_oracion.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar la oración.",
      audio: "assets/audio/ordenar_instr_repeat.mp3",
      items: [
        { texto: "El", orden: 1 },
        { texto: "tomate", orden: 2 },
        { texto: "maduro", orden: 3 },
        { texto: "es", orden: 4 },
        { texto: "rojo.", orden: 5 }
      ],
      audiosLinea: [
        "assets/audio/o03_acum1.mp3",
        "assets/audio/o03_acum2.mp3",
        "assets/audio/o03_acum3.mp3",
        "assets/audio/o03_acum4.mp3",
        "assets/audio/o03_oracion.mp3"
      ],
      oracionAudio: "assets/audio/o03_oracion.mp3"
    },

    // ---------- Sopa de letras del bloque de armar oraciones
    // (frutas de la cosecha) ----------
    {
      id: 28,
      tipo: "sopa",
      titulo: "Sopa de letras: frutas de la cosecha",
      consigna: "Encontrá las palabras escondidas en la sopa de letras. Tocá la primera letra de la palabra y después la última.",
      audio: "assets/audio/sopa_instr.mp3",
      audioTitulo: "assets/audio/sopa1_titulo.mp3",
      tituloAudioTexto: "Sopa de letras de frutas de la cosecha.",
      palabras: [
        { palabra: "melon", textoAudio: "melón", definicion: "Fruta grande y dulce que se cosecha en Lavalle.", audio: "assets/audio/sopa1_melon.mp3", audioDef: "assets/audio/sopa1_melon_def.mp3" },
        { palabra: "uva", definicion: "Fruta chica y dulce que crece en el parral.", audio: "assets/audio/sopa1_uva.mp3", audioDef: "assets/audio/sopa1_uva_def.mp3" },
        { palabra: "tomate", definicion: "Fruta roja que se cosecha en la chacra.", audio: "assets/audio/sopa1_tomate.mp3", audioDef: "assets/audio/sopa1_tomate_def.mp3" },
        { palabra: "parral", definicion: "Armazón donde crece la vid y cuelgan las uvas.", audio: "assets/audio/sopa1_parral.mp3", audioDef: "assets/audio/sopa1_parral_def.mp3" },
        { palabra: "cosecha", definicion: "Juntar los frutos maduros del campo.", audio: "assets/audio/sopa1_cosecha.mp3", audioDef: "assets/audio/sopa1_cosecha_def.mp3" }
      ]
    },

    // ============================================================
    // BLOQUE F — CONCORDANCIA (unir con flecha): artículo + sustantivo
    // + verbo + predicado, eligiendo género y número correcto.
    // ============================================================

    {
      id: 29,
      tipo: "concordancia",
      titulo: "Unir con flecha",
      consigna: "Uní con una línea el artículo, el dibujo, el verbo y cómo es, hasta armar la oración completa. Cada parte se escucha al tocarla.",
      audio: "assets/audio/concordancia_instr.mp3",
      nodos: [
        [
          { id: "a1", texto: "La", audio: "assets/audio/conc_la.mp3" },
          { id: "a2", texto: "El", audio: "assets/audio/conc_el.mp3" },
          { id: "a3", texto: "Los", audio: "assets/audio/conc_los.mp3" },
          { id: "a4", texto: "Las", audio: "assets/audio/conc_las.mp3" }
        ],
        [
          { id: "s1", texto: "sandía", imagen: "assets/img/ic_sandia.jpg", audio: "assets/audio/conc_sandia.mp3" },
          { id: "s2", texto: "zapato", imagen: "assets/img/ic_zapato.jpg", audio: "assets/audio/conc_zapato.mp3" },
          { id: "s3", texto: "árboles", imagen: "assets/img/ic_arboles.jpg", audio: "assets/audio/conc_arboles.mp3" },
          { id: "s4", texto: "casas", imagen: "assets/img/ic_casas.jpg", audio: "assets/audio/conc_casas.mp3" }
        ],
        [
          { id: "v1", texto: "es", audio: "assets/audio/conc_es.mp3" },
          { id: "v2", texto: "son", audio: "assets/audio/conc_son.mp3" }
        ],
        [
          { id: "p1", texto: "redonda y calada.", audio: "assets/audio/conc_p1.mp3" },
          { id: "p2", texto: "de color negro.", audio: "assets/audio/conc_p2.mp3" },
          { id: "p3", texto: "verdes.", audio: "assets/audio/conc_p3.mp3" },
          { id: "p4", texto: "chiquitas.", audio: "assets/audio/conc_p4.mp3" }
        ]
      ],
      enlaces: [
        { from: "a1", to: "s1" }, { from: "a2", to: "s2" }, { from: "a3", to: "s3" }, { from: "a4", to: "s4" },
        { from: "s1", to: "v1" }, { from: "s2", to: "v1" }, { from: "s3", to: "v2" }, { from: "s4", to: "v2" },
        { from: "v1", to: "p1" }, { from: "v1", to: "p2" }, { from: "v2", to: "p3" }, { from: "v2", to: "p4" }
      ],
      oraciones: [
        { cadena: ["a1", "s1", "v1", "p1"], texto: "La sandía es redonda y calada.", audio: "assets/audio/conc_o1.mp3" },
        { cadena: ["a2", "s2", "v1", "p2"], texto: "El zapato es de color negro.", audio: "assets/audio/conc_o2.mp3" },
        { cadena: ["a3", "s3", "v2", "p3"], texto: "Los árboles son verdes.", audio: "assets/audio/conc_o3.mp3" },
        { cadena: ["a4", "s4", "v2", "p4"], texto: "Las casas son chiquitas.", audio: "assets/audio/conc_o4.mp3" }
      ]
    },

    // ---------- CIERRE ----------
    // Sin imagen: el paquete se usa con adultos y con chicos, así que acá
    // queda solo el resultado y la foto de perfil (lightbox), sin una
    // ilustración que asuma un público en particular.
    {
      id: 30,
      tipo: "cierre",
      titulo: "¡Muy bien!",
      texto: "Armaste oraciones al dictado, pintaste frutas del color correcto, elegiste solo las manzanas, uniste oraciones con flechas, resolviste sopas de letras y armaste montos con billetes de $10, $20, $50 y $100. Seguimos practicando la próxima clase.",
      // Versión hablada del mismo texto, sin "$" (para que gTTS diga
      // "pesos" y no "dólares"). El texto que se VE en pantalla queda
      // igual, con los signos "$" como siempre.
      textoAudio: "Armaste oraciones al dictado, pintaste frutas del color correcto, elegiste solo las manzanas, uniste oraciones con flechas, resolviste sopas de letras y armaste montos con billetes de diez, veinte, cincuenta y cien pesos. Seguimos practicando la próxima clase.",
      audio: "assets/audio/cierre.mp3"
    }

  ]
};
