/* ============================================================
   VOCALES QUE SE ESTIRAN — Lengua · 1.er grado
   Conciencia fonológica: sonido inicial vocálico
   Orientación del programa Queremos Aprender (DGE Mendoza)
   Audios de palabras: grabados por la docente (sonido inicial alargado)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ------------------------------------------------------------
   - "palabras": cada una suena con audio/<clave>.mp3 (voz de la docente).
   - "audios": consignas y devoluciones (gTTS). El script de Colab
     lee este bloque; no tipear la lista a mano.
   ============================================================ */

window.DATOS = {
  meta: {
    titulo: 'Vocales que se estiran',
    subtitulo: '¿Con qué sonido empieza?',
    area: 'Lengua · 1.er grado',
    descripcion: 'Estrategias de refuerzo para la estimulación de la conciencia fonológica, desde la mirada y orientación del programa «Queremos Aprender» de la DGE.',
    creditoAudios: 'Audios de los referentes: Asesora Pedagógica Sección 6 Lic. Analía Herrería',
    fundamentos: [
      '<h2>Sobre este paquete</h2>',
      '<h3>¿Qué se trabaja?</h3>',
      '<p><b>Conciencia fonológica</b>: darse cuenta de que las palabras están formadas por sonidos. Reconocer que hay palabras que empiezan con el mismo sonido es un primer paso para adquirirla, y también para que los chicos, al ver palabras escritas, empiecen a descubrir qué letra corresponde a cada sonido.</p>',
      '<p>Este primer paquete trabaja el <b>sonido inicial de las vocales</b> (a, e, i, o, u), con 20 palabras.</p>',
      '<h3>¿Por qué se estira el sonido?</h3>',
      '<p>Los sonidos se trabajan <b>dentro de la palabra</b> y no aislados: para tomar conciencia de un sonido hay que <b>prolongarlo</b> e ir despegándolo del resto de la palabra (<i>aaaabeja, ooooso</i>). Por eso cada palabra está grabada con el primer sonido alargado por la Lic. Analía Herrería, asesora pedagógica de la Sección 6.</p>',
      '<h3>Marco</h3>',
      '<p>Las actividades siguen la orientación del <b>Programa Queremos Aprender</b>, que se aplica en Mendoza desde 2017 en Nivel Inicial y primer ciclo. Lo desarrollaron la Dra. Ana María Borzone y la Dra. Vanesa de Mier, con su equipo. Las propuestas toman el apartado <i>Sonidos y letras marchando</i>, que avanza de las rimas al sonido inicial; más adelante se suman /s/ y /m/, sonidos muy frecuentes y fáciles de prolongar. Este paquete es una actividad interactiva de QueSepanTodos.com, no material oficial del programa.</p>',
      '<h3>Las actividades</h3>',
      '<ul><li><b>Los sobres de las vocales</b>: se presenta cada vocal con una palabra modelo.</li><li><b>Sobres atrapa palabras</b>: guardar cada dibujo en el sobre que empieza igual.</li><li><b>¿Cuáles empiezan con…?</b>: encontrar los dibujos que empiezan con la vocal (equivale a rodearlos con un círculo).</li><li><b>Unimos los que empiezan igual</b>: formar parejas de dibujos con el mismo sonido inicial.</li></ul>',
      '<h3>Para acompañar</h3>',
      '<ul><li>Cada dibujo se nombra antes de responder, porque un dibujo puede llamarse de otra manera (¿olla o cacerola?).</li><li>Conviene repetir las palabras en voz alta junto con el chico, estirando el primer sonido.</li><li>Mejor sesiones cortas: a esta edad la atención sostenida ronda los 12 a 15 minutos.</li></ul>',
      '<p class="fuente">Fuente: <a href="https://hportal.mendoza.edu.ar/wp-content/uploads/2025/09/fundamentos-del-programa-integral.-docentes.-breve.pdf" target="_blank" rel="noopener">Fundamentos del Programa “Queremos Aprender”</a>, Dirección General de Escuelas de Mendoza.</p>'
    ].join(''),
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar',
    mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg',
    frase: 'Menos prisa, más vida 🧉🫂',
    canal: 'https://www.youtube.com/@ProfeGustavoAguilar?sub_confirmation=1',
    puntosPorAcierto: 10,
    revision: false  // true = flechas ‹ › para revisar rápido; false para publicar
  },

  vocales: {
    a: { color: '#21a6b5', oscuro: '#13707a', ref: 'abeja' },
    e: { color: '#7cb342', oscuro: '#4f7a24', ref: 'elefante' },
    i: { color: '#f2a900', oscuro: '#a87400', ref: 'iguana' },
    o: { color: '#8e44ad', oscuro: '#5e2a75', ref: 'oso' },
    u: { color: '#e2457a', oscuro: '#9c2450', ref: 'uva' }
  },

  /* clave (= archivo de imagen y de audio) → cómo se escribe */
  palabras: {
    abeja: 'abeja', ala: 'ala', anillo: 'anillo', arana: 'araña', auto: 'auto',
    elefante: 'elefante', enano: 'enano', escoba: 'escoba', estrella: 'estrella',
    iglesia: 'iglesia', iglu: 'iglú', iguana: 'iguana', isla: 'isla',
    ojo: 'ojo', ola: 'ola', olla: 'olla', oso: 'oso',
    una: 'uña', urraca: 'urraca', uva: 'uva'
  },

  /* ---------------------- TEXTOS DE AUDIO gTTS (clave → texto) ---------------------- */
  audios: {
    portada: '¡Hola! Vamos a jugar con los sonidos. Escuchá cómo se estira el primer sonido de cada palabra. Tocá comenzar.',

    pr_intro: 'Estos son los sobres de las vocales. Cada sobre tiene un dibujo. Escuchá cómo empieza su nombre.',
    pr_a: 'Este es el sobre de la a.',
    pr_e: 'Este es el sobre de la e.',
    pr_i: 'Este es el sobre de la i.',
    pr_o: 'Este es el sobre de la o.',
    pr_u: 'Este es el sobre de la u.',
    pr_fin: '¿Escuchaste? Cada palabra empieza con el sonido de su vocal. ¡Ahora te toca a vos!',

    so_instr: 'Escuchá la palabra y guardala en el sobre que empieza con el mismo sonido. Para escucharla otra vez, tocá el parlante.',
    so_no: 'Mmm, ese sobre no. Escuchá otra vez cómo empieza.',
    so_fin: '¡Guardaste todas las palabras en su sobre!',

    emp_a: '¡Sí! Empieza con a.',
    emp_e: '¡Sí! Empieza con e.',
    emp_i: '¡Sí! Empieza con i.',
    emp_o: '¡Sí! Empieza con o.',
    emp_u: '¡Sí! Empieza con u.',

    ro_instr: 'Mirá la vocal y escuchá el nombre de cada dibujo. Después, tocá los dos dibujos que empiezan con esa vocal.',
    ro_a: 'Ahora, la a. Escuchá.',
    ro_e: 'Ahora, la e. Escuchá.',
    ro_i: 'Ahora, la i. Escuchá.',
    ro_o: 'Ahora, la o. Escuchá.',
    ro_u: 'Ahora, la u. Escuchá.',
    ro_no: 'Ese no empieza con esa vocal. Probá con otro.',
    ro_fin: '¡Muy bien! Encontraste todos los dibujos.',

    un_instr: 'Uní los dibujos que empiezan igual. Tocá un dibujo y después el dibujo que empieza con el mismo sonido.',
    par_a: '¡Muy bien! Los dos empiezan con a.',
    par_e: '¡Muy bien! Los dos empiezan con e.',
    par_i: '¡Muy bien! Los dos empiezan con i.',
    par_o: '¡Muy bien! Los dos empiezan con o.',
    par_u: '¡Muy bien! Los dos empiezan con u.',
    un_no: 'No empiezan igual. Probá otra vez.',
    un_fin: '¡Uniste todas las parejas!',

    cierre: '¡Terminaste! Escuchaste y estiraste un montón de sonidos. ¡Muy buen trabajo!'
  },

  /* ---------------------- PANTALLAS ---------------------- */
  pantallas: [
    { tipo: 'portada', img: 'img/portada.jpg', audio: 'portada' },

    { tipo: 'presentacion', titulo: '✉️ Los sobres de las vocales', intro: 'pr_intro', fin: 'pr_fin' },

    { tipo: 'sobres', id: 'so', titulo: '✉️ Sobres atrapa palabras', instr: 'so_instr', no: 'so_no', fin: 'so_fin',
      tarjetas: ['ala', 'anillo', 'arana', 'auto', 'enano', 'escoba', 'estrella',
                 'iglesia', 'iglu', 'isla', 'ojo', 'ola', 'olla', 'una', 'urraca'] },

    { tipo: 'rodear', id: 'ro', titulo: '⭕ ¿Cuáles empiezan con…?', instr: 'ro_instr', no: 'ro_no', fin: 'ro_fin',
      filas: [
        { v: 'a', ok: ['ala', 'anillo'],  otros: ['olla', 'estrella'] },
        { v: 'e', ok: ['escoba', 'enano'], otros: ['isla', 'uva'] },
        { v: 'i', ok: ['iglu', 'isla'],    otros: ['auto', 'ojo'] },
        { v: 'o', ok: ['ola', 'olla'],     otros: ['iguana', 'elefante'] },
        { v: 'u', ok: ['una', 'urraca'],   otros: ['oso', 'arana'] }
      ] },

    { tipo: 'unir', id: 'un', titulo: '🔗 Unimos los que empiezan igual', instr: 'un_instr', no: 'un_no', fin: 'un_fin',
      grupoA: ['auto', 'enano', 'iglesia', 'oso', 'uva'],
      grupoB: ['arana', 'escoba', 'iguana', 'olla', 'urraca'] },

    { tipo: 'cierre', img: 'img/cierre.jpg', audio: 'cierre' }
  ]
};
