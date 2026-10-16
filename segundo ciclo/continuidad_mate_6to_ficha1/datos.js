/* ============================================================
   DETECTIVES DEL CENSO — Matemática · 6.º grado
   Basado en la Ficha N.º 1 "Número" de Habilidades Lógico-Matemáticas
   DGE Mendoza · Continuidad pedagógica
   (Datos: INDEC, Censo Nacional 2022, tal como figuran en la ficha)
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */
const TABLA_CENSO = {
  tipo: 'tabla', cab: ['PROVINCIA', 'HABITANTES'],
  filas: [['Buenos Aires', '17.523.996'], ['Córdoba', '3.840.905'], ['Mendoza', '2.030.773'], ['Santa Fe', '3.519.059'], ['Tucumán', '1.703.186']],
  fuente: 'Fuente: INDEC, Censo Nacional de Población, Hogares y Viviendas 2022. Resultados definitivos.'
};
window.DATOS = {
 "meta": {
  "titulo": "Detectives del censo",
  "subtitulo": "Ficha 1: Número",
  "area": "🔢 Matemática · 6.º grado",
  "fuente": "Basado en la Ficha N.º 1 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial",
  "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
  "mail": "profegustaaguilar@gmail.com",
  "foto": "profe.jpg",
  "fotoMini": "profe_mini.jpg",
  "frase": "Menos prisa, más vida 🧉🫂",
  "puntosPorAcierto": 10,
  "revision": false
 },
 "audios": {
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar los números del censo: leer números muy grandes, comparar cantidades en una tabla y entender qué quiere decir uno coma siete millones. Tocá Comenzar.",
  "n1_1": "Para leer un número muy grande, lo separamos en grupos de tres cifras, de derecha a izquierda. Los puntos nos ayudan.",
  "n1_2": "Dos millones, treinta mil, setecientos setenta y tres. Primero los millones, después los miles y al final el último grupo.",
  "n1_3": "Para comparar dos números grandes, primero mirá cuántas cifras tienen. Si tienen las mismas, compará de izquierda a derecha.",
  "le_instr": "Leé el número y tocá cómo se dice.",
  "le_err": "No es esa. Separá el número en grupos de tres cifras.",
  "le1": "¿Cómo se lee tres millones ochocientos cuarenta mil novecientos cinco?",
  "le1_ok": "¡Sí! Tres millones ochocientos cuarenta mil novecientos cinco. Es la población de Córdoba.",
  "le2": "¿Cómo se lee el número de habitantes de Mendoza?",
  "le2_ok": "¡Muy bien! Dos millones treinta mil setecientos setenta y tres.",
  "n2_1": "En las noticias muchas veces se usan números decimales para hablar de millones.",
  "n2_2": "Uno coma siete millones es un millón setecientos mil. El siete ocupa el lugar de las centenas de mil.",
  "n2_3": "Cuando la cantidad real no es exacta, se dice aproximadamente. Un millón setecientos tres mil es aproximadamente uno coma siete millones.",
  "ap_instr": "Pensá en millones y decimales. Tocá la respuesta correcta.",
  "ap_err": "No es esa. Recordá que uno coma siete millones es un millón setecientos mil.",
  "ap1": "¿Qué provincia tiene aproximadamente tres coma cinco millones de habitantes?",
  "ap1_ok": "¡Sí! Santa Fe tiene tres millones quinientos diecinueve mil: casi tres coma cinco millones.",
  "ap2": "Córdoba tiene tres millones ochocientos cuarenta mil novecientos cinco habitantes. ¿Cómo se diría aproximadamente?",
  "ap2_ok": "¡Muy bien! Aproximadamente tres coma ocho millones.",
  "vf_instr": "Usá la tabla del censo. Leé cada frase y tocá Verdadero o Falso.",
  "vf_err": "No es así. Compará bien los números de la tabla.",
  "vf1": "Santa Fe tiene más habitantes que Mendoza.",
  "vf1_ok": "¡Correcto! Tres millones es más que dos millones.",
  "vf2": "Tucumán tiene más de dos millones de habitantes.",
  "vf2_ok": "¡Bien! Es falso: Tucumán tiene un millón setecientos mil, aproximadamente.",
  "vf3": "Buenos Aires tiene más de diecisiete millones de habitantes.",
  "vf3_ok": "¡Sí! Diecisiete millones quinientos veintitrés mil novecientos noventa y seis.",
  "de_1": "¡Ya sos un detective del censo!",
  "de_2": "Ahora llega el desafío: son las tres tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "t_err": "Esa no es la respuesta. Pensalo otra vez.",
  "t1_instr": "Tarea uno. La tabla muestra la cantidad de habitantes de algunas provincias argentinas según el Censo dos mil veintidós. Indicá si cada frase es verdadera o falsa.",
  "t1_1": "La cantidad de habitantes de Córdoba es mayor que la de Santa Fe.",
  "t1_1ok": "¡Correcto! Tres millones ochocientos cuarenta mil es mayor que tres millones quinientos diecinueve mil.",
  "t1_2": "La cantidad de habitantes de Buenos Aires es mayor que la del resto de las provincias.",
  "t1_2ok": "¡Correcto! Es la única con más de diecisiete millones.",
  "t1_3": "Mendoza es la provincia que tiene menos cantidad de habitantes.",
  "t1_3ok": "¡Correcto! Es falso: Tucumán tiene menos habitantes que Mendoza.",
  "t2_instr": "Tarea dos. ¿Cómo se lee el número que representa la cantidad de habitantes de Tucumán?",
  "t2_ok": "¡Correcto! Un millón setecientos tres mil ciento ochenta y seis.",
  "t3_instr": "Tarea tres. Un medio de comunicación publicó: Tucumán tiene aproximadamente uno coma siete millones de habitantes y cuenta con más de seiscientas mil viviendas particulares. Leé cada razón y decidí si es correcta o incorrecta.",
  "t3_1": "Para expresar una cantidad de habitantes en millones, siempre debe escribirse un número entero.",
  "t3_1ok": "¡Correcto! Esa razón es incorrecta: se pueden usar decimales, como uno coma siete millones.",
  "t3_2": "Uno coma siete millones representa una cantidad cercana a un millón setecientos mil.",
  "t3_2ok": "¡Correcto! Esa razón es correcta: por eso dice aproximadamente.",
  "t3_3": "Uno coma siete millones significa que hay exactamente un millón setecientos mil habitantes.",
  "t3_3ok": "¡Correcto! Esa razón es incorrecta: la cantidad real es un millón setecientos tres mil ciento ochenta y seis.",
  "t3_4": "Uno coma siete millones representa diecisiete millones de habitantes.",
  "t3_4ok": "¡Correcto! Esa razón es incorrecta: uno coma siete millones es un millón setecientos mil.",
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
   "titulo": "🔎 Leer números grandes",
   "pasos": [
    {
     "audio": "n1_1",
     "texto": "Separamos en <b>grupos de 3 cifras</b>, de derecha a izquierda.",
     "visual": {
      "tipo": "texto",
      "html": "2 . 030 . 773"
     }
    },
    {
     "audio": "n1_2",
     "texto": "<b>Dos millones</b> · <b>treinta mil</b> · <b>setecientos setenta y tres</b>",
     "visual": {
      "tipo": "posiciones",
      "cab": [
       "Millones",
       "Miles",
       "Unidades"
      ],
      "cifras": [
       "2",
       "030",
       "773"
      ],
      "resaltar": [
       0,
       1,
       2
      ]
     }
    },
    {
     "audio": "n1_3",
     "texto": "Para comparar: primero <b>cuántas cifras</b>, después de izquierda a derecha.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Provincia",
       "Habitantes"
      ],
      "filas": [
       [
        "Buenos Aires",
        "17.523.996"
       ],
       [
        "Córdoba",
        "3.840.905"
       ],
       [
        "Mendoza",
        "2.030.773"
       ],
       [
        "Santa Fe",
        "3.519.059"
       ],
       [
        "Tucumán",
        "1.703.186"
       ]
      ],
      "fuente": "Fuente: INDEC, Censo Nacional de Población, Hogares y Viviendas 2022. Resultados definitivos."
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "📖 ¿Cómo se lee?",
   "instr": "le_instr",
   "err": "le_err",
   "visual": {
    "tipo": "tabla",
    "cab": [
     "Provincia",
     "Habitantes"
    ],
    "filas": [
     [
      "Buenos Aires",
      "17.523.996"
     ],
     [
      "Córdoba",
      "3.840.905"
     ],
     [
      "Mendoza",
      "2.030.773"
     ],
     [
      "Santa Fe",
      "3.519.059"
     ],
     [
      "Tucumán",
      "1.703.186"
     ]
    ],
    "fuente": "Fuente: INDEC, Censo Nacional de Población, Hogares y Viviendas 2022. Resultados definitivos."
   },
   "rondas": [
    {
     "id": "l1",
     "audio": "le1",
     "texto": "¿Cómo se lee <b>3.840.905</b>?",
     "opciones": [
      "Tres millones ochocientos cuarenta mil novecientos cinco",
      "Tres millones ochocientos cuatro mil novecientos cinco",
      "Treinta y ocho millones cuarenta mil novecientos cinco",
      "Tres millones ochocientos cuarenta mil noventa y cinco"
     ],
     "respuesta": "Tres millones ochocientos cuarenta mil novecientos cinco",
     "ok": "le1_ok"
    },
    {
     "id": "l2",
     "audio": "le2",
     "texto": "¿Cómo se lee <b>2.030.773</b> (Mendoza)?",
     "opciones": [
      "Dos millones treinta mil setecientos setenta y tres",
      "Dos millones trescientos mil setecientos setenta y tres",
      "Veinte millones treinta mil setecientos setenta y tres",
      "Dos millones tres mil setecientos setenta y tres"
     ],
     "respuesta": "Dos millones treinta mil setecientos setenta y tres",
     "ok": "le2_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 ¿Qué es 1,7 millones?",
   "pasos": [
    {
     "audio": "n2_1",
     "texto": "En las noticias se usan <b>decimales</b> para hablar de millones.",
     "visual": {
      "tipo": "texto",
      "html": "📰 “1,7 millones de habitantes”"
     }
    },
    {
     "audio": "n2_2",
     "texto": "<b>1,7 millones = 1.700.000</b>",
     "visual": {
      "tipo": "posiciones",
      "cab": [
       "U. millón",
       "C. mil",
       "D. mil",
       "U. mil",
       "C",
       "D",
       "U"
      ],
      "cifras": [
       1,
       7,
       0,
       0,
       0,
       0,
       0
      ],
      "resaltar": [
       1
      ]
     }
    },
    {
     "audio": "n2_3",
     "texto": "1.703.186 es <b>aproximadamente</b> 1,7 millones.",
     "visual": {
      "tipo": "texto",
      "html": "1.703.186 ≈ 1,7 millones"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "📰 Millones y decimales",
   "instr": "ap_instr",
   "err": "ap_err",
   "visual": {
    "tipo": "tabla",
    "cab": [
     "Provincia",
     "Habitantes"
    ],
    "filas": [
     [
      "Buenos Aires",
      "17.523.996"
     ],
     [
      "Córdoba",
      "3.840.905"
     ],
     [
      "Mendoza",
      "2.030.773"
     ],
     [
      "Santa Fe",
      "3.519.059"
     ],
     [
      "Tucumán",
      "1.703.186"
     ]
    ],
    "fuente": "Fuente: INDEC, Censo Nacional de Población, Hogares y Viviendas 2022. Resultados definitivos."
   },
   "rondas": [
    {
     "id": "a1",
     "audio": "ap1",
     "texto": "¿Qué provincia tiene aproximadamente <b>3,5 millones</b> de habitantes?",
     "opciones": [
      "Santa Fe",
      "Córdoba",
      "Mendoza",
      "Tucumán"
     ],
     "respuesta": "Santa Fe",
     "ok": "ap1_ok"
    },
    {
     "id": "a2",
     "audio": "ap2",
     "texto": "Córdoba: 3.840.905. ¿Cómo se diría aproximadamente?",
     "opciones": [
      "3,8 millones",
      "38 millones",
      "3,4 millones",
      "0,38 millones"
     ],
     "respuesta": "3,8 millones",
     "ok": "ap2_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "📊 La tabla del censo",
   "instr": "vf_instr",
   "err": "vf_err",
   "visual": {
    "tipo": "tabla",
    "cab": [
     "Provincia",
     "Habitantes"
    ],
    "filas": [
     [
      "Buenos Aires",
      "17.523.996"
     ],
     [
      "Córdoba",
      "3.840.905"
     ],
     [
      "Mendoza",
      "2.030.773"
     ],
     [
      "Santa Fe",
      "3.519.059"
     ],
     [
      "Tucumán",
      "1.703.186"
     ]
    ],
    "fuente": "Fuente: INDEC, Censo Nacional de Población, Hogares y Viviendas 2022. Resultados definitivos."
   },
   "items": [
    {
     "id": "v1",
     "audio": "vf1",
     "texto": "Santa Fe tiene más habitantes que Mendoza.",
     "v": true,
     "ok": "vf1_ok"
    },
    {
     "id": "v2",
     "audio": "vf2",
     "texto": "Tucumán tiene más de 2 millones de habitantes.",
     "v": false,
     "ok": "vf2_ok"
    },
    {
     "id": "v3",
     "audio": "vf3",
     "texto": "Buenos Aires tiene más de 17 millones de habitantes.",
     "v": true,
     "ok": "vf3_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🏆 ¡Llegó el desafío!",
   "img": "img/desafio.jpg",
   "pasos": [
    {
     "audio": "de_1",
     "texto": "¡Ya sos un <b>detective</b> del censo!"
    },
    {
     "audio": "de_2",
     "texto": "Ahora, las <b>3 tareas</b> de la ficha de la escuela."
    },
    {
     "audio": "de_3",
     "texto": "Pensá bien: <b>cada respuesta cuenta una sola vez</b>."
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 1",
   "instr": "t1_instr",
   "err": "t_err",
   "visual": {
    "tipo": "tabla",
    "cab": [
     "Provincia",
     "Habitantes"
    ],
    "filas": [
     [
      "Buenos Aires",
      "17.523.996"
     ],
     [
      "Córdoba",
      "3.840.905"
     ],
     [
      "Mendoza",
      "2.030.773"
     ],
     [
      "Santa Fe",
      "3.519.059"
     ],
     [
      "Tucumán",
      "1.703.186"
     ]
    ],
    "fuente": "Fuente: INDEC, Censo Nacional de Población, Hogares y Viviendas 2022. Resultados definitivos."
   },
   "items": [
    {
     "id": "t1a",
     "audio": "t1_1",
     "texto": "A) La cantidad de habitantes que tiene Córdoba es mayor que la que tiene Santa Fe.",
     "v": true,
     "ok": "t1_1ok"
    },
    {
     "id": "t1b",
     "audio": "t1_2",
     "texto": "B) La cantidad de habitantes que tiene Buenos Aires es mayor que el resto de las provincias.",
     "v": true,
     "ok": "t1_2ok"
    },
    {
     "id": "t1c",
     "audio": "t1_3",
     "texto": "C) Mendoza es la provincia que tiene menos cantidad de habitantes.",
     "v": false,
     "ok": "t1_3ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "instr": "t2_instr",
   "err": "t_err",
   "visual": {
    "tipo": "tabla",
    "cab": [
     "Provincia",
     "Habitantes"
    ],
    "filas": [
     [
      "Buenos Aires",
      "17.523.996"
     ],
     [
      "Córdoba",
      "3.840.905"
     ],
     [
      "Mendoza",
      "2.030.773"
     ],
     [
      "Santa Fe",
      "3.519.059"
     ],
     [
      "Tucumán",
      "1.703.186"
     ]
    ],
    "fuente": "Fuente: INDEC, Censo Nacional de Población, Hogares y Viviendas 2022. Resultados definitivos."
   },
   "rondas": [
    {
     "id": "t2",
     "texto": "¿Cómo se lee <b>1.703.186</b>?",
     "opciones": [
      "Un millón setecientos tres mil ciento ochenta y seis",
      "Un millón setecientos treinta mil ciento ochenta y seis",
      "Diecisiete millones tres mil ciento ochenta y seis",
      "Un millón setenta y tres mil ciento ochenta y seis"
     ],
     "respuesta": "Un millón setecientos tres mil ciento ochenta y seis",
     "ok": "t2_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 3",
   "instr": "t3_instr",
   "err": "t_err",
   "etiquetas": [
    "👍 Correcto",
    "👎 Incorrecto"
   ],
   "visual": {
    "tipo": "texto",
    "html": "📰 “Tucumán tiene aproximadamente 1,7 millones de habitantes y cuenta con más de 600.000 viviendas particulares.”"
   },
   "items": [
    {
     "id": "t3a",
     "audio": "t3_1",
     "texto": "A) Para expresar una cantidad de habitantes en millones siempre debe escribirse un número entero.",
     "v": false,
     "ok": "t3_1ok"
    },
    {
     "id": "t3b",
     "audio": "t3_2",
     "texto": "B) 1,7 millones representa una cantidad cercana a 1.700.000.",
     "v": true,
     "ok": "t3_2ok"
    },
    {
     "id": "t3c",
     "audio": "t3_3",
     "texto": "C) 1,7 millones significa que hay exactamente 1.700.000 habitantes.",
     "v": false,
     "ok": "t3_3ok"
    },
    {
     "id": "t3d",
     "audio": "t3_4",
     "texto": "D) 1,7 millones representa 17.000.000 de habitantes.",
     "v": false,
     "ok": "t3_4ok"
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
