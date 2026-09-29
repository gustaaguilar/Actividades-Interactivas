// ============================================================
//  NÚMEROS DEL 1 AL 10 — Sala de 5 y 1er grado
//  QueSepanTodos.com · Profe Gustavo Aguilar
//  Contenido pedagógico del paquete (motor.js es genérico)
// ============================================================

const NOMBRES = ["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve","diez",
  "once","doce","trece","catorce","quince","dieciséis","diecisiete","dieciocho","diecinueve","veinte"];

const DATOS = {
  meta: {
    titulo: "Números del 1 al 10",
    lema: "…¡y hasta el 20! ⭐",
    subtitulo: "Nivel Inicial · Sala de 5 y 1er grado · ⭐ Desafíos para 1er grado",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    frase: "Menos prisa, más vida 🧉🫂",
    foto: "profe.jpg",
    portada: "portada",
    cierre: "cierre"
  },

  // Imágenes: archivo + emoji de respaldo (se muestra si el archivo todavía no existe)
  imagenes: {
    portada:   { archivo: "img/portada.jpg",   emoji: "🔢" },
    cierre:    { archivo: "img/cierre.jpg",    emoji: "🎉" },
    rana:      { archivo: "img/rana.png",      emoji: "🐸" },
    pajaro:    { archivo: "img/pajaro.png",    emoji: "🐦" },
    gato:      { archivo: "img/gato.png",      emoji: "🐱" },
    cerdita:   { archivo: "img/cerdita.png",   emoji: "🐷" },
    pajarito:  { archivo: "img/pajarito.png",  emoji: "🐤" },
    zanahoria: { archivo: "img/zanahoria.png", emoji: "🥕" },
    tomate:    { archivo: "img/tomate.png",    emoji: "🍅" },
    choclo:    { archivo: "img/choclo.png",    emoji: "🌽" },
    lechuga:   { archivo: "img/lechuga.png",   emoji: "🥬" },
    zapallo:   { archivo: "img/zapallo.png",   emoji: "🎃" },
    morron:    { archivo: "img/morron.png",    emoji: "🫑" },
    perro:     { archivo: "img/perro.png",     emoji: "🐶" },
    cucaracha: { archivo: "img/cucaracha.png", emoji: "🪳" },
    huevo:     { archivo: "img/huevo.png",     emoji: "🥚" },
    musica:    { archivo: "img/musica.png",    emoji: "🎵" },
    mono:      { archivo: "img/mono.png",      emoji: "🐵" },
    tren:      { archivo: "img/tren.png",      emoji: "🚂" }
  },

  // Todos los audios del paquete (id → texto). El script de Colab se genera desde acá.
  audios: {
    // números
    n1:"uno", n2:"dos", n3:"tres", n4:"cuatro", n5:"cinco", n6:"seis", n7:"siete", n8:"ocho", n9:"nueve", n10:"diez",
    n11:"once", n12:"doce", n13:"trece", n14:"catorce", n15:"quince", n16:"dieciséis", n17:"diecisiete",
    n18:"dieciocho", n19:"diecinueve", n20:"veinte",

    // video
    a_video: "Mirá el video y cantá con los números. Cuando termine, tocá Siguiente.",

    // unir
    a_unir1: "Uní cada dibujo con su número. Tocá un dibujo, contá cuántos hay, y después tocá su número.",
    a_unir2: "Ahora con los números del seis al diez. Tocá un dibujo, contá, y tocá su número.",
    i_rana: "La rana. ¿Cuántas hay?",
    i_pajaro: "Los pájaros. ¿Cuántos hay?",
    i_gato: "Los gatos. ¿Cuántos hay?",
    i_cerdita: "Las cerditas. ¿Cuántas hay?",
    i_pajarito: "Los pajaritos. ¿Cuántos hay?",
    i_hortalizas: "Las hortalizas. ¿Cuántas hay?",
    i_perro: "Los perritos. ¿Cuántos hay?",
    i_cucaracha: "Las cucarachas. ¿Cuántas hay?",
    i_huevo: "Los huevos. ¿Cuántos hay?",
    i_musica: "Las notas musicales. ¿Cuántas hay?",
    ok_u1: "¡Muy bien! Hay una rana: va con el número uno.",
    ok_u2: "¡Muy bien! Hay dos pájaros: va con el número dos.",
    ok_u3: "¡Muy bien! Hay tres gatos: va con el número tres.",
    ok_u4: "¡Muy bien! Hay cuatro cerditas: va con el número cuatro.",
    ok_u5: "¡Muy bien! Hay cinco pajaritos: va con el número cinco.",
    ok_u6: "¡Muy bien! Hay seis hortalizas: va con el número seis.",
    ok_u7: "¡Muy bien! Hay siete perritos: va con el número siete.",
    ok_u8: "¡Muy bien! Hay ocho cucarachas: va con el número ocho.",
    ok_u9: "¡Muy bien! Hay nueve huevos: va con el número nueve.",
    ok_u10: "¡Muy bien! Hay diez notas musicales: va con el número diez.",
    e_elegi: "Primero tocá un dibujo, y después su número.",
    e_contar: "Mmm, no es ese. Contá otra vez, despacito, con el dedo.",
    fin_unir1: "¡Excelente! Uniste todos los dibujos del uno al cinco.",
    fin_unir2: "¡Excelente! Uniste todos los dibujos del seis al diez.",

    // recta numérica
    a_recta: "Completá la recta numérica. Mirá el lugar que titila y tocá el número que falta.",
    e_recta: "No es ese. Fijate qué número está antes y cuál viene después.",
    fin_recta: "¡Completaste la recta! Uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.",

    // ordenar
    a_ord1: "Ordená los números del uno al diez. Tocalos de menor a mayor: primero el uno, después el dos, y así.",
    a_ord2: "Ahora seguimos del once al veinte. Tocá los números en orden, empezando por el once.",
    e_orden: "Ese no. Buscá el número que sigue.",
    fin_ord1: "¡Muy bien! Ordenaste los números del uno al diez.",
    fin_ord2: "¡Excelente! Ordenaste los números del once al veinte.",

    // explicación anterior / posterior
    ex1: "Mirá el tren. Este vagón tiene el número cinco.",
    ex2: "El número que está antes se llama anterior. El anterior del cinco es el cuatro.",
    ex3: "El número que está después se llama posterior. El posterior del cinco es el seis.",

    // anterior y posterior
    a_antpos: "Completá el tren con el anterior y el posterior. Tocá el número que va en el vagón que titila.",
    q_ant6: "¿Qué número va antes del seis?",   q_pos6: "¿Qué número va después del seis?",
    q_ant8: "¿Qué número va antes del ocho?",   q_pos8: "¿Qué número va después del ocho?",
    q_ant10: "¿Qué número va antes del diez?",  q_pos10: "¿Qué número va después del diez?",
    q_ant14: "¿Qué número va antes del catorce?", q_pos14: "¿Qué número va después del catorce?",
    ok_ant6: "¡Sí! El cinco está antes del seis.",       ok_pos6: "¡Sí! El siete está después del seis.",
    ok_ant8: "¡Sí! El siete está antes del ocho.",       ok_pos8: "¡Sí! El nueve está después del ocho.",
    ok_ant10: "¡Sí! El nueve está antes del diez.",      ok_pos10: "¡Sí! El once está después del diez.",
    ok_ant14: "¡Sí! El trece está antes del catorce.",   ok_pos14: "¡Sí! El quince está después del catorce.",
    e_ant: "No es ese. El anterior es el número que está justo antes. Contá para atrás.",
    e_pos: "No es ese. El posterior es el número que viene justo después. Contá para adelante.",

    // cierre
    cierre: "¡Terminaste! Ya sabés contar, ordenar y encontrar el anterior y el posterior. ¡Muy bien!"
  },

  pantallas: [
    { tipo: "portada" },

    { tipo: "video", titulo: "🎬 Mirá el video", texto: "Mirá el video y cantá con los números.",
      instruccion: "a_video", videoId: "dQxuVSzyOOk" },

    { tipo: "unir", titulo: "🔗 Uní cada dibujo con su número (1 al 5)",
      texto: "Tocá un dibujo, contá y tocá su número.", instruccion: "a_unir1", fin: "fin_unir1",
      pares: [
        { n: 1, imgs: ["rana"],     cant: 1, audio: "i_rana",     ok: "ok_u1" },
        { n: 2, imgs: ["pajaro"],   cant: 2, audio: "i_pajaro",   ok: "ok_u2" },
        { n: 3, imgs: ["gato"],     cant: 3, audio: "i_gato",     ok: "ok_u3" },
        { n: 4, imgs: ["cerdita"],  cant: 4, audio: "i_cerdita",  ok: "ok_u4" },
        { n: 5, imgs: ["pajarito"], cant: 5, audio: "i_pajarito", ok: "ok_u5" }
      ] },

    { tipo: "unir", titulo: "🔗 Uní cada dibujo con su número (6 al 10)",
      texto: "Tocá un dibujo, contá y tocá su número.", instruccion: "a_unir2", fin: "fin_unir2",
      pares: [
        { n: 6,  imgs: ["zanahoria","tomate","choclo","lechuga","zapallo","morron"], cant: 6, audio: "i_hortalizas", ok: "ok_u6" },
        { n: 7,  imgs: ["perro"],     cant: 7,  audio: "i_perro",     ok: "ok_u7" },
        { n: 8,  imgs: ["cucaracha"], cant: 8,  audio: "i_cucaracha", ok: "ok_u8" },
        { n: 9,  imgs: ["huevo"],     cant: 9,  audio: "i_huevo",     ok: "ok_u9" },
        { n: 10, imgs: ["musica"],    cant: 10, audio: "i_musica",    ok: "ok_u10" }
      ] },

    { tipo: "recta", titulo: "📏 Completá la recta numérica",
      texto: "Tocá el número que falta en el lugar que titila.", instruccion: "a_recta",
      desde: 1, hasta: 10, ocultos: [2, 4, 5, 7, 9], img: "rana", error: "e_recta", fin: "fin_recta" },

    { tipo: "ordenar", titulo: "🔢 Ordená los números del 1 al 10",
      texto: "Tocá los números de menor a mayor.", instruccion: "a_ord1",
      desde: 1, hasta: 10, img: "mono", error: "e_orden", fin: "fin_ord1" },

    { tipo: "ordenar", titulo: "⭐ Desafío: del 11 al 20",
      texto: "Tocá los números en orden, empezando por el 11.", instruccion: "a_ord2",
      desde: 11, hasta: 20, img: "mono", error: "e_orden", fin: "fin_ord2" },

    { tipo: "explica", titulo: "🚂 Anterior y posterior", img: "tren",
      numeros: [4, 5, 6],
      pasos: [
        { audio: "ex1", marca: 1, texto: "Este vagón tiene el <b>5</b>." },
        { audio: "ex2", marca: 0, texto: "El que está <b>antes</b> es el <b>anterior</b>: el 4." },
        { audio: "ex3", marca: 2, texto: "El que está <b>después</b> es el <b>posterior</b>: el 6." }
      ] },

    { tipo: "antpos", titulo: "🚃 Anterior y posterior", img: "tren",
      texto: "Tocá el número que va en el vagón que titila.", instruccion: "a_antpos",
      items: [6, 8, 10, 14], desafio: [14] },

    { tipo: "cierre", audio: "cierre" }
  ]
};
