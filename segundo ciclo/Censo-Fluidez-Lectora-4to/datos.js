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
    id: "4-cuevas",
    grado: "4° grado",
    titulo: "Cuevas",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Cuarto grado",
    imagen: "img/texto.jpg",
    audio: "audio/4-cuevas-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
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
  },
  {
    id: "4-primer-dia",
    grado: "4to grado",
    titulo: "El primer día",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Cuarto grado",
    imagen: "img/4-primer-dia.jpg",
    audio: "audio/4-primer-dia-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 5.57, 10.89, 15.83, 21.55, 25.66, 31.4, 37.02, 39.46, 44.91, 48.17, 52.98, 54.12, 59.65, 62.04, 64.2, 67.42, 72.41, 77.21, 82.15],
    renglones: [
      {"t": "Pedro miró a Luis, el chico nuevo, que estaba sentado", "n": 10, "p": false},
      {"t": "solo en el recreo. Era mitad de año, y Pedro sabía que", "n": 22, "p": false},
      {"t": "Luis debía estar nervioso en su primer día.", "n": 30, "p": false},
      {"t": "Pedro podía comprenderlo. Él había sido el chico nuevo,", "n": 39, "p": true},
      {"t": "y el primer día de escuela le había parecido interminable.", "n": 49, "p": false},
      {"t": "Pedro pensó que nunca acabaría. Él sabía que todo lo", "n": 59, "p": false},
      {"t": "que Luis necesitaba era tener a alguien que lo hiciera", "n": 69, "p": false},
      {"t": "sentir bienvenido.", "n": 71, "p": false},
      {"t": "Cuando llegó el momento de elegir equipos para jugar", "n": 80, "p": true},
      {"t": "al fútbol, Pedro dijo:", "n": 84, "p": false},
      {"t": "—Quiero que Luis esté en nuestro equipo.", "n": 91, "p": false},
      {"t": "Luis se dio vuelta y lo miró para confirmar si hablaba de", "n": 103, "p": true},
      {"t": "él. Pedro asintió y Luis se unió al equipo con una gran", "n": 115, "p": false},
      {"t": "sonrisa en la cara.", "n": 119, "p": false},
      {"t": "Pedro le dijo:", "n": 122, "p": true},
      {"t": "—Sacá primero, Luis. Veamos qué podés hacer.", "n": 129, "p": false},
      {"t": "Cuando Luis pateó la pelota, salió corriendo, cruzó la", "n": 138, "p": true},
      {"t": "cancha y metió el primer gol. Desde el otro lado de la", "n": 150, "p": false},
      {"t": "cancha, Pedro le gritó con entusiasmo:", "n": 156, "p": false},
      {"t": "—¡Bienvenido a nuestra escuela, Luis!", "n": 161, "p": true}
    ]
  },
  {
    id: "4-parque",
    grado: "4to grado",
    titulo: "El parque de diversiones",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Cuarto grado",
    imagen: "img/4-parque.jpg",
    audio: "audio/4-parque-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 6.14, 11.91, 16.34, 22.24, 25.78, 28.19, 33.23, 38.2, 44.23, 47.46, 50.57, 54.14, 59.66, 65.13, 67.03, 70.23, 76.77, 81.9, 87.95],
    renglones: [
      {"t": "¡El parque de diversiones había llegado a la ciudad!", "n": 9, "p": false},
      {"t": "Julia y su hermano menor, Luis, le preguntaron a su", "n": 19, "p": false},
      {"t": "mamá si podían ir. Ella les dijo que sí.", "n": 28, "p": false},
      {"t": "Entonces, el sábado partieron los tres hacia el parque.", "n": 37, "p": true},
      {"t": "Se encontraron con tantos juegos y atracciones que no", "n": 46, "p": false},
      {"t": "supieron por dónde empezar.", "n": 50, "p": false},
      {"t": "Luego de dar una vuelta y ver todo lo que había en el", "n": 63, "p": true},
      {"t": "parque, se decidieron por los juegos. Julia derribó tres", "n": 72, "p": false},
      {"t": "botellas con una pelota y ganó una muñeca. Luis ganó", "n": 82, "p": false},
      {"t": "un peluche por explotar tres globos.", "n": 88, "p": false},
      {"t": "Después se subieron a algunas de las atracciones. Los", "n": 97, "p": true},
      {"t": "dos hermanos manejaron autitos chocadores. Julia", "n": 103, "p": false},
      {"t": "entró sola a la casa embrujada, pero a Luis le daba", "n": 114, "p": false},
      {"t": "mucho miedo. Entonces, Luis decidió subirse a la", "n": 122, "p": false},
      {"t": "montaña rusa.", "n": 124, "p": false},
      {"t": "Más tarde, Julia y Luis almorzaron panchos. Después", "n": 132, "p": true},
      {"t": "de eso, su mamá les dijo que podían comer una golosina.", "n": 143, "p": false},
      {"t": "Julia eligió un algodón de azúcar y Luis un helado. Cuando", "n": 154, "p": false},
      {"t": "comenzó a oscurecer, los tres volvieron a casa. Se habían", "n": 164, "p": false},
      {"t": "divertido un montón.", "n": 167, "p": false}
    ]
  }
];
