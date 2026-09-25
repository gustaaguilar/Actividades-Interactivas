/* ============================================================
   DETECTIVES DEL CUADRO DE NÚMEROS — Matemática · 1.er grado
   Basado en la Ficha N.º 1 "Número" de Habilidades Lógico-Matemáticas
   DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

window.DATOS = {
  meta: {
    titulo: 'Detectives del cuadro de números',
    subtitulo: 'Ficha 1: Número',
    area: '🔢 Matemática · 1.er grado',
    fuente: 'Basado en la Ficha N.º 1 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar',
    mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg',
    fotoMini: 'profe_mini.jpg',
    frase: 'Menos prisa, más vida 🧉🫂',
    puntosPorAcierto: 10,
    revision: true   // true = flechas ‹ › de revisión visibles
  },

  /* Cuadro de números usado en todo el paquete: 0 a 59, filas de 10 */
  cuadro: { desde: 0, hasta: 59, columnas: 10 },

  /* ---------- TEXTOS DE AUDIO (clave → texto) ----------
     El script de Colab lee este bloque y genera audio/<clave>.mp3 */
  audios: {
    portada: '¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar el cuadro de números: vamos a adivinar números con pistas, descubrir números escondidos y completar el cuadro. Tocá Comenzar.',

    /* Narración 1 — el cuadro */
    c1_1: 'Este es el cuadro de números. Los números están ordenados, del cero al cincuenta y nueve.',
    c1_2: 'Mirá esta fila. Todos los números empiezan con dos: veinte, veintiuno, veintidós, veintitrés, y así hasta el veintinueve.',
    c1_3: 'Ahora mirá esta columna. Todos los números terminan en ocho: ocho, dieciocho, veintiocho, treinta y ocho y cuarenta y ocho. Es la columna del ocho.',
    c1_4: 'Si avanzás un casillero hacia la derecha, el número aumenta uno. Del treinta y cuatro pasamos al treinta y cinco.',
    c1_5: 'Si bajás un casillero, el número aumenta diez. Del treinta y cuatro pasamos al cuarenta y cuatro.',

    /* Narración 2 — palabras de las pistas */
    c2_1: 'Los detectives usan pistas. Vamos a aprender tres palabras importantes.',
    c2_2: 'Mayor que diez quiere decir que el número viene después del diez. Son todos los números pintados.',
    c2_3: 'Menor que treinta quiere decir que el número viene antes del treinta.',
    c2_4: 'Entre veinte y treinta son los números que están en el medio: del veintiuno al veintinueve.',

    /* Práctica 1 — adivinar tocando el cuadro */
    ad_instr: 'Escuchá las pistas de Lola. Después, tocá en el cuadro el número escondido.',
    ad_err: 'Ese no es. Volvé a mirar las pistas.',
    ad1_p1: 'Pista uno: es mayor que diez.',
    ad1_p2: 'Pista dos: es menor que veinte.',
    ad1_p3: 'Pista tres: está en la columna del cinco.',
    ad1_ok: '¡Lo encontraste! Es el quince: está entre el diez y el veinte, y termina en cinco.',
    ad2_p1: 'Pista uno: está entre cuarenta y cincuenta.',
    ad2_p2: 'Pista dos: está en la columna del dos.',
    ad2_ok: '¡Muy bien! Es el cuarenta y dos: empieza con cuatro y termina en dos.',
    ad3_p1: 'Pista uno: está en la fila del veinte.',
    ad3_p2: 'Pista dos: está en la columna del siete.',
    ad3_ok: '¡Excelente! Es el veintisiete: en la fila del veinte y en la columna del siete.',

    /* Narración 3 — saltos */
    c3_1: 'En una fila de números ordenados, los números pueden ir saltando.',
    c3_2: 'De uno en uno: veintiuno, veintidós, veintitrés, veinticuatro. Vamos avanzando de a un casillero.',
    c3_3: 'De diez en diez: diez, veinte, treinta, cuarenta. Vamos bajando por la columna.',
    c3_4: 'De cinco en cinco: cinco, diez, quince, veinte, veinticinco. Para saber qué número falta, fijate cuánto salta.',

    /* Práctica 2 — el número que falta */
    fa_instr: 'Los números están ordenados, pero uno se escondió. ¿Cuál es el número que falta? Tocá la respuesta.',
    fa_err: 'No es ese. Fijate de a cuánto van saltando los números.',
    fa1_ok: '¡Sí! Van de uno en uno: veintiuno, veintidós, veintitrés, veinticuatro.',
    fa2_ok: '¡Muy bien! Van de diez en diez: diez, veinte, treinta, cuarenta.',
    fa3_ok: '¡Genial! Van de cinco en cinco: quince, veinte, veinticinco, treinta.',
    fa4_ok: '¡Perfecto! Van de dos en dos: treinta y dos, treinta y cuatro, treinta y seis, treinta y ocho.',

    /* Práctica 3 y 4 — completar el cuadro */
    co_instr: 'Faltan números en el cuadro. Tocá una tarjeta y después tocá el casillero donde va.',
    co_err: 'Ahí no va. Fijate en qué fila y en qué columna tiene que estar.',
    co1_ok: '¡Cuadro completo! Cada número quedó en su fila y en su columna.',
    co2_ok: '¡Muy bien, detective! Completaste todo el cuadro.',
    n_12: 'doce', n_14: 'catorce', n_23: 'veintitrés', n_25: 'veinticinco',
    n_32: 'treinta y dos', n_40: 'cuarenta', n_43: 'cuarenta y tres', n_51: 'cincuenta y uno', n_54: 'cincuenta y cuatro',
    n_45: 'cuarenta y cinco', n_24: 'veinticuatro', n_36: 'treinta y seis', n_46: 'cuarenta y seis', n_27: 'veintisiete',

    /* Práctica 5 — leer el número */
    le_instr: 'Lola escribió un número con palabras. Leelo o escuchalo, y tocá cómo se escribe con cifras.',
    le_err: 'Ese no es. Escuchá de nuevo cómo se dice el número.',
    le1: 'Veintisiete.', le1_ok: '¡Sí! Veintisiete se escribe con un dos y un siete: dos, siete.',
    le2: 'Cuarenta y uno.', le2_ok: '¡Muy bien! Cuarenta y uno se escribe con un cuatro y un uno.',
    le3: 'Dieciséis.', le3_ok: '¡Correcto! Dieciséis se escribe con un uno y un seis.',
    le4: 'Cincuenta y dos.', le4_ok: '¡Excelente! Cincuenta y dos se escribe con un cinco y un dos.',

    /* Desafío oficial */
    de_1: '¡Ya sos un detective del cuadro de números!',
    de_2: 'Ahora llega el desafío: son las cuatro tareas de la ficha de la escuela.',
    de_3: 'Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.',

    t1_instr: 'Tarea uno. Usando el cuadro de números, jugamos a adivinar un número. Escuchá las pistas y elegí la respuesta.',
    t1_p1: 'Es mayor que veinte.',
    t1_p2: 'Es menor que cincuenta.',
    t1_p3: 'Está entre treinta y cuarenta.',
    t1_p4: 'Está en la columna del ocho.',
    t1_ok: '¡Correcto! Es el treinta y ocho: está entre treinta y cuarenta, y en la columna del ocho.',
    t_err: 'Esa no es la respuesta. Pensalo otra vez.',

    t2_instr: 'Tarea dos. Los siguientes números se encuentran ordenados. ¿Cuál es el número que falta?',
    t2_ok: '¡Correcto! Es el treinta y nueve. Los números van de cinco en cinco: veintinueve, treinta y cuatro, treinta y nueve, cuarenta y cuatro.',

    t3_instr: 'Tarea tres. Ubicá los números en el cuadro. Tocá una tarjeta y después el casillero donde va.',
    t3_ok: '¡Correcto! Todos los números quedaron en su lugar.',

    t4_instr: 'Tarea cuatro. Señalá el número treinta y cuatro.',
    t4: 'Treinta y cuatro.',
    t4_ok: '¡Correcto! Treinta y cuatro se escribe con un tres y un cuatro.',

    cierre: '¡Terminaste la investigación, detective! Mirá cuántos aciertos lograste. Si querés, podés volver a jugar.'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Narración: el cuadro de números */
    {
      tipo: 'narraCuadro', titulo: '🔎 EL CUADRO DE NÚMEROS',
      pasos: [
        { audio: 'c1_1', texto: 'ESTE ES EL <b>CUADRO DE NÚMEROS</b>. VA DEL 0 AL 59.', resaltar: [] },
        { audio: 'c1_2', texto: 'EN CADA <b>FILA</b>, LOS NÚMEROS EMPIEZAN IGUAL.', fila: 20, apuntar: 20 },
        { audio: 'c1_3', texto: 'EN CADA <b>COLUMNA</b>, LOS NÚMEROS TERMINAN IGUAL.', columna: 8, apuntar: 8 },
        { audio: 'c1_4', texto: 'HACIA LA DERECHA: <b>UNO MÁS</b>. 34 ➜ 35', resaltar: [34, 35], apuntar: 35 },
        { audio: 'c1_5', texto: 'HACIA ABAJO: <b>DIEZ MÁS</b>. 34 ➜ 44', resaltar: [34, 44], apuntar: 44 }
      ]
    },

    /* 2 — Narración: palabras de las pistas */
    {
      tipo: 'narraCuadro', titulo: '🔎 LAS PISTAS DEL DETECTIVE',
      pasos: [
        { audio: 'c2_1', texto: 'TRES PALABRAS PARA LAS PISTAS: <b>MAYOR</b>, <b>MENOR</b> Y <b>ENTRE</b>.', resaltar: [] },
        { audio: 'c2_2', texto: '<b>MAYOR QUE 10</b>: VIENE DESPUÉS DEL 10.', rango: [11, 59], apuntar: 11 },
        { audio: 'c2_3', texto: '<b>MENOR QUE 30</b>: VIENE ANTES DEL 30.', rango: [0, 29], apuntar: 29 },
        { audio: 'c2_4', texto: '<b>ENTRE 20 Y 30</b>: DEL 21 AL 29.', rango: [21, 29], apuntar: 25 }
      ]
    },

    /* 3 — Práctica: adivinar tocando el cuadro */
    {
      tipo: 'adivina', titulo: '🦉 ¿QUÉ NÚMERO ES?', img: 'img/lechuza.png', instr: 'ad_instr', err: 'ad_err',
      rondas: [
        { id: 'a1', respuesta: 15, ok: 'ad1_ok', pistas: [
          { audio: 'ad1_p1', texto: 'ES MAYOR QUE 10.' }, { audio: 'ad1_p2', texto: 'ES MENOR QUE 20.' }, { audio: 'ad1_p3', texto: 'ESTÁ EN LA COLUMNA DEL 5.' }] },
        { id: 'a2', respuesta: 42, ok: 'ad2_ok', pistas: [
          { audio: 'ad2_p1', texto: 'ESTÁ ENTRE 40 Y 50.' }, { audio: 'ad2_p2', texto: 'ESTÁ EN LA COLUMNA DEL 2.' }] },
        { id: 'a3', respuesta: 27, ok: 'ad3_ok', pistas: [
          { audio: 'ad3_p1', texto: 'ESTÁ EN LA FILA DEL 20.' }, { audio: 'ad3_p2', texto: 'ESTÁ EN LA COLUMNA DEL 7.' }] }
      ]
    },

    /* 4 — Narración: saltos */
    {
      tipo: 'narraCuadro', titulo: '🔎 NÚMEROS QUE SALTAN',
      pasos: [
        { audio: 'c3_1', texto: 'LOS NÚMEROS ORDENADOS PUEDEN IR <b>SALTANDO</b>.', resaltar: [] },
        { audio: 'c3_2', texto: 'DE <b>1 EN 1</b>: 21, 22, 23, 24', resaltar: [21, 22, 23, 24], apuntar: 24 },
        { audio: 'c3_3', texto: 'DE <b>10 EN 10</b>: 10, 20, 30, 40', resaltar: [10, 20, 30, 40], apuntar: 40 },
        { audio: 'c3_4', texto: 'DE <b>5 EN 5</b>: 5, 10, 15, 20, 25', resaltar: [5, 10, 15, 20, 25], apuntar: 25 }
      ]
    },

    /* 5 — Práctica: el número que falta */
    {
      tipo: 'opcion', titulo: '🧩 EL NÚMERO QUE FALTA', img: 'img/lechuza.png', instr: 'fa_instr', err: 'fa_err',
      rondas: [
        { id: 'f1', serie: [21, 22, null, 24], opciones: [23, 25, 32, 20], respuesta: 23, ok: 'fa1_ok' },
        { id: 'f2', serie: [10, 20, null, 40], opciones: [30, 25, 21, 50], respuesta: 30, ok: 'fa2_ok' },
        { id: 'f3', serie: [15, 20, null, 30], opciones: [25, 21, 35, 22], respuesta: 25, ok: 'fa3_ok' },
        { id: 'f4', serie: [32, 34, null, 38], opciones: [36, 35, 33, 37], respuesta: 36, ok: 'fa4_ok' }
      ]
    },

    /* 6 — Práctica: completar el cuadro (1) */
    {
      tipo: 'completar', titulo: '🗂️ COMPLETÁ EL CUADRO', instr: 'co_instr', err: 'co_err', ok: 'co1_ok',
      filas: [[11, null, 13, null, 15], [21, 22, null, 24, null]],
      tarjetas: [12, 14, 23, 25]
    },

    /* 7 — Práctica: completar el cuadro (2) */
    {
      tipo: 'completar', titulo: '🗂️ COMPLETÁ EL CUADRO', instr: 'co_instr', err: 'co_err', ok: 'co2_ok',
      filas: [[30, 31, null, 33, 34], [null, 41, 42, null, 44], [50, null, 52, 53, null]],
      tarjetas: [32, 40, 43, 51, 54]
    },

    /* 8 — Práctica: leer el número */
    {
      tipo: 'opcion', titulo: '📖 ¿CÓMO SE ESCRIBE?', img: 'img/numeros.jpg', instr: 'le_instr', err: 'le_err',
      rondas: [
        { id: 'l1', palabra: 'VEINTISIETE', audio: 'le1', opciones: [27, 72, 207, 20], respuesta: 27, ok: 'le1_ok' },
        { id: 'l2', palabra: 'CUARENTA Y UNO', audio: 'le2', opciones: [41, 14, 401, 40], respuesta: 41, ok: 'le2_ok' },
        { id: 'l3', palabra: 'DIECISÉIS', audio: 'le3', opciones: [16, 61, 106, 10], respuesta: 16, ok: 'le3_ok' },
        { id: 'l4', palabra: 'CINCUENTA Y DOS', audio: 'le4', opciones: [52, 25, 502, 50], respuesta: 52, ok: 'le4_ok' }
      ]
    },

    /* 9 — Presentación del desafío */
    {
      tipo: 'pasos', titulo: '🏆 ¡LLEGÓ EL DESAFÍO!', img: 'img/desafio.jpg',
      pasos: [
        { audio: 'de_1', texto: '¡YA SOS UN <b>DETECTIVE</b> DEL CUADRO DE NÚMEROS!' },
        { audio: 'de_2', texto: 'AHORA, LAS <b>4 TAREAS</b> DE LA FICHA DE LA ESCUELA.' },
        { audio: 'de_3', texto: 'PENSÁ BIEN: <b>CADA RESPUESTA CUENTA UNA SOLA VEZ</b>.' }
      ]
    },

    /* 10 — Tarea 1 oficial */
    {
      tipo: 'opcion', titulo: '🏆 TAREA 1', img: 'img/lechuza.png', instr: 't1_instr', err: 't_err', conCuadro: true,
      rondas: [
        { id: 't1', pistas: [
            { audio: 't1_p1', texto: 'ES MAYOR QUE VEINTE.' }, { audio: 't1_p2', texto: 'ES MENOR QUE CINCUENTA.' },
            { audio: 't1_p3', texto: 'ESTÁ ENTRE TREINTA Y CUARENTA.' }, { audio: 't1_p4', texto: 'ESTÁ EN LA COLUMNA DEL 8.' }],
          opciones: [28, 31, 38, 48], respuesta: 38, ok: 't1_ok' }
      ]
    },

    /* 11 — Tarea 2 oficial */
    {
      tipo: 'opcion', titulo: '🏆 TAREA 2', img: 'img/lechuza.png', instr: 't2_instr', err: 't_err',
      rondas: [{ id: 't2', serie: [29, 34, null, 44], opciones: [35, 43, 39, 38], respuesta: 39, ok: 't2_ok' }]
    },

    /* 12 — Tarea 3 oficial (el 33 se muestra ya escrito: la ficha deja ese casillero vacío sin tarjeta) */
    {
      tipo: 'completar', titulo: '🏆 TAREA 3', instr: 't3_instr', err: 't_err', ok: 't3_ok',
      filas: [[23, null, 25, 26, null], [33, 34, 35, null, 37], [43, 44, null, null, 47]],
      tarjetas: [45, 24, 36, 46, 27]
    },

    /* 13 — Tarea 4 oficial */
    {
      tipo: 'opcion', titulo: '🏆 TAREA 4', img: 'img/numeros.jpg', instr: 't4_instr', err: 't_err',
      rondas: [{ id: 't4', palabra: 'TREINTA Y CUATRO', audio: 't4', opciones: [4, 30, 34, 304], respuesta: 34, ok: 't4_ok' }]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
