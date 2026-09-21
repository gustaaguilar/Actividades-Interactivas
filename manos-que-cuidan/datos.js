// datos.js — "Manos que Cuidan" (higiene de manos, hábito saludable)
// QueSepanTodos.com — Profe Gustavo Aguilar
// v2: enfoque generalizado (sin norovirus puntual), procedimiento de lavado
// con 4 pantallas nuevas, distinción de actividades por ciclo, video único.

// ---- Los 7 pasos del lavado de manos (pantallas "ordenar pasos" y "asociar pasos") ----
// Universal: se usan igual para primer y segundo ciclo.
const pasosLavado = [
  { id: "paso1", texto: "Mojar las manos",     imagen: "img/paso1_mojar.jpg",           audioId: "paso1" },
  { id: "paso2", texto: "Cerrar la canilla",   imagen: "img/paso2_cerrar_canilla.jpg",  audioId: "paso2" },
  { id: "paso3", texto: "Enjabonarse",         imagen: "img/paso3_enjabonar.jpg",       audioId: "paso3" },
  { id: "paso4", texto: "Frotar bien",         imagen: "img/paso4_frotar.jpg",          audioId: "paso4" },
  { id: "paso5", texto: "Limpiar las uñas",    imagen: "img/paso5_unas.jpg",            audioId: "paso5" },
  { id: "paso6", texto: "Enjuagar",            imagen: "img/paso6_enjuagar.jpg",        audioId: "paso6" },
  { id: "paso7", texto: "Secarse",             imagen: "img/paso7_secar.jpg",           audioId: "paso7" }
];

// ---- Trivia de técnica (reemplaza a la trivia del norovirus) ----
const preguntasTecnica = [
  {
    id: "tec_t1",
    pregunta: "¿Por qué cerramos la canilla mientras nos enjabonamos?",
    opciones: ["Para cuidar el agua", "Porque no hay agua", "Para que no se moje el piso"],
    // Imágenes por opción: solo se usan en primer ciclo (recién aprenden a leer).
    imagenesOpciones: ["img/tec_t1_o1.jpg", "img/tec_t1_o2.jpg", "img/tec_t1_o3.jpg"],
    correcta: 0,
    audioExplicacion: true
  },
  {
    id: "tec_t2",
    pregunta: "¿Cuánto tiempo hay que frotarse las manos con jabón?",
    opciones: ["Un segundo", "Unos 20 segundos", "Una hora"],
    imagenesOpciones: ["img/tec_t2_o1.jpg", "img/tec_t2_o2.jpg", "img/tec_t2_o3.jpg"],
    correcta: 1,
    audioExplicacion: true
  },
  {
    id: "tec_t3",
    pregunta: "¿Qué zonas de la mano no hay que olvidar limpiar?",
    opciones: ["Las uñas y entre los dedos", "Solo las palmas", "Solo el dorso"],
    imagenesOpciones: ["img/tec_t3_o1.jpg", "img/tec_t3_o2.jpg", "img/tec_t3_o3.jpg"],
    correcta: 0,
    audioExplicacion: true
  },
  {
    id: "tec_t4",
    pregunta: "¿Con qué jabón alcanza para lavarse bien las manos?",
    opciones: ["Con cualquier jabón común", "Solo con jabón especial y caro", "No hace falta jabón"],
    correcta: 0,
    audioExplicacion: true
  },
  {
    id: "tec_t5",
    pregunta: "Después de enjuagarte las manos, ¿qué hacés?",
    opciones: ["Te secás con una toalla limpia", "Te dejás las manos mojadas", "Te las volvés a ensuciar"],
    correcta: 0,
    audioExplicacion: true
  }
];

const datos = {

  meta: {
    titulo: "Manos que Cuidan",
    subtitulo: "Aprendemos a lavarnos bien las manos",
    area: "Ciencias Naturales / Educación para la Salud",
    ciclo: "Primer y Segundo Ciclo",
    autor: "Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    fotoProfe: "img/profe.jpg",
    imagenPortada: "img/portada_manos.jpg",
    fraseLightbox: "Menos prisa, más vida 🧉🫂"
  },

  // Video único (ya no hay selección de video por ciclo).
  video: {
    id: "-_2vPIB6Ofc",
    titulo: "10 pasos para lavarse las manos (versión corta)",
    canal: "Happy Learning"
  },

  // Pantalla que define el ciclo del estudiante (ya no elige video, define
  // qué versión de las actividades de lectura se muestra más adelante).
  cicloSelector: {
    titulo: "¿En qué grado estás?",
    instruccion: "Elegí tu grupo para que las actividades se ajusten a vos.",
    opciones: [
      { id: "primerCiclo", etiqueta: "🧒 1° a 3° grado" },
      { id: "segundoCiclo", etiqueta: "🧑 4° a 7° grado" }
    ]
  },

  // Pantalla de explicación con narración animada (texto genérico,
  // enfocado en el hábito saludable, sin mención puntual a ningún brote).
  explicacion: {
    titulo: "¿Por qué nos lavamos las manos?",
    imagen: "img/escena_explicacion.jpg",
    pasos: [
      {
        texto: "Lavarse bien las manos es una de las formas más simples y efectivas de cuidar nuestra salud.",
        marcador: "panza"
      },
      {
        texto: "Todos los días tocamos objetos, superficies y a otras personas, y así podemos llevarnos gérmenes y virus sin darnos cuenta.",
        marcador: "virus"
      },
      {
        texto: "El alcohol en gel ayuda, pero no siempre alcanza: no elimina todos los gérmenes. Lo más seguro es lavarse las manos con agua y jabón.",
        marcador: "gel"
      },
      {
        texto: "Frotando bien las manos con jabón durante unos 20 segundos, antes de comer y después de ir al baño, prevenimos muchas enfermedades entre todos.",
        marcador: "jabon"
      }
    ],
    audioId: "explicacion_completa"
  },

  // ASOCIAR MOMENTOS — unir el momento con la imagen correspondiente.
  // Universal (misma consigna para ambos ciclos).
  asociarMomentos: {
    titulo: "Unite al momento correcto",
    instruccion: "Tocá cada momento y unilo con la imagen que corresponde.",
    introAudioId: "asociar_intro",
    pares: [
      { id: "p1", texto: "Antes de comer",                        imagen: "img/asociar_comer.jpg",     audioId: "asociar_p1" },
      { id: "p2", texto: "Después de ir al baño",                 imagen: "img/asociar_bano.jpg",      audioId: "asociar_p2" },
      { id: "p3", texto: "Después de toser o estornudar",         imagen: "img/asociar_estornudo.jpg", audioId: "asociar_p3" },
      { id: "p5", texto: "Después de jugar afuera",               imagen: "img/asociar_jugar.jpg",     audioId: "asociar_p5" },
      { id: "p6", texto: "Después de tocar mascotas o animales",  imagen: "img/asociar_mascota.jpg",   audioId: "asociar_p6" },
      { id: "p7", texto: "Después de tocar basura o elementos sucios", imagen: "img/asociar_basura.jpg", audioId: "asociar_p7" }
    ]
  },

  // ORDENAR PASOS — secuencia correcta del procedimiento de lavado.
  // Universal (misma consigna para ambos ciclos).
  ordenarPasos: {
    titulo: "Ordená los pasos del lavado",
    instruccion: "Tocá los pasos en el orden correcto para lavarte bien las manos.",
    introAudioId: "ordenar_intro",
    pasos: pasosLavado
  },

  // ASOCIAR PASOS — unir cada paso con su imagen.
  // Universal (misma consigna para ambos ciclos).
  asociarPasos: {
    titulo: "Uní cada paso con su imagen",
    instruccion: "Tocá cada paso y unilo con la imagen que corresponde.",
    introAudioId: "asociarpasos_intro",
    pares: pasosLavado
  },

  // CRONÓMETRO — practicar los 20 segundos de frotado.
  // Universal (misma consigna para ambos ciclos).
  cronometro: {
    titulo: "¡A frotarse las manos!",
    instruccion: "Tocá Empezar y frotate las manos hasta que el cronómetro llegue a cero.",
    imagenFondo: "img/escena_cronometro.jpg",
    // Video corto (se repite en bucle) que muestra al chico frotándose las
    // manos de verdad, en vez de la simulación animada por CSS.
    video: "video/cronometro_frotado.mp4",
    segundos: 20,
    audioIntro: "cronometro_intro",
    audioCierre: "cronometro_cierre"
  },

  // TRIVIA DE TÉCNICA — sobre el procedimiento de lavado.
  // Se adapta por ciclo: primer ciclo usa menos preguntas.
  triviaTecnica: {
    titulo: "¿Cuánto sabés sobre el lavado de manos?",
    introAudioId: "tec_intro",
    segundoCiclo: { preguntas: preguntasTecnica },
    primerCiclo: { preguntas: preguntasTecnica.slice(0, 3) }
  },

  // SOPA DE LETRAS — se adapta por ciclo: grilla y cantidad de palabras.
  sopaDeLetras: {
    titulo: "Sopa de letras: palabras que cuidan",
    instruccion: "Tocá la primera y la última letra de cada palabra para encontrarla.",
    introAudioId: "sopa_intro",
    segundoCiclo: { tamano: 10, palabras: ["JABON", "AGUA", "MANOS", "VIRUS", "SALUD", "LIMPIO", "CUIDADO"] },
    primerCiclo: { tamano: 6, palabras: ["JABON", "AGUA", "MANOS"] }
  },

  // ARMAR ORACIÓN — se adapta por ciclo: largo de las oraciones.
  // Al tocar una palabra: si es la correcta sube y suma acierto;
  // si no, se queda y suma error (sin mostrarse en el recuadro).
  armarOracion: {
    titulo: "Armá el consejo",
    instruccion: "Ordená las palabras tocándolas en el orden correcto para formar cada consejo.",
    introAudioId: "armar_intro",
    segundoCiclo: {
      oraciones: [
        { texto: "Lavate las manos con agua y jabón.",              imagen: "img/oracion_1.jpg" },
        { texto: "El alcohol en gel no elimina todos los gérmenes.", imagen: "img/oracion_2.jpg" },
        { texto: "Lavate las manos antes de comer.",                 imagen: "img/oracion_3.jpg" },
        { texto: "Cubrite la boca al toser o estornudar.",           imagen: "img/oracion_4.jpg" }
      ]
    },
    primerCiclo: {
      oraciones: [
        { texto: "Lavate las manos.",  imagen: "img/oracion_p1.jpg" },
        { texto: "Usá agua y jabón.",  imagen: "img/oracion_p2.jpg" },
        { texto: "Secate las manos.",  imagen: "img/oracion_p3.jpg" },
        { texto: "Cerrá la canilla.",  imagen: "img/oracion_p4.jpg" }
      ]
    }
  },

  cierre: {
    titulo: "¡Muy bien!",
    mensaje: "Ahora sabés cómo cuidarte y cuidar a tus compañeros lavándote bien las manos.",
    fraseFinal: "Entre todos cuidamos nuestra salud 💙"
  }
};

// Lista centralizada de textos a narrar (para el generador de audio por gTTS).
// Cada clave = nombre de archivo mp3 esperado en audio/<clave>.mp3
const textosAudio = {
  intro_portada: "Manos que Cuidan. Aprendemos a lavarnos bien las manos. Tocá Comenzar para empezar.",
  intro_video: "Mirá este video sobre cómo lavarse bien las manos. Cuando termines, tocá Continuar.",
  ciclo_intro: "Elegí tu grupo para que las actividades se ajusten a vos: primer ciclo o segundo ciclo.",

  explicacion_completa: "Lavarse bien las manos es una de las formas más simples y efectivas de cuidar nuestra salud. Todos los días tocamos objetos, superficies y a otras personas, y así podemos llevarnos gérmenes y virus sin darnos cuenta. El alcohol en gel ayuda, pero no siempre alcanza: no elimina todos los gérmenes. Lo más seguro es lavarse las manos con agua y jabón. Frotando bien las manos con jabón durante unos 20 segundos, antes de comer y después de ir al baño, prevenimos muchas enfermedades entre todos.",

  asociar_intro: "Tocá cada momento y unilo con la imagen que corresponde.",
  asociar_p1: "Antes de comer",
  asociar_p2: "Después de ir al baño",
  asociar_p3: "Después de toser o estornudar",
  asociar_p5: "Después de jugar afuera",
  asociar_p6: "Después de tocar mascotas o animales",
  asociar_p7: "Después de tocar basura o elementos sucios",

  ordenar_intro: "Tocá los pasos en el orden correcto para lavarte bien las manos.",
  asociarpasos_intro: "Tocá cada paso y unilo con la imagen que corresponde.",
  paso1: "Abrí la canilla y mojate bien las manos.",
  paso2: "Cerrá la canilla mientras te enjabonás, para cuidar el agua.",
  paso3: "Enjaboná tus manos hasta hacer bastante espuma.",
  paso4: "Frotá las palmas, el dorso y entre los dedos.",
  paso5: "Limpiá bien las uñas y las yemas de los dedos.",
  paso6: "Abrí la canilla otra vez y enjuagate con agua limpia.",
  paso7: "Secate las manos con una toalla limpia y seca.",

  tec_intro: "Respondé cada pregunta y tocá Verificar.",
  tec_t1_pregunta: "¿Por qué cerramos la canilla mientras nos enjabonamos?",
  tec_t1_explicacion: "Cerramos la canilla mientras nos enjabonamos para cuidar el agua y no desperdiciarla.",
  tec_t2_pregunta: "¿Cuánto tiempo hay que frotarse las manos con jabón?",
  tec_t2_explicacion: "Hay que frotarse las manos con jabón durante unos 20 segundos, bien de a poco.",
  tec_t3_pregunta: "¿Qué zonas de la mano no hay que olvidar limpiar?",
  tec_t3_explicacion: "Hay que limpiar bien entre los dedos y debajo de las uñas, donde se junta más suciedad.",
  tec_t4_pregunta: "¿Con qué jabón alcanza para lavarse bien las manos?",
  tec_t4_explicacion: "Con cualquier jabón común alcanza para eliminar los gérmenes de las manos.",
  tec_t5_pregunta: "Después de enjuagarte las manos, ¿qué hacés?",
  tec_t5_explicacion: "Te secás bien con una toalla limpia y seca, para terminar el lavado.",

  cronometro_intro: "Frotate las manos siguiendo el cronómetro. ¡Vamos por los 20 segundos!",
  cronometro_cierre: "¡Muy bien! Ya cumpliste los 20 segundos de lavado.",

  sopa_intro: "Tocá la primera y la última letra de cada palabra para encontrarla.",
  sopa_JABON: "Jabón",
  sopa_AGUA: "Agua",
  sopa_MANOS: "Manos",
  sopa_VIRUS: "Virus",
  sopa_SALUD: "Salud",
  sopa_LIMPIO: "Limpio",
  sopa_CUIDADO: "Cuidado",

  armar_intro: "Ordená las palabras para formar cada consejo. Cuando esté completo, escuchá la oración.",
  armar_mayuscula: "Recordá que las oraciones comienzan con mayúscula y terminan con un punto.",
  oracion_1: "Lavate las manos con agua y jabón.",
  oracion_2: "El alcohol en gel no elimina todos los gérmenes.",
  oracion_3: "Lavate las manos antes de comer.",
  oracion_4: "Cubrite la boca al toser o estornudar.",
  oracion_p1: "Lavate las manos.",
  oracion_p2: "Usá agua y jabón.",
  oracion_p3: "Secate las manos.",
  oracion_p4: "Cerrá la canilla.",

  cierre_texto: "Muy bien. Ahora sabés cómo cuidarte y cuidar a tus compañeros lavándote bien las manos. Entre todos cuidamos nuestra salud."
};

if (typeof module !== "undefined") {
  module.exports = { datos, textosAudio };
}
