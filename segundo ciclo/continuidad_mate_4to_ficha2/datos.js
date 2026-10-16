/* DETECTIVES DE LA MULTIPLICACIÓN — Matemática · 🔢 Matemática · 4.º grado
   Basado en la Ficha N.º 2 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de la multiplicación",
  "subtitulo": "Ficha 2: Operaciones",
  "area": "🔢 Matemática · 4.º grado",
  "fuente": "Basado en la Ficha N.º 2 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial",
  "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
  "mail": "profegustaaguilar@gmail.com",
  "foto": "profe.jpg",
  "fotoMini": "profe_mini.jpg",
  "frase": "Menos prisa, más vida 🧉🫂",
  "puntosPorAcierto": 10,
  "revision": false
 },
 "audios": {
  "t_err": "Esa no es. Pensalo otra vez.",
  "d01": "Si en dos cajas hay catorce alfajores, en una caja hay siete: catorce dividido dos es siete.",
  "d02": "Sabiendo cuánto hay en una caja, multiplicamos: en diez cajas hay siete por diez, setenta alfajores.",
  "d03": "Otra forma: diez cajas son cinco veces dos cajas. Entonces, catorce por cinco, también setenta.",
  "d04": "Esa no es. Primero averiguá cuánto hay en uno, y después multiplicá.",
  "d05": "Leé cada problema y tocá la respuesta correcta.",
  "d06": "Con tres jarras de jugo se llenan dieciocho vasos. ¿Cuántos vasos se llenan con nueve jarras?",
  "d07": "¡Sí! Nueve jarras son tres veces tres jarras: dieciocho por tres, cincuenta y cuatro.",
  "d08": "En cuatro paquetes hay treinta y dos figuritas. ¿Cuántas hay en siete paquetes?",
  "d09": "¡Muy bien! En un paquete hay ocho, y en siete paquetes, ocho por siete, cincuenta y seis.",
  "d10": "Revisalo. Pensá cuánto cuesta un chocolate y cuántas veces más son veinte.",
  "d11": "Cinco chocolates cuestan quinientos pesos. ¿Qué procedimiento sirve para calcular cuánto cuestan veinte chocolates? Tocá Verdadero si sirve, o Falso si no sirve.",
  "d12": "Calcular quinientos por cuatro, porque veinte chocolates son cuatro veces cinco.",
  "d13": "¡Correcto! Sirve: veinte son cuatro veces cinco. Cuestan dos mil pesos.",
  "d14": "Calcular cuánto cuesta un chocolate, quinientos dividido cinco, y multiplicar por veinte.",
  "d15": "¡Muy bien! Sirve: un chocolate cuesta cien, y veinte cuestan dos mil.",
  "d16": "Calcular quinientos por veinte.",
  "d17": "¡Correcto! No sirve: quinientos es el precio de cinco chocolates, no de uno.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 3 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "d18": "Tarea uno. Morena compra cuarenta y dos alfajores que vienen en seis cajas. ¿Qué procedimiento permite calcular la cantidad de alfajores que habrá en treinta cajas? Tocá Verdadero o Falso.",
  "d19": "A. Calcular cuarenta y dos por seis, dividido treinta.",
  "d20": "¡Correcto! Es falso: ese cálculo no da los alfajores de treinta cajas.",
  "d21": "B. Calcular cuántos alfajores entran en una caja y multiplicar por treinta.",
  "d22": "¡Correcto! Es verdadero: en una caja hay siete, y siete por treinta es doscientos diez.",
  "d23": "C. Calcular treinta por cuarenta y dos, dividido seis.",
  "d24": "¡Correcto! Es verdadero: también da doscientos diez.",
  "d25": "Tarea dos. Se acerca el cumpleaños de Pedro y su mamá calcula que con dos jarras de jugo puede llenar dieciséis vasitos. Si tiene doce jarras, ¿cuántos vasitos puede llenar?",
  "d26": "¡Correcto! Con una jarra llena ocho vasitos, y con doce jarras, ocho por doce, noventa y seis.",
  "d27": "Tarea tres. En el kiosco de Beto, seis juguitos de naranja cuestan setecientos noventa y dos pesos. ¿Cuánto cuestan? Tocá la cantidad y después su precio.",
  "d28": "¡Excelente! Un juguito cuesta ciento treinta y dos pesos, y con eso calculaste todos los precios.",
  "d29": "¡Sí! Doce juguitos son el doble de seis: mil quinientos ochenta y cuatro pesos.",
  "d30": "¡Correcto! Dieciocho son el triple de seis: dos mil trescientos setenta y seis pesos.",
  "d31": "¡Muy bien! Treinta y dos juguitos cuestan cuatro mil doscientos veinticuatro pesos.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a usar la multiplicación para resolver problemas: cajas de alfajores, jarras de jugo y juguitos del kiosco. Tocá Comenzar.",
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
   "titulo": "🔎 Series proporcionales",
   "pasos": [
    {
     "audio": "d01",
     "texto": "Si en <b>2 cajas</b> hay <b>14 alfajores</b>, en <b>1 caja</b> hay <b>7</b>: 14 : 2 = 7.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Cajas",
       "Alfajores"
      ],
      "filas": [
       [
        "1",
        "7"
       ],
       [
        "2",
        "14"
       ]
      ]
     }
    },
    {
     "audio": "d02",
     "texto": "Sabiendo cuánto hay en 1 caja, multiplicamos: en <b>10 cajas</b> hay 7 × 10 = <b>70</b>.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Cajas",
       "Alfajores"
      ],
      "filas": [
       [
        "1",
        "7"
       ],
       [
        "2",
        "14"
       ],
       [
        "10",
        "70"
       ]
      ]
     }
    },
    {
     "audio": "d03",
     "texto": "Otra forma: 10 cajas son <b>5 veces</b> 2 cajas, entonces 14 × 5 = <b>70</b>.",
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Cajas",
       "Alfajores"
      ],
      "filas": [
       [
        "2",
        "14"
       ],
       [
        "10 (5 veces más)",
        "70 (5 veces más)"
       ]
      ]
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧮 ¡A resolver!",
   "instr": "d05",
   "err": "d04",
   "rondas": [
    {
     "id": "d06",
     "texto": "Con <b>3 jarras</b> de jugo se llenan <b>18 vasos</b>. ¿Cuántos vasos se llenan con <b>9 jarras</b>?",
     "opciones": [
      54,
      27,
      162,
      36
     ],
     "ok": "d07",
     "audio": "d06",
     "respuesta": 54,
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Jarras",
       "Vasos"
      ],
      "filas": [
       [
        "3",
        "18"
       ],
       [
        "9",
        "?"
       ]
      ]
     }
    },
    {
     "id": "d08",
     "texto": "En <b>4 paquetes</b> hay <b>32 figuritas</b>. ¿Cuántas hay en <b>7 paquetes</b>?",
     "opciones": [
      56,
      35,
      224,
      64
     ],
     "ok": "d09",
     "audio": "d08",
     "respuesta": 56,
     "visual": {
      "tipo": "tabla",
      "cab": [
       "Paquetes",
       "Figuritas"
      ],
      "filas": [
       [
        "4",
        "32"
       ],
       [
        "1",
        "?"
       ],
       [
        "7",
        "?"
       ]
      ]
     }
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🔍 ¿Sirve o no sirve?",
   "instr": "d11",
   "err": "d10",
   "visual": {
    "tipo": "emoji",
    "e": "🍫🍫🍫🍫🍫"
   },
   "items": [
    {
     "id": "d12",
     "audio": "d12",
     "texto": "Calcular 500 × 4, porque 20 chocolates son 4 veces 5.",
     "v": true,
     "ok": "d13"
    },
    {
     "id": "d14",
     "audio": "d14",
     "texto": "Calcular cuánto cuesta 1 chocolate (500 : 5) y multiplicar por 20.",
     "v": true,
     "ok": "d15"
    },
    {
     "id": "d16",
     "audio": "d16",
     "texto": "Calcular 500 × 20.",
     "v": false,
     "ok": "d17"
    }
   ],
   "etiquetas": [
    "✅ Sirve",
    "❌ No sirve"
   ],
   "enunciado": "<b>5</b> chocolates cuestan <b>$500</b>. ¿Qué procedimiento sirve para calcular cuánto cuestan <b>20</b> chocolates?"
  },
  {
   "tipo": "pasos",
   "titulo": "🏆 ¡Llegó el desafío!",
   "img": "img/desafio.jpg",
   "pasos": [
    {
     "audio": "de_1",
     "texto": "¡Ya sos un <b>detective</b>! Practicaste un montón."
    },
    {
     "audio": "de_2",
     "texto": "Ahora, las <b>3 tareas</b> de la ficha de la escuela."
    },
    {
     "audio": "de_3",
     "texto": "Pensá bien: <b>cada respuesta cuenta una sola vez</b>."
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 1",
   "instr": "d18",
   "err": "t_err",
   "visual": {
    "tipo": "texto",
    "html": "🍪 <b>42</b> alfajores en <b>6</b> cajas<br>¿Y en <b>30</b> cajas?"
   },
   "items": [
    {
     "id": "d19",
     "audio": "d19",
     "texto": "A. Calcular 42 × 6 : 30",
     "v": false,
     "ok": "d20"
    },
    {
     "id": "d21",
     "audio": "d21",
     "texto": "B. Calcular cuántos alfajores entran en 1 caja y multiplicar por 30.",
     "v": true,
     "ok": "d22"
    },
    {
     "id": "d23",
     "audio": "d23",
     "texto": "C. Calcular (30 × 42) : 6",
     "v": true,
     "ok": "d24"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "err": "t_err",
   "rondas": [
    {
     "id": "d25",
     "texto": "Se acerca el cumpleaños de Pedro y su mamá calcula que con <b>dos jarras</b> de jugo puede llenar <b>16 vasitos</b>. Si tiene <b>12 jarras</b>, ¿cuántos vasitos puede llenar?",
     "opciones": [
      90,
      96,
      816,
      192
     ],
     "ok": "d26",
     "audio": "d25",
     "respuesta": 96,
     "visual": {
      "tipo": "emoji",
      "e": "🎂🥤"
     }
    }
   ]
  },
  {
   "tipo": "asociar",
   "titulo": "🏆 Tarea 3",
   "instr": "d27",
   "err": "t_err",
   "ok": "d28",
   "cab": [
    "6 juguitos = $792",
    "Precio"
   ],
   "pares": [
    {
     "a": "12 juguitos",
     "b": "$1.584",
     "ok": "d29"
    },
    {
     "a": "18 juguitos",
     "b": "$2.376",
     "ok": "d30"
    },
    {
     "a": "32 juguitos",
     "b": "$4.224",
     "ok": "d31"
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
