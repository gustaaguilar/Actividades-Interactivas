/* datos.js — "Rumbo a la Luna" · Parte 1 · Cuatro héroes que hacen historia · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 39 a 43.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Rumbo a la Luna",
    "grado": "5.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "corto": "Rumbo a la Luna 1",
    "parte": "Parte 1 · Cuatro héroes que hacen historia",
    "subtitulo": "El sorteo de los astronautas: probabilidad como fracción, decimal y porcentaje, sucesos seguros, posibles e imposibles",
    "imgPortada": "portada.jpg",
    "imgCierre": "postulantes.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Rumbo a la Luna» (págs. 39 a 43) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Rumbo a la Luna",
      "vis": {
        "t": "img",
        "src": "portada.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("l01_1", "Este mensaje es solo para el equipo seleccionado. La humanidad está por construir una base en la Luna, y los científicos necesitan ayuda para calcular, diseñar y tomar decisiones."),
          "chip": "🌕 Una base en la Luna"
        },
        {
          "audio": A("l01_2", "Ustedes, los chicos de quinto grado, fueron elegidos. Cada número y cada cálculo puede hacer que la misión tenga éxito. ¿Están listos para ser el equipo matemático de la misión?"),
          "chip": "🚀 ¡Ustedes son el equipo matemático!"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los postulantes",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "astronautas.jpg",
            "h": 30
          },
          {
            "t": "tabla",
            "id": "tp",
            "cab": [
              "País",
              "Rusia",
              "Brasil",
              "Argentina",
              "EE. UU."
            ],
            "filas": [
              [
                "Jóvenes",
                "?",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("l02_p", "Contá los trajes que tienen la bandera de ese país."),
      "instr": A("l02_i", "Para la Misión Estrella del Sur se postularon jóvenes de distintos países. Contá en la imagen cuántos hay de cada país."),
      "items": [
        {
          "preg": "¿Cuántos jóvenes de <b>Rusia</b> participan?",
          "audio": A("l02_a", "¿Cuántos jóvenes de Rusia participan?"),
          "destacar": [
            "tp_0_1"
          ],
          "opc": [
            "5",
            "4",
            "6",
            "8"
          ],
          "escribir": [
            {
              "id": "tp_0_1",
              "h": "5"
            }
          ],
          "conf": A("l02_ac", "Hay 5 jóvenes de Rusia, en la fila de arriba.")
        },
        {
          "preg": "¿Y de <b>Brasil</b>?",
          "audio": A("l02_b", "¿Y de Brasil?"),
          "destacar": [
            "tp_0_2"
          ],
          "opc": [
            "2",
            "3",
            "1",
            "5"
          ],
          "escribir": [
            {
              "id": "tp_0_2",
              "h": "2"
            }
          ],
          "conf": A("l02_bc", "Hay 2 jóvenes de Brasil.")
        },
        {
          "preg": "¿Y de <b>Argentina</b>?",
          "audio": A("l02_c", "¿Y de Argentina?"),
          "destacar": [
            "tp_0_3"
          ],
          "opc": [
            "8",
            "5",
            "7",
            "10"
          ],
          "escribir": [
            {
              "id": "tp_0_3",
              "h": "8"
            }
          ],
          "conf": A("l02_cc", "Hay 8 jóvenes de Argentina: es el país con más postulantes.")
        },
        {
          "preg": "¿Y de <b>Estados Unidos</b>? ¿Cuántos son en total?",
          "audio": A("l02_d", "¿Y de Estados Unidos? ¿Cuántos son en total?"),
          "destacar": [
            "tp_0_4"
          ],
          "opc": [
            "5, y en total 20",
            "4, y en total 19",
            "5, y en total 18",
            "6, y en total 21"
          ],
          "escribir": [
            {
              "id": "tp_0_4",
              "h": "5"
            }
          ],
          "conf": A("l02_dc", "5 de Estados Unidos. En total: 5 más 2 más 8 más 5, 20 jóvenes.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Juguemos a sortear astronautas",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "astronautas.jpg",
            "h": 22
          },
          {
            "t": "tarjetas",
            "id": "tj",
            "g": [
              [
                "Rusia",
                "#dc2626",
                5
              ],
              [
                "Brasil",
                "#16a34a",
                2
              ],
              [
                "Argentina",
                "#38bdf8",
                8
              ],
              [
                "Estados Unidos",
                "#1e3a8a",
                5
              ]
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("l03_1", "Para elegir a los astronautas se hace un sorteo. En una bolsa hay 20 tarjetas, una por cada postulante."),
          "destacar": [
            "tj"
          ],
          "chip": "🎟️ 20 tarjetas en una bolsa"
        },
        {
          "audio": A("l03_2", "5 tarjetas son de Rusia, 2 de Brasil, 8 de Argentina y 5 de Estados Unidos."),
          "destacar": [
            "tj_0",
            "tj_1",
            "tj_2",
            "tj_3"
          ],
          "chip": "Rusia 5 · Brasil 2 · Argentina 8 · EE. UU. 5"
        },
        {
          "audio": A("l03_3", "Se saca una tarjeta sin mirar, se anota de qué país salió y se devuelve a la bolsa. ¿Podemos saber cuál va a salir?"),
          "chip": "🤔 ¿Sabemos cuál va a salir?"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Para después de jugar",
      "vis": {
        "t": "tarjetas",
        "id": "tj",
        "g": [
          [
            "Rusia",
            "#dc2626",
            5
          ],
          [
            "Brasil",
            "#16a34a",
            2
          ],
          [
            "Argentina",
            "#38bdf8",
            8
          ],
          [
            "Estados Unidos",
            "#1e3a8a",
            5
          ]
        ]
      },
      "deco": "astronautas.jpg",
      "pista": A("l04_p", "Pensá en cuántas tarjetas hay de cada país dentro de la bolsa."),
      "instr": A("l04_i", "Pensemos en el juego del sorteo."),
      "items": [
        {
          "preg": "Antes de sacar una tarjeta, ¿podemos saber <b>con seguridad</b> cuál saldrá?",
          "audio": A("l04_a", "Antes de sacar una tarjeta, ¿podemos saber con seguridad cuál saldrá?"),
          "opc": [
            "No: es al azar",
            "Sí: siempre sale Argentina",
            "Sí: sale la de arriba",
            "Sí: la que pensamos"
          ],
          "conf": A("l04_ac", "No. Se saca sin mirar: es un juego de azar.")
        },
        {
          "preg": "Si salió Argentina y se devolvió la tarjeta, ¿puede volver a salir Argentina?",
          "audio": A("l04_b", "Si salió Argentina y se devolvió la tarjeta, ¿puede volver a salir Argentina en la ronda siguiente?"),
          "opc": [
            "Sí: las tarjetas vuelven a la bolsa",
            "No: ya salió",
            "No: le toca a otro país",
            "Solo si se saca dos veces"
          ],
          "conf": A("l04_bc", "Sí. La tarjeta vuelve a la bolsa y todo queda igual que antes.")
        },
        {
          "preg": "Tener más tarjetas, ¿<b>asegura</b> que siempre saldrá ese país?",
          "audio": A("l04_c", "Tener más tarjetas, ¿asegura que siempre saldrá ese país?"),
          "opc": [
            "No, pero tiene más posibilidades",
            "Sí, siempre sale",
            "No, tiene menos posibilidades",
            "Da lo mismo"
          ],
          "conf": A("l04_cc", "No lo asegura, pero cuantas más tarjetas tiene, más posibilidades de salir.")
        },
        {
          "preg": "¿Qué es más probable: que salga <b>Rusia</b> o que salga <b>Estados Unidos</b>?",
          "audio": A("l04_d", "¿Qué es más probable: que salga Rusia o que salga Estados Unidos?"),
          "opc": [
            "Igual de probable: 5 tarjetas cada uno",
            "Rusia",
            "Estados Unidos",
            "Ninguno puede salir"
          ],
          "conf": A("l04_dc", "Los dos tienen 5 tarjetas: es igualmente probable.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Probabilidades del sorteo",
      "vis": {
        "t": "tarjetas",
        "id": "tj",
        "g": [
          [
            "Rusia",
            "#dc2626",
            5
          ],
          [
            "Brasil",
            "#16a34a",
            2
          ],
          [
            "Argentina",
            "#38bdf8",
            8
          ],
          [
            "Estados Unidos",
            "#1e3a8a",
            5
          ]
        ]
      },
      "deco": "astronautas.jpg",
      "pista": A("pi_prob", "Acordate: la probabilidad es la cantidad de casos favorables sobre el total de casos posibles."),
      "instr": A("l05_i", "Calculamos probabilidades: cuántas tarjetas favorables hay sobre las 20 de la bolsa."),
      "items": [
        {
          "preg": "¿Qué probabilidad hay de que salga un astronauta de <b>América del Sur</b>?",
          "audio": A("l05_a", "¿Qué probabilidad hay de que salga un astronauta de América del Sur?"),
          "opc": [
            "10/20, es decir, ½",
            "8/20",
            "2/20",
            "20/20"
          ],
          "conf": A("l05_ac", "Brasil y Argentina son de América del Sur: 2 más 8, 10 tarjetas de 20. Es un medio.")
        },
        {
          "preg": "¿Qué probabilidad hay de que salga un astronauta de <b>Chile</b>?",
          "audio": A("l05_b", "¿Qué probabilidad hay de que salga un astronauta de Chile?"),
          "opc": [
            "0: es imposible",
            "1/20",
            "½",
            "1: es seguro"
          ],
          "conf": A("l05_bc", "No hay tarjetas de Chile: la probabilidad es 0. Es un suceso imposible.")
        },
        {
          "preg": "¿Qué tendría que pasar para que la probabilidad de <b>Argentina</b> sea mucho mayor?",
          "audio": A("l05_c", "¿Qué tendría que pasar para que la probabilidad de Argentina sea mucho mayor?"),
          "opc": [
            "Que haya más tarjetas de Argentina en la bolsa",
            "Sacar más rápido",
            "Mirar antes de sacar",
            "Sacar menos veces"
          ],
          "conf": A("l05_cc", "Agregando más tarjetas de Argentina, o sacando de otros países, aumentan sus casos favorables.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Fracción, decimal y porcentaje",
      "deco": "postulantes.jpg",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "tarjetas",
            "id": "tj",
            "g": [
              [
                "Rusia",
                "#dc2626",
                5
              ],
              [
                "Brasil",
                "#16a34a",
                2
              ],
              [
                "Argentina",
                "#38bdf8",
                8
              ],
              [
                "Estados Unidos",
                "#1e3a8a",
                5
              ]
            ]
          },
          {
            "t": "tabla",
            "id": "pb",
            "cab": [
              "Probabilidad",
              "Rusia",
              "Brasil",
              "Argentina",
              "EE. UU."
            ],
            "filas": [
              [
                "Fracción",
                "?",
                "?",
                "?",
                "5/20"
              ],
              [
                "Decimal",
                "?",
                "0,10",
                "?",
                "?"
              ],
              [
                "Porcentaje",
                "25%",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("pi_prob", "Acordate: la probabilidad es la cantidad de casos favorables sobre el total de casos posibles."),
      "instr": A("l06_i", "Completá la tabla con la probabilidad de cada país, escrita de tres maneras."),
      "items": [
        {
          "preg": "Rusia: <b>5 de 20</b>. ¿Fracción y decimal?",
          "audio": A("l06_a", "Rusia tiene 5 tarjetas de 20. ¿Cómo se escribe su probabilidad como fracción y como decimal?"),
          "destacar": [
            "pb_0_1",
            "pb_1_1"
          ],
          "opc": [
            "5/20 y 0,25",
            "5/20 y 0,5",
            "20/5 y 0,25",
            "1/5 y 0,20"
          ],
          "escribir": [
            {
              "id": "pb_0_1",
              "h": "5/20"
            },
            {
              "id": "pb_1_1",
              "h": "0,25"
            }
          ],
          "conf": A("l06_ac", "5 veinteavos es lo mismo que un cuarto: 0,25, o sea 25 por ciento.")
        },
        {
          "preg": "Brasil: <b>2 de 20</b>. ¿Fracción y porcentaje?",
          "audio": A("l06_b", "Brasil tiene 2 tarjetas de 20. ¿Fracción y porcentaje?"),
          "destacar": [
            "pb_0_2",
            "pb_2_2"
          ],
          "opc": [
            "2/20 y 10%",
            "2/20 y 2%",
            "2/20 y 20%",
            "20/2 y 10%"
          ],
          "escribir": [
            {
              "id": "pb_0_2",
              "h": "2/20"
            },
            {
              "id": "pb_2_2",
              "h": "10%"
            }
          ],
          "conf": A("l06_bc", "2 veinteavos es 0,10, el 10 por ciento.")
        },
        {
          "preg": "Argentina: <b>8 de 20</b>. ¿Fracción, decimal y porcentaje?",
          "audio": A("l06_c", "Argentina tiene 8 tarjetas de 20. ¿Fracción, decimal y porcentaje?"),
          "destacar": [
            "pb_0_3",
            "pb_1_3",
            "pb_2_3"
          ],
          "opc": [
            "8/20 · 0,40 · 40%",
            "8/20 · 0,8 · 80%",
            "8/20 · 0,08 · 8%",
            "20/8 · 0,40 · 40%"
          ],
          "escribir": [
            {
              "id": "pb_0_3",
              "h": "8/20"
            },
            {
              "id": "pb_1_3",
              "h": "0,40"
            },
            {
              "id": "pb_2_3",
              "h": "40%"
            }
          ],
          "conf": A("l06_cc", "8 veinteavos es 0,40, el 40 por ciento.")
        },
        {
          "preg": "Estados Unidos: <b>5/20</b>. ¿Decimal y porcentaje?",
          "audio": A("l06_d", "Estados Unidos tiene 5 veinteavos. ¿Decimal y porcentaje?"),
          "destacar": [
            "pb_1_4",
            "pb_2_4"
          ],
          "opc": [
            "0,25 y 25%",
            "0,5 y 50%",
            "0,20 y 20%",
            "0,05 y 5%"
          ],
          "escribir": [
            {
              "id": "pb_1_4",
              "h": "0,25"
            },
            {
              "id": "pb_2_4",
              "h": "25%"
            }
          ],
          "conf": A("l06_dc", "Igual que Rusia: 0,25, el 25 por ciento.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Lo que dicen los postulantes",
      "vf": true,
      "vis": {
        "t": "img",
        "src": "postulantes.jpg",
        "h": 34
      },
      "pista": A("pi_prob", "Acordate: la probabilidad es la cantidad de casos favorables sobre el total de casos posibles."),
      "instr": A("l07_i", "Dos postulantes comentan algo sobre el sorteo. ¿Es verdadero o falso?"),
      "items": [
        {
          "preg": "«La probabilidad de que salga seleccionado un astronauta ruso es del <b>25%</b>.»",
          "audio": A("l07_a", "La probabilidad de que salga seleccionado un astronauta ruso es del 25 por ciento."),
          "v": true,
          "conf": A("l07_ac", "Verdadero: 5 de 20 es un cuarto, el 25 por ciento.")
        },
        {
          "preg": "«La de que salga uno estadounidense es de <b>¼</b>.»",
          "audio": A("l07_b", "La de que salga uno estadounidense es de un cuarto."),
          "v": true,
          "conf": A("l07_bc", "Verdadero: también son 5 de 20, un cuarto.")
        },
        {
          "preg": "«Es más probable que salga Brasil que Argentina.»",
          "audio": A("l07_c", "Es más probable que salga Brasil que Argentina."),
          "v": false,
          "conf": A("l07_cc", "Falso: Brasil tiene 2 tarjetas y Argentina 8.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La recta de la probabilidad",
      "vis": {
        "t": "recta",
        "id": "rc",
        "h": 16,
        "puntos": [
          [
            "Brasil",
            0.1,
            "#16a34a"
          ],
          [
            "Rusia y EE. UU.",
            0.25,
            "#dc2626",
            true
          ],
          [
            "Argentina",
            0.4,
            "#0284c7",
            true
          ]
        ]
      },
      "pista": A("l08_p", "Cada marquita de la recta vale un décimo: 0,1."),
      "instr": A("l08_i", "En la recta está ubicada la probabilidad de Brasil, 0,10. ¿Dónde van los demás países?"),
      "items": [
        {
          "preg": "¿Dónde va <b>Argentina</b> (0,40)?",
          "audio": A("l08_a", "¿Dónde va Argentina, con 0,40?"),
          "opc": [
            "En la 4.ª marca, cerca de la mitad",
            "Justo en la mitad",
            "En la 1.ª marca",
            "En el 1, seguro"
          ],
          "mostrar": [
            "rc_2"
          ],
          "conf": A("l08_ac", "0,40 está en la cuarta marquita: un poco antes de la mitad.")
        },
        {
          "preg": "¿Dónde van <b>Rusia</b> y <b>Estados Unidos</b> (0,25)?",
          "audio": A("l08_b", "¿Dónde van Rusia y Estados Unidos, con 0,25?"),
          "opc": [
            "Entre la 2.ª y la 3.ª marca",
            "En la 5.ª marca",
            "En la 1.ª marca",
            "En el 0"
          ],
          "mostrar": [
            "rc_1"
          ],
          "conf": A("l08_bc", "0,25 está entre 0,20 y 0,30: entre la segunda y la tercera marca.")
        },
        {
          "preg": "¿Dónde iría un suceso <b>seguro</b>, como «que salga una tarjeta de algún país»?",
          "audio": A("l08_c", "¿Dónde iría un suceso seguro, como que salga una tarjeta de algún país?"),
          "opc": [
            "En el 1",
            "En el 0",
            "En la mitad",
            "Fuera de la recta"
          ],
          "conf": A("l08_cc", "Lo seguro tiene probabilidad 1, en el extremo derecho.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: ¿qué es más probable?",
      "deco": "portada.jpg",
      "pista": A("pi_prob", "Acordate: la probabilidad es la cantidad de casos favorables sobre el total de casos posibles."),
      "instr": A("l09_i", "Pensá en un dado común, con números del 1 al 6."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">🎲 ❓</div>"
          },
          "preg": "En probabilidad, un suceso es <b>imposible</b> si…",
          "audio": A("l09_a", "En probabilidad, un suceso es imposible si…"),
          "opc": [
            "Nunca sucede",
            "Ocurre muchas veces",
            "Ocurre muy pocas veces",
            "Una vez no ocurre"
          ],
          "conf": A("l09_ac", "Imposible es lo que nunca puede suceder: probabilidad 0.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">🎲 1 · 2 · 3 · 4 · 5 · 6</div>"
          },
          "preg": "¿Qué es más probable: sacar un número <b>par</b> o un número <b>primo</b>?",
          "audio": A("l09_b", "¿Qué es más probable: sacar un número par o un número primo?"),
          "opc": [
            "Igual: 3 casos cada uno",
            "Par",
            "Primo",
            "Ninguno puede salir"
          ],
          "conf": A("l09_bc", "Pares: 2, 4 y 6. Primos: 2, 3 y 5. Tres casos cada uno: igual de probable.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">🎲 1 · 2 · 3 · 4 · 5 · 6</div>"
          },
          "preg": "¿Qué es más probable: sacar <b>5 o 6</b>, o sacar <b>1, 2, 3 o 4</b>?",
          "audio": A("l09_c", "¿Qué es más probable: sacar 5 o 6, o sacar 1, 2, 3 o 4?"),
          "opc": [
            "1, 2, 3 o 4",
            "5 o 6",
            "Es igual",
            "No se puede saber"
          ],
          "conf": A("l09_cc", "1, 2, 3 o 4 son 4 casos; 5 o 6, solo 2.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el dado",
      "vis": {
        "t": "tabla",
        "id": "dd",
        "cab": [
          "Que salga…",
          "1",
          "Par",
          "3 o más",
          "4",
          "7",
          "Entre 1 y 6"
        ],
        "filas": [
          [
            "Probabilidad",
            "?",
            "?",
            "?",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "portada.jpg",
      "pista": A("pi_prob", "Acordate: la probabilidad es la cantidad de casos favorables sobre el total de casos posibles."),
      "instr": A("l10_i", "Calculá la probabilidad de cada suceso al tirar un dado común."),
      "items": [
        {
          "preg": "Que salga un <b>1</b>, y que salga un número <b>par</b>",
          "audio": A("l10_a", "¿Qué probabilidad hay de que salga un 1? ¿Y un número par?"),
          "destacar": [
            "dd_0_1",
            "dd_0_2"
          ],
          "opc": [
            "1/6 y 3/6",
            "1/6 y 2/6",
            "1/2 y 3/6",
            "1/6 y 6/6"
          ],
          "escribir": [
            {
              "id": "dd_0_1",
              "h": "1/6"
            },
            {
              "id": "dd_0_2",
              "h": "3/6"
            }
          ],
          "conf": A("l10_ac", "Un 1: 1 caso de 6. Par: 2, 4 y 6, 3 casos de 6.")
        },
        {
          "preg": "Que salga un número <b>igual o mayor que 3</b>, y que salga un <b>4</b>",
          "audio": A("l10_b", "¿Y que salga un número igual o mayor que 3? ¿Y un 4?"),
          "destacar": [
            "dd_0_3",
            "dd_0_4"
          ],
          "opc": [
            "4/6 y 1/6",
            "3/6 y 1/6",
            "4/6 y 4/6",
            "2/6 y 1/6"
          ],
          "escribir": [
            {
              "id": "dd_0_3",
              "h": "4/6"
            },
            {
              "id": "dd_0_4",
              "h": "1/6"
            }
          ],
          "conf": A("l10_bc", "3, 4, 5 y 6: 4 casos de 6. Un 4: 1 de 6.")
        },
        {
          "preg": "Que salga un <b>7</b>, y que salga un número <b>entre 1 y 6</b>",
          "audio": A("l10_c", "¿Y que salga un 7? ¿Y un número entre 1 y 6?"),
          "destacar": [
            "dd_0_5",
            "dd_0_6"
          ],
          "opc": [
            "0 (imposible) y 1 (seguro)",
            "1/6 y 6/6",
            "0 y 1/6",
            "7/6 y 1"
          ],
          "escribir": [
            {
              "id": "dd_0_5",
              "h": "0"
            },
            {
              "id": "dd_0_6",
              "h": "1"
            }
          ],
          "conf": A("l10_cc", "El 7 no está en el dado: es imposible. Que salga un número del 1 al 6 es seguro.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la bolsa de bolitas",
      "deco": "portada.jpg",
      "pista": A("l11_p", "Mirá de qué color hay más bolitas, de cuál hay menos y cuál no aparece."),
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "txt",
            "h": "<div class=\"grande\">🟠🟠🟠🟠🟠🟠🟠 🟣 ⚪</div>"
          },
          {
            "t": "txt",
            "h": "En la bolsa hay <b>7 naranjas</b>, <b>1 violeta</b> y <b>1 gris</b>"
          }
        ]
      },
      "instr": A("l11_i", "En una bolsa hay 7 bolitas naranjas, 1 violeta y 1 gris. Se saca una sin mirar."),
      "items": [
        {
          "preg": "Sacar una bolita <b>naranja</b> es…",
          "audio": A("l11_a", "Sacar una bolita naranja es…"),
          "opc": [
            "Muy probable",
            "Poco probable",
            "Imposible",
            "Seguro"
          ],
          "conf": A("l11_ac", "Muy probable: son 7 de 9.")
        },
        {
          "preg": "Sacar una bolita <b>violeta</b> es…",
          "audio": A("l11_b", "Sacar una bolita violeta es…"),
          "opc": [
            "Poco probable",
            "Muy probable",
            "Imposible",
            "Seguro"
          ],
          "conf": A("l11_bc", "Poco probable: hay una sola de 9.")
        },
        {
          "preg": "Sacar una bolita <b>verde</b> es…",
          "audio": A("l11_c", "Sacar una bolita verde es…"),
          "opc": [
            "Imposible",
            "Poco probable",
            "Seguro",
            "Muy probable"
          ],
          "conf": A("l11_cc", "Imposible: no hay bolitas verdes.")
        },
        {
          "preg": "Sacar <b>una bolita</b> de cualquier color es…",
          "audio": A("l11_d", "Sacar una bolita de cualquier color es…"),
          "opc": [
            "Seguro",
            "Muy probable",
            "Imposible",
            "Poco probable"
          ],
          "conf": A("l11_dc", "Seguro: todo lo que hay en la bolsa son bolitas.")
        },
        {
          "preg": "Sacar la <b>violeta</b> o sacar la <b>gris</b> es…",
          "audio": A("l11_e", "Sacar la violeta o sacar la gris es…"),
          "opc": [
            "Igualmente probable",
            "Más probable la gris",
            "Más probable la violeta",
            "Imposible"
          ],
          "conf": A("l11_ec", "Hay una de cada una: es igualmente probable.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la misión",
      "n": 10,
      "img": "portada.jpg",
      "instr": A("l12_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "SORTEO",
          "audio": A("l12_1", "Sorteo: elegir al azar.")
        },
        {
          "w": "AZAR",
          "audio": A("l12_2", "Azar: no se puede saber qué va a salir.")
        },
        {
          "w": "SEGURO",
          "audio": A("l12_3", "Seguro: probabilidad 1.")
        },
        {
          "w": "IMPOSIBLE",
          "audio": A("l12_4", "Imposible: probabilidad 0.")
        },
        {
          "w": "FRACCION",
          "audio": A("l12_5", "Fracción: casos favorables sobre casos posibles.")
        },
        {
          "w": "LUNA",
          "audio": A("l12_6", "Luna: el destino de la misión.")
        },
        {
          "w": "MISION",
          "audio": A("l12_7", "Misión: Estrella del Sur.")
        }
      ],
      "fin": A("l12_f", "¡Encontraste todas las palabras de la misión!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre1", "¡Muy bien, equipo! Terminaste la primera parte de Rumbo a la Luna. Mirá tus resultados y envialos a tu docente. En la parte 2 empieza la aventura espacial.")
    }
  ]
};
