/* DETECTIVES DE LA SUMA Y LA RESTA — Matemática · 🔢 Matemática · 1.er grado
   Basado en la Ficha N.º 2 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de la suma y la resta",
  "subtitulo": "Ficha 2: Operaciones",
  "area": "🔢 Matemática · 1.er grado",
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
  "a01": "Mateo hizo cinco goles y Sofía hizo ocho. ¿Cuántos goles más hizo Sofía?",
  "a02": "Podemos contar desde el cinco hasta el ocho: seis, siete, ocho. ¡Son tres goles más!",
  "a03": "También podemos restar: ocho menos cinco es igual a tres.",
  "a04": "Esa no es. Contá desde el número más chico hasta el más grande, o restá.",
  "a05": "Leé el problema y tocá la respuesta correcta.",
  "a06": "Lucas hizo seis goles y Tomi hizo diez. ¿Cuántos goles más hizo Tomi?",
  "a07": "¡Sí! De seis a diez hay cuatro. Diez menos seis es cuatro.",
  "a08": "Abril hizo siete goles y Juana hizo doce. ¿Cuántos goles más hizo Juana?",
  "a09": "¡Muy bien! De siete a doce hay cinco. Doce menos siete es cinco.",
  "a10": "Benja hizo nueve goles y Luz hizo quince. ¿Cuántos goles más hizo Luz?",
  "a11": "¡Excelente! De nueve a quince hay seis. Quince menos nueve es seis.",
  "a12": "En el tablero, avanzar es ir hacia los números más grandes. Cuando avanzamos, sumamos.",
  "a13": "Si estoy en el casillero diez y avanzo tres lugares, llego al trece. Diez más tres es trece.",
  "a14": "Retroceder es volver hacia atrás. Cuando retrocedemos, restamos. Si estoy en el diez y retrocedo tres, llego al siete.",
  "a15": "Esa no es. Poné el dedo en el casillero y contá los saltos uno por uno.",
  "a16": "Mirá el tablero, contá con el dedo y tocá la respuesta correcta.",
  "a17": "Estoy en el casillero quince y retrocedo al once. ¿Qué número salió en el dado?",
  "a18": "¡Sí! Del quince al once hay cuatro lugares. Quince menos cuatro es once.",
  "a19": "Estoy en el casillero veinte y avanzo seis lugares. ¿A qué casillero llego?",
  "a20": "¡Muy bien! Veinte más seis es veintiséis.",
  "a21": "Estaba en el casillero nueve y llegué al catorce. ¿Qué número salió en el dado?",
  "a22": "¡Excelente! Del nueve al catorce hay cinco lugares.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 3 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "a23": "Tarea uno. Durante el campeonato de fútbol, Milo hizo nueve goles y Augusto diecisiete. ¿Cuántos goles más hizo Augusto?",
  "a24": "¡Correcto! Augusto hizo ocho goles más: diecisiete menos nueve es ocho.",
  "a25": "Tarea dos. En un juego, Emilio estaba en el casillero veinticuatro. Si tuvo que retroceder al casillero diecinueve, ¿qué número le salió en el dado?",
  "a26": "¡Correcto! Del veinticuatro al diecinueve hay cinco lugares.",
  "a27": "Tarea tres. Observá el tablero del juego. Leé cada frase y tocá Verdadero o Falso.",
  "a28": "Ana estaba en el casillero siete y avanza cuatro lugares. Ahora está en el once.",
  "a29": "¡Correcto! Siete más cuatro es once. Es verdadero.",
  "a30": "Juan estaba en el casillero doce y retrocede cinco lugares. Ahora está en el cinco.",
  "a31": "¡Correcto! Es falso: doce menos cinco es siete, no cinco.",
  "a32": "Eva avanzó cuatro lugares y ahora está en el doce. Antes estaba en el casillero ocho.",
  "a33": "¡Correcto! Ocho más cuatro es doce. Es verdadero.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar problemas de sumar y restar: goles de fútbol y un juego de tablero. Tocá Comenzar.",
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
   "titulo": "🔎 ¿Cuántos más?",
   "pasos": [
    {
     "audio": "a01",
     "texto": "Mateo hizo <b>5</b> goles y Sofía hizo <b>8</b>. ¿Cuántos más hizo Sofía?",
     "visual": {
      "tipo": "texto",
      "html": "Mateo ⚽⚽⚽⚽⚽<br>Sofía ⚽⚽⚽⚽⚽⚽⚽⚽"
     }
    },
    {
     "audio": "a02",
     "texto": "Contamos desde el 5 hasta el 8: <b>6, 7, 8</b>. ¡Son <b>3</b> más!",
     "visual": {
      "tipo": "texto",
      "html": "Mateo ⚽⚽⚽⚽⚽<br>Sofía ⚽⚽⚽⚽⚽<b style=\"color:#e63946\">⚽⚽⚽</b>"
     }
    },
    {
     "audio": "a03",
     "texto": "También podemos restar: <b>8 − 5 = 3</b>."
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "⚽ ¿Cuántos goles más?",
   "instr": "a05",
   "err": "a04",
   "rondas": [
    {
     "id": "a06",
     "texto": "Lucas hizo <b>6</b> goles y Tomi hizo <b>10</b>. ¿Cuántos goles más hizo Tomi?",
     "opciones": [
      16,
      4,
      6,
      5
     ],
     "ok": "a07",
     "audio": "a06",
     "respuesta": 4,
     "visual": {
      "tipo": "texto",
      "html": "Lucas ⚽⚽⚽⚽⚽⚽<br>Tomi ⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽"
     }
    },
    {
     "id": "a08",
     "texto": "Abril hizo <b>7</b> goles y Juana hizo <b>12</b>. ¿Cuántos goles más hizo Juana?",
     "opciones": [
      19,
      5,
      7,
      6
     ],
     "ok": "a09",
     "audio": "a08",
     "respuesta": 5,
     "visual": {
      "tipo": "emoji",
      "e": "⚽🥅"
     }
    },
    {
     "id": "a10",
     "texto": "Benja hizo <b>9</b> goles y Luz hizo <b>15</b>. ¿Cuántos goles más hizo Luz?",
     "opciones": [
      24,
      6,
      9,
      7
     ],
     "ok": "a11",
     "audio": "a10",
     "respuesta": 6,
     "visual": {
      "tipo": "emoji",
      "e": "⚽🥅"
     }
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 El tablero del juego",
   "pasos": [
    {
     "audio": "a12",
     "texto": "En el tablero, <b>avanzar</b> es ir hacia los números más grandes: <b>sumamos</b>.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 492 312\" xmlns=\"http://www.w3.org/2000/svg\"><g class=\"cas\" data-n=\"1\"><rect x=\"66\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"126\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"186\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"246\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"306\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"366\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"366\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"306\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"246\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"186\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"126\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"66\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"66\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"126\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"186\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"246\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"306\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"366\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"366\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"306\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"246\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"186\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"126\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"66\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"66\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"126\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"186\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"246\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"306\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"366\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g><rect x=\"6\" y=\"6\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#2a9d8f\"/><text x=\"32\" y=\"39.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"11\" fill=\"#fff\" transform=\"rotate(-90 32 34.0)\">Entrada</text><rect x=\"430\" y=\"246\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#e63946\"/><text x=\"456\" y=\"279.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#fff\">Salida</text><text x=\"430\" y=\"70\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"130\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"430\" y=\"190\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"250\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text></svg></span>"
     }
    },
    {
     "audio": "a13",
     "texto": "Si estoy en el <b>10</b> y avanzo <b>3</b>, llego al <b>13</b>: 10 + 3 = 13.",
     "tab": {
      "ini": 10,
      "fin": 13,
      "luz": [
       10
      ],
      "demora": 2200
     }
    },
    {
     "audio": "a14",
     "texto": "<b>Retroceder</b> es volver hacia atrás: <b>restamos</b>. Si estoy en el 10 y retrocedo 3, llego al <b>7</b>.",
     "tab": {
      "ini": 10,
      "fin": 7,
      "luz": [
       10
      ],
      "demora": 5200
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🎲 ¡A jugar!",
   "instr": "a16",
   "err": "a15",
   "rondas": [
    {
     "id": "a17",
     "texto": "Estoy en el <b>15</b> y retrocedo al <b>11</b>. ¿Qué número salió en el dado?",
     "opciones": [
      3,
      4,
      5
     ],
     "ok": "a18",
     "audio": "a17",
     "respuesta": 4,
     "tab": {
      "ini": 15,
      "fin": 11,
      "luz": [
       15,
       11
      ]
     }
    },
    {
     "id": "a19",
     "texto": "Estoy en el <b>20</b> y avanzo <b>6</b>. ¿A qué casillero llego?",
     "opciones": [
      26,
      24,
      14
     ],
     "ok": "a20",
     "audio": "a19",
     "respuesta": 26,
     "tab": {
      "ini": 20,
      "fin": 26,
      "luz": [
       20
      ]
     }
    },
    {
     "id": "a21",
     "texto": "Estaba en el <b>9</b> y llegué al <b>14</b>. ¿Qué número salió en el dado?",
     "opciones": [
      4,
      5,
      6
     ],
     "ok": "a22",
     "audio": "a21",
     "respuesta": 5,
     "tab": {
      "ini": 9,
      "fin": 14,
      "luz": [
       9,
       14
      ]
     }
    }
   ],
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 492 312\" xmlns=\"http://www.w3.org/2000/svg\"><g class=\"cas\" data-n=\"1\"><rect x=\"66\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"126\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"186\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"246\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"306\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"366\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"366\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"306\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"246\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"186\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"126\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"66\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"66\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"126\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"186\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"246\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"306\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"366\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"366\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"306\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"246\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"186\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"126\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"66\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"66\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"126\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"186\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"246\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"306\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"366\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g><rect x=\"6\" y=\"6\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#2a9d8f\"/><text x=\"32\" y=\"39.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"11\" fill=\"#fff\" transform=\"rotate(-90 32 34.0)\">Entrada</text><rect x=\"430\" y=\"246\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#e63946\"/><text x=\"456\" y=\"279.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#fff\">Salida</text><text x=\"430\" y=\"70\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"130\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"430\" y=\"190\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"250\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text></svg></span>"
   }
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
   "tipo": "opcion",
   "titulo": "🏆 Tarea 1",
   "err": "t_err",
   "rondas": [
    {
     "id": "a23",
     "texto": "Durante el campeonato de fútbol, Milo hizo <b>9</b> goles y Augusto <b>17</b>. ¿Cuántos goles más hizo Augusto?",
     "opciones": [
      26,
      9,
      8,
      7
     ],
     "ok": "a24",
     "audio": "a23",
     "respuesta": 8,
     "visual": {
      "tipo": "emoji",
      "e": "⚽🏆"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "err": "t_err",
   "rondas": [
    {
     "id": "a25",
     "texto": "En un juego, Emilio estaba en el casillero <b>24</b>. Si tuvo que retroceder al casillero <b>19</b>, ¿qué número le salió en el dado?",
     "opciones": [
      6,
      5,
      4
     ],
     "ok": "a26",
     "audio": "a25",
     "respuesta": 5,
     "tab": {
      "ini": 24,
      "fin": 19,
      "luz": [
       24,
       19
      ]
     }
    }
   ],
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 492 312\" xmlns=\"http://www.w3.org/2000/svg\"><g class=\"cas\" data-n=\"1\"><rect x=\"66\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"126\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"186\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"246\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"306\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"366\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"366\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"306\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"246\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"186\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"126\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"66\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"66\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"126\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"186\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"246\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"306\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"366\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"366\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"306\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"246\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"186\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"126\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"66\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"66\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"126\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"186\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"246\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"306\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"366\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g><rect x=\"6\" y=\"6\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#2a9d8f\"/><text x=\"32\" y=\"39.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"11\" fill=\"#fff\" transform=\"rotate(-90 32 34.0)\">Entrada</text><rect x=\"430\" y=\"246\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#e63946\"/><text x=\"456\" y=\"279.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#fff\">Salida</text><text x=\"430\" y=\"70\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"130\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"430\" y=\"190\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"250\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text></svg></span>"
   }
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 3",
   "instr": "a27",
   "err": "t_err",
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 492 312\" xmlns=\"http://www.w3.org/2000/svg\"><g class=\"cas\" data-n=\"1\"><rect x=\"66\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"126\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"186\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"246\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"306\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"366\" y=\"6\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"45.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"366\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"306\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"246\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"186\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"126\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"66\" y=\"66\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"105.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"66\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"126\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"186\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"246\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"306\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"366\" y=\"126\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"165.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"366\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"306\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"246\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"186\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"126\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"66\" y=\"186\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"225.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"66\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffd6a5\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"94.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"126\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#caffbf\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"154.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"186\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#9bf6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"214.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"246\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#bdb2ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"274.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"306\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#ffc6ff\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"334.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"366\" y=\"246\" width=\"56\" height=\"56\" rx=\"10\" fill=\"#fdffb6\" stroke=\"#333\" stroke-width=\"2.5\"/><text x=\"394.0\" y=\"285.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial,sans-serif\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g><rect x=\"6\" y=\"6\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#2a9d8f\"/><text x=\"32\" y=\"39.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"11\" fill=\"#fff\" transform=\"rotate(-90 32 34.0)\">Entrada</text><rect x=\"430\" y=\"246\" width=\"52\" height=\"56\" rx=\"10\" fill=\"#e63946\"/><text x=\"456\" y=\"279.0\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#fff\">Salida</text><text x=\"430\" y=\"70\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"130\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"430\" y=\"190\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text><text x=\"58\" y=\"250\" text-anchor=\"middle\" font-size=\"26\" fill=\"#555\">↓</text></svg></span>"
   },
   "items": [
    {
     "id": "a28",
     "audio": "a28",
     "texto": "Ana estaba en el casillero 7 y avanza 4 lugares, ahora está en el 11.",
     "v": true,
     "ok": "a29",
     "tab": {
      "ini": 7,
      "fin": 11,
      "luz": [
       7,
       11
      ]
     }
    },
    {
     "id": "a30",
     "audio": "a30",
     "texto": "Juan estaba en el casillero 12 y retrocede 5 lugares, ahora está en el 5.",
     "v": false,
     "ok": "a31",
     "tab": {
      "ini": 12,
      "fin": 7,
      "luz": [
       12,
       5
      ]
     }
    },
    {
     "id": "a32",
     "audio": "a32",
     "texto": "Eva avanzó 4 lugares y ahora está en 12. Antes estaba en el casillero 8.",
     "v": true,
     "ok": "a33",
     "tab": {
      "ini": 8,
      "fin": 12,
      "luz": [
       12,
       8
      ]
     }
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
