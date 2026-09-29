// datos.js — Censo de Fluidez Lectora (QueSepanTodos.com)
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
  // Texto de presentación de la colección (PLEM · Navegando textos)
  presentacion: "Durante el primer año de la escuela primaria, la lectura supone para el niño un inmenso trabajo de atención. Cada palabra es un enigma, un rompecabezas que el niño solo reconstruye a expensas de grandes esfuerzos. Durante esta etapa, la actividad cerebral involucra una red de regiones muy amplia. A medida que la lectura se automatiza, la movilización de estas regiones decrece. Por eso, la automatización de la lectura es un objetivo esencial del aprendizaje. ¿Cómo puede facilitarse la automatización? Con la práctica diaria de lectura.",
  fuentePresentacion: "PLEM · Navegando textos (Fluidez Lectora)",
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
    id: "4-cuevas", grado: "4° grado", titulo: "Cuevas",
    fuente: "PLEM · Navegando textos (Fluidez Lectora) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Cuarto grado",
    // Lectura modelo (audio de la colección) y segundo de inicio aproximado de cada renglón, para resaltarlo mientras suena
    audio: "audio/4-cuevas-modelo.mp3",
    audioRenglones: [1.39, 4.41, 7.22, 10.36, 14.78, 19.02, 22.21, 25.4, 29.35, 32.61, 35.71, 38.42, 40.96, 47.54, 49.29, 51.81, 54.02, 57.71, 61.34, 63.8, 67.21, 71.83],
    renglones: [
      {"t": "Las cuevas son lugares oscuros y tenebrosos", "n": 7, "p": false},
      {"t": "donde viven criaturas extrañas. Sin embargo,", "n": 13, "p": false},
      {"t": "a muchas personas les encanta explorarlas.", "n": 19, "p": false},
      {"t": "Las cuevas se forman por la erosión del agua a", "n": 29, "p": true},
      {"t": "lo largo de miles de años. Las olas que golpean", "n": 39, "p": false},
      {"t": "contra los acantilados forman cuevas cerca de la", "n": 47, "p": false},
      {"t": "costa. También, hay cuevas a orillas de los ríos.", "n": 56, "p": false},
      {"t": "Son lugares húmedos y fríos, hogar ideal para", "n": 64, "p": true},
      {"t": "muchos animales. Miles de murciélagos pueden", "n": 70, "p": false},
      {"t": "vivir en una misma cueva y se ven como una", "n": 80, "p": false},
      {"t": "nube negra volando en la oscuridad. Las", "n": 87, "p": false},
      {"t": "golondrinas arman sus nidos en los pliegues", "n": 94, "p": false},
      {"t": "rocosos. Los osos eligen las cuevas para hibernar.", "n": 102, "p": false},
      {"t": "Los primeros humanos también las utilizaban", "n": 108, "p": false},
      {"t": "para protegerse del clima y de los animales.", "n": 116, "p": false},
      {"t": "Los animales que solo viven en cuevas están", "n": 124, "p": true},
      {"t": "adaptados a la oscuridad. La mayoría son ciegos", "n": 132, "p": false},
      {"t": "y algunos ni siquiera tienen ojos. Perciben el", "n": 140, "p": false},
      {"t": "movimiento de lo que se mueve a su alrededor", "n": 149, "p": false},
      {"t": "para poder alimentarse. Las salamandras ciegas", "n": 155, "p": false},
      {"t": "y algunos peces que viven en las profundidades", "n": 163, "p": false},
      {"t": "son ejemplos de estas adaptaciones.", "n": 168, "p": false}
    ]
  }
];
