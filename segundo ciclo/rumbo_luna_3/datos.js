/* datos.js — "Rumbo a la Luna" · Parte 3 · El rover y la energía · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 46 a 55.
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
    "corto": "Rumbo a la Luna 3",
    "parte": "Parte 3 · El rover y la energía",
    "subtitulo": "Desarrollos planos de prismas y pirámides, energía y gráficos de barras, área y perímetro de los paneles solares",
    "imgPortada": "tomas_moldes.jpg",
    "imgCierre": "sala_control.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Rumbo a la Luna» (págs. 46 a 55) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "El desafío de transportar un rover",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "tomas_moldes.jpg",
            "h": 28
          },
          {
            "t": "col",
            "items": [
              {
                "t": "red",
                "f": "piramide",
                "h": 12
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("l23_1", "Un rover es un vehículo explorador. La tripulación tiene que diseñar el contenedor que lo va a transportar."),
          "chip": "🚙 Un contenedor para el rover"
        },
        {
          "audio": A("l23_2", "Para eso arman modelos en miniatura con moldes, que se llaman desarrollos planos: figuras que, al doblarlas, forman un cuerpo geométrico."),
          "chip": "📐 Desarrollos planos"
        },
        {
          "audio": A("l23_3", "Contando las figuras del molde sabemos cuántas caras tendrá el cuerpo. Este molde tiene un cuadrado y cuatro triángulos."),
          "chip": "1 cuadrado + 4 triángulos"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los moldes del equipo",
      "pista": A("pi_cuerpo", "Contá las caras y fijate qué figuras las forman. Los prismas tienen dos bases iguales; las pirámides, una sola."),
      "instr": A("l24_i", "Mirá cada molde y pensá qué cuerpo se arma."),
      "items": [
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "molde_malvina.jpg",
                "h": 22
              },
              {
                "t": "red",
                "f": "piramide",
                "h": 14
              }
            ]
          },
          "preg": "El molde de Malvina tiene <b>un cuadrado y cuatro triángulos</b>. ¿Qué cuerpo se arma?",
          "audio": A("l24_a", "El molde de Malvina tiene un cuadrado y cuatro triángulos. ¿Qué cuerpo se arma?"),
          "opc": [
            "Una pirámide de base cuadrada, de 5 caras",
            "Un cubo, de 6 caras",
            "Un prisma triangular",
            "Una pirámide de 4 caras"
          ],
          "conf": A("l24_ac", "Una pirámide de base cuadrada: 1 base cuadrada y 4 caras triangulares, 5 caras en total.")
        },
        {
          "vis": {
            "t": "img",
            "src": "paso_a_paso.jpg",
            "h": 22
          },
          "preg": "Malvina armó un modelo con <b>4 lados</b>, una <b>parte superior</b> y una <b>parte inferior</b>, todos cuadrados. ¿Qué cuerpo es?",
          "audio": A("l24_b", "Malvina armó un modelo con 4 lados, una parte superior y una parte inferior, todos cuadrados. ¿Qué cuerpo es?"),
          "opc": [
            "Un cubo",
            "Una pirámide",
            "Un prisma triangular",
            "Un cilindro"
          ],
          "conf": A("l24_bc", "Seis caras cuadradas iguales: es un cubo.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "red",
                "f": "prisma_tri",
                "h": 13
              },
              {
                "t": "red",
                "f": "prisma_cuad",
                "h": 13
              },
              {
                "t": "red",
                "f": "cubo",
                "h": 13
              }
            ]
          },
          "preg": "Emilia quiere un <b>prisma de base triangular</b>. ¿Cuál de estos moldes elige?",
          "audio": A("l24_c", "Emilia quiere un prisma de base triangular. ¿Qué molde elige: el primero, el del medio o el último?"),
          "opc": [
            "El primero: 2 triángulos y 3 rectángulos",
            "El del medio",
            "El último",
            "Ninguno"
          ],
          "conf": A("l24_cc", "El prisma triangular tiene 2 bases triangulares y 3 caras rectangulares.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "red",
                "f": "prisma_cuad_mal",
                "h": 13
              },
              {
                "t": "red",
                "f": "prisma_cuad",
                "h": 13
              },
              {
                "t": "red",
                "f": "fila6",
                "h": 7
              }
            ]
          },
          "preg": "Valentín quiere un <b>prisma de base cuadrada</b> con caras rectangulares. ¿Qué molde sirve?",
          "audio": A("l24_d", "Valentín quiere un prisma de base cuadrada con caras rectangulares. ¿Qué molde sirve: el primero, el del medio o el último?"),
          "opc": [
            "El del medio",
            "El primero",
            "El último",
            "Todos"
          ],
          "conf": A("l24_dc", "El del medio: 4 rectángulos en fila y un cuadrado arriba y otro abajo. El primero tiene una base de más y le falta un lado; el último son 6 cuadrados en fila, que no cierran.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: los cuerpos",
      "vis": {
        "t": "tabla",
        "id": "cp",
        "cab": [
          "Cuerpo",
          "Caras",
          "Bases",
          "Figuras que lo forman"
        ],
        "filas": [
          [
            "Cubo",
            "?",
            "?",
            "?"
          ],
          [
            "Prisma de base triangular",
            "5",
            "?",
            "?"
          ],
          [
            "Prisma de base pentagonal",
            "?",
            "?",
            "?"
          ],
          [
            "Pirámide de base cuadrada",
            "?",
            "1",
            "?"
          ]
        ]
      },
      "deco": "tomas_moldes.jpg",
      "pista": A("pi_cuerpo", "Contá las caras y fijate qué figuras las forman. Los prismas tienen dos bases iguales; las pirámides, una sola."),
      "instr": A("l25_i", "Completá el cuadro de los cuerpos geométricos."),
      "items": [
        {
          "preg": "<b>Cubo</b>: ¿cuántas caras, cuántas bases y qué figuras?",
          "audio": A("l25_a", "El cubo: ¿cuántas caras, cuántas bases y qué figuras lo forman?"),
          "destacar": [
            "cp_f0"
          ],
          "opc": [
            "6 caras, 2 bases, cuadrados",
            "6 caras, 1 base, cuadrados",
            "8 caras, 2 bases, cuadrados",
            "6 caras, 2 bases, rectángulos y triángulos"
          ],
          "escribir": [
            {
              "id": "cp_0_1",
              "h": "6"
            },
            {
              "id": "cp_0_2",
              "h": "2"
            },
            {
              "id": "cp_0_3",
              "h": "cuadrados"
            }
          ],
          "conf": A("l25_ac", "El cubo tiene 6 caras cuadradas iguales; dos de ellas funcionan como bases.")
        },
        {
          "preg": "<b>Prisma de base triangular</b> (5 caras): ¿bases y figuras?",
          "audio": A("l25_b", "El prisma de base triangular tiene 5 caras. ¿Cuántas bases y qué figuras lo forman?"),
          "destacar": [
            "cp_f1"
          ],
          "opc": [
            "2 bases: 2 triángulos y 3 rectángulos",
            "1 base: 1 triángulo y 4 rectángulos",
            "2 bases: 5 triángulos",
            "3 bases: 3 triángulos"
          ],
          "escribir": [
            {
              "id": "cp_1_2",
              "h": "2"
            },
            {
              "id": "cp_1_3",
              "h": "2 triángulos y 3 rectángulos"
            }
          ],
          "conf": A("l25_bc", "Dos bases triangulares y tres caras laterales rectangulares.")
        },
        {
          "preg": "<b>Prisma de base pentagonal</b>: ¿caras, bases y figuras?",
          "audio": A("l25_c", "El prisma de base pentagonal: ¿cuántas caras, cuántas bases y qué figuras lo forman?"),
          "destacar": [
            "cp_f2"
          ],
          "opc": [
            "7 caras, 2 bases: 2 pentágonos y 5 rectángulos",
            "5 caras, 2 bases: 5 pentágonos",
            "6 caras, 1 base: 1 pentágono y 5 triángulos",
            "7 caras, 1 base: 7 rectángulos"
          ],
          "escribir": [
            {
              "id": "cp_2_1",
              "h": "7"
            },
            {
              "id": "cp_2_2",
              "h": "2"
            },
            {
              "id": "cp_2_3",
              "h": "2 pentágonos y 5 rectángulos"
            }
          ],
          "conf": A("l25_cc", "2 bases pentagonales y 5 caras laterales rectangulares: 7 caras.")
        },
        {
          "preg": "<b>Pirámide de base cuadrada</b> (1 base): ¿caras y figuras?",
          "audio": A("l25_d", "La pirámide de base cuadrada tiene 1 base. ¿Cuántas caras y qué figuras la forman?"),
          "destacar": [
            "cp_f3"
          ],
          "opc": [
            "5 caras: 1 cuadrado y 4 triángulos",
            "4 caras: 4 triángulos",
            "6 caras: 2 cuadrados y 4 triángulos",
            "5 caras: 5 cuadrados"
          ],
          "escribir": [
            {
              "id": "cp_3_1",
              "h": "5"
            },
            {
              "id": "cp_3_3",
              "h": "1 cuadrado y 4 triángulos"
            }
          ],
          "conf": A("l25_dc", "Una base cuadrada y 4 caras triangulares que se juntan en un vértice.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: prismas y pirámides",
      "pista": A("pi_cuerpo", "Contá las caras y fijate qué figuras las forman. Los prismas tienen dos bases iguales; las pirámides, una sola."),
      "instr": A("l26_i", "Pensá cómo son los prismas y las pirámides."),
      "items": [
        {
          "vis": {
            "t": "red",
            "f": "prisma_cuad",
            "h": 18
          },
          "preg": "Un prisma tiene dos bases. ¿Cómo son siempre?",
          "audio": A("l26_a", "Un prisma tiene dos bases. ¿Cómo son siempre esas bases?"),
          "opc": [
            "De igual forma y medida",
            "Siempre cuadradas",
            "Distintas",
            "Siempre rectangulares"
          ],
          "conf": A("l26_ac", "Las dos bases de un prisma son iguales: misma forma y misma medida.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">⬡ Prisma de base hexagonal</div>"
          },
          "preg": "¿Qué forma tienen las <b>caras laterales</b> de un prisma?",
          "audio": A("l26_b", "¿Qué forma tienen las caras laterales de un prisma?"),
          "opc": [
            "Rectangulares",
            "Pentagonales",
            "Triangulares",
            "Circulares"
          ],
          "conf": A("l26_bc", "En un prisma, las caras laterales son rectángulos.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">«Un prisma con bases triangulares y 5 caras laterales»</div>"
          },
          "preg": "¿Es posible?",
          "audio": A("l26_c", "Un alumno dice que construyó un prisma con bases triangulares y 5 caras laterales. ¿Es posible?"),
          "opc": [
            "No: tiene 3 caras laterales, una por lado del triángulo",
            "Sí, es posible",
            "No: tiene 4 caras laterales",
            "No: no tiene caras laterales"
          ],
          "conf": A("l26_cc", "El triángulo tiene 3 lados, así que el prisma tiene 3 caras laterales.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">«Una pirámide de base cuadrada con 6 caras laterales»</div>"
          },
          "preg": "¿Es posible?",
          "audio": A("l26_d", "Y dice que construyó una pirámide de base cuadrada con 6 caras laterales. ¿Es posible?"),
          "opc": [
            "No: tiene 4 caras laterales",
            "Sí, es posible",
            "No: tiene 5 caras laterales",
            "No: tiene 2 caras laterales"
          ],
          "conf": A("l26_dc", "El cuadrado tiene 4 lados: la pirámide tiene 4 caras laterales triangulares.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "red",
                "f": "prisma_cuad",
                "h": 12
              },
              {
                "t": "red",
                "f": "piramide",
                "h": 12
              }
            ]
          },
          "preg": "¿Cuál es la principal diferencia entre el desarrollo de un prisma y el de una pirámide?",
          "audio": A("l26_e", "¿Cuál es la principal diferencia entre el desarrollo de un prisma y el de una pirámide?"),
          "opc": [
            "El prisma tiene 2 bases y caras rectangulares; la pirámide, 1 base y caras triangulares",
            "No hay diferencia",
            "La pirámide tiene más bases",
            "El prisma solo tiene triángulos"
          ],
          "conf": A("l26_ec", "Prisma: dos bases iguales y caras rectangulares. Pirámide: una base y caras triangulares.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Energía y paneles solares",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "sala_control.jpg",
            "h": 22
          },
          {
            "t": "tabla",
            "id": "en",
            "cab": [
              "Actividad",
              "Unidades de energía"
            ],
            "filas": [
              [
                "💡 Encender luces",
                "10"
              ],
              [
                "🍳 Cocinar",
                "20"
              ],
              [
                "📡 Comunicación con la Tierra",
                "30"
              ],
              [
                "🔥 Calefacción",
                "40"
              ],
              [
                "💻 Encender computadoras",
                "25"
              ],
              [
                "🚙 Cargar el rover lunar",
                "50"
              ]
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("l27_1", "La nave funciona con la energía de sus paneles solares, pero la energía es limitada: no alcanza para todo."),
          "chip": "☀️ La energía es limitada"
        },
        {
          "audio": A("l27_2", "Esta tabla muestra cuánta energía consume cada actividad. Cargar el rover es lo que más consume: 50 unidades."),
          "destacar": [
            "en_f5"
          ],
          "apuntar": "en_f5",
          "chip": "🚙 Cargar el rover: 50 unidades"
        },
        {
          "audio": A("l27_3", "Si la batería se agota, la nave entra en modo de emergencia. ¡Hay que decidir bien!"),
          "chip": "⚠️ Hay que priorizar"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Alcanza la energía?",
      "vis": {
        "t": "tabla",
        "id": "en",
        "cab": [
          "Actividad",
          "Unidades de energía"
        ],
        "filas": [
          [
            "💡 Encender luces",
            "10"
          ],
          [
            "🍳 Cocinar",
            "20"
          ],
          [
            "📡 Comunicación con la Tierra",
            "30"
          ],
          [
            "🔥 Calefacción",
            "40"
          ],
          [
            "💻 Encender computadoras",
            "25"
          ],
          [
            "🚙 Cargar el rover lunar",
            "50"
          ]
        ]
      },
      "deco": "sala_control.jpg",
      "pista": A("pi_cuenta", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "instr": A("l28_i", "El equipo tiene 80 unidades de energía y quiere cocinar, comunicarse, iluminar y cargar el rover."),
      "items": [
        {
          "preg": "¿Cuánta energía necesitan para las cuatro cosas?",
          "audio": A("l28_a", "¿Cuánta energía necesitan para cocinar, comunicarse, iluminar y cargar el rover?"),
          "opc": [
            "110 unidades",
            "80 unidades",
            "100 unidades",
            "150 unidades"
          ],
          "conf": A("l28_ac", "20 más 30 más 10 más 50: 110 unidades.")
        },
        {
          "preg": "Con <b>80 unidades</b>, ¿les alcanza?",
          "audio": A("l28_b", "Con 80 unidades, ¿les alcanza?"),
          "opc": [
            "No: faltan 30 unidades",
            "Sí: sobran 30",
            "Sí: justo",
            "No: faltan 80"
          ],
          "conf": A("l28_bc", "No alcanza: 110 menos 80, faltan 30 unidades.")
        },
        {
          "preg": "¿Qué conviene dejar para después, para que alcance?",
          "audio": A("l28_c", "¿Qué conviene dejar para después, para que alcance?"),
          "opc": [
            "Cargar el rover: sin él usan 60 unidades",
            "Encender las luces",
            "Cocinar",
            "Nada"
          ],
          "conf": A("l28_cc", "Sin cargar el rover usan 60 unidades: alcanza y sobran 20. El rover puede esperar a otro día.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El gráfico de Malvina",
      "vis": {
        "t": "barras",
        "id": "ge",
        "titulo": "Unidades de energía generada",
        "max": 140,
        "paso": 20,
        "h": 30,
        "valores": true,
        "datos": [
          [
            "Lun",
            100,
            "#facc15"
          ],
          [
            "Mar",
            80,
            "#facc15"
          ],
          [
            "Mié",
            40,
            "#facc15"
          ],
          [
            "Jue",
            120,
            "#facc15"
          ],
          [
            "Vie",
            0,
            "#f97316"
          ],
          [
            "Sáb",
            0,
            "#f97316"
          ],
          [
            "Dom",
            0,
            "#f97316"
          ]
        ]
      },
      "pista": A("l29_p", "Mirá hasta dónde llega cada barra: los números están arriba."),
      "instr": A("l29_i", "Malvina registró en un gráfico de barras la energía generada cada día."),
      "items": [
        {
          "preg": "¿Qué día se generó <b>menos</b> energía?",
          "audio": A("l29_a", "¿Qué día se generó menos energía?"),
          "opc": [
            "Miércoles: 40",
            "Martes: 80",
            "Lunes: 100",
            "Jueves: 120"
          ],
          "conf": A("l29_ac", "El miércoles, con 40 unidades: la barra más baja.")
        },
        {
          "preg": "¿Qué diferencia hay entre el <b>miércoles</b> y el <b>jueves</b>?",
          "audio": A("l29_b", "¿Qué diferencia hay entre la energía del miércoles y la del jueves?"),
          "opc": [
            "80 unidades",
            "40 unidades",
            "160 unidades",
            "20 unidades"
          ],
          "conf": A("l29_bc", "120 menos 40: 80 unidades.")
        },
        {
          "preg": "¿Se puede <b>cargar el rover y calefaccionar</b> el martes?",
          "audio": A("l29_c", "¿Se puede cargar el rover y calefaccionar la nave el martes?"),
          "opc": [
            "No: necesitan 90 y hay 80",
            "Sí: necesitan 80",
            "Sí: sobran 10",
            "No: hay 40"
          ],
          "conf": A("l29_cc", "50 más 40 es 90, y el martes se generaron 80. No alcanza.")
        },
        {
          "preg": "¿Todos los días se puede consumir la misma cantidad de energía?",
          "audio": A("l29_d", "¿Todos los días se puede consumir la misma cantidad de energía?"),
          "opc": [
            "No: cada día se genera distinto",
            "Sí, siempre 100",
            "Sí, siempre 80",
            "Depende del rover"
          ],
          "conf": A("l29_dc", "No: depende de cuánta energía generaron los paneles ese día.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Completamos el gráfico",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "actividades_finde.jpg",
            "h": 20
          },
          {
            "t": "barras",
            "id": "ge",
            "titulo": "Unidades de energía generada",
            "max": 140,
            "paso": 20,
            "h": 30,
            "valores": true,
            "datos": [
              [
                "Lun",
                100,
                "#facc15"
              ],
              [
                "Mar",
                80,
                "#facc15"
              ],
              [
                "Mié",
                40,
                "#facc15"
              ],
              [
                "Jue",
                120,
                "#facc15"
              ],
              [
                "Vie",
                120,
                "#f97316",
                true
              ],
              [
                "Sáb",
                60,
                "#f97316",
                true
              ],
              [
                "Dom",
                80,
                "#f97316",
                true
              ]
            ]
          }
        ]
      },
      "pista": A("l30_p", "Sumá la energía de todas las actividades de ese día, mirando la tabla de consumo."),
      "instr": A("l30_i", "Viernes, sábado y domingo usaron toda la energía que generaron. Calculá cuánta fue, con las actividades de cada día."),
      "items": [
        {
          "preg": "<b>Viernes</b>: luces, calefacción, cocinar y cargar el rover",
          "audio": A("l30_a", "El viernes encendieron luces, calefacción, cocinaron y cargaron el rover. ¿Cuánta energía se generó?"),
          "opc": [
            "120",
            "100",
            "110",
            "80"
          ],
          "mostrar": [
            "ge_4",
            "ge_4v"
          ],
          "conf": A("l30_ac", "10 más 40 más 20 más 50: 120 unidades.")
        },
        {
          "preg": "<b>Sábado</b>: luces, cocinar y comunicación",
          "audio": A("l30_b", "El sábado encendieron luces, cocinaron y se comunicaron con la Tierra. ¿Cuánta energía?"),
          "opc": [
            "60",
            "50",
            "70",
            "40"
          ],
          "mostrar": [
            "ge_5",
            "ge_5v"
          ],
          "conf": A("l30_bc", "10 más 20 más 30: 60 unidades.")
        },
        {
          "preg": "<b>Domingo</b>: luces, calefacción y comunicación",
          "audio": A("l30_c", "El domingo encendieron luces, calefacción y se comunicaron. ¿Cuánta energía?"),
          "opc": [
            "80",
            "70",
            "90",
            "60"
          ],
          "mostrar": [
            "ge_6",
            "ge_6v"
          ],
          "conf": A("l30_cc", "10 más 40 más 30: 80 unidades. ¡Ya completamos el gráfico!")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los paneles solares",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "nave.jpg",
            "h": 24
          },
          {
            "t": "txt",
            "h": "Panel: <b>8 m × 4,5 m</b> · Celda: <b>2 m × 1,5 m</b>"
          }
        ]
      },
      "pista": A("pi_area", "El área de un rectángulo es el largo por el ancho. El perímetro es la suma de todos sus lados."),
      "instr": A("l31_i", "Cada panel solar mide 8 metros de largo y 4,5 de ancho, y tiene celdas de 2 metros por 1,5."),
      "items": [
        {
          "preg": "¿Cuántas celdas tiene cada panel?",
          "audio": A("l31_a", "¿Cuántas celdas tiene cada panel?"),
          "opc": [
            "12",
            "36",
            "8",
            "16"
          ],
          "conf": A("l31_ac", "A lo largo entran 4 celdas, porque 8 dividido 2 es 4; a lo ancho, 3, porque 4,5 dividido 1,5 es 3. 4 por 3: 12 celdas.")
        },
        {
          "preg": "Se rompió una celda de 2 m × 1,5 m. ¿Cómo se cubre con cuadrados de <b>1 m</b> y de <b>0,5 m</b>?",
          "audio": A("l31_b", "Se rompió una celda de 2 por 1,5 metros. ¿Cómo se cubre con cuadrados de 1 metro y de 0,5 metros de lado?"),
          "opc": [
            "2 de 1 m y 4 de 0,5 m",
            "3 de 1 m",
            "6 de 0,5 m",
            "1 de 1 m y 2 de 0,5 m"
          ],
          "conf": A("l31_bc", "Dos cuadrados de 1 metro cubren 2 por 1. Queda una tira de 2 por 0,5, que se cubre con 4 cuadraditos de 0,5.")
        },
        {
          "preg": "Para cubrir <b>todo un panel</b> solo con cuadrados de <b>0,5 m</b>, ¿cuántos hacen falta?",
          "audio": A("l31_c", "Para cubrir todo un panel solo con cuadrados de 0,5 metros, ¿cuántos hacen falta?"),
          "opc": [
            "144",
            "72",
            "36",
            "12"
          ],
          "conf": A("l31_cc", "A lo largo entran 16 y a lo ancho 9: 16 por 9 son 144 cuadraditos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Paneles de emergencia y marcos",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "nave.jpg",
            "h": 22
          },
          {
            "t": "txt",
            "h": "Originales: 2 paneles de <b>8 m × 4,5 m</b> · Emergencia: 2 de <b>12 m × 2,5 m</b> · Barras de aluminio de <b>2.000 mm</b>"
          }
        ]
      },
      "pista": A("pi_area", "El área de un rectángulo es el largo por el ancho. El perímetro es la suma de todos sus lados."),
      "instr": A("l32_i", "Comparamos los paneles originales con los de emergencia."),
      "items": [
        {
          "preg": "¿Los paneles de emergencia generan la misma energía que los originales?",
          "audio": A("l32_a", "¿Los paneles de emergencia generan la misma energía que los originales?"),
          "opc": [
            "No, menos: 30 m² contra 36 m²",
            "Sí, igual",
            "No, más: son más largos",
            "No, menos: 25 m² contra 36 m²"
          ],
          "conf": A("l32_ac", "Original: 8 por 4,5, 36 metros cuadrados. Emergencia: 12 por 2,5, 30. Cubren menos superficie, generan menos.")
        },
        {
          "preg": "¿Cuántas barras de <b>2.000 mm</b> (2 m) hacen falta para los marcos de los <b>2 paneles originales</b>?",
          "audio": A("l32_b", "¿Cuántas barras de 2000 milímetros hacen falta para los marcos de los 2 paneles originales?"),
          "opc": [
            "25",
            "50",
            "12",
            "13"
          ],
          "conf": A("l32_bc", "Cada marco mide 8 más 4,5, por 2: 25 metros. Los dos, 50 metros: 25 barras de 2 metros.")
        },
        {
          "preg": "Para los marcos de los paneles de <b>emergencia</b>, ¿más o menos barras?",
          "audio": A("l32_c", "Para los marcos de los paneles de emergencia, ¿se usan más o menos barras?"),
          "opc": [
            "Más: 29 barras",
            "Menos: 21 barras",
            "Igual: 25 barras",
            "Menos: 15 barras"
          ],
          "conf": A("l32_cc", "Cada marco mide 12 más 2,5, por 2: 29 metros. Los dos, 58 metros: 29 barras. Tienen menos área, ¡pero más perímetro!")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: perímetro y área",
      "pista": A("pi_area", "El área de un rectángulo es el largo por el ancho. El perímetro es la suma de todos sus lados."),
      "instr": A("l33_i", "Desafíos de perímetro y área."),
      "items": [
        {
          "vis": {
            "t": "img",
            "src": "cancha.jpg",
            "h": 26
          },
          "preg": "La cancha mide <b>90 cm × 50 cm</b>. ¿Cuánto mide su contorno?",
          "audio": A("l33_a", "La cancha mide 90 por 50 centímetros. ¿Cuánto mide su contorno?"),
          "opc": [
            "280 cm",
            "140 cm",
            "230 cm",
            "4.500 cm"
          ],
          "conf": A("l33_ac", "90 más 50 más 90 más 50: 280 centímetros. 4500 sería el área.")
        },
        {
          "vis": {
            "t": "img",
            "src": "baldosas.jpg",
            "h": 26
          },
          "preg": "Cada baldosa rota se cambia por <b>2 nuevas</b>. ¿Cuántas baldosas nuevas se necesitan?",
          "audio": A("l33_b", "Cada baldosa rota se cambia por dos baldosas nuevas más chicas. ¿Cuántas baldosas nuevas se necesitan?"),
          "opc": [
            "32",
            "24",
            "20",
            "10"
          ],
          "conf": A("l33_bc", "Hay 16 baldosas rotas, y cada una se cambia por 2: 32.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">Aula: 6 m × 4 m · Cerámicas: 0,5 m × 0,5 m</div>"
          },
          "preg": "¿Cuántas cerámicas cubren el piso del aula?",
          "audio": A("l33_c", "Un aula mide 6 por 4 metros. ¿Cuántas cerámicas de 0,5 por 0,5 metros cubren el piso?"),
          "opc": [
            "96",
            "24",
            "48",
            "20"
          ],
          "conf": A("l33_cc", "A lo largo entran 12 y a lo ancho 8: 12 por 8 son 96 cerámicas. El área es 6 por 4, 24 metros cuadrados.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: las edades de los chicos",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "edades_lista.jpg",
            "h": 14
          },
          {
            "t": "tabla",
            "id": "ed",
            "cab": [
              "Edad",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12"
            ],
            "filas": [
              [
                "Chicos",
                "3",
                "?",
                "?",
                "7",
                "7",
                "?",
                "3"
              ]
            ]
          }
        ]
      },
      "pista": A("l34_p", "Contá en la lista cuántas veces aparece cada edad."),
      "instr": A("l34_i", "Para la Semana de la Familia se inscribieron 36 chicos de 6 a 12 años. Completá la tabla de frecuencia contando las edades de la lista."),
      "items": [
        {
          "preg": "¿Cuántos chicos tienen <b>7 años</b>?",
          "audio": A("l34_a", "¿Cuántos chicos tienen 7 años?"),
          "destacar": [
            "ed_0_2"
          ],
          "opc": [
            "5",
            "4",
            "6",
            "3"
          ],
          "escribir": [
            {
              "id": "ed_0_2",
              "h": "5"
            }
          ],
          "conf": A("l34_ac", "El 7 aparece 5 veces.")
        },
        {
          "preg": "¿Cuántos tienen <b>8 años</b>?",
          "audio": A("l34_b", "¿Cuántos tienen 8 años?"),
          "destacar": [
            "ed_0_3"
          ],
          "opc": [
            "8",
            "7",
            "6",
            "9"
          ],
          "escribir": [
            {
              "id": "ed_0_3",
              "h": "8"
            }
          ],
          "conf": A("l34_bc", "El 8 aparece 8 veces: es la edad más repetida.")
        },
        {
          "preg": "¿Cuántos tienen <b>11 años</b>?",
          "audio": A("l34_c", "¿Cuántos tienen 11 años?"),
          "destacar": [
            "ed_0_6"
          ],
          "opc": [
            "3",
            "2",
            "4",
            "5"
          ],
          "escribir": [
            {
              "id": "ed_0_6",
              "h": "3"
            }
          ],
          "conf": A("l34_cc", "El 11 aparece 3 veces. Comprobamos: 3, 5, 8, 7, 7, 3 y 3 suman 36.")
        },
        {
          "preg": "¿Cuál es el grupo <b>más numeroso</b> de chicos con la misma edad?",
          "audio": A("l34_d", "¿Cuál es el grupo más numeroso de chicos con la misma edad?"),
          "opc": [
            "Los de 8 años",
            "Los de 9 años",
            "Los de 10 años",
            "Los de 7 años"
          ],
          "conf": A("l34_dc", "Los de 8 años: son 8 chicos.")
        },
        {
          "preg": "¿Es cierto que <b>más de la mitad</b> tiene más de 8 años?",
          "audio": A("l34_e", "¿Es cierto que más de la mitad de los chicos tiene más de 8 años?"),
          "opc": [
            "Sí: son 20 de 36",
            "No: son 16 de 36",
            "Es justo la mitad",
            "No: son 8"
          ],
          "conf": A("l34_ec", "De 9 a 12 años: 7 más 7 más 3 más 3, 20 chicos. La mitad de 36 es 18, así que sí.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre3", "¡Misión cumplida! Terminaste Rumbo a la Luna. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
