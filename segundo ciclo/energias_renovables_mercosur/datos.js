// ============================================================
// ENERGÍAS RENOVABLES EN EL MERCOSUR - 7mo grado
// datos.js - Contenido de todas las pantallas (v3 - ajustes de revisión)
// ============================================================

var DATOS = {

  titulo: "Energías Renovables en el MERCOSUR",
  subtitulo: "Un recorrido por la energía que mueve a nuestra región",
  nivel: "Primaria · 7mo grado",

  meta: {
    foto: "assets/images/profe.jpg",
    firma: "📸 Informática Educativa · Profe Gustavo Aguilar",
    audioCorrecto: "assets/audio/correcto.mp3",
    audioVerdadero: "assets/audio/verdadero.mp3",
    audioFalso: "assets/audio/falso.mp3"
  },

  pantallas: [

    // ---------- 1. PORTADA ----------
    {
      id: 1,
      tipo: "portada",
      imagen: "assets/images/portada.jpg",
      titulo: "Energías Renovables en el MERCOSUR",
      subtitulo: "Un recorrido por la energía que mueve a nuestra región"
    },

    // ---------- 2. ¿QUÉ ES LA ENERGÍA? ----------
    {
      id: 2,
      tipo: "narracion",
      titulo: "¿Qué es la energía?",
      imagen: "assets/images/portada.jpg",
      texto: "La energía es la capacidad de realizar un trabajo. Gracias a que el ser humano aprendió a transformarla, hoy podemos iluminar casas, viajar, cocinar y fabricar productos.<br><br>La electricidad es una forma de energía que se obtiene del movimiento de cargas eléctricas dentro de un material conductor.",
      audio: "assets/audio/p02_narracion_energia.mp3"
    },

    // ---------- 3. PREGUNTA: ¿QUÉ ES LA ELECTRICIDAD? ----------
    {
      id: 3,
      tipo: "multiple",
      titulo: "¿Qué es la electricidad?",
      imagen: "assets/images/paso1_central.jpg",
      preguntas: [
        {
          pregunta: "Elegí la opción correcta:",
          audioPregunta: "assets/audio/p03_pregunta.mp3",
          opciones: [
            "Una forma de energía que se obtiene del movimiento de cargas eléctricas dentro de un material conductor.",
            "Un tipo de combustible fósil que se extrae del subsuelo.",
            "Una fuente de energía que solo existe en las centrales nucleares."
          ],
          correcta: 0,
          audioOpciones: ["assets/audio/p03_o1.mp3", "assets/audio/p03_o2.mp3", "assets/audio/p03_o3.mp3"]
        }
      ]
    },

    // ---------- 4. FUENTES DE ELECTRICIDAD (CLASIFICAR UNO A LA VEZ) ----------
    {
      id: 4,
      tipo: "clasificarUno",
      titulo: "Fuentes de electricidad",
      consigna: "Mirá cada imagen y elegí si esa fuente genera electricidad o no.",
      audio: "assets/audio/p04_consigna.mp3",
      categorias: ["Genera electricidad", "No genera electricidad"],
      items: [
        { texto: "Plantas solares", categoria: "Genera electricidad", imagen: "assets/images/icono_solar.jpg", audioAcierto: "assets/audio/p04_i1.mp3" },
        { texto: "Plantas eólicas", categoria: "Genera electricidad", imagen: "assets/images/icono_eolica.jpg", audioAcierto: "assets/audio/p04_i2.mp3" },
        { texto: "Hidroeléctricas", categoria: "Genera electricidad", imagen: "assets/images/icono_hidro.jpg", audioAcierto: "assets/audio/p04_i3.mp3" },
        { texto: "Plantas térmicas", categoria: "Genera electricidad", imagen: "assets/images/icono_termica.jpg", audioAcierto: "assets/audio/p04_i4.mp3" },
        { texto: "Plantas nucleares", categoria: "Genera electricidad", imagen: "assets/images/icono_nuclear.jpg", audioAcierto: "assets/audio/p04_i5.mp3" },
        { texto: "Biomasa", categoria: "Genera electricidad", imagen: "assets/images/icono_biomasa.jpg", audioAcierto: "assets/audio/p04_i6.mp3" },
        { texto: "La luz de la luna", categoria: "No genera electricidad", imagen: "assets/images/icono_luna.jpg", audioAcierto: "assets/audio/p04_i7.mp3" },
        { texto: "Los arcoíris", categoria: "No genera electricidad", imagen: "assets/images/icono_arcoiris.jpg", audioAcierto: "assets/audio/p04_i8.mp3" }
      ]
    },

    // ---------- 5. RECORRIDO DE LA ELECTRICIDAD (INFOGRAFÍA CON RUTA) ----------
    {
      id: 5,
      tipo: "recorrido",
      titulo: "¿Cómo llega la electricidad a tu hogar?",
      consigna: "Tocá cada número para seguir el recorrido de la electricidad.",
      audio: "assets/audio/p05_recorrido_consigna.mp3",
      imagen: "assets/images/recorrido_electricidad.jpg",
      puntos: [
        { x: 10, y: 55, titulo: "1. Central eléctrica", texto: "La energía se genera en centrales que funcionan con combustibles fósiles o energías renovables.", audio: "assets/audio/p05_i1.mp3" },
        { x: 32, y: 45, titulo: "2. Torres de transmisión", texto: "La electricidad viaja a voltajes muy altos por cables ubicados en torres de transmisión.", audio: "assets/audio/p05_i2.mp3" },
        { x: 54, y: 55, titulo: "3. Subestación", texto: "Antes de usarse, pasa por subestaciones donde se reduce el voltaje.", audio: "assets/audio/p05_i3.mp3" },
        { x: 74, y: 60, titulo: "4. Transformador", texto: "En la ciudad pasa por transformadores que bajan aún más el voltaje.", audio: "assets/audio/p05_i4.mp3" },
        { x: 92, y: 50, titulo: "5. Hogar", texto: "Llega a los hogares, escuelas y empresas a través de los contadores eléctricos.", audio: "assets/audio/p05_i5.mp3" }
      ]
    },

    // ---------- 5. PASOS DE LA ELECTRICIDAD (ORDENAR) ----------
    {
      id: 6,
      tipo: "ordenar",
      titulo: "¿Cómo llega la electricidad a tu hogar?",
      consigna: "Tocá los pasos en el orden en que ocurren.",
      audio: "assets/audio/p05_consigna.mp3",
      items: [
        { texto: "La energía eléctrica se genera en centrales que funcionan con combustibles fósiles o energías renovables.", audio: "assets/audio/p05_i1.mp3" },
        { texto: "La electricidad viaja a voltajes muy altos por cables ubicados en torres de transmisión.", audio: "assets/audio/p05_i2.mp3" },
        { texto: "Antes de usarse, pasa por subestaciones donde se reduce el voltaje.", audio: "assets/audio/p05_i3.mp3" },
        { texto: "En la ciudad pasa por transformadores que bajan aún más el voltaje.", audio: "assets/audio/p05_i4.mp3" },
        { texto: "Llega a los hogares, escuelas y empresas a través de los contadores eléctricos.", audio: "assets/audio/p05_i5.mp3" }
      ]
    },

    // ---------- 6. INTRO RENOVABLES Y NO RENOVABLES ----------
    {
      id: 7,
      tipo: "narracionDividida",
      titulo: "Energías renovables y no renovables",
      imagen: "assets/images/afiche_renovables_no_renovables.jpg",
      mitadA: {
        texto: "La energía es renovable cuando su fuente se basa en recursos naturales inagotables, como el sol, el viento, el agua o la biomasa.",
        audio: "assets/audio/p06_renovable.mp3"
      },
      mitadB: {
        texto: "Es no renovable cuando proviene de combustibles fósiles, que se agotan con el tiempo y tardan millones de años en formarse.",
        audio: "assets/audio/p06_no_renovable.mp3"
      }
    },

    // ---------- 7. CLASIFICACIÓN RENOVABLE / NO RENOVABLE (UNO A LA VEZ) ----------
    {
      id: 8,
      tipo: "clasificarUno",
      titulo: "Renovables y no renovables",
      consigna: "Mirá cada imagen y elegí si esa fuente es renovable o no renovable.",
      audio: "assets/audio/p07_consigna.mp3",
      categorias: ["Renovable", "No renovable"],
      items: [
        { texto: "Energía solar", categoria: "Renovable", imagen: "assets/images/icono_solar.jpg", audioAcierto: "assets/audio/p07_i1.mp3" },
        { texto: "Energía eólica", categoria: "Renovable", imagen: "assets/images/icono_eolica.jpg", audioAcierto: "assets/audio/p07_i2.mp3" },
        { texto: "Energía hidráulica", categoria: "Renovable", imagen: "assets/images/icono_hidraulica.jpg", audioAcierto: "assets/audio/p07_i3.mp3" },
        { texto: "Bioenergía", categoria: "Renovable", imagen: "assets/images/icono_bioenergia.jpg", audioAcierto: "assets/audio/p07_i4.mp3" },
        { texto: "Gas natural", categoria: "No renovable", imagen: "assets/images/icono_gas.jpg", audioAcierto: "assets/audio/p07_i5.mp3" },
        { texto: "Petróleo crudo", categoria: "No renovable", imagen: "assets/images/icono_petroleo.jpg", audioAcierto: "assets/audio/p07_i6.mp3" },
        { texto: "Carbón", categoria: "No renovable", imagen: "assets/images/icono_carbon.jpg", audioAcierto: "assets/audio/p07_i7.mp3" }
      ]
    },

    // ---------- 8. DEFINICIONES POTENCIAL Y CINÉTICA ----------
    {
      id: 9,
      tipo: "narracionDividida",
      titulo: "Energía potencial y cinética",
      imagen: "assets/images/afiche_potencial_cinetica.jpg",
      mitadA: {
        texto: "Energía potencial: es la energía que posee un cuerpo debido a su posición o altura. Ejemplo: una pelota detenida en la parte superior de una colina posee energía potencial.",
        audio: "assets/audio/p08_potencial.mp3"
      },
      mitadB: {
        texto: "Energía cinética: es la energía que posee un cuerpo cuando está en movimiento. Ejemplo: una bicicleta avanzando por la calle posee energía cinética.",
        audio: "assets/audio/p08_cinetica.mp3"
      }
    },

    // ---------- 9. RAMPA (ANIMACIÓN) ----------
    {
      id: 10,
      tipo: "rampa",
      titulo: "El auto en la rampa",
      consigna: "Mirá cómo se transforma la energía cuando el auto baja la rampa.",
      audio: "assets/audio/p09_consigna.mp3",
      imagenFondo: "assets/images/rampa_fondo.jpg",
      imagenAuto: "assets/images/icono_auto_rampa.png",
      pasos: [
        { momento: "arriba", texto: "El auto está detenido en la parte superior: posee energía potencial máxima porque está elevado.", audio: "assets/audio/p09_paso1.mp3" },
        { momento: "bajando", texto: "Al soltarlo, la energía potencial disminuye y se transforma en energía cinética. El auto empieza a moverse.", audio: "assets/audio/p09_paso2.mp3" },
        { momento: "abajo", texto: "Al llegar abajo, la energía cinética es máxima: el auto alcanza su mayor velocidad.", audio: "assets/audio/p09_paso3.mp3" }
      ]
    },

    // ---------- 10. EJEMPLOS COTIDIANOS (FLIPCARDS) ----------
    {
      id: 11,
      tipo: "flipcards",
      titulo: "Relacionamos con la vida cotidiana",
      consigna: "Tocá cada tarjeta para ver la respuesta.",
      audio: "assets/audio/p10_consigna.mp3",
      tarjetas: [
        { frente: "Montaña rusa: ¿dónde hay más energía potencial?", reverso: "Arriba de la subida, porque está a mayor altura.", audio: "assets/audio/p10_t1.mp3", imagen: "assets/images/montana_rusa.jpg" },
        { frente: "Tobogán: ¿qué energía aumenta al deslizarse?", reverso: "La energía cinética, porque el chico va cada vez más rápido.", audio: "assets/audio/p10_t2.mp3", imagen: "assets/images/tobogan.jpg" },
        { frente: "Bicicleta en bajada: ¿por qué va cada vez más rápido?", reverso: "Porque la energía potencial se transforma en energía cinética.", audio: "assets/audio/p10_t3.mp3", imagen: "assets/images/bici_bajada.jpg" }
      ]
    },

    // ---------- 11. CONCLUSIÓN MÓDULO 3 ----------
    {
      id: 12,
      tipo: "narracion",
      titulo: "Conclusión",
      imagen: "assets/images/conclusion_auto_secuencia.jpg",
      texto: "Comprobamos que la altura influye en el movimiento del auto. Cuando el auto se encontraba más alto tenía mayor energía potencial. Al descender, esa energía se transformó en energía cinética, aumentando su velocidad. Esto demuestra que la energía puede transformarse de una forma a otra.",
      audio: "assets/audio/p11_conclusion.mp3"
    },

    // ---------- 12. NOTICIA ----------
    {
      id: 13,
      tipo: "narracion",
      titulo: "Argentina amplía el uso de energías renovables en las escuelas",
      imagen: "assets/images/noticia_escuelas.jpg",
      texto: "<em>TRANSICIÓN ENERGÉTICA. Cada vez más instituciones educativas apuestan por fuentes limpias y sustentables.</em><br><br>La instalación de paneles solares en edificios escolares crece en todo el país para reducir costos, cuidar el ambiente y educar en sustentabilidad.",
      audio: "assets/audio/p12_noticia.mp3",
      imagenSecundaria: "assets/images/noticia_escuelas_real.jpg",
      tituloSecundario: "Mendoza avanza con escuelas sustentables: ya son 21 los establecimientos que generan energía solar",
      audioTituloSecundario: "assets/audio/p12_titulo_secundario.mp3",
      fuenteSecundaria: "Prensa Gobierno de Mendoza",
      enlace: { texto: "Leer la noticia completa", url: "https://prensa.mendoza.gob.ar/mendoza-avanza-con-escuelas-sustentables-ya-son-21-los-establecimientos-que-generan-energia-solar/" }
    },

    // ---------- 13. VERDADERO O FALSO (NOTICIA) ----------
    {
      id: 14,
      tipo: "vf",
      titulo: "¿Verdadero o falso?",
      consigna: "Marcá si cada afirmación es verdadera o falsa.",
      audio: "assets/audio/p13_consigna.mp3",
      imagen: "assets/images/noticia_escuelas.jpg",
      afirmaciones: [
        { texto: "Las escuelas usan paneles solares para decorar edificios.", valor: false, justificacion: "Los paneles se instalan para generar electricidad y reducir costos, no como decoración.", audio: "assets/audio/p13_a1.mp3", audioJustif: "assets/audio/p13_j1.mp3" },
        { texto: "La energía solar puede convertirse en electricidad.", valor: true, justificacion: "Los paneles fotovoltaicos transforman la luz solar en electricidad.", audio: "assets/audio/p13_a2.mp3", audioJustif: "assets/audio/p13_j2.mp3" },
        { texto: "Las energías renovables aumentan la contaminación.", valor: false, justificacion: "Las energías renovables reducen la emisión de gases contaminantes.", audio: "assets/audio/p13_a3.mp3", audioJustif: "assets/audio/p13_j3.mp3" },
        { texto: "El cambio climático se relaciona con gases contaminantes.", valor: true, justificacion: "Los gases de efecto invernadero son los principales impulsores del cambio climático.", audio: "assets/audio/p13_a4.mp3", audioJustif: "assets/audio/p13_j4.mp3" }
      ]
    },

    // ---------- 14. IDEA PRINCIPAL ----------
    {
      id: 15,
      tipo: "multiple",
      titulo: "¿Cuál es la idea principal?",
      imagen: "assets/images/noticia_escuelas.jpg",
      preguntas: [
        {
          pregunta: "Elegí la idea principal de la noticia:",
          audioPregunta: "assets/audio/p14_pregunta.mp3",
          opciones: [
            "Los paneles solares son caros.",
            "Las escuelas argentinas incorporan energías renovables.",
            "La electricidad dejará de existir."
          ],
          correcta: 1,
          audioOpciones: ["assets/audio/p14_o1.mp3", "assets/audio/p14_o2.mp3", "assets/audio/p14_o3.mp3"]
        }
      ]
    },

    // ---------- 15. INFOGRAFÍA: PARTES DE LA NOTICIA ----------
    {
      id: 16,
      tipo: "infografia",
      titulo: "Recorremos la noticia",
      consigna: "Tocá cada número para descubrir esa parte de la noticia.",
      audio: "assets/audio/p15_infografia_consigna.mp3",
      imagen: "assets/images/infografia_noticia_mockup.jpg",
      puntos: [
        { x: 7, y: 9, titulo: "Volanta", texto: "Introduce el tema general de la noticia, en pocas palabras.", audio: "assets/audio/p15_p1.mp3" },
        { x: 10, y: 18, titulo: "Título", texto: "Presenta la noticia de forma impactante, para llamar la atención del lector.", audio: "assets/audio/p15_p2.mp3" },
        { x: 7, y: 28, titulo: "Copete", texto: "Resume la información principal de la noticia.", audio: "assets/audio/p15_p3.mp3" },
        { x: 7, y: 52, titulo: "Cuerpo de la noticia", texto: "Desarrolla la información completa de la noticia, con todos los detalles.", audio: "assets/audio/p15_p5.mp3" },
        { x: 96, y: 51, titulo: "Imagen", texto: "Acompaña visualmente la noticia y ayuda a comprenderla mejor.", audio: "assets/audio/p15_p6.mp3" },
        { x: 92, y: 68, titulo: "Epígrafe", texto: "Explica lo que muestra la fotografía.", audio: "assets/audio/p15_p4.mp3" }
      ]
    },

    // ---------- 16. PARTES DE LA NOTICIA (ASOCIAR) ----------
    {
      id: 17,
      tipo: "asociar",
      titulo: "Partes de una noticia",
      consigna: "Uní cada parte con su función.",
      audio: "assets/audio/p15_consigna.mp3",
      pares: [
        { izq: "Título", der: "Llama la atención del lector", audioIzq: "assets/audio/p15_izq1.mp3", audioDer: "assets/audio/p15_der1.mp3" },
        { izq: "Copete", der: "Resume la noticia", audioIzq: "assets/audio/p15_izq2.mp3", audioDer: "assets/audio/p15_der2.mp3" },
        { izq: "Epígrafe", der: "Explica la fotografía", audioIzq: "assets/audio/p15_izq3.mp3", audioDer: "assets/audio/p15_der3.mp3" },
        { izq: "Imagen", der: "Amplía información visual", audioIzq: "assets/audio/p15_izq4.mp3", audioDer: "assets/audio/p15_der4.mp3" },
        { izq: "Cuerpo de la noticia", der: "Desarrolla la información completa, con todos los detalles", audioIzq: "assets/audio/p16_izq5.mp3", audioDer: "assets/audio/p16_der5.mp3" }
      ]
    },

    // ---------- 17. MAPA INTERACTIVO DEL MERCOSUR ----------
    {
      id: 18,
      tipo: "mapaSvg",
      titulo: "Mapa interactivo del MERCOSUR",
      consigna: "Tocá cada país en el mapa para descubrir cómo avanza con las energías renovables. El MERCOSUR está formado por sus miembros plenos y sus Estados Asociados.",
      audio: "assets/audio/p16_consigna.mp3",
      svgInline: `<svg id="mapa-sudamerica" viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg">
  <path id="pais-ARG" class="pais-clickeable" data-pais="ARG" d="M 275.0,889.6 L 259.2,890.2 L 250.7,885.6 L 240.6,885.3 L 222.8,885.3 L 222.8,856.1 L 229.2,862.2 L 237.5,872.0 L 259.2,879.8 L 282.5,883.0 L 275.0,889.6 Z M 283.9,457.5 L 293.7,466.9 L 300.2,456.4 L 319.2,457.0 L 321.9,459.8 L 352.6,481.1 L 366.2,483.0 L 386.5,492.7 L 403.7,497.8 L 406.1,503.5 L 389.7,523.4 L 406.5,526.9 L 425.2,528.9 L 438.4,526.8 L 453.5,516.8 L 456.2,505.3 L 464.5,502.8 L 472.9,510.3 L 472.5,520.7 L 458.5,527.9 L 447.3,533.2 L 428.5,545.9 L 406.2,563.7 L 402.1,574.1 L 397.6,587.5 L 397.8,600.5 L 394.2,603.4 L 392.9,611.9 L 391.7,618.7 L 412.9,629.8 L 410.6,638.8 L 421.0,644.5 L 420.2,650.9 L 404.2,667.6 L 379.5,674.6 L 346.0,677.3 L 327.7,676.0 L 331.2,683.8 L 327.8,693.6 L 330.9,700.1 L 320.9,704.7 L 303.8,706.5 L 287.8,701.8 L 281.4,705.2 L 283.7,718.1 L 294.9,722.1 L 304.1,718.0 L 309.0,724.7 L 293.7,728.8 L 280.3,736.9 L 277.9,750.0 L 273.9,757.0 L 258.2,757.0 L 245.1,763.7 L 240.3,773.5 L 256.7,783.1 L 272.6,785.7 L 266.9,797.4 L 247.2,804.7 L 236.4,820.0 L 221.2,825.2 L 214.4,831.3 L 219.7,844.8 L 230.8,852.4 L 223.8,851.7 L 208.4,849.7 L 168.1,847.9 L 161.2,840.3 L 161.5,830.6 L 150.4,831.4 L 144.5,826.7 L 143.1,812.8 L 155.9,807.1 L 161.1,798.8 L 159.2,792.2 L 168.0,781.1 L 174.1,763.8 L 172.3,756.2 L 179.6,753.7 L 177.8,748.8 L 170.1,746.2 L 175.6,740.7 L 168.1,735.8 L 164.2,720.7 L 170.9,718.1 L 168.1,702.2 L 172.0,688.8 L 176.4,677.2 L 186.4,672.4 L 181.4,659.7 L 181.3,647.7 L 193.9,639.2 L 193.5,628.3 L 203.0,615.6 L 203.1,603.6 L 198.8,601.2 L 191.1,578.7 L 201.3,565.3 L 199.8,552.6 L 205.7,540.8 L 216.6,528.5 L 228.4,520.4 L 223.4,515.3 L 226.9,511.1 L 226.4,489.4 L 244.5,482.9 L 250.2,469.4 L 248.2,466.1 L 262.1,454.3 L 283.9,457.5 Z"><title>Argentina</title></path>
  <path id="pais-BOL" class="pais-clickeable" data-pais="BOL" d="M 319.2,457.0 L 300.2,456.4 L 293.7,466.9 L 283.9,457.5 L 262.1,454.3 L 248.2,466.1 L 236.2,467.9 L 229.7,449.9 L 220.7,435.3 L 226.0,422.7 L 217.2,417.2 L 215.0,407.7 L 206.8,398.9 L 217.3,384.8 L 210.2,373.8 L 214.0,369.4 L 211.0,364.6 L 217.5,358.1 L 217.8,347.0 L 218.7,337.8 L 222.2,333.4 L 207.8,312.4 L 220.2,313.5 L 228.8,313.2 L 232.5,309.3 L 247.1,304.0 L 255.9,299.1 L 277.7,296.9 L 275.9,306.7 L 278.0,311.7 L 276.6,320.4 L 294.7,332.1 L 313.4,334.3 L 319.9,339.1 L 331.2,341.7 L 338.1,345.5 L 348.6,345.4 L 358.3,349.3 L 359.0,356.8 L 362.3,360.6 L 362.5,366.2 L 357.6,366.4 L 364.0,381.6 L 396.0,382.2 L 393.5,389.7 L 395.3,394.8 L 404.4,398.5 L 408.4,406.6 L 405.4,416.9 L 400.8,422.6 L 402.4,430.0 L 397.2,432.7 L 396.9,428.7 L 381.4,422.0 L 365.9,421.9 L 336.9,425.7 L 328.9,437.1 L 328.5,444.2 L 321.9,459.8 L 319.2,457.0 Z"><title>Bolivia</title></path>
  <path id="pais-BRA" class="pais-clickeable" data-pais="BRA" d="M 406.2,563.7 L 428.5,545.9 L 447.3,533.2 L 458.5,527.9 L 472.5,520.7 L 472.9,510.3 L 464.5,502.8 L 456.2,505.3 L 459.5,497.8 L 461.8,490.1 L 461.8,482.9 L 455.8,480.5 L 449.5,482.6 L 443.3,482.0 L 441.4,477.0 L 439.8,465.1 L 436.7,461.2 L 425.4,457.6 L 418.6,460.2 L 401.0,457.7 L 402.2,440.0 L 397.2,432.7 L 402.4,430.0 L 400.8,422.6 L 405.4,416.9 L 408.4,406.6 L 404.4,398.5 L 395.3,394.8 L 393.5,389.7 L 396.0,382.2 L 364.0,381.6 L 357.6,366.4 L 362.5,366.2 L 362.3,360.6 L 359.0,356.8 L 358.3,349.3 L 348.6,345.4 L 338.1,345.5 L 331.2,341.7 L 319.9,339.1 L 313.4,334.3 L 294.7,332.1 L 276.6,320.4 L 278.0,311.7 L 275.9,306.7 L 277.7,296.9 L 255.9,299.1 L 247.1,304.0 L 232.5,309.3 L 228.8,313.2 L 220.2,313.5 L 207.8,312.4 L 198.4,314.7 L 190.9,313.2 L 192.0,293.3 L 178.3,301.0 L 163.6,300.7 L 157.3,293.7 L 146.2,293.0 L 149.7,287.4 L 140.5,279.4 L 133.5,267.7 L 137.9,265.3 L 137.9,259.8 L 148.0,256.0 L 146.3,249.0 L 150.6,244.5 L 151.8,238.4 L 170.9,229.5 L 184.5,227.0 L 186.8,225.0 L 201.8,225.6 L 209.3,189.9 L 209.7,184.2 L 207.0,176.7 L 199.7,172.0 L 199.7,162.5 L 209.1,160.4 L 212.5,161.7 L 213.0,156.7 L 203.3,155.4 L 203.1,147.2 L 235.5,147.5 L 241.0,143.0 L 245.7,147.1 L 248.9,154.8 L 252.1,153.2 L 261.2,160.1 L 274.2,159.3 L 277.4,155.3 L 289.8,152.2 L 296.7,150.1 L 298.6,144.6 L 310.5,140.9 L 309.6,138.1 L 295.5,137.0 L 293.2,128.8 L 293.9,120.0 L 286.4,116.7 L 289.5,115.5 L 301.9,117.1 L 315.1,120.4 L 319.9,117.3 L 331.9,115.3 L 350.6,110.4 L 356.6,105.4 L 354.4,101.7 L 363.1,101.2 L 367.0,104.2 L 364.8,109.9 L 370.5,111.9 L 374.4,117.9 L 369.7,122.5 L 367.1,133.6 L 371.4,140.2 L 372.6,146.3 L 382.8,152.4 L 391.0,153.0 L 392.8,150.5 L 398.1,149.9 L 405.7,147.6 L 411.1,144.1 L 420.3,145.3 L 424.3,144.8 L 433.4,145.9 L 434.9,143.2 L 432.1,140.6 L 433.8,136.8 L 440.5,138.0 L 448.4,136.6 L 457.9,139.4 L 465.2,142.1 L 470.4,138.6 L 474.1,139.1 L 476.4,142.8 L 484.3,141.8 L 490.7,136.9 L 495.8,127.3 L 505.7,115.4 L 511.4,114.7 L 515.5,122.0 L 524.9,144.8 L 533.8,146.9 L 534.2,155.9 L 521.7,166.7 L 526.9,170.6 L 556.3,172.6 L 556.9,185.7 L 569.6,177.2 L 590.6,181.8 L 618.2,189.8 L 626.4,197.4 L 623.6,204.7 L 643.0,200.6 L 675.5,207.5 L 700.4,207.0 L 725.0,217.8 L 746.3,232.4 L 759.1,236.2 L 773.4,236.7 L 779.4,240.8 L 785.1,257.5 L 787.8,265.3 L 781.2,286.9 L 772.7,295.4 L 749.2,313.6 L 738.6,328.3 L 726.3,339.6 L 722.1,339.9 L 717.4,349.5 L 718.6,373.9 L 714.0,394.0 L 712.2,402.6 L 706.9,407.8 L 704.0,425.2 L 687.1,442.2 L 684.3,455.7 L 670.8,461.4 L 666.9,469.2 L 648.8,469.1 L 622.5,474.2 L 610.8,480.0 L 592.1,483.8 L 572.5,494.2 L 558.4,507.1 L 556.0,516.8 L 558.8,524.0 L 555.6,537.2 L 551.9,543.6 L 540.2,550.8 L 521.7,573.7 L 507.1,584.1 L 495.7,590.2 L 488.1,602.6 L 477.1,610.0 L 472.5,602.6 L 479.8,596.4 L 470.2,587.6 L 457.1,580.4 L 440.0,572.0 L 433.8,572.4 L 417.1,562.3 L 406.2,563.7 Z"><title>Brazil</title></path>
  <path id="pais-CHL" class="pais-clickeable" data-pais="CHL" d="M 222.8,856.1 L 222.8,885.3 L 240.6,885.3 L 250.7,885.6 L 245.1,890.9 L 230.9,894.9 L 222.7,894.5 L 212.8,893.5 L 200.7,889.5 L 183.2,887.7 L 162.3,880.4 L 145.2,873.4 L 122.3,858.7 L 136.0,861.5 L 159.4,870.2 L 181.5,874.9 L 190.1,868.9 L 195.5,860.0 L 210.9,854.6 L 222.8,856.1 Z M 229.7,449.9 L 236.2,467.9 L 248.2,466.1 L 250.2,469.4 L 244.5,482.9 L 226.4,489.4 L 226.9,511.1 L 223.4,515.3 L 228.4,520.4 L 216.6,528.5 L 205.7,540.8 L 199.8,552.6 L 201.3,565.3 L 191.1,578.7 L 198.8,601.2 L 203.1,603.6 L 203.0,615.6 L 193.5,628.3 L 193.9,639.2 L 181.3,647.7 L 181.4,659.7 L 186.4,672.4 L 176.4,677.2 L 172.0,688.8 L 168.1,702.2 L 170.9,718.1 L 164.2,720.7 L 168.1,735.8 L 175.6,740.7 L 170.1,746.2 L 177.8,748.8 L 179.6,753.7 L 172.3,756.2 L 174.1,763.8 L 168.0,781.1 L 159.2,792.2 L 161.1,798.8 L 155.9,807.1 L 143.1,812.8 L 144.5,826.7 L 150.4,831.4 L 161.5,830.6 L 161.2,840.3 L 168.1,847.9 L 208.4,849.7 L 223.8,851.7 L 209.0,851.6 L 201.0,854.8 L 185.9,859.6 L 183.2,871.7 L 176.2,872.0 L 157.4,867.8 L 138.3,858.7 L 138.3,858.7 L 117.6,851.3 L 112.3,843.0 L 117.1,835.3 L 108.7,826.7 L 106.5,804.4 L 113.6,791.9 L 131.2,781.8 L 105.9,778.0 L 121.8,766.5 L 127.5,744.8 L 146.0,749.4 L 154.7,722.4 L 143.5,718.9 L 138.3,735.2 L 127.8,733.4 L 133.0,714.7 L 138.7,690.6 L 146.4,681.6 L 141.6,668.9 L 140.2,654.2 L 147.2,653.8 L 157.4,632.7 L 169.0,611.9 L 176.0,592.4 L 172.2,572.9 L 177.2,562.1 L 175.2,546.0 L 184.9,530.1 L 187.9,504.9 L 193.3,477.8 L 198.5,448.6 L 197.3,427.3 L 193.8,408.9 L 202.4,405.6 L 206.8,398.9 L 215.0,407.7 L 217.2,417.2 L 226.0,422.7 L 220.7,435.3 L 229.7,449.9 Z"><title>Chile</title></path>
  <path id="pais-COL" class="pais-otro"  d="M 110.4,171.5 L 103.3,168.5 L 95.1,164.1 L 90.4,166.2 L 76.3,164.4 L 72.2,158.8 L 69.1,159.0 L 52.4,151.6 L 50.2,147.5 L 56.4,146.5 L 55.6,140.0 L 59.5,135.3 L 67.8,134.4 L 74.8,126.2 L 81.2,119.4 L 75.1,116.2 L 78.2,108.7 L 74.4,96.7 L 78.0,93.3 L 75.4,82.3 L 68.6,75.3 L 70.8,69.0 L 76.1,69.9 L 79.3,66.1 L 75.4,58.4 L 77.4,56.5 L 86.1,56.9 L 98.6,47.8 L 105.4,46.4 L 105.6,42.1 L 108.7,31.1 L 118.2,25.0 L 128.7,24.8 L 130.0,22.0 L 143.1,23.1 L 156.2,16.5 L 162.7,13.6 L 170.8,7.3 L 176.7,8.1 L 181.0,11.6 L 177.8,16.0 L 167.1,18.1 L 162.9,24.7 L 156.4,28.4 L 151.6,33.3 L 149.5,42.6 L 144.9,50.2 L 153.5,51.1 L 155.7,57.1 L 159.3,59.9 L 160.7,65.2 L 158.7,70.0 L 159.3,72.7 L 163.4,73.8 L 167.3,78.4 L 188.8,77.1 L 198.4,78.8 L 210.2,90.0 L 216.9,88.6 L 228.9,89.3 L 238.4,87.8 L 244.3,90.1 L 241.3,97.1 L 237.6,101.5 L 236.3,110.8 L 239.6,119.5 L 244.4,123.4 L 244.9,126.3 L 236.5,132.8 L 242.5,135.6 L 247.0,140.2 L 252.1,153.2 L 248.9,154.8 L 245.7,147.1 L 241.0,143.0 L 235.5,147.5 L 203.1,147.2 L 203.3,155.4 L 213.0,156.7 L 212.5,161.7 L 209.1,160.4 L 199.7,162.5 L 199.7,172.0 L 207.0,176.7 L 209.7,184.2 L 209.3,189.9 L 201.8,225.6 L 193.4,218.7 L 188.5,218.4 L 199.2,205.1 L 186.4,199.0 L 176.4,200.1 L 170.4,197.9 L 161.2,201.3 L 148.8,199.7 L 139.0,186.0 L 131.3,182.6 L 126.0,176.5 L 114.9,170.3 L 110.4,171.5 Z"><title>Colombia</title></path>
  <path id="pais-ECU" class="pais-otro"  d="M 28.3,214.0 L 37.2,204.2 L 33.6,198.5 L 27.2,204.6 L 17.2,198.9 L 20.6,195.2 L 17.8,183.4 L 23.6,181.4 L 26.7,173.3 L 33.0,164.9 L 31.8,159.5 L 41.0,156.7 L 52.4,151.6 L 69.1,159.0 L 72.2,158.8 L 76.3,164.4 L 90.4,166.2 L 95.1,164.1 L 103.3,168.5 L 110.4,171.5 L 112.8,181.5 L 107.6,189.9 L 89.4,203.6 L 69.4,208.7 L 59.2,220.1 L 56.0,228.9 L 46.6,234.2 L 39.6,227.7 L 32.9,226.3 L 26.0,227.3 L 25.5,222.5 L 30.3,219.4 L 28.3,214.0 Z"><title>Ecuador</title></path>
  <path id="pais-FLK" class="pais-otro"  d="M 346.7,845.9 L 366.7,838.0 L 380.8,841.3 L 390.8,836.1 L 404.2,842.0 L 399.2,846.5 L 376.7,850.4 L 369.2,845.9 L 355.0,851.7 L 346.7,845.9 Z"><title>Falkland Islands</title></path>
  <path id="pais-GUF" class="pais-otro"  d="M 490.7,136.9 L 484.3,141.8 L 476.4,142.8 L 474.1,139.1 L 470.4,138.6 L 465.2,142.1 L 457.9,139.4 L 462.1,133.8 L 463.6,127.9 L 466.5,122.3 L 460.0,114.6 L 458.7,105.7 L 467.4,94.5 L 473.0,95.9 L 485.3,99.0 L 502.9,110.0 L 505.7,115.4 L 495.8,127.3 L 490.7,136.9 Z"><title>French Guiana</title></path>
  <path id="pais-GUY" class="pais-otro"  d="M 370.7,60.4 L 381.6,65.2 L 392.0,73.7 L 392.4,80.4 L 398.7,80.8 L 407.6,87.1 L 414.2,91.7 L 411.5,103.4 L 401.4,106.8 L 402.3,109.9 L 399.3,116.6 L 406.6,126.1 L 412.0,126.1 L 414.2,133.4 L 424.3,144.8 L 420.3,145.3 L 411.1,144.1 L 405.7,147.6 L 398.1,149.9 L 392.8,150.5 L 391.0,153.0 L 382.8,152.4 L 372.6,146.3 L 371.4,140.2 L 367.1,133.6 L 369.7,122.5 L 374.4,117.9 L 370.5,111.9 L 364.8,109.9 L 367.0,104.2 L 363.1,101.2 L 354.4,101.7 L 343.2,91.8 L 347.7,88.2 L 347.3,82.2 L 357.6,80.1 L 361.7,77.7 L 356.0,72.8 L 357.5,68.1 L 370.7,60.4 Z"><title>Guyana</title></path>
  <path id="pais-PER" class="pais-otro"  d="M 206.8,398.9 L 202.4,405.6 L 193.8,408.9 L 177.1,401.4 L 175.6,396.0 L 142.6,382.9 L 112.7,368.7 L 99.8,360.6 L 92.9,349.9 L 95.7,346.1 L 81.6,329.0 L 65.1,304.9 L 49.4,279.0 L 42.6,273.0 L 37.3,263.4 L 24.4,254.9 L 12.5,249.6 L 17.9,243.8 L 9.8,231.3 L 15.0,222.2 L 28.3,214.0 L 30.3,219.4 L 25.5,222.5 L 26.0,227.3 L 32.9,226.3 L 39.6,227.7 L 46.6,234.2 L 56.0,228.9 L 59.2,220.1 L 69.4,208.7 L 89.4,203.6 L 107.6,189.9 L 112.8,181.5 L 110.4,171.5 L 114.9,170.3 L 126.0,176.5 L 131.3,182.6 L 139.0,186.0 L 148.8,199.7 L 161.2,201.3 L 170.4,197.9 L 176.4,200.1 L 186.4,199.0 L 199.2,205.1 L 188.5,218.4 L 193.4,218.7 L 201.8,225.6 L 186.8,225.0 L 184.5,227.0 L 170.9,229.5 L 151.8,238.4 L 150.6,244.5 L 146.3,249.0 L 148.0,256.0 L 137.9,259.8 L 137.9,265.3 L 133.5,267.7 L 140.5,279.4 L 149.7,287.4 L 146.2,293.0 L 157.3,293.7 L 163.6,300.7 L 178.3,301.0 L 192.0,293.3 L 190.9,313.2 L 198.4,314.7 L 207.8,312.4 L 222.2,333.4 L 218.7,337.8 L 217.8,347.0 L 217.5,358.1 L 211.0,364.6 L 214.0,369.4 L 210.2,373.8 L 217.3,384.8 L 206.8,398.9 Z"><title>Peru</title></path>
  <path id="pais-PRY" class="pais-clickeable" data-pais="PRY" d="M 321.9,459.8 L 328.5,444.2 L 328.9,437.1 L 336.9,425.7 L 365.9,421.9 L 381.4,422.0 L 396.9,428.7 L 397.2,432.7 L 402.2,440.0 L 401.0,457.7 L 418.6,460.2 L 425.4,457.6 L 436.7,461.2 L 439.8,465.1 L 441.4,477.0 L 443.3,482.0 L 449.5,482.6 L 455.8,480.5 L 461.8,482.9 L 461.8,490.1 L 459.5,497.8 L 456.2,505.3 L 453.5,516.8 L 438.4,526.8 L 425.2,528.9 L 406.5,526.9 L 389.7,523.4 L 406.1,503.5 L 403.7,497.8 L 386.5,492.7 L 366.2,483.0 L 352.6,481.1 L 321.9,459.8 Z"><title>Paraguay</title></path>
  <path id="pais-SUR" class="pais-otro"  d="M 414.2,91.7 L 434.2,94.3 L 436.0,91.9 L 449.4,91.0 L 467.4,94.5 L 458.7,105.7 L 460.0,114.6 L 466.6,122.3 L 463.6,128.0 L 462.2,133.9 L 457.9,139.4 L 448.4,136.6 L 440.5,138.0 L 433.8,136.8 L 432.1,140.6 L 434.9,143.2 L 433.4,145.9 L 424.3,144.8 L 414.2,133.4 L 412.0,126.1 L 406.6,126.1 L 399.3,116.6 L 402.3,109.9 L 401.4,106.8 L 411.5,103.4 L 414.2,91.7 Z"><title>Suriname</title></path>
  <path id="pais-URY" class="pais-clickeable" data-pais="URY" d="M 406.2,563.7 L 417.1,562.3 L 433.8,572.4 L 440.0,572.0 L 457.1,580.4 L 470.2,587.6 L 479.8,596.4 L 472.5,602.6 L 477.1,610.0 L 469.9,618.2 L 451.1,625.5 L 438.8,622.9 L 429.7,624.3 L 414.3,618.7 L 403.0,619.1 L 392.9,611.9 L 394.2,603.4 L 397.8,600.5 L 397.6,587.5 L 402.1,574.1 L 406.2,563.7 Z"><title>Uruguay</title></path>
  <path id="pais-VEN" class="pais-otro"  d="M 177.8,16.0 L 177.3,19.0 L 167.5,20.6 L 173.0,26.5 L 172.8,33.3 L 165.4,40.9 L 171.7,51.2 L 178.9,50.4 L 182.7,41.0 L 177.5,36.4 L 176.7,26.5 L 197.4,21.2 L 195.1,15.0 L 200.9,10.9 L 206.9,20.1 L 218.6,20.3 L 229.4,27.6 L 230.1,31.9 L 245.1,32.0 L 262.9,30.7 L 272.4,36.5 L 285.2,38.1 L 294.5,34.0 L 294.7,30.8 L 315.3,30.0 L 335.3,29.8 L 321.2,33.6 L 326.9,39.8 L 340.2,40.8 L 352.8,47.2 L 355.5,57.6 L 364.2,57.4 L 370.7,60.4 L 357.5,68.1 L 356.0,72.8 L 361.7,77.7 L 357.6,80.1 L 347.3,82.2 L 347.7,88.2 L 343.2,91.8 L 354.4,101.7 L 356.6,105.4 L 350.6,110.4 L 331.9,115.3 L 319.9,117.3 L 315.1,120.4 L 301.9,117.1 L 289.5,115.5 L 286.4,116.7 L 293.9,120.0 L 293.2,128.8 L 295.5,137.0 L 309.6,138.1 L 310.5,140.9 L 298.6,144.6 L 296.7,150.1 L 289.8,152.2 L 277.4,155.3 L 274.2,159.3 L 261.2,160.1 L 252.1,153.2 L 247.0,140.2 L 242.5,135.6 L 236.5,132.8 L 244.9,126.3 L 244.4,123.4 L 239.6,119.5 L 236.3,110.8 L 237.6,101.5 L 241.3,97.1 L 244.3,90.1 L 238.4,87.8 L 228.9,89.3 L 216.9,88.6 L 210.2,90.0 L 198.4,78.8 L 188.8,77.1 L 167.3,78.4 L 163.4,73.8 L 159.3,72.7 L 158.7,70.0 L 160.7,65.2 L 159.3,59.9 L 155.7,57.1 L 153.5,51.1 L 144.9,50.2 L 149.5,42.6 L 151.6,33.3 L 156.4,28.4 L 162.9,24.7 L 167.1,18.1 L 177.8,16.0 Z"><title>Venezuela</title></path>
</svg>`,
      paises: {
        ARG: { nombre: "Argentina", bandera: "assets/images/bandera_argentina.jpg", porcentaje: 23, proyecto: "Parque eólico binacional Argentina–Brasil", dato: "El 23% de la matriz eléctrica de Argentina proviene de fuentes renovables.", audio: "assets/audio/p16_arg.mp3" },
        BRA: { nombre: "Brasil", bandera: "assets/images/bandera_brasil.jpg", porcentaje: 45, proyecto: "Modernización de represas hidroeléctricas en la región", dato: "Brasil es uno de los mayores productores hidroeléctricos del mundo.", audio: "assets/audio/p16_bra.mp3" },
        PRY: { nombre: "Paraguay", bandera: "assets/images/bandera_paraguay.jpg", porcentaje: 48, proyecto: "Planta solar fotovoltaica en el Chaco paraguayo", dato: "Paraguay aprovecha su gran potencial hidroeléctrico e impulsa proyectos solares.", audio: "assets/audio/p16_pry.mp3" },
        URY: { nombre: "Uruguay", bandera: "assets/images/bandera_uruguay.jpg", porcentaje: 60, proyecto: "Interconexión eléctrica entre Uruguay y Brasil", dato: "Uruguay lidera la región con el 60% de generación eléctrica renovable.", audio: "assets/audio/p16_ury.mp3" },
        CHL: { nombre: "Chile", bandera: "assets/images/bandera_chile.jpg", porcentaje: 63, proyecto: "Planta termosolar Cerro Dominador, pionera en Sudamérica", dato: "Chile es Estado Asociado del MERCOSUR desde 1996, y alcanzó en 2025 un 63% de generación eléctrica renovable, impulsado por la energía solar del norte del país.", audio: "assets/audio/p16_chl.mp3" },
        BOL: { nombre: "Bolivia", bandera: "assets/images/bandera_bolivia.jpg", porcentaje: 35, proyecto: "Planta Solar Chichas en Potosí, la fotovoltaica más grande del país", dato: "Bolivia es miembro pleno del MERCOSUR desde 2024, y genera aproximadamente el 35% de su electricidad con fuentes renovables.", audio: "assets/audio/p16_bol.mp3" }
      }
    },

    // ---------- 18. ORDENAR PAÍSES POR % RENOVABLE ----------
    {
      id: 19,
      tipo: "ordenar",
      titulo: "Energías renovables por país",
      consigna: "Ordená los países de mayor a menor porcentaje de energía renovable.",
      audio: "assets/audio/p17_consigna.mp3",
      items: [
        { texto: "Uruguay", textoRevelado: "Uruguay (60%)", imagenRevelada: "assets/images/bandera_uruguay.jpg", audio: "assets/audio/p17_i1.mp3" },
        { texto: "Paraguay", textoRevelado: "Paraguay (48%)", imagenRevelada: "assets/images/bandera_paraguay.jpg", audio: "assets/audio/p17_i2.mp3" },
        { texto: "Brasil", textoRevelado: "Brasil (45%)", imagenRevelada: "assets/images/bandera_brasil.jpg", audio: "assets/audio/p17_i3.mp3" },
        { texto: "Argentina", textoRevelado: "Argentina (23%)", imagenRevelada: "assets/images/bandera_argentina.jpg", audio: "assets/audio/p17_i4.mp3" }
      ]
    },

    // ---------- 19. ¿POR QUÉ URUGUAY LIDERA? (MULTIPLE CHOICE) ----------
    {
      id: 20,
      tipo: "multiple",
      titulo: "Para pensar",
      preguntas: [
        {
          pregunta: "¿Por qué creés que Uruguay lidera el uso de energías renovables en la región?",
          audioPregunta: "assets/audio/p18_consigna.mp3",
          opciones: [
            "Porque invirtió fuertemente en energía eólica e hidráulica.",
            "Porque es el país más grande de Sudamérica.",
            "Porque no necesita usar electricidad."
          ],
          correcta: 0,
          audioOpciones: ["assets/audio/p18_o1.mp3", "assets/audio/p18_o2.mp3", "assets/audio/p18_o3.mp3"],
          imagen: "assets/images/uruguay_energia_renovable.jpg"
        }
      ]
    },
    // ---------- 20. TRIVIA - PREGUNTA 1 DE 10 ----------
    {
      id: 21,
      tipo: "multiple",
      titulo: "Trivia: pregunta 1 de 10",
      preguntas: [
        {
          pregunta: "¿Qué es la energía?",
          audioPregunta: "assets/audio/p19_q1.mp3",
          opciones: ["La capacidad de realizar un trabajo", "Un tipo de combustible", "Un aparato eléctrico"],
          correcta: 0,
          audioOpciones: ["assets/audio/p19_q1o1.mp3", "assets/audio/p19_q1o2.mp3", "assets/audio/p19_q1o3.mp3"],
          imagen: "assets/images/portada.jpg"
        }
      ]
    },

    // ---------- 21. TRIVIA - PREGUNTA 2 DE 10 ----------
    {
      id: 22,
      tipo: "multiple",
      titulo: "Trivia: pregunta 2 de 10",
      preguntas: [
        {
          pregunta: "¿Cuál de estas fuentes es renovable?",
          audioPregunta: "assets/audio/p19_q2.mp3",
          opciones: ["Petróleo crudo", "Energía eólica", "Carbón"],
          correcta: 1,
          audioOpciones: ["assets/audio/p19_q2o1.mp3", "assets/audio/p19_q2o2.mp3", "assets/audio/p19_q2o3.mp3"],
          imagen: "assets/images/icono_eolica.jpg"
        }
      ]
    },

    // ---------- 22. TRIVIA - PREGUNTA 3 DE 10 ----------
    {
      id: 23,
      tipo: "multiple",
      titulo: "Trivia: pregunta 3 de 10",
      preguntas: [
        {
          pregunta: "¿Qué energía posee un cuerpo en movimiento?",
          audioPregunta: "assets/audio/p19_q3.mp3",
          opciones: ["Energía potencial", "Energía cinética", "Energía química"],
          correcta: 1,
          audioOpciones: ["assets/audio/p19_q3o1.mp3", "assets/audio/p19_q3o2.mp3", "assets/audio/p19_q3o3.mp3"],
          imagen: "assets/images/bici_bajada.jpg"
        }
      ]
    },

    // ---------- 23. TRIVIA - PREGUNTA 4 DE 10 ----------
    {
      id: 24,
      tipo: "multiple",
      titulo: "Trivia: pregunta 4 de 10",
      preguntas: [
        {
          pregunta: "¿Qué energía posee un cuerpo por su altura o posición?",
          audioPregunta: "assets/audio/p19_q4.mp3",
          opciones: ["Energía cinética", "Energía potencial", "Energía eólica"],
          correcta: 1,
          audioOpciones: ["assets/audio/p19_q4o1.mp3", "assets/audio/p19_q4o2.mp3", "assets/audio/p19_q4o3.mp3"],
          imagen: "assets/images/montana_rusa.jpg"
        }
      ]
    },

    // ---------- 24. TRIVIA - PREGUNTA 5 DE 10 ----------
    {
      id: 25,
      tipo: "multiple",
      titulo: "Trivia: pregunta 5 de 10",
      preguntas: [
        {
          pregunta: "¿Qué país del MERCOSUR lidera el porcentaje de energía renovable?",
          audioPregunta: "assets/audio/p19_q5.mp3",
          opciones: ["Argentina", "Brasil", "Uruguay"],
          correcta: 2,
          audioOpciones: ["assets/audio/p19_q5o1.mp3", "assets/audio/p19_q5o2.mp3", "assets/audio/p19_q5o3.mp3"],
          imagen: "assets/images/bandera_uruguay.jpg"
        }
      ]
    },

    // ---------- 25. TRIVIA - PREGUNTA 6 DE 10 ----------
    {
      id: 26,
      tipo: "multiple",
      titulo: "Trivia: pregunta 6 de 10",
      preguntas: [
        {
          pregunta: "¿Qué países integran el MERCOSUR en esta actividad?",
          audioPregunta: "assets/audio/p19_q6.mp3",
          opciones: ["Argentina, Brasil, Paraguay y Uruguay", "Argentina, Chile, Perú y Bolivia", "Brasil, Colombia, Ecuador y Venezuela"],
          correcta: 0,
          audioOpciones: ["assets/audio/p19_q6o1.mp3", "assets/audio/p19_q6o2.mp3", "assets/audio/p19_q6o3.mp3"],
          imagen: "assets/images/mapa_mercosur_trivia.jpg"
        }
      ]
    },

    // ---------- 26. TRIVIA - PREGUNTA 7 DE 10 ----------
    {
      id: 27,
      tipo: "multiple",
      titulo: "Trivia: pregunta 7 de 10",
      preguntas: [
        {
          pregunta: "¿Qué parte de una noticia resume la información principal?",
          audioPregunta: "assets/audio/p19_q7.mp3",
          opciones: ["El epígrafe", "El copete", "La volanta"],
          correcta: 1,
          audioOpciones: ["assets/audio/p19_q7o1.mp3", "assets/audio/p19_q7o2.mp3", "assets/audio/p19_q7o3.mp3"],
          imagen: "assets/images/noticia_escuelas.jpg"
        }
      ]
    },

    // ---------- 27. TRIVIA - PREGUNTA 8 DE 10 ----------
    {
      id: 28,
      tipo: "multiple",
      titulo: "Trivia: pregunta 8 de 10",
      preguntas: [
        {
          pregunta: "¿Cuál de estas fuentes NO es renovable?",
          audioPregunta: "assets/audio/p19_q8.mp3",
          opciones: ["Energía solar", "Gas natural", "Energía hidráulica"],
          correcta: 1,
          audioOpciones: ["assets/audio/p19_q8o1.mp3", "assets/audio/p19_q8o2.mp3", "assets/audio/p19_q8o3.mp3"],
          imagen: "assets/images/icono_gas.jpg"
        }
      ]
    },

    // ---------- 28. TRIVIA - PREGUNTA 9 DE 10 ----------
    {
      id: 29,
      tipo: "multiple",
      titulo: "Trivia: pregunta 9 de 10",
      preguntas: [
        {
          pregunta: "¿Qué le pasa a la energía potencial cuando un cuerpo cae?",
          audioPregunta: "assets/audio/p19_q9.mp3",
          opciones: ["Aumenta", "Se transforma en cinética", "Desaparece"],
          correcta: 1,
          audioOpciones: ["assets/audio/p19_q9o1.mp3", "assets/audio/p19_q9o2.mp3", "assets/audio/p19_q9o3.mp3"],
          imagen: "assets/images/tobogan.jpg"
        }
      ]
    },

    // ---------- 29. TRIVIA - PREGUNTA 10 DE 10 ----------
    {
      id: 30,
      tipo: "multiple",
      titulo: "Trivia: pregunta 10 de 10",
      preguntas: [
        {
          pregunta: "¿Qué porcentaje de energía renovable tiene Paraguay?",
          audioPregunta: "assets/audio/p19_q10.mp3",
          opciones: ["23%", "48%", "60%"],
          correcta: 1,
          audioOpciones: ["assets/audio/p19_q10o1.mp3", "assets/audio/p19_q10o2.mp3", "assets/audio/p19_q10o3.mp3"],
          imagen: "assets/images/bandera_paraguay.jpg"
        }
      ]
    },
    // ---------- 30. CIERRE ----------
    {
      id: 31,
      tipo: "cierre",
      titulo: "¡Recorrido completado!",
      texto: "Aprendimos cómo se genera la energía, qué fuentes son renovables y cómo los países del MERCOSUR trabajan juntos por un futuro más sustentable.",
      audio: "assets/audio/p20_cierre.mp3",
      imagen: "assets/images/portada.jpg"
    }

  ]

};
