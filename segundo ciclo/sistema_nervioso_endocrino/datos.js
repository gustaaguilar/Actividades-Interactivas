// ============================================================
//  SISTEMA NERVIOSO Y SISTEMA ENDOCRINO — Cs. Naturales 7° grado
//  Basado en la secuencia didáctica del docente: carta de Natacha,
//  los sentidos, el sistema nervioso (central y periférico),
//  el sistema endocrino (glándulas y hormonas) y cuadro comparativo.
// ============================================================
var DATOS = {
  meta: {
    titulo: "Los mensajeros del cuerpo",
    subtitulo: "Sistema nervioso y sistema endocrino: quiénes coordinan todo lo que hacemos",
    etiqueta: "Ciencias Naturales · Segundo Ciclo · 7° grado",
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
    cierre: "¡Excelente trabajo! Ya sabés que el sistema nervioso y el sistema endocrino trabajan en equipo: uno manda mensajes rápidos por los nervios y el otro, mensajes más lentos y duraderos por la sangre, con las hormonas."
  },

  pantallas: [

    // ================= APERTURA: LA CARTA DE NATACHA =================
    {
      id: "natacha", tipo: "narracion", img: "img/natacha.jpg",
      titulo: "📝 La carta de Natacha",
      inst: "Natacha, de las chicas Perla, escribió lo que piensa del cuerpo humano. Escuchá lo que dice.",
      pasos: [
        { ico: "🫀", etq: "Muchos órganos", texto: "Natacha dice que el cuerpo está formado por muchísimos órganos, huesos y sistemas, ¡y que imaginarlo por dentro le da un poco de asquito!" },
        { ico: "🦴", etq: "¿Huesos blanditos?", texto: "Dice que el sistema óseo protege las partes débiles, como los ojos y el cerebro... pero que es muy blandito." },
        { ico: "🍽️", etq: "Un mozo", texto: "Cuenta que el sistema circulatorio es como un mozo: lleva la comida y el oxígeno a cada mesa del cuerpo." },
        { ico: "🤝", etq: "¿Cada uno solo?", texto: "Y cree que cada sistema hace algo distinto y que no se pueden ayudar entre ellos. ¿Tendrá razón Natacha?" }
      ]
    },

    {
      id: "natacha_vf", tipo: "vf", img: "img/natacha.jpg",
      titulo: "🤔 ¿Natacha tiene razón?",
      inst: "Leé cada frase de la carta y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "El sistema circulatorio está formado por el corazón, las arterias y las venas.", v: true,
          conf: "¡Verdadero! El corazón bombea la sangre, que viaja por arterias y venas llevando alimento y oxígeno a todo el cuerpo." },
        { t: "El sistema óseo es muy blandito.", v: false,
          conf: "¡Falso! Los huesos son duros y resistentes: por eso pueden sostener el cuerpo y proteger órganos como el cerebro." },
        { t: "El intestino tiene tres partes: la Santa María, la Pinta y la Niña.", v: false,
          conf: "¡Falso! Esos son los nombres de las carabelas de Colón. El sistema digestivo tiene boca, esófago, estómago, intestino delgado e intestino grueso." },
        { t: "El sistema respiratorio incluye los pulmones y los bronquios.", v: true,
          conf: "¡Verdadero! Por los bronquios llega el aire a los pulmones, donde la sangre toma el oxígeno." },
        { t: "Los sistemas del cuerpo no se pueden ayudar entre ellos.", v: false,
          conf: "¡Falso! Los sistemas trabajan en equipo, y hay dos que se encargan de coordinarlos a todos: el sistema nervioso y el sistema endocrino." }
      ]
    },

    {
      id: "organos_sistemas", tipo: "asociar", img: "img/sistemas.jpg",
      titulo: "🧩 Cada órgano en su sistema",
      inst: "Tocá un órgano de la izquierda y después el sistema al que pertenece, a la derecha.",
      pares: [
        { a: "Corazón", b: "Circulatorio", conf: "El corazón pertenece al sistema circulatorio: bombea la sangre." },
        { a: "Pulmones", b: "Respiratorio", conf: "Los pulmones pertenecen al sistema respiratorio: allí entra el oxígeno a la sangre." },
        { a: "Estómago", b: "Digestivo", conf: "El estómago pertenece al sistema digestivo: transforma los alimentos." },
        { a: "Riñones", b: "Urinario", conf: "Los riñones pertenecen al sistema urinario: filtran la sangre y forman la orina." },
        { a: "Huesos", b: "Óseo", conf: "Los huesos forman el sistema óseo: sostienen y protegen el cuerpo." },
        { a: "Cerebro", b: "Nervioso", conf: "El cerebro pertenece al sistema nervioso: es el centro de las actividades voluntarias, el aprendizaje y la memoria." }
      ]
    },

    // ================= LOS SENTIDOS =================
    {
      id: "sentidos", tipo: "narracion", img: "img/cajas.jpg",
      titulo: "📦 Las cajas misteriosas",
      inst: "En clase, cada grupo descubre qué hay dentro de una caja usando un solo sentido. Conocé los cinco.",
      pasos: [
        { ico: "👀", etq: "Vista", texto: "Con la vista, gracias a los ojos, reconocemos colores, formas, tamaños y distancias." },
        { ico: "👂", etq: "Oído", texto: "Con el oído captamos los sonidos: si algo suena, cruje o tintinea dentro de la caja." },
        { ico: "👃", etq: "Olfato", texto: "Con el olfato, gracias a la nariz, percibimos los olores." },
        { ico: "👅", etq: "Gusto", texto: "Con el gusto, en la lengua, distinguimos sabores dulces, salados, ácidos y amargos." },
        { ico: "✋", etq: "Tacto", texto: "Con el tacto, en la piel, sentimos si algo es suave, áspero, frío, caliente o duro." }
      ]
    },

    {
      id: "sentidos_organos", tipo: "asociar", img: "img/cajas.jpg",
      titulo: "🔎 Sentidos y órganos sensoriales",
      inst: "Uní cada sentido con su órgano sensorial: tocá el sentido y después su órgano.",
      pares: [
        { a: "Vista", b: "Ojos", conf: "La vista y los ojos: captan la luz, los colores y las formas." },
        { a: "Oído", b: "Oídos", conf: "El sentido del oído y los oídos: captan los sonidos." },
        { a: "Olfato", b: "Nariz", conf: "El olfato y la nariz: captan los olores." },
        { a: "Gusto", b: "Lengua", conf: "El gusto y la lengua: captan los sabores." },
        { a: "Tacto", b: "Piel", conf: "El tacto y la piel: captan la temperatura, la textura y la presión." }
      ]
    },

    {
      id: "estimulo_respuesta", tipo: "narracion", modo: "svg", escena: "circuito",
      titulo: "⚡ Estímulo y respuesta",
      inst: "Los animales respondemos a muchos estímulos a la vez. Mirá qué pasa cuando tocamos algo caliente.",
      pasos: [
        { x: 15, y: 62, mostrar: "estimulo", texto: "Un estímulo es un cambio en el ambiente. Por ejemplo, el calor de una taza recién servida." },
        { x: 32, y: 74, mostrar: "receptor", texto: "Los receptores de la piel captan el estímulo: ¡está muy caliente!" },
        { x: 52, y: 52, mostrar: "ida", texto: "Los nervios llevan esa información, como un mensaje eléctrico, hacia la médula y el cerebro." },
        { x: 80, y: 22, mostrar: "centro", texto: "El sistema nervioso central recibe la información, la procesa y decide una respuesta." },
        { x: 56, y: 66, mostrar: "vuelta", texto: "Otros nervios llevan la orden hasta los músculos del brazo." },
        { x: 30, y: 58, mostrar: "respuesta", texto: "¡Y retiramos la mano! El encargado de recibir la información, procesarla y dar una respuesta es el sistema nervioso." }
      ]
    },

    // ================= SISTEMA NERVIOSO =================
    {
      id: "video_sn", tipo: "video", yt: "krqempHBRAc",
      titulo: "🎬 Video: el sistema nervioso",
      inst: "Mirá el video y anotá en tu carpeta lo más importante. Cuando termines, tocá Siguiente.",
      texto: "El sistema nervioso · Aula365"
    },

    {
      id: "video_eduteca", tipo: "video", yt: "CR8wVRSIClQ",
      titulo: "🎬 Video: La Eduteca",
      inst: "Ahora mirá este otro video y seguí tomando nota. Con lo que anotaste vas a responder preguntas.",
      texto: "La Eduteca · El sistema nervioso"
    },

    {
      id: "sn_preguntas", tipo: "trivia", img: "img/cerebro.jpg",
      titulo: "❓ Preguntas sobre los videos",
      inst: "Respondé las preguntas con lo que viste en los videos.",
      preguntas: [
        { q: "¿En qué dos partes se divide el sistema nervioso?",
          ops: ["Central y periférico", "Cerebro y corazón", "Rápido y lento", "Interno y externo"], ok: 0,
          conf: "¡Muy bien! El sistema nervioso se divide en central, formado por el encéfalo y la médula espinal, y periférico, formado por los nervios." },
        { q: "¿Cuál es la función principal del sistema nervioso central?",
          ops: ["Recibir la información, procesarla y elaborar respuestas", "Bombear la sangre a todo el cuerpo", "Transformar los alimentos", "Producir hormonas para crecer"], ok: 0,
          conf: "¡Exacto! El sistema nervioso central tiene los centros nerviosos que reciben la información, la procesan y elaboran las respuestas." },
        { q: "¿A qué se llama órganos sensoriales?",
          ops: ["A los órganos que captan los estímulos del ambiente", "A los órganos que digieren los alimentos", "A los huesos de la cabeza", "A las glándulas que producen hormonas"], ok: 0,
          conf: "¡Correcto! Los ojos, los oídos, la nariz, la lengua y la piel captan estímulos y envían la información al sistema nervioso." },
        { q: "¿Por qué se producen los movimientos del organismo?",
          ops: ["Porque el sistema nervioso envía órdenes a los músculos", "Porque los huesos se mueven solos", "Porque la sangre empuja los brazos", "Porque las hormonas son músculos"], ok: 0,
          conf: "¡Muy bien! Los movimientos se producen porque el sistema nervioso envía órdenes, a través de los nervios, a los músculos." },
        { q: "¿Qué es un movimiento voluntario?",
          ops: ["Uno que hacemos porque lo decidimos, como patear una pelota", "Uno que ocurre sin que lo pensemos, como el latido", "Uno que solo hacemos dormidos", "Uno que hacen las glándulas"], ok: 0,
          conf: "¡Exacto! Los movimientos voluntarios los decidimos nosotros, y los controla el cerebro." }
      ]
    },

    {
      id: "sn_cuerpo", tipo: "hotspot", escena: "cuerpoSN",
      titulo: "🧠 Las partes del sistema nervioso",
      inst: "Tocá cada número para conocer las partes del sistema nervioso.",
      marcadores: [
        { etq: "1", x: 40, y: 9, titulo: "Cerebro", texto: "Es el centro de todas las actividades conscientes y voluntarias, y de las facultades intelectuales como el aprendizaje, la inteligencia y la memoria." },
        { etq: "2", x: 62, y: 19, titulo: "Cerebelo", texto: "Es el órgano encargado del equilibrio y de la coordinación de los movimientos del cuerpo." },
        { etq: "3", x: 54, y: 23, titulo: "Tronco encefálico", texto: "Controla funciones vitales como la respiración, la digestión de los alimentos y la circulación sanguínea." },
        { etq: "4", x: 56, y: 50, titulo: "Médula espinal", texto: "Es una estructura cilíndrica que está dentro de la columna vertebral. Comunica el encéfalo con el cuerpo y es el centro de los actos reflejos, como el rotuliano." },
        { etq: "5", x: 33, y: 56, titulo: "Nervios", texto: "Forman el sistema nervioso periférico: recorren todo el cuerpo, llevan los estímulos al sistema nervioso central y conducen las respuestas hacia el cuerpo." }
      ]
    },

    {
      id: "sn_red", tipo: "narracion", modo: "svg", escena: "redSN",
      titulo: "🕸️ La red conceptual",
      inst: "Mirá cómo se arma la red conceptual del sistema nervioso.",
      pasos: [
        { x: 50, y: 12, mostrar: "r1", texto: "El sistema nervioso se divide en dos grandes partes." },
        { x: 25, y: 30, mostrar: "r2", texto: "El sistema nervioso central tiene centros nerviosos que elaboran las respuestas." },
        { x: 12, y: 50, mostrar: "r3", texto: "Está formado por el encéfalo, que se encuentra protegido por el cráneo..." },
        { x: 18, y: 76, mostrar: "r4", texto: "...y el encéfalo tiene tres partes: el cerebro, el cerebelo y el tronco encefálico." },
        { x: 38, y: 50, mostrar: "r5", texto: "La otra parte del sistema nervioso central es la médula espinal, dentro de la columna vertebral." },
        { x: 75, y: 30, mostrar: "r6", texto: "El sistema nervioso periférico está formado por los nervios que recorren el cuerpo." },
        { x: 75, y: 70, mostrar: "r7", texto: "Sus nervios se dividen en el sistema nervioso somático, que se vincula con los sentidos y los movimientos, y el sistema nervioso autónomo, que controla funciones involuntarias como la circulación y la respiración." }
      ]
    },

    {
      id: "sn_funciones", tipo: "asociar", img: "img/cerebro.jpg",
      titulo: "🔗 ¿Quién hace qué?",
      inst: "Uní cada parte del sistema nervioso con su función.",
      pares: [
        { a: "Cerebro", b: "Aprendizaje, memoria y movimientos voluntarios", conf: "El cerebro: aprendizaje, memoria, inteligencia y movimientos voluntarios." },
        { a: "Cerebelo", b: "Equilibrio y coordinación", conf: "El cerebelo: equilibrio y coordinación de los movimientos." },
        { a: "Tronco encefálico", b: "Respiración, latidos y digestión", conf: "El tronco encefálico: controla funciones vitales como la respiración, la circulación y la digestión." },
        { a: "Médula espinal", b: "Actos reflejos", conf: "La médula espinal: comunica el encéfalo con el cuerpo y es el centro de los actos reflejos." },
        { a: "Nervios", b: "Llevan y traen mensajes", conf: "Los nervios: llevan los estímulos al sistema nervioso central y traen las respuestas al cuerpo." }
      ]
    },

    {
      id: "movimientos", tipo: "clasificar", img: "img/movimientos.jpg",
      titulo: "🏃 Voluntario o involuntario",
      inst: "Escuchá cada movimiento y tocá si es voluntario o involuntario.",
      categorias: ["🙋 Voluntario", "🤖 Involuntario"],
      items: [
        { t: "Patear una pelota", cat: 0 },
        { t: "Escribir en la carpeta", cat: 0 },
        { t: "Levantar la mano para hablar", cat: 0 },
        { t: "Bailar una canción", cat: 0 },
        { t: "Los latidos del corazón", cat: 1, conf: "Involuntario: el corazón late sin que lo pensemos, controlado por el tronco encefálico." },
        { t: "Respirar mientras dormimos", cat: 1 },
        { t: "Parpadear ante una luz fuerte", cat: 1, conf: "Involuntario: es un reflejo que nos protege los ojos." },
        { t: "Retirar la mano de algo caliente", cat: 1, conf: "Involuntario: es un acto reflejo, y su centro es la médula espinal." }
      ],
      fin: "¡Muy bien! Los movimientos voluntarios los decidimos con el cerebro. Los involuntarios ocurren sin que lo pensemos, como los latidos o los reflejos."
    },

    {
      id: "camino_mensaje", tipo: "ordenar", img: "img/pelota.jpg",
      titulo: "📨 El camino del mensaje",
      inst: "Una pelota viene hacia vos y la atajás. Tocá los pasos en el orden en que ocurren.",
      items: [
        { ico: "⚽", t: "Estímulo: la pelota se acerca" },
        { ico: "👀", t: "Los ojos captan la imagen" },
        { ico: "〰️", t: "Los nervios llevan la información" },
        { ico: "🧠", t: "El cerebro procesa y decide" },
        { ico: "〰️", t: "Los nervios llevan la orden" },
        { ico: "🧤", t: "Respuesta: los músculos atajan" }
      ],
      fin: "¡Perfecto! Estímulo, receptor, nervios, sistema nervioso central, nervios y respuesta: ese es el camino de cada mensaje."
    },

    {
      id: "sn_vf", tipo: "vf", img: "img/cerebro.jpg",
      titulo: "✅ Verdadero o falso",
      inst: "Leé cada afirmación sobre el sistema nervioso y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "La médula espinal se encuentra dentro de la columna vertebral.", v: true,
          conf: "¡Verdadero! La columna vertebral protege a la médula espinal." },
        { t: "El cerebelo es el centro de la memoria y la inteligencia.", v: false,
          conf: "¡Falso! La memoria y la inteligencia dependen del cerebro. El cerebelo se encarga del equilibrio y la coordinación." },
        { t: "El sistema nervioso autónomo controla funciones involuntarias, como la respiración.", v: true,
          conf: "¡Verdadero! El sistema nervioso autónomo regula funciones que ocurren sin que lo pensemos." },
        { t: "El sistema nervioso periférico está formado por el encéfalo.", v: false,
          conf: "¡Falso! El encéfalo es parte del sistema nervioso central. El periférico está formado por los nervios." },
        { t: "El sistema nervioso nos permite relacionarnos con el ambiente y reaccionar rápido.", v: true,
          conf: "¡Verdadero! Controla la actividad de todos los órganos y nos permite reaccionar rápido ante nuevas situaciones." }
      ]
    },

    {
      id: "sn_sopa", tipo: "sopa", img: "img/cerebro.jpg", tam: 10,
      titulo: "🔤 Sopa de letras nerviosa",
      inst: "Buscá seis palabras del sistema nervioso. Tocá la primera letra y después la última.",
      palabras: [
        { w: "CEREBRO", decir: "Cerebro" }, { w: "CEREBELO", decir: "Cerebelo" }, { w: "MEDULA", decir: "Médula" },
        { w: "NERVIOS", decir: "Nervios" }, { w: "ENCEFALO", decir: "Encéfalo" }, { w: "REFLEJO", decir: "Reflejo" }
      ],
      fin: "¡Encontraste todas las palabras del sistema nervioso!"
    },

    // ================= SISTEMA ENDOCRINO =================
    {
      id: "endo_intro", tipo: "narracion", img: "img/equipo.jpg",
      titulo: "🧪 ¿Solo el sistema nervioso?",
      inst: "¿Quiénes regulan y coordinan todas las funciones del organismo? ¿Solo el sistema nervioso? Escuchá.",
      pasos: [
        { ico: "⚖️", etq: "Equilibrio", texto: "El cuerpo intercambia información con el entorno todo el tiempo. Para mantener su equilibrio interno, responde con dos sistemas: el nervioso y el endocrino." },
        { ico: "🧪", etq: "Hormonas", texto: "El sistema endocrino trabaja con hormonas: sustancias que viajan por la sangre hasta el lugar donde cumplen su función." },
        { ico: "🌱", etq: "Crecimiento", texto: "El sistema endocrino controla procesos como el crecimiento..." },
        { ico: "🔥", etq: "Metabolismo", texto: "...el metabolismo, es decir, cómo usamos los alimentos y la energía..." },
        { ico: "👶", etq: "Reproducción", texto: "...y la reproducción, junto con los cambios del cuerpo en la pubertad." }
      ]
    },

    {
      id: "video_endo", tipo: "video", yt: "2vHIMtKFuGk",
      titulo: "🎬 Video: el sistema endocrino",
      inst: "Mirá el video. Fijate cómo está formado, qué órganos intervienen y por qué es importante.",
      texto: "Sistema endocrino · Biotube"
    },

    {
      id: "tipos_glandulas", tipo: "clasificar", img: "img/glandulas.jpg",
      titulo: "💧 Endocrinas o exocrinas",
      inst: "Las exocrinas vuelcan sus sustancias por conductos. Las endocrinas no tienen conductos: sus hormonas pasan directo a la sangre. Clasificá cada glándula.",
      categorias: ["🩸 Endocrina (a la sangre)", "🚰 Exocrina (por conductos)"],
      items: [
        { t: "Glándulas salivales", cat: 1, conf: "Exocrinas: la saliva sale por conductos hacia la boca." },
        { t: "Glándulas sudoríparas", cat: 1, conf: "Exocrinas: el sudor sale por conductos hacia la piel." },
        { t: "Glándulas digestivas", cat: 1 },
        { t: "Hipófisis", cat: 0 },
        { t: "Tiroides", cat: 0 },
        { t: "Suprarrenales", cat: 0 }
      ],
      fin: "¡Muy bien! Solo las glándulas endocrinas forman parte del sistema endocrino, porque sus hormonas pasan directamente a la sangre."
    },

    {
      id: "endo_cuerpo", tipo: "hotspot", escena: "cuerpoGl",
      titulo: "📍 ¿Dónde están las glándulas?",
      inst: "Tocá cada número para conocer las glándulas del sistema endocrino.",
      marcadores: [
        { etq: "1", x: 50, y: 9, titulo: "Hipófisis", texto: "Está en la base del cerebro. Es la glándula maestra: regula a las otras glándulas y produce la hormona del crecimiento." },
        { etq: "2", x: 50, y: 21, titulo: "Tiroides", texto: "Está en el cuello. Produce la tiroxina, que controla la rapidez con que se utilizan los alimentos." },
        { etq: "3", x: 50, y: 30, titulo: "Timo", texto: "Está en el pecho, detrás del esternón. Ayuda a las defensas del cuerpo, sobre todo en la infancia." },
        { etq: "4", x: 37, y: 43, titulo: "Suprarrenales", texto: "Están sobre los riñones. Producen la adrenalina, la hormona del miedo: nos prepara para huir de un peligro o superar retos." },
        { etq: "5", x: 60, y: 47, titulo: "Páncreas", texto: "Está detrás del estómago. Produce la insulina, que controla la cantidad de azúcar en la sangre." },
        { etq: "6", x: 40, y: 57, titulo: "Ovarios", texto: "En las mujeres, en la pelvis. Secretan estrógenos y progesterona, que determinan las características sexuales femeninas." },
        { etq: "7", x: 64, y: 64, titulo: "Testículos", texto: "En los varones. Producen la testosterona, que determina las características sexuales masculinas." }
      ]
    },

    {
      id: "glandula_hormona", tipo: "asociar", img: "img/glandulas.jpg",
      titulo: "🧪 Cada glándula, su hormona",
      inst: "Completamos el cuadro: uní cada glándula con la hormona que produce.",
      pares: [
        { a: "Hipófisis", b: "Hormona del crecimiento", conf: "La hipófisis produce la hormona del crecimiento, que estimula el crecimiento de los huesos y de todos los tejidos." },
        { a: "Tiroides", b: "Tiroxina", conf: "La tiroides produce la tiroxina." },
        { a: "Suprarrenales", b: "Adrenalina", conf: "Las suprarrenales producen la adrenalina, la hormona del miedo." },
        { a: "Páncreas", b: "Insulina", conf: "El páncreas produce la insulina." },
        { a: "Ovarios", b: "Estrógenos y progesterona", conf: "Los ovarios secretan estrógenos y progesterona." },
        { a: "Testículos", b: "Testosterona", conf: "Los testículos producen la testosterona." }
      ]
    },

    {
      id: "endo_funciones", tipo: "trivia", img: "img/hormonas.jpg",
      titulo: "🩺 Función y ubicación",
      inst: "Leé cada situación y tocá la glándula que corresponde.",
      preguntas: [
        { q: "Un perro te ladra de golpe y se te acelera el corazón. ¿Qué glándula actuó?",
          ops: ["Suprarrenales", "Tiroides", "Páncreas", "Ovarios"], ok: 0,
          conf: "¡Exacto! Las suprarrenales liberan adrenalina cuando nos asustamos: nos prepara para huir del peligro." },
        { q: "¿Qué glándula controla la cantidad de azúcar en la sangre?",
          ops: ["Páncreas", "Hipófisis", "Timo", "Tiroides"], ok: 0,
          conf: "¡Muy bien! El páncreas produce insulina, que controla el azúcar en la sangre." },
        { q: "¿Por qué a la hipófisis la llaman la glándula maestra?",
          ops: ["Porque regula el funcionamiento de las otras glándulas", "Porque es la más grande del cuerpo", "Porque está en la escuela", "Porque produce la insulina"], ok: 0,
          conf: "¡Correcto! La hipófisis regula a las demás glándulas endocrinas." },
        { q: "¿Dónde se ubica la tiroides?",
          ops: ["En el cuello", "Sobre los riñones", "En la pelvis", "En el pie"], ok: 0,
          conf: "¡Así es! La tiroides está en el cuello, delante de la tráquea." },
        { q: "Si aumenta mucho la tiroxina, ¿qué puede ocurrir?",
          ops: ["Nerviosismo y pérdida de peso", "Crecer muchos centímetros de golpe", "Dejar de tener sed", "Ver mejor de noche"], ok: 0,
          conf: "¡Muy bien! El aumento de tiroxina ocasiona nerviosismo y pérdida de peso; su disminución puede causar obesidad." }
      ]
    },

    {
      id: "endo_red", tipo: "trivia", escena: "redEndo",
      titulo: "🕸️ Completamos la red",
      inst: "Completá la red del sistema endocrino: elegí la palabra que falta en cada recuadro con signo de pregunta.",
      preguntas: [
        { q: "El sistema endocrino está formado por...", llenar: "e1",
          ops: ["glándulas", "nervios", "huesos", "músculos"], ok: 0,
          conf: "¡Muy bien! El sistema endocrino está formado por glándulas." },
        { q: "Las glándulas producen...", llenar: "e2",
          ops: ["hormonas", "neuronas", "saliva", "sangre"], ok: 0,
          conf: "¡Exacto! Las glándulas endocrinas producen hormonas." },
        { q: "Las hormonas viajan por...", llenar: "e3",
          ops: ["la sangre", "los nervios", "conductos", "el aire"], ok: 0,
          conf: "¡Correcto! Las hormonas viajan por la sangre hasta el órgano donde actúan." },
        { q: "Ejemplos de glándulas endocrinas: hipófisis, tiroides, páncreas y...", llenar: "e4",
          ops: ["suprarrenales", "salivales", "sudoríparas", "lagrimales"], ok: 0,
          conf: "¡Muy bien! Las suprarrenales son endocrinas. Las salivales y las sudoríparas son exocrinas." }
      ]
    },

    // ================= CIERRE: COMPARACIÓN =================
    {
      id: "comparativo", tipo: "clasificar", img: "img/mensajeros.jpg",
      titulo: "⚖️ Cuadro comparativo",
      inst: "Completamos el cuadro comparativo: ¿cada característica es del sistema nervioso o del sistema endocrino?",
      categorias: ["🧠 Sistema nervioso", "🧪 Sistema endocrino"],
      items: [
        { t: "Envía impulsos por medio de nervios", cat: 0 },
        { t: "Los mensajes son hormonas", cat: 1 },
        { t: "La transmisión de los mensajes es rápida", cat: 0 },
        { t: "La transmisión de los mensajes es más lenta", cat: 1 },
        { t: "Sus mensajes viajan por la sangre", cat: 1 },
        { t: "Está formado por encéfalo, médula y nervios", cat: 0 },
        { t: "Está formado por glándulas", cat: 1 },
        { t: "Sus efectos suelen durar poco tiempo", cat: 0 },
        { t: "Sus efectos suelen durar más tiempo", cat: 1 }
      ],
      fin: "¡Cuadro completo! El sistema nervioso usa impulsos rápidos por los nervios; el endocrino, hormonas más lentas y duraderas por la sangre. Juntos coordinan todo el organismo."
    },

    {
      id: "final_vf", tipo: "vf", img: "img/mensajeros.jpg",
      titulo: "🏁 Desafío final",
      inst: "Último desafío: decidí si cada afirmación es verdadera o falsa.",
      afirmaciones: [
        { t: "Las glándulas endocrinas reciben terminaciones nerviosas que provocan la secreción de hormonas.", v: true,
          conf: "¡Verdadero! Por eso el sistema endocrino y el sistema nervioso están en estrecha relación." },
        { t: "Las glándulas sudoríparas forman parte del sistema endocrino.", v: false,
          conf: "¡Falso! Son exocrinas: el sudor sale por conductos, no va a la sangre." },
        { t: "La hormona del crecimiento la produce la hipófisis.", v: true,
          conf: "¡Verdadero! Estimula el crecimiento de los huesos y de todos los tejidos del cuerpo." },
        { t: "El sistema nervioso trabaja solo, sin ayuda de ningún otro sistema.", v: false,
          conf: "¡Falso! Coordina el organismo junto con el sistema endocrino. Al final, Natacha estaba equivocada: los sistemas sí se ayudan." }
      ]
    },

    {
      id: "endo_sopa", tipo: "sopa", img: "img/hormonas.jpg", tam: 11,
      titulo: "🔤 Sopa de letras hormonal",
      inst: "Buscá seis palabras del sistema endocrino. Tocá la primera letra y después la última.",
      palabras: [
        { w: "HIPOFISIS", decir: "Hipófisis" }, { w: "TIROIDES", decir: "Tiroides" }, { w: "PANCREAS", decir: "Páncreas" },
        { w: "INSULINA", decir: "Insulina" }, { w: "HORMONA", decir: "Hormona" }, { w: "ADRENALINA", decir: "Adrenalina" }
      ],
      fin: "¡Encontraste todas las palabras del sistema endocrino!"
    }
  ]
};
if (typeof module !== "undefined") module.exports = DATOS;
