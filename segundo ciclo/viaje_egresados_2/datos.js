/* datos.js — "El viaje de egresados" · Parte 2 · Organización del viaje · 7.° grado · Matemática · QueSepanTodos.com
   Elaboración propia basada en «Aventureros de la Matemática 7» (DGE Mendoza, PEAMM), págs. 55 a 58.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "El viaje de egresados",
    "corto": "El viaje de egresados 2",
    "emoji": "🧳",
    "parte": "Parte 2 · Organización del viaje",
    "subtitulo": "Peso, volumen y capacidad: equipaje, valijas de mano, agua para la excursión, gaseosas, la pileta, el vino y las superficies",
    "grado": "7.° grado · Matemática",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "valijas.jpg",
    "imgCierre": "recipiente.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Encuestas, gráficos y decisiones: el viaje de egresados» (págs. 55 a 58) del cuadernillo «Aventureros de la Matemática 7», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Organizamos el viaje",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "valijas.jpg",
            "h": 26
          },
          {
            "t": "txt",
            "h": "✈️ Peso del equipaje · 🧳 Volumen de las valijas · 💧 Agua y bebidas"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("v14_1", "Llegó el momento de organizar el viaje. La aerolínea informa las condiciones del equipaje."),
          "chip": "✈️ Condiciones de la aerolínea"
        },
        {
          "audio": A("v14_2", "Vamos a trabajar con medidas de peso, de volumen y de capacidad. ¡Atención con las unidades!"),
          "chip": "kg · cm³ · litros"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El equipaje en el avión",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Bodega: 4 toneladas · 160 estudiantes</div>"
      },
      "deco": "valijas.jpg",
      "pista": A("v15_p", "1 tonelada son 1000 kilogramos."),
      "instr": A("v15_i", "El peso máximo que se puede llevar en la bodega del avión es de 4 toneladas, y viajan 160 estudiantes."),
      "items": [
        {
          "preg": "¿Cuántos kilogramos son <b>4 toneladas</b>?",
          "audio": A("v15_a", "¿Cuántos kilogramos son 4 toneladas?"),
          "opc": [
            "4.000 kg",
            "400 kg",
            "40.000 kg",
            "40 kg"
          ],
          "conf": A("v15_ac", "1 tonelada son 1000 kilos: 4 toneladas, 4000 kilos.")
        },
        {
          "preg": "¿Cuántos kg puede llevar como máximo cada estudiante?",
          "audio": A("v15_b", "¿Cuántos kilos puede llevar como máximo cada estudiante?"),
          "opc": [
            "25 kg",
            "40 kg",
            "20 kg",
            "2,5 kg"
          ],
          "conf": A("v15_bc", "4000 dividido 160: 25 kilos cada uno.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El bulto con alimentos",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Un paquete de 750 g por estudiante + 40 kg de insumos</div>"
      },
      "deco": "valijas.jpg",
      "pista": A("v16_p", "750 gramos son 0,75 kilos."),
      "instr": A("v16_i", "En la bodega también va un bulto con alimentos y obsequios: un paquete de 750 gramos por estudiante y 40 kilos de insumos generales."),
      "items": [
        {
          "preg": "¿Cuánto pesan los <b>160 paquetes</b>?",
          "audio": A("v16_a", "¿Cuánto pesan los 160 paquetes de 750 gramos?"),
          "opc": [
            "120 kg",
            "1.200 kg",
            "160 kg",
            "75 kg"
          ],
          "conf": A("v16_ac", "160 por 0,75: 120 kilos.")
        },
        {
          "preg": "¿Cuánto pesa el bulto completo?",
          "audio": A("v16_b", "¿Cuánto pesa el bulto completo, con los insumos?"),
          "opc": [
            "160 kg",
            "120 kg",
            "200 kg",
            "790 kg"
          ],
          "conf": A("v16_bc", "120 más 40: 160 kilos.")
        },
        {
          "preg": "¿Cuál es ahora el peso máximo por estudiante?",
          "audio": A("v16_c", "¿Cuál es ahora el peso máximo que puede llevar cada estudiante?"),
          "opc": [
            "24 kg",
            "25 kg",
            "23 kg",
            "20 kg"
          ],
          "conf": A("v16_cc", "Quedan 4000 menos 160, 3840 kilos. Dividido 160: 24 kilos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las valijas de mano",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "valijas.jpg",
            "h": 22
          },
          {
            "t": "txt",
            "h": "Volumen máximo: <b>120.000 cm³</b>"
          }
        ]
      },
      "pista": A("v_pi_vol", "El volumen de una caja es largo por ancho por alto."),
      "instr": A("v17_i", "La aerolínea establece que las valijas de mano no pueden superar los 120000 centímetros cúbicos."),
      "items": [
        {
          "preg": "¿Puede una valija medir <b>80 × 50 × 40 cm</b>?",
          "audio": A("v17_a", "¿Puede una valija medir 80 por 50 por 40 centímetros?"),
          "opc": [
            "No: tiene 160.000 cm³",
            "Sí: tiene 120.000 cm³",
            "Sí: tiene 170 cm³",
            "No: tiene 200.000 cm³"
          ],
          "conf": A("v17_ac", "80 por 50 por 40 es 160000: supera el límite.")
        },
        {
          "preg": "Si la base mide <b>60 × 50 cm</b>, ¿cuál puede ser la altura máxima?",
          "audio": A("v17_b", "Si la base mide 60 por 50 centímetros, ¿cuál puede ser la altura máxima?"),
          "opc": [
            "40 cm",
            "50 cm",
            "30 cm",
            "60 cm"
          ],
          "conf": A("v17_bc", "La base tiene 3000 centímetros cuadrados. 120000 dividido 3000: 40 centímetros.")
        },
        {
          "preg": "¿Cuál de estas valijas <b>cumple</b> la condición?",
          "audio": A("v17_c", "¿Cuál de estas valijas cumple la condición?"),
          "opc": [
            "60 × 40 × 30 cm",
            "70 × 50 × 40 cm",
            "80 × 60 × 30 cm",
            "100 × 40 × 40 cm"
          ],
          "conf": A("v17_cc", "60 por 40 por 30 es 72000: está dentro del límite.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Qué valija ocupa más?",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "valijas.jpg",
            "h": 20
          },
          {
            "t": "tabla",
            "id": "vl",
            "cab": [
              "Valija",
              "Largo",
              "Ancho",
              "Alto"
            ],
            "filas": [
              [
                "A",
                "70 cm",
                "40 cm",
                "30 cm"
              ],
              [
                "B",
                "60 cm",
                "50 cm",
                "35 cm"
              ],
              [
                "C",
                "80 cm",
                "35 cm",
                "30 cm"
              ]
            ]
          }
        ]
      },
      "pista": A("v_pi_vol", "El volumen de una caja es largo por ancho por alto."),
      "instr": A("v18_i", "Tres pasajeros llevan las valijas A, B y C. Calculá el volumen de cada una."),
      "items": [
        {
          "preg": "¿Cuál es el volumen de la valija <b>A</b> (70 × 40 × 30)?",
          "audio": A("v18_a", "¿Cuál es el volumen de la valija A?"),
          "opc": [
            "84.000 cm³",
            "140 cm³",
            "74.000 cm³",
            "8.400 cm³"
          ],
          "conf": A("v18_ac", "70 por 40 por 30: 84000 centímetros cúbicos.")
        },
        {
          "preg": "¿Cuál ocupa <b>mayor</b> volumen?",
          "audio": A("v18_b", "¿Cuál de las tres ocupa mayor volumen?"),
          "opc": [
            "La B: 105.000 cm³",
            "La C: es la más larga",
            "La A",
            "Las tres ocupan lo mismo"
          ],
          "conf": A("v18_bc", "B: 60 por 50 por 35, 105000. A y C tienen 84000 cada una.")
        },
        {
          "preg": "¿Puede una valija ser <b>más alta</b> pero ocupar <b>menos</b> espacio que otra?",
          "audio": A("v18_c", "¿Puede una valija ser más alta pero ocupar menos espacio que otra?"),
          "opc": [
            "Sí, si su base es más chica",
            "No, nunca",
            "Solo si pesa menos",
            "Solo si es más ancha"
          ],
          "conf": A("v18_cc", "Sí: por ejemplo una de 30 por 20 por 50 es más alta que la A, pero tiene solo 30000 centímetros cúbicos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Valijas de 72.000 cm³",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Volumen: 72.000 cm³</div>"
      },
      "deco": "valijas.jpg",
      "pista": A("v_pi_vol", "El volumen de una caja es largo por ancho por alto."),
      "instr": A("v19_i", "Un empleado informa que una valija ocupa 72000 centímetros cúbicos. ¿Qué medidas podría tener?"),
      "items": [
        {
          "preg": "¿Cuál de estas medidas da <b>72.000 cm³</b>?",
          "audio": A("v19_a", "¿Cuál de estas medidas da 72000 centímetros cúbicos?"),
          "opc": [
            "80 × 30 × 30 cm",
            "70 × 40 × 30 cm",
            "60 × 50 × 30 cm",
            "72 × 10 × 10 cm"
          ],
          "conf": A("v19_ac", "80 por 30 por 30: 72000.")
        },
        {
          "preg": "¿Y cuál de estas <b>también</b>?",
          "audio": A("v19_b", "¿Y cuál de estas también?"),
          "opc": [
            "90 × 40 × 20 cm",
            "90 × 40 × 30 cm",
            "60 × 60 × 30 cm",
            "100 × 70 × 2 cm"
          ],
          "conf": A("v19_bc", "90 por 40 por 20: 72000. También 60 por 40 por 30, o 120 por 30 por 20.")
        },
        {
          "preg": "¿Todas esas valijas tienen la <b>misma forma</b>? ¿Ocupan el mismo espacio?",
          "audio": A("v19_c", "¿Todas esas valijas tienen la misma forma? ¿Ocupan el mismo espacio?"),
          "opc": [
            "Distinta forma, mismo espacio",
            "Misma forma, distinto espacio",
            "Misma forma y mismo espacio",
            "Distinta forma y distinto espacio"
          ],
          "conf": A("v19_cc", "Tienen medidas distintas, pero el mismo volumen: 72000 centímetros cúbicos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El agua de la excursión",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Excursión de 8 horas · 42 estudiantes + 2 coordinadores · 2 l por persona</div>"
      },
      "deco": "valijas.jpg",
      "pista": A("v_pi_cap", "Recordá: 1 litro son 1000 mililitros, 1 decalitro son 10 litros y 1 hectolitro son 100 litros."),
      "instr": A("v20_i", "La excursión dura 8 horas, y cada persona debe tomar unos 2 litros de agua. Viajan 42 estudiantes y 2 coordinadores."),
      "items": [
        {
          "preg": "¿Cuántos litros de agua necesitan en total?",
          "audio": A("v20_a", "¿Cuántos litros de agua necesitan en total?"),
          "opc": [
            "88 l",
            "84 l",
            "44 l",
            "16 l"
          ],
          "conf": A("v20_ac", "Son 44 personas, por 2 litros: 88 litros.")
        },
        {
          "preg": "Con bidones de <b>20 l</b>, ¿cuántos hacen falta?",
          "audio": A("v20_b", "Si se compra agua en bidones de 20 litros, ¿cuántos bidones hacen falta?"),
          "opc": [
            "5",
            "4",
            "4,4",
            "6"
          ],
          "conf": A("v20_bc", "4 bidones son 80 litros, no alcanza: hacen falta 5.")
        },
        {
          "preg": "¿Sobra agua? ¿Qué fracción de un bidón?",
          "audio": A("v20_c", "¿Sobra agua? ¿Qué fracción de un bidón sobra?"),
          "opc": [
            "Sí: 12 l, 3/5 de bidón",
            "No sobra",
            "Sí: 2 l, 1/10 de bidón",
            "Sí: 8 l, 2/5 de bidón"
          ],
          "conf": A("v20_cc", "100 menos 88 son 12 litros: 12 de 20, tres quintos de bidón.")
        },
        {
          "preg": "Con una cantimplora de <b>750 ml</b>, ¿cuántas veces hay que llenarla?",
          "audio": A("v20_d", "Si cada estudiante lleva una cantimplora de 750 mililitros, ¿cuántas veces deberá llenarla?"),
          "opc": [
            "3 veces (la última, no del todo)",
            "2 veces",
            "4 veces",
            "750 veces"
          ],
          "conf": A("v20_dc", "2 litros dividido 0,75 es 2 enteros y dos tercios: hay que llenarla 3 veces.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las gaseosas de la cena",
      "vis": {
        "t": "txt",
        "h": "🥤 12 botellas de Cola de <b>1,5 l</b><br>🥤 8 botellas de Lima de <b>2¼ l</b>"
      },
      "deco": "valijas.jpg",
      "pista": A("v_pi_cap", "Recordá: 1 litro son 1000 mililitros, 1 decalitro son 10 litros y 1 hectolitro son 100 litros."),
      "instr": A("v21_i", "Para la cena en el hotel, los mozos prepararon 12 botellas de Cola de 1,5 litros y 8 botellas de Lima de 2 litros y cuarto."),
      "items": [
        {
          "preg": "¿De qué gaseosa hay <b>más cantidad</b>?",
          "audio": A("v21_a", "¿De qué tipo de gaseosa hay más cantidad?"),
          "opc": [
            "Hay lo mismo: 18 l de cada una",
            "De Cola",
            "De Lima",
            "No se puede saber"
          ],
          "conf": A("v21_ac", "12 por 1,5 es 18 litros, y 8 por 2,25 también es 18 litros.")
        },
        {
          "preg": "¿Alcanza para servir <b>250 ml</b> a cada uno de los 42 egresados?",
          "audio": A("v21_b", "¿Alcanza para servir 250 mililitros a cada uno de los 42 egresados?"),
          "opc": [
            "Sí: hacen falta 10,5 l",
            "No: hacen falta 42 l",
            "Justo",
            "No: hacen falta 105 l"
          ],
          "conf": A("v21_bc", "42 por 0,25 es 10,5 litros, y hay 36.")
        },
        {
          "preg": "Si todos quieren <b>dos vasos de Cola de 250 ml</b>, ¿alcanza?",
          "audio": A("v21_c", "Si todos quieren dos vasos de Cola, de 250 mililitros, ¿alcanza?"),
          "opc": [
            "No: hacen falta 21 l y hay 18 l",
            "Sí: sobran 3 l",
            "Sí, justo",
            "No: hacen falta 36 l"
          ],
          "conf": A("v21_cc", "42 por medio litro son 21 litros, y de Cola hay 18.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la pileta",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">Pileta: 2.400 hl · Bomba: 120 l por minuto</div>"
      },
      "deco": "valijas.jpg",
      "pista": A("v_pi_cap", "Recordá: 1 litro son 1000 mililitros, 1 decalitro son 10 litros y 1 hectolitro son 100 litros."),
      "instr": A("v22_i", "Una pileta de 2400 hectolitros se llena con una bomba que eleva 120 litros por minuto."),
      "items": [
        {
          "preg": "¿Cuántos litros son <b>2.400 hl</b>?",
          "audio": A("v22_a", "¿Cuántos litros son 2400 hectolitros?"),
          "opc": [
            "240.000 l",
            "24.000 l",
            "2.400.000 l",
            "24 l"
          ],
          "conf": A("v22_ac", "1 hectolitro son 100 litros: 240000 litros.")
        },
        {
          "preg": "¿Cuántos minutos tarda en llenarse?",
          "audio": A("v22_b", "¿Cuántos minutos tarda en llenarse?"),
          "opc": [
            "2.000 min",
            "200 min",
            "20.000 min",
            "288.000 min"
          ],
          "conf": A("v22_bc", "240000 dividido 120: 2000 minutos.")
        },
        {
          "preg": "¿Puede demorar <b>más de un día</b>?",
          "audio": A("v22_c", "¿Es posible que demore más de un día en llenarse?"),
          "opc": [
            "Sí: son unas 33 horas",
            "No: son 20 horas",
            "No: son 2 horas",
            "Sí: son 3 días"
          ],
          "conf": A("v22_cc", "2000 minutos dividido 60 son unas 33 horas: más que las 24 de un día.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: medidas equivalentes",
      "vis": {
        "t": "txt",
        "h": "a. 32.000 ml · b. 3 l y 200 ml · c. 1 dal y 22 l<br>d. 32 l · e. 3,2 dal · f. 3,2 l"
      },
      "deco": "valijas.jpg",
      "pista": A("v_pi_cap", "Recordá: 1 litro son 1000 mililitros, 1 decalitro son 10 litros y 1 hectolitro son 100 litros."),
      "instr": A("v23_i", "¿Cuáles de estas medidas expresan la misma cantidad?"),
      "items": [
        {
          "preg": "¿A cuántos litros equivalen <b>32.000 ml</b>?",
          "audio": A("v23_a", "¿A cuántos litros equivalen 32000 mililitros?"),
          "opc": [
            "32 l",
            "3,2 l",
            "320 l",
            "3.200 l"
          ],
          "conf": A("v23_ac", "32000 dividido 1000: 32 litros.")
        },
        {
          "preg": "¿Cuáles son iguales a <b>32 l</b>?",
          "audio": A("v23_b", "¿Cuáles de las medidas son iguales a 32 litros?"),
          "opc": [
            "32.000 ml, 1 dal y 22 l, 3,2 dal",
            "Solo 3,2 dal",
            "3 l y 200 ml, 3,2 l",
            "Todas"
          ],
          "conf": A("v23_bc", "1 decalitro y 22 litros son 32 litros, y 3,2 decalitros también.")
        },
        {
          "preg": "¿Y cuáles son iguales a <b>3,2 l</b>?",
          "audio": A("v23_c", "¿Y cuáles son iguales a 3,2 litros?"),
          "opc": [
            "3 l y 200 ml",
            "3,2 dal",
            "32.000 ml",
            "1 dal y 22 l"
          ],
          "conf": A("v23_cc", "200 mililitros son 0,2 litros: 3 litros y 200 mililitros son 3,2 litros.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el vino de Mendoza",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">2025: 12 millones de hectolitros de vino</div>"
      },
      "deco": "valijas.jpg",
      "pista": A("v_pi_cap", "Recordá: 1 litro son 1000 mililitros, 1 decalitro son 10 litros y 1 hectolitro son 100 litros."),
      "instr": A("v24_i", "En 2025 se produjeron 12 millones de hectolitros de vino en la provincia de Mendoza."),
      "items": [
        {
          "preg": "¿Cuántas botellas de <b>1 l</b> se necesitan?",
          "audio": A("v24_a", "¿Cuántas botellas de 1 litro se necesitan para envasarlo todo?"),
          "opc": [
            "1.200 millones",
            "12 millones",
            "120 millones",
            "12.000 millones"
          ],
          "conf": A("v24_ac", "12 millones por 100 litros: 1200 millones de litros, y de botellas.")
        },
        {
          "preg": "¿Y botellas de <b>750 ml</b>?",
          "audio": A("v24_b", "¿Y cuántas botellas de 750 mililitros?"),
          "opc": [
            "1.600 millones",
            "900 millones",
            "1.200 millones",
            "16 millones"
          ],
          "conf": A("v24_bc", "1200 millones dividido 0,75: 1600 millones de botellas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: superficie y volumen",
      "deco": "valijas.jpg",
      "pista": A("v25_p", "Una hectárea es un cuadrado de 100 metros de lado. Un kilómetro cuadrado, un cuadrado de 1000 metros de lado."),
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">1 km² · 1 hm² = 1 ha · 1 dam² = 1 a</div>"
      },
      "instr": A("v25_i", "Trabajemos con las unidades de superficie mayores que el metro cuadrado."),
      "items": [
        {
          "preg": "¿Cuántos m² hay en una <b>hectárea</b>?",
          "audio": A("v25_a", "¿Cuántos metros cuadrados hay en una hectárea?"),
          "opc": [
            "10.000 m²",
            "100 m²",
            "1.000 m²",
            "1.000.000 m²"
          ],
          "conf": A("v25_ac", "100 por 100: 10000 metros cuadrados.")
        },
        {
          "preg": "¿Y en un <b>km²</b>? ¿Y en un <b>dam²</b>?",
          "audio": A("v25_b", "¿Y cuántos hay en un kilómetro cuadrado? ¿Y en un decámetro cuadrado?"),
          "opc": [
            "1.000.000 m² y 100 m²",
            "1.000 m² y 10 m²",
            "100.000 m² y 100 m²",
            "1.000.000 m² y 10 m²"
          ],
          "conf": A("v25_bc", "1000 por 1000 es un millón, y 10 por 10 es 100.")
        },
        {
          "preg": "Hay unas <b>145.392 ha</b> de vid, y Mendoza tiene <b>150.000 km²</b>. ¿Qué parte está cultivada de vid?",
          "audio": A("v25_c", "En Mendoza hay unas 145392 hectáreas cultivadas de vid, y la provincia tiene 150000 kilómetros cuadrados. ¿Qué parte está cultivada de vid?"),
          "opc": [
            "Alrededor del 1 %",
            "Casi toda",
            "Alrededor de la mitad",
            "Alrededor del 10 %"
          ],
          "conf": A("v25_cc", "100 hectáreas son un kilómetro cuadrado: son unos 1454 kilómetros cuadrados, cerca del 1 por ciento.")
        },
        {
          "vis": {
            "t": "img",
            "src": "recipiente.jpg",
            "h": 28
          },
          "preg": "¿Qué volumen tiene este recipiente?",
          "audio": A("v25_d", "¿Qué volumen tiene este recipiente?"),
          "opc": [
            "56 cm³",
            "56 cm",
            "30 cm²",
            "13 cm³"
          ],
          "conf": A("v25_dc", "4 por 7 por 2: 56 centímetros cúbicos. El volumen se mide en unidades cúbicas.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la medida",
      "n": 11,
      "img": "valijas.jpg",
      "instr": A("v26_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "VALIJA",
          "audio": A("v26_1", "Valija: su volumen no puede pasar el límite.")
        },
        {
          "w": "LITRO",
          "audio": A("v26_2", "Litro: unidad de capacidad.")
        },
        {
          "w": "BIDON",
          "audio": A("v26_3", "Bidón: de 20 litros.")
        },
        {
          "w": "TONELADA",
          "audio": A("v26_4", "Tonelada: 1000 kilos.")
        },
        {
          "w": "HECTAREA",
          "audio": A("v26_5", "Hectárea: 10000 metros cuadrados.")
        },
        {
          "w": "VOLUMEN",
          "audio": A("v26_6", "Volumen: largo por ancho por alto.")
        },
        {
          "w": "PESO",
          "audio": A("v26_7", "Peso: en kilos o en gramos.")
        }
      ],
      "fin": A("v26_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre2", "¡Excelente! Terminaste la segunda parte. Mirá tus resultados y envialos a tu docente. En la parte 3 remodelamos el hotel.")
    }
  ]
};
