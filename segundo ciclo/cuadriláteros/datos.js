/* Cuadriláteros — QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Renovado desde el paquete JClic original. */
window.DATOS = {
 "meta": {
  "titulo": "Cuadriláteros",
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
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/cuadrilateros_puzzle_resized.jpg",
   "filas": 3,
   "cols": 4,
   "_jclic": "puzzle_portada",
   "audio": "c_arma_el_rompecabezas.mp3"
  },
  {
   "consigna": "Tiene los cuatro lados iguales y los 4 ángulos rectos.",
   "final": "CUADRADO",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/cuadrado.jpg",
     "ok": true
    },
    {
     "imagen": "img/trapecio_isosceles.jpg",
     "ok": false
    },
    {
     "imagen": "img/romboide2_resized.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "cuadrado",
   "audio": "c_tiene_los_cuatro_lados_iguales_y_los_4_angulos_r.mp3"
  },
  {
   "consigna": "Tiene los lados iguales dos a dos y los 4 ángulos rectos.",
   "final": "RECTÁNGULO",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/rectangulo.jpg",
     "ok": true
    },
    {
     "imagen": "img/rombo2_resized.jpg",
     "ok": false
    },
    {
     "imagen": "img/trapecio_escaleno.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "rectángulo",
   "audio": "c_tiene_los_lados_iguales_dos_a_dos_y_los_4_angulo.mp3"
  },
  {
   "consigna": "Tiene los cuatro lados iguales.",
   "final": "ROMBO",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/rombo_resized.jpg",
     "ok": true
    },
    {
     "imagen": "img/trapecio_escaleno.jpg",
     "ok": false
    },
    {
     "imagen": "img/trapecio_isosceles.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "rombo",
   "audio": "c_tiene_los_cuatro_lados_iguales.mp3"
  },
  {
   "consigna": "Tiene los lados iguales dos a dos.",
   "final": "ROMBOIDE",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/romboide2_resized.jpg",
     "ok": true
    },
    {
     "imagen": "img/cuadrado.jpg",
     "ok": false
    },
    {
     "imagen": "img/trapecio_isosceles.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "romboide",
   "audio": "c_tiene_los_lados_iguales_dos_a_dos.mp3"
  },
  {
   "consigna": "Tiene un ángulo recto.",
   "final": "TRAPECIO RECTÁNGULO",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/trapecio_rectangulo.jpg",
     "ok": true
    },
    {
     "imagen": "img/trapecio_isosceles.jpg",
     "ok": false
    },
    {
     "imagen": "img/romboide2_resized.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "trapepcio rectángulo",
   "audio": "c_tiene_un_angulo_recto.mp3"
  },
  {
   "consigna": "Tiene los lados no paralelos iguales.",
   "final": "TRAPECIO ISÓSCELES",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/trapecio_isosceles.jpg",
     "ok": true
    },
    {
     "imagen": "img/cuadrado.jpg",
     "ok": false
    },
    {
     "imagen": "img/rombo_resized.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "trapepcio isósceles",
   "audio": "c_tiene_los_lados_no_paralelos_iguales.mp3"
  },
  {
   "consigna": "No tiene ningún lado igual ni ningún ángulo recto.",
   "final": "TRAPECIO ESCALENO",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/trapecio_escaleno.jpg",
     "ok": true
    },
    {
     "imagen": "img/rombo_resized.jpg",
     "ok": false
    },
    {
     "imagen": "img/rectangulo.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "trapepcio escaleno",
   "audio": "c_no_tiene_ningun_lado_igual_ni_ningun_angulo_rect.mp3"
  },
  {
   "consigna": "Son cuadriláteros que no tienen ningún lado igual ni paralelo.",
   "final": "TRAPEZOIDE",
   "tipo": "identificar",
   "celdas": [
    {
     "imagen": "img/trapezoide_2_.jpg",
     "ok": true
    },
    {
     "imagen": "img/rectangulo.jpg",
     "ok": false
    },
    {
     "imagen": "img/romboide2_resized.jpg",
     "ok": false
    }
   ],
   "cols": 3,
   "_jclic": "trapecio trapezoide",
   "audio": "c_son_cuadrilateros_que_no_tienen_ningun_lado_igua.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_cuadrado_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "c",
    "u",
    "a",
    "d",
    "r",
    "a",
    "d",
    "o"
   ],
   "juntar": true,
   "_jclic": "palabra_cuadrado",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_rectangulo_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "r",
    "e",
    "c",
    "t",
    "á",
    "n",
    "g",
    "u",
    "l",
    "o"
   ],
   "juntar": true,
   "_jclic": "palabra_rectángulo",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_rombo_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "r",
    "o",
    "m",
    "b",
    "o"
   ],
   "juntar": true,
   "_jclic": "palabra_rombo",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_romboide_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "r",
    "o",
    "m",
    "b",
    "o",
    "i",
    "d",
    "e"
   ],
   "juntar": true,
   "_jclic": "palabra_romboide",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_trapecio_escaleno_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "t",
    "r",
    "a",
    "p",
    "e",
    "c",
    "i",
    "o",
    "e",
    "s",
    "c",
    "a",
    "l",
    "e",
    "n",
    "o"
   ],
   "juntar": true,
   "espacios": [
    7
   ],
   "_jclic": "palabra_trapecio_escaleno",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_trapecio_isosceles_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "t",
    "r",
    "a",
    "p",
    "e",
    "c",
    "i",
    "o",
    "i",
    "s",
    "ó",
    "s",
    "c",
    "e",
    "l",
    "e",
    "s"
   ],
   "juntar": true,
   "espacios": [
    7
   ],
   "_jclic": "palabra_trapecio_isósceles",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_trapecio_rectangulo_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "t",
    "r",
    "a",
    "p",
    "e",
    "c",
    "i",
    "o",
    "r",
    "e",
    "c",
    "t",
    "á",
    "n",
    "g",
    "u",
    "l",
    "o"
   ],
   "juntar": true,
   "espacios": [
    7
   ],
   "_jclic": "palabra_trapecio_rectángulo",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá la palabra.",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_trapezoide_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "t",
    "r",
    "a",
    "p",
    "e",
    "z",
    "o",
    "i",
    "d",
    "e"
   ],
   "juntar": true,
   "_jclic": "palabra_trapezoide",
   "audio": "c_arma_la_palabra.mp3"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/portada1_resized.jpg",
   "filas": 3,
   "cols": 4,
   "_jclic": "puzzle_portada_1",
   "audio": "c_arma_el_rompecabezas.mp3"
  },
  {
   "consigna": "Armá la definición de cuadrilátero.",
   "final": "¡Muy bien!",
   "imagen": "img/portada_cuadri2_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Polígono",
    "cerrado",
    "de",
    "4",
    "lados."
   ],
   "juntar": false,
   "_jclic": "ora_cuadriláteros",
   "audio": "c_arma_la_definicion_de_cuadrilatero.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "CUADRADO",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Tiene",
    "los",
    "cuatro",
    "lados",
    "iguales",
    "y",
    "los",
    "cuatro",
    "ángulos",
    "rectos."
   ],
   "juntar": false,
   "_jclic": "ora_cuadrado",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "RECTÁNGULO",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Tiene",
    "los",
    "lados",
    "iguales",
    "dos",
    "a",
    "dos",
    "y",
    "los",
    "cuatro",
    "ángulos",
    "rectos."
   ],
   "juntar": false,
   "_jclic": "ora_rectángulo",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "ROMBO",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "El",
    "rombo",
    "tiene",
    "los",
    "cuatro",
    "lados",
    "iguales."
   ],
   "juntar": false,
   "_jclic": "ora_rombo",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "ROMBOIDE",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Tiene",
    "los",
    "lados",
    "iguales",
    "dos",
    "a",
    "dos."
   ],
   "juntar": false,
   "_jclic": "ora_romboide",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "RECTÁNGULO",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "El",
    "trapecio",
    "rectángulo",
    "tiene",
    "un",
    "ángulo",
    "recto."
   ],
   "juntar": false,
   "_jclic": "ora_trapecio rectángulo",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "RECTÁNGULO",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Tiene",
    "los",
    "lados",
    "no",
    "paralelos",
    "iguales."
   ],
   "juntar": false,
   "_jclic": "ora_isósceles",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "TRAPECIO ISÓSCELES",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Tiene",
    "los",
    "lados",
    "no",
    "paralelos",
    "iguales."
   ],
   "juntar": false,
   "_jclic": "ora_trapecio isósceles",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "TRAPECIO ISÓSCELES",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "No",
    "tiene",
    "ningún",
    "lado",
    "igual",
    "ni",
    "ángulos",
    "rectos."
   ],
   "juntar": false,
   "_jclic": "ora_trapecio escaleno",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Armá la oración.",
   "final": "TRAPECIO ISÓSCELES",
   "imagen": "img/pizarra_resized.jpg",
   "tipo": "ordenar",
   "piezas": [
    "No",
    "tiene",
    "ningún",
    "lado",
    "igual",
    "ni",
    "ángulos",
    "rectos."
   ],
   "juntar": false,
   "_jclic": "ora_trapezoide",
   "audio": "c_arma_la_oracion.mp3"
  },
  {
   "consigna": "Uní cada figura con su descripción.",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/cuadrado.jpg"
    },
    {
     "imagen": "img/rectangulo.jpg"
    },
    {
     "imagen": "img/rombo_resized.jpg"
    },
    {
     "imagen": "img/romboide2_resized.jpg"
    }
   ],
   "der": [
    {
     "texto": "Tiene los cuatro lados iguales y los 4 ángulos rectos.",
     "audio": null
    },
    {
     "texto": "Tiene los lados iguales dos a dos y los 4 ángulos rectos.",
     "audio": null
    },
    {
     "texto": "Tiene los cuatro lados iguales.",
     "audio": null
    },
    {
     "texto": "Tiene los lados iguales dos a dos.",
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
   "_jclic": "unir_2",
   "audio": "c_uni_cada_figura_con_su_descripcion.mp3"
  },
  {
   "consigna": "Uní cada figura con su descripción.",
   "final": "¡Muy bien!",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/trapecio_escaleno.jpg"
    },
    {
     "imagen": "img/trapecio_isosceles.jpg"
    },
    {
     "imagen": "img/trapecio_rectangulo.jpg"
    },
    {
     "imagen": "img/trapezoide_2_.jpg"
    }
   ],
   "der": [
    {
     "texto": "No tiene ningún lado igual ni ningún ángulo recto.",
     "audio": null
    },
    {
     "texto": "Tiene los lados no paralelos iguales.",
     "audio": null
    },
    {
     "texto": "Tiene un ángulo recto.",
     "audio": null
    },
    {
     "texto": "Son cuadriláteros que no tienen ningún lado igual ni paralelo.",
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
   "_jclic": "unir_3",
   "audio": "c_uni_cada_figura_con_su_descripcion.mp3"
  },
  {
   "consigna": "Elegí la opción correcta.",
   "final": "¡Muy bien!",
   "tipo": "completar",
   "partes": [
    "1. El ",
    {
     "hueco": "cuadrado",
     "opciones": [
      "rectángulo",
      "cuadrado",
      "trapezoide"
     ]
    },
    " tiene los cuatro lados iguales y los 4 ángulos rectos. 2. El rectángulo tiene los lados iguales dos a dos y los 4 ángulos ",
    {
     "hueco": "rectos",
     "opciones": [
      "agudos",
      "rectos",
      "obtusos"
     ]
    },
    ". 3. El rombo tiene los ",
    {
     "hueco": "cuatro",
     "opciones": [
      "tres",
      "dos",
      "cuatro"
     ]
    },
    " lados iguales. 4. El romboide tiene los lados ",
    {
     "hueco": "iguales",
     "opciones": [
      "largos",
      "iguales",
      "pares"
     ]
    },
    " dos a dos. 5. El trapecio ",
    {
     "hueco": "rectángulo",
     "opciones": [
      "isósceles",
      "escaleno",
      "rectángulo"
     ]
    },
    " tiene un ángulo recto. 6. El trapecio isósceles tiene los ",
    {
     "hueco": "lados",
     "opciones": [
      "lados",
      "ángulos",
      "vértices"
     ]
    },
    " no paralelos iguales. 7. El trapecio ",
    {
     "hueco": "escaleno",
     "opciones": [
      "cuadrado",
      "romboide",
      "escaleno"
     ]
    },
    " no tiene ningún lado igual ni ningún ángulo recto. 8. El trapezoide es un cuadrilátero que no tiene ningún ",
    {
     "hueco": "lado",
     "opciones": [
      "lado",
      "cuadrado",
      "rectángulo"
     ]
    },
    " igual ni paralelo."
   ],
   "grande": false,
   "_jclic": "eligeopción",
   "audio": "c_elegi_la_opcion_correcta.mp3"
  },
  {
   "consigna": "Encontrá los iguales.",
   "final": "¡Muy bien!",
   "tipo": "memoria",
   "pares": [
    [
     {
      "texto": "cuadrado",
      "imagen": "img/cuadrado.jpg",
      "audio": null
     },
     {
      "texto": "cuadrado",
      "imagen": "img/cuadrado.jpg",
      "audio": null
     }
    ],
    [
     {
      "texto": "rectángulo",
      "imagen": "img/rectangulo.jpg",
      "audio": null
     },
     {
      "texto": "rectángulo",
      "imagen": "img/rectangulo.jpg",
      "audio": null
     }
    ],
    [
     {
      "texto": "rombo",
      "imagen": "img/rombo_resized.jpg",
      "audio": null
     },
     {
      "texto": "rombo",
      "imagen": "img/rombo_resized.jpg",
      "audio": null
     }
    ],
    [
     {
      "texto": "romboide",
      "imagen": "img/romboide2_resized.jpg",
      "audio": null
     },
     {
      "texto": "romboide",
      "imagen": "img/romboide2_resized.jpg",
      "audio": null
     }
    ],
    [
     {
      "texto": "trapecio rectángulo",
      "imagen": "img/trapecio_rectangulo.jpg",
      "audio": null
     },
     {
      "texto": "trapecio rectángulo",
      "imagen": "img/trapecio_rectangulo.jpg",
      "audio": null
     }
    ],
    [
     {
      "texto": "trapecio isósceles",
      "imagen": "img/trapecio_isosceles.jpg",
      "audio": null
     },
     {
      "texto": "trapecio isósceles",
      "imagen": "img/trapecio_isosceles.jpg",
      "audio": null
     }
    ],
    [
     {
      "texto": "trapecio escaleno",
      "imagen": "img/trapecio_escaleno.jpg",
      "audio": null
     },
     {
      "texto": "trapecio escaleno",
      "imagen": "img/trapecio_escaleno.jpg",
      "audio": null
     }
    ],
    [
     {
      "texto": "trapezoide",
      "imagen": "img/trapezoide_2_.jpg",
      "audio": null
     },
     {
      "texto": "trapezoide",
      "imagen": "img/trapezoide_2_.jpg",
      "audio": null
     }
    ]
   ],
   "_jclic": "memo1",
   "audio": "c_encontra_los_iguales.mp3"
  },
  {
   "consigna": "Armá el rompecabezas.",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/memocuadri.jpg",
   "filas": 4,
   "cols": 3,
   "_jclic": "rompe",
   "audio": "c_arma_el_rompecabezas.mp3"
  },
  {
   "tipo": "cierre",
   "imagen": "img/cierre.jpg",
   "audio": "terminaste_te_felicito.mp3"
  }
 ]
};
