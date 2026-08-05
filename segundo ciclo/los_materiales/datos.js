// datos.js — "Los Materiales" (version ilustrada, 6 modulos) — 4to grado primaria
const DATOS = {
  titulo: "Los Materiales",
  fotoPerfil: "assets/images/profe.jpg",
  contactoTexto: "Informática Educativa — Prof. Gustavo Aguilar",
  contactoMail: "profegustaaguilar@gmail.com",
  pantallas: [

    // 1. PORTADA
    {
      id: 1,
      tipo: "portada",
      titulo: "Los Materiales",
      subtitulo: "Descubrimos de qué están hechas las cosas",
      imagen: "assets/images/mascota_portada.jpg"
    },

    // 2. INTRO MODULO 1
    {
      id: 2,
      tipo: "narracion",
      modulo: "Módulo 1: Explorar",
      texto: "¡Hola, científico o científica! Vamos a investigar de qué están hechas las cosas. Tocá cada objeto para descubrir su material.",
      audio: "assets/audio/m01_intro.mp3",
      imagen: "assets/images/mascota_portada.jpg"
    },

    // 3. FLIPCARDS MODULO 1
    {
      id: 3,
      tipo: "flipcards",
      modulo: "Módulo 1: Explorar",
      instruccion: "Tocá cada objeto para descubrir de qué material está hecho.",
      items: [
        { frente: "Mesa", imagen: "assets/images/mesa_madera.jpg", dorsoTexto: "Madera", audio: "assets/audio/m01_mesa.mp3" },
        { frente: "Vaso", imagen: "assets/images/vaso_vidrio.jpg", dorsoTexto: "Vidrio", audio: "assets/audio/m01_vaso.mp3" },
        { frente: "Mochila", imagen: "assets/images/mochila.jpg", dorsoTexto: "Tela", audio: "assets/audio/m01_mochila.mp3" },
        { frente: "Remera", imagen: "assets/images/remera.jpg", dorsoTexto: "Tela", audio: "assets/audio/m01_remera.mp3" },
        { frente: "Cuchara", imagen: "assets/images/cuchara.jpg", dorsoTexto: "Metal", audio: "assets/audio/m01_cuchara.mp3" },
        { frente: "Ventana", imagen: "assets/images/ventana.jpg", dorsoTexto: "Vidrio", audio: "assets/audio/m01_ventana.mp3" }
      ]
    },

    // 4. INTRO MODULO 2
    {
      id: 4,
      tipo: "narracion",
      modulo: "Módulo 2: ¿De dónde vienen?",
      texto: "Los materiales se clasifican según su origen en naturales y artificiales. Los naturales pueden ser de origen mineral, animal o vegetal.",
      audio: "assets/audio/m02_intro.mp3",
      imagen: "assets/images/modulo2_origen.jpg"
    },

    // 5. CLASIFICAR — Naturales vs Artificiales
    {
      id: 5,
      tipo: "clasificar",
      modulo: "Módulo 2: ¿De dónde vienen?",
      instruccion: "Tocá cada palabra y después tocá la categoría correcta: natural o artificial.",
      audio: "assets/audio/m02_instruccion_clasificar1.mp3",
      imagen: "assets/images/modulo2_origen.jpg",
      categorias: ["NATURAL", "ARTIFICIAL"],
      items: [
        { texto: "PIEDRA", categoria: "NATURAL", audio: "assets/audio/piedra.mp3", audioConfirma: "assets/audio/m02_confirm_piedra.mp3" },
        { texto: "AGUA", categoria: "NATURAL", audio: "assets/audio/agua.mp3", audioConfirma: "assets/audio/m02_confirm_agua.mp3" },
        { texto: "ALGODÓN", categoria: "NATURAL", audio: "assets/audio/algodon.mp3", audioConfirma: "assets/audio/m02_confirm_algodon.mp3" },
        { texto: "LANA", categoria: "NATURAL", audio: "assets/audio/lana.mp3", audioConfirma: "assets/audio/m02_confirm_lana.mp3" },
        { texto: "LAPTOP", categoria: "ARTIFICIAL", audio: "assets/audio/laptop.mp3", audioConfirma: "assets/audio/m02_confirm_laptop.mp3" },
        { texto: "CELULAR", categoria: "ARTIFICIAL", audio: "assets/audio/celular.mp3", audioConfirma: "assets/audio/m02_confirm_celular.mp3" },
        { texto: "VIDRIO", categoria: "ARTIFICIAL", audio: "assets/audio/vidrio.mp3", audioConfirma: "assets/audio/m02_confirm_vidrio.mp3" },
        { texto: "SILLA DE PLÁSTICO", categoria: "ARTIFICIAL", audio: "assets/audio/silla_plastico.mp3", audioConfirma: "assets/audio/m02_confirm_silla_plastico.mp3" }
      ]
    },

    // 6. CLASIFICAR — por origen
    {
      id: 6,
      tipo: "clasificar",
      modulo: "Módulo 2: ¿De dónde vienen?",
      instruccion: "Ahora clasificá cada material según su origen: mineral, animal o vegetal.",
      audio: "assets/audio/m02_instruccion_clasificar2.mp3",
      imagen: "assets/images/modulo2_origen.jpg",
      categorias: ["MINERAL", "ANIMAL", "VEGETAL"],
      items: [
        { texto: "PETRÓLEO", categoria: "MINERAL", audio: "assets/audio/petroleo.mp3", audioConfirma: "assets/audio/m02b_confirm_petroleo.mp3" },
        { texto: "GAS", categoria: "MINERAL", audio: "assets/audio/gas.mp3", audioConfirma: "assets/audio/m02b_confirm_gas.mp3" },
        { texto: "ARENA", categoria: "MINERAL", audio: "assets/audio/arena.mp3", audioConfirma: "assets/audio/m02b_confirm_arena.mp3" },
        { texto: "LANA", categoria: "ANIMAL", audio: "assets/audio/lana.mp3", audioConfirma: "assets/audio/m02b_confirm_lana.mp3" },
        { texto: "CUERO", categoria: "ANIMAL", audio: "assets/audio/cuero.mp3", audioConfirma: "assets/audio/m02b_confirm_cuero.mp3" },
        { texto: "SEDA", categoria: "ANIMAL", audio: "assets/audio/seda.mp3", audioConfirma: "assets/audio/m02b_confirm_seda.mp3" },
        { texto: "PASTO", categoria: "VEGETAL", audio: "assets/audio/pasto.mp3", audioConfirma: "assets/audio/m02b_confirm_pasto.mp3" },
        { texto: "ALGODÓN", categoria: "VEGETAL", audio: "assets/audio/algodon.mp3", audioConfirma: "assets/audio/m02b_confirm_algodon.mp3" },
        { texto: "MADERA", categoria: "VEGETAL", audio: "assets/audio/madera.mp3", audioConfirma: "assets/audio/m02b_confirm_madera.mp3" }
      ]
    },

    // 7. SOPA DE LETRAS
    {
      id: 7,
      tipo: "sopaDeLetras",
      modulo: "Módulo 2: ¿De dónde vienen?",
      instruccion: "Buscá en la sopa de letras las siguientes palabras: mineral, animal, vegetal y artificial. Tocá la primera letra y después la última letra de cada palabra.",
      audio: "assets/audio/m02_instruccion_sopa.mp3",
      palabras: ["MINERAL", "ANIMAL", "VEGETAL", "ARTIFICIAL"],
      audiosPalabras: {
        "MINERAL": "assets/audio/palabra_mineral.mp3",
        "ANIMAL": "assets/audio/palabra_animal.mp3",
        "VEGETAL": "assets/audio/palabra_vegetal.mp3",
        "ARTIFICIAL": "assets/audio/palabra_artificial.mp3"
      }
    },

    // 8. INTRO MODULO 3
    {
      id: 8,
      tipo: "narracion",
      modulo: "Módulo 3: Laboratorio de propiedades",
      texto: "Los materiales tienen distintas propiedades: pueden ser rígidos o flexibles, opacos o transparentes, duros o blandos, rugosos o lisos.",
      audio: "assets/audio/m03_intro.mp3",
      imagen: "assets/images/modulo3_propiedades.jpg"
    },

    // 9-12. CLASIFICARUNO x4
    {
      id: 9,
      tipo: "clasificarUno",
      modulo: "Módulo 3: Laboratorio de propiedades",
      instruccion: "Mirá cada objeto y decidí si el material con el que está hecho es rígido o flexible.",
      audio: "assets/audio/m03_instruccion_rigido_flexible.mp3",
      categorias: ["RÍGIDO", "FLEXIBLE"],
      audioConfirma: { "RÍGIDO": "assets/audio/confirm_rigido.mp3", "FLEXIBLE": "assets/audio/confirm_flexible.mp3" },
      items: [
        { imagen: "assets/images/jarra_barro.jpg", etiqueta: "Jarra de barro", categoria: "RÍGIDO", audioNombre: "assets/audio/m03_nombre_jarra_barro.mp3" },
        { imagen: "assets/images/buzo_lana.jpg", etiqueta: "Buzo de lana", categoria: "FLEXIBLE", audioNombre: "assets/audio/m03_nombre_buzo_lana.mp3" }
      ]
    },
    {
      id: 10,
      tipo: "clasificarUno",
      modulo: "Módulo 3: Laboratorio de propiedades",
      instruccion: "Mirá cada objeto y decidí si el material con el que está hecho es opaco o transparente.",
      audio: "assets/audio/m03_instruccion_opaco_transparente.mp3",
      categorias: ["OPACO", "TRANSPARENTE"],
      audioConfirma: { "OPACO": "assets/audio/confirm_opaco.mp3", "TRANSPARENTE": "assets/audio/confirm_transparente.mp3" },
      items: [
        { imagen: "assets/images/mesa_madera.jpg", etiqueta: "Mesa de madera", categoria: "OPACO", audioNombre: "assets/audio/m03_nombre_mesa_madera.mp3" },
        { imagen: "assets/images/vaso_vidrio.jpg", etiqueta: "Vaso de vidrio", categoria: "TRANSPARENTE", audioNombre: "assets/audio/m03_nombre_vaso_vidrio.mp3" }
      ]
    },
    {
      id: 11,
      tipo: "clasificarUno",
      modulo: "Módulo 3: Laboratorio de propiedades",
      instruccion: "Mirá cada objeto y decidí si el material con el que está hecho es duro o blando.",
      audio: "assets/audio/m03_instruccion_duro_blando.mp3",
      categorias: ["DURO", "BLANDO"],
      audioConfirma: { "DURO": "assets/audio/confirm_duro.mp3", "BLANDO": "assets/audio/confirm_blando.mp3" },
      items: [
        { imagen: "assets/images/guantes_tela.jpg", etiqueta: "Guantes de tela", categoria: "BLANDO", audioNombre: "assets/audio/m03_nombre_guantes_tela.mp3" },
        { imagen: "assets/images/trompeta.jpg", etiqueta: "Trompeta de metal", categoria: "DURO", audioNombre: "assets/audio/m03_nombre_trompeta_metal.mp3" }
      ]
    },
    {
      id: 12,
      tipo: "clasificarUno",
      modulo: "Módulo 3: Laboratorio de propiedades",
      instruccion: "Mirá cada objeto y decidí si el material con el que está hecho es rugoso o liso.",
      audio: "assets/audio/m03_instruccion_rugoso_liso.mp3",
      categorias: ["RUGOSO", "LISO"],
      audioConfirma: { "RUGOSO": "assets/audio/confirm_rugoso.mp3", "LISO": "assets/audio/confirm_liso.mp3" },
      items: [
        { imagen: "assets/images/esponja.jpg", etiqueta: "Esponja de cocina", categoria: "RUGOSO", audioNombre: "assets/audio/m03_nombre_esponja_cocina.mp3" },
        { imagen: "assets/images/cartulinas.jpg", etiqueta: "Cartulinas de colores", categoria: "LISO", audioNombre: "assets/audio/m03_nombre_cartulinas.mp3" }
      ]
    },

    // 13. MEMOJUEGO — material <-> propiedad
    {
      id: 13,
      tipo: "memojuego",
      modulo: "Módulo 3: Laboratorio de propiedades",
      instruccion: "Encontrá las parejas. Tocá una carta y después otra para ver si el material coincide con su propiedad.",
      audio: "assets/audio/m03_instruccion_memo.mp3",
      pares: [
        { a: { tipo: "imagen", valor: "assets/images/jarra_barro.jpg", etiqueta: "Jarra de barro", audio: "assets/audio/m03_nombre_jarra_barro.mp3" }, b: { tipo: "texto", valor: "RÍGIDO", audio: "assets/audio/m03_palabra_rigido.mp3" }, audioConfirma: "assets/audio/m03_memo_confirm_jarra.mp3" },
        { a: { tipo: "imagen", valor: "assets/images/buzo_lana.jpg", etiqueta: "Buzo de lana", audio: "assets/audio/m03_nombre_buzo_lana.mp3" }, b: { tipo: "texto", valor: "FLEXIBLE", audio: "assets/audio/m03_palabra_flexible.mp3" }, audioConfirma: "assets/audio/m03_memo_confirm_buzo.mp3" },
        { a: { tipo: "imagen", valor: "assets/images/vaso_vidrio.jpg", etiqueta: "Vaso de vidrio", audio: "assets/audio/m03_nombre_vaso_vidrio.mp3" }, b: { tipo: "texto", valor: "TRANSPARENTE", audio: "assets/audio/m03_palabra_transparente.mp3" }, audioConfirma: "assets/audio/m03_memo_confirm_vaso.mp3" },
        { a: { tipo: "imagen", valor: "assets/images/banda_elastica.jpg", etiqueta: "Banda elástica", audio: "assets/audio/m03_nombre_banda_elastica.mp3" }, b: { tipo: "texto", valor: "ELÁSTICO", audio: "assets/audio/m03_palabra_elastico.mp3" }, audioConfirma: "assets/audio/m03_memo_confirm_banda.mp3" },
        { a: { tipo: "imagen", valor: "assets/images/trompeta.jpg", etiqueta: "Trompeta", audio: "assets/audio/m03_nombre_trompeta.mp3" }, b: { tipo: "texto", valor: "DURO", audio: "assets/audio/m03_palabra_duro.mp3" }, audioConfirma: "assets/audio/m03_memo_confirm_trompeta.mp3" },
        { a: { tipo: "imagen", valor: "assets/images/esponja.jpg", etiqueta: "Esponja", audio: "assets/audio/m03_nombre_esponja.mp3" }, b: { tipo: "texto", valor: "RUGOSO", audio: "assets/audio/m03_palabra_rugoso.mp3" }, audioConfirma: "assets/audio/m03_memo_confirm_esponja.mp3" }
      ]
    },

    // 14. ASOCIAR
    {
      id: 14,
      tipo: "asociar",
      modulo: "Módulo 3: Laboratorio de propiedades",
      instruccion: "Uní cada material con la propiedad que le corresponde.",
      audio: "assets/audio/m03_instruccion_asociar.mp3",
      imagen: "assets/images/modulo3_propiedades.jpg",
      pares: [
        { concepto: "TELA", funcion: "FLEXIBLE", audioConcepto: "assets/audio/asoc_tela.mp3", audioFuncion: "assets/audio/asoc_flexible.mp3" },
        { concepto: "PLASTILINA", funcion: "PLÁSTICO", audioConcepto: "assets/audio/asoc_plastilina.mp3", audioFuncion: "assets/audio/asoc_plastico.mp3" },
        { concepto: "VIDRIO", funcion: "FRÁGIL", audioConcepto: "assets/audio/asoc_vidrio.mp3", audioFuncion: "assets/audio/asoc_fragil.mp3" },
        { concepto: "BANDA ELÁSTICA", funcion: "ELÁSTICO", audioConcepto: "assets/audio/asoc_banda_elastica.mp3", audioFuncion: "assets/audio/asoc_elastico.mp3" },
        { concepto: "CEMENTO", funcion: "DURO", audioConcepto: "assets/audio/asoc_cemento.mp3", audioFuncion: "assets/audio/asoc_duro.mp3" },
        { concepto: "TIZA", funcion: "BLANDO", audioConcepto: "assets/audio/asoc_tiza.mp3", audioFuncion: "assets/audio/asoc_blando.mp3" }
      ]
    },

    // 15. ORDENAR (puzzle de texto)
    {
      id: 15,
      tipo: "ordenar",
      modulo: "Módulo 3: Laboratorio de propiedades",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m03_instruccion_ordenar.mp3",
      imagen: "assets/images/modulo3_propiedades.jpg",
      items: ["Los", "materiales", "son", "la", "materia", "prima", "de", "los", "objetos."],
      oracionAudio: "assets/audio/m03_ordenar_oracion.mp3"
    },

    // 16. INTRO MODULO 4
    {
      id: 16,
      tipo: "narracion",
      modulo: "Módulo 4: Detectives de materiales",
      texto: "Leé las pistas y descubrí de qué material está hecho cada objeto.",
      audio: "assets/audio/m04_intro.mp3",
      imagen: "assets/images/modulo4_detective.jpg"
    },

    // 17-19. DETECTIVE x3
    {
      id: 17,
      tipo: "detective",
      modulo: "Módulo 4: Detectives de materiales",
      pistas: ["Soy una ventana.", "Soy rígido.", "Soy liso.", "Dejo pasar la luz."],
      pregunta: "¿De qué material estoy hecha?",
      audio: "assets/audio/m04_caso1_pistas.mp3",
      imagen: "assets/images/ventana.jpg",
      opciones: ["VIDRIO", "MADERA", "TELA", "METAL"],
      correcta: "VIDRIO",
      audioConfirma: "assets/audio/m04_confirm_ventana.mp3"
    },
    {
      id: 18,
      tipo: "detective",
      modulo: "Módulo 4: Detectives de materiales",
      pistas: ["Soy un abrigo.", "Soy flexible.", "Soy suave.", "Me tejen con hilos que vienen de un animal."],
      pregunta: "¿De qué material estoy hecho?",
      audio: "assets/audio/m04_caso2_pistas.mp3",
      imagen: "assets/images/abrigo_lana.jpg",
      opciones: ["LANA", "VIDRIO", "METAL", "PIEDRA"],
      correcta: "LANA",
      audioConfirma: "assets/audio/m04_confirm_abrigo.mp3"
    },
    {
      id: 19,
      tipo: "detective",
      modulo: "Módulo 4: Detectives de materiales",
      pistas: ["Soy una mesa.", "Soy rígida.", "Soy dura.", "Vengo del tronco de un árbol."],
      pregunta: "¿De qué material estoy hecha?",
      audio: "assets/audio/m04_caso3_pistas.mp3",
      imagen: "assets/images/mesa_madera.jpg",
      opciones: ["MADERA", "VIDRIO", "TELA", "PLÁSTICO"],
      correcta: "MADERA",
      audioConfirma: "assets/audio/m04_confirm_mesa.mp3"
    },

    // 20. INTRO MODULO 5
    {
      id: 20,
      tipo: "narracion",
      modulo: "Módulo 5: La Balanza",
      texto: "La masa nos ayuda a comparar objetos. Para medir la masa usamos balanzas. Elegí en cada ronda el objeto que tiene mayor masa.",
      audio: "assets/audio/m05_intro.mp3",
      imagen: "assets/images/modulo5_balanza.jpg"
    },

    // 21. BALANZA
    {
      id: 21,
      tipo: "balanza",
      modulo: "Módulo 5: La Balanza",
      rondas: [
        {
          pregunta: "¿Cuál tiene mayor masa: la esponja o la piedra?",
          audio: "assets/audio/m05_ronda1.mp3",
          opciones: [
            { texto: "Esponja", imagen: "assets/images/esponja.jpg" },
            { texto: "Piedra", imagen: "assets/images/piedra.jpg" }
          ],
          correcta: "Piedra",
          audioConfirma: "assets/audio/m05_confirm_ronda1.mp3"
        },
        {
          pregunta: "¿Cuál tiene mayor masa: la pluma o la piedra?",
          audio: "assets/audio/m05_ronda2.mp3",
          opciones: [
            { texto: "Pluma", imagen: "assets/images/pluma.jpg" },
            { texto: "Piedra", imagen: "assets/images/piedra.jpg" }
          ],
          correcta: "Piedra",
          audioConfirma: "assets/audio/m05_confirm_ronda2.mp3"
        }
      ]
    },

    // 22. INTRO MODULO 6
    {
      id: 22,
      tipo: "narracion",
      modulo: "Módulo 6: Gran desafío final",
      texto: "¡Es hora de demostrar todo lo que aprendiste! Contestá estas preguntas para poner a prueba tus conocimientos.",
      audio: "assets/audio/m06_intro.mp3",
      imagen: "assets/images/modulo6_desafio.jpg"
    },

    // 23. MULTIPLE — desafío final
    {
      id: 23,
      tipo: "multiple",
      modulo: "Módulo 6: Gran desafío final",
      instruccion: "Elegí la opción correcta en cada pregunta.",
      imagen: "assets/images/modulo6_desafio.jpg",
      preguntas: [
        { pregunta: "¿Cuál material es flexible?", audio: "assets/audio/m06_q1.mp3", opciones: ["LANA", "VIDRIO", "PIEDRA", "METAL"], correcta: "LANA", audioConfirma: "assets/audio/m06_confirm_q1.mp3" },
        { pregunta: "La madera tiene origen...", audio: "assets/audio/m06_q2.mp3", opciones: ["VEGETAL", "MINERAL", "ANIMAL", "ARTIFICIAL"], correcta: "VEGETAL", audioConfirma: "assets/audio/m06_confirm_q2.mp3" },
        { pregunta: "¿Cuál material puede ser transparente?", audio: "assets/audio/m06_q3.mp3", opciones: ["VIDRIO", "MADERA", "TELA", "CUERO"], correcta: "VIDRIO", audioConfirma: "assets/audio/m06_confirm_q3.mp3" },
        { pregunta: "La lana tiene origen...", audio: "assets/audio/m06_q4.mp3", opciones: ["ANIMAL", "MINERAL", "VEGETAL", "ARTIFICIAL"], correcta: "ANIMAL", audioConfirma: "assets/audio/m06_confirm_q4.mp3" },
        { pregunta: "¿Cuál material es artificial?", audio: "assets/audio/m06_q5.mp3", opciones: ["PLÁSTICO", "MADERA", "LANA", "ALGODÓN"], correcta: "PLÁSTICO", audioConfirma: "assets/audio/m06_confirm_q5.mp3" },
        { pregunta: "¿Con qué comparamos la masa de los objetos?", audio: "assets/audio/m06_q6.mp3", opciones: ["LA BALANZA", "EL TERMÓMETRO", "LA REGLA", "EL RELOJ"], correcta: "LA BALANZA", audioConfirma: "assets/audio/m06_confirm_q6.mp3" },
        { pregunta: "¿Cuál material es de origen animal?", audio: "assets/audio/m06_q7.mp3", opciones: ["CUERO", "MADERA", "ARENA", "PLÁSTICO"], correcta: "CUERO", audioConfirma: "assets/audio/m06_confirm_q7.mp3" },
        { pregunta: "Una ventana de vidrio tiene origen...", audio: "assets/audio/m06_q8.mp3", opciones: ["MINERAL", "VEGETAL", "ANIMAL", "ARTIFICIAL"], correcta: "MINERAL", audioConfirma: "assets/audio/m06_confirm_q8.mp3" }
      ]
    },

    // 24-28. MÓDULO 7 — Repaso de definiciones (5 puzzles de texto)
    {
      id: 24,
      tipo: "ordenar",
      modulo: "Módulo 7: Repaso de definiciones",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m03_instruccion_ordenar.mp3",
      imagen: "assets/images/ventana.jpg",
      items: ["El", "vidrio", "es", "un", "material", "transparente", "y", "frágil."],
      oracionAudio: "assets/audio/m07_ordenar1.mp3"
    },
    {
      id: 25,
      tipo: "ordenar",
      modulo: "Módulo 7: Repaso de definiciones",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m03_instruccion_ordenar.mp3",
      imagen: "assets/images/madera_tronco.jpg",
      items: ["La", "madera", "se", "obtiene", "de", "los", "árboles."],
      oracionAudio: "assets/audio/m07_ordenar2.mp3"
    },
    {
      id: 26,
      tipo: "ordenar",
      modulo: "Módulo 7: Repaso de definiciones",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m03_instruccion_ordenar.mp3",
      imagen: "assets/images/objetos_plastico.jpg",
      items: ["El", "plástico", "es", "un", "material", "artificial."],
      oracionAudio: "assets/audio/m07_ordenar3.mp3"
    },
    {
      id: 27,
      tipo: "ordenar",
      modulo: "Módulo 7: Repaso de definiciones",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m03_instruccion_ordenar.mp3",
      imagen: "assets/images/herramientas_metal.jpg",
      items: ["El", "metal", "es", "duro", "y", "resistente", "al", "golpe."],
      oracionAudio: "assets/audio/m07_ordenar4.mp3"
    },
    {
      id: 28,
      tipo: "ordenar",
      modulo: "Módulo 7: Repaso de definiciones",
      instruccion: "Las palabras están desordenadas. Tocalas en el orden correcto para formar la oración. Tené en cuenta que las oraciones empiezan con mayúscula y terminan con un punto.",
      audio: "assets/audio/m03_instruccion_ordenar.mp3",
      imagen: "assets/images/oveja_lana.jpg",
      items: ["La", "lana", "se", "obtiene", "de", "la", "oveja."],
      oracionAudio: "assets/audio/m07_ordenar5.mp3"
    },

    // 29. CIERRE
    {
      id: 29,
      tipo: "cierre",
      texto: "¡Terminaste el desafío! Muy bien hecho, científico o científica.",
      audio: "assets/audio/cierre_final.mp3",
      imagen: "assets/images/mascota_cierre.jpg"
    }
  ]
};
