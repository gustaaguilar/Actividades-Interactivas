/* datos.js — "El pájaro y la ballena" · ¡Desde la realidad hacia la fantasía! · 5.° grado · Lengua · QueSepanTodos.com
   Elaboración propia basada en «Mochileritos de la comunicación 5» (DGE Mendoza, PEAMM), págs. 36 a 39.
   Cada audio es A(id, texto); la lista para gTTS se extrae de este archivo con script.
   En trivia, la PRIMERA opción es la correcta (el motor las baraja). */
function A(au, tx) { return { au: au, tx: tx }; }

window.DATOS = {
  "meta": {
    "titulo": "El pájaro y la ballena",
    "corto": "El pájaro y la ballena",
    "emoji": "🐦",
    "parte": "¡Desde la realidad hacia la fantasía!",
    "subtitulo": "Un cuento para disfrutar: personajes, lugar y tiempo, diálogos, realidad y fantasía, y lo que dicen las Ciencias Naturales",
    "grado": "5.° grado · Lengua",
    "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "imgPortada": "mares_cierre.jpg",
    "imgCierre": "lo_lograste.jpg",
    "licencia": "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    "revision": false,
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en el cuento «El pájaro y la ballena» (págs. 36 a 39) del cuadernillo «Mochileritos de la comunicación 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "De la realidad a la fantasía",
      "vis": {
        "t": "img",
        "src": "guia_seguir.jpg",
        "h": 38
      },
      "pasos": [
        {
          "audio": A("p01_1", "Leímos textos que nos informan sobre el mar. Ahora, para no olvidarnos de la literatura, ¡llega un cuento!"),
          "chip": "📚 Ahora, literatura"
        },
        {
          "audio": A("p01_2", "Se llama El pájaro y la ballena. Escuchalo con atención y después respondé las preguntas."),
          "chip": "🐦 🐋 El pájaro y la ballena"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Un verano en la bahía",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "mares_cierre.jpg",
            "h": 26
          },
          {
            "t": "txt",
            "h": "Había una vez un pájaro que amaba a una ballena, y una ballena que amaba a un pájaro. Se encontraron en la <b>bahía</b>, durante el <b>verano</b>."
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p02_1", "Había una vez un pájaro que amaba a una ballena, y una ballena que amaba a un pájaro."),
          "chip": "💙 Un pájaro y una ballena"
        },
        {
          "audio": A("p02_2", "Al pájaro le encantaba la sonrisa de la ballena y cómo nadaba. A la ballena le encantaban las plumas blancas del pájaro y verlo volar hacia el cielo."),
          "chip": "🪶 Plumas blancas · 🌊 nado elegante"
        },
        {
          "audio": A("p02_3", "Durante el verano se encontraron en la bahía. Hablaban de la luna, de las olas y de los barcos. El pájaro contaba chistes y la ballena cantaba hermosas canciones."),
          "chip": "☀️ Verano en la bahía"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Quiénes, dónde y cuándo?",
      "vis": {
        "t": "img",
        "src": "mares_cierre.jpg",
        "h": 30
      },
      "pista": A("m_pi_cu", "Pensá en lo que pasa en el cuento: quién lo hace, dónde y por qué."),
      "instr": A("p03_i", "Respondé sobre el comienzo del cuento."),
      "items": [
        {
          "preg": "¿Quiénes son los personajes principales?",
          "audio": A("p03_a", "¿Quiénes son los personajes principales?"),
          "opc": [
            "Un pájaro y una ballena",
            "Un pájaro y un pez",
            "Dos ballenas",
            "Una orca y un científico"
          ],
          "conf": A("p03_ac", "Un pájaro y una ballena.")
        },
        {
          "preg": "¿<b>Dónde</b> y <b>cuándo</b> se encontraron?",
          "audio": A("p03_b", "¿Dónde y cuándo se encontraron?"),
          "opc": [
            "En la bahía, durante el verano",
            "En el cielo, en invierno",
            "En el fondo del mar, en otoño",
            "En los acantilados, de noche"
          ],
          "conf": A("p03_bc", "En la bahía, durante el verano.")
        },
        {
          "preg": "¿Qué le encantaba a la ballena del pájaro?",
          "audio": A("p03_c", "¿Qué le encantaba a la ballena del pájaro?"),
          "opc": [
            "Sus plumas blancas y verlo volar",
            "Su canto en el agua",
            "Que nadara profundo",
            "Que comiera algas"
          ],
          "conf": A("p03_cc", "Sus bonitas plumas blancas y verlo elevarse hacia el cielo.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Llega el invierno",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "icono_ballena.jpg",
            "h": 22
          },
          {
            "t": "txt",
            "h": "El océano se volvió <b>frío</b> y las ballenas partieron hacia <b>aguas más cálidas</b>. El pájaro intentó nadar como una ballena… pero <b>no pudo respirar</b>."
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p04_1", "Pero el verano se transformó en otoño, y el otoño en invierno. El océano se volvió frío y todas las ballenas partieron hacia aguas más cálidas."),
          "chip": "❄️ El océano se enfría"
        },
        {
          "audio": A("p04_2", "La ballena invitó al pájaro a ir con ella. El pájaro aceptó, pero primero le pidió que le enseñara a ser ballena."),
          "chip": "🌊 «Enséñame a ser una ballena»"
        },
        {
          "audio": A("p04_3", "El pájaro se sumergió más y más profundo, pero pronto no pudo respirar y volvió a la superficie, sin aliento. Lo intentó una y otra vez, pero no pudo."),
          "chip": "😮‍💨 Sin aliento"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El intento del pájaro",
      "vis": {
        "t": "img",
        "src": "icono_ballena.jpg",
        "h": 26
      },
      "pista": A("m_pi_cu", "Pensá en lo que pasa en el cuento: quién lo hace, dónde y por qué."),
      "instr": A("p05_i", "Respondé sobre esta parte del cuento."),
      "items": [
        {
          "preg": "¿Por qué partieron las ballenas?",
          "audio": A("p05_a", "¿Por qué partieron las ballenas?"),
          "opc": [
            "Porque el océano se volvió frío y buscaban aguas cálidas",
            "Porque se pelearon con el pájaro",
            "Porque no había barcos",
            "Porque querían volar"
          ],
          "conf": A("p05_ac", "En invierno el océano se enfrió y viajaron hacia aguas más cálidas.")
        },
        {
          "preg": "¿Qué le pidió el pájaro a la ballena?",
          "audio": A("p05_b", "¿Qué le pidió el pájaro a la ballena?"),
          "opc": [
            "Que le enseñara a ser ballena",
            "Que se quedara en la bahía",
            "Que le cantara una canción",
            "Que lo llevara en su lomo"
          ],
          "conf": A("p05_bc", "Que le enseñara a ser una ballena.")
        },
        {
          "preg": "¿Qué le pasó al pájaro al sumergirse?",
          "audio": A("p05_c", "¿Qué le pasó al pájaro al sumergirse?"),
          "opc": [
            "No pudo respirar y volvió a la superficie",
            "Se convirtió en ballena",
            "Encontró un tesoro",
            "Se quedó dormido"
          ],
          "conf": A("p05_cc", "No pudo respirar y regresó jadeando a la superficie.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "La despedida",
      "vis": {
        "t": "col",
        "items": [
          {
            "t": "img",
            "src": "mares_cierre.jpg",
            "h": 22
          },
          {
            "t": "txt",
            "h": "La ballena intentó volar… pero seguía en el agua. Como se querían tanto, <b>se dijeron adiós</b>, y <b>nunca se olvidaron</b>."
          }
        ]
      },
      "pasos": [
        {
          "audio": A("p06_1", "Entonces el pájaro invitó a la ballena a vivir con él en los acantilados, para ver juntos el amanecer. La ballena le pidió que le enseñara a ser pájaro."),
          "chip": "🌅 «Enséñame a ser un pájaro»"
        },
        {
          "audio": A("p06_2", "La ballena cerró los ojos y batió sus aletas, arriba y abajo. Pero al abrirlos, seguía en el agua. No podía volar."),
          "chip": "💦 Seguía en el agua"
        },
        {
          "audio": A("p06_3", "Cada uno entendió que el otro nunca sería feliz lejos de lo que más amaba: nadar profundo y volar alto. Como se querían tanto, se dijeron adiós."),
          "chip": "👋 Se dijeron adiós"
        },
        {
          "audio": A("p06_4", "Pero nunca se olvidaron. Cada vez que uno veía a un pájaro o a una ballena, pensaba en el otro y deseaba que fuera feliz."),
          "chip": "💙 Nunca se olvidaron"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El final del cuento",
      "vis": {
        "t": "img",
        "src": "mares_cierre.jpg",
        "h": 30
      },
      "pista": A("m_pi_cu", "Pensá en lo que pasa en el cuento: quién lo hace, dónde y por qué."),
      "instr": A("p07_i", "Respondé sobre el final."),
      "items": [
        {
          "preg": "¿Dónde vivía el pájaro?",
          "audio": A("p07_a", "¿Dónde vivía el pájaro?"),
          "opc": [
            "Arriba, en los acantilados",
            "En el fondo del mar",
            "En un barco",
            "En una isla de hielo"
          ],
          "conf": A("p07_ac", "Arriba, en los acantilados, donde cada mañana se ve el amanecer.")
        },
        {
          "preg": "¿Por qué se dijeron adiós?",
          "audio": A("p07_b", "¿Por qué se dijeron adiós?"),
          "opc": [
            "Porque se querían y cada uno sería infeliz lejos de su mundo",
            "Porque se enojaron",
            "Porque se aburrieron",
            "Porque un barco los separó"
          ],
          "conf": A("p07_bc", "Porque se querían tanto que deseaban que el otro fuera feliz en su propio mundo.")
        },
        {
          "preg": "¿Qué pasó después de la despedida?",
          "audio": A("p07_c", "¿Qué pasó después de la despedida?"),
          "opc": [
            "Nunca se olvidaron el uno del otro",
            "Se olvidaron enseguida",
            "Volvieron a vivir juntos",
            "La ballena aprendió a volar"
          ],
          "conf": A("p07_cc", "Nunca se olvidaron: cada vez que veían un pájaro o una ballena, pensaban en el otro.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Quién lo dijo?",
      "vis": {
        "t": "txt",
        "h": "💬"
      },
      "deco": "mares_cierre.jpg",
      "pista": A("p08_p", "Pensá en qué lugar vive cada personaje."),
      "instr": A("p08_i", "En el cuento, los personajes hablan. Las partes dialogadas están entre comillas."),
      "items": [
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">«Ven conmigo donde hay aguas cálidas.»</div>"
          },
          "preg": "¿Quién lo dijo?",
          "audio": A("p08_a", "Ven conmigo donde hay aguas cálidas. ¿Quién lo dijo?"),
          "opc": [
            "La ballena",
            "El pájaro",
            "El narrador",
            "Un pescador"
          ],
          "conf": A("p08_ac", "La ballena: quería llevar al pájaro a las aguas cálidas.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">«Mejor ven conmigo. Vivo arriba, en los acantilados.»</div>"
          },
          "preg": "¿Quién lo dijo?",
          "audio": A("p08_b", "Mejor ven conmigo. Vivo arriba, en los acantilados. ¿Quién lo dijo?"),
          "opc": [
            "El pájaro",
            "La ballena",
            "El narrador",
            "Una gaviota"
          ],
          "conf": A("p08_bc", "El pájaro: vive en los acantilados.")
        },
        {
          "vis": {
            "t": "txt",
            "h": "<div class=\"grande\">El verano se transformó en otoño, y el otoño en invierno.</div>"
          },
          "preg": "Esta oración, ¿es un <b>diálogo</b> o es parte de la <b>narración</b>?",
          "audio": A("p08_c", "El verano se transformó en otoño, y el otoño en invierno. ¿Es un diálogo o parte de la narración?"),
          "opc": [
            "Narración: la cuenta el narrador",
            "Diálogo: la dice la ballena",
            "Diálogo: la dice el pájaro",
            "Es un título"
          ],
          "conf": A("p08_cc", "Es narración: no está entre comillas, la cuenta el narrador.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Realidad o fantasía",
      "vf": true,
      "vis": {
        "t": "txt",
        "h": "<div class=\"grande\">¿Verdadero o falso <b>en la vida real</b>?</div>"
      },
      "deco": "icono_ballena.jpg",
      "pista": A("p09_p", "Pensá en lo que aprendiste en los textos científicos."),
      "instr": A("p09_i", "El cuento mezcla datos reales y fantasía. Decidí si cada frase es verdadera o falsa en la vida real."),
      "items": [
        {
          "preg": "Muchas ballenas viajan hacia aguas más cálidas cuando llega el frío.",
          "audio": A("p09_a", "Muchas ballenas viajan hacia aguas más cálidas cuando llega el frío."),
          "v": true,
          "conf": A("p09_ac", "Verdadero: muchas ballenas migran. Es un dato real dentro del cuento.")
        },
        {
          "preg": "Un pájaro y una ballena pueden conversar y contarse chistes.",
          "audio": A("p09_b", "Un pájaro y una ballena pueden conversar y contarse chistes."),
          "v": false,
          "conf": A("p09_bc", "Falso: que los animales hablen es fantasía.")
        },
        {
          "preg": "Un pájaro no puede respirar bajo el agua.",
          "audio": A("p09_c", "Un pájaro no puede respirar bajo el agua."),
          "v": true,
          "conf": A("p09_cc", "Verdadero: respira aire, como en el cuento.")
        },
        {
          "preg": "Una ballena puede aprender a volar si bate fuerte sus aletas.",
          "audio": A("p09_d", "Una ballena puede aprender a volar si bate fuerte sus aletas."),
          "v": false,
          "conf": A("p09_dc", "Falso: su cuerpo está hecho para nadar, no para volar.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Lo que dicen las Ciencias Naturales",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "icono_ballena.jpg",
            "h": 24
          },
          {
            "t": "img",
            "src": "mares_cierre.jpg",
            "h": 24
          }
        ]
      },
      "pista": A("p10_p", "Pensá cómo es el cuerpo de cada animal y dónde vive."),
      "instr": A("p10_i", "Respondemos los porqués del cuento con información científica."),
      "items": [
        {
          "preg": "¿Por qué la ballena <b>no puede</b> ser pájaro?",
          "audio": A("p10_a", "¿Por qué la ballena no puede ser pájaro?"),
          "opc": [
            "No tiene alas ni plumas, y es muy pesada",
            "Porque no quiere",
            "Porque es de noche",
            "Porque tiene miedo"
          ],
          "conf": A("p10_ac", "Su cuerpo enorme, con aletas, está adaptado para nadar, no para volar.")
        },
        {
          "preg": "¿Por qué el pájaro <b>no puede</b> ser ballena?",
          "audio": A("p10_b", "¿Por qué el pájaro no puede ser ballena?"),
          "opc": [
            "Su cuerpo no está adaptado para sumergirse mucho tiempo",
            "Porque no sabe cantar",
            "Porque es muy grande",
            "Porque no le gusta el agua"
          ],
          "conf": A("p10_bc", "No puede aguantar la respiración ni bajar a grandes profundidades como la ballena.")
        },
        {
          "preg": "¿Por qué se conocieron en <b>verano</b>?",
          "audio": A("p10_c", "¿Por qué el pájaro y la ballena se conocieron en verano?"),
          "opc": [
            "Porque en verano la ballena está en la bahía, y en invierno migra",
            "Porque en verano los pájaros nadan",
            "Porque en invierno no hay bahías",
            "Por casualidad, sin motivo"
          ],
          "conf": A("p10_cc", "En verano la ballena estaba en esa bahía; con el frío viajó a aguas cálidas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "El cuento por dentro",
      "vis": {
        "t": "img",
        "src": "guia_pensar.jpg",
        "h": 30
      },
      "pista": A("p11_p", "Pensá cómo empieza, qué problema aparece y cómo termina."),
      "instr": A("p11_i", "¡Es momento de ponernos a pensar en el cuento!"),
      "items": [
        {
          "preg": "¿Cuál es el <b>conflicto</b> del cuento?",
          "audio": A("p11_a", "¿Cuál es el conflicto o problema del cuento?"),
          "opc": [
            "Se quieren, pero viven en mundos distintos",
            "El pájaro pierde sus plumas",
            "Un barco atrapa a la ballena",
            "La bahía se seca"
          ],
          "conf": A("p11_ac", "Se quieren, pero uno vive en el aire y el otro en el agua.")
        },
        {
          "preg": "¿Quién cuenta la historia?",
          "audio": A("p11_b", "¿Quién cuenta la historia?"),
          "opc": [
            "Un narrador que no es personaje",
            "El pájaro",
            "La ballena",
            "Un científico"
          ],
          "conf": A("p11_bc", "Un narrador en tercera persona, que no participa de la historia.")
        },
        {
          "preg": "¿Qué enseñanza deja el cuento?",
          "audio": A("p11_c", "¿Qué enseñanza deja el cuento?"),
          "opc": [
            "Querer a alguien es desear que sea feliz, aunque sea lejos",
            "Hay que obligar a los demás a cambiar",
            "Los pájaros son mejores que las ballenas",
            "No hay que tener amigos"
          ],
          "conf": A("p11_cc", "Querer de verdad es respetar lo que el otro necesita para ser feliz.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del cuento",
      "n": 11,
      "img": "mares_cierre.jpg",
      "instr": A("p12_i", "Buscá en la sopa de letras siete palabras del cuento. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "PAJARO",
          "audio": A("p12_1", "Pájaro: vive en los acantilados.")
        },
        {
          "w": "BALLENA",
          "audio": A("p12_2", "Ballena: le encanta nadar profundo.")
        },
        {
          "w": "BAHIA",
          "audio": A("p12_3", "Bahía: donde se conocieron.")
        },
        {
          "w": "VERANO",
          "audio": A("p12_4", "Verano: la estación del encuentro.")
        },
        {
          "w": "INVIERNO",
          "audio": A("p12_5", "Invierno: las ballenas parten.")
        },
        {
          "w": "OCEANO",
          "audio": A("p12_6", "Océano: el mundo de la ballena.")
        },
        {
          "w": "CIELO",
          "audio": A("p12_7", "Cielo: el mundo del pájaro.")
        }
      ],
      "fin": A("p12_f", "¡Encontraste todas las palabras!")
    },
    {
      "tipo": "cierre",
      "audio": A("cierre3", "¡Felicitaciones! Terminaste «El pájaro y la ballena». Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
