/* ============================================================
   UNA FIGURA QUE SE ESCONDE — Artes Visuales · 3.º grado
   Basado en la Ficha Viajera N.º 1 de Artes Visuales
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const PALETAS = {
  frios:   ['#2a9d8f', '#264653', '#457b9d', '#8ecae6', '#219ebc', '#90be6d', '#43aa8b', '#52b788'],
  calidos: ['#e63946', '#f4a261', '#e76f51', '#ffb703', '#fb8500', '#d62828', '#f28482'],
  mixta:   ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'],
  suave:   ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'],
  ciudad:  ['#e76f51', '#f4a261', '#2a9d8f', '#264653', '#e9c46a', '#8d99ae', '#ef476f']
};

window.DATOS = {
  meta: {
    titulo: 'Una figura que se esconde',
    subtitulo: 'Figura simple y fondo complejo',
    area: '🎨 Artes Visuales · 3.º grado',
    fuente: 'Basado en la Ficha Viajera N.º 1 de Artes Visuales',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar',
    mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg',
    fotoMini: 'profe_mini.jpg',
    frase: 'Menos prisa, más vida 🧉🫂',
    puntosPorAcierto: 10,
    revision: false   // true = muestra las flechas ‹ › de revisión
  },

  paletas: PALETAS,

  /* ---------- TEXTOS DE AUDIO (clave → texto) ----------
     El script de Colab lee este bloque y genera audio/<clave>.mp3 */
  audios: {
    portada: '¡Hola! Bienvenidos a Una figura que se esconde. Vamos a jugar con la figura y el fondo, y al final vas a crear tu propia obra de arte. Tocá Comenzar.',

    n1_1: 'Toda imagen tiene dos partes: una figura y un fondo.',
    n1_2: 'La figura es lo principal. Es lo que queremos que se vea primero. En esta imagen, la figura es el pez.',
    n1_3: 'El fondo es todo lo que está detrás y alrededor de la figura: flores, puntos, líneas y colores.',
    n1_4: 'En esta actividad vas a crear tu propia imagen, con una figura y un fondo.',

    n2_1: 'Una figura simple tiene pocas partes y pocos detalles. Se reconoce enseguida, como esta estrella.',
    n2_2: 'Un fondo complejo tiene muchos elementos: flores, nubes, líneas, puntos, colores y texturas.',
    n2_3: 'Tu desafío es juntarlos: una figura simple sobre un fondo complejo.',

    cl_instr: 'Mirá cada imagen y pensá: ¿tiene pocos detalles o muchos detalles? Tocá Simple o Compleja.',
    cl_err: 'Mirá otra vez con atención. ¿Tiene pocos detalles o muchos detalles?',
    cl_1: '¡Sí! Es simple: una estrella de un solo color, sin detalles. Se reconoce enseguida.',
    cl_2: '¡Muy bien! Es compleja: esta estrella tiene adentro flores, puntos y líneas de muchos colores.',
    cl_3: '¡Correcto! Es simple: un corazón rojo y liso, con pocos detalles.',
    cl_4: '¡Sí! Es simple: un fondo celeste de un solo color, sin nada más.',
    cl_5: '¡Exacto! Es compleja: tiene flores, puntos, ondas y muchos colores.',
    cl_6: '¡Bien! Es simple: un pez de un solo color, fácil de reconocer.',
    cl_7: '¡Muy bien! Es compleja: este pez tiene rayas, puntos y muchos colores adentro.',
    cl_8: '¡Correcto! Es compleja: tiene casas, nubes, árboles y muchos detalles.',

    bu_instr1: 'En esta imagen hay un corazón escondido. ¿Lo encontrás? Tocalo cuando lo veas.',
    bu_pista: 'Te doy una pista: buscá donde titila.',
    bu_ok1: '¡Lo encontraste! Costó, ¿no? El corazón tenía los mismos colores que el fondo. Por eso se escondía.',
    bu_instr2: 'Ahora mirá la misma imagen. ¿Dónde está el corazón?',
    bu_ok2: '¡Esta vez lo viste enseguida! Tiene un color distinto al fondo, un borde grueso y un espacio libre alrededor. Así la figura se destaca.',

    n5_0: 'Mirá esta estrella: casi no se ve. Vamos a usar cuatro trucos para que se destaque.',
    n5_1: 'Truco uno: el contraste. Pintá la figura con un color muy distinto a los del fondo. Si el fondo es verde y azul, la figura puede ser roja o amarilla.',
    n5_2: 'Truco dos: el contorno. Remarcá el borde de la figura con una línea gruesa y oscura.',
    n5_3: 'Truco tres: el aire. Dejá un espacio libre alrededor de la figura, sin dibujos, para que respire.',
    n5_4: 'Truco cuatro: el tamaño. Una figura grande se ve antes que las cosas chiquitas del fondo.',
    n5_5: '¡Listo! Ahora la estrella se ve primero, aunque el fondo tenga muchos elementos.',

    cd_instr: 'Mirá las dos imágenes. Tocá aquella en la que la figura se ve primero.',
    cd_err: 'Mirá de nuevo. ¿En cuál ves la figura más rápido?',
    cd_1: '¡Muy bien! El sol amarillo se destaca porque su color es muy distinto a los verdes y azules del fondo. Eso es contraste.',
    cd_2: '¡Exacto! El borde grueso y oscuro separa al pez del fondo, y lo hace ver primero.',
    cd_3: '¡Sí! Alrededor de esta casa hay un espacio libre, sin dibujos. Ese aire ayuda a que la casa se destaque.',
    cd_4: '¡Muy bien! El árbol grande se ve enseguida. Una figura chiquita se pierde entre los detalles del fondo.',

    vf_instr: 'Escuchá cada frase y tocá Verdadero o Falso.',
    vf_err: 'Pensalo otra vez.',
    vf_1: 'Una figura simple tiene pocos detalles y se reconoce fácil.',
    vf_1ok: 'Verdadero. Una figura simple, como un corazón o una estrella, tiene pocas partes y se reconoce enseguida.',
    vf_2: 'Si la figura tiene los mismos colores que el fondo, se destaca más.',
    vf_2ok: 'Falso. Con los mismos colores, la figura se esconde. Para que se destaque, usá colores distintos: eso es contraste.',
    vf_3: 'Un contorno grueso y oscuro ayuda a que la figura se vea primero.',
    vf_3ok: 'Verdadero. El borde grueso separa la figura del fondo.',
    vf_4: 'Un fondo complejo es un fondo de un solo color, sin dibujos.',
    vf_4ok: 'Falso. Un fondo complejo tiene muchos elementos: líneas, puntos, flores, colores y texturas.',
    vf_5: 'Dejar un espacio libre alrededor de la figura la ayuda a destacarse.',
    vf_5ok: 'Verdadero. Ese espacio libre, el aire, hace que la figura respire y se vea mejor.',

    ta_instr: '¡Llegó tu turno de crear! Primero elegí tu figura. Después llená el fondo de detalles. Luego usá los trucos para destacarla. Al final, hacé la prueba del ojo.',
    ta_tab1: 'Figura. Elegí una figura simple. Tocá el dibujo para ubicarla donde quieras.',
    ta_tab2: 'Fondo. Llenalo de detalles con el pincel, los puntos y los sellos. Elegí un color abajo.',
    ta_tab3: 'Destacar. Cambiá el color de tu figura, el borde y el aire alrededor.',
    ta_tab4: 'Prueba del ojo. Vamos a ver si tu figura se ve primero.',
    f_estrella: 'Una estrella.',
    f_corazon: 'Un corazón.',
    f_arbol: 'Un árbol.',
    f_casa: 'Una casa.',
    f_sol: 'Un sol.',
    f_pez: 'Un pez.',
    t_fino: 'Pincel fino.',
    t_grueso: 'Pincel grueso.',
    t_puntos: 'Lluvia de puntos.',
    t_sellos: 'Sellos. Elegí un sello y tocá el dibujo.',
    t_goma: 'Goma.',
    t_deshacer: 'Deshacer.',
    t_borrar: 'Borrar todo el fondo.',
    d_borde0: 'Sin borde.',
    d_borde1: 'Borde fino.',
    d_borde2: 'Borde grueso.',
    d_aire: 'Aire alrededor de la figura.',
    p_ojo: 'Mirá tu obra borrosa, como cuando entrecerrás los ojos. ¿Tu figura se sigue viendo?',
    p_si: '¡Excelente! Tu figura se destaca aunque el fondo tenga muchos detalles. Ya podés guardar tu obra.',
    p_no: 'No pasa nada. Volvé a Destacar y probá con otro color, un borde más grueso o más aire.',
    p_guardar: '¡Tu obra quedó guardada en el celular!',

    pp_1: 'Paso uno: elegí una figura sencilla, como una estrella, un corazón, un árbol, una casa, un sol o un pez.',
    pp_2: 'Paso dos: dibujala en el centro de la hoja, o en el lugar que quieras destacar.',
    pp_3: 'Paso tres: convertí el fondo en un lugar lleno de detalles. Podés agregar árboles, flores, nubes, personas, animales, casas, líneas, puntos y texturas.',
    pp_4: 'Paso cuatro: pintá y decorá tu producción. ¡Acordate de los trucos para que tu figura se destaque!',
    pp_5: 'Podés usar lo que tengas en casa: hoja o cartón, lápices de colores, fibras, crayones, papeles de revistas o diarios, y otros materiales de descarte limpios.',

    fo_instr: 'Cuando termines tu obra en papel, pulsá el botón Sacar foto para fotografiarla. O también podés elegir la obra que hiciste y guardaste en el taller de arte, pulsando el botón Elegir de la galería.',
    fo_boton: 'Sacar una foto.',
    fo_ok: '¡Qué buena obra! Tocá Guardar para tenerla en tu celular.',

    ae_instr: 'Mirá tu obra y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Mi figura es simple, con pocos detalles?',
    ae_1si: '¡Muy bien! Una figura simple se reconoce enseguida.',
    ae_1no: 'Podés simplificarla: dejá solo la forma, sin tantos detalles adentro.',
    ae_2: '¿Mi fondo tiene muchos elementos y detalles?',
    ae_2si: '¡Genial! Tu fondo es complejo, lleno de detalles.',
    ae_2no: 'Podés agregarle más cosas: flores, líneas, puntos o texturas.',
    ae_3: '¿Usé colores distintos para la figura y para el fondo?',
    ae_3si: '¡Bien! Ese contraste ayuda a que tu figura se vea.',
    ae_3no: 'Probá pintar la figura con un color muy distinto a los del fondo.',
    ae_4: '¿Mi figura es lo primero que se ve?',
    ae_4si: '¡Excelente! Lograste que tu figura se destaque.',
    ae_4no: 'Probá con un borde grueso, más aire alrededor o una figura más grande.',
    ae_fin: 'Gracias por mirar tu obra con atención. Mirar lo que hicimos también es parte del arte.',

    fa_1: 'Mostrale tu obra a alguien de tu familia y preguntale: ¿qué viste primero?',
    fa_2: 'Después explicale: ¿cuál es tu figura simple? ¿Por qué tu fondo es complejo?',
    fa_3: 'Por último, guardá tu producción en la carpeta de Artes Visuales, para compartirla cuando regreses a la escuela.',

    cierre: '¡Terminaste! Aprendiste que una figura simple se puede destacar sobre un fondo complejo, usando contraste, contorno, aire y tamaño. ¡Felicitaciones, artista!'
  },

  /* ---------------------- PANTALLAS ---------------------- */
  pantallas: [

    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Figura y fondo (narración animada) */
    {
      tipo: 'narracion', titulo: '👀 Figura y fondo',
      escena: {
        w: 400, h: 300,
        capas: [
          { id: 'fon', tipo: 'fondo', seed: 11, paleta: 'suave', bg: '#fffaf0', densidad: 0.95, paso: 30, tipos: ['flor', 'puntos', 'onda', 'hoja', 'aro', 'estrellita'] },
          { id: 'fig', tipo: 'figura', forma: 'pez', cx: 200, cy: 152, size: 170, fill: '#ff7b00', stroke: '#3d1f00', strokeW: 5, halo: true }
        ]
      },
      pasos: [
        { audio: 'n1_1', texto: 'Toda imagen tiene dos partes: una <b>figura</b> y un <b>fondo</b>.' },
        { audio: 'n1_2', texto: 'La <b>figura</b> es lo principal: lo que queremos que se vea primero.', apuntar: [52, 55], resaltar: 'fig', atenuar: 'fon' },
        { audio: 'n1_3', texto: 'El <b>fondo</b> es todo lo que está detrás y alrededor de la figura.', apuntar: [13, 22], resaltar: 'fon', atenuar: 'fig' },
        { audio: 'n1_4', texto: '¡Vas a crear tu propia imagen con figura y fondo!' }
      ]
    },

    /* 2 — Simple y complejo (narración animada) */
    {
      tipo: 'narracion', titulo: '⭐ Simple y complejo',
      escena: {
        w: 400, h: 300,
        capas: [
          { id: 'A', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'rect', x: 4, y: 4, w: 190, h: 292, fill: '#fffdf5', stroke: '#e0d6c2' },
            { tipo: 'figura', forma: 'estrella', cx: 99, cy: 150, size: 140, fill: '#ffb703', stroke: '#9a6700', strokeW: 2 }
          ] },
          { id: 'B', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'fondo', x: 206, y: 4, w: 190, h: 292, seed: 21, paleta: 'mixta', bg: '#fff', densidad: 1, paso: 24, tipos: ['flor', 'puntos', 'onda', 'zigzag', 'nube', 'hoja', 'aro', 'casita', 'linea'] }
          ] },
          { id: 'U', tipo: 'grupo', oculto: true, capas: [
            { tipo: 'fondo', seed: 21, paleta: 'frios', bg: '#fff', densidad: 1, paso: 26, tipos: ['flor', 'puntos', 'onda', 'zigzag', 'nube', 'hoja', 'aro', 'casita', 'linea'] },
            { tipo: 'figura', forma: 'estrella', cx: 200, cy: 150, size: 190, fill: '#ffb703', stroke: '#3b2a00', strokeW: 6, halo: true }
          ] }
        ]
      },
      pasos: [
        { audio: 'n2_1', texto: 'Una <b>figura simple</b> tiene pocas partes y pocos detalles.', mostrar: ['A'], apuntar: [25, 50] },
        { audio: 'n2_2', texto: 'Un <b>fondo complejo</b> tiene muchos elementos, colores y texturas.', mostrar: ['B'], apuntar: [76, 45] },
        { audio: 'n2_3', texto: 'Tu desafío: <b>figura simple</b> sobre <b>fondo complejo</b>.', ocultar: ['A', 'B'], mostrar: ['U'], apuntar: [50, 50] }
      ]
    },

    /* 3 — ¿Simple o compleja? (clasificarUno) */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Simple o compleja?', instr: 'cl_instr', err: 'cl_err',
      texto: '¿Tiene <b>pocos</b> o <b>muchos</b> detalles?',
      categorias: [
        { id: 's', label: '🙂 Simple', sub: 'pocos detalles' },
        { id: 'c', label: '🤩 Compleja', sub: 'muchos detalles' }
      ],
      items: [
        { id: 1, cat: 's', ok: 'cl_1', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'figura', forma: 'estrella', cx: 150, cy: 115, size: 170, fill: '#ffb703', stroke: '#9a6700', strokeW: 2 }] } },
        { id: 2, cat: 'c', ok: 'cl_2', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'figura', forma: 'estrella', cx: 150, cy: 115, size: 180, stroke: '#333', strokeW: 3, compleja: { seed: 5, paleta: 'mixta', paso: 16 } }] } },
        { id: 3, cat: 's', ok: 'cl_3', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'figura', forma: 'corazon', cx: 150, cy: 112, size: 170, fill: '#e63946', stroke: '#8d0801', strokeW: 2 }] } },
        { id: 4, cat: 's', ok: 'cl_4', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#8ecae6' }] } },
        { id: 5, cat: 'c', ok: 'cl_5', escena: { w: 300, h: 225, capas: [{ tipo: 'fondo', seed: 7, paleta: 'mixta', bg: '#fff', densidad: 1, paso: 22, tipos: ['flor', 'puntos', 'onda', 'aro', 'hoja', 'zigzag'] }] } },
        { id: 6, cat: 's', ok: 'cl_6', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'figura', forma: 'pez', cx: 150, cy: 112, size: 200, fill: '#219ebc', stroke: '#023047', strokeW: 2 }] } },
        { id: 7, cat: 'c', ok: 'cl_7', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'figura', forma: 'pez', cx: 150, cy: 112, size: 210, stroke: '#333', strokeW: 3, compleja: { seed: 9, paleta: 'calidos', paso: 14, tipos: ['puntos', 'zigzag', 'onda', 'aro', 'linea'] } }] } },
        { id: 8, cat: 'c', ok: 'cl_8', escena: { w: 300, h: 225, capas: [{ tipo: 'fondo', seed: 4, paleta: 'ciudad', bg: '#cfe8ff', densidad: 1, paso: 30, tipos: ['casita', 'nube', 'arbolito', 'casita', 'flor'] }] } }
      ]
    },

    /* 4 — La figura que se esconde (buscar) */
    {
      tipo: 'buscar', titulo: '🕵️ La figura que se esconde',
      rondas: [
        {
          instr: 'bu_instr1', ok: 'bu_ok1', pista: 'bu_pista', texto: 'Hay un <b>corazón</b> escondido. ¿Lo encontrás?',
          blanco: { forma: 'corazon', cx: 268, cy: 108, size: 70 },
          escena: {
            w: 400, h: 300,
            capas: [
              { tipo: 'fondo', seed: 31, paleta: 'calidos', bg: '#ffe8d6', densidad: 1, paso: 24, tipos: ['flor', 'puntos', 'aro', 'hoja', 'corazoncito', 'onda'] },
              { tipo: 'figura', forma: 'corazon', cx: 268, cy: 108, size: 72, stroke: '#f4a261', strokeW: 2, compleja: { seed: 99, paleta: 'calidos', bg: '#ffdcc8', paso: 15, tipos: ['flor', 'puntos', 'aro', 'hoja', 'onda'] } },
              { tipo: 'fondo', seed: 77, paleta: 'calidos', bg: 'none', densidad: 0.35, paso: 26, tipos: ['puntos', 'linea', 'aro'] }
            ]
          }
        },
        {
          instr: 'bu_instr2', ok: 'bu_ok2', texto: 'Ahora, en la misma imagen, ¿dónde está?',
          blanco: { forma: 'corazon', cx: 268, cy: 108, size: 120 },
          escena: {
            w: 400, h: 300,
            capas: [
              { tipo: 'fondo', seed: 31, paleta: 'calidos', bg: '#ffe8d6', densidad: 1, paso: 24, tipos: ['flor', 'puntos', 'aro', 'hoja', 'corazoncito', 'onda'] },
              { tipo: 'figura', forma: 'corazon', cx: 268, cy: 108, size: 120, fill: '#1d3557', stroke: '#ffffff', strokeW: 6, halo: true }
            ]
          }
        }
      ]
    },

    /* 5 — Trucos para destacar (narración animada) */
    {
      tipo: 'narracion', titulo: '🪄 Trucos para destacar la figura',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'fondo', seed: 41, paleta: 'frios', bg: '#e9f5f2', densidad: 1, paso: 24, tipos: ['flor', 'puntos', 'onda', 'hoja', 'aro', 'zigzag', 'estrellita'] },
          { id: 'f0', tipo: 'figura', forma: 'estrella', cx: 200, cy: 150, size: 90, fill: '#43aa8b' },
          { id: 'f1', tipo: 'figura', oculto: true, forma: 'estrella', cx: 200, cy: 150, size: 90, fill: '#e63946' },
          { id: 'f2', tipo: 'figura', oculto: true, forma: 'estrella', cx: 200, cy: 150, size: 90, fill: '#e63946', stroke: '#1b1b1b', strokeW: 6 },
          { id: 'f3', tipo: 'figura', oculto: true, forma: 'estrella', cx: 200, cy: 150, size: 90, fill: '#e63946', stroke: '#1b1b1b', strokeW: 6, halo: true },
          { id: 'f4', tipo: 'figura', oculto: true, forma: 'estrella', cx: 200, cy: 150, size: 200, fill: '#e63946', stroke: '#1b1b1b', strokeW: 7, halo: true }
        ]
      },
      pasos: [
        { audio: 'n5_0', texto: 'Esta estrella casi no se ve…', apuntar: [52, 55], resaltar: 'f0' },
        { audio: 'n5_1', texto: '1️⃣ <b>Contraste</b>: un color muy distinto al fondo.', ocultar: ['f0'], mostrar: ['f1'], apuntar: [52, 55], resaltar: 'f1' },
        { audio: 'n5_2', texto: '2️⃣ <b>Contorno</b>: un borde grueso y oscuro.', ocultar: ['f1'], mostrar: ['f2'], apuntar: [52, 55], resaltar: 'f2' },
        { audio: 'n5_3', texto: '3️⃣ <b>Aire</b>: un espacio libre alrededor.', ocultar: ['f2'], mostrar: ['f3'], apuntar: [52, 55], resaltar: 'f3' },
        { audio: 'n5_4', texto: '4️⃣ <b>Tamaño</b>: una figura grande se ve antes.', ocultar: ['f3'], mostrar: ['f4'], apuntar: [52, 55], resaltar: 'f4' },
        { audio: 'n5_5', texto: '¡Ahora la estrella se ve <b>primero</b>! ⭐' }
      ]
    },

    /* 6 — ¿Cuál se destaca más? */
    {
      tipo: 'cualDestaca', titulo: '🏆 ¿Cuál se destaca más?', instr: 'cd_instr', err: 'cd_err',
      texto: 'Tocá la imagen donde la figura se ve <b>primero</b>.',
      rondas: [
        { ok: 'cd_1', truco: 'Contraste',
          fondo: { seed: 51, paleta: 'frios', bg: '#e9f5f2', densidad: 1, paso: 22, tipos: ['flor', 'puntos', 'onda', 'hoja', 'aro'] },
          buena: { forma: 'sol', cx: 150, cy: 112, size: 120, fill: '#ffb703' },
          mala:  { forma: 'sol', cx: 150, cy: 112, size: 120, fill: '#43aa8b' } },
        { ok: 'cd_2', truco: 'Contorno',
          fondo: { seed: 52, paleta: 'calidos', bg: '#fff1e6', densidad: 1, paso: 22, tipos: ['flor', 'puntos', 'onda', 'aro', 'zigzag'] },
          buena: { forma: 'pez', cx: 150, cy: 112, size: 150, fill: '#f4a261', stroke: '#1b1b1b', strokeW: 7 },
          mala:  { forma: 'pez', cx: 150, cy: 112, size: 150, fill: '#f4a261' } },
        { ok: 'cd_3', truco: 'Aire',
          fondo: { seed: 53, paleta: 'mixta', bg: '#fdf0d5', densidad: 1, paso: 20, tipos: ['flor', 'puntos', 'onda', 'aro', 'zigzag', 'linea'] },
          buena: { forma: 'casa', cx: 150, cy: 112, size: 120, fill: '#e63946', stroke: '#370617', strokeW: 3, halo: true },
          mala:  { forma: 'casa', cx: 150, cy: 112, size: 120, fill: '#e63946', stroke: '#370617', strokeW: 3 } },
        { ok: 'cd_4', truco: 'Tamaño',
          fondo: { seed: 54, paleta: 'suave', bg: '#ffffff', densidad: 1, paso: 20, tipos: ['flor', 'puntos', 'onda', 'aro', 'hoja', 'nube'] },
          buena: { forma: 'arbol', cx: 150, cy: 112, size: 190, fill: '#7b2cbf', stroke: '#240046', strokeW: 3 },
          mala:  { forma: 'arbol', cx: 150, cy: 112, size: 50, fill: '#7b2cbf', stroke: '#240046', strokeW: 3 } }
      ]
    },

    /* 7 — Verdadero o falso */
    {
      tipo: 'vf', titulo: '✔️ ¿Verdadero o falso?', instr: 'vf_instr', err: 'vf_err', img: 'img/vf_marco.jpg',
      marco: { x: 46.2, y: 14.7, w: 35.1, h: 65.7 },   // lienzo vacío dentro de la foto (en %)
      items: [
        { audio: 'vf_1', ok: 'vf_1ok', v: true,  texto: 'Una figura simple tiene pocos detalles y se reconoce fácil.',
          cuadro: { w: 250, h: 350, capas: [{ tipo: 'rect', fill: '#fffdf5' }, { tipo: 'figura', forma: 'corazon', cx: 125, cy: 178, size: 190, fill: '#e63946', stroke: '#8d0801', strokeW: 3 }] } },
        { audio: 'vf_2', ok: 'vf_2ok', v: false, texto: 'Si la figura tiene los mismos colores que el fondo, se destaca más.',
          cuadro: { w: 250, h: 350, capas: [
            { tipo: 'fondo', seed: 71, paleta: 'calidos', bg: '#ffe8d6', densidad: 1, paso: 22, tipos: ['flor', 'puntos', 'aro', 'hoja', 'estrellita', 'onda'] },
            { tipo: 'figura', forma: 'estrella', cx: 125, cy: 170, size: 130, fill: '#f4a261', sinDetalles: true },
            { tipo: 'fondo', seed: 91, paleta: 'calidos', bg: 'none', densidad: 0.3, paso: 24, tipos: ['puntos', 'linea', 'aro'] }] } },
        { audio: 'vf_3', ok: 'vf_3ok', v: true,  texto: 'Un contorno grueso y oscuro ayuda a que la figura se vea primero.',
          cuadro: { w: 250, h: 350, capas: [
            { tipo: 'fondo', seed: 72, paleta: 'frios', bg: '#e9f5f2', densidad: 1, paso: 22, tipos: ['flor', 'puntos', 'onda', 'hoja', 'aro'] },
            { tipo: 'figura', forma: 'pez', cx: 125, cy: 175, size: 215, fill: '#f4a261', stroke: '#1b1b1b', strokeW: 7 }] } },
        { audio: 'vf_4', ok: 'vf_4ok', v: false, texto: 'Un fondo complejo es un fondo de un solo color, sin dibujos.',
          cuadro: { w: 250, h: 350, capas: [{ tipo: 'fondo', seed: 73, paleta: 'mixta', bg: '#ffffff', densidad: 1, paso: 20, tipos: ['flor', 'puntos', 'onda', 'zigzag', 'nube', 'hoja', 'aro', 'casita', 'linea'] }] } },
        { audio: 'vf_5', ok: 'vf_5ok', v: true,  texto: 'Dejar un espacio libre alrededor de la figura la ayuda a destacarse.',
          cuadro: { w: 250, h: 350, capas: [
            { tipo: 'fondo', seed: 74, paleta: 'mixta', bg: '#fdf0d5', densidad: 1, paso: 20, tipos: ['flor', 'puntos', 'onda', 'zigzag', 'aro', 'linea'] },
            { tipo: 'figura', forma: 'casa', cx: 125, cy: 172, size: 150, fill: '#e63946', stroke: '#370617', strokeW: 3, halo: true, haloW: 34 }] } }
      ]
    },

    /* 8 — Taller digital (actividad abierta) */
    {
      tipo: 'taller', titulo: '🎨 Mi taller de arte', instr: 'ta_instr',
      formas: [
        { id: 'estrella', audio: 'f_estrella' }, { id: 'corazon', audio: 'f_corazon' }, { id: 'arbol', audio: 'f_arbol' },
        { id: 'casa', audio: 'f_casa' }, { id: 'sol', audio: 'f_sol' }, { id: 'pez', audio: 'f_pez' }
      ],
      colores: ['#e63946', '#fb8500', '#ffb703', '#06d6a0', '#2a9d8f', '#3a86ff', '#1d3557', '#8338ec', '#ff006e', '#8d5524', '#1b1b1b', '#ffffff'],
      sellos: ['flor', 'nube', 'hoja', 'estrellita', 'casita', 'arbolito', 'corazoncito'],
      archivo: 'mi-obra-figura-y-fondo.png'
    },

    /* 9 — Ahora en papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Elegí una figura sencilla: ⭐ ❤️ 🌳 🏠 ☀️ 🐟' },
        { audio: 'pp_2', texto: '<b>2.</b> Dibujala en el centro o en el lugar que quieras destacar.' },
        { audio: 'pp_3', texto: '<b>3.</b> Convertí el fondo en un lugar lleno de detalles: árboles, flores, nubes, personas, animales, líneas, puntos, texturas…' },
        { audio: 'pp_4', texto: '<b>4.</b> Pintá y decorá tu producción. ¡Usá los trucos! 🪄' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> hoja o cartón, lápices, fibras, crayones, papeles de revistas o diarios, material de descarte limpio.' }
      ]
    },

    /* 10 — Foto de la obra en papel */
    { tipo: 'foto', titulo: '📷 Mi obra en papel', instr: 'fo_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu obra en papel, o <b>🖼️ Elegir de la galería</b> para buscar la obra que guardaste en el taller.', boton: 'fo_boton', ok: 'fo_ok', img: 'img/foto.jpg',
      archivo: 'mi-obra-en-papel.jpg' },

    /* 11 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi obra', instr: 'ae_instr', fin: 'ae_fin',
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Mi figura es <b>simple</b>, con pocos detalles?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Mi fondo tiene <b>muchos</b> elementos y detalles?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Usé <b>colores distintos</b> para la figura y el fondo?' },
        { audio: 'ae_4', si: 'ae_4si', no: 'ae_4no', texto: '¿Mi figura es lo <b>primero</b> que se ve?' }
      ]
    },

    /* 12 — En familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Mostrale tu obra a alguien de tu familia y preguntale: <b>¿Qué viste primero?</b>' },
        { audio: 'fa_2', texto: 'Después explicale: <b>¿Cuál es mi figura simple? ¿Por qué mi fondo es complejo?</b>' },
        { audio: 'fa_3', texto: '📁 Guardá tu producción en la carpeta de <b>Artes Visuales</b> para compartirla al regresar a la escuela.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
