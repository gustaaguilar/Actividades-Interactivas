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

/* carta de hábitat para el memotest */
function hab(id) { var x = HAB[id]; return { img: x.img, emoji: x.e, nombre: A("nom_h_" + id, x.n + ".") }; }
function parMemo(a, h) { return { id: a, a: ani(a), h: hab(h), conf: A("vive_ok_" + a, "") }; }
VIVE.forEach(function (v) { VIVE[v[0]] = "¡Sí! " + v[2]; });
function confVive(p) { p.conf.t = VIVE[p.id]; return p; }

/* ronda de "¿quién se equivocó de casa?" */
function ronda(n, h, lugar, si, intr, casa) {
  return {
    img: HAB[h].img, emoji: HAB[h].e,
    pregunta: A("p08_r" + n, "¿Quién no vive en " + lugar + "?"),
    conf: A("p08_ok" + n, "¡Sí! " + may(AN[intr].n) + " no vive en " + lugar + ": vive en " + casa + "."),
    animales: si.map(function (id) {
      var it = ani(id); it.dice = A("int_si_" + id + "_" + h, may(AN[id].n) + " sí vive en " + lugar + ". Buscá a otro."); return it;
    }).concat([(function () { var it = ani(intr); it.intruso = true; return it; })()])
  };
}
function sombra(id, txt) { var it = ani(id); it.conf = A("sombra_ok_" + id, txt); return it; }

function parComida(a, c, conf, alt) {
  return { a: ani(a), c: com(c), conf: A("com_ok_" + a + "_" + c, "¡Muy bien! " + conf), alt: alt || null };
}
function parCria(a, c, conf) { return { a: ani(a), c: ani(c), conf: A("cria_ok_" + a, "¡Muy bien! " + conf) }; }

window.DATOS = {
  meta: {
    titulo: "¿Dónde viven los animales?",
    tituloCorto: "¿Dónde viven los animales?",
    subtitulo: "¡Granja, mar, selva y polo! 🐾",
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
  lugares: HAB,
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada.jpg", emoji: "🐮🐋🐒🐻‍❄️",
      audio: A("d00_portada", "¡Hola! Hoy vamos a descubrir dónde viven los animales: en la granja, en el mar, en la selva o en el polo. Tocá el botón verde para empezar.") },

    /* 1: video (se muestra solo si meta.video tiene un ID) */
    { tipo: "video", titulo: "🎬 Miramos el video", soloConVideo: true,
      texto: "Tocá el botón rojo ▶ para ver el video",
      audio: A("p01_video", "Mirá el video de los animales. Tocá el botón rojo. Cuando termines, tocá Siguiente.") },

    /* 2: narración de los cuatro hábitats */
    { tipo: "narracion", titulo: "🗺️ ¿Dónde viven los animales?",
      escena: [
        { id: "granja", a: { img: HAB.granja.img, emoji: HAB.granja.e }, c: ani("vaca") },
        { id: "mar", a: { img: HAB.mar.img, emoji: HAB.mar.e }, c: ani("ballena") },
        { id: "selva", a: { img: HAB.selva.img, emoji: HAB.selva.e }, c: ani("mono") },
        { id: "polo", a: { img: HAB.polo.img, emoji: HAB.polo.e }, c: ani("oso_polar") }
      ],
      pasos: [
        { texto: "Cada animal tiene su casa: su hábitat 🏡", marca: [], audio: A("p02_n1", "Cada animal vive en un lugar donde encuentra comida y refugio. Ese lugar se llama hábitat.") },
        { texto: "En la granja vive la vaca 🐄", marca: ["granja"], audio: A("p02_n2", "En la granja vive la vaca.") },
        { texto: "En el mar vive la ballena 🐋", marca: ["mar"], audio: A("p02_n3", "En el mar vive la ballena.") },
        { texto: "En la selva vive el mono 🐒", marca: ["selva"], audio: A("p02_n4", "En la selva vive el mono.") },
        { texto: "En el polo vive el oso polar 🐻‍❄️", marca: ["polo"], audio: A("p02_n5", "Y en el polo, donde hace mucho frío, vive el oso polar.") },
        { texto: "¡Ahora te toca a vos! 🙌", marca: [], audio: A("p02_n6", "¡Ahora ayudá a cada animal a llegar a su casa!") }
      ] },

    /* 3: clasificar en el hábitat (material 1) */
    { tipo: "clasificar", titulo: "🏡 ¿Dónde vive?",
      consigna: "Tocá el lugar donde vive cada animal",
      intro: A("p03_clasificar", "Mirá el animal y tocá el lugar donde vive: la granja, el mar, la selva o el polo."),
      destinos: ["granja", "mar", "selva", "polo"],
      items: VIVE.map(function (v) {
        var it = ani(v[0]); it.medio = v[1]; it.conf = A("vive_ok_" + v[0], "¡Sí! " + v[2]); return it;
      }) },

    /* 4: memotest 1 */
    { tipo: "memo", titulo: "🃏 Memotest: ¿dónde vive?",
      consigna: "Buscá cada animal con el lugar donde vive",
      intro: A("p05_memo", "¡Es un memotest! Tocá dos cartas y buscá cada animal con el lugar donde vive."),
      pares: [parMemo("chancho", "granja"), parMemo("pez", "mar"), parMemo("serpiente", "selva"), parMemo("morsa", "polo")].map(confVive) },

    /* 5: rompecabezas de la granja */
    { tipo: "puzzle", titulo: "🧩 Armamos la granja",
      consigna: "Tocá una pieza y después el lugar donde va",
      img: HAB.granja.img,
      intro: A("p06_puzzle", "Armá el rompecabezas de la granja. Tocá una pieza y después tocá el lugar donde va."),
      fin: A("p06_fin", "¡Lo armaste! Mirá quiénes viven en la granja: el chancho, la vaca y el caballo."),
      animales: [{ img: "img/chancho.png", emoji: "🐖", x: 17, y: 76 }, { img: "img/caballo.png", emoji: "🐎", x: 50, y: 82 }, { img: "img/vaca.png", emoji: "🐄", x: 82, y: 72 }] },

    /* 6: animales del mar (material 2) */
    { tipo: "seleccionar", titulo: "🌊 Los animales del mar",
      consigna: "Tocá solo los animales que viven en el mar",
      fondo: "img/fondo_mar.jpg", fondoEmoji: "🌊",
      intro: A("p04_mar", "Algunos de estos animales viven en el mar. Tocá solo los animales del mar y mirá cómo se van a nadar."),
      fin: A("p04_fin", "¡Muy bien! Encontraste a todos los animales del mar."),
      items: [
        ["estrella", true, "¡Sí! La estrella de mar vive en el mar."],
        ["cebra", false, "La cebra no vive en el mar: vive en la sabana, donde hay mucho pasto."],
        ["medusa", true, "¡Sí! La medusa vive en el mar."],
        ["cangrejo", true, "¡Sí! El cangrejo vive en el mar."],
        ["ballena", true, "¡Sí! La ballena vive en el mar."],
        ["calamar", true, "¡Sí! El calamar vive en el mar."],
        ["elefante", false, "El elefante no vive en el mar: vive en la sabana y en la selva."],
        ["hipopotamo", false, "Al hipopótamo le encanta el agua, pero no vive en el mar: vive en los ríos y lagos."]
      ].map(function (x) { var it = ani(x[0]); it.ok = x[1]; it.dice = A((x[1] ? "mar_ok_" : "mar_no_") + x[0], x[2]); return it; }) },

    /* 7: ¿quién se equivocó de casa? */
    { tipo: "intruso", titulo: "🤔 ¿Quién se equivocó de casa?",
      consigna: "Tocá al animal que no vive en este lugar",
      intro: A("p08_intro", "¡Uy! Un animal se equivocó de casa. Tocá al animal que no vive en este lugar."),
      rondas: [
        ronda(1, "polo", "el polo", ["oso_polar", "morsa", "lobo_artico"], "vaca", "la granja"),
        ronda(2, "selva", "la selva", ["mono", "serpiente", "jaguar"], "morsa", "el polo"),
        ronda(3, "mar", "el mar", ["pulpo", "pez", "ballena"], "chancho", "la granja")
      ] },

    /* 8: sombras */
    { tipo: "sombras", titulo: "🌑 ¿De quién es la sombra?",
      consigna: "Uní cada sombra con su animal",
      intro: A("p09_sombras", "Mirá las sombras. Tocá una sombra y después tocá el animal que tiene esa forma."),
      pares: [
        sombra("jaguar", "¡Sí! Es el yaguareté, que vive en la selva."),
        sombra("serpiente", "¡Sí! Es la serpiente, que vive en la selva."),
        sombra("oso_polar", "¡Sí! Es el oso polar, que vive en el polo."),
        sombra("morsa", "¡Sí! Es la morsa, que vive en el polo."),
        sombra("ballena", "¡Sí! Es la ballena, que vive en el mar.")
      ].map(function (it) { return { id: it.id, img: it.img, emoji: it.emoji, nombre: it.nombre, conf: it.conf }; }) },

    /* 9: memotest 2 */
    { tipo: "memo", titulo: "🃏 Memotest: ¡otra vuelta!",
      consigna: "Buscá cada animal con el lugar donde vive",
      intro: A("p10_memo", "¡Otro memotest! Buscá cada animal con su casa."),
      pares: [parMemo("caballo", "granja"), parMemo("pulpo", "mar"), parMemo("mono", "selva"), parMemo("lobo_artico", "polo")].map(confVive) },

    /* 10: rompecabezas del polo */
    { tipo: "puzzle", titulo: "🧩 Armamos el polo",
      consigna: "Tocá una pieza y después el lugar donde va",
      img: HAB.polo.img,
      intro: A("p11_puzzle", "Ahora armá el rompecabezas del polo, donde hace mucho frío."),
      fin: A("p11_fin", "¡Lo armaste! Mirá quiénes viven en el polo: el oso polar, el lobo ártico y la morsa."),
      animales: [{ img: "img/oso_polar.png", emoji: "🐻‍❄️", x: 20, y: 58 }, { img: "img/lobo_artico.png", emoji: "🐺", x: 50, y: 66 }, { img: "img/morsa.png", emoji: "🦭", x: 80, y: 62 }] },

    /* 11 */
    { tipo: "cierre", img: "img/cierre.jpg", emoji: "🏆🐾",
      audio: A("d09_cierre", "¡Terminaste! Ya sabés dónde viven los animales: en la granja, en el mar, en la selva y en el polo. ¡Te felicito!") }
  ]
};
