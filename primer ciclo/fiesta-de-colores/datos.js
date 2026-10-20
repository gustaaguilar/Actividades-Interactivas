/* ============================================================
   UNA FIESTA DE COLORES — Artes Visuales · 1.er grado
   Colores primarios y sus mezclas espontáneas
   Basado en la Ficha Viajera de Artes Visuales (Propuesta breve 1)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  rojo: '#e8262f', azul: '#1f64d6', amarillo: '#ffd21f',
  naranja: '#ff8a1e', verde: '#2fae4a', violeta: '#8a3fb8'
};

const PALETAS = {
  primarios: [COL.rojo, COL.azul, COL.amarillo],
  fiesta: [COL.rojo, COL.azul, COL.amarillo, COL.naranja, COL.verde, COL.violeta],
  mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff']
};

/* helpers para armar escenas */
const mancha = (cx, cy, size, color, extra) => Object.assign({ tipo: 'figura', forma: 'mancha', cx, cy, size, fill: color, sinDetalles: true }, extra || {});
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });

/* una fila "A + B = C" de la narración de mezclas */
function filaMezcla(id, y, a, b, c, na, nb, nc) {
  return { id, tipo: 'grupo', oculto: true, capas: [
    mancha(58, y, 62, a), txt(58, y + 41, na, 15),
    txt(112, y + 8, '+', 34),
    mancha(166, y, 62, b), txt(166, y + 41, nb, 15),
    txt(222, y + 8, '=', 34),
    { id: id + 'r', tipo: 'grupo', capas: [mancha(300, y, 80, c), txt(300, y + 47, nc, 17)] }
  ] };
}

window.DATOS = {
  meta: {
    titulo: 'Una fiesta de colores',
    subtitulo: 'Los colores primarios y sus mezclas',
    area: '🎨 Artes Visuales · 1.er grado',
    grado: 'Artes Visuales · 1.er grado',
    fuente: 'Basado en la Ficha Viajera de Artes Visuales · Propuesta breve 1',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar',
    mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg',
    fotoMini: 'profe_mini.jpg',
    frase: 'Menos prisa, más vida 🧉🫂',
    youtube: 'https://www.youtube.com/@ProfeGustavoAguilar?sub_confirmation=1',
    puntosPorAcierto: 10,
    revision: false   // true = muestra las flechas ‹ › de revisión
  },

  colores: COL,
  paletas: PALETAS,

  /* ---------- TEXTOS DE AUDIO (clave → texto) ----------
     El script de Colab lee este bloque y genera audio/<clave>.mp3 */
  audios: {
    portada: '¡Hola! Bienvenidos a Una fiesta de colores. Vamos a conocer los colores primarios, a mezclarlos para descubrir colores nuevos, y al final vas a hacer tu propio dibujo. Tocá Comenzar.',

    /* nombres de colores (se usan en varias pantallas) */
    c_rojo: 'Rojo.',
    c_azul: 'Azul.',
    c_amarillo: 'Amarillo.',
    c_naranja: 'Naranja.',
    c_verde: 'Verde.',
    c_violeta: 'Violeta.',

    /* 1 — colores primarios */
    pr_1: 'Hay tres colores muy especiales. Se llaman colores primarios.',
    pr_2: 'El primero es el rojo, como una frutilla.',
    pr_3: 'El segundo es el azul, como el cielo de noche.',
    pr_4: 'El tercero es el amarillo, como el sol.',
    pr_5: 'Rojo, azul y amarillo son los colores primarios. No se forman mezclando otros colores, pero con ellos podemos formar muchos colores nuevos.',

    /* 2 — ¿es primario? */
    cp_instr: 'Mirá cada mancha de color y escuchá su nombre. ¿Es un color primario? Tocá Sí o No.',
    cp_err: 'Mirá otra vez. Recordá: los colores primarios son solo tres.',
    cp_rojo: '¡Sí! El rojo es un color primario.',
    cp_azul: '¡Muy bien! El azul es un color primario.',
    cp_amarillo: '¡Correcto! El amarillo es un color primario.',
    cp_naranja: '¡Bien! El naranja no es primario. Se forma mezclando rojo y amarillo.',
    cp_verde: '¡Exacto! El verde no es primario. Se forma mezclando azul y amarillo.',
    cp_violeta: '¡Muy bien! El violeta no es primario. Se forma mezclando rojo y azul.',

    /* 3 — mezclas */
    me_n1: 'Ahora, la magia. Cuando mezclamos dos colores primarios, aparece un color nuevo.',
    me_n2: 'Rojo más amarillo forman el naranja.',
    me_n3: 'Azul más amarillo forman el verde.',
    me_n4: 'Rojo más azul forman el violeta.',
    me_n5: 'Naranja, verde y violeta son colores que descubrimos mezclando. ¡Vamos a probar!',

    /* 4 — laboratorio de mezclas */
    lab_instr: 'Este es el laboratorio de mezclas. Tocá dos frascos de pintura para mezclarlos en el bol.',
    lab_1: 'Queremos pintar una naranja. ¿Qué dos colores mezclamos?',
    lab_1ok: '¡Lo lograste! Rojo y amarillo forman el naranja, el color de la naranja.',
    lab_2: 'Queremos pintar un árbol. ¿Qué dos colores mezclamos para el verde?',
    lab_2ok: '¡Genial! Azul y amarillo forman el verde, como las hojas del árbol.',
    lab_3: 'Queremos pintar unas uvas. ¿Qué dos colores mezclamos para el violeta?',
    lab_3ok: '¡Muy bien! Rojo y azul forman el violeta, el color de las uvas.',
    lab_err: 'Salió otro color. Mirá cuál color buscamos y probá con otros dos frascos.',

    /* 5 — ¿qué color sale? */
    qs_instr: 'Mirá los dos colores que se mezclan. ¿Qué color sale? Tocá la mancha correcta.',
    qs_err: 'Ese no es. Pensá otra vez en la mezcla.',
    qs_1: 'Azul más amarillo. ¿Qué color sale?',
    qs_1ok: '¡Sí! Azul y amarillo forman el verde.',
    qs_2: 'Rojo más azul. ¿Qué color sale?',
    qs_2ok: '¡Muy bien! Rojo y azul forman el violeta.',
    qs_3: 'Rojo más amarillo. ¿Qué color sale?',
    qs_3ok: '¡Excelente! Rojo y amarillo forman el naranja.',

    /* 6 — formas para dibujar */
    fo_1: 'En tu fiesta de colores vas a dibujar muchas formas. ¡Grandes y chiquitas, y repetidas muchas veces!',
    fo_2: 'Manchas: formas sin borde preciso, como cuando cae una gota de pintura.',
    fo_3: 'Líneas: rectas, onduladas como las olas, o en zigzag como un rayo.',
    fo_4: 'Puntos: muchos puntitos chiquitos.',
    fo_5: 'Círculos: redondos, como un aro.',
    fo_6: 'Y otras formas que se te ocurran: estrellas, corazones, triángulos, nubes…',

    /* 7 — ¿qué es? */
    qe_instr: 'Mirá el dibujo. ¿Es una mancha, una línea, puntos o un círculo? Tocá la respuesta.',
    qe_err: 'Mirá bien la forma y probá otra vez.',
    qe_1: '¡Sí! Es una mancha, sin borde preciso, como una gota de pintura.',
    qe_2: '¡Muy bien! Es una mancha chiquita. Las manchas pueden ser de muchos tamaños.',
    qe_3: '¡Correcto! Es una línea ondulada, como las olas del mar.',
    qe_4: '¡Exacto! Es una línea en zigzag, como un rayo.',
    qe_5: '¡Bien! Son puntos, muchos puntitos chiquitos.',
    qe_6: '¡Sí! Son puntos de distintos colores.',
    qe_7: '¡Muy bien! Es un círculo, redondo como un aro.',
    qe_8: '¡Correcto! Es un círculo grande.',

    /* 8 — taller */
    ta_instr: '¡Llegó tu fiesta de colores! Empezás solo con los tres colores primarios. Elegí una herramienta y dibujá en el cuadro manchas, líneas, puntos, círculos y otras formas. Tocá el bol de mezclar para descubrir colores nuevos.',
    t_mancha: 'Manchas.',
    t_linea: 'Líneas. Pueden ser rectas, onduladas o en zigzag.',
    t_punto: 'Puntos.',
    t_circulo: 'Círculos.',
    t_sello: 'Otras formas. Elegí estrella, corazón, triángulo o nube, y tocá el cuadro.',
    t_balde: 'Balde de pintura. Tocá adentro de una forma para pintarla.',
    t_goma: 'Goma.',
    t_deshacer: 'Deshacer.',
    t_borrar: 'Borrar todo.',
    tam_1: 'Chico.',
    tam_2: 'Mediano.',
    tam_3: 'Grande.',
    mz_abrir: 'Elegí dos colores para mezclar.',
    mz_naranja: '¡Descubriste el naranja! Rojo más amarillo.',
    mz_verde: '¡Descubriste el verde! Azul más amarillo.',
    mz_violeta: '¡Descubriste el violeta! Rojo más azul.',
    mz_nuevo: '¡Descubriste un color nuevo! Ya está en tu paleta.',
    mz_ya: 'Ese color ya está en tu paleta.',
    p_guardar: '¡Tu fiesta de colores quedó guardada!',

    /* 9 — en papel */
    pp_1: 'Ahora hacelo en papel. Paso uno: elegí los tres colores primarios: rojo, azul y amarillo.',
    pp_2: 'Paso dos: dibujá manchas, líneas, puntos, círculos y otras formas que se te ocurran. Hacelas de distintos tamaños y repetilas muchas veces.',
    pp_3: 'Paso tres: pintá algunas formas con colores primarios, y otras mezclando colores para descubrir colores nuevos.',
    pp_4: 'Paso cuatro: mirá tu dibujo y, si querés, agregale detalles.',
    pp_5: 'Necesitás una hoja y témperas, crayones, fibras o lápices de colores. Si tenés todos, ¡podés usarlos todos!',

    /* 10 — foto */
    fo_instr: 'Cuando termines tu dibujo en papel, pulsá el botón Sacar foto para fotografiarlo. O también podés elegir el dibujo que guardaste en el taller, pulsando el botón Elegir de la galería.',
    fo_boton: 'Sacar una foto.',
    fo_ok: '¡Qué linda fiesta de colores! Tocá Guardar para tenerla en tu celular.',

    /* 11 — autoevaluación */
    ae_instr: 'Mirá tu dibujo y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Usé los tres colores primarios: rojo, azul y amarillo?',
    ae_1si: '¡Muy bien! Usaste los tres colores primarios.',
    ae_1no: 'Podés agregar el color que te falta.',
    ae_2: '¿Mezclé colores y descubrí un color nuevo?',
    ae_2si: '¡Genial! Mezclando descubriste colores nuevos.',
    ae_2no: 'Probá mezclar dos colores primarios en una parte del dibujo.',
    ae_3: '¿Dibujé manchas, líneas, puntos y círculos?',
    ae_3si: '¡Excelente! Tu dibujo tiene muchas formas distintas.',
    ae_3no: 'Podés sumar la forma que te falta.',
    ae_4: '¿Hice formas grandes y chiquitas?',
    ae_4si: '¡Muy bien! Los distintos tamaños hacen tu fiesta más divertida.',
    ae_4no: 'Probá agregar algunas formas más grandes o más chiquitas.',
    ae_fin: 'Gracias por mirar tu dibujo con atención. Mirar lo que hicimos también es parte del arte.',

    /* 12 — en familia */
    fa_1: 'Mostrale tu dibujo a tu familia y contales: ¿qué colores usaste?',
    fa_2: '¿Qué color descubriste al mezclar?',
    fa_3: '¿Qué parte te gustó más?',
    fa_4: 'Por último, guardá tu dibujo en la carpeta de Artes Visuales.',

    cierre: '¡Terminaste! Aprendiste que el rojo, el azul y el amarillo son los colores primarios, y que mezclándolos descubrimos el naranja, el verde y el violeta. ¡Felicitaciones, artista!'
  },

  /* ---------------------- PANTALLAS ---------------------- */
  pantallas: [

    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Los colores primarios (narración animada) */
    {
      tipo: 'narracion', titulo: '🎨 Los colores primarios',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'r', tipo: 'grupo', oculto: true, capas: [mancha(75, 120, 110, COL.rojo), txt(75, 200, 'rojo', 24, COL.rojo)] },
          { id: 'a', tipo: 'grupo', oculto: true, capas: [mancha(200, 120, 110, COL.azul, { rot: 40 }), txt(200, 200, 'azul', 24, COL.azul)] },
          { id: 'm', tipo: 'grupo', oculto: true, capas: [mancha(325, 120, 110, COL.amarillo, { rot: -30 }), txt(325, 200, 'amarillo', 24, '#c99a00')] },
          { id: 't', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 60, y: 238, w: 280, h: 44, rx: 22, fill: '#2b2118' }, txt(200, 268, 'colores primarios', 22, '#ffffff')] }
        ]
      },
      pasos: [
        { audio: 'pr_1', texto: 'Hay tres colores muy especiales: los <b>colores primarios</b>.' },
        { audio: 'pr_2', texto: 'El <b style="color:#e8262f">rojo</b> 🍓', mostrar: ['r'], apuntar: [19, 40], resaltar: 'r' },
        { audio: 'pr_3', texto: 'El <b style="color:#1f64d6">azul</b> 🌌', mostrar: ['a'], apuntar: [50, 40], resaltar: 'a' },
        { audio: 'pr_4', texto: 'El <b style="color:#d9a400">amarillo</b> ☀️', mostrar: ['m'], apuntar: [81, 40], resaltar: 'm' },
        { audio: 'pr_5', texto: 'Con los tres primarios formamos <b>muchos colores nuevos</b>.', mostrar: ['t'], apuntar: [50, 86], resaltar: 't' }
      ]
    },

    /* 2 — ¿Es un color primario? (clasificarUno) */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Es un color primario?', instr: 'cp_instr', err: 'cp_err',
      texto: '¿Es un color <b>primario</b>?',
      categorias: [
        { id: 's', label: '👍 Sí', sub: 'es primario' },
        { id: 'n', label: '👎 No', sub: 'no es primario' }
      ],
      items: [
        { id: 'rojo', cat: 's', audio: 'c_rojo', ok: 'cp_rojo', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 100, 150, COL.rojo), txt(150, 205, 'rojo', 24)] } },
        { id: 'azul', cat: 's', audio: 'c_azul', ok: 'cp_azul', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 100, 150, COL.azul, { rot: 60 }), txt(150, 205, 'azul', 24)] } },
        { id: 'amarillo', cat: 's', audio: 'c_amarillo', ok: 'cp_amarillo', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 100, 150, COL.amarillo, { rot: 120 }), txt(150, 205, 'amarillo', 24)] } },
        { id: 'naranja', cat: 'n', audio: 'c_naranja', ok: 'cp_naranja', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 100, 150, COL.naranja, { rot: 200 }), txt(150, 205, 'naranja', 24)] } },
        { id: 'verde', cat: 'n', audio: 'c_verde', ok: 'cp_verde', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 100, 150, COL.verde, { rot: 260 }), txt(150, 205, 'verde', 24)] } },
        { id: 'violeta', cat: 'n', audio: 'c_violeta', ok: 'cp_violeta', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 100, 150, COL.violeta, { rot: 310 }), txt(150, 205, 'violeta', 24)] } }
      ]
    },

    /* 3 — Mezclas de colores (narración animada) */
    {
      tipo: 'narracion', titulo: '🥣 La magia de mezclar',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          filaMezcla('n', 50, COL.rojo, COL.amarillo, COL.naranja, 'rojo', 'amarillo', 'naranja'),
          filaMezcla('v', 148, COL.azul, COL.amarillo, COL.verde, 'azul', 'amarillo', 'verde'),
          filaMezcla('p', 246, COL.rojo, COL.azul, COL.violeta, 'rojo', 'azul', 'violeta')
        ]
      },
      pasos: [
        { audio: 'me_n1', texto: 'Si mezclamos <b>dos colores primarios</b>, aparece un color nuevo. ✨' },
        { audio: 'me_n2', texto: '<b style="color:#e8262f">rojo</b> + <b style="color:#d9a400">amarillo</b> = <b style="color:#ff8a1e">naranja</b>', mostrar: ['n'], apuntar: [75, 17], resaltar: 'nr' },
        { audio: 'me_n3', texto: '<b style="color:#1f64d6">azul</b> + <b style="color:#d9a400">amarillo</b> = <b style="color:#2fae4a">verde</b>', mostrar: ['v'], apuntar: [75, 50], resaltar: 'vr' },
        { audio: 'me_n4', texto: '<b style="color:#e8262f">rojo</b> + <b style="color:#1f64d6">azul</b> = <b style="color:#8a3fb8">violeta</b>', mostrar: ['p'], apuntar: [75, 82], resaltar: 'pr' },
        { audio: 'me_n5', texto: '¡Descubrimos colores nuevos mezclando! 🎉' }
      ]
    },

    /* 4 — Laboratorio de mezclas */
    {
      tipo: 'mezclar', titulo: '🧪 Laboratorio de mezclas', instr: 'lab_instr', err: 'lab_err',
      frascos: ['rojo', 'azul', 'amarillo'],
      rondas: [
        { objetivo: 'naranja', emoji: '🍊', audio: 'lab_1', ok: 'lab_1ok', texto: 'Queremos pintar una <b>naranja</b>.' },
        { objetivo: 'verde', emoji: '🌳', audio: 'lab_2', ok: 'lab_2ok', texto: 'Queremos pintar un <b>árbol</b>.' },
        { objetivo: 'violeta', emoji: '🍇', audio: 'lab_3', ok: 'lab_3ok', texto: 'Queremos pintar unas <b>uvas</b>.' }
      ]
    },

    /* 5 — ¿Qué color sale? */
    {
      tipo: 'queSale', titulo: '❓ ¿Qué color sale?', instr: 'qs_instr', err: 'qs_err',
      opciones: ['naranja', 'verde', 'violeta'],
      rondas: [
        { a: 'azul', b: 'amarillo', res: 'verde', audio: 'qs_1', ok: 'qs_1ok' },
        { a: 'rojo', b: 'azul', res: 'violeta', audio: 'qs_2', ok: 'qs_2ok' },
        { a: 'rojo', b: 'amarillo', res: 'naranja', audio: 'qs_3', ok: 'qs_3ok' }
      ]
    },

    /* 6 — Formas para dibujar (narración animada) */
    {
      tipo: 'narracion', titulo: '✏️ Manchas, líneas, puntos y círculos',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'gm', tipo: 'grupo', oculto: true, capas: [
            mancha(50, 62, 70, COL.rojo), mancha(100, 100, 36, COL.azul, { rot: 90 }), mancha(105, 32, 26, COL.amarillo, { rot: 200 }),
            txt(66, 140, 'manchas', 17)] },
          { id: 'gl', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'path', d: 'M148 30L252 30', stroke: COL.rojo, sw: 6 },
            { tipo: 'path', d: 'M148 70q13 -16 26 0t26 0t26 0t26 0', stroke: COL.azul, sw: 6 },
            { tipo: 'path', d: 'M148 118L165 96L182 118L199 96L216 118L233 96L250 118', stroke: '#e0a800', sw: 6 },
            txt(200, 140, 'líneas', 17)] },
          { id: 'gp', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'puntos', cx: 335, cy: 70, r: 55, n: 22, seed: 4, colores: [COL.rojo, COL.azul, COL.amarillo] },
            txt(335, 140, 'puntos', 17)] },
          { id: 'gc', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'aro', cx: 55, cy: 210, r: 38, stroke: COL.azul, sw: 7 },
            { tipo: 'aro', cx: 108, cy: 192, r: 18, stroke: COL.rojo, sw: 5 },
            { tipo: 'aro', cx: 110, cy: 240, r: 12, stroke: '#e0a800', sw: 5 },
            txt(75, 285, 'círculos', 17)] },
          { id: 'go', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'figura', forma: 'estrella', cx: 178, cy: 215, size: 62, fill: COL.amarillo, stroke: '#9a7a00', strokeW: 2 },
            { tipo: 'figura', forma: 'corazon', cx: 240, cy: 212, size: 56, fill: COL.rojo, sinDetalles: true },
            { tipo: 'figura', forma: 'triangulo', cx: 298, cy: 212, size: 54, fill: COL.azul },
            { tipo: 'figura', forma: 'nube', cx: 358, cy: 215, size: 62, fill: '#ffffff', stroke: COL.azul, strokeW: 3 },
            txt(268, 285, 'otras formas', 17)] }
        ]
      },
      pasos: [
        { audio: 'fo_1', texto: 'Vas a dibujar muchas formas: <b>grandes y chiquitas</b>, ¡y repetidas!' },
        { audio: 'fo_2', texto: '🫧 <b>Manchas</b>', mostrar: ['gm'], apuntar: [14, 22], resaltar: 'gm' },
        { audio: 'fo_3', texto: '〰️ <b>Líneas</b>: rectas, onduladas y en zigzag ⚡', mostrar: ['gl'], apuntar: [50, 25], resaltar: 'gl' },
        { audio: 'fo_4', texto: '⚫ <b>Puntos</b>', mostrar: ['gp'], apuntar: [84, 25], resaltar: 'gp' },
        { audio: 'fo_5', texto: '⭕ <b>Círculos</b>', mostrar: ['gc'], apuntar: [14, 72], resaltar: 'gc' },
        { audio: 'fo_6', texto: '⭐ ❤️ 🔺 ☁️ <b>Otras formas</b> que se te ocurran', mostrar: ['go'], apuntar: [60, 72], resaltar: 'go' }
      ]
    },

    /* 7 — ¿Qué es? (clasificarUno, 4 categorías) */
    {
      tipo: 'clasificarUno', titulo: '🔎 ¿Qué es?', instr: 'qe_instr', err: 'qe_err',
      texto: '¿Qué forma es?',
      categorias: [
        { id: 'm', label: '🫧 Mancha', sub: '' },
        { id: 'l', label: '〰️ Línea', sub: '' },
        { id: 'p', label: '⚫ Puntos', sub: '' },
        { id: 'c', label: '⭕ Círculo', sub: '' }
      ],
      items: [
        { id: 1, cat: 'm', ok: 'qe_1', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 112, 170, COL.verde, { rot: 30 })] } },
        { id: 2, cat: 'm', ok: 'qe_2', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, mancha(150, 112, 80, COL.violeta, { rot: 150 })] } },
        { id: 3, cat: 'l', ok: 'qe_3', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'path', d: 'M40 112q27 -40 55 0t55 0t55 0t55 0', stroke: COL.azul, sw: 10 }] } },
        { id: 4, cat: 'l', ok: 'qe_4', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'path', d: 'M40 140L77 80L114 140L151 80L188 140L225 80L262 140', stroke: COL.naranja, sw: 10 }] } },
        { id: 5, cat: 'p', ok: 'qe_5', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'puntos', cx: 150, cy: 112, r: 95, n: 30, seed: 9, colores: [COL.rojo] }] } },
        { id: 6, cat: 'p', ok: 'qe_6', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'puntos', cx: 150, cy: 112, r: 95, n: 30, seed: 21, colores: [COL.rojo, COL.azul, COL.amarillo, COL.verde] }] } },
        { id: 7, cat: 'c', ok: 'qe_7', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'aro', cx: 150, cy: 112, r: 55, stroke: COL.rojo, sw: 10 }] } },
        { id: 8, cat: 'c', ok: 'qe_8', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'aro', cx: 150, cy: 112, r: 88, stroke: COL.violeta, sw: 12 }] } }
      ]
    },

    /* 8 — Taller digital (actividad abierta) */
    {
      tipo: 'taller', titulo: '🎉 Mi fiesta de colores', instr: 'ta_instr',
      primarios: ['rojo', 'azul', 'amarillo'],
      sellos: ['estrella', 'corazon', 'triangulo', 'nube'],
      archivo: 'mi-fiesta-de-colores.png'
    },

    /* 9 — Ahora en papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Elegí los colores primarios: <b style="color:#e8262f">rojo</b>, <b style="color:#1f64d6">azul</b> y <b style="color:#d9a400">amarillo</b>.' },
        { audio: 'pp_2', texto: '<b>2.</b> Dibujá manchas, líneas ➖ 〰️ ⚡, puntos, círculos y otras formas ⭐ ❤️ 🔺 ☁️. ¡De distintos tamaños y repetidas!' },
        { audio: 'pp_3', texto: '<b>3.</b> Pintá algunas formas con colores primarios y otras <b>mezclando</b> para descubrir colores nuevos.' },
        { audio: 'pp_4', texto: '<b>4.</b> Mirá tu dibujo y, si querés, agregale detalles.' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> una hoja y témperas, crayones, fibras o lápices de colores.' }
      ]
    },

    /* 10 — Foto del dibujo en papel */
    { tipo: 'foto', titulo: '📷 Mi dibujo en papel', instr: 'fo_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu dibujo, o <b>🖼️ Elegir de la galería</b> para buscar el que guardaste en el taller.', boton: 'fo_boton', ok: 'fo_ok', img: 'img/foto.jpg',
      archivo: 'mi-fiesta-de-colores-en-papel.jpg' },

    /* 11 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi dibujo', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 300, h: 225, capas: [
        { tipo: 'rect', fill: '#ffffff' },
        mancha(70, 70, 90, COL.rojo), mancha(225, 150, 110, COL.azul, { rot: 80 }), mancha(150, 95, 60, COL.naranja, { rot: 200 }),
        { tipo: 'path', d: 'M20 190q15 -18 30 0t30 0t30 0t30 0', stroke: COL.verde, sw: 7 },
        { tipo: 'path', d: 'M180 30L195 12L210 30L225 12L240 30L255 12', stroke: COL.amarillo, sw: 7 },
        { tipo: 'aro', cx: 270, cy: 70, r: 22, stroke: COL.violeta, sw: 6 },
        { tipo: 'aro', cx: 120, cy: 170, r: 14, stroke: COL.rojo, sw: 5 },
        { tipo: 'puntos', cx: 70, cy: 150, r: 45, n: 12, seed: 5, colores: [COL.azul, COL.amarillo, COL.rojo] },
        { tipo: 'figura', forma: 'estrella', cx: 160, cy: 200, size: 40, fill: COL.amarillo },
        { tipo: 'figura', forma: 'corazon', cx: 280, cy: 200, size: 36, fill: COL.rojo, sinDetalles: true }] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Usé los tres <b>colores primarios</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿<b>Mezclé</b> colores y descubrí uno nuevo?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Dibujé manchas, líneas, puntos y círculos?' },
        { audio: 'ae_4', si: 'ae_4si', no: 'ae_4no', texto: '¿Hice formas <b>grandes</b> y <b>chiquitas</b>?' }
      ]
    },

    /* 12 — En familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Mostrale tu dibujo a tu familia y contales: <b>¿qué colores usaste?</b>' },
        { audio: 'fa_2', texto: '<b>¿Qué color descubriste al mezclar?</b>' },
        { audio: 'fa_3', texto: '<b>¿Qué parte te gustó más?</b>' },
        { audio: 'fa_4', texto: '📁 Guardá tu dibujo en la carpeta de <b>Artes Visuales</b>.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
