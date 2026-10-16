/* DETECTIVES DE LOS CUERPOS — Matemática · 🔢 Matemática · 3.er grado
   Basado en la Ficha N.º 2 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de los cuerpos",
  "subtitulo": "Ficha 2: Geometría",
  "area": "🔢 Matemática · 3.er grado",
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
  "c01": "Si apoyamos un cuerpo sobre arena o plastilina, deja una huella: es la forma de la cara que apoyamos.",
  "c02": "El cubo tiene seis caras y todas son cuadradas. Por eso su huella es un cuadrado.",
  "c03": "El prisma rectangular tiene caras rectangulares y, en las puntas, caras cuadradas. Puede dejar una huella rectangular o una cuadrada.",
  "c04": "La pirámide de base cuadrada tiene una base cuadrada y cuatro caras triangulares. Puede dejar una huella cuadrada o una triangular.",
  "c05": "Las aristas son los bordes donde se juntan dos caras, y los vértices son las puntas. El cubo tiene doce aristas y ocho vértices.",
  "c06": "Esa no es. Mirá bien las caras de cada cuerpo.",
  "c07": "Leé las pistas y tocá el cuerpo correcto.",
  "c08": "Tengo una base cuadrada y cuatro caras triangulares que se juntan en una punta. ¿Qué cuerpo soy?",
  "c09": "¡Sí! Es la pirámide de base cuadrada.",
  "c10": "Tengo seis caras: cuatro son rectángulos y dos son cuadrados. ¿Qué cuerpo soy?",
  "c11": "¡Muy bien! Es el prisma rectangular.",
  "c12": "Si me apoyás de costado, mi huella es un triángulo. ¿Qué cuerpo soy?",
  "c13": "¡Excelente! Solo la pirámide tiene caras triangulares.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 5 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "c14": "Tarea uno. ¿Qué huella deja cada cuerpo? Tocá un cuerpo y después tocá su huella.",
  "c15": "¡Muy bien! Uniste cada cuerpo con su huella.",
  "c16": "¡Sí! El cubo deja una huella cuadrada.",
  "c17": "¡Correcto! El prisma rectangular deja una huella rectangular.",
  "c18": "¡Bien! La pirámide, apoyada de costado, deja una huella triangular.",
  "c19": "Tarea dos. Completá las oraciones. Tocá la palabra que va en el espacio que titila.",
  "c20": "¡Excelente! Completaste todas las huellas.",
  "c21": "Tarea tres. Leé cada frase y tocá Verdadero o Falso.",
  "c22": "Las caras de un cubo son todas iguales.",
  "c23": "¡Correcto! Las seis caras del cubo son cuadrados iguales.",
  "c24": "La pirámide de base cuadrada tiene una cara cuadrada y cuatro caras triangulares.",
  "c25": "¡Correcto! Es verdadero.",
  "c26": "El cubo tiene caras triangulares.",
  "c27": "¡Correcto! Es falso: todas las caras del cubo son cuadradas.",
  "c28": "Tarea cuatro. Completá las oraciones con el número que corresponde.",
  "c29": "¡Muy bien! El cubo y el prisma tienen seis caras y ocho vértices cada uno.",
  "c30": "Tarea cinco. ¿Qué cuerpo estoy describiendo? Tiene seis caras. Todas sus caras tienen forma de cuadrado. Tiene ocho vértices. Tiene doce aristas.",
  "c31": "¡Correcto! Es el cubo.",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar los cuerpos geométricos: el cubo, el prisma y la pirámide, y las huellas que dejan. Tocá Comenzar.",
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
   "titulo": "🔎 Las huellas de los cuerpos",
   "pasos": [
    {
     "audio": "c01",
     "texto": "Si apoyamos un cuerpo sobre arena o plastilina, deja una <b>huella</b>: la forma de la <b>cara</b> que apoyamos.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 100 100\"><rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg><span>huella</span></span>"
     }
    },
    {
     "audio": "c02",
     "texto": "El <b>cubo</b> tiene 6 caras, todas cuadradas: su huella es un <b>cuadrado</b>.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 100 100\"><rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg><span>cuadrado</span></span>"
     }
    },
    {
     "audio": "c03",
     "texto": "El <b>prisma rectangular</b> tiene caras <b>rectangulares</b> y, en las puntas, caras <b>cuadradas</b>.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 230 130\"><polygon points=\"10,120 180,120 180,50 10,50\" fill=\"#f6a63b\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 180,50 220,15 50,15\" fill=\"#fbc77c\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"180,120 220,85 220,15 180,50\" fill=\"#e07f12\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>prisma</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 150 90\"><rect x=\"5\" y=\"15\" width=\"140\" height=\"70\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg><span>rectángulo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 100 100\"><rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg><span>cuadrado</span></span>"
     }
    },
    {
     "audio": "c04",
     "texto": "La <b>pirámide de base cuadrada</b> tiene una base <b>cuadrada</b> y 4 caras <b>triangulares</b>.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 200 160\"><line x1=\"60\" y1=\"115\" x2=\"190\" y2=\"115\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"60\" y1=\"115\" x2=\"100\" y2=\"10\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,150 140,150 100,10\" fill=\"#5aa9e6\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"140,150 190,115 100,10\" fill=\"#2f7fc4\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>pirámide</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 100 100\"><rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg><span>cuadrado</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 110 100\"><polygon points=\"55,6 104,94 6,94\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg><span>triángulo</span></span>"
     }
    },
    {
     "audio": "c05",
     "texto": "Las <b>aristas</b> son los bordes y los <b>vértices</b> son las puntas. El cubo tiene 12 aristas y 8 vértices.",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span>"
     }
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧩 ¿Qué cuerpo soy?",
   "instr": "c07",
   "err": "c06",
   "rondas": [
    {
     "id": "c08",
     "texto": "Tengo una base cuadrada y 4 caras triangulares que se juntan en una punta.",
     "opciones": [
      "cubo",
      "prisma",
      "pirámide"
     ],
     "ok": "c09",
     "audio": "c08",
     "respuesta": "pirámide",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 230 130\"><polygon points=\"10,120 180,120 180,50 10,50\" fill=\"#f6a63b\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 180,50 220,15 50,15\" fill=\"#fbc77c\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"180,120 220,85 220,15 180,50\" fill=\"#e07f12\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>prisma</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 160\"><line x1=\"60\" y1=\"115\" x2=\"190\" y2=\"115\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"60\" y1=\"115\" x2=\"100\" y2=\"10\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,150 140,150 100,10\" fill=\"#5aa9e6\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"140,150 190,115 100,10\" fill=\"#2f7fc4\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>pirámide</span></span>"
     }
    },
    {
     "id": "c10",
     "texto": "Tengo 6 caras: 4 son rectángulos y 2 son cuadrados.",
     "opciones": [
      "cubo",
      "prisma",
      "pirámide"
     ],
     "ok": "c11",
     "audio": "c10",
     "respuesta": "prisma",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 230 130\"><polygon points=\"10,120 180,120 180,50 10,50\" fill=\"#f6a63b\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 180,50 220,15 50,15\" fill=\"#fbc77c\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"180,120 220,85 220,15 180,50\" fill=\"#e07f12\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>prisma</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 160\"><line x1=\"60\" y1=\"115\" x2=\"190\" y2=\"115\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"60\" y1=\"115\" x2=\"100\" y2=\"10\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,150 140,150 100,10\" fill=\"#5aa9e6\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"140,150 190,115 100,10\" fill=\"#2f7fc4\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>pirámide</span></span>"
     }
    },
    {
     "id": "c12",
     "texto": "Si me apoyás de costado, mi huella es un triángulo.",
     "opciones": [
      "cubo",
      "prisma",
      "pirámide"
     ],
     "ok": "c13",
     "audio": "c12",
     "respuesta": "pirámide",
     "visual": {
      "tipo": "svg",
      "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 230 130\"><polygon points=\"10,120 180,120 180,50 10,50\" fill=\"#f6a63b\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 180,50 220,15 50,15\" fill=\"#fbc77c\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"180,120 220,85 220,15 180,50\" fill=\"#e07f12\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>prisma</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 160\"><line x1=\"60\" y1=\"115\" x2=\"190\" y2=\"115\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"60\" y1=\"115\" x2=\"100\" y2=\"10\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,150 140,150 100,10\" fill=\"#5aa9e6\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"140,150 190,115 100,10\" fill=\"#2f7fc4\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>pirámide</span></span>"
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
     "texto": "Ahora, las <b>5 tareas</b> de la ficha de la escuela."
    },
    {
     "audio": "de_3",
     "texto": "Pensá bien: <b>cada respuesta cuenta una sola vez</b>."
    }
   ]
  },
  {
   "tipo": "asociar",
   "titulo": "🏆 Tarea 1",
   "instr": "c14",
   "err": "t_err",
   "ok": "c15",
   "cab": [
    "Cuerpo",
    "Huella"
   ],
   "pares": [
    {
     "a": "<svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg>Cubo",
     "b": "<svg viewBox=\"0 0 100 100\"><rect x=\"8\" y=\"8\" width=\"84\" height=\"84\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg>Cuadrado",
     "ok": "c16"
    },
    {
     "a": "<svg viewBox=\"0 0 230 130\"><polygon points=\"10,120 180,120 180,50 10,50\" fill=\"#f6a63b\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 180,50 220,15 50,15\" fill=\"#fbc77c\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"180,120 220,85 220,15 180,50\" fill=\"#e07f12\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg>Prisma",
     "b": "<svg viewBox=\"0 0 150 90\"><rect x=\"5\" y=\"15\" width=\"140\" height=\"70\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg>Rectángulo",
     "ok": "c17"
    },
    {
     "a": "<svg viewBox=\"0 0 200 160\"><line x1=\"60\" y1=\"115\" x2=\"190\" y2=\"115\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"60\" y1=\"115\" x2=\"100\" y2=\"10\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,150 140,150 100,10\" fill=\"#5aa9e6\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"140,150 190,115 100,10\" fill=\"#2f7fc4\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg>Pirámide",
     "b": "<svg viewBox=\"0 0 110 100\"><polygon points=\"55,6 104,94 6,94\" fill=\"#f07c2a\" stroke=\"#7a3500\" stroke-width=\"3\"/></svg>Triángulo",
     "ok": "c18"
    }
   ]
  },
  {
   "tipo": "huecos",
   "titulo": "🏆 Tarea 2",
   "instr": "c19",
   "err": "t_err",
   "ok": "c20",
   "texto": "Completá.",
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 230 130\"><polygon points=\"10,120 180,120 180,50 10,50\" fill=\"#f6a63b\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 180,50 220,15 50,15\" fill=\"#fbc77c\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"180,120 220,85 220,15 180,50\" fill=\"#e07f12\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>prisma</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 160\"><line x1=\"60\" y1=\"115\" x2=\"190\" y2=\"115\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"60\" y1=\"115\" x2=\"100\" y2=\"10\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,150 140,150 100,10\" fill=\"#5aa9e6\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"140,150 190,115 100,10\" fill=\"#2f7fc4\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>pirámide</span></span>"
   },
   "frases": [
    {
     "id": "h1",
     "ico": "🟪",
     "html": "El cubo puede dejar una huella con forma de ___.",
     "resp": [
      "cuadrado"
     ]
    },
    {
     "id": "h2",
     "ico": "🟧",
     "html": "El prisma rectangular puede dejar una huella con forma de ___ y otra de ___.",
     "resp": [
      "rectángulo",
      "cuadrado"
     ],
     "libre": true
    },
    {
     "id": "h3",
     "ico": "🔺",
     "html": "La pirámide de base cuadrada puede dejar una huella con forma de ___ y otra de ___.",
     "resp": [
      "cuadrado",
      "triángulo"
     ],
     "libre": true
    }
   ],
   "banco": [
    "cuadrado",
    "cuadrado",
    "cuadrado",
    "rectángulo",
    "triángulo",
    "círculo"
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 3",
   "instr": "c21",
   "err": "t_err",
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 200 160\"><line x1=\"60\" y1=\"115\" x2=\"190\" y2=\"115\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"60\" y1=\"115\" x2=\"100\" y2=\"10\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,150 140,150 100,10\" fill=\"#5aa9e6\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"140,150 190,115 100,10\" fill=\"#2f7fc4\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>pirámide</span></span>"
   },
   "items": [
    {
     "id": "c22",
     "audio": "c22",
     "texto": "Las caras de un cubo son todas iguales.",
     "v": true,
     "ok": "c23"
    },
    {
     "id": "c24",
     "audio": "c24",
     "texto": "La pirámide de base cuadrada tiene una cara cuadrada y cuatro caras triangulares.",
     "v": true,
     "ok": "c25"
    },
    {
     "id": "c26",
     "audio": "c26",
     "texto": "El cubo tiene caras triangulares.",
     "v": false,
     "ok": "c27"
    }
   ]
  },
  {
   "tipo": "huecos",
   "titulo": "🏆 Tarea 4",
   "instr": "c28",
   "err": "t_err",
   "ok": "c29",
   "texto": "Completá las oraciones.",
   "visual": {
    "tipo": "svg",
    "html": "<span class=\"svgfig\"><svg viewBox=\"0 0 150 150\"><line x1=\"40\" y1=\"110\" x2=\"40\" y2=\"20\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"130\" y2=\"110\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><line x1=\"40\" y1=\"110\" x2=\"10\" y2=\"140\" stroke=\"#1b1b1b\" stroke-width=\"2\" stroke-dasharray=\"6 5\" fill=\"none\"/><polygon points=\"10,140 100,140 100,50 10,50\" fill=\"#c76bd1\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 100,50 130,20 40,20\" fill=\"#e4a3ea\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"100,140 130,110 130,20 100,50\" fill=\"#a24bb0\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>cubo</span></span><span class=\"svgfig\"><svg viewBox=\"0 0 230 130\"><polygon points=\"10,120 180,120 180,50 10,50\" fill=\"#f6a63b\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"10,50 180,50 220,15 50,15\" fill=\"#fbc77c\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/><polygon points=\"180,120 220,85 220,15 180,50\" fill=\"#e07f12\" stroke=\"#1b1b1b\" stroke-width=\"3\" stroke-linejoin=\"round\"/></svg><span>prisma</span></span>"
   },
   "frases": [
    {
     "id": "k1",
     "ico": "🧊",
     "html": "El cubo tiene ___ caras y el prisma tiene ___ caras.",
     "resp": [
      "6",
      "6"
     ]
    },
    {
     "id": "k2",
     "ico": "📍",
     "html": "Cada cuerpo tiene ___ vértices.",
     "resp": [
      "8"
     ]
    }
   ],
   "banco": [
    "6",
    "6",
    "8",
    "4",
    "5",
    "12"
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 5",
   "err": "t_err",
   "rondas": [
    {
     "id": "c30",
     "texto": "¿Qué cuerpo estoy describiendo?",
     "opciones": [
      "cubo",
      "prisma rectangular",
      "pirámide de base cuadrada"
     ],
     "ok": "c31",
     "audio": "c30",
     "respuesta": "cubo",
     "visual": {
      "tipo": "texto",
      "html": "🔎 Tiene <b>6</b> caras.<br>Todas sus caras tienen forma de <b>cuadrado</b>.<br>Tiene <b>8</b> vértices.<br>Tiene <b>12</b> aristas."
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
