window.DATOS = {
  meta: { titulo: "Nuestras compras", subtitulo: "", area: "Matemática · Primer ciclo · Higiene", mail: "profegustaaguilar@gmail.com", foto: "profe.jpg", fotoMini: "profe_mini.jpg", puntosPorAcierto: 10, revision: false },
  audios: {
    portada: "¡Hola! Vamos a aprender sobre nuestras compras y la higiene personal. ¡Empecemos!",
    a1_instr: "Mirá el afiche publicitario. Escuchá el precio y elegí a qué producto corresponde.",
    a1_zoom: "Tocá el afiche para ampliar la imagen.",
    
    afa_q1: "¿Qué producto cuesta noventa pesos?", afa_q2: "¿Qué producto cuesta ochenta pesos?", afa_q3: "¿Qué producto cuesta setenta pesos?", afa_q4: "¿Qué producto cuesta cincuenta pesos?", afa_q5: "¿Qué producto cuesta ciento cuarenta pesos?", afa_q6: "¿Qué producto cuesta cien pesos?",
    afa_1_ok: "¡Muy bien! Ese es el alcohol.", afa_2_ok: "¡Correcto! Ese es el dentífrico.", afa_3_ok: "¡Excelente! Esa es el agua.", afa_4_ok: "¡Muy bien! Ese es el peine.", afa_5_ok: "¡Genial! Ese es el enjuague.", afa_6_ok: "¡Perfecto! Ese es el talco.",
    af_err: "Ese no es el producto. Mirá el afiche y volvé a intentar.",

    afb_q1: "¿Qué producto cuesta ciento veinte pesos?", afb_q2: "¿Qué producto cuesta ciento diez pesos?", afb_q3: "¿Qué producto cuesta ciento cincuenta pesos?", afb_q4: "¿Qué producto cuesta ciento noventa pesos?", afb_q5: "¿Qué producto cuesta ciento sesenta pesos?", afb_q6: "¿Qué producto cuesta ciento treinta pesos?",
    afb_1_ok: "¡Muy bien! Ese es el champú.", afb_2_ok: "¡Correcto! Ese es el jabón.", afb_3_ok: "¡Excelente! Esa es la toalla.", afb_4_ok: "¡Muy bien! Ese es el perfume.", afb_5_ok: "¡Genial! Esa es la crema.", afb_6_ok: "¡Perfecto! Ese es el desodorante.",

    a5_instr: "Escribí el nombre del producto usando las letras. Cuando termines, presioná verificar.",
    a5_1_ok: "¡Muy bien! Escribiste champú.", a5_2_ok: "¡Correcto! Escribiste jabón.", a5_3_ok: "¡Excelente! Escribiste toalla.", a5_4_ok: "¡Muy bien! Escribiste perfume.", a5_err: "Todavía no es. Revisá las letras y volvé a intentar.",

    a6_instr: "Encontrá los nombres de los productos en la sopa de letras. Guiate con el afiche.", 
    a6_1: "¡Encontraste champú!", a6_2: "¡Encontraste jabón!", a6_3: "¡Encontraste toalla!", a6_4: "¡Encontraste perfume!",
  a6_5: "¡Encontraste crema!",
  a6_6: "¡Encontraste desodorante!",

    a2_instr: "Armá cada oración tocando las palabras en el orden correcto.",
    a2_or1: "El jabón limpia las manos.", a2_or2: "Mi toalla está limpia.", a2_or3: "El perfume huele rico.", a2_or4: "Nosotros nos ayudamos en la escuela.",

    a3_instr: "Leé cada problema. Elegí la cuenta correcta y después elegí el resultado.",
    a3_p1_q: "Ana quiere comprar un champú de ciento veinte pesos y un jabón de ciento diez pesos. ¿Cuánto gastará en total?",
    a3_p2_q: "Pedro compra una toalla de ciento cincuenta pesos y paga con doscientos pesos. ¿Cuánto le darán de vuelto?",
    a3_p3_q: "Vos tenés trescientos pesos y regalás un perfume de ciento noventa pesos. ¿Cuánto te quedará?",
    a3_p1_c_ok: "¡Muy bien! Para saber el total, hay que sumar.", a3_p2_c_ok: "¡Excelente! Para saber el vuelto, hay que restar.", a3_p3_c_ok: "¡Correcto! Para saber cuánto queda, hay que restar.", a3_c_err: "Esa cuenta no es la correcta. Pensá si hay que sumar o restar.",
    a3_p1_r_ok: "¡Genial! Ciento veinte más ciento diez es doscientos treinta.", a3_p2_r_ok: "¡Perfecto! Doscientos menos ciento cincuenta es cincuenta.", a3_p3_r_ok: "¡Muy bien! Trescientos menos ciento noventa es ciento diez.", a3_r_err: "Ese no es el resultado correcto. Volvé a intentar.",
    a3_elegir_cuenta: "Elegí qué cuenta tenés que hacer.", a3_elegir_res: "Ahora elegí el resultado correcto.",
    
    a4_1: "Los billetes argentinos tienen distintos valores: cien, cincuenta, veinte y diez pesos. Cuanto más alto el número, más vale el billete.",
    a4_2: "Para saber cuánto gastamos en total, sumamos el precio de todos los productos. Por ejemplo, un champú de ciento veinte pesos más un jabón de ciento diez pesos son doscientos treinta pesos.",
    a4_3: "Si pagamos con un billete más grande, nos tienen que dar el vuelto. El vuelto es la diferencia. Por ejemplo, si pagamos doscientos pesos por algo que cuesta ciento cincuenta, el vuelto es cincuenta pesos.",
    a4_instr_prac: "Ahora practiquemos. Si comprás un jabón de ciento diez pesos y una toalla de ciento cincuenta pesos, ¿cuánto gastás en total?",
    a4_prac_ok: "¡Excelente! Ciento diez más ciento cincuenta es doscientos sesenta pesos.",
    a4_prac_err: "Ese no es el total. Sumá ciento diez más ciento cincuenta.",
    
    cierre: "¡Muy bien! Aprendimos sobre la higiene personal, a comprar y a calcular totales y vueltos. ¡Hasta la próxima!"
  },
  pantallas: [
    { tipo: "portada" },
    { 
      tipo: "opcionMultiple", audioInstr: "a1_instr", mostrarAfiche: "A", audioAfiche: "a1_zoom",
      items: [
        { pregunta: "¿Qué producto cuesta $90?", audioPregunta: "afa_q1", opciones: ["alcohol","dentífrico","agua","peine","enjuague","talco"], correcta: "alcohol", audioOk: "afa_1_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $80?", audioPregunta: "afa_q2", opciones: ["alcohol","dentífrico","agua","peine","enjuague","talco"], correcta: "dentífrico", audioOk: "afa_2_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $70?", audioPregunta: "afa_q3", opciones: ["alcohol","dentífrico","agua","peine","enjuague","talco"], correcta: "agua", audioOk: "afa_3_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $50?", audioPregunta: "afa_q4", opciones: ["alcohol","dentífrico","agua","peine","enjuague","talco"], correcta: "peine", audioOk: "afa_4_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $140?", audioPregunta: "afa_q5", opciones: ["alcohol","dentífrico","agua","peine","enjuague","talco"], correcta: "enjuague", audioOk: "afa_5_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $100?", audioPregunta: "afa_q6", opciones: ["alcohol","dentífrico","agua","peine","enjuague","talco"], correcta: "talco", audioOk: "afa_6_ok", audioErr: "af_err" }
      ]
    },
    { 
      tipo: "opcionMultiple", audioInstr: "a1_instr", mostrarAfiche: "B", audioAfiche: "a1_zoom",
      items: [
        { pregunta: "¿Qué producto cuesta $120?", audioPregunta: "afb_q1", opciones: ["champú","jabón","toalla","perfume","crema","desodorante"], correcta: "champú", audioOk: "afb_1_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $110?", audioPregunta: "afb_q2", opciones: ["champú","jabón","toalla","perfume","crema","desodorante"], correcta: "jabón", audioOk: "afb_2_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $150?", audioPregunta: "afb_q3", opciones: ["champú","jabón","toalla","perfume","crema","desodorante"], correcta: "toalla", audioOk: "afb_3_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $190?", audioPregunta: "afb_q4", opciones: ["champú","jabón","toalla","perfume","crema","desodorante"], correcta: "perfume", audioOk: "afb_4_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $160?", audioPregunta: "afb_q5", opciones: ["champú","jabón","toalla","perfume","crema","desodorante"], correcta: "crema", audioOk: "afb_5_ok", audioErr: "af_err" },
        { pregunta: "¿Qué producto cuesta $130?", audioPregunta: "afb_q6", opciones: ["champú","jabón","toalla","perfume","crema","desodorante"], correcta: "desodorante", audioOk: "afb_6_ok", audioErr: "af_err" }
      ]
    },
    { 
      tipo: "escribirPalabra", audioInstr: "a5_instr", mostrarAfiche: "B", audioAfiche: "a1_zoom",
      items: [
        { palabra: "champú", textoPregunta: "¿Qué producto cuesta $120?", audioPregunta: "afb_q1", audioOk: "a5_1_ok", audioErr: "a5_err" },
        { palabra: "jabón", textoPregunta: "¿Qué producto cuesta $110?", audioPregunta: "afb_q2", audioOk: "a5_2_ok", audioErr: "a5_err" },
        { palabra: "toalla", textoPregunta: "¿Qué producto cuesta $150?", audioPregunta: "afb_q3", audioOk: "a5_3_ok", audioErr: "a5_err" },
        { palabra: "perfume", textoPregunta: "¿Qué producto cuesta $190?", audioPregunta: "afb_q4", audioOk: "a5_4_ok", audioErr: "a5_err" }
      ]
    },
    { tipo: "sopaDeLetras", audioInstr: "a6_instr", audioAfiche: "a1_zoom", mostrarAfiche: "B", palabras: ["champú", "jabón", "toalla", "perfume", "crema", "desodorante"], audiosOk: ["a6_1", "a6_2", "a6_3", "a6_4", "a6_5", "a6_6"] },
    { 
      tipo: "ordenar", audioInstr: "a2_instr", 
      items: [
        { imagen: "img/act2_or1.jpg", palabras: ["el","jabón","limpia","las","manos"], oracionAudio: "a2_or1" },
        { imagen: "img/act2_or2.jpg", palabras: ["mi","toalla","está","limpia"], oracionAudio: "a2_or2" },
        { imagen: "img/act2_or3.jpg", palabras: ["el","perfume","huele","rico"], oracionAudio: "a2_or3" },
        { imagen: "img/act2_or4.jpg", palabras: ["nosotros","nos","ayudamos","en","la","escuela"], oracionAudio: "a2_or4" }
      ]
    },
    { 
      tipo: "cuentaVertical", audioInstr: "a3_instr", audioElegirCuenta: "a3_elegir_cuenta", audioElegirResultado: "a3_elegir_res", 
      items: [
        { contexto: "Ana quiere comprar un champú ($120) y un jabón ($110). ¿Cuánto gastará en total?", audioPregunta: "a3_p1_q", 
          cuenta1: {a:120, op:"+", b:110}, cuenta2: {a:120, op:"-", b:110}, correcta: 0, 
          resultado: 230, opcionesResultado: ["$220","$230","$240"], 
          audioCuentaOk: "a3_p1_c_ok", audioCuentaErr: "a3_c_err", 
          audioResultadoOk: "a3_p1_r_ok", audioResultadoErr: "a3_r_err" },
        { contexto: "Pedro compra una toalla ($150) y paga con $200. ¿Cuánto le darán de vuelto?", audioPregunta: "a3_p2_q", 
          cuenta1: {a:150, op:"+", b:200}, cuenta2: {a:200, op:"-", b:150}, correcta: 1, 
          resultado: 50, opcionesResultado: ["$50","$100","$150"], 
          audioCuentaOk: "a3_p2_c_ok", audioCuentaErr: "a3_c_err", 
          audioResultadoOk: "a3_p2_r_ok", audioResultadoErr: "a3_r_err" },
        { contexto: "Vos tenés $300 y regalás un perfume ($190). ¿Cuánto te quedará?", audioPregunta: "a3_p3_q", 
          cuenta1: {a:300, op:"+", b:190}, cuenta2: {a:300, op:"-", b:190}, correcta: 1, 
          resultado: 110, opcionesResultado: ["$110","$120","$130"], 
          audioCuentaOk: "a3_p3_c_ok", audioCuentaErr: "a3_c_err", 
          audioResultadoOk: "a3_p3_r_ok", audioResultadoErr: "a3_r_err" }
      ]
    },
    { 
      tipo: "narracionAnimada", 
      pasos: [
        { audio: "a4_1", html: '<div class="n-billetes"><div class="n-billete">$100</div><div class="n-billete">$50</div><div class="n-billete">$20</div><div class="n-billete">$10</div></div>' },
        { audio: "a4_2", html: '<div class="n-suma">champú $120 &nbsp;+&nbsp; jabón $110 &nbsp;=&nbsp; <b>$230</b></div>' },
        { audio: "a4_3", html: '<div class="n-vuelto">pagás $200 &nbsp;−&nbsp; gastás $150 &nbsp;=&nbsp; vuelto <b>$50</b></div>' }
      ]
    },
    {
      tipo: "opcionMultiple", audioInstr: "a4_instr_prac", mostrarAfiche: "B", audioAfiche: "a1_zoom",
      items: [
        { pregunta: "Si comprás un jabón ($110) y una toalla ($150), ¿cuánto gastás en total?",
          opciones: ["$240","$260","$280"], correcta: "$260", audioOk: "a4_prac_ok", audioErr: "a4_prac_err" }
      ]
    },
    { tipo: "cierre" }
  ]
};