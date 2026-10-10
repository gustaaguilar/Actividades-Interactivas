// =========================================================
// datos.js — Sociedades Cooperativas (SIC)
// =========================================================

var DATA = {

  meta: {
    titulo: "Sociedades Cooperativas",
    subtitulo: "Sistemas de Información Contable",
    firma: "📸 Informática Educativa · Profe Gustavo Aguilar",
    foto: "img/profe.jpg",
    revision: false
  },

  portada: {
    imagen: "img/portada.jpg",
    titulo: "Sociedades Cooperativas"
  },

  concepto: {
    imagen: "img/concepto.jpg",
    audio: "audio/concepto_intro.mp3",
    texto: "Es una entidad fundada en el esfuerzo propio y la ayuda mutua, para organizar y prestar servicios. Las personas que forman esta clase de sociedad se unen con un alto sentido de la cooperación y se asocian en busca de un objetivo común entre ellas."
  },

  principios: {
    titulo: "Los 7 principios cooperativos",
    bajada: "Escuchá cada principio: primero su nombre y luego su definición.",
    audio_intro: "audio/principios_intro.mp3",
    items: [
      { nombre: "Asociación abierta y voluntaria", def: "Ingreso a la cooperativa de personas sin distinción de raza, credo o nivel educativo.", color: "#1a237e", audio: "audio/principio_1.mp3" },
      { nombre: "Control democrático", def: "Los asociados controlan las cooperativas. Democracia = un asociado = un voto.", color: "#311b92", audio: "audio/principio_2.mp3" },
      { nombre: "Participación económica de los asociados", def: "Capitalizar de manera equitativa, basados en los aportes, para recibir excedentes según la ley.", color: "#7b1fa2", audio: "audio/principio_3.mp3" },
      { nombre: "Educación", def: "Formación e información al asociado.", color: "#e53935", audio: "audio/principio_4.mp3" },
      { nombre: "Autonomía e independencia", def: "Libertad de gobernarse bajo sus propias normas.", color: "#e64a19", audio: "audio/principio_5.mp3" },
      { nombre: "Cooperación entre cooperativas", def: "Trabajar en equipo entre iguales.", color: "#b8860b", audio: "audio/principio_6.mp3" },
      { nombre: "Compromiso con la comunidad", def: "Velar por el desarrollo sostenible de la humanidad.", color: "#1b5e20", audio: "audio/principio_7.mp3" }
    ]
  },

  principiosAsoc: {
    titulo: "Uní principio y definición",
    consigna: "Tocá un principio y luego la definición que le corresponde.",
    audio: "audio/principios_asoc_consigna.mp3",
    pares: [
      { id: "p1", izq: "Asociación abierta y voluntaria", der: "Ingreso a la cooperativa de personas sin distinción de raza, credo o nivel educativo." },
      { id: "p6", izq: "Cooperación entre cooperativas", der: "Trabajar en equipo entre iguales." },
      { id: "p7", izq: "Compromiso con la comunidad", der: "Velar por el desarrollo sostenible de la humanidad." }
    ]
  },

  simbolos: {
    titulo: "Los símbolos del Cooperativismo",
    audio_intro: "audio/simbolos_intro.mp3",
    bajada: "Tocá cada pestaña y escuchá.",
    tabs: [
      { id: "bandera", label: "🏳️‍🌈 Bandera", audio: "audio/simbolos_bandera.mp3",
        texto: "La bandera del Cooperativismo fue aprobada en el año 1923 a nivel mundial por la Alianza Cooperativa Internacional (ACI). Son los 7 colores del prisma como elementos de la gran luz que ilumina al mundo. Debe ser el símbolo de alianza de todos los cooperativistas que sueñan y trabajan por una transformación social con una base de convivencia más justa." },
      { id: "colores", label: "🎨 Colores", audio: "audio/simbolos_colores.mp3", texto: "" },
      { id: "emblema", label: "🌲 Emblema", audio: "audio/simbolos_emblema.mp3",
        texto: "El emblema más usado, sobre todo en América, es un círculo color oro con 2 pinos verdes al centro, rodeados por una circunferencia verde. El oro representa al sol, cuyos rayos iluminan la vida. El verde simboliza la esperanza de una vida mejor. Los dos pinos representan la vida: al ser 2 simbolizan el apoyo mutuo y la solidaridad, y al ser del mismo tamaño, el crecimiento en la igualdad. El círculo representa la esfera terrestre (universalidad) y la circunferencia, la eternidad de la vida." },
      { id: "dia", label: "📅 Día mundial", audio: "audio/simbolos_dia.mp3",
        texto: "El Día Mundial del Cooperativismo se celebra todos los años el primer sábado del mes de julio." }
    ],
    colores: [
      { nombre: "Rojo", hex: "#e53935", significado: "El coraje y el valor" },
      { nombre: "Naranja", hex: "#fb8c00", significado: "La visión de futuro" },
      { nombre: "Amarillo", hex: "#fdd835", significado: "El desafío y el sol que da vida" },
      { nombre: "Verde", hex: "#43a047", significado: "El crecimiento de las personas" },
      { nombre: "Celeste", hex: "#4fc3f7", significado: "Los horizontes lejanos" },
      { nombre: "Azul", hex: "#1e40af", significado: "La reflexión y la cooperación" },
      { nombre: "Violeta", hex: "#8e24aa", significado: "La solidaridad, la belleza y la amistad" }
    ]
  },

  emblema: {
    titulo: "Reconocé el emblema",
    items: [
      { tipo: "svg", pregunta: "¿Cuál es el emblema del Cooperativismo?",
        audio: "audio/emblema_q1.mp3", audio_feedback: "audio/emblema_q1_fb.mp3",
        opciones: ["correcto", "unpino", "azul", "tres"], correcta: 0 },
      { pregunta: "¿Qué representan los dos pinos del emblema?",
        audio: "audio/emblema_q2.mp3", audio_feedback: "audio/emblema_q2_fb.mp3",
        opciones: ["La vida, el apoyo mutuo y la solidaridad", "El sol, cuyos rayos iluminan la vida", "La esperanza de una vida mejor", "La eternidad de la vida"], correcta: 0 },
      { pregunta: "¿Qué representa el círculo del emblema?",
        audio: "audio/emblema_q3.mp3", audio_feedback: "audio/emblema_q3_fb.mp3",
        opciones: ["La esfera terrestre: la universalidad", "El sol que ilumina la vida", "La esperanza de una vida mejor", "El capital de la cooperativa"], correcta: 0 }
    ]
  },

  coloresAsoc: {
    titulo: "Colores y significados",
    consigna: "Tocá un color de la bandera y luego su significado.",
    audio: "audio/colores_asoc_consigna.mp3"
  },

  legajos: [
    {
      id: "legajo1",
      titulo: "Legajo 1 — Identidad",
      imagen: "img/legajo1_identidad.jpg",
      items: [
        {
          audio: "audio/legajo1_q2.mp3",
          audio_feedback: "audio/legajo1_q2_fb.mp3",
          pregunta: "¿Cómo se divide el Capital de una Cooperativa?",
          opciones: [
            "En acciones ordinarias y preferidas",
            "En cuotas sociales indivisibles y de igual valor",
            "En bonos de participación",
            "En títulos de deuda"
          ],
          correcta: 1
        },
        {
          audio: "audio/legajo1_q3.mp3",
          audio_feedback: "audio/legajo1_q3_fb.mp3",
          pregunta: "¿Cuál es la duración de una Cooperativa?",
          opciones: ["99 años", "50 años renovables", "Ilimitada, sin plazo", "Depende del estatuto inicial"],
          correcta: 2
        },
        {
          audio: "audio/legajo1_q4.mp3",
          audio_feedback: "audio/legajo1_q4_fb.mp3",
          pregunta: "¿Qué debe incluir obligatoriamente el nombre de una Cooperativa?",
          opciones: ["S.A.", "S.R.L.", "\"Cooperativa Limitada\" o \"Soc. Coop. Ltda.\"", "Ninguna mención especial"],
          correcta: 2
        }
      ]
    },
    {
      id: "legajo2",
      titulo: "Legajo 2 — Constitución y Funcionamiento",
      imagen: "img/legajo2_constitucion.jpg",
      items: [
        {
          audio: "audio/legajo2_q1.mp3",
          audio_feedback: "audio/legajo2_q1_fb.mp3",
          pregunta: "¿Ante qué organismo se inscribe una Cooperativa?",
          opciones: ["IGJ", "INAES", "AFIP", "CNV"],
          correcta: 1
        },
        {
          audio: "audio/legajo2_q2.mp3",
          audio_feedback: "audio/legajo2_q2_fb.mp3",
          pregunta: "¿Qué NO puede ser el fin principal de una Cooperativa?",
          opciones: ["El bien común", "La ayuda mutua", "Una idea política o religiosa", "La prestación de servicios"],
          correcta: 2
        },
        {
          audio: "audio/legajo2_q3.mp3",
          audio_feedback: "audio/legajo2_q3_fb.mp3",
          pregunta: "¿Quién administra una Cooperativa?",
          opciones: [
            "Un Directorio elegido por accionistas",
            "Un Consejo de Administración elegido por los socios",
            "El Estado",
            "Un Gerente designado por ley"
          ],
          correcta: 1
        },
        {
          audio: "audio/legajo2_q4.mp3",
          audio_feedback: "audio/legajo2_q4_fb.mp3",
          pregunta: "¿Quién realiza la fiscalización interna?",
          opciones: [
            "Uno o más Síndicos elegidos entre los socios",
            "La AFIP",
            "Un Auditor Externo obligatorio",
            "El propio Consejo de Administración"
          ],
          correcta: 0
        }
      ]
    },
    {
      id: "legajo3",
      titulo: "Legajo 3 — Vida Institucional",
      imagen: "img/legajo3_vida_institucional.jpg",
      items: [
        {
          audio: "audio/legajo3_q1.mp3",
          audio_feedback: "audio/legajo3_q1_fb.mp3",
          pregunta: "¿Con cuánta anticipación deben convocarse las Asambleas?",
          opciones: ["48 horas", "7 días", "15 días", "30 días"],
          correcta: 2
        },
        {
          audio: "audio/legajo3_q2.mp3",
          audio_feedback: "audio/legajo3_q2_fb.mp3",
          pregunta: "¿Cómo vota cada Asociado?",
          opciones: [
            "Un voto por cada cuota social",
            "Un voto, sin importar sus cuotas sociales",
            "Voto proporcional al capital",
            "Solo votan los fundadores"
          ],
          correcta: 1
        },
        {
          audio: "audio/legajo3_q3.mp3",
          audio_feedback: "audio/legajo3_q3_fb.mp3",
          pregunta: "¿En base a qué se distribuyen los excedentes?",
          opciones: [
            "Las operaciones que cada socio realiza con la cooperativa",
            "Las acciones que posee",
            "Su antigüedad",
            "Un monto fijo igual para todos"
          ],
          correcta: 0
        }
      ]
    },
    {
      id: "legajo4",
      titulo: "Legajo 4 — Aspectos Patrimoniales y Legales",
      imagen: "img/legajo4_patrimonio.jpg",
      items: [
        {
          audio: "audio/legajo4_q1.mp3",
          audio_feedback: "audio/legajo4_q1_fb.mp3",
          pregunta: "¿Cuál es el límite de responsabilidad de los Asociados?",
          opciones: ["Ilimitada", "Limitada al monto de sus cuotas sociales", "No tienen responsabilidad", "Limitada al doble de su aporte"],
          correcta: 1
        },
        {
          audio: "audio/legajo4_q2.mp3",
          audio_feedback: "audio/legajo4_q2_fb.mp3",
          pregunta: "¿Qué porcentaje mínimo de los excedentes debe reservarse?",
          opciones: ["2%", "5%", "10%", "20%"],
          correcta: 1
        },
        {
          audio: "audio/legajo4_q4.mp3",
          audio_feedback: "audio/legajo4_q4_fb.mp3",
          pregunta: "¿Qué ley regula a las Cooperativas en Argentina?",
          opciones: ["Ley 19.550", "Ley 20.337", "Ley 24.240", "Ley 11.723"],
          correcta: 1
        }
      ]
    }
  ],

  casos: {
    titulo: "¿Qué tipo de Cooperativa es?",
    audio_consigna: "audio/casos_consigna.mp3",
    clases: ["Consumo", "Trabajo", "Seguros", "Crédito", "Servicios Públicos", "Edificación"],
    items: [
      {
        audio: "audio/caso1.mp3",
        audio_acierto: "audio/caso_acierto_consumo.mp3",
        imagen: "img/caso1_consumo.jpg",
        texto: "Familias se asocian para comprar alimentos al por mayor y vendérselos a precio de costo entre ellas.",
        correcta: 0
      },
      {
        audio: "audio/caso2.mp3",
        audio_acierto: "audio/caso_acierto_trabajo.mp3",
        imagen: "img/caso2_trabajo.jpg",
        texto: "Un grupo de albañiles se asocia para conseguir y repartirse changas de construcción.",
        correcta: 1
      },
      {
        audio: "audio/caso3.mp3",
        audio_acierto: "audio/caso_acierto_seguros.mp3",
        imagen: "img/caso3_seguros.jpg",
        texto: "Una entidad cobra pólizas a sus asociados para cubrirlos ante siniestros de auto.",
        correcta: 2
      },
      {
        audio: "audio/caso4.mp3",
        audio_acierto: "audio/caso_acierto_credito.mp3",
        imagen: "img/caso4_credito.jpg",
        texto: "Se otorgan préstamos a los socios con el capital que ellos mismos aportaron.",
        correcta: 3
      },
      {
        audio: "audio/caso5.mp3",
        audio_acierto: "audio/caso_acierto_servicios.mp3",
        imagen: "img/caso5_servicios.jpg",
        texto: "Se brinda el servicio de electricidad a un pueblo sin red estatal.",
        correcta: 4
      },
      {
        audio: "audio/caso6.mp3",
        audio_acierto: "audio/caso_acierto_edificacion.mp3",
        imagen: "img/caso6_edificacion.jpg",
        texto: "Familias se organizan para construir sus viviendas propias en conjunto.",
        correcta: 5
      }
    ]
  },

  sopas: [
    {
      id: "sopa1",
      titulo: "Sopa de Letras — Características",
      imagen: "img/sopa1_header.jpg",
      audio_consigna: "audio/sopa_consigna.mp3",
      palabras: [
        { palabra: "SOCIOS", audio: "audio/palabra_socios.mp3" },
        { palabra: "CAPITAL", audio: "audio/palabra_capital.mp3" },
        { palabra: "ASAMBLEA", audio: "audio/palabra_asamblea.mp3" },
        { palabra: "SINDICO", audio: "audio/palabra_sindico.mp3" },
        { palabra: "RESERVA", audio: "audio/palabra_reserva.mp3" },
        { palabra: "ESTATUTO", audio: "audio/palabra_estatuto.mp3" },
        { palabra: "EXCEDENTE", audio: "audio/palabra_excedente.mp3" },
        { palabra: "INAES", audio: "audio/palabra_inaes.mp3" }
      ]
    },
    {
      id: "sopa2",
      titulo: "Sopa de Letras — Clases de Cooperativas",
      imagen: "img/sopa2_header.jpg",
      audio_consigna: "audio/sopa_consigna.mp3",
      palabras: [
        { palabra: "CONSUMO", audio: "audio/palabra_consumo.mp3" },
        { palabra: "TRABAJO", audio: "audio/palabra_trabajo.mp3" },
        { palabra: "SEGUROS", audio: "audio/palabra_seguros.mp3" },
        { palabra: "CREDITO", audio: "audio/palabra_credito.mp3" },
        { palabra: "EDIFICACION", audio: "audio/palabra_edificacion.mp3" },
        { palabra: "SERVICIOS", audio: "audio/palabra_servicios.mp3" }
      ]
    }
  ],

  puzzles: [
    {
      id: "puzzleA",
      titulo: "Puzzle de Definiciones — Parte 1",
      imagen: "img/puzzle_tandaA.jpg",
      pares: [
        { termino: "Excedente", definicion: "Utilidad que se distribuye según las operaciones que cada socio realiza con la cooperativa.", audio: "audio/def_excedente.mp3" },
        { termino: "Síndico", definicion: "Encargado de la fiscalización, elegido entre los socios.", audio: "audio/def_sindico.mp3" },
        { termino: "Cuota Social", definicion: "Unidad indivisible en la que se divide el capital.", audio: "audio/def_cuota_social.mp3" },
        { termino: "Estatuto", definicion: "Conjunto de normas que rigen el funcionamiento interno.", audio: "audio/def_estatuto.mp3" }
      ]
    },
    {
      id: "puzzleB",
      titulo: "Puzzle de Definiciones — Parte 2",
      imagen: "img/puzzle_tandaB.jpg",
      pares: [
        { termino: "Asamblea", definicion: "Reunión de socios donde se deciden los asuntos sociales.", audio: "audio/def_asamblea.mp3" },
        { termino: "I.N.A.E.S.", definicion: "Organismo donde se inscribe la Cooperativa al constituirse.", audio: "audio/def_inaes.mp3" },
        { termino: "Reserva", definicion: "Parte del excedente que no es distribuible, con un mínimo del 5%.", audio: "audio/def_reserva.mp3" },
        { termino: "Consejo de Administración", definicion: "Órgano que administra la cooperativa, elegido por los socios.", audio: "audio/def_consejo_admin.mp3" }
      ]
    }
  ],

  quiz: [
    {
      pregunta: "¿Qué es una Cooperativa?",
      imagen: "img/concepto.jpg",
      audio: "audio/quiz_q1_preg.mp3",
      audio_feedback: "audio/quiz_q1_fb.mp3",
      opciones: [
        "Una entidad fundada en el esfuerzo propio y la ayuda mutua",
        "Una empresa que busca el lucro de sus accionistas",
        "Un organismo estatal",
        "Una asociación política"
      ],
      correcta: 0
    },
    {
      pregunta: "Un grupo de personas compra alimentos al por mayor para vendérselos entre sí a precio de costo. ¿Qué tipo de Cooperativa es?",
      imagen: "img/caso1_consumo.jpg",
      audio: "audio/quiz_q3_preg.mp3",
      audio_feedback: "audio/caso_acierto_consumo.mp3",
      opciones: ["Trabajo", "Crédito", "Consumo", "Seguros"],
      correcta: 2
    },
    {
      pregunta: "Un grupo de albañiles se organiza para repartirse changas de construcción. ¿Qué tipo de Cooperativa es?",
      imagen: "img/caso2_trabajo.jpg",
      audio: "audio/quiz_q4_preg.mp3",
      audio_feedback: "audio/caso_acierto_trabajo.mp3",
      opciones: ["Trabajo", "Edificación", "Servicios Públicos", "Consumo"],
      correcta: 0
    },
    {
      pregunta: "¿Qué porcentaje mínimo de los excedentes debe reservarse?",
      imagen: "img/quiz_q5_reserva.jpg",
      audio: "audio/quiz_q5_preg.mp3",
      audio_feedback: "audio/quiz_q5_fb.mp3",
      opciones: ["2%", "5%", "10%", "20%"],
      correcta: 1
    },
    {
      pregunta: "¿Qué ley regula a las Cooperativas en Argentina?",
      imagen: "img/quiz_q6_ley.jpg",
      audio: "audio/quiz_q6_preg.mp3",
      audio_feedback: "audio/quiz_q6_fb.mp3",
      opciones: ["Ley 19.550", "Ley 24.240", "Ley 20.337", "Ley 11.723"],
      correcta: 2
    }
  ],

  cierre: {
    imagen: "img/cierre.jpg",
    audio: "audio/cierre_mensaje.mp3",
    mensaje: "¡Muy bien! Completaste el recorrido por las Sociedades Cooperativas.",
    video: {
      texto: "Cooperativas que transforman residuos en trabajo",
      bajada: "Conocé cómo cooperativistas de Las Heras y Guaymallén generan empleo e inclusión reciclando materiales, bajo la Ley GIRSU N° 9659. Economía social y cuidado ambiental, en acción.",
      boton: "▶ Ver video",
      url: "https://www.instagram.com/reel/DaeJoA8xwfG/?igsh=MWxnaTY1ZXMwcTc1NQ==",
      audio_texto: "audio/cierre_video_texto.mp3",
      audio_boton: "audio/cierre_boton.mp3"
    }
  }

};


// =========================================================
// AUDIO_TEXTOS — texto de los audios NUEVOS (pantallas de principios y símbolos)
// De acá se genera el script de Colab (nunca se tipea a mano).
// =========================================================
var AUDIO_TEXTOS = {
  "audio/principios_intro.mp3": "Estos son los siete principios cooperativos. Escuchá atentamente cada uno.",
  "audio/principio_1.mp3": "Principio uno: Asociación abierta y voluntaria. Ingreso a la cooperativa de personas sin distinción de raza, credo o nivel educativo.",
  "audio/principio_2.mp3": "Principio dos: Control democrático. Los asociados controlan las cooperativas. Democracia: un asociado, un voto.",
  "audio/principio_3.mp3": "Principio tres: Participación económica de los asociados. Capitalizar de manera equitativa, basados en los aportes, para recibir excedentes según la ley.",
  "audio/principio_4.mp3": "Principio cuatro: Educación. Formación e información al asociado.",
  "audio/principio_5.mp3": "Principio cinco: Autonomía e independencia. Libertad de gobernarse bajo sus propias normas.",
  "audio/principio_6.mp3": "Principio seis: Cooperación entre cooperativas. Trabajar en equipo entre iguales.",
  "audio/principio_7.mp3": "Principio siete: Compromiso con la comunidad. Velar por el desarrollo sostenible de la humanidad.",
  "audio/principios_asoc_consigna.mp3": "Uní cada principio cooperativo con su definición. Tocá un principio y luego la definición que le corresponde.",
  "audio/simbolos_intro.mp3": "Conocé los símbolos del Cooperativismo. Tocá cada pestaña y escuchá.",
  "audio/simbolos_bandera.mp3": "La bandera del Cooperativismo fue aprobada en el año mil novecientos veintitrés, a nivel mundial, por la Alianza Cooperativa Internacional. Son los siete colores del prisma, como elementos de la gran luz que ilumina al mundo. Debe ser el símbolo de alianza de todos los cooperativistas que sueñan y trabajan por una transformación social, con una base de convivencia más justa.",
  "audio/simbolos_colores.mp3": "Significado de los colores del arcoíris clásico. Rojo: el coraje y el valor. Naranja: la visión de futuro. Amarillo: el desafío y el sol que da vida. Verde: el crecimiento de las personas. Celeste: los horizontes lejanos. Azul: la reflexión y la cooperación. Violeta: la solidaridad, la belleza y la amistad.",
  "audio/simbolos_emblema.mp3": "El emblema más usado, sobre todo en América, es un círculo color oro con dos pinos verdes al centro, rodeados por una circunferencia verde. El oro representa al sol, cuyos rayos iluminan la vida. El verde simboliza la esperanza de una vida mejor. Los dos pinos representan la vida: al ser dos, simbolizan el apoyo mutuo y la solidaridad, y al ser del mismo tamaño, el crecimiento en la igualdad. El círculo representa la esfera terrestre, es decir, la universalidad, y la circunferencia representa la eternidad de la vida.",
  "audio/simbolos_dia.mp3": "El Día Mundial del Cooperativismo se celebra todos los años el primer sábado del mes de julio.",
  "audio/emblema_q1.mp3": "¿Cuál es el emblema del Cooperativismo?",
  "audio/emblema_q1_fb.mp3": "La respuesta correcta es el círculo color oro con dos pinos verdes del mismo tamaño.",
  "audio/emblema_q2.mp3": "¿Qué representan los dos pinos del emblema?",
  "audio/emblema_q2_fb.mp3": "Los dos pinos representan la vida: al ser dos, simbolizan el apoyo mutuo y la solidaridad, y al ser del mismo tamaño, el crecimiento en la igualdad.",
  "audio/emblema_q3.mp3": "¿Qué representa el círculo del emblema?",
  "audio/emblema_q3_fb.mp3": "El círculo representa la esfera terrestre, reflejando así el concepto de universalidad.",
  "audio/colores_asoc_consigna.mp3": "Uní cada color de la bandera con su significado. Tocá un color y luego el significado que le corresponde."
};
