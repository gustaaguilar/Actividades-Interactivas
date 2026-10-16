/* ============================================================
   DETECTIVES DE LOS NÚMEROS HASTA EL 1.000 — Matemática · 2.º grado
   Basado en la Ficha N.º 1 "Numeración y operaciones" de Habilidades
   Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de los números hasta el 1.000",
  "subtitulo": "Ficha 1: Numeración y operaciones",
  "area": "🔢 Matemática · 2.º grado",
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
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar los números hasta el mil: filas del cuadro de numeración, números que van antes y después, y quién tiene el número más grande. Tocá Comenzar.",
  "n1_1": "Esta es una fila del cuadro de numeración. Empieza en doscientos y termina en doscientos noventa.",
  "n1_2": "En esta fila los números van de diez en diez: doscientos, doscientos diez, doscientos veinte, doscientos treinta, y así.",
  "n1_3": "Todos los números de esta fila empiezan con dos, porque todos son doscientos y algo.",
  "n1_4": "Justo en el medio está el doscientos cincuenta.",
  "fi_instr": "Mirá la fila del cuadro de numeración. ¿Cuál de estos números pertenece a esa fila? Tocá la respuesta.",
  "fi_err": "Ese número no está en la fila. Fijate con qué número empieza y con cuál termina.",
  "fi1_ok": "¡Sí! Trescientos cincuenta está en la fila que va del trescientos al trescientos noventa.",
  "fi2_ok": "¡Muy bien! Quinientos sesenta está en la fila del quinientos.",
  "fi3_ok": "¡Excelente! Setecientos cuarenta está en la fila del setecientos.",
  "n2_1": "Ahora vamos a pensar en los números que van en el medio.",
  "n2_2": "Entre el setecientos ochenta y el setecientos noventa están el setecientos ochenta y uno, el setecientos ochenta y dos, y así hasta el setecientos ochenta y nueve.",
  "n2_3": "El número que va justo antes del setecientos noventa es el setecientos ochenta y nueve.",
  "fa_instr": "Las personas hacen fila con su número. ¿Qué número puede tener la persona marcada? Tocá la respuesta.",
  "fa_err": "Ese no puede ser. Tiene que estar entre los dos números de sus compañeros.",
  "fa1": "Tomás está entre el cuatrocientos cincuenta y el cuatrocientos sesenta.",
  "fa1_ok": "¡Sí! Cuatrocientos cincuenta y cinco está entre cuatrocientos cincuenta y cuatrocientos sesenta.",
  "fa2": "Sofía está entre el trescientos diecinueve y el trescientos veintiuno.",
  "fa2_ok": "¡Muy bien! Entre trescientos diecinueve y trescientos veintiuno está el trescientos veinte.",
  "fa3": "Mateo está entre el seiscientos y el seiscientos dos.",
  "fa3_ok": "¡Genial! Entre seiscientos y seiscientos dos está el seiscientos uno.",
  "n3_1": "Para saber qué número es más grande, primero miramos las centenas: el primer número.",
  "n3_2": "Setecientos cincuenta y dos tiene siete centenas. Quinientos setenta y dos tiene cinco. Entonces setecientos cincuenta y dos es mayor.",
  "n3_3": "Si las centenas son iguales, miramos las decenas: el número del medio.",
  "vf_instr": "Los contadores muestran cuántas vueltas dio cada auto. Leé cada frase y tocá Verdadero o Falso.",
  "vf_err": "No es así. Mirá bien los números de los contadores.",
  "vf1": "El auto amarillo es el que dio más vueltas.",
  "vf1_ok": "¡Correcto! Setecientos cincuenta y dos es el número más grande.",
  "vf2": "El auto verde dio menos de seiscientas vueltas.",
  "vf2_ok": "¡Sí! Quinientos setenta y dos es menos que seiscientos.",
  "vf3": "El auto rojo dio setecientas vueltas.",
  "vf3_ok": "¡Bien! Es falso: el auto rojo dio setecientas veinticinco vueltas.",
  "vf4": "Todos los autos dieron más de seiscientas vueltas.",
  "vf4_ok": "¡Muy bien! Es falso: el auto verde dio menos de seiscientas.",
  "de_1": "¡Ya sos un detective de los números hasta el mil!",
  "de_2": "Ahora llega el desafío: son las tres tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "t_err": "Esa no es la respuesta. Pensalo otra vez.",
  "t1_instr": "Tarea uno. ¿Cuál es el número que pertenece a esta fila del cuadro de numeración?",
  "t1_ok": "¡Correcto! Doscientos cincuenta está en la fila que va del doscientos al doscientos noventa.",
  "t2_instr": "Tarea dos. ¿Qué número tiene Juana si será la segunda en ser atendida? Juana está entre la persona que tiene el setecientos ochenta y la que tiene el setecientos noventa.",
  "t2_ok": "¡Correcto! Juana tiene el setecientos ochenta y nueve: está entre el setecientos ochenta y el setecientos noventa.",
  "t3_instr": "Tarea tres. El contador en la pista de autos indica la cantidad de vueltas que dio cada auto. Para cada afirmación, indicá si es verdadera o falsa.",
  "t3_1": "El auto rojo es el que dio más vueltas.",
  "t3_1ok": "¡Correcto! Novecientos ochenta y uno es el número más grande.",
  "t3_2": "El auto verde dio novecientas vueltas.",
  "t3_2ok": "¡Correcto! Es falso: dio ochocientas noventa y una.",
  "t3_3": "El auto amarillo dio más vueltas que el auto verde.",
  "t3_3ok": "¡Correcto! Es falso: ochocientos diecinueve es menos que ochocientos noventa y uno.",
  "t3_4": "Todos los autos dieron más de ochocientas vueltas.",
  "t3_4ok": "¡Correcto! Es verdadero: todos empiezan con ocho o con nueve centenas.",
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
   "titulo": "🔎 Una fila del cuadro",
   "pasos": [
    {
     "audio": "n1_1",
     "texto": "Una fila del <b>cuadro de numeración</b>: del 200 al 290.",
     "visual": {
      "tipo": "fila",
      "valores": [
       200,
       210,
       220,
       230,
       240,
       250,
       260,
       270,
       280,
       290
      ],
      "resaltar": [
       0,
       9
      ]
     }
    },
    {
     "audio": "n1_2",
     "texto": "Van de <b>10 en 10</b>: 200, 210, 220, 230…",
     "visual": {
      "tipo": "fila",
      "valores": [
       200,
       210,
       220,
       230,
       240,
       250,
       260,
       270,
       280,
       290
      ],
      "resaltar": [
       0,
       1,
       2,
       3
      ]
     }
    },
    {
     "audio": "n1_3",
     "texto": "Todos empiezan con <b>2</b>: son <b>doscientos y algo</b>."
    },
    {
     "audio": "n1_4",
     "texto": "En el medio está el <b>250</b>.",
     "visual": {
      "tipo": "fila",
      "valores": [
       200,
       210,
       220,
       230,
       240,
       250,
       260,
       270,
       280,
       290
      ],
      "resaltar": [
       5
      ]
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧩 ¿Qué número va en la fila?",
   "instr": "fi_instr",
   "err": "fi_err",
   "rondas": [
    {
     "id": "fi1",
     "texto": "¿Qué número pertenece a esta fila?",
     "visual": {
      "tipo": "fila",
      "valores": [
       300,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       390
      ]
     },
     "opciones": [
      350,
      450,
      305,
      400
     ],
     "respuesta": 350,
     "ok": "fi1_ok"
    },
    {
     "id": "fi2",
     "texto": "¿Qué número pertenece a esta fila?",
     "visual": {
      "tipo": "fila",
      "valores": [
       500,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       590
      ]
     },
     "opciones": [
      560,
      650,
      506,
      600
     ],
     "respuesta": 560,
     "ok": "fi2_ok"
    },
    {
     "id": "fi3",
     "texto": "¿Qué número pertenece a esta fila?",
     "visual": {
      "tipo": "fila",
      "valores": [
       700,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       790
      ]
     },
     "opciones": [
      740,
      470,
      800,
      704
     ],
     "respuesta": 740,
     "ok": "fi3_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 Los números del medio",
   "pasos": [
    {
     "audio": "n2_1",
     "texto": "¿Qué números van <b>en el medio</b>?",
     "visual": {
      "tipo": "personas",
      "tickets": [
       780,
       null,
       790
      ]
     }
    },
    {
     "audio": "n2_2",
     "texto": "Entre 780 y 790: <b>781, 782, 783… 789</b>."
    },
    {
     "audio": "n2_3",
     "texto": "Justo antes del 790 va el <b>789</b>.",
     "visual": {
      "tipo": "serie",
      "nums": [
       787,
       788,
       789,
       790
      ]
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧍 ¿Qué número tiene?",
   "instr": "fa_instr",
   "err": "fa_err",
   "rondas": [
    {
     "id": "fa1",
     "audio": "fa1",
     "texto": "¿Qué número puede tener <b>Tomás</b>?",
     "visual": {
      "tipo": "personas",
      "tickets": [
       450,
       null,
       460
      ],
      "nombres": [
       "",
       "Tomás",
       ""
      ],
      "destacar": 1
     },
     "opciones": [
      455,
      445,
      465,
      545
     ],
     "respuesta": 455,
     "ok": "fa1_ok"
    },
    {
     "id": "fa2",
     "audio": "fa2",
     "texto": "¿Qué número tiene <b>Sofía</b>?",
     "visual": {
      "tipo": "personas",
      "tickets": [
       319,
       null,
       321
      ],
      "nombres": [
       "",
       "Sofía",
       ""
      ],
      "destacar": 1
     },
     "opciones": [
      320,
      318,
      322,
      302
     ],
     "respuesta": 320,
     "ok": "fa2_ok"
    },
    {
     "id": "fa3",
     "audio": "fa3",
     "texto": "¿Qué número tiene <b>Mateo</b>?",
     "visual": {
      "tipo": "personas",
      "tickets": [
       600,
       null,
       602
      ],
      "nombres": [
       "",
       "Mateo",
       ""
      ],
      "destacar": 1
     },
     "opciones": [
      601,
      610,
      599,
      106
     ],
     "respuesta": 601,
     "ok": "fa3_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 ¿Cuál es mayor?",
   "pasos": [
    {
     "audio": "n3_1",
     "texto": "Para comparar, miramos primero las <b>centenas</b>.",
     "visual": {
      "tipo": "posiciones",
      "cab": [
       "Centenas",
       "Decenas",
       "Unidades"
      ],
      "cifras": [
       7,
       5,
       2
      ],
      "resaltar": [
       0
      ]
     }
    },
    {
     "audio": "n3_2",
     "texto": "<b>7</b>52 Es mayor que <b>5</b>72.",
     "visual": {
      "tipo": "serie",
      "nums": [
       752,
       572
      ]
     }
    },
    {
     "audio": "n3_3",
     "texto": "Si las centenas son iguales, miramos las <b>decenas</b>.",
     "visual": {
      "tipo": "posiciones",
      "cab": [
       "Centenas",
       "Decenas",
       "Unidades"
      ],
      "cifras": [
       8,
       9,
       1
      ],
      "resaltar": [
       1
      ]
     }
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏎️ La carrera",
   "instr": "vf_instr",
   "err": "vf_err",
   "visual": {
    "tipo": "autos",
    "autos": [
     {
      "color": "#e63946",
      "n": 725
     },
     {
      "color": "#2a9d8f",
      "n": 572
     },
     {
      "color": "#ffb703",
      "n": 752
     }
    ]
   },
   "items": [
    {
     "id": "v1",
     "audio": "vf1",
     "texto": "El auto amarillo es el que dio más vueltas.",
     "v": true,
     "ok": "vf1_ok"
    },
    {
     "id": "v2",
     "audio": "vf2",
     "texto": "El auto verde dio menos de 600 vueltas.",
     "v": true,
     "ok": "vf2_ok"
    },
    {
     "id": "v3",
     "audio": "vf3",
     "texto": "El auto rojo dio 700 vueltas.",
     "v": false,
     "ok": "vf3_ok"
    },
    {
     "id": "v4",
     "audio": "vf4",
     "texto": "Todos los autos dieron más de 600 vueltas.",
     "v": false,
     "ok": "vf4_ok"
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
     "texto": "¡Ya sos un <b>detective</b> de los números hasta el 1.000!"
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
   "rondas": [
    {
     "id": "t1",
     "texto": "¿Cuál es el número que pertenece a esta fila del cuadro de numeración?",
     "visual": {
      "tipo": "fila",
      "valores": [
       200,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       null,
       290
      ]
     },
     "opciones": [
      160,
      250,
      300,
      380
     ],
     "respuesta": 250,
     "ok": "t1_ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "instr": "t2_instr",
   "err": "t_err",
   "rondas": [
    {
     "id": "t2",
     "texto": "¿Qué número tiene <b>Juana</b> si será la segunda en ser atendida?",
     "visual": {
      "tipo": "personas",
      "tickets": [
       780,
       null,
       790,
       null
      ],
      "nombres": [
       "",
       "Juana",
       "",
       ""
      ],
      "destacar": 1
     },
     "opciones": [
      200,
      779,
      789,
      870
     ],
     "respuesta": 789,
     "ok": "t2_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 3",
   "instr": "t3_instr",
   "err": "t_err",
   "visual": {
    "tipo": "autos",
    "autos": [
     {
      "color": "#e63946",
      "n": 981
     },
     {
      "color": "#2a9d8f",
      "n": 891
     },
     {
      "color": "#ffb703",
      "n": 819
     }
    ]
   },
   "items": [
    {
     "id": "t3a",
     "audio": "t3_1",
     "texto": "El auto rojo es el que dio más vueltas.",
     "v": true,
     "ok": "t3_1ok"
    },
    {
     "id": "t3b",
     "audio": "t3_2",
     "texto": "El auto verde dio 900 vueltas.",
     "v": false,
     "ok": "t3_2ok"
    },
    {
     "id": "t3c",
     "audio": "t3_3",
     "texto": "El auto amarillo dio más vueltas que el auto verde.",
     "v": false,
     "ok": "t3_3ok"
    },
    {
     "id": "t3d",
     "audio": "t3_4",
     "texto": "Todos los autos dieron más de 800 vueltas.",
     "v": true,
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
