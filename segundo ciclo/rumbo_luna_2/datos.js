/* datos.js — "Rumbo a la Luna" · Parte 2 · Aventura espacial · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 43 a 46.
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
    "corto": "Rumbo a la Luna 2",
    "parte": "Parte 2 · Aventura espacial",
    "subtitulo": "Números grandes, divisiones por 1.000, 10.000 y 100.000, peso del equipaje con fracciones y decimales",
    "imgPortada": "nave.jpg",
    "imgCierre": "malvina_cajas.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el capítulo «Rumbo a la Luna» (págs. 43 a 46) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Aventura espacial",
      "vis": {
        "t": "img",
        "src": "nave.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("l13_1", "La nave Estrella del Sur está lista para despegar. A bordo viajan los cuatro astronautas elegidos: Emilia, Tomás, Valentín y Malvina."),
          "chip": "👩‍🚀 Emilia · Tomás · Valentín · Malvina"
        },
        {
          "audio": A("l13_2", "Su objetivo es llegar a la Luna, que está a 384000 kilómetros de la Tierra."),
          "chip": "🌕 384.000 km hasta la Luna"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Ordenar los chips en cajas",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "emilia.jpg",
            "h": 24
          },
          {
            "t": "img",
            "src": "malvina_cajas.jpg",
            "h": 24
          }
        ]
      },
      "pasos": [
        {
          "audio": A("l14n_1", "Tomás quiere guardar los chips en cajas iguales para controlar cuántos se usan."),
          "chip": "📦 Cajas iguales"
        },
        {
          "audio": A("l14n_2", "Para saber cuántas cajas de 1000 se llenan, miramos las unidades de mil: en 342000 hay 342 miles."),
          "chip": "342.000 = 342 × 1.000"
        },
        {
          "audio": A("l14n_3", "Para cajas de 10000, miramos las decenas de mil: hay 34, y sobran 2000. Para cajas de 100000, miramos las centenas de mil: hay 3."),
          "chip": "34 × 10.000 + 2.000 · 3 × 100.000 + 42.000"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El viaje y los chips",
      "pista": A("pi_cuenta", "Leé otra vez los datos de la pantalla y hacé la cuenta en tu cuaderno."),
      "instr": A("l14_i", "Resolvé los primeros cálculos de la misión."),
      "items": [
        {
          "vis": {
            "t": "img",
            "src": "nave.jpg",
            "h": 28
          },
          "preg": "La Luna está a <b>384.000 km</b> y la nave recorre <b>8.000 km por hora</b>. ¿Cuántas horas tardan?",
          "audio": A("l14_a", "La Luna está a 384000 kilómetros y la nave recorre 8000 kilómetros por hora. ¿Cuántas horas tardan en llegar?"),
          "opc": [
            "48 horas",
            "480 horas",
            "38 horas",
            "4.800 horas"
          ],
          "conf": A("l14_ac", "384000 dividido 8000 es lo mismo que 384 dividido 8: 48 horas, o sea 2 días.")
        },
        {
          "vis": {
            "t": "img",
            "src": "emilia.jpg",
            "h": 28
          },
          "preg": "La NASA compró <b>342.000 chips</b>. Emilia dice: «Ordenalos en cajas de <b>1.000</b>». ¿Cuántas cajas?",
          "audio": A("l14_b", "La NASA compró 342000 chips. Emilia dice: ordenalos en cajas de 1000. ¿Cuántas cajas se llenan?"),
          "opc": [
            "342 cajas, sin chips sueltos",
            "34 cajas y 2.000 sueltos",
            "3.420 cajas",
            "342 cajas y 1.000 sueltos"
          ],
          "conf": A("l14_bc", "342 mil son 342 cajas de mil. No sobra ninguno.")
        },
        {
          "vis": {
            "t": "img",
            "src": "malvina_cajas.jpg",
            "h": 28
          },
          "preg": "Malvina dice: «Mejor en cajas de <b>10.000</b>». ¿Cuántas cajas? ¿Sobran chips?",
          "audio": A("l14_c", "Malvina dice: mejor en cajas de 10000. ¿Cuántas cajas se llenan? ¿Sobran chips?"),
          "opc": [
            "34 cajas y sobran 2.000",
            "342 cajas",
            "34 cajas, sin sobrantes",
            "3 cajas y sobran 42.000"
          ],
          "conf": A("l14_cc", "34 cajas de 10000 son 340000. Sobran 2000 chips sueltos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La tabla de Tomás",
      "vis": {
        "t": "tabla",
        "id": "ch",
        "cab": [
          "Chips",
          "Cajas de 1.000",
          "Cajas de 10.000",
          "Cajas de 100.000"
        ],
        "filas": [
          [
            "342.000",
            "?",
            "?",
            "?"
          ]
        ]
      },
      "deco": "malvina_cajas.jpg",
      "pista": A("pi_valor", "Fijate en el valor de cada cifra según su lugar: unidades, decenas, centenas, unidades de mil, decenas de mil y centenas de mil."),
      "instr": A("l15_i", "Tomás armó una tabla con las cajas para los 342000 chips."),
      "items": [
        {
          "preg": "¿Cuántas cajas de <b>1.000</b> y de <b>10.000</b>?",
          "audio": A("l15_a", "¿Cuántas cajas de 1000 y de 10000 se completan?"),
          "destacar": [
            "ch_0_1",
            "ch_0_2"
          ],
          "opc": [
            "342 y 34",
            "34 y 342",
            "342 y 3",
            "3.420 y 342"
          ],
          "escribir": [
            {
              "id": "ch_0_1",
              "h": "342"
            },
            {
              "id": "ch_0_2",
              "h": "34"
            }
          ],
          "conf": A("l15_ac", "342 cajas de mil y 34 cajas de diez mil.")
        },
        {
          "preg": "¿Cuántas cajas de <b>100.000</b>?",
          "audio": A("l15_b", "¿Cuántas cajas de 100000 se completan?"),
          "destacar": [
            "ch_0_3"
          ],
          "opc": [
            "3, y sobran 42.000",
            "34",
            "3, sin sobrantes",
            "4"
          ],
          "escribir": [
            {
              "id": "ch_0_3",
              "h": "3"
            }
          ],
          "conf": A("l15_bc", "3 cajas de cien mil son 300000. Sobran 42000 chips.")
        },
        {
          "vis": {
            "t": "img",
            "src": "quedan.jpg",
            "h": 16
          },
          "preg": "Tomás anotó lo que queda: <b>2 × 100.000 + 9 × 10.000 + 5 × 1.000</b>. ¿Cuántos chips quedan?",
          "audio": A("l15_c", "Tomás anotó lo que queda: 2 por 100000, más 9 por 10000, más 5 por 1000. ¿Cuántos chips quedan?"),
          "opc": [
            "295.000",
            "29.500",
            "2.950.000",
            "259.000"
          ],
          "conf": A("l15_cc", "200000 más 90000 más 5000: quedan 295000 chips.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">165.345 chips</div>"
          },
          "preg": "Si quedaran <b>165.345</b> chips, ¿qué registro haría Tomás?",
          "audio": A("l15_d", "Si quedaran 165345 chips, ¿qué registro haría Tomás?"),
          "opc": [
            "1 × 100.000 + 6 × 10.000 + 5 × 1.000 + 3 × 100 + 4 × 10 + 5",
            "16 × 10.000 + 5 × 1.000 + 345",
            "1 × 100.000 + 6 × 1.000 + 5 × 100 + 345",
            "165 × 100 + 345"
          ],
          "conf": A("l15_dc", "1 centena de mil, 6 decenas de mil, 5 unidades de mil, 3 centenas, 4 decenas y 5 unidades.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "El equipaje",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "equipaje_emilia.jpg",
            "h": 24
          },
          {
            "t": "img",
            "src": "equipaje_malvina.jpg",
            "h": 24
          }
        ]
      },
      "pasos": [
        {
          "audio": A("l16_1", "Entre los cuatro astronautas pueden llevar como máximo 100 kilos de equipaje personal."),
          "chip": "🧳 Máximo: 100 kg entre los cuatro"
        },
        {
          "audio": A("l16_2", "Emilia y Malvina anotaron cada cosa que llevan y su peso. Algunos pesos están en kilos y gramos, otros en fracciones y otros en decimales."),
          "chip": "kg y g · fracciones · decimales"
        },
        {
          "audio": A("l16_3", "Para sumar, conviene escribir todo de la misma manera. Por ejemplo, un cuarto de kilo es 0,25 kilos, y 600 gramos son 0,6 kilos."),
          "chip": "¼ kg = 0,25 kg · 600 g = 0,6 kg"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Cuánto pesa el equipaje?",
      "pista": A("l17_p", "Pasá todo a kilos con decimales: un cuarto es 0,25, un medio es 0,5 y tres cuartos es 0,75."),
      "instr": A("l17_i", "Calculá el peso de cada equipaje."),
      "items": [
        {
          "vis": {
            "t": "col",
            "items": [
              {
                "t": "img",
                "src": "equipaje_emilia.jpg",
                "h": 22
              },
              {
                "t": "txt",
                "h": "12 ¼ kg + 5,4 kg + 0,75 kg + 3 kg y 600 g"
              }
            ]
          },
          "preg": "¿Cuánto pesa el equipaje de <b>Emilia</b>?",
          "audio": A("l17_a", "¿Cuánto pesa el equipaje de Emilia?"),
          "opc": [
            "22 kg",
            "21 kg",
            "23,5 kg",
            "20,4 kg"
          ],
          "conf": A("l17_ac", "12,25 más 5,4 más 0,75 más 3,6: justo 22 kilos.")
        },
        {
          "vis": {
            "t": "col",
            "items": [
              {
                "t": "img",
                "src": "equipaje_malvina.jpg",
                "h": 22
              },
              {
                "t": "txt",
                "h": "4,5 kg + 14 kg y 200 g + 3 ½ kg + ¾ kg"
              }
            ]
          },
          "preg": "¿Cuánto pesa el equipaje de <b>Malvina</b>?",
          "audio": A("l17_b", "¿Cuánto pesa el equipaje de Malvina?"),
          "opc": [
            "22,95 kg",
            "22 kg",
            "21,95 kg",
            "23,2 kg"
          ],
          "conf": A("l17_bc", "4,5 más 14,2 más 3,5 más 0,75: 22,95 kilos.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">Emilia: 22 kg · Malvina: 22,95 kg</div>"
          },
          "preg": "¿Qué equipaje pesa más?",
          "audio": A("l17_c", "¿Qué equipaje pesa más?"),
          "opc": [
            "El de Malvina, por 950 g",
            "El de Emilia",
            "Pesan lo mismo",
            "El de Malvina, por 95 g"
          ],
          "conf": A("l17_cc", "El de Malvina: 22,95 es más que 22. La diferencia es 0,95 kilos, o sea 950 gramos.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">Máximo: 100 kg · Ya usaron: 44,95 kg</div>"
          },
          "preg": "¿Pueden <b>Valentín y Tomás</b> llevar entre los dos más de <b>50 kg</b>?",
          "audio": A("l17_d", "¿Pueden Valentín y Tomás llevar entre los dos más de 50 kilos?"),
          "opc": [
            "Sí: les quedan 55,05 kg",
            "No: les quedan 45 kg",
            "No: ya se usaron 100 kg",
            "Sí: les quedan 100 kg"
          ],
          "conf": A("l17_dc", "Emilia y Malvina juntas llevan 44,95 kilos. De 100 quedan 55,05: sí pueden llevar más de 50.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: el número 624.318",
      "vis": {
        "t": "img",
        "src": "escrituras.jpg",
        "h": 30
      },
      "pista": A("pi_valor", "Fijate en el valor de cada cifra según su lugar: unidades, decenas, centenas, unidades de mil, decenas de mil y centenas de mil."),
      "instr": A("l18_i", "Juan, Ana y Sonia escribieron el número 624318 de distintas maneras. Analizalas."),
      "items": [
        {
          "preg": "¿Quién lo escribió correctamente?",
          "audio": A("l18_a", "¿Quién lo escribió correctamente?"),
          "opc": [
            "Los tres",
            "Solo Juan",
            "Solo Ana",
            "Solo Sonia"
          ],
          "conf": A("l18_ac", "¡Los tres! Sonia agrupó distinto: 62 decenas de mil son 620000, y 431 decenas son 4310.")
        },
        {
          "preg": "¿Cuál es <b>otra</b> forma correcta de escribirlo?",
          "audio": A("l18_b", "¿Cuál es otra forma correcta de escribirlo?"),
          "opc": [
            "624 × 1.000 + 318",
            "624 + 318",
            "6 × 100.000 + 24 × 1.000 + 31",
            "62 × 1.000 + 4.318"
          ],
          "conf": A("l18_bc", "624 por 1000 es 624000; más 318: 624318.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: ¿qué número es?",
      "deco": "nave.jpg",
      "vis": {
        "t": "txt",
        "h": "🔢",
        "cls": "grande"
      },
      "pista": A("pi_valor", "Fijate en el valor de cada cifra según su lugar: unidades, decenas, centenas, unidades de mil, decenas de mil y centenas de mil."),
      "instr": A("l19_i", "Elegí el número que corresponde a cada escritura."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">35 × 1.000 + 2 × 100.000 + 70 × 10</div>"
          },
          "preg": "¿Qué número es?",
          "audio": A("l19_a", "35 por 1000, más 2 por 100000, más 70 por 10. ¿Qué número es?"),
          "opc": [
            "235.700",
            "235.070",
            "23.570",
            "235.707"
          ],
          "conf": A("l19_ac", "35000 más 200000 más 700: 235700.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">57 × 10 + 2 × 10.000 + 3 × 1.000</div>"
          },
          "preg": "¿Qué número es?",
          "audio": A("l19_b", "57 por 10, más 2 por 10000, más 3 por 1000. ¿Qué número es?"),
          "opc": [
            "23.570",
            "235.700",
            "235.070",
            "235.707"
          ],
          "conf": A("l19_bc", "570 más 20000 más 3000: 23570.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">70 × 10 + 35 × 1.000 + 7 + 2 × 100.000</div>"
          },
          "preg": "¿Qué número es?",
          "audio": A("l19_c", "70 por 10, más 35 por 1000, más 7, más 2 por 100000. ¿Qué número es?"),
          "opc": [
            "235.707",
            "235.700",
            "235.070",
            "23.570"
          ],
          "conf": A("l19_cc", "700 más 35000 más 7 más 200000: 235707.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">7 × 10 + 5 × 1.000 + 23 × 10.000</div>"
          },
          "preg": "¿Qué número es?",
          "audio": A("l19_d", "7 por 10, más 5 por 1000, más 23 por 10000. ¿Qué número es?"),
          "opc": [
            "235.070",
            "235.700",
            "23.570",
            "235.707"
          ],
          "conf": A("l19_dc", "70 más 5000 más 230000: 235070.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: las golosinas",
      "deco": "nave.jpg",
      "pista": A("pi_valor", "Fijate en el valor de cada cifra según su lugar: unidades, decenas, centenas, unidades de mil, decenas de mil y centenas de mil."),
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">🍬 684.275 golosinas · bolsas de 1.000</div>"
      },
      "instr": A("l20_i", "Una fábrica tiene 684275 golosinas y quiere envasarlas en bolsas de 1000."),
      "items": [
        {
          "preg": "¿Se puede saber cuántas golosinas sobran <b>sin hacer la cuenta</b>?",
          "audio": A("l20_e", "¿Se puede saber cuántas golosinas sobran sin hacer la cuenta?"),
          "opc": [
            "Sí: son las últimas tres cifras, 275",
            "No, hay que dividir",
            "Sí: sobran 684",
            "Sí: no sobra ninguna"
          ],
          "conf": A("l20_ec", "Sí. Lo que no llega a completar mil está en las tres últimas cifras: 275.")
        },
        {
          "preg": "¿Cuántas bolsas completas se llenan?",
          "audio": A("l20_a", "¿Cuántas bolsas completas se llenan?"),
          "opc": [
            "684",
            "68",
            "6.842",
            "685"
          ],
          "conf": A("l20_ac", "Los miles dicen las bolsas: 684 bolsas completas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: fracciones y decimales",
      "vis": {
        "t": "img",
        "src": "fracciones.jpg",
        "h": 26
      },
      "pista": A("pi_valor", "Fijate en el valor de cada cifra según su lugar: unidades, decenas, centenas, unidades de mil, decenas de mil y centenas de mil."),
      "instr": A("l20b_i", "Uní las expresiones que representan el mismo número."),
      "items": [
        {
          "preg": "¿Qué expresión representa el mismo número que <b>¾</b>?",
          "audio": A("l20_b", "¿Qué expresión representa el mismo número que tres cuartos?"),
          "opc": [
            "0,75",
            "0,25",
            "0,50",
            "50/100"
          ],
          "conf": A("l20_bc", "Tres cuartos es 0,75.")
        },
        {
          "preg": "¿Y cuál es igual a <b>25/100</b>?",
          "audio": A("l20_c", "¿Y cuál es igual a 25 centésimos?"),
          "opc": [
            "0,25",
            "0,75",
            "0,50",
            "½"
          ],
          "conf": A("l20_cc", "25 centésimos es 0,25.")
        },
        {
          "preg": "<b>0,5</b>, <b>½</b>, <b>50/100</b> y <b>0,50</b>…",
          "audio": A("l20_d", "0,5, un medio, 50 centésimos y 0,50… ¿qué tienen en común?"),
          "opc": [
            "Representan el mismo número",
            "Son todos distintos",
            "Solo 0,5 y 0,50 son iguales",
            "Solo ½ y 50/100 son iguales"
          ],
          "conf": A("l20_dc", "Son cuatro maneras de escribir la mitad.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos: la verdulería",
      "vis": {
        "t": "fila",
        "cls": "tres",
        "items": [
          {
            "t": "img",
            "src": "diego.jpg",
            "h": 22
          },
          {
            "t": "img",
            "src": "carina.jpg",
            "h": 22
          }
        ]
      },
      "pista": A("l21_p", "Pasá todo a kilos: medio kilo es 0,5, un cuarto es 0,25 y 500 gramos son 0,5 kilos."),
      "instr": A("l21_i", "Diego pidió medio kilo de zanahoria, 2,5 kilos de papa y 250 gramos de pimientos. Carina pidió 1 kilo y cuarto de zanahoria, 1 kilo y 500 gramos de papa y 0,75 kilos de pimientos."),
      "items": [
        {
          "preg": "¿Quién compró <b>más</b> verdura?",
          "audio": A("l21_a", "¿Quién compró más verdura?"),
          "opc": [
            "Carina: 3,5 kg contra 3,25 kg",
            "Diego: 3,25 kg contra 3,5 kg",
            "Compraron lo mismo",
            "Diego, porque compró más papa"
          ],
          "conf": A("l21_ac", "Diego: 0,5 más 2,5 más 0,25, 3,25 kilos. Carina: 1,25 más 1,5 más 0,75, 3,5 kilos.")
        },
        {
          "preg": "Si Carina pidiera la <b>mitad</b> de zanahorias (1 ¼ kg), ¿cuánto le darían?",
          "audio": A("l21_b", "Si Carina pidiera la mitad de los kilos de zanahorias, ¿cuánto le darían?"),
          "opc": [
            "625 g",
            "500 g",
            "250 g",
            "750 g"
          ],
          "conf": A("l21_bc", "La mitad de 1250 gramos es 625 gramos.")
        },
        {
          "preg": "Si Diego pidiera la <b>mitad</b> de papa (2,5 kg), ¿cuánto le darían?",
          "audio": A("l21_c", "Si Diego pidiera la mitad de los kilos de papa, ¿cuánto le darían?"),
          "opc": [
            "1,25 kg",
            "1,5 kg",
            "1 kg",
            "2 kg"
          ],
          "conf": A("l21_cc", "La mitad de 2,5 es 1,25 kilos.")
        },
        {
          "preg": "Si Carina pidiera el <b>triple</b> de pimientos (0,75 kg), ¿cuánto le darían?",
          "audio": A("l21_d", "Si Carina pidiera el triple de los kilos de pimientos, ¿cuánto le darían?"),
          "opc": [
            "2,25 kg",
            "2,75 kg",
            "1,5 kg",
            "0,225 kg"
          ],
          "conf": A("l21_dc", "3 por 0,75 es 2,25 kilos.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la aventura",
      "n": 10,
      "img": "nave.jpg",
      "instr": A("l22_i", "Buscá en la sopa de letras siete palabras de esta parte. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "NAVE",
          "audio": A("l22_1", "Nave: la Estrella del Sur.")
        },
        {
          "w": "CHIPS",
          "audio": A("l22_2", "Chips: 342000 para la misión.")
        },
        {
          "w": "CAJAS",
          "audio": A("l22_3", "Cajas de mil, de diez mil y de cien mil.")
        },
        {
          "w": "EQUIPAJE",
          "audio": A("l22_4", "Equipaje: hasta 100 kilos entre los cuatro.")
        },
        {
          "w": "KILOS",
          "audio": A("l22_5", "Kilos: la unidad para pesar el equipaje.")
        },
        {
          "w": "DECIMAL",
          "audio": A("l22_6", "Decimal: como 0,75.")
        },
        {
          "w": "MITAD",
          "audio": A("l22_7", "Mitad: un medio, 0,5.")
        }
      ],
      "fin": A("l22_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre2", "¡Excelente, tripulación! Terminaste la segunda parte de Rumbo a la Luna. Mirá tus resultados y envialos a tu docente. En la parte 3 transportamos el rover y cuidamos la energía.")
    }
  ]
};
