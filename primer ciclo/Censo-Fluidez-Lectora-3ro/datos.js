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
    id: "3-palabras",
    grado: "3er grado",
    titulo: "Palabras",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Tercer grado",
    autor: "Liliana Cinetto",
    imagen: "img/texto.jpg",
    audio: "audio/3-palabras-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0, 1.38, 2.75, 4.36, 6.07, 8.18, 9.18, 10.2, 11.59, 12.97, 14.35, 15.74, 17.12, 18.51, 19.89, 21.68, 22.71, 24.24, 25.83, 27.37, 28.71, 30.69, 32.55, 33.53, 34.67, 35.99, 37.12, 38.58],
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
  },
  {
    id: "3-energia",
    grado: "3er grado",
    titulo: "¿Cómo cuidamos la energía?",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Tercer grado",
    imagen: "img/3-energia.jpg",
    audio: "audio/3-energia-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 6.15, 7.55, 10.02, 11.22, 12.47, 15.44, 19.37, 23.02, 24.3, 26.36, 27.82, 28.76, 30.12, 32.66, 34.82, 36.08, 37.84, 38.65, 43.17, 43.72, 44.94, 48.21, 52.07, 53.97],
    renglones: [
      {"t": "Cuidar el planeta es tarea de todos.", "n": 7, "p": false},
      {"t": "Los hábitos de todas las personas pueden", "n": 14, "p": true},
      {"t": "ayudar. Por eso es importante que sepamos", "n": 21, "p": false},
      {"t": "cómo hacerlo.", "n": 23, "p": false},
      {"t": "Uno de los recursos que debemos cuidar es", "n": 31, "p": true},
      {"t": "la energía. Si usamos energía en exceso,", "n": 38, "p": false},
      {"t": "contaminamos el planeta. No es difícil ahorrar", "n": 45, "p": false},
      {"t": "energía en tu casa siguiendo estos consejos:", "n": 52, "p": false},
      {"t": "•Cuando te vayas a dormir asegurate de", "n": 59, "p": true},
      {"t": "que todos los aparatos eléctricos estén", "n": 65, "p": false},
      {"t": "apagados.", "n": 66, "p": false},
      {"t": "•Apagá las luces cuando salgas de tu", "n": 73, "p": true},
      {"t": "habitación o de tu casa.", "n": 78, "p": false},
      {"t": "•Si tenés aire acondicionado, usalo siempre", "n": 84, "p": true},
      {"t": "a 24 grados.", "n": 87, "p": false},
      {"t": "•No abrás la heladera más de lo necesario", "n": 95, "p": true},
      {"t": "y no mantengás mucho tiempo la puerta", "n": 102, "p": false},
      {"t": "abierta.", "n": 103, "p": false},
      {"t": "•Usá solo lámparas de bajo consumo.", "n": 109, "p": true},
      {"t": "•Usá la plancha y el secador de pelo solo", "n": 118, "p": true},
      {"t": "cuando sea muy necesario.", "n": 122, "p": false},
      {"t": "Si has hecho todos estos cambios, ahora podés", "n": 130, "p": true},
      {"t": "ayudar compartiendo esta información con otras", "n": 136, "p": false},
      {"t": "personas. Si todos colaboramos es mucho más", "n": 143, "p": false},
      {"t": "fácil cuidar nuestro planeta.", "n": 147, "p": false}
    ]
  },
  {
    id: "3-juguetes",
    grado: "3er grado",
    titulo: "Los juguetes",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Tercer grado",
    imagen: "img/3-juguetes.jpg",
    audio: "audio/3-juguetes-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 4.33, 6.21, 8.47, 11.27, 16.28, 19.46, 22.97, 26.36, 29.82, 31.48, 35.92, 41.46, 43.44, 46.38, 49.02, 52.4, 56.8, 61.8, 64.18, 67.48, 69.89, 73.54, 78.68, 81.01, 84.59],
    renglones: [
      {"t": "El baúl de los juguetes estaba lleno y", "n": 8, "p": false},
      {"t": "desordenado.", "n": 9, "p": false},
      {"t": "María se había levantado esa mañana, como", "n": 16, "p": true},
      {"t": "todas las mañanas, con pocas ganas de", "n": 23, "p": false},
      {"t": "ordenar. Desayunó tranquila y, pasados unos", "n": 29, "p": false},
      {"t": "minutos, no tardó en escuchar la voz de su", "n": 38, "p": false},
      {"t": "mamá que le decía que debía ordenar su", "n": 46, "p": false},
      {"t": "dormitorio y sus juguetes. Le costaba mucho", "n": 53, "p": false},
      {"t": "ser ordenada y su mamá se enojaba mucho", "n": 61, "p": false},
      {"t": "con ella por eso.", "n": 65, "p": false},
      {"t": "María se demoró en el desayuno tratando de", "n": 73, "p": true},
      {"t": "evitar a toda costa subir a ordenar sus juguetes.", "n": 82, "p": false},
      {"t": "En eso que estaba esperando que el tiempo", "n": 90, "p": false},
      {"t": "pasara, escuchó varios ruidos extraños que", "n": 96, "p": false},
      {"t": "venían desde su habitación.", "n": 100, "p": false},
      {"t": "Se paró rápidamente de su silla y subió las", "n": 109, "p": true},
      {"t": "escaleras hasta entrar corriendo a su dormitorio.", "n": 116, "p": false},
      {"t": "Cuando llegó, vio sorprendida que todo estaba", "n": 123, "p": false},
      {"t": "ordenado y en su lugar.", "n": 128, "p": false},
      {"t": "No podía salir de su asombro. A lo lejos, algo", "n": 138, "p": true},
      {"t": "se movía despacito.", "n": 141, "p": false},
      {"t": "Se acercó y pudo distinguir a su muñeca", "n": 149, "p": true},
      {"t": "Margarita que con una hermosa sonrisa le dijo:", "n": 157, "p": false},
      {"t": "—Como todos los días nos cuidas y nos das", "n": 166, "p": false},
      {"t": "mucho cariño, nosotros quisimos ayudarte a", "n": 172, "p": false},
      {"t": "ordenar tu habitación.", "n": 175, "p": false}
    ]
  }
];
