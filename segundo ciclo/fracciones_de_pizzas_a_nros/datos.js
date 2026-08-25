const DATOS = {
  titulo: "Fracciones: de la pizza a los números",
  pantallas: [

    // ---------- 1. PORTADA ----------
    {
      tipo: "portada",
      titulo: "Fracciones",
      subtitulo: "De la pizza a los números",
      imagen: "assets/images/portada.jpg",
      audio: "assets/audio/portada.mp3"
    },

    // ---------- 2. INTRO: LA PIZZA ----------
    {
      tipo: "narracion",
      titulo: "Una pizza muy repartidora",
      texto: "Imaginate una pizza entera, dividida en 8 porciones iguales. Cada vez que alguien saca una porción, en realidad está sacando una parte de ese entero. A esas partes las llamamos fracciones. Vamos a descubrir juntos cómo se escriben.",
      imagen: "assets/images/pizza_entera.jpg",
      audio: "assets/audio/n02_intro_pizza.mp3"
    },

    // ---------- 3. JUEGO DE LA PIZZA (multiple, 4 preguntas) ----------
    {
      tipo: "multiple",
      titulo: "Jugamos con la pizza",
      instruccion: "La pizza está dividida en 8 porciones. Mirá cuántas porciones sacaron en cada caso y elegí la fracción correcta.",
      audioInstruccion: "assets/audio/m03_instruccion.mp3",
      preguntas: [
        {
          pregunta: "Sacaron 2 porciones de las 8. ¿Qué fracción de la pizza sacaron?",
          audioPregunta: "assets/audio/m03_p1.mp3",
          imagen: "assets/images/pizza_2de8.jpg",
          opciones: ["2/8", "8/2", "6/8", "2/6"],
          correcta: 0,
          audioCorrecta: "assets/audio/m03_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Sacaron 2 de las 8 porciones, por eso es 2 octavos."
        },
        {
          pregunta: "Sacaron 3 porciones de las 8. ¿Qué fracción de la pizza sacaron?",
          audioPregunta: "assets/audio/m03_p2.mp3",
          imagen: "assets/images/pizza_3de8.jpg",
          opciones: ["5/8", "3/8", "3/5", "8/3"],
          correcta: 1,
          audioCorrecta: "assets/audio/m03_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Sacaron 3 de las 8 porciones, por eso es 3 octavos."
        },
        {
          pregunta: "Sacaron 5 porciones de las 8. ¿Qué fracción de la pizza sacaron?",
          audioPregunta: "assets/audio/m03_p3.mp3",
          imagen: "assets/images/pizza_5de8.jpg",
          opciones: ["3/8", "5/3", "5/8", "8/5"],
          correcta: 2,
          audioCorrecta: "assets/audio/m03_p3_correcta.mp3",
          textoCorrecta: "¡Correcto! Sacaron 5 de las 8 porciones, por eso es 5 octavos."
        },
        {
          pregunta: "Sacaron 7 porciones de las 8. ¿Qué fracción de la pizza sacaron?",
          audioPregunta: "assets/audio/m03_p4.mp3",
          imagen: "assets/images/pizza_7de8.jpg",
          opciones: ["7/8", "1/8", "8/7", "7/1"],
          correcta: 0,
          audioCorrecta: "assets/audio/m03_p4_correcta.mp3",
          textoCorrecta: "¡Correcto! Sacaron 7 de las 8 porciones, por eso es 7 octavos. Y quedó solamente 1 porción."
        }
      ]
    },

    // ---------- 4. NUMERADOR Y DENOMINADOR (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "¿Sabías que...?",
      escenaHtml: '<div class="escena-fraccion-grande">' +
        '<span class="fraccion-real fraccion-real-grande">' +
        '<span class="fr-num" id="nd-num">7</span>' +
        '<span class="fr-den" id="nd-den">6</span>' +
        '</span></div>',
      textoCompleto: "Toda fracción tiene dos partes. El <strong>numerador</strong> indica cuántas partes tomás del entero. El <strong>denominador</strong> indica en cuántas partes se dividió el entero.",
      pasos: [
        { audio: "assets/audio/n04_paso1.mp3", texto: "" },
        { audio: "assets/audio/n04_paso2.mp3", texto: "Numerador", targetId: "nd-num" },
        { audio: "assets/audio/n04_paso3.mp3", texto: "Denominador", targetId: "nd-den" }
      ]
    },

    // ---------- 5. PALABRAS A NÚMERO (6 preguntas) ----------
    {
      tipo: "multiple",
      titulo: "De las palabras al número",
      instruccion: "Elegí la fracción que corresponde a cada nombre.",
      audioInstruccion: "assets/audio/m05_instruccion.mp3",
      preguntas: [
        {
          pregunta: "Dos quintos",
          audioPregunta: "assets/audio/m05_p1.mp3",
          figuraFraccion: { num: 2, den: 5 },
          opciones: ["2/5", "5/2", "2/2", "5/5"],
          correcta: 0,
          audioCorrecta: "assets/audio/m05_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Dos quintos tiene el dos como numerador y el cinco como denominador."
        },
        {
          pregunta: "Tres octavos",
          audioPregunta: "assets/audio/m05_p2.mp3",
          figuraFraccion: { num: 3, den: 8 },
          opciones: ["8/3", "3/3", "3/8", "8/8"],
          correcta: 2,
          audioCorrecta: "assets/audio/m05_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Tres octavos tiene el tres como numerador y el ocho como denominador."
        },
        {
          pregunta: "Cuatro medios",
          audioPregunta: "assets/audio/m05_p3.mp3",
          figuraFraccion: { num: 4, den: 2 },
          opciones: ["2/4", "4/4", "4/2", "2/2"],
          correcta: 2,
          audioCorrecta: "assets/audio/m05_p3_correcta.mp3",
          textoCorrecta: "¡Correcto! Cuatro medios tiene el cuatro como numerador y el dos como denominador."
        },
        {
          pregunta: "Seis tercios",
          audioPregunta: "assets/audio/m05_p5.mp3",
          figuraFraccion: { num: 6, den: 3 },
          opciones: ["3/6", "6/3", "6/6", "3/3"],
          correcta: 1,
          audioCorrecta: "assets/audio/m05_p5_correcta.mp3",
          textoCorrecta: "¡Correcto! Seis tercios tiene el seis como numerador y el tres como denominador."
        },
        {
          pregunta: "Cinco sextos",
          audioPregunta: "assets/audio/m05_p4.mp3",
          figuraFraccion: { num: 5, den: 6 },
          opciones: ["6/5", "5/6", "5/5", "6/6"],
          correcta: 1,
          audioCorrecta: "assets/audio/m05_p4_correcta.mp3",
          textoCorrecta: "¡Correcto! Cinco sextos tiene el cinco como numerador y el seis como denominador."
        },
        {
          pregunta: "Nueve octavos",
          audioPregunta: "assets/audio/m07_p6.mp3",
          figuraFraccion: { num: 9, den: 8 },
          opciones: ["8/9", "9/9", "9/8", "8/8"],
          correcta: 2,
          audioCorrecta: "assets/audio/m07_p6_correcta.mp3",
          textoCorrecta: "¡Correcto! Nueve octavos tiene el nueve como numerador y el ocho como denominador."
        }
      ]
    },

    // ---------- 6. COLOREAR FRACCIONES (tanda 1) ----------
    {
      tipo: "colorearFraccion",
      titulo: "Coloreamos fracciones",
      instruccion: "Tocá las partes de cada figura hasta colorear exactamente la fracción indicada. Después tocá Verificar.",
      audioInstruccion: "assets/audio/c08_instruccion.mp3",
      figuras: [
        {
          forma: "rectangulo", partes: 3, numerador: 1, denominador: 3,
          audioConsigna: "assets/audio/c07_f1_consigna.mp3",
          audioCorrecta: "assets/audio/c07_f1_correcta.mp3",
          textoCorrecta: "¡Correcto! Coloreaste un tercio."
        },
        {
          forma: "circulo", partes: 8, numerador: 5, denominador: 8,
          audioConsigna: "assets/audio/c07_f2_consigna.mp3",
          audioCorrecta: "assets/audio/c07_f2_correcta.mp3",
          textoCorrecta: "¡Correcto! Coloreaste cinco octavos."
        },
        {
          forma: "rectangulo", partes: 6, numerador: 4, denominador: 6,
          audioConsigna: "assets/audio/c07_f3_consigna.mp3",
          audioCorrecta: "assets/audio/c07_f3_correcta.mp3",
          textoCorrecta: "¡Correcto! Coloreaste cuatro sextos."
        }
      ]
    },

    // ---------- 8. COLOREAR FRACCIONES (tanda 2) ----------
    {
      tipo: "colorearFraccion",
      titulo: "Coloreamos fracciones",
      instruccion: "Seguimos coloreando. Tocá las partes hasta llegar a la fracción indicada.",
      audioInstruccion: "assets/audio/c09_instruccion.mp3",
      figuras: [
        {
          forma: "circulo", partes: 4, numerador: 4, denominador: 4,
          audioConsigna: "assets/audio/c08_f1_consigna.mp3",
          audioCorrecta: "assets/audio/c08_f1_correcta.mp3",
          textoCorrecta: "¡Correcto! Coloreaste cuatro cuartos, es decir, la figura completa."
        },
        {
          forma: "rectangulo", partes: 3, numerador: 2, denominador: 3,
          audioConsigna: "assets/audio/c08_f2_consigna.mp3",
          audioCorrecta: "assets/audio/c08_f2_correcta.mp3",
          textoCorrecta: "¡Correcto! Coloreaste dos tercios."
        },
        {
          forma: "grilla", partes: 12, numerador: 7, denominador: 12,
          audioConsigna: "assets/audio/c08_f3_consigna.mp3",
          audioCorrecta: "assets/audio/c08_f3_correcta.mp3",
          textoCorrecta: "¡Correcto! Coloreaste siete doceavos."
        }
      ]
    },

    // ---------- 9. ROMPECABEZAS DE FRACCIONES ----------
    {
      tipo: "puzzle",
      titulo: "Armamos el rompecabezas",
      instruccion: "Arrastrá cada pieza hasta su lugar para armar el rompecabezas de fracciones equivalentes.",
      audioInstruccion: "assets/audio/pz_instruccion.mp3",
      audioCompleto: "assets/audio/pz_completo.mp3",
      imagen: "assets/images/puzzle_fracciones.jpg",
      filas: 4,
      columnas: 4,
      seed: 7
    },

    // ---------- 10. FRACCIONES PROPIAS (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "Fracciones propias",
      escenaHtml: '<div class="escena-fraccion-con-figura">' +
        '<span class="fraccion-real fraccion-real-grande">' +
        '<span class="fr-num" id="fp-num">3</span>' +
        '<span class="fr-den" id="fp-den">5</span>' +
        '</span>' +
        '<div class="figura-fraccion-wrap" id="fp-figura"></div></div>',
      figurasFraccion: [{ targetId: "fp-figura", num: 3, den: 5, contiguo: true }],
      textoCompleto: "Las fracciones propias son aquellas donde el numerador es menor que el denominador. Como la parte que tomamos entra dentro del entero, <strong>alcanza con una sola figura para representarlas</strong>.",
      pasos: [
        { audio: "assets/audio/n09_paso1.mp3", texto: "" },
        { audio: "assets/audio/n09_paso2.mp3", texto: "Numerador: 3", targetId: "fp-num" },
        { audio: "assets/audio/n09_paso3.mp3", texto: "3 es menor que 5", targetId: "fp-den" },
        { audio: "assets/audio/n09_paso4.mp3", texto: "Una sola figura alcanza", targetId: "fp-figura" }
      ]
    },

    // ---------- 10. FRACCIONES IMPROPIAS (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "Fracciones impropias",
      escenaHtml: '<div class="escena-fraccion-con-figura">' +
        '<span class="fraccion-real fraccion-real-grande">' +
        '<span class="fr-num" id="fi-num">10</span>' +
        '<span class="fr-den" id="fi-den">6</span>' +
        '</span>' +
        '<div class="figura-fraccion-wrap" id="fi-figura"></div></div>',
      figurasFraccion: [{ targetId: "fi-figura", num: 10, den: 6, contiguo: true }],
      textoCompleto: "Las fracciones impropias son aquellas donde el numerador es mayor que el denominador. Como la parte que tomamos supera al entero, <strong>necesitamos más de una figura para representarla</strong>.",
      pasos: [
        { audio: "assets/audio/n10_paso1.mp3", texto: "" },
        { audio: "assets/audio/n10_paso2.mp3", texto: "Numerador: 10", targetId: "fi-num" },
        { audio: "assets/audio/n10_paso3.mp3", texto: "10 es mayor que 6", targetId: "fi-den" },
        { audio: "assets/audio/n10_paso4.mp3", texto: "Necesitamos más de una figura", targetId: "fi-figura" }
      ]
    },

    // ---------- 11. CLASIFICAR PROPIA / IMPROPIA ----------
    {
      tipo: "clasificar",
      titulo: "Propias e impropias",
      instruccion: "Tocá una fracción para ver su imagen y después ubicala en la categoría que corresponda.",
      audioInstruccion: "assets/audio/cl12_instruccion.mp3",
      mostrarFigura: true,
      categorias: ["Propia", "Impropia"],
      items: [
        { texto: "4/5", categoria: 0, audio: "assets/audio/cl12_i1.mp3", textoConfirmacion: "Cuatro quintos es propia: el cuatro es menor que el cinco." },
        { texto: "1/7", categoria: 0, audio: "assets/audio/cl12_i2.mp3", textoConfirmacion: "Un séptimo es propia: el uno es menor que el siete." },
        { texto: "4/10", categoria: 0, audio: "assets/audio/cl12_i3.mp3", textoConfirmacion: "Cuatro décimos es propia: el cuatro es menor que el diez." },
        { texto: "1/4", categoria: 0, audio: "assets/audio/cl12_i4.mp3", textoConfirmacion: "Un cuarto es propia: el uno es menor que el cuatro." },
        { texto: "3/8", categoria: 0, audio: "assets/audio/cl12_i5.mp3", textoConfirmacion: "Tres octavos es propia: el tres es menor que el ocho." },
        { texto: "11/8", categoria: 1, audio: "assets/audio/cl12_i6.mp3", textoConfirmacion: "Once octavos es impropia: el once es mayor que el ocho." },
        { texto: "10/6", categoria: 1, audio: "assets/audio/cl12_i7.mp3", textoConfirmacion: "Diez sextos es impropia: el diez es mayor que el seis." },
        { texto: "7/3", categoria: 1, audio: "assets/audio/cl12_i8.mp3", textoConfirmacion: "Siete tercios es impropia: el siete es mayor que el tres." }
      ]
    },

    // ---------- 12. IDENTIFICAR PROPIA/IMPROPIA CON IMAGEN (tanda 1) ----------
    {
      tipo: "multiple",
      titulo: "¿Propia o impropia?",
      instruccion: "Mirá la figura dividida y decidí si la fracción que representa es propia o impropia.",
      audioInstruccion: "assets/audio/m13_instruccion.mp3",
      preguntas: [
        {
          pregunta: "Un hexágono dividido en 6 partes, con 2 partes coloreadas: fracción 2/6. ¿Es propia o impropia?",
          audioPregunta: "assets/audio/m13_p1.mp3",
          imagen: "assets/images/hexagono_2_6.jpg",
          opciones: ["Propia", "Impropia"],
          correcta: 0,
          audioCorrecta: "assets/audio/m13_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Dos sextos es propia: el dos es menor que el seis."
        },
        {
          pregunta: "Dos círculos divididos por la mitad, con 3 mitades coloreadas: fracción 3/2. ¿Es propia o impropia?",
          audioPregunta: "assets/audio/m13_p2.mp3",
          imagen: "assets/images/circulos_3_2.jpg",
          opciones: ["Propia", "Impropia"],
          correcta: 1,
          audioCorrecta: "assets/audio/m13_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Tres medios es impropia: el tres es mayor que el dos, por eso hicieron falta dos círculos."
        }
      ]
    },

    // ---------- 13. IDENTIFICAR PROPIA/IMPROPIA CON IMAGEN (tanda 2) ----------
    {
      tipo: "multiple",
      titulo: "¿Propia o impropia?",
      instruccion: "Seguimos identificando fracciones propias e impropias.",
      audioInstruccion: "assets/audio/m14_instruccion.mp3",
      preguntas: [
        {
          pregunta: "Cuatro cuadrados divididos en cuartos, con 13 partes coloreadas: fracción 13/4. ¿Es propia o impropia?",
          audioPregunta: "assets/audio/m14_p1.mp3",
          imagen: "assets/images/cuadrados_13_4.jpg",
          opciones: ["Propia", "Impropia"],
          correcta: 1,
          audioCorrecta: "assets/audio/m14_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Trece cuartos es impropia: el trece es mayor que el cuatro."
        },
        {
          pregunta: "Una grilla dividida en 12 partes, con 8 partes coloreadas: fracción 8/12. ¿Es propia o impropia?",
          audioPregunta: "assets/audio/m14_p2.mp3",
          imagen: "assets/images/grilla_8_12.jpg",
          opciones: ["Propia", "Impropia"],
          correcta: 0,
          audioCorrecta: "assets/audio/m14_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Ocho doceavos es propia: el ocho es menor que el doce."
        }
      ]
    },

    // ---------- 14. REGIÓN SOMBREADA A FRACCIÓN (a, b) ----------
    {
      tipo: "multiple",
      titulo: "¿Qué fracción es?",
      instruccion: "Observá la región sombreada de cada figura y elegí la fracción que representa.",
      audioInstruccion: "assets/audio/m15_instruccion.mp3",
      preguntas: [
        {
          pregunta: "Figura a: cuatro rectángulos divididos por la mitad, con 7 de las 8 mitades coloreadas.",
          audioPregunta: "assets/audio/m15_p1.mp3",
          imagen: "assets/images/sombreada_a.jpg",
          opciones: ["3/4", "4/3", "7/2", "2/7"],
          correcta: 2,
          audioCorrecta: "assets/audio/m15_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Es siete medios: siete mitades coloreadas de cuatro figuras divididas por la mitad."
        },
        {
          pregunta: "Figura b: dos círculos divididos en 4 partes cada uno, con 5 partes coloreadas.",
          audioPregunta: "assets/audio/m15_p2.mp3",
          imagen: "assets/images/sombreada_b.jpg",
          opciones: ["5/4", "4/5", "5/8", "8/5"],
          correcta: 0,
          audioCorrecta: "assets/audio/m15_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Es cinco cuartos: cinco partes coloreadas sobre los cuatro en que se dividió el primer círculo."
        }
      ]
    },

    // ---------- 15. REGIÓN SOMBREADA A FRACCIÓN (c, d) ----------
    {
      tipo: "multiple",
      titulo: "¿Qué fracción es?",
      instruccion: "Seguimos identificando fracciones a partir de la región sombreada.",
      audioInstruccion: "assets/audio/m16_instruccion.mp3",
      preguntas: [
        {
          pregunta: "Figura c: un rectángulo dividido por dos diagonales, con las partes izquierda y derecha coloreadas de 4.",
          audioPregunta: "assets/audio/m16_p1.mp3",
          imagen: "assets/images/sombreada_c.jpg",
          opciones: ["2/4", "4/2", "2/2", "4/4"],
          correcta: 0,
          audioCorrecta: "assets/audio/m16_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Es dos cuartos: dos de las cuatro partes están coloreadas."
        },
        {
          pregunta: "Figura d: una figura dividida en 8 partes iguales, con 3 partes coloreadas.",
          audioPregunta: "assets/audio/m16_p2.mp3",
          imagen: "assets/images/sombreada_d.jpg",
          opciones: ["8/3", "3/3", "3/8", "8/8"],
          correcta: 2,
          audioCorrecta: "assets/audio/m16_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Es tres octavos: tres de las ocho partes están coloreadas."
        }
      ]
    },

    // ---------- 16. ASOCIAR NÚMERO CON PALABRAS ----------
    {
      tipo: "asociar",
      titulo: "Uní cada fracción con su nombre",
      instruccion: "Tocá una fracción y después su nombre correspondiente.",
      audioInstruccion: "assets/audio/a17_instruccion.mp3",
      pares: [
        { izquierda: "3/4", derecha: "Tres cuartos", audio: "assets/audio/a17_par1.mp3" },
        { izquierda: "5/9", derecha: "Cinco novenos", audio: "assets/audio/a17_par2.mp3" },
        { izquierda: "7/2", derecha: "Siete medios", audio: "assets/audio/a17_par3.mp3" },
        { izquierda: "2/10", derecha: "Dos décimos", audio: "assets/audio/a17_par4.mp3" },
        { izquierda: "9/6", derecha: "Nueve sextos", audio: "assets/audio/a17_par5.mp3" }
      ]
    },

    // ---------- 17. ORDENAR FRACCIONES ----------
    {
      tipo: "ordenar",
      titulo: "De menor a mayor",
      instruccion: "Tocá las fracciones en orden, de la menor a la mayor. Cada acierto suma su dibujo abajo.",
      audioInstruccion: "assets/audio/o18_instruccion.mp3",
      audioFelicitacion: "assets/audio/o18_felicitacion.mp3",
      items: [
        { texto: "1/8", orden: 1, audio: "assets/audio/o18_i1.mp3" },
        { texto: "1/4", orden: 2, audio: "assets/audio/o18_i2.mp3" },
        { texto: "1/2", orden: 3, audio: "assets/audio/o18_i3.mp3" },
        { texto: "3/4", orden: 4, audio: "assets/audio/o18_i4.mp3" },
        { texto: "5/4", orden: 5, audio: "assets/audio/o18_i5.mp3" }
      ]
    },

    // ---------- 18. REPASO FINAL: CLASIFICAR MIXTO ----------
    {
      tipo: "clasificar",
      titulo: "Repaso: propias e impropias",
      instruccion: "Tocá una fracción para ver su imagen y después ubicala donde corresponda.",
      audioInstruccion: "assets/audio/cl19_instruccion.mp3",
      mostrarFigura: true,
      categorias: ["Propia", "Impropia"],
      items: [
        { texto: "2/9", categoria: 0, audio: "assets/audio/cl19_i1.mp3", textoConfirmacion: "Dos novenos es propia: el dos es menor que el nueve." },
        { texto: "12/5", categoria: 1, audio: "assets/audio/cl19_i2.mp3", textoConfirmacion: "Doce quintos es impropia: el doce es mayor que el cinco." },
        { texto: "6/6", categoria: 1, audio: "assets/audio/cl19_i3.mp3", textoConfirmacion: "Seis sextos es impropia: el numerador no es menor que el denominador." },
        { texto: "5/11", categoria: 0, audio: "assets/audio/cl19_i4.mp3", textoConfirmacion: "Cinco onceavos es propia: el cinco es menor que el once." },
        { texto: "9/4", categoria: 1, audio: "assets/audio/cl19_i5.mp3", textoConfirmacion: "Nueve cuartos es impropia: el nueve es mayor que el cuatro." },
        { texto: "3/7", categoria: 0, audio: "assets/audio/cl19_i6.mp3", textoConfirmacion: "Tres séptimos es propia: el tres es menor que el siete." }
      ]
    },

    // ---------- 19. DESAFÍO FINAL ----------
    {
      tipo: "multiple",
      titulo: "Desafío final",
      instruccion: "Repasemos todo lo que aprendimos sobre fracciones.",
      audioInstruccion: "assets/audio/m20_instruccion.mp3",
      preguntas: [
        {
          pregunta: "¿Qué indica el numerador de una fracción?",
          audioPregunta: "assets/audio/m20_p1.mp3",
          opciones: ["Cuántas partes tomás del entero", "En cuántas partes se dividió el entero", "El nombre de la fracción", "El total de figuras usadas"],
          correcta: 0,
          audioCorrecta: "assets/audio/m20_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! El numerador indica cuántas partes tomás del entero."
        },
        {
          pregunta: "¿Qué indica el denominador de una fracción?",
          audioPregunta: "assets/audio/m20_p2.mp3",
          opciones: ["Cuántas partes tomás del entero", "En cuántas partes se dividió el entero", "Si la fracción es correcta", "Cuántas figuras dibujar"],
          correcta: 1,
          audioCorrecta: "assets/audio/m20_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! El denominador indica en cuántas partes se dividió el entero."
        },
        {
          pregunta: "En una fracción propia, el numerador es...",
          audioPregunta: "assets/audio/m20_p3.mp3",
          opciones: ["Mayor que el denominador", "Menor que el denominador", "Igual al denominador", "Siempre 1"],
          correcta: 1,
          audioCorrecta: "assets/audio/m20_p3_correcta.mp3",
          textoCorrecta: "¡Correcto! En una fracción propia, el numerador es menor que el denominador."
        },
        {
          pregunta: "¿Por qué una fracción impropia necesita más de una figura para representarse?",
          audioPregunta: "assets/audio/m20_p4.mp3",
          opciones: ["Porque el denominador es muy grande", "Porque la parte que tomamos supera al entero", "Porque siempre son fracciones negativas", "No es cierto, siempre alcanza una figura"],
          correcta: 1,
          audioCorrecta: "assets/audio/m20_p4_correcta.mp3",
          textoCorrecta: "¡Correcto! Como la parte tomada supera al entero, hace falta más de una figura."
        },
        {
          pregunta: "La fracción 9/8, ¿es propia o impropia?",
          audioPregunta: "assets/audio/m20_p5.mp3",
          opciones: ["Propia", "Impropia"],
          correcta: 1,
          audioCorrecta: "assets/audio/m20_p5_correcta.mp3",
          textoCorrecta: "¡Correcto! Nueve octavos es impropia porque el nueve es mayor que el ocho."
        }
      ]
    },

    // ---------- 20. CIERRE ----------
    {
      tipo: "cierre",
      titulo: "¡Terminaste la actividad!",
      imagen: "assets/images/cierre.jpg",
      audio: "assets/audio/cierre.mp3"
    }
  ]
};
