/* DETECTIVES DE LOS CUADRILÁTEROS — Matemática · 🔢 Matemática · 6.º grado
   Basado en la Ficha N.º 2 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de los cuadriláteros",
  "subtitulo": "Ficha 2: Geometría",
  "area": "🔢 Matemática · 6.º grado",
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
  "f01": "El paralelogramo tiene dos pares de lados opuestos paralelos y congruentes, es decir, de igual medida. Sus diagonales se cortan en su punto medio.",
  "f02": "El rectángulo es un paralelogramo con cuatro ángulos rectos. Sus diagonales miden lo mismo: son congruentes.",
  "f03": "El trapecio tiene un solo par de lados paralelos.",
  "f04": "El rombo tiene cuatro lados congruentes. Sus diagonales son perpendiculares y se cortan en su punto medio.",
  "f05": "El romboide tiene dos pares de lados consecutivos congruentes. Sus diagonales son perpendiculares, pero solo una corta a la otra por la mitad.",
  "f06": "Esa no es. Revisá las propiedades: lados, ángulos y lados paralelos.",
  "f07": "Leé las propiedades y tocá la figura correcta.",
  "f08": "Tiene cuatro lados congruentes y cuatro ángulos rectos. ¿Qué figura es?",
  "f09": "¡Sí! Es el cuadrado.",
  "f10": "Tiene un solo par de lados paralelos. ¿Qué figura es?",
  "f11": "¡Muy bien! Es el trapecio.",
  "f12": "Tiene cuatro lados congruentes, pero sus ángulos no son rectos. ¿Qué figura es?",
  "f13": "¡Excelente! Es el rombo.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 3 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "f14": "Tarea uno. Leé las propiedades. Tiene dos pares de lados opuestos paralelos y congruentes. Las diagonales no son congruentes y se cortan en su punto medio. ¿De qué figura se trata?",
  "f15": "¡Correcto! Es el paralelogramo. El rectángulo tiene diagonales congruentes.",
  "f16": "Tarea dos. Observá las indicaciones y realizá la construcción en tu cuaderno. a: dibujar un segmento A B horizontal. b: desde A, dibujar el segmento A D que no sea perpendicular a A B. c: desde B, dibujar el segmento B C, de modo que A D y B C sean paralelos y no congruentes. d: unir C con D. ¿Qué figura se obtiene?",
  "f17": "¡Correcto! Se obtiene un trapecio: tiene un solo par de lados paralelos.",
  "f18": "Tarea tres. El rombo y el romboide, ¿comparten estas propiedades? Indicá Verdadero o Falso.",
  "f19": "a: diagonales que se cortan ambas en su punto medio.",
  "f20": "¡Correcto! Es falso: en el romboide, solo una diagonal queda cortada por la mitad.",
  "f21": "b: dos pares de lados congruentes.",
  "f22": "¡Correcto! Es verdadero: los dos tienen dos pares de lados congruentes.",
  "f23": "c: dos pares de lados paralelos.",
  "f24": "¡Correcto! Es falso: el romboide no tiene lados paralelos.",
  "f25": "d: diagonales perpendiculares.",
  "f26": "¡Correcto! Es verdadero: en los dos, las diagonales son perpendiculares.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar las propiedades de los cuadriláteros: sus lados, sus ángulos y sus diagonales. Tocá Comenzar.",
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
   "titulo": "🔎 Propiedades de los cuadriláteros",
   "pasos": [
    {
     "audio": "f01",
     "texto": "El <b>paralelogramo</b> tiene <b>dos pares</b> de lados opuestos <b>paralelos y congruentes</b>. Sus diagonales se cortan en su punto medio.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"40,20 190,20 160,110 10,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/><line x1=\"40\" y1=\"20\" x2=\"160\" y2=\"110\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/><line x1=\"190\" y1=\"20\" x2=\"10\" y2=\"110\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/></svg><span>paralelogramo</span></span>"
     }
    },
    {
     "audio": "f02",
     "texto": "El <b>rectángulo</b> es un paralelogramo con <b>4 ángulos rectos</b>. Sus diagonales son <b>congruentes</b>.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"15,20 185,20 185,110 15,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/><line x1=\"15\" y1=\"20\" x2=\"185\" y2=\"110\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/><line x1=\"185\" y1=\"20\" x2=\"15\" y2=\"110\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/></svg><span>rectángulo</span></span>"
     }
    },
    {
     "audio": "f03",
     "texto": "El <b>trapecio</b> tiene <b>un solo par</b> de lados paralelos.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"55,20 145,20 190,110 10,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>trapecio</span></span>"
     }
    },
    {
     "audio": "f04",
     "texto": "El <b>rombo</b> tiene <b>4 lados congruentes</b>. Sus diagonales son <b>perpendiculares</b> y se cortan en su punto medio.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"100,5 170,60 100,115 30,60\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/><line x1=\"100\" y1=\"5\" x2=\"100\" y2=\"115\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/><line x1=\"170\" y1=\"60\" x2=\"30\" y2=\"60\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/></svg><span>rombo</span></span>"
     }
    },
    {
     "audio": "f05",
     "texto": "El <b>romboide</b> tiene <b>dos pares de lados consecutivos congruentes</b>. Sus diagonales son <b>perpendiculares</b>, pero solo una corta a la otra en su punto medio.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"100,5 150,40 100,115 50,40\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/><line x1=\"100\" y1=\"5\" x2=\"100\" y2=\"115\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/><line x1=\"150\" y1=\"40\" x2=\"50\" y2=\"40\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/></svg><span>romboide</span></span>"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧩 ¿Qué figura es?",
   "instr": "f07",
   "err": "f06",
   "rondas": [
    {
     "id": "f08",
     "texto": "Tiene <b>4 lados congruentes</b> y <b>4 ángulos rectos</b>.",
     "opciones": [
      "cuadrado",
      "rectángulo",
      "trapecio",
      "rombo"
     ],
     "ok": "f09",
     "audio": "f08",
     "respuesta": "cuadrado",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"55,15 145,15 145,105 55,105\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>cuadrado</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"15,20 185,20 185,110 15,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>rectángulo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"55,20 145,20 190,110 10,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>trapecio</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"100,5 170,60 100,115 30,60\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>rombo</span></span>"
     }
    },
    {
     "id": "f10",
     "texto": "Tiene <b>un solo par</b> de lados paralelos.",
     "opciones": [
      "cuadrado",
      "rectángulo",
      "trapecio",
      "rombo"
     ],
     "ok": "f11",
     "audio": "f10",
     "respuesta": "trapecio",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"55,15 145,15 145,105 55,105\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>cuadrado</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"15,20 185,20 185,110 15,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>rectángulo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"55,20 145,20 190,110 10,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>trapecio</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"100,5 170,60 100,115 30,60\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>rombo</span></span>"
     }
    },
    {
     "id": "f12",
     "texto": "Tiene 4 lados congruentes, pero sus ángulos <b>no son rectos</b>.",
     "opciones": [
      "cuadrado",
      "rectángulo",
      "trapecio",
      "rombo"
     ],
     "ok": "f13",
     "audio": "f12",
     "respuesta": "rombo",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"55,15 145,15 145,105 55,105\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>cuadrado</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"15,20 185,20 185,110 15,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>rectángulo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"55,20 145,20 190,110 10,110\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>trapecio</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"100,5 170,60 100,115 30,60\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/></svg><span>rombo</span></span>"
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
   "tipo": "opcion",
   "titulo": "🏆 Tarea 1",
   "err": "t_err",
   "rondas": [
    {
     "id": "f14",
     "texto": "<i>“Tiene dos pares de lados opuestos paralelos y congruentes. Las diagonales no son congruentes y se cortan en su punto medio.”</i> ¿De qué figura se trata?",
     "opciones": [
      "Paralelogramo",
      "Pentágono",
      "Rectángulo",
      "Trapecio"
     ],
     "ok": "f15",
     "audio": "f14",
     "respuesta": "Paralelogramo",
     "visual": {
      "tipo": "emoji",
      "e": "🔍"
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
     "id": "f16",
     "texto": "a. Dibujar un segmento AB horizontal.<br>b. Desde A, dibujar el segmento AD que no sea perpendicular a AB.<br>c. Desde B, dibujar el segmento BC, de modo que AD y BC sean paralelos y no congruentes.<br>d. Unir C con D.<br>¿Qué figura se obtiene?",
     "opciones": [
      "Paralelogramo",
      "Pentágono",
      "Trapecio",
      "Triángulo"
     ],
     "ok": "f17",
     "audio": "f16",
     "respuesta": "Trapecio",
     "visual": {
      "tipo": "emoji",
      "e": "✏️📐"
     }
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 3",
   "instr": "f18",
   "err": "t_err",
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"100,5 170,60 100,115 30,60\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/><line x1=\"100\" y1=\"5\" x2=\"100\" y2=\"115\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/><line x1=\"170\" y1=\"60\" x2=\"30\" y2=\"60\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/></svg><span>rombo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 120\"><polygon points=\"100,5 150,40 100,115 50,40\" fill=\"#bde0fe\" stroke=\"#1d3557\" stroke-width=\"4\" stroke-linejoin=\"round\"/><line x1=\"100\" y1=\"5\" x2=\"100\" y2=\"115\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/><line x1=\"150\" y1=\"40\" x2=\"50\" y2=\"40\" stroke=\"#e63946\" stroke-width=\"3\" stroke-dasharray=\"7 5\"/></svg><span>romboide</span></span>"
   },
   "items": [
    {
     "id": "f19",
     "audio": "f19",
     "texto": "a) Diagonales que se cortan ambas en su punto medio.",
     "v": false,
     "ok": "f20"
    },
    {
     "id": "f21",
     "audio": "f21",
     "texto": "b) Dos pares de lados congruentes.",
     "v": true,
     "ok": "f22"
    },
    {
     "id": "f23",
     "audio": "f23",
     "texto": "c) Dos pares de lados paralelos.",
     "v": false,
     "ok": "f24"
    },
    {
     "id": "f25",
     "audio": "f25",
     "texto": "d) Diagonales perpendiculares.",
     "v": true,
     "ok": "f26"
    }
   ],
   "enunciado": "El rombo y el romboide, ¿comparten estas propiedades?"
  },
  {
   "tipo": "cierre",
   "img": "img/cierre.jpg",
   "audio": "cierre"
  }
 ]
};
