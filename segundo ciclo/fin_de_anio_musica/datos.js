/* datos.js — "Fin de año" · Música y operaciones · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 10 a 13.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "grado": "5.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "titulo": "Fin de año",
    "corto": "Fin de año · Música y operaciones",
    "parte": "Música y operaciones",
    "subtitulo": "Las figuras musicales y sus duraciones: fracciones de la redonda, sumas y restas de fracciones para completar ritmos",
    "imgPortada": "portada.jpg",
    "imgCierre": "julian.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en «Música y operaciones» (págs.10 a 13) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Fin de año",
      "vis": {
        "t": "img",
        "src": "portada.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("m01_1", "Este año, el cierre no será como cualquier otro. La escuela se prepara para el gran evento de fin de año: un encuentro lleno de música, escenas, colores y emociones."),
          "chip": "🎭 El gran evento de fin de año"
        },
        {
          "audio": A("m01_2", "Y hay un equipo elegido para una tarea muy importante: los chicos y chicas de quinto grado. En este proyecto, la matemática y el arte se encuentran."),
          "chip": "🎨 Matemática y arte juntos"
        },
        {
          "audio": A("m01_3", "Para empezar, pensaron en una presentación de percusión corporal. Con el profe de Música, Francisco, estudiaron las duraciones de las figuras musicales."),
          "chip": "🥁 Percusión corporal"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Las figuras musicales",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "clase_musica.jpg",
            "h": 22
          },
          {
            "t": "notas",
            "items": [
              [
                "redonda",
                "nf_r",
                "redonda"
              ],
              [
                "blanca",
                "nf_b",
                "blanca"
              ],
              [
                "negra",
                "nf_n",
                "negra"
              ],
              [
                "corchea",
                "nf_c",
                "corchea"
              ],
              [
                "semicorchea",
                "nf_s",
                "semicorchea"
              ]
            ],
            "h": 8,
            "sep": "",
            "id": "nf"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("m02_1", "Las figuras musicales son los símbolos que indican cuánto dura un sonido, es decir, la rítmica."),
          "chip": "🎵 Cada figura indica cuánto dura un sonido"
        },
        {
          "audio": A("m02_2", "La redonda es la que más dura: un ritmo completo, un tiempo total."),
          "destacar": [
            "nf_r"
          ],
          "chip": "Redonda: un ritmo completo"
        },
        {
          "audio": A("m02_3", "La blanca dura la mitad que la redonda. La negra dura la mitad que la blanca."),
          "destacar": [
            "nf_b",
            "nf_n"
          ],
          "chip": "Blanca: la mitad de la redonda · Negra: la mitad de la blanca"
        },
        {
          "audio": A("m02_4", "La corchea dura la mitad que la negra, y la semicorchea, la mitad que la corchea. ¡Cada figura dura la mitad que la anterior!"),
          "destacar": [
            "nf_c",
            "nf_s"
          ],
          "chip": "Corchea y semicorchea: siempre la mitad de la anterior"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Cuántas entran en una redonda?",
      "vis": {
        "t": "img",
        "src": "cuadro_fig.jpg",
        "h": 30
      },
      "pista": A("pm_red", "Mirá el cuadro: la redonda dura un ritmo completo. Contá cuántas figuras de cada tipo entran debajo de la redonda."),
      "instr": A("m03_i", "Mirá el cuadro de duraciones del profe Francisco. Debajo de la redonda están las figuras que duran lo mismo que ella."),
      "items": [
        {
          "preg": "Si tenemos una <b>redonda</b>, ¿cuántas <b>blancas</b> necesitamos?",
          "audio": A("m03_a", "Si tenemos una redonda, ¿cuántas blancas necesitamos para que dure lo mismo?"),
          "opc": [
            "2",
            "4",
            "1",
            "8"
          ],
          "conf": A("m03_ac", "Dos blancas duran lo mismo que una redonda.")
        },
        {
          "preg": "¿Cuántas <b>negras</b> necesitamos para una redonda?",
          "audio": A("m03_b", "¿Cuántas negras necesitamos para una redonda?"),
          "opc": [
            "4",
            "2",
            "8",
            "16"
          ],
          "conf": A("m03_bc", "Cuatro negras duran lo mismo que una redonda.")
        },
        {
          "preg": "¿Cuántas <b>corcheas</b> se necesitan para tener una redonda?",
          "audio": A("m03_c", "¿Cuántas corcheas se necesitan para tener una redonda?"),
          "opc": [
            "8",
            "4",
            "6",
            "16"
          ],
          "conf": A("m03_cc", "Ocho corcheas forman una redonda.")
        },
        {
          "preg": "¿Y cuántas <b>semicorcheas</b>?",
          "audio": A("m03_d", "¿Y cuántas semicorcheas?"),
          "opc": [
            "16",
            "8",
            "12",
            "32"
          ],
          "conf": A("m03_dc", "Dieciséis semicorcheas forman una redonda.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Qué fracción de la redonda es?",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "notas",
            "items": [
              [
                "redonda",
                "nf_r",
                "redonda"
              ],
              [
                "blanca",
                "nf_b",
                "blanca"
              ],
              [
                "negra",
                "nf_n",
                "negra"
              ],
              [
                "corchea",
                "nf_c",
                "corchea"
              ],
              [
                "semicorchea",
                "nf_s",
                "semicorchea"
              ]
            ],
            "h": 6.5,
            "sep": "",
            "id": "nf"
          },
          {
            "t": "tabla",
            "id": "tf",
            "cab": [
              "Figura",
              "Redonda",
              "Blanca",
              "Negra",
              "Corchea",
              "Semicorchea"
            ],
            "filas": [
              [
                "Fracción de la redonda",
                "1",
                "?",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("pm_red", "Mirá el cuadro: la redonda dura un ritmo completo. Contá cuántas figuras de cada tipo entran debajo de la redonda."),
      "instr": A("m04_i", "Ahora escribimos cada figura como una fracción de la redonda. La redonda es 1 entero."),
      "items": [
        {
          "preg": "Si 2 blancas forman una redonda, ¿qué fracción de la redonda es una <b>blanca</b>?",
          "audio": A("m04_a", "Si dos blancas forman una redonda, ¿qué fracción de la redonda es una blanca?"),
          "destacar": [
            "nf_b",
            "tf_0_2"
          ],
          "opc": [
            "1/2",
            "1/4",
            "2",
            "1/8"
          ],
          "escribir": [
            {
              "id": "tf_0_2",
              "h": "1/2"
            }
          ],
          "conf": A("m04_ac", "Una blanca es un medio de la redonda.")
        },
        {
          "preg": "Con 4 negras se forma una redonda. ¿Qué fracción es una <b>negra</b>?",
          "audio": A("m04_b", "Con cuatro negras se forma una redonda. ¿Qué fracción es una negra?"),
          "destacar": [
            "nf_n",
            "tf_0_3"
          ],
          "opc": [
            "1/4",
            "1/2",
            "4",
            "1/8"
          ],
          "escribir": [
            {
              "id": "tf_0_3",
              "h": "1/4"
            }
          ],
          "conf": A("m04_bc", "Una negra es un cuarto de la redonda.")
        },
        {
          "preg": "Con 8 corcheas se forma una redonda. ¿Qué fracción es una <b>corchea</b>?",
          "audio": A("m04_c", "Con ocho corcheas se forma una redonda. ¿Qué fracción es una corchea?"),
          "destacar": [
            "nf_c",
            "tf_0_4"
          ],
          "opc": [
            "1/8",
            "1/4",
            "8",
            "1/16"
          ],
          "escribir": [
            {
              "id": "tf_0_4",
              "h": "1/8"
            }
          ],
          "conf": A("m04_cc", "Una corchea es un octavo de la redonda.")
        },
        {
          "preg": "Con 16 semicorcheas se forma una redonda. ¿Qué fracción es una <b>semicorchea</b>?",
          "audio": A("m04_d", "Con dieciséis semicorcheas se forma una redonda. ¿Qué fracción es una semicorchea?"),
          "destacar": [
            "nf_s",
            "tf_0_5"
          ],
          "opc": [
            "1/16",
            "1/8",
            "16",
            "1/12"
          ],
          "escribir": [
            {
              "id": "tf_0_5",
              "h": "1/16"
            }
          ],
          "conf": A("m04_dc", "Una semicorchea es un dieciseisavo de la redonda.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Comparamos figuras",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "seno_gladys.jpg",
            "h": 24
          },
          {
            "t": "notas",
            "items": [
              [
                "redonda",
                "nf_r",
                "redonda"
              ],
              [
                "blanca",
                "nf_b",
                "blanca"
              ],
              [
                "negra",
                "nf_n",
                "negra"
              ],
              [
                "corchea",
                "nf_c",
                "corchea"
              ],
              [
                "semicorchea",
                "nf_s",
                "semicorchea"
              ]
            ],
            "h": 8,
            "sep": "",
            "id": "nf"
          }
        ]
      },
      "pista": A("m05_p", "Recordá: cada figura dura la mitad que la anterior."),
      "instr": A("m05_i", "La seño Gladys propone comparar las figuras entre sí, no solo con la redonda."),
      "items": [
        {
          "preg": "¿Cuántas <b>negras</b> se necesitan para tener una <b>blanca</b>?",
          "audio": A("m05_a", "¿Cuántas negras se necesitan para tener una blanca?"),
          "destacar": [
            "nf_b",
            "nf_n"
          ],
          "opc": [
            "2",
            "4",
            "1",
            "3"
          ],
          "conf": A("m05_ac", "Dos negras forman una blanca.")
        },
        {
          "preg": "Entonces, ¿una negra es <b>1/2</b> de la blanca?",
          "audio": A("m05_b", "Entonces, ¿es cierto que una negra es un medio de la blanca?"),
          "destacar": [
            "nf_b",
            "nf_n"
          ],
          "opc": [
            "Sí: con dos negras se forma una blanca",
            "No: es 1/4 de la blanca",
            "No: es el doble de la blanca",
            "No se puede saber"
          ],
          "conf": A("m05_bc", "Sí. Como dos negras forman una blanca, una negra es la mitad de la blanca.")
        },
        {
          "preg": "Si una negra equivale a dos corcheas, ¿una corchea es <b>1/2</b> de la negra?",
          "audio": A("m05_c", "Si una negra equivale a dos corcheas, ¿una corchea es un medio de la negra?"),
          "destacar": [
            "nf_n",
            "nf_c"
          ],
          "opc": [
            "Sí: es la mitad de la negra",
            "No: es 1/8 de la negra",
            "No: es el doble",
            "No: duran lo mismo"
          ],
          "conf": A("m05_cc", "Sí. La corchea es la mitad de la negra, aunque sea un octavo de la redonda: depende de con qué figura la comparamos.")
        },
        {
          "preg": "¿Qué equivalencia hay entre la <b>semicorchea</b> y la <b>corchea</b>?",
          "audio": A("m05_d", "¿Qué equivalencia hay entre la semicorchea y la corchea?"),
          "destacar": [
            "nf_c",
            "nf_s"
          ],
          "opc": [
            "2 semicorcheas = 1 corchea",
            "1 semicorchea = 2 corcheas",
            "4 semicorcheas = 1 corchea",
            "Duran lo mismo"
          ],
          "conf": A("m05_dc", "Dos semicorcheas duran lo mismo que una corchea.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Sumamos duraciones",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "notas",
            "items": [
              [
                "blanca",
                "rs_1",
                "1/2"
              ],
              [
                "negra",
                "rs_2",
                "1/4"
              ],
              [
                "negra",
                "rs_3",
                "1/4"
              ]
            ],
            "h": 10,
            "sep": "+",
            "id": "rs"
          },
          {
            "t": "txt",
            "id": "rs_t",
            "cls": "oc",
            "h": "1/2 + 1/4 + 1/4 = <b>1</b> ritmo completo"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("m06_1", "Para saber cuánto dura un ritmo, sumamos las duraciones de sus figuras como fracciones de la redonda."),
          "chip": "➕ Sumamos fracciones de la redonda"
        },
        {
          "audio": A("m06_2", "Este ritmo tiene una blanca, que es un medio, y dos negras, que son un cuarto cada una."),
          "destacar": [
            "rs_1",
            "rs_2",
            "rs_3"
          ],
          "chip": "Blanca 1/2 · Negra 1/4 · Negra 1/4"
        },
        {
          "audio": A("m06_3", "Un medio más un cuarto más un cuarto es igual a uno: el ritmo dura lo mismo que una redonda, un ritmo completo."),
          "mostrar": [
            "rs_t"
          ],
          "chip": "1/2 + 1/4 + 1/4 = 1"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Cuánto dura el ritmo?",
      "vis": {
        "t": "notas",
        "items": [
          [
            "redonda",
            "nf_r",
            "redonda"
          ],
          [
            "blanca",
            "nf_b",
            "blanca"
          ],
          [
            "negra",
            "nf_n",
            "negra"
          ],
          [
            "corchea",
            "nf_c",
            "corchea"
          ],
          [
            "semicorchea",
            "nf_s",
            "semicorchea"
          ]
        ],
        "h": 8,
        "sep": "",
        "id": "nf"
      },
      "pista": A("pm_suma", "Pasá cada figura a su fracción de la redonda y sumá: blanca un medio, negra un cuarto, corchea un octavo, semicorchea un dieciseisavo."),
      "instr": A("m07_i", "Calculá cuánto dura cada ritmo. Hacé la cuenta en tu cuaderno si lo necesitás."),
      "items": [
        {
          "preg": "¿Qué duración tiene un ritmo de <b>dos negras</b>?",
          "audio": A("m07_a", "¿Qué duración tiene un ritmo compuesto por dos negras?"),
          "vis": {
            "t": "notas",
            "items": [
              [
                "negra",
                "",
                "1/4"
              ],
              [
                "negra",
                "",
                "1/4"
              ]
            ],
            "h": 10,
            "sep": "+"
          },
          "opc": [
            "1/2 de la redonda",
            "1/4 de la redonda",
            "2 redondas",
            "1 redonda"
          ],
          "conf": A("m07_ac", "Un cuarto más un cuarto es dos cuartos, es decir, un medio: lo mismo que una blanca.")
        },
        {
          "preg": "¿Y un ritmo de <b>una blanca y dos negras</b>?",
          "audio": A("m07_b", "¿Y un ritmo compuesto por una blanca y dos negras?"),
          "vis": {
            "t": "notas",
            "items": [
              [
                "blanca",
                "",
                "1/2"
              ],
              [
                "negra",
                "",
                "1/4"
              ],
              [
                "negra",
                "",
                "1/4"
              ]
            ],
            "h": 10,
            "sep": "+"
          },
          "opc": [
            "1: un ritmo completo",
            "3/4 de la redonda",
            "1/2 de la redonda",
            "3 redondas"
          ],
          "conf": A("m07_bc", "Un medio más dos cuartos es uno: un ritmo completo.")
        },
        {
          "preg": "Pablo dice: «Si sumo una <b>blanca</b> y una <b>negra</b>, obtengo 1 ritmo completo». ¿Tiene razón?",
          "audio": A("m07_c", "Pablo dice: si sumo la duración de una blanca y una negra, obtengo un ritmo completo. ¿Tiene razón?"),
          "vis": {
            "t": "notas",
            "items": [
              [
                "blanca",
                "",
                "1/2"
              ],
              [
                "negra",
                "",
                "1/4"
              ]
            ],
            "h": 10,
            "sep": "+"
          },
          "opc": [
            "No: dura 3/4, falta 1/4",
            "Sí: dura 1",
            "No: dura 1/2",
            "No: dura más de 1"
          ],
          "conf": A("m07_cc", "No tiene razón. Un medio más un cuarto son tres cuartos: falta un cuarto para completar el ritmo.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El cuadro de la seño Gladys",
      "vis": {
        "t": "img",
        "src": "cuadro_equiv.jpg",
        "h": 30
      },
      "pista": A("pm_suma", "Pasá cada figura a su fracción de la redonda y sumá: blanca un medio, negra un cuarto, corchea un octavo, semicorchea un dieciseisavo."),
      "instr": A("m08_i", "La seño Gladys armó en el pizarrón un cuadro con el nombre, la duración y la fracción de cada figura. Usalo para responder."),
      "items": [
        {
          "preg": "El profesor escribió <b>1/2 + 1/4 + 1/4 = 1</b>. ¿Pensaba en una blanca y dos <b>corcheas</b>?",
          "audio": A("m08_a", "El profesor escribió: un medio más un cuarto más un cuarto, igual a uno. ¿Estaba pensando en un ritmo de una blanca y dos corcheas?"),
          "opc": [
            "No: un cuarto es una negra; es una blanca y dos negras",
            "Sí: es una blanca y dos corcheas",
            "No: es una redonda y dos negras",
            "Sí: las corcheas valen 1/4"
          ],
          "conf": A("m08_ac", "No. Un cuarto es la negra; la corchea es un octavo. El ritmo es una blanca y dos negras.")
        },
        {
          "preg": "Julián dice: «Con una <b>corchea</b> y dos <b>semicorcheas</b> hago lo mismo que una <b>negra</b>». ¿Estás de acuerdo?",
          "audio": A("m08_b", "Julián dice: con una corchea y dos semicorcheas hago una duración equivalente a una negra. ¿Estás de acuerdo?"),
          "vis": {
            "t": "notas",
            "items": [
              [
                "corchea",
                "",
                "1/8"
              ],
              [
                "semicorchea",
                "",
                "1/16"
              ],
              [
                "semicorchea",
                "",
                "1/16"
              ]
            ],
            "h": 9,
            "sep": "+"
          },
          "opc": [
            "Sí: 1/8 + 1/16 + 1/16 = 1/4",
            "No: dura 1/2",
            "No: dura 3/16",
            "No: dura 1/8"
          ],
          "conf": A("m08_bc", "Sí. Dos semicorcheas forman una corchea, y dos corcheas forman una negra: un octavo más dos dieciseisavos es un cuarto.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Julián y Amparo",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "notas",
            "items": [
              [
                "redonda",
                "",
                "1"
              ],
              [
                "blanca",
                "",
                "1/2"
              ],
              [
                "corchea",
                "",
                "1/8"
              ]
            ],
            "h": 8,
            "sep": "+"
          },
          {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "julian.jpg",
                "h": 20
              },
              {
                "t": "img",
                "src": "amparo.jpg",
                "h": 20
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("m09_1", "Un ritmo tiene tres figuras: una redonda, una blanca y una corchea. Los chicos quieren saber cuánto dura."),
          "chip": "Redonda + blanca + corchea"
        },
        {
          "audio": A("m09_2", "Julián dice: sé que el resultado es mayor a uno y menor a dos. Está más cerca de dos, porque la blanca vale un medio y aún falta sumarle la corchea, que vale un octavo."),
          "chip": "🧒 Julián: entre 1 y 2, más cerca de 2"
        },
        {
          "audio": A("m09_3", "Amparo dice: si a un medio le sumo un octavo, el resultado es menor a un entero. Me parece que estás equivocado, Julián."),
          "chip": "👧 Amparo: menor a 1 entero"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Quién tiene razón?",
      "vis": {
        "t": "notas",
        "items": [
          [
            "redonda",
            "",
            "1"
          ],
          [
            "blanca",
            "",
            "1/2"
          ],
          [
            "corchea",
            "",
            "1/8"
          ]
        ],
        "h": 10,
        "sep": "+"
      },
      "deco": "julian.jpg",
      "pista": A("pm_suma", "Pasá cada figura a su fracción de la redonda y sumá: blanca un medio, negra un cuarto, corchea un octavo, semicorchea un dieciseisavo."),
      "instr": A("m10_i", "Analizá lo que dicen Julián y Amparo sobre el ritmo de una redonda, una blanca y una corchea."),
      "items": [
        {
          "preg": "¿Cuánto dura el ritmo <b>redonda + blanca + corchea</b>?",
          "audio": A("m10_a", "¿Cuánto dura el ritmo de una redonda, una blanca y una corchea?"),
          "opc": [
            "1 + 1/2 + 1/8 = 1 y 5/8",
            "5/8",
            "1 y 1/2",
            "2"
          ],
          "conf": A("m10_ac", "Uno más un medio más un octavo es uno y cinco octavos: más de un ritmo completo.")
        },
        {
          "preg": "¿Tiene razón <b>Julián</b>?",
          "audio": A("m10_b", "¿Tiene razón Julián?"),
          "opc": [
            "Sí: 1 y 5/8 está entre 1 y 2, más cerca de 2",
            "No: el resultado es menor a 1",
            "No: el resultado es mayor a 2",
            "No: está más cerca de 1"
          ],
          "conf": A("m10_bc", "Sí. Uno y cinco octavos es mayor a uno y menor a dos, y está más cerca de dos.")
        },
        {
          "preg": "¿Tiene razón <b>Amparo</b>?",
          "audio": A("m10_c", "¿Tiene razón Amparo?"),
          "opc": [
            "No: se olvidó de sumar la redonda, que vale 1",
            "Sí: el ritmo dura menos de 1",
            "Sí: los dos tienen razón",
            "No: 1/2 + 1/8 es más de 1"
          ],
          "conf": A("m10_cc", "No. Es cierto que un medio más un octavo es menor a uno, pero se olvidó de la redonda, que ya vale un entero.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Completamos el ritmo",
      "vis": {
        "t": "notas",
        "items": [
          [
            "redonda",
            "nf_r",
            "redonda"
          ],
          [
            "blanca",
            "nf_b",
            "blanca"
          ],
          [
            "negra",
            "nf_n",
            "negra"
          ],
          [
            "corchea",
            "nf_c",
            "corchea"
          ],
          [
            "semicorchea",
            "nf_s",
            "semicorchea"
          ]
        ],
        "h": 8,
        "sep": "",
        "id": "nf"
      },
      "pista": A("m11_p", "Pensá cuánto falta para llegar a 1, que es la redonda."),
      "instr": A("m11_i", "Un ritmo completo dura lo mismo que una redonda, es decir, 1. ¿Cuánto falta para completarlo?"),
      "items": [
        {
          "preg": "Si tenemos una <b>blanca</b>, ¿cuánto falta para completar el ritmo?",
          "audio": A("m11_a", "Si tenemos una blanca, ¿cuánto falta para completar el ritmo?"),
          "opc": [
            "1/2",
            "1/4",
            "3/4",
            "1"
          ],
          "conf": A("m11_ac", "Falta un medio: otra blanca, o dos negras.")
        },
        {
          "preg": "Si falta <b>3/4</b>, ¿con qué figuras se puede completar? ¿Hay una única opción?",
          "audio": A("m11_b", "Si para completar un ritmo faltan tres cuartos, ¿con qué figuras es posible completarlo? ¿Hay una única opción?"),
          "opc": [
            "No: una blanca y una negra, o tres negras, entre otras",
            "Sí: solo con tres negras",
            "Sí: solo con una blanca",
            "No se puede completar"
          ],
          "conf": A("m11_bc", "Hay más de una opción: una blanca y una negra, tres negras, o también seis corcheas.")
        },
        {
          "preg": "Un ritmo tiene una <b>blanca</b> y una <b>negra</b>. ¿Es verdad que faltan <b>2/8</b>?",
          "audio": A("m11_c", "Un ritmo tiene una blanca y una negra. ¿Es verdad que faltan dos octavos para completarlo?"),
          "opc": [
            "Sí: faltan 1/4, que es lo mismo que 2/8",
            "No: faltan 3/4",
            "No: faltan 1/2",
            "No: no falta nada"
          ],
          "conf": A("m11_cc", "Sí. Faltan un cuarto, y un cuarto es lo mismo que dos octavos: dos corcheas.")
        },
        {
          "preg": "Un ritmo tiene una <b>blanca</b> y una <b>corchea</b>. ¿Es verdad que faltan <b>3/8</b>?",
          "audio": A("m11_d", "Un ritmo tiene una blanca y una corchea. ¿Es verdad que faltan tres octavos para completarlo?"),
          "opc": [
            "Sí: 1/2 + 1/8 = 5/8, y faltan 3/8",
            "No: faltan 1/8",
            "No: faltan 3/4",
            "No: faltan 1/2"
          ],
          "conf": A("m11_dc", "Sí. Un medio es cuatro octavos; más un octavo son cinco octavos. Para llegar a ocho octavos faltan tres octavos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos",
      "vis": {
        "t": "img",
        "src": "clase_musica.jpg",
        "h": 24
      },
      "pista": A("m12_p", "Pasá todo a la misma fracción: medios, cuartos u octavos."),
      "instr": A("m12_i", "Ahora sin figuras: completá cada suma para que se cumpla el resultado."),
      "items": [
        {
          "preg": "1/2 + <b>?</b> = 1",
          "audio": A("m12_a", "Un medio más cuánto es igual a uno?"),
          "opc": [
            "1/2",
            "1/4",
            "2/2",
            "1"
          ],
          "conf": A("m12_ac", "Un medio más un medio es un entero.")
        },
        {
          "preg": "1/4 + <b>?</b> = 1",
          "audio": A("m12_b", "Un cuarto más cuánto es igual a uno?"),
          "opc": [
            "3/4",
            "1/4",
            "2/4",
            "4/4"
          ],
          "conf": A("m12_bc", "Un cuarto más tres cuartos es cuatro cuartos, un entero.")
        },
        {
          "preg": "1/2 + 1/4 + <b>?</b> = 1",
          "audio": A("m12_c", "Un medio más un cuarto más cuánto es igual a uno?"),
          "opc": [
            "1/4",
            "1/2",
            "3/4",
            "1/8"
          ],
          "conf": A("m12_cc", "Un medio más un cuarto son tres cuartos; falta un cuarto.")
        },
        {
          "preg": "1 + 1/2 + <b>?</b> = 2",
          "audio": A("m12_d", "Uno más un medio más cuánto es igual a dos?"),
          "opc": [
            "1/2",
            "1",
            "3/2",
            "1/4"
          ],
          "conf": A("m12_dc", "Uno más un medio es uno y medio; falta un medio para llegar a dos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La torta y la cinta",
      "vis": {
        "t": "img",
        "src": "portada.jpg",
        "h": 24
      },
      "pista": A("m13_p", "Leé con atención los datos de la pantalla."),
      "instr": A("m13_i", "Dos problemas más para pensar con fracciones."),
      "items": [
        {
          "preg": "Las tortas de Bruno y de Sol estaban divididas en <b>8 porciones iguales</b>. Cada uno comió 1 porción de la torta del otro. Sol dice que Bruno comió más. ¿Puede tener razón?",
          "audio": A("m13_a", "Las tortas de los cumpleaños de Bruno y de Sol estaban divididas en ocho porciones iguales. Cada uno comió una porción de la torta del otro. Sol dice que Bruno comió más torta. ¿Puede tener razón?"),
          "opc": [
            "Sí, si la torta de Sol era más grande",
            "No: 1/8 siempre es lo mismo",
            "No: comieron lo mismo",
            "Sí, siempre que coma primero"
          ],
          "conf": A("m13_ac", "Sí. Un octavo de una torta más grande es más torta: la fracción depende del tamaño del entero.")
        },
        {
          "preg": "Hay que cortar trozos de <b>1/2 m</b> de cinta. Luciana cortó exactamente <b>8</b> trozos y no le sobró. ¿Cuánto medía su rollo?",
          "audio": A("m13_b", "Hay que cortar trozos de medio metro de cinta. Luciana cortó exactamente ocho trozos y no le sobró cinta. ¿Cuánto medía su rollo?"),
          "opc": [
            "4 m",
            "8 m",
            "16 m",
            "2 m"
          ],
          "conf": A("m13_bc", "Ocho medios metros son cuatro metros.")
        },
        {
          "preg": "Javier cortó <b>6</b> trozos de 1/2 m y Cristian, <b>5</b>. ¿Cuánto medían sus rollos?",
          "audio": A("m13_c", "Javier cortó seis trozos de medio metro y Cristian, cinco. ¿Cuánto medían sus rollos?"),
          "opc": [
            "Javier 3 m y Cristian 2 y 1/2 m",
            "Javier 6 m y Cristian 5 m",
            "Javier 12 m y Cristian 10 m",
            "Javier 3 m y Cristian 3 m"
          ],
          "conf": A("m13_cc", "Seis medios son tres metros, y cinco medios son dos metros y medio.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la música",
      "n": 9,
      "img": "clase_musica.jpg",
      "instr": A("m14_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "REDONDA",
          "audio": A("m14_1", "Redonda: un ritmo completo.")
        },
        {
          "w": "BLANCA",
          "audio": A("m14_2", "Blanca: un medio de la redonda.")
        },
        {
          "w": "NEGRA",
          "audio": A("m14_3", "Negra: un cuarto de la redonda.")
        },
        {
          "w": "CORCHEA",
          "audio": A("m14_4", "Corchea: un octavo de la redonda.")
        },
        {
          "w": "RITMO",
          "audio": A("m14_5", "Ritmo: la suma de las duraciones.")
        },
        {
          "w": "MEDIO",
          "audio": A("m14_6", "Medio: una de dos partes iguales.")
        },
        {
          "w": "OCTAVO",
          "audio": A("m14_7", "Octavo: una de ocho partes iguales.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre_fin_de_anio_musica", "¡Muy bien! Terminaste Música y operaciones. Como dice la seño Gladys: en música sumamos sonidos como en matemática sumamos fracciones. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
