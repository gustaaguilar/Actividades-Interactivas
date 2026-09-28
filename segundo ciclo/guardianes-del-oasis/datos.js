// ============================================================
//  GUARDIANES DEL OASIS — Cs. Sociales 6° grado
//  Oasis de Mendoza · Barreras sanitarias · Plagas ·
//  Control biológico · Técnica del Insecto Estéril (ISCAMEN)
//  Basado en: Plan mensual N° 6 Septiembre 2026 — 6° A-B-C
//  (Cintia Villegas, Romina Olmos, Noelia Navarro)
// ============================================================
var DATOS = {
  meta: {
    titulo: "Guardianes del Oasis",
    subtitulo: "Oasis de Mendoza, barreras sanitarias, plagas y la técnica del insecto estéril",
    etiqueta: "Ciencias Sociales · Segundo Ciclo · 6° grado",
    portada: "img/portada.jpg",
    cierreImg: "img/cierre.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg"
  },

  // Audios globales (se generan igual que el resto)
  globales: {
    error: "Mmm, esa no es. Pensalo de nuevo y probá otra vez.",
    lupaMapa: "Para ver el mapa bien de cerca, tocá la lupa. Podés recorrerlo con el dedo y, cuando termines, cerralo con la cruz.",
    lupaImg: "Para ver la imagen bien de cerca, tocá la lupa. Podés recorrerla con el dedo y, cuando termines, cerrala con la cruz.",
    cierre: "¡Felicitaciones, guardián del oasis! Ya sabés cómo se formaron los oasis de Mendoza, por qué existen las barreras sanitarias y cómo el ISCAMEN combate la mosca del Mediterráneo con la técnica del insecto estéril."
  },

  pantallas: [

    // ---------------- OASIS ----------------
    {
      id: "oasis_que_es", tipo: "narracion", modo: "svg", escena: "oasis",
      titulo: "¿Qué es un oasis?",
      inst: "Mirá y escuchá cómo se forma un oasis en Mendoza.",
      pasos: [
        { x: 18, y: 64, mostrar: "desierto", texto: "Mendoza tiene un clima árido: la mayor parte de su territorio es seco, casi un desierto." },
        { x: 80, y: 16, mostrar: "rio", texto: "Desde la cordillera de los Andes bajan ríos de montaña, alimentados por la nieve que se derrite." },
        { x: 66, y: 34, mostrar: "dique", texto: "Los diques de embalse regulan el agua de los ríos y generan energía eléctrica." },
        { x: 50, y: 58, mostrar: "canales", texto: "En el llano, canales y acequias conducen el agua hasta los cultivos." },
        { x: 40, y: 66, mostrar: "verde", texto: "Así nace un oasis: una zona irrigada artificialmente gracias al trabajo humano." },
        { x: 30, y: 50, mostrar: "ciudad", texto: "Los oasis ocupan menos del cuatro por ciento de la provincia, pero allí vive casi el noventa y cinco por ciento de la población." }
      ]
    },

    {
      id: "oasis_trivia", tipo: "trivia", img: "img/oasis_aereo.jpg",
      titulo: "Oasis en números",
      inst: "Leé cada pregunta y tocá la respuesta correcta.",
      preguntas: [
        { q: "¿Qué es un oasis en Mendoza?",
          ops: ["Una zona irrigada artificialmente por el trabajo humano", "Un lago natural en medio de la montaña", "Un bosque que crece sin necesidad de riego", "Una zona de desierto sin habitantes"], ok: 0,
          conf: "¡Exacto! Los oasis mendocinos son zonas regadas artificialmente: las personas llevaron el agua de los ríos por canales y acequias." },
        { q: "¿Qué parte del territorio provincial ocupan los oasis?",
          ops: ["Menos del 4%", "Cerca del 50%", "El 95%", "Más del 80%"], ok: 0,
          conf: "Muy bien. Los oasis ocupan menos del cuatro por ciento de Mendoza: una porción muy pequeña del territorio." },
        { q: "¿Qué parte de la población vive en los oasis?",
          ops: ["Casi el 95%", "Cerca del 10%", "La mitad", "Menos del 4%"], ok: 0,
          conf: "¡Así es! Casi el noventa y cinco por ciento de los mendocinos vive en los oasis. En las tierras secas la población es escasa y dispersa." },
        { q: "¿Qué condiciones naturales favorecen a los oasis?",
          ops: ["Suelos fértiles, terreno llano e insolación adecuada", "Lluvias abundantes durante todo el año", "Nieve permanente en el llano", "Selvas húmedas y ríos de llanura"], ok: 0,
          conf: "Correcto. En los oasis se combinan suelos fértiles, terreno llano y buena insolación con el esfuerzo de las personas." }
      ]
    },

    {
      id: "oasis_mapa", lupa: "mapa", tipo: "hotspot", img: "img/mapa_oasis.jpg",
      titulo: "Los oasis de Mendoza",
      inst: "Tocá cada marcador del mapa para conocer los oasis de Mendoza.",
      marcadores: [
        { x: 35, y: 20, etq: "1", titulo: "Oasis Norte", texto: "Es el más extenso. Lo riegan los ríos Mendoza y Tunuyán inferior. Abarca Capital, Godoy Cruz, Guaymallén, Las Heras, Maipú, Luján de Cuyo, Lavalle, Junín, La Paz, Rivadavia, San Martín y Santa Rosa." },
        { x: 25, y: 30, etq: "2", titulo: "Oasis Centro o Valle de Uco", texto: "Se forma a partir del río Tunuyán superior. Comprende los departamentos de Tupungato, Tunuyán y San Carlos." },
        { x: 46, y: 53, etq: "3", titulo: "Oasis Sur", texto: "Lo riegan los ríos Diamante y Atuel. Lo forman los departamentos de San Rafael y General Alvear." },
        { x: 18, y: 60, etq: "4", titulo: "Oasis de Malargüe", texto: "Es un pequeño oasis del sur de la provincia, abastecido por el río Malargüe." }
      ]
    },

    {
      id: "oasis_rios", lupa: "mapa", tipo: "asociar", img: "img/hidrografia.jpg",
      titulo: "Cada oasis con sus ríos",
      inst: "Uní cada oasis con los ríos que lo riegan. Tocá un oasis y después sus ríos.",
      pares: [
        { a: "Oasis Norte", b: "Ríos Mendoza y Tunuyán inferior", conf: "El Oasis Norte se riega con los ríos Mendoza y Tunuyán inferior." },
        { a: "Valle de Uco", b: "Río Tunuyán superior", conf: "El Valle de Uco nace del río Tunuyán superior." },
        { a: "Oasis Sur", b: "Ríos Diamante y Atuel", conf: "El Oasis Sur recibe el agua de los ríos Diamante y Atuel." },
        { a: "Oasis de Malargüe", b: "Río Malargüe", conf: "El pequeño oasis de Malargüe se abastece del río Malargüe." }
      ]
    },

    {
      id: "oasis_deptos", lupa: "mapa", tipo: "clasificar", img: "img/mapa_oasis.jpg",
      titulo: "¿A qué oasis pertenece?",
      inst: "Tocá el departamento para escucharlo y después elegí a qué oasis pertenece.",
      categorias: ["Oasis Norte", "Valle de Uco", "Oasis Sur"],
      items: [
        { t: "Maipú", cat: 0 }, { t: "Luján de Cuyo", cat: 0 }, { t: "Lavalle", cat: 0 },
        { t: "San Martín", cat: 0 }, { t: "Tupungato", cat: 1 }, { t: "Tunuyán", cat: 1 },
        { t: "San Carlos", cat: 1 }, { t: "San Rafael", cat: 2 }, { t: "General Alvear", cat: 2 }
      ],
      fin: "¡Muy bien! Ya ubicás los departamentos de cada oasis: el Norte, el Valle de Uco y el Sur."
    },

    {
      id: "oasis_historia", tipo: "ordenar", img: "img/historia_riego.jpg",
      titulo: "La cultura del agua",
      inst: "Ordená la historia del riego en Mendoza. Tocá los hechos desde el más antiguo hasta el más reciente.",
      items: [
        { t: "Los huarpes riegan con una acequia principal, el actual canal Guaymallén", ico: "🪶" },
        { t: "Los españoles amplían las zonas regadas", ico: "⛪" },
        { t: "Nuevos desarrollos perfeccionan la tecnología del riego", ico: "⚙️" },
        { t: "Hoy los diques regulan los ríos y generan energía", ico: "⚡" }
      ],
      fin: "¡Excelente! Desde los huarpes, con técnicas heredadas de la tradición inca, hasta los diques actuales: así se construyó la cultura del agua que todavía acompaña a los mendocinos."
    },

    {
      id: "oasis_vf", tipo: "vf",
      titulo: "¿Verdadero o falso?",
      inst: "Leé cada afirmación y tocá Verdadero o Falso.",
      afirmaciones: [
        { img: "img/vf_oasis_1.jpg", t: "El Oasis Norte es el más extenso de Mendoza.", v: true,
          conf: "Verdadero. El Oasis Norte es el más grande y lo riegan los ríos Mendoza y Tunuyán." },
        { img: "img/vf_oasis_2.jpg", t: "Fuera de los oasis, en las tierras secas, la población es escasa y dispersa.", v: true,
          conf: "Verdadero. Casi toda la población se concentra en los oasis; en el secano vive muy poca gente." },
        { img: "img/vf_oasis_3.jpg", t: "Como en Mendoza el agua sobra, no hace falta cuidarla.", v: false,
          conf: "Falso. En Mendoza el agua es un recurso escaso, y su cuidado nos corresponde a todos." },
        { img: "img/vf_oasis_4.jpg", t: "La economía de los oasis depende de los cultivos bajo riego: viñedos, olivos, frutales y hortalizas.", v: true,
          conf: "Verdadero. Viñedos, olivos, árboles frutales y hortalizas, con sus industrias, sostienen la economía de los oasis." },
        { img: "img/vf_oasis_5.jpg", t: "Todos los oasis producen exactamente los mismos cultivos.", v: false,
          conf: "Falso. La vid está en todos, pero cada oasis tiene sus propias producciones según su suelo, su clima y su agua." }
      ]
    },

    // ---------------- BARRERAS SANITARIAS ----------------
    {
      id: "barreras_que_son", tipo: "narracion", modo: "tarjetas", img: "img/barrera.jpg",
      titulo: "Barreras sanitarias",
      inst: "Escuchá qué son las barreras sanitarias y para qué sirven.",
      pasos: [
        { ico: "🛣️", etq: "Rutas y aeropuertos", texto: "Mendoza tiene barreras sanitarias en las rutas de ingreso a la provincia y en los aeropuertos." },
        { ico: "🔍", etq: "Inspección", texto: "Allí, inspectores del ISCAMEN revisan los vehículos y el equipaje." },
        { ico: "🍑", etq: "Frutas y plantas", texto: "Buscan frutas, hortalizas y plantas que puedan traer plagas desde otras provincias." },
        { ico: "🚫", etq: "No pueden pasar", texto: "Los productos que pueden portar plagas no pueden ingresar." },
        { ico: "🛡️", etq: "Protección", texto: "Así se protege la producción de los oasis, el trabajo de los productores y la venta de frutas a otros países." }
      ]
    },

    {
      id: "barreras_mapa", lupa: "mapa", tipo: "hotspot", img: "img/puestos.jpg",
      titulo: "Puestos de control",
      inst: "Tocá cada número para conocer los puestos de control de Mendoza. En el mapa, la zona violeta es área libre de mosca del Mediterráneo.",
      marcadores: [
        { x: 50.5, y: 25.6, etq: "1", titulo: "San José", texto: "Controla a quienes llegan desde el norte, desde la provincia de San Juan." },
        { x: 61.6, y: 25.8, etq: "2", titulo: "El Puerto", texto: "Vigila otro de los ingresos por el norte de la provincia." },
        { x: 42.3, y: 30.2, etq: "3", titulo: "Aeropuerto El Plumerillo", texto: "En el aeropuerto también se revisan las valijas de quienes llegan en avión." },
        { x: 74.6, y: 38.8, etq: "4", titulo: "Desaguadero", texto: "Está en el límite con San Luis, sobre la Ruta Nacional 7. Es uno de los ingresos con más tránsito." },
        { x: 74.6, y: 46.7, etq: "5", titulo: "La Horqueta", texto: "Controla otro ingreso por el este de la provincia." },
        { x: 77.7, y: 58.2, etq: "6", titulo: "Canalejas", texto: "Protege el ingreso por el sudeste, en el departamento de General Alvear." },
        { x: 67.9, y: 65.4, etq: "7", titulo: "Cochicó", texto: "Vigila el ingreso desde La Pampa, en el sur de la provincia." },
        { x: 50.7, y: 50.9, etq: "8", titulo: "Aeropuerto de San Rafael", texto: "Controla a los pasajeros que llegan en avión al Oasis Sur." }
      ]
    },

    {
      id: "barreras_actitudes", tipo: "clasificar",
      titulo: "Actitudes en la barrera",
      inst: "Tocá cada situación para escucharla y decidí si es una actitud positiva o negativa.",
      categorias: ["👍 Positiva", "👎 Negativa"],
      items: [
        { img: "img/act_1.jpg", t: "Declarar las frutas que llevo en el auto", cat: 0, conf: "Positiva. Declarar ayuda a los inspectores a cuidar la producción de Mendoza." },
        { img: "img/act_2.jpg", t: "Esconder duraznos en la valija para pasar el control", cat: 1, conf: "Negativa. Una sola fruta escondida puede traer larvas de mosca y dañar muchas plantaciones." },
        { img: "img/act_3.jpg", t: "Comer o descartar la fruta antes de llegar a la barrera", cat: 0, conf: "Positiva. Así no se ingresa ningún producto que pueda traer plagas." },
        { img: "img/act_4.jpg", t: "Enojarse con el inspector y no dejar revisar el vehículo", cat: 1, conf: "Negativa. El inspector cuida el trabajo de miles de productores: hay que respetar su tarea." },
        { img: "img/act_5.jpg", t: "Traer plantas de otra provincia sin permiso", cat: 1, conf: "Negativa. Las plantas también pueden transportar plagas y enfermedades." },
        { img: "img/act_6.jpg", t: "Contarle a mi familia por qué existen las barreras", cat: 0, conf: "Positiva. Cuanta más gente entiende las barreras, mejor se protege la provincia." }
      ],
      fin: "¡Muy bien! Las actitudes negativas en la barrera pueden dañar el ecosistema, la agricultura, el comercio y hasta la salud."
    },

    {
      id: "barreras_trivia", tipo: "trivia", img: "img/barrera.jpg",
      titulo: "¿Para qué sirven?",
      inst: "Leé cada pregunta y tocá la respuesta correcta.",
      preguntas: [
        { q: "¿Para qué sirven las barreras sanitarias?",
          ops: ["Para evitar el ingreso de plagas a la provincia", "Para cobrar peaje a los turistas", "Para controlar la velocidad de los autos", "Para vender frutas regionales"], ok: 0,
          conf: "¡Exacto! Las barreras sanitarias evitan que ingresen plagas y productos en forma irregular." },
        { q: "¿Qué organismo se encarga de las barreras sanitarias en Mendoza?",
          ops: ["El ISCAMEN", "El Departamento General de Irrigación", "La Dirección de Vialidad", "El Correo Argentino"], ok: 0,
          conf: "Muy bien. El ISCAMEN, Instituto de Sanidad y Calidad Agropecuaria Mendoza, controla las barreras sanitarias." },
        { q: "Si una plaga entra a los oasis, ¿a quiénes perjudica?",
          ops: ["A los productores, al comercio y a toda la provincia", "Solamente a los turistas", "A nadie, porque las plagas no viajan", "Únicamente a los inspectores"], ok: 0,
          conf: "Correcto. Una plaga daña las cosechas, el trabajo de los productores y la venta de frutas: nos afecta a todos." }
      ]
    },

    // ---------------- PLAGAS ----------------
    {
      id: "plagas_que_son", tipo: "narracion", modo: "tarjetas", img: "img/plaga.jpg",
      titulo: "¿Qué es una plaga?",
      inst: "Escuchá qué son las plagas y cómo se combaten.",
      pasos: [
        { ico: "🐛", etq: "Plaga", texto: "En la agricultura, una plaga es cualquier animal, microorganismo o planta que perjudica la producción agrícola." },
        { ico: "🧳", etq: "Viajan con las personas", texto: "Muchas plagas llegan por la acción humana, por ejemplo cuando se ingresan frutas sin respetar la prohibición." },
        { ico: "🌊", etq: "Mosca del Mediterráneo", texto: "Un ejemplo es la mosca del Mediterráneo: como dice su nombre, es originaria de la zona del mar Mediterráneo." },
        { ico: "🧪", etq: "Agroquímicos", texto: "Durante mucho tiempo solo se usaron agroquímicos. Su mal uso contamina el ambiente y puede dañar la salud." },
        { ico: "🌿", etq: "Manejo Integrado", texto: "Hoy se propone el Manejo Integrado de Plagas: usar lo mínimo de agroquímicos y herramientas amigables con el ambiente." }
      ]
    },

    {
      id: "plagas_agroquimicos", tipo: "vf",
      titulo: "Agroquímicos con responsabilidad",
      inst: "Leé cada afirmación sobre el uso de agroquímicos y tocá Verdadero o Falso.",
      afirmaciones: [
        { img: "img/agro_1.jpg", t: "Quien aplica agroquímicos debe usar guantes, máscara, botas y capote.", v: true,
          conf: "Verdadero. El equipo de protección cuida la salud de quien trabaja en el campo." },
        { img: "img/agro_2.jpg", t: "Los envases vacíos de agroquímicos se pueden reutilizar para guardar agua.", v: false,
          conf: "Falso. Los envases se enjuagan, se destruyen y se entregan en centros de acopio. Nunca se reutilizan ni se abandonan." },
        { img: "img/agro_3.jpg", t: "La lluvia y el riego pueden arrastrar agroquímicos hasta ríos y aguas subterráneas.", v: true,
          conf: "Verdadero. Por eso el mal uso de agroquímicos también contamina el agua." },
        { img: "img/agro_4.jpg", t: "Conviene usar el agroquímico más fuerte, aunque mate a las vaquitas.", v: false,
          conf: "Falso. Se usan productos de baja toxicidad y específicos para cada plaga, para no destruir a los controladores biológicos como las vaquitas." },
        { img: "img/agro_5.jpg", t: "Después de aplicar, hay que esperar el tiempo indicado antes de cosechar.", v: true,
          conf: "Verdadero. Respetar los tiempos de espera evita que queden residuos en las frutas y hortalizas." }
      ]
    },

    {
      id: "control_biologico", tipo: "narracion", modo: "tarjetas", img: "img/vaquita.jpg",
      titulo: "Control biológico",
      inst: "Escuchá en qué consiste el control biológico de plagas.",
      pasos: [
        { ico: "🐞", etq: "Organismos vivos", texto: "El control biológico usa organismos vivos para controlar las poblaciones de otros organismos." },
        { ico: "🍃", etq: "Sin agroquímicos", texto: "Es amigable con el ambiente y permite evitar el uso de agroquímicos." },
        { ico: "🎯", etq: "Específico", texto: "Es específico para cada plaga y no afecta a los insectos benéficos del ecosistema." },
        { ico: "🦗", etq: "Enemigos naturales", texto: "Utiliza enemigos naturales: insectos depredadores o parasitoides de la plaga, que son inofensivos para la plantación." }
      ]
    },

    {
      id: "metodos_clasificar", tipo: "clasificar",
      titulo: "¿Amigable o contaminante?",
      inst: "Tocá cada método para escucharlo y decidí si es amigable con el ambiente o contaminante.",
      categorias: ["🌿 Amigable", "☠️ Contaminante"],
      items: [
        { img: "img/met_1.jpg", t: "Técnica del insecto estéril", cat: 0, conf: "Amigable. La técnica del insecto estéril controla la mosca sin usar venenos." },
        { img: "img/met_2.jpg", t: "Feromonas de confusión sexual", cat: 0, conf: "Amigable. Las feromonas confunden a los insectos para que no se reproduzcan." },
        { img: "img/met_3.jpg", t: "Vaquitas que comen pulgones", cat: 0, conf: "Amigable. Es control biológico: un enemigo natural se come a la plaga." },
        { img: "img/met_4.jpg", t: "Rociar agroquímicos en exceso y sin protección", cat: 1, conf: "Contaminante. El exceso de agroquímicos daña el ambiente y la salud." },
        { img: "img/met_5.jpg", t: "Abandonar envases de agroquímicos en el campo", cat: 1, conf: "Contaminante. Los envases abandonados contaminan el suelo y el agua." },
        { img: "img/met_6.jpg", t: "Usar máquinas aplicadoras sin calibrar", cat: 1, conf: "Contaminante. Una máquina sin calibrar tira más producto del necesario." }
      ],
      fin: "¡Muy bien! La tendencia actual es elegir métodos amigables, como el control biológico y la técnica del insecto estéril."
    },

    {
      id: "conceptos_asociar", tipo: "asociar", img: "img/plaga.jpg",
      titulo: "Conceptos clave",
      inst: "Uní cada concepto con su significado. Tocá un concepto y después su definición.",
      pares: [
        { a: "Plaga", b: "Organismo que perjudica la producción agrícola", conf: "Plaga: organismo que perjudica la producción agrícola." },
        { a: "MIP", sub: "Manejo Integrado de Plagas", b: "Reducir al mínimo el uso de agroquímicos", conf: "El Manejo Integrado de Plagas busca reducir al mínimo los agroquímicos." },
        { a: "Control biológico", b: "Usar organismos vivos contra una plaga", conf: "El control biológico usa organismos vivos contra la plaga." },
        { a: "TIE", sub: "Técnica del Insecto Estéril", b: "Liberar machos estériles de mosca", conf: "La técnica del insecto estéril libera machos estériles." },
        { a: "Autocida", b: "Usar la misma plaga para controlarla", conf: "Autocida: se usan ejemplares estériles de la plaga para controlar a la misma plaga." }
      ]
    },

    {
      id: "sopa_letras", tipo: "sopa", img: "img/plaga.jpg",
      titulo: "Sopa de letras",
      inst: "Buscá las palabras escondidas. Tocá la primera letra y después la última de cada palabra.",
      palabras: [
        { w: "OASIS", decir: "Oasis" }, { w: "PLAGA", decir: "Plaga" }, { w: "BARRERA", decir: "Barrera" },
        { w: "ISCAMEN", decir: "Iscamen" }, { w: "PUPA", decir: "Pupa" }, { w: "LARVA", decir: "Larva" },
        { w: "ESTERIL", decir: "Estéril" }, { w: "ACEQUIA", decir: "Acequia" }
      ],
      tam: 10,
      fin: "¡Encontraste todas las palabras! Oasis, plaga, barrera, Iscamen, pupa, larva, estéril y acequia."
    },

    // ---------------- MOSCA Y TIE ----------------
    {
      id: "ciclo_ordenar", tipo: "ordenar", img: "img/ciclo_completo.jpg", sinFig: true,
      titulo: "El ciclo de la mosca",
      inst: "Ordená el ciclo biológico natural de la mosca del Mediterráneo. Empezá por el primer estado.",
      items: [
        { t: "Huevos", img: "img/ciclo_huevo.jpg", decir: "Huevos. La hembra los pone bajo la cáscara de la fruta sana." },
        { t: "Larvas", img: "img/ciclo_larva.jpg", decir: "Larvas. Se alimentan de la pulpa y dañan la fruta." },
        { t: "Pupas", img: "img/ciclo_pupa.jpg", decir: "Pupas. Las larvas maduran, caen al suelo y forman pupas en la tierra." },
        { t: "Moscas adultas", img: "img/ciclo_adulto.jpg", decir: "Moscas adultas. Emergen de las pupas, se aparean y el ciclo comienza otra vez." }
      ],
      fin: "¡Muy bien! Huevo, larva, pupa y adulto: ese es el ciclo biológico de la mosca del Mediterráneo."
    },

    {
      id: "ciclo_trivia", lupa: "imagen", tipo: "trivia", img: "img/ciclo_completo.jpg",
      titulo: "¿Cómo se reproducen?",
      inst: "Observá el ciclo de la mosca, leé cada pregunta y tocá la respuesta correcta.",
      preguntas: [
        { q: "¿Qué tipo de reproducción tiene la mosca del Mediterráneo?",
          ops: ["Sexual: se necesitan un macho y una hembra", "Asexual: una sola mosca alcanza", "Por semillas, como las plantas", "Por división, como las bacterias"], ok: 0,
          conf: "¡Exacto! Es reproducción sexual: el macho y la hembra adultos se aparean." },
        { q: "¿Dónde deposita los huevos la hembra?",
          ops: ["Bajo la cáscara de la fruta", "En el agua de las acequias", "En las hojas secas", "En la corteza del árbol"], ok: 0,
          conf: "Muy bien. Con su ovopositor, la hembra pone los huevos dentro del fruto." },
        { q: "¿De qué se alimentan las larvas?",
          ops: ["De la pulpa de la fruta", "De otras moscas", "De las raíces", "Del néctar de las flores"], ok: 0,
          conf: "Correcto. Las larvas comen la pulpa y por eso la fruta se pudre." },
        { q: "¿Dónde se desarrollan las pupas?",
          ops: ["En la tierra", "En el aire", "En las flores", "En el agua"], ok: 0,
          conf: "¡Así es! Las larvas maduras caen al suelo y forman pupas en la tierra." },
        { q: "¿A qué estado pasan después de pupa?",
          ops: ["Adulto", "Huevo", "Larva", "Semilla"], ok: 0,
          conf: "Muy bien. De la pupa emerge la mosca adulta, y el ciclo vuelve a empezar." }
      ]
    },

    {
      id: "tie_pasos", tipo: "narracion", modo: "tarjetas",
      titulo: "Técnica del Insecto Estéril",
      inst: "Escuchá cómo trabaja el ISCAMEN con la técnica del insecto estéril.",
      pasos: [
        { img: "img/tie1.jpg", etq: "Cría", texto: "En la Bioplanta del ISCAMEN, en Santa Rosa, se crían grandes cantidades de moscas en condiciones controladas." },
        { img: "img/tie2.jpg", etq: "Separación", texto: "Las larvas se separan por sexo: solamente continúan los machos." },
        { img: "img/tie3.jpg", etq: "Bandejas", texto: "Las larvas macho completan su desarrollo en bandejas con alimento especial." },
        { img: "img/tie4.jpg", etq: "Esterilización", texto: "Las pupas se exponen a rayos gamma, que las esterilizan sin afectar su capacidad de aparearse." },
        { img: "img/tie5.jpg", etq: "Macho estéril", texto: "Las pupas estériles se empacan en bolsas de papel, y de ellas emergen machos sanos, capaces de volar y aparearse." },
        { img: "img/tie6.jpg", etq: "Liberación", texto: "Los machos se liberan en el campo. Al aparearse con hembras silvestres no dejan descendencia, y la plaga disminuye." }
      ]
    },

    {
      id: "tie_ordenar", tipo: "ordenar",
      titulo: "Paso a paso",
      inst: "Ordená los pasos de la técnica del insecto estéril, desde el primero hasta el último.",
      items: [
        { t: "Cría de moscas", img: "img/tie1.jpg" },
        { t: "Separación por sexo", img: "img/tie2.jpg" },
        { t: "Larvas en bandejas", img: "img/tie3.jpg" },
        { t: "Esterilización", img: "img/tie4.jpg" },
        { t: "Machos estériles", img: "img/tie5.jpg" },
        { t: "Liberación en el campo", img: "img/tie6.jpg" }
      ],
      fin: "¡Excelente! Cría, separación, bandejas, esterilización, machos estériles y liberación: así funciona la técnica del insecto estéril."
    },

    {
      id: "tie_trivia", tipo: "trivia", img: "img/avion.jpg",
      titulo: "¿Cómo se interrumpe el ciclo?",
      inst: "Leé cada pregunta y tocá la respuesta correcta.",
      preguntas: [
        { q: "¿Qué significa la sigla TIE?",
          ops: ["Técnica del Insecto Estéril", "Tratamiento Integral de Especies", "Técnica de Insecticida Ecológico", "Transporte de Insectos al Exterior"], ok: 0,
          conf: "¡Exacto! TIE significa Técnica del Insecto Estéril." },
        { q: "¿En qué momento se interrumpe el ciclo biológico con la TIE?",
          ops: ["Cuando el macho estéril se aparea y no hay descendencia", "Cuando la larva come la fruta", "Cuando la pupa cae al suelo", "Cuando la fruta madura en el árbol"], ok: 0,
          conf: "Muy bien. La hembra se aparea con un macho estéril, sus huevos no prosperan y el ciclo se corta." },
        { q: "¿Por qué la TIE es un control «autocida»?",
          ops: ["Usa ejemplares estériles de la misma plaga para controlarla", "Usa venenos muy fuertes", "Usa vaquitas que comen moscas", "Las moscas se esconden solas"], ok: 0,
          conf: "Correcto. Es autocida porque la misma plaga, esterilizada, sirve para controlarse." },
        { q: "¿Cómo se distribuyen los machos estériles?",
          ops: ["Se liberan en el campo, por tierra o desde avionetas", "Se venden en las verdulerías", "Se guardan en el laboratorio", "Se arrojan a los ríos"], ok: 0,
          conf: "¡Así es! Las bolsas con machos estériles se liberan en el campo, incluso desde avionetas." },
        { q: "¿Por qué se liberan machos y no hembras?",
          ops: ["Porque las hembras pican la fruta para poner huevos", "Porque los machos son más lindos", "Porque las hembras no saben volar", "Porque los machos comen más pulpa"], ok: 0,
          conf: "Muy bien. Las hembras dañan la fruta al poner sus huevos; los machos estériles no causan daño." }
      ]
    },

    {
      id: "estatus_trivia", lupa: "mapa", tipo: "trivia", img: "img/mapa_oasis.jpg",
      titulo: "Un mapa de sanidad",
      inst: "Observá el mapa, leé cada pregunta y tocá la respuesta correcta.",
      preguntas: [
        { q: "Según el mapa, ¿qué estatus tiene el Oasis Norte y Este?",
          ops: ["Área de escasa prevalencia", "Área libre de mosca", "Zona sin cultivos", "Zona de montaña"], ok: 0,
          conf: "¡Exacto! Los oasis Norte y Este son área de escasa prevalencia de la plaga." },
        { q: "¿Qué zonas son área libre de mosca del Mediterráneo?",
          ops: ["El Valle de Uco y el Oasis Sur", "Solamente el Oasis Norte", "Toda la provincia", "Ninguna zona"], ok: 0,
          conf: "Muy bien. El Valle de Uco y el Oasis Sur están reconocidos internacionalmente como áreas libres." },
        { q: "¿Qué significa «escasa prevalencia»?",
          ops: ["La plaga está, pero por debajo del nivel de daño económico", "No hay ninguna mosca", "La plaga destruye toda la cosecha", "Las moscas solo viven en invierno"], ok: 0,
          conf: "Correcto. La plaga está presente, pero no llega a causar daño económico." },
        { q: "¿Por qué es importante ser área libre de mosca?",
          ops: ["Para vender frutas y hortalizas a otros países", "Para que haya más turistas", "Para no tener que regar", "Para cultivar solo uvas"], ok: 0,
          conf: "¡Así es! Ser área libre permite que la producción mendocina acceda a los mercados internacionales." }
      ]
    },

    {
      id: "iscamen_trivia", tipo: "trivia", img: "img/bioplanta.jpg",
      titulo: "El ISCAMEN",
      inst: "Leé cada pregunta sobre el ISCAMEN y tocá la respuesta correcta.",
      preguntas: [
        { q: "¿Qué significa la sigla ISCAMEN?",
          ops: ["Instituto de Sanidad y Calidad Agropecuaria Mendoza", "Instituto Superior de Cultivos Andinos de Mendoza", "Inspección Sanitaria de Camiones de Mendoza", "Instituto de Semillas y Canales de Mendoza"], ok: 0,
          conf: "¡Exacto! Instituto de Sanidad y Calidad Agropecuaria Mendoza." },
        { q: "¿En qué año se creó el ISCAMEN?",
          ops: ["1995", "1810", "2020", "1885"], ok: 0,
          conf: "Muy bien. Se creó el 4 de octubre de 1995, por la Ley Provincial 6333." },
        { q: "¿En qué departamento está la Bioplanta del ISCAMEN?",
          ops: ["Santa Rosa", "Malargüe", "Tupungato", "Lavalle"], ok: 0,
          conf: "Correcto. En la Bioplanta de Santa Rosa se crían masivamente las moscas para aplicar la técnica del insecto estéril." },
        { q: "¿Qué reciben del ISCAMEN los alumnos de 6° grado?",
          ops: ["Biocontenedores con pupas de mosca", "Semillas de vid", "Plantines de olivo", "Libros de cuentos"], ok: 0,
          conf: "¡Así es! Los chicos observan el ciclo en los biocontenedores y, al llegar a adultos, los machos se liberan." },
        { q: "¿Qué hace el ISCAMEN con los envases vacíos de agroquímicos?",
          ops: ["Los recolecta en un programa modelo en el país", "Los vende como macetas", "Los entierra en el campo", "Los tira a los canales"], ok: 0,
          conf: "Muy bien. El ISCAMEN recolecta los envases vacíos con un programa modelo en todo el país." }
      ]
    }
  ]
};
if (typeof module !== "undefined") module.exports = DATOS;
