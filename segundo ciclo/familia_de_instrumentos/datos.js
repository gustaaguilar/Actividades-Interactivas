/* ============================================================
   Familia de Instrumentos - Segundo Ciclo
   datos.js — Contenido del paquete
   ============================================================ */

const INSTRUMENTOS = [
  // ---- CUERDA ----
  { id: "violin", familia: "cuerda", nombre: "Violín",
    img: "assets/img/instrumentos_800x600/cuerda-violin.jpg",
    sfx: "assets/audio/sfx/cuerda-violin.mp3",
    audioNombre: "assets/audio/narracion/nombre_violin.mp3" },
  { id: "violonchelo", familia: "cuerda", nombre: "Violonchelo",
    img: "assets/img/instrumentos_800x600/cuerda-violonchelo.jpg",
    sfx: "assets/audio/sfx/cuerda-violonchelo.mp3",
    audioNombre: "assets/audio/narracion/nombre_violonchelo.mp3" },
  { id: "arpa", familia: "cuerda", nombre: "Arpa",
    img: "assets/img/instrumentos_800x600/cuerda-arpa.jpg",
    sfx: "assets/audio/sfx/cuerda-arpa.mp3",
    audioNombre: "assets/audio/narracion/nombre_arpa.mp3" },
  { id: "piano", familia: "cuerda", nombre: "Piano de cola",
    img: "assets/img/instrumentos_800x600/cuerda-piano.jpg",
    sfx: "assets/audio/sfx/cuerda-piano.mp3",
    audioNombre: "assets/audio/narracion/nombre_piano.mp3" },

  // ---- PERCUSIÓN ----
  { id: "pandereta", familia: "percusion", nombre: "Pandereta",
    img: "assets/img/instrumentos_800x600/percusion-pandereta.jpg",
    sfx: "assets/audio/sfx/percusion-pandereta.mp3",
    audioNombre: "assets/audio/narracion/nombre_pandereta.mp3" },
  { id: "caja", familia: "percusion", nombre: "Caja (tambor)",
    img: "assets/img/instrumentos_800x600/percusion-caja.jpg",
    sfx: "assets/audio/sfx/percusion-caja.mp3",
    audioNombre: "assets/audio/narracion/nombre_caja.mp3" },
  { id: "triangulo", familia: "percusion", nombre: "Triángulo",
    img: "assets/img/instrumentos_800x600/percusion-triangulo.jpg",
    sfx: "assets/audio/sfx/percusion-triangulo.mp3",
    audioNombre: "assets/audio/narracion/nombre_triangulo.mp3" },
  { id: "caja_china", familia: "percusion", nombre: "Caja china",
    img: "assets/img/instrumentos_800x600/percusion-caja_china.jpg",
    sfx: "assets/audio/sfx/percusion-caja_china.mp3",
    audioNombre: "assets/audio/narracion/nombre_caja_china.mp3" },
  { id: "platillos", familia: "percusion", nombre: "Platillos",
    img: "assets/img/instrumentos_800x600/percusion-platillos.jpg",
    sfx: "assets/audio/sfx/percusion-platillos.mp3",
    audioNombre: "assets/audio/narracion/nombre_platillos.mp3" },
  { id: "bombo", familia: "percusion", nombre: "Bombo",
    img: "assets/img/instrumentos_800x600/percusion-bombo.jpg",
    sfx: "assets/audio/sfx/percusion-bombo.mp3",
    audioNombre: "assets/audio/narracion/nombre_bombo.mp3" },

  // ---- VIENTO ----
  { id: "fagot", familia: "viento", nombre: "Fagot",
    img: "assets/img/instrumentos_800x600/viento-fagot.jpg",
    sfx: "assets/audio/sfx/viento-fagot.mp3",
    audioNombre: "assets/audio/narracion/nombre_fagot.mp3" },
  { id: "trombon", familia: "viento", nombre: "Trombón",
    img: "assets/img/instrumentos_800x600/viento-trombon.jpg",
    sfx: "assets/audio/sfx/viento-trombon.mp3",
    audioNombre: "assets/audio/narracion/nombre_trombon.mp3" },
  { id: "clarinete", familia: "viento", nombre: "Clarinete",
    img: "assets/img/instrumentos_800x600/viento-clarinete.jpg",
    sfx: "assets/audio/sfx/viento-clarinete.mp3",
    audioNombre: "assets/audio/narracion/nombre_clarinete.mp3" },
  { id: "flauta_travesera", familia: "viento", nombre: "Flauta travesera",
    img: "assets/img/instrumentos_800x600/viento-flauta_travesera.jpg",
    sfx: "assets/audio/sfx/viento-flauta_travesera.mp3",
    audioNombre: "assets/audio/narracion/nombre_flauta_travesera.mp3" },
  { id: "saxofon", familia: "viento", nombre: "Saxofón",
    img: "assets/img/instrumentos_800x600/viento-saxofon.jpg",
    sfx: "assets/audio/sfx/viento-saxofon.mp3",
    audioNombre: "assets/audio/narracion/nombre_saxofon.mp3" },
  { id: "trompeta", familia: "viento", nombre: "Trompeta",
    img: "assets/img/instrumentos_800x600/viento-trompeta.jpg",
    sfx: "assets/audio/sfx/viento-trompeta.mp3",
    audioNombre: "assets/audio/narracion/nombre_trompeta.mp3" },
  { id: "tuba", familia: "viento", nombre: "Tuba",
    img: "assets/img/instrumentos_800x600/viento-tuba.jpg",
    sfx: "assets/audio/sfx/viento-tuba.mp3",
    audioNombre: "assets/audio/narracion/nombre_tuba.mp3" },
  { id: "trompa", familia: "viento", nombre: "Trompa",
    img: "assets/img/instrumentos_800x600/viento-trompa.jpg",
    sfx: "assets/audio/sfx/viento-trompa.mp3",
    audioNombre: "assets/audio/narracion/nombre_trompa.mp3" },
  { id: "oboe", familia: "viento", nombre: "Oboe",
    img: "assets/img/instrumentos_800x600/viento-oboe.jpg",
    sfx: "assets/audio/sfx/viento-oboe.mp3",
    audioNombre: "assets/audio/narracion/nombre_oboe.mp3" },
];

/* Tandas de la actividad de clasificar (6 + 6 + 7) */
const TANDAS_CLASIFICAR = [
  ["violin", "piano", "pandereta", "caja", "fagot", "clarinete"],
  ["violonchelo", "arpa", "triangulo", "caja_china", "trombon", "flauta_travesera"],
  ["platillos", "bombo", "saxofon", "trompeta", "tuba", "trompa", "oboe"],
];

/* Puzzles: 2 por familia, con imagen de niño/a tocando el instrumento */
const PUZZLES = [
  { instrumentoId: "violin", img: "assets/img/puzzles_800x600/cuerda-violin.jpg" },
  { instrumentoId: "piano", img: "assets/img/puzzles_800x600/cuerda-piano.jpg" },
  { instrumentoId: "bombo", img: "assets/img/puzzles_800x600/percusion-bombo.jpg" },
  { instrumentoId: "platillos", img: "assets/img/puzzles_800x600/percusion-platillos.jpg" },
  { instrumentoId: "trompeta", img: "assets/img/puzzles_800x600/viento-trompeta.jpg" },
  { instrumentoId: "saxofon", img: "assets/img/puzzles_800x600/viento-saxofon.jpg" },
];

/* Puzzles de texto: 2 por familia (ordenar letras para formar la palabra) */
const PUZZLES_TEXTO = [
  { instrumentoId: "arpa", palabra: "ARPA" },
  { instrumentoId: "violonchelo", palabra: "VIOLONCHELO" },
  { instrumentoId: "pandereta", palabra: "PANDERETA" },
  { instrumentoId: "triangulo", palabra: "TRIANGULO" },
  { instrumentoId: "fagot", palabra: "FAGOT" },
  { instrumentoId: "oboe", palabra: "OBOE" },
];
const SOPAS = {
  cuerda: ["VIOLIN", "VIOLONCHELO", "ARPA", "PIANO"],
  percusion: ["PANDERETA", "CAJA", "TRIANGULO", "CAJACHINA", "PLATILLOS", "BOMBO"],
  viento: ["FAGOT", "TROMBON", "CLARINETE", "FLAUTA", "SAXOFON", "TROMPETA", "TUBA", "TROMPA", "OBOE"],
};

/* Palabra de la sopa -> id de instrumento (para reproducir su sonido al encontrarla) */
const PALABRA_A_INSTRUMENTO = {
  VIOLIN: "violin", VIOLONCHELO: "violonchelo", ARPA: "arpa", PIANO: "piano",
  PANDERETA: "pandereta", CAJA: "caja", TRIANGULO: "triangulo", CAJACHINA: "caja_china",
  PLATILLOS: "platillos", BOMBO: "bombo",
  FAGOT: "fagot", TROMBON: "trombon", CLARINETE: "clarinete", FLAUTA: "flauta_travesera",
  SAXOFON: "saxofon", TROMPETA: "trompeta", TUBA: "tuba", TROMPA: "trompa", OBOE: "oboe",
};

const FAMILIAS = {
  cuerda:    { nombre: "Familia Cuerda",     color: "#7c3aed" },
  percusion: { nombre: "Familia Percusión",  color: "#f97316" },
  viento:    { nombre: "Familia Viento",     color: "#0ea5e9" },
};

const NARRACION = {
  bienvenida:             "assets/audio/narracion/bienvenida.mp3",
  consigna_inicio:        "assets/audio/narracion/consigna_inicio.mp3",
  consigna_clasificar:    "assets/audio/narracion/consigna_clasificar.mp3",
  acierto_cuerda:         "assets/audio/narracion/acierto_cuerda.mp3",
  acierto_percusion:      "assets/audio/narracion/acierto_percusion.mp3",
  acierto_viento:         "assets/audio/narracion/acierto_viento.mp3",
  error:                  "assets/audio/narracion/error.mp3",
  consigna_memo_cuerda:   "assets/audio/narracion/consigna_memo_cuerda.mp3",
  consigna_memo_percusion:"assets/audio/narracion/consigna_memo_percusion.mp3",
  consigna_memo_viento:   "assets/audio/narracion/consigna_memo_viento.mp3",
  consigna_sopa_cuerda:   "assets/audio/narracion/consigna_sopa_cuerda.mp3",
  consigna_sopa_percusion:"assets/audio/narracion/consigna_sopa_percusion.mp3",
  consigna_sopa_viento:   "assets/audio/narracion/consigna_sopa_viento.mp3",
  consigna_puzzle_cuerda: "assets/audio/narracion/consigna_puzzle_cuerda.mp3",
  consigna_puzzle_percusion:"assets/audio/narracion/consigna_puzzle_percusion.mp3",
  consigna_puzzle_viento: "assets/audio/narracion/consigna_puzzle_viento.mp3",
  consigna_puzzletexto_cuerda:   "assets/audio/narracion/consigna_puzzletexto_cuerda.mp3",
  consigna_puzzletexto_percusion:"assets/audio/narracion/consigna_puzzletexto_percusion.mp3",
  consigna_puzzletexto_viento:   "assets/audio/narracion/consigna_puzzletexto_viento.mp3",
  cierre_excelente:       "assets/audio/narracion/cierre_excelente.mp3",
  cierre_bien:            "assets/audio/narracion/cierre_bien.mp3",
  cierre_practicar:       "assets/audio/narracion/cierre_practicar.mp3",
};

const CONFIG = {
  titulo: "Familia de Instrumentos",
  subtitulo: "Segundo Ciclo · Educación Musical",
  puzzleFilas: 2,
  puzzleColumnas: 3,
};
