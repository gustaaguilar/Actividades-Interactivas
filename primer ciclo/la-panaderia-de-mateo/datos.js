// ==========================================================
// LA PANADERÍA DE MATEO - Aventureros de la Matemática (3er grado)
// Adaptación interactiva de la secuencia "La Panadería de Mateo"
// (páginas 11 a 27) del cuadernillo "Aventureros de la Matemática 3 -
// Educación Primaria - Tercer Grado", elaborado por el Equipo Técnico
// del Área de Matemática, Dirección de Planificación y Evaluación de
// la Calidad Educativa, Dirección General de Escuelas (DGE) -
// Gobierno de Mendoza, en el marco del PEAMM.
// Autores del material original: Viviana Miriam Romero, Sonia Beatriz
// Foti, María Cecilia Escudero, Juan Alberto Fernández, Ivana Carina
// Cordero y Ana Julia Llull Darder. Coordinadora: Marinés Quiroga.
// Adaptación a formato HTML5 interactivo: Prof. Gustavo Aguilar.
// ==========================================================

const DATOS = {

  titulo: "La Panadería de Mateo",
  subtitulo: "Un desafío matemático para 3er grado",
  cita: 'Basado en "Aventureros de la Matemática 3 - Educación Primaria - Tercer Grado" (secuencia "La Panadería de Mateo"), Dirección General de Escuelas (DGE) - Gobierno de Mendoza, en el marco del PEAMM.',

  pantallas: [

    // 0 --------------------------------------------------- PORTADA
    {
      id: "portada",
      tipo: "portada",
      imagen: "img/portada.jpg"
    },

    // 1 --------------------------------------------------- INTRO NARRATIVA
    {
      id: "intro",
      tipo: "info",
      imagen: "img/mateo_gio_panaderia.jpg",
      audioIntro: "audio/01_intro.mp3",
      texto: "En el barrio hay una panadería muy conocida: El Horno de Mateo. Mateo trabaja junto a su ayudante Gio contando, calculando y organizando todo para que la panadería funcione bien. Hoy vas a ayudarlos a resolver los desafíos del día. ¿Estás listo para ser un Aventurero de la Matemática?"
    },

    // 2 --------------------------------------------------- HOTSPOT: objetos perdidos
    {
      id: "objetos_perdidos",
      tipo: "hotspot",
      imagen: "img/panaderia_objetos.jpg",
      audioIntro: "audio/02_intro.mp3",
      pregunta: "Mateo dejó sus lentes, su celular y su lápiz en distintos lugares antes de empezar a trabajar. Pulsá en la lupa sobre cada objeto, después tocá \"Ampliar imagen\" para buscar mejor, y luego de cerrar con la cruz (✕), elegí la opción correcta.",
      puntos: [
        {
          x: 37, y: 65, nombre: "lentes",
          pregunta: "¿Dónde están los lentes?",
          audioPregunta: "audio/02_p_lentes.mp3",
          opciones: ["Arriba del estante", "Debajo del mostrador", "Detrás del horno"],
          correcta: 0,
          audioCorrecta: "audio/02_lentes_ok.mp3"
        },
        {
          x: 78, y: 64, nombre: "celular",
          pregunta: "¿Dónde está el celular?",
          audioPregunta: "audio/02_p_celular.mp3",
          opciones: ["Al lado de la caja registradora", "Arriba del horno", "Entre los panes"],
          correcta: 0,
          audioCorrecta: "audio/02_celular_ok.mp3"
        },
        {
          x: 87, y: 64, nombre: "lápiz",
          pregunta: "¿Dónde está el lápiz?",
          audioPregunta: "audio/02_p_lapiz.mp3",
          opciones: ["Cerca de la balanza", "Debajo de la mesa", "Arriba de la heladera"],
          correcta: 0,
          audioCorrecta: "audio/02_lapiz_ok.mp3"
        }
      ]
    },

    // 3 --------------------------------------------------- OPCION: plano del barrio
    {
      id: "plano_cerca",
      tipo: "opcion",
      imagen: "img/plano_barrio.jpg",
      zoomable: true,
      audioIntro: "audio/03_intro.mp3",
      pregunta: "Mateo tiene que ir a la escuela y al supermercado. Observá el plano: ¿qué lugar está más cerca de la panadería?",
      opciones: ["La escuela", "El supermercado", "Están a la misma distancia"],
      correcta: 0,
      audioCorrecta: "audio/03_ok.mp3",
      audioIncorrecta: "audio/03_no.mp3"
    },

    // 4 --------------------------------------------------- OPCION: camino más corto
    {
      id: "camino_corto",
      tipo: "opcion",
      imagen: "img/plano_barrio2.jpg",
      zoomable: true,
      audioIntro: "audio/04_intro.mp3",
      pregunta: "Mateo necesita ir desde la panadería hasta la estación de servicio. ¿Cuál de estas opciones indica el camino más corto?",
      opciones: [
        "Va por San Martín y dobla a la derecha por 9 de Julio",
        "Va por Huarpes, dobla por Santa Rosa y gira a la izquierda por 9 de Julio",
        "Da toda la vuelta por Godoy Cruz"
      ],
      correcta: 0,
      audioCorrecta: "audio/04_ok.mp3",
      audioIncorrecta: "audio/04_no.mp3"
    },

    // 5 --------------------------------------------------- RELOJ: armar la hora
    {
      id: "reloj_armar",
      tipo: "reloj",
      imagen: "img/gio_reloj.jpg",
      audioIntro: "audio/05_intro.mp3",
      pregunta: "La panadería abre a las 8 en punto. Marcá esa hora en el reloj.",
      horaObjetivo: { h: 8, m: 0 },
      audioCorrecta: "audio/05_ok.mp3",
      audioIncorrecta: "audio/05_no.mp3"
    },

    // 6 --------------------------------------------------- CLASIFICAR: AM / PM
    {
      id: "am_pm",
      tipo: "clasificar",
      imagen: "img/vecina_horario.jpg",
      audioIntro: "audio/06_intro.mp3",
      pregunta: "Tocá cada horario y ubicalo en la mañana o en la tarde/noche.",
      categorias: [
        { nombre: "Mañana (AM)", audioOk: "audio/06_ok_manana.mp3" },
        { nombre: "Tarde/Noche (PM)", audioOk: "audio/06_ok_tarde.mp3" }
      ],
      fichas: [
        { texto: "08:00", categoria: 0, audio: "audio/06_h_0800.mp3" },
        { texto: "20:30", categoria: 1, audio: "audio/06_h_2030.mp3" },
        { texto: "09:25", categoria: 0, audio: "audio/06_h_0925.mp3" },
        { texto: "16:00", categoria: 1, audio: "audio/06_h_1600.mp3" },
        { texto: "11:45", categoria: 0, audio: "audio/06_h_1145.mp3" },
        { texto: "19:10", categoria: 1, audio: "audio/06_h_1910.mp3" }
      ]
    },

    // 7 --------------------------------------------------- INPUT NUMERICO: horas abierta
    {
      id: "horas_abierta",
      tipo: "input-numero",
      imagen: "img/cartel_horarios.jpg",
      audioIntro: "audio/07_intro.mp3",
      pregunta: "El cartel dice: abierto de 8:00 a 12:30 y de 16:00 a 20:30. ¿Cuántas horas en total abre la panadería por la mañana?",
      respuesta: 4.5,
      aceptaDecimal: true,
      pista: "Podés escribir 4,5 o 4 y media",
      audioPista: "audio/07_pista.mp3",
      audioCorrecta: "audio/07_ok.mp3",
      audioIncorrecta: "audio/07_no.mp3"
    },

    // 8 --------------------------------------------------- ORDENAR: entregas
    {
      id: "ordenar_entregas",
      tipo: "ordenar",
      imagen: "img/gio_pedidos.jpg",
      audioIntro: "audio/08_intro.mp3",
      pregunta: "Gio tiene que repartir estos pedidos en la calle Huarpe. Tocalos en orden, de menor a mayor número de calle.",
      elementos: [
        { texto: "Huarpe 2475", audio: "audio/08_h2475.mp3" },
        { texto: "Huarpe 1580", audio: "audio/08_h1580.mp3" },
        { texto: "Huarpe 4100", audio: "audio/08_h4100.mp3" },
        { texto: "Huarpe 2250", audio: "audio/08_h2250.mp3" }
      ],
      ordenCorrecto: [1, 3, 0, 2],
      audioCorrecta: "audio/08_ok.mp3"
    },

    // 9 --------------------------------------------------- TABLA: recta numérica x100
    {
      id: "recta_100",
      tipo: "tabla",
      imagen: "img/mateo_numeros.jpg",
      audioIntro: "audio/09_intro.mp3",
      pregunta: "Completá los números que faltan, igual que en la tabla de Mateo. Van de 100 en 100, empezando en 1.000.",
      celdas: [
        { valor: 1000, dado: true }, { valor: 1100, dado: false }, { valor: 1200, dado: true },
        { valor: 1300, dado: false }, { valor: 1400, dado: false }, { valor: 1500, dado: true }
      ],
      audioCorrecta: "audio/09_ok.mp3"
    },

    // 10 -------------------------------------------------- TABLA: recta numérica x10/x1
    {
      id: "recta_10",
      tipo: "tabla",
      imagen: "img/mateo_numeros2.jpg",
      audioIntro: "audio/10_intro.mp3",
      pregunta: "Ahora completá esta otra serie de la tabla de Mateo. Van de 10 en 10, empezando en 4.000.",
      celdas: [
        { valor: 4000, dado: true }, { valor: 4010, dado: false }, { valor: 4020, dado: true },
        { valor: 4030, dado: false }, { valor: 4040, dado: false }, { valor: 4050, dado: true }
      ],
      audioCorrecta: "audio/10_ok.mp3"
    },

    // 10b ------------------------------------------------- INFO: partes de un cuerpo geométrico
    {
      id: "info_cuerpos",
      tipo: "info",
      imagen: "img/partes_cuerpo.jpg",
      audioIntro: "audio/10b_intro.mp3",
      texto: "Antes de seguir, conozcamos las partes de un cuerpo geométrico. La cara es una superficie plana. El vértice es el punto donde se juntan varias aristas. La arista es la línea donde se juntan dos caras. Fijate bien en la imagen: en las próximas pantallas vas a tener que identificar estas partes en distintos envases de la panadería."
    },

    // 11 -------------------------------------------------- HOTSPOT: caras de los envases
    {
      id: "unir_envases",
      tipo: "hotspot",
      imagen: "img/envases_galletas.jpg",
      audioIntro: "audio/11_intro.mp3",
      pregunta: "Tocá la lupa sobre cada envase y elegí cuántas caras tiene.",
      puntos: [
        {
          x: 16, y: 60, nombre: "caja",
          pregunta: "¿Cuántas caras tiene esta caja?",
          audioPregunta: "audio/11_p_caja.mp3",
          opciones: ["4 caras", "6 caras", "8 caras"],
          correcta: 1,
          audioCorrecta: "audio/11_caja_ok.mp3"
        },
        {
          x: 38, y: 48, nombre: "lata",
          pregunta: "¿Cuántas caras planas tiene esta lata?",
          audioPregunta: "audio/11_p_lata.mp3",
          opciones: ["1 cara plana", "2 caras planas", "3 caras planas"],
          correcta: 1,
          audioCorrecta: "audio/11_lata_ok.mp3"
        },
        {
          x: 58, y: 55, nombre: "piramide",
          pregunta: "¿Cuántas caras tiene este envase piramidal?",
          audioPregunta: "audio/11_p_piramide.mp3",
          opciones: ["4 caras", "5 caras", "6 caras"],
          correcta: 1,
          audioCorrecta: "audio/11_piramide_ok.mp3"
        },
        {
          x: 83, y: 55, nombre: "cubo",
          pregunta: "¿Cuántas caras iguales tiene este cubo?",
          audioPregunta: "audio/11_p_cubo.mp3",
          opciones: ["4 caras", "5 caras", "6 caras"],
          correcta: 2,
          audioCorrecta: "audio/11_cubo_ok.mp3"
        }
      ]
    },

    // 12 -------------------------------------------------- TRIVIA MINI: caras/vértices/aristas
    {
      id: "trivia_cuerpos",
      tipo: "trivia",
      imagen: "img/gio_envases.jpg",
      audioIntro: "audio/12_intro.mp3",
      preguntas: [
        {
          pregunta: "¿Qué envase NO tiene vértices?",
          audioPregunta: "audio/12_q1.mp3",
          opciones: ["El cubo", "El cilindro", "La pirámide"],
          correcta: 1,
          audioCorrecta: "audio/12_q1_ok.mp3",
          audioIncorrecta: "audio/12_q1_no.mp3"
        },
        {
          pregunta: "¿Cuántos vértices tiene una pirámide de base cuadrada?",
          audioPregunta: "audio/12_q2.mp3",
          opciones: ["4", "5", "6"],
          correcta: 1,
          audioCorrecta: "audio/12_q2_ok.mp3",
          audioIncorrecta: "audio/12_q2_no.mp3"
        },
        {
          pregunta: "¿Cuántas aristas tiene un cubo?",
          audioPregunta: "audio/12_q3.mp3",
          imagen: "img/cubo_dado.jpg",
          opciones: ["8", "10", "12"],
          correcta: 2,
          audioCorrecta: "audio/12_q3_ok.mp3",
          audioIncorrecta: "audio/12_q3_no.mp3"
        }
      ]
    },

    // 13 -------------------------------------------------- OPCION: comparar cuerpos
    {
      id: "comparar_cuerpos",
      tipo: "opcion",
      imagen: "img/prisma_piramide.jpg",
      imagenAbajo: true,
      audioIntro: "audio/13_intro.mp3",
      pregunta: "Un prisma de base cuadrada y una pirámide de base cuadrada, ¿en qué se parecen?",
      opciones: [
        "Los dos tienen una base cuadrada",
        "Los dos tienen la misma cantidad de caras",
        "Los dos no tienen vértices"
      ],
      correcta: 0,
      audioCorrecta: "audio/13_ok.mp3",
      audioIncorrecta: "audio/13_no.mp3"
    },

    // 14 -------------------------------------------------- TABLA: bolsitas x10 x100 x1000
    {
      id: "bolsitas_tabla",
      tipo: "tabla",
      imagen: "img/bolsitas_papel.jpg",
      audioIntro: "audio/14_intro.mp3",
      pregunta: "El depósito de envases le ofrece a Mateo paquetes que contienen 10 bolsitas cada uno. Completá cuántas bolsitas recibe según la cantidad de paquetes.",
      etiquetaFila: "Paquetes",
      filas: [
        { dado: 1, valor: 10, esInput: false },
        { dado: 2, valor: 20, esInput: true },
        { dado: 4, valor: 40, esInput: true },
        { dado: 8, valor: 80, esInput: true },
        { dado: 10, valor: 100, esInput: false },
        { dado: 12, valor: 120, esInput: true }
      ],
      audioCorrecta: "audio/14_ok.mp3"
    },

    // 15 -------------------------------------------------- ARMAR NUMERO: descomposición
    {
      id: "armar_numero",
      tipo: "armar-numero",
      imagen: "img/mateo_fichas.jpg",
      audioIntro: "audio/15_intro.mp3",
      pregunta: "Para comprar bolsitas, Mateo pensó el pedido así: 7 × 1.000 + 4 × 100 + 3 × 10. Tocá las fichas necesarias para formar ese número.",
      objetivo: 7430,
      fichas: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 100, 100, 100, 100, 10, 10, 10, 1, 1, 100, 10],
      audioCorrecta: "audio/15_ok.mp3",
      audioIncorrecta: "audio/15_no.mp3",
      audioNoExacto: "audio/15_no_exacto.mp3"
    },

    // 16 -------------------------------------------------- OPCION: pedido exacto
    {
      id: "pedido_exacto",
      tipo: "opcion",
      imagen: "img/gio_pedido_bolsas.jpg",
      audioIntro: "audio/16_intro.mp3",
      pregunta: "Mateo necesita 340 bolsitas de papel para las tortitas que piensa vender durante la semana. Las venden en paquetes de 10 y cajas de 100 (10 paquetes). ¿Cuál de estos pedidos es correcto?",
      opciones: [
        "3 cajas y 4 paquetes",
        "4 cajas y 3 paquetes",
        "34 cajas"
      ],
      correcta: 0,
      audioCorrecta: "audio/16_ok.mp3",
      audioIncorrecta: "audio/16_no.mp3"
    },

    // 17 -------------------------------------------------- SELECCION MULTIPLE: cálculo correcto
    {
      id: "calculo_correcto",
      tipo: "seleccion-multiple",
      imagen: "img/gio_banderines.jpg",
      audioIntro: "audio/17_intro.mp3",
      pregunta: "La vidriera mide 7 metros y Mateo quiere colocar 3 tiras de soga del mismo largo para decorarla. Marcá todos los cálculos que sirven para saber cuántos metros de soga necesita.",
      opciones: [
        { texto: "7 + 3", correcta: false },
        { texto: "7 + 7 + 7", correcta: true },
        { texto: "7 × 3", correcta: true },
        { texto: "7 : 3", correcta: false }
      ],
      audioCorrecta: "audio/17_ok.mp3"
    },

    // 18 -------------------------------------------------- INPUT NUMERICO: multiplicación alfajores
    {
      id: "alfajores_calculo",
      tipo: "input-numero",
      imagen: "img/gio_alfajores.jpg",
      audioIntro: "audio/18_intro.mp3",
      pregunta: "Paula y Lorenzo fueron con Mateo y le encargaron 8 docenas de alfajores de miel. ¿Cuántos alfajores tendrá que preparar Mateo para cumplir con el pedido?",
      respuesta: 96,
      pista: "Recordá que 1 docena son 12 unidades",
      audioPista: "audio/18_pista.mp3",
      audioCorrecta: "audio/18_ok.mp3",
      audioIncorrecta: "audio/18_no.mp3"
    },

    // 19 -------------------------------------------------- OPCION: balanza
    {
      id: "balanza_mateo",
      tipo: "opcion",
      imagen: "img/balanza_mateo.jpg",
      audioIntro: "audio/19_intro.mp3",
      pregunta: "La receta de las tortitas raspaditas necesita 250 gramos de grasa. En la balanza, Mateo tiene una pesa de 200 g y otra de 50 g. ¿Alcanzan para pesar exactamente lo que necesita?",
      opciones: [
        "Sí, 200 g + 50 g = 250 g",
        "No, falta una pesa de 100 g",
        "No, sobran 50 g"
      ],
      correcta: 0,
      audioCorrecta: "audio/19_ok.mp3",
      audioIncorrecta: "audio/19_no.mp3"
    },

    // 20 -------------------------------------------------- SLIDER: jarra medidora
    {
      id: "jarra_medidora",
      tipo: "slider",
      imagen: "img/jarra_medidora.jpg",
      audioIntro: "audio/20_intro.mp3",
      pregunta: "La receta de las tortitas raspaditas necesita 500 ml de agua tibia. Deslizá el nivel de la jarra hasta marcar esa cantidad.",
      objetivoMl: 500,
      maxMl: 1000,
      tolerancia: 20,
      audioCorrecta: "audio/20_ok.mp3",
      audioIncorrecta: "audio/20_no.mp3"
    },

    // 21 -------------------------------------------------- TRIVIA FINAL
    {
      id: "trivia_final",
      tipo: "trivia",
      imagen: "img/mateo_gio_final.jpg",
      audioIntro: "audio/21_intro.mp3",
      esFinal: true,
      preguntas: [
        {
          pregunta: "Si un paquete tiene 10 bolsitas, ¿cuántas bolsitas hay en 7 paquetes?",
          audioPregunta: "audio/21_q1.mp3",
          opciones: ["17", "70", "700"],
          correcta: 1,
          audioCorrecta: "audio/21_q1_ok.mp3",
          audioIncorrecta: "audio/21_q1_no.mp3"
        },
        {
          pregunta: "¿Cuál de estos horarios corresponde a la tarde?",
          audioPregunta: "audio/21_q2.mp3",
          opciones: ["09:00", "18:00", "07:30"],
          correcta: 1,
          audioCorrecta: "audio/21_q2_ok.mp3",
          audioIncorrecta: "audio/21_q2_no.mp3"
        },
        {
          pregunta: "Un cubo tiene...",
          audioPregunta: "audio/21_q3.mp3",
          opciones: ["6 caras y 8 vértices", "4 caras y 4 vértices", "5 caras y 6 vértices"],
          correcta: 0,
          audioCorrecta: "audio/21_q3_ok.mp3",
          audioIncorrecta: "audio/21_q3_no.mp3"
        },
        {
          pregunta: "Mateo quiere colocar 3 tiras de soga de 7 metros cada una, ¿cuántos metros son en total?",
          audioPregunta: "audio/21_q4.mp3",
          opciones: ["10", "21", "37"],
          correcta: 1,
          audioCorrecta: "audio/21_q4_ok.mp3",
          audioIncorrecta: "audio/21_q4_no.mp3"
        },
        {
          pregunta: "500 ml + 500 ml, ¿cuántos litros son?",
          audioPregunta: "audio/21_q5.mp3",
          opciones: ["1 litro", "5 litros", "2 litros"],
          correcta: 0,
          audioCorrecta: "audio/21_q5_ok.mp3",
          audioIncorrecta: "audio/21_q5_no.mp3"
        }
      ]
    },

    // 22 --------------------------------------------------- CIERRE
    {
      id: "cierre",
      tipo: "cierre"
    }

  ]
};
