/* datos.js — "Fin de año" · Arte flúor geométrico · 5.° grado · QueSepanTodos.com
   Cuadernillo Aventureros de la Matemática 5 (DGE Mendoza), págs. 14 a 17.
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
    "titulo": "Fin de año",
    "corto": "Fin de año · Arte flúor geométrico",
    "parte": "Arte flúor geométrico",
    "subtitulo": "El Laberinto Flúor: prismas y pirámides, sus caras, aristas y vértices",
    "imgPortada": "laberinto.jpg",
    "imgCierre": "cuerpos_elegidos.jpg",
    "fuente": "Actividades interactivas de QueSepanTodos.com, de elaboración propia, basadas en «Arte flúor geométrico» (págs.14 a 17) del cuadernillo «Aventureros de la Matemática 5», material propuesto por la Dirección General de Escuelas de Mendoza en el marco del PEAMM. Ilustraciones tomadas del cuadernillo."
  },
  "pantallas": [
    {
      "tipo": "portada"
    },
    {
      "tipo": "narracion",
      "titulo": "El Laberinto Flúor",
      "vis": {
        "t": "img",
        "src": "laberinto.jpg",
        "h": 40
      },
      "pasos": [
        {
          "audio": A("g01_1", "¡No lo van a poder creer! Los chicos de quinto grado hicieron un proyecto en el que las matemáticas brillan en la oscuridad: El Laberinto Flúor."),
          "chip": "✨ El Laberinto Flúor"
        },
        {
          "audio": A("g01_2", "Usaron luz negra y materiales fluorescentes para que las formas geométricas brillaran. Así el arte y la matemática se juntaron."),
          "chip": "🔦 Luz negra y materiales fluorescentes"
        },
        {
          "audio": A("g01_3", "La seño Paola los guió para construir cubos, prismas y pirámides, y para descubrir sus caras, aristas y vértices."),
          "chip": "🧊 Cubos, prismas y pirámides"
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "Caras, aristas y vértices",
      "vis": {
        "t": "cuerpo",
        "f": "cubo",
        "id": "cb",
        "h": 30
      },
      "pasos": [
        {
          "audio": A("g02_1", "Los cuerpos como el cubo están limitados por figuras planas. Cada figura plana es una cara."),
          "destacar": [
            "cb_c0"
          ],
          "chip": "🟦 Cara: cada figura plana que limita al cuerpo"
        },
        {
          "audio": A("g02_2", "La línea donde se juntan dos caras se llama arista."),
          "destacar": [
            "cb_a"
          ],
          "chip": "📏 Arista: donde se juntan dos caras"
        },
        {
          "audio": A("g02_3", "Y el punto donde se juntan las aristas es un vértice. El cubo tiene seis caras, doce aristas y ocho vértices."),
          "destacar": [
            "cb_v"
          ],
          "chip": "🔴 Vértice: donde se juntan las aristas · Cubo: 6 caras, 12 aristas, 8 vértices"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los cuerpos del laberinto",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "caja",
            "titulo": "Los que eligieron",
            "items": [
              {
                "t": "img",
                "src": "cuerpos_elegidos.jpg",
                "h": 15
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Todos los cuerpos",
            "items": [
              {
                "t": "img",
                "src": "chicos_cuerpos.jpg",
                "h": 15
              }
            ]
          }
        ]
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g03_i", "Para el laberinto, los chicos eligieron algunos cuerpos y dejaron otros afuera. Compará las dos imágenes."),
      "items": [
        {
          "preg": "¿Qué tienen en común los cuerpos que <b>eligieron</b>?",
          "audio": A("g03_a", "¿Qué características comparten los cuerpos que eligieron para el laberinto?"),
          "opc": [
            "Todas sus caras son planas",
            "Todos ruedan",
            "Todos tienen una cara curva",
            "Todos son cubos"
          ],
          "conf": A("g03_ac", "Todas sus caras son figuras planas: son poliedros, como los prismas y las pirámides.")
        },
        {
          "preg": "¿En qué se diferencian de los que <b>no eligieron</b>?",
          "audio": A("g03_b", "¿En qué se diferencian de los cuerpos que no eligieron?"),
          "opc": [
            "Los otros tienen superficies curvas, como el cilindro, el cono y la esfera",
            "Los otros son más grandes",
            "Los otros tienen más vértices",
            "No hay diferencias"
          ],
          "conf": A("g03_bc", "Los que quedaron afuera tienen superficies curvas: cilindros, conos y esferas. Esos pueden rodar.")
        },
        {
          "preg": "Quieren armar <b>dos grupos</b>. ¿Cómo podrían dividir los cuerpos elegidos?",
          "audio": A("g03_c", "Los chicos quieren organizarse en dos grupos, cada uno con un tipo de cuerpos. ¿Cómo podrían dividirlos?"),
          "opc": [
            "Prismas en un grupo y pirámides en el otro",
            "Los azules y los celestes",
            "Los grandes y los chicos",
            "No se pueden agrupar"
          ],
          "conf": A("g03_cc", "Una buena manera es separar prismas y pirámides. Pero no es la única: también se pueden agrupar por la forma de la base.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "¿Qué es una pirámide?",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "cuerpo",
            "f": "piramide",
            "id": "pi",
            "h": 24
          },
          {
            "t": "img",
            "src": "ismael_rocio.jpg",
            "h": 30
          }
        ]
      },
      "pasos": [
        {
          "audio": A("g04_1", "Ismael y Rocío eligieron un cuerpo cada uno. Ismael dice: los dos tenemos una pirámide."),
          "chip": "🧒 Ismael: «Los dos tenemos una pirámide»"
        },
        {
          "audio": A("g04_2", "Una pirámide tiene una sola base, que puede ser cualquier polígono."),
          "destacar": [
            "pi"
          ],
          "chip": "Pirámide: una sola base"
        },
        {
          "audio": A("g04_3", "Sus caras laterales son triángulos que se juntan en un mismo punto, el vértice de arriba. Hay tantos triángulos como lados tiene la base."),
          "destacar": [
            "pi_c0",
            "pi_c1",
            "pi_v"
          ],
          "chip": "Caras laterales triangulares: tantas como lados de la base"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Ismael y Rocío",
      "vis": {
        "t": "img",
        "src": "ismael_rocio.jpg",
        "h": 32
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g05_i", "Mirá los cuerpos que tienen Ismael y Rocío y pensá si los dos son pirámides."),
      "items": [
        {
          "preg": "¿Estás de acuerdo con Ismael: los dos tienen una pirámide?",
          "audio": A("g05_a", "¿Estás de acuerdo con Ismael? ¿Los dos tienen una pirámide?"),
          "opc": [
            "No: Rocío tiene un prisma de base triangular",
            "Sí: los dos son pirámides",
            "No: Ismael tiene un cubo",
            "No: los dos son prismas"
          ],
          "conf": A("g05_ac", "No. El cuerpo de Rocío tiene dos bases triangulares iguales y caras rectangulares: es un prisma de base triangular.")
        },
        {
          "preg": "La pirámide de Ismael tiene la base <b>cuadrada</b>. ¿Cuántas caras triangulares tiene?",
          "audio": A("g05_b", "La pirámide de Ismael tiene la base cuadrada. ¿Cuántas caras triangulares tiene?"),
          "opc": [
            "4",
            "3",
            "5",
            "8"
          ],
          "conf": A("g05_bc", "Cuatro: una por cada lado del cuadrado de la base.")
        },
        {
          "preg": "¿Se puede asegurar cuántas caras tiene una pirámide viendo <b>solo un dibujo</b>?",
          "audio": A("g05_c", "¿Es posible asegurar cuántas caras triangulares tiene una pirámide viendo tan solo un dibujo?"),
          "opc": [
            "No siempre: algunas caras quedan ocultas; hay que saber la forma de la base",
            "Sí: siempre se ven todas",
            "Sí: siempre son 4",
            "No: nunca se puede saber"
          ],
          "conf": A("g05_cc", "No siempre. En el dibujo hay caras que no se ven. Si sabemos la forma de la base, sí podemos asegurarlo.")
        },
        {
          "preg": "Una pirámide de base <b>hexagonal</b>, ¿tiene <b>7</b> caras triangulares?",
          "audio": A("g05_d", "¿Podemos afirmar que una pirámide de base hexagonal tiene siete caras triangulares?"),
          "opc": [
            "No: tiene 6 triangulares; con la base son 7 caras en total",
            "Sí: tiene 7 triangulares",
            "No: tiene 12",
            "No: tiene 5"
          ],
          "conf": A("g05_dc", "No. El hexágono tiene seis lados: seis caras triangulares. Con la base hexagonal son siete caras en total.")
        },
        {
          "preg": "Ismael dice que sabe cuántas caras tiene una pirámide <b>sin contarlas</b>. ¿Tiene razón?",
          "audio": A("g05_e", "Ismael dice que puede saber cuántas caras tiene una pirámide sin contarlas. ¿Tiene razón?"),
          "opc": [
            "Sí: son los lados de la base más 1",
            "No: hay que contarlas siempre",
            "Sí: siempre tiene 5",
            "Sí: el doble de los lados de la base"
          ],
          "conf": A("g05_ec", "Sí. Cada lado de la base da una cara triangular, y se suma la base: lados de la base más uno.")
        }
      ]
    },
    {
      "tipo": "narracion",
      "titulo": "¿Qué es un prisma?",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "cuerpo",
            "f": "prisma",
            "id": "pr",
            "h": 22
          },
          {
            "t": "img",
            "src": "cuerpos_prismas.jpg",
            "h": 20
          }
        ]
      },
      "pasos": [
        {
          "audio": A("g06_1", "Ahora los chicos dejan de lado las pirámides y se quedan con los prismas."),
          "chip": "📦 Los prismas"
        },
        {
          "audio": A("g06_2", "Un prisma tiene dos bases iguales y paralelas, una enfrentada a la otra."),
          "destacar": [
            "pr_c1"
          ],
          "chip": "Dos bases iguales y paralelas"
        },
        {
          "audio": A("g06_3", "Sus caras laterales son rectángulos, y tiene tantas caras laterales como lados tiene la base."),
          "destacar": [
            "pr_c0",
            "pr_c2"
          ],
          "chip": "Caras laterales rectangulares: tantas como lados de la base"
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Los prismas",
      "vis": {
        "t": "img",
        "src": "cuerpos_prismas.jpg",
        "h": 24
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g07_i", "Pensemos en los prismas del laberinto."),
      "items": [
        {
          "preg": "Belén eligió un prisma con dos bases iguales y <b>5 caras laterales</b> rectangulares. ¿Cómo se llama?",
          "audio": A("g07_a", "A Belén le llamó la atención un prisma que tiene dos caras paralelas de igual forma y cinco caras laterales rectangulares. ¿Cómo se llama?"),
          "opc": [
            "Prisma de base pentagonal",
            "Pirámide de base pentagonal",
            "Prisma de base cuadrada",
            "Cubo"
          ],
          "conf": A("g07_ac", "Cinco caras laterales: la base tiene cinco lados. Es un prisma de base pentagonal.")
        },
        {
          "preg": "¿Cuántas caras laterales tiene, <b>como mínimo</b>, un prisma?",
          "audio": A("g07_b", "¿Cuántas caras laterales puede tener, como mínimo, un prisma?"),
          "opc": [
            "3",
            "2",
            "4",
            "1"
          ],
          "conf": A("g07_bc", "Tres. La base con menos lados es el triángulo: el prisma de base triangular tiene tres caras laterales.")
        },
        {
          "preg": "¿Cuántas caras tiene un prisma de base <b>pentagonal</b>? ¿Qué forma tienen?",
          "audio": A("g07_c", "¿Cuántas caras tiene un prisma de base pentagonal? ¿Qué forma tienen?"),
          "opc": [
            "7: 2 pentágonos y 5 rectángulos",
            "5: todos pentágonos",
            "6: 1 pentágono y 5 triángulos",
            "10: todos rectángulos"
          ],
          "conf": A("g07_cc", "Siete caras: las dos bases pentagonales y cinco caras laterales rectangulares.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Lo que observa Ismael",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "img",
            "src": "ismael_cubos.jpg",
            "h": 22
          },
          {
            "t": "img",
            "src": "ismael_bases.jpg",
            "h": 22
          }
        ]
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g08_i", "Ismael observa dos cuerpos y saca una conclusión sobre los prismas."),
      "items": [
        {
          "preg": "Ismael tiene un cuerpo con <b>6 caras cuadradas</b> iguales y otro con caras <b>rectangulares</b>. ¿Cómo se llaman?",
          "audio": A("g08_a", "Ismael tiene un cuerpo con seis caras cuadradas iguales y otro con caras rectangulares. ¿Cómo se llama cada uno?"),
          "opc": [
            "Un cubo y un prisma de base rectangular",
            "Dos cubos",
            "Una pirámide y un cubo",
            "Dos pirámides"
          ],
          "conf": A("g08_ac", "El de seis caras cuadradas iguales es un cubo. El otro es un prisma de base rectangular. ¡El cubo también es un prisma!")
        },
        {
          "preg": "Ismael dice: «La cantidad de caras laterales de un prisma depende de la forma de sus bases». ¿Tiene razón?",
          "audio": A("g08_b", "Ismael dice: la cantidad de caras laterales de un prisma depende de la forma que tienen sus bases. ¿Tiene razón?"),
          "opc": [
            "Sí: hay una cara lateral por cada lado de la base",
            "No: siempre son 4",
            "No: depende del tamaño",
            "No: depende del color"
          ],
          "conf": A("g08_bc", "Sí. Cada lado de la base forma una cara lateral: base triangular, tres; base cuadrada, cuatro; base pentagonal, cinco.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "¿Verdadero o falso?",
      "vf": true,
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "cuerpo",
            "f": "prisma",
            "h": 16
          },
          {
            "t": "cuerpo",
            "f": "piramide_tri",
            "h": 16
          }
        ]
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g09_i", "Decidí si cada afirmación es verdadera o falsa."),
      "items": [
        {
          "preg": "«Todos los prismas de base cuadrada tienen siempre <b>6 caras</b>.»",
          "audio": A("g09_a", "Todos los prismas de base cuadrada tienen siempre seis caras."),
          "v": true,
          "conf": A("g09_ac", "Verdadero: dos bases cuadradas y cuatro caras laterales, seis caras.")
        },
        {
          "preg": "«La cantidad de vértices de un prisma puede ser <b>impar</b>.»",
          "audio": A("g09_b", "La cantidad total de vértices de un prisma puede ser impar."),
          "v": false,
          "conf": A("g09_bc", "Falso: cada base tiene los mismos vértices, así que el total es siempre el doble: un número par.")
        },
        {
          "preg": "«En toda pirámide, el número total de caras es <b>par</b>.»",
          "audio": A("g09_c", "Rocío afirma que en toda pirámide el número total de caras siempre es par."),
          "v": false,
          "conf": A("g09_cc", "Falso: la pirámide de base cuadrada tiene cinco caras, que es impar.")
        },
        {
          "preg": "«Si un prisma tiene <b>10 caras</b>, <b>8</b> son laterales.»",
          "audio": A("g09_d", "Si un prisma tiene diez caras en total, ocho son caras laterales."),
          "v": true,
          "conf": A("g09_dc", "Verdadero: dos son las bases, y las otras ocho son laterales.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Nuevos desafíos",
      "vis": {
        "t": "img",
        "src": "prisma_hex.jpg",
        "h": 22
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g10_i", "Más desafíos con prismas y pirámides."),
      "items": [
        {
          "preg": "Si una pirámide tiene en total <b>7 caras</b>, ¿qué forma tiene la base?",
          "audio": A("g10_a", "Si una pirámide tiene en total siete caras, ¿qué forma tiene la base?"),
          "opc": [
            "Hexagonal",
            "Pentagonal",
            "Cuadrada",
            "Heptagonal"
          ],
          "conf": A("g10_ac", "Siete caras menos la base son seis caras triangulares: la base tiene seis lados, es un hexágono.")
        },
        {
          "preg": "El joyero de Mailén es un prisma <b>pentagonal</b> y quiere pintar cada cara de un color distinto. ¿Cuántos colores necesita?",
          "audio": A("g10_b", "El joyero de Mailén es un prisma pentagonal. Quiere pintar cada cara de un color diferente. ¿Cuántos colores necesita?"),
          "opc": [
            "7",
            "5",
            "10",
            "6"
          ],
          "conf": A("g10_bc", "Siete: dos bases y cinco caras laterales.")
        },
        {
          "preg": "¿Qué cuerpo tiene la <b>menor cantidad de caras</b>?",
          "audio": A("g10_c", "¿Cuál es el cuerpo que tiene la menor cantidad de caras totales?"),
          "opc": [
            "La pirámide de base triangular: 4 caras",
            "El prisma de base triangular: 5 caras",
            "El cubo: 6 caras",
            "La pirámide de base cuadrada: 5 caras"
          ],
          "conf": A("g10_cc", "La pirámide de base triangular, también llamada tetraedro: cuatro caras triangulares.")
        },
        {
          "preg": "En este prisma, ¿qué forma tienen sus <b>caras laterales</b>?",
          "audio": A("g10_d", "En la figura, ¿qué forma tienen sus caras laterales?"),
          "opc": [
            "Rectangulares",
            "Pentagonales",
            "Cuadradas",
            "Triangulares"
          ],
          "conf": A("g10_dc", "Rectangulares, como las de todos los prismas.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las ideas de Gael y Camila",
      "vis": {
        "t": "img",
        "src": "chicos_prismas.jpg",
        "h": 30
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g11_i", "Gael y Camila escribieron sus ideas sobre los prismas. ¿Estás de acuerdo?"),
      "items": [
        {
          "preg": "Gael: «En los prismas hay dos bases iguales y tantas caras laterales como lados tenga la base». ¿Tiene razón?",
          "audio": A("g11_a", "Gael dice: en los prismas hay dos bases que son iguales y tantas caras laterales como lados tenga la base. ¿Tiene razón?"),
          "opc": [
            "Sí",
            "No: hay una sola base",
            "No: las caras laterales son el doble",
            "No: las bases son distintas"
          ],
          "conf": A("g11_ac", "Sí, Gael describe muy bien a los prismas.")
        },
        {
          "preg": "Camila: «En los prismas, los <b>vértices</b> son siempre más que las <b>aristas</b>». ¿Tiene razón?",
          "audio": A("g11_b", "Camila dice: en los prismas, la cantidad total de vértices siempre es mayor que la cantidad de aristas. ¿Tiene razón?"),
          "opc": [
            "No: el cubo tiene 8 vértices y 12 aristas",
            "Sí: siempre hay más vértices",
            "Sí: son iguales",
            "No: no tienen vértices"
          ],
          "conf": A("g11_bc", "No. Por ejemplo, el cubo tiene ocho vértices y doce aristas: las aristas son más.")
        }
      ]
    },
    {
      "tipo": "trivia",
      "titulo": "Las pistas de Lautaro",
      "vis": {
        "t": "fila",
        "items": [
          {
            "t": "caja",
            "titulo": "De costado",
            "items": [
              {
                "t": "fig",
                "f": "rectangulo",
                "c": "#7dd3fc",
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Desde arriba",
            "items": [
              {
                "t": "fig",
                "f": "equilatero",
                "c": "#7dd3fc",
                "h": 6
              }
            ]
          },
          {
            "t": "caja",
            "titulo": "Desde abajo",
            "items": [
              {
                "t": "fig",
                "f": "equilatero",
                "c": "#7dd3fc",
                "h": 6
              }
            ]
          }
        ]
      },
      "pista": A("pg_cuerpo", "Fijate en las bases: el prisma tiene dos bases iguales y caras laterales rectangulares; la pirámide tiene una sola base y caras laterales triangulares."),
      "instr": A("g12_i", "Lautaro da pistas de un cuerpo: cómo se ve de costado, desde arriba y desde abajo."),
      "items": [
        {
          "preg": "De costado se ve un <b>rectángulo</b>; desde arriba y desde abajo, un <b>triángulo</b>. ¿Qué cuerpo es?",
          "audio": A("g12_a", "De costado se ve un rectángulo; desde arriba y desde abajo, un triángulo. ¿Qué cuerpo es?"),
          "opc": [
            "Un prisma de base triangular",
            "Una pirámide de base triangular",
            "Un cubo",
            "Un prisma de base cuadrada"
          ],
          "conf": A("g12_ac", "Es un prisma de base triangular: sus dos bases son triángulos y sus caras laterales, rectángulos.")
        }
      ]
    },
    {
      "tipo": "sopa",
      "titulo": "Palabras del laberinto",
      "n": 9,
      "img": "laberinto.jpg",
      "instr": A("g13_i", "Buscá en la sopa de letras siete palabras de esta actividad. Tocá la primera letra y después la última."),
      "palabras": [
        {
          "w": "PRISMA",
          "audio": A("g13_1", "Prisma: dos bases iguales y caras laterales rectangulares.")
        },
        {
          "w": "PIRAMIDE",
          "audio": A("g13_2", "Pirámide: una base y caras laterales triangulares.")
        },
        {
          "w": "CARA",
          "audio": A("g13_3", "Cara: figura plana que limita al cuerpo.")
        },
        {
          "w": "ARISTA",
          "audio": A("g13_4", "Arista: donde se juntan dos caras.")
        },
        {
          "w": "VERTICE",
          "audio": A("g13_5", "Vértice: donde se juntan las aristas.")
        },
        {
          "w": "BASE",
          "audio": A("g13_6", "Base: la cara sobre la que se apoya el cuerpo.")
        },
        {
          "w": "CUBO",
          "audio": A("g13_7", "Cubo: seis caras cuadradas iguales.")
        }
      ]
    },
    {
      "tipo": "cierre",
      "audio": A("cierre_fin_de_anio_arte_fluor", "¡Excelente! Terminaste Arte flúor geométrico. Ya sabés distinguir prismas y pirámides, y contar sus caras, aristas y vértices. Mirá tus resultados y envialos a tu docente.")
    }
  ]
};
