/* datos.js — "El reloj" · 3er grado · QueSepanTodos.com
   Cada audio es A(id, texto). La lista para gTTS se extrae de este archivo con script. */
function A(au, tx) { return { au: au, tx: tx }; }

/* Audios reutilizados */
var Q_HORA   = A("q_hora",   "¿Qué hora marca el reloj?");
var Q_24     = A("q_24",     "¿Cómo se escribe en el formato de 24 horas?");
var Q_12     = A("q_12",     "¿Cómo se escribe en el formato de 12 horas?");
var PI_PEQ   = A("pi_peq",   "Fijate bien: la aguja pequeña, la más corta, es la que marca la hora.");
var PI_GRA   = A("pi_gra",   "Cuidado: la aguja grande marca los minutos. Si está en el 12, es la hora en punto.");
var PI_MIN   = A("pi_min",   "Mirá la aguja grande: de número a número pasan 5 minutos. Contá de 5 en 5 desde el 12.");
var PI_PM    = A("pi_pm",    "Fijate si dice a eme o pe eme. Si es pe eme, de tarde o de noche, hay que sumarle 12 a la hora.");
var PI_RESTA = A("pi_resta", "Si la hora es mayor que 12, es de tarde o de noche. Restale 12 para saber la hora del reloj común.");
var PI_DUR   = A("pi_dur",   "Mirá los dos relojes: ¿cuánto se movió la aguja grande? Media vuelta son 30 minutos, y una vuelta completa, 1 hora.");

window.DATOS = {
  meta: {
    titulo: "El reloj",
    subtitulo: "Leemos la hora, calculamos cuánto dura cada actividad y usamos los relojes digitales",
    grado: "3er grado · Matemática",
    autor: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    foto: "profe.jpg",
    fotoMini: "profe_mini.jpg",
    imgPortada: "portada.jpg",
    imgCierre: "cierre.jpg",
    fuente: "Basado en el material de la Escuela N° 1-183 “Correo Argentino” (Costa de Araujo, Lavalle, Mendoza)",
    licencia: "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    revision: false
  },

  pantallas: [
    { tipo: "portada" },

    /* 1 — Partes del reloj (narración animada) */
    { tipo: "narracion", titulo: "Las partes del reloj", visual: "partes",
      pasos: [
        { audio: A("p01_1", "¡Hola! Hoy vamos a aprender a leer el reloj. Este es un reloj de agujas: los números del 1 al 12 nos muestran las horas."),
          destacar: "nums", apuntar: "num3", chip: "🔢 Los números del 1 al 12 marcan las horas" },
        { audio: A("p01_2", "La aguja pequeña es la más corta. Nos indica las horas."),
          destacar: "aguH", apuntar: "aguH", chip: "Aguja pequeña: indica las horas", color: "#1d4ed8" },
        { audio: A("p01_3", "La aguja grande es la más larga. Nos indica los minutos."),
          destacar: "aguM", apuntar: "aguM", chip: "Aguja grande: indica los minutos", color: "#dc2626" },
        { audio: A("p01_4", "Entre un número y el siguiente pasan 5 minutos. Cuando la aguja grande señala el 1, son 5 minutos; en el 2, 10 minutos; en el 3, 15 minutos; y así, de 5 en 5, hasta llegar a 60."),
          destacar: "minutos", apuntar: "min3", chip: "De número a número pasan 5 minutos", color: "#dc2626" },
        { audio: A("p01_5", "Cuando la aguja grande está en el 12, es la hora en punto. Acá la aguja pequeña señala el 4: son las 4 en punto."),
          destacar: "dig", apuntar: "dig", chip: "Aguja grande en el 12: hora en punto. Son las 4:00" }
      ] },

    /* 2 — Equivalencias (narración animada) */
    { tipo: "narracion", titulo: "Horas y minutos", visual: "equiv", acumular: true,
      pasos: [
        { audio: A("p02_1", "Una hora tiene 60 minutos. En una hora, la aguja grande da una vuelta completa al reloj."),
          giro: 360, color: "#dc2626", apuntar: "aguM", chip: "1 hora = 60 minutos" },
        { audio: A("p02_2", "Media hora son 30 minutos. La aguja grande da media vuelta: va del 12 al 6."),
          giro: 180, color: "#1d4ed8", apuntar: "num6", chip: "Media hora = 30 minutos" },
        { audio: A("p02_3", "Un cuarto de hora son 15 minutos. La aguja grande va del 12 al 3: recorre una de las cuatro partes del reloj."),
          giro: 90, color: "#15803d", apuntar: "num3", chip: "Un cuarto de hora = 15 minutos" },
        { audio: A("p02_4", "Tres cuartos de hora son 45 minutos. La aguja grande va del 12 al 9: recorre tres de las cuatro partes."),
          giro: 270, color: "#ea580c", apuntar: "num9", chip: "Tres cuartos de hora = 45 minutos" }
      ] },

    /* 3 — Asociar */
    { tipo: "asociar", titulo: "¿Cuántos minutos son?",
      instr: A("p03_in", "Uní cada parte de la hora con sus minutos. Tocá una tarjeta de la izquierda y después su pareja de la derecha."),
      pares: [
        { a: "1 hora", b: "60 minutos", auA: A("p03_a1", "Una hora."), auB: A("p03_b1", "Sesenta minutos."),
          conf: A("p03_c1", "Una hora son 60 minutos: una vuelta completa de la aguja grande.") },
        { a: "media hora", b: "30 minutos", auA: A("p03_a2", "Media hora."), auB: A("p03_b2", "Treinta minutos."),
          conf: A("p03_c2", "Media hora son 30 minutos: la mitad de 60.") },
        { a: "un cuarto de hora", b: "15 minutos", auA: A("p03_a3", "Un cuarto de hora."), auB: A("p03_b3", "Quince minutos."),
          conf: A("p03_c3", "Un cuarto de hora son 15 minutos: 60 repartido en cuatro partes iguales.") },
        { a: "tres cuartos de hora", b: "45 minutos", auA: A("p03_a4", "Tres cuartos de hora."), auB: A("p03_b4", "Cuarenta y cinco minutos."),
          conf: A("p03_c4", "Tres cuartos de hora son 45 minutos: 15, más 15, más 15.") },
        { a: "2 horas", b: "120 minutos", auA: A("p03_a5", "Dos horas."), auB: A("p03_b5", "Ciento veinte minutos."),
          conf: A("p03_c5", "Dos horas son 120 minutos: 60 más 60.") }
      ],
      pista: A("p03_pi", "Esa no es su pareja. Recordá: una hora tiene 60 minutos."),
      fin: A("p03_fin", "¡Excelente! Ya sabés cuántos minutos tiene cada parte de la hora.") },

    /* 4 — Leer la hora en punto */
    { tipo: "trivia", titulo: "¿Qué hora es?",
      instr: A("p04_in", "Mirá bien las dos agujas. La pequeña marca la hora y la grande, los minutos. Elegí qué hora marca el reloj."),
      items: [
        { reloj: [4, 0], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["4:00", "12:20", "5:00", "3:00"], ok: "4:00",
          conf: A("p04_c1", "¡Bien! La aguja grande está en el 12 y la pequeña en el 4: son las 4 en punto."), pista: PI_PEQ },
        { reloj: [11, 0], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["11:00", "12:55", "10:00", "1:00"], ok: "11:00",
          conf: A("p04_c2", "La aguja grande está en el 12 y la pequeña en el 11: son las 11 en punto."), pista: PI_GRA },
        { reloj: [6, 0], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["6:00", "12:30", "7:00", "5:00"], ok: "6:00",
          conf: A("p04_c3", "La aguja grande en el 12 y la pequeña en el 6: son las 6 en punto. ¡Las dos agujas forman una línea recta!"), pista: PI_GRA },
        { reloj: [7, 0], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["7:00", "12:35", "8:00", "6:00"], ok: "7:00",
          conf: A("p04_c4", "La aguja pequeña señala el 7 y la grande, el 12: son las 7 en punto."), pista: PI_PEQ }
      ] },

    /* 5 — Y cuarto, y media, 45 */
    { tipo: "trivia", titulo: "Cuartos y medias",
      instr: A("p05_in", "Ahora la aguja grande no siempre está en el 12. Recordá: en el 3 son 15 minutos, en el 6 son 30 y en el 9 son 45. Elegí qué hora marca el reloj."),
      items: [
        { reloj: [11, 15], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["11:15", "3:55", "3:11", "12:15"], ok: "11:15",
          conf: A("p05_c1", "La aguja grande en el 3 marca 15 minutos, un cuarto de hora. La pequeña pasó el 11: son las 11 y cuarto."), pista: PI_MIN },
        { reloj: [2, 30], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["2:30", "2:06", "6:10", "3:30"], ok: "2:30",
          conf: A("p05_c2", "La aguja grande en el 6 marca 30 minutos, media hora. La pequeña está entre el 2 y el 3: son las 2 y media."), pista: PI_MIN },
        { reloj: [8, 15], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["8:15", "8:03", "3:40", "9:15"], ok: "8:15",
          conf: A("p05_c3", "La aguja grande en el 3 marca 15 minutos. La pequeña pasó apenas el 8: son las 8 y cuarto."), pista: PI_MIN },
        { reloj: [12, 45], audio: Q_HORA, preg: "¿Qué hora marca el reloj?", opc: ["12:45", "12:09", "9:00", "1:45"], ok: "12:45",
          conf: A("p05_c4", "La aguja grande en el 9 marca 45 minutos, tres cuartos de hora. La pequeña ya casi llega al 1, pero todavía no: son las 12 y 45. ¡Falta un cuarto de hora para la 1!"), pista: PI_MIN }
      ] },

    /* 6 — Poner la hora */
    { tipo: "ponerHora", titulo: "Ponemos la hora",
      instr: A("p06_in", "¡Ahora vos ponés la hora! Primero tocá el número donde va la aguja grande, la de los minutos. Después tocá el número donde va la aguja pequeña, la de las horas."),
      pasoM: A("p06_pm", "Tocá el número donde va la aguja grande."),
      pasoH: A("p06_ph", "Ahora tocá el número donde va la aguja pequeña."),
      pistaM: A("p06_pim", "Recordá: en el 12 son 0 minutos, en el 3 son 15, en el 6 son 30 y en el 9 son 45."),
      pistaH: A("p06_pih", "La aguja pequeña va en el número de la hora. Si ya pasaron minutos, tocá igual el número de esa hora: el reloj la acomoda solo."),
      items: [
        { h: 9, m: 0, txt: "las 9 en punto", dig: "9:00", audio: A("p06_q1", "Poné el reloj a las 9 en punto."),
          conf: A("p06_c1", "¡Muy bien! Aguja grande en el 12 y pequeña en el 9: son las 9 en punto.") },
        { h: 3, m: 30, txt: "las 3 y media", dig: "3:30", audio: A("p06_q2", "Poné el reloj a las 3 y media."),
          conf: A("p06_c2", "¡Perfecto! La aguja grande en el 6 marca media hora, y la pequeña quedó entre el 3 y el 4: son las 3 y media.") },
        { h: 7, m: 15, txt: "las 7 y cuarto", dig: "7:15", audio: A("p06_q3", "Poné el reloj a las 7 y cuarto."),
          conf: A("p06_c3", "¡Genial! La aguja grande en el 3 marca 15 minutos, y la pequeña pasó apenas el 7: son las 7 y cuarto.") },
        { h: 10, m: 45, txt: "las 10 y 45", dig: "10:45", audio: A("p06_q4", "Poné el reloj a las 10 y 45."),
          conf: A("p06_c4", "¡Excelente! La aguja grande en el 9 marca 45 minutos, y la pequeña quedó cerca del 11: son las 10 y 45.") }
      ] },

    /* 7 — Formatos 12 y 24 horas (narración animada) */
    { tipo: "narracion", titulo: "Los relojes digitales", visual: "formatos",
      pasos: [
        { audio: A("p07_1", "Leamos lo que sucede con los relojes digitales. El día tiene 24 horas, pero el reloj común cuenta solo 12. Por eso, cada hora pasa dos veces por día: una a la mañana y otra a la tarde o a la noche."),
          apuntar: "fsol", destacar: "fsol", d12: "--:--", d24: "--:--", chip: "El día tiene 24 horas; el reloj común cuenta solo 12" },
        { audio: A("p07_2", "En el formato de 12 horas usamos a eme para la mañana, y pe eme para la tarde y la noche. Por ejemplo: 2 pe eme son las 2 de la tarde."),
          apuntar: "f12", destacar: "f12", d12: "2:00 p. m.", d24: "--:--", icono: "☀️", chip: "a. m.: mañana · p. m.: tarde y noche" },
        { audio: A("p07_3", "En el formato de 24 horas contamos todas las horas del día, desde las cero horas hasta las 23 y 59. Las 2 de la tarde son las 14 horas."),
          apuntar: "f24", destacar: "f24", d12: "2:00 p. m.", d24: "14:00", chip: "Formato de 24 horas: de 00:00 a 23:59" },
        { audio: A("p07_4", "Las horas de la mañana se escriben igual en los dos formatos. Las 7 y media de la mañana se escriben cero 7, 30."),
          apuntar: "f24", destacar: "f24", d12: "7:30 a. m.", d24: "07:30", icono: "🌅", chip: "Mañana (a. m.): se escribe igual" },
        { audio: A("p07_5", "Para pasar una hora de la tarde al formato de 24 horas, le sumamos 12. ¿Las 3 de la tarde? 3 más 12 es 15: son las 15 horas."),
          apuntar: "f24", destacar: "f24", d12: "3:00 p. m.", d24: "15:00", icono: "☀️", chip: "Tarde (p. m.): sumamos 12 → 3 + 12 = 15" },
        { audio: A("p07_6", "Y a la medianoche, las 12 a eme, en el formato de 24 horas se escribe cero cero, cero cero. ¡Ahí empieza un nuevo día!"),
          apuntar: "f24", destacar: "f24", d12: "12:00 a. m.", d24: "00:00", icono: "🌙", chip: "Medianoche: 12:00 a. m. = 00:00" }
      ] },

    /* 8 — Conversión de formatos */
    { tipo: "trivia", titulo: "De un formato al otro",
      instr: A("p08_in", "Pasá cada hora al otro formato. Recordá: a las horas de la tarde y de la noche, las pe eme, les sumamos 12."),
      items: [
        { digital: "3:00 p. m.", audio: Q_24, preg: "¿Cómo se escribe en el formato de 24 horas?", opc: ["15:00", "03:00", "13:00", "14:00"], ok: "15:00",
          conf: A("p08_c1", "Es de la tarde, pe eme, entonces sumamos 12: 3 más 12 es 15. Son las 15 horas."), pista: PI_PM },
        { digital: "7:30 a. m.", audio: Q_24, preg: "¿Cómo se escribe en el formato de 24 horas?", opc: ["07:30", "19:30", "17:30", "12:30"], ok: "07:30",
          conf: A("p08_c2", "Es de la mañana, a eme: se escribe igual. Son las 7 y 30."), pista: PI_PM },
        { digital: "9:00 p. m.", audio: Q_24, preg: "¿Cómo se escribe en el formato de 24 horas?", opc: ["21:00", "09:00", "19:00", "20:00"], ok: "21:00",
          conf: A("p08_c3", "Son las 9 de la noche: 9 más 12 es 21. Son las 21 horas."), pista: PI_PM },
        { digital: "18:00", audio: Q_12, preg: "¿Cómo se escribe en el formato de 12 horas?", opc: ["6:00 p. m.", "6:00 a. m.", "8:00 p. m.", "18:00 a. m."], ok: "6:00 p. m.",
          conf: A("p08_c4", "18 es mayor que 12, así que es de tarde: 18 menos 12 es 6. Son las 6 pe eme, las 6 de la tarde."), pista: PI_RESTA },
        { digital: "12:00 a. m.", audio: Q_24, preg: "¿Cómo se escribe en el formato de 24 horas?", opc: ["00:00", "12:00", "23:00", "01:00"], ok: "00:00",
          conf: A("p08_c5", "Las 12 a eme son la medianoche: en el formato de 24 horas se escribe cero cero, cero cero. ¡Empieza un nuevo día!"),
          pista: A("p08_pi5", "Ojo: las 12 a eme no son el mediodía, son la medianoche, cuando empieza el día.") }
      ] },

    /* 9 — Clasificar mañana / tarde y noche */
    { tipo: "clasificar", titulo: "¿Mañana o tarde?", img: "dia_noche.jpg",
      instr: A("p09_in", "¿Estas actividades son a la mañana, o a la tarde y la noche? Tocá una tarjeta y después el grupo donde va. Fijate en la hora."),
      cats: [
        { id: "am", txt: "☀️ Mañana (a. m.)", audio: A("p09_cam", "Mañana.") },
        { id: "pm", txt: "🌙 Tarde y noche (p. m.)", audio: A("p09_cpm", "Tarde y noche.") }
      ],
      cartas: [
        { txt: "⏰ Me despierto · 07:00", cat: "am", audio: A("p09_1", "Me despierto a las 7.") },
        { txt: "🥛 Desayuno · 08:00", cat: "am", audio: A("p09_2", "Desayuno a las 8.") },
        { txt: "📚 Lectura · 09:00", cat: "am", audio: A("p09_3", "Lectura a las 9.") },
        { txt: "⚽ Recreo · 10:15", cat: "am", audio: A("p09_4", "Recreo a las 10 y cuarto.") },
        { txt: "🌳 Paseo · 15:00", cat: "pm", audio: A("p09_5", "Paseo a las 15 horas.") },
        { txt: "🧁 Merienda · 17:30", cat: "pm", audio: A("p09_6", "Merienda a las 17 y 30.") },
        { txt: "🍝 Cena · 21:00", cat: "pm", audio: A("p09_7", "Cena a las 21 horas.") },
        { txt: "😴 A dormir · 22:00", cat: "pm", audio: A("p09_8", "A dormir a las 22 horas.") }
      ],
      pista: A("p09_pi", "Mirá la hora: si es mayor que 12, ya es de tarde o de noche."),
      fin: A("p09_fin", "¡Muy bien! De las 0 a las 11 es de mañana. Desde las 12, el mediodía, empieza la tarde, y después llega la noche.") },

    /* 10 — Duración (tabla) */
    { tipo: "duracion", titulo: "¿Cuánto dura?",
      instr: A("p10_in", "Esta es la agenda de un día. Mirá cuándo comienza y cuándo termina cada actividad, y elegí cuánto dura. Ayudate con los relojes."),
      opc: ["30 minutos", "1 hora", "15 minutos", "2 horas"], pista: PI_DUR,
      filas: [
        { act: "Desayuno", ini: [8, 0], fin: [8, 30], ok: "30 minutos", audio: A("p10_q1", "¿Cuánto dura el desayuno?"),
          conf: A("p10_c1", "De las 8 a las 8 y media pasan 30 minutos: media hora.") },
        { act: "Lectura", ini: [9, 0], fin: [10, 0], ok: "1 hora", audio: A("p10_q2", "¿Cuánto dura la lectura?"),
          conf: A("p10_c2", "De las 9 a las 10 pasa 1 hora: la aguja grande da una vuelta completa.") },
        { act: "Escritura", ini: [10, 30], fin: [11, 0], ok: "30 minutos", audio: A("p10_q3", "¿Cuánto dura la escritura?"),
          conf: A("p10_c3", "De las 10 y media a las 11 pasan 30 minutos: la aguja grande va del 6 al 12.") },
        { act: "Almuerzo", ini: [12, 0], fin: [1, 0], ok: "1 hora", audio: A("p10_q4", "¿Cuánto dura el almuerzo?"),
          conf: A("p10_c4", "De las 12 a la 1 pasa 1 hora. Aunque el número cambie de 12 a 1, la aguja grande dio una sola vuelta.") },
        { act: "Paseo", ini: [3, 0], fin: [3, 30], ok: "30 minutos", audio: A("p10_q5", "¿Cuánto dura el paseo?"),
          conf: A("p10_c5", "De las 3 a las 3 y media pasan 30 minutos: media hora.") }
      ] },

    /* 11 — Cumpleaños (situaciones del material) */
    { tipo: "trivia", titulo: "¡Vamos al cumpleaños!",
      fijo: { tipo: "invitacion", img: "cumple.jpg", dia: "sábado", hora: "de 16:00 a 19:00", lugar: "mi casa", olvides: "¡tu alegría!" },
      instr: A("p11_in", "Leé la invitación de cumpleaños y pensá cada situación. La fiesta es de las 16 a las 19 horas."),
      items: [
        { audio: A("p11_q1", "¿El cumpleaños es a la mañana o a la tarde?"), preg: "¿El cumpleaños es a la mañana o a la tarde?",
          opc: ["A la tarde", "A la mañana"], ok: "A la tarde",
          conf: A("p11_c1", "Es a la tarde: las 16 son las 4 de la tarde. Nos damos cuenta porque 16 es mayor que 12."), pista: PI_RESTA },
        { audio: A("p11_q2", "¿Cuánto durará la fiesta?"), preg: "¿Cuánto durará la fiesta?",
          opc: ["3 horas", "2 horas", "4 horas", "1 hora"], ok: "3 horas",
          conf: A("p11_c2", "De las 16 a las 19 pasan 3 horas: a las 17, una; a las 18, dos; y a las 19, tres."),
          pista: A("p11_p2", "Contá las horas desde las 16 hasta las 19, de una en una.") },
        { audio: A("p11_q3", "Mari llegó 10 minutos más tarde. ¿A qué hora llegó?"), preg: "Mari llegó 10 minutos más tarde. ¿A qué hora llegó?",
          opc: ["16:10", "15:50", "16:01", "17:00"], ok: "16:10",
          conf: A("p11_c3", "La fiesta empezó a las 16. Diez minutos más tarde son las 16 y 10."),
          pista: A("p11_p3", "Más tarde quiere decir después: sumale 10 minutos a las 16 horas.") },
        { audio: A("p11_q4", "El cumpleañero y su familia llegaron 15 minutos antes. ¿A qué hora llegaron?"), preg: "El cumpleañero y su familia llegaron 15 minutos antes. ¿A qué hora llegaron?",
          opc: ["15:45", "16:15", "15:15", "16:45"], ok: "15:45",
          conf: A("p11_c4", "Quince minutos antes de las 16 son las 15 y 45: llegaron un cuarto de hora antes."),
          pista: A("p11_p4", "Antes quiere decir que todavía no eran las 16. Restá 15 minutos.") },
        { audio: A("p11_q5", "Y se fueron media hora después de que terminó la fiesta. ¿A qué hora se fueron?"), preg: "Y se fueron media hora después de que terminó la fiesta. ¿A qué hora se fueron?",
          opc: ["19:30", "18:30", "19:15", "20:00"], ok: "19:30",
          conf: A("p11_c5", "La fiesta terminó a las 19. Media hora más tarde son las 19 y 30."),
          pista: A("p11_p5", "La fiesta termina a las 19. Media hora son 30 minutos.") },
        { audio: A("p11_q6", "Si llegás a las 15 horas, ¿el cumpleaños ya empezó?"), preg: "Si llegás a las 15 horas, ¿el cumpleaños ya empezó?",
          opc: ["No, todavía falta 1 hora", "Sí, ya empezó"], ok: "No, todavía falta 1 hora",
          conf: A("p11_c6", "Todavía no: el cumpleaños empieza a las 16. Si llegás a las 15, falta 1 hora.") },
        { audio: A("p11_q7", "Si llegás puntual y te vas a las 18 horas, ¿cuántas horas estuviste?"), preg: "Si llegás puntual y te vas a las 18 horas, ¿cuántas horas estuviste?",
          opc: ["2 horas", "3 horas", "18 horas", "1 hora"], ok: "2 horas",
          conf: A("p11_c7", "Llegaste a las 16 y te fuiste a las 18: estuviste 2 horas."),
          pista: A("p11_p7", "Contá desde que empieza la fiesta, a las 16, hasta las 18.") }
      ] },

    /* 12 — Problemas con el reloj (animación de agujas) */
    { tipo: "trivia", titulo: "Problemas con el reloj",
      instr: A("p12_in", "Resolvé estos problemas. Mirá el reloj: te ayuda a pensar. Cuando aciertes, vas a ver cómo se mueven las agujas."),
      items: [
        { reloj: [6, 0], animarA: [5, 40], audio: A("p12_q1", "La reunión terminó a las 6 y duró 20 minutos. ¿A qué hora comenzó?"),
          preg: "La reunión terminó a las 6:00 y duró 20 minutos. ¿A qué hora comenzó?", opc: ["5:40", "6:20", "5:20", "6:40"], ok: "5:40",
          conf: A("p12_c1", "Volvemos 20 minutos para atrás desde las 6: la aguja grande retrocede del 12 al 8. La reunión comenzó a las 5 y 40."),
          pista: A("p12_p1", "Si terminó a las 6, empezó antes. Hacé retroceder la aguja grande 20 minutos: son 4 números.") },
        { reloj: [10, 0], animarA: [10, 15], audio: A("p12_q2", "El recreo empieza a las 10 y dura 15 minutos. ¿A qué hora termina?"),
          preg: "El recreo empieza a las 10:00 y dura 15 minutos. ¿A qué hora termina?", opc: ["10:15", "10:30", "9:45", "11:15"], ok: "10:15",
          conf: A("p12_c2", "Desde las 10, la aguja grande avanza un cuarto de hora, del 12 al 3. El recreo termina a las 10 y cuarto."), pista: PI_MIN },
        { reloj: [9, 0], animarA: [9, 45], audio: A("p12_q3", "La clase de Educación Física empezó a las 9 y terminó a las 9 y 45. ¿Cuánto duró?"),
          preg: "La clase de Educación Física empezó a las 9:00 y terminó a las 9:45. ¿Cuánto duró?", opc: ["45 minutos", "1 hora", "30 minutos", "9 minutos"], ok: "45 minutos",
          conf: A("p12_c3", "La aguja grande fue del 12 al 9: son 45 minutos, tres cuartos de hora."), pista: PI_MIN },
        { reloj: [2, 0], animarA: [3, 30], audio: A("p12_q4", "Juan empezó a jugar a las 2 y jugó una hora y media. ¿A qué hora terminó?"),
          preg: "Juan empezó a jugar a las 2:00 y jugó 1 hora y media. ¿A qué hora terminó?", opc: ["3:30", "2:30", "3:00", "4:30"], ok: "3:30",
          conf: A("p12_c4", "Una hora después de las 2 son las 3, y media hora más, las 3 y media."),
          pista: A("p12_p4", "Primero sumá 1 hora, y después media hora más.") }
      ] },

    /* 13 — Verdadero o falso */
    { tipo: "trivia", vf: true, titulo: "¿Verdadero o falso?", img: "vf.jpg",
      instr: A("p13_in", "Leé cada frase y decidí si es verdadera o falsa."),
      items: [
        { audio: A("p13_q1", "La aguja grande del reloj indica las horas."), preg: "La aguja grande del reloj indica las horas.", v: false,
          conf: A("p13_c1", "Es falso: la aguja grande indica los minutos, y la pequeña, las horas.") },
        { audio: A("p13_q2", "Media hora tiene 30 minutos."), preg: "Media hora tiene 30 minutos.", v: true,
          conf: A("p13_c2", "Es verdadero: media hora es la mitad de 60, o sea, 30 minutos.") },
        { audio: A("p13_q3", "Un cuarto de hora tiene 25 minutos."), preg: "Un cuarto de hora tiene 25 minutos.", v: false,
          conf: A("p13_c3", "Es falso: un cuarto de hora tiene 15 minutos.") },
        { audio: A("p13_q4", "Las 14 horas son las 2 de la tarde."), preg: "Las 14:00 son las 2 de la tarde.", v: true,
          conf: A("p13_c4", "Es verdadero: 14 menos 12 es 2. Son las 2 de la tarde.") },
        { audio: A("p13_q5", "Las 7 y 30 a eme son de noche."), preg: "Las 7:30 a. m. son de noche.", v: false,
          conf: A("p13_c5", "Es falso: a eme es de la mañana. Son las 7 y media de la mañana.") },
        { audio: A("p13_q6", "Si la aguja grande está en el 6, pasó media hora desde la hora en punto."), preg: "Si la aguja grande está en el 6, pasó media hora desde la hora en punto.", v: true,
          conf: A("p13_c6", "Es verdadero: en el 6, la aguja grande marca 30 minutos, media hora.") }
      ] },

    /* 14 — Sopa de letras */
    { tipo: "sopa", titulo: "Sopa de letras del reloj", n: 9,
      instr: A("p14_in", "Buscá en la sopa de letras las palabras del reloj. Tocá la primera letra y después la última de cada palabra."),
      palabras: [
        { w: "RELOJ", audio: A("p14_w1", "Reloj.") },
        { w: "HORA", audio: A("p14_w2", "Hora.") },
        { w: "MINUTOS", audio: A("p14_w3", "Minutos.") },
        { w: "AGUJA", audio: A("p14_w4", "Aguja.") },
        { w: "CUARTO", audio: A("p14_w5", "Cuarto.") },
        { w: "MEDIA", audio: A("p14_w6", "Media.") },
        { w: "TARDE", audio: A("p14_w7", "Tarde.") }
      ],
      fin: A("p14_fin", "¡Encontraste todas las palabras del reloj!") },

    /* 15 — Mi propia invitación */
    { tipo: "invitacion", titulo: "Mi propia invitación", img: "invitacion.jpg",
      instr: A("p15_in", "¡Ahora hacé tu propia invitación de cumpleaños! Escribí el día, la hora en el formato de 24 horas, el lugar y lo que tus invitados no deben olvidar. Después, copiala en tu cuaderno."),
      lista: A("p15_ok", "¡Qué linda invitación! No te olvides de copiarla en tu cuaderno.") },

    { tipo: "cierre",
      audio: A("p99_fin", "¡Terminaste! Ahora sabés leer el reloj, calcular cuánto dura una actividad y pasar la hora de un formato a otro. ¡Muy bien!") }
  ]
};
