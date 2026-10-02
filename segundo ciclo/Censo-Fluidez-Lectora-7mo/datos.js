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
    id: "7-perros",
    grado: "7mo grado",
    titulo: "¿Tu personalidad influye en la personalidad de tu perro?",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Séptimo grado",
    autor: "Fuente: National Geographic en Español (ngenespanol.com)",
    imagen: "img/texto.jpg",
    audio: "audio/7-perros-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0, 9.56, 15.07, 21.71, 22.58, 26.92, 32.13, 37.51, 41.35, 46.76, 52.9, 58.35, 59.91, 65.8, 68.85, 74.96, 83.46, 89.34, 91.64, 98.56, 104.22, 108.71, 110.41, 116.07, 121.59, 127.31, 132.26, 138.56, 144.18, 148.9],
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
  },
  {
    id: "7-trex",
    grado: "7mo grado",
    titulo: "Confirman el hallazgo del Tiranosaurio Rex más grande del mundo",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Séptimo grado",
    autor: "Adaptación de revista digital National Geographic",
    imagen: "img/7-trex.jpg",
    audio: "audio/7-trex-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 5.62, 9.66, 14.89, 20.84, 22.44, 26.01, 31.56, 36.4, 40.84, 45.48, 49.78, 54.92, 59.78, 64.94, 70.38, 75.11, 81.6, 85.64, 90.24, 94.89, 99.59, 105.85, 111.02, 115.69],
    renglones: [
      {"t": "En 1991, se descubrió que un yacimiento fósil de Canadá", "n": 10, "p": false},
      {"t": "albergaba el espécimen Tiranosaurio Rex más grande", "n": 17, "p": false},
      {"t": "hallado hasta la fecha. Este animal tenía un peso estimado", "n": 27, "p": false},
      {"t": "en unas 8,845 toneladas, muy superior al de los elefantes", "n": 37, "p": false},
      {"t": "modernos.", "n": 38, "p": false},
      {"t": "El dinosaurio consta de un esqueleto que está completo al", "n": 48, "p": true},
      {"t": "65 por ciento e incluye el cráneo y las caderas, así como", "n": 60, "p": false},
      {"t": "parte de las costillas, los huesos de las patas y los huesos", "n": 72, "p": false},
      {"t": "de la cola. El tiranosaurio, apodado \"Tomi\", era un anciano", "n": 82, "p": false},
      {"t": "según los estándares de su especie, ya que alcanzó una edad", "n": 93, "p": false},
      {"t": "aproximada de 28 años.", "n": 97, "p": false},
      {"t": "Hace unos 68 millones de años, el paisaje en el que vivía Tomi era", "n": 111, "p": true},
      {"t": "un paraíso costero subtropical, pero no estaba precisamente de", "n": 120, "p": false},
      {"t": "vacaciones. Entre los restos del dinosaurio se halló una costilla rota", "n": 131, "p": false},
      {"t": "y curada, una enorme protuberancia ósea que le crecía entre dos", "n": 142, "p": false},
      {"t": "dientes —una señal de infección— y huesos de la cola rotos, quizá", "n": 154, "p": false},
      {"t": "mutilados por el mordisco de otro tiranosaurio. \"No era una vida", "n": 165, "p": false},
      {"t": "sencilla, ni siquiera para el rey de los dinosaurios depredadores, a", "n": 176, "p": false},
      {"t": "juzgar por todas esas heridas\", afirma un paleontólogo.", "n": 184, "p": false},
      {"t": "El hallazgo sugiere que es probable que los grandes dinosaurios", "n": 194, "p": true},
      {"t": "depredadores fueran más grandes y ancianos de lo que los", "n": 204, "p": false},
      {"t": "paleontólogos suponían basándose en los fósiles disponibles en", "n": 212, "p": false},
      {"t": "la actualidad. Entre las especies conocidas, el Tiranosaurio es uno", "n": 222, "p": false},
      {"t": "de los dinosaurios extintos mejor representados, con más de 20", "n": 232, "p": false},
      {"t": "individuos fósiles identificados.", "n": 235, "p": false}
    ]
  },
  {
    id: "7-momias",
    grado: "7mo grado",
    titulo: "Las catorce momias de Bakrí",
    fuente: "«Navegando textos» · Plan de Lectura y Escritura Mendoza (PLEM) · DGE Mendoza",
    descripcion: "Textos para medir la velocidad lectora de los alumnos. Primaria. Séptimo grado",
    autor: "Adaptación de «Las catorce momias de Bakrí», de Susana Fernández Gabaldón",
    imagen: "img/7-momias.jpg",
    audio: "audio/7-momias-modelo.mp3",
    // segundo de inicio aproximado de cada renglón en la lectura modelo
    audioRenglones: [0.0, 8.12, 14.29, 18.04, 22.29, 27.23, 31.57, 37.09, 42.37, 47.11, 51.07, 53.69, 57.94, 62.92, 68.0, 71.99, 78.0, 82.24, 85.12, 87.84, 93.48, 100.31, 105.51, 110.25, 114.4],
    renglones: [
      {"t": "—Le explicaré todo en sólo un minuto —dijo de pronto la joven,", "n": 12, "p": false},
      {"t": "acercándose hasta la mesa tras haber echado una rápida ojeada", "n": 22, "p": false},
      {"t": "a su alrededor. Sus ojos negros, penetrantes y misteriosos, se", "n": 32, "p": false},
      {"t": "encargaron de ello—. El señor Bakrí me ha dicho que esto podría", "n": 44, "p": false},
      {"t": "ser de su interés —dijo entonces, depositando un bulto encima de", "n": 55, "p": false},
      {"t": "la mesa— y que, si quiere saber más sobre el \"asunto\" y", "n": 67, "p": false},
      {"t": "de cómo ha conseguido \"rescatarlo\", estará esperando mañana", "n": 75, "p": false},
      {"t": "a las seis de la tarde en La Perla del Nilo, al pie del barrio de la", "n": 92, "p": false},
      {"t": "Ciudadela. No tiene pérdida. El señor Bakrí tiene intención de", "n": 102, "p": false},
      {"t": "vender esta información a un buen precio y está convencido de", "n": 113, "p": false},
      {"t": "que es usted la persona indicada...", "n": 119, "p": false},
      {"t": "—¡Un momento, un momento! Yo no soy el doctor al-Bayal...", "n": 129, "p": true},
      {"t": "Pero, ¿has dicho \"Bakrí\"? —preguntó Kinani, como si estuviera", "n": 138, "p": false},
      {"t": "hablando de un fantasma que acaba de abandonar la tumba", "n": 148, "p": false},
      {"t": "delante de sus propios ojos—. ¿No te referirás a aquel chiflado que...?", "n": 160, "p": false},
      {"t": "Quiero decir: ¿hablas del comerciante de objetos arqueológicos...,", "n": 168, "p": false},
      {"t": "de Bakrí, aquel hombre bajito..., de pelo grasiento con un gorro de", "n": 180, "p": false},
      {"t": "colores? ¡Pero si hace seis años que no sabemos nada de él! Le", "n": 193, "p": false},
      {"t": "creíamos muerto...", "n": 195, "p": false},
      {"t": "Kinani se había puesto muy nervioso, pero cuando abrió el paquete", "n": 206, "p": true},
      {"t": "encerrado en una bolsa de plástico y extrajo su contenido, casi le dio", "n": 219, "p": false},
      {"t": "un infarto. Entre un montón de periódicos llenos de arena reconoció de", "n": 231, "p": false},
      {"t": "inmediato el espejo de la princesa Neferure, medio envuelto en lo", "n": 242, "p": false},
      {"t": "que parecían unas vendas amarillentas con numerosos signos", "n": 250, "p": false},
      {"t": "jeroglíficos pintados sobre ellas.", "n": 254, "p": false}
    ]
  }
];
