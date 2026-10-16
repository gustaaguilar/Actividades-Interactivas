/* ============================================================
   DETECTIVES DE DECIMALES Y FRACCIONES — Matemática · 7.º grado
   Basado en la Ficha N.º 1 "Número" de Habilidades Lógico-Matemáticas
   DGE Mendoza · Continuidad pedagógica
   QueSepanTodos.com · Profe Gustavo Aguilar
   ============================================================ */
const RECTA01 = { min: 0, max: 1, paso: 0.1, cada: 1, dec: 1 };
window.DATOS = {
 "meta": {
  "titulo": "Detectives de decimales y fracciones",
  "subtitulo": "Ficha 1: Número",
  "area": "🔢 Matemática · 7.º grado",
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
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar los números racionales: pasar de decimal a fracción, ubicar números en la recta y compararlos. Tocá Comenzar.",
  "n1_1": "Un número decimal se puede escribir como fracción decimal. Cero coma cinco son cinco décimos: cinco sobre diez.",
  "n1_2": "Con dos cifras después de la coma hablamos de centésimos. Cero coma veinticinco son veinticinco centésimos: veinticinco sobre cien.",
  "n1_3": "Y si el número es mayor que uno, también funciona. Uno coma cinco son quince décimos. Y quince décimos es lo mismo que tres medios.",
  "as_instr": "Uní cada número decimal con su fracción equivalente. Tocá un decimal y después su fracción.",
  "as_err": "No son equivalentes. Leé el decimal en voz alta: décimos o centésimos.",
  "as1_ok": "Cero coma cinco es cinco décimos.",
  "as2_ok": "Cero coma tres es tres décimos.",
  "as3_ok": "Cero coma setenta y cinco es setenta y cinco centésimos.",
  "as4_ok": "Uno coma cinco es quince décimos.",
  "as_fin": "¡Muy bien! Uniste todos los pares equivalentes.",
  "n2_1": "Esta recta numérica va de cero a uno. Está dividida en diez partes iguales: cada parte es un décimo, cero coma uno.",
  "n2_2": "Cero coma veinticinco está justo en el medio entre cero coma dos y cero coma tres.",
  "n2_3": "Un medio es lo mismo que cero coma cinco: justo en la mitad de la recta.",
  "re_instr": "Ubicá a cada corredor en la recta numérica. Tocá la recta en el lugar que corresponde.",
  "re_err": "No es ahí. Fijate entre qué décimos está el número.",
  "re1": "Sofía: cero coma tres.",
  "re1_ok": "¡Sí! Cero coma tres, en la tercera marca.",
  "re2": "Leo: cero coma ocho.",
  "re2_ok": "¡Muy bien! Cero coma ocho.",
  "re3": "Mía: cero coma sesenta y cinco.",
  "re3_ok": "¡Genial! Cero coma sesenta y cinco, en el medio entre cero coma seis y cero coma siete.",
  "re4": "Juan: un décimo.",
  "re4_ok": "¡Perfecto! Un décimo es cero coma uno.",
  "vf_instr": "Leé cada afirmación y tocá Verdadero o Falso.",
  "vf_err": "No es así. Pensalo con la recta o escribí los números con la misma cantidad de decimales.",
  "vf1": "Cero coma seis es mayor que cero coma cincuenta y cinco.",
  "vf1_ok": "¡Correcto! Cero coma sesenta es mayor que cero coma cincuenta y cinco.",
  "vf2": "Cero coma tres y cero coma treinta representan la misma cantidad.",
  "vf2_ok": "¡Sí! Tres décimos es igual a treinta centésimos.",
  "vf3": "Un cuarto puede escribirse como cero coma cuatro.",
  "vf3_ok": "¡Bien! Es falso: un cuarto es cero coma veinticinco.",
  "vf4": "Un medio es menor que cero coma veinticinco.",
  "vf4_ok": "¡Muy bien! Es falso: un medio es cero coma cinco, que es mayor.",
  "de_1": "¡Ya sos un detective de decimales y fracciones!",
  "de_2": "Ahora llega el desafío: son las tres tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "t_err": "Esa no es la respuesta. Pensalo otra vez.",
  "t1_instr": "Tarea uno. Uní las expresiones equivalentes: cada decimal con su fracción.",
  "t1_1": "Cero coma ocho es ocho décimos.",
  "t1_2": "Cero coma veinticinco es veinticinco centésimos.",
  "t1_3": "Cinco coma cinco es once medios.",
  "t1_4": "Uno coma dos es doce décimos.",
  "t1_5": "Dos coma cinco es cinco medios.",
  "t1_6": "Cero coma cero ocho es ocho centésimos.",
  "t1_fin": "¡Correcto! Todas las expresiones quedaron unidas.",
  "t2_instr": "Tarea dos. Colocá cada corredor en el lugar de la recta numérica que corresponda.",
  "t2_1": "Carla: cero coma setenta y cinco.",
  "t2_1ok": "¡Correcto! Carla está entre cero coma siete y cero coma ocho.",
  "t2_2": "Elena: cero coma nueve.",
  "t2_2ok": "¡Correcto! Elena está en cero coma nueve.",
  "t2_3": "Diego: cero coma cuatro.",
  "t2_3ok": "¡Correcto! Diego está en cero coma cuatro.",
  "t2_4": "Ana: cero coma veinticinco.",
  "t2_4ok": "¡Correcto! Ana está entre cero coma dos y cero coma tres.",
  "t2_5": "Bruno: un medio.",
  "t2_5ok": "¡Correcto! Un medio es cero coma cinco.",
  "t3_instr": "Tarea tres. Indicá si cada afirmación es verdadera o falsa.",
  "t3_1": "Cero coma ocho es menor que cero coma setenta y cinco.",
  "t3_1ok": "¡Correcto! Es falso: cero coma ochenta es mayor que cero coma setenta y cinco.",
  "t3_2": "Cero coma cinco y cero coma cincuenta representan la misma cantidad.",
  "t3_2ok": "¡Correcto! Es verdadero: cinco décimos son cincuenta centésimos.",
  "t3_3": "Dos décimos puede escribirse como cero coma dos.",
  "t3_3ok": "¡Correcto! Es verdadero.",
  "t3_4": "Tres quintos es mayor que cero coma setenta y cinco.",
  "t3_4ok": "¡Correcto! Es falso: tres quintos es cero coma seis, que es menor.",
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
   "titulo": "🔎 Decimales y fracciones",
   "pasos": [
    {
     "audio": "n1_1",
     "texto": "<b>0,5</b> = cinco décimos = <b>5/10</b>",
     "visual": {
      "tipo": "texto",
      "html": "0,5 = 5/10"
     }
    },
    {
     "audio": "n1_2",
     "texto": "<b>0,25</b> = veinticinco centésimos = <b>25/100</b>",
     "visual": {
      "tipo": "texto",
      "html": "0,25 = 25/100"
     }
    },
    {
     "audio": "n1_3",
     "texto": "<b>1,5</b> = <b>15/10</b> = <b>3/2</b>",
     "visual": {
      "tipo": "texto",
      "html": "1,5 = 15/10 = 3/2"
     }
    }
   ]
  },
  {
   "tipo": "asociar",
   "titulo": "🔗 Pares equivalentes",
   "instr": "as_instr",
   "err": "as_err",
   "ok": "as_fin",
   "cab": [
    "Decimal",
    "Fracción"
   ],
   "pares": [
    {
     "a": "0,5",
     "b": "5/10",
     "ok": "as1_ok"
    },
    {
     "a": "0,3",
     "b": "3/10",
     "ok": "as2_ok"
    },
    {
     "a": "0,75",
     "b": "75/100",
     "ok": "as3_ok"
    },
    {
     "a": "1,5",
     "b": "15/10",
     "ok": "as4_ok"
    }
   ]
  },
  {
   "tipo": "pasos",
   "titulo": "🔎 La recta de 0 a 1",
   "pasos": [
    {
     "audio": "n2_1",
     "texto": "De 0 a 1 en <b>10 partes</b>: cada una es <b>0,1</b>.",
     "visual": {
      "tipo": "recta",
      "min": 0,
      "max": 1,
      "paso": 0.1,
      "cada": 1,
      "dec": 1
     }
    },
    {
     "audio": "n2_2",
     "texto": "<b>0,25</b>: en el medio entre 0,2 y 0,3.",
     "visual": {
      "tipo": "recta",
      "min": 0,
      "max": 1,
      "paso": 0.1,
      "cada": 1,
      "dec": 1,
      "marca": 0.25
     }
    },
    {
     "audio": "n2_3",
     "texto": "<b>1/2 = 0,5</b>: la mitad de la recta.",
     "visual": {
      "tipo": "recta",
      "min": 0,
      "max": 1,
      "paso": 0.1,
      "cada": 1,
      "dec": 1,
      "marca": 0.5
     }
    }
   ]
  },
  {
   "tipo": "recta",
   "titulo": "🏃 La carrera",
   "instr": "re_instr",
   "err": "re_err",
   "recta": {
    "min": 0,
    "max": 1,
    "paso": 0.1,
    "cada": 1,
    "dec": 1
   },
   "snap": 0.05,
   "items": [
    {
     "id": "r1",
     "etiqueta": "Sofía 0,3",
     "corto": "S",
     "valor": 0.3,
     "audio": "re1",
     "ok": "re1_ok"
    },
    {
     "id": "r2",
     "etiqueta": "Leo 0,8",
     "corto": "L",
     "valor": 0.8,
     "audio": "re2",
     "ok": "re2_ok"
    },
    {
     "id": "r3",
     "etiqueta": "Mía 0,65",
     "corto": "M",
     "valor": 0.65,
     "audio": "re3",
     "ok": "re3_ok"
    },
    {
     "id": "r4",
     "etiqueta": "Juan 1/10",
     "corto": "J",
     "valor": 0.1,
     "audio": "re4",
     "ok": "re4_ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "⚖️ ¿Verdadero o falso?",
   "instr": "vf_instr",
   "err": "vf_err",
   "img": "img/lechuza.png",
   "items": [
    {
     "id": "v1",
     "audio": "vf1",
     "texto": "0,6 es mayor que 0,55.",
     "v": true,
     "ok": "vf1_ok"
    },
    {
     "id": "v2",
     "audio": "vf2",
     "texto": "0,3 y 0,30 representan la misma cantidad.",
     "v": true,
     "ok": "vf2_ok"
    },
    {
     "id": "v3",
     "audio": "vf3",
     "texto": "1/4 puede escribirse como 0,4.",
     "v": false,
     "ok": "vf3_ok"
    },
    {
     "id": "v4",
     "audio": "vf4",
     "texto": "1/2 es menor que 0,25.",
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
     "texto": "¡Ya sos un <b>detective</b> de decimales y fracciones!"
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
   "tipo": "asociar",
   "titulo": "🏆 Tarea 1",
   "instr": "t1_instr",
   "err": "t_err",
   "ok": "t1_fin",
   "cab": [
    "Decimal",
    "Fracción"
   ],
   "pares": [
    {
     "a": "0,8",
     "b": "8/10",
     "ok": "t1_1"
    },
    {
     "a": "0,25",
     "b": "25/100",
     "ok": "t1_2"
    },
    {
     "a": "5,5",
     "b": "11/2",
     "ok": "t1_3"
    },
    {
     "a": "1,2",
     "b": "12/10",
     "ok": "t1_4"
    },
    {
     "a": "2,5",
     "b": "5/2",
     "ok": "t1_5"
    },
    {
     "a": "0,08",
     "b": "8/100",
     "ok": "t1_6"
    }
   ]
  },
  {
   "tipo": "recta",
   "titulo": "🏆 Tarea 2",
   "instr": "t2_instr",
   "err": "t_err",
   "recta": {
    "min": 0,
    "max": 1,
    "paso": 0.1,
    "cada": 1,
    "dec": 1
   },
   "snap": 0.05,
   "items": [
    {
     "id": "t2a",
     "etiqueta": "Carla 0,75",
     "corto": "C",
     "valor": 0.75,
     "audio": "t2_1",
     "ok": "t2_1ok"
    },
    {
     "id": "t2b",
     "etiqueta": "Elena 0,9",
     "corto": "E",
     "valor": 0.9,
     "audio": "t2_2",
     "ok": "t2_2ok"
    },
    {
     "id": "t2c",
     "etiqueta": "Diego 0,4",
     "corto": "D",
     "valor": 0.4,
     "audio": "t2_3",
     "ok": "t2_3ok"
    },
    {
     "id": "t2d",
     "etiqueta": "Ana 0,25",
     "corto": "A",
     "valor": 0.25,
     "audio": "t2_4",
     "ok": "t2_4ok"
    },
    {
     "id": "t2e",
     "etiqueta": "Bruno 1/2",
     "corto": "B",
     "valor": 0.5,
     "audio": "t2_5",
     "ok": "t2_5ok"
    }
   ]
  },
  {
   "tipo": "vf",
   "titulo": "🏆 Tarea 3",
   "instr": "t3_instr",
   "err": "t_err",
   "img": "img/lechuza.png",
   "items": [
    {
     "id": "t3a",
     "audio": "t3_1",
     "texto": "A) “0,8 es menor que 0,75.”",
     "v": false,
     "ok": "t3_1ok"
    },
    {
     "id": "t3b",
     "audio": "t3_2",
     "texto": "B) “0,5 y 0,50 representan la misma cantidad.”",
     "v": true,
     "ok": "t3_2ok"
    },
    {
     "id": "t3c",
     "audio": "t3_3",
     "texto": "C) “2/10 puede escribirse como 0,2.”",
     "v": true,
     "ok": "t3_3ok"
    },
    {
     "id": "t3d",
     "audio": "t3_4",
     "texto": "D) “3/5 es mayor que 0,75.”",
     "v": false,
     "ok": "t3_4ok"
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
