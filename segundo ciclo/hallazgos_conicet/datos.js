/* datos.js — "Hallazgos del Conicet" · Tercera secuencia · Texto expositivo · 5.° grado · Lengua · QueSepanTodos.com
   Elaboración propia basada en «Mochileritos de la comunicación 5» (DGE Mendoza, PEAMM), págs. 28 a 35.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Hallazgos del Conicet",
    "corto": "Hallazgos del Conicet",
    "emoji": "🌟",
    "parte": "Tercera secuencia · Texto expositivo",
    "subtitulo": "Una expedición al fondo del Mar Argentino: comprensión, vocabulario, acentuación, diccionario y una entrevista",
    "grado": "5.° grado · Lengua",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "estrella_conicet.jpg",
    "imgCierre": "entrevista.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el texto «Hallazgos del Conicet en el fondo marino: una nueva estrella y otras especies únicas» (págs. 28 a 35) del cuadernillo «Mochileritos de la comunicación 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Seguimos en camino",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "guia_camino.jpg",
            "h": 34
          },
          {
            "t": "img",
            "src": "estrella_conicet.jpg",
            "h": 30
          }
        ]
      },
      "pasos": [
        {
          "audio": A("c01_1", "¡Muy bien por lo hecho hasta aquí! Seguimos en camino hacia el tercer texto."),
          "chip": "🎒 Tercera secuencia"
        },
        {
          "audio": A("c01_2", "Vamos a viajar al fondo del mar con científicos argentinos del Conicet, que descubrieron animales sorprendentes."),
          "chip": "🌊 Al fondo del Mar Argentino"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Quién vive en el fondo del mar?",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "animales_fondo.jpg",
            "h": 20
          },
          {
            "t": "txt",
            "h": "Estrella de mar · Erizo de mar · Cangrejo · Foca · Pulpo · Pepino de mar"
          }
        ]
      },
      "pista": A("c02_p", "Pensá cuál de estos animales necesita salir a respirar aire y vive en la costa."),
      "instr": A("c02_i", "Mirá esta lista de animales."),
      "items": [
        {
          "preg": "¿Qué animal de la lista <b>no</b> podría vivir en el fondo del mar?",
          "audio": A("c02_a", "¿Qué animal de esta lista no podría vivir en el fondo del mar?"),
          "opc": [
            "La foca",
            "La estrella de mar",
            "El pulpo",
            "El pepino de mar"
          ],
          "conf": A("c02_ac", "La foca: es un mamífero que respira aire y pasa parte de su vida en la costa.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">CONICET</div>"
          },
          "preg": "¿A qué se dedica el <b>Conicet</b>?",
          "audio": A("c02_b", "¿Escuchaste hablar del Conicet? ¿A qué se dedica?"),
          "opc": [
            "A la investigación científica en la Argentina",
            "A vender pescado",
            "A organizar viajes de turismo",
            "A fabricar barcos"
          ],
          "conf": A("c02_bc", "El Conicet es el Consejo Nacional de Investigaciones Científicas y Técnicas: allí trabajan científicos argentinos.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Leemos el título",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">«Hallazgos del Conicet en el fondo marino: una nueva estrella y otras especies únicas»</div>"
      },
      "deco": "estrella_conicet.jpg",
      "pista": A("c03_p", "Leé el título con atención: da muchas pistas."),
      "instr": A("c03_i", "Leé el título del texto."),
      "items": [
        {
          "preg": "¿Qué significa la palabra <b>hallazgos</b>?",
          "audio": A("c03_a", "¿Qué significa la palabra hallazgos?"),
          "opc": [
            "Descubrimientos",
            "Problemas",
            "Viajes",
            "Animales"
          ],
          "conf": A("c03_ac", "Hallazgos son descubrimientos: cosas que se encuentran.")
        },
        {
          "preg": "Según el título, ¿qué descubrieron los científicos?",
          "audio": A("c03_b", "Según el título, ¿qué descubrieron los científicos?"),
          "opc": [
            "Una nueva estrella de mar y otras especies",
            "Un barco hundido",
            "Una isla nueva",
            "Una ballena blanca"
          ],
          "conf": A("c03_bc", "Una nueva estrella de mar y otras especies únicas.")
        },
        {
          "preg": "¿Por qué el fondo del mar puede parecer <b>misterioso</b>?",
          "audio": A("c03_c", "¿Por qué el fondo del mar puede parecer misterioso?"),
          "opc": [
            "Porque es oscuro, profundo y poco explorado",
            "Porque está lleno de luz",
            "Porque es muy chico",
            "Porque no tiene agua"
          ],
          "conf": A("c03_cc", "Es oscuro, profundo y todavía hay mucho por descubrir.")
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
            "src": "estrella_conicet.jpg",
            "h": 14
          },
          {
            "t": "txt",
            "h": "<h4>Hallazgos del Conicet en el fondo marino: una nueva estrella y otras especies únicas</h4><p id=\"co1\"><span class=\"np\">1</span>La travesía científica partió desde Buenos Aires hacia Puerto Madryn en aguas profundas del Océano Atlántico.</p><p id=\"co2\"><span class=\"np\">2</span>En las profundidades heladas del Mar Argentino, donde la oscuridad y el silencio dominan, ocurrió algo asombroso. Una nueva y llamativa estrella apareció en la transmisión en vivo de la expedición científica, llamada «Vida en los extremos». Esto desató un gran entusiasmo en las redes sociales.</p><p id=\"co3\"><span class=\"np\">3</span>La escena fue capturada en tiempo real a casi 1.000 metros de profundidad gracias a un robot de última generación.</p>",
            "cls": "lect"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("c04_0", "Escuchá con atención la lectura y prestá atención a la pronunciación y la entonación."),
          "chip": "📖 Lectura modélica"
        },
        {
          "audio": A("c04_1", "La travesía científica partió desde Buenos Aires hacia Puerto Madryn en aguas profundas del Océano Atlántico."),
          "destacar": [
            "co1"
          ],
          "chip": "Párrafo 1"
        },
        {
          "audio": A("c04_2", "En las profundidades heladas del Mar Argentino, donde la oscuridad y el silencio dominan, ocurrió algo asombroso. Una nueva y llamativa estrella apareció en la transmisión en vivo de la expedición científica, llamada «Vida en los extremos». Esto desató un gran entusiasmo en las redes sociales."),
          "destacar": [
            "co2"
          ],
          "chip": "Párrafo 2"
        },
        {
          "audio": A("c04_3", "La escena fue capturada en tiempo real a casi mil metros de profundidad gracias a un robot de última generación."),
          "destacar": [
            "co3"
          ],
          "chip": "Párrafo 3"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (2)",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "pulpito_conicet.jpg",
            "h": 16
          },
          {
            "t": "txt",
            "h": "<p id=\"co4\"><span class=\"np\">4</span>La expedición del Conicet estuvo liderada por María Emilia Bravo y su equipo de 25 investigadores. No sólo exploraron territorios biológicos desconocidos sino que todo el público pudo participar de la transmisión en vivo. Esto fue lo maravilloso.</p><p id=\"co5\"><span class=\"np\">5</span>La rara estrella no fue el único organismo que sorprendió durante esta travesía. En otra jornada, un pequeño pulpo apareció en cámara. «Qué bonito. Se queda tranquilito. Estos pulpos tienen ojos muy complejos», dijo una científica.</p><p id=\"co6\"><span class=\"np\">6</span>Con estas imágenes y estos datos se amplía el conocimiento sobre un mundo que era oculto a la mirada humana.</p><div class=\"lfte\">Texto adaptado · Fuente: Infobae</div>",
            "cls": "lect"
          }
        ]
      },
      "pasos": [
        {
          "audio": A("c05_4", "La expedición del Conicet estuvo liderada por María Emilia Bravo y su equipo de 25 investigadores. No sólo exploraron territorios biológicos desconocidos sino que todo el público pudo participar de la transmisión en vivo. Esto fue lo maravilloso."),
          "destacar": [
            "co4"
          ],
          "chip": "Párrafo 4"
        },
        {
          "audio": A("c05_5", "La rara estrella no fue el único organismo que sorprendió durante esta travesía. En otra jornada, un pequeño pulpo apareció en cámara. «Qué bonito. Se queda tranquilito. Estos pulpos tienen ojos muy complejos», dijo una científica."),
          "destacar": [
            "co5"
          ],
          "chip": "Párrafo 5"
        },
        {
          "audio": A("c05_6", "Con estas imágenes y estos datos se amplía el conocimiento sobre un mundo que era oculto a la mirada humana."),
          "destacar": [
            "co6"
          ],
          "chip": "Párrafo 6"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Comprendemos el texto",
      "vis": {
        "t": "img",
        "src": "estrella_conicet.jpg",
        "h": 30
      },
      "pista": A("c06_p", "Volvé a leer el texto: la respuesta está en alguno de sus párrafos."),
      "instr": A("c06_i", "Respondé según lo que leíste."),
      "items": [
        {
          "preg": "¿Dónde se realizó la expedición científica?",
          "audio": A("c06_a", "¿Dónde se realizó la expedición científica?"),
          "opc": [
            "En el Mar Argentino, en el Océano Atlántico",
            "En el Océano Pacífico",
            "En un río de Mendoza",
            "En el Polo Norte"
          ],
          "conf": A("c06_ac", "En las aguas profundas del Mar Argentino, en el Océano Atlántico, entre Buenos Aires y Puerto Madryn.")
        },
        {
          "preg": "¿Qué encontraron al comienzo del viaje?",
          "audio": A("c06_b", "¿Qué encontraron al comienzo del viaje?"),
          "opc": [
            "Una nueva y llamativa estrella de mar",
            "Un pequeño pulpo",
            "Una orca albina",
            "Un barco antiguo"
          ],
          "conf": A("c06_bc", "Una nueva y llamativa estrella de mar.")
        },
        {
          "preg": "La estrella, ¿estaba a <b>más</b> o a <b>menos</b> de 500 metros de profundidad?",
          "audio": A("c06_c", "La nueva estrella de mar, ¿estaba a más o a menos de 500 metros de profundidad?"),
          "opc": [
            "A más: casi 1.000 metros",
            "A menos: unos 100 metros",
            "Justo a 500 metros",
            "En la superficie"
          ],
          "conf": A("c06_cc", "A más de 500: estaba a casi mil metros de profundidad.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Seguimos comprendiendo",
      "vis": {
        "t": "img",
        "src": "pulpito_conicet.jpg",
        "h": 24
      },
      "pista": A("c07_p", "Volvé a leer los párrafos 3, 4 y 5."),
      "instr": A("c07_i", "Seguimos respondiendo sobre el texto."),
      "items": [
        {
          "preg": "¿Qué instrumento permitió observar el fondo marino?",
          "audio": A("c07_a", "¿Qué instrumento permitió observar el fondo marino?"),
          "opc": [
            "Un robot de última generación",
            "Un telescopio",
            "Un submarino con personas",
            "Una red de pesca"
          ],
          "conf": A("c07_ac", "Un robot de última generación.")
        },
        {
          "preg": "¿Qué otro animal apareció durante la travesía?",
          "audio": A("c07_b", "¿Qué otro animal apareció durante la travesía?"),
          "opc": [
            "Un pequeño pulpo",
            "Una ballena",
            "Una foca",
            "Un tiburón"
          ],
          "conf": A("c07_bc", "Un pequeño pulpo, de ojos muy complejos.")
        },
        {
          "preg": "Que se transmitiera <b>en vivo</b> provocó en el público…",
          "audio": A("c07_c", "Completá: que se transmitiera en vivo provocó en el público…"),
          "opc": [
            "un gran entusiasmo y la posibilidad de participar",
            "miedo y aburrimiento",
            "enojo",
            "nada"
          ],
          "conf": A("c07_cc", "Desató un gran entusiasmo en las redes, y todo el público pudo participar.")
        },
        {
          "preg": "¿Quién lideró la expedición?",
          "audio": A("c07_d", "¿Quién lideró la expedición?"),
          "opc": [
            "María Emilia Bravo, con 25 investigadores",
            "Un equipo de científicos rusos",
            "Un pescador de Puerto Madryn",
            "Nadie: fue un robot solo"
          ],
          "conf": A("c07_dc", "María Emilia Bravo y su equipo de 25 investigadores.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Marcá la opción correcta",
      "vis": {
        "t": "img",
        "src": "estrella_conicet.jpg",
        "h": 26
      },
      "pista": A("c08_p", "Pensá en lo que hace especial a este descubrimiento."),
      "instr": A("c08_i", "Elegí la opción correcta."),
      "items": [
        {
          "preg": "¿Por qué el hecho que se cuenta fue <b>asombroso</b>?",
          "audio": A("c08_a", "¿Por qué el hecho que se cuenta en el artículo fue asombroso?"),
          "opc": [
            "Porque nunca se había visto esta especie",
            "Porque los científicos se asustaron",
            "Porque la oscuridad les impedía ver"
          ],
          "conf": A("c08_ac", "Porque era una especie nueva, nunca vista.")
        },
        {
          "preg": "¿Por qué la travesía se llamó «<b>Vida en los extremos</b>»?",
          "audio": A("c08_b", "¿Por qué la travesía se llamó Vida en los extremos?"),
          "opc": [
            "Porque ocurrió en lo más profundo del mar",
            "Porque no hay vida en el fondo del mar",
            "Porque ocurrió en la superficie marina"
          ],
          "conf": A("c08_bc", "Porque buscaban vida en lo más profundo del mar, un lugar extremo.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Vocabulario",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">travesía · expedición · profundidad · organismo</div>"
      },
      "deco": "estrella_conicet.jpg",
      "pista": A("c09_p", "Separá las palabras en sílabas y fijate dónde está la tilde."),
      "instr": A("c09_i", "Leé las palabras travesía, expedición, profundidad y organismo, y completá."),
      "items": [
        {
          "preg": "¿Cuál es <b>sinónimo</b> de la palabra <b>viaje</b>?",
          "audio": A("c09_a", "¿Cuál es sinónimo de la palabra viaje?"),
          "opc": [
            "travesía",
            "profundidad",
            "organismo",
            "superficie"
          ],
          "conf": A("c09_ac", "Travesía: un viaje, sobre todo por mar.")
        },
        {
          "preg": "Palabra de <b>cuatro sílabas</b> con tilde en la <b>penúltima letra</b>:",
          "audio": A("c09_b", "¿Cuál es la palabra de cuatro sílabas con tilde en la penúltima letra?"),
          "opc": [
            "expedición",
            "travesía",
            "profundidad",
            "organismo"
          ],
          "conf": A("c09_bc", "Ex, pe, di, ción: cuatro sílabas, y la tilde está en la o, la penúltima letra.")
        },
        {
          "preg": "¿Cuál es el <b>antónimo</b> de «superficie»?",
          "audio": A("c09_c", "¿Cuál es el antónimo de superficie?"),
          "opc": [
            "profundidad",
            "travesía",
            "expedición",
            "organismo"
          ],
          "conf": A("c09_cc", "Profundidad: lo opuesto a la superficie.")
        },
        {
          "preg": "¿Qué grupo es de la <b>familia de palabras</b> de «profundidad»?",
          "audio": A("c09_d", "¿Qué grupo de palabras es de la familia de profundidad?"),
          "opc": [
            "profundo, profundizar, profundamente",
            "hondo, bajo, abajo",
            "superficie, arriba, alto",
            "fondo, mar, océano"
          ],
          "conf": A("c09_dc", "Profundo, profundizar y profundamente comparten la misma raíz.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La palabra grave sin tilde",
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">travesía · expedición · profundidad · organismo</div>"
      },
      "deco": "estrella_conicet.jpg",
      "pista": A("c10_p", "Las palabras graves llevan la fuerza en la penúltima sílaba, y llevan tilde si no terminan en n, s o vocal."),
      "instr": A("c10_i", "Buscamos la palabra grave sin tilde y analizamos lo que dice el diccionario."),
      "items": [
        {
          "preg": "¿Cuál es la palabra <b>grave sin tilde</b>?",
          "audio": A("c10_a", "¿Cuál de las cuatro palabras es grave y no lleva tilde?"),
          "opc": [
            "organismo",
            "travesía",
            "expedición",
            "profundidad"
          ],
          "conf": A("c10_ac", "Or, ga, nis, mo: la fuerza está en nis, la penúltima sílaba. Termina en vocal, por eso no lleva tilde.")
        },
        {
          "preg": "En el texto, ¿qué significa <b>organismo</b>?",
          "audio": A("c10_b", "En el texto, ¿qué significa organismo?"),
          "opc": [
            "Ser vivo",
            "Institución del gobierno",
            "Parte de una máquina",
            "Lugar del fondo del mar"
          ],
          "conf": A("c10_bc", "Ser vivo. El diccionario da varias acepciones; elegimos la que corresponde al texto.")
        },
        {
          "preg": "¿Qué clase de palabra es <b>organismo</b>?",
          "audio": A("c10_c", "¿Qué clase de palabra es organismo?"),
          "opc": [
            "Sustantivo",
            "Verbo",
            "Adjetivo",
            "Adverbio"
          ],
          "conf": A("c10_cc", "Es un sustantivo: nombra seres, como un organismo.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Entrevista a un científico",
      "vis": {
        "t": "img",
        "src": "entrevista.jpg",
        "h": 46
      },
      "pasos": [
        {
          "audio": A("c11_1", "¡En marcha! Imaginá que podés entrevistar a un científico del Conicet. ¿Qué le preguntarías?"),
          "chip": "🎤 Entrevista a un científico"
        },
        {
          "audio": A("c11_2", "Podés preguntarle sobre el laboratorio, la investigación científica, la vida cotidiana de un científico y su vocación."),
          "chip": "🔬 Laboratorio · investigación · vida · vocación"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Armamos la entrevista",
      "vis": {
        "t": "img",
        "src": "entrevista.jpg",
        "h": 32
      },
      "pista": A("c12_p", "Una buena pregunta de entrevista es clara y permite que el entrevistado cuente mucho."),
      "instr": A("c12_i", "Pensemos cómo escribir buenas preguntas."),
      "items": [
        {
          "preg": "¿Qué pregunta corresponde al tema <b>laboratorio</b>?",
          "audio": A("c12_a", "¿Qué pregunta corresponde al tema laboratorio?"),
          "opc": [
            "¿Qué instrumentos utilizaron para no dañar a los animales?",
            "¿Cuál es tu comida favorita?",
            "¿Cómo se llama tu perro?",
            "¿Te gusta el fútbol?"
          ],
          "conf": A("c12_ac", "Pregunta por los instrumentos de trabajo: corresponde al laboratorio.")
        },
        {
          "preg": "¿Cuál está <b>bien escrita</b>?",
          "audio": A("c12_b", "¿Cuál de estas preguntas está bien escrita?"),
          "opc": [
            "¿Por qué te decidiste por esta profesión?",
            "Por qué te decidiste por esta profesión?",
            "¿Porque te decidiste por esta profesión",
            "por que te decidiste por esta profesion"
          ],
          "conf": A("c12_bc", "Lleva signos de pregunta al principio y al final, y por qué va separado y con tilde.")
        },
        {
          "preg": "¿Cuál es una <b>pregunta abierta</b>, que permite contar mucho?",
          "audio": A("c12_c", "¿Cuál es una pregunta abierta, que permite que el científico cuente mucho?"),
          "opc": [
            "¿Cómo es un día de trabajo en la expedición?",
            "¿Te gustó el viaje?",
            "¿Viste la estrella?",
            "¿Hacía frío?"
          ],
          "conf": A("c12_cc", "Las preguntas con cómo, por qué o qué invitan a contar más que a responder sí o no.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del fondo marino",
      "n": 11,
      "img": "estrella_conicet.jpg",
      "instr": A("c13_i", "Buscá en la sopa de letras siete palabras del texto. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "CONICET",
          "audio": A("c13_1", "Conicet: donde trabajan los científicos.")
        },
        {
          "w": "ESTRELLA",
          "audio": A("c13_2", "Estrella de mar: el gran hallazgo.")
        },
        {
          "w": "PULPO",
          "audio": A("c13_3", "Pulpo: con ojos muy complejos.")
        },
        {
          "w": "ROBOT",
          "audio": A("c13_4", "Robot: filmó el fondo del mar.")
        },
        {
          "w": "TRAVESIA",
          "audio": A("c13_5", "Travesía: sinónimo de viaje.")
        },
        {
          "w": "EXPEDICION",
          "audio": A("c13_6", "Expedición: viaje científico.")
        },
        {
          "w": "HALLAZGO",
          "audio": A("c13_7", "Hallazgo: descubrimiento.")
        }
      ],
      "fin": A("c13_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre2", "¡Excelente! Terminaste «Hallazgos del Conicet». Mirá tus resultados y envialos a tu docente. En el próximo paquete, ¡un cuento!")
    }
  ]
};
