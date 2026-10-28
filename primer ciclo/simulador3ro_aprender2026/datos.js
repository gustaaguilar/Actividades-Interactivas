var DATOS = {
  "meta": {
    "titulo": "Simulador de evaluación",
    "subtitulo": "3.er grado · Lengua y Matemática",
    "grado": "3.er grado",
    "descripcion": "Practicá con los mismos textos y tipos de preguntas del simulador Aprender.",
    "autor": "Profe Gustavo Aguilar",
    "mail": "profegustaaguilar@gmail.com",
    "foto": "profe.jpg",
    "fotoMini": "profe_mini.jpg",
    "portada": "img/portada.jpg",
    "clave": "qst_simulador3"
  },
  "audiosUI": {
    "ui_materias": "¿Qué materia querés practicar? Tocá Lengua o Matemática.",
    "ui_inst_lengua": "Vas a leer dos textos. Después de cada uno vas a responder preguntas. Son diez preguntas, cada una con cuatro opciones, y solo una es correcta. Tocá la opción que elegís y después tocá Continuar. Las respuestas se ven recién al final, como en la prueba de verdad.",
    "ui_inst_matematica": "Vas a resolver problemas y preguntas de matemática. Podés usar lápiz y papel para hacer las cuentas. Son diez preguntas, cada una con cuatro opciones, y solo una es correcta. Tocá la opción que elegís y después tocá Continuar. Las respuestas se ven recién al final, como en la prueba de verdad.",
    "ui_texto": "Leé el texto con atención. Cuando termines, tocá Continuar para responder las preguntas.",
    "res_1": "¡Excelente trabajo! Tocá Revisar mis respuestas para ver cada pregunta, y no te olvides de enviar tu tarea a tu docente.",
    "res_2": "¡Muy bien! Seguí practicando. Tocá Revisar mis respuestas para ver en qué te equivocaste.",
    "res_3": "Vas por buen camino. Tocá Revisar mis respuestas para ver las correctas y aprender de cada una.",
    "res_4": "Revisá las respuestas con calma y volvé a intentarlo. ¡Practicando se aprende!"
  },
  "mensajesFinal": [
    "¡Excelente trabajo! 🌟",
    "¡Muy bien! Seguí practicando 💪",
    "Vas por buen camino. Revisá tus respuestas 🙂",
    "Revisá las respuestas y volvé a intentarlo 💙"
  ],
  "capacidades": {
    "localizar": "Encontrar información en el texto",
    "interpretar": "Entender lo que el texto no dice directamente",
    "reflexionar": "Pensar sobre el texto (para qué sirve, qué tipo de texto es)"
  },
  "lengua": {
    "nombre": "Lengua",
    "emoji": "📖",
    "textos": [
      {
        "id": "origen_mate",
        "titulo": "El origen del mate",
        "genero": "Leyenda",
        "fuente": "Versión oficial del operativo Aprender (ítems liberados 2016 y manual 2024).",
        "imagen": "img/origen_mate.jpg",
        "emoji": "🧉",
        "parrafos": [
          "Cuentan los guaraníes que habitaban en el litoral de nuestro país que Yací, la Luna, solía pasear por las noches contemplando las selvas, los esteros, las lagunas y la tierra roja del Chaco.",
          "Una vez, mientras caminaba por la orilla del río, Yací iba tan distraída que no se dio cuenta de que una temible víbora estaba por morderla.",
          "—¡Cuidado! —gritó un joven cazador guaraní. Yací se hizo a un lado y él atrapó a la víbora.",
          "La diosa, agradecida, decidió ofrecerle un regalo al muchacho. Le dijo:",
          "—Encontrarás en la selva un árbol de hojas con nervaduras amarillas. Con ellas podrás preparar una bebida deliciosa: el mate.",
          "—¿El mate? ¿Qué es eso? —preguntó el joven, asombrado.",
          "—Es una nueva bebida… que unirá a los hombres de tu pueblo.",
          "—¿Y cómo debo prepararla?",
          "—Tienes que secar las hojas y triturarlas —dijo Yací, y le explicó detalladamente cómo debía servir el mate.",
          "El cazador le hizo caso a la diosa y se internó en la selva. Enseguida encontró el árbol. Arrancó algunas hojas, las secó y las picó. Tal como le explicó Yací, colocó las hojas en una calabaza ahuecada. Después les echó encima agua tibia y con una caña fina bebió. Estaba feliz, imaginó a toda la aldea reunida: la calabaza pasando de mano en mano entre sonrisas amigas.",
          "Pero el cazador no se dio cuenta de que, entre los árboles, un guerrero lo espiaba. Envidioso por el regalo que había recibido, el guerrero esperó a que el cazador se durmiera y le robó la calabaza y las hojas.",
          "Al otro día, el guerrero corrió hacia la aldea y ofreció el mate al mburuvichá, que era el jefe de todos los jefes. La comunidad se puso muy contenta por el maravilloso regalo.",
          "Pero llegó el joven cazador muy triste y delató el robo.",
          "—Ese malvado guerrero me quitó el mate —lo acusó el cazador.",
          "—¡Eso no es cierto! —gritó el otro—. Esa bebida es mía. Yo la preparé con hojas que encontré en la selva.",
          "Todos se sorprendieron, no sabían a quién creerle. Los jefes que formaban el Consejo decidieron consultar al payé, que era el hombre más sabio de la selva.",
          "El payé, después de meditarlo un rato, ordenó a los dos jóvenes que se internasen en la selva y trajesen raíces y hojas del misterioso árbol. Pero el guerrero no sabía hacia dónde ir. Entonces, avergonzado, confesó su mala acción y se disculpó. El payé vio que el guerrero estaba arrepentido y lo perdonó.",
          "El pueblo agradeció al cazador y celebró el regalo que Yací les había hecho con una gran fiesta. Fue esa noche cuando los guaraníes tomaron mate por primera vez. La calabaza pasó de mano en mano, bajo la mirada luminosa de la Luna."
        ],
        "preguntas": [
          {
            "slot": 1,
            "p": "Yací es…",
            "ops": [
              "la luna.",
              "la tierra.",
              "el río.",
              "la selva."
            ],
            "cap": "localizar",
            "exp": "El texto lo dice al comienzo: «Yací, la Luna, solía pasear por las noches»."
          },
          {
            "slot": 1,
            "p": "¿Qué quiere decir «la calabaza pasó de mano en mano»?",
            "ops": [
              "Que todos compartieron el mate.",
              "Que todos hicieron una calabaza.",
              "Que todos construyeron un mate.",
              "Que todos ahuecaron la calabaza."
            ],
            "cap": "interpretar",
            "exp": "Pasar de mano en mano significa que la calabaza fue compartida por todos: tomaron mate juntos."
          },
          {
            "slot": 2,
            "p": "Yací es el nombre de…",
            "ops": [
              "una diosa.",
              "un guaraní.",
              "una planta.",
              "un río."
            ],
            "cap": "interpretar",
            "exp": "Yací es la Luna, y el texto la presenta como una diosa que baja a la tierra y hace un regalo."
          },
          {
            "slot": 2,
            "p": "El título «El origen del mate» se debe a que relata…",
            "ops": [
              "cómo conocieron el mate los guaraníes.",
              "cómo se sembró la planta del mate.",
              "dónde viven los guaraníes.",
              "cómo usar una calabaza."
            ],
            "cap": "reflexionar",
            "exp": "El texto cuenta la historia de cómo los guaraníes recibieron el mate por primera vez."
          },
          {
            "slot": 3,
            "p": "El texto «El origen del mate» es…",
            "ops": [
              "una leyenda.",
              "una noticia.",
              "una receta.",
              "una poesía."
            ],
            "cap": "reflexionar",
            "exp": "Es una leyenda: una narración tradicional que explica el origen de algo, en este caso, el mate."
          },
          {
            "slot": 3,
            "p": "¿Quién le agradeció el regalo al cazador?",
            "ops": [
              "La Luna.",
              "El guerrero.",
              "El pueblo.",
              "Un joven."
            ],
            "cap": "localizar",
            "exp": "Yací, la Luna, fue quien le hizo el regalo al cazador y le agradeció por salvarla de la víbora."
          }
        ]
      },
      {
        "id": "mermelada",
        "titulo": "Mermelada de durazno",
        "genero": "Receta",
        "fuente": "Receta escrita para este simulador.",
        "imagen": "img/mermelada.jpg",
        "emoji": "🍑",
        "parrafos": [
          "Ingredientes:",
          "• 1 kilo de duraznos maduros",
          "• 2 tazas de azúcar",
          "• medio vaso de agua",
          "• el jugo de medio limón",
          "Preparación:",
          "1. Lavá los duraznos, pelalos y sacales el carozo. Después cortalos en pedacitos.",
          "2. Pisá los pedacitos con un tenedor hasta formar un puré.",
          "3. Poné el puré en una olla junto con el azúcar, el agua y el jugo de limón.",
          "4. Cociná a fuego bajo durante una hora, más o menos. Revolvé cada tanto con una cuchara de madera para que no se pegue.",
          "5. Cuando la mezcla esté espesa, apagá el fuego y dejala enfriar.",
          "6. Guardá la mermelada en frascos de vidrio limpios y bien tapados, en la heladera.",
          "Importante: pedile a un adulto que te ayude cuando uses el cuchillo y el fuego."
        ],
        "preguntas": [
          {
            "slot": 4,
            "p": "¿Qué se prepara con estas instrucciones?",
            "ops": [
              "Mermelada de durazno.",
              "Puré de durazno.",
              "Jugo de durazno.",
              "Ensalada de frutas."
            ],
            "cap": "interpretar",
            "exp": "Al final se cocina con azúcar y se guarda en frascos: es mermelada."
          },
          {
            "slot": 5,
            "p": "Lo que leíste es…",
            "ops": [
              "una receta de cocina.",
              "un cuento para chicos.",
              "una noticia del diario.",
              "la publicidad de un dulce."
            ],
            "cap": "reflexionar",
            "exp": "Tiene ingredientes y pasos numerados: es una receta."
          },
          {
            "slot": 6,
            "p": "Este texto fue escrito para que…",
            "ops": [
              "sigas los pasos y prepares algo.",
              "te diviertas con una historia.",
              "conozcas lo que pasó en tu ciudad.",
              "compres duraznos en el almacén."
            ],
            "cap": "reflexionar",
            "exp": "Las recetas son textos instructivos: explican qué hacer, paso a paso."
          },
          {
            "slot": 7,
            "p": "¿En qué parte del texto aparecen los ingredientes?",
            "ops": [
              "Al principio.",
              "En el medio.",
              "Al final.",
              "Después del paso 3."
            ],
            "cap": "reflexionar",
            "exp": "En una receta, los ingredientes se escriben primero."
          },
          {
            "slot": 7,
            "p": "¿Qué hay que hacer primero?",
            "ops": [
              "Lavar y pelar los duraznos y sacarles el carozo.",
              "Pisar los duraznos con un tenedor.",
              "Cocinar la mezcla a fuego bajo.",
              "Guardar la mermelada en frascos."
            ],
            "cap": "localizar",
            "exp": "Es el paso 1: lavar, pelar, sacar el carozo y cortar los duraznos."
          },
          {
            "slot": 8,
            "p": "¿Cuánta azúcar se necesita?",
            "ops": [
              "Dos tazas.",
              "Una taza.",
              "Tres tazas.",
              "Media taza."
            ],
            "cap": "localizar",
            "exp": "En los ingredientes dice: 2 tazas de azúcar."
          },
          {
            "slot": 8,
            "p": "¿Cuánto tiempo hay que cocinar la mezcla?",
            "ops": [
              "Una hora.",
              "Diez minutos.",
              "Dos horas.",
              "Un día."
            ],
            "cap": "localizar",
            "exp": "El paso 4 dice que se cocina a fuego bajo durante una hora, más o menos."
          },
          {
            "slot": 9,
            "p": "¿Qué quiere decir «junto con» en el paso 3?",
            "ops": [
              "Que todo va a la olla al mismo tiempo.",
              "Que el azúcar se pone al final.",
              "Que el agua va antes que el puré.",
              "Que el limón va en otra olla."
            ],
            "cap": "interpretar",
            "exp": "«Junto con» indica que todos esos ingredientes se ponen en la olla en el mismo momento."
          },
          {
            "slot": 9,
            "p": "¿Para qué hay que revolver con la cuchara de madera?",
            "ops": [
              "Para que la mezcla no se pegue.",
              "Para que se enfríe más rápido.",
              "Para pelar los duraznos.",
              "Para que quede más dulce."
            ],
            "cap": "localizar",
            "exp": "El paso 4 lo explica: se revuelve para que no se pegue."
          },
          {
            "slot": 10,
            "p": "En el paso 6 dice «frascos limpios». Lo contrario de limpios es…",
            "ops": [
              "sucios.",
              "nuevos.",
              "ordenados.",
              "rotos."
            ],
            "cap": "interpretar",
            "exp": "El antónimo de limpio es sucio."
          },
          {
            "slot": 10,
            "p": "En el paso 4 dice «fuego bajo». Lo contrario de bajo es…",
            "ops": [
              "alto.",
              "lento.",
              "corto.",
              "suave."
            ],
            "cap": "interpretar",
            "exp": "El antónimo de bajo es alto: fuego bajo es poca llama, fuego alto es mucha."
          }
        ]
      }
    ]
  },
  "matematica": {
    "nombre": "Matemática",
    "emoji": "🔢",
    "ejes": {
      "numeros": {
        "nombre": "Números"
      },
      "operaciones": {
        "nombre": "Operaciones y problemas"
      },
      "geometria": {
        "nombre": "Geometría"
      },
      "medida": {
        "nombre": "Medida"
      }
    },
    "items": [
      {
        "slot": 1,
        "eje": "geometria",
        "p": "¿Cuál de estas figuras tiene estas 2 características?\n• 4 lados de igual medida.\n• 4 ángulos iguales.",
        "ops": [
          "fig:cuadrado",
          "fig:rectangulo",
          "fig:rombo",
          "fig:trapecio"
        ],
        "exp": "El cuadrado tiene sus 4 lados iguales y sus 4 ángulos iguales (rectos). El rombo tiene los lados iguales pero no los ángulos; el rectángulo, los ángulos pero no los lados."
      },
      {
        "slot": 1,
        "eje": "geometria",
        "p": "¿Cuál de estas figuras tiene 4 ángulos iguales, pero no todos sus lados miden lo mismo?",
        "ops": [
          "fig:rectangulo",
          "fig:cuadrado",
          "fig:rombo",
          "fig:triangulo"
        ],
        "exp": "El rectángulo tiene 4 ángulos rectos, pero sus lados largos y cortos no miden lo mismo."
      },
      {
        "slot": 2,
        "eje": "operaciones",
        "p": "Lucas tiene que elegir un número para que 540 + ...... dé un resultado mayor que 700 y menor que 800. ¿Qué número elige?",
        "ops": [
          "210",
          "150",
          "280",
          "120"
        ],
        "exp": "540 + 210 = 750, que está entre 700 y 800. Con 150 da 690, con 280 da 820 y con 120 da 660."
      },
      {
        "slot": 2,
        "eje": "operaciones",
        "p": "Sofía tiene que elegir un número para que 380 + ...... dé un resultado mayor que 500 y menor que 600. ¿Qué número elige?",
        "ops": [
          "175",
          "95",
          "250",
          "115"
        ],
        "exp": "380 + 175 = 555, que está entre 500 y 600. Con 95 da 475, con 250 da 630 y con 115 da 495."
      },
      {
        "slot": 3,
        "eje": "numeros",
        "p": "Un señor pagó una compra con 4 billetes de $100 y 15 billetes de $10. ¿Cuánto dinero pagó?",
        "ops": [
          "$550",
          "$19",
          "$415",
          "$115"
        ],
        "visual": {
          "tipo": "billetes",
          "lista": [
            [
              100,
              4
            ],
            [
              10,
              15
            ]
          ]
        },
        "exp": "4 billetes de $100 son $400 y 15 de $10 son $150: 400 + 150 = 550."
      },
      {
        "slot": 3,
        "eje": "numeros",
        "p": "Ana pagó una compra con 3 billetes de $100 y 14 billetes de $10. ¿Cuánto dinero pagó?",
        "ops": [
          "$440",
          "$17",
          "$314",
          "$114"
        ],
        "visual": {
          "tipo": "billetes",
          "lista": [
            [
              100,
              3
            ],
            [
              10,
              14
            ]
          ]
        },
        "exp": "3 billetes de $100 son $300 y 14 de $10 son $140: 300 + 140 = 440."
      },
      {
        "slot": 4,
        "eje": "medida",
        "p": "Hoy es lunes. ¿Qué día será dentro de 15 días?",
        "ops": [
          "Martes",
          "Lunes",
          "Miércoles",
          "Domingo"
        ],
        "visual": {
          "tipo": "semana",
          "hoy": 0
        },
        "exp": "En 14 días pasan 2 semanas justas y vuelve a ser lunes. Un día más: martes."
      },
      {
        "slot": 4,
        "eje": "medida",
        "p": "Hoy es miércoles. ¿Qué día será dentro de 8 días?",
        "ops": [
          "Jueves",
          "Miércoles",
          "Viernes",
          "Martes"
        ],
        "visual": {
          "tipo": "semana",
          "hoy": 2
        },
        "exp": "En 7 días vuelve a ser miércoles. Un día más: jueves."
      },
      {
        "slot": 4,
        "eje": "medida",
        "p": "Hoy es martes. ¿Qué día será pasado mañana?",
        "ops": [
          "Jueves",
          "Miércoles",
          "Viernes",
          "Lunes"
        ],
        "visual": {
          "tipo": "semana",
          "hoy": 1
        },
        "exp": "Mañana es miércoles y pasado mañana es jueves."
      },
      {
        "slot": 5,
        "eje": "numeros",
        "p": "¿Cuál es el anterior de 450?",
        "ops": [
          "449",
          "451",
          "440",
          "460"
        ],
        "visual": {
          "tipo": "serie",
          "nums": [
            "?",
            "450"
          ]
        },
        "exp": "El anterior es el número que viene justo antes: 450 − 1 = 449."
      },
      {
        "slot": 5,
        "eje": "numeros",
        "p": "¿Cuál es el anterior de 310?",
        "ops": [
          "309",
          "311",
          "300",
          "320"
        ],
        "visual": {
          "tipo": "serie",
          "nums": [
            "?",
            "310"
          ]
        },
        "exp": "El anterior es el número que viene justo antes: 310 − 1 = 309."
      },
      {
        "slot": 5,
        "eje": "numeros",
        "p": "¿Cuál es el anterior de 700?",
        "ops": [
          "699",
          "701",
          "690",
          "600"
        ],
        "visual": {
          "tipo": "serie",
          "nums": [
            "?",
            "700"
          ]
        },
        "exp": "El anterior es el número que viene justo antes: 700 − 1 = 699."
      },
      {
        "slot": 6,
        "eje": "operaciones",
        "p": "¿Cuál es el resultado de 14 × 20?",
        "ops": [
          "280",
          "140",
          "34",
          "240"
        ],
        "visual": {
          "tipo": "decor",
          "e": "🧮"
        },
        "exp": "14 × 2 = 28. Como es por 20 (2 dieces), el resultado es 10 veces más: 280."
      },
      {
        "slot": 6,
        "eje": "operaciones",
        "p": "¿Cuál es el resultado de 12 × 30?",
        "ops": [
          "360",
          "36",
          "120",
          "320"
        ],
        "visual": {
          "tipo": "decor",
          "e": "🧮"
        },
        "exp": "12 × 3 = 36. Como es por 30 (3 dieces), el resultado es 10 veces más: 360."
      },
      {
        "slot": 7,
        "eje": "operaciones",
        "p": "Martina juega a las cartas. Gana quien llega a 300 puntos y ella tiene 175. ¿Cuántos puntos le faltan?",
        "ops": [
          "125",
          "135",
          "225",
          "475"
        ],
        "visual": {
          "tipo": "decor",
          "e": "🃏"
        },
        "exp": "De 175 a 200 faltan 25, y de 200 a 300 faltan 100: 25 + 100 = 125."
      },
      {
        "slot": 7,
        "eje": "operaciones",
        "p": "Un álbum se completa con 200 figuritas. Tomás ya pegó 64. ¿Cuántas figuritas le faltan?",
        "ops": [
          "136",
          "146",
          "264",
          "36"
        ],
        "visual": {
          "tipo": "decor",
          "e": "📒"
        },
        "exp": "De 64 a 100 faltan 36, y de 100 a 200 faltan 100: 36 + 100 = 136."
      },
      {
        "slot": 8,
        "eje": "operaciones",
        "p": "¿Qué cálculo sirve para resolver este problema?\nEn la kermés de la escuela regalan una bolsa con 4 paquetes de 3 figuritas cada uno. ¿Cuántas figuritas trae cada bolsa?",
        "ops": [
          "4 × 3",
          "4 + 3",
          "3 + 3",
          "3 × 3"
        ],
        "visual": {
          "tipo": "decor",
          "e": "🎁"
        },
        "exp": "Son 4 paquetes de 3: 4 × 3 (o 3 + 3 + 3 + 3) = 12."
      },
      {
        "slot": 8,
        "eje": "operaciones",
        "p": "¿Qué cálculo sirve para resolver este problema?\nEn el aula hay 3 mesas y en cada mesa se sientan 4 chicos. ¿Cuántos chicos hay?",
        "ops": [
          "3 × 4",
          "3 + 4",
          "4 − 3",
          "4 + 4"
        ],
        "visual": {
          "tipo": "arreglo",
          "filas": 3,
          "cols": 4,
          "icono": "nene"
        },
        "exp": "Son 3 grupos de 4 chicos: 3 × 4 (o 4 + 4 + 4) = 12."
      },
      {
        "slot": 9,
        "eje": "geometria",
        "p": "Mateo pensó en un cuerpo geométrico y lo describió así:\n• Tiene 5 caras.\n• 4 caras son triángulos y 1 es un cuadrado.\n• Tiene 5 vértices.\n¿Qué cuerpo pensó?",
        "ops": [
          "cuerpo:piramide",
          "cuerpo:cubo",
          "cuerpo:prisma",
          "cuerpo:cono"
        ],
        "exp": "Es la pirámide de base cuadrada: la base es un cuadrado, tiene 4 caras triangulares y 5 vértices (4 abajo y 1 arriba)."
      },
      {
        "slot": 9,
        "eje": "geometria",
        "p": "Clara pensó en un cuerpo geométrico:\n• Tiene 6 caras cuadradas, todas iguales.\n• Tiene 8 vértices.\n¿Qué cuerpo pensó?",
        "ops": [
          "cuerpo:cubo",
          "cuerpo:piramide",
          "cuerpo:cilindro",
          "cuerpo:prisma"
        ],
        "exp": "Es el cubo: 6 caras cuadradas iguales y 8 vértices."
      },
      {
        "slot": 9,
        "eje": "geometria",
        "p": "Joaquín pensó en un cuerpo geométrico:\n• Tiene 2 caras planas y redondas.\n• Tiene una superficie curva.\n• No tiene vértices.\n¿Qué cuerpo pensó?",
        "ops": [
          "cuerpo:cilindro",
          "cuerpo:cono",
          "cuerpo:esfera",
          "cuerpo:cubo"
        ],
        "exp": "Es el cilindro, como una lata: 2 caras redondas y una superficie curva. El cono tiene una sola cara redonda y la esfera ninguna."
      },
      {
        "slot": 10,
        "eje": "medida",
        "p": "¿Cuál de estas opciones indica bien la distancia entre las ciudades de Mendoza y San Juan?",
        "ops": [
          "170 km",
          "170 m",
          "170 cm",
          "170 mm"
        ],
        "visual": {
          "tipo": "decor",
          "e": "🚗🛣️"
        },
        "exp": "Entre dos ciudades hay muchos kilómetros: por la ruta son unos 170 km."
      },
      {
        "slot": 10,
        "eje": "medida",
        "p": "¿Cuál de estas opciones indica bien el largo de una cancha de fútbol?",
        "ops": [
          "100 m",
          "100 km",
          "100 cm",
          "100 mm"
        ],
        "visual": {
          "tipo": "decor",
          "e": "⚽"
        },
        "exp": "Una cancha de fútbol mide unos 100 metros de largo. 100 cm es apenas un metro, y 100 km es la distancia entre dos ciudades."
      }
    ]
  }
};