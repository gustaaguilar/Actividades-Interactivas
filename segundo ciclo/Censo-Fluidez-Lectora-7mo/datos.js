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
    id: "7-perros",
    grado: "7mo grado",
    titulo: "¿Tu personalidad influye en la personalidad de tu perro?",
    fuente: "PLEM · Navegando textos (Fluidez Lectora) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Séptimo grado",
    autor: "Fuente: National Geographic en Español (ngenespanol.com)",
    imagen: "img/texto.jpg",
    audio: "audio/7-perros-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 9.56, 15.07, 21.71, 22.58, 26.92, 32.13, 37.51, 41.35, 46.76, 52.9, 58.35, 59.91, 65.8, 68.85, 74.96, 83.46, 89.34, 91.64, 98.56, 104.22, 108.71, 110.41, 116.07, 121.59, 127.31, 132.26, 138.56, 144.18, 148.9],
    renglones: [
      {"t": "Los perros, al igual que las personas, tienen estados de ánimo y rasgos", "n": 13, "p": false},
      {"t": "distintivos en su personalidad. De hecho, un nuevo estudio revela que la", "n": 25, "p": false},
      {"t": "personalidad de un perro probablemente también cambia con el paso de los", "n": 37, "p": false},
      {"t": "años.", "n": 38, "p": false},
      {"t": "“Cuando los humanos pasan por grandes cambios en la vida, sus rasgos de", "n": 51, "p": true},
      {"t": "personalidad pueden cambiar. Sin embargo, descubrimos que esto ocurre con", "n": 61, "p": false},
      {"t": "los perros, y en un grado sorprendentemente grande”, declara el profesor de", "n": 73, "p": false},
      {"t": "psicología y autor principal del estudio.", "n": 79, "p": false},
      {"t": "“Esperábamos que las personalidades de los perros fueran bastante estables", "n": 89, "p": true},
      {"t": "porque estos no están sometidos a los enormes cambios en el estilo de vida a", "n": 104, "p": false},
      {"t": "los que a veces nos vemos expuestos los seres humanos, pero en realidad", "n": 117, "p": false},
      {"t": "cambian mucho” agregó.", "n": 120, "p": false},
      {"t": "En este estudio se descubrieron similitudes en personalidades con sus dueños", "n": 131, "p": true},
      {"t": "y el momento óptimo para entrenarlos.", "n": 137, "p": false},
      {"t": "Para la elaboración del estudio, los expertos analizaron el comportamiento de", "n": 148, "p": true},
      {"t": "1681 perros de 50 razas diferentes y de edades comprendidas entre 0 y 15", "n": 163, "p": false},
      {"t": "años. Además, esta ha sido una de las investigaciones más extensas sobre la", "n": 176, "p": false},
      {"t": "personalidad de los perros.", "n": 180, "p": false},
      {"t": "La encuesta hizo que cada propietario evaluara la personalidad de su perro y", "n": 193, "p": true},
      {"t": "respondiera varias preguntas sobre su historial de comportamiento. Los", "n": 202, "p": false},
      {"t": "propietarios también respondieron una encuesta sobre sus propias", "n": 210, "p": false},
      {"t": "personalidades.", "n": 211, "p": false},
      {"t": "Así, por ejemplo, los propietarios más extrovertidos respondieron que sus", "n": 221, "p": true},
      {"t": "perros eran muy activos y alegres, mientras que los dueños más introvertidos", "n": 233, "p": false},
      {"t": "y reservados afirmaron que sus canes eran más temerosos, más calmados y", "n": 245, "p": false},
      {"t": "se mostraban menos receptivos a la hora de obedecer órdenes.", "n": 255, "p": false},
      {"t": "Asimismo, el investigador y su equipo descubrieron que las personalidades de", "n": 266, "p": true},
      {"t": "los perros pueden predecir factores como la cercanía que sienten respecto a", "n": 278, "p": false},
      {"t": "sus dueños, la propensión a morder o incluso la tendencia a sufrir", "n": 290, "p": false},
      {"t": "enfermedades crónicas.", "n": 292, "p": false}
    ]
  }
];
