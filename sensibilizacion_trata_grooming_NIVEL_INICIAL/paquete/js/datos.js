// =========================================================
// DATOS.JS - NIVEL INICIAL
// "Informarse protege. Hablar ayuda. Actuar transforma."
// Jornada Provincial - Sensibilización y Formación contra la
// Trata, la Explotación y el Grooming
// =========================================================

var DATOS = {};

// ---------------------------------------------------------
// PORTADA
// ---------------------------------------------------------
DATOS.portada = {
    titulo: "Informarse protege. Hablar ayuda. Actuar transforma.",
    subtitulo: "Jornada Provincial de Sensibilización y Formación contra la Trata, la Explotación y el Grooming · Nivel Inicial",
    imagenFondo: "img/portada.jpg"
};

// ---------------------------------------------------------
// CUENTO "LOS GUARDA SECRETOS"
// ---------------------------------------------------------
DATOS.cuento = {
    url: "https://www.youtube.com/watch?v=ZuTOu4tsAJs",
    credito: "Cuento: \"Los guarda secretos\", de Graciela Repún — edición de UNICEF, colección \"Cuentos que cuidan\"."
};

// ---------------------------------------------------------
// PERSONAS DE CONFIANZA (para "¿A quién le cuento?")
// ---------------------------------------------------------
DATOS.personasConfianza = [
    { id: "mama",    nombre: "Mamá",    img: "img/mama.jpg",    audio: "audio/confianza_mama.mp3",    audioMemo: "audio/memo_mama.mp3" },
    { id: "papa",    nombre: "Papá",    img: "img/papa.jpg",    audio: "audio/confianza_papa.mp3",    audioMemo: "audio/memo_papa.mp3" },
    { id: "seño",    nombre: "La seño", img: "img/seño.jpg",    audio: "audio/confianza_seño.mp3",    audioMemo: "audio/memo_seño.mp3" },
    { id: "abuela",  nombre: "Abuela",  img: "img/abuela.jpg",  audio: "audio/confianza_abuela.mp3",  audioMemo: "audio/memo_abuela.mp3" },
    { id: "abuelo",  nombre: "Abuelo",  img: "img/abuelo.jpg",  audio: "audio/confianza_abuelo.mp3",  audioMemo: "audio/memo_abuelo.mp3" },
    { id: "hermano", nombre: "Hermano/a mayor", img: "img/hermano.jpg", audio: "audio/confianza_hermano.mp3", audioMemo: "audio/memo_hermano.mp3" }
];

// ---------------------------------------------------------
// ACTIVIDAD "¿A QUIÉN LE CUENTO?" (16 situaciones)
// ---------------------------------------------------------
DATOS.aQuienLeCuento = [
    { id: 1,  texto: "Perdí mi juguete favorito y no lo encuentro.",                       audio: "audio/cuento_situacion_01.mp3", importante: false },
    { id: 2,  texto: "Tengo ganas de llorar y no sé por qué.",                              audio: "audio/cuento_situacion_02.mp3", importante: false },
    { id: 3,  texto: "Me peleé con un amigo y me siento mal.",                              audio: "audio/cuento_situacion_03.mp3", importante: false },
    { id: 5,  texto: "Me siento solo/a y no quiero jugar.",                                 audio: "audio/cuento_situacion_05.mp3", importante: false },
    { id: 6,  texto: "Escuché algo que me hizo sentir incómodo/a.",                         audio: "audio/cuento_situacion_06.mp3", importante: true },
    { id: 10, texto: "Estoy muy enojado/a y no sé cómo calmarme.",                          audio: "audio/cuento_situacion_10.mp3", importante: false },
    { id: 13, texto: "Un juego me hizo sentir incómodo/a.",                                 audio: "audio/cuento_situacion_13.mp3", importante: true },
    { id: 16, texto: "Alguien insiste en hacer algo que no quiero.",                        audio: "audio/cuento_situacion_16.mp3", importante: true }
];

DATOS.refuerzoImportante = "audio/refuerzo_importante.mp3";

// ---------------------------------------------------------
// MEMOJUEGO DE PERSONAS DE CONFIANZA
// ---------------------------------------------------------
DATOS.memojuegoConfianza = {
    consigna: "audio/intro_memojuego_confianza.mp3",
    cierre: "audio/cierre_memojuego_confianza.mp3"
};

// ---------------------------------------------------------
// MURAL DE CUALIDADES ("Mi cuerpo es valioso")
// ---------------------------------------------------------
DATOS.cualidades = [
    { id: "cantar",   texto: "Me gusta cantar",              icono: "🎵", audio: "audio/cualidad_cantar.mp3" },
    { id: "correr",   texto: "Me gusta correr",               icono: "🏃", audio: "audio/cualidad_correr.mp3" },
    { id: "dibujar",  texto: "Me gusta dibujar",               icono: "🎨", audio: "audio/cualidad_dibujar.mp3" },
    { id: "bailar",   texto: "Me gusta bailar",                icono: "💃", audio: "audio/cualidad_bailar.mp3" },
    { id: "amigos",   texto: "Me gusta jugar con mis amigos",  icono: "🤝", audio: "audio/cualidad_amigos.mp3" },
    { id: "ayudar",   texto: "Me gusta ayudar",                icono: "💚", audio: "audio/cualidad_ayudar.mp3" },
    { id: "reir",     texto: "Me gusta reír",                  icono: "😄", audio: "audio/cualidad_reir.mp3" },
    { id: "abrazar",  texto: "Me gusta dar abrazos",           icono: "🤗", audio: "audio/cualidad_abrazar.mp3" }
];

// ---------------------------------------------------------
// EL SEMÁFORO DE LOS LÍMITES (16 situaciones con imagen)
// ---------------------------------------------------------
DATOS.semaforo = [
    { id: 1,  img: "img/situacion_01.jpg", texto: "Una amiga me pregunta si quiero jugar con ella.",                 color: "verde",   audio: "audio/semaforo_situacion_01.mp3" },
    { id: 6,  img: "img/situacion_06.jpg", texto: "Alguien quiere sacarme un juguete y yo no quiero.",                color: "amarillo",audio: "audio/semaforo_situacion_06.mp3" },
    { id: 2,  img: "img/situacion_02.jpg", texto: "Mi mamá me pregunta si quiero un abrazo.",                        color: "verde",   audio: "audio/semaforo_situacion_02.mp3" },
    { id: 8,  img: "img/situacion_08.jpg", texto: "Alguien no escucha cuando digo \"no\".",                          color: "rojo",    audio: "audio/semaforo_situacion_08.mp3" },
    { id: 3,  img: "img/situacion_03.jpg", texto: "Un compañero me presta un juguete.",                              color: "verde",   audio: "audio/semaforo_situacion_03.mp3" },
    { id: 7,  img: "img/situacion_07.jpg", texto: "Un compañero quiere seguir jugando a algo que ya no me gusta.",    color: "amarillo",audio: "audio/semaforo_situacion_07.mp3" },
    { id: 4,  img: "img/situacion_04.jpg", texto: "La seño me ayuda cuando no puedo hacer algo.",                    color: "verde",   audio: "audio/semaforo_situacion_04.mp3" },
    { id: 9,  img: "img/situacion_09.jpg", texto: "Alguien me hace cosquillas aunque le pedí que pare.",              color: "rojo",    audio: "audio/semaforo_situacion_09.mp3" },
    { id: 5,  img: "img/situacion_05.jpg", texto: "Me dejan elegir el color que quiero usar.",                       color: "verde",   audio: "audio/semaforo_situacion_05.mp3" },
    { id: 10, img: "img/situacion_10.jpg", texto: "Un compañero se ríe de mí y me pone triste.",                     color: "rojo",    audio: "audio/semaforo_situacion_10.mp3" },
    { id: 13, img: "img/situacion_13.jpg", texto: "Me siento triste y se lo cuento a un adulto que me cuida.",       color: "verde",   audio: "audio/semaforo_situacion_13.mp3" },
    { id: 11, img: "img/situacion_11.jpg", texto: "Quiero estar solo un momento y alguien no me deja.",              color: "amarillo",audio: "audio/semaforo_situacion_11.mp3" },
    { id: 14, img: "img/situacion_14.jpg", texto: "Necesito ayuda y se la pido a la seño.",                          color: "verde",   audio: "audio/semaforo_situacion_14.mp3" },
    { id: 12, img: "img/situacion_12.jpg", texto: "Algo me hace sentir incómodo y no sé qué hacer.",                 color: "rojo",    audio: "audio/semaforo_situacion_12.mp3" },
    { id: 15, img: "img/situacion_15.jpg", texto: "Digo lo que siento y me escuchan con atención.",                  color: "verde",   audio: "audio/semaforo_situacion_15.mp3" },
    { id: 16, img: "img/situacion_16.jpg", texto: "Cuando algo no me gusta, puedo decir \"NO\".",                    color: "verde",   audio: "audio/semaforo_situacion_16.mp3" }
];

DATOS.coloresSemaforo = {
    verde:    { texto: "Me gusta, me hace sentir bien.",  color: "#4CAF7D", audio: "audio/semaforo_verde.mp3" },
    amarillo: { texto: "No estoy seguro/a, necesito pensar más.", color: "#F0A73C", audio: "audio/semaforo_amarillo.mp3" },
    rojo:     { texto: "No me gusta, me incomoda.",       color: "#E05A4E", audio: "audio/semaforo_rojo.mp3" }
};

// ---------------------------------------------------------
// LÍNEA DE AYUDA
// ---------------------------------------------------------
DATOS.lineaAyuda = {
    numero: "145",
    texto: "Línea nacional de denuncias y orientación. Gratuita, anónima y disponible las 24 horas."
};

// ---------------------------------------------------------
// FUENTE DEL MATERIAL
// ---------------------------------------------------------
DATOS.fuente = {
    texto: "En base a material sugerido por la Dirección de Acompañamiento Escolar (DAE) - Dirección General de Escuelas (DGE), Mendoza.",
    logo: "img/logo_dge.jpg"
};

// ---------------------------------------------------------
// IMAGEN DE CIERRE
// ---------------------------------------------------------
DATOS.imagenCierre = "img/cierre.jpg";
