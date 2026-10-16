/* ============================================================
   DETECTIVES DEL VALOR POSICIONAL — Matemática · 5.º grado
   Basado en la Ficha N.º 1 "Número" de Habilidades Lógico-Matemáticas
   DGE Mendoza · Continuidad pedagógica
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */
window.DATOS = {
 "meta": {
  "titulo": "Detectives del valor posicional",
  "subtitulo": "Ficha 1: Número",
  "area": "🔢 Matemática · 5.º grado",
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
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar nuestro sistema de numeración: agrupamientos de diez, el valor de cada cifra según su lugar y distintas formas de armar un mismo número. Tocá Comenzar.",
  "n1_1": "Nuestro sistema de numeración es decimal: agrupamos de a diez. Diez unidades forman una decena; diez decenas, una centena; diez centenas, una unidad de mil.",
  "n1_2": "Y es posicional: el valor de cada cifra depende del lugar que ocupa. En tres millones cuatrocientos cinco mil doscientos cincuenta y uno, el cuatro está en el lugar de las centenas de mil: vale cuatrocientos mil.",
  "n1_3": "Por eso, cuarenta grupos de diez mil son cuatrocientos mil.",
  "gr_instr": "Completá cada frase con diez, cien, mil, diez mil o cien mil. Tocá la opción que corresponde.",
  "gr_err": "No es esa. Probá multiplicando: la cantidad de grupos por el valor de cada grupo.",
  "gr1": "Treinta grupos de cuánto es igual a tres mil.",
  "gr1_ok": "¡Sí! Treinta grupos de cien son tres mil.",
  "gr2": "Veinticinco grupos de cuánto es igual a veinticinco mil.",
  "gr2_ok": "¡Muy bien! Veinticinco grupos de mil son veinticinco mil.",
  "gr3": "Siete grupos de cuánto es igual a setecientos mil.",
  "gr3_ok": "¡Genial! Siete grupos de cien mil son setecientos mil.",
  "gr4": "La cifra seis, en un millón doscientos sesenta mil, ¿qué posición ocupa?",
  "gr4_ok": "¡Excelente! El seis ocupa el lugar de las decenas de mil: vale sesenta mil.",
  "n2_1": "Un mismo número se puede armar de muchas formas.",
  "n2_2": "Seiscientos nueve mil quinientos es seis por cien mil, más nueve por mil, más cinco por cien.",
  "n2_3": "También es seiscientos nueve por mil, más cinco por cien. ¡Es el mismo número!",
  "mu_instr": "Hay dos formas correctas de armar el número. Tocá las dos y después Verificar.",
  "mu_err": "No son esas dos. Calculá cada una y compará con el número.",
  "mu1": "¿Cuáles dan trescientos cuatro mil veinte?",
  "mu1_ok": "¡Muy bien! Tres por cien mil más cuatro por mil más dos por diez, y trescientos cuatro por mil más dos por diez: las dos dan trescientos cuatro mil veinte.",
  "vf_instr": "Mirá las tarjetas de Ana y de Beto. Leé cada frase y tocá Verdadero o Falso.",
  "vf_err": "No es así. Calculá el puntaje de cada uno.",
  "vf1": "Ana y Beto obtuvieron el mismo puntaje.",
  "vf1_ok": "¡Correcto! Los dos tienen quince mil doscientos puntos.",
  "vf2": "Beto tiene más tarjetas que Ana.",
  "vf2_ok": "¡Sí! Beto tiene ciento cincuenta y dos tarjetas y Ana solo ocho.",
  "vf3": "Ana tiene más puntos porque sacó una tarjeta de diez mil.",
  "vf3_ok": "¡Bien! Es falso: tienen los mismos puntos.",
  "de_1": "¡Ya sos un detective del valor posicional!",
  "de_2": "Ahora llega el desafío: son las tres tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "t_err": "Esa no es la respuesta. Pensalo otra vez.",
  "t1_instr": "Tarea uno. Completá con diez, cien, mil, diez mil o cien mil, según corresponda.",
  "t1a": "Cuarenta grupos de cuánto es igual a cuatrocientos mil.",
  "t1a_ok": "¡Correcto! Cuarenta grupos de diez mil.",
  "t1b": "Cuatrocientos cincuenta grupos de cuánto es igual a cuarenta y cinco mil.",
  "t1b_ok": "¡Correcto! Cuatrocientos cincuenta grupos de cien.",
  "t1c": "Quince mil grupos de cuánto es igual a quince millones.",
  "t1c_ok": "¡Correcto! Quince mil grupos de mil.",
  "t1d": "La cifra cuatro, en el número tres millones cuatrocientos cinco mil doscientos cincuenta y uno, ocupa la posición de los…",
  "t1d_ok": "¡Correcto! El cuatro está en el lugar de las centenas de mil: los cien mil.",
  "t1e": "La cifra dos, en el número quinientos veinticinco mil cuatrocientos, ocupa la posición de los…",
  "t1e_ok": "¡Correcto! El dos está en el lugar de las unidades de mil: los mil.",
  "t2_instr": "Tarea dos. En un juego hay tarjetas con diferentes puntajes. Mirá las tarjetas de Eduardo y de Carmen, y decidí si cada frase es verdadera o falsa.",
  "t2_1": "Eduardo y Carmen obtuvieron el mismo puntaje.",
  "t2_1ok": "¡Correcto! Es falso: Eduardo tiene ciento catorce mil seiscientos cincuenta y Carmen doscientos catorce mil seiscientos cincuenta.",
  "t2_2": "Carmen tiene más tarjetas que Eduardo.",
  "t2_2ok": "¡Correcto! Carmen tiene doscientas veinticinco tarjetas y Eduardo diecisiete.",
  "t2_3": "Eduardo tiene más puntos porque sacó una tarjeta de cien mil.",
  "t2_3ok": "¡Correcto! Es falso: Carmen tiene más puntos.",
  "t3_instr": "Tarea tres. En un videojuego, María obtuvo seiscientos nueve mil quinientos puntos. ¿Quiénes obtuvieron el mismo puntaje que María? Hay dos respuestas correctas: tocá las dos y después Verificar.",
  "t3_ok": "¡Correcto! Juan y Francisco también tienen seiscientos nueve mil quinientos.",
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
   "titulo": "🔎 Decimal y posicional",
   "pasos": [
    {
     "audio": "n1_1",
     "texto": "Agrupamos de a <b>10</b>: 10 U = 1 D · 10 D = 1 C · 10 C = 1 UM",
     "visual": {
      "tipo": "texto",
      "html": "10 × 10 = 100 · 10 × 100 = 1.000 · 10 × 1.000 = 10.000"
     }
    },
    {
     "audio": "n1_2",
     "texto": "El <b>4</b> vale <b>400.000</b> por su lugar.",
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
       3,
       4,
       0,
       5,
       2,
       5,
       1
      ],
      "resaltar": [
       1
      ]
     }
    },
    {
     "audio": "n1_3",
     "texto": "40 grupos de <b>10.000</b> = 400.000",
     "visual": {
      "tipo": "texto",
      "html": "40 × 10.000 = 400.000"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧮 ¿Grupos de cuánto?",
   "instr": "gr_instr",
   "err": "gr_err",
   "img": "img/lechuza.png",
   "rondas": [
    {
     "id": "g1",
     "audio": "gr1",
     "texto": "30 grupos de ____ es igual a 3.000.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "100",
     "ok": "gr1_ok"
    },
    {
     "id": "g2",
     "audio": "gr2",
     "texto": "25 grupos de ____ es igual a 25.000.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "1.000",
     "ok": "gr2_ok"
    },
    {
     "id": "g3",
     "audio": "gr3",
     "texto": "7 grupos de ____ es igual a 700.000.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "100.000",
     "ok": "gr3_ok"
    },
    {
     "id": "g4",
     "audio": "gr4",
     "texto": "La cifra 6 en 1.260.000 ocupa la posición de los ____.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "10.000",
     "ok": "gr4_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 Un número, muchas formas",
   "pasos": [
    {
     "audio": "n2_1",
     "texto": "Un mismo número se arma de <b>muchas formas</b>.",
     "visual": {
      "tipo": "texto",
      "html": "609.500"
     }
    },
    {
     "audio": "n2_2",
     "texto": "6 × 100.000 + 9 × 1.000 + 5 × 100",
     "visual": {
      "tipo": "texto",
      "html": "600.000 + 9.000 + 500 = <b>609.500</b>"
     }
    },
    {
     "audio": "n2_3",
     "texto": "609 × 1.000 + 5 × 100 → ¡el mismo número!",
     "visual": {
      "tipo": "texto",
      "html": "609.000 + 500 = <b>609.500</b>"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🎮 Dos formas correctas",
   "instr": "mu_instr",
   "err": "mu_err",
   "img": "img/lechuza.png",
   "rondas": [
    {
     "id": "m1",
     "audio": "mu1",
     "texto": "¿Cuáles dan <b>304.020</b>? (Hay dos)",
     "opciones": [
      "3 × 100.000 + 4 × 1.000 + 2 × 10",
      "304 × 1.000 + 2 × 10",
      "3 × 100.000 + 4 × 10.000 + 2 × 10",
      "34 × 1.000 + 20"
     ],
     "respuestas": [
      "3 × 100.000 + 4 × 1.000 + 2 × 10",
      "304 × 1.000 + 2 × 10"
     ],
     "ok": "mu1_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🃏 Las tarjetas",
   "instr": "vf_instr",
   "err": "vf_err",
   "visual": {
    "tipo": "tarjetasPuntaje",
    "valores": "Tarjetas: 10.000 · 1.000 · 100",
    "jugadores": [
     {
      "nombre": "Ana",
      "lineas": [
       "1 tarjeta de 10.000",
       "5 tarjetas de 1.000",
       "2 tarjetas de 100"
      ]
     },
     {
      "nombre": "Beto",
      "lineas": [
       "152 tarjetas de 100"
      ]
     }
    ]
   },
   "items": [
    {
     "id": "v1",
     "audio": "vf1",
     "texto": "Ana y Beto obtuvieron el mismo puntaje.",
     "v": true,
     "ok": "vf1_ok"
    },
    {
     "id": "v2",
     "audio": "vf2",
     "texto": "Beto tiene más tarjetas que Ana.",
     "v": true,
     "ok": "vf2_ok"
    },
    {
     "id": "v3",
     "audio": "vf3",
     "texto": "Ana tiene más puntos porque sacó una tarjeta de 10.000.",
     "v": false,
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
     "texto": "¡Ya sos un <b>detective</b> del valor posicional!"
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
   "tipo": "opcion",
   "titulo": "🏆 Tarea 1",
   "instr": "t1_instr",
   "err": "t_err",
   "img": "img/lechuza.png",
   "rondas": [
    {
     "id": "t1a",
     "audio": "t1a",
     "texto": "A. 40 grupos de ____ es igual a 400.000.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "10.000",
     "ok": "t1a_ok"
    },
    {
     "id": "t1b",
     "audio": "t1b",
     "texto": "B. 450 grupos de ____ es igual a 45.000.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "100",
     "ok": "t1b_ok"
    },
    {
     "id": "t1c",
     "audio": "t1c",
     "texto": "C. 15.000 grupos de ____ es igual a 15.000.000.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "1.000",
     "ok": "t1c_ok"
    },
    {
     "id": "t1d",
     "audio": "t1d",
     "texto": "D. La cifra que ocupa el lugar de 4 en el número 3.405.251 ocupa la posición de los ____.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "100.000",
     "ok": "t1d_ok"
    },
    {
     "id": "t1e",
     "audio": "t1e",
     "texto": "E. La cifra que ocupa el lugar de 2 en el número 525.400 ocupa la posición de los ____.",
     "opciones": [
      "10",
      "100",
      "1.000",
      "10.000",
      "100.000"
     ],
     "respuesta": "1.000",
     "ok": "t1e_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 2",
   "instr": "t2_instr",
   "err": "t_err",
   "visual": {
    "tipo": "tarjetasPuntaje",
    "valores": "Tarjetas: 1.000.000 · 100.000 · 10.000 · 1.000 · 100 · 10 · 1",
    "jugadores": [
     {
      "nombre": "Eduardo",
      "lineas": [
       "1 tarjeta de 100.000",
       "1 tarjeta de 10.000",
       "4 tarjetas de 1.000",
       "6 tarjetas de 100",
       "5 tarjetas de 10"
      ]
     },
     {
      "nombre": "Carmen",
      "lineas": [
       "214 tarjetas de 1.000",
       "6 tarjetas de 100",
       "5 tarjetas de 10"
      ]
     }
    ]
   },
   "items": [
    {
     "id": "t2a",
     "audio": "t2_1",
     "texto": "Eduardo y Carmen obtuvieron el mismo puntaje.",
     "v": false,
     "ok": "t2_1ok"
    },
    {
     "id": "t2b",
     "audio": "t2_2",
     "texto": "Carmen tiene más tarjetas que Eduardo.",
     "v": true,
     "ok": "t2_2ok"
    },
    {
     "id": "t2c",
     "audio": "t2_3",
     "texto": "Eduardo tiene más puntos porque sacó una tarjeta de 100.000.",
     "v": false,
     "ok": "t2_3ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 3",
   "instr": "t3_instr",
   "err": "t_err",
   "img": "img/lechuza.png",
   "rondas": [
    {
     "id": "t3",
     "texto": "María obtuvo 6 × 100.000 + 5 × 100 y 9 × 1.000: <b>609.500</b> puntos. ¿Quiénes obtuvieron el mismo puntaje? (Hay dos)",
     "opciones": [
      "Tadeo: 69 × 1.000 + 5 × 100",
      "Juan: 6 × 100.000 + 9 × 1.000 + 5 × 100",
      "Lucas: 6 × 100.000 + 9 × 10.000 + 5 × 1.000",
      "Francisco: 609 × 1.000 + 5 × 100"
     ],
     "respuestas": [
      "Juan: 6 × 100.000 + 9 × 1.000 + 5 × 100",
      "Francisco: 609 × 1.000 + 5 × 100"
     ],
     "ok": "t3_ok"
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
