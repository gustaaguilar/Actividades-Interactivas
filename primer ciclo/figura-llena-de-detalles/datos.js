/* ============================================================
   UNA FIGURA LLENA DE DETALLES — Artes Visuales · 3.º grado
   Figura compleja y fondo simple
   Basado en la Ficha Viajera N.º 2 de Artes Visuales
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const PALETAS = {
  frios: ['#2a9d8f', '#264653', '#457b9d', '#8ecae6', '#219ebc', '#90be6d', '#43aa8b', '#52b788'],
  calidos: ['#e63946', '#f4a261', '#e76f51', '#ffb703', '#fb8500', '#d62828', '#f28482'],
  mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'],
  suave: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff']
};
const COL = {
  rojo: '#e63946', naranja: '#fb8500', amarillo: '#ffb703', verde: '#2a9d8f', verdeClaro: '#90be6d', celeste: '#8ecae6',
  azul: '#3a86ff', violeta: '#8338ec', rosa: '#ff006e', marron: '#8d5524', negro: '#1b1b1b', blanco: '#ffffff'
};
const TODOS = ['flor', 'puntos', 'onda', 'zigzag', 'aro', 'hoja', 'linea', 'estrellita'];
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const liso = (fill) => ({ tipo: 'rect', fill });
const compleja = (forma, cx, cy, size, seed, paleta, extra) => Object.assign({ tipo: 'figura', forma, cx, cy, size, stroke: '#1b1b1b', strokeW: 4, compleja: { seed, paleta: paleta || 'calidos', paso: 13, tipos: ['puntos', 'zigzag', 'onda', 'aro', 'linea', 'flor'] } }, extra || {});
const simple = (forma, cx, cy, size, fill, extra) => Object.assign({ tipo: 'figura', forma, cx, cy, size, fill, stroke: '#1b1b1b', strokeW: 2 }, extra || {});
const fondoC = (seed, paleta, bg) => ({ tipo: 'fondo', seed, paleta: paleta || 'mixta', bg: bg || '#ffffff', densidad: 1, paso: 22, tipos: TODOS });
const esc = (...capas) => ({ w: 300, h: 225, capas });

window.DATOS = {
  meta: {
    titulo: 'Una figura llena de detalles',
    subtitulo: 'Figura compleja y fondo simple',
    area: '🎨 Artes Visuales · 3.er grado',
    grado: 'Artes Visuales · 3.er grado',
    fuente: 'Basado en la Ficha Viajera N.º 2 de Artes Visuales',
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
    portada: '¡Hola! Bienvenidos a Una figura llena de detalles. Seguimos trabajando figura y fondo, pero esta vez al revés: vas a crear una figura compleja sobre un fondo simple. Tocá Comenzar.',

    /* 1 — al revés */
    ar_1: '¿Te acordás? En la ficha anterior hicimos una figura simple sobre un fondo complejo.',
    ar_2: 'Ahora vamos a invertir el desafío.',
    ar_3: 'La figura va a ser compleja: grande y con muchos detalles.',
    ar_4: 'Y el fondo va a ser simple: tranquilo, con pocos elementos.',

    /* 2 — cómo se hace */
    co_1: 'Elegí un personaje, un animal, un objeto o algo de la naturaleza. Por ejemplo, un pez.',
    co_2: 'Ahora llenalo de detalles: escamas, puntos, rayas, dibujos y muchos colores.',
    co_3: 'El fondo, en cambio, queda simple: un solo color, sin casi nada.',
    co_4: 'Imaginá que tu figura es la protagonista. El fondo la ayuda a que la veamos con claridad.',

    /* 3 — figura simple o compleja */
    fs_instr: 'Mirá cada figura. ¿Es simple, con pocos detalles, o compleja, con muchos detalles? Tocá la respuesta.',
    fs_err: 'Mirá otra vez. ¿Tiene pocos o muchos detalles adentro?',
    fs_1: '¡Sí! Es simple: un pez de un solo color.',
    fs_2: '¡Muy bien! Es compleja: el pez está lleno de rayas, puntos y colores.',
    fs_3: '¡Correcto! Es simple: una estrella lisa.',
    fs_4: '¡Exacto! Es compleja: la estrella tiene dibujos adentro.',
    fs_5: '¡Bien! Es compleja: un árbol lleno de detalles.',
    fs_6: '¡Muy bien! Es simple: una casa con pocos detalles.',

    /* 4 — fondo simple o complejo */
    fo_instr: 'Ahora mirá solo los fondos. ¿Es un fondo simple o complejo? Tocá la respuesta.',
    fo_err: 'Mirá otra vez. ¿Tiene pocos elementos o muchos?',
    fo_1: '¡Sí! Es simple: un solo color.',
    fo_2: '¡Muy bien! Es complejo: tiene muchos elementos.',
    fo_3: '¡Correcto! Es simple: dos colores y nada más.',
    fo_4: '¡Exacto! Es complejo: flores, ondas y puntos por todos lados.',
    fo_5: '¡Bien! Es simple: un cielo celeste con un sol.',
    fo_6: '¡Muy bien! Es complejo: está lleno de detalles.',

    /* 5 — cuál cumple el desafío */
    cd_instr: 'Mirá las tres imágenes. ¿Cuál tiene una figura compleja sobre un fondo simple? Tocá la imagen.',
    cd_err: 'Mirá bien la figura y el fondo de esa imagen, y probá otra vez.',
    cd_1: '¿Cuál cumple el desafío?',
    cd_1ok: '¡Muy bien! El pez está lleno de detalles y el fondo es de un solo color. Así la figura se destaca.',
    cd_2: '¿Y ahora?',
    cd_2ok: '¡Excelente! La estrella compleja se ve clarísima sobre el fondo tranquilo.',
    cd_3: 'Última. ¿Cuál cumple el desafío?',
    cd_3ok: '¡Correcto! Figura compleja, fondo simple: la figura es la protagonista.',

    /* 6 — verdadero o falso */
    vf_instr: 'Escuchá cada frase y tocá Verdadero o Falso.',
    vf_err: 'Pensalo otra vez.',
    vf_1: 'Una figura compleja tiene muchos detalles, formas y colores.',
    vf_1ok: 'Verdadero. Por ejemplo, un animal con pelo, manchas, escamas o plumas.',
    vf_2: 'En este desafío, el fondo tiene que estar lleno de elementos.',
    vf_2ok: 'Falso. Esta vez el fondo es simple: pocos elementos y sin demasiados detalles.',
    vf_3: 'Si el fondo es simple, la figura compleja se destaca más.',
    vf_3ok: 'Verdadero. El fondo tranquilo ayuda a que veamos la figura con claridad.',
    vf_4: 'Para hacer un fondo simple podés usar un solo color.',
    vf_4ok: 'Verdadero. Un solo color, pocas líneas o un espacio casi vacío.',

    /* 7 — taller */
    ta_instr: '¡Creá tu figura llena de detalles! Elegí una figura grande con las formas. Después decorala con puntos, líneas, manchas y colores. Al final, usá el balde para pintar el fondo de un solo color.',
    t_sello: 'Formas. Elegí una figura y tocá el cuadro.',
    t_lapiz: 'Lápiz, para los detalles.',
    t_linea: 'Líneas.',
    t_punto: 'Puntos.',
    t_mancha: 'Manchas.',
    t_balde: 'Balde. Tocá el fondo para pintarlo de un solo color.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    p_guardar: '¡Tu obra quedó guardada!',

    /* 8 — en papel */
    pp_1: 'Ahora en papel. Paso uno: elegí un personaje, un animal, un objeto o un elemento de la naturaleza.',
    pp_2: 'Paso dos: dibujalo como una figura compleja, agregando muchos detalles. Si es un animal, podés agregarle pelo, manchas, escamas, plumas, dibujos, texturas y diferentes colores.',
    pp_3: 'Paso tres: hacé un fondo simple. Podés usar un solo color, pocas líneas o un espacio con muy pocos elementos.',
    pp_4: 'Paso cuatro: observá tu producción y comprobá que la figura se destaque claramente.',
    pp_5: 'Podés usar hoja o cartón, lápices de colores, fibras, crayones, papeles de revistas o diarios y otros materiales de descarte limpios.',

    /* 9 — foto */
    ft_instr: 'Cuando termines tu obra en papel, pulsá el botón Sacar foto para fotografiarla. O también podés elegir la obra que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Qué figura llena de detalles! Tocá Guardar para tenerla en tu celular.',

    /* 10 — autoevaluación */
    ae_instr: 'Mirá tu obra y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿La figura tiene muchos detalles?',
    ae_1si: '¡Muy bien! Tu figura es compleja.',
    ae_1no: 'Podés agregarle más puntos, rayas, manchas o colores.',
    ae_2: '¿El fondo tiene pocos elementos?',
    ae_2si: '¡Genial! Tu fondo es simple.',
    ae_2no: 'Probá dejar el fondo más tranquilo, de un solo color.',
    ae_3: '¿La figura se destaca claramente?',
    ae_3si: '¡Excelente! Tu figura es la protagonista.',
    ae_3no: 'Probá hacerla más grande o con colores más fuertes.',
    ae_fin: 'Gracias por mirar tu obra con atención. Mirar lo que hicimos también es parte del arte.',

    /* 11 — familia */
    fa_1: 'Mostrale tu obra a alguien de tu familia y preguntale: ¿qué viste primero?',
    fa_2: 'Después explicale: ¿cuál es tu figura compleja? ¿Por qué tu fondo es simple?',
    fa_3: 'Por último, guardá tu producción en la carpeta de Artes Visuales, para compartirla al regresar a la escuela.',

    cierre: '¡Terminaste! Aprendiste a crear una figura compleja, llena de detalles, sobre un fondo simple, para que la figura sea la protagonista. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Al revés */
    {
      tipo: 'narracion', titulo: '🔄 Ahora, al revés',
      escena: {
        w: 400, h: 300,
        capas: [
          { id: 'a', tipo: 'grupo', capas: [fondoC(11, 'frios', '#e9f5f2'), simple('estrella', 200, 150, 150, '#ffb703', { halo: true })] },
          { id: 'b', tipo: 'grupo', oculto: true, capas: [liso('#cfe8ff'), compleja('pez', 200, 150, 280, 7)] },
          { id: 'f', tipo: 'grupo', oculto: true, capas: [txt(200, 34, 'figura compleja', 24)] },
          { id: 'g', tipo: 'grupo', oculto: true, capas: [txt(200, 286, 'fondo simple', 24, '#264653')] }
        ]
      },
      pasos: [
        { audio: 'ar_1', texto: 'Antes: <b>figura simple</b> sobre <b>fondo complejo</b>.', apuntar: [50, 45], resaltar: 'a' },
        { audio: 'ar_2', texto: 'Ahora, ¡<b>al revés</b>! 🔄', ocultar: ['a'], mostrar: ['b'] },
        { audio: 'ar_3', texto: 'La <b>figura compleja</b>: grande y con muchos detalles.', mostrar: ['f'], apuntar: [55, 45], resaltar: 'b' },
        { audio: 'ar_4', texto: 'El <b>fondo simple</b>: tranquilo, con pocos elementos.', mostrar: ['g'], apuntar: [12, 85] }
      ]
    },

    /* 2 — Cómo se hace */
    {
      tipo: 'narracion', titulo: '🐟 ¿Cómo se hace?',
      escena: {
        w: 400, h: 300,
        capas: [
          { id: 'p1', tipo: 'grupo', capas: [liso('#ffffff'), simple('pez', 200, 150, 260, '#f4a261')] },
          { id: 'p2', tipo: 'grupo', oculto: true, capas: [liso('#ffffff'), compleja('pez', 200, 150, 260, 21, 'calidos')] },
          { id: 'p3', tipo: 'grupo', oculto: true, capas: [liso('#ffe9a8'), compleja('pez', 200, 150, 260, 21, 'calidos', { halo: true })] }
        ]
      },
      pasos: [
        { audio: 'co_1', texto: 'Elegí un <b>personaje, animal u objeto</b>. Por ejemplo, un pez. 🐟', apuntar: [52, 50], resaltar: 'p1' },
        { audio: 'co_2', texto: 'Llenalo de <b>detalles</b>: escamas, puntos, rayas y colores.', ocultar: ['p1'], mostrar: ['p2'], apuntar: [55, 52], resaltar: 'p2' },
        { audio: 'co_3', texto: 'El <b>fondo</b>: un solo color, sin casi nada.', ocultar: ['p2'], mostrar: ['p3'], apuntar: [10, 15] },
        { audio: 'co_4', texto: 'Tu figura es la <b>protagonista</b>. ⭐' }
      ]
    },

    /* 3 — ¿Figura simple o compleja? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Figura simple o compleja?', instr: 'fs_instr', err: 'fs_err',
      texto: '¿La <b>figura</b> es simple o compleja?',
      categorias: [{ id: 's', label: '🙂 Simple', sub: 'pocos detalles' }, { id: 'c', label: '🤩 Compleja', sub: 'muchos detalles' }],
      items: [
        { id: 1, cat: 's', ok: 'fs_1', escena: esc(liso('#fffdf5'), simple('pez', 150, 112, 200, '#219ebc')) },
        { id: 2, cat: 'c', ok: 'fs_2', escena: esc(liso('#fffdf5'), compleja('pez', 150, 112, 210, 9)) },
        { id: 3, cat: 's', ok: 'fs_3', escena: esc(liso('#fffdf5'), simple('estrella', 150, 115, 170, '#ffb703')) },
        { id: 4, cat: 'c', ok: 'fs_4', escena: esc(liso('#fffdf5'), compleja('estrella', 150, 115, 180, 5, 'mixta')) },
        { id: 5, cat: 'c', ok: 'fs_5', escena: esc(liso('#fffdf5'), compleja('arbol', 150, 112, 190, 13, 'frios')) },
        { id: 6, cat: 's', ok: 'fs_6', escena: esc(liso('#fffdf5'), simple('casa', 150, 112, 170, '#e63946')) }
      ]
    },

    /* 4 — ¿Fondo simple o complejo? */
    {
      tipo: 'clasificarUno', titulo: '🖼️ ¿Fondo simple o complejo?', instr: 'fo_instr', err: 'fo_err',
      texto: '¿El <b>fondo</b> es simple o complejo?',
      categorias: [{ id: 's', label: '🌫️ Simple', sub: 'pocos elementos' }, { id: 'c', label: '🌼 Complejo', sub: 'muchos elementos' }],
      items: [
        { id: 1, cat: 's', ok: 'fo_1', escena: esc(liso('#8ecae6')) },
        { id: 2, cat: 'c', ok: 'fo_2', escena: esc(fondoC(7, 'mixta')) },
        { id: 3, cat: 's', ok: 'fo_3', escena: esc(liso('#c9f0a8'), { tipo: 'rect', x: 0, y: 150, w: 300, h: 75, fill: '#90be6d' }) },
        { id: 4, cat: 'c', ok: 'fo_4', escena: esc(fondoC(31, 'calidos', '#fff1e6')) },
        { id: 5, cat: 's', ok: 'fo_5', escena: esc(liso('#bde0fe'), simple('sol', 240, 50, 70, '#ffb703', { strokeW: 0, sinDetalles: true })) },
        { id: 6, cat: 'c', ok: 'fo_6', escena: esc(fondoC(44, 'frios', '#e9f5f2')) }
      ]
    },

    /* 5 — ¿Cuál cumple el desafío? */
    {
      tipo: 'elegir', titulo: '🏆 ¿Cuál cumple el desafío?', instr: 'cd_instr', err: 'cd_err',
      rondas: [
        { texto: 'Figura <b>compleja</b> y fondo <b>simple</b>', audio: 'cd_1', ok: 'cd_1ok', correcta: 'ok',
          opciones: [{ id: 'ok', escena: esc(liso('#cfe8ff'), compleja('pez', 150, 112, 210, 3)) }, { id: 'a', escena: esc(fondoC(5, 'calidos'), compleja('pez', 150, 112, 210, 3)) }, { id: 'b', escena: esc(liso('#cfe8ff'), simple('pez', 150, 112, 210, '#f4a261')) }] },
        { texto: 'Figura <b>compleja</b> y fondo <b>simple</b>', audio: 'cd_2', ok: 'cd_2ok', correcta: 'ok',
          opciones: [{ id: 'a', escena: esc(fondoC(8, 'mixta'), simple('estrella', 150, 115, 170, '#ffb703')) }, { id: 'ok', escena: esc(liso('#264653'), compleja('estrella', 150, 115, 180, 12, 'calidos')) }, { id: 'b', escena: esc(fondoC(9, 'calidos'), compleja('estrella', 150, 115, 180, 12, 'calidos')) }] },
        { texto: 'Figura <b>compleja</b> y fondo <b>simple</b>', audio: 'cd_3', ok: 'cd_3ok', correcta: 'ok',
          opciones: [{ id: 'a', escena: esc(liso('#ffe9a8'), simple('arbol', 150, 112, 190, '#2a9d8f')) }, { id: 'b', escena: esc(fondoC(21, 'frios'), compleja('arbol', 150, 112, 190, 4, 'frios')) }, { id: 'ok', escena: esc(liso('#ffe9a8'), compleja('arbol', 150, 112, 190, 4, 'frios')) }] }
      ]
    },

    /* 6 — Verdadero o falso */
    {
      tipo: 'vf', titulo: '✔️ ¿Verdadero o falso?', instr: 'vf_instr', err: 'vf_err',
      items: [
        { audio: 'vf_1', ok: 'vf_1ok', v: true, texto: 'Una figura compleja tiene muchos detalles, formas y colores.', cuadro: { w: 250, h: 350, capas: [liso('#fffdf5'), compleja('pez', 125, 175, 220, 17)] } },
        { audio: 'vf_2', ok: 'vf_2ok', v: false, texto: 'En este desafío, el fondo tiene que estar lleno de elementos.', cuadro: { w: 250, h: 350, capas: [fondoC(41, 'mixta')] } },
        { audio: 'vf_3', ok: 'vf_3ok', v: true, texto: 'Si el fondo es simple, la figura compleja se destaca más.', cuadro: { w: 250, h: 350, capas: [liso('#3a1f5d'), compleja('estrella', 125, 175, 200, 2, 'calidos')] } },
        { audio: 'vf_4', ok: 'vf_4ok', v: true, texto: 'Para hacer un fondo simple podés usar un solo color.', cuadro: { w: 250, h: 350, capas: [liso('#8ecae6')] } }
      ]
    },

    /* 7 — Taller */
    {
      tipo: 'taller', titulo: '🎨 Mi figura llena de detalles', instr: 'ta_instr',
      herramientas: ['sello', 'lapiz', 'linea', 'punto', 'mancha', 'balde', 'goma'],
      sellos: ['pez', 'estrella', 'arbol', 'casa', 'corazon', 'sol', 'flor', 'hoja'],
      colores: ['negro', 'rojo', 'naranja', 'amarillo', 'verdeClaro', 'verde', 'celeste', 'azul', 'violeta', 'rosa', 'marron', 'blanco'],
      archivo: 'mi-figura-llena-de-detalles.png'
    },

    /* 8 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Elegí un <b>personaje, animal, objeto</b> o elemento de la naturaleza.' },
        { audio: 'pp_2', texto: '<b>2.</b> Dibujalo como figura <b>compleja</b>: pelo, manchas, escamas, plumas, dibujos, texturas y colores.' },
        { audio: 'pp_3', texto: '<b>3.</b> Hacé un fondo <b>simple</b>: un solo color, pocas líneas o casi vacío.' },
        { audio: 'pp_4', texto: '<b>4.</b> Observá: ¿la figura se destaca claramente? 👀' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> hoja o cartón, lápices, fibras, crayones, papeles de revistas o diarios, descarte limpio.' }
      ]
    },

    /* 9 — Foto */
    { tipo: 'foto', titulo: '📷 Mi obra en papel', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu obra, o <b>🖼️ Elegir de la galería</b> para buscar la que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'mi-figura-llena-de-detalles-en-papel.jpg' },

    /* 10 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi obra', instr: 'ae_instr', fin: 'ae_fin',
      mini: esc(liso('#cfe8ff'), compleja('pez', 150, 112, 210, 7)),
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿La figura tiene <b>muchos detalles</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿El fondo tiene <b>pocos elementos</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿La figura se <b>destaca</b> claramente?' }
      ]
    },

    /* 11 — Familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Mostrale tu obra a alguien de tu familia y preguntale: <b>¿qué viste primero?</b>' },
        { audio: 'fa_2', texto: 'Explicale: <b>¿cuál es tu figura compleja? ¿Por qué tu fondo es simple?</b>' },
        { audio: 'fa_3', texto: '📁 Guardá tu producción en la carpeta de <b>Artes Visuales</b>.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
