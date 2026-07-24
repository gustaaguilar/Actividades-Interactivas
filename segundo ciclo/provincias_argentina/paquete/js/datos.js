// ============================================================
// DATOS - "Provincias de Argentina"
// Profe Gustavo Aguilar - QueSepanTodos.com
// ============================================================

// Info por provincia: texto (narración), audio, imagen
// El SVG (path/centroid) vive en mapa_datos.js -> PROVINCIAS_SVG
var PROVINCIAS_INFO = {
  buenos_aires: {
    nombre: "Buenos Aires",
    texto: "Buenos Aires es la provincia más poblada del país. Su ciudad capital tiene el famoso Obelisco y un enorme puerto sobre el Río de la Plata.",
    audio: "audio/provincia_buenos_aires.mp3",
    imagen: "img/provincia_buenos_aires.jpg"
  },
  catamarca: {
    nombre: "Catamarca",
    texto: "Catamarca está en el noroeste argentino, rodeada de cerros andinos. Es tierra de la Pachamama y de paisajes coloridos.",
    audio: "audio/provincia_catamarca.mp3",
    imagen: "img/provincia_catamarca.jpg"
  },
  chaco: {
    nombre: "Chaco",
    texto: "Chaco tiene una gran zona de monte llamada El Impenetrable, y es una de las principales productoras de algodón del país.",
    audio: "audio/provincia_chaco.mp3",
    imagen: "img/provincia_chaco.jpg"
  },
  chubut: {
    nombre: "Chubut",
    texto: "Chubut, en la Patagonia, es famosa por la Península Valdés, donde se pueden ver pingüinos y ballenas.",
    audio: "audio/provincia_chubut.mp3",
    imagen: "img/provincia_chubut.jpg"
  },
  cordoba: {
    nombre: "Córdoba",
    texto: "Córdoba tiene las Sierras Chicas y Grandes, y es cuna del cuarteto y de festivales de música muy conocidos.",
    audio: "audio/provincia_cordoba.mp3",
    imagen: "img/provincia_cordoba.jpg"
  },
  corrientes: {
    nombre: "Corrientes",
    texto: "Corrientes alberga los Esteros del Iberá, uno de los humedales más importantes de Sudamérica, con yacarés y carpinchos.",
    audio: "audio/provincia_corrientes.mp3",
    imagen: "img/provincia_corrientes.jpg"
  },
  entre_rios: {
    nombre: "Entre Ríos",
    texto: "Entre Ríos está entre dos grandes ríos, el Paraná y el Uruguay, y es conocida por sus termas y sus playas de río.",
    audio: "audio/provincia_entre_rios.mp3",
    imagen: "img/provincia_entre_rios.jpg"
  },
  formosa: {
    nombre: "Formosa",
    texto: "Formosa, en el norte del país, tiene bañados, monte y una rica tradición de artesanías de los pueblos wichi.",
    audio: "audio/provincia_formosa.mp3",
    imagen: "img/provincia_formosa.jpg"
  },
  jujuy: {
    nombre: "Jujuy",
    texto: "Jujuy tiene el famoso Cerro de los Siete Colores, en el pueblo de Purmamarca, en la Quebrada de Humahuaca.",
    audio: "audio/provincia_jujuy.mp3",
    imagen: "img/provincia_jujuy.jpg"
  },
  la_pampa: {
    nombre: "La Pampa",
    texto: "La Pampa se caracteriza por sus llanuras infinitas, ideales para la ganadería y el cultivo de cereales.",
    audio: "audio/provincia_la_pampa.mp3",
    imagen: "img/provincia_la_pampa.jpg"
  },
  la_rioja: {
    nombre: "La Rioja",
    texto: "La Rioja tiene el Parque Nacional Talampaya, con cañones rojizos, y produce el vino torrontés.",
    audio: "audio/provincia_la_rioja.mp3",
    imagen: "img/provincia_la_rioja.jpg"
  },
  mendoza: {
    nombre: "Mendoza",
    texto: "Mendoza es tierra del Aconcagua, la montaña más alta de América, y del vino Malbec, reconocido en todo el mundo.",
    audio: "audio/provincia_mendoza.mp3",
    imagen: "img/provincia_mendoza.jpg"
  },
  misiones: {
    nombre: "Misiones",
    texto: "Misiones tiene las Cataratas del Iguazú, una de las maravillas naturales del mundo, rodeadas de selva.",
    audio: "audio/provincia_misiones.mp3",
    imagen: "img/provincia_misiones.jpg"
  },
  neuquen: {
    nombre: "Neuquén",
    texto: "Neuquén combina lagos, volcanes y montañas, y es un lugar donde se descubrieron huellas de dinosaurios.",
    audio: "audio/provincia_neuquen.mp3",
    imagen: "img/provincia_neuquen.jpg"
  },
  rio_negro: {
    nombre: "Río Negro",
    texto: "Río Negro tiene a Bariloche, famosa por sus lagos, montañas y su delicioso chocolate artesanal.",
    audio: "audio/provincia_rio_negro.mp3",
    imagen: "img/provincia_rio_negro.jpg"
  },
  salta: {
    nombre: "Salta",
    texto: "Salta es conocida como Salta la Linda, y por el Tren a las Nubes, que cruza viaductos altísimos en la montaña.",
    audio: "audio/provincia_salta.mp3",
    imagen: "img/provincia_salta.jpg"
  },
  san_juan: {
    nombre: "San Juan",
    texto: "San Juan tiene el Valle de la Luna, en Ischigualasto, con formaciones rocosas que parecen de otro planeta.",
    audio: "audio/provincia_san_juan.mp3",
    imagen: "img/provincia_san_juan.jpg"
  },
  san_luis: {
    nombre: "San Luis",
    texto: "San Luis tiene sierras suaves y lagunas como la del Potrero de los Funes, ideales para el turismo de montaña.",
    audio: "audio/provincia_san_luis.mp3",
    imagen: "img/provincia_san_luis.jpg"
  },
  santa_cruz: {
    nombre: "Santa Cruz",
    texto: "Santa Cruz tiene el glaciar Perito Moreno, un enorme bloque de hielo celeste que se puede visitar en el sur.",
    audio: "audio/provincia_santa_cruz.mp3",
    imagen: "img/provincia_santa_cruz.jpg"
  },
  santa_fe: {
    nombre: "Santa Fe",
    texto: "Santa Fe está atravesada por el río Paraná y tiene a Rosario, cuna de grandes músicos y deportistas.",
    audio: "audio/provincia_santa_fe.mp3",
    imagen: "img/provincia_santa_fe.jpg"
  },
  santiago_del_estero: {
    nombre: "Santiago del Estero",
    texto: "Santiago del Estero es la ciudad más antigua del país, y cuna de la chacarera, un baile folclórico muy popular.",
    audio: "audio/provincia_santiago_del_estero.mp3",
    imagen: "img/provincia_santiago_del_estero.jpg"
  },
  tierra_del_fuego: {
    nombre: "Tierra del Fuego",
    texto: "Tierra del Fuego, con Ushuaia, es la provincia más austral del mundo, conocida como la ciudad del fin del mundo.",
    audio: "audio/provincia_tierra_del_fuego.mp3",
    imagen: "img/provincia_tierra_del_fuego.jpg"
  },
  tucuman: {
    nombre: "Tucumán",
    texto: "Tucumán es el Jardín de la República, cuna de la independencia argentina y gran productora de caña de azúcar.",
    audio: "audio/provincia_tucuman.mp3",
    imagen: "img/provincia_tucuman.jpg"
  }
};

// ============================================================
// PANTALLA 3 - ¿DÓNDE QUEDA? (se sortean 6 de las 23)
// ============================================================
var DONDE_QUEDA_AUDIO_INTRO = "audio/03_donde_queda_intro.mp3";
function audioDondeQueda(key) {
  return `audio/03_donde_queda_${key}.mp3`;
}

// ============================================================
// PANTALLA 5 - VERDADERO O FALSO
// ============================================================
var VOF_CONSIGNA_AUDIO = "audio/05_vof_consigna.mp3";
var AFIRMACIONES_VOF = [
  { texto: "Jujuy tiene el Cerro de los Siete Colores.", valor: true, audio: "audio/05_vof_1.mp3" },
  { texto: "Mendoza es conocida por su vino Malbec.", valor: true, audio: "audio/05_vof_2.mp3" },
  { texto: "Las Cataratas del Iguazú están en la provincia de Salta.", valor: false, audio: "audio/05_vof_3.mp3" },
  { texto: "Tierra del Fuego es la provincia más al norte del país.", valor: false, audio: "audio/05_vof_4.mp3" },
  { texto: "El glaciar Perito Moreno está en Santa Cruz.", valor: true, audio: "audio/05_vof_5.mp3" },
  { texto: "Buenos Aires es la provincia con menos habitantes del país.", valor: false, audio: "audio/05_vof_6.mp3" }
];

// ============================================================
// PANTALLA 6 - OPCIÓN MÚLTIPLE
// ============================================================
var OM_CONSIGNA_AUDIO = "audio/06_opcion_multiple_consigna.mp3";
var PREGUNTAS_OM = [
  {
    pregunta: "¿Cuál es la provincia más austral de Argentina?",
    opciones: ["Chubut", "Santa Cruz", "Tierra del Fuego", "Neuquén"],
    correcta: 2,
    audio: "audio/06_opcion_multiple_1.mp3"
  },
  {
    pregunta: "¿En qué provincia está el Aconcagua, la montaña más alta de América?",
    opciones: ["San Juan", "Mendoza", "La Rioja", "Neuquén"],
    correcta: 1,
    audio: "audio/06_opcion_multiple_2.mp3"
  },
  {
    pregunta: "¿Qué provincia es famosa por las Cataratas del Iguazú?",
    opciones: ["Corrientes", "Misiones", "Formosa", "Chaco"],
    correcta: 1,
    audio: "audio/06_opcion_multiple_3.mp3"
  },
  {
    pregunta: "¿Cuál es la provincia con mayor cantidad de habitantes del país?",
    opciones: ["La Pampa", "San Luis", "Buenos Aires", "Formosa"],
    correcta: 2,
    audio: "audio/06_opcion_multiple_4.mp3"
  }
];

// ============================================================
// PANTALLAS 7, 8, 9 - SOPA DE LETRAS
// ============================================================
var SOPAS = [
  {
    titulo: "Provincias del Norte",
    consignaAudio: "audio/07_sopa_norte_consigna.mp3",
    palabras: ["JUJUY", "SALTA", "TUCUMAN", "CATAMARCA", "SANTIAGO", "FORMOSA", "CHACO", "MISIONES"]
  },
  {
    titulo: "Provincias del Centro",
    consignaAudio: "audio/08_sopa_centro_consigna.mp3",
    palabras: ["CORDOBA", "SANTAFE", "ENTRERIOS", "CORRIENTES", "LAPAMPA", "BUENOSAIRES", "SANLUIS", "LARIOJA"]
  },
  {
    titulo: "Provincias del Sur y Cuyo",
    consignaAudio: "audio/09_sopa_sur_cuyo_consigna.mp3",
    palabras: ["MENDOZA", "SANJUAN", "NEUQUEN", "RIONEGRO", "CHUBUT", "SANTACRUZ", "TIERRADELFUEGO"]
  }
];

// ============================================================
// PANTALLA 10 - ROMPECABEZAS DE ORACIONES
// ============================================================
var ROMPECABEZAS_CONSIGNA_AUDIO = "audio/10_rompecabezas_consigna.mp3";
var ORACIONES = [
  {
    texto: "El Aconcagua es la montaña más alta de América y se encuentra en Mendoza.",
    audio: "audio/10_oracion_1_completa.mp3"
  },
  {
    texto: "El glaciar Perito Moreno está ubicado en la provincia de Santa Cruz, en la Patagonia.",
    audio: "audio/10_oracion_2_completa.mp3"
  }
];

// Mapeo palabra de sopa (sin espacios) -> clave de provincia (para resaltar en el mapa mini)
var SOPA_PALABRA_A_KEY = {
  JUJUY: "jujuy", SALTA: "salta", TUCUMAN: "tucuman", CATAMARCA: "catamarca",
  SANTIAGO: "santiago_del_estero", FORMOSA: "formosa", CHACO: "chaco", MISIONES: "misiones",
  CORDOBA: "cordoba", SANTAFE: "santa_fe", ENTRERIOS: "entre_rios", CORRIENTES: "corrientes",
  LAPAMPA: "la_pampa", BUENOSAIRES: "buenos_aires", SANLUIS: "san_luis", LARIOJA: "la_rioja",
  MENDOZA: "mendoza", SANJUAN: "san_juan", NEUQUEN: "neuquen", RIONEGRO: "rio_negro",
  CHUBUT: "chubut", SANTACRUZ: "santa_cruz", TIERRADELFUEGO: "tierra_del_fuego"
};

// ============================================================
// AUDIOS GENERALES DE PANTALLAS
// ============================================================
var AUDIOS_GENERALES = {
  portada: "audio/01_portada.mp3",
  mapaConsigna: "audio/02_mapa_consigna.mp3",
  unionConsigna: "audio/04_union_consigna.mp3",
  memoriaConsigna: "audio/11_memoria_consigna.mp3",
  cierre: "audio/12_cierre.mp3",
  cierreBoton: "audio/12_cierre_boton.mp3",
  correcto: "audio/correcto.mp3",
  incorrecto: "audio/incorrecto.mp3"
};

// Lista ordenada de keys de provincias (útil para iterar / sortear)
var PROVINCIAS_KEYS = Object.keys(PROVINCIAS_INFO);
