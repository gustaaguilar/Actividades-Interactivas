// datos.js — Censo de Fluidez Lectora (QueSepanTodos.com)
// © 2026 Gustavo Aguilar · QueSepanTodos.com · Licencia CC BY-NC-ND 4.0. Textos, fichas, audios de lectura y lista de control: Plan de Lectura y Escritura Mendoza (PLEM), DGE Mendoza, y sus autores; usados con fines educativos.
// Cada renglón: t = texto, n = palabras acumuladas (igual que la ficha DGE), p = empieza párrafo nuevo.
// Para sumar fichas: agregar objetos a FICHAS con la misma estructura.
const META = {
  titulo: "Censo de Fluidez Lectora",
  subtitulo: "Toma asistida por voz · Nivel primario",
  autor: "💻 Informática Educativa · Profe Gustavo Aguilar",
  mail: "✉️ profegustaaguilar@gmail.com",
  foto: "profe.jpg",          // foto completa (lightbox)
  fotoMini: "profe_mini.jpg", // miniatura circular de portada y cierre
  segundos: 60,          // duración de la toma
  pausaLarga: 3,         // segundos sin avanzar que cuentan como pausa larga
  idioma: "es-AR",
  // audios compartidos por los 7 paquetes (narración del tutorial y preguntas de la lista de control): una sola copia en el sitio
  recursos: "../../recursos/censo-fluidez/",
  // créditos del material de lectura (textos, fichas, audios modelo, lista de control y presentación)
  creditos: {
    programa: "Programa Provincial de Fluidez Lectora",
    plan: "Plan de Lectura y Escritura Mendoza (PLEM)",
    organismo: "Dirección General de Escuelas (DGE) · Gobierno de Mendoza",
    coleccion: "Navegando textos (Fluidez Lectora)",
    url: "https://hportal.mendoza.edu.ar/dge/acciones/fluidez-lectora/"
  },
  imagenLectora: "img/lectora.jpg", // chico leyendo (lista de control)
  // Texto de presentación de la colección (PLEM · Navegando textos)
  presentacion: "Durante el primer año de la escuela primaria, la lectura supone para el niño un inmenso trabajo de atención. Cada palabra es un enigma, un rompecabezas que el niño solo reconstruye a expensas de grandes esfuerzos. Durante esta etapa, la actividad cerebral involucra una red de regiones muy amplia. A medida que la lectura se automatiza, la movilización de estas regiones decrece. Por eso, la automatización de la lectura es un objetivo esencial del aprendizaje. ¿Cómo puede facilitarse la automatización? Con la práctica diaria de lectura.",
  fuentePresentacion: "Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza · «Navegando textos (Fluidez Lectora)»",
  // Lista de control (autoevaluación de la lectura expresiva). "si" = solo aparece si el texto tiene ese recurso.
  listaControl: [
    { id: "emocion",  txt: "¿Elevaste o bajaste tu voz para mostrar emoción al leer?" },
    { id: "ritmo",    txt: "¿Leíste con buen ritmo? Ni muy lento ni muy rápido." },
    { id: "enfasis",  txt: "¿Enfatizaste algunas palabras con tu tono de voz?" },
    { id: "comas",    txt: "¿Hiciste una pausa en las comas?", si: "coma" },
    { id: "puntos",   txt: "¿Hiciste una pausa más larga en los puntos?", si: "punto" },
    { id: "pregunta", txt: "¿Respetaste los signos de interrogación?", si: "pregunta" },
    { id: "exclama",  txt: "¿Respetaste los signos de exclamación?", si: "exclamacion" },
    { id: "dialogos", txt: "¿Leíste los diálogos como si fueran personas hablando?", si: "dialogo" },
    { id: "comprension", txt: "¿Pudiste comprender lo que leíste?" }
  ]
};
const FICHAS = [
  {
    id: "6-viaje-tiempo",
    grado: "6to grado",
    titulo: "Viaje en el tiempo",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Sexto grado",
    imagen: "img/texto.jpg",
    audio: "audio/6-viaje-tiempo-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0, 6.13, 11.67, 15.59, 23.29, 28.19, 34.15, 37.73, 43.83, 49.57, 55, 60.71, 65.62, 66.94, 70.41, 73.57, 79.3, 81.86, 87.49, 92.1, 98.36, 102.3, 105.24, 113.73, 118.77],
    renglones: [
      {"t": "Juan vio una enorme máquina en el laboratorio de ciencia.", "n": 10, "p": false},
      {"t": "Por curiosidad, abrió la enorme puerta de metal y entró", "n": 20, "p": false},
      {"t": "en la máquina. En la parte de adelante divisó un panel", "n": 31, "p": false},
      {"t": "luminoso que decía “1816” y la palabra “Tucumán”.", "n": 39, "p": false},
      {"t": "No pudo resistir las ganas de apretar el botón rojo de al", "n": 51, "p": false},
      {"t": "lado del panel. Apenas lo apretó, la máquina comenzó a", "n": 61, "p": false},
      {"t": "sacudirse y hacer un ruido extraño.", "n": 67, "p": false},
      {"t": "Cuando terminó de moverse, Juan saltó del asiento para salir", "n": 77, "p": true},
      {"t": "de la máquina lo más rápido posible. Pero algo muy extraño", "n": 88, "p": false},
      {"t": "había sucedido. En vez de salir a la sala de laboratorio, Juan se", "n": 101, "p": false},
      {"t": "encontró en un bosque. Miró a su alrededor y encontró a un", "n": 113, "p": false},
      {"t": "muchacho vestido con ropas antiguas, con una canasta llena", "n": 122, "p": false},
      {"t": "de velas.", "n": 124, "p": false},
      {"t": "—¿Qué estás haciendo aquí? —le preguntó Juan.", "n": 131, "p": true},
      {"t": "—Quiero llevar estas velas a la casita donde se reúnen los", "n": 142, "p": false},
      {"t": "congresales. Dicen que esta noche se decidirán cosas muy", "n": 151, "p": false},
      {"t": "importantes allí.", "n": 153, "p": false},
      {"t": "Juan comprendió. ¡Había viajado al pasado y este muchacho", "n": 162, "p": true},
      {"t": "estaba hablando del Congreso de Tucumán!", "n": 168, "p": false},
      {"t": "Impresionado, Juan dijo: —No dejés de ir. Algo muy importante", "n": 178, "p": true},
      {"t": "va a ocurrir esta noche en esa casa.", "n": 186, "p": false},
      {"t": "El muchacho lo miró desconcertado y siguió su camino.", "n": 195, "p": true},
      {"t": "Juan se subió a la máquina nuevamente. Apretó los botones", "n": 205, "p": true},
      {"t": "hasta que llegó a la fecha de hoy y la dirección de su laboratorio", "n": 219, "p": false},
      {"t": "y volvió a viajar a su vida en el presente.", "n": 229, "p": false}
    ]
  },
  {
    id: "6-darwin",
    grado: "6to grado",
    titulo: "Charles Darwin",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Sexto grado",
    imagen: "img/6-darwin.jpg",
    audio: "audio/6-darwin-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 3.42, 7.09, 12.56, 17.11, 20.35, 22.15, 30.45, 33.62, 40.59, 45.0, 47.99, 52.82, 58.37, 61.31, 65.22, 67.25, 71.88, 76.94, 82.08, 86.77],
    renglones: [
      {"t": "Charles Robert Darwin fue uno de los científicos más", "n": 9, "p": false},
      {"t": "importantes de la historia porque, después de observar", "n": 17, "p": false},
      {"t": "muchos animales y plantas, desarrolló una teoría llamada", "n": 25, "p": false},
      {"t": "“El origen de las especies” por medio de la selección", "n": 35, "p": false},
      {"t": "natural, que explica cómo se han transformado los seres", "n": 44, "p": false},
      {"t": "vivos a lo largo del tiempo.", "n": 50, "p": false},
      {"t": "Darwin fue un naturalista inglés que vivió entre 1809 y 1882.", "n": 61, "p": true},
      {"t": "Desde niño le apasionaba todo lo que tuviera que ver con la", "n": 73, "p": false},
      {"t": "naturaleza. Tenía grandes colecciones; le encantaba la jardinería,", "n": 81, "p": false},
      {"t": "y aprendió a pescar y a montar a caballo.", "n": 90, "p": false},
      {"t": "Le gustaba inventar códigos secretos y contar historias para", "n": 99, "p": true},
      {"t": "entretener a su familia. También hacía trucos de magia, como", "n": 109, "p": false},
      {"t": "cambiar el color de las flores con ayuda de colorantes.", "n": 119, "p": false},
      {"t": "Darwin fue el quinto de seis hermanos, y al parecer la", "n": 131, "p": false},
      {"t": "experiencia de crecer con tantos niños le gustó mucho porque", "n": 141, "p": false},
      {"t": "de grande tuvo ¡diez hijos!", "n": 146, "p": false},
      {"t": "Su padre era un reconocido médico y trató de que Charles siguiera", "n": 158, "p": true},
      {"t": "sus pasos. Pero el joven no pudo soportar que los pacientes", "n": 169, "p": false},
      {"t": "sufrieran. Su padre luego quiso que estudiara para ser sacerdote,", "n": 179, "p": false},
      {"t": "pero Charles era muy flojo, y en lugar de sentarse a hacer la tarea,", "n": 193, "p": false},
      {"t": "prefería estar en el campo, ir con sus amigos, leer y escuchar música.", "n": 206, "p": false}
    ]
  },
  {
    id: "6-robot",
    grado: "6to grado",
    titulo: "El robot que ayuda a dormir bien",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Sexto grado",
    autor: "Adaptación de Muy Interesante Junior (muyinteresante.com.mx)",
    imagen: "img/6-robot.jpg",
    audio: "audio/6-robot-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 4.09, 8.39, 11.71, 17.54, 21.69, 25.86, 27.92, 33.65, 39.68, 43.6, 48.4, 52.83, 58.58, 62.5, 63.53, 68.19, 73.09, 78.87, 85.75, 90.58, 93.28, 98.02],
    renglones: [
      {"t": "Es suave, pesa como un gato y respira como un bebé.", "n": 11, "p": false},
      {"t": "Se trata de un robot que fue creado para ayudar a dormir", "n": 23, "p": false},
      {"t": "bien a personas que tienen trastornos del sueño. Un", "n": 32, "p": false},
      {"t": "emprendedor holandés creó este robot para ayudar a su", "n": 41, "p": false},
      {"t": "madre, quien sufría de insomnio crónico. Recuerda que los", "n": 50, "p": false},
      {"t": "médicos que ella consultó solo le ofrecían pastillas para", "n": 59, "p": false},
      {"t": "dormir que no funcionaban.", "n": 63, "p": false},
      {"t": "El robot, que se supone pondrá a dormir a mucha gente, tiene", "n": 75, "p": true},
      {"t": "forma de almohadón y cuando lo abrazas hace diferentes tipos", "n": 85, "p": false},
      {"t": "de respiración. ¡Es como si abrazaras un perro o un gato!", "n": 96, "p": false},
      {"t": "También tiene un altavoz interno con música, meditaciones y", "n": 105, "p": false},
      {"t": "hasta noticias. Todo depende de lo que prefieras escuchar. Y lo", "n": 116, "p": false},
      {"t": "más curioso, cuando el robot escucha tu respiración muy ligera", "n": 126, "p": false},
      {"t": "y que ya no te movés, deduce que te has quedado dormido y", "n": 139, "p": false},
      {"t": "se apaga.", "n": 141, "p": false},
      {"t": "Como imaginarás, mucha gente ya está interesada en el robot.", "n": 151, "p": true},
      {"t": "Por ello, sus creadores han hecho pruebas sencillas con 90", "n": 161, "p": false},
      {"t": "personas. Los resultados mostraron que las personas redujeron", "n": 169, "p": false},
      {"t": "30 por ciento el tiempo que les tomaba quedarse dormidos pero", "n": 180, "p": false},
      {"t": "no fueron respaldados por métodos científicos.", "n": 186, "p": false},
      {"t": "Se planea personalizar el robot según cada cliente, por ejemplo,", "n": 196, "p": true},
      {"t": "programarlo según las horas a las que este se despierta o los", "n": 208, "p": false},
      {"t": "problemas que tenga al dormir como las pesadillas.", "n": 216, "p": false}
    ]
  }
];
