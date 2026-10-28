/* Sombras, sonidos y comidas de los animales — Nivel Inicial, Sala de 4 — QueSepanTodos.com
   © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
function A(a, t) { return { a: a, t: t }; }

/* ---------- Animales del material ----------
   n: nombre con artículo · s: onomatopeya (null = no hace ruido) · c: cómo se escribe "hace" */
var ANI = {
  arana:      { n: "la araña",      e: "🕷️", s: null },
  aguila:     { n: "el águila",     e: "🦅", s: "¡Kiiiaaa, kiiiaaa!" },
  burro:      { n: "el burro",      e: "🫏", s: "¡Iii-aaa, iii-aaa!" },
  caballo:    { n: "el caballo",    e: "🐎", s: "¡Jiiijiiijiii!" },
  cangrejo:   { n: "el cangrejo",   e: "🦀", s: null },
  perro:      { n: "el perro",      e: "🐕", s: "¡Guau, guau!" },
  pez:        { n: "el pez",        e: "🐟", s: null },
  tortuga:    { n: "la tortuga",    e: "🐢", s: null },
  vaca:       { n: "la vaca",       e: "🐄", s: "¡Muuuuu!" },
  caracol:    { n: "el caracol",    e: "🐌", s: null },
  chancho:    { n: "el chancho",    e: "🐖", s: "¡Oinc, oinc, oinc!" },
  cocodrilo:  { n: "el cocodrilo",  e: "🐊", s: null },
  conejo:     { n: "el conejo",     e: "🐇", s: null },
  delfin:     { n: "el delfín",     e: "🐬", s: "¡Iiiiii, iiiiii!" },
  elefante:   { n: "el elefante",   e: "🐘", s: "¡Pruuuuu!" },
  gallo:      { n: "el gallo",      e: "🐓", s: "¡Quiquiriquí!" },
  jirafa:     { n: "la jirafa",     e: "🦒", s: null },
  mariposa:   { n: "la mariposa",   e: "🦋", s: null },
  oveja:      { n: "la oveja",      e: "🐑", s: "¡Beeee, beeee!" },
  gato:       { n: "el gato",       e: "🐈", s: "¡Miau, miau!" },
  leon:       { n: "el león",       e: "🦁", s: "¡Grrrrr!" },
  pollito:    { n: "el pollito",    e: "🐤", s: "¡Pío, pío, pío!" },
  cabra:      { n: "la cabra",      e: "🐐", s: "¡Meee, meee!" },
  oso:        { n: "el oso",        e: "🐻", s: "¡Grrrrr!" },
  cebra:      { n: "la cebra",      e: "🦓", s: null },
  gallina:    { n: "la gallina",    e: "🐔", s: "¡Coc, coc, coc!" },
  mono:       { n: "el mono",       e: "🐒", s: "¡U, u, a, a!" },
  hipopotamo: { n: "el hipopótamo", e: "🦛", s: null },
  tigre:      { n: "el tigre",      e: "🐅", s: "¡Grrrrr!" }
};
/* Qué hace cuando no hace ruido (para la confirmación) */
var CALLADO = {
  arana: "La araña no hace ruido: camina calladita con sus ocho patas.",
  cangrejo: "El cangrejo no hace ruido: camina de costado.",
  pez: "El pez no hace ruido: nada en el agua.",
  tortuga: "La tortuga no hace ruido: camina muy despacito.",
  caracol: "El caracol no hace ruido: lleva su casita en la espalda.",
  cocodrilo: "El cocodrilo casi no hace ruido: abre su bocota grande.",
  conejo: "El conejo no hace ruido: salta y salta.",
  jirafa: "La jirafa casi no hace ruido: tiene el cuello muy largo.",
  mariposa: "La mariposa no hace ruido: vuela despacito."
};

var COM = {
  miel:      { n: "la miel",      e: "🍯" },
  morron:    { n: "el morrón",    e: "🫑" },
  carne:     { n: "la carne",     e: "🥩" },
  leche:     { n: "la leche",     e: "🥛" },
  pescado:   { n: "el pescado",   e: "🐟" },
  hueso:     { n: "el hueso",     e: "🦴" },
  queso:     { n: "el queso",     e: "🧀" },
  lombriz:   { n: "la lombriz",   e: "🪱" },
  hoja:      { n: "la hoja",      e: "🍃" },
  zanahoria: { n: "la zanahoria", e: "🥕" },
  pasto:     { n: "el pasto",     e: "🌿" },
  pan:       { n: "el pan",       e: "🍞" },
  banana:    { n: "la banana",    e: "🍌" },
  choclo:    { n: "el choclo",    e: "🌽" },
  sandia:    { n: "la sandía",    e: "🍉" }
};

function may(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function del(n) { return n.indexOf("el ") === 0 ? "del " + n.slice(3) : "de " + n; }
function ani(id) { var x = ANI[id]; return { id: id, img: "img/" + id + ".png", emoji: x.e, nombre: A("nom_" + id, may(x.n) + ".") }; }
function com(id) { var x = COM[id]; return { id: id, img: "img/c_" + id + ".png", emoji: x.e, nombre: A("com_" + id, may(x.n) + ".") }; }
function hace(id) { var x = ANI[id]; return x.s ? may(x.n) + " hace: " + x.s : CALLADO[id]; }
/* En las confirmaciones la voz dice solo "El X hace:" y a continuación suena el animal real */
function haceCorto(id) { var x = ANI[id]; return x.s ? may(x.n) + " hace:" : CALLADO[id]; }

/* Unir la sombra: una hoja = 4 o 5 animales */
function hoja(n, ids, intro) {
  return {
    tipo: "sombras", titulo: "Unimos cada sombra con su animal", hoja: n,
    consigna: "Tocá una sombra 🖤 y después el animal ✨",
    intro: intro,
    pares: ids.map(function (id) {
      var p = ani(id);
      p.conf = A("sombra_ok_" + id, "¡Muy bien! Es la sombra " + del(ANI[id].n) + ". " + haceCorto(id));
      return p;
    })
  };
}

/* Qué come: animal + 4 comidas (como en la lámina, opciones A a D) */
function come(id, opciones, ok, gusta) {
  var it = ani(id);
  it.pregunta = A("come_preg_" + id, "¿Qué come " + ANI[id].n + "? Tocá su comida favorita.");
  it.texto = "¿Qué come " + ANI[id].n + "?";
  it.opciones = opciones.map(function (c) { var o = com(c); o.ok = c === ok; return o; });
  it.conf = A("come_ok_" + id, "¡Sí! " + gusta);
  return it;
}

function sonidoItem(id, otros) {
  var it = ani(id);
  it.sonido = A("son_" + id, ANI[id].s);
  it.opciones = [id].concat(otros).map(function (o) { var a = ani(o); a.ok = o === id; return a; });
  it.conf = A("son_ok_" + id, "¡Sí! " + haceCorto(id));
  return it;
}

/* Memojuego (tarjetas para dar vuelta). Cada par: a (animal) + b (su sombra o su comida) + conf (audio al formar la pareja) */
function memoSombra(ids, intro) {
  return {
    tipo: "memo", titulo: "🃏 Memojuego: animal y sombra",
    consigna: "Da vuelta dos tarjetas y buscá las parejas",
    intro: intro,
    pares: ids.map(function (id) {
      var a = ani(id);
      return { id: id, a: a, b: { img: a.img, emoji: a.emoji, sil: true },
               conf: A("memo_ok_" + id, "¡Muy bien! Es la sombra " + del(ANI[id].n) + ".") };
    })
  };
}
function memoComida(lista, intro) {   /* lista: [animal, comida, audio de confirmación ya existente] */
  return {
    tipo: "memo", titulo: "🃏 Memojuego: animal y comida",
    consigna: "Da vuelta dos tarjetas y buscá las parejas",
    intro: intro,
    pares: lista.map(function (p) { return { id: p[0], a: ani(p[0]), b: com(p[1]), conf: p[2] }; })
  };
}

window.DATOS = {
  meta: {
    titulo: "Sombras, sonidos y comidas de los animales",
    tituloCorto: "Los animales",
    subtitulo: "¡A jugar con los animales! 🐾",
    nivel: "Nivel Inicial · Sala de 4",
    area: "Nivel Inicial · Sala de 4 · Ambiente natural",
    autor: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    licencia: "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    video: "T_oqWPd513M",
    revision: false   /* flechas ◀ ▶ de revisión: desactivadas (paquete cerrado) */
  },
  comunes: {
    error: A("comun_error", "¡Uy, ese no es! Probá otra vez."),
    sombra: A("comun_sombra", "¿De quién será esta sombra?"),
    quien: A("comun_quien", "¿Quién hace este sonido?"),
    elegi: A("comun_elegi", "Ahora tocá el animal que va con esa sombra.")
  },
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada.jpg", emoji: "🐶🐮🐔",
      audio: A("p00_portada", "¡Hola! Hoy vamos a jugar con los animales: sus sombras, sus sonidos y lo que comen. Tocá el botón verde para empezar.") },

    /* 1 */
    { tipo: "video", titulo: "🎬 Miramos el video",
      texto: "Tocá el botón rojo ▶ para ver el video",
      audio: A("p01_video", "Mirá el video de los animales y sus sonidos. Tocá el botón rojo. Cuando termines, tocá Siguiente.") },

    /* 2 */
    { tipo: "explorar", titulo: "🔊 Escuchamos a los animales",
      consigna: "Tocá cada animal para escucharlo",
      intro: A("p02_explorar", "Tocá cada animal y escuchá cómo hace. Cuando los escuches a todos, tocá Siguiente."),
      animales: ["perro", "gato", "vaca", "caballo", "burro", "chancho", "gallo", "oveja", "aguila", "elefante", "delfin"].map(function (id) {
        var a = ani(id); a.hace = A("hace_" + id, hace(id)); return a;
      }) },

    /* 3–6: las cuatro hojas de sombras */
    hoja(1, ["arana", "aguila", "burro", "caballo", "cangrejo"],
      A("p03_sombras", "Mirá: de un lado están las sombras negras, y del otro, los animales. Tocá una sombra y después tocá el animal que tiene esa misma forma. ¡Así se unen con una línea!")),
    hoja(2, ["perro", "pez", "tortuga", "vaca"],
      A("p04_sombras", "¡Otra hoja de sombras! Tocá una sombra y después su animal.")),
    hoja(3, ["caracol", "chancho", "cocodrilo", "conejo", "delfin"],
      A("p05_sombras", "¡Vamos con más sombras! Fijate bien en la forma de cada una.")),
    hoja(4, ["elefante", "gallo", "jirafa", "mariposa", "oveja"],
      A("p06_sombras", "¡La última hoja de sombras! Mirá las orejas, las patas y las colas.")),

    /* 7: memojuego 1 (a mitad del recorrido) */
    memoSombra(["elefante", "gallo", "delfin", "perro"],
      A("memo1_intro", "¡Ahora jugamos al memojuego! Tocá dos tarjetas. Si son un animal y su sombra, ¡se quedan! Si no, se vuelven a tapar. ¡Encontrá todas las parejas!")),

    /* 8 */
    { tipo: "sonidos", titulo: "👂 ¿Quién hace este sonido?",
      consigna: "Escuchá 🔊 y tocá el animal",
      intro: A("p07_sonidos", "Ahora escuchá con atención. Vas a oír un sonido. Tocá el animal que hace ese sonido. Si querés escucharlo otra vez, tocá el parlante."),
      items: [
        sonidoItem("perro", ["gato", "vaca"]),
        sonidoItem("vaca", ["oveja", "caballo"]),
        sonidoItem("gallo", ["pollito", "chancho"]),
        sonidoItem("oveja", ["vaca", "perro"]),
        sonidoItem("chancho", ["burro", "gallo"]),
        sonidoItem("gato", ["pollito", "perro"]),
        sonidoItem("burro", ["caballo", "oveja"]),
        sonidoItem("elefante", ["leon", "jirafa"])
      ] },

    /* 9 */
    { tipo: "narracion", titulo: "🍽️ ¿Qué comen los animales?",
      escena: [
        { id: "leon", a: ani("leon"), c: com("carne") },
        { id: "conejo", a: ani("conejo"), c: com("zanahoria") },
        { id: "vaca", a: ani("vaca"), c: com("pasto") }
      ],
      pasos: [
        { texto: "Los animales comen para crecer fuertes 💪", marca: [], audio: A("p08_n1", "Los animales también comen, para crecer grandes y fuertes. Pero no todos comen lo mismo.") },
        { texto: "El león come carne 🥩", marca: ["leon"], audio: A("p08_n2", "El león come carne.") },
        { texto: "El conejo come zanahoria 🥕", marca: ["conejo"], audio: A("p08_n3", "El conejo come zanahorias.") },
        { texto: "La vaca come pasto 🌿", marca: ["vaca"], audio: A("p08_n4", "Y la vaca come pasto.") },
        { texto: "¡Ahora ayudá a cada animal! 🙌", marca: [], audio: A("p08_n5", "¡Ahora vos vas a ayudar a cada animal a encontrar su comida favorita!") }
      ] },

    /* 10: lámina "¿Qué comen los animales?" */
    { tipo: "comida", titulo: "😋 Su comida favorita",
      consigna: "Tocá la comida que le gusta",
      intro: A("p09_comida", "Mirá el animal y tocá su comida favorita."),
      items: [
        come("leon", ["miel", "morron", "carne", "leche"], "carne", "Al león le gusta la carne."),
        come("pollito", ["lombriz", "queso", "hoja", "zanahoria"], "lombriz", "Al pollito le gustan las lombrices."),
        come("cabra", ["queso", "pasto", "pescado", "lombriz"], "pasto", "A la cabra le gusta el pasto."),
        come("oso", ["pan", "hueso", "hoja", "miel"], "miel", "Al oso le encanta la miel."),
        come("gato", ["leche", "banana", "hueso", "queso"], "leche", "Al gato le gusta la leche.")
      ] },

    /* 11: lámina "¿Qué come cada animal?" — unir con una línea */
    { tipo: "unirComida", titulo: "🔗 Unimos cada animal con su comida",
      consigna: "Tocá un animal y después su comida",
      intro: A("p10_unir", "Tocá un animal y después tocá la comida que come. ¡Se van a unir con una línea!"),
      pares: [
        ["cebra", "pasto", "La cebra come pasto."],
        ["gallina", "choclo", "La gallina come granos de choclo."],
        ["mono", "banana", "El mono come bananas."],
        ["hipopotamo", "sandia", "El hipopótamo come sandía."],
        ["conejo", "zanahoria", "El conejo come zanahorias."],
        ["gato", "pescado", "El gato come pescado."],
        ["tigre", "carne", "El tigre come carne."]
      ].map(function (p) { return { a: ani(p[0]), c: com(p[1]), conf: A("unir_ok_" + p[0], "¡Muy bien! " + p[2]) }; }) },

    /* 12: memojuego 2 (al final, antes del puntaje) */
    memoComida([
      ["mono", "banana", A("unir_ok_mono", "¡Muy bien! El mono come bananas.")],
      ["conejo", "zanahoria", A("unir_ok_conejo", "¡Muy bien! El conejo come zanahorias.")],
      ["gato", "pescado", A("unir_ok_gato", "¡Muy bien! El gato come pescado.")],
      ["leon", "carne", A("come_ok_leon", "¡Sí! Al león le gusta la carne.")],
      ["oso", "miel", A("come_ok_oso", "¡Sí! Al oso le encanta la miel.")],
      ["pollito", "lombriz", A("come_ok_pollito", "¡Sí! Al pollito le gustan las lombrices.")]
    ], A("memo2_intro", "¡Otro memojuego! Ahora buscá cada animal con su comida. Tocá dos tarjetas para encontrar las parejas.")),

    /* 13 */
    { tipo: "cierre", img: "img/cierre.jpg", emoji: "🏆🐾",
      audio: A("p11_cierre", "¡Terminaste! Conociste las sombras, los sonidos y las comidas de muchos animales. ¡Te felicito!") }
  ]
};
