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
  imagenLectora: "img/lectora.jpg", // chico leyendo (lista de control)
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
    id: "2-colibri",
    grado: "2do grado",
    titulo: "El colibrí",
    fuente: "PLEM · Navegando textos (Fluidez Lectora) · DGE Mendoza",
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
  }
];
