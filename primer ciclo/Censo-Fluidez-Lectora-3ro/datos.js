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
    id: "3-palabras",
    grado: "3er grado",
    titulo: "Palabras",
    fuente: "PLEM · Navegando textos (Fluidez Lectora) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Tercer grado",
    autor: "Liliana Cinetto",
    imagen: "img/texto.jpg",
    audio: "audio/3-palabras-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 1.38, 2.75, 4.36, 6.07, 8.18, 9.18, 10.2, 11.59, 12.97, 14.35, 15.74, 17.12, 18.51, 19.89, 21.68, 22.71, 24.24, 25.83, 27.37, 28.71, 30.69, 32.55, 33.53, 34.67, 35.99, 37.12, 38.58],
    renglones: [
      {"t": "Escribo palabras,", "n": 2, "p": false},
      {"t": "palabras de tiza", "n": 5, "p": false},
      {"t": "que a los pizarrones", "n": 9, "p": false},
      {"t": "les hacen cosquillas.", "n": 12, "p": false},
      {"t": "Escribo palabras,", "n": 14, "p": true},
      {"t": "palabras traviesas", "n": 16, "p": false},
      {"t": "que llegan y borran", "n": 20, "p": false},
      {"t": "todas las tristezas.", "n": 23, "p": false},
      {"t": "Escribo palabras,", "n": 25, "p": true},
      {"t": "palabras de luna", "n": 28, "p": false},
      {"t": "que cantan de noche", "n": 32, "p": false},
      {"t": "mi canción de cuna.", "n": 36, "p": false},
      {"t": "Escribo palabras,", "n": 38, "p": true},
      {"t": "palabras con brillo", "n": 41, "p": false},
      {"t": "que viajan contentas", "n": 44, "p": false},
      {"t": "dentro de un bolsillo.", "n": 48, "p": false},
      {"t": "Escribo palabras,", "n": 50, "p": true},
      {"t": "palabras de arena", "n": 53, "p": false},
      {"t": "que hilvanan consuelos", "n": 56, "p": false},
      {"t": "para cada pena.", "n": 59, "p": false},
      {"t": "Escribo palabras,", "n": 61, "p": true},
      {"t": "palabras sin dueño", "n": 64, "p": false},
      {"t": "que esconden secretos", "n": 67, "p": false},
      {"t": "y tejen los sueños.", "n": 71, "p": false},
      {"t": "Y escribo palabras,", "n": 74, "p": true},
      {"t": "palabras tan mías", "n": 77, "p": false},
      {"t": "que nacen y crecen", "n": 81, "p": false},
      {"t": "en mi poesía.", "n": 84, "p": false}
    ]
  }
];
