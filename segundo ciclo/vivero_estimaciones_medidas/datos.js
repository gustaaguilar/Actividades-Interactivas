/* datos.js — "El vivero" · Entre estimaciones y medidas · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 29 a 32.
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
    "corto": "El vivero · Entre estimaciones y medidas",
    "parte": "Entre estimaciones y medidas",
    "subtitulo": "Medidas de capacidad en el riego del vivero: litros, decilitros, centilitros y mililitros, fracciones decimales y multiplicación por 10 y por 100",
    "imgPortada": "tres_chicos.jpg",
    "imgCierre": "jeringa.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en «Entre estimaciones y medidas» (págs.29 a 32) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "El riego en el vivero",
      "vis": {
        "t": "img",
        "src": "tres_chicos.jpg",
        "h": 36
      },
      "pasos": [
        {
          "audio": A("e01_1", "Las plantas, como todos los seres vivos, necesitan agua. En el vivero, el riego diario está muy bien controlado."),
          "chip": "💧 El agua, indispensable para las plantas"
        },
        {
          "audio": A("e01_2", "Los plantines son muy delicados: si reciben demasiada agua, sus raíces se pudren; si reciben muy poca, no crecen bien."),
          "chip": "🌱 Ni mucha ni poca agua"
        },
        {
          "audio": A("e01_3", "Por eso no riegan a ojo: usan una jarra medidora para darle a cada planta la cantidad justa."),
          "chip": "🫗 Una jarra medidora para la cantidad justa"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La jarra medidora",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "jarra.jpg",
            "h": 32
          },
          {
            "t": "img",
            "src": "luisina.jpg",
            "h": 20
          }
        ]
      },
      "pista": A("pe_litro", "Recordá: un litro tiene 10 decilitros, 100 centilitros y 1000 mililitros."),
      "instr": A("e02_i", "Mirá la jarra medidora: el litro está dividido en 10 partes iguales. Luisina explica qué es un decilitro."),
      "items": [
        {
          "preg": "Si el litro se divide en <b>10 partes iguales</b>, ¿qué parte del litro es cada una?",
          "audio": A("e02_a", "Si el litro se divide en diez partes iguales, ¿qué parte del litro es cada una?"),
          "opc": [
            "1/10 de litro",
            "1/100 de litro",
            "10 litros",
            "1/2 litro"
          ],
          "conf": A("e02_ac", "Cada parte es un décimo de litro: eso es un decilitro.")
        },
        {
          "preg": "¿Cuántas partes de <b>1/10</b> de litro se necesitan para completar <b>1 litro</b>?",
          "audio": A("e02_b", "¿Cuántas partes de un décimo de litro se necesitan para completar un litro?"),
          "opc": [
            "10",
            "100",
            "1",
            "5"
          ],
          "conf": A("e02_bc", "Diez décimos forman un litro. Por eso en la jarra dice que un litro es igual a diez decilitros.")
        },
        {
          "preg": "¿Cómo se escribe <b>1/10</b> de litro como número decimal?",
          "audio": A("e02_c", "¿Cómo se escribe un décimo de litro como número decimal?"),
          "opc": [
            "0,1 l",
            "0,01 l",
            "1,10 l",
            "10 l"
          ],
          "conf": A("e02_cc", "Un décimo se escribe cero coma uno.")
        },
        {
          "preg": "Si llenamos la jarra <b>a la mitad</b>, ¿cuántos litros son? ¿Hasta qué marca llega?",
          "audio": A("e02_d", "Si llenamos la jarra a la mitad, ¿cuántos litros serían? ¿Hasta qué marca llegaría el agua?"),
          "opc": [
            "0,5 l: la marca de 5 dl",
            "0,05 l: la marca de 5 dl",
            "5 l: la marca de 1 l",
            "0,2 l: la marca de 2 dl"
          ],
          "conf": A("e02_dc", "La mitad de un litro es cero coma cinco litros: el agua llega a la marca de cinco decilitros.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Decilitros y centilitros",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "luisina.jpg",
            "h": 20
          },
          {
            "t": "img",
            "src": "joaquin_cl.jpg",
            "h": 20
          }
        ]
      },
      "pista": A("pe_litro", "Recordá: un litro tiene 10 decilitros, 100 centilitros y 1000 mililitros."),
      "instr": A("e03_i", "Ahora cada decilitro se divide en 10 partes iguales. Joaquín saca una conclusión."),
      "items": [
        {
          "preg": "Si cada decilitro se divide en <b>10 partes</b>, ¿en cuántas partes queda dividido el litro?",
          "audio": A("e03_a", "Si a cada decilitro lo divido en diez partes iguales, ¿en cuántas partes queda dividida la jarra de un litro?"),
          "opc": [
            "100",
            "20",
            "10",
            "1.000"
          ],
          "conf": A("e03_ac", "Diez decilitros por diez partes cada uno: cien partes.")
        },
        {
          "preg": "Entonces, ¿cada parte es <b>1/100</b> del litro?",
          "audio": A("e03_b", "Entonces, ¿es correcto decir que cada parte es un centésimo del litro?"),
          "opc": [
            "Sí: son 100 partes iguales del litro; es un centilitro",
            "No: es 1/10",
            "No: es 1/1000",
            "No: es 1/20"
          ],
          "conf": A("e03_bc", "Sí. Es la centésima parte del litro: un centilitro.")
        },
        {
          "preg": "Joaquín dice: «Hay <b>100 centilitros</b> en un litro». ¿Es correcto?",
          "audio": A("e03_c", "Joaquín dice que hay cien centilitros en un litro. ¿Te parece correcta su conclusión?"),
          "opc": [
            "Sí",
            "No: hay 10",
            "No: hay 1.000",
            "No: hay 50"
          ],
          "conf": A("e03_cc", "Sí, cien centilitros forman un litro.")
        },
        {
          "preg": "¿Cuántos <b>centilitros</b> hay en un <b>decilitro</b>?",
          "audio": A("e03_d", "¿Cuántos centilitros hay en un decilitro?"),
          "opc": [
            "10",
            "100",
            "1",
            "1.000"
          ],
          "conf": A("e03_dc", "Diez centilitros forman un decilitro.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Regar con jeringa",
      "vis": {
        "t": "img",
        "src": "jeringa.jpg",
        "h": 30
      },
      "pista": A("pe_litro", "Recordá: un litro tiene 10 decilitros, 100 centilitros y 1000 mililitros."),
      "instr": A("e04_i", "Regar con jeringa es ideal para macetas pequeñas y plántulas. La jeringa de la imagen tiene marcas de 5, 10, 15 y 20 mililitros."),
      "items": [
        {
          "preg": "Joaquín dice: «Con la jarra de <b>1 litro</b> se pueden llenar <b>50 jeringas</b> de <b>20 ml</b>». ¿Estás de acuerdo?",
          "audio": A("e04_a", "Joaquín dice que con la jarra de un litro se pueden llenar cincuenta jeringas de veinte mililitros. ¿Estás de acuerdo?"),
          "opc": [
            "Sí: 50 × 20 ml = 1.000 ml = 1 litro",
            "No: se llenan 20",
            "No: se llenan 100",
            "No: se llenan 5"
          ],
          "conf": A("e04_ac", "Sí. Cincuenta veces veinte mililitros son mil mililitros, que es un litro.")
        },
        {
          "preg": "¿A qué parte del litro equivale <b>un mililitro</b>?",
          "audio": A("e04_b", "¿A cuántas partes del litro equivale un mililitro?"),
          "opc": [
            "1/1000 del litro",
            "1/100 del litro",
            "1/10 del litro",
            "1/20 del litro"
          ],
          "conf": A("e04_bc", "Un mililitro es la milésima parte del litro: hay mil mililitros en un litro.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El cartel de equivalencias",
      "vis": {
        "t": "tabla",
        "id": "tc",
        "cab": [
          "litro",
          "dl",
          "cl",
          "ml"
        ],
        "filas": [
          [
            "1",
            "10",
            "100",
            "?"
          ],
          [
            "?",
            "1",
            "10",
            "100"
          ],
          [
            "1/100",
            "?",
            "1",
            "10"
          ],
          [
            "1/1000",
            "1/100",
            "?",
            "1"
          ]
        ]
      },
      "deco": "cartel.jpg",
      "pista": A("pe_litro", "Recordá: un litro tiene 10 decilitros, 100 centilitros y 1000 mililitros."),
      "instr": A("e05_i", "En el vivero hay un cartel con equivalencias entre unidades de capacidad, pero está tan viejo que se borraron algunos datos. Completalo."),
      "items": [
        {
          "preg": "1 litro = 10 dl = 100 cl = <b>?</b> ml",
          "audio": A("e05_a", "Un litro es igual a diez decilitros, igual a cien centilitros, igual a ¿cuántos mililitros?"),
          "destacar": [
            "tc_0_3"
          ],
          "opc": [
            "1.000",
            "100",
            "10",
            "10.000"
          ],
          "escribir": [
            {
              "id": "tc_0_3",
              "h": "1.000"
            }
          ],
          "conf": A("e05_ac", "Un litro son mil mililitros.")
        },
        {
          "preg": "1 decilitro es <b>?</b> de litro",
          "audio": A("e05_b", "Un decilitro, ¿qué parte del litro es?"),
          "destacar": [
            "tc_1_0"
          ],
          "opc": [
            "1/10",
            "1/100",
            "10",
            "1/1000"
          ],
          "escribir": [
            {
              "id": "tc_1_0",
              "h": "1/10"
            }
          ],
          "conf": A("e05_bc", "Un decilitro es un décimo de litro.")
        },
        {
          "preg": "1 centilitro es <b>?</b> de decilitro",
          "audio": A("e05_c", "Un centilitro, ¿qué parte del decilitro es?"),
          "destacar": [
            "tc_2_1"
          ],
          "opc": [
            "1/10",
            "1/100",
            "10",
            "1/1000"
          ],
          "escribir": [
            {
              "id": "tc_2_1",
              "h": "1/10"
            }
          ],
          "conf": A("e05_cc", "Diez centilitros forman un decilitro: un centilitro es un décimo de decilitro.")
        },
        {
          "preg": "1 mililitro es <b>?</b> de centilitro",
          "audio": A("e05_d", "Un mililitro, ¿qué parte del centilitro es?"),
          "destacar": [
            "tc_3_2"
          ],
          "opc": [
            "1/10",
            "1/100",
            "10",
            "1/1000"
          ],
          "escribir": [
            {
              "id": "tc_3_2",
              "h": "1/10"
            }
          ],
          "conf": A("e05_dc", "Diez mililitros forman un centilitro: un mililitro es un décimo de centilitro.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Fracciones y decimales",
      "vis": {
        "t": "caja",
        "titulo": "Del cartel del vivero",
        "items": [
          {
            "t": "txt",
            "h": "1 dl = 1 l : 10 = 0,1 l<br>1 cl = 1 l : 100 = 0,01 l<br>1 ml = 1 l : 1.000 = 0,001 l"
          }
        ]
      },
      "deco": "cartel.jpg",
      "pista": A("pe_litro", "Recordá: un litro tiene 10 decilitros, 100 centilitros y 1000 mililitros."),
      "instr": A("e06_i", "Joaquín dice que las fracciones también se pueden escribir con números decimales. Mirá las equivalencias."),
      "items": [
        {
          "preg": "1 cl = 0,01 l = <b>?</b> de litro",
          "audio": A("e06_a", "Un centilitro es cero coma cero uno litros. ¿Qué fracción de litro es?"),
          "opc": [
            "1/100",
            "1/10",
            "1/1000",
            "1/1"
          ],
          "conf": A("e06_ac", "Cero coma cero uno es un centésimo.")
        },
        {
          "preg": "1 ml = 0,001 l = <b>?</b> de litro",
          "audio": A("e06_b", "Un mililitro es cero coma cero cero uno litros. ¿Qué fracción de litro es?"),
          "opc": [
            "1/1000",
            "1/100",
            "1/10",
            "1/10.000"
          ],
          "conf": A("e06_bc", "Cero coma cero cero uno es un milésimo.")
        },
        {
          "preg": "Alberto pide <b>3 botellas de 1 litro</b> de fertilizante. ¿Cuántos mililitros tiene en total?",
          "audio": A("e06_c", "Alberto pide tres botellas de un litro de fertilizante cada una. ¿Cuántos mililitros tendrá en las tres botellas?"),
          "opc": [
            "3.000 ml",
            "300 ml",
            "30 ml",
            "3 ml"
          ],
          "conf": A("e06_cc", "Cada litro son mil mililitros: tres litros son tres mil mililitros.")
        },
        {
          "preg": "Si prepara una dosis de <b>6 mililitros</b>, ¿a cuántos litros equivale?",
          "audio": A("e06_d", "Si prepara una dosis de seis mililitros, ¿a cuántos litros equivale?"),
          "opc": [
            "0,006 l",
            "0,06 l",
            "0,6 l",
            "6 l"
          ],
          "conf": A("e06_dc", "Seis milésimos de litro: cero coma cero cero seis litros.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Sofía y Martina",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "txt",
            "h": "<b>10 macetas</b> · <b>0,25 l</b> de agua para cada una"
          },
          {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "sofia_suma.jpg",
                "h": 13
              },
              {
                "t": "img",
                "src": "martina_fr.jpg",
                "h": 22
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("e07_1", "Alberto pregunta cuántos litros de agua se necesitan para regar 10 macetas, si cada una necesita cero coma veinticinco litros."),
          "chip": "10 macetas × 0,25 l"
        },
        {
          "audio": A("e07_2", "Sofía sumó diez veces cero coma veinticinco: cuatro veces dan un litro, otras cuatro dan otro litro, y las dos que quedan, medio litro. Dos litros y medio."),
          "chip": "👧 Sofía: suma 10 veces 0,25 = 2,5 l"
        },
        {
          "audio": A("e07_3", "Martina pensó con fracciones: cero coma veinticinco es veinticinco centésimos; diez veces son doscientos cincuenta centésimos, que son dos enteros y cincuenta centésimos."),
          "chip": "👧 Martina: 250/100 = 2 + 0,5 = 2,5 l"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Multiplicar por 10 y por 100",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "sofia_suma.jpg",
            "h": 10
          },
          {
            "t": "img",
            "src": "martina_fr.jpg",
            "h": 18
          }
        ]
      },
      "pista": A("pe_x10", "Al multiplicar por 10, cada cifra pasa a valer diez veces más: la coma se corre un lugar a la derecha. Por 100, dos lugares."),
      "instr": A("e08_i", "Pensemos en las estrategias de Sofía y Martina."),
      "items": [
        {
          "preg": "¿Son correctas las estrategias de las dos chicas?",
          "audio": A("e08_a", "¿Son correctas las estrategias de Sofía y de Martina?"),
          "opc": [
            "Sí: las dos llegan a 2,5 litros",
            "Solo la de Sofía",
            "Solo la de Martina",
            "Ninguna"
          ],
          "conf": A("e08_ac", "Sí. Las dos estrategias son correctas y llegan al mismo resultado: dos litros y medio.")
        },
        {
          "preg": "¿Cuánto es <b>0,3 × 10</b>? ¿Y <b>1,5 × 10</b>?",
          "audio": A("e08_b", "¿Cuánto es cero coma tres por diez? ¿Y uno coma cinco por diez?"),
          "opc": [
            "3 y 15",
            "0,30 y 1,50",
            "30 y 150",
            "3 y 1,5"
          ],
          "conf": A("e08_bc", "Cero coma tres por diez es tres, y uno coma cinco por diez es quince.")
        },
        {
          "preg": "¿Cuánto es <b>0,45 × 10</b>?",
          "audio": A("e08_c", "¿Cuánto es cero coma cuarenta y cinco por diez?"),
          "opc": [
            "4,5",
            "45",
            "0,045",
            "4,05"
          ],
          "conf": A("e08_cc", "Cuarenta y cinco centésimos por diez son cuarenta y cinco décimos: cuatro coma cinco.")
        },
        {
          "preg": "¿Cuántos <b>enteros</b> se forman si <b>0,85</b> se multiplica por 10?",
          "audio": A("e08_d", "¿Cuántos enteros se pueden formar si al número cero coma ochenta y cinco lo multiplico por diez?"),
          "opc": [
            "8 enteros (da 8,5)",
            "85 enteros",
            "0 enteros",
            "9 enteros"
          ],
          "conf": A("e08_dc", "Da ocho coma cinco: se forman ocho enteros y sobra medio.")
        },
        {
          "preg": "¿Cuántos <b>enteros</b> se forman si <b>0,05</b> se multiplica por 100?",
          "audio": A("e08_e", "¿Cuántos enteros se pueden formar si al número cero coma cero cinco lo multiplico por cien?"),
          "opc": [
            "5",
            "50",
            "0,5",
            "500"
          ],
          "conf": A("e08_ec", "Cinco centésimos por cien son cinco enteros.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El control del riego",
      "vis": {
        "t": "tabla",
        "id": "ta",
        "cab": [
          "Plantines",
          "litros",
          "dl",
          "cl",
          "ml"
        ],
        "filas": [
          [
            "1",
            "0,25",
            "?",
            "?",
            "?"
          ],
          [
            "100",
            "?",
            "250",
            "2.500",
            "25.000"
          ]
        ]
      },
      "deco": "jarra.jpg",
      "pista": A("pe_litro", "Recordá: un litro tiene 10 decilitros, 100 centilitros y 1000 mililitros."),
      "instr": A("e09_i", "Los encargados registran en una tabla el agua que necesitan los plantines. Completá los datos que faltan."),
      "items": [
        {
          "preg": "1 plantín necesita 0,25 l. ¿Cuántos <b>decilitros</b> son?",
          "audio": A("e09_a", "Un plantín necesita cero coma veinticinco litros. ¿Cuántos decilitros son?"),
          "destacar": [
            "ta_0_2"
          ],
          "opc": [
            "2,5 dl",
            "25 dl",
            "0,25 dl",
            "250 dl"
          ],
          "escribir": [
            {
              "id": "ta_0_2",
              "h": "2,5"
            }
          ],
          "conf": A("e09_ac", "Dos coma cinco decilitros.")
        },
        {
          "preg": "¿Y cuántos <b>centilitros</b>?",
          "audio": A("e09_b", "¿Y cuántos centilitros?"),
          "destacar": [
            "ta_0_3"
          ],
          "opc": [
            "25 cl",
            "2,5 cl",
            "250 cl",
            "0,25 cl"
          ],
          "escribir": [
            {
              "id": "ta_0_3",
              "h": "25"
            }
          ],
          "conf": A("e09_bc", "Veinticinco centilitros.")
        },
        {
          "preg": "¿Y cuántos <b>mililitros</b>?",
          "audio": A("e09_c", "¿Y cuántos mililitros?"),
          "destacar": [
            "ta_0_4"
          ],
          "opc": [
            "250 ml",
            "25 ml",
            "2.500 ml",
            "2,5 ml"
          ],
          "escribir": [
            {
              "id": "ta_0_4",
              "h": "250"
            }
          ],
          "conf": A("e09_cc", "Doscientos cincuenta mililitros.")
        },
        {
          "preg": "¿Cuántos <b>litros</b> necesitan <b>100 plantines</b>?",
          "audio": A("e09_d", "¿Cuántos litros necesitan cien plantines?"),
          "destacar": [
            "ta_1_1"
          ],
          "opc": [
            "25 l",
            "2,5 l",
            "250 l",
            "0,25 l"
          ],
          "escribir": [
            {
              "id": "ta_1_1",
              "h": "25"
            }
          ],
          "conf": A("e09_dc", "Cero coma veinticinco por cien: veinticinco litros.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos",
      "vis": {
        "t": "img",
        "src": "tres_chicos.jpg",
        "h": 26
      },
      "pista": A("pe_x10", "Al multiplicar por 10, cada cifra pasa a valer diez veces más: la coma se corre un lugar a la derecha. Por 100, dos lugares."),
      "instr": A("e10_i", "Mateo, Sofía y Martina hablan del agua para regar. Después, más cálculos."),
      "items": [
        {
          "preg": "Uno dice «<b>0,25 l</b>», otro «<b>250/1000 l</b>» y otro «<b>250 ml</b>». ¿Hablan de la misma cantidad?",
          "audio": A("e10_a", "Uno dice que cada maceta necesita cero coma veinticinco litros, otro dice doscientos cincuenta milésimos de litro, y otro, doscientos cincuenta mililitros. ¿Se refieren a la misma cantidad?"),
          "opc": [
            "Sí: son tres formas de escribir lo mismo",
            "No: 250 ml es más",
            "No: 0,25 l es más",
            "No: son tres cantidades distintas"
          ],
          "conf": A("e10_ac", "Sí. Cero coma veinticinco litros, doscientos cincuenta milésimos de litro y doscientos cincuenta mililitros son la misma cantidad.")
        },
        {
          "preg": "La jarra marca <b>0,75 l</b> y necesito <b>10 veces</b> esa cantidad. ¿Cuántos litros son?",
          "audio": A("e10_b", "La jarra medidora marca cero coma setenta y cinco litros y necesito diez veces esa cantidad. ¿Cuántos litros son en total?"),
          "opc": [
            "7,5 l",
            "75 l",
            "0,075 l",
            "7,05 l"
          ],
          "conf": A("e10_bc", "Siete coma cinco litros.")
        },
        {
          "preg": "¿Cuánto es <b>0,25 × 20</b>?",
          "audio": A("e10_c", "¿Cuánto es cero coma veinticinco por veinte?"),
          "opc": [
            "5",
            "50",
            "0,5",
            "2,5"
          ],
          "conf": A("e10_cc", "Por diez da dos coma cinco, y el doble es cinco.")
        },
        {
          "preg": "Si <b>0,3 × 10 = 3</b>, ¿es verdad que <b>0,03 × 100</b> también es 3?",
          "audio": A("e10_d", "Si cero coma tres por diez es tres, ¿es verdad que cero coma cero tres por cien también es tres?"),
          "opc": [
            "Sí: 3 centésimos × 100 = 3",
            "No: da 30",
            "No: da 0,3",
            "No: da 300"
          ],
          "conf": A("e10_dc", "Sí. Tres centésimos por cien son tres enteros.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del riego",
      "n": 10,
      "img": "jarra.jpg",
      "instr": A("e11_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "LITRO",
          "audio": A("e11_1", "Litro: la unidad de capacidad.")
        },
        {
          "w": "DECILITRO",
          "audio": A("e11_2", "Decilitro: la décima parte del litro.")
        },
        {
          "w": "MILILITRO",
          "audio": A("e11_3", "Mililitro: la milésima parte del litro.")
        },
        {
          "w": "JARRA",
          "audio": A("e11_4", "Jarra medidora: para regar con la cantidad justa.")
        },
        {
          "w": "JERINGA",
          "audio": A("e11_5", "Jeringa: para regar macetas pequeñas.")
        },
        {
          "w": "RIEGO",
          "audio": A("e11_6", "Riego: dar agua a las plantas.")
        },
        {
          "w": "DECIMO",
          "audio": A("e11_7", "Décimo: una de diez partes iguales.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre_vivero_estimaciones_medidas", "¡Muy bien! Terminaste Entre estimaciones y medidas. Ya sabés regar como en el vivero: con la cantidad justa. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
