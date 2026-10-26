/* datos.js — "Bienvenidos a la Escuela Abierta" · Parte 2 · Figuras, datos y distintivos · 3er grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 3 (DGE Mendoza), págs. 39 a 44 y 52 a 53.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Bienvenidos a la Escuela Abierta",
    "subtitulo": "Guardas y patrones, pesca de figuras, triángulos, tablas y gráficos de barras, y el compás",
    "grado": "3er grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "pesca_puesto.jpg",
    "imgCierre": "pesca_lautaro.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Bienvenidos a la Escuela Abierta» (págs. 39 a 44 y 52 a 53) del cuadernillo «Aventureros de la Matemática 3», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo.",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "corto": "Escuela Abierta 2",
    "parte": "Parte 2 · Figuras, datos y distintivos"
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Exploradores de figuras",
      "vis": {
        "t": "guarda",
        "id": "gr",
        "seq": [
          "trirectGuarda",
          "cuadrado",
          "circulo",
          "equilatero",
          "rectangulo",
          "trirectGuarda",
          "cuadrado",
          "circulo",
          "equilatero",
          "rectangulo"
        ],
        "h": 7
      },
      "pasos": [
        {
          "audio": A("p13_1", "En la feria de la Escuela Abierta, uno de los juegos es copiar una guarda con figuras. Gana el que la arma más rápido. Esta es la guarda de Ramiro."),
          "chip": "🔷 La guarda de Ramiro"
        },
        {
          "audio": A("p13_2", "Tiene un triángulo con un ángulo recto,"),
          "destacar": [
            "gr_0"
          ],
          "apuntar": "gr_0",
          "chip": "triángulo con ángulo recto"
        },
        {
          "audio": A("p13_3", "un cuadrado,"),
          "destacar": [
            "gr_1"
          ],
          "apuntar": "gr_1",
          "chip": "cuadrado"
        },
        {
          "audio": A("p13_4", "un círculo,"),
          "destacar": [
            "gr_2"
          ],
          "apuntar": "gr_2",
          "chip": "círculo"
        },
        {
          "audio": A("p13_5", "otro triángulo"),
          "destacar": [
            "gr_3"
          ],
          "apuntar": "gr_3",
          "chip": "triángulo"
        },
        {
          "audio": A("p13_6", "y un rectángulo."),
          "destacar": [
            "gr_4"
          ],
          "apuntar": "gr_4",
          "chip": "rectángulo"
        },
        {
          "audio": A("p13_7", "Después, las mismas figuras se repiten en el mismo orden. Ese grupo que se repite se llama patrón."),
          "destacar": [
            "gr_5",
            "gr_6",
            "gr_7",
            "gr_8",
            "gr_9"
          ],
          "apuntar": "gr_7",
          "chip": "🔁 El patrón se repite"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La guarda de Ramiro",
      "instr": A("p14_i", "Observá bien la guarda y respondé."),
      "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura."),
      "items": [
        {
          "vis": {
            "t": "guarda",
            "id": "gr",
            "seq": [
              "trirectGuarda",
              "cuadrado",
              "circulo",
              "equilatero",
              "rectangulo",
              "trirectGuarda",
              "cuadrado",
              "circulo",
              "equilatero",
              "rectangulo"
            ],
            "h": 7
          },
          "preg": "¿Cada cuántas figuras vuelve a empezar el dibujo?",
          "audio": A("p14_a", "¿Cada cuántas figuras vuelve a empezar el dibujo?"),
          "opc": [
            "5",
            "4",
            "2",
            "10"
          ],
          "conf": A("p14_ac", "Cada 5 figuras vuelve a empezar. Ese es el patrón."),
          "escribir": []
        },
        {
          "vis": {
            "t": "col",
            "items": [
              {
                "t": "txt",
                "h": "<b>Modelo</b>"
              },
              {
                "t": "guarda",
                "id": "gm",
                "seq": [
                  "trirectGuarda",
                  "cuadrado",
                  "circulo",
                  "equilatero",
                  "rectangulo",
                  "trirectGuarda",
                  "cuadrado",
                  "circulo",
                  "equilatero",
                  "rectangulo"
                ],
                "h": 6
              },
              {
                "t": "txt",
                "h": "<b>Guarda de Ramiro</b>"
              },
              {
                "t": "guarda",
                "id": "gq",
                "seq": [
                  "trirectGuarda",
                  "rectangulo",
                  "circulo",
                  "equilatero",
                  "rectangulo",
                  "trirectGuarda",
                  "rectangulo",
                  "circulo",
                  "equilatero",
                  "rectangulo"
                ],
                "h": 6
              }
            ]
          },
          "preg": "Ramiro terminó primero y armó su guarda así. ¿La armó bien?",
          "audio": A("p14_b", "Ramiro terminó primero y armó su guarda así. ¿La armó bien?"),
          "opc": [
            "No: puso un rectángulo en lugar del cuadrado",
            "Sí: está igual que el modelo",
            "No: le faltan los círculos",
            "No: cambió el lugar de los triángulos"
          ],
          "visOk": {
            "t": "col",
            "items": [
              {
                "t": "txt",
                "h": "<b>Modelo</b>"
              },
              {
                "t": "guarda",
                "id": "gm",
                "seq": [
                  "trirectGuarda",
                  "cuadrado",
                  "circulo",
                  "equilatero",
                  "rectangulo",
                  "trirectGuarda",
                  "cuadrado",
                  "circulo",
                  "equilatero",
                  "rectangulo"
                ],
                "h": 6,
                "malas": [
                  1,
                  6
                ]
              },
              {
                "t": "txt",
                "h": "<b>Guarda de Ramiro</b>"
              },
              {
                "t": "guarda",
                "id": "gq",
                "seq": [
                  "trirectGuarda",
                  "rectangulo",
                  "circulo",
                  "equilatero",
                  "rectangulo",
                  "trirectGuarda",
                  "rectangulo",
                  "circulo",
                  "equilatero",
                  "rectangulo"
                ],
                "h": 6,
                "malas": [
                  1,
                  6
                ]
              }
            ]
          },
          "conf": A("p14_bc", "Ramiro se confundió: puso un rectángulo donde iba el cuadrado.")
        },
        {
          "preg": "¿Qué le dirías a Ramiro para que no se confunda?",
          "audio": A("p14_c", "¿Qué le dirías a Ramiro para que no se confunda?"),
          "opc": [
            "Que se fije si los 4 lados son iguales: así es el cuadrado",
            "Que se fije en el color de las figuras",
            "Que arme más rápido",
            "Que use solo triángulos"
          ],
          "conf": A("p14_cc", "El cuadrado y el rectángulo tienen 4 ángulos rectos, pero solo el cuadrado tiene sus 4 lados iguales.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las secuencias de Pilar",
      "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura."),
      "instr": A("p15_i", "Pilar eligió secuencias de figuras. Descubrí el patrón."),
      "items": [
        {
          "vis": {
            "t": "guarda",
            "id": "sq",
            "c": "#16a34a",
            "h": 7,
            "seq": [
              "cuadrado",
              "triangulo",
              "triangulo",
              "rectangulo",
              "cuadrado",
              "triangulo",
              "triangulo",
              "rectangulo"
            ],
            "huecos": [
              6
            ]
          },
          "preg": "¿Qué figura falta en la secuencia?",
          "audio": A("p15_a", "¿Qué figura falta en la secuencia?"),
          "opc": [
            {
              "t": "fig",
              "f": "triangulo",
              "c": "#16a34a",
              "h": 8
            },
            {
              "t": "fig",
              "f": "cuadrado",
              "c": "#16a34a",
              "h": 8
            },
            {
              "t": "fig",
              "f": "rectangulo",
              "c": "#16a34a",
              "h": 8
            },
            {
              "t": "fig",
              "f": "circulo",
              "c": "#16a34a",
              "h": 8
            }
          ],
          "escribir": [
            {
              "id": "sq_6",
              "h": {
                "t": "fig",
                "f": "triangulo",
                "c": "#16a34a",
                "h": 8
              }
            }
          ],
          "conf": A("p15_ac", "Falta un triángulo. El patrón es cuadrado, triángulo, triángulo, rectángulo.")
        },
        {
          "vis": {
            "t": "guarda",
            "id": "sr",
            "c": "#16a34a",
            "h": 9,
            "seq": [
              "equilatero",
              "obtuso",
              "triangulo"
            ]
          },
          "preg": "En esta secuencia todas las figuras son triángulos. ¿En qué se diferencian?",
          "audio": A("p15_b", "En esta secuencia todos son triángulos. ¿En qué se diferencian?"),
          "opc": [
            "En la medida de sus lados y de sus ángulos",
            "En la cantidad de lados",
            "En el color",
            "No se diferencian"
          ],
          "conf": A("p15_bc", "Todos tienen 3 lados, pero cambian la medida de los lados y la abertura de los ángulos.")
        },
        {
          "vis": {
            "t": "guarda",
            "id": "ss",
            "c": "#16a34a",
            "h": 9,
            "seq": [
              "cuadrado",
              "triangulo",
              "triangulo",
              "rectangulo"
            ]
          },
          "preg": "¿En qué se parecen el cuadrado y el rectángulo?",
          "audio": A("p15_c", "¿En qué se parecen el cuadrado y el rectángulo?"),
          "opc": [
            "Los dos tienen 4 lados y 4 ángulos rectos",
            "Los dos tienen sus 4 lados iguales",
            "Los dos tienen 3 lados",
            "No se parecen en nada"
          ],
          "conf": A("p15_cc", "Los dos tienen 4 lados y 4 ángulos rectos. Se diferencian en que el cuadrado tiene todos sus lados iguales.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Pescando figuras geométricas",
      "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura."),
      "instr": A("p16_i", "En este juego, los dos jugadores reciben la misma tarjeta. Gana quien pesca la figura correcta."),
      "items": [
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "tarjeta",
                "txt": "Tiene cuatro ángulos rectos y todos sus lados de igual medida."
              },
              {
                "t": "img",
                "src": "pesca_pilar_juani.jpg",
                "h": 30
              }
            ]
          },
          "preg": "Pilar sacó la figura azul y Juani la roja. ¿Quién ganó?",
          "audio": A("p16_a", "La tarjeta dice: tiene cuatro ángulos rectos y todos sus lados de igual medida. Pilar sacó la figura azul y Juani la roja. ¿Quién ganó?"),
          "opc": [
            "Pilar: pescó el cuadrado",
            "Juani: pescó el rectángulo",
            "Ganaron los dos",
            "Ninguno de los dos"
          ],
          "conf": A("p16_ac", "Ganó Pilar. El rectángulo de Juani tiene ángulos rectos, pero no todos sus lados iguales.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "tarjeta",
                "txt": "Tiene tres lados y un ángulo recto."
              },
              {
                "t": "img",
                "src": "pesca_franco_ramiro.jpg",
                "h": 30
              }
            ]
          },
          "preg": "Franco y Ramiro pescaron una figura cada uno. ¿Alguien ganó?",
          "audio": A("p16_b", "La tarjeta dice: tiene tres lados y un ángulo recto. ¿Alguien ganó?"),
          "opc": [
            "Sí, Ramiro: su triángulo tiene un ángulo recto",
            "Sí, Franco: su triángulo tiene un ángulo recto",
            "Ganaron los dos",
            "Nadie ganó"
          ],
          "conf": A("p16_bc", "Ganó Ramiro. Los dos pescaron triángulos, pero solo el de Ramiro tiene un ángulo recto.")
        },
        {
          "vis": {
            "t": "img",
            "src": "pesca_lautaro.jpg",
            "h": 32
          },
          "preg": "Lautaro ganó y pescó la figura amarilla. ¿Qué decía su tarjeta?",
          "audio": A("p16_c", "Lautaro ganó y pescó la figura amarilla. ¿Qué decía su tarjeta?"),
          "opc": [
            "Tiene cuatro ángulos rectos y sus lados opuestos de igual medida",
            "Tiene tres lados y un ángulo recto",
            "Tiene cuatro lados iguales y ningún ángulo recto",
            "No tiene lados rectos"
          ],
          "conf": A("p16_cc", "Pescó un rectángulo: cuatro ángulos rectos, dos lados largos y dos cortos.")
        }
      ]
    },
    {
      "tipo": "pesca",
      "titulo": "¡A pescar figuras!",
      "img": "pesca_puesto.jpg",
      "instr": A("p17_i", "¡Ahora jugás vos! Leé la tarjeta y tocá la figura que cumple con todo lo que dice."),
      "figuras": [
        {
          "id": "cuadrado",
          "f": "cuadrado",
          "c": "#3b82f6"
        },
        {
          "id": "rectangulo",
          "f": "rectangulo",
          "c": "#ef4444"
        },
        {
          "id": "circulo",
          "f": "circulo",
          "c": "#facc15"
        },
        {
          "id": "triangulo",
          "f": "triangulo",
          "c": "#22c55e"
        },
        {
          "id": "trirect",
          "f": "trirect",
          "c": "#f97316"
        },
        {
          "id": "equilatero",
          "f": "equilatero",
          "c": "#a855f7"
        },
        {
          "id": "rombo",
          "f": "rombo",
          "c": "#06b6d4"
        },
        {
          "id": "trapecio",
          "f": "trapecio",
          "c": "#ec4899"
        }
      ],
      "items": [
        {
          "txt": "Tiene cuatro ángulos rectos y todos sus lados de igual medida.",
          "ok": "cuadrado",
          "audio": A("p17_a", "Tiene cuatro ángulos rectos y todos sus lados de igual medida."),
          "conf": A("p17_ac", "¡Pescaste el cuadrado!"),
          "pista": A("p17_ap", "Ojo: el rombo tiene sus lados iguales, pero sus ángulos no son rectos.")
        },
        {
          "txt": "Tiene tres lados y un ángulo recto.",
          "ok": "trirect",
          "audio": A("p17_b", "Tiene tres lados y un ángulo recto."),
          "conf": A("p17_bc", "¡Muy bien! Un triángulo con un ángulo recto, como la esquina de una hoja."),
          "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura.")
        },
        {
          "txt": "No tiene lados ni vértices: su borde es una línea curva.",
          "ok": "circulo",
          "audio": A("p17_c", "No tiene lados ni vértices: su borde es una línea curva."),
          "conf": A("p17_cc", "¡El círculo! Su borde es una línea curva."),
          "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura.")
        },
        {
          "txt": "Tiene cuatro ángulos rectos, dos lados largos y dos cortos.",
          "ok": "rectangulo",
          "audio": A("p17_d", "Tiene cuatro ángulos rectos, dos lados largos y dos cortos."),
          "conf": A("p17_dc", "¡El rectángulo! Sus lados opuestos son iguales."),
          "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura.")
        },
        {
          "txt": "Tiene tres lados de igual medida.",
          "ok": "equilatero",
          "audio": A("p17_e", "Tiene tres lados de igual medida."),
          "conf": A("p17_ec", "¡Excelente! Un triángulo con sus tres lados iguales."),
          "pista": A("p17_ep", "Hay dos triángulos parecidos. Buscá el que tiene los tres lados iguales.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: armamos figuras",
      "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura."),
      "instr": A("p18_i", "Con dos figuras iguales se pueden formar otras. Elegí qué figura se forma."),
      "items": [
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "fig",
                "f": "trirect",
                "c": "#c8a26b",
                "h": 12
              },
              {
                "t": "txt",
                "cls": "grande",
                "h": "+"
              },
              {
                "t": "fig",
                "f": "trirect",
                "c": "#c8a26b",
                "h": 12
              }
            ]
          },
          "preg": "Con <b>dos triángulos marrones</b> iguales, ¿qué figura se forma?",
          "audio": A("p18_a", "Con dos triángulos marrones iguales, ¿qué figura se forma?"),
          "opc": [
            {
              "t": "fig",
              "f": "cuadrado",
              "c": "#c8a26b",
              "h": 8
            },
            {
              "t": "fig",
              "f": "rectangulo",
              "c": "#c8a26b",
              "h": 8
            },
            {
              "t": "fig",
              "f": "circulo",
              "c": "#c8a26b",
              "h": 8
            },
            {
              "t": "fig",
              "f": "rombo",
              "c": "#c8a26b",
              "h": 8
            }
          ],
          "visOk": {
            "t": "union",
            "m": "cuadrado"
          },
          "conf": A("p18_ac", "Unidos por su lado más largo, los dos triángulos forman un cuadrado.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "fig",
                "f": "trirectEsc",
                "c": "#3b82f6",
                "h": 10
              },
              {
                "t": "txt",
                "cls": "grande",
                "h": "+"
              },
              {
                "t": "fig",
                "f": "trirectEsc",
                "c": "#3b82f6",
                "h": 10
              }
            ]
          },
          "preg": "Con <b>dos triángulos azules</b> iguales, ¿qué figura se forma?",
          "audio": A("p18_b", "Con dos triángulos azules iguales, ¿qué figura se forma?"),
          "opc": [
            {
              "t": "fig",
              "f": "rectangulo",
              "c": "#3b82f6",
              "h": 8
            },
            {
              "t": "fig",
              "f": "cuadrado",
              "c": "#3b82f6",
              "h": 8
            },
            {
              "t": "fig",
              "f": "trapecio",
              "c": "#3b82f6",
              "h": 8
            },
            {
              "t": "fig",
              "f": "equilatero",
              "c": "#3b82f6",
              "h": 8
            }
          ],
          "visOk": {
            "t": "union",
            "m": "rect"
          },
          "conf": A("p18_bc", "Los dos triángulos azules forman un rectángulo.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "fig",
                "f": "cuadrado",
                "c": "#c8a26b",
                "h": 10
              },
              {
                "t": "txt",
                "cls": "grande",
                "h": "+"
              },
              {
                "t": "fig",
                "f": "cuadrado",
                "c": "#c8a26b",
                "h": 10
              }
            ]
          },
          "preg": "Ramiro dice que con <b>dos cuadrados</b> iguales se forma un rectángulo. ¿Estás de acuerdo?",
          "audio": A("p18_c", "Ramiro dice que con dos cuadrados iguales se forma un rectángulo. ¿Estás de acuerdo?"),
          "opc": [
            "Sí: juntos forman un rectángulo",
            "No: forman un cuadrado más grande",
            "No: forman un triángulo",
            "No se puede saber"
          ],
          "visOk": {
            "t": "union",
            "m": "doscuad"
          },
          "conf": A("p18_cc", "Sí. Quedan 4 ángulos rectos, dos lados largos y dos cortos: un rectángulo.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: triángulos",
      "vis": {
        "t": "tris"
      },
      "pista": A("pi_fig", "Mirá con atención los lados y los ángulos de cada figura."),
      "instr": A("p19_i", "Observá los triángulos numerados. El cuadradito naranja marca un ángulo recto."),
      "items": [
        {
          "preg": "¿Qué triángulo tiene <b>un ángulo recto</b> y <b>dos lados de la misma medida</b>?",
          "audio": A("p19_a", "¿Qué triángulo tiene un ángulo recto y dos lados de la misma medida?"),
          "opc": [
            "1",
            "3",
            "4",
            "6"
          ],
          "conf": A("p19_ac", "El triángulo 1: tiene un ángulo recto y sus dos lados cortos miden lo mismo.")
        },
        {
          "preg": "¿Cuál tiene <b>tres ángulos agudos</b> y <b>todos sus lados iguales</b>?",
          "audio": A("p19_b", "¿Cuál tiene tres ángulos agudos y todos sus lados iguales?"),
          "opc": [
            "4",
            "1",
            "2",
            "5"
          ],
          "conf": A("p19_bc", "El triángulo 4: sus tres lados miden lo mismo.")
        },
        {
          "preg": "¿Cómo es el triángulo <b>3</b>?",
          "audio": A("p19_c", "¿Cómo es el triángulo 3?"),
          "opc": [
            "Tiene un ángulo recto y sus tres lados de distinta medida",
            "Tiene sus tres lados iguales",
            "Tiene dos lados iguales y ningún ángulo recto",
            "Tiene cuatro lados"
          ],
          "conf": A("p19_cc", "El triángulo 3 tiene un ángulo recto y sus tres lados son distintos.")
        },
        {
          "vis": {
            "t": "img",
            "src": "pesca_puesto.jpg",
            "h": 20
          },
          "preg": "Elegí la figura que tiene <b>cuatro lados iguales y cuatro ángulos rectos</b>.",
          "audio": A("p19_d", "Elegí la figura que tiene cuatro lados iguales y cuatro ángulos rectos."),
          "opc": [
            {
              "t": "fig",
              "f": "cuadrado",
              "c": "#0ea5e9",
              "h": 8
            },
            {
              "t": "fig",
              "f": "rombo",
              "c": "#0ea5e9",
              "h": 8
            },
            {
              "t": "fig",
              "f": "trapecio",
              "c": "#0ea5e9",
              "h": 8
            },
            {
              "t": "fig",
              "f": "rectangulo",
              "c": "#0ea5e9",
              "h": 8
            }
          ],
          "conf": A("p19_dc", "El cuadrado. El rombo tiene lados iguales pero no ángulos rectos, y el rectángulo no tiene todos sus lados iguales.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Misión detective de datos",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "tabla",
            "id": "td",
            "cab": [
              "Juego",
              "Personas que jugaron"
            ],
            "filas": [
              [
                "🎯 Tiro al blanco",
                "25"
              ],
              [
                "🔷 Guardas para completar",
                "60"
              ],
              [
                "🎣 Pesca de figuras",
                "35"
              ]
            ]
          },
          {
            "t": "barras",
            "id": "bd",
            "titulo": "Personas que jugaron",
            "max": 70,
            "paso": 10,
            "h": 30,
            "ocultas": true,
            "datos": [
              [
                "Tiro al|blanco",
                25,
                "#0ea5e9"
              ],
              [
                "Guardas|para completar",
                60,
                "#22c55e"
              ],
              [
                "Pesca de|figuras",
                35,
                "#7c3aed"
              ]
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p20_1", "La feria abrió a las 9. Dos horas después, los chicos anotaron en una tabla cuántas personas eligieron cada juego."),
          "destacar": [
            "td"
          ],
          "chip": "🕵️ Una tabla con datos"
        },
        {
          "audio": A("p20_2", "Con esos datos armamos un gráfico de barras. 25 personas jugaron al tiro al blanco: la barra llega hasta el 25."),
          "mostrar": [
            "bd_0"
          ],
          "destacar": [
            "td_f0"
          ],
          "apuntar": "bd_0",
          "chip": "🎯 Tiro al blanco: 25"
        },
        {
          "audio": A("p20_3", "60 personas completaron guardas."),
          "mostrar": [
            "bd_1"
          ],
          "destacar": [
            "td_f1"
          ],
          "apuntar": "bd_1",
          "chip": "🔷 Guardas: 60"
        },
        {
          "audio": A("p20_4", "Y 35 jugaron a la pesca. Cuanto más alta la barra, más personas."),
          "mostrar": [
            "bd_2"
          ],
          "destacar": [
            "td_f2"
          ],
          "apuntar": "bd_2",
          "chip": "🎣 Pesca: 35"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Detective de datos",
      "vis": {
        "t": "tabla",
        "id": "td",
        "cab": [
          "Juego",
          "Personas que jugaron"
        ],
        "filas": [
          [
            "🎯 Tiro al blanco",
            "25"
          ],
          [
            "🔷 Guardas para completar",
            "60"
          ],
          [
            "🎣 Pesca de figuras",
            "35"
          ]
        ]
      },
      "pista": A("pi_graf", "Fijate hasta qué número llega cada barra. Seguí la línea hasta el costado."),
      "instr": A("p21_i", "Usá la tabla para resolver la misión."),
      "items": [
        {
          "preg": "¿Qué gráfico corresponde a la tabla?",
          "audio": A("p21_a", "¿Qué gráfico corresponde a la tabla?"),
          "opc": [
            {
              "t": "barras",
              "id": null,
              "titulo": "Personas que jugaron",
              "max": 70,
              "paso": 10,
              "h": 17,
              "datos": [
                [
                  "Tiro al|blanco",
                  25,
                  "#0ea5e9"
                ],
                [
                  "Guardas|para completar",
                  60,
                  "#22c55e"
                ],
                [
                  "Pesca de|figuras",
                  35,
                  "#7c3aed"
                ]
              ]
            },
            {
              "t": "barras",
              "id": null,
              "titulo": "Personas que jugaron",
              "max": 70,
              "paso": 10,
              "h": 17,
              "datos": [
                [
                  "Tiro al|blanco",
                  35,
                  "#ef4444"
                ],
                [
                  "Guardas|para completar",
                  25,
                  "#f59e0b"
                ],
                [
                  "Pesca de|figuras",
                  60,
                  "#84cc16"
                ]
              ]
            },
            {
              "t": "barras",
              "id": null,
              "titulo": "Personas que jugaron",
              "max": 70,
              "paso": 10,
              "h": 17,
              "datos": [
                [
                  "Tiro al|blanco",
                  25,
                  "#0ea5e9"
                ],
                [
                  "Guardas|para completar",
                  35,
                  "#7c3aed"
                ],
                [
                  "Pesca de|figuras",
                  60,
                  "#facc15"
                ]
              ]
            }
          ],
          "conf": A("p21_ac", "Es el gráfico con barras de 25, 60 y 35, en el mismo orden que la tabla.")
        },
        {
          "preg": "Durante esas dos horas, ¿cuántas personas jugaron en total?",
          "audio": A("p21_b", "Durante esas dos horas, ¿cuántas personas jugaron en total?"),
          "opc": [
            "120",
            "100",
            "60",
            "85"
          ],
          "conf": A("p21_bc", "25 más 60 más 35 es 120 personas.")
        },
        {
          "preg": "¿Cuál es la diferencia entre las personas que eligieron <b>tiro al blanco</b> y las que eligieron <b>pesca de figuras</b>?",
          "audio": A("p21_c", "¿Cuál es la diferencia entre las personas que eligieron tiro al blanco y las que eligieron pesca de figuras?"),
          "opc": [
            "10",
            "60",
            "35",
            "25"
          ],
          "conf": A("p21_cc", "35 menos 25 es 10. La pesca tuvo 10 personas más.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la encuesta de la radio",
      "vis": {
        "t": "barras",
        "id": "r1",
        "titulo": "Escucho radio…",
        "max": 25,
        "paso": 5,
        "h": 32,
        "datos": [
          [
            "Todos|los días",
            10,
            "#ef4444"
          ],
          [
            "Más de una|vez x semana",
            15,
            "#84cc16"
          ],
          [
            "Una vez|x semana",
            20,
            "#16a34a"
          ],
          [
            "No|escucha",
            5,
            "#7e22ce"
          ]
        ]
      },
      "pista": A("pi_graf", "Fijate hasta qué número llega cada barra. Seguí la línea hasta el costado."),
      "instr": A("p22_i", "Una radio encuestó a 50 personas. Mirá los gráficos de barras."),
      "items": [
        {
          "preg": "¿Cuánta gente escucha radio <b>una vez por semana</b>?",
          "audio": A("p22_a", "¿Cuánta gente escucha radio una vez por semana?"),
          "opc": [
            "20",
            "15",
            "10",
            "5"
          ],
          "conf": A("p22_ac", "La barra llega hasta el 20: 20 personas.")
        },
        {
          "preg": "¿Cuánta gente escucha <b>todos los días</b> y <b>más de una vez por semana</b>, en total?",
          "audio": A("p22_b", "¿Cuánta gente escucha todos los días y más de una vez por semana, en total?"),
          "opc": [
            "25",
            "10",
            "15",
            "30"
          ],
          "conf": A("p22_bc", "10 más 15 es 25 personas.")
        },
        {
          "vis": {
            "t": "barras",
            "id": "r2",
            "titulo": "El nuevo programa me parece…",
            "max": 30,
            "paso": 5,
            "h": 32,
            "datos": [
              [
                "Excelente",
                5,
                "#84cc16"
              ],
              [
                "Muy bueno",
                15,
                "#1e40af"
              ],
              [
                "Bueno",
                25,
                "#f97316"
              ],
              [
                "Regular",
                5,
                "#dc2626"
              ]
            ]
          },
          "preg": "¿A cuántas personas el programa les pareció <b>excelente</b>? ¿Y <b>muy bueno</b>?",
          "audio": A("p22_c", "¿A cuántas personas el programa les pareció excelente? ¿Y muy bueno?"),
          "opc": [
            "5 y 15",
            "15 y 5",
            "5 y 25",
            "25 y 15"
          ],
          "conf": A("p22_cc", "Excelente, 5 personas. Muy bueno, 15.")
        },
        {
          "preg": "¿Cuántas personas opinan que el programa es <b>regular</b>?",
          "audio": A("p22_d", "¿Cuántas personas opinan que el programa es regular?"),
          "opc": [
            "5",
            "25",
            "15",
            "10"
          ],
          "conf": A("p22_dc", "Solo 5 personas dijeron regular.")
        },
        {
          "preg": "Según la encuesta, ¿qué le conviene a la radio?",
          "audio": A("p22_e", "Según la encuesta, ¿qué le conviene a la radio?"),
          "opc": [
            "Mejorar el programa: muy pocos lo eligen excelente",
            "Dejarlo igual: a todos les parece excelente",
            "Cerrar la radio",
            "Preguntar solo a 5 personas"
          ],
          "conf": A("p22_ec", "La mayoría dijo bueno, y solo 5 dijeron excelente. Se puede mejorar. ¡Comentalo con tus compañeros!")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "El distintivo para la feria",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "caja",
            "titulo": "Modelo de Guada",
            "id": "cg",
            "items": [
              {
                "t": "distintivo",
                "m": "guada",
                "h": 22
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Modelo de Pilar",
            "items": [
              {
                "t": "distintivo",
                "m": "paso",
                "id": "dp",
                "h": 22
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p38_1", "Los chicos usaron un distintivo para que todos los reconocieran. El de Guada necesita compás para los círculos y regla para la flecha."),
          "destacar": [
            "cg"
          ],
          "chip": "🧭📏 Guada: compás y regla"
        },
        {
          "audio": A("p38_2", "Para el de Pilar, primero se marca un punto: el centro."),
          "apuntar": "dp_centro",
          "chip": "1. Marcar el centro"
        },
        {
          "audio": A("p38_3", "Se apoya ahí la punta del compás, se traza una vuelta completa y se pinta de naranja el interior."),
          "mostrar": [
            "dp_fill",
            "dp_int"
          ],
          "apuntar": "dp_int",
          "chip": "2. Trazar y pintar de naranja"
        },
        {
          "audio": A("p38_4", "Con la punta en el mismo centro, se abre más el compás y se traza otra circunferencia."),
          "mostrar": [
            "dp_ext"
          ],
          "apuntar": "dp_ext",
          "chip": "3. Abrir más el compás"
        },
        {
          "audio": A("p38_5", "Por último, se pinta de azul el espacio entre las dos. ¡Solo hizo falta el compás!"),
          "mostrar": [
            "dp_anillo"
          ],
          "chip": "4. Pintar el borde de azul"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Compás o regla?",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "caja",
            "titulo": "Modelo de Guada",
            "items": [
              {
                "t": "distintivo",
                "m": "guada",
                "h": 20
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Modelo de Pilar",
            "items": [
              {
                "t": "distintivo",
                "m": "pilar",
                "h": 20
              }
            ]
          }
        ]
      },
      "instr": A("p39_i", "Pensá cómo se dibujan los distintivos."),
      "items": [
        {
          "preg": "Pilar dice que para su distintivo <b>solo hace falta el compás</b>. ¿Estás de acuerdo?",
          "audio": A("p39_a", "Pilar dice que para su distintivo solo hace falta el compás. ¿Estás de acuerdo?"),
          "opc": [
            "Sí: son dos circunferencias con el mismo centro",
            "No: también hace falta la regla",
            "No: hace falta una escuadra",
            "Sí: porque es naranja"
          ],
          "conf": A("p39_ac", "Pilar tiene razón: son dos circunferencias con el mismo centro, y no hay líneas rectas.")
        },
        {
          "preg": "¿Para qué necesita Guada la <b>regla</b>?",
          "audio": A("p39_b", "¿Para qué necesita Guada la regla?"),
          "opc": [
            "Para trazar la flecha, que tiene líneas rectas",
            "Para trazar los círculos",
            "Para pintar",
            "No la necesita"
          ],
          "conf": A("p39_bc", "La flecha tiene líneas rectas: para eso se usa la regla.")
        },
        {
          "vis": {
            "t": "caja",
            "titulo": "Así empezaron los chicos",
            "items": [
              {
                "t": "distintivo",
                "m": "paso",
                "pintado": true,
                "h": 24
              }
            ]
          },
          "preg": "Los chicos trazaron una circunferencia y la pintaron de naranja. ¿Qué pasos faltan para terminar el modelo de Pilar?",
          "audio": A("p39_c", "Los chicos trazaron una circunferencia y la pintaron de naranja. ¿Qué pasos faltan para terminar el modelo de Pilar?"),
          "opc": [
            "Abrir más el compás en el mismo centro, trazar otra circunferencia y pintar el borde de azul",
            "Trazar una flecha con la regla",
            "Hacer otra circunferencia más chica en otro lugar",
            "Pintar todo de azul"
          ],
          "visOk": {
            "t": "caja",
            "titulo": "¡Terminado!",
            "items": [
              {
                "t": "distintivo",
                "m": "pilar",
                "h": 24
              }
            ]
          },
          "conf": A("p39_cc", "¡Exacto! Mismo centro, más abertura, y se pinta el anillo de azul.")
        },
        {
          "vis": {
            "t": "circs"
          },
          "preg": "Para copiar estas dos <b>circunferencias iguales</b>, ¿qué no hay que cambiar en el compás?",
          "audio": A("p39_d", "Para copiar estas dos circunferencias iguales, ¿qué no hay que cambiar en el compás?"),
          "opc": [
            "La abertura",
            "El color del lápiz",
            "La hoja",
            "Nada, da lo mismo"
          ],
          "conf": A("p39_dc", "Si son iguales, se trazan con la misma abertura del compás.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de figuras y datos",
      "n": 10,
      "img": "pesca_puesto.jpg",
      "instr": A("s2_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "GUARDA",
          "audio": A("p40_2", "Guarda: figuras que se repiten siguiendo un patrón.")
        },
        {
          "w": "PATRON",
          "audio": A("p40_3", "Patrón: el grupo de figuras que se repite.")
        },
        {
          "w": "COMPAS",
          "audio": A("p40_4", "Compás: sirve para trazar circunferencias.")
        },
        {
          "w": "CUADRADO",
          "audio": A("p40_5", "Cuadrado: cuatro lados iguales y cuatro ángulos rectos.")
        },
        {
          "w": "TRIANGULO",
          "audio": A("p40_6", "Triángulo: tiene tres lados.")
        },
        {
          "w": "RECTANGULO",
          "audio": A("s2_6", "Rectángulo: cuatro ángulos rectos, dos lados largos y dos cortos.")
        },
        {
          "w": "BARRAS",
          "audio": A("s2_7", "Barras: en el gráfico, la más alta muestra la mayor cantidad.")
        }
      ],
      "fin": A("p40_f", "¡Encontraste todas las palabras de la feria!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre2", "Terminaste la segunda parte de la Escuela Abierta. Mirá tus resultados y envialos a tu seño. En la parte 3 abre el rincón de las delicias.")
    }
  ]
};
