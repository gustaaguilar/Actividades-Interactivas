/* SUSI Y SU OSO SOSO — Lengua · Alfabetización · 1.er grado
   Basado en la Ficha N.º 3 de Alfabetización · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Susi y su oso Soso",
  "subtitulo": "Ficha 3 de Alfabetización · Leo y comprendo",
  "area": "📖 Lengua · 1.er grado",
  "fuente": "Basado en la Ficha N.º 3 de Alfabetización (recorrido lector: Caminito con historias) · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial",
  "autor": "💻 Informática Educativa · Profe Gustavo Aguilar",
  "mail": "profegustaaguilar@gmail.com",
  "foto": "profe.jpg",
  "fotoMini": "profe_mini.jpg",
  "frase": "Menos prisa, más vida 🧉🫂",
  "puntosPorAcierto": 10,
  "revision": false,
  "multiDirecto": true
 },
 "lectura": {
  "titulo": "SUSI Y SU OSO SOSO",
  "aviso": "Tocá para leer el cuento",
  "img": "img/lectura.jpg",
  "parrafos": [
   [
    {
     "t": "El oso Soso ama a la osa Susi.",
     "audio": "l1_1"
    }
   ],
   [
    {
     "t": "Soso se asoma al sol y Susi amasa la masa en la mesa.",
     "audio": "l2_1"
    }
   ],
   [
    {
     "t": "Soso toma la sopa de Susi.",
     "audio": "l3_1"
    }
   ],
   [
    {
     "t": "Susi y Soso caminan bajo el sol.",
     "audio": "l4_1"
    }
   ]
  ]
 },
 "audios": {
  "err": "Esa no es. Volvé a leer el texto y buscá la respuesta.",
  "l1_1": "El oso Soso ama a la osa Susi.",
  "l2_1": "Soso se asoma al sol y Susi amasa la masa en la mesa.",
  "l3_1": "Soso toma la sopa de Susi.",
  "l4_1": "Susi y Soso caminan bajo el sol.",
  "lec_instr": "Escuchá con atención y seguí la lectura con el dedo. La parte que voy leyendo se pinta de amarillo.",
  "e_1": "Ahora vas a responder preguntas sobre el cuento.",
  "e_2": "Si no te acordás de algo, tocá el botón violeta con el libro, arriba. Ahí está el texto para leerlo otra vez.",
  "e_3": "Las respuestas están en el texto. Leé con atención y pensá antes de tocar.",
  "b01": "¿A quién ama el oso Soso?",
  "b02": "¡Sí! El oso Soso ama a la osa Susi.",
  "b03": "¿Quién lo hace? Tocá Susi o Soso.",
  "b04": "¿Quién se asoma al sol?",
  "b05": "¡Sí! Soso se asoma al sol.",
  "b06": "¿Quién amasa la masa?",
  "b07": "¡Muy bien! Susi amasa la masa en la mesa.",
  "b08": "¿Quién toma la sopa?",
  "b09": "¡Correcto! Soso toma la sopa de Susi.",
  "b10": "Volvé al cuento y completá con la palabra perdida. Tocá la palabra que va en el espacio que titila.",
  "b11": "¡Excelente! Encontraste todas las palabras perdidas.",
  "b12": "Esa no es. Volvé a leer el cuento desde el principio.",
  "b13": "¿Qué pasó primero? Tocá la respuesta.",
  "b14": "¡Muy bien! Primero Susi amasa la masa. Después Soso toma la sopa y al final caminan bajo el sol.",
  "b15": "Ahora ordená lo que pasó en el cuento. Tocá primero lo que pasó primero.",
  "b16": "Ese no va ahora. Volvé a leer el cuento y fijate qué pasa después.",
  "b17": "¡Excelente! Ordenaste el cuento: primero la masa, después la sopa y al final el paseo bajo el sol.",
  "b18": "¿Qué escena del cuento te gustó más?",
  "b19": "Pintala en tu ficha o dibujala en tu cuaderno, con muchos colores.",
  "portada": "¡Hola! Soy Lola, la lechuza. Hoy vamos a leer un cuento: Susi y su oso Soso. Después vas a responder preguntas sobre el cuento. Tocá Comenzar.",
  "cierre": "¡Terminaste! Leíste el cuento Susi y su oso Soso y respondiste las preguntas. Mirá cuántas respuestas acertaste."
 },
 "pantallas": [
  {
   "tipo": "portada",
   "img": "img/portada.jpg",
   "audio": "portada"
  },
  {
   "tipo": "lectura",
   "titulo": "📖 Leemos el cuento",
   "narrado": true,
   "instr": "lec_instr"
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 ¿Cómo respondemos?",
   "img": "img/lola_lee.jpg",
   "pasos": [
    {
     "audio": "e_1",
     "texto": "Ahora, <b>preguntas</b> sobre el cuento."
    },
    {
     "audio": "e_2",
     "texto": "Si no te acordás, tocá el <b>📖</b> violeta de arriba y leé otra vez."
    },
    {
     "audio": "e_3",
     "texto": "Las respuestas <b>están en el texto</b>. ¡A buscarlas!"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🐻 ¿Quién es quién?",
   "err": "err",
   "visual": {
    "tipo": "emoji",
    "e": "🐻❤️🐻"
   },
   "rondas": [
    {
     "id": "b01",
     "audio": "b01",
     "texto": "¿A quién ama el oso Soso?",
     "opciones": [
      "a la osa Susi",
      "a la sopa",
      "al sol"
     ],
     "ok": "b02",
     "respuesta": "a la osa Susi"
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🔗 1. ¿Quién lo hace?",
   "err": "err",
   "visual": {
    "tipo": "figura",
    "src": "img/osos.png"
   },
   "rondas": [
    {
     "id": "b04",
     "audio": "b04",
     "texto": "☀️ ¿Quién <b>se asoma al sol</b>?",
     "opciones": [
      "Susi",
      "Soso"
     ],
     "ok": "b05",
     "respuesta": "Soso"
    },
    {
     "id": "b06",
     "audio": "b06",
     "texto": "🥣 ¿Quién <b>amasa la masa</b>?",
     "opciones": [
      "Susi",
      "Soso"
     ],
     "ok": "b07",
     "respuesta": "Susi"
    },
    {
     "id": "b08",
     "audio": "b08",
     "texto": "🍲 ¿Quién <b>toma la sopa</b>?",
     "opciones": [
      "Susi",
      "Soso"
     ],
     "ok": "b09",
     "respuesta": "Soso"
    }
   ],
   "instr": "b03"
  },
  {
   "tipo": "huecos",
   "titulo": "🔤 2. La palabra perdida",
   "instr": "b10",
   "err": "err",
   "ok": "b11",
   "texto": "Completá con la palabra perdida.",
   "frases": [
    {
     "id": "h11_0",
     "ico": "🥣",
     "html": "Susi amasa la ___ en la mesa.",
     "resp": [
      "masa"
     ]
    },
    {
     "id": "h11_1",
     "ico": "🍲",
     "html": "Soso toma la ___ de Susi.",
     "resp": [
      "sopa"
     ]
    },
    {
     "id": "h11_2",
     "ico": "☀️",
     "html": "Susi y Soso caminan bajo el ___.",
     "resp": [
      "sol"
     ]
    }
   ],
   "banco": [
    "sol",
    "sopa",
    "masa"
   ],
   "visual": {
    "tipo": "emoji",
    "e": "🐻🐻"
   }
  },
  {
   "tipo": "opcion",
   "titulo": "1️⃣ 3. ¿Qué pasó primero?",
   "err": "b12",
   "visual": {
    "tipo": "figura",
    "src": "img/osos.png"
   },
   "rondas": [
    {
     "id": "b13",
     "audio": "b13",
     "texto": "¿Qué pasó <b>primero</b>?",
     "opciones": [
      "Susi y Soso caminan bajo el sol.",
      "Susi amasa la masa en la mesa.",
      "Soso toma la sopa de Susi."
     ],
     "ok": "b14",
     "respuesta": "Susi amasa la masa en la mesa."
    }
   ]
  },
  {
   "tipo": "ordenar",
   "titulo": "🔢 Ordená el cuento",
   "instr": "b15",
   "err": "b16",
   "ok": "b17",
   "texto": "Tocá en orden lo que pasó en el cuento.",
   "items": [
    "Susi amasa la masa en la mesa.",
    "Soso toma la sopa de Susi.",
    "Susi y Soso caminan bajo el sol."
   ],
   "visual": {
    "tipo": "figura",
    "src": "img/osos.png"
   }
  },
  {
   "tipo": "pasos",
   "titulo": "🎨 4. Pintá la escena",
   "img": "img/osos.png",
   "pasos": [
    {
     "audio": "b18",
     "texto": "¿Qué escena del cuento <b>te gustó más</b>?"
    },
    {
     "audio": "b19",
     "texto": "Pintala en tu ficha o dibujala en tu cuaderno, ¡con muchos colores!"
    }
   ],
   "visual": {
    "tipo": "figura",
    "src": "img/osos.png"
   }
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
