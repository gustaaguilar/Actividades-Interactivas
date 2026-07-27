/* ============================================================
   Sonido Fuerte / Sonido Débil - Primer Ciclo
   datos.js — Contenido del paquete
   ============================================================ */

const ESCENAS = [
  { id: "nino_barriendo",        tipo: "debil",  nombre: "Niño barriendo",
    img: "assets/img/800x600/debil-nino_barriendo.jpg",
    sfx: "assets/audio/sfx/debil-nino_barriendo.mp3",
    audioNombre: "assets/audio/nombres/nino_barriendo.mp3" },

  { id: "nino_hojas_cuaderno",   tipo: "debil",  nombre: "Niño pasando las hojas del cuaderno",
    img: "assets/img/800x600/debil-nino_hojas_cuaderno.jpg",
    sfx: "assets/audio/sfx/debil-nino_hojas_cuaderno.mp3",
    audioNombre: "assets/audio/nombres/nino_hojas_cuaderno.mp3" },

  { id: "abeja_zumbando",        tipo: "debil",  nombre: "Abeja zumbando",
    img: "assets/img/800x600/debil-abeja_zumbando.jpg",
    sfx: "assets/audio/sfx/debil-abeja_zumbando.mp3",
    audioNombre: "assets/audio/nombres/abeja_zumbando.mp3" },

  { id: "nina_flauta",           tipo: "debil",  nombre: "Niña tocando la flauta",
    img: "assets/img/800x600/debil-nina_tocando_flauta.jpg",
    sfx: "assets/audio/sfx/debil-nina_tocando_flauta.mp3",
    audioNombre: "assets/audio/nombres/nina_flauta.mp3" },

  { id: "gatito_maullando",      tipo: "debil",  nombre: "Gatito maullando",
    img: "assets/img/800x600/debil-gatito_maullando.jpg",
    sfx: "assets/audio/sfx/debil-gatito_maullando.mp3",
    audioNombre: "assets/audio/nombres/gatito_maullando.mp3" },

  { id: "pajarito_piando",       tipo: "debil",  nombre: "Pajarito piando",
    img: "assets/img/800x600/debil-pajarito_piando.jpg",
    sfx: "assets/audio/sfx/debil-pajarito_piando.mp3",
    audioNombre: "assets/audio/nombres/pajarito_piando.mp3" },

  { id: "obrero_martillo",       tipo: "fuerte", nombre: "Obrero martillando un clavo",
    img: "assets/img/800x600/fuerte-obrero_martillando_clavo.jpg",
    sfx: "assets/audio/sfx/fuerte-obrero_martillando_clavo.mp3",
    audioNombre: "assets/audio/nombres/obrero_martillo.mp3" },

  { id: "leon_rugiendo",         tipo: "fuerte", nombre: "León rugiendo",
    img: "assets/img/800x600/fuerte-leon_rugiendo.jpg",
    sfx: "assets/audio/sfx/fuerte-leon_rugiendo.mp3",
    audioNombre: "assets/audio/nombres/leon_rugiendo.mp3" },

  { id: "reloj_despertador",     tipo: "fuerte", nombre: "Reloj despertador",
    img: "assets/img/800x600/fuerte-reloj_despertador.jpg",
    sfx: "assets/audio/sfx/fuerte-reloj_despertador.mp3",
    audioNombre: "assets/audio/nombres/reloj_despertador.mp3" },

  { id: "avion_pasajeros",       tipo: "fuerte", nombre: "Avión de pasajeros",
    img: "assets/img/800x600/fuerte-avion_pasajeros.jpg",
    sfx: "assets/audio/sfx/fuerte-avion_pasajeros.mp3",
    audioNombre: "assets/audio/nombres/avion_pasajeros.mp3" },

  { id: "nino_tambor",           tipo: "fuerte", nombre: "Niño tocando el tambor",
    img: "assets/img/800x600/fuerte-nino_tocando_tambor.jpg",
    sfx: "assets/audio/sfx/fuerte-nino_tocando_tambor.mp3",
    audioNombre: "assets/audio/nombres/nino_tambor.mp3" },

  { id: "nino_radio",            tipo: "fuerte", nombre: "Niño escuchando la radio",
    img: "assets/img/800x600/fuerte-nino_escuchando_radio.jpg",
    sfx: "assets/audio/sfx/fuerte-nino_escuchando_radio.mp3",
    audioNombre: "assets/audio/nombres/nino_radio.mp3" },
];

/* Puzzles dobles: 4 débiles + 4 fuertes */
const PUZZLES_IDS = [
  "abeja_zumbando",
  "nina_flauta",
  "nino_hojas_cuaderno",
  "gatito_maullando",
  "leon_rugiendo",
  "nino_tambor",
  "obrero_martillo",
  "avion_pasajeros",
];

/* Escenas usadas como ilustración en la pantalla de consigna inicial */
const EJEMPLO_ILUSTRACION = {
  debil: "abeja_zumbando",
  fuerte: "leon_rugiendo",
};

/* Audios de narración */
const NARRACION = {
  bienvenida:            "assets/audio/narracion/bienvenida.mp3",
  consigna_inicio:       "assets/audio/narracion/consigna_inicio.mp3",
  consigna_clasificar:   "assets/audio/narracion/consigna_clasificar.mp3",
  consigna_memo_debil:   "assets/audio/narracion/consigna_memo_debil.mp3",
  consigna_memo_fuerte:  "assets/audio/narracion/consigna_memo_fuerte.mp3",
  consigna_puzzle_debil: "assets/audio/narracion/consigna_puzzle_debil.mp3",
  consigna_puzzle_fuerte:"assets/audio/narracion/consigna_puzzle_fuerte.mp3",
  acierto:               "assets/audio/narracion/acierto.mp3",
  acierto_debil:         "assets/audio/narracion/acierto_debil.mp3",
  acierto_fuerte:        "assets/audio/narracion/acierto_fuerte.mp3",
  error:                 "assets/audio/narracion/error.mp3",
  cierre_excelente:      "assets/audio/narracion/cierre_excelente.mp3",
  cierre_bien:           "assets/audio/narracion/cierre_bien.mp3",
  cierre_practicar:      "assets/audio/narracion/cierre_practicar.mp3",
};

/* Configuración general */
const CONFIG = {
  titulo: "Sonido Fuerte y Sonido Débil",
  subtitulo: "Primer Ciclo · Educación Musical",
  colorFuerte: "#c62828",
  colorDebil: "#2e8b57",
  puzzleFilas: 2,
  puzzleColumnas: 3,
};
