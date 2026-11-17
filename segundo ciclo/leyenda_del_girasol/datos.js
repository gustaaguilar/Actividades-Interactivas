/* La leyenda del girasol — QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Renovado desde el paquete JClic original. */
window.DATOS = {
 "meta": {
  "titulo": "La leyenda del girasol",
  "area": "Lengua · Segundo ciclo · Leyenda",
  "mail": "profegustaaguilar@gmail.com",
  "puntosPorAcierto": 10,
  "revision": false
 },
 "pantallas": [
  {
   "tipo": "portada",
   "imagen": "img/portada.jpg"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_portada_leyenda.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "excelente.mp3",
   "tipo": "rompecabezas",
   "imagen": "img/portada_resized.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "portada_leyenda"
  },
  {
   "consigna": "Tocá la definición correcta de leyenda.",
   "audio": "cons_que_es_leyenda.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_bosque.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Son historias inventadas por un autor con personajes de fantasía.",
     "audio": "def_leyenda_incorrecta1.mp3",
     "ok": false
    },
    {
     "texto": "Son historias de hechos sobrenaturales o naturales que pasaron de generación en generación.",
     "audio": "def_leyenda_correcta.mp3",
     "ok": true
    },
    {
     "texto": "Son textos que explican hechos científicos con datos comprobables.",
     "audio": "def_leyenda_incorrecta2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "que_es_leyenda"
  },
  {
   "consigna": "Uní cada característica con si es leyenda o no es leyenda.",
   "audio": "cons_caracteristicas.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_aldea.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Narra hechos sobrenaturales o naturales.",
     "audio": "caract_si1.mp3"
    },
    {
     "texto": "Se transmite de generación en generación.",
     "audio": "caract_si2.mp3"
    },
    {
     "texto": "Tiene un autor conocido.",
     "audio": "caract_no1.mp3"
    },
    {
     "texto": "Termina siempre con una moraleja.",
     "audio": "caract_no2.mp3"
    }
   ],
   "der": [
    {
     "texto": "✓ SÍ es leyenda",
     "audio": null
    },
    {
     "texto": "✓ SÍ es leyenda",
     "audio": null
    },
    {
     "texto": "✗ NO es leyenda",
     "audio": null
    },
    {
     "texto": "✗ NO es leyenda",
     "audio": null
    }
   ],
   "pares": [
    [
     0,
     0
    ],
    [
     1,
     1
    ],
    [
     2,
     2
    ],
    [
     3,
     3
    ]
   ],
   "derRepetible": false,
   "_jclic": "caracteristicas"
  },
  {
   "consigna": "Uní cada parte de la leyenda con lo que cuenta.",
   "audio": "cons_estructura.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_biblioteca.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "TÍTULO",
     "imagen": "img/img_leyenda.jpg",
     "audio": "nom_titulo.mp3"
    },
    {
     "texto": "INICIO",
     "imagen": "img/img_estructura.jpg",
     "audio": "nom_inicio.mp3"
    },
    {
     "texto": "PROBLEMA",
     "imagen": "img/img_parrafo.jpg",
     "audio": "nom_problema.mp3"
    },
    {
     "texto": "FINAL",
     "imagen": "img/img_vf.jpg",
     "audio": "nom_final.mp3"
    }
   ],
   "der": [
    {
     "texto": "El nombre que identifica la leyenda.",
     "audio": "desc_titulo.mp3"
    },
    {
     "texto": "Presenta el lugar, el tiempo y los personajes.",
     "audio": "desc_inicio.mp3"
    },
    {
     "texto": "Cuenta el conflicto o situación difícil.",
     "audio": "desc_problema.mp3"
    },
    {
     "texto": "Explica cómo se resolvió el problema.",
     "audio": "desc_final.mp3"
    }
   ],
   "pares": [
    [
     0,
     0
    ],
    [
     1,
     1
    ],
    [
     2,
     2
    ],
    [
     3,
     3
    ]
   ],
   "derRepetible": false,
   "_jclic": "estructura"
  },
  {
   "consigna": "Uní cada personaje con su descripción.",
   "audio": "cons_personajes.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "excelente.mp3",
   "imagen": "img/fondo_bosque.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Pirayú",
     "imagen": "img/img_pirayu.jpg",
     "audio": "nom_pirayu.mp3"
    },
    {
     "texto": "Mandió",
     "imagen": "img/img_mandio.jpg",
     "audio": "nom_mandio.mp3"
    },
    {
     "texto": "Carandai",
     "imagen": "img/img_carandai.jpg",
     "audio": "nom_carandai.mp3"
    },
    {
     "texto": "El Sol",
     "imagen": "img/img_el_sol.jpg",
     "audio": "nom_el_sol.mp3"
    }
   ],
   "der": [
    {
     "texto": "Niña guaraní valiente y generosa.",
     "audio": "desc_pirayu.mp3"
    },
    {
     "texto": "Joven guaraní enamorado de Carandai.",
     "audio": "desc_mandio.mp3"
    },
    {
     "texto": "Joven guerrero al que le prohibieron casarse.",
     "audio": "desc_carandai.mp3"
    },
    {
     "texto": "Ser poderoso que ayudó a la aldea.",
     "audio": "desc_el_sol.mp3"
    }
   ],
   "pares": [
    [
     0,
     0
    ],
    [
     1,
     1
    ],
    [
     2,
     2
    ],
    [
     3,
     3
    ]
   ],
   "derRepetible": false,
   "_jclic": "personajes"
  },
  {
   "consigna": "Ordená las viñetas del inicio de la historia.",
   "audio": "cons_secuencia1.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_bosque.jpg",
   "tipo": "ordenar",
   "piezas": [
    "En una aldea guaraní vivía Pirayú, una niña valiente y generosa.",
    "Pirayú y Mandió, de tribus vecinas, se hicieron amigos bajo el sol.",
    "El jefe prohibió que Carandai se casara con alguien de otra tribu."
   ],
   "juntar": false,
   "_jclic": "secuencia_1"
  },
  {
   "consigna": "Ordená las viñetas del problema.",
   "audio": "cons_secuencia2.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_aldea.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Las dos tribus se separaron y no volvieron a saber una de la otra.",
    "La aldea de Pirayú sufrió una terrible sequía.",
    "Pirayú pidió ayuda al Sol con toda su fuerza."
   ],
   "juntar": false,
   "_jclic": "secuencia_2"
  },
  {
   "consigna": "Ordená las viñetas del final.",
   "audio": "cons_secuencia3.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_girasol.jpg",
   "tipo": "ordenar",
   "piezas": [
    "El Sol envolvió a la niña en una luz muy brillante.",
    "Las nubes enviadas por el Sol trajeron lluvia a la aldea.",
    "Donde Carandai había estado, nació un hermoso girasol que siempre mira al sol."
   ],
   "juntar": false,
   "_jclic": "secuencia_3"
  },
  {
   "consigna": "¿Quiénes eran Pirayú y Mandió?",
   "audio": "cons_comprension1.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_bosque.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Eran los dioses guaraníes del sol y la lluvia.",
     "audio": "resp_carandai.mp3",
     "ok": false
    },
    {
     "texto": "Eran dos jóvenes de tribus guaraníes vecinas.",
     "audio": "resp_pirayu_mandio.mp3",
     "ok": true
    },
    {
     "texto": "Eran el jefe y su hija de la tribu guaraní.",
     "audio": "def_leyenda_incorrecta2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "comprension_1"
  },
  {
   "consigna": "¿Por qué era imposible que Carandai se casara?",
   "audio": "cons_comprension2.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_aldea.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Porque era muy joven para casarse según la tribu.",
     "audio": "prop_incorrecto1.mp3",
     "ok": false
    },
    {
     "texto": "Porque estaba enamorado de otra persona de su tribu.",
     "audio": "prop_incorrecto2.mp3",
     "ok": false
    },
    {
     "texto": "Era hijo del jefe y tenía prohibido casarse con alguien de otra tribu.",
     "audio": "resp_carandai.mp3",
     "ok": true
    }
   ],
   "cols": 1,
   "_jclic": "comprension_2"
  },
  {
   "consigna": "¿Quién ayudó a Pirayú y cómo?",
   "audio": "cons_comprension3.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_girasol.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "El Sol la envolvió en luz brillante y envió nubes para ayudar a su gente.",
     "audio": "resp_ayuda.mp3",
     "ok": true
    },
    {
     "texto": "Mandió regresó con su tribu y trajo agua para la aldea.",
     "audio": "prop_incorrecto1.mp3",
     "ok": false
    },
    {
     "texto": "El jefe de la otra tribu envió guerreros con provisiones.",
     "audio": "prop_incorrecto2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "comprension_3"
  },
  {
   "consigna": "¿Quién te parece es el girasol de la leyenda?",
   "audio": "cons_el_girasol.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "excelente.mp3",
   "imagen": "img/fondo_girasol.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Pirayú",
     "imagen": "img/img_pirayu.jpg",
     "audio": "nom_pirayu.mp3",
     "ok": false
    },
    {
     "texto": "Carandai",
     "imagen": "img/img_carandai.jpg",
     "audio": "resp_girasol.mp3",
     "ok": true
    },
    {
     "texto": "El Sol",
     "imagen": "img/img_el_sol.jpg",
     "audio": "nom_el_sol.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "el_girasol"
  },
  {
   "consigna": "Uní cada párrafo con lo que cuenta.",
   "audio": "cons_parrafo_asoc.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_aula.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Párrafo 1",
     "imagen": "img/img_generaciones.jpg",
     "audio": "nom_inicio.mp3"
    },
    {
     "texto": "Párrafo 2",
     "imagen": "img/img_proposito.jpg",
     "audio": "nom_problema.mp3"
    },
    {
     "texto": "Párrafo 3",
     "imagen": "img/img_girasol.jpg",
     "audio": "nom_final.mp3"
    }
   ],
   "der": [
    {
     "texto": "Presenta el lugar, el tiempo y cómo son los personajes.",
     "audio": "parr_personajes.mp3"
    },
    {
     "texto": "Cuenta la prohibición del casamiento.",
     "audio": "parr_prohibicion.mp3"
    },
    {
     "texto": "Explica cómo se resolvió y el origen del girasol.",
     "audio": "parr_desenlace.mp3"
    }
   ],
   "pares": [
    [
     0,
     0
    ],
    [
     1,
     1
    ],
    [
     2,
     2
    ]
   ],
   "derRepetible": false,
   "_jclic": "parrafo_asoc"
  },
  {
   "consigna": "Tocá el propósito correcto de una leyenda.",
   "audio": "cons_prop_leyenda.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_aula.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Entretener con historias de aventuras inventadas.",
     "audio": "prop_incorrecto1.mp3",
     "ok": false
    },
    {
     "texto": "Explicar tradiciones y costumbres de generación en generación.",
     "audio": "prop_correcto.mp3",
     "ok": true
    },
    {
     "texto": "Enseñar reglas de gramática y escritura.",
     "audio": "prop_incorrecto2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "prop_leyenda"
  },
  {
   "consigna": "Encontrá: PIRAYÚ - MANDIÓ - CARANDAI - SOL - GIRASOL",
   "audio": "cons_sopa.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "i01_muy_bien.mp3",
   "tipo": "sopa",
   "palabras": [
    "pirayú",
    "mandió",
    "carandai",
    "sol",
    "girasol"
   ],
   "pistas": [
    {
     "imagen": "img/img_pirayu.jpg",
     "audio": "nom_pirayu.mp3"
    },
    {
     "imagen": "img/img_mandio.jpg",
     "audio": "nom_mandio.mp3"
    },
    {
     "imagen": "img/img_carandai.jpg",
     "audio": "nom_carandai.mp3"
    },
    {
     "imagen": "img/img_el_sol.jpg",
     "audio": "nom_el_sol.mp3"
    },
    {
     "imagen": "img/img_girasol.jpg",
     "audio": "nom_el_girasol.mp3"
    }
   ],
   "_jclic": "sopa_leyenda"
  },
  {
   "consigna": "Encontrá los pares de personaje e imagen.",
   "audio": "cons_memo_personajes.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "excelente.mp3",
   "tipo": "memoria",
   "pares": [
    [
     {
      "texto": "Pirayú",
      "imagen": "img/img_pirayu.jpg",
      "audio": "nom_pirayu.mp3"
     },
     {
      "texto": "Pirayú",
      "imagen": "img/img_pirayu.jpg",
      "audio": "nom_pirayu.mp3"
     }
    ],
    [
     {
      "texto": "Mandió",
      "imagen": "img/img_mandio.jpg",
      "audio": "nom_mandio.mp3"
     },
     {
      "texto": "Mandió",
      "imagen": "img/img_mandio.jpg",
      "audio": "nom_mandio.mp3"
     }
    ],
    [
     {
      "texto": "Carandai",
      "imagen": "img/img_carandai.jpg",
      "audio": "nom_carandai.mp3"
     },
     {
      "texto": "Carandai",
      "imagen": "img/img_carandai.jpg",
      "audio": "nom_carandai.mp3"
     }
    ],
    [
     {
      "texto": "El Sol",
      "imagen": "img/img_el_sol.jpg",
      "audio": "nom_el_sol.mp3"
     },
     {
      "texto": "El Sol",
      "imagen": "img/img_el_sol.jpg",
      "audio": "nom_el_sol.mp3"
     }
    ],
    [
     {
      "texto": "El girasol",
      "imagen": "img/img_girasol.jpg",
      "audio": "nom_el_girasol.mp3"
     },
     {
      "texto": "El girasol",
      "imagen": "img/img_girasol.jpg",
      "audio": "nom_el_girasol.mp3"
     }
    ],
    [
     {
      "texto": "Pirayú",
      "audio": "nom_pirayu.mp3"
     },
     {
      "texto": "Pirayú",
      "audio": "nom_pirayu.mp3"
     }
    ],
    [
     {
      "texto": "Mandió",
      "audio": "nom_mandio.mp3"
     },
     {
      "texto": "Mandió",
      "audio": "nom_mandio.mp3"
     }
    ],
    [
     {
      "texto": "Carandai",
      "audio": "nom_carandai.mp3"
     },
     {
      "texto": "Carandai",
      "audio": "nom_carandai.mp3"
     }
    ],
    [
     {
      "texto": "El Sol",
      "audio": "nom_el_sol.mp3"
     },
     {
      "texto": "El Sol",
      "audio": "nom_el_sol.mp3"
     }
    ],
    [
     {
      "texto": "El girasol",
      "audio": "nom_el_girasol.mp3"
     },
     {
      "texto": "El girasol",
      "audio": "nom_el_girasol.mp3"
     }
    ]
   ],
   "_jclic": "memo_personajes"
  },
  {
   "consigna": "Tocá la afirmación verdadera.",
   "audio": "cons_verdadero_falso.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_girasol.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "La leyenda fue escrita por un autor guaraní conocido.",
     "audio": "vf_falso1.mp3",
     "ok": false
    },
    {
     "texto": "La leyenda explica el origen del girasol.",
     "audio": "vf_verdadero.mp3",
     "ok": true
    },
    {
     "texto": "El Sol castigó a Pirayú por pedir ayuda.",
     "audio": "vf_falso2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "verdadero_falso"
  },
  {
   "consigna": "Ordená las palabras para formar la oración.",
   "audio": "cons_origen.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_girasol.jpg",
   "tipo": "ordenar",
   "piezas": [
    "El",
    "girasol",
    "nació",
    "porque",
    "Carandai",
    "se",
    "convirtió",
    "en",
    "flor."
   ],
   "juntar": false,
   "_jclic": "origen"
  },
  {
   "tipo": "cierre",
   "imagen": "img/cierre.jpg",
   "audio": "terminaste_te_felicito.mp3"
  }
 ]
};
