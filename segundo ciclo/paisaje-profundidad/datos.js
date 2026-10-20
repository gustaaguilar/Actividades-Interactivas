/* ============================================================
   UN PAISAJE CON PROFUNDIDAD — Artes Visuales · 6.º grado
   Planos, tamaño e intensidad del color
   Basado en la Ficha Viajera N.º 2 de Artes Visuales · 6.º grado
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  celesteLejano: '#bcd4e6', lilaLejano: '#c9c3e0', grisAzul: '#9fb3c8', verdeLejano: '#a9c5b4',
  verdeMedio: '#4f9a6b', azulMedio: '#4a7fb5', ocreMedio: '#c9a35b', marronMedio: '#8d6e4f',
  rojo: '#e63946', naranja: '#fb8500', amarillo: '#ffb703', verdeIntenso: '#1f8a3a', marron: '#6b3f1d', negro: '#1b1b1b', blanco: '#ffffff'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const F = (forma, cx, cy, size, fill, extra) => Object.assign({ tipo: 'forma', forma, cx, cy, size, fill }, extra || {});
/* paisaje completo en 400×300, por planos */
const CIELO = { tipo: 'rect', fill: '#e8f2fb' };
const FONDO = [F('montania', 90, 120, 120, COL.lilaLejano), F('montania', 200, 110, 140, COL.celesteLejano), F('montania', 320, 122, 110, COL.grisAzul), { tipo: 'rect', x: 0, y: 150, w: 400, h: 150, fill: '#d5e6d2' }];
const MEDIO = [{ tipo: 'path', d: 'M0 175Q120 150 240 172T400 165L400 300L0 300Z', fill: '#9cc58f', stroke: '#9cc58f', sw: 1 },
  F('arbol', 80, 160, 60, COL.verdeMedio), F('arbol', 140, 165, 50, COL.verdeMedio), F('casa', 290, 158, 56, COL.ocreMedio)];
const PRIMER = [{ tipo: 'path', d: 'M0 240Q140 215 260 238T400 230L400 300L0 300Z', fill: '#5daa4a', stroke: '#5daa4a', sw: 1 },
  F('arbol', 330, 200, 170, COL.verdeIntenso, { stroke: '#123', sw: 2 }), F('flor', 60, 262, 48, COL.rojo), F('flor', 115, 272, 36, COL.amarillo), F('flor', 180, 266, 42, COL.naranja)];
/* escena con un elemento marcado */
const MARCA = (cx, cy, r) => ({ tipo: 'aro', cx, cy, r, stroke: '#ff006e', sw: 5 });
const conMarca = (m) => ({ w: 400, h: 300, capas: [CIELO, ...FONDO, ...MEDIO, ...PRIMER, m] });
/* el mismo árbol a tres distancias */
const arbolEn = (size, fill, cy) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#e8f2fb' }, { tipo: 'rect', x: 0, y: 150, w: 300, h: 75, fill: '#cfe3c8' }, F('arbol', 150, cy, size, fill)] });

window.DATOS = {
  meta: {
    titulo: 'Un paisaje con profundidad',
    subtitulo: 'Cerca y lejos con el color',
    area: '🎨 Artes Visuales · 6.º grado',
    grado: 'Artes Visuales · 6.º grado',
    fuente: 'Basado en la Ficha Viajera N.º 2 de Artes Visuales · 6.º grado',
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
    portada: '¡Hola! Bienvenidos a Un paisaje con profundidad. Vamos a descubrir cómo el tamaño y el color nos ayudan a que un dibujo parezca tener cosas cerca y cosas lejos. Tocá Comenzar.',

    /* 1 — los planos */
    pl_1: 'Una hoja es plana, pero con el dibujo podemos crear sensación de profundidad, como si el paisaje siguiera hacia atrás.',
    pl_2: 'El fondo es la parte más alejada: elementos pequeños, con colores suaves o fríos.',
    pl_3: 'En el medio van elementos de tamaño mediano, con colores un poco más intensos.',
    pl_4: 'El primer plano es lo más cercano: elementos grandes y definidos, con colores intensos o cálidos.',

    /* 2 — el color y la distancia */
    cd_1: 'Mirá el mismo árbol a tres distancias.',
    cd_2: 'Lejos, se ve pequeño, pálido y un poco azulado.',
    cd_3: 'En el medio, mediano y con un color más fuerte.',
    cd_4: 'Cerca, grande, definido y con un color intenso. ¡El color y el tamaño crean profundidad!',

    /* 3 — en qué plano */
    qp_instr: 'Mirá el elemento marcado con el círculo. ¿Está en el fondo, en el medio o en el primer plano? Tocá la respuesta.',
    qp_err: 'Mirá su tamaño y la intensidad de su color, y probá otra vez.',
    qp_1: '¡Sí! Las montañas pálidas están en el fondo.',
    qp_2: '¡Muy bien! El árbol grande e intenso está en el primer plano.',
    qp_3: '¡Correcto! La casita mediana está en el medio.',
    qp_4: '¡Exacto! Las flores de colores cálidos están en el primer plano.',
    qp_5: '¡Bien! Los árboles medianos están en el medio.',
    qp_6: '¡Muy bien! Esa montaña pequeña y azulada está en el fondo.',

    /* 4 — cerca o lejos */
    cl_instr: 'Mirá los tres árboles y elegí el que se pide. Tocá la imagen.',
    cl_err: 'Mirá el tamaño y el color de cada árbol, y probá otra vez.',
    cl_1: '¿Cuál parece estar más cerca?',
    cl_1ok: '¡Muy bien! Grande, definido e intenso: está en el primer plano.',
    cl_2: '¿Cuál parece estar más lejos?',
    cl_2ok: '¡Excelente! Pequeño y pálido: está en el fondo.',
    cl_3: '¿Cuál está en el medio?',
    cl_3ok: '¡Correcto! Mediano y con un color intermedio.',

    /* 5 — qué colores */
    qc_instr: 'Pensá en tu paisaje. ¿Qué colores usarías? Tocá la paleta.',
    qc_err: 'Pensalo otra vez: lo lejano es suave y frío, lo cercano es intenso y cálido.',
    qc_1: '¿Qué colores usarías para las montañas del fondo?',
    qc_1ok: '¡Sí! Colores suaves y fríos hacen que parezcan lejanas.',
    qc_2: '¿Qué colores usarías para el primer plano?',
    qc_2ok: '¡Muy bien! Colores intensos y cálidos parecen más próximos.',
    qc_3: 'Querés que un elemento se destaque mucho. ¿Qué harías con su color?',
    qc_3ok: '¡Excelente! Un color más intenso y que contraste con lo de alrededor lo hace destacar.',

    /* 6 — taller */
    ta_instr: '¡Creá tu paisaje imaginario! La hoja está dividida en tres zonas: fondo, medio y primer plano. Arriba, en el fondo, poné elementos pequeños con colores suaves o fríos. En el medio, elementos medianos. Abajo, en el primer plano, elementos grandes con colores intensos o cálidos.',
    t_sello: 'Formas. Elegí una, elegí el tamaño, y tocá el cuadro.',
    t_lapiz: 'Lápiz.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla.',
    t_mancha: 'Manchas.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico, para el fondo.', tam_2: 'Mediano, para el medio.', tam_3: 'Grande, para el primer plano.',
    p_guardar: '¡Tu paisaje quedó guardado!',

    /* 7 — en papel */
    pp_1: 'Ahora en papel. Elegí un paisaje imaginario: un bosque, un paisaje de montañas, un paisaje de mar, un planeta imaginario o una ciudad.',
    pp_2: 'Paso uno, el fondo: en la parte más alejada dibujá elementos pequeños, como montañas, edificios o árboles. Colorealos con tonos suaves o fríos.',
    pp_3: 'Paso dos, el medio: agregá elementos de tamaño mediano. Podés usar colores un poco más intensos.',
    pp_4: 'Paso tres, el primer plano: en la parte más cercana dibujá elementos más grandes y definidos. Usá colores más intensos o cálidos para que parezcan más próximos.',
    pp_5: 'Necesitás una hoja de la carpeta, lápiz, goma, y lápices de colores, fibras o crayones.',

    /* 8 — foto */
    ft_instr: 'Cuando termines tu paisaje en papel, pulsá el botón Sacar foto para fotografiarlo. O también podés elegir el que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Qué paisaje con profundidad! Tocá Guardar para tenerlo en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Observá tu paisaje y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Los elementos del fondo son pequeños y con colores suaves o fríos?',
    ae_1si: '¡Muy bien! Parecen lejanos.',
    ae_1no: 'Probá hacerlos más chiquitos y con colores más pálidos.',
    ae_2: '¿Hay elementos medianos en el medio?',
    ae_2si: '¡Genial! El medio conecta el fondo con el primer plano.',
    ae_2no: 'Agregá algún elemento de tamaño mediano.',
    ae_3: '¿Los elementos del primer plano son grandes, definidos e intensos?',
    ae_3si: '¡Excelente! Parecen muy cercanos.',
    ae_3no: 'Probá hacerlos más grandes y con colores cálidos.',
    ae_fin: 'Gracias por observar tu paisaje con atención. Mirar lo que hicimos también es parte del arte.',

    /* 10 — pensar como artista */
    ar_1: 'Respondé en tu carpeta: ¿qué elementos parecen estar más cerca? ¿Cuáles más lejos?',
    ar_2: '¿Qué colores utilizaste adelante? ¿Y atrás?',
    ar_3: 'Imaginá que querés que un elemento de tu paisaje se destaque mucho. ¿Lo harías más claro, más oscuro o más intenso? ¿Por qué?',
    ar_4: 'Recordá: los elementos más grandes e intensos pueden parecer más cercanos, y los más pequeños y suaves, más alejados. Guardá tu producción en la carpeta.',

    cierre: '¡Terminaste! Aprendiste a usar el tamaño y la intensidad de los colores para crear profundidad. ¡Tu dibujo ya tiene espacio! ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Los planos */
    {
      tipo: 'narracion', titulo: '🏞️ Fondo, medio y primer plano',
      escena: {
        w: 400, h: 300,
        capas: [
          CIELO,
          { id: 'f', tipo: 'grupo', capas: FONDO },
          { id: 'm', tipo: 'grupo', oculto: true, capas: MEDIO },
          { id: 'p', tipo: 'grupo', oculto: true, capas: PRIMER }
        ]
      },
      pasos: [
        { audio: 'pl_1', texto: 'Con el dibujo podemos crear <b>profundidad</b>. 🏞️' },
        { audio: 'pl_2', texto: '<b>Fondo</b>: pequeño, suave o frío.', apuntar: [50, 30], resaltar: 'f' },
        { audio: 'pl_3', texto: '<b>Medio</b>: mediano, un poco más intenso.', mostrar: ['m'], apuntar: [25, 52], resaltar: 'm' },
        { audio: 'pl_4', texto: '<b>Primer plano</b>: grande, definido, intenso o cálido.', mostrar: ['p'], apuntar: [82, 65], resaltar: 'p' }
      ]
    },

    /* 2 — El color y la distancia */
    {
      tipo: 'narracion', titulo: '🌳 El color y la distancia',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#e8f2fb' }, { tipo: 'rect', x: 0, y: 200, w: 400, h: 100, fill: '#cfe3c8' },
          { id: 'l', tipo: 'grupo', oculto: true, capas: [F('arbol', 70, 185, 50, COL.verdeLejano), txt(70, 240, 'lejos', 18)] },
          { id: 'm', tipo: 'grupo', oculto: true, capas: [F('arbol', 175, 165, 100, COL.verdeMedio), txt(175, 248, 'medio', 18)] },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [F('arbol', 315, 140, 170, COL.verdeIntenso, { stroke: '#123', sw: 2 }), txt(315, 270, 'cerca', 18)] }
        ]
      },
      pasos: [
        { audio: 'cd_1', texto: 'El mismo árbol a <b>tres distancias</b>.' },
        { audio: 'cd_2', texto: '<b>Lejos</b>: pequeño, pálido, azulado.', mostrar: ['l'], apuntar: [17, 55], resaltar: 'l' },
        { audio: 'cd_3', texto: '<b>Medio</b>: mediano, color más fuerte.', mostrar: ['m'], apuntar: [44, 50], resaltar: 'm' },
        { audio: 'cd_4', texto: '<b>Cerca</b>: grande, definido, intenso. ✨', mostrar: ['c'], apuntar: [79, 40], resaltar: 'c' }
      ]
    },

    /* 3 — ¿En qué plano está? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿En qué plano está?', instr: 'qp_instr', err: 'qp_err',
      texto: '¿En qué plano está lo <b>marcado</b>?',
      categorias: [{ id: 'f', label: '🏔️ Fondo', sub: '' }, { id: 'm', label: '🏡 Medio', sub: '' }, { id: 'p', label: '🌳 Primer plano', sub: '' }],
      items: [
        { id: 1, cat: 'f', ok: 'qp_1', escena: conMarca(MARCA(200, 105, 62)) },
        { id: 2, cat: 'p', ok: 'qp_2', escena: conMarca(MARCA(330, 200, 84)) },
        { id: 3, cat: 'm', ok: 'qp_3', escena: conMarca(MARCA(290, 158, 36)) },
        { id: 4, cat: 'p', ok: 'qp_4', escena: conMarca(MARCA(115, 266, 60)) },
        { id: 5, cat: 'm', ok: 'qp_5', escena: conMarca(MARCA(110, 162, 48)) },
        { id: 6, cat: 'f', ok: 'qp_6', escena: conMarca(MARCA(320, 112, 46)) }
      ]
    },

    /* 4 — ¿Cerca o lejos? */
    {
      tipo: 'elegir', titulo: '🔭 ¿Cerca o lejos?', instr: 'cl_instr', err: 'cl_err',
      rondas: [
        { texto: '¿Cuál parece <b>más cerca</b>?', audio: 'cl_1', ok: 'cl_1ok', correcta: 'c',
          opciones: [{ id: 'l', escena: arbolEn(50, COL.verdeLejano, 145) }, { id: 'm', escena: arbolEn(100, COL.verdeMedio, 130) }, { id: 'c', escena: arbolEn(190, COL.verdeIntenso, 115) }] },
        { texto: '¿Cuál parece <b>más lejos</b>?', audio: 'cl_2', ok: 'cl_2ok', correcta: 'l',
          opciones: [{ id: 'c', escena: arbolEn(190, COL.verdeIntenso, 115) }, { id: 'l', escena: arbolEn(50, COL.verdeLejano, 145) }, { id: 'm', escena: arbolEn(100, COL.verdeMedio, 130) }] },
        { texto: '¿Cuál está <b>en el medio</b>?', audio: 'cl_3', ok: 'cl_3ok', correcta: 'm',
          opciones: [{ id: 'm', escena: arbolEn(100, COL.verdeMedio, 130) }, { id: 'c', escena: arbolEn(190, COL.verdeIntenso, 115) }, { id: 'l', escena: arbolEn(50, COL.verdeLejano, 145) }] }
      ]
    },

    /* 5 — ¿Qué colores usarías? */
    {
      tipo: 'elegir', titulo: '🎨 ¿Qué colores usarías?', instr: 'qc_instr', err: 'qc_err',
      rondas: [
        { texto: 'Para las montañas del <b>fondo</b>', audio: 'qc_1', ok: 'qc_1ok', correcta: 's',
          opciones: [{ id: 's', paleta: [COL.celesteLejano, COL.lilaLejano, COL.grisAzul, COL.verdeLejano], label: 'suaves y fríos' }, { id: 'i', paleta: [COL.rojo, COL.naranja, COL.amarillo, COL.verdeIntenso], label: 'intensos y cálidos' }, { id: 'o', paleta: ['#1b1b1b', '#3a1f1f', '#2b2b4a', '#1f3a2a'], label: 'muy oscuros' }] },
        { texto: 'Para el <b>primer plano</b>', audio: 'qc_2', ok: 'qc_2ok', correcta: 'i',
          opciones: [{ id: 's', paleta: [COL.celesteLejano, COL.lilaLejano, COL.grisAzul, COL.verdeLejano], label: 'suaves y fríos' }, { id: 'i', paleta: [COL.rojo, COL.naranja, COL.amarillo, COL.verdeIntenso], label: 'intensos y cálidos' }, { id: 'g', paleta: ['#d9d9d9', '#bfbfbf', '#e6e6e6', '#cccccc'], label: 'grises pálidos' }] },
        { texto: 'Para que un elemento se <b>destaque mucho</b>', audio: 'qc_3', ok: 'qc_3ok', correcta: 'i', visual: { escena: { w: 400, h: 300, capas: [CIELO, ...FONDO, ...MEDIO, ...PRIMER] } },
          opciones: [{ id: 'p', label: '🌫️ Más pálido, igual que el fondo' }, { id: 'i', label: '✨ Más intenso y que contraste con lo de alrededor' }, { id: 'n', label: '🤷 No cambiarle el color' }] }
      ]
    },

    /* 6 — Taller */
    {
      tipo: 'taller', titulo: '🏞️ Mi paisaje con profundidad', instr: 'ta_instr',
      plantilla: 'planos',
      herramientas: ['sello', 'lapiz', 'balde', 'mancha', 'goma'],
      sellos: ['montania', 'arbol', 'casa', 'nube', 'sol', 'flor', 'hoja', 'luna'],
      grupos: [{ t: 'fondo · suaves y fríos', c: ['celesteLejano', 'lilaLejano', 'grisAzul', 'verdeLejano', 'blanco'] }, { t: 'medio', c: ['verdeMedio', 'azulMedio', 'ocreMedio', 'marronMedio'] }, { t: 'primer plano · intensos y cálidos', c: ['rojo', 'naranja', 'amarillo', 'verdeIntenso', 'marron', 'negro'] }],
      colores: Object.keys(COL),
      archivo: 'mi-paisaje-con-profundidad.png'
    },

    /* 7 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: 'Elegí: 🌳 bosque · 🏔️ montañas · 🌊 mar · 🌌 planeta imaginario · 🏙️ ciudad.' },
        { audio: 'pp_2', texto: '<b>1 · El fondo:</b> elementos pequeños, tonos <b>suaves o fríos</b>.' },
        { audio: 'pp_3', texto: '<b>2 · El medio:</b> elementos medianos, colores un poco más <b>intensos</b>.' },
        { audio: 'pp_4', texto: '<b>3 · El primer plano:</b> elementos grandes y definidos, colores <b>intensos o cálidos</b>.' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> hoja de la carpeta, lápiz, goma, y colores, fibras o crayones.' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mi paisaje en papel', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu paisaje, o <b>🖼️ Elegir de la galería</b> para buscar el que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'mi-paisaje-con-profundidad-foto.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🔍 Observá tu paisaje', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 400, h: 300, capas: [CIELO, ...FONDO, ...MEDIO, ...PRIMER] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿El <b>fondo</b> es pequeño y suave o frío?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Hay elementos <b>medianos</b> en el medio?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿El <b>primer plano</b> es grande e intenso?' }
      ]
    },

    /* 10 — Pensar como artista */
    {
      tipo: 'pasos', titulo: '🎨 Para pensar como artista', img: 'img/familia.jpg',
      pasos: [
        { audio: 'ar_1', texto: '📝 ¿Qué parece estar más <b>cerca</b>? ¿Qué parece más <b>lejos</b>?' },
        { audio: 'ar_2', texto: '📝 ¿Qué colores usaste <b>adelante</b>? ¿Y <b>atrás</b>?' },
        { audio: 'ar_3', texto: '🤔 Para que algo se <b>destaque</b>: ¿más claro, más oscuro o más intenso? ¿Por qué?' },
        { audio: 'ar_4', texto: '💡 Grande e intenso = cerca. Pequeño y suave = lejos. 📌 Guardá tu producción.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
