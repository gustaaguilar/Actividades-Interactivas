// ============================================================
//  LOS PUEBLOS ORIGINARIOS DE MENDOZA — Huarpes, puelches y pehuenches
//  Ciencias Sociales · 4.° grado · "Las sociedades a través del tiempo"
// ============================================================
var DATOS = {
  meta: {
    titulo: "Los pueblos originarios de Mendoza",
    subtitulo: "Huarpes, puelches y pehuenches: cómo vivían antes de la llegada de los españoles",
    etiqueta: "Ciencias Sociales · 4.° grado",
    grado: "Ciencias Sociales · 4.° grado",
    portada: "img/portada.jpg",
    cierreImg: "img/cierre.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    revision: false
  },

  globales: {
    error: "Mmm, esa no es. Pensalo de nuevo y probá otra vez.",
    lupaMapa: "Para ver el mapa bien de cerca, tocá la lupa.",
    lupaImg: "Para ver la imagen bien de cerca, tocá la lupa.",
    cierre: "¡Excelente trabajo! Ya conocés a los huarpes, los puelches y los pehuenches, los pueblos originarios de Mendoza. Cada uno aprovechó la naturaleza de su lugar a su manera, y sus descendientes siguen viviendo entre nosotros."
  },

  pantallas: [

    // ======================= INTRODUCCIÓN =======================
    {
      id: "intro", tipo: "narracion", img: "img/intro.jpg",
      titulo: "🏞️ Mendoza, hace mucho tiempo",
      inst: "Hace mucho tiempo, antes de que llegaran los españoles, en el territorio de Mendoza ya vivían otros pueblos. Escuchá.",
      pasos: [
        { ico: "🧭", etq: "Pueblos originarios", texto: "Los pueblos originarios son los que habitaban estas tierras desde mucho antes de la llegada de los españoles." },
        { ico: "🌿", etq: "Vivían de la naturaleza", texto: "Cada pueblo aprendió a aprovechar los recursos de su lugar: el agua, la tierra, las plantas y los animales." },
        { ico: "🏡", etq: "Formas de vida distintas", texto: "Por eso no todos vivían igual. Unos eran agricultores y vivían siempre en el mismo lugar. Otros eran cazadores y se trasladaban." },
        { ico: "👥", etq: "Tres pueblos", texto: "En Mendoza vivían los huarpes, los puelches y los pehuenches. ¡Vamos a conocerlos!" }
      ]
    },

    // ======================= ¿DÓNDE VIVÍAN? =======================
    {
      id: "mapa_ver", tipo: "narracion", modo: "svg", escena: "mapaNarr", alto: true,
      titulo: "🗺️ ¿Dónde vivía cada pueblo?",
      inst: "Mirá en el mapa de Mendoza dónde vivía cada pueblo.",
      pasos: [
        { x: 86, y: 86, mostrar: "c_rosa", texto: "Primero, los puntos cardinales: arriba está el norte, abajo el sur, a la derecha el este y a la izquierda el oeste." },
        { x: 34, y: 30, mostrar: "c_andes", texto: "Al oeste, en el límite con Chile, está la cordillera de los Andes." },
        { x: 50, y: 36, mostrar: "c_zH", texto: "Los huarpes vivían en el norte y el centro de Mendoza, en los valles regados por los ríos." },
        { x: 63, y: 12, mostrar: "c_guan", texto: "También vivían junto a las lagunas de Guanacache, al noreste, en el límite con San Juan." },
        { x: 68, y: 67, mostrar: "c_zPu", texto: "Los puelches vivían más al sur y al este, en las llanuras y mesetas." },
        { x: 28, y: 77, mostrar: "c_zPe", texto: "Los pehuenches vivían en el sudoeste, en la cordillera y sus valles, donde hoy está Malargüe." }
      ]
    },

    {
      id: "mapa_ubicar", tipo: "mapa", escena: "mapaInter",
      titulo: "📍 Ubicamos a cada pueblo",
      inst: "Leé cada tarjeta y tocá en el mapa la zona que corresponde.",
      items: [
        { t: "Huarpes", cat: 0, conf: "¡Muy bien! Los huarpes vivían en el norte y el centro de Mendoza." },
        { t: "Puelches", cat: 1, conf: "¡Exacto! Los puelches vivían en las llanuras y mesetas del sur y del este." },
        { t: "Pehuenches", cat: 2, conf: "¡Correcto! Los pehuenches vivían en la cordillera del sudoeste." },
        { t: "Las lagunas de Guanacache", cat: 0, conf: "Las lagunas de Guanacache están en el norte, donde vivían los huarpes laguneros." },
        { t: "La cordillera donde hoy está Malargüe", cat: 2 },
        { t: "Las llanuras del sur y del este", cat: 1 },
        { t: "El valle donde hoy está la Ciudad de Mendoza", cat: 0 }
      ],
      fin: "¡Muy bien! Huarpes en el norte y el centro, puelches en las llanuras del sur y del este, y pehuenches en la cordillera del sudoeste."
    },

    // ======================= LOS HUARPES =======================
    {
      id: "huarpes1", tipo: "narracion", img: "img/huarpes_aldea.jpg",
      titulo: "🌽 Los huarpes: agricultores",
      inst: "Conocé cómo vivían los huarpes. Escuchá.",
      pasos: [
        { ico: "🏡", etq: "Sedentarios", texto: "Los huarpes eran sedentarios: vivían siempre en el mismo lugar, en pequeños poblados." },
        { ico: "🌽", etq: "Agricultores", texto: "Su actividad principal era la agricultura. Cultivaban maíz, zapallo, porotos y quinoa." },
        { ico: "💧", etq: "Acequias", texto: "Para regar sus cultivos construían acequias y canales que llevaban el agua de los ríos." },
        { ico: "🛖", etq: "Chozas", texto: "Vivían en chozas de barro, ramas y paja." }
      ]
    },

    {
      id: "huarpes_oracion", tipo: "oracion", img: "img/huarpes_aldea.jpg",
      titulo: "✍️ Armamos oraciones sobre los huarpes",
      inst: "Tocá las palabras en orden para armar cada oración. La primera palabra empieza con mayúscula y la última termina con punto.",
      oraciones: [
        { t: "Los huarpes regaban sus cultivos con acequias." },
        { t: "Vivían en chozas de barro, ramas y paja." },
        { t: "Cultivaban maíz, zapallo, porotos y quinoa." }
      ],
      fin: "¡Muy bien! Los huarpes eran agricultores sedentarios que regaban sus cultivos con acequias."
    },

    {
      id: "huarpes2", tipo: "narracion", img: "img/huarpes_lagunas.jpg",
      titulo: "🐟 Los huarpes laguneros",
      inst: "Los huarpes también aprovechaban las lagunas y el monte. Escuchá.",
      pasos: [
        { ico: "🐟", etq: "Pesca", texto: "En las lagunas de Guanacache pescaban y cazaban patos." },
        { ico: "🛶", etq: "Balsas de totora", texto: "Para moverse por el agua usaban balsas hechas con totora, una planta que crece en las lagunas." },
        { ico: "🫓", etq: "Caza y recolección", texto: "También cazaban guanacos y ñandúes, y recolectaban algarroba para hacer un pan llamado patay." },
        { ico: "🧺", etq: "Cestos y vasijas", texto: "Tejían cestos tan apretados que podían llevar agua, y hacían vasijas de barro." }
      ]
    },

    {
      id: "huarpes_asociar", tipo: "asociar", img: "img/huarpes_lagunas.jpg",
      titulo: "🧩 Las cosas de los huarpes",
      inst: "Uní cada palabra con lo que significa. Tocá una tarjeta de la izquierda y después su pareja de la derecha.",
      pares: [
        { a: "Acequia", b: "Canal que lleva el agua a los cultivos", conf: "La acequia es un canal que lleva el agua de los ríos a los cultivos." },
        { a: "Balsa de totora", b: "Para pescar y cazar patos en las lagunas", conf: "Con las balsas de totora pescaban y cazaban patos en las lagunas de Guanacache." },
        { a: "Patay", b: "Pan hecho con algarroba", conf: "El patay es un pan hecho con algarroba, el fruto del algarrobo." },
        { a: "Cesto", b: "Tejido tan apretado que podía llevar agua", conf: "Los cestos huarpes estaban tejidos tan apretados que podían llevar agua." },
        { a: "Choza", b: "Vivienda de barro, ramas y paja", conf: "La choza era la vivienda de los huarpes, hecha con barro, ramas y paja." }
      ]
    },

    // ======================= LOS PUELCHES =======================
    {
      id: "puelches", tipo: "narracion", img: "img/puelches.jpg",
      titulo: "🏹 Los puelches: cazadores",
      inst: "Ahora conocé a los puelches. Escuchá.",
      pasos: [
        { ico: "🧭", etq: "Gente del este", texto: "Puelche quiere decir gente del este. Vivían en las llanuras y mesetas del sur de Mendoza." },
        { ico: "🚶", etq: "Nómades", texto: "Eran nómades: se trasladaban de un lugar a otro siguiendo a los animales y buscando agua y alimento." },
        { ico: "🏹", etq: "Caza y recolección", texto: "Se dedicaban principalmente a la caza y la recolección. Cazaban guanacos y ñandúes con arco, flechas y boleadoras, y recolectaban frutos, semillas y raíces." },
        { ico: "⛺", etq: "Toldos", texto: "Vivían en toldos de palos y cueros de guanaco, que podían armar, desarmar y llevar a otro lugar." }
      ]
    },

    {
      id: "puelches_trivia", tipo: "trivia", img: "img/quillango.jpg",
      titulo: "🦙 Preguntas sobre los puelches",
      inst: "Pensá en lo que aprendiste sobre los puelches y elegí la respuesta correcta.",
      preguntas: [
        { q: "¿Por qué los puelches se trasladaban de un lugar a otro?",
          ops: ["Seguían a los animales que cazaban", "Iban a regar sus cultivos", "Buscaban totora para sus balsas", "Visitaban otras ciudades"], ok: 0,
          conf: "¡Muy bien! Eran nómades: seguían a los guanacos y ñandúes y buscaban agua y alimento." },
        { q: "¿Con qué cazaban guanacos y ñandúes?",
          ops: ["Con arco, flechas y boleadoras", "Con redes y balsas", "Con acequias", "Con cestos tejidos"], ok: 0,
          conf: "¡Exacto! Usaban arco, flechas y boleadoras, que son piedras atadas con tientos de cuero." },
        { q: "Con los cueros de guanaco hacían sus toldos y también sus abrigos. ¿Cómo se llamaban esos abrigos?",
          ops: ["Quillangos", "Patay", "Acequias", "Totoras"], ok: 0,
          conf: "¡Correcto! Los quillangos eran mantas de pieles cosidas que abrigaban mucho en el frío del sur." }
      ]
    },

    // ======================= LOS PEHUENCHES =======================
    {
      id: "pehuenches", tipo: "narracion", img: "img/pehuenches.jpg",
      titulo: "🌰 Los pehuenches: gente del pehuén",
      inst: "Ahora conocé a los pehuenches. Escuchá.",
      pasos: [
        { ico: "🌲", etq: "Gente del pehuén", texto: "Pehuenche quiere decir gente del pehuén. El pehuén es la araucaria, un árbol de la cordillera que da piñones." },
        { ico: "⛰️", etq: "La cordillera", texto: "Vivían en el sudoeste de Mendoza, en la cordillera y sus valles. En verano subían a la montaña y en invierno bajaban a los valles." },
        { ico: "🌰", etq: "Piñones", texto: "Recolectaban piñones. Los comían cocidos o tostados, hacían harina con ellos y los guardaban para el invierno." },
        { ico: "🦙", etq: "Caza y toldos", texto: "Cazaban guanacos y ñandúes y vivían en toldos de cuero. Así aprovechaban los recursos de la naturaleza." },
        { ico: "🔄", etq: "Intercambio", texto: "Cruzaban los pasos de la cordillera e intercambiaban pieles, mantas y plumas de ñandú por otros alimentos, como el maíz." }
      ]
    },

    {
      id: "pehuenches_trivia", tipo: "trivia", img: "img/pinones.jpg",
      titulo: "🌲 Preguntas sobre los pehuenches",
      inst: "Pensá en lo que aprendiste sobre los pehuenches y elegí la respuesta correcta.",
      preguntas: [
        { q: "¿Qué quiere decir pehuenche?",
          ops: ["Gente del pehuén", "Gente del este", "Gente de las lagunas", "Gente del río"], ok: 0,
          conf: "¡Muy bien! Pehuenche quiere decir gente del pehuén, el árbol que da los piñones." },
        { q: "¿Qué hacían con los piñones?",
          ops: ["Los comían, hacían harina y los guardaban para el invierno", "Los usaban para hacer balsas", "Los plantaban en acequias", "Los tiraban porque no servían"], ok: 0,
          conf: "¡Exacto! Los piñones eran uno de sus alimentos principales y los guardaban para el invierno." },
        { q: "¿Dónde vivían los pehuenches?",
          ops: ["En la cordillera del sudoeste", "En las lagunas del noreste", "En la Ciudad de Mendoza", "En las llanuras del este"], ok: 0,
          conf: "¡Correcto! Vivían en la cordillera y sus valles, en el sudoeste de Mendoza, donde hoy está Malargüe." }
      ]
    },

    // ======================= COMPARAMOS =======================
    {
      id: "de_quien", tipo: "clasificar", img: "img/portada.jpg",
      titulo: "🔎 ¿De qué pueblo es?",
      inst: "Leé cada tarjeta y tocá el pueblo al que corresponde.",
      categorias: ["🌽 Huarpes", "🏹 Puelches", "🌰 Pehuenches"],
      items: [
        { t: "Cultivaban maíz y zapallo", cat: 0 },
        { t: "Pescaban en las lagunas de Guanacache", cat: 0 },
        { t: "Construían acequias para regar", cat: 0 },
        { t: "Hacían el pan patay con algarroba", cat: 0 },
        { t: "Su nombre quiere decir gente del este", cat: 1, conf: "Puelches: su nombre quiere decir gente del este." },
        { t: "Vivían en las llanuras y mesetas del sur", cat: 1 },
        { t: "Su nombre quiere decir gente del pehuén", cat: 2, conf: "Pehuenches: el pehuén es la araucaria, el árbol que da piñones." },
        { t: "Recolectaban piñones para el invierno", cat: 2 },
        { t: "Vivían en la cordillera del sudoeste", cat: 2 }
      ],
      fin: "¡Muy bien! Ya reconocés las características de cada pueblo."
    },

    {
      id: "sed_nom", tipo: "clasificar", img: "img/intro.jpg",
      titulo: "🏡 ¿Sedentarios o nómades?",
      inst: "Los pueblos sedentarios viven siempre en el mismo lugar. Los nómades se trasladan. Leé cada tarjeta y tocá dónde va.",
      categorias: ["🏡 Sedentarios", "🚶 Nómades"],
      items: [
        { t: "Los huarpes", cat: 0, conf: "Los huarpes eran sedentarios: cultivaban la tierra y esperaban la cosecha en el mismo lugar." },
        { t: "Los puelches", cat: 1, conf: "Los puelches eran nómades: seguían a los animales que cazaban." },
        { t: "Los pehuenches", cat: 1, conf: "Los pehuenches también se trasladaban: en verano subían a la cordillera y en invierno bajaban a los valles." },
        { t: "Cultivaban la tierra y esperaban la cosecha", cat: 0 },
        { t: "Seguían a los animales que cazaban", cat: 1 },
        { t: "Sus viviendas se armaban y desarmaban", cat: 1 },
        { t: "Construían chozas de barro que duraban mucho", cat: 0 }
      ],
      fin: "¡Muy bien! Los huarpes eran sedentarios; los puelches y los pehuenches se trasladaban de un lugar a otro."
    },

    {
      id: "viviendas", tipo: "narracion", modo: "svg", escena: "viviendas",
      titulo: "🛖 ¿Todos vivían en casas iguales?",
      inst: "Mirá cómo eran las viviendas de cada pueblo.",
      pasos: [
        { x: 25, y: 58, mostrar: "v_choza", texto: "Los huarpes vivían en chozas de barro, ramas y paja. Duraban mucho porque no se mudaban." },
        { x: 10, y: 74, mostrar: "v_totora", texto: "Junto a las lagunas usaban también juncos y totora." },
        { x: 70, y: 58, mostrar: "v_toldo", texto: "Los puelches y los pehuenches vivían en toldos hechos con palos y cueros de guanaco." },
        { x: 89, y: 72, mostrar: "v_mover", texto: "El toldo se podía desarmar y llevar a otro lugar: ideal para los pueblos que se trasladaban." },
        { x: 62, y: 90, mostrar: "v_conc", texto: "Cada pueblo construía su vivienda según su forma de vida y los materiales que tenía cerca." }
      ]
    },

    {
      id: "cuadro", tipo: "cuadro", img: "img/portada.jpg",
      titulo: "📋 Completamos el cuadro comparativo",
      inst: "Completá el cuadro comparativo. Leé cada tarjeta y tocá el casillero del cuadro donde va.",
      columnas: ["Huarpes", "Puelches y pehuenches"],
      filas: ["Ubicación", "Actividad principal", "Alimentación", "Vivienda"],
      items: [
        { t: "Norte y centro de Mendoza, junto a ríos y lagunas", f: 0, c: 0 },
        { t: "Sur y sudoeste: llanuras, mesetas y cordillera", f: 0, c: 1 },
        { t: "Agricultura con riego", f: 1, c: 0, conf: "La actividad principal de los huarpes era la agricultura, con acequias para regar." },
        { t: "Caza y recolección", f: 1, c: 1, conf: "Los puelches y los pehuenches se dedicaban principalmente a la caza y la recolección." },
        { t: "Maíz, zapallo, porotos, pescado y patay", f: 2, c: 0 },
        { t: "Guanacos, ñandúes, piñones y frutos silvestres", f: 2, c: 1 },
        { t: "Chozas de barro, ramas y paja", f: 3, c: 0 },
        { t: "Toldos de palos y cueros de guanaco", f: 3, c: 1 }
      ],
      fin: "¡Excelente! Completaste el cuadro comparativo de los pueblos originarios de Mendoza."
    },

    {
      id: "vf", tipo: "vf", img: "img/huarpes_aldea.jpg",
      titulo: "✅ Escribí V o F",
      inst: "Leé cada afirmación y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "Los huarpes practicaban actividades agrícolas.", v: true, img: "img/huarpes_aldea.jpg",
          conf: "¡Verdadero! Los huarpes cultivaban maíz, zapallo, porotos y quinoa, y los regaban con acequias." },
        { t: "Los puelches se dedicaban principalmente a la caza y la recolección.", v: true, img: "img/puelches.jpg",
          conf: "¡Verdadero! Cazaban guanacos y ñandúes y recolectaban frutos, semillas y raíces." },
        { t: "Todos los pueblos originarios vivían en casas idénticas.", v: false, img: "img/quillango.jpg",
          conf: "¡Falso! Los huarpes vivían en chozas de barro y paja, y los puelches y pehuenches en toldos de cuero." },
        { t: "Los pehuenches aprovechaban recursos de la naturaleza.", v: true, img: "img/pinones.jpg",
          conf: "¡Verdadero! Recolectaban piñones, cazaban guanacos y usaban sus cueros para los toldos." },
        { t: "Los huarpes eran nómades y vivían en toldos.", v: false, img: "img/huarpes_lagunas.jpg",
          conf: "¡Falso! Los huarpes eran sedentarios y vivían en chozas. Los toldos eran de los puelches y los pehuenches." }
      ]
    },

    // ======================= REPASO =======================
    {
      id: "sopa", tipo: "sopa", img: "img/portada.jpg", tam: 10,
      titulo: "🔤 Sopa de letras",
      inst: "Buscá siete palabras de los pueblos originarios. Tocá la primera letra y después la última.",
      palabras: [
        { w: "HUARPE", decir: "Huarpe" }, { w: "PUELCHE", decir: "Puelche" }, { w: "PEHUENCHE", decir: "Pehuenche" },
        { w: "TOLDO", decir: "Toldo" }, { w: "ACEQUIA", decir: "Acequia" }, { w: "TOTORA", decir: "Totora" },
        { w: "GUANACO", decir: "Guanaco" }
      ],
      fin: "¡Encontraste todas las palabras de los pueblos originarios!"
    },

    {
      id: "hoy", tipo: "narracion", img: "img/hoy.jpg",
      titulo: "🤝 Los pueblos originarios hoy",
      inst: "Los pueblos originarios no son solo parte del pasado. Escuchá.",
      pasos: [
        { ico: "🏡", etq: "Comunidades huarpes", texto: "Hoy hay comunidades huarpes en Lavalle, cerca de las lagunas de Guanacache." },
        { ico: "⛰️", etq: "Comunidades pehuenches", texto: "En Malargüe hay comunidades mapuche-pehuenches." },
        { ico: "🗺️", etq: "Nombres de lugares", texto: "Algunos nombres de Mendoza vienen de su historia, como Guaymallén, que era el nombre de un cacique huarpe." },
        { ico: "🤝", etq: "Respeto", texto: "Conocer su historia nos ayuda a valorar y respetar la diversidad de culturas que forman nuestra provincia." }
      ]
    },

    {
      id: "desafio", tipo: "trivia", img: "img/portada.jpg",
      titulo: "🏆 Desafío final",
      inst: "Llegó el desafío final. Respondé cinco preguntas sobre los pueblos originarios de Mendoza.",
      preguntas: [
        { q: "¿Qué pueblo practicaba la agricultura con acequias?",
          ops: ["Los huarpes", "Los puelches", "Los pehuenches", "Ninguno"], ok: 0,
          conf: "¡Muy bien! Los huarpes regaban sus cultivos con acequias y canales." },
        { q: "¿Qué quiere decir que un pueblo es nómade?",
          ops: ["Que se traslada de un lugar a otro", "Que vive siempre en el mismo lugar", "Que vive en una ciudad", "Que no caza ni recolecta"], ok: 0,
          conf: "¡Exacto! Los pueblos nómades, como los puelches, se trasladan buscando alimento." },
        { q: "¿Dónde vivían los pehuenches?",
          ops: ["En la cordillera del sudoeste", "En las lagunas de Guanacache", "En el norte de Mendoza", "En San Juan"], ok: 0,
          conf: "¡Correcto! Vivían en la cordillera del sudoeste, donde hoy está Malargüe." },
        { q: "¿De qué estaban hechos los toldos?",
          ops: ["De palos y cueros de guanaco", "De barro y paja", "De piedra y cemento", "De totora y juncos"], ok: 0,
          conf: "¡Muy bien! Los toldos eran de palos y cueros, y se podían desarmar y trasladar." },
        { q: "¿Dónde hay comunidades huarpes hoy?",
          ops: ["En Lavalle, cerca de las lagunas de Guanacache", "En ningún lugar, desaparecieron", "Solo en los libros", "Solo en otros países"], ok: 0,
          conf: "¡Excelente! Los pueblos originarios siguen vivos: hay comunidades huarpes en Lavalle y mapuche-pehuenches en Malargüe." }
      ]
    }
  ]
};
if (typeof module !== "undefined") module.exports = DATOS;
