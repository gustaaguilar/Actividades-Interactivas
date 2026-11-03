/* Los medios de transporte — Nivel Inicial, Sala de 5 — QueSepanTodos.com
   © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
function A(a, t) { return { a: a, t: t }; }

/* ---------- Medios de transporte ----------
   n: nombre con artículo · e: emoji de respaldo · m: medio (tierra/agua/aire)
   s: sonido real (grabación en snd/<id>.mp3; el texto es solo de respaldo) · f: frase al tocarlo */
var TR = {
  auto:        { n: "el auto",               e: "🚗", m: "tierra", s: "¡Pi, pi!",            f: "El auto anda por la calle." },
  colectivo:   { n: "el colectivo",          e: "🚌", m: "tierra", s: "¡Piii, piii!",        f: "El colectivo lleva a muchas personas." },
  camion:      { n: "el camión",             e: "🚚", m: "tierra", s: "¡Poooon, poooon!",    f: "El camión lleva cosas pesadas." },
  moto:        { n: "la moto",               e: "🏍️", m: "tierra", s: "¡Brrrum, brrrum!",    f: "La moto tiene dos ruedas y motor." },
  bicicleta:   { n: "la bicicleta",          e: "🚲", m: "tierra", s: "¡Rin, rin!",          f: "La bicicleta se mueve con pedales." },
  tren:        { n: "el tren",               e: "🚂", m: "tierra", s: "¡Chu, chu!",          f: "El tren anda por las vías." },
  ambulancia:  { n: "la ambulancia",         e: "🚑", m: "tierra", s: "¡Iuuu, iuuu!",        f: "La ambulancia lleva a las personas enfermas al hospital." },
  tractor:     { n: "el tractor",            e: "🚜", m: "tierra", s: "¡Tractractrac!",      f: "El tractor trabaja en el campo." },
  bomberos:    { n: "el camión de bomberos", e: "🚒", m: "tierra", s: "¡Uiiuu, uiiuu!",      f: "El camión de bomberos va a apagar el fuego." },
  barco:       { n: "el barco",              e: "🚢", m: "agua",   s: "¡Buuuuu!",            f: "El barco navega por el mar." },
  velero:      { n: "el velero",             e: "⛵", m: "agua",   s: null,                  f: "El velero se mueve con el viento." },
  lancha:      { n: "la lancha",             e: "🚤", m: "agua",   s: "¡Rrrrrrr!",           f: "La lancha va rápido por el agua." },
  submarino:   { n: "el submarino",          e: "🟡", m: "agua",   s: null,                  f: "El submarino viaja debajo del agua." },
  avion:       { n: "el avión",              e: "✈️", m: "aire",   s: "¡Shhhhhh!",           f: "El avión vuela por el cielo." },
  helicoptero: { n: "el helicóptero",        e: "🚁", m: "aire",   s: "¡Tacatacataca!",      f: "El helicóptero vuela con sus hélices." },
  globo:       { n: "el globo aerostático",  e: "🎈", m: "aire",   s: null,                  f: "El globo aerostático sube con aire caliente." }
};
var LUGAR = {
  tierra: { n: "Por tierra", e: "🛣️", img: "img/l_tierra.jpg", dice: "Por tierra: por la calle, la ruta y las vías." },
  agua:   { n: "Por agua",   e: "🌊", img: "img/l_agua.jpg",   dice: "Por agua: por el río, el lago y el mar." },
  aire:   { n: "Por aire",   e: "☁️", img: "img/l_aire.jpg",   dice: "Por aire: volando por el cielo." }
};
var CONDUCE = {
  piloto:     { n: "el piloto",     e: "👨‍✈️" },
  capitan:    { n: "la capitana",   e: "🧑‍✈️" },
  chofer:     { n: "el chofer",     e: "🧑" },
  maquinista: { n: "la maquinista", e: "👷" },
  bombero:    { n: "la bombera",    e: "🧑‍🚒" }
};

function may(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function del(n) { return n.indexOf("el ") === 0 ? "del " + n.slice(3) : "de " + n; }
function tr(id) { var x = TR[id]; return { id: id, img: "img/" + id + ".png", emoji: x.e, nombre: A("nom_" + id, may(x.n) + ".") }; }
/* sonido real: el motor busca snd/<id>.mp3; si falta, lee el texto de respaldo */
function son(id) { return { a: "snd_" + id, t: TR[id].s, ruta: "snd/" + id + ".mp3", efecto: true }; }

function hoja(n, ids, intro) {
  return {
    tipo: "sombras", titulo: "Unimos cada sombra con su transporte", hoja: n,
    consigna: "Tocá una sombra 🖤 y después el transporte ✨",
    intro: intro,
    pares: ids.map(function (id) {
      var p = tr(id);
      p.conf = A("sombra_ok_" + id, "¡Muy bien! Es la sombra " + del(TR[id].n) + ". " + TR[id].f);
      return p;
    })
  };
}
function sonidoItem(id, otros) {
  var it = tr(id);
  it.sonido = son(id);
  it.opciones = [id].concat(otros).map(function (o) { var a = tr(o); a.ok = o === id; return a; });
  it.conf = A("son_ok_" + id, "¡Sí! Así suena " + TR[id].n + ".");
  return it;
}
function pregunta(clave, texto, ok, otros, conf) {
  return {
    texto: texto, pregunta: A("preg_" + clave, texto),
    opciones: [ok].concat(otros).map(function (o) { var a = tr(o); a.ok = o === ok; return a; }),
    conf: A("preg_ok_" + clave, "¡Sí! " + conf)
  };
}

window.DATOS = {
  meta: {
    titulo: "Los medios de transporte",
    tituloCorto: "Los medios de transporte",
    subtitulo: "¡Por tierra, por agua y por aire! 🚗⛵✈️",
    nivel: "Nivel Inicial (Sala de 5) y 1.er grado",
    area: "Nivel Inicial y 1.er grado · Ambiente, Cultura y Tecnología",
    autor: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    licencia: "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    video: "xv5NtvVFbGw",
    revision: false
  },
  comunes: {
    error: A("comun_error", "¡Uy, ese no es! Probá otra vez."),
    sombra: A("comun_sombra", "¿De quién será esta sombra?"),
    quien: A("comun_quien", "¿Quién hace este ruido?"),
    elegi: A("comun_elegi", "Ahora tocá el transporte que va con esa sombra."),
    lugar: { tierra: A("lug_tierra", LUGAR.tierra.dice), agua: A("lug_agua", LUGAR.agua.dice), aire: A("lug_aire", LUGAR.aire.dice) }
  },
  lugares: LUGAR,
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada.jpg", emoji: "🚗⛵✈️",
      audio: A("p00_portada", "¡Hola! Hoy vamos a jugar con los medios de transporte: los que van por tierra, por agua y por aire. Tocá el botón verde para empezar.") },

    /* 1 */
    { tipo: "video", titulo: "🎬 Miramos el video",
      texto: "Tocá el botón rojo ▶ para ver el video",
      audio: A("p01_video", "Mirá el video y bailá la canción de los medios de transporte. Tocá el botón rojo. Cuando termines, tocá Siguiente.") },

    /* 2 */
    { tipo: "explorar", titulo: "🔊 Escuchamos los transportes",
      consigna: "Tocá cada transporte para escucharlo",
      intro: A("p02_explorar", "Tocá cada transporte: vas a escuchar cómo se llama y cómo suena. Cuando los escuches a todos, tocá Siguiente."),
      animales: ["auto", "colectivo", "moto", "bicicleta", "tren", "ambulancia", "bomberos", "camion", "tractor", "barco", "lancha", "avion", "helicoptero"].map(function (id) {
        var a = tr(id); a.sonido = son(id); a.hace = A("dice_" + id, TR[id].f); return a;
      }) },

    /* 3 */
    { tipo: "narracion", titulo: "🗺️ ¿Por dónde van?",
      escena: [
        { id: "tierra", a: { img: LUGAR.tierra.img, emoji: LUGAR.tierra.e }, c: tr("auto") },
        { id: "agua",   a: { img: LUGAR.agua.img,   emoji: LUGAR.agua.e },   c: tr("barco") },
        { id: "aire",   a: { img: LUGAR.aire.img,   emoji: LUGAR.aire.e },   c: tr("avion") }
      ],
      pasos: [
        { texto: "Los transportes nos llevan de un lugar a otro 🧳", marca: [], audio: A("p03_n1", "Los medios de transporte nos llevan a nosotros y a las cosas de un lugar a otro.") },
        { texto: "Por tierra 🛣️ el auto", marca: ["tierra"], audio: A("p03_n2", "Algunos van por tierra, como el auto.") },
        { texto: "Por agua 🌊 el barco", marca: ["agua"], audio: A("p03_n3", "Otros van por agua, como el barco.") },
        { texto: "Por aire ☁️ el avión", marca: ["aire"], audio: A("p03_n4", "Y otros van por aire, volando, como el avión.") },
        { texto: "¡Ahora te toca a vos! 🙌", marca: [], audio: A("p03_n5", "¡Ahora te toca a vos!") }
      ] },

    /* 4 */
    { tipo: "clasificar", titulo: "🛣️🌊☁️ ¿Por dónde va?",
      consigna: "Tocá por dónde va: tierra, agua o aire",
      intro: A("p04_clasificar", "Mirá el transporte y tocá por dónde va: por tierra, por agua o por aire."),
      items: ["auto", "barco", "avion", "tren", "velero", "helicoptero", "tractor", "submarino", "globo", "colectivo"].map(function (id) {
        var it = tr(id); it.medio = TR[id].m;
        it.conf = A("clas_ok_" + id, "¡Sí! " + may(TR[id].n) + " va por " + TR[id].m + ".");
        return it;
      }) },

    /* 5–6 */
    hoja(1, ["auto", "avion", "barco", "bicicleta", "tren"],
      A("p05_sombras", "Mirá: de un lado están las sombras negras, y del otro, los transportes. Tocá una sombra y después el transporte que tiene esa misma forma. ¡Se unen con una línea!")),
    hoja(2, ["helicoptero", "moto", "colectivo", "velero", "globo"],
      A("p06_sombras", "¡Otra hoja de sombras! Fijate bien en las ruedas, las alas y las velas.")),

    /* 7 */
    { tipo: "sonidos", titulo: "👂 ¿Quién hace este ruido?",
      consigna: "Escuchá 🔊 y tocá el transporte",
      intro: A("p07_sonidos", "Ahora escuchá con atención. Vas a oír un ruido. Tocá el transporte que hace ese ruido. Para escucharlo otra vez, tocá el parlante."),
      items: [
        sonidoItem("tren", ["barco", "bicicleta"]),
        sonidoItem("ambulancia", ["moto", "avion"]),
        sonidoItem("bicicleta", ["camion", "helicoptero"]),
        sonidoItem("barco", ["auto", "avion"]),
        sonidoItem("helicoptero", ["bicicleta", "tren"]),
        sonidoItem("moto", ["velero", "tren"])
      ] },

    /* 8 */
    { tipo: "elegir", titulo: "🤔 ¿Cuál es?",
      consigna: "Escuchá la pregunta y tocá el transporte",
      intro: A("p08_elegir", "Escuchá la pregunta y tocá el transporte que corresponde."),
      items: [
        pregunta("vuela", "¿Cuál vuela por el cielo?", "avion", ["auto", "barco"], "El avión vuela por el cielo."),
        pregunta("vias", "¿Cuál anda por las vías?", "tren", ["colectivo", "lancha"], "El tren anda por las vías."),
        pregunta("pedales", "¿Cuál se mueve con pedales?", "bicicleta", ["moto", "auto"], "La bicicleta se mueve con pedales."),
        pregunta("debajo", "¿Cuál viaja debajo del agua?", "submarino", ["barco", "avion"], "El submarino viaja debajo del agua."),
        pregunta("enfermo", "¿Cuál lleva a las personas enfermas al hospital?", "ambulancia", ["camion", "globo"], "La ambulancia lleva a las personas enfermas al hospital."),
        pregunta("fuego", "¿Cuál va a apagar el fuego?", "bomberos", ["colectivo", "moto"], "El camión de bomberos va a apagar el fuego.")
      ] },

    /* 9 */
    { tipo: "unirComida", titulo: "🧑‍✈️ ¿Quién lo maneja?",
      consigna: "Tocá un transporte y después quién lo maneja",
      intro: A("p09_unir", "Cada transporte tiene una persona que lo maneja. Tocá un transporte y después tocá a la persona que lo maneja."),
      pares: [
        ["avion", "piloto", "El piloto maneja el avión."],
        ["barco", "capitan", "La capitana maneja el barco."],
        ["colectivo", "chofer", "El chofer maneja el colectivo."],
        ["tren", "maquinista", "La maquinista maneja el tren."],
        ["bomberos", "bombero", "La bombera maneja el camión de bomberos."]
      ].map(function (p) {
        var c = CONDUCE[p[1]];
        return { a: tr(p[0]), c: { id: p[1], img: "img/p_" + p[1] + ".png", emoji: c.e, nombre: A("per_" + p[1], may(c.n) + ".") },
                 conf: A("unir_ok_" + p[0], "¡Muy bien! " + p[2]) };
      }) },

    /* 10 */
    { tipo: "cierre", img: "img/cierre.jpg", emoji: "🏆🚗",
      audio: A("p10_cierre", "¡Terminaste! Ya conocés los medios de transporte que van por tierra, por agua y por aire. ¡Te felicito!") }
  ]
};
