// ============================================================
//  RECTAS, ÁNGULOS Y TRIÁNGULOS — Matemática · 4.° grado
//  Rectas paralelas, perpendiculares y oblicuas; ángulos agudos, rectos y obtusos;
//  triángulos según sus lados y sus ángulos; el prisma rectangular.
//  Las figuras se dibujan por código (motor.js → FIG).
// ============================================================
var DATOS = {
  meta: {
    titulo: "Rectas, ángulos y triángulos",
    subtitulo: "Paralelas, perpendiculares y oblicuas · ángulos agudos, rectos y obtusos · triángulos · el prisma",
    etiqueta: "Matemática · 4.° grado",
    grado: "Matemática · 4.° grado",
    portada: "img/portada.jpg",
    cierreImg: "img/cierre.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    revision: false
  },

  globales: {
    portada: "¡Hola! Hoy vamos a descubrir rectas, ángulos y triángulos. Tocá Comenzar.",
    error: "Mmm, esa no es. Mirá bien el dibujo y probá otra vez.",
    lupaMapa: "Para ver el dibujo bien de cerca, tocá la lupa.",
    lupaImg: "Para ver la imagen bien de cerca, tocá la lupa.",
    cierre: "¡Excelente trabajo! Ya sabés reconocer rectas paralelas, perpendiculares y oblicuas, clasificar ángulos y triángulos, y encontrar las caras, aristas y vértices de un prisma."
  },

  pantallas: [

    // ======================= INTRODUCCIÓN =======================
    {
      id: "intro", tipo: "narracion", img: "img/intro.jpg",
      titulo: "🔍 La geometría está en todos lados",
      inst: "Mirá a tu alrededor: la geometría está en las calles, en las vías del tren y en las cosas que usamos. Escuchá.",
      pasos: [
        { ico: "🛤️", etq: "Rectas", texto: "Las vías del tren, los bordes de una hoja y las calles nos muestran rectas." },
        { ico: "✂️", etq: "Ángulos", texto: "Cuando abrimos una tijera o miramos las agujas del reloj, vemos ángulos." },
        { ico: "🔺", etq: "Triángulos", texto: "Los techos, las señales de tránsito y las escuadras tienen forma de triángulo." },
        { ico: "📦", etq: "Cuerpos", texto: "Una caja de zapatos o un ladrillo tienen forma de prisma." }
      ]
    },

    // ======================= RECTAS =======================
    {
      id: "rectas_ver", tipo: "narracion", modo: "svg", escena: "rectas",
      titulo: "📏 Rectas paralelas, perpendiculares y oblicuas",
      inst: "Mirá cómo pueden ser las rectas. Escuchá.",
      pasos: [
        { x: 25, y: 33, mostrar: "c_recta", texto: "Una recta es una línea que no tiene principio ni fin. Por eso la dibujamos con flechitas en las puntas." },
        { x: 75, y: 33, mostrar: "c_par", texto: "Las rectas paralelas nunca se cortan: siempre están a la misma distancia, como las vías del tren." },
        { x: 25, y: 80, mostrar: "c_perp", texto: "Las rectas perpendiculares se cortan y forman cuatro ángulos rectos, como una cruz. El cuadradito rojo marca el ángulo recto." },
        { x: 75, y: 80, mostrar: "c_obl", texto: "Las rectas oblicuas se cortan, pero sin formar ángulos rectos, como las hojas de una tijera abierta." }
      ]
    },

    {
      id: "rectas_cual", tipo: "trivia", img: "img/intro.jpg",
      titulo: "👀 ¿Cuál es cuál?",
      inst: "Leé cada pregunta y tocá el dibujo que corresponde.",
      preguntas: [
        { q: "¿Cuáles son rectas paralelas?",
          ops: [{ fig: { f: "rectas", tipo: "paralelas", rot: 20 } }, { fig: { f: "rectas", tipo: "perpendiculares", rot: 15 } }, { fig: { f: "rectas", tipo: "oblicuas", rot: -10 } }], ok: 0,
          conf: "¡Muy bien! Estas rectas son paralelas: nunca se cortan." },
        { q: "¿Cuáles son rectas perpendiculares?",
          ops: [{ fig: { f: "rectas", tipo: "perpendiculares", rot: -20 } }, { fig: { f: "rectas", tipo: "oblicuas", rot: 30 } }, { fig: { f: "rectas", tipo: "paralelas", rot: -35 } }], ok: 0,
          conf: "¡Exacto! Se cortan formando ángulos rectos: son perpendiculares." },
        { q: "¿Cuáles son rectas oblicuas?",
          ops: [{ fig: { f: "rectas", tipo: "oblicuas", rot: 5 } }, { fig: { f: "rectas", tipo: "paralelas", rot: 80 } }, { fig: { f: "rectas", tipo: "perpendiculares", rot: 35 } }], ok: 0,
          conf: "¡Correcto! Se cortan, pero sin formar ángulos rectos: son oblicuas." },
        { q: "¿Dónde hay tres rectas paralelas?",
          ops: [{ fig: { f: "rectas", tipo: "paralelas", rot: 0, n: 3 } }, { fig: { f: "rectas", tipo: "oblicuas", rot: 60 } }, { fig: { f: "rectas", tipo: "perpendiculares", rot: 0 } }], ok: 0,
          conf: "¡Muy bien! Son tres rectas que nunca se cortan." }
      ]
    },

    {
      id: "rectas_vida", tipo: "clasificar", img: "img/rectas_ciudad.jpg",
      titulo: "🏙️ Rectas en la vida real",
      inst: "Leé cada tarjeta y tocá cómo son las rectas que se forman.",
      categorias: ["🛤️ Paralelas", "➕ Perpendiculares", "✂️ Oblicuas"],
      items: [
        { t: "Los rieles de las vías del tren", cat: 0, conf: "Los rieles nunca se juntan: son paralelos." },
        { t: "Los renglones del cuaderno", cat: 0 },
        { t: "Las cuerdas de una guitarra", cat: 0 },
        { t: "Dos calles que se cruzan en forma de cruz", cat: 1, conf: "Las calles que se cruzan en cruz forman ángulos rectos: son perpendiculares." },
        { t: "Los dos trazos de la letra T", cat: 1 },
        { t: "Las hojas de una tijera abierta", cat: 2, conf: "Las hojas de la tijera se cruzan sin formar ángulos rectos: son oblicuas." },
        { t: "Los dos trazos de la letra X", cat: 2 }
      ],
      fin: "¡Muy bien! Las rectas paralelas, perpendiculares y oblicuas aparecen en todos lados."
    },

    // ======================= ÁNGULOS =======================
    {
      id: "angulos_ver", tipo: "narracion", modo: "svg", escena: "angulos",
      titulo: "📐 ¿Qué es un ángulo?",
      inst: "Conocé las partes de un ángulo y cómo se clasifican. Escuchá.",
      pasos: [
        { x: 10, y: 84, mostrar: "c_vert", texto: "Un ángulo está formado por dos lados que salen del mismo punto. Ese punto se llama vértice." },
        { x: 40, y: 75, mostrar: "c_lados", texto: "Estas dos semirrectas son los lados del ángulo." },
        { x: 24, y: 64, mostrar: "c_abert", texto: "La abertura entre los lados es el ángulo. Se mide en grados, con el transportador." },
        { x: 72, y: 24, mostrar: "c_agudo", texto: "Si mide menos de noventa grados, es un ángulo agudo." },
        { x: 72, y: 54, mostrar: "c_recto", texto: "Si mide exactamente noventa grados, es un ángulo recto. Lo marcamos con un cuadradito." },
        { x: 72, y: 85, mostrar: "c_obtuso", texto: "Si mide más de noventa grados, es un ángulo obtuso: está más abierto que el recto." }
      ]
    },

    {
      id: "angulos_clasif", tipo: "clasificar", img: "img/angulos_vida.jpg",
      titulo: "📐 Clasificamos seis ángulos",
      inst: "Mirá cada ángulo y tocá si es agudo, recto u obtuso.",
      categorias: ["Agudo", "Recto", "Obtuso"],
      items: [
        { t: "A", fig: { f: "angulo", a: 35, rot: 10 }, cat: 0, conf: "Está poco abierto, menos que un ángulo recto: es agudo." },
        { t: "B", fig: { f: "angulo", a: 60, rot: 100 }, cat: 0, conf: "Es más cerrado que un ángulo recto: es agudo." },
        { t: "C", fig: { f: "angulo", a: 75, rot: -40 }, cat: 0, conf: "Casi llega a ser recto, pero no: es agudo." },
        { t: "D", fig: { f: "angulo", a: 90, rot: 25 }, cat: 1, conf: "Tiene el cuadradito: mide noventa grados, es recto." },
        { t: "E", fig: { f: "angulo", a: 120, rot: 0 }, cat: 2, conf: "Está más abierto que un ángulo recto: es obtuso." },
        { t: "F", fig: { f: "angulo", a: 150, rot: 200 }, cat: 2, conf: "Está muy abierto, más que el recto: es obtuso." }
      ],
      fin: "¡Muy bien! Clasificaste tres ángulos agudos, uno recto y dos obtusos."
    },

    {
      id: "angulos_grados", tipo: "trivia", img: "img/angulos_vida.jpg",
      titulo: "🔢 Ángulos y grados",
      inst: "Mirá el ángulo y cuántos grados mide. Elegí la respuesta correcta.",
      preguntas: [
        { q: "Este ángulo mide 40°. ¿Qué tipo de ángulo es?", fig: { f: "angulo", a: 40, rot: 15, grados: true },
          ops: ["Agudo", "Recto", "Obtuso"], ok: 0, conf: "¡Muy bien! Cuarenta grados es menos que noventa: es agudo." },
        { q: "Este ángulo mide 135°. ¿Qué tipo de ángulo es?", fig: { f: "angulo", a: 135, rot: 10, grados: true },
          ops: ["Agudo", "Recto", "Obtuso"], ok: 2, conf: "¡Exacto! Ciento treinta y cinco grados es más que noventa: es obtuso." },
        { q: "¿Cuántos grados mide un ángulo recto?", fig: { f: "angulo", a: 90, rot: 0 },
          ops: ["90°", "45°", "180°", "100°"], ok: 0, conf: "¡Correcto! El ángulo recto mide noventa grados." },
        { q: "Un ángulo mide 89°. ¿Qué tipo de ángulo es?", fig: { f: "angulo", a: 89, rot: 0, grados: true },
          ops: ["Agudo", "Recto", "Obtuso"], ok: 0, conf: "¡Muy bien! Ochenta y nueve grados es menos que noventa, aunque sea por poquito: es agudo." }
      ]
    },

    {
      id: "relojes", tipo: "trivia", img: "img/angulos_vida.jpg",
      titulo: "⏰ Ángulos en el reloj",
      inst: "Las agujas del reloj forman ángulos. Mirá cada reloj y elegí qué ángulo forman.",
      preguntas: [
        { q: "A las 3 en punto, las agujas forman un ángulo…", fig: { f: "reloj", h: 3 },
          ops: ["Recto", "Agudo", "Obtuso"], ok: 0, conf: "¡Muy bien! A las tres en punto las agujas forman un ángulo recto." },
        { q: "A la 1 en punto, las agujas forman un ángulo…", fig: { f: "reloj", h: 1 },
          ops: ["Agudo", "Recto", "Obtuso"], ok: 0, conf: "¡Exacto! A la una las agujas están muy juntas: forman un ángulo agudo." },
        { q: "A las 5 en punto, las agujas forman un ángulo…", fig: { f: "reloj", h: 5 },
          ops: ["Obtuso", "Agudo", "Recto"], ok: 0, conf: "¡Correcto! A las cinco las agujas están muy abiertas: forman un ángulo obtuso." },
        { q: "A las 9 en punto, las agujas forman un ángulo…", fig: { f: "reloj", h: 9 },
          ops: ["Recto", "Agudo", "Obtuso"], ok: 0, conf: "¡Muy bien! A las nueve en punto también forman un ángulo recto." }
      ]
    },

    // ======================= TRIÁNGULOS =======================
    {
      id: "tri_lados", tipo: "narracion", modo: "svg", escena: "triLados",
      titulo: "🔺 Los triángulos según sus lados",
      inst: "Los triángulos tienen tres lados. Mirá cómo se llaman según sus lados. Escuchá.",
      pasos: [
        { x: 50, y: 10, mostrar: "c_tl0", texto: "Las rayitas naranjas marcan los lados que miden lo mismo." },
        { x: 17, y: 52, mostrar: "c_equi", texto: "El triángulo equilátero tiene sus tres lados iguales." },
        { x: 50, y: 52, mostrar: "c_iso", texto: "El triángulo isósceles tiene dos lados iguales." },
        { x: 83, y: 52, mostrar: "c_esc", texto: "El triángulo escaleno tiene sus tres lados desiguales: todos miden distinto." }
      ]
    },

    {
      id: "tri_angulos", tipo: "narracion", modo: "svg", escena: "triAngulos",
      titulo: "🔺 Los triángulos según sus ángulos",
      inst: "Los triángulos también tienen tres ángulos. Mirá cómo se llaman según sus ángulos. Escuchá.",
      pasos: [
        { x: 17, y: 52, mostrar: "c_rect", texto: "El triángulo rectángulo tiene un ángulo recto." },
        { x: 50, y: 52, mostrar: "c_obt", texto: "El triángulo obtusángulo tiene un ángulo obtuso." },
        { x: 83, y: 52, mostrar: "c_acu", texto: "El triángulo acutángulo tiene sus tres ángulos agudos." }
      ]
    },

    {
      id: "tri_nombres", tipo: "asociar", img: "img/triangulos_vida.jpg",
      titulo: "🧩 El nombre de cada triángulo",
      inst: "Uní cada descripción con el nombre del triángulo. Tocá una tarjeta de la izquierda y después su pareja de la derecha.",
      pares: [
        { a: "Tiene tres lados iguales", b: "Equilátero", conf: "El triángulo que tiene tres lados iguales es equilátero." },
        { a: "Tiene tres lados desiguales", b: "Escaleno", conf: "El triángulo que tiene tres lados desiguales es escaleno." },
        { a: "Tiene un ángulo recto", b: "Rectángulo", conf: "El triángulo que tiene un ángulo recto es rectángulo." },
        { a: "Tiene un ángulo obtuso", b: "Obtusángulo", conf: "El triángulo que tiene un ángulo obtuso es obtusángulo." },
        { a: "Tiene dos lados iguales", b: "Isósceles", conf: "El triángulo que tiene dos lados iguales es isósceles." }
      ]
    },

    {
      id: "tri_clasif_lados", tipo: "clasificar", img: "img/triangulos_vida.jpg",
      titulo: "📏 ¿Cómo son sus lados?",
      inst: "Mirá las medidas de los lados de cada triángulo y tocá cómo se llama.",
      categorias: ["Equilátero", "Isósceles", "Escaleno"],
      items: [
        { t: "1", fig: { f: "tri", tipo: "equilatero", angulos: false }, cat: 0, conf: "Sus tres lados miden seis centímetros: es equilátero." },
        { t: "2", fig: { f: "tri", tipo: "isosceles", angulos: false }, cat: 1, conf: "Tiene dos lados iguales: es isósceles." },
        { t: "3", fig: { f: "tri", tipo: "escaleno", angulos: false }, cat: 2, conf: "Sus lados miden seis, cinco y cuatro centímetros: todos distintos, es escaleno." }
      ],
      fin: "¡Muy bien! Clasificaste los triángulos según sus lados."
    },

    {
      id: "tri_clasif_ang", tipo: "clasificar", img: "img/triangulos_vida.jpg",
      titulo: "📐 ¿Cómo son sus ángulos?",
      inst: "Mirá los ángulos marcados en cada triángulo y tocá cómo se llama.",
      categorias: ["Rectángulo", "Obtusángulo", "Acutángulo"],
      items: [
        { t: "1", fig: { f: "tri", tipo: "rectangulo", lados: false }, cat: 0, conf: "Tiene un ángulo recto, con el cuadradito: es rectángulo." },
        { t: "2", fig: { f: "tri", tipo: "obtusangulo", lados: false }, cat: 1, conf: "Tiene un ángulo muy abierto, obtuso: es obtusángulo." },
        { t: "3", fig: { f: "tri", tipo: "acutangulo", lados: false }, cat: 2, conf: "Sus tres ángulos son agudos: es acutángulo." }
      ],
      fin: "¡Muy bien! Clasificaste los triángulos según sus ángulos."
    },

    {
      id: "tri_vf", tipo: "vf", img: "img/triangulos_vida.jpg",
      titulo: "✅ Verdadero o falso",
      inst: "Leé cada afirmación sobre los triángulos y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "Todos los triángulos tienen tres lados, tres ángulos y tres vértices.", v: true,
          conf: "¡Verdadero! Todo triángulo tiene tres lados, tres ángulos y tres vértices." },
        { t: "Un triángulo isósceles tiene sus tres lados iguales.", v: false,
          conf: "¡Falso! El isósceles tiene dos lados iguales. El de tres lados iguales es el equilátero." },
        { t: "Un triángulo rectángulo tiene un ángulo de 90°.", v: true,
          conf: "¡Verdadero! El triángulo rectángulo tiene un ángulo recto, que mide noventa grados." },
        { t: "En un triángulo escaleno todos los lados miden distinto.", v: true,
          conf: "¡Verdadero! El escaleno tiene sus tres lados desiguales." },
        { t: "Un triángulo obtusángulo tiene sus tres ángulos obtusos.", v: false,
          conf: "¡Falso! El obtusángulo tiene un solo ángulo obtuso; los otros dos son agudos." }
      ]
    },

    // ======================= EL PRISMA =======================
    {
      id: "prisma_ver", tipo: "narracion", modo: "svg", escena: "prisma",
      titulo: "📦 El prisma rectangular",
      inst: "Una caja de zapatos tiene forma de prisma rectangular. Conocé sus partes. Escuchá.",
      pasos: [
        { x: 27, y: 62, mostrar: "c_cara", texto: "Cada superficie plana es una cara. El prisma rectangular tiene seis caras con forma de rectángulo." },
        { x: 27, y: 33, mostrar: "c_arista", texto: "La línea donde se juntan dos caras es una arista. Tiene doce aristas." },
        { x: 46, y: 30, mostrar: "c_vert", texto: "El punto donde se juntan tres aristas es un vértice. Tiene ocho vértices." },
        { x: 50, y: 88, mostrar: "c_cuenta", texto: "En resumen: seis caras, doce aristas y ocho vértices. Las líneas punteadas son las aristas que no se ven desde adelante." },
        { x: 82, y: 50, mostrar: "c_curva", texto: "Todas las caras del prisma son planas. En cambio, una pelota o una lata tienen superficie curva: pueden rodar." }
      ]
    },

    {
      id: "prisma_tocar", tipo: "mapa", escena: "prismaTocar", ancho: true, enOrden: true,
      titulo: "👆 Encontrá las partes del prisma",
      inst: "Leé cada tarjeta y tocá esa parte en el prisma.",
      items: [
        { t: "La cara de adelante", cat: 0, conf: "¡Muy bien! Esa es la cara de adelante, un rectángulo." },
        { t: "La cara de arriba", cat: 1 },
        { t: "La cara del costado", cat: 2 },
        { t: "Una arista", cat: 3, conf: "¡Exacto! Una arista es la línea donde se juntan dos caras." },
        { t: "Un vértice", cat: 4, conf: "¡Correcto! Un vértice es el punto donde se juntan las aristas." }
      ],
      fin: "¡Muy bien! Encontraste caras, aristas y vértices del prisma."
    },

    {
      id: "prisma_trivia", tipo: "trivia", img: "img/prisma_vida.jpg",
      titulo: "🔢 Contamos en el prisma",
      inst: "Mirá el prisma rectangular y respondé.",
      preguntas: [
        { q: "¿Cuántas caras tiene un prisma rectangular?", fig: { f: "prisma" }, ops: ["6", "4", "8", "12"], ok: 0,
          conf: "¡Muy bien! Tiene seis caras: adelante, atrás, arriba, abajo y los dos costados." },
        { q: "¿Cuántas aristas tiene?", fig: { f: "prisma" }, ops: ["12", "6", "8", "10"], ok: 0,
          conf: "¡Exacto! Tiene doce aristas: cuatro adelante, cuatro atrás y cuatro que las unen." },
        { q: "¿Cuántos vértices tiene?", fig: { f: "prisma" }, ops: ["8", "6", "12", "4"], ok: 0,
          conf: "¡Correcto! Tiene ocho vértices: cuatro adelante y cuatro atrás." },
        { q: "La superficie del prisma rectangular, ¿es plana o curva?", fig: { f: "prisma" }, ops: ["Plana", "Curva"], ok: 0,
          conf: "¡Muy bien! Todas sus caras son planas, por eso no rueda." }
      ]
    },

    {
      id: "plana_curva", tipo: "clasificar", img: "img/prisma_vida.jpg",
      titulo: "⚽ ¿Plana o curva?",
      inst: "Mirá cada objeto y tocá si tiene solo superficies planas o si tiene superficie curva.",
      categorias: ["▭ Solo superficies planas", "◯ Tiene superficie curva"],
      items: [
        { t: "Una caja de zapatos", fig: { f: "cuerpo", tipo: "caja" }, decir: "Una caja de zapatos.", cat: 0 },
        { t: "Un dado", fig: { f: "cuerpo", tipo: "dado" }, decir: "Un dado.", cat: 0 },
        { t: "Un ladrillo", fig: { f: "cuerpo", tipo: "ladrillo" }, decir: "Un ladrillo.", cat: 0 },
        { t: "Una pelota", fig: { f: "cuerpo", tipo: "esfera" }, decir: "Una pelota.", cat: 1, conf: "La pelota tiene superficie curva: por eso rueda." },
        { t: "Una lata", fig: { f: "cuerpo", tipo: "cilindro" }, decir: "Una lata.", cat: 1, conf: "La lata tiene una superficie curva alrededor: si la acostás, rueda." },
        { t: "Un cucurucho", fig: { f: "cuerpo", tipo: "cono" }, decir: "Un cucurucho.", cat: 1 }
      ],
      fin: "¡Muy bien! Los prismas tienen solo caras planas; la pelota, la lata y el cucurucho tienen superficie curva."
    },

    // ======================= REPASO =======================
    {
      id: "sopa", tipo: "sopa", img: "img/portada.jpg", tam: 10,
      titulo: "🔤 Sopa de letras",
      inst: "Buscá ocho palabras de geometría. Tocá la primera letra y después la última.",
      palabras: [
        { w: "RECTA", decir: "Recta" }, { w: "PARALELA", decir: "Paralela" }, { w: "OBLICUA", decir: "Oblicua" },
        { w: "AGUDO", decir: "Agudo" }, { w: "OBTUSO", decir: "Obtuso" }, { w: "VERTICE", decir: "Vértice" },
        { w: "ARISTA", decir: "Arista" }, { w: "PRISMA", decir: "Prisma" }
      ],
      fin: "¡Encontraste todas las palabras de geometría!"
    },

    {
      id: "desafio", tipo: "trivia", img: "img/portada.jpg",
      titulo: "🏆 Desafío final",
      inst: "Llegó el desafío final. Respondé cinco preguntas de geometría.",
      preguntas: [
        { q: "Dos rectas que nunca se cortan son…", ops: ["Paralelas", "Perpendiculares", "Oblicuas"], ok: 0,
          conf: "¡Muy bien! Las paralelas nunca se cortan." },
        { q: "¿Qué ángulo se marca con un cuadradito?", ops: ["El recto", "El agudo", "El obtuso"], ok: 0,
          conf: "¡Exacto! El cuadradito marca el ángulo recto, de noventa grados." },
        { q: "¿Cómo se llama este triángulo?", fig: { f: "tri", tipo: "isosceles", angulos: false }, ops: ["Isósceles", "Equilátero", "Escaleno"], ok: 0,
          conf: "¡Correcto! Tiene dos lados iguales: es isósceles." },
        { q: "¿Qué tipo de ángulo es este?", fig: { f: "angulo", a: 110, rot: 30 }, ops: ["Obtuso", "Agudo", "Recto"], ok: 0,
          conf: "¡Muy bien! Está más abierto que el recto: es obtuso." },
        { q: "¿Cuántos vértices tiene un prisma rectangular?", fig: { f: "prisma" }, ops: ["8", "6", "12", "4"], ok: 0,
          conf: "¡Excelente! El prisma rectangular tiene ocho vértices." }
      ]
    }
  ]
};
if (typeof module !== "undefined") module.exports = DATOS;
