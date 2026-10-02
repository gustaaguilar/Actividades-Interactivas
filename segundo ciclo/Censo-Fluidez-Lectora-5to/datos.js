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
    id: "5-egipto",
    grado: "5to grado",
    titulo: "Un viaje mágico a Egipto",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Quinto grado",
    autor: "Adaptación del texto: Heka. Un viaje mágico a Egipto, Núria Pradas",
    imagen: "img/texto.jpg",
    audio: "audio/5-egipto-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0, 8.05, 11.78, 15.12, 20.77, 23.97, 28.43, 34.16, 37.12, 40.85, 44.82, 49.9, 54.46, 59.88, 64.78, 68.52, 73.22, 77.25, 81.28, 85.54, 89.31, 92.39, 96.96, 101.76, 106.33],
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
  },
  {
    id: "5-cumpli-11",
    grado: "5to grado",
    titulo: "Cuando cumplí 11",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Quinto grado",
    imagen: "img/5-cumpli-11.jpg",
    audio: "audio/5-cumpli-11-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 4.76, 10.27, 14.6, 18.51, 20.47, 25.25, 29.37, 33.35, 39.76, 43.91, 47.64, 52.41, 58.01, 61.52, 67.26, 72.79, 77.93],
    renglones: [
      {"t": "Solía odiar salir a correr, pero desde mi cumpleaños", "n": 9, "p": false},
      {"t": "eso cambió. El día que cumplí 11 años, tuvimos que", "n": 19, "p": false},
      {"t": "correr cinco kilómetros en la clase de gimnasia. La", "n": 28, "p": false},
      {"t": "profesora se paró a un costado de la cancha con su", "n": 39, "p": false},
      {"t": "cronómetro en mano.", "n": 42, "p": false},
      {"t": "—En sus marcas, listos, ya —dijo la profesora. Los", "n": 51, "p": true},
      {"t": "corredores más ágiles salieron primero, como siempre,", "n": 58, "p": false},
      {"t": "y yo comencé a trotar con mi amiga Samanta.", "n": 67, "p": false},
      {"t": "El año anterior tuve que abandonar a los 900 metros.", "n": 77, "p": true},
      {"t": "Pero siendo el día de mi cumpleaños, me sentía muy", "n": 87, "p": false},
      {"t": "bien y podía correr sin problema. Cerca de los dos", "n": 97, "p": false},
      {"t": "kilómetros, Samanta tuvo que parar y caminar. Le dije", "n": 106, "p": false},
      {"t": "que yo también iba a caminar, pero me animó a seguir.", "n": 117, "p": false},
      {"t": "Eso hice. Continué trotando hasta llegar a los cuatro", "n": 126, "p": true},
      {"t": "kilómetros y me sentía bien. No me dolía nada y podía", "n": 137, "p": false},
      {"t": "respirar con facilidad. ¡Hasta pude correr más rápido", "n": 145, "p": false},
      {"t": "durante el último kilómetro! Terminé tercera de toda", "n": 153, "p": false},
      {"t": "la clase. Ahora me encanta correr.", "n": 159, "p": false}
    ]
  },
  {
    id: "5-marte",
    grado: "5to grado",
    titulo: "El planeta Marte",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Quinto grado",
    imagen: "img/5-marte.jpg",
    audio: "audio/5-marte-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 3.97, 8.51, 13.3, 14.49, 18.09, 22.74, 27.59, 33.87, 40.72, 43.49, 49.18, 52.83, 55.86, 57.61, 63.39, 68.65, 73.39, 78.92, 83.2, 87.09, 91.37],
    renglones: [
      {"t": "¿Es posible vivir en Marte? A menos que estemos dentro de", "n": 11, "p": false},
      {"t": "una estación espacial o usemos un traje espacial, no sería", "n": 21, "p": false},
      {"t": "posible. Deberíamos llevar nuestra comida, bebida y ¡hasta", "n": 29, "p": false},
      {"t": "oxígeno!", "n": 30, "p": false},
      {"t": "La atmósfera de Marte no contiene el oxígeno", "n": 38, "p": true},
      {"t": "suficiente para nuestra supervivencia. Dióxido de carbono,", "n": 45, "p": false},
      {"t": "nitrógeno y argón son algunos de los gases presentes en el", "n": 56, "p": false},
      {"t": "aire de este planeta, además de oxígeno en muy poca cantidad.", "n": 67, "p": false},
      {"t": "Otro impedimento para habitar este planeta es su temperatura.", "n": 76, "p": true},
      {"t": "Durante el día llega a los veinte grados, pero, durante la noche,", "n": 88, "p": false},
      {"t": "las mínimas varían entre cincuenta y ochenta grados bajo cero.", "n": 98, "p": false},
      {"t": "Un traje espacial se haría indispensable en estas condiciones.", "n": 107, "p": false},
      {"t": "No ha sido posible encontrar agua en Marte debido a sus", "n": 118, "p": false},
      {"t": "temperaturas extremas.", "n": 120, "p": false},
      {"t": "Si bien algunos minerales han sido descubiertos en Marte,", "n": 129, "p": true},
      {"t": "como desechos de vapor de agua, los científicos creen que,", "n": 139, "p": false},
      {"t": "si hay agua, está escondida debajo de la superficie.", "n": 148, "p": false},
      {"t": "Antiguamente, se creía que existía vida en Marte. Pensaban que", "n": 158, "p": true},
      {"t": "los marcianos eran seres especiales que habían habitado ese", "n": 167, "p": false},
      {"t": "planeta por miles de años. Sin embargo, cuando finalmente el", "n": 177, "p": false},
      {"t": "hombre llegó a Marte, se supo que allí no había ninguna forma", "n": 189, "p": false},
      {"t": "de vida, al menos, visible.", "n": 194, "p": false}
    ]
  }
];
