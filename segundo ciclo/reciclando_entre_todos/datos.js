// datos.js — "Reciclando entre Todos" — 2do ciclo primaria
const DATOS = {
  titulo: "Reciclando entre Todos",
  fotoPerfil: "assets/images/profe.jpg",
  contactoTexto: "Informática Educativa — Prof. Gustavo Aguilar",
  contactoMail: "profegustaaguilar@gmail.com",
  pantallas: [

    // 1. PORTADA
    {
      id: 1,
      tipo: "portada",
      titulo: "Reciclando entre Todos",
      subtitulo: "Aprendé a cuidar el planeta clasificando bien los residuos",
      imagen: "assets/images/portada.jpg"
    },

    // 2. INTRO MODULO 1
    {
      id: 2,
      tipo: "narracion",
      modulo: "Módulo 1: ¿Por qué reciclar?",
      texto: "Todos los días generamos basura: envases, papeles, restos de comida. Si no la separamos bien, tarda muchísimo tiempo en desaparecer y contamina la tierra, el agua y el aire. Reciclar es una forma simple de cuidar el planeta para las próximas generaciones.",
      audio: "assets/audio/m01_intro.mp3",
      imagen: "assets/images/modulo1_reflexion.jpg"
    },

    // 3. MODULO 2 INTRO: PRESENTACIÓN DE LOS CONTENEDORES
    {
      id: 3,
      tipo: "presentarContenedores",
      modulo: "Módulo 2: Los 5 contenedores",
      instruccion: "Tocá cada contenedor para conocerlo antes de empezar a clasificar.",
      audio: "assets/audio/m02_presentacion_intro.mp3",
      contenedores: [
        { nombre: "PLÁSTICO", imagen: "assets/images/tacho_plastico.jpg", audio: "assets/audio/m02_pres_plastico.mp3" },
        { nombre: "PAPEL Y CARTÓN", imagen: "assets/images/tacho_papel.jpg", audio: "assets/audio/m02_pres_papel.mp3" },
        { nombre: "VIDRIO", imagen: "assets/images/tacho_vidrio.jpg", audio: "assets/audio/m02_pres_vidrio.mp3" },
        { nombre: "LATAS", imagen: "assets/images/tacho_latas.jpg", audio: "assets/audio/m02_pres_latas.mp3" },
        { nombre: "BASURA DOMÉSTICA", imagen: "assets/images/tacho_basura.jpg", audio: "assets/audio/m02_pres_basura.mp3" }
      ]
    },

    // 4-7. MODULO 2: LOS 5 CONTENEDORES (clasificarVisual, dividido en 4 pantallas)
    {
      id: 4,
      tipo: "clasificarVisual",
      modulo: "Módulo 2: Los 5 contenedores",
      instruccion: "Tocá cada residuo y después el contenedor que le corresponde.",
      audio: "assets/audio/m02_instruccion.mp3",
      contenedores: [
        { nombre: "PLÁSTICO", imagen: "assets/images/tacho_plastico.jpg" },
        { nombre: "PAPEL Y CARTÓN", imagen: "assets/images/tacho_papel.jpg" },
        { nombre: "VIDRIO", imagen: "assets/images/tacho_vidrio.jpg" },
        { nombre: "LATAS", imagen: "assets/images/tacho_latas.jpg" },
        { nombre: "BASURA DOMÉSTICA", imagen: "assets/images/tacho_basura.jpg" }
      ],
      items: [
        { texto: "Botella de agua de plástico", imagen: "assets/images/residuo_botella_agua.jpg", categoria: "PLÁSTICO", audio: "assets/audio/r_botella_agua.mp3", audioConfirma: "assets/audio/rc_botella_agua.mp3" },
        { texto: "Revistas", imagen: "assets/images/residuo_revistas.jpg", categoria: "PAPEL Y CARTÓN", audio: "assets/audio/r_revistas.mp3", audioConfirma: "assets/audio/rc_revistas.mp3" },
        { texto: "Botella de vidrio", imagen: "assets/images/residuo_botella_vidrio.jpg", categoria: "VIDRIO", audio: "assets/audio/r_botella_vidrio.mp3", audioConfirma: "assets/audio/rc_botella_vidrio.mp3" },
        { texto: "Lata de refresco", imagen: "assets/images/residuo_lata_refresco.jpg", categoria: "LATAS", audio: "assets/audio/r_lata_refresco.mp3", audioConfirma: "assets/audio/rc_lata_refresco.mp3" },
        { texto: "Plátano", imagen: "assets/images/residuo_platano.jpg", categoria: "BASURA DOMÉSTICA", audio: "assets/audio/r_platano.mp3", audioConfirma: "assets/audio/rc_platano.mp3" }
      ]
    },
    {
      id: 5,
      tipo: "clasificarVisual",
      modulo: "Módulo 2: Los 5 contenedores",
      instruccion: "Seguimos. Tocá cada residuo y después el contenedor que le corresponde.",
      audio: "assets/audio/m02_instruccion_2.mp3",
      contenedores: [
        { nombre: "PLÁSTICO", imagen: "assets/images/tacho_plastico.jpg" },
        { nombre: "PAPEL Y CARTÓN", imagen: "assets/images/tacho_papel.jpg" },
        { nombre: "VIDRIO", imagen: "assets/images/tacho_vidrio.jpg" },
        { nombre: "LATAS", imagen: "assets/images/tacho_latas.jpg" },
        { nombre: "BASURA DOMÉSTICA", imagen: "assets/images/tacho_basura.jpg" }
      ],
      items: [
        { texto: "Botella de leche de plástico", imagen: "assets/images/residuo_botella_leche.jpg", categoria: "PLÁSTICO", audio: "assets/audio/r_botella_leche.mp3", audioConfirma: "assets/audio/rc_botella_leche.mp3" },
        { texto: "Caja de cereales", imagen: "assets/images/residuo_caja_cereales.jpg", categoria: "PAPEL Y CARTÓN", audio: "assets/audio/r_caja_cereales.mp3", audioConfirma: "assets/audio/rc_caja_cereales.mp3" },
        { texto: "Frasco de aceitunas", imagen: "assets/images/residuo_frasco_aceitunas.jpg", categoria: "VIDRIO", audio: "assets/audio/r_frasco_aceitunas.mp3", audioConfirma: "assets/audio/rc_frasco_aceitunas.mp3" },
        { texto: "Papel de aluminio", imagen: "assets/images/residuo_papel_aluminio.jpg", categoria: "LATAS", audio: "assets/audio/r_papel_aluminio.mp3", audioConfirma: "assets/audio/rc_papel_aluminio.mp3" },
        { texto: "Cáscaras de huevo", imagen: "assets/images/residuo_huevos.jpg", categoria: "BASURA DOMÉSTICA", audio: "assets/audio/r_huevos.mp3", audioConfirma: "assets/audio/rc_huevos.mp3" }
      ]
    },
    {
      id: 6,
      tipo: "clasificarVisual",
      modulo: "Módulo 2: Los 5 contenedores",
      instruccion: "Seguimos. Tocá cada residuo y después el contenedor que le corresponde.",
      audio: "assets/audio/m02_instruccion_2.mp3",
      contenedores: [
        { nombre: "PLÁSTICO", imagen: "assets/images/tacho_plastico.jpg" },
        { nombre: "PAPEL Y CARTÓN", imagen: "assets/images/tacho_papel.jpg" },
        { nombre: "VIDRIO", imagen: "assets/images/tacho_vidrio.jpg" },
        { nombre: "LATAS", imagen: "assets/images/tacho_latas.jpg" },
        { nombre: "BASURA DOMÉSTICA", imagen: "assets/images/tacho_basura.jpg" }
      ],
      items: [
        { texto: "Periódico", imagen: "assets/images/residuo_periodico.jpg", categoria: "PAPEL Y CARTÓN", audio: "assets/audio/r_periodico.mp3", audioConfirma: "assets/audio/rc_periodico.mp3" },
        { texto: "Tarro de mermelada", imagen: "assets/images/residuo_tarro_mermelada.jpg", categoria: "VIDRIO", audio: "assets/audio/r_tarro_mermelada.mp3", audioConfirma: "assets/audio/rc_tarro_mermelada.mp3" },
        { texto: "Lata de conserva", imagen: "assets/images/residuo_lata_conserva.jpg", categoria: "LATAS", audio: "assets/audio/r_lata_conserva.mp3", audioConfirma: "assets/audio/rc_lata_conserva.mp3" },
        { texto: "Pan mohoso", imagen: "assets/images/residuo_pan_mohoso.jpg", categoria: "BASURA DOMÉSTICA", audio: "assets/audio/r_pan_mohoso.mp3", audioConfirma: "assets/audio/rc_pan_mohoso.mp3" }
      ]
    },
    {
      id: 7,
      tipo: "clasificarVisual",
      modulo: "Módulo 2: Los 5 contenedores",
      instruccion: "Última tanda. Tocá cada residuo y después el contenedor que le corresponde.",
      audio: "assets/audio/m02_instruccion_3.mp3",
      contenedores: [
        { nombre: "PLÁSTICO", imagen: "assets/images/tacho_plastico.jpg" },
        { nombre: "PAPEL Y CARTÓN", imagen: "assets/images/tacho_papel.jpg" },
        { nombre: "VIDRIO", imagen: "assets/images/tacho_vidrio.jpg" },
        { nombre: "LATAS", imagen: "assets/images/tacho_latas.jpg" },
        { nombre: "BASURA DOMÉSTICA", imagen: "assets/images/tacho_basura.jpg" }
      ],
      items: [
        { texto: "Carta y sobre", imagen: "assets/images/residuo_carta_sobre.jpg", categoria: "PAPEL Y CARTÓN", audio: "assets/audio/r_carta_sobre.mp3", audioConfirma: "assets/audio/rc_carta_sobre.mp3" },
        { texto: "Tapita de botella", imagen: "assets/images/residuo_tapita_botella.jpg", categoria: "LATAS", audio: "assets/audio/r_tapita_botella.mp3", audioConfirma: "assets/audio/rc_tapita_botella.mp3" },
        { texto: "Patito de goma roto", imagen: "assets/images/residuo_patito_goma.jpg", categoria: "BASURA DOMÉSTICA", audio: "assets/audio/r_patito_goma.mp3", audioConfirma: "assets/audio/rc_patito_goma.mp3" }
      ]
    },

    // 7. INTRO MODULO 3
    {
      id: 8,
      tipo: "narracion",
      modulo: "Módulo 3: Buscapalabras del reciclaje",
      texto: "Estas son algunas palabras clave que vamos a usar todo el tiempo cuando hablamos de reciclaje. Buscalas en la sopa de letras.",
      audio: "assets/audio/m03_intro.mp3",
      imagen: "assets/images/modulo3_palabras.jpg"
    },

    // 8. SOPA DE LETRAS
    {
      id: 9,
      tipo: "sopaDeLetras",
      modulo: "Módulo 3: Buscapalabras del reciclaje",
      instruccion: "Buscá en la sopa de letras: reciclar, plástico, vidrio, cartón, orgánico y ambiente. Tocá la primera letra y después la última letra de cada palabra.",
      audio: "assets/audio/m03_instruccion_sopa.mp3",
      palabras: ["RECICLAR", "PLÁSTICO", "VIDRIO", "CARTÓN", "ORGÁNICO", "AMBIENTE"],
      audiosPalabras: {
        "RECICLAR": "assets/audio/palabra_reciclar.mp3",
        "PLÁSTICO": "assets/audio/palabra_plastico.mp3",
        "VIDRIO": "assets/audio/palabra_vidrio.mp3",
        "CARTÓN": "assets/audio/palabra_carton.mp3",
        "ORGÁNICO": "assets/audio/palabra_organico.mp3",
        "AMBIENTE": "assets/audio/palabra_ambiente.mp3"
      }
    },

    // 9. INTRO MODULO 4
    {
      id: 10,
      tipo: "narracion",
      modulo: "Módulo 4: El tiempo de la naturaleza",
      texto: "Cuando tiramos algo, no desaparece enseguida. Cada material tarda un tiempo distinto en descomponerse en la naturaleza, ¡y algunos tardan muchísimos años!",
      audio: "assets/audio/m04_intro.mp3",
      imagen: "assets/images/modulo4_tiempo.jpg"
    },

    // 10. ASOCIAR: residuo <-> tiempo de descomposicion
    {
      id: 11,
      tipo: "asociar",
      modulo: "Módulo 4: El tiempo de la naturaleza",
      instruccion: "Uní cada residuo con el tiempo que tarda en descomponerse.",
      audio: "assets/audio/m04_instruccion_asociar.mp3",
      imagen: "assets/images/modulo4_tiempo.jpg",
      pares: [
        { concepto: "BOTELLA DE PLÁSTICO", funcion: "450 AÑOS", audioConcepto: "assets/audio/desc_botella_plastico.mp3", audioFuncion: "assets/audio/desc_450.mp3" },
        { concepto: "LATA DE ALUMINIO", funcion: "200 AÑOS", audioConcepto: "assets/audio/desc_lata_aluminio.mp3", audioFuncion: "assets/audio/desc_200.mp3" },
        { concepto: "BOTELLA DE VIDRIO", funcion: "4000 AÑOS", audioConcepto: "assets/audio/desc_botella_vidrio.mp3", audioFuncion: "assets/audio/desc_4000.mp3" },
        { concepto: "CÁSCARA DE BANANA", funcion: "2 AÑOS", audioConcepto: "assets/audio/desc_cascara_banana.mp3", audioFuncion: "assets/audio/desc_2anios.mp3" },
        { concepto: "PAPEL", funcion: "3 MESES", audioConcepto: "assets/audio/desc_papel.mp3", audioFuncion: "assets/audio/desc_3meses.mp3" },
        { concepto: "CHICLE", funcion: "5 AÑOS", audioConcepto: "assets/audio/desc_chicle.mp3", audioFuncion: "assets/audio/desc_5anios.mp3" }
      ]
    },

    // 11. INTRO MODULO 5
    {
      id: 12,
      tipo: "narracion",
      modulo: "Módulo 5: Frases para reflexionar",
      texto: "Vamos a armar algunas frases importantes sobre el cuidado del ambiente. Ordená las palabras para descubrirlas.",
      audio: "assets/audio/m05_intro.mp3",
      imagen: "assets/images/modulo5_frases.jpg"
    },

    // 12-16. ORDENAR (5 frases)
    {
      id: 13,
      tipo: "ordenar",
      modulo: "Módulo 5: Frases para reflexionar",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m05_instruccion_ordenar.mp3",
      imagen: "assets/images/frase1_planeta.jpg",
      items: ["Reciclar", "ayuda", "a", "cuidar", "el", "planeta."],
      oracionAudio: "assets/audio/m05_frase1.mp3"
    },
    {
      id: 14,
      tipo: "ordenar",
      modulo: "Módulo 5: Frases para reflexionar",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m05_instruccion_corta.mp3",
      imagen: "assets/images/frase2_contenedores.jpg",
      items: ["Cada", "residuo", "tiene", "su", "contenedor", "correcto."],
      oracionAudio: "assets/audio/m05_frase2.mp3"
    },
    {
      id: 15,
      tipo: "ordenar",
      modulo: "Módulo 5: Frases para reflexionar",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m05_instruccion_corta.mp3",
      imagen: "assets/images/frase3_vidrio.jpg",
      items: ["El", "vidrio", "se", "puede", "reciclar", "una", "y", "otra", "vez."],
      oracionAudio: "assets/audio/m05_frase3.mp3"
    },
    {
      id: 16,
      tipo: "ordenar",
      modulo: "Módulo 5: Frases para reflexionar",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m05_instruccion_corta.mp3",
      imagen: "assets/images/portada.jpg",
      items: ["Separar", "la", "basura", "es", "un", "hábito", "importante."],
      oracionAudio: "assets/audio/m05_frase4.mp3"
    },
    {
      id: 17,
      tipo: "ordenar",
      modulo: "Módulo 5: Frases para reflexionar",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m05_instruccion_corta.mp3",
      imagen: "assets/images/frase5_erres.jpg",
      items: ["Reducir,", "reutilizar", "y", "reciclar", "son", "las", "tres", "erres."],
      oracionAudio: "assets/audio/m05_frase5.mp3"
    },

    // 17. INTRO MODULO 6
    {
      id: 18,
      tipo: "narracion",
      modulo: "Módulo 6: Mitos y verdades",
      texto: "Hay muchas ideas equivocadas sobre el reciclaje. Vamos a descubrir qué es verdad y qué es mito.",
      audio: "assets/audio/m06_intro.mp3",
      imagen: "assets/images/modulo6_mitos.jpg"
    },

    // 18. MULTIPLE (Verdadero o Falso)
    {
      id: 19,
      tipo: "multiple",
      modulo: "Módulo 6: Mitos y verdades",
      preguntas: [
        {
          pregunta: "El vidrio se puede reciclar infinitas veces.",
          audio: "assets/audio/m06_q1.mp3",
          imagen: "assets/images/vf_vidrio.jpg",
          opciones: ["VERDADERO", "FALSO"],
          correcta: "VERDADERO",
          audioConfirma: "assets/audio/m06_confirm_q1.mp3"
        },
        {
          pregunta: "Una pizza con grasa se puede reciclar en el cartón.",
          audio: "assets/audio/m06_q2.mp3",
          imagen: "assets/images/vf_pizza.jpg",
          opciones: ["VERDADERO", "FALSO"],
          correcta: "FALSO",
          audioConfirma: "assets/audio/m06_confirm_q2.mp3"
        },
        {
          pregunta: "Las pilas se pueden tirar en la basura común.",
          audio: "assets/audio/m06_q3.mp3",
          imagen: "assets/images/vf_pilas.jpg",
          opciones: ["VERDADERO", "FALSO"],
          correcta: "FALSO",
          audioConfirma: "assets/audio/m06_confirm_q3.mp3"
        },
        {
          pregunta: "Separar los residuos ayuda a cuidar los recursos naturales.",
          audio: "assets/audio/m06_q4.mp3",
          imagen: "assets/images/vf_separar.jpg",
          opciones: ["VERDADERO", "FALSO"],
          correcta: "VERDADERO",
          audioConfirma: "assets/audio/m06_confirm_q4.mp3"
        },
        {
          pregunta: "El papel se puede reciclar muchas veces, pero no de forma infinita.",
          audio: "assets/audio/m06_q5.mp3",
          imagen: "assets/images/vf_papel.jpg",
          opciones: ["VERDADERO", "FALSO"],
          correcta: "VERDADERO",
          audioConfirma: "assets/audio/m06_confirm_q5.mp3"
        },
        {
          pregunta: "Tirar basura en la calle no afecta a los animales.",
          audio: "assets/audio/m06_q6.mp3",
          imagen: "assets/images/residuo_patito_goma.jpg",
          opciones: ["VERDADERO", "FALSO"],
          correcta: "FALSO",
          audioConfirma: "assets/audio/m06_confirm_q6.mp3"
        }
      ]
    },

    // 19. CIERRE
    {
      id: 20,
      tipo: "cierre",
      texto: "¡Muy bien! Ahora sabés cómo clasificar los residuos y por qué es tan importante reciclar. Cada pequeña acción ayuda a cuidar nuestro planeta.",
      audio: "assets/audio/cierre.mp3",
      imagen: "assets/images/cierre.jpg"
    }
  ]
};
