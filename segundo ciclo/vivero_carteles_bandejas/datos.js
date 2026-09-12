/* ============================================================
   EL VIVERO — Carteles y bandejas
   datos.js — Contenido de todas las pantallas
   Basado en: "Aventureros de la Matemática" (5to grado) y
   "Orientaciones para el docente" — Gobierno de Mendoza, DGE 2025.
   Bloque "El Vivero": secuencias "Ayudamos a preparar los carteles
   del vivero" (números naturales grandes) y "Bandejas de plantines
   en el vivero" (multiplicación, división y decimales).

   Cada pantalla puede llevar un campo "_guion": un mapa
   { "ruta/del/audio.mp3": "texto exacto a locutar" } SOLO para los
   audios cuyo texto no se pueda derivar de otro campo ya visible
   (instruccionTexto, pregunta, texto de los items, etc.). Lo lee
   build_manifests.js para armar manifest_audio.json sin tipear nada
   a mano dos veces.
   ============================================================ */

window.DATOS = {
  meta: {
    titulo: "El Vivero",
    subtitulo: "Carteles y bandejas de plantines",
    mail: "profegustaaguilar@gmail.com"
  },

  pantallas: [

    /* ---------- 0. PORTADA ---------- */
    {
      id: "portada",
      tipo: "portada",
      titulo: "El Vivero",
      subtitulo: "Carteles y bandejas de plantines",
      imagen: "img/portada.jpg"
    },

    /* ========================================================
       SECUENCIA 1: AYUDAMOS A PREPARAR LOS CARTELES DEL VIVERO
       ======================================================== */

    /* ---------- p01. Narración: contexto ---------- */
    {
      id: "p01",
      tipo: "narracion",
      titulo: "Un vivero en la escuela",
      imagen: "img/p01_intro.jpg",
      texto: "En la escuela de quinto grado armaron un vivero. Antes de empezar, los chicos y las chicas visitaron el invernadero del INTA, uno de los más grandes de Mendoza, para aprender sobre las plantas y las semillas. Alberto, el encargado, les pidió ayuda: hay que preparar los carteles con la cantidad de semillas y de macetas que guardan. Para eso hace falta animarse a leer, escribir, comparar y ordenar números bien grandes.",
      audioInstr: "audio/p01_instr.mp3",
      _guion: {
        "audio/p01_instr.mp3": "En la escuela de quinto grado armaron un vivero. Antes de empezar, los chicos y las chicas visitaron el invernadero del Inta, uno de los más grandes de Mendoza, para aprender sobre las plantas y las semillas. Alberto, el encargado, les pidió ayuda: hay que preparar los carteles con la cantidad de semillas y de macetas que guardan. Para eso hace falta animarse a leer, escribir, comparar y ordenar números bien grandes."
      }
    },

    /* ---------- p02. Asociar: número en palabras <-> cifra ---------- */
    {
      id: "p02",
      tipo: "asociar",
      titulo: "¿Cómo se escribe ese número?",
      instruccionTexto: "Alberto anotó cuántas semillas hay de cada planta, pero las escribió con palabras. Uní cada cantidad en palabras con el número que le corresponde. Tocá una tarjeta de la izquierda y después su pareja de la derecha.",
      audioInstr: "audio/p02_instr.mp3",
      pares: [
        {
          id: "calendula",
          izq: "Setecientos cincuenta mil trescientos veinte semillas de caléndula",
          izqImagen: "img/icon_calendula.png",
          izqAudio: "audio/p02_izq_calendula.mp3",
          der: "750.320",
          derAudio: "audio/p02_der_calendula.mp3",
          audioConfirmaPar: "audio/p02_confirma_calendula.mp3"
        },
        {
          id: "conejitos",
          izq: "Novecientas ochenta y nueve mil ciento cuarenta y ocho semillas de conejitos",
          izqImagen: "img/icon_conejitos.png",
          izqAudio: "audio/p02_izq_conejitos.mp3",
          der: "989.148",
          derAudio: "audio/p02_der_conejitos.mp3",
          audioConfirmaPar: "audio/p02_confirma_conejitos.mp3"
        },
        {
          id: "petunia",
          izq: "Cuatrocientas veinte mil doscientas ocho semillas de petunia",
          izqImagen: "img/icon_petunia.png",
          izqAudio: "audio/p02_izq_petunia.mp3",
          der: "420.208",
          derAudio: "audio/p02_der_petunia.mp3",
          audioConfirmaPar: "audio/p02_confirma_petunia.mp3"
        }
      ],
      _guion: {
        "audio/p02_instr.mp3": "Alberto anotó cuántas semillas hay de cada planta, pero las escribió con palabras. Uní cada cantidad en palabras con el número que le corresponde. Tocá una tarjeta de la izquierda y después su pareja de la derecha.",
        "audio/p02_izq_calendula.mp3": "Setecientos cincuenta mil trescientos veinte semillas de caléndula",
        "audio/p02_der_calendula.mp3": "Setecientos cincuenta mil trescientos veinte",
        "audio/p02_confirma_calendula.mp3": "¡Muy bien! Setecientos cincuenta mil trescientos veinte se escribe con siete centenas de mil, cinco decenas de mil, cero unidades de mil, tres centenas, dos decenas y ninguna unidad suelta.",
        "audio/p02_izq_conejitos.mp3": "Novecientas ochenta y nueve mil ciento cuarenta y ocho semillas de conejitos",
        "audio/p02_der_conejitos.mp3": "Novecientos ochenta y nueve mil ciento cuarenta y ocho",
        "audio/p02_confirma_conejitos.mp3": "¡Exacto! Novecientas ochenta y nueve mil ciento cuarenta y ocho es la cantidad más grande de las tres semillas.",
        "audio/p02_izq_petunia.mp3": "Cuatrocientas veinte mil doscientas ocho semillas de petunia",
        "audio/p02_der_petunia.mp3": "Cuatrocientos veinte mil doscientos ocho",
        "audio/p02_confirma_petunia.mp3": "¡Correcto! Cuatrocientas veinte mil doscientas ocho se escribe con un cero en el lugar de las decenas de mil."
      }
    },

    /* ---------- p03. Clasificar: más o menos de 500.000 ---------- */
    {
      id: "p03",
      tipo: "clasificar",
      titulo: "¿Más o menos de 500.000?",
      instruccionTexto: "En el vivero también anotaron cuántas macetas guardan. Tocá cada cartel y después tocá la categoría que corresponda: Más de 500.000 o Menos de 500.000.",
      audioInstr: "audio/p03_instr.mp3",
      imagen: "img/p03_carteles.jpg",
      categorias: [
        { id: "mas", nombre: "Más de 500.000", color: "#2e7d32" },
        { id: "menos", nombre: "Menos de 500.000", color: "#c62828" }
      ],
      items: [
        { id: "calendula", texto: "750.320 semillas de caléndula", imagen: "img/icon_calendula.png", categoria: "mas", audio: "audio/p03_item_calendula.mp3", audioCorrecta: "audio/p03_calendula_correcta.mp3", audioIncorrecta: "audio/p03_calendula_incorrecta.mp3" },
        { id: "conejitos", texto: "989.148 semillas de conejitos", imagen: "img/icon_conejitos.png", categoria: "mas", audio: "audio/p03_item_conejitos.mp3", audioCorrecta: "audio/p03_conejitos_correcta.mp3", audioIncorrecta: "audio/p03_conejitos_incorrecta.mp3" },
        { id: "petunia", texto: "420.208 semillas de petunia", imagen: "img/icon_petunia.png", categoria: "menos", audio: "audio/p03_item_petunia.mp3", audioCorrecta: "audio/p03_petunia_correcta.mp3", audioIncorrecta: "audio/p03_petunia_incorrecta.mp3" },
        { id: "barro", texto: "534.432 macetas de barro pedidas en junio", imagen: "img/p03_barro.png", categoria: "mas", audio: "audio/p03_item_barro.mp3", audioCorrecta: "audio/p03_barro_correcta.mp3", audioIncorrecta: "audio/p03_barro_incorrecta.mp3" },
        { id: "recicladas", texto: "128.500 macetas recicladas guardadas", imagen: "img/p03_recicladas.png", categoria: "menos", audio: "audio/p03_item_recicladas.mp3", audioCorrecta: "audio/p03_recicladas_correcta.mp3", audioIncorrecta: "audio/p03_recicladas_incorrecta.mp3" }
      ],
      audioConfirma: "audio/p03_confirma.mp3",
      _guion: {
        "audio/p03_instr.mp3": "En el vivero también anotaron cuántas macetas guardan. Tocá cada cartel y después tocá la categoría que corresponda: Más de 500.000 o Menos de 500.000.",
        "audio/p03_item_calendula.mp3": "750.320 semillas de caléndula",
        "audio/p03_calendula_correcta.mp3": "¡Sí! 750.320 tiene 7 centenas de mil, así que es más de 500.000.",
        "audio/p03_calendula_incorrecta.mp3": "Fijate: 750.320 empieza con un 7 en las centenas de mil. Probá con la otra categoría.",
        "audio/p03_item_conejitos.mp3": "989.148 semillas de conejitos",
        "audio/p03_conejitos_correcta.mp3": "¡Correcto! 989.148 es la cantidad más grande de todas: es más de 500.000.",
        "audio/p03_conejitos_incorrecta.mp3": "989.148 empieza con un 9 en las centenas de mil, es un número grande. Probá de nuevo.",
        "audio/p03_item_petunia.mp3": "420.208 semillas de petunia",
        "audio/p03_petunia_correcta.mp3": "¡Muy bien! 420.208 tiene 4 centenas de mil, por eso es menos de 500.000.",
        "audio/p03_petunia_incorrecta.mp3": "420.208 empieza con un 4 en las centenas de mil. Es menos de 5, así que probá otra vez.",
        "audio/p03_item_barro.mp3": "534.432 macetas de barro pedidas en junio",
        "audio/p03_barro_correcta.mp3": "¡Exacto! 534.432 tiene un 5 seguido de un 3, así que ya pasó los 500.000.",
        "audio/p03_barro_incorrecta.mp3": "534.432 empieza con 5 centenas de mil y 3 decenas de mil más. Volvé a pensarlo.",
        "audio/p03_item_recicladas.mp3": "128.500 macetas recicladas guardadas",
        "audio/p03_recicladas_correcta.mp3": "¡Bien! 128.500 tiene solamente 1 centena de mil, es bastante menos de 500.000.",
        "audio/p03_recicladas_incorrecta.mp3": "128.500 empieza con un 1 en las centenas de mil. Probá con la otra categoría.",
        "audio/p03_confirma.mp3": "¡Listo! Ya clasificaste todos los carteles del vivero."
      }
    },

    /* ---------- p04. Ordenar: semillas de menor a mayor ---------- */
    {
      id: "p04",
      tipo: "ordenar",
      titulo: "De menor a mayor",
      instruccionTexto: "La seño les pide a los chicos ordenar la cantidad de semillas de menor a mayor. Tocá los carteles en ese orden.",
      audioInstr: "audio/p04_instr.mp3",
      imagen: "img/p04_ordenar.jpg",
      pasos: [
        { id: "petunia", texto: "420.208 — semillas de petunia", audio: "audio/p04_paso_petunia.mp3" },
        { id: "calendula", texto: "750.320 — semillas de caléndula", audio: "audio/p04_paso_calendula.mp3" },
        { id: "conejitos", texto: "989.148 — semillas de conejitos", audio: "audio/p04_paso_conejitos.mp3" }
      ],
      audioConfirma: "audio/p04_confirma.mp3",
      _guion: {
        "audio/p04_instr.mp3": "La seño les pide a los chicos ordenar la cantidad de semillas de menor a mayor. Tocá los carteles en ese orden.",
        "audio/p04_paso_petunia.mp3": "420.208, semillas de petunia",
        "audio/p04_paso_calendula.mp3": "750.320, semillas de caléndula",
        "audio/p04_paso_conejitos.mp3": "989.148, semillas de conejitos",
        "audio/p04_confirma.mp3": "¡Perfecto! De menor a mayor: petunia, caléndula y conejitos."
      }
    },

    /* ---------- p05. Trivia V/F: ¿misma cantidad de macetas? ---------- */
    {
      id: "p05",
      tipo: "trivia",
      titulo: "¿La misma cantidad?",
      instruccionTexto: "Leé la afirmación y elegí tu respuesta.",
      audioInstr: "audio/p05_instr.mp3",
      audioPregunta: "audio/p05_pregunta.mp3",
      imagen: "img/p05_macetas.jpg",
      pregunta: "Este año se pidieron 214.560 macetas de barro y 241.650 macetas recicladas. Dos alumnos dicen: 'Se pidió la misma cantidad de las dos'. ¿Tienen razón?",
      opciones: [
        { texto: "Verdadero", correcta: false },
        { texto: "Falso", correcta: true }
      ],
      audioConfirmaCorrecta: "audio/p05_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p05_incorrecta.mp3",
      _guion: {
        "audio/p05_instr.mp3": "Leé la afirmación y elegí tu respuesta.",
        "audio/p05_pregunta.mp3": "Este año se pidieron 214.560 macetas de barro y 241.650 macetas recicladas. Dos alumnos dicen: se pidió la misma cantidad de las dos. ¿Tienen razón?",
        "audio/p05_correcta.mp3": "¡Correcto, es falso! Son cantidades distintas: 214.560 y 241.650 tienen las mismas cifras pero en distinto orden, por eso no valen lo mismo.",
        "audio/p05_incorrecta.mp3": "No es lo mismo: 214.560 y 241.650 usan las mismas cifras pero en un orden diferente, así que representan cantidades distintas."
      }
    },

    /* ---------- p06. Trivia: qué maceta hay más ---------- */
    {
      id: "p06",
      tipo: "trivia",
      titulo: "¿Cuál hay más?",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p06_instr.mp3",
      audioPregunta: "audio/p06_pregunta.mp3",
      imagen: "img/p06_comparar.jpg",
      pregunta: "Entre 214.560 macetas de barro y 241.650 macetas recicladas, ¿de cuál se pidió más cantidad?",
      opciones: [
        { texto: "Macetas de barro", correcta: false },
        { texto: "Macetas recicladas", correcta: true }
      ],
      audioConfirmaCorrecta: "audio/p06_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p06_incorrecta.mp3",
      _guion: {
        "audio/p06_instr.mp3": "Elegí la opción correcta.",
        "audio/p06_pregunta.mp3": "Entre 214.560 macetas de barro y 241.650 macetas recicladas, ¿de cuál se pidió más cantidad?",
        "audio/p06_correcta.mp3": "¡Muy bien! Los dos números empiezan con 2 centenas de mil, pero después uno tiene 1 decena de mil y el otro 4. Como 4 es mayor que 1, las recicladas son más.",
        "audio/p06_incorrecta.mp3": "Fijate: las dos cantidades empiezan con 2 centenas de mil, pero después hay que mirar las decenas de mil: 1 contra 4. Ahí está la diferencia."
      }
    },

    /* ---------- p07. Asociar: completar la tabla de pedidos (julio-agosto-setiembre) ----------
       Antes eran 3 trivias casi idénticas seguidas (sumar 15.000 y elegir entre 4 opciones).
       Se fusionaron en una sola pantalla de asociar para variar la mecánica y cortar la
       repetición: ahora hay que resolver los tres meses y unir cada uno con su total. */
    {
      id: "p07",
      tipo: "asociar",
      titulo: "Completá la tabla de pedidos",
      instruccionTexto: "En junio se pidieron 534.432 macetas de barro. Cada mes que pasa se piden 15.000 más. Uní cada mes con la cantidad de macetas que le corresponde. Tocá primero el mes y después su total.",
      audioInstr: "audio/p07_instr.mp3",
      pares: [
        {
          id: "julio",
          izq: "Julio",
          izqAudio: "audio/p07_izq_julio.mp3",
          der: "549.432",
          derAudio: "audio/p07_der_julio.mp3",
          audioConfirmaPar: "audio/p07_confirma_julio.mp3"
        },
        {
          id: "agosto",
          izq: "Agosto",
          izqAudio: "audio/p07_izq_agosto.mp3",
          der: "564.432",
          derAudio: "audio/p07_der_agosto.mp3",
          audioConfirmaPar: "audio/p07_confirma_agosto.mp3"
        },
        {
          id: "setiembre",
          izq: "Setiembre",
          izqAudio: "audio/p07_izq_setiembre.mp3",
          der: "579.432",
          derAudio: "audio/p07_der_setiembre.mp3",
          audioConfirmaPar: "audio/p07_confirma_setiembre.mp3"
        }
      ],
      _guion: {
        "audio/p07_instr.mp3": "En junio se pidieron 534.432 macetas de barro. Cada mes que pasa se piden 15.000 más. Uní cada mes con la cantidad de macetas que le corresponde. Tocá primero el mes y después su total.",
        "audio/p07_izq_julio.mp3": "Julio",
        "audio/p07_der_julio.mp3": "Quinientas cuarenta y nueve mil cuatrocientas treinta y dos",
        "audio/p07_confirma_julio.mp3": "¡Correcto! En junio había 534.432 macetas. Sumando 15.000 más, julio cierra con 549.432.",
        "audio/p07_izq_agosto.mp3": "Agosto",
        "audio/p07_der_agosto.mp3": "Quinientas sesenta y cuatro mil cuatrocientas treinta y dos",
        "audio/p07_confirma_agosto.mp3": "¡Muy bien! Sumando 15.000 más a los 549.432 de julio, agosto cierra con 564.432.",
        "audio/p07_izq_setiembre.mp3": "Setiembre",
        "audio/p07_der_setiembre.mp3": "Quinientas setenta y nueve mil cuatrocientas treinta y dos",
        "audio/p07_confirma_setiembre.mp3": "¡Excelente! Sumando 15.000 más a los 564.432 de agosto, setiembre cierra con 579.432. ¡Completaste toda la tabla!"
      }
    },

    /* ========================================================
       SECUENCIA 2: BANDEJAS DE PLANTINES EN EL VIVERO
       ======================================================== */

    /* ---------- p10. Narración: contexto bandejas ---------- */
    {
      id: "p10",
      tipo: "narracion",
      titulo: "Las bandejas de plantines",
      imagen: "img/p10_intro.jpg",
      texto: "En el vivero hay distintas bandejas de plantines. Alberto les muestra a los chicos cómo están organizadas las bandejas de suculentas: ese día hay 24 bandejas, y cada una tiene los plantines acomodados en 9 filas y 14 columnas, como una cuadrícula. Ahora hay que averiguar cuántos plantines hay en total.",
      audioInstr: "audio/p10_instr.mp3",
      _guion: {
        "audio/p10_instr.mp3": "En el vivero hay distintas bandejas de plantines. Alberto les muestra a los chicos cómo están organizadas las bandejas de suculentas: ese día hay 24 bandejas, y cada una tiene los plantines acomodados en 9 filas y 14 columnas, como una cuadrícula. Ahora hay que averiguar cuántos plantines hay en total."
      }
    },

    /* ---------- p11. Trivia: plantines por bandeja ---------- */
    {
      id: "p11",
      tipo: "trivia",
      titulo: "Filas y columnas",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p11_instr.mp3",
      audioPregunta: "audio/p11_pregunta.mp3",
      imagen: "img/p11_bandeja.jpg",
      pregunta: "¿Cuántos plantines de suculentas hay en una bandeja de 9 filas y 14 columnas?",
      opciones: [
        { texto: "126", correcta: true },
        { texto: "23", correcta: false },
        { texto: "63", correcta: false },
        { texto: "140", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p11_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p11_incorrecta.mp3",
      _guion: {
        "audio/p11_instr.mp3": "Elegí la opción correcta.",
        "audio/p11_pregunta.mp3": "¿Cuántos plantines de suculentas hay en una bandeja de 9 filas y 14 columnas?",
        "audio/p11_correcta.mp3": "¡Correcto! 9 filas por 14 columnas son 126 plantines. La multiplicación sirve justo para esto: contar cantidades organizadas en filas y columnas.",
        "audio/p11_incorrecta.mp3": "Para contar filas y columnas se multiplica: 9 filas por 14 columnas son 126 plantines."
      }
    },

    /* ---------- p12. Trivia: total ese día (24 bandejas) ---------- */
    {
      id: "p12",
      tipo: "trivia",
      titulo: "Todas las bandejas del día",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p12_instr.mp3",
      audioPregunta: "audio/p12_pregunta.mp3",
      imagen: "img/p11_bandeja.jpg",
      pregunta: "Si hay 24 bandejas de 126 plantines cada una, ¿cuántos plantines de suculentas hay en total ese día?",
      opciones: [
        { texto: "3.024", correcta: true },
        { texto: "2.520", correcta: false },
        { texto: "3.150", correcta: false },
        { texto: "3.146", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p12_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p12_incorrecta.mp3",
      _guion: {
        "audio/p12_instr.mp3": "Elegí la opción correcta.",
        "audio/p12_pregunta.mp3": "Si hay 24 bandejas de 126 plantines cada una, ¿cuántos plantines de suculentas hay en total ese día?",
        "audio/p12_correcta.mp3": "¡Muy bien! 126 por 24 es 3.024 plantines.",
        "audio/p12_incorrecta.mp3": "126 por 24 da 3.024. Podés pensarlo como 126 por 20, más 126 por 4."
      }
    },

    /* ---------- p13. Trivia V/F: duplicar bandejas ---------- */
    {
      id: "p13",
      tipo: "trivia",
      titulo: "El doble de bandejas",
      instruccionTexto: "Leé la afirmación y elegí tu respuesta.",
      audioInstr: "audio/p13_instr.mp3",
      audioPregunta: "audio/p13_pregunta.mp3",
      imagen: "img/p13_doble.jpg",
      pregunta: "Como en 24 bandejas hay 3.024 plantines, entonces en 48 bandejas —el doble— hay 6.048 plantines, sin necesidad de multiplicar todo de nuevo.",
      opciones: [
        { texto: "Verdadero", correcta: true },
        { texto: "Falso", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p13_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p13_incorrecta.mp3",
      _guion: {
        "audio/p13_instr.mp3": "Leé la afirmación y elegí tu respuesta.",
        "audio/p13_pregunta.mp3": "Como en 24 bandejas hay 3.024 plantines, entonces en 48 bandejas, el doble, hay 6.048 plantines, sin necesidad de multiplicar todo de nuevo.",
        "audio/p13_correcta.mp3": "¡Verdadero! Como 48 es el doble de 24, alcanza con duplicar 3.024 para obtener 6.048. Apoyarse en cálculos que ya conocemos, como el doble, ahorra trabajo.",
        "audio/p13_incorrecta.mp3": "En realidad sí es verdadero: 48 es el doble de 24, entonces el total también se duplica: 3.024 más 3.024 es 6.048."
      }
    },

    /* ---------- p14. Trivia: bandeja de cactus, filas ---------- */
    {
      id: "p14",
      tipo: "trivia",
      titulo: "La bandeja de cactus",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p14_instr.mp3",
      audioPregunta: "audio/p14_pregunta.mp3",
      imagen: "img/p14_cactus.jpg",
      pregunta: "En una bandeja de cactus hay 216 plantines, con 18 plantines en cada fila. ¿Cuántas filas tiene la bandeja?",
      opciones: [
        { texto: "12", correcta: true },
        { texto: "10", correcta: false },
        { texto: "14", correcta: false },
        { texto: "18", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p14_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p14_incorrecta.mp3",
      _guion: {
        "audio/p14_instr.mp3": "Elegí la opción correcta.",
        "audio/p14_pregunta.mp3": "En una bandeja de cactus hay 216 plantines, con 18 plantines en cada fila. ¿Cuántas filas tiene la bandeja?",
        "audio/p14_correcta.mp3": "¡Exacto! 216 dividido 18 es 12 filas. Podés pensarlo así: 10 filas son 180 plantines, y con 2 filas más, 36 plantines, llegás a los 216.",
        "audio/p14_incorrecta.mp3": "Pensalo por partes: 10 filas de 18 son 180 plantines. Con 2 filas más, 36 plantines, se llega a 216. En total son 12 filas."
      }
    },

    /* ---------- p15. Trivia: packs de 15 ---------- */
    {
      id: "p15",
      tipo: "trivia",
      titulo: "Armamos los packs",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p15_instr.mp3",
      audioPregunta: "audio/p15_pregunta.mp3",
      imagen: "img/p15_packs.jpg",
      pregunta: "Hay 8 bandejas de cactus como esa, con 216 plantines cada una: en total, 1.728 plantines. Si se arman packs de 15 plantines cada uno, ¿cuántos packs completos se pueden armar?",
      opciones: [
        { texto: "115", correcta: true },
        { texto: "116", correcta: false },
        { texto: "114", correcta: false },
        { texto: "120", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p15_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p15_incorrecta.mp3",
      _guion: {
        "audio/p15_instr.mp3": "Elegí la opción correcta.",
        "audio/p15_pregunta.mp3": "Hay 8 bandejas de cactus como esa, con 216 plantines cada una: en total, 1.728 plantines. Si se arman packs de 15 plantines cada uno, ¿cuántos packs completos se pueden armar?",
        "audio/p15_correcta.mp3": "¡Muy bien! 1.728 dividido 15 da 115 packs completos, y todavía sobran algunos plantines sueltos.",
        "audio/p15_incorrecta.mp3": "Con 100 packs de 15 usamos 1.500 plantines. Quedan 228. Con 15 packs más, 225 plantines, llegamos a 115 packs en total."
      }
    },

    /* ---------- p16. Trivia: plantines sobrantes ---------- */
    {
      id: "p16",
      tipo: "trivia",
      titulo: "¿Cuántos sobran?",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p16_instr.mp3",
      audioPregunta: "audio/p16_pregunta.mp3",
      imagen: "img/p15_packs.jpg",
      pregunta: "Después de armar esos 115 packs de 15 plantines con los 1.728 plantines, ¿cuántos plantines sueltos sobran?",
      opciones: [
        { texto: "3", correcta: true },
        { texto: "0", correcta: false },
        { texto: "15", correcta: false },
        { texto: "12", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p16_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p16_incorrecta.mp3",
      _guion: {
        "audio/p16_instr.mp3": "Elegí la opción correcta.",
        "audio/p16_pregunta.mp3": "Después de armar esos 115 packs de 15 plantines con los 1.728 plantines, ¿cuántos plantines sueltos sobran?",
        "audio/p16_correcta.mp3": "¡Correcto! 115 packs de 15 usan 1.725 plantines. Como había 1.728, sobran 3 plantines sueltos.",
        "audio/p16_incorrecta.mp3": "115 packs de 15 son 1.725 plantines. Como teníamos 1.728, sobran 3 plantines sueltos."
      }
    },

    /* ---------- p17. Trivia decimales: tierra para 4 plantines ---------- */
    {
      id: "p17",
      tipo: "trivia",
      titulo: "La tierra de cada plantín",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p17_instr.mp3",
      audioPregunta: "audio/p17_pregunta.mp3",
      imagen: "img/p17_tierra.jpg",
      pregunta: "Cada plantín necesita 0,15 kg de tierra preparada. ¿Cuánta tierra se necesita para preparar 4 plantines?",
      opciones: [
        { texto: "0,60 kg", correcta: true },
        { texto: "0,19 kg", correcta: false },
        { texto: "6 kg", correcta: false },
        { texto: "1,5 kg", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p17_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p17_incorrecta.mp3",
      _guion: {
        "audio/p17_instr.mp3": "Elegí la opción correcta.",
        "audio/p17_pregunta.mp3": "Cada plantín necesita 0 coma 15 kilogramos de tierra preparada. ¿Cuánta tierra se necesita para preparar 4 plantines?",
        "audio/p17_correcta.mp3": "¡Muy bien! Podés pensarlo con el doble: el doble de 0,15 es 0,30, y el doble de 0,30 es 0,60. Para 4 plantines se necesitan 0,60 kilogramos.",
        "audio/p17_incorrecta.mp3": "Probá con el doble: el doble de 0,15 es 0,30 kilogramos, para 2 plantines. El doble de eso, para 4 plantines, es 0,60 kilogramos."
      }
    },

    /* ---------- p18. Trivia decimales: bolsas de tierra (trampa clásica) ---------- */
    {
      id: "p18",
      tipo: "trivia",
      titulo: "Las bolsas de tierra",
      instruccionTexto: "Elegí la opción correcta.",
      audioInstr: "audio/p18_instr.mp3",
      audioPregunta: "audio/p18_pregunta.mp3",
      imagen: "img/p18_bolsas.jpg",
      pregunta: "Para los plantines se usan bolsas de 2,5 kg de tierra preparada cada una. Si se necesitan 3 bolsas, ¿cuántos kilogramos de tierra hay en total?",
      opciones: [
        { texto: "7,5 kg", correcta: true },
        { texto: "75 kg", correcta: false },
        { texto: "5,5 kg", correcta: false },
        { texto: "8,5 kg", correcta: false }
      ],
      audioConfirmaCorrecta: "audio/p18_correcta.mp3",
      audioConfirmaIncorrecta: "audio/p18_incorrecta.mp3",
      _guion: {
        "audio/p18_instr.mp3": "Elegí la opción correcta.",
        "audio/p18_pregunta.mp3": "Para los plantines se usan bolsas de 2 coma 5 kilogramos de tierra preparada cada una. Si se necesitan 3 bolsas, ¿cuántos kilogramos de tierra hay en total?",
        "audio/p18_correcta.mp3": "¡Exacto, 7,5 kilogramos! Ojo con correr la coma: 2,5 por 3 no puede dar 75, porque cada bolsa pesa un poquito más de 2 kilos, no 20.",
        "audio/p18_incorrecta.mp3": "El resultado correcto es 7,5 kilogramos, no 75: si cada bolsa pesa un poquito más de 2 kilos, 3 bolsas no pueden pesar 75 kilos. Hay que tener cuidado con la coma decimal."
      }
    },

    /* ---------- p18h. Hotspot: encontrá los elementos del vivero ----------
       Mecánica nueva (no usada antes en este paquete) para cortar la seguidilla
       de trivias: tocar zonas sobre una imagen. Coordenadas de "zonas" ajustadas
       a ojo sobre la imagen real ya generada (cuadrícula 2x2: suculentas arriba
       izquierda, cactus arriba derecha, pack abajo izquierda, tierra abajo derecha). */
    {
      id: "p18h",
      tipo: "hotspot",
      titulo: "Encontrá los elementos del vivero",
      instruccionTexto: "Tocá en la imagen cada elemento que usamos en el vivero. Cuando encuentres los cuatro, vas a poder avanzar.",
      audioInstr: "audio/p18h_instr.mp3",
      imagen: "img/p18h_elementos.jpg",
      zonas: [
        { id: "bandeja_suculentas", x: 0.02, y: 0.03, w: 0.47, h: 0.46, label: "Bandeja de suculentas: 9 filas por 14 columnas, 126 plantines.", audio: "audio/p18h_suculentas.mp3" },
        { id: "bandeja_cactus", x: 0.52, y: 0.03, w: 0.46, h: 0.46, label: "Bandeja de cactus: 216 plantines en filas de 18.", audio: "audio/p18h_cactus.mp3" },
        { id: "pack", x: 0.02, y: 0.51, w: 0.53, h: 0.45, label: "Pack de 15 plantines listo para la venta.", audio: "audio/p18h_pack.mp3" },
        { id: "bolsa_tierra", x: 0.58, y: 0.51, w: 0.40, h: 0.47, label: "Bolsa de 2,5 kg de tierra preparada.", audio: "audio/p18h_tierra.mp3" }
      ],
      audioConfirma: "audio/p18h_confirma.mp3",
      _guion: {
        "audio/p18h_instr.mp3": "Tocá en la imagen cada elemento que usamos en el vivero. Cuando encuentres los cuatro, vas a poder avanzar.",
        "audio/p18h_suculentas.mp3": "Bandeja de suculentas: 9 filas por 14 columnas, 126 plantines.",
        "audio/p18h_cactus.mp3": "Bandeja de cactus: 216 plantines en filas de 18.",
        "audio/p18h_pack.mp3": "Pack de 15 plantines listo para la venta.",
        "audio/p18h_tierra.mp3": "Bolsa de 2,5 kilogramos de tierra preparada.",
        "audio/p18h_confirma.mp3": "¡Muy bien! Ya identificaste todo lo que usamos para armar y vender las bandejas del vivero."
      }
    },

    /* ---------- p19. Clasificar cierre: ¿multiplico o divido? ---------- */
    {
      id: "p19",
      tipo: "clasificar",
      titulo: "¿Multiplico o divido?",
      instruccionTexto: "Repasemos: tocá cada situación del vivero y después tocá si conviene Multiplicar o Dividir para resolverla.",
      audioInstr: "audio/p19_instr.mp3",
      imagen: "img/p19_repaso.jpg",
      categorias: [
        { id: "multiplicar", nombre: "Multiplico", color: "#2e7d32" },
        { id: "dividir", nombre: "Divido", color: "#1565c0" }
      ],
      items: [
        { id: "bandeja_total", texto: "Sé que hay 9 filas y 14 columnas de plantines y quiero el total de la bandeja", imagen: "img/p19_item_filas.png", categoria: "multiplicar", audio: "audio/p19_item_filas.mp3", audioCorrecta: "audio/p19_filas_correcta.mp3", audioIncorrecta: "audio/p19_filas_incorrecta.mp3" },
        { id: "packs", texto: "Tengo 1.728 plantines y quiero armar packs de 15: necesito saber cuántos packs salen", imagen: "img/p19_item_packs.png", categoria: "dividir", audio: "audio/p19_item_packs.mp3", audioCorrecta: "audio/p19_packs_correcta.mp3", audioIncorrecta: "audio/p19_packs_incorrecta.mp3" },
        { id: "bandejas24", texto: "Sé que una bandeja tiene 126 plantines y quiero saber cuántos hay en 24 bandejas", imagen: "img/p19_item_bandejas.png", categoria: "multiplicar", audio: "audio/p19_item_bandejas.mp3", audioCorrecta: "audio/p19_bandejas_correcta.mp3", audioIncorrecta: "audio/p19_bandejas_incorrecta.mp3" },
        { id: "cactus_filas", texto: "Tengo 216 plantines acomodados en filas de 18 y quiero saber cuántas filas hay", imagen: "img/p19_item_cactus.png", categoria: "dividir", audio: "audio/p19_item_cactus.mp3", audioCorrecta: "audio/p19_cactus_correcta.mp3", audioIncorrecta: "audio/p19_cactus_incorrecta.mp3" },
        { id: "tierra", texto: "Cada plantín usa 0,15 kg de tierra y quiero saber cuánta tierra necesito para 4 plantines", imagen: "img/p19_item_tierra.png", categoria: "multiplicar", audio: "audio/p19_item_tierra.mp3", audioCorrecta: "audio/p19_tierra_correcta.mp3", audioIncorrecta: "audio/p19_tierra_incorrecta.mp3" }
      ],
      audioConfirma: "audio/p19_confirma.mp3",
      _guion: {
        "audio/p19_instr.mp3": "Repasemos: tocá cada situación del vivero y después tocá si conviene Multiplicar o Dividir para resolverla.",
        "audio/p19_item_filas.mp3": "Sé que hay 9 filas y 14 columnas de plantines y quiero el total de la bandeja",
        "audio/p19_filas_correcta.mp3": "¡Sí! Cuando sabés cuántas filas y cuántas columnas hay, multiplicás para saber el total.",
        "audio/p19_filas_incorrecta.mp3": "Cuando conocés filas y columnas y querés el total, se multiplica. Probá otra vez.",
        "audio/p19_item_packs.mp3": "Tengo 1.728 plantines y quiero armar packs de 15: necesito saber cuántos packs salen",
        "audio/p19_packs_correcta.mp3": "¡Correcto! Cuando repartís un total en grupos iguales, dividís.",
        "audio/p19_packs_incorrecta.mp3": "Repartir un total en grupos iguales es una división. Probá con la otra categoría.",
        "audio/p19_item_bandejas.mp3": "Sé que una bandeja tiene 126 plantines y quiero saber cuántos hay en 24 bandejas",
        "audio/p19_bandejas_correcta.mp3": "¡Exacto! Repetir una misma cantidad muchas veces es multiplicar.",
        "audio/p19_bandejas_incorrecta.mp3": "Repetir 126 plantines en 24 bandejas es una multiplicación. Volvé a intentarlo.",
        "audio/p19_item_cactus.mp3": "Tengo 216 plantines acomodados en filas de 18 y quiero saber cuántas filas hay",
        "audio/p19_cactus_correcta.mp3": "¡Muy bien! Buscar cuántos grupos de 18 entran en 216 es una división.",
        "audio/p19_cactus_incorrecta.mp3": "Buscar cuántas filas de 18 entran en 216 es una división. Probá otra vez.",
        "audio/p19_item_tierra.mp3": "Cada plantín usa 0,15 kg de tierra y quiero saber cuánta tierra necesito para 4 plantines",
        "audio/p19_tierra_correcta.mp3": "¡Bien! Repetir 0,15 kilogramos cuatro veces es una multiplicación, aunque el número tenga decimales.",
        "audio/p19_tierra_incorrecta.mp3": "Repetir una misma cantidad de tierra varias veces también es multiplicar, aunque el número tenga decimales. Probá con la otra categoría.",
        "audio/p19_confirma.mp3": "¡Genial! Ya sabés reconocer cuándo conviene multiplicar y cuándo conviene dividir."
      }
    },

    /* ---------- CIERRE ---------- */
    {
      id: "cierre",
      tipo: "cierre",
      titulo: "¡Terminamos con el vivero!",
      imagen: "img/cierre.jpg"
    }

  ]
};
