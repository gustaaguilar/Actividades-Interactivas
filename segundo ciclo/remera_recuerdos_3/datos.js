/* datos.js — "Una remera, miles de recuerdos" · Parte 3 · Preparamos el escenario · 7.° grado · Matemática · QueSepanTodos.com
   Elaboración propia basada en «Aventureros de la Matemática 7» (DGE Mendoza, PEAMM), págs. 45 a 49.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Una remera, miles de recuerdos",
    "corto": "Una remera, miles de recuerdos 3",
    "emoji": "👕",
    "parte": "Parte 3 · Preparamos el escenario",
    "subtitulo": "Perímetro, área y volumen: la zona de la coreografía, la caja sorpresa, los envases de polvo flúor y más desafíos",
    "grado": "7.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "caja_regalo.jpg",
    "imgCierre": "envases_charla.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Una remera, miles de recuerdos» (págs. 45 a 49) del cuadernillo «Aventureros de la Matemática 7», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Preparamos el escenario",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "caja_regalo.jpg",
            "h": 24
          },
          {
            "t": "txt",
            "h": "Soga de <b>36 m</b> · 9 m × 9 m = 81 m² · 12 m × 6 m = 72 m² · 15 m × 3 m = 45 m²"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("r17_1", "Para marcar la zona de la coreografía tienen una soga de 36 metros, y la usan toda para formar un rectángulo."),
          "chip": "🪢 Perímetro: 36 m"
        },
        {
          "audio": A("r17_2", "Con el mismo perímetro se pueden armar rectángulos distintos: 9 por 9, 12 por 6, 15 por 3. ¡Pero sus áreas son distintas!"),
          "chip": "Mismo perímetro, distinta área"
        },
        {
          "audio": A("r17_3", "Cada integrante necesita 1 metro cuadrado para moverse cómodo."),
          "chip": "1 m² por integrante"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Rectángulos con 36 m de soga",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "txt",
            "h": "<svg viewBox=\"0 0 220 120\" style=\"height:13vh;display:block;margin:0 auto 4px\"><rect x=\"30\" y=\"18\" width=\"160\" height=\"80\" fill=\"#fde68a\" stroke=\"#b45309\" stroke-width=\"4\" stroke-dasharray=\"10 5\" rx=\"4\"/><text x=\"110\" y=\"64\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#1e2a5a\">Perímetro: 36 m</text><text x=\"110\" y=\"115\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1e2a5a\">largo</text><text x=\"16\" y=\"62\" text-anchor=\"middle\" font-size=\"13\" fill=\"#1e2a5a\" transform=\"rotate(-90 16 62)\">ancho</text></svg>Soga de <b>36 m</b> = perímetro · largo + ancho = <b>18 m</b>"
          },
          {
            "t": "tabla",
            "id": "rc",
            "cab": [
              "Largo (m)",
              "9",
              "10",
              "12",
              "15"
            ],
            "filas": [
              [
                "Ancho (m)",
                "?",
                "?",
                "?",
                "?"
              ],
              [
                "Área (m²)",
                "?",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("r175_p", "Largo más ancho tiene que dar 18, la mitad del perímetro. El área es largo por ancho."),
      "instr": A("r175_i", "Completá la tabla con rectángulos de 36 metros de perímetro."),
      "items": [
        {
          "preg": "Si el largo es <b>9 m</b> y <b>10 m</b>, ¿cuánto mide el ancho?",
          "audio": A("r175_a", "Si el largo es 9 metros, ¿cuánto mide el ancho? ¿Y si es 10?"),
          "destacar": [
            "rc_0_1",
            "rc_0_2"
          ],
          "opc": [
            "9 m y 8 m",
            "27 m y 26 m",
            "18 m y 18 m",
            "4 m y 3,6 m"
          ],
          "escribir": [
            {
              "id": "rc_0_1",
              "h": "9"
            },
            {
              "id": "rc_0_2",
              "h": "8"
            }
          ],
          "conf": A("r175_ac", "18 menos 9 es 9, y 18 menos 10 es 8.")
        },
        {
          "preg": "Si el largo es <b>12 m</b> y <b>15 m</b>, ¿cuánto mide el ancho?",
          "audio": A("r175_b", "¿Y si el largo es 12 o 15 metros?"),
          "destacar": [
            "rc_0_3",
            "rc_0_4"
          ],
          "opc": [
            "6 m y 3 m",
            "24 m y 21 m",
            "3 m y 2,4 m",
            "6 m y 4 m"
          ],
          "escribir": [
            {
              "id": "rc_0_3",
              "h": "6"
            },
            {
              "id": "rc_0_4",
              "h": "3"
            }
          ],
          "conf": A("r175_bc", "18 menos 12 es 6, y 18 menos 15 es 3.")
        },
        {
          "preg": "¿Cuál es el <b>área</b> de cada rectángulo?",
          "audio": A("r175_c", "¿Cuál es el área de cada rectángulo?"),
          "destacar": [
            "rc_1_1",
            "rc_1_2",
            "rc_1_3",
            "rc_1_4"
          ],
          "opc": [
            "81, 80, 72 y 45 m²",
            "36, 36, 36 y 36 m²",
            "18, 18, 18 y 18 m²",
            "81, 90, 72 y 60 m²"
          ],
          "escribir": [
            {
              "id": "rc_1_1",
              "h": "81"
            },
            {
              "id": "rc_1_2",
              "h": "80"
            },
            {
              "id": "rc_1_3",
              "h": "72"
            },
            {
              "id": "rc_1_4",
              "h": "45"
            }
          ],
          "conf": A("r175_cc", "9 por 9, 81; 10 por 8, 80; 12 por 6, 72; 15 por 3, 45. ¡Mismo perímetro, distintas áreas!")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La zona de la coreografía",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Perímetro: 36 m · largo + ancho = 18 m</div>"
      },
      "deco": "caja_regalo.jpg",
      "pista": A("r18_p", "Largo más ancho tiene que dar 18, la mitad del perímetro."),
      "instr": A("r18_i", "Pensemos otras zonas rectangulares con los mismos 36 metros de soga."),
      "items": [
        {
          "preg": "¿Cuál de estos rectángulos <b>también</b> usa toda la soga?",
          "audio": A("r18_a", "¿Cuál de estos rectángulos también usa los 36 metros de soga?"),
          "opc": [
            "10 m × 8 m",
            "10 m × 10 m",
            "20 m × 16 m",
            "9 m × 4 m"
          ],
          "conf": A("r18_ac", "10 más 8 es 18, y por 2, 36 metros.")
        },
        {
          "preg": "En la zona de <b>10 m × 8 m</b>, ¿cuántos estudiantes entran como máximo?",
          "audio": A("r18_b", "En la zona de 10 por 8 metros, ¿cuántos estudiantes entran como máximo?"),
          "opc": [
            "80",
            "36",
            "18",
            "72"
          ],
          "conf": A("r18_bc", "El área es 80 metros cuadrados: entran 80 estudiantes.")
        },
        {
          "preg": "¿Qué rectángulo de 36 m de perímetro tiene la <b>mayor área</b>?",
          "audio": A("r18_c", "¿Qué rectángulo de 36 metros de perímetro tiene la mayor área?"),
          "opc": [
            "El cuadrado de 9 m × 9 m: 81 m²",
            "10 m × 8 m: 80 m²",
            "12 m × 6 m: 72 m²",
            "Todos tienen la misma área"
          ],
          "conf": A("r18_cc", "El cuadrado, 9 por 9: 81 metros cuadrados, la mayor área posible.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La caja sorpresa",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "caja_regalo.jpg",
            "h": 24
          },
          {
            "t": "txt",
            "h": "Base: <b>9 m × 9 m</b> · Altura: <b>1,5 m</b> · Cartón: <b>$500 el m²</b> · Hay <b>$30.000</b>"
          }
        ]
      },
      "pista": A("r_pi_vol", "Volumen del prisma: área de la base por la altura. Volumen de la pirámide: la tercera parte de eso."),
      "instr": A("r19_i", "Van a salir de una gran caja de regalo, con la base de 9 por 9 metros y 1,5 metros de altura."),
      "items": [
        {
          "preg": "¿Cuál es el <b>volumen</b> de la caja?",
          "audio": A("r19_a", "¿Cuál es el volumen de la caja?"),
          "opc": [
            "121,5 m³",
            "81 m³",
            "13,5 m³",
            "135 m³"
          ],
          "conf": A("r19_ac", "Área de la base, 81, por la altura, 1,5: 121,5 metros cúbicos.")
        },
        {
          "preg": "Se cubren las <b>4 caras laterales y el techo</b>. ¿Cuántos m² de cartón?",
          "audio": A("r19_b", "Se cubren con cartón las 4 caras laterales y el techo. ¿Cuántos metros cuadrados hacen falta?"),
          "opc": [
            "135 m²",
            "162 m²",
            "81 m²",
            "54 m²"
          ],
          "conf": A("r19_bc", "Cada lateral es 9 por 1,5, 13,5; los 4 suman 54. Más el techo, 81: 135 metros cuadrados.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El presupuesto del cartón",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "caja_regalo.jpg",
            "h": 24
          },
          {
            "t": "txt",
            "h": "Cartón necesario: <b>135 m²</b> · Precio: <b>$500 el m²</b> · Hay <b>$30.000</b>"
          }
        ]
      },
      "pista": A("r19b_p", "Calculá el 10 por ciento de 135 y sumalo. Después multiplicá por 500."),
      "instr": A("r19b_i", "Ahora calculemos cuánto cartón comprar y cuánto cuesta."),
      "items": [
        {
          "preg": "Se desperdicia un <b>10%</b>. ¿Cuántos m² hay que comprar?",
          "audio": A("r19_c", "Al cortar se desperdicia un 10 por ciento. ¿Cuántos metros cuadrados hay que comprar?"),
          "opc": [
            "148,5 m²",
            "145 m²",
            "121,5 m²",
            "135 m²"
          ],
          "conf": A("r19_cc", "El 10 por ciento de 135 es 13,5. 135 más 13,5: 148,5 metros cuadrados.")
        },
        {
          "preg": "¿Alcanzan los <b>$30.000</b>?",
          "audio": A("r19_d", "El metro cuadrado cuesta 500 pesos y tienen 30000. ¿Alcanza?"),
          "opc": [
            "No: hacen falta $74.250",
            "Sí: sobran $5.000",
            "Sí: justo",
            "No: faltan $500"
          ],
          "conf": A("r19_dc", "148,5 por 500 es 74250 pesos. No alcanza.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Reducir la caja a la mitad",
      "vis": {
        "t": "img",
        "src": "caja_regalo.jpg",
        "h": 28
      },
      "pista": A("r_pi_vol", "Volumen del prisma: área de la base por la altura. Volumen de la pirámide: la tercera parte de eso."),
      "instr": A("r20_i", "Candela, Agustín y Victoria discuten cómo reducir a la mitad el volumen de la caja."),
      "items": [
        {
          "preg": "Candela: «Hay que reducir a la mitad <b>alto, ancho y largo</b>». ¿Qué pasa con el volumen?",
          "audio": A("r20_a", "Candela dice que hay que reducir a la mitad el alto, el ancho y el largo. ¿Qué pasa con el volumen?"),
          "opc": [
            "Queda la octava parte",
            "Queda la mitad",
            "Queda la cuarta parte",
            "No cambia"
          ],
          "conf": A("r20_ac", "Un medio por un medio por un medio es un octavo: queda la octava parte.")
        },
        {
          "preg": "Agustín: «Hay que reducir a la mitad <b>ancho y largo</b>». ¿Qué pasa con el volumen?",
          "audio": A("r20_b", "Agustín dice que hay que reducir a la mitad el ancho y el largo. ¿Qué pasa con el volumen?"),
          "opc": [
            "Queda la cuarta parte",
            "Queda la mitad",
            "Queda la octava parte",
            "Se duplica"
          ],
          "conf": A("r20_bc", "La base queda a la cuarta parte, y el volumen también.")
        },
        {
          "preg": "Victoria: «Basta reducir a la mitad <b>una sola</b> dimensión». ¿Tiene razón?",
          "audio": A("r20_c", "Victoria dice que basta reducir a la mitad una sola dimensión. ¿Tiene razón?"),
          "opc": [
            "Sí: el volumen queda a la mitad",
            "No: queda la cuarta parte",
            "No: no cambia",
            "No: queda la octava parte"
          ],
          "conf": A("r20_cc", "Victoria tiene razón: con una sola dimensión a la mitad, por ejemplo 4,5 por 9 por 1,5, el volumen es 60,75, la mitad.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "El volumen de los cuerpos",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "envases.jpg",
            "h": 28
          },
          {
            "t": "txt",
            "h": "<b>Prisma:</b> base × altura · <b>Pirámide:</b> base × altura ÷ 3 · <b>Cilindro:</b> π × radio² × altura"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("r205_1", "Para la fiesta van a tirar polvo flúor, y tienen que elegir el envase. Primero repasemos cómo se calcula el volumen."),
          "chip": "✨ El envase del polvo flúor"
        },
        {
          "audio": A("r205_2", "El volumen de un prisma es el área de la base por la altura. El de una pirámide con la misma base y la misma altura es la tercera parte."),
          "chip": "Pirámide = prisma ÷ 3"
        },
        {
          "audio": A("r205_3", "El cilindro tiene base circular: su volumen es pi por el radio al cuadrado, por la altura."),
          "chip": "Cilindro = π · r² · h"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los envases de polvo flúor",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "envases.jpg",
            "h": 28
          },
          {
            "t": "txt",
            "h": "Cada envase debe contener <b>300 cm³</b>"
          }
        ]
      },
      "pista": A("r_pi_vol", "Volumen del prisma: área de la base por la altura. Volumen de la pirámide: la tercera parte de eso."),
      "instr": A("r21_i", "Cada envase debe contener 300 centímetros cúbicos de polvo flúor. Calculá el volumen de cada opción."),
      "items": [
        {
          "preg": "Prisma pentagonal: base <b>50 cm²</b>, altura <b>6 cm</b>. ¿Volumen?",
          "audio": A("r21_a", "El prisma de base pentagonal tiene 50 centímetros cuadrados de base y 6 de altura. ¿Cuál es su volumen?"),
          "opc": [
            "300 cm³",
            "100 cm³",
            "56 cm³",
            "150 cm³"
          ],
          "conf": A("r21_ac", "50 por 6: 300 centímetros cúbicos. ¡Justo!")
        },
        {
          "preg": "Pirámide de base cuadrada: arista <b>10 cm</b>, altura <b>6 cm</b>. ¿Volumen?",
          "audio": A("r21_b", "La pirámide de base cuadrada tiene 10 centímetros de arista en la base y 6 de altura. ¿Cuál es su volumen?"),
          "opc": [
            "200 cm³",
            "600 cm³",
            "300 cm³",
            "60 cm³"
          ],
          "conf": A("r21_bc", "10 por 10 por 6 es 600, y la pirámide es la tercera parte: 200 centímetros cúbicos.")
        },
        {
          "preg": "Cilindro: radio <b>3 cm</b>, altura <b>10 cm</b>. ¿Volumen aproximado?",
          "audio": A("r21_c", "El cilindro tiene 3 centímetros de radio y 10 de altura. ¿Cuál es su volumen aproximado?"),
          "opc": [
            "282,6 cm³",
            "300 cm³",
            "94,2 cm³",
            "188,4 cm³"
          ],
          "conf": A("r21_cc", "Pi por 3 al cuadrado por 10: unos 282,6 centímetros cúbicos.")
        },
        {
          "preg": "¿Qué envase hay que elegir?",
          "audio": A("r21_d", "¿Qué envase hay que elegir?"),
          "opc": [
            "El prisma pentagonal",
            "La pirámide",
            "El cilindro",
            "Cualquiera"
          ],
          "conf": A("r21_dc", "El prisma pentagonal: es el único que contiene 300 centímetros cúbicos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Quién tiene razón?",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "envases_charla.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "h": "Candela: prisma de <b>10 × 10 × 15 cm</b> · Agustín: pirámide de base <b>30 × 20 cm</b> y altura <b>7,5 cm</b>"
          }
        ]
      },
      "pista": A("r_pi_vol", "Volumen del prisma: área de la base por la altura. Volumen de la pirámide: la tercera parte de eso."),
      "instr": A("r22_i", "Candela tiene un prisma de 10 por 10 por 15 centímetros. Agustín, una pirámide de base 30 por 20 centímetros y 7,5 de altura."),
      "items": [
        {
          "preg": "¿Cuál es el volumen del envase de <b>Candela</b> (10 × 10 × 15)?",
          "audio": A("r22_a", "¿Cuál es el volumen del envase de Candela?"),
          "opc": [
            "1.500 cm³",
            "35 cm³",
            "150 cm³",
            "4.500 cm³"
          ],
          "conf": A("r22_ac", "10 por 10 por 15: 1500 centímetros cúbicos.")
        },
        {
          "preg": "¿Y el de <b>Agustín</b> (pirámide 30 × 20 × 7,5)?",
          "audio": A("r22_b", "¿Y el volumen del envase de Agustín?"),
          "opc": [
            "1.500 cm³",
            "4.500 cm³",
            "57,5 cm³",
            "3.000 cm³"
          ],
          "conf": A("r22_bc", "30 por 20 por 7,5 es 4500, y la tercera parte es 1500 centímetros cúbicos.")
        },
        {
          "preg": "Candela dice que en su envase cabe más. ¿Quién tiene razón?",
          "audio": A("r22_c", "Candela dice que en su envase cabe más, y Agustín dice que en los dos cabe lo mismo. ¿Quién tiene razón?"),
          "opc": [
            "Agustín: en los dos caben 1.500 cm³",
            "Candela",
            "Ninguno",
            "No se puede saber"
          ],
          "conf": A("r22_cc", "Agustín: los dos envases tienen 1500 centímetros cúbicos, aunque tengan formas distintas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el contenedor",
      "deco": "caja_regalo.jpg",
      "pista": A("r_pi_vol", "Volumen del prisma: área de la base por la altura. Volumen de la pirámide: la tercera parte de eso."),
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Contenedor: 2 m × 1,5 m × 1,8 m</div>"
      },
      "instr": A("r23_i", "Un contenedor de residuos tiene forma de prisma rectangular."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">Contenedor: 2 m × 1,5 m × 1,8 m</div>"
          },
          "preg": "¿Cuál es la capacidad del contenedor?",
          "audio": A("r23_a", "Un contenedor mide 2 metros de largo, 1,5 de ancho y 1,8 de alto. ¿Cuál es su capacidad?"),
          "opc": [
            "5,4 m³",
            "5,3 m³",
            "3 m³",
            "10,8 m³"
          ],
          "conf": A("r23_ac", "2 por 1,5 por 1,8: 5,4 metros cúbicos.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">Contenedor: 2 m × 1,5 m × 1,8 m</div>"
          },
          "preg": "Se pintan las <b>4 caras laterales y la tapa</b>. ¿Cuántos m²?",
          "audio": A("r23_b", "Se pintan las 4 caras laterales y la tapa. ¿Cuántos metros cuadrados son?"),
          "opc": [
            "15,6 m²",
            "18,6 m²",
            "12,6 m²",
            "5,4 m²"
          ],
          "conf": A("r23_bc", "Laterales: 2 por 3,6 más 2 por 2,7, 12,6. Más la tapa, 3: 15,6 metros cuadrados.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">Contenedor: 2 m × 1,5 m × 1,8 m</div>"
          },
          "preg": "¿Qué medidas tendría un contenedor con el <b>doble de capacidad</b>?",
          "audio": A("r23_c", "¿Qué medidas podría tener un contenedor con el doble de capacidad?"),
          "opc": [
            "4 m × 1,5 m × 1,8 m",
            "4 m × 3 m × 3,6 m",
            "4 m × 3 m × 1,8 m",
            "2 m × 3 m × 3,6 m"
          ],
          "conf": A("r23_cc", "Duplicando una sola medida, por ejemplo el largo, la capacidad se duplica: 10,8 metros cúbicos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el camión de la ONG",
      "deco": "caja_regalo.jpg",
      "pista": A("r23b_p", "Fijate cuántas cajas entran a lo largo, a lo ancho y a lo alto."),
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Cajas: cubos de 0,5 m · Camión: 4 m × 2 m × 2,2 m</div>"
      },
      "instr": A("r23b_i", "Una ONG carga cajas cúbicas de medio metro de lado en un camión."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">Cajas: cubos de 0,5 m · Camión: 4 m × 2 m × 2,2 m</div>"
          },
          "preg": "¿Cuántas cajas entran en el camión?",
          "audio": A("r23_d", "Cajas cúbicas de medio metro de lado en un camión de 4 por 2 por 2,2 metros. ¿Cuántas entran?"),
          "opc": [
            "128",
            "140,8",
            "144",
            "96"
          ],
          "conf": A("r23_dc", "A lo largo 8, a lo ancho 4, y a lo alto 4, porque la quinta capa no entra: 8 por 4 por 4, 128 cajas.")
        },
        {
          "preg": "Cada caja ocupa <b>0,125 m³</b>. ¿Cuántos <b>m³</b> ocupan esas 128 cajas?",
          "audio": A("r23_e", "Cada caja ocupa 0,125 metros cúbicos. ¿Cuántos metros cúbicos ocupan las 128 cajas?"),
          "opc": [
            "16 m³",
            "17,6 m³",
            "64 m³",
            "12,8 m³"
          ],
          "conf": A("r23_ec", "128 por 0,125: 16 metros cúbicos. El camión tiene 17,6, así que queda un espacio libre arriba.")
        },
        {
          "preg": "Si las cajas fueran cubos de <b>1 m</b>, ¿cuántas entrarían?",
          "audio": A("r23_f", "Si las cajas fueran cubos de 1 metro de lado, ¿cuántas entrarían?"),
          "opc": [
            "16",
            "17",
            "8",
            "128"
          ],
          "conf": A("r23_fc", "4 a lo largo, 2 a lo ancho y 2 a lo alto: 16 cajas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el Eco-Parque",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "ecoparque.jpg",
            "h": 28
          },
          {
            "t": "txt",
            "h": "Terreno: <b>30 m × 20 m</b> · Triángulo que no se usa: <b>10 m × 10 m</b>"
          }
        ]
      },
      "pista": A("r24_p", "Al rectángulo completo restale el triángulo de la esquina."),
      "instr": A("r24_i", "El terreno mide 30 por 20 metros, y tiene en una esquina un triángulo de 10 por 10 metros que no se puede usar."),
      "items": [
        {
          "preg": "¿Cuál es el área disponible para el parque?",
          "audio": A("r24_a", "¿Cuál es el área disponible para el parque?"),
          "opc": [
            "550 m²",
            "600 m²",
            "500 m²",
            "450 m²"
          ],
          "conf": A("r24_ac", "El rectángulo tiene 600 metros cuadrados, y el triángulo, 10 por 10 dividido 2, 50. Quedan 550.")
        },
        {
          "preg": "¿Cuántos metros de cerco hay que comprar, dejando afuera el triángulo?",
          "audio": A("r24_b", "¿Cuántos metros de cerco hay que comprar, dejando afuera la zona del triángulo?"),
          "opc": [
            "94,142 m",
            "100 m",
            "80 m",
            "84,142 m"
          ],
          "conf": A("r24_bc", "30 más 20 más 20 más 10 más 14,142: 94,142 metros.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del escenario",
      "n": 11,
      "img": "caja_regalo.jpg",
      "instr": A("r25_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "PERIMETRO",
          "audio": A("r25_1", "Perímetro: el contorno, 36 metros de soga.")
        },
        {
          "w": "AREA",
          "audio": A("r25_2", "Área: la superficie, en metros cuadrados.")
        },
        {
          "w": "VOLUMEN",
          "audio": A("r25_3", "Volumen: lo que ocupa un cuerpo.")
        },
        {
          "w": "PRISMA",
          "audio": A("r25_4", "Prisma: base por altura.")
        },
        {
          "w": "PIRAMIDE",
          "audio": A("r25_5", "Pirámide: la tercera parte del prisma.")
        },
        {
          "w": "CILINDRO",
          "audio": A("r25_6", "Cilindro: base circular.")
        },
        {
          "w": "CARTON",
          "audio": A("r25_7", "Cartón: para armar la caja sorpresa.")
        }
      ],
      "fin": A("r25_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre3", "¡Felicitaciones! Terminaste «Una remera, miles de recuerdos». Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
