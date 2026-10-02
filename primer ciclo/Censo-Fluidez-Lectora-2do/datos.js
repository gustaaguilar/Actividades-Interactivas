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
    id: "2-colibri",
    grado: "2do grado",
    titulo: "El colibrí",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Segundo grado",
    imagen: "img/texto.jpg",
    audio: "audio/2-colibri-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.36, 6.34, 10.55, 13.25, 16.29, 20.23, 24.61, 27.9, 31.91, 35.2],
    renglones: [
      {"t": "El colibrí es un pájaro muy", "n": 6, "p": false},
      {"t": "vistoso. Los ojos del colibrí", "n": 11, "p": false},
      {"t": "son negros y pequeños. Su", "n": 16, "p": false},
      {"t": "cabeza es de color verde. Su", "n": 22, "p": false},
      {"t": "pico es largo y fino. Puede", "n": 28, "p": false},
      {"t": "emitir sonidos para defenderse", "n": 32, "p": false},
      {"t": "de los animales que quieran", "n": 37, "p": false},
      {"t": "alimentarse de él. El cuello del", "n": 43, "p": false},
      {"t": "macho es rojo y el de la", "n": 50, "p": false},
      {"t": "hembra, blanco.", "n": 52, "p": false}
    ]
  },
  {
    id: "2-circo",
    grado: "2do grado",
    titulo: "El circo",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Segundo grado",
    imagen: "img/2-circo.jpg",
    audio: "audio/2-circo-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.38, 3.23, 6.38, 9.38, 11.84, 14.61, 17.37, 20.14, 22.94, 25.79, 28.32, 31.35, 35.71, 38.77, 41.84, 44.16],
    renglones: [
      {"t": "Cerca de la casa de Ana", "n": 6, "p": false},
      {"t": "se ha instalado un circo. Con", "n": 12, "p": false},
      {"t": "mucha curiosidad, Ana miró", "n": 16, "p": false},
      {"t": "cómo levantaron la gran", "n": 20, "p": false},
      {"t": "carpa de colores y cómo", "n": 25, "p": false},
      {"t": "llegaron distintas clases de", "n": 29, "p": false},
      {"t": "animales encerrados en", "n": 32, "p": false},
      {"t": "enormes jaulas. Ana pudo", "n": 36, "p": false},
      {"t": "conocer desde los alegres", "n": 40, "p": false},
      {"t": "monos hasta los feroces", "n": 44, "p": false},
      {"t": "leones. La plaza se ha", "n": 49, "p": false},
      {"t": "llenado de alegría. Payasos,", "n": 53, "p": false},
      {"t": "acróbatas y domadores", "n": 56, "p": false},
      {"t": "ensayan para el gran día", "n": 61, "p": false},
      {"t": "de estreno. Anita espera", "n": 65, "p": false},
      {"t": "ansiosa verlos actuar.", "n": 68, "p": false}
    ]
  },
  {
    id: "2-liebre-tortuga",
    grado: "2do grado",
    titulo: "La liebre y la tortuga",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Segundo grado",
    autor: "Adaptación de fábulas para niños de María del Carmen Ruiz",
    imagen: "img/2-liebre-tortuga.jpg",
    audio: "audio/2-liebre-tortuga-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 6.24, 10.58, 14.93, 18.18, 21.11, 24.02, 27.4, 32.25, 36.91, 40.69, 43.37, 46.69, 51.54, 55.53, 58.22, 60.39, 64.59, 69.08, 70.35, 73.43, 77.34],
    renglones: [
      {"t": "Había una vez una liebre que era muy veloz.", "n": 9, "p": false},
      {"t": "Siempre se reía de la tortuga porque era muy", "n": 18, "p": true},
      {"t": "lenta para caminar. Todos los días, al verla", "n": 26, "p": false},
      {"t": "pasar la liebre le decía:", "n": 31, "p": false},
      {"t": "—¡Señora tortuga! ¿Adónde va usted caminando", "n": 37, "p": true},
      {"t": "tan lentamente? ¡Ja, ja, ja!", "n": 42, "p": false},
      {"t": "Una mañana la tortuga, cansada de tantas", "n": 49, "p": true},
      {"t": "burlas, tuvo una idea y le dijo a la liebre:", "n": 59, "p": false},
      {"t": "—¡Señora liebre! ¿Se atreve a correr conmigo", "n": 66, "p": false},
      {"t": "una carrera? La liebre aceptó.", "n": 71, "p": false},
      {"t": "El día llegó y la carrera comenzó. La liebre", "n": 80, "p": true},
      {"t": "salió corriendo velozmente y, al ver que se", "n": 88, "p": false},
      {"t": "había alejado mucho de la tortuga en poco", "n": 96, "p": false},
      {"t": "tiempo se paró a descansar en una roca", "n": 104, "p": false},
      {"t": "y se quedó dormida.", "n": 108, "p": false},
      {"t": "Mientras tanto, la tortuga seguía caminando", "n": 114, "p": true},
      {"t": "sin parar. Así se fue acercando lentamente a", "n": 122, "p": false},
      {"t": "la línea de meta, hasta conseguir ganar la", "n": 130, "p": false},
      {"t": "carrera.", "n": 131, "p": false},
      {"t": "Cuando la liebre se despertó se dio cuenta", "n": 139, "p": true},
      {"t": "que por quedarse dormida había perdido la", "n": 146, "p": false},
      {"t": "carrera.", "n": 147, "p": false}
    ]
  }
];
