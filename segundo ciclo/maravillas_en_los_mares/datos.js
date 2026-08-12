// ============================================================
// MARAVILLAS EN LOS MARES - Lengua - 5° Grado (Segundo Ciclo)
// Basado en: Mochileritos de la comunicación 5 - DGE Mendoza
// Primera Secuencia - Texto 1 (págs. 7-15)
// VERSIÓN 3 - preguntas secuenciales con audio específico,
//             sopas intercaladas, ordenar palabras con validación
//             inmediata, imágenes de apoyo, asociar con imágenes
// ============================================================

const DATOS = {
  titulo: "Maravillas en los mares",
  subtitulo: "Exploramos un texto expositivo sobre la fauna marina",
  autor: "Profe Gustavo Aguilar · Informática Educativa",
  email: "profegustaaguilar@gmail.com",
  tagline: "Menos prisa, más vida 🧉🫂",

  pantallas: [

    // 1 -------------------------------------------------------
    {
      id: "portada",
      tipo: "portada",
      titulo: "Maravillas en los mares",
      subtitulo: "Exploramos un texto expositivo sobre la fauna marina",
      imagen: "img/portada.jpg",
      audio: "audio/01_portada.mp3",
      textoAudio: "Maravillas en los mares. Te invitamos a explorar un texto expositivo sobre la fauna marina, sus características y su cuidado."
    },

    // 2 -------------------------------------------------------
    {
      id: "bienvenida",
      tipo: "texto",
      titulo: "¡Hola, exploradores!",
      imagen: "img/mochila_bienvenida.jpg",
      audio: "audio/02_bienvenida.mp3",
      textoAudio: "Hola. Bienvenidos a esta nueva aventura de lectura. Vamos a descubrir animales sorprendentes que viven en el mar. Prestá atención a las actividades y no dudes en consultar tus dudas con tu seño.",
      texto: "Bienvenido a esta nueva aventura de lectura. Vamos a descubrir animales sorprendentes que viven en el mar. Vas a leer, comprender, ampliar tu vocabulario y crear tu propia producción escrita."
    },

    // 3 -------------------------------------------------------
    {
      id: "personajes",
      tipo: "personajes",
      titulo: "Nuestros guías",
      audioSecuencia: [
        { audio: "audio/03a_signo.mp3", personajeIdx: 0, textoAudio: "Yo soy Signo de Interrogación, me abro y me cierro siempre que me usan." },
        { audio: "audio/03b_tilde.mp3", personajeIdx: 1, textoAudio: "¡Hola! Soy Tilde, pero mis amigos me dicen Acento." }
      ],
      personajes: [
        { nombre: "Signo de Interrogación", imagen: "img/signo_interrogacion.png", frase: "Yo soy Signo de Interrogación, me abro y me cierro siempre que me usan." },
        { nombre: "Tilde (Acento)", imagen: "img/tilde.png", frase: "¡Hola! Soy Tilde, pero mis amigos me dicen Acento." }
      ]
    },

    // 4 -------------------------------------------------------
    {
      id: "activacion_previa",
      tipo: "reflexionOral",
      titulo: "Antes de leer",
      subtitulo: "Texto 1: “Maravillas en los mares” (Infografía)",
      audio: "audio/04_activacion.mp3",
      textoAudio: "Antes de leer la infografía, pensá y compartí con tus compañeros: ¿de qué creés que va a hablar el texto? ¿Qué animales marinos conocés? ¿Alguna vez viste una infografía? ¿Cómo es?",
      preguntas: [
        "¿De qué creés que va a hablar el texto, según el título?",
        "¿Qué animales marinos conocés?",
        "¿Alguna vez viste una infografía? ¿Cómo es?"
      ]
    },

    // 5 -------------------------------------------------------
    {
      id: "infografia",
      tipo: "imagenGrande",
      titulo: "Maravillas en los mares",
      imagen: "img/infografia_completa.jpg",
      audio: "audio/05_infografia.mp3",
      textoAudio: "Observá con atención esta infografía. En los mares y océanos podemos encontrar una gran variedad de especies de animales. Las ballenas son los animales más grandes que existen. Son vertebrados e integran el grupo de los cetáceos. Los pulpos son invertebrados, pertenecen a la especie de los cefalópodos y tienen ocho tentáculos alrededor de la boca. Las estrellas de mar son invertebrados, de la especie de los equinodermos, con un cuerpo aplanado formado por un disco pentagonal.",
      instruccion: "Escuchá la lectura y observá cada parte de la infografía."
    },

    // 6 -------------------------------------------------------
    {
      id: "opcion_titulo",
      tipo: "opcionMultiple",
      titulo: "¿Cuál es el título?",
      audio: "audio/06_titulo.mp3",
      textoAudio: "Marcá cuál de las siguientes opciones es el título de la infografía que acabás de observar.",
      pregunta: "¿Cuál de estas opciones es el título de la infografía?",
      opciones: [
        { texto: "Animales del zoológico", correcta: false },
        { texto: "Maravillas en los mares", correcta: true },
        { texto: "La vida en la montaña", correcta: false }
      ],
      feedbackCorrecto: "¡Correcto! Ese es el título de nuestra infografía.",
      feedbackIncorrecto: "Revisá de nuevo la infografía y volvé a intentar.",
      audioCorrecto: "audio/06b_acierto.mp3",
      puntuable: true
    },

    // 7 -------------------------------------------------------
    {
      id: "significado_maravilla",
      tipo: "opcionMultiple",
      titulo: "¿Qué significa “maravilla”?",
      audio: "audio/07_maravilla.mp3",
      textoAudio: "Marcá la opción correcta. ¿Cuál es el significado de la palabra maravilla?",
      pregunta: "¿Cuál de los siguientes es el significado de la palabra “maravilla”?",
      opciones: [
        { texto: "Suceso o cosa breve que se puede medir", correcta: false },
        { texto: "Suceso o cosa extraordinaria que causa admiración", correcta: true },
        { texto: "Suceso o cosa pequeña que es difícil de ver", correcta: false }
      ],
      feedbackCorrecto: "¡Muy bien! Maravilla es algo extraordinario que causa admiración.",
      feedbackIncorrecto: "Pensalo de nuevo: ¿qué sentimos cuando algo nos maravilla?",
      audioCorrecto: "audio/07b_acierto.mp3",
      puntuable: true
    },

    // 8 -------------------------------------------------------
    {
      id: "sabias_que_infografia",
      tipo: "sabiasQue",
      titulo: "¿Sabías qué...?",
      imagen: "img/tilde.png",
      imagenContenido: "img/infografia_completa.jpg",
      audio: "audio/08_sabiasque.mp3",
      textoAudio: "Sabías que una infografía es un texto que explica de manera clara un tema. Combina imágenes con fragmentos escritos. Lo importante es que todo brinda información.",
      texto: "Una infografía es un texto que explica de manera clara un tema. Combina imágenes con fragmentos escritos. Lo importante es que todo brinda información."
    },

    // 9 ------------------------------------------------------- (AJUSTE v3: secuencial, audio de pregunta + audio de acierto específico por animal)
    {
      id: "tabla_animales",
      tipo: "opcionMultipleGrupo",
      modoDisplay: "reemplazar",
      titulo: "Datos de cada animal",
      audio: "audio/09_tabla.mp3",
      textoAudio: "Elegí la opción que describe correctamente a cada animal, según la infografía.",
      preguntas: [
        {
          texto: "¿Cuál de estas opciones describe a la BALLENA?",
          imagen: "img/icono_ballena.png",
          audioPregunta: "audio/tabla_p_ballena.mp3",
          textoAudioPregunta: "¿Cuál de estas opciones describe correctamente a la ballena?",
          opciones: [
            { texto: "Mamífero marino, muy grande, sangre caliente", correcta: true },
            { texto: "Invertebrado, cefalópodo, ocho tentáculos", correcta: false },
            { texto: "Equinodermo, disco pentagonal", correcta: false }
          ],
          audioCorrecto: "audio/tabla_c_ballena.mp3",
          textoAudioCorrecto: "Correcto. La ballena es un mamífero marino, muy grande, con sangre caliente."
        },
        {
          texto: "¿Cuál de estas opciones describe al PULPO?",
          imagen: "img/icono_pulpo.png",
          audioPregunta: "audio/tabla_p_pulpo.mp3",
          textoAudioPregunta: "¿Cuál de estas opciones describe correctamente al pulpo?",
          opciones: [
            { texto: "Invertebrado, cefalópodo, ocho tentáculos, cambia de color", correcta: true },
            { texto: "Mamífero marino, respira por pulmones", correcta: false },
            { texto: "Cetáceo, el animal más grande que existe", correcta: false }
          ],
          audioCorrecto: "audio/tabla_c_pulpo.mp3",
          textoAudioCorrecto: "Correcto. El pulpo es un invertebrado cefalópodo, tiene ocho tentáculos y cambia de color."
        },
        {
          texto: "¿Cuál de estas opciones describe a la ESTRELLA DE MAR?",
          imagen: "img/icono_estrella.png",
          audioPregunta: "audio/tabla_p_estrella.mp3",
          textoAudioPregunta: "¿Cuál de estas opciones describe correctamente a la estrella de mar?",
          opciones: [
            { texto: "Invertebrado, equinodermo, disco pentagonal", correcta: true },
            { texto: "Mamífero marino, sangre caliente", correcta: false },
            { texto: "Cefalópodo, ocho tentáculos", correcta: false }
          ],
          audioCorrecto: "audio/tabla_c_estrella.mp3",
          textoAudioCorrecto: "Correcto. La estrella de mar es un invertebrado equinodermo, con un disco pentagonal."
        }
      ],
      puntuable: true
    },

    // 10 ------------------------------------------------------ (AJUSTE v3: secuencial, audio de pregunta + audio de acierto específico)
    {
      id: "preguntas_infografia",
      tipo: "opcionMultipleGrupo",
      modoDisplay: "reemplazar",
      titulo: "Respondé sobre el texto",
      audio: "audio/10_preguntas.mp3",
      textoAudio: "Elegí la opción correcta para cada pregunta sobre la infografía.",
      preguntas: [
        {
          texto: "Además de los mencionados, ¿qué otro animal podría vivir en el fondo del mar?",
          audioPregunta: "audio/preg_p1.mp3",
          textoAudioPregunta: "Además de los mencionados, ¿qué otro animal podría vivir en el fondo del mar?",
          opciones: [
            { texto: "Cangrejo", correcta: true },
            { texto: "León", correcta: false },
            { texto: "Águila", correcta: false }
          ],
          audioCorrecto: "audio/preg_c1.mp3",
          textoAudioCorrecto: "Correcto. El cangrejo también es un animal que vive en el fondo del mar."
        },
        {
          texto: "Según la infografía, ¿cómo atrapa el pulpo a sus presas?",
          audioPregunta: "audio/preg_p2.mp3",
          textoAudioPregunta: "Según la infografía, ¿cómo atrapa el pulpo a sus presas?",
          opciones: [
            { texto: "Con las ventosas de sus tentáculos", correcta: true },
            { texto: "Con dientes muy filosos", correcta: false },
            { texto: "Con una red que fabrica", correcta: false }
          ],
          audioCorrecto: "audio/preg_c2.mp3",
          textoAudioCorrecto: "Correcto. El pulpo atrapa a sus presas con las ventosas de sus tentáculos."
        },
        {
          texto: "¿Para qué creés que los pulpos cambian de color?",
          audioPregunta: "audio/preg_p3.mp3",
          textoAudioPregunta: "¿Para qué creés que los pulpos cambian de color?",
          opciones: [
            { texto: "Para camuflarse y protegerse", correcta: true },
            { texto: "Para nadar más rápido", correcta: false },
            { texto: "Para llamar la atención de otros pulpos", correcta: false }
          ],
          audioCorrecto: "audio/preg_c3.mp3",
          textoAudioCorrecto: "Correcto. Los pulpos cambian de color para camuflarse y protegerse."
        },
        {
          texto: "¿Qué peligros enfrentan los animales marinos si no cuidamos su ambiente?",
          audioPregunta: "audio/preg_p4.mp3",
          textoAudioPregunta: "¿Qué peligros enfrentan los animales marinos si no cuidamos su ambiente?",
          opciones: [
            { texto: "Contaminación y pérdida de su hábitat", correcta: true },
            { texto: "Demasiada luz solar", correcta: false },
            { texto: "Falta de aire en la superficie", correcta: false }
          ],
          audioCorrecto: "audio/preg_c4.mp3",
          textoAudioCorrecto: "Correcto. Si no cuidamos su hábitat, los animales marinos enfrentan la contaminación y la pérdida de su ambiente natural."
        }
      ],
      puntuable: true
    },

    // 11 ------------------------------------------------------ (AJUSTE: sopa de letras 1 intercalada acá)
    {
      id: "sopa_letras",
      tipo: "sopaLetras",
      titulo: "Buscamos palabras del mar",
      audio: "audio/19_sopa1.mp3",
      textoAudio: "Buscá en la sopa de letras las palabras que aprendimos en este recorrido: ballena, pulpo, estrella, mar, hábitat, infografía.",
      palabras: ["BALLENA", "PULPO", "ESTRELLA", "MAR", "HABITAT", "INFOGRAFIA"],
      filas: 12,
      columnas: 12
    },

    // 12 ------------------------------------------------------
    {
      id: "teoria_comparar",
      tipo: "sabiasQue",
      titulo: "¿Qué significa comparar?",
      imagen: "img/tilde.png",
      comparacionVisual: {
        grande: { imagen: "img/icono_ballena.png", etiqueta: "Ballena (grande)" },
        chico: { imagen: "img/icono_pulpo.png", etiqueta: "Pulpo (mediano)" }
      },
      audio: "audio/11_comparar.mp3",
      textoAudio: "La comparación es una habilidad mental que permite encontrar semejanzas y diferencias entre dos o más elementos, respecto de ciertas características llamadas criterios de comparación. Por ejemplo: la ballena es un mamífero marino, grande, respira aire. El pulpo es un molusco cefalópodo, mediano, tiene ocho brazos. Ambos son animales marinos, esa es una semejanza. Difieren en su tamaño y anatomía, esa es una diferencia.",
      texto: "La comparación es una habilidad mental que permite encontrar semejanzas y diferencias entre dos o más elementos, respecto de ciertas características llamadas “criterios de comparación”.\n\nPor ejemplo: la Ballena es un mamífero marino, grande, respira aire. El Pulpo es un molusco cefalópodo, mediano, tiene 8 brazos. Ambos son animales marinos (semejanza). Difieren en su tamaño y anatomía (diferencia)."
    },

    // 13 ------------------------------------------------------ (AJUSTE v3: secuencial + audio específico + ballena más grande que el perro)
    {
      id: "comparar_mamiferos",
      tipo: "opcionMultipleGrupo",
      modoDisplay: "reemplazar",
      titulo: "Comparamos mamíferos",
      audio: "audio/12_comparar_mamiferos.mp3",
      textoAudio: "Observá las imágenes de un mamífero terrestre y uno marino, y elegí la opción correcta en cada pregunta.",
      imagenesComparacion: [
        { imagen: "img/icono_mamifero_terrestre.png", etiqueta: "Mamífero terrestre", escala: "normal" },
        { imagen: "img/icono_ballena.png", etiqueta: "Mamífero marino", escala: "grande" }
      ],
      preguntas: [
        {
          texto: "¿Qué diferencia a los mamíferos marinos de los terrestres?",
          audioPregunta: "audio/comp_p1.mp3",
          textoAudioPregunta: "¿Qué diferencia a los mamíferos marinos de los terrestres?",
          opciones: [
            { texto: "Los marinos tienen aletas y viven en el agua", correcta: true },
            { texto: "Los marinos tienen pelo largo y patas", correcta: false },
            { texto: "No hay ninguna diferencia entre ellos", correcta: false }
          ],
          audioCorrecto: "audio/comp_c1.mp3",
          textoAudioCorrecto: "Correcto. Los mamíferos marinos tienen aletas y viven en el agua, a diferencia de los terrestres."
        },
        {
          texto: "¿Qué tienen en común un mamífero terrestre y uno marino?",
          audioPregunta: "audio/comp_p2.mp3",
          textoAudioPregunta: "¿Qué tienen en común un mamífero terrestre y uno marino?",
          opciones: [
            { texto: "Ambos son mamíferos, respiran aire y alimentan a sus crías con leche", correcta: true },
            { texto: "Ambos tienen branquias para respirar bajo el agua", correcta: false },
            { texto: "Ambos ponen huevos", correcta: false }
          ],
          audioCorrecto: "audio/comp_c2.mp3",
          textoAudioCorrecto: "Correcto. Ambos son mamíferos: respiran aire y alimentan a sus crías con leche."
        }
      ],
      puntuable: true
    },

    // 14 ------------------------------------------------------ (AJUSTE v3: consigna en una sola línea + validación palabra por palabra)
    {
      id: "vocabulario_invertebrado",
      tipo: "ordenarPalabras",
      titulo: "Vocabulario: invertebrado",
      imagen: "img/icono_estrella.png",
      audio: "audio/13_invertebrado.mp3",
      textoAudio: "Prestá atención a las palabras. Los animales vertebrados se sostienen a través de una columna vertebral. El prefijo in guion significa sin, falta de o ausencia de. Ahora ordená las palabras para armar la definición de invertebrado.",
      pistas: [
        "Los animales vertebrados se sostienen a través de una columna vertebral.",
        "El prefijo in- significa “sin”, “falta de” o “ausencia de”."
      ],
      consigna: "Ordená las palabras para armar la definición (tocá para elegir, volvé a tocar para sacar):",
      palabrasOrden: ["Los", "animales", "invertebrados", "son", "los", "que", "no", "tienen", "columna", "vertebral."],
      audioOracionCompleta: "audio/invertebrado_oracion_completa.mp3",
      puntuable: true
    },

    // 15 ------------------------------------------------------ (AJUSTE: imagen chica de la estrella para visualizar las 5 puntas)
    {
      id: "vocabulario_pentagonal",
      tipo: "opcionMultiple",
      titulo: "Vocabulario: pentagonal",
      imagen: "img/icono_estrella.png",
      audio: "audio/14_pentagonal.mp3",
      textoAudio: "Leé con atención. El prefijo penta guion significa cinco y la base gono significa ángulo. El texto dice: las estrellas de mar poseen un cuerpo formado por un disco pentagonal. Marcá por qué creés que las describe así.",
      contexto: "El prefijo penta- significa ‘cinco’ y la base -gono significa ‘ángulo’.\nEl texto dice: “Las estrellas de mar poseen un cuerpo formado por un disco pentagonal”.",
      pregunta: "¿Por qué creés que las describe así?",
      opciones: [
        { texto: "Porque tiene cinco puntas o brazos", correcta: true },
        { texto: "Porque vive en aguas muy profundas", correcta: false },
        { texto: "Porque cambia de color todo el tiempo", correcta: false }
      ],
      feedbackCorrecto: "¡Exacto! Penta significa cinco, por eso tiene cinco puntas.",
      feedbackIncorrecto: "Pensá qué significa el prefijo “penta”.",
      audioCorrecto: "audio/14b_acierto.mp3",
      puntuable: true
    },

    // 16 ------------------------------------------------------ (AJUSTE: imagen + nombre en cada ítem, audio de acierto por par)
    {
      id: "asociar_clasificacion",
      tipo: "asociar",
      titulo: "Uní según corresponda",
      audio: "audio/15_asociar.mp3",
      textoAudio: "Uní cada animal con su clasificación, según la información que te brinda el texto. Tocá primero el animal y después la clasificación que le corresponde.",
      pares: [
        { izquierda: "Ballena", imagen: "img/icono_ballena.png", derecha: "Cetáceos", audioCorrecto: "audio/asoc_ballena.mp3", textoAudioCorrecto: "Correcto. La ballena es un cetáceo." },
        { izquierda: "Pulpo", imagen: "img/icono_pulpo.png", derecha: "Cefalópodos", audioCorrecto: "audio/asoc_pulpo.mp3", textoAudioCorrecto: "Correcto. El pulpo es un cefalópodo." },
        { izquierda: "Estrella de mar", imagen: "img/icono_estrella.png", derecha: "Equinodermos", audioCorrecto: "audio/asoc_estrella.mp3", textoAudioCorrecto: "Correcto. La estrella de mar es un equinodermo." }
      ],
      instruccion: "Tocá un animal y luego la clasificación que le corresponde."
    },

    // 17 ------------------------------------------------------ (AJUSTE: sopa de letras 2 intercalada acá, cetáceos/cefalópodos/equinodermos recién vistos)
    {
      id: "sopa_letras_2",
      tipo: "sopaLetras",
      titulo: "Buscamos más palabras",
      audio: "audio/20_sopa2.mp3",
      textoAudio: "Ahora buscá estas palabras: cetáceo, cefalópodo, equinodermo, camuflar, tentáculo, manada.",
      palabras: ["CETACEO", "CEFALOPODO", "EQUINODERMO", "CAMUFLAR", "TENTACULO", "MANADA"],
      filas: 14,
      columnas: 14
    },

    // 18 ------------------------------------------------------
    {
      id: "campo_semantico",
      tipo: "clasificar",
      titulo: "Campo semántico",
      audio: "audio/16_campo_semantico_v2.mp3",
      textoAudio: "El campo semántico es un grupo de palabras relacionadas por su significado. Hay una palabra más general que incluye a las demás. Pulsá sobre el grupo correcto. Atención: las palabras que están en mayúscula deberían incluir a las palabras que están entre corchetes.",
      teoria: "El campo semántico es un grupo de palabras relacionadas por su significado. Hay una palabra más general que incluye a las demás.",
      pregunta: "¿Cuál es el grupo correcto?",
      opciones: [
        { texto: "ESTRELLAS DE MAR [mamíferos – pulpos – ballenas]", correcta: false },
        { texto: "ANIMALES MARINOS [pulpos – ballenas – estrellas de mar]", correcta: true },
        { texto: "BALLENAS [mamíferos marinos – pulpos – estrellas de mar]", correcta: false }
      ],
      feedbackCorrecto: "¡Exacto! “Animales marinos” es la palabra general que incluye a las demás.",
      feedbackIncorrecto: "Pensá cuál palabra es lo suficientemente general como para incluir a las otras tres.",
      audioCorrecto: "audio/16b_acierto.mp3",
      puntuable: true
    },

    // 19 ------------------------------------------------------ (AJUSTE v3: secuencial + audio de pregunta + fundamento en el audio de acierto)
    {
      id: "ubicar_peces",
      tipo: "opcionMultipleGrupo",
      modoDisplay: "reemplazar",
      titulo: "¿Dónde ubicamos “peces”?",
      audio: "audio/17_peces.mp3",
      textoAudio: "Si quisiéramos agregar la palabra peces a alguno de los grupos anteriores, ¿dónde la ubicarías? ¿Por qué?",
      preguntas: [
        {
          texto: "¿En qué grupo ubicarías la palabra “peces”?",
          audioPregunta: "audio/peces_p1.mp3",
          textoAudioPregunta: "¿En qué grupo ubicarías la palabra peces?",
          opciones: [
            { texto: "En ANIMALES MARINOS", correcta: true },
            { texto: "En BALLENAS", correcta: false },
            { texto: "En ESTRELLAS DE MAR", correcta: false }
          ],
          audioCorrecto: "audio/peces_c1.mp3",
          textoAudioCorrecto: "Correcto. Los peces se ubican en el grupo de animales marinos."
        },
        {
          texto: "¿Por qué la ubicarías ahí?",
          audioPregunta: "audio/peces_p2.mp3",
          textoAudioPregunta: "¿Por qué la ubicarías ahí?",
          opciones: [
            { texto: "Porque los peces también son animales que viven en el mar", correcta: true },
            { texto: "Porque los peces vuelan igual que las aves", correcta: false },
            { texto: "Porque los peces son mamíferos como la ballena", correcta: false }
          ],
          audioCorrecto: "audio/peces_c2.mp3",
          textoAudioCorrecto: "Correcto. Los peces también son animales que viven en el mar, por eso pertenecen al grupo de animales marinos."
        }
      ],
      puntuable: true
    },

    // 20 ------------------------------------------------------ (AJUSTE v3: una pregunta por vez, se reemplaza; audio específico y completo)
    {
      id: "sinonimos_antonimos",
      tipo: "opcionMultipleGrupo",
      modoDisplay: "reemplazar",
      titulo: "Sinónimos y antónimos",
      audio: "audio/18_sinonimos.mp3",
      textoAudio: "Elegí el sinónimo o el antónimo correcto para cada palabra.",
      preguntas: [
        {
          texto: "Sinónimo de “grande”",
          audioPregunta: "audio/sinant_p1.mp3",
          textoAudioPregunta: "¿Cuál es un sinónimo de la palabra grande?",
          opciones: [
            { texto: "Enorme", correcta: true },
            { texto: "Pequeño", correcta: false },
            { texto: "Rápido", correcta: false }
          ],
          audioCorrecto: "audio/sinant_c1.mp3",
          textoAudioCorrecto: "Correcto. Un sinónimo de grande es enorme."
        },
        {
          texto: "Antónimo de “grande”",
          audioPregunta: "audio/sinant_p2.mp3",
          textoAudioPregunta: "¿Cuál es un antónimo de la palabra grande?",
          opciones: [
            { texto: "Pequeño", correcta: true },
            { texto: "Enorme", correcta: false },
            { texto: "Feliz", correcta: false }
          ],
          audioCorrecto: "audio/sinant_c2.mp3",
          textoAudioCorrecto: "Correcto. Un antónimo de grande es pequeño."
        },
        {
          texto: "Sinónimo de “cuidar”",
          audioPregunta: "audio/sinant_p3.mp3",
          textoAudioPregunta: "¿Cuál es un sinónimo de la palabra cuidar?",
          opciones: [
            { texto: "Proteger", correcta: true },
            { texto: "Descuidar", correcta: false },
            { texto: "Correr", correcta: false }
          ],
          audioCorrecto: "audio/sinant_c3.mp3",
          textoAudioCorrecto: "Correcto. Un sinónimo de cuidar es proteger."
        },
        {
          texto: "Antónimo de “cuidar”",
          audioPregunta: "audio/sinant_p4.mp3",
          textoAudioPregunta: "¿Cuál es un antónimo de la palabra cuidar?",
          opciones: [
            { texto: "Descuidar", correcta: true },
            { texto: "Proteger", correcta: false },
            { texto: "Nadar", correcta: false }
          ],
          audioCorrecto: "audio/sinant_c4.mp3",
          textoAudioCorrecto: "Correcto. Un antónimo de cuidar es descuidar."
        },
        {
          texto: "Sinónimo de “peligro”",
          audioPregunta: "audio/sinant_p5.mp3",
          textoAudioPregunta: "¿Cuál es un sinónimo de la palabra peligro?",
          opciones: [
            { texto: "Riesgo", correcta: true },
            { texto: "Seguridad", correcta: false },
            { texto: "Calma", correcta: false }
          ],
          audioCorrecto: "audio/sinant_c5.mp3",
          textoAudioCorrecto: "Correcto. Un sinónimo de peligro es riesgo."
        },
        {
          texto: "Antónimo de “peligro”",
          audioPregunta: "audio/sinant_p6.mp3",
          textoAudioPregunta: "¿Cuál es un antónimo de la palabra peligro?",
          opciones: [
            { texto: "Seguridad", correcta: true },
            { texto: "Riesgo", correcta: false },
            { texto: "Miedo", correcta: false }
          ],
          audioCorrecto: "audio/sinant_c6.mp3",
          textoAudioCorrecto: "Correcto. Un antónimo de peligro es seguridad."
        }
      ],
      puntuable: true
    },

    // 21 ------------------------------------------------------ (AJUSTE: sopa de letras 3 intercalada acá, cierra el bloque de vocabulario)
    {
      id: "sopa_letras_3",
      tipo: "sopaLetras",
      titulo: "Última sopa de letras",
      audio: "audio/21_sopa3.mp3",
      textoAudio: "Por último, buscá estas palabras: semejanza, diferencia, sinónimo, antónimo, hábitat, pentagonal.",
      palabras: ["SEMEJANZA", "DIFERENCIA", "SINONIMO", "ANTONIMO", "HABITAT", "PENTAGONAL"],
      filas: 14,
      columnas: 14
    },

    // 22 ------------------------------------------------------
    {
      id: "memojuego_vocabulario",
      tipo: "memojuego",
      titulo: "Memojuego: palabra y significado",
      audio: "audio/22_memojuego.mp3",
      textoAudio: "Encontrá las parejas entre cada palabra y su significado. Tocá una carta y después la que creas que es su pareja.",
      pares: [
        { a: "Invertebrado", b: "Animal sin columna vertebral", audioA: "audio/memo_invertebrado.mp3", audioB: "audio/memo_invertebrado_def.mp3" },
        { a: "Hábitat", b: "Lugar donde vive un animal", audioA: "audio/memo_habitat.mp3", audioB: "audio/memo_habitat_def.mp3" },
        { a: "Camuflar", b: "Cambiar de color para esconderse", audioA: "audio/memo_camuflar.mp3", audioB: "audio/memo_camuflar_def.mp3" },
        { a: "Cetáceos", b: "Grupo al que pertenecen las ballenas", audioA: "audio/memo_cetaceos.mp3", audioB: "audio/memo_cetaceos_def.mp3" }
      ]
    },

    // 23 ------------------------------------------------------
    {
      id: "desafio_final",
      tipo: "opcionMultiple",
      titulo: "Desafío final",
      audio: "audio/23_desafio.mp3",
      textoAudio: "Último desafío. ¿Cuál de estos animales es un invertebrado, según lo que aprendimos?",
      pregunta: "¿Cuál de estos animales es un invertebrado?",
      opciones: [
        { texto: "Ballena", imagen: "img/icono_ballena.png", correcta: false },
        { texto: "Pulpo", imagen: "img/icono_pulpo.png", correcta: true },
        { texto: "Foca", imagen: "img/icono_foca.png", correcta: false }
      ],
      feedbackCorrecto: "¡Muy bien! El pulpo es un invertebrado, pertenece a los cefalópodos.",
      feedbackIncorrecto: "Pensá: ¿cuál de ellos no tiene columna vertebral?",
      audioCorrecto: "audio/23b_acierto.mp3",
      puntuable: true,
      confirmacionFundamento: true,
      preguntaFundamento: {
        texto: "¿Por qué el pulpo es un invertebrado?",
        audioPregunta: "audio/desafio_fundamento_pregunta.mp3",
        opciones: [
          { texto: "Porque no tiene columna vertebral", correcta: true },
          { texto: "Porque vive en el mar", correcta: false },
          { texto: "Porque tiene ocho tentáculos", correcta: false }
        ],
        audioCorrecto: "audio/23c_acierto_fundamento.mp3"
      }
    },

    // 24 ------------------------------------------------------
    {
      id: "cierre",
      tipo: "cierre",
      titulo: "¡Lo lograste!",
      imagen: "img/cierre.jpg",
      audio: "audio/24_cierre.mp3",
      textoAudio: "Llegaste al final de este cuadernillo con mucho trabajo, esfuerzo y dedicación. Aprendiste, descubriste, pensaste, te animaste y superaste desafíos. Te llevás herramientas y experiencias que te acompañarán. ¡Seguí explorando, preguntando y soñando en grande!",
      texto: "Llegaste al final de este cuadernillo con mucho trabajo, esfuerzo y dedicación.\nAprendiste, descubriste, pensaste, te animaste y superaste desafíos.\n¡Felicitaciones por todo lo que lograste!",
      fotoPerfil: "img/foto_perfil.jpg",
      mostrarPuntaje: true,
      botonVolver: true
    }
  ]
};
