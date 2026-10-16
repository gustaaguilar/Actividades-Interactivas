/* DETECTIVES DE LAS MEDALLAS — Matemática · 🔢 Matemática · 7.º grado
   Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de las medallas",
  "subtitulo": "Ficha 3: Operaciones combinadas",
  "area": "🔢 Matemática · 7.º grado",
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
  "g01": "Primero resolvemos lo que está entre paréntesis.",
  "g02": "Después, las multiplicaciones y las divisiones.",
  "g03": "Por último, las sumas y las restas. Por ejemplo, tres más dos por cuatro es tres más ocho, once. Pero, entre paréntesis, tres más dos, por cuatro, es cinco por cuatro, veinte.",
  "g04": "Esa no es. Recordá: primero paréntesis, después multiplicaciones, al final sumas.",
  "g05": "Resolvé respetando el orden y tocá el resultado.",
  "g06": "Dos más tres por cinco.",
  "g07": "¡Sí! Primero tres por cinco, quince, y después dos más quince, diecisiete.",
  "g08": "Entre paréntesis dos más tres, por cinco.",
  "g09": "¡Muy bien! Primero el paréntesis, cinco, y después cinco por cinco, veinticinco.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 4 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "g10": "Tarea uno. Resolvé las operaciones y averiguá cuántas medallas obtuvo cada país.",
  "g11": "Argentina: seis por, entre paréntesis, siete menos dos, más dos.",
  "g12": "¡Correcto! Siete menos dos, cinco; seis por cinco, treinta; más dos, treinta y dos medallas.",
  "g13": "Brasil: cinco por diez, más dos por dos, más uno.",
  "g14": "¡Correcto! Cincuenta más cuatro más uno, cincuenta y cinco medallas.",
  "g15": "Tarea dos. Un desafío especial para México. Sabemos que México obtuvo treinta y siete medallas, pero se perdió la forma en que se organizaron las operaciones. ¿Dónde hay que colocar los paréntesis para que la igualdad sea verdadera?",
  "g16": "¡Correcto! Dos más cuatro, seis; cinco por seis, treinta; más siete, treinta y siete.",
  "g17": "Tarea tres. Para pensar. ¿Cuál es el orden en el que se deben resolver las operaciones? Tocá las opciones en orden: primero la que va primero.",
  "g18": "¡Excelente! Primero paréntesis, después multiplicaciones y divisiones, y al final sumas y restas.",
  "g19": "Tarea cuatro. ¿Qué cambia cuando movemos los paréntesis? Uní cada expresión con su resultado: tocá el resultado de cada una.",
  "g20": "a. Ocho más cuatro por dos.",
  "g21": "¡Correcto! Cuatro por dos, ocho; más ocho, dieciséis.",
  "g22": "b. Entre paréntesis ocho más cuatro, por dos.",
  "g23": "¡Correcto! Doce por dos, veinticuatro.",
  "g24": "c. Ocho más, entre paréntesis, cuatro por dos.",
  "g25": "¡Correcto! También dieciséis: el paréntesis no cambia nada porque la multiplicación ya iba primero.",
  "g26": "d. Entre paréntesis ocho más cuatro, dividido dos.",
  "g27": "¡Correcto! Doce dividido dos, seis.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a resolver cálculos combinados para descubrir cuántas medallas ganó cada país. Tocá Comenzar.",
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
   "titulo": "🔎 El orden de las operaciones",
   "pasos": [
    {
     "audio": "g01",
     "texto": "Primero resolvemos lo que está entre <b>paréntesis</b>.",
     "visual": {
      "tipo": "texto",
      "html": "<b>1.</b> ( )"
     }
    },
    {
     "audio": "g02",
     "texto": "Después, las <b>multiplicaciones y divisiones</b>.",
     "visual": {
      "tipo": "texto",
      "html": "<b>2.</b> × ÷"
     }
    },
    {
     "audio": "g03",
     "texto": "Por último, las <b>sumas y restas</b>. Ejemplo: 3 + 2 × 4 = 3 + 8 = <b>11</b>, pero (3 + 2) × 4 = 5 × 4 = <b>20</b>.",
     "visual": {
      "tipo": "texto",
      "html": "3 + 2 × 4 = <b>11</b><br>(3 + 2) × 4 = <b>20</b>"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧮 ¡A practicar!",
   "instr": "g05",
   "err": "g04",
   "rondas": [
    {
     "id": "g06",
     "texto": "<b>2 + 3 × 5</b> =",
     "opciones": [
      "17",
      "25",
      "30",
      "13"
     ],
     "ok": "g07",
     "audio": "g06",
     "respuesta": "17",
     "visual": {
      "tipo": "emoji",
      "e": "🧮"
     }
    },
    {
     "id": "g08",
     "texto": "<b>(2 + 3) × 5</b> =",
     "opciones": [
      "25",
      "17",
      "30",
      "10"
     ],
     "ok": "g09",
     "audio": "g08",
     "respuesta": "25",
     "visual": {
      "tipo": "emoji",
      "e": "🧮"
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
   "instr": "g10",
   "err": "t_err",
   "rondas": [
    {
     "id": "g11",
     "texto": "🇦🇷 Argentina: <b>6 × (7 − 2) + 2</b> = ___ medallas",
     "opciones": [
      "32",
      "44",
      "40",
      "30"
     ],
     "ok": "g12",
     "audio": "g11",
     "respuesta": "32"
    },
    {
     "id": "g13",
     "texto": "🇧🇷 Brasil: <b>5 × 10 + 2 × 2 + 1</b> = ___ medallas",
     "opciones": [
      "55",
      "105",
      "109",
      "54"
     ],
     "ok": "g14",
     "audio": "g13",
     "respuesta": "55"
    }
   ],
   "visual": {
    "tipo": "emoji",
    "e": "🏅"
   }
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "err": "t_err",
   "rondas": [
    {
     "id": "g15",
     "texto": "México obtuvo <b>37</b> medallas, pero se perdieron los paréntesis. ¿Dónde hay que colocarlos para que <b>7 + 5 × 2 + 4 = 37</b> sea verdadera?",
     "opciones": [
      "(7 + 5) × 2 + 4 = 37",
      "7 + 5 × (2 + 4) = 37",
      "(7 + 5 × 2) + 4 = 37",
      "(7 + 5) × (2 + 4) = 37"
     ],
     "ok": "g16",
     "audio": "g15",
     "respuesta": "7 + 5 × (2 + 4) = 37",
     "visual": {
      "tipo": "emoji",
      "e": "🇲🇽🏅"
     }
    }
   ]
  },
  {
   "tipo": "ordenar",
   "titulo": "🏆 Tarea 3",
   "instr": "g17",
   "err": "t_err",
   "ok": "g18",
   "texto": "Ordená del 1 (primero) al 3 (tercero).",
   "items": [
    "Paréntesis",
    "Multiplicaciones y divisiones",
    "Sumas y restas"
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 4",
   "instr": "g19",
   "err": "t_err",
   "rondas": [
    {
     "id": "g20",
     "texto": "a) <b>8 + 4 × 2</b>",
     "opciones": [
      "24",
      "16",
      "6"
     ],
     "ok": "g21",
     "audio": "g20",
     "respuesta": "16"
    },
    {
     "id": "g22",
     "texto": "b) <b>(8 + 4) × 2</b>",
     "opciones": [
      "24",
      "16",
      "6"
     ],
     "ok": "g23",
     "audio": "g22",
     "respuesta": "24"
    },
    {
     "id": "g24",
     "texto": "c) <b>8 + (4 × 2)</b>",
     "opciones": [
      "24",
      "16",
      "6"
     ],
     "ok": "g25",
     "audio": "g24",
     "respuesta": "16"
    },
    {
     "id": "g26",
     "texto": "d) <b>(8 + 4) ÷ 2</b>",
     "opciones": [
      "24",
      "16",
      "6"
     ],
     "ok": "g27",
     "audio": "g26",
     "respuesta": "6"
    }
   ],
   "visual": {
    "tipo": "emoji",
    "e": "🧮"
   }
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
