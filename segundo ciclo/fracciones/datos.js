/* Fracciones — QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Renovado desde el paquete JClic original. */
window.DATOS = {
 "meta": {
  "titulo": "Fracciones",
  "area": "Matemática · Segundo ciclo",
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
   "audio": "cons_bienvenida.mp3",
   "final": "¡Comenzamos!",
   "tipo": "rompecabezas",
   "imagen": "img/portada_tema.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "portada_tema"
  },
  {
   "consigna": "Marcá las fracciones impropias (mayores o iguales que un entero).",
   "audio": "cons_impropias.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/f_7_5.png",
     "ok": true
    },
    {
     "imagen": "img/f_9_4.png",
     "ok": true
    },
    {
     "imagen": "img/f_8_8.png",
     "ok": true
    },
    {
     "imagen": "img/f_3_4.png",
     "ok": false
    },
    {
     "imagen": "img/f_2_9.png",
     "ok": false
    },
    {
     "imagen": "img/f_5_9.png",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "impropias"
  },
  {
   "consigna": "Marcá las fracciones irreducibles (no se pueden simplificar).",
   "audio": "cons_irreducibles.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/f_8_13.png",
     "ok": true
    },
    {
     "imagen": "img/f_4_11.png",
     "ok": true
    },
    {
     "imagen": "img/f_26_5.png",
     "ok": true
    },
    {
     "imagen": "img/f_15_9.png",
     "ok": false
    },
    {
     "imagen": "img/f_14_20.png",
     "ok": false
    },
    {
     "imagen": "img/f_6_9.png",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "irreducibles"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_puzzle.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/puzzle1.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "puzzle_pizza"
  },
  {
   "consigna": "Uní cada recta numérica con la fracción que señala el punto rojo.",
   "audio": "cons_recta1.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/recta_a1.png"
    },
    {
     "imagen": "img/recta_a2.png"
    },
    {
     "imagen": "img/recta_a3.png"
    },
    {
     "imagen": "img/recta_a4.png"
    }
   ],
   "der": [
    {
     "imagen": "img/f_1_4.png",
     "audio": "nf_1_4.mp3"
    },
    {
     "imagen": "img/f_2_5.png",
     "audio": "nf_2_5.mp3"
    },
    {
     "imagen": "img/f_3_4.png",
     "audio": "nf_3_4.mp3"
    },
    {
     "imagen": "img/f_5_8.png",
     "audio": "nf_5_8.mp3"
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
   "_jclic": "recta1"
  },
  {
   "consigna": "Uní cada recta con la fracción mayor que uno que señala el punto rojo.",
   "audio": "cons_recta2.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/recta_b1.png"
    },
    {
     "imagen": "img/recta_b2.png"
    },
    {
     "imagen": "img/recta_b3.png"
    },
    {
     "imagen": "img/recta_b4.png"
    }
   ],
   "der": [
    {
     "imagen": "img/f_5_4.png",
     "audio": "nf_5_4.mp3"
    },
    {
     "imagen": "img/f_3_2.png",
     "audio": "nf_3_2.mp3"
    },
    {
     "imagen": "img/f_7_4.png",
     "audio": "nf_7_4.mp3"
    },
    {
     "imagen": "img/f_9_5.png",
     "audio": "nf_9_5.mp3"
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
   "_jclic": "recta2"
  },
  {
   "consigna": "Uní cada fracción impropia con su número mixto.",
   "audio": "cons_mixto_asoc.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/f_23_4.png",
     "audio": "nf_23_4.mp3"
    },
    {
     "imagen": "img/f_17_5.png",
     "audio": "nf_17_5.mp3"
    },
    {
     "imagen": "img/f_29_6.png",
     "audio": "nf_29_6.mp3"
    },
    {
     "imagen": "img/f_30_7.png",
     "audio": "nf_30_7.mp3"
    }
   ],
   "der": [
    {
     "imagen": "img/m_5_3_4.png",
     "audio": "nm_5_3_4.mp3"
    },
    {
     "imagen": "img/m_3_2_5.png",
     "audio": "nm_3_2_5.mp3"
    },
    {
     "imagen": "img/m_4_5_6.png",
     "audio": "nm_4_5_6.mp3"
    },
    {
     "imagen": "img/m_4_2_7.png",
     "audio": "nm_4_2_7.mp3"
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
   "_jclic": "mixto_asoc"
  },
  {
   "consigna": "¿A qué número mixto equivale 23/4?",
   "audio": "cons_mixto_id.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/m_5_3_4.png",
     "ok": true
    },
    {
     "imagen": "img/m_4_3_4.png",
     "ok": false
    },
    {
     "imagen": "img/m_5_1_4.png",
     "ok": false
    },
    {
     "imagen": "img/m_6_3_4.png",
     "ok": false
    }
   ],
   "cols": 2,
   "_jclic": "mixto_id"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_puzzle.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/puzzle2.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "puzzle_torta"
  },
  {
   "consigna": "Marcá las fracciones decimales.",
   "audio": "cons_decimales.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/f_3_10.png",
     "ok": true
    },
    {
     "imagen": "img/f_84_100.png",
     "ok": true
    },
    {
     "imagen": "img/f_19_100.png",
     "ok": true
    },
    {
     "imagen": "img/f_7_9.png",
     "ok": false
    },
    {
     "imagen": "img/f_12_6.png",
     "ok": false
    },
    {
     "imagen": "img/f_25_15.png",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "decimales"
  },
  {
   "consigna": "Uní cada fracción con su lectura.",
   "audio": "cons_lectura.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/f_25_5.png",
     "audio": "nf_25_5.mp3"
    },
    {
     "imagen": "img/f_3_10.png",
     "audio": "nf_3_10.mp3"
    },
    {
     "imagen": "img/f_7_100.png",
     "audio": "nf_7_100.mp3"
    },
    {
     "imagen": "img/f_5_8.png",
     "audio": "nf_5_8.mp3"
    }
   ],
   "der": [
    {
     "texto": "veinticinco quintos",
     "audio": null
    },
    {
     "texto": "tres décimos",
     "audio": null
    },
    {
     "texto": "siete centésimos",
     "audio": null
    },
    {
     "texto": "cinco octavos",
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
   "_jclic": "lectura"
  },
  {
   "consigna": "Uní cada fracción con su lectura.",
   "audio": "cons_lectura2.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/f_4_9.png",
     "audio": "nf_4_9.mp3"
    },
    {
     "imagen": "img/f_7_10.png",
     "audio": "nf_7_10.mp3"
    },
    {
     "imagen": "img/f_9_100.png",
     "audio": "nf_9_100.mp3"
    },
    {
     "imagen": "img/f_2_3.png",
     "audio": "nf_2_3.mp3"
    }
   ],
   "der": [
    {
     "texto": "cuatro novenos",
     "audio": null
    },
    {
     "texto": "siete décimos",
     "audio": null
    },
    {
     "texto": "nueve centésimos",
     "audio": null
    },
    {
     "texto": "dos tercios",
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
   "_jclic": "lectura2"
  },
  {
   "consigna": "Elegí la fracción irreducible equivalente a 18/4.",
   "audio": "cons_equivalente.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/f_9_2.png",
     "ok": true
    },
    {
     "imagen": "img/f_4_18.png",
     "ok": false
    },
    {
     "imagen": "img/f_9_4.png",
     "ok": false
    },
    {
     "imagen": "img/f_18_2.png",
     "ok": false
    }
   ],
   "cols": 2,
   "_jclic": "equivalente"
  },
  {
   "consigna": "Elegí la fracción irreducible equivalente a 12/8.",
   "audio": "cons_equivalente2.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/f_3_2.png",
     "ok": true
    },
    {
     "imagen": "img/f_6_4.png",
     "ok": false
    },
    {
     "imagen": "img/f_12_8.png",
     "ok": false
    },
    {
     "imagen": "img/f_4_3.png",
     "ok": false
    }
   ],
   "cols": 2,
   "_jclic": "equivalente2"
  },
  {
   "consigna": "Uní cada fracción con una equivalente.",
   "audio": "cons_equiv_asoc.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/f_1_2.png",
     "audio": "nf_1_2.mp3"
    },
    {
     "imagen": "img/f_1_3.png",
     "audio": "nf_1_3.mp3"
    },
    {
     "imagen": "img/f_3_4.png",
     "audio": "nf_3_4.mp3"
    },
    {
     "imagen": "img/f_2_5.png",
     "audio": "nf_2_5.mp3"
    }
   ],
   "der": [
    {
     "imagen": "img/f_3_6.png",
     "audio": "nf_3_6.mp3"
    },
    {
     "imagen": "img/f_2_6.png",
     "audio": "nf_2_6.mp3"
    },
    {
     "imagen": "img/f_6_8.png",
     "audio": "nf_6_8.mp3"
    },
    {
     "imagen": "img/f_4_10.png",
     "audio": "nf_4_10.mp3"
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
   "_jclic": "equiv_asoc"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_puzzle.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/puzzle3.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "puzzle_chocolate"
  },
  {
   "consigna": "Caminata de 75 cuadras: ya recorrieron 12/15. ¿Cuántas cuadras faltan?",
   "audio": "cons_caminata.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "15",
     "ok": true
    },
    {
     "texto": "60",
     "ok": false
    },
    {
     "texto": "3",
     "ok": false
    },
    {
     "texto": "12",
     "ok": false
    }
   ],
   "cols": 2,
   "_jclic": "caminata"
  },
  {
   "consigna": "Celeste usa 1/2 del papel y Franco usa 2/4. ¿Qué cartel es más grande?",
   "audio": "cons_carteles.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "son iguales",
     "ok": true
    },
    {
     "texto": "el de Celeste",
     "ok": false
    },
    {
     "texto": "el de Franco",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "carteles"
  },
  {
   "consigna": "Ana pintó 3/4 de un mural y Luis pintó 2/3. ¿Quién pintó más?",
   "audio": "cons_carteles2.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "el de Ana",
     "ok": true
    },
    {
     "texto": "el de Luis",
     "ok": false
    },
    {
     "texto": "los dos iguales",
     "ok": false
    }
   ],
   "cols": 2,
   "_jclic": "carteles2"
  },
  {
   "consigna": "Uní cada dibujo con la fracción que representa.",
   "audio": "cons_grafica.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/g_medio.png"
    },
    {
     "imagen": "img/g_tercio.png"
    },
    {
     "imagen": "img/g_cuarto.png"
    },
    {
     "imagen": "img/g_tres_cuartos.png"
    }
   ],
   "der": [
    {
     "imagen": "img/f_1_2.png",
     "audio": "nf_1_2.mp3"
    },
    {
     "imagen": "img/f_1_3.png",
     "audio": "nf_1_3.mp3"
    },
    {
     "imagen": "img/f_1_4.png",
     "audio": "nf_1_4.mp3"
    },
    {
     "imagen": "img/f_3_4.png",
     "audio": "nf_3_4.mp3"
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
   "_jclic": "grafica"
  },
  {
   "consigna": "Uní cada dibujo con la fracción que representa.",
   "audio": "cons_grafica2.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/gc_2_3.png"
    },
    {
     "imagen": "img/gc_3_5.png"
    },
    {
     "imagen": "img/gc_1_6.png"
    },
    {
     "imagen": "img/gc_5_8.png"
    }
   ],
   "der": [
    {
     "imagen": "img/f_2_3.png",
     "audio": "nf_2_3.mp3"
    },
    {
     "imagen": "img/f_3_5.png",
     "audio": "nf_3_5.mp3"
    },
    {
     "imagen": "img/f_1_6.png",
     "audio": "nf_1_6.mp3"
    },
    {
     "imagen": "img/f_5_8.png",
     "audio": "nf_5_8.mp3"
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
   "_jclic": "grafica2"
  },
  {
   "consigna": "Encontrá las parejas de imágenes iguales.",
   "audio": "cons_memo_img.mp3",
   "final": "¡Muy bien!",
   "tipo": "memoria",
   "pares": [
    [
     {
      "imagen": "img/mf_pizza.jpg",
      "audio": "mf_pizza.mp3"
     },
     {
      "imagen": "img/mf_pizza.jpg",
      "audio": "mf_pizza.mp3"
     }
    ],
    [
     {
      "imagen": "img/mf_mediapizza.jpg",
      "audio": "mf_mediapizza.mp3"
     },
     {
      "imagen": "img/mf_mediapizza.jpg",
      "audio": "mf_mediapizza.mp3"
     }
    ],
    [
     {
      "imagen": "img/mf_chocolate.jpg",
      "audio": "mf_chocolate.mp3"
     },
     {
      "imagen": "img/mf_chocolate.jpg",
      "audio": "mf_chocolate.mp3"
     }
    ],
    [
     {
      "imagen": "img/mf_porciontorta.jpg",
      "audio": "mf_porciontorta.mp3"
     },
     {
      "imagen": "img/mf_porciontorta.jpg",
      "audio": "mf_porciontorta.mp3"
     }
    ],
    [
     {
      "imagen": "img/mf_vaso.jpg",
      "audio": "mf_vaso.mp3"
     },
     {
      "imagen": "img/mf_vaso.jpg",
      "audio": "mf_vaso.mp3"
     }
    ],
    [
     {
      "imagen": "img/mf_cuartos.jpg",
      "audio": "mf_cuartos.mp3"
     },
     {
      "imagen": "img/mf_cuartos.jpg",
      "audio": "mf_cuartos.mp3"
     }
    ]
   ],
   "_jclic": "memo_imagenes"
  },
  {
   "consigna": "Uní cada fracción con su clasificación.",
   "audio": "cons_clasif1.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/f_3_4.png",
     "audio": "nf_3_4.mp3"
    },
    {
     "imagen": "img/f_7_5.png",
     "audio": "nf_7_5.mp3"
    },
    {
     "imagen": "img/f_5_5.png",
     "audio": "nf_5_5.mp3"
    },
    {
     "imagen": "img/f_7_10.png",
     "audio": "nf_7_10.mp3"
    }
   ],
   "der": [
    {
     "texto": "propia",
     "audio": null
    },
    {
     "texto": "impropia",
     "audio": null
    },
    {
     "texto": "aparente",
     "audio": null
    },
    {
     "texto": "decimal",
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
   "_jclic": "clasif1"
  },
  {
   "consigna": "Uní cada fracción con su clasificación.",
   "audio": "cons_clasif2.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/f_2_9.png",
     "audio": "nf_2_9.mp3"
    },
    {
     "imagen": "img/f_11_4.png",
     "audio": "nf_11_4.mp3"
    },
    {
     "imagen": "img/f_6_6.png",
     "audio": "nf_6_6.mp3"
    },
    {
     "imagen": "img/f_9_100.png",
     "audio": "nf_9_100.mp3"
    }
   ],
   "der": [
    {
     "texto": "propia",
     "audio": null
    },
    {
     "texto": "impropia",
     "audio": null
    },
    {
     "texto": "aparente",
     "audio": null
    },
    {
     "texto": "decimal",
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
   "_jclic": "clasif2"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_puzzle.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/puzzle4.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "puzzle_tarta"
  },
  {
   "consigna": "Encontrá: FRACCIÓN - MIXTO - DECIMAL - PROPIA - ENTERO",
   "audio": "cons_sopa.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "sopa",
   "palabras": [
    "fracción",
    "mixto",
    "decimal",
    "propia",
    "entero"
   ],
   "pistas": [
    {
     "imagen": "img/d_fraccion.png",
     "audio": "pal_fraccion.mp3"
    },
    {
     "imagen": "img/d_mixto.png",
     "audio": "pal_mixto.mp3"
    },
    {
     "imagen": "img/d_decimal.png",
     "audio": "pal_decimal.mp3"
    },
    {
     "imagen": "img/d_propia.png",
     "audio": "pal_propia.mp3"
    },
    {
     "imagen": "img/d_entero.png",
     "audio": "pal_entero.mp3"
    }
   ],
   "_jclic": "sopa_fracciones"
  },
  {
   "consigna": "Encontrá: NUMERADOR - DENOMINADOR - EQUIVALENTE - IRREDUCIBLE - APARENTE",
   "audio": "cons_sopa2.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "sopa",
   "palabras": [
    "numerador",
    "denominador",
    "equivalente",
    "irreducible",
    "aparente"
   ],
   "pistas": [
    {
     "imagen": "img/d_numerador.png",
     "audio": "pal_numerador.mp3"
    },
    {
     "imagen": "img/d_denominador.png",
     "audio": "pal_denominador.mp3"
    },
    {
     "imagen": "img/d_equivalente.png",
     "audio": "pal_equivalente.mp3"
    },
    {
     "imagen": "img/d_irreducible.png",
     "audio": "pal_irreducible.mp3"
    },
    {
     "imagen": "img/d_aparente.png",
     "audio": "pal_aparente.mp3"
    }
   ],
   "_jclic": "sopa2"
  },
  {
   "tipo": "cierre",
   "imagen": "img/cierre.jpg",
   "audio": "terminaste_te_felicito.mp3"
  }
 ]
};
