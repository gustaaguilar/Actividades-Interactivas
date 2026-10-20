/* ============================================================
   COLORES QUE SE LLEVAN BIEN Y COLORES QUE CONTRASTAN
   Artes Visuales · 6.º grado — Armonía y contraste
   Basado en la Ficha Viajera N.º 1 de Artes Visuales · 6.º grado
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

/* círculo cromático (mismo orden que el motor): 0 amarillo … 11 amarillo verdoso */
const RUEDA = ['#f4e500', '#fdc60b', '#f18e1c', '#ea621f', '#e32322', '#c4037d', '#6d398b', '#454e99', '#2a71b0', '#0696bb', '#008e5b', '#8cbb26'];
const COL = {
  amarillo: RUEDA[0], amarilloNaranja: RUEDA[1], naranja: RUEDA[2], rojoNaranja: RUEDA[3], rojo: RUEDA[4], magenta: RUEDA[5],
  violeta: RUEDA[6], azulVioleta: RUEDA[7], azul: RUEDA[8], celeste: RUEDA[9], verde: RUEDA[10], verdeAmarillo: RUEDA[11],
  blanco: '#ffffff', grisClaro: '#cfcfcf', grisOscuro: '#5a5a5a', negro: '#1b1b1b'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const rueda = (extra) => Object.assign({ tipo: 'rueda', cx: 200, cy: 150, r: 130, ri: 66 }, extra || {});
/* paisaje pequeño pintado con una paleta: [cielo, montaña, colina, sol, árbol] */
function paisaje(c) {
  return { w: 300, h: 225, capas: [
    { tipo: 'rect', fill: c[0] },
    { tipo: 'forma', forma: 'montania', cx: 110, cy: 120, size: 170, fill: c[1] },
    { tipo: 'path', d: 'M0 170Q80 130 160 165T300 150L300 225L0 225Z', fill: c[2], stroke: c[2], sw: 1 },
    { tipo: 'forma', forma: 'circulo', cx: 240, cy: 55, size: 54, fill: c[3] },
    { tipo: 'forma', forma: 'arbol', cx: 225, cy: 150, size: 90, fill: c[4] }
  ] };
}
const ARM1 = [RUEDA[9], RUEDA[8], RUEDA[10], RUEDA[11], RUEDA[7]];
const ARM2 = [RUEDA[1], RUEDA[3], RUEDA[2], RUEDA[0], RUEDA[4]];
const ARM3 = [RUEDA[11], RUEDA[10], RUEDA[0], RUEDA[1], RUEDA[9]];
const CON1 = [RUEDA[6], RUEDA[8], RUEDA[10], RUEDA[0], RUEDA[4]];
const CON2 = ['#1b1b1b', RUEDA[8], RUEDA[2], RUEDA[0], RUEDA[4]];
const CON3 = [RUEDA[0], RUEDA[6], RUEDA[10], RUEDA[4], RUEDA[8]];
const blob = (c) => ({ color: c });

window.DATOS = {
  meta: {
    titulo: 'Colores que se llevan bien y colores que contrastan',
    subtitulo: 'Armonía y contraste',
    area: '🎨 Artes Visuales · 6.º grado',
    grado: 'Artes Visuales · 6.º grado',
    fuente: 'Basado en la Ficha Viajera N.º 1 de Artes Visuales · 6.º grado',
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
    portada: '¡Hola! Bienvenidos a Colores que se llevan bien y colores que contrastan. Vamos a usar el círculo cromático para descubrir la armonía y el contraste, y a crear dos dibujos que comuniquen cosas distintas. Tocá Comenzar.',

    c_rojo: 'Rojo.', c_naranja: 'Naranja.', c_amarillo: 'Amarillo.', c_rojoNaranja: 'Rojo anaranjado.',
    c_azul: 'Azul.', c_celeste: 'Celeste.', c_verde: 'Verde.', c_azulVioleta: 'Azul violáceo.', c_violeta: 'Violeta.',

    /* 1 — círculo cromático */
    cc_1: 'Este es el círculo cromático: los colores ordenados en una rueda.',
    cc_2: 'Los primarios: amarillo, rojo y azul.',
    cc_3: 'Entre ellos están los secundarios: naranja, violeta y verde.',
    cc_4: 'Y entre cada primario y cada secundario, los colores intermedios. El círculo nos ayuda a combinar colores.',

    /* 2 — armonía */
    ar_1: 'Algunos colores se llevan bien: son parecidos o vecinos en el círculo.',
    ar_2: 'Por ejemplo, los verdes, celestes y azules están uno al lado del otro.',
    ar_3: 'Si pintamos con colores vecinos, la imagen se ve agradable, con unidad. Eso es armonía.',

    /* 3 — contraste */
    co_1: 'Otros colores se diferencian mucho: están enfrentados en el círculo. Se llaman complementarios.',
    co_2: 'El amarillo y el violeta son opuestos.',
    co_3: 'El rojo y el verde, también.',
    co_4: 'Y el azul y el naranja. Juntos, se destacan muchísimo: eso es contraste.',
    co_5: 'También hay contraste entre claros y oscuros, y entre colores cálidos y fríos.',

    /* 4 — paletas */
    pa_instr: 'Mirá las paletas de colores y elegí la que se pide. Tocá la paleta.',
    pa_err: 'Mirá otra vez dónde están esos colores en el círculo.',
    pa_1: '¿Qué paleta tiene armonía?',
    pa_1ok: '¡Muy bien! Son colores vecinos en el círculo: amarillos y naranjas.',
    pa_2: '¿Qué paleta tiene contraste?',
    pa_2ok: '¡Excelente! Tiene colores opuestos y claros con oscuros.',
    pa_3: '¿Qué paleta tiene armonía?',
    pa_3ok: '¡Correcto! Verdes, celestes y azules: colores vecinos.',

    /* 5 — complementario */
    cm_instr: 'Mirá el color marcado en el círculo. ¿Cuál es su complementario, el que está enfrente? Tocá la respuesta.',
    cm_err: 'Buscá en el círculo el color que está justo del otro lado.',
    cm_1: '¿Cuál es el complementario del amarillo?',
    cm_1ok: '¡Sí! El violeta está enfrente del amarillo.',
    cm_2: '¿Cuál es el complementario del rojo?',
    cm_2ok: '¡Muy bien! El verde está enfrente del rojo.',
    cm_3: '¿Cuál es el complementario del azul?',
    cm_3ok: '¡Correcto! El naranja está enfrente del azul.',

    /* 6 — armonía o contraste */
    ac_instr: 'Mirá cada paisaje. ¿Tiene armonía, con colores parecidos, o contraste, con colores muy diferentes? Tocá la respuesta.',
    ac_err: 'Mirá otra vez los colores: ¿son vecinos o están enfrentados?',
    ac_a: '¡Sí! Tiene armonía: los colores son parecidos y se relacionan.',
    ac_c: '¡Muy bien! Tiene contraste: los colores se diferencian mucho y algo llama la atención.',

    /* 7 — cálidos y fríos */
    cf_instr: 'Mirá cada color y escuchá su nombre. ¿Es cálido, como el fuego y el sol, o frío, como el agua y el hielo? Tocá la respuesta.',
    cf_err: 'Pensá: ¿te hace acordar al fuego o al agua?',
    cf_rojo: '¡Sí! El rojo es cálido.',
    cf_naranja: '¡Muy bien! El naranja es cálido.',
    cf_amarillo: '¡Correcto! El amarillo es cálido, como el sol.',
    cf_rojoNaranja: '¡Exacto! El rojo anaranjado es cálido.',
    cf_azul: '¡Sí! El azul es frío.',
    cf_celeste: '¡Muy bien! El celeste es frío, como el agua.',
    cf_verde: '¡Correcto! El verde es frío, como las hojas a la sombra.',
    cf_azulVioleta: '¡Exacto! El azul violáceo es frío.',

    /* 8 — taller */
    ta_instr: '¡A crear! La hoja está dividida en dos. En la parte A hacé un dibujo con colores parecidos, para lograr armonía. En la parte B, otro dibujo con colores muy diferentes, para lograr contraste. Usá las formas, el lápiz y el balde para pintar.',
    t_sello: 'Formas. Elegí una y tocá el cuadro.',
    t_lapiz: 'Lápiz.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla.',
    t_mancha: 'Manchas.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    p_guardar: '¡Tu obra quedó guardada!',

    /* 9 — en papel */
    pp_1: 'Ahora en papel. Dividí la hoja en dos partes.',
    pp_2: 'Parte A, armonía: dibujá un pequeño paisaje, jardín, habitación o paisaje imaginario. Elegí colores parecidos o cercanos entre sí, que se vean agradables y relacionados.',
    pp_3: 'Parte B, contraste: hacé otro dibujo diferente. Elegí colores que se diferencien mucho: claros y oscuros, o cálidos y fríos. Buscá que alguna parte llame especialmente la atención.',
    pp_4: 'Un último desafío: elegí uno de los dos dibujos y cambiá solamente los colores. ¿La imagen transmite la misma sensación, o cambia?',
    pp_5: 'Necesitás una hoja de la carpeta, lápiz, goma, y lápices de colores, fibras o crayones.',

    /* 10 — foto */
    ft_instr: 'Cuando termines tus dibujos en papel, pulsá el botón Sacar foto para fotografiarlos. O también podés elegir el que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Muy buen trabajo con los colores! Tocá Guardar para tenerlo en tu celular.',

    /* 11 — autoevaluación */
    ae_instr: 'Observá tus dibujos y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿En la parte A usé colores parecidos o vecinos?',
    ae_1si: '¡Muy bien! Lograste armonía.',
    ae_1no: 'Probá elegir colores que estén cerca en el círculo.',
    ae_2: '¿En la parte B usé colores muy diferentes?',
    ae_2si: '¡Genial! Lograste contraste.',
    ae_2no: 'Probá con colores opuestos, o claros con oscuros.',
    ae_3: '¿Alguna parte de mi dibujo llama especialmente la atención?',
    ae_3si: '¡Excelente! El contraste ayuda a destacar.',
    ae_3no: 'Pintá esa parte con un color opuesto al de alrededor.',
    ae_fin: 'Gracias por observar tus dibujos con atención. Mirar lo que hicimos también es parte del arte.',

    /* 12 — observá */
    ob_1: 'Respondé en tu carpeta: ¿cuál de tus dibujos tiene armonía? ¿Cuál tiene contraste?',
    ob_2: '¿En cuál se destaca más una parte de la imagen? ¿Por qué?',
    ob_3: 'Recordá: armonía es la combinación de colores que tienen relación o semejanza. Contraste es la combinación de colores que se diferencian y generan mayor destaque.',
    ob_4: 'Los colores que elegimos pueden cambiar la manera en que observamos y sentimos una imagen. Guardá tu producción en la carpeta.',

    cierre: '¡Terminaste! Aprendiste que los colores también pueden comunicar: con armonía logramos unidad, y con contraste hacemos que algo se destaque. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Círculo cromático */
    {
      tipo: 'narracion', titulo: '🎡 El círculo cromático',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 't', tipo: 'grupo', capas: [rueda()] },
          { id: 'p', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' }, rueda({ marcar: [0, 4, 8] }), txt(200, 158, 'primarios', 18)] },
          { id: 's', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' }, rueda({ marcar: [0, 2, 4, 6, 8, 10] }), txt(200, 158, 'secundarios', 18)] },
          { id: 'i', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' }, rueda(), txt(200, 158, 'intermedios', 18)] }
        ]
      },
      pasos: [
        { audio: 'cc_1', texto: 'El <b>círculo cromático</b>: los colores ordenados en una rueda. 🎡', apuntar: [50, 15], resaltar: 't' },
        { audio: 'cc_2', texto: '<b>Primarios</b>: amarillo, rojo y azul.', mostrar: ['p'], apuntar: [52, 8] },
        { audio: 'cc_3', texto: '<b>Secundarios</b>: naranja, violeta y verde.', mostrar: ['s'], apuntar: [78, 30] },
        { audio: 'cc_4', texto: 'Entre ellos, los colores <b>intermedios</b>.', mostrar: ['i'] }
      ]
    },

    /* 2 — Armonía */
    {
      tipo: 'narracion', titulo: '🤝 Armonía',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'r', tipo: 'grupo', capas: [rueda({ cx: 110, cy: 150, r: 95, ri: 48 })] },
          { id: 'v', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 0, y: 0, w: 215, h: 300, fill: '#fffdf5' }, rueda({ cx: 110, cy: 150, r: 95, ri: 48, marcar: [7, 8, 9, 10] })] },
          { id: 'e', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 225, y: 75, w: 166, h: 150, rx: 10, fill: '#ffffff', stroke: '#eadcc6' },
            { tipo: 'rect', x: 230, y: 80, w: 156, h: 140, fill: RUEDA[9] }, { tipo: 'forma', forma: 'montania', cx: 290, cy: 160, size: 110, fill: RUEDA[8] },
            { tipo: 'path', d: 'M230 190Q290 165 386 185L386 220L230 220Z', fill: RUEDA[10], stroke: RUEDA[10], sw: 1 }, { tipo: 'forma', forma: 'arbol', cx: 350, cy: 175, size: 60, fill: RUEDA[11] }, txt(308, 252, 'armonía', 22)] }
        ]
      },
      pasos: [
        { audio: 'ar_1', texto: 'Colores que se <b>llevan bien</b>: parecidos o <b>vecinos</b>.', apuntar: [27, 22], resaltar: 'r' },
        { audio: 'ar_2', texto: 'Verdes, celestes y azules: uno al lado del otro.', mostrar: ['v'], apuntar: [12, 40] },
        { audio: 'ar_3', texto: 'Pintar con vecinos da <b>unidad</b>: eso es <b>armonía</b>. 🤝', mostrar: ['e'], apuntar: [77, 50], resaltar: 'e' }
      ]
    },

    /* 3 — Contraste */
    {
      tipo: 'narracion', titulo: '⚡ Contraste',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'r', tipo: 'grupo', capas: [rueda()] },
          { id: 'a', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' }, rueda({ marcar: [0, 6], flecha: [0, 6] })] },
          { id: 'b', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' }, rueda({ marcar: [4, 10], flecha: [4, 10] })] },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' }, rueda({ marcar: [8, 2], flecha: [8, 2] })] },
          { id: 'd', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#fffdf5' },
            { tipo: 'rect', x: 30, y: 60, w: 160, h: 160, fill: '#1b1b1b' }, { tipo: 'forma', forma: 'estrella', cx: 110, cy: 140, size: 120, fill: '#fff4b0' }, txt(110, 250, 'claro y oscuro', 18),
            { tipo: 'rect', x: 210, y: 60, w: 160, h: 160, fill: RUEDA[8] }, { tipo: 'forma', forma: 'sol', cx: 290, cy: 140, size: 120, fill: RUEDA[2] }, txt(290, 250, 'cálido y frío', 18)] }
        ]
      },
      pasos: [
        { audio: 'co_1', texto: 'Colores <b>enfrentados</b> en el círculo: los <b>complementarios</b>.', apuntar: [50, 15], resaltar: 'r' },
        { audio: 'co_2', texto: '<b style="color:#c9b400">amarillo</b> ↔ <b style="color:#6d398b">violeta</b>', mostrar: ['a'] },
        { audio: 'co_3', texto: '<b style="color:#e32322">rojo</b> ↔ <b style="color:#008e5b">verde</b>', mostrar: ['b'] },
        { audio: 'co_4', texto: '<b style="color:#2a71b0">azul</b> ↔ <b style="color:#f18e1c">naranja</b>: ¡<b>contraste</b>! ⚡', mostrar: ['c'] },
        { audio: 'co_5', texto: 'También: <b>claros y oscuros</b>, <b>cálidos y fríos</b>.', mostrar: ['d'], apuntar: [50, 45] }
      ]
    },

    /* 4 — Paletas */
    {
      tipo: 'elegir', titulo: '🎨 Elegí la paleta', instr: 'pa_instr', err: 'pa_err',
      rondas: [
        { texto: '¿Qué paleta tiene <b>armonía</b>?', audio: 'pa_1', ok: 'pa_1ok', correcta: 'a',
          opciones: [{ id: 'a', paleta: [RUEDA[0], RUEDA[1], RUEDA[2], RUEDA[3]] }, { id: 'b', paleta: [RUEDA[0], RUEDA[6], RUEDA[4], RUEDA[10]] }, { id: 'c', paleta: ['#1b1b1b', RUEDA[2], '#ffffff', RUEDA[8]] }] },
        { texto: '¿Qué paleta tiene <b>contraste</b>?', audio: 'pa_2', ok: 'pa_2ok', correcta: 'c',
          opciones: [{ id: 'a', paleta: [RUEDA[8], RUEDA[9], RUEDA[10], RUEDA[7]] }, { id: 'b', paleta: [RUEDA[4], RUEDA[5], RUEDA[3], RUEDA[6]] }, { id: 'c', paleta: ['#1b1b1b', RUEDA[0], RUEDA[6], '#ffffff'] }] },
        { texto: '¿Qué paleta tiene <b>armonía</b>?', audio: 'pa_3', ok: 'pa_3ok', correcta: 'b',
          opciones: [{ id: 'a', paleta: [RUEDA[2], RUEDA[8], RUEDA[4], RUEDA[10]] }, { id: 'b', paleta: [RUEDA[10], RUEDA[9], RUEDA[8], RUEDA[11]] }, { id: 'c', paleta: [RUEDA[0], RUEDA[6], '#1b1b1b', RUEDA[4]] }] }
      ]
    },

    /* 5 — Complementarios */
    {
      tipo: 'elegir', titulo: '↔️ ¿Cuál es el complementario?', instr: 'cm_instr', err: 'cm_err',
      rondas: [
        { texto: 'Complementario del <b style="color:#c9b400">amarillo</b>', audio: 'cm_1', ok: 'cm_1ok', visual: { escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'rueda', cx: 150, cy: 112, r: 100, ri: 50, marcar: [0] }] } }, correcta: 'v',
          revela: { escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'rueda', cx: 150, cy: 112, r: 100, ri: 50, marcar: [0, 6], flecha: [0, 6] }] } },
          opciones: [{ id: 'v', color: RUEDA[6], label: 'violeta' }, { id: 'n', color: RUEDA[2], label: 'naranja' }, { id: 'g', color: RUEDA[10], label: 'verde' }] },
        { texto: 'Complementario del <b style="color:#e32322">rojo</b>', audio: 'cm_2', ok: 'cm_2ok', visual: { escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'rueda', cx: 150, cy: 112, r: 100, ri: 50, marcar: [4] }] } }, correcta: 'g',
          revela: { escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'rueda', cx: 150, cy: 112, r: 100, ri: 50, marcar: [4, 10], flecha: [4, 10] }] } },
          opciones: [{ id: 'n', color: RUEDA[2], label: 'naranja' }, { id: 'g', color: RUEDA[10], label: 'verde' }, { id: 'v', color: RUEDA[6], label: 'violeta' }] },
        { texto: 'Complementario del <b style="color:#2a71b0">azul</b>', audio: 'cm_3', ok: 'cm_3ok', visual: { escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'rueda', cx: 150, cy: 112, r: 100, ri: 50, marcar: [8] }] } }, correcta: 'n',
          revela: { escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'rueda', cx: 150, cy: 112, r: 100, ri: 50, marcar: [8, 2], flecha: [8, 2] }] } },
          opciones: [{ id: 'g', color: RUEDA[10], label: 'verde' }, { id: 'v', color: RUEDA[6], label: 'violeta' }, { id: 'n', color: RUEDA[2], label: 'naranja' }] }
      ]
    },

    /* 6 — ¿Armonía o contraste? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Armonía o contraste?', instr: 'ac_instr', err: 'ac_err',
      texto: '¿Este paisaje tiene <b>armonía</b> o <b>contraste</b>?',
      categorias: [{ id: 'a', label: '🤝 Armonía', sub: 'colores parecidos' }, { id: 'c', label: '⚡ Contraste', sub: 'colores muy distintos' }],
      items: [
        { id: 1, cat: 'a', ok: 'ac_a', escena: paisaje(ARM1) }, { id: 2, cat: 'c', ok: 'ac_c', escena: paisaje(CON1) },
        { id: 3, cat: 'a', ok: 'ac_a', escena: paisaje(ARM2) }, { id: 4, cat: 'c', ok: 'ac_c', escena: paisaje(CON2) },
        { id: 5, cat: 'a', ok: 'ac_a', escena: paisaje(ARM3) }, { id: 6, cat: 'c', ok: 'ac_c', escena: paisaje(CON3) }
      ]
    },

    /* 7 — Cálidos y fríos */
    {
      tipo: 'clasificarUno', titulo: '🔥❄️ ¿Cálido o frío?', instr: 'cf_instr', err: 'cf_err',
      texto: '¿Es un color <b>cálido</b> o <b>frío</b>?',
      categorias: [{ id: 'c', label: '🔥 Cálido', sub: 'fuego, sol' }, { id: 'f', label: '❄️ Frío', sub: 'agua, hielo' }],
      items: ['rojo', 'naranja', 'amarillo', 'rojoNaranja', 'azul', 'celeste', 'verde', 'azulVioleta'].map((n, j) => ({
        id: n, cat: j < 4 ? 'c' : 'f', audio: 'c_' + n, ok: 'cf_' + n, color: COL[n] }))
    },

    /* 8 — Taller */
    {
      tipo: 'taller', titulo: '🎨 Armonía y contraste', instr: 'ta_instr',
      plantilla: 'dividida', etiquetas: ['A · armonía', 'B · contraste'],
      herramientas: ['sello', 'lapiz', 'balde', 'mancha', 'goma'],
      sellos: ['arbol', 'casa', 'sol', 'nube', 'montania', 'flor', 'estrella', 'circulo'],
      grupos: [{ t: 'cálidos', c: ['amarillo', 'amarilloNaranja', 'naranja', 'rojoNaranja', 'rojo', 'magenta'] }, { t: 'fríos', c: ['violeta', 'azulVioleta', 'azul', 'celeste', 'verde', 'verdeAmarillo'] }, { t: 'claros y oscuros', c: ['blanco', 'grisClaro', 'grisOscuro', 'negro'] }],
      colores: Object.keys(COL),
      archivo: 'armonia-y-contraste.png'
    },

    /* 9 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: 'Dividí la hoja en <b>dos partes</b>.' },
        { audio: 'pp_2', texto: '<b>Parte A · Armonía:</b> paisaje, jardín o habitación con colores <b>parecidos o cercanos</b>.' },
        { audio: 'pp_3', texto: '<b>Parte B · Contraste:</b> otro dibujo con colores <b>muy diferentes</b>: claros y oscuros, cálidos y fríos.' },
        { audio: 'pp_4', texto: '🎯 <b>Desafío:</b> cambiá solo los colores de un dibujo. ¿Cambia la sensación?' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> hoja de la carpeta, lápiz, goma, y colores, fibras o crayones.' }
      ]
    },

    /* 10 — Foto */
    { tipo: 'foto', titulo: '📷 Mis dibujos en papel', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tus dibujos, o <b>🖼️ Elegir de la galería</b> para buscar el que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'armonia-y-contraste-foto.jpg' },

    /* 11 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '👀 Observá tus dibujos', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'rueda', cx: 150, cy: 112, r: 100, ri: 50 }] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿En la parte A usé colores <b>parecidos</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿En la parte B usé colores <b>muy diferentes</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Alguna parte <b>llama la atención</b>?' }
      ]
    },

    /* 12 — Observá y recordá */
    {
      tipo: 'pasos', titulo: '💡 Para recordar', img: 'img/familia.jpg',
      pasos: [
        { audio: 'ob_1', texto: '📝 ¿Cuál de tus dibujos tiene <b>armonía</b>? ¿Cuál tiene <b>contraste</b>?' },
        { audio: 'ob_2', texto: '📝 ¿En cuál se <b>destaca</b> más una parte? ¿Por qué?' },
        { audio: 'ob_3', texto: '💡 <b>Armonía</b>: colores con relación o semejanza. <b>Contraste</b>: colores que se diferencian y destacan.' },
        { audio: 'ob_4', texto: '🌈 ¡Los colores también pueden <b>comunicar</b>! 📌 Guardá tu producción en la carpeta.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
