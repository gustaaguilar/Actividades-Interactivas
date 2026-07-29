// =========================================================
// DATOS.JS
// "Informarse protege. Hablar ayuda. Actuar transforma."
// Jornada Provincial 30 de julio - Trata, Explotación y Grooming
// =========================================================

var DATOS = {};

// ---------------------------------------------------------
// PORTADA
// ---------------------------------------------------------
DATOS.portada = {
    titulo: "Informarse protege. Hablar ayuda. Actuar transforma.",
    subtitulo: "Jornada Provincial de Sensibilización y Formación contra la Trata, la Explotación y el Grooming",
    imagenFondo: "img/portada.jpg"
};

// ---------------------------------------------------------
// PRIMER CICLO - "La mochila de los cuidados"
// ---------------------------------------------------------
DATOS.mochila = [
    { id: "cruzar_calle",     img: "img/mochila_cruzar_calle.jpg",     audio: "audio/pc_pregunta_cruzar_calle.mp3",     texto: "Un adulto ayuda a cruzar la calle con cuidado.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Un cuidado para nuestra seguridad", "Un juego", "Una tarea escolar"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_cruzar_calle.mp3" },
    { id: "comida_familia",   img: "img/mochila_comida_familia.jpg",   audio: "audio/pc_pregunta_comida_familia.mp3",   texto: "Una familia comparte la comida junta.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Un momento de cuidado y compañía", "Un cumpleaños", "Una fiesta"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_comida_familia.mp3" },
    { id: "aula",             img: "img/mochila_aula.jpg",             audio: "audio/pc_pregunta_aula.mp3",             texto: "Una maestra enseña con paciencia.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Alguien que nos ayuda a aprender", "Un recreo", "Un examen"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_aula.mp3" },
    { id: "consuelo",         img: "img/mochila_consuelo.jpg",         audio: "audio/pc_pregunta_consuelo.mp3",         texto: "Un adulto consuela a un niño que está triste.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Un adulto que cuida nuestras emociones", "Un enojo", "Un juego"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_consuelo.mp3" },
    { id: "medico",           img: "img/mochila_medico.jpg",           audio: "audio/pc_pregunta_medico.mp3",           texto: "Una médica revisa con cariño que estemos sanos.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["El cuidado de nuestra salud", "Un susto", "Una vacuna solamente"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_medico.mp3" },
    { id: "jardin",           img: "img/mochila_jardin.jpg",           audio: "audio/pc_pregunta_jardin.mp3",           texto: "Un papá acompaña a su hijo al jardín.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Un adulto que nos acompaña y cuida", "Un paseo", "Un cumpleaños"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_jardin.mp3" },
    { id: "abrazo",           img: "img/mochila_abrazo.jpg",           audio: "audio/pc_pregunta_abrazo.mp3",           texto: "Un abrazo protector.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["El cariño de una persona que nos cuida", "Un saludo", "Una despedida"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_abrazo.mp3" },
    { id: "amigos",           img: "img/mochila_amigos.jpg",           audio: "audio/pc_pregunta_amigos.mp3",           texto: "Un grupo de amigos juega junto.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Jugar de forma segura y respetuosa", "Una competencia", "Un partido de fútbol solamente"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_amigos.mp3" },
    { id: "abrigo",           img: "img/mochila_abrigo.jpg",           audio: "audio/pc_pregunta_abrigo.mp3",           texto: "Un abuelo ayuda a abrigarse del frío.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Un cuidado frente al frío", "Un juego de invierno", "Una fiesta de disfraces"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_abrigo.mp3" },
    { id: "estudiar",         img: "img/mochila_estudiar.jpg",         audio: "audio/pc_pregunta_estudiar.mp3",         texto: "Un hermano mayor ayuda a estudiar.",
      pregunta: "¿Qué representa esta imagen?",
      opciones: ["Alguien que nos ayuda cuando tenemos dudas", "Una tarea difícil", "Un examen"], correcta: 0,
      fundamentoAudio: "audio/mochila_fundamento_estudiar.mp3" }
];

DATOS.feedbackMochila = {
    correcto: "audio/mochila_feedback_correcto.mp3",
    incorrecto: "audio/mochila_feedback_incorrecto.mp3"
};

DATOS.preguntaComparteCuida = "audio/pregunta_comparto_cuido.mp3";

// ---------------------------------------------------------
// PRIMER CICLO - "Caperucita en internet" (Lo comparto / Lo cuido)
// ---------------------------------------------------------
DATOS.datosPersonales = [
    { id: "nombre",     texto: "Mi nombre",              categoria: "compartir", audio: "audio/dato_nombre.mp3" },
    { id: "direccion",  texto: "Mi dirección",           categoria: "cuidar",    audio: "audio/dato_direccion.mp3" },
    { id: "escuela",    texto: "Mi escuela",              categoria: "cuidar",    audio: "audio/dato_escuela.mp3" },
    { id: "clave",      texto: "Mi contraseña",           categoria: "cuidar",    audio: "audio/dato_clave.mp3" },
    { id: "foto",       texto: "Mi foto",                 categoria: "cuidar",    audio: "audio/dato_foto.mp3" },
    { id: "comida",     texto: "Mi comida favorita",      categoria: "compartir", audio: "audio/dato_comida.mp3" },
    { id: "mascota",    texto: "El nombre de mi mascota", categoria: "compartir", audio: "audio/dato_mascota.mp3" },
    { id: "telefono",   texto: "Mi número de teléfono",   categoria: "cuidar",    audio: "audio/dato_telefono.mp3" },
    { id: "edad",       texto: "Mi edad",                 categoria: "compartir", audio: "audio/dato_edad.mp3" },
    { id: "fotofamilia",texto: "Una foto familiar",       categoria: "cuidar",    audio: "audio/dato_fotofamilia.mp3" }
];

DATOS.imagenClasificar = "img/chico_pensativo.jpg";

DATOS.reglas = [
    {
        id: 1,
        img: "img/regla_1.jpg",
        audio: "audio/pc_regla_1.mp3",
        palabras: [
            { texto: "Cuidar",     audio: "audio/regla1_palabra1.mp3" },
            { texto: "mis",        audio: "audio/regla1_palabra2.mp3" },
            { texto: "datos",      audio: "audio/regla1_palabra3.mp3" },
            { texto: "personales.",audio: "audio/regla1_palabra4.mp3" }
        ]
    },
    {
        id: 2,
        img: "img/regla_2.jpg",
        audio: "audio/pc_regla_2.mp3",
        palabras: [
            { texto: "Avisar",     audio: "audio/regla2_palabra1.mp3" },
            { texto: "siempre",    audio: "audio/regla2_palabra2.mp3" },
            { texto: "a",          audio: "audio/regla2_palabra3.mp3" },
            { texto: "un",         audio: "audio/regla2_palabra4.mp3" },
            { texto: "adulto",     audio: "audio/regla2_palabra5.mp3" },
            { texto: "de",         audio: "audio/regla2_palabra6.mp3" },
            { texto: "confianza",  audio: "audio/regla2_palabra7.mp3" },
            { texto: "si",         audio: "audio/regla2_palabra8.mp3" },
            { texto: "algo",       audio: "audio/regla2_palabra9.mp3" },
            { texto: "me",         audio: "audio/regla2_palabra10.mp3" },
            { texto: "preocupa.",  audio: "audio/regla2_palabra11.mp3" }
        ]
    },
    {
        id: 3,
        img: "img/regla_3.jpg",
        audio: "audio/pc_regla_3.mp3",
        palabras: [
            { texto: "No",             audio: "audio/regla3_palabra1.mp3" },
            { texto: "hablar",         audio: "audio/regla3_palabra2.mp3" },
            { texto: "de",             audio: "audio/regla3_palabra3.mp3" },
            { texto: "temas",          audio: "audio/regla3_palabra4.mp3" },
            { texto: "íntimos",        audio: "audio/regla3_palabra5.mp3" },
            { texto: "con",            audio: "audio/regla3_palabra6.mp3" },
            { texto: "personas",       audio: "audio/regla3_palabra7.mp3" },
            { texto: "desconocidas.",  audio: "audio/regla3_palabra8.mp3" }
        ]
    }
];

// ---------------------------------------------------------
// SEGUNDO Y TERCER CICLO - "Ruleta de navegación segura"
// ---------------------------------------------------------
DATOS.ruleta = [
    { id: 1, texto: "Un juego te pide tu nombre completo y tu escuela para \"crear tu personaje\".", tipo: "dudoso", audio: "audio/st_ruleta_situacion_1.mp3" },
    { id: 2, texto: "Estás jugando online con amigos del barrio que también conocés en persona.", tipo: "seguro", audio: "audio/st_ruleta_situacion_2.mp3" },
    { id: 3, texto: "Alguien que no conocés te escribe pidiéndote una foto tuya.", tipo: "riesgoso", audio: "audio/st_ruleta_situacion_3.mp3" },
    { id: 4, texto: "Un desconocido en un chat te pide que no le cuentes a nadie de la conversación.", tipo: "riesgoso", audio: "audio/st_ruleta_situacion_4.mp3" },
    { id: 5, texto: "Le pedís permiso a tus papás antes de descargar una aplicación nueva.", tipo: "seguro", audio: "audio/st_ruleta_situacion_5.mp3" },
    { id: 6, texto: "Una cuenta desconocida te insiste en seguir hablando aunque vos ya no querés.", tipo: "riesgoso", audio: "audio/st_ruleta_situacion_6.mp3" },
    { id: 7, texto: "Compartís tu usuario de juego (sin datos personales) con un compañero de clase.", tipo: "seguro", audio: "audio/st_ruleta_situacion_7.mp3" },
    { id: 8, texto: "Alguien te ofrece regalos virtuales a cambio de información personal.", tipo: "riesgoso", audio: "audio/st_ruleta_situacion_8.mp3" },
    { id: 9, texto: "Un video te pide compartirlo con tu ubicación activada.", tipo: "dudoso", audio: "audio/st_ruleta_situacion_9.mp3" },
    { id: 10, texto: "Le contás a un adulto de confianza algo que te hizo sentir raro en un chat.", tipo: "seguro", audio: "audio/st_ruleta_situacion_10.mp3" }
];

DATOS.mensajesRuleta = {
    seguro:   { audio: "audio/st_mensaje_seguro.mp3",   color: "#4CAF7D" },
    dudoso:   { audio: "audio/st_mensaje_dudoso.mp3",   color: "#F0A73C" },
    riesgoso: { audio: "audio/st_mensaje_riesgoso.mp3", color: "#E05A4E" }
};

// ---------------------------------------------------------
// SEGUNDO Y TERCER CICLO - "Cuestionario" (reemplaza entrevista)
// ---------------------------------------------------------
DATOS.cuestionario = [
    { id: 1, pregunta: "Antes de subir una foto en la que aparece otra persona, ¿qué es lo correcto hacer?",
      opciones: ["Preguntarle si está de acuerdo", "Subirla directamente", "Pedirle el teléfono para pedirle luego"], correcta: 0,
      audioPregunta: "audio/st_pregunta_1.mp3", audioFundamento: "audio/st_fundamento_pregunta_1.mp3" },
    { id: 2, pregunta: "¿Qué foto de perfil es más segura para usar en tus redes?",
      opciones: ["Una que no muestre tu ubicación ni datos personales", "Una con tu dirección de fondo", "Una con el cartel de tu escuela visible"], correcta: 0,
      audioPregunta: "audio/st_pregunta_2.mp3", audioFundamento: "audio/st_fundamento_pregunta_2.mp3" },
    { id: 3, pregunta: "Si algo que ves en una foto o video te hace sentir incómodo/a, ¿qué es lo mejor que podés hacer?",
      opciones: ["Contárselo a un adulto de confianza", "Guardarlo en secreto", "Ignorarlo y seguir de largo"], correcta: 0,
      audioPregunta: "audio/st_pregunta_3.mp3", audioFundamento: "audio/st_fundamento_pregunta_3.mp3" },
    { id: 4, pregunta: "¿Está bien hablar en familia sobre lo que hacemos en internet?",
      opciones: ["Sí, ayuda a cuidarnos entre todos", "No, es un tema privado que no se comparte", "Solo si pasa algo malo"], correcta: 0,
      audioPregunta: "audio/st_pregunta_4.mp3", audioFundamento: "audio/st_fundamento_pregunta_4.mp3" },
    { id: 5, pregunta: "Si alguien te pide una foto tuya y no lo conocés, ¿qué hacés?",
      opciones: ["No se la envío y aviso a un adulto", "Se la envío si insiste", "Le pido que primero me mande una foto de él/ella"], correcta: 0,
      audioPregunta: "audio/st_pregunta_5.mp3", audioFundamento: "audio/st_fundamento_pregunta_5.mp3" }
];

// ---------------------------------------------------------
// SEGUNDO Y TERCER CICLO - "Nuestros acuerdos" (Mural)
// ---------------------------------------------------------
DATOS.compromisos = [
    { id: 1, texto: "Cuidar mis datos personales.", icono: "🔒",
      situacion: "Un juego te pide tu dirección para \"personalizar tu personaje\". ¿Qué hacés?",
      opciones: ["No se la doy y sigo jugando igual", "Se la doy para tener mejores opciones", "Le pregunto a un desconocido del chat si es seguro"],
      correcta: 0, audio: "audio/st_fundamento_compromiso_1.mp3", audioSituacion: "audio/st_situacion_compromiso_1.mp3" },
    { id: 2, texto: "No compartir fotos con desconocidos.", icono: "📷",
      situacion: "Alguien que no conocés te pide una foto tuya. ¿Qué hacés?",
      opciones: ["No se la envío", "Se la envío si parece simpático/a", "Le pido primero una foto de él/ella"],
      correcta: 0, audio: "audio/st_fundamento_compromiso_2.mp3", audioSituacion: "audio/st_situacion_compromiso_2.mp3" },
    { id: 3, texto: "Contar a una persona adulta si algo me preocupa.", icono: "🗣️",
      situacion: "Una conversación en internet te hizo sentir incómodo/a. ¿Qué hacés?",
      opciones: ["Se lo cuento a un adulto de confianza", "No le cuento a nadie", "Borro todo y sigo como si nada"],
      correcta: 0, audio: "audio/st_fundamento_compromiso_3.mp3", audioSituacion: "audio/st_situacion_compromiso_3.mp3" },
    { id: 4, texto: "No guardar secretos que me hagan sentir incómodo/a.", icono: "🚫",
      situacion: "Alguien te pide que no le cuentes a nadie sobre una conversación. ¿Qué hacés?",
      opciones: ["Igual se lo cuento a un adulto de confianza", "Guardo el secreto como me pidieron", "Se lo cuento solo a un amigo/a"],
      correcta: 0, audio: "audio/st_fundamento_compromiso_4.mp3", audioSituacion: "audio/st_situacion_compromiso_4.mp3" },
    { id: 5, texto: "Pedir ayuda cuando la necesite.", icono: "🤝",
      situacion: "Te sentís mal por algo que pasó en internet y no sabés qué hacer. ¿Qué hacés?",
      opciones: ["Pido ayuda a alguien de confianza", "Trato de resolverlo solo/a", "Espero a que se me pase"],
      correcta: 0, audio: "audio/st_fundamento_compromiso_5.mp3", audioSituacion: "audio/st_situacion_compromiso_5.mp3" },
    { id: 6, texto: "Tratar a los demás con respeto en internet.", icono: "💚",
      situacion: "Un compañero comete un error en un juego online. ¿Qué hacés?",
      opciones: ["Lo trato con respeto igual que en persona", "Me burlo en el chat", "Lo ignoro para siempre"],
      correcta: 0, audio: "audio/st_fundamento_compromiso_6.mp3", audioSituacion: "audio/st_situacion_compromiso_6.mp3" }
];

// ---------------------------------------------------------
// ENLACES DE VIDEO (se abren en pestaña nueva) + CRÉDITOS
// ---------------------------------------------------------
DATOS.videos = {
    caperucita: {
        url: "https://www.youtube.com/watch?v=l49UfgAnuRw",
        credito: "Video: \"Caperucita Roja 2.0\" — @EducarPortal (Educ.ar, Secretaría de Educación, Ministerio de Capital Humano de la Nación). Disponible en YouTube."
    },
    navegacionSegura: {
        url: "https://www.youtube.com/watch?v=LykDSZtEen4",
        credito: "Video: \"RAP Digital\" (Ganador General) de Francisco Pszynski — @UNICEFArgentina. Disponible en YouTube."
    }
};

// ---------------------------------------------------------
// FUENTE DEL MATERIAL
// ---------------------------------------------------------
DATOS.fuente = {
    texto: "En base a material sugerido por la Dirección de Acompañamiento Escolar (DAE) - Dirección General de Escuelas (DGE), Mendoza.",
    logo: "img/logo_dge.jpg"
};

// ---------------------------------------------------------
// SEGUNDO Y TERCER CICLO - Memojuego (reemplaza la actividad de colorear)
// ---------------------------------------------------------
// Reutiliza las mismas 10 imágenes de la mochila como cartas del memotest.
DATOS.memojuego = {
    consigna: "audio/st_memo_consigna.mp3",
    cierre: "audio/st_memo_cierre.mp3",
    cartas: [
        { id: "cruzar_calle",   img: "img/mochila_cruzar_calle.jpg",   audio: "audio/st_memo_cruzar_calle.mp3" },
        { id: "comida_familia", img: "img/mochila_comida_familia.jpg", audio: "audio/st_memo_comida_familia.mp3" },
        { id: "aula",           img: "img/mochila_aula.jpg",           audio: "audio/st_memo_aula.mp3" },
        { id: "consuelo",       img: "img/mochila_consuelo.jpg",       audio: "audio/st_memo_consuelo.mp3" },
        { id: "medico",         img: "img/mochila_medico.jpg",         audio: "audio/st_memo_medico.mp3" },
        { id: "jardin",         img: "img/mochila_jardin.jpg",         audio: "audio/st_memo_jardin.mp3" },
        { id: "abrazo",         img: "img/mochila_abrazo.jpg",         audio: "audio/st_memo_abrazo.mp3" },
        { id: "amigos",         img: "img/mochila_amigos.jpg",         audio: "audio/st_memo_amigos.mp3" },
        { id: "abrigo",         img: "img/mochila_abrigo.jpg",         audio: "audio/st_memo_abrigo.mp3" },
        { id: "estudiar",       img: "img/mochila_estudiar.jpg",       audio: "audio/st_memo_estudiar.mp3" }
    ]
};

// ---------------------------------------------------------
// SEGUNDO Y TERCER CICLO - Rompecabezas de cierre (6 piezas, 3x2)
// ---------------------------------------------------------
DATOS.rompecabezas = {
    imagen: "img/rompecabezas_cierre.jpg",
    columnas: 3,
    filas: 2,
    audioFinal: "audio/st_arte_consejo_final.mp3"
};

// ---------------------------------------------------------
// LÍNEA DE AYUDA
// ---------------------------------------------------------
DATOS.lineaAyuda = {
    numero: "145",
    texto: "Línea nacional de denuncias y orientación. Gratuita, anónima y disponible las 24 horas."
};
