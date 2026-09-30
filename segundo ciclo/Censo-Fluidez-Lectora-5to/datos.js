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
    id: "5-egipto",
    grado: "5to grado",
    titulo: "Un viaje mágico a Egipto",
    fuente: "PLEM · Navegando textos (Fluidez Lectora) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Quinto grado",
    autor: "Adaptación del texto: Heka. Un viaje mágico a Egipto, Núria Pradas",
    imagen: "img/texto.jpg",
    audio: "audio/5-egipto-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 8.05, 11.78, 15.12, 20.77, 23.97, 28.43, 34.16, 37.12, 40.85, 44.82, 49.9, 54.46, 59.88, 64.78, 68.52, 73.22, 77.25, 81.28, 85.54, 89.31, 92.39, 96.96, 101.76, 106.33],
    renglones: [
      {"t": "Parpadeó varias veces. Intentaba abrir los ojos,", "n": 7, "p": false},
      {"t": "pero aquel movimiento tan insignificante le suponía", "n": 14, "p": false},
      {"t": "un esfuerzo enorme. Tenía el cuerpo destrozado. Se", "n": 22, "p": false},
      {"t": "dio cuenta de que estaba estirado en el suelo. Pero", "n": 32, "p": false},
      {"t": "no era el suelo húmedo del parque.", "n": 39, "p": false},
      {"t": "Ahora sí que abrió los ojos. Lo veía todo borroso.", "n": 49, "p": true},
      {"t": "Instintivamente, hizo el gesto de subirse los anteojos.", "n": 57, "p": false},
      {"t": "Pero no los llevaba puestos. El corazón se le subió a la", "n": 69, "p": false},
      {"t": "garganta. Sin anteojos era hombre... bueno, niño", "n": 76, "p": false},
      {"t": "perdido. Palpó el suelo. ¡Uf, estaban allí, a su lado!", "n": 86, "p": false},
      {"t": "Se los puso. Su madre tenía razón: eran feos, pero", "n": 96, "p": false},
      {"t": "fuertes y no se habían roto. Eso sí, estaban", "n": 105, "p": false},
      {"t": "completamente torcidos, el ojo derecho hacia arriba", "n": 112, "p": false},
      {"t": "y el izquierdo hacia abajo. Tenía que girar la cabeza", "n": 122, "p": false},
      {"t": "de una forma extraña para poder ver algo. Y lo que", "n": 133, "p": false},
      {"t": "vio, a través de sus anteojos torcidos, lo dejó estupefacto.", "n": 143, "p": false},
      {"t": "Dio un salto del susto; un salto que ni él mismo se creía", "n": 156, "p": true},
      {"t": "capaz de dar. Se quedó medio incorporado. Le costaba", "n": 165, "p": false},
      {"t": "asimilar la información que los ojos le transmitían al", "n": 174, "p": false},
      {"t": "cerebro. Una cara rarísima lo miraba con los ojos tan", "n": 184, "p": false},
      {"t": "abiertos de par en par como los suyos. Un rostro que", "n": 195, "p": false},
      {"t": "parecía tener tanto miedo de Víctor, como Víctor de él.", "n": 205, "p": false},
      {"t": "Las dos caras asustadas se quedaron quietas,", "n": 212, "p": true},
      {"t": "observándose mutuamente. La tensión se palpaba", "n": 218, "p": false},
      {"t": "en el aire.", "n": 221, "p": false}
    ]
  }
];
