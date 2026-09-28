// ============================================================
// PALABRAS QUE SÉ — datos.js
// Alfabetización de adultos (CEBJA) — método Glenn Doman PURO
// (reconocimiento global de la palabra completa; sin análisis
// de sílabas ni decodificación fonética)
// ============================================================

const CONFIG = {
  titulo: "Palabras que Sé",
  subtitulo: "Reconocimiento de palabras con imágenes",
  frasePortada: "Cada palabra que ya sabés es un paso más en tu camino de lectura.",
  imagenPortada: "assets/portada.jpg",
  puntosPorAcierto: 10,
  // Tiempo de exposición de cada palabra en la escena de Presentación (ms).
  // Fiel al método Doman: exposición breve para forzar reconocimiento global,
  // no lectura analítica letra por letra. Avanza sola, sin botón.
  tiempoExposicionMs: 5000,
  // Pausa al acertar en Reconocimiento/Asociación/Lectura antes de avanzar
  // sola (ms). Solo para que alcance a verse el refuerzo verde; al fallar
  // no hace falta pausa fija porque ya avanza cuando termina el audio.
  pausaAciertoMs: 1500,
};

const PERFIL = {
  foto: "assets/perfil.jpg",
  mensajeLightbox: "Menos prisa, más vida 🧉🫂",
  contacto: "profegustaaguilar@gmail.com",
};

// Vocabulario de la semana 1 (25 palabras, definidas junto al equipo
// docente). "id" es la clave de archivo (sin acentos); "palabra" es lo
// que se muestra en pantalla (con acentos, en minúscula).
const TANDAS = [
  {
    id: "semana-1",
    nombre: "Semana 1",
    palabras: [
      { id: "casa",     palabra: "casa",     frase: "Vuelvo a mi casa después del trabajo." },
      { id: "pato",     palabra: "pato",     frase: "El pato nada en el agua." },
      { id: "ver",      palabra: "ver",      frase: "Me pongo los lentes para ver mejor." },
      { id: "familia",  palabra: "familia",  frase: "Reúno a mi familia los domingos." },
      { id: "palo",     palabra: "palo",     frase: "Uso un palo para sostener la planta." },

      { id: "melon",    palabra: "melón",    frase: "Corto el melón para el postre." },
      { id: "sandia",   palabra: "sandía",   frase: "La sandía es dulce y refrescante." },
      { id: "moneda",   palabra: "moneda",   frase: "Guardo la moneda en el bolsillo." },
      { id: "arbol",    palabra: "árbol",    frase: "El árbol da sombra en el patio." },
      { id: "limon",    palabra: "limón",    frase: "Exprimo un limón para el mate." },

      { id: "tomate",   palabra: "tomate",   frase: "Compro tomate para la ensalada." },
      { id: "comida",   palabra: "comida",   frase: "Preparo la comida para toda la familia." },
      { id: "cocinar",  palabra: "cocinar",  frase: "Me gusta cocinar los domingos." },
      { id: "lavar",    palabra: "lavar",    frase: "Voy a lavar la ropa hoy." },
      { id: "luna",     palabra: "luna",     frase: "La luna se ve grande esta noche." },

      { id: "sol",      palabra: "sol",      frase: "El sol calienta la mañana." },
      { id: "lentes",   palabra: "lentes",   frase: "Uso lentes para leer mejor." },
      { id: "coser",    palabra: "coser",    frase: "Aprendí a coser un botón." },
      { id: "mama",     palabra: "mamá",     frase: "Mi mamá cocina muy rico." },
      { id: "rosas",    palabra: "rosas",    frase: "Planté rosas en el jardín." },

      { id: "pan",      palabra: "pan",      frase: "Compro pan fresco cada mañana." },
      { id: "carne",    palabra: "carne",    frase: "Compro carne para el almuerzo." },
      { id: "cama",     palabra: "cama",     frase: "Hago la cama todas las mañanas." },
      { id: "foco",     palabra: "foco",     frase: "Cambio el foco de la cocina." },
      { id: "llave",    palabra: "llave",    frase: "Busco la llave para abrir la puerta." },
    ],
  },
];

// Vocabulario completo, con las rutas de assets ya resueltas.
const PALABRAS = TANDAS.flatMap((t) => t.palabras).map((p) => ({
  ...p,
  imagen: `assets/imagenes/${p.id}.jpg`,
  imagenFrase: `assets/imagenes/frase_${p.id}.jpg`,
  audioPalabra: `assets/audios/${p.id}.mp3`,
  audioFrase: `assets/audios/${p.id}_frase.mp3`,
}));

// Selector de días (lunes a viernes). Cada día suma 5 palabras nuevas.
// El repaso es ACUMULATIVO: al elegir un día se practican todas las
// palabras de ese día MÁS las de los días anteriores.
const DIAS = [
  { id: "lunes",     nombre: "Lunes",     palabras: ["casa", "pato", "ver", "familia", "palo"] },
  { id: "martes",    nombre: "Martes",    palabras: ["melon", "sandia", "moneda", "arbol", "limon"] },
  { id: "miercoles", nombre: "Miércoles", palabras: ["tomate", "comida", "cocinar", "lavar", "luna"] },
  { id: "jueves",    nombre: "Jueves",    palabras: ["sol", "lentes", "coser", "mama", "rosas"] },
  { id: "viernes",   nombre: "Viernes",   palabras: ["pan", "carne", "cama", "foco", "llave"] },
];

// Audios de instrucción de cada tipo de escena (se reproducen una sola vez
// la primera vez que aparece ese tipo de escena en la sesión).
const INSTRUCCIONES = {
  presentacion:    { texto: "Mirá la palabra y escuchá cómo se dice.",                          audio: "assets/audios/instr_presentacion.mp3" },
  reconocimiento:  { texto: "Tocá la palabra que corresponde a la imagen.",                      audio: "assets/audios/instr_reconocimiento.mp3" },
  asociacion:      { texto: "Tocá la imagen que corresponde a la palabra.",                      audio: "assets/audios/instr_asociacion.mp3" },
  lectura:         { texto: "Escuchá la frase y tocá la imagen correcta, la que representa la oración.", audio: "assets/audios/instr_lectura.mp3" },
};
