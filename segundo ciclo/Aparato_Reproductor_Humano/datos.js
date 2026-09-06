/* ============================================================
   EL SISTEMA REPRODUCTOR HUMANO — 6° grado
   Ciencias Naturales / Educación Sexual Integral (Ley N.° 26.150)
   datos.js — v3: mapa interactivo, video, imágenes por órgano
   ============================================================ */

window.DATOS = {

  portada: {
    id: "portada",
    tipo: "portada",
    titulo: "El sistema reproductor humano",
    subtitulo: "6° grado · Ciencias Naturales",
    imagen: "img/portada.jpg"
  },

  pantallas: [

    /* ---------- 1. Intro ---------- */
    {
      id: "01-intro",
      tipo: "narracion",
      titulo: "¿Qué es el sistema reproductor?",
      imagen: "img/01_intro.jpg",
      texto: "El sistema reproductor es el conjunto de órganos que intervienen en la reproducción humana. Su función principal es permitir la formación de una nueva persona. Los sistemas reproductores femenino y masculino tienen órganos diferentes, que cumplen funciones específicas. Durante la pubertad, estos sistemas cambian. Empiezan a producir células reproductoras y hormonas sexuales.",
      audioInstr: "audio/01_instr.mp3"
    },

    /* ---------- 2. Sistema femenino: mapa interactivo ---------- */
    {
      id: "02-femenino",
      tipo: "hotspot",
      titulo: "El sistema reproductor femenino",
      imagen: "img/femenino.jpg",
      imagenGrande: true,
      instruccionTexto: "Tocá cada etiqueta de la imagen para escuchar y leer su definición.",
      audioInstr: "audio/02_instr.mp3",
      audioConfirma: "audio/02_confirma.mp3",
      zonas: [
        { id: "utero", x: 0.42, y: 0.00, w: 0.16, h: 0.12, label: "Útero",
          audioPalabra: "audio/02_pal_utero.mp3", audioDefinicion: "audio/02_def_utero.mp3",
          definicionTexto: "El útero es el órgano muscular donde se desarrolla el embrión durante el embarazo." },
        { id: "trompa", x: 0.58, y: 0.00, w: 0.28, h: 0.12, label: "Trompa de Falopio",
          audioPalabra: "audio/02_pal_trompa.mp3", audioDefinicion: "audio/02_def_trompas.mp3",
          definicionTexto: "Las trompas de Falopio son los conductos que comunican los ovarios con el útero." },
        { id: "ovario", x: 0.07, y: 0.45, w: 0.19, h: 0.13, label: "Ovarios",
          audioPalabra: "audio/02_pal_ovario.mp3", audioDefinicion: "audio/02_def_ovarios.mp3",
          definicionTexto: "Los ovarios son los órganos que producen los óvulos y las hormonas sexuales femeninas." },
        { id: "ovario", x: 0.765, y: 0.45, w: 0.195, h: 0.13, label: "Ovarios",
          audioPalabra: "audio/02_pal_ovario.mp3", audioDefinicion: "audio/02_def_ovarios.mp3",
          definicionTexto: "Los ovarios son los órganos que producen los óvulos y las hormonas sexuales femeninas." },
        { id: "vagina", x: 0.585, y: 0.79, w: 0.16, h: 0.13, label: "Vagina",
          audioPalabra: "audio/02_pal_vagina.mp3", audioDefinicion: "audio/02_def_vagina.mp3",
          definicionTexto: "La vagina es el conducto que comunica el útero con el exterior del cuerpo." }
      ],
      extras: [
        { id: "vulva", label: "Vulva",
          audioPalabra: "audio/02_pal_vulva.mp3", audioDefinicion: "audio/02_def_vulva.mp3",
          definicionTexto: "La vulva está formada por los órganos externos del sistema reproductor femenino." }
      ]
    },

    /* ---------- Rompecabezas de texto: definición de ovario (antes de la trivia) ---------- */
    {
      id: "03b-rompecabezas-ovario",
      tipo: "ordenar",
      titulo: "Rompecabezas de ideas: el ovario",
      imagen: "img/femenino.jpg",
      instruccionTexto: "Armá la definición ordenando las palabras, una por una. Recordá: la oración empieza con mayúscula y termina con punto.",
      audioInstr: "audio/03b_instr.mp3",
      audioConfirma: "audio/03b_oracion.mp3",
      audioError: "audio/03b_error.mp3",
      estiloOracion: true,
      pasos: [
        { id: "o1", texto: "El", audio: "audio/03b_o1.mp3" },
        { id: "o2", texto: "ovario", audio: "audio/03b_o2.mp3" },
        { id: "o3", texto: "es", audio: "audio/03b_o3.mp3" },
        { id: "o4", texto: "el", audio: "audio/03b_o4.mp3" },
        { id: "o5", texto: "órgano", audio: "audio/03b_o5.mp3" },
        { id: "o6", texto: "que", audio: "audio/03b_o6.mp3" },
        { id: "o7", texto: "produce", audio: "audio/03b_o7.mp3" },
        { id: "o8", texto: "óvulos", audio: "audio/03b_o8.mp3" },
        { id: "o9", texto: "y", audio: "audio/03b_o9.mp3" },
        { id: "o10", texto: "hormonas", audio: "audio/03b_o10.mp3" },
        { id: "o11", texto: "sexuales.", audio: "audio/03b_o11.mp3" }
      ]
    },

    /* ---------- Trivia femenino (después del refuerzo) ---------- */
    {
      id: "03-trivia-femenino",
      tipo: "trivia_multi",
      titulo: "¿Cuánto entendiste del sistema femenino?",
      imagen: "img/femenino.jpg",
      instruccionTexto: "Respondé las preguntas sobre el sistema reproductor femenino.",
      audioInstr: "audio/03_instr.mp3",
      preguntas: [
        {
          pregunta: "¿Cuál es la función de los ovarios?",
          audioPregunta: "audio/03_q1_pregunta.mp3",
          opciones: [
            { texto: "Producir óvulos y hormonas sexuales", correcta: true },
            { texto: "Producir espermatozoides", correcta: false, audioJustifica: "audio/03_q1_no1.mp3" },
            { texto: "Transportar el óvulo hacia el útero", correcta: false, audioJustifica: "audio/03_q1_no2.mp3" },
            { texto: "Alojar al embrión durante el embarazo", correcta: false, audioJustifica: "audio/03_q1_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/03_q1_ok.mp3",
          audioConfirmaIncorrecta: "audio/03_q1_generico.mp3"
        },
        {
          pregunta: "¿Dónde se desarrolla el embrión durante el embarazo?",
          audioPregunta: "audio/03_q2_pregunta.mp3",
          opciones: [
            { texto: "En el útero", correcta: true },
            { texto: "En los ovarios", correcta: false, audioJustifica: "audio/03_q2_no1.mp3" },
            { texto: "En las trompas de Falopio", correcta: false, audioJustifica: "audio/03_q2_no2.mp3" },
            { texto: "En la vagina", correcta: false, audioJustifica: "audio/03_q2_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/03_q2_ok.mp3",
          audioConfirmaIncorrecta: "audio/03_q2_generico.mp3"
        }
      ]
    },

    /* ---------- Sopa de letras: órganos del sistema femenino ---------- */
    {
      id: "03c-sopa-femenino",
      tipo: "sopaLetras",
      titulo: "Sopa de letras: sistema femenino",
      instruccionTexto: "Tocá la primera letra y la última letra de cada palabra escondida.",
      audioInstr: "audio/03c_instr.mp3",
      imagen: "img/femenino.jpg",
      palabras: [
        { palabra: "OVARIO", audio: "audio/03c_ovario.mp3", audioDefinicion: "audio/02_def_ovarios.mp3",
          definicionTexto: "Los ovarios son los órganos que producen los óvulos y las hormonas sexuales femeninas." },
        { palabra: "TROMPA", audio: "audio/03c_trompa.mp3", audioDefinicion: "audio/02_def_trompas.mp3",
          definicionTexto: "Las trompas de Falopio son los conductos que comunican los ovarios con el útero." },
        { palabra: "UTERO", audio: "audio/03c_utero.mp3", audioDefinicion: "audio/02_def_utero.mp3",
          definicionTexto: "El útero es el órgano muscular donde se desarrolla el embrión durante el embarazo." },
        { palabra: "VAGINA", audio: "audio/03c_vagina.mp3", audioDefinicion: "audio/02_def_vagina.mp3",
          definicionTexto: "La vagina es el conducto que comunica el útero con el exterior del cuerpo." },
        { palabra: "VULVA", audio: "audio/03c_vulva.mp3", audioDefinicion: "audio/02_def_vulva.mp3",
          definicionTexto: "La vulva está formada por los órganos externos del sistema reproductor femenino." }
      ]
    },

    /* ---------- 4. Sistema masculino: mapa interactivo ---------- */
    {
      id: "04-masculino",
      tipo: "hotspot",
      titulo: "El sistema reproductor masculino",
      imagen: "img/masculino.jpg",
      imagenGrande: true,
      instruccionTexto: "Tocá cada etiqueta de la imagen para escuchar y leer su definición.",
      audioInstr: "audio/04_instr.mp3",
      audioConfirma: "audio/04_confirma.mp3",
      zonas: [
        { id: "vesicula", x: 0.03, y: 0.30, w: 0.17, h: 0.13, label: "Vesícula seminal",
          audioPalabra: "audio/04_pal_vesicula.mp3", audioDefinicion: "audio/04_def_vesiculas.mp3",
          definicionTexto: "Las vesículas seminales producen parte del líquido que forma el semen." },
        { id: "conducto", x: 0.01, y: 0.48, w: 0.19, h: 0.13, label: "Conducto deferente",
          audioPalabra: "audio/04_pal_conducto.mp3", audioDefinicion: "audio/04_def_conductos.mp3",
          definicionTexto: "Los conductos deferentes transportan los espermatozoides desde los testículos." },
        { id: "prostata", x: 0.775, y: 0.37, w: 0.16, h: 0.10, label: "Próstata",
          audioPalabra: "audio/04_pal_prostata.mp3", audioDefinicion: "audio/04_def_prostata.mp3",
          definicionTexto: "La próstata también produce líquido que, junto con los espermatozoides, forma el semen." },
        { id: "pene", x: 0.785, y: 0.55, w: 0.10, h: 0.10, label: "Pene",
          audioPalabra: "audio/04_pal_pene.mp3", audioDefinicion: "audio/04_def_pene.mp3",
          definicionTexto: "El pene es el órgano por donde sale el semen al exterior del cuerpo." },
        { id: "testiculo", x: 0.08, y: 0.71, w: 0.16, h: 0.10, label: "Testículo",
          audioPalabra: "audio/04_pal_testiculo.mp3", audioDefinicion: "audio/04_def_testiculos.mp3",
          definicionTexto: "Los testículos son los órganos que producen los espermatozoides y las hormonas sexuales masculinas." },
        { id: "escroto", x: 0.075, y: 0.82, w: 0.165, h: 0.09, label: "Escroto",
          audioPalabra: "audio/04_pal_escroto.mp3", audioDefinicion: "audio/04_def_escroto.mp3",
          definicionTexto: "El escroto es la bolsa de piel que cubre y protege los testículos." },
        { id: "uretra", x: 0.68, y: 0.90, w: 0.13, h: 0.09, label: "Uretra",
          audioPalabra: "audio/04_pal_uretra.mp3", audioDefinicion: "audio/04_def_uretra.mp3",
          definicionTexto: "La uretra es el conducto que atraviesa el pene y permite la salida del semen al exterior." }
      ]
    },

    /* ---------- Rompecabezas de texto: definición de testículo (antes de la trivia) ---------- */
    {
      id: "05b-rompecabezas-testiculo",
      tipo: "ordenar",
      titulo: "Rompecabezas de ideas: el testículo",
      imagen: "img/masculino.jpg",
      instruccionTexto: "Armá la definición ordenando las palabras, una por una. Recordá: la oración empieza con mayúscula y termina con punto.",
      audioInstr: "audio/05b_instr.mp3",
      audioConfirma: "audio/05b_oracion.mp3",
      audioError: "audio/05b_error.mp3",
      estiloOracion: true,
      pasos: [
        { id: "t1", texto: "El", audio: "audio/05b_t1.mp3" },
        { id: "t2", texto: "testículo", audio: "audio/05b_t2.mp3" },
        { id: "t3", texto: "es", audio: "audio/05b_t3.mp3" },
        { id: "t4", texto: "el", audio: "audio/05b_t4.mp3" },
        { id: "t5", texto: "órgano", audio: "audio/05b_t5.mp3" },
        { id: "t6", texto: "que", audio: "audio/05b_t6.mp3" },
        { id: "t7", texto: "produce", audio: "audio/05b_t7.mp3" },
        { id: "t8", texto: "espermatozoides", audio: "audio/05b_t8.mp3" },
        { id: "t9", texto: "y", audio: "audio/05b_t9.mp3" },
        { id: "t10", texto: "hormonas", audio: "audio/05b_t10.mp3" },
        { id: "t11", texto: "sexuales.", audio: "audio/05b_t11.mp3" }
      ]
    },

    /* ---------- Trivia masculino (después del refuerzo) ---------- */
    {
      id: "05-trivia-masculino",
      tipo: "trivia_multi",
      titulo: "¿Cuánto entendiste del sistema masculino?",
      imagen: "img/masculino.jpg",
      instruccionTexto: "Respondé las preguntas sobre el sistema reproductor masculino.",
      audioInstr: "audio/05_instr.mp3",
      preguntas: [
        {
          pregunta: "¿Cuál es la función de los testículos?",
          audioPregunta: "audio/05_q1_pregunta.mp3",
          opciones: [
            { texto: "Producir espermatozoides y hormonas sexuales", correcta: true },
            { texto: "Producir óvulos", correcta: false, audioJustifica: "audio/05_q1_no1.mp3" },
            { texto: "Transportar la orina", correcta: false, audioJustifica: "audio/05_q1_no2.mp3" },
            { texto: "Alojar al embrión", correcta: false, audioJustifica: "audio/05_q1_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/05_q1_ok.mp3",
          audioConfirmaIncorrecta: "audio/05_q1_generico.mp3"
        },
        {
          pregunta: "¿Qué conductos transportan los espermatozoides desde los testículos?",
          audioPregunta: "audio/05_q2_pregunta.mp3",
          opciones: [
            { texto: "Los conductos deferentes", correcta: true },
            { texto: "Las trompas de Falopio", correcta: false, audioJustifica: "audio/05_q2_no1.mp3" },
            { texto: "El útero", correcta: false, audioJustifica: "audio/05_q2_no2.mp3" },
            { texto: "Los ovarios", correcta: false, audioJustifica: "audio/05_q2_no3.mp3" }
          ],
          audioConfirmaCorrecta: "audio/05_q2_ok.mp3",
          audioConfirmaIncorrecta: "audio/05_q2_generico.mp3"
        }
      ]
    },

    /* ---------- Sopa de letras: órganos del sistema masculino ---------- */
    {
      id: "05c-sopa-masculino",
      tipo: "sopaLetras",
      titulo: "Sopa de letras: sistema masculino",
      instruccionTexto: "Tocá la primera letra y la última letra de cada palabra escondida.",
      audioInstr: "audio/05c_instr.mp3",
      imagen: "img/masculino.jpg",
      palabras: [
        { palabra: "TESTICULO", audio: "audio/05c_testiculo.mp3", audioDefinicion: "audio/04_def_testiculos.mp3",
          definicionTexto: "Los testículos son los órganos que producen los espermatozoides y las hormonas sexuales masculinas." },
        { palabra: "PROSTATA", audio: "audio/05c_prostata.mp3", audioDefinicion: "audio/04_def_prostata.mp3",
          definicionTexto: "La próstata también produce líquido que, junto con los espermatozoides, forma el semen." },
        { palabra: "PENE", audio: "audio/05c_pene.mp3", audioDefinicion: "audio/04_def_pene.mp3",
          definicionTexto: "El pene es el órgano por donde sale el semen al exterior del cuerpo." },
        { palabra: "URETRA", audio: "audio/05c_uretra.mp3", audioDefinicion: "audio/04_def_uretra.mp3",
          definicionTexto: "La uretra es el conducto que atraviesa el pene y permite la salida del semen al exterior." },
        { palabra: "ESCROTO", audio: "audio/05c_escroto.mp3", audioDefinicion: "audio/04_def_escroto.mp3",
          definicionTexto: "El escroto es la bolsa de piel que cubre y protege los testículos." }
      ]
    },

    /* ---------- 6. Clasificar: ¿A qué sistema pertenece? (con imágenes por órgano) ---------- */
    {
      id: "06-clasificar-sistemas",
      tipo: "clasificar",
      titulo: "¿A qué sistema pertenece?",
      imagen: "img/06_clasificar.jpg",
      instruccionTexto: "Clasificá cada órgano según pertenezca al sistema reproductor femenino o al masculino.",
      audioInstr: "audio/06_instr.mp3",
      audioConfirma: "audio/06_confirma.mp3",
      categorias: [
        { id: "femenino", nombre: "♀ Sistema femenino", color: "#e91e8c" },
        { id: "masculino", nombre: "♂ Sistema masculino", color: "#1565c0" }
      ],
      items: [
        { id: "ovario", texto: "Ovario", categoria: "femenino", imagen: "img/organo_ovario.jpg",
          audio: "audio/06_item_ovario.mp3", audioCorrecta: "audio/06_ok_ovario.mp3", audioIncorrecta: "audio/06_no_ovario.mp3" },
        { id: "trompa", texto: "Trompa de Falopio", categoria: "femenino", imagen: "img/organo_trompa.jpg",
          audio: "audio/06_item_trompa.mp3", audioCorrecta: "audio/06_ok_trompa.mp3", audioIncorrecta: "audio/06_no_trompa.mp3" },
        { id: "utero", texto: "Útero", categoria: "femenino", imagen: "img/organo_utero.jpg",
          audio: "audio/06_item_utero.mp3", audioCorrecta: "audio/06_ok_utero.mp3", audioIncorrecta: "audio/06_no_utero.mp3" },
        { id: "vagina", texto: "Vagina", categoria: "femenino", imagen: "img/organo_vagina.jpg",
          audio: "audio/06_item_vagina.mp3", audioCorrecta: "audio/06_ok_vagina.mp3", audioIncorrecta: "audio/06_no_vagina.mp3" },
        { id: "testiculo", texto: "Testículo", categoria: "masculino", imagen: "img/organo_testiculo.jpg",
          audio: "audio/06_item_testiculo.mp3", audioCorrecta: "audio/06_ok_testiculo.mp3", audioIncorrecta: "audio/06_no_testiculo.mp3" },
        { id: "conducto", texto: "Conducto deferente", categoria: "masculino", imagen: "img/organo_conducto.jpg",
          audio: "audio/06_item_conducto.mp3", audioCorrecta: "audio/06_ok_conducto.mp3", audioIncorrecta: "audio/06_no_conducto.mp3" },
        { id: "prostata", texto: "Próstata", categoria: "masculino", imagen: "img/organo_prostata.jpg",
          audio: "audio/06_item_prostata.mp3", audioCorrecta: "audio/06_ok_prostata.mp3", audioIncorrecta: "audio/06_no_prostata.mp3" },
        { id: "pene", texto: "Pene", categoria: "masculino", imagen: "img/organo_pene.jpg",
          audio: "audio/06_item_pene.mp3", audioCorrecta: "audio/06_ok_pene.mp3", audioIncorrecta: "audio/06_no_pene.mp3" }
      ]
    },

    /* ---------- Puzzle de imagen: sistema femenino ---------- */
    {
      id: "06b-puzzle-femenino",
      tipo: "puzzleImagen",
      titulo: "Rompecabezas: sistema femenino",
      instruccionTexto: "Tocá dos piezas para intercambiarlas y armar la imagen completa.",
      audioInstr: "audio/06b_instr.mp3",
      audioConfirma: "audio/06b_confirma.mp3",
      imagen: "img/femenino.jpg",
      filas: 2, columnas: 3
    },

    /* ---------- 7. Asociar: órgano y función ---------- */
    {
      id: "07-asociar-funciones",
      tipo: "asociar",
      titulo: "Cada órgano con su función",
      imagen: "img/07_asociar.jpg",
      instruccionTexto: "Uní cada órgano con la función que cumple.",
      audioInstr: "audio/07_instr.mp3",
      pares: [
        { id: "ovario", izq: "Ovario", izqAudio: "audio/07_izq_ovario.mp3",
          der: "Produce óvulos y hormonas sexuales femeninas", derAudio: "audio/07_der_ovario.mp3",
          audioConfirmaPar: "audio/07_confirma_ovario.mp3" },
        { id: "utero", izq: "Útero", izqAudio: "audio/07_izq_utero.mp3",
          der: "Es el órgano donde se desarrolla el embrión", derAudio: "audio/07_der_utero.mp3",
          audioConfirmaPar: "audio/07_confirma_utero.mp3" },
        { id: "testiculo", izq: "Testículo", izqAudio: "audio/07_izq_testiculo.mp3",
          der: "Produce espermatozoides y hormonas sexuales masculinas", derAudio: "audio/07_der_testiculo.mp3",
          audioConfirmaPar: "audio/07_confirma_testiculo.mp3" },
        { id: "prostata", izq: "Próstata", izqAudio: "audio/07_izq_prostata.mp3",
          der: "Produce parte del líquido que forma el semen", derAudio: "audio/07_der_prostata.mp3",
          audioConfirmaPar: "audio/07_confirma_prostata.mp3" }
      ]
    },

    /* ---------- Puzzle de imagen: sistema masculino ---------- */
    {
      id: "07b-puzzle-masculino",
      tipo: "puzzleImagen",
      titulo: "Rompecabezas: sistema masculino",
      instruccionTexto: "Tocá dos piezas para intercambiarlas y armar la imagen completa.",
      audioInstr: "audio/07b_instr.mp3",
      audioConfirma: "audio/07b_confirma.mp3",
      imagen: "img/masculino.jpg",
      filas: 2, columnas: 3
    },

    /* ---------- 8. Gametos y fecundación ---------- */
    {
      id: "08-gametos",
      tipo: "narracion",
      titulo: "Gametos y fecundación",
      imagen: "img/08_gametos.jpg",
      texto: "Los óvulos y los espermatozoides son las células reproductoras, también llamadas gametos. Cuando un espermatozoide se une con un óvulo puede producirse la fecundación. Como resultado de esta unión se forma una primera célula llamada cigoto, que comienza a dividirse y a desarrollarse hasta convertirse en un embrión.",
      audioInstr: "audio/08_instr.mp3"
    },

    /* ---------- Video: cómo ocurre el proceso ---------- */
    {
      id: "08b-video",
      tipo: "video",
      titulo: "Mirá cómo ocurre este proceso",
      texto: "Este video muestra de forma simple el proceso de fecundación. Tocá el botón de play para verlo, y cuando termines, tocá Continuar.",
      audioInstr: "audio/08b_instr.mp3",
      youtubeId: "kCrMFOOvuRU",
      vertical: true,
      fuente: "Fuente: YouTube (video educativo)"
    },

    /* ---------- 9. Ordenar: el proceso ---------- */
    {
      id: "09-ordenar-proceso",
      tipo: "ordenar",
      titulo: "Ordená el proceso",
      imagen: "img/08_gametos.jpg",
      instruccionTexto: "Ordená estos pasos del proceso reproductivo, del primero al último.",
      audioInstr: "audio/09_instr.mp3",
      audioConfirma: "audio/09_confirma.mp3",
      audioError: "audio/09_error.mp3",
      pasos: [
        { id: "p1", texto: "El testículo produce espermatozoides y el ovario produce óvulos.", audio: "audio/09_p1.mp3" },
        { id: "p2", texto: "El espermatozoide se une con el óvulo: ocurre la fecundación.", audio: "audio/09_p2.mp3" },
        { id: "p3", texto: "Se forma una primera célula llamada cigoto.", audio: "audio/09_p3.mp3" },
        { id: "p4", texto: "El cigoto comienza a dividirse y a desarrollarse.", audio: "audio/09_p4.mp3" }
      ]
    },

    /* ---------- Rompecabezas de texto: definición de cigoto ---------- */
    {
      id: "09b-rompecabezas-cigoto",
      tipo: "ordenar",
      titulo: "Rompecabezas de ideas: el cigoto",
      imagen: "img/08_gametos.jpg",
      instruccionTexto: "Armá la definición ordenando las palabras, una por una. Recordá: la oración empieza con mayúscula y termina con punto.",
      audioInstr: "audio/09b_instr.mp3",
      audioConfirma: "audio/09b_oracion.mp3",
      audioError: "audio/09b_error.mp3",
      estiloOracion: true,
      pasos: [
        { id: "c1", texto: "El", audio: "audio/09b_c1.mp3" },
        { id: "c2", texto: "cigoto", audio: "audio/09b_c2.mp3" },
        { id: "c3", texto: "es", audio: "audio/09b_c3.mp3" },
        { id: "c4", texto: "la", audio: "audio/09b_c4.mp3" },
        { id: "c5", texto: "primera", audio: "audio/09b_c5.mp3" },
        { id: "c6", texto: "célula", audio: "audio/09b_c6.mp3" },
        { id: "c7", texto: "que", audio: "audio/09b_c7.mp3" },
        { id: "c8", texto: "se", audio: "audio/09b_c8.mp3" },
        { id: "c9", texto: "forma", audio: "audio/09b_c9.mp3" },
        { id: "c10", texto: "cuando", audio: "audio/09b_c10.mp3" },
        { id: "c11", texto: "el", audio: "audio/09b_c11.mp3" },
        { id: "c12", texto: "óvulo", audio: "audio/09b_c12.mp3" },
        { id: "c13", texto: "y", audio: "audio/09b_c13.mp3" },
        { id: "c14", texto: "el", audio: "audio/09b_c14.mp3" },
        { id: "c15", texto: "espermatozoide", audio: "audio/09b_c15.mp3" },
        { id: "c16", texto: "se", audio: "audio/09b_c16.mp3" },
        { id: "c17", texto: "unen.", audio: "audio/09b_c17.mp3" }
      ]
    },

    /* ---------- Sopa de letras: vocabulario de la fecundación ---------- */
    {
      id: "09c-sopa-fecundacion",
      tipo: "sopaLetras",
      titulo: "Sopa de letras: gametos y fecundación",
      instruccionTexto: "Tocá la primera letra y la última letra de cada palabra escondida.",
      audioInstr: "audio/09c_instr.mp3",
      imagen: "img/08_gametos.jpg",
      palabras: [
        { palabra: "CIGOTO", audio: "audio/09c_cigoto.mp3", audioDefinicion: "audio/09c_def_cigoto.mp3",
          definicionTexto: "El cigoto es la primera célula que se forma cuando el óvulo y el espermatozoide se unen." },
        { palabra: "OVULO", audio: "audio/09c_ovulo.mp3", audioDefinicion: "audio/09c_def_ovulo.mp3",
          definicionTexto: "El óvulo es la célula reproductora femenina, producida por los ovarios." },
        { palabra: "GAMETO", audio: "audio/09c_gameto.mp3", audioDefinicion: "audio/09c_def_gameto.mp3",
          definicionTexto: "Los gametos son las células reproductoras: el óvulo y el espermatozoide." },
        { palabra: "EMBRION", audio: "audio/09c_embrion.mp3", audioDefinicion: "audio/09c_def_embrion.mp3",
          definicionTexto: "El embrión es el nuevo ser que se forma y se desarrolla a partir del cigoto." },
        { palabra: "FECUNDACION", audio: "audio/09c_fecundacion.mp3", audioDefinicion: "audio/09c_def_fecundacion.mp3",
          definicionTexto: "La fecundación es la unión del óvulo y el espermatozoide." }
      ]
    },

    /* ---------- 10. Cierre ---------- */
    {
      id: "10-cierre",
      tipo: "cierre",
      titulo: "¡Muy bien! Ya conocés el sistema reproductor",
      imagen: "img/11_cierre.jpg"
    }
  ]
};
