/* ============================================================
   MI PROPIA OBRA — Artes Visuales · 3.º grado
   Transparencias y formas geométricas
   Basado en la Ficha Viajera de Artes Visuales (Propuesta breve 2)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  rojo: '#e8262f', azul: '#1f64d6', amarillo: '#ffd21f', naranja: '#ff8a1e', verde: '#2fae4a', violeta: '#8a3fb8',
  rosa: '#ff70a6', celeste: '#4cc9f0', negro: '#1b1b1b'
};
/* colores "de nailon" (más claros, para que se vean las superposiciones) */
const NA = { amarillo: '#ffe14d', celeste: '#4da6ff', rojo: '#ff5a5a', verde: '#6fdc6f', rosa: '#ff8fd0' };
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };

const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const F = (forma, cx, cy, size, fill, extra) => Object.assign({ tipo: 'forma', forma, cx, cy, size, fill, stroke: '#2b2118', sw: 3 }, extra || {});
const nailon = (forma, cx, cy, size, fill) => ({ tipo: 'forma', forma, cx, cy, size, fill, op: 0.75, blend: 'multiply' });
const ficha = (forma, fill, rot) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'grupo', capas: [F(forma, 150, 112, forma === 'rectangulo' ? 230 : 170, fill)] }] });
const sup = (a, b, mezcla) => ({ w: 300, h: 160, capas: [{ tipo: 'rect', fill: '#ffffff' },
  nailon('cuadrado', 110, 80, 130, NA[a]), nailon('cuadrado', 190, 80, 130, NA[b]),
  ...(mezcla ? [] : [{ tipo: 'rect', x: 120, y: 22, w: 60, h: 116, fill: '#ffffff', stroke: '#2b2118' }, txt(150, 96, '?', 46, '#ff8a1e')])] });
const emo = (e, label, extra) => Object.assign({ emoji: e, label }, extra || {});

window.DATOS = {
  meta: {
    titulo: 'Mi propia obra',
    subtitulo: 'Formas geométricas y transparencias',
    area: '🎨 Artes Visuales · 3.er grado',
    grado: 'Artes Visuales · 3.er grado',
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
    portada: '¡Hola! Bienvenidos a Mi propia obra. Vamos a crear una composición con formas geométricas y a descubrir las transparencias: materiales que dejan ver lo que hay abajo. Tocá Comenzar.',

    /* 1 — formas geométricas */
    fg_1: 'Para tu obra vas a usar formas geométricas. Mirá cuáles son.',
    fg_2: 'El círculo: redondo, sin puntas.',
    fg_3: 'El cuadrado: cuatro lados iguales.',
    fg_4: 'El triángulo: tres lados y tres puntas.',
    fg_5: 'El rectángulo: cuatro lados, dos largos y dos cortos.',
    fg_6: 'Combinando formas geométricas de distintos colores, armamos una composición.',

    /* 2 — qué forma es */
    qf_instr: 'Mirá cada forma. ¿Es un círculo, un cuadrado, un triángulo o un rectángulo? Tocá la respuesta.',
    qf_err: 'Contá los lados y las puntas, y probá otra vez.',
    qf_1: '¡Sí! Es un círculo, redondo y sin puntas.',
    qf_2: '¡Muy bien! Es un círculo.',
    qf_3: '¡Correcto! Es un cuadrado: cuatro lados iguales.',
    qf_4: '¡Exacto! Es un cuadrado.',
    qf_5: '¡Bien! Es un triángulo: tres lados.',
    qf_6: '¡Muy bien! Es un triángulo, aunque esté dado vuelta.',
    qf_7: '¡Correcto! Es un rectángulo: dos lados largos y dos cortos.',
    qf_8: '¡Exacto! Es un rectángulo.',

    /* 3 — opaco y transparente */
    tr_1: 'Mirá este dibujo de una casa.',
    tr_2: 'Si le ponemos encima un papel opaco, la casa queda tapada. No se ve.',
    tr_3: 'Si le ponemos encima un material transparente, como una bolsa de nailon de color, la casa se sigue viendo, pero teñida de color.',
    tr_4: 'Transparente quiere decir que deja ver lo que hay abajo, como el vidrio de una ventana.',

    /* 4 — superposiciones */
    su_1: 'Ahora, algo mágico. Ponemos un nailon amarillo…',
    su_2: '…y encima, un nailon celeste.',
    su_3: '¡Donde se superponen aparece el verde! Los colores transparentes se mezclan.',
    su_4: 'Con rojo y amarillo, donde se superponen aparece el naranja.',

    /* 5 — transparente u opaco */
    to_instr: 'Mirá cada material y escuchá su nombre. ¿Es transparente, que deja ver, u opaco, que tapa? Tocá la respuesta.',
    to_err: 'Imaginá que lo ponés sobre un dibujo. ¿El dibujo se sigue viendo?',
    m_bolsa: 'Una bolsa de nailon.', m_vidrio: 'El vidrio de una ventana.', m_agua: 'Agua limpia.', m_frasco: 'Un frasco de vidrio.',
    m_carton: 'Una caja de cartón.', m_madera: 'Una tabla de madera.', m_libro: 'Un libro.', m_glase: 'Papel glasé.',
    to_bolsa: '¡Sí! La bolsa de nailon es transparente.',
    to_vidrio: '¡Muy bien! El vidrio es transparente.',
    to_agua: '¡Correcto! El agua limpia es transparente.',
    to_frasco: '¡Exacto! El frasco de vidrio deja ver lo que tiene adentro.',
    to_carton: '¡Sí! El cartón es opaco, tapa lo de abajo.',
    to_madera: '¡Muy bien! La madera es opaca.',
    to_libro: '¡Correcto! El libro es opaco.',
    to_glase: '¡Exacto! El papel glasé es opaco: tapa el dibujo.',

    /* 6 — qué color aparece */
    qc_instr: 'Mirá los dos nailons de color. ¿Qué color aparece donde se superponen? Tocá la respuesta.',
    qc_err: 'Pensá en la mezcla de esos dos colores y probá otra vez.',
    qc_1: 'Amarillo y celeste. ¿Qué color aparece en el medio?',
    qc_1ok: '¡Sí! Amarillo y celeste superpuestos se ven verdes.',
    qc_2: 'Rojo y amarillo. ¿Qué color aparece en el medio?',
    qc_2ok: '¡Muy bien! Rojo y amarillo superpuestos se ven naranja.',
    qc_3: 'Rojo y celeste. ¿Qué color aparece en el medio?',
    qc_3ok: '¡Correcto! Rojo y celeste superpuestos se ven violeta.',

    /* 7 — taller */
    ta_instr: '¡Creá tu propia obra! Con la herramienta de formas, armá una composición con círculos, cuadrados, triángulos y rectángulos de colores. Después usá el papel transparente: elegí un color y apoyalo sobre algunas partes. Mirá qué colores nuevos aparecen. Arriba, ponele un nombre a tu obra.',
    t_sello: 'Formas geométricas. Elegí una y tocá el cuadro.',
    t_nailon: 'Papel transparente, como una bolsa de nailon. Elegí una forma y un color, y apoyalo sobre tu obra.',
    t_lapiz: 'Lápiz, para dibujar.',
    t_balde: 'Balde. Tocá adentro de una forma para pintarla.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    s_circulo: 'Círculo.', s_cuadrado: 'Cuadrado.', s_triangulo: 'Triángulo.', s_rectangulo: 'Rectángulo.', s_rombo: 'Rombo.', s_ovalo: 'Óvalo.',
    nm_foco: 'Ponele un nombre a tu obra.',
    p_guardar: '¡Tu obra quedó guardada!',

    /* 8 — en papel */
    pp_1: 'Ahora hacelo en papel. Paso uno: dibujá en la hoja una composición con formas geométricas.',
    pp_2: 'Paso dos: elegí diferentes colores para pintar las formas, o pegá papel glasé.',
    pp_3: 'Paso tres: elegí alguna parte de la composición y pegá arriba materiales transparentes, como bolsas de nailon de colores.',
    pp_4: 'Paso cuatro: ponele un nombre a tu trabajo. Mi propia obra se llama…',
    pp_5: 'Necesitás una hoja blanca, papel glasé, bolsas de nailon de colores que tengas en casa, y fibras, colores o crayones.',

    /* 9 — foto */
    fo_instr: 'Cuando termines tu obra en papel, pulsá el botón Sacar foto para fotografiarla. O también podés elegir la obra que guardaste en el taller, pulsando el botón Elegir de la galería.',
    fo_boton: 'Sacar una foto.',
    fo_ok: '¡Qué buena obra! Tocá Guardar para tenerla en tu celular.',

    /* 10 — autoevaluación */
    ae_instr: 'Mirá tu obra y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Mi composición tiene formas geométricas?',
    ae_1si: '¡Muy bien! Círculos, cuadrados, triángulos y más.',
    ae_1no: 'Podés agregar algunas formas geométricas.',
    ae_2: '¿Usé diferentes colores?',
    ae_2si: '¡Genial! Una obra bien colorida.',
    ae_2no: 'Probá sumar otros colores.',
    ae_3: '¿Pegué materiales transparentes en alguna parte?',
    ae_3si: '¡Excelente! Se ve lo de abajo, teñido de color.',
    ae_3no: 'Probá pegar un pedacito de bolsa de nailon de color.',
    ae_4: '¿Le puse un nombre a mi obra?',
    ae_4si: '¡Muy bien! Toda obra tiene su título.',
    ae_4no: 'Pensá un nombre que cuente qué quisiste representar.',
    ae_fin: 'Gracias por mirar tu obra con atención. Mirar lo que hicimos también es parte del arte.',

    /* 11 — familia */
    fa_1: 'Mostrale tu obra a tu familia, contales su nombre y preguntales qué ven.',
    fa_2: 'Contales: ¿qué colores elegiste?',
    fa_3: '¿Qué quisiste representar al dibujar las formas geométricas?',
    fa_4: '¿Qué materiales usaste?',
    fa_5: 'Por último, guardá tu trabajo en la carpeta de Artes Visuales.',

    cierre: '¡Terminaste! Creaste tu propia obra con formas geométricas y descubriste las transparencias: materiales que dejan ver lo de abajo y forman colores nuevos. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Formas geométricas */
    {
      tipo: 'narracion', titulo: '🔷 Formas geométricas',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'ci', tipo: 'grupo', oculto: true, capas: [F('circulo', 85, 78, 110, COL.rojo), txt(85, 148, 'círculo', 17)] },
          { id: 'cu', tipo: 'grupo', oculto: true, capas: [F('cuadrado', 300, 78, 110, COL.azul), txt(300, 148, 'cuadrado', 17)] },
          { id: 'tr', tipo: 'grupo', oculto: true, capas: [F('triangulo', 85, 218, 110, COL.amarillo), txt(85, 290, 'triángulo', 17)] },
          { id: 're', tipo: 'grupo', oculto: true, capas: [F('rectangulo', 300, 222, 150, COL.verde), txt(300, 290, 'rectángulo', 17)] },
          { id: 'co', tipo: 'grupo', oculto: true, capas: [F('rombo', 192, 150, 70, COL.violeta), F('circulo', 192, 150, 26, COL.naranja)] }
        ]
      },
      pasos: [
        { audio: 'fg_1', texto: 'Tu obra se arma con <b>formas geométricas</b>. 🔷' },
        { audio: 'fg_2', texto: 'El <b>círculo</b>: redondo, sin puntas.', mostrar: ['ci'], apuntar: [21, 26], resaltar: 'ci' },
        { audio: 'fg_3', texto: 'El <b>cuadrado</b>: 4 lados iguales.', mostrar: ['cu'], apuntar: [75, 26], resaltar: 'cu' },
        { audio: 'fg_4', texto: 'El <b>triángulo</b>: 3 lados y 3 puntas.', mostrar: ['tr'], apuntar: [21, 72], resaltar: 'tr' },
        { audio: 'fg_5', texto: 'El <b>rectángulo</b>: 2 lados largos y 2 cortos.', mostrar: ['re'], apuntar: [75, 74], resaltar: 're' },
        { audio: 'fg_6', texto: 'Combinándolas armamos una <b>composición</b>. 🎨', mostrar: ['co'], apuntar: [48, 50], resaltar: 'co' }
      ]
    },

    /* 2 — ¿Qué forma es? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Qué forma es?', instr: 'qf_instr', err: 'qf_err',
      texto: '¿Qué forma geométrica es?',
      categorias: [{ id: 'ci', label: '⚪ Círculo', sub: '' }, { id: 'cu', label: '🟦 Cuadrado', sub: '' }, { id: 'tr', label: '🔺 Triángulo', sub: '' }, { id: 're', label: '▬ Rectángulo', sub: '' }],
      items: [
        { id: 1, cat: 'ci', ok: 'qf_1', escena: ficha('circulo', COL.naranja) },
        { id: 2, cat: 'ci', ok: 'qf_2', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, F('circulo', 150, 112, 90, COL.celeste)] } },
        { id: 3, cat: 'cu', ok: 'qf_3', escena: ficha('cuadrado', COL.rojo) },
        { id: 4, cat: 'cu', ok: 'qf_4', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, F('cuadrado', 150, 112, 100, COL.verde)] } },
        { id: 5, cat: 'tr', ok: 'qf_5', escena: ficha('triangulo', COL.violeta) },
        { id: 6, cat: 'tr', ok: 'qf_6', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'path', d: 'M75 40H225L150 190Z', fill: COL.amarillo, stroke: '#2b2118', sw: 3 }] } },
        { id: 7, cat: 're', ok: 'qf_7', escena: ficha('rectangulo', COL.azul) },
        { id: 8, cat: 're', ok: 'qf_8', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'path', d: 'M120 22H180V203H120Z', fill: COL.rosa, stroke: '#2b2118', sw: 3 }] } }
      ]
    },

    /* 3 — Opaco y transparente */
    {
      tipo: 'narracion', titulo: '🪟 Opaco y transparente',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#ffffff' },
          { tipo: 'figura', forma: 'casa', cx: 110, cy: 140, size: 150, fill: '#ffffff', stroke: '#1b1b1b', strokeW: 4 },
          { tipo: 'figura', forma: 'casa', cx: 290, cy: 140, size: 150, fill: '#ffffff', stroke: '#1b1b1b', strokeW: 4 },
          { id: 'op', tipo: 'grupo', oculto: true, capas: [F('cuadrado', 110, 140, 175, '#ff8a1e'), txt(110, 270, 'opaco', 20)] },
          { id: 'tr', tipo: 'grupo', oculto: true, capas: [nailon('cuadrado', 290, 140, 175, NA.celeste), txt(290, 270, 'transparente', 20)] }
        ]
      },
      pasos: [
        { audio: 'tr_1', texto: 'Mirá estos dibujos de una <b>casa</b>. 🏠', apuntar: [28, 30] },
        { audio: 'tr_2', texto: 'Un papel <b>opaco</b> la tapa: ya no se ve.', mostrar: ['op'], apuntar: [28, 45], resaltar: 'op' },
        { audio: 'tr_3', texto: 'Un nailon <b>transparente</b> deja ver la casa, teñida de color.', mostrar: ['tr'], apuntar: [72, 45], resaltar: 'tr' },
        { audio: 'tr_4', texto: '<b>Transparente</b>: deja ver lo de abajo, como una ventana. 🪟' }
      ]
    },

    /* 4 — Superposiciones */
    {
      tipo: 'narracion', titulo: '🌈 Colores que se superponen',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#ffffff' },
          { id: 'a', tipo: 'grupo', oculto: true, capas: [nailon('cuadrado', 120, 95, 130, NA.amarillo)] },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [nailon('cuadrado', 200, 95, 130, NA.celeste)] },
          { id: 'v', tipo: 'grupo', oculto: true, capas: [txt(160, 175, '↑ verde', 18, '#1e6b34')] },
          { id: 'r', tipo: 'grupo', oculto: true, capas: [nailon('circulo', 140, 235, 100, NA.rojo), nailon('circulo', 210, 235, 100, NA.amarillo), txt(310, 242, '← naranja', 18, '#c25a00')] }
        ]
      },
      pasos: [
        { audio: 'su_1', texto: 'Un nailon <b style="color:#c9a400">amarillo</b>…', mostrar: ['a'], apuntar: [28, 30], resaltar: 'a' },
        { audio: 'su_2', texto: '…y encima, uno <b style="color:#1f64d6">celeste</b>.', mostrar: ['c'], apuntar: [52, 30], resaltar: 'c' },
        { audio: 'su_3', texto: '¡Donde se superponen aparece el <b style="color:#2fae4a">verde</b>!', mostrar: ['v'], apuntar: [40, 34] },
        { audio: 'su_4', texto: '<b style="color:#e8262f">rojo</b> + <b style="color:#c9a400">amarillo</b> → <b style="color:#ff8a1e">naranja</b>', mostrar: ['r'], apuntar: [44, 78], resaltar: 'r' }
      ]
    },

    /* 5 — ¿Transparente u opaco? */
    {
      tipo: 'clasificarUno', titulo: '👀 ¿Transparente u opaco?', instr: 'to_instr', err: 'to_err',
      texto: '¿Deja ver lo de abajo?',
      categorias: [{ id: 't', label: '🪟 Transparente', sub: 'deja ver' }, { id: 'o', label: '📦 Opaco', sub: 'tapa' }],
      items: [
        emo('🛍️', 'bolsa de nailon', { id: 'bolsa', cat: 't', audio: 'm_bolsa', ok: 'to_bolsa' }),
        emo('🪟', 'vidrio de ventana', { id: 'vidrio', cat: 't', audio: 'm_vidrio', ok: 'to_vidrio' }),
        emo('💧', 'agua limpia', { id: 'agua', cat: 't', audio: 'm_agua', ok: 'to_agua' }),
        emo('🫙', 'frasco de vidrio', { id: 'frasco', cat: 't', audio: 'm_frasco', ok: 'to_frasco' }),
        emo('📦', 'cartón', { id: 'carton', cat: 'o', audio: 'm_carton', ok: 'to_carton' }),
        emo('🪵', 'madera', { id: 'madera', cat: 'o', audio: 'm_madera', ok: 'to_madera' }),
        emo('📕', 'libro', { id: 'libro', cat: 'o', audio: 'm_libro', ok: 'to_libro' }),
        { id: 'glase', cat: 'o', audio: 'm_glase', ok: 'to_glase', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, F('cuadrado', 150, 100, 150, '#ff70a6'), txt(150, 210, 'papel glasé', 22)] } }
      ]
    },

    /* 6 — ¿Qué color aparece? */
    {
      tipo: 'elegir', titulo: '❓ ¿Qué color aparece?', instr: 'qc_instr', err: 'qc_err',
      rondas: [
        { texto: '<b style="color:#c9a400">amarillo</b> + <b style="color:#1f64d6">celeste</b>', audio: 'qc_1', ok: 'qc_1ok', visual: { escena: sup('amarillo', 'celeste') }, revela: { escena: sup('amarillo', 'celeste', true) }, correcta: 'verde',
          opciones: [{ id: 'verde', color: COL.verde, label: 'verde' }, { id: 'naranja', color: COL.naranja, label: 'naranja' }, { id: 'violeta', color: COL.violeta, label: 'violeta' }] },
        { texto: '<b style="color:#e8262f">rojo</b> + <b style="color:#c9a400">amarillo</b>', audio: 'qc_2', ok: 'qc_2ok', visual: { escena: sup('rojo', 'amarillo') }, revela: { escena: sup('rojo', 'amarillo', true) }, correcta: 'naranja',
          opciones: [{ id: 'verde', color: COL.verde, label: 'verde' }, { id: 'naranja', color: COL.naranja, label: 'naranja' }, { id: 'violeta', color: COL.violeta, label: 'violeta' }] },
        { texto: '<b style="color:#e8262f">rojo</b> + <b style="color:#1f64d6">celeste</b>', audio: 'qc_3', ok: 'qc_3ok', visual: { escena: sup('rojo', 'celeste') }, revela: { escena: sup('rojo', 'celeste', true) }, correcta: 'violeta',
          opciones: [{ id: 'verde', color: COL.verde, label: 'verde' }, { id: 'naranja', color: COL.naranja, label: 'naranja' }, { id: 'violeta', color: COL.violeta, label: 'violeta' }] }
      ]
    },

    /* 7 — Taller */
    {
      tipo: 'taller', titulo: '🎨 Mi propia obra', instr: 'ta_instr',
      herramientas: ['sello', 'nailon', 'lapiz', 'balde', 'goma'],
      sellos: ['circulo', 'cuadrado', 'triangulo', 'rectangulo', 'rombo', 'ovalo'],
      colores: ['rojo', 'azul', 'amarillo', 'naranja', 'verde', 'violeta', 'rosa', 'celeste', 'negro'],
      nombre: { label: 'Mi propia obra:', placeholder: 'ponele un nombre', prefijo: 'Mi propia obra: ', audio: 'nm_foco' },
      archivo: 'mi-propia-obra.png'
    },

    /* 8 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Dibujá una composición con <b>formas geométricas</b>. 🔷🔺⚪' },
        { audio: 'pp_2', texto: '<b>2.</b> Pintá las formas con <b>diferentes colores</b>, o pegá papel glasé.' },
        { audio: 'pp_3', texto: '<b>3.</b> En alguna parte, pegá arriba <b>materiales transparentes</b>: bolsas de nailon de colores. 🛍️' },
        { audio: 'pp_4', texto: '<b>4.</b> Ponele un <b>nombre</b>: «Mi propia obra: …» ✍️' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> hoja blanca, papel glasé, bolsas de nailon de colores, fibras, colores o crayones.' }
      ]
    },

    /* 9 — Foto */
    { tipo: 'foto', titulo: '📷 Mi obra en papel', instr: 'fo_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu obra, o <b>🖼️ Elegir de la galería</b> para buscar la que guardaste en el taller.', boton: 'fo_boton', ok: 'fo_ok', img: 'img/foto.jpg',
      archivo: 'mi-propia-obra-en-papel.jpg' },

    /* 10 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi obra', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#ffffff' }, F('circulo', 80, 80, 100, COL.rojo), F('cuadrado', 190, 90, 110, COL.azul), F('triangulo', 120, 165, 100, COL.amarillo), F('rectangulo', 230, 180, 120, COL.verde),
        nailon('circulo', 150, 110, 120, NA.rosa)] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Tiene <b>formas geométricas</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Usé <b>diferentes colores</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Pegué materiales <b>transparentes</b>?' },
        { audio: 'ae_4', si: 'ae_4si', no: 'ae_4no', texto: '¿Le puse un <b>nombre</b>?' }
      ]
    },

    /* 11 — Familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Mostrales tu obra, contales su <b>nombre</b> y preguntales qué ven.' },
        { audio: 'fa_2', texto: '<b>¿Qué colores elegiste?</b>' },
        { audio: 'fa_3', texto: '<b>¿Qué quisiste representar con las formas geométricas?</b>' },
        { audio: 'fa_4', texto: '<b>¿Qué materiales usaste?</b>' },
        { audio: 'fa_5', texto: '📁 Guardá tu trabajo en la carpeta de <b>Artes Visuales</b>.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
