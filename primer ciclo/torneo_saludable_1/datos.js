/* datos.js — "Torneo Saludable" · Parte 1 · Inscripciones y el número misterioso · 3er grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 3 (DGE Mendoza), págs. 55 a 61.
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
    "corto": "Torneo Saludable 1",
    "parte": "Parte 1 · Inscripciones y el número misterioso",
    "subtitulo": "Armamos cantidades con miles, cienes, dieces y unos; tablas de frecuencia, gráficos de barras y el juego del número misterioso",
    "imgPortada": "portada.jpg",
    "imgCierre": "misterioso_7623.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Torneo Saludable» (págs. 55 a 61) del cuadernillo «Aventureros de la Matemática 3», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Torneo Saludable",
      "vis": {
        "t": "img",
        "src": "portada.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("t01_1", "¡Bienvenidos al Torneo Saludable! Los chicos de tercero van a participar de un torneo deportivo en el Estadio Aconcagua Arena, para promover la vida sana."),
          "chip": "🏆 Torneo en el Estadio Aconcagua Arena"
        },
        {
          "audio": A("t01_2", "Van a jugar en equipo, respetar las reglas y aprender hábitos saludables: moverse, tomar agua y comer rico y sano. ¡Y también mucha matemática!"),
          "chip": "⚽ Deporte, agua y merienda saludable"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Inscripciones al torneo",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "deportes.jpg",
            "h": 20
          },
          {
            "t": "caja",
            "titulo": "Las anotaciones de la seño",
            "items": [
              {
                "t": "txt",
                "h": "<div class=\"lista\">Sur: 1.000 + 3 × 100 + 4 × 10<br>Valle de Uco: 6 × 100 + 4 × 10 + 3 + 2<br>Centro: 100 + 2 × 1.000 + 2 + 3 × 10<br>Norte: 5 × 10 + 4 × 100 + 2 + 1.000<br>Este: 2 + 2 + 10 + 10 + 10 + 100 × 8 + 1.000</div>"
              }
            ],
            "cls": "datos"
          },
          {
            "t": "tabla",
            "id": "tn",
            "cab": [
              "Región",
              "Sur"
            ],
            "filas": [
              [
                "Participantes",
                "<span id=\"tn_v\" class=\"oc\">1.340</span>"
              ]
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("t02_1", "Participan escuelas de toda la provincia. La seño anotó cuántos estudiantes hay en cada región, pero las cantidades están desarmadas."),
          "chip": "📋 Las cantidades están desarmadas"
        },
        {
          "audio": A("t02_2", "Por ejemplo, en el Sur: 1000, más 3 veces 100, más 4 veces 10. Es decir, 1 mil, 3 cienes y 4 dieces."),
          "chip": "Sur: 1 mil, 3 cienes y 4 dieces"
        },
        {
          "audio": A("t02_3", "Juntamos todo y queda 1340 participantes. ¡Ahora te toca a vos armar las demás regiones!"),
          "mostrar": [
            "tn_v"
          ],
          "destacar": [
            "tn_v"
          ],
          "apuntar": "tn_v",
          "chip": "Sur: 1.340 participantes"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Armamos las cantidades",
      "deco": "deportes.jpg",
      "pista": A("t03_p", "Agrupá los miles, los cienes, los dieces y los unos, y armá el número."),
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "caja",
            "titulo": "Las anotaciones de la seño",
            "items": [
              {
                "t": "txt",
                "h": "<div class=\"lista\">Sur: 1.000 + 3 × 100 + 4 × 10<br>Valle de Uco: 6 × 100 + 4 × 10 + 3 + 2<br>Centro: 100 + 2 × 1.000 + 2 + 3 × 10<br>Norte: 5 × 10 + 4 × 100 + 2 + 1.000<br>Este: 2 + 2 + 10 + 10 + 10 + 100 × 8 + 1.000</div>"
              }
            ],
            "cls": "datos"
          },
          {
            "t": "tabla",
            "id": "tr",
            "cab": [
              "Región",
              "Sur",
              "Valle de Uco",
              "Centro",
              "Norte",
              "Este"
            ],
            "filas": [
              [
                "Participantes",
                "?",
                "?",
                "?",
                "?",
                "?"
              ]
            ]
          }
        ]
      },
      "instr": A("t03_i", "Ayudá a Manuel a armar la cantidad de participantes de cada región."),
      "items": [
        {
          "preg": "<b>Sur:</b> 1.000 + 3 × 100 + 4 × 10",
          "audio": A("t03_a", "¿Cuántos participantes hay en el Sur?"),
          "destacar": [
            "tr_0_1"
          ],
          "opc": [
            "1.340",
            "1.034",
            "1.430",
            "8"
          ],
          "escribir": [
            {
              "id": "tr_0_1",
              "h": "1.340"
            }
          ],
          "conf": A("t03_ac", "1 mil, 3 cienes y 4 dieces: 1340.")
        },
        {
          "preg": "<b>Valle de Uco:</b> 6 × 100 + 4 × 10 + 3 + 2",
          "audio": A("t03_b", "¿Cuántos participantes hay en el Valle de Uco?"),
          "destacar": [
            "tr_0_2"
          ],
          "opc": [
            "645",
            "6.405",
            "643",
            "15"
          ],
          "escribir": [
            {
              "id": "tr_0_2",
              "h": "645"
            }
          ],
          "conf": A("t03_bc", "6 cienes, 4 dieces y 5 unos: 645.")
        },
        {
          "preg": "<b>Centro:</b> 100 + 2 × 1.000 + 2 + 3 × 10",
          "audio": A("t03_c", "¿Cuántos participantes hay en el Centro?"),
          "destacar": [
            "tr_0_3"
          ],
          "opc": [
            "2.132",
            "1.232",
            "2.123",
            "3.132"
          ],
          "escribir": [
            {
              "id": "tr_0_3",
              "h": "2.132"
            }
          ],
          "conf": A("t03_cc", "2 miles, 1 cien, 3 dieces y 2 unos: 2132.")
        },
        {
          "preg": "<b>Norte:</b> 5 × 10 + 4 × 100 + 2 + 1.000",
          "audio": A("t03_d", "¿Cuántos participantes hay en el Norte?"),
          "destacar": [
            "tr_0_4"
          ],
          "opc": [
            "1.452",
            "5.421",
            "1.542",
            "1.425"
          ],
          "escribir": [
            {
              "id": "tr_0_4",
              "h": "1.452"
            }
          ],
          "conf": A("t03_dc", "1 mil, 4 cienes, 5 dieces y 2 unos: 1452.")
        },
        {
          "preg": "<b>Este:</b> 2 + 2 + 10 + 10 + 10 + 100 × 8 + 1.000",
          "audio": A("t03_e", "¿Cuántos participantes hay en el Este?"),
          "destacar": [
            "tr_0_5"
          ],
          "opc": [
            "1.834",
            "1.824",
            "1.843",
            "9.834"
          ],
          "escribir": [
            {
              "id": "tr_0_5",
              "h": "1.834"
            }
          ],
          "conf": A("t03_ec", "1 mil, 8 cienes, 3 dieces y 4 unos: 1834.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La tabla de frecuencia",
      "vis": {
        "t": "tabla",
        "id": "tl",
        "cab": [
          "Región",
          "Sur",
          "Valle de Uco",
          "Centro",
          "Norte",
          "Este"
        ],
        "filas": [
          [
            "Participantes",
            "1.340",
            "645",
            "2.132",
            "1.452",
            "1.834"
          ]
        ]
      },
      "deco": "portada.jpg",
      "pista": A("pi_tabla", "Mirá bien la tabla: buscá el dato en su fila y en su columna."),
      "instr": A("t04_i", "Manuel ordenó los datos en una tabla. Usala para responder."),
      "items": [
        {
          "preg": "Manuel dice que es una <b>tabla de frecuencia</b>. ¿Por qué se llama así?",
          "audio": A("t04_a", "Manuel dice que es una tabla de frecuencia. ¿Por qué se llama así?"),
          "opc": [
            "Porque muestra cuántos hay de cada dato",
            "Porque se hace muy seguido",
            "Porque tiene números grandes",
            "Porque es de deportes"
          ],
          "conf": A("t04_ac", "La tabla de frecuencia muestra cuántas veces aparece cada dato: acá, cuántos participantes hay en cada región.")
        },
        {
          "preg": "¿De qué región participarán <b>más</b> estudiantes? ¿Y <b>menos</b>?",
          "audio": A("t04_b", "¿De qué región participarán más estudiantes? ¿Y de cuál menos?"),
          "opc": [
            "Más: Centro · Menos: Valle de Uco",
            "Más: Este · Menos: Sur",
            "Más: Norte · Menos: Valle de Uco",
            "Más: Centro · Menos: Sur"
          ],
          "conf": A("t04_bc", "El Centro tiene 2132, el número más grande. El Valle de Uco tiene 645, el más chico.")
        },
        {
          "preg": "¿Cuántos estudiantes hay entre el <b>Centro</b> y el <b>Este</b>?",
          "audio": A("t04_c", "¿Cuántos estudiantes hay en total entre el Centro y el Este?"),
          "opc": [
            "3.966",
            "3.866",
            "2.966",
            "4.966"
          ],
          "conf": A("t04_cc", "2132 más 1834 es 3966."),
          "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno.")
        },
        {
          "preg": "En total se inscribieron <b>7.403</b>. Si el estadio tiene lugar para <b>8.000</b> personas, ¿cuántos lugares quedan?",
          "audio": A("t04_d", "En total se inscribieron 7403. Si el estadio tiene lugar para 8000 personas, ¿cuántos lugares quedan?"),
          "opc": [
            "597",
            "1.403",
            "697",
            "603"
          ],
          "conf": A("t04_dc", "8000 menos 7403 es 597 lugares libres."),
          "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno.")
        },
        {
          "preg": "Si en el Sur se anotaran <b>200 personas más</b>, ¿cuántos inscriptos habría?",
          "audio": A("t04_e", "Si en el Sur se anotaran 200 personas más, ¿cuántos inscriptos habría?"),
          "opc": [
            "1.540",
            "3.340",
            "1.360",
            "1.342"
          ],
          "conf": A("t04_ec", "Sin hacer la cuenta: se suman 2 cienes, y el 3 de los cienes pasa a ser 5. Quedan 1540.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Inscriptos por deporte",
      "vis": {
        "t": "barras",
        "id": "dp",
        "titulo": "Alumnos inscriptos por deporte",
        "max": 2000,
        "paso": 500,
        "h": 34,
        "valores": true,
        "datos": [
          [
            "Vóley",
            1400,
            "#d6b77e"
          ],
          [
            "Velocidad",
            1700,
            "#b4532a"
          ],
          [
            "Fútbol",
            1950,
            "#6b8f4e"
          ],
          [
            "Hockey",
            1300,
            "#e8b4a0"
          ]
        ]
      },
      "pista": A("t05_p", "Mirá la altura de cada barra y el número que tiene arriba."),
      "instr": A("t05_i", "En la página del torneo publicaron cuántos alumnos se anotaron en cada deporte. Mirá el gráfico de barras."),
      "items": [
        {
          "preg": "¿Qué deporte tiene <b>más</b> participantes?",
          "audio": A("t05_a", "¿Qué deporte tiene más participantes?"),
          "opc": [
            "Fútbol",
            "Velocidad",
            "Vóley",
            "Hockey"
          ],
          "conf": A("t05_ac", "Fútbol: su barra es la más alta, con 1950 alumnos.")
        },
        {
          "preg": "¿Cuál tiene <b>menos</b> participantes?",
          "audio": A("t05_b", "¿Cuál tiene menos participantes?"),
          "opc": [
            "Hockey",
            "Vóley",
            "Velocidad",
            "Fútbol"
          ],
          "conf": A("t05_bc", "Hockey: su barra es la más baja, con 1300 alumnos.")
        },
        {
          "preg": "¿Cuántos alumnos <b>más</b> hay en fútbol que en hockey?",
          "audio": A("t05_c", "¿Cuántos alumnos más hay en fútbol que en hockey?"),
          "opc": [
            "650",
            "3.250",
            "550",
            "750"
          ],
          "conf": A("t05_cc", "Con una resta: 1950 menos 1300 es 650.")
        },
        {
          "preg": "¿Cuántos alumnos <b>menos</b> hay en vóley que en velocidad?",
          "audio": A("t05_d", "¿Cuántos alumnos menos hay en vóley que en velocidad?"),
          "opc": [
            "300",
            "400",
            "3.100",
            "200"
          ],
          "conf": A("t05_dc", "1700 menos 1400 es 300.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: con una suma, dos restas",
      "vis": {
        "t": "tabla",
        "id": "ts",
        "cab": [
          "Suma",
          "Resta 1",
          "Resta 2"
        ],
        "filas": [
          [
            "2.240 + 3.100 = 5.340",
            "5.340 − 2.240 = <span id=\"ts_a\" class=\"vac\">?</span>",
            "5.340 − 3.100 = 2.240"
          ],
          [
            "2.300 + 1.500 = <span id=\"ts_b\" class=\"vac\">?</span>",
            "<span id=\"ts_b2\">…</span> − 2.300 = 1.500",
            "… − 1.500 = 2.300"
          ],
          [
            "2.430 + 7.020 = <span id=\"ts_c\" class=\"vac\">?</span>",
            "… − 2.430 = 7.020",
            "<span id=\"ts_c2\">…</span> − 7.020 = <span id=\"ts_d\" class=\"vac\">?</span>"
          ]
        ]
      },
      "deco": "portada.jpg",
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "instr": A("t06_i", "Con una suma se pueden armar dos restas. Completá la tabla."),
      "items": [
        {
          "preg": "5.340 − 2.240 = ?",
          "audio": A("t06_a", "¿Cuánto es 5340 menos 2240?"),
          "destacar": [
            "ts_a"
          ],
          "opc": [
            "3.100",
            "2.240",
            "3.000",
            "7.580"
          ],
          "escribir": [
            {
              "id": "ts_a",
              "h": "3.100"
            }
          ],
          "conf": A("t06_ac", "3100: si a la suma le sacás uno de los sumandos, queda el otro.")
        },
        {
          "preg": "2.300 + 1.500 = ?",
          "audio": A("t06_b", "¿Cuánto es 2300 más 1500?"),
          "destacar": [
            "ts_b"
          ],
          "opc": [
            "3.800",
            "3.700",
            "800",
            "4.800"
          ],
          "escribir": [
            {
              "id": "ts_b",
              "h": "3.800"
            },
            {
              "id": "ts_b2",
              "h": "3.800"
            }
          ],
          "conf": A("t06_bc", "3800. Entonces 3800 menos 2300 da 1500.")
        },
        {
          "preg": "2.430 + 7.020 = ?",
          "audio": A("t06_c", "¿Cuánto es 2430 más 7020?"),
          "destacar": [
            "ts_c"
          ],
          "opc": [
            "9.450",
            "9.540",
            "4.590",
            "9.405"
          ],
          "escribir": [
            {
              "id": "ts_c",
              "h": "9.450"
            },
            {
              "id": "ts_c2",
              "h": "9.450"
            }
          ],
          "conf": A("t06_cc", "9450.")
        },
        {
          "preg": "9.450 − 7.020 = ?",
          "audio": A("t06_d", "¿Cuánto es 9450 menos 7020?"),
          "destacar": [
            "ts_d"
          ],
          "opc": [
            "2.430",
            "7.020",
            "2.340",
            "16.470"
          ],
          "escribir": [
            {
              "id": "ts_d",
              "h": "2.430"
            }
          ],
          "conf": A("t06_dc", "2430, el otro sumando. ¡Suma y resta van juntas!")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la calculadora",
      "pista": A("t07_p", "Fijate qué cifra cambió y cuánto vale en ese lugar."),
      "instr": A("t07_i", "En la calculadora está el número 4285. ¿Qué cuenta hay que hacer para que aparezca otro número?"),
      "items": [
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "portada.jpg",
                "h": 22
              },
              {
                "t": "calc",
                "disp": "4285 → 4085"
              }
            ]
          },
          "preg": "De <b>4.285</b> a <b>4.085</b>",
          "audio": A("t07_a", "¿Qué hay que hacer para pasar de 4285 a 4085?"),
          "opc": [
            "Restar 200",
            "Restar 2",
            "Restar 20",
            "Sumar 200"
          ],
          "conf": A("t07_ac", "Desaparecen los 2 cienes: hay que restar 200.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "portada.jpg",
                "h": 22
              },
              {
                "t": "calc",
                "disp": "4285 → 4205"
              }
            ]
          },
          "preg": "De <b>4.285</b> a <b>4.205</b>",
          "audio": A("t07_b", "¿Y para pasar de 4285 a 4205?"),
          "opc": [
            "Restar 80",
            "Restar 8",
            "Restar 800",
            "Restar 85"
          ],
          "conf": A("t07_bc", "Desaparecen los 8 dieces: hay que restar 80.")
        },
        {
          "vis": {
            "t": "fila",
            "items": [
              {
                "t": "img",
                "src": "portada.jpg",
                "h": 22
              },
              {
                "t": "calc",
                "disp": "4285 → 4005"
              }
            ]
          },
          "preg": "De <b>4.285</b> a <b>4.005</b>",
          "audio": A("t07_c", "¿Y para pasar de 4285 a 4005?"),
          "opc": [
            "Restar 280",
            "Restar 28",
            "Restar 285",
            "Restar 2.800"
          ],
          "conf": A("t07_cc", "Desaparecen 2 cienes y 8 dieces: hay que restar 280.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "El número misterioso",
      "vis": {
        "t": "img",
        "src": "misterioso_7623.jpg",
        "h": 38
      },
      "pasos": [
        {
          "audio": A("t08_1", "Jugamos a El número misterioso. La seño escribe un número de cuatro cifras en el pizarrón."),
          "chip": "1. La seño escribe un número"
        },
        {
          "audio": A("t08_2", "Cada equipo recibe 4 tarjetas con dígitos y arma un número de cuatro cifras, lo más cerca posible del número de la seño."),
          "chip": "2. Cada equipo arma un número"
        },
        {
          "audio": A("t08_3", "Gana el punto el equipo que queda más cerca: el de la diferencia más chica."),
          "chip": "3. Gana la diferencia más chica"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Número misterioso: 7.623",
      "pista": A("t09_p", "Calculá la distancia de cada número al 7623 con una resta."),
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "misterioso_7623.jpg",
            "h": 26
          },
          {
            "t": "txt",
            "h": "Número de la seño: <b>7.623</b> · Equipo 1: <b>6.842</b> · Equipo 2: <b>7.351</b>"
          }
        ]
      },
      "instr": A("t09_i", "La seño escribió 7623. Un equipo armó 6842 y el otro, 7351."),
      "items": [
        {
          "preg": "¿Qué equipo ganó la partida?",
          "audio": A("t09_a", "¿Qué equipo ganó la partida?"),
          "opc": [
            "El de 7.351: le faltan 272",
            "El de 6.842: le faltan 781",
            "Empataron",
            "Ninguno"
          ],
          "conf": A("t09_ac", "Ganó el de 7351: está a 272 del 7623. El otro está a 781.")
        },
        {
          "preg": "¿Por cuánto ganó?",
          "audio": A("t09_b", "¿Por cuánto ganó?"),
          "opc": [
            "509",
            "272",
            "781",
            "1.053"
          ],
          "conf": A("t09_bc", "781 menos 272 es 509.")
        },
        {
          "preg": "Con las tarjetas 7, 3, 5 y 1, ¿qué número quedaba <b>todavía más cerca</b> de 7.623?",
          "audio": A("t09_c", "Con las tarjetas 7, 3, 5 y 1, ¿qué número quedaba todavía más cerca de 7623?"),
          "opc": [
            "7.531",
            "7.351",
            "7.135",
            "7.513"
          ],
          "conf": A("t09_cc", "7531: le faltan solo 92. Hay que poner el 5, la cifra más grande que quedaba, en los cienes.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Número misterioso: 4.241",
      "pista": A("t10_p", "Probá con el número más grande que empieza con 3 y el más chico que empieza con 5."),
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "misterioso_4241.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "h": "Número de la seño: <b>4.241</b> · Tarjetas: <b>2 · 5 · 0 · 3</b>"
          }
        ]
      },
      "instr": A("t10_i", "En otra partida, la seño escribió 4241 y las tarjetas son 2, 5, 0 y 3."),
      "items": [
        {
          "preg": "¿Se puede formar un número que empiece con 4?",
          "audio": A("t10_a", "¿Se puede formar un número que empiece con 4?"),
          "opc": [
            "No, porque no hay tarjeta con el 4",
            "Sí, siempre se puede",
            "Sí, usando el 0",
            "Sí, sumando 2 y 2"
          ],
          "conf": A("t10_ac", "No hay ningún 4 entre las tarjetas. Hay que buscar el más cercano con otras cifras.")
        },
        {
          "preg": "¿Cuál es el número <b>más cercano</b> a 4.241?",
          "audio": A("t10_b", "¿Cuál es el número más cercano a 4241?"),
          "opc": [
            "3.520",
            "5.023",
            "3.502",
            "2.530"
          ],
          "conf": A("t10_bc", "3520 está a 721 del 4241. El 5023 está a 782. Gana el 3520.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: unidades de mil, centenas, decenas y unidades",
      "vis": {
        "t": "tabla",
        "id": "vp",
        "cab": [
          "Número",
          "Unidades de mil<br>1.000",
          "Centenas<br>100",
          "Decenas<br>10",
          "Unidades<br>1"
        ],
        "filas": [
          [
            "7.829",
            "7",
            "8",
            "2",
            "9"
          ],
          [
            "9.823",
            "?",
            "?",
            "?",
            "?"
          ],
          [
            "?",
            "5",
            "2",
            "6",
            "8"
          ],
          [
            "?",
            "8",
            "0",
            "0",
            "9"
          ]
        ]
      },
      "deco": "misterioso_4241.jpg",
      "pista": A("pi_tabla", "Mirá bien la tabla: buscá el dato en su fila y en su columna."),
      "instr": A("t11_i", "Completá la tabla con las cifras de cada número."),
      "items": [
        {
          "preg": "¿Cómo se descompone <b>9.823</b>?",
          "audio": A("t11_a", "¿Cómo se descompone 9823?"),
          "destacar": [
            "vp_f1"
          ],
          "opc": [
            "9 · 8 · 2 · 3",
            "3 · 2 · 8 · 9",
            "9 · 2 · 8 · 3",
            "98 · 23"
          ],
          "escribir": [
            {
              "id": "vp_1_1",
              "h": "9"
            },
            {
              "id": "vp_1_2",
              "h": "8"
            },
            {
              "id": "vp_1_3",
              "h": "2"
            },
            {
              "id": "vp_1_4",
              "h": "3"
            }
          ],
          "conf": A("t11_ac", "9 unidades de mil, 8 centenas, 2 decenas y 3 unidades.")
        },
        {
          "preg": "5 unidades de mil, 2 centenas, 6 decenas y 8 unidades: ¿qué número es?",
          "audio": A("t11_b", "5 unidades de mil, 2 centenas, 6 decenas y 8 unidades: ¿qué número es?"),
          "destacar": [
            "vp_f2"
          ],
          "opc": [
            "5.268",
            "8.625",
            "5.286",
            "526"
          ],
          "escribir": [
            {
              "id": "vp_2_0",
              "h": "5.268"
            }
          ],
          "conf": A("t11_bc", "Es el 5268.")
        },
        {
          "preg": "8 unidades de mil, 0 centenas, 0 decenas y 9 unidades: ¿qué número es?",
          "audio": A("t11_c", "8 unidades de mil, 0 centenas, 0 decenas y 9 unidades: ¿qué número es?"),
          "destacar": [
            "vp_f3"
          ],
          "opc": [
            "8.009",
            "809",
            "8.090",
            "89"
          ],
          "escribir": [
            {
              "id": "vp_3_0",
              "h": "8.009"
            }
          ],
          "conf": A("t11_cc", "Es el 8009. Los ceros ocupan el lugar de las centenas y las decenas.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del torneo",
      "n": 10,
      "img": "portada.jpg",
      "instr": A("t12_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "TORNEO",
          "audio": A("t12_1", "Torneo: una competencia con muchos equipos.")
        },
        {
          "w": "REGION",
          "audio": A("t12_2", "Región: Sur, Norte, Centro, Este y Valle de Uco.")
        },
        {
          "w": "FRECUENCIA",
          "audio": A("t12_3", "Frecuencia: cuántas veces aparece cada dato.")
        },
        {
          "w": "FUTBOL",
          "audio": A("t12_4", "Fútbol: el deporte con más inscriptos.")
        },
        {
          "w": "HOCKEY",
          "audio": A("t12_5", "Hockey: el deporte con menos inscriptos.")
        },
        {
          "w": "CIFRAS",
          "audio": A("t12_6", "Cifras: los dígitos que forman un número.")
        },
        {
          "w": "MILES",
          "audio": A("t12_7", "Miles: el lugar de las unidades de mil.")
        }
      ],
      "fin": A("t12_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre1", "¡Muy bien! Terminaste la primera parte del Torneo Saludable. Mirá tus resultados y envialos a tu docente. En la parte 2 organizamos la competencia.")
    }
  ]
};
