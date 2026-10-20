/* ============================================================
   UN PAISAJE QUE SE PUEDE TOCAR — Artes Visuales · 2.º grado
   Reconocimiento de texturas táctiles
   Basado en la Ficha Viajera de Artes Visuales (Propuesta breve 2)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  celeste: '#6cc4f0', azul: '#1f64d6', blanco: '#ffffff', amarillo: '#ffd21f', naranja: '#ff8a1e', rojo: '#e8262f',
  verde: '#2fae4a', verdeOsc: '#1e6b34', marron: '#8a5a2b', rosa: '#ff70a6', violeta: '#8a3fb8', negro: '#1b1b1b'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };

const TX = {
  algodon: { n: 'algodón', img: 'img/tx_algodon.jpg' },
  hojas: { n: 'hojas secas', img: 'img/tx_hojas.jpg' },
  ramitas: { n: 'ramitas', img: 'img/tx_ramitas.jpg' },
  tela: { n: 'tela', img: 'img/tx_tela.jpg' },
  goma: { n: 'goma eva', img: 'img/tx_goma.jpg' },
  glase: { n: 'papel glasé', img: 'img/tx_glase.jpg' }
};
const foto = (id, extra) => Object.assign({ img: TX[id].img, label: TX[id].n, audio: 'n_' + id }, extra || {});
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const tile = (id, x, y, gid, lab) => ({ id: gid, tipo: 'grupo', oculto: true, capas: [
  { tipo: 'rect', x: x - 3, y: y - 3, w: 130, h: 102, rx: 10, fill: '#ffffff', stroke: '#eadcc6' },
  { tipo: 'img', src: TX[id].img, x, y, w: 124, h: 96 }, txt(x + 62, y + 118, lab, 18)
] });
const emo = (e, label, extra) => Object.assign({ emoji: e, label }, extra || {});

window.DATOS = {
  meta: {
    titulo: 'Un paisaje que se puede tocar',
    subtitulo: 'Cielo, tierra y texturas',
    area: '🎨 Artes Visuales · 2.º grado',
    grado: 'Artes Visuales · 2.º grado',
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
    portada: '¡Hola! Bienvenidos a Un paisaje que se puede tocar. Vamos a ubicar las cosas en el cielo y en la tierra, a conocer las texturas, y al final vas a crear un paisaje que se pueda tocar. Tocá Comenzar.',

    n_algodon: 'Algodón.', n_hojas: 'Hojas secas.', n_ramitas: 'Ramitas.', n_tela: 'Tela.', n_goma: 'Goma eva.', n_glase: 'Papel glasé.',
    e_sol: 'El sol.', e_nube: 'Una nube.', e_pajaro: 'Un pájaro.', e_luna: 'La luna.', e_arbol: 'Un árbol.', e_flor: 'Una flor.', e_casa: 'Una casa.', e_piedra: 'Una piedra.',

    /* 1 — cielo y tierra */
    ct_1: 'Para hacer un paisaje, primero dividimos la hoja en dos partes con una línea.',
    ct_2: 'Arriba va el cielo.',
    ct_3: 'Abajo va la tierra.',
    ct_4: 'En el cielo ubicamos el sol, las nubes y los pájaros.',
    ct_5: 'En la tierra ubicamos las plantas, los árboles, las flores y las casas.',

    /* 2 — ¿cielo o tierra? */
    ct_instr: 'Mirá cada elemento y escuchá su nombre. ¿Va en el cielo o en la tierra? Tocá la respuesta.',
    ct_err: 'Pensalo otra vez. ¿Está arriba, en el cielo, o abajo, en la tierra?',
    ct_sol: '¡Sí! El sol va en el cielo.',
    ct_nube: '¡Muy bien! Las nubes van en el cielo.',
    ct_pajaro: '¡Correcto! El pájaro vuela por el cielo.',
    ct_luna: '¡Exacto! La luna está en el cielo.',
    ct_arbol: '¡Sí! El árbol va en la tierra.',
    ct_flor: '¡Muy bien! Las flores crecen en la tierra.',
    ct_casa: '¡Correcto! La casa va en la tierra.',
    ct_piedra: '¡Bien! La piedra está en la tierra.',

    /* 3 — texturas */
    tx_1: 'Cuando tocamos los materiales, cada uno se siente distinto. Eso es la textura.',
    tx_2: 'El algodón es suave y esponjoso.',
    tx_3: 'La tela también es suave.',
    tx_4: 'Las ramitas y las hojas secas son rugosas: tienen bultitos y arruguitas.',
    tx_5: 'La goma eva y el papel glasé son lisos: el dedo se desliza.',

    /* 4 — suave, rugoso o liso */
    sr_instr: 'Mirá cada material y escuchá su nombre. ¿Es suave, rugoso o liso? Tocá la respuesta.',
    sr_err: 'Imaginá que lo tocás con el dedo y probá otra vez.',
    sr_algodon: '¡Sí! El algodón es suave y esponjoso.',
    sr_tela: '¡Muy bien! La tela es suave.',
    sr_ramitas: '¡Correcto! Las ramitas son rugosas.',
    sr_hojas: '¡Exacto! Las hojas secas son rugosas.',
    sr_goma: '¡Bien! La goma eva es lisa.',
    sr_glase: '¡Muy bien! El papel glasé es liso.',

    /* 5 — qué material */
    qm_instr: 'Vamos a armar el paisaje. ¿Qué material usarías para cada parte? Tocá la respuesta.',
    qm_err: 'Mmm, pensá cómo se ve y cómo se siente esa parte del paisaje.',
    qm_1: '¿Qué material usarías para las nubes?',
    qm_1ok: '¡Sí! El algodón es blanco, suave y esponjoso, como una nube.',
    qm_2: '¿Qué material usarías para el tronco del árbol?',
    qm_2ok: '¡Muy bien! Las ramitas son rugosas, como la corteza del árbol.',
    qm_3: '¿Qué material usarías para la tierra del suelo?',
    qm_3ok: '¡Correcto! Las hojas secas le dan a la tierra una textura rugosa.',
    qm_4: '¿Qué material usarías para un cielo liso y celeste?',
    qm_4ok: '¡Exacto! El papel glasé celeste es liso, como un cielo tranquilo.',

    /* 6 — taller */
    ta_instr: '¡Creá tu paisaje! La hoja ya está dividida: arriba el cielo y abajo la tierra. Dibujá con el lápiz y con las formas, y después elegí una textura y usá el balde para rellenar el cielo, las nubes, la tierra y los árboles.',
    t_lapiz: 'Lápiz, para dibujar.',
    t_mancha: 'Manchas.',
    t_sello: 'Formas. Elegí una forma y tocá el cuadro.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla con el color o la textura.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Empezar de nuevo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    p_guardar: '¡Tu paisaje quedó guardado!',

    /* 7 — en papel */
    pp_1: 'Ahora hacelo en papel. Paso uno: dividí la hoja en dos con una línea, y dibujá el cielo y la tierra.',
    pp_2: 'Paso dos: ubicá los elementos del paisaje en su lugar. Nubes y sol en el cielo. Plantas, árboles y demás elementos en la tierra.',
    pp_3: 'Paso tres: pegá los materiales sobre el dibujo para crear distintas texturas.',
    pp_4: 'Necesitás una hoja blanca o cartón, algodón, hojas secas, ramitas, y retazos de tela o de goma eva. Podés agregar otros materiales que tengas en casa.',

    /* 8 — foto */
    fo_instr: 'Cuando termines tu paisaje en papel, pulsá el botón Sacar foto para fotografiarlo. O también podés elegir el paisaje que guardaste en el taller, pulsando el botón Elegir de la galería.',
    fo_boton: 'Sacar una foto.',
    fo_ok: '¡Qué lindo paisaje! Tocá Guardar para tenerlo en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Mirá tu paisaje y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Dividí la hoja en cielo y tierra?',
    ae_1si: '¡Muy bien! Tu paisaje tiene cielo y tierra.',
    ae_1no: 'Podés trazar una línea para separar el cielo de la tierra.',
    ae_2: '¿Cada elemento está en su lugar?',
    ae_2si: '¡Genial! Todo está en su lugar.',
    ae_2no: 'Revisá: el sol y las nubes van arriba, y los árboles abajo.',
    ae_3: '¿Pegué materiales con distintas texturas?',
    ae_3si: '¡Excelente! Tu paisaje se puede tocar.',
    ae_3no: 'Probá pegar algodón, hojas secas o ramitas.',
    ae_fin: 'Gracias por mirar tu paisaje con atención. Mirar lo que hicimos también es parte del arte.',

    /* 10 — familia */
    fa_1: 'Mostrale tu paisaje a tu familia, invitalos a tocarlo y contales: ¿cómo se siente el cielo?',
    fa_2: '¿Cómo se sienten las nubes?',
    fa_3: '¿Cómo se siente la tierra?',
    fa_4: 'Por último, guardá tu trabajo en la carpeta de Artes Visuales.',

    cierre: '¡Terminaste! Aprendiste a dividir el paisaje en cielo y tierra, y a crear texturas suaves, rugosas y lisas. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Cielo y tierra */
    {
      tipo: 'narracion', titulo: '🏞️ Cielo y tierra',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#ffffff' },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 0, y: 0, w: 400, h: 150, fill: '#bfe6fb' }, txt(200, 85, 'cielo', 30, '#1f64d6')] },
          { id: 't', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 0, y: 150, w: 400, h: 150, fill: '#cde8b5' }, txt(200, 235, 'tierra', 30, '#1e6b34')] },
          { id: 'l', tipo: 'grupo', capas: [{ tipo: 'path', d: 'M0 150L400 150', stroke: '#2b2118', sw: 5 }] },
          { id: 'ec', tipo: 'grupo', oculto: true, capas: [txt(60, 70, '☀️', 54), txt(300, 60, '☁️', 50), txt(200, 40, '🐦', 30), txt(355, 115, '☁️', 34)] },
          { id: 'et', tipo: 'grupo', oculto: true, capas: [txt(60, 245, '🌳', 64), txt(150, 275, '🌷', 36), txt(305, 255, '🏠', 56), txt(370, 285, '🌱', 30)] }
        ]
      },
      pasos: [
        { audio: 'ct_1', texto: 'Dividimos la hoja en <b>dos partes</b> con una línea.', apuntar: [50, 47], resaltar: 'l' },
        { audio: 'ct_2', texto: 'Arriba, el <b>cielo</b>. ☁️', mostrar: ['c'], apuntar: [55, 25], resaltar: 'c' },
        { audio: 'ct_3', texto: 'Abajo, la <b>tierra</b>. 🌱', mostrar: ['t'], apuntar: [55, 75], resaltar: 't' },
        { audio: 'ct_4', texto: 'En el cielo: <b>sol, nubes, pájaros</b>.', mostrar: ['ec'], apuntar: [72, 14], resaltar: 'ec' },
        { audio: 'ct_5', texto: 'En la tierra: <b>plantas, árboles, flores, casas</b>.', mostrar: ['et'], apuntar: [74, 78], resaltar: 'et' }
      ]
    },

    /* 2 — ¿Cielo o tierra? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Cielo o tierra?', instr: 'ct_instr', err: 'ct_err',
      texto: '¿Dónde va?',
      categorias: [{ id: 'c', label: '☁️ Cielo', sub: 'arriba' }, { id: 't', label: '🌱 Tierra', sub: 'abajo' }],
      items: [
        emo('☀️', 'el sol', { id: 'sol', cat: 'c', audio: 'e_sol', ok: 'ct_sol' }),
        emo('☁️', 'una nube', { id: 'nube', cat: 'c', audio: 'e_nube', ok: 'ct_nube' }),
        emo('🐦', 'un pájaro', { id: 'pajaro', cat: 'c', audio: 'e_pajaro', ok: 'ct_pajaro' }),
        emo('🌙', 'la luna', { id: 'luna', cat: 'c', audio: 'e_luna', ok: 'ct_luna' }),
        emo('🌳', 'un árbol', { id: 'arbol', cat: 't', audio: 'e_arbol', ok: 'ct_arbol' }),
        emo('🌷', 'una flor', { id: 'flor', cat: 't', audio: 'e_flor', ok: 'ct_flor' }),
        emo('🏠', 'una casa', { id: 'casa', cat: 't', audio: 'e_casa', ok: 'ct_casa' }),
        emo('🪨', 'una piedra', { id: 'piedra', cat: 't', audio: 'e_piedra', ok: 'ct_piedra' })
      ]
    },

    /* 3 — Texturas */
    {
      tipo: 'narracion', titulo: '✋ Las texturas',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          tile('algodon', 7, 14, 'a', 'suave'), tile('tela', 138, 14, 'te', 'suave'),
          tile('ramitas', 7, 158, 'r', 'rugoso'), tile('hojas', 138, 158, 'h', 'rugoso'),
          tile('goma', 269, 14, 'g', 'liso'), tile('glase', 269, 158, 'gl', 'liso')
        ]
      },
      pasos: [
        { audio: 'tx_1', texto: 'Cada material se siente distinto: es su <b>textura</b>. ✋' },
        { audio: 'tx_2', texto: 'El algodón es <b>suave</b>.', mostrar: ['a'], apuntar: [17, 18], resaltar: 'a' },
        { audio: 'tx_3', texto: 'La tela también es <b>suave</b>.', mostrar: ['te'], apuntar: [50, 18], resaltar: 'te' },
        { audio: 'tx_4', texto: 'Ramitas y hojas secas son <b>rugosas</b>.', mostrar: ['r', 'h'], apuntar: [33, 66] },
        { audio: 'tx_5', texto: 'La goma eva y el papel glasé son <b>lisos</b>.', mostrar: ['g', 'gl'], apuntar: [83, 42] }
      ]
    },

    /* 4 — Suave, rugoso o liso */
    {
      tipo: 'clasificarUno', titulo: '👆 ¿Suave, rugoso o liso?', instr: 'sr_instr', err: 'sr_err',
      texto: '¿Cómo se siente?',
      categorias: [{ id: 's', label: '☁️ Suave', sub: '' }, { id: 'r', label: '🪵 Rugoso', sub: '' }, { id: 'l', label: '🧈 Liso', sub: '' }],
      items: [
        foto('algodon', { id: 'algodon', cat: 's', ok: 'sr_algodon' }),
        foto('tela', { id: 'tela', cat: 's', ok: 'sr_tela' }),
        foto('ramitas', { id: 'ramitas', cat: 'r', ok: 'sr_ramitas' }),
        foto('hojas', { id: 'hojas', cat: 'r', ok: 'sr_hojas' }),
        foto('goma', { id: 'goma', cat: 'l', ok: 'sr_goma' }),
        foto('glase', { id: 'glase', cat: 'l', ok: 'sr_glase' })
      ]
    },

    /* 5 — ¿Qué material usarías? */
    {
      tipo: 'elegir', titulo: '🧩 ¿Qué material usarías?', instr: 'qm_instr', err: 'qm_err',
      rondas: [
        { texto: 'Para las <b>nubes</b> ☁️', audio: 'qm_1', ok: 'qm_1ok', correcta: 'algodon',
          opciones: [{ id: 'algodon', ...foto('algodon') }, { id: 'ramitas', ...foto('ramitas') }, { id: 'hojas', ...foto('hojas') }] },
        { texto: 'Para el <b>tronco del árbol</b> 🌳', audio: 'qm_2', ok: 'qm_2ok', correcta: 'ramitas',
          opciones: [{ id: 'algodon', ...foto('algodon') }, { id: 'ramitas', ...foto('ramitas') }, { id: 'glase', ...foto('glase') }] },
        { texto: 'Para la <b>tierra</b> del suelo 🌱', audio: 'qm_3', ok: 'qm_3ok', correcta: 'hojas',
          opciones: [{ id: 'hojas', ...foto('hojas') }, { id: 'algodon', ...foto('algodon') }, { id: 'glase', ...foto('glase') }] },
        { texto: 'Para un <b>cielo liso</b> y celeste 🌤️', audio: 'qm_4', ok: 'qm_4ok', correcta: 'glase',
          opciones: [{ id: 'ramitas', ...foto('ramitas') }, { id: 'glase', ...foto('glase') }, { id: 'hojas', ...foto('hojas') }] }
      ]
    },

    /* 6 — Taller */
    {
      tipo: 'taller', titulo: '🏞️ Mi paisaje para tocar', instr: 'ta_instr',
      plantilla: 'horizonte',
      herramientas: ['lapiz', 'sello', 'balde', 'mancha', 'goma'],
      sellos: ['sol', 'nube', 'arbol', 'flor', 'montania', 'casa', 'hoja'],
      colores: ['negro', 'celeste', 'azul', 'blanco', 'amarillo', 'naranja', 'rojo', 'rosa', 'verde', 'verdeOsc', 'marron', 'violeta'],
      texturas: Object.keys(TX).map(id => ({ id, img: TX[id].img, n: TX[id].n, audio: 'n_' + id })),
      archivo: 'mi-paisaje-para-tocar.png'
    },

    /* 7 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Dividí la hoja en dos: arriba el <b>cielo</b>, abajo la <b>tierra</b>.' },
        { audio: 'pp_2', texto: '<b>2.</b> Ubicá cada elemento en su lugar: ☀️☁️ en el cielo, 🌳🌷🏠 en la tierra.' },
        { audio: 'pp_3', texto: '<b>3.</b> Pegá los materiales sobre el dibujo para crear <b>texturas</b>.' },
        { audio: 'pp_4', texto: '🧰 <b>Materiales:</b> hoja o cartón, algodón, hojas secas, ramitas, retazos de tela o goma eva.' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mi paisaje en papel', instr: 'fo_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu paisaje, o <b>🖼️ Elegir de la galería</b> para buscar el que guardaste en el taller.', boton: 'fo_boton', ok: 'fo_ok', img: 'img/foto.jpg',
      archivo: 'mi-paisaje-en-papel.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi paisaje', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 300, h: 225, capas: [{ tipo: 'img', src: 'img/tx_glase.jpg', x: 0, y: 0, w: 300, h: 112 }, { tipo: 'img', src: 'img/tx_hojas.jpg', x: 0, y: 112, w: 300, h: 113 },
        { tipo: 'path', d: 'M0 112L300 112', stroke: '#2b2118', sw: 4 }, txt(90, 70, '☁️', 50), txt(230, 60, '☀️', 44), txt(80, 205, '🌳', 64), txt(220, 210, '🌷', 40)] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Dividí la hoja en <b>cielo</b> y <b>tierra</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Cada elemento está <b>en su lugar</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Pegué materiales con <b>distintas texturas</b>?' }
      ]
    },

    /* 10 — Familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Invitá a tu familia a tocar tu paisaje y contales: <b>¿cómo se siente el cielo?</b>' },
        { audio: 'fa_2', texto: '<b>¿Cómo se sienten las nubes?</b>' },
        { audio: 'fa_3', texto: '<b>¿Cómo se siente la tierra?</b>' },
        { audio: 'fa_4', texto: '📁 Guardá tu trabajo en la carpeta de <b>Artes Visuales</b>.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
