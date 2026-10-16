/* DETECTIVES DEL CALENDARIO — Matemática · 🔢 Matemática · 1.er grado
   Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives del calendario",
  "subtitulo": "Ficha 3: Medida",
  "area": "🔢 Matemática · 1.er grado",
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
  "a01": "El calendario muestra los días del mes, ordenados en semanas. Cada fila es una semana.",
  "a02": "Una semana tiene siete días: lunes, martes, miércoles, jueves, viernes, sábado y domingo.",
  "a03": "Para saber qué día de la semana es una fecha, buscamos el número y miramos arriba, en su columna: ahí está el nombre del día.",
  "a04": "Esa no es. Buscá el número en el calendario y fijate en su columna.",
  "a05": "Mirá el calendario de octubre y tocá la respuesta correcta.",
  "a06": "¿Qué día de la semana es el cinco de octubre?",
  "a07": "¡Sí! El cinco de octubre es lunes.",
  "a08": "¿Cuántos días hay del cinco al doce de octubre?",
  "a09": "¡Muy bien! Doce menos cinco es siete: una semana.",
  "a10": "Para comparar el largo de dos lápices, los ponemos uno al lado del otro, empezando en el mismo lugar.",
  "a11": "El que llega más lejos es el más largo. El otro es el más corto.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 3 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "a12": "Tarea uno. El Día del Maestro se festeja el once de septiembre y el del Estudiante el veintiuno. ¿Cuántos días hay entre estos festejos?",
  "a13": "¡Correcto! Del once al veintiuno hay diez días: veintiuno menos once es diez.",
  "a14": "Tarea dos. Observá el calendario del mes de octubre. Leé cada frase y tocá Verdadero o Falso.",
  "a15": "El mes de octubre tiene treinta y un días.",
  "a16": "¡Correcto! Octubre termina en el treinta y uno.",
  "a17": "El diecisiete de octubre es día lunes.",
  "a18": "¡Correcto! Es falso: el diecisiete de octubre es sábado.",
  "a19": "En dos semanas hay dieciséis días.",
  "a20": "¡Correcto! Es falso: dos semanas son catorce días.",
  "a21": "El primer día de octubre es martes.",
  "a22": "¡Correcto! Es falso: el uno de octubre es jueves.",
  "a23": "Tarea tres. Observá los lápices de colores que tiene Amparo y respondé sí o no.",
  "a24": "a. ¿El lápiz rojo es más corto que el amarillo?",
  "a25": "¡Correcto! El rojo es más corto que el amarillo.",
  "a26": "b. ¿El lápiz verde tiene el mismo largo que el lápiz amarillo?",
  "a27": "¡Correcto! El verde es más corto que el amarillo.",
  "a28": "c. ¿El lápiz azul es el más corto?",
  "a29": "¡Correcto! El más corto es el rojo.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar el calendario y a comparar el largo de los lápices. Tocá Comenzar.",
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
   "titulo": "🔎 El calendario",
   "pasos": [
    {
     "audio": "a01",
     "texto": "El calendario muestra los <b>días</b> del mes, ordenados en <b>semanas</b>.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 456 402\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"2\" width=\"452\" height=\"398\" rx=\"12\" fill=\"#fff\" stroke=\"#264653\" stroke-width=\"3\"/><text x=\"228.0\" y=\"34\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"28\" fill=\"#264653\">Octubre 2026</text><text x=\"36.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Lunes</text><text x=\"100.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Martes</text><text x=\"164.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Miérc.</text><text x=\"228.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Jueves</text><text x=\"292.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Viernes</text><text x=\"356.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Sábado</text><text x=\"420.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#e63946\">Domingo</text><g class=\"cas\" data-n=\"1\"><rect x=\"198\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"262\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"326\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"390\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"6\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"70\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"134\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"198\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"262\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"326\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"390\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"6\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"70\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"134\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"198\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"262\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"326\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"390\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"6\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"70\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"134\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"198\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"262\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"326\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"390\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"6\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"70\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"134\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"198\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"262\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g><g class=\"cas\" data-n=\"31\"><rect x=\"326\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">31</text></g></svg></span>"
     }
    },
    {
     "audio": "a02",
     "texto": "Una <b>semana</b> tiene <b>7 días</b>: de lunes a domingo."
    },
    {
     "audio": "a03",
     "texto": "Para saber qué día es una fecha, miramos la <b>columna</b>: arriba está el nombre del día."
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "📅 ¡A buscar en el calendario!",
   "instr": "a05",
   "err": "a04",
   "rondas": [
    {
     "id": "a06",
     "texto": "¿Qué día de la semana es el <b>5</b> de octubre?",
     "opciones": [
      "lunes",
      "domingo",
      "martes"
     ],
     "ok": "a07",
     "audio": "a06",
     "respuesta": "lunes",
     "tab": {
      "ini": 5,
      "fin": 5
     }
    },
    {
     "id": "a08",
     "texto": "¿Cuántos días hay del <b>5</b> al <b>12</b> de octubre?",
     "opciones": [
      "7",
      "5",
      "12"
     ],
     "ok": "a09",
     "audio": "a08",
     "respuesta": "7",
     "tab": {
      "ini": 5,
      "fin": 12,
      "luz": [
       5,
       12
      ]
     }
    }
   ],
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 456 402\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"2\" width=\"452\" height=\"398\" rx=\"12\" fill=\"#fff\" stroke=\"#264653\" stroke-width=\"3\"/><text x=\"228.0\" y=\"34\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"28\" fill=\"#264653\">Octubre 2026</text><text x=\"36.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Lunes</text><text x=\"100.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Martes</text><text x=\"164.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Miérc.</text><text x=\"228.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Jueves</text><text x=\"292.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Viernes</text><text x=\"356.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Sábado</text><text x=\"420.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#e63946\">Domingo</text><g class=\"cas\" data-n=\"1\"><rect x=\"198\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"262\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"326\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"390\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"6\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"70\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"134\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"198\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"262\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"326\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"390\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"6\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"70\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"134\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"198\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"262\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"326\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"390\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"6\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"70\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"134\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"198\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"262\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"326\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"390\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"6\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"70\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"134\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"198\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"262\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g><g class=\"cas\" data-n=\"31\"><rect x=\"326\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">31</text></g></svg></span>"
   }
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 ¿Cuál es más largo?",
   "pasos": [
    {
     "audio": "a10",
     "texto": "Para comparar lápices, los ponemos <b>uno al lado del otro</b>, empezando en el mismo lugar.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 380 114\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"22\" height=\"34\" rx=\"4\" fill=\"#f4a3b5\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"32\" y=\"10\" width=\"280\" height=\"34\" fill=\"#7b2cbf\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"312,10 350,27.0 312,44\" fill=\"#f6d7a7\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"338,21.0 350,27.0 338,33.0\" fill=\"#333\"/><rect x=\"10\" y=\"62\" width=\"22\" height=\"34\" rx=\"4\" fill=\"#f4a3b5\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"32\" y=\"62\" width=\"160\" height=\"34\" fill=\"#f77f00\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"192,62 230,79.0 192,96\" fill=\"#f6d7a7\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"218,73.0 230,79.0 218,85.0\" fill=\"#333\"/></svg></span>"
     }
    },
    {
     "audio": "a11",
     "texto": "El que llega más lejos es el <b>más largo</b>. El otro es el <b>más corto</b>."
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
   "tipo": "opcion",
   "titulo": "🏆 Tarea 1",
   "err": "t_err",
   "rondas": [
    {
     "id": "a12",
     "texto": "El Día del Maestro se festeja el <b>11</b> de septiembre y el del Estudiante el <b>21</b>. ¿Cuántos días hay entre estos festejos?",
     "opciones": [
      "6",
      "10",
      "11",
      "30"
     ],
     "ok": "a13",
     "audio": "a12",
     "respuesta": "10",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 456 402\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"2\" width=\"452\" height=\"398\" rx=\"12\" fill=\"#fff\" stroke=\"#264653\" stroke-width=\"3\"/><text x=\"228.0\" y=\"34\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"28\" fill=\"#264653\">Septiembre 2026</text><text x=\"36.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Lunes</text><text x=\"100.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Martes</text><text x=\"164.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Miérc.</text><text x=\"228.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Jueves</text><text x=\"292.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Viernes</text><text x=\"356.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Sábado</text><text x=\"420.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#e63946\">Domingo</text><g class=\"cas\" data-n=\"1\"><rect x=\"70\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"134\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"198\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"262\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"326\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"390\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"6\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"70\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"134\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"198\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"262\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe08a\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"326\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"390\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"6\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"70\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"134\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"198\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"262\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"326\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"390\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"6\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe08a\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"70\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"134\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"198\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"262\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"326\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"390\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"6\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"70\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"134\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g></svg></span>"
     },
     "tab": {
      "ini": 11,
      "fin": 21,
      "luz": [
       11,
       21
      ]
     }
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 2",
   "instr": "a14",
   "err": "t_err",
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 456 402\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"2\" width=\"452\" height=\"398\" rx=\"12\" fill=\"#fff\" stroke=\"#264653\" stroke-width=\"3\"/><text x=\"228.0\" y=\"34\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"28\" fill=\"#264653\">Octubre 2026</text><text x=\"36.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Lunes</text><text x=\"100.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Martes</text><text x=\"164.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Miérc.</text><text x=\"228.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Jueves</text><text x=\"292.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Viernes</text><text x=\"356.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#555\">Sábado</text><text x=\"420.0\" y=\"64\" text-anchor=\"middle\" font-family=\"Arial\" font-weight=\"700\" font-size=\"13\" fill=\"#e63946\">Domingo</text><g class=\"cas\" data-n=\"1\"><rect x=\"198\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">1</text></g><g class=\"cas\" data-n=\"2\"><rect x=\"262\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">2</text></g><g class=\"cas\" data-n=\"3\"><rect x=\"326\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">3</text></g><g class=\"cas\" data-n=\"4\"><rect x=\"390\" y=\"78\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"119.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">4</text></g><g class=\"cas\" data-n=\"5\"><rect x=\"6\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">5</text></g><g class=\"cas\" data-n=\"6\"><rect x=\"70\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">6</text></g><g class=\"cas\" data-n=\"7\"><rect x=\"134\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">7</text></g><g class=\"cas\" data-n=\"8\"><rect x=\"198\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">8</text></g><g class=\"cas\" data-n=\"9\"><rect x=\"262\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">9</text></g><g class=\"cas\" data-n=\"10\"><rect x=\"326\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">10</text></g><g class=\"cas\" data-n=\"11\"><rect x=\"390\" y=\"142\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"183.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">11</text></g><g class=\"cas\" data-n=\"12\"><rect x=\"6\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">12</text></g><g class=\"cas\" data-n=\"13\"><rect x=\"70\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">13</text></g><g class=\"cas\" data-n=\"14\"><rect x=\"134\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">14</text></g><g class=\"cas\" data-n=\"15\"><rect x=\"198\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">15</text></g><g class=\"cas\" data-n=\"16\"><rect x=\"262\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">16</text></g><g class=\"cas\" data-n=\"17\"><rect x=\"326\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">17</text></g><g class=\"cas\" data-n=\"18\"><rect x=\"390\" y=\"206\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"247.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">18</text></g><g class=\"cas\" data-n=\"19\"><rect x=\"6\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">19</text></g><g class=\"cas\" data-n=\"20\"><rect x=\"70\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">20</text></g><g class=\"cas\" data-n=\"21\"><rect x=\"134\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">21</text></g><g class=\"cas\" data-n=\"22\"><rect x=\"198\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">22</text></g><g class=\"cas\" data-n=\"23\"><rect x=\"262\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">23</text></g><g class=\"cas\" data-n=\"24\"><rect x=\"326\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">24</text></g><g class=\"cas\" data-n=\"25\"><rect x=\"390\" y=\"270\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#ffe5e7\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"420.0\" y=\"311.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">25</text></g><g class=\"cas\" data-n=\"26\"><rect x=\"6\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"36.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">26</text></g><g class=\"cas\" data-n=\"27\"><rect x=\"70\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"100.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">27</text></g><g class=\"cas\" data-n=\"28\"><rect x=\"134\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"164.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">28</text></g><g class=\"cas\" data-n=\"29\"><rect x=\"198\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"228.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">29</text></g><g class=\"cas\" data-n=\"30\"><rect x=\"262\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"292.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">30</text></g><g class=\"cas\" data-n=\"31\"><rect x=\"326\" y=\"334\" width=\"60\" height=\"60\" rx=\"8\" fill=\"#f7fbff\" stroke=\"#9ab\" stroke-width=\"1.5\"/><text x=\"356.0\" y=\"375.0\" text-anchor=\"middle\" font-family=\"Baloo 2,Arial\" font-weight=\"800\" font-size=\"30\" fill=\"#222\">31</text></g></svg></span>"
   },
   "items": [
    {
     "id": "a15",
     "audio": "a15",
     "texto": "El mes de octubre tiene 31 días.",
     "v": true,
     "ok": "a16"
    },
    {
     "id": "a17",
     "audio": "a17",
     "texto": "El 17 de octubre es día lunes.",
     "v": false,
     "ok": "a18",
     "tab": {
      "ini": 17,
      "fin": 17
     }
    },
    {
     "id": "a19",
     "audio": "a19",
     "texto": "En dos semanas hay 16 días.",
     "v": false,
     "ok": "a20"
    },
    {
     "id": "a21",
     "audio": "a21",
     "texto": "El primer día de octubre es martes.",
     "v": false,
     "ok": "a22",
     "tab": {
      "ini": 1,
      "fin": 1
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 3",
   "instr": "a23",
   "err": "t_err",
   "rondas": [
    {
     "id": "a24",
     "texto": "a) ¿El lápiz <b>rojo</b> es más corto que el <b>amarillo</b>?",
     "opciones": [
      "sí",
      "no"
     ],
     "ok": "a25",
     "audio": "a24",
     "respuesta": "sí"
    },
    {
     "id": "a26",
     "texto": "b) ¿El lápiz <b>verde</b> tiene el mismo largo que el lápiz <b>amarillo</b>?",
     "opciones": [
      "sí",
      "no"
     ],
     "ok": "a27",
     "audio": "a26",
     "respuesta": "no"
    },
    {
     "id": "a28",
     "texto": "c) ¿El lápiz <b>azul</b> es el más corto?",
     "opciones": [
      "sí",
      "no"
     ],
     "ok": "a29",
     "audio": "a28",
     "respuesta": "no"
    }
   ],
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg class=\"tab\" viewBox=\"0 0 420 218\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"10\" y=\"10\" width=\"22\" height=\"34\" rx=\"4\" fill=\"#f4a3b5\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"32\" y=\"10\" width=\"320\" height=\"34\" fill=\"#ffc300\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"352,10 390,27.0 352,44\" fill=\"#f6d7a7\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"378,21.0 390,27.0 378,33.0\" fill=\"#333\"/><rect x=\"10\" y=\"62\" width=\"22\" height=\"34\" rx=\"4\" fill=\"#f4a3b5\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"32\" y=\"62\" width=\"200\" height=\"34\" fill=\"#1e88e5\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"232,62 270,79.0 232,96\" fill=\"#f6d7a7\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"258,73.0 270,79.0 258,85.0\" fill=\"#333\"/><rect x=\"10\" y=\"114\" width=\"22\" height=\"34\" rx=\"4\" fill=\"#f4a3b5\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"32\" y=\"114\" width=\"240\" height=\"34\" fill=\"#43a047\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"272,114 310,131.0 272,148\" fill=\"#f6d7a7\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"298,125.0 310,131.0 298,137.0\" fill=\"#333\"/><rect x=\"10\" y=\"166\" width=\"22\" height=\"34\" rx=\"4\" fill=\"#f4a3b5\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"32\" y=\"166\" width=\"120\" height=\"34\" fill=\"#e53935\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"152,166 190,183.0 152,200\" fill=\"#f6d7a7\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"178,177.0 190,183.0 178,189.0\" fill=\"#333\"/></svg></span>"
   }
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
