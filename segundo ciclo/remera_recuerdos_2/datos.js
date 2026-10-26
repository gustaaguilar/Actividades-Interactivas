/* datos.js — "Una remera, miles de recuerdos" · Parte 2 · Una bandera para representar nuestra historia · 7.° grado · Matemática · QueSepanTodos.com
   Elaboración propia basada en «Aventureros de la Matemática 7» (DGE Mendoza, PEAMM), págs. 42 a 44.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Una remera, miles de recuerdos",
    "corto": "Una remera, miles de recuerdos 2",
    "emoji": "👕",
    "parte": "Parte 2 · Una bandera para representar nuestra historia",
    "subtitulo": "Combinatoria y probabilidad: banderas, letras, combos, podios, llaveros y música para la fiesta",
    "grado": "7.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "bandera_votacion.jpg",
    "imgCierre": "arbol_letras.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Una remera, miles de recuerdos» (págs. 42 a 44) del cuadernillo «Aventureros de la Matemática 7», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Una bandera para la promoción",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "bandera_votacion.jpg",
            "h": 26
          },
          {
            "t": "tabla",
            "id": "bd",
            "cab": [
              "Superior ↓ / Inferior →",
              "Celeste",
              "Beige",
              "Violeta",
              "Rosado"
            ],
            "filas": [
              [
                "Celeste",
                "—",
                "✔",
                "✔",
                "✔"
              ],
              [
                "Beige",
                "✔",
                "—",
                "✔",
                "✔"
              ],
              [
                "Violeta",
                "✔",
                "✔",
                "—",
                "✔"
              ],
              [
                "Rosado",
                "✔",
                "✔",
                "✔",
                "—"
              ]
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("r10_1", "La bandera tendrá dos franjas horizontales, y cada una puede ser celeste, beige, violeta o rosado, sin repetir."),
          "chip": "🏳️ 2 franjas · 4 colores · sin repetir"
        },
        {
          "audio": A("r10_2", "Para contar las posibilidades, armamos una tabla de doble entrada: para la franja de arriba hay 4 colores, y para la de abajo quedan 3."),
          "destacar": [
            "bd"
          ],
          "chip": "4 × 3 posibilidades"
        },
        {
          "audio": A("r10_3", "Así obtenemos 12 banderas distintas. La probabilidad de cada una, si se elige al azar, es 1 de 12."),
          "chip": "12 banderas distintas"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las banderas",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "txt",
            "h": "🗳️ En la urna están las <b>12 banderas</b> posibles"
          },
          {
            "t": "tabla",
            "id": "bd",
            "cab": [
              "Superior ↓ / Inferior →",
              "Celeste",
              "Beige",
              "Violeta",
              "Rosado"
            ],
            "filas": [
              [
                "Celeste",
                "—",
                "✔",
                "✔",
                "✔"
              ],
              [
                "Beige",
                "✔",
                "—",
                "✔",
                "✔"
              ],
              [
                "Violeta",
                "✔",
                "✔",
                "—",
                "✔"
              ],
              [
                "Rosado",
                "✔",
                "✔",
                "✔",
                "—"
              ]
            ]
          }
        ]
      },
      "deco": "bandera_votacion.jpg",
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "instr": A("r11_i", "Ponen las 12 banderas posibles en una urna y sacan una al azar."),
      "items": [
        {
          "preg": "¿Cuántas banderas distintas se pueden diseñar?",
          "audio": A("r11_a", "¿Cuántas banderas distintas se pueden diseñar?"),
          "opc": [
            "12",
            "16",
            "8",
            "4"
          ],
          "conf": A("r11_ac", "4 colores para arriba por 3 para abajo: 12.")
        },
        {
          "preg": "¿Probabilidad de que tenga <b>celeste en la franja superior</b>?",
          "audio": A("r11_b", "¿Qué probabilidad hay de sacar una bandera con celeste en la franja superior?"),
          "opc": [
            "3/12 = 1/4",
            "1/12",
            "4/12 = 1/3",
            "6/12 = 1/2"
          ],
          "conf": A("r11_bc", "Con celeste arriba hay 3 banderas, una por cada color de abajo: 3 de 12, un cuarto.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Más preguntas de la urna",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "txt",
            "h": "🗳️ En la urna están las <b>12 banderas</b> posibles"
          },
          {
            "t": "tabla",
            "id": "bd",
            "cab": [
              "Superior ↓ / Inferior →",
              "Celeste",
              "Beige",
              "Violeta",
              "Rosado"
            ],
            "filas": [
              [
                "Celeste",
                "—",
                "✔",
                "✔",
                "✔"
              ],
              [
                "Beige",
                "✔",
                "—",
                "✔",
                "✔"
              ],
              [
                "Violeta",
                "✔",
                "✔",
                "—",
                "✔"
              ],
              [
                "Rosado",
                "✔",
                "✔",
                "✔",
                "—"
              ]
            ]
          }
        ]
      },
      "deco": "bandera_votacion.jpg",
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "instr": A("r11b_i", "Seguimos sacando banderas al azar de la urna con las 12 banderas."),
      "items": [
        {
          "preg": "¿Probabilidad de que tenga los colores <b>celeste y beige</b>?",
          "audio": A("r11_c", "¿Qué probabilidad hay de que tenga los colores celeste y beige?"),
          "opc": [
            "2/12 = 1/6",
            "1/12",
            "4/12",
            "3/12"
          ],
          "conf": A("r11_cc", "Celeste arriba y beige abajo, o al revés: 2 de 12, un sexto.")
        },
        {
          "preg": "¿Probabilidad de que tenga <b>violeta o rosado</b>?",
          "audio": A("r11_d", "¿Qué probabilidad hay de que tenga violeta o rosado?"),
          "opc": [
            "10/12 = 5/6",
            "2/12",
            "6/12",
            "8/12"
          ],
          "conf": A("r11_dc", "Solo 2 banderas no tienen ni violeta ni rosado: celeste y beige, y beige y celeste. 10 de 12, cinco sextos.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "El diagrama de árbol",
      "vis": {
        "t": "img",
        "src": "arbol_letras.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("r12n_1", "Para el nombre de la promoción eligen un tipo de letra y un color. Para ver todas las posibilidades usan un diagrama de árbol."),
          "chip": "🌳 Diagrama de árbol"
        },
        {
          "audio": A("r12n_2", "De cada tipo de letra salen ramas, una por cada color posible. Cada camino completo es una combinación."),
          "chip": "Cada camino = una combinación"
        },
        {
          "audio": A("r12n_3", "Contando los caminos sabemos cuántas combinaciones hay, sin olvidarnos ninguna."),
          "chip": "¡Contamos los caminos!"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las letras del nombre",
      "vis": {
        "t": "img",
        "src": "arbol_letras.jpg",
        "h": 34
      },
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "instr": A("r12_i", "Las letras pueden ser imprenta mayúscula, cursiva, grafiti o bloque, en color negro, gris, verde o marrón. Mirá el diagrama de árbol."),
      "items": [
        {
          "preg": "En la rama de <b>imprenta mayúscula</b>, ¿qué color falta?",
          "audio": A("r12_a", "En la rama de imprenta mayúscula, ¿qué color falta?"),
          "opc": [
            "Verde",
            "Negro",
            "Gris",
            "Marrón"
          ],
          "conf": A("r12_ac", "Tiene negro, gris y marrón: falta el verde.")
        },
        {
          "preg": "¿Cuántas combinaciones de tipo y color hay en total?",
          "audio": A("r12_b", "¿Cuántas combinaciones de tipo y color de letra hay en total?"),
          "opc": [
            "16",
            "8",
            "12",
            "4"
          ],
          "conf": A("r12_bc", "4 tipos por 4 colores: 16 combinaciones.")
        },
        {
          "preg": "¿Probabilidad de obtener letras de color <b>verde</b>?",
          "audio": A("r12_c", "¿Qué probabilidad hay de obtener letras de color verde?"),
          "opc": [
            "4/16 = 1/4",
            "1/16",
            "1/2",
            "3/16"
          ],
          "conf": A("r12_cc", "Hay una combinación verde por cada tipo de letra: 4 de 16, un cuarto.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el combo almuerzo",
      "deco": "bandera_votacion.jpg",
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "vis": {
        "t": "txt",
        "h": "🍽️ Platos: <b>tarta de verdura · ensalada completa · sándwich de pollo</b><br>🥤 Bebidas: <b>agua mineral · jugo de naranja · licuado de frutilla</b>"
      },
      "instr": A("r13_i", "El combo almuerzo tiene un plato principal y una bebida, cada uno a elegir entre tres opciones."),
      "items": [
        {
          "preg": "¿De cuántas formas distintas se puede armar el combo?",
          "audio": A("r13_a", "¿De cuántas formas distintas se puede armar el combo?"),
          "opc": [
            "9",
            "6",
            "3",
            "12"
          ],
          "conf": A("r13_ac", "3 platos por 3 bebidas: 9 combos.")
        },
        {
          "preg": "Al azar, ¿probabilidad de que incluya <b>agua mineral</b>?",
          "audio": A("r13_b", "Si se elige al azar, ¿qué probabilidad hay de que incluya agua mineral?"),
          "opc": [
            "3/9 = 1/3",
            "1/9",
            "1/2",
            "6/9"
          ],
          "conf": A("r13_bc", "El agua va con cualquiera de los 3 platos: 3 de 9, un tercio.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Más preguntas del combo",
      "deco": "bandera_votacion.jpg",
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "vis": {
        "t": "txt",
        "h": "🍽️ Platos: <b>tarta de verdura · ensalada completa · sándwich de pollo</b><br>🥤 Bebidas: <b>agua mineral · jugo de naranja · licuado de frutilla</b><br>👉 <b>9 combos</b> posibles"
      },
      "instr": A("r13b_i", "Seguimos con los 9 combos posibles, elegidos al azar."),
      "items": [
        {
          "preg": "¿Probabilidad de <b>tarta con licuado</b>?",
          "audio": A("r13_c", "¿Qué probabilidad hay de que sea tarta de verdura con licuado de frutilla?"),
          "opc": [
            "1/9",
            "1/3",
            "2/9",
            "1/6"
          ],
          "conf": A("r13_cc", "Es un solo combo de los 9: un noveno.")
        },
        {
          "preg": "¿Probabilidad de que el plato <b>no</b> sea sándwich de pollo?",
          "audio": A("r13_d", "¿Qué probabilidad hay de que el plato no sea sándwich de pollo?"),
          "opc": [
            "6/9 = 2/3",
            "3/9 = 1/3",
            "1/9",
            "8/9"
          ],
          "conf": A("r13_dc", "Tarta o ensalada, con cualquier bebida: 6 de 9, dos tercios.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el podio del videojuego",
      "deco": "bandera_votacion.jpg",
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "vis": {
        "t": "txt",
        "h": "🏆 Finalistas: <b>Lucas · Sofía · Mateo · Valentina</b><br>Se premian campeón y subcampeón"
      },
      "instr": A("r14_i", "A la final llegaron Lucas, Sofía, Mateo y Valentina. Se premian campeón y subcampeón, y una persona no puede ocupar los dos puestos."),
      "items": [
        {
          "preg": "¿De cuántas maneras puede quedar el podio?",
          "audio": A("r14_a", "¿De cuántas maneras distintas puede quedar el podio?"),
          "opc": [
            "12",
            "16",
            "8",
            "6"
          ],
          "conf": A("r14_ac", "4 posibles campeones, y para cada uno 3 subcampeones: 12. El orden importa.")
        },
        {
          "preg": "¿Probabilidad de que <b>Sofía</b> sea la campeona?",
          "audio": A("r14_b", "Si la final se define al azar, ¿qué probabilidad hay de que Sofía sea la campeona?"),
          "opc": [
            "3/12 = 1/4",
            "1/12",
            "1/2",
            "2/12"
          ],
          "conf": A("r14_bc", "Sofía campeona con 3 subcampeones posibles: 3 de 12, un cuarto.")
        },
        {
          "preg": "¿Probabilidad de que el podio sea <b>Lucas y Mateo</b>, en cualquier orden?",
          "audio": A("r14_c", "¿Qué probabilidad hay de que el podio esté formado por Lucas y Mateo, en cualquier orden?"),
          "opc": [
            "2/12 = 1/6",
            "1/12",
            "4/12",
            "1/4"
          ],
          "conf": A("r14_cc", "Lucas y Mateo, o Mateo y Lucas: 2 de 12, un sexto.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: los llaveros",
      "deco": "bandera_votacion.jpg",
      "vis": {
        "t": "txt",
        "h": "🔑 Base: <b>acrílico o madera</b> · Forma: <b>«7» o remera</b> · Cordón: <b>negro, verde o plateado</b>"
      },
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "instr": A("r15_i", "Para la fiesta de egresados encargan llaveros de recuerdo."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "🔑 Base: <b>acrílico o madera</b> · Forma: <b>«7» o remera</b> · Cordón: <b>negro, verde o plateado</b>"
          },
          "preg": "¿Cuántos modelos de llavero distintos hay?",
          "audio": A("r15_a", "El llavero puede tener base de acrílico o madera, forma de 7 o de remera, y cordón negro, verde o plateado. ¿Cuántos modelos distintos hay?"),
          "opc": [
            "12",
            "7",
            "6",
            "9"
          ],
          "conf": A("r15_ac", "2 materiales por 2 formas por 3 cordones: 12 modelos.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "🔑 Base: <b>acrílico o madera</b> · Forma: <b>«7» o remera</b> · Cordón: <b>negro, verde o plateado</b>"
          },
          "preg": "¿Probabilidad de que toque uno de <b>madera con forma de remera</b>?",
          "audio": A("r15_b", "¿Qué probabilidad hay de que te toque un llavero de madera con forma de remera?"),
          "opc": [
            "3/12 = 1/4",
            "1/12",
            "2/12",
            "6/12"
          ],
          "conf": A("r15_bc", "Madera con remera, con 3 cordones posibles: 3 de 12, un cuarto.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "🔑 Base: <b>acrílico o madera</b> · Forma: <b>«7» o remera</b> · Cordón: <b>negro, verde o plateado</b>"
          },
          "preg": "¿Probabilidad de que tenga <b>cordón plateado</b>?",
          "audio": A("r15_c", "¿Qué probabilidad hay de que tenga cordón plateado?"),
          "opc": [
            "4/12 = 1/3",
            "1/12",
            "3/12",
            "6/12"
          ],
          "conf": A("r15_cc", "Hay 4 llaveros con cordón plateado: 4 de 12, un tercio.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la música del DJ",
      "deco": "bandera_votacion.jpg",
      "vis": {
        "t": "txt",
        "h": "🎵 Géneros: <b>Trap · Pop · Cuarteto · Rock</b> · Primero y segundo"
      },
      "pista": A("r_pi_prob", "Primero contá todas las combinaciones posibles. La probabilidad es casos favorables sobre casos posibles."),
      "instr": A("r15b_i", "El DJ arma un mix eligiendo dos de cuatro géneros: uno suena primero y otro segundo."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "🎵 Géneros: <b>Trap · Pop · Cuarteto · Rock</b> · Primero y segundo"
          },
          "preg": "Mix de dos géneros (primero y segundo): ¿probabilidad de que el <b>Cuarteto</b> suene primero?",
          "audio": A("r15_d", "El DJ arma un mix con dos de cuatro géneros: Trap, Pop, Cuarteto y Rock. ¿Qué probabilidad hay de que el Cuarteto suene primero?"),
          "opc": [
            "3/12 = 1/4",
            "1/12",
            "1/2",
            "2/12"
          ],
          "conf": A("r15_dc", "Hay 4 por 3, 12 mixes. Con Cuarteto primero hay 3: un cuarto.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "🎵 Géneros: <b>Trap · Pop · Cuarteto · Rock</b> · Primero y segundo"
          },
          "preg": "¿Probabilidad de que el mix tenga <b>Trap y Rock</b>, en cualquier orden?",
          "audio": A("r15_e", "¿Qué probabilidad hay de que el mix tenga Trap y Rock, en cualquier orden?"),
          "opc": [
            "2/12 = 1/6",
            "1/12",
            "4/12",
            "1/4"
          ],
          "conf": A("r15_ec", "Trap y Rock, o Rock y Trap: 2 de 12, un sexto.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Contar sin dibujar todo",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Opciones de la 1.ª elección × opciones de la 2.ª elección</div>"
      },
      "deco": "bandera_votacion.jpg",
      "pista": A("r155_p", "Multiplicá las opciones de cada elección. Una probabilidad va de 0, imposible, a 1, seguro."),
      "instr": A("r155_i", "Para contar combinaciones no hace falta dibujar todo: alcanza con multiplicar las opciones de cada elección."),
      "items": [
        {
          "preg": "3 remeras y 2 shorts: ¿cuántos conjuntos distintos?",
          "audio": A("r155_a", "Con 3 remeras y 2 shorts, ¿cuántos conjuntos distintos se pueden armar?"),
          "opc": [
            "6",
            "5",
            "9",
            "8"
          ],
          "conf": A("r155_ac", "3 por 2: 6 conjuntos.")
        },
        {
          "preg": "Bandera de 2 franjas con <b>5</b> colores, sin repetir: ¿cuántas?",
          "audio": A("r155_b", "Si la bandera de 2 franjas pudiera tener 5 colores, sin repetir, ¿cuántas banderas habría?"),
          "opc": [
            "20",
            "25",
            "10",
            "15"
          ],
          "conf": A("r155_bc", "5 colores arriba por 4 abajo: 20 banderas.")
        },
        {
          "preg": "En la urna de las 12 banderas, ¿probabilidad de sacar una de <b>dos colores distintos</b>?",
          "audio": A("r155_c", "En la urna de las 12 banderas, ¿qué probabilidad hay de sacar una de dos colores distintos?"),
          "opc": [
            "1: es seguro",
            "0: es imposible",
            "1/2",
            "1/12"
          ],
          "conf": A("r155_cc", "Todas las banderas tienen dos colores distintos: 12 de 12, es un suceso seguro.")
        },
        {
          "preg": "¿Y de sacar una bandera <b>toda celeste</b>?",
          "audio": A("r155_d", "¿Y qué probabilidad hay de sacar una bandera toda celeste?"),
          "opc": [
            "0: es imposible",
            "1: es seguro",
            "1/4",
            "1/12"
          ],
          "conf": A("r155_dc", "No se puede repetir el color: ninguna bandera es toda celeste. Es un suceso imposible.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la combinatoria",
      "n": 11,
      "img": "bandera_votacion.jpg",
      "instr": A("r16_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "BANDERA",
          "audio": A("r16_1", "Bandera: dos franjas, cuatro colores.")
        },
        {
          "w": "COMBINACION",
          "audio": A("r16_2", "Combinación: cada forma de elegir.")
        },
        {
          "w": "ARBOL",
          "audio": A("r16_3", "Diagrama de árbol: muestra todas las posibilidades.")
        },
        {
          "w": "AZAR",
          "audio": A("r16_4", "Azar: no se sabe qué va a salir.")
        },
        {
          "w": "PODIO",
          "audio": A("r16_5", "Podio: campeón y subcampeón.")
        },
        {
          "w": "LLAVERO",
          "audio": A("r16_6", "Llavero: el souvenir de los egresados.")
        },
        {
          "w": "URNA",
          "audio": A("r16_7", "Urna: de donde se saca al azar.")
        }
      ],
      "fin": A("r16_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre2", "¡Excelente! Terminaste la segunda parte. Mirá tus resultados y envialos a tu docente. En la parte 3 preparamos el escenario.")
    }
  ]
};
