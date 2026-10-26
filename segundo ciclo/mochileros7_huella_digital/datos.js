/* datos.js — "¿Qué es la huella digital?" · Tercera secuencia · Texto expositivo · 7.° grado · Lengua · QueSepanTodos.com
   Elaboración propia basada en «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado» (DGE Mendoza, PEAMM), págs. 26 a 30.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "¿Qué es la huella digital?",
    "corto": "¿Qué es la huella digital?",
    "emoji": "👣",
    "parte": "Tercera secuencia · Texto expositivo",
    "subtitulo": "Texto expositivo: idea central, función, estructura y el diccionario",
    "grado": "7.° grado · Lengua",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "huellas.jpg",
    "imgCierre": "huellas.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el texto «¿Qué es la huella digital?» (págs. 26 a 30) del cuadernillo «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado», material propuesto por la Dirección General de Escuelas de Mendoza (cuadernillo de articulación 2026), en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "Las huellas",
      "vis": {
        "t": "img",
        "src": "huellas.jpg",
        "h": 30
      },
      "pasos": [
        {
          "audio": A("r01_1", "Observá estas imágenes. Son huellas dactilares: las líneas de la piel de las yemas de los dedos."),
          "chip": "👆 Huellas dactilares"
        },
        {
          "audio": A("r01_2", "No hay dos huellas iguales en el mundo: cada persona tiene las suyas. Por eso se usan para identificarnos, por ejemplo en el DNI."),
          "chip": "🪪 Únicas: sirven para identificarnos"
        },
        {
          "audio": A("r01_3", "El texto que vamos a leer se titula: ¿Qué es la huella digital? ¿A qué se referirá en el mundo digital?"),
          "chip": "🤔 ¿Y la huella digital?"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Antes de leer",
      "vis": {
        "t": "img",
        "src": "huellas.jpg",
        "h": 26
      },
      "pista": A("r02_p", "Pensá en lo que escuchaste sobre las huellas."),
      "instr": A("r02_i", "Respondé antes de leer."),
      "items": [
        {
          "preg": "¿Puede haber <b>dos huellas dactilares iguales</b>?",
          "audio": A("r02_a", "¿Pueden haber dos huellas dactilares iguales?"),
          "opc": [
            "No: cada persona tiene las suyas",
            "Sí: todas son iguales",
            "Sí: las de los hermanos",
            "Solo en los dedos pulgares"
          ],
          "conf": A("r02_ac", "No. Cada huella es única.")
        },
        {
          "preg": "¿Para qué se usan las huellas dactilares?",
          "audio": A("r02_b", "¿Para qué se usan las huellas dactilares?"),
          "opc": [
            "Para identificar a las personas",
            "Para pintar",
            "Para escribir",
            "Para ver mejor"
          ],
          "conf": A("r02_bc", "Para identificar a las personas.")
        },
        {
          "preg": "En el mundo digital, ¿a qué se puede referir la <b>huella digital</b>?",
          "audio": A("r02_c", "En el mundo digital, ¿a qué se puede referir la huella digital?"),
          "opc": [
            "Al rastro que dejamos al usar Internet",
            "A la huella del dedo en la pantalla",
            "A una aplicación para dibujar",
            "A un virus"
          ],
          "conf": A("r02_cc", "Al rastro que dejamos en Internet. Leamos el texto para comprobarlo.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (1 de 4)",
      "vis": {
        "t": "txt",
        "h": "<h4>¿Qué es la huella digital?</h4><p id=\"h0\"><span class=\"np\">1</span>Todos los días transitamos por distintos espacios digitales, por ejemplo, intercambiamos datos, buscamos información, miramos videos, escuchamos música, pagamos servicios y muchas otras cosas más. Aunque todos estos pasos pueden parecer privados, dejan un rastro en Internet.</p><p id=\"h1\"><span class=\"np\">2</span>La huella digital es la suma de todo lo que compartimos, publicamos y de lo que los demás publican sobre nosotros en internet, con diferentes objetivos. Es el conjunto de nuestro comportamiento en la red, en qué aplicaciones interactuamos, qué fotografías publicamos, cómo nos comportamos en esos espacios, qué decimos y cómo lo decimos. La cantidad de datos que alguien genera, edita, gestiona o comparte por día es fácil de calcular.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("r03_0", "Leé el siguiente texto mientras escuchás."),
          "chip": "📖 El texto"
        },
        {
          "audio": A("r03_1", "Todos los días transitamos por distintos espacios digitales, por ejemplo, intercambiamos datos, buscamos información, miramos videos, escuchamos música, pagamos servicios y muchas otras cosas más. Aunque todos estos pasos pueden parecer privados, dejan un rastro en Internet."),
          "destacar": [
            "h0"
          ]
        },
        {
          "audio": A("r03_2", "La huella digital es la suma de todo lo que compartimos, publicamos y de lo que los demás publican sobre nosotros en internet, con diferentes objetivos. Es el conjunto de nuestro comportamiento en la red, en qué aplicaciones interactuamos, qué fotografías publicamos, cómo nos comportamos en esos espacios, qué decimos y cómo lo decimos. La cantidad de datos que alguien genera, edita, gestiona o comparte por día es fácil de calcular."),
          "destacar": [
            "h1"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (2 de 4)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"h2\"><span class=\"np\">3</span>Toda esta información va construyendo nuestra identidad digital, es decir la información sobre quiénes somos, dónde vivimos, qué lugares frecuentamos, dónde estamos, cuáles son nuestros gustos o preferencias y de qué somos usuarios. Esta ciudadanía digital está siempre en construcción. Se va completando todo el tiempo con nuestra participación en la red.</p><p id=\"h3\"><span class=\"np\">4</span>A lo largo de la vida nuestros gustos e intereses cambian y también nuestro transitar por la web. Más allá de esto, todo va dejando huella y queda registrado como parte de nuestra identidad digital. Aunque borremos información, fotos o videos, queda registro de esa publicación.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("r03_3", "Toda esta información va construyendo nuestra identidad digital, es decir la información sobre quiénes somos, dónde vivimos, qué lugares frecuentamos, dónde estamos, cuáles son nuestros gustos o preferencias y de qué somos usuarios. Esta ciudadanía digital está siempre en construcción. Se va completando todo el tiempo con nuestra participación en la red."),
          "destacar": [
            "h2"
          ]
        },
        {
          "audio": A("r03_4", "A lo largo de la vida nuestros gustos e intereses cambian y también nuestro transitar por la web. Más allá de esto, todo va dejando huella y queda registrado como parte de nuestra identidad digital. Aunque borremos información, fotos o videos, queda registro de esa publicación."),
          "destacar": [
            "h3"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (3 de 4)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"h4\"><span class=\"np\">5</span>Por eso es importante fomentar el uso de la navegación responsable, porque esta huella digital puede influir en otros ámbitos y actividades de la vida real. Por ejemplo, a la hora de postularnos a un trabajo, es muy probable que los empleadores consulten en la web acerca de nosotros, qué hacemos y cómo nos comportamos. Más allá de nuestras credenciales y currículums, nuestra huella digital les dará una idea acabada sobre nuestra educación, desempeño y responsabilidad, entre otras cosas. Por eso, es muy importante entender que aquello publicado en Internet sale del ámbito privado. Es necesario proteger siempre que se pueda los datos personales y no proporcionar información que pueda poner en riesgo nuestra seguridad o la de nuestra familia.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("r03_5", "Por eso es importante fomentar el uso de la navegación responsable, porque esta huella digital puede influir en otros ámbitos y actividades de la vida real. Por ejemplo, a la hora de postularnos a un trabajo, es muy probable que los empleadores consulten en la web acerca de nosotros, qué hacemos y cómo nos comportamos. Más allá de nuestras credenciales y currículums, nuestra huella digital les dará una idea acabada sobre nuestra educación, desempeño y responsabilidad, entre otras cosas. Por eso, es muy importante entender que aquello publicado en Internet sale del ámbito privado. Es necesario proteger siempre que se pueda los datos personales y no proporcionar información que pueda poner en riesgo nuestra seguridad o la de nuestra familia."),
          "destacar": [
            "h4"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el texto (4 de 4)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"h5\"><span class=\"np\">6</span>Siempre hay que leer con cuidado la política de privacidad de redes y recursos digitales. Es necesario no perder nunca de vista que, así como nos comportamos en nuestros intercambios presenciales, debemos hacerlo también en redes. Siempre con consideración y respeto. Pensar qué publicamos y dónde lo publicamos es clave para construir día a día nuestra identidad digital.</p><div class=\"lfte\">educ.ar · «Microaprendizaje: ¿Qué es la huella digital?». Recuperado el 20 de marzo de 2024. Transcripción del video.</div>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("r03_6", "Siempre hay que leer con cuidado la política de privacidad de redes y recursos digitales. Es necesario no perder nunca de vista que, así como nos comportamos en nuestros intercambios presenciales, debemos hacerlo también en redes. Siempre con consideración y respeto. Pensar qué publicamos y dónde lo publicamos es clave para construir día a día nuestra identidad digital."),
          "destacar": [
            "h5"
          ]
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "La idea central",
      "vis": {
        "t": "img",
        "src": "huellas.jpg",
        "h": 22
      },
      "pista": A("c_pi_h3", "Volvé a leer el texto: la respuesta está en alguno de sus párrafos."),
      "instr": A("r05_i", "Pensá en el texto completo."),
      "items": [
        {
          "preg": "¿Cuál de estos enunciados presenta la <b>idea central</b> del texto?",
          "audio": A("r05_a", "¿Cuál de estos enunciados presenta la idea central del texto?"),
          "opc": [
            "La huella digital y las consecuencias de su uso en Internet",
            "La función de la huella digital como una marca personal",
            "La utilidad de la huella digital en la vida de una persona"
          ],
          "conf": A("r05_ac", "El texto explica qué es la huella digital y qué consecuencias tiene lo que hacemos en Internet.")
        },
        {
          "preg": "¿Cuál es la <b>función</b> de este texto?",
          "audio": A("r05_b", "¿Cuál es la función de este texto?"),
          "opc": [
            "Informar y explicar un tema",
            "Contar una historia",
            "Hacer reír",
            "Vender un producto"
          ],
          "conf": A("r05_bc", "Informar y explicar qué es la huella digital.")
        },
        {
          "preg": "¿Qué tipo de texto es?",
          "audio": A("r05_c", "Marcá la opción correcta."),
          "opc": [
            "Este texto es expositivo porque presenta un tema y lo explica, con datos y ejemplos",
            "Este texto es narrativo porque presenta una historia con personajes, tiempo y espacio",
            "Este texto es argumentativo porque expone una postura e intenta convencer al lector"
          ],
          "conf": A("r05_cc", "Es expositivo: presenta un tema y lo explica con datos y ejemplos.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "La estructura del texto expositivo",
      "deco": "huella2.jpg",
      "vis": {
        "t": "txt",
        "h": "<b>Presentación</b>: introduce el tema a tratar y busca captar la atención del lector.<br><b>Desarrollo</b>: expone información, amplía el tema del texto en orden lógico, para que sea comprensible para el lector.<br><b>Conclusión</b>: resume lo expuesto o deja una reflexión final.",
        "cls": "grande"
      },
      "pasos": [
        {
          "audio": A("r06_1", "La estructura general del texto expositivo: los textos expositivos presentan una organización en tres partes."),
          "chip": "🧩 Tres partes"
        },
        {
          "audio": A("r06_2", "Presentación: introduce el tema a tratar y busca captar la atención del lector."),
          "chip": "1️⃣ Presentación"
        },
        {
          "audio": A("r06_3", "Desarrollo: expone información, amplía el tema del texto en orden lógico, para que sea comprensible para el lector."),
          "chip": "2️⃣ Desarrollo"
        },
        {
          "audio": A("r06_4", "Conclusión: resume lo expuesto o deja una reflexión final."),
          "chip": "3️⃣ Conclusión"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Qué parte es?",
      "vis": {
        "t": "img",
        "src": "huellas.jpg",
        "h": 18
      },
      "pista": A("r07_p", "Presentación: el comienzo. Desarrollo: las explicaciones. Conclusión: el cierre con una reflexión."),
      "instr": A("r07_i", "Decidí a qué parte del texto pertenece cada fragmento."),
      "items": [
        {
          "preg": "«Todos los días transitamos por distintos espacios digitales… dejan un rastro en Internet.»",
          "audio": A("r07_a", "Todos los días transitamos por distintos espacios digitales. Aunque todos estos pasos pueden parecer privados, dejan un rastro en Internet."),
          "opc": [
            "Presentación",
            "Desarrollo",
            "Conclusión"
          ],
          "conf": A("r07_ac", "Es la presentación: introduce el tema.")
        },
        {
          "preg": "«La huella digital es la suma de todo lo que compartimos, publicamos…»",
          "audio": A("r07_b", "La huella digital es la suma de todo lo que compartimos, publicamos y de lo que los demás publican sobre nosotros en Internet."),
          "opc": [
            "Desarrollo",
            "Presentación",
            "Conclusión"
          ],
          "conf": A("r07_bc", "Es parte del desarrollo: explica qué es la huella digital.")
        },
        {
          "preg": "«Pensar qué publicamos y dónde lo publicamos es clave para construir día a día nuestra identidad digital.»",
          "audio": A("r07_c", "Pensar qué publicamos y dónde lo publicamos es clave para construir día a día nuestra identidad digital."),
          "opc": [
            "Conclusión",
            "Presentación",
            "Desarrollo"
          ],
          "conf": A("r07_cc", "Es la conclusión: deja una reflexión final.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El diccionario",
      "vis": {
        "t": "txt",
        "h": "<b>RASTRO</b><br>1. Vestigio o huella. <i>El fugitivo ha desaparecido sin dejar rastro. El animal va dejando un rastro de sangre. Al poco de tomar la pastilla, no queda ni rastro del dolor de cabeza.</i><br>2. Mercado callejero donde se compran y venden artículos diversos, nuevos o usados. <i>Me he comprado una cazadora de segunda mano en el rastro.</i><br>3. Rastrillo (instrumento). <i>El labrador guarda el rastro y la horca en el granero.</i>",
        "cls": "lect"
      },
      "deco": "huellas.jpg",
      "pista": A("c_pi_h3", "Volvé a leer el texto: la respuesta está en alguno de sus párrafos."),
      "instr": A("r08_i", "Leé las acepciones de la palabra rastro, del diccionario de la Real Academia Española."),
      "items": [
        {
          "preg": "¿Qué acepción corresponde a «dejar un <b>rastro</b> en Internet»?",
          "audio": A("r08_a", "¿Cuál de las acepciones corresponde a dejar un rastro en Internet, como dice el texto?"),
          "opc": [
            "La 1: vestigio o huella",
            "La 2: mercado callejero",
            "La 3: rastrillo"
          ],
          "conf": A("r08_ac", "La primera: rastro como vestigio o huella.")
        },
        {
          "preg": "Según el texto, ¿qué es la <b>huella digital</b>?",
          "audio": A("r08_b", "Según el texto, ¿cuál es la definición de huella digital?"),
          "opc": [
            "La suma de todo lo que compartimos, publicamos y de lo que los demás publican sobre nosotros en internet, con diferentes objetivos",
            "La marca del dedo en el celular",
            "Una contraseña secreta",
            "Un mercado en línea"
          ],
          "conf": A("r08_bc", "La huella digital es la suma de todo lo que compartimos, publicamos y lo que los demás publican sobre nosotros en Internet.")
        },
        {
          "preg": "¿Cuáles son ejemplos de <b>espacios digitales</b>?",
          "audio": A("r08_c", "¿Cuáles son los ejemplos de espacios digitales que da el texto?"),
          "opc": [
            "Intercambiamos datos, buscamos información, miramos videos, escuchamos música, pagamos servicios",
            "Ir a la plaza y al club",
            "Leer un libro de papel",
            "Dormir la siesta"
          ],
          "conf": A("r08_cc", "Intercambiar datos, buscar información, mirar videos, escuchar música y pagar servicios.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Verdadero o falso?",
      "vf": true,
      "vis": {
        "t": "img",
        "src": "huellas.jpg",
        "h": 22
      },
      "pista": A("c_pi_h3", "Volvé a leer el texto: la respuesta está en alguno de sus párrafos."),
      "instr": A("r09_i", "Decidí si cada enunciado es verdadero o falso, según el texto."),
      "items": [
        {
          "preg": "«La huella digital incluye <b>solo</b> lo que publicamos nosotros.»",
          "audio": A("r09_a", "La huella digital incluye solo lo que publicamos nosotros."),
          "v": false,
          "conf": A("r09_ac", "Falso: también incluye lo que los demás publican sobre nosotros.")
        },
        {
          "preg": "«La identidad digital se construye con nuestra participación en la red.»",
          "audio": A("r09_b", "La identidad digital se construye con nuestra participación en la red."),
          "v": true,
          "conf": A("r09_bc", "Verdadero: se va completando todo el tiempo con nuestra participación.")
        },
        {
          "preg": "«Borrar una foto elimina completamente nuestro registro en Internet.»",
          "audio": A("r09_c", "Borrar una foto elimina completamente nuestro registro en Internet."),
          "v": false,
          "conf": A("r09_cc", "Falso: aunque la borremos, queda registro de esa publicación.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras de la huella",
      "n": 10,
      "img": "huellas.jpg",
      "instr": A("r10_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "HUELLA",
          "audio": A("r10_1", "Huella: la marca que dejamos.")
        },
        {
          "w": "RASTRO",
          "audio": A("r10_2", "Rastro: vestigio o huella.")
        },
        {
          "w": "IDENTIDAD",
          "audio": A("r10_3", "Identidad digital: quiénes somos en la red.")
        },
        {
          "w": "RESPETO",
          "audio": A("r10_4", "Respeto: también en las redes.")
        },
        {
          "w": "REGISTRO",
          "audio": A("r10_5", "Registro: lo que queda guardado.")
        },
        {
          "w": "WEB",
          "audio": A("r10_6", "Web: la red de Internet.")
        },
        {
          "w": "PUBLICAR",
          "audio": A("r10_7", "Publicar: pensalo antes.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre3", "¡Muy bien! Terminaste «¿Qué es la huella digital?». Cada cosa que publicamos construye nuestra identidad digital. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
