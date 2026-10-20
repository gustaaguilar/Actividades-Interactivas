/* ============================================================
   UN JARDÍN PARA TOCAR Y DESCUBRIR — Artes Visuales · 1.er grado
   Reconocimiento de texturas táctiles
   Basado en la Ficha Viajera de Artes Visuales (Propuesta breve 2)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  rojo: '#e8262f', azul: '#1f64d6', amarillo: '#ffd21f', naranja: '#ff8a1e', verde: '#2fae4a', violeta: '#8a3fb8',
  rosa: '#ff70a6', celeste: '#6cc4f0', marron: '#8a5a2b', negro: '#1b1b1b'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };

/* texturas (fotos reales de materiales) */
const TX = {
  algodon: { n: 'algodón', img: 'img/tx_algodon.jpg' },
  hojas: { n: 'hojas secas', img: 'img/tx_hojas.jpg' },
  petalos: { n: 'pétalos secos', img: 'img/tx_petalos.jpg' },
  ramitas: { n: 'ramitas', img: 'img/tx_ramitas.jpg' },
  glase: { n: 'papel glasé', img: 'img/tx_glase.jpg' },
  lana: { n: 'lana', img: 'img/tx_lana.jpg' },
  goma: { n: 'goma eva', img: 'img/tx_goma.jpg' },
  tela: { n: 'tela', img: 'img/tx_tela.jpg' }
};
const foto = (id, extra) => Object.assign({ img: TX[id].img, label: TX[id].n, audio: 'n_' + id }, extra || {});
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const tile = (id, x, y, gid) => ({ id: gid, tipo: 'grupo', oculto: true, capas: [
  { tipo: 'rect', x: x - 3, y: y - 3, w: 130, h: 102, rx: 10, fill: '#ffffff', stroke: '#eadcc6' },
  { tipo: 'img', src: TX[id].img, x, y, w: 124, h: 96 }
] });

window.DATOS = {
  meta: {
    titulo: 'Un jardín para tocar y descubrir',
    subtitulo: 'Las texturas que sentimos al tocar',
    area: '🎨 Artes Visuales · 1.er grado',
    grado: 'Artes Visuales · 1.er grado',
    fuente: 'Basado en la Ficha Viajera de Artes Visuales · Propuesta breve 2',
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
    portada: '¡Hola! Bienvenidos a Un jardín para tocar y descubrir. Vamos a conocer las texturas: cómo se sienten las cosas cuando las tocamos. Y al final vas a crear tu propio jardín. Tocá Comenzar.',

    n_algodon: 'Algodón.', n_hojas: 'Hojas secas.', n_petalos: 'Pétalos secos.', n_ramitas: 'Ramitas.',
    n_glase: 'Papel glasé.', n_lana: 'Lana.', n_goma: 'Goma eva.', n_tela: 'Tela.',

    /* 1 — qué es una textura */
    tx_1: 'Cuando tocamos las cosas con los dedos, sentimos cómo son. Eso se llama textura.',
    tx_2: 'El algodón es suave y esponjoso, como una nube.',
    tx_3: 'Las ramitas son rugosas: tienen bultitos y se sienten ásperas.',
    tx_4: 'El papel glasé es liso: el dedo se desliza sin encontrar bultitos.',
    tx_5: 'Las hojas secas son secas: crujen y se pueden romper.',
    tx_6: 'La lana es flexible: se dobla y no se rompe.',
    tx_7: 'Suave, rugoso, liso, seco y flexible. ¡Cada material tiene su textura!',

    /* 2 — liso o rugoso */
    lr_instr: 'Mirá cada material y escuchá su nombre. ¿Es liso o rugoso? Tocá la respuesta.',
    lr_err: 'Pensá cómo se siente al pasar el dedo. ¿Se desliza, o tiene bultitos?',
    lr_glase: '¡Sí! El papel glasé es liso: el dedo se desliza.',
    lr_goma: '¡Muy bien! La goma eva es lisa.',
    lr_petalos: '¡Correcto! Los pétalos son lisos y suaves.',
    lr_ramitas: '¡Exacto! Las ramitas son rugosas, tienen bultitos.',
    lr_hojas: '¡Bien! Las hojas secas son rugosas, tienen líneas y arruguitas.',

    /* 3 — seco o flexible */
    sf_instr: 'Ahora pensá: ¿es seco, que cruje y se rompe, o es flexible, que se dobla sin romperse?',
    sf_err: 'Imaginá que lo doblás. ¿Se rompe o se dobla?',
    sf_hojas: '¡Sí! Las hojas secas crujen y se rompen.',
    sf_petalos: '¡Muy bien! Los pétalos secos son secos y delicados.',
    sf_ramitas: '¡Correcto! Las ramitas secas se quiebran.',
    sf_lana: '¡Exacto! La lana es flexible, se dobla sin romperse.',
    sf_tela: '¡Bien! La tela es flexible.',
    sf_goma: '¡Muy bien! La goma eva es flexible, se dobla.',

    /* 4 — asociar */
    as_instr: 'Vamos a armar el jardín. Tocá un material y después la parte del jardín donde lo pegarías.',
    as_err: 'Mmm, probá con otra parte del jardín.',
    as_algodon: '¡Sí! El algodón, suave y blanco, sirve para las nubes.',
    as_hojas: '¡Muy bien! Las hojas secas sirven para la copa del árbol.',
    as_petalos: '¡Genial! Los pétalos sirven para las flores.',
    as_ramitas: '¡Correcto! Las ramitas sirven para el tronco y las ramas.',
    as_lana: '¡Bien! La lana verde sirve para el pasto.',
    as_glase: '¡Exacto! El papel glasé amarillo sirve para el sol.',
    j_nubes: 'Las nubes.', j_copa: 'La copa del árbol.', j_flores: 'Las flores.', j_tronco: 'El tronco y las ramas.', j_pasto: 'El pasto.', j_sol: 'El sol.',

    /* 5 — cómo se siente */
    cs_instr: 'Mirá el material. ¿Cómo se siente al tocarlo? Tocá la respuesta.',
    cs_err: 'Pensalo otra vez. Imaginá que lo tocás.',
    cs_1: '¿Cómo se siente el algodón?',
    cs_1ok: '¡Sí! El algodón es suave y esponjoso.',
    cs_2: '¿Cómo se sienten las ramitas?',
    cs_2ok: '¡Muy bien! Las ramitas son rugosas.',
    cs_3: '¿Cómo se siente el papel glasé?',
    cs_3ok: '¡Correcto! El papel glasé es liso.',
    cs_4: '¿Cómo es la lana?',
    cs_4ok: '¡Exacto! La lana es flexible, se dobla sin romperse.',

    /* 6 — taller */
    ta_instr: '¡Llegó tu jardín! Dibujá con el lápiz y con las formas: flores, hojas, árboles, nubes y sol. Después elegí una textura de abajo y usá el balde para pintar cada parte con algodón, hojas secas, lana y otros materiales.',
    t_lapiz: 'Lápiz, para dibujar.',
    t_mancha: 'Manchas.',
    t_sello: 'Formas. Elegí una forma y tocá el cuadro.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla con el color o la textura.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    p_guardar: '¡Tu jardín quedó guardado!',

    /* 7 — en papel */
    pp_1: 'Ahora hacelo en papel. Paso uno: dibujá en la hoja un jardín con flores, plantas y árboles, o un bosque.',
    pp_2: 'Paso dos: pegá los materiales sobre el dibujo para crear distintas texturas.',
    pp_3: 'Podés usar hojas caídas de los árboles, pétalos secos recogidos del suelo, ramitas, papel glasé, lana, algodón, retazos de goma eva o de tela, o lo que tengas en casa.',
    pp_4: 'Pedile a un adulto que te acompañe a juntar las hojas, los pétalos y las ramitas. Tienen que estar limpios y ser seguros.',

    /* 8 — foto */
    fo_instr: 'Cuando termines tu jardín en papel, pulsá el botón Sacar foto para fotografiarlo. O también podés elegir el jardín que guardaste en el taller, pulsando el botón Elegir de la galería.',
    fo_boton: 'Sacar una foto.',
    fo_ok: '¡Qué lindo jardín! Tocá Guardar para tenerlo en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Mirá tu jardín y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Dibujé un jardín con flores, plantas o árboles?',
    ae_1si: '¡Muy bien! Tu jardín tiene muchas cosas.',
    ae_1no: 'Podés agregarle flores, plantas o árboles.',
    ae_2: '¿Pegué materiales distintos?',
    ae_2si: '¡Genial! Muchos materiales, muchas texturas.',
    ae_2no: 'Probá pegar algún material más, como algodón o una hoja seca.',
    ae_3: '¿Hay partes lisas y partes rugosas?',
    ae_3si: '¡Excelente! Tu jardín se siente distinto en cada parte.',
    ae_3no: 'Podés sumar algo liso, como papel glasé, o algo rugoso, como una ramita.',
    ae_fin: 'Gracias por mirar tu jardín con atención. Mirar lo que hicimos también es parte del arte.',

    /* 10 — familia */
    fa_1: 'Mostrale tu jardín a tu familia, invitalos a tocarlo y contales: ¿qué elementos se sienten lisos?',
    fa_2: '¿Qué elementos son rugosos?',
    fa_3: '¿Qué elementos son secos y cuáles son flexibles?',
    fa_4: 'Por último, guardá tu trabajo en la carpeta de Artes Visuales.',

    cierre: '¡Terminaste! Aprendiste que las cosas tienen texturas: suaves, rugosas, lisas, secas y flexibles. ¡Y creaste un jardín para tocar! ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — ¿Qué es una textura? */
    {
      tipo: 'narracion', titulo: '✋ ¿Qué es una textura?',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          tile('algodon', 7, 14, 'a'), tile('ramitas', 138, 14, 'r'), tile('glase', 269, 14, 'g'),
          tile('hojas', 7, 158, 'h'), tile('lana', 138, 158, 'l'),
          { id: 'a2', tipo: 'grupo', oculto: true, capas: [txt(69, 132, 'suave', 18)] },
          { id: 'r2', tipo: 'grupo', oculto: true, capas: [txt(200, 132, 'rugoso', 18)] },
          { id: 'g2', tipo: 'grupo', oculto: true, capas: [txt(331, 132, 'liso', 18)] },
          { id: 'h2', tipo: 'grupo', oculto: true, capas: [txt(69, 276, 'seco', 18)] },
          { id: 'l2', tipo: 'grupo', oculto: true, capas: [txt(200, 276, 'flexible', 18)] },
          { id: 'f', tipo: 'grupo', oculto: true, capas: [txt(331, 222, '✋', 60)] }
        ]
      },
      pasos: [
        { audio: 'tx_1', texto: 'Lo que sentimos al <b>tocar</b> se llama <b>textura</b>. ✋' },
        { audio: 'tx_2', texto: 'El algodón es <b>suave</b>.', mostrar: ['a', 'a2'], apuntar: [17, 18], resaltar: 'a' },
        { audio: 'tx_3', texto: 'Las ramitas son <b>rugosas</b>.', mostrar: ['r', 'r2'], apuntar: [50, 18], resaltar: 'r' },
        { audio: 'tx_4', texto: 'El papel glasé es <b>liso</b>.', mostrar: ['g', 'g2'], apuntar: [83, 18], resaltar: 'g' },
        { audio: 'tx_5', texto: 'Las hojas secas son <b>secas</b>: crujen.', mostrar: ['h', 'h2'], apuntar: [17, 66], resaltar: 'h' },
        { audio: 'tx_6', texto: 'La lana es <b>flexible</b>: se dobla.', mostrar: ['l', 'l2'], apuntar: [50, 66], resaltar: 'l' },
        { audio: 'tx_7', texto: '¡Cada material tiene su <b>textura</b>!', mostrar: ['f'] }
      ]
    },

    /* 2 — ¿Liso o rugoso? */
    {
      tipo: 'clasificarUno', titulo: '👆 ¿Liso o rugoso?', instr: 'lr_instr', err: 'lr_err',
      texto: '¿Es <b>liso</b> o <b>rugoso</b>?',
      categorias: [{ id: 'l', label: '🧈 Liso', sub: 'el dedo se desliza' }, { id: 'r', label: '🪵 Rugoso', sub: 'tiene bultitos' }],
      items: [
        foto('glase', { id: 'glase', cat: 'l', ok: 'lr_glase' }),
        foto('goma', { id: 'goma', cat: 'l', ok: 'lr_goma' }),
        foto('petalos', { id: 'petalos', cat: 'l', ok: 'lr_petalos' }),
        foto('ramitas', { id: 'ramitas', cat: 'r', ok: 'lr_ramitas' }),
        foto('hojas', { id: 'hojas', cat: 'r', ok: 'lr_hojas' })
      ]
    },

    /* 3 — ¿Seco o flexible? */
    {
      tipo: 'clasificarUno', titulo: '🍂 ¿Seco o flexible?', instr: 'sf_instr', err: 'sf_err',
      texto: '¿Es <b>seco</b> o <b>flexible</b>?',
      categorias: [{ id: 's', label: '🍂 Seco', sub: 'cruje y se rompe' }, { id: 'f', label: '🧶 Flexible', sub: 'se dobla' }],
      items: [
        foto('hojas', { id: 'hojas', cat: 's', ok: 'sf_hojas' }),
        foto('petalos', { id: 'petalos', cat: 's', ok: 'sf_petalos' }),
        foto('ramitas', { id: 'ramitas', cat: 's', ok: 'sf_ramitas' }),
        foto('lana', { id: 'lana', cat: 'f', ok: 'sf_lana' }),
        foto('tela', { id: 'tela', cat: 'f', ok: 'sf_tela' }),
        foto('goma', { id: 'goma', cat: 'f', ok: 'sf_goma' })
      ]
    },

    /* 4 — Asociar material con parte del jardín */
    {
      tipo: 'asociar', titulo: '🌳 ¿Dónde lo pegamos?', instr: 'as_instr', err: 'as_err',
      texto: 'Uní cada <b>material</b> con su lugar en el jardín.',
      pares: [
        { id: 'algodon', izq: foto('algodon'), der: { emoji: '☁️', label: 'nubes', audio: 'j_nubes' }, ok: 'as_algodon' },
        { id: 'hojas', izq: foto('hojas'), der: { emoji: '🌳', label: 'copa del árbol', audio: 'j_copa' }, ok: 'as_hojas' },
        { id: 'petalos', izq: foto('petalos'), der: { emoji: '🌸', label: 'flores', audio: 'j_flores' }, ok: 'as_petalos' },
        { id: 'ramitas', izq: foto('ramitas'), der: { emoji: '🪵', label: 'tronco y ramas', audio: 'j_tronco' }, ok: 'as_ramitas' },
        { id: 'lana', izq: foto('lana'), der: { emoji: '🌱', label: 'pasto', audio: 'j_pasto' }, ok: 'as_lana' },
        { id: 'glase', izq: foto('glase'), der: { emoji: '☀️', label: 'sol', audio: 'j_sol' }, ok: 'as_glase' }
      ]
    },

    /* 5 — ¿Cómo se siente? */
    {
      tipo: 'elegir', titulo: '🤔 ¿Cómo se siente?', instr: 'cs_instr', err: 'cs_err',
      rondas: [
        { texto: '¿Cómo se siente el <b>algodón</b>?', audio: 'cs_1', ok: 'cs_1ok', visual: foto('algodon'), correcta: 's',
          opciones: [{ id: 's', label: '☁️ suave y esponjoso' }, { id: 'r', label: '🪵 rugoso y áspero' }, { id: 'd', label: '🧊 duro y frío' }] },
        { texto: '¿Cómo se sienten las <b>ramitas</b>?', audio: 'cs_2', ok: 'cs_2ok', visual: foto('ramitas'), correcta: 'r',
          opciones: [{ id: 's', label: '☁️ suaves y esponjosas' }, { id: 'r', label: '🪵 rugosas, con bultitos' }, { id: 'l', label: '🧈 lisas' }] },
        { texto: '¿Cómo se siente el <b>papel glasé</b>?', audio: 'cs_3', ok: 'cs_3ok', visual: foto('glase'), correcta: 'l',
          opciones: [{ id: 'r', label: '🪵 rugoso' }, { id: 'l', label: '🧈 liso, el dedo se desliza' }, { id: 'e', label: '☁️ esponjoso' }] },
        { texto: '¿Cómo es la <b>lana</b>?', audio: 'cs_4', ok: 'cs_4ok', visual: foto('lana'), correcta: 'f',
          opciones: [{ id: 's', label: '🍂 seca, se rompe' }, { id: 'f', label: '🧶 flexible, se dobla' }, { id: 'd', label: '🪨 dura como una piedra' }] }
      ]
    },

    /* 6 — Taller */
    {
      tipo: 'taller', titulo: '🌷 Mi jardín para tocar', instr: 'ta_instr',
      herramientas: ['lapiz', 'sello', 'balde', 'mancha', 'goma'],
      sellos: ['flor', 'hoja', 'arbol', 'nube', 'sol', 'circulo'],
      colores: ['negro', 'verde', 'marron', 'rojo', 'rosa', 'amarillo', 'naranja', 'celeste', 'azul', 'violeta'],
      texturas: Object.keys(TX).map(id => ({ id, img: TX[id].img, n: TX[id].n, audio: 'n_' + id })),
      archivo: 'mi-jardin-para-tocar.png'
    },

    /* 7 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Dibujá un jardín con flores, plantas y árboles, o un bosque. 🌷🌳' },
        { audio: 'pp_2', texto: '<b>2.</b> Pegá los materiales sobre el dibujo para crear distintas <b>texturas</b>.' },
        { audio: 'pp_3', texto: '🧰 <b>Materiales:</b> hoja o cartón, hojas caídas, pétalos secos, ramitas, papel glasé, lana, algodón, goma eva o tela.' },
        { audio: 'pp_4', texto: '🧑‍🧒 Juntá hojas, pétalos y ramitas con un adulto: <b>limpios y seguros</b>.' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mi jardín en papel', instr: 'fo_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu jardín, o <b>🖼️ Elegir de la galería</b> para buscar el que guardaste en el taller.', boton: 'fo_boton', ok: 'fo_ok', img: 'img/foto.jpg',
      archivo: 'mi-jardin-en-papel.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi jardín', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 300, h: 225, capas: [{ tipo: 'img', src: 'img/tx_algodon.jpg', x: 0, y: 0, w: 150, h: 112 }, { tipo: 'img', src: 'img/tx_hojas.jpg', x: 150, y: 0, w: 150, h: 112 },
        { tipo: 'img', src: 'img/tx_lana.jpg', x: 0, y: 112, w: 150, h: 113 }, { tipo: 'img', src: 'img/tx_petalos.jpg', x: 150, y: 112, w: 150, h: 113 }] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Dibujé un jardín con <b>flores, plantas o árboles</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Pegué <b>materiales distintos</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Hay partes <b>lisas</b> y partes <b>rugosas</b>?' }
      ]
    },

    /* 10 — Familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Invitá a tu familia a tocar tu jardín y contales: <b>¿qué elementos se sienten lisos?</b>' },
        { audio: 'fa_2', texto: '<b>¿Qué elementos son rugosos?</b>' },
        { audio: 'fa_3', texto: '<b>¿Qué elementos son secos y cuáles flexibles?</b>' },
        { audio: 'fa_4', texto: '📁 Guardá tu trabajo en la carpeta de <b>Artes Visuales</b>.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
