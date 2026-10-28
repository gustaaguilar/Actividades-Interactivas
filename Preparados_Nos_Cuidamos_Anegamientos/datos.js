// ============================================================
//  PREPARADOS NOS CUIDAMOS — Qué hacer ante anegamientos e inundaciones
//  Basado en el "Instructivo básico para la realización de simulacros ante
//  anegamientos e inundaciones en establecimientos educativos"
//  (Dirección General de Escuelas, en coordinación con la Dirección Provincial
//  de Defensa Civil – Ministerio de Seguridad y Justicia de Mendoza).
// ============================================================
var DATOS = {
  meta: {
    titulo: "Preparados nos cuidamos",
    subtitulo: "Qué hacer ante anegamientos e inundaciones en la escuela",
    etiqueta: "Prevención y cuidado · Nivel Primario",
    grado: "Prevención y cuidado · Nivel Primario",
    fuente: "Basado en el Instructivo básico para la realización de simulacros ante anegamientos e inundaciones en establecimientos educativos (DGE y Defensa Civil de Mendoza)",
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
    lupaMapa: "Para ver el dibujo bien de cerca, tocá la lupa.",
    lupaImg: "Para ver la imagen bien de cerca, tocá la lupa.",
    cierre: "¡Excelente trabajo! Ya sabés que ante un anegamiento la prevención, el corte anticipado de servicios y el resguardo en sectores elevados son lo más importante. Preparados, nos cuidamos entre todos."
  },

  pantallas: [

    // ======================= INTRODUCCIÓN =======================
    {
      id: "intro", tipo: "narracion", img: "img/lluvia_escuela.jpg",
      titulo: "🌧️ Lluvias intensas en la escuela",
      inst: "Cuando llueve muy fuerte, la escuela también tiene que estar preparada. Escuchá.",
      pasos: [
        { ico: "🌧️", etq: "Lluvias intensas", texto: "Cuando hay lluvias intensas, el agua puede juntarse en patios, aulas, pasillos y calles. Eso es un anegamiento." },
        { ico: "🌊", etq: "Inundación", texto: "Si el agua sigue subiendo y cubre una zona, hablamos de una inundación." },
        { ico: "🏫", etq: "Escuela segura", texto: "Los directivos revisan la escuela para que esté en condiciones de brindar seguridad a todos ante eventos meteorológicos severos." },
        { ico: "🧑‍🤝‍🧑", etq: "Simulacros", texto: "Por eso en la escuela hacemos simulacros: practicamos qué hacer antes, durante y después de un anegamiento." }
      ]
    },

    {
      id: "comparar", tipo: "narracion", modo: "svg", escena: "comparar",
      titulo: "⚖️ No es igual que un sismo",
      inst: "Ante un sismo y ante un anegamiento no actuamos igual. Mirá la diferencia.",
      pasos: [
        { x: 25, y: 48, mostrar: "cs_sismo", texto: "Ante un sismo, después del movimiento salimos hacia el punto de encuentro." },
        { x: 75, y: 48, mostrar: "cs_agua", texto: "Ante un anegamiento por lluvias intensas es distinto: salir rápido a la calle puede ser más peligroso." },
        { x: 72, y: 34, mostrar: "cs_arriba", texto: "En un anegamiento, la evacuación rápida a la vía pública no es lo principal: vamos a la zona alta y segura de la escuela." },
        { x: 18, y: 92, mostrar: "cs_k1", texto: "Lo que más importa es la prevención," },
        { x: 50, y: 92, mostrar: "cs_k2", texto: "el corte anticipado de servicios, como la energía eléctrica," },
        { x: 82, y: 92, mostrar: "cs_k3", texto: "y el resguardo en sectores elevados, es decir, en la zona más alta y segura del edificio." }
      ]
    },

    // ======================= 1. ANTES =======================
    {
      id: "antes_escuela", tipo: "hotspot", escena: "escuela",
      titulo: "🔎 Antes: la revisión preventiva",
      inst: "Antes de la emergencia, las autoridades y el personal revisan la escuela. Tocá cada número para descubrir qué se revisa.",
      marcadores: [
        { etq: "1", x: 84, y: 37, titulo: "Techos y canaletas", texto: "Se mantienen libres de residuos, hojas u obstrucciones para que el agua de lluvia corra." },
        { etq: "2", x: 92, y: 74, titulo: "Desagües pluviales y rejillas", texto: "Se verifican y se mantienen limpios, sin hojas ni basura que tapen el paso del agua." },
        { etq: "3", x: 21, y: 86, titulo: "Acequias y cámaras de inspección", texto: "También se mantienen libres de residuos, hojas u obstrucciones." },
        { etq: "4", x: 33, y: 92, titulo: "Sectores de riesgo", texto: "Se relevan los sectores bajos, depósitos, salas técnicas y los puntos por donde suele entrar el agua. Si la escuela tiene subsuelo o ascensor, también se revisan, y se verifica que funcionen las bombas de achique." },
        { etq: "5", x: 21, y: 67, titulo: "Tablero eléctrico", texto: "Se identifican los tableros eléctricos y se define con nombre y apellido quién está autorizado a hacer el corte preventivo." },
        { etq: "6", x: 38, y: 72, titulo: "Instalaciones precarias", texto: "Se evitan las instalaciones hechizas, las prolongaciones y las zapatillas apoyadas directamente sobre el piso." },
        { etq: "7", x: 82, y: 56, titulo: "Documentación y tecnología", texto: "La CPU, la UPS, los servidores, los equipos de comunicación, los libros matrices y la documentación irremplazable se elevan fuera del nivel del piso." },
        { etq: "8", x: 44, y: 64, titulo: "Zona de resguardo", texto: "Se definen vías de evacuación despejadas y zonas de resguardo en niveles superiores o planos elevados dentro del edificio. En una escuela de una sola planta, es el sector más alto del edificio." },
        { etq: "9", x: 67, y: 59, titulo: "Botiquín y listas", texto: "Cada aula tiene su botiquín de primeros auxilios actualizado, con la lista oficial de estudiantes del grado." }
      ]
    },

    {
      id: "antes_asociar", tipo: "asociar", img: "img/revision_preventiva.jpg",
      titulo: "🧩 ¿Qué se hace con cada cosa?",
      inst: "Uní cada parte de la escuela con lo que hay que hacer antes de la emergencia. Tocá una tarjeta de la izquierda y después su pareja de la derecha.",
      pares: [
        { a: "Desagües y acequias", b: "Mantenerlos libres de residuos y hojas", conf: "Los desagües y las acequias se mantienen libres de residuos, hojas u obstrucciones." },
        { a: "Sectores bajos y depósitos", b: "Relevarlos como sectores de riesgo", conf: "Los sectores bajos y los depósitos se relevan como sectores de riesgo." },
        { a: "Tablero eléctrico", b: "Definir quién está autorizado a hacer el corte", conf: "En el tablero eléctrico, se define quién está autorizado a operar el corte preventivo." },
        { a: "CPU y libros matrices", b: "Elevarlos fuera del nivel del piso", conf: "La CPU y los libros matrices se elevan fuera del nivel del piso." },
        { a: "Bombas de achique", b: "Verificar que funcionen", conf: "Las bombas de achique se revisan para verificar que funcionen." },
        { a: "Botiquín del aula", b: "Tenerlo actualizado, con la lista de estudiantes", conf: "El botiquín del aula está actualizado y tiene la lista oficial de estudiantes." }
      ]
    },

    {
      id: "antes_vf", tipo: "vf", img: "img/tablero.jpg",
      titulo: "✅ Prevención: ¿verdadero o falso?",
      inst: "Leé cada afirmación sobre la revisión preventiva y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "Las zapatillas eléctricas pueden quedar apoyadas en el piso.", v: false, img: "img/tablero.jpg",
          conf: "¡Falso! Hay que evitar las zapatillas y las prolongaciones apoyadas directamente sobre el piso: si entra agua, hay riesgo eléctrico." },
        { t: "Cualquier persona puede cortar la luz en el tablero general.", v: false, img: "img/tablero.jpg",
          conf: "¡Falso! Se define con nombre y apellido quién está autorizado a operar el corte preventivo." },
        { t: "Siempre que se pueda, los tableros secundarios y los tomacorrientes se elevan a un plano seguro o al piso superior.", v: true, img: "img/tablero.jpg",
          conf: "¡Verdadero! Así quedan lejos del agua si la escuela se anega." },
        { t: "Las motobombas a combustión pueden usarse en un lugar cerrado.", v: false, img: "img/bomba.jpg",
          conf: "¡Falso! Las motobombas a combustión solo deben funcionar en ambientes abiertos y ventilados." },
        { t: "Las zonas de resguardo se definen en los niveles superiores o en planos elevados del edificio.", v: true, img: "img/revision_preventiva.jpg",
          conf: "¡Verdadero! Si la escuela es de una sola planta, la zona de resguardo es su sector más alto, lejos del agua." }
      ]
    },

    // ======================= 2. DURANTE: EN EL AULA =======================
    {
      id: "aula_alerta", tipo: "narracion", img: "img/aula_alerta.jpg",
      titulo: "📢 ¡Alerta por anegamiento!",
      inst: "Si hay alerta o empieza una lluvia intensa con riesgo de anegamiento, en el aula pasa esto. Escuchá.",
      pasos: [
        { ico: "📢", etq: "La voz del docente", texto: "Con voz alta y clara, el docente indicará: ¡Atención! Alerta por anegamiento. Elevamos pertenencias y nos preparamos para resguardo." },
        { ico: "🎒", etq: "Elevamos objetos", texto: "Elevamos los objetos del piso, como mochilas y carpetas, sobre los bancos o las mesas." },
        { ico: "🔌", etq: "Desconectamos", texto: "Se desconectan los artefactos eléctricos, sin manipular cables o fichas que estén sobre pisos húmedos o alcanzados por agua." },
        { ico: "🚪", etq: "Lejos de ventanales", texto: "Nos mantenemos alejados de los ventanales y dejamos las puertas abiertas para facilitar la circulación ordenada." }
      ]
    },

    {
      id: "aula_oraciones", tipo: "oracion", img: "img/aula_alerta.jpg",
      titulo: "✍️ Armamos la consigna",
      inst: "Tocá las palabras en orden para armar cada oración. La primera palabra empieza con mayúscula y la última termina con punto.",
      oraciones: [
        { t: "Elevamos pertenencias y nos preparamos para resguardo." },
        { t: "Nos mantenemos alejados de los ventanales." },
        { t: "Dejamos las puertas abiertas para circular ordenadamente." }
      ],
      fin: "¡Muy bien! Esas son las consignas que hay que recordar cuando el docente da la alerta en el aula."
    },

    {
      id: "aula_clasificar", tipo: "clasificar", img: "img/aula_alerta.jpg",
      titulo: "🏫 En el aula: ¿sí o no?",
      inst: "Leé cada acción y tocá si es lo que hay que hacer en el aula ante la alerta, o si no se debe hacer.",
      categorias: ["👍 Sí, hay que hacerlo", "🚫 No se debe hacer"],
      items: [
        { t: "Subir las mochilas y carpetas a los bancos", cat: 0 },
        { t: "Dejar las mochilas tiradas en el piso", cat: 1, conf: "No se debe: los objetos del piso se elevan sobre los bancos o las mesas." },
        { t: "Desconectar los artefactos sin tocar cables mojados", cat: 0 },
        { t: "Desenchufar una ficha que está en el agua", cat: 1, conf: "No se debe: nunca se manipulan cables o fichas sobre pisos húmedos o alcanzados por agua." },
        { t: "Alejarse de los ventanales", cat: 0 },
        { t: "Cerrar las puertas del aula", cat: 1, conf: "No se debe: las puertas se mantienen abiertas para facilitar la circulación ordenada." },
        { t: "Escuchar con atención la voz del docente", cat: 0 }
      ],
      fin: "¡Muy bien! Elevamos pertenencias, desconectamos con cuidado, nos alejamos de los ventanales y dejamos las puertas abiertas."
    },

    // ======================= 2. DURANTE: ALARMA Y CORTE =======================
    {
      id: "secuencia", tipo: "ordenar",
      titulo: "🔢 Paso a paso",
      inst: "Tocá los pasos en el orden en que ocurren durante la emergencia o el simulacro.",
      items: [
        { ico: "📢", t: "El docente da la alerta con voz alta y clara" },
        { ico: "🎒", t: "Elevamos las pertenencias del piso" },
        { ico: "📯", t: "Suena la alarma: silbato, campana o megáfono" },
        { ico: "⚡", t: "El personal designado corta la energía en el tablero general" },
        { ico: "⛔", t: "Se restringe el acceso a los sectores bajos" },
        { ico: "⬆️", t: "Vamos a la zona alta y segura de la escuela" }
      ],
      fin: "¡Perfecto! Primero la alerta y las acciones en el aula, después la alarma y el corte preventivo, y por último el desplazamiento a la zona alta."
    },

    {
      id: "alarma_trivia", tipo: "trivia", img: "img/alarma.jpg",
      titulo: "📯 La alarma y el corte preventivo",
      inst: "Decidido el resguardo, se activa la alarma y se hace el corte preventivo. Respondé las preguntas.",
      preguntas: [
        { q: "¿Por qué la alarma se da con silbato, campana o megáfono?",
          ops: ["Porque se escucha fácilmente y no depende de la red eléctrica", "Porque es más divertido", "Porque así no se entera nadie", "Porque la luz siempre funciona"], ok: 0,
          conf: "¡Muy bien! La alarma tiene que ser fácilmente audible e independiente de la red eléctrica, porque la energía se va a cortar." },
        { q: "¿Para qué se corta la energía eléctrica en el tablero general?",
          ops: ["Para evitar riesgos de electrocución", "Para que la escuela ahorre luz", "Para que no funcione el timbre", "Para que se apaguen las computadoras"], ok: 0,
          conf: "¡Exacto! El corte preventivo evita riesgos de electrocución cuando hay agua cerca de la instalación." },
        { q: "¿Quién hace el corte de energía?",
          ops: ["El personal designado", "Cualquier estudiante", "El primero que llega", "Nadie, se deja todo prendido"], ok: 0,
          conf: "¡Correcto! Lo hace de inmediato el personal designado y autorizado para operar el tablero." },
        { q: "¿Qué pasa con los sectores bajos de la escuela durante la emergencia?",
          ops: ["Se restringe el acceso de inmediato", "Se usan para guardar las mochilas", "Se juega ahí hasta que pase", "Quedan abiertos para todos"], ok: 0,
          conf: "¡Muy bien! Se restringe de inmediato el acceso a los sectores bajos y, si la escuela los tiene, a los subsuelos. Y si hay ascensor, su uso está absolutamente prohibido." }
      ]
    },

    // ======================= 2. DURANTE: A LA ZONA ALTA Y SEGURA =======================
    {
      id: "vertical", tipo: "narracion", modo: "svg", escena: "vertical",
      titulo: "⬆️ Vamos a la zona alta y segura",
      inst: "Terminadas las acciones en el aula, vamos al punto de encuentro interno: la zona alta y segura de la escuela. Mirá el recorrido.",
      pasos: [
        { x: 27, y: 74, mostrar: "v_aula", texto: "Salimos del aula de manera calmada, sin correr y en fila." },
        { x: 40, y: 72, mostrar: "v_botiquin", texto: "El docente lleva el botiquín de primeros auxilios con el listado de alumnos." },
        { x: 55, y: 80, mostrar: "v_camino", texto: "Caminamos con las manos a los costados del cuerpo, en posición natural, lejos del patio y de los sectores bajos, donde se junta el agua." },
        { x: 66, y: 60, mostrar: "v_resguardo", texto: "Llegamos a la zona alta y segura: el sector más elevado de la escuela, que cada institución define en su Plan de Emergencia." },
        { x: 84, y: 28, mostrar: "v_planta", texto: "Si tu escuela tiene planta alta, se sube por la escalera. El ascensor nunca se usa." },
        { x: 12, y: 80, mostrar: "v_calle", texto: "Si afuera la calle, las acequias o las correntadas son un riesgo mayor, nos quedamos en las zonas altas y seguras del edificio." },
        { x: 38, y: 10, mostrar: "v_espera", texto: "Esperamos allí hasta que el evento disminuya o haya accesos seguros coordinados con Defensa Civil o el 911." }
      ]
    },

    {
      id: "desplazamiento", tipo: "clasificar", img: "img/evacuacion_zona_alta.jpg",
      titulo: "🚶 ¿Cómo nos desplazamos?",
      inst: "Leé cada forma de moverse hacia la zona de resguardo y tocá si está bien o no.",
      categorias: ["✅ Así sí", "❌ Así no"],
      items: [
        { t: "Caminar de manera calmada, sin correr", cat: 0 },
        { t: "Ir en fila, manteniendo el orden", cat: 0 },
        { t: "Llevar las manos a los costados del cuerpo, en posición natural", cat: 0 },
        { t: "Correr y empujar para llegar primero", cat: 1 },
        { t: "Quedarse en el patio, donde se junta el agua", cat: 1, conf: "Así no: el patio y los sectores bajos son los primeros lugares donde se acumula el agua." },
        { t: "Ir a buscar algo a un sector bajo de la escuela", cat: 1, conf: "Así no: el acceso a los sectores bajos se restringe de inmediato." },
        { t: "Ayudar en el traslado de compañeros con movilidad reducida, junto al personal designado", cat: 0, conf: "Así sí: se presta especial atención a los alumnos con movilidad reducida o discapacidad, con personal o docentes designados para colaborar en su traslado." },
        { t: "Salir corriendo a la calle con correntada", cat: 1, conf: "Así no: si el exterior es un riesgo mayor, nos quedamos en las zonas altas y seguras del edificio." }
      ],
      fin: "¡Muy bien! Nos desplazamos con calma, en fila y ordenados, cuidando especialmente a quienes necesitan ayuda."
    },

    {
      id: "resguardo_vf", tipo: "vf", img: "img/resguardo.jpg",
      titulo: "🏢 ¿Salimos o nos quedamos?",
      inst: "Leé cada afirmación sobre el resguardo y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "Ante un anegamiento, lo más importante siempre es salir rápido a la vereda.", v: false,
          conf: "¡Falso! En un anegamiento, la prevención, el corte de servicios y el resguardo en sectores elevados priman sobre la evacuación rápida a la vía pública." },
        { t: "Si afuera hay correntadas, la comunidad educativa permanece en las zonas altas y seguras del edificio.", v: true,
          conf: "¡Verdadero! Se queda allí hasta que disminuya el evento o existan accesos seguros coordinados con Defensa Civil o el 911." },
        { t: "El punto de encuentro interno está en los pisos superiores o en zonas elevadas de la escuela.", v: true,
          conf: "¡Verdadero! En una escuela de una sola planta, es el sector más alto del edificio: vamos hacia lo alto, no hacia afuera." },
        { t: "Los docentes dejan el botiquín en el aula para no cargar peso.", v: false,
          conf: "¡Falso! Los docentes toman el botiquín de primeros auxilios con el listado de alumnos." }
      ]
    },

    // ======================= 3. DESPUÉS =======================
    {
      id: "punto_resguardo", tipo: "narracion", img: "img/asistencia.jpg",
      titulo: "📋 En el punto de resguardo",
      inst: "Una vez concentrados en la zona alta y segura, los docentes verifican tres cosas. Escuchá.",
      pasos: [
        { ico: "📋", etq: "Control de asistencia", texto: "Controlan la asistencia con las listas oficiales del botiquín. Si falta un niño, se informa de inmediato a la autoridad escolar." },
        { ico: "🩹", etq: "Atención de heridos", texto: "Detectan y atienden en forma primaria a los heridos, si los hubiera." },
        { ico: "👨‍👩‍👧", etq: "Entrega a las familias", texto: "Permanecen de manera coordinada hasta la entrega de los estudiantes, según el Plan de Emergencia de la institución y el Plan de Acción Familiar de los padres." }
      ]
    },

    {
      id: "despues_trivia", tipo: "trivia", img: "img/asistencia.jpg",
      titulo: "🧒 Todos presentes",
      inst: "Pensá qué se hace en el punto de resguardo y elegí la respuesta correcta.",
      preguntas: [
        { q: "¿Con qué se controla la asistencia en la zona de resguardo?",
          ops: ["Con las listas oficiales del botiquín", "Preguntando a los chicos de memoria", "Con el cuaderno de comunicados", "No se controla"], ok: 0,
          conf: "¡Muy bien! Por eso el botiquín de cada aula tiene la lista oficial de estudiantes del grado." },
        { q: "Si al contar falta un compañero, ¿qué hace el docente?",
          ops: ["Informa de inmediato a la autoridad escolar", "Sale solo a buscarlo bajo la lluvia", "Espera a mañana", "No dice nada"], ok: 0,
          conf: "¡Exacto! Se informa de inmediato a la autoridad escolar." },
        { q: "¿Cómo se entregan los estudiantes a sus familias?",
          ops: ["Según el Plan de Emergencia de la escuela y el Plan de Acción Familiar", "Se van solos apenas para la lluvia", "Con el primer adulto que pasa", "Cruzando la calle anegada"], ok: 0,
          conf: "¡Correcto! La entrega se coordina según el Plan de Emergencia de la institución y el Plan de Acción Familiar de los padres." }
      ]
    },

    {
      id: "revision", tipo: "hotspot", escena: "revision",
      titulo: "🔧 Revisión técnica de la escuela",
      inst: "Inmediatamente después del evento o del ejercicio, las autoridades evalúan las instalaciones. Tocá cada número.",
      marcadores: [
        { etq: "1", x: 31, y: 56, titulo: "Tableros y tomacorrientes", texto: "Se revisa si entró agua a los tableros eléctricos o a los tomacorrientes." },
        { etq: "2", x: 90, y: 82, titulo: "Sectores bajos y depósitos", texto: "Se revisa si entró agua a los sectores bajos, a los depósitos y, si los hay, a los subsuelos." },
        { etq: "3", x: 36, y: 90, titulo: "Patios, aulas y pasillos", texto: "Se revisa si hay acumulación de agua o barro en los patios, las aulas o las vías de circulación." },
        { etq: "4", x: 69, y: 30, titulo: "Techos y canaletas", texto: "Se revisa el estado de los techos, las cubiertas y las canaletas." },
        { etq: "5", x: 46, y: 52, titulo: "Vidrios y cables", texto: "Se revisa si hay vidrios rotos o cables caídos." },
        { etq: "6", x: 22, y: 82, titulo: "Acequias y cámaras sépticas", texto: "Se revisa si hubo desborde de acequias o de cámaras sépticas." }
      ]
    },

    {
      id: "decisiones", tipo: "clasificar", img: "img/revision_tecnica.jpg",
      titulo: "🚦 ¿Qué decisión se toma?",
      inst: "Según el estado del edificio se decide qué hacer. Leé cada situación y tocá la decisión que corresponde.",
      categorias: ["🟢 A: Se vuelve a las actividades", "🔴 B: Se mantienen las restricciones"],
      items: [
        { t: "La escuela no tiene ninguna afectación", cat: 0 },
        { t: "Hay solo daños menores", cat: 0, conf: "A: sin afectación o con daños menores, se autoriza la permanencia de la comunidad o el retorno a las actividades." },
        { t: "Entró agua al tablero eléctrico", cat: 1, conf: "B: hay riesgo eléctrico, así que no se restablece la energía hasta que el agua se retire y la instalación sea revisada." },
        { t: "Entró agua en un aula", cat: 1 },
        { t: "Hay cables caídos en el pasillo", cat: 1 },
        { t: "El patio está anegado", cat: 1 }
      ],
      fin: "¡Muy bien! Sin daños o con daños menores se vuelve a las actividades. Si hay anegamiento o riesgo eléctrico, se mantienen las restricciones."
    },

    {
      id: "energia_trivia", tipo: "trivia", img: "img/revision_tecnica.jpg",
      titulo: "💡 Cuando hay agua o riesgo eléctrico",
      inst: "Si hay anegamiento o riesgo eléctrico, hay reglas importantes. Respondé.",
      preguntas: [
        { q: "¿Cuándo se puede volver a dar la energía eléctrica?",
          ops: ["Cuando el agua se retiró y personal competente revisó la instalación", "Apenas deja de llover", "Cuando alguien tiene que cargar el celular", "Enseguida, para prender las luces"], ok: 0,
          conf: "¡Muy bien! Es muy importante no restablecer la energía hasta que el agua se haya retirado y la instalación sea revisada por personal competente." },
        { q: "¿Qué pasa con los sectores inundados?",
          ops: ["Se mantiene la prohibición de ingreso", "Se puede entrar a mirar", "Se usan para jugar", "Se abren para todos"], ok: 0,
          conf: "¡Exacto! Se mantiene la prohibición de ingreso a los sectores inundados y, si los hay, a los subsuelos." },
        { q: "¿Cuándo se hace el retiro coordinado de los alumnos?",
          ops: ["Si la vía pública es segura", "Aunque la calle tenga correntada", "Nunca", "Antes de revisar la escuela"], ok: 0,
          conf: "¡Correcto! Si la vía pública es segura, se procede al retiro coordinado de los alumnos." }
      ]
    },

    // ======================= 4. RIESGO SANITARIO =======================
    {
      id: "agua_sucia", tipo: "narracion", modo: "svg", escena: "agua",
      titulo: "🦠 El agua de inundación",
      inst: "Hay que recordar algo muy importante sobre el agua que se acumula por una inundación. Mirá.",
      pasos: [
        { x: 50, y: 49, mostrar: "a_charco", texto: "El agua acumulada por una inundación debe considerarse potencialmente contaminada." },
        { x: 19, y: 78, mostrar: "a_servidas", texto: "Puede tener aguas servidas, es decir, agua de las cloacas," },
        { x: 40, y: 84, mostrar: "a_quimicos", texto: "químicos," },
        { x: 63, y: 84, mostrar: "a_residuos", texto: "residuos," },
        { x: 85, y: 80, mostrar: "a_cortantes", texto: "y elementos cortantes que no se ven bajo el agua." },
        { x: 60, y: 23, mostrar: "a_prohibido", texto: "Por eso, queda estrictamente prohibido entrar en contacto directo, caminar o jugar en los sectores anegados." },
        { x: 85, y: 33, mostrar: "a_comida", texto: "Y todo alimento que haya tenido contacto con el agua de inundación se desecha." }
      ]
    },

    {
      id: "sanitario", tipo: "clasificar", img: "img/agua_contaminada.jpg",
      titulo: "🚸 ¿Se puede o no se puede?",
      inst: "Leé cada acción y tocá si se puede hacer o no se puede hacer después de una inundación.",
      categorias: ["👍 Se puede", "⛔ No se puede"],
      items: [
        { t: "Saltar y jugar en los charcos del patio anegado", cat: 1, conf: "No se puede: está estrictamente prohibido jugar en sectores anegados." },
        { t: "Caminar por el pasillo inundado para llegar antes", cat: 1 },
        { t: "Comer una fruta que quedó en el agua", cat: 1, conf: "No se puede: todo alimento que tuvo contacto con agua de inundación se desecha." },
        { t: "Tirar los alimentos que tocó el agua de inundación", cat: 0 },
        { t: "Quedarse lejos de los sectores anegados", cat: 0 },
        { t: "Avisar a un adulto si hay agua acumulada", cat: 0 },
        { t: "Tocar el agua para ver si está fría", cat: 1, conf: "No se puede: el agua de inundación puede tener aguas servidas, químicos, residuos y elementos cortantes." }
      ],
      fin: "¡Muy bien! El agua de inundación puede estar contaminada: no la tocamos, no caminamos ni jugamos en ella, y desechamos los alimentos que la tocaron."
    },

    // ======================= REPASO =======================
    {
      id: "sopa", tipo: "sopa", img: "img/lluvia_escuela.jpg", tam: 10,
      titulo: "🔤 Sopa de letras de la prevención",
      inst: "Buscá seis palabras de lo que aprendiste. Tocá la primera letra y después la última.",
      palabras: [
        { w: "RESGUARDO", decir: "Resguardo" }, { w: "ACEQUIA", decir: "Acequia" }, { w: "ALERTA", decir: "Alerta" },
        { w: "TABLERO", decir: "Tablero" }, { w: "BOTIQUIN", decir: "Botiquín" }, { w: "ELEVAR", decir: "Elevar" }
      ],
      fin: "¡Encontraste todas las palabras de la prevención!"
    },

    {
      id: "momentos", tipo: "clasificar", img: "img/revision_preventiva.jpg",
      titulo: "🗓️ Antes, durante o después",
      inst: "Repasamos todo. Leé cada acción y tocá si se hace antes, durante o después de la emergencia.",
      categorias: ["🔎 Antes", "🚨 Durante", "📋 Después"],
      items: [
        { t: "Limpiar desagües, canaletas y acequias", cat: 0 },
        { t: "Elevar la CPU y los libros matrices", cat: 0 },
        { t: "Actualizar el botiquín con la lista de estudiantes", cat: 0 },
        { t: "Elevar las mochilas sobre los bancos", cat: 1 },
        { t: "Cortar la energía en el tablero general", cat: 1 },
        { t: "Ir en fila a la zona alta y segura", cat: 1 },
        { t: "Controlar la asistencia con las listas", cat: 2 },
        { t: "Revisar techos, tableros y sectores bajos", cat: 2 },
        { t: "Entregar a los estudiantes según el Plan de Acción Familiar", cat: 2, conf: "Después: los estudiantes se entregan según el Plan de Emergencia de la escuela y el Plan de Acción Familiar." }
      ],
      fin: "¡Excelente! Antes prevenimos, durante nos resguardamos en lo alto y después controlamos, revisamos y nos cuidamos del agua contaminada."
    },

    {
      id: "desafio", tipo: "trivia", img: "img/resguardo.jpg",
      titulo: "🏆 Desafío final",
      inst: "Llegó el desafío final. Respondé cinco preguntas para demostrar que estás preparado.",
      preguntas: [
        { q: "Ante un anegamiento, ¿hacia dónde nos resguardamos?",
          ops: ["Hacia la zona alta y segura de la escuela", "Hacia el sector más bajo", "Hacia la calle", "Hacia el patio"], ok: 0,
          conf: "¡Muy bien! Nos resguardamos en la zona alta y segura: el sector más elevado de la escuela." },
        { q: "¿Qué decimos cuando el docente da la alerta?",
          ops: ["Elevamos pertenencias y nos preparamos para resguardo", "Salimos corriendo a la vereda", "Nos quedamos en el patio", "Cerramos todas las puertas"], ok: 0,
          conf: "¡Exacto! Atención, alerta por anegamiento: elevamos pertenencias y nos preparamos para resguardo." },
        { q: "¿Por qué se corta la luz en el tablero general?",
          ops: ["Para evitar riesgos de electrocución", "Para que no se escuche la alarma", "Para ahorrar energía", "Para que oscurezca"], ok: 0,
          conf: "¡Correcto! Agua y electricidad juntas son muy peligrosas." },
        { q: "¿Cómo tenemos que considerar el agua de una inundación?",
          ops: ["Potencialmente contaminada", "Limpia y segura", "Buena para jugar", "Agua para tomar"], ok: 0,
          conf: "¡Muy bien! Puede tener aguas servidas, químicos, residuos y elementos cortantes." },
        { q: "¿Qué es lo que más importa ante un anegamiento?",
          ops: ["La prevención, el corte de servicios y el resguardo en lo alto", "Salir rápido a la vía pública", "Seguir la clase como si nada", "Ir a ver cómo sube el agua"], ok: 0,
          conf: "¡Excelente! Preparados, nos cuidamos entre todos." }
      ]
    }
  ]
};
if (typeof module !== "undefined") module.exports = DATOS;
