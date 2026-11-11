/* Los animales: su cubierta y su alimentación — 1.er grado — QueSepanTodos.com
   Basado en la planificación áulica de una docente mendocina (cubierta corporal,
   herbívoros, carnívoros y omnívoros, cuento "Planes de los animales").
   © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
function A(a, t) { return { a: a, t: t }; }

/* n: nombre con artículo · e: emoji de respaldo · f: femenino (para "herbívora", etc.) */
var AN = {
  perro: { n: "el perro", e: "🐕" }, caballo: { n: "el caballo", e: "🐎" }, ciervo: { n: "el ciervo", e: "🦌" },
  zorro: { n: "el zorro", e: "🦊" }, oveja: { n: "la oveja", e: "🐑", f: 1 }, gallina: { n: "la gallina", e: "🐔", f: 1 },
  nandu: { n: "el ñandú", e: "🐦" }, loro: { n: "el loro", e: "🦜" }, pato: { n: "el pato", e: "🦆" },
  pez: { n: "el pez", e: "🐟" }, cocodrilo: { n: "el cocodrilo", e: "🐊" }, tortuga: { n: "la tortuga", e: "🐢", f: 1 },
  iguana: { n: "la iguana", e: "🦎", f: 1 }, serpiente: { n: "la serpiente", e: "🐍", f: 1 },
  rana: { n: "la rana", e: "🐸", f: 1 }, sapo: { n: "el sapo", e: "🐸" }, hipopotamo: { n: "el hipopótamo", e: "🦛" },
  jaguar: { n: "el yaguareté", e: "🐆" }, cebra: { n: "la cebra", e: "🦓", f: 1 }, jirafa: { n: "la jirafa", e: "🦒", f: 1 },
  vaca: { n: "la vaca", e: "🐄", f: 1 }, burro: { n: "el burro", e: "🫏" }, llama: { n: "la llama", e: "🦙", f: 1 },
  elefante: { n: "el elefante", e: "🐘" }, leon: { n: "el león", e: "🦁" }, tigre: { n: "el tigre", e: "🐅" },
  oso: { n: "el oso", e: "🐻" }, chancho: { n: "el chancho", e: "🐖" }, mono: { n: "el mono", e: "🐒" },
  conejo: { n: "el conejo", e: "🐇" }, raton: { n: "el ratón", e: "🐭" }, pinguino: { n: "el pingüino", e: "🐧" },
  caracol: { n: "el caracol", e: "🐌" }, lobo: { n: "el lobo", e: "🐺" }, buho: { n: "el búho", e: "🦉" },
  aguila: { n: "el águila", e: "🦅", f: 1 },
  /* personajes del cuento "Planes de los animales" */
  pj_conejo: { n: "el conejo", e: "🐰", img: "img/pj_conejo.png" }, pj_leon: { n: "el león", e: "🦁", img: "img/pj_leon.png" },
  pj_elefanta: { n: "la elefanta", e: "🐘", f: 1, img: "img/pj_elefanta.png" }, pj_oso: { n: "el oso", e: "🐻", img: "img/pj_oso.png" }
};
var COM = {
  banana: { n: "la banana", e: "🍌" }, queso: { n: "el queso", e: "🧀" }, pescado: { n: "el pescado", e: "🐟" },
  hoja: { n: "las hojas de lechuga", e: "🥬" }, mosquito: { n: "el mosquito", e: "🦟" },
  /* loncheras del cuento */
  l_rabanos: { n: "rábanos y pepino", e: "🥒", img: "img/l_rabanos.png" }, l_carne: { n: "un poco de carne", e: "🥩", img: "img/l_carne.png" },
  l_cana: { n: "caña de azúcar", e: "🎋", img: "img/l_cana.png" }, l_carne_fruta: { n: "carne y fruta", e: "🍎", img: "img/l_carne_fruta.png" }
};
/* Grupos: cubierta corporal y alimentación (los usan clasificar, unir y memotest) */
var GR = {
  pelo: { n: "Pelos", e: "🐾", img: "img/t_pelo.jpg" },
  lana: { n: "Lana", e: "🧶", img: "img/t_lana.jpg" },
  plumas: { n: "Plumas", e: "🪶", img: "img/t_plumas.jpg" },
  escamas: { n: "Escamas", e: "🦎", img: "img/t_escamas.jpg" },
  piel: { n: "Piel desnuda", e: "💧", img: "img/t_piel.jpg" },
  herbivoro: { n: "Herbívoros", e: "🌿", img: "img/f_herbivoros.jpg" },
  carnivoro: { n: "Carnívoros", e: "🥩", img: "img/f_carnivoros.jpg" },
  omnivoro: { n: "Omnívoros", e: "🍽️", img: "img/f_omnivoros.jpg" }
};

function may(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function ani(id) { var x = AN[id]; return { id: id, img: x.img || ("img/" + id + ".png"), emoji: x.e, nombre: A("nom_" + id, may(x.n) + ".") }; }
function com(id) { var x = COM[id]; return { id: id, img: x.img || ("img/c_" + id + ".png"), emoji: x.e, nombre: A("com_" + id, may(x.n) + ".") }; }
function gru(id) { var x = GR[id]; return { id: id, img: x.img, emoji: x.e, nombre: A("gr_" + id, x.n + ".") }; }
function cl(id, grupo, txt, pre) { var it = ani(id); it.medio = grupo; it.conf = A((pre || "cl_") + id, "¡Sí! " + txt); return it; }
function parGr(a, g, txt, pre) { return { id: a, a: ani(a), c: gru(g), h: gru(g), conf: A(pre + a, "¡Muy bien! " + txt) }; }
function parCom(a, c, txt) { return { a: ani(a), c: com(c), conf: A("com_ok_" + a, "¡Muy bien! " + txt) }; }
function sombra(id, txt) { var it = ani(id); return { id: id, img: it.img, emoji: it.emoji, nombre: it.nombre, conf: A("sombra_ok_" + id, "¡Sí! " + txt) }; }
/* "es herbívoro / herbívora" según el animal */
function adj(id, raiz) { return raiz + (AN[id].f ? "a" : "o"); }
function ronda(n, g, raiz, si, intr, conf) {
  return {
    img: GR[g].img, emoji: GR[g].e, etiqueta: GR[g].e + " " + GR[g].n,
    pregunta: A("ent_p" + n, "¿Quién no es " + raiz + "o?"),
    conf: A("ent_ok" + n, "¡Sí! " + conf),
    animales: si.map(function (id) {
      var it = ani(id); it.dice = A("ent_si_" + id, may(AN[id].n) + " sí es " + adj(id, raiz) + ". Buscá a otro."); return it;
    }).concat([(function () { var it = ani(intr); it.intruso = true; return it; })()])
  };
}
function bosque(id, ok, txt) { var it = ani(id); it.ok = ok; it.dice = A((ok ? "bos_ok_" : "bos_no_") + id, txt); return it; }
function lonchera(pj, ok, txt) {
  var a = ani(pj), op = ["l_rabanos", "l_carne", "l_cana", "l_carne_fruta"].map(function (c) { var x = com(c); x.ok = c === ok; return x; });
  return { img: a.img, emoji: a.emoji, texto: "¿Qué llevó " + AN[pj].n + " en su lonchera?",
    pregunta: A("lon_p_" + pj, "¿Qué llevó " + AN[pj].n + " en su lonchera?"), conf: A("lon_ok_" + pj, "¡Sí! " + txt), opciones: op };
}

window.DATOS = {
  meta: {
    titulo: "Los animales: su cubierta y su alimentación",
    tituloCorto: "Cubierta y alimentación",
    subtitulo: "¡Pelos, plumas, escamas y un cuento! 🐾",
    nivel: "1.er grado",
    area: "1.er grado · Ambiente, Cultura y Tecnología",
    autor: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    licencia: "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    video: "",
    revision: false  /* flechas ◀ ▶ para revisar rápido — poner en false antes de subir */
  },
  comunes: {
    error: A("comun_error", "¡Uy, ese no es! Probá otra vez."),
    sombra: A("comun_sombra", "¿Quién será?"),
    elegi: A("comun_elegi", "Ahora tocá su pareja.")
  },
  lugares: GR,
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada.jpg", emoji: "🐑🦜🐊🐸",
      audio: A("d00_portada", "¡Hola! Hoy vamos a descubrir qué cubre el cuerpo de los animales y qué come cada uno. ¡Y vamos a escuchar un cuento! Tocá el botón verde para empezar.") },

    /* 2: narración — cubierta corporal */
    { tipo: "narracion", titulo: "🐾 ¿Qué cubre su cuerpo?",
      escena: [
        { id: "pelo", a: { img: GR.pelo.img, emoji: GR.pelo.e }, c: ani("perro") },
        { id: "lana", a: { img: GR.lana.img, emoji: GR.lana.e }, c: ani("oveja") },
        { id: "plumas", a: { img: GR.plumas.img, emoji: GR.plumas.e }, c: ani("gallina") },
        { id: "escamas", a: { img: GR.escamas.img, emoji: GR.escamas.e }, c: ani("pez") },
        { id: "piel", a: { img: GR.piel.img, emoji: GR.piel.e }, c: ani("rana") }
      ],
      pasos: [
        { texto: "No todos tienen la misma cubierta 🐾", marca: [], audio: A("p02_n1", "No todos los animales tienen la misma cubierta corporal. Se dividen en cinco grupos: pelos, lana, plumas, escamas y piel desnuda.") },
        { texto: "Pelos: protegen del frío o del calor", marca: ["pelo"], audio: A("p02_n2", "Pelos. Su principal función es proteger al animal del frío o del calor, como al perro.") },
        { texto: "Lana: un abrigo enrulado y suave", marca: ["lana"], audio: A("p02_n3", "Lana. Es un pelo largo, enrulado y muy abrigado, como el de la oveja.") },
        { texto: "Plumas: solo las tienen las aves", marca: ["plumas"], audio: A("p02_n4", "Plumas. Son únicas de las aves y las ayudan a volar. Al conjunto de plumas se lo llama plumaje.") },
        { texto: "Escamas: en peces y reptiles", marca: ["escamas"], audio: A("p02_n5", "Escamas. Las tienen los peces y los reptiles. En los peces recubren casi toda la piel. En los reptiles guardan la humedad y los protegen del entorno.") },
        { texto: "Piel desnuda: siempre húmeda", marca: ["piel"], audio: A("p02_n6", "Piel desnuda. Estos animales pueden vivir en el agua y en la tierra. Pueden respirar por la piel, por eso la mantienen húmeda para que no se seque.") },
        { texto: "¡Ahora te toca a vos! 🙌", marca: [], audio: A("p02_n7", "¡Ahora mirá bien a cada animal y descubrí qué cubre su cuerpo!") }
      ] },

    /* 3: clasificar por cubierta */
    { tipo: "clasificar", titulo: "🔍 ¿Qué cubre su cuerpo?",
      consigna: "Tocá qué cubre el cuerpo de cada animal",
      intro: A("p03_clasificar", "Mirá cada animal y tocá qué cubre su cuerpo: pelos, lana, plumas, escamas o piel desnuda."),
      destinos: ["pelo", "lana", "plumas", "escamas", "piel"],
      items: [
        cl("ciervo", "pelo", "El ciervo tiene el cuerpo cubierto de pelos."),
        cl("caballo", "pelo", "El caballo tiene el cuerpo cubierto de pelos."),
        cl("oveja", "lana", "La oveja tiene lana: un pelo enrulado y abrigado."),
        cl("nandu", "plumas", "El ñandú es un ave: tiene plumas, aunque no puede volar."),
        cl("loro", "plumas", "El loro tiene plumas de muchos colores."),
        cl("cocodrilo", "escamas", "El cocodrilo es un reptil: tiene escamas."),
        cl("pez", "escamas", "El pez tiene escamas en casi toda la piel."),
        cl("tortuga", "escamas", "La tortuga es un reptil: tiene escamas."),
        cl("rana", "piel", "La rana tiene la piel desnuda y húmeda."),
        cl("hipopotamo", "piel", "El hipopótamo casi no tiene pelos: tiene la piel desnuda.")
      ] },

    /* 4: unir con flechas (actividad integrada 1) */
    { tipo: "unirComida", titulo: "➡️ Unimos con flechas",
      consigna: "Tocá un animal y después qué cubre su cuerpo",
      intro: A("p04_unir", "Tocá un animal y después tocá qué cubre su cuerpo. Se van a unir con una línea."),
      pares: [
        parGr("perro", "pelo", "El perro tiene pelos.", "unir_ok_"),
        parGr("gallina", "plumas", "La gallina tiene plumas.", "unir_ok_"),
        parGr("tortuga", "escamas", "La tortuga tiene escamas.", "unir_ok_"),
        parGr("rana", "piel", "La rana tiene la piel desnuda.", "unir_ok_")
      ] },

    /* 5: juego de sombras (actividad integrada 2) */
    { tipo: "sombras", titulo: "🌑 ¿De quién es la sombra?",
      consigna: "Uní cada sombra con su animal",
      intro: A("p05_sombras", "Mirá las sombras. Tocá una sombra y después tocá el animal que tiene esa forma."),
      pares: [
        sombra("rana", "Es la rana: tiene la piel desnuda."),
        sombra("cocodrilo", "Es el cocodrilo: tiene escamas."),
        sombra("jaguar", "Es el yaguareté: tiene pelos."),
        sombra("loro", "Es el loro: tiene plumas."),
        sombra("oveja", "Es la oveja: tiene lana.")
      ] },

    /* 6: memotest animal ↔ cubierta */
    { tipo: "memo", titulo: "🃏 Memotest de cubiertas",
      consigna: "Buscá cada animal con lo que cubre su cuerpo",
      intro: A("p06_memo", "¡Es un memotest! Tocá dos cartas y buscá cada animal con lo que cubre su cuerpo."),
      pares: [
        parGr("zorro", "pelo", "El zorro tiene pelos.", "memo_ok_"),
        parGr("pato", "plumas", "El pato tiene plumas.", "memo_ok_"),
        parGr("iguana", "escamas", "La iguana tiene escamas.", "memo_ok_"),
        parGr("sapo", "piel", "El sapo tiene la piel desnuda.", "memo_ok_")
      ] },

    /* 7: cuento "Planes de los animales" */
    { tipo: "cuento", titulo: "📖 Cuento: «Planes de los animales»",
      paginas: [
        { img: "img/cu1.jpg", emoji: "🌴", audio: A("cu1", "Había una vez una jungla en la que vivían muchos animales. Solían comer juntos.") },
        { img: "img/cu2.jpg", emoji: "🐒", audio: A("cu2", "El mono pensó: «Nunca salimos de la jungla, y sería bueno hacerlo, así como lo hacen los humanos en sus autos. Iremos a la ciudad y veremos lugares hermosos».") },
        { img: "img/cu3.jpg", emoji: "🎒", audio: A("cu3", "Compartió su idea con los demás animales. Todos estuvieron de acuerdo y enviaron a la señora zorra para que se lo contara al león. Cada animal organizó su lonchera.") },
        { img: "img/cu4.jpg", emoji: "🌅", audio: A("cu4", "Esa mañana salieron bien temprano. Todos vestían sus mejores prendas. La tropa era liderada por la señora zorra y el mono.") },
        { img: "img/cu5.jpg", emoji: "🏘️", audio: A("cu5", "Después de un rato llegaron a la ciudad. Pero cuando las personas los veían, se escondían dentro de sus casas y observaban desde las ventanas. Los vendedores de frutas abandonaron sus cosas y huyeron.") },
        { img: "img/cu6.jpg", emoji: "🧺", audio: A("cu6", "Los animales llegaron a un jardín. Estaban hambrientos y se prepararon para comer los almuerzos que habían llevado. El conejo había llevado rábanos y pepino. El león, un poco de carne. La elefanta, mucha caña de azúcar. Y el gran oso había llevado carne y fruta.") },
        { img: "img/cu7.jpg", emoji: "📷", audio: A("cu7", "Un fotógrafo, que estaba sentado en el árbol, bajó lentamente y les tomó una muy linda foto. Después vieron un tren y se fueron a pasear. El conductor salió corriendo lleno de miedo, y el señor oso tomó el control del tren. ¡Fue un viaje bien divertido!") },
        { img: "img/cu8.jpg", emoji: "🌳", audio: A("cu8", "Los amigos volvieron a la jungla, decididos a regresar a la ciudad todos los años.") }
      ] },

    /* 8: ¿qué llevó en su lonchera? */
    { tipo: "comida", titulo: "🧺 ¿Qué llevó en su lonchera?",
      consigna: "Tocá lo que llevó cada personaje del cuento",
      intro: A("p08_lonchera", "¿Te acordás qué llevó cada animal del cuento para almorzar? Tocá su lonchera."),
      items: [
        lonchera("pj_conejo", "l_rabanos", "El conejo llevó rábanos y pepino."),
        lonchera("pj_leon", "l_carne", "El león llevó un poco de carne."),
        lonchera("pj_elefanta", "l_cana", "La elefanta llevó mucha caña de azúcar."),
        lonchera("pj_oso", "l_carne_fruta", "El oso llevó carne y fruta.")
      ] },

    /* 9: narración — animales según su alimentación */
    { tipo: "narracion", titulo: "🍽️ Animales según su alimentación",
      escena: [
        { id: "herbivoro", a: { img: GR.herbivoro.img, emoji: GR.herbivoro.e }, c: ani("elefante") },
        { id: "carnivoro", a: { img: GR.carnivoro.img, emoji: GR.carnivoro.e }, c: ani("leon") },
        { id: "omnivoro", a: { img: GR.omnivoro.img, emoji: GR.omnivoro.e }, c: ani("oso") }
      ],
      pasos: [
        { texto: "No todos comen lo mismo 🍽️", marca: [], audio: A("p09_n1", "Los animales no comen todos lo mismo. Según su alimentación, pueden ser herbívoros, carnívoros u omnívoros.") },
        { texto: "Herbívoros: comen plantas 🌿", marca: ["herbivoro"], audio: A("p09_n2", "Los herbívoros se alimentan principalmente de plantas. Pueden comer hojas, frutas, semillas, raíces o incluso madera, como el elefante.") },
        { texto: "Carnívoros: comen carne 🥩", marca: ["carnivoro"], audio: A("p09_n3", "Los carnívoros se alimentan principalmente de carne. Pueden ser depredadores, cazando animales vivos, o comer animales muertos, como el león.") },
        { texto: "Omnívoros: comen plantas y carne", marca: ["omnivoro"], audio: A("p09_n4", "Los omnívoros consumen tanto plantas como carne. Están adaptados para comer una variedad de alimentos, como el oso.") },
        { texto: "¡Ahora te toca a vos! 🙌", marca: [], audio: A("p09_n5", "¡Ahora descubrí qué come cada animal!") }
      ] },

    /* 10: clasificar por alimentación */
    { tipo: "clasificar", titulo: "🥕🥩 ¿Qué come?",
      consigna: "Tocá si es herbívoro, carnívoro u omnívoro",
      intro: A("p10_clasificar", "Mirá cada animal y tocá si es herbívoro, carnívoro u omnívoro."),
      destinos: ["herbivoro", "carnivoro", "omnivoro"],
      items: [
        cl("cebra", "herbivoro", "La cebra es herbívora: come pasto.", "al_"),
        cl("jirafa", "herbivoro", "La jirafa es herbívora: come las hojas de los árboles altos.", "al_"),
        cl("vaca", "herbivoro", "La vaca es herbívora: come pasto.", "al_"),
        cl("burro", "herbivoro", "El burro es herbívoro: come pasto y heno.", "al_"),
        cl("leon", "carnivoro", "El león es carnívoro: caza otros animales.", "al_"),
        cl("tigre", "carnivoro", "El tigre es carnívoro: come carne.", "al_"),
        cl("jaguar", "carnivoro", "El yaguareté es carnívoro: es un gran cazador.", "al_"),
        cl("oso", "omnivoro", "El oso es omnívoro: come frutas, miel, peces y carne.", "al_"),
        cl("chancho", "omnivoro", "El chancho es omnívoro: come de todo.", "al_"),
        cl("mono", "omnivoro", "El mono es omnívoro: come frutas, hojas e insectos.", "al_")
      ] },

    /* 11: unir cada animal con su comida (material: 2.ª opción) */
    { tipo: "unirComida", titulo: "🍽️ ¿Qué come cada uno?",
      consigna: "Uní cada animal con su comida",
      intro: A("p11_comida", "Tocá un animal y después tocá la comida que le gusta. Se van a unir con una línea."),
      pares: [
        parCom("mono", "banana", "El mono come bananas."),
        parCom("raton", "queso", "Al ratón le gusta el queso."),
        parCom("pinguino", "pescado", "El pingüino come pescado."),
        parCom("caracol", "hoja", "El caracol come hojas, como la lechuga."),
        parCom("rana", "mosquito", "La rana come mosquitos y otros insectos.")
      ] },

    /* 12: jugamos al entrometido */
    { tipo: "intruso", titulo: "🤔 Jugamos al entrometido",
      consigna: "Tocá al animal que no va en este grupo",
      intro: A("p12_intro", "¡Se metió un entrometido! Tocá al animal que no va en este grupo."),
      rondas: [
        ronda(1, "herbivoro", "herbívor", ["jirafa", "llama", "cebra"], "serpiente", "La serpiente no es herbívora: es carnívora, come otros animales."),
        ronda(2, "carnivoro", "carnívor", ["leon", "tigre", "jaguar"], "elefante", "El elefante no es carnívoro: es herbívoro, come plantas."),
        ronda(3, "omnivoro", "omnívor", ["oso", "chancho", "mono"], "vaca", "La vaca no es omnívora: es herbívora, come pasto.")
      ] },

    /* 13: buscar en el bosque (actividad extra) */
    { tipo: "seleccionar", titulo: "🌲 Carnívoros en el bosque",
      consigna: "Tocá solo los animales carnívoros",
      fondo: "img/bosque.jpg", fondoEmoji: "🌲", cols: 3,
      intro: A("p13_bosque", "Este es el bosque. Algunos de estos animales son carnívoros. Tocá solo los carnívoros y mirá cómo vuelven al bosque."),
      fin: A("p13_fin", "¡Muy bien! Encontraste a todos los carnívoros del bosque."),
      items: [
        bosque("lobo", true, "¡Sí! El lobo es carnívoro: caza otros animales."),
        bosque("buho", true, "¡Sí! El búho es carnívoro: de noche caza ratones."),
        bosque("aguila", true, "¡Sí! El águila es carnívora: caza desde el cielo."),
        bosque("ciervo", false, "El ciervo no es carnívoro: es herbívoro, come pasto y hojas."),
        bosque("conejo", false, "El conejo no es carnívoro: es herbívoro, come plantas."),
        bosque("oso", false, "El oso come carne, pero también frutas y miel: es omnívoro.")
      ] },

    /* 14: armamos el afiche con los personajes del cuento (cierre de la clase) */
    { tipo: "clasificar", titulo: "📋 Armamos el afiche",
      consigna: "¿Dónde va cada personaje del cuento?",
      intro: A("p14_afiche", "Ahora armamos el afiche con los personajes del cuento Planes de los animales. Tocá si cada uno es herbívoro, carnívoro u omnívoro."),
      destinos: ["herbivoro", "carnivoro", "omnivoro"],
      items: [
        cl("pj_conejo", "herbivoro", "El conejo llevó rábanos y pepino: es herbívoro.", "af_"),
        cl("pj_leon", "carnivoro", "El león llevó carne: es carnívoro.", "af_"),
        cl("pj_elefanta", "herbivoro", "La elefanta llevó caña de azúcar: es herbívora.", "af_"),
        cl("pj_oso", "omnivoro", "El oso llevó carne y fruta: es omnívoro.", "af_")
      ] },

    /* 15 */
    { tipo: "cierre", img: "img/cierre.jpg", emoji: "🏆🐾",
      audio: A("d15_cierre", "¡Terminaste! Ya sabés que los animales pueden tener pelos, lana, plumas, escamas o piel desnuda, y que pueden ser herbívoros, carnívoros u omnívoros. ¡Te felicito!") }
  ]
};
