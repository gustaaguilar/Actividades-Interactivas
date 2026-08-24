// ============================================================
// EL ESPEJO AFRICANO - Segunda etapa
// San Martín, el Cruce de los Andes y la libertad
// datos.js - Contenido de todas las pantallas (v3 — ajustes de revisión)
// ============================================================

var DATOS = {

  titulo: "El Espejo Africano",
  subtitulo: "San Martín, el Cruce de los Andes y la libertad — Segunda etapa de la novela",
  nivel: "Secundario · CENS Adultos",

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
      imagen: "assets/images/01_portada.jpg",
      titulo: "El Espejo Africano",
      subtitulo: "San Martín, el Cruce de los Andes y la libertad — Segunda etapa de la novela"
    },

    // ---------- 2. ¿DE QUÉ SE TRATA ESTA ETAPA? ----------
    {
      id: 2,
      tipo: "narracion",
      titulo: "¿De qué se trata esta etapa?",
      texto: "En la primera etapa conocimos el origen de la protagonista y su llegada, esclavizada, a Mendoza. Ahora avanzamos en el tiempo: estamos en 1818, y la historia se cruza con uno de los episodios más importantes de nuestra historia americana.<br><br>San Martín está organizando el Cruce de los Andes para liberar a Chile y asegurar la independencia sudamericana. Vamos a conocer ese contexto para entender mejor lo que le pasa a Dorel, uno de los personajes de la novela, y para poder leer con otra mirada el reencuentro que se da más adelante en el libro.<br><br>Como siempre: esto no reemplaza la lectura, la prepara.",
      audio: "assets/audio/p02_narracion_apertura.mp3"
    },

    // ---------- 3. RECORDEMOS LA PRIMERA PARTE ----------
    // AJUSTE #1: reverso de cada tarjeta dividido en imagen + texto
    {
      id: 3,
      tipo: "flipcards",
      titulo: "Recordemos la primera parte",
      consigna: "Tocá cada tarjeta para repasar lo que vimos en la primera etapa.",
      audio: "assets/audio/p03_consigna_repaso.mp3",
      tarjetas: [
        { frente: "El espejo", reverso: "Un pequeño espejo tallado en ébano conecta a distintos personajes a lo largo de dos siglos.", imagen: "assets/images/09_flip_espejo.jpg", audio: "assets/audio/p03_t1.mp3" },
        { frente: "El viaje forzado", reverso: "La protagonista fue capturada en África, cruzó el Atlántico y llegó esclavizada al puerto de Buenos Aires.", imagen: "assets/images/10_flip_viaje.jpg", audio: "assets/audio/p03_t2.mp3" },
        { frente: "Mendoza", reverso: "Fue vendida y trasladada a una hacienda rural mendocina, donde creció.", imagen: "assets/images/11_flip_mendoza.jpg", audio: "assets/audio/p03_t3.mp3" },
        { frente: "El tema central", reverso: "La novela plantea, desde el comienzo, distintas formas de libertad y de falta de libertad.", imagen: "assets/images/12_flip_tema_libertad.jpg", audio: "assets/audio/p03_t4.mp3" }
      ]
    },

    // ---------- 4. ESPAÑA, 1818 — CONTEXTO DE GUERRA ----------
    // AJUSTE #2 (parte a): primer párrafo de la vieja pantalla 4, ahora solo
    {
      id: 4,
      tipo: "narracion",
      titulo: "España, 1818",
      texto: "En 1818, España recién salía de años de guerra e invasión napoleónica. Muchos soldados españoles habían sido enviados, además, a pelear del otro lado del océano, contra los ejércitos que luchaban por la independencia americana.",
      audio: "assets/audio/p04a_guerra.mp3",
      imagen: "assets/images/21_guerra_napoleonica.jpg"
    },

    // ---------- 5. DOREL, EN VALENCIA ----------
    // AJUSTE #2 (parte b): segundo párrafo de la vieja pantalla 4
    {
      id: 5,
      tipo: "narracion",
      titulo: "Dorel, en Valencia",
      texto: "En Valencia, en una vieja casa de antigüedades, vivía Dorel: un joven huérfano criado por María Petra, la dueña del negocio. Ella lo mantenía encerrado, convencida de que el mundo estaba lleno de peligros —hasta le hablaba de moros que ya no existían hacía tres siglos—. Dorel no lo sabía todavía, pero estaba a punto de recibir, por unas pocas monedas, un objeto que iba a cambiarle la vida.",
      audio: "assets/audio/p04b_dorel.mp3",
      imagen: "assets/images/02_dorel.jpg"
    },

    // ---------- 6. LÍNEA DE TIEMPO INTERACTIVA: REVOLUCIÓN DE MAYO AL CRUCE DE LOS ANDES ----------
    // AJUSTE #3 — mecánica nueva, previa al "ordenar" de refuerzo
    {
      id: 6,
      tipo: "lineaTiempo",
      titulo: "Línea de tiempo: de la Revolución de Mayo al Cruce de los Andes",
      consigna: "Tocá cada punto de la línea de tiempo para conocer los hechos en orden.",
      audio: "assets/audio/plt1_consigna.mp3",
      puntos: [
        { icono: "🏛️", titulo: "1810 — Revolución de Mayo", texto: "Se forma el primer gobierno patrio en Buenos Aires." },
        { icono: "🏳️", titulo: "1812 — La bandera", texto: "Belgrano crea la bandera durante la guerra de independencia." },
        { icono: "🎖️", titulo: "1814 — San Martín en Cuyo", texto: "San Martín asume como gobernador de Cuyo, en Mendoza." },
        { icono: "⚔️", titulo: "1815-1817 — Se organiza el ejército", texto: "Se organiza en Mendoza el Ejército de los Andes." },
        { icono: "🏔️", titulo: "Enero de 1817 — El cruce", texto: "El ejército cruza la cordillera de los Andes." },
        { icono: "⚡", titulo: "Febrero de 1817 — Chacabuco", texto: "Batalla de Chacabuco: se abre el camino a Santiago de Chile." }
      ]
    },

    // ---------- 7. ORDENÁ LOS HECHOS: DE LA REVOLUCIÓN AL CRUCE ----------
    // AJUSTE #4: sin años en los ítems — ahora es refuerzo de la línea de tiempo anterior
    {
      id: 7,
      tipo: "ordenar",
      titulo: "Ahora, ordená vos estos hechos",
      consigna: "Sin mirar las fechas: tocá los hechos en el orden en que sucedieron.",
      audio: "assets/audio/p05_consigna_linea_tiempo.mp3",
      items: [
        { texto: "Se forma el primer gobierno patrio en Buenos Aires.", audio: "assets/audio/p05_i1.mp3" },
        { texto: "Belgrano crea la bandera durante la guerra de independencia.", audio: "assets/audio/p05_i2.mp3" },
        { texto: "San Martín asume como gobernador de Cuyo, en Mendoza.", audio: "assets/audio/p05_i3.mp3" },
        { texto: "Se organiza en Mendoza el Ejército de los Andes.", audio: "assets/audio/p05_i4.mp3" },
        { texto: "El ejército cruza la cordillera de los Andes.", audio: "assets/audio/p05_i5.mp3" },
        { texto: "Batalla de Chacabuco: se abre el camino a Santiago de Chile.", audio: "assets/audio/p05_i6.mp3" }
      ]
    },

    // ---------- 8. SAN MARTÍN Y EL EJÉRCITO DE LOS ANDES ----------
    // AJUSTE #6: reverso de cada tarjeta dividido en imagen + texto
    // AJUSTE #5: p06_consigna_sanmartin.mp3 se regenera (glitch en "...nuestra historia.")
    {
      id: 8,
      tipo: "flipcards",
      titulo: "San Martín y el Ejército de los Andes: la organización de la campaña",
      consigna: "Tocá cada tarjeta para conocer cómo se preparó una de las campañas militares más grandes de nuestra historia.",
      audio: "assets/audio/p06_consigna_sanmartin.mp3",
      imagen: "assets/images/03_sanmartin.jpg",
      tarjetas: [
        { frente: "Un pueblo entero se moviliza", reverso: "Mendoza aportó caballos, mulas, alimentos, armas y ropa. Las mujeres donaron joyas y cosieron uniformes para financiar la campaña.", imagen: "assets/images/13_flip_pueblo.jpg", audio: "assets/audio/p06_t1.mp3" },
        { frente: "Los Granaderos a Caballo", reverso: "Fue el regimiento de élite creado y entrenado por San Martín, símbolo de disciplina militar.", imagen: "assets/images/14_flip_granaderos.jpg", audio: "assets/audio/p06_t2.mp3" },
        { frente: "Aportes de la población afrodescendiente", reverso: "Muchos hombres esclavizados y libertos se sumaron al ejército; para varios de ellos, servir era también un camino posible hacia la libertad.", imagen: "assets/images/15_flip_afrodescendientes.jpg", audio: "assets/audio/p06_t3.mp3" },
        { frente: "Una donación especial", reverso: "En noviembre de 1816, en el campamento militar de Mendoza, una joven liberta se acercó a ofrecer lo único que tenía: un pequeño espejo tallado en ébano. El propio San Martín lo grabó con su firma para convertirlo en salvoconducto.", imagen: "assets/images/16_flip_donacion.jpg", audio: "assets/audio/p06_t4.mp3" }
      ]
    },

    // ---------- 9. MAPA INTERACTIVO: EL CRUCE DE LOS ANDES ----------
    // AJUSTE #7: imagen debajo del texto en cada popup
    {
      id: 9,
      tipo: "mapa",
      titulo: "El Cruce de los Andes",
      consigna: "Tocá cada punto del mapa para conocer el recorrido del Ejército de los Andes.",
      audio: "assets/audio/p07_consigna_mapa.mp3",
      imagenMapa: "assets/images/mapa_andes.jpg",
      puntos: [
        { x: 90, y: 47, titulo: "Mendoza", texto: "Punto de partida y organización del Ejército de los Andes, bajo el mando de San Martín.", imagen: "assets/images/17_mapa_mendoza.jpg", audio: "assets/audio/p07_pt1.mp3" },
        { x: 53, y: 27, titulo: "Paso de Los Patos", texto: "Ruta por donde avanzó el grueso del ejército, al mando del propio San Martín.", imagen: "assets/images/18_mapa_lospatos.jpg", audio: "assets/audio/p07_pt2.mp3" },
        { x: 53, y: 72, titulo: "Paso de Uspallata", texto: "Ruta por donde avanzó una columna secundaria, para dividir la atención del enemigo.", imagen: "assets/images/19_mapa_uspallata.jpg", audio: "assets/audio/p07_pt3.mp3" },
        { x: 17, y: 47, titulo: "Chacabuco (Chile)", texto: "Punto de encuentro de las columnas y escenario de la batalla que abrió el camino a la independencia chilena.", imagen: "assets/images/20_mapa_chacabuco.jpg", audio: "assets/audio/p07_pt4.mp3" }
      ]
    },

    // ---------- 10. EL MENSAJERO SE DETIENE EN LA POSTA ----------
    // AJUSTE #8 (parte a): primer párrafo de la vieja pantalla 8
    {
      id: 10,
      tipo: "narracion",
      titulo: "El mensajero, en la posta",
      texto: "El 18 de marzo de 1818, cerca de Talca (Chile), un mensajero del ejército libertador se detuvo a comer en una posta. Llevaba colgado del cuello el espejo grabado por San Martín: su salvoconducto.",
      audio: "assets/audio/p08a_posta.mp3",
      imagen: "assets/images/04_mensajero.jpg"
    },

    // ---------- 11. LO RECONOCEN, LO CAPTURAN ----------
    // AJUSTE #8 (parte b): segundo párrafo de la vieja pantalla 8
    {
      id: 11,
      tipo: "narracion",
      titulo: "Lo reconocen, lo capturan",
      texto: "En esa misma posta había soldados realistas. Uno de ellos reconoció la marca del espejo —ya la había visto en otra correspondencia militar— y descubrió que el mensajero era un espía patriota. Lo capturaron. Él intentó escapar a caballo en la oscuridad, pero no llegó lejos: dos disparos lo alcanzaron.",
      audio: "assets/audio/p08b_captura.mp3",
      imagen: "assets/images/22_captura_mensajero.jpg"
    },

    // ---------- 12. ESA MISMA NOCHE, CANCHA RAYADA ----------
    // AJUSTE #8 (parte c): tercer párrafo de la vieja pantalla 8
    {
      id: 12,
      tipo: "narracion",
      titulo: "Esa misma noche",
      texto: "Esa misma noche, mientras el mensajero moría, un ataque sorpresa caía sobre el ejército de San Martín, acampado en Cancha Rayada.",
      audio: "assets/audio/p08c_canchayada.mp3",
      imagen: "assets/images/05_canchayada.jpg"
    },

    // ---------- 13. LA BATALLA DE CANCHA RAYADA (1818) ----------
    {
      id: 13,
      tipo: "vf",
      titulo: "La batalla de Cancha Rayada (1818)",
      consigna: "Marcá si cada afirmación es verdadera o falsa.",
      audio: "assets/audio/p09_consigna_canchayada.mp3",
      imagen: "assets/images/05_canchayada.jpg",
      afirmaciones: [
        { texto: "La batalla de Cancha Rayada fue un ataque sorpresa nocturno de las fuerzas realistas.", valor: true, justificacion: "Ocurrió el 19 de marzo de 1818 y tomó desprevenido al ejército patriota.", audio: "assets/audio/p09_a1.mp3", audioJustif: "assets/audio/p09_j1.mp3" },
        { texto: "Cancha Rayada significó el fin definitivo de la campaña libertadora.", valor: false, justificacion: "Fue una derrota parcial; semanas después, la victoria de Maipú consolidó la independencia de Chile.", audio: "assets/audio/p09_a2.mp3", audioJustif: "assets/audio/p09_j2.mp3" },
        { texto: "Esa misma noche, un mensajero patriota murió cerca de allí, capturado por llevar un objeto que lo delataba como espía.", valor: true, justificacion: "El espejo que llevaba como salvoconducto terminó, después de esa noche, en manos del enemigo.", audio: "assets/audio/p09_a3.mp3", audioJustif: "assets/audio/p09_j3.mp3" }
      ]
    },

    // ---------- 14. VOCABULARIO CLAVE DE LA CAMPAÑA ----------
    {
      id: 14,
      tipo: "sopa",
      titulo: "Vocabulario clave de la campaña",
      consigna: "Buscá cada palabra de la lista en la sopa de letras. Tocá la primera y la última letra para marcarla.",
      audio: "assets/audio/p10_consigna_sopa.mp3",
      palabras: [
        { palabra: "EJERCITO", definicion: "Conjunto organizado de soldados que participan en una campaña militar.", audio: "assets/audio/p10_w1.mp3" },
        { palabra: "ANDES", definicion: "Cordillera que separa Argentina de Chile, cruzada por San Martín en 1817.", audio: "assets/audio/p10_w2.mp3" },
        { palabra: "LIBERTAD", definicion: "Condición de una persona que no está sometida a esclavitud ni dominación.", audio: "assets/audio/p10_w3.mp3" },
        { palabra: "GRANADEROS", definicion: "Regimiento de élite creado por San Martín para la campaña libertadora.", audio: "assets/audio/p10_w4.mp3" },
        { palabra: "ESPIA", definicion: "Persona que recoge información secreta para un bando en guerra.", audio: "assets/audio/p10_w5.mp3" },
        { palabra: "MAIPU", definicion: "Batalla que consolidó la independencia de Chile en 1818.", audio: "assets/audio/p10_w6.mp3" },
        { palabra: "CHACABUCO", definicion: "Batalla que abrió el camino a Santiago de Chile en 1817.", audio: "assets/audio/p10_w7.mp3" },
        { palabra: "PATRIOTA", definicion: "Quien defendía la causa de la independencia americana.", audio: "assets/audio/p10_w8.mp3" },
        { palabra: "MENSAJERO", definicion: "Quien trasladaba información e instrucciones entre distintos puntos durante la guerra.", audio: "assets/audio/p10_w9.mp3" }
      ]
    },

    // ---------- 15. ¿QUÉ PASABA CON LOS LIBERTOS? ----------
    {
      id: 15,
      tipo: "clasificar2col",
      titulo: "¿Qué pasaba con los libertos?",
      consigna: "Tocá cada situación y ubicala en la columna que corresponda.",
      audio: "assets/audio/p11_consigna_libertos.mp3",
      imagen: "assets/images/06_libertad.jpg",
      columnas: ["Libertad en el papel", "Libertad en los hechos"],
      items: [
        { texto: "En 1816, el amo le dio a Atima Silencio un papel que certificaba su libertad.", columna: 0, audio: "assets/audio/p11_i1.mp3" },
        { texto: "En 1821, nadie quería darle trabajo por haber sido esclava.", columna: 1, audio: "assets/audio/p11_i2.mp3" },
        { texto: "La ley ya no la consideraba propiedad de nadie.", columna: 0, audio: "assets/audio/p11_i3.mp3" },
        { texto: "Los perros de las casas la atacaban cuando pedía ayuda; le cerraban las puertas en la cara.", columna: 1, audio: "assets/audio/p11_i4.mp3" },
        { texto: "Podía, en teoría, elegir dónde vivir y trabajar.", columna: 0, audio: "assets/audio/p11_i5.mp3" },
        { texto: "Llegó a desear volver a la hacienda, porque la libertad la estaba matando de hambre.", columna: 1, audio: "assets/audio/p11_i6.mp3" }
      ]
    },

    // ---------- 16. ASOCIAR: DOS LIBERTADES MUY DISTINTAS ----------
    {
      id: 16,
      tipo: "asociar",
      titulo: "Dos libertades muy distintas",
      consigna: "Uní cada idea sobre la libertad de la patria con su par sobre la libertad de una persona liberta.",
      audio: "assets/audio/p12_consigna_asociar.mp3",
      pares: [
        { izq: "La libertad de la patria", der: "Se festeja con símbolos, próceres y fechas patrias.", audioIzq: "assets/audio/p12_c1.mp3", audioDer: "assets/audio/p12_d1.mp3" },
        { izq: "La libertad de un liberto", der: "Se vive en soledad, sin festejos ni reconocimiento social.", audioIzq: "assets/audio/p12_c2.mp3", audioDer: "assets/audio/p12_d2.mp3" },
        { izq: "La libertad de la patria", der: "Fue conquistada con ejércitos y batallas visibles.", audioIzq: "assets/audio/p12_c3.mp3", audioDer: "assets/audio/p12_d3.mp3" },
        { izq: "La libertad de un liberto", der: "Llega, muchas veces, con un simple papel y ningún apoyo después.", audioIzq: "assets/audio/p12_c4.mp3", audioDer: "assets/audio/p12_d4.mp3" }
      ]
    },

    // ---------- 17. LÍNEA DE TIEMPO INTERACTIVA INTEGRADORA (1818-1822) ----------
    // AJUSTE #3 — segunda instancia de la mecánica nueva
    {
      id: 17,
      tipo: "lineaTiempo",
      titulo: "Línea de tiempo integradora (1818-1822)",
      consigna: "Tocá cada punto de la línea de tiempo para conocer los hechos en orden.",
      audio: "assets/audio/plt2_consigna.mp3",
      puntos: [
        { icono: "🗡️", titulo: "Marzo de 1818 — Cancha Rayada", texto: "El mensajero patriota muere cerca de Talca; esa noche, ataque sorpresa en Cancha Rayada." },
        { icono: "🏆", titulo: "Abril de 1818 — Maipú", texto: "Batalla de Maipú: se consolida la independencia de Chile." },
        { icono: "⛵", titulo: "Fines de 1818 — Cruza el Atlántico", texto: "El espejo cruza el Atlántico hacia España, en manos de la familia del sargento realista herido." },
        { icono: "🎻", titulo: "Octubre de 1818 — Valencia", texto: "En Valencia, Dorel compra el espejo." },
        { icono: "⛓️", titulo: "1821 — Mendoza", texto: "En Mendoza, Atima Silencio enfrenta una libertad dura y solitaria." },
        { icono: "🪞", titulo: "1822 — Madrid", texto: "En Madrid, Raquel reconoce el espejo en un concierto de Dorel y decide viajar a Mendoza." }
      ]
    },

    // ---------- 18. ORDENÁ LOS HECHOS: DE CANCHA RAYADA AL REENCUENTRO ----------
    // AJUSTE #4: sin años en los ítems
    {
      id: 18,
      tipo: "ordenar",
      titulo: "Ahora, ordená vos estos hechos",
      consigna: "Sin mirar las fechas: tocá los hechos en el orden en que sucedieron.",
      audio: "assets/audio/p13_consigna_linea_tiempo2.mp3",
      items: [
        { texto: "El mensajero patriota muere cerca de Talca; esa noche, ataque sorpresa en Cancha Rayada.", audio: "assets/audio/p13_i1.mp3" },
        { texto: "Batalla de Maipú: se consolida la independencia de Chile.", audio: "assets/audio/p13_i2.mp3" },
        { texto: "El espejo cruza el Atlántico hacia España, en manos de la familia del sargento realista herido.", audio: "assets/audio/p13_i3.mp3" },
        { texto: "En Valencia, Dorel compra el espejo.", audio: "assets/audio/p13_i4.mp3" },
        { texto: "En Mendoza, Atima Silencio enfrenta una libertad dura y solitaria.", audio: "assets/audio/p13_i5.mp3" },
        { texto: "En Madrid, Raquel reconoce el espejo en un concierto de Dorel y decide viajar a Mendoza.", audio: "assets/audio/p13_i6.mp3" }
      ]
    },

    // ---------- 19. RAQUEL DECIDE VIAJAR ----------
    // AJUSTE #10 (parte a): primer párrafo de la vieja pantalla 14
    {
      id: 19,
      tipo: "narracion",
      titulo: "Raquel decide viajar",
      texto: "En 1822, Raquel Fontezo y Cabrera era una viuda enferma que vivía en España. Una noche, al sentir que le faltaba el aire, decidió tomar una última decisión propia: viajar.",
      audio: "assets/audio/p14a_decision.mp3",
      imagen: "assets/images/23_raquel_decision.jpg"
    },

    // ---------- 20. EL CONCIERTO EN MADRID ----------
    // AJUSTE #10 (parte b): segundo párrafo de la vieja pantalla 14
    {
      id: 20,
      tipo: "narracion",
      titulo: "El concierto en Madrid",
      texto: "En un concierto en Madrid escuchó tocar a un joven violinista virtuoso: Dorel. Al saludarlo en su camarín, reconoció algo imposible de confundir: el pequeño espejo enmarcado en ébano que había pertenecido a Silencio, su antigua doncella, décadas atrás. Dorel se lo entregó sin dudar.",
      audio: "assets/audio/p14b_concierto.mp3",
      imagen: "assets/images/24_concierto_madrid.jpg"
    },

    // ---------- 21. EL REENCUENTRO EN EL CEMENTERIO ----------
    // AJUSTE #10 (parte c): tercer párrafo de la vieja pantalla 14
    {
      id: 21,
      tipo: "narracion",
      titulo: "El reencuentro",
      texto: "Con el espejo en su equipaje, Raquel viajó a la hacienda de Mendoza donde todo había empezado. Allí supo que Atima Imaoma había muerto de peste años antes. Fue a despedirse ante su tumba y, sin esperarlo, se encontró cara a cara con su hija: Atima Silencio, que había vuelto, agotada, después de años de una libertad que casi nunca la había alimentado.",
      audio: "assets/audio/p14c_reencuentro.mp3",
      imagen: "assets/images/07_raquel.jpg"
    },

    // ---------- 22. UNA LIBERTAD DISTINTA ----------
    // AJUSTE #10 (parte d): cuarto párrafo de la vieja pantalla 14
    {
      id: 22,
      tipo: "narracion",
      titulo: "Una libertad distinta",
      texto: "Raquel le devolvió el espejo y le ofreció algo distinto a lo que había vivido hasta entonces: vivir con ella, esta vez como mujer libre y con un salario.",
      audio: "assets/audio/p14d_devolucion.mp3",
      imagen: "assets/images/06_libertad.jpg"
    },

    // ---------- 23. VERDADERO O FALSO INTEGRADOR ----------
    {
      id: 23,
      tipo: "vf",
      titulo: "Verdadero o falso integrador",
      consigna: "Marcá si cada afirmación es verdadera o falsa.",
      audio: "assets/audio/p15_consigna_vf_final.mp3",
      afirmaciones: [
        { texto: "El Cruce de los Andes fue organizado y liderado por José de San Martín.", valor: true, audio: "assets/audio/p15_a1.mp3" },
        { texto: "El ejército cruzó la cordillera por una única ruta.", valor: false, justificacion: "Cruzó por varias rutas simultáneas, como Los Patos y Uspallata, para confundir al enemigo.", audio: "assets/audio/p15_a2.mp3", audioJustif: "assets/audio/p15_j2.mp3" },
        { texto: "Dorel era un soldado español que había peleado contra San Martín.", valor: false, justificacion: "Dorel era un huérfano violinista; quien peleó contra San Martín fue el padre del joven que le vendió el espejo.", audio: "assets/audio/p15_a3.mp3", audioJustif: "assets/audio/p15_j3.mp3" },
        { texto: "La independencia americana y la libertad de una persona esclavizada fueron, en esa época, dos procesos con ritmos y alcances muy distintos.", valor: true, audio: "assets/audio/p15_a4.mp3" }
      ]
    },

    // ---------- 24. CIERRE — EL VALOR DE LA LIBERTAD ----------
    {
      id: 24,
      tipo: "cierre",
      titulo: "El valor de la libertad que tanto costó ganar",
      texto: "Miles de personas cruzaron una cordillera helada para conquistar una libertad que hoy se recuerda con desfiles, feriados y monumentos.<br><br>Pero para Atima Silencio, esa misma palabra —libertad— tuvo, en 1821, otro sabor: el de puertas que se cerraban, el de perros que ladraban, el del hambre de todos los días. Ella misma llegó a pensar que la libertad era demasiado dura para sostenerla sola.<br><br>Dos libertades. Una conquistada a fuerza de ejércitos y reconocida por la historia; otra, mucho más chica y solitaria, casi invisible.<br><br>Leer «El Espejo Africano» es también animarse a mirar esa otra libertad, la que no sale en los libros de historia.",
      audio: "assets/audio/p16_narracion_cierre.mp3",
      imagen: "assets/images/08_cierre.jpg"
    }

  ]

};
