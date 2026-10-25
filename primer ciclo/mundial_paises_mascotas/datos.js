/* Banderas, mascotas y animales del Mundial 2026 — QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
   Renovado desde el paquete JClic original. */
window.DATOS = {
 "meta": {
  "titulo": "Banderas, mascotas y animales del Mundial 2026",
  "area": "Ambiente · Primer ciclo · Mundial 2026",
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
   "audio": "cons_portada_animales.mp3",
   "final": "¡Muy bien!",
   "tipo": "rompecabezas",
   "imagen": "img/portada_animales.jpg",
   "filas": 2,
   "cols": 3,
   "_jclic": "portada_animales"
  },
  {
   "consigna": "Uní cada bandera con el nombre del país sede.",
   "audio": "cons_sedes_paises.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_pradera.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "imagen": "img/img_bandera_canada.jpg",
     "audio": "nom_canada.mp3"
    },
    {
     "imagen": "img/img_bandera_eeuu.jpg",
     "audio": "nom_eeuu.mp3"
    },
    {
     "imagen": "img/img_bandera_mexico.jpg",
     "audio": "nom_mexico.mp3"
    }
   ],
   "der": [
    {
     "texto": "Canadá",
     "audio": "nom_canada.mp3"
    },
    {
     "texto": "Estados Unidos",
     "audio": "nom_eeuu.mp3"
    },
    {
     "texto": "México",
     "audio": "nom_mexico.mp3"
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
   "_jclic": "sedes_paises"
  },
  {
   "consigna": "¿De qué color es la hoja en la bandera de Canadá?",
   "audio": "cons_banderas_colores.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_pradera.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "verde",
     "imagen": "img/img_bandera_mexico.jpg",
     "audio": "color_verde.mp3",
     "ok": false
    },
    {
     "texto": "roja",
     "imagen": "img/img_bandera_canada.jpg",
     "audio": "resp_color_canada.mp3",
     "ok": true
    },
    {
     "texto": "azul",
     "imagen": "img/img_bandera_eeuu.jpg",
     "audio": "color_azul.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "banderas_colores"
  },
  {
   "consigna": "¿Qué es una mascota del mundial?",
   "audio": "cons_que_es_mascota.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_pradera.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Son jugadores famosos que representan a su selección.",
     "audio": "def_mascota_incorrecta1.mp3",
     "ok": false
    },
    {
     "texto": "Son personajes que aparecen en cada mundial y acompañan todo el torneo.",
     "audio": "def_mascota_correcta.mp3",
     "ok": true
    },
    {
     "texto": "Son trofeos que se entregan al campeón del torneo.",
     "audio": "def_mascota_incorrecta2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "que_es_mascota"
  },
  {
   "consigna": "Uní cada mascota con el país que representa.",
   "audio": "cons_mascotas_paises.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_pradera.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Clutch",
     "imagen": "img/img_clutch.jpg",
     "audio": "nom_clutch.mp3"
    },
    {
     "texto": "Zayu",
     "imagen": "img/img_zayu.jpg",
     "audio": "nom_zayu.mp3"
    },
    {
     "texto": "Maple",
     "imagen": "img/img_maple.jpg",
     "audio": "nom_maple.mp3"
    }
   ],
   "der": [
    {
     "texto": "Estados Unidos",
     "audio": "nom_eeuu.mp3"
    },
    {
     "texto": "México",
     "audio": "nom_mexico.mp3"
    },
    {
     "texto": "Canadá",
     "audio": "nom_canada.mp3"
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
   "_jclic": "mascotas_paises"
  },
  {
   "consigna": "Uní cada mascota con el animal que es.",
   "audio": "cons_mascotas_animales.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_selva.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "Clutch",
     "imagen": "img/img_clutch.jpg",
     "audio": "nom_clutch.mp3"
    },
    {
     "texto": "Zayu",
     "imagen": "img/img_zayu.jpg",
     "audio": "nom_zayu.mp3"
    },
    {
     "texto": "Maple",
     "imagen": "img/img_maple.jpg",
     "audio": "nom_maple.mp3"
    }
   ],
   "der": [
    {
     "texto": "águila calva",
     "imagen": "img/0img_aguila.jpg",
     "audio": "nom_aguila.mp3"
    },
    {
     "texto": "jaguar",
     "imagen": "img/img_jaguar.jpg",
     "audio": "nom_jaguar.mp3"
    },
    {
     "texto": "alce",
     "imagen": "img/img_alce.jpg",
     "audio": "nom_alce.mp3"
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
   "_jclic": "mascotas_animales"
  },
  {
   "consigna": "Encontrá: clutch - maple - zayu",
   "audio": "cons_sopa_mascotas.mp3",
   "final": "¡Muy bien!",
   "tipo": "sopa",
   "palabras": [
    "clutch",
    "maple",
    "zayu"
   ],
   "pistas": [
    {
     "imagen": "img/img_clutch.jpg",
     "audio": "desc_clutch.mp3"
    },
    {
     "imagen": "img/img_maple.jpg",
     "audio": "desc_maple.mp3"
    },
    {
     "imagen": "img/img_zayu.jpg",
     "audio": "desc_zayu.mp3"
    }
   ],
   "_jclic": "sopa_mascotas"
  },
  {
   "consigna": "Uní cada característica con la parte del cuerpo del águila calva.",
   "audio": "cons_aguila_caract.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_rio.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "cabeza",
     "imagen": "img/img_aguila.jpg",
     "audio": "aguila_cabeza.mp3"
    },
    {
     "texto": "pico",
     "imagen": "img/img_aguila.jpg",
     "audio": "aguila_pico.mp3"
    },
    {
     "texto": "cuerpo",
     "imagen": "img/img_aguila.jpg",
     "audio": "aguila_cuerpo.mp3"
    }
   ],
   "der": [
    {
     "texto": "blanca",
     "audio": "aguila_cabeza.mp3"
    },
    {
     "texto": "amarillo ganchudo",
     "audio": "aguila_pico.mp3"
    },
    {
     "texto": "marrón con plumas",
     "audio": "aguila_cuerpo.mp3"
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
   "_jclic": "aguila_caracteristicas"
  },
  {
   "consigna": "¿Dónde vive el águila calva?",
   "audio": "cons_aguila_vive.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_rio.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Cerca de ríos y lagos.",
     "audio": "aguila_vive_correcto.mp3",
     "ok": true
    },
    {
     "texto": "En las selvas tropicales.",
     "audio": "aguila_vive_inc1.mp3",
     "ok": false
    },
    {
     "texto": "En los desiertos cálidos.",
     "audio": "aguila_vive_inc2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "aguila_vive"
  },
  {
   "consigna": "¿Qué come el águila calva?",
   "audio": "cons_aguila_come.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_rio.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Come frutas y semillas.",
     "audio": "aguila_come_inc1.mp3",
     "ok": false
    },
    {
     "texto": "Se alimenta principalmente de peces.",
     "audio": "aguila_come_correcto.mp3",
     "ok": true
    },
    {
     "texto": "Come raíces y plantas acuáticas.",
     "audio": "aguila_come_inc2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "aguila_come"
  },
  {
   "consigna": "Uní cada característica con el jaguar.",
   "audio": "cons_jaguar_caract.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_selva.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "su pelo",
     "imagen": "img/img_jaguar.jpg",
     "audio": "jaguar_pelo.mp3"
    },
    {
     "texto": "especie",
     "imagen": "img/img_jaguar.jpg",
     "audio": "jaguar_especie.mp3"
    },
    {
     "texto": "hábitat",
     "imagen": "img/img_jaguar.jpg",
     "audio": "jaguar_habitat.mp3"
    }
   ],
   "der": [
    {
     "texto": "amarillo con manchas negras",
     "audio": "jaguar_pelo.mp3"
    },
    {
     "texto": "mamífero carnívoro, el más grande de América",
     "audio": "jaguar_especie.mp3"
    },
    {
     "texto": "selvas y bosques tropicales",
     "audio": "jaguar_habitat.mp3"
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
   "_jclic": "jaguar_caracteristicas"
  },
  {
   "consigna": "¿Qué come el jaguar?",
   "audio": "cons_jaguar_come.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_selva.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Es carnívoro. Come venados, armadillos y peces.",
     "audio": "jaguar_come_correcto.mp3",
     "ok": true
    },
    {
     "texto": "Come frutas, hojas y plantas acuáticas.",
     "audio": "jaguar_come_inc1.mp3",
     "ok": false
    },
    {
     "texto": "Come insectos y pequeños roedores solamente.",
     "audio": "jaguar_come_inc2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "jaguar_come"
  },
  {
   "consigna": "Uní cada característica con el alce.",
   "audio": "cons_alce_caract.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_bosque_frio.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "su pelo",
     "imagen": "img/img_alce.jpg",
     "audio": "alce_pelo.mp3"
    },
    {
     "texto": "sus astas",
     "imagen": "img/img_alce.jpg",
     "audio": "alce_astas.mp3"
    },
    {
     "texto": "hábitat",
     "imagen": "img/img_alce.jpg",
     "audio": "alce_habitat.mp3"
    }
   ],
   "der": [
    {
     "texto": "grueso y marrón, nariz larga",
     "audio": "alce_pelo.mp3"
    },
    {
     "texto": "grandes, se renuevan cada año",
     "audio": "alce_astas.mp3"
    },
    {
     "texto": "bosques fríos y montañas",
     "audio": "alce_habitat.mp3"
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
   "_jclic": "alce_caracteristicas"
  },
  {
   "consigna": "¿Qué come el alce?",
   "audio": "cons_alce_come.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_bosque_frio.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "Es carnívoro. Come peces, conejos y ciervos.",
     "audio": "alce_come_inc1.mp3",
     "ok": false
    },
    {
     "texto": "Es herbívoro. Come raíces, ramas, hojas y plantas acuáticas.",
     "audio": "alce_come_correcto.mp3",
     "ok": true
    },
    {
     "texto": "Come insectos, frutas y pequeños animales.",
     "audio": "alce_come_inc2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "alce_come"
  },
  {
   "consigna": "Uní cada animal con su especie.",
   "audio": "cons_animales_especie.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_selva.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "águila calva",
     "imagen": "img/img_aguila.jpg",
     "audio": "nom_aguila.mp3"
    },
    {
     "texto": "jaguar",
     "imagen": "img/img_jaguar.jpg",
     "audio": "nom_jaguar.mp3"
    },
    {
     "texto": "alce",
     "imagen": "img/img_alce.jpg",
     "audio": "nom_alce.mp3"
    }
   ],
   "der": [
    {
     "texto": "ave",
     "audio": "especie_ave.mp3"
    },
    {
     "texto": "mamífero",
     "audio": "especie_mamifero.mp3"
    },
    {
     "texto": "mamífero",
     "audio": "especie_mamifero.mp3"
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
   "_jclic": "animales_especie"
  },
  {
   "consigna": "Uní cada animal con el lugar donde vive.",
   "audio": "cons_animales_habitat.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_selva.jpg",
   "tipo": "asociar",
   "izq": [
    {
     "texto": "águila calva",
     "imagen": "img/img_aguila.jpg",
     "audio": "nom_aguila.mp3"
    },
    {
     "texto": "jaguar",
     "imagen": "img/img_jaguar.jpg",
     "audio": "nom_jaguar.mp3"
    },
    {
     "texto": "alce",
     "imagen": "img/img_alce.jpg",
     "audio": "nom_alce.mp3"
    }
   ],
   "der": [
    {
     "texto": "cerca de ríos y lagos",
     "audio": "habitat_rios_lagos.mp3"
    },
    {
     "texto": "selvas y bosques tropicales",
     "audio": "habitat_selva.mp3"
    },
    {
     "texto": "bosques fríos y montañas",
     "audio": "habitat_bosque_frio.mp3"
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
   "_jclic": "animales_donde_viven"
  },
  {
   "consigna": "¿Cuál de estos animales es autóctono de Canadá?",
   "audio": "cons_otros_canada.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_bosque_frio.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "ajolote",
     "imagen": "img/img_ajolote.jpg",
     "audio": "resp_canada_inc1.mp3",
     "ok": false
    },
    {
     "texto": "castor",
     "imagen": "img/img_castor.jpg",
     "audio": "resp_canada_correcto.mp3",
     "ok": true
    },
    {
     "texto": "bisonte",
     "imagen": "img/img_bisonte.jpg",
     "audio": "resp_canada_inc2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "otros_animales_canada"
  },
  {
   "consigna": "¿Cuál de estos animales es autóctono de México?",
   "audio": "cons_otros_mexico.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_selva.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "oso polar",
     "imagen": "img/img_oso_polar.jpg",
     "audio": "resp_mexico_inc1.mp3",
     "ok": false
    },
    {
     "texto": "bisonte americano",
     "imagen": "img/img_bisonte.jpg",
     "audio": "resp_mexico_inc2.mp3",
     "ok": false
    },
    {
     "texto": "ajolote",
     "imagen": "img/img_ajolote.jpg",
     "audio": "resp_mexico_correcto.mp3",
     "ok": true
    }
   ],
   "cols": 1,
   "_jclic": "otros_animales_mexico"
  },
  {
   "consigna": "¿Cuál de estos animales es autóctono de Estados Unidos?",
   "audio": "cons_otros_eeuu.mp3",
   "final": "¡Muy bien!",
   "imagen": "img/fondo_pradera.jpg",
   "tipo": "identificar",
   "celdas": [
    {
     "texto": "alce",
     "imagen": "img/img_alce.jpg",
     "audio": "resp_eeuu_inc1.mp3",
     "ok": false
    },
    {
     "texto": "bisonte americano",
     "imagen": "img/img_bisonte.jpg",
     "audio": "resp_eeuu_correcto.mp3",
     "ok": true
    },
    {
     "texto": "jaguar",
     "imagen": "img/img_jaguar.jpg",
     "audio": "resp_eeuu_inc2.mp3",
     "ok": false
    }
   ],
   "cols": 1,
   "_jclic": "otros_animales_eeuu"
  },
  {
   "consigna": "Encontrá los pares de imagen y nombre de animal.",
   "audio": "cons_memo_animales.mp3",
   "final": "¡Muy bien!",
   "tipo": "memoria",
   "pares": [
    [
     {
      "imagen": "img/img_aguila.jpg",
      "audio": "nom_aguila.mp3"
     },
     {
      "imagen": "img/img_aguila.jpg",
      "audio": "nom_aguila.mp3"
     }
    ],
    [
     {
      "imagen": "img/img_jaguar.jpg",
      "audio": "nom_jaguar.mp3"
     },
     {
      "imagen": "img/img_jaguar.jpg",
      "audio": "nom_jaguar.mp3"
     }
    ],
    [
     {
      "imagen": "img/img_alce.jpg",
      "audio": "nom_alce.mp3"
     },
     {
      "imagen": "img/img_alce.jpg",
      "audio": "nom_alce.mp3"
     }
    ],
    [
     {
      "imagen": "img/img_mapache.jpg",
      "audio": "nom_mapache.mp3"
     },
     {
      "imagen": "img/img_mapache.jpg",
      "audio": "nom_mapache.mp3"
     }
    ],
    [
     {
      "imagen": "img/img_castor.jpg",
      "audio": "nom_castor.mp3"
     },
     {
      "imagen": "img/img_castor.jpg",
      "audio": "nom_castor.mp3"
     }
    ],
    [
     {
      "imagen": "img/img_oso_polar.jpg",
      "audio": "nom_oso_polar.mp3"
     },
     {
      "imagen": "img/img_oso_polar.jpg",
      "audio": "nom_oso_polar.mp3"
     }
    ],
    [
     {
      "texto": "águila calva",
      "audio": "nom_aguila.mp3"
     },
     {
      "texto": "águila calva",
      "audio": "nom_aguila.mp3"
     }
    ],
    [
     {
      "texto": "jaguar",
      "audio": "nom_jaguar.mp3"
     },
     {
      "texto": "jaguar",
      "audio": "nom_jaguar.mp3"
     }
    ],
    [
     {
      "texto": "alce",
      "audio": "nom_alce.mp3"
     },
     {
      "texto": "alce",
      "audio": "nom_alce.mp3"
     }
    ],
    [
     {
      "texto": "mapache",
      "audio": "nom_mapache.mp3"
     },
     {
      "texto": "mapache",
      "audio": "nom_mapache.mp3"
     }
    ]
   ],
   "_jclic": "memo_animales"
  },
  {
   "tipo": "cierre",
   "imagen": "img/cierre.jpg",
   "audio": "terminaste_te_felicito.mp3"
  }
 ]
};
