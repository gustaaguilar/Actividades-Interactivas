/* ============================================================
   DESECHOS QUE SE CONVIERTEN EN ARTE — Artes Visuales · 4.º grado
   Escultura con materiales reutilizados
   Basado en la Ficha Viajera N.º 2 de Artes Visuales
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  negro: '#1b1b1b', rojo: '#e63946', naranja: '#fb8500', amarillo: '#ffb703', verde: '#2a9d8f', verdeClaro: '#90be6d',
  celeste: '#8ecae6', azul: '#3a86ff', violeta: '#8338ec', rosa: '#ff70a6', gris: '#9a9a9a', blanco: '#ffffff'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };
const TX = {
  carton: { n: 'cartón', img: 'img/tx_carton.jpg' },
  tapitas: { n: 'tapitas', img: 'img/tx_tapitas.jpg' },
  lana: { n: 'lana', img: 'img/tx_lana.jpg' },
  papel: { n: 'papel de diario', img: 'img/tx_diario.jpg' }
};
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const emo = (e, label, extra) => Object.assign({ emoji: e, label }, extra || {});
const R = (x, y, w, h, fill, extra) => Object.assign({ tipo: 'rect', x, y, w, h, fill, stroke: '#5b4636', rx: 6 }, extra || {});
const pieza = (forma, cx, cy, size, fill) => ({ tipo: 'forma', forma, cx, cy, size, fill, stroke: '#5b4636', sw: 3 });
/* robot armado con "materiales": caja (cuerpo), tubo (cuello/brazos), tapitas (ojos/botones) */
const ROBOT = [
  R(150, 40, 100, 80, '#c8a06a'), pieza('circulo', 178, 75, 26, '#e63946'), pieza('circulo', 222, 75, 26, '#3a86ff'),
  R(185, 120, 30, 20, '#d9b98a'),
  R(130, 140, 140, 110, '#c8a06a'), pieza('circulo', 200, 170, 20, '#ffb703'), pieza('circulo', 200, 200, 20, '#2a9d8f'), pieza('circulo', 200, 230, 20, '#8338ec'),
  R(92, 150, 38, 18, '#d9b98a'), R(270, 150, 38, 18, '#d9b98a'), R(150, 250, 30, 35, '#d9b98a'), R(220, 250, 30, 35, '#d9b98a'),
  { tipo: 'path', d: 'M200 40L200 18', stroke: '#5b4636', sw: 4 }, pieza('circulo', 200, 15, 16, '#ff70a6')
];

window.DATOS = {
  meta: {
    titulo: 'Desechos que se convierten en arte',
    subtitulo: 'Esculturas con materiales reutilizados',
    area: '🎨 Artes Visuales · 4.º grado',
    grado: 'Artes Visuales · 4.º grado',
    fuente: 'Basado en la Ficha Viajera N.º 2 de Artes Visuales · 4.º grado',
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
    portada: '¡Hola! Bienvenidos a Desechos que se convierten en arte. Vamos a descubrir cómo los materiales que solemos tirar pueden tener una nueva vida, y vas a construir tu propia escultura. Tocá Comenzar.',

    /* 1 — una nueva vida */
    nv_1: 'Muchas cosas que usamos todos los días terminan en la basura: cajas, tubos de cartón, tapitas, envases.',
    nv_2: 'Pero los materiales que consideramos residuos pueden tener una nueva vida a través del arte.',
    nv_3: 'El artista argentino Antonio Berni usó materiales no convencionales en muchas de sus obras.',
    nv_4: 'Hoy vas a construir una escultura: una obra con volumen, que se puede mirar desde todos los lados.',

    /* 2 — sirve o no */
    sv_instr: 'Mirá cada material y escuchá su nombre. ¿Sirve para tu escultura, porque está limpio y es seguro? ¿O no conviene usarlo? Tocá la respuesta.',
    sv_err: 'Pensalo otra vez. ¿Está limpio? ¿Te podés lastimar con eso?',
    m_caja: 'Una caja pequeña.', m_rollo: 'Un rollito de papel.', m_lana: 'Lana o hilo.', m_tapitas: 'Tapitas.',
    m_pila: 'Una pila.', m_vidrio: 'Un vidrio roto.', m_cascara: 'Una cáscara de banana.', m_lata: 'Una lata abierta con filo.',
    sv_caja: '¡Sí! Una caja limpia sirve para el cuerpo de la escultura.',
    sv_rollo: '¡Muy bien! El rollito de cartón puede ser un brazo, una pata o un cuello.',
    sv_lana: '¡Correcto! La lana sirve para el pelo o para decorar.',
    sv_tapitas: '¡Exacto! Las tapitas pueden ser ojos, botones o ruedas.',
    sv_pila: '¡Bien! Las pilas no se usan: tienen sustancias peligrosas y van a un lugar especial.',
    sv_vidrio: '¡Muy bien! El vidrio roto corta. Nunca lo uses.',
    sv_cascara: '¡Correcto! Los restos de comida se pudren y no sirven para una escultura.',
    sv_lata: '¡Exacto! Una lata con filo puede lastimarte. Mejor no usarla.',

    /* 3 — cómo se unen */
    un_1: 'Para construir, tenés que unir los materiales. Hay distintas maneras.',
    un_2: 'Encastrar: meter una pieza dentro de otra.',
    un_3: 'Doblar: plegar el material para darle otra forma.',
    un_4: 'Superponer: poner una pieza encima de otra.',
    un_5: 'Pegar y unir: con pegamento o con cinta de papel.',

    /* 4 — asociar */
    as_instr: 'Tocá una técnica y después lo que significa.',
    as_err: 'Mmm, pensá otra vez qué se hace en esa técnica.',
    tc_encastrar: 'Encastrar.', tc_doblar: 'Doblar.', tc_superponer: 'Superponer.', tc_pegar: 'Pegar.', tc_unir: 'Unir con cinta.',
    as_encastrar: '¡Sí! Encastrar es meter una pieza dentro de otra, como un tubo en una caja.',
    as_doblar: '¡Muy bien! Doblar es plegar el material.',
    as_superponer: '¡Correcto! Superponer es poner una pieza arriba de otra.',
    as_pegar: '¡Exacto! Pegar es unir con pegamento o cola.',
    as_unir: '¡Bien! Con cinta de papel también podemos unir las piezas.',

    /* 5 — paso a paso */
    pa_instr: 'Pensá en el orden para construir tu escultura. Tocá la respuesta correcta.',
    pa_err: 'Pensalo otra vez. ¿Qué conviene hacer en ese momento?',
    pa_1: '¿Qué hacés primero?',
    pa_1ok: '¡Sí! Primero imaginás qué querés construir: un animal, un personaje o un robot.',
    pa_2: '¿Y antes de empezar a construir?',
    pa_2ok: '¡Muy bien! Hacés un boceto, un dibujo rápido, en tu carpeta.',
    pa_3: '¿Qué hacés para darle identidad a tu creación?',
    pa_3ok: '¡Excelente! La decorás con papeles, lanas, tapitas, dibujos o colores.',

    /* 6 — taller */
    ta_instr: '¡Armá tu escultura en el taller! Usá las formas como si fueran cajas, tubos y tapitas, y rellenalas con cartón, tapitas o lana. Agregale ojos y decorala. Arriba, escribí el título de tu escultura.',
    t_sello: 'Piezas. Elegí una forma y tocá el cuadro.',
    t_lapiz: 'Lápiz, para dibujar detalles.',
    t_balde: 'Balde. Tocá una pieza para rellenarla con cartón, tapitas, lana o un color.',
    t_punto: 'Puntos.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    s_rectangulo: 'Tubo o caja larga.', s_cuadrado: 'Caja.', s_circulo: 'Tapita.', s_ovalo: 'Envase.', s_triangulo: 'Punta.', s_ojo: 'Ojo.',
    n_carton: 'Cartón.', n_tapitas: 'Tapitas.', n_lana: 'Lana.', n_papel: 'Papel de diario.',
    nm_foco: 'Escribí el título de tu escultura.',
    p_guardar: '¡Tu escultura quedó guardada!',

    /* 7 — a construir */
    pp_1: 'Ahora, a construir de verdad. Buscá tres o cuatro materiales limpios que tengas en casa. No necesitás comprar nada.',
    pp_2: 'Paso uno, imaginá: pensá en un animal, un personaje o un robot que puedas construir.',
    pp_3: 'Paso dos, dibujá: hacé un pequeño boceto en tu carpeta.',
    pp_4: 'Paso tres, construí: uní los materiales con pegamento o cinta de papel. Podés encastrar, doblar, superponer, pegar y unir.',
    pp_5: 'Paso cuatro, decorá: agregá papeles, lanas, tapitas, dibujos o colores para darle identidad a tu creación.',

    /* 8 — foto */
    ft_instr: 'Cuando termines tu escultura, pulsá el botón Sacar foto para fotografiarla. O también podés elegir la que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Qué buena escultura! Tocá Guardar para tenerla en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Pensá en tu escultura y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Hice un boceto antes de construir?',
    ae_1si: '¡Muy bien! El boceto ayuda a organizar la idea.',
    ae_1no: 'La próxima vez, probá dibujarla antes.',
    ae_2: '¿Reutilicé tres o cuatro materiales limpios?',
    ae_2si: '¡Genial! Les diste una nueva vida.',
    ae_2no: 'Buscá algún material más en tu casa.',
    ae_3: '¿Usé alguna técnica para unir: encastrar, doblar, superponer o pegar?',
    ae_3si: '¡Excelente! Tu escultura se sostiene.',
    ae_3no: 'Probá unir las piezas con cinta o pegamento.',
    ae_4: '¿La decoré para darle identidad y le puse un título?',
    ae_4si: '¡Muy bien! Ya tiene personalidad y nombre.',
    ae_4no: 'Agregale colores o detalles, y pensá un título.',
    ae_fin: 'Gracias por mirar tu escultura con atención. Mirar lo que hicimos también es parte del arte.',

    /* 10 — registrá */
    fa_1: 'Registrá en tu carpeta: el título de tu escultura y qué construiste.',
    fa_2: 'Después anotá: qué materiales utilizaste, y cuál pudiste reutilizar.',
    fa_3: 'Contale a tu familia qué fue lo más divertido de construir.',
    fa_4: 'Para pensar: ¿qué objeto que normalmente tirarías podría convertirse en una obra de arte?',
    fa_5: 'Guardá tu escultura y tu carpeta para presentarlas al regresar a la escuela.',

    cierre: '¡Terminaste! Descubriste que los materiales que muchas veces consideramos residuos pueden tener una nueva vida a través del arte. ¡Reciclá, imaginá y creá!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Una nueva vida */
    {
      tipo: 'narracion', titulo: '♻️ Una nueva vida',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#f3ead8' },
          { id: 'b', tipo: 'grupo', capas: [txt(70, 120, '📦', 56), txt(160, 120, '🧻', 56), txt(250, 120, '🍶', 56), txt(335, 120, '🧶', 56), txt(200, 210, '🗑️ ?', 56)] },
          { id: 'f', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: '#f3ead8' }, txt(60, 160, '♻️', 64)] },
          { id: 'r', tipo: 'grupo', oculto: true, capas: ROBOT },
          { id: 'e', tipo: 'grupo', oculto: true, capas: [txt(340, 280, '360°', 26, '#7a6a5a')] }
        ]
      },
      pasos: [
        { audio: 'nv_1', texto: 'Cajas, tubos, tapitas, envases… ¿a la <b>basura</b>?', apuntar: [50, 64], resaltar: 'b' },
        { audio: 'nv_2', texto: '¡Pueden tener una <b>nueva vida</b> a través del arte! ♻️', ocultar: ['b'], mostrar: ['f', 'r'], apuntar: [50, 45], resaltar: 'r' },
        { audio: 'nv_3', texto: '<b>Antonio Berni</b> usó materiales no convencionales en sus obras.' },
        { audio: 'nv_4', texto: 'Una <b>escultura</b> tiene volumen: se mira desde todos los lados.', mostrar: ['e'], apuntar: [84, 88] }
      ]
    },

    /* 2 — ¿Sirve para tu escultura? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Sirve para tu escultura?', instr: 'sv_instr', err: 'sv_err',
      texto: '¿Está <b>limpio</b> y es <b>seguro</b>?',
      categorias: [{ id: 's', label: '✅ Sirve', sub: 'limpio y seguro' }, { id: 'n', label: '🚫 No conviene', sub: 'sucio o peligroso' }],
      items: [
        emo('📦', 'caja pequeña', { id: 'caja', cat: 's', audio: 'm_caja', ok: 'sv_caja' }),
        emo('🧻', 'rollito de papel', { id: 'rollo', cat: 's', audio: 'm_rollo', ok: 'sv_rollo' }),
        emo('🧶', 'lana o hilo', { id: 'lana', cat: 's', audio: 'm_lana', ok: 'sv_lana' }),
        { id: 'tapitas', cat: 's', audio: 'm_tapitas', ok: 'sv_tapitas', img: TX.tapitas.img, label: 'tapitas' },
        emo('🔋', 'pila', { id: 'pila', cat: 'n', audio: 'm_pila', ok: 'sv_pila' }),
        emo('🍾💥', 'vidrio roto', { id: 'vidrio', cat: 'n', audio: 'm_vidrio', ok: 'sv_vidrio' }),
        emo('🍌', 'cáscara de banana', { id: 'cascara', cat: 'n', audio: 'm_cascara', ok: 'sv_cascara' }),
        emo('🥫⚠️', 'lata abierta con filo', { id: 'lata', cat: 'n', audio: 'm_lata', ok: 'sv_lata' })
      ]
    },

    /* 3 — Cómo se unen */
    {
      tipo: 'narracion', titulo: '🔧 ¿Cómo se unen?',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'e', tipo: 'grupo', oculto: true, capas: [R(30, 60, 90, 70, '#c8a06a'), R(62, 20, 26, 60, '#d9b98a'), txt(75, 160, 'encastrar', 18)] },
          { id: 'd', tipo: 'grupo', oculto: true, capas: [{ tipo: 'path', d: 'M150 120L180 60L210 120L240 60L270 120', stroke: '#8ecae6', sw: 14 }, txt(210, 160, 'doblar', 18)] },
          { id: 's', tipo: 'grupo', oculto: true, capas: [R(305, 100, 80, 30, '#c8a06a'), R(315, 72, 60, 28, '#e63946'), R(325, 46, 40, 26, '#ffb703'), txt(345, 160, 'superponer', 18)] },
          { id: 'p', tipo: 'grupo', oculto: true, capas: [R(70, 210, 70, 50, '#c8a06a'), R(140, 210, 70, 50, '#d9b98a'), txt(140, 205, '💧', 26), R(240, 210, 70, 50, '#c8a06a'), R(310, 210, 70, 50, '#d9b98a'), R(295, 222, 30, 26, '#f3e3b0', { stroke: '#b89b5e' }), txt(225, 292, 'pegar y unir con cinta', 18)] }
        ]
      },
      pasos: [
        { audio: 'un_1', texto: 'Para construir, hay que <b>unir</b> los materiales.' },
        { audio: 'un_2', texto: '<b>Encastrar</b>: una pieza dentro de otra.', mostrar: ['e'], apuntar: [19, 15], resaltar: 'e' },
        { audio: 'un_3', texto: '<b>Doblar</b>: plegar el material.', mostrar: ['d'], apuntar: [52, 22], resaltar: 'd' },
        { audio: 'un_4', texto: '<b>Superponer</b>: una pieza encima de otra.', mostrar: ['s'], apuntar: [86, 18], resaltar: 's' },
        { audio: 'un_5', texto: '<b>Pegar</b> y <b>unir</b>: con pegamento o cinta de papel.', mostrar: ['p'], apuntar: [50, 70], resaltar: 'p' }
      ]
    },

    /* 4 — Asociar técnica y significado */
    {
      tipo: 'asociar', titulo: '🧩 Técnicas para construir', instr: 'as_instr', err: 'as_err',
      texto: 'Uní cada <b>técnica</b> con lo que significa.',
      pares: [
        { id: 'encastrar', izq: { emoji: '🧩', label: 'encastrar', audio: 'tc_encastrar' }, der: { label: 'meter una pieza dentro de otra' }, ok: 'as_encastrar' },
        { id: 'doblar', izq: { emoji: '🪗', label: 'doblar', audio: 'tc_doblar' }, der: { label: 'plegar el material' }, ok: 'as_doblar' },
        { id: 'superponer', izq: { emoji: '📚', label: 'superponer', audio: 'tc_superponer' }, der: { label: 'poner una pieza encima de otra' }, ok: 'as_superponer' },
        { id: 'pegar', izq: { emoji: '💧', label: 'pegar', audio: 'tc_pegar' }, der: { label: 'unir con pegamento o cola' }, ok: 'as_pegar' },
        { id: 'unir', izq: { emoji: '🩹', label: 'unir con cinta', audio: 'tc_unir' }, der: { label: 'juntar con cinta de papel' }, ok: 'as_unir' }
      ]
    },

    /* 5 — Paso a paso */
    {
      tipo: 'elegir', titulo: '🪜 Paso a paso', instr: 'pa_instr', err: 'pa_err',
      rondas: [
        { texto: '¿Qué hacés <b>primero</b>?', audio: 'pa_1', ok: 'pa_1ok', correcta: 'i', visual: { escena: { w: 400, h: 300, capas: [{ tipo: 'rect', fill: '#f3ead8' }, ...ROBOT] } },
          opciones: [{ id: 'd', label: '🎨 Decorar' }, { id: 'i', label: '💭 Imaginar qué construir' }, { id: 'c', label: '🔧 Pegar las piezas' }] },
        { texto: '¿Y <b>antes de construir</b>?', audio: 'pa_2', ok: 'pa_2ok', correcta: 'b', visual: { escena: { w: 400, h: 300, capas: [{ tipo: 'rect', fill: '#f3ead8' }, ...ROBOT] } },
          opciones: [{ id: 'b', label: '✏️ Hacer un boceto en la carpeta' }, { id: 'd', label: '🎨 Pintarla toda' }, { id: 'f', label: '📷 Sacarle una foto' }] },
        { texto: '¿Cómo le das <b>identidad</b>?', audio: 'pa_3', ok: 'pa_3ok', correcta: 'd', visual: { escena: { w: 400, h: 300, capas: [{ tipo: 'rect', fill: '#f3ead8' }, ...ROBOT] } },
          opciones: [{ id: 'x', label: '🗑️ Tirando los materiales' }, { id: 'd', label: '🎨 Decorándola: papeles, lanas, tapitas, colores' }, { id: 'c', label: '🛒 Comprando materiales nuevos' }] }
      ]
    },

    /* 6 — Taller */
    {
      tipo: 'taller', titulo: '🤖 Mi escultura reciclada', instr: 'ta_instr',
      herramientas: ['sello', 'balde', 'lapiz', 'punto', 'goma'],
      sellos: ['rectangulo', 'cuadrado', 'circulo', 'ovalo', 'triangulo', 'ojo'],
      colores: ['negro', 'rojo', 'naranja', 'amarillo', 'verdeClaro', 'verde', 'celeste', 'azul', 'violeta', 'rosa', 'gris', 'blanco'],
      texturas: ['carton', 'tapitas', 'lana', 'papel'].map(id => ({ id, img: TX[id].img, n: TX[id].n, audio: 'n_' + id })),
      nombre: { label: 'Título:', placeholder: 'el título de tu escultura', audio: 'nm_foco' },
      archivo: 'mi-escultura-reciclada.png'
    },

    /* 7 — A construir */
    {
      tipo: 'pasos', titulo: '♻️ ¡A construir!', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: 'Buscá <b>3 o 4 materiales limpios</b>: tubos, cajas, tapitas, rollitos, cartón, papel, lana, envases. ¡No compres nada!' },
        { audio: 'pp_2', texto: '<b>1. Imaginá</b> un animal, un personaje o un robot. 💭' },
        { audio: 'pp_3', texto: '<b>2. Dibujá</b> un pequeño boceto en tu carpeta. ✏️' },
        { audio: 'pp_4', texto: '<b>3. Construí</b>: encastrá, doblá, superponé, pegá y uní. 🔧' },
        { audio: 'pp_5', texto: '<b>4. Decorá</b> para darle identidad. 🎨' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mi escultura', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu escultura, o <b>🖼️ Elegir de la galería</b> para buscar la que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'mi-escultura-reciclada-foto.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi escultura', instr: 'ae_instr', fin: 'ae_fin',
      mini: { w: 400, h: 300, capas: [{ tipo: 'rect', fill: '#f3ead8' }, ...ROBOT] },
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Hice un <b>boceto</b> antes de construir?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Reutilicé <b>3 o 4 materiales</b> limpios?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Usé una <b>técnica</b> para unir?' },
        { audio: 'ae_4', si: 'ae_4si', no: 'ae_4no', texto: '¿La <b>decoré</b> y le puse <b>título</b>?' }
      ]
    },

    /* 10 — Registrá */
    {
      tipo: 'pasos', titulo: '✏️ Registrá en tu carpeta', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: '📝 <b>Título</b> de mi escultura y <b>qué construí</b>.' },
        { audio: 'fa_2', texto: '📝 <b>Materiales</b> que utilicé y cuál pude <b>reutilizar</b>.' },
        { audio: 'fa_3', texto: '🏡 Contale a tu familia: <b>¿qué fue lo más divertido de construir?</b>' },
        { audio: 'fa_4', texto: '🌱 ¿Qué objeto que tirarías podría convertirse en <b>arte</b>?' },
        { audio: 'fa_5', texto: '📌 Guardá tu escultura y tu carpeta para la escuela.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
