/* La q: que y qui — 1.er grado · Lengua — QueSepanTodos.com
   Basado en actividades áulicas de 1.er grado (Detective de sonidos Q-q, La letra Q).
   Imprenta minúscula; mayúscula solo al comienzo de la oración y en los nombres propios.
   En los textos de voz la letra se escribe "cú" para que gTTS la diga bien (no "ce u").
   © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
function A(a, t) { return { a: a, t: t }; }
/* resalta que / qui dentro de la palabra */
function hl(w) { return w.replace(/([Qq]u[eéiíÉÍ])/g, '<b class="q">$1</b>'); }
function may(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* palabras: w = cómo se escribe · e = emoji de respaldo · img o txt (tarjeta de texto) */
var PW = {
  queso: { w: "queso", e: "🧀" }, 
  quena: { w: "quena", e: "🪈" }, quince: { w: "quince", e: "", txt: "15" }, quinientos: { w: "quinientos", e: "", txt: "500" },
  quieto: { w: "quieto", e: "🧍" }, raqueta: { w: "raqueta", e: "🎾" },
  mosquito: { w: "mosquito", e: "🦟" }, paquete: { w: "paquete", e: "🎁" }, bosque: { w: "bosque", e: "🌲", img: "img/bosque.jpg" },
  buque: { w: "buque", e: "🚢" }, maquina: { w: "máquina", e: "🧵" },
  quique: { w: "Quique", e: "👦" }, raquel: { w: "Raquel", e: "👧" }, joaquin: { w: "Joaquín", e: "🧒" },
  /* sin q */
  pato: { w: "pato", e: "🦆" }, oso: { w: "oso", e: "🐻" }, vaca: { w: "vaca", e: "🐄" }, caracol: { w: "caracol", e: "🐌" }, conejo: { w: "conejo", e: "🐇" }, perro: { w: "perro", e: "🐕" }
};
/* ítem con dibujo; nombre = audio de la palabra */
function pw(id) {
  var x = PW[id], o = { id: id, emoji: x.e, nombre: A("w_" + id, may(x.w) + ".") };
  if (x.txt) o.txt = x.txt; else o.img = x.img || ("img/" + id + ".png");
  return o;
}
/* tarjeta con la palabra escrita */
function pt(id) { return { id: id + "_t", txt: hl(PW[id].w), nombre: A("w_" + id, may(PW[id].w) + ".") }; }

function cl(id, sil) { var it = pw(id); it.medio = sil; it.conf = A("det_" + id, "¡Sí! " + may(PW[id].w) + " empieza con " + sil + "."); return it; }
function falta(id, conHueco, conLetra, opciones, preg, conf, pref) {
  var it = pw(id);
  it.texto = conHueco.replace("_", '<span class="hueco">__</span>');
  it.relleno = conLetra;
  it.pregunta = A((pref || "fal_p_") + id, preg);
  it.conf = A(pref ? pref + "ok_" + id : "fal_ok_" + id, conf);
  it.opciones = opciones;
  return it;
}
function ops(lista, ok) { return lista.map(function (t) { return { t: t, ok: t === ok }; }); }
function arm(id, piezas, conf) { var it = pw(id); it.piezas = piezas; it.audio = it.nombre; if (conf) it.conf = conf; return it; }
function leer(id, otros, k) {
  var o = [pw(id)].concat(otros.map(pw)); o[0].ok = true;
  return { texto: PW[id].w, pregunta: A("leer_cual", "¿Cuál es?"),
    conf: A("leer_ok_" + id, "¡Muy bien! Dice " + PW[id].w + "."), opciones: o };
}
function parTxt(id, conf) { return { id: id, a: pw(id), c: pt(id), h: pt(id), conf: A("par_ok_" + id, conf) }; }
function ronda(n, ids, intr) {
  return {
    img: "img/portada.jpg", emoji: "🔍", etiqueta: "🔍 Palabras con q",
    pregunta: A("int_p", "¿Cuál no tiene cú? Tocalo."),
    conf: A("int_ok_" + intr, "¡Sí! " + may(PW[intr].w) + " no tiene cú."),
    animales: ids.map(function (id) {
      var it = pw(id); it.texto = hl(PW[id].w); it.dice = A("int_si_" + id, may(PW[id].w) + " sí tiene cú. Buscá otro."); return it;
    }).concat([(function () { var it = pw(intr); it.texto = PW[intr].w; it.intruso = true; return it; })()])
  };
}
function busca(id, ok) {
  var it = pw(id); it.ok = ok;
  it.dice = ok ? A("bus_ok_" + id, "¡Sí! " + may(PW[id].w) + " tiene cú.") : A("bus_no_" + id, may(PW[id].w) + " no tiene cú.");
  return it;
}
function sopaP(id, pos) { var it = pw(id); it.w = PW[id].w; it.pos = pos; return it; }
function oracion(id, piezas, n) { var it = pw(id); it.piezas = piezas; it.oracion = true; it.audio = A("orac_" + n, piezas.join(" ")); return it; }
function compr(n, preg, ok, otros, conf) {
  var o = [pw(ok)].concat(otros.map(pw)); o[0].ok = true;
  return { texto: preg, pregunta: A("com_p" + n, preg), conf: A("com_ok" + n, "¡Sí! " + conf), opciones: o };
}

window.DATOS = {
  meta: {
    titulo: "La q: que y qui",
    tituloCorto: "La q: que y qui",
    subtitulo: "¡Juguemos a ser detectives de la q! 🔍",
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
    que: { n: "que", txt: '<b class="q">que</b>' },
    qui: { n: "qui", txt: '<b class="q">qui</b>' }
  },
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada.jpg", emoji: "🔍🧀",
      audio: A("d00_portada", "¡Hola! Hoy vamos a ser detectives de la letra cú. Vamos a buscar palabras con que y con qui. Tocá el botón verde para empezar.") },

    /* 1: narración — la letra q */
    { tipo: "narracion", titulo: "🔍 La letra q",
      escena: [
        { id: "letra", a: { txt: "Q q" }, c: { txt: '<b class="q">que</b> · <b class="q">qui</b>' } },
        { id: "queso", a: pw("queso"), c: { txt: hl("queso") } },
        { id: "quince", a: pw("quince"), c: { txt: hl("quince") } },
        { id: "quique", a: pw("quique"), c: { txt: hl("Quique") } }
      ],
      pasos: [
        { texto: "Q mayúscula · q minúscula", marca: [], audio: A("p01_n1", "Hoy vamos a conocer la letra cú. Así es la cú mayúscula, y así es la cú minúscula.") },
        { texto: "La q siempre va con la u: que · qui", marca: ["letra"], audio: A("p01_n2", "La cú es muy amiga de la u: siempre van juntas. Con la e forman que, y con la i forman qui.") },
        { texto: "La u no suena: queso", marca: ["queso"], audio: A("p01_n3", "Pero la u no suena. Escuchá: queso. Queso empieza con que.") },
        { texto: "quince empieza con qui", marca: ["quince"], audio: A("p01_n4", "Quince. Quince empieza con qui.") },
        { texto: "Los nombres van con mayúscula", marca: ["quique"], audio: A("p01_n5", "Quique es un nombre. Los nombres empiezan con mayúscula: Quique se escribe con cú mayúscula.") },
        { texto: "¡A jugar de detectives! 🔍", marca: [], audio: A("p01_n6", "¡Ahora vamos a jugar de detectives de la cú!") }
      ] },

    /* 2: explorar palabras con q */
    { tipo: "explorar", titulo: "👂 Palabras con q",
      consigna: "Tocá cada dibujo y escuchá",
      intro: A("p02_intro", "Tocá cada dibujo y escuchá dónde está la cú."),
      animales: [
        { id: "queso", img: "img/queso.png", emoji: "🧀", texto: hl("queso"), nombre: A("ex_queso", "Queso. Empieza con que.") },
        { id: "quince", txt: "15", texto: hl("quince"), nombre: A("ex_quince", "Quince. Empieza con qui.") },
        { id: "paquete", img: "img/paquete.png", emoji: "🎁", texto: hl("paquete"), nombre: A("ex_paquete", "Paquete. Tiene que en el medio.") },
        { id: "raqueta", img: "img/raqueta.png", emoji: "🎾", texto: hl("raqueta"), nombre: A("ex_raqueta", "Raqueta. Tiene que en el medio.") },
        { id: "mosquito", img: "img/mosquito.png", emoji: "🦟", texto: hl("mosquito"), nombre: A("ex_mosquito", "Mosquito. Tiene qui en el medio.") },
        { id: "bosque", img: "img/bosque.jpg", emoji: "🌲", texto: hl("bosque"), nombre: A("ex_bosque", "Bosque. Termina con que.") }
      ] },

    /* 3: detective de sonidos — que / qui */
    { tipo: "clasificar", titulo: "🕵️ Detective de sonidos",
      consigna: "¿Empieza con que o con qui?",
      intro: A("p03_intro", "Escuchá el nombre de cada dibujo. ¿Empieza con que o con qui? Tocá la respuesta."),
      destinos: ["que", "qui"],
      items: [cl("queso", "que"), cl("quena", "que"),
              cl("quince", "qui"), cl("quinientos", "qui"), cl("quieto", "qui")] },

    /* 4: ¿c o q? — mira la letra que sigue */
    { tipo: "opText", titulo: "✏️ ¿c o q?",
      consigna: "Mirá la letra que sigue: ¿va c o q?",
      intro: A("p04b_intro", "Falta una letra: ¿ce o cú? Pista: mirá lo que sigue. Si después viene u e o u i, va la cú. Si viene a, o, u, va la ce."),
      items: [
        falta("vaca", "va_a", 'va<b class="q">c</b>a', ops(["c", "q"], "c"), "Vaca. ¿Va ce o cú?", "¡Sí! Vaca va con ce, porque después viene la a.", "cq_"),
        falta("buque", "bu_ue", hl("buque"), ops(["c", "q"], "q"), "Buque. ¿Va ce o cú?", "¡Sí! Buque va con cú, porque después viene u e.", "cq_"),
        falta("conejo", "_onejo", '<b class="q">c</b>onejo', ops(["c", "q"], "c"), "Conejo. ¿Va ce o cú?", "¡Sí! Conejo va con ce, porque después viene la o.", "cq_"),
        falta("mosquito", "mos_uito", hl("mosquito"), ops(["c", "q"], "q"), "Mosquito. ¿Va ce o cú?", "¡Sí! Mosquito va con cú, porque después viene u i.", "cq_"),
        falta("caracol", "_aracol", '<b class="q">c</b>aracol', ops(["c", "q"], "c"), "Caracol. ¿Va ce o cú?", "¡Sí! Caracol va con ce, porque después viene la a.", "cq_"),
        falta("raqueta", "ra_ueta", hl("raqueta"), ops(["c", "q"], "q"), "Raqueta. ¿Va ce o cú?", "¡Sí! Raqueta va con cú, porque después viene u e.", "cq_")
      ] },

    /* 5: ¿que o qui? */
    { tipo: "opText", titulo: "🧩 ¿que o qui?",
      consigna: "Tocá la sílaba que falta",
      intro: A("p05_intro", "Ahora falta una sílaba. ¿Es que o qui? Tocá la que va."),
      items: [
        falta("queso", "_so", hl("queso"), ops(["que", "qui"], "que"), "Queso. ¿Qué sílaba falta?", "¡Sí! Que, queso.", "sil_"),
        falta("mosquito", "mos_to", hl("mosquito"), ops(["que", "qui"], "qui"), "Mosquito. ¿Qué sílaba falta?", "¡Sí! Qui, mosquito.", "sil_"),
        falta("paquete", "pa_te", hl("paquete"), ops(["que", "qui"], "que"), "Paquete. ¿Qué sílaba falta?", "¡Sí! Que, paquete.", "sil_"),
        falta("quince", "_nce", hl("quince"), ops(["que", "qui"], "qui"), "Quince. ¿Qué sílaba falta?", "¡Sí! Qui, quince.", "sil_"),
        falta("raqueta", "ra_ta", hl("raqueta"), ops(["que", "qui"], "que"), "Raqueta. ¿Qué sílaba falta?", "¡Sí! Que, raqueta.", "sil_"),
        falta("quieto", "_eto", hl("quieto"), ops(["que", "qui"], "qui"), "Quieto. ¿Qué sílaba falta?", "¡Sí! Qui, quieto.", "sil_")
      ] },

    /* 6: armá la palabra */
    { tipo: "armar", titulo: "🧱 Armá la palabra",
      consigna: "Tocá las sílabas en orden",
      intro: A("p06_intro", "Mirá el dibujo y armá su nombre. Tocá las sílabas en orden."),
      items: [arm("queso", ["que", "so"]), arm("paquete", ["pa", "que", "te"]), arm("mosquito", ["mos", "qui", "to"]),
              arm("raqueta", ["ra", "que", "ta"]), arm("maquina", ["má", "qui", "na"])] },

    /* 7: leé y tocá el dibujo */
    { tipo: "elegir", titulo: "📖 Leé y tocá el dibujo", grande: true,
      intro: A("p07_intro", "Leé la palabra y tocá su dibujo."),
      items: [leer("queso", ["paquete", "quince"], 0), leer("paquete", ["buque", "queso"], 1), leer("quince", ["quinientos", "quena"], 2),
              leer("quena", ["raqueta", "maquina"], 3), leer("buque", ["bosque", "mosquito"], 4)] },

    /* 8: memotest dibujo ↔ palabra */
    { tipo: "memo", titulo: "🃏 Memotest de la q", dorso: "🔍",
      consigna: "Buscá cada dibujo con su palabra",
      intro: A("p08_intro", "¡Es un memotest! Tocá dos cartas y buscá cada dibujo con su palabra."),
      pares: [parTxt("queso", "¡Sí! Queso."), parTxt("raqueta", "¡Sí! Raqueta."), parTxt("mosquito", "¡Sí! Mosquito."), parTxt("paquete", "¡Sí! Paquete.")] },

    /* 9: uní el dibujo con su palabra */
    { tipo: "unirComida", titulo: "🔗 Uní dibujo y palabra",
      consigna: "Tocá un dibujo y después su palabra",
      intro: A("p09_intro", "Tocá un dibujo y después tocá su palabra. Se van a unir con una línea."),
      pares: [
        { a: pw("quena"), c: pt("quena"), conf: A("uni_ok_quena", "¡Muy bien! Quena: un instrumento de viento.") },
        { a: pw("buque"), c: pt("buque"), conf: A("uni_ok_buque", "¡Muy bien! Buque: un barco muy grande.") },
        { a: pw("maquina"), c: pt("maquina"), conf: A("uni_ok_maquina", "¡Muy bien! Máquina de coser.") },
        { a: pw("bosque"), c: pt("bosque"), conf: A("uni_ok_bosque", "¡Muy bien! Bosque, con muchos árboles.") }
      ] },

    /* 10: ¿cuál no tiene q? */
    { tipo: "intruso", titulo: "🕵️ ¿Cuál no tiene q?",
      consigna: "Tocá el que no tiene q",
      intro: A("p10_intro", "¡Se coló uno que no tiene cú! Encontralo."),
      rondas: [ronda(1, ["queso", "raqueta", "paquete"], "pato"), ronda(2, ["mosquito", "quince", "buque"], "oso"),
               ronda(3, ["bosque", "quena", "maquina"], "vaca")] },

    /* 11: buscá en el bosque */
    { tipo: "seleccionar", titulo: "🌲 Buscamos en el bosque",
      consigna: "Tocá solo los que tienen q",
      fondo: "img/bosque.jpg", fondoEmoji: "🌲",
      intro: A("p11_intro", "Estamos en el bosque. Tocá solo los dibujos que tienen cú en su nombre."),
      fin: A("p11_fin", "¡Muy bien, detective! Encontraste todo lo que tiene cú."),
      items: [busca("mosquito", true), busca("paquete", true), busca("raqueta", true),
              busca("conejo", false), busca("perro", false), busca("oso", false), busca("pato", false)] },

    /* 12: sopa de letras */
    { tipo: "sopa", titulo: "🔤 Sopa de letras",
      consigna: "Tocá la primera y la última letra",
      intro: A("p12_intro", "Buscá las palabras con cú. Tocá la primera letra y después la última."),
      fin: A("p12_fin", "¡Encontraste todas las palabras!"),
      grid: ["frqdbnsq", "uraupaou", "blmqipre", "oopdunos", "satnbeco", "qaaeuete", "uobuquea", "epaquete"],
      palabras: [sopaP("raqueta", [0, 1, 1, 1]), sopaP("paquete", [7, 1, 0, 1]), sopaP("bosque", [2, 0, 1, 0]),
                 sopaP("quince", [0, 2, 1, 1]), sopaP("queso", [0, 7, 1, 0]), sopaP("buque", [6, 2, 0, 1])] },

    /* 13: ¿mayúscula o minúscula? */
    { tipo: "opText", titulo: "🔠 ¿Mayúscula o minúscula?",
      consigna: "Tocá cómo se escribe",
      intro: A("p13_intro", "Los nombres de las personas empiezan con mayúscula. Las demás palabras, con minúscula. Tocá cómo se escribe."),
      items: [
        falta("quique", "_", "Quique", ops(["Quique", "quique"], "Quique"), "¿Cómo se escribe el nombre de este nene?", "¡Sí! Quique es un nombre: va con mayúscula.", "may_"),
        falta("queso", "el _", "el queso", ops(["queso", "Queso"], "queso"), "¿Cómo se escribe queso?", "¡Sí! Queso no es un nombre de persona: va con minúscula.", "may_"),
        falta("raquel", "_", "Raquel", ops(["Raquel", "raquel"], "Raquel"), "¿Cómo se escribe el nombre de esta nena?", "¡Sí! Raquel es un nombre: va con mayúscula.", "may_"),
        falta("raqueta", "la _", "la raqueta", ops(["raqueta", "Raqueta"], "raqueta"), "¿Cómo se escribe raqueta?", "¡Sí! Raqueta va con minúscula.", "may_"),
        falta("joaquin", "_", "Joaquín", ops(["Joaquín", "joaquín"], "Joaquín"), "¿Cómo se escribe el nombre de este nene?", "¡Sí! Joaquín es un nombre: va con mayúscula.", "may_")
      ] },

    /* 14: cuento */
    { tipo: "cuento", titulo: "📖 El paquete de Quique",
      paginas: [
        { img: "img/q1.jpg", emoji: "🎁", audio: A("cq1", "Quique recibió un paquete. ¿Qué habrá adentro?") },
        { img: "img/q2.jpg", emoji: "🎾", audio: A("cq2", "¡Una raqueta y un rico queso! Quique se puso muy contento.") },
        { img: "img/q3.jpg", emoji: "🦟", audio: A("cq3", "Quique fue al bosque a jugar con su raqueta. Pero un mosquito no lo dejaba quieto.") },
        { img: "img/q4.jpg", emoji: "🧀", audio: A("cq4", "Al final, Quique comió un poquito de queso y siguió jugando. ¡Qué lindo día!") }
      ] },

    /* 15: comprensión del cuento */
    { tipo: "elegir", titulo: "❓ ¿Qué pasó en el cuento?",
      intro: A("p15_intro", "Respondé las preguntas del cuento El paquete de Quique."),
      items: [
        compr(1, "¿Qué recibió Quique?", "paquete", ["buque", "quena"], "Quique recibió un paquete."),
        compr(2, "¿Con qué jugó en el bosque?", "raqueta", ["quena", "maquina"], "Jugó con su raqueta."),
        compr(3, "¿Quién no lo dejaba quieto?", "mosquito", ["conejo", "perro"], "Un mosquito no lo dejaba quieto."),
        compr(4, "¿Qué comió al final?", "queso", ["raqueta", "paquete"], "Comió un poquito de queso.")
      ] },

    /* 16: armá la oración */
    { tipo: "armar", titulo: "📝 Armá la oración",
      consigna: "Tocá las palabras en orden",
      intro: A("p16_intro", "Armá la oración. Tocá las palabras en orden. Acordate: empieza con mayúscula y termina con punto."),
      items: [oracion("quique", ["Quique", "come", "queso."], 1), oracion("raquel", ["Raquel", "tiene", "una", "raqueta."], 2),
              oracion("mosquito", ["El", "mosquito", "está", "en", "el", "bosque."], 3)] },

    /* 17 */
    { tipo: "cierre", img: "img/cierre.jpg", emoji: "🏆🔍",
      audio: A("d17_cierre", "¡Terminaste, detective! Ya sabés que la cú siempre va con la u: que, qui. ¡Te felicito!") }
  ]
};
