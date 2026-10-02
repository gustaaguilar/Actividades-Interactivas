// ============================================================
// EL TEXTO EXPLICATIVO - 6to y 7mo grado (Lengua)
// datos.js - Contenido de todas las pantallas (v2)
// Fuente: "El texto explicativo", Nuevo Manual Estrada 6,
// Ángel Estrada y Cía., 2002 (Capítulo 3) - material fotografiado
// por el Profe Gustavo Aguilar.
//
// v2: el foco es EL TEXTO EXPLICATIVO (qué es, sus partes, el
// paratexto y los recursos). El texto "Cadenas y redes alimentarias"
// se usa solo como ejemplo breve para reconocer esas partes.
// ============================================================

// ------------------------------------------------------------
// Helpers para las escenas de narracionAnimada (filas de concepto)
// ------------------------------------------------------------
function filaZona(id, texto, destacada) {
  var clase = "zona-noticia zn-fila" + (destacada ? " zn-fila-destacada" : "");
  return '<div id="' + id + '" class="' + clase + '">' + texto + "</div>";
}
function escenaConcepto(filasHtml) {
  return '<div class="mini-noticia escena-concepto">' + filasHtml.join("") + "</div>";
}

// ------------------------------------------------------------
// TEXTO EXPLICATIVO DE EJEMPLO: "Cadenas y redes alimentarias"
// (Nuevo Manual Estrada 6), con fragmentos TEXTUALES del original
// resumidos con (…) para que entre en pantalla. Se usa en la
// explicación de las partes con la manito y en las dos
// actividades de marcar.
//   data-nivel="parte"   -> partes del texto (título, introducción...)
//   data-nivel="recurso" -> oraciones con recursos de la explicación
// ------------------------------------------------------------
function textoEjemplo() {
  return '' +
    '<div class="mini-noticia texto-ejemplo">' +
      '<div id="te-titulo" class="zona-noticia te-titulo" data-zona="titulo" data-nivel="parte">Cadenas y redes alimentarias</div>' +
      '<div id="te-intro" class="zona-noticia te-parrafo" data-zona="introduccion" data-nivel="parte">Las relaciones que los seres vivos establecen dentro de un ecosistema determinan una serie de funciones que cumple cada uno de ellos, y que contribuyen al equilibrio de la naturaleza. (…)</div>' +
      '<div id="te-sub1" class="zona-noticia te-subtitulo" data-zona="subtitulo" data-nivel="parte">Productores, consumidores y descomponedores</div>' +
      '<div id="te-p1" class="zona-noticia te-parrafo" data-zona="desarrollo" data-nivel="parte">(…) ' +
        '<span id="te-clasif" class="zona-recurso" data-zona="clasificacion" data-nivel="recurso">Entre los animales, los que se alimentan de plantas son herbívoros y se los llama consumidores primarios. Los que se alimentan de otros animales son carnívoros y reciben el nombre de consumidores secundarios.</span> (…)' +
      '</div>' +
      '<div class="te-fila">' +
        '<div class="te-col">' +
          '<div id="te-sub2" class="zona-noticia te-subtitulo" data-zona="subtitulo" data-nivel="parte">Las cadenas tróficas</div>' +
          '<div id="te-p2" class="zona-noticia te-parrafo" data-zona="desarrollo" data-nivel="parte">' +
            '<span id="te-def" class="zona-recurso" data-zona="definicion" data-nivel="recurso">Si se consideran las relaciones tróficas dentro de un ecosistema, es posible determinar cadenas en las que un organismo se alimenta de otro.</span> (…)' +
          '</div>' +
        '</div>' +
        '<div id="te-esq1" class="zona-noticia te-figura" data-zona="esquema" data-nivel="parte">' +
          '<span class="te-num">1</span><img src="assets/img/img_esquema1.jpg" alt="Esquema 1: cadena trófica">' +
        '</div>' +
      '</div>' +
      '<div class="te-fila">' +
        '<div class="te-col">' +
          '<div id="te-sub3" class="zona-noticia te-subtitulo" data-zona="subtitulo" data-nivel="parte">Las redes tróficas</div>' +
          '<div id="te-p3" class="zona-noticia te-parrafo" data-zona="desarrollo" data-nivel="parte">(…) ' +
            '<span id="te-ejemplo" class="zona-recurso" data-zona="ejemplo" data-nivel="recurso">Aunque algunos animales tienen dietas muy especializadas, como en el caso de los osos hormigueros, en la mayoría de los casos, no sucede así.</span> ' +
            '<span id="te-ejemplo2" class="zona-recurso" data-zona="ejemploSinConector" data-nivel="recurso">Los halcones no se alimentan exclusivamente de culebras; las culebras comen otros animales, además de ratones (…)</span>' +
          '</div>' +
        '</div>' +
        '<div id="te-esq2" class="zona-noticia te-figura" data-zona="esquema" data-nivel="parte">' +
          '<span class="te-num">2</span><img src="assets/img/img_esquema2.jpg" alt="Esquema 2: red trófica">' +
        '</div>' +
      '</div>' +
      '<div class="te-fuente">Nuevo Manual Estrada 6, Ángel Estrada y Cía., 2002.</div>' +
    '</div>';
}

var DATOS = {

  titulo: "El texto explicativo",
  subtitulo: "Qué es, cómo se organiza y qué recursos usa",
  nivel: "Lengua · 6° y 7° grado",

  meta: {
    foto: "assets/img/profe.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    audioCorrecto: "assets/audio/correcto.mp3",
    audioVerdadero: "assets/audio/verdadero.mp3",
    audioFalso: "assets/audio/falso.mp3"
  },

  pantallas: [
    // ---------- 1. PORTADA ----------
    {
      id: 1,
      tipo: "portada",
      imagen: "assets/img/portada.jpg",
      titulo: "El texto explicativo",
      subtitulo: "Qué es, cómo se organiza y qué recursos usa"
    },

    // ---------- 2. ¿QUÉ ES UN TEXTO EXPLICATIVO? ----------
    {
      id: 2,
      tipo: "narracionAnimada",
      titulo: "¿Qué es un texto explicativo?",
      imagen: "assets/img/img_tema.jpg",
      escenaHtml: escenaConcepto([
        filaZona("z-tema", "📌 Trata un tema específico", true),
        filaZona("z-organizacion", "🗂️ Explicado de manera clara y organizada"),
        filaZona("z-recursos", "🧩 Usa recursos que facilitan la comprensión"),
        filaZona("z-donde", "📚 Se encuentra en manuales, revistas y enciclopedias")
      ]),
      textoCompleto: "Los textos explicativos informan sobre algún tema específico que, generalmente, el lector desconoce o sobre el que desea ampliar sus conocimientos. Por eso, deben explicar y desarrollar ese tema de manera clara y bien organizada. Con este fin, en los textos se usan algunos recursos que facilitan la comprensión para exponer los distintos aspectos del tema. Los textos explicativos pueden abordar diferentes temas: científicos, tecnológicos o históricos. Por eso, podemos encontrarlos en manuales escolares, revistas especializadas o enciclopedias.",
      pasos: [
        { targetId: null, texto: "", audio: "assets/audio/p02_intro.mp3" },
        { targetId: "z-tema", texto: "Un tema específico", audio: "assets/audio/p02_tema.mp3" },
        { targetId: "z-organizacion", texto: "Clara y organizada", audio: "assets/audio/p02_organizacion.mp3" },
        { targetId: "z-recursos", texto: "Recursos de explicación", audio: "assets/audio/p02_recursos.mp3" },
        { targetId: "z-donde", texto: "Dónde se encuentran", audio: "assets/audio/p02_donde.mp3" }
      ]
    },

    // ---------- 3. LAS PARTES DE UN TEXTO EXPLICATIVO (manito) ----------
    {
      id: 3,
      tipo: "narracionAnimada",
      titulo: "Las partes de un texto explicativo",
      escenaHtml: textoEjemplo(),
      textoCompleto: "",
      pasos: [
        { targetId: null, texto: "", audio: "assets/audio/v4_partes_intro.mp3" },
        { targetId: "te-titulo", texto: "Título", audio: "assets/audio/v3_partes_titulo.mp3" },
        { targetId: "te-intro", texto: "Introducción: el tema", audio: "assets/audio/v3_partes_introduccion.mp3" },
        { targetId: "te-sub1", texto: "Subtítulo", audio: "assets/audio/v3_partes_subtitulo.mp3" },
        { targetId: "te-p1", texto: "Desarrollo", audio: "assets/audio/v3_partes_desarrollo.mp3" },
        { targetId: "te-esq1", texto: "Esquema", etiquetaDentro: true, audio: "assets/audio/v3_partes_esquema.mp3" }
      ]
    },

    // ---------- 4. MARCAR LAS PARTES ----------
    {
      id: 4,
      tipo: "marcarPartes",
      nivel: "parte",
      titulo: "Encontrá las partes del texto",
      consigna: "Leé el pedido de arriba y tocá esa parte en el texto.",
      audio: "assets/audio/v2_marcar_partes_instr.mp3",
      escenaHtml: textoEjemplo(),
      items: [
        { zona: "titulo", etiqueta: "Título", pedido: "Tocá el TÍTULO.", audioPedido: "assets/audio/v2_mp_titulo_ped.mp3", audioConfirma: "assets/audio/v2_mp_titulo_ok.mp3" },
        { zona: "introduccion", etiqueta: "Introducción", pedido: "Tocá la INTRODUCCIÓN, que presenta el tema.", audioPedido: "assets/audio/v2_mp_intro_ped.mp3", audioConfirma: "assets/audio/v3_mp_intro_ok.mp3" },
        { zona: "subtitulo", etiqueta: "Subtítulo", pedido: "Tocá un SUBTÍTULO.", audioPedido: "assets/audio/v3_mp_subtitulo_ped.mp3", audioConfirma: "assets/audio/v3_mp_subtitulo_ok.mp3" },
        { zona: "desarrollo", etiqueta: "Desarrollo", pedido: "Tocá un párrafo del DESARROLLO.", audioPedido: "assets/audio/v3_mp_desarrollo_ped.mp3", audioConfirma: "assets/audio/v3_mp_desarrollo_ok.mp3" },
        { zona: "esquema", etiqueta: "Esquema", pedido: "Tocá un ESQUEMA.", audioPedido: "assets/audio/v3_mp_esquema_ped.mp3", audioConfirma: "assets/audio/v3_mp_esquema_ok.mp3" }
      ]
    },

    // ---------- 5. ASOCIAR CADA PARTE CON SU FUNCIÓN ----------
    {
      id: 5,
      tipo: "asociar",
      titulo: "Uní cada parte con su función",
      imagen: "assets/img/img_subtemas.jpg",
      consigna: "Tocá una parte del texto y después la función que cumple.",
      audio: "assets/audio/v2_asoc_partes_instr.mp3",
      tituloIzq: "Partes",
      tituloDer: "Función",
      pares: [
        { izq: "Título", audioIzq: "assets/audio/v2_ap_izq1.mp3", der: "Anticipa el tema del texto.", audioDer: "assets/audio/v2_ap_der1.mp3", audioConfirma: "assets/audio/v2_ap_ok1.mp3" },
        { izq: "Introducción", audioIzq: "assets/audio/v2_ap_izq2.mp3", der: "Presenta el tema central de manera general.", audioDer: "assets/audio/v3_ap_der2.mp3", audioConfirma: "assets/audio/v3_ap_ok2.mp3" },
        { izq: "Subtítulo", audioIzq: "assets/audio/v3_ap_izq3.mp3", der: "Indica cuál es el subtema que se va a desarrollar.", audioDer: "assets/audio/v3_ap_der3.mp3", audioConfirma: "assets/audio/v3_ap_ok3.mp3" },
        { izq: "Desarrollo", audioIzq: "assets/audio/v3_ap_izq4.mp3", der: "Amplía la información, organizada en párrafos.", audioDer: "assets/audio/v3_ap_der4.mp3", audioConfirma: "assets/audio/v3_ap_ok4.mp3" },
        { izq: "Esquema", audioIzq: "assets/audio/v3_ap_izq5.mp3", der: "Muestra con dibujos y flechas las relaciones que explica el texto.", audioDer: "assets/audio/v3_ap_der5.mp3", audioConfirma: "assets/audio/v3_ap_ok5.mp3" }
      ]
    },

    // ---------- 6. TEMA Y SUBTEMAS ----------
    {
      id: 6,
      tipo: "narracionAnimada",
      titulo: "Los textos explicativos: tema y subtemas",
      imagen: "assets/img/img_subtemas.jpg",
      escenaHtml: escenaConcepto([
        filaZona("z-tema-central", "🎯 Tema central: presentado de manera general, al comienzo", true),
        filaZona("z-subtemas", "🌿 Subtemas: aspectos más específicos del tema"),
        filaZona("z-parrafos", "📄 La organización en párrafos ordena la información")
      ]),
      textoCompleto: "Los textos explicativos presentan información sobre cierto tema, que es la idea central del texto. El tema se presenta, primero, de manera general y responde a una pregunta que origina la explicación. A medida que el texto avanza, va desarrollando los subtemas, que amplían diferentes aspectos de la información. La organización del texto en párrafos permite ordenar y distribuir mejor toda la información.",
      pasos: [
        { targetId: "z-tema-central", texto: "Tema central", audio: "assets/audio/p12_tema.mp3" },
        { targetId: "z-subtemas", texto: "Subtemas", audio: "assets/audio/p12_subtemas.mp3" },
        { targetId: "z-parrafos", texto: "Párrafos", audio: "assets/audio/p12_parrafos.mp3" }
      ]
    },

    // ---------- 7. IDENTIFICAR EL TEMA CENTRAL ----------
    {
      id: 7,
      tipo: "multiple",
      titulo: "¿Cuál es el tema del texto que leyeron?",
      consigna: "Elegí la opción que mejor expresa el tema central de \"Cadenas y redes alimentarias\".",
      audio: "assets/audio/p13_instr.mp3",
      imagen: "assets/img/img_tema.jpg",
      preguntas: [
        {
          pregunta: "¿Cuál es el tema central del texto?",
          opciones: [
            "Las relaciones que se establecen entre los seres vivos de un ecosistema a través de la alimentación.",
            "La descripción de los distintos tipos de plantas que existen en el mundo.",
            "La historia de cómo se formaron los ecosistemas hace millones de años."
          ],
          correcta: 0,
          audioPregunta: "assets/audio/p13_preg1.mp3",
          audioOpciones: ["assets/audio/p13_op1a.mp3", "assets/audio/p13_op1b.mp3", "assets/audio/p13_op1c.mp3"]
        }
      ]
    },

    // ---------- 8. CLASIFICAR: ¿ES UN SUBTEMA? (actividad 5 del manual) ----------
    {
      id: 8,
      tipo: "clasificar2col",
      titulo: "¿Cuáles son los subtemas del texto?",
      imagen: "assets/img/img_subtemas.jpg",
      consigna: "Tené en cuenta los subtítulos y los párrafos. Tocá cada elemento y después la columna donde corresponde.",
      audio: "assets/audio/v3_subt_instr.mp3",
      columnas: ["Es un subtema", "No es un subtema"],
      items: [
        { texto: "Productores, consumidores y descomponedores", columna: 0, audioConfirma: "assets/audio/v3_subt_c1.mp3" },
        { texto: "Las cadenas tróficas", columna: 0, audioConfirma: "assets/audio/v3_subt_c2.mp3" },
        { texto: "Las redes tróficas", columna: 0, audioConfirma: "assets/audio/v3_subt_c3.mp3" },
        { texto: "Las relaciones de alimentación en un ecosistema", columna: 1, audioConfirma: "assets/audio/v3_subt_c4.mp3" },
        { texto: "Los osos hormigueros", columna: 1, audioConfirma: "assets/audio/v3_subt_c5.mp3" },
        { texto: "El sistema solar", columna: 1, audioConfirma: "assets/audio/v3_subt_c6.mp3" }
      ]
    },

    // ---------- 9. ASOCIAR SUBTÍTULOS EQUIVALENTES (actividad 6 del manual) ----------
    {
      id: 9,
      tipo: "asociar",
      titulo: "Otros subtítulos con el mismo significado",
      imagen: "assets/img/img_paratexto.jpg",
      consigna: "Uní cada subtítulo del texto con otro que podría reemplazarlo sin cambiar el significado.",
      audio: "assets/audio/v3_subtit_instr.mp3",
      tituloIzq: "Subtítulo del texto",
      tituloDer: "Podría reemplazarse por",
      pares: [
        { izq: "Productores, consumidores y descomponedores", audioIzq: "assets/audio/v3_st_izq1.mp3", der: "Cómo se alimenta cada ser vivo", audioDer: "assets/audio/v3_st_der1.mp3", audioConfirma: "assets/audio/v3_st_ok1.mp3" },
        { izq: "Las cadenas tróficas", audioIzq: "assets/audio/v3_st_izq2.mp3", der: "¿Quién se alimenta de quién?", audioDer: "assets/audio/v3_st_der2.mp3", audioConfirma: "assets/audio/v3_st_ok2.mp3" },
        { izq: "Las redes tróficas", audioIzq: "assets/audio/v3_st_izq3.mp3", der: "Cadenas que se entrecruzan", audioDer: "assets/audio/v3_st_der3.mp3", audioConfirma: "assets/audio/v3_st_ok3.mp3" }
      ]
    },

    // ---------- 10. EL PARATEXTO ----------
    {
      id: 10,
      tipo: "narracionAnimada",
      titulo: "El paratexto",
      imagen: "assets/img/img_paratexto.jpg",
      escenaHtml: escenaConcepto([
        filaZona("z-titulo-p", "🏷️ Título: anticipa el tema del texto", true),
        filaZona("z-subtitulos-p", "🔖 Subtítulos: indican cuáles son los subtemas"),
        filaZona("z-fotos-p", "🖼️ Fotos e ilustraciones con epígrafes")
      ]),
      textoCompleto: "En un texto explicativo nos encontramos con elementos que acompañan al texto principal. Por ejemplo: el título, los subtítulos, las fotos e ilustraciones con sus epígrafes. Estos elementos forman el paratexto, que significa \"junto al texto\". Los elementos paratextuales aportan más información sobre el tema principal y sirven para guiar la lectura.",
      pasos: [
        { targetId: "z-titulo-p", texto: "Título", audio: "assets/audio/p15_titulo.mp3" },
        { targetId: "z-subtitulos-p", texto: "Subtítulos", audio: "assets/audio/p15_subtitulos.mp3" },
        { targetId: "z-fotos-p", texto: "Fotos y epígrafes", audio: "assets/audio/p15_fotos.mp3" }
      ]
    },

    // ---------- 11. CLASIFICAR: TEXTO PRINCIPAL O PARATEXTO ----------
    {
      id: 11,
      tipo: "clasificar2col",
      titulo: "¿Texto principal o paratexto?",
      imagen: "assets/img/img_paratexto.jpg",
      consigna: "Tocá cada elemento y después la columna donde corresponde.",
      audio: "assets/audio/p16_instr.mp3",
      columnas: ["Paratexto", "Texto principal"],
      items: [
        { texto: "El título", columna: 0, audioConfirma: "assets/audio/p16_c1.mp3" },
        { texto: "Los subtítulos", columna: 0, audioConfirma: "assets/audio/p16_c2.mp3" },
        { texto: "El epígrafe de una foto", columna: 0, audioConfirma: "assets/audio/p16_c3.mp3" },
        { texto: "El párrafo que explica qué son los productores", columna: 1, audioConfirma: "assets/audio/p16_c4.mp3" },
        { texto: "El párrafo sobre las redes tróficas", columna: 1, audioConfirma: "assets/audio/p16_c5.mp3" },
        { texto: "El desarrollo del tema a lo largo de varios párrafos", columna: 1, audioConfirma: "assets/audio/p16_c6.mp3" }
      ]
    },

    // ---------- 12. RECURSO: LA DEFINICIÓN ----------
    {
      id: 12,
      tipo: "narracionAnimada",
      titulo: "Los recursos de la explicación: la definición",
      imagen: "assets/img/img_recursos.jpg",
      escenaHtml: escenaConcepto([
        filaZona("z-def-nombre", "La definición", true),
        filaZona("z-def-ejemplo", "\"Una represa es un lago artificial, contenido por un dique, donde se almacena cierta cantidad de agua a determinada altura.\"")
      ]),
      textoCompleto: "",
      pasos: [
        { targetId: "z-def-nombre", texto: "¿Qué es?", audio: "assets/audio/p17_nombre.mp3" },
        { targetId: "z-def-ejemplo", texto: "Ejemplo", audio: "assets/audio/p17_ejemplo.mp3" }
      ]
    },

    // ---------- 13. RECURSO: LOS EJEMPLOS ----------
    {
      id: 13,
      tipo: "narracionAnimada",
      titulo: "Los recursos de la explicación: los ejemplos",
      imagen: "assets/img/img_recursos.jpg",
      escenaHtml: escenaConcepto([
        filaZona("z-ej-nombre", "Los ejemplos", true),
        filaZona("z-ej-ejemplo", "\"El cuerpo de los camellos pierde muy poca agua y, por eso, soportan largas travesías por el desierto.\""),
        filaZona("z-ej-conectores", "Conectores: por ejemplo, es el caso de, como, así")
      ]),
      textoCompleto: "",
      pasos: [
        { targetId: "z-ej-nombre", texto: "¿Qué son?", audio: "assets/audio/p18_nombre.mp3" },
        { targetId: "z-ej-ejemplo", texto: "Ejemplo", audio: "assets/audio/p18_ejemplo.mp3" },
        { targetId: "z-ej-conectores", texto: "Conectores", audio: "assets/audio/p18_conectores.mp3" }
      ]
    },

    // ---------- 14. RECURSO: LA REFORMULACIÓN ----------
    {
      id: 14,
      tipo: "narracionAnimada",
      titulo: "Los recursos de la explicación: la reformulación",
      imagen: "assets/img/img_recursos.jpg",
      escenaHtml: escenaConcepto([
        filaZona("z-ref-nombre", "La reformulación", true),
        filaZona("z-ref-ejemplo", "\"Las plantas se autoalimentan a través de la fotosíntesis, es decir, fabrican su propio alimento utilizando la luz del Sol.\""),
        filaZona("z-ref-conectores", "Conectores: es decir, o sea, en otras palabras, esto es")
      ]),
      textoCompleto: "",
      pasos: [
        { targetId: "z-ref-nombre", texto: "¿En qué consiste?", audio: "assets/audio/p19_nombre.mp3" },
        { targetId: "z-ref-ejemplo", texto: "Ejemplo", audio: "assets/audio/p19_ejemplo.mp3" },
        { targetId: "z-ref-conectores", texto: "Conectores", audio: "assets/audio/p19_conectores.mp3" }
      ]
    },

    // ---------- 15. RECURSO: LA CLASIFICACIÓN ----------
    {
      id: 15,
      tipo: "narracionAnimada",
      titulo: "Los recursos de la explicación: la clasificación",
      imagen: "assets/img/img_recursos.jpg",
      escenaHtml: escenaConcepto([
        filaZona("z-clas-nombre", "La clasificación", true),
        filaZona("z-clas-ejemplo", "\"Las plantas acuáticas se clasifican en: sumergidas, flotantes y anfibias.\"")
      ]),
      textoCompleto: "",
      pasos: [
        { targetId: "z-clas-nombre", texto: "¿Para qué sirve?", audio: "assets/audio/p20_nombre.mp3" },
        { targetId: "z-clas-ejemplo", texto: "Ejemplo", audio: "assets/audio/p20_ejemplo.mp3" }
      ]
    },

    // ---------- 16. ASOCIAR RECURSO CON SU EJEMPLO ----------
    {
      id: 16,
      tipo: "asociar",
      titulo: "Uní cada recurso con su ejemplo",
      imagen: "assets/img/img_recursos.jpg",
      consigna: "Tocá un recurso y después el ejemplo que le corresponde.",
      audio: "assets/audio/p21_instr.mp3",
      tituloIzq: "Recursos",
      tituloDer: "Ejemplos",
      pares: [
        { izq: "Definición", audioIzq: "assets/audio/p21_izq1.mp3", der: "Una represa es un lago artificial, contenido por un dique.", audioDer: "assets/audio/p21_der1.mp3" },
        { izq: "Ejemplos", audioIzq: "assets/audio/p21_izq2.mp3", der: "El cuerpo de los camellos pierde muy poca agua.", audioDer: "assets/audio/p21_der2.mp3" },
        { izq: "Reformulación", audioIzq: "assets/audio/p21_izq3.mp3", der: "Es decir, fabrican su propio alimento con la luz del Sol.", audioDer: "assets/audio/p21_der3.mp3" },
        { izq: "Clasificación", audioIzq: "assets/audio/p21_izq4.mp3", der: "Se clasifican en sumergidas, flotantes y anfibias.", audioDer: "assets/audio/p21_der4.mp3" }
      ]
    },

    // ---------- 17. MARCAR LOS RECURSOS EN EL TEXTO ----------
    {
      id: 17,
      tipo: "marcarPartes",
      nivel: "recurso",
      titulo: "Encontrá los recursos en el texto",
      consigna: "Buscá en \"Cadenas y redes alimentarias\" la oración que usa cada recurso y tocala.",
      audio: "assets/audio/v3_marcar_rec_instr.mp3",
      escenaHtml: textoEjemplo(),
      items: [
        { zona: "definicion", etiqueta: "Definición", pedido: "Tocá la oración con una DEFINICIÓN.", audioPedido: "assets/audio/v2_mr_def_ped.mp3", audioConfirma: "assets/audio/v3_mr_def_ok.mp3" },
        { zona: "clasificacion", etiqueta: "Clasificación", pedido: "Tocá la oración con una CLASIFICACIÓN.", audioPedido: "assets/audio/v2_mr_clas_ped.mp3", audioConfirma: "assets/audio/v3_mr_clas_ok.mp3" },
        { zona: "ejemplo", etiqueta: "Ejemplo con conector", pedido: "Tocá el EJEMPLO que tiene CONECTOR.", audioPedido: "assets/audio/v3_mr_ej_ped.mp3", audioConfirma: "assets/audio/v3_mr_ej_ok.mp3" },
        { zona: "ejemploSinConector", etiqueta: "Ejemplo sin conector", pedido: "Tocá el EJEMPLO SIN CONECTOR.", audioPedido: "assets/audio/v3_mr_ej2_ped.mp3", audioConfirma: "assets/audio/v3_mr_ej2_ok.mp3" }
      ]
    },

    // ---------- 18. TRIVIA: LOS RECURSOS EN EL TEXTO (actividades 7 y 8 del manual) ----------
    {
      id: 18,
      tipo: "multiple",
      titulo: "Trivia: los recursos en el texto",
      consigna: "Leé cada pregunta y elegí la opción correcta.",
      audio: "assets/audio/v2_trivia_instr.mp3",
      imagen: "assets/img/img_comprension.jpg",
      preguntas: [
        {
          pregunta: "¿Cuál es la definición correcta de \"nivel trófico\"?",
          opciones: [
            "Cada una de las categorías que ocupan los seres vivos de un ecosistema según la función que cumplen en la alimentación.",
            "El lugar exacto donde vive un animal dentro del bosque.",
            "La cantidad de comida que un animal necesita comer por día."
          ],
          correcta: 0,
          audioPregunta: "assets/audio/p22_preg1.mp3",
          audioOpciones: ["assets/audio/p22_op1a.mp3", null, null]
        },
        {
          pregunta: "La oración \"Los halcones no se alimentan exclusivamente de culebras; las culebras comen otros animales, además de ratones\" es un ejemplo SIN conector. ¿Qué idea del texto ejemplifica?",
          opciones: [
            "Que un mismo consumidor puede alimentarse de varios tipos de organismos, formando redes tróficas.",
            "Que todos los animales comen exactamente lo mismo.",
            "Que las plantas también se alimentan de otros seres vivos."
          ],
          correcta: 0,
          audioPregunta: "assets/audio/p22_preg2.mp3",
          audioOpciones: ["assets/audio/p22_op2a.mp3", null, null]
        },
        {
          pregunta: "\"(...) como en el caso de los osos hormigueros (...)\". ¿Qué recurso se usa?",
          opciones: ["Definición", "Ejemplo", "Reformulación", "Clasificación"],
          correcta: 1,
          audioPregunta: "assets/audio/v3_tr_p3.mp3",
          audioOpciones: [null, "assets/audio/v3_tr_p3_ok.mp3", null, null]
        },
        {
          pregunta: "¿Para qué sirve un texto explicativo?",
          opciones: [
            "Para informar y explicar un tema de manera clara y ordenada.",
            "Para contar una historia imaginaria con personajes.",
            "Para convencer al lector de que compre un producto."
          ],
          correcta: 0,
          audioPregunta: "assets/audio/v2_tr_p4.mp3",
          audioOpciones: ["assets/audio/v2_tr_p4_ok.mp3", null, null]
        }
      ]
    },

    // ---------- 19. ARMAR ORACIÓN: LA REFORMULACIÓN ----------
    {
      id: 19,
      tipo: "ordenar",
      titulo: "Armá la oración: una reformulación",
      imagen: "assets/img/img_ordenar.jpg",
      consigna: "El texto dice: \"Los animales no son capaces de realizar la fotosíntesis, pero necesitan nutrirse como todos los seres vivos.\" Armá una reformulación de esa idea, usando un conector de reformulación. Tocá las palabras en orden. Recordá: la primera palabra va con mayúscula y la última tiene el punto final.",
      audio: "assets/audio/p23_instr.mp3",
      oracionAudio: "assets/audio/p23_oracion.mp3",
      items: [
        { texto: "Los", orden: 1 },
        { texto: "animales", orden: 2 },
        { texto: "no", orden: 3 },
        { texto: "fabrican", orden: 4 },
        { texto: "su", orden: 5 },
        { texto: "propio", orden: 6 },
        { texto: "alimento,", orden: 7 },
        { texto: "es", orden: 8 },
        { texto: "decir,", orden: 9 },
        { texto: "deben", orden: 10 },
        { texto: "alimentarse", orden: 11 },
        { texto: "de", orden: 12 },
        { texto: "otros", orden: 13 },
        { texto: "seres", orden: 14 },
        { texto: "vivos.", orden: 15 }
      ]
    },

    // ---------- 20. VERDADERO O FALSO: EL TEXTO EXPLICATIVO ----------
    {
      id: 20,
      tipo: "vf",
      titulo: "Verdadero o falso: el texto explicativo",
      consigna: "Leé cada afirmación sobre los textos explicativos e indicá si es verdadera o falsa.",
      audio: "assets/audio/v2_vf_instr.mp3",
      imagen: "assets/img/img_paratexto.jpg",
      afirmaciones: [
        { texto: "Un texto explicativo informa sobre un tema de manera clara y ordenada.", valor: true, audio: "assets/audio/v2_vf_af1.mp3",
          justificacion: "Verdadero: su propósito es explicar un tema para que el lector lo comprenda.", audioJustif: "assets/audio/v2_vf_j1.mp3" },
        { texto: "Los textos explicativos cuentan una historia con personajes imaginarios.", valor: false, audio: "assets/audio/v2_vf_af2.mp3",
          justificacion: "Falso: eso lo hacen los cuentos. El texto explicativo informa sobre un tema real.", audioJustif: "assets/audio/v2_vf_j2.mp3" },
        { texto: "El título y los subtítulos forman parte del paratexto.", valor: true, audio: "assets/audio/v2_vf_af3.mp3",
          justificacion: "Verdadero: acompañan al texto principal y guían la lectura.", audioJustif: "assets/audio/v2_vf_j3.mp3" },
        { texto: "El epígrafe es el párrafo más largo del texto.", valor: false, audio: "assets/audio/v2_vf_af4.mp3",
          justificacion: "Falso: el epígrafe es un texto breve que explica una imagen o un esquema.", audioJustif: "assets/audio/v2_vf_j4.mp3" },
        { texto: "La reformulación se introduce con conectores como \"es decir\" u \"o sea\".", valor: true, audio: "assets/audio/v2_vf_af5.mp3",
          justificacion: "Verdadero: esos conectores anuncian que se va a decir lo mismo con otras palabras.", audioJustif: "assets/audio/v2_vf_j5.mp3" },
        { texto: "Los ejemplos sirven para ordenar los elementos en grupos.", valor: false, audio: "assets/audio/v2_vf_af6.mp3",
          justificacion: "Falso: eso es la clasificación. Los ejemplos muestran casos concretos del tema.", audioJustif: "assets/audio/v2_vf_j6.mp3" },
        { texto: "Podemos encontrar textos explicativos en manuales y enciclopedias.", valor: true, audio: "assets/audio/v2_vf_af7.mp3",
          justificacion: "Verdadero: también en revistas especializadas y sitios de divulgación.", audioJustif: "assets/audio/v2_vf_j7.mp3" }
      ]
    },

    // ---------- 21. SOPA DE LETRAS ----------
    {
      id: 21,
      tipo: "sopa",
      titulo: "Sopa de letras: el texto explicativo",
      imagen: "assets/img/img_sopa.jpg",
      consigna: "Buscá las palabras en la sopa de letras. Tocá la primera y la última letra de cada palabra.",
      audio: "assets/audio/p24_instr.mp3",
      palabras: [
        { palabra: "TEMA", definicion: "La idea central que desarrolla un texto explicativo.", audio: "assets/audio/p24_tema.mp3" },
        { palabra: "SUBTEMA", definicion: "Un aspecto más específico dentro del tema central.", audio: "assets/audio/p24_subtema.mp3" },
        { palabra: "PARATEXTO", definicion: "Los elementos que acompañan al texto: título, subtítulos, fotos y epígrafes.", audio: "assets/audio/p24_paratexto.mp3" },
        { palabra: "DEFINICION", definicion: "Recurso que dice qué es algo y menciona sus características.", audio: "assets/audio/p24_definicion.mp3" },
        { palabra: "EJEMPLO", definicion: "Caso particular y concreto que ilustra un tema.", audio: "assets/audio/p24_ejemplo.mp3" },
        { palabra: "REFORMULACION", definicion: "Volver a decir algo con otras palabras para que sea más claro.", audio: "assets/audio/p24_reformulacion.mp3" },
        { palabra: "CLASIFICACION", definicion: "Recurso que ordena y agrupa elementos según algo en común.", audio: "assets/audio/p24_clasificacion.mp3" },
        { palabra: "EPIGRAFE", definicion: "Texto breve que explica una imagen o un esquema.", audio: "assets/audio/v2_sopa_epigrafe.mp3" }
      ]
    },

    // ---------- 22. CIERRE ----------
    {
      id: 22,
      tipo: "cierre",
      imagen: "assets/img/cierre.jpg",
      titulo: "¡Muy bien!",
      texto: "Ya sabés qué es un texto explicativo, cómo se organiza en tema y subtemas, qué es el paratexto y cuáles son los cuatro recursos de la explicación: definición, ejemplos, reformulación y clasificación. La próxima vez que leas un texto explicativo, vas a poder reconocerlos.",
      audio: "assets/audio/p25_cierre.mp3"
    }

  ]
};

// ------------------------------------------------------------
// LOCUCIONES de los audios NUEVOS de la v2 (las usa el script de
// Colab para generarlos con gTTS; el motor no las lee).
// ------------------------------------------------------------
var LOCUCIONES = {
  "assets/audio/v4_partes_intro.mp3": "Este es el texto Cadenas y redes alimentarias, del Nuevo Manual Estrada. Vamos a mirar cómo está armado un texto explicativo. Seguí la manito.",
  "assets/audio/v3_partes_titulo.mp3": "Arriba está el título. Forma parte del paratexto y anticipa el tema del texto.",
  "assets/audio/v3_partes_introduccion.mp3": "El primer párrafo es la introducción: presenta el tema central de manera general.",
  "assets/audio/v3_partes_subtitulo.mp3": "Los subtítulos anuncian los subtemas. Este texto tiene tres: productores, consumidores y descomponedores; las cadenas tróficas; y las redes tróficas.",
  "assets/audio/v3_partes_desarrollo.mp3": "Debajo de cada subtítulo están los párrafos del desarrollo. Amplían la información y usan recursos como definiciones, ejemplos y clasificaciones.",
  "assets/audio/v3_partes_esquema.mp3": "Los esquemas también son paratexto: muestran con dibujos y flechas las relaciones que explica el texto. En estos esquemas, las flechas significan es comido por.",

  "assets/audio/v2_marcar_partes_instr.mp3": "Ahora te toca a vos. Leé el pedido y tocá esa parte en el texto.",
  "assets/audio/v2_mp_titulo_ped.mp3": "Tocá el título.",
  "assets/audio/v2_mp_titulo_ok.mp3": "¡Bien! Ese es el título: anticipa el tema del texto.",
  "assets/audio/v2_mp_intro_ped.mp3": "Tocá la introducción, que presenta el tema.",
  "assets/audio/v3_mp_intro_ok.mp3": "¡Muy bien! La introducción presenta el tema central de manera general.",
  "assets/audio/v3_mp_subtitulo_ped.mp3": "Tocá un subtítulo.",
  "assets/audio/v3_mp_subtitulo_ok.mp3": "¡Correcto! Cada subtítulo anuncia un subtema.",
  "assets/audio/v3_mp_desarrollo_ped.mp3": "Tocá un párrafo del desarrollo.",
  "assets/audio/v3_mp_desarrollo_ok.mp3": "¡Bien! En los párrafos del desarrollo se amplía la información.",
  "assets/audio/v3_mp_esquema_ped.mp3": "Tocá un esquema.",
  "assets/audio/v3_mp_esquema_ok.mp3": "¡Muy bien! El esquema es paratexto: muestra con dibujos y flechas lo que explica el texto.",

  "assets/audio/v2_asoc_partes_instr.mp3": "Tocá una parte del texto y después la función que cumple.",
  "assets/audio/v2_ap_izq1.mp3": "Título.",
  "assets/audio/v2_ap_izq2.mp3": "Introducción.",
  "assets/audio/v3_ap_izq3.mp3": "Subtítulo.",
  "assets/audio/v3_ap_izq4.mp3": "Desarrollo.",
  "assets/audio/v3_ap_izq5.mp3": "Esquema.",
  "assets/audio/v2_ap_der1.mp3": "Anticipa el tema del texto.",
  "assets/audio/v3_ap_der2.mp3": "Presenta el tema central de manera general.",
  "assets/audio/v3_ap_der3.mp3": "Indica cuál es el subtema que se va a desarrollar.",
  "assets/audio/v3_ap_der4.mp3": "Amplía la información, organizada en párrafos.",
  "assets/audio/v3_ap_der5.mp3": "Muestra con dibujos y flechas las relaciones que explica el texto.",
  "assets/audio/v2_ap_ok1.mp3": "El título anticipa el tema del texto.",
  "assets/audio/v3_ap_ok2.mp3": "La introducción presenta el tema central de manera general.",
  "assets/audio/v3_ap_ok3.mp3": "El subtítulo indica cuál es el subtema que se va a desarrollar.",
  "assets/audio/v3_ap_ok4.mp3": "El desarrollo amplía la información, organizada en párrafos.",
  "assets/audio/v3_ap_ok5.mp3": "El esquema muestra con dibujos y flechas las relaciones que explica el texto.",

  "assets/audio/v3_subt_instr.mp3": "Tené en cuenta los subtítulos y los párrafos. Tocá cada elemento y después la columna donde corresponde.",
  "assets/audio/v3_subt_c1.mp3": "Sí: productores, consumidores y descomponedores es el primer subtema, y aparece como subtítulo.",
  "assets/audio/v3_subt_c2.mp3": "Sí: las cadenas tróficas es el segundo subtema del texto.",
  "assets/audio/v3_subt_c3.mp3": "Sí: las redes tróficas es el tercer subtema del texto.",
  "assets/audio/v3_subt_c4.mp3": "No es un subtema: las relaciones de alimentación en un ecosistema son el tema central del texto.",
  "assets/audio/v3_subt_c5.mp3": "No es un subtema: los osos hormigueros son solo un ejemplo dentro de las redes tróficas.",
  "assets/audio/v3_subt_c6.mp3": "No es un subtema: el texto no habla del sistema solar.",

  "assets/audio/v3_subtit_instr.mp3": "Uní cada subtítulo del texto con otro que podría reemplazarlo sin cambiar el significado.",
  "assets/audio/v3_st_izq1.mp3": "Productores, consumidores y descomponedores.",
  "assets/audio/v3_st_izq2.mp3": "Las cadenas tróficas.",
  "assets/audio/v3_st_izq3.mp3": "Las redes tróficas.",
  "assets/audio/v3_st_der1.mp3": "Cómo se alimenta cada ser vivo.",
  "assets/audio/v3_st_der2.mp3": "¿Quién se alimenta de quién?",
  "assets/audio/v3_st_der3.mp3": "Cadenas que se entrecruzan.",
  "assets/audio/v3_st_ok1.mp3": "Productores, consumidores y descomponedores podría reemplazarse por: cómo se alimenta cada ser vivo.",
  "assets/audio/v3_st_ok2.mp3": "Las cadenas tróficas podría reemplazarse por: ¿quién se alimenta de quién?",
  "assets/audio/v3_st_ok3.mp3": "Las redes tróficas podría reemplazarse por: cadenas que se entrecruzan.",

  "assets/audio/v3_marcar_rec_instr.mp3": "Buscá en Cadenas y redes alimentarias la oración que usa cada recurso y tocala.",
  "assets/audio/v2_mr_def_ped.mp3": "Tocá la oración que tiene una definición.",
  "assets/audio/v3_mr_def_ok.mp3": "¡Muy bien! Es una definición: explica qué son las cadenas tróficas.",
  "assets/audio/v2_mr_clas_ped.mp3": "Tocá la oración que tiene una clasificación.",
  "assets/audio/v3_mr_clas_ok.mp3": "¡Correcto! Es una clasificación: agrupa a los animales en consumidores primarios y secundarios.",
  "assets/audio/v3_mr_ej_ped.mp3": "Tocá el ejemplo que tiene conector.",
  "assets/audio/v3_mr_ej_ok.mp3": "¡Bien! El conector como en el caso de presenta un ejemplo: los osos hormigueros.",
  "assets/audio/v3_mr_ej2_ped.mp3": "Tocá el ejemplo sin conector.",
  "assets/audio/v3_mr_ej2_ok.mp3": "¡Muy bien! Los halcones y las culebras son un ejemplo, aunque ningún conector lo introduce.",

  "assets/audio/v2_trivia_instr.mp3": "Leé cada pregunta y elegí la opción correcta.",
  "assets/audio/v3_tr_p3.mp3": "Como en el caso de los osos hormigueros. ¿Qué recurso se usa?",
  "assets/audio/v3_tr_p3_ok.mp3": "Ejemplo: el conector como en el caso de presenta un caso concreto.",
  "assets/audio/v2_tr_p4.mp3": "¿Para qué sirve un texto explicativo?",
  "assets/audio/v2_tr_p4_ok.mp3": "Para informar y explicar un tema de manera clara y ordenada.",

  "assets/audio/v2_vf_instr.mp3": "Leé cada afirmación sobre los textos explicativos e indicá si es verdadera o falsa.",
  "assets/audio/v2_vf_af1.mp3": "Un texto explicativo informa sobre un tema de manera clara y ordenada.",
  "assets/audio/v2_vf_j1.mp3": "Verdadero: su propósito es explicar un tema para que el lector lo comprenda.",
  "assets/audio/v2_vf_af2.mp3": "Los textos explicativos cuentan una historia con personajes imaginarios.",
  "assets/audio/v2_vf_j2.mp3": "Falso: eso lo hacen los cuentos. El texto explicativo informa sobre un tema real.",
  "assets/audio/v2_vf_af3.mp3": "El título y los subtítulos forman parte del paratexto.",
  "assets/audio/v2_vf_j3.mp3": "Verdadero: acompañan al texto principal y guían la lectura.",
  "assets/audio/v2_vf_af4.mp3": "El epígrafe es el párrafo más largo del texto.",
  "assets/audio/v2_vf_j4.mp3": "Falso: el epígrafe es un texto breve que explica una imagen o un esquema.",
  "assets/audio/v2_vf_af5.mp3": "La reformulación se introduce con conectores como es decir, u o sea.",
  "assets/audio/v2_vf_j5.mp3": "Verdadero: esos conectores anuncian que se va a decir lo mismo con otras palabras.",
  "assets/audio/v2_vf_af6.mp3": "Los ejemplos sirven para ordenar los elementos en grupos.",
  "assets/audio/v2_vf_j6.mp3": "Falso: eso es la clasificación. Los ejemplos muestran casos concretos del tema.",
  "assets/audio/v2_vf_af7.mp3": "Podemos encontrar textos explicativos en manuales y enciclopedias.",
  "assets/audio/v2_vf_j7.mp3": "Verdadero: también en revistas especializadas y sitios de divulgación.",

  "assets/audio/v2_sopa_epigrafe.mp3": "Epígrafe: texto breve que explica una imagen o un esquema."
};
