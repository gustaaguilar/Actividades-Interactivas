// ============================================================
// ANÁLISIS SINTÁCTICO DE ORACIONES - 7mo grado
// datos.js - Contenido de todas las pantallas
// Basado en el material entregado por las docentes (fidelidad de
// contenido) + enriquecimiento interactivo multimedial.
// ============================================================

var DATOS = {

  titulo: "Análisis sintáctico de oraciones",
  subtitulo: "Sujeto, predicado, modificadores y objeto directo/indirecto",
  nivel: "Primaria · 7mo grado",

  meta: {
    foto: "assets/img/profe.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    audioCorrecto: "assets/audio/correcto.mp3",
    audioVerdadero: "assets/audio/verdadero.mp3",
    audioFalso: "assets/audio/falso.mp3",
    audioIncorrecto: "assets/audio/incorrecto.mp3"
  },

  pantallas: [

    // ---------- 0. PORTADA ----------
    {
      id: 0,
      tipo: "portada",
      imagen: "assets/img/portada.jpg",
      titulo: "Análisis sintáctico de oraciones",
      subtitulo: "Desarmamos y armamos oraciones: sujeto, predicado y mucho más"
    },

    // ---------- 1. NARRACIÓN ANIMADA: actividad práctica (pizarrón) ----------
    {
      id: 1,
      tipo: "narracionAnimada",
      titulo: "🧩 Desarmando y armando oraciones",
      escenaHtml:
        '<div class="escena-gramatical">' +
          '<div class="eg-fila">' +
            '<div id="eg01-o1" class="zona-noticia eg-bloque">El perro corre.</div>' +
            '<div id="eg01-o2" class="zona-noticia eg-bloque">La maestra explica la lección.</div>' +
            '<div id="eg01-o3" class="zona-noticia eg-bloque">Los alumnos leen un cuento.</div>' +
          '</div>' +
          '<div id="eg01-tarjetas" class="zona-noticia eg-bloque" style="margin-top:6px;">🔀 juega · niño · el · fútbol</div>' +
        '</div>',
      pasos: [
        { targetId: "eg01-o1", texto: "Oración 1", audio: "assets/audio/p01_paso1.mp3" },
        { targetId: "eg01-o2", texto: "Oración 2", audio: "assets/audio/p01_paso2.mp3" },
        { targetId: "eg01-o3", texto: "Oración 3", audio: "assets/audio/p01_paso3.mp3" },
        { targetId: "eg01-tarjetas", texto: "¡A ordenar!", audio: "assets/audio/p01_paso4.mp3" },
        { targetId: null, texto: "", audio: "assets/audio/p01_paso5.mp3" }
      ],
      textoCompleto: "En el pizarrón escribimos tres oraciones simples: \"El perro corre.\", \"La maestra explica la lección.\" y \"Los alumnos leen un cuento.\" Después, en grupos, van a recibir tarjetas con palabras desordenadas (por ejemplo: juega / niño / el / fútbol) para ordenarlas y formar una oración con sentido. Y vamos a reflexionar: ¿qué pasa si cambiamos el orden de las palabras? ¿La oración sigue teniendo sentido? Ahí aparece la idea de función sintáctica: cada palabra cumple un papel dentro de la oración."
    },

    // ---------- 2. ORDENAR SECUENCIA: armamos las 4 oraciones ----------
    {
      id: 2,
      tipo: "ordenarSecuencia",
      titulo: "Trabajo en grupos: ordená las palabras",
      imagen: "assets/img/p02_ordenar.jpg",
      consigna: "Tocá las palabras en el orden correcto para armar cada oración.",
      audio: "assets/audio/p02_consigna.mp3",
      oraciones: [
        {
          items: [{ texto: "El" }, { texto: "niño" }, { texto: "juega" }, { texto: "fútbol." }],
          oracionAudio: "assets/audio/p02_o1_completa.mp3"
        },
        {
          items: [{ texto: "El" }, { texto: "perro" }, { texto: "corre." }],
          oracionAudio: "assets/audio/p02_o2_completa.mp3"
        },
        {
          items: [{ texto: "La" }, { texto: "maestra" }, { texto: "explica" }, { texto: "la" }, { texto: "lección." }],
          oracionAudio: "assets/audio/p02_o3_completa.mp3"
        },
        {
          items: [{ texto: "Los" }, { texto: "alumnos" }, { texto: "leen" }, { texto: "un" }, { texto: "cuento." }],
          oracionAudio: "assets/audio/p02_o4_completa.mp3"
        }
      ]
    },

    // ---------- 3. V/F: reflexión sobre el orden de las palabras ----------
    {
      id: 3,
      tipo: "vf",
      titulo: "¿Sigue teniendo sentido?",
      imagen: "assets/img/p03_reflexion.jpg",
      consigna: "Leé cada afirmación y decidí si es verdadera o falsa.",
      audio: "assets/audio/p03_consigna.mp3",
      afirmaciones: [
        {
          texto: "Si decimos \"Fútbol el niño juega\" en vez de \"El niño juega fútbol\", la oración suena igual de natural.",
          valor: false,
          audio: "assets/audio/p03_af1.mp3",
          justificacion: "Aunque estén las mismas palabras, el orden le da sentido a la oración: en español no cualquier orden funciona igual.",
          audioJustif: "assets/audio/p03_af1_justif.mp3"
        },
        {
          texto: "Cada palabra de una oración cumple una función distinta: por eso no da lo mismo dónde la ubiquemos.",
          valor: true,
          audio: "assets/audio/p03_af2.mp3",
          justificacion: "Exacto: eso se llama función sintáctica. \"El perro\" funciona como sujeto y \"corre\" como predicado, cada uno en su lugar.",
          audioJustif: "assets/audio/p03_af2_justif.mp3"
        },
        {
          texto: "En \"La maestra explica la lección\", si dijéramos \"La lección explica la maestra\", el significado sería exactamente el mismo.",
          valor: false,
          audio: "assets/audio/p03_af3.mp3",
          justificacion: "No es igual: cambia quién hace la acción sobre quién. El orden y la función de cada palabra son claves para el sentido.",
          audioJustif: "assets/audio/p03_af3_justif.mp3"
        }
      ]
    },

    // ---------- 4. NARRACIÓN ANIMADA: recordamos sujeto y predicado ----------
    {
      id: 4,
      tipo: "narracionAnimada",
      titulo: "Recordamos un poco",
      escenaHtml:
        '<div class="escena-gramatical">' +
          '<div class="eg-oracion zona-noticia" id="eg04-oracion">El perro corre.</div>' +
          '<div class="eg-fila">' +
            '<div id="eg04-sujeto" class="zona-noticia eg-bloque">El perro<span class="eg-etiqueta-arriba"></span></div>' +
            '<div id="eg04-predicado" class="zona-noticia eg-bloque">corre.<span class="eg-etiqueta-arriba"></span></div>' +
          '</div>' +
        '</div>',
      pasos: [
        { targetId: "eg04-oracion", texto: "Oración", audio: "assets/audio/p04_paso1.mp3" },
        { targetId: "eg04-sujeto", texto: "Sujeto: ¿quién?", audio: "assets/audio/p04_paso2.mp3" },
        { targetId: "eg04-predicado", texto: "Predicado: ¿qué hace?", audio: "assets/audio/p04_paso3.mp3" },
        { targetId: null, texto: "", audio: "assets/audio/p04_paso4.mp3" }
      ],
      textoCompleto: "Una oración es un conjunto de palabras con sentido propio y completo. El sujeto es de quién hablamos en la oración: responde a la pregunta ¿quién? El predicado es lo que se dice del sujeto: responde a la pregunta ¿qué hace? En \"El perro corre\", el sujeto es \"El perro\" y el predicado es \"corre\"."
    },

    // ---------- 5. NARRACIÓN ANIMADA: O.B y O.U ----------
    {
      id: 5,
      tipo: "narracionAnimada",
      titulo: "Oración bimembre y oración unimembre",
      escenaHtml:
        '<div class="escena-gramatical">' +
          '<div class="eg-fila">' +
            '<div id="eg05-bimembre" class="zona-noticia eg-bloque">El perro corre. → O.B</div>' +
            '<div id="eg05-unimembre1" class="zona-noticia eg-bloque">¡Buenos días! → O.U</div>' +
            '<div id="eg05-unimembre2" class="zona-noticia eg-bloque">Llueve. → O.U</div>' +
          '</div>' +
        '</div>',
      pasos: [
        { targetId: "eg05-bimembre", texto: "O.B", audio: "assets/audio/p05_paso1.mp3" },
        { targetId: "eg05-unimembre1", texto: "O.U", audio: "assets/audio/p05_paso2.mp3" },
        { targetId: "eg05-unimembre2", texto: "O.U", audio: "assets/audio/p05_paso3.mp3" },
        { targetId: null, texto: "", audio: "assets/audio/p05_paso4.mp3" }
      ],
      textoCompleto: "Cuando una oración se puede dividir en sujeto y predicado, la llamamos oración bimembre y la abreviamos O.B. Por ejemplo: \"El perro corre\" (sujeto: El perro / predicado: corre). Cuando una oración NO se puede dividir en sujeto y predicado, la llamamos oración unimembre y la abreviamos O.U. Por ejemplo: \"¡Buenos días!\" o \"Llueve.\", típica de los fenómenos climáticos. De ahora en más, cada vez que analicemos una oración, primero vamos a decir si es O.B o O.U."
    },

    // ---------- 6. CLASIFICAR 2 COLUMNAS: O.B vs O.U ----------
    {
      id: 6,
      tipo: "clasificar2col",
      titulo: "Clasificamos: O.B o O.U",
      imagen: "assets/img/p06_clima.jpg",
      consigna: "Tocá una oración y después la columna que corresponda.",
      audio: "assets/audio/p06_consigna.mp3",
      columnas: ["Oración Bimembre (O.B)", "Oración Unimembre (O.U)"],
      items: [
        { texto: "El efecto invernadero provoca daños en la atmósfera.", columna: 0, audio: "assets/audio/p06_i1.mp3", audioConfirma: "assets/audio/p06_i1_confirma.mp3" },
        { texto: "La acción conjunta del gobierno es clave para proteger nuestro planeta.", columna: 0, audio: "assets/audio/p06_i2.mp3", audioConfirma: "assets/audio/p06_i2_confirma.mp3" },
        { texto: "Estos gases permiten que los rayos del sol entren al planeta.", columna: 0, audio: "assets/audio/p06_i3.mp3", audioConfirma: "assets/audio/p06_i3_confirma.mp3" },
        { texto: "El cambio climático es una transformación a largo plazo.", columna: 0, audio: "assets/audio/p06_i4.mp3", audioConfirma: "assets/audio/p06_i4_confirma.mp3" },
        { texto: "¡Cuidemos el planeta!", columna: 1, audio: "assets/audio/p06_i5.mp3", audioConfirma: "assets/audio/p06_i5_confirma.mp3" },
        { texto: "Llueve.", columna: 1, audio: "assets/audio/p06_i6.mp3", audioConfirma: "assets/audio/p06_i6_confirma.mp3" }
      ]
    },

    // ---------- 7. ETIQUETAR: sujeto/predicado en las 4 oraciones ----------
    {
      id: 7,
      tipo: "etiquetar",
      titulo: "Analizamos: sujeto y predicado",
      imagen: "assets/img/p06_clima.jpg",
      consigna: "Tocá cada parte de la oración y asignale su etiqueta.",
      audio: "assets/audio/p07_consigna.mp3",
      etiquetas: [
        { codigo: "suj", nombre: "Sujeto", color: "#2f9e56" },
        { codigo: "pred", nombre: "Predicado", color: "#2f5fb3" }
      ],
      oraciones: [
        {
          chips: [
            { texto: "El efecto invernadero", tag: "suj" },
            { texto: "provoca daños en la atmósfera.", tag: "pred" }
          ],
          audioIntro: "assets/audio/p07_o1_intro.mp3",
          audioCierre: "assets/audio/p07_o1_cierre.mp3"
        },
        {
          // Predicado primero (a propósito): si el sujeto fuera siempre el
          // primer tramo de la oración, se podría "adivinar" por posición
          // sin analizar. "Es clave para proteger nuestro planeta X" es una
          // construcción válida y natural en español (predicado nominal con
          // sujeto pospuesto, como en "Es importante la puntualidad").
          chips: [
            { texto: "Es clave para proteger nuestro planeta", tag: "pred" },
            { texto: "la acción conjunta del gobierno.", tag: "suj" }
          ],
          audioIntro: "assets/audio/p07_o2_intro.mp3",
          audioCierre: "assets/audio/p07_o2_cierre.mp3"
        },
        {
          chips: [
            { texto: "Estos gases", tag: "suj" },
            { texto: "permiten que los rayos del sol entren al planeta.", tag: "pred" }
          ],
          audioIntro: "assets/audio/p07_o3_intro.mp3",
          audioCierre: "assets/audio/p07_o3_cierre.mp3"
        },
        {
          // Predicado primero (a propósito, ver oración 2 más arriba):
          // evita que el sujeto quede siempre primero y se pueda
          // "adivinar" por posición sin analizar.
          chips: [
            { texto: "Es una transformación a largo plazo", tag: "pred" },
            { texto: "el cambio climático.", tag: "suj" }
          ],
          audioIntro: "assets/audio/p07_o4_intro.mp3",
          audioCierre: "assets/audio/p07_o4_cierre.mp3"
        }
      ]
    },

    // ---------- 8. NARRACIÓN ANIMADA: elementos de la oración ----------
    {
      id: 8,
      tipo: "narracionAnimada",
      titulo: "Seguimos aprendiendo: elementos de la oración",
      escenaHtml:
        '<div class="escena-gramatical">' +
          '<div class="eg-fila">' +
            '<div id="eg08-sujeto" class="zona-noticia eg-bloque">SUJETO<br><small>núcleo + MD, MI, aposición</small></div>' +
            '<div id="eg08-predicado" class="zona-noticia eg-bloque">PREDICADO<br><small>núcleo + OD, OI, CC, atributo…</small></div>' +
          '</div>' +
        '</div>',
      pasos: [
        { targetId: null, texto: "", audio: "assets/audio/p08_paso1.mp3" },
        { targetId: "eg08-sujeto", texto: "Modificadores del sujeto", audio: "assets/audio/p08_paso2.mp3" },
        { targetId: "eg08-predicado", texto: "Modificadores del predicado", audio: "assets/audio/p08_paso3.mp3" },
        { targetId: null, texto: "", audio: "assets/audio/p08_paso4.mp3" }
      ],
      textoCompleto: "Todas las oraciones tienen dos partes principales: el sujeto y el predicado. El sujeto tiene un núcleo, la palabra más importante, y puede tener modificadores: modificador directo, modificador indirecto y aposición. El predicado tiene un núcleo, que es el verbo, y también puede tener modificadores: objeto directo, objeto indirecto, complementos circunstanciales, complemento agente, complemento de régimen, atributo y complemento predicativo. Hoy vamos a conocer de cerca los modificadores del sujeto y, más adelante, el objeto directo y el objeto indirecto del predicado."
    },

    // ---------- 9. NARRACIÓN ANIMADA: modificadores del sujeto ----------
    {
      id: 9,
      tipo: "narracionAnimada",
      titulo: "Modificadores del sujeto",
      escenaHtml:
        '<div class="escena-gramatical">' +
          '<div class="eg-fila">' +
            '<div id="eg09-md" class="zona-noticia eg-bloque">La hacendosa<span class="eg-etiqueta-arriba">MD · MD</span></div>' +
            '<div id="eg09-n" class="zona-noticia eg-bloque">mamá<span class="eg-etiqueta-arriba">N</span></div>' +
            '<div id="eg09-mi" class="zona-noticia eg-bloque">de Juan<span class="eg-etiqueta-arriba">MI</span></div>' +
            '<div id="eg09-apos" class="zona-noticia eg-bloque">María Elena<span class="eg-etiqueta-arriba">Aposición</span></div>' +
            '<div id="eg09-pred" class="zona-noticia eg-bloque">lava la ropa.<span class="eg-etiqueta-arriba">Predicado</span></div>' +
          '</div>' +
        '</div>',
      pasos: [
        { targetId: "eg09-md", texto: "MD", audio: "assets/audio/p09_paso1.mp3" },
        { targetId: "eg09-mi", texto: "MI", audio: "assets/audio/p09_paso2.mp3" },
        { targetId: "eg09-apos", texto: "Aposición", audio: "assets/audio/p09_paso3.mp3" },
        { targetId: "eg09-n", texto: "Núcleo", audio: "assets/audio/p09_paso4.mp3" },
        { targetId: null, texto: "", audio: "assets/audio/p09_paso5.mp3" }
      ],
      textoCompleto: "El modificador directo, o MD, es el artículo o el adjetivo que se une directamente al núcleo del sujeto y concuerda con él en género y número. El modificador indirecto, o MI, es la construcción formada por un término unido al núcleo por medio de un subordinante, casi siempre la palabra \"de\". La aposición es la construcción que acompaña al núcleo y puede intercambiar de función con él. Por ejemplo: \"La hacendosa mamá de Juan, María Elena, lava la ropa\": \"La\" y \"hacendosa\" son MD, \"mamá\" es el núcleo, \"de Juan\" es MI y \"María Elena\" es una aposición."
    },

    // ---------- 10. ETIQUETAR: practicar MD / MI / N / Aposición ----------
    {
      id: 10,
      tipo: "etiquetar",
      titulo: "Practicamos los modificadores del sujeto",
      imagen: "assets/img/p10_familia.jpg",
      imagenGrande: true,
      consigna: "Tocá cada palabra del sujeto y asignale MD, MI, N o Aposición.",
      audio: "assets/audio/p10_consigna.mp3",
      etiquetas: [
        { codigo: "md", nombre: "MD", color: "#e07a3f" },
        { codigo: "n", nombre: "Núcleo", color: "#2f5fb3" },
        { codigo: "mi", nombre: "MI", color: "#c0392b" },
        { codigo: "apos", nombre: "Aposición", color: "#7c4fd1" }
      ],
      oraciones: [
        {
          chips: [
            { texto: "La", tag: "md" }, { texto: "hacendosa", tag: "md" },
            { texto: "mamá", tag: "n" }, { texto: "de Juan,", tag: "mi" },
            { texto: "María Elena,", tag: "apos" }, { texto: "lava la ropa.", tag: null }
          ],
          audioIntro: "assets/audio/p10_o1_intro.mp3",
          audioCierre: "assets/audio/p10_o1_cierre.mp3"
        },
        {
          chips: [
            { texto: "El", tag: "md" }, { texto: "simpático", tag: "md" },
            { texto: "perro", tag: "n" }, { texto: "de Martina,", tag: "mi" },
            { texto: "Rocky,", tag: "apos" }, { texto: "ladra fuerte.", tag: null }
          ],
          imagen: "assets/img/p10_perro.jpg",
          audioIntro: "assets/audio/p10_o2_intro.mp3",
          audioCierre: "assets/audio/p10_o2_cierre.mp3"
        },
        {
          chips: [
            { texto: "La", tag: "md" }, { texto: "nueva", tag: "md" },
            { texto: "maestra", tag: "n" }, { texto: "de séptimo,", tag: "mi" },
            { texto: "la seño María,", tag: "apos" }, { texto: "explica bien.", tag: null }
          ],
          imagen: "assets/img/p10_maestra.jpg",
          audioIntro: "assets/audio/p10_o3_intro.mp3",
          audioCierre: "assets/audio/p10_o3_cierre.mp3"
        }
      ]
    },

    // ---------- 11. NARRACIÓN ANIMADA: objeto directo y objeto indirecto ----------
    {
      id: 11,
      tipo: "narracionAnimada",
      titulo: "Objeto directo y objeto indirecto",
      imagen: "assets/img/p11_pronombres.jpg",
      escenaHtml:
        '<table class="tabla-referencia">' +
          '<tr><th>Pronombre personal</th><th>Objeto directo (OD)</th><th>Objeto indirecto (OI)</th></tr>' +
          '<tr><td>Yo</td><td>me</td><td>me</td></tr>' +
          '<tr><td>Tú</td><td>te</td><td>te</td></tr>' +
          '<tr><td>Él / Ella / usted</td><td>lo / la</td><td>le</td></tr>' +
          '<tr><td>Nosotros</td><td>nos</td><td>nos</td></tr>' +
          '<tr><td>Ustedes / ellos / ellas</td><td>los / las</td><td>les</td></tr>' +
        '</table>',
      pasos: [
        { targetId: null, texto: "", audio: "assets/audio/p11_paso1.mp3" },
        { targetId: null, texto: "", audio: "assets/audio/p11_paso2.mp3" }
      ],
      textoCompleto: "El objeto directo (OD) recibe la acción del verbo en forma directa y responde a la pregunta ¿qué? Sus pronombres son: me, te, lo, la, nos, los, las. El objeto indirecto (OI) generalmente se refiere a personas, casi siempre va acompañado de la palabra \"a\" y responde a la pregunta ¿a quién? Sus pronombres son: me, te, le, nos, les."
    },

    // ---------- 12. ASOCIAR: pronombres personales ↔ OD ----------
    {
      id: 12,
      tipo: "asociar",
      titulo: "Unimos: pronombre personal y objeto directo",
      imagen: "assets/img/p11_pronombres.jpg",
      consigna: "Tocá un pronombre personal y después su pronombre de objeto directo.",
      audio: "assets/audio/p12_consigna.mp3",
      etiquetaEjemplo: "Pronombre de objeto directo",
      pares: [
        { izq: "Yo", audioIzq: "assets/audio/p12_izq1.mp3", der: "me", audioDer: "assets/audio/p12_der1.mp3",
          ejemplo: { texto: "Mamá me llama para cenar.", pronombre: "me", audio: "assets/audio/p12_ej1.mp3" } },
        { izq: "Tú", audioIzq: "assets/audio/p12_izq2.mp3", der: "te", audioDer: "assets/audio/p12_der2.mp3",
          ejemplo: { texto: "La profesora te felicita por la tarea.", pronombre: "te", audio: "assets/audio/p12_ej2.mp3" } },
        { izq: "Él / usted", audioIzq: "assets/audio/p12_izq3.mp3", der: "lo", audioDer: "assets/audio/p12_der3.mp3",
          ejemplo: { texto: "Empecé el cuento anoche y lo terminé hoy.", pronombre: "lo", audio: "assets/audio/p12_ej3.mp3" } },
        { izq: "Ella", audioIzq: "assets/audio/p12_izq4.mp3", der: "la", audioDer: "assets/audio/p12_der4.mp3",
          ejemplo: { texto: "Vi a mi hermana en el recreo y la saludé.", pronombre: "la", audio: "assets/audio/p12_ej4.mp3" } },
        { izq: "Nosotros", audioIzq: "assets/audio/p12_izq5.mp3", der: "nos", audioDer: "assets/audio/p12_der5.mp3",
          ejemplo: { texto: "La directora nos felicitó por el proyecto.", pronombre: "nos", audio: "assets/audio/p12_ej5.mp3" } },
        { izq: "Ustedes / ellos", audioIzq: "assets/audio/p12_izq6.mp3", der: "los", audioDer: "assets/audio/p12_der6.mp3",
          ejemplo: { texto: "Invité a mis amigos y los llevé al cine.", pronombre: "los", audio: "assets/audio/p12_ej6.mp3" } }
      ]
    },

    // ---------- 13. ASOCIAR: pronombres personales ↔ OI ----------
    {
      id: 13,
      tipo: "asociar",
      titulo: "Unimos: pronombre personal y objeto indirecto",
      imagen: "assets/img/p11_pronombres.jpg",
      consigna: "Tocá un pronombre personal y después su pronombre de objeto indirecto.",
      audio: "assets/audio/p13_consigna.mp3",
      etiquetaEjemplo: "Pronombre de objeto indirecto",
      pares: [
        { izq: "Yo", audioIzq: "assets/audio/p13_izq1.mp3", der: "me", audioDer: "assets/audio/p13_der1.mp3",
          ejemplo: { texto: "Mi tía me regaló un cuento.", pronombre: "me", audio: "assets/audio/p13_ej1.mp3" } },
        { izq: "Tú", audioIzq: "assets/audio/p13_izq2.mp3", der: "te", audioDer: "assets/audio/p13_der2.mp3",
          ejemplo: { texto: "El profesor te explicó el ejercicio.", pronombre: "te", audio: "assets/audio/p13_ej2.mp3" } },
        { izq: "Él / ella / usted", audioIzq: "assets/audio/p13_izq3.mp3", der: "le", audioDer: "assets/audio/p13_der3.mp3",
          ejemplo: { texto: "Le presté mi lápiz a mi compañero.", pronombre: "le", audio: "assets/audio/p13_ej3.mp3" } },
        { izq: "Nosotros", audioIzq: "assets/audio/p13_izq4.mp3", der: "nos", audioDer: "assets/audio/p13_der4.mp3",
          ejemplo: { texto: "La maestra nos entregó las notas.", pronombre: "nos", audio: "assets/audio/p13_ej4.mp3" } },
        { izq: "Ustedes / ellos / ellas", audioIzq: "assets/audio/p13_izq5.mp3", der: "les", audioDer: "assets/audio/p13_der5.mp3",
          ejemplo: { texto: "Les conté la noticia a mis amigos.", pronombre: "les", audio: "assets/audio/p13_ej5.mp3" } }
      ]
    },

    // ---------- 14. CLASIFICAR 2 COLUMNAS: OD vs OI ----------
    {
      id: 14,
      tipo: "clasificar2col",
      titulo: "Clasificamos: objeto directo u objeto indirecto",
      imagen: "assets/img/p11_pronombres.jpg",
      consigna: "Tocá una oración y después la columna que corresponda.",
      audio: "assets/audio/p14_consigna.mp3",
      columnas: ["Objeto directo (OD)", "Objeto indirecto (OI)"],
      coloresColumnas: ["#2f9e56", "#7c4fd1"],
      items: [
        { texto: "Ayer hice un examen, lo hice a las doce.", columna: 0, audio: "assets/audio/p14_i1.mp3", audioConfirma: "assets/audio/p14_i1_confirma.mp3",
          resaltar: ["un examen", "lo"], etiquetaObjeto: "OD" },
        { texto: "Le di un abrazo a mi papá.", columna: 1, audio: "assets/audio/p14_i2.mp3", audioConfirma: "assets/audio/p14_i2_confirma.mp3",
          resaltar: ["Le", "a mi papá"], etiquetaObjeto: "OI" },
        { texto: "Martín compró un celular, lo compró por internet.", columna: 0, audio: "assets/audio/p14_i3.mp3", audioConfirma: "assets/audio/p14_i3_confirma.mp3",
          resaltar: ["un celular", "lo"], etiquetaObjeto: "OD" },
        { texto: "Saúl le regaló una rosa a su novia.", columna: 1, audio: "assets/audio/p14_i4.mp3", audioConfirma: "assets/audio/p14_i4_confirma.mp3",
          resaltar: ["le", "a su novia"], etiquetaObjeto: "OI" },
        { texto: "Carmen conoce ese libro, lo leyó cuando era niña.", columna: 0, audio: "assets/audio/p14_i5.mp3", audioConfirma: "assets/audio/p14_i5_confirma.mp3",
          resaltar: ["ese libro", "lo"], etiquetaObjeto: "OD" },
        { texto: "Carlos les leyó un cuento a sus hijos antes de dormir.", columna: 1, audio: "assets/audio/p14_i6.mp3", audioConfirma: "assets/audio/p14_i6_confirma.mp3",
          resaltar: ["les", "a sus hijos"], etiquetaObjeto: "OI" }
      ]
    },

    // ---------- 15. V/F: posición del pronombre de objeto directo ----------
    {
      id: 15,
      tipo: "vf",
      titulo: "¿Dónde va el pronombre?",
      imagen: "assets/img/p11_pronombres.jpg",
      consigna: "Leé cada afirmación y decidí si es verdadera o falsa.",
      audio: "assets/audio/p15_consigna.mp3",
      afirmaciones: [
        {
          texto: "En \"Voy a llamarla en la tarde\", el pronombre \"la\" está unido al verbo en infinitivo.",
          valor: true,
          audio: "assets/audio/p15_af1.mp3",
          justificacion: "Correcto: cuando el verbo está en infinitivo (llamar), el pronombre se escribe unido al final: llamarla.",
          audioJustif: "assets/audio/p15_af1_justif.mp3"
        },
        {
          texto: "En \"Estoy haciéndolas ahora\", el pronombre \"las\" va antes del verbo conjugado.",
          valor: false,
          audio: "assets/audio/p15_af2.mp3",
          justificacion: "En realidad va unido al gerundio (haciendo + las = haciéndolas), no antes de un verbo conjugado.",
          audioJustif: "assets/audio/p15_af2_justif.mp3"
        },
        {
          texto: "En \"Ayer compré plátanos, los compré en el supermercado\", el pronombre \"los\" aparece antes del verbo conjugado.",
          valor: true,
          audio: "assets/audio/p15_af3.mp3",
          justificacion: "Así es: cuando el verbo está conjugado, el pronombre se coloca antes, separado: \"los compré\".",
          audioJustif: "assets/audio/p15_af3_justif.mp3"
        }
      ]
    },

    // ---------- 16. MAPA DE ORACIONES: cambio climático en Argentina ----------
    {
      id: 16,
      tipo: "mapaOraciones",
      titulo: "Analizamos oraciones sobre el cambio climático",
      consigna: "Los científicos midieron la latitud y longitud de cada estación meteorológica para estudiar el impacto del calentamiento global. Tocá las provincias resaltadas en el mapa para leer más.",
      audio: "assets/audio/p16_consigna.mp3",
      provincias: [
        {
          key: "mendoza",
          nombre: "Mendoza",
          oracion: "La provincia de Mendoza, ubicada a 32°53′ S y 68°50′ O, enfrenta un aumento del efecto invernadero que afecta sus viñedos.",
          audio: "assets/audio/p16_mendoza.mp3"
        },
        {
          key: "salta",
          nombre: "Salta",
          oracion: "El cambio climático provoca sequías más frecuentes en las regiones del norte de Argentina, especialmente en Salta y Formosa.",
          audio: "assets/audio/p16_salta.mp3"
        },
        {
          key: "formosa",
          nombre: "Formosa",
          oracion: "El cambio climático provoca sequías más frecuentes en las regiones del norte de Argentina, especialmente en Salta y Formosa.",
          audio: "assets/audio/p16_formosa.mp3"
        },
        {
          key: "buenos_aires",
          nombre: "Buenos Aires",
          oracion: "La contaminación industrial aumenta el efecto invernadero en Buenos Aires, lo que incrementa la temperatura promedio anual.",
          audio: "assets/audio/p16_buenosaires.mp3"
        },
        {
          key: "chubut",
          nombre: "Chubut",
          oracion: "En la provincia de Chubut, los glaciares retroceden debido al cambio climático y la variación de las temperaturas locales.",
          audio: "assets/audio/p16_chubut.mp3"
        }
      ]
    },

    // ---------- 17. ETIQUETAR: sujeto/predicado en las 5 oraciones del mapa ----------
    {
      id: 17,
      tipo: "etiquetar",
      titulo: "Analizamos: sujeto y predicado (cambio climático)",
      imagen: "assets/img/p06_clima.jpg",
      consigna: "Tocá cada parte de la oración y asignale su etiqueta.",
      audio: "assets/audio/p17_consigna.mp3",
      etiquetas: [
        { codigo: "suj", nombre: "Sujeto", color: "#2f9e56" },
        { codigo: "pred", nombre: "Predicado", color: "#2f5fb3" }
      ],
      oraciones: [
        {
          chips: [
            { texto: "Los científicos", tag: "suj" },
            { texto: "midieron la latitud y longitud de cada estación meteorológica para estudiar el impacto del calentamiento global.", tag: "pred" }
          ],
          audioIntro: "assets/audio/p17_o1_intro.mp3",
          audioCierre: "assets/audio/p17_o1_cierre.mp3"
        },
        {
          chips: [
            { texto: "La provincia de Mendoza, ubicada a 32°53′ S y 68°50′ O,", tag: "suj" },
            { texto: "enfrenta un aumento del efecto invernadero que afecta sus viñedos.", tag: "pred" }
          ],
          audioIntro: "assets/audio/p17_o2_intro.mp3",
          audioCierre: "assets/audio/p17_o2_cierre.mp3"
        },
        {
          chips: [
            { texto: "El cambio climático", tag: "suj" },
            { texto: "provoca sequías más frecuentes en las regiones del norte de Argentina, especialmente en Salta y Formosa.", tag: "pred" }
          ],
          audioIntro: "assets/audio/p17_o3_intro.mp3",
          audioCierre: "assets/audio/p17_o3_cierre.mp3"
        },
        {
          chips: [
            { texto: "La contaminación industrial", tag: "suj" },
            { texto: "aumenta el efecto invernadero en Buenos Aires, lo que incrementa la temperatura promedio anual.", tag: "pred" }
          ],
          audioIntro: "assets/audio/p17_o4_intro.mp3",
          audioCierre: "assets/audio/p17_o4_cierre.mp3"
        },
        {
          chips: [
            { texto: "En la provincia de Chubut,", tag: null },
            { texto: "los glaciares", tag: "suj" },
            { texto: "retroceden debido al cambio climático y la variación de las temperaturas locales.", tag: "pred" }
          ],
          audioIntro: "assets/audio/p17_o5_intro.mp3",
          audioCierre: "assets/audio/p17_o5_cierre.mp3"
        }
      ]
    },

    // ---------- 18. REPASO FINAL (opción múltiple) ----------
    {
      id: 18,
      tipo: "multiple",
      titulo: "Repaso final",
      imagen: "assets/img/p18_repaso.jpg",
      consigna: "Elegí la respuesta correcta para cada pregunta.",
      audio: "assets/audio/p18_consigna.mp3",
      preguntas: [
        {
          pregunta: "¿Qué es el sujeto de una oración?",
          opciones: ["De quién se habla en la oración", "Lo que se dice del sujeto", "Un artículo o adjetivo", "Un signo de puntuación"],
          correcta: 0,
          audioPregunta: "assets/audio/p18_p1.mp3",
          audioOpciones: ["assets/audio/p18_p1_op1.mp3", "assets/audio/p18_p1_op2.mp3", "assets/audio/p18_p1_op3.mp3", "assets/audio/p18_p1_op4.mp3"]
        },
        {
          pregunta: "¿Qué es el predicado?",
          opciones: ["De quién se habla", "Lo que se dice del sujeto: qué hace", "El núcleo del sujeto", "Un pronombre"],
          correcta: 1,
          audioPregunta: "assets/audio/p18_p2.mp3",
          audioOpciones: ["assets/audio/p18_p2_op1.mp3", "assets/audio/p18_p2_op2.mp3", "assets/audio/p18_p2_op3.mp3", "assets/audio/p18_p2_op4.mp3"]
        },
        {
          pregunta: "¿Cómo se llama la oración que se puede dividir en sujeto y predicado?",
          opciones: ["Oración unimembre (O.U)", "Oración bimembre (O.B)", "Oración compuesta", "Oración interrogativa"],
          correcta: 1,
          audioPregunta: "assets/audio/p18_p3.mp3",
          audioOpciones: ["assets/audio/p18_p3_op1.mp3", "assets/audio/p18_p3_op2.mp3", "assets/audio/p18_p3_op3.mp3", "assets/audio/p18_p3_op4.mp3"]
        },
        {
          pregunta: "El modificador directo (MD) es…",
          opciones: ["Un artículo o adjetivo unido al núcleo del sujeto", "Un término unido al núcleo por un subordinante", "Una construcción que reemplaza al núcleo", "El verbo de la oración"],
          correcta: 0,
          audioPregunta: "assets/audio/p18_p4.mp3",
          audioOpciones: ["assets/audio/p18_p4_op1.mp3", "assets/audio/p18_p4_op2.mp3", "assets/audio/p18_p4_op3.mp3", "assets/audio/p18_p4_op4.mp3"]
        },
        {
          pregunta: "¿Qué caracteriza al modificador indirecto (MI)?",
          opciones: ["Concuerda en género y número con el núcleo", "Está formado por un término unido al núcleo por un subordinante, como \"de\"", "Es siempre el verbo", "No tiene ninguna palabra que lo introduzca"],
          correcta: 1,
          audioPregunta: "assets/audio/p18_p5.mp3",
          audioOpciones: ["assets/audio/p18_p5_op1.mp3", "assets/audio/p18_p5_op2.mp3", "assets/audio/p18_p5_op3.mp3", "assets/audio/p18_p5_op4.mp3"]
        },
        {
          pregunta: "En \"¿Qué perdió Pedro? Su cartera. La perdió en la fiesta\", \"la\" reemplaza a…",
          opciones: ["Un objeto directo: su cartera", "Un objeto indirecto", "El sujeto de la oración", "El predicado completo"],
          correcta: 0,
          audioPregunta: "assets/audio/p18_p6.mp3",
          audioOpciones: ["assets/audio/p18_p6_op1.mp3", "assets/audio/p18_p6_op2.mp3", "assets/audio/p18_p6_op3.mp3", "assets/audio/p18_p6_op4.mp3"]
        },
        {
          pregunta: "El objeto indirecto (OI) casi siempre va acompañado de…",
          opciones: ["La palabra \"de\"", "La palabra \"a\"", "Un artículo", "Un signo de exclamación"],
          correcta: 1,
          audioPregunta: "assets/audio/p18_p7.mp3",
          audioOpciones: ["assets/audio/p18_p7_op1.mp3", "assets/audio/p18_p7_op2.mp3", "assets/audio/p18_p7_op3.mp3", "assets/audio/p18_p7_op4.mp3"]
        }
      ]
    },

    // ---------- 19. CIERRE ----------
    {
      id: 19,
      tipo: "cierre",
      titulo: "¡Muy bien! Terminaste el análisis sintáctico",
      imagen: "assets/img/cierre.jpg",
      texto: "Repasamos el sujeto, el predicado, la oración bimembre y unimembre, los modificadores del sujeto (MD, MI y aposición) y el objeto directo e indirecto del predicado. ¡Seguimos analizando oraciones la próxima clase!",
      audio: "assets/audio/p19_cierre.mp3"
    }

  ]
};
