/* datos.js — "El viaje de egresados" · Parte 1 · Encuestas, gráficos y decisiones · 7.° grado · Matemática · QueSepanTodos.com
   Elaboración propia basada en «Aventureros de la Matemática 7» (DGE Mendoza, PEAMM), págs. 51 a 54.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "El viaje de egresados",
    "corto": "El viaje de egresados 1",
    "emoji": "🧳",
    "parte": "Parte 1 · Encuestas, gráficos y decisiones",
    "subtitulo": "Estadística: votos por destino, un gráfico con errores, servicios preferidos, consultas semana a semana y calificaciones",
    "grado": "7.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "viaje_portada.jpg",
    "imgCierre": "grafico_destinos.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Encuestas, gráficos y decisiones: el viaje de egresados» (págs. 51 a 54) del cuadernillo «Aventureros de la Matemática 7», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "El viaje de egresados",
      "vis": {
        "t": "img",
        "src": "viaje_portada.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("v01_1", "La agencia de turismo Rumbo Viajes prepara nuevas propuestas de viajes de egresados para distintas escuelas."),
          "chip": "🧳 Rumbo Viajes"
        },
        {
          "audio": A("v01_2", "Para saber qué prefieren los estudiantes, la agencia hace encuestas. Con los datos arma tablas y gráficos, y así toma decisiones."),
          "chip": "📊 Encuestas, tablas y gráficos"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Adónde quieren viajar?",
      "vis": {
        "t": "tabla",
        "id": "de",
        "cab": [
          "Destino",
          "Votos"
        ],
        "filas": [
          [
            "Bariloche (Río Negro)",
            "2.053"
          ],
          [
            "Carlos Paz (Córdoba)",
            "2.879"
          ],
          [
            "Cataratas del Iguazú (Misiones)",
            "1.594"
          ],
          [
            "Valle de Las Leñas (Mendoza)",
            "1.775"
          ],
          [
            "Mar del Plata (Buenos Aires)",
            "1.749"
          ]
        ]
      },
      "deco": "viaje_portada.jpg",
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "instr": A("v02_i", "La agencia encuestó a estudiantes de distintas escuelas sobre el destino que prefieren para su viaje de egresados."),
      "items": [
        {
          "preg": "¿Cuál fue el destino <b>más elegido</b>?",
          "audio": A("v02_a", "¿Cuál fue el destino más elegido?"),
          "opc": [
            "Carlos Paz",
            "Bariloche",
            "Las Leñas",
            "Mar del Plata"
          ],
          "conf": A("v02_ac", "Carlos Paz, con 2879 votos.")
        },
        {
          "preg": "¿Cuál recibió <b>menos votos</b>?",
          "audio": A("v02_b", "¿Cuál recibió menos votos?"),
          "opc": [
            "Cataratas del Iguazú",
            "Mar del Plata",
            "Las Leñas",
            "Bariloche"
          ],
          "conf": A("v02_bc", "Las Cataratas del Iguazú, con 1594 votos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Contamos los votos",
      "vis": {
        "t": "tabla",
        "id": "de",
        "cab": [
          "Destino",
          "Votos"
        ],
        "filas": [
          [
            "Bariloche (Río Negro)",
            "2.053"
          ],
          [
            "Carlos Paz (Córdoba)",
            "2.879"
          ],
          [
            "Cataratas del Iguazú (Misiones)",
            "1.594"
          ],
          [
            "Valle de Las Leñas (Mendoza)",
            "1.775"
          ],
          [
            "Mar del Plata (Buenos Aires)",
            "1.749"
          ]
        ]
      },
      "deco": "viaje_portada.jpg",
      "pista": A("v03_p", "Sumá todos los votos. Para la diferencia, restá el menor al mayor."),
      "instr": A("v03_i", "Ahora hagamos algunas cuentas con los votos."),
      "items": [
        {
          "preg": "¿Cuántos estudiantes participaron de la encuesta?",
          "audio": A("v03_a", "¿Cuántos estudiantes participaron de la encuesta?"),
          "opc": [
            "10.050",
            "9.050",
            "10.500",
            "8.171"
          ],
          "conf": A("v03_ac", "2053 más 2879 más 1594 más 1775 más 1749: 10050 estudiantes.")
        },
        {
          "preg": "¿Qué diferencia de votos hay entre el más elegido y el menos elegido?",
          "audio": A("v03_b", "¿Qué diferencia de votos hay entre el destino más elegido y el menos elegido?"),
          "opc": [
            "1.285",
            "826",
            "1.130",
            "4.473"
          ],
          "conf": A("v03_bc", "2879 menos 1594: 1285 votos.")
        },
        {
          "preg": "Aproximadamente, ¿qué parte del total votó por Carlos Paz?",
          "audio": A("v03_c", "Aproximadamente, ¿qué parte del total votó por Carlos Paz?"),
          "opc": [
            "Casi 3 de cada 10",
            "La mitad",
            "Casi 1 de cada 10",
            "Más de 6 de cada 10"
          ],
          "conf": A("v03_cc", "2879 de 10050 es un poco menos del 30 por ciento: casi 3 de cada 10.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Un gráfico con errores",
      "vis": {
        "t": "img",
        "src": "grafico_destinos.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("v04_1", "La agencia hizo un gráfico de barras con los datos de la tabla, pero tiene varios errores."),
          "chip": "🔍 ¡A buscar errores!"
        },
        {
          "audio": A("v04_2", "Para encontrarlos, compará el título, los nombres de los destinos y la altura de cada barra con la tabla."),
          "chip": "Título · nombres · alturas"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Corregimos el gráfico",
      "vis": {
        "t": "img",
        "src": "grafico_destinos.jpg",
        "h": 34
      },
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "instr": A("v05_i", "Compará el gráfico con la tabla de votos y encontrá los errores."),
      "items": [
        {
          "preg": "¿Qué error tiene el <b>título</b>?",
          "audio": A("v05_a", "¿Qué error tiene el título?"),
          "opc": [
            "Habla de kilómetros, pero muestra votos",
            "Ninguno",
            "Le falta el año",
            "Debería decir «destinos»"
          ],
          "conf": A("v05_ac", "El gráfico muestra cantidad de votos, no kilómetros de distancia.")
        },
        {
          "preg": "¿Qué error tiene la barra de <b>Carlos Paz</b>?",
          "audio": A("v05_b", "¿Qué error tiene la barra de Carlos Paz?"),
          "opc": [
            "Llega a 1.800, y debería llegar a 2.879",
            "Está bien",
            "Debería ser la más baja",
            "Llega a 2.879, y debería llegar a 1.800"
          ],
          "conf": A("v05_bc", "Carlos Paz tuvo 2879 votos: debería ser la barra más alta.")
        },
        {
          "preg": "¿Qué destino está <b>mal nombrado</b>?",
          "audio": A("v05_c", "¿Qué destino está mal nombrado?"),
          "opc": [
            "«Valle de la Luna, San Juan» debería ser «Las Leñas, Mendoza»",
            "Bariloche",
            "Carlos Paz",
            "Mar del Plata"
          ],
          "conf": A("v05_cc", "En la tabla figura el Valle de Las Leñas, en Mendoza.")
        },
        {
          "preg": "¿Qué otro error hay?",
          "audio": A("v05_d", "¿Qué otro error hay en el gráfico?"),
          "opc": [
            "Iguazú y Mar del Plata tienen las alturas intercambiadas",
            "Bariloche tiene menos votos",
            "Falta un destino",
            "No hay otro error"
          ],
          "conf": A("v05_dc", "Iguazú tuvo 1594 votos y Mar del Plata 1749: las barras están cambiadas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Qué gráfico conviene?",
      "vis": {
        "t": "barras",
        "id": "bo",
        "titulo": "Votos por destino",
        "max": 3000,
        "paso": 500,
        "valores": true,
        "h": 32,
        "datos": [
          [
            "Bariloche",
            2053,
            "#2563eb"
          ],
          [
            "Carlos|Paz",
            2879,
            "#16a34a"
          ],
          [
            "Iguazú",
            1594,
            "#f59e0b"
          ],
          [
            "Las|Leñas",
            1775,
            "#db2777"
          ],
          [
            "Mar del|Plata",
            1749,
            "#7c3aed"
          ]
        ]
      },
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "instr": A("v06_i", "Este es el gráfico de barras corregido. Pensemos qué tipo de gráfico conviene usar."),
      "items": [
        {
          "preg": "Para <b>comparar</b> la cantidad de votos de cada destino, ¿qué gráfico resulta más útil?",
          "audio": A("v06_a", "Para comparar la cantidad de votos de cada destino, ¿qué gráfico resulta más útil?"),
          "opc": [
            "El de barras: se comparan las alturas",
            "El circular",
            "El de línea",
            "Ninguno"
          ],
          "conf": A("v06_ac", "En el gráfico de barras se ve enseguida cuál es más alta y cuánto más.")
        },
        {
          "preg": "¿Y para mostrar qué <b>parte del total</b> eligió cada destino?",
          "audio": A("v06_b", "¿Y para mostrar qué parte del total eligió cada destino?"),
          "opc": [
            "El circular",
            "El de barras",
            "El de línea",
            "Una tabla de doble entrada"
          ],
          "conf": A("v06_bc", "El gráfico circular muestra cada parte como un sector del total.")
        },
        {
          "preg": "En un gráfico circular, ¿cómo sería el sector de Carlos Paz?",
          "audio": A("v06_c", "En un gráfico circular, ¿cómo sería el sector de Carlos Paz?"),
          "opc": [
            "El más grande, casi un tercio del círculo",
            "La mitad del círculo",
            "El más chico",
            "Igual a los demás"
          ],
          "conf": A("v06_cc", "Carlos Paz tiene casi el 30 por ciento de los votos: el sector más grande.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los servicios preferidos",
      "vis": {
        "t": "tabla",
        "id": "sv",
        "cab": [
          "Servicio",
          "Alumnos"
        ],
        "filas": [
          [
            "Wi-Fi",
            "40"
          ],
          [
            "Piscina climatizada",
            "28"
          ],
          [
            "Excursiones",
            "52"
          ],
          [
            "Juegos recreativos",
            "35"
          ],
          [
            "Comidas libres",
            "45"
          ],
          [
            "Total",
            "?"
          ]
        ]
      },
      "deco": "viaje_portada.jpg",
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "instr": A("v07_i", "La agencia preguntó qué servicio consideran más importante los estudiantes."),
      "items": [
        {
          "preg": "¿Cuántos alumnos fueron consultados?",
          "audio": A("v07_a", "¿Cuántos alumnos fueron consultados?"),
          "destacar": [
            "sv_5_1"
          ],
          "opc": [
            "200",
            "180",
            "152",
            "250"
          ],
          "escribir": [
            {
              "id": "sv_5_1",
              "h": "200"
            }
          ],
          "conf": A("v07_ac", "40 más 28 más 52 más 35 más 45: 200 alumnos.")
        },
        {
          "preg": "¿Qué servicio es el <b>más elegido</b>?",
          "audio": A("v07_b", "¿Qué servicio es el más elegido?"),
          "opc": [
            "Excursiones",
            "Comidas libres",
            "Wi-Fi",
            "Juegos recreativos"
          ],
          "conf": A("v07_bc", "Las excursiones, con 52 alumnos.")
        },
        {
          "preg": "¿Y el <b>menos elegido</b>?",
          "audio": A("v07_c", "¿Y el menos elegido?"),
          "opc": [
            "Piscina climatizada",
            "Juegos recreativos",
            "Wi-Fi",
            "Comidas libres"
          ],
          "conf": A("v07_cc", "La piscina climatizada, con 28 alumnos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Conclusiones de los servicios",
      "vis": {
        "t": "tabla",
        "id": "sv",
        "cab": [
          "Servicio",
          "Alumnos"
        ],
        "filas": [
          [
            "Wi-Fi",
            "40"
          ],
          [
            "Piscina climatizada",
            "28"
          ],
          [
            "Excursiones",
            "52"
          ],
          [
            "Juegos recreativos",
            "35"
          ],
          [
            "Comidas libres",
            "45"
          ],
          [
            "Total",
            "200"
          ]
        ]
      },
      "deco": "viaje_portada.jpg",
      "pista": A("v08_p", "Para el porcentaje, dividí la cantidad por el total, 200, y multiplicá por 100."),
      "instr": A("v08_i", "Saquemos conclusiones a partir de la tabla."),
      "items": [
        {
          "preg": "¿Qué porcentaje eligió <b>Wi-Fi</b>?",
          "audio": A("v08_a", "¿Qué porcentaje de los alumnos eligió Wi-Fi?"),
          "opc": [
            "20 %",
            "40 %",
            "10 %",
            "25 %"
          ],
          "conf": A("v08_ac", "40 de 200 es la quinta parte: el 20 por ciento.")
        },
        {
          "preg": "¿Qué porcentaje eligió <b>Excursiones</b>?",
          "audio": A("v08_b", "¿Y qué porcentaje eligió excursiones?"),
          "opc": [
            "26 %",
            "52 %",
            "20 %",
            "30 %"
          ],
          "conf": A("v08_bc", "52 de 200 es 26 de 100: el 26 por ciento.")
        },
        {
          "preg": "¿Qué conclusión es <b>correcta</b>?",
          "audio": A("v08_c", "¿Qué conclusión es correcta?"),
          "opc": [
            "Excursiones y comidas libres suman casi la mitad",
            "La mayoría eligió Wi-Fi",
            "Piscina es lo más elegido",
            "Todos los servicios tienen igual preferencia"
          ],
          "conf": A("v08_cc", "52 más 45 es 97: casi la mitad de 200.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las consultas a la agencia",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "consultas.jpg",
            "h": 26
          },
          {
            "t": "tabla",
            "id": "cs",
            "cab": [
              "Semana",
              "1.ª",
              "2.ª",
              "3.ª",
              "4.ª",
              "5.ª",
              "Total"
            ],
            "filas": [
              [
                "Consultas",
                "120",
                "?",
                "?",
                "?",
                "210",
                "?"
              ]
            ]
          }
        ]
      },
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "instr": A("v09_i", "Después de lanzar los afiches, la agencia registró las consultas de las primeras cinco semanas. Completá la tabla mirando el gráfico."),
      "items": [
        {
          "preg": "¿Cuántas consultas hubo en la <b>2.ª</b> y en la <b>3.ª</b> semana?",
          "audio": A("v09_a", "¿Cuántas consultas hubo en la segunda y en la tercera semana?"),
          "destacar": [
            "cs_0_2",
            "cs_0_3"
          ],
          "opc": [
            "140 y 180",
            "130 y 170",
            "140 y 160",
            "160 y 180"
          ],
          "escribir": [
            {
              "id": "cs_0_2",
              "h": "140"
            },
            {
              "id": "cs_0_3",
              "h": "180"
            }
          ],
          "conf": A("v09_ac", "En el gráfico, la semana 2 marca 140 y la semana 3 marca 180.")
        },
        {
          "preg": "¿Y en la <b>4.ª</b> semana?",
          "audio": A("v09_b", "¿Y en la cuarta semana?"),
          "destacar": [
            "cs_0_4"
          ],
          "opc": [
            "160",
            "200",
            "180",
            "150"
          ],
          "escribir": [
            {
              "id": "cs_0_4",
              "h": "160"
            }
          ],
          "conf": A("v09_bc", "La semana 4 marca 160 consultas.")
        },
        {
          "preg": "¿Cuál es el <b>total</b> de consultas?",
          "audio": A("v09_c", "¿Cuál es el total de consultas?"),
          "destacar": [
            "cs_0_6"
          ],
          "opc": [
            "810",
            "750",
            "850",
            "210"
          ],
          "escribir": [
            {
              "id": "cs_0_6",
              "h": "810"
            }
          ],
          "conf": A("v09_cc", "120 más 140 más 180 más 160 más 210: 810 consultas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Analizamos las consultas",
      "vis": {
        "t": "img",
        "src": "consultas.jpg",
        "h": 34
      },
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "instr": A("v10_i", "Analicemos cómo evolucionaron las consultas."),
      "items": [
        {
          "preg": "¿En qué semana hubo <b>más</b> consultas?",
          "audio": A("v10_a", "¿En qué semana hubo más consultas?"),
          "opc": [
            "En la 5.ª",
            "En la 3.ª",
            "En la 1.ª",
            "En la 4.ª"
          ],
          "conf": A("v10_ac", "En la quinta semana, con 210 consultas.")
        },
        {
          "preg": "¿Entre qué semanas <b>aumentaron más</b>?",
          "audio": A("v10_b", "¿Entre qué semanas aumentaron más las consultas?"),
          "opc": [
            "Entre la 4.ª y la 5.ª: 50 más",
            "Entre la 2.ª y la 3.ª",
            "Entre la 1.ª y la 2.ª",
            "Entre la 3.ª y la 4.ª"
          ],
          "conf": A("v10_bc", "De 160 a 210 hay 50 consultas más: el mayor aumento.")
        },
        {
          "preg": "¿Qué conclusión general describe mejor el gráfico?",
          "audio": A("v10_c", "¿Qué conclusión general describe mejor el gráfico?"),
          "opc": [
            "Las consultas crecieron, con una baja en la 4.ª semana",
            "Las consultas siempre bajaron",
            "Las consultas no cambiaron",
            "Siempre aumentaron lo mismo"
          ],
          "conf": A("v10_cc", "La tendencia es a crecer, aunque entre la tercera y la cuarta semana bajaron.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la salida recreativa",
      "deco": "viaje_portada.jpg",
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "vis": {
        "t": "txt",
        "h": "🥾 Caminata por el Dique Potrerillos<br>🪂 Parapente en el Cerro Arco<br>🚣 Rafting en el Río Atuel<br>🐎 Cabalgata en el Manzano Histórico"
      },
      "instr": A("v11_i", "La escuela planea una salida recreativa y quiere conocer las preferencias de los estudiantes."),
      "items": [
        {
          "preg": "¿A quién conviene encuestar?",
          "audio": A("v11_a", "¿A quién conviene encuestar para conocer las preferencias?"),
          "opc": [
            "A los estudiantes que van a ir a la salida",
            "Solo a los docentes",
            "A los vecinos de la escuela",
            "A una sola persona"
          ],
          "conf": A("v11_ac", "A los estudiantes que van a participar: son sus preferencias las que importan.")
        },
        {
          "preg": "¿Cómo conviene registrar las respuestas?",
          "audio": A("v11_b", "¿Cómo conviene registrar las respuestas?"),
          "opc": [
            "En una tabla con cada actividad y su cantidad de votos",
            "Solo recordarlas",
            "En una lista sin contar",
            "En un dibujo libre"
          ],
          "conf": A("v11_bc", "Una tabla de frecuencias ordena los datos y permite contarlos.")
        },
        {
          "preg": "Si votan 120 y el rafting recibe 60 votos, ¿qué se puede concluir?",
          "audio": A("v11_c", "Si votan 120 estudiantes y el rafting recibe 60 votos, ¿qué se puede concluir?"),
          "opc": [
            "La mitad prefiere rafting",
            "Todos prefieren rafting",
            "El rafting es el menos elegido",
            "No se puede concluir nada"
          ],
          "conf": A("v11_cc", "60 de 120 es la mitad: el rafting es claramente el preferido.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: las calificaciones",
      "deco": "viaje_portada.jpg",
      "pista": A("v_pi_est", "Leé con atención la tabla o el gráfico: qué representa cada eje, cada fila y cada barra."),
      "vis": {
        "t": "txt",
        "h": "2 alumnos: <b>5</b> · 8 alumnos: <b>6</b><br>10 alumnos: <b>7</b> · 4 alumnos: <b>9</b>"
      },
      "instr": A("v12_i", "Un profesor quiere representar en un gráfico las calificaciones de sus alumnos."),
      "items": [
        {
          "preg": "¿Cuál es el gráfico que describe la situación?",
          "audio": A("v12_a", "¿Cuál es el gráfico que describe la situación?"),
          "opc": [
            "Uno de barras donde la más alta es la del siete",
            "Uno de barras con todas las alturas iguales",
            "Uno circular con todos los sectores iguales",
            "Uno de línea con el punto más alto en el nueve"
          ],
          "conf": A("v12_ac", "El siete lo obtuvieron 10 alumnos, la mayor cantidad: su barra es la más alta.")
        },
        {
          "preg": "¿Cuántos alumnos tiene el profesor?",
          "audio": A("v12_b", "¿Cuántos alumnos tiene el profesor?"),
          "opc": [
            "24",
            "27",
            "20",
            "4"
          ],
          "conf": A("v12_bc", "2 más 8 más 10 más 4: 24 alumnos.")
        },
        {
          "preg": "¿Qué barra es la más <b>baja</b>?",
          "audio": A("v12_c", "¿Qué barra es la más baja?"),
          "opc": [
            "La del cinco",
            "La del nueve",
            "La del seis",
            "La del siete"
          ],
          "conf": A("v12_cc", "La del cinco: solo 2 alumnos.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la estadística",
      "n": 11,
      "img": "viaje_portada.jpg",
      "instr": A("v13_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "ENCUESTA",
          "audio": A("v13_1", "Encuesta: preguntas para conocer opiniones.")
        },
        {
          "w": "VOTOS",
          "audio": A("v13_2", "Votos: lo que se cuenta en la encuesta.")
        },
        {
          "w": "BARRAS",
          "audio": A("v13_3", "Gráfico de barras: para comparar.")
        },
        {
          "w": "CIRCULAR",
          "audio": A("v13_4", "Gráfico circular: partes del total.")
        },
        {
          "w": "TABLA",
          "audio": A("v13_5", "Tabla: ordena los datos.")
        },
        {
          "w": "DESTINO",
          "audio": A("v13_6", "Destino: adónde viajar.")
        },
        {
          "w": "DATOS",
          "audio": A("v13_7", "Datos: la información que se registra.")
        }
      ],
      "fin": A("v13_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre1", "¡Muy bien! Terminaste la primera parte. Mirá tus resultados y envialos a tu docente. En la parte 2 organizamos el viaje.")
    }
  ]
};
