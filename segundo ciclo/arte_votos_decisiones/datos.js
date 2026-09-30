/* ============================================================
   ARTE, VOTOS Y DECISIONES — Matemática · 5.º grado
   Basado en "Aventureros de la Matemática 5" (PEAMM · DGE Mendoza)
   Número y Operaciones | Estadística y Probabilidad — págs. 18 a 22
   QueSepanTodos.com · Profe Gustavo Aguilar
   CONVENCIÓN: en cada lista de "opciones", la PRIMERA es la correcta
   (el motor las baraja en cada carga).
   ============================================================ */

window.DATOS = {
  meta: {
    titulo: 'Arte, votos y decisiones',
    subtitulo: 'Porcentajes, decimales y gráficos',
    area: '🔢 Matemática · 5.º grado',
    fuente: 'Basado en "Aventureros de la Matemática 5" · PEAMM · DGE Mendoza',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar',
    mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg',
    fotoMini: 'profe_mini.jpg',
    frase: 'Menos prisa, más vida 🧉🫂',
    puntosPorAcierto: 10,
    revision: false  // true = flechas ‹ › de revisión visibles
  },

  /* ---------- Gráficos (se dibujan por código) ---------- */
  graficos: {
    encuesta: {
      titulo: 'Votos por categoría artística',
      tituloRel: 'Frecuencia relativa de los votos',
      max: 50, paso: 10, total: 100,
      cats: [
        { id: 'musica', nombre: 'Música', emoji: '🎵', color: '#8338ec', val: 40 },
        { id: 'pintura', nombre: 'Pintura', emoji: '🎨', color: '#fb8500', val: 25 },
        { id: 'teatro', nombre: 'Teatro', emoji: '🎭', color: '#e63946', val: 10 },
        { id: 'danza', nombre: 'Danza', emoji: '💃', color: '#2a9d8f', val: 25 }
      ]
    },
    generos1: {
      titulo: 'Géneros musicales (grupo 1)', max: 60, paso: 5,
      series: [{ id: 'chicos', nombre: 'Chicos', color: '#1f4fbf' }, { id: 'chicas', nombre: 'Chicas', color: '#d62828' }],
      cats: [
        { id: 'rap', nombre: 'Rap', val: { chicos: 25, chicas: 15 } },
        { id: 'regueton', nombre: 'Reguetón', val: { chicos: 35, chicas: 45 } },
        { id: 'trap', nombre: 'Trap', val: { chicos: 55, chicas: 50 } },
        { id: 'pop', nombre: 'Pop', val: { chicos: 15, chicas: 35 } }
      ]
    },
    generos2: {
      titulo: 'Géneros musicales (grupo 2)', max: 40, paso: 5,
      series: [{ id: 'chicos', nombre: 'Chicos', color: '#139a5b' }, { id: 'chicas', nombre: 'Chicas', color: '#f77f00' }],
      cats: [
        { id: 'rap', nombre: 'Rap', val: { chicos: 10, chicas: 20 } },
        { id: 'regueton', nombre: 'Reguetón', val: { chicos: 30, chicas: 30 } },
        { id: 'trap', nombre: 'Trap', val: { chicos: 30, chicas: 25 } },
        { id: 'pop', nombre: 'Pop', val: { chicos: 20, chicas: 35 } }
      ]
    }
  },

  /* ---------- Latas de pintura ---------- */
  latas: [
    { id: 'rojo', nombre: 'Roja', litros: 1, color: '#e63946' },
    { id: 'amarillo', nombre: 'Amarilla', litros: 0.75, color: '#ffcc00' },
    { id: 'violeta', nombre: 'Violeta', litros: 2, color: '#8338ec' },
    { id: 'azul', nombre: 'Azul', litros: 2.25, color: '#1f6fe0' },
    { id: 'verde', nombre: 'Verde', litros: 0.25, color: '#2a9d8f' },
    { id: 'marron', nombre: 'Marrón', litros: 1.5, color: '#8b5a2b' }
  ],

  /* ---------- TEXTOS DE AUDIO (clave → texto) ----------
     El script de Colab lee este bloque y genera audio/<clave>.mp3 */
  audios: {
    portada: '¡Hola! En la escuela se viene la fiesta de fin de año y hay que decidir qué espectáculos ofrecer. Para eso, los chicos hicieron una encuesta. Vamos a trabajar con votos, porcentajes, números con coma y gráficos. Tocá Comenzar.',

    /* 1 — Narración: la encuesta */
    en_1: 'Para elegir los espectáculos de la fiesta, los chicos preguntaron en toda la escuela: ¿qué tipo de arte te gusta más?',
    en_2: 'Música obtuvo cuarenta votos. Es la barra más alta del gráfico.',
    en_3: 'Pintura y Danza obtuvieron veinticinco votos cada una. Por eso sus barras tienen la misma altura.',
    en_4: 'Teatro obtuvo diez votos. Es la barra más baja.',
    en_5: 'Si sumamos todos los votos: cuarenta, más veinticinco, más diez, más veinticinco, da cien votos en total.',

    /* 2 — La mitad de los votos */
    mi_instr: 'Mirá el gráfico de la encuesta y respondé. Tocá la respuesta correcta.',
    mi_1: '¿Cuántos votos hay en total?',
    mi_1_ok: '¡Sí! Cuarenta más veinticinco más diez más veinticinco da cien votos.',
    mi_2: '¿Cuál es la mitad del total de votos?',
    mi_2_ok: '¡Correcto! La mitad de cien es cincuenta, porque cincuenta más cincuenta es cien.',
    mi_3: '¿Alguna opción reunió al menos la mitad de los votos?',
    mi_3_ok: '¡Exacto! Ninguna llegó. Música es la que más votos tiene, pero cuarenta es menos que cincuenta: no alcanza la mitad.',
    err_graf: 'Esa no es. Mirá otra vez el gráfico y pensalo de nuevo.',

    /* 3 — Sumar: un show de dos artes */
    sh_r1: 'Los chicos quieren armar un show que combine dos disciplinas artísticas y que reúna la mitad de los votos, o sea cincuenta. Tocá dos disciplinas y después presioná Verificar.',
    sh_r2: '¡Hay otra combinación que también reúne cincuenta votos! Buscala, y presioná Verificar.',
    sh_pd: '¡Muy bien! Pintura y Danza: veinticinco más veinticinco es cincuenta. ¡La mitad de los votos!',
    sh_mt: '¡Muy bien! Música y Teatro: cuarenta más diez es cincuenta. ¡La mitad de los votos!',
    sh_cant: 'Tenés que elegir exactamente dos disciplinas. Tocá una del show para sacarla.',
    sh_mas: 'Esa combinación suma más de cincuenta votos. Probá con otra.',
    sh_menos: 'Esa combinación no llega a cincuenta votos. Probá con otra.',
    sh_rep: 'Esa combinación ya la encontraste. Buscá la otra.',
    f_musica: 'Música, cuarenta votos.', f_pintura: 'Pintura, veinticinco votos.', f_teatro: 'Teatro, diez votos.', f_danza: 'Danza, veinticinco votos.',

    /* 4 — Narración: de votos a porcentajes */
    pc_1: 'Porcentaje quiere decir: de cada cien. Como votaron cien personas, cada voto es uno de cada cien.',
    pc_2: 'Pintura tuvo veinticinco votos de cien. Eso se puede escribir como fracción: veinticinco centésimos.',
    pc_3: 'Veinticinco centésimos también se escribe con coma: cero coma veinticinco.',
    pc_4: 'Y también es el veinticinco por ciento: veinticinco de cada cien.',
    pc_5: 'Veinticinco es la cuarta parte de cien, porque cuatro veces veinticinco es cien. Por eso, cero coma veinticinco es un cuarto del total de los votos.',
    pc_6: 'Los chicos le pidieron a una inteligencia artificial un gráfico con estos números. Cada número indica qué parte del total de votos obtuvo cada arte. Se llama frecuencia relativa.',

    /* 5 — Verdadero o falso */
    vf_instr: 'Leé o escuchá lo que dice cada uno. Mirá el gráfico y decidí si es verdadero o falso.',
    vf_1: 'Los chicos dicen: si se reúne la mitad de los votos, eso representa el cincuenta por ciento.',
    vf_1_ok: '¡Verdadero! La mitad de cien es cincuenta, y cincuenta de cada cien es el cincuenta por ciento.',
    vf_2: 'Martín dice: cero coma veinticinco, el número arriba de la barra de Pintura, es un cuarto de las personas que votaron por Pintura.',
    vf_2_ok: '¡Es falso! Cero coma veinticinco no es una parte de los que votaron Pintura: es la parte del total de votos que obtuvo Pintura. Veinticinco votos de cien: un cuarto del total.',
    vf_3: 'Juan dice: cero coma veinticinco también se puede escribir como veinticinco por ciento.',
    vf_3_ok: '¡Verdadero! Cero coma veinticinco son veinticinco centésimos: veinticinco de cada cien, o sea el veinticinco por ciento.',
    vf_4: 'Juan dice: cero coma veinticinco más cero coma veinticinco es equivalente a la mitad.',
    vf_4_ok: '¡Verdadero! Cero coma veinticinco más cero coma veinticinco es cero coma cincuenta: cincuenta centésimos, la mitad.',

    /* 6 — Porcentajes del gráfico */
    po_instr: 'Ahora el gráfico muestra la frecuencia relativa. Respondé mirando los números de arriba de cada barra.',
    po_1: 'El número arriba de la barra de Teatro es cero coma diez. ¿Representa más o menos del veinticinco por ciento de los votos?',
    po_1_ok: '¡Bien! Cero coma diez es el diez por ciento: diez de cada cien. Es menos que el veinticinco por ciento.',
    po_2: '¿Qué porcentaje de los votos representan Música y Teatro juntos?',
    po_2_ok: '¡Correcto! Cero coma cuarenta más cero coma diez es cero coma cincuenta: el cincuenta por ciento, la mitad.',
    po_3: '¿Y qué porcentaje representan Música, Teatro y Danza juntos?',
    po_3_ok: '¡Excelente! Cuarenta más diez más veinticinco son setenta y cinco votos de cien: el setenta y cinco por ciento.',
    po_4: 'Si juntamos las cuatro barras, ¿qué porcentaje de los votos representan?',
    po_4_ok: '¡Claro! Todas juntas suman uno, o sea el cien por ciento: todos los votos.',

    /* 7 — Marcar: un cuarto */
    cu_instr: '¿Cuáles de estas expresiones sirven para representar que una categoría obtuvo un cuarto de los votos? Tocá todas las que sirvan y después presioná Verificar.',
    cu_ok: '¡Perfecto! Un cuarto, cero coma veinticinco, veinticinco centésimos y veinticinco por ciento: son cuatro formas de escribir lo mismo.',
    mar_err: 'Todavía no. Revisá: alguna de las que marcaste no sirve, o te faltó marcar alguna.',
    mar_vacio: 'Primero tocá las expresiones que elegís, y después presioná Verificar.',
    ch_50p: 'Cincuenta por ciento.', ch_075: 'Cero coma setenta y cinco.', ch_1_4: 'Un cuarto.', ch_75p: 'Setenta y cinco por ciento.',
    ch_025: 'Cero coma veinticinco.', ch_50_100: 'Cincuenta centésimos.', ch_25_100: 'Veinticinco centésimos.', ch_050: 'Cero coma cincuenta.', ch_25p: 'Veinticinco por ciento.',

    /* 8 — Marcar: la mitad */
    me_instr: 'Ahora buscá las expresiones que representan que una categoría obtuvo la mitad de los votos. Tocá todas las que sirvan y presioná Verificar.',
    me_ok: '¡Genial! Un medio, cero coma cinco, cincuenta centésimos y cincuenta por ciento: todas representan la mitad.',
    ch_05: 'Cero coma cinco.', ch_1_2: 'Un medio.', ch_5p: 'Cinco por ciento.', ch_005: 'Cero coma cero cinco.', ch_1_5: 'Un quinto.',

    /* 9 — Narración: las latas */
    la_1: 'Para promocionar cada arte, los chicos van a pintar carteles para colgar en la escuela. Hay seis latas de pintura distintas.',
    la_2: 'La lata roja tiene un litro, y la violeta, dos litros.',
    la_3: 'La amarilla tiene cero coma setenta y cinco litros: tres cuartos de litro. Es menos de un litro.',
    la_4: 'La verde tiene cero coma veinticinco litros: un cuarto de litro.',
    la_5: 'La marrón tiene uno coma cinco litros: un litro y medio.',
    la_6: 'Y la azul tiene dos coma veinticinco litros: dos litros y un cuarto.',

    /* 10 — ¿Cuánta pintura hay? */
    to_instr: 'Mirá las latas y respondé.',
    to_1: 'Si hay una lata de cada color, ¿cuántos litros de pintura hay en total?',
    to_1_ok: '¡Muy bien! Uno, más cero coma setenta y cinco, más dos, más dos coma veinticinco, más cero coma veinticinco, más uno coma cinco: siete coma setenta y cinco litros.',
    to_2: 'La profesora de artes visuales les entregó dos latas completas de cada una. ¿Con cuántos litros cuentan para pintar?',
    to_2_ok: '¡Exacto! El doble de siete coma setenta y cinco es quince coma cinco litros.',
    err_latas: 'Esa no es. Sumá los enteros con los enteros y los decimales con los decimales.',

    /* 11 — Sumar: cartel de Música (4 litros) */
    mu_r1: 'Para el cartel de Música quieren usar cuatro litros. Tocá las latas que podrían usar, hasta dos de cada color, y presioná Verificar. Si te equivocás, tocá una lata del balde para sacarla.',
    mu_r2: '¡Muy bien! Pero hay muchas formas de juntar cuatro litros. Armá otra combinación distinta y presioná Verificar.',
    mu_ok1: '¡Muy bien! Esas latas suman exactamente cuatro litros.',
    mu_ok2: '¡Genial! Encontraste otra combinación que también suma cuatro litros.',
    la_mas: 'Te pasaste de los litros que buscamos. Sacá alguna lata o cambiala por otra más chica.',
    la_menos: 'Todavía no alcanza. Agregá otra lata o cambiá alguna por una más grande.',
    la_rep: 'Esa combinación ya la usaste. Buscá una distinta.',
    la_vacia: 'Primero tocá las latas que querés usar, y después presioná Verificar.',
    l_rojo: 'Roja, un litro.', l_amarillo: 'Amarilla, cero coma setenta y cinco litros.', l_violeta: 'Violeta, dos litros.',
    l_azul: 'Azul, dos coma veinticinco litros.', l_verde: 'Verde, cero coma veinticinco litros.', l_marron: 'Marrón, uno coma cinco litros.',

    /* 12 — Cartel de Teatro */
    te_instr: 'Pasamos al cartel de Teatro. Mirá las latas que eligieron.',
    te_1: 'Para el cartel de Teatro eligieron una lata marrón, una verde y una amarilla. ¿Cuántos litros de pintura eligieron?',
    te_1_ok: '¡Correcto! Uno coma cinco, más cero coma veinticinco, más cero coma setenta y cinco: dos coma cinco litros.',
    te_2: 'Ellos querían usar cinco litros. ¿Cuánta pintura les falta?',
    te_2_ok: '¡Sí! Dos coma cinco más dos coma cinco es cinco. Les faltan dos litros y medio.',

    /* 13 — Sumar: completar los 5 litros */
    cl_r1: 'Completá los cinco litros del cartel de Teatro. Las latas marrón, verde y amarilla ya están en el balde. Agregá las latas que faltan y presioná Verificar.',
    cl_r2: '¡Bien! ¿Hay otra forma de completar los cinco litros? Probá con otros colores y presioná Verificar.',
    cl_ok1: '¡Muy bien! Ahora sí: el cartel de Teatro tiene exactamente cinco litros de pintura.',
    cl_ok2: '¡Excelente! Otra forma distinta de completar los cinco litros.',

    /* 14 — Guadalupe y Amparo */
    da_instr: 'Para el cartel de Danza quieren usar seis coma cinco litros de pintura. Guadalupe y Amparo proponen latas distintas. ¡Comprobalo!',
    da_1: 'Guadalupe dice: debemos usar una lata azul, amarilla, roja y verde. ¿Cuántos litros suman?',
    da_1_ok: '¡Bien! Dos coma veinticinco, más cero coma setenta y cinco, más uno, más cero coma veinticinco: cuatro coma veinticinco litros.',
    da_2: '¿Guadalupe logró alcanzar los seis coma cinco litros?',
    da_2_ok: '¡Correcto! Cuatro coma veinticinco no llega a seis coma cinco: le faltan dos coma veinticinco litros.',
    da_3: 'Amparo dice: debemos usar una lata violeta, marrón, amarilla y azul. ¿Cuántos litros suman?',
    da_3_ok: '¡Muy bien! Dos, más uno coma cinco, más cero coma setenta y cinco, más dos coma veinticinco: ¡seis coma cinco litros!',
    da_4: '¿Amparo logró alcanzar los seis coma cinco litros?',
    da_4_ok: '¡Sí! Amparo eligió justo las latas para completar seis coma cinco litros.',

    /* 15 — Nuevos desafíos */
    nd_1: '¡Muy bien! Ya sabés trabajar con votos, porcentajes y litros. Ahora llegan los nuevos desafíos.',
    nd_2: 'Vamos a leer y completar gráficos de barras dobles: una barra para los chicos y otra para las chicas.',
    nd_3: 'Y también vamos a resolver cálculos con números con coma, y a descubrir errores.',

    /* 16 — Completar el gráfico */
    gb_instr: 'La tabla muestra los géneros musicales que prefiere un grupo de chicos y chicas. En el gráfico faltan dos barras. Buscá el dato en la tabla y tocá en el gráfico la altura de la barra que titila.',
    gb_1: 'Rap, chicos.',
    gb_1_ok: '¡Muy bien! A veinticinco chicos les gusta el rap: la barra llega hasta la línea del veinticinco.',
    gb_2: 'Trap, chicas.',
    gb_2_ok: '¡Perfecto! A cincuenta chicas les gusta el trap: la barra llega hasta la línea del cincuenta.',
    gb_err: 'Esa altura no coincide con la tabla. Fijate en el número de la tabla y buscá esa línea en el gráfico.',

    /* 17 — El género preferido */
    pr_instr: 'Ahora el gráfico está completo. Mirá las barras y respondé.',
    pr_1: '¿Qué género musical es el más preferido por los chicos?',
    pr_1_ok: '¡Sí! El trap, con cincuenta y cinco chicos: es la barra azul más alta.',
    pr_2: '¿Y cuál es el más preferido por las chicas?',
    pr_2_ok: '¡Correcto! También el trap, con cincuenta chicas: es la barra roja más alta.',

    /* 18 — Corregir el dato */
    co_instr: 'Se corrigieron los datos de la tabla: a diez chicas más les gusta el pop.',
    co_1: 'Tocá en el gráfico la nueva altura de la barra de pop de las chicas.',
    co_1_ok: '¡Perfecto! Treinta y cinco más diez es cuarenta y cinco: ahora la barra llega hasta el cuarenta y cinco.',

    /* 19 — Otro grupo */
    og_instr: 'A otro grupo de chicos y chicas también le preguntaron por sus géneros musicales preferidos. Mirá el gráfico y respondé.',
    og_1: '¿Qué género musical tiene igual preferencia entre los chicos y las chicas?',
    og_1_ok: '¡Bien! En reguetón las dos barras llegan a treinta: treinta chicos y treinta chicas.',
    og_2: 'En pop, ¿cuántas chicas más que chicos lo eligieron?',
    og_2_ok: '¡Correcto! Treinta y cinco chicas y veinte chicos: treinta y cinco menos veinte es quince.',
    og_3: '¿A cuántos chicos y chicas se les preguntó en total?',
    og_3_ok: '¡Excelente! Sumando todas las barras, se les preguntó a doscientos chicos y chicas.',
    og_4: '¿Se puede afirmar que el pop es el género más elegido entre los chicos y las chicas?',
    og_4_ok: '¡Exacto! La barra de pop de las chicas es la más alta, pero si sumamos chicos y chicas, el reguetón tiene sesenta y el pop, cincuenta y cinco.',

    /* 20 — Narración: sumar y restar con coma */
    cc_1: 'Para sumar números con coma, los escribimos uno debajo del otro, con la coma debajo de la coma.',
    cc_2: 'Así quedan los décimos debajo de los décimos, y los centésimos debajo de los centésimos.',
    cc_3: 'Sumamos como siempre, de derecha a izquierda, y bajamos la coma. Dos coma veinticinco más cero coma setenta y cinco es tres.',
    cc_4: 'Si un número no tiene coma, como el nueve, podemos escribirlo nueve coma cero. Así es más fácil restar.',
    cc_5: 'Nueve coma cero menos dos coma cinco es seis coma cinco.',

    /* 21 — Calcular */
    ca_instr: 'Resolvé la cuenta. Acordate: la coma va debajo de la coma.',
    ca_1: '¿Cuál es el resultado de siete menos uno coma cuatro?',
    ca_1_ok: '¡Correcto! Siete coma cero menos uno coma cuatro es cinco coma seis.',
    ca_err: 'Ese no es el resultado. Escribí el siete como siete coma cero y restá con la coma debajo de la coma.',

    /* 22 — Los errores de Ramiro */
    ra_instr: 'Ramiro hizo estos cálculos y se equivocó. Descubrí cuál es el resultado correcto.',
    ra_1: 'Ramiro escribió que cero coma cuatro más cero coma siete es cero coma once. ¿Cuál es el resultado correcto?',
    ra_1_ok: '¡Sí! Cuatro décimos más siete décimos son once décimos, o sea uno coma uno. Ramiro sumó como si fueran números enteros.',
    ra_2: 'Ramiro escribió que seis coma seis más cinco coma siete es once coma trece. ¿Cuál es el resultado correcto?',
    ra_2_ok: '¡Muy bien! Seis décimos más siete décimos son trece décimos: un entero y tres décimos. Ramiro no pasó ese entero. El resultado es doce coma tres.',
    ra_3: 'Ramiro escribió que nueve coma cero once más cero coma diez es nueve coma veintiuno. ¿Cuál es el resultado correcto?',
    ra_3_ok: '¡Excelente! Ramiro no puso la coma debajo de la coma. Bien alineados, el resultado es nueve coma ciento once.',
    ra_err: 'Ese no es. Pensá en décimos y centésimos, y poné la coma debajo de la coma.',

    /* 23 — Sin hacer la cuenta */
    es_instr: 'Sin hacer la cuenta, estimá el resultado.',
    es_1: '¿La suma de cero coma sesenta y cuatro más cero coma veintitrés es más o menos que uno?',
    es_1_ok: '¡Bien pensado! Cero coma sesenta y cuatro es un poco más de medio, y cero coma veintitrés es menos de un cuarto: juntos no llegan a uno.',
    es_2: '¿La resta de catorce menos dos coma noventa y ocho es más o menos que diez?',
    es_2_ok: '¡Exacto! Dos coma noventa y ocho es casi tres. Catorce menos tres es once, y once es más que diez.',
    es_err: 'Pensalo de nuevo. Redondeá los números y compará.',

    cierre: '¡Terminaste! Ya sabés usar votos, porcentajes, números con coma y gráficos para tomar decisiones. Mirá cuántos aciertos lograste. Si querés, podés volver a jugar.'
  },

  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Narración: la encuesta */
    {
      tipo: 'narra', titulo: '🗳️ La encuesta del arte',
      visual: { tipo: 'grafico', graf: 'encuesta', formato: 'votos' },
      pasos: [
        { audio: 'en_1', texto: '¿Qué tipo de arte te gusta más? 🎵🎨🎭💃' },
        { audio: 'en_2', texto: '🎵 Música: <b>40 votos</b>', visual: { luz: ['musica'] }, apuntar: 'musica' },
        { audio: 'en_3', texto: '🎨 Pintura y 💃 Danza: <b>25 votos</b> cada una', visual: { luz: ['pintura', 'danza'] }, apuntar: 'pintura' },
        { audio: 'en_4', texto: '🎭 Teatro: <b>10 votos</b>', visual: { luz: ['teatro'] }, apuntar: 'teatro' },
        { audio: 'en_5', texto: '40 + 25 + 10 + 25 = <b>100 votos</b>' }
      ]
    },

    /* 2 — La mitad de los votos (actividad 1a) */
    {
      tipo: 'opcion', titulo: '🗳️ La mitad de los votos', instr: 'mi_instr', err: 'err_graf',
      visual: { tipo: 'grafico', graf: 'encuesta', formato: 'votos' },
      rondas: [
        { id: 'm1', audio: 'mi_1', pregunta: '¿Cuántos votos hay en total?', opciones: ['100', '90', '110', '40'], ok: 'mi_1_ok' },
        { id: 'm2', audio: 'mi_2', pregunta: '¿Cuál es la mitad del total de votos?', opciones: ['50', '25', '40', '100'], ok: 'mi_2_ok' },
        { id: 'm3', audio: 'mi_3', pregunta: '¿Alguna opción reunió <b>al menos la mitad</b> de los votos?',
          opciones: ['No: ninguna llegó a 50 votos', 'Sí: Música, porque es la que más votos tiene', 'Sí: Pintura, con 25 votos', 'Sí: Teatro, con 10 votos'], ok: 'mi_3_ok' }
      ]
    },

    /* 3 — Un show de dos artes (actividad 1b) */
    {
      tipo: 'sumar', titulo: '🎪 Un show de dos artes', unidad: 'votos', objetivo: 50, exactas: 2,
      objetivoTxt: 'Show con la mitad de los votos:', vacioTxt: 'Tocá dos disciplinas para armar el show',
      fichas: [
        { id: 'musica', nombre: 'Música', emoji: '🎵', valor: 40, color: '#8338ec', audio: 'f_musica' },
        { id: 'pintura', nombre: 'Pintura', emoji: '🎨', valor: 25, color: '#fb8500', audio: 'f_pintura' },
        { id: 'teatro', nombre: 'Teatro', emoji: '🎭', valor: 10, color: '#e63946', audio: 'f_teatro' },
        { id: 'danza', nombre: 'Danza', emoji: '💃', valor: 25, color: '#2a9d8f', audio: 'f_danza' }
      ],
      maxCada: 1,
      rondas: [{ id: 's1', instr: 'sh_r1', ok: 'sh_pd' }, { id: 's2', instr: 'sh_r2', ok: 'sh_mt' }],
      okPor: { 'danza+pintura': 'sh_pd', 'musica+teatro': 'sh_mt' },
      errMas: 'sh_mas', errMenos: 'sh_menos', errCant: 'sh_cant', errRep: 'sh_rep'
    },

    /* 4 — Narración: de votos a porcentajes */
    {
      tipo: 'narra', titulo: '💯 De votos a porcentajes',
      visual: { tipo: 'cien', n: 25, color: '#fb8500', rotulo: '🎨 Pintura: 25 de 100' },
      pasos: [
        { audio: 'pc_1', texto: '<b>%</b> quiere decir <b>de cada 100</b>', visual: { n: 0, rotulo: '100 votos: cada cuadradito es 1 voto' } },
        { audio: 'pc_2', texto: '🎨 25 de 100 = <b><sup>25</sup>/<sub>100</sub></b>' },
        { audio: 'pc_3', texto: '<sup>25</sup>/<sub>100</sub> = <b>0,25</b>' },
        { audio: 'pc_4', texto: '0,25 = <b>25%</b>' },
        { audio: 'pc_5', texto: '25 + 25 + 25 + 25 = 100 ➜ 25 es <b><sup>1</sup>/<sub>4</sub> del total</b>', visual: { rotulo: '¼ de los votos' } },
        { audio: 'pc_6', texto: 'Gráfico de la IA: <b>frecuencia relativa</b>', visual: { tipo: 'grafico', graf: 'encuesta', formato: 'dec' }, apuntar: 'pintura' }
      ]
    },

    /* 5 — Verdadero o falso (actividades 1c, 2a, 2b y 3) */
    {
      tipo: 'vf', titulo: '🤔 ¿Tienen razón?', instr: 'vf_instr', err: 'err_graf',
      visual: { tipo: 'grafico', graf: 'encuesta', formato: 'dec' },
      afirmaciones: [
        { id: 'v1', quien: '👧👦 Los chicos:', texto: '«Si se reúne la mitad de los votos, eso representa el 50%».', audio: 'vf_1', v: true, ok: 'vf_1_ok' },
        { id: 'v2', quien: '👦 Martín:', texto: '«0,25, arriba de la barra de Pintura, es un cuarto de las personas que votaron por Pintura».', audio: 'vf_2', v: false, ok: 'vf_2_ok', visual: { luz: ['pintura'] } },
        { id: 'v3', quien: '🧒 Juan:', texto: '«0,25 también se puede escribir como 25%».', audio: 'vf_3', v: true, ok: 'vf_3_ok', visual: { luz: ['pintura'] } },
        { id: 'v4', quien: '🧒 Juan:', texto: '«0,25 + 0,25 es equivalente a la mitad».', audio: 'vf_4', v: true, ok: 'vf_4_ok', visual: { luz: ['pintura', 'danza'] } }
      ]
    },

    /* 6 — Porcentajes del gráfico (actividades 2c, 2d y 2e) */
    {
      tipo: 'opcion', titulo: '📊 Porcentajes del gráfico', instr: 'po_instr', err: 'err_graf',
      visual: { tipo: 'grafico', graf: 'encuesta', formato: 'dec' },
      rondas: [
        { id: 'p1', audio: 'po_1', visual: { luz: ['teatro'] }, pregunta: 'Teatro: <b>0,10</b>. ¿Representa más o menos del 25% de los votos?', opciones: ['Menos del 25%', 'Más del 25%', 'Justo el 25%'], ok: 'po_1_ok', alAcertar: { formato: 'pct' } },
        { id: 'p2', audio: 'po_2', visual: { luz: ['musica', 'teatro'] }, pregunta: '¿Qué porcentaje representan <b>Música y Teatro</b> juntos?', opciones: ['50%', '40%', '14%', '60%'], ok: 'po_2_ok', alAcertar: { formato: 'pct' } },
        { id: 'p3', audio: 'po_3', visual: { luz: ['musica', 'teatro', 'danza'] }, pregunta: '¿Y <b>Música, Teatro y Danza</b> juntos?', opciones: ['75%', '65%', '50%', '100%'], ok: 'po_3_ok', alAcertar: { formato: 'pct' } },
        { id: 'p4', audio: 'po_4', pregunta: '¿Y las <b>cuatro</b> barras juntas?', opciones: ['100%', '75%', '1%', '50%'], ok: 'po_4_ok', alAcertar: { formato: 'pct' } }
      ]
    },

    /* 7 — Un cuarto (actividad 2f) */
    {
      tipo: 'marcar', titulo: '🍕 Un cuarto de los votos', instr: 'cu_instr', ok: 'cu_ok', err: 'mar_err', vacio: 'mar_vacio',
      visual: { tipo: 'cien', n: 25, color: '#fb8500', rotulo: 'Un cuarto de los votos' },
      consigna: '¿Cuáles representan <b>un cuarto</b> de los votos? Marcá todas y presioná <b>Verificar</b>.',
      chips: [
        { t: '50%', audio: 'ch_50p' }, { t: '0,75', audio: 'ch_075' }, { t: '1/4', audio: 'ch_1_4', ok: true },
        { t: '75%', audio: 'ch_75p' }, { t: '0,25', audio: 'ch_025', ok: true }, { t: '50/100', audio: 'ch_50_100' },
        { t: '25/100', audio: 'ch_25_100', ok: true }, { t: '0,50', audio: 'ch_050' }, { t: '25%', audio: 'ch_25p', ok: true }
      ]
    },

    /* 8 — La mitad (actividad 2g) */
    {
      tipo: 'marcar', titulo: '🌓 La mitad de los votos', instr: 'me_instr', ok: 'me_ok', err: 'mar_err', vacio: 'mar_vacio',
      visual: { tipo: 'cien', n: 50, color: '#8338ec', rotulo: 'La mitad de los votos' },
      consigna: '¿Cuáles representan <b>la mitad</b> de los votos? Marcá todas y presioná <b>Verificar</b>.',
      chips: [
        { t: '50%', audio: 'ch_50p', ok: true }, { t: '0,5', audio: 'ch_05', ok: true }, { t: '1/2', audio: 'ch_1_2', ok: true },
        { t: '50/100', audio: 'ch_50_100', ok: true }, { t: '5%', audio: 'ch_5p' }, { t: '0,05', audio: 'ch_005' },
        { t: '1/5', audio: 'ch_1_5' }, { t: '25%', audio: 'ch_25p' }, { t: '0,25', audio: 'ch_025' }
      ]
    },

    /* 9 — Narración: las latas de pintura */
    {
      tipo: 'narra', titulo: '🎨 Las latas de pintura',
      visual: { tipo: 'latas' },
      pasos: [
        { audio: 'la_1', texto: 'Carteles para la fiesta: <b>6 latas</b> de pintura' },
        { audio: 'la_2', texto: 'Roja: <b>1 L</b> · Violeta: <b>2 L</b>', visual: { luz: ['rojo', 'violeta'] }, apuntar: 'rojo' },
        { audio: 'la_3', texto: 'Amarilla: <b>0,75 L</b> = ¾ de litro', visual: { luz: ['amarillo'] }, apuntar: 'amarillo' },
        { audio: 'la_4', texto: 'Verde: <b>0,25 L</b> = ¼ de litro', visual: { luz: ['verde'] }, apuntar: 'verde' },
        { audio: 'la_5', texto: 'Marrón: <b>1,5 L</b> = 1 litro y medio', visual: { luz: ['marron'] }, apuntar: 'marron' },
        { audio: 'la_6', texto: 'Azul: <b>2,25 L</b> = 2 litros y ¼', visual: { luz: ['azul'] }, apuntar: 'azul' }
      ]
    },

    /* 10 — ¿Cuánta pintura hay? (actividad 4a) */
    {
      tipo: 'opcion', titulo: '🪣 ¿Cuánta pintura hay?', instr: 'to_instr', err: 'err_latas',
      visual: { tipo: 'latas' },
      rondas: [
        { id: 't1', audio: 'to_1', pregunta: 'Con <b>una lata de cada color</b>, ¿cuántos litros hay?', opciones: ['7,75 L', '6,75 L', '8 L', '7,5 L'], ok: 'to_1_ok' },
        { id: 't2', audio: 'to_2', pregunta: 'Con <b>dos latas completas de cada una</b>, ¿cuántos litros hay?', opciones: ['15,5 L', '14,5 L', '7,75 L', '15,75 L'], ok: 'to_2_ok' }
      ]
    },

    /* 11 — Cartel de Música: 4 litros (actividad 4b) */
    {
      tipo: 'sumar', titulo: '🎵 Cartel de Música: 4 litros', unidad: 'L', objetivo: 4, maxCada: 2,
      objetivoTxt: 'Pintura para el cartel:', vacioTxt: 'Tocá las latas para ponerlas en el balde 🪣',
      fichas: [
        { id: 'rojo', lata: true, nombre: 'Roja', valor: 1, litros: 1, color: '#e63946', audio: 'l_rojo' },
        { id: 'amarillo', lata: true, nombre: 'Amarilla', valor: 0.75, litros: 0.75, color: '#ffcc00', audio: 'l_amarillo' },
        { id: 'violeta', lata: true, nombre: 'Violeta', valor: 2, litros: 2, color: '#8338ec', audio: 'l_violeta' },
        { id: 'azul', lata: true, nombre: 'Azul', valor: 2.25, litros: 2.25, color: '#1f6fe0', audio: 'l_azul' },
        { id: 'verde', lata: true, nombre: 'Verde', valor: 0.25, litros: 0.25, color: '#2a9d8f', audio: 'l_verde' },
        { id: 'marron', lata: true, nombre: 'Marrón', valor: 1.5, litros: 1.5, color: '#8b5a2b', audio: 'l_marron' }
      ],
      rondas: [{ id: 'u1', instr: 'mu_r1', ok: 'mu_ok1' }, { id: 'u2', instr: 'mu_r2', ok: 'mu_ok2' }],
      errMas: 'la_mas', errMenos: 'la_menos', errCant: 'la_vacia', errRep: 'la_rep'
    },

    /* 12 — Cartel de Teatro (actividades 4c y 4d) */
    {
      tipo: 'opcion', titulo: '🎭 Cartel de Teatro', instr: 'te_instr', err: 'err_latas',
      visual: { tipo: 'latas', luz: ['marron', 'verde', 'amarillo'] },
      rondas: [
        { id: 'e1', audio: 'te_1', pregunta: 'Marrón + verde + amarilla: ¿cuántos litros eligieron?', opciones: ['2,5 L', '2,25 L', '1,75 L', '3,5 L'], ok: 'te_1_ok' },
        { id: 'e2', audio: 'te_2', pregunta: 'Querían usar <b>5 litros</b>. ¿Cuánta pintura les falta?', opciones: ['2,5 L', '3,5 L', '2,25 L', '1,5 L'], ok: 'te_2_ok' }
      ]
    },

    /* 13 — Completar los 5 litros (actividad 4d) */
    {
      tipo: 'sumar', titulo: '🎭 Completá los 5 litros', unidad: 'L', objetivo: 5, maxCada: 2,
      objetivoTxt: 'Cartel de Teatro:', vacioTxt: '',
      fijas: ['marron', 'verde', 'amarillo'],
      fichas: [
        { id: 'rojo', lata: true, nombre: 'Roja', valor: 1, litros: 1, color: '#e63946', audio: 'l_rojo' },
        { id: 'amarillo', lata: true, nombre: 'Amarilla', valor: 0.75, litros: 0.75, color: '#ffcc00', audio: 'l_amarillo' },
        { id: 'violeta', lata: true, nombre: 'Violeta', valor: 2, litros: 2, color: '#8338ec', audio: 'l_violeta' },
        { id: 'azul', lata: true, nombre: 'Azul', valor: 2.25, litros: 2.25, color: '#1f6fe0', audio: 'l_azul' },
        { id: 'verde', lata: true, nombre: 'Verde', valor: 0.25, litros: 0.25, color: '#2a9d8f', audio: 'l_verde' },
        { id: 'marron', lata: true, nombre: 'Marrón', valor: 1.5, litros: 1.5, color: '#8b5a2b', audio: 'l_marron' }
      ],
      rondas: [{ id: 'c1', instr: 'cl_r1', ok: 'cl_ok1' }, { id: 'c2', instr: 'cl_r2', ok: 'cl_ok2' }],
      errMas: 'la_mas', errMenos: 'la_menos', errCant: 'la_vacia', errRep: 'la_rep'
    },

    /* 14 — Guadalupe y Amparo (actividad 4e) */
    {
      tipo: 'opcion', titulo: '💃 Cartel de Danza: 6,5 litros', instr: 'da_instr', err: 'err_latas',
      visual: { tipo: 'latas' },
      rondas: [
        { id: 'd1', audio: 'da_1', visual: { luz: ['azul', 'amarillo', 'rojo', 'verde'] }, pregunta: '👧 <b>Guadalupe:</b> «Azul, amarilla, roja y verde». ¿Cuántos litros suman?', opciones: ['4,25 L', '6,5 L', '5,25 L', '4 L'], ok: 'da_1_ok' },
        { id: 'd2', audio: 'da_2', visual: { luz: ['azul', 'amarillo', 'rojo', 'verde'] }, pregunta: '¿Guadalupe alcanzó los <b>6,5 L</b>?', opciones: ['No: le faltan 2,25 L', 'Sí: justo 6,5 L', 'Sí: y le sobra', 'No: le falta 1 L'], ok: 'da_2_ok' },
        { id: 'd3', audio: 'da_3', visual: { luz: ['violeta', 'marron', 'amarillo', 'azul'] }, pregunta: '👧 <b>Amparo:</b> «Violeta, marrón, amarilla y azul». ¿Cuántos litros suman?', opciones: ['6,5 L', '5,5 L', '6,25 L', '7,5 L'], ok: 'da_3_ok' },
        { id: 'd4', audio: 'da_4', visual: { luz: ['violeta', 'marron', 'amarillo', 'azul'] }, pregunta: '¿Amparo alcanzó los <b>6,5 L</b>?', opciones: ['Sí: justo 6,5 L', 'No: le falta 1 L', 'Sí: y le sobra 1 L'], ok: 'da_4_ok' }
      ]
    },

    /* 15 — Nuevos desafíos */
    {
      tipo: 'pasos', titulo: '🚀 Nuevos desafíos', img: 'img/desafios.jpg',
      pasos: [
        { audio: 'nd_1', texto: '¡Llegan los <b>nuevos desafíos</b>! 🚀' },
        { audio: 'nd_2', texto: 'Gráficos de <b>barras dobles</b>: chicos 🟦 y chicas 🟥' },
        { audio: 'nd_3', texto: 'Cálculos con <b>números con coma</b> y errores para descubrir 🔍' }
      ]
    },

    /* 16 — Completar el gráfico (desafío 1a) */
    {
      tipo: 'barras', titulo: '📊 Completá el gráfico', graf: 'generos1', instr: 'gb_instr', err: 'gb_err',
      faltantes: [
        { k: 'rap-chicos', val: 25, audio: 'gb_1', ok: 'gb_1_ok', texto: 'Tocá la altura de la barra: <b>Rap · Chicos</b>' },
        { k: 'trap-chicas', val: 50, audio: 'gb_2', ok: 'gb_2_ok', texto: 'Tocá la altura de la barra: <b>Trap · Chicas</b>' }
      ]
    },

    /* 17 — El género preferido (desafío 1b) */
    {
      tipo: 'opcion', titulo: '🎧 El género preferido', instr: 'pr_instr', err: 'err_graf',
      visual: { tipo: 'grafico', graf: 'generos1' },
      rondas: [
        { id: 'g1', audio: 'pr_1', visual: { luz: ['rap-chicos', 'regueton-chicos', 'trap-chicos', 'pop-chicos'] }, pregunta: '¿Qué género es el más preferido por los <b>chicos</b>?', opciones: ['Trap', 'Reguetón', 'Rap', 'Pop'], ok: 'pr_1_ok', alAcertar: { etiq: { 'trap-chicos': 1 } } },
        { id: 'g2', audio: 'pr_2', visual: { luz: ['rap-chicas', 'regueton-chicas', 'trap-chicas', 'pop-chicas'] }, pregunta: '¿Y el más preferido por las <b>chicas</b>?', opciones: ['Trap', 'Reguetón', 'Pop', 'Rap'], ok: 'pr_2_ok', alAcertar: { etiq: { 'trap-chicas': 1 } } }
      ]
    },

    /* 18 — Corregir el dato (desafío 1c) */
    {
      tipo: 'barras', titulo: '✏️ Corregí el dato', graf: 'generos1', instr: 'co_instr', err: 'gb_err',
      tablaMod: { 'pop-chicas': '35 + 10' },
      faltantes: [{ k: 'pop-chicas', val: 45, desde: 35, audio: 'co_1', ok: 'co_1_ok', texto: 'Tocá la <b>nueva altura</b>: <b>Pop · Chicas</b> (35 + 10)' }]
    },

    /* 19 — Otro grupo (desafío 2) */
    {
      tipo: 'opcion', titulo: '🎧 Otro grupo', instr: 'og_instr', err: 'err_graf',
      visual: { tipo: 'grafico', graf: 'generos2' },
      rondas: [
        { id: 'o1', audio: 'og_1', pregunta: '¿Qué género tiene <b>igual preferencia</b> entre chicos y chicas?', opciones: ['Reguetón', 'Trap', 'Pop', 'Rap'], ok: 'og_1_ok', alAcertar: { luz: ['regueton'], etiq: { 'regueton-chicos': 1, 'regueton-chicas': 1 } } },
        { id: 'o2', audio: 'og_2', visual: { luz: ['pop'] }, pregunta: 'En <b>pop</b>, ¿cuántas chicas más que chicos lo eligieron?', opciones: ['15', '35', '20', '55'], ok: 'og_2_ok', alAcertar: { etiq: { 'pop-chicos': 1, 'pop-chicas': 1 } } },
        { id: 'o3', audio: 'og_3', pregunta: '¿A cuántos chicos y chicas se les preguntó en total?', opciones: ['200', '100', '180', '35'], ok: 'og_3_ok', alAcertar: { etiq: { 'rap-chicos': 1, 'rap-chicas': 1, 'regueton-chicos': 1, 'regueton-chicas': 1, 'trap-chicos': 1, 'trap-chicas': 1, 'pop-chicos': 1, 'pop-chicas': 1 } } },
        { id: 'o4', audio: 'og_4', visual: { luz: ['regueton', 'pop'] }, pregunta: '¿Se puede afirmar que el <b>pop</b> es el género más elegido entre chicos y chicas?',
          opciones: ['No: reguetón suma 60 y pop suma 55', 'Sí: la barra de pop de las chicas es la más alta', 'Sí: pop suma 60 en total', 'No: el más elegido es el rap'], ok: 'og_4_ok' }
      ]
    },

    /* 20 — Narración: sumar y restar con coma */
    {
      tipo: 'narra', titulo: '✏️ Cuentas con coma',
      visual: { tipo: 'cuenta', cuenta: { a: '2,25', b: '0,75', op: '+', r: '3,00' } },
      pasos: [
        { audio: 'cc_1', texto: 'La <b>coma debajo de la coma</b>', visual: { luz: 'coma' }, apuntar: 'coma' },
        { audio: 'cc_2', texto: 'Décimos con décimos · centésimos con centésimos', visual: { luz: 'dec' } },
        { audio: 'cc_3', texto: '2,25 + 0,75 = <b>3,00</b> = 3', visual: { verR: true } },
        { audio: 'cc_4', texto: '9 = <b>9,0</b>', visual: { cuenta: { a: '9,0', b: '2,5', op: '−', r: '6,5' }, luz: 'coma' }, apuntar: 'coma' },
        { audio: 'cc_5', texto: '9,0 − 2,5 = <b>6,5</b>', visual: { cuenta: { a: '9,0', b: '2,5', op: '−', r: '6,5' }, verR: true } }
      ]
    },

    /* 21 — Calcular (desafío 3) */
    {
      tipo: 'opcion', titulo: '✏️ ¿Cuál es el resultado?', instr: 'ca_instr', err: 'ca_err',
      visual: { tipo: 'cuenta', cuenta: { a: '7,0', b: '1,4', op: '−', r: '5,6' } },
      rondas: [
        { id: 'k1', audio: 'ca_1', pregunta: '¿Cuál es el resultado de <b>7 − 1,4</b>?', opciones: ['5,6', '6,6', '6,4', '6'], ok: 'ca_1_ok', alAcertar: { verR: true } }
      ]
    },

    /* 22 — Los errores de Ramiro (desafío 4) */
    {
      tipo: 'opcion', titulo: '🔍 Los errores de Ramiro', instr: 'ra_instr', err: 'ra_err',
      visual: { tipo: 'cuenta' },
      rondas: [
        { id: 'r1', audio: 'ra_1', visual: { cuenta: { a: '0,4', b: '0,7', op: '+', r: '1,1' }, mal: '0,11', derecha: true }, pregunta: 'Ramiro: 0,4 + 0,7 = <s>0,11</s> ❌ ¿Cuál es el resultado correcto?', opciones: ['1,1', '0,11', '0,47', '11'], ok: 'ra_1_ok', alAcertar: { verR: true, derecha: false } },
        { id: 'r2', audio: 'ra_2', visual: { cuenta: { a: '6,6', b: '5,7', op: '+', r: '12,3' }, mal: '11,13', derecha: true }, pregunta: 'Ramiro: 6,6 + 5,7 = <s>11,13</s> ❌ ¿Cuál es el resultado correcto?', opciones: ['12,3', '11,13', '11,3', '12,13'], ok: 'ra_2_ok', alAcertar: { verR: true, derecha: false } },
        { id: 'r3', audio: 'ra_3', visual: { cuenta: { a: '9,011', b: '0,10', op: '+', r: '9,111' }, mal: '9,21', derecha: true }, pregunta: 'Ramiro: 9,011 + 0,10 = <s>9,21</s> ❌ ¿Cuál es el resultado correcto?', opciones: ['9,111', '9,21', '9,012', '10,11'], ok: 'ra_3_ok', alAcertar: { verR: true, derecha: false } }
      ]
    },

    /* 23 — Sin hacer la cuenta (desafíos 5 y 6) */
    {
      tipo: 'opcion', titulo: '🧠 Sin hacer la cuenta', instr: 'es_instr', err: 'es_err',
      visual: { tipo: 'img', src: 'img/pensar.jpg' },
      rondas: [
        { id: 'x1', audio: 'es_1', expr: '0,64 + 0,23', pregunta: '¿Es <b>más o menos que 1</b>?', opciones: ['Menos que 1', 'Más que 1'], ok: 'es_1_ok' },
        { id: 'x2', audio: 'es_2', expr: '14 − 2,98', pregunta: '¿Es <b>más o menos que 10</b>?', opciones: ['Más que 10', 'Menos que 10'], ok: 'es_2_ok' }
      ]
    },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
