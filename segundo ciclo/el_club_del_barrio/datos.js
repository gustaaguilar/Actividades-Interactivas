// =====================================================================
// EL CLUB DEL BARRIO - Matemática 7mo grado
// Basado en "Aventureros de la Matemática" (Gobierno de Mendoza, DGE)
// datos.js - Contenido de todas las pantallas
// =====================================================================

const DATOS = {
  titulo: "El club del barrio",
  subtitulo: "Matemática · 7mo grado",

  pantallas: [

    // ---------- 1. PORTADA ----------
    {
      tipo: "portada",
      titulo: "El club del barrio",
      subtitulo: "Un recorrido matemático por el club de tu barrio",
      imagen: "assets/images/portada.jpg",
      audio: "assets/audio/p01_portada.mp3"
    },

    // ---------- 2. INTRO: EL CLUB DEL BARRIO ----------
    {
      tipo: "narracion",
      titulo: "El club del barrio",
      imagen: "assets/images/p02_club_social_deportivo.jpg",
      texto: "En muchos barrios, el club es mucho más que un lugar para practicar deportes: es un espacio de encuentro, amistad, participación y celebración. Allí se realizan campeonatos de fútbol, recitales, ferias y actividades sociales que reúnen a familias, vecinos y amigos.<br><br>La Comisión Directiva de un club quiere incorporar nuevos socios y necesita tu ayuda para tomar decisiones usando la matemática.",
      audio: "assets/audio/p02_intro.mp3"
    },

    // ---------- 3. LA ENCUESTA DE DEPORTES ----------
    {
      tipo: "narracion",
      titulo: "Planificando nuevas actividades",
      imagen: "assets/images/p03_tabla_deportes.jpg",
      imagenClase: "imagen-grande",
      texto: "Para organizar instalaciones y profesores, el club encuestó a 2.000 alumnos de séptimo grado sobre su deporte preferido:<br><br><strong>Fútbol: 40% · Vóley: 20% · Básquet: 25% · Handball: 10% · Yudo: 5%</strong>",
      audio: "assets/audio/p03_encuesta.mp3"
    },

    // ---------- 4. INTERPRETAR EL GRÁFICO CIRCULAR ----------
    {
      tipo: "multiple",
      titulo: "Leemos el gráfico circular",
      instruccion: "Usá los porcentajes de la encuesta para responder.",
      audioInstruccion: "assets/audio/p04_instruccion.mp3",
      preguntas: [
        {
          pregunta: "¿Qué deporte prefieren más los alumnos encuestados?",
          audioPregunta: "assets/audio/p04_p1.mp3",
          imagen: "assets/images/p03_tabla_deportes.jpg",
          imagenClase: "imagen-grande",
          opciones: ["Fútbol", "Vóley", "Básquet", "Yudo"],
          correcta: 0,
          audioCorrecta: "assets/audio/p04_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! El fútbol es el preferido, con el 40% de las preferencias."
        },
        {
          pregunta: "¿Cuántos alumnos representan el 25% de los 2.000 encuestados (los que eligieron básquet)?",
          audioPregunta: "assets/audio/p04_p2.mp3",
          opciones: ["500", "400", "600", "300"],
          correcta: 0,
          audioCorrecta: "assets/audio/p04_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Si 1.000 alumnos son el 50%, entonces 500 alumnos son el 25%."
        },
        {
          pregunta: "¿Qué combinación de deportes representa el 50% de las preferencias?",
          audioPregunta: "assets/audio/p04_p3.mp3",
          imagen: "assets/images/p04_deportes_sin_porcentaje.jpg",
          imagenClase: "imagen-grande",
          opciones: ["Fútbol y Handball", "Vóley y Básquet", "Fútbol y Yudo", "Básquet y Handball"],
          correcta: 0,
          audioCorrecta: "assets/audio/p04_p3_correcta.mp3",
          textoCorrecta: "¡Correcto! Fútbol (40%) más Handball (10%) suman exactamente 50%."
        }
      ]
    },

    // ---------- 5. GRUPOS Y PROFESORES DE YUDO (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "¿Cuántos profesores de yudo hacen falta?",
      escenaHtml:
        '<div class="escena-formula"><div class="formula-caja" id="ny-porcentaje">5% de 2.000 = 100 alumnos</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="ny-grupos">100 ÷ 10 = 10 grupos</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="ny-turnos">10 ÷ 3 = 3 turnos, sobra 1</div></div>' +
        '<div class="escena-formula"><div class="formula-caja formula-titilando" id="ny-final">Se necesitan 4 profesores</div></div>',
      textoCompleto: "El 5% de los 2.000 encuestados eligió yudo: son 100 alumnos. Si el profesor arma grupos de hasta 10 socios, se necesitan 10 grupos. Y si cada profesor puede cubrir solamente 3 turnos, 10 dividido 3 da 3 turnos y sobra 1 grupo, así que el club necesita contratar 4 profesores.",
      pasos: [
        { audio: "assets/audio/p05_paso1.mp3", texto: "5% de 2.000", targetId: "ny-porcentaje" },
        { audio: "assets/audio/p05_paso2.mp3", texto: "100 alumnos en grupos de 10", targetId: "ny-grupos" },
        { audio: "assets/audio/p05_paso3.mp3", texto: "10 grupos entre 3 turnos", targetId: "ny-turnos" },
        { audio: "assets/audio/p05_paso4.mp3", texto: "El resto también necesita profesor", targetId: "ny-final" }
      ]
    },

    // ---------- 6. ASOCIAR PORCENTAJE CON FRACCIÓN ----------
    {
      tipo: "asociar",
      titulo: "De porcentaje a fracción",
      instruccion: "Uní cada porcentaje de la encuesta con su fracción equivalente.",
      audioInstruccion: "assets/audio/p06_instruccion.mp3",
      pares: [
        { izquierda: "40%", derecha: "2/5", audio: "assets/audio/p06_par1.mp3" },
        { izquierda: "20%", derecha: "1/5", audio: "assets/audio/p06_par2.mp3" },
        { izquierda: "25%", derecha: "1/4", audio: "assets/audio/p06_par3.mp3" },
        { izquierda: "10%", derecha: "1/10", audio: "assets/audio/p06_par4.mp3" },
        { izquierda: "5%", derecha: "1/20", audio: "assets/audio/p06_par5.mp3" }
      ]
    },

    // ---------- 7. LA RIFA DEL CLUB ----------
    {
      tipo: "multiple",
      titulo: "La rifa del club",
      instruccion: "El club vende una rifa de 1.500 números para afrontar los gastos: 2/5 de lo recaudado va al campeonato y 25% a material deportivo. El resto es para los vestuarios.",
      audioInstruccion: "assets/audio/p07_instruccion.mp3",
      imagen: "assets/images/p07_rifa_gestion.jpg",
      preguntas: [
        {
          pregunta: "¿Qué fracción de la recaudación quedará para los vestuarios?",
          audioPregunta: "assets/audio/p07_p1.mp3",
          opciones: ["7/20", "1/2", "3/10", "1/3"],
          correcta: 0,
          audioCorrecta: "assets/audio/p07_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! 2/5 (40%) más 25% son 65%; el resto, 35%, equivale a 7/20."
        },
        {
          pregunta: "Si se venden 800 de los 1.500 números, ¿cuántos de esos números corresponden a material deportivo (25%)?",
          audioPregunta: "assets/audio/p07_p2.mp3",
          opciones: ["200", "150", "100", "250"],
          correcta: 0,
          audioCorrecta: "assets/audio/p07_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! El 25% de 800 es 200: por cada 100 números vendidos, 25 van a material deportivo."
        }
      ]
    },

    // ---------- 8. LA CANTINA: LISTA DE PRECIOS (asociar) ----------
    {
      tipo: "asociar",
      titulo: "La cantina del club",
      instruccion: "La cantina cobra un pequeño recargo por pagar con billetera virtual. Mirá la lista de precios y uní cada producto con la diferencia entre el pago contado y el pago con billetera virtual.",
      audioInstruccion: "assets/audio/p08b_instruccion.mp3",
      imagen: "assets/images/p08_cantina_tabla.jpg",
      imagenClase: "imagen-grande",
      pares: [
        { izquierda: "Pancho", derecha: "$200,75", audio: "assets/audio/p08b_par1.mp3" },
        { izquierda: "Vaso de gaseosa", derecha: "$170,50", audio: "assets/audio/p08b_par2.mp3" },
        { izquierda: "Porción de pizza", derecha: "$205,60", audio: "assets/audio/p08b_par3.mp3" }
      ]
    },

    // ---------- 9. COMPARAMOS LOS PRECIOS ----------
    {
      tipo: "multiple",
      titulo: "Comparamos los precios",
      instruccion: "Con la lista de precios de la pantalla anterior, respondé:",
      audioInstruccion: "assets/audio/p08_instruccion.mp3",
      imagen: "assets/images/p08_cantina.jpg",
      imagenClase: "imagen-grande",
      opcionesEnFila: true,
      preguntas: [
        {
          pregunta: "¿Qué producto presenta la mayor diferencia de precio?",
          audioPregunta: "assets/audio/p08_p1.mp3",
          opciones: ["Porciones de pizza", "Panchos", "Vasos de gaseosa"],
          correcta: 0,
          audioCorrecta: "assets/audio/p08_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! La pizza tiene la mayor diferencia: $205,60."
        },
        {
          pregunta: "¿Y cuál presenta la menor diferencia?",
          audioPregunta: "assets/audio/p08_p2.mp3",
          opciones: ["Vasos de gaseosa", "Panchos", "Porciones de pizza"],
          correcta: 0,
          audioCorrecta: "assets/audio/p08_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! La gaseosa tiene la menor diferencia: $170,50."
        }
      ]
    },

    // ---------- 9. UNA ESTRATEGIA PARA MULTIPLICAR (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "Una estrategia para multiplicar por 18",
      escenaHtml:
        '<img class="imagen-escena-animada" src="assets/images/p09_calculo_18.jpg" alt="Empleada de la cantina explicando el cálculo">' +
        '<div class="escena-formula"><div class="formula-caja" id="nd-calculo">1.450 × 18</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="nd-descomp">18 = 20 − 2</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="nd-parte1">1.450 × 20 = 29.000</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="nd-parte2">1.450 × 2 = 2.900</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="nd-resultado">29.000 − 2.900 = 26.100</div></div>',
      textoCompleto: "Para calcular cuánto se recauda por 18 vasos de gaseosa a $1.450 cada uno, se puede pensar el 18 como 20 menos 2. Así, la cuenta se resuelve multiplicando por 20 (un cálculo mental sencillo) y restando dos veces el precio. Este procedimiento usa la propiedad distributiva de la multiplicación respecto de la resta.",
      pasos: [
        { audio: "assets/audio/p09_paso1.mp3", texto: "", targetId: "nd-calculo" },
        { audio: "assets/audio/p09_paso2.mp3", texto: "Pensamos el 18 como 20 − 2", targetId: "nd-descomp" },
        { audio: "assets/audio/p09_paso3.mp3", texto: "Multiplicamos por 20", targetId: "nd-parte1" },
        { audio: "assets/audio/p09_paso4.mp3", texto: "Multiplicamos por 2", targetId: "nd-parte2" },
        { audio: "assets/audio/p09_paso5.mp3", texto: "Restamos los resultados", targetId: "nd-resultado" }
      ]
    },

    // ---------- 10. VASOS DE GASEOSA: PROPORCIONALIDAD DIRECTA ----------
    {
      tipo: "multiple",
      titulo: "Los vasos de gaseosa",
      instruccion: "Cada vaso de gaseosa que se vende en la cantina es de 250 ml.",
      audioInstruccion: "assets/audio/p10_instruccion.mp3",
      imagen: "assets/images/p10_vasos_gaseosa.jpg",
      imagenClase: "imagen-grande",
      opcionesEnFila: true,
      preguntas: [
        {
          pregunta: "¿Cuántos litros de gaseosa se necesitan para llenar 6 vasos?",
          audioPregunta: "assets/audio/p10_p1.mp3",
          opciones: ["1,5 litros", "1 litro", "2 litros", "0,75 litros"],
          correcta: 0,
          audioCorrecta: "assets/audio/p10_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! 6 vasos de 0,25 litros cada uno son 1,5 litros."
        },
        {
          pregunta: "¿Cuál es la constante de proporcionalidad de esta relación (litros por cada vaso)?",
          audioPregunta: "assets/audio/p10_p2.mp3",
          opciones: ["0,25", "0,5", "4", "2"],
          correcta: 0,
          audioCorrecta: "assets/audio/p10_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Cada vaso equivale a 0,25 litros; esa es la constante."
        }
      ]
    },

    // ---------- 11. LAS FÓRMULAS DE VICTORIA Y CANDELA (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "Dos fórmulas, una misma relación",
      escenaHtml:
        '<img class="imagen-escena-animada" src="assets/images/p11_dos_formulas.jpg" alt="Victoria y Candela con sus fórmulas">' +
        '<div class="escena-formula">' +
        '<div class="formula-caja" id="fvc-victoria">Victoria: L = 0,25 × v</div>' +
        '<div class="formula-caja" id="fvc-candela">Candela: L = <span class="fraccion-real"><span class="fr-num">1</span><span class="fr-den">4</span></span> × v</div>' +
        '</div>' +
        '<div class="escena-formula"><div class="formula-caja" id="fvc-ejemplo">Para v = 50 vasos...</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="fvc-resultado">Ambas dan L = 12,5 litros</div></div>',
      textoCompleto: "Victoria y Candela escribieron dos fórmulas distintas para calcular los litros de gaseosa (L) según la cantidad de vasos (v). Aunque se ven diferentes, 0,25 y un cuarto representan el mismo número. Si reemplazamos v por 50, las dos fórmulas dan exactamente el mismo resultado: 12,5 litros. Por eso ambas expresan la misma relación de proporcionalidad directa.",
      pasos: [
        { audio: "assets/audio/p11_paso1.mp3", texto: "Fórmula de Victoria", targetId: "fvc-victoria" },
        { audio: "assets/audio/p11_paso2.mp3", texto: "Fórmula de Candela", targetId: "fvc-candela" },
        { audio: "assets/audio/p11_paso3.mp3", texto: "Probamos con 50 vasos", targetId: "fvc-ejemplo" },
        { audio: "assets/audio/p11_paso4.mp3", texto: "¡El mismo resultado!", targetId: "fvc-resultado" }
      ]
    },

    // ---------- 12. EL GRÁFICO CARTESIANO ----------
    {
      tipo: "multiple",
      titulo: "Pensamos el gráfico",
      instruccion: "Cuando representamos la cantidad de vasos y los litros de gaseosa en un gráfico cartesiano, los puntos quedan alineados y se pueden unir con una línea.",
      audioInstruccion: "assets/audio/p12_instruccion.mp3",
      imagen: "assets/images/p12_grafico_cartesiano.jpg",
      imagenClase: "imagen-mediana imagen-dibujando",
      preguntas: [
        {
          pregunta: "¿Por qué los puntos del gráfico se unen con una línea?",
          audioPregunta: "assets/audio/p12_p1.mp3",
          opciones: [
            "Porque hay una relación entre las variables",
            "Porque hay un error en los datos",
            "Porque la cantidad de vasos es discreta: no existen medios vasos"
          ],
          correcta: 0,
          audioCorrecta: "assets/audio/p12_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Como hay una relación de proporcionalidad directa entre los vasos y los litros, los puntos se pueden unir con una línea."
        },
        {
          pregunta: "¿Qué representa el punto (0, 0) en esta relación?",
          audioPregunta: "assets/audio/p12_p2.mp3",
          opciones: [
            "Que si no se usan vasos, no se necesita gaseosa",
            "Que faltan datos en la tabla",
            "El precio de la gaseosa"
          ],
          correcta: 0,
          audioCorrecta: "assets/audio/p12_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! En toda proporcionalidad directa, el punto (0,0) siempre pertenece a la relación."
        }
      ]
    },

    // ---------- 13. INTRO: EL CAMPEONATO DE FÚTBOL ----------
    {
      tipo: "narracion",
      titulo: "El campeonato de fútbol",
      imagen: "assets/images/p13_campeonato.jpg",
      texto: "Teniendo en cuenta que la mayoría de los encuestados indicó al fútbol como deporte preferido, el club decidió organizar un campeonato.<br><br>Participan 8 equipos de diferentes escuelas. En la primera fase, los equipos jugarán todos contra todos.",
      audio: "assets/audio/p13_intro.mp3"
    },

    // ---------- 14. ¿CUÁNTOS PARTIDOS SE JUEGAN? (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "¿Cuántos partidos se juegan?",
      escenaHtml:
        '<img class="imagen-escena-animada" src="assets/images/p14_cuantos_partidos.jpg" alt="Victoria y Candela discutiendo el cálculo de los partidos">' +
        '<div class="escena-formula"><div class="formula-caja" id="cf-calculo">7 × 8 = 56</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="cf-doble">Cada partido se contó 2 veces</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="cf-final">56 ÷ 2 = 28 partidos</div></div>',
      textoCompleto: "Victoria y Candela pensaron que cada uno de los 8 equipos juega contra los otros 7, y calcularon 7 × 8 = 56. Pero ese cálculo cuenta cada partido dos veces: el partido entre el Equipo 1 y el Equipo 2 se contó una vez como '1 juega con 2' y otra vez como '2 juega con 1'. Por eso, la cantidad real de encuentros es la mitad: 28 partidos.",
      pasos: [
        { audio: "assets/audio/p14_paso1.mp3", texto: "Cada equipo juega con los otros 7", targetId: "cf-calculo" },
        { audio: "assets/audio/p14_paso2.mp3", texto: "¡Pero cada partido se repite!", targetId: "cf-doble" },
        { audio: "assets/audio/p14_paso3.mp3", texto: "Dividimos por 2", targetId: "cf-final" }
      ]
    },

    // ---------- 15. VERIFICAMOS LOS PARTIDOS ----------
    {
      tipo: "multiple",
      titulo: "Verificamos",
      preguntas: [
        {
          pregunta: "¿Cuántos partidos se jugarán en la primera fase del campeonato?",
          audioPregunta: "assets/audio/p15_p1.mp3",
          opciones: ["28", "56", "64", "32"],
          correcta: 0,
          audioCorrecta: "assets/audio/p15_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Se juegan 28 partidos en la primera fase."
        },
        {
          pregunta: "¿Por qué el cálculo 7 × 8 no da directamente la cantidad real de partidos?",
          audioPregunta: "assets/audio/p15_p2.mp3",
          opciones: [
            "Porque cuenta cada partido dos veces",
            "Porque faltan equipos por contar",
            "Porque hay partidos que terminan empatados"
          ],
          correcta: 0,
          audioCorrecta: "assets/audio/p15_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Por eso hay que dividir el resultado por 2."
        }
      ]
    },

    // ---------- 16. LOS LOGOS EN LA HOJA A4 ----------
    {
      tipo: "multiple",
      titulo: "Diseñamos los logos de la camiseta",
      instruccion: "Victoria y Candela quieren imprimir logos de 8,75 cm de ancho por 12,5 cm de largo en hojas A4 (21 cm × 29,7 cm), sin superponerlos.",
      audioInstruccion: "assets/audio/p16_instruccion.mp3",
      imagen: "assets/images/p16_logo_dimensiones.jpg",
      imagenClase: "imagen-grande",
      preguntas: [
        {
          pregunta: "Si la hoja se orienta en forma vertical, ¿cuántos logos completos entran?",
          audioPregunta: "assets/audio/p16_p1.mp3",
          opciones: ["4", "2", "3", "6"],
          correcta: 0,
          audioCorrecta: "assets/audio/p16_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! Entran 2 a lo ancho y 2 a lo largo: 4 logos en total."
        },
        {
          pregunta: "¿Y si la hoja se orienta en forma horizontal?",
          audioPregunta: "assets/audio/p16_p2.mp3",
          opciones: ["3", "2", "4", "6"],
          correcta: 0,
          audioCorrecta: "assets/audio/p16_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! En horizontal entran 3 logos en una sola fila."
        },
        {
          pregunta: "¿Qué orientación conviene elegir para aprovechar mejor la hoja?",
          audioPregunta: "assets/audio/p16_p3.mp3",
          opciones: ["Vertical", "Horizontal", "Da lo mismo"],
          correcta: 0,
          audioCorrecta: "assets/audio/p16_p3_correcta.mp3",
          textoCorrecta: "¡Correcto! La orientación vertical permite ubicar más logos completos."
        }
      ]
    },

    // ---------- 17. NÚMERO, NOMBRE Y VINILO ----------
    {
      tipo: "multiple",
      titulo: "El número en la camiseta",
      instruccion: "En la espalda hay 30 cm disponibles. El número mide 18,5 cm, el nombre 5,75 cm, y entre ambos se deja una separación de 3,5 cm.",
      audioInstruccion: "assets/audio/p17_instruccion.mp3",
      imagen: "assets/images/p17_camisetas_numeros.jpg",
      imagenClase: "imagen-grande",
      opcionesEnFila: true,
      preguntas: [
        {
          pregunta: "¿Cuánto espacio sobra en la espalda de la camiseta?",
          audioPregunta: "assets/audio/p17_p1.mp3",
          opciones: ["2,25 cm", "1,25 cm", "3,25 cm", "0,25 cm"],
          correcta: 0,
          audioCorrecta: "assets/audio/p17_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! 18,5 + 3,5 + 5,75 = 27,75 cm; sobran 2,25 cm de los 30 cm disponibles."
        },
        {
          pregunta: "Cada cifra del número necesita 0,30 m de vinilo. Si entre las 4 camisetas hay 7 cifras en total, ¿cuántos metros de vinilo se necesitan?",
          audioPregunta: "assets/audio/p17_p2.mp3",
          opciones: ["2,10 m", "1,40 m", "2,80 m", "0,70 m"],
          correcta: 0,
          audioCorrecta: "assets/audio/p17_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! 7 cifras × 0,30 m = 2,10 m de vinilo."
        }
      ]
    },

    // ---------- 18. INTRO: ENTRENAMIENTO TÁCTICO ----------
    {
      tipo: "narracion",
      titulo: "Entrenamiento táctico",
      imagen: "assets/images/p18_arco_futbol.jpg",
      texto: "El equipo se entrena tanto en lo físico como en lo táctico, practicando cada movimiento con precisión.<br><br>En la cancha, el ángulo formado entre el punto penal y los postes del arco es de 38°: es el mayor espacio de tiro para el pateador. A medida que la pelota se desplaza hacia los costados, ese ángulo disminuye, y el remate se hace más difícil.",
      audio: "assets/audio/p18_intro.mp3"
    },

    // ---------- 19. GRADOS, MINUTOS Y SEGUNDOS (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "De grados decimales a minutos",
      escenaHtml:
        '<div class="escena-formula"><div class="formula-caja" id="gms-angulo">37,75°</div></div>' +
        '<div class="escena-formula">' +
        '<div class="formula-caja" id="gms-entero">37°</div>' +
        '<div class="formula-caja" id="gms-decimal">0,75°</div>' +
        '</div>' +
        '<div class="escena-formula"><div class="formula-caja" id="gms-conversion">0,75 × 60 = 45 minutos</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="gms-final">37,75° = 37° 45\'</div></div>',
      textoCompleto: "Un ángulo como 37,75° tiene una parte entera de grados y una parte decimal. Un grado equivale a 60 minutos, así que para saber a cuántos minutos corresponde 0,75°, multiplicamos 0,75 por 60 y obtenemos 45. Por eso, 37,75° es lo mismo que 37 grados y 45 minutos.",
      pasos: [
        { audio: "assets/audio/p19_paso1.mp3", texto: "", targetId: "gms-angulo" },
        { audio: "assets/audio/p19_paso2.mp3", texto: "Parte entera: los grados", targetId: "gms-entero" },
        { audio: "assets/audio/p19_paso3.mp3", texto: "Parte decimal", targetId: "gms-decimal" },
        { audio: "assets/audio/p19_paso4.mp3", texto: "La convertimos en minutos", targetId: "gms-conversion" },
        { audio: "assets/audio/p19_paso5.mp3", texto: "Resultado final", targetId: "gms-final" }
      ]
    },

    // ---------- 20. COMPARAMOS ÁNGULOS DE TIRO ----------
    {
      tipo: "multiple",
      titulo: "Ángulos de tiro al arco",
      instruccion: "El ángulo máximo de tiro es 38°. Dos jugadores patearon con estos ángulos: Jugador A: 36,25° · Jugador B: 37,75°.",
      audioInstruccion: "assets/audio/p20_instruccion.mp3",
      imagen: "assets/images/p20_angulo_diagrama.jpg",
      imagenClase: "imagen-grande",
      opcionesEnFila: true,
      preguntas: [
        {
          pregunta: "¿Cuánto menos mide el ángulo del Jugador A respecto de los 38°?",
          audioPregunta: "assets/audio/p20_p1.mp3",
          opciones: ["1° 45'", "1° 30'", "2°", "0° 45'"],
          correcta: 0,
          audioCorrecta: "assets/audio/p20_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! 38° − 36,25° = 1,75°, que equivale a 1° 45'."
        },
        {
          pregunta: "¿Y cuánto menos mide el ángulo del Jugador B?",
          audioPregunta: "assets/audio/p20_p2.mp3",
          opciones: ["0° 15'", "0° 30'", "1°", "0° 45'"],
          correcta: 0,
          audioCorrecta: "assets/audio/p20_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! 38° − 37,75° = 0,25°, que equivale a 0° 15'."
        },
        {
          pregunta: "Si en un penal la pelota forma un ángulo de 42° con el arco, ¿es válida esa jugada?",
          audioPregunta: "assets/audio/p20_p3.mp3",
          opciones: [
            "No, porque el ángulo máximo posible desde el punto penal es 38°",
            "Sí, porque cuanto más grande el ángulo, mejor"
          ],
          correcta: 0,
          audioCorrecta: "assets/audio/p20_p3_correcta.mp3",
          textoCorrecta: "¡Correcto! Un ángulo mayor a 38° significaría que la pelota está más cerca del arco que el punto penal."
        }
      ]
    },

    // ---------- 21. LA DESIGUALDAD TRIANGULAR (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "¿Se puede formar ese triángulo?",
      escenaHtml:
        '<img class="imagen-escena-animada" src="assets/images/p21_dt_pizarron.jpg" alt="Entrenador mirando el pizarrón táctico">' +
        '<div class="diagrama-svg-wrap"><svg viewBox="0 0 300 160" class="diagrama-svg">' +
        '<line x1="40" y1="130" x2="140" y2="30" class="lado-triangulo" id="dt-lado-a-linea"></line>' +
        '<line x1="140" y1="30" x2="260" y2="120" class="lado-triangulo" id="dt-lado-b-linea"></line>' +
        '<line x1="40" y1="130" x2="260" y2="120" class="lado-triangulo-invalido" id="dt-lado-c-linea"></line>' +
        '<text x="70" y="90" class="etiqueta-svg" id="dt-lado-a">4 m</text>' +
        '<text x="200" y="65" class="etiqueta-svg" id="dt-lado-b">7 m</text>' +
        '<text x="140" y="145" class="etiqueta-svg-valor" id="dt-lado-c">12 m</text>' +
        '</svg></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="dt-suma">4 + 7 = 11</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="dt-comparacion">11 es menor que 12</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="dt-conclusion">No se puede formar el triángulo</div></div>',
      textoCompleto: "Tres jugadores quieren ubicarse a 4 m, 7 m y 12 m entre sí para practicar pases. Para que tres distancias formen un triángulo, la suma de dos lados cualesquiera debe superar al tercero. Acá, 4 + 7 = 11, y 11 es menor que 12: los dos primeros jugadores nunca llegarían a cubrir esa distancia. Por eso, esa jugada no es posible.",
      pasos: [
        { audio: "assets/audio/p21_paso1.mp3", texto: "Tres distancias entre jugadores", targetId: "dt-lado-c" },
        { audio: "assets/audio/p21_paso2.mp3", texto: "Sumamos los dos lados más cortos", targetId: "dt-suma" },
        { audio: "assets/audio/p21_paso3.mp3", texto: "Comparamos con el tercer lado", targetId: "dt-comparacion" },
        { audio: "assets/audio/p21_paso4.mp3", texto: "La jugada no es posible", targetId: "dt-conclusion" }
      ]
    },

    // ---------- 22. APLICAMOS LA DESIGUALDAD TRIANGULAR ----------
    {
      tipo: "multiple",
      titulo: "¿Forman un triángulo?",
      preguntas: [
        {
          pregunta: "¿Cuál de estas ternas de distancias SÍ puede formar un triángulo entre tres jugadores?",
          audioPregunta: "assets/audio/p22_p1.mp3",
          opciones: ["5 m, 6 m y 8 m", "3 m, 4 m y 9 m", "2 m, 3 m y 6 m"],
          correcta: 0,
          audioCorrecta: "assets/audio/p22_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! 5 + 6 = 11, que es mayor que 8: esa terna sí forma un triángulo."
        },
        {
          pregunta: "¿Qué condición general deben cumplir tres distancias para poder formar un triángulo?",
          audioPregunta: "assets/audio/p22_p2.mp3",
          opciones: [
            "Cada lado debe ser menor que la suma de los otros dos",
            "Los tres lados deben medir lo mismo",
            "La suma de los tres lados debe ser 180"
          ],
          correcta: 0,
          audioCorrecta: "assets/audio/p22_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Esa es la propiedad triangular."
        }
      ]
    },

    // ---------- 23. SUMA DE ÁNGULOS INTERIORES DEL TRIÁNGULO (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "Los tres ángulos de una jugada",
      escenaHtml:
        '<div class="diagrama-svg-wrap"><svg viewBox="0 0 300 180" class="diagrama-svg">' +
        '<polygon points="150,25 40,150 260,150" class="lado-triangulo"></polygon>' +
        '<circle cx="150" cy="25" r="4" class="punto-jugador"></circle>' +
        '<circle cx="40" cy="150" r="4" class="punto-jugador"></circle>' +
        '<circle cx="260" cy="150" r="4" class="punto-jugador"></circle>' +
        '<text x="140" y="15" class="etiqueta-svg">Jugador A</text>' +
        '<text x="5" y="170" class="etiqueta-svg">Jugador B</text>' +
        '<text x="225" y="170" class="etiqueta-svg">Jugador C</text>' +
        '<text x="150" y="55" class="etiqueta-svg-valor" id="sa-angulo-a">70°</text>' +
        '<text x="65" y="135" class="etiqueta-svg-valor" id="sa-angulo-b">60°</text>' +
        '<text x="225" y="135" class="etiqueta-svg-valor" id="sa-angulo-c">50°</text>' +
        '</svg></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="sa-suma">70° + 60° + 50° = 180°</div></div>',
      textoCompleto: "Cuando tres jugadores forman un triángulo con sus pases, los tres ángulos que se forman en cada vértice siempre suman lo mismo: 180°. No importa qué forma tenga el triángulo ni qué tan grandes o chicos sean los jugadores: la suma de sus ángulos interiores siempre da 180°. Esta es una propiedad que se cumple en todos los triángulos.",
      pasos: [
        { audio: "assets/audio/p23_paso1.mp3", texto: "Ángulo del Jugador A", targetId: "sa-angulo-a" },
        { audio: "assets/audio/p23_paso2.mp3", texto: "Ángulo del Jugador B", targetId: "sa-angulo-b" },
        { audio: "assets/audio/p23_paso3.mp3", texto: "Ángulo del Jugador C", targetId: "sa-angulo-c" },
        { audio: "assets/audio/p23_paso4.mp3", texto: "La suma siempre da 180°", targetId: "sa-suma" }
      ]
    },

    // ---------- 24. APLICAMOS LOS 180° ----------
    {
      tipo: "multiple",
      titulo: "Buscamos el tercer ángulo",
      preguntas: [
        {
          pregunta: "En una jugada, el triángulo formado por tres jugadores tiene ángulos de 70° y 65° en dos de sus vértices. ¿Cuánto mide el tercer ángulo?",
          audioPregunta: "assets/audio/p24_p1.mp3",
          opciones: ["45°", "55°", "35°", "65°"],
          correcta: 0,
          audioCorrecta: "assets/audio/p24_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! 180° − 70° − 65° = 45°."
        },
        {
          pregunta: "¿Por qué la suma de los ángulos interiores de cualquier triángulo entre jugadores siempre da 180°?",
          audioPregunta: "assets/audio/p24_p2.mp3",
          opciones: [
            "Porque es una propiedad general de todos los triángulos",
            "Porque depende de las distancias entre los jugadores",
            "Porque solamente se cumple en triángulos isósceles"
          ],
          correcta: 0,
          audioCorrecta: "assets/audio/p24_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! Es una propiedad que se cumple siempre, en cualquier triángulo."
        }
      ]
    },

    // ---------- 25. DEL TRIÁNGULO AL CUADRILÁTERO (narración animada) ----------
    {
      tipo: "narracionAnimada",
      titulo: "Cuatro jugadores, un cuadrilátero",
      escenaHtml:
        '<div class="diagrama-svg-wrap"><svg viewBox="0 0 300 180" class="diagrama-svg">' +
        '<polygon points="60,30 240,45 260,150 40,140" class="lado-triangulo" id="cu-cuadrilatero"></polygon>' +
        '<line x1="60" y1="30" x2="260" y2="150" class="lado-triangulo-invalido" id="cu-diagonal"></line>' +
        '<circle cx="60" cy="30" r="4" class="punto-jugador"></circle>' +
        '<circle cx="240" cy="45" r="4" class="punto-jugador"></circle>' +
        '<circle cx="260" cy="150" r="4" class="punto-jugador"></circle>' +
        '<circle cx="40" cy="140" r="4" class="punto-jugador"></circle>' +
        '</svg></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="cu-triangulos">Quedan 2 triángulos</div></div>' +
        '<div class="escena-formula"><div class="formula-caja" id="cu-suma">180° + 180° = 360°</div></div>',
      textoCompleto: "Cuatro jugadores ubicados en zona de contención forman un cuadrilátero. Si trazamos una diagonal entre dos jugadores opuestos, el cuadrilátero queda dividido en dos triángulos. Como cada triángulo suma 180° en sus ángulos interiores, y el cuadrilátero está formado por esos dos triángulos, la suma de los ángulos interiores de todo cuadrilátero es 360°.",
      pasos: [
        { audio: "assets/audio/p25_paso1.mp3", texto: "Cuatro jugadores, un cuadrilátero", targetId: "cu-cuadrilatero" },
        { audio: "assets/audio/p25_paso2.mp3", texto: "Trazamos una diagonal", targetId: "cu-diagonal" },
        { audio: "assets/audio/p25_paso3.mp3", texto: "Se forman dos triángulos", targetId: "cu-triangulos" },
        { audio: "assets/audio/p25_paso4.mp3", texto: "180° más 180°", targetId: "cu-suma" }
      ]
    },

    // ---------- 26. REPASO FINAL ----------
    {
      tipo: "multiple",
      titulo: "Repasamos lo aprendido",
      preguntas: [
        {
          pregunta: "La suma de las medidas de los ángulos interiores de un cuadrilátero es igual a:",
          audioPregunta: "assets/audio/p26_p1.mp3",
          opciones: ["360°", "90°", "160°", "180°"],
          correcta: 0,
          audioCorrecta: "assets/audio/p26_p1_correcta.mp3",
          textoCorrecta: "¡Correcto! En cualquier cuadrilátero, esa suma siempre es 360°."
        },
        {
          pregunta: "El arco de fútbol mide 7,32 m de ancho y el punto penal está alineado con su centro. ¿A qué distancia de cada poste está ese centro?",
          audioPregunta: "assets/audio/p26_p2.mp3",
          opciones: ["3,66 m", "7,32 m", "5,5 m", "11 m"],
          correcta: 0,
          audioCorrecta: "assets/audio/p26_p2_correcta.mp3",
          textoCorrecta: "¡Correcto! El centro está a la mitad del ancho del arco: 7,32 ÷ 2 = 3,66 m."
        },
        {
          pregunta: "¿Qué le pasa al ángulo de tiro cuando la pelota se acerca más al centro de la línea de gol?",
          audioPregunta: "assets/audio/p26_p3.mp3",
          opciones: ["Aumenta", "Disminuye", "Se mantiene igual"],
          correcta: 0,
          audioCorrecta: "assets/audio/p26_p3_correcta.mp3",
          textoCorrecta: "¡Correcto! Cuanto más cerca del centro, mayor es el ángulo de tiro."
        }
      ]
    },

    // ---------- 27. CIERRE ----------
    {
      tipo: "cierre",
      titulo: "¡Recorrido completado!",
      imagen: "assets/images/cierre.jpg",
      audio: "assets/audio/p27_cierre.mp3"
    }

  ]
};
