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
    id: "1-telefono",
    grado: "1er grado",
    titulo: "Un teléfono inventado",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Primer grado",
    espaciado: 2,
    imagen: "img/texto.jpg",
    audio: "audio/1-telefono-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0, 6.97, 14.57, 21.45, 29.5],
    renglones: [
      {"t": "María y Luis son amigos. Les gusta", "n": 7, "p": false},
      {"t": "jugar. Tienen una gran idea. Con dos", "n": 14, "p": false},
      {"t": "vasos de plástico y un hilo de lana", "n": 22, "p": false},
      {"t": "hacen un teléfono. María y Luis salieron", "n": 29, "p": false},
      {"t": "felices a jugar con su nuevo invento.", "n": 36, "p": false}
    ]
  },
  {
    id: "1-capitan-pirata",
    grado: "1er grado",
    titulo: "El capitán pirata",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Primer grado",
    espaciado: 2.0,
    imagen: "img/1-capitan-pirata.jpg",
    audio: "audio/1-capitan-pirata-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 6.79, 11.23, 15.28, 18.47, 20.8, 23.46, 27.62, 33.23, 36.36],
    renglones: [
      {"t": "El capitán pirata tiene un barco", "n": 6, "p": false},
      {"t": "grande. Tiene un ojo tapado y", "n": 12, "p": false},
      {"t": "un pañuelo a lunares para no", "n": 18, "p": false},
      {"t": "despeinarse con el viento. Es", "n": 23, "p": false},
      {"t": "valiente y bueno. Navega por", "n": 28, "p": false},
      {"t": "el mundo con otros piratas. Tiene", "n": 34, "p": false},
      {"t": "un mapa del tesoro que está", "n": 40, "p": false},
      {"t": "escondido en una isla lejana. Todas", "n": 46, "p": false},
      {"t": "las noches sueña que lo encuentra", "n": 52, "p": false},
      {"t": "y lo comparte con sus amigos marineros.", "n": 59, "p": false}
    ]
  },
  {
    id: "1-magos",
    grado: "1er grado",
    titulo: "Los magos",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Primer grado",
    espaciado: 2.0,
    imagen: "img/1-magos.jpg",
    audio: "audio/1-magos-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 6.19, 9.67, 12.84, 17.04, 22.3, 26.05, 29.44, 32.76, 37.61],
    renglones: [
      {"t": "Agustina y Federico son hermanos.", "n": 5, "p": false},
      {"t": "Siempre juegan a ser magos.", "n": 10, "p": false},
      {"t": "Usan galera y capa de colores", "n": 16, "p": false},
      {"t": "brillantes. Su conejo Tito es su", "n": 22, "p": false},
      {"t": "mejor truco. Aparece y desaparece", "n": 27, "p": false},
      {"t": "con las palabras mágicas. Un día", "n": 33, "p": false},
      {"t": "Tito se perdió y no lo volvieron a", "n": 41, "p": false},
      {"t": "encontrar. Se había escapado de", "n": 46, "p": false},
      {"t": "su jaula. Tuvieron que reemplazarlo", "n": 51, "p": false},
      {"t": "por un conejo de peluche.", "n": 56, "p": false}
    ]
  }
];
