/* datos.js — "El vivero" · El ranking de las plantas · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 36 a 38.
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
    "corto": "El vivero · El ranking de las plantas",
    "parte": "El ranking de las plantas",
    "subtitulo": "Gráficos de barras, tablas, promedio y moda para tomar decisiones en el vivero",
    "imgPortada": "grafico_ventas.jpg",
    "imgCierre": "dario_promedio.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en «El ranking de las plantas. Contamos para decidir» (págs.36 a 38) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "El pedido de Darío",
      "vis": {
        "t": "img",
        "src": "grafico_ventas.jpg",
        "h": 36
      },
      "pasos": [
        {
          "audio": A("r01_1", "Para la Semana de la Familia, en octubre, se regalan muchas plantas. Darío es el encargado de hacer los pedidos del vivero."),
          "chip": "🌸 La Semana de la Familia"
        },
        {
          "audio": A("r01_2", "Otros años pidió quinientas plantas de cada variedad, y le sobraron muchas sin vender. Este año no quiere que le pase lo mismo."),
          "chip": "📦 500 de cada variedad… y sobraron"
        },
        {
          "audio": A("r01_3", "Por eso armó un gráfico con las ventas de los últimos tres años: petunia, caléndula, conejito y alelí."),
          "chip": "📊 Las ventas de 2023, 2024 y 2025"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Leemos el gráfico",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "grafico_ventas.jpg",
            "h": 24
          },
          {
            "t": "tabla",
            "id": "tv",
            "cab": [
              "Temporada",
              "Petunia",
              "Caléndula",
              "Conejito",
              "Alelí"
            ],
            "filas": [
              [
                "2023",
                "350",
                "400",
                "250",
                "100"
              ],
              [
                "2024",
                "250",
                "450",
                "200",
                "200"
              ],
              [
                "2025",
                "300",
                "450",
                "150",
                "300"
              ]
            ]
          }
        ]
      },
      "pista": A("pr_datos", "Leé los datos de la tabla que está en pantalla: cada columna es una planta y cada fila, una temporada."),
      "instr": A("r02_i", "Mirá el gráfico y la tabla de las ventas de las tres temporadas."),
      "items": [
        {
          "preg": "¿Le sirve a Darío esta información para hacer el pedido?",
          "audio": A("r02_a", "¿La información del gráfico le es útil a Darío para hacer el pedido de este año?"),
          "opc": [
            "Sí: muestra cuánto se vendió de cada planta",
            "No: son datos viejos",
            "No: el gráfico no tiene números",
            "Solo para las petunias"
          ],
          "conf": A("r02_ac", "Sí. Sabiendo cuánto se vendió cada año, puede pedir una cantidad parecida y que no le sobren tantas.")
        },
        {
          "preg": "¿Qué planta tuvo <b>mayor venta</b> en los tres años?",
          "audio": A("r02_b", "¿Qué planta viene teniendo mayor venta con respecto a las demás durante los tres años?"),
          "opc": [
            "Caléndula",
            "Petunia",
            "Conejito",
            "Alelí"
          ],
          "conf": A("r02_bc", "La caléndula: cuatrocientas, cuatrocientas cincuenta y cuatrocientas cincuenta.")
        },
        {
          "preg": "¿Qué planta viene <b>bajando</b> en las ventas?",
          "audio": A("r02_c", "¿Qué planta viene decayendo en las ventas?"),
          "opc": [
            "Conejito",
            "Alelí",
            "Caléndula",
            "Petunia"
          ],
          "conf": A("r02_cc", "El conejito: doscientas cincuenta, doscientas y ciento cincuenta.")
        },
        {
          "preg": "¿Y cuál viene <b>subiendo</b>?",
          "audio": A("r02_d", "¿Y qué planta viene subiendo?"),
          "opc": [
            "Alelí",
            "Conejito",
            "Petunia",
            "Ninguna"
          ],
          "conf": A("r02_dc", "El alelí: cien, doscientas y trescientas. Es un dato importante para el pedido.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las que sobraron",
      "vis": {
        "t": "tabla",
        "id": "tv",
        "cab": [
          "Temporada",
          "Petunia",
          "Caléndula",
          "Conejito",
          "Alelí"
        ],
        "filas": [
          [
            "2023",
            "350",
            "400",
            "250",
            "100"
          ],
          [
            "2024",
            "250",
            "450",
            "200",
            "200"
          ],
          [
            "2025",
            "300",
            "450",
            "150",
            "300"
          ]
        ]
      },
      "deco": "grafico_ventas.jpg",
      "pista": A("pr_datos", "Leé los datos de la tabla que está en pantalla: cada columna es una planta y cada fila, una temporada."),
      "instr": A("r03_i", "Darío pedía quinientas plantas de cada variedad. Calculá cuántas sobraron en la temporada 2025."),
      "items": [
        {
          "preg": "En 2025 se vendieron 300 petunias. ¿Cuántas sobraron?",
          "audio": A("r03_a", "En 2025 se vendieron trescientas petunias. Si pidió quinientas, ¿cuántas sobraron?"),
          "destacar": [
            "tv_2_1"
          ],
          "opc": [
            "200",
            "300",
            "500",
            "800"
          ],
          "conf": A("r03_ac", "Quinientas menos trescientas: sobraron doscientas.")
        },
        {
          "preg": "En total, ¿cuántas plantas <b>sobraron</b> en 2025?",
          "audio": A("r03_b", "En total, sumando las cuatro variedades, ¿cuántas plantas le quedaron sin vender en 2025?"),
          "destacar": [
            "tv_2_1",
            "tv_2_2",
            "tv_2_3",
            "tv_2_4"
          ],
          "opc": [
            "800",
            "1.200",
            "2.000",
            "600"
          ],
          "conf": A("r03_bc", "Sobraron doscientas petunias, cincuenta caléndulas, trescientos cincuenta conejitos y doscientos alelíes: ochocientas plantas.")
        },
        {
          "preg": "Para 2026, si el conejito sigue bajando 50 por año, ¿cuántos podría pedir?",
          "audio": A("r03_c", "Para octubre de 2026, si las ventas de conejito siguen bajando de a cincuenta por año, ¿cuántos plantines podría pedir?"),
          "destacar": [
            "tv_0_3",
            "tv_1_3",
            "tv_2_3"
          ],
          "opc": [
            "Unos 100",
            "Unos 500",
            "Unos 300",
            "Unos 250"
          ],
          "conf": A("r03_cc", "Bajó de doscientas cincuenta a doscientas y a ciento cincuenta: podría pedir alrededor de cien.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "El promedio",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "dario_promedio.jpg",
            "h": 26
          },
          {
            "t": "caja",
            "titulo": "Conejito",
            "items": [
              {
                "t": "txt",
                "h": "250 + 200 + 150 = 600 · 600 : 3 = <b>200</b>"
              }
            ]
          }
        ]
      },
      "pasos": [
        {
          "audio": A("r04_1", "Darío le cuenta a Rocío que, para hacer el pedido, le sirve saber el promedio de ventas de los últimos años."),
          "chip": "📈 El promedio de ventas"
        },
        {
          "audio": A("r04_2", "Para calcularlo se suman las ventas de cada año y se divide por la cantidad de años, que son tres."),
          "chip": "Promedio = suma de las ventas : cantidad de años"
        },
        {
          "audio": A("r04_3", "Conejito: doscientas cincuenta más doscientas más ciento cincuenta son seiscientas; dividido tres, el promedio es doscientas."),
          "chip": "Conejito: 600 : 3 = 200"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Calculamos promedios",
      "vis": {
        "t": "tabla",
        "id": "tv",
        "cab": [
          "Temporada",
          "Petunia",
          "Caléndula",
          "Conejito",
          "Alelí"
        ],
        "filas": [
          [
            "2023",
            "350",
            "400",
            "250",
            "100"
          ],
          [
            "2024",
            "250",
            "450",
            "200",
            "200"
          ],
          [
            "2025",
            "300",
            "450",
            "150",
            "300"
          ]
        ]
      },
      "deco": "dario_promedio.jpg",
      "pista": A("r05_p", "Sumá las ventas de los tres años y dividí por tres."),
      "instr": A("r05_i", "Usá el procedimiento de Darío con las otras plantas."),
      "items": [
        {
          "preg": "¿Cuál es el promedio de ventas de la <b>petunia</b>?",
          "audio": A("r05_a", "¿Cuál es el promedio de ventas de los últimos tres años de la petunia?"),
          "destacar": [
            "tv_0_1",
            "tv_1_1",
            "tv_2_1"
          ],
          "opc": [
            "300",
            "900",
            "350",
            "250"
          ],
          "conf": A("r05_ac", "Trescientas cincuenta más doscientas cincuenta más trescientas son novecientas; dividido tres, trescientas.")
        },
        {
          "preg": "¿Y el de la <b>caléndula</b>?",
          "audio": A("r05_b", "¿Y el promedio de la caléndula?"),
          "destacar": [
            "tv_0_2",
            "tv_1_2",
            "tv_2_2"
          ],
          "opc": [
            "Unas 433",
            "1.300",
            "450",
            "400"
          ],
          "conf": A("r05_bc", "Mil trescientas dividido tres da cuatrocientas treinta y tres, aproximadamente.")
        },
        {
          "preg": "¿Y el del <b>alelí</b>?",
          "audio": A("r05_c", "¿Y el promedio del alelí?"),
          "destacar": [
            "tv_0_4",
            "tv_1_4",
            "tv_2_4"
          ],
          "opc": [
            "200",
            "600",
            "300",
            "100"
          ],
          "conf": A("r05_cc", "Cien más doscientas más trescientas son seiscientas; dividido tres, doscientas. ¡Aunque viene subiendo!")
        },
        {
          "preg": "¿Para qué le sirve el promedio a Darío?",
          "audio": A("r05_d", "¿Para qué le será útil ese dato a Darío?"),
          "opc": [
            "Para pedir una cantidad parecida a lo que se suele vender",
            "Para saber el precio",
            "Para saber qué planta es más linda",
            "No le sirve"
          ],
          "conf": A("r05_dc", "El promedio le da una idea de cuánto se vende normalmente, para pedir lo justo.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El quiosco de la escuela",
      "vis": {
        "t": "tabla",
        "id": "tk",
        "cab": [
          "Producto",
          "Ventas"
        ],
        "filas": [
          [
            "Alfajores",
            "125"
          ],
          [
            "Tortitas",
            "350"
          ],
          [
            "Ensalada de frutas",
            "80"
          ],
          [
            "Barras de cereal",
            "110"
          ]
        ]
      },
      "deco": "tres_chicos.jpg",
      "pista": A("r06_p", "Buscá en la tabla el producto que más se vendió."),
      "instr": A("r06_i", "En el quiosco de la escuela registraron las ventas del mes."),
      "items": [
        {
          "preg": "¿Qué producto conviene encargar más para el mes que viene?",
          "audio": A("r06_a", "¿Qué producto debería encargar más el quiosco para el mes que viene?"),
          "opc": [
            "Tortitas",
            "Alfajores",
            "Barras de cereal",
            "Ensalada de frutas"
          ],
          "conf": A("r06_ac", "Las tortitas: es el producto que más se vendió.")
        },
        {
          "preg": "El dato que <b>más se repite</b> o el más elegido, ¿cómo se llama?",
          "audio": A("r06_b", "El dato que más se repite, o el más elegido, ¿cómo se llama?"),
          "opc": [
            "Moda",
            "Promedio",
            "Total",
            "Rango"
          ],
          "conf": A("r06_bc", "Se llama moda. En el quiosco, la moda son las tortitas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los boletines",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "tabla",
            "id": "tb",
            "cab": [
              "",
              "Len",
              "Mat",
              "Soc",
              "Nat",
              "Ext",
              "TIC",
              "Mús",
              "Art",
              "EF"
            ],
            "filas": [
              [
                "Pablo",
                "6",
                "8",
                "9",
                "7",
                "?",
                "5",
                "8",
                "10",
                "5"
              ],
              [
                "Martina",
                "7",
                "6",
                "7",
                "8",
                "6",
                "6",
                "7",
                "?",
                "8"
              ]
            ]
          },
          {
            "t": "img",
            "src": "pablo_mama.jpg",
            "h": 18
          }
        ]
      },
      "pista": A("r07_p", "Si el promedio es 7 en 9 materias, la suma de todas las notas es 7 por 9, es decir, 63."),
      "instr": A("r07_i", "Pablo le dice a su mamá que tiene 7 de promedio, igual que Martina. A los dos les falta una nota en el boletín. Las notas son números naturales."),
      "items": [
        {
          "preg": "Si el promedio de las <b>9 materias</b> es 7, ¿cuánto suman todas las notas?",
          "audio": A("r07_a", "Si el promedio de las nueve materias es siete, ¿cuánto suman todas las notas?"),
          "opc": [
            "63",
            "7",
            "16",
            "70"
          ],
          "conf": A("r07_ac", "Siete por nueve: sesenta y tres.")
        },
        {
          "preg": "¿Qué nota le falta a <b>Pablo</b>?",
          "audio": A("r07_b", "Las notas de Pablo que se ven suman cincuenta y ocho. ¿Qué nota le falta?"),
          "destacar": [
            "tb_0_5"
          ],
          "opc": [
            "5",
            "7",
            "9",
            "4"
          ],
          "escribir": [
            {
              "id": "tb_0_5",
              "h": "5"
            }
          ],
          "conf": A("r07_bc", "Sus notas suman cincuenta y ocho; para llegar a sesenta y tres le falta un cinco.")
        },
        {
          "preg": "¿Qué nota le falta a <b>Martina</b>?",
          "audio": A("r07_c", "Las notas de Martina que se ven suman cincuenta y cinco. ¿Qué nota le falta?"),
          "destacar": [
            "tb_1_8"
          ],
          "opc": [
            "8",
            "7",
            "6",
            "9"
          ],
          "escribir": [
            {
              "id": "tb_1_8",
              "h": "8"
            }
          ],
          "conf": A("r07_cc", "Sus notas suman cincuenta y cinco; para llegar a sesenta y tres le falta un ocho.")
        },
        {
          "preg": "¿Cuál es la <b>moda</b> del boletín de Pablo?",
          "audio": A("r07_d", "¿Cuál es la moda del boletín de Pablo?"),
          "opc": [
            "5: aparece tres veces",
            "7: es su promedio",
            "10: es la más alta",
            "8: aparece dos veces"
          ],
          "conf": A("r07_dc", "La moda es cinco, la nota que más se repite. Pablo tiene siete de promedio, ¡pero tiene tres cincos!")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Verdadero o falso?",
      "vf": true,
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "tabla",
            "id": "tb",
            "cab": [
              "",
              "Len",
              "Mat",
              "Soc",
              "Nat",
              "Ext",
              "TIC",
              "Mús",
              "Art",
              "EF"
            ],
            "filas": [
              [
                "Pablo",
                "6",
                "8",
                "9",
                "7",
                "?",
                "5",
                "8",
                "10",
                "5"
              ],
              [
                "Martina",
                "7",
                "6",
                "7",
                "8",
                "6",
                "6",
                "7",
                "?",
                "8"
              ]
            ]
          },
          {
            "t": "img",
            "src": "pablo_mama2.jpg",
            "h": 16
          }
        ]
      },
      "pista": A("r08_p", "El promedio reparte por igual; la moda es el dato que más se repite."),
      "instr": A("r08_i", "La mamá de Pablo le dice: ¡entonces aprobaste todas las materias! Pensá si es cierto."),
      "items": [
        {
          "preg": "«Si Pablo tiene <b>7 de promedio</b>, aprobó todas las materias.»",
          "audio": A("r08_a", "Si Pablo tiene siete de promedio, aprobó todas las materias."),
          "v": false,
          "conf": A("r08_ac", "Falso. Tiene siete de promedio, pero también tiene notas bajas: tres cincos. El promedio no muestra cada nota.")
        },
        {
          "preg": "«Pablo y Martina tienen el mismo promedio.»",
          "audio": A("r08_b", "Pablo y Martina tienen el mismo promedio."),
          "v": true,
          "conf": A("r08_bc", "Verdadero: las notas de los dos suman sesenta y tres, y los dos tienen siete de promedio.")
        },
        {
          "preg": "«En el boletín de Martina, el 6, el 7 y el 8 aparecen la misma cantidad de veces.»",
          "audio": A("r08_c", "En el boletín de Martina, el seis, el siete y el ocho aparecen la misma cantidad de veces."),
          "v": true,
          "conf": A("r08_cc", "Verdadero: cada uno aparece tres veces, así que no hay una sola moda.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del ranking",
      "n": 10,
      "img": "grafico_ventas.jpg",
      "instr": A("r09_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "GRAFICO",
          "audio": A("r09_1", "Gráfico: muestra los datos con barras.")
        },
        {
          "w": "TABLA",
          "audio": A("r09_2", "Tabla: ordena los datos en filas y columnas.")
        },
        {
          "w": "PROMEDIO",
          "audio": A("r09_3", "Promedio: la suma de los datos dividida por la cantidad.")
        },
        {
          "w": "MODA",
          "audio": A("r09_4", "Moda: el dato que más se repite.")
        },
        {
          "w": "VENTAS",
          "audio": A("r09_5", "Ventas: lo que se vendió en cada temporada.")
        },
        {
          "w": "PEDIDO",
          "audio": A("r09_6", "Pedido: lo que encarga Darío.")
        },
        {
          "w": "DATOS",
          "audio": A("r09_7", "Datos: la información que usamos para decidir.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre_vivero_ranking_plantas", "¡Muy bien! Terminaste El ranking de las plantas. Ya sabés usar gráficos, el promedio y la moda para tomar buenas decisiones. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
