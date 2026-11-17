/* La j: ja je ji jo ju — 1.er grado · Lengua — QueSepanTodos.com
   Basado en fichas áulicas de 1.er grado ("Seguimos leyendo y escribiendo", "Actividades de fijación").
   Imprenta minúscula; mayúscula solo al comienzo de la oración y en los nombres propios.
   © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
function A(a, t) { return { a: a, t: t }; }
/* resalta la j con su vocal */
function hl(w) { return w.replace(/([Jj][aeiouáéíóú]?)/g, '<b class="q">$1</b>'); }
function may(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

var PW = {
  jabon: { w: "jabón", e: "🧼" }, jarra: { w: "jarra", e: "🫖" }, jamon: { w: "jamón", e: "🍖" }, jugo: { w: "jugo", e: "🧃" },
  jirafa: { w: "jirafa", e: "🦒" }, joyas: { w: "joyas", e: "💍" }, jeringa: { w: "jeringa", e: "💉" }, jaula: { w: "jaula", e: "🪺" },
  jinete: { w: "jinete", e: "🏇" }, jarabe: { w: "jarabe", e: "🧴" }, japonesa: { w: "japonesa", e: "👘" }, jabali: { w: "jabalí", e: "🐗" },
  naranja: { w: "naranja", e: "🍊" }, oreja: { w: "oreja", e: "👂" }, pajaro: { w: "pájaro", e: "🐦" }, ajo: { w: "ajo", e: "🧄" },
  viejito: { w: "viejito", e: "👴" }, conejo: { w: "conejo", e: "🐇" }, aguja: { w: "aguja", e: "🪡" }, abeja: { w: "abeja", e: "🐝" },
  /* sin j */
  salero: { w: "salero", e: "🧂" }, tomate: { w: "tomate", e: "🍅" }, luna: { w: "luna", e: "🌙" }, vaca: { w: "vaca", e: "🐄" },
  escoba: { w: "escoba", e: "🧹" }, caramelo: { w: "caramelo", e: "🍬" }, camello: { w: "camello", e: "🐫" },
  leon: { w: "león", e: "🦁" }, diente: { w: "diente", e: "🦷" }, foca: { w: "foca", e: "🦭" }, rana: { w: "rana", e: "🐸" }
};
function pw(id) { var x = PW[id]; return { id: id, img: "img/" + id + ".png", emoji: x.e, nombre: A("w_" + id, may(x.w) + ".") }; }
function pt(id) { return { id: id + "_t", txt: PW[id].w, nombre: A("w_" + id, may(PW[id].w) + ".") }; }
function ptj(id) { return { id: id + "_t", txt: hl(PW[id].w), nombre: A("w_" + id, may(PW[id].w) + ".") }; }

function sil(id, s) { var it = pw(id); it.medio = s; it.conf = A("sil_ok_" + id, "¡Sí! " + may(PW[id].w) + " empieza con " + s + "."); return it; }
function sel(id, ok, txt) { var it = pw(id); it.ok = ok; it.dice = A((ok ? "sel_ok_" : "sel_no_") + id, txt); return it; }
var JS = ["ja", "je", "ji", "jo", "ju"];
function falta(id, conHueco, conSil, ok, preg, conf, pref, lista) {
  var it = pw(id);
  it.texto = conHueco.replace("_", '<span class="hueco">__</span>');
  it.relleno = conSil;
  it.pregunta = A(pref + "p_" + id, preg);
  it.conf = A(pref + "ok_" + id, conf);
  it.opciones = (lista || JS).map(function (t) { return { t: t, ok: t === ok }; });
  return it;
}
function arm(id, piezas) { var it = pw(id); it.piezas = piezas; it.audio = it.nombre; return it; }
function leer(id, otros) {
  var o = [pw(id)].concat(otros.map(pw)); o[0].ok = true;
  return { texto: PW[id].w, pregunta: A("leer_cual", "¿Cuál es?"), conf: A("leer_ok_" + id, "¡Muy bien! Dice " + PW[id].w + "."), opciones: o };
}
function escena(n, okImg, otraImg, oracion) {
  return { texto: oracion, pregunta: A("lc_p", "¿Cuál es el dibujo correcto?"), conf: A("lc_ok" + n, "¡Muy bien! " + oracion),
    opciones: [{ img: "img/" + okImg + ".jpg", emoji: "✅", ok: true }, { img: "img/" + otraImg + ".jpg", emoji: "❓" }] };
}
function parTxt(id) { return { id: id, a: pw(id), c: pt(id), h: ptj(id), conf: A("par_ok_" + id, "¡Sí! " + may(PW[id].w) + ".") }; }
function ronda(n, ids, intr) {
  return {
    img: "img/portada.jpg", emoji: "🔍", etiqueta: "Palabras con j",
    pregunta: A("int_p", "¿Cuál no tiene jota? Tocalo."),
    conf: A("int_ok_" + intr, "¡Sí! " + may(PW[intr].w) + " no tiene jota."),
    animales: ids.map(function (id) {
      var it = pw(id); it.texto = hl(PW[id].w); it.dice = A("int_si_" + id, may(PW[id].w) + " sí tiene jota. Buscá otro."); return it;
    }).concat([(function () { var it = pw(intr); it.texto = PW[intr].w; it.intruso = true; return it; })()])
  };
}
function sopaP(id, pos) { var it = pw(id); it.w = PW[id].w; it.pos = pos; return it; }
function oracion(img, emoji, piezas, n) { return { img: img, emoji: emoji, piezas: piezas, oracion: true, audio: A("orac_" + n, piezas.join(" ")) }; }
function compr(n, preg, ok, otros, conf) {
  var o = [pw(ok)].concat(otros.map(pw)); o[0].ok = true;
  return { texto: preg, pregunta: A("com_p" + n, preg), conf: A("com_ok" + n, "¡Sí! " + conf), opciones: o };
}
function donde(id, pos, silabas) {
  var it = pw(id);
  it.texto = "🔊 ?"; it.relleno = silabas.map(hl).join(" · ");
  it.pregunta = A("sil2_p_" + id, may(PW[id].w) + ". ¿En qué sílaba está la jota?");
  it.conf = A("sil2_ok_" + id, "¡Sí! En " + PW[id].w + " la jota está " + ({ "primera": "en la primera sílaba", "del medio": "en la sílaba del medio", "última": "en la última sílaba" })[pos] + ": " + silabas.join(", ") + ".");
  it.opciones = ["primera", "del medio", "última"].map(function (t) { return { t: t === "del medio" ? "la del medio" : "la " + t, ok: t === pos }; });
  return it;
}

window.DATOS = {
  meta: {
    titulo: "La j: ja je ji jo ju",
    tituloCorto: "La j: ja je ji jo ju",
    subtitulo: "¡Jugamos con la jota! 🦒",
    nivel: "1.er grado",
    area: "1.er grado · Lengua",
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
    elegi: A("comun_elegi", "Ahora tocá su pareja.")
  },
  lugares: {
    ja: { n: "ja", txt: '<b class="q">ja</b>' }, je: { n: "je", txt: '<b class="q">je</b>' }, ji: { n: "ji", txt: '<b class="q">ji</b>' },
    jo: { n: "jo", txt: '<b class="q">jo</b>' }, ju: { n: "ju", txt: '<b class="q">ju</b>' }
  },
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada.jpg", emoji: "🦒🧃",
      audio: A("d00_portada", "¡Hola! Hoy vamos a jugar con la letra jota: ja, je, ji, jo, ju. Tocá el botón verde para empezar.") },

    /* 1: narración — la letra j */
    { tipo: "narracion", titulo: "🦒 La letra j",
      escena: [
        { id: "letra", a: { txt: "J j" }, c: { txt: '<b class="q">ja je ji jo ju</b>' } },
        { id: "jirafa", a: pw("jirafa"), c: { txt: hl("jirafa") } },
        { id: "jugo", a: pw("jugo"), c: { txt: hl("jugo") } },
        { id: "conejo", a: pw("conejo"), c: { txt: hl("conejo") } }
      ],
      pasos: [
        { texto: "J mayúscula · j minúscula", marca: [], audio: A("p01_n1", "Hoy vamos a conocer la letra jota. Así es la jota mayúscula, y así es la jota minúscula.") },
        { texto: "ja · je · ji · jo · ju", marca: ["letra"], audio: A("p01_n2", "Con las vocales, la jota forma ja, je, ji, jo, ju. Suena fuerte, como cuando nos reímos: ¡ja, ja, ja!") },
        { texto: "jirafa empieza con ji", marca: ["jirafa"], audio: A("p01_n3", "Jirafa. Jirafa empieza con ji.") },
        { texto: "jugo empieza con ju", marca: ["jugo"], audio: A("p01_n4", "Jugo. Jugo empieza con ju.") },
        { texto: "En conejo, la j está en la última sílaba", marca: ["conejo"], audio: A("p01_n5b", "Conejo. En conejo, la jota está en la última sílaba: co, ne, jo.") },
        { texto: "¡A jugar con la jota! 🙌", marca: [], audio: A("p01_n6", "¡Ahora vamos a jugar con la jota!") }
      ] },

    /* 2: explorar */
    { tipo: "explorar", titulo: "👂 Palabras con j",
      consigna: "Tocá cada dibujo y escuchá",
      intro: A("p02_intro", "Tocá cada dibujo y escuchá su nombre. Todos empiezan con jota."),
      animales: ["jarra", "jabon", "jamon", "jugo", "jirafa", "joyas"].map(function (id) {
        var it = pw(id); it.texto = hl(PW[id].w);
        it.nombre = A("ex_" + id, may(PW[id].w) + ". Empieza con " + PW[id].w.slice(0, 2).replace("ó", "o") + ".");
        return it;
      }) },

    /* 3: encerrá la sílaba con que empieza (ficha "Sonidos y letras marchando") */
    { tipo: "clasificar", titulo: "⭕ ¿Con qué sílaba empieza?",
      consigna: "Tocá la sílaba con la que empieza",
      intro: A("p03_intro", "Escuchá el nombre de cada dibujo y tocá la sílaba con la que empieza: ja, je, ji, jo o ju."),
      destinos: ["ja", "je", "ji", "jo", "ju"],
      items: [sil("jirafa", "ji"), sil("jabon", "ja"), sil("joyas", "jo"), sil("jugo", "ju"), sil("jeringa", "je"),
              sil("jaula", "ja"), sil("jinete", "ji"), sil("jarabe", "ja")] },

    /* 4: colorea los que empiezan con j */
    { tipo: "seleccionar", titulo: "🎨 ¿Empieza con j?",
      consigna: "Tocá solo los que empiezan con j",
      fondo: "img/portada.jpg", fondoEmoji: "🦒", cols: 4,
      intro: A("p04_intro", "Tocá solo los dibujos que empiezan con jota."),
      fin: A("p04_fin", "¡Muy bien! Encontraste todos los que empiezan con jota."),
      items: [sel("jarra", true, "¡Sí! Jarra empieza con ja."), sel("salero", false, "Salero no empieza con jota."),
              sel("jirafa", true, "¡Sí! Jirafa empieza con ji."), sel("caramelo", false, "Caramelo no empieza con jota."),
              sel("jabon", true, "¡Sí! Jabón empieza con ja."), sel("tomate", false, "Tomate no empieza con jota."),
              sel("jamon", true, "¡Sí! Jamón empieza con ja."), sel("luna", false, "Luna no empieza con jota."),
              sel("jugo", true, "¡Sí! Jugo empieza con ju."), sel("escoba", false, "Escoba no empieza con jota."),
              sel("jeringa", true, "¡Sí! Jeringa empieza con je."), sel("vaca", false, "Vaca no empieza con jota.")] },

    /* 5: pronuncio y completo — ¿quién suena? */
    { tipo: "opText", titulo: "🔊 ¿Quién suena?", cols: 5,
      consigna: "Tocá la sílaba que falta",
      intro: A("p05_intro", "Decí el nombre del dibujo despacito. ¿Qué sílaba con jota falta?"),
      items: [
        falta("naranja", "naran_", hl("naranja"), "ja", "Naranja.", "¡Sí! Naran, ja.", "qs_"),
        falta("oreja", "ore_", hl("oreja"), "ja", "Oreja.", "¡Sí! O, re, ja.", "qs_"),
        falta("pajaro", "pá_ro", hl("pájaro"), "ja", "Pájaro.", "¡Sí! Pá, ja, ro.", "qs_"),
        falta("ajo", "a_", hl("ajo"), "jo", "Ajo.", "¡Sí! A, jo.", "qs_"),
        falta("viejito", "vie_to", hl("viejito"), "ji", "Viejito.", "¡Sí! Vie, ji, to.", "qs_"),
        falta("conejo", "cone_", hl("conejo"), "jo", "Conejo.", "¡Sí! Co, ne, jo.", "qs_"),
        falta("aguja", "agu_", hl("aguja"), "ja", "Aguja.", "¡Sí! A, gu, ja.", "qs_"),
        falta("abeja", "abe_", hl("abeja"), "ja", "Abeja.", "¡Sí! A, be, ja.", "qs_")
      ] },

    /* 6: pronuncio y escribo solito → armá la palabra */
    { tipo: "armar", titulo: "🧱 Armá la palabra",
      consigna: "Tocá las sílabas en orden",
      intro: A("p06_intro", "Mirá el dibujo y armá su nombre. Tocá las sílabas en orden."),
      items: [arm("jaula", ["jau", "la"]), arm("jarabe", ["ja", "ra", "be"]), arm("jinete", ["ji", "ne", "te"]),
              arm("jabali", ["ja", "ba", "lí"]), arm("joyas", ["jo", "yas"]), arm("japonesa", ["ja", "po", "ne", "sa"])] },

    /* 7: leé y uní */
    { tipo: "unirComida", titulo: "🔗 Leé y uní",
      consigna: "Tocá un dibujo y después su palabra",
      intro: A("p07_intro", "Leé las palabras. Tocá un dibujo y después tocá su palabra."),
      pares: ["leon", "jirafa", "diente", "foca", "rana", "conejo"].map(function (id) {
        return { a: pw(id), c: pt(id), conf: A("uni_ok_" + id, "¡Muy bien! " + may(PW[id].w) + ".") };
      }) },

    /* 8: leé y tocá el dibujo */
    { tipo: "elegir", titulo: "📖 Leé y tocá el dibujo", grande: true,
      intro: A("p08_intro", "Leé la palabra y tocá su dibujo."),
      items: [leer("jugo", ["jarra", "jabon"]), leer("jaula", ["joyas", "jarabe"]), leer("jinete", ["jirafa", "jabali"]),
              leer("ajo", ["abeja", "oreja"]), leer("joyas", ["jaula", "jamon"])] },

    /* 9: leer y comprender — oraciones */
    { tipo: "elegir", titulo: "📖 Leer y comprender", cols: 1,
      intro: A("p09_intro", "Leé la oración y tocá el dibujo correcto."),
      items: [escena(1, "lc_rana_conejo_luna", "lc_rana_red", "La rana y el conejo miran la luna."),
              escena(2, "lc_jirafa_jugo", "lc_nena_jugo", "La jirafa con sus anteojos toma jugo."),
              escena(3, "lc_leon_siesta", "lc_leon_despierto", "El león duerme la siesta.")] },

    /* 10: memotest */
    { tipo: "memo", titulo: "🃏 Memotest de la j", dorso: "🦒",
      consigna: "Buscá cada dibujo con su palabra",
      intro: A("p10_intro", "¡Es un memotest! Tocá dos cartas y buscá cada dibujo con su palabra."),
      pares: [parTxt("oreja"), parTxt("abeja"), parTxt("aguja"), parTxt("naranja")] },

    /* 11: ¿cuál no tiene j? */
    { tipo: "intruso", titulo: "🕵️ ¿Cuál no tiene j?",
      consigna: "Tocá el que no tiene j",
      intro: A("p11_intro", "¡Se coló uno que no tiene jota! Encontralo."),
      rondas: [ronda(1, ["jabon", "jirafa", "jugo"], "vaca"), ronda(2, ["oreja", "abeja", "conejo"], "luna"),
               ronda(3, ["naranja", "ajo", "jaula"], "tomate")] },

    /* 12: ¿dónde está la j? */
    { tipo: "opText", titulo: "📍 ¿En qué sílaba está la j?", cols: 1, largo: true,
      consigna: "¿En la primera, en la del medio o en la última?",
      intro: A("p12b_intro", "Escuchá la palabra y separala en sílabas. ¿La jota está en la primera sílaba, en la del medio o en la última?"),
      items: [donde("jabali", "primera", ["ja", "ba", "lí"]), donde("abeja", "última", ["a", "be", "ja"]), donde("viejito", "del medio", ["vie", "ji", "to"]),
              donde("jarabe", "primera", ["ja", "ra", "be"]), donde("aguja", "última", ["a", "gu", "ja"]), donde("pajaro", "del medio", ["pá", "ja", "ro"])] },

    /* 13: sopa de letras */
    { tipo: "sopa", titulo: "🔤 Sopa de letras",
      consigna: "Tocá la primera y la última letra",
      intro: A("p13_intro", "Buscá las palabras con jota. Tocá la primera letra y después la última."),
      fin: A("p13_fin", "¡Encontraste todas las palabras!"),
      grid: ["opjoyasj", "sbjismeu", "snsarmeg", "efbbuado", "eoueplfd", "tsmjtsaa", "difaajor", "fstmdtif"],
      palabras: [sopaP("jirafa", [0, 2, 1, 1]), sopaP("joyas", [0, 2, 0, 1]), sopaP("abeja", [2, 3, 1, 0]),
                 sopaP("jaula", [1, 2, 1, 1]), sopaP("jugo", [0, 7, 1, 0]), sopaP("ajo", [6, 4, 0, 1])] },

    /* 14: cuento */
    { tipo: "cuento", titulo: "📖 La jirafa Juana",
      paginas: [
        { img: "img/jj1.jpg", emoji: "🦒", audio: A("cj1", "Juana es una jirafa muy alegre. Le gusta tomar jugo de naranja.") },
        { img: "img/jj2.jpg", emoji: "🐝", audio: A("cj2", "Un día, una abeja se paró en su oreja. ¡Bzzz! Juana se rió: ¡ja, ja, ja!") },
        { img: "img/jj3.jpg", emoji: "🐗", audio: A("cj3", "Llegaron el jabalí y el conejo. Traían una caja con joyas de juguete.") },
        { img: "img/jj4.jpg", emoji: "🧃", audio: A("cj4", "Al final, todos tomaron jugo y jugaron juntos hasta la noche.") }
      ] },

    /* 15: comprensión */
    { tipo: "elegir", titulo: "❓ ¿Qué pasó en el cuento?",
      intro: A("p15_intro", "Respondé las preguntas del cuento La jirafa Juana."),
      items: [
        compr(1, "¿Qué le gusta tomar a Juana?", "jugo", ["jarabe", "jarra"], "A Juana le gusta tomar jugo."),
        compr(2, "¿Dónde se paró la abeja?", "oreja", ["diente", "naranja"], "La abeja se paró en su oreja."),
        compr(3, "¿Quién llegó con el conejo?", "jabali", ["foca", "leon"], "Llegó el jabalí."),
        compr(4, "¿Qué traían en la caja?", "joyas", ["ajo", "jamon"], "Traían joyas de juguete.")
      ] },

    /* 16: armá la oración (ficha "Leer y comprender") */
    { tipo: "armar", titulo: "📝 Armá la oración",
      consigna: "Tocá las palabras en orden",
      intro: A("p16_intro", "Armá la oración. Tocá las palabras en orden. Acordate: empieza con mayúscula y termina con punto."),
      items: [oracion("img/lc_jirafa_jugo.jpg", "🦒", ["La", "jirafa", "toma", "jugo."], 1),
              oracion("img/lc_leon_siesta.jpg", "🦁", ["El", "león", "duerme", "la", "siesta."], 2),
              oracion("img/lc_rana_conejo_luna.jpg", "🐸", ["La", "rana", "y", "el", "conejo", "miran", "la", "luna."], 3)] },

    /* 17 */
    { tipo: "cierre", img: "img/cierre.jpg", emoji: "🏆🦒",
      audio: A("d17_cierre", "¡Terminaste! Ya conocés la jota: ja, je, ji, jo, ju. ¡Te felicito!") }
  ]
};
