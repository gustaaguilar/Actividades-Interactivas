/* datos.js — "Torneo Saludable" · Parte 3 · Medidas, hidratación y merienda · 3er grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 3 (DGE Mendoza), págs. 67 a 74.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Torneo Saludable",
    "grado": "3er grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "corto": "Torneo Saludable 3",
    "parte": "Parte 3 · Medidas, hidratación y merienda",
    "subtitulo": "Milímetros, centímetros y metros; litros y mililitros; kilos y gramos; y la cancha en papel con regla, compás y escuadra",
    "imgPortada": "licuado.jpg",
    "imgCierre": "cancha.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Torneo Saludable» (págs. 67 a 74) del cuadernillo «Aventureros de la Matemática 3», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Milímetros, centímetros y metros",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "pulsera.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "id": "eq",
            "cls": "grande",
            "h": "10 mm = 1 cm · 100 cm = 1 m · 1.000 mm = 1 m"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("t25_1", "Los chicos quieren usar pulseras de cinta verde para identificarse. Cada pulsera mide 250 milímetros."),
          "chip": "🎗️ Pulsera: 250 mm"
        },
        {
          "audio": A("t25_2", "Recordemos: 10 milímetros forman 1 centímetro, y 100 centímetros forman 1 metro. Entonces, 1 metro tiene 1000 milímetros."),
          "destacar": [
            "eq"
          ],
          "apuntar": "eq",
          "chip": "10 mm = 1 cm · 100 cm = 1 m"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las pulseras",
      "vis": {
        "t": "tabla",
        "id": "mc",
        "cab": [
          "Milímetros",
          "10",
          "20",
          "30",
          "?",
          "100",
          "?"
        ],
        "filas": [
          [
            "Centímetros",
            "?",
            "2",
            "?",
            "5",
            "?",
            "20"
          ]
        ]
      },
      "deco": "pulsera.jpg",
      "pista": A("pi_medida", "Acordate: 1 metro tiene 100 centímetros, y 1 centímetro tiene 10 milímetros."),
      "instr": A("t26_i", "Lucas empezó una tabla de milímetros y centímetros. Completala."),
      "items": [
        {
          "preg": "10 mm y 30 mm: ¿cuántos centímetros son?",
          "audio": A("t26_a", "10 milímetros y 30 milímetros: ¿cuántos centímetros son?"),
          "destacar": [
            "mc_0_1",
            "mc_0_3"
          ],
          "opc": [
            "1 cm y 3 cm",
            "10 cm y 30 cm",
            "100 cm y 300 cm",
            "1 cm y 30 cm"
          ],
          "escribir": [
            {
              "id": "mc_0_1",
              "h": "1"
            },
            {
              "id": "mc_0_3",
              "h": "3"
            }
          ],
          "conf": A("t26_ac", "Cada 10 milímetros es 1 centímetro: 1 y 3.")
        },
        {
          "preg": "5 cm y 20 cm: ¿cuántos milímetros son?",
          "audio": A("t26_b", "5 centímetros y 20 centímetros: ¿cuántos milímetros son?"),
          "opc": [
            "50 mm y 200 mm",
            "5 mm y 20 mm",
            "500 mm y 2.000 mm",
            "15 mm y 30 mm"
          ],
          "escribir": [
            {
              "id": "mc_h4",
              "h": "50"
            },
            {
              "id": "mc_h6",
              "h": "200"
            }
          ],
          "conf": A("t26_bc", "Cada centímetro tiene 10 milímetros: 50 y 200.")
        },
        {
          "preg": "Cada pulsera mide <b>250 mm</b>. ¿Cuántos centímetros son?",
          "audio": A("t26_c", "Cada pulsera mide 250 milímetros. ¿Cuántos centímetros son?"),
          "opc": [
            "25 cm",
            "250 cm",
            "2 cm",
            "50 cm"
          ],
          "escribir": [
            {
              "id": "mc_0_5",
              "h": "10"
            }
          ],
          "conf": A("t26_cc", "250 milímetros son 25 centímetros. En la tabla también completamos: 100 milímetros son 10 centímetros.")
        },
        {
          "preg": "¿Cuántas pulseras de <b>25 cm</b> salen de <b>1 metro</b> de cinta?",
          "audio": A("t26_d", "¿Cuántas pulseras de 25 centímetros salen de 1 metro de cinta?"),
          "opc": [
            "4",
            "25",
            "10",
            "2"
          ],
          "conf": A("t26_dc", "25, 50, 75, 100: salen 4 pulseras.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: ¿cuánto puede medir?",
      "deco": "papa_lucas.jpg",
      "pista": A("pi_medida", "Acordate: 1 metro tiene 100 centímetros, y 1 centímetro tiene 10 milímetros."),
      "vis": {
        "t": "txt",
        "h": "📏",
        "cls": "grande"
      },
      "instr": A("t27_i", "Elegí la medida que tiene sentido para cada cosa."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">🚗 El largo de un auto</div>"
          },
          "preg": "El largo de un auto puede medir…",
          "audio": A("t27_a", "El largo de un auto puede medir…"),
          "opc": [
            "4 m",
            "4 cm",
            "4 mm"
          ],
          "conf": A("t27_ac", "Un auto mide unos 4 metros de largo.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">🪴 La altura de una planta</div>"
          },
          "preg": "La altura de una planta puede medir…",
          "audio": A("t27_b", "La altura de una planta puede medir…"),
          "opc": [
            "30 cm",
            "30 m",
            "30 mm"
          ],
          "conf": A("t27_bc", "Una planta de maceta mide unos 30 centímetros.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">✏️ El largo de una goma</div>"
          },
          "preg": "El largo de una goma puede medir…",
          "audio": A("t27_c", "El largo de una goma puede medir…"),
          "opc": [
            "20 mm",
            "20 cm",
            "20 m"
          ],
          "conf": A("t27_cc", "Una goma mide unos 20 milímetros, o sea 2 centímetros.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Quién es el más alto?",
      "vis": {
        "t": "fila",
        "cls": "tres",
        "items": [
          {
            "t": "caja",
            "titulo": "Julieta",
            "items": [
              {
                "t": "img",
                "src": "julieta.jpg",
                "h": 18
              },
              {
                "t": "txt",
                "h": "<b>1 m y 9 cm</b>"
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Fausto",
            "items": [
              {
                "t": "img",
                "src": "fausto.jpg",
                "h": 18
              },
              {
                "t": "txt",
                "h": "<b>1 m y 5 cm</b>"
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Valentín",
            "items": [
              {
                "t": "img",
                "src": "valentin.jpg",
                "h": 18
              },
              {
                "t": "txt",
                "h": "<b>110 cm</b>"
              }
            ]
          }
        ]
      },
      "pista": A("t28_p", "Pasá todas las alturas a centímetros: 1 metro son 100 centímetros."),
      "instr": A("t28_i", "Julieta, Fausto y Valentín midieron sus alturas. Leé lo que dice cada uno."),
      "items": [
        {
          "preg": "¿Quién es el <b>más alto</b> de los tres?",
          "audio": A("t28_a", "¿Quién es el más alto de los tres?"),
          "opc": [
            "Valentín",
            "Julieta",
            "Fausto"
          ],
          "conf": A("t28_ac", "Valentín mide 110 centímetros. Julieta, 109, y Fausto, 105.")
        },
        {
          "preg": "Ordená las alturas de <b>menor a mayor</b>.",
          "audio": A("t28_b", "Ordená las alturas de menor a mayor."),
          "opc": [
            "Fausto, Julieta, Valentín",
            "Julieta, Fausto, Valentín",
            "Valentín, Julieta, Fausto",
            "Fausto, Valentín, Julieta"
          ],
          "conf": A("t28_bc", "105, 109 y 110: Fausto, Julieta y Valentín.")
        },
        {
          "preg": "¿Cuántos centímetros y milímetros son <b>3 metros</b>?",
          "audio": A("t28_c", "¿Cuántos centímetros y cuántos milímetros son 3 metros?"),
          "opc": [
            "300 cm y 3.000 mm",
            "30 cm y 300 mm",
            "300 cm y 300 mm",
            "3.000 cm y 300 mm"
          ],
          "conf": A("t28_cc", "3 metros son 300 centímetros y 3000 milímetros.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Nos hidratamos",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "licuado.jpg",
            "h": 32
          },
          {
            "t": "txt",
            "id": "lt",
            "cls": "grande",
            "h": "1 litro = 1.000 ml"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("t29_1", "Para el torneo hay que tomar mucha agua. Los chicos de más de 8 años necesitan entre 2000 y 2500 mililitros por día."),
          "chip": "💧 Entre 2.000 y 2.500 ml por día"
        },
        {
          "audio": A("t29_2", "Un litro tiene 1000 mililitros. Por eso, 2000 mililitros son 2 litros."),
          "destacar": [
            "lt"
          ],
          "apuntar": "lt",
          "chip": "1 litro = 1.000 mililitros"
        },
        {
          "audio": A("t29_3", "Las celadoras preparan licuados: 800 mililitros de jugo de frutas y 200 de agua dan 1 litro por licuadora."),
          "chip": "🥤 800 ml + 200 ml = 1 litro"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Litros y mililitros",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "licuado.jpg",
            "h": 24
          },
          {
            "t": "txt",
            "h": "1 licuadora = <b>1 litro</b> · Vaso = <b>¼ litro</b>"
          }
        ]
      },
      "pista": A("pi_cap", "Acordate: 1 litro tiene 1000 mililitros. Medio litro son 500, y un cuarto de litro, 250."),
      "instr": A("t30_i", "Resolvé los problemas de los licuados."),
      "items": [
        {
          "preg": "¿Qué es más cantidad: <b>1 litro</b> o <b>1 mililitro</b>?",
          "audio": A("t30_a", "¿Qué es más cantidad: 1 litro o 1 mililitro?"),
          "opc": [
            "1 litro",
            "1 mililitro",
            "Son iguales"
          ],
          "conf": A("t30_ac", "1 litro: tiene 1000 mililitros.")
        },
        {
          "preg": "Con <b>5 licuadoras</b>, ¿cuántos litros de licuado obtienen por tanda?",
          "audio": A("t30_b", "Con 5 licuadoras, ¿cuántos litros de licuado obtienen por tanda?"),
          "opc": [
            "5 litros",
            "1 litro",
            "50 litros",
            "4 litros"
          ],
          "conf": A("t30_bc", "Cada licuadora da 1 litro: 5 litros.")
        },
        {
          "preg": "Con 1 litro se llenan <b>4 vasos iguales</b>. ¿Cuántos ml entran en cada vaso?",
          "audio": A("t30_c", "Con 1 litro se llenan 4 vasos iguales. ¿Cuántos mililitros entran en cada vaso?"),
          "opc": [
            "250 ml",
            "400 ml",
            "100 ml",
            "500 ml"
          ],
          "conf": A("t30_cc", "1000 dividido 4 es 250 mililitros: un cuarto de litro. ¡La celadora tenía razón!")
        },
        {
          "preg": "Con los <b>5 litros</b>, ¿cuántos vasos de <b>¼ litro</b> se llenan?",
          "audio": A("t30_d", "Con los 5 litros, ¿cuántos vasos de un cuarto de litro se llenan?"),
          "opc": [
            "20",
            "5",
            "9",
            "25"
          ],
          "conf": A("t30_dc", "4 vasos por litro, por 5 litros: 20 vasos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las botellas de agua",
      "pista": A("pi_cap", "Acordate: 1 litro tiene 1000 mililitros. Medio litro son 500, y un cuarto de litro, 250."),
      "instr": A("t31_i", "Mirá bien las botellas y su capacidad."),
      "items": [
        {
          "vis": {
            "t": "col",
            "items": [
              {
                "t": "img",
                "src": "botellas_chico.jpg",
                "h": 26
              },
              {
                "t": "txt",
                "h": "250 ml · 250 ml · 500 ml · 500 ml · 1 litro · 1 litro · 500 ml"
              }
            ]
          },
          "preg": "¿Es cierto que juntaron <b>más de 4 litros</b> de agua?",
          "audio": A("t31_a", "Los chicos juntaron estas botellas. ¿Es cierto que tienen más de 4 litros de agua?"),
          "opc": [
            "No: son justo 4 litros",
            "Sí: son 5 litros",
            "Sí: son 7 litros",
            "No: son 3 litros"
          ],
          "conf": A("t31_ac", "250 más 250 es medio litro; tres de 500 son un litro y medio; más 2 litros: justo 4 litros.")
        },
        {
          "vis": {
            "t": "col",
            "items": [
              {
                "t": "caja",
                "titulo": "Cecilia: 8 botellas de ¼ litro",
                "items": [
                  {
                    "t": "botellas",
                    "h": 9,
                    "b": [
                      [
                        "¼ l",
                        0.25,
                        8
                      ]
                    ]
                  }
                ]
              },
              {
                "t": "caja",
                "titulo": "Sonia: 5 botellas de ½ litro",
                "items": [
                  {
                    "t": "botellas",
                    "h": 9,
                    "b": [
                      [
                        "½ l",
                        0.5,
                        5
                      ]
                    ]
                  }
                ]
              }
            ]
          },
          "preg": "Ceci dice que como tiene <b>más botellas</b>, compró más jugo que Sonia. ¿Tiene razón?",
          "audio": A("t31_b", "Ceci dice que como tiene más botellas, compró más jugo que Sonia. ¿Tiene razón?"),
          "opc": [
            "No: Ceci tiene 2 litros y Sonia 2 litros y ½",
            "Sí: tiene más botellas",
            "Sí: tiene 8 litros",
            "Tienen lo mismo"
          ],
          "conf": A("t31_bc", "Ceci: 8 cuartos son 2 litros. Sonia: 5 medios son 2 litros y medio. Sonia compró más.")
        },
        {
          "vis": {
            "t": "botellas",
            "h": 14,
            "b": [
              [
                "2 ½ l",
                1,
                1
              ]
            ]
          },
          "preg": "Con una botella de <b>2 litros y ½</b>, ¿cuántos vasos de <b>250 ml</b> se llenan?",
          "audio": A("t31_c", "Con una botella de 2 litros y medio, ¿cuántos vasos de 250 mililitros se llenan?"),
          "opc": [
            "10",
            "8",
            "25",
            "5"
          ],
          "conf": A("t31_cc", "2 litros y medio son 2500 mililitros. Entran 10 vasos de 250.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: litros y mililitros",
      "vis": {
        "t": "tabla",
        "id": "tl2",
        "cab": [
          "Litros",
          "4",
          "2",
          "1",
          "½",
          "¼"
        ],
        "filas": [
          [
            "Mililitros",
            "?",
            "?",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "botellas_surtidas.jpg",
      "pista": A("pi_cap", "Acordate: 1 litro tiene 1000 mililitros. Medio litro son 500, y un cuarto de litro, 250."),
      "instr": A("t32_i", "Completá la tabla de litros y mililitros."),
      "items": [
        {
          "preg": "4 litros, 2 litros y 1 litro: ¿cuántos mililitros?",
          "audio": A("t32_a", "4 litros, 2 litros y 1 litro: ¿cuántos mililitros son?"),
          "destacar": [
            "tl2_0_1",
            "tl2_0_2",
            "tl2_0_3"
          ],
          "opc": [
            "4.000 · 2.000 · 1.000",
            "400 · 200 · 100",
            "40 · 20 · 10",
            "4.000 · 200 · 1.000"
          ],
          "escribir": [
            {
              "id": "tl2_0_1",
              "h": "4.000"
            },
            {
              "id": "tl2_0_2",
              "h": "2.000"
            },
            {
              "id": "tl2_0_3",
              "h": "1.000"
            }
          ],
          "conf": A("t32_ac", "Cada litro son 1000 mililitros.")
        },
        {
          "preg": "½ litro y ¼ litro: ¿cuántos mililitros?",
          "audio": A("t32_b", "Medio litro y un cuarto de litro: ¿cuántos mililitros son?"),
          "destacar": [
            "tl2_0_4",
            "tl2_0_5"
          ],
          "opc": [
            "500 y 250",
            "50 y 25",
            "200 y 400",
            "500 y 400"
          ],
          "escribir": [
            {
              "id": "tl2_0_4",
              "h": "500"
            },
            {
              "id": "tl2_0_5",
              "h": "250"
            }
          ],
          "conf": A("t32_bc", "La mitad de 1000 es 500, y la mitad de 500 es 250.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Merienda saludable",
      "vis": {
        "t": "img",
        "src": "marina.jpg",
        "h": 38
      },
      "pasos": [
        {
          "audio": A("t33_1", "En octubre celebramos la semana de la Merienda Saludable, dispuesta por la Ley Provincial 8247 del año 2010."),
          "chip": "🍎 Ley Provincial 8.247 · año 2010"
        },
        {
          "audio": A("t33_2", "Para el torneo, las escuelas llevan frutas, y la seño de tercero prepara arroz con leche para todos."),
          "chip": "🍚 Arroz con leche para todos"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Frutas y arroz con leche",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "marina.jpg",
            "h": 22
          },
          {
            "t": "tabla",
            "id": "ta",
            "cab": [
              "Arroz en kg",
              "1",
              "2",
              "3",
              "5",
              "7"
            ],
            "filas": [
              [
                "Arroz en g",
                "1.000",
                "2.000",
                "3.000",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("pi_peso", "Acordate: 1 kilogramo tiene 1000 gramos. Medio kilo son 500 gramos, y un cuarto, 250."),
      "instr": A("t34_i", "Resolvé los problemas de la merienda."),
      "items": [
        {
          "preg": "La ley es del año <b>2010</b>. ¿Cuántos años pasaron hasta <b>2026</b>?",
          "audio": A("t34_a", "La ley es del año 2010. ¿Cuántos años pasaron hasta 2026?"),
          "opc": [
            "16",
            "26",
            "6",
            "10"
          ],
          "conf": A("t34_ac", "2026 menos 2010 es 16 años.")
        },
        {
          "preg": "Van <b>245 alumnos</b> y cada uno recibe <b>3 frutas</b>. ¿Cuántas frutas hacen falta?",
          "audio": A("t34_b", "Van 245 alumnos y cada uno recibe 3 frutas. ¿Cuántas frutas hacen falta?"),
          "opc": [
            "735",
            "248",
            "725",
            "635"
          ],
          "conf": A("t34_bc", "245 por 3: 200 por 3 es 600, 40 por 3 es 120, y 5 por 3 es 15. Total: 735.")
        },
        {
          "preg": "La seño compró <b>6 paquetes de 500 g</b> de arroz. Marina dice que son <b>más de 3 kg</b>. ¿Tiene razón?",
          "audio": A("t34_c", "La seño compró 6 paquetes de 500 gramos de arroz. Marina dice que son más de 3 kilos. ¿Tiene razón?"),
          "opc": [
            "No: son justo 3 kg",
            "Sí: son 6 kg",
            "Sí: son 5 kg",
            "No: son 2 kg"
          ],
          "conf": A("t34_cc", "6 por 500 es 3000 gramos, que son justo 3 kilos. No es más.")
        },
        {
          "preg": "¿Cuántos gramos hay en <b>5 kg</b> y en <b>7 kg</b>?",
          "audio": A("t34_d", "¿Cuántos gramos hay en 5 kilos y en 7 kilos?"),
          "opc": [
            "5.000 g y 7.000 g",
            "500 g y 700 g",
            "50 g y 70 g",
            "5.000 g y 700 g"
          ],
          "escribir": [
            {
              "id": "ta_0_4",
              "h": "5.000"
            },
            {
              "id": "ta_0_5",
              "h": "7.000"
            }
          ],
          "conf": A("t34_dc", "Cada kilo son 1000 gramos: 5000 y 7000.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: kilos y gramos",
      "vis": {
        "t": "tabla",
        "id": "tk",
        "cab": [
          "Kilogramos",
          "4",
          "2",
          "1",
          "½",
          "¼"
        ],
        "filas": [
          [
            "Gramos",
            "?",
            "?",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "dulce_leche.jpg",
      "pista": A("pi_peso", "Acordate: 1 kilogramo tiene 1000 gramos. Medio kilo son 500 gramos, y un cuarto, 250."),
      "instr": A("t35_i", "Kilos y gramos en el supermercado."),
      "items": [
        {
          "preg": "4 kg, 2 kg y 1 kg: ¿cuántos gramos?",
          "audio": A("t35_a", "4, 2 y 1 kilo: ¿cuántos gramos son?"),
          "destacar": [
            "tk_0_1",
            "tk_0_2",
            "tk_0_3"
          ],
          "opc": [
            "4.000 · 2.000 · 1.000",
            "400 · 200 · 100",
            "40 · 20 · 10",
            "4.000 · 200 · 100"
          ],
          "escribir": [
            {
              "id": "tk_0_1",
              "h": "4.000"
            },
            {
              "id": "tk_0_2",
              "h": "2.000"
            },
            {
              "id": "tk_0_3",
              "h": "1.000"
            }
          ],
          "conf": A("t35_ac", "Cada kilo son 1000 gramos.")
        },
        {
          "preg": "½ kg y ¼ kg: ¿cuántos gramos?",
          "audio": A("t35_b", "Medio kilo y un cuarto de kilo: ¿cuántos gramos son?"),
          "destacar": [
            "tk_0_4",
            "tk_0_5"
          ],
          "opc": [
            "500 g y 250 g",
            "50 g y 25 g",
            "200 g y 400 g",
            "500 g y 400 g"
          ],
          "escribir": [
            {
              "id": "tk_0_4",
              "h": "500"
            },
            {
              "id": "tk_0_5",
              "h": "250"
            }
          ],
          "conf": A("t35_bc", "Medio kilo son 500 gramos, y un cuarto, 250.")
        },
        {
          "preg": "<b>20 sobrecitos</b> de azúcar de <b>5 g</b>: ¿es 1 kilo?",
          "audio": A("t35_c", "20 sobrecitos de azúcar de 5 gramos: ¿es un kilo?"),
          "opc": [
            "No: son 100 g",
            "Sí: es 1 kg",
            "No: son 25 g",
            "No: son 500 g"
          ],
          "conf": A("t35_cc", "20 por 5 es 100 gramos. Para un kilo hacen falta 200 sobrecitos.")
        },
        {
          "preg": "Un postre lleva <b>500 g</b> de crema y solo hay potes de <b>¼ kg</b>. ¿Alcanza con 1 pote?",
          "audio": A("t35_d", "Un postre lleva 500 gramos de crema y solo hay potes de un cuarto de kilo. ¿Alcanza con 1 pote?"),
          "opc": [
            "No: hacen falta 2 potes",
            "Sí: alcanza justo",
            "Sí: y sobra",
            "No: hacen falta 4"
          ],
          "conf": A("t35_dc", "Un cuarto de kilo son 250 gramos. Para 500 hacen falta 2 potes.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el dulce de leche y la balanza",
      "pista": A("pi_peso", "Acordate: 1 kilogramo tiene 1000 gramos. Medio kilo son 500 gramos, y un cuarto, 250."),
      "instr": A("t36_i", "Más problemas con kilos y gramos."),
      "items": [
        {
          "vis": {
            "t": "col",
            "items": [
              {
                "t": "img",
                "src": "dulce_leche.jpg",
                "h": 26
              },
              {
                "t": "txt",
                "h": "Ivana quiere <b>1 kg y ½</b> de dulce de leche · Potes de <b>250 g</b> y de <b>500 g</b>"
              }
            ]
          },
          "preg": "¿Cuál de estas compras da <b>1 kg y ½</b>?",
          "audio": A("t36_a", "Ivana quiere un kilo y medio de dulce de leche. ¿Cuál de estas compras le da justo esa cantidad?"),
          "opc": [
            "2 potes de 500 g y 2 de 250 g",
            "1 pote de 500 g y 1 de 250 g",
            "4 potes de 250 g",
            "2 potes de 500 g"
          ],
          "conf": A("t36_ac", "1000 más 500 es 1500 gramos. También sirven 3 potes de 500, o 6 de 250.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "balanza.jpg",
                "h": 26
              },
              {
                "t": "img",
                "src": "pesas.jpg",
                "h": 22
              }
            ]
          },
          "preg": "En la balanza hay <b>1 kg y ½</b> de naranjas. ¿Qué pesas la equilibran?",
          "audio": A("t36_b", "En la balanza hay un kilo y medio de naranjas. ¿Qué pesas la equilibran?"),
          "opc": [
            "1 kg y ½ kg",
            "1 kg y ¼ kg",
            "½ kg y ¼ kg",
            "Solo 1 kg"
          ],
          "conf": A("t36_bc", "La pesa de 1 kilo más la de medio kilo: un kilo y medio.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "La cancha del estadio en papel",
      "vis": {
        "t": "img",
        "src": "cancha.jpg",
        "h": 42
      },
      "pasos": [
        {
          "audio": A("t37_1", "La seño propone copiar el plano de la cancha de fútbol con regla, compás y escuadra."),
          "chip": "📐 Regla, compás y escuadra"
        },
        {
          "audio": A("t37_2", "Las líneas rectas y los rectángulos de las áreas se trazan con la regla. La escuadra ayuda a que los ángulos sean rectos."),
          "chip": "▭ Rectángulos con regla y escuadra"
        },
        {
          "audio": A("t37_3", "El círculo del centro y los arcos de las áreas y de las esquinas se trazan con el compás."),
          "chip": "◯ Círculo y arcos con compás"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Copiamos la cancha",
      "pista": A("t38_p", "Pensá qué instrumento sirve para cada tipo de línea: recta, curva o ángulo recto."),
      "instr": A("t38_i", "Pensá cómo se copia la cancha."),
      "items": [
        {
          "vis": {
            "t": "img",
            "src": "cancha.jpg",
            "h": 30
          },
          "preg": "¿Qué figuras geométricas hay en la cancha?",
          "audio": A("t38_a", "¿Qué figuras geométricas hay en la cancha?"),
          "opc": [
            "Rectángulos y una circunferencia",
            "Solo triángulos",
            "Rombos y trapecios",
            "Solo cuadrados"
          ],
          "conf": A("t38_ac", "La cancha y las áreas son rectángulos, y en el centro hay una circunferencia.")
        },
        {
          "vis": {
            "t": "img",
            "src": "cancha.jpg",
            "h": 30
          },
          "preg": "¿Dónde se usa el <b>compás</b>?",
          "audio": A("t38_b", "¿Dónde se usa el compás?"),
          "opc": [
            "En el círculo central y los arcos",
            "En las líneas de los costados",
            "En los arcos de gol",
            "No se usa"
          ],
          "conf": A("t38_bc", "El compás traza las líneas curvas: el círculo central y los arcos.")
        },
        {
          "vis": {
            "t": "img",
            "src": "cancha.jpg",
            "h": 30
          },
          "preg": "¿Cómo te asegurás de que los ángulos sean <b>rectos</b>?",
          "audio": A("t38_c", "¿Cómo te asegurás de que los ángulos sean rectos?"),
          "opc": [
            "Con la escuadra",
            "Con el compás",
            "A ojo",
            "Con la goma"
          ],
          "conf": A("t38_cc", "La escuadra tiene un ángulo recto: sirve para trazarlos y controlarlos.")
        },
        {
          "vis": {
            "t": "img",
            "src": "francesca.jpg",
            "h": 34
          },
          "preg": "Francesca dice que, sin medir, el punto F está a <b>4 cm de A</b> y a <b>4 cm de B</b>. ¿Tiene razón?",
          "audio": A("t38_d", "Francesca dice que, sin medir, el punto F está a 4 centímetros de A y a 4 centímetros de B. ¿Tiene razón?"),
          "opc": [
            "Sí: F está en dos arcos de 4 cm, con centro en A y en B",
            "No: hay que medir siempre",
            "No: está a 8 cm",
            "Sí: porque está abajo"
          ],
          "conf": A("t38_dc", "Los dos arcos se trazaron con el compás abierto en 4 centímetros, uno desde A y otro desde B. F está en los dos, así que está a 4 de cada uno.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre3", "¡Felicitaciones! Terminaste el Torneo Saludable. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
