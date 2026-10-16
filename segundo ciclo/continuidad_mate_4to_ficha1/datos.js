/* ============================================================
   DETECTIVES DE LAS FRACCIONES — Matemática · 4.º grado
   Basado en la Ficha N.º 1 "Número" de Habilidades Lógico-Matemáticas
   DGE Mendoza · Continuidad pedagógica
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de las fracciones",
  "subtitulo": "Ficha 1: Número",
  "area": "🔢 Matemática · 4.º grado",
  "fuente": "Basado en la Ficha N.º 1 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial",
  "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
  "mail": "profegustaaguilar@gmail.com",
  "foto": "profe.jpg",
  "fotoMini": "profe_mini.jpg",
  "frase": "Menos prisa, más vida 🧉🫂",
  "puntosPorAcierto": 10,
  "revision": false
 },
 "audios": {
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar las fracciones: en dibujos, en el reloj y en repartos. Tocá Comenzar.",
  "n1_1": "Una fracción nos dice qué parte de un entero tomamos. Este círculo está dividido en cuatro partes iguales.",
  "n1_2": "El número de abajo, el denominador, dice en cuántas partes iguales se dividió el entero: cuatro.",
  "n1_3": "El número de arriba, el numerador, dice cuántas partes tomamos. Aquí pintamos una: un cuarto.",
  "n1_4": "Si pintamos más partes que las que tiene un entero, la fracción es mayor que uno. Por ejemplo, tres medios: un entero y medio.",
  "fr_instr": "Mirá el dibujo. ¿Qué fracción representa la parte pintada? Tocá la respuesta.",
  "fr_err": "No es esa. Contá en cuántas partes iguales está dividido cada entero y cuántas están pintadas.",
  "fr1_ok": "¡Sí! Cuatro partes iguales y tres pintadas: tres cuartos.",
  "fr2_ok": "¡Muy bien! Ocho partes iguales y una pintada: un octavo.",
  "fr3_ok": "¡Excelente! Cada círculo tiene dos partes y hay tres pintadas: tres medios.",
  "n2_1": "Una hora tiene sesenta minutos. Es un entero.",
  "n2_2": "Media hora son treinta minutos: un medio de la hora.",
  "n2_3": "Quince minutos son un cuarto de hora, porque sesenta se reparte en cuatro partes de quince.",
  "n2_4": "Y cuarenta y cinco minutos son tres cuartos de hora.",
  "ho_instr": "Pensá en fracciones de la hora y en repartos. Tocá la respuesta correcta.",
  "ho_err": "No es esa. Pensalo con el dibujo.",
  "ho1": "¿Qué parte de la hora son treinta minutos?",
  "ho1_ok": "¡Sí! Treinta minutos son media hora: un medio.",
  "ho2": "¿Qué parte de la hora son cuarenta y cinco minutos?",
  "ho2_ok": "¡Muy bien! Cuarenta y cinco minutos son tres cuartos de hora.",
  "ho3": "Se reparten tres alfajores en partes iguales entre dos amigos y no sobra nada. ¿Cuánto le toca a cada uno?",
  "ho3_ok": "¡Genial! A cada uno le toca un alfajor y medio: tres medios.",
  "ho4": "Se reparte una pizza en partes iguales entre cuatro amigos. ¿Cuánto le toca a cada uno?",
  "ho4_ok": "¡Perfecto! A cada uno le toca un cuarto de pizza.",
  "vf_instr": "Mirá el dibujo. Leé cada frase y tocá Verdadero o Falso.",
  "vf_err": "No es así. Mirá otra vez las partes pintadas.",
  "vf1": "La parte pintada es cuatro sextos.",
  "vf1_ok": "¡Correcto! Seis partes iguales y cuatro pintadas.",
  "vf2": "Para completar el entero hay que pintar dos partes más.",
  "vf2_ok": "¡Sí! Faltan dos partes para llegar a seis sextos.",
  "vf3": "Representa una fracción mayor que el entero.",
  "vf3_ok": "¡Bien! Es falso: no está pintado ni siquiera todo el entero.",
  "vf4": "La parte pintada es dos sextos.",
  "vf4_ok": "¡Muy bien! Es falso: dos sextos es la parte sin pintar.",
  "de_1": "¡Ya sos un detective de las fracciones!",
  "de_2": "Ahora llega el desafío: son las cuatro tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "t_err": "Esa no es la respuesta. Pensalo otra vez.",
  "t1_instr": "Tarea uno. Si una hora tiene sesenta minutos, ¿qué parte de la hora son quince minutos?",
  "t1_ok": "¡Correcto! Quince minutos son un cuarto de hora.",
  "t2_instr": "Tarea dos. Juana repartió, en partes iguales, cinco barras de cereales entre cuatro amigos y no le sobró nada. ¿Cuál de las siguientes expresiones indica cuánto le tocó a cada uno?",
  "t2_ok": "¡Correcto! Cinco barras entre cuatro: cinco cuartos para cada uno, o sea una barra y un cuarto.",
  "t3_instr": "Tarea tres. Dada la siguiente representación gráfica, ¿qué fracción representa la parte pintada?",
  "t3_ok": "¡Correcto! Cada entero tiene nueve partes y hay catorce pintadas: catorce novenos.",
  "t4_instr": "Tarea cuatro. Teniendo en cuenta la representación, indicá si cada frase es verdadera o falsa.",
  "t4_1": "La parte pintada es tres cuartos.",
  "t4_1ok": "¡Correcto! Cada cuarto tiene dos octavos. Seis octavos son tres cuartos.",
  "t4_2": "Para escribir la fracción que corresponde a la parte pintada, solo debemos ver las partes iguales en que se divide el entero.",
  "t4_2ok": "¡Correcto! Es falso: también hay que contar las partes pintadas.",
  "t4_3": "Para representar un entero, hay que pintar las dos partes que faltan.",
  "t4_3ok": "¡Correcto! Con las dos que faltan se completan los ocho octavos.",
  "t4_4": "Representa una fracción mayor que el entero.",
  "t4_4ok": "¡Correcto! Es falso: no llega a completar el entero.",
  "t4_5": "La fracción que representa la parte pintada es dos sextos.",
  "t4_5ok": "¡Correcto! Es falso: son seis octavos.",
  "cierre": "¡Terminaste la investigación, detective! Mirá cuántos aciertos lograste. Si querés, podés volver a jugar."
 },
 "pantallas": [
  {
   "tipo": "portada",
   "img": "img/portada.jpg",
   "audio": "portada"
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 ¿Qué es una fracción?",
   "pasos": [
    {
     "audio": "n1_1",
     "texto": "Un entero dividido en <b>4 partes iguales</b>.",
     "visual": {
      "tipo": "fraccion",
      "forma": "circulo",
      "partes": 4,
      "pintadas": 0
     }
    },
    {
     "audio": "n1_2",
     "texto": "El de abajo (<b>denominador</b>): en cuántas partes se divide."
    },
    {
     "audio": "n1_3",
     "texto": "El de arriba (<b>numerador</b>): cuántas tomamos. <b>1/4</b>",
     "visual": {
      "tipo": "fraccion",
      "forma": "circulo",
      "partes": 4,
      "pintadas": 1
     }
    },
    {
     "audio": "n1_4",
     "texto": "Más que un entero: <b>3/2</b> = un entero y medio.",
     "visual": {
      "tipo": "fraccion",
      "forma": "circulo",
      "partes": 2,
      "pintadas": 3,
      "circulos": 2
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🍕 ¿Qué fracción es?",
   "instr": "fr_instr",
   "err": "fr_err",
   "rondas": [
    {
     "id": "f1",
     "visual": {
      "tipo": "fraccion",
      "forma": "circulo",
      "partes": 4,
      "pintadas": 3
     },
     "opciones": [
      "3/4",
      "1/4",
      "4/3",
      "3/1"
     ],
     "respuesta": "3/4",
     "ok": "fr1_ok"
    },
    {
     "id": "f2",
     "visual": {
      "tipo": "fraccion",
      "forma": "cuadros",
      "grupos": [
       {
        "filas": 2,
        "cols": 4,
        "pintadas": 1
       }
      ]
     },
     "opciones": [
      "1/8",
      "8/1",
      "1/4",
      "7/8"
     ],
     "respuesta": "1/8",
     "ok": "fr2_ok"
    },
    {
     "id": "f3",
     "visual": {
      "tipo": "fraccion",
      "forma": "circulo",
      "partes": 2,
      "pintadas": 3,
      "circulos": 2
     },
     "opciones": [
      "3/2",
      "2/3",
      "3/4",
      "1/2"
     ],
     "respuesta": "3/2",
     "ok": "fr3_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 Fracciones de la hora",
   "pasos": [
    {
     "audio": "n2_1",
     "texto": "Una hora = <b>60 minutos</b> = un entero.",
     "visual": {
      "tipo": "fraccion",
      "forma": "reloj",
      "minutos": 0
     }
    },
    {
     "audio": "n2_2",
     "texto": "30 minutos = <b>1/2</b> hora.",
     "visual": {
      "tipo": "fraccion",
      "forma": "reloj",
      "minutos": 30
     }
    },
    {
     "audio": "n2_3",
     "texto": "15 minutos = <b>1/4</b> de hora.",
     "visual": {
      "tipo": "fraccion",
      "forma": "reloj",
      "minutos": 15
     }
    },
    {
     "audio": "n2_4",
     "texto": "45 minutos = <b>3/4</b> de hora.",
     "visual": {
      "tipo": "fraccion",
      "forma": "reloj",
      "minutos": 45
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "⏰ Horas y repartos",
   "instr": "ho_instr",
   "err": "ho_err",
   "rondas": [
    {
     "id": "h1",
     "audio": "ho1",
     "texto": "¿Qué parte de la hora son <b>30 minutos</b>?",
     "visual": {
      "tipo": "fraccion",
      "forma": "reloj",
      "minutos": 30
     },
     "opciones": [
      "1/2",
      "1/4",
      "30/1",
      "2/1"
     ],
     "respuesta": "1/2",
     "ok": "ho1_ok"
    },
    {
     "id": "h2",
     "audio": "ho2",
     "texto": "¿Qué parte de la hora son <b>45 minutos</b>?",
     "visual": {
      "tipo": "fraccion",
      "forma": "reloj",
      "minutos": 45
     },
     "opciones": [
      "3/4",
      "1/4",
      "45/4",
      "4/3"
     ],
     "respuesta": "3/4",
     "ok": "ho2_ok"
    },
    {
     "id": "h3",
     "audio": "ho3",
     "texto": "<b>3 alfajores</b> entre <b>2 amigos</b>, sin que sobre. ¿Cuánto le toca a cada uno?",
     "visual": {
      "tipo": "fraccion",
      "forma": "barras",
      "n": 3,
      "emoji": "🍪",
      "nota": "3 alfajores ÷ 2 amigos"
     },
     "opciones": [
      "3/2",
      "2/3",
      "1/3",
      "1/2"
     ],
     "respuesta": "3/2",
     "ok": "ho3_ok"
    },
    {
     "id": "h4",
     "audio": "ho4",
     "texto": "<b>1 pizza</b> entre <b>4 amigos</b>. ¿Cuánto le toca a cada uno?",
     "visual": {
      "tipo": "fraccion",
      "forma": "barras",
      "n": 1,
      "emoji": "🍕",
      "nota": "1 pizza ÷ 4 amigos"
     },
     "opciones": [
      "1/4",
      "4/1",
      "1/2",
      "4/4"
     ],
     "respuesta": "1/4",
     "ok": "ho4_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "✅ ¿Verdadero o falso?",
   "instr": "vf_instr",
   "err": "vf_err",
   "visual": {
    "tipo": "fraccion",
    "forma": "cuadros",
    "grupos": [
     {
      "filas": 2,
      "cols": 3,
      "pintadas": 4
     }
    ]
   },
   "items": [
    {
     "id": "v1",
     "audio": "vf1",
     "texto": "La parte pintada es 4/6.",
     "v": true,
     "ok": "vf1_ok"
    },
    {
     "id": "v2",
     "audio": "vf2",
     "texto": "Para completar el entero hay que pintar 2 partes más.",
     "v": true,
     "ok": "vf2_ok"
    },
    {
     "id": "v3",
     "audio": "vf3",
     "texto": "Representa una fracción mayor que el entero.",
     "v": false,
     "ok": "vf3_ok"
    },
    {
     "id": "v4",
     "audio": "vf4",
     "texto": "La parte pintada es 2/6.",
     "v": false,
     "ok": "vf4_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🏆 ¡Llegó el desafío!",
   "img": "img/desafio.jpg",
   "pasos": [
    {
     "audio": "de_1",
     "texto": "¡Ya sos un <b>detective</b> de las fracciones!"
    },
    {
     "audio": "de_2",
     "texto": "Ahora, las <b>4 tareas</b> de la ficha de la escuela."
    },
    {
     "audio": "de_3",
     "texto": "Pensá bien: <b>cada respuesta cuenta una sola vez</b>."
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 1",
   "instr": "t1_instr",
   "err": "t_err",
   "rondas": [
    {
     "id": "t1",
     "texto": "Si una hora tiene 60 minutos, ¿qué parte de la hora son <b>15 minutos</b>?",
     "visual": {
      "tipo": "fraccion",
      "forma": "reloj",
      "minutos": 15
     },
     "opciones": [
      "4/60",
      "1/4",
      "15/4",
      "60/15"
     ],
     "respuesta": "1/4",
     "ok": "t1_ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "instr": "t2_instr",
   "err": "t_err",
   "rondas": [
    {
     "id": "t2",
     "texto": "Juana repartió, en partes iguales, <b>5 barras de cereales</b> entre <b>4 amigos</b> y no le sobró nada. ¿Cuánto le tocó a cada uno?",
     "visual": {
      "tipo": "fraccion",
      "forma": "barras",
      "n": 5,
      "emoji": "🍫",
      "nota": "5 barras ÷ 4 amigos"
     },
     "opciones": [
      "1/5",
      "1/4",
      "4/5",
      "5/4"
     ],
     "respuesta": "5/4",
     "ok": "t2_ok"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 3",
   "instr": "t3_instr",
   "err": "t_err",
   "rondas": [
    {
     "id": "t3",
     "texto": "¿Qué fracción representa la parte pintada?",
     "visual": {
      "tipo": "fraccion",
      "forma": "cuadros",
      "grupos": [
       {
        "filas": 3,
        "cols": 3,
        "pintadas": 9
       },
       {
        "filas": 3,
        "cols": 3,
        "mapa": [
         1,
         1,
         1,
         1,
         0,
         0,
         1,
         0,
         0
        ]
       }
      ]
     },
     "opciones": [
      "14/9",
      "9/14",
      "4/14",
      "2/14"
     ],
     "respuesta": "14/9",
     "ok": "t3_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 4",
   "instr": "t4_instr",
   "err": "t_err",
   "visual": {
    "tipo": "fraccion",
    "forma": "circulo",
    "partes": 8,
    "pintadas": 6,
    "gris": true,
    "cuartos": true
   },
   "items": [
    {
     "id": "t4a",
     "audio": "t4_1",
     "texto": "La parte pintada es 3/4.",
     "v": true,
     "ok": "t4_1ok"
    },
    {
     "id": "t4b",
     "audio": "t4_2",
     "texto": "Para escribir la fracción de la parte pintada solo debemos ver las partes iguales en que se divide el entero.",
     "v": false,
     "ok": "t4_2ok"
    },
    {
     "id": "t4c",
     "audio": "t4_3",
     "texto": "Para representar un entero, hay que pintar las dos partes que faltan.",
     "v": true,
     "ok": "t4_3ok"
    },
    {
     "id": "t4d",
     "audio": "t4_4",
     "texto": "Representa una fracción mayor al entero.",
     "v": false,
     "ok": "t4_4ok"
    },
    {
     "id": "t4e",
     "audio": "t4_5",
     "texto": "La fracción que representa la parte pintada es 2/6.",
     "v": false,
     "ok": "t4_5ok"
    }
   ]
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
