/* Razonamiento geométrico — Sala de 5 — QueSepanTodos.com
   © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0 */
function A(a, t) { return { a: a, t: t }; }
/* Opciones de forma: lista de formas + cuál es la correcta */
function F(lista, ok) {
  return lista.map(function (f) { return { forma: f, ok: f === ok }; });
}
var CUATRO = ["cuadrado", "rectangulo", "triangulo", "circulo"];

window.DATOS = {
  meta: {
    titulo: "Razonamiento geométrico",
    subtitulo: "Detectives de formas 🔎⭐",
    nivel: "Nivel Inicial · Sala de 5 · Primer Grado",
    autor: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "✉️ profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    licencia: "© 2026 Gustavo Aguilar · CC BY-NC-ND 4.0",
    video: "NooFRrvZ5vw"
  },
  comunes: {
    error: A("comun_error", "Mmm, esa no es. ¡Probá otra vez!"),
    formas: {
      cuadrado: A("forma_cuadrado", "El cuadrado."),
      rectangulo: A("forma_rectangulo", "El rectángulo."),
      triangulo: A("forma_triangulo", "El triángulo."),
      circulo: A("forma_circulo", "El círculo.")
    }
  },
  pantallas: [
    /* 0 */
    { tipo: "portada", img: "img/portada.jpg", emoji: "🔺🟦⚪",
      audio: A("p00_portada", "¡Hola! Hoy vamos a ser detectives de formas geométricas. Tocá el botón Comenzar.") },

    /* 1 */
    { tipo: "video", titulo: "🎬 Miramos el video", img: "img/video.jpg", emoji: "📺",
      texto: "Mirá el video con tu familia",
      audio: A("p01_video", "Primero, mirá el video junto a tu familia. Tocá el botón para verlo. Prestá atención: ¿de qué habla? ¿Qué formas nombran? Cuando termines, tocá Siguiente.") },

    /* 2 */
    { tipo: "opcion", titulo: "🤔 Pensamos en el video",
      items: [
        { pregunta: "¿De qué habla el video?",
          audio: A("p02_i1", "¿De qué habla el video? ¿De las formas, de los animales o de las frutas? Tocá el dibujo."),
          opciones: [
            { formas: ["triangulo", "cuadrado", "circulo"], label: "Formas", ok: true },
            { emoji: "🐶🐱🐰", label: "Animales" },
            { emoji: "🍎🍌🍇", label: "Frutas" }
          ],
          conf: A("p02_c1", "¡Muy bien! El video habla de las formas geométricas: el cuadrado, el rectángulo, el triángulo y el círculo.") }
      ] },

    /* 3 */
    { tipo: "narracion", titulo: "🔺 Conocemos las formas", escena: "formas",
      pasos: [
        { texto: "¡Vamos a conocerlas!", audio: A("p03_s0", "En el video aparecen estas formas. ¡Vamos a conocerlas una por una!") },
        { texto: "Cuadrado", marca: ["f_cuadrado"], mostrar: ["l_cuadrado"],
          audio: A("p03_s1", "Este es el cuadrado. Tiene cuatro lados iguales y cuatro puntas.") },
        { texto: "Rectángulo", marca: ["f_rectangulo"], mostrar: ["l_rectangulo"],
          audio: A("p03_s2", "Este es el rectángulo. También tiene cuatro lados: dos largos y dos cortos.") },
        { texto: "Triángulo", marca: ["f_triangulo"], mostrar: ["l_triangulo"],
          audio: A("p03_s3", "Este es el triángulo. Tiene tres lados y tres puntas.") },
        { texto: "Círculo", marca: ["f_circulo"], mostrar: ["l_circulo"],
          audio: A("p03_s4", "Y este es el círculo. Es redondo y no tiene puntas.") }
      ] },

    /* 4 */
    { tipo: "opcion", titulo: "🔎 Encontrá la forma",
      items: [
        { pregunta: "Tocá el triángulo", audio: A("p04_i1", "Tocá el triángulo."), opciones: F(CUATRO, "triangulo"),
          conf: A("p04_c1", "¡Sí! Ese es el triángulo: tiene tres lados y tres puntas.") },
        { pregunta: "Tocá el círculo", audio: A("p04_i2", "Ahora, tocá el círculo."), opciones: F(CUATRO, "circulo"),
          conf: A("p04_c2", "¡Muy bien! El círculo es redondo, como una pelota.") },
        { pregunta: "Tocá el rectángulo", audio: A("p04_i3", "Tocá el rectángulo."), opciones: F(CUATRO, "rectangulo"),
          conf: A("p04_c3", "¡Bien! El rectángulo tiene dos lados largos y dos cortos.") },
        { pregunta: "Tocá el cuadrado", audio: A("p04_i4", "Y ahora, tocá el cuadrado."), opciones: F(CUATRO, "cuadrado"),
          conf: A("p04_c4", "¡Excelente! El cuadrado tiene cuatro lados iguales.") }
      ] },

    /* 5 */
    { tipo: "opcion", titulo: "🧠 Pensá y elegí",
      items: [
        { pregunta: "¿Qué forma no tiene puntas?", audio: A("p05_i1", "¿Qué forma no tiene puntas?"), opciones: F(CUATRO, "circulo"),
          conf: A("p05_c1", "¡Sí! El círculo es redondo: no tiene lados rectos ni puntas.") },
        { pregunta: "¿Qué forma tiene tres lados?", audio: A("p05_i2", "¿Qué forma tiene tres lados?"), opciones: F(CUATRO, "triangulo"),
          conf: A("p05_c2", "¡Muy bien! El triángulo tiene tres lados. Contemos: uno, dos y tres.") },
        { pregunta: "¿Cuál tiene dos lados largos y dos cortos?", audio: A("p05_i3", "¿Qué forma tiene dos lados largos y dos lados cortos?"), opciones: F(CUATRO, "rectangulo"),
          conf: A("p05_c3", "¡Exacto! El rectángulo tiene dos lados largos y dos cortos, como una puerta.") },
        { pregunta: "¿Cuál tiene cuatro lados iguales?", audio: A("p05_i4", "¿Qué forma tiene cuatro lados iguales?"), opciones: F(CUATRO, "cuadrado"),
          conf: A("p05_c4", "¡Genial! El cuadrado tiene cuatro lados iguales.") }
      ] },

    /* 6 */
    { tipo: "opcion", titulo: "👀 ¿Es o no es?",
      intro: A("p06_intro", "Mirá bien cada dibujo. Si es la forma que te pregunto, tocá Sí. Si no es, tocá No."),
      items: [
        { pregunta: "¿Es un triángulo?", figura: { forma: "triangulo", color: "#ff922b", rot: 180 }, fijo: true,
          audio: A("p06_i1", "¿Esto es un triángulo?"),
          opciones: [{ emoji: "👍", label: "Sí", ok: true }, { emoji: "👎", label: "No" }],
          conf: A("p06_c1", "¡Sí! Aunque esté dado vuelta, tiene tres lados y tres puntas. Es un triángulo.") },
        { pregunta: "¿Es un cuadrado?", figura: { forma: "cuadrado", color: "#4dabf7", rot: 45 }, fijo: true,
          audio: A("p06_i2", "¿Esto es un cuadrado?"),
          opciones: [{ emoji: "👍", label: "Sí", ok: true }, { emoji: "👎", label: "No" }],
          conf: A("p06_c2", "¡Muy bien! Está inclinado, pero tiene cuatro lados iguales. Es un cuadrado.") },
        { pregunta: "¿Es un triángulo?", figura: { forma: "trianguloAbierto", color: "#51cf66" }, fijo: true,
          audio: A("p06_i3", "¿Esto es un triángulo?"),
          opciones: [{ emoji: "👍", label: "Sí" }, { emoji: "👎", label: "No", ok: true }],
          conf: A("p06_c3", "¡Bien pensado! No es un triángulo, porque le falta un lado: está abierto.") },
        { pregunta: "¿Es un cuadrado?", figura: { forma: "rectLargo", color: "#cc5de8" }, fijo: true,
          audio: A("p06_i4", "¿Esto es un cuadrado?"),
          opciones: [{ emoji: "👍", label: "Sí" }, { emoji: "👎", label: "No", ok: true }],
          conf: A("p06_c4", "¡Exacto! No es un cuadrado: tiene dos lados largos y dos cortos. Es un rectángulo.") },
        { pregunta: "¿Es un círculo?", figura: { forma: "circChico", color: "#fcc419" }, fijo: true,
          audio: A("p06_i5", "¿Esto es un círculo?"),
          opciones: [{ emoji: "👍", label: "Sí", ok: true }, { emoji: "👎", label: "No" }],
          conf: A("p06_c5", "¡Sí! Aunque sea chiquito, es redondo. Es un círculo.") }
      ] },

    /* 7 */
    { tipo: "narracion", titulo: "🏠 El desafío en casa", escena: "tele",
      pasos: [
        { texto: "¡A buscar formas en casa!", audio: A("p07_s0", "Ahora viene el desafío: buscar en casa objetos que se parezcan a las formas.") },
        { texto: "El televisor…", marca: ["obj"], audio: A("p07_s1", "Por ejemplo, mirá el televisor.") },
        { texto: "…se parece a un rectángulo", marca: ["forma"], mostrar: ["flecha", "forma", "lforma"],
          audio: A("p07_s2", "¡Se parece a un rectángulo! Tiene dos lados largos y dos cortos.") },
        { texto: "¿Qué más encontrás?", marca: ["lupa"], mostrar: ["lupa"],
          audio: A("p07_s3", "Mirá a tu alrededor con tu familia: ¿qué más encontrás? Saquen una foto de lo que encuentren.") }
      ] },

    /* 8 */
    { tipo: "clasificar", titulo: "🧩 ¿A qué forma se parece?",
      intro: A("p08_intro", "Mirá cada objeto de la casa y tocá la forma a la que se parece."),
      destinos: CUATRO,
      items: [
        { img: "img/puerta.jpg", emoji: "🚪", forma: "rectangulo", nombre: A("p08_n_puerta", "La puerta."),
          conf: A("p08_c_puerta", "¡Sí! La puerta es larga, como un rectángulo.") },
        { img: "img/libro.jpg", emoji: "📕", forma: "rectangulo", nombre: A("p08_n_libro", "El libro."),
          conf: A("p08_c_libro", "¡Muy bien! El libro tiene la forma de un rectángulo.") },
        { img: "img/reloj.jpg", emoji: "🕰️", forma: "circulo", nombre: A("p08_n_reloj", "El reloj."),
          conf: A("p08_c_reloj", "¡Sí! El reloj es redondo, como un círculo.") },
        { img: "img/plato.jpg", emoji: "🍽️", forma: "circulo", nombre: A("p08_n_plato", "El plato."),
          conf: A("p08_c_plato", "¡Bien! El plato es redondo: se parece a un círculo.") },
        { img: "img/pizza.jpg", emoji: "🍕", forma: "triangulo", nombre: A("p08_n_pizza", "La porción de pizza."),
          conf: A("p08_c_pizza", "¡Sí! La porción de pizza tiene tres puntas, como un triángulo.") },
        { img: "img/percha.jpg", emoji: "🧥", forma: "triangulo", nombre: A("p08_n_percha", "La percha."),
          conf: A("p08_c_percha", "¡Muy bien! La percha tiene forma de triángulo.") },
        { img: "img/dado.jpg", emoji: "🎲", forma: "cuadrado", nombre: A("p08_n_dado", "El dado."),
          conf: A("p08_c_dado", "¡Sí! Cada cara del dado es un cuadrado.") },
        { img: "img/almohadon.jpg", emoji: "🛋️", forma: "cuadrado", nombre: A("p08_n_almohadon", "El almohadón."),
          conf: A("p08_c_almohadon", "¡Bien! El almohadón tiene cuatro lados iguales, como un cuadrado.") }
      ] },

    /* 9 */
    { tipo: "asociar", titulo: "🔗 Uní cada objeto con su forma",
      intro: A("p09_intro", "Tocá una forma y después tocá el objeto que se le parece."),
      pares: [
        { forma: "rectangulo", img: "img/televisor.jpg", emoji: "📺", label: "Televisor",
          nombre: A("p09_n_tele", "El televisor."), conf: A("p09_c_tele", "¡Pareja! El televisor y el rectángulo.") },
        { forma: "circulo", img: "img/moneda.jpg", emoji: "🪙", label: "Moneda",
          nombre: A("p09_n_moneda", "La moneda."), conf: A("p09_c_moneda", "¡Pareja! La moneda y el círculo: los dos son redondos.") },
        { forma: "triangulo", img: "img/sandwich.jpg", emoji: "🥪", label: "Sándwich",
          nombre: A("p09_n_sandwich", "El sándwich de miga."), conf: A("p09_c_sandwich", "¡Pareja! El sándwich de miga y el triángulo: los dos tienen tres puntas.") },
        { forma: "cuadrado", img: "img/galletita.jpg", emoji: "🍪", label: "Galletita",
          nombre: A("p09_n_galletita", "La galletita."), conf: A("p09_c_galletita", "¡Pareja! La galletita y el cuadrado: los dos tienen cuatro lados iguales.") }
      ] },

    /* 10 */
    { tipo: "narracion", titulo: "🎨 Actividad final en tu hoja", escena: "hoja",
      pasos: [
        { texto: "Una hoja A4 y tus lápices", marca: ["hoja", "lapices"],
          audio: A("p10_s0", "Ahora, la actividad final. Vas a necesitar una hoja A4 y tus lápices.") },
        { texto: "Arriba: la fecha", marca: ["fecha"], mostrar: ["fecha"],
          audio: A("p10_s1", "Primero, arriba de todo, escribí la fecha del día.") },
        { texto: "Tu nombre y apellido", marca: ["nombre"], mostrar: ["nombre"],
          audio: A("p10_s2", "Después, escribí tu nombre y apellido.") },
        { texto: "Dibujá las 4 formas", marca: ["formasH"], mostrar: ["formasH"],
          audio: A("p10_s3", "Dibujá las cuatro formas: el cuadrado, el rectángulo, el triángulo y el círculo.") },
        { texto: "Debajo, 2 objetos de cada forma", marca: ["objsH"], mostrar: ["objsH"],
          audio: A("p10_s4", "Debajo de cada forma, dibujá por lo menos dos objetos de tu casa que se le parezcan.") },
        { texto: "¡Foto para la seño!", marca: ["foto"], mostrar: ["foto"],
          audio: A("p10_s5", "Por último, pedile a tu familia que saque una foto de tu hoja y se la envíe a tu seño.") }
      ] },

    /* 11 */
    { tipo: "cierre", img: "img/cierre.jpg", emoji: "🏆",
      audio: A("p11_cierre", "¡Muy bien, detective de formas! Terminaste el juego. Ahora, con tu familia, buscá objetos en casa y hacé la actividad final en tu hoja. ¡Y no te olvides de enviar la foto!") }
  ]
};
