/* DETECTIVES DEL CÁLCULO MENTAL — Matemática · 🔢 Matemática · 2.º grado
   Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives del cálculo mental",
  "subtitulo": "Ficha 3: Número y operaciones",
  "area": "🔢 Matemática · 2.º grado",
  "fuente": "Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial",
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
  "b01": "Si sabemos que siete más siete es catorce, entonces setenta más setenta es ciento cuarenta.",
  "b02": "Para setenta y cinco más setenta y cinco, pensamos: setenta más setenta, ciento cuarenta, y cinco más cinco, diez. Ciento cuarenta más diez, ciento cincuenta.",
  "b03": "Para setenta y ocho más trece: setenta y ocho más diez, ochenta y ocho, y ochenta y ocho más tres, noventa y uno.",
  "b04": "Esa no es. Sumá primero los dieces y después los unos.",
  "b05": "Calculá mentalmente y tocá el resultado.",
  "b06": "Sesenta y cinco más sesenta y cinco.",
  "b07": "¡Sí! Sesenta más sesenta, ciento veinte, y cinco más cinco, diez: ciento treinta.",
  "b08": "Cuarenta y siete más quince.",
  "b09": "¡Muy bien! Cuarenta y siete más diez, cincuenta y siete, más cinco, sesenta y dos.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 3 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "b10": "Tarea uno. Completá el resultado del cálculo. Tocá el número que va en el casillero.",
  "b11": "¡Correcto! Setenta y cinco más setenta y cinco es ciento cincuenta.",
  "b12": "Tarea dos. El resultado de setenta y ocho más trece es:",
  "b13": "¡Correcto! Setenta y ocho más trece es noventa y uno.",
  "b14": "Tarea tres. Ubicá cada cálculo en la columna que corresponde: tocá Dan cincuenta o Dan setenta.",
  "b15": "Cincuenta más veinte.",
  "b16": "¡Correcto! Cincuenta más veinte da setenta.",
  "b17": "Veinticinco más veinticinco.",
  "b18": "¡Correcto! Veinticinco más veinticinco da cincuenta.",
  "b19": "Treinta más veinte.",
  "b20": "¡Correcto! Treinta más veinte da cincuenta.",
  "b21": "Sesenta más diez.",
  "b22": "¡Correcto! Sesenta más diez da setenta.",
  "b23": "Cuarenta y cinco más cinco.",
  "b24": "¡Correcto! Cuarenta y cinco más cinco da cincuenta.",
  "b25": "Treinta y cinco más treinta y cinco.",
  "b26": "¡Correcto! Treinta y cinco más treinta y cinco da setenta.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a resolver sumas con cálculos que nos ayudan a pensar más rápido. Tocá Comenzar.",
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
   "titulo": "🔎 Cálculos que ayudan",
   "pasos": [
    {
     "audio": "b01",
     "texto": "Si sabemos que <b>7 + 7 = 14</b>, entonces <b>70 + 70 = 140</b>.",
     "visual": {
      "tipo": "texto",
      "html": "7 + 7 = 14<br>70 + 70 = <b>140</b>"
     }
    },
    {
     "audio": "b02",
     "texto": "Para <b>75 + 75</b> pensamos: 70 + 70 = 140 y 5 + 5 = 10. ¡140 + 10 = <b>150</b>!",
     "visual": {
      "tipo": "texto",
      "html": "75 + 75<br>70 + 70 = 140 · 5 + 5 = 10<br>= <b>150</b>"
     }
    },
    {
     "audio": "b03",
     "texto": "Para <b>78 + 13</b>: 78 + 10 = 88 y 88 + 3 = <b>91</b>.",
     "visual": {
      "tipo": "texto",
      "html": "78 + 10 = 88<br>88 + 3 = <b>91</b>"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧮 Cálculo mental",
   "instr": "b05",
   "err": "b04",
   "rondas": [
    {
     "id": "b06",
     "texto": "<b>65 + 65</b> =",
     "opciones": [
      "130",
      "120",
      "1210",
      "125"
     ],
     "ok": "b07",
     "audio": "b06",
     "respuesta": "130",
     "visual": {
      "tipo": "emoji",
      "e": "🧠"
     }
    },
    {
     "id": "b08",
     "texto": "<b>47 + 15</b> =",
     "opciones": [
      "62",
      "52",
      "512",
      "72"
     ],
     "ok": "b09",
     "audio": "b08",
     "respuesta": "62",
     "visual": {
      "tipo": "emoji",
      "e": "🧠"
     }
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
   "tipo": "huecos",
   "titulo": "🏆 Tarea 1",
   "instr": "b10",
   "err": "t_err",
   "ok": "b11",
   "texto": "Completar el resultado del siguiente cálculo:",
   "frases": [
    {
     "id": "h1",
     "ico": "🧮",
     "html": "<b>75 + 75 =</b> ___",
     "resp": [
      "150"
     ]
    }
   ],
   "banco": [
    "140",
    "150",
    "710",
    "155"
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "err": "t_err",
   "rondas": [
    {
     "id": "b12",
     "texto": "El resultado de <b>78 + 13</b> es:",
     "opciones": [
      "911",
      "191",
      "101",
      "91"
     ],
     "ok": "b13",
     "audio": "b12",
     "respuesta": "91",
     "visual": {
      "tipo": "emoji",
      "e": "🧮"
     }
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 3",
   "instr": "b14",
   "err": "t_err",
   "visual": {
    "tipo": "emoji",
    "e": "🧮"
   },
   "items": [
    {
     "id": "b15",
     "audio": "b15",
     "texto": "50 + 20",
     "v": false,
     "ok": "b16"
    },
    {
     "id": "b17",
     "audio": "b17",
     "texto": "25 + 25",
     "v": true,
     "ok": "b18"
    },
    {
     "id": "b19",
     "audio": "b19",
     "texto": "30 + 20",
     "v": true,
     "ok": "b20"
    },
    {
     "id": "b21",
     "audio": "b21",
     "texto": "60 + 10",
     "v": false,
     "ok": "b22"
    },
    {
     "id": "b23",
     "audio": "b23",
     "texto": "45 + 5",
     "v": true,
     "ok": "b24"
    },
    {
     "id": "b25",
     "audio": "b25",
     "texto": "35 + 35",
     "v": false,
     "ok": "b26"
    }
   ],
   "etiquetas": [
    "cálculos que dan 50",
    "cálculos que dan 70"
   ]
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
