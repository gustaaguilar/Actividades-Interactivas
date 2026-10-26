/* datos.js — "El vivero" · El diseño de macetas · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 33 a 35.
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
    "titulo": "El vivero",
    "corto": "El vivero · El diseño de macetas",
    "parte": "El diseño de macetas",
    "subtitulo": "Sistemas de numeración: el egipcio, el romano y el nuestro, decimal y posicional",
    "imgPortada": "macetas_egipcias.jpg",
    "imgCierre": "alberto_romanos.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en «El diseño de macetas» (págs.33 a 35) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Las macetas egipcias",
      "vis": {
        "t": "img",
        "src": "macetas_egipcias.jpg",
        "h": 36
      },
      "pasos": [
        {
          "audio": A("d01_1", "Alberto les muestra a los chicos unas macetas con símbolos egipcios en su diseño."),
          "chip": "🏺 Macetas con símbolos egipcios"
        },
        {
          "audio": A("d01_2", "Les dice: en estas macetas se escribió el número ciento veintitrés. ¡Pero cada maceta tiene los símbolos en distinto orden!"),
          "chip": "«En estas macetas se escribió el 123»"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Los símbolos egipcios",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "fila",
            "items": [
              {
                "t": "caja",
                "titulo": "vale 1",
                "items": [
                  {
                    "t": "egipcio",
                    "n": 1,
                    "h": 6
                  }
                ]
              },
              {
                "t": "caja",
                "titulo": "vale 10",
                "items": [
                  {
                    "t": "egipcio",
                    "n": 10,
                    "h": 6
                  }
                ]
              },
              {
                "t": "caja",
                "titulo": "vale 100",
                "items": [
                  {
                    "t": "egipcio",
                    "n": 100,
                    "h": 6
                  }
                ]
              },
              {
                "t": "caja",
                "titulo": "vale 1.000",
                "items": [
                  {
                    "t": "egipcio",
                    "n": 1000,
                    "h": 6
                  }
                ]
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "El 123",
            "items": [
              {
                "t": "egipcio",
                "n": 123,
                "h": 7,
                "orden": [
                  "c",
                  "d",
                  "u"
                ],
                "id": "e123"
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("d02_1", "Los egipcios usaban un símbolo para cada valor: el bastón vale uno, el arco vale diez, la cuerda enrollada vale cien y la flor de loto vale mil."),
          "chip": "Bastón 1 · Arco 10 · Cuerda 100 · Flor de loto 1.000"
        },
        {
          "audio": A("d02_2", "Para escribir un número, repetían cada símbolo las veces necesarias y sumaban todos los valores."),
          "chip": "➕ Se suman los valores"
        },
        {
          "audio": A("d02_3", "El ciento veintitrés se escribe con una cuerda, dos arcos y tres bastones: cien más veinte más tres."),
          "destacar": [
            "e123"
          ],
          "chip": "100 + 10 + 10 + 1 + 1 + 1 = 123"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Lo que dicen los chicos",
      "vis": {
        "t": "img",
        "src": "chicos_simbolos.jpg",
        "h": 28
      },
      "pista": A("pe_egip", "En el sistema egipcio, el bastón vale 1, el arco vale 10 y la cuerda enrollada vale 100. Se suman los valores de todos los símbolos."),
      "instr": A("d03_i", "Los chicos miran las macetas y discuten. Lautaro dice que esos símbolos no forman un número; Guada dice que son los mismos símbolos en distinto orden; Ampi dice que deben tener un valor."),
      "items": [
        {
          "preg": "Guada dice: «Son los <b>mismos símbolos</b>, pero en <b>distinto orden</b>». ¿Es verdad?",
          "audio": A("d03_a", "Guada dice que son los mismos símbolos, pero en distinto orden. ¿Es verdad?"),
          "opc": [
            "Sí: y en el sistema egipcio el orden no cambia el valor",
            "No: son símbolos distintos",
            "Sí: y cada orden es un número distinto",
            "No: no son números"
          ],
          "conf": A("d03_ac", "Sí. Las tres macetas tienen una cuerda, dos arcos y tres bastones. En el sistema egipcio el orden no importa: siempre es ciento veintitrés.")
        },
        {
          "preg": "¿En qué se diferencia de nuestra forma de escribir los números?",
          "audio": A("d03_b", "¿En qué se diferencia la forma en que se escribieron esos números en las macetas con la forma en que escribimos nosotros?"),
          "opc": [
            "En el nuestro el lugar de cada cifra cambia su valor; en el egipcio, no",
            "No hay diferencias",
            "Los egipcios usaban el cero",
            "Nosotros repetimos símbolos"
          ],
          "conf": A("d03_bc", "Nuestro sistema es posicional: en 123 y en 321, el 3 vale distinto según el lugar. En el egipcio, cada símbolo vale siempre lo mismo.")
        },
        {
          "preg": "En nuestro sistema, ¿<b>123</b> y <b>321</b> son el mismo número?",
          "audio": A("d03_c", "Para nosotros, ¿ciento veintitrés y trescientos veintiuno son el mismo número?"),
          "opc": [
            "No: el orden de las cifras cambia el valor",
            "Sí: tienen las mismas cifras",
            "Sí: suman lo mismo",
            "Depende de cómo se lea"
          ],
          "conf": A("d03_cc", "No. Tienen las mismas cifras, pero en nuestro sistema el lugar cambia el valor.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Escribimos como los egipcios",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "caja",
            "titulo": "vale 1",
            "items": [
              {
                "t": "egipcio",
                "n": 1,
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "vale 10",
            "items": [
              {
                "t": "egipcio",
                "n": 10,
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "vale 100",
            "items": [
              {
                "t": "egipcio",
                "n": 100,
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "vale 1.000",
            "items": [
              {
                "t": "egipcio",
                "n": 1000,
                "h": 6
              }
            ]
          }
        ]
      },
      "pista": A("pe_egip", "En el sistema egipcio, el bastón vale 1, el arco vale 10 y la cuerda enrollada vale 100. Se suman los valores de todos los símbolos."),
      "instr": A("d04_i", "Alberto les da pincel y pintura para que escriban números en las macetas con símbolos egipcios."),
      "items": [
        {
          "preg": "¿Qué número es este?",
          "audio": A("d04_a", "¿Qué número está escrito con estos símbolos egipcios?"),
          "vis": {
            "t": "caja",
            "titulo": "En la maceta",
            "items": [
              {
                "t": "egipcio",
                "n": 546,
                "h": 6,
                "orden": [
                  "u",
                  "c",
                  "d"
                ]
              }
            ]
          },
          "opc": [
            "546",
            "15",
            "645",
            "456"
          ],
          "conf": A("d04_ac", "Cinco cuerdas, cuatro arcos y seis bastones: quinientos cuarenta y seis. ¡Aunque estén desordenados!")
        },
        {
          "preg": "Para escribir <b>546</b>, ¿cuántos símbolos egipcios se necesitan?",
          "audio": A("d04_b", "Para escribir el quinientos cuarenta y seis con símbolos egipcios, ¿cuántos símbolos se necesitan?"),
          "opc": [
            "15",
            "3",
            "546",
            "12"
          ],
          "conf": A("d04_bc", "Cinco más cuatro más seis: quince símbolos. Nosotros usamos solo tres cifras.")
        },
        {
          "preg": "¿Cómo se escribe <b>204</b>?",
          "audio": A("d04_c", "¿Cómo se escribe el doscientos cuatro en el sistema egipcio?"),
          "opc": [
            {
              "t": "egipcio",
              "n": 204,
              "h": 5
            },
            {
              "t": "egipcio",
              "n": 24,
              "h": 5
            },
            {
              "t": "egipcio",
              "n": 240,
              "h": 5
            },
            {
              "t": "egipcio",
              "n": 2004,
              "h": 5
            }
          ],
          "conf": A("d04_cc", "Dos cuerdas y cuatro bastones. No hace falta nada para las decenas.")
        },
        {
          "preg": "¿Por qué los egipcios <b>no</b> necesitaban un símbolo para el <b>cero</b>?",
          "audio": A("d04_d", "¿Por qué los egipcios no utilizaban un símbolo para el cero?"),
          "opc": [
            "Porque el valor no depende del lugar: si no hay decenas, no se pone ningún arco",
            "Porque no conocían el número 10",
            "Porque usaban la flor de loto",
            "Porque no escribían números grandes"
          ],
          "conf": A("d04_dc", "Como el valor de cada símbolo no depende de su lugar, no necesitan marcar lugares vacíos. Nosotros sí: el cero del 204 indica que no hay decenas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Cuántos símbolos?",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "caja",
            "titulo": "vale 1",
            "items": [
              {
                "t": "egipcio",
                "n": 1,
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "vale 10",
            "items": [
              {
                "t": "egipcio",
                "n": 10,
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "vale 100",
            "items": [
              {
                "t": "egipcio",
                "n": 100,
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "vale 1.000",
            "items": [
              {
                "t": "egipcio",
                "n": 1000,
                "h": 6
              }
            ]
          }
        ]
      },
      "pista": A("pe_egip", "En el sistema egipcio, el bastón vale 1, el arco vale 10 y la cuerda enrollada vale 100. Se suman los valores de todos los símbolos."),
      "instr": A("d05_i", "Comparemos cuántos símbolos se necesitan en cada sistema."),
      "items": [
        {
          "preg": "El número más grande de tres cifras es el <b>999</b>. ¿Cuántos símbolos egipcios necesita?",
          "audio": A("d05_a", "Para escribir el mayor número natural de tres cifras, el novecientos noventa y nueve, ¿cuántos símbolos egipcios se necesitan?"),
          "opc": [
            "27",
            "3",
            "9",
            "999"
          ],
          "conf": A("d05_ac", "Nueve cuerdas, nueve arcos y nueve bastones: veintisiete símbolos.")
        },
        {
          "preg": "¿Y el <b>1.000</b>?",
          "audio": A("d05_b", "¿Y para escribir el mil?"),
          "opc": [
            "1: la flor de loto",
            "28",
            "4",
            "10"
          ],
          "conf": A("d05_bc", "Un solo símbolo: la flor de loto vale mil.")
        },
        {
          "preg": "¿Qué número tiene <b>más símbolos</b> en el sistema egipcio que en el nuestro?",
          "audio": A("d05_c", "¿Qué número tiene más símbolos en el sistema egipcio que en el nuestro?"),
          "opc": [
            "El 9: nueve bastones contra una cifra",
            "El 100",
            "El 1.000",
            "El 10"
          ],
          "conf": A("d05_cc", "Por ejemplo el nueve: los egipcios usaban nueve bastones y nosotros, una sola cifra.")
        },
        {
          "preg": "¿Y cuál tiene <b>más símbolos</b> en el nuestro que en el egipcio?",
          "audio": A("d05_d", "¿Y qué número tiene más símbolos en nuestro sistema que en el egipcio?"),
          "opc": [
            "El 100: tres cifras contra una cuerda",
            "El 99",
            "El 9",
            "El 55"
          ],
          "conf": A("d05_dc", "Por ejemplo el cien: nosotros usamos tres cifras y los egipcios, una sola cuerda.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Los números romanos",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "alberto_romanos.jpg",
            "h": 26
          },
          {
            "t": "caja",
            "titulo": "Símbolos romanos",
            "items": [
              {
                "t": "txt",
                "h": "I = 1 · V = 5 · X = 10 · L = 50<br>C = 100 · D = 500 · M = 1.000"
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("d06_1", "Alberto les cuenta que en las macetas negras escribieron números en otro sistema: el sistema romano."),
          "chip": "🏛️ El sistema romano"
        },
        {
          "audio": A("d06_2", "Los romanos usaban letras: I vale uno, V vale cinco, X vale diez, L vale cincuenta, C vale cien, D vale quinientos y M vale mil."),
          "chip": "I 1 · V 5 · X 10 · L 50 · C 100 · D 500 · M 1.000"
        },
        {
          "audio": A("d06_3", "Los valores se suman, pero si un símbolo menor está a la izquierda de uno mayor, se resta. Por ejemplo, IV es cuatro, y VI es seis."),
          "chip": "IV = 5 − 1 = 4 · VI = 5 + 1 = 6"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las macetas negras",
      "vis": {
        "t": "img",
        "src": "alberto_romanos.jpg",
        "h": 28
      },
      "pista": A("pe_rom", "En el sistema romano, I vale 1, V vale 5, X vale 10, L vale 50, C vale 100, D vale 500 y M vale 1000. Si un símbolo menor está a la izquierda de uno mayor, se resta."),
      "instr": A("d07_i", "Las macetas negras de Alberto tienen escritos tres números romanos: XIII, XXII y CDXX."),
      "items": [
        {
          "preg": "¿Qué número es <b>XIII</b>?",
          "audio": A("d07_a", "¿Qué número es equis, i, i, i?"),
          "opc": [
            "13",
            "103",
            "8",
            "31"
          ],
          "conf": A("d07_ac", "Diez más tres: trece.")
        },
        {
          "preg": "¿Qué número es <b>XXII</b>?",
          "audio": A("d07_b", "¿Qué número es equis, equis, i, i?"),
          "opc": [
            "22",
            "2.002",
            "24",
            "12"
          ],
          "conf": A("d07_bc", "Diez más diez más dos: veintidós.")
        },
        {
          "preg": "¿Qué número es <b>CDXX</b>?",
          "audio": A("d07_c", "¿Qué número es ce, de, equis, equis?"),
          "opc": [
            "420",
            "620",
            "520",
            "1.020"
          ],
          "conf": A("d07_cc", "CD es quinientos menos cien, cuatrocientos; más veinte: cuatrocientos veinte.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Lautaro o Guada?",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "lautaro_romano.jpg",
            "h": 18
          },
          {
            "t": "img",
            "src": "guada_romano.jpg",
            "h": 18
          }
        ]
      },
      "pista": A("pe_rom", "En el sistema romano, I vale 1, V vale 5, X vale 10, L vale 50, C vale 100, D vale 500 y M vale 1000. Si un símbolo menor está a la izquierda de uno mayor, se resta."),
      "instr": A("d08_i", "Alberto les pregunta cómo se escribe el ciento veintitrés en números romanos. Lautaro escribió CXXIII y Guada escribió IIIXXC."),
      "items": [
        {
          "preg": "¿Quién escribió bien el <b>123</b>?",
          "audio": A("d08_a", "¿Quién escribió bien el ciento veintitrés?"),
          "opc": [
            "Lautaro: CXXIII",
            "Guada: IIIXXC",
            "Los dos",
            "Ninguno"
          ],
          "conf": A("d08_ac", "Lautaro: cien, más veinte, más tres. En el sistema romano el orden sí importa: los símbolos van de mayor a menor.")
        },
        {
          "preg": "Lautaro dice que <b>CV</b> es menor que <b>XXII</b> porque tiene menos símbolos. ¿Estás de acuerdo?",
          "audio": A("d08_b", "Lautaro dice que el número ce, ve, es menor que el número equis, equis, i, i, porque tiene menos símbolos. ¿Estás de acuerdo?"),
          "opc": [
            "No: CV es 105 y XXII es 22",
            "Sí: tiene menos símbolos",
            "Sí: CV es 15",
            "Son iguales"
          ],
          "conf": A("d08_bc", "No. CV es ciento cinco y XXII es veintidós. La cantidad de símbolos no decide qué número es mayor.")
        },
        {
          "preg": "El sistema romano, ¿permite escribir números que en el nuestro llevan <b>ceros</b>, como el 204?",
          "audio": A("d08_c", "El sistema de numeración romano, ¿permite escribir un número que en nuestro sistema lleva ceros, como el doscientos cuatro?"),
          "opc": [
            "Sí: 204 es CCIV, sin ningún cero",
            "No: no tiene cero",
            "Solo con la letra O",
            "No: solo hasta el 100"
          ],
          "conf": A("d08_cc", "Sí. Doscientos cuatro es CCIV: no necesita un símbolo para el cero.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos",
      "vis": {
        "t": "img",
        "src": "chicos_cero.jpg",
        "h": 26
      },
      "pista": A("pe_rom", "En el sistema romano, I vale 1, V vale 5, X vale 10, L vale 50, C vale 100, D vale 500 y M vale 1000. Si un símbolo menor está a la izquierda de uno mayor, se resta."),
      "instr": A("d09_i", "Más desafíos con números romanos."),
      "items": [
        {
          "preg": "¿Qué número romano es correcto para el <b>9</b>?",
          "audio": A("d09_a", "¿Qué número romano es correcto para el nueve?"),
          "opc": [
            "IX",
            "VIIII",
            "XI"
          ],
          "conf": A("d09_ac", "IX: diez menos uno. XI es once, y VIIII no se usa porque no se repite un símbolo cuatro veces.")
        },
        {
          "preg": "¿Qué número romano es correcto para el <b>15</b>?",
          "audio": A("d09_b", "¿Qué número romano es correcto para el quince?"),
          "opc": [
            "XV",
            "VX",
            "XIIIII"
          ],
          "conf": A("d09_bc", "XV: diez más cinco.")
        },
        {
          "preg": "La secuencia sigue: <b>XI, CX, MC…</b> ¿Qué valores tienen?",
          "audio": A("d09_c", "La secuencia equis i, ce equis, eme ce. ¿Qué números son?"),
          "opc": [
            "11, 110 y 1.100",
            "11, 90 y 900",
            "9, 90 y 900",
            "11, 101 y 1.001"
          ],
          "conf": A("d09_cc", "Once, ciento diez y mil cien: cada número es diez veces el anterior.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de las macetas",
      "n": 10,
      "img": "macetas_egipcias.jpg",
      "instr": A("d10_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "EGIPCIO",
          "audio": A("d10_1", "Egipcio: un sistema que suma símbolos.")
        },
        {
          "w": "ROMANO",
          "audio": A("d10_2", "Romano: un sistema que usa letras.")
        },
        {
          "w": "SIMBOLO",
          "audio": A("d10_3", "Símbolo: un signo que tiene un valor.")
        },
        {
          "w": "CERO",
          "audio": A("d10_4", "Cero: marca un lugar vacío en nuestro sistema.")
        },
        {
          "w": "CIFRA",
          "audio": A("d10_5", "Cifra: cada uno de los diez signos que usamos.")
        },
        {
          "w": "VALOR",
          "audio": A("d10_6", "Valor: cuánto vale cada símbolo.")
        },
        {
          "w": "MACETA",
          "audio": A("d10_7", "Maceta: donde Alberto escribió los números.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre_vivero_diseno_macetas", "¡Excelente! Terminaste El diseño de macetas. Ya sabés escribir números como los egipcios y los romanos, y por qué nuestro sistema es posicional. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
