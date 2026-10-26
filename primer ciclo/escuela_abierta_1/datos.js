/* datos.js — "Bienvenidos a la Escuela Abierta" · Parte 1 · Entradas y tiro al blanco · 3er grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 3 (DGE Mendoza), págs. 33 a 38.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Bienvenidos a la Escuela Abierta",
    "subtitulo": "Entradas y precios, sumas y restas, el tiro al blanco y el valor de las cifras",
    "grado": "3er grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "portada.jpg",
    "imgCierre": "tiro_blanco.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Bienvenidos a la Escuela Abierta» (págs. 33 a 38) del cuadernillo «Aventureros de la Matemática 3», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo.",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "corto": "Escuela Abierta 1",
    "parte": "Parte 1 · Entradas y tiro al blanco"
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Bienvenidos a la Escuela Abierta",
      "vis": {
        "t": "img",
        "src": "portada.jpg",
        "h": 40,
        "id": "nport"
      },
      "pasos": [
        {
          "audio": A("p01_1", "¡Bienvenidos a la Escuela Abierta! La escuela abre sus puertas a la comunidad, y esta vez organizó la Gran Feria de Juegos, Arte y Aventuras."),
          "chip": "🎪 La Gran Feria de Juegos, Arte y Aventuras",
          "destacar": [
            "nport"
          ]
        },
        {
          "audio": A("p01_2", "Los chicos de tercer grado ayudan a preparar el espacio de Matemática. Acompañalos a resolver cada desafío."),
          "chip": "🧮 ¡Acompañá a tercer grado en cada desafío!"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Entradas, precios y cuentas",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "boleteria.jpg",
            "h": 30
          },
          {
            "t": "precios",
            "id": "pz",
            "titulo": "🎟️ Entradas",
            "items": [
              [
                "Entrada (no incluye juegos)",
                "$4.000"
              ],
              [
                "Entrada (incluye 3 juegos)",
                "$6.000"
              ],
              [
                "Boleto para cada juego individual",
                "$2.000"
              ],
              [
                "Alumnos de la escuela",
                "¡Gratis!"
              ]
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p02_1", "Los papás de la Cooperadora quieren juntar fondos para el laboratorio de ciencias. Por eso cobran la entrada."),
          "chip": "🧪 La Cooperadora junta fondos para el laboratorio"
        },
        {
          "audio": A("p02_2", "La entrada que no incluye juegos cuesta 4000 pesos."),
          "destacar": [
            "pz_0"
          ],
          "apuntar": "pz_0",
          "chip": "Entrada sin juegos: $4.000"
        },
        {
          "audio": A("p02_3", "La entrada que incluye 3 juegos cuesta 6000 pesos."),
          "destacar": [
            "pz_1"
          ],
          "apuntar": "pz_1",
          "chip": "Entrada con 3 juegos: $6.000"
        },
        {
          "audio": A("p02_4", "Sin esa entrada, cada juego se paga aparte: 2000 pesos el boleto."),
          "destacar": [
            "pz_2"
          ],
          "apuntar": "pz_2",
          "chip": "Cada juego suelto: $2.000"
        },
        {
          "audio": A("p02_5", "Y los alumnos de la escuela no pagan: entran y juegan gratis."),
          "destacar": [
            "pz_3"
          ],
          "apuntar": "pz_3",
          "chip": "🎒 Alumnos: ¡gratis!"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Entradas y precios",
      "deco": "boleteria.jpg",
      "vis": {
        "t": "precios",
        "id": "pz",
        "titulo": "🎟️ Entradas",
        "items": [
          [
            "Entrada (no incluye juegos)",
            "$4.000"
          ],
          [
            "Entrada (incluye 3 juegos)",
            "$6.000"
          ],
          [
            "Boleto para cada juego individual",
            "$2.000"
          ],
          [
            "Alumnos de la escuela",
            "¡Gratis!"
          ]
        ]
      },
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "instr": A("p03_i", "Usá la pizarra de precios para resolver cada problema."),
      "items": [
        {
          "preg": "La familia de Guada: Guada (alumna de 3.°), su hermano y sus papás. Compraron <b>2 entradas sin juegos</b> y <b>1 entrada con 3 juegos</b>. ¿Cuánto pagaron?",
          "audio": A("p03_a", "La familia de Guada compró 2 entradas sin juegos y 1 entrada con 3 juegos. ¿Cuánto pagaron?"),
          "opc": [
            "$14.000",
            "$12.000",
            "$18.000",
            "$10.000"
          ],
          "conf": A("p03_ac", "¡Muy bien! Dos entradas de 4000 son 8000, más 6000: 14000 pesos. Guada no paga porque es alumna."),
          "pista": A("p03_ap", "Sumá dos entradas de 4000 y una de 6000. Guada no paga.")
        },
        {
          "preg": "Otra familia: los papás, dos abuelos y un niño. Compraron <b>todas entradas sin juegos</b>. ¿Cuánto pagaron?",
          "audio": A("p03_b", "Otra familia: los papás, dos abuelos y un niño. Compraron todas entradas sin juegos. ¿Cuánto pagaron?"),
          "opc": [
            "$20.000",
            "$16.000",
            "$12.000",
            "$24.000"
          ],
          "conf": A("p03_bc", "Son 5 personas. 5 veces 4000 es 20000 pesos."),
          "pista": A("p03_bp", "Contá las personas: papá, mamá, dos abuelos y el niño.")
        },
        {
          "preg": "El niño jugó <b>3 juegos</b> y pagó un <b>boleto por cada juego</b>. ¿Cuánto gastaron en juegos?",
          "audio": A("p03_c", "El niño jugó 3 juegos y pagó un boleto por cada uno. ¿Cuánto gastaron en juegos?"),
          "opc": [
            "$6.000",
            "$2.000",
            "$3.000",
            "$8.000"
          ],
          "conf": A("p03_cc", "Tres boletos de 2000 son 6000 pesos.")
        },
        {
          "preg": "Para el niño, ¿convenía comprar la <b>entrada de $6.000</b> que incluye 3 juegos?",
          "audio": A("p03_d", "Para el niño, ¿convenía comprar la entrada de 6000 que incluye 3 juegos?"),
          "opc": [
            "Sí, se ahorraban $4.000",
            "No, era más cara",
            "Sí, se ahorraban $2.000",
            "Daba lo mismo"
          ],
          "conf": A("p03_dc", "¡Exacto! El niño gastó 4000 de entrada más 6000 en juegos: 10000. Con la entrada de 6000 se ahorraban 4000."),
          "pista": A("p03_dp", "Calculá cuánto gastó el niño en total y comparalo con 6000.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: ¿sumar o restar?",
      "deco": "boleteria.jpg",
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "vis": {
        "t": "caja",
        "cls": "datos",
        "items": [
          {
            "t": "txt",
            "cls": "grande",
            "h": "🪑 Sillas necesarias: <b>425</b><br>🏫 Sillas de la escuela: <b>230</b><br>⚽ Sillas del club: <b>?</b>"
          }
        ]
      },
      "instr": A("p04_i", "En una escuela van a colocar 425 sillas para una obra de teatro. La escuela tiene 230 y el resto lo presta un club."),
      "items": [
        {
          "preg": "¿Qué cálculo permite saber cuántas sillas presta el club?",
          "audio": A("p04_a", "¿Qué cálculo permite saber cuántas sillas presta el club?"),
          "opc": [
            "425 − 230",
            "425 + 230"
          ],
          "conf": A("p04_ac", "Correcto: hay que restar. Lo que falta para llegar a 425 lo presta el club."),
          "pista": A("p04_ap", "Si sumás, tenés más sillas de las que se necesitan. ¿Cuántas faltan?")
        },
        {
          "preg": "¿Cuántas sillas tiene que prestar el club?",
          "audio": A("p04_b", "¿Cuántas sillas tiene que prestar el club?"),
          "opc": [
            "195",
            "655",
            "205",
            "295"
          ],
          "conf": A("p04_bc", "425 menos 230 es 195 sillas.")
        },
        {
          "vis": {
            "t": "caja",
            "cls": "datos",
            "items": [
              {
                "t": "txt",
                "cls": "grande",
                "h": "💐 Vende <b>1.000</b> flores por semana<br>📅 Lunes: <b>470</b> · Jueves: <b>330</b>"
              }
            ]
          },
          "preg": "Una florería vende 1.000 flores por semana. El lunes vendió 470 y el jueves 330. ¿Cuántas flores le falta vender?",
          "audio": A("p04_c", "Una florería vende 1000 flores por semana. El lunes vendió 470 y el jueves 330. ¿Cuántas le falta vender?"),
          "opc": [
            "200",
            "1.800",
            "800",
            "530"
          ],
          "conf": A("p04_cc", "470 más 330 son 800. Para llegar a 1000 faltan 200 flores.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: corregimos cuentas",
      "deco": "calculadoras.jpg",
      "instr": A("p05_i", "Mirá cada cuenta. Algunas tienen errores: encontrá el resultado correcto."),
      "items": [
        {
          "vis": {
            "t": "cuenta",
            "id": "c1",
            "op": "+",
            "a": "458",
            "b": "267",
            "r": "6.125",
            "mal": true
          },
          "preg": "Esta suma dio 6.125. ¿Cuál es el resultado correcto?",
          "audio": A("p05_a", "Esta suma dio 6125. ¿Cuál es el resultado correcto?"),
          "opc": [
            "725",
            "615",
            "6.125",
            "715"
          ],
          "escribir": [
            {
              "id": "c1_r",
              "h": "725"
            }
          ],
          "conf": A("p05_ac", "458 más 267 es 725. En los dieces dio 12: había que escribir el 2 y llevar 1 a los cienes."),
          "pista": A("p05_ap", "Sumá desde los unos. Si un lugar da 10 o más, se lleva al lugar siguiente.")
        },
        {
          "vis": {
            "t": "cuenta",
            "id": "c2",
            "op": "−",
            "a": "563",
            "b": "415",
            "r": "112",
            "mal": true
          },
          "preg": "Esta resta dio 112. ¿Cuál es el resultado correcto?",
          "audio": A("p05_b", "Esta resta dio 112. ¿Cuál es el resultado correcto?"),
          "opc": [
            "148",
            "152",
            "112",
            "158"
          ],
          "escribir": [
            {
              "id": "c2_r",
              "h": "148"
            }
          ],
          "conf": A("p05_bc", "563 menos 415 es 148. El error fue hacer 5 menos 3 en los unos; hay que desarmar un diez."),
          "pista": A("p05_bp", "En los unos no se puede hacer 3 menos 5. Desarmá un diez.")
        },
        {
          "vis": {
            "t": "cuenta",
            "id": "c3",
            "op": "−",
            "a": "?",
            "b": "235",
            "r": "239"
          },
          "preg": "¿Qué número falta arriba? <small>(Pensá en una suma: 239 + 235)</small>",
          "audio": A("p05_c", "¿Qué número falta arriba? Pensá qué suma te ayuda."),
          "opc": [
            "474",
            "4",
            "464",
            "484"
          ],
          "escribir": [
            {
              "id": "c3_a",
              "h": "474"
            }
          ],
          "conf": A("p05_cc", "239 más 235 es 474. Comprobamos: 474 menos 235 es 239."),
          "pista": A("p05_cp", "Si le quitamos 235 y quedan 239, sumá 239 más 235.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "El juego del tiro al blanco",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "tiro_blanco.jpg",
            "h": 34
          },
          {
            "t": "col",
            "items": [
              {
                "t": "globos",
                "h": 10
              },
              {
                "t": "premios"
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p06_1", "En el tiro al blanco, cada jugador tiene 5 tiros. Cada globo da puntos según su color."),
          "chip": "🎯 5 tiros por jugador"
        },
        {
          "audio": A("p06_2", "El globo rojo vale 1000 puntos."),
          "destacar": [
            "gl_rojo"
          ],
          "apuntar": "gl_rojo",
          "chip": "🔴 Rojo: 1.000"
        },
        {
          "audio": A("p06_3", "El azul vale 100."),
          "destacar": [
            "gl_azul"
          ],
          "apuntar": "gl_azul",
          "chip": "🔵 Azul: 100"
        },
        {
          "audio": A("p06_4", "El amarillo vale 10."),
          "destacar": [
            "gl_amarillo"
          ],
          "apuntar": "gl_amarillo",
          "chip": "🟡 Amarillo: 10"
        },
        {
          "audio": A("p06_5", "Y el verde vale 1."),
          "destacar": [
            "gl_verde"
          ],
          "apuntar": "gl_verde",
          "chip": "🟢 Verde: 1"
        },
        {
          "audio": A("p06_6", "Con los puntos se gana un premio: A, de 300 a 1000; B, de 1001 a 1500; C, de 1501 a 3000; y D, de 3001 a 5000."),
          "destacar": [
            "pr_A",
            "pr_B",
            "pr_C",
            "pr_D"
          ],
          "chip": "🎁 Premios según el puntaje"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Tiro al blanco: ¿cuántos puntos?",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "globos",
            "h": 10
          },
          {
            "t": "premios"
          }
        ]
      },
      "pista": A("p07_p", "Mirá cuánto vale cada globo y sumá."),
      "instr": A("p07_i", "Calculá los puntos de cada jugador. Fijate en el valor de cada globo."),
      "items": [
        {
          "preg": "El hermanito de Guada explotó <b>1 globo rojo</b> y <b>1 verde</b>. ¿Qué puntaje obtuvo?",
          "audio": A("p07_a", "El hermanito de Guada explotó 1 globo rojo y 1 verde. ¿Qué puntaje obtuvo?"),
          "opc": [
            "1.001",
            "1.100",
            "1.010",
            "2"
          ],
          "conf": A("p07_ac", "1000 más 1 es 1001 puntos."),
          "destacar": [
            "gl_rojo",
            "gl_verde"
          ]
        },
        {
          "preg": "Con <b>1.001 puntos</b>, ¿qué premio ganó?",
          "audio": A("p07_b", "Con 1001 puntos, ¿qué premio ganó?"),
          "opc": [
            "Premio B",
            "Premio A",
            "Premio C",
            "Premio D"
          ],
          "conf": A("p07_bc", "El premio B va de 1001 a 1500. ¡1001 entra justo!")
        },
        {
          "preg": "Guada explotó <b>2 azules</b>, <b>2 rojos</b> y <b>1 amarillo</b>. ¿Cuántos puntos hizo?",
          "audio": A("p07_c", "Guada explotó 2 azules, 2 rojos y 1 amarillo. ¿Cuántos puntos hizo?"),
          "opc": [
            "2.210",
            "2.120",
            "5",
            "2.201"
          ],
          "conf": A("p07_cc", "Dos rojos, 2000; dos azules, 200; un amarillo, 10. Total: 2210.")
        },
        {
          "preg": "Guada dice que tuvo <b>más suerte con el premio</b> que su hermano. ¿Es verdad?",
          "audio": A("p07_d", "Guada dice que tuvo más suerte con el premio que su hermano. ¿Es verdad?"),
          "opc": [
            "Sí, ganó el premio C",
            "No, ganó el premio B",
            "No, ganó el premio A",
            "Sí, ganó el premio D"
          ],
          "conf": A("p07_dc", "Es verdad: 2210 está entre 1501 y 3000. Ganó el premio C, mejor que el B.")
        },
        {
          "preg": "Un niño hizo <b>2.101 puntos</b>. ¿Qué globos explotó?",
          "audio": A("p07_e", "Un niño hizo 2101 puntos. ¿Qué globos explotó?"),
          "opc": [
            "2 rojos, 1 azul y 1 verde",
            "2 rojos y 1 verde",
            "2 azules, 1 amarillo y 1 verde",
            "1 rojo, 1 azul y 1 verde"
          ],
          "conf": A("p07_ec", "2000 más 100 más 1 es 2101. Explotó 4 globos: un tiro no le dio a ninguno.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Tiro al blanco: el mejor premio",
      "vf": true,
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "globos",
            "h": 10
          },
          {
            "t": "premios"
          }
        ]
      },
      "instr": A("p08_i", "Un niño quiere ganar el premio D, de 3001 a 5000 puntos, con 5 tiros. ¿Es verdadero o falso?"),
      "items": [
        {
          "preg": "Si explota <b>3 rojos y 1 verde</b>, gana el premio D.",
          "audio": A("p08_a", "Si explota 3 rojos y 1 verde, gana el premio D."),
          "v": true,
          "conf": A("p08_ac", "Verdadero: 3000 más 1 es 3001, justo para el premio D."),
          "destacar": [
            "pr_D"
          ]
        },
        {
          "preg": "Si explota <b>2 rojos y 3 azules</b>, gana el premio D.",
          "audio": A("p08_b", "Si explota 2 rojos y 3 azules, gana el premio D."),
          "v": false,
          "conf": A("p08_bc", "Falso: 2000 más 300 es 2300. Eso es premio C.")
        },
        {
          "preg": "Si explota <b>5 rojos</b>, gana el premio D.",
          "audio": A("p08_c", "Si explota 5 rojos, gana el premio D."),
          "v": true,
          "conf": A("p08_cc", "Verdadero: 5 rojos son 5000, el máximo puntaje.")
        },
        {
          "preg": "Hay <b>una única forma</b> de ganar el premio D.",
          "audio": A("p08_d", "Hay una única forma de ganar el premio D."),
          "v": false,
          "conf": A("p08_dc", "Falso: hay muchas formas, como 3 rojos y 1 verde, 4 rojos o 5 rojos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Amparo y Lautaro",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "amparo_lautaro.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "h": "👧 Amparo: «Obtuve <b>1.102</b> puntos» · 👦 Lautaro: «Exploté los mismos globos que vos y obtuve <b>1.201</b>»"
          }
        ]
      },
      "instr": A("p09_i", "Amparo hizo 1102 puntos. Lautaro dice que explotó los mismos globos y obtuvo 1201."),
      "items": [
        {
          "preg": "¿Estás de acuerdo con Lautaro?",
          "audio": A("p09_a", "¿Estás de acuerdo con Lautaro?"),
          "opc": [
            "No: con los mismos globos se obtiene el mismo puntaje",
            "Sí: 1.201 es lo mismo que 1.102",
            "Sí: los dos números tienen las mismas cifras",
            "No: Lautaro hizo más tiros"
          ],
          "conf": A("p09_ac", "No puede ser. 1102 es 1 rojo, 1 azul y 2 verdes. 1201 es 1 rojo, 2 azules y 1 verde. ¡El lugar de cada cifra cambia su valor!"),
          "pista": A("p09_ap", "Pensá qué globos forman 1102 y cuáles forman 1201.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: miles, cienes, dieces y unos",
      "deco": "tiro_blanco.jpg",
      "vis": {
        "t": "tabla",
        "id": "vq",
        "cab": [
          "Miles",
          "Cienes",
          "Dieces",
          "Unos"
        ],
        "filas": [
          [
            "?",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "instr": A("p10_i", "Armamos números con miles, cienes, dieces y unos."),
      "items": [
        {
          "vis": {
            "t": "tabla",
            "id": "vp",
            "cab": [
              "Miles",
              "Cienes",
              "Dieces",
              "Unos"
            ],
            "filas": [
              [
                "2",
                "8",
                "6",
                "7"
              ]
            ]
          },
          "preg": "¿Cómo se escribe <b>2.867</b> como suma de miles, cienes, dieces y unos?",
          "audio": A("p10_a", "¿Cómo se escribe 2867 como suma de miles, cienes, dieces y unos?"),
          "opc": [
            "2.000 + 800 + 60 + 7",
            "2 + 8 + 6 + 7",
            "200 + 800 + 60 + 7",
            "2.000 + 80 + 600 + 7"
          ],
          "conf": A("p10_ac", "2 miles, 8 cienes, 6 dieces y 7 unos: 2000 más 800 más 60 más 7.")
        },
        {
          "vis": {
            "t": "tabla",
            "id": "vq",
            "cab": [
              "Miles",
              "Cienes",
              "Dieces",
              "Unos"
            ],
            "filas": [
              [
                "?",
                "?",
                "?",
                "?"
              ]
            ]
          },
          "preg": "¿Qué número se forma con <b>3 × 1.000 + 4 × 100 + 2 × 1</b>?",
          "audio": A("p10_b", "¿Qué número se forma con 3 por 1000, más 4 por 100, más 2 por 1?"),
          "opc": [
            "3.402",
            "3.420",
            "342",
            "3.042"
          ],
          "escribir": [
            {
              "id": "vq_0_0",
              "h": "3"
            },
            {
              "id": "vq_0_1",
              "h": "4"
            },
            {
              "id": "vq_0_2",
              "h": "0"
            },
            {
              "id": "vq_0_3",
              "h": "2"
            }
          ],
          "conf": A("p10_bc", "3 miles, 4 cienes, ningún diez y 2 unos: 3402. El cero ocupa el lugar de los dieces."),
          "pista": A("p10_bp", "No hay dieces: en ese lugar va un cero.")
        },
        {
          "preg": "¿Qué hay que <b>agregarle</b> a esa expresión para formar <b>3.552</b>?",
          "audio": A("p10_c", "¿Qué hay que agregarle a esa expresión para formar 3552?"),
          "opc": [
            "1 × 100 + 5 × 10",
            "5 × 10",
            "1 × 100 + 5 × 1",
            "15 × 1"
          ],
          "escribir": [
            {
              "id": "vq_0_1",
              "h": "5"
            },
            {
              "id": "vq_0_2",
              "h": "5"
            }
          ],
          "conf": A("p10_cc", "De 3402 a 3552 faltan 1 cien y 5 dieces: 1 por 100 más 5 por 10.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el número 5.055",
      "deco": "tiro_blanco.jpg",
      "vf": true,
      "vis": {
        "t": "tabla",
        "id": "vr",
        "cab": [
          "Miles",
          "Cienes",
          "Dieces",
          "Unos"
        ],
        "filas": [
          [
            "5",
            "0",
            "5",
            "5"
          ]
        ]
      },
      "instr": A("p11_i", "Leé cada expresión de la pantalla. ¿Forma el número 5055?"),
      "items": [
        {
          "preg": "10 + 10 + 10 + 1 + 1 + 1.000 + 1.000 + 1.000 + 10 + 1 + 10 + 1.000 + 1 <br>forma el <b>5.055</b>",
          "audio": A("p11_a", "Primera expresión. ¿Forma el 5055?"),
          "v": false,
          "conf": A("p11_ac", "Falso: tiene 4 miles, 5 dieces y 4 unos. Forma 4054.")
        },
        {
          "preg": "5 × 10 + 5 × 1.000 + 5 × 1 <br>forma el <b>5.055</b>",
          "audio": A("p11_b", "Segunda expresión. ¿Forma el 5055?"),
          "v": true,
          "conf": A("p11_bc", "Verdadero: 50 más 5000 más 5 es 5055. El orden no cambia el resultado.")
        },
        {
          "preg": "5 × 1.000 + 10 + 10 + 10 + 10 + 10 + 5 × 1 <br>forma el <b>5.055</b>",
          "audio": A("p11_c", "Tercera expresión. ¿Forma el 5055?"),
          "v": true,
          "conf": A("p11_cc", "Verdadero: 5000, más cinco dieces que son 50, más 5.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la calculadora",
      "instr": A("p12_i", "Probamos con la calculadora para descubrir qué pasa con los números."),
      "items": [
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "calculadoras.jpg",
                "h": 32
              },
              {
                "t": "calc",
                "disp": "345 + 10 = 355"
              }
            ]
          },
          "preg": "345 + 10 = 355. ¿Qué cambia cuando a un número le sumás 10?",
          "audio": A("p12_a", "¿Qué cambia cuando a un número le sumás 10?"),
          "opc": [
            "Aumenta 1 la cifra de los dieces",
            "Aumenta 1 la cifra de los unos",
            "Se agrega un 0 al final",
            "Aumenta 1 la cifra de los cienes"
          ],
          "conf": A("p12_ac", "Al sumar 10, la cifra de los dieces aumenta 1 y los unos quedan igual.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "calculadoras.jpg",
                "h": 32
              },
              {
                "t": "calc",
                "disp": "345 − 10 = 335"
              }
            ]
          },
          "preg": "345 − 10 = 335. ¿Qué pasa cuando le restás 10?",
          "audio": A("p12_b", "¿Y qué pasa cuando le restás 10?"),
          "opc": [
            "Disminuye 1 la cifra de los dieces",
            "Aumenta 1 la cifra de los dieces",
            "Disminuye 1 la cifra de los unos",
            "No cambia nada"
          ],
          "conf": A("p12_bc", "Al restar 10, la cifra de los dieces baja 1. Es lo contrario de sumar 10.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "calculadoras.jpg",
                "h": 32
              },
              {
                "t": "calc",
                "disp": "52 × ? = 5200"
              }
            ]
          },
          "preg": "¿Por qué número se multiplica 52 para obtener <b>5.200</b>?",
          "audio": A("p12_c", "¿Por qué número se multiplica 52 para obtener 5200?"),
          "opc": [
            "100",
            "10",
            "1.000",
            "50"
          ],
          "conf": A("p12_cc", "52 por 100 es 5200: se agregan dos ceros.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "calculadoras.jpg",
                "h": 32
              },
              {
                "t": "calc",
                "disp": "? × 10 × 10 = 3800"
              }
            ]
          },
          "preg": "¿Qué número, multiplicado <b>dos veces por 10</b>, da <b>3.800</b>?",
          "audio": A("p12_d", "¿Qué número, multiplicado dos veces por 10, da 3800?"),
          "opc": [
            "38",
            "380",
            "3.800",
            "308"
          ],
          "conf": A("p12_dc", "38 por 10 es 380, y 380 por 10 es 3800.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la feria",
      "n": 9,
      "img": "tiro_blanco.jpg",
      "instr": A("s1_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "ENTRADA",
          "audio": A("s1_1", "Entrada: sin juegos costaba 4000 pesos.")
        },
        {
          "w": "BOLETO",
          "audio": A("s1_2", "Boleto: para jugar un juego suelto.")
        },
        {
          "w": "GLOBOS",
          "audio": A("s1_3", "Globos: cada color vale distinto en el tiro al blanco.")
        },
        {
          "w": "PREMIO",
          "audio": A("s1_4", "Premio: se gana según el puntaje.")
        },
        {
          "w": "MILES",
          "audio": A("s1_5", "Miles: el globo rojo vale mil.")
        },
        {
          "w": "CIENES",
          "audio": A("s1_6", "Cienes: el globo azul vale cien.")
        },
        {
          "w": "DIECES",
          "audio": A("s1_7", "Dieces: el globo amarillo vale diez.")
        }
      ],
      "fin": A("s1_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre1", "Terminaste la primera parte de la Escuela Abierta. Mirá tus resultados y envialos a tu seño. En la parte 2 te esperan las figuras.")
    }
  ]
};
