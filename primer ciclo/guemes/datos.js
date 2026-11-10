/* Martín Miguel de Güemes — QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Renovado desde el paquete JClic original. */
window.DATOS = {
 "meta": {
  "titulo": "Martín Miguel de Güemes",
  "area": "Ciencias Sociales · Primer ciclo · Efemérides",
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
   "audio": "cons_portadaclic.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/foto_gustavo.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "portadaclic"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_welcome.mp3",
   "final": "¡Empecemos!",
   "tipo": "rompecabezas",
   "imagen": "img/welcome_img.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "welcome"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "c_arma_el_rompecabezas.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/guemes_retrato.jpg",
   "filas": 3,
   "cols": 3,
   "_jclic": "puzzle_guemes",
   "audioPalabra": "narr_guemes.mp3"
  },
  {
   "consigna": "¿Qué hizo Güemes? Escuchá cada imagen y tocá la correcta.",
   "audio": "cons_que_hizo.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/quehizo_defendio.jpg",
     "audio": "accion_defendio.mp3",
     "ok": true
    },
    {
     "imagen": "img/quehizo_rey.jpg",
     "audio": "accion_rey.mp3",
     "ok": false
    },
    {
     "imagen": "img/quehizo_mar.jpg",
     "audio": "accion_mar.mp3",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "que_hizo"
  },
  {
   "consigna": "¿Dónde nació Güemes?",
   "audio": "cons_donde_nacio.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Salta",
     "audio": "prov_salta.mp3",
     "ok": true
    },
    {
     "texto": "Buenos Aires",
     "audio": "prov_buenosaires.mp3",
     "ok": false
    },
    {
     "texto": "Tucumán",
     "audio": "prov_tucuman.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "donde_nacio"
  },
  {
   "consigna": "Uní cada dibujo con su palabra.",
   "audio": "cons_match.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/guemes_icono.jpg",
     "audio": "nom_guemes.mp3"
    },
    {
     "imagen": "img/gaucho.jpg",
     "audio": "nom_gaucho.mp3"
    },
    {
     "imagen": "img/caballo.jpg",
     "audio": "nom_caballo.mp3"
    },
    {
     "imagen": "img/bandera.jpg",
     "audio": "nom_bandera.mp3"
    }
   ],
   "der": [
    {
     "texto": "Güemes",
     "audio": "nom_guemes.mp3"
    },
    {
     "texto": "gaucho",
     "audio": "nom_gaucho.mp3"
    },
    {
     "texto": "caballo",
     "audio": "nom_caballo.mp3"
    },
    {
     "texto": "bandera",
     "audio": "nom_bandera.mp3"
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
   "_jclic": "match_palabras"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_puzzle.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/escena_gauchos.jpg",
   "filas": 3,
   "cols": 3,
   "_jclic": "puzzle_gauchos"
  },
  {
   "consigna": "Uní cada cosa del gaucho con su nombre.",
   "audio": "cons_match_gaucho.mp3",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/poncho.jpg",
     "audio": "nom_poncho.mp3"
    },
    {
     "imagen": "img/mate.jpg",
     "audio": "nom_mate.mp3"
    },
    {
     "imagen": "img/sombrero.jpg",
     "audio": "nom_sombrero.mp3"
    },
    {
     "imagen": "img/caballo.jpg",
     "audio": "nom_caballo.mp3"
    }
   ],
   "der": [
    {
     "texto": "poncho",
     "audio": "nom_poncho.mp3"
    },
    {
     "texto": "mate",
     "audio": "nom_mate.mp3"
    },
    {
     "texto": "sombrero",
     "audio": "nom_sombrero.mp3"
    },
    {
     "texto": "caballo",
     "audio": "nom_caballo.mp3"
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
   "_jclic": "match_gaucho"
  },
  {
   "consigna": "Tocá las cosas que usaba el gaucho.",
   "audio": "cons_identify_gaucho.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/poncho.jpg",
     "audio": "nom_poncho.mp3",
     "ok": true
    },
    {
     "imagen": "img/mate.jpg",
     "audio": "nom_mate.mp3",
     "ok": true
    },
    {
     "imagen": "img/sombrero.jpg",
     "audio": "nom_sombrero.mp3",
     "ok": true
    },
    {
     "imagen": "img/facon.jpg",
     "audio": "nom_facon.mp3",
     "ok": true
    },
    {
     "imagen": "img/rey.jpg",
     "audio": "nom_rey.mp3",
     "ok": false
    },
    {
     "imagen": "img/barco.jpg",
     "audio": "nom_barco.mp3",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "identify_gaucho"
  },
  {
   "consigna": "Encontrá las parejas iguales.",
   "audio": "cons_memory.mp3",
   "final": "¡Muy bien!",
   "tipo": "memoria",
   "pares": [
    [
     {
      "imagen": "img/guemes_icono.jpg",
      "audio": "nom_guemes.mp3"
     },
     {
      "imagen": "img/guemes_icono.jpg",
      "audio": "nom_guemes.mp3"
     }
    ],
    [
     {
      "imagen": "img/gaucho.jpg",
      "audio": "nom_gaucho.mp3"
     },
     {
      "imagen": "img/gaucho.jpg",
      "audio": "nom_gaucho.mp3"
     }
    ],
    [
     {
      "imagen": "img/caballo.jpg",
      "audio": "nom_caballo.mp3"
     },
     {
      "imagen": "img/caballo.jpg",
      "audio": "nom_caballo.mp3"
     }
    ],
    [
     {
      "imagen": "img/bandera.jpg",
      "audio": "nom_bandera.mp3"
     },
     {
      "imagen": "img/bandera.jpg",
      "audio": "nom_bandera.mp3"
     }
    ],
    [
     {
      "imagen": "img/poncho.jpg",
      "audio": "nom_poncho.mp3"
     },
     {
      "imagen": "img/poncho.jpg",
      "audio": "nom_poncho.mp3"
     }
    ],
    [
     {
      "imagen": "img/mate.jpg",
      "audio": "nom_mate.mp3"
     },
     {
      "imagen": "img/mate.jpg",
      "audio": "nom_mate.mp3"
     }
    ]
   ],
   "_jclic": "memory_img"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_puzzle.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/guemes_caballo.jpg",
   "filas": 3,
   "cols": 3,
   "_jclic": "puzzle_caballo"
  },
  {
   "consigna": "Encontrá: Güemes - Salta - gaucho - patria - caballo",
   "audio": "c_encontra_guemes_salta_gaucho_patria_caballo.mp3",
   "final": "¡Muy bien!",
   "tipo": "sopa",
   "palabras": [
    "güemes",
    "salta",
    "gaucho",
    "patria",
    "caballo"
   ],
   "pistas": [
    {
     "imagen": "img/guemes_icono.jpg",
     "audio": "nom_guemes.mp3"
    },
    {
     "imagen": "img/salta.jpg",
     "audio": "nom_salta.mp3"
    },
    {
     "imagen": "img/gaucho.jpg",
     "audio": "nom_gaucho.mp3"
    },
    {
     "imagen": "img/bandera.jpg",
     "audio": "nom_patria.mp3"
    },
    {
     "imagen": "img/caballo.jpg",
     "audio": "nom_caballo.mp3"
    }
   ],
   "_jclic": "sopa_palabras",
   "audioPalabra": "audio_sopa1.mp3"
  },
  {
   "consigna": "Ordená las palabras para formar la frase.",
   "audio": "c_ordena_las_palabras_para_formar_la_frase.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_alegorico.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Güemes",
    "defendió",
    "la",
    "Patria."
   ],
   "juntar": false,
   "_jclic": "completar_frase",
   "audioPalabra": "narr_frase.mp3",
   "audioCompleto": "p_guemes_defendio_la_patria.mp3"
  },
  {
   "consigna": "Tocá lo que es verdadero sobre Güemes.",
   "audio": "cons_verdadero.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/guemes_icono.jpg",
     "audio": "verd_guemes.mp3",
     "ok": true
    },
    {
     "imagen": "img/gaucho.jpg",
     "audio": "verd_gaucho.mp3",
     "ok": true
    },
    {
     "imagen": "img/salta.jpg",
     "audio": "verd_salta.mp3",
     "ok": true
    },
    {
     "imagen": "img/rey.jpg",
     "audio": "falso_rey.mp3",
     "ok": false
    },
    {
     "imagen": "img/barco.jpg",
     "audio": "falso_barco.mp3",
     "ok": false
    },
    {
     "imagen": "img/bandera.jpg",
     "audio": "verd_bandera.mp3",
     "ok": true
    }
   ],
   "cols": 3,
   "_jclic": "verdadero"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "audio": "cons_puzzle.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/escena_bandera.jpg",
   "filas": 3,
   "cols": 3,
   "_jclic": "puzzle_bandera"
  },
  {
   "consigna": "Encontrá las parejas iguales.",
   "audio": "cons_memory.mp3",
   "final": "¡Muy bien!",
   "tipo": "memoria",
   "pares": [
    [
     {
      "texto": "Güemes",
      "audio": "nom_guemes.mp3"
     },
     {
      "texto": "Güemes",
      "audio": "nom_guemes.mp3"
     }
    ],
    [
     {
      "texto": "Salta",
      "audio": "nom_salta.mp3"
     },
     {
      "texto": "Salta",
      "audio": "nom_salta.mp3"
     }
    ],
    [
     {
      "texto": "gaucho",
      "audio": "nom_gaucho.mp3"
     },
     {
      "texto": "gaucho",
      "audio": "nom_gaucho.mp3"
     }
    ],
    [
     {
      "texto": "patria",
      "audio": "nom_patria.mp3"
     },
     {
      "texto": "patria",
      "audio": "nom_patria.mp3"
     }
    ],
    [
     {
      "texto": "norte",
      "audio": "nom_norte.mp3"
     },
     {
      "texto": "norte",
      "audio": "nom_norte.mp3"
     }
    ],
    [
     {
      "texto": "héroe",
      "audio": "nom_heroe.mp3"
     },
     {
      "texto": "héroe",
      "audio": "nom_heroe.mp3"
     }
    ]
   ],
   "_jclic": "memory_texto"
  },
  {
   "consigna": "¡Viva la patria! Tocá las imágenes patrias.",
   "audio": "cons_viva_patria.mp3",
   "final": "¡Muy bien!",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/bandera.jpg",
     "audio": "nom_bandera.mp3",
     "ok": true
    },
    {
     "imagen": "img/sol.jpg",
     "audio": "nom_sol.mp3",
     "ok": true
    },
    {
     "imagen": "img/guemes_icono.jpg",
     "audio": "nom_guemes.mp3",
     "ok": true
    },
    {
     "imagen": "img/rey.jpg",
     "audio": "nom_rey.mp3",
     "ok": false
    },
    {
     "imagen": "img/barco.jpg",
     "audio": "nom_barco.mp3",
     "ok": false
    },
    {
     "imagen": "img/mate.jpg",
     "audio": "nom_mate.mp3",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "viva_patria"
  },
  {
   "consigna": "Encontrá: Güemes - Salta - gaucho - poncho.",
   "audio": "c_encontra_guemes_salta_gaucho_poncho.mp3",
   "final": "¡Muy bien!",
   "tipo": "sopa",
   "palabras": [
    "güemes",
    "salta",
    "gaucho",
    "poncho"
   ],
   "pistas": [
    {
     "imagen": "img/guemes_icono.jpg",
     "audio": "nom_guemes.mp3"
    },
    {
     "imagen": "img/salta.jpg",
     "audio": "nom_salta.mp3"
    },
    {
     "imagen": "img/gaucho.jpg",
     "audio": "nom_gaucho.mp3"
    },
    {
     "imagen": "img/poncho.jpg",
     "audio": "nom_poncho.mp3"
    }
   ],
   "_jclic": "sopa_repaso",
   "audioPalabra": "audio_sopa2.mp3"
  },
  {
   "tipo": "cierre",
   "imagen": "img/cierre.jpg",
   "audio": "terminaste_te_felicito.mp3"
  }
 ]
};
