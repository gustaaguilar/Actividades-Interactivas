// ============================================================
// DATOS - "Forraje Verde Hidropónico" (Desarrollo Regional, 4to año)
// Escuela Caye Hane 4-254, sede Arroyito - Secano Lavallino
// ============================================================

var AUDIOS_GENERALES = {
  portada: "audio/01_portada.mp3",
  queEsFvh: "audio/02_que_es_fvh.mp3",
  cierre: "audio/11_cierre.mp3",
  correcto: "audio/correcto.mp3",
  incorrecto: "audio/incorrecto.mp3"
};

var TEXTO_QUE_ES_FVH =
  "El forraje verde hidropónico es un alimento para animales que se produce sin tierra, " +
  "usando agua y semillas (maíz, cebada o trigo). Las semillas germinan y crecen en bandejas " +
  "durante unos 7 a 15 días, formando un pasto verde que se utiliza para alimentar el ganado.";

// ============================================================
// PANTALLA 3 - ASOCIACIÓN (¿Qué? ¿Por qué? ¿Para qué?)
// ============================================================
var ASOCIACION_CONSIGNA_AUDIO = "audio/03_asociacion_consigna.mp3";
var ASOCIACION_ITEMS = [
  {
    key: "que",
    pregunta: "¿Qué?",
    respuesta: "La producción de FVH consiste en cultivar semillas sin suelo, usando agua y condiciones controladas para obtener alimento fresco para el ganado en pocos días.",
    audio: "audio/03_asociacion_que.mp3"
  },
  {
    key: "porque",
    pregunta: "¿Por qué?",
    respuesta: "Porque en el secano Lavallino hay escasez de agua, suelos degradados y sequías frecuentes que dificultan la producción de pasturas naturales.",
    audio: "audio/03_asociacion_porque.mp3"
  },
  {
    key: "paraque",
    pregunta: "¿Para qué?",
    respuesta: "Para asegurar una fuente constante de alimento, mejorar la nutrición animal y contribuir al desarrollo sustentable de las familias del secano.",
    audio: "audio/03_asociacion_paraque.mp3"
  }
];

// ============================================================
// PANTALLA 4 - IDENTIFICAR OBJETIVOS
// ============================================================
var OBJETIVOS_CONSIGNA_AUDIO = "audio/04_objetivos_consigna.mp3";
var OBJETIVOS_OPCIONES = [
  { texto: "Garantizar forraje de calidad durante todo el año.", correcta: true },
  { texto: "Mejorar la nutrición y productividad del ganado.", correcta: true },
  { texto: "Reducir costos de alimentación.", correcta: true },
  { texto: "Reemplazar completamente las pasturas naturales de la región.", correcta: false },
  { texto: "Aumentar el uso de agroquímicos en la producción ganadera.", correcta: false },
  { texto: "Depender de la importación de forraje desde otras provincias.", correcta: false }
];

// ============================================================
// PANTALLA 5 - ORDENÁ EL PROCESO PRODUCTIVO (8 pasos)
// ============================================================
var PROCESO_CONSIGNA_AUDIO = "audio/05_proceso_consigna.mp3";
var PASOS_PROCESO = [
  { nombre: "Selección de semilla", detalle: "Se descartan las semillas dañadas o que no pueden germinar.", imagen: "img/paso_1_seleccion.jpg", audio: "audio/05_paso_1.mp3" },
  { nombre: "Desinfección", detalle: "10 ml de cloro en un balde con 2 litros de agua, por 30 segundos.", imagen: "img/paso_2_desinfeccion.jpg", audio: "audio/05_paso_2.mp3" },
  { nombre: "Lavado", detalle: "Se enjuaga con agua limpia, repitiendo 3 veces como mínimo.", imagen: "img/paso_3_lavado.jpg", audio: "audio/05_paso_3.mp3" },
  { nombre: "Hidratación", detalle: "Las semillas se dejan en remojo durante 24 horas.", imagen: "img/paso_4_hidratacion.jpg", audio: "audio/05_paso_4.mp3" },
  { nombre: "Escurrimiento", detalle: "En bolsa de arpillera, se dejan escurrir 48 horas.", imagen: "img/paso_5_escurrimiento.jpg", audio: "audio/05_paso_5.mp3" },
  { nombre: "Sembrado", detalle: "Las semillas se distribuyen bien desparramadas en la bandeja.", imagen: "img/paso_6_sembrado.jpg", audio: "audio/05_paso_6.mp3" },
  { nombre: "Riego", detalle: "Se riega con rociador cada 4 horas, durante unos 12 días.", imagen: "img/paso_7_riego.jpg", audio: "audio/05_paso_7.mp3" },
  { nombre: "Cosecha", detalle: "Entre 10 y 14 días, cuando el forraje alcanza los 20 cm.", imagen: "img/paso_8_cosecha.jpg", audio: "audio/05_paso_8.mp3" }
];

// ============================================================
// PANTALLA 6 - ARMÁ LA FRASE (foto + oración por paso)
// ============================================================
var ARMAR_FRASE_CONSIGNA_AUDIO = "audio/06_armar_frase_consigna.mp3";
var ETAPA_AUDIOS = [
  "audio/etapa_1_de_8.mp3", "audio/etapa_2_de_8.mp3", "audio/etapa_3_de_8.mp3", "audio/etapa_4_de_8.mp3",
  "audio/etapa_5_de_8.mp3", "audio/etapa_6_de_8.mp3", "audio/etapa_7_de_8.mp3", "audio/etapa_8_de_8.mp3"
];
var FRASES_PROCESO = [
  { texto: "Seleccionamos las semillas sin daños.", imagen: "img/paso_1_seleccion.jpg", audio: "audio/06_frase_1.mp3" },
  { texto: "Desinfectamos las semillas con cloro.", imagen: "img/paso_2_desinfeccion.jpg", audio: "audio/06_frase_2.mp3" },
  { texto: "Lavamos las semillas con agua limpia.", imagen: "img/paso_3_lavado.jpg", audio: "audio/06_frase_3.mp3" },
  { texto: "Hidratamos las semillas durante 24 horas.", imagen: "img/paso_4_hidratacion.jpg", audio: "audio/06_frase_4.mp3" },
  { texto: "Escurrimos las semillas en una bolsa de arpillera.", imagen: "img/paso_5_escurrimiento.jpg", audio: "audio/06_frase_5.mp3" },
  { texto: "Sembramos las semillas en la bandeja.", imagen: "img/paso_6_sembrado.jpg", audio: "audio/06_frase_6.mp3" },
  { texto: "Regamos las semillas cada 4 horas.", imagen: "img/paso_7_riego.jpg", audio: "audio/06_frase_7.mp3" },
  { texto: "Cosechamos el forraje entre 10 y 14 días.", imagen: "img/paso_8_cosecha.jpg", audio: "audio/06_frase_8.mp3" }
];

// ============================================================
// PANTALLA 7 - COMPLETAR TEXTO (fundamentación)
// ============================================================
var COMPLETAR_CONSIGNA_AUDIO = "audio/07_completar_consigna.mp3";
var COMPLETAR_AUDIO_FINAL = "audio/07_fundamentacion_completa.mp3";
// Cada bloque de texto es una lista de partes; las partes con "blanco" son los espacios a completar.
var COMPLETAR_TEXTO = [
  { tipo: "texto", contenido: "La producción de forraje verde hidropónico en el secano Lavallino surge como una alternativa sustentable frente a la escasez de " },
  { tipo: "blanco", respuesta: "agua" },
  { tipo: "texto", contenido: " y las sequías frecuentes de la región. El FVH se produce sin " },
  { tipo: "blanco", respuesta: "tierra" },
  { tipo: "texto", contenido: ", usando agua y semillas. Para desinfectar las semillas se usan 10 ml de " },
  { tipo: "blanco", respuesta: "cloro" },
  { tipo: "texto", contenido: " en 2 litros de agua. Las semillas se hidratan durante " },
  { tipo: "blanco", respuesta: "24" },
  { tipo: "texto", contenido: " horas antes de escurrir, y se cosechan cuando el forraje alcanza los " },
  { tipo: "blanco", respuesta: "20" },
  { tipo: "texto", contenido: " centímetros. Con este método se logró producir forraje de trigo en " },
  { tipo: "blanco", respuesta: "15" },
  { tipo: "texto", contenido: " días." }
];

// ============================================================
// PANTALLA 8 - SOPA DE LETRAS
// ============================================================
var SOPA_CONSIGNA_AUDIO = "audio/08_sopa_consigna.mp3";
var SOPA_PALABRAS = ["HIDROPONIA", "FORRAJE", "SEQUIA", "SEMILLA", "BANDEJA", "COSECHA", "RIEGO", "GANADO"];
var SOPA_AUDIOS = {
  HIDROPONIA: "audio/sopa_palabra_HIDROPONIA.mp3",
  FORRAJE: "audio/sopa_palabra_FORRAJE.mp3",
  SEQUIA: "audio/sopa_palabra_SEQUIA.mp3",
  SEMILLA: "audio/sopa_palabra_SEMILLA.mp3",
  BANDEJA: "audio/sopa_palabra_BANDEJA.mp3",
  COSECHA: "audio/sopa_palabra_COSECHA.mp3",
  RIEGO: "audio/sopa_palabra_RIEGO.mp3",
  GANADO: "audio/sopa_palabra_GANADO.mp3"
};

// ============================================================
// PANTALLA 9 - CRUCIGRAMA (filas separadas con pistas)
// ============================================================
var CRUCIGRAMA_CONSIGNA_AUDIO = "audio/09_crucigrama_consigna.mp3";
var CRUCIGRAMA_ITEMS = [
  { palabra: "DESINFECCION", pista: "Paso en el que se usa cloro para eliminar bacterias de la semilla.", audio: "audio/09_pista_1.mp3" },
  { palabra: "HIDRATACION", pista: "Paso en el que la semilla se remoja en agua durante 24 horas.", audio: "audio/09_pista_2.mp3" },
  { palabra: "ESCURRIMIENTO", pista: "Paso en bolsa de arpillera donde el agua se escurre 48 horas.", audio: "audio/09_pista_3.mp3" },
  { palabra: "LAVALLE", pista: "Región árida de Mendoza donde se desarrolla este proyecto.", audio: "audio/09_pista_4.mp3" },
  { palabra: "TRIGO", pista: "Cereal usado para producir el forraje, junto al maíz y la avena.", audio: "audio/09_pista_5.mp3" },
  { palabra: "NUTRICION", pista: "Beneficio que aporta el FVH a la alimentación del ganado.", audio: "audio/09_pista_6.mp3" }
];

// ============================================================
// PANTALLA 10 - VERDADERO O FALSO
// ============================================================
var VOF_CONSIGNA_AUDIO = "audio/10_vof_consigna.mp3";
var AFIRMACIONES_VOF = [
  { texto: "El forraje verde hidropónico se produce usando tierra fértil.", valor: false, audio: "audio/10_vof_1.mp3", imagen: "img/vof_1.jpg" },
  { texto: "Las semillas se desinfectan con cloro antes de sembrarlas.", valor: true, audio: "audio/10_vof_2.mp3", imagen: "img/vof_2.jpg" },
  { texto: "El proceso de hidratación dura 24 horas.", valor: true, audio: "audio/10_vof_3.mp3", imagen: "img/vof_3.jpg" },
  { texto: "La cosecha del FVH tarda más de un mes.", valor: false, audio: "audio/10_vof_4.mp3", imagen: "img/vof_4.jpg" },
  { texto: "El proyecto se desarrolló en Arroyito, en el secano Lavallino.", valor: true, audio: "audio/10_vof_5.mp3", imagen: "img/vof_5.jpg" },
  { texto: "Con 2 kg de trigo y 20 litros de agua se pueden obtener 7 kg de forraje en 15 días.", valor: true, audio: "audio/10_vof_6.mp3", imagen: "img/vof_6.jpg" }
];

// ============================================================
// PANTALLA 11 - CIERRE
// ============================================================
var CIERRE_IMAGEN = "img/resultado_final.jpg";
var CIERRE_TEXTO = "Como resultado final se obtuvieron 7 kg de trigo hidropónico fresco, que se entregó a la producción ovina, caprina y bovina de un vecino de la escuela.";

// Imágenes de contexto (usadas en pantalla 2 y en fundamentación)
var IMAGENES_CONTEXTO = {
  sequia: "img/contexto_sequia.jpg",
  pastoreo: "img/pastoreo_arreo.jpg",
  sustentacion: "img/sustentacion_ovejas.jpg"
};
