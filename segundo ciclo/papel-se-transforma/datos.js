/* ============================================================
   EL PAPEL SE TRANSFORMA EN ARTE — Artes Visuales · 4.º grado
   Texturas, relieve y materiales cotidianos (a partir de Antonio Berni)
   Basado en la Ficha Viajera N.º 1 de Artes Visuales
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  negro: '#1b1b1b', rojo: '#e63946', naranja: '#fb8500', amarillo: '#ffb703', verde: '#2a9d8f', verdeClaro: '#90be6d',
  celeste: '#8ecae6', azul: '#3a86ff', violeta: '#8338ec', marron: '#8d5524', gris: '#9a9a9a', blanco: '#ffffff'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };
const TX = {
  diario: { n: 'papel de diario arrugado', img: 'img/tx_diario.jpg' },
  revista: { n: 'papel de revista arrugado', img: 'img/tx_revista.jpg' },
  servilleta: { n: 'servilleta arrugada', img: 'img/tx_servilleta.jpg' },
  doblado: { n: 'papel doblado', img: 'img/tx_doblado.jpg' },
  enrollado: { n: 'papel enrollado', img: 'img/tx_enrollado.jpg' },
  liso: { n: 'papel liso', img: 'img/tx_liso.jpg' }
};
const foto = (id, extra) => Object.assign({ img: TX[id].img, label: TX[id].n, audio: 'n_' + id }, extra || {});
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const im = (id, x, y, w, h) => ({ tipo: 'img', src: TX[id].img, x, y, w, h });

window.DATOS = {
  meta: {
    titulo: 'El papel se transforma en arte',
    subtitulo: 'Texturas y relieves con materiales de casa',
    area: '🎨 Artes Visuales · 4.º grado',
    grado: 'Artes Visuales · 4.º grado',
    fuente: 'Basado en la Ficha Viajera N.º 1 de Artes Visuales · 4.º grado',
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
    portada: '¡Hola! Bienvenidos a El papel se transforma en arte. Vamos a recordar al artista Antonio Berni, a descubrir cómo un papel común puede crear texturas y relieves, y a hacer tu propia obra. Tocá Comenzar.',

    n_diario: 'Papel de diario arrugado.', n_revista: 'Papel de revista arrugado.', n_servilleta: 'Servilleta arrugada.',
    n_doblado: 'Papel doblado.', n_enrollado: 'Papel enrollado.', n_liso: 'Papel liso.',

    /* 1 — Antonio Berni */
    be_1: 'Antonio Berni fue un gran artista argentino. Nació en Rosario, en el año mil novecientos cinco.',
    be_2: 'Berni descubrió que los materiales de todos los días también pueden convertirse en arte.',
    be_3: 'En muchas de sus obras pegó cartones, latas, maderas, telas, botones y otros materiales de descarte.',
    be_4: 'Así inventó personajes como Juanito Laguna, un chico de barrio, armado con materiales que otros tiraban.',
    be_5: 'Hoy vos también vas a transformar un material que tenés en casa en una obra de arte.',

    /* 2 — textura y relieve */
    re_1: 'Un papel liso es plano: si pasás la mano, no sentís nada que sobresalga.',
    re_2: 'Si lo arrugás, aparecen pliegues y bultos: eso es una textura.',
    re_3: 'Si lo doblás o lo enrollás y lo pegás, una parte queda más alta que la hoja. Eso se llama relieve.',
    re_4: 'El relieve se puede ver y también tocar. ¡Tu dibujo pasa a tener volumen!',

    /* 3 — asociar */
    as_instr: 'Tocá lo que le hacemos al papel y después cómo queda.',
    as_err: 'Mmm, mirá bien cómo quedó ese papel y probá otra vez.',
    ac_arrugar: 'Arrugar.', ac_doblar: 'Doblar.', ac_enrollar: 'Enrollar.',
    as_arrugar: '¡Sí! Al arrugar el papel aparecen pliegues y bultos: una textura.',
    as_doblar: '¡Muy bien! Al doblarlo, se forman pliegues rectos, como un acordeón.',
    as_enrollar: '¡Correcto! Al enrollarlo, se forman tubitos y espirales que sobresalen.',

    /* 4 — plano o relieve */
    pr_instr: 'Mirá cada papel y escuchá su nombre. ¿Es plano o tiene relieve? Tocá la respuesta.',
    pr_err: 'Imaginá que pasás la mano por encima. ¿Hay algo que sobresalga?',
    pr_liso: '¡Sí! El papel liso es plano.',
    pr_dibujo: '¡Muy bien! Un dibujo con lápiz queda plano sobre la hoja.',
    pr_diario: '¡Correcto! El diario arrugado tiene relieve.',
    pr_doblado: '¡Exacto! El papel doblado sobresale: tiene relieve.',
    pr_enrollado: '¡Bien! Los rollitos de papel tienen relieve.',
    pr_servilleta: '¡Muy bien! La servilleta arrugada tiene textura y relieve.',
    pr_carpeta: '¡Sí! La hoja de la carpeta es plana.',
    e_dibujo: 'Un dibujo con lápiz.', e_carpeta: 'Una hoja de la carpeta.',

    /* 5 — verdadero o falso */
    vf_instr: 'Escuchá cada frase y tocá Verdadero o Falso.',
    vf_err: 'Pensalo otra vez.',
    vf_1: 'Antonio Berni fue un artista argentino.',
    vf_1ok: 'Verdadero. Nació en Rosario y es uno de los artistas más importantes del país.',
    vf_2: 'Berni solo usaba pinceles y pintura.',
    vf_2ok: 'Falso. También pegaba en sus obras cartones, latas, telas y otros materiales de descarte.',
    vf_3: 'Un papel arrugado crea textura y relieve.',
    vf_3ok: 'Verdadero. Los pliegues y bultos sobresalen de la hoja.',
    vf_4: 'Para hacer arte hay que comprar materiales caros.',
    vf_4ok: 'Falso. Con papeles y materiales que tenemos en casa también podemos crear arte.',

    /* 6 — taller */
    ta_instr: '¡A crear! Dibujá con el lápiz y con las formas un paisaje, un personaje, un animal o un objeto. Después elegí las partes que querés destacar, y rellenalas con los papeles de abajo: diario, revista, servilleta, papel doblado o enrollado, usando el balde.',
    t_lapiz: 'Lápiz, para dibujar.',
    t_sello: 'Formas. Elegí una y tocá el cuadro.',
    t_balde: 'Balde. Tocá adentro de una parte para rellenarla con un papel o un color.',
    t_mancha: 'Manchas de papel.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    p_guardar: '¡Tu obra quedó guardada!',

    /* 7 — en papel */
    pp_1: 'Ahora en papel. Paso uno: en una hoja de tu carpeta, dibujá un paisaje, un personaje, un animal o un objeto.',
    pp_2: 'Paso dos: elegí algunas partes de tu dibujo que quieras destacar.',
    pp_3: 'Paso tres: arrugá, doblá o enrollá pequeños pedacitos de papel para crear texturas y relieves.',
    pp_4: 'Paso cuatro: pegá esos papeles sobre algunas partes del dibujo.',
    pp_5: 'Paso cinco: cuando esté seco, completá y coloreá tu producción.',
    pp_6: 'Necesitás una hoja de tu carpeta o un cartón pequeño, un pedacito de papel de diario, revista, servilleta u otro papel, pegamento, lápiz y lápices de colores, fibras o crayones.',

    /* 8 — foto */
    ft_instr: 'Cuando termines tu obra en papel, pulsá el botón Sacar foto para fotografiarla. O también podés elegir la obra que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Qué buena obra! Tocá Guardar para tenerla en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Observá tu obra y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Algunas partes de mi obra tienen relieve?',
    ae_1si: '¡Muy bien! Tu obra se puede ver y tocar.',
    ae_1no: 'Probá pegar un papel arrugado, doblado o enrollado.',
    ae_2: '¿Logré crear una textura con el papel?',
    ae_2si: '¡Genial! El papel se transformó.',
    ae_2no: 'Arrugá un pedacito de papel y pegalo: vas a ver la textura.',
    ae_3: '¿Usé un material que tenía en casa?',
    ae_3si: '¡Excelente! Como Antonio Berni, transformaste un material cotidiano en arte.',
    ae_3no: 'Buscá un papel de diario, una revista o una servilleta.',
    ae_4: '¿Completé y coloreé mi producción?',
    ae_4si: '¡Muy bien! Tu obra está terminada.',
    ae_4no: 'Cuando se seque, terminá de colorearla.',
    ae_fin: 'Gracias por observar tu obra con atención. Mirar lo que hicimos también es parte del arte.',

    /* 10 — compartir */
    fa_1: 'Mostrale tu obra a tu familia, invitalos a tocarla y contales: ¿qué parte tiene relieve?',
    fa_2: '¿Qué textura lograste crear?',
    fa_3: '¿Qué materiales utilizaste?',
    fa_4: 'Recordá: en las obras de Antonio Berni, los materiales cotidianos y de descarte también podían convertirse en arte.',
    fa_5: 'Guardá tu trabajo en la carpeta para llevarlo a la escuela cuando regresemos.',

    cierre: '¡Terminaste! Aprendiste que, como en las obras de Antonio Berni, un papel común puede transformarse en arte, creando texturas y relieves. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Antonio Berni */
    {
      tipo: 'narracion', titulo: '🎨 Antonio Berni',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'img', src: 'img/berni.jpg' },
          { id: 'n', tipo: 'grupo', capas: [{ tipo: 'rect', x: 55, y: 222, w: 290, h: 68, rx: 14, fill: '#fffaf0', stroke: '#c9b48f' }, txt(200, 252, 'Antonio Berni', 26), txt(200, 278, 'artista argentino · Rosario, 1905', 14, '#7a6a5a')] },
          { id: 'm', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 40, y: 8, w: 320, h: 60, rx: 14, fill: '#fffaf0', stroke: '#c9b48f' }, txt(90, 52, '📦', 38), txt(145, 52, '🥫', 38), txt(200, 52, '🧵', 38), txt(255, 52, '🪵', 38), txt(310, 52, '🔘', 34)] },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#f3ead8' }, { tipo: 'rect', x: 60, y: 20, w: 280, h: 230, fill: '#8d6e4f' }, { tipo: 'rect', x: 74, y: 34, w: 252, h: 202, fill: '#efe7d6' },
            im('diario', 90, 50, 110, 80), im('revista', 205, 70, 105, 90), im('enrollado', 100, 140, 90, 80), im('doblado', 195, 165, 115, 60), txt(200, 285, 'materiales de todos los días', 20)] }
        ]
      },
      pasos: [
        { audio: 'be_1', texto: '<b>Antonio Berni</b>: artista argentino, nacido en Rosario (1905). 🇦🇷', apuntar: [86, 84], resaltar: 'n' },
        { audio: 'be_2', texto: 'Los materiales de <b>todos los días</b> también pueden ser arte.' },
        { audio: 'be_3', texto: 'Pegaba <b>cartones, latas, telas, maderas, botones</b>…', mostrar: ['m'], apuntar: [50, 13], resaltar: 'm' },
        { audio: 'be_4', texto: 'Así creó personajes como <b>Juanito Laguna</b>.' },
        { audio: 'be_5', texto: '¡Vos también vas a <b>transformar</b> un material en arte!', mostrar: ['c'], apuntar: [50, 45], resaltar: 'c' }
      ]
    },

    /* 2 — Textura y relieve */
    {
      tipo: 'narracion', titulo: '✋ Textura y relieve',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'l', tipo: 'grupo', capas: [im('liso', 20, 30, 170, 120), txt(105, 175, 'liso: plano', 20)] },
          { id: 'a', tipo: 'grupo', oculto: true, capas: [im('diario', 210, 30, 170, 120), txt(295, 175, 'arrugado: textura', 20)] },
          { id: 'r', tipo: 'grupo', oculto: true, capas: [im('doblado', 20, 195, 170, 80), im('enrollado', 210, 195, 170, 80), txt(200, 294, 'doblado y enrollado: relieve', 20)] }
        ]
      },
      pasos: [
        { audio: 're_1', texto: 'Un papel <b>liso</b> es plano.', apuntar: [26, 28], resaltar: 'l' },
        { audio: 're_2', texto: 'Arrugado aparece una <b>textura</b>.', mostrar: ['a'], apuntar: [74, 28], resaltar: 'a' },
        { audio: 're_3', texto: 'Doblado o enrollado sobresale: <b>relieve</b>.', mostrar: ['r'], apuntar: [50, 78], resaltar: 'r' },
        { audio: 're_4', texto: 'El relieve se <b>ve</b> y se <b>toca</b>. ✋' }
      ]
    },

    /* 3 — Asociar */
    {
      tipo: 'asociar', titulo: '🧩 ¿Qué le hacemos al papel?', instr: 'as_instr', err: 'as_err',
      texto: 'Uní cada <b>acción</b> con el papel que queda.',
      pares: [
        { id: 'arrugar', izq: { emoji: '✊', label: 'arrugar', audio: 'ac_arrugar' }, der: foto('diario'), ok: 'as_arrugar' },
        { id: 'doblar', izq: { emoji: '🪗', label: 'doblar', audio: 'ac_doblar' }, der: foto('doblado'), ok: 'as_doblar' },
        { id: 'enrollar', izq: { emoji: '🌀', label: 'enrollar', audio: 'ac_enrollar' }, der: foto('enrollado'), ok: 'as_enrollar' }
      ]
    },

    /* 4 — ¿Plano o con relieve? */
    {
      tipo: 'clasificarUno', titulo: '👆 ¿Plano o con relieve?', instr: 'pr_instr', err: 'pr_err',
      texto: '¿Es <b>plano</b> o tiene <b>relieve</b>?',
      categorias: [{ id: 'p', label: '📄 Plano', sub: 'no sobresale' }, { id: 'r', label: '⛰️ Relieve', sub: 'sobresale' }],
      items: [
        foto('liso', { id: 'liso', cat: 'p', ok: 'pr_liso' }),
        { id: 'dibujo', cat: 'p', audio: 'e_dibujo', ok: 'pr_dibujo', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#ffffff' }, { tipo: 'figura', forma: 'casa', cx: 150, cy: 105, size: 150, fill: '#ffffff', stroke: '#555555', strokeW: 3 }, txt(150, 212, 'dibujo con lápiz', 20)] } },
        { id: 'carpeta', cat: 'p', audio: 'e_carpeta', ok: 'pr_carpeta', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#ffffff' }, ...[40, 70, 100, 130, 160].map(y => ({ tipo: 'path', d: `M20 ${y}L280 ${y}`, stroke: '#9bc3e6', sw: 2 })), { tipo: 'path', d: 'M50 0L50 225', stroke: '#f28482', sw: 2 }, txt(150, 212, 'hoja de la carpeta', 20)] } },
        foto('diario', { id: 'diario', cat: 'r', ok: 'pr_diario' }),
        foto('doblado', { id: 'doblado', cat: 'r', ok: 'pr_doblado' }),
        foto('enrollado', { id: 'enrollado', cat: 'r', ok: 'pr_enrollado' }),
        foto('servilleta', { id: 'servilleta', cat: 'r', ok: 'pr_servilleta' })
      ]
    },

    /* 5 — Verdadero o falso */
    {
      tipo: 'vf', titulo: '✔️ ¿Verdadero o falso?', instr: 'vf_instr', err: 'vf_err',
      items: [
        { audio: 'vf_1', ok: 'vf_1ok', v: true, texto: 'Antonio Berni fue un artista argentino.', cuadro: { w: 250, h: 350, capas: [{ tipo: 'rect', fill: '#efe7d6' }, txt(125, 170, '🇦🇷', 90), txt(125, 260, 'Berni', 36)] } },
        { audio: 'vf_2', ok: 'vf_2ok', v: false, texto: 'Berni solo usaba pinceles y pintura.', cuadro: { w: 250, h: 350, capas: [{ tipo: 'rect', fill: '#efe7d6' }, txt(125, 120, '📦 🥫', 56), txt(125, 210, '🧵 🪵', 56), txt(125, 290, '🔘', 50)] } },
        { audio: 'vf_3', ok: 'vf_3ok', v: true, texto: 'Un papel arrugado crea textura y relieve.', cuadro: { w: 250, h: 350, capas: [im('diario', 0, 0, 250, 350)] } },
        { audio: 'vf_4', ok: 'vf_4ok', v: false, texto: 'Para hacer arte hay que comprar materiales caros.', cuadro: { w: 250, h: 350, capas: [im('servilleta', 0, 0, 250, 175), im('revista', 0, 175, 250, 175)] } }
      ]
    },

    /* 6 — Taller */
    {
      tipo: 'taller', titulo: '🖌️ Mi obra con papeles', instr: 'ta_instr',
      herramientas: ['lapiz', 'sello', 'balde', 'mancha', 'goma'],
      sellos: ['casa', 'arbol', 'sol', 'nube', 'montania', 'pez', 'flor', 'estrella'],
      colores: ['negro', 'rojo', 'naranja', 'amarillo', 'verdeClaro', 'verde', 'celeste', 'azul', 'violeta', 'marron'],
      texturas: ['diario', 'revista', 'servilleta', 'doblado', 'enrollado'].map(id => ({ id, img: TX[id].img, n: TX[id].n, audio: 'n_' + id })),
      archivo: 'el-papel-se-transforma-en-arte.png'
    },

    /* 7 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Dibujá un paisaje, un personaje, un animal o un objeto.' },
        { audio: 'pp_2', texto: '<b>2.</b> Elegí las partes que quieras <b>destacar</b>.' },
        { audio: 'pp_3', texto: '<b>3.</b> <b>Arrugá, doblá o enrollá</b> pedacitos de papel.' },
        { audio: 'pp_4', texto: '<b>4.</b> <b>Pegalos</b> sobre esas partes del dibujo.' },
        { audio: 'pp_5', texto: '<b>5.</b> Cuando esté seco, <b>completá y coloreá</b>.' },
        { audio: 'pp_6', texto: '🧰 <b>Materiales:</b> hoja o cartón, diario, revista o servilleta, pegamento, lápiz y colores.' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mi obra en papel', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu obra, o <b>🖼️ Elegir de la galería</b> para buscar la que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'el-papel-se-transforma-en-arte-foto.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '👀 Observá tu obra', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 300, h: 225, capas: [im('diario', 0, 0, 150, 112), im('enrollado', 150, 0, 150, 112), im('doblado', 0, 112, 150, 113), im('revista', 150, 112, 150, 113)] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Algunas partes tienen <b>relieve</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Logré crear una <b>textura</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Usé un material que tenía <b>en casa</b>?' },
        { audio: 'ae_4', si: 'ae_4si', no: 'ae_4no', texto: '¿<b>Completé y coloreé</b> mi producción?' }
      ]
    },

    /* 10 — Compartir */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Invitá a tu familia a tocar tu obra: <b>¿qué parte tiene relieve?</b>' },
        { audio: 'fa_2', texto: '<b>¿Qué textura lograste crear?</b>' },
        { audio: 'fa_3', texto: '<b>¿Qué materiales utilizaste?</b>' },
        { audio: 'fa_4', texto: '🎨 Como en las obras de <b>Antonio Berni</b>, lo cotidiano también es arte.' },
        { audio: 'fa_5', texto: '📌 Guardá tu trabajo en la carpeta para llevarlo a la escuela.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
