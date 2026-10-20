/* ============================================================
   UNA IMAGEN EQUILIBRADA — Artes Visuales · 7.º grado
   Proporción y equilibrio
   Basado en la Ficha Viajera 1 de Artes Visuales · 7.º grado
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  negro: '#1b1b1b', rojo: '#e63946', naranja: '#fb8500', amarillo: '#ffb703', verde: '#2a9d8f', verdeClaro: '#90be6d',
  celeste: '#8ecae6', azul: '#3a86ff', violeta: '#8338ec', rosa: '#ff70a6', marron: '#8d5524', gris: '#9a9a9a', blanco: '#ffffff'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const F = (forma, cx, cy, size, fill, extra) => Object.assign({ tipo: 'forma', forma, cx, cy, size, fill, stroke: '#2b2118', sw: 2 }, extra || {});
const piso = (w, h, y) => [{ tipo: 'rect', fill: '#eaf4fb' }, { tipo: 'rect', x: 0, y, w, h: h - y, fill: '#cfe3c8' }];
const emo = (e, x, y, s) => txt(x, y, e, s);
/* escenas de proporción: casa + persona (u otros) a distintos tamaños */
const prop = (a, b) => ({ w: 300, h: 225, capas: [...piso(300, 225, 185), emo(a[0], a[1], 190, a[2]), emo(b[0], b[1], 190, b[2])] });
/* composiciones para equilibrio (300×225) */
const EQ = (items) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, ...items] });
const COMP = {
  eq1: [F('arbol', 70, 120, 110, COL.verde), F('casa', 225, 130, 100, COL.rojo), F('sol', 150, 40, 50, COL.amarillo)],
  eq2: [F('circulo', 150, 112, 120, COL.azul), F('estrella', 50, 50, 50, COL.amarillo), F('estrella', 250, 175, 50, COL.amarillo), F('flor', 60, 180, 40, COL.rosa), F('flor', 240, 45, 40, COL.rosa)],
  eq3: [F('montania', 90, 130, 130, COL.violeta), F('arbol', 230, 140, 70, COL.verde), F('nube', 250, 50, 60, '#ffffff'), F('flor', 280, 190, 30, COL.rojo), F('flor', 190, 195, 30, COL.naranja)],
  iz1: [F('arbol', 50, 120, 110, COL.verde), F('casa', 110, 140, 90, COL.rojo), F('sol', 40, 35, 50, COL.amarillo), F('flor', 90, 200, 36, COL.rosa)],
  iz2: [F('circulo', 70, 110, 120, COL.azul), F('cuadrado', 60, 190, 50, COL.naranja), F('estrella', 120, 40, 46, COL.amarillo)],
  de1: [F('montania', 230, 130, 140, COL.violeta), F('arbol', 270, 150, 80, COL.verde), F('nube', 210, 40, 60, '#ffffff'), F('flor', 250, 200, 34, COL.rojo)],
  de2: [F('casa', 240, 125, 110, COL.rojo), F('arbol', 180, 150, 70, COL.verde), F('sol', 270, 35, 46, COL.amarillo)]
};
const BAL = (ang) => ({ tipo: 'balanza', cx: 150, cy: 200, w: 160, ang });

window.DATOS = {
  meta: {
    titulo: 'Una imagen equilibrada',
    subtitulo: 'Proporción y equilibrio',
    area: '🎨 Artes Visuales · 7.º grado',
    grado: 'Artes Visuales · 7.º grado',
    fuente: 'Basado en la Ficha Viajera 1 de Artes Visuales · 7.º grado',
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
    portada: '¡Hola! Bienvenidos a Una imagen equilibrada. Vamos a trabajar la proporción, que relaciona los tamaños entre sí, y el equilibrio, para organizar una imagen sin cargarla hacia un solo lado. Tocá Comenzar.',

    /* 1 — proporción */
    pr_1: 'En una imagen, las formas y los objetos tienen distintos tamaños.',
    pr_2: 'La proporción nos ayuda a relacionar esos tamaños entre sí: un árbol es más alto que una casa, y una persona es más chica que la casa.',
    pr_3: 'Si un perro aparece más grande que la casa, algo no está en proporción. Puede servir para una imagen fantástica, pero tiene que ser una decisión.',

    /* 2 — equilibrio */
    eq_1: 'Mirá esta imagen: todos los elementos están del mismo lado.',
    eq_2: 'Parece cargada hacia la izquierda, como una balanza que se inclina.',
    eq_3: 'Si distribuimos los elementos en distintos sectores, la imagen se ve equilibrada.',
    eq_4: 'El equilibrio no significa que los dos lados sean iguales: una forma grande de un lado puede equilibrarse con varias chicas del otro.',

    /* 3 — qué tamaño */
    qt_instr: 'Mirá las tres imágenes y elegí la que está en proporción. Tocá la imagen.',
    qt_err: 'Pensá cómo son esos tamaños en la realidad y probá otra vez.',
    qt_1: '¿En cuál la persona y la casa están en proporción?',
    qt_1ok: '¡Muy bien! La persona es más chica que la casa: llega más o menos a la altura de la puerta.',
    qt_2: '¿En cuál el perro y la persona están en proporción?',
    qt_2ok: '¡Excelente! El perro es más chico que la persona.',
    qt_3: '¿En cuál el árbol y la flor están en proporción?',
    qt_3ok: '¡Correcto! El árbol es mucho más alto que la flor.',

    /* 4 — equilibrada o cargada */
    ec_instr: 'Mirá cada imagen. ¿Está equilibrada, o cargada hacia un solo lado? Tocá la respuesta.',
    ec_err: 'Imaginá una balanza debajo de la imagen. ¿Se inclina?',
    ec_e: '¡Sí! Está equilibrada: los elementos están distribuidos.',
    ec_c: '¡Muy bien! Está cargada: casi todo está de un mismo lado.',

    /* 5 — dónde ubicarlo */
    du_instr: 'La imagen está cargada hacia un lado. ¿Dónde agregarías un elemento para equilibrarla? Tocá la imagen.',
    du_err: 'Mirá la balanza: ¿de qué lado falta peso?',
    du_1: '¿Dónde pondrías la casa?',
    du_1ok: '¡Muy bien! Del lado vacío, la casa equilibra la imagen.',
    du_2: '¿Dónde pondrías el árbol?',
    du_2ok: '¡Excelente! Ahora la imagen no está cargada hacia un solo lado.',
    du_3: '¿Dónde pondrías el círculo grande?',
    du_3ok: '¡Correcto! El círculo grande compensa los elementos del otro lado.',

    /* 6 — taller */
    ta_instr: '¡Creá una composición libre: un paisaje, una habitación, una plaza, personas, animales o un mundo imaginario! Elegí las formas y su tamaño pensando la proporción. Arriba hay una balanza que se mueve según cómo distribuyas los elementos: tratá de que quede equilibrada.',
    t_sello: 'Formas. Elegí una, elegí el tamaño, y tocá el cuadro.',
    t_lapiz: 'Lápiz.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla.',
    t_mancha: 'Manchas.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    bal_eq: '¡Equilibrada!',
    bal_izq: 'Está cargada hacia la izquierda.',
    bal_der: 'Está cargada hacia la derecha.',
    p_guardar: '¡Tu composición quedó guardada!',

    /* 7 — en papel */
    pp_1: 'Ahora en papel. Vas a crear una composición libre: un paisaje, una habitación, una plaza, una persona, animales o un mundo imaginario.',
    pp_2: 'Primero, dibujá varios elementos prestando atención a sus tamaños. Pensá qué cosas deberían ser grandes y cuáles pequeñas.',
    pp_3: 'Después, organizá los elementos para que la imagen tenga equilibrio. Evitá colocar todos los elementos juntos en un mismo sector.',
    pp_4: 'Finalmente, coloreá tu producción.',
    pp_5: 'Necesitás una hoja de papel, lápiz y goma, y lápices de colores, fibras o crayones.',

    /* 8 — foto */
    ft_instr: 'Cuando termines tu composición en papel, pulsá el botón Sacar foto para fotografiarla. O también podés elegir la que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Muy buena composición! Tocá Guardar para tenerla en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Mirá tu composición y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Pensé qué elementos tenían que ser grandes y cuáles pequeños?',
    ae_1si: '¡Muy bien! Cuidaste la proporción.',
    ae_1no: 'Revisá si los tamaños se relacionan bien entre sí.',
    ae_2: '¿Distribuí los elementos sin cargar un solo sector?',
    ae_2si: '¡Genial! Tu imagen está equilibrada.',
    ae_2no: 'Probá agregar algo del lado que quedó más vacío.',
    ae_3: '¿Hay algún elemento que quise destacar especialmente?',
    ae_3si: '¡Excelente! Tomaste una decisión como artista.',
    ae_3no: 'Pensá cuál te gustaría que se vea primero.',
    ae_fin: 'Gracias por mirar tu producción con atención. Mirar lo que hicimos también es parte del arte.',

    /* 10 — respondé */
    re_1: 'Mirá tu dibujo y respondé en la carpeta: ¿qué elemento dibujaste más grande? ¿Por qué elegiste ese tamaño?',
    re_2: '¿Cómo lograste que tu dibujo se vea equilibrado?',
    re_3: '¿Hay algún elemento que quieras destacar especialmente? ¿Cuál? ¿Qué cambiarías si tuvieras que hacerla nuevamente?',
    re_4: 'Recordá: no existe una única manera de hacer una imagen. Lo importante es tomar decisiones y poder explicar por qué elegiste determinados tamaños y dónde ubicar cada elemento.',
    re_5: 'Guardá tu producción en la carpeta para llevarla a la escuela al regresar.',

    cierre: '¡Terminaste! Aprendiste a relacionar los tamaños con la proporción y a organizar los elementos para lograr equilibrio. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Proporción */
    {
      tipo: 'narracion', titulo: '📏 La proporción',
      escena: {
        w: 400, h: 300,
        capas: [
          ...piso(400, 300, 240),
          { id: 'b', tipo: 'grupo', capas: [emo('🌳', 70, 250, 170), emo('🏠', 220, 250, 120), emo('🧍', 320, 250, 64), emo('🐕', 365, 250, 34)] },
          { id: 'x', tipo: 'grupo', oculto: true, capas: [...piso(400, 300, 240), emo('🌳', 70, 250, 170), emo('🏠', 190, 250, 60), emo('🧍', 250, 250, 64), emo('🐕', 335, 250, 150), txt(200, 40, '¿en proporción?', 24, '#e63946')] }
        ]
      },
      pasos: [
        { audio: 'pr_1', texto: 'Las formas y los objetos tienen <b>distintos tamaños</b>.' },
        { audio: 'pr_2', texto: 'La <b>proporción</b> relaciona los tamaños entre sí. 📏', apuntar: [80, 70], resaltar: 'b' },
        { audio: 'pr_3', texto: '¿Un perro más grande que la casa? 🤔 Solo si es una <b>decisión</b>.', ocultar: ['b'], mostrar: ['x'], apuntar: [84, 55] }
      ]
    },

    /* 2 — Equilibrio */
    {
      tipo: 'narracion', titulo: '⚖️ El equilibrio',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'c', tipo: 'grupo', capas: [F('arbol', 70, 110, 110, COL.verde), F('casa', 145, 125, 90, COL.rojo), F('sol', 50, 35, 50, COL.amarillo), F('flor', 110, 200, 40, COL.rosa)] },
          { id: 'b1', tipo: 'grupo', oculto: true, capas: [{ tipo: 'balanza', cx: 200, cy: 265, w: 220, ang: -14 }] },
          { id: 'e', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 0, y: 0, w: 400, h: 240, fill: '#fffdf5' }, F('arbol', 70, 110, 110, COL.verde), F('casa', 310, 125, 90, COL.rojo), F('sol', 200, 35, 50, COL.amarillo), F('flor', 200, 200, 40, COL.rosa)] },
          { id: 'b2', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 0, y: 240, w: 400, h: 60, fill: '#fffdf5' }, { tipo: 'balanza', cx: 200, cy: 265, w: 220, ang: 0 }] },
          { id: 'a', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 0, y: 0, w: 400, h: 240, fill: '#fffdf5' }, F('circulo', 100, 120, 150, COL.azul), F('estrella', 280, 60, 50, COL.amarillo), F('flor', 320, 150, 46, COL.rosa), F('cuadrado', 260, 200, 44, COL.naranja), F('triangulo', 350, 210, 40, COL.verde)] }
        ]
      },
      pasos: [
        { audio: 'eq_1', texto: 'Todos los elementos están <b>del mismo lado</b>…', apuntar: [25, 40], resaltar: 'c' },
        { audio: 'eq_2', texto: '…la imagen está <b>cargada</b>, como una balanza que se inclina.', mostrar: ['b1'], apuntar: [30, 82] },
        { audio: 'eq_3', texto: 'Distribuidos en distintos sectores: <b>equilibrio</b>. ⚖️', mostrar: ['e', 'b2'], apuntar: [50, 82] },
        { audio: 'eq_4', texto: 'Una forma <b>grande</b> se equilibra con varias <b>chicas</b>.', mostrar: ['a'], apuntar: [25, 40] }
      ]
    },

    /* 3 — ¿Qué tamaño corresponde? */
    {
      tipo: 'elegir', titulo: '📏 ¿Está en proporción?', instr: 'qt_instr', err: 'qt_err',
      rondas: [
        { texto: 'Persona y casa', audio: 'qt_1', ok: 'qt_1ok', correcta: 'ok',
          opciones: [{ id: 'a', escena: prop(['🏠', 110, 90], ['🧍', 210, 150]) }, { id: 'ok', escena: prop(['🏠', 120, 140], ['🧍', 225, 64]) }, { id: 'b', escena: prop(['🏠', 120, 140], ['🧍', 225, 20]) }] },
        { texto: 'Perro y persona', audio: 'qt_2', ok: 'qt_2ok', correcta: 'ok',
          opciones: [{ id: 'ok', escena: prop(['🧍', 110, 110], ['🐕', 210, 50]) }, { id: 'a', escena: prop(['🧍', 110, 60], ['🐕', 200, 140]) }, { id: 'b', escena: prop(['🧍', 110, 110], ['🐕', 210, 120]) }] },
        { texto: 'Árbol y flor', audio: 'qt_3', ok: 'qt_3ok', correcta: 'ok',
          opciones: [{ id: 'a', escena: prop(['🌳', 110, 70], ['🌷', 210, 110]) }, { id: 'b', escena: prop(['🌳', 110, 90], ['🌷', 210, 90]) }, { id: 'ok', escena: prop(['🌳', 110, 160], ['🌷', 225, 40]) }] }
      ]
    },

    /* 4 — ¿Equilibrada o cargada? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Equilibrada o cargada?', instr: 'ec_instr', err: 'ec_err',
      texto: '¿Está <b>equilibrada</b> o <b>cargada</b>?',
      categorias: [{ id: 'e', label: '⚖️ Equilibrada', sub: 'elementos distribuidos' }, { id: 'c', label: '↘️ Cargada', sub: 'todo de un lado' }],
      items: [
        { id: 1, cat: 'e', ok: 'ec_e', escena: EQ(COMP.eq1) }, { id: 2, cat: 'c', ok: 'ec_c', escena: EQ(COMP.iz1) },
        { id: 3, cat: 'e', ok: 'ec_e', escena: EQ(COMP.eq2) }, { id: 4, cat: 'c', ok: 'ec_c', escena: EQ(COMP.de1) },
        { id: 5, cat: 'e', ok: 'ec_e', escena: EQ(COMP.eq3) }, { id: 6, cat: 'c', ok: 'ec_c', escena: EQ(COMP.iz2) },
        { id: 7, cat: 'c', ok: 'ec_c', escena: EQ(COMP.de2) }
      ]
    },

    /* 5 — ¿Dónde lo ubicarías? */
    {
      tipo: 'elegir', titulo: '🧭 ¿Dónde lo ubicarías?', instr: 'du_instr', err: 'du_err',
      rondas: [
        { texto: 'Agregá la <b>casa</b> 🏠', audio: 'du_1', ok: 'du_1ok', correcta: 'ok', visual: { escena: EQ([...COMP.iz1.slice(0, 1), COMP.iz1[2], COMP.iz1[3], BAL(-12)]) },
          revela: { escena: EQ([...COMP.iz1.slice(0, 1), COMP.iz1[2], COMP.iz1[3], F('casa', 230, 130, 100, COL.rojo), BAL(0)]) },
          opciones: [{ id: 'a', escena: EQ([...COMP.iz1.slice(0, 1), COMP.iz1[2], COMP.iz1[3], F('casa', 100, 130, 100, COL.rojo)]) }, { id: 'ok', escena: EQ([...COMP.iz1.slice(0, 1), COMP.iz1[2], COMP.iz1[3], F('casa', 230, 130, 100, COL.rojo)]) }, { id: 'b', escena: EQ([...COMP.iz1.slice(0, 1), COMP.iz1[2], COMP.iz1[3], F('casa', 60, 50, 60, COL.rojo)]) }] },
        { texto: 'Agregá el <b>árbol</b> 🌳', audio: 'du_2', ok: 'du_2ok', correcta: 'ok', visual: { escena: EQ([COMP.de2[0], COMP.de2[2], BAL(12)]) },
          revela: { escena: EQ([COMP.de2[0], COMP.de2[2], F('arbol', 70, 130, 110, COL.verde), BAL(0)]) },
          opciones: [{ id: 'ok', escena: EQ([COMP.de2[0], COMP.de2[2], F('arbol', 70, 130, 110, COL.verde)]) }, { id: 'a', escena: EQ([COMP.de2[0], COMP.de2[2], F('arbol', 185, 140, 110, COL.verde)]) }, { id: 'b', escena: EQ([COMP.de2[0], COMP.de2[2], F('arbol', 270, 160, 60, COL.verde)]) }] },
        { texto: 'Agregá el <b>círculo grande</b> 🔵', audio: 'du_3', ok: 'du_3ok', correcta: 'ok', visual: { escena: EQ([F('estrella', 230, 60, 46, COL.amarillo), F('flor', 260, 150, 44, COL.rosa), F('cuadrado', 210, 190, 40, COL.naranja), F('triangulo', 280, 200, 36, COL.verde), BAL(10)]) },
          revela: { escena: EQ([F('estrella', 230, 60, 46, COL.amarillo), F('flor', 260, 150, 44, COL.rosa), F('cuadrado', 210, 190, 40, COL.naranja), F('triangulo', 280, 200, 36, COL.verde), F('circulo', 80, 110, 130, COL.azul), BAL(0)]) },
          opciones: [{ id: 'a', escena: EQ([F('estrella', 230, 60, 46, COL.amarillo), F('flor', 260, 150, 44, COL.rosa), F('cuadrado', 210, 190, 40, COL.naranja), F('triangulo', 280, 200, 36, COL.verde), F('circulo', 240, 110, 130, COL.azul)]) }, { id: 'b', escena: EQ([F('estrella', 230, 60, 46, COL.amarillo), F('flor', 260, 150, 44, COL.rosa), F('cuadrado', 210, 190, 40, COL.naranja), F('triangulo', 280, 200, 36, COL.verde), F('circulo', 80, 40, 30, COL.azul)]) }, { id: 'ok', escena: EQ([F('estrella', 230, 60, 46, COL.amarillo), F('flor', 260, 150, 44, COL.rosa), F('cuadrado', 210, 190, 40, COL.naranja), F('triangulo', 280, 200, 36, COL.verde), F('circulo', 80, 110, 130, COL.azul)]) }] }
      ]
    },

    /* 6 — Taller con balanza */
    {
      tipo: 'taller', titulo: '⚖️ Mi imagen equilibrada', instr: 'ta_instr',
      balanza: true,
      herramientas: ['sello', 'lapiz', 'balde', 'mancha', 'goma'],
      sellos: ['casa', 'arbol', 'sol', 'nube', 'flor', 'montania', 'estrella', 'circulo'],
      colores: ['negro', 'rojo', 'naranja', 'amarillo', 'verdeClaro', 'verde', 'celeste', 'azul', 'violeta', 'rosa', 'marron', 'gris'],
      archivo: 'mi-imagen-equilibrada.png'
    },

    /* 7 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: 'Una <b>composición libre</b>: paisaje, habitación, plaza, personas, animales o un mundo imaginario.' },
        { audio: 'pp_2', texto: '<b>1.</b> Dibujá varios elementos pensando sus <b>tamaños</b>. 📏' },
        { audio: 'pp_3', texto: '<b>2.</b> Organizalos para lograr <b>equilibrio</b>: no todo en un mismo sector. ⚖️' },
        { audio: 'pp_4', texto: '<b>3.</b> <b>Coloreá</b> tu producción. 🎨' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> hoja, lápiz, goma, y colores, fibras o crayones.' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mi composición en papel', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu composición, o <b>🖼️ Elegir de la galería</b> para buscar la que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'mi-imagen-equilibrada-foto.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '👀 Mirá tu dibujo', instr: 'ae_instr', fin: 'ae_fin',
      mini: EQ([...COMP.eq1, BAL(0)]),
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Pensé qué elementos son <b>grandes</b> y cuáles <b>pequeños</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿<b>Distribuí</b> los elementos sin cargar un solo sector?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Hay un elemento que quise <b>destacar</b>?' }
      ]
    },

    /* 10 — Respondé y recordá */
    {
      tipo: 'pasos', titulo: '📝 Mirá tu dibujo y respondé', img: 'img/familia.jpg',
      pasos: [
        { audio: 're_1', texto: '¿Qué elemento dibujaste <b>más grande</b>? ¿Por qué?' },
        { audio: 're_2', texto: '¿Cómo lograste que se vea <b>equilibrado</b>?' },
        { audio: 're_3', texto: '¿Qué quisiste <b>destacar</b>? ¿Qué <b>cambiarías</b> si lo hicieras de nuevo?' },
        { audio: 're_4', texto: '⭐ No existe una única manera: lo importante es <b>tomar decisiones</b> y poder explicarlas.' },
        { audio: 're_5', texto: '📁 Guardá tu producción en la carpeta.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
