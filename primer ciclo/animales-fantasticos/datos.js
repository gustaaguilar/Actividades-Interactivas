/* ============================================================
   ANIMALES FANTÁSTICOS DE COLORES — Artes Visuales · 3.º grado
   Colores opacos
   Basado en la Ficha Viajera de Artes Visuales (Propuesta breve 1)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  rojo: '#e8262f', naranja: '#ff8a1e', amarillo: '#ffd21f', verdeClaro: '#7ddc5a', celeste: '#4cc9f0', rosa: '#ff70a6',
  violeta: '#9b4dca', blanco: '#ffffff',
  azulOsc: '#1d2f6f', violetaOsc: '#3c1a5b', verdeOsc: '#1e5631', bordo: '#6d1a36', marronOsc: '#4a2f1a'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };

const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
const bicho = (cx, cy, size, colores, extra) => Object.assign({ tipo: 'criatura', cx, cy, size, colores }, extra || {});
const VIVOS = [COL.naranja, COL.amarillo, COL.celeste, COL.rosa];
const VIVOS2 = [COL.rojo, COL.verdeClaro, COL.amarillo, COL.celeste];
const conFondo = (bg, cols) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: bg }, bicho(150, 115, 210, cols)] });
const emo = (e, label, extra) => Object.assign({ emoji: e, label }, extra || {});

window.DATOS = {
  meta: {
    titulo: 'Animales fantásticos de colores',
    subtitulo: 'Los colores opacos',
    area: '🎨 Artes Visuales · 3.er grado',
    grado: 'Artes Visuales · 3.er grado',
    fuente: 'Basado en la Ficha Viajera de Artes Visuales · Propuesta breve 1',
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
    portada: '¡Hola! Bienvenidos a Animales fantásticos de colores. Vamos a inventar animales que no existen, a conocer los colores opacos y a hacer que nuestro animal se destaque. Tocá Comenzar.',

    /* 1 — animales fantásticos */
    af_1: 'Un animal fantástico es un animal que no existe. ¡Lo inventamos con la imaginación!',
    af_2: 'Puede tener patas muy largas.',
    af_3: 'Puede tener alas para volar.',
    af_4: 'Puede tener cuatro ojos.',
    af_5: 'Y una cola enorme. ¡Todo lo que se te ocurra!',

    /* 2 — real o fantástico */
    rf_instr: 'Mirá cada animal. ¿Es un animal real, que existe, o es fantástico, inventado? Tocá la respuesta.',
    rf_err: 'Pensalo otra vez. ¿Ese animal existe de verdad?',
    rf_perro: '¡Sí! El perro es un animal real.',
    rf_caballo: '¡Muy bien! El caballo existe, es real.',
    rf_rana: '¡Correcto! La rana es un animal real.',
    rf_jirafa: '¡Exacto! La jirafa es real, aunque tenga el cuello tan largo.',
    rf_unicornio: '¡Sí! El unicornio es fantástico: es un caballo inventado con un cuerno.',
    rf_dragon: '¡Muy bien! El dragón es fantástico, aparece en los cuentos.',
    rf_bicho1: '¡Correcto! Este animal tiene alas, cuatro ojos y cola enorme. ¡Es fantástico!',
    rf_bicho2: '¡Exacto! Este también es fantástico, lo inventamos nosotros.',

    /* 3 — colores opacos */
    op_1: 'Mirá esta estrella dibujada.',
    op_2: 'Ahora le pasamos encima un color opaco, como la témpera o el crayón apretando fuerte.',
    op_3: 'La estrella ya no se ve. Los colores opacos tapan lo que hay abajo: no dejan ver a través.',
    op_4: 'Con colores opacos el dibujo queda bien cubierto, firme y con colores fuertes.',

    /* 4 — destacar */
    de_1: 'Para que tu animal se destaque, elegí cuatro colores vivos para cubrir su cuerpo.',
    de_2: 'Pintá el fondo con colores oscuros, como azul, violeta, verde o marrón oscuro. Pero no uses el negro.',
    de_3: 'Sobre el fondo oscuro, los colores vivos del animal se ven mucho más.',
    de_4: 'Por último, pegá recortes de papel de envoltorio, de galletitas o de caramelos, para hacer manchas, escamas o plumas que brillen.',

    /* 5 — qué fondo */
    qf_instr: 'Mirá el animal sobre tres fondos distintos. ¿En cuál se destaca más? Tocá la imagen.',
    qf_err: 'Mirá otra vez. ¿En cuál ves al animal más rápido?',
    qf_1: '¿Con qué fondo se destaca más este animal?',
    qf_1ok: '¡Muy bien! Sobre el azul oscuro, los colores vivos se destacan.',
    qf_2: '¿Y este otro animal?',
    qf_2ok: '¡Excelente! El violeta oscuro hace brillar al animal.',
    qf_3: 'Último. ¿En cuál se destaca más?',
    qf_3ok: '¡Correcto! El verde oscuro hace que el animal se vea primero.',

    /* 6 — opaco o deja ver */
    ov_instr: 'Mirá cada material y escuchá su nombre. ¿Es opaco, que tapa lo de abajo, o deja ver a través? Tocá la respuesta.',
    ov_err: 'Imaginá que lo ponés delante de tus ojos. ¿Ves a través?',
    m_madera: 'Una tabla de madera.', m_carton: 'Una caja de cartón.', m_ladrillo: 'Un ladrillo.', m_libro: 'Un libro.',
    m_vidrio: 'El vidrio de una ventana.', m_agua: 'Agua limpia.', m_lente: 'Unos anteojos.', m_frasco: 'Un frasco de vidrio.',
    ov_madera: '¡Sí! La madera es opaca: no deja ver lo que hay detrás.',
    ov_carton: '¡Muy bien! El cartón es opaco.',
    ov_ladrillo: '¡Correcto! El ladrillo es opaco.',
    ov_libro: '¡Exacto! Un libro tapa lo que hay detrás: es opaco.',
    ov_vidrio: '¡Sí! El vidrio de la ventana deja ver a través.',
    ov_agua: '¡Muy bien! El agua limpia deja ver el fondo.',
    ov_lente: '¡Correcto! Los vidrios de los anteojos dejan ver.',
    ov_frasco: '¡Bien! El frasco de vidrio deja ver lo que tiene adentro.',

    /* 7 — taller */
    ta_instr: '¡Creá tu animal fantástico! Armalo con las formas: cuerpo, alas, cola, patas y muchos ojos, bien grande. Pintá su cuerpo con cuatro colores vivos y usá el balde para pintar el fondo con un color oscuro. Con la textura brillante podés hacer escamas o plumas. Arriba, escribí su nombre.',
    t_sello: 'Formas para armar el animal. Elegí una y tocá el cuadro.',
    t_lapiz: 'Lápiz, para dibujar.',
    t_balde: 'Balde. Tocá adentro de una parte para pintarla.',
    t_mancha: 'Manchas.',
    t_punto: 'Puntos.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    s_ovalo: 'Cuerpo.', s_circulo: 'Cabeza.', s_ala: 'Ala.', s_cola: 'Cola.', s_pata: 'Pata.', s_ojo: 'Ojo.', s_triangulo: 'Cuerno o púa.', s_gota: 'Escama o pluma.',
    n_envoltorio: 'Papel de envoltorio brillante.',
    nm_foco: 'Inventá un nombre para tu animal fantástico.',
    p_guardar: '¡Tu animal fantástico quedó guardado!',

    /* 8 — en papel */
    pp_1: 'Ahora hacelo en papel. Paso uno: imaginá un animal que no exista. Puede tener alas, cuatro ojos, patas largas o una cola enorme.',
    pp_2: 'Paso dos: dibujalo en la hoja o en el cartón, bien grande, que ocupe gran parte de la hoja.',
    pp_3: 'Paso tres: elegí cuatro colores para cubrir su cuerpo.',
    pp_4: 'Paso cuatro: pintá el fondo con crayones o lápices de colores oscuros. Que no sea el color negro.',
    pp_5: 'Paso cinco: agregá recortes de papeles de envoltorio para formar manchas, escamas o plumas.',
    pp_6: 'Paso seis: inventá un nombre y pensá dónde vive.',
    pp_7: 'Necesitás una hoja blanca o cartón, colores, fibras, crayones o témperas, y papeles de envoltorio de galletitas o de caramelos.',

    /* 9 — foto */
    fo_instr: 'Cuando termines tu animal en papel, pulsá el botón Sacar foto para fotografiarlo. O también podés elegir el que guardaste en el taller, pulsando el botón Elegir de la galería.',
    fo_boton: 'Sacar una foto.',
    fo_ok: '¡Qué animal tan fantástico! Tocá Guardar para tenerlo en tu celular.',

    /* 10 — autoevaluación */
    ae_instr: 'Mirá tu animal y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Mi animal es inventado, con partes fantásticas?',
    ae_1si: '¡Muy bien! Es un animal que no existe.',
    ae_1no: 'Podés agregarle alas, más ojos o una cola enorme.',
    ae_2: '¿Ocupa gran parte de la hoja?',
    ae_2si: '¡Genial! Bien grande se ve mejor.',
    ae_2no: 'La próxima vez dibujalo más grande.',
    ae_3: '¿Usé cuatro colores para su cuerpo?',
    ae_3si: '¡Excelente! Un cuerpo bien colorido.',
    ae_3no: 'Probá sumar colores hasta llegar a cuatro.',
    ae_4: '¿El fondo es oscuro, sin usar negro?',
    ae_4si: '¡Muy bien! Así el animal se destaca.',
    ae_4no: 'Probá pintar el fondo de azul, violeta, verde o marrón oscuro.',
    ae_5: '¿Agregué papeles de envoltorio?',
    ae_5si: '¡Brillante! Escamas y plumas que brillan.',
    ae_5no: 'Podés pegar algún recorte para hacer manchas o escamas.',
    ae_fin: 'Gracias por mirar tu animal con atención. Mirar lo que hicimos también es parte del arte.',

    /* 11 — familia */
    fa_1: 'Presentale tu animal a tu familia: contales cómo se llama y dónde vive.',
    fa_2: 'Contales: ¿qué colores elegiste para el cuerpo del animal?',
    fa_3: '¿Cómo hiciste para que el animal se destaque del fondo?',
    fa_4: 'Por último, guardá tu trabajo en la carpeta de Artes Visuales.',

    cierre: '¡Terminaste! Inventaste un animal fantástico, aprendiste que los colores opacos tapan lo de abajo, y que un fondo oscuro hace destacar los colores vivos. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Animales fantásticos (la criatura se arma de a partes) */
    {
      tipo: 'narracion', titulo: '🦄 Animales fantásticos',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fff6e8' },
          { id: 'b0', tipo: 'grupo', capas: [bicho(200, 150, 270, VIVOS, { sin: ['patas', 'alas', 'ojos', 'cola'] })] },
          { id: 'b1', tipo: 'grupo', oculto: true, capas: [bicho(200, 150, 270, VIVOS, { sin: ['alas', 'ojos', 'cola'] })] },
          { id: 'b2', tipo: 'grupo', oculto: true, capas: [bicho(200, 150, 270, VIVOS, { sin: ['ojos', 'cola'] })] },
          { id: 'b3', tipo: 'grupo', oculto: true, capas: [bicho(200, 150, 270, VIVOS, { sin: ['cola'] })] },
          { id: 'b4', tipo: 'grupo', oculto: true, capas: [bicho(200, 150, 270, VIVOS)] }
        ]
      },
      pasos: [
        { audio: 'af_1', texto: 'Un <b>animal fantástico</b> no existe: ¡lo inventamos! ✨' },
        { audio: 'af_2', texto: 'Puede tener <b>patas muy largas</b>…', ocultar: ['b0'], mostrar: ['b1'], apuntar: [44, 82], resaltar: 'b1' },
        { audio: 'af_3', texto: '…<b>alas</b> para volar…', ocultar: ['b1'], mostrar: ['b2'], apuntar: [60, 18], resaltar: 'b2' },
        { audio: 'af_4', texto: '…<b>cuatro ojos</b>…', ocultar: ['b2'], mostrar: ['b3'], apuntar: [26, 28], resaltar: 'b3' },
        { audio: 'af_5', texto: '…¡y una <b>cola enorme</b>!', ocultar: ['b3'], mostrar: ['b4'], apuntar: [80, 22], resaltar: 'b4' }
      ]
    },

    /* 2 — ¿Real o fantástico? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Real o fantástico?', instr: 'rf_instr', err: 'rf_err',
      texto: '¿Existe de verdad?',
      categorias: [{ id: 'r', label: '🐾 Real', sub: 'existe' }, { id: 'f', label: '✨ Fantástico', sub: 'inventado' }],
      items: [
        emo('🐶', 'perro', { id: 'perro', cat: 'r', ok: 'rf_perro' }),
        emo('🐴', 'caballo', { id: 'caballo', cat: 'r', ok: 'rf_caballo' }),
        emo('🐸', 'rana', { id: 'rana', cat: 'r', ok: 'rf_rana' }),
        emo('🦒', 'jirafa', { id: 'jirafa', cat: 'r', ok: 'rf_jirafa' }),
        emo('🦄', 'unicornio', { id: 'unicornio', cat: 'f', ok: 'rf_unicornio' }),
        emo('🐉', 'dragón', { id: 'dragon', cat: 'f', ok: 'rf_dragon' }),
        { id: 'bicho1', cat: 'f', ok: 'rf_bicho1', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, bicho(150, 112, 215, VIVOS2)] } },
        { id: 'bicho2', cat: 'f', ok: 'rf_bicho2', escena: { w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, bicho(150, 112, 215, [COL.violeta, COL.naranja, COL.verdeClaro, COL.rosa])] } }
      ]
    },

    /* 3 — Colores opacos */
    {
      tipo: 'narracion', titulo: '🖌️ Los colores opacos',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#ffffff' },
          { tipo: 'figura', forma: 'estrella', cx: 200, cy: 150, size: 190, fill: '#ffffff', stroke: '#1b1b1b', strokeW: 5 },
          { id: 'c1', tipo: 'grupo', oculto: true, capas: [{ tipo: 'forma', forma: 'mancha', cx: 145, cy: 150, size: 210, fill: COL.naranja }] },
          { id: 'c2', tipo: 'grupo', oculto: true, capas: [{ tipo: 'forma', forma: 'mancha', cx: 250, cy: 145, size: 230, fill: COL.celeste }, { tipo: 'forma', forma: 'mancha', cx: 200, cy: 175, size: 170, fill: COL.rosa }] },
          { id: 'c3', tipo: 'grupo', oculto: true, capas: [txt(330, 270, '🖍️ 🎨', 34)] }
        ]
      },
      pasos: [
        { audio: 'op_1', texto: 'Mirá esta <b>estrella</b> dibujada. ⭐', apuntar: [50, 18] },
        { audio: 'op_2', texto: 'Le pasamos encima un color <b>opaco</b>…', mostrar: ['c1'], apuntar: [36, 50], resaltar: 'c1' },
        { audio: 'op_3', texto: '¡La estrella <b>ya no se ve</b>! Lo opaco <b>tapa</b> lo de abajo.', mostrar: ['c2'], apuntar: [62, 48], resaltar: 'c2' },
        { audio: 'op_4', texto: 'Témpera y crayón apretando fuerte: <b>colores firmes y fuertes</b>.', mostrar: ['c3'], apuntar: [82, 86] }
      ]
    },

    /* 4 — Que tu animal se destaque */
    {
      tipo: 'narracion', titulo: '🌙 Que tu animal se destaque',
      escena: {
        w: 400, h: 300,
        capas: [
          { id: 'fc', tipo: 'grupo', capas: [{ tipo: 'rect', fill: '#fff3c4' }] },
          { id: 'fo', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', fill: COL.azulOsc }] },
          { id: 'cs', tipo: 'grupo', capas: [bicho(200, 150, 270, VIVOS)] },
          { id: 'pal', tipo: 'grupo', capas: [
            { tipo: 'rect', x: 10, y: 10, w: 130, h: 34, rx: 17, fill: '#ffffff', stroke: '#eadcc6' },
            { tipo: 'figura', forma: 'circulo', cx: 32, cy: 27, size: 24, fill: VIVOS[0], sinDetalles: true }, { tipo: 'figura', forma: 'circulo', cx: 62, cy: 27, size: 24, fill: VIVOS[1], sinDetalles: true },
            { tipo: 'figura', forma: 'circulo', cx: 92, cy: 27, size: 24, fill: VIVOS[2], sinDetalles: true }, { tipo: 'figura', forma: 'circulo', cx: 122, cy: 27, size: 24, fill: VIVOS[3], sinDetalles: true }] },
          { id: 'en', tipo: 'grupo', oculto: true, capas: [{ tipo: 'rect', x: 290, y: 200, w: 100, h: 90, rx: 10, fill: '#ffffff' }, { tipo: 'img', src: 'img/tx_envoltorio.jpg', x: 295, y: 205, w: 90, h: 80 }] }
        ]
      },
      pasos: [
        { audio: 'de_1', texto: '<b>Cuatro colores vivos</b> para el cuerpo.', apuntar: [20, 10], resaltar: 'pal' },
        { audio: 'de_2', texto: 'Fondo <b>oscuro</b>: azul, violeta, verde o marrón. ¡<b>Negro no</b>!', ocultar: ['fc'], mostrar: ['fo'], apuntar: [85, 15] },
        { audio: 'de_3', texto: 'Sobre lo oscuro, los colores vivos <b>se destacan</b>. ✨', apuntar: [50, 45], resaltar: 'cs' },
        { audio: 'de_4', texto: 'Recortes de <b>envoltorio</b>: manchas, escamas o plumas que brillan.', mostrar: ['en'], apuntar: [84, 70], resaltar: 'en' }
      ]
    },

    /* 5 — ¿Qué fondo lo hace destacar? */
    {
      tipo: 'elegir', titulo: '🏆 ¿Dónde se destaca más?', instr: 'qf_instr', err: 'qf_err',
      rondas: [
        { texto: '¿Con qué fondo se <b>destaca</b> más?', audio: 'qf_1', ok: 'qf_1ok', correcta: 'o',
          opciones: [{ id: 'o', escena: conFondo(COL.azulOsc, VIVOS) }, { id: 'a', escena: conFondo('#ffd95a', VIVOS) }, { id: 'b', escena: conFondo('#ffb38a', VIVOS) }] },
        { texto: '¿Y este animal?', audio: 'qf_2', ok: 'qf_2ok', correcta: 'o',
          opciones: [{ id: 'a', escena: conFondo('#ff8d8d', VIVOS2) }, { id: 'o', escena: conFondo(COL.violetaOsc, VIVOS2) }, { id: 'b', escena: conFondo('#c9f0a8', VIVOS2) }] },
        { texto: 'Último: ¿dónde se ve <b>primero</b>?', audio: 'qf_3', ok: 'qf_3ok', correcta: 'o',
          opciones: [{ id: 'a', escena: conFondo('#a9e4f7', [COL.rosa, COL.celeste, COL.amarillo, COL.naranja]) }, { id: 'b', escena: conFondo('#ffc4dd', [COL.rosa, COL.celeste, COL.amarillo, COL.naranja]) }, { id: 'o', escena: conFondo(COL.verdeOsc, [COL.rosa, COL.celeste, COL.amarillo, COL.naranja]) }] }
      ]
    },

    /* 6 — ¿Opaco o deja ver? */
    {
      tipo: 'clasificarUno', titulo: '👀 ¿Opaco o deja ver?', instr: 'ov_instr', err: 'ov_err',
      texto: '¿Tapa lo de atrás o deja ver?',
      categorias: [{ id: 'o', label: '🧱 Opaco', sub: 'tapa, no deja ver' }, { id: 't', label: '🪟 Deja ver', sub: 'se ve a través' }],
      items: [
        emo('🪵', 'madera', { id: 'madera', cat: 'o', audio: 'm_madera', ok: 'ov_madera' }),
        emo('📦', 'cartón', { id: 'carton', cat: 'o', audio: 'm_carton', ok: 'ov_carton' }),
        emo('🧱', 'ladrillo', { id: 'ladrillo', cat: 'o', audio: 'm_ladrillo', ok: 'ov_ladrillo' }),
        emo('📕', 'libro', { id: 'libro', cat: 'o', audio: 'm_libro', ok: 'ov_libro' }),
        emo('🪟', 'vidrio de ventana', { id: 'vidrio', cat: 't', audio: 'm_vidrio', ok: 'ov_vidrio' }),
        emo('💧', 'agua limpia', { id: 'agua', cat: 't', audio: 'm_agua', ok: 'ov_agua' }),
        emo('👓', 'anteojos', { id: 'lente', cat: 't', audio: 'm_lente', ok: 'ov_lente' }),
        emo('🫙', 'frasco de vidrio', { id: 'frasco', cat: 't', audio: 'm_frasco', ok: 'ov_frasco' })
      ]
    },

    /* 7 — Taller */
    {
      tipo: 'taller', titulo: '🐉 Mi animal fantástico', instr: 'ta_instr',
      herramientas: ['sello', 'lapiz', 'balde', 'mancha', 'punto', 'goma'],
      sellos: ['ovalo', 'circulo', 'ala', 'cola', 'pata', 'ojo', 'triangulo', 'gota'],
      grupos: [{ t: 'cuerpo', c: ['rojo', 'naranja', 'amarillo', 'verdeClaro', 'celeste', 'rosa', 'violeta', 'blanco'] }, { t: 'fondo oscuro', c: ['azulOsc', 'violetaOsc', 'verdeOsc', 'bordo', 'marronOsc'] }],
      colores: ['naranja', 'rojo', 'amarillo', 'verdeClaro', 'celeste', 'rosa', 'violeta', 'blanco', 'azulOsc', 'violetaOsc', 'verdeOsc', 'bordo', 'marronOsc'],
      texturas: [{ id: 'envoltorio', img: 'img/tx_envoltorio.jpg', n: 'envoltorio brillante', audio: 'n_envoltorio' }],
      nombre: { label: 'Se llama', placeholder: 'nombre de tu animal', audio: 'nm_foco' },
      archivo: 'mi-animal-fantastico.png'
    },

    /* 8 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>1.</b> Imaginá un animal que no exista: alas, cuatro ojos, patas largas, una cola enorme… 🐉' },
        { audio: 'pp_2', texto: '<b>2.</b> Dibujalo <b>bien grande</b>, que ocupe gran parte de la hoja.' },
        { audio: 'pp_3', texto: '<b>3.</b> Elegí <b>cuatro colores</b> para cubrir su cuerpo.' },
        { audio: 'pp_4', texto: '<b>4.</b> Pintá el fondo con colores <b>oscuros</b>… ¡que no sea negro!' },
        { audio: 'pp_5', texto: '<b>5.</b> Pegá recortes de <b>envoltorio</b>: manchas, escamas o plumas. ✨' },
        { audio: 'pp_6', texto: '<b>6.</b> Inventá un <b>nombre</b> y pensá <b>dónde vive</b>.' },
        { audio: 'pp_7', texto: '🧰 <b>Materiales:</b> hoja o cartón, colores, fibras, crayones o témperas, papeles de envoltorio.' }
      ]
    },

    /* 9 — Foto */
    { tipo: 'foto', titulo: '📷 Mi animal en papel', instr: 'fo_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tu animal, o <b>🖼️ Elegir de la galería</b> para buscar el que guardaste en el taller.', boton: 'fo_boton', ok: 'fo_ok', img: 'img/foto.jpg',
      archivo: 'mi-animal-fantastico-en-papel.jpg' },

    /* 10 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '🪞 Miro mi animal', instr: 'ae_instr', fin: 'ae_fin',
      mini: conFondo(COL.violetaOsc, VIVOS),
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Es <b>inventado</b>, con partes fantásticas?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Ocupa <b>gran parte</b> de la hoja?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Usé <b>cuatro colores</b> en su cuerpo?' },
        { audio: 'ae_4', si: 'ae_4si', no: 'ae_4no', texto: '¿El fondo es <b>oscuro</b>, sin negro?' },
        { audio: 'ae_5', si: 'ae_5si', no: 'ae_5no', texto: '¿Agregué papeles de <b>envoltorio</b>?' }
      ]
    },

    /* 11 — Familia */
    {
      tipo: 'pasos', titulo: '🏡 Para compartir en familia', img: 'img/familia.jpg',
      pasos: [
        { audio: 'fa_1', texto: 'Presentá tu animal: <b>¿cómo se llama y dónde vive?</b>' },
        { audio: 'fa_2', texto: '<b>¿Qué colores elegiste para su cuerpo?</b>' },
        { audio: 'fa_3', texto: '<b>¿Cómo hiciste para que se destaque del fondo?</b>' },
        { audio: 'fa_4', texto: '📁 Guardá tu trabajo en la carpeta de <b>Artes Visuales</b>.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
