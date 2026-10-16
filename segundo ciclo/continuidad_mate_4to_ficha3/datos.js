/* DETECTIVES DE LOS GRÁFICOS — Matemática · 🔢 Matemática · 4.º grado
   Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de los gráficos",
  "subtitulo": "Ficha 3: Estadística",
  "area": "🔢 Matemática · 4.º grado",
  "fuente": "Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial",
  "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
  "mail": "profegustaaguilar@gmail.com",
  "foto": "profe.jpg",
  "fotoMini": "profe_mini.jpg",
  "frase": "Menos prisa, más vida 🧉🫂",
  "puntosPorAcierto": 10,
  "revision": false
 },
 "audios": {
  "t_err": "Esa no es. Pensalo otra vez.",
  "c01": "Una tabla ordena los datos en filas y columnas. En esta comparamos dos grupos: cuarto A y cuarto B.",
  "c02": "Para leerla, buscamos la fila del dato y la columna del grupo. En cuarto B, la mancha la eligieron ocho chicos.",
  "c03": "En un gráfico de barras dobles, cada grupo tiene un color. La barra más alta muestra la cantidad mayor.",
  "c04": "Esa no es. Buscá la fila y la columna correctas.",
  "c05": "Mirá la tabla y tocá la respuesta correcta.",
  "c06": "¿Qué juego eligieron más chicos de cuarto A?",
  "c07": "¡Sí! En cuarto A, nueve eligieron fútbol.",
  "c08": "¿En qué grupo la mancha fue más elegida?",
  "c09": "¡Muy bien! En cuarto B la eligieron ocho, y en cuarto A, cinco.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 4 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "c10": "Tarea uno. La escuela realizó una encuesta para conocer las frutas preferidas por los alumnos de cuarto A y cuarto B. Mirá la tabla. ¿Cuál de estas afirmaciones es correcta?",
  "c11": "¡Correcto! En cuarto B eligieron banana nueve alumnos, y en cuarto A, seis.",
  "c12": "Tarea dos. El gráfico de barras dobles muestra la cantidad de libros que leyeron los alumnos de cuarto A y cuarto B durante cuatro meses. Indicá si cada afirmación es verdadera o falsa.",
  "c13": "a. En marzo, cuarto B leyó más libros que cuarto A.",
  "c14": "¡Correcto! En marzo, cuarto B leyó seis y cuarto A, cuatro.",
  "c15": "b. En abril, cuarto A leyó dos libros más que cuarto B.",
  "c16": "¡Correcto! Siete menos cinco es dos.",
  "c17": "c. En mayo, ambos grupos leyeron la misma cantidad de libros.",
  "c18": "¡Correcto! Es falso: en mayo, cuarto A leyó seis y cuarto B, ocho.",
  "c19": "d. En junio, los dos grupos leyeron la misma cantidad de libros.",
  "c20": "¡Correcto! En junio los dos leyeron nueve.",
  "c21": "Tarea tres. La tabla muestra la cantidad de alumnos que eligió cada actividad para una jornada recreativa. Uní cada afirmación con la opción que corresponde.",
  "c22": "Uno. Fue elegida por la misma cantidad de alumnos en ambos grupos.",
  "c23": "¡Correcto! Dibujo: seis en cada grupo.",
  "c24": "Dos. En cuarto A fue elegida por más alumnos que en cuarto B.",
  "c25": "¡Correcto! Juegos de mesa: diez en cuarto A y siete en cuarto B.",
  "c26": "Tres. En cuarto B fue elegida por más alumnos que en cuarto A. Marcá todas las que corresponden y tocá Verificar.",
  "c27": "¡Correcto! Deportes y Música: en las dos, cuarto B tiene más.",
  "c28": "Tarea cuatro. Dos grupos registraron la cantidad de vasos de agua que tomaron durante una jornada. ¿Cuál de las descripciones representa mejor la información de la tabla?",
  "c29": "¡Correcto! Esa descripción coincide con los tres momentos del día.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a leer tablas y gráficos de barras dobles para comparar dos grupos. Tocá Comenzar.",
  "cierre": "¡Terminaste la investigación, detective! Mirá cuántos aciertos lograste. Si querés, podés volver a jugar."
 },
 "pantallas": [
  {
   "tipo": "portada",
   "img": "img/portada.jpg",
   "audio": "portada"
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 Tablas y gráficos de barras dobles",
   "pasos": [
    {
     "audio": "c01",
     "texto": "Una <b>tabla</b> ordena datos en filas y columnas. Acá comparamos <b>dos grupos</b>: 4.º A y 4.º B.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Juego",
       "4.º A",
       "4.º B"
      ],
      "filas": [
       [
        "Fútbol",
        "9",
        "6"
       ],
       [
        "Mancha",
        "5",
        "8"
       ]
      ]
     }
    },
    {
     "audio": "c02",
     "texto": "Para leerla, buscamos la <b>fila</b> del dato y la <b>columna</b> del grupo: en 4.º B, la mancha la eligieron <b>8</b>."
    },
    {
     "audio": "c03",
     "texto": "En un <b>gráfico de barras dobles</b>, cada grupo tiene un color. La barra más alta muestra la cantidad mayor.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 640 360\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0\" y=\"0\" width=\"640\" height=\"360\" rx=\"12\" fill=\"#fff\"/><line x1=\"50\" y1=\"300.0\" x2=\"630\" y2=\"300.0\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"306.0\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">0</text><line x1=\"50\" y1=\"213.33333333333331\" x2=\"630\" y2=\"213.33333333333331\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"219.33333333333331\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">3</text><line x1=\"50\" y1=\"126.66666666666666\" x2=\"630\" y2=\"126.66666666666666\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"132.66666666666666\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">6</text><line x1=\"50\" y1=\"40.0\" x2=\"630\" y2=\"40.0\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"46.0\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">9</text><rect x=\"92.75\" y=\"40.0\" width=\"91.2\" height=\"260.0\" rx=\"5\" fill=\"#4f8ff7\"/><text x=\"138.35\" y=\"34.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">9</text><rect x=\"187.95\" y=\"126.66666666666666\" width=\"91.2\" height=\"173.33333333333334\" rx=\"5\" fill=\"#5cc483\"/><text x=\"233.54999999999998\" y=\"120.66666666666666\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">6</text><text x=\"185.95\" y=\"324\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"17\" fill=\"#333\">Fútbol</text><rect x=\"377.75\" y=\"155.55555555555554\" width=\"91.2\" height=\"144.44444444444446\" rx=\"5\" fill=\"#4f8ff7\"/><text x=\"423.35\" y=\"149.55555555555554\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">5</text><rect x=\"472.95\" y=\"68.88888888888889\" width=\"91.2\" height=\"231.11111111111111\" rx=\"5\" fill=\"#5cc483\"/><text x=\"518.55\" y=\"62.888888888888886\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">8</text><text x=\"470.95\" y=\"324\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"17\" fill=\"#333\">Mancha</text><rect x=\"200.0\" y=\"336\" width=\"16\" height=\"16\" fill=\"#4f8ff7\"/><text x=\"222.0\" y=\"349\" font-family=\"Arial\" font-size=\"16\">4.º A</text><rect x=\"340.0\" y=\"336\" width=\"16\" height=\"16\" fill=\"#5cc483\"/><text x=\"362.0\" y=\"349\" font-family=\"Arial\" font-size=\"16\">4.º B</text></svg></span>"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "📊 ¡A leer la tabla!",
   "instr": "c05",
   "err": "c04",
   "rondas": [
    {
     "id": "c06",
     "texto": "¿Qué juego eligieron más chicos de <b>4.º A</b>?",
     "opciones": [
      "Fútbol",
      "Mancha"
     ],
     "ok": "c07",
     "audio": "c06",
     "respuesta": "Fútbol"
    },
    {
     "id": "c08",
     "texto": "¿En qué grupo la <b>mancha</b> fue más elegida?",
     "opciones": [
      "4.º A",
      "4.º B"
     ],
     "ok": "c09",
     "audio": "c08",
     "respuesta": "4.º B"
    }
   ],
   "visual": {
    "tipo": "tabla",
    "cab": [
     "Juego",
     "4.º A",
     "4.º B"
    ],
    "filas": [
     [
      "Fútbol",
      "9",
      "6"
     ],
     [
      "Mancha",
      "5",
      "8"
     ]
    ]
   }
  },
  {
   "tipo": "pasos",
   "titulo": "🏆 ¡Llegó el desafío!",
   "img": "img/desafio.jpg",
   "pasos": [
    {
     "audio": "de_1",
     "texto": "¡Ya sos un <b>detective</b>! Practicaste un montón."
    },
    {
     "audio": "de_2",
     "texto": "Ahora, las <b>4 tareas</b> de la ficha de la escuela."
    },
    {
     "audio": "de_3",
     "texto": "Pensá bien: <b>cada respuesta cuenta una sola vez</b>."
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 1",
   "err": "t_err",
   "rondas": [
    {
     "id": "c10",
     "texto": "La escuela realizó una encuesta para conocer las frutas preferidas por los alumnos de 4.º A y 4.º B. ¿Cuál de estas afirmaciones es correcta?",
     "opciones": [
      "En los dos grupos, la fruta más elegida fue la manzana.",
      "En 4.º B, la banana fue elegida por más alumnos que en 4.º A.",
      "En 4.º A, la naranja fue elegida por más alumnos que la frutilla.",
      "En los dos grupos, la frutilla fue elegida por la misma cantidad de alumnos."
     ],
     "ok": "c11",
     "audio": "c10",
     "respuesta": "En 4.º B, la banana fue elegida por más alumnos que en 4.º A.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Fruta",
       "4.º A",
       "4.º B"
      ],
      "filas": [
       [
        "Manzana",
        "8",
        "5"
       ],
       [
        "Banana",
        "6",
        "9"
       ],
       [
        "Naranja",
        "4",
        "7"
       ],
       [
        "Frutilla",
        "7",
        "6"
       ]
      ]
     }
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 2",
   "instr": "c12",
   "err": "t_err",
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 640 360\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0\" y=\"0\" width=\"640\" height=\"360\" rx=\"12\" fill=\"#fff\"/><text x=\"320.0\" y=\"24\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"18\" fill=\"#333\">Libros leídos</text><line x1=\"50\" y1=\"300.0\" x2=\"630\" y2=\"300.0\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"306.0\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">0</text><line x1=\"50\" y1=\"235.0\" x2=\"630\" y2=\"235.0\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"241.0\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">3</text><line x1=\"50\" y1=\"170.0\" x2=\"630\" y2=\"170.0\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"176.0\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">6</text><line x1=\"50\" y1=\"105.0\" x2=\"630\" y2=\"105.0\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"111.0\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">9</text><line x1=\"50\" y1=\"40.0\" x2=\"630\" y2=\"40.0\" stroke=\"#ddd\" stroke-width=\"1.5\"/><text x=\"40\" y=\"46.0\" text-anchor=\"end\" font-family=\"Arial\" font-size=\"16\" fill=\"#555\">12</text><rect x=\"71.375\" y=\"213.33333333333331\" width=\"45.6\" height=\"86.66666666666667\" rx=\"5\" fill=\"#4f8ff7\"/><text x=\"94.175\" y=\"207.33333333333331\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">4</text><rect x=\"120.975\" y=\"170.0\" width=\"45.6\" height=\"130.0\" rx=\"5\" fill=\"#5cc483\"/><text x=\"143.775\" y=\"164.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">6</text><text x=\"118.975\" y=\"324\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"17\" fill=\"#333\">Marzo</text><rect x=\"213.875\" y=\"148.33333333333331\" width=\"45.6\" height=\"151.66666666666669\" rx=\"5\" fill=\"#4f8ff7\"/><text x=\"236.675\" y=\"142.33333333333331\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">7</text><rect x=\"263.475\" y=\"191.66666666666666\" width=\"45.6\" height=\"108.33333333333334\" rx=\"5\" fill=\"#5cc483\"/><text x=\"286.27500000000003\" y=\"185.66666666666666\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">5</text><text x=\"261.475\" y=\"324\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"17\" fill=\"#333\">Abril</text><rect x=\"356.375\" y=\"170.0\" width=\"45.6\" height=\"130.0\" rx=\"5\" fill=\"#4f8ff7\"/><text x=\"379.175\" y=\"164.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">6</text><rect x=\"405.975\" y=\"126.66666666666666\" width=\"45.6\" height=\"173.33333333333334\" rx=\"5\" fill=\"#5cc483\"/><text x=\"428.77500000000003\" y=\"120.66666666666666\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">8</text><text x=\"403.975\" y=\"324\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"17\" fill=\"#333\">Mayo</text><rect x=\"498.875\" y=\"105.0\" width=\"45.6\" height=\"195.0\" rx=\"5\" fill=\"#4f8ff7\"/><text x=\"521.675\" y=\"99.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">9</text><rect x=\"548.475\" y=\"105.0\" width=\"45.6\" height=\"195.0\" rx=\"5\" fill=\"#5cc483\"/><text x=\"571.275\" y=\"99.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"17\" fill=\"#333\">9</text><text x=\"546.475\" y=\"324\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"17\" fill=\"#333\">Junio</text><rect x=\"200.0\" y=\"336\" width=\"16\" height=\"16\" fill=\"#4f8ff7\"/><text x=\"222.0\" y=\"349\" font-family=\"Arial\" font-size=\"16\">4.º A</text><rect x=\"340.0\" y=\"336\" width=\"16\" height=\"16\" fill=\"#5cc483\"/><text x=\"362.0\" y=\"349\" font-family=\"Arial\" font-size=\"16\">4.º B</text></svg></span>"
   },
   "items": [
    {
     "id": "c13",
     "audio": "c13",
     "texto": "a. En marzo, 4.º B leyó más libros que 4.º A.",
     "v": true,
     "ok": "c14"
    },
    {
     "id": "c15",
     "audio": "c15",
     "texto": "b. En abril, 4.º A leyó 2 libros más que 4.º B.",
     "v": true,
     "ok": "c16"
    },
    {
     "id": "c17",
     "audio": "c17",
     "texto": "c. En mayo, ambos grupos leyeron la misma cantidad de libros.",
     "v": false,
     "ok": "c18"
    },
    {
     "id": "c19",
     "audio": "c19",
     "texto": "d. En junio, los dos grupos leyeron la misma cantidad de libros.",
     "v": true,
     "ok": "c20"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 3",
   "instr": "c21",
   "err": "t_err",
   "rondas": [
    {
     "id": "c22",
     "texto": "1) Fue elegida por la <b>misma cantidad</b> de alumnos en ambos grupos.",
     "opciones": [
      "Juegos de mesa",
      "Deportes",
      "Dibujo",
      "Música"
     ],
     "ok": "c23",
     "audio": "c22",
     "respuesta": "Dibujo"
    },
    {
     "id": "c24",
     "texto": "2) En <b>4.º A</b> fue elegida por más alumnos que en 4.º B.",
     "opciones": [
      "Juegos de mesa",
      "Deportes",
      "Dibujo",
      "Música"
     ],
     "ok": "c25",
     "audio": "c24",
     "respuesta": "Juegos de mesa"
    },
    {
     "id": "c26",
     "texto": "3) En <b>4.º B</b> fue elegida por más alumnos que en 4.º A. Marcá <b>todas</b> las que corresponden.",
     "opciones": [
      "Juegos de mesa",
      "Deportes",
      "Dibujo",
      "Música"
     ],
     "ok": "c27",
     "audio": "c26",
     "respuestas": [
      "Deportes",
      "Música"
     ]
    }
   ],
   "visual": {
    "tipo": "tabla",
    "cab": [
     "Actividad",
     "4.º A",
     "4.º B"
    ],
    "filas": [
     [
      "Juegos de mesa",
      "10",
      "7"
     ],
     [
      "Deportes",
      "8",
      "12"
     ],
     [
      "Dibujo",
      "6",
      "6"
     ],
     [
      "Música",
      "9",
      "11"
     ]
    ]
   }
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 4",
   "err": "t_err",
   "rondas": [
    {
     "id": "c28",
     "texto": "Dos grupos registraron la cantidad de vasos de agua que tomaron durante una jornada. ¿Cuál de las siguientes descripciones representa mejor la información de la tabla?",
     "opciones": [
      "4.º A tomó más vasos que 4.º B en todos los momentos del día.",
      "4.º B tomó más vasos que 4.º A durante la mañana y la tarde.",
      "4.º A tomó más vasos que 4.º B durante la mañana, 4.º B tomó más al mediodía y ambos tomaron la misma cantidad por la tarde.",
      "Ambos grupos tomaron la misma cantidad de vasos durante toda la jornada."
     ],
     "ok": "c29",
     "audio": "c28",
     "respuesta": "4.º A tomó más vasos que 4.º B durante la mañana, 4.º B tomó más al mediodía y ambos tomaron la misma cantidad por la tarde.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Momento del día",
       "4.º A",
       "4.º B"
      ],
      "filas": [
       [
        "Mañana",
        "18",
        "15"
       ],
       [
        "Mediodía",
        "12",
        "17"
       ],
       [
        "Tarde",
        "16",
        "16"
       ]
      ]
     }
    }
   ]
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
