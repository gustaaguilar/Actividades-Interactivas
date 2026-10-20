/* ============================================================
   CAMPO Y CIUDAD — Ambiente, Cultura y Tecnología · 2.º grado
   Basado en actividades áulicas de 2.º grado (campo y ciudad)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ------------------------------------------------------------
   Audios: cada clave de "audios" genera audio/<clave>.mp3
   (el script de Colab lee este bloque; no tipear la lista a mano).
   ============================================================ */

window.DATOS = {
  meta: {
    titulo: 'Campo y ciudad',
    subtitulo: 'Dos ratones, dos paisajes',
    area: 'Ambiente, Cultura y Tecnología · 2.º grado',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar',
    mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg',
    frase: 'Menos prisa, más vida 🧉🫂',
    canal: 'https://www.youtube.com/@ProfeGustavoAguilar?sub_confirmation=1',
    puntosPorAcierto: 10,
    revision: false  // true = flechas ‹ › para revisar rápido; false para publicar
  },

  /* ---------------------- CUENTOS (botón 📖) ---------------------- */
  cuentos: {
    ratones: {
      titulo: 'Dos ratones bien diferentes',
      parrafos: [
        { audio: 'c1_1', img: 'img/r1_guiso.jpg', texto: 'Un ratón campesino invitó a almorzar a su primo, que vivía en la ciudad.' },
        { audio: 'c1_2', img: 'img/r1_guiso.jpg', texto: 'Lo esperó con un exquisito guiso, pero cuando se quisieron acordar, se terminó. ¡Y se quedaron con un hambre bárbaro!' },
        { audio: 'c1_3', img: 'img/r1_guiso.jpg', texto: 'El ratón de la ciudad le dijo: —¡Acompañame a mi casa! Allí nos podremos dar una gran comilona.' },
        { audio: 'c1_4', img: 'img/r2_heladera.jpg', texto: 'Al llegar, abrieron la heladera, que estaba repleta de comida.' },
        { audio: 'c1_5', img: 'img/r3_cocinero.jpg', texto: 'Cuando el ratón del campo estaba por darle el primer mordiscón al queso… ¡zaz! Se abrió la puerta de la cocina. ¡Apareció el cocinero!' },
        { audio: 'c1_6', img: 'img/r3_cocinero.jpg', texto: 'El ratón de la ciudad se escondió enseguida. Pero al del campo le costó más ponerse a salvo, y casi… casi lo descubren.' },
        { audio: 'c1_7', img: 'img/r3_cocinero.jpg', texto: 'Cuando el cocinero se fue, el ratón del campo salió de abajo de la cocina y preguntó: —¿Esto pasa muy seguido? —¡Sí! —le dijo su primo—. ¡Dale, busquemos más comida!' },
        { audio: 'c1_8', img: 'img/r4_cueva.jpg', texto: '—¡Nooo! —dijo el ratón del campo, temblando—. Yo me vuelvo a mi cuevita. Tendré menos comida, pero mucha más tranquilidad. ¡Y eso no se cambia por nada!' }
      ],
      ensenanza: 'Es preferible tener poco pero vivir tranquilos, que tener mucho y vivir con miedo.'
    },
    ramon: {
      titulo: 'Ramón y Manuel',
      parrafos: [
        { audio: 'c2_1', img: 'img/ramon.jpg', texto: 'En el campo había nacido el ratoncito Ramón. Tenía un tronco por casa y un gran fardo por sillón.' },
        { audio: 'c2_2', img: 'img/ramon.jpg', texto: 'Comía fruta fresca, trabajaba bajo el sol, cuidaba a los animales y conducía un tractor.' },
        { audio: 'c2_3', img: 'img/manuel.jpg', texto: 'En la ciudad había nacido el ratoncito Manuel. Tenía una cueva por casa: un huequito en la pared.' },
        { audio: 'c2_4', img: 'img/manuel.jpg', texto: 'Comía queso y basura, y trabajaba en un negocio. Francisco era su vecino, su amigo y también su socio.' },
        { audio: 'c2_5', img: 'img/paseo.jpg', texto: 'Un día, el ratón Ramón la ciudad fue a conocer. Su primo Manuel le dijo: —¡Aquí hay mucho por hacer!' },
        { audio: 'c2_6', img: 'img/paseo.jpg', texto: 'Cruzaron una avenida, jugaron en una plaza, subieron por un ascensor y vieron una terraza.' },
        { audio: 'c2_7', img: 'img/paseo.jpg', texto: 'La ciudad es puro ruido: gente, luces y bullicio, fábricas, supermercados, oficinas y edificios.' },
        { audio: 'c2_8', img: 'img/regreso.jpg', texto: 'El día pasó volando. Ramón está muy cansado. A la hora de dormir, extraña el cielo estrellado.' },
        { audio: 'c2_9', img: 'img/regreso.jpg', texto: 'Por suerte, al amanecer, Ramón regresa a su hogar. La ciudad le gustó mucho, pero el campo es su lugar.' }
      ]
    }
  },

  /* ---------------------- TEXTOS DE AUDIO (clave → texto) ---------------------- */
  audios: {
    portada: '¡Hola! Bienvenidos a Campo y ciudad. Vamos a conocer a dos ratones muy diferentes, y a descubrir cómo se vive en el campo y cómo se vive en la ciudad. Tocá Comenzar.',
    error: 'Mmm, no es esa. Probá otra vez.',

    /* Cuento 1 */
    l1_instr: 'Escuchá el cuento Dos ratones bien diferentes. Seguí la lectura con los ojos.',
    c1_1: 'Un ratón campesino invitó a almorzar a su primo, que vivía en la ciudad.',
    c1_2: 'Lo esperó con un exquisito guiso, pero cuando se quisieron acordar, se terminó. ¡Y se quedaron con un hambre bárbaro!',
    c1_3: 'El ratón de la ciudad le dijo: ¡Acompañame a mi casa! Allí nos podremos dar una gran comilona.',
    c1_4: 'Al llegar, abrieron la heladera, que estaba repleta de comida.',
    c1_5: 'Cuando el ratón del campo estaba por darle el primer mordiscón al queso… ¡zaz! Se abrió la puerta de la cocina. ¡Apareció el cocinero!',
    c1_6: 'El ratón de la ciudad se escondió enseguida. Pero al del campo le costó más ponerse a salvo, y casi… casi lo descubren.',
    c1_7: 'Cuando el cocinero se fue, el ratón del campo salió de abajo de la cocina y preguntó: ¿Esto pasa muy seguido? ¡Sí!, le dijo su primo. ¡Dale, busquemos más comida!',
    c1_8: '¡Nooo!, dijo el ratón del campo, temblando. Yo me vuelvo a mi cuevita. Tendré menos comida, pero mucha más tranquilidad. ¡Y eso no se cambia por nada!',
    l1_fin: '¡Qué susto! Ahora vamos a ver cuánto recordás del cuento.',

    /* Comprensión cuento 1 */
    t1_instr: 'Respondé las preguntas sobre el cuento. Tocá la respuesta correcta. Si querés volver a leerlo, tocá el libro de arriba.',
    t1_q1: '¿Dónde vivían los ratones?',
    t1_q1ok: '¡Muy bien! Uno vivía en el campo y su primo vivía en la ciudad.',
    t1_q2: '¿Con qué esperó el ratón campesino a su primo?',
    t1_q2ok: '¡Sí! Lo esperó con un exquisito guiso.',
    t1_q3: '¿Les alcanzó la comida?',
    t1_q3ok: '¡Exacto! No les alcanzó: se terminó enseguida y se quedaron con hambre.',
    t1_q4: '¿Qué pasó cuando llegaron a la ciudad?',
    t1_q4ok: '¡Correcto! Encontraron la heladera llena de comida, pero apareció el cocinero.',
    t1_q5: '¿Cómo se habrá sentido el ratón del campo cuando apareció el cocinero?',
    t1_q5ok: '¡Claro! Se asustó mucho. Por eso decidió volver a su cuevita.',

    /* Ordenar escenas */
    or_instr: 'Ordená el cuento. Tocá las escenas en el orden en que pasaron: primero, la que pasó primero.',
    or_1: 'Primero: el ratón del campo esperó a su primo con un guiso.',
    or_2: 'Después: en la ciudad abrieron la heladera llena de comida.',
    or_3: 'Luego: apareció el cocinero y los ratones se asustaron.',
    or_4: 'Al final: el ratón del campo volvió tranquilo a su cuevita.',
    or_fin: '¡Muy bien! Ordenaste el cuento: el guiso, la heladera, el cocinero y la vuelta a la cuevita.',

    /* Opinión */
    op_instr: 'Pensá y respondé: ¿te pareció buena la actitud del ratón de campo? Tocá la carita que elijas.',
    op_si: '¡Qué bueno! El ratón del campo eligió vivir tranquilo, aunque tenga menos comida.',
    op_no: 'Está bien pensar distinto. Hay quienes prefieren la ciudad, con mucha comida, aunque haya peligros.',
    op_ens: 'El cuento nos deja una enseñanza: es preferible tener poco pero vivir tranquilos, que tener mucho y vivir con miedo.',

    /* Armar oración */
    ao_instr: 'Armá la oración. Tocá las palabras en orden. Acordate: la primera empieza con mayúscula y la última tiene punto.',
    ao_1: 'El ratón del campo invitó a su primo.',
    ao_2: 'El cocinero asustó a los ratones.',
    ao_3: 'El ratón volvió a su cuevita.',

    /* Cuento 2 */
    l2_instr: 'Ahora escuchá otro cuento: Ramón y Manuel. Ramón es del campo y Manuel es de la ciudad.',
    c2_1: 'En el campo había nacido el ratoncito Ramón. Tenía un tronco por casa y un gran fardo por sillón.',
    c2_2: 'Comía fruta fresca, trabajaba bajo el sol, cuidaba a los animales y conducía un tractor.',
    c2_3: 'En la ciudad había nacido el ratoncito Manuel. Tenía una cueva por casa: un huequito en la pared.',
    c2_4: 'Comía queso y basura, y trabajaba en un negocio. Francisco era su vecino, su amigo y también su socio.',
    c2_5: 'Un día, el ratón Ramón la ciudad fue a conocer. Su primo Manuel le dijo: ¡Aquí hay mucho por hacer!',
    c2_6: 'Cruzaron una avenida, jugaron en una plaza, subieron por un ascensor y vieron una terraza.',
    c2_7: 'La ciudad es puro ruido: gente, luces y bullicio, fábricas, supermercados, oficinas y edificios.',
    c2_8: 'El día pasó volando. Ramón está muy cansado. A la hora de dormir, extraña el cielo estrellado.',
    c2_9: 'Por suerte, al amanecer, Ramón regresa a su hogar. La ciudad le gustó mucho, pero el campo es su lugar.',
    l2_fin: '¡Qué lindo paseo! Ahora vamos a jugar con Ramón y Manuel.',

    /* ¿Quién fue? */
    qf_instr: 'Escuchá cada oración y tocá el ratoncito que corresponde: Ramón, del campo, o Manuel, de la ciudad.',
    qf_1: 'Trabaja en un negocio.',
    qf_1ok: '¡Sí! Manuel trabaja en un negocio de la ciudad.',
    qf_2: 'Vive en una cueva en la pared.',
    qf_2ok: '¡Muy bien! Manuel vive en un huequito en la pared.',
    qf_3: 'Come frutas frescas.',
    qf_3ok: '¡Correcto! Ramón come fruta fresca del campo.',
    qf_4: 'Tiene un fardo por sillón.',
    qf_4ok: '¡Exacto! Ramón tiene un gran fardo por sillón.',
    qf_5: 'Come queso y basura.',
    qf_5ok: '¡Sí! Manuel come queso y basura.',
    qf_6: 'Conduce un tractor.',
    qf_6ok: '¡Muy bien! Ramón conduce un tractor en el campo.',
    qf_7: 'Tiene un vecino llamado Francisco.',
    qf_7ok: '¡Correcto! Francisco es el vecino, amigo y socio de Manuel.',
    qf_8: 'Nació en el campo.',
    qf_8ok: '¡Claro! Ramón nació en el campo.',

    /* Paseo (multiselección) */
    ps_instr: '¿Qué hicieron Ramón y Manuel en su paseo por la ciudad? Tocá todas las cosas que hicieron. Son cuatro.',
    ps_avenida: '¡Sí! Cruzaron una avenida.',
    ps_plaza: '¡Sí! Jugaron en una plaza.',
    ps_ascensor: '¡Sí! Subieron por un ascensor.',
    ps_terraza: '¡Sí! Vieron una terraza.',
    ps_no: 'Eso no lo hicieron en la ciudad. Buscá otra.',
    ps_fin: '¡Encontraste las cuatro! Cruzaron una avenida, jugaron en una plaza, subieron por un ascensor y vieron una terraza.',

    /* Narración paisajes */
    np_intro: 'Mirá este paisaje. De un lado está el campo y del otro, la ciudad. Escuchá cómo se vive en cada lugar.',
    np_1: 'En el campo, las personas viven en pueblos o en casas muy separadas unas de otras.',
    np_2: 'Siempre tienen tiempo para tomar unos mates y disfrutar de un ambiente tranquilo.',
    np_3: 'Se levantan muy temprano para sembrar y atender a los animales.',
    np_4: 'En la ciudad, las casas están todas juntas y los edificios suelen ser muy altos.',
    np_5: 'Las personas trabajan en fábricas, negocios, bancos y oficinas.',
    np_6: 'La gente corre para llegar al trabajo, y respeta los semáforos para cruzar las calles.',
    np_fin: 'El campo y la ciudad son paisajes diferentes. Ahora vamos a compararlos.',

    /* Clasificar */
    cl_instr: 'Completá el cuadro. Tocá una tarjeta y después tocá campo o ciudad, según dónde la encontrás.',
    cl_vacas: 'Vacas y caballos.',
    cl_vacas_ok: 'Las vacas y los caballos están en el campo, en corrales y potreros.',
    cl_tractor: 'Tractor.',
    cl_tractor_ok: 'El tractor se usa en el campo para trabajar la tierra.',
    cl_siembra: 'Sembrados.',
    cl_siembra_ok: 'Los sembrados están en el campo: allí se cultivan las plantas.',
    cl_casas: 'Casas separadas.',
    cl_casas_ok: 'En el campo las casas están separadas unas de otras.',
    cl_edificios: 'Edificios altos.',
    cl_edificios_ok: 'Los edificios altos están en la ciudad.',
    cl_semaforo: 'Semáforos.',
    cl_semaforo_ok: 'Los semáforos están en la ciudad, para cruzar las calles con cuidado.',
    cl_colectivo: 'Colectivos.',
    cl_colectivo_ok: 'Por las calles de la ciudad pasan muchos colectivos.',
    cl_fabrica: 'Fábricas.',
    cl_fabrica_ok: 'En la ciudad hay fábricas donde trabajan muchas personas.',

    /* ¿Por qué? */
    pq_instr: 'Mirá cada foto y respondé. Tocá la respuesta correcta.',
    pq_1: '¿Por qué hay corrales en el campo y no en la ciudad?',
    pq_1ok: '¡Muy bien! En el campo se crían animales, como vacas y caballos, y los corrales sirven para cuidarlos.',
    pq_2: '¿Por qué hay edificios en la ciudad y no en el campo?',
    pq_2ok: '¡Correcto! En la ciudad vive mucha gente en poco espacio. Por eso se construye hacia arriba.',
    pq_3: '¿Dónde hay más plantas y animales?',
    pq_3ok: '¡Sí! Los paisajes del campo son más abiertos y tienen más plantas y animales.',

    /* Trabajos */
    tr_instr: 'Mirá cada trabajo y tocá si se realiza en el campo o en la ciudad.',
    tr_1: 'Cocinar y atender en un local de comidas.',
    tr_1ok: 'En la ciudad. Hay muchos negocios y locales de comida.',
    tr_2: 'Cosechar maíz en el campo sembrado.',
    tr_2ok: 'En el campo. Allí se siembra y se cosecha.',
    tr_3: 'Trabajar con la computadora en una oficina.',
    tr_3ok: 'En la ciudad. Las oficinas están en los edificios de la ciudad.',
    tr_4: 'Criar y cuidar gallinas.',
    tr_4ok: 'En el campo. Allí se crían gallinas y otros animales.',
    tr_5: 'Manejar un colectivo.',
    tr_5ok: 'En la ciudad. Los colectivos llevan a mucha gente por sus calles.',
    tr_6: 'Cuidar las cabras en el corral.',
    tr_6ok: 'En el campo. Los puesteros crían cabras en el campo.',

    /* Sí o no — paisaje rural */
    sn_instr: 'Mirá el paisaje rural, el paisaje del campo. Escuchá cada frase y tocá Sí o No.',
    sn_1: 'En el paisaje rural, las calles son asfaltadas.',
    sn_1ok: 'No. En el campo las calles suelen ser de tierra.',
    sn_2: 'En el paisaje rural, hay alambrado.',
    sn_2ok: 'Sí. El alambrado separa los campos y los corrales.',
    sn_3: 'En el paisaje rural, hay muchas casas y departamentos.',
    sn_3ok: 'No. En el campo hay pocas casas, separadas unas de otras.',
    sn_4: 'En el paisaje rural, hay ganado.',
    sn_4ok: 'Sí. En el campo hay vacas, caballos, ovejas y cabras.',
    sn_5: 'En el paisaje rural, las calles son de tierra.',
    sn_5ok: 'Sí. En el campo los caminos suelen ser de tierra.',
    sn_6: 'En el paisaje rural, hay muchos autos, colectivos y motos.',
    sn_6ok: 'No. Los autos, colectivos y motos abundan en la ciudad.',
    sn_7: 'En el paisaje rural, hay árboles y arbustos.',
    sn_7ok: 'Sí. En el campo hay muchas plantas: árboles y arbustos.',
    sn_8: 'En el paisaje rural, hay pocas personas.',
    sn_8ok: 'Sí. En el campo vive poca gente. En la ciudad vive mucha.',

    /* El paisaje cambia */
    pc_intro: 'Mirá con atención este lugar.',
    pc_1: 'Los paisajes del campo son más abiertos y tienen más plantas y animales que los paisajes de la ciudad.',
    pc_2: 'Cuando se construyen las ciudades, el paisaje cambia.',
    pc_3: 'Aparecen calles, casas y edificios, y quedan menos plantas y animales.',
    pc_fin: 'Las personas transforman el paisaje cuando construyen.',

    /* Lavalle */
    lv_instr: 'Lavalle es un departamento de Mendoza. Tiene paisajes de campo y de ciudad. Mirá cada foto y tocá campo o ciudad.',
    lv_1: 'Viñedos con un tractor.',
    lv_1ok: 'Campo. En Lavalle hay muchos viñedos donde se cultiva la uva.',
    lv_2: 'Una plaza con calles asfaltadas y casas juntas.',
    lv_2ok: 'Ciudad. En la villa cabecera hay plaza, calles asfaltadas y casas juntas.',
    lv_3: 'Un puesto con cabras entre los algarrobos.',
    lv_3ok: 'Campo. En el secano de Lavalle, los puesteros crían cabras.',
    lv_4: 'Una calle con negocios, autos y semáforo.',
    lv_4ok: 'Ciudad. Los negocios, los autos y el semáforo son de la ciudad.',

    /* Sopa de letras */
    so_instr: 'Buscá en la sopa de letras seis palabras de la ciudad. Tocá la primera letra y después la última.',
    so_calle: 'Calle.',
    so_plaza: 'Plaza.',
    so_banco: 'Banco.',
    so_auto: 'Auto.',
    so_negocio: 'Negocio.',
    so_edificio: 'Edificio.',
    so_fin: '¡Encontraste todas las palabras de la ciudad!',

    cierre: '¡Terminaste! Aprendiste cómo es la vida en el campo y en la ciudad, y cómo cambia el paisaje cuando se construye. ¡Felicitaciones!'
  },

  /* ---------------------- PANTALLAS ---------------------- */
  pantallas: [

    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    /* 1 — Cuento 1 narrado */
    { tipo: 'lectura', id: 'l1', titulo: '📖 Dos ratones bien diferentes', cuento: 'ratones', instr: 'l1_instr', fin: 'l1_fin' },

    /* 2 — Comprensión */
    { tipo: 'trivia', id: 't1', titulo: '🤔 ¿Qué pasó en el cuento?', instr: 't1_instr', libro: 'ratones',
      preguntas: [
        { id: 1, audio: 't1_q1', ok: 't1_q1ok', img: 'img/portada.jpg', texto: '¿Dónde vivían los ratones?',
          opciones: [{ t: 'Uno en el campo y otro en la ciudad', c: true }, { t: 'Los dos en la ciudad' }, { t: 'Los dos en el campo' }] },
        { id: 2, audio: 't1_q2', ok: 't1_q2ok', img: 'img/r1_guiso.jpg', texto: '¿Con qué esperó el ratón campesino a su primo?',
          opciones: [{ t: 'Con un guiso', c: true }, { t: 'Con queso' }, { t: 'Con una torta' }] },
        { id: 3, audio: 't1_q3', ok: 't1_q3ok', img: 'img/r1_guiso.jpg', texto: '¿Les alcanzó la comida?',
          opciones: [{ t: 'No', c: true }, { t: 'Sí' }] },
        { id: 4, audio: 't1_q4', ok: 't1_q4ok', img: 'img/r3_cocinero.jpg', texto: '¿Qué pasó cuando llegaron a la ciudad?',
          opciones: [{ t: 'Apareció el cocinero', c: true }, { t: 'Se durmieron una siesta' }, { t: 'Cocinaron un guiso' }] },
        { id: 5, audio: 't1_q5', ok: 't1_q5ok', img: 'img/r3_cocinero.jpg', texto: '¿Cómo se habrá sentido el ratón del campo?',
          opciones: [{ t: '😱 Asustado', c: true }, { t: '😄 Contento' }, { t: '😴 Dormido' }] }
      ] },

    /* 3 — Ordenar escenas */
    { tipo: 'ordenarEscenas', id: 'or', titulo: '🔢 Ordená el cuento', instr: 'or_instr', fin: 'or_fin', libro: 'ratones',
      texto: 'Tocá las escenas en orden: <b>1, 2, 3, 4</b>.',
      escenas: [
        { img: 'img/r1_guiso.jpg', audio: 'or_1', texto: 'El guiso en el campo' },
        { img: 'img/r2_heladera.jpg', audio: 'or_2', texto: 'La heladera llena' },
        { img: 'img/r3_cocinero.jpg', audio: 'or_3', texto: '¡El cocinero!' },
        { img: 'img/r4_cueva.jpg', audio: 'or_4', texto: 'De vuelta a la cuevita' }
      ] },

    /* 4 — Opinión + enseñanza */
    { tipo: 'opinion', titulo: '💭 Para pensar', instr: 'op_instr', img: 'img/r4_cueva.jpg', libro: 'ratones',
      texto: '¿Te pareció buena la actitud del ratón de campo?',
      opciones: [{ t: '😊 Sí', audio: 'op_si' }, { t: '😢 No', audio: 'op_no' }],
      ensenanzaAudio: 'op_ens', ensenanza: 'Es preferible tener poco pero vivir tranquilos, que tener mucho y vivir con miedo.' },

    /* 5 — Armar oraciones */
    { tipo: 'armarOracion', id: 'ao', titulo: '✏️ Armá la oración', instr: 'ao_instr', libro: 'ratones',
      oraciones: [
        { img: 'img/r1_guiso.jpg', audio: 'ao_1', texto: 'El ratón del campo invitó a su primo.' },
        { img: 'img/r3_cocinero.jpg', audio: 'ao_2', texto: 'El cocinero asustó a los ratones.' },
        { img: 'img/r4_cueva.jpg', audio: 'ao_3', texto: 'El ratón volvió a su cuevita.' }
      ] },

    /* 6 — Cuento 2 narrado */
    { tipo: 'lectura', id: 'l2', titulo: '📖 Ramón y Manuel', cuento: 'ramon', instr: 'l2_instr', fin: 'l2_fin' },

    /* 7 — ¿Quién fue? */
    { tipo: 'dosOpciones', id: 'qf', titulo: '🐭 ¿Ramón o Manuel?', instr: 'qf_instr', libro: 'ramon',
      opciones: [
        { id: 'R', t: 'Ramón', sub: 'del campo', img: 'img/ramon.jpg' },
        { id: 'M', t: 'Manuel', sub: 'de la ciudad', img: 'img/manuel.jpg' }
      ],
      items: [
        { id: 1, audio: 'qf_1', ok: 'qf_1ok', c: 'M', texto: 'Trabaja en un negocio.' },
        { id: 2, audio: 'qf_2', ok: 'qf_2ok', c: 'M', texto: 'Vive en una cueva en la pared.' },
        { id: 3, audio: 'qf_3', ok: 'qf_3ok', c: 'R', texto: 'Come frutas frescas.' },
        { id: 4, audio: 'qf_4', ok: 'qf_4ok', c: 'R', texto: 'Tiene un fardo por sillón.' },
        { id: 5, audio: 'qf_5', ok: 'qf_5ok', c: 'M', texto: 'Come queso y basura.' },
        { id: 6, audio: 'qf_6', ok: 'qf_6ok', c: 'R', texto: 'Conduce un tractor.' },
        { id: 7, audio: 'qf_7', ok: 'qf_7ok', c: 'M', texto: 'Tiene un vecino llamado Francisco.' },
        { id: 8, audio: 'qf_8', ok: 'qf_8ok', c: 'R', texto: 'Nació en el campo.' }
      ] },

    /* 8 — El paseo por la ciudad (multiselección) */
    { tipo: 'multi', id: 'ps', titulo: '🏙️ El paseo por la ciudad', instr: 'ps_instr', fin: 'ps_fin', err: 'ps_no', img: 'img/paseo.jpg', libro: 'ramon',
      texto: '¿Qué hicieron en la ciudad? Tocá las <b>cuatro</b> cosas que hicieron.',
      opciones: [
        { t: '🚦 Cruzaron una avenida', c: true, audio: 'ps_avenida' },
        { t: '🛝 Jugaron en una plaza', c: true, audio: 'ps_plaza' },
        { t: '🛗 Subieron por un ascensor', c: true, audio: 'ps_ascensor' },
        { t: '🌇 Vieron una terraza', c: true, audio: 'ps_terraza' },
        { t: '🐄 Ordeñaron una vaca' },
        { t: '🚜 Manejaron un tractor' }
      ] },

    /* 9 — Narración animada: campo y ciudad */
    { tipo: 'narracion', titulo: '👀 El campo y la ciudad', img: 'img/panorama.jpg', intro: 'np_intro', fin: 'np_fin',
      pasos: [
        { audio: 'np_1', etiqueta: '🏡 Casas separadas', x: 9, y: 30, texto: 'En el <b>campo</b>, las personas viven en pueblos o en casas muy separadas.' },
        { audio: 'np_2', etiqueta: '🧉 Ambiente tranquilo', x: 29, y: 78, texto: 'Tienen tiempo para tomar mates y disfrutar de un ambiente tranquilo.' },
        { audio: 'np_3', etiqueta: '🐄 Siembra y animales', x: 9, y: 66, texto: 'Se levantan muy temprano para sembrar y atender a los animales.' },
        { audio: 'np_4', etiqueta: '🏢 Edificios altos', x: 62, y: 30, texto: 'En la <b>ciudad</b>, las casas están juntas y los edificios son altos.' },
        { audio: 'np_5', etiqueta: '🏭 Fábricas y negocios', x: 93, y: 30, texto: 'Las personas trabajan en fábricas, negocios, bancos y oficinas.' },
        { audio: 'np_6', etiqueta: '🚦 Semáforos', x: 93, y: 60, texto: 'La gente corre al trabajo y respeta los semáforos para cruzar.' }
      ] },

    /* 10 — Clasificar: cuadro comparativo */
    { tipo: 'clasificar', id: 'cl', titulo: '📋 Cuadro: campo o ciudad', instr: 'cl_instr',
      texto: 'Tocá una tarjeta y después tocá <b>campo</b> o <b>ciudad</b>.',
      categorias: [
        { id: 'campo', t: '🌾 Campo', img: 'img/cat_campo.jpg' },
        { id: 'ciudad', t: '🏙️ Ciudad', img: 'img/cat_ciudad.jpg' }
      ],
      items: [
        { id: 'vacas', e: '🐄', t: 'vacas y caballos', cat: 'campo', audio: 'cl_vacas', ok: 'cl_vacas_ok' },
        { id: 'tractor', e: '🚜', t: 'tractor', cat: 'campo', audio: 'cl_tractor', ok: 'cl_tractor_ok' },
        { id: 'siembra', e: '🌽', t: 'sembrados', cat: 'campo', audio: 'cl_siembra', ok: 'cl_siembra_ok' },
        { id: 'casas', e: '🏡', t: 'casas separadas', cat: 'campo', audio: 'cl_casas', ok: 'cl_casas_ok' },
        { id: 'edificios', e: '🏢', t: 'edificios altos', cat: 'ciudad', audio: 'cl_edificios', ok: 'cl_edificios_ok' },
        { id: 'semaforo', e: '🚦', t: 'semáforos', cat: 'ciudad', audio: 'cl_semaforo', ok: 'cl_semaforo_ok' },
        { id: 'colectivo', e: '🚌', t: 'colectivos', cat: 'ciudad', audio: 'cl_colectivo', ok: 'cl_colectivo_ok' },
        { id: 'fabrica', e: '🏭', t: 'fábricas', cat: 'ciudad', audio: 'cl_fabrica', ok: 'cl_fabrica_ok' }
      ] },

    /* 11 — ¿Por qué? */
    { tipo: 'trivia', id: 'pq', titulo: '🔎 ¿Por qué?', instr: 'pq_instr',
      preguntas: [
        { id: 1, audio: 'pq_1', ok: 'pq_1ok', img: 'img/corral.jpg', texto: '¿Por qué hay corrales en el campo y no en la ciudad?',
          opciones: [{ t: 'Porque en el campo se crían animales', c: true }, { t: 'Porque en el campo no hay árboles' }, { t: 'Porque en la ciudad no hay calles' }] },
        { id: 2, audio: 'pq_2', ok: 'pq_2ok', img: 'img/edificios.jpg', texto: '¿Por qué hay edificios en la ciudad y no en el campo?',
          opciones: [{ t: 'Porque en la ciudad vive mucha gente en poco espacio', c: true }, { t: 'Porque en el campo no vive nadie' }, { t: 'Porque los edificios son para los animales' }] },
        { id: 3, audio: 'pq_3', ok: 'pq_3ok', img: 'img/cat_campo.jpg', texto: '¿Dónde hay más plantas y animales?',
          opciones: [{ t: 'En el campo', c: true }, { t: 'En la ciudad' }] }
      ] },

    /* 12 — Trabajos */
    { tipo: 'dosOpciones', id: 'tr', titulo: '👷 Trabajos del campo y de la ciudad', instr: 'tr_instr',
      opciones: [
        { id: 'campo', t: '🌾 Campo' },
        { id: 'ciudad', t: '🏙️ Ciudad' }
      ],
      items: [
        { id: 1, img: 'img/tr_cocina.jpg', audio: 'tr_1', ok: 'tr_1ok', c: 'ciudad', texto: 'Cocinar y atender en un local de comidas.' },
        { id: 2, img: 'img/tr_cosecha.jpg', audio: 'tr_2', ok: 'tr_2ok', c: 'campo', texto: 'Cosechar maíz en el campo sembrado.' },
        { id: 3, img: 'img/tr_oficina.jpg', audio: 'tr_3', ok: 'tr_3ok', c: 'ciudad', texto: 'Trabajar con la computadora en una oficina.' },
        { id: 4, img: 'img/tr_gallinas.jpg', audio: 'tr_4', ok: 'tr_4ok', c: 'campo', texto: 'Criar y cuidar gallinas.' },
        { id: 5, img: 'img/tr_colectivo.jpg', audio: 'tr_5', ok: 'tr_5ok', c: 'ciudad', texto: 'Manejar un colectivo.' },
        { id: 6, img: 'img/tr_cabras.jpg', audio: 'tr_6', ok: 'tr_6ok', c: 'campo', texto: 'Cuidar las cabras en el corral.' }
      ] },

    /* 13 — Sí o no: el paisaje rural */
    { tipo: 'dosOpciones', id: 'sn', titulo: '🌄 En el paisaje rural…', instr: 'sn_instr', img: 'img/rural.jpg',
      opciones: [
        { id: 'si', t: '👍 Sí' },
        { id: 'no', t: '👎 No' }
      ],
      items: [
        { id: 1, audio: 'sn_1', ok: 'sn_1ok', c: 'no', texto: 'Las calles son asfaltadas.' },
        { id: 2, audio: 'sn_2', ok: 'sn_2ok', c: 'si', texto: 'Hay alambrado.' },
        { id: 3, audio: 'sn_3', ok: 'sn_3ok', c: 'no', texto: 'Hay muchas casas y departamentos.' },
        { id: 4, audio: 'sn_4', ok: 'sn_4ok', c: 'si', texto: 'Hay ganado.' },
        { id: 5, audio: 'sn_5', ok: 'sn_5ok', c: 'si', texto: 'Las calles son de tierra.' },
        { id: 6, audio: 'sn_6', ok: 'sn_6ok', c: 'no', texto: 'Hay muchos autos, colectivos y motos.' },
        { id: 7, audio: 'sn_7', ok: 'sn_7ok', c: 'si', texto: 'Hay árboles y arbustos.' },
        { id: 8, audio: 'sn_8', ok: 'sn_8ok', c: 'si', texto: 'Hay pocas personas.' }
      ] },

    /* 14 — El paisaje cambia (narración con cambio de imagen) */
    { tipo: 'narracion', titulo: '🏗️ El paisaje cambia', img: 'img/antes.jpg', intro: 'pc_intro', fin: 'pc_fin',
      pasos: [
        { audio: 'pc_1', etiqueta: '🌳 Campo abierto', x: 50, y: 55, texto: 'Los paisajes del <b>campo</b> son más abiertos y tienen <b>más plantas y animales</b>.' },
        { audio: 'pc_2', img: 'img/despues.jpg', etiqueta: '🏗️ Se construye', x: 50, y: 50, texto: 'Cuando se construyen las ciudades, <b>el paisaje cambia</b>.' },
        { audio: 'pc_3', etiqueta: '🏘️ Calles y casas', x: 30, y: 62, texto: 'Aparecen calles, casas y edificios, y quedan <b>menos plantas y animales</b>.' }
      ] },

    /* 15 — Paseo por Lavalle */
    { tipo: 'dosOpciones', id: 'lv', titulo: '🍇 Paseo por Lavalle', instr: 'lv_instr',
      opciones: [
        { id: 'campo', t: '🌾 Campo' },
        { id: 'ciudad', t: '🏙️ Ciudad' }
      ],
      items: [
        { id: 1, img: 'img/lv_vinedo.jpg', audio: 'lv_1', ok: 'lv_1ok', c: 'campo', texto: 'Viñedos con un tractor.' },
        { id: 2, img: 'img/lv_plaza.jpg', audio: 'lv_2', ok: 'lv_2ok', c: 'ciudad', texto: 'Una plaza con calles asfaltadas y casas juntas.' },
        { id: 3, img: 'img/lv_puesto.jpg', audio: 'lv_3', ok: 'lv_3ok', c: 'campo', texto: 'Un puesto con cabras entre los algarrobos.' },
        { id: 4, img: 'img/lv_calle.jpg', audio: 'lv_4', ok: 'lv_4ok', c: 'ciudad', texto: 'Una calle con negocios, autos y semáforo.' }
      ] },

    /* 16 — Sopa de letras: palabras de la ciudad */
    { tipo: 'sopa', id: 'so', titulo: '🔤 Palabras de la ciudad', instr: 'so_instr', fin: 'so_fin', img: 'img/cat_ciudad.jpg', tam: 9,
      palabras: [
        { p: 'calle', audio: 'so_calle' }, { p: 'plaza', audio: 'so_plaza' }, { p: 'banco', audio: 'so_banco' },
        { p: 'auto', audio: 'so_auto' }, { p: 'negocio', audio: 'so_negocio' }, { p: 'edificio', audio: 'so_edificio' }
      ] },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
