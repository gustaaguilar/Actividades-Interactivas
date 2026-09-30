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
    id: "6-viaje-tiempo",
    grado: "6to grado",
    titulo: "Viaje en el tiempo",
    fuente: "PLEM · Navegando textos (Fluidez Lectora) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Sexto grado",
    imagen: "img/texto.jpg",
    audio: "audio/6-viaje-tiempo-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 6.13, 11.67, 15.59, 23.29, 28.19, 34.15, 37.73, 43.83, 49.57, 55.0, 60.71, 65.62, 66.94, 70.41, 73.57, 79.3, 81.86, 87.49, 92.1, 98.36, 102.3, 105.24, 113.73, 118.77],
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
  }
];
