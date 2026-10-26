/* datos.js — "Bienvenidos a la Escuela Abierta" · Parte 3 · El rincón de las delicias · 3er grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 3 (DGE Mendoza), págs. 45 a 51.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Bienvenidos a la Escuela Abierta",
    "subtitulo": "Precios y vueltos, multiplicaciones, pictogramas y divisiones con la venta de comidas y gaseosas",
    "grado": "3er grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "rincon_delicias.jpg",
    "imgCierre": "portada.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Bienvenidos a la Escuela Abierta» (págs. 45 a 51) del cuadernillo «Aventureros de la Matemática 3», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo.",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "corto": "Escuela Abierta 3",
    "parte": "Parte 3 · El rincón de las delicias"
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Puesto de comidas y bebidas",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "rincon_delicias.jpg",
            "h": 30
          },
          {
            "t": "precios",
            "id": "mn",
            "titulo": "🍽️ El rincón de las delicias",
            "items": [
              [
                "🥤 Gaseosa",
                "$4.500"
              ],
              [
                "💧 Agua",
                "$1.900"
              ],
              [
                "🧃 Jugo",
                "$3.100"
              ],
              [
                "🌭 Pancho",
                "$2.700"
              ],
              [
                "🍕 Pizzeta",
                "$5.500"
              ],
              [
                "🥪 Sándwich de jamón",
                "$5.900"
              ],
              [
                "🍪 Alfajor",
                "$4.500"
              ]
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p23_1", "A las 11 se abrió El rincón de las delicias, el puesto de la Cooperadora. ¡Todos dijeron: vamos a comer!"),
          "chip": "🍽️ El rincón de las delicias"
        },
        {
          "audio": A("p23_2", "Bebidas: gaseosa, 4500 pesos; agua, 1900; jugo, 3100."),
          "destacar": [
            "mn_0",
            "mn_1",
            "mn_2"
          ],
          "apuntar": "mn_1",
          "chip": "🥤 Bebidas"
        },
        {
          "audio": A("p23_3", "Comidas: pancho, 2700; pizzeta, 5500; sándwich de jamón, 5900; y alfajor, 4500."),
          "destacar": [
            "mn_3",
            "mn_4",
            "mn_5",
            "mn_6"
          ],
          "apuntar": "mn_4",
          "chip": "🌭 Comidas"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Cuánto gastaron?",
      "deco": "rincon_delicias.jpg",
      "vis": {
        "t": "precios",
        "id": "mn",
        "titulo": "🍽️ El rincón de las delicias",
        "items": [
          [
            "🥤 Gaseosa",
            "$4.500"
          ],
          [
            "💧 Agua",
            "$1.900"
          ],
          [
            "🧃 Jugo",
            "$3.100"
          ],
          [
            "🌭 Pancho",
            "$2.700"
          ],
          [
            "🍕 Pizzeta",
            "$5.500"
          ],
          [
            "🥪 Sándwich de jamón",
            "$5.900"
          ],
          [
            "🍪 Alfajor",
            "$4.500"
          ]
        ]
      },
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "instr": A("p24_i", "Mirá los precios del puesto y calculá."),
      "items": [
        {
          "preg": "Guada compró <b>un agua</b> y <b>dos panchos</b>. ¿Cuánto gastó?",
          "audio": A("p24_a", "Guada compró un agua y dos panchos. ¿Cuánto gastó?"),
          "opc": [
            "$7.300",
            "$4.600",
            "$5.400",
            "$8.100"
          ],
          "destacar": [
            "mn_1",
            "mn_3"
          ],
          "conf": A("p24_ac", "Dos panchos son 5400, más 1900 del agua: 7300 pesos.")
        },
        {
          "preg": "Martina tenía <b>$10.000</b> y recibió <b>$1.000 de vuelto</b>. ¿Cuánto gastó?",
          "audio": A("p24_b", "Martina tenía 10000 pesos y recibió 1000 de vuelto. ¿Cuánto gastó?"),
          "opc": [
            "$9.000",
            "$11.000",
            "$1.000",
            "$10.000"
          ],
          "conf": A("p24_bc", "10000 menos 1000 de vuelto: gastó 9000 pesos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Qué pudo comprar Martina?",
      "deco": "rincon_delicias.jpg",
      "vf": true,
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "precios",
            "id": "mn",
            "titulo": "🍽️ El rincón de las delicias",
            "items": [
              [
                "🥤 Gaseosa",
                "$4.500"
              ],
              [
                "💧 Agua",
                "$1.900"
              ],
              [
                "🧃 Jugo",
                "$3.100"
              ],
              [
                "🌭 Pancho",
                "$2.700"
              ],
              [
                "🍕 Pizzeta",
                "$5.500"
              ],
              [
                "🥪 Sándwich de jamón",
                "$5.900"
              ],
              [
                "🍪 Alfajor",
                "$4.500"
              ]
            ]
          },
          {
            "t": "txt",
            "cls": "grande",
            "h": "💵 Martina gastó<br><b>$9.000</b>"
          }
        ]
      },
      "instr": A("p25_i", "Martina gastó 9000 pesos. ¿Pudo haber comprado esto? Verdadero o falso."),
      "items": [
        {
          "preg": "Una gaseosa y un alfajor.",
          "audio": A("p25_a", "Una gaseosa y un alfajor."),
          "v": true,
          "conf": A("p25_ac", "Verdadero: 4500 más 4500 es 9000.")
        },
        {
          "preg": "Un jugo y un sándwich de jamón.",
          "audio": A("p25_b", "Un jugo y un sándwich de jamón."),
          "v": true,
          "conf": A("p25_bc", "Verdadero: 3100 más 5900 es 9000.")
        },
        {
          "preg": "Una pizzeta y un agua.",
          "audio": A("p25_c", "Una pizzeta y un agua."),
          "v": false,
          "conf": A("p25_cc", "Falso: 5500 más 1900 es 7400. Le hubieran dado más vuelto.")
        },
        {
          "preg": "Hay una única opción de compra.",
          "audio": A("p25_d", "Hay una única opción de compra."),
          "v": false,
          "conf": A("p25_dc", "Falso: hay varias opciones que suman 9000.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Sillas para la danza",
      "vis": {
        "t": "fila",
        "cls": "tres",
        "items": [
          {
            "t": "caja",
            "titulo": "Juani",
            "items": [
              {
                "t": "img",
                "src": "mult_juani.jpg",
                "h": 22
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Guada",
            "items": [
              {
                "t": "img",
                "src": "mult_guada.jpg",
                "h": 22
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Pilar",
            "items": [
              {
                "t": "img",
                "src": "mult_pilar.jpg",
                "h": 22
              }
            ]
          }
        ]
      },
      "instr": A("p26_i", "En el patio pusieron 6 filas de 42 sillas. Juani, Guada y Pilar calcularon 42 por 6. Tocá las hojas para verlas grandes."),
      "items": [
        {
          "preg": "6 filas de 42 sillas: ¿cuántas personas se pueden sentar?",
          "audio": A("p26_a", "¿Cuántas personas se pueden sentar?"),
          "opc": [
            "252",
            "242",
            "48",
            "2.412"
          ],
          "conf": A("p26_ac", "42 por 6 es 252. Los tres llegaron al mismo resultado.")
        },
        {
          "preg": "Juani hizo <b>2 × 6 = 12</b>. ¿Dónde está ese 12 en la cuenta de Pilar?",
          "audio": A("p26_b", "Juani hizo 2 por 6, 12. ¿Dónde está ese 12 en la cuenta de Pilar?"),
          "opc": [
            "En el 2 de los unos y el 1 que se lleva",
            "En el 6",
            "En el 4",
            "No está"
          ],
          "conf": A("p26_bc", "Pilar escribe el 2 en los unos y se lleva 1 diez: es el numerito de arriba.")
        },
        {
          "preg": "¿Por qué Guada suma <b>dos veces el 120</b>?",
          "audio": A("p26_c", "¿Por qué Guada suma dos veces el 120?"),
          "opc": [
            "Porque 40 es 20 + 20, y 20 × 6 = 120",
            "Porque hay dos filas",
            "Porque se equivocó",
            "Porque 6 + 6 = 12"
          ],
          "conf": A("p26_cc", "Guada partió el 40 en 20 más 20. 20 por 6 es 120, dos veces: 240.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Más sillas, más personas",
      "deco": "portada.jpg",
      "instr": A("p27_i", "Seguimos acomodando sillas en la escuela."),
      "items": [
        {
          "vis": {
            "t": "sillas",
            "id": "sa",
            "filas": 6,
            "por": 42,
            "extra": 3
          },
          "preg": "Hay 6 filas de 42 sillas. Si agregan <b>3 filas más</b>, ¿qué cálculo sirve para saber cuántas personas se sientan?",
          "audio": A("p27_a", "Si agregan 3 filas más, ¿qué cálculo sirve para saber cuántas personas se sientan?"),
          "opc": [
            "42 × 9",
            "42 × 3",
            "45 × 6",
            "42 + 9"
          ],
          "mostrar": [
            "sa_6",
            "sa_7",
            "sa_8"
          ],
          "conf": A("p27_ac", "6 filas más 3 son 9 filas: 42 por 9, que da 378."),
          "pista": A("p27_ap", "Contá cuántas filas hay en total.")
        },
        {
          "vis": {
            "t": "sillas",
            "id": "sb",
            "filas": 8,
            "por": 36,
            "extra": 1
          },
          "preg": "En el salón del coro pusieron <b>8 filas de 36 sillas</b>. ¿Cuántas personas se sentaron?",
          "audio": A("p27_b", "En el salón del coro pusieron 8 filas de 36 sillas. ¿Cuántas personas se sentaron?"),
          "opc": [
            "288",
            "248",
            "44",
            "328"
          ],
          "conf": A("p27_bc", "30 por 8 es 240, y 6 por 8 es 48. 240 más 48 es 288.")
        },
        {
          "preg": "Llegó más gente y armaron <b>una fila más</b> de 36. ¿Cuántas personas disfrutaron del coro?",
          "audio": A("p27_c", "Llegó más gente y armaron una fila más de 36. ¿Cuántas personas disfrutaron del coro?"),
          "opc": [
            "324",
            "289",
            "296",
            "360"
          ],
          "mostrar": [
            "sb_8"
          ],
          "conf": A("p27_cc", "288 más 36 es 324. Es lo mismo que 36 por 9.")
        },
        {
          "vis": {
            "t": "sillas",
            "id": "sc",
            "filas": 0,
            "por": 25,
            "extra": 4
          },
          "preg": "En el salón de música pusieron <b>25 sillas por fila</b>. Fueron <b>100 personas</b> y todas se sentaron. ¿Cuántas filas había?",
          "audio": A("p27_d", "En el salón de música pusieron 25 sillas por fila. Fueron 100 personas y todas se sentaron. ¿Cuántas filas había?"),
          "opc": [
            "4",
            "25",
            "75",
            "5"
          ],
          "mostrar": [
            "sc_0",
            "sc_1",
            "sc_2",
            "sc_3"
          ],
          "conf": A("p27_dc", "25 más 25 más 25 más 25 es 100: había 4 filas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: donaciones y multiplicaciones",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "caja",
            "titulo": "1 cajón",
            "items": [
              {
                "t": "img",
                "src": "cajon_bebidas.jpg",
                "h": 20
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "1 bandeja",
            "items": [
              {
                "t": "img",
                "src": "magdalenas.jpg",
                "h": 20
              }
            ]
          }
        ]
      },
      "instr": A("p28_i", "Manuel, un papá de la Cooperadora, donó gaseosas y magdalenas. Contá cuántas hay en un cajón y en una bandeja."),
      "items": [
        {
          "preg": "Manuel trajo <b>7 cajones</b> como este. ¿Cuántas gaseosas donó?",
          "audio": A("p28_a", "Manuel trajo 7 cajones como este. ¿Cuántas gaseosas donó?"),
          "opc": [
            "140",
            "27",
            "120",
            "147"
          ],
          "conf": A("p28_ac", "Cada cajón tiene 4 filas de 5: 20 botellas. 20 por 7 es 140."),
          "pista": A("p28_ap", "Primero contá las botellas de un cajón: cuántas filas y cuántas en cada fila.")
        },
        {
          "preg": "También trajo <b>8 bandejas</b> como esta. ¿Cuántas magdalenas donó?",
          "audio": A("p28_b", "También trajo 8 bandejas como esta. ¿Cuántas magdalenas donó?"),
          "opc": [
            "144",
            "26",
            "148",
            "124"
          ],
          "conf": A("p28_bc", "Cada bandeja tiene 6 filas de 3: 18. 18 por 8 es 144."),
          "pista": A("p28_bp", "Contá las magdalenas de una bandeja y después multiplicá por 8.")
        },
        {
          "preg": "Así resolvió Agustín 328 × 8. ¿Cómo resolvería <b>255 × 6</b>?",
          "audio": A("p29_a", "Agustín multiplica de una manera muy particular. Mirá cómo resolvió 328 por 8. ¿Cómo resolvería 255 por 6?"),
          "opc": [
            "30 + 300 + 1.200 = 1.530",
            "30 + 30 + 12 = 72",
            "255 + 6 = 261",
            "25 + 300 + 1.200 = 1.525"
          ],
          "conf": A("p29_ac", "5 por 6 es 30; 50 por 6, 300; 200 por 6, 1200. Todo junto: 1530."),
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "cajon_bebidas.jpg",
                "h": 13,
                "zoom": false
              },
              {
                "t": "pre",
                "h": "  328 × 8\n     64   ← 8 × 8\n    160   ← 20 × 8\n+ 2.400   ← 300 × 8\n  2.624"
              }
            ]
          }
        },
        {
          "preg": "¿Y <b>436 × 5</b>?",
          "audio": A("p29_b", "¿Y 436 por 5?"),
          "opc": [
            "30 + 150 + 2.000 = 2.180",
            "30 + 15 + 20 = 65",
            "436 + 5 = 441",
            "30 + 150 + 200 = 380"
          ],
          "conf": A("p29_bc", "6 por 5 es 30; 30 por 5, 150; 400 por 5, 2000. Total: 2180."),
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "cajon_bebidas.jpg",
                "h": 13,
                "zoom": false
              },
              {
                "t": "pre",
                "h": "  328 × 8\n     64   ← 8 × 8\n    160   ← 20 × 8\n+ 2.400   ← 300 × 8\n  2.624"
              }
            ]
          }
        },
        {
          "preg": "Señalá la forma correcta de resolver <b>14 × 4</b>.",
          "audio": A("p29_c", "Señalá la forma correcta de resolver 14 por 4."),
          "opc": [
            {
              "t": "pasos",
              "l": [
                "4 × 4 = 16",
                "4 × 10 = 40",
                "16 + 40 = 56"
              ]
            },
            {
              "t": "pasos",
              "l": [
                "4 × 4 = 16",
                "4 × 1 = 4",
                "16 + 4 = 20"
              ]
            },
            {
              "t": "pasos",
              "l": [
                "10 × 4 = 40",
                "4 × 1 = 4",
                "40 + 4 = 44"
              ]
            },
            {
              "t": "pasos",
              "l": [
                "4 + 4 = 8",
                "10 + 4 = 14",
                "8 + 14 = 22"
              ]
            }
          ],
          "conf": A("p29_cc", "14 es 10 más 4. 4 por 4 es 16, 10 por 4 es 40: 56."),
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "cajon_bebidas.jpg",
                "h": 13,
                "zoom": false
              },
              {
                "t": "pre",
                "h": "  328 × 8\n     64   ← 8 × 8\n    160   ← 20 × 8\n+ 2.400   ← 300 × 8\n  2.624"
              }
            ]
          }
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Ventas en El rincón de las delicias",
      "vis": {
        "t": "picto",
        "id": "pv",
        "vale": "5 personas",
        "cols": [
          [
            "Gaseosa",
            4
          ],
          [
            "Agua",
            2
          ],
          [
            "Jugo",
            3
          ],
          [
            "Pancho",
            5
          ]
        ]
      },
      "pista": A("pi_pic", "Acordate: cada muñequito vale 5 personas. Contá de 5 en 5."),
      "instr": A("p30_i", "Los chicos armaron un pictograma con lo vendido. Cada muñequito representa 5 personas."),
      "items": [
        {
          "preg": "¿Cuántas personas compraron <b>agua</b>?",
          "audio": A("p30_a", "¿Cuántas personas compraron agua?"),
          "destacar": [
            "pv_1"
          ],
          "opc": [
            "10",
            "2",
            "5",
            "20"
          ],
          "conf": A("p30_ac", "2 muñequitos de 5: 10 personas.")
        },
        {
          "preg": "¿Cuántas personas compraron <b>jugo</b>?",
          "audio": A("p30_b", "¿Cuántas personas compraron jugo?"),
          "destacar": [
            "pv_2"
          ],
          "opc": [
            "15",
            "3",
            "10",
            "20"
          ],
          "conf": A("p30_bc", "3 muñequitos: 5, 10, 15 personas.")
        },
        {
          "preg": "¿Cuántas compraron <b>gaseosa y agua</b>, juntas?",
          "audio": A("p30_c", "¿Cuántas compraron gaseosa y agua, juntas?"),
          "destacar": [
            "pv_0",
            "pv_1"
          ],
          "opc": [
            "30",
            "6",
            "20",
            "25"
          ],
          "conf": A("p30_cc", "Gaseosa, 20 personas; agua, 10. En total, 30.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Completamos el pictograma",
      "vis": {
        "t": "picto",
        "id": "pw",
        "vale": "5 personas",
        "cols": [
          [
            "Gaseosa",
            4
          ],
          [
            "Agua",
            2
          ],
          [
            "Jugo",
            3
          ],
          [
            "Pancho",
            5
          ],
          [
            "Pizzetas",
            0
          ],
          [
            "Sándwich",
            0
          ],
          [
            "Alfajores",
            0
          ]
        ]
      },
      "pista": A("pi_pic", "Acordate: cada muñequito vale 5 personas. Contá de 5 en 5."),
      "instr": A("p31_i", "Faltan tres productos en el pictograma. Cada muñequito vale 5 personas."),
      "items": [
        {
          "preg": "<b>45 personas</b> compraron pizzetas. ¿Cuántos muñequitos hay que dibujar?",
          "audio": A("p31_a", "45 personas compraron pizzetas. ¿Cuántos muñequitos hay que dibujar?"),
          "destacar": [
            "pw_4"
          ],
          "opc": [
            "9",
            "45",
            "5",
            "8"
          ],
          "escribir": [
            {
              "id": "pw_4",
              "h": {
                "t": "pers",
                "n": 9
              }
            }
          ],
          "conf": A("p31_ac", "9 muñequitos de 5 son 45.")
        },
        {
          "preg": "<b>25 personas</b> compraron sándwich de jamón y queso. ¿Cuántos muñequitos?",
          "audio": A("p31_b", "25 personas compraron sándwich de jamón y queso. ¿Cuántos muñequitos?"),
          "destacar": [
            "pw_5"
          ],
          "opc": [
            "5",
            "25",
            "4",
            "6"
          ],
          "escribir": [
            {
              "id": "pw_5",
              "h": {
                "t": "pers",
                "n": 5
              }
            }
          ],
          "conf": A("p31_bc", "5 muñequitos de 5 son 25.")
        },
        {
          "preg": "<b>15 personas</b> compraron alfajores. ¿Cuántos muñequitos?",
          "audio": A("p31_c", "15 personas compraron alfajores. ¿Cuántos muñequitos?"),
          "destacar": [
            "pw_6"
          ],
          "opc": [
            "3",
            "15",
            "5",
            "2"
          ],
          "escribir": [
            {
              "id": "pw_6",
              "h": {
                "t": "pers",
                "n": 3
              }
            }
          ],
          "conf": A("p31_cc", "3 muñequitos de 5 son 15.")
        },
        {
          "preg": "¿Qué producto fue el <b>más elegido</b>? ¿Y el <b>menos elegido</b>?",
          "audio": A("p31_d", "¿Qué producto fue el más elegido? ¿Y el menos elegido?"),
          "opc": [
            "Pizzetas y agua",
            "Pancho y jugo",
            "Gaseosa y alfajores",
            "Pizzetas y alfajores"
          ],
          "conf": A("p31_dc", "Las pizzetas, con 45 personas, y el agua, con 10.")
        },
        {
          "preg": "¿Cuántas personas compraron algo en el puesto?",
          "audio": A("p31_e", "¿Cuántas personas compraron algo en el puesto?"),
          "opc": [
            "155",
            "31",
            "150",
            "145"
          ],
          "conf": A("p31_ec", "Hay 31 muñequitos de 5: 155 personas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: los alumnos de una escuela",
      "vis": {
        "t": "pictoH",
        "filas": [
          [
            "Nivel Inicial",
            "vvvmmm"
          ],
          [
            "1.°",
            "vvvmm"
          ],
          [
            "2.°",
            "vvvmmm"
          ],
          [
            "3.°",
            "vvvmm"
          ],
          [
            "4.°",
            "vvmmm"
          ],
          [
            "5.°",
            "vvmm"
          ],
          [
            "6.°",
            "vvmmm"
          ],
          [
            "7.°",
            "vvvvmm"
          ]
        ]
      },
      "pista": A("p32_p", "Cada muñequito vale 4. Contá de 4 en 4."),
      "instr": A("p32_i", "Este pictograma muestra los alumnos de una escuela. Cada nene vale 4 varones, y cada nena, 4 mujeres."),
      "items": [
        {
          "preg": "¿Cuántos alumnos van a esa escuela?",
          "audio": A("p32_a", "¿Cuántos alumnos van a esa escuela?"),
          "opc": [
            "168",
            "42",
            "160",
            "176"
          ],
          "conf": A("p32_ac", "Hay 42 muñequitos, y cada uno vale 4: 168 alumnos.")
        },
        {
          "preg": "¿Qué diferencia hay entre el grado con <b>más</b> alumnos y el de <b>menos</b>?",
          "audio": A("p32_b", "¿Qué diferencia hay entre el grado con más alumnos y el de menos?"),
          "opc": [
            "8",
            "2",
            "4",
            "24"
          ],
          "conf": A("p32_bc", "El que más tiene, 6 muñequitos: 24. Quinto, 4 muñequitos: 16. 24 menos 16 es 8.")
        },
        {
          "preg": "¿Van más <b>varones</b> o más <b>mujeres</b>?",
          "audio": A("p32_c", "¿Van más varones o más mujeres?"),
          "opc": [
            "Más varones",
            "Más mujeres",
            "Igual cantidad"
          ],
          "conf": A("p32_cc", "Hay 22 nenes y 20 nenas: 88 varones y 80 mujeres.")
        },
        {
          "preg": "Ingresan <b>2 niñas más</b> en 3.er grado. ¿Cómo lo representás?",
          "audio": A("p32_d", "Ingresan 2 niñas más en tercer grado. ¿Cómo lo representás?"),
          "opc": [
            "Con media nena, porque 2 es la mitad de 4",
            "Con 2 nenas",
            "Con 1 nena",
            "Con medio nene"
          ],
          "escribir": [
            {
              "id": "ph_3_x",
              "h": {
                "t": "pers",
                "tipo": "m",
                "mitad": true
              }
            }
          ],
          "destacar": [
            "ph_3"
          ],
          "conf": A("p32_dc", "Cada nena vale 4. Dos niñas son la mitad: se dibuja media nena.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Venta de gaseosas frescas",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "rincon_delicias.jpg",
            "h": 26
          },
          {
            "t": "bandejas",
            "id": "bj",
            "n": 15,
            "por": 6,
            "ocultas": true
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p33_1", "Para vender gaseosas, llenaban vasos y los ponían en bandejas. Juan usaba bandejas de 6 vasos."),
          "chip": "🥤 Bandejas de 6 vasos"
        },
        {
          "audio": A("p33_2", "En su primera salida llenó 15 vasos. Con 6 vasos completa una bandeja,"),
          "mostrar": [
            "bj_b0"
          ],
          "apuntar": "bj_b0",
          "chip": "1 bandeja: 6 vasos"
        },
        {
          "audio": A("p33_3", "con otros 6, otra bandeja más."),
          "mostrar": [
            "bj_b1"
          ],
          "apuntar": "bj_b1",
          "chip": "2 bandejas: 12 vasos"
        },
        {
          "audio": A("p33_4", "Y quedan 3 vasos sin colocar: no alcanzan para otra bandeja."),
          "mostrar": [
            "bj_s"
          ],
          "apuntar": "bj_s",
          "chip": "Sobran 3 vasos"
        },
        {
          "audio": A("p33_5", "Entonces, 15 vasos son 2 bandejas completas y sobran 3."),
          "destacar": [
            "bj"
          ],
          "chip": "15 = 2 × 6 + 3"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las anotaciones de Juan",
      "deco": "rincon_delicias.jpg",
      "vis": {
        "t": "tabla",
        "id": "tj",
        "cab": [
          "Salida",
          "Vasos llenos",
          "Bandejas completas",
          "Vasos sin colocar"
        ],
        "filas": [
          [
            "1.ª",
            "15",
            "2",
            "3"
          ],
          [
            "2.ª",
            "?",
            "5",
            "3"
          ],
          [
            "3.ª",
            "42",
            "?",
            "0"
          ],
          [
            "4.ª",
            "50",
            "?",
            "?"
          ]
        ]
      },
      "pista": A("pi_div", "Pensá cuántas veces entra el 6. Podés ayudarte con la tabla del 6."),
      "instr": A("p34_i", "Juan anotó sus salidas en una tabla. Completá los datos que faltan. Recordá: bandejas de 6 vasos."),
      "items": [
        {
          "preg": "2.ª salida: completó <b>5 bandejas</b> y sobraron <b>3 vasos</b>. ¿Cuántos vasos llenó?",
          "audio": A("p34_a", "En la segunda salida completó 5 bandejas y sobraron 3 vasos. ¿Cuántos vasos llenó?"),
          "destacar": [
            "tj_1_1"
          ],
          "apuntar": "tj_1_1",
          "opc": [
            "33",
            "30",
            "15",
            "53"
          ],
          "escribir": [
            {
              "id": "tj_1_1",
              "h": "33"
            }
          ],
          "conf": A("p34_ac", "5 por 6 es 30, más 3: 33 vasos.")
        },
        {
          "preg": "3.ª salida: llenó <b>42 vasos</b> y no sobró ninguno. ¿Cuántas bandejas completó?",
          "audio": A("p34_b", "En la tercera salida llenó 42 vasos y no sobró ninguno. ¿Cuántas bandejas completó?"),
          "destacar": [
            "tj_2_2"
          ],
          "apuntar": "tj_2_2",
          "opc": [
            "7",
            "6",
            "8",
            "42"
          ],
          "escribir": [
            {
              "id": "tj_2_2",
              "h": "7"
            }
          ],
          "conf": A("p34_bc", "7 por 6 es 42.")
        },
        {
          "preg": "4.ª salida: llenó <b>50 vasos</b>. ¿Cuántas bandejas completó?",
          "audio": A("p34_c", "En la cuarta salida llenó 50 vasos. ¿Cuántas bandejas completó?"),
          "destacar": [
            "tj_3_2"
          ],
          "apuntar": "tj_3_2",
          "opc": [
            "8",
            "9",
            "7",
            "50"
          ],
          "escribir": [
            {
              "id": "tj_3_2",
              "h": "8"
            }
          ],
          "conf": A("p34_cc", "8 por 6 es 48. 9 por 6 sería 54: se pasa. Completó 8.")
        },
        {
          "preg": "Y en la 4.ª salida, ¿cuántos vasos quedaron sin colocar?",
          "audio": A("p34_d", "Y en la cuarta salida, ¿cuántos vasos quedaron sin colocar?"),
          "destacar": [
            "tj_3_3"
          ],
          "apuntar": "tj_3_3",
          "opc": [
            "2",
            "8",
            "0",
            "4"
          ],
          "escribir": [
            {
              "id": "tj_3_3",
              "h": "2"
            }
          ],
          "conf": A("p34_dc", "50 menos 48 es 2 vasos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Dividimos de distintas maneras",
      "deco": "rincon_delicias.jpg",
      "pista": A("pi_div", "Pensá cuántas veces entra el 6. Podés ayudarte con la tabla del 6."),
      "instr": A("p35_i", "Usamos lo que sabemos para dividir."),
      "items": [
        {
          "vis": {
            "t": "caja",
            "cls": "datos",
            "items": [
              {
                "t": "txt",
                "cls": "grande",
                "h": "5.ª salida: <b>30 vasos</b> → 5 bandejas, sobran 0<br>6.ª salida: <b>33 vasos</b> → ¿?"
              }
            ]
          },
          "preg": "En la 6.ª salida llenó <b>33 vasos</b>. Usando la 5.ª salida, ¿cuántas bandejas y cuántos vasos sueltos?",
          "audio": A("p35_a", "En la quinta salida, 30 vasos fueron 5 bandejas justas. En la sexta llenó 33. ¿Cuántas bandejas y cuántos vasos sueltos?"),
          "opc": [
            "5 bandejas y 3 vasos sueltos",
            "6 bandejas y 3 sueltos",
            "5 bandejas y ningún suelto",
            "33 bandejas"
          ],
          "visOk": {
            "t": "bandejas",
            "id": "bk",
            "n": 33,
            "por": 6
          },
          "conf": A("p35_ac", "33 es 30 más 3. Con 30 se completan 5 bandejas, y 3 no llegan a otra.")
        },
        {
          "vis": {
            "t": "fila",
            "cls": "tres",
            "items": [
              {
                "t": "caja",
                "titulo": "Pilar",
                "items": [
                  {
                    "t": "img",
                    "src": "div_pilar.jpg",
                    "h": 22
                  }
                ]
              },
              {
                "t": "caja",
                "titulo": "Guada",
                "items": [
                  {
                    "t": "img",
                    "src": "div_guada.jpg",
                    "h": 22
                  }
                ]
              },
              {
                "t": "caja",
                "titulo": "Juani",
                "items": [
                  {
                    "t": "img",
                    "src": "div_juani.jpg",
                    "h": 22
                  }
                ]
              }
            ]
          },
          "preg": "Hasta la 4.ª salida Juan llenó <b>140 vasos</b>. Pilar, Guada y Juani hicieron <b>140 : 6</b>. ¿Qué resultado obtuvieron?",
          "audio": A("p35_b", "Juan llenó 140 vasos. Pilar, Guada y Juani dividieron 140 por 6. ¿Qué resultado obtuvieron? Tocá las hojas para verlas grandes."),
          "opc": [
            "23 bandejas y sobran 2 vasos",
            "20 bandejas y sobran 20",
            "23 bandejas y no sobra ninguno",
            "24 bandejas y sobran 2"
          ],
          "conf": A("p35_bc", "23 bandejas de 6 son 138. Sobran 2 vasos.")
        },
        {
          "preg": "¿Por qué la cuenta de Guada es más corta que la de Pilar?",
          "audio": A("p35_c", "¿Por qué la cuenta de Guada es más corta que la de Pilar?"),
          "opc": [
            "Porque restó 120 de una vez, en lugar de 60 y 60",
            "Porque usó otros números",
            "Porque se salteó un paso y está mal",
            "Porque dividió por otro número"
          ],
          "conf": A("p35_cc", "Guada usó 20 por 6, 120, de una vez. Pilar hizo 10 por 6 dos veces: 60 y 60.")
        },
        {
          "preg": "En la cuenta de Juani, ¿por qué el <b>12</b> está debajo del <b>14</b>?",
          "audio": A("p35_d", "En la cuenta de Juani, ¿por qué el 12 está debajo del 14?"),
          "opc": [
            "Porque son 12 dieces, o sea 120",
            "Porque son 12 unos",
            "Porque 14 − 2 = 12",
            "Porque está mal ubicado"
          ],
          "conf": A("p35_dc", "Juani reparte 14 dieces: 2 dieces por 6 son 12 dieces, 120. Por eso va debajo del 14.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La cuenta de Estefanía",
      "deco": "rincon_delicias.jpg",
      "pista": A("pi_div", "Pensá cuántas veces entra el 6. Podés ayudarte con la tabla del 6."),
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "pre",
            "h": "  280 │ 6\n− 120   20 + 20 + …\n  160\n− 120\n   40"
          },
          {
            "t": "txt",
            "cls": "grande",
            "h": "🥤 <b>280 vasos</b><br>bandejas de <b>6</b>"
          }
        ]
      },
      "instr": A("p36_i", "Al final, se llenaron 280 vasos. Estefanía empezó a dividir 280 por 6, pero no terminó la cuenta."),
      "items": [
        {
          "preg": "Terminá la cuenta: ¿cuántas bandejas de 6 se completan con 280 vasos, y cuántos vasos sobran?",
          "audio": A("p36_a", "¿Cuántas bandejas de 6 se completan con 280 vasos, y cuántos sobran?"),
          "opc": [
            "46 bandejas y sobran 4",
            "40 bandejas y sobran 40",
            "47 bandejas y no sobra ninguno",
            "46 bandejas y no sobra ninguno"
          ],
          "conf": A("p36_ac", "Quedaban 40: 6 por 6 es 36. 20 más 20 más 6 son 46 bandejas, y sobran 4 vasos.")
        },
        {
          "preg": "Con <b>bandejas de 8</b> para los 280 vasos, ¿se completarían más o menos bandejas?",
          "audio": A("p36_b", "Con bandejas de 8 para los 280 vasos, ¿se completarían más o menos bandejas?"),
          "opc": [
            "Menos, porque en cada bandeja entran más vasos",
            "Más, porque 8 es más que 6",
            "La misma cantidad",
            "No se puede saber"
          ],
          "conf": A("p36_bc", "Menos: si cada bandeja lleva más vasos, se necesitan menos bandejas.")
        },
        {
          "preg": "Resolvé <b>280 : 8</b>.",
          "audio": A("p36_c", "Resolvé 280 dividido 8."),
          "opc": [
            "35",
            "36",
            "30",
            "28"
          ],
          "conf": A("p36_cc", "30 por 8 es 240, y 5 por 8 es 40: 35 bandejas justas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: dividir",
      "deco": "div_juani.jpg",
      "pista": A("pi_div", "Pensá cuántas veces entra el 6. Podés ayudarte con la tabla del 6."),
      "instr": A("p37_i", "Últimos desafíos de división."),
      "items": [
        {
          "vis": {
            "t": "pre",
            "h": "2034 │ 6\n− 600  100\n− 600  100\n− 600  100\n−  60   10\n−  60   10\n−  60   10\n−  18    3\n−  18    3\n−  18    3\n    0"
          },
          "preg": "Esta cuenta está bien, pero es muy larga. ¿Cómo se escribe el cociente más corto?",
          "audio": A("p37_a", "Esta cuenta está bien, pero es muy larga. ¿Cómo se escribe el cociente más corto?"),
          "opc": [
            "300 + 30 + 9 = 339",
            "100 + 10 + 3 = 113",
            "3 + 3 + 3 = 9",
            "600 + 60 + 18 = 678"
          ],
          "conf": A("p37_ac", "Tres veces 100 es 300; tres veces 10, 30; tres veces 3, 9. El cociente es 339.")
        },
        {
          "vis": {
            "t": "pre",
            "h": "6.935 │ 3\n       │ ?"
          },
          "preg": "En <b>6.935 : 3</b>, ¿cuál es el número más grande que se puede anotar primero en el cociente?",
          "audio": A("p37_b", "En 6935 dividido 3, ¿cuál es el número más grande que se puede anotar primero en el cociente?"),
          "opc": [
            "2.000",
            "1.000",
            "3.000"
          ],
          "conf": A("p37_bc", "3 por 2000 es 6000, y entra en 6935. 3 por 3000 es 9000: se pasa.")
        },
        {
          "vis": {
            "t": "caja",
            "titulo": "Juani",
            "items": [
              {
                "t": "img",
                "src": "div_juani.jpg",
                "h": 26
              }
            ]
          },
          "preg": "Con el procedimiento de Juani, ¿cuánto es <b>832 : 3</b>?",
          "audio": A("p37_c", "Con el procedimiento de Juani, ¿cuánto es 832 dividido 3?"),
          "opc": [
            "277 y sobra 1",
            "270 y sobran 32",
            "277 y no sobra nada",
            "27 y sobran 2"
          ],
          "conf": A("p37_cc", "277 por 3 es 831. Sobra 1.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre3", "¡Felicitaciones! Terminaste la Escuela Abierta. Mirá tus resultados y envialos a tu seño.")
    }
  ]
};
