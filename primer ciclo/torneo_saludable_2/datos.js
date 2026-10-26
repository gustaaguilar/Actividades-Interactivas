/* datos.js — "Torneo Saludable" · Parte 2 · Organizamos la competencia · 3er grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 3 (DGE Mendoza), págs. 61 a 66.
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
    "corto": "Torneo Saludable 2",
    "parte": "Parte 2 · Organizamos la competencia",
    "subtitulo": "Multiplicaciones y divisiones para armar equipos, kits y viajes, y medidas para entrenar",
    "imgPortada": "voley.jpg",
    "imgCierre": "papa_lucas.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Torneo Saludable» (págs. 61 a 66) del cuadernillo «Aventureros de la Matemática 3», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Organización de la competencia",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "voley.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "id": "vs",
            "cls": "grande",
            "h": "25 + 25 + 25 + 25 + 25 + 25 + 25 + 25 + 25"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("t13_1", "En el Estadio Aconcagua Arena se organiza la competencia. Para vóley se anotaron 25 equipos, con 9 jugadores cada uno."),
          "chip": "🏐 25 equipos de 9 jugadores"
        },
        {
          "audio": A("t13_2", "El organizador pensó esta suma para saber cuántos jugadores participan."),
          "destacar": [
            "vs"
          ],
          "apuntar": "vs",
          "chip": "Una suma muy larga…"
        },
        {
          "audio": A("t13_3", "Cuando un número se repite muchas veces, podemos usar una multiplicación, que es más corta."),
          "chip": "✖️ Sumas repetidas → multiplicación"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los jugadores de vóley",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "voley.jpg",
            "h": 24
          },
          {
            "t": "txt",
            "h": "<div class=\"grande\">25 + 25 + 25 + 25 + 25 + 25 + 25 + 25 + 25</div>",
            "cls": "grande"
          }
        ]
      },
      "pista": A("t14_p", "Contá cuántas veces aparece el 25 en la suma."),
      "instr": A("t14_i", "Mirá la suma del organizador: 25 equipos de 9 jugadores."),
      "items": [
        {
          "preg": "¿Qué número se repite y cuántas veces?",
          "audio": A("t14_a", "¿Qué número se repite y cuántas veces?"),
          "opc": [
            "El 25, nueve veces",
            "El 9, veinticinco veces",
            "El 25, diez veces",
            "El 9, nueve veces"
          ],
          "conf": A("t14_ac", "El 25, nueve veces: una vez por cada lugar de jugador en el equipo.")
        },
        {
          "preg": "¿Cuál es la forma más corta de hacer esa cuenta?",
          "audio": A("t14_b", "¿Cuál es la forma más corta de hacer esa cuenta?"),
          "opc": [
            "9 × 25",
            "9 + 25",
            "25 − 9",
            "25 × 25"
          ],
          "conf": A("t14_bc", "Sumar 9 veces el 25 es lo mismo que 9 por 25.")
        },
        {
          "preg": "¿Cuántos jugadores de vóley participan?",
          "audio": A("t14_c", "¿Cuántos jugadores de vóley participan?"),
          "opc": [
            "225",
            "34",
            "250",
            "200"
          ],
          "conf": A("t14_cc", "9 por 25 es 225 jugadores. Por ejemplo, 9 por 20 es 180, más 9 por 5 que es 45: 225.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los kits de la carrera",
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "pablo.jpg",
            "h": 28
          },
          {
            "t": "txt",
            "h": "<b>125</b> corredores en equipos de <b>5</b> · cada kit: <b>2</b> botellas de agua y <b>3</b> barritas"
          }
        ]
      },
      "instr": A("t15_i", "En la carrera de velocidad hay 125 corredores en equipos de 5. Cada equipo recibe un kit. Mirá cómo pensó Pablo."),
      "items": [
        {
          "preg": "Pablo dice: «Con 100 hago 20 equipos y con los 25 que sobran, 5 equipos más». ¿Es correcto?",
          "audio": A("t15_a", "¿Es correcto lo que pensó Pablo?"),
          "opc": [
            "Sí: 20 + 5 = 25 equipos",
            "No: son 20 equipos",
            "No: son 125 equipos",
            "No: son 30 equipos"
          ],
          "conf": A("t15_ac", "Sí. Partió 125 en 100 y 25, y repartió cada parte en grupos de 5.")
        },
        {
          "preg": "¿Qué cuenta sirve para comprobarlo?",
          "audio": A("t15_b", "¿Qué cuenta sirve para comprobarlo?"),
          "opc": [
            "25 × 5 = 125",
            "25 + 5 = 30",
            "125 + 5 = 130",
            "125 × 5 = 625"
          ],
          "conf": A("t15_bc", "25 equipos de 5 corredores son 125. ¡Coincide!")
        },
        {
          "preg": "Cada kit lleva <b>2 botellas</b>. ¿Cuántas botellas hacen falta?",
          "audio": A("t15_c", "Cada kit lleva 2 botellas. ¿Cuántas botellas hacen falta para los 25 kits?"),
          "opc": [
            "50",
            "27",
            "250",
            "25"
          ],
          "conf": A("t15_cc", "25 por 2 es 50 botellas.")
        },
        {
          "preg": "Cada kit lleva <b>3 barritas</b>. ¿Cuántas barritas hacen falta?",
          "audio": A("t15_d", "Cada kit lleva 3 barritas. ¿Cuántas barritas hacen falta para los 25 kits?"),
          "opc": [
            "75",
            "28",
            "53",
            "65"
          ],
          "conf": A("t15_dc", "25 por 3 es 75 barritas.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Organizamos el viaje",
      "vis": {
        "t": "img",
        "src": "guia_viaje.jpg",
        "h": 30
      },
      "pasos": [
        {
          "audio": A("t16_1", "Para viajar al torneo se usan micros de 50 pasajeros."),
          "chip": "🚌 Cada micro: 50 pasajeros"
        },
        {
          "audio": A("t16_2", "Un equipo de futsal viaja con 5 jugadores, 2 suplentes, 2 asistentes y 1 entrenador: 10 personas."),
          "chip": "Futsal: 10 personas por equipo"
        },
        {
          "audio": A("t16_3", "Un equipo de fútbol once viaja con 11 jugadores, 2 suplentes, 1 asistente y 1 entrenador: 15 personas."),
          "chip": "Fútbol once: 15 personas por equipo"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Cuántos micros?",
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "guia_viaje.jpg",
            "h": 22
          },
          {
            "t": "txt",
            "h": "🚌 Micro: <b>50</b> pasajeros · Futsal: <b>10</b> por equipo · Fútbol once: <b>15</b> por equipo"
          }
        ]
      },
      "instr": A("t17_i", "Se inscribieron 20 equipos de futsal y 10 de fútbol once."),
      "items": [
        {
          "preg": "¿Cuántas personas viajan en total? <small>(20 equipos de 10 y 10 equipos de 15)</small>",
          "audio": A("t17_a", "¿Cuántas personas viajan en total?"),
          "opc": [
            "350",
            "300",
            "250",
            "400"
          ],
          "conf": A("t17_ac", "20 por 10 es 200, y 10 por 15 es 150. En total, 350.")
        },
        {
          "preg": "Si se llenan los micros con todos juntos, ¿cuántos micros hacen falta?",
          "audio": A("t17_b", "Si se llenan los micros con todos juntos, ¿cuántos micros hacen falta?"),
          "opc": [
            "7, y no sobra lugar",
            "7, y sobran 50 lugares",
            "6, y sobran 10 lugares",
            "8, y no sobra lugar"
          ],
          "conf": A("t17_bc", "7 micros de 50 son 350: van justos.")
        },
        {
          "preg": "¿Cuántos equipos de <b>futsal</b> entran completos en un micro?",
          "audio": A("t17_c", "¿Cuántos equipos de futsal entran completos en un micro?"),
          "opc": [
            "5, y no sobran lugares",
            "4, y sobran 10",
            "6, y faltan 10",
            "10"
          ],
          "conf": A("t17_cc", "5 equipos de 10 son 50: el micro va lleno.")
        },
        {
          "preg": "¿Cuántos equipos de <b>fútbol once</b> entran completos en un micro?",
          "audio": A("t17_d", "¿Cuántos equipos de fútbol once entran completos en un micro?"),
          "opc": [
            "3, y sobran 5 lugares",
            "4, y faltan 10",
            "3, y no sobran",
            "2, y sobran 20"
          ],
          "conf": A("t17_dc", "3 equipos de 15 son 45: sobran 5 lugares.")
        },
        {
          "preg": "Si cada equipo tiene que ir <b>entero en el mismo micro</b>, ¿cuántos micros hay que contratar?",
          "audio": A("t17_e", "Si cada equipo tiene que ir entero en el mismo micro, ¿cuántos micros hay que contratar?"),
          "opc": [
            "8",
            "7",
            "6",
            "30"
          ],
          "conf": A("t17_ec", "Futsal: 4 micros de 5 equipos. Fútbol: 3 micros llevan 9 equipos y falta uno más para el último. 4 más 4: 8 micros.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: multiplicamos",
      "deco": "voley.jpg",
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "vis": {
        "t": "txt",
        "h": "🧮",
        "cls": "grande"
      },
      "instr": A("t18_i", "Resolvé estos desafíos de multiplicación."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">6 × 9 = 6 × 10 − 6</div>"
          },
          "preg": "¿Por qué 6 × 9 se puede pensar como 6 × 10 y restar 6?",
          "audio": A("t18_a", "¿Por qué 6 por 9 se puede pensar como 6 por 10 y después restar 6?"),
          "opc": [
            "Porque 9 es 10 − 1: hay un 6 de más",
            "Porque 6 + 9 = 15",
            "Porque siempre se resta 6",
            "Porque 10 − 6 = 4"
          ],
          "conf": A("t18_ac", "9 veces 6 es una vez menos que 10 veces 6. 60 menos 6 es 54.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">4 + 4 + 4 · 3 × 4 · 4 × 3 · 3 + 3 + 3 + 3</div>"
          },
          "preg": "Chloé calculó las ruedas de <b>4 triciclos</b> de cuatro maneras. ¿Son todas correctas?",
          "audio": A("t18_b", "Chloé calculó las ruedas de 4 triciclos de cuatro maneras distintas. ¿Son todas correctas?"),
          "opc": [
            "Sí, todas dan 12",
            "No, solo 4 × 3",
            "No, solo las sumas",
            "No, ninguna"
          ],
          "conf": A("t18_bc", "Todas dan 12. En la multiplicación, el orden no cambia el resultado.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">🍫 35 barritas por semana</div>"
          },
          "preg": "En el kiosco se venden <b>35 barritas por semana</b>. ¿Cuántas en un mes de 4 semanas?",
          "audio": A("t18_c", "En el kiosco se venden 35 barritas por semana. ¿Cuántas en un mes de 4 semanas?"),
          "opc": [
            "140",
            "39",
            "120",
            "105"
          ],
          "conf": A("t18_cc", "35 por 4: 30 por 4 es 120, y 5 por 4 es 20. Total: 140.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el camión de manzanas",
      "vis": {
        "t": "tabla",
        "id": "tc",
        "cab": [
          "Viajes",
          "1",
          "2",
          "3",
          "5"
        ],
        "filas": [
          [
            "Cajas",
            "234",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "portada.jpg",
      "pista": A("pi_suma", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "instr": A("t19_i", "Un camión lleva 234 cajas de manzanas por viaje. Completá la tabla."),
      "items": [
        {
          "preg": "¿Cuántas cajas lleva en <b>2 viajes</b>?",
          "audio": A("t19_a", "¿Cuántas cajas lleva en 2 viajes?"),
          "destacar": [
            "tc_0_2"
          ],
          "opc": [
            "468",
            "236",
            "448",
            "464"
          ],
          "escribir": [
            {
              "id": "tc_0_2",
              "h": "468"
            }
          ],
          "conf": A("t19_ac", "234 por 2 es 468.")
        },
        {
          "preg": "¿Y en <b>3 viajes</b>?",
          "audio": A("t19_b", "¿Y en 3 viajes?"),
          "destacar": [
            "tc_0_3"
          ],
          "opc": [
            "702",
            "692",
            "237",
            "612"
          ],
          "escribir": [
            {
              "id": "tc_0_3",
              "h": "702"
            }
          ],
          "conf": A("t19_bc", "468 más 234 es 702.")
        },
        {
          "preg": "¿Y en <b>5 viajes</b>?",
          "audio": A("t19_c", "¿Y en 5 viajes?"),
          "destacar": [
            "tc_0_4"
          ],
          "opc": [
            "1.170",
            "1.150",
            "239",
            "1.070"
          ],
          "escribir": [
            {
              "id": "tc_0_4",
              "h": "1.170"
            }
          ],
          "conf": A("t19_cc", "234 por 5 es 1170. También: 468 más 702.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: los helados de Mateo",
      "vis": {
        "t": "img",
        "src": "helados.jpg",
        "h": 34
      },
      "pista": A("t20_p", "Buscá en la tabla del 7 el número más cercano a 60 sin pasarte."),
      "instr": A("t20_i", "Mateo tiene 60 helados y vende 7 por día. Mirá cómo lo resolvieron Lucio, Magui y Sofía."),
      "items": [
        {
          "preg": "¿Para cuántos días alcanzan los 60 helados? ¿Sobran?",
          "audio": A("t20_a", "¿Para cuántos días alcanzan los 60 helados? ¿Sobran?"),
          "opc": [
            "8 días, y sobran 4",
            "9 días, y no sobran",
            "7 días, y sobran 11",
            "8 días, y no sobran"
          ],
          "conf": A("t20_ac", "7 por 8 es 56. De 60 a 56 sobran 4 helados.")
        },
        {
          "preg": "Lucio hizo <b>7 × 8 = 56</b> y <b>60 − 56 = 4</b>. ¿Qué pensó?",
          "audio": A("t20_b", "Lucio hizo 7 por 8, 56, y 60 menos 56, 4. ¿Qué pensó?"),
          "opc": [
            "Buscó en la tabla del 7 lo más cerca de 60",
            "Sumó 7 y 8",
            "Restó 7 una vez",
            "Dividió 60 por 4"
          ],
          "conf": A("t20_bc", "Buscó el resultado de la tabla del 7 más cercano a 60 sin pasarse.")
        },
        {
          "preg": "Sofía no escribió el 8, pero dice que alcanzan para 8 días. ¿Cómo lo pensó?",
          "audio": A("t20_c", "Sofía no escribió el 8, pero dice que alcanzan para 8 días. ¿Cómo lo pensó?"),
          "opc": [
            "Restó 7 ocho veces hasta que quedaron 4",
            "Multiplicó 60 por 8",
            "Lo adivinó",
            "Sumó 60 y 8"
          ],
          "conf": A("t20_cc", "Cada resta de 7 es un día. Restó 8 veces, y quedaron 4.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: dividimos",
      "pista": A("t21_p", "Pensá en la tabla de multiplicar del número por el que dividís."),
      "instr": A("t21_i", "Más desafíos para dividir."),
      "items": [
        {
          "vis": {
            "t": "img",
            "src": "truco.jpg",
            "h": 30
          },
          "preg": "Al torneo de truco se anotaron <b>280</b> personas, <b>4</b> por mesa. ¿Cuántas mesas hacen falta?",
          "audio": A("t21_a", "Al torneo de truco se anotaron 280 personas, 4 por mesa. ¿Cuántas mesas hacen falta?"),
          "opc": [
            "70",
            "76",
            "284",
            "60"
          ],
          "conf": A("t21_ac", "280 dividido 4 es 70, porque 70 por 4 es 280.")
        },
        {
          "vis": {
            "t": "img",
            "src": "diego.jpg",
            "h": 32
          },
          "preg": "Diego dividió <b>214 : 5</b> y se le manchó la hoja. ¿Qué había debajo de la mancha?",
          "audio": A("t21_b", "Diego dividió 214 por 5 y se le manchó la hoja. ¿Qué había debajo de la mancha?"),
          "opc": [
            "10 + 10 + 10 + 10 + 2 = 42",
            "10 + 10 + 10 = 30",
            "50 + 50 + 50 + 50 = 200",
            "5 + 5 + 5 + 5 = 20"
          ],
          "conf": A("t21_bc", "Cada 50 que restó son 10 grupos de 5. Cuatro veces 10, más 2: el cociente es 42 y sobran 4.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">2.400 : 2</div>"
          },
          "preg": "Sin hacer la cuenta: <b>2.400 : 2</b>",
          "audio": A("t21_c", "Sin hacer la cuenta: ¿cuánto es 2400 dividido 2?"),
          "opc": [
            "1.200",
            "1.400",
            "2.200"
          ],
          "conf": A("t21_cc", "La mitad de 2400 es 1200.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">1.230 : 3</div>"
          },
          "preg": "Sin hacer la cuenta: <b>1.230 : 3</b>",
          "audio": A("t21_d", "¿Y 1230 dividido 3?"),
          "opc": [
            "410",
            "430",
            "403"
          ],
          "conf": A("t21_dc", "1200 dividido 3 es 400, y 30 dividido 3 es 10: 410.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Nos entrenamos",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "papa_lucas.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "h": "📏 La regla mide <b>20 cm</b> · 1 metro = <b>100 cm</b>"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("t22_1", "Para entrenar, los chicos quieren marcar en el patio tramos de 25 y de 50 metros. Pero no tienen cinta métrica: solo una regla de 20 centímetros."),
          "chip": "🏃 Tramos de 25 m y 50 m"
        },
        {
          "audio": A("t22_2", "Pablo propone armar una tira de papel de 1 metro usando la regla. El papá de Lucas les recuerda que en un metro entran 100 centímetros."),
          "chip": "1 metro = 100 centímetros"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La tira de un metro",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "papa_lucas.jpg",
            "h": 22
          },
          {
            "t": "txt",
            "h": "📏 Regla: <b>20 cm</b> · 1 metro = <b>100 cm</b>"
          }
        ]
      },
      "pista": A("pi_medida", "Acordate: 1 metro tiene 100 centímetros, y 1 centímetro tiene 10 milímetros."),
      "instr": A("t23_i", "Usamos la regla para armar la tira de un metro."),
      "items": [
        {
          "preg": "¿Cuántas veces entra la regla de <b>20 cm</b> en un metro?",
          "audio": A("t23_a", "¿Cuántas veces entra la regla de 20 centímetros en un metro?"),
          "opc": [
            "5",
            "20",
            "10",
            "4"
          ],
          "conf": A("t23_ac", "20, 40, 60, 80, 100: entra 5 veces.")
        },
        {
          "preg": "Si doblás la tira de 1 metro <b>por la mitad</b>, ¿cuánto mide cada parte?",
          "audio": A("t23_b", "Si doblás la tira de 1 metro por la mitad, ¿cuánto mide cada parte?"),
          "opc": [
            "50 cm",
            "25 cm",
            "10 cm",
            "100 cm"
          ],
          "conf": A("t23_bc", "La mitad de 100 centímetros es 50.")
        },
        {
          "preg": "Si la volvés a doblar por la mitad, ¿en cuántas partes queda y cuánto mide cada una?",
          "audio": A("t23_c", "Si la volvés a doblar por la mitad, ¿en cuántas partes queda y cuánto mide cada una?"),
          "opc": [
            "4 partes de 25 cm",
            "3 partes de 33 cm",
            "2 partes de 50 cm",
            "8 partes de 10 cm"
          ],
          "conf": A("t23_cc", "Quedan 4 partes iguales de 25 centímetros: cuartos de metro.")
        },
        {
          "preg": "¿Cuántas tiras de un metro hacen falta para el tramo de <b>25 m</b>? ¿Y para el de <b>50 m</b>?",
          "audio": A("t23_d", "¿Cuántas tiras de un metro hacen falta para el tramo de 25 metros? ¿Y para el de 50?"),
          "opc": [
            "25 y 50",
            "5 y 10",
            "100 y 200",
            "20 y 40"
          ],
          "conf": A("t23_dc", "Una tira por cada metro: 25 tiras y 50 tiras.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Metros y centímetros",
      "vis": {
        "t": "tabla",
        "id": "tm",
        "cab": [
          "Metros",
          "1",
          "5",
          "?",
          "?",
          "25",
          "50",
          "100"
        ],
        "filas": [
          [
            "Centímetros",
            "?",
            "?",
            "1.000",
            "2.000",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "papa_lucas.jpg",
      "pista": A("pi_medida", "Acordate: 1 metro tiene 100 centímetros, y 1 centímetro tiene 10 milímetros."),
      "instr": A("t24_i", "Pablo empezó una tabla para pasar de metros a centímetros. Completala."),
      "items": [
        {
          "preg": "1 m y 5 m: ¿cuántos centímetros son?",
          "audio": A("t24_a", "1 metro y 5 metros: ¿cuántos centímetros son?"),
          "destacar": [
            "tm_0_1",
            "tm_0_2"
          ],
          "opc": [
            "100 cm y 500 cm",
            "10 cm y 50 cm",
            "100 cm y 105 cm",
            "1.000 cm y 5.000 cm"
          ],
          "escribir": [
            {
              "id": "tm_0_1",
              "h": "100"
            },
            {
              "id": "tm_0_2",
              "h": "500"
            }
          ],
          "conf": A("t24_ac", "Cada metro son 100 centímetros: 100 y 500.")
        },
        {
          "preg": "1.000 cm y 2.000 cm: ¿cuántos metros son?",
          "audio": A("t24_b", "1000 centímetros y 2000 centímetros: ¿cuántos metros son?"),
          "opc": [
            "10 m y 20 m",
            "100 m y 200 m",
            "1 m y 2 m",
            "1.000 m y 2.000 m"
          ],
          "escribir": [
            {
              "id": "tm_h3",
              "h": "10"
            },
            {
              "id": "tm_h4",
              "h": "20"
            }
          ],
          "conf": A("t24_bc", "Cada 100 centímetros es 1 metro: 10 y 20 metros.")
        },
        {
          "preg": "25 m, 50 m y 100 m: ¿cuántos centímetros?",
          "audio": A("t24_c", "25, 50 y 100 metros: ¿cuántos centímetros son?"),
          "destacar": [
            "tm_0_5",
            "tm_0_6",
            "tm_0_7"
          ],
          "opc": [
            "2.500 · 5.000 · 10.000",
            "250 · 500 · 1.000",
            "25 · 50 · 100",
            "2.500 · 5.000 · 1.000"
          ],
          "escribir": [
            {
              "id": "tm_0_5",
              "h": "2.500"
            },
            {
              "id": "tm_0_6",
              "h": "5.000"
            },
            {
              "id": "tm_0_7",
              "h": "10.000"
            }
          ],
          "conf": A("t24_cc", "Multiplicamos por 100: 2500, 5000 y 10000 centímetros.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre2", "¡Excelente! Terminaste la segunda parte del Torneo Saludable. Mirá tus resultados y envialos a tu docente. En la parte 3 nos hidratamos y preparamos la merienda.")
    }
  ]
};
