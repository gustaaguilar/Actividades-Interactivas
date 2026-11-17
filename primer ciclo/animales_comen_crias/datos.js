/* Los animales: dónde viven, qué comen y sus crías — Nivel Inicial — QueSepanTodos.com
   © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
function A(a, t) { return { a: a, t: t }; }

/* n: nombre con artículo · e: emoji de respaldo */
var AN = {
  chancho: { n: "el chancho", e: "🐖" }, caballo: { n: "el caballo", e: "🐎" }, vaca: { n: "la vaca", e: "🐄" },
  ballena: { n: "la ballena", e: "🐋" }, pez: { n: "el pez", e: "🐟" }, pulpo: { n: "el pulpo", e: "🐙" },
  jaguar: { n: "el yaguareté", e: "🐆" }, serpiente: { n: "la serpiente", e: "🐍" }, mono: { n: "el mono", e: "🐒" },
  lobo_artico: { n: "el lobo ártico", e: "🐺" }, oso_polar: { n: "el oso polar", e: "🐻‍❄️" }, morsa: { n: "la morsa", e: "🦭" },
  estrella: { n: "la estrella de mar", e: "⭐" }, medusa: { n: "la medusa", e: "🪼" }, cangrejo: { n: "el cangrejo", e: "🦀" },
  calamar: { n: "el calamar", e: "🦑" }, cebra: { n: "la cebra", e: "🦓" }, elefante: { n: "el elefante", e: "🐘" },
  hipopotamo: { n: "el hipopótamo", e: "🦛" }, gallina: { n: "la gallina", e: "🐔" }, conejo: { n: "el conejo", e: "🐇" },
  gato: { n: "el gato", e: "🐈" }, tigre: { n: "el tigre", e: "🐅" }, perro: { n: "el perro", e: "🐕" },
  oveja: { n: "la oveja", e: "🐑" }, leon: { n: "el león", e: "🦁" },
  /* crías */
  conejito: { n: "el gazapo", e: "🐰" }, cordero: { n: "el cordero", e: "🐑" }, potrillo: { n: "el potrillo", e: "🐴" },
  pollito: { n: "el pollito", e: "🐤" }, gatito: { n: "el gatito", e: "🐱" }, leoncito: { n: "el cachorro de león", e: "🦁" },
  tigrecito: { n: "el cachorro de tigre", e: "🐯" }, cebrita: { n: "el potrillo de cebra", e: "🦓" }
};
var COM = {
  pasto: { n: "el pasto", e: "🌿" }, choclo: { n: "el choclo", e: "🌽" }, banana: { n: "la banana", e: "🍌" },
  sandia: { n: "la sandía", e: "🍉" }, zanahoria: { n: "la zanahoria", e: "🥕" }, pescado: { n: "el pescado", e: "🐟" },
  carne: { n: "la carne", e: "🥩" }, leche: { n: "la leche", e: "🥛" }, hueso: { n: "el hueso", e: "🦴" }
};
var HAB = {
  granja: { n: "La granja", e: "🏡", img: "img/h_granja.jpg", dice: "La granja: con el granero, el corral y el pasto." },
  mar: { n: "El mar", e: "🌊", img: "img/h_mar.jpg", dice: "El mar: con agua salada, peces y algas." },
  selva: { n: "La selva", e: "🌴", img: "img/h_selva.jpg", dice: "La selva: con muchos árboles, lianas y calor." },
  polo: { n: "El polo", e: "🧊", img: "img/h_polo.jpg", dice: "El polo: con hielo, nieve y mucho frío." }
};

function may(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function ani(id) { var x = AN[id]; return { id: id, img: "img/" + id + ".png", emoji: x.e, nombre: A("nom_" + id, may(x.n) + ".") }; }
function com(id) { var x = COM[id]; return { id: id, img: "img/c_" + id + ".png", emoji: x.e, nombre: A("com_" + id, may(x.n) + ".") }; }

/* hábitat de cada animal (pantalla de clasificar) */
var VIVE = [
  ["ballena", "mar", "La ballena vive en el mar."], ["chancho", "granja", "El chancho vive en la granja."],
  ["jaguar", "selva", "El yaguareté vive en la selva."], ["caballo", "granja", "El caballo vive en la granja."],
  ["pez", "mar", "El pez vive en el mar."], ["lobo_artico", "polo", "El lobo ártico vive en el polo, donde hace mucho frío."],
  ["oso_polar", "polo", "El oso polar vive en el polo, entre el hielo y la nieve."], ["serpiente", "selva", "La serpiente vive en la selva."],
  ["vaca", "granja", "La vaca vive en la granja."], ["pulpo", "mar", "El pulpo vive en el mar."],
  ["morsa", "polo", "La morsa vive en el polo."], ["mono", "selva", "El mono vive en la selva, trepando a los árboles."]
];

function parComida(a, c, conf, alt) {
  return { a: ani(a), c: com(c), conf: A("com_ok_" + a + "_" + c, "¡Muy bien! " + conf), alt: alt || null };
}
function parCria(a, c, conf) { return { a: ani(a), c: ani(c), conf: A("cria_ok_" + a, "¡Muy bien! " + conf) }; }

/* parejas para el memotest: animal ↔ comida, o animal grande ↔ cría (se reusan los audios de nombres y confirmaciones) */
function memoComida(a, c, conf) { return { id: a, a: ani(a), h: com(c), conf: A("com_ok_" + a + "_" + c, "¡Muy bien! " + conf) }; }
function memoCria(a, c, conf) { return { id: a, a: ani(a), h: ani(c), conf: A("cria_ok_" + a, "¡Muy bien! " + conf) }; }

window.DATOS = {
  meta: {
    titulo: "¿Qué comen y cómo se llaman sus crías?",
    tituloCorto: "Qué comen y sus crías",
    subtitulo: "¡Comidas y crías de los animales! 🥕🐣",
    nivel: "Nivel Inicial y 1.er grado",
    area: "Nivel Inicial y 1.er grado · Ambiente natural",
    autor: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    licencia: "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    video: "",       /* ID de YouTube: cuando Gustavo elija el video, se completa y aparece la pantalla */
    revision: false  /* flechas ◀ ▶ para revisar rápido — poner en false antes de subir */
  },
  comunes: {
    error: A("comun_error", "¡Uy, ese no es! Probá otra vez."),
    sombra: A("comun_sombra", "¿Quién será?"),
    quien: A("comun_quien", "¿Quién es?"),
    elegi: A("comun_elegi", "Ahora tocá su pareja."),
    tambien: A("comun_tambien", "¡Sí, también lo come! Pero buscá su comida favorita."),
    pieza: A("comun_pieza", "Esa pieza no va ahí. Probá en otro lugar."),
    lugar: {}
  },
  lugares: {},
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada2.jpg", emoji: "🥕🐣🐾",
      audio: A("q00_portada", "¡Hola! Hoy vamos a descubrir qué come cada animal y cómo se llaman sus crías. Tocá el botón verde para empezar.") },

    /* 5: ¿qué come? lámina 1 (material 3) */
    { tipo: "unirComida", titulo: "😋 ¿Qué come cada animal?",
      consigna: "Tocá un animal y después su comida",
      intro: A("p05_comida", "Los animales comen para crecer grandes y fuertes. Tocá un animal y después tocá la comida que come. ¡Se van a unir con una línea!"),
      pares: [
        parComida("cebra", "pasto", "La cebra come pasto."),
        parComida("gallina", "choclo", "La gallina come granos de choclo."),
        parComida("mono", "banana", "El mono come bananas."),
        parComida("hipopotamo", "sandia", "El hipopótamo come sandía."),
        parComida("conejo", "zanahoria", "El conejo come zanahorias."),
        parComida("gato", "pescado", "El gato come pescado."),
        parComida("tigre", "carne", "El tigre come carne.")
      ] },

    /* puzzle: la granja */
    { tipo: "puzzle", titulo: "🧩 Armamos la granja",
      consigna: "Tocá una pieza y después el lugar donde va",
      img: "img/h_granja.jpg",
      intro: A("r_puz_granja", "Armá el rompecabezas de la granja. Tocá una pieza y después tocá el lugar donde va."),
      fin: A("r_puz_granja_fin", "¡Lo armaste! Llegaron a comer la gallina, el caballo y el conejo."),
      animales: [{ img: "img/gallina.png", emoji: "🐔", x: 16, y: 80 }, { img: "img/caballo.png", emoji: "🐎", x: 82, y: 76 }, { img: "img/conejo.png", emoji: "🐇", x: 52, y: 79 }] },

    /* 6: ¿qué come? lámina 2 (material 4) — conejo y caballo también comen la del otro */
    { tipo: "unirComida", titulo: "🥕 Otra vez: ¿qué come?",
      consigna: "Tocá un animal y después su comida favorita",
      intro: A("p06_comida", "Ahora con otros animales. Tocá un animal y después su comida favorita."),
      pares: [
        parComida("gato", "leche", "Al gato le gusta tomar leche."),
        parComida("perro", "hueso", "Al perro le encanta el hueso."),
        parComida("conejo", "zanahoria", "El conejo come zanahorias.", ["pasto"]),
        parComida("gallina", "choclo", "La gallina come granos de choclo."),
        parComida("caballo", "pasto", "El caballo come pasto.", ["zanahoria"])
      ] },

    /* memotest: animal y su comida */
    { tipo: "memo", titulo: "🃏 Memotest: ¿qué come?", cubrir: false,
      consigna: "Buscá cada animal con su comida",
      intro: A("r_memo_comida", "¡Es un memotest! Tocá dos cartas y buscá cada animal con la comida que come."),
      pares: [
        memoComida("mono", "banana", "El mono come bananas."),
        memoComida("conejo", "zanahoria", "El conejo come zanahorias."),
        memoComida("perro", "hueso", "Al perro le encanta el hueso."),
        memoComida("gallina", "choclo", "La gallina come granos de choclo.")
      ] },

    /* puzzle: la selva */
    { tipo: "puzzle", titulo: "🧩 Armamos la selva",
      consigna: "Tocá una pieza y después el lugar donde va",
      img: "img/h_selva.jpg",
      intro: A("r_puz_selva", "Ahora armá el rompecabezas de la selva."),
      fin: A("r_puz_selva_fin", "¡Muy bien! En la selva aparecieron el mono, el tigre y el hipopótamo."),
      animales: [{ img: "img/mono.png", emoji: "🐒", x: 18, y: 64 }, { img: "img/tigre.png", emoji: "🐅", x: 46, y: 80 }, { img: "img/hipopotamo.png", emoji: "🦛", x: 80, y: 80 }] },

    /* 7: adulto y cría (material 5) */
    { tipo: "unirComida", titulo: "🐣 Cada animal con su cría",
      consigna: "Tocá un animal grande y después su cría",
      intro: A("p07_crias", "Los animales también tienen hijos: se llaman crías. Tocá un animal grande y después su cría."),
      pares: [
        parCria("conejo", "conejito", "La cría del conejo se llama gazapo."),
        parCria("oveja", "cordero", "La cría de la oveja se llama cordero."),
        parCria("caballo", "potrillo", "La cría del caballo se llama potrillo."),
        parCria("gallina", "pollito", "La cría de la gallina es el pollito."),
        parCria("gato", "gatito", "La cría del gato es el gatito.")
      ] },

    /* puzzle: mamás y crías */
    { tipo: "puzzle", titulo: "🧩 Mamás y crías",
      consigna: "Tocá una pieza y después el lugar donde va",
      img: "img/portada2.jpg",
      intro: A("r_puz_mamas", "Armá el rompecabezas de los animales con sus crías."),
      fin: A("r_puz_mamas_fin", "¡Lo armaste! La oveja con su cordero, la gallina con su pollito y el conejo.") },

    /* 8: adulto y cría (material 6) */
    { tipo: "unirComida", titulo: "🦁 Más crías",
      consigna: "Tocá un animal grande y después su cría",
      intro: A("p08_crias", "¡Más animales con sus crías! Tocá un animal grande y después su cría."),
      pares: [
        parCria("leon", "leoncito", "La cría del león se llama cachorro."),
        parCria("tigre", "tigrecito", "La cría del tigre también se llama cachorro."),
        parCria("cebra", "cebrita", "La cría de la cebra se llama potrillo, como la del caballo.")
      ] },

    /* memotest: animal grande y su cría */
    { tipo: "memo", titulo: "🃏 Memotest de crías", cubrir: false,
      consigna: "Buscá cada animal grande con su cría",
      intro: A("r_memo_crias", "¡Otro memotest! Buscá cada animal grande con su cría."),
      pares: [
        memoCria("oveja", "cordero", "La cría de la oveja se llama cordero."),
        memoCria("caballo", "potrillo", "La cría del caballo se llama potrillo."),
        memoCria("gallina", "pollito", "La cría de la gallina es el pollito."),
        memoCria("leon", "leoncito", "La cría del león se llama cachorro.")
      ] },

    /* puzzle: la fiesta */
    { tipo: "puzzle", titulo: "🧩 ¡La fiesta de los animales!",
      consigna: "Tocá una pieza y después el lugar donde va",
      img: "img/cierre2.jpg",
      intro: A("r_puz_fiesta", "Último rompecabezas: ¡la fiesta de los animales!"),
      fin: A("r_puz_fiesta_fin", "¡Qué lindo! Festejan el caballo con su potrillo, el león con su cachorro y el gato con su gatito.") },

    /* 9 */
    { tipo: "cierre", img: "img/cierre2.jpg", emoji: "🏆🐣",
      audio: A("q09_cierre", "¡Terminaste! Ya sabés qué come cada animal y cómo se llaman sus crías. ¡Te felicito!") }
  ]
};
