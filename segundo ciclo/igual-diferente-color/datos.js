/* ============================================================
   IGUAL, DIFERENTE Y CON COLOR — Artes Visuales · 7.º grado
   Simetría, asimetría, armonía y contraste
   Basado en la Ficha Viajera 2 de Artes Visuales · 7.º grado
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const RUEDA = ['#f4e500', '#fdc60b', '#f18e1c', '#ea621f', '#e32322', '#c4037d', '#6d398b', '#454e99', '#2a71b0', '#0696bb', '#008e5b', '#8cbb26'];
const COL = {
  amarillo: RUEDA[0], amarilloNaranja: RUEDA[1], naranja: RUEDA[2], rojoNaranja: RUEDA[3], rojo: RUEDA[4], magenta: RUEDA[5],
  violeta: RUEDA[6], azulVioleta: RUEDA[7], azul: RUEDA[8], celeste: RUEDA[9], verde: RUEDA[10], verdeAmarillo: RUEDA[11],
  blanco: '#ffffff', grisClaro: '#cfcfcf', grisOscuro: '#5a5a5a', negro: '#1b1b1b'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };
const ARM_F = [RUEDA[8], RUEDA[9], RUEDA[10], RUEDA[7], RUEDA[11]];  // armonía fría
const ARM_C = [RUEDA[0], RUEDA[1], RUEDA[2], RUEDA[3], RUEDA[4]];   // armonía cálida
const CON = [RUEDA[0], RUEDA[6], RUEDA[4], RUEDA[10], RUEDA[8], '#1b1b1b']; // contraste
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const F = (forma, cx, cy, size, fill, rot, flip) => ({ tipo: 'forma', forma, cx, cy, size, fill, stroke: '#2b2118', sw: 2, rot, flip });
/* máscara/mariposa simétrica con paleta */
function sim(pal, w, h, fondo) {
  const cx = w / 2, k = h / 225;
  const izq = [F('hoja', cx - 55 * k, 80 * k, 90 * k, pal[0], 40), F('gota', cx - 70 * k, 160 * k, 60 * k, pal[1], -30), F('circulo', cx - 40 * k, 125 * k, 30 * k, pal[2]), F('triangulo', cx - 95 * k, 40 * k, 34 * k, pal[3], -20)];
  const der = izq.map(f => Object.assign({}, f, { cx: w - f.cx, flip: true }));
  return { w, h, capas: [{ tipo: 'rect', fill: fondo || '#fffdf5' }, ...izq, ...der, F('ovalo', cx, 112 * k, 40 * k, pal[4] || pal[0])] };
}
/* composición asimétrica con paleta */
function asim(pal, w, h, fondo) {
  const k = h / 225;
  return { w, h, capas: [{ tipo: 'rect', fill: fondo || '#fffdf5' },
    F('circulo', w * 0.66, 105 * k, 130 * k, pal[0]), F('triangulo', w * 0.18, 60 * k, 44 * k, pal[1], 20),
    F('cuadrado', w * 0.3, 175 * k, 34 * k, pal[2], 30), F('estrella', w * 0.88, 195 * k, 30 * k, pal[3]), F('gota', w * 0.12, 190 * k, 24 * k, pal[4] || pal[1], -40)] };
}
const MASC_I = [F('hoja', 105, 75, 80, RUEDA[4], 35), F('circulo', 115, 115, 34, '#1b1b1b'), F('triangulo', 70, 170, 50, RUEDA[0], -15)];
const mascara = (der) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'path', d: 'M150 6L150 219', stroke: '#b8b0a4', sw: 3 }, ...MASC_I, ...(der || [])] });
const reflejo = MASC_I.map(f => Object.assign({}, f, { cx: 300 - f.cx, flip: true }));
const copia = MASC_I.map(f => Object.assign({}, f, { cx: f.cx + 150 }));
const otroColor = MASC_I.map((f, j) => Object.assign({}, f, { cx: 300 - f.cx, flip: true, fill: [RUEDA[10], RUEDA[8], RUEDA[6]][j] }));

window.DATOS = {
  meta: {
    titulo: 'Igual, diferente y con color',
    subtitulo: 'Simetría, asimetría, armonía y contraste',
    area: '🎨 Artes Visuales · 7.º grado',
    grado: 'Artes Visuales · 7.º grado',
    fuente: 'Basado en la Ficha Viajera 2 de Artes Visuales · 7.º grado',
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
    portada: '¡Hola! Bienvenidos a Igual, diferente y con color. Vamos a explorar distintas maneras de organizar una imagen: simetría, asimetría, armonía y contraste. Y vas a aprender a dar tu opinión sobre una obra, explicando por qué. Tocá Comenzar.',

    /* 1 — cuatro maneras */
    cm_1: 'Una imagen puede organizarse de diferentes maneras. Veamos cuatro.',
    cm_2: 'Simetría: los elementos se organizan de manera igual o semejante a ambos lados.',
    cm_3: 'Asimetría: los elementos son diferentes, pero pueden estar organizados de manera equilibrada.',
    cm_4: 'Armonía: los colores combinan y producen una sensación de unidad.',
    cm_5: 'Contraste: usamos colores o elementos muy diferentes para generar impacto y llamar la atención.',

    /* 2 — esta obra es */
    eo_instr: 'Mirá cada obra y pensá en dos cosas: cómo están organizadas las formas, y cómo son los colores. Tocá la descripción correcta.',
    eo_err: 'Mirá otra vez: primero, ¿los dos lados son iguales? Después, ¿los colores son parecidos o muy diferentes?',
    eo_1: '¿Cómo es esta obra?',
    eo_1ok: '¡Muy bien! Es simétrica, y sus colores fríos y vecinos le dan armonía.',
    eo_2: '¿Y esta?',
    eo_2ok: '¡Excelente! Es asimétrica, y sus colores opuestos generan contraste.',
    eo_3: '¿Cómo es esta obra?',
    eo_3ok: '¡Correcto! Es simétrica, pero con colores contrastantes que llaman la atención.',
    eo_4: 'Última. ¿Cómo es?',
    eo_4ok: '¡Muy bien! Es asimétrica, con colores cálidos y parecidos: armonía.',

    /* 3 — completá la máscara */
    ms_instr: 'Mirá la mitad de la máscara. ¿Cuál de las opciones la completa con simetría? Tocá la imagen.',
    ms_err: 'En la simetría, cada forma se refleja como en un espejo, con la misma forma, tamaño y color.',
    ms_1: '¿Cuál completa la máscara simétrica?',
    ms_1ok: '¡Muy bien! Las formas se reflejan con la misma forma, tamaño y color.',

    /* 4 — opinar */
    op_1: 'Cuando miramos una obra propia o de otra persona, podemos dar nuestra opinión.',
    op_2: 'Pero no alcanza con decir me gusta o no me gusta: hay que explicar por qué.',
    op_3: 'Por ejemplo: me llama la atención el círculo rojo, porque contrasta con los colores fríos de alrededor.',
    op_4: 'O también: me transmite calma, porque es simétrica y sus colores son armónicos. ¡Usá las palabras del arte para fundamentar!',

    /* 5 — qué opinión */
    qo_instr: 'Leé las opiniones sobre la obra. ¿Cuál está fundamentada, explicando por qué? Tocá la respuesta.',
    qo_err: 'Buscá la opinión que dice por qué, usando palabras como simetría, armonía o contraste.',
    qo_1: '¿Qué opinión está fundamentada?',
    qo_1ok: '¡Muy bien! Explica por qué, usando la simetría y la armonía.',
    qo_2: '¿Y ahora?',
    qo_2ok: '¡Excelente! Dice qué llama la atención y por qué: por el contraste de colores.',

    /* 6 — taller */
    ta_instr: '¡A crear! La hoja está dividida en dos partes. En la parte uno, el espejo está encendido: lo que dibujes a un lado de la línea punteada se refleja del otro. Hacé un dibujo simétrico con colores que combinen. En la parte dos, apagá el espejo y hacé un dibujo asimétrico con colores contrastantes.',
    t_sello: 'Formas. Elegí una y tocá el cuadro.',
    t_lapiz: 'Lápiz.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla.',
    t_mancha: 'Manchas.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    t_espejo: 'Espejo encendido, para la parte uno.',
    t_espejo_no: 'Espejo apagado, para la parte dos.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    p_guardar: '¡Tu obra quedó guardada!',

    /* 7 — en papel */
    pp_1: 'Ahora en papel. Dividí la hoja en dos partes.',
    pp_2: 'Parte uno, simetría: hacé un dibujo simétrico, como una mariposa, una máscara, un rostro, un edificio o una figura inventada. Que un lado se parezca al otro, y coloreá con colores que combinen, para lograr armonía.',
    pp_3: 'Parte dos, asimetría y contraste: hacé otro dibujo asimétrico, con elementos de diferentes tamaños y ubicaciones. Podés dejar espacios vacíos. Usá colores contrastantes para que algunos elementos llamen la atención.',
    pp_4: 'Necesitás una hoja de papel, lápiz y goma, y lápices de colores, fibras o crayones.',

    /* 8 — foto */
    ft_instr: 'Cuando termines tu obra en papel, pulsá el botón Sacar foto para fotografiarla. O también podés elegir la que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Muy buena obra! Tocá Guardar para tenerla en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Pensá en tu producción y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿La parte uno es simétrica y con colores armónicos?',
    ae_1si: '¡Muy bien! Igual a ambos lados y con unidad.',
    ae_1no: 'Revisá que un lado se parezca al otro, y que los colores combinen.',
    ae_2: '¿La parte dos es asimétrica y con colores contrastantes?',
    ae_2si: '¡Genial! Diferente y con impacto.',
    ae_2no: 'Probá con tamaños distintos y colores opuestos.',
    ae_3: '¿Puedo explicar qué parte llama más la atención y por qué?',
    ae_3si: '¡Excelente! Así se fundamenta una opinión.',
    ae_3no: 'Mirá tu obra y buscá qué se ve primero.',
    ae_fin: 'Gracias por pensar sobre tus decisiones. Mirar y opinar también es parte del arte.',

    /* 10 — pensamos sobre decisiones */
    pd_1: 'Respondé en tu carpeta: ¿cuál de las dos partes es simétrica? ¿Cuál es asimétrica?',
    pd_2: '¿Qué colores usaste para lograr armonía? ¿Y cuáles para generar contraste?',
    pd_3: '¿Qué parte de tu producción llama más la atención? ¿Por qué?',
    pd_4: 'Si tuvieras que elegir una de las dos composiciones, ¿cuál te gusta más? Explicá tu elección.',
    pd_5: 'Recordá: podemos elegir cómo organizar las formas y los colores según lo que queremos expresar, y opinar explicando por qué. Guardá tu producción en la carpeta.',

    cierre: '¡Terminaste! Exploraste la simetría, la asimetría, la armonía y el contraste, y aprendiste a fundamentar tu opinión sobre una obra. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Cuatro maneras */
    {
      tipo: 'narracion', titulo: '🧭 Cuatro maneras de organizar',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#f3ead8' },
          { id: 's', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 8, y: 8, w: 188, h: 136, rx: 10, fill: '#fffdf5' }, { tipo: 'grupo', capas: sim(ARM_F, 188, 136).capas.slice(1).map(c => Object.assign({}, c, { cx: c.cx + 8, cy: c.cy + 4 })) }, txt(102, 140, 'simetría', 16)] },
          { id: 'a', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 204, y: 8, w: 188, h: 136, rx: 10, fill: '#fffdf5' }, { tipo: 'grupo', capas: asim(ARM_C, 188, 136).capas.slice(1).map(c => Object.assign({}, c, { cx: c.cx + 204, cy: c.cy + 4 })) }, txt(298, 140, 'asimetría', 16)] },
          { id: 'h', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 8, y: 156, w: 188, h: 136, rx: 10, fill: '#fffdf5' }, { tipo: 'paleta', x: 22, y: 190, lado: 28, sep: 4, colores: ARM_F }, txt(102, 270, 'armonía', 16)] },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 204, y: 156, w: 188, h: 136, rx: 10, fill: '#fffdf5' }, { tipo: 'paleta', x: 218, y: 190, lado: 28, sep: 4, colores: [RUEDA[0], RUEDA[6], '#1b1b1b', RUEDA[4], RUEDA[10]] }, txt(298, 270, 'contraste', 16)] }
        ]
      },
      pasos: [
        { audio: 'cm_1', texto: 'Una imagen se puede organizar de <b>diferentes maneras</b>.' },
        { audio: 'cm_2', texto: '<b>Simetría</b>: igual o semejante a ambos lados.', mostrar: ['s'], apuntar: [25, 22], resaltar: 's' },
        { audio: 'cm_3', texto: '<b>Asimetría</b>: diferente, pero puede estar equilibrada.', mostrar: ['a'], apuntar: [75, 22], resaltar: 'a' },
        { audio: 'cm_4', texto: '<b>Armonía</b>: colores que combinan y dan unidad.', mostrar: ['h'], apuntar: [25, 70], resaltar: 'h' },
        { audio: 'cm_5', texto: '<b>Contraste</b>: colores muy diferentes, para impactar.', mostrar: ['c'], apuntar: [75, 70], resaltar: 'c' }
      ]
    },

    /* 2 — Esta obra es… */
    {
      tipo: 'elegir', titulo: '🔍 ¿Cómo es esta obra?', instr: 'eo_instr', err: 'eo_err',
      rondas: [
        { texto: '¿Cómo es esta obra?', audio: 'eo_1', ok: 'eo_1ok', visual: { escena: sim(ARM_F, 300, 225) }, correcta: 'sa', fijo: true,
          opciones: [{ id: 'sa', label: '🦋 Simétrica · 🤝 armónica' }, { id: 'sc', label: '🦋 Simétrica · ⚡ con contraste' }, { id: 'aa', label: '🌀 Asimétrica · 🤝 armónica' }, { id: 'ac', label: '🌀 Asimétrica · ⚡ con contraste' }] },
        { texto: '¿Cómo es esta obra?', audio: 'eo_2', ok: 'eo_2ok', visual: { escena: asim(CON, 300, 225) }, correcta: 'ac', fijo: true,
          opciones: [{ id: 'sa', label: '🦋 Simétrica · 🤝 armónica' }, { id: 'sc', label: '🦋 Simétrica · ⚡ con contraste' }, { id: 'aa', label: '🌀 Asimétrica · 🤝 armónica' }, { id: 'ac', label: '🌀 Asimétrica · ⚡ con contraste' }] },
        { texto: '¿Cómo es esta obra?', audio: 'eo_3', ok: 'eo_3ok', visual: { escena: sim([RUEDA[0], RUEDA[6], RUEDA[4], RUEDA[10], '#1b1b1b'], 300, 225) }, correcta: 'sc', fijo: true,
          opciones: [{ id: 'sa', label: '🦋 Simétrica · 🤝 armónica' }, { id: 'sc', label: '🦋 Simétrica · ⚡ con contraste' }, { id: 'aa', label: '🌀 Asimétrica · 🤝 armónica' }, { id: 'ac', label: '🌀 Asimétrica · ⚡ con contraste' }] },
        { texto: '¿Cómo es esta obra?', audio: 'eo_4', ok: 'eo_4ok', visual: { escena: asim(ARM_C, 300, 225) }, correcta: 'aa', fijo: true,
          opciones: [{ id: 'sa', label: '🦋 Simétrica · 🤝 armónica' }, { id: 'sc', label: '🦋 Simétrica · ⚡ con contraste' }, { id: 'aa', label: '🌀 Asimétrica · 🤝 armónica' }, { id: 'ac', label: '🌀 Asimétrica · ⚡ con contraste' }] }
      ]
    },

    /* 3 — Completá la máscara */
    {
      tipo: 'elegir', titulo: '🎭 Completá la máscara', instr: 'ms_instr', err: 'ms_err',
      rondas: [
        { texto: '¿Cuál la completa con <b>simetría</b>?', audio: 'ms_1', ok: 'ms_1ok', visual: { escena: mascara() }, revela: { escena: mascara(reflejo) }, correcta: 'r',
          opciones: [{ id: 'c', escena: mascara(copia) }, { id: 'r', escena: mascara(reflejo) }, { id: 'o', escena: mascara(otroColor) }] }
      ]
    },

    /* 4 — Opinar */
    {
      tipo: 'narracion', titulo: '🗣️ Dar mi opinión',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#f3ead8' },
          { tipo: 'rect', x: 20, y: 20, w: 200, h: 260, fill: '#8d6e4f' }, { tipo: 'rect', x: 32, y: 32, w: 176, h: 236, fill: '#fffdf5' },
          { tipo: 'grupo', capas: sim(ARM_F, 176, 236).capas.slice(1).map(c => Object.assign({}, c, { cx: c.cx + 32, cy: c.cy + 32 })) },
          { tipo: 'forma', forma: 'circulo', cx: 120, cy: 150, size: 40, fill: '#e32322', stroke: '#2b2118', sw: 3 },
          { id: 'b1', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 232, y: 30, w: 160, h: 60, rx: 14, fill: '#ffffff', stroke: '#c9b48f' }, txt(312, 66, '¿Me gusta? 🤔', 18)] },
          { id: 'b2', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 232, y: 100, w: 160, h: 80, rx: 14, fill: '#ffffff', stroke: '#c9b48f' }, txt(312, 132, '¿Por qué?', 22, '#e32322'), txt(312, 160, 'fundamentá', 16)] },
          { id: 'b3', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 232, y: 190, w: 160, h: 90, rx: 14, fill: '#ffffff', stroke: '#c9b48f' }, txt(312, 218, 'simetría', 15), txt(312, 238, 'armonía', 15), txt(312, 258, 'contraste', 15)] }
        ]
      },
      pasos: [
        { audio: 'op_1', texto: 'Podemos dar nuestra <b>opinión</b> sobre una obra. 🗣️', mostrar: ['b1'], apuntar: [78, 18] },
        { audio: 'op_2', texto: 'No alcanza con "me gusta": hay que explicar <b>por qué</b>.', mostrar: ['b2'], apuntar: [78, 45], resaltar: 'b2' },
        { audio: 'op_3', texto: '"Me llama la atención el círculo rojo, porque <b>contrasta</b> con los colores fríos."', apuntar: [30, 50] },
        { audio: 'op_4', texto: '"Me transmite calma, porque es <b>simétrica</b> y <b>armónica</b>."', mostrar: ['b3'], apuntar: [78, 78], resaltar: 'b3' }
      ]
    },

    /* 5 — ¿Qué opinión está fundamentada? */
    {
      tipo: 'elegir', titulo: '💬 ¿Qué opinión está fundamentada?', instr: 'qo_instr', err: 'qo_err',
      rondas: [
        { texto: 'Opiniones sobre esta obra', audio: 'qo_1', ok: 'qo_1ok', visual: { escena: sim(ARM_F, 300, 225) }, correcta: 'f',
          opciones: [{ id: 'a', label: '"Me gusta y ya."' }, { id: 'f', label: '"Me transmite calma, porque es simétrica y sus colores fríos combinan."' }, { id: 'b', label: '"Es fea."' }] },
        { texto: 'Opiniones sobre esta obra', audio: 'qo_2', ok: 'qo_2ok', visual: { escena: asim(CON, 300, 225) }, correcta: 'f',
          opciones: [{ id: 'a', label: '"No sé, está bien."' }, { id: 'b', label: '"Tiene muchos colores."' }, { id: 'f', label: '"El círculo amarillo llama la atención, porque contrasta con el violeta y el negro."' }] }
      ]
    },

    /* 6 — Taller */
    {
      tipo: 'taller', titulo: '🎨 Igual, diferente y con color', instr: 'ta_instr',
      plantilla: 'dividida', etiquetas: ['1 · simetría', '2 · asimetría'], espejo: 'activo', ejeEspejo: 200,
      herramientas: ['sello', 'lapiz', 'balde', 'mancha', 'goma'],
      sellos: ['hoja', 'gota', 'circulo', 'triangulo', 'cuadrado', 'estrella', 'ala', 'ovalo'],
      grupos: [{ t: 'cálidos', c: ['amarillo', 'amarilloNaranja', 'naranja', 'rojoNaranja', 'rojo', 'magenta'] }, { t: 'fríos', c: ['violeta', 'azulVioleta', 'azul', 'celeste', 'verde', 'verdeAmarillo'] }, { t: 'claros y oscuros', c: ['blanco', 'grisClaro', 'grisOscuro', 'negro'] }],
      colores: Object.keys(COL),
      archivo: 'igual-diferente-y-con-color.png'
    },

    /* 7 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: 'Dividí la hoja en <b>dos partes</b>.' },
        { audio: 'pp_2', texto: '<b>Parte 1 · Simetría:</b> mariposa, máscara, rostro, edificio o figura inventada, con colores que <b>combinen</b>. 🦋' },
        { audio: 'pp_3', texto: '<b>Parte 2 · Asimetría y contraste:</b> tamaños y ubicaciones diferentes, espacios vacíos, colores <b>contrastantes</b>. ⚡' },
        { audio: 'pp_4', texto: '🧰 <b>Materiales:</b> hoja, lápiz, goma, y colores, fibras o crayones.' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mi obra en papel', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu obra, o <b>🖼️ Elegir de la galería</b> para buscar la que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'igual-diferente-y-con-color-foto.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi obra', instr: 'ae_instr', fin: 'ae_fin',
      mini: sim(ARM_C, 300, 225),
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿La parte 1 es <b>simétrica</b> y <b>armónica</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿La parte 2 es <b>asimétrica</b> y con <b>contraste</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Puedo explicar qué <b>llama la atención</b> y por qué?' }
      ]
    },

    /* 10 — Pensamos sobre nuestras decisiones */
    {
      tipo: 'pasos', titulo: '👀 Pensamos sobre nuestras decisiones', img: 'img/familia.jpg',
      pasos: [
        { audio: 'pd_1', texto: '📝 ¿Cuál parte es <b>simétrica</b>? ¿Cuál es <b>asimétrica</b>?' },
        { audio: 'pd_2', texto: '📝 ¿Qué colores usaste para la <b>armonía</b>? ¿Y para el <b>contraste</b>?' },
        { audio: 'pd_3', texto: '📝 ¿Qué parte <b>llama más la atención</b>? ¿Por qué?' },
        { audio: 'pd_4', texto: '📝 ¿Cuál composición te gusta más? <b>Explicá tu elección</b>.' },
        { audio: 'pd_5', texto: '⭐ Elegimos cómo organizar formas y colores según lo que queremos <b>expresar</b>. 📁 Guardá tu producción.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
