/* Clasificación de Animales — QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Renovado desde el paquete JClic original. */
window.DATOS = {
 "meta": {
  "titulo": "Clasificación de Animales",
  "area": "Ciencias Naturales · Segundo ciclo",
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
   "audio": "cons_portada.mp3",
   "final": "¡Muy bien! ¡A jugar!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "rompecabezas",
   "imagen": "img/portada.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "portadaclic"
  },
  {
   "consigna": "Armá la oración.",
   "audio": "cons_rompe.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/carn_leon.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Los",
    "carnívoros",
    "se",
    "alimentan",
    "de",
    "carne",
    "de",
    "otros."
   ],
   "juntar": false,
   "_jclic": "ora1"
  },
  {
   "consigna": "Armá la oración.",
   "audio": "cons_rompe.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/herb_vaca.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Los",
    "herbívoros",
    "solo",
    "se",
    "alimentan",
    "de",
    "plantas",
    "vegetales."
   ],
   "juntar": false,
   "_jclic": "ora2"
  },
  {
   "consigna": "Armá la oración.",
   "audio": "cons_rompe.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/omni_oso.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Los",
    "omnívoros",
    "comen",
    "plantas",
    "y",
    "también",
    "otros",
    "animales."
   ],
   "juntar": false,
   "_jclic": "ora3"
  },
  {
   "consigna": "Armá la oración.",
   "audio": "cons_rompe.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/vert_delfin.jpg",
   "tipo": "ordenar",
   "piezas": [
    "Los",
    "vertebrados",
    "tienen",
    "columna",
    "vertebral",
    "en",
    "su",
    "cuerpo."
   ],
   "juntar": false,
   "_jclic": "ora4"
  },
  {
   "consigna": "Clasificá cada animal según su alimentación.",
   "audio": "cons_clasificar.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "León",
     "imagen": "img/carn_leon.jpg",
     "audio": "ref_leon.mp3"
    },
    {
     "texto": "Vaca",
     "imagen": "img/herb_vaca.jpg",
     "audio": "ref_vaca.mp3"
    },
    {
     "texto": "Oso",
     "imagen": "img/omni_oso.jpg",
     "audio": "ref_oso.mp3"
    },
    {
     "texto": "Tiburón",
     "imagen": "img/carn_tiburon.jpg",
     "audio": "ref_tiburon.mp3"
    },
    {
     "texto": "Conejo",
     "imagen": "img/herb_conejo.jpg",
     "audio": "ref_conejo.mp3"
    },
    {
     "texto": "Perro",
     "imagen": "img/omni_perro.jpg",
     "audio": "ref_perro.mp3"
    }
   ],
   "der": [
    {
     "texto": "Carnívoro",
     "audio": "term_carnivoro.mp3"
    },
    {
     "texto": "Herbívoro",
     "audio": "term_herbivoro.mp3"
    },
    {
     "texto": "Omnívoro",
     "audio": "term_omnivoro.mp3"
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
     0
    ],
    [
     4,
     1
    ],
    [
     5,
     2
    ]
   ],
   "derRepetible": true,
   "_jclic": "clasif1"
  },
  {
   "consigna": "Clasificá cada animal según su alimentación.",
   "audio": "cons_clasificar.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Águila",
     "imagen": "img/carn_aguila.jpg",
     "audio": "ref_aguila.mp3"
    },
    {
     "texto": "Caballo",
     "imagen": "img/herb_caballo.jpg",
     "audio": "ref_caballo.mp3"
    },
    {
     "texto": "Pato",
     "imagen": "img/omni_pato.jpg",
     "audio": "ref_pato.mp3"
    },
    {
     "texto": "Cocodrilo",
     "imagen": "img/carn_cocodrilo.jpg",
     "audio": "ref_cocodrilo.mp3"
    },
    {
     "texto": "Oveja",
     "imagen": "img/herb_oveja.jpg",
     "audio": null
    },
    {
     "texto": "Gallina",
     "imagen": "img/omni_gallina.jpg",
     "audio": "ref_paloma.mp3"
    }
   ],
   "der": [
    {
     "texto": "Carnívoro",
     "audio": "term_carnivoro.mp3"
    },
    {
     "texto": "Herbívoro",
     "audio": "term_herbivoro.mp3"
    },
    {
     "texto": "Omnívoro",
     "audio": "term_omnivoro.mp3"
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
     0
    ],
    [
     4,
     1
    ],
    [
     5,
     2
    ]
   ],
   "derRepetible": true,
   "_jclic": "clasif2"
  },
  {
   "consigna": "Uní cada característica con el tipo de animal.",
   "audio": "cons_unir.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/fondo_animales_resized.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Nace del vientre de su madre.",
     "audio": null
    },
    {
     "texto": "Tiene la piel desnuda y húmeda.",
     "audio": null
    },
    {
     "texto": "Tiene escamas y aletas.",
     "audio": null
    },
    {
     "texto": "Es invertebrado y tiene seis patas.",
     "audio": null
    },
    {
     "texto": "Tiene escamas y vive en la tierra.",
     "audio": null
    },
    {
     "texto": "Pone huevos y tiene plumas.",
     "audio": null
    }
   ],
   "der": [
    {
     "texto": "Mamífero",
     "audio": "term_mamifero.mp3"
    },
    {
     "texto": "Anfibio",
     "audio": "term_anfibio.mp3"
    },
    {
     "texto": "Pez",
     "audio": "term_pez.mp3"
    },
    {
     "texto": "Insecto",
     "audio": "term_insecto.mp3"
    },
    {
     "texto": "Reptil",
     "audio": "term_reptil.mp3"
    },
    {
     "texto": "Ave",
     "audio": "term_ave.mp3"
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
    ],
    [
     4,
     4
    ],
    [
     5,
     5
    ]
   ],
   "derRepetible": false,
   "_jclic": "unir1"
  },
  {
   "consigna": "Uní cada animal con su grupo.",
   "audio": "cons_unir.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/portada3_resized.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Loro",
     "imagen": "img/vert_loro.jpg",
     "audio": "ref_paloma.mp3"
    },
    {
     "texto": "Pez",
     "imagen": "img/vert_pez.jpg",
     "audio": "ref_tiburon.mp3"
    },
    {
     "texto": "Rana",
     "imagen": "img/vert_rana.jpg",
     "audio": "ref_rana.mp3"
    },
    {
     "texto": "Serpiente",
     "imagen": "img/vert_serpiente.jpg",
     "audio": "ref_serpiente.mp3"
    }
   ],
   "der": [
    {
     "texto": "Ave",
     "audio": "term_ave.mp3"
    },
    {
     "texto": "Pez",
     "audio": "term_pez.mp3"
    },
    {
     "texto": "Anfibio",
     "audio": "term_anfibio.mp3"
    },
    {
     "texto": "Reptil",
     "audio": "term_reptil.mp3"
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
   "_jclic": "unir2"
  },
  {
   "consigna": "Uní cada animal con su tipo de alimentación.",
   "audio": "cons_unir.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/fondo_animales_resized.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Tigre",
     "imagen": "img/carn_tigre.jpg",
     "audio": "ref_leon.mp3"
    },
    {
     "texto": "Elefante",
     "imagen": "img/herb_elefante.jpg",
     "audio": "ref_ballena.mp3"
    },
    {
     "texto": "Cerdo",
     "imagen": "img/omni_cerdo.jpg",
     "audio": "ref_oso.mp3"
    },
    {
     "texto": "Jirafa",
     "imagen": "img/herb_jirafa.jpg",
     "audio": "ref_caballo.mp3"
    }
   ],
   "der": [
    {
     "texto": "Carnívoro",
     "audio": "term_carnivoro.mp3"
    },
    {
     "texto": "Herbívoro",
     "audio": "term_herbivoro.mp3"
    },
    {
     "texto": "Omnívoro",
     "audio": "term_omnivoro.mp3"
    },
    {
     "texto": "Herbívoro",
     "audio": "term_herbivoro.mp3"
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
   "_jclic": "unir3"
  },
  {
   "consigna": "¿Cuál de estos animales es un mamífero? Tocá la respuesta correcta.",
   "audio": "cons_identificar.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Rana — tiene piel húmeda y vive en agua y tierra.",
     "imagen": "img/vert_rana.jpg",
     "audio": "ref_rana.mp3",
     "ok": false
    },
    {
     "texto": "Delfín — nace del vientre de su madre y respira aire.",
     "imagen": "img/vert_delfin.jpg",
     "audio": "ref_delfin.mp3",
     "ok": true
    },
    {
     "texto": "Serpiente — tiene escamas y pone huevos en la tierra.",
     "imagen": "img/vert_serpiente.jpg",
     "audio": "ref_serpiente.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "identi1"
  },
  {
   "consigna": "¿Cuál de estos es un animal invertebrado? Tocá la respuesta correcta.",
   "audio": "cons_identificar.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Tiburón — tiene columna vertebral y esqueleto interno.",
     "imagen": "img/carn_tiburon.jpg",
     "audio": "ref_tiburon.mp3",
     "ok": false
    },
    {
     "texto": "Caballo — es un mamífero con columna vertebral.",
     "imagen": "img/herb_caballo.jpg",
     "audio": "ref_caballo.mp3",
     "ok": false
    },
    {
     "texto": "Pulpo — no tiene columna vertebral ni esqueleto interno.",
     "imagen": "img/inv_pulpo.jpg",
     "audio": "ref_pulpo.mp3",
     "ok": true
    }
   ],
   "cols": 1,
   "_jclic": "identi2"
  },
  {
   "consigna": "¿Cuál de estos animales es un reptil? Tocá la respuesta correcta.",
   "audio": "cons_identificar.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Cocodrilo — tiene escamas, pone huevos y es de sangre fría.",
     "imagen": "img/carn_cocodrilo.jpg",
     "audio": "ref_cocodrilo.mp3",
     "ok": true
    },
    {
     "texto": "Loro — tiene plumas y pone huevos, es un ave.",
     "imagen": "img/vert_loro.jpg",
     "audio": "ref_paloma.mp3",
     "ok": false
    },
    {
     "texto": "Estrella de mar — es un invertebrado marino.",
     "imagen": "img/inv_estrella.jpg",
     "audio": "ref_pulpo.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "identi3"
  },
  {
   "consigna": "¿Verdadero o Falso? El murciélago es el único mamífero que puede volar.",
   "audio": "cons_vof.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/vert_loro.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Verdadero",
     "audio": "vof_verdadero.mp3",
     "ok": true
    },
    {
     "texto": "Falso",
     "audio": "vof_falso.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "mezclar": false,
   "_jclic": "vof1"
  },
  {
   "consigna": "¿Verdadero o Falso? Los peces son animales invertebrados.",
   "audio": "cons_vof.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/vert_pez.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Verdadero",
     "audio": "vof_verdadero.mp3",
     "ok": false
    },
    {
     "texto": "Falso",
     "audio": "vof_falso.mp3",
     "ok": true
    }
   ],
   "cols": 1,
   "mezclar": false,
   "_jclic": "vof2"
  },
  {
   "consigna": "¿Verdadero o Falso? El oso es un animal omnívoro.",
   "audio": "cons_vof.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/omni_oso.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Verdadero",
     "audio": "vof_verdadero.mp3",
     "ok": true
    },
    {
     "texto": "Falso",
     "audio": "vof_falso.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "mezclar": false,
   "_jclic": "vof3"
  },
  {
   "consigna": "Completá la oración con la palabra que falta.",
   "audio": "cons_completar.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/carn_aguila.jpg",
   "tipo": "completar",
   "partes": [
    "El águila es un animal ",
    {
     "hueco": "carnívoro",
     "opciones": [
      "carnívoro",
      "invertebrado"
     ]
    },
    " porque se alimenta de otros animales."
   ],
   "grande": false,
   "_jclic": "fill1"
  },
  {
   "consigna": "Completá la oración con la palabra que falta.",
   "audio": "cons_completar.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "imagen": "img/inv_abeja.jpg",
   "tipo": "completar",
   "partes": [
    "La abeja es un animal ",
    {
     "hueco": "invertebrado",
     "opciones": [
      "invertebrado",
      "carnívoro"
     ]
    },
    " porque no tiene columna vertebral."
   ],
   "grande": false,
   "_jclic": "fill2"
  },
  {
   "consigna": "Encontrá los pares iguales.",
   "audio": "cons_memoria.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "memoria",
   "pares": [
    [
     {
      "texto": "León",
      "imagen": "img/carn_leon.jpg",
      "audio": "ref_leon.mp3"
     },
     {
      "texto": "León",
      "imagen": "img/carn_leon.jpg",
      "audio": "ref_leon.mp3"
     }
    ],
    [
     {
      "texto": "Vaca",
      "imagen": "img/herb_vaca.jpg",
      "audio": "ref_vaca.mp3"
     },
     {
      "texto": "Vaca",
      "imagen": "img/herb_vaca.jpg",
      "audio": "ref_vaca.mp3"
     }
    ],
    [
     {
      "texto": "Oso",
      "imagen": "img/omni_oso.jpg",
      "audio": "ref_oso.mp3"
     },
     {
      "texto": "Oso",
      "imagen": "img/omni_oso.jpg",
      "audio": "ref_oso.mp3"
     }
    ],
    [
     {
      "texto": "Delfín",
      "imagen": "img/vert_delfin.jpg",
      "audio": "ref_delfin.mp3"
     },
     {
      "texto": "Delfín",
      "imagen": "img/vert_delfin.jpg",
      "audio": "ref_delfin.mp3"
     }
    ],
    [
     {
      "texto": "Pulpo",
      "imagen": "img/inv_pulpo.jpg",
      "audio": "ref_pulpo.mp3"
     },
     {
      "texto": "Pulpo",
      "imagen": "img/inv_pulpo.jpg",
      "audio": "ref_pulpo.mp3"
     }
    ],
    [
     {
      "texto": "Rana",
      "imagen": "img/vert_rana.jpg",
      "audio": "ref_rana.mp3"
     },
     {
      "texto": "Rana",
      "imagen": "img/vert_rana.jpg",
      "audio": "ref_rana.mp3"
     }
    ],
    [
     {
      "texto": "Serpiente",
      "imagen": "img/vert_serpiente.jpg",
      "audio": "ref_serpiente.mp3"
     },
     {
      "texto": "Serpiente",
      "imagen": "img/vert_serpiente.jpg",
      "audio": "ref_serpiente.mp3"
     }
    ],
    [
     {
      "texto": "Loro",
      "imagen": "img/vert_loro.jpg",
      "audio": "ref_paloma.mp3"
     },
     {
      "texto": "Loro",
      "imagen": "img/vert_loro.jpg",
      "audio": "ref_paloma.mp3"
     }
    ]
   ],
   "_jclic": "memoria1"
  },
  {
   "consigna": "Encontrá las 8 palabras escondidas en la sopa de letras.",
   "audio": "cons_sopa.mp3",
   "final": "¡Muy bien!",
   "audioFinal": "muy_bien.mp3",
   "tipo": "sopa",
   "palabras": [
    "mamífero",
    "reptil",
    "anfibio",
    "ave",
    "pez",
    "insecto",
    "carnívoro",
    "rana"
   ],
   "pistas": [
    {
     "imagen": "img/omni_perro.jpg",
     "audio": null
    },
    {
     "imagen": "img/vert_serpiente.jpg",
     "audio": null
    },
    {
     "imagen": "img/carn_cocodrilo.jpg",
     "audio": null
    },
    {
     "imagen": "img/carn_aguila.jpg",
     "audio": null
    },
    {
     "imagen": "img/vert_pez.jpg",
     "audio": null
    },
    {
     "imagen": "img/inv_abeja.jpg",
     "audio": null
    },
    {
     "imagen": "img/carn_leon.jpg",
     "audio": null
    },
    {
     "imagen": "img/vert_rana.jpg",
     "audio": null
    }
   ],
   "_jclic": "sopa"
  },
  {
   "tipo": "cierre",
   "imagen": "img/cierre.jpg",
   "audio": "terminaste_te_felicito.mp3"
  }
 ]
};
