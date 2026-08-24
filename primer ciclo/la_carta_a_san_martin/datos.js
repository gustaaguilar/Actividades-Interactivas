// datos.js — "La Carta y San Martín" — 3er grado, Lengua + Efemérides Agosto
const DATOS = {
  "titulo": "La Carta y San Martín",
  "fotoPerfil": "assets/images/profe.jpg",
  "contactoTexto": "💻 Informática Educativa · Profe Gustavo Aguilar",
  "contactoMail": "profegustaaguilar@gmail.com",
  "pantallas": [
    {
      "id": 1,
      "tipo": "portada",
      "titulo": "La Carta y San Martín",
      "subtitulo": "¿Existen los superhéroes?",
      "imagen": "assets/images/portada_san_martin.jpg"
    },
    {
      "id": 2,
      "tipo": "narracion",
      "modulo": "Módulo 1: San Martín, un superhéroe",
      "texto": "Los superhéroes se reconocen por sus poderes. Pero hay otro tipo de héroe: el que no tiene poderes mágicos y aun así hace cosas extraordinarias. José de San Martín fue un gran general y un gran padre. Su debilidad era su familia: su esposa y su hija, por las que daría la vida. Su gran obsesión fue la libertad de los pueblos americanos. Descubrió sus poderes con el tiempo, entrenándose como soldado desde muy chico.",
      "audio": "assets/audio/m01_intro.mp3",
      "imagen": "assets/images/portada_san_martin.jpg"
    },
    {
      "id": 3,
      "tipo": "narracion",
      "modulo": "Módulo 2: Leemos la carta de Lucas",
      "texto": "Jueves 1 de agosto de 2026, Lavalle, Mendoza.\n\nQuerido San Martín:\n\nDesde que tengo memoria me interesaron los superhéroes, quizás sea porque desde muy pequeño veíamos junto a mi papá, los sábados por la tarde, películas de héroes por YouTube, y otras veces mirábamos los libros de la biblioteca de casa.",
      "audioIntro": "assets/audio/m02_intro.mp3",
      "audio": "assets/audio/m02_carta1.mp3",
      "imagen": "assets/images/carta_lucas.jpg",
      "animada": true
    },
    {
      "id": 4,
      "tipo": "narracion",
      "modulo": "Módulo 2: Leemos la carta de Lucas",
      "texto": "Un día mi papá me propuso ver los capítulos de \"La asombrosa excursión de Zamba\", que hoy puedo decir que es mi favorita. Allí pude conocerte, José, saber un poco de tu vida y de la maravillosa aventura que realizaste para liberar a nuestro país, a Chile y a Perú. Estoy feliz de conocer tu historia.",
      "audio": "assets/audio/m02_carta2.mp3",
      "imagen": "assets/images/carta_lucas.jpg",
      "animada": true
    },
    {
      "id": 5,
      "tipo": "narracion",
      "modulo": "Módulo 2: Leemos la carta de Lucas",
      "texto": "Usted es una persona, un superhéroe, al que he aprendido a querer mucho, aunque no lo pueda conocer. ¡Gracias por ser el valiente hombre al que todos los argentinos queremos!\n\nLucas",
      "audio": "assets/audio/m02_carta3.mp3",
      "imagen": "assets/images/carta_lucas.jpg",
      "animada": true
    },
    {
      "id": 6,
      "tipo": "sopaDeLetras",
      "modulo": "Sopa de letras: la carta de Lucas",
      "instruccion": "Buscá en la sopa 5 sustantivos y 5 verbos de la carta de Lucas.",
      "audio": "assets/audio/m11_instruccion.mp3",
      "palabras": [
        "HEROES",
        "LIBROS",
        "PAIS",
        "HISTORIA",
        "PROPUSO",
        "SABER",
        "LIBERAR",
        "QUERER"
      ],
      "audiosPalabras": {
        "HEROES": "assets/audio/sopa_heroes.mp3",
        "LIBROS": "assets/audio/sopa_libros.mp3",
        "PAIS": "assets/audio/sopa_pais.mp3",
        "HISTORIA": "assets/audio/sopa_historia.mp3",
        "PROPUSO": "assets/audio/sopa_propuso.mp3",
        "SABER": "assets/audio/sopa_saber.mp3",
        "LIBERAR": "assets/audio/sopa_liberar.mp3",
        "QUERER": "assets/audio/sopa_querer.mp3"
      }
    },
    {
      "id": 7,
      "tipo": "multiple",
      "modulo": "Módulo 3: ¿Qué tipo de texto es?",
      "instruccion": "Pensá en la carta que leíste y marcá la opción correcta.",
      "audioInstruccion": "assets/audio/m03_instruccion.mp3",
      "imagen": "assets/images/reflexion_texto.jpg",
      "preguntas": [
        {
          "pregunta": "¿Qué tipo de texto es?",
          "opciones": [
            {
              "texto": "Informativo",
              "audio": "assets/audio/m03_p1_op1.mp3"
            },
            {
              "texto": "Narrativo",
              "audio": "assets/audio/m03_p1_op2.mp3"
            },
            {
              "texto": "Expositivo",
              "audio": "assets/audio/m03_p1_op3.mp3"
            }
          ],
          "correcta": "Narrativo",
          "audio": "assets/audio/m03_p1.mp3",
          "audioConfirma": "assets/audio/m03_p1_confirma.mp3",
          "fundamento": "Correcto, es narrativo porque Lucas cuenta una historia con un orden: primero, después y al final."
        },
        {
          "pregunta": "Según su tipología textual, ¿qué es?",
          "opciones": [
            {
              "texto": "Una narración",
              "audio": "assets/audio/m03_p2_op1.mp3"
            },
            {
              "texto": "Una carta",
              "audio": "assets/audio/m03_p2_op2.mp3"
            },
            {
              "texto": "Una receta",
              "audio": "assets/audio/m03_p2_op3.mp3"
            }
          ],
          "correcta": "Una carta",
          "audio": "assets/audio/m03_p2.mp3",
          "audioConfirma": "assets/audio/m03_p2_confirma.mp3",
          "fundamento": "Correcto, es una carta porque tiene fecha, saludo, mensaje y firma, como la que escribió Lucas."
        },
        {
          "pregunta": "¿Cuál es su intención?",
          "opciones": [
            {
              "texto": "Transmitir e informar",
              "audio": "assets/audio/m03_p3_op1.mp3"
            },
            {
              "texto": "Describir",
              "audio": "assets/audio/m03_p3_op2.mp3"
            },
            {
              "texto": "Convencer",
              "audio": "assets/audio/m03_p3_op3.mp3"
            }
          ],
          "correcta": "Transmitir e informar",
          "audio": "assets/audio/m03_p3.mp3",
          "audioConfirma": "assets/audio/m03_p3_confirma.mp3",
          "fundamento": "Correcto, Lucas quiere contarle a San Martín lo que siente y lo que aprendió de su historia."
        }
      ]
    },
    {
      "id": 8,
      "tipo": "clasificar",
      "modulo": "Módulo 4: La palabra \"carta\"",
      "instruccion": "La palabra \"carta\" tiene distintos significados. Tocá cada frase y llevala a su significado.",
      "audio": "assets/audio/m04_instruccion.mp3",
      "items": [
        {
          "texto": "Las noticias de aquella carta le produjeron una gran alegría.",
          "categoria": "Carta (mensaje)",
          "audio": "assets/audio/m04_frase1.mp3",
          "audioConfirma": "assets/audio/m04_confirma1.mp3"
        },
        {
          "texto": "En la carta náutica se apreciaban las islas donde vivían los piratas.",
          "categoria": "Mapa",
          "audio": "assets/audio/m04_frase2.mp3",
          "audioConfirma": "assets/audio/m04_confirma2.mp3"
        },
        {
          "texto": "El truco de magia consistía en averiguar la carta que un espectador había elegido.",
          "categoria": "Naipe",
          "audio": "assets/audio/m04_frase3.mp3",
          "audioConfirma": "assets/audio/m04_confirma3.mp3"
        },
        {
          "texto": "Todos los días no se puede comer a la carta en el restaurante porque es muy caro.",
          "categoria": "Menú",
          "audio": "assets/audio/m04_frase4.mp3",
          "audioConfirma": "assets/audio/m04_confirma4.mp3"
        }
      ],
      "categorias": [
        "Carta (mensaje)",
        "Mapa",
        "Naipe",
        "Menú"
      ],
      "resumenFinal": {
        "texto": "Estos son los distintos tipos de carta.",
        "audio": "assets/audio/m04_resumen.mp3",
        "imagenes": [
          {
            "src": "assets/images/carta_mensaje.jpg",
            "etiqueta": "Carta (mensaje)"
          },
          {
            "src": "assets/images/carta_mapa.jpg",
            "etiqueta": "Mapa"
          },
          {
            "src": "assets/images/carta_naipe.jpg",
            "etiqueta": "Naipe"
          },
          {
            "src": "assets/images/carta_menu.jpg",
            "etiqueta": "Menú"
          }
        ]
      }
    },
    {
      "id": 9,
      "tipo": "infografia",
      "modulo": "Módulo 5: Partes de la carta",
      "instruccion": "Tocá cada número para conocer las partes de la carta.",
      "audioIntro": "assets/audio/m05_infografia_intro.mp3",
      "puntos": [
        {
          "id": "fecha",
          "numero": 1,
          "titulo": "Lugar y fecha",
          "contenido": "Nombre de la ciudad y el día en que fue escrita.",
          "audioNombre": "assets/audio/m05_etiqueta_fecha.mp3",
          "audioExplica": "assets/audio/m05_funcion_fecha.mp3",
          "x": 40,
          "y": 17
        },
        {
          "id": "saludo",
          "numero": 2,
          "titulo": "Saludo",
          "contenido": "Palabras con que se dirige a quien va destinada la carta.",
          "audioNombre": "assets/audio/m05_etiqueta_saludo.mp3",
          "audioExplica": "assets/audio/m05_funcion_saludo.mp3",
          "x": 43,
          "y": 27
        },
        {
          "id": "cuerpo",
          "numero": 3,
          "titulo": "Cuerpo",
          "contenido": "Es donde se dice lo que se quiere contar.",
          "audioNombre": "assets/audio/m05_etiqueta_cuerpo.mp3",
          "audioExplica": "assets/audio/m05_funcion_cuerpo.mp3",
          "x": 48,
          "y": 48
        },
        {
          "id": "despedida",
          "numero": 4,
          "titulo": "Despedida",
          "contenido": "Frase con que se termina la carta.",
          "audioNombre": "assets/audio/m05_etiqueta_despedida.mp3",
          "audioExplica": "assets/audio/m05_funcion_despedida.mp3",
          "x": 42,
          "y": 74
        },
        {
          "id": "firma",
          "numero": 5,
          "titulo": "Firma",
          "contenido": "Nombre de quien escribió la carta.",
          "audioNombre": "assets/audio/m05_etiqueta_firma.mp3",
          "audioExplica": "assets/audio/m05_funcion_firma.mp3",
          "x": 61,
          "y": 83
        }
      ],
      "imagenFondo": "assets/images/carta_infografia.jpg"
    },
    {
      "id": 10,
      "tipo": "asociar",
      "modulo": "Módulo 5: Partes de la carta",
      "instruccion": "Uní cada parte de la carta con lo que significa.",
      "audio": "assets/audio/m05_instruccion_asociar.mp3",
      "pares": [
        {
          "concepto": "Lugar y fecha",
          "funcion": "Nombre de la ciudad y el día en que fue escrita",
          "audioConcepto": "assets/audio/m05_concepto_fecha.mp3",
          "audioFuncion": "assets/audio/m05_funcion_fecha.mp3"
        },
        {
          "concepto": "Saludo",
          "funcion": "Palabras con que se dirige a quien va destinada la carta",
          "audioConcepto": "assets/audio/m05_concepto_saludo.mp3",
          "audioFuncion": "assets/audio/m05_funcion_saludo.mp3"
        },
        {
          "concepto": "Cuerpo",
          "funcion": "Es donde se dice lo que se quiere contar",
          "audioConcepto": "assets/audio/m05_concepto_cuerpo.mp3",
          "audioFuncion": "assets/audio/m05_funcion_cuerpo.mp3"
        },
        {
          "concepto": "Despedida",
          "funcion": "Frase con que se termina la carta",
          "audioConcepto": "assets/audio/m05_concepto_despedida.mp3",
          "audioFuncion": "assets/audio/m05_funcion_despedida.mp3"
        },
        {
          "concepto": "Firma",
          "funcion": "Nombre de quien escribió la carta",
          "audioConcepto": "assets/audio/m05_concepto_firma.mp3",
          "audioFuncion": "assets/audio/m05_funcion_firma.mp3"
        }
      ]
    },
    {
      "id": 11,
      "tipo": "colocar",
      "modulo": "Módulo 5: Partes de la carta",
      "instruccion": "Tocá el nombre de la parte y después el espacio de la carta donde corresponde.",
      "audio": "assets/audio/m05_instruccion_colocar.mp3",
      "layout": "vertical",
      "zonas": [
        {
          "id": "fecha",
          "contenido": "Jueves 1 de agosto de 2026, Lavalle, Mendoza.",
          "audioConfirma": "assets/audio/m05_colocar_fecha.mp3"
        },
        {
          "id": "saludo",
          "contenido": "Querido San Martín:",
          "audioConfirma": "assets/audio/m05_colocar_saludo.mp3"
        },
        {
          "id": "cuerpo",
          "contenido": "Desde que tengo memoria me interesaron los superhéroes… (todo el relato de Lucas sobre cómo conoció a San Martín)",
          "audioConfirma": "assets/audio/m05_colocar_cuerpo.mp3"
        },
        {
          "id": "despedida",
          "contenido": "Usted es una persona, un superhéroe… ¡Gracias por ser el valiente hombre al que todos los argentinos queremos!",
          "audioConfirma": "assets/audio/m05_colocar_despedida.mp3"
        },
        {
          "id": "firma",
          "contenido": "Lucas",
          "audioConfirma": "assets/audio/m05_colocar_firma.mp3"
        }
      ],
      "etiquetas": [
        {
          "id": "fecha",
          "texto": "Lugar y fecha",
          "audio": "assets/audio/m05_etiqueta_fecha.mp3"
        },
        {
          "id": "saludo",
          "texto": "Saludo",
          "audio": "assets/audio/m05_etiqueta_saludo.mp3"
        },
        {
          "id": "cuerpo",
          "texto": "Cuerpo",
          "audio": "assets/audio/m05_etiqueta_cuerpo.mp3"
        },
        {
          "id": "despedida",
          "texto": "Despedida",
          "audio": "assets/audio/m05_etiqueta_despedida.mp3"
        },
        {
          "id": "firma",
          "texto": "Firma",
          "audio": "assets/audio/m05_etiqueta_firma.mp3"
        }
      ]
    },
    {
      "id": 12,
      "tipo": "sopaDeLetras",
      "modulo": "Sopa de letras: partes de la carta",
      "instruccion": "Buscá en la sopa las partes de la carta que acabás de aprender.",
      "audio": "assets/audio/sopa2_instruccion.mp3",
      "palabras": [
        "FECHA",
        "SALUDO",
        "CUERPO",
        "FIRMA",
        "DESPEDIDA",
        "REMITENTE"
      ],
      "audiosPalabras": {
        "FECHA": "assets/audio/sopa_fecha.mp3",
        "SALUDO": "assets/audio/sopa_saludo.mp3",
        "CUERPO": "assets/audio/sopa_cuerpo.mp3",
        "FIRMA": "assets/audio/sopa_firma.mp3",
        "DESPEDIDA": "assets/audio/sopa_despedida.mp3",
        "REMITENTE": "assets/audio/sopa_remitente.mp3"
      }
    },
    {
      "id": 13,
      "tipo": "narracion",
      "modulo": "Módulo 6: El correo",
      "texto": "El correo existe desde hace mucho tiempo y sirvió para comunicar a las personas y a los pueblos. Gracias a él viajaron noticias, ideas y culturas de un lugar a otro. Las cartas fueron mensajeras de alegría y, a veces, de dolor: llevaron cartas, tarjetas, documentos y hasta regalos. Con el tiempo, el correo fue cambiando, hasta llegar al correo electrónico, que hoy nos permite comunicarnos desde cualquier parte del mundo en segundos.",
      "audio": "assets/audio/m06_correo.mp3",
      "audioCierre": "assets/audio/m06_cierre_consigna.mp3",
      "imagen": "assets/images/correo_antiguo.jpg"
    },
    {
      "id": 14,
      "tipo": "clasificar",
      "modulo": "Módulo 6: El correo",
      "instruccion": "Tocá cada frase y llevala a donde corresponde, según lo que dice el texto.",
      "audioPrevio": "assets/audio/m06_previo_consigna.mp3",
      "audio": "assets/audio/m06_instruccion_clasificar.mp3",
      "volverA": {
        "titulo": "El correo",
        "texto": "El correo existe desde hace mucho tiempo y sirvió para comunicar a las personas y a los pueblos. Gracias a él viajaron noticias, ideas y culturas de un lugar a otro. Las cartas fueron mensajeras de alegría y, a veces, de dolor: llevaron cartas, tarjetas, documentos y hasta regalos. Con el tiempo, el correo fue cambiando, hasta llegar al correo electrónico, que hoy nos permite comunicarnos desde cualquier parte del mundo en segundos.",
        "imagen": "assets/images/correo_antiguo.jpg",
        "audio": "assets/audio/m06_correo.mp3"
      },
      "items": [
        {
          "texto": "Las cartas las llevan mensajeros con alegría y, a veces, dolor.",
          "categoria": "Lo dice",
          "audio": "assets/audio/m06_frase1.mp3",
          "audioConfirma": "assets/audio/m06_confirma1.mp3"
        },
        {
          "texto": "En los lugares donde hay correo hay desarrollo social y económico.",
          "categoria": "Lo dice",
          "audio": "assets/audio/m06_frase2.mp3",
          "audioConfirma": "assets/audio/m06_confirma2.mp3"
        },
        {
          "texto": "Actualmente ya no se escriben cartas.",
          "categoria": "No lo dice",
          "audio": "assets/audio/m06_frase3.mp3",
          "audioConfirma": "assets/audio/m06_confirma3.mp3"
        }
      ],
      "categorias": [
        "Lo dice",
        "No lo dice"
      ]
    },
    {
      "id": 15,
      "tipo": "infografia",
      "modulo": "Módulo 7: El sobre",
      "instruccion": "Tocá cada número para conocer las partes del sobre.",
      "audioIntro": "assets/audio/m07_infografia_intro.mp3",
      "audioCierre": "assets/audio/m07_infografia_cierre.mp3",
      "puntos": [
        {
          "id": "remitente",
          "numero": 1,
          "titulo": "Remitente",
          "contenido": "Nombre, dirección, código postal, localidad, provincia y país de quien envía la carta.",
          "audioNombre": "assets/audio/m07_etiqueta_remitente.mp3",
          "audioExplica": "assets/audio/m07_colocar_remitente.mp3",
          "x": 38,
          "y": 31
        },
        {
          "id": "sello",
          "numero": 2,
          "titulo": "Sello",
          "contenido": "Espacio para pegar la estampilla postal.",
          "audioNombre": "assets/audio/m07_etiqueta_sello.mp3",
          "audioExplica": "assets/audio/m07_colocar_sello.mp3",
          "x": 66,
          "y": 32
        },
        {
          "id": "destinatario",
          "numero": 3,
          "titulo": "Destinatario",
          "contenido": "Nombre, dirección, código postal, localidad, provincia y país de quien recibe la carta.",
          "audioNombre": "assets/audio/m07_etiqueta_destinatario.mp3",
          "audioExplica": "assets/audio/m07_colocar_destinatario.mp3",
          "x": 52,
          "y": 55
        }
      ],
      "imagenFondo": "assets/images/sobre_infografia.jpg"
    },
    {
      "id": 16,
      "tipo": "colocar",
      "modulo": "Módulo 7: El sobre",
      "instruccion": "Tocá cada nombre y después el espacio del sobre donde va.",
      "audioPrevio": "assets/audio/m07_previo_consigna.mp3",
      "audio": "assets/audio/m07_instruccion_colocar.mp3",
      "layout": "sobre",
      "volverA": {
        "titulo": "El sobre",
        "texto": "Las cartas en papel se envían dentro de un sobre. El sobre lleva los datos del remitente, que es quien la envía; los datos del destinatario, que es quien la recibe; y un espacio para pegar el sello o estampilla postal.",
        "imagen": "assets/images/sobre_ilustrado.jpg",
        "audio": "assets/audio/m07_informativo.mp3"
      },
      "zonas": [
        {
          "id": "remitente",
          "contenido": "Nombre, dirección, código postal, localidad, provincia y país de quien envía la carta.",
          "audioConfirma": "assets/audio/m07_colocar_remitente.mp3"
        },
        {
          "id": "sello",
          "contenido": "Espacio para pegar la estampilla postal.",
          "audioConfirma": "assets/audio/m07_colocar_sello.mp3"
        },
        {
          "id": "destinatario",
          "contenido": "Nombre, dirección, código postal, localidad, provincia y país de quien recibe la carta.",
          "audioConfirma": "assets/audio/m07_colocar_destinatario.mp3"
        }
      ],
      "etiquetas": [
        {
          "id": "remitente",
          "texto": "Remitente",
          "audio": "assets/audio/m07_etiqueta_remitente.mp3"
        },
        {
          "id": "sello",
          "texto": "Sello",
          "audio": "assets/audio/m07_etiqueta_sello.mp3"
        },
        {
          "id": "destinatario",
          "texto": "Destinatario",
          "audio": "assets/audio/m07_etiqueta_destinatario.mp3"
        }
      ]
    },
    {
      "id": 17,
      "tipo": "ordenar",
      "modulo": "Módulo 8: Ordenamos la carta de Lucas",
      "instruccion": "Tocá los bloques en el orden correcto para armar la carta de Lucas. Recordá: la carta empieza con la fecha y termina con la firma.",
      "audio": "assets/audio/m08_instruccion.mp3",
      "items": [
        "Jueves 1 de agosto de 2026, Lavalle, Mendoza.",
        "Querido San Martín:",
        "Desde que tengo memoria me interesaron los superhéroes… Un día mi papá me propuso ver los capítulos de \"La asombrosa excursión de Zamba\".",
        "Usted es una persona, un superhéroe… ¡Gracias por ser el valiente hombre al que todos los argentinos queremos!",
        "Lucas"
      ],
      "oracionAudio": "assets/audio/m08_carta_completa.mp3"
    },
    {
      "id": 18,
      "tipo": "secuenciaTexto",
      "modulo": "Módulo 9: El mensaje de WhatsApp",
      "tituloIntro": "Un mensaje de texto también tiene partes:",
      "audioIntro": "assets/audio/m09_intro_partes.mp3",
      "bloques": [
        {
          "titulo": "El saludo",
          "texto": "Hola, ¡Hola!, Querido amigo.",
          "audio": "assets/audio/m09_parte_saludo.mp3"
        },
        {
          "titulo": "El mensaje",
          "texto": "Contar una noticia, hacer una pregunta o compartir algo.",
          "audio": "assets/audio/m09_parte_mensaje.mp3"
        },
        {
          "titulo": "La despedida",
          "texto": "Chau, Hasta pronto, Un abrazo.",
          "audio": "assets/audio/m09_parte_despedida.mp3"
        },
        {
          "titulo": "El nombre",
          "texto": "Y el nombre de quien lo envía.",
          "audio": "assets/audio/m09_parte_nombre.mp3"
        }
      ],
      "ejemplo": {
        "titulo": "Mirá el ejemplo de Sofía:",
        "imagen": "assets/images/chica_celular.jpg",
        "audioIntro": "assets/audio/m09_ejemplo_intro.mp3",
        "bloques": [
          {
            "titulo": "Saludo",
            "texto": "Hola, Pedro.",
            "audio": "assets/audio/m09_ejemplo_saludo.mp3"
          },
          {
            "titulo": "Mensaje",
            "texto": "Hoy ayudé a mi familia a ordenar los libros que tengo en mi casa y escuché que el general San Martín cruzó la Cordillera de los Andes junto a sus soldados para liberar a Chile. ¿En tu pueblo también hablan de él?",
            "audio": "assets/audio/m09_ejemplo_mensaje.mp3"
          },
          {
            "titulo": "Despedida",
            "texto": "¡Te mando muchos saludos para ti y tu familia!",
            "audio": "assets/audio/m09_ejemplo_despedida.mp3"
          },
          {
            "titulo": "Nombre",
            "texto": "Sofía.",
            "audio": "assets/audio/m09_ejemplo_nombre.mp3"
          }
        ]
      }
    },
    {
      "id": 19,
      "tipo": "colocar",
      "modulo": "Módulo 9: El mensaje de WhatsApp",
      "instruccion": "Tocá cada parte y después el espacio del mensaje de Sofía donde va.",
      "audio": "assets/audio/m09_instruccion_colocar.mp3",
      "layout": "vertical",
      "zonas": [
        {
          "id": "saludo",
          "contenido": "Hola, Pedro.",
          "audioConfirma": "assets/audio/m09_colocar_saludo.mp3"
        },
        {
          "id": "mensaje",
          "contenido": "Hoy ayudé a mi familia a ordenar los libros que tengo en mi casa y escuché que el general San Martín cruzó la Cordillera de los Andes junto a sus soldados para liberar a Chile. ¿En tu pueblo también hablan de él?",
          "audioConfirma": "assets/audio/m09_colocar_mensaje.mp3"
        },
        {
          "id": "despedida",
          "contenido": "¡Te mando muchos saludos para ti y tu familia!",
          "audioConfirma": "assets/audio/m09_colocar_despedida.mp3"
        },
        {
          "id": "nombre",
          "contenido": "Sofía.",
          "audioConfirma": "assets/audio/m09_colocar_nombre.mp3"
        }
      ],
      "etiquetas": [
        {
          "id": "saludo",
          "texto": "Saludo",
          "audio": "assets/audio/m09_etiqueta_saludo.mp3"
        },
        {
          "id": "mensaje",
          "texto": "Mensaje",
          "audio": "assets/audio/m09_etiqueta_mensaje.mp3"
        },
        {
          "id": "despedida",
          "texto": "Despedida",
          "audio": "assets/audio/m09_etiqueta_despedida.mp3"
        },
        {
          "id": "nombre",
          "texto": "Nombre",
          "audio": "assets/audio/m09_etiqueta_nombre.mp3"
        }
      ]
    },
    {
      "id": 20,
      "tipo": "narracion",
      "modulo": "Módulo 10: Del correo a WhatsApp",
      "texto": "Hace más de 200 años, cuando el general José de San Martín vivía en Mendoza, no existían los celulares ni WhatsApp. Para comunicarse con otras personas escribía cartas, que eran llevadas por el correo o por mensajeros a caballo. Esos mensajes eran muy importantes para organizar el Ejército de los Andes y preparar el Cruce de los Andes. Hoy, gracias a la tecnología, podemos enviar mensajes por WhatsApp en pocos segundos y comunicarnos con familiares y amigos desde cualquier lugar.",
      "audio": "assets/audio/m10_lectura.mp3",
      "imagen": "assets/images/correo_whatsapp.jpg"
    },
    {
      "id": 21,
      "tipo": "clasificar",
      "modulo": "Módulo 10: Del correo a WhatsApp",
      "instruccion": "Tocá cada palabra y llevala a Antes o a Ahora, según cuándo se usaba.",
      "audio": "assets/audio/m10_instruccion_antesahora.mp3",
      "items": [
        {
          "texto": "Mensajeros a caballo",
          "categoria": "Antes",
          "audio": "assets/audio/m10_item1.mp3",
          "audioConfirma": "assets/audio/m10_confirma1.mp3"
        },
        {
          "texto": "Cartas en papel",
          "categoria": "Antes",
          "audio": "assets/audio/m10_item2.mp3",
          "audioConfirma": "assets/audio/m10_confirma2.mp3"
        },
        {
          "texto": "Días de espera para recibir noticias",
          "categoria": "Antes",
          "audio": "assets/audio/m10_item3.mp3",
          "audioConfirma": "assets/audio/m10_confirma3.mp3"
        },
        {
          "texto": "Mensajes de WhatsApp",
          "categoria": "Ahora",
          "audio": "assets/audio/m10_item4.mp3",
          "audioConfirma": "assets/audio/m10_confirma4.mp3"
        },
        {
          "texto": "Mensajes que llegan en segundos",
          "categoria": "Ahora",
          "audio": "assets/audio/m10_item5.mp3",
          "audioConfirma": "assets/audio/m10_confirma5.mp3"
        }
      ],
      "categorias": [
        "Antes",
        "Ahora"
      ]
    },
    {
      "id": 22,
      "tipo": "clasificar",
      "modulo": "Módulo 10: Del correo a WhatsApp",
      "instruccion": "Tocá cada frase y decidí si es Verdadero o Falso.",
      "audio": "assets/audio/m10_instruccion_vf.mp3",
      "items": [
        {
          "texto": "San Martín enviaba mensajes por WhatsApp.",
          "categoria": "Falso",
          "audio": "assets/audio/m10_vf1.mp3",
          "audioConfirma": "assets/audio/m10_vf1_confirma.mp3"
        },
        {
          "texto": "Las cartas viajaban por correo.",
          "categoria": "Verdadero",
          "audio": "assets/audio/m10_vf2.mp3",
          "audioConfirma": "assets/audio/m10_vf2_confirma.mp3"
        },
        {
          "texto": "San Martín organizó el Ejército de los Andes en Mendoza.",
          "categoria": "Verdadero",
          "audio": "assets/audio/m10_vf3.mp3",
          "audioConfirma": "assets/audio/m10_vf3_confirma.mp3"
        },
        {
          "texto": "Hoy los mensajes llegan muy rápido.",
          "categoria": "Verdadero",
          "audio": "assets/audio/m10_vf4.mp3",
          "audioConfirma": "assets/audio/m10_vf4_confirma.mp3"
        }
      ],
      "categorias": [
        "Verdadero",
        "Falso"
      ]
    },
    {
      "id": 23,
      "tipo": "sopaDeLetras",
      "modulo": "Sopa de letras: vocabulario del paquete",
      "instruccion": "Buscá en la sopa palabras que aparecieron en todo el paquete.",
      "audio": "assets/audio/sopa3_instruccion.mp3",
      "palabras": [
        "ANDES",
        "LIBERTAD",
        "HEROE",
        "CORREO",
        "EJERCITO",
        "MENDOZA",
        "WHATSAPP",
        "TECNOLOGIA"
      ],
      "audiosPalabras": {
        "ANDES": "assets/audio/sopa_andes.mp3",
        "LIBERTAD": "assets/audio/sopa_libertad.mp3",
        "HEROE": "assets/audio/sopa_heroe.mp3",
        "CORREO": "assets/audio/sopa_correo.mp3",
        "EJERCITO": "assets/audio/sopa_ejercito.mp3",
        "MENDOZA": "assets/audio/sopa_mendoza.mp3",
        "WHATSAPP": "assets/audio/sopa_whatsapp.mp3",
        "TECNOLOGIA": "assets/audio/sopa_tecnologia.mp3"
      }
    },
    {
      "id": 24,
      "tipo": "cierre",
      "texto": "¡Muy bien! Aprendiste sobre la carta, sus partes, el correo y cómo San Martín, sin poderes mágicos, se convirtió en el héroe de todos los argentinos.",
      "imagen": "assets/images/portada_san_martin.jpg",
      "audio": "assets/audio/cierre.mp3"
    }
  ]
};

if (typeof module !== "undefined") module.exports = DATOS;
