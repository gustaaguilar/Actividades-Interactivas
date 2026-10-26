/* datos.js — "Una remera, miles de recuerdos" · Parte 1 · Diseño y producción de las remeras · 7.° grado · Matemática · QueSepanTodos.com
   Elaboración propia basada en «Aventureros de la Matemática 7» (DGE Mendoza, PEAMM), págs. 35 a 41.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Una remera, miles de recuerdos",
    "corto": "Una remera, miles de recuerdos 1",
    "emoji": "👕",
    "parte": "Parte 1 · Diseño y producción de las remeras",
    "subtitulo": "Proporcionalidad directa e inversa con las remeras de la promoción: cuotas, logo, tela, tablas, gráficos y fórmulas",
    "grado": "7.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "promo.jpg",
    "imgCierre": "remera.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Una remera, miles de recuerdos» (págs. 35 a 41) del cuadernillo «Aventureros de la Matemática 7», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Una remera, miles de recuerdos",
      "vis": {
        "t": "img",
        "src": "promo.jpg",
        "h": 38
      },
      "pasos": [
        {
          "audio": A("r01_1", "La promoción de séptimo se prepara para uno de los momentos más esperados del año: la presentación de las remeras."),
          "chip": "👕 La presentación de las remeras"
        },
        {
          "audio": A("r01_2", "Van a entrar con una coreografía, música y banderas. Y para organizar todo, ¡van a necesitar mucha matemática!"),
          "chip": "🎶 Coreografía, música y banderas"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El costo de las remeras",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "remera.jpg",
            "h": 22
          },
          {
            "t": "txt",
            "h": "Total de las remeras: <b>$1.260.000</b>"
          },
          {
            "t": "tabla",
            "id": "cu",
            "cab": [
              "Alumnos",
              "15",
              "20",
              "30"
            ],
            "filas": [
              [
                "Cuota ($)",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("r_pi_inv", "En la proporcionalidad inversa, si una cantidad se duplica, la otra se reduce a la mitad; el producto entre ellas es constante."),
      "instr": A("r02_i", "Una fábrica cobra 1260000 pesos en total por las remeras. Lo que paga cada uno depende de cuántos alumnos las compren."),
      "items": [
        {
          "preg": "Si compran <b>15</b> alumnos, ¿cuánto paga cada uno?",
          "audio": A("r02_a", "Si compran 15 alumnos, ¿cuánto paga cada uno?"),
          "destacar": [
            "cu_0_1"
          ],
          "opc": [
            "$84.000",
            "$63.000",
            "$42.000",
            "$126.000"
          ],
          "escribir": [
            {
              "id": "cu_0_1",
              "h": "84.000"
            }
          ],
          "conf": A("r02_ac", "1260000 dividido 15 es 84000 pesos.")
        },
        {
          "preg": "¿Y si son <b>20</b>? ¿Y si son <b>30</b>?",
          "audio": A("r02_b", "¿Y si son 20 alumnos? ¿Y si son 30?"),
          "destacar": [
            "cu_0_2",
            "cu_0_3"
          ],
          "opc": [
            "$63.000 y $42.000",
            "$63.000 y $21.000",
            "$42.000 y $63.000",
            "$84.000 y $42.000"
          ],
          "escribir": [
            {
              "id": "cu_0_2",
              "h": "63.000"
            },
            {
              "id": "cu_0_3",
              "h": "42.000"
            }
          ],
          "conf": A("r02_bc", "1260000 dividido 20 es 63000, y dividido 30 es 42000.")
        },
        {
          "preg": "Si se <b>duplica</b> la cantidad de alumnos, ¿qué pasa con lo que paga cada uno?",
          "audio": A("r02_c", "Si se duplica la cantidad de alumnos, ¿qué pasa con lo que paga cada uno?"),
          "opc": [
            "Se reduce a la mitad",
            "Se duplica",
            "No cambia",
            "Se reduce a la cuarta parte"
          ],
          "conf": A("r02_cc", "De 15 a 30 alumnos, la cuota pasa de 84000 a 42000: se reduce a la mitad.")
        },
        {
          "preg": "¿Qué valor permanece <b>constante</b>? ¿Qué relación es?",
          "audio": A("r02_d", "¿Qué valor permanece constante? ¿Qué tipo de relación es?"),
          "opc": [
            "El total, $1.260.000: proporcionalidad inversa",
            "La cuota: proporcionalidad directa",
            "La cantidad de alumnos",
            "No hay relación"
          ],
          "conf": A("r02_dc", "Alumnos por cuota siempre da 1260000. Es una proporcionalidad inversa.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "¿Directa o inversa?",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "remera.jpg",
            "h": 24
          },
          {
            "t": "txt",
            "h": "<b>Directa:</b> 1 → 0,80 · 2 → 1,60 · 4 → 3,20 (el cociente no cambia)<br><b>Inversa:</b> 15 → 84.000 · 30 → 42.000 (el producto no cambia)"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("r02n_1", "Dos cantidades son directamente proporcionales cuando, si una se duplica o se triplica, la otra también. El cociente entre ellas es siempre el mismo."),
          "chip": "↗️ Directa: cociente constante"
        },
        {
          "audio": A("r02n_2", "Son inversamente proporcionales cuando, si una se duplica, la otra se reduce a la mitad. Lo que se mantiene es el producto."),
          "chip": "↘️ Inversa: producto constante"
        },
        {
          "audio": A("r02n_3", "Ese valor que no cambia se llama constante de proporcionalidad. ¡Vamos a buscarlo en cada problema!"),
          "chip": "🔑 La constante de proporcionalidad"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El recuadro del logo",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "remera.jpg",
            "h": 20
          },
          {
            "t": "txt",
            "h": "Área del logo: siempre <b>600 cm²</b>"
          },
          {
            "t": "tabla",
            "id": "lg",
            "cab": [
              "Alto (cm)",
              "10",
              "20",
              "30",
              "40"
            ],
            "filas": [
              [
                "Ancho (cm)",
                "?",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("r_pi_inv", "En la proporcionalidad inversa, si una cantidad se duplica, la otra se reduce a la mitad; el producto entre ellas es constante."),
      "instr": A("r03_i", "El recuadro del logo debe tener siempre un área de 600 centímetros cuadrados. Completá la tabla de alto y ancho."),
      "items": [
        {
          "preg": "Alto 10 cm y alto 20 cm: ¿cuánto mide el ancho?",
          "audio": A("r03_a", "Si el alto es 10 centímetros, ¿cuánto mide el ancho? ¿Y si es 20?"),
          "destacar": [
            "lg_0_1",
            "lg_0_2"
          ],
          "opc": [
            "60 cm y 30 cm",
            "60 cm y 120 cm",
            "590 cm y 580 cm",
            "30 cm y 60 cm"
          ],
          "escribir": [
            {
              "id": "lg_0_1",
              "h": "60"
            },
            {
              "id": "lg_0_2",
              "h": "30"
            }
          ],
          "conf": A("r03_ac", "600 dividido 10 es 60, y 600 dividido 20 es 30.")
        },
        {
          "preg": "Alto 30 cm y alto 40 cm: ¿cuánto mide el ancho?",
          "audio": A("r03_b", "¿Y si el alto es 30 o 40 centímetros?"),
          "destacar": [
            "lg_0_3",
            "lg_0_4"
          ],
          "opc": [
            "20 cm y 15 cm",
            "20 cm y 10 cm",
            "30 cm y 40 cm",
            "18 cm y 15 cm"
          ],
          "escribir": [
            {
              "id": "lg_0_3",
              "h": "20"
            },
            {
              "id": "lg_0_4",
              "h": "15"
            }
          ],
          "conf": A("r03_bc", "600 dividido 30 es 20, y 600 dividido 40 es 15.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Analizamos el logo",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "remera.jpg",
            "h": 20
          },
          {
            "t": "txt",
            "h": "Área del logo: siempre <b>600 cm²</b>"
          },
          {
            "t": "tabla",
            "id": "lg",
            "cab": [
              "Alto (cm)",
              "10",
              "20",
              "30",
              "40"
            ],
            "filas": [
              [
                "Ancho (cm)",
                "60",
                "30",
                "20",
                "15"
              ]
            ]
          }
        ]
      },
      "pista": A("r_pi_inv", "En la proporcionalidad inversa, si una cantidad se duplica, la otra se reduce a la mitad; el producto entre ellas es constante."),
      "instr": A("r03b_i", "Con la tabla completa, analicemos la relación entre el alto y el ancho del logo."),
      "items": [
        {
          "preg": "Si se <b>triplica</b> el alto, ¿qué pasa con el ancho?",
          "audio": A("r03_c", "Si se triplica el alto, ¿qué pasa con el ancho?"),
          "opc": [
            "Se reduce a la tercera parte",
            "Se triplica",
            "Se reduce a la mitad",
            "No cambia"
          ],
          "conf": A("r03_cc", "De 10 a 30 de alto, el ancho pasa de 60 a 20: la tercera parte. Es proporcionalidad inversa, con constante 600.")
        },
        {
          "vis": {
            "t": "plano",
            "id": "pl",
            "titulo": "Alto y ancho del logo",
            "xmax": 70,
            "ymax": 70,
            "xpaso": 10,
            "ypaso": 10,
            "xlab": "Alto (cm)",
            "ylab": "Ancho (cm)",
            "h": 30,
            "pts": [
              [
                10,
                60
              ],
              [
                20,
                30
              ],
              [
                30,
                20
              ],
              [
                40,
                15
              ],
              [
                50,
                12
              ],
              [
                60,
                10
              ]
            ],
            "color": "#db2777"
          },
          "preg": "¿Cómo es el gráfico de esta relación?",
          "audio": A("r03_d", "Mirá el gráfico. ¿Cómo es la relación entre el alto y el ancho?"),
          "opc": [
            "Una curva que baja: a más alto, menos ancho",
            "Una recta que sube desde el 0",
            "Una recta horizontal",
            "Puntos sin orden"
          ],
          "conf": A("r03_dc", "Los puntos forman una curva que baja: es el gráfico de una proporcionalidad inversa.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La tela de las remeras",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "remera.jpg",
            "h": 18
          },
          {
            "t": "tabla",
            "id": "tl",
            "cab": [
              "Remeras",
              "1",
              "5",
              "10",
              "20",
              "30"
            ],
            "filas": [
              [
                "Tela (m)",
                "0,80",
                "?",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("r_pi_dir", "En la proporcionalidad directa, si una cantidad se duplica, la otra también; el cociente entre ellas es constante."),
      "instr": A("r04_i", "Para cada remera se usan 0,80 metros de tela. Completá la tabla."),
      "items": [
        {
          "preg": "¿Cuánta tela para <b>5</b> y para <b>10</b> remeras?",
          "audio": A("r04_a", "¿Cuánta tela hace falta para 5 remeras? ¿Y para 10?"),
          "destacar": [
            "tl_0_2",
            "tl_0_3"
          ],
          "opc": [
            "4 m y 8 m",
            "5,8 m y 10,8 m",
            "0,4 m y 0,8 m",
            "40 m y 80 m"
          ],
          "escribir": [
            {
              "id": "tl_0_2",
              "h": "4"
            },
            {
              "id": "tl_0_3",
              "h": "8"
            }
          ],
          "conf": A("r04_ac", "5 por 0,80 es 4 metros, y 10 por 0,80 es 8 metros.")
        },
        {
          "preg": "¿Y para <b>20</b> y <b>30</b> remeras?",
          "audio": A("r04_b", "¿Y para 20 y 30 remeras?"),
          "destacar": [
            "tl_0_4",
            "tl_0_5"
          ],
          "opc": [
            "16 m y 24 m",
            "16 m y 32 m",
            "20,8 m y 30,8 m",
            "1,6 m y 2,4 m"
          ],
          "escribir": [
            {
              "id": "tl_0_4",
              "h": "16"
            },
            {
              "id": "tl_0_5",
              "h": "24"
            }
          ],
          "conf": A("r04_bc", "20 por 0,80 es 16, y 30 por 0,80 es 24 metros.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La fórmula de la tela",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "remera.jpg",
            "h": 18
          },
          {
            "t": "tabla",
            "id": "tl",
            "cab": [
              "Remeras",
              "1",
              "5",
              "10",
              "20",
              "30"
            ],
            "filas": [
              [
                "Tela (m)",
                "0,80",
                "4",
                "8",
                "16",
                "24"
              ]
            ]
          }
        ]
      },
      "pista": A("r_pi_dir", "En la proporcionalidad directa, si una cantidad se duplica, la otra también; el cociente entre ellas es constante."),
      "instr": A("r04b_i", "Con la tabla completa, busquemos la fórmula y miremos el gráfico."),
      "items": [
        {
          "preg": "¿Qué tipo de relación es y cuál es la fórmula?",
          "audio": A("r04_c", "¿Qué tipo de relación es, y cuál es la fórmula para cualquier cantidad de remeras?"),
          "opc": [
            "Directa: T = 0,80 · R",
            "Inversa: T = 0,80 : R",
            "Directa: T = R + 0,80",
            "No es proporcional"
          ],
          "conf": A("r04_cc", "Es proporcionalidad directa, con constante 0,80. La tela es 0,80 por la cantidad de remeras.")
        },
        {
          "vis": {
            "t": "plano",
            "id": "pt",
            "titulo": "Tela según las remeras",
            "xmax": 30,
            "ymax": 25,
            "xpaso": 5,
            "ypaso": 5,
            "xlab": "Remeras",
            "ylab": "Tela (m)",
            "h": 30,
            "linea": true,
            "pts": [
              [
                0,
                0
              ],
              [
                5,
                4
              ],
              [
                10,
                8
              ],
              [
                20,
                16
              ],
              [
                30,
                24
              ]
            ],
            "color": "#16a34a"
          },
          "preg": "¿Cómo es el gráfico de esta relación?",
          "audio": A("r04_d", "Mirá el gráfico. ¿Cómo es?"),
          "opc": [
            "Una recta que pasa por el 0",
            "Una curva que baja",
            "Una recta que no pasa por el 0",
            "Una línea horizontal"
          ],
          "conf": A("r04_dc", "La proporcionalidad directa se representa con una recta que pasa por el origen.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el riego por goteo",
      "vis": {
        "t": "tabla",
        "id": "rg",
        "cab": [
          "Tiempo (h)",
          "¼",
          "½",
          "1",
          "2",
          "3"
        ],
        "filas": [
          [
            "Agua (l)",
            "2,5",
            "?",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "promo.jpg",
      "pista": A("r_pi_dir", "En la proporcionalidad directa, si una cantidad se duplica, la otra también; el cociente entre ellas es constante."),
      "instr": A("r05_i", "Un sistema de riego por goteo consume 2,5 litros cada cuarto de hora. Completá la tabla."),
      "items": [
        {
          "preg": "½ hora y 1 hora: ¿cuántos litros?",
          "audio": A("r05_a", "¿Cuántos litros se consumen en media hora? ¿Y en una hora?"),
          "destacar": [
            "rg_0_2",
            "rg_0_3"
          ],
          "opc": [
            "5 l y 10 l",
            "5 l y 7,5 l",
            "2,5 l y 5 l",
            "10 l y 20 l"
          ],
          "escribir": [
            {
              "id": "rg_0_2",
              "h": "5"
            },
            {
              "id": "rg_0_3",
              "h": "10"
            }
          ],
          "conf": A("r05_ac", "Media hora son dos cuartos: 5 litros. Una hora son cuatro cuartos: 10 litros.")
        },
        {
          "preg": "2 horas y 3 horas: ¿cuántos litros?",
          "audio": A("r05_b", "¿Y en 2 horas y en 3 horas?"),
          "destacar": [
            "rg_0_4",
            "rg_0_5"
          ],
          "opc": [
            "20 l y 30 l",
            "12,5 l y 15 l",
            "5 l y 7,5 l",
            "20 l y 25 l"
          ],
          "escribir": [
            {
              "id": "rg_0_4",
              "h": "20"
            },
            {
              "id": "rg_0_5",
              "h": "30"
            }
          ],
          "conf": A("r05_bc", "10 litros por hora: 20 y 30 litros.")
        },
        {
          "preg": "¿Cuál es la constante y la fórmula?",
          "audio": A("r05_c", "¿Cuál es la constante de proporcionalidad, y la fórmula de los litros según las horas?"),
          "opc": [
            "10 litros por hora: L = 10 · h",
            "2,5 litros por hora: L = 2,5 · h",
            "4 litros por hora: L = 4 · h",
            "No hay constante"
          ],
          "conf": A("r05_cc", "Es una proporcionalidad directa con constante 10: litros igual a 10 por las horas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el camión de aceitunas",
      "vis": {
        "t": "tabla",
        "id": "cm",
        "cab": [
          "Velocidad (km/h)",
          "60",
          "30",
          "50",
          "75",
          "100"
        ],
        "filas": [
          [
            "Tiempo (h)",
            "3,5",
            "?",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "promo.jpg",
      "pista": A("r_pi_inv", "En la proporcionalidad inversa, si una cantidad se duplica, la otra se reduce a la mitad; el producto entre ellas es constante."),
      "instr": A("r06_i", "Un camión tarda 3,5 horas a 60 kilómetros por hora. ¿Cuánto tardaría con otras velocidades?"),
      "items": [
        {
          "preg": "¿Cuántos km recorre en total?",
          "audio": A("r06_a", "¿Cuántos kilómetros recorre en total el camión?"),
          "opc": [
            "210 km",
            "63,5 km",
            "17 km",
            "120 km"
          ],
          "conf": A("r06_ac", "60 por 3,5 es 210 kilómetros: esa es la constante.")
        },
        {
          "preg": "A <b>30 km/h</b> y a <b>50 km/h</b>, ¿cuánto tarda?",
          "audio": A("r06_b", "A 30 kilómetros por hora y a 50, ¿cuánto tarda?"),
          "destacar": [
            "cm_0_2",
            "cm_0_3"
          ],
          "opc": [
            "7 h y 4,2 h",
            "1,75 h y 3 h",
            "7 h y 5 h",
            "6 h y 4 h"
          ],
          "escribir": [
            {
              "id": "cm_0_2",
              "h": "7"
            },
            {
              "id": "cm_0_3",
              "h": "4,2"
            }
          ],
          "conf": A("r06_bc", "210 dividido 30 es 7 horas, y 210 dividido 50 es 4,2 horas.")
        },
        {
          "preg": "A <b>75 km/h</b> y a <b>100 km/h</b>, ¿cuánto tarda?",
          "audio": A("r06_c", "¿Y a 75 y a 100 kilómetros por hora?"),
          "destacar": [
            "cm_0_4",
            "cm_0_5"
          ],
          "opc": [
            "2,8 h y 2,1 h",
            "2,5 h y 2 h",
            "4,4 h y 5,8 h",
            "3 h y 2 h"
          ],
          "escribir": [
            {
              "id": "cm_0_4",
              "h": "2,8"
            },
            {
              "id": "cm_0_5",
              "h": "2,1"
            }
          ],
          "conf": A("r06_cc", "210 dividido 75 es 2,8, y dividido 100 es 2,1 horas. Es inversa: tiempo igual a 210 dividido la velocidad.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la mermelada",
      "vis": {
        "t": "img",
        "src": "mermelada.jpg",
        "h": 34
      },
      "pista": A("r07_p", "Leé en el gráfico cuánto azúcar corresponde a 8 kilos de durazno."),
      "instr": A("r07_i", "Mirá el gráfico de la relación entre el durazno y el azúcar para hacer mermelada."),
      "items": [
        {
          "preg": "¿Cuál es la variable <b>independiente</b>?",
          "audio": A("r07_a", "¿Cuál es la variable independiente?"),
          "opc": [
            "Los kilos de durazno",
            "Los kilos de azúcar",
            "El tiempo",
            "El precio"
          ],
          "conf": A("r07_ac", "Los kilos de durazno, en el eje horizontal. El azúcar depende de ellos.")
        },
        {
          "preg": "Un estudiante dice que para <b>8 kg de durazno</b> hacen falta <b>8 kg de azúcar</b>. ¿Tiene razón?",
          "audio": A("r07_b", "Un estudiante dice que para 8 kilos de durazno hacen falta 8 kilos de azúcar. ¿Tiene razón?"),
          "opc": [
            "No: hacen falta 4 kg",
            "Sí: 8 kg",
            "No: hacen falta 2 kg",
            "No: hacen falta 16 kg"
          ],
          "conf": A("r07_bc", "En el gráfico, 8 kilos de durazno corresponden a 4 kilos de azúcar.")
        },
        {
          "preg": "¿Qué relación es y cuál es la fórmula?",
          "audio": A("r07_c", "¿Qué tipo de relación es, y cuál es la fórmula?"),
          "opc": [
            "Directa: azúcar = 0,5 · durazno",
            "Inversa: azúcar = 4 : durazno",
            "Directa: azúcar = 2 · durazno",
            "No es proporcional"
          ],
          "conf": A("r07_cc", "Es una recta que pasa por el origen: proporcionalidad directa con constante 0,5.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el jugo del viaje",
      "vis": {
        "t": "tabla",
        "id": "vs",
        "cab": [
          "Vaso (l)",
          "0,2",
          "¼",
          "0,5"
        ],
        "filas": [
          [
            "Vasos para 96 l",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "promo.jpg",
      "pista": A("r_pi_inv", "En la proporcionalidad inversa, si una cantidad se duplica, la otra se reduce a la mitad; el producto entre ellas es constante."),
      "instr": A("r08_i", "En el colectivo llevan 96 litros de jugo. ¿Cuántos vasos se llenan según la capacidad de cada vaso?"),
      "items": [
        {
          "preg": "Vasos de <b>0,2 l</b> y de <b>¼ l</b>",
          "audio": A("r08_a", "¿Cuántos vasos de 0,2 litros se llenan? ¿Y de un cuarto de litro?"),
          "destacar": [
            "vs_0_1",
            "vs_0_2"
          ],
          "opc": [
            "480 y 384",
            "19,2 y 24",
            "480 y 240",
            "96 y 48"
          ],
          "escribir": [
            {
              "id": "vs_0_1",
              "h": "480"
            },
            {
              "id": "vs_0_2",
              "h": "384"
            }
          ],
          "conf": A("r08_ac", "96 dividido 0,2 es 480, y 96 dividido 0,25 es 384.")
        },
        {
          "preg": "Vasos de <b>0,5 l</b>, y la constante",
          "audio": A("r08_b", "¿Y vasos de medio litro? ¿Cuál es la constante?"),
          "destacar": [
            "vs_0_3"
          ],
          "opc": [
            "192 vasos; constante 96",
            "48 vasos; constante 96",
            "192 vasos; constante 0,5",
            "96 vasos; constante 2"
          ],
          "escribir": [
            {
              "id": "vs_0_3",
              "h": "192"
            }
          ],
          "conf": A("r08_bc", "192 vasos. Capacidad por cantidad de vasos siempre da 96: proporcionalidad inversa.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Pensamos la proporcionalidad inversa",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Inversa: el producto es constante</div>"
      },
      "deco": "promo.jpg",
      "pista": A("r_pi_inv", "En la proporcionalidad inversa, si una cantidad se duplica, la otra se reduce a la mitad; el producto entre ellas es constante."),
      "instr": A("r08b_i", "Dos preguntas para pensar la proporcionalidad inversa."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">2 y 90 · proporcionalidad inversa</div>"
          },
          "preg": "Entre <b>2</b> y <b>90</b> hay proporcionalidad inversa. ¿Cuál es la constante?",
          "audio": A("r08_c", "Entre 2 y 90 hay proporcionalidad inversa. ¿Cuál es la constante?"),
          "opc": [
            "180",
            "45",
            "4",
            "50"
          ],
          "conf": A("r08_cc", "En la inversa, la constante es el producto: 2 por 90, 180.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">A la mitad de una cantidad le corresponde…</div>"
          },
          "preg": "En una relación <b>inversamente</b> proporcional, a la mitad de una cantidad le corresponde…",
          "audio": A("r08_d", "En una relación inversamente proporcional, a la mitad de una cantidad le corresponde…"),
          "opc": [
            "el doble de la otra",
            "la mitad de la otra",
            "la misma cantidad",
            "la inversa de la otra"
          ],
          "conf": A("r08_dc", "El doble: si una se achica a la mitad, la otra se duplica.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la proporcionalidad",
      "n": 11,
      "img": "remera.jpg",
      "instr": A("r09_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "DIRECTA",
          "audio": A("r09_1", "Directa: si una se duplica, la otra también.")
        },
        {
          "w": "INVERSA",
          "audio": A("r09_2", "Inversa: si una se duplica, la otra se reduce a la mitad.")
        },
        {
          "w": "CONSTANTE",
          "audio": A("r09_3", "Constante: el valor que no cambia.")
        },
        {
          "w": "FORMULA",
          "audio": A("r09_4", "Fórmula: como tela igual a 0,80 por remeras.")
        },
        {
          "w": "TABLA",
          "audio": A("r09_5", "Tabla: organiza los valores.")
        },
        {
          "w": "GRAFICO",
          "audio": A("r09_6", "Gráfico: recta o curva en el plano.")
        },
        {
          "w": "REMERA",
          "audio": A("r09_7", "Remera: el recuerdo de la promoción.")
        }
      ],
      "fin": A("r09_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre1", "¡Muy bien! Terminaste la primera parte. Mirá tus resultados y envialos a tu docente. En la parte 2 diseñamos la bandera.")
    }
  ]
};
