// ============================================================
//  CORROSIÓN Y COMBUSTIÓN — Cs. Naturales 6° grado
//  Basado en las láminas "La combustión", "La corrosión" y
//  "Corrosión y Combustión: actividades para comprender, analizar y aplicar".
// ============================================================
var DATOS = {
  meta: {
    titulo: "Corrosión y combustión",
    subtitulo: "Dos transformaciones de los materiales donde el oxígeno del aire es protagonista",
    etiqueta: "Ciencias Naturales · Segundo Ciclo · 6° grado",
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
    lupaMapa: "Para ver el esquema bien de cerca, tocá la lupa.",
    lupaImg: "Para ver la imagen bien de cerca, tocá la lupa.",
    cierre: "¡Excelente trabajo! Ya sabés que la combustión es rápida y libera calor y luz, y que la corrosión es lenta y deteriora los metales. En las dos, el oxígeno del aire reacciona con un material y se forman nuevas sustancias."
  },

  pantallas: [

    // ======================= LA COMBUSTIÓN =======================
    {
      id: "video_fuego", tipo: "video", yt: "2w5KLqp_Q5I", vertical: true,
      titulo: "🎬 Video: ¿qué es el fuego?",
      inst: "Mirá este video corto sobre el fuego. Cuando termines, tocá Siguiente.",
      texto: "El triángulo del fuego en un minuto"
    },

    {
      id: "comb_que_es", tipo: "narracion", img: "img/fogata.jpg",
      titulo: "🔥 ¿Qué es la combustión?",
      inst: "La combustión es una reacción química. Escuchá cómo ocurre.",
      pasos: [
        { ico: "🧪", etq: "Reacción química", texto: "La combustión es una reacción química: los materiales se transforman y aparecen sustancias nuevas." },
        { ico: "🪵", etq: "Combustible", texto: "Necesita un material que pueda arder, llamado combustible, como la madera, el papel, el gas o la nafta." },
        { ico: "💨", etq: "Oxígeno del aire", texto: "El combustible reacciona con el oxígeno del aire." },
        { ico: "☀️", etq: "Calor y luz", texto: "En ese proceso se libera energía en forma de calor y, muchas veces, de luz." },
        { ico: "🌫️", etq: "Nuevas sustancias", texto: "Además se generan nuevas sustancias, como gases y cenizas." }
      ]
    },

    {
      id: "comb_triangulo", tipo: "narracion", modo: "svg", escena: "triangulo",
      titulo: "🔺 ¿Qué se necesita para que ocurra?",
      inst: "Para que se produzca una combustión se necesitan tres elementos. Mirá cómo se arma el triángulo.",
      pasos: [
        { x: 18, y: 84, mostrar: "t_comb", texto: "Primero, un combustible: un material que puede arder, como la madera, el papel, el gas o la nafta." },
        { x: 82, y: 84, mostrar: "t_oxi", texto: "Segundo, el oxígeno del aire, que permite la reacción." },
        { x: 50, y: 16, mostrar: "t_calor", texto: "Tercero, calor: una fuente de energía, como una chispa, una llama o una temperatura alta." },
        { x: 50, y: 58, mostrar: "t_fuego", texto: "Cuando están los tres juntos, ¡se produce la combustión!" },
        { x: 50, y: 58, mostrar: "t_falta", texto: "Si falta uno de los tres, el fuego no empieza, o se apaga." }
      ]
    },

    {
      id: "comb_falta", tipo: "trivia", img: "img/vela.jpg",
      titulo: "🧯 ¿Qué elemento falta?",
      inst: "Leé cada situación y tocá qué elemento del triángulo falta o se quitó.",
      preguntas: [
        { q: "Tapamos una vela encendida con un frasco de vidrio y, al ratito, se apaga. ¿Qué le falta?",
          ops: ["Oxígeno", "Calor", "Combustible", "Luz"], ok: 0,
          conf: "¡Muy bien! El frasco no deja entrar aire nuevo: cuando se acaba el oxígeno, la vela se apaga." },
        { q: "Un trozo de leña está al aire libre, pero no se prende solo. ¿Qué le falta?",
          ops: ["Calor", "Oxígeno", "Combustible", "Agua"], ok: 0,
          conf: "¡Exacto! La leña es combustible y el aire tiene oxígeno, pero falta una fuente de calor, como una chispa o un fósforo." },
        { q: "La fogata se apagó porque se quemó toda la leña. ¿Qué se terminó?",
          ops: ["Combustible", "Oxígeno", "Calor", "Viento"], ok: 0,
          conf: "¡Correcto! Sin material que pueda arder, la combustión se detiene." },
        { q: "Una mamá tapa una sartén que se prendió fuego con una tapa. ¿Qué le quita al fuego?",
          ops: ["Oxígeno", "Calor", "Combustible", "Luz"], ok: 0,
          conf: "¡Muy bien! Al tapar la sartén, el fuego se queda sin oxígeno y se apaga. Nunca se le echa agua a una sartén con aceite encendido." }
      ]
    },

    {
      id: "comb_tipos", tipo: "clasificar", img: "img/tipos_llama.jpg",
      titulo: "🔵 Completa o incompleta",
      inst: "Hay dos tipos de combustión. Leé cada característica y tocá si es de la combustión completa o de la incompleta.",
      categorias: ["🔵 Completa", "🟠 Incompleta"],
      items: [
        { t: "Hay suficiente oxígeno", cat: 0 },
        { t: "Hay poco oxígeno", cat: 1 },
        { t: "La llama suele ser azul o muy brillante", cat: 0, conf: "Completa: con suficiente oxígeno, la llama de la hornalla es azul." },
        { t: "La llama suele ser amarilla y produce humo", cat: 1, conf: "Incompleta: con poco oxígeno, la llama es amarilla y larga humo." },
        { t: "Libera mucho calor", cat: 0 },
        { t: "Libera menos calor", cat: 1 },
        { t: "Genera dióxido de carbono y vapor de agua", cat: 0 },
        { t: "Genera monóxido de carbono y hollín", cat: 1, conf: "Incompleta: genera monóxido de carbono, un gas peligroso que no tiene olor ni color." }
      ],
      fin: "¡Muy bien! La cantidad de oxígeno decide el tipo de combustión: con suficiente oxígeno es completa, y con poco oxígeno es incompleta."
    },

    {
      id: "comb_ejemplos", tipo: "asociar", img: "img/combustibles.jpg",
      titulo: "🕯️ Ejemplos en la vida cotidiana",
      inst: "Cada combustión usa un combustible. Tocá un ejemplo de la izquierda y después su combustible, a la derecha.",
      pares: [
        { a: "Vela encendida", b: "Cera", conf: "La vela quema cera." },
        { a: "Fogata", b: "Madera", conf: "La fogata quema madera." },
        { a: "Hornalla de la cocina", b: "Gas natural", conf: "La hornalla quema gas natural." },
        { a: "Motor de un auto", b: "Nafta", conf: "El motor del auto quema nafta." },
        { a: "Hoja que se quema", b: "Papel", conf: "La hoja de papel también es un combustible." }
      ]
    },

    {
      id: "comb_productos", tipo: "trivia", img: "img/fogata.jpg",
      titulo: "🌫️ Productos de la combustión",
      inst: "Durante la combustión se forman nuevas sustancias. Respondé las preguntas.",
      preguntas: [
        { q: "¿En qué forma libera energía la combustión?",
          ops: ["Calor y luz", "Hielo y agua", "Herrumbre", "Electricidad"], ok: 0,
          conf: "¡Muy bien! La combustión libera energía térmica, es decir calor, y muchas veces también luz." },
        { q: "¿Qué gases se forman en una combustión completa?",
          ops: ["Dióxido de carbono y vapor de agua", "Oxígeno y nitrógeno", "Solo humo negro", "Ningún gas"], ok: 0,
          conf: "¡Exacto! La combustión completa forma dióxido de carbono y vapor de agua." },
        { q: "Después de una fogata quedan restos sólidos en el suelo. ¿Cómo se llaman?",
          ops: ["Cenizas", "Herrumbre", "Óxido", "Hollín azul"], ok: 0,
          conf: "¡Correcto! Las cenizas son residuos sólidos que quedan según el material que se quemó." },
        { q: "¿Qué gas peligroso puede formarse cuando la combustión es incompleta?",
          ops: ["Monóxido de carbono", "Oxígeno", "Vapor de agua", "Aire puro"], ok: 0,
          conf: "¡Muy bien! El monóxido de carbono es tóxico y no se ve ni se huele. Por eso hay que ventilar los ambientes." }
      ]
    },

    {
      id: "comb_consec", tipo: "clasificar", img: "img/cuidados.jpg",
      titulo: "⚖️ Usos y riesgos",
      inst: "La combustión nos ayuda, pero también tiene riesgos. Tocá si cada frase es un uso o un riesgo.",
      categorias: ["👍 Uso", "⚠️ Riesgo"],
      items: [
        { t: "Cocinar los alimentos", cat: 0 },
        { t: "Calefaccionar la casa", cat: 0 },
        { t: "Mover autos, colectivos y camiones", cat: 0 },
        { t: "Producir energía en las industrias", cat: 0 },
        { t: "Provocar incendios si no se controla", cat: 1 },
        { t: "Generar gases contaminantes si es incompleta", cat: 1, conf: "Riesgo: la combustión incompleta genera gases que afectan la salud y el ambiente." },
        { t: "Contaminar el aire con humo y gases", cat: 1 }
      ],
      fin: "¡Muy bien! La combustión nos da energía para cocinar, calefaccionar y movernos, pero hay que controlarla para evitar incendios y contaminación."
    },

    {
      id: "comb_cuidados", tipo: "vf", img: "img/cuidados.jpg",
      titulo: "🏠 Usos y cuidados",
      inst: "Leé cada afirmación sobre los cuidados con la combustión y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "Los combustibles se deben usar en lugares ventilados.", v: true,
          conf: "¡Verdadero! La ventilación renueva el oxígeno y evita que se acumulen gases peligrosos." },
        { t: "Si hay olor a gas, hay que prender un fósforo para ver de dónde sale.", v: false,
          conf: "¡Falso! Nunca se prende fuego si hay olor a gas: se abren las ventanas, se cierra la llave y se avisa a un adulto." },
        { t: "Hay que mantener en buen estado las instalaciones de gas.", v: true,
          conf: "¡Verdadero! Revisar las instalaciones evita fugas de gas y combustiones incompletas." },
        { t: "La combustión se usa solo en las fábricas.", v: false,
          conf: "¡Falso! Se usa en los hogares, en las industrias y en los transportes." },
        { t: "Controlar la combustión ayuda a reducir la contaminación del aire.", v: true,
          conf: "¡Verdadero! Una combustión bien controlada produce menos humo y menos gases contaminantes." }
      ]
    },

    {
      id: "comb_sopa", tipo: "sopa", img: "img/fogata.jpg", tam: 11,
      titulo: "🔤 Sopa de letras del fuego",
      inst: "Buscá seis palabras de la combustión. Tocá la primera letra y después la última.",
      palabras: [
        { w: "COMBUSTIBLE", decir: "Combustible" }, { w: "OXIGENO", decir: "Oxígeno" }, { w: "CALOR", decir: "Calor" },
        { w: "LLAMA", decir: "Llama" }, { w: "CENIZAS", decir: "Cenizas" }, { w: "ENERGIA", decir: "Energía" }
      ],
      fin: "¡Encontraste todas las palabras de la combustión!"
    },

    // ======================= LA CORROSIÓN =======================
    {
      id: "video_oxido", tipo: "video", yt: "ife3_MMiE1A", vertical: true,
      titulo: "🎬 Video: ¿por qué se oxidan los clavos?",
      inst: "Ahora mirá este video corto sobre los clavos oxidados. Cuando termines, tocá Siguiente.",
      texto: "¿Por qué se oxidan los clavos?"
    },

    {
      id: "corr_que_es", tipo: "narracion", img: "img/reja.jpg",
      titulo: "🟤 ¿Qué es la corrosión?",
      inst: "La corrosión es un proceso natural que deteriora los materiales. Escuchá.",
      pasos: [
        { ico: "🔩", etq: "Los metales", texto: "La corrosión es el deterioro de los materiales, especialmente de los metales." },
        { ico: "💨", etq: "Oxígeno del aire", texto: "Ocurre cuando el metal reacciona con sustancias del ambiente, principalmente con el oxígeno del aire..." },
        { ico: "💧", etq: "Humedad", texto: "...y con la humedad, es decir, con el agua." },
        { ico: "🎨", etq: "Cambia de aspecto", texto: "El metal cambia de aspecto: pierde su brillo, aparecen manchas y se vuelve más áspero." },
        { ico: "🟫", etq: "Herrumbre u óxido", texto: "Aparece una capa de color rojizo o marrón, llamada herrumbre u óxido." }
      ]
    },

    {
      id: "corr_como", tipo: "narracion", modo: "svg", escena: "corrosion",
      titulo: "🔍 ¿Cómo ocurre?",
      inst: "Mirá qué le pasa a un trozo de hierro que queda a la intemperie.",
      pasos: [
        { x: 50, y: 74, mostrar: "c_metal", texto: "Este es un trozo de hierro nuevo, liso y brillante." },
        { x: 26, y: 26, mostrar: "c_agua", texto: "Le cae humedad: el agua de la lluvia o del ambiente." },
        { x: 74, y: 26, mostrar: "c_oxi", texto: "Y siempre está en contacto con el oxígeno del aire." },
        { x: 50, y: 66, mostrar: "c_oxido", texto: "En presencia de agua, el oxígeno reacciona con el metal y se forman nuevas sustancias: los óxidos." },
        { x: 50, y: 88, mostrar: "c_lento", texto: "Este proceso es lento, pero continuo, y con el tiempo debilita el material." }
      ]
    },

    {
      id: "corr_proceso", tipo: "ordenar", img: "img/tornillo.jpg",
      titulo: "📅 Un clavo con el paso del tiempo",
      inst: "Un clavo queda olvidado en el patio. Tocá los pasos en el orden en que ocurren.",
      items: [
        { ico: "✨", t: "El clavo es nuevo y brillante" },
        { ico: "🌧️", t: "Queda a la intemperie, con lluvia y humedad" },
        { ico: "💨", t: "El oxígeno y el agua reaccionan con el hierro" },
        { ico: "🟠", t: "Aparecen manchas rojizas" },
        { ico: "🟫", t: "Se forma una capa de herrumbre" },
        { ico: "💔", t: "El clavo se debilita y puede romperse" }
      ],
      fin: "¡Perfecto! La corrosión es lenta y progresiva: primero el metal pierde su brillo, después aparece la herrumbre y al final el metal se debilita."
    },

    {
      id: "corr_factores", tipo: "clasificar", img: "img/prevenir.jpg",
      titulo: "🛡️ ¿La favorece o la previene?",
      inst: "Leé cada frase y tocá si favorece la corrosión o si ayuda a prevenirla.",
      categorias: ["🌧️ La favorece", "🛡️ La previene"],
      items: [
        { t: "Mucha humedad o lluvia", cat: 0 },
        { t: "Agua con sales, como la del mar", cat: 0, conf: "La favorece: las sales del agua de mar aceleran la corrosión." },
        { t: "Temperaturas altas", cat: 0 },
        { t: "Dejar el metal sin protección", cat: 0 },
        { t: "Pintar el metal", cat: 1, conf: "La previene: la pintura no deja que el oxígeno y la humedad toquen el metal." },
        { t: "Aplicar aceite o barniz", cat: 1 },
        { t: "Mantener el metal seco", cat: 1 },
        { t: "Usar acero inoxidable o aluminio", cat: 1, conf: "La previene: el acero inoxidable y el aluminio resisten mucho mejor la corrosión." }
      ],
      fin: "¡Muy bien! La humedad, las sales y la falta de protección favorecen la corrosión. Pintar, aceitar, mantener seco y elegir buenos materiales ayudan a prevenirla."
    },

    {
      id: "corr_consec", tipo: "trivia", img: "img/auto_oxidado.jpg",
      titulo: "🚗 Consecuencias de la corrosión",
      inst: "Pensá en cada situación y elegí la respuesta correcta.",
      preguntas: [
        { q: "¿Por qué un puente de hierro oxidado puede ser peligroso?",
          ops: ["Porque el metal se debilita y puede romperse", "Porque la herrumbre se prende fuego", "Porque se vuelve más brillante", "Porque se hace más pesado y fuerte"], ok: 0,
          conf: "¡Muy bien! La corrosión disminuye la resistencia del metal: puede romperse y dejar de ser seguro." },
        { q: "¿Dónde se oxida más rápido una bicicleta?",
          ops: ["Cerca del mar", "En una casa seca", "En el desierto", "Guardada y aceitada"], ok: 0,
          conf: "¡Exacto! Cerca del mar hay mucha humedad y sales, que aceleran la corrosión." },
        { q: "¿Qué conviene hacer con una reja de hierro para que dure más?",
          ops: ["Pintarla", "Mojarla todos los días", "Echarle agua salada", "Lijarla y dejarla al sol"], ok: 0,
          conf: "¡Correcto! La pintura forma una capa que protege al metal del oxígeno y la humedad." },
        { q: "¿Qué objetos pueden dañarse por la corrosión?",
          ops: ["Herramientas, vehículos, puentes y edificios", "Solo los juguetes de plástico", "Solo las piedras", "Ninguno"], ok: 0,
          conf: "¡Muy bien! La corrosión daña estructuras metálicas, herramientas, vehículos, puentes y edificios. Por eso es importante el mantenimiento." }
      ]
    },

    {
      id: "corr_sopa", tipo: "sopa", img: "img/reja.jpg", tam: 10,
      titulo: "🔤 Sopa de letras oxidada",
      inst: "Buscá seis palabras de la corrosión. Tocá la primera letra y después la última.",
      palabras: [
        { w: "HERRUMBRE", decir: "Herrumbre" }, { w: "METAL", decir: "Metal" }, { w: "HUMEDAD", decir: "Humedad" },
        { w: "OXIDO", decir: "Óxido" }, { w: "HIERRO", decir: "Hierro" }, { w: "PINTURA", decir: "Pintura" }
      ],
      fin: "¡Encontraste todas las palabras de la corrosión!"
    },

    // ======================= COMPARAMOS: ACTIVIDADES =======================
    {
      id: "reconocer", tipo: "clasificar", img: "img/auto_oxidado.jpg",
      titulo: "1️⃣ Reconocemos los procesos",
      inst: "Observá cada imagen y tocá si corresponde a corrosión, a combustión o a ninguno de los dos.",
      categorias: ["🟤 Corrosión", "🔥 Combustión", "🚫 Ninguno"],
      items: [
        { t: "Un auto viejo oxidado", cat: 0, img: "img/auto_oxidado.jpg" },
        { t: "Una vela encendida", cat: 1, img: "img/vela.jpg" },
        { t: "Una reja oxidada", cat: 0, img: "img/reja.jpg" },
        { t: "La hornalla de la cocina encendida", cat: 1, img: "img/hornalla.jpg" },
        { t: "Un tornillo oxidado", cat: 0, img: "img/tornillo.jpg" },
        { t: "Una fogata", cat: 1, img: "img/fogata.jpg" },
        { t: "Un cubito de hielo que se derrite", cat: 2, img: "img/hielo.jpg", conf: "Ninguno: el hielo solo cambia de estado, de sólido a líquido. No se forma una sustancia nueva." }
      ],
      fin: "¡Muy bien! La corrosión deteriora los metales con manchas y herrumbre; la combustión libera calor y luz."
    },

    {
      id: "cuadro", tipo: "clasificar", img: "img/comparamos.jpg",
      titulo: "2️⃣ Completamos el cuadro",
      inst: "Completá el cuadro comparativo: ¿cada característica es de la corrosión, de la combustión, o de las dos?",
      categorias: ["🟤 Corrosión", "🔥 Combustión", "🤝 Las dos"],
      items: [
        { t: "Es un deterioro natural de los materiales", cat: 0 },
        { t: "Es una reacción química que libera energía", cat: 1 },
        { t: "La presentan principalmente los metales", cat: 0 },
        { t: "La presentan materiales que pueden arder", cat: 1 },
        { t: "Intervienen el metal, el oxígeno y la humedad", cat: 0 },
        { t: "Intervienen el combustible, el oxígeno y el calor", cat: 1 },
        { t: "Necesita el oxígeno del aire", cat: 2, conf: "¡Las dos! El oxígeno del aire participa en la corrosión y en la combustión." },
        { t: "Libera calor y, muchas veces, luz", cat: 1 },
        { t: "Forma herrumbre u óxido", cat: 0 },
        { t: "Forma gases, humo y cenizas", cat: 1 },
        { t: "Se forman nuevas sustancias", cat: 2, conf: "¡Las dos! En ambos procesos aparecen sustancias nuevas: óxidos en la corrosión; gases y cenizas en la combustión." },
        { t: "Es un proceso lento", cat: 0 },
        { t: "Es un proceso generalmente rápido", cat: 1 }
      ],
      fin: "¡Cuadro completo! La corrosión es lenta y afecta a los metales; la combustión es rápida y libera calor y luz. En las dos interviene el oxígeno y se forman nuevas sustancias."
    },

    {
      id: "relacionamos", tipo: "clasificar", img: "img/comparamos.jpg",
      titulo: "3️⃣ Relacionamos",
      inst: "Leé cada situación y tocá el proceso que corresponde.",
      categorias: ["🟤 Corrosión", "🔥 Combustión"],
      items: [
        { t: "Una reja que queda a la intemperie y se pone marrón", cat: 0 },
        { t: "Una vela encendida", cat: 1 },
        { t: "Una hoja de papel que se quema", cat: 1 },
        { t: "Un clavo que se oxida", cat: 0 },
        { t: "El gas natural de la cocina", cat: 1 },
        { t: "Una bicicleta que pierde su brillo", cat: 0, conf: "Corrosión: cuando el metal pierde su brillo y aparecen manchas, empieza a oxidarse." }
      ],
      fin: "¡Muy bien! Relacionaste cada situación con su proceso."
    },

    {
      id: "oraciones", tipo: "oracion", img: "img/comparamos.jpg",
      titulo: "4️⃣ Armamos oraciones",
      inst: "Tocá las palabras en orden para armar cada oración. La primera palabra empieza con mayúscula y la última termina con punto.",
      oraciones: [
        { t: "El oxígeno y la humedad atacan el metal." },
        { t: "La herrumbre muestra el deterioro del metal." },
        { t: "El combustible necesita oxígeno y calor para arder." },
        { t: "La llama libera energía en forma de calor." }
      ],
      fin: "¡Excelente! Armaste oraciones correctas y con sentido sobre la corrosión y la combustión."
    },

    {
      id: "esquemas", tipo: "trivia", escena: "esquemas",
      titulo: "5️⃣ Completamos los esquemas",
      inst: "Completá los esquemas con las palabras del recuadro. Elegí la palabra que va en cada signo de pregunta que titila.",
      preguntas: [
        { q: "Corrosión: ¿qué gas del aire ataca al metal?", llenar: "x1",
          ops: ["oxígeno", "calor", "energía", "productos"], ok: 0,
          conf: "¡Muy bien! El oxígeno del aire reacciona con el metal." },
        { q: "Corrosión: ¿qué más necesita el metal para oxidarse?", llenar: "x2",
          ops: ["humedad", "combustible", "energía", "calor"], ok: 0,
          conf: "¡Exacto! Con humedad, el oxígeno reacciona con el metal y se forma la herrumbre." },
        { q: "Combustión: ¿cómo se llama el material que puede arder?", llenar: "x3",
          ops: ["combustible", "humedad", "productos", "energía"], ok: 0,
          conf: "¡Correcto! La madera de la fogata es el combustible." },
        { q: "Combustión: ¿qué hace falta para encenderla, como una chispa o una llama?", llenar: "x4",
          ops: ["calor", "humedad", "productos", "herrumbre"], ok: 0,
          conf: "¡Muy bien! El calor es la fuente de energía que inicia la combustión." },
        { q: "Combustión: ¿qué libera el fuego en forma de calor y luz?", llenar: "x5",
          ops: ["energía", "humedad", "oxígeno", "combustible"], ok: 0,
          conf: "¡Exacto! La combustión libera energía." },
        { q: "Combustión: ¿cómo llamamos a los gases, el humo y las cenizas que se forman?", llenar: "x6",
          ops: ["productos", "humedad", "calor", "oxígeno"], ok: 0,
          conf: "¡Muy bien! Son los productos de la combustión: nuevas sustancias que antes no estaban." }
      ]
    },

    {
      id: "afirmaciones", tipo: "vf", img: "img/comparamos.jpg",
      titulo: "6️⃣ Analizamos afirmaciones",
      inst: "Leé cada afirmación y decidí si es verdadera o falsa. Después corregí las falsas en tu cuaderno.",
      afirmaciones: [
        { t: "La corrosión es un proceso rápido.", v: false, img: "img/reja.jpg",
          conf: "¡Falso! La corrosión es un proceso lento y progresivo." },
        { t: "La combustión necesita oxígeno para ocurrir.", v: true, img: "img/fogata.jpg",
          conf: "¡Verdadero! El oxígeno es uno de los tres elementos del triángulo del fuego." },
        { t: "La herrumbre es un producto de la combustión.", v: false, img: "img/tornillo.jpg",
          conf: "¡Falso! La herrumbre es un producto de la corrosión. La combustión produce gases, humo y cenizas." },
        { t: "La combustión libera calor y, muchas veces, luz.", v: true, img: "img/vela.jpg",
          conf: "¡Verdadero! Libera energía en forma de calor y, muchas veces, de luz." },
        { t: "La corrosión solo ocurre en el mar.", v: false, img: "img/auto_oxidado.jpg",
          conf: "¡Falso! Ocurre en cualquier lugar con oxígeno y humedad. Cerca del mar es más rápida por las sales." },
        { t: "En la combustión se forman gases y cenizas.", v: true, img: "img/fogata.jpg",
          conf: "¡Verdadero! Son nuevas sustancias que se forman durante la combustión." },
        { t: "La corrosión puede debilitar los metales.", v: true, img: "img/reja.jpg",
          conf: "¡Verdadero! Con el tiempo, el metal oxidado pierde resistencia y puede romperse." },
        { t: "Todos los materiales se pueden oxidar.", v: false, img: "img/prevenir.jpg",
          conf: "¡Falso! La corrosión afecta principalmente a los metales, y hay metales que resisten la corrosión, como el acero inoxidable." }
      ]
    },

    {
      id: "investigamos", tipo: "clasificar", img: "img/comparamos.jpg",
      titulo: "7️⃣ Investigamos y clasificamos",
      inst: "Más ejemplos de la vida cotidiana. Tocá si cada uno es un ejemplo de corrosión o de combustión.",
      categorias: ["🟤 Corrosión", "🔥 Combustión"],
      items: [
        { t: "Un asado con carbón", cat: 1 },
        { t: "Un candado viejo lleno de manchas marrones", cat: 0 },
        { t: "Un fósforo encendido", cat: 1 },
        { t: "Herramientas olvidadas en el patio bajo la lluvia", cat: 0 },
        { t: "Una estufa a leña prendida", cat: 1 },
        { t: "El casco de hierro de un barco viejo en el puerto", cat: 0 },
        { t: "Un colectivo andando por la calle", cat: 1, conf: "Combustión: el motor quema combustible, como gasoil o nafta, para moverse." },
        { t: "Una lata de conserva tirada al aire libre", cat: 0 }
      ],
      fin: "¡Muy bien! Corrosión y combustión están en todos lados: en la cocina, en la calle, en el patio y en el puerto."
    },

    {
      id: "produccion", tipo: "narracion", img: "img/carpeta.jpg",
      titulo: "8️⃣ Producción escrita y creatividad",
      inst: "Para terminar, elegí una de estas tres propuestas y hacela en tu carpeta.",
      pasos: [
        { ico: "✍️", etq: "Un texto", texto: "Propuesta uno: escribí un breve texto, de seis a ocho líneas, explicando cómo podrías evitar que un objeto de metal se oxide." },
        { ico: "📰", etq: "Un afiche", texto: "Propuesta dos: imaginá que sos un científico o una científica. Diseñá un afiche informativo para explicar la combustión y sus cuidados." },
        { ico: "🎨", etq: "Un dibujo", texto: "Propuesta tres: dibujá un objeto que sufra corrosión y otro que presente combustión. Escribí una breve explicación de cada uno." }
      ]
    }
  ]
};
if (typeof module !== "undefined") module.exports = DATOS;
