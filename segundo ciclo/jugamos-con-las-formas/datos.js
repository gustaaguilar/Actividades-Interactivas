/* ============================================================
   JUGAMOS CON LAS FORMAS — Artes Visuales · 5.º grado
   Simetría y asimetría
   Basado en la Ficha Viajera N.º 2 de Artes Visuales · 5.º grado
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */

const COL = {
  negro: '#1b1b1b', rojo: '#e63946', naranja: '#fb8500', amarillo: '#ffb703', verde: '#2a9d8f', verdeClaro: '#90be6d',
  celeste: '#8ecae6', azul: '#3a86ff', violeta: '#8338ec', rosa: '#ff70a6', marron: '#8d5524', blanco: '#ffffff'
};
const PALETAS = { mixta: ['#e63946', '#ffb703', '#2a9d8f', '#457b9d', '#8338ec', '#fb8500', '#06d6a0', '#ff006e', '#3a86ff'] };
const VIVOS = [COL.rojo, COL.naranja, COL.amarillo, COL.verde, COL.azul, COL.violeta, COL.rosa];
const FORMAS_C = ['circulo', 'cuadrado', 'triangulo', 'hoja', 'estrella', 'gota', 'rombo'];
const txt = (x, y, t, size, color) => ({ tipo: 'texto', x, y, t, size: size || 16, fill: color || '#2b2118' });
function azar(seed) { let a = seed >>> 0 || 1; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const F = (forma, cx, cy, size, fill, rot, flip) => ({ tipo: 'forma', forma, cx, cy, size, fill, stroke: '#2b2118', sw: 3, rot, flip });
const eje = (w, h) => ({ tipo: 'path', d: `M${w / 2} 6L${w / 2} ${h - 6}`, stroke: '#b8b0a4', sw: 3 });
/* composición simétrica: formas a la izquierda + su reflejo exacto a la derecha */
function simetrica(seed, w, h, n, conEje) {
  const r = azar(seed), capas = [{ tipo: 'rect', fill: '#fffdf5' }];
  if (conEje) capas.push(eje(w, h));
  for (let k = 0; k < n; k++) {
    const forma = FORMAS_C[Math.floor(r() * FORMAS_C.length)], s = 34 + r() * 46, x = 20 + s / 2 + r() * (w / 2 - s - 26), y = 14 + s / 2 + r() * (h - s - 28);
    const fill = VIVOS[Math.floor(r() * VIVOS.length)], rot = Math.round((r() - 0.5) * 60);
    capas.push(F(forma, x, y, s, fill, rot), F(forma, w - x, y, s, fill, rot, true));
  }
  if (r() > 0.4) { const s = 40 + r() * 30; capas.push(F('circulo', w / 2, 30 + r() * (h - 60), s, VIVOS[Math.floor(r() * VIVOS.length)])); }
  return { w, h, capas };
}
/* composición asimétrica: tamaños grandes y chicos, ubicaciones distintas, espacios vacíos */
function asimetrica(seed, w, h, n) {
  const r = azar(seed), capas = [{ tipo: 'rect', fill: '#fffdf5' }];
  const lado = r() > 0.5 ? 1 : 0;
  capas.push(F(FORMAS_C[Math.floor(r() * 4)], lado ? w * 0.68 : w * 0.32, h * (0.35 + r() * 0.3), 90 + r() * 30, VIVOS[Math.floor(r() * VIVOS.length)], Math.round(r() * 40)));
  for (let k = 0; k < n; k++) {
    const s = 18 + r() * 34, x = (lado ? 0.08 : 0.55) * w + r() * w * 0.37, y = 18 + r() * (h - 36);
    capas.push(F(FORMAS_C[Math.floor(r() * FORMAS_C.length)], x, y, s, VIVOS[Math.floor(r() * VIVOS.length)], Math.round((r() - 0.5) * 90)));
  }
  return { w, h, capas };
}
/* media composición (izquierda) y opciones para completarla */
function mitad(seed) {
  const r = azar(seed), piezas = [];
  for (let k = 0; k < 3; k++) {
    const forma = ['hoja', 'triangulo', 'gota', 'estrella', 'cuadrado'][Math.floor(r() * 5)], s = 40 + r() * 30;
    piezas.push({ forma, x: 30 + s / 2 + r() * (110 - s), y: 25 + s / 2 + r() * (170 - s), s, fill: VIVOS[Math.floor(r() * VIVOS.length)], rot: Math.round(15 + r() * 50) });
  }
  return piezas;
}
const base = (extra) => ({ w: 300, h: 225, capas: [{ tipo: 'rect', fill: '#fffdf5' }, eje(300, 225), ...(extra || [])] });
const izq = p => p.map(q => F(q.forma, q.x, q.y, q.s, q.fill, q.rot));
const reflejo = p => p.map(q => F(q.forma, 300 - q.x, q.y, q.s, q.fill, q.rot, true));
const copia = p => p.map(q => F(q.forma, q.x + 150, q.y, q.s, q.fill, q.rot));
const otra = (p, seed) => { const r = azar(seed); return p.map(q => F(q.forma, 300 - q.x + (r() - 0.5) * 50, q.y + (r() - 0.5) * 70, q.s * (0.6 + r() * 0.7), VIVOS[Math.floor(r() * VIVOS.length)], q.rot + 40, true)); };
const M1 = mitad(13), M2 = mitad(15), M3 = mitad(52);

window.DATOS = {
  meta: {
    titulo: 'Jugamos con las formas',
    subtitulo: 'Simetría y asimetría',
    area: '🎨 Artes Visuales · 5.º grado',
    grado: 'Artes Visuales · 5.º grado',
    fuente: 'Basado en la Ficha Viajera N.º 2 de Artes Visuales · 5.º grado',
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
    portada: '¡Hola! Bienvenidos a Jugamos con las formas. Vamos a descubrir cómo organizar las formas en una imagen: con simetría, para lograr equilibrio, y con asimetría, para generar movimiento o tensión. Tocá Comenzar.',

    /* 1 — simetría */
    si_1: 'Imaginá una línea vertical en el centro de la hoja. Se llama eje.',
    si_2: 'De un lado dibujamos algunas formas sencillas.',
    si_3: 'Del otro lado las repetimos, como si el eje fuera un espejo.',
    si_4: 'Eso es simetría: los elementos se organizan de manera semejante a ambos lados del eje. La imagen se ve equilibrada.',

    /* 2 — asimetría */
    as_1: 'En una composición asimétrica, los dos lados no son iguales.',
    as_2: 'Combinamos tamaños grandes y pequeños.',
    as_3: 'Colocamos las formas en lugares distintos y dejamos espacios vacíos.',
    as_4: 'Así la imagen parece tener movimiento o tensión.',

    /* 3 — clasificar */
    cl_instr: 'Mirá cada composición. ¿Es simétrica, igual a los dos lados, o asimétrica? Tocá la respuesta.',
    cl_err: 'Mirá otra vez. Imaginá el eje en el centro: ¿un lado es el reflejo del otro?',
    cl_s: '¡Sí! Es simétrica: un lado es el reflejo del otro.',
    cl_a: '¡Muy bien! Es asimétrica: los dos lados son diferentes.',

    /* 4 — sensación */
    se_instr: 'Mirá la composición. ¿Qué sensación transmite más? Tocá la respuesta.',
    se_err: 'Mirá otra vez cómo están organizadas las formas.',
    se_1: '¿Qué transmite esta composición?',
    se_1ok: '¡Muy bien! La simetría transmite equilibrio y calma.',
    se_2: '¿Y esta?',
    se_2ok: '¡Excelente! La asimetría, con tamaños distintos y espacios vacíos, transmite movimiento y tensión.',
    se_3: 'Última. ¿Qué transmite?',
    se_3ok: '¡Correcto! Al ser simétrica, se ve ordenada y equilibrada.',

    /* 5 — completar el espejo */
    ce_instr: 'Mirá la mitad izquierda. ¿Cuál de las opciones la completa con simetría, como un espejo? Tocá la imagen.',
    ce_err: 'Mirá bien: en un espejo, las formas quedan a la misma distancia del eje, pero dadas vuelta.',
    ce_1: '¿Cuál completa el espejo?',
    ce_1ok: '¡Muy bien! Cada forma quedó reflejada, a la misma distancia del eje.',
    ce_2: '¿Y ahora?',
    ce_2ok: '¡Excelente! Ese es el reflejo exacto.',
    ce_3: 'Última. ¿Cuál es el reflejo?',
    ce_3ok: '¡Correcto! Las formas se ven dadas vuelta, como en un espejo.',

    /* 6 — taller */
    ta_instr: '¡Creá tus composiciones! El espejo está encendido: todo lo que hagas de un lado aparece reflejado del otro. Así vas a lograr una composición simétrica. Guardala, y después tocá el botón Espejo para apagarlo y crear una composición asimétrica.',
    t_sello: 'Formas. Elegí una y tocá el cuadro.',
    t_lapiz: 'Lápiz.',
    t_mancha: 'Manchas.',
    t_punto: 'Puntos.',
    t_balde: 'Balde. Tocá adentro de una forma para pintarla.',
    t_goma: 'Goma.', t_deshacer: 'Deshacer.', t_borrar: 'Borrar todo.',
    t_espejo: 'Espejo encendido: lo que dibujes se refleja del otro lado.',
    t_espejo_no: 'Espejo apagado: ahora cada lado puede ser distinto.',
    tam_1: 'Chico.', tam_2: 'Mediano.', tam_3: 'Grande.',
    p_guardar: '¡Tu composición quedó guardada!',

    /* 7 — en papel */
    pp_1: 'Ahora en papel. Paso uno, simetría: dividí la hoja en dos partes trazando una línea vertical suave en el centro.',
    pp_2: 'En un lado dibujá algunas formas sencillas: círculos, cuadrados, triángulos, hojas o estrellas.',
    pp_3: 'Intentá repetirlas del otro lado, como si la línea del centro fuera un espejo. Después completá y coloreá.',
    pp_4: 'Paso dos, asimetría: en una hoja nueva, colocá las formas en diferentes lugares, combiná tamaños grandes y pequeños, dejá espacios vacíos y evitá que los dos lados sean iguales.',
    pp_5: 'Necesitás una hoja de la carpeta, lápiz, goma, y lápices de colores, fibras o crayones si tenés.',

    /* 8 — foto */
    ft_instr: 'Cuando termines tus composiciones en papel, pulsá el botón Sacar foto para fotografiarlas. O también podés elegir la que guardaste en el taller, pulsando el botón Elegir de la galería.',
    ft_boton: 'Sacar una foto.',
    ft_ok: '¡Muy buena composición! Tocá Guardar para tenerla en tu celular.',

    /* 9 — autoevaluación */
    ae_instr: 'Observá tus composiciones y respondé. Tocá Sí o Todavía no.',
    ae_1: '¿Hice una composición simétrica, con un lado reflejado del otro?',
    ae_1si: '¡Muy bien! Lograste equilibrio.',
    ae_1no: 'Probá con la línea del centro como espejo.',
    ae_2: '¿Hice otra composición asimétrica?',
    ae_2si: '¡Genial! Cada lado es diferente.',
    ae_2no: 'Probá ubicar las formas en lugares distintos.',
    ae_3: '¿En la asimétrica combiné tamaños grandes y pequeños, y dejé espacios vacíos?',
    ae_3si: '¡Excelente! Así se genera movimiento o tensión.',
    ae_3no: 'Agregá alguna forma grande y otras chiquitas.',
    ae_fin: 'Gracias por observar tus composiciones con atención. Mirar lo que hicimos también es parte del arte.',

    /* 10 — pensar como artista */
    pa_1: 'Mirá tus dos composiciones y respondé en tu carpeta: ¿cuál es simétrica y cuál es asimétrica?',
    pa_2: '¿Cuál parece más equilibrada? ¿Cuál parece tener más movimiento o tensión?',
    pa_3: 'Elegí una de las dos y completá: mi composición es simétrica o asimétrica. Elegí esta organización porque… Quise transmitir o expresar…',
    pa_4: 'Recordá: simetría es cuando los elementos se organizan de manera semejante a ambos lados de un eje. Asimetría es cuando se organizan de manera diferente.',
    pa_5: 'Guardá tu producción en la carpeta para presentarla al regresar a la escuela.',

    cierre: '¡Terminaste! Aprendiste que la forma en que organizamos las imágenes transmite sensaciones: la simetría da equilibrio, y la asimetría, movimiento o tensión. ¡Felicitaciones, artista!'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Simetría */
    {
      tipo: 'narracion', titulo: '🦋 La simetría',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'e', tipo: 'grupo', capas: [{ tipo: 'path', d: 'M200 10L200 290', stroke: '#8a7f70', sw: 4 }] },
          { id: 'i', tipo: 'grupo', oculto: true, capas: [F('hoja', 130, 90, 100, COL.verde, 35), F('circulo', 150, 210, 60, COL.rojo), F('estrella', 70, 200, 60, COL.amarillo, 10), F('triangulo', 60, 70, 50, COL.azul, -20)] },
          { id: 'd', tipo: 'grupo', oculto: true, capas: [F('hoja', 270, 90, 100, COL.verde, 35, true), F('circulo', 250, 210, 60, COL.rojo, 0, true), F('estrella', 330, 200, 60, COL.amarillo, 10, true), F('triangulo', 340, 70, 50, COL.azul, -20, true)] }
        ]
      },
      pasos: [
        { audio: 'si_1', texto: 'Una línea vertical en el centro: el <b>eje</b>.', apuntar: [50, 50], resaltar: 'e' },
        { audio: 'si_2', texto: 'De un lado, <b>formas sencillas</b>.', mostrar: ['i'], apuntar: [28, 40], resaltar: 'i' },
        { audio: 'si_3', texto: 'Del otro, las mismas… ¡como en un <b>espejo</b>! 🪞', mostrar: ['d'], apuntar: [72, 40], resaltar: 'd' },
        { audio: 'si_4', texto: '<b>Simetría</b>: igual a ambos lados del eje → <b>equilibrio</b>. ⚖️' }
      ]
    },

    /* 2 — Asimetría */
    {
      tipo: 'narracion', titulo: '🌀 La asimetría',
      escena: {
        w: 400, h: 300,
        capas: [
          { tipo: 'rect', fill: '#fffdf5' },
          { id: 'g', tipo: 'grupo', capas: [F('circulo', 270, 160, 170, COL.naranja)] },
          { id: 'c', tipo: 'grupo', oculto: true, capas: [F('triangulo', 60, 60, 40, COL.azul, 25), F('cuadrado', 110, 120, 28, COL.violeta, 30), F('gota', 50, 240, 34, COL.verde, -30)] },
          { id: 'v', tipo: 'grupo', oculto: true, capas: [{ tipo: 'path', d: 'M150 210Q170 260 120 280', stroke: '#c9c0b2', sw: 3 }, F('estrella', 160, 40, 26, COL.rosa, 20)] }
        ]
      },
      pasos: [
        { audio: 'as_1', texto: 'En la <b>asimetría</b>, los dos lados <b>no son iguales</b>.' },
        { audio: 'as_2', texto: 'Tamaños <b>grandes</b> y <b>pequeños</b>.', mostrar: ['c'], apuntar: [68, 52], resaltar: 'g' },
        { audio: 'as_3', texto: 'Lugares distintos y <b>espacios vacíos</b>.', mostrar: ['v'], apuntar: [22, 40], resaltar: 'c' },
        { audio: 'as_4', texto: 'La imagen transmite <b>movimiento</b> o <b>tensión</b>. ⚡' }
      ]
    },

    /* 3 — ¿Simétrica o asimétrica? */
    {
      tipo: 'clasificarUno', titulo: '🔍 ¿Simétrica o asimétrica?', instr: 'cl_instr', err: 'cl_err',
      texto: '¿Es <b>simétrica</b> o <b>asimétrica</b>?',
      categorias: [{ id: 's', label: '🦋 Simétrica', sub: 'igual a ambos lados' }, { id: 'a', label: '🌀 Asimétrica', sub: 'lados diferentes' }],
      items: [
        { id: 1, cat: 's', ok: 'cl_s', escena: simetrica(3, 300, 225, 3) },
        { id: 2, cat: 'a', ok: 'cl_a', escena: asimetrica(4, 300, 225, 4) },
        { id: 3, cat: 's', ok: 'cl_s', escena: simetrica(11, 300, 225, 4) },
        { id: 4, cat: 'a', ok: 'cl_a', escena: asimetrica(12, 300, 225, 3) },
        { id: 5, cat: 's', ok: 'cl_s', escena: simetrica(23, 300, 225, 2) },
        { id: 6, cat: 'a', ok: 'cl_a', escena: asimetrica(26, 300, 225, 5) },
        { id: 7, cat: 's', ok: 'cl_s', escena: simetrica(37, 300, 225, 3) },
        { id: 8, cat: 'a', ok: 'cl_a', escena: asimetrica(41, 300, 225, 4) }
      ]
    },

    /* 4 — ¿Qué sensación transmite? */
    {
      tipo: 'elegir', titulo: '💭 ¿Qué transmite?', instr: 'se_instr', err: 'se_err',
      rondas: [
        { texto: '¿Qué transmite más?', audio: 'se_1', ok: 'se_1ok', visual: { escena: simetrica(51, 300, 225, 3) }, correcta: 'e', fijo: true,
          opciones: [{ id: 'e', label: '⚖️ Equilibrio y calma' }, { id: 'm', label: '⚡ Movimiento y tensión' }] },
        { texto: '¿Qué transmite más?', audio: 'se_2', ok: 'se_2ok', visual: { escena: asimetrica(52, 300, 225, 4) }, correcta: 'm', fijo: true,
          opciones: [{ id: 'e', label: '⚖️ Equilibrio y calma' }, { id: 'm', label: '⚡ Movimiento y tensión' }] },
        { texto: '¿Qué transmite más?', audio: 'se_3', ok: 'se_3ok', visual: { escena: simetrica(63, 300, 225, 4) }, correcta: 'e', fijo: true,
          opciones: [{ id: 'e', label: '⚖️ Equilibrio y calma' }, { id: 'm', label: '⚡ Movimiento y tensión' }] }
      ]
    },

    /* 5 — Completá el espejo */
    {
      tipo: 'elegir', titulo: '🪞 Completá el espejo', instr: 'ce_instr', err: 'ce_err',
      rondas: [
        { texto: '¿Cuál completa el <b>espejo</b>?', audio: 'ce_1', ok: 'ce_1ok', visual: { escena: base(izq(M1)) }, revela: { escena: base([...izq(M1), ...reflejo(M1)]) }, correcta: 'r',
          opciones: [{ id: 'r', escena: base([...izq(M1), ...reflejo(M1)]) }, { id: 'c', escena: base([...izq(M1), ...copia(M1)]) }, { id: 'o', escena: base([...izq(M1), ...otra(M1, 3)]) }] },
        { texto: '¿Cuál completa el <b>espejo</b>?', audio: 'ce_2', ok: 'ce_2ok', visual: { escena: base(izq(M2)) }, revela: { escena: base([...izq(M2), ...reflejo(M2)]) }, correcta: 'r',
          opciones: [{ id: 'c', escena: base([...izq(M2), ...copia(M2)]) }, { id: 'r', escena: base([...izq(M2), ...reflejo(M2)]) }, { id: 'o', escena: base([...izq(M2), ...otra(M2, 7)]) }] },
        { texto: '¿Cuál es el <b>reflejo</b>?', audio: 'ce_3', ok: 'ce_3ok', visual: { escena: base(izq(M3)) }, revela: { escena: base([...izq(M3), ...reflejo(M3)]) }, correcta: 'r',
          opciones: [{ id: 'o', escena: base([...izq(M3), ...otra(M3, 9)]) }, { id: 'c', escena: base([...izq(M3), ...copia(M3)]) }, { id: 'r', escena: base([...izq(M3), ...reflejo(M3)]) }] }
      ]
    },

    /* 6 — Taller con espejo */
    {
      tipo: 'taller', titulo: '🪞 Mis composiciones', instr: 'ta_instr',
      plantilla: 'eje', espejo: 'activo',
      herramientas: ['sello', 'mancha', 'punto', 'lapiz', 'balde', 'goma'],
      sellos: ['circulo', 'cuadrado', 'triangulo', 'hoja', 'estrella', 'gota', 'rombo', 'corazon'],
      colores: ['negro', 'rojo', 'naranja', 'amarillo', 'verdeClaro', 'verde', 'celeste', 'azul', 'violeta', 'rosa', 'marron'],
      archivo: 'mi-composicion.png'
    },

    /* 7 — En papel */
    {
      tipo: 'pasos', titulo: '✏️ Ahora, en papel', img: 'img/materiales.jpg',
      pasos: [
        { audio: 'pp_1', texto: '<b>Paso 1 · Simetría.</b> Trazá una línea vertical suave en el centro.' },
        { audio: 'pp_2', texto: 'De un lado, formas sencillas: ⚪ 🟦 🔺 🍃 ⭐' },
        { audio: 'pp_3', texto: 'Repetilas del otro lado, como en un <b>espejo</b>. Completá y coloreá.' },
        { audio: 'pp_4', texto: '<b>Paso 2 · Asimetría.</b> Hoja nueva: lugares distintos, tamaños grandes y pequeños, espacios vacíos.' },
        { audio: 'pp_5', texto: '🧰 <b>Materiales:</b> hoja de la carpeta, lápiz, goma, y colores, fibras o crayones.' }
      ]
    },

    /* 8 — Foto */
    { tipo: 'foto', titulo: '📷 Mis composiciones en papel', instr: 'ft_instr',
      texto: 'Pulsá <b>📷 Sacar foto</b> para fotografiar tus composiciones, o <b>🖼️ Elegir de la galería</b> para buscar la que guardaste en el taller.', boton: 'ft_boton', ok: 'ft_ok', img: 'img/foto.jpg',
      archivo: 'mis-composiciones.jpg' },

    /* 9 — Autoevaluación */
    {
      tipo: 'autoeval', titulo: '👀 Observá y respondé', instr: 'ae_instr', fin: 'ae_fin',
      mini: simetrica(71, 300, 225, 4, true),
      items: [
        { audio: 'ae_1', si: 'ae_1si', no: 'ae_1no', texto: '¿Hice una composición <b>simétrica</b>?' },
        { audio: 'ae_2', si: 'ae_2si', no: 'ae_2no', texto: '¿Hice otra <b>asimétrica</b>?' },
        { audio: 'ae_3', si: 'ae_3si', no: 'ae_3no', texto: '¿Combiné <b>tamaños</b> y dejé <b>espacios vacíos</b>?' }
      ]
    },

    /* 10 — Pensar como artista */
    {
      tipo: 'pasos', titulo: '🎨 Para pensar como artista', img: 'img/familia.jpg',
      pasos: [
        { audio: 'pa_1', texto: '📝 ¿Cuál es <b>simétrica</b>? ¿Cuál es <b>asimétrica</b>?' },
        { audio: 'pa_2', texto: '📝 ¿Cuál parece más <b>equilibrada</b>? ¿Cuál tiene más <b>movimiento o tensión</b>?' },
        { audio: 'pa_3', texto: '📝 Mi composición es ☐ simétrica ☐ asimétrica. La elegí porque… Quise transmitir…' },
        { audio: 'pa_4', texto: '💡 <b>Simetría</b>: semejante a ambos lados del eje. <b>Asimetría</b>: organizada de manera diferente.' },
        { audio: 'pa_5', texto: '📌 Guardá tu producción en la carpeta.' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
