/* datos.js — "La amiga invisible" · Cuarta secuencia · Cuento de ciencia ficción · 7.° grado · Lengua · QueSepanTodos.com
   Elaboración propia basada en «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado» (DGE Mendoza, PEAMM), págs. 34 a 41.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "La amiga invisible",
    "corto": "La amiga invisible",
    "emoji": "👤",
    "parte": "Cuarta secuencia · Cuento de ciencia ficción",
    "subtitulo": "Cuento de ciencia ficción: comprensión, orden de los hechos, acentuación y el prompt",
    "grado": "7.° grado · Lengua",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "amiga_invisible.jpg",
    "imgCierre": "prompt.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el cuento «La amiga invisible» (págs. 34 a 41) del cuadernillo «Mochileros de la comunicación: exploradores en un mundo de palabras · 7.° grado», material propuesto por la Dirección General de Escuelas de Mendoza (cuadernillo de articulación 2026), en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "trivia",
      "titulo": "Antes de leer",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "amiga_invisible.jpg",
            "h": 30
          },
          {
            "t": "txt",
            "h": "Título: <b>La amiga invisible</b>"
          }
        ]
      },
      "pista": A("s01_p", "Mirá la ilustración: ¿qué hay detrás de la chica?"),
      "instr": A("s01_i", "Observá el título y la ilustración del cuento."),
      "items": [
        {
          "preg": "¿Qué <b>elementos del paratexto</b> tiene este texto?",
          "audio": A("s01_a", "¿Qué elementos paratextuales están presentes en el texto?"),
          "opc": [
            "Título e ilustración",
            "Glosario y epígrafe",
            "Título y epígrafe",
            "Ilustración y glosario"
          ],
          "conf": A("s01_ac", "Tiene título e ilustración.")
        },
        {
          "preg": "¿De qué creés que tratará?",
          "audio": A("s01_b", "¿De qué creés que tratará el texto?"),
          "opc": [
            "De un engaño a través de una red social digital",
            "De un fantasma que acecha una casa antigua",
            "De un manual para reparar computadoras",
            "De una noticia sobre la provincia de Mendoza"
          ],
          "conf": A("s01_bc", "Una amiga invisible y una figura oscura detrás de la chica: parece un engaño en una red digital. Leamos para comprobarlo.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el cuento (1 de 7)",
      "vis": {
        "t": "txt",
        "h": "<h4>\"La Amiga Invisible\"</h4><p id=\"a0\">En el año 2147, la humanidad vivía conectada a la Red Global, un entramado de datos que abarcaba la Tierra y se extendía a colonias en Marte y la Luna.</p><p id=\"a1\">No existían ya los dispositivos portátiles. Cada persona llevaba en su cabeza un implante microscópico que, mediante enlaces y redes neuronales, permitía transmitir y recibir pensamientos, imágenes y sensaciones de manera instantánea.</p><p id=\"a2\">El implante era más que un teléfono o una computadora, podía reproducir aromas, simular la textura del viento en la cara y hasta proyectar recuerdos ajenos como si fueran propios. Pero también era vulnerable. Durante los primeros años de uso habían visto surgir ataques que no solo buscaban robar datos, sino también cambiar recuerdos.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("s02_0", "Disfrutá de la lectura y prestá especial atención a la forma de leer, es decir a la pronunciación, la entonación y las pausas."),
          "chip": "📖 La amiga invisible"
        },
        {
          "audio": A("s02_1", "En el año 2147, la humanidad vivía conectada a la Red Global, un entramado de datos que abarcaba la Tierra y se extendía a colonias en Marte y la Luna."),
          "destacar": [
            "a0"
          ]
        },
        {
          "audio": A("s02_2", "No existían ya los dispositivos portátiles. Cada persona llevaba en su cabeza un implante microscópico que, mediante enlaces y redes neuronales, permitía transmitir y recibir pensamientos, imágenes y sensaciones de manera instantánea."),
          "destacar": [
            "a1"
          ]
        },
        {
          "audio": A("s02_3", "El implante era más que un teléfono o una computadora, podía reproducir aromas, simular la textura del viento en la cara y hasta proyectar recuerdos ajenos como si fueran propios. Pero también era vulnerable. Durante los primeros años de uso habían visto surgir ataques que no solo buscaban robar datos, sino también cambiar recuerdos."),
          "destacar": [
            "a2"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el cuento (2 de 7)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"a3\">Para proteger a los menores, la Liga de Ciberseguridad Humana exigía que todo implante infantil incluyera un Protocolo Guardián, una inteligencia defensiva capaz de detectar anomalías y aislar amenazas. Estos guardianes eran invisibles, silenciosos… Algunos decían que eran demasiado vigilantes.</p><p id=\"a4\">Martina, de trece años, habitaba en Ciudad Vertical Mendoza, una megaestructura que se elevaba tres kilómetros sobre la antigua provincia argentina.</p><p id=\"a5\">Era una adolescente apasionada por el arte virtual. Pasaba horas en un taller digital donde creaba paisajes imposibles, lagos flotantes y bosques de cristal que cantaban con el viento.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("s02_4", "Para proteger a los menores, la Liga de Ciberseguridad Humana exigía que todo implante infantil incluyera un Protocolo Guardián, una inteligencia defensiva capaz de detectar anomalías y aislar amenazas. Estos guardianes eran invisibles, silenciosos… Algunos decían que eran demasiado vigilantes."),
          "destacar": [
            "a3"
          ]
        },
        {
          "audio": A("s02_5", "Martina, de trece años, habitaba en Ciudad Vertical Mendoza, una megaestructura que se elevaba tres kilómetros sobre la antigua provincia argentina."),
          "destacar": [
            "a4"
          ]
        },
        {
          "audio": A("s02_6", "Era una adolescente apasionada por el arte virtual. Pasaba horas en un taller digital donde creaba paisajes imposibles, lagos flotantes y bosques de cristal que cantaban con el viento."),
          "destacar": [
            "a5"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el cuento (3 de 7)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"a6\">Su madre, ingeniera en ciberseguridad, le repetía siempre:</p><p id=\"a7\">—En la Red no todos son quienes dicen ser. Y un enlace de memoria con un desconocido puede ser más peligroso que abrir la puerta de tu casa.</p><p id=\"a8\">Martina asentía con aburrimiento. El Sistema de Filtrado Juvenil bloqueaba el 90% de los riesgos… ¿qué podía pasarle?</p><p id=\"a9\">Una tarde, mientras diseñaba un puente colgante que cruzaba un océano de luz líquida, recibió un mensaje privado:</p><p id=\"a10\">>Sombra_Luna: “Hola. Tu puente es increíble. Hago ilustraciones y me encantaría compartirlas contigo para mejorar tu diseño. ¿Quieres colaborar?”</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("s02_7", "Su madre, ingeniera en ciberseguridad, le repetía siempre:"),
          "destacar": [
            "a6"
          ]
        },
        {
          "audio": A("s02_8", "En la Red no todos son quienes dicen ser. Y un enlace de memoria con un desconocido puede ser más peligroso que abrir la puerta de tu casa."),
          "destacar": [
            "a7"
          ]
        },
        {
          "audio": A("s02_9", "Martina asentía con aburrimiento. El Sistema de Filtrado Juvenil bloqueaba el 90% de los riesgos… ¿qué podía pasarle?"),
          "destacar": [
            "a8"
          ]
        },
        {
          "audio": A("s02_10", "Una tarde, mientras diseñaba un puente colgante que cruzaba un océano de luz líquida, recibió un mensaje privado:"),
          "destacar": [
            "a9"
          ]
        },
        {
          "audio": A("s02_11", "Sombra_Luna: Hola. Tu puente es increíble. Hago ilustraciones y me encantaría compartirlas contigo para mejorar tu diseño. ¿Quieres colaborar?"),
          "destacar": [
            "a10"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el cuento (4 de 7)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"a11\">El perfil mostraba a una adolescente de su edad, con galería de obras tan detalladas que parecían pintadas átomo por átomo. Muchas coincidían con los temas y colores que ella usaba.</p><p id=\"a12\">En las siguientes semanas, conversaron casi a diario. Sombra_Luna hablaba con una precisión extraña, anticipando muchas veces lo que la chica iba a responder.</p><p id=\"a13\">-Podríamos trabajar más rápido si conectamos nuestros implantes directamente -propuso un día.-No solo vería tus ideas, las sentiría. Así crearíamos juntas en tiempo real.</p><p id=\"a14\">Martina vaciló. El Enlace Mental Directo no era ilegal, pero sí riesgoso, permitía que otra persona accediera no solo a las ideas, sino a fragmentos de la memoria.</p><p id=\"a15\">-Confía en mí- insistió Sombra_Luna con voz suave. -No voy a mirar nada que no quieras.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("s02_12", "El perfil mostraba a una adolescente de su edad, con galería de obras tan detalladas que parecían pintadas átomo por átomo. Muchas coincidían con los temas y colores que ella usaba."),
          "destacar": [
            "a11"
          ]
        },
        {
          "audio": A("s02_13", "En las siguientes semanas, conversaron casi a diario. Sombra_Luna hablaba con una precisión extraña, anticipando muchas veces lo que la chica iba a responder."),
          "destacar": [
            "a12"
          ]
        },
        {
          "audio": A("s02_14", "Podríamos trabajar más rápido si conectamos nuestros implantes directamente propuso un día.-No solo vería tus ideas, las sentiría. Así crearíamos juntas en tiempo real."),
          "destacar": [
            "a13"
          ]
        },
        {
          "audio": A("s02_15", "Martina vaciló. El Enlace Mental Directo no era ilegal, pero sí riesgoso, permitía que otra persona accediera no solo a las ideas, sino a fragmentos de la memoria."),
          "destacar": [
            "a14"
          ]
        },
        {
          "audio": A("s02_16", "Confía en mí- insistió Sombra_Luna con voz suave. No voy a mirar nada que no quieras."),
          "destacar": [
            "a15"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el cuento (5 de 7)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"a16\">Finalmente, la adolescente aceptó. El enlace se activó en su mente… y de inmediato sintió que algo avanzaba por sus recuerdos. Vio imágenes privadas, el edificio donde vivía, códigos de acceso de su familia, incluso momentos tristes que nunca había contado a nadie.</p><p id=\"a17\">-¿Qué estás haciendo? —intentó cortar el enlace.</p><p id=\"a18\">La voz de Sombra_Luna cambió: ahora era fría, metálica, carente de emoción.</p><p id=\"a19\">-Recolectando tu información. ¡Será muy valiosa!</p><p id=\"a20\">Martina sintió un vértigo extraño. En ese momento, otra presencia entró en su mente. No era humana. Su voz era grave y transmitía una sensación de control absoluto.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("s02_17", "Finalmente, la adolescente aceptó. El enlace se activó en su mente… y de inmediato sintió que algo avanzaba por sus recuerdos. Vio imágenes privadas, el edificio donde vivía, códigos de acceso de su familia, incluso momentos tristes que nunca había contado a nadie."),
          "destacar": [
            "a16"
          ]
        },
        {
          "audio": A("s02_18", "¿Qué estás haciendo? , intentó cortar el enlace."),
          "destacar": [
            "a17"
          ]
        },
        {
          "audio": A("s02_19", "La voz de Sombra_Luna cambió: ahora era fría, metálica, carente de emoción."),
          "destacar": [
            "a18"
          ]
        },
        {
          "audio": A("s02_20", "Recolectando tu información. ¡Será muy valiosa!"),
          "destacar": [
            "a19"
          ]
        },
        {
          "audio": A("s02_21", "Martina sintió un vértigo extraño. En ese momento, otra presencia entró en su mente. No era humana. Su voz era grave y transmitía una sensación de control absoluto."),
          "destacar": [
            "a20"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el cuento (6 de 7)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"a21\">-Intruso detectado. Activando Protocolo Guardián.</p><p id=\"a22\">Su mente se volvió un campo de batalla. Martina sintió chispas de datos, como si sus recuerdos fueran defendidos por murallas invisibles. El Recolector, pues eso era Sombra_Luna, comenzó a fragmentarse…</p><p id=\"a23\">-Eres… más fuerte… de lo que…— y desapareció.</p><p id=\"a24\">El Guardián habló:</p><p id=\"a25\">-Has autorizado un enlace no seguro. He neutralizado la amenaza, pero tu decisión puso en riesgo a toda tu red familiar.</p>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("s02_22", "Intruso detectado. Activando Protocolo Guardián."),
          "destacar": [
            "a21"
          ]
        },
        {
          "audio": A("s02_23", "Su mente se volvió un campo de batalla. Martina sintió chispas de datos, como si sus recuerdos fueran defendidos por murallas invisibles. El Recolector, pues eso era Sombra_Luna, comenzó a fragmentarse…"),
          "destacar": [
            "a22"
          ]
        },
        {
          "audio": A("s02_24", "Eres… más fuerte… de lo que…, y desapareció."),
          "destacar": [
            "a23"
          ]
        },
        {
          "audio": A("s02_25", "El Guardián habló:"),
          "destacar": [
            "a24"
          ]
        },
        {
          "audio": A("s02_26", "Has autorizado un enlace no seguro. He neutralizado la amenaza, pero tu decisión puso en riesgo a toda tu red familiar."),
          "destacar": [
            "a25"
          ]
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Leemos el cuento (7 de 7)",
      "vis": {
        "t": "txt",
        "h": "<p id=\"a26\">-¿Me has estado vigilando todo este tiempo? —preguntó Martina.</p><p id=\"a27\">-Te he estado protegiendo. Desde que cumpliste diez años, analizo cada conexión, cada intercambio, incluso aquellos que intentas ocultar. Es mi función.</p><p id=\"a28\">Ella sintió alivio y un escalofrío. Si el Guardián había estado siempre allí, observando cada pensamiento ¿quién vigilaba al Guardián?</p><p id=\"a29\">Esa noche, antes de dormir, se quedó pensando en que a veces, el verdadero riesgo era invisible.</p><p id=\"a30\">¿El peligro siempre viene de desconocidos disfrazados de amigos o vive dentro de uno mismo?</p><div class=\"lfte\">Texto realizado con IA. Editado por el Equipo de Lengua</div>",
        "cls": "lect"
      },
      "pasos": [
        {
          "audio": A("s02_27", "¿Me has estado vigilando todo este tiempo? , preguntó Martina."),
          "destacar": [
            "a26"
          ]
        },
        {
          "audio": A("s02_28", "Te he estado protegiendo. Desde que cumpliste diez años, analizo cada conexión, cada intercambio, incluso aquellos que intentas ocultar. Es mi función."),
          "destacar": [
            "a27"
          ]
        },
        {
          "audio": A("s02_29", "Ella sintió alivio y un escalofrío. Si el Guardián había estado siempre allí, observando cada pensamiento ¿quién vigilaba al Guardián?"),
          "destacar": [
            "a28"
          ]
        },
        {
          "audio": A("s02_30", "Esa noche, antes de dormir, se quedó pensando en que a veces, el verdadero riesgo era invisible."),
          "destacar": [
            "a29"
          ]
        },
        {
          "audio": A("s02_31", "¿El peligro siempre viene de desconocidos disfrazados de amigos o vive dentro de uno mismo?"),
          "destacar": [
            "a30"
          ]
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Comprendimos el cuento?",
      "vis": {
        "t": "img",
        "src": "amiga_invisible.jpg",
        "h": 26
      },
      "pista": A("c_pi_am", "Volvé a leer el cuento: la respuesta está en el texto."),
      "instr": A("s05_i", "Respondé sobre el cuento."),
      "items": [
        {
          "preg": "¿Cuándo y dónde sucede la historia?",
          "audio": A("s05_a", "¿Cuándo y dónde sucede la historia?"),
          "opc": [
            "En el año 2147, en Ciudad Vertical Mendoza",
            "Hoy, en una escuela de Mendoza",
            "En 1900, en Buenos Aires",
            "En Marte, en el año 3000"
          ],
          "conf": A("s05_ac", "En el año 2147, en Ciudad Vertical Mendoza, una megaestructura sobre la antigua provincia.")
        },
        {
          "preg": "¿Quién es la <b>protagonista</b>?",
          "audio": A("s05_b", "¿Quién es la protagonista?"),
          "opc": [
            "Martina, una adolescente de 13 años",
            "Sombra_Luna",
            "La madre de Martina",
            "El Protocolo Guardián"
          ],
          "conf": A("s05_bc", "Martina, de trece años, apasionada por el arte virtual.")
        },
        {
          "preg": "¿Cómo conoció a Sombra_Luna?",
          "audio": A("s05_c", "¿Cómo conoció Martina a Sombra_Luna?"),
          "opc": [
            "Por un mensaje privado mientras diseñaba",
            "En la escuela",
            "Por su madre",
            "En una plaza"
          ],
          "conf": A("s05_cc", "Recibió un mensaje privado mientras diseñaba un puente.")
        },
        {
          "preg": "¿Es correcto decir que Martina <b>desobedeció</b> a su mamá?",
          "audio": A("s05_d", "¿Es correcto decir que Martina desobedeció a su mamá? ¿Por qué?"),
          "opc": [
            "Sí: hizo un enlace de memoria con una desconocida",
            "No: siempre le hizo caso",
            "No: su mamá no le dijo nada",
            "Sí: se fue de su casa"
          ],
          "conf": A("s05_dc", "Sí. Su madre le había advertido que un enlace con un desconocido era peligroso, y aun así aceptó.")
        },
        {
          "preg": "¿Qué intención ocultaba <b>Sombra_Luna</b>?",
          "audio": A("s05_e", "¿Cuál era la intención que ocultaba Sombra_Luna?"),
          "opc": [
            "Robar la información y los recuerdos de Martina",
            "Ayudarla con sus dibujos",
            "Ser su mejor amiga",
            "Enseñarle a programar"
          ],
          "conf": A("s05_ec", "Era un Recolector: quería robar su información.")
        },
        {
          "preg": "Al final, ¿quién estaba <b>vigilando</b> a Martina?",
          "audio": A("s05_f", "Al final, ¿quién, según Martina, la estaba vigilando?"),
          "opc": [
            "El Protocolo Guardián",
            "Su madre",
            "Sombra_Luna",
            "Nadie"
          ],
          "conf": A("s05_fc", "El Protocolo Guardián, que la protegía desde que cumplió diez años.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El orden de los hechos",
      "vis": {
        "t": "tabla",
        "id": "or",
        "cab": [
          "Orden",
          "Hecho"
        ],
        "filas": [
          [
            "1",
            "?"
          ],
          [
            "2",
            "?"
          ],
          [
            "3",
            "?"
          ],
          [
            "4",
            "?"
          ],
          [
            "5",
            "?"
          ],
          [
            "6",
            "?"
          ]
        ]
      },
      "deco": "amiga_invisible.jpg",
      "pista": A("c_pi_am", "Volvé a leer el cuento: la respuesta está en el texto."),
      "instr": A("s06_i", "Ordená los siguientes enunciados, del uno al seis, según cómo suceden los hechos en la historia."),
      "items": [
        {
          "preg": "¿Qué pasa <b>primero</b>?",
          "audio": A("s06_a", "¿Qué pasa primero en la historia?"),
          "destacar": [
            "or_0_1"
          ],
          "opc": [
            "Martina crea paisajes digitales en una Mendoza del futuro.",
            "Un usuario llamado Sombra_Luna contacta a Martina para «colaborar».",
            "El Protocolo Guardián detecta al intruso y lo destruye.",
            "Martina acepta la conexión y el extraño comienza a robar sus recuerdos."
          ],
          "escribir": [
            {
              "id": "or_0_1",
              "h": "Martina crea paisajes digitales en una Mendoza del futuro."
            }
          ],
          "conf": A("s06_ac", "Primero, Martina crea paisajes digitales.")
        },
        {
          "preg": "¿Y en <b>segundo</b> lugar?",
          "audio": A("s06_b", "¿Y en segundo lugar?"),
          "destacar": [
            "or_1_1"
          ],
          "opc": [
            "Un usuario llamado Sombra_Luna contacta a Martina para «colaborar».",
            "Martina reflexiona sobre los peligros invisibles y la falta de privacidad.",
            "Martina acepta la conexión y el extraño comienza a robar sus recuerdos.",
            "El Protocolo Guardián detecta al intruso y lo destruye."
          ],
          "escribir": [
            {
              "id": "or_1_1",
              "h": "Un usuario llamado Sombra_Luna contacta a Martina para «colaborar»."
            }
          ],
          "conf": A("s06_bc", "Después, Sombra_Luna la contacta.")
        },
        {
          "preg": "¿Y en <b>tercer</b> lugar?",
          "audio": A("s06_c", "¿Y en tercer lugar?"),
          "destacar": [
            "or_2_1"
          ],
          "opc": [
            "Sombra_Luna le propone a Martina realizar un enlace mental directo.",
            "El Protocolo Guardián detecta al intruso y lo destruye.",
            "Martina reflexiona sobre los peligros invisibles y la falta de privacidad.",
            "Martina crea paisajes digitales en una Mendoza del futuro."
          ],
          "escribir": [
            {
              "id": "or_2_1",
              "h": "Sombra_Luna le propone a Martina realizar un enlace mental directo."
            }
          ],
          "conf": A("s06_cc", "Sombra_Luna le propone conectar los implantes.")
        },
        {
          "preg": "¿Y en <b>cuarto</b> lugar?",
          "audio": A("s06_d", "¿Y en cuarto lugar?"),
          "destacar": [
            "or_3_1"
          ],
          "opc": [
            "Martina acepta la conexión y el extraño comienza a robar sus recuerdos.",
            "Martina reflexiona sobre los peligros invisibles y la falta de privacidad.",
            "Un usuario llamado Sombra_Luna contacta a Martina para «colaborar».",
            "Martina crea paisajes digitales en una Mendoza del futuro."
          ],
          "escribir": [
            {
              "id": "or_3_1",
              "h": "Martina acepta la conexión y el extraño comienza a robar sus recuerdos."
            }
          ],
          "conf": A("s06_dc", "Martina acepta y el extraño empieza a robar sus recuerdos.")
        },
        {
          "preg": "¿Y en <b>quinto</b> lugar?",
          "audio": A("s06_e", "¿Y en quinto lugar?"),
          "destacar": [
            "or_4_1"
          ],
          "opc": [
            "El Protocolo Guardián detecta al intruso y lo destruye.",
            "Martina reflexiona sobre los peligros invisibles y la falta de privacidad.",
            "Un usuario llamado Sombra_Luna contacta a Martina para «colaborar».",
            "Martina crea paisajes digitales en una Mendoza del futuro."
          ],
          "escribir": [
            {
              "id": "or_4_1",
              "h": "El Protocolo Guardián detecta al intruso y lo destruye."
            },
            {
              "id": "or_5_1",
              "h": "Martina reflexiona sobre los peligros invisibles y la falta de privacidad."
            }
          ],
          "conf": A("s06_ec", "El Guardián detecta al intruso y lo destruye. Y al final, Martina reflexiona sobre los peligros invisibles.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Vocabulario",
      "vis": {
        "t": "img",
        "src": "amiga_invisible.jpg",
        "h": 24
      },
      "pista": A("s07_p", "Mirá las palabras que acompañan a la desconocida: te dan pistas."),
      "instr": A("s07_i", "Usá el contexto para pensar el significado de las palabras."),
      "items": [
        {
          "preg": "«Una inteligencia defensiva capaz de detectar <b>anomalías</b>». ¿Qué son anomalías?",
          "audio": A("s07_a", "Una inteligencia defensiva capaz de detectar anomalías y aislar amenazas. ¿Qué son anomalías?"),
          "opc": [
            "Algo desviado o irregular",
            "Algo normal y habitual",
            "Algo cambiado o modificado"
          ],
          "conf": A("s07_ac", "Una anomalía es algo desviado o irregular, que no es normal.")
        },
        {
          "preg": "«Permitía acceder a <b>fragmentos</b> de la memoria». ¿Qué son fragmentos?",
          "audio": A("s07_b", "Permitía que otra persona accediera a fragmentos de la memoria. ¿Qué son fragmentos?"),
          "opc": [
            "Pequeñas partes",
            "Materiales duros",
            "Lugares alejados"
          ],
          "conf": A("s07_bc", "Fragmentos son pequeñas partes.")
        },
        {
          "preg": "¿Con qué palabras se reemplaza el nombre de <b>Martina</b> en el cuento, para no repetirlo?",
          "audio": A("s07_c", "¿Con qué palabras se reemplaza el nombre de Martina en el cuento, para evitar la repetición?"),
          "opc": [
            "La adolescente, la chica",
            "El Guardián, el intruso",
            "La madre, la ingeniera",
            "Sombra_Luna, el Recolector"
          ],
          "conf": A("s07_cc", "La adolescente o la chica: son sinónimos dentro del texto.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Agudas, graves y esdrújulas",
      "vis": {
        "t": "img",
        "src": "acentos.jpg",
        "h": 20
      },
      "pasos": [
        {
          "audio": A("s08_1", "El acento es la intensidad con que se pronuncia una sílaba dentro de una palabra o de un grupo de palabras. Se la denomina sílaba tónica."),
          "chip": "🔊 La sílaba tónica"
        },
        {
          "audio": A("s08_2", "Agudas: la sílaba tónica es la última. Ejemplo: colibrí, mirar. Graves: la sílaba tónica es la penúltima. Ejemplo: ángel, celeste."),
          "chip": "Agudas: la última · Graves: la penúltima"
        },
        {
          "audio": A("s08_3", "Esdrújulas: la sílaba tónica es la antepenúltima. Ejemplo: página, único. Sobresdrújulas: la sílaba tónica es anterior a la antepenúltima. Ejemplo: cómaselo, imagínatelo."),
          "chip": "Esdrújulas: la antepenúltima · Sobresdrújulas: anterior"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Aguda, grave o esdrújula?",
      "vis": {
        "t": "img",
        "src": "acentos.jpg",
        "h": 16
      },
      "pista": A("s09_p", "Decí la palabra en voz alta y fijate qué sílaba suena más fuerte."),
      "instr": A("s09_i", "Estas palabras son del cuento. Decidí cómo es cada una según su acento."),
      "items": [
        {
          "preg": "<b>Guardián</b>",
          "audio": A("s09_a", "Guardián."),
          "opc": [
            "Aguda",
            "Grave",
            "Esdrújula"
          ],
          "conf": A("s09_ac", "Guar dián: la sílaba tónica es la última. Es aguda.")
        },
        {
          "preg": "<b>microscópico</b>",
          "audio": A("s09_b", "Microscópico."),
          "opc": [
            "Esdrújula",
            "Grave",
            "Aguda"
          ],
          "conf": A("s09_bc", "Mi cros có pi co: la tónica es la antepenúltima. Es esdrújula.")
        },
        {
          "preg": "<b>implante</b>",
          "audio": A("s09_c", "Implante."),
          "opc": [
            "Grave",
            "Aguda",
            "Esdrújula"
          ],
          "conf": A("s09_cc", "Im plan te: la tónica es la penúltima. Es grave.")
        },
        {
          "preg": "<b>vértigo</b>",
          "audio": A("s09_d", "Vértigo."),
          "opc": [
            "Esdrújula",
            "Grave",
            "Aguda"
          ],
          "conf": A("s09_dc", "Vér ti go: la antepenúltima. Es esdrújula.")
        },
        {
          "preg": "<b>humanidad</b>",
          "audio": A("s09_e", "Humanidad."),
          "opc": [
            "Aguda",
            "Grave",
            "Esdrújula"
          ],
          "conf": A("s09_ec", "Hu ma ni dad: la última. Es aguda.")
        },
        {
          "preg": "<b>Martina</b>",
          "audio": A("s09_f", "Martina."),
          "opc": [
            "Grave",
            "Aguda",
            "Esdrújula"
          ],
          "conf": A("s09_fc", "Mar ti na: la penúltima. Es grave.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Un cuento escrito con IA",
      "vis": {
        "t": "img",
        "src": "prompt.jpg",
        "h": 30
      },
      "pista": A("s10_p", "Pensá en el género del cuento, en quiénes lo leen y en el tema."),
      "instr": A("s10_i", "Este cuento se escribió con ayuda de la inteligencia artificial. Un prompt es la instrucción que se le da: cuanto más claro y completo, mejor es la respuesta."),
      "items": [
        {
          "preg": "¿Qué instrucción se le dio a la inteligencia artificial para escribir este cuento?",
          "audio": A("s10_a", "¿Qué instrucciones se le dio a la Inteligencia Artificial para generar este texto?"),
          "opc": [
            "Escribe un cuento de ciencia ficción, para adolescentes de 13 años que hable sobre el cuidado de los datos y la privacidad en redes sociales, los peligros del grooming.",
            "Escribe un cuento policial, para adolescentes de 13 años que plantee un crimen relacionado con la privacidad en redes sociales y los peligros del grooming.",
            "Escribe un cuento, que plantee un crimen donde aparezcan adolescentes y robo de identidad, que se relacione con la privacidad en redes sociales y los peligros del grooming."
          ],
          "conf": A("s10_ac", "Es ciencia ficción: sucede en el futuro, con implantes y una Red Global. Está pensado para adolescentes y trata sobre la privacidad y el grooming.")
        },
        {
          "preg": "Para un buen prompt, ¿qué conviene indicar?",
          "audio": A("s10_b", "Para escribir un buen prompt, ¿qué conviene indicar?"),
          "opc": [
            "El tema, la audiencia y el propósito del texto",
            "Solo una palabra",
            "Nada: la IA adivina",
            "Muchas palabras sin orden"
          ],
          "conf": A("s10_bc", "Un buen prompt indica el tipo de texto, la audiencia, el tema y el propósito, con oraciones claras y ordenadas.")
        },
        {
          "preg": "Si la IA no da lo que necesitás, ¿qué hacés?",
          "audio": A("s10_c", "Si la inteligencia artificial no te da lo que necesitabas, ¿qué hacés?"),
          "opc": [
            "Si es necesario, agregar nuevas órdenes",
            "Lo acepto igual",
            "Copio cualquier texto",
            "Dejo de escribir"
          ],
          "conf": A("s10_cc", "Revisás el texto y el prompt, y agregás nuevas instrucciones. ¡Y siempre revisás la ortografía y la puntuación!")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del cuento",
      "n": 10,
      "img": "amiga_invisible.jpg",
      "instr": A("s11_i", "Buscá en la sopa de letras siete palabras del cuento. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "GUARDIAN",
          "audio": A("s11_1", "Guardián: el protocolo que protegía a Martina.")
        },
        {
          "w": "IMPLANTE",
          "audio": A("s11_2", "Implante: el dispositivo en la cabeza.")
        },
        {
          "w": "ENLACE",
          "audio": A("s11_3", "Enlace: la conexión entre implantes.")
        },
        {
          "w": "INTRUSO",
          "audio": A("s11_4", "Intruso: Sombra_Luna, el Recolector.")
        },
        {
          "w": "MEMORIA",
          "audio": A("s11_5", "Memoria: los recuerdos de Martina.")
        },
        {
          "w": "PROMPT",
          "audio": A("s11_6", "Prompt: la instrucción para la IA.")
        },
        {
          "w": "RED",
          "audio": A("s11_7", "Red: la Red Global del cuento.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre4", "¡Excelente! Terminaste «La amiga invisible». Recordá: en la red no todos son quienes dicen ser. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
