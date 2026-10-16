/* ============================================================
   DETECTIVES DE LOS NÚMEROS HASTA EL 10.000 — Matemática · 3.er grado
   Basado en la Ficha N.º 1 "Números" de Habilidades Lógico-Matemáticas
   DGE Mendoza · Continuidad pedagógica
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de los números grandes",
  "subtitulo": "Ficha 1: Números",
  "area": "🔢 Matemática · 3.er grado",
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
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar números grandes: leerlos en la recta numérica, escribirlos cuando nos los dictan y ubicarlos en el cuadro. Tocá Comenzar.",
  "n1_1": "Esta es una recta numérica. Tiene marcados el mil cien, el mil doscientos, el mil trescientos y el mil cuatrocientos.",
  "n1_2": "Entre mil cien y mil doscientos hay diez rayitas chiquitas. Cada rayita avanza diez.",
  "n1_3": "Entonces, contando de diez en diez: mil ciento diez, mil ciento veinte, mil ciento treinta… Así descubrimos el número marcado.",
  "re_instr": "Lola marcó un número en la recta numérica. Contá las rayitas de diez en diez y tocá qué número marcó.",
  "re_err": "No es ese. Empezá desde el número marcado más cercano y contá de diez en diez.",
  "re1_ok": "¡Sí! Desde mil doscientos, tres rayitas más: mil doscientos treinta.",
  "re2_ok": "¡Muy bien! Desde mil trescientos, siete rayitas más: mil trescientos setenta.",
  "re3_ok": "¡Excelente! Una rayita después del mil cien: mil ciento diez.",
  "n2_1": "Cuando nos dictan un número grande, lo escribimos por partes.",
  "n2_2": "Quince mil nueve: primero el quince mil, que se escribe quince, punto. Después faltan las centenas y las decenas: ahí van ceros. Y al final, el nueve.",
  "n2_3": "Quedan cinco cifras: uno, cinco, cero, cero, nueve. Los ceros guardan el lugar de lo que no se nombra.",
  "di_instr": "Escuchá el número que dicta la seño y tocá cómo se escribe.",
  "di_err": "No es ese. Pensá en qué lugares van ceros.",
  "di1": "Doce mil cuatro.",
  "di1_ok": "¡Sí! Doce mil cuatro: uno, dos, cero, cero, cuatro.",
  "di2": "Tres mil quinientos veinte.",
  "di2_ok": "¡Muy bien! Tres mil quinientos veinte: tres, cinco, dos, cero.",
  "di3": "Ocho mil sesenta.",
  "di3_ok": "¡Genial! Ocho mil sesenta: ocho, cero, seis, cero.",
  "co_instr": "Este cuadro va de diez en diez. Tocá una tarjeta y después el casillero donde va. Fijate la fila y la columna.",
  "co_err": "Ahí no va. La fila te dice las centenas y la columna las decenas.",
  "co_ok": "¡Cuadro completo! Cada número quedó en su fila y en su columna.",
  "de_1": "¡Ya sos un detective de los números grandes!",
  "de_2": "Ahora llega el desafío: son las cinco tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "t_err": "Esa no es la respuesta. Pensalo otra vez.",
  "t1_instr": "Tarea uno. Andrés marca un número en la recta numérica. ¿Qué número marcó?",
  "t1_ok": "¡Correcto! Seis rayitas después del mil cien: mil ciento sesenta.",
  "t2_instr": "Tarea dos. La seño les dictó el número.",
  "t2": "Quince mil nueve.",
  "t2_ok": "¡Correcto! Quince mil nueve se escribe uno, cinco, cero, cero, nueve.",
  "t3_instr": "Tarea tres. Lucas vive en la calle San Martín tres mil seiscientos trece. ¿Cuál es el cartel que aparece en el frente de su casa?",
  "t3_ok": "¡Correcto! Tres mil seiscientos trece: tres, seis, uno, tres.",
  "t4_instr": "Tarea cuatro. Esteban escribió el número.",
  "t4": "Diez mil setenta y tres.",
  "t4_ok": "¡Correcto! Diez mil setenta y tres: uno, cero, cero, siete, tres.",
  "t5_instr": "Tarea cinco. Ubicá estas tarjetas en el lugar que corresponde del cuadro. Tocá una tarjeta y después su casillero.",
  "t5_ok": "¡Correcto! Todas las tarjetas quedaron en su lugar.",
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
   "titulo": "🔎 La recta numérica",
   "pasos": [
    {
     "audio": "n1_1",
     "texto": "Una <b>recta numérica</b> del 1.100 al 1.400.",
     "visual": {
      "tipo": "recta",
      "min": 1100,
      "max": 1400,
      "paso": 10,
      "cada": 10
     }
    },
    {
     "audio": "n1_2",
     "texto": "Entre 1.100 y 1.200 hay <b>10 rayitas</b>: cada una avanza <b>10</b>."
    },
    {
     "audio": "n1_3",
     "texto": "1.110 · 1.120 · 1.130 · 1.140 …",
     "visual": {
      "tipo": "recta",
      "min": 1100,
      "max": 1400,
      "paso": 10,
      "cada": 10,
      "marca": 1140
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "📏 ¿Qué número marcó?",
   "instr": "re_instr",
   "err": "re_err",
   "rondas": [
    {
     "id": "r1",
     "visual": {
      "tipo": "recta",
      "min": 1100,
      "max": 1400,
      "paso": 10,
      "cada": 10,
      "marca": 1230
     },
     "opciones": [
      "1.203",
      "1.230",
      "1.320",
      "1.300"
     ],
     "respuesta": "1.230",
     "ok": "re1_ok"
    },
    {
     "id": "r2",
     "visual": {
      "tipo": "recta",
      "min": 1100,
      "max": 1400,
      "paso": 10,
      "cada": 10,
      "marca": 1370
     },
     "opciones": [
      "1.370",
      "1.307",
      "1.470",
      "1.360"
     ],
     "respuesta": "1.370",
     "ok": "re2_ok"
    },
    {
     "id": "r3",
     "visual": {
      "tipo": "recta",
      "min": 1100,
      "max": 1400,
      "paso": 10,
      "cada": 10,
      "marca": 1110
     },
     "opciones": [
      "1.110",
      "1.101",
      "1.011",
      "1.200"
     ],
     "respuesta": "1.110",
     "ok": "re3_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 Escribir números dictados",
   "pasos": [
    {
     "audio": "n2_1",
     "texto": "Un número grande se escribe <b>por partes</b>.",
     "visual": {
      "tipo": "texto",
      "html": "“Quince mil nueve”"
     }
    },
    {
     "audio": "n2_2",
     "texto": "<b>Quince mil</b> → 15. — sin centenas ni decenas → <b>0 0</b> — y <b>nueve</b>.",
     "visual": {
      "tipo": "posiciones",
      "cab": [
       "Decenas de mil",
       "Unidades de mil",
       "Centenas",
       "Decenas",
       "Unidades"
      ],
      "cifras": [
       1,
       5,
       0,
       0,
       9
      ],
      "resaltar": [
       2,
       3
      ]
     }
    },
    {
     "audio": "n2_3",
     "texto": "Queda <b>15.009</b>. Los ceros guardan el lugar.",
     "visual": {
      "tipo": "texto",
      "html": "15.009"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "📝 El dictado",
   "instr": "di_instr",
   "err": "di_err",
   "rondas": [
    {
     "id": "d1",
     "palabra": "Doce mil cuatro",
     "audio": "di1",
     "opciones": [
      "1.204",
      "12.004",
      "120.004",
      "12.400"
     ],
     "respuesta": "12.004",
     "ok": "di1_ok"
    },
    {
     "id": "d2",
     "palabra": "Tres mil quinientos veinte",
     "audio": "di2",
     "opciones": [
      "3.520",
      "30.520",
      "3.502",
      "35.020"
     ],
     "respuesta": "3.520",
     "ok": "di2_ok"
    },
    {
     "id": "d3",
     "palabra": "Ocho mil sesenta",
     "audio": "di3",
     "opciones": [
      "8.060",
      "8.600",
      "80.060",
      "8.006"
     ],
     "respuesta": "8.060",
     "ok": "di3_ok"
    }
   ],
   "img": "img/lechuza.png"
  },
  {
   "tipo": "completar",
   "titulo": "🗂️ Completá el cuadro",
   "instr": "co_instr",
   "err": "co_err",
   "ok": "co_ok",
   "paso": 10,
   "filas": [
    [
     0,
     10,
     20,
     30,
     40,
     50,
     60,
     70,
     80,
     90
    ],
    [
     100,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     200,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     300,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     400,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ]
   ],
   "tarjetas": [
    130,
    260,
    310,
    480
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🏆 ¡Llegó el desafío!",
   "img": "img/desafio.jpg",
   "pasos": [
    {
     "audio": "de_1",
     "texto": "¡Ya sos un <b>detective</b> de los números grandes!"
    },
    {
     "audio": "de_2",
     "texto": "Ahora, las <b>5 tareas</b> de la ficha de la escuela."
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
     "texto": "Andrés marca un número en la recta numérica. ¿Qué número marcó?",
     "visual": {
      "tipo": "recta",
      "min": 1100,
      "max": 1400,
      "paso": 10,
      "cada": 10,
      "marca": 1160
     },
     "opciones": [
      "1.006",
      "1.150",
      "1.160",
      "1.180"
     ],
     "respuesta": "1.160",
     "ok": "t1_ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "instr": "t2_instr",
   "err": "t_err",
   "img": "img/lechuza.png",
   "rondas": [
    {
     "id": "t2",
     "texto": "La seño les dictó el número. ¿Qué número es?",
     "palabra": "Quince mil nueve",
     "audio": "t2",
     "opciones": [
      "1.509",
      "15.009",
      "150.009",
      "1.510.009"
     ],
     "respuesta": "15.009",
     "ok": "t2_ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 3",
   "instr": "t3_instr",
   "err": "t_err",
   "rondas": [
    {
     "id": "t3",
     "texto": "Lucas vive en la calle San Martín “tres mil seiscientos trece”. ¿Cuál es el cartel de su casa?",
     "visual": {
      "tipo": "img",
      "src": "img/lechuza.png"
     },
     "opciones": [
      "3000613",
      "360013",
      "3613",
      "3316"
     ],
     "respuesta": "3613",
     "ok": "t3_ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 4",
   "instr": "t4_instr",
   "err": "t_err",
   "img": "img/lechuza.png",
   "rondas": [
    {
     "id": "t4",
     "texto": "Esteban escribió el número. Señalá la opción correcta.",
     "palabra": "Diez mil setenta y tres",
     "audio": "t4",
     "opciones": [
      "1.073",
      "10.073",
      "10.703",
      "10.730"
     ],
     "respuesta": "10.073",
     "ok": "t4_ok"
    }
   ]
  },
  {
   "tipo": "completar",
   "titulo": "🏆 Tarea 5",
   "instr": "t5_instr",
   "err": "t_err",
   "ok": "t5_ok",
   "paso": 10,
   "filas": [
    [
     0,
     10,
     20,
     30,
     40,
     50,
     60,
     70,
     80,
     90
    ],
    [
     100,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     200,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     300,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     400,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     500,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     600,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     700,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     800,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     900,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ],
    [
     1000,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null,
     null
    ]
   ],
   "tarjetas": [
    170,
    550,
    370,
    490,
    710,
    850,
    590,
    860
   ]
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
