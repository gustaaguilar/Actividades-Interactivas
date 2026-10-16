/* DETECTIVES DE LOS MÚLTIPLOS Y DIVISORES — Matemática · 🔢 Matemática · 6.º grado
   Basado en la Ficha N.º 3 de Habilidades Lógico-Matemáticas · DGE Mendoza · Continuidad pedagógica en la modalidad no presencial
   QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
 "meta": {
  "titulo": "Detectives de los múltiplos y divisores",
  "subtitulo": "Ficha 3: Número y operaciones",
  "area": "🔢 Matemática · 6.º grado",
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
  "f01": "Si ocho por quince es ciento veinte, decimos que ciento veinte es múltiplo de ocho y de quince.",
  "f02": "Y también que ocho y quince son divisores de ciento veinte: lo dividen exactamente, sin resto.",
  "f03": "Es una relación de ida y vuelta: si a es múltiplo de b, entonces b es divisor de a.",
  "f04": "Esa no es. El número grande es múltiplo; los chicos son divisores.",
  "f05": "Leé cada frase y tocá la palabra que corresponde.",
  "f06": "Como seis por siete es cuarenta y dos, entonces cuarenta y dos es… de seis.",
  "f07": "¡Sí! Cuarenta y dos es múltiplo de seis.",
  "f08": "Como seis por siete es cuarenta y dos, entonces siete es… de cuarenta y dos.",
  "f09": "¡Muy bien! Siete es divisor de cuarenta y dos.",
  "de_1": "¡Muy bien, detective! Ya practicaste un montón.",
  "de_2": "Ahora llega el desafío: son las 3 tareas de la ficha de la escuela.",
  "de_3": "Leé o escuchá con atención, pensá bien y respondé. Cada respuesta cuenta una sola vez.",
  "f10": "Tarea uno. La docente tiene ciento veinte diplomas y quiere guardarlos en sobres, colocando la misma cantidad en cada sobre, sin que sobre ninguno. Si coloca quince diplomas en cada sobre, ¿cuántos sobres completos puede armar?",
  "f11": "¡Correcto! Ciento veinte dividido quince es ocho: ocho sobres de quince diplomas.",
  "f12": "Completá con la relación de divisor o múltiplo que se establece entre los números.",
  "f13": "¡Excelente! Ciento veinte es múltiplo de quince y de ocho, y quince y ocho son divisores de ciento veinte.",
  "f14": "Tarea dos. Anticipá resultados sin hacer cuentas largas. Sabemos que veinticuatro por quince es trescientos sesenta. Sin realizar las divisiones, seleccioná la opción correcta en cada caso.",
  "f15": "a. ¿Cuál es el cociente y el resto de trescientos sesenta dividido veinticuatro?",
  "f16": "¡Correcto! Cociente quince y resto cero.",
  "f17": "b. ¿Cuál es el cociente y el resto de trescientos sesenta dividido quince?",
  "f18": "¡Correcto! Cociente veinticuatro y resto cero.",
  "f19": "c. ¿Por qué podemos anticipar los resultados sin hacer las cuentas de dividir?",
  "f20": "¡Excelente! Esa es la relación de ida y vuelta entre multiplicar y dividir.",
  "f21": "Tarea tres. Uní cada afirmación de la columna A con su formulación equivalente en la columna B.",
  "f22": "¡Excelente! Uniste todas las formulaciones equivalentes.",
  "f23": "¡Sí! Si setenta y dos es múltiplo de ocho, ocho es divisor de setenta y dos.",
  "f24": "¡Correcto! Nueve es divisor de cincuenta y cuatro.",
  "f25": "¡Bien! Si la división es exacta, a es múltiplo de b y de c.",
  "f26": "¡Muy bien!",
  "f27": "¡Excelente!",
  "portada": "¡Hola, detective! Soy Lola, la lechuza. Hoy vamos a investigar la relación de ida y vuelta entre múltiplos y divisores. Tocá Comenzar.",
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
   "titulo": "🔎 Múltiplos y divisores",
   "pasos": [
    {
     "audio": "f01",
     "texto": "Si <b>8 × 15 = 120</b>, decimos que 120 es <b>múltiplo</b> de 8 y de 15.",
     "visual": {
      "tipo": "texto",
      "html": "8 × 15 = <b>120</b>"
     }
    },
    {
     "audio": "f02",
     "texto": "Y también que 8 y 15 son <b>divisores</b> de 120: lo dividen <b>sin resto</b>.",
     "visual": {
      "tipo": "texto",
      "html": "120 : 8 = 15 · resto 0<br>120 : 15 = 8 · resto 0"
     }
    },
    {
     "audio": "f03",
     "texto": "Es una relación <b>de ida y vuelta</b>: si <b>a</b> es múltiplo de <b>b</b>, entonces <b>b</b> es divisor de <b>a</b>."
    }
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🧩 ¿Múltiplo o divisor?",
   "instr": "f05",
   "err": "f04",
   "rondas": [
    {
     "id": "f06",
     "texto": "Como 6 × 7 = 42, entonces 42 es ______ de 6.",
     "opciones": [
      "múltiplo",
      "divisor"
     ],
     "ok": "f07",
     "audio": "f06",
     "respuesta": "múltiplo",
     "visual": {
      "tipo": "texto",
      "html": "6 × 7 = 42"
     }
    },
    {
     "id": "f08",
     "texto": "Como 6 × 7 = 42, entonces 7 es ______ de 42.",
     "opciones": [
      "múltiplo",
      "divisor"
     ],
     "ok": "f09",
     "audio": "f08",
     "respuesta": "divisor",
     "visual": {
      "tipo": "texto",
      "html": "6 × 7 = 42"
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
   "titulo": "🏆 Tarea 1 (a)",
   "err": "t_err",
   "rondas": [
    {
     "id": "f10",
     "texto": "La docente tiene <b>120 diplomas</b> y quiere guardarlos en sobres, con la misma cantidad en cada sobre, sin que sobre ninguno. Si coloca <b>15 diplomas</b> en cada sobre, ¿cuántos sobres completos puede armar?",
     "opciones": [
      "8 sobres completos con 15 diplomas cada uno.",
      "15 sobres iguales con 8 diplomas cada uno.",
      "15 sobres colocando 120 diplomas en cada uno."
     ],
     "ok": "f11",
     "audio": "f10",
     "respuesta": "8 sobres completos con 15 diplomas cada uno.",
     "visual": {
      "tipo": "emoji",
      "e": "✉️📜"
     }
    }
   ]
  },
  {
   "tipo": "huecos",
   "titulo": "🏆 Tarea 1 (b)",
   "instr": "f12",
   "err": "t_err",
   "ok": "f13",
   "texto": "Completá con <b>múltiplo</b> o <b>divisor</b>.",
   "frases": [
    {
     "id": "m1",
     "ico": "🔢",
     "html": "120 es ___ de 15",
     "resp": [
      "múltiplo"
     ]
    },
    {
     "id": "m2",
     "ico": "🔢",
     "html": "120 es ___ de 8",
     "resp": [
      "múltiplo"
     ]
    },
    {
     "id": "m3",
     "ico": "🔢",
     "html": "15 es ___ de 120",
     "resp": [
      "divisor"
     ]
    },
    {
     "id": "m4",
     "ico": "🔢",
     "html": "8 es ___ de 120",
     "resp": [
      "divisor"
     ]
    }
   ],
   "banco": [
    "múltiplo",
    "múltiplo",
    "divisor",
    "divisor"
   ]
  },
  {
   "tipo": "opcion",
   "titulo": "🏆 Tarea 2",
   "instr": "f14",
   "err": "t_err",
   "rondas": [
    {
     "id": "f15",
     "texto": "a) ¿Cuál es el cociente y el resto de <b>360 ÷ 24</b>?",
     "opciones": [
      "Cociente: 15 — Resto: 0",
      "Cociente: 24 — Resto: 15",
      "Cociente: 15 — Resto: 24"
     ],
     "ok": "f16",
     "audio": "f15",
     "respuesta": "Cociente: 15 — Resto: 0"
    },
    {
     "id": "f17",
     "texto": "b) ¿Cuál es el cociente y el resto de <b>360 ÷ 15</b>?",
     "opciones": [
      "Cociente: 24 — Resto: 0",
      "Cociente: 15 — Resto: 24",
      "Cociente: 24 — Resto: 15"
     ],
     "ok": "f18",
     "audio": "f17",
     "respuesta": "Cociente: 24 — Resto: 0"
    },
    {
     "id": "f19",
     "texto": "c) ¿Por qué podemos anticipar los resultados sin hacer las cuentas de dividir?",
     "opciones": [
      "Porque 360 es el resultado de 24 × 15, entonces 360 es múltiplo de 24 y de 15; por lo tanto 24 y 15 son divisores de 360 con resto cero.",
      "Porque 360 es divisor de 24 y de 15, por lo que al dividir 24 y 15 por 360 se obtiene un resultado exacto.",
      "Porque cuando conocemos el resultado de una multiplicación, al dividirlo por cualquier número natural siempre obtenemos una división exacta, sin resto."
     ],
     "ok": "f20",
     "audio": "f19",
     "respuesta": "Porque 360 es el resultado de 24 × 15, entonces 360 es múltiplo de 24 y de 15; por lo tanto 24 y 15 son divisores de 360 con resto cero."
    }
   ],
   "visual": {
    "tipo": "texto",
    "html": "24 × 15 = <b>360</b>"
   }
  },
  {
   "tipo": "asociar",
   "titulo": "🏆 Tarea 3",
   "instr": "f21",
   "err": "t_err",
   "ok": "f22",
   "cab": [
    "Columna A",
    "Columna B"
   ],
   "pares": [
    {
     "a": "72 es múltiplo de 8",
     "b": "8 es divisor de 72 (72 : 8 tiene resto 0)",
     "ok": "f23"
    },
    {
     "a": "9 es divisor de 54",
     "b": "54 es múltiplo de 9 (porque 9 × 6 = 54)",
     "ok": "f24"
    },
    {
     "a": "a dividido b da cociente c y resto 0",
     "b": "a es múltiplo de b y de c (a = b × c)",
     "ok": "f25"
    },
    {
     "a": "45 × 6 = 270",
     "b": "270 es múltiplo de 45 y 6; 45 y 6 dividen exactamente a 270",
     "ok": "f26"
    },
    {
     "a": "1 es divisor de todo número natural",
     "b": "Todos los números naturales son múltiplos de 1",
     "ok": "f27"
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
