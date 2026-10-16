/* DETECTIVES DE LAS DISTANCIAS — Matemática · 🔢 Matemática · 5.º grado
   Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de las distancias",
  "subtitulo": "Ficha 3: Medida (SIMELA)",
  "area": "🔢 Matemática · 5.º grado",
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
  "e01": "En el Sistema Métrico Legal Argentino, cada unidad es diez veces la que sigue: kilómetro, hectómetro, decámetro y metro.",
  "e02": "Un kilómetro es igual a mil metros, y también es igual a cien decámetros.",
  "e03": "Para pasar de kilómetros a metros, multiplicamos por mil. Tres kilómetros son tres mil metros, y dos coma cinco kilómetros son dos mil quinientos metros.",
  "e04": "Esa no es. Recordá que un kilómetro son mil metros.",
  "e05": "Tocá la equivalencia correcta.",
  "e06": "Cuatro kilómetros son…",
  "e07": "¡Sí! Cuatro por mil, cuatro mil metros.",
  "e08": "Dos kilómetros y trescientos metros son…",
  "e09": "¡Muy bien! Dos mil metros más trescientos, dos mil trescientos metros.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 6 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "e10": "Tarea uno. La familia de Martina viajó en auto. El odómetro marcaba veinticuatro mil quinientos ochenta kilómetros al salir y veinticuatro mil setecientos treinta y cinco al llegar. Martina calculó que recorrieron ciento cincuenta y cinco kilómetros. Sus compañeros dijeron: ciento cincuenta y cinco kilómetros, ciento cincuenta y cinco mil metros y quince mil quinientos decámetros. Indicá Verdadero o Falso.",
  "e11": "Ciento cincuenta y cinco kilómetros a metros: ciento cincuenta y cinco por mil, ciento cincuenta y cinco mil metros.",
  "e12": "¡Correcto! Es verdadero.",
  "e13": "Ciento cincuenta y cinco kilómetros a decámetros: ciento cincuenta y cinco por cien, quince mil quinientos decámetros.",
  "e14": "¡Correcto! Es verdadero: un kilómetro son cien decámetros.",
  "e15": "Todos los compañeros hablaban de la misma distancia.",
  "e16": "¡Correcto! Las tres expresiones son la misma distancia.",
  "e17": "Los compañeros se equivocaron: hablaban de distintas distancias.",
  "e18": "¡Correcto! Es falso: era la misma distancia, expresada en distintas unidades.",
  "e19": "Tarea dos. Según el Sistema Métrico Legal Argentino, ¿cuál es la relación de equivalencia correcta?",
  "e20": "Entre un kilómetro y el metro.",
  "e21": "¡Correcto! Un kilómetro son mil metros.",
  "e22": "Entre un kilómetro y el decámetro.",
  "e23": "¡Correcto! Un kilómetro son cien decámetros.",
  "e24": "Tarea tres. ¿Cómo se expresan en metros los ciento cincuenta y cinco kilómetros que recorrió el auto de la familia de Martina?",
  "e25": "¡Correcto! Ciento cincuenta y cinco por mil, ciento cincuenta y cinco mil metros.",
  "e26": "Tarea cuatro. Uní cada distancia en kilómetros con su expresión equivalente en metros.",
  "e27": "¡Excelente! Uniste todas las distancias.",
  "e28": "¡Sí! Ciento cincuenta y cinco kilómetros son ciento cincuenta y cinco mil metros.",
  "e29": "¡Correcto! Quince coma cinco kilómetros son quince mil quinientos metros.",
  "e30": "¡Bien! Uno coma cincuenta y cinco kilómetros son mil quinientos cincuenta metros.",
  "e31": "¡Muy bien! Cero coma ciento cincuenta y cinco kilómetros son ciento cincuenta y cinco metros.",
  "e32": "Tarea cinco. En otro viaje, el odómetro registró que recorrieron ocho kilómetros y quinientos metros. ¿Cómo se expresa esa distancia utilizando únicamente metros?",
  "e33": "¡Correcto! Ocho mil metros más quinientos, ocho mil quinientos metros.",
  "e34": "Tarea seis. Sin realizar cuentas escritas, ¿cuál de las siguientes distancias es mayor: tres kilómetros o dos mil quinientos metros?",
  "e35": "¡Correcto! Para comparar, usamos la misma unidad: tres mil metros es más que dos mil quinientos.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar si distintas expresiones nombran la misma distancia: kilómetros, decámetros y metros. Tocá Comenzar.",
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
   "titulo": "🔎 Kilómetros, decámetros y metros",
   "pasos": [
    {
     "audio": "e01",
     "texto": "En el <b>SIMELA</b>, cada unidad es <b>10 veces</b> la que sigue: km → hm → dam → m.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "km",
       "hm",
       "dam",
       "m"
      ],
      "filas": [
       [
        "1",
        "10",
        "100",
        "1.000"
       ]
      ]
     }
    },
    {
     "audio": "e02",
     "texto": "<b>1 km = 1.000 m</b> y <b>1 km = 100 dam</b>.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "km",
       "hm",
       "dam",
       "m"
      ],
      "filas": [
       [
        "1",
        "10",
        "100",
        "1.000"
       ]
      ]
     }
    },
    {
     "audio": "e03",
     "texto": "Para pasar de km a m, <b>multiplicamos por 1.000</b>: 3 km = 3.000 m · 2,5 km = 2.500 m.",
     "visual": {
      "tipo": "texto",
      "html": "3 km = <b>3.000 m</b><br>2,5 km = <b>2.500 m</b>"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "📏 ¡A convertir!",
   "instr": "e05",
   "err": "e04",
   "rondas": [
    {
     "id": "e06",
     "texto": "<b>4 km</b> = ",
     "opciones": [
      "4.000 m",
      "400 m",
      "40 m",
      "40.000 m"
     ],
     "ok": "e07",
     "audio": "e06",
     "respuesta": "4.000 m",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "km",
       "hm",
       "dam",
       "m"
      ],
      "filas": [
       [
        "1",
        "10",
        "100",
        "1.000"
       ]
      ]
     }
    },
    {
     "id": "e08",
     "texto": "<b>2 km y 300 m</b> = ",
     "opciones": [
      "2.300 m",
      "2.030 m",
      "230 m",
      "23.000 m"
     ],
     "ok": "e09",
     "audio": "e08",
     "respuesta": "2.300 m",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "km",
       "hm",
       "dam",
       "m"
      ],
      "filas": [
       [
        "1",
        "10",
        "100",
        "1.000"
       ]
      ]
     }
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
     "texto": "¡Ya sos un <b>detective</b>! Practicaste un montón."
    },
    {
     "audio": "de_2",
     "texto": "Ahora, las <b>6 tareas</b> de la ficha de la escuela."
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
   "instr": "e10",
   "err": "t_err",
   "visual": {
    "tipo": "texto",
    "html": "🚗 Recorrieron <b>155 km</b><br>Expresiones: 155 km · 155.000 m · 15.500 dam"
   },
   "items": [
    {
     "id": "e11",
     "audio": "e11",
     "texto": "155 km a metros = 155 × 1.000 = 155.000 m",
     "v": true,
     "ok": "e12"
    },
    {
     "id": "e13",
     "audio": "e13",
     "texto": "155 km a decámetros = 155 × 100 = 15.500 dam",
     "v": true,
     "ok": "e14"
    },
    {
     "id": "e15",
     "audio": "e15",
     "texto": "Todos los compañeros hablaban de la misma distancia.",
     "v": true,
     "ok": "e16"
    },
    {
     "id": "e17",
     "audio": "e17",
     "texto": "Los compañeros se equivocaron: hablaban de distintas distancias.",
     "v": false,
     "ok": "e18"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "instr": "e19",
   "err": "t_err",
   "rondas": [
    {
     "id": "e20",
     "texto": "¿Cuál es la relación correcta entre <b>1 kilómetro</b> y el <b>metro</b>?",
     "opciones": [
      "1 km = 10 m",
      "1 km = 100 m",
      "1 km = 1.000 m",
      "1 km = 10.000 m"
     ],
     "ok": "e21",
     "audio": "e20",
     "respuesta": "1 km = 1.000 m"
    },
    {
     "id": "e22",
     "texto": "¿Cuál es la relación correcta entre <b>1 kilómetro</b> y el <b>decámetro</b>?",
     "opciones": [
      "1 km = 10 dam",
      "1 km = 100 dam",
      "1 km = 1.000 dam",
      "1 km = 10.000 dam"
     ],
     "ok": "e23",
     "audio": "e22",
     "respuesta": "1 km = 100 dam"
    }
   ],
   "visual": {
    "tipo": "emoji",
    "e": "📏"
   }
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 3",
   "err": "t_err",
   "rondas": [
    {
     "id": "e24",
     "texto": "¿Cómo se expresan en <b>metros</b> los kilómetros que recorrió el auto de la familia de Martina (155 km)?",
     "opciones": [
      "1.550 m",
      "15.500 m",
      "155.000 m",
      "1.550.000 m"
     ],
     "ok": "e25",
     "audio": "e24",
     "respuesta": "155.000 m",
     "visual": {
      "tipo": "emoji",
      "e": "🚗"
     }
    }
   ]
  },
  {
   "tipo": "asociar",
   "titulo": "🏆 Tarea 4",
   "instr": "e26",
   "err": "t_err",
   "ok": "e27",
   "cab": [
    "Kilómetros (km)",
    "Metros (m)"
   ],
   "pares": [
    {
     "a": "155 km",
     "b": "155.000 m",
     "ok": "e28"
    },
    {
     "a": "15,5 km",
     "b": "15.500 m",
     "ok": "e29"
    },
    {
     "a": "1,55 km",
     "b": "1.550 m",
     "ok": "e30"
    },
    {
     "a": "0,155 km",
     "b": "155 m",
     "ok": "e31"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 5",
   "err": "t_err",
   "rondas": [
    {
     "id": "e32",
     "texto": "En otro viaje, el odómetro registró que recorrieron <b>8 km y 500 m</b>. ¿Cómo se expresa esa distancia utilizando únicamente metros?",
     "opciones": [
      "850 m",
      "8.050 m",
      "8.500 m",
      "85.000 m"
     ],
     "ok": "e33",
     "audio": "e32",
     "respuesta": "8.500 m",
     "visual": {
      "tipo": "emoji",
      "e": "🚗"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 6",
   "err": "t_err",
   "rondas": [
    {
     "id": "e34",
     "texto": "Sin realizar cuentas escritas, ¿cuál de las siguientes distancias es mayor: <b>3 km</b> o <b>2.500 m</b>?",
     "opciones": [
      "2.500 m, porque 2.500 es un número mayor que 3.",
      "3 km, porque equivale a 3.000 m, que es mayor que 2.500 m.",
      "Ambas distancias son exactamente iguales.",
      "Depende de la velocidad a la que avance el automóvil."
     ],
     "ok": "e35",
     "audio": "e34",
     "respuesta": "3 km, porque equivale a 3.000 m, que es mayor que 2.500 m.",
     "visual": {
      "tipo": "emoji",
      "e": "⚖️"
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
