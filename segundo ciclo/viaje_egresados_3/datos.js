/* datos.js — "El viaje de egresados" · Parte 3 · Remodelando el hotel · 7.° grado · Matemática · QueSepanTodos.com
   Elaboración propia basada en «Aventureros de la Matemática 7» (DGE Mendoza, PEAMM), págs. 59 a 62.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "El viaje de egresados",
    "corto": "El viaje de egresados 3",
    "emoji": "🧳",
    "parte": "Parte 3 · Remodelando el hotel",
    "subtitulo": "Perímetro y área: la nueva piscina, sus gráficos, el comedor, rectángulos que crecen y triángulos equiláteros",
    "grado": "7.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "hotel.jpg",
    "imgCierre": "grafico_a.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Encuestas, gráficos y decisiones: el viaje de egresados» (págs. 59 a 62) del cuadernillo «Aventureros de la Matemática 7», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Remodelando el hotel",
      "vis": {
        "t": "img",
        "src": "hotel.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("v27_1", "El hotel donde se hospedarán los egresados quiere remodelar algunos sectores para la próxima temporada."),
          "chip": "🏨 Remodelación del hotel"
        },
        {
          "audio": A("v27_2", "La piscina actual mide 14 metros de largo por 8 de ancho, y es chica para tantos huéspedes. El arquitecto evalúa nuevos diseños."),
          "chip": "🏊 Piscina de 14 m × 8 m"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La nueva piscina",
      "vis": {
        "t": "tabla",
        "id": "pc",
        "cab": [
          "Largo (m)",
          "Ancho (m)",
          "Perímetro (m)",
          "Área (m²)"
        ],
        "filas": [
          [
            "14",
            "8",
            "?",
            "?"
          ],
          [
            "15",
            "8",
            "?",
            "?"
          ],
          [
            "16",
            "8",
            "?",
            "?"
          ],
          [
            "17",
            "8",
            "?",
            "?"
          ]
        ]
      },
      "deco": "hotel.jpg",
      "pista": A("v_pi_ap", "El perímetro es la suma de los lados. El área de un rectángulo es largo por ancho."),
      "instr": A("v28_i", "El arquitecto arma una tabla: el ancho queda en 8 metros y el largo va cambiando. Completala."),
      "items": [
        {
          "preg": "Largo <b>14 m</b>: ¿perímetro y área?",
          "audio": A("v28_a", "Con 14 metros de largo, ¿cuál es el perímetro y cuál es el área?"),
          "destacar": [
            "pc_0_2",
            "pc_0_3"
          ],
          "opc": [
            "44 m y 112 m²",
            "22 m y 112 m²",
            "44 m y 22 m²",
            "36 m y 112 m²"
          ],
          "escribir": [
            {
              "id": "pc_0_2",
              "h": "44"
            },
            {
              "id": "pc_0_3",
              "h": "112"
            }
          ],
          "conf": A("v28_ac", "14 más 8, por 2: 44 metros. 14 por 8: 112 metros cuadrados.")
        },
        {
          "preg": "Largo <b>15 m</b>: ¿perímetro y área?",
          "audio": A("v28_b", "¿Y con 15 metros de largo?"),
          "destacar": [
            "pc_1_2",
            "pc_1_3"
          ],
          "opc": [
            "46 m y 120 m²",
            "45 m y 120 m²",
            "46 m y 113 m²",
            "23 m y 120 m²"
          ],
          "escribir": [
            {
              "id": "pc_1_2",
              "h": "46"
            },
            {
              "id": "pc_1_3",
              "h": "120"
            }
          ],
          "conf": A("v28_bc", "15 más 8, por 2: 46. 15 por 8: 120.")
        },
        {
          "preg": "Largos <b>16 m</b> y <b>17 m</b>: ¿perímetros?",
          "audio": A("v28_c", "¿Cuáles son los perímetros con 16 y 17 metros de largo?"),
          "destacar": [
            "pc_2_2",
            "pc_3_2"
          ],
          "opc": [
            "48 m y 50 m",
            "47 m y 48 m",
            "48 m y 52 m",
            "24 m y 25 m"
          ],
          "escribir": [
            {
              "id": "pc_2_2",
              "h": "48"
            },
            {
              "id": "pc_3_2",
              "h": "50"
            }
          ],
          "conf": A("v28_cc", "24 por 2, 48; y 25 por 2, 50 metros.")
        },
        {
          "preg": "Largos <b>16 m</b> y <b>17 m</b>: ¿áreas?",
          "audio": A("v28_d", "¿Y las áreas con 16 y 17 metros de largo?"),
          "destacar": [
            "pc_2_3",
            "pc_3_3"
          ],
          "opc": [
            "128 m² y 136 m²",
            "121 m² y 122 m²",
            "128 m² y 144 m²",
            "24 m² y 25 m²"
          ],
          "escribir": [
            {
              "id": "pc_2_3",
              "h": "128"
            },
            {
              "id": "pc_3_3",
              "h": "136"
            }
          ],
          "conf": A("v28_dc", "16 por 8, 128; 17 por 8, 136 metros cuadrados.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Cuánto aumenta?",
      "vis": {
        "t": "tabla",
        "id": "pc",
        "cab": [
          "Largo (m)",
          "Ancho (m)",
          "Perímetro (m)",
          "Área (m²)"
        ],
        "filas": [
          [
            "14",
            "8",
            "44",
            "112"
          ],
          [
            "15",
            "8",
            "46",
            "120"
          ],
          [
            "16",
            "8",
            "48",
            "128"
          ],
          [
            "17",
            "8",
            "50",
            "136"
          ]
        ]
      },
      "deco": "hotel.jpg",
      "pista": A("v_pi_ap", "El perímetro es la suma de los lados. El área de un rectángulo es largo por ancho."),
      "instr": A("v29_i", "Con la tabla completa, analicemos cómo cambian el perímetro y el área."),
      "items": [
        {
          "preg": "Cada vez que el largo aumenta 1 m, ¿cuánto aumenta el <b>perímetro</b>?",
          "audio": A("v29_a", "Cada vez que el largo aumenta 1 metro, ¿cuánto aumenta el perímetro?"),
          "opc": [
            "2 m",
            "1 m",
            "8 m",
            "4 m"
          ],
          "conf": A("v29_ac", "El largo aparece dos veces en el contorno: el perímetro aumenta 2 metros.")
        },
        {
          "preg": "¿Y cuánto aumenta el <b>área</b>?",
          "audio": A("v29_b", "¿Y cuánto aumenta el área?"),
          "opc": [
            "8 m²",
            "2 m²",
            "1 m²",
            "16 m²"
          ],
          "conf": A("v29_bc", "Se agrega una franja de 1 por 8: el área aumenta 8 metros cuadrados.")
        },
        {
          "preg": "Si el largo fuera de <b>30 m</b>, ¿cuál sería el área?",
          "audio": A("v29_c", "Si el largo fuera de 30 metros, ¿cuál sería el área?"),
          "opc": [
            "240 m²",
            "76 m²",
            "38 m²",
            "300 m²"
          ],
          "conf": A("v29_cc", "30 por 8: 240 metros cuadrados.")
        },
        {
          "preg": "¿Qué fórmula sirve para calcular el perímetro?",
          "audio": A("v29_d", "¿Qué fórmula le sirve al arquitecto para calcular el perímetro?"),
          "opc": [
            "(L + 8) · 2 = P",
            "(L · 2) + 8 = P",
            "L · 8 = P",
            "L + 8 = P"
          ],
          "conf": A("v29_dc", "Largo más ancho, por 2. La otra suma el ancho una sola vez, y L por 8 es el área.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Los gráficos del arquitecto",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "grafico_a.jpg",
            "h": 38
          },
          {
            "t": "img",
            "src": "grafico_b.jpg",
            "h": 38
          }
        ]
      },
      "pasos": [
        {
          "audio": A("v30_1", "El arquitecto hizo dos gráficos para mostrar a los dueños del hotel los posibles diseños."),
          "chip": "📈 Gráfico A y gráfico B"
        },
        {
          "audio": A("v30_2", "En el eje horizontal está el largo de la pileta. En el vertical, en un gráfico el área y en el otro el perímetro. ¿Cuál es cuál?"),
          "chip": "¿Área o perímetro?"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Gráfico A y gráfico B",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "grafico_a.jpg",
            "h": 34
          },
          {
            "t": "img",
            "src": "grafico_b.jpg",
            "h": 34
          }
        ]
      },
      "pista": A("v31_p", "Buscá en cada gráfico el valor que corresponde al largo de 14 metros, y comparalo con la tabla."),
      "instr": A("v31_i", "Observá los dos gráficos y compará con la tabla de la piscina."),
      "items": [
        {
          "preg": "¿Qué gráfico representa el <b>área</b>?",
          "audio": A("v31_a", "¿Qué gráfico representa el área de la pileta según el largo?"),
          "opc": [
            "El gráfico A",
            "El gráfico B",
            "Los dos",
            "Ninguno"
          ],
          "conf": A("v31_ac", "El gráfico A: con 14 metros de largo marca 112, el área de la tabla.")
        },
        {
          "preg": "¿Y qué gráfico representa el <b>perímetro</b>?",
          "audio": A("v31_a2", "¿Y qué gráfico representa el perímetro?"),
          "opc": [
            "El gráfico B",
            "El gráfico A",
            "Los dos",
            "Ninguno"
          ],
          "conf": A("v31_a2c", "El gráfico B: con 14 metros de largo marca 44, el perímetro de la tabla.")
        },
        {
          "preg": "¿Qué representa cada <b>punto</b> del gráfico?",
          "audio": A("v31_b", "¿Qué representa cada punto del gráfico?"),
          "opc": [
            "Un diseño: un largo y su área o perímetro",
            "Un huésped",
            "Un metro de ancho",
            "Nada"
          ],
          "conf": A("v31_bc", "Cada punto es un posible diseño de pileta: su largo y el valor que le corresponde.")
        },
        {
          "preg": "Al variar el largo, ¿qué crece <b>más rápido</b>?",
          "audio": A("v31_c", "Al variar el largo, ¿qué crece más rápido, el área o el perímetro?"),
          "opc": [
            "El área: la recta del A está más inclinada",
            "El perímetro",
            "Crecen igual",
            "Ninguno crece"
          ],
          "conf": A("v31_cc", "El área aumenta 8 por metro, y el perímetro solo 2: la recta del gráfico A sube más rápido.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El comedor del hotel",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Comedor: 10 m × 6 m → ancho al doble: 10 m × 12 m</div>"
      },
      "deco": "hotel.jpg",
      "pista": A("v_pi_ap", "El perímetro es la suma de los lados. El área de un rectángulo es largo por ancho."),
      "instr": A("v32_i", "El comedor mide 10 metros de largo y 6 de ancho. La empresa decide aumentar el ancho al doble."),
      "items": [
        {
          "preg": "¿Cuál es el área original y cuál el área nueva?",
          "audio": A("v32_a", "¿Cuál es el área original y cuál es el área nueva?"),
          "opc": [
            "60 m² y 120 m²",
            "32 m² y 44 m²",
            "60 m² y 240 m²",
            "16 m² y 22 m²"
          ],
          "conf": A("v32_ac", "10 por 6 es 60, y 10 por 12 es 120 metros cuadrados.")
        },
        {
          "preg": "¿Y los perímetros?",
          "audio": A("v32_b", "¿Y qué pasó con el perímetro?"),
          "opc": [
            "32 m y 44 m: no se duplica",
            "32 m y 64 m: se duplica",
            "60 m y 120 m",
            "16 m y 22 m"
          ],
          "conf": A("v32_bc", "10 más 6, por 2, es 32; y 10 más 12, por 2, es 44. No llega al doble.")
        },
        {
          "preg": "Al duplicar <b>una sola</b> dimensión, ¿qué pasa?",
          "audio": A("v32_c", "Al duplicar una sola dimensión, ¿qué pasa con el área y con el perímetro?"),
          "opc": [
            "El área se duplica; el perímetro aumenta menos",
            "Los dos se duplican",
            "El área se cuadruplica",
            "No cambian"
          ],
          "conf": A("v32_cc", "El área es proporcional a esa dimensión y se duplica; el perímetro solo suma lo que se agregó.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Ancho y largo al doble",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">10 m × 6 m → 20 m × 12 m</div>"
      },
      "deco": "hotel.jpg",
      "pista": A("v_pi_ap", "El perímetro es la suma de los lados. El área de un rectángulo es largo por ancho."),
      "instr": A("v33_i", "Y si la empresa decide aumentar al doble el ancho y también el largo del comedor…"),
      "items": [
        {
          "preg": "¿Qué pasa con el <b>área</b>?",
          "audio": A("v33_a", "¿Qué pasa con el área?"),
          "opc": [
            "Se cuadruplica: 240 m²",
            "Se duplica: 120 m²",
            "Se triplica: 180 m²",
            "No cambia"
          ],
          "conf": A("v33_ac", "20 por 12 es 240: cuatro veces 60.")
        },
        {
          "preg": "¿Y con el <b>perímetro</b>?",
          "audio": A("v33_b", "¿Y qué pasa con el perímetro?"),
          "opc": [
            "Se duplica: 64 m",
            "Se cuadruplica: 128 m",
            "No cambia",
            "Aumenta 2 m"
          ],
          "conf": A("v33_bc", "20 más 12, por 2: 64 metros, el doble de 32.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el rectángulo ABCD",
      "vis": {
        "t": "txt",
        "h": "Rectángulo <b>ABCD</b>: ancho <b>1 cm</b> · largo <b>2 cm</b> · perímetro <b>6 cm</b> · área <b>2 cm²</b>"
      },
      "deco": "hotel.jpg",
      "pista": A("v_pi_ap", "El perímetro es la suma de los lados. El área de un rectángulo es largo por ancho."),
      "instr": A("v34_i", "El rectángulo A B C D mide 1 centímetro de ancho y 2 de largo. Veamos qué pasa cuando cambian sus medidas."),
      "items": [
        {
          "preg": "Ancho <b>al doble</b>, largo igual (2 × 2): ¿perímetro y área?",
          "audio": A("v34_a", "Si el ancho aumenta al doble y el largo no cambia, ¿cuáles son el perímetro y el área?"),
          "opc": [
            "8 cm y 4 cm²: el área se duplica",
            "12 cm y 8 cm²",
            "8 cm y 8 cm²",
            "6 cm y 4 cm²"
          ],
          "conf": A("v34_ac", "Un cuadrado de 2 por 2: perímetro 8, área 4, el doble de 2.")
        },
        {
          "preg": "Ancho y largo <b>al doble</b> (2 × 4): ¿perímetro y área?",
          "audio": A("v34_b", "Si el ancho y el largo aumentan al doble, ¿cuáles son el perímetro y el área?"),
          "opc": [
            "12 cm (doble) y 8 cm² (cuádruple)",
            "12 cm y 4 cm²",
            "24 cm y 8 cm²",
            "8 cm y 8 cm²"
          ],
          "conf": A("v34_bc", "2 por 4: perímetro 12, el doble; área 8, el cuádruple.")
        },
        {
          "preg": "Ancho y largo <b>al cuádruple</b> (4 × 8): ¿qué pasa?",
          "audio": A("v34_c", "Si el ancho y el largo aumentan al cuádruple, ¿qué pasa?"),
          "opc": [
            "El perímetro ×4 (24 cm) y el área ×16 (32 cm²)",
            "Los dos ×4",
            "Los dos ×16",
            "El perímetro ×16 y el área ×4"
          ],
          "conf": A("v34_cc", "4 por 8: perímetro 24, cuatro veces 6; área 32, dieciséis veces 2.")
        },
        {
          "preg": "¿Cómo lograr que el área sea <b>tres veces</b> mayor?",
          "audio": A("v34_d", "¿Cómo se logra que el área sea tres veces mayor?"),
          "opc": [
            "Triplicando una sola dimensión",
            "Triplicando las dos",
            "Sumando 3 cm a cada lado",
            "Es imposible"
          ],
          "conf": A("v34_dc", "Por ejemplo 3 por 2: área 6, el triple de 2.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la mitad del perímetro",
      "vis": {
        "t": "txt",
        "h": "Rectángulo <b>ABCD</b>: ancho <b>1 cm</b> · largo <b>2 cm</b> · perímetro <b>6 cm</b> · área <b>2 cm²</b>"
      },
      "deco": "hotel.jpg",
      "pista": A("v_pi_ap", "El perímetro es la suma de los lados. El área de un rectángulo es largo por ancho."),
      "instr": A("v35_i", "Buscamos otro rectángulo cuyo perímetro sea la mitad del de A B C D."),
      "items": [
        {
          "preg": "¿Qué rectángulo tiene <b>3 cm</b> de perímetro?",
          "audio": A("v35_a", "¿Qué rectángulo tiene 3 centímetros de perímetro, la mitad de 6?"),
          "opc": [
            "0,5 cm × 1 cm",
            "1 cm × 1 cm",
            "1 cm × 2 cm",
            "1,5 cm × 1,5 cm"
          ],
          "conf": A("v35_ac", "0,5 más 1, por 2: 3 centímetros.")
        },
        {
          "preg": "¿Tiene la <b>mitad del área</b> del original?",
          "audio": A("v35_b", "¿Ese rectángulo tiene la mitad del área del original?"),
          "opc": [
            "No: tiene 0,5 cm², la cuarta parte",
            "Sí: tiene 1 cm²",
            "Sí: tiene la mitad",
            "No: tiene el doble"
          ],
          "conf": A("v35_bc", "0,5 por 1 es 0,5: la cuarta parte de 2, no la mitad.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: triángulos equiláteros",
      "vis": {
        "t": "tabla",
        "id": "tr",
        "cab": [
          "Triángulo",
          "ABC",
          "MNP",
          "RST",
          "DEF",
          "GHI"
        ],
        "filas": [
          [
            "Lado (cm)",
            "1",
            "2",
            "4",
            "6",
            "12"
          ],
          [
            "Perímetro (cm)",
            "?",
            "?",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "hotel.jpg",
      "pista": A("v36_p", "Un triángulo equilátero tiene sus tres lados iguales: el perímetro es 3 por el lado."),
      "instr": A("v36_i", "Calculá el perímetro de estos triángulos equiláteros."),
      "items": [
        {
          "preg": "¿Perímetros de ABC, MNP y RST?",
          "audio": A("v36_a", "¿Cuáles son los perímetros de A B C, M N P y R S T?"),
          "destacar": [
            "tr_1_1",
            "tr_1_2",
            "tr_1_3"
          ],
          "opc": [
            "3, 6 y 12 cm",
            "1, 2 y 4 cm",
            "3, 5 y 7 cm",
            "4, 8 y 16 cm"
          ],
          "escribir": [
            {
              "id": "tr_1_1",
              "h": "3"
            },
            {
              "id": "tr_1_2",
              "h": "6"
            },
            {
              "id": "tr_1_3",
              "h": "12"
            }
          ],
          "conf": A("v36_ac", "3 por 1, 3; 3 por 2, 6; 3 por 4, 12.")
        },
        {
          "preg": "¿Perímetros de DEF y GHI?",
          "audio": A("v36_b", "¿Y los de D E F y G H I?"),
          "destacar": [
            "tr_1_4",
            "tr_1_5"
          ],
          "opc": [
            "18 y 36 cm",
            "9 y 15 cm",
            "12 y 24 cm",
            "18 y 24 cm"
          ],
          "escribir": [
            {
              "id": "tr_1_4",
              "h": "18"
            },
            {
              "id": "tr_1_5",
              "h": "36"
            }
          ],
          "conf": A("v36_bc", "3 por 6, 18; 3 por 12, 36.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Lado y perímetro",
      "vis": {
        "t": "tabla",
        "id": "tr",
        "cab": [
          "Triángulo",
          "ABC",
          "MNP",
          "RST",
          "DEF",
          "GHI"
        ],
        "filas": [
          [
            "Lado (cm)",
            "1",
            "2",
            "4",
            "6",
            "12"
          ],
          [
            "Perímetro (cm)",
            "3",
            "6",
            "12",
            "18",
            "36"
          ]
        ]
      },
      "deco": "hotel.jpg",
      "pista": A("v37_p", "Fijate si el cociente entre el perímetro y el lado es siempre el mismo."),
      "instr": A("v37_i", "Comparemos las medidas de los lados y los perímetros."),
      "items": [
        {
          "preg": "De RST (4 cm) a GHI (12 cm), el lado se triplica. ¿Y el perímetro?",
          "audio": A("v37_a", "De R S T a G H I el lado se triplica. ¿Qué pasa con el perímetro?"),
          "opc": [
            "También se triplica: de 12 a 36",
            "Se duplica",
            "Se multiplica por 9",
            "No cambia"
          ],
          "conf": A("v37_ac", "De 12 a 36: también se triplica.")
        },
        {
          "preg": "¿Hay proporcionalidad directa entre el lado y el perímetro?",
          "audio": A("v37_b", "¿Existe una proporcionalidad directa entre el lado de un triángulo equilátero y su perímetro?"),
          "opc": [
            "Sí: la constante es 3",
            "No",
            "Sí, pero inversa",
            "Solo en algunos triángulos"
          ],
          "conf": A("v37_bc", "Perímetro dividido lado da siempre 3: es directa.")
        },
        {
          "preg": "En un <b>cuadrado</b>, si se duplica el lado, ¿qué pasa con el perímetro?",
          "audio": A("v37_c", "En un cuadrado, si se duplica el lado, ¿qué pasa con el perímetro?"),
          "opc": [
            "Se duplica: constante 4",
            "Se cuadruplica",
            "Aumenta 4 cm",
            "No cambia"
          ],
          "conf": A("v37_cc", "El perímetro del cuadrado es 4 por el lado: también es proporcionalidad directa.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del hotel",
      "n": 11,
      "img": "hotel.jpg",
      "instr": A("v38_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "PISCINA",
          "audio": A("v38_1", "Piscina: la que se va a agrandar.")
        },
        {
          "w": "LARGO",
          "audio": A("v38_2", "Largo: la medida que va cambiando.")
        },
        {
          "w": "ANCHO",
          "audio": A("v38_3", "Ancho: 8 metros.")
        },
        {
          "w": "AREA",
          "audio": A("v38_4", "Área: crece 8 por cada metro.")
        },
        {
          "w": "FORMULA",
          "audio": A("v38_5", "Fórmula: largo más ancho, por 2.")
        },
        {
          "w": "COMEDOR",
          "audio": A("v38_6", "Comedor: 10 por 6 metros.")
        },
        {
          "w": "HOTEL",
          "audio": A("v38_7", "Hotel: donde se hospedan los egresados.")
        }
      ],
      "fin": A("v38_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre3", "¡Felicitaciones! Terminaste «El viaje de egresados». Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
