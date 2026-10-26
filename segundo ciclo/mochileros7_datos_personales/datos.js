/* datos.js — "Cuidamos los datos personales" · Primera secuencia · Texto expositivo · 7.° grado · Lengua · QueSepanTodos.com
   Elaboración propia basada en «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado» (DGE Mendoza, PEAMM), págs. 6 a 16.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Cuidamos los datos personales",
    "corto": "Cuidamos los datos personales",
    "emoji": "🔐",
    "parte": "Primera secuencia · Texto expositivo",
    "subtitulo": "Texto expositivo: datos personales, la definición, sustantivos y verbos",
    "grado": "7.° grado · Lengua",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "nina_candado.jpg",
    "imgCierre": "perfil_digital.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el texto «¿Cómo cuidamos los datos personales en dispositivos y redes sociales?» (págs. 6 a 16) del cuadernillo «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado», material propuesto por la Dirección General de Escuelas de Mendoza (cuadernillo de articulación 2026), en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Mi perfil digital",
      "vis": {
        "t": "img",
        "src": "perfil_digital.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("p01_1", "Antes de leer, pensá en tu perfil digital: cuántos años tenés, dónde vivís, cuáles son tus gustos, tu pasatiempo favorito."),
          "chip": "📱 Mi perfil digital"
        },
        {
          "audio": A("p01_2", "Mucha de esa información la compartimos en Internet casi sin darnos cuenta. Por eso, para crear un usuario conviene usar un apodo o un alias, nunca tu nombre verdadero."),
          "chip": "🙈 Un alias, nunca tu nombre verdadero"
        },
        {
          "audio": A("p01_3", "El texto que vamos a leer se titula: ¿Cómo cuidamos los datos personales en dispositivos y redes sociales?"),
          "chip": "🔐 ¿Cómo cuidamos los datos personales?"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Antes de leer",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "nina_candado.jpg",
            "h": 28
          },
          {
            "t": "txt",
            "h": "Título: <b>¿Cómo cuidamos los datos personales en dispositivos y redes sociales?</b>"
          }
        ]
      },
      "pista": A("p02_p", "Fijate en el título y en la ilustración."),
      "instr": A("p02_i", "Mirá la ilustración y leé el título del texto."),
      "items": [
        {
          "preg": "¿Qué son los <b>datos personales</b>?",
          "audio": A("p02_a", "¿Qué son los datos personales?"),
          "opc": [
            "La información que permite identificarnos",
            "Los juegos que tenemos en el celular",
            "Las contraseñas del wifi",
            "Las noticias de Internet"
          ],
          "conf": A("p02_ac", "Es toda la información que se relaciona con cada uno de nosotros y permite identificarnos.")
        },
        {
          "preg": "¿Por qué el título está escrito como una <b>pregunta</b>?",
          "audio": A("p02_b", "¿Por qué creés que el título está redactado como una pregunta?"),
          "opc": [
            "Porque el texto va a responderla",
            "Porque es un cuento",
            "Porque no tiene respuesta",
            "Porque es un error"
          ],
          "conf": A("p02_bc", "El título plantea una pregunta que el texto va a responder: cómo cuidar nuestros datos.")
        },
        {
          "preg": "¿Qué significa el <b>candado</b> de la ilustración?",
          "audio": A("p02_c", "¿Qué significado tiene el candado en la ilustración?"),
          "opc": [
            "La protección y la seguridad de los datos",
            "Que la computadora está rota",
            "Que hay que comprar un candado",
            "Que Internet está cerrado"
          ],
          "conf": A("p02_cc", "El candado representa la protección: los datos tienen que estar seguros.")
        },
        {
          "preg": "¿Por qué podría estar <b>preocupada</b> la niña?",
          "audio": A("p02_d", "¿Por qué podría estar preocupada la niña de la ilustración?"),
          "opc": [
            "Porque sus datos podrían quedar expuestos",
            "Porque se le terminó la batería",
            "Porque no le gusta la computadora",
            "Porque tiene hambre"
          ],
          "conf": A("p02_dc", "Podría temer que su información personal quede expuesta en Internet.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (1 de 4)",
      "vis": {
        "t": "txt",
        "h": "<h4>¿Cómo cuidamos los datos personales en dispositivos y redes sociales?</h4><p id=\"d0\"><span class=\"np\">1</span>Se entiende por “datos personales” toda la información que se relaciona con cada uno de nosotros, a través de la cual es posible identificarnos. Por ejemplo, el DNI, la fecha de nacimiento, las imágenes o videos, las cuentas bancarias.</p><p id=\"d1\"><span class=\"np\">2</span>Lo primero que hay que saber es que la imagen personal es considerada un dato que tiene que ser protegido.</p><p id=\"d2\"><span class=\"np\">3</span>Para cuidar los datos personales de los adolescentes se pueden tomar las siguientes medidas:</p><p id=\"d3\" class=\"vi\">• No ingresar datos en formularios de páginas de Internet sin verificar.</p><p id=\"d4\" class=\"vi\">• Leer las condiciones de uso de estas páginas para saber qué van a hacer con los datos personales.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("p03_0", "Escuchá atentamente la lectura y prestá especial atención a la pronunciación y la entonación."),
          "chip": "📖 El texto"
        },
        {
          "audio": A("p03_1", "Se entiende por datos personales toda la información que se relaciona con cada uno de nosotros, a través de la cual es posible identificarnos. Por ejemplo, el DNI, la fecha de nacimiento, las imágenes o videos, las cuentas bancarias."),
          "destacar": [
            "d0"
          ]
        },
        {
          "audio": A("p03_2", "Lo primero que hay que saber es que la imagen personal es considerada un dato que tiene que ser protegido."),
          "destacar": [
            "d1"
          ]
        },
        {
          "audio": A("p03_3", "Para cuidar los datos personales de los adolescentes se pueden tomar las siguientes medidas:"),
          "destacar": [
            "d2"
          ]
        },
        {
          "audio": A("p03_4", "No ingresar datos en formularios de páginas de Internet sin verificar."),
          "destacar": [
            "d3"
          ]
        },
        {
          "audio": A("p03_5", "Leer las condiciones de uso de estas páginas para saber qué van a hacer con los datos personales."),
          "destacar": [
            "d4"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (2 de 4)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"d5\" class=\"vi\">• Poner contraseñas en todos los dispositivos utilizados: teléfonos celulares, tablets, netbooks, notebooks o computadoras de escritorio.</p><p id=\"d6\" class=\"vi\">• Usar contraseñas seguras, fáciles de recordar pero difíciles de adivinar. Lo recomendable es mezclar números y letras, signos de puntuación y caracteres de otro tipo. No colocar datos predecibles, como el nombre, la fecha de nacimiento o el DNI. Se debe evitar compartirlas y usar la misma clave para todas las cuentas y dispositivos.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("p03_6", "Poner contraseñas en todos los dispositivos utilizados: teléfonos celulares, tablets, netbooks, notebooks o computadoras de escritorio."),
          "destacar": [
            "d5"
          ]
        },
        {
          "audio": A("p03_7", "Usar contraseñas seguras, fáciles de recordar pero difíciles de adivinar. Lo recomendable es mezclar números y letras, signos de puntuación y caracteres de otro tipo. No colocar datos predecibles, como el nombre, la fecha de nacimiento o el DNI. Se debe evitar compartirlas y usar la misma clave para todas las cuentas y dispositivos."),
          "destacar": [
            "d6"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (3 de 4)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"d7\" class=\"vi\">• No enviar datos personales solicitados por e-mail, redes sociales o aplicaciones móviles poco seguras. Tampoco usar nombres completos en las direcciones de correo electrónico. Pueden usarse frases, seudónimos, alias, entre otros.</p><p id=\"d8\" class=\"vi\">• La privacidad en Internet se logra a través de una actitud de cuidado y resguardo de la información personal. Es importante aprender a configurar perfiles restringidos en las redes sociales, computadoras, tabletas y celulares para proteger la identidad digital.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("p03_8", "No enviar datos personales solicitados por e-mail, redes sociales o aplicaciones móviles poco seguras. Tampoco usar nombres completos en las direcciones de correo electrónico. Pueden usarse frases, seudónimos, alias, entre otros."),
          "destacar": [
            "d7"
          ]
        },
        {
          "audio": A("p03_9", "La privacidad en Internet se logra a través de una actitud de cuidado y resguardo de la información personal. Es importante aprender a configurar perfiles restringidos en las redes sociales, computadoras, tabletas y celulares para proteger la identidad digital."),
          "destacar": [
            "d8"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (4 de 4)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"d9\"><span class=\"np\">4</span>Debemos aprender que cada vez que se usa Internet se deja una huella digital que forma el historial en línea y genera una cantidad de datos que luego pueden consultar otras personas.</p><p id=\"d10\"><span class=\"np\">5</span>Los acosadores estudian la huella digital de los niños y adolescentes. Toman nota de sus gustos y preferencias compartidas en los distintos entornos, plataformas y redes sociales. Usan esta información para generar empatía digital y social y producir una falsa sensación de familiaridad o amistad.</p><p id=\"d11\"><span class=\"np\">6</span>¡Cuidá tu seguridad en línea! No es posible borrar completamente los datos de Internet.</p><div class=\"lfte\">argentina.gob.ar · Guía para padres, familias y docentes: grooming</div>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("p03_10", "Debemos aprender que cada vez que se usa Internet se deja una huella digital que forma el historial en línea y genera una cantidad de datos que luego pueden consultar otras personas."),
          "destacar": [
            "d9"
          ]
        },
        {
          "audio": A("p03_11", "Los acosadores estudian la huella digital de los niños y adolescentes. Toman nota de sus gustos y preferencias compartidas en los distintos entornos, plataformas y redes sociales. Usan esta información para generar empatía digital y social y producir una falsa sensación de familiaridad o amistad."),
          "destacar": [
            "d10"
          ]
        },
        {
          "audio": A("p03_12", "¡Cuidá tu seguridad en línea! No es posible borrar completamente los datos de Internet."),
          "destacar": [
            "d11"
          ]
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Es una idea principal?",
      "vis": {
        "t": "img",
        "src": "nina_candado.jpg",
        "h": 26
      },
      "pista": A("p05_p", "La idea principal es lo esencial del texto. Un detalle o un ejemplo es una idea secundaria."),
      "instr": A("p05_i", "Indicá cuáles de las siguientes ideas son principales del texto."),
      "items": [
        {
          "preg": "«La privacidad en Internet se logra a través de una actitud de cuidado y resguardo de la información personal.»",
          "audio": A("p05_a", "La privacidad en Internet se logra a través de una actitud de cuidado y resguardo de la información personal."),
          "opc": [
            "Es idea principal",
            "No es idea principal"
          ],
          "conf": A("p05_ac", "Es una idea principal: explica cómo se logra la privacidad.")
        },
        {
          "preg": "«Los dispositivos utilizados son teléfonos celulares, tablets, netbooks, notebooks o computadoras de escritorio.»",
          "audio": A("p05_b", "Los dispositivos utilizados son teléfonos celulares, tablets, netbooks, notebooks o computadoras de escritorio."),
          "opc": [
            "No es idea principal",
            "Es idea principal"
          ],
          "conf": A("p05_bc", "Es un detalle: es una lista de ejemplos de dispositivos.")
        },
        {
          "preg": "«Se entiende por datos personales a toda la información que se relaciona con cada uno de nosotros.»",
          "audio": A("p05_c", "Se entiende por datos personales a toda la información que se relaciona con cada uno de nosotros."),
          "opc": [
            "Es idea principal",
            "No es idea principal"
          ],
          "conf": A("p05_cc", "Es una idea principal: define el tema del texto.")
        },
        {
          "preg": "«Para crear la contraseña lo recomendable es mezclar números y letras, signos de puntuación y caracteres de otro tipo.»",
          "audio": A("p05_d", "Para crear la contraseña lo recomendable es mezclar números y letras, signos de puntuación y caracteres de otro tipo."),
          "opc": [
            "No es idea principal",
            "Es idea principal"
          ],
          "conf": A("p05_dc", "Es un detalle: explica cómo hacer una de las medidas de cuidado.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Comprendimos el texto?",
      "vis": {
        "t": "txt",
        "h": "<p id=\"d6\" class=\"vi\">• Usar contraseñas seguras, fáciles de recordar pero difíciles de adivinar. Lo recomendable es mezclar números y letras, signos de puntuación y caracteres de otro tipo. No colocar datos predecibles, como el nombre, la fecha de nacimiento o el DNI. Se debe evitar compartirlas y usar la misma clave para todas las cuentas y dispositivos.</p>",
        "cls": "lect"
      },
      "pista": A("c_pi_d1", "Volvé a leer el texto: la respuesta está en alguna de sus partes."),
      "instr": A("p06_i", "Respondé según lo que leíste. El texto está en pantalla."),
      "items": [
        {
          "preg": "¿Cómo debe ser una contraseña para ser <b>segura</b>?",
          "audio": A("p06_a", "¿Cómo debe ser una contraseña para ser segura?"),
          "opc": [
            "Fácil de recordar y difícil de adivinar, con números, letras y signos",
            "Tu nombre y tu fecha de nacimiento",
            "Corta, para no olvidarla",
            "La misma para todas las cuentas"
          ],
          "conf": A("p06_ac", "Fácil de recordar pero difícil de adivinar, mezclando números, letras, signos y otros caracteres.")
        },
        {
          "preg": "¿Por qué no hay que usar la <b>misma contraseña</b> en todas las redes?",
          "audio": A("p06_b", "¿Por qué no se debe usar la misma contraseña para todas las redes?"),
          "opc": [
            "Porque si alguien la descubre, entra a todas tus cuentas",
            "Porque las redes no lo permiten",
            "Porque se gasta",
            "Porque es más difícil de recordar"
          ],
          "conf": A("p06_bc", "Si alguien descubre esa clave, podría entrar a todas tus cuentas y dispositivos.")
        },
        {
          "preg": "Si te piden datos en un <b>formulario de Internet sin verificar</b>, ¿qué hacés?",
          "vis": {
            "t": "txt",
            "h": "<p id=\"d3\" class=\"vi\">• No ingresar datos en formularios de páginas de Internet sin verificar.</p>",
            "cls": "lect"
          },
          "audio": A("p06_c", "¿Qué debo hacer si te piden ingresar datos en formularios de páginas de Internet sin verificar?"),
          "opc": [
            "No ingresar los datos",
            "Completarlo rápido",
            "Poner los datos de un amigo",
            "Mandarlo por e-mail"
          ],
          "conf": A("p06_cc", "No hay que ingresar datos en páginas sin verificar.")
        },
        {
          "preg": "¿Para qué usan los <b>acosadores</b> la huella digital?",
          "vis": {
            "t": "txt",
            "h": "<p id=\"d10\"><span class=\"np\">5</span>Los acosadores estudian la huella digital de los niños y adolescentes. Toman nota de sus gustos y preferencias compartidas en los distintos entornos, plataformas y redes sociales. Usan esta información para generar empatía digital y social y producir una falsa sensación de familiaridad o amistad.</p>",
            "cls": "lect"
          },
          "audio": A("p06_d", "¿Para qué usan la información de la huella digital los acosadores?"),
          "opc": [
            "Para crear una falsa sensación de amistad",
            "Para ayudar a los chicos",
            "Para borrar los datos",
            "Para mejorar las redes"
          ],
          "conf": A("p06_dc", "Toman nota de los gustos de los chicos para producir una falsa sensación de familiaridad o amistad.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "La definición",
      "vis": {
        "t": "txt",
        "h": "<b>Un teléfono móvil o teléfono celular</b>, <span class=\"vchip\">es</span> <b>un dispositivo electrónico portátil</b>, que permite hacer llamadas a través de una onda de radiofrecuencia, mientras el usuario se está moviendo dentro de un área de servicio telefónico.",
        "cls": "grande"
      },
      "deco": "perfil_digital.jpg",
      "pasos": [
        {
          "audio": A("p07_1", "La definición es un recurso expositivo que delimita con claridad los rasgos genéricos y específicos de aquello que define. Dicho más claramente, es un enunciado que nos señala qué es algo, cómo es, para qué sirve, cómo funciona, de dónde viene la palabra."),
          "chip": "📌 La DEFINICIÓN: qué es, cómo es, para qué sirve"
        },
        {
          "audio": A("p07_2", "En general, los elementos de una definición son: verbo encabezado, con frecuencia ser, más el género, muchas veces el hiperónimo en que se incluye la palabra que se define, más las características generales del objeto y su función."),
          "chip": "Verbo («ser») + género (hiperónimo) + características y función"
        },
        {
          "audio": A("p07_3", "Por ejemplo: un teléfono móvil o teléfono celular, es un dispositivo electrónico portátil, que permite hacer llamadas a través de una onda de radiofrecuencia, mientras el usuario se está moviendo dentro de un área de servicio telefónico."),
          "chip": "Teléfono celular → es → dispositivo electrónico portátil"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Definimos la huella digital",
      "vis": {
        "t": "txt",
        "h": "<p id=\"d9\"><span class=\"np\">4</span>Debemos aprender que cada vez que se usa Internet se deja una huella digital que forma el historial en línea y genera una cantidad de datos que luego pueden consultar otras personas.</p>",
        "cls": "lect"
      },
      "pista": A("c_pi_d1", "Volvé a leer el texto: la respuesta está en alguna de sus partes."),
      "instr": A("p08_i", "Completá la definición de huella digital siguiendo los pasos dados anteriormente."),
      "items": [
        {
          "preg": "¿Cuál es la mejor definición de <b>huella digital</b>, según el texto?",
          "audio": A("p08_a", "¿Cuál es la mejor definición de huella digital, según el texto?"),
          "opc": [
            "Es el rastro que deja cada uso de Internet y forma nuestro historial en línea",
            "Es la marca de un dedo en la pantalla",
            "Es una contraseña muy segura",
            "Es una red social para adolescentes"
          ],
          "conf": A("p08_ac", "La huella digital es el rastro que dejamos cada vez que usamos Internet: forma el historial en línea.")
        },
        {
          "preg": "En una definición, ¿qué verbo aparece con más frecuencia?",
          "audio": A("p08_b", "En una definición, ¿qué verbo aparece con más frecuencia?"),
          "opc": [
            "Ser",
            "Correr",
            "Tener miedo",
            "Publicar"
          ],
          "conf": A("p08_bc", "El verbo ser: «la huella digital es…».")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Sustantivos y verbos",
      "vis": {
        "t": "txt",
        "h": "¿Cómo cuidamos los <b>datos</b> personales en <b>dispositivos</b> y <b>redes</b> sociales?",
        "cls": "grande"
      },
      "deco": "nube_verbos.jpg",
      "pista": A("p09_p", "Los sustantivos nombran; los verbos indican acciones, estados o procesos."),
      "instr": A("p09_i", "Mirá las palabras resaltadas del título."),
      "items": [
        {
          "preg": "La palabra <b>datos</b>, ¿es un sustantivo común o propio?",
          "audio": A("p09_a", "La palabra datos, ¿es un sustantivo común o propio?"),
          "opc": [
            "Común",
            "Propio"
          ],
          "conf": A("p09_ac", "Común: nombra cualquier dato, no uno en particular. Por eso se escribe con minúscula.")
        },
        {
          "preg": "¿Es individual o colectivo?",
          "audio": A("p09_b", "La palabra datos, ¿es un sustantivo individual o colectivo?"),
          "opc": [
            "Individual",
            "Colectivo"
          ],
          "conf": A("p09_bc", "Individual: en singular, dato nombra un solo elemento.")
        },
        {
          "preg": "¿Qué otro <b>sustantivo</b> hay en el título?",
          "audio": A("p09_c", "¿Qué otro sustantivo hay en el título?"),
          "opc": [
            "Dispositivos",
            "Cuidamos",
            "Cómo",
            "Personales"
          ],
          "conf": A("p09_cc", "Dispositivos, y también redes: los dos son sustantivos comunes.")
        },
        {
          "preg": "La palabra <b>cuidamos</b>, ¿qué tipo de palabra es?",
          "audio": A("p09_d", "La palabra cuidamos, ¿qué tipo de palabra es?"),
          "opc": [
            "Un verbo",
            "Un sustantivo",
            "Un adjetivo",
            "Un artículo"
          ],
          "conf": A("p09_dc", "Es un verbo: indica una acción.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Los modos verbales",
      "vis": {
        "t": "img",
        "src": "nube_verbos.jpg",
        "h": 30
      },
      "pasos": [
        {
          "audio": A("p10_1", "Los verbos son palabras que indican acciones, como saltar; estados, como ser; o procesos, como florecer. El modo verbal expresa las actitudes del hablante. Modo indicativo: presenta las acciones como reales. Ejemplo: Juan entró a Internet."),
          "chip": "Indicativo: presenta las acciones como reales"
        },
        {
          "audio": A("p10_2", "Modo subjuntivo: expresa duda, posibilidad, deseo. Ejemplo: Ojalá que Juan no muestre sus fotos. Modo imperativo: expresa orden. Ejemplo: ¡Cuidá tus datos personales, Juan!"),
          "chip": "Subjuntivo: duda, posibilidad, deseo · Imperativo: orden"
        },
        {
          "audio": A("p10_3", "Los tiempos verbales nos indican el momento en el que ocurre la acción, y pueden ser: presente, pretérito, que se refiere al pasado, o futuro. Los verbos pueden conjugarse en tres personas gramaticales: primera, yo, nosotros; segunda, usted o vos, ustedes; y tercera, él, ellos. Cada una puede estar en singular o plural."),
          "chip": "Tiempo: presente, pretérito, futuro · Persona: 1.ª, 2.ª, 3.ª"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Analizamos «cuidamos»",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "txt",
            "h": "El verbo <b>CUIDAMOS</b>",
            "cls": "grande"
          },
          {
            "t": "tabla",
            "id": "vb",
            "cab": [
              "Modo",
              "Tiempo",
              "Persona",
              "Número",
              "Expresa"
            ],
            "filas": [
              [
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
      "deco": "nube_verbos.jpg",
      "pista": A("p11_p", "Pensá: ¿quién cuida? Nosotros. ¿Cuándo? Ahora. ¿Es real, un deseo o una orden?"),
      "instr": A("p11_i", "Completá el cuadro del verbo cuidamos."),
      "items": [
        {
          "preg": "¿En qué <b>modo</b> está?",
          "audio": A("p11_a", "¿En qué modo está el verbo cuidamos?"),
          "destacar": [
            "vb_0_0"
          ],
          "opc": [
            "Indicativo",
            "Subjuntivo",
            "Imperativo"
          ],
          "escribir": [
            {
              "id": "vb_0_0",
              "h": "Indicativo"
            }
          ],
          "conf": A("p11_ac", "Indicativo: presenta la acción como real.")
        },
        {
          "preg": "¿En qué <b>tiempo</b>?",
          "audio": A("p11_b", "¿En qué tiempo está?"),
          "destacar": [
            "vb_0_1"
          ],
          "opc": [
            "Presente",
            "Pretérito",
            "Futuro"
          ],
          "escribir": [
            {
              "id": "vb_0_1",
              "h": "Presente"
            }
          ],
          "conf": A("p11_bc", "Presente: cuidamos ahora.")
        },
        {
          "preg": "¿En qué <b>persona</b>?",
          "audio": A("p11_c", "¿En qué persona gramatical?"),
          "destacar": [
            "vb_0_2"
          ],
          "opc": [
            "Primera",
            "Segunda",
            "Tercera"
          ],
          "escribir": [
            {
              "id": "vb_0_2",
              "h": "1.ª"
            }
          ],
          "conf": A("p11_cc", "Primera persona: nosotros cuidamos.")
        },
        {
          "preg": "¿En qué <b>número</b>?",
          "audio": A("p11_d", "¿En qué número?"),
          "destacar": [
            "vb_0_3"
          ],
          "opc": [
            "Plural",
            "Singular"
          ],
          "escribir": [
            {
              "id": "vb_0_3",
              "h": "Plural"
            }
          ],
          "conf": A("p11_dc", "Plural: nosotros.")
        },
        {
          "preg": "¿Qué <b>expresa</b>?",
          "audio": A("p11_e", "¿Qué expresa el verbo cuidamos?"),
          "destacar": [
            "vb_0_4"
          ],
          "opc": [
            "Una acción",
            "Un estado",
            "Un proceso"
          ],
          "escribir": [
            {
              "id": "vb_0_4",
              "h": "Acción"
            }
          ],
          "conf": A("p11_ec", "Expresa una acción: cuidar.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Campo y asociación semántica",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "esq_privacidad.jpg",
            "h": 20
          },
          {
            "t": "img",
            "src": "esq_dispositivos.jpg",
            "h": 20
          }
        ]
      },
      "pista": A("p12_p", "Un campo semántico reúne palabras de la misma clase; la asociación semántica une ideas libremente."),
      "instr": A("p12_i", "La asociación semántica se refiere a la relación de significado que establecemos mentalmente entre diferentes conceptos o palabras, aunque no pertenezcan a la misma categoría gramatical: es más libre y subjetiva. Un campo semántico es un conjunto de palabras que están relacionadas por su significado y que pertenecen a la misma categoría gramatical. Un hiperónimo es una palabra cuyo significado incluye el de otras más específicas, llamadas hipónimos."),
      "items": [
        {
          "preg": "¿Qué ejemplos de <b>dispositivos tecnológicos</b> aparecen en el texto?",
          "audio": A("p12_a", "¿Qué ejemplos de dispositivos tecnológicos aparecen en el texto?"),
          "opc": [
            "Celulares, tablets, netbooks, notebooks y computadoras",
            "Contraseñas, alias y seudónimos",
            "DNI, fotos y videos",
            "Redes, e-mail y aplicaciones"
          ],
          "conf": A("p12_ac", "Teléfonos celulares, tablets, netbooks, notebooks y computadoras de escritorio.")
        },
        {
          "preg": "El esquema de <b>dispositivos tecnológicos</b>, ¿es un campo semántico o una asociación?",
          "audio": A("p12_b", "El esquema de dispositivos tecnológicos, ¿es un campo semántico o una asociación semántica?"),
          "opc": [
            "Un campo semántico",
            "Una asociación semántica"
          ],
          "conf": A("p12_bc", "Es un campo semántico: todas son palabras de la misma clase, sustantivos que nombran dispositivos.")
        },
        {
          "preg": "Y el esquema de <b>privacidad</b>, ¿qué es?",
          "audio": A("p12_c", "Y el esquema de privacidad, ¿qué es?"),
          "opc": [
            "Una asociación semántica",
            "Un campo semántico"
          ],
          "conf": A("p12_cc", "Es una asociación semántica: se unen ideas relacionadas con la privacidad, de distintas clases de palabras.")
        },
        {
          "preg": "«Dispositivos tecnológicos» es el <b>?</b> de celulares, tablets y computadoras.",
          "audio": A("p12_d", "Dispositivos tecnológicos es el hiperónimo o el hipónimo de celulares, tablets y computadoras?"),
          "opc": [
            "Hiperónimo",
            "Hipónimo"
          ],
          "conf": A("p12_dc", "Hiperónimo: es la palabra general que incluye a las demás, que son sus hipónimos.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras para cuidarnos",
      "n": 10,
      "img": "nina_candado.jpg",
      "instr": A("p13_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "DATOS",
          "audio": A("p13_1", "Datos: la información que nos identifica.")
        },
        {
          "w": "CLAVE",
          "audio": A("p13_2", "Clave: la contraseña.")
        },
        {
          "w": "ALIAS",
          "audio": A("p13_3", "Alias: un nombre que no es el verdadero.")
        },
        {
          "w": "PERFIL",
          "audio": A("p13_4", "Perfil: lo que mostramos en una red.")
        },
        {
          "w": "HUELLA",
          "audio": A("p13_5", "Huella digital: el rastro en Internet.")
        },
        {
          "w": "PRIVACIDAD",
          "audio": A("p13_6", "Privacidad: cuidar la información personal.")
        },
        {
          "w": "VERBO",
          "audio": A("p13_7", "Verbo: indica acciones, estados o procesos.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre1", "¡Muy bien! Terminaste «Cuidamos los datos personales». Recordá: tus datos son tuyos y hay que cuidarlos. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
