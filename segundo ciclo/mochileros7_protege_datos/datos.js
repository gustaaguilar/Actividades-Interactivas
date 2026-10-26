/* datos.js — "Protegé tus datos en redes" · Segunda secuencia · Infografía · 7.° grado · Lengua · QueSepanTodos.com
   Elaboración propia basada en «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado» (DGE Mendoza, PEAMM), págs. 18 a 23.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "Protegé tus datos en redes",
    "corto": "Protegé tus datos en redes",
    "emoji": "📲",
    "parte": "Segunda secuencia · Infografía",
    "subtitulo": "Infografía: texto discontinuo, la coma y tipos de oraciones",
    "grado": "7.° grado · Lengua",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "infografia.jpg",
    "imgCierre": "ciberacoso.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el texto discontinuo «Protegé tus datos en redes sociales» (págs. 18 a 23) del cuadernillo «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado», material propuesto por la Dirección General de Escuelas de Mendoza (cuadernillo de articulación 2026), en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Una infografía",
      "vis": {
        "t": "img",
        "src": "infografia.jpg",
        "h": 38
      },
      "pasos": [
        {
          "audio": A("q01_1", "Observá cómo está armado este texto. En el centro está el núcleo: el título, Protegé tus datos en redes sociales, y la imagen del chico con su celular."),
          "chip": "🎯 El núcleo: título e imagen central"
        },
        {
          "audio": A("q01_2", "Alrededor está la información periférica: consejos cortos con íconos, como usá contraseñas seguras, pensá antes de publicar, o no compartas tu ubicación."),
          "chip": "🔄 Alrededor: consejos con íconos"
        },
        {
          "audio": A("q01_3", "Tocá la imagen para verla más grande y leer cada consejo."),
          "chip": "🔍 Tocá la imagen para agrandarla"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Un texto discontinuo",
      "vis": {
        "t": "img",
        "src": "infografia.jpg",
        "h": 30
      },
      "pista": A("q02_p", "Mirá cómo está organizado el texto: ¿se lee de corrido o por partes?"),
      "instr": A("q02_i", "Este tipo de texto se llama discontinuo. Pensemos por qué."),
      "items": [
        {
          "preg": "¿Cuál es el <b>título</b> y cómo lo reconocés?",
          "audio": A("q02_a", "¿Cuál es el título del texto y cómo lo reconociste?"),
          "opc": [
            "«Protegé tus datos en redes sociales»: está en el centro, con letras grandes",
            "«Usá contraseñas seguras»: está arriba",
            "«Pensá antes de publicar»: tiene un ícono",
            "No tiene título"
          ],
          "conf": A("q02_ac", "El título está en el centro y con la letra más grande y llamativa.")
        },
        {
          "preg": "El prefijo <b>dis-</b> significa negación. Entonces, ¿qué es un texto <b>discontinuo</b>?",
          "audio": A("q02_b", "El prefijo dis significa negación o separación. Entonces, ¿qué es un texto discontinuo?"),
          "opc": [
            "Un texto en el que se pueden leer diferentes partes de forma independiente y en el orden que el lector elija",
            "Un texto que no terminó",
            "Un texto muy largo",
            "Un texto sin imágenes"
          ],
          "conf": A("q02_bc", "Continuo es lo que sigue sin cortes. Discontinuo es lo contrario: un texto que se lee por partes, en el orden que el lector elija.")
        },
        {
          "preg": "¿Qué es una <b>infografía</b>?",
          "audio": A("q02_c", "¿Qué es una infografía?"),
          "opc": [
            "Un texto que combina elementos visuales como imágenes, gráficos o tablas para comunicar información de manera atractiva, clara y concisa",
            "Un cuento con dibujos",
            "Una foto sin palabras",
            "Un mensaje de WhatsApp"
          ],
          "conf": A("q02_cc", "Una infografía combina elementos visuales y textos breves para comunicar información de manera clara y atractiva.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Releemos la infografía",
      "vis": {
        "t": "img",
        "src": "infografia.jpg",
        "h": 30
      },
      "pista": A("q03_p", "Buscá la respuesta en la infografía. Tocá la imagen para agrandarla."),
      "instr": A("q03_i", "Releé la infografía para responder."),
      "items": [
        {
          "preg": "¿Qué <b>usos</b> de las redes sociales menciona?",
          "audio": A("q03_a", "¿Cuáles son los usos de las redes sociales mencionados en la infografía?"),
          "opc": [
            "Buscar información, comunicarnos y entretenernos",
            "Comprar, vender y pagar",
            "Estudiar, dormir y comer",
            "Jugar, correr y viajar"
          ],
          "conf": A("q03_ac", "Las redes sociales permiten buscar información, comunicarnos y entretenernos.")
        },
        {
          "preg": "¿Qué pasa con tus datos una vez que ingresan a la red?",
          "audio": A("q03_b", "¿Qué ocurre con tus datos personales una vez que ingresan a la red?"),
          "opc": [
            "No es posible controlar su uso",
            "Se borran solos",
            "Solo los ven tus amigos",
            "Vuelven a tu celular"
          ],
          "conf": A("q03_bc", "No es posible controlar el uso de tus datos personales una vez ingresados en la red.")
        },
        {
          "preg": "¿Qué tendrías que hacer <b>antes</b> de publicar?",
          "audio": A("q03_c", "¿Qué tendrías que pensar antes de hacer publicaciones en Internet?"),
          "opc": [
            "Pensar qué publico y quién lo puede ver",
            "Publicar rápido",
            "Compartir tu ubicación",
            "Poner tu número de teléfono"
          ],
          "conf": A("q03_cc", "Pensá antes de publicar: qué compartís y quién lo puede ver.")
        },
        {
          "preg": "«Existen configuraciones para <b>resguardar</b> tu información». ¿Con qué palabra la reemplazás?",
          "audio": A("q03_d", "Cuando usás aplicaciones existen configuraciones para resguardar tu información personal. ¿Con qué palabra podés reemplazar resguardar?"),
          "opc": [
            "Proteger",
            "Desamparar",
            "Utilizar"
          ],
          "conf": A("q03_dc", "Resguardar significa proteger. Desamparar es lo contrario.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los riesgos",
      "vis": {
        "t": "img",
        "src": "ciberacoso.jpg",
        "h": 30
      },
      "pista": A("q04_p", "Pensá en qué puede hacer otra persona con tu información."),
      "instr": A("q04_i", "Pensemos por qué es importante resguardar los datos personales."),
      "items": [
        {
          "preg": "¿Cuál es un <b>riesgo</b> de compartir información personal en Internet?",
          "audio": A("q04_a", "¿Qué riesgos pueden correr las personas que comparten información personal en Internet?"),
          "opc": [
            "Que alguien la use para engañarlas o acosarlas",
            "Que se les gaste el celular",
            "Que tengan más amigos",
            "Ninguno"
          ],
          "conf": A("q04_ac", "Alguien podría usar esa información para engañar, acosar o robar la identidad.")
        },
        {
          "preg": "¿Por qué no hay que compartir la <b>ubicación</b>?",
          "audio": A("q04_b", "¿Por qué la infografía aconseja no compartir tu ubicación?"),
          "opc": [
            "Porque un desconocido podría saber dónde estás",
            "Porque gasta batería",
            "Porque es aburrido",
            "Porque no funciona"
          ],
          "conf": A("q04_bc", "Porque un desconocido podría saber dónde estás o dónde vivís.")
        },
        {
          "preg": "¿Qué aconseja la infografía sobre los <b>desconocidos</b>?",
          "audio": A("q04_c", "¿Qué aconseja la infografía sobre los desconocidos?"),
          "opc": [
            "No aceptarlos ni hablar con ellos",
            "Agregarlos a todos",
            "Mandarles fotos",
            "Darles tu número"
          ],
          "conf": A("q04_cc", "No aceptés ni hablés con desconocidos.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Palabras con «ciber»",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "txt",
            "h": "<b>ciber</b> + <b>delito</b> = <b>ciberdelito</b>",
            "cls": "grande"
          },
          {
            "t": "img",
            "src": "ciberacoso.jpg",
            "h": 24
          }
        ]
      },
      "pasos": [
        {
          "audio": A("q05_1", "La palabra ciberdelito está formada por ciber, que se refiere a lo relacionado con las computadoras e Internet, y delito."),
          "chip": "ciber + delito"
        },
        {
          "audio": A("q05_2", "Un ciberdelito es un delito que se comete usando Internet o la tecnología, como robar datos o acosar a alguien en las redes."),
          "chip": "⚠️ Ciberdelito: un delito por Internet"
        },
        {
          "audio": A("q05_3", "Con ciber se forman otras palabras: ciberacoso, ciberseguridad, ciberespacio."),
          "chip": "ciberacoso · ciberseguridad · ciberespacio"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Vocabulario",
      "vis": {
        "t": "img",
        "src": "infografia.jpg",
        "h": 26
      },
      "pista": A("q06_p", "Fijate en las palabras que acompañan a la que no conocés."),
      "instr": A("q06_i", "Usá las pistas del texto para pensar el significado de las palabras."),
      "items": [
        {
          "preg": "¿Qué significa <b>ciberdelito</b>?",
          "audio": A("q06_a", "¿Cuál es el significado de la palabra ciberdelito?"),
          "opc": [
            "Un delito que se comete por Internet",
            "Un juego en línea",
            "Una red social",
            "Una computadora rota"
          ],
          "conf": A("q06_ac", "Un delito cometido usando Internet o la tecnología.")
        },
        {
          "preg": "«Usá solo perfiles seguros o <b>restringidos</b>». ¿Qué significa restringido?",
          "audio": A("q06_b", "Usá solo perfiles seguros o restringidos. ¿Qué significa restringido?"),
          "opc": [
            "Limitado: solo lo pueden ver algunas personas",
            "Abierto a todo el mundo",
            "Borrado",
            "Muy colorido"
          ],
          "conf": A("q06_bc", "Restringido es limitado: un perfil restringido solo lo ven las personas que elegís.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La importancia de la coma",
      "vis": {
        "t": "txt",
        "h": "A) <b>No, es posible</b> controlar el uso de tus datos personales una vez ingresados en la red.<br><br>B) <b>No es posible</b> controlar el uso de tus datos personales una vez ingresados en la red.",
        "cls": "grande"
      },
      "deco": "infografia.jpg",
      "pista": A("q07_p", "Leé las dos oraciones haciendo la pausa de la coma."),
      "instr": A("q07_i", "Prestá atención a la puntuación. Las dos oraciones tienen las mismas palabras, pero una tiene una coma."),
      "items": [
        {
          "preg": "¿Qué dice la oración <b>A</b>, con coma?",
          "audio": A("q07_a", "¿Qué dice la oración A, la que tiene coma después del no?"),
          "opc": [
            "Que sí es posible controlar el uso de los datos",
            "Que no es posible controlarlos",
            "Lo mismo que la B",
            "No dice nada"
          ],
          "conf": A("q07_ac", "Con la coma, el no responde a algo anterior, y la oración afirma que sí es posible controlarlos.")
        },
        {
          "preg": "¿Cuál de las dos dice lo mismo que la <b>infografía</b>?",
          "audio": A("q07_b", "¿Cuál de las dos oraciones dice lo mismo que la infografía?"),
          "opc": [
            "La B, sin coma",
            "La A, con coma",
            "Las dos",
            "Ninguna"
          ],
          "conf": A("q07_bc", "La B: no es posible controlar el uso de los datos. ¡Una coma puede cambiar todo el significado!")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Enunciativas y exhortativas",
      "vis": {
        "t": "img",
        "src": "ciberacoso.jpg",
        "h": 34
      },
      "pasos": [
        {
          "audio": A("q08_1", "Cada vez que nos comunicamos, lo hacemos con objetivos generalmente bastante claros: a veces pretendemos informar de algo a alguien; otras expresar nuestras dudas o nuestros deseos, invitar o exteriorizar nuestras emociones. Para cada una de estas posibilidades existe un tipo de oración particular."),
          "chip": "💬 Un tipo de oración para cada objetivo"
        },
        {
          "audio": A("q08_2", "Oraciones enunciativas: informan o comunican un hecho de manera objetiva. Pueden ser afirmativas o negativas. Utilizan el modo indicativo del verbo."),
          "chip": "📢 Enunciativas: informan · modo indicativo"
        },
        {
          "audio": A("q08_3", "Oraciones exhortativas: expresan órdenes, mandatos o ruegos, intentan convencer al lector. Utilizan el modo imperativo del verbo."),
          "chip": "👉 Exhortativas: órdenes, mandatos o ruegos · modo imperativo"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Enunciativa o exhortativa?",
      "vis": {
        "t": "img",
        "src": "ciberacoso.jpg",
        "h": 26
      },
      "pista": A("q09_p", "Si informa, es enunciativa; si pide, ordena o aconseja, es exhortativa."),
      "instr": A("q09_i", "Decidí qué tipo de oración es cada una."),
      "items": [
        {
          "preg": "«El ciberacoso es una forma de violencia a través de Internet.»",
          "audio": A("q09_a", "El ciberacoso es una forma de violencia a través de Internet."),
          "opc": [
            "Enunciativa",
            "Exhortativa"
          ],
          "conf": A("q09_ac", "Enunciativa: informa un hecho.")
        },
        {
          "preg": "«¡Pensá antes de publicar!»",
          "audio": A("q09_b", "¡Pensá antes de publicar!"),
          "opc": [
            "Exhortativa",
            "Enunciativa"
          ],
          "conf": A("q09_bc", "Exhortativa: da un consejo, con el verbo en modo imperativo.")
        },
        {
          "preg": "«Los acosadores usan los datos que publicamos.»",
          "audio": A("q09_c", "Los acosadores usan los datos que publicamos."),
          "opc": [
            "Enunciativa",
            "Exhortativa"
          ],
          "conf": A("q09_cc", "Enunciativa: informa.")
        },
        {
          "preg": "«No hablés con desconocidos.»",
          "audio": A("q09_d", "No hablés con desconocidos."),
          "opc": [
            "Exhortativa",
            "Enunciativa"
          ],
          "conf": A("q09_dc", "Exhortativa: es un pedido para convencerte de protegerte.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la infografía",
      "n": 10,
      "img": "infografia.jpg",
      "instr": A("q10_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "INFOGRAFIA",
          "audio": A("q10_1", "Infografía: combina imágenes y textos breves.")
        },
        {
          "w": "PERFIL",
          "audio": A("q10_2", "Perfil: lo que mostramos en las redes.")
        },
        {
          "w": "UBICACION",
          "audio": A("q10_3", "Ubicación: mejor no compartirla.")
        },
        {
          "w": "RIESGO",
          "audio": A("q10_4", "Riesgo: un peligro posible.")
        },
        {
          "w": "PROTEGER",
          "audio": A("q10_5", "Proteger: resguardar.")
        },
        {
          "w": "COMA",
          "audio": A("q10_6", "Coma: puede cambiar el significado.")
        },
        {
          "w": "RED",
          "audio": A("q10_7", "Red: donde quedan nuestros datos.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre2", "¡Excelente! Terminaste «Protegé tus datos en redes». Pensá antes de publicar y cuidá tu información. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
