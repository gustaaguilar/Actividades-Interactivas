/* ============================================================
   EL MONSTRUO QUE SE QUEDÓ SIN COLORES — Artes Visuales · 2.º grado
   Colores primarios, secundarios y neutros
   Basado en la Ficha Viajera de Artes Visuales (Propuesta breve 1)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  rojo: '#e8262f', azul: '#1f64d6', amarillo: '#ffd21f',
  naranja: '#ff8a1e', verde: '#2fae4a', violeta: '#8a3fb8',
  blanco: '#ffffff', gris: '#9a9a9a', negro: '#1b1b1b'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };

const mancha = (cx, cy, size, color, extra) => Object.assign({ tipo: 'figura', forma: 'mancha', cx, cy, size, fill: color, sinDetalles: true }, extra || {});
const manchaB = (cx, cy, size, color) => [mancha(cx, cy, size, color === COL.blanco ? '#d0d0d0' : color), ...(color === COL.blanco ? [mancha(cx, cy, size * 0.9, '#ffffff')] : [])];
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const gris = ['#8d8d8d', '#a6a6a6', '#6f6f6f', '#bdbdbd'];
const blob = (n) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, ...manchaB(150, 100, 150, COL[n]), txt(150, 205, n, 24)] });
const par = (a, b) => ({ w: 300, h: 150, capas: [{ tipo: 'rect', fill: '#fffdf5' }, ...manchaB(80, 68, 100, COL[a]), txt(150, 82, '+', 40), ...manchaB(220, 68, 100, COL[b]), txt(80, 140, a, 20), txt(220, 140, b, 20)] });

window.DATOS = {
  meta: {
    titulo: 'El monstruo que se quedó sin colores',
    subtitulo: 'Colores primarios, secundarios y neutros',
    area: '🎨 Artes Visuales · 2.º grado',
    grado: 'Artes Visuales · 2.º grado',
    fuente: 'Basado en la Ficha Viajera de Artes Visuales · Propuesta breve 1',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar',
    mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg', fotoMini: 'profe_mini.jpg',
    frase: 'Menos prisa, más vida 🧉🫂',
    youtube: 'https://www.youtube.com/@ProfeGustavoAguilar?sub_confirmation=1',
    puntosPorAcierto: 10,
    revision: false
  },
  colores: COL,
  paletas: PALETAS,

  audios: {
    portada: '¡Hola! Bienvenidos a El monstruo que se quedó sin colores. Vamos a conocer los colores primarios, los secundarios y los neutros, y vamos a ayudar a un monstruo a recuperar sus colores. Tocá Comenzar.',

    c_rojo: 'Rojo.', c_azul: 'Azul.', c_amarillo: 'Amarillo.', c_naranja: 'Naranja.', c_verde: 'Verde.', c_violeta: 'Violeta.',
    c_blanco: 'Blanco.', c_gris: 'Gris.', c_negro: 'Negro.',

    /* 1 — la historia */
    hi_1: 'Escuchá esta pequeña historia.',
    hi_2: 'Un monstruo llegó desde un planeta lejano.',
    hi_3: 'Era tan gris que nadie podía descubrir qué cosas le gustaban.',
    hi_4: '¡Necesita nuestra ayuda para recuperar sus colores!',

    /* 2 — primarios y secundarios */
    ps_1: 'Los colores primarios son tres: rojo, azul y amarillo. No se forman mezclando otros colores.',
    ps_2: 'Si mezclamos dos primarios, se forman los colores secundarios.',
    ps_3: 'Rojo y amarillo forman el naranja.',
    ps_4: 'Azul y amarillo forman el verde.',
    ps_5: 'Rojo y azul forman el violeta. Naranja, verde y violeta son los colores secundarios.',

    /* 3 — neutros */
    ne_1: 'Hay otros colores que se llaman neutros: el blanco, el negro y el gris.',
    ne_2: 'Si mezclamos blanco y negro, se forma el gris.',
    ne_3: 'Los colores neutros sirven para los ojos, las manchas, las sombras y los detalles.',

    /* 4 — clasificar */
    cl_instr: 'Mirá cada mancha y escuchá su nombre. ¿Es un color primario, secundario o neutro? Tocá la respuesta.',
    cl_err: 'Pensalo otra vez. Los primarios son tres, los secundarios salen de mezclar y los neutros son blanco, negro y gris.',
    cl_rojo: '¡Sí! El rojo es primario.',
    cl_azul: '¡Muy bien! El azul es primario.',
    cl_amarillo: '¡Correcto! El amarillo es primario.',
    cl_naranja: '¡Bien! El naranja es secundario: sale de mezclar rojo y amarillo.',
    cl_verde: '¡Exacto! El verde es secundario: sale de mezclar azul y amarillo.',
    cl_violeta: '¡Muy bien! El violeta es secundario: sale de mezclar rojo y azul.',
    cl_blanco: '¡Sí! El blanco es un color neutro.',
    cl_gris: '¡Correcto! El gris es neutro: sale de mezclar blanco y negro.',
    cl_negro: '¡Muy bien! El negro es un color neutro.',

    /* 5 — laboratorio */
    lab_instr: 'Este es el laboratorio de mezclas. Tocá dos frascos de pintura para mezclarlos en el bol.',
    lab_1: 'Queremos pintar un brócoli. ¿Qué dos colores mezclamos para el verde?',
    lab_1ok: '¡Genial! Azul y amarillo forman el verde.',
    lab_2: 'Queremos pintar una calabaza. ¿Qué dos colores mezclamos para el naranja?',
    lab_2ok: '¡Lo lograste! Rojo y amarillo forman el naranja.',
    lab_3: 'Queremos pintar una berenjena. ¿Qué dos colores mezclamos para el violeta?',
    lab_3ok: '¡Muy bien! Rojo y azul forman el violeta.',
    lab_err: 'Salió otro color. Mirá cuál color buscamos y probá con otros dos frascos.',

    /* 6 — ¿de dónde salió? */
    de_instr: 'Mirá el color. ¿Qué dos colores se mezclaron para formarlo? Tocá la respuesta.',
    de_err: 'Ese no es. Pensá otra vez en la mezcla.',
    de_1: '¿Con qué colores se forma el violeta?',
    de_1ok: '¡Sí! Rojo más azul forman el violeta.',
    de_2: '¿Con qué colores se forma el gris?',
    de_2ok: '¡Muy bien! Blanco más negro forman el gris, un color neutro.',
    de_3: '¿Con qué colores se forma el verde?',
    de_3ok: '¡Correcto! Azul más amarillo forman el verde.',

    /* 7 — taller */
    ta_instr: '¡Ayudá al monstruo a recuperar sus colores! Elegí un color y tocá con el balde cada parte del monstruo para pintarla. Pintá algunas partes con primarios, otras con secundarios, y usá blanco, negro o gris para los detalles. Arriba, escribí su nombre.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla.',
    t_lapiz: 'Lápiz, para dibujar detalles.',
    t_punto: 'Puntos, para manchitas.',
    t_mancha: 'Manchas.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Empezar de nuevo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    mz_abrir: 'Elegí dos colores para mezclar.',
    mz_naranja: '¡Descubriste el naranja! Rojo más amarillo.',
    mz_verde: '¡Descubriste el verde! Azul más amarillo.',
    mz_violeta: '¡Descubriste el violeta! Rojo más azul.',
    mz_gris: '¡Descubriste el gris! Blanco más negro.',
    mz_nuevo: '¡Descubriste un color nuevo! Ya está en tu paleta.',
    mz_ya: 'Ese color ya está en tu paleta.',
    nm_foco: 'Inventá un nombre para tu monstruo.',
    p_guardar: '¡Tu monstruo quedó guardado!',

    /* 8 — en papel */
    pp_1: 'Ahora hacé tu propio monstruo en papel. Paso uno: dibujá cómo sería el monstruo, con cabeza, cuerpo, brazos, piernas y detalles inventados.',
    pp_2: 'Paso dos: pintá algunas partes con colores primarios.',
    pp_3: 'Paso tres: usá colores secundarios en otras partes.',
    pp_4: 'Paso cuatro: agregá blanco, negro o gris para los ojos, las manchas, las sombras o los detalles.',
    pp_5: 'Paso cinco: inventá un nombre para tu personaje.',
    pp_6: 'Necesitás una hoja blanca, colores, fibras, crayones o témperas, y papel glasé. Usá los materiales que tengas en casa.',

    /* 9 — foto */
    fo_instr: 'Cuando termines tu monstruo en papel, pulsá el botón Sacar foto para fotografiarlo. O también podés elegir el que guardaste en el taller, pulsando el botón Elegir de la galería.',
    fo_boton: 'Sacar una foto.',
    fo_ok: '¡Qué monstruo tan colorido! Tocá Guardar para tenerlo en tu celular.',

    /* 10 — autoevaluación */
    ae_instr: 'Mirá tu monstruo y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Mi monstruo tiene cabeza, cuerpo, brazos, piernas y detalles?',
    ae_1si: '¡Muy bien! Tu monstruo está completo.',
    ae_1no: 'Podés agregarle la parte que le falta.',
    ae_2: '¿Usé colores primarios?',
    ae_2si: '¡Genial! Rojo, azul o amarillo.',
    ae_2no: 'Probá pintar alguna parte con rojo, azul o amarillo.',
    ae_3: '¿Usé colores secundarios?',
    ae_3si: '¡Excelente! Naranja, verde o violeta.',
    ae_3no: 'Probá pintar alguna parte con naranja, verde o violeta.',
    ae_4: '¿Usé blanco, negro o gris para los detalles?',
    ae_4si: '¡Muy bien! Los neutros le dan los últimos detalles.',
    ae_4no: 'Podés usarlos en los ojos, las manchas o las sombras.',
    ae_fin: 'Gracias por mirar tu monstruo con atención. Mirar lo que hicimos también es parte del arte.',

    /* 11 — familia */
    fa_1: 'Mostrale tu monstruo a tu familia, contales su nombre y preguntales: ¿cuáles son sus colores favoritos?',
    fa_2: 'Después contales: ¿cuáles son los colores primarios?',
    fa_3: '¿Cuáles son los colores secundarios?',
    fa_4: '¿Cuáles son los colores neutros?',
    fa_5: 'Por último, guardá tu trabajo en la carpeta de Artes Visuales.',

    cierre: '¡Terminaste! El monstruo recuperó sus colores gracias a vos. Aprendiste los colores primarios, los secundarios y los neutros. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — La historia */
    {
      tipo: 'narracion', titulo: '📖 Un monstruo muy gris',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#2a2f4a' },
          { tipo: 'fondo', seed: 5, paleta: ['#ffffff', '#cfd8ff', '#ffe9a8'], bg: 'none', densidad: 0.5, paso: 34, tipos: ['estrellita', 'puntos'] },
          { id: 'pl', tipo: 'grupo', capas: [{ tipo: 'figura', forma: 'circulo', cx: 340, cy: 60, size: 70, fill: '#8a8fb0', sinDetalles: true }, { tipo: 'aro', cx: 340, cy: 60, r: 50, stroke: '#c3c7e0', sw: 4 }] },
          { id: 'm', tipo: 'grupo', oculto: true, capas: [{ tipo: 'criatura', cx: 180, cy: 165, size: 230, colores: gris, linea: '#333' }] },
          { id: 'q', tipo: 'grupo', oculto: true, capas: [txt(310, 190, '?', 70, '#ffd21f'), txt(345, 240, '?', 44, '#ff8a1e')] },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [txt(310, 180, '🎨', 64)] }
        ]
      },
      pasos: [
        { audio: 'hi_1', texto: '📖 Escuchá esta pequeña historia…' },
        { audio: 'hi_2', texto: 'Un monstruo llegó desde un <b>planeta lejano</b>.', mostrar: ['m'], apuntar: [82, 15], resaltar: 'pl' },
        { audio: 'hi_3', texto: 'Era <b>tan gris</b> que nadie podía descubrir qué cosas le gustaban.', mostrar: ['q'], apuntar: [44, 50], resaltar: 'm' },
        { audio: 'hi_4', texto: '¡Necesita <b>nuestra ayuda</b> para recuperar sus colores!', ocultar: ['q'], mostrar: ['c'], apuntar: [78, 55], resaltar: 'c' }
      ]
    },

    /* 2 — Primarios y secundarios */
    {
      tipo: 'narracion', titulo: '🎨 Primarios y secundarios',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'p', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'rect', x: 8, y: 8, w: 384, h: 128, rx: 16, fill: '#fff3d6' }, txt(200, 32, 'primarios', 20),
            mancha(85, 78, 70, COL.rojo), mancha(200, 78, 70, COL.azul, { rot: 60 }), mancha(315, 78, 70, COL.amarillo, { rot: 140 }),
            txt(85, 128, 'rojo', 15), txt(200, 128, 'azul', 15), txt(315, 128, 'amarillo', 15)] },
          { id: 's', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'rect', x: 8, y: 160, w: 384, h: 132, rx: 16, fill: '#eaf7ec' }, txt(200, 184, 'secundarios', 20)] },
          { id: 'sn', tipo: 'grupo', oculto: true, capas: [mancha(85, 232, 70, COL.naranja, { rot: 20 }), txt(85, 284, 'naranja', 15)] },
          { id: 'sv', tipo: 'grupo', oculto: true, capas: [mancha(200, 232, 70, COL.verde, { rot: 100 }), txt(200, 284, 'verde', 15)] },
          { id: 'sp', tipo: 'grupo', oculto: true, capas: [mancha(315, 232, 70, COL.violeta, { rot: 220 }), txt(315, 284, 'violeta', 15)] }
        ]
      },
      pasos: [
        { audio: 'ps_1', texto: 'Los <b>primarios</b>: rojo, azul y amarillo.', mostrar: ['p'], apuntar: [50, 18], resaltar: 'p' },
        { audio: 'ps_2', texto: 'Mezclando dos primarios se forman los <b>secundarios</b>.', mostrar: ['s'], apuntar: [50, 62] },
        { audio: 'ps_3', texto: '<b style="color:#e8262f">rojo</b> + <b style="color:#d9a400">amarillo</b> = <b style="color:#ff8a1e">naranja</b>', mostrar: ['sn'], apuntar: [21, 74], resaltar: 'sn' },
        { audio: 'ps_4', texto: '<b style="color:#1f64d6">azul</b> + <b style="color:#d9a400">amarillo</b> = <b style="color:#2fae4a">verde</b>', mostrar: ['sv'], apuntar: [50, 74], resaltar: 'sv' },
        { audio: 'ps_5', texto: '<b style="color:#e8262f">rojo</b> + <b style="color:#1f64d6">azul</b> = <b style="color:#8a3fb8">violeta</b>', mostrar: ['sp'], apuntar: [79, 74], resaltar: 'sp' }
      ]
    },

    /* 3 — Neutros */
    {
      tipo: 'narracion', titulo: '⚪ Los colores neutros',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'n', tipo: 'grupo', oculto: true, capas: [
            ...manchaB(80, 85, 95, COL.blanco), txt(80, 152, 'blanco', 17),
            mancha(320, 85, 95, COL.negro, { rot: 90 }), txt(320, 152, 'negro', 17)] },
          { id: 'g', tipo: 'grupo', oculto: true, capas: [txt(155, 95, '+', 34), txt(245, 95, '=', 34), mancha(200, 200, 100, COL.gris, { rot: 200 }), txt(200, 270, 'gris', 18)] },
          { id: 'd', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'criatura', cx: 200, cy: 150, size: 250, colores: [COL.verde, COL.naranja, COL.violeta, COL.rojo] }] }
        ]
      },
      pasos: [
        { audio: 'ne_1', texto: 'Los colores <b>neutros</b>: <b>blanco</b>, <b>negro</b> y <b>gris</b>.', mostrar: ['n'], apuntar: [20, 25], resaltar: 'n' },
        { audio: 'ne_2', texto: 'blanco + negro = <b>gris</b>', mostrar: ['g'], apuntar: [50, 62], resaltar: 'g' },
        { audio: 'ne_3', texto: 'Sirven para <b>ojos, manchas, sombras y detalles</b>. 👀', mostrar: ['d'], apuntar: [17, 22] }
      ]
    },

    /* 4 — Clasificar 3 categorías */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Primario, secundario o neutro?', instr: 'cl_instr', err: 'cl_err',
      texto: '¿Qué tipo de color es?',
      categorias: [{ id: 'p', label: '🔴 Primario', sub: '' }, { id: 's', label: '🟢 Secundario', sub: '' }, { id: 'n', label: '⚪ Neutro', sub: '' }],
      items: ['rojo', 'azul', 'amarillo', 'naranja', 'verde', 'violeta', 'blanco', 'gris', 'negro'].map((n, j) => ({
        id: n, cat: j < 3 ? 'p' : j < 6 ? 's' : 'n', audio: 'c_' + n, ok: 'cl_' + n, escena: blob(n) }))
    },

    /* 5 — Laboratorio de mezclas */
    {
      tipo: 'mezclar', titulo: '🧪 Laboratorio de mezclas', instr: 'lab_instr', err: 'lab_err',
      frascos: ['rojo', 'azul', 'amarillo'],
      rondas: [
        { objetivo: 'verde', emoji: '🥦', audio: 'lab_1', ok: 'lab_1ok', texto: 'Queremos pintar un <b>brócoli</b>.' },
        { objetivo: 'naranja', emoji: '🎃', audio: 'lab_2', ok: 'lab_2ok', texto: 'Queremos pintar una <b>calabaza</b>.' },
        { objetivo: 'violeta', emoji: '🍆', audio: 'lab_3', ok: 'lab_3ok', texto: 'Queremos pintar una <b>berenjena</b>.' }
      ]
    },

    /* 6 — ¿De dónde salió? */
    {
      tipo: 'elegir', titulo: '🔎 ¿De dónde salió este color?', instr: 'de_instr', err: 'de_err',
      rondas: [
        { texto: '¿Con qué colores se forma el <b style="color:#8a3fb8">violeta</b>?', audio: 'de_1', ok: 'de_1ok', visual: { color: COL.violeta, label: 'violeta' }, correcta: 'ra',
          opciones: [{ id: 'ra', escena: par('rojo', 'azul') }, { id: 'ry', escena: par('rojo', 'amarillo') }, { id: 'bn', escena: par('blanco', 'negro') }] },
        { texto: '¿Con qué colores se forma el <b>gris</b>?', audio: 'de_2', ok: 'de_2ok', visual: { color: COL.gris, label: 'gris' }, correcta: 'bn',
          opciones: [{ id: 'ay', escena: par('azul', 'amarillo') }, { id: 'bn', escena: par('blanco', 'negro') }, { id: 'ra', escena: par('rojo', 'azul') }] },
        { texto: '¿Con qué colores se forma el <b style="color:#2fae4a">verde</b>?', audio: 'de_3', ok: 'de_3ok', visual: { color: COL.verde, label: 'verde' }, correcta: 'ay',
          opciones: [{ id: 'ry', escena: par('rojo', 'amarillo') }, { id: 'ay', escena: par('azul', 'amarillo') }, { id: 'bn', escena: par('blanco', 'negro') }] }
      ]
    },

    /* 7 — Taller: pintar al monstruo */
    {
      tipo: 'taller', titulo: '👾 Devolvele los colores', instr: 'ta_instr',
      plantilla: 'monstruo',
      herramientas: ['balde', 'lapiz', 'punto', 'mancha', 'goma'],
      grupos: [{ t: 'primarios', c: ['rojo', 'azul', 'amarillo'] }, { t: 'secundarios', c: ['naranja', 'verde', 'violeta'] }, { t: 'neutros', c: ['blanco', 'gris', 'negro'] }],
      colores: ['rojo', 'azul', 'amarillo', 'naranja', 'verde', 'violeta', 'blanco', 'gris', 'negro'],
      mezclar: true,
      nombre: { label: 'Se llama', placeholder: 'inventale un nombre', audio: 'nm_foco' },
      archivo: 'mi-monstruo-de-colores.png'
    },

    /* 8 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Tu propio monstruo, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Dibujá tu monstruo: cabeza, cuerpo, brazos, piernas y detalles inventados. 👾' },
        { audio: 'pp_2', texto: '<b>2.</b> Pintá algunas partes con <b>primarios</b>: <b style="color:#e8262f">rojo</b>, <b style="color:#1f64d6">azul</b>, <b style="color:#d9a400">amarillo</b>.' },
        { audio: 'pp_3', texto: '<b>3.</b> Usá <b>secundarios</b> en otras partes: <b style="color:#ff8a1e">naranja</b>, <b style="color:#2fae4a">verde</b>, <b style="color:#8a3fb8">violeta</b>.' },
        { audio: 'pp_4', texto: '<b>4.</b> Agregá <b>blanco, negro o gris</b> en ojos, manchas, sombras y detalles.' },
        { audio: 'pp_5', texto: '<b>5.</b> Inventá un <b>nombre</b> para tu personaje. ✍️' },
        { audio: 'pp_6', texto: '🧰 <b>Materiales:</b> hoja blanca, colores, fibras, crayones o témperas, y papel glasé.' }
      ]
    },

    /* 9 — Foto */
    { tipo: 'foto', titulo: '📷 Mi monstruo en papel', instr: 'fo_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu monstruo, o <b>🖼️ Elegir de la galería</b> para buscar el que guardaste en el taller.', boton: 'fo_boton', ok: 'fo_ok', img: 'img/foto.jpg',
      archivo: 'mi-monstruo-en-papel.jpg' },

    /* 10 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi monstruo', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#ffffff' }, { tipo: 'criatura', cx: 150, cy: 112, size: 200, colores: [COL.azul, COL.amarillo, COL.violeta, COL.naranja] }] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Tiene <b>cabeza, cuerpo, brazos, piernas</b> y detalles?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Usé colores <b>primarios</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Usé colores <b>secundarios</b>?' },
        { audio: 'ae_4', si: 'ae_4si', no: 'ae_4no', texto: '¿Usé <b>blanco, negro o gris</b> en los detalles?' }
      ]
    },

    /* 11 — Familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Presentales tu monstruo y preguntales: <b>¿cuáles son sus colores favoritos?</b>' },
        { audio: 'fa_2', texto: 'Contales: <b>¿cuáles son los colores primarios?</b>' },
        { audio: 'fa_3', texto: '<b>¿Cuáles son los colores secundarios?</b>' },
        { audio: 'fa_4', texto: '<b>¿Cuáles son los colores neutros?</b>' },
        { audio: 'fa_5', texto: '📁 Guardá tu trabajo en la carpeta de <b>Artes Visuales</b>.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
