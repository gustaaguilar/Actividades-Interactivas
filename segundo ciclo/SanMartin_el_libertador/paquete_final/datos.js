// ============================================================
// DATOS DEL PAQUETE - San Martín, el Libertador de América
// ============================================================

const ESTACIONES = [
  {
    id: 1,
    titulo: "El nacimiento de San Martín",
    imagen: "imagenes/01_nacimiento_yapeyu.jpg",
    audioNarracion: "audios/01_nacimiento_yapeyu.mp3",
    audioConsigna: "audios/01_consigna.mp3",
    consignaTexto: "Tocá la opción que muestra dónde y cuándo nació San Martín.",
    juego: {
      tipo: "identificacion",
      audioRefuerzo: "audios/01_refuerzo.mp3",
      opciones: [
        {texto:"Yapeyú, Corrientes, en 1778", correcta:true},
        {texto:"Buenos Aires, en 1810", correcta:false},
        {texto:"Mendoza, en 1817", correcta:false},
        {texto:"Madrid, España, en 1800", correcta:false}
      ]
    }
  },
  {
    id: 2,
    titulo: "Formación en España",
    imagen: "imagenes/02_formacion_espana.jpg",
    audioNarracion: "audios/02_formacion_espana.mp3",
    audioConsigna: "audios/02_consigna.mp3",
    consignaTexto: "Pulsá los hechos de su formación en España en el orden en que sucedieron.",
    juego: {
      tipo: "orden",
      items: [
        {t:"Viaja a España con su familia siendo niño", audio:"audios/02_orden_1.mp3"},
        {t:"Ingresa a la carrera militar española", audio:"audios/02_orden_2.mp3"},
        {t:"Participa en campañas del ejército español", audio:"audios/02_orden_3.mp3"},
        {t:"Decide regresar a Buenos Aires para luchar por la independencia", audio:"audios/02_orden_4.mp3"}
      ]
    }
  },
  {
    id: 3,
    titulo: "Granaderos a Caballo",
    imagen: "imagenes/03_granaderos.jpg",
    audioNarracion: "audios/03_granaderos.mp3",
    audioConsigna: "audios/03_consigna.mp3",
    consignaTexto: "Uní cada parte del uniforme de los Granaderos con su nombre correcto.",
    infografia: {
      imagen: "imagenes/03_granadero_solo.jpg",
      consignaTexto: "Mirá las partes del uniforme antes de jugar. Tocá cada número.",
      audioConsigna: "audios/03_info_consigna.mp3",
      puntos: [
        {n:1, x:49, y:10, texto:"Este es el gorro, o chapska: alto y con visera.", audio:"audios/03_info_1.mp3"},
        {n:2, x:58, y:56, texto:"Este es el sable corvo: tiene forma curva.", audio:"audios/03_info_2.mp3"},
        {n:3, x:48, y:40, texto:"Esta es la casaca: la chaqueta azul con vivos rojos.", audio:"audios/03_info_3.mp3"},
        {n:4, x:41, y:32, texto:"Esta es la bandolera: las correas cruzadas en el pecho.", audio:"audios/03_info_4.mp3"}
      ]
    },
    juego: {
      tipo: "asociacion",
      pares: [
        {a:"Chaqueta azul con vivos rojos", b:"Casaca", audio:"audios/03_match_1.mp3"},
        {a:"Gorro alto con visera", b:"Chapska", audio:"audios/03_match_2.mp3"},
        {a:"Sable curvo", b:"Sable corvo", audio:"audios/03_match_3.mp3"},
        {a:"Correas cruzadas en el pecho", b:"Bandolera", audio:"audios/03_match_4.mp3"}
      ]
    }
  },
  {
    id: 4,
    titulo: "Combate de San Lorenzo",
    imagen: "imagenes/04_san_lorenzo.jpg",
    audioNarracion: "audios/04_san_lorenzo.mp3",
    audioConsigna: "audios/04_consigna.mp3",
    consignaTexto: "Elegí la respuesta correcta en cada pregunta.",
    juego: {
      tipo: "multiple",
      preguntas: [
        {p:"¿En qué año fue el Combate de San Lorenzo?", audioP:"audios/04_p1.mp3", opciones:["1810","1813","1816","1820"], correcta:1, audioR:"audios/04_r1.mp3"},
        {p:"¿Dónde ocurrió el combate?", audioP:"audios/04_p2.mp3", opciones:["En Mendoza","En Buenos Aires","Junto al convento San Carlos Borromeo, Santa Fe","En Chile"], correcta:2, audioR:"audios/04_r2.mp3"},
        {p:"¿Quién comandaba a los Granaderos en esa batalla?", audioP:"audios/04_p3.mp3", opciones:["Belgrano","San Martín","Güemes","O'Higgins"], correcta:1, audioR:"audios/04_r3.mp3"}
      ]
    }
  },
  {
    id: 5,
    titulo: "El Plan Continental",
    imagen: "imagenes/05_plan_continental.jpg",
    audioNarracion: "audios/05_plan_continental.mp3",
    audioConsigna: "audios/05_consigna.mp3",
    consignaTexto: "Tocá los tres países que San Martín quería liberar.",
    juego: {
      tipo: "mapa",
      viewBox: "190 505 175 205",
      regiones: [
        {nombre:"Argentina", correcta:true, color:"#75AADB", audio:"audios/05_arg.mp3", path:"M279.05,600.613l1.677,1.571l-6.371,9.467l-2.239,2.479l0.777,10.813l4.918,5.974l-4.132,7.209l-3.129,1.35h-3.579l1.003,5.627l-5.593,1.92l1.34,4.729l-3.354,10.701l4.141,3.38l-2.239,5.515l-3.804,5.975l2.014,4.165l-4.918,0.786l-4.028-4.951l-0.674-15.432l-6.258-26.209l1.893-9.163l-4.028-11.713l2.68-15.204l2.463-2.931l-0.605-2.222l3.164-2.888l7.054,0.483l3.942,4.21l4.555,0.078l4.668,2.853l-1.375,3.217l0.329,3.25l6.612-0.312L279.05,600.613L279.05,600.613z M264.745,687.564l0.225,4.951l3.803-0.337l3.242-2.144l-5.48-1.124L264.745,687.564L264.745,687.564z", hitbox:{x:238,y:580,w:55,h:115}},
        {nombre:"Chile", correcta:true, color:"#D52B1E", audio:"audios/05_chile.mp3", path:"M261.391,683.51l-3.691,8.109l6.371,0.674l0.112-5.403L261.391,683.51L261.391,683.51z M260.137,682.239l-2.775,3.068l-0.337,3.604l-5.368-3.043l-5.705-8.221l-1.677-2.932l2.351-3.043l-0.225-3.83l-2.68-1.124l-2.126-1.572l0.449-2.144l2.792-0.787l0.562-12.387l-4.356-2.48l-2.844-64.477l0.735-1.278l5.567,12.836l1.781,0.035l0.579,2.049l-2.369,2.868l-2.723,15.448l3.873,11.895l-1.79,9.007l6.31,26.485l0.666,15.49l4.521,5.229L260.137,682.239L260.137,682.239z M241.717,649.833l-1.115,1.686l0.562,2.932l1.115,0.112l0.562-3.718L241.717,649.833L241.717,649.833z", hitbox:{x:222,y:575,w:26,h:120}},
        {nombre:"Perú", correcta:true, color:"#2E7D32", audio:"audios/05_peru.mp3", path:"M209.518,541.246l-1.677,1.695l0.113,2.703l14.643,26.694l15.205,9.802l2.351-3.941l0.562-8.669l-1.228-5.402l-4.141-6.984l-2.463,0.786l-1.115,1.236l-4.918-5.636l1.228-6.647l5.705-3.717l-0.449-3.492l-5.809-0.226l-3.017-5.064l-1.677-0.562l0.113,3.044l-7.486,8.895l-5.593-1.349L209.518,541.246L209.518,541.246z", hitbox:{x:205,y:533,w:40,h:50}},
        {nombre:"Brasil", correcta:false, color:"#e53935", path:"M286.631,618.464l5.402-10.391l0.198-8.73l10.079-6.501h5.645l4.435-7.512l0.804-14.418l-1.815-3.855l10.684-9.751l0.406-10.761l-14.514-7.105l-17.53-5.48l-8.264-0.812l2.221-4.669l-0.604-7.104l-1.808-0.596l-2.671,5.308l-1.4,1.754l-3.595-1.59l-12.093,4.261l-4.028-5.073l0.648-5.299l-3.804,3.872l-4.201-2.265l-0.424,0.597l0.009,1.841l3.622,1.945l-5.437,5.73l-3.432-0.034l-3.475-3.535l-3.933,0.121l-0.484,4.2l2.256,2.739l-2.663,8.532l-3.112,0.241l-4.953,3.13l-1.21,6.146l4.296,4.599l0.787-0.89l3.017-0.812l2.576,4.34l7.374-3.164l2.861,0.165l1.971,6.976l10.52,3.337l1.815,5.564l4.478,0.537l2.135,5.314l-1.443,4.729l1.884,2.474l-0.276,3.683l5.048-0.477l4.625,5.844l-0.363,4.105l2.74,2.316l-6.57,9.95L286.631,618.464L286.631,618.464z"}
      ]
    }
  },
  {
    id: 6,
    titulo: "El Plumerillo",
    imagen: "imagenes/06_el_plumerillo.jpg",
    audioNarracion: "audios/06_el_plumerillo.mp3",
    audioConsigna: "audios/06_consigna.mp3",
    consignaTexto: "Encontrá las palabras escondidas relacionadas con el campamento. Tocá la primera y la última letra de cada palabra.",
    juego: {
      tipo: "sopa",
      palabras: [
        {p:"MENDOZA", audio:"audios/palabra_mendoza.mp3"},
        {p:"ARMAS", audio:"audios/palabra_armas.mp3"},
        {p:"MULAS", audio:"audios/palabra_mulas.mp3"},
        {p:"ANDES", audio:"audios/palabra_andes.mp3"},
        {p:"CARRETAS", audio:"audios/palabra_carretas.mp3"}
      ]
    }
  },
  {
    id: 7,
    titulo: "Actores sociales",
    imagen: "imagenes/07_actores_sociales.jpg",
    audioNarracion: "audios/07_actores_sociales.mp3",
    audioConsigna: "audios/07_consigna.mp3",
    consignaTexto: "Uní a cada persona con la tarea que estaba haciendo.",
    juego: {
      tipo: "asociacion",
      pares: [
        {a:"Herrero", b:"Fabricaba herraduras y armas", audio:"audios/07_match_1.mp3"},
        {a:"Costurera", b:"Cosía uniformes", audio:"audios/07_match_2.mp3"},
        {a:"Cocinera", b:"Preparaba la comida", audio:"audios/07_match_3.mp3"},
        {a:"Soldado", b:"Se entrenaba para la batalla", audio:"audios/07_match_4.mp3"}
      ]
    }
  },
  {
    id: 8,
    titulo: "Rutas elegidas",
    imagen: "imagenes/08_rutas_elegidas.jpg",
    audioNarracion: "audios/08_rutas_elegidas.mp3",
    audioConsigna: "audios/08_consigna.mp3",
    consignaTexto: "Ayudá al Ejército de los Andes a cruzar la cordillera resolviendo los desafíos.",
    juego: {
      tipo: "laberinto",
      desafios: [
        {enunciado:"El ejército tenía 5 grupos de 200 soldados cada uno. ¿Cuántos soldados en total?", respuesta:1000, audioP:"audios/08_p1.mp3", audioR:"audios/08_r1.mp3", textoR:"¡Correcto! Eran 1000 soldados en total."},
        {enunciado:"Cruzaron por 6 pasos distintos y en cada uno iban 150 hombres. ¿Cuántos hombres cruzaron en total?", respuesta:900, audioP:"audios/08_p2.mp3", audioR:"audios/08_r2.mp3", textoR:"¡Correcto! Cruzaron 900 hombres en total."},
        {enunciado:"Un soldado subió 2500 metros el primer día y 1800 el segundo. ¿Cuántos metros lleva recorridos?", respuesta:4300, audioP:"audios/08_p3.mp3", audioR:"audios/08_r3.mp3", textoR:"¡Correcto! Llevaba recorridos 4300 metros."}
      ]
    }
  },
  {
    id: 9,
    titulo: "Vida cotidiana en el cruce",
    imagen: "imagenes/09_vida_cotidiana.jpg",
    audioNarracion: "audios/09_vida_cotidiana.mp3",
    audioConsigna: "audios/09_consigna.mp3",
    consignaTexto: "Decidí si cada afirmación es verdadera o falsa.",
    juego: {
      tipo: "vf",
      afirmaciones: [
        {texto:"El cruce de los Andes fue fácil y rápido", valor:false, audioP:"audios/09_p1.mp3", audioR:"audios/09_r1.mp3"},
        {texto:"Los soldados sufrieron frío extremo y falta de oxígeno", valor:true, audioP:"audios/09_p2.mp3", audioR:"audios/09_r2.mp3"},
        {texto:"Usaron mulas para cargar provisiones", valor:true, audioP:"audios/09_p3.mp3", audioR:"audios/09_r3.mp3"},
        {texto:"Todo el ejército cruzó por un único camino", valor:false, audioP:"audios/09_p4.mp3", audioR:"audios/09_r4.mp3"},
        {texto:"El cruce duró varias semanas", valor:true, audioP:"audios/09_p5.mp3", audioR:"audios/09_r5.mp3"}
      ]
    }
  },
  {
    id: 10,
    titulo: "Batalla de Chacabuco",
    imagen: "imagenes/10_chacabuco.jpg",
    audioNarracion: "audios/10_chacabuco.mp3",
    audioConsigna: "audios/10_consigna.mp3",
    consignaTexto: "Elegí la respuesta correcta en cada pregunta.",
    juego: {
      tipo: "multiple",
      preguntas: [
        {p:"¿Cuándo fue la Batalla de Chacabuco?", audioP:"audios/10_p1.mp3", opciones:["1810","12 de febrero de 1817","1820","1813"], correcta:1, audioR:"audios/10_r1.mp3"},
        {p:"¿Qué país se liberó gracias a esta batalla?", audioP:"audios/10_p2.mp3", opciones:["Perú","Chile","Bolivia","Uruguay"], correcta:1, audioR:"audios/10_r2.mp3"},
        {p:"¿Quién luchó junto a San Martín como líder chileno?", audioP:"audios/10_p3.mp3", opciones:["Belgrano","Bernardo O'Higgins","Güemes","Moreno"], correcta:1, audioR:"audios/10_r3.mp3"}
      ]
    }
  },
  {
    id: 11,
    titulo: "Remedios y Merceditas",
    imagen: "imagenes/11_remedios_merceditas.jpg",
    audioNarracion: "audios/11_remedios_merceditas.mp3",
    audioConsigna: "audios/11_consigna.mp3",
    consignaTexto: "Tocá la opción correcta sobre la familia de San Martín.",
    juego: {
      tipo: "identificacion",
      audioRefuerzo: "audios/11_refuerzo.mp3",
      opciones: [
        {texto:"Remedios de Escalada era su esposa y Mercedes su hija", correcta:true},
        {texto:"Remedios era su hermana", correcta:false},
        {texto:"Mercedes era su madre", correcta:false},
        {texto:"No tuvo familia propia", correcta:false}
      ]
    }
  },
  {
    id: 12,
    titulo: "Las máximas",
    imagen: "imagenes/12_las_maximas.jpg",
    audioNarracion: "audios/12_las_maximas.mp3",
    audioConsigna: "audios/12_consigna.mp3",
    consignaTexto: "Pulsá la palabra correcta para completar cada máxima.",
    juego: {
      tipo: "completar",
      frases: [
        {texto:"Humanizar el carácter y hacerlo sensible aún con los ___ que nos perjudican", respuesta:"insectos", audio:"audios/maxima_01.mp3"},
        {texto:"Inspirarle amor a la verdad y odio a la ___", respuesta:"mentira", audio:"audios/maxima_02.mp3"},
        {texto:"Inspirarle una gran confianza y amistad, pero unida al ___", respuesta:"respeto", audio:"audios/maxima_03.mp3"},
        {texto:"Estimular en Mercedes la ___ con los pobres", respuesta:"caridad", audio:"audios/maxima_04.mp3"},
        {texto:"Respeto sobre la propiedad ___", respuesta:"ajena", audio:"audios/maxima_05.mp3"},
        {texto:"Acostumbrarla a guardar un ___", respuesta:"secreto", audio:"audios/maxima_06.mp3"},
        {texto:"Inspirarle sentimientos de indulgencia hacia todas las ___", respuesta:"religiones", audio:"audios/maxima_07.mp3"},
        {texto:"Dulzura con los criados, pobres y ___", respuesta:"viejos", audio:"audios/maxima_08.mp3"},
        {texto:"Que hable poco y lo ___", respuesta:"preciso", audio:"audios/maxima_09.mp3"},
        {texto:"Acostumbrarla a estar formal en la ___", respuesta:"mesa", audio:"audios/maxima_10.mp3"},
        {texto:"Amor al aseo y desprecio al ___", respuesta:"lujo", audio:"audios/maxima_11.mp3"},
        {texto:"Inspirarle amor por la Patria y por la ___", respuesta:"Libertad", audio:"audios/maxima_12.mp3"}
      ],
      banco: ["insectos","mentira","respeto","caridad","ajena","secreto","religiones","viejos","preciso","mesa","lujo","Libertad","olvidar","pelear"]
    }
  },
  {
    id: 13,
    titulo: "Muerte y repatriación",
    imagen: "imagenes/13_muerte_repatriacion.jpg",
    audioNarracion: "audios/13_muerte_repatriacion.mp3",
    audioConsigna: "audios/13_consigna.mp3",
    consignaTexto: "Ordená los últimos hechos de la vida de San Martín.",
    juego: {
      tipo: "orden",
      items: [
        {t:"Viaja a vivir a Francia", audio:"audios/13_orden_1.mp3"},
        {t:"Pasa sus últimos años en Boulogne-sur-Mer", audio:"audios/13_orden_2.mp3"},
        {t:"Muere el 17 de agosto de 1850", audio:"audios/13_orden_3.mp3"},
        {t:"Sus restos son repatriados a la Argentina", audio:"audios/13_orden_4.mp3"}
      ]
    }
  },
  {
    id: 14,
    titulo: "Padre de la Patria",
    imagen: "imagenes/14_padre_patria.jpg",
    audioNarracion: "audios/14_padre_patria.mp3",
    audioConsigna: "audios/14_consigna.mp3",
    consignaTexto: "Encontrá las palabras clave de todo lo que aprendiste. Tocá la primera y la última letra de cada palabra.",
    juego: {
      tipo: "sopa",
      palabras: [
        {p:"LIBERTADOR", audio:"audios/palabra_libertador.mp3"},
        {p:"ANDES", audio:"audios/palabra_andes.mp3"},
        {p:"CHACABUCO", audio:"audios/palabra_chacabuco.mp3"},
        {p:"YAPEYU", audio:"audios/palabra_yapeyu.mp3"},
        {p:"PATRIA", audio:"audios/palabra_patria.mp3"}
      ]
    }
  }
];

const TEXTO_PORTADA = "Bienvenidos y bienvenidas a este recorrido por la vida de José de San Martín, el Libertador de América.";
const AUDIO_PORTADA = "audios/00_portada.mp3";
const AUDIO_CIERRE_FELICITACIONES = "audios/00_cierre_felicitaciones.mp3";
