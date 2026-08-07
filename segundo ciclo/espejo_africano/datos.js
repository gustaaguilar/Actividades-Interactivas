// ============================================================
// EL ESPEJO AFRICANO - Contextualización histórico-geográfica
// datos.js - Contenido de todas las pantallas (v2 - con ajustes)
// ============================================================

var DATOS = {

  titulo: "El Espejo Africano",
  subtitulo: "Contextualización histórico-geográfica",
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
      subtitulo: "Contextualización histórico-geográfica — Primera etapa de la novela"
    },

    // ---------- 2. ¿DE QUÉ SE TRATA ESTA ETAPA? ----------
    {
      id: 2,
      tipo: "narracion",
      titulo: "¿De qué se trata esta etapa?",
      texto: "Antes de empezar a leer «El Espejo Africano», de Liliana Bodoc, vamos a detenernos en el contexto histórico y geográfico donde arranca la novela.<br><br>La historia comienza en África, entre 1779 y 1791, y atraviesa uno de los capítulos más dolorosos de la historia americana: la trata de personas esclavizadas.<br><br>Esta actividad no reemplaza la lectura de la novela: la prepara. Te va a dar herramientas históricas para leer esas primeras páginas con otra mirada.",
      audio: "assets/audio/p02_narracion_apertura.mp3"
    },

    // ---------- 3. LA NOVELA Y LA AUTORA ----------
    {
      id: 3,
      tipo: "flipcards",
      titulo: "La novela y la autora",
      consigna: "Tocá cada tarjeta para conocer datos sobre la novela y su autora.",
      audio: "assets/audio/p03_consigna_autora.mp3",
      imagen: "assets/images/02_autora.jpg",
      tarjetas: [
        { frente: "Liliana Bodoc", reverso: "Nació en Santa Fe en 1958 y vivió gran parte de su vida en la provincia de Mendoza.", audio: "assets/audio/p03_t1.mp3" },
        { frente: "El Barco de Vapor", reverso: "La novela recibió este reconocido premio literario de literatura juvenil.", audio: "assets/audio/p03_t2.mp3" },
        { frente: "Un objeto, muchas historias", reverso: "Un pequeño espejo tallado en ébano conecta a distintos personajes a lo largo de dos siglos.", audio: "assets/audio/p03_t3.mp3" },
        { frente: "La Saga de los Confines", reverso: "Otra de las obras más reconocidas de la autora, de género fantástico épico.", audio: "assets/audio/p03_t4.mp3" }
      ]
    },

    // ---------- 4. LÍNEA DE TIEMPO 1779-1791 ----------
    {
      id: 4,
      tipo: "ordenar",
      titulo: "Línea de tiempo (1779–1791)",
      consigna: "Tocá los hechos en el orden en que sucedieron en la historia.",
      audio: "assets/audio/p04_consigna_linea_tiempo.mp3",
      items: [
        { texto: "Imaoma y Atima se casan en su aldea africana.", audio: "assets/audio/p04_i1.mp3" },
        { texto: "Nace la hija de ambos.", audio: "assets/audio/p04_i2.mp3" },
        { texto: "La niña es capturada por cazadores de hombres.", audio: "assets/audio/p04_i3.mp3" },
        { texto: "Comienza la travesía por el océano Atlántico.", audio: "assets/audio/p04_i4.mp3" },
        { texto: "Es vendida en el mercado de esclavos de Buenos Aires.", audio: "assets/audio/p04_i5.mp3" },
        { texto: "Crece como doncella en la casa de la familia Fontezo y Cabrera.", audio: "assets/audio/p04_i6.mp3" },
        { texto: "Es vendida y trasladada a una hacienda de Mendoza.", audio: "assets/audio/p04_i7.mp3" }
      ]
    },

    // ---------- 5. MAPA INTERACTIVO ----------
    {
      id: 5,
      tipo: "mapa",
      titulo: "De África al Río de la Plata",
      consigna: "Tocá cada punto del mapa para conocer el recorrido que atravesaron miles de personas esclavizadas en esa época.",
      audio: "assets/audio/p05_consigna_mapa.mp3",
      imagenMapa: "assets/images/mapa_base.jpg",
      puntos: [
        { x: 71.66, y: 49.55, titulo: "Costa de África occidental", texto: "Región de origen de gran parte de las personas esclavizadas trasladadas al Río de la Plata durante el siglo XVIII.", audio: "assets/audio/p05_pt1.mp3" },
        { x: 47.84, y: 57.62, titulo: "Océano Atlántico — el Pasaje del Medio", texto: "Travesía de varias semanas en condiciones de hacinamiento extremo, con alta mortalidad.", audio: "assets/audio/p05_pt2.mp3" },
        { x: 24.04, y: 75.79, titulo: "Puerto de Buenos Aires", texto: "Principal punto de entrada de personas esclavizadas al Virreinato del Río de la Plata.", audio: "assets/audio/p05_pt3.mp3" },
        { x: 17.08, y: 74.04, titulo: "Mendoza", texto: "Destino final de la hija de Atima e Imaoma, trasladada a una hacienda rural en 1791.", audio: "assets/audio/p05_pt4.mp3" }
      ]
    },

    // ---------- 6. VIDA EN LA ALDEA ----------
    {
      id: 6,
      tipo: "clasificar",
      titulo: "La vida en la aldea",
      consigna: "Tocá cada elemento y luego tocá la categoría que le corresponde: oficio, saber o costumbre.",
      audio: "assets/audio/p06_consigna_vida_aldea.mp3",
      imagen: "assets/images/03_aldea.jpg",
      categorias: ["Oficio", "Saber", "Costumbre"],
      items: [
        { texto: "Cazar animales para alimentar a la aldea", categoria: "Oficio", audio: "assets/audio/p06_i1.mp3", audioConfirma: "assets/audio/p06_c1.mp3" },
        { texto: "Teñir plumas y coser pieles", categoria: "Oficio", audio: "assets/audio/p06_i2.mp3", audioConfirma: "assets/audio/p06_c2.mp3" },
        { texto: "Diferenciar plantas beneficiosas de las dañinas", categoria: "Saber", audio: "assets/audio/p06_i3.mp3", audioConfirma: "assets/audio/p06_c3.mp3" },
        { texto: "Reconocer formas en las nubes", categoria: "Saber", audio: "assets/audio/p06_i4.mp3", audioConfirma: "assets/audio/p06_c4.mp3" },
        { texto: "Reunirse cada noche alrededor del fuego", categoria: "Costumbre", audio: "assets/audio/p06_i5.mp3", audioConfirma: "assets/audio/p06_c5.mp3" },
        { texto: "Elegir el nombre definitivo al cumplir doce años", categoria: "Costumbre", audio: "assets/audio/p06_i6.mp3", audioConfirma: "assets/audio/p06_c6.mp3" },
        { texto: "Tres miradas en un día como pedido de casamiento", categoria: "Costumbre", audio: "assets/audio/p06_i7.mp3", audioConfirma: "assets/audio/p06_c7.mp3" }
      ]
    },

    // ---------- 7. LOS TAMBORES (V/F) ----------
    {
      id: 7,
      tipo: "vf",
      titulo: "Los tambores",
      consigna: "Marcá si cada afirmación es verdadera o falsa.",
      audio: "assets/audio/p07_consigna_tambores.mp3",
      imagen: "assets/images/04_tambores.jpg",
      afirmaciones: [
        { texto: "Los tambores africanos solo se usaban para acompañar bailes.", valor: false, justificacion: "También transmitían mensajes y avisos a distancia entre aldeas.", audio: "assets/audio/p07_a1.mp3", audioJustif: "assets/audio/p07_j1.mp3" },
        { texto: "En muchas culturas de África occidental, los tambores funcionaban como un sistema de comunicación a distancia.", valor: true, justificacion: "Podían transmitir mensajes complejos entre comunidades.", audio: "assets/audio/p07_a2.mp3", audioJustif: "assets/audio/p07_j2.mp3" },
        { texto: "En la novela, los tambores anticipan la desgracia que se acerca a la aldea.", valor: true, justificacion: "Los tambores suenan roncos y tristes años antes de la captura.", audio: "assets/audio/p07_a3.mp3", audioJustif: "assets/audio/p07_j3.mp3" },
        { texto: "En las haciendas, los amos alentaban a los esclavizados a tocar libremente el tambor.", valor: false, justificacion: "Por el contrario, solía estar prohibido, como una forma de borrar identidad y memoria.", audio: "assets/audio/p07_a4.mp3", audioJustif: "assets/audio/p07_j4.mp3" }
      ]
    },

    // ---------- 8. REINOS DE ÁFRICA OCCIDENTAL (ASOCIAR) ----------
    {
      id: 8,
      tipo: "asociar",
      titulo: "Reinos y sociedades de África occidental",
      consigna: "Uní cada concepto con su definición correcta.",
      audio: "assets/audio/p08_consigna_reinos_africa.mp3",
      pares: [
        { izq: "Reino / sociedad organizada", der: "Estructura política con autoridades, leyes y territorio propio", audioIzq: "assets/audio/p08_c1.mp3", audioDer: "assets/audio/p08_d1.mp3" },
        { izq: "Ruta comercial interna", der: "Red que conectaba el interior de África con la costa", audioIzq: "assets/audio/p08_c2.mp3", audioDer: "assets/audio/p08_d2.mp3" },
        { izq: "Autoridad local", der: "Podía tener distinto grado de participación frente al comercio europeo", audioIzq: "assets/audio/p08_c3.mp3", audioDer: "assets/audio/p08_d3.mp3" },
        { izq: "Sistema de gobierno propio", der: "Anterior e independiente del contacto con Europa", audioIzq: "assets/audio/p08_c4.mp3", audioDer: "assets/audio/p08_d4.mp3" }
      ]
    },

    // ---------- 9. LA CAPTURA (OPCIÓN MÚLTIPLE) ----------
    {
      id: 9,
      tipo: "multiple",
      titulo: "La captura",
      consigna: "Elegí la opción correcta en cada pregunta.",
      audio: "assets/audio/p09_consigna_captura.mp3",
      imagen: "assets/images/05_captura.jpg",
      preguntas: [
        {
          pregunta: "¿Por qué los cazadores de hombres tenían órdenes de capturar niños?",
          audioPregunta: "assets/audio/p09_q1.mp3",
          opciones: [
            "Porque eran más fáciles de vender en Europa",
            "Porque ocupaban menos espacio, comían menos y daban menos problemas en el barco",
            "Porque los adultos se resistían menos"
          ],
          audioOpciones: ["assets/audio/p09_q1o1.mp3", "assets/audio/p09_q1o2.mp3", "assets/audio/p09_q1o3.mp3"],
          correcta: 1
        },
        {
          pregunta: "¿Quiénes eran los «cazadores de hombres» en la novela?",
          audioPregunta: "assets/audio/p09_q2.mp3",
          opciones: [
            "Miembros de la propia aldea",
            "Comerciantes que negociaban directamente con las familias",
            "Hombres armados con redes que trabajaban para el mercado de esclavos"
          ],
          audioOpciones: ["assets/audio/p09_q2o1.mp3", "assets/audio/p09_q2o2.mp3", "assets/audio/p09_q2o3.mp3"],
          correcta: 2
        }
      ]
    },

    // ---------- 10. EL PASAJE DEL MEDIO (COMPLETAR) ----------
    {
      id: 10,
      tipo: "completar",
      titulo: "El Pasaje del Medio",
      consigna: "Tocá las palabras del banco y luego tocá el espacio en blanco que corresponda.",
      audio: "assets/audio/p10_consigna_pasaje_medio.mp3",
      imagen: "assets/images/06_travesia.jpg",
      partes: [
        { texto: "El cruce del océano Atlántico se conoce como el " },
        { hueco: "Pasaje del Medio" },
        { texto: ". Los barcos transportaban a cientos de personas en condiciones de " },
        { hueco: "hacinamiento" },
        { texto: ". El viaje podía durar varias " },
        { hueco: "semanas" },
        { texto: ", y muchas personas no " },
        { hueco: "llegaban" },
        { texto: " con vida." }
      ],
      banco: [
        { palabra: "Pasaje del Medio", audio: "assets/audio/p10_b1.mp3" },
        { palabra: "hacinamiento", audio: "assets/audio/p10_b2.mp3" },
        { palabra: "semanas", audio: "assets/audio/p10_b3.mp3" },
        { palabra: "llegaban", audio: "assets/audio/p10_b4.mp3" }
      ]
    },

    // ---------- 11. MERCADO DE ESCLAVOS (ASOCIAR) ----------
    {
      id: 11,
      tipo: "asociar",
      titulo: "El mercado de esclavos en el Río de la Plata",
      consigna: "Uní cada término del mercado de esclavos con su definición.",
      audio: "assets/audio/p11_consigna_mercado_esclavos.mp3",
      imagen: "assets/images/07_mercado.jpg",
      pares: [
        { izq: "Remate", der: "Venta pública al mejor postor", audioIzq: "assets/audio/p11_c1.mp3", audioDer: "assets/audio/p11_d1.mp3" },
        { izq: "Bautismo forzado", der: "Imposición de un nuevo nombre al comprar a una persona esclavizada", audioIzq: "assets/audio/p11_c2.mp3", audioDer: "assets/audio/p11_d2.mp3" },
        { izq: "Amo", der: "Persona propietaria legal de un esclavizado", audioIzq: "assets/audio/p11_c3.mp3", audioDer: "assets/audio/p11_d3.mp3" },
        { izq: "Notas de propiedad", der: "Registro donde se asentaba la compra de una persona", audioIzq: "assets/audio/p11_c4.mp3", audioDer: "assets/audio/p11_d4.mp3" }
      ]
    },

    // ---------- 12. SOCIEDAD RIOPLATENSE COLONIAL (CLASIFICAR 2 COL) ----------
    {
      id: 12,
      tipo: "clasificar2col",
      titulo: "La sociedad rioplatense colonial",
      consigna: "Tocá cada afirmación y luego tocá la columna correcta: formaba parte o no formaba parte de esa época.",
      audio: "assets/audio/p12_consigna_sociedad_colonial.mp3",
      esVerdaderoFalso: true,
      columnas: ["Formaba parte de esa época", "No formaba parte de esa época"],
      items: [
        { texto: "La esclavitud era una práctica legal y aceptada socialmente", columna: 0, audio: "assets/audio/p12_i1.mp3", audioConfirma: "assets/audio/p12_c1.mp3" },
        { texto: "Las familias acomodadas tenían esclavos domésticos", columna: 0, audio: "assets/audio/p12_i2.mp3", audioConfirma: "assets/audio/p12_c2.mp3" },
        { texto: "Los esclavizados podían votar en elecciones", columna: 1, audio: "assets/audio/p12_i3.mp3", audioConfirma: "assets/audio/p12_c3.mp3" },
        { texto: "Existía un mercado público de compra-venta de personas", columna: 0, audio: "assets/audio/p12_i4.mp3", audioConfirma: "assets/audio/p12_c4.mp3" },
        { texto: "Todos los esclavizados tenían acceso libre a la educación", columna: 1, audio: "assets/audio/p12_i5.mp3", audioConfirma: "assets/audio/p12_c5.mp3" }
      ]
    },

    // ---------- 13. DOMÉSTICA VS RURAL (CLASIFICAR 2 COL) ----------
    {
      id: 13,
      tipo: "clasificar2col",
      titulo: "Esclavitud doméstica y esclavitud rural",
      consigna: "Tocá cada característica y luego tocá la columna que corresponda: esclavitud doméstica o esclavitud en una hacienda rural.",
      audio: "assets/audio/p13_consigna_domestica_rural.mp3",
      imagen: "assets/images/10_hacienda.jpg",
      columnas: ["Esclavitud doméstica", "Esclavitud en hacienda rural"],
      items: [
        { texto: "Mejor alimentación relativa", columna: 0, audio: "assets/audio/p13_i1.mp3" },
        { texto: "Contacto cercano con la familia de los amos", columna: 0, audio: "assets/audio/p13_i2.mp3" },
        { texto: "Tareas del hogar", columna: 0, audio: "assets/audio/p13_i3.mp3" },
        { texto: "Posibilidad excepcional de aprender a leer", columna: 0, audio: "assets/audio/p13_i4.mp3" },
        { texto: "Trabajo bajo el sol durante toda la jornada", columna: 1, audio: "assets/audio/p13_i5.mp3" },
        { texto: "Castigos físicos frecuentes", columna: 1, audio: "assets/audio/p13_i6.mp3" },
        { texto: "Mayor aislamiento", columna: 1, audio: "assets/audio/p13_i7.mp3" },
        { texto: "Jornadas más duras", columna: 1, audio: "assets/audio/p13_i8.mp3" }
      ]
    },

    // ---------- 14. HACIA LA ABOLICIÓN (ORDENAR) ----------
    {
      id: 14,
      tipo: "ordenar",
      titulo: "Hacia la abolición",
      consigna: "Tocá estos hechos históricos en el orden en que ocurrieron.",
      audio: "assets/audio/p14_consigna_abolicion.mp3",
      items: [
        { texto: "Se prohíbe el tráfico de esclavos hacia el Río de la Plata (1812).", audio: "assets/audio/p14_i1.mp3" },
        { texto: "La Asamblea del Año XIII declara la Libertad de Vientres (1813).", audio: "assets/audio/p14_i2.mp3" },
        { texto: "La Constitución de 1853 abole definitivamente la esclavitud en Argentina.", audio: "assets/audio/p14_i3.mp3" }
      ]
    },

    // ---------- 15. UN DATO QUE NO SABÍAS (FLIPCARDS) ----------
    {
      id: 15,
      tipo: "flipcards",
      titulo: "Un dato que no sabías",
      consigna: "Tocá cada tarjeta para descubrir un dato histórico poco conocido.",
      audio: "assets/audio/p15_consigna_dato_curioso.mp3",
      tarjetas: [
        { frente: "Población afrodescendiente", reverso: "Buenos Aires colonial tuvo una importante población afrodescendiente, hoy poco visibilizada en la historia oficial.", audio: "assets/audio/p15_t1.mp3", imagen: "assets/images/15_dato1.jpg" },
        { frente: "Aportes culturales", reverso: "Aportes culturales afroargentinos influyeron luego en ritmos como el candombe.", audio: "assets/audio/p15_t2.mp3", imagen: "assets/images/15_dato2.jpg" },
        { frente: "El ejército libertador", reverso: "El ejército de San Martín incluyó soldados afrodescendientes, muchos de ellos ex esclavizados.", audio: "assets/audio/p15_t3.mp3", imagen: "assets/images/15_dato3.jpg" }
      ]
    },

    // ---------- 16. VOCABULARIO (SOPA DE LETRAS) ----------
    {
      id: 16,
      tipo: "sopa",
      titulo: "Vocabulario clave",
      consigna: "Buscá cada palabra de la lista en la sopa de letras. Tocá la primera y la última letra para marcarla.",
      audio: "assets/audio/p16_consigna_vocabulario.mp3",
      palabras: [
        { palabra: "TRATA", definicion: "Comercio y traslado forzado de personas esclavizadas.", audio: "assets/audio/p16_w1.mp3" },
        { palabra: "ESCLAVITUD", definicion: "Sistema en el que una persona es propiedad legal de otra.", audio: "assets/audio/p16_w2.mp3" },
        { palabra: "HACIENDA", definicion: "Establecimiento rural donde se producía con mano de obra esclava.", audio: "assets/audio/p16_w3.mp3" },
        { palabra: "AMO", definicion: "Persona propietaria legal de un esclavizado.", audio: "assets/audio/p16_w4.mp3" },
        { palabra: "LIBERTAD", definicion: "Condición de una persona que no está sometida a esclavitud.", audio: "assets/audio/p16_w5.mp3" },
        { palabra: "CAZADOR", definicion: "En este contexto, quien capturaba personas para venderlas como esclavas.", audio: "assets/audio/p16_w6.mp3" },
        { palabra: "MERCADO", definicion: "Lugar donde se compraban y vendían personas esclavizadas.", audio: "assets/audio/p16_w7.mp3" },
        { palabra: "CAUTIVO", definicion: "Persona privada de su libertad.", audio: "assets/audio/p16_w8.mp3" }
      ]
    },

    // ---------- 17. VERDADERO O FALSO FINAL ----------
    {
      id: 17,
      tipo: "vf",
      titulo: "Para cerrar: repasemos",
      consigna: "Marcá verdadero o falso y pensá tu justificación.",
      audio: "assets/audio/p17_consigna_vf_final.mp3",
      afirmaciones: [
        { texto: "La trata de esclavos fue un sistema económico sostenido durante siglos, no un hecho aislado.", valor: true, justificacion: "Duró más de tres siglos y conectó intereses europeos, americanos y africanos.", audio: "assets/audio/p17_a1.mp3", audioJustif: "assets/audio/p17_j1.mp3" },
        { texto: "Las personas esclavizadas en África «no tenían cultura» antes de ser capturadas.", valor: false, justificacion: "Provenían de sociedades organizadas, con oficios, saberes y costumbres propias.", audio: "assets/audio/p17_a2.mp3", audioJustif: "assets/audio/p17_j2.mp3" },
        { texto: "En Buenos Aires colonial existía un mercado público de personas.", valor: true, justificacion: "Era una institución urbana habitual de la época.", audio: "assets/audio/p17_a3.mp3", audioJustif: "assets/audio/p17_j3.mp3" },
        { texto: "La esclavitud terminó en Argentina de un día para el otro.", valor: false, justificacion: "Fue un proceso gradual: prohibición del tráfico, libertad de vientres y recién en 1853 la abolición definitiva.", audio: "assets/audio/p17_a4.mp3", audioJustif: "assets/audio/p17_j4.mp3" },
        { texto: "La vida en una hacienda rural solía ser más dura que el servicio doméstico urbano.", valor: true, justificacion: "Implicaba jornadas más largas, mayor aislamiento y castigos más frecuentes.", audio: "assets/audio/p17_a5.mp3", audioJustif: "assets/audio/p17_j5.mp3" }
      ]
    },

    // ---------- 18. CIERRE / REFLEXIÓN FINAL ----------
    {
      id: 18,
      tipo: "cierre",
      titulo: "Para seguir pensando",
      texto: "La novela dice que esta es una historia que empezó hace dos siglos, pero que aún no ha terminado.<br><br>Ahora que conocés el contexto histórico, estás en condiciones de empezar a leer «El Espejo Africano» con otra mirada: entendiendo el peso real de lo que le sucede a cada personaje.",
      audio: "assets/audio/p18_narracion_cierre.mp3",
      imagen: "assets/images/09_cierre.jpg"
    }

  ]

};
