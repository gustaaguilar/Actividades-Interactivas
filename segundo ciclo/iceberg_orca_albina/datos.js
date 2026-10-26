/* datos.js — "Iceberg, la orca albina" · Segunda secuencia · Texto expositivo · 5.° grado · Lengua · QueSepanTodos.com
   Elaboración propia basada en «Mochileritos de la comunicación 5» (DGE Mendoza, PEAMM), págs. 17 a 27.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Iceberg, la orca albina",
    "corto": "Iceberg, la orca albina",
    "emoji": "🐋",
    "parte": "Segunda secuencia · Texto expositivo",
    "subtitulo": "Leemos un texto expositivo: ideas principales y secundarias, vocabulario, diccionario, sinónimos y antónimos",
    "grado": "5.° grado · Lengua",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "orca_albina.jpg",
    "imgCierre": "que_mas_saber.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el texto «Iceberg, la primera orca albina salvaje fotografiada en libertad» (págs. 17 a 27) del cuadernillo «Mochileritos de la comunicación 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "¿Qué es un iceberg?",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "iceberg.jpg",
            "h": 34
          },
          {
            "t": "txt",
            "h": "🧊 Iceberg o <b>témpano</b>: un gran bloque de <b>hielo</b> que flota en los mares fríos"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("i01_1", "Antes de leer, pensemos: ¿qué es un iceberg? Es un gran bloque de hielo que flota en el mar. También se lo llama témpano."),
          "chip": "🧊 Iceberg = témpano"
        },
        {
          "audio": A("i01_2", "Está formado por agua dulce congelada que se desprende de los glaciares. Lo encontramos en los mares fríos, cerca de los polos."),
          "chip": "❄️ Agua dulce congelada · mares polares"
        },
        {
          "audio": A("i01_3", "Mirá bien la imagen: la parte que se ve es solo la punta. ¡La mayor parte del iceberg está escondida bajo el agua!"),
          "chip": "👀 La mayor parte está bajo el agua"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Pensamos antes de leer",
      "vis": {
        "t": "img",
        "src": "iceberg.jpg",
        "h": 34
      },
      "pista": A("i02_p", "Recordá lo que escuchaste y mirá la imagen con atención."),
      "instr": A("i02_i", "Respondé sobre el iceberg."),
      "items": [
        {
          "preg": "¿Con qué otro nombre se conoce al iceberg?",
          "audio": A("i02_a", "¿Con qué otro nombre se conoce al iceberg?"),
          "opc": [
            "Témpano",
            "Glaciar",
            "Volcán",
            "Arrecife"
          ],
          "conf": A("i02_ac", "Témpano. El glaciar es el río de hielo del que se desprende.")
        },
        {
          "preg": "¿De qué está compuesto?",
          "audio": A("i02_b", "¿De qué está compuesto un iceberg?"),
          "opc": [
            "De agua dulce congelada",
            "De sal",
            "De roca blanca",
            "De nieve artificial"
          ],
          "conf": A("i02_bc", "De agua dulce congelada.")
        },
        {
          "preg": "¿Qué <b>nueva información</b> aporta la imagen?",
          "audio": A("i02_c", "¿Qué nueva información aporta la imagen sobre el iceberg?"),
          "opc": [
            "La mayor parte está oculta bajo el agua",
            "Es más chico de lo que parece",
            "Flota en ríos cálidos",
            "Es de color negro"
          ],
          "conf": A("i02_cc", "La imagen muestra que lo que vemos es solo la punta: la mayor parte está bajo el agua.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Antes de leer: la orca",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "orca_albina.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "h": "Título: <b>«Iceberg», la primera orca albina salvaje fotografiada en libertad</b>"
          }
        ]
      },
      "pista": A("i03_p", "Fijate en el título y en la foto de la orca."),
      "instr": A("i03_i", "Mirá la foto y leé el título del texto que vamos a leer."),
      "items": [
        {
          "preg": "¿Qué es una orca?",
          "audio": A("i03_a", "¿Qué sabemos sobre las orcas? ¿Qué es una orca?"),
          "opc": [
            "Un mamífero marino, pariente de los delfines",
            "Un pez de agua dulce",
            "Un tipo de tiburón",
            "Un ave marina"
          ],
          "conf": A("i03_ac", "La orca es un mamífero marino: un cetáceo de la familia de los delfines.")
        },
        {
          "preg": "¿Qué creés que significa <b>albino</b>?",
          "audio": A("i03_b", "¿Qué creés que significa la palabra albino?"),
          "opc": [
            "Que no tiene el color habitual: es blanco",
            "Que es muy grande",
            "Que vive en el hielo",
            "Que es muy joven"
          ],
          "conf": A("i03_bc", "Albino es el ser vivo que nace sin el pigmento que da el color habitual: por eso esta orca es blanca.")
        },
        {
          "preg": "¿Qué tipo de texto será?",
          "audio": A("i03_c", "¿Será un texto expositivo, un cuento u otro tipo de texto?"),
          "opc": [
            "Expositivo: da información real",
            "Un cuento con personajes inventados",
            "Una poesía",
            "Una receta"
          ],
          "conf": A("i03_cc", "Es un texto expositivo: informa sobre un hecho real. Al leerlo, comprobalo.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (1)",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "orca_albina.jpg",
            "h": 14
          },
          {
            "t": "txt",
            "h": "<h4>«Iceberg», la primera orca albina salvaje fotografiada en libertad</h4><p id=\"ic1\"><span class=\"np\">1</span>Un equipo de científicos rusos ha visto, por primera vez, una orca adulta completamente blanca, que podría considerarse un ejemplar albino. Además, han podido grabar al animal en video y tomar varias fotografías para analizarlas.</p><p id=\"ic2\"><span class=\"np\">2</span>El cetáceo ha sido bautizado como <i>Iceberg</i>, por la gran similitud de su color con los bloques de hielo que llevan ese nombre. Es un macho. Su aleta dorsal mide alrededor de dos metros de altura, por esto calculan que tiene, al menos, 16 años.</p><p id=\"ic3\"><span class=\"np\">3</span>Técnicamente, la orca es un miembro de la familia de los delfines y se la puede encontrar en los océanos de todo el mundo, ya que la temperatura del agua rara vez limita su hábitat.</p>",
            "cls": "lect"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("i04_0", "Leé con atención mientras escuchás. Cada párrafo tiene su número."),
          "chip": "📖 Leemos y numeramos los párrafos"
        },
        {
          "audio": A("i04_1", "Un equipo de científicos rusos ha visto, por primera vez, una orca adulta completamente blanca, que podría considerarse un ejemplar albino. Además, han podido grabar al animal en video y tomar varias fotografías para analizarlas."),
          "destacar": [
            "ic1"
          ],
          "chip": "Párrafo 1"
        },
        {
          "audio": A("i04_2", "El cetáceo ha sido bautizado como Iceberg, por la gran similitud de su color con los bloques de hielo que llevan ese nombre. Es un macho. Su aleta dorsal mide alrededor de dos metros de altura, por esto calculan que tiene, al menos, 16 años."),
          "destacar": [
            "ic2"
          ],
          "chip": "Párrafo 2"
        },
        {
          "audio": A("i04_3", "Técnicamente, la orca es un miembro de la familia de los delfines y se la puede encontrar en los océanos de todo el mundo, ya que la temperatura del agua rara vez limita su hábitat."),
          "destacar": [
            "ic3"
          ],
          "chip": "Párrafo 3"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (2)",
      "vis": {
        "t": "txt",
        "h": "<div class=\"lsub\">Vida en comunidad</div><p id=\"ic4\"><span class=\"np\">4</span>Los investigadores descubrieron que <i>Iceberg</i> vive en una familia formada por 12 ejemplares.</p><p id=\"ic5\"><span class=\"np\">5</span>Normalmente, las orcas que nacen con este color tienen las defensas bajas y no pasan de ser bebés. Su color es su peor enemigo: en el mar, el que no se camufla no come. Por ello no tiene condiciones para ser un cazador. La realidad es que él sigue vivo porque su familia lo ama tanto que cazan por él y lo cuidan como si fuera un cachorro eterno. Es un sobreviviente que depende totalmente de la lealtad de su manada.</p><p id=\"ic6\"><span class=\"np\">6</span>Se desconoce cuál es el motivo de su inusual pigmentación. Por ello, en un primer momento se pensó en realizar estudios. Sin embargo, los científicos se resistieron a hacerlo para cuidar al animal.</p><p id=\"ic7\"><span class=\"np\">7</span>En muchos sentidos, <i>Iceberg</i> es un símbolo de todo lo que puede haber en el océano esperando a ser descubierto. El reto consiste en mantener la salud de los mares para que estos hallazgos sigan siendo posibles.</p><div class=\"lfte\">Texto adaptado · Fuente: RTVE</div>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("i05_4", "Vida en comunidad. Los investigadores descubrieron que Iceberg vive en una familia formada por 12 ejemplares."),
          "destacar": [
            "ic4"
          ],
          "chip": "Párrafo 4"
        },
        {
          "audio": A("i05_5", "Normalmente, las orcas que nacen con este color tienen las defensas bajas y no pasan de ser bebés. Su color es su peor enemigo: en el mar, el que no se camufla no come. Por ello no tiene condiciones para ser un cazador. La realidad es que él sigue vivo porque su familia lo ama tanto que cazan por él y lo cuidan como si fuera un cachorro eterno. Es un sobreviviente que depende totalmente de la lealtad de su manada."),
          "destacar": [
            "ic5"
          ],
          "chip": "Párrafo 5"
        },
        {
          "audio": A("i05_6", "Se desconoce cuál es el motivo de su inusual pigmentación. Por ello, en un primer momento se pensó en realizar estudios. Sin embargo, los científicos se resistieron a hacerlo para cuidar al animal."),
          "destacar": [
            "ic6"
          ],
          "chip": "Párrafo 6"
        },
        {
          "audio": A("i05_7", "En muchos sentidos, Iceberg es un símbolo de todo lo que puede haber en el océano esperando a ser descubierto. El reto consiste en mantener la salud de los mares para que estos hallazgos sigan siendo posibles."),
          "destacar": [
            "ic7"
          ],
          "chip": "Párrafo 7"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Comprendimos el texto?",
      "vis": {
        "t": "img",
        "src": "orca_albina.jpg",
        "h": 30
      },
      "pista": A("m_pi_txt", "Volvé a leer el texto: la respuesta está en alguno de sus párrafos."),
      "instr": A("i06_i", "Respondé según lo que leíste."),
      "items": [
        {
          "preg": "¿Por qué la llamaron <b>Iceberg</b>?",
          "audio": A("i06_a", "¿Por qué la llamaron Iceberg?"),
          "opc": [
            "Porque su color es parecido al de los bloques de hielo",
            "Porque vive en un iceberg",
            "Porque la encontraron en el Polo Sur",
            "Porque es muy fría"
          ],
          "conf": A("i06_ac", "Por la gran similitud de su color con los bloques de hielo.")
        },
        {
          "preg": "¿Cuántos años tiene, al menos? ¿Cómo lo calculan?",
          "audio": A("i06_b", "¿Cuántos años tiene, al menos, y cómo lo calculan?"),
          "opc": [
            "16 años, por el tamaño de su aleta dorsal",
            "2 años, por su color",
            "12 años, por su familia",
            "16 años, por sus dientes"
          ],
          "conf": A("i06_bc", "Su aleta dorsal mide unos dos metros: por eso calculan que tiene al menos 16 años.")
        },
        {
          "preg": "¿Cuántos ejemplares forman su familia?",
          "audio": A("i06_c", "¿Cuántos ejemplares forman su familia?"),
          "opc": [
            "12",
            "16",
            "2",
            "25"
          ],
          "conf": A("i06_cc", "Iceberg vive en una familia de 12 ejemplares.")
        },
        {
          "preg": "¿Por qué sigue vivo, si su color no le permite cazar?",
          "audio": A("i06_d", "¿Por qué sigue vivo, si su color no le permite cazar?"),
          "opc": [
            "Porque su familia caza por él y lo cuida",
            "Porque los científicos le dan comida",
            "Porque come algas",
            "Porque se camufla en el hielo"
          ],
          "conf": A("i06_dc", "Su familia caza por él y lo cuida como a un cachorro eterno.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Ideas principales y secundarias",
      "vis": {
        "t": "img",
        "src": "ideas_principales.jpg",
        "h": 46
      },
      "pasos": [
        {
          "audio": A("i07_1", "Las ideas principales contienen la información esencial de un texto. Sin ellas, el texto perdería sentido. Al menos hay una por párrafo."),
          "chip": "⭐ Idea principal: lo esencial"
        },
        {
          "audio": A("i07_2", "Las ideas secundarias son detalles que amplían la información de la idea principal."),
          "chip": "➕ Idea secundaria: los detalles"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿En qué párrafo está?",
      "vis": {
        "t": "tabla",
        "id": "qa",
        "cab": [
          "Idea principal",
          "Párrafo"
        ],
        "filas": [
          [
            "Los científicos le asignan el nombre al animal.",
            "?"
          ],
          [
            "Las orcas se adaptan a las temperaturas de cualquier océano.",
            "?"
          ],
          [
            "La orca vive en familia.",
            "?"
          ],
          [
            "La orca albina sobrevive gracias al cuidado de la manada.",
            "?"
          ]
        ]
      },
      "deco": "ideas_principales.jpg",
      "pista": A("m_pi_ip", "La idea principal es lo más importante del párrafo. Las ideas secundarias agregan detalles."),
      "instr": A("i08_i", "Completá el cuadro: buscá en qué párrafo está cada idea principal."),
      "items": [
        {
          "preg": "«Los científicos le asignan el nombre al animal.»",
          "audio": A("i08_a", "Los científicos le asignan el nombre al animal. ¿En qué párrafo está?"),
          "destacar": [
            "qa_f0"
          ],
          "opc": [
            "Párrafo 2",
            "Párrafo 1",
            "Párrafo 4",
            "Párrafo 7"
          ],
          "escribir": [
            {
              "id": "qa_0_1",
              "h": "2"
            }
          ],
          "conf": A("i08_ac", "Párrafo 2: El cetáceo ha sido bautizado como Iceberg.")
        },
        {
          "preg": "«Las orcas se adaptan a las temperaturas de cualquier océano.»",
          "audio": A("i08_b", "Las orcas se adaptan a las temperaturas de cualquier océano."),
          "destacar": [
            "qa_f1"
          ],
          "opc": [
            "Párrafo 3",
            "Párrafo 2",
            "Párrafo 5",
            "Párrafo 6"
          ],
          "escribir": [
            {
              "id": "qa_1_1",
              "h": "3"
            }
          ],
          "conf": A("i08_bc", "Párrafo 3: la temperatura del agua rara vez limita su hábitat.")
        },
        {
          "preg": "«La orca vive en familia.»",
          "audio": A("i08_c", "La orca vive en familia."),
          "destacar": [
            "qa_f2"
          ],
          "opc": [
            "Párrafo 4",
            "Párrafo 3",
            "Párrafo 1",
            "Párrafo 7"
          ],
          "escribir": [
            {
              "id": "qa_2_1",
              "h": "4"
            }
          ],
          "conf": A("i08_cc", "Párrafo 4: vive en una familia de 12 ejemplares.")
        },
        {
          "preg": "«La orca albina sobrevive gracias al cuidado de la manada.»",
          "audio": A("i08_d", "La orca albina sobrevive gracias al cuidado de la manada."),
          "destacar": [
            "qa_f3"
          ],
          "opc": [
            "Párrafo 5",
            "Párrafo 4",
            "Párrafo 6",
            "Párrafo 2"
          ],
          "escribir": [
            {
              "id": "qa_3_1",
              "h": "5"
            }
          ],
          "conf": A("i08_dc", "Párrafo 5: su familia caza por él y lo cuida.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Completamos el cuadro",
      "vis": {
        "t": "tabla",
        "id": "qb",
        "cab": [
          "Idea principal",
          "Párrafo"
        ],
        "filas": [
          [
            "?",
            "1"
          ],
          [
            "?",
            "6"
          ],
          [
            "El cuidado de los mares es importante para proteger la fauna marina.",
            "?"
          ]
        ]
      },
      "deco": "ideas_principales.jpg",
      "pista": A("m_pi_ip", "La idea principal es lo más importante del párrafo. Las ideas secundarias agregan detalles."),
      "instr": A("i09_i", "Ahora completá las ideas principales que faltan."),
      "items": [
        {
          "preg": "¿Cuál es la idea principal del <b>párrafo 1</b>?",
          "audio": A("i09_a", "¿Cuál es la idea principal del párrafo 1?"),
          "destacar": [
            "qb_f0"
          ],
          "opc": [
            "Científicos ven por primera vez una orca albina",
            "Las orcas viven en familia",
            "Las orcas son delfines",
            "Hay que cuidar los mares"
          ],
          "escribir": [
            {
              "id": "qb_0_0",
              "h": "Científicos ven por primera vez una orca albina."
            }
          ],
          "conf": A("i09_ac", "Un equipo de científicos vio por primera vez una orca adulta completamente blanca.")
        },
        {
          "preg": "¿Cuál es la idea principal del <b>párrafo 6</b>?",
          "audio": A("i09_b", "¿Cuál es la idea principal del párrafo 6?"),
          "destacar": [
            "qb_f1"
          ],
          "opc": [
            "Los científicos no la estudian, para cuidarla",
            "La orca tiene 16 años",
            "La orca come algas",
            "La orca vive sola"
          ],
          "escribir": [
            {
              "id": "qb_1_0",
              "h": "Los científicos no la estudian, para cuidarla."
            }
          ],
          "conf": A("i09_bc", "No se sabe por qué es blanca, pero los científicos decidieron no estudiarla para cuidarla.")
        },
        {
          "preg": "«El cuidado de los mares es importante para proteger la fauna marina.» ¿En qué párrafo está?",
          "audio": A("i09_c", "El cuidado de los mares es importante para proteger la fauna marina. ¿En qué párrafo está?"),
          "destacar": [
            "qb_f2"
          ],
          "opc": [
            "Párrafo 7",
            "Párrafo 1",
            "Párrafo 3",
            "Párrafo 5"
          ],
          "escribir": [
            {
              "id": "qb_2_1",
              "h": "7"
            }
          ],
          "conf": A("i09_cc", "Párrafo 7: el reto es mantener la salud de los mares.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las ideas secundarias",
      "vis": {
        "t": "txt",
        "h": "<b>Ejemplo (párrafo 2)</b><br><b>IP:</b> Los científicos le asignan un nombre al animal.<br><b>IS:</b> Es un macho. · <b>IS:</b> Tiene al menos 16 años.<br><br>¡Ahora vos! <b>IP:</b> La orca albina sobrevive gracias al cuidado de la manada."
      },
      "deco": "ideas_principales.jpg",
      "pista": A("m_pi_ip", "La idea principal es lo más importante del párrafo. Las ideas secundarias agregan detalles."),
      "instr": A("i10_i", "Mirá el ejemplo: a la idea principal del párrafo 2 le corresponden dos ideas secundarias. ¡Ahora te toca a vos!"),
      "items": [
        {
          "preg": "¿Cuál es una idea secundaria de esta idea principal?",
          "audio": A("i10_a", "Idea principal: la orca albina sobrevive gracias al cuidado de la manada. ¿Cuál es una idea secundaria?"),
          "opc": [
            "Su familia caza por él",
            "Su aleta mide dos metros",
            "Es miembro de la familia de los delfines",
            "Lo filmaron científicos rusos"
          ],
          "conf": A("i10_ac", "Su familia caza por él: es un detalle del mismo párrafo.")
        },
        {
          "preg": "¿Y otra idea secundaria del <b>mismo párrafo</b>?",
          "audio": A("i10_b", "¿Y otra idea secundaria del mismo párrafo?"),
          "opc": [
            "Lo cuidan como si fuera un cachorro eterno",
            "Vive en todos los océanos",
            "Se desconoce el motivo de su color",
            "Es un símbolo del océano"
          ],
          "conf": A("i10_bc", "Lo cuidan como si fuera un cachorro eterno.")
        },
        {
          "preg": "¿Por qué su color es su <b>peor enemigo</b>?",
          "audio": A("i10_c", "Según el texto, ¿por qué su color es su peor enemigo?"),
          "opc": [
            "Porque no se camufla y no puede cazar",
            "Porque se quema con el sol",
            "Porque las otras orcas lo rechazan",
            "Porque los científicos lo persiguen"
          ],
          "conf": A("i10_cc", "En el mar, el que no se camufla no come.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Vocabulario y diccionario",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">hábitat</div>"
      },
      "deco": "definir.jpg",
      "pista": A("i11_p", "Definir es explicar qué es algo y sus características principales."),
      "instr": A("i11_i", "Definir es explicar qué es algo y sus características principales. Pensá el significado de estas palabras del texto."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">hábitat</div>"
          },
          "preg": "¿Qué significa <b>hábitat</b>?",
          "audio": A("i11_a", "¿Qué significa hábitat?"),
          "opc": [
            "Lugar con las condiciones adecuadas para que viva un ser vivo",
            "Costumbre de un animal",
            "Alimento de la orca",
            "Una casa de madera"
          ],
          "conf": A("i11_ac", "Hábitat es el lugar donde un ser vivo encuentra lo que necesita para vivir.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">camuflar</div>"
          },
          "preg": "¿Qué significa <b>camuflar</b>?",
          "audio": A("i11_b", "¿Qué significa camuflar?"),
          "opc": [
            "Disimular o esconder algo para que no se note",
            "Cazar en grupo",
            "Nadar muy rápido",
            "Cambiar de casa"
          ],
          "conf": A("i11_bc", "Camuflar es disimular algo para que no se distinga de lo que lo rodea.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">manada</div>"
          },
          "preg": "¿Qué significa <b>manada</b>?",
          "audio": A("i11_c", "¿Qué significa manada?"),
          "opc": [
            "Grupo de animales de la misma especie que andan juntos",
            "Un animal solitario",
            "El lugar donde duermen los peces",
            "Una red de pesca"
          ],
          "conf": A("i11_cc", "Manada es un grupo de animales de la misma especie que andan juntos.")
        },
        {
          "vis": {
            "t": "col",
            "items": [
              {
                "t": "img",
                "src": "diccionario.jpg",
                "h": 26
              },
              {
                "t": "txt",
                "h": "<div class=\"grande\">albino · camuflar · hábitat · manada</div>"
              }
            ]
          },
          "preg": "En el diccionario, ¿cuál de estas palabras aparece <b>primero</b>?",
          "audio": A("i11_d", "En el diccionario las palabras están en orden alfabético. ¿Cuál de estas aparece primero?"),
          "opc": [
            "albino",
            "camuflar",
            "hábitat",
            "manada"
          ],
          "conf": A("i11_dc", "Albino, porque empieza con a. Después vienen camuflar, hábitat y manada.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Sinónimos y antónimos",
      "vis": {
        "t": "tabla",
        "id": "sa",
        "cab": [
          "Palabra",
          "Sinónimo",
          "Antónimo"
        ],
        "filas": [
          [
            "jóvenes",
            "?",
            "?"
          ],
          [
            "enemigo",
            "?",
            "?"
          ],
          [
            "cuidar",
            "?",
            "?"
          ]
        ]
      },
      "deco": "sinonimos.jpg",
      "pista": A("i12_p", "Sinónimos: significado igual o parecido. Antónimos: significado opuesto."),
      "instr": A("i12_i", "Los sinónimos tienen significado igual o muy parecido. Los antónimos tienen significado opuesto. Completá el cuadro."),
      "items": [
        {
          "preg": "<b>jóvenes</b>: ¿sinónimo y antónimo?",
          "audio": A("i12_a", "Jóvenes: ¿cuál es un sinónimo y cuál un antónimo?"),
          "destacar": [
            "sa_f0"
          ],
          "opc": [
            "muchachos · adultos",
            "adultos · muchachos",
            "bebés · niños",
            "viejos · ancianos"
          ],
          "escribir": [
            {
              "id": "sa_0_1",
              "h": "muchachos"
            },
            {
              "id": "sa_0_2",
              "h": "adultos"
            }
          ],
          "conf": A("i12_ac", "Sinónimo: muchachos. Antónimo: adultos o viejos.")
        },
        {
          "preg": "<b>enemigo</b>: ¿sinónimo y antónimo?",
          "audio": A("i12_b", "Enemigo: ¿sinónimo y antónimo?"),
          "destacar": [
            "sa_f1"
          ],
          "opc": [
            "adversario · amigo",
            "amigo · adversario",
            "compañero · aliado",
            "rival · contrario"
          ],
          "escribir": [
            {
              "id": "sa_1_1",
              "h": "adversario"
            },
            {
              "id": "sa_1_2",
              "h": "amigo"
            }
          ],
          "conf": A("i12_bc", "Sinónimo: adversario o rival. Antónimo: amigo.")
        },
        {
          "preg": "<b>cuidar</b>: ¿sinónimo y antónimo?",
          "audio": A("i12_c", "Cuidar: ¿sinónimo y antónimo?"),
          "destacar": [
            "sa_f2"
          ],
          "opc": [
            "proteger · descuidar",
            "descuidar · proteger",
            "atacar · dañar",
            "mirar · ver"
          ],
          "escribir": [
            {
              "id": "sa_2_1",
              "h": "proteger"
            },
            {
              "id": "sa_2_2",
              "h": "descuidar"
            }
          ],
          "conf": A("i12_cc", "Sinónimo: proteger. Antónimo: descuidar o abandonar.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "Las orcas que nacen con este color muchas veces no llegan a ser <b>jóvenes</b>. (antónimo)"
          },
          "preg": "¿Cómo queda la oración con un <b>antónimo</b>?",
          "audio": A("i12_d", "Las orcas que nacen con este color muchas veces no llegan a ser jóvenes. ¿Cómo queda con un antónimo?"),
          "opc": [
            "…muchas veces no llegan a ser adultas.",
            "…muchas veces no llegan a ser bebés.",
            "…muchas veces no llegan a ser muchachas.",
            "…muchas veces no llegan a ser jóvenes."
          ],
          "conf": A("i12_dc", "Las orcas que nacen con este color muchas veces no llegan a ser adultas.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "Los sinónimos sirven para…"
          },
          "preg": "¿Para qué sirven los sinónimos cuando escribimos?",
          "audio": A("i12_e", "¿Para qué son útiles los sinónimos cuando escribimos un texto?"),
          "opc": [
            "Para no repetir siempre las mismas palabras",
            "Para cambiar el significado",
            "Para alargar el texto",
            "Para nada"
          ],
          "conf": A("i12_ec", "Para no repetir palabras: así el texto se lee mejor.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Palabras del mar",
      "vis": {
        "t": "img",
        "src": "campo_mar.jpg",
        "h": 34
      },
      "pista": A("i13_p", "Buscá palabras del texto que tengan relación con el mar."),
      "instr": A("i13_i", "Hay palabras que comparten características comunes y se relacionan con una palabra central. Buscá las que se relacionan con mar."),
      "items": [
        {
          "preg": "¿Cuál de estas palabras del texto se relaciona con <b>mar</b>?",
          "audio": A("i13_a", "¿Cuál de estas palabras del texto se relaciona con mar?"),
          "opc": [
            "océano",
            "científicos",
            "video",
            "años"
          ],
          "conf": A("i13_ac", "Océano: una gran extensión de agua salada.")
        },
        {
          "preg": "¿Y cuál de estas?",
          "audio": A("i13_b", "¿Y cuál de estas?"),
          "opc": [
            "cetáceo",
            "fotografías",
            "macho",
            "estudios"
          ],
          "conf": A("i13_bc", "Cetáceo: mamífero marino, como la orca.")
        },
        {
          "preg": "¿Qué grupo de palabras se relaciona <b>todo</b> con mar?",
          "audio": A("i13_c", "¿Qué grupo de palabras se relaciona todo con mar?"),
          "opc": [
            "orca, delfines, aleta, océano",
            "video, fotos, rusos, años",
            "familia, bebés, cachorro, amor",
            "color, blanco, hielo, nombre"
          ],
          "conf": A("i13_cc", "Orca, delfines, aleta y océano: todas se relacionan con el mar.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de Iceberg",
      "n": 11,
      "img": "orca_albina.jpg",
      "instr": A("i14_i", "Buscá en la sopa de letras siete palabras del texto. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "ORCA",
          "audio": A("i14_1", "Orca: mamífero marino de la familia de los delfines.")
        },
        {
          "w": "ICEBERG",
          "audio": A("i14_2", "Iceberg: bloque de hielo, y el nombre de la orca.")
        },
        {
          "w": "ALBINO",
          "audio": A("i14_3", "Albino: sin el color habitual.")
        },
        {
          "w": "MANADA",
          "audio": A("i14_4", "Manada: la familia que lo cuida.")
        },
        {
          "w": "HABITAT",
          "audio": A("i14_5", "Hábitat: el lugar donde vive.")
        },
        {
          "w": "CETACEO",
          "audio": A("i14_6", "Cetáceo: mamífero que vive en el mar.")
        },
        {
          "w": "ALETA",
          "audio": A("i14_7", "Aleta: la de Iceberg mide dos metros.")
        }
      ],
      "fin": A("i14_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre1", "¡Muy bien! Terminaste «Iceberg, la orca albina». Mirá tus resultados y envialos a tu docente. En el próximo paquete viajamos al fondo del mar con el Conicet.")
    }
  ]
};
