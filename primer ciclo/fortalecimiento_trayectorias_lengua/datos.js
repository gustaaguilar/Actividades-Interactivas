/* ============================================================
   FORTALECIMIENTO DE TRAYECTORIAS - Bloque 1
   Grafomotricidad, vocales y números (páginas 1 a 10)
   Profe Gustavo Aguilar - QueSepanTodos.com
   ============================================================ */

const DATOS = {
  titulo: "Fortalecimiento de Trayectorias",
  subtitulo: "Grafomotricidad, vocales y números",
  contacto: "profegustaaguilar@gmail.com",
  fotoPerfil: "assets/images/profe.jpg",
  tagline: "Menos prisa, más vida 🧉🫂",

  pantallas: [
    // 1 ---------------------------------------------------------
    {
      id: "s01", tipo: "portada",
      titulo: "Fortalecimiento de Trayectorias",
      bajada: "Aprestamiento: trazos, vocales y números",
      audio: "audio/s01_bienvenida.mp3",
      textoAudio: "¡Hola! Bienvenido a nuestro juego de trazos, letras y números. Vamos a jugar juntos, con calma y sin apuro. Tocá el botón para comenzar."
    },

    // 1b --------------------------------------------------------
    {
      id: "s01b", tipo: "selectorTipoLetra",
      titulo: "¿Con qué tipo de letra querés practicar?",
      instruccion: "Elegí una opción para empezar.",
      audio: "audio/s01b_instruccion.mp3",
      textoAudio: "Elegí con qué tipo de letra querés practicar hoy: imprenta mayúscula, imprenta minúscula, o cursiva.",
      opciones: [
        { tipo: "mayuscula", nombre: "Imprenta MAYÚSCULA", ejemplo: "A", audio: "audio/s01b_mayuscula.mp3" },
        { tipo: "minuscula", nombre: "Imprenta minúscula", ejemplo: "a", audio: "audio/s01b_minuscula.mp3" },
        { tipo: "cursiva", nombre: "Cursiva minúscula", ejemplo: "a", audio: "audio/s01b_cursiva.mp3" },
        { tipo: "cursivaMayuscula", nombre: "Cursiva MAYÚSCULA", ejemplo: "A", audio: "audio/s01b_cursivaMayuscula.mp3" }
      ]
    },

    // 2 ---------------------------------------------------------
    {
      id: "s02", tipo: "trazo",
      titulo: "Dibujamos con el dedo en el aire… y ahora trazamos",
      instruccion: "Apoyá el lápiz en la pantalla y seguí el caminito punteado, despacito, de punta a punta.",
      audio: "audio/s02_instruccion.mp3",
      libre: false,
      caminos: [
        { patron: "onda", seed: 1, icono: "〰️" },
        { patron: "zigzag", seed: 2, icono: "⚡" },
        { patron: "bucle", seed: 1, icono: "🌀" }
      ]
    },

    // 3 ---------------------------------------------------------
    {
      id: "s03", tipo: "trazo",
      titulo: "Las bicicletas van a la llegada",
      instruccion: "Cada bicicleta quiere llegar a la meta. Trazá el camino sin levantar el lápiz.",
      audio: "audio/s03_instruccion.mp3",
      libre: false,
      caminos: [
        { patron: "onda", seed: 3, icono: "🚲", img: "bicicleta", iconoFin: "🏁", imgFin: "bandera_llegada" },
        { patron: "camino", seed: 2, icono: "🚲", img: "bicicleta", iconoFin: "🏁", imgFin: "bandera_llegada" },
        { patron: "zigzag", seed: 1, icono: "🚲", img: "bicicleta", iconoFin: "🏁", imgFin: "bandera_llegada" }
      ]
    },

    // 4 ---------------------------------------------------------
    {
      id: "s04", tipo: "trazo",
      titulo: "Los animalitos van a su amigo",
      instruccion: "Ayudá a cada animalito a encontrar el camino hasta su amigo.",
      audio: "audio/s04_instruccion.mp3",
      libre: false,
      caminos: [
        { patron: "camino", seed: 4, icono: "🐝", img: "abeja", iconoFin: "🌼", imgFin: "flor_amarilla" },
        { patron: "bucle", seed: 2, icono: "🦔", img: "erizo", iconoFin: "🍄", imgFin: "hongo" },
        { patron: "onda", seed: 5, icono: "🦋", img: "mariposa", iconoFin: "🌸", imgFin: "flor_rosa" }
      ]
    },

    // 5 ---------------------------------------------------------
    {
      id: "s05", tipo: "trazo",
      titulo: "El camino de Klofky",
      instruccion: "La arañita Klofky quiere llegar a su telaraña. Seguí el camino punteado hasta el final.",
      audio: "audio/s05_instruccion.mp3",
      libre: false,
      caminos: [
        { patron: "camino", seed: 7, icono: "🕷️", img: "arana", iconoFin: "🕸️", imgFin: "telarana", largo: true }
      ]
    },

    // 6 ---------------------------------------------------------
    {
      id: "s06", tipo: "clasificar",
      titulo: "Palabras cortas y palabras largas",
      instruccion: "Tocá cada palabra y despues tocá la casa que le corresponde: la del gusano chiquito si es corta, o la del gusano grande si es larga.",
      audio: "audio/s06_instruccion.mp3",
      cajaA: { nombre: "Palabra corta", icono: "🐛", img: "casa_pequena", audio: "audio/s06_casa_chica.mp3" },
      cajaB: { nombre: "Palabra larga", icono: "🐛🐛🐛", img: "casa_grande", audio: "audio/s06_casa_grande.mp3" },
      items: [
        { texto: "SOL", grupo: "A", audio: "audio/s06_sol.mp3" },
        { texto: "PEZ", grupo: "A", audio: "audio/s06_pez.mp3" },
        { texto: "PAN", grupo: "A", audio: "audio/s06_pan.mp3" },
        { texto: "TREN", grupo: "A", audio: "audio/s06_tren.mp3" },
        { texto: "MARIPOSA", grupo: "B", audio: "audio/s06_mariposa.mp3" },
        { texto: "ELEFANTE", grupo: "B", audio: "audio/s06_elefante.mp3" },
        { texto: "COCODRILO", grupo: "B", audio: "audio/s06_cocodrilo.mp3" },
        { texto: "CARACOL", grupo: "B", audio: "audio/s06_caracol.mp3" }
      ]
    },

    // 7 ---------------------------------------------------------
    {
      id: "s07", tipo: "trazo",
      titulo: "Practicá tu nombre",
      instruccion: "En el renglón de abajo, escribí tu nombre con el lápiz tantas veces como quieras. Cuando termines, tocá 'Ya practiqué'.",
      audio: "audio/s07_instruccion.mp3",
      libre: true,
      caminos: [
        { puntos: [[8,30],[92,30]] },
        { puntos: [[8,55],[92,55]] },
        { puntos: [[8,80],[92,80]] }
      ]
    },

    // 8 ---------------------------------------------------------
    {
      id: "s08", tipo: "seleccionar",
      titulo: "Encontramos las letras",
      instruccion: "En el dibujo hay letras y números mezclados. Tocá solamente las letras.",
      audio: "audio/s08_instruccion.mp3",
      disposicion: "dispersa",
      items: [
        { texto: "A", correcto: true, audio: "audio/s08_a.mp3" },
        { texto: "1", correcto: false, audio: "audio/s08_uno.mp3" },
        { texto: "R", correcto: true, audio: "audio/s08_r.mp3" },
        { texto: "2", correcto: false, audio: "audio/s08_dos.mp3" },
        { texto: "M", correcto: true, audio: "audio/s08_m.mp3" },
        { texto: "3", correcto: false, audio: "audio/s08_tres.mp3" },
        { texto: "S", correcto: true, audio: "audio/s08_s.mp3" },
        { texto: "4", correcto: false, audio: "audio/s08_cuatro.mp3" },
        { texto: "E", correcto: true, audio: "audio/s08_e.mp3" },
        { texto: "5", correcto: false, audio: "audio/s08_cinco.mp3" },
        { texto: "T", correcto: true, audio: "audio/s08_t.mp3" },
        { texto: "6", correcto: false, audio: "audio/s08_seis.mp3" },
        { texto: "L", correcto: true, audio: "audio/s08_l.mp3" },
        { texto: "7", correcto: false, audio: "audio/s08_siete.mp3" },
        { texto: "N", correcto: true, audio: "audio/s08_n.mp3" },
        { texto: "8", correcto: false, audio: "audio/s08_ocho.mp3" }
      ]
    },

    // 9 ---------------------------------------------------------
    {
      id: "s09", tipo: "asociar",
      titulo: "Las vocales y sus dibujos",
      instruccion: "Tocá una vocal y despues el dibujo que le corresponde.",
      audio: "audio/s09_instruccion.mp3",
      pares: [
        { izq: "A", izqAudio: "audio/s09_vocal_a.mp3", der: "avión", derIcono: "✈️", derImg: "avion", derAudio: "audio/s09_avion.mp3" },
        { izq: "E", izqAudio: "audio/s09_vocal_e.mp3", der: "estrella", derIcono: "⭐", derImg: "estrella", derAudio: "audio/s09_estrella.mp3" },
        { izq: "I", izqAudio: "audio/s09_vocal_i.mp3", der: "iglesia", derIcono: "⛪", derImg: "iglesia", derAudio: "audio/s09_iglesia.mp3" },
        { izq: "O", izqAudio: "audio/s09_vocal_o.mp3", der: "oveja", derIcono: "🐑", derImg: "oveja", derAudio: "audio/s09_oveja.mp3" },
        { izq: "U", izqAudio: "audio/s09_vocal_u.mp3", der: "uvas", derIcono: "🍇", derImg: "uvas", derAudio: "audio/s09_uvas.mp3" }
      ]
    },

    // 10 --------------------------------------------------------
    {
      id: "s10", tipo: "narracionDividida",
      titulo: "La vocal A",
      audio: "audio/s10_completo.mp3",
      fragmentos: [
        { texto: "A, a, a, la araña.", audioFrag: "audio/s10_f1.mp3", icono: "🕷️", img: "arana", resaltar: "araña" },
        { texto: "A de avión.", audioFrag: "audio/s10_f2.mp3", icono: "✈️", img: "avion", resaltar: "avión" },
        { texto: "A de piña.", audioFrag: "audio/s10_f3.mp3", icono: "🍍", img: "pina", resaltar: "piña" },
        { texto: "A de arpa.", audioFrag: "audio/s10_f4.mp3", icono: "🎼", img: "arpa", resaltar: "arpa" },
        { texto: "A de ancla.", audioFrag: "audio/s10_f5.mp3", icono: "⚓", img: "ancla", resaltar: "ancla" },
        { texto: "A de alas.", audioFrag: "audio/s10_f6.mp3", icono: "🪽", img: "alas", resaltar: "alas" }
      ],
      gesto: "Superponemos el dedo índice de una mano con el pulgar de la otra, y repetimos esa posición subiendo de a poquito, como si trepáramos con las patitas de la araña."
    },

    // 11 --------------------------------------------------------
    {
      id: "s11", tipo: "seleccionar",
      titulo: "¿Qué empieza con A?",
      instruccion: "Tocá solamente los dibujos que empiezan con la vocal A.",
      audio: "audio/s11_instruccion.mp3",
      items: [
        { texto: "avión", icono: "✈️", img: "avion", correcto: true, audio: "audio/s11_avion.mp3" },
        { texto: "pelota", icono: "⚽", img: "pelota", correcto: false, audio: "audio/s11_pelota.mp3" },
        { texto: "araña", icono: "🕷️", img: "arana", correcto: true, audio: "audio/s11_arana.mp3" },
        { texto: "sol", icono: "☀️", img: "sol", correcto: false, audio: "audio/s11_sol.mp3" },
        { texto: "anillo", icono: "💍", img: "anillo", correcto: true, audio: "audio/s11_anillo.mp3" },
        { texto: "mesa", icono: "🪑", img: "mesa", correcto: false, audio: "audio/s11_mesa.mp3" }
      ]
    },

    // 12a -------------------------------------------------------
    {
      id: "s12demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la A",
      instruccion: "Prestá atención al dedito: te muestra cómo se dibuja la letra A.",
      audio: "audio/s12demo_narracion.mp3",
      textoAudio: "Para escribir la A, primero bajamos una rayita inclinada hacia un lado. Después subimos con otra rayita inclinada hacia el otro lado, hasta arriba de todo. Y por último, cruzamos las dos rayitas con una línea en el medio.",
      fondoLetra: "A",
      camino: {
        segmentos: [
          { puntos: [[25,88],[50,15],[75,88]] },
          { puntos: [[35,58],[65,58]] }
        ]
      }
    },

    // 12 --------------------------------------------------------
    {
      id: "s12", tipo: "trazo",
      titulo: "Trazamos la letra A",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la A, despacito.",
      audio: "audio/s12_instruccion.mp3",
      libre: false,
      fondoLetra: "A",
      caminos: [
        {
          segmentos: [
            { puntos: [[25,88],[50,15],[75,88]] },
            { puntos: [[35,58],[65,58]] }
          ]
        }
      ]
    },

    // 13 --------------------------------------------------------
    {
      id: "s13", tipo: "narracionDividida",
      titulo: "La vocal E",
      audio: "audio/s13_completo.mp3",
      fragmentos: [
        { texto: "E, e, e, elefante.", audioFrag: "audio/s13_f1.mp3", icono: "🐘", img: "elefante", resaltar: "elefante" },
        { texto: "E de empanada.", audioFrag: "audio/s13_f2.mp3", icono: "🥟", img: "empanada", resaltar: "empanada" },
        { texto: "E de escalera.", audioFrag: "audio/s13_f3.mp3", icono: "🪜", img: "escalera", resaltar: "escalera" },
        { texto: "E de espada.", audioFrag: "audio/s13_f4.mp3", icono: "🗡️", img: "espada", resaltar: "espada" },
        { texto: "E de estrella.", audioFrag: "audio/s13_f5.mp3", icono: "⭐", img: "estrella", resaltar: "estrella" }
      ],
      gesto: "Ponemos el brazo delante de la nariz, como la trompa del elefante."
    },

    // 14 --------------------------------------------------------
    {
      id: "s14", tipo: "seleccionar",
      titulo: "¿Qué empieza con E?",
      instruccion: "Tocá solamente los dibujos que empiezan con la vocal E.",
      audio: "audio/s14_instruccion.mp3",
      items: [
        { texto: "estrella", icono: "⭐", img: "estrella", correcto: true, audio: "audio/s14_estrella.mp3" },
        { texto: "león", icono: "🦁", img: "leon", correcto: false, audio: "audio/s14_leon.mp3" },
        { texto: "escalera", icono: "🪜", img: "escalera", correcto: true, audio: "audio/s14_escalera.mp3" },
        { texto: "espada", icono: "🗡️", img: "espada", correcto: true, audio: "audio/s14_espada.mp3" },
        { texto: "pez", icono: "🐟", img: "pez", correcto: false, audio: "audio/s14_pez.mp3" }
      ]
    },

    // 15a -------------------------------------------------------
    {
      id: "s15demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la E",
      instruccion: "Prestá atención al dedito: te muestra cómo se dibuja la letra E.",
      audio: "audio/s15demo_narracion.mp3",
      textoAudio: "Para escribir la E, primero bajamos una rayita derecha, de arriba hacia abajo. Después le agregamos una rayita horizontal arriba, otra en el medio, y otra abajo.",
      fondoLetra: "E",
      camino: {
        segmentos: [
          { puntos: [[30,15],[30,88]] },
          { puntos: [[30,15],[70,15]] },
          { puntos: [[30,50],[62,50]] },
          { puntos: [[30,88],[70,88]] }
        ]
      }
    },

    // 15 --------------------------------------------------------
    {
      id: "s15", tipo: "trazo",
      titulo: "Trazamos la letra E",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la E, despacito.",
      audio: "audio/s15_instruccion.mp3",
      libre: false,
      fondoLetra: "E",
      caminos: [
        {
          segmentos: [
            { puntos: [[30,15],[30,88]] },
            { puntos: [[30,15],[70,15]] },
            { puntos: [[30,50],[62,50]] },
            { puntos: [[30,88],[70,88]] }
          ]
        }
      ]
    },

    // 16 --------------------------------------------------------
    {
      id: "s16", tipo: "narracionDividida",
      titulo: "La vocal I",
      audio: "audio/s16_completo.mp3",
      fragmentos: [
        { texto: "I, i, i, iguana.", audioFrag: "audio/s16_f1.mp3", icono: "🦎", img: "iguana", resaltar: "iguana" },
        { texto: "I de isla.", audioFrag: "audio/s16_f2.mp3", icono: "🏝️", img: "isla", resaltar: "isla" },
        { texto: "I de imán.", audioFrag: "audio/s16_f4.mp3", icono: "🧲", img: "iman", resaltar: "imán" },
        { texto: "I de iglesia.", audioFrag: "audio/s16_f3.mp3", icono: "⛪", img: "iglesia", resaltar: "iglesia" }
      ],
      gesto: "Golpeamos suave la cabeza y deslizamos la mano como la cola de la iguana."
    },

    // 16b -------------------------------------------------------
    {
      id: "s16demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la I",
      instruccion: "Prestá atención al dedito: te muestra cómo se dibuja la letra I.",
      audio: "audio/s16demo_narracion.mp3",
      textoAudio: "Para escribir la I, bajamos una sola rayita derecha, de arriba hacia abajo, despacito.",
      fondoLetra: "I",
      camino: { puntos: [[50,15],[50,88]] }
    },

    // 17 --------------------------------------------------------
    {
      id: "s17", tipo: "trazo",
      titulo: "Trazamos la letra I",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la I, despacito.",
      audio: "audio/s17_instruccion.mp3",
      libre: false,
      fondoLetra: "I",
      caminos: [
        { puntos: [[50,15],[50,88]] }
      ]
    },

    // 17b (narración O) -------------------------------------------
    {
      id: "s17o", tipo: "narracionDividida",
      titulo: "La vocal O",
      audio: "audio/s17o_completo.mp3",
      fragmentos: [
        { texto: "O, o, o, oso.", audioFrag: "audio/s17o_f1.mp3", icono: "🐻", img: "oso", resaltar: "oso" },
        { texto: "O de ojo.", audioFrag: "audio/s17o_f2.mp3", icono: "👁️", img: "ojo", resaltar: "ojo" },
        { texto: "O de oveja.", audioFrag: "audio/s17o_f3.mp3", icono: "🐑", img: "oveja", resaltar: "oveja" },
        { texto: "O de olla.", audioFrag: "audio/s17o_f4.mp3", icono: "🍲", img: "olla", resaltar: "olla" }
      ],
      gesto: "Hacemos un círculo grande con los brazos, como la forma de la O."
    },

    // 17c (demo O) --------------------------------------------------
    {
      id: "s17odemo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la O",
      instruccion: "Prestá atención al dedito: te muestra cómo se dibuja la letra O.",
      audio: "audio/s17odemo_narracion.mp3",
      textoAudio: "Para escribir la O, hacemos una vuelta redonda, como un círculo, sin levantar el lápiz.",
      fondoLetra: "O",
      camino: { puntos: [[30,50],[30,25],[70,25],[70,50],[70,75],[30,75],[30,50]] }
    },

    // 17d (trazo O) --------------------------------------------------
    {
      id: "s17otrazo", tipo: "trazo",
      titulo: "Trazamos la letra O",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la O, despacito.",
      audio: "audio/s17otrazo_instruccion.mp3",
      libre: false,
      fondoLetra: "O",
      caminos: [
        { puntos: [[30,50],[30,25],[70,25],[70,50],[70,75],[30,75],[30,50]] }
      ]
    },

    // 18 --------------------------------------------------------
    {
      id: "s18", tipo: "narracionDividida",
      titulo: "La vocal U",
      audio: "audio/s18_completo.mp3",
      fragmentos: [
        { texto: "U, u, u, urraca.", audioFrag: "audio/s18_f1.mp3", icono: "🐦", img: "urraca", resaltar: "urraca" },
        { texto: "U de uvas.", audioFrag: "audio/s18_f2.mp3", icono: "🍇", img: "uvas", resaltar: "uvas" },
        { texto: "U de unicornio.", audioFrag: "audio/s18_f3.mp3", icono: "🦄", img: "unicornio", resaltar: "unicornio" }
      ],
      gesto: "Nos agarramos la cabeza y la movemos hacia los dos lados."
    },

    // 18b -------------------------------------------------------
    {
      id: "s18demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la U",
      instruccion: "Prestá atención al dedito: te muestra cómo se dibuja la letra U.",
      audio: "audio/s18demo_narracion.mp3",
      textoAudio: "Para escribir la U, bajamos derecho, hacemos una curva suave abajo, y subimos derecho del otro lado.",
      fondoLetra: "U",
      camino: { puntos: [[30,15],[30,60],[38,82],[50,88],[62,82],[70,60],[70,15]] }
    },

    // 19 --------------------------------------------------------
    {
      id: "s19", tipo: "trazo",
      titulo: "Trazamos la letra U",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la U, despacito.",
      audio: "audio/s19_instruccion.mp3",
      libre: false,
      fondoLetra: "U",
      caminos: [
        { puntos: [[30,15],[30,60],[38,82],[50,88],[62,82],[70,60],[70,15]] }
      ]
    },

    // 20 --------------------------------------------------------
    {
      id: "s20", tipo: "trazo",
      titulo: "Repasamos las cinco vocales",
      instruccion: "Trazá cada vocal siguiendo el puntito, de a una.",
      audio: "audio/s20_instruccion.mp3",
      libre: false,
      secuencial: true,
      caminos: [
        { letra: "a", segmentos: [ { puntos: [[25,88],[50,15],[75,88]] }, { puntos: [[35,58],[65,58]] } ] },
        { letra: "e", segmentos: [ { puntos: [[30,15],[30,88]] }, { puntos: [[30,15],[70,15]] }, { puntos: [[30,50],[62,50]] }, { puntos: [[30,88],[70,88]] } ] },
        { puntos: [[50,20],[50,80]], letra: "i" },
        { puntos: [[30,50],[30,25],[70,25],[70,50],[70,75],[30,75],[30,50]], letra: "o" },
        { puntos: [[25,20],[25,60],[35,80],[50,85],[65,80],[70,60],[70,20]], letra: "u" }
      ]
    },

        // ==================================================================
    // NUEVO: trazado en imprenta minúscula y cursiva/manuscrita para las
    // 5 vocales. Usadas por el selector de tipo de letra (s01b) en vez
    // de s12demo/s12/s15demo/s15/s16demo/s17/s17odemo/s17otrazo/s18demo/s19/s20
    // cuando el chico elige "minúscula" o "cursiva".
    // ==================================================================

    // --- a minúscula imprenta ---------------------------------------
    {
      id: "smin_a_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la a minúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la a minúscula.",
      audio: "audio/smin_a_demo_narracion.mp3",
      textoAudio: "Para escribir la a minúscula, primero dibujamos un círculo, como una pancita. Después bajamos una rayita derecha, pegadita al círculo.",
      fondoLetra: "a",
      camino: {
        segmentos: [
          { puntos: [[40.0,53.0],[42.9,53.4],[45.6,54.5],[48.1,56.3],[50.2,58.6],[51.7,61.5],[52.7,64.7],[53.0,68.0],[52.7,71.3],[51.7,74.5],[50.2,77.4],[48.1,79.7],[45.6,81.5],[42.9,82.6],[40.0,83.0],[37.1,82.6],[34.4,81.5],[31.9,79.7],[29.8,77.4],[28.3,74.5],[27.3,71.3],[27.0,68.0],[27.3,64.7],[28.3,61.5],[29.8,58.6],[31.9,56.3],[34.4,54.5],[37.1,53.4],[40.0,53.0]] },
          { puntos: [[52,55],[52,83]] }
        ]
      }
    },
    {
      id: "smin_a_trazo", tipo: "trazo",
      titulo: "Trazamos la a minúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la a minúscula, despacito.",
      audio: "audio/smin_a_instruccion.mp3",
      libre: false,
      fondoLetra: "a",
      caminos: [
        { segmentos: [
          { puntos: [[40.0,53.0],[42.9,53.4],[45.6,54.5],[48.1,56.3],[50.2,58.6],[51.7,61.5],[52.7,64.7],[53.0,68.0],[52.7,71.3],[51.7,74.5],[50.2,77.4],[48.1,79.7],[45.6,81.5],[42.9,82.6],[40.0,83.0],[37.1,82.6],[34.4,81.5],[31.9,79.7],[29.8,77.4],[28.3,74.5],[27.3,71.3],[27.0,68.0],[27.3,64.7],[28.3,61.5],[29.8,58.6],[31.9,56.3],[34.4,54.5],[37.1,53.4],[40.0,53.0]] },
          { puntos: [[52,55],[52,83]] }
        ] }
      ]
    },

    // --- a cursiva (manuscrita ligada) --------------------------------
    {
      id: "scur_a_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la a cursiva",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la a cursiva (letra ligada).",
      audio: "audio/scur_a_demo_narracion.mp3",
      textoAudio: "En cursiva, la a se escribe sin levantar el lápiz: entramos con una rayita, hacemos la pancita redonda, y salimos con una colita hacia el costado, para poder unirla con la próxima letra.",
      fondoLetra: "a",
      camino: { puntos: [[26,82],[36,58],[39.0,54.1],[42.0,54.2],[44.8,55.2],[47.4,57.0],[49.5,59.5],[51.0,62.5],[51.9,65.9],[51.9,69.4],[51.3,72.8],[49.9,75.9],[47.9,78.5],[45.4,80.5],[42.6,81.7],[39.6,82.0],[36.6,81.4],[33.9,80.0],[31.5,77.9],[29.7,75.1],[28.5,71.9],[28.0,68.5],[28.3,65.0],[29.3,61.7],[31.0,58.8],[33.2,56.4],[35.9,54.8],[52,50],[52,83],[60,80]] }
    },
    {
      id: "scur_a_trazo", tipo: "trazo",
      titulo: "Trazamos la a cursiva",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la a cursiva, despacito y sin levantar el lápiz.",
      audio: "audio/scur_a_instruccion.mp3",
      libre: false,
      fondoLetra: "a",
      caminos: [
        { puntos: [[26,82],[36,58],[39.0,54.1],[42.0,54.2],[44.8,55.2],[47.4,57.0],[49.5,59.5],[51.0,62.5],[51.9,65.9],[51.9,69.4],[51.3,72.8],[49.9,75.9],[47.9,78.5],[45.4,80.5],[42.6,81.7],[39.6,82.0],[36.6,81.4],[33.9,80.0],[31.5,77.9],[29.7,75.1],[28.5,71.9],[28.0,68.5],[28.3,65.0],[29.3,61.7],[31.0,58.8],[33.2,56.4],[35.9,54.8],[52,50],[52,83],[60,80]] }
      ]
    },

    // --- e minúscula imprenta ---------------------------------------
    {
      id: "smin_e_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la e minúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la e minúscula.",
      audio: "audio/smin_e_demo_narracion.mp3",
      textoAudio: "Para escribir la e minúscula, hacemos una vuelta redonda dejando una aberturita, y la cruzamos con una rayita en el medio.",
      fondoLetra: "e",
      camino: {
        segmentos: [
          { puntos: [[59.8,68.8],[59.0,71.6],[57.8,74.3],[56.1,76.7],[54.1,78.7],[51.7,80.3],[49.1,81.4],[46.4,81.9],[43.6,81.9],[40.9,81.4],[38.3,80.3],[35.9,78.7],[33.9,76.7],[32.2,74.3],[31.0,71.6],[30.2,68.8],[30.0,65.8],[30.3,62.9],[31.1,60.0],[32.4,57.4],[34.1,55.0],[36.2,53.1],[38.6,51.5],[41.2,50.5],[44.0,50.0],[46.7,50.1],[49.5,50.7],[52.0,51.9],[54.4,53.5],[56.4,55.6],[58.0,58.0]] },
          { puntos: [[30,66],[58,66]] }
        ]
      }
    },
    {
      id: "smin_e_trazo", tipo: "trazo",
      titulo: "Trazamos la e minúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la e minúscula, despacito.",
      audio: "audio/smin_e_instruccion.mp3",
      libre: false,
      fondoLetra: "e",
      caminos: [
        { segmentos: [
          { puntos: [[59.8,68.8],[59.0,71.6],[57.8,74.3],[56.1,76.7],[54.1,78.7],[51.7,80.3],[49.1,81.4],[46.4,81.9],[43.6,81.9],[40.9,81.4],[38.3,80.3],[35.9,78.7],[33.9,76.7],[32.2,74.3],[31.0,71.6],[30.2,68.8],[30.0,65.8],[30.3,62.9],[31.1,60.0],[32.4,57.4],[34.1,55.0],[36.2,53.1],[38.6,51.5],[41.2,50.5],[44.0,50.0],[46.7,50.1],[49.5,50.7],[52.0,51.9],[54.4,53.5],[56.4,55.6],[58.0,58.0]] },
          { puntos: [[30,66],[58,66]] }
        ] }
      ]
    },

    // --- e cursiva (manuscrita ligada) --------------------------------
    {
      id: "scur_e_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la e cursiva",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la e cursiva (letra ligada).",
      audio: "audio/scur_e_demo_narracion.mp3",
      textoAudio: "En cursiva, la e se escribe sin levantar el lápiz: entramos con una rayita, hacemos la vuelta redonda, y salimos con una colita para unir con la próxima letra.",
      fondoLetra: "e",
      camino: { puntos: [[13.0,91.0],[13.7,90.3],[14.5,89.4],[15.5,88.4],[16.6,87.3],[17.8,86.1],[19.1,84.8],[20.5,83.4],[21.8,81.9],[23.2,80.5],[24.5,79.0],[25.8,77.5],[27.0,76.0],[28.2,74.5],[29.4,73.0],[30.7,71.4],[32.0,69.7],[33.2,68.1],[34.5,66.4],[35.7,64.7],[36.9,62.9],[38.1,61.2],[39.1,59.4],[40.1,57.7],[41.0,56.0],[41.7,54.3],[42.3,52.5],[42.8,50.7],[43.2,48.9],[43.5,47.1],[43.8,45.2],[44.1,43.4],[44.5,41.7],[44.9,39.9],[45.5,38.2],[46.1,36.6],[47.0,35.0],[48.0,33.4],[49.3,31.8],[50.6,30.2],[52.0,28.5],[53.6,26.9],[55.1,25.4],[56.7,23.9],[58.3,22.6],[59.8,21.4],[61.3,20.4],[62.7,19.6],[64.0,19.0],[65.3,18.6],[66.6,18.3],[68.0,18.2],[69.4,18.2],[70.8,18.4],[72.1,18.7],[73.3,19.2],[74.3,19.8],[75.2,20.6],[75.7,21.5],[76.0,22.7],[76.0,24.0],[75.6,25.6],[74.8,27.6],[73.7,29.8],[72.3,32.3],[70.8,35.0],[69.1,37.8],[67.3,40.6],[65.4,43.3],[63.6,46.0],[61.9,48.6],[60.4,50.9],[59.0,53.0],[57.7,54.8],[56.3,56.5],[55.0,58.1],[53.6,59.6],[52.2,60.9],[50.9,62.2],[49.7,63.5],[48.6,64.8],[47.6,66.0],[46.8,67.3],[46.3,68.6],[46.0,70.0],[46.0,71.5],[46.2,73.0],[46.6,74.6],[47.2,76.2],[47.9,77.8],[48.8,79.4],[49.8,81.0],[50.8,82.4],[51.9,83.8],[53.0,85.0],[54.0,86.1],[55.0,87.0],[56.0,87.7],[57.1,88.4],[58.2,88.9],[59.3,89.4],[60.5,89.7],[61.8,89.9],[63.0,90.1],[64.2,90.1],[65.5,90.0],[66.7,89.8],[67.9,89.4],[69.0,89.0],[70.1,88.4],[71.3,87.6],[72.5,86.6],[73.6,85.5],[74.8,84.3],[75.9,82.9],[77.1,81.6],[78.1,80.2],[79.2,78.8],[80.2,77.5],[81.1,76.2],[82.0,75.0],[82.8,73.8],[83.6,72.6],[84.3,71.4],[85.0,70.1],[85.7,68.9],[86.3,67.6],[86.9,66.4],[87.4,65.3],[87.9,64.3],[88.3,63.4],[88.7,62.6],[89,62]] }
    },
    {
      id: "scur_e_trazo", tipo: "trazo",
      titulo: "Trazamos la e cursiva",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la e cursiva, despacito y sin levantar el lápiz.",
      audio: "audio/scur_e_instruccion.mp3",
      libre: false,
      fondoLetra: "e",
      caminos: [
        { puntos: [[13.0,91.0],[13.7,90.3],[14.5,89.4],[15.5,88.4],[16.6,87.3],[17.8,86.1],[19.1,84.8],[20.5,83.4],[21.8,81.9],[23.2,80.5],[24.5,79.0],[25.8,77.5],[27.0,76.0],[28.2,74.5],[29.4,73.0],[30.7,71.4],[32.0,69.7],[33.2,68.1],[34.5,66.4],[35.7,64.7],[36.9,62.9],[38.1,61.2],[39.1,59.4],[40.1,57.7],[41.0,56.0],[41.7,54.3],[42.3,52.5],[42.8,50.7],[43.2,48.9],[43.5,47.1],[43.8,45.2],[44.1,43.4],[44.5,41.7],[44.9,39.9],[45.5,38.2],[46.1,36.6],[47.0,35.0],[48.0,33.4],[49.3,31.8],[50.6,30.2],[52.0,28.5],[53.6,26.9],[55.1,25.4],[56.7,23.9],[58.3,22.6],[59.8,21.4],[61.3,20.4],[62.7,19.6],[64.0,19.0],[65.3,18.6],[66.6,18.3],[68.0,18.2],[69.4,18.2],[70.8,18.4],[72.1,18.7],[73.3,19.2],[74.3,19.8],[75.2,20.6],[75.7,21.5],[76.0,22.7],[76.0,24.0],[75.6,25.6],[74.8,27.6],[73.7,29.8],[72.3,32.3],[70.8,35.0],[69.1,37.8],[67.3,40.6],[65.4,43.3],[63.6,46.0],[61.9,48.6],[60.4,50.9],[59.0,53.0],[57.7,54.8],[56.3,56.5],[55.0,58.1],[53.6,59.6],[52.2,60.9],[50.9,62.2],[49.7,63.5],[48.6,64.8],[47.6,66.0],[46.8,67.3],[46.3,68.6],[46.0,70.0],[46.0,71.5],[46.2,73.0],[46.6,74.6],[47.2,76.2],[47.9,77.8],[48.8,79.4],[49.8,81.0],[50.8,82.4],[51.9,83.8],[53.0,85.0],[54.0,86.1],[55.0,87.0],[56.0,87.7],[57.1,88.4],[58.2,88.9],[59.3,89.4],[60.5,89.7],[61.8,89.9],[63.0,90.1],[64.2,90.1],[65.5,90.0],[66.7,89.8],[67.9,89.4],[69.0,89.0],[70.1,88.4],[71.3,87.6],[72.5,86.6],[73.6,85.5],[74.8,84.3],[75.9,82.9],[77.1,81.6],[78.1,80.2],[79.2,78.8],[80.2,77.5],[81.1,76.2],[82.0,75.0],[82.8,73.8],[83.6,72.6],[84.3,71.4],[85.0,70.1],[85.7,68.9],[86.3,67.6],[86.9,66.4],[87.4,65.3],[87.9,64.3],[88.3,63.4],[88.7,62.6],[89,62]] }
      ]
    },

    // --- i minúscula imprenta ---------------------------------------
    {
      id: "smin_i_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la i minúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la i minúscula.",
      audio: "audio/smin_i_demo_narracion.mp3",
      textoAudio: "Para escribir la i minúscula, bajamos una rayita cortita, derecha. Arriba de todo le vamos a poner un puntito.",
      fondoLetra: "i",
      puntoExtra: { cx: 50, cy: 38, r: 7 },
      camino: { puntos: [[50,55],[50,85]] }
    },
    {
      id: "smin_i_trazo", tipo: "trazo",
      titulo: "Trazamos la i minúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la i minúscula, despacito.",
      audio: "audio/smin_i_instruccion.mp3",
      libre: false,
      fondoLetra: "i",
      caminos: [ { puntoExtra: { cx: 50, cy: 38, r: 7 }, puntos: [[50,55],[50,85]] } ]
    },

    // --- i cursiva (manuscrita ligada) --------------------------------
    {
      id: "scur_i_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la i cursiva",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la i cursiva (letra ligada).",
      audio: "audio/scur_i_demo_narracion.mp3",
      puntoExtra: { cx: 78, cy: 8, r: 8 },
      textoAudio: "En cursiva, la i se escribe con un solo trazo curvo, de abajo hacia arriba, sin levantar el lápiz. Después le agregamos el puntito arriba.",
      fondoLetra: "i",
      camino: { puntos: [[8.0,89.0],[8.6,88.6],[9.3,88.1],[10.1,87.5],[11.0,86.9],[12.0,86.2],[13.1,85.5],[14.3,84.7],[15.4,83.9],[16.6,83.0],[17.7,82.0],[18.9,81.0],[20.0,80.0],[21.1,78.9],[22.2,77.8],[23.4,76.6],[24.6,75.4],[25.7,74.1],[26.9,72.8],[28.1,71.4],[29.3,70.0],[30.5,68.6],[31.7,67.1],[32.9,65.6],[34.0,64.0],[35.1,62.3],[36.3,60.5],[37.4,58.6],[38.6,56.7],[39.7,54.7],[40.9,52.6],[42.0,50.6],[43.1,48.7],[44.1,46.8],[45.1,45.0],[46.1,43.4],[47.0,42.0],[47.8,40.7],[48.6,39.5],[49.2,38.5],[49.9,37.5],[50.4,36.6],[51.0,35.8],[51.6,35.0],[52.1,34.3],[52.8,33.7],[53.4,33.1],[54.2,32.5],[55.0,32.0],[56.0,31.5],[57.2,31.1],[58.5,30.7],[59.9,30.3],[61.3,30.0],[62.8,29.8],[64.1,29.6],[65.3,29.5],[66.4,29.5],[67.2,29.5],[67.8,29.7],[68.0,30.0],[67.9,30.4],[67.4,31.0],[66.7,31.7],[65.7,32.4],[64.6,33.3],[63.3,34.2],[62.0,35.2],[60.6,36.2],[59.3,37.2],[58.1,38.2],[56.9,39.1],[56.0,40.0],[55.2,40.8],[54.4,41.7],[53.7,42.5],[53.0,43.3],[52.3,44.2],[51.6,45.0],[51.0,45.8],[50.4,46.7],[49.8,47.5],[49.2,48.3],[48.6,49.2],[48.0,50.0],[47.4,50.8],[46.9,51.7],[46.3,52.5],[45.8,53.3],[45.3,54.1],[44.8,54.9],[44.3,55.8],[43.8,56.6],[43.3,57.4],[42.9,58.3],[42.4,59.1],[42.0,60.0],[41.6,60.9],[41.1,61.8],[40.7,62.7],[40.3,63.7],[39.9,64.6],[39.5,65.6],[39.1,66.5],[38.8,67.4],[38.5,68.4],[38.3,69.3],[38.1,70.2],[38.0,71.0],[37.9,71.8],[37.9,72.7],[37.9,73.5],[38.0,74.3],[38.1,75.0],[38.2,75.8],[38.4,76.6],[38.7,77.3],[38.9,78.0],[39.2,78.7],[39.6,79.4],[40.0,80.0],[40.5,80.6],[41.0,81.2],[41.5,81.8],[42.1,82.4],[42.8,83.0],[43.5,83.5],[44.2,84.0],[45.0,84.5],[45.7,84.9],[46.5,85.3],[47.2,85.7],[48.0,86.0],[48.8,86.3],[49.6,86.5],[50.4,86.7],[51.2,86.9],[52.0,87.1],[52.9,87.2],[53.7,87.3],[54.6,87.3],[55.5,87.3],[56.3,87.2],[57.2,87.1],[58.0,87.0],[58.8,86.8],[59.7,86.6],[60.5,86.3],[61.3,85.9],[62.2,85.5],[63.0,85.1],[63.8,84.7],[64.7,84.2],[65.5,83.7],[66.3,83.1],[67.2,82.6],[68.0,82.0],[68.8,81.4],[69.7,80.7],[70.5,79.9],[71.3,79.1],[72.2,78.3],[73.0,77.4],[73.8,76.6],[74.7,75.8],[75.5,75.0],[76.3,74.3],[77.2,73.6],[78.0,73.0],[78.9,72.5],[79.8,72.0],[80.7,71.6],[81.7,71.1],[82.7,70.8],[83.6,70.4],[84.5,70.1],[85.4,69.9],[86.2,69.6],[86.9,69.4],[87.5,69.2],[88,69]] }
    },
    {
      id: "scur_i_trazo", tipo: "trazo",
      titulo: "Trazamos la i cursiva",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la i cursiva, despacito y sin levantar el lápiz.",
      audio: "audio/scur_i_instruccion.mp3",
      libre: false,
      fondoLetra: "i",
      caminos: [ { puntoExtra: { cx: 78, cy: 8, r: 8 }, puntos: [[8.0,89.0],[8.6,88.6],[9.3,88.1],[10.1,87.5],[11.0,86.9],[12.0,86.2],[13.1,85.5],[14.3,84.7],[15.4,83.9],[16.6,83.0],[17.7,82.0],[18.9,81.0],[20.0,80.0],[21.1,78.9],[22.2,77.8],[23.4,76.6],[24.6,75.4],[25.7,74.1],[26.9,72.8],[28.1,71.4],[29.3,70.0],[30.5,68.6],[31.7,67.1],[32.9,65.6],[34.0,64.0],[35.1,62.3],[36.3,60.5],[37.4,58.6],[38.6,56.7],[39.7,54.7],[40.9,52.6],[42.0,50.6],[43.1,48.7],[44.1,46.8],[45.1,45.0],[46.1,43.4],[47.0,42.0],[47.8,40.7],[48.6,39.5],[49.2,38.5],[49.9,37.5],[50.4,36.6],[51.0,35.8],[51.6,35.0],[52.1,34.3],[52.8,33.7],[53.4,33.1],[54.2,32.5],[55.0,32.0],[56.0,31.5],[57.2,31.1],[58.5,30.7],[59.9,30.3],[61.3,30.0],[62.8,29.8],[64.1,29.6],[65.3,29.5],[66.4,29.5],[67.2,29.5],[67.8,29.7],[68.0,30.0],[67.9,30.4],[67.4,31.0],[66.7,31.7],[65.7,32.4],[64.6,33.3],[63.3,34.2],[62.0,35.2],[60.6,36.2],[59.3,37.2],[58.1,38.2],[56.9,39.1],[56.0,40.0],[55.2,40.8],[54.4,41.7],[53.7,42.5],[53.0,43.3],[52.3,44.2],[51.6,45.0],[51.0,45.8],[50.4,46.7],[49.8,47.5],[49.2,48.3],[48.6,49.2],[48.0,50.0],[47.4,50.8],[46.9,51.7],[46.3,52.5],[45.8,53.3],[45.3,54.1],[44.8,54.9],[44.3,55.8],[43.8,56.6],[43.3,57.4],[42.9,58.3],[42.4,59.1],[42.0,60.0],[41.6,60.9],[41.1,61.8],[40.7,62.7],[40.3,63.7],[39.9,64.6],[39.5,65.6],[39.1,66.5],[38.8,67.4],[38.5,68.4],[38.3,69.3],[38.1,70.2],[38.0,71.0],[37.9,71.8],[37.9,72.7],[37.9,73.5],[38.0,74.3],[38.1,75.0],[38.2,75.8],[38.4,76.6],[38.7,77.3],[38.9,78.0],[39.2,78.7],[39.6,79.4],[40.0,80.0],[40.5,80.6],[41.0,81.2],[41.5,81.8],[42.1,82.4],[42.8,83.0],[43.5,83.5],[44.2,84.0],[45.0,84.5],[45.7,84.9],[46.5,85.3],[47.2,85.7],[48.0,86.0],[48.8,86.3],[49.6,86.5],[50.4,86.7],[51.2,86.9],[52.0,87.1],[52.9,87.2],[53.7,87.3],[54.6,87.3],[55.5,87.3],[56.3,87.2],[57.2,87.1],[58.0,87.0],[58.8,86.8],[59.7,86.6],[60.5,86.3],[61.3,85.9],[62.2,85.5],[63.0,85.1],[63.8,84.7],[64.7,84.2],[65.5,83.7],[66.3,83.1],[67.2,82.6],[68.0,82.0],[68.8,81.4],[69.7,80.7],[70.5,79.9],[71.3,79.1],[72.2,78.3],[73.0,77.4],[73.8,76.6],[74.7,75.8],[75.5,75.0],[76.3,74.3],[77.2,73.6],[78.0,73.0],[78.9,72.5],[79.8,72.0],[80.7,71.6],[81.7,71.1],[82.7,70.8],[83.6,70.4],[84.5,70.1],[85.4,69.9],[86.2,69.6],[86.9,69.4],[87.5,69.2],[88,69]] } ]
    },

    // --- o minúscula imprenta ---------------------------------------
    {
      id: "smin_o_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la o minúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la o minúscula.",
      audio: "audio/smin_o_demo_narracion.mp3",
      textoAudio: "Para escribir la o minúscula, hacemos una vuelta redonda, más chiquita que la O grande, sin levantar el lápiz.",
      fondoLetra: "o",
      camino: { puntos: [[45.0,42.0],[48.9,42.6],[52.5,44.4],[55.6,47.3],[58.0,51.0],[59.5,55.3],[60.0,60.0],[59.5,64.7],[58.0,69.0],[55.6,72.7],[52.5,75.6],[48.9,77.4],[45.0,78.0],[41.1,77.4],[37.5,75.6],[34.4,72.7],[32.0,69.0],[30.5,64.7],[30.0,60.0],[30.5,55.3],[32.0,51.0],[34.4,47.3],[37.5,44.4],[41.1,42.6],[45.0,42.0]] }
    },
    {
      id: "smin_o_trazo", tipo: "trazo",
      titulo: "Trazamos la o minúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la o minúscula, despacito.",
      audio: "audio/smin_o_instruccion.mp3",
      libre: false,
      fondoLetra: "o",
      caminos: [ { puntos: [[45.0,42.0],[48.9,42.6],[52.5,44.4],[55.6,47.3],[58.0,51.0],[59.5,55.3],[60.0,60.0],[59.5,64.7],[58.0,69.0],[55.6,72.7],[52.5,75.6],[48.9,77.4],[45.0,78.0],[41.1,77.4],[37.5,75.6],[34.4,72.7],[32.0,69.0],[30.5,64.7],[30.0,60.0],[30.5,55.3],[32.0,51.0],[34.4,47.3],[37.5,44.4],[41.1,42.6],[45.0,42.0]] } ]
    },

    // --- o cursiva (manuscrita ligada) --------------------------------
    {
      id: "scur_o_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la o cursiva",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la o cursiva (letra ligada).",
      audio: "audio/scur_o_demo_narracion.mp3",
      textoAudio: "En cursiva, la o se escribe sin levantar el lápiz: hacemos la vuelta redonda y salimos con una colita para unir con la próxima letra.",
      fondoLetra: "o",
      camino: { puntos: [[50.0,16.0],[57.3,16.6],[64.4,18.5],[71.0,21.6],[77.0,25.8],[82.2,31.0],[86.4,37.0],[89.5,43.6],[91.4,50.7],[92.0,58.0],[91.4,65.3],[89.5,72.4],[86.4,79.0],[82.2,85.0],[77.0,90.2],[71.0,94.4],[64.4,97.5],[57.3,99.4],[50.0,100.0],[42.7,99.4],[35.6,97.5],[29.0,94.4],[23.0,90.2],[17.8,85.0],[13.6,79.0],[10.5,72.4],[8.6,65.3],[8.0,58.0],[8.6,50.7],[10.5,43.6],[13.6,37.0],[17.8,31.0],[23.0,25.8],[29.0,21.6],[35.6,18.5],[42.7,16.6],[50.0,16.0],[57.3,16.6],[61.5,17.6],[65.9,20.0],[69.4,23.2],[71.8,27.2],[72.9,31.5],[72.7,36.0],[71.1,40.2],[68.3,43.9],[64.5,46.9],[59.8,49.0],[54.7,49.9],[49.5,49.7],[44.5,48.4],[40.1,46.0],[36.6,42.8],[34.2,38.8],[33.1,34.5],[33.3,30.0],[34.9,25.8],[37.7,22.1],[41.5,19.1],[46.2,17.0],[51.3,16.1],[53.0,16.0],[81,16],[91,13]] }
    },
    {
      id: "scur_o_trazo", tipo: "trazo",
      titulo: "Trazamos la o cursiva",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la o cursiva, despacito y sin levantar el lápiz.",
      audio: "audio/scur_o_instruccion.mp3",
      libre: false,
      fondoLetra: "o",
      caminos: [ { puntos: [[50.0,16.0],[57.3,16.6],[64.4,18.5],[71.0,21.6],[77.0,25.8],[82.2,31.0],[86.4,37.0],[89.5,43.6],[91.4,50.7],[92.0,58.0],[91.4,65.3],[89.5,72.4],[86.4,79.0],[82.2,85.0],[77.0,90.2],[71.0,94.4],[64.4,97.5],[57.3,99.4],[50.0,100.0],[42.7,99.4],[35.6,97.5],[29.0,94.4],[23.0,90.2],[17.8,85.0],[13.6,79.0],[10.5,72.4],[8.6,65.3],[8.0,58.0],[8.6,50.7],[10.5,43.6],[13.6,37.0],[17.8,31.0],[23.0,25.8],[29.0,21.6],[35.6,18.5],[42.7,16.6],[50.0,16.0],[57.3,16.6],[61.5,17.6],[65.9,20.0],[69.4,23.2],[71.8,27.2],[72.9,31.5],[72.7,36.0],[71.1,40.2],[68.3,43.9],[64.5,46.9],[59.8,49.0],[54.7,49.9],[49.5,49.7],[44.5,48.4],[40.1,46.0],[36.6,42.8],[34.2,38.8],[33.1,34.5],[33.3,30.0],[34.9,25.8],[37.7,22.1],[41.5,19.1],[46.2,17.0],[51.3,16.1],[53.0,16.0],[81,16],[91,13]] } ]
    },

    // --- u minúscula imprenta ---------------------------------------
    {
      id: "smin_u_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la u minúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la u minúscula.",
      audio: "audio/smin_u_demo_narracion.mp3",
      textoAudio: "Para escribir la u minúscula, bajamos derecho, hacemos una curva suave abajo, y subimos derecho del otro lado, un poco más chiquita que la U grande.",
      fondoLetra: "u",
      camino: { puntos: [[35,50],[35,75],[40,86],[50,89],[60,86],[65,75],[65,50]] }
    },
    {
      id: "smin_u_trazo", tipo: "trazo",
      titulo: "Trazamos la u minúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la u minúscula, despacito.",
      audio: "audio/smin_u_instruccion.mp3",
      libre: false,
      fondoLetra: "u",
      caminos: [ { puntos: [[35,50],[35,75],[40,86],[50,89],[60,86],[65,75],[65,50]] } ]
    },

    // --- u cursiva (manuscrita ligada) --------------------------------
    {
      id: "scur_u_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la u cursiva",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la u cursiva (letra ligada).",
      audio: "audio/scur_u_demo_narracion.mp3",
      textoAudio: "En cursiva, la u se escribe sin levantar el lápiz: bajamos, subimos, bajamos de nuevo y subimos, como dos ganchitos seguidos.",
      fondoLetra: "u",
      camino: { puntos: [[8.0,89.0],[8.5,88.7],[9.1,88.3],[9.8,87.9],[10.6,87.4],[11.5,86.9],[12.4,86.3],[13.4,85.7],[14.4,85.0],[15.3,84.3],[16.3,83.6],[17.2,82.8],[18.0,82.0],[18.8,81.1],[19.6,80.2],[20.4,79.3],[21.1,78.3],[21.9,77.3],[22.7,76.2],[23.4,75.1],[24.2,73.9],[24.9,72.7],[25.6,71.5],[26.3,70.3],[27.0,69.0],[27.7,67.7],[28.3,66.3],[28.9,64.9],[29.6,63.5],[30.2,62.0],[30.8,60.5],[31.3,59.0],[31.9,57.4],[32.4,55.8],[33.0,54.2],[33.5,52.6],[34.0,51.0],[34.5,49.3],[35.0,47.6],[35.4,45.9],[35.9,44.1],[36.3,42.3],[36.7,40.5],[37.1,38.7],[37.5,36.9],[37.9,35.1],[38.2,33.4],[38.6,31.7],[39.0,30.0],[39.4,28.3],[39.8,26.4],[40.2,24.5],[40.6,22.6],[41.0,20.6],[41.4,18.8],[41.7,17.0],[42.1,15.4],[42.4,14.1],[42.6,13.1],[42.8,12.3],[43.0,12.0],[43.1,12.1],[43.1,12.5],[43.1,13.2],[43.1,14.3],[43.0,15.5],[42.9,16.9],[42.7,18.5],[42.6,20.2],[42.4,21.9],[42.3,23.7],[42.1,25.4],[42.0,27.0],[41.9,28.6],[41.7,30.4],[41.5,32.3],[41.3,34.2],[41.0,36.2],[40.8,38.2],[40.6,40.2],[40.4,42.3],[40.2,44.3],[40.1,46.2],[40.0,48.2],[40.0,50.0],[40.0,51.8],[40.1,53.6],[40.1,55.4],[40.2,57.2],[40.3,59.0],[40.5,60.7],[40.7,62.4],[40.9,64.0],[41.1,65.6],[41.4,67.2],[41.7,68.6],[42.0,70.0],[42.4,71.3],[42.8,72.6],[43.2,73.9],[43.7,75.1],[44.2,76.2],[44.7,77.3],[45.2,78.3],[45.8,79.3],[46.3,80.1],[46.9,80.8],[47.5,81.5],[48.0,82.0],[48.5,82.4],[49.1,82.8],[49.7,83.0],[50.3,83.2],[50.8,83.3],[51.4,83.2],[52.0,83.1],[52.6,82.9],[53.2,82.6],[53.8,82.2],[54.4,81.6],[55.0,81.0],[55.6,80.2],[56.2,79.3],[56.8,78.2],[57.4,77.0],[58.0,75.7],[58.6,74.3],[59.2,72.9],[59.8,71.3],[60.4,69.8],[60.9,68.2],[61.5,66.6],[62.0,65.0],[62.5,63.4],[63.0,61.7],[63.4,59.9],[63.9,58.0],[64.3,56.2],[64.7,54.2],[65.1,52.3],[65.5,50.4],[65.9,48.5],[66.2,46.6],[66.6,44.8],[67.0,43.0],[67.4,41.2],[67.7,39.5],[68.1,37.7],[68.4,35.9],[68.7,34.2],[69.1,32.4],[69.4,30.7],[69.7,29.1],[70.0,27.5],[70.3,25.9],[70.7,24.4],[71.0,23.0],[71.3,21.6],[71.7,20.1],[72.1,18.5],[72.5,17.0],[72.9,15.5],[73.3,14.1],[73.7,12.8],[74.0,11.7],[74.4,10.8],[74.6,10.2],[74.8,9.9],[75.0,10.0],[75.1,10.4],[75.1,11.2],[75.1,12.4],[75.1,13.7],[75.0,15.3],[74.9,17.1],[74.7,19.0],[74.6,21.0],[74.4,23.1],[74.3,25.1],[74.1,27.1],[74.0,29.0],[73.9,30.9],[73.7,32.9],[73.5,35.0],[73.3,37.1],[73.1,39.3],[72.9,41.6],[72.7,43.8],[72.5,46.0],[72.3,48.1],[72.2,50.2],[72.1,52.1],[72.0,54.0],[72.0,55.8],[71.9,57.5],[71.9,59.2],[72.0,60.8],[72.0,62.4],[72.1,63.9],[72.1,65.4],[72.3,66.8],[72.4,68.2],[72.6,69.5],[72.8,70.8],[73.0,72.0],[73.3,73.2],[73.6,74.4],[73.9,75.7],[74.3,76.9],[74.7,78.0],[75.2,79.1],[75.6,80.0],[76.1,80.9],[76.6,81.7],[77.1,82.3],[77.5,82.7],[78.0,83.0],[78.5,83.1],[78.9,82.9],[79.4,82.5],[79.9,82.0],[80.4,81.4],[80.9,80.7],[81.4,79.9],[82.0,79.1],[82.5,78.2],[83.0,77.4],[83.5,76.7],[84.0,76.0],[84.5,75.3],[85.1,74.6],[85.6,73.9],[86.2,73.1],[86.8,72.3],[87.4,71.6],[87.9,70.8],[88.4,70.1],[88.9,69.5],[89.3,68.9],[89.7,68.4],[90,68]] }
    },
    {
      id: "scur_u_trazo", tipo: "trazo",
      titulo: "Trazamos la u cursiva",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la u cursiva, despacito y sin levantar el lápiz.",
      audio: "audio/scur_u_instruccion.mp3",
      libre: false,
      fondoLetra: "u",
      caminos: [ { puntos: [[8.0,89.0],[8.5,88.7],[9.1,88.3],[9.8,87.9],[10.6,87.4],[11.5,86.9],[12.4,86.3],[13.4,85.7],[14.4,85.0],[15.3,84.3],[16.3,83.6],[17.2,82.8],[18.0,82.0],[18.8,81.1],[19.6,80.2],[20.4,79.3],[21.1,78.3],[21.9,77.3],[22.7,76.2],[23.4,75.1],[24.2,73.9],[24.9,72.7],[25.6,71.5],[26.3,70.3],[27.0,69.0],[27.7,67.7],[28.3,66.3],[28.9,64.9],[29.6,63.5],[30.2,62.0],[30.8,60.5],[31.3,59.0],[31.9,57.4],[32.4,55.8],[33.0,54.2],[33.5,52.6],[34.0,51.0],[34.5,49.3],[35.0,47.6],[35.4,45.9],[35.9,44.1],[36.3,42.3],[36.7,40.5],[37.1,38.7],[37.5,36.9],[37.9,35.1],[38.2,33.4],[38.6,31.7],[39.0,30.0],[39.4,28.3],[39.8,26.4],[40.2,24.5],[40.6,22.6],[41.0,20.6],[41.4,18.8],[41.7,17.0],[42.1,15.4],[42.4,14.1],[42.6,13.1],[42.8,12.3],[43.0,12.0],[43.1,12.1],[43.1,12.5],[43.1,13.2],[43.1,14.3],[43.0,15.5],[42.9,16.9],[42.7,18.5],[42.6,20.2],[42.4,21.9],[42.3,23.7],[42.1,25.4],[42.0,27.0],[41.9,28.6],[41.7,30.4],[41.5,32.3],[41.3,34.2],[41.0,36.2],[40.8,38.2],[40.6,40.2],[40.4,42.3],[40.2,44.3],[40.1,46.2],[40.0,48.2],[40.0,50.0],[40.0,51.8],[40.1,53.6],[40.1,55.4],[40.2,57.2],[40.3,59.0],[40.5,60.7],[40.7,62.4],[40.9,64.0],[41.1,65.6],[41.4,67.2],[41.7,68.6],[42.0,70.0],[42.4,71.3],[42.8,72.6],[43.2,73.9],[43.7,75.1],[44.2,76.2],[44.7,77.3],[45.2,78.3],[45.8,79.3],[46.3,80.1],[46.9,80.8],[47.5,81.5],[48.0,82.0],[48.5,82.4],[49.1,82.8],[49.7,83.0],[50.3,83.2],[50.8,83.3],[51.4,83.2],[52.0,83.1],[52.6,82.9],[53.2,82.6],[53.8,82.2],[54.4,81.6],[55.0,81.0],[55.6,80.2],[56.2,79.3],[56.8,78.2],[57.4,77.0],[58.0,75.7],[58.6,74.3],[59.2,72.9],[59.8,71.3],[60.4,69.8],[60.9,68.2],[61.5,66.6],[62.0,65.0],[62.5,63.4],[63.0,61.7],[63.4,59.9],[63.9,58.0],[64.3,56.2],[64.7,54.2],[65.1,52.3],[65.5,50.4],[65.9,48.5],[66.2,46.6],[66.6,44.8],[67.0,43.0],[67.4,41.2],[67.7,39.5],[68.1,37.7],[68.4,35.9],[68.7,34.2],[69.1,32.4],[69.4,30.7],[69.7,29.1],[70.0,27.5],[70.3,25.9],[70.7,24.4],[71.0,23.0],[71.3,21.6],[71.7,20.1],[72.1,18.5],[72.5,17.0],[72.9,15.5],[73.3,14.1],[73.7,12.8],[74.0,11.7],[74.4,10.8],[74.6,10.2],[74.8,9.9],[75.0,10.0],[75.1,10.4],[75.1,11.2],[75.1,12.4],[75.1,13.7],[75.0,15.3],[74.9,17.1],[74.7,19.0],[74.6,21.0],[74.4,23.1],[74.3,25.1],[74.1,27.1],[74.0,29.0],[73.9,30.9],[73.7,32.9],[73.5,35.0],[73.3,37.1],[73.1,39.3],[72.9,41.6],[72.7,43.8],[72.5,46.0],[72.3,48.1],[72.2,50.2],[72.1,52.1],[72.0,54.0],[72.0,55.8],[71.9,57.5],[71.9,59.2],[72.0,60.8],[72.0,62.4],[72.1,63.9],[72.1,65.4],[72.3,66.8],[72.4,68.2],[72.6,69.5],[72.8,70.8],[73.0,72.0],[73.3,73.2],[73.6,74.4],[73.9,75.7],[74.3,76.9],[74.7,78.0],[75.2,79.1],[75.6,80.0],[76.1,80.9],[76.6,81.7],[77.1,82.3],[77.5,82.7],[78.0,83.0],[78.5,83.1],[78.9,82.9],[79.4,82.5],[79.9,82.0],[80.4,81.4],[80.9,80.7],[81.4,79.9],[82.0,79.1],[82.5,78.2],[83.0,77.4],[83.5,76.7],[84.0,76.0],[84.5,75.3],[85.1,74.6],[85.6,73.9],[86.2,73.1],[86.8,72.3],[87.4,71.6],[87.9,70.8],[88.4,70.1],[88.9,69.5],[89.3,68.9],[89.7,68.4],[90,68]] } ]
    },

    // --- repaso minúscula (equivalente a s20, en minúscula imprenta) ---
    {
      id: "s20min", tipo: "trazo",
      titulo: "Repasamos las cinco vocales (minúscula)",
      instruccion: "Trazá cada vocal siguiendo el puntito, de a una.",
      audio: "audio/s20min_instruccion.mp3",
      libre: false,
      secuencial: true,
      caminos: [
        { letra: "a", segmentos: [
          { puntos: [[40.0,53.0],[42.9,53.4],[45.6,54.5],[48.1,56.3],[50.2,58.6],[51.7,61.5],[52.7,64.7],[53.0,68.0],[52.7,71.3],[51.7,74.5],[50.2,77.4],[48.1,79.7],[45.6,81.5],[42.9,82.6],[40.0,83.0],[37.1,82.6],[34.4,81.5],[31.9,79.7],[29.8,77.4],[28.3,74.5],[27.3,71.3],[27.0,68.0],[27.3,64.7],[28.3,61.5],[29.8,58.6],[31.9,56.3],[34.4,54.5],[37.1,53.4],[40.0,53.0]] },
          { puntos: [[52,55],[52,83]] }
        ] },
        { letra: "e", segmentos: [
          { puntos: [[59.8,68.8],[59.0,71.6],[57.8,74.3],[56.1,76.7],[54.1,78.7],[51.7,80.3],[49.1,81.4],[46.4,81.9],[43.6,81.9],[40.9,81.4],[38.3,80.3],[35.9,78.7],[33.9,76.7],[32.2,74.3],[31.0,71.6],[30.2,68.8],[30.0,65.8],[30.3,62.9],[31.1,60.0],[32.4,57.4],[34.1,55.0],[36.2,53.1],[38.6,51.5],[41.2,50.5],[44.0,50.0],[46.7,50.1],[49.5,50.7],[52.0,51.9],[54.4,53.5],[56.4,55.6],[58.0,58.0]] },
          { puntos: [[30,66],[58,66]] }
        ] },
        { letra: "i", puntoExtra: { cx: 50, cy: 38, r: 7 }, puntos: [[50,55],[50,85]] },
        { letra: "o", puntos: [[45.0,42.0],[48.9,42.6],[52.5,44.4],[55.6,47.3],[58.0,51.0],[59.5,55.3],[60.0,60.0],[59.5,64.7],[58.0,69.0],[55.6,72.7],[52.5,75.6],[48.9,77.4],[45.0,78.0],[41.1,77.4],[37.5,75.6],[34.4,72.7],[32.0,69.0],[30.5,64.7],[30.0,60.0],[30.5,55.3],[32.0,51.0],[34.4,47.3],[37.5,44.4],[41.1,42.6],[45.0,42.0]] },
        { letra: "u", puntos: [[35,50],[35,75],[40,86],[50,89],[60,86],[65,75],[65,50]] }
      ]
    },

    // --- repaso cursiva (equivalente a s20, en cursiva manuscrita) -----
    {
      id: "s20cur", tipo: "trazo",
      titulo: "Repasamos las cinco vocales (cursiva)",
      instruccion: "Trazá cada vocal siguiendo el puntito, de a una, sin levantar el lápiz.",
      audio: "audio/s20cur_instruccion.mp3",
      libre: false,
      secuencial: true,
      caminos: [
        { letra: "a", puntos: [[26,82],[36,58],[39.0,54.1],[42.0,54.2],[44.8,55.2],[47.4,57.0],[49.5,59.5],[51.0,62.5],[51.9,65.9],[51.9,69.4],[51.3,72.8],[49.9,75.9],[47.9,78.5],[45.4,80.5],[42.6,81.7],[39.6,82.0],[36.6,81.4],[33.9,80.0],[31.5,77.9],[29.7,75.1],[28.5,71.9],[28.0,68.5],[28.3,65.0],[29.3,61.7],[31.0,58.8],[33.2,56.4],[35.9,54.8],[52,50],[52,83],[60,80]] },
        { letra: "e", puntos: [[13.0,91.0],[13.7,90.3],[14.5,89.4],[15.5,88.4],[16.6,87.3],[17.8,86.1],[19.1,84.8],[20.5,83.4],[21.8,81.9],[23.2,80.5],[24.5,79.0],[25.8,77.5],[27.0,76.0],[28.2,74.5],[29.4,73.0],[30.7,71.4],[32.0,69.7],[33.2,68.1],[34.5,66.4],[35.7,64.7],[36.9,62.9],[38.1,61.2],[39.1,59.4],[40.1,57.7],[41.0,56.0],[41.7,54.3],[42.3,52.5],[42.8,50.7],[43.2,48.9],[43.5,47.1],[43.8,45.2],[44.1,43.4],[44.5,41.7],[44.9,39.9],[45.5,38.2],[46.1,36.6],[47.0,35.0],[48.0,33.4],[49.3,31.8],[50.6,30.2],[52.0,28.5],[53.6,26.9],[55.1,25.4],[56.7,23.9],[58.3,22.6],[59.8,21.4],[61.3,20.4],[62.7,19.6],[64.0,19.0],[65.3,18.6],[66.6,18.3],[68.0,18.2],[69.4,18.2],[70.8,18.4],[72.1,18.7],[73.3,19.2],[74.3,19.8],[75.2,20.6],[75.7,21.5],[76.0,22.7],[76.0,24.0],[75.6,25.6],[74.8,27.6],[73.7,29.8],[72.3,32.3],[70.8,35.0],[69.1,37.8],[67.3,40.6],[65.4,43.3],[63.6,46.0],[61.9,48.6],[60.4,50.9],[59.0,53.0],[57.7,54.8],[56.3,56.5],[55.0,58.1],[53.6,59.6],[52.2,60.9],[50.9,62.2],[49.7,63.5],[48.6,64.8],[47.6,66.0],[46.8,67.3],[46.3,68.6],[46.0,70.0],[46.0,71.5],[46.2,73.0],[46.6,74.6],[47.2,76.2],[47.9,77.8],[48.8,79.4],[49.8,81.0],[50.8,82.4],[51.9,83.8],[53.0,85.0],[54.0,86.1],[55.0,87.0],[56.0,87.7],[57.1,88.4],[58.2,88.9],[59.3,89.4],[60.5,89.7],[61.8,89.9],[63.0,90.1],[64.2,90.1],[65.5,90.0],[66.7,89.8],[67.9,89.4],[69.0,89.0],[70.1,88.4],[71.3,87.6],[72.5,86.6],[73.6,85.5],[74.8,84.3],[75.9,82.9],[77.1,81.6],[78.1,80.2],[79.2,78.8],[80.2,77.5],[81.1,76.2],[82.0,75.0],[82.8,73.8],[83.6,72.6],[84.3,71.4],[85.0,70.1],[85.7,68.9],[86.3,67.6],[86.9,66.4],[87.4,65.3],[87.9,64.3],[88.3,63.4],[88.7,62.6],[89,62]] },
        { letra: "i", puntos: [[8.0,89.0],[8.6,88.6],[9.3,88.1],[10.1,87.5],[11.0,86.9],[12.0,86.2],[13.1,85.5],[14.3,84.7],[15.4,83.9],[16.6,83.0],[17.7,82.0],[18.9,81.0],[20.0,80.0],[21.1,78.9],[22.2,77.8],[23.4,76.6],[24.6,75.4],[25.7,74.1],[26.9,72.8],[28.1,71.4],[29.3,70.0],[30.5,68.6],[31.7,67.1],[32.9,65.6],[34.0,64.0],[35.1,62.3],[36.3,60.5],[37.4,58.6],[38.6,56.7],[39.7,54.7],[40.9,52.6],[42.0,50.6],[43.1,48.7],[44.1,46.8],[45.1,45.0],[46.1,43.4],[47.0,42.0],[47.8,40.7],[48.6,39.5],[49.2,38.5],[49.9,37.5],[50.4,36.6],[51.0,35.8],[51.6,35.0],[52.1,34.3],[52.8,33.7],[53.4,33.1],[54.2,32.5],[55.0,32.0],[56.0,31.5],[57.2,31.1],[58.5,30.7],[59.9,30.3],[61.3,30.0],[62.8,29.8],[64.1,29.6],[65.3,29.5],[66.4,29.5],[67.2,29.5],[67.8,29.7],[68.0,30.0],[67.9,30.4],[67.4,31.0],[66.7,31.7],[65.7,32.4],[64.6,33.3],[63.3,34.2],[62.0,35.2],[60.6,36.2],[59.3,37.2],[58.1,38.2],[56.9,39.1],[56.0,40.0],[55.2,40.8],[54.4,41.7],[53.7,42.5],[53.0,43.3],[52.3,44.2],[51.6,45.0],[51.0,45.8],[50.4,46.7],[49.8,47.5],[49.2,48.3],[48.6,49.2],[48.0,50.0],[47.4,50.8],[46.9,51.7],[46.3,52.5],[45.8,53.3],[45.3,54.1],[44.8,54.9],[44.3,55.8],[43.8,56.6],[43.3,57.4],[42.9,58.3],[42.4,59.1],[42.0,60.0],[41.6,60.9],[41.1,61.8],[40.7,62.7],[40.3,63.7],[39.9,64.6],[39.5,65.6],[39.1,66.5],[38.8,67.4],[38.5,68.4],[38.3,69.3],[38.1,70.2],[38.0,71.0],[37.9,71.8],[37.9,72.7],[37.9,73.5],[38.0,74.3],[38.1,75.0],[38.2,75.8],[38.4,76.6],[38.7,77.3],[38.9,78.0],[39.2,78.7],[39.6,79.4],[40.0,80.0],[40.5,80.6],[41.0,81.2],[41.5,81.8],[42.1,82.4],[42.8,83.0],[43.5,83.5],[44.2,84.0],[45.0,84.5],[45.7,84.9],[46.5,85.3],[47.2,85.7],[48.0,86.0],[48.8,86.3],[49.6,86.5],[50.4,86.7],[51.2,86.9],[52.0,87.1],[52.9,87.2],[53.7,87.3],[54.6,87.3],[55.5,87.3],[56.3,87.2],[57.2,87.1],[58.0,87.0],[58.8,86.8],[59.7,86.6],[60.5,86.3],[61.3,85.9],[62.2,85.5],[63.0,85.1],[63.8,84.7],[64.7,84.2],[65.5,83.7],[66.3,83.1],[67.2,82.6],[68.0,82.0],[68.8,81.4],[69.7,80.7],[70.5,79.9],[71.3,79.1],[72.2,78.3],[73.0,77.4],[73.8,76.6],[74.7,75.8],[75.5,75.0],[76.3,74.3],[77.2,73.6],[78.0,73.0],[78.9,72.5],[79.8,72.0],[80.7,71.6],[81.7,71.1],[82.7,70.8],[83.6,70.4],[84.5,70.1],[85.4,69.9],[86.2,69.6],[86.9,69.4],[87.5,69.2],[88,69]], puntoExtra: { cx: 78, cy: 8, r: 8 } },
        { letra: "o", puntos: [[50.0,16.0],[57.3,16.6],[64.4,18.5],[71.0,21.6],[77.0,25.8],[82.2,31.0],[86.4,37.0],[89.5,43.6],[91.4,50.7],[92.0,58.0],[91.4,65.3],[89.5,72.4],[86.4,79.0],[82.2,85.0],[77.0,90.2],[71.0,94.4],[64.4,97.5],[57.3,99.4],[50.0,100.0],[42.7,99.4],[35.6,97.5],[29.0,94.4],[23.0,90.2],[17.8,85.0],[13.6,79.0],[10.5,72.4],[8.6,65.3],[8.0,58.0],[8.6,50.7],[10.5,43.6],[13.6,37.0],[17.8,31.0],[23.0,25.8],[29.0,21.6],[35.6,18.5],[42.7,16.6],[50.0,16.0],[57.3,16.6],[61.5,17.6],[65.9,20.0],[69.4,23.2],[71.8,27.2],[72.9,31.5],[72.7,36.0],[71.1,40.2],[68.3,43.9],[64.5,46.9],[59.8,49.0],[54.7,49.9],[49.5,49.7],[44.5,48.4],[40.1,46.0],[36.6,42.8],[34.2,38.8],[33.1,34.5],[33.3,30.0],[34.9,25.8],[37.7,22.1],[41.5,19.1],[46.2,17.0],[51.3,16.1],[53.0,16.0],[81,16],[91,13]] },
        { letra: "u", puntos: [[8.0,89.0],[8.5,88.7],[9.1,88.3],[9.8,87.9],[10.6,87.4],[11.5,86.9],[12.4,86.3],[13.4,85.7],[14.4,85.0],[15.3,84.3],[16.3,83.6],[17.2,82.8],[18.0,82.0],[18.8,81.1],[19.6,80.2],[20.4,79.3],[21.1,78.3],[21.9,77.3],[22.7,76.2],[23.4,75.1],[24.2,73.9],[24.9,72.7],[25.6,71.5],[26.3,70.3],[27.0,69.0],[27.7,67.7],[28.3,66.3],[28.9,64.9],[29.6,63.5],[30.2,62.0],[30.8,60.5],[31.3,59.0],[31.9,57.4],[32.4,55.8],[33.0,54.2],[33.5,52.6],[34.0,51.0],[34.5,49.3],[35.0,47.6],[35.4,45.9],[35.9,44.1],[36.3,42.3],[36.7,40.5],[37.1,38.7],[37.5,36.9],[37.9,35.1],[38.2,33.4],[38.6,31.7],[39.0,30.0],[39.4,28.3],[39.8,26.4],[40.2,24.5],[40.6,22.6],[41.0,20.6],[41.4,18.8],[41.7,17.0],[42.1,15.4],[42.4,14.1],[42.6,13.1],[42.8,12.3],[43.0,12.0],[43.1,12.1],[43.1,12.5],[43.1,13.2],[43.1,14.3],[43.0,15.5],[42.9,16.9],[42.7,18.5],[42.6,20.2],[42.4,21.9],[42.3,23.7],[42.1,25.4],[42.0,27.0],[41.9,28.6],[41.7,30.4],[41.5,32.3],[41.3,34.2],[41.0,36.2],[40.8,38.2],[40.6,40.2],[40.4,42.3],[40.2,44.3],[40.1,46.2],[40.0,48.2],[40.0,50.0],[40.0,51.8],[40.1,53.6],[40.1,55.4],[40.2,57.2],[40.3,59.0],[40.5,60.7],[40.7,62.4],[40.9,64.0],[41.1,65.6],[41.4,67.2],[41.7,68.6],[42.0,70.0],[42.4,71.3],[42.8,72.6],[43.2,73.9],[43.7,75.1],[44.2,76.2],[44.7,77.3],[45.2,78.3],[45.8,79.3],[46.3,80.1],[46.9,80.8],[47.5,81.5],[48.0,82.0],[48.5,82.4],[49.1,82.8],[49.7,83.0],[50.3,83.2],[50.8,83.3],[51.4,83.2],[52.0,83.1],[52.6,82.9],[53.2,82.6],[53.8,82.2],[54.4,81.6],[55.0,81.0],[55.6,80.2],[56.2,79.3],[56.8,78.2],[57.4,77.0],[58.0,75.7],[58.6,74.3],[59.2,72.9],[59.8,71.3],[60.4,69.8],[60.9,68.2],[61.5,66.6],[62.0,65.0],[62.5,63.4],[63.0,61.7],[63.4,59.9],[63.9,58.0],[64.3,56.2],[64.7,54.2],[65.1,52.3],[65.5,50.4],[65.9,48.5],[66.2,46.6],[66.6,44.8],[67.0,43.0],[67.4,41.2],[67.7,39.5],[68.1,37.7],[68.4,35.9],[68.7,34.2],[69.1,32.4],[69.4,30.7],[69.7,29.1],[70.0,27.5],[70.3,25.9],[70.7,24.4],[71.0,23.0],[71.3,21.6],[71.7,20.1],[72.1,18.5],[72.5,17.0],[72.9,15.5],[73.3,14.1],[73.7,12.8],[74.0,11.7],[74.4,10.8],[74.6,10.2],[74.8,9.9],[75.0,10.0],[75.1,10.4],[75.1,11.2],[75.1,12.4],[75.1,13.7],[75.0,15.3],[74.9,17.1],[74.7,19.0],[74.6,21.0],[74.4,23.1],[74.3,25.1],[74.1,27.1],[74.0,29.0],[73.9,30.9],[73.7,32.9],[73.5,35.0],[73.3,37.1],[73.1,39.3],[72.9,41.6],[72.7,43.8],[72.5,46.0],[72.3,48.1],[72.2,50.2],[72.1,52.1],[72.0,54.0],[72.0,55.8],[71.9,57.5],[71.9,59.2],[72.0,60.8],[72.0,62.4],[72.1,63.9],[72.1,65.4],[72.3,66.8],[72.4,68.2],[72.6,69.5],[72.8,70.8],[73.0,72.0],[73.3,73.2],[73.6,74.4],[73.9,75.7],[74.3,76.9],[74.7,78.0],[75.2,79.1],[75.6,80.0],[76.1,80.9],[76.6,81.7],[77.1,82.3],[77.5,82.7],[78.0,83.0],[78.5,83.1],[78.9,82.9],[79.4,82.5],[79.9,82.0],[80.4,81.4],[80.9,80.7],[81.4,79.9],[82.0,79.1],[82.5,78.2],[83.0,77.4],[83.5,76.7],[84.0,76.0],[84.5,75.3],[85.1,74.6],[85.6,73.9],[86.2,73.1],[86.8,72.3],[87.4,71.6],[87.9,70.8],[88.4,70.1],[88.9,69.5],[89.3,68.9],[89.7,68.4],[90,68]] }
      ]
    },

        // ==================================================================
    // NUEVO: trazado en cursiva MAYÚSCULA para las 5 vocales, según
    // modelo de referencia (vogais cursivas maiúsculas). Usadas por el
    // selector cuando el chico elige "Cursiva MAYÚSCULA".
    // ==================================================================

    // --- A cursiva mayúscula ---
    {
      id: "scurmay_a_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la A cursiva mayúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la A cursiva mayúscula.",
      audio: "audio/scurmay_a_demo_narracion.mp3",
      textoAudio: "En cursiva mayúscula, la A se escribe con un gran lazo redondo, y después bajamos una colita larga hacia abajo, sin levantar el lápiz.",
      fondoLetra: "A",
      camino: { puntos: [[64.0,84.0],[63.7,84.3],[63.3,84.6],[62.9,85.0],[62.4,85.4],[61.9,85.9],[61.4,86.4],[60.8,86.9],[60.1,87.4],[59.4,87.8],[58.7,88.3],[57.9,88.7],[57.0,89.0],[56.1,89.3],[55.1,89.6],[54.0,89.9],[52.9,90.2],[51.7,90.5],[50.5,90.7],[49.3,90.9],[48.0,91.0],[46.7,91.1],[45.5,91.2],[44.2,91.1],[43.0,91.0],[41.8,90.8],[40.5,90.6],[39.2,90.3],[37.9,89.9],[36.6,89.5],[35.2,89.1],[33.9,88.5],[32.7,88.0],[31.4,87.3],[30.2,86.6],[29.1,85.8],[28.0,85.0],[27.0,84.1],[26.0,83.1],[25.1,82.0],[24.1,80.8],[23.3,79.5],[22.4,78.2],[21.6,76.9],[20.9,75.6],[20.1,74.2],[19.4,72.8],[18.7,71.4],[18.0,70.0],[17.3,68.6],[16.7,67.2],[16.0,65.8],[15.4,64.3],[14.8,62.9],[14.2,61.4],[13.7,59.9],[13.3,58.3],[12.8,56.8],[12.5,55.2],[12.2,53.6],[12.0,52.0],[11.9,50.3],[11.8,48.6],[11.8,46.8],[11.9,45.0],[12.0,43.2],[12.1,41.4],[12.3,39.5],[12.6,37.7],[12.9,36.0],[13.2,34.2],[13.6,32.6],[14.0,31.0],[14.4,29.5],[14.9,28.0],[15.4,26.5],[16.0,25.0],[16.6,23.6],[17.2,22.2],[17.9,20.8],[18.7,19.6],[19.4,18.3],[20.2,17.1],[21.1,16.0],[22.0,15.0],[23.0,14.0],[24.0,13.1],[25.1,12.3],[26.2,11.5],[27.4,10.7],[28.6,10.1],[29.8,9.4],[31.0,8.9],[32.3,8.3],[33.5,7.8],[34.8,7.4],[36.0,7.0],[37.2,6.6],[38.5,6.3],[39.7,6.1],[41.0,5.9],[42.3,5.7],[43.6,5.6],[44.8,5.5],[46.1,5.5],[47.4,5.5],[48.6,5.6],[49.8,5.8],[51.0,6.0],[52.2,6.3],[53.3,6.6],[54.5,7.0],[55.7,7.5],[56.8,8.0],[57.9,8.6],[59.0,9.2],[60.1,9.9],[61.1,10.6],[62.1,11.3],[63.1,12.1],[64.0,13.0],[64.9,13.9],[65.7,14.9],[66.5,15.9],[67.3,16.9],[68.1,18.0],[68.8,19.2],[69.5,20.4],[70.1,21.6],[70.7,22.9],[71.2,24.2],[71.6,25.6],[72.0,27.0],[72.3,28.5],[72.5,30.0],[72.7,31.6],[72.7,33.3],[72.8,35.0],[72.8,36.8],[72.7,38.5],[72.6,40.3],[72.5,42.0],[72.3,43.7],[72.2,45.4],[72.0,47.0],[71.8,48.6],[71.6,50.2],[71.3,51.7],[71.0,53.3],[70.7,54.8],[70.3,56.4],[69.9,57.9],[69.6,59.4],[69.2,60.8],[68.8,62.3],[68.4,63.6],[68.0,65.0],[67.6,66.3],[67.2,67.7],[66.8,69.0],[66.4,70.3],[66.0,71.5],[65.6,72.8],[65.1,73.9],[64.7,75.1],[64.3,76.2],[63.8,77.2],[63.4,78.1],[63.0,79.0],[62.5,79.8],[62.0,80.5],[61.5,81.2],[60.9,81.9],[60.4,82.4],[59.8,82.9],[59.3,83.4],[58.9,83.8],[58.5,84.2],[58.2,84.5],[58.0,84.8],[58.0,85.0],[58.1,85.2],[58.3,85.2],[58.7,85.2],[59.1,85.1],[59.6,85.0],[60.2,84.9],[60.8,84.7],[61.4,84.5],[62.1,84.3],[62.8,84.2],[63.4,84.1],[64.0,84.0],[64.6,84.0],[65.2,84.0],[65.9,84.0],[66.6,84.0],[67.3,84.0],[68.0,84.0],[68.7,84.0],[69.4,84.0],[70.1,84.0],[70.8,84.0],[71.4,84.0],[72.0,84.0],[72.6,83.9],[73.2,83.9],[73.8,83.8],[74.4,83.7],[74.9,83.6],[75.5,83.5],[76.0,83.4],[76.5,83.3],[77.0,83.2],[77.4,83.1],[77.7,83.1],[78,83]] }
    },
    {
      id: "scurmay_a_trazo", tipo: "trazo",
      titulo: "Trazamos la A cursiva mayúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la A cursiva mayúscula, despacito y sin levantar el lápiz.",
      audio: "audio/scurmay_a_instruccion.mp3",
      libre: false,
      fondoLetra: "A",
      caminos: [ { puntos: [[64.0,84.0],[63.7,84.3],[63.3,84.6],[62.9,85.0],[62.4,85.4],[61.9,85.9],[61.4,86.4],[60.8,86.9],[60.1,87.4],[59.4,87.8],[58.7,88.3],[57.9,88.7],[57.0,89.0],[56.1,89.3],[55.1,89.6],[54.0,89.9],[52.9,90.2],[51.7,90.5],[50.5,90.7],[49.3,90.9],[48.0,91.0],[46.7,91.1],[45.5,91.2],[44.2,91.1],[43.0,91.0],[41.8,90.8],[40.5,90.6],[39.2,90.3],[37.9,89.9],[36.6,89.5],[35.2,89.1],[33.9,88.5],[32.7,88.0],[31.4,87.3],[30.2,86.6],[29.1,85.8],[28.0,85.0],[27.0,84.1],[26.0,83.1],[25.1,82.0],[24.1,80.8],[23.3,79.5],[22.4,78.2],[21.6,76.9],[20.9,75.6],[20.1,74.2],[19.4,72.8],[18.7,71.4],[18.0,70.0],[17.3,68.6],[16.7,67.2],[16.0,65.8],[15.4,64.3],[14.8,62.9],[14.2,61.4],[13.7,59.9],[13.3,58.3],[12.8,56.8],[12.5,55.2],[12.2,53.6],[12.0,52.0],[11.9,50.3],[11.8,48.6],[11.8,46.8],[11.9,45.0],[12.0,43.2],[12.1,41.4],[12.3,39.5],[12.6,37.7],[12.9,36.0],[13.2,34.2],[13.6,32.6],[14.0,31.0],[14.4,29.5],[14.9,28.0],[15.4,26.5],[16.0,25.0],[16.6,23.6],[17.2,22.2],[17.9,20.8],[18.7,19.6],[19.4,18.3],[20.2,17.1],[21.1,16.0],[22.0,15.0],[23.0,14.0],[24.0,13.1],[25.1,12.3],[26.2,11.5],[27.4,10.7],[28.6,10.1],[29.8,9.4],[31.0,8.9],[32.3,8.3],[33.5,7.8],[34.8,7.4],[36.0,7.0],[37.2,6.6],[38.5,6.3],[39.7,6.1],[41.0,5.9],[42.3,5.7],[43.6,5.6],[44.8,5.5],[46.1,5.5],[47.4,5.5],[48.6,5.6],[49.8,5.8],[51.0,6.0],[52.2,6.3],[53.3,6.6],[54.5,7.0],[55.7,7.5],[56.8,8.0],[57.9,8.6],[59.0,9.2],[60.1,9.9],[61.1,10.6],[62.1,11.3],[63.1,12.1],[64.0,13.0],[64.9,13.9],[65.7,14.9],[66.5,15.9],[67.3,16.9],[68.1,18.0],[68.8,19.2],[69.5,20.4],[70.1,21.6],[70.7,22.9],[71.2,24.2],[71.6,25.6],[72.0,27.0],[72.3,28.5],[72.5,30.0],[72.7,31.6],[72.7,33.3],[72.8,35.0],[72.8,36.8],[72.7,38.5],[72.6,40.3],[72.5,42.0],[72.3,43.7],[72.2,45.4],[72.0,47.0],[71.8,48.6],[71.6,50.2],[71.3,51.7],[71.0,53.3],[70.7,54.8],[70.3,56.4],[69.9,57.9],[69.6,59.4],[69.2,60.8],[68.8,62.3],[68.4,63.6],[68.0,65.0],[67.6,66.3],[67.2,67.7],[66.8,69.0],[66.4,70.3],[66.0,71.5],[65.6,72.8],[65.1,73.9],[64.7,75.1],[64.3,76.2],[63.8,77.2],[63.4,78.1],[63.0,79.0],[62.5,79.8],[62.0,80.5],[61.5,81.2],[60.9,81.9],[60.4,82.4],[59.8,82.9],[59.3,83.4],[58.9,83.8],[58.5,84.2],[58.2,84.5],[58.0,84.8],[58.0,85.0],[58.1,85.2],[58.3,85.2],[58.7,85.2],[59.1,85.1],[59.6,85.0],[60.2,84.9],[60.8,84.7],[61.4,84.5],[62.1,84.3],[62.8,84.2],[63.4,84.1],[64.0,84.0],[64.6,84.0],[65.2,84.0],[65.9,84.0],[66.6,84.0],[67.3,84.0],[68.0,84.0],[68.7,84.0],[69.4,84.0],[70.1,84.0],[70.8,84.0],[71.4,84.0],[72.0,84.0],[72.6,83.9],[73.2,83.9],[73.8,83.8],[74.4,83.7],[74.9,83.6],[75.5,83.5],[76.0,83.4],[76.5,83.3],[77.0,83.2],[77.4,83.1],[77.7,83.1],[78,83]] } ]
    },

    // --- E cursiva mayúscula ---
    {
      id: "scurmay_e_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la E cursiva mayúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la E cursiva mayúscula.",
      audio: "audio/scurmay_e_demo_narracion.mp3",
      textoAudio: "En cursiva mayúscula, la E se escribe con un rulito arriba y otro más grande abajo, todo en un solo trazo sin levantar el lápiz.",
      fondoLetra: "E",
      camino: { puntos: [[58,28],[52,22],[44,20],[37,23],[33,29],[33,36],[37,41],[44,43],[50,42],[45,45],[38,50],[34,57],[33,65],[36,73],[42,79],[50,81],[57,79],[62,74]] }
    },
    {
      id: "scurmay_e_trazo", tipo: "trazo",
      titulo: "Trazamos la E cursiva mayúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la E cursiva mayúscula, despacito y sin levantar el lápiz.",
      audio: "audio/scurmay_e_instruccion.mp3",
      libre: false,
      fondoLetra: "E",
      caminos: [ { puntos: [[58,28],[52,22],[44,20],[37,23],[33,29],[33,36],[37,41],[44,43],[50,42],[45,45],[38,50],[34,57],[33,65],[36,73],[42,79],[50,81],[57,79],[62,74]] } ]
    },

    // --- I cursiva mayúscula ---
    {
      id: "scurmay_i_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la I cursiva mayúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la I cursiva mayúscula.",
      audio: "audio/scurmay_i_demo_narracion.mp3",
      textoAudio: "En cursiva mayúscula, la I se escribe con un rulito arriba, bajamos derecho, y terminamos con un ganchito abajo.",
      fondoLetra: "I",
      camino: { puntos: [[46,22],[52,20],[57,22],[58,27],[54,30],[48,29],[50,35],[51,45],[51.5,55],[51.5,65],[50.5,73],[47,79],[42,81],[38,78],[37,73]] }
    },
    {
      id: "scurmay_i_trazo", tipo: "trazo",
      titulo: "Trazamos la I cursiva mayúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la I cursiva mayúscula, despacito y sin levantar el lápiz.",
      audio: "audio/scurmay_i_instruccion.mp3",
      libre: false,
      fondoLetra: "I",
      caminos: [ { puntos: [[46,22],[52,20],[57,22],[58,27],[54,30],[48,29],[50,35],[51,45],[51.5,55],[51.5,65],[50.5,73],[47,79],[42,81],[38,78],[37,73]] } ]
    },

    // --- O cursiva mayúscula ---
    {
      id: "scurmay_o_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la O cursiva mayúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la O cursiva mayúscula.",
      audio: "audio/scurmay_o_demo_narracion.mp3",
      textoAudio: "En cursiva mayúscula, la O se escribe con una vuelta redonda grande, sin levantar el lápiz.",
      fondoLetra: "O",
      camino: { puntos: [[50,20],[42,22],[36,28],[32,36],[31,46],[33,56],[38,64],[45,69],[53,70],[60,66],[65,58],[67,48],[65,38],[60,29],[53,22],[50,20],[58,25],[64,30]] }
    },
    {
      id: "scurmay_o_trazo", tipo: "trazo",
      titulo: "Trazamos la O cursiva mayúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la O cursiva mayúscula, despacito y sin levantar el lápiz.",
      audio: "audio/scurmay_o_instruccion.mp3",
      libre: false,
      fondoLetra: "O",
      caminos: [ { puntos: [[50,20],[42,22],[36,28],[32,36],[31,46],[33,56],[38,64],[45,69],[53,70],[60,66],[65,58],[67,48],[65,38],[60,29],[53,22],[50,20],[58,25],[64,30]] } ]
    },

    // --- U cursiva mayúscula ---
    {
      id: "scurmay_u_demo", tipo: "trazoDemo",
      titulo: "Mirá cómo se escribe la U cursiva mayúscula",
      instruccion: "Prestá atención al lápiz: te muestra cómo se dibuja la U cursiva mayúscula.",
      audio: "audio/scurmay_u_demo_narracion.mp3",
      textoAudio: "En cursiva mayúscula, la U se escribe con dos jorobas grandes seguidas, sin levantar el lápiz.",
      fondoLetra: "U",
      camino: { puntos: [[6.0,46.0],[6.6,44.5],[7.3,42.4],[8.2,39.9],[9.1,37.1],[10.2,34.1],[11.3,31.0],[12.4,27.9],[13.5,24.9],[14.6,22.1],[15.5,19.6],[16.3,17.5],[17.0,16.0],[17.5,14.8],[18.0,13.9],[18.4,13.1],[18.8,12.6],[19.1,12.3],[19.3,12.1],[19.5,12.2],[19.7,12.5],[19.8,13.0],[19.9,13.8],[20.0,14.8],[20.0,16.0],[20.0,17.6],[19.9,19.6],[19.7,22.1],[19.5,24.8],[19.2,27.8],[18.9,30.9],[18.7,34.0],[18.4,37.2],[18.2,40.2],[18.0,43.1],[18.0,45.7],[18.0,48.0],[18.1,50.0],[18.3,51.8],[18.5,53.6],[18.7,55.1],[19.0,56.6],[19.4,58.1],[19.7,59.4],[20.1,60.7],[20.6,62.0],[21.0,63.3],[21.5,64.6],[22.0,66.0],[22.5,67.4],[23.1,68.9],[23.7,70.4],[24.4,71.9],[25.0,73.4],[25.8,74.9],[26.5,76.2],[27.2,77.5],[27.9,78.7],[28.6,79.6],[29.3,80.4],[30.0,81.0],[30.7,81.4],[31.3,81.7],[32.0,81.9],[32.7,82.0],[33.4,81.9],[34.1,81.8],[34.7,81.4],[35.4,80.9],[36.1,80.2],[36.7,79.3],[37.4,78.3],[38.0,77.0],[38.6,75.5],[39.3,73.6],[39.9,71.6],[40.6,69.3],[41.2,66.8],[41.9,64.2],[42.5,61.6],[43.1,58.8],[43.6,56.0],[44.1,53.3],[44.6,50.6],[45.0,48.0],[45.3,45.3],[45.5,42.5],[45.7,39.5],[45.7,36.4],[45.8,33.3],[45.8,30.2],[45.9,27.2],[45.9,24.4],[46.1,21.8],[46.3,19.5],[46.6,17.6],[47.0,16.0],[47.6,14.8],[48.3,13.8],[49.1,13.0],[50.1,12.4],[51.1,12.1],[52.1,12.0],[53.1,12.1],[54.0,12.4],[54.9,13.0],[55.8,13.8],[56.5,14.8],[57.0,16.0],[57.4,17.6],[57.6,19.6],[57.8,21.9],[57.9,24.6],[57.9,27.5],[57.8,30.5],[57.8,33.6],[57.7,36.7],[57.7,39.8],[57.7,42.8],[57.8,45.5],[58.0,48.0],[58.3,50.3],[58.6,52.6],[58.9,54.8],[59.3,56.9],[59.7,59.0],[60.1,61.0],[60.6,63.0],[61.0,64.9],[61.5,66.8],[62.0,68.6],[62.5,70.3],[63.0,72.0],[63.5,73.7],[64.0,75.4],[64.6,77.1],[65.1,78.8],[65.7,80.4],[66.3,82.0],[66.9,83.4],[67.5,84.7],[68.1,85.9],[68.8,86.8],[69.4,87.5],[70.0,88.0],[70.6,88.2],[71.3,88.1],[72.0,87.8],[72.7,87.3],[73.4,86.6],[74.1,85.8],[74.8,84.8],[75.4,83.9],[76.1,82.8],[76.8,81.8],[77.4,80.9],[78.0,80.0],[78.6,79.1],[79.2,78.1],[79.8,77.0],[80.4,75.9],[80.9,74.7],[81.5,73.5],[82.0,72.4],[82.5,71.3],[83.0,70.2],[83.4,69.4],[83.7,68.6],[84,68]] }
    },
    {
      id: "scurmay_u_trazo", tipo: "trazo",
      titulo: "Trazamos la U cursiva mayúscula",
      instruccion: "Ahora te toca a vos. Seguí con el lápiz la forma de la U cursiva mayúscula, despacito y sin levantar el lápiz.",
      audio: "audio/scurmay_u_instruccion.mp3",
      libre: false,
      fondoLetra: "U",
      caminos: [ { puntos: [[6.0,46.0],[6.6,44.5],[7.3,42.4],[8.2,39.9],[9.1,37.1],[10.2,34.1],[11.3,31.0],[12.4,27.9],[13.5,24.9],[14.6,22.1],[15.5,19.6],[16.3,17.5],[17.0,16.0],[17.5,14.8],[18.0,13.9],[18.4,13.1],[18.8,12.6],[19.1,12.3],[19.3,12.1],[19.5,12.2],[19.7,12.5],[19.8,13.0],[19.9,13.8],[20.0,14.8],[20.0,16.0],[20.0,17.6],[19.9,19.6],[19.7,22.1],[19.5,24.8],[19.2,27.8],[18.9,30.9],[18.7,34.0],[18.4,37.2],[18.2,40.2],[18.0,43.1],[18.0,45.7],[18.0,48.0],[18.1,50.0],[18.3,51.8],[18.5,53.6],[18.7,55.1],[19.0,56.6],[19.4,58.1],[19.7,59.4],[20.1,60.7],[20.6,62.0],[21.0,63.3],[21.5,64.6],[22.0,66.0],[22.5,67.4],[23.1,68.9],[23.7,70.4],[24.4,71.9],[25.0,73.4],[25.8,74.9],[26.5,76.2],[27.2,77.5],[27.9,78.7],[28.6,79.6],[29.3,80.4],[30.0,81.0],[30.7,81.4],[31.3,81.7],[32.0,81.9],[32.7,82.0],[33.4,81.9],[34.1,81.8],[34.7,81.4],[35.4,80.9],[36.1,80.2],[36.7,79.3],[37.4,78.3],[38.0,77.0],[38.6,75.5],[39.3,73.6],[39.9,71.6],[40.6,69.3],[41.2,66.8],[41.9,64.2],[42.5,61.6],[43.1,58.8],[43.6,56.0],[44.1,53.3],[44.6,50.6],[45.0,48.0],[45.3,45.3],[45.5,42.5],[45.7,39.5],[45.7,36.4],[45.8,33.3],[45.8,30.2],[45.9,27.2],[45.9,24.4],[46.1,21.8],[46.3,19.5],[46.6,17.6],[47.0,16.0],[47.6,14.8],[48.3,13.8],[49.1,13.0],[50.1,12.4],[51.1,12.1],[52.1,12.0],[53.1,12.1],[54.0,12.4],[54.9,13.0],[55.8,13.8],[56.5,14.8],[57.0,16.0],[57.4,17.6],[57.6,19.6],[57.8,21.9],[57.9,24.6],[57.9,27.5],[57.8,30.5],[57.8,33.6],[57.7,36.7],[57.7,39.8],[57.7,42.8],[57.8,45.5],[58.0,48.0],[58.3,50.3],[58.6,52.6],[58.9,54.8],[59.3,56.9],[59.7,59.0],[60.1,61.0],[60.6,63.0],[61.0,64.9],[61.5,66.8],[62.0,68.6],[62.5,70.3],[63.0,72.0],[63.5,73.7],[64.0,75.4],[64.6,77.1],[65.1,78.8],[65.7,80.4],[66.3,82.0],[66.9,83.4],[67.5,84.7],[68.1,85.9],[68.8,86.8],[69.4,87.5],[70.0,88.0],[70.6,88.2],[71.3,88.1],[72.0,87.8],[72.7,87.3],[73.4,86.6],[74.1,85.8],[74.8,84.8],[75.4,83.9],[76.1,82.8],[76.8,81.8],[77.4,80.9],[78.0,80.0],[78.6,79.1],[79.2,78.1],[79.8,77.0],[80.4,75.9],[80.9,74.7],[81.5,73.5],[82.0,72.4],[82.5,71.3],[83.0,70.2],[83.4,69.4],[83.7,68.6],[84,68]] } ]
    },

    // --- repaso cursiva mayúscula ---
    {
      id: "s20curmay", tipo: "trazo",
      titulo: "Repasamos las cinco vocales (cursiva mayúscula)",
      instruccion: "Trazá cada vocal siguiendo el puntito, de a una, sin levantar el lápiz.",
      audio: "audio/s20curmay_instruccion.mp3",
      libre: false,
      secuencial: true,
      caminos: [
        { letra: "A", puntos: [[64.0,84.0],[63.7,84.3],[63.3,84.6],[62.9,85.0],[62.4,85.4],[61.9,85.9],[61.4,86.4],[60.8,86.9],[60.1,87.4],[59.4,87.8],[58.7,88.3],[57.9,88.7],[57.0,89.0],[56.1,89.3],[55.1,89.6],[54.0,89.9],[52.9,90.2],[51.7,90.5],[50.5,90.7],[49.3,90.9],[48.0,91.0],[46.7,91.1],[45.5,91.2],[44.2,91.1],[43.0,91.0],[41.8,90.8],[40.5,90.6],[39.2,90.3],[37.9,89.9],[36.6,89.5],[35.2,89.1],[33.9,88.5],[32.7,88.0],[31.4,87.3],[30.2,86.6],[29.1,85.8],[28.0,85.0],[27.0,84.1],[26.0,83.1],[25.1,82.0],[24.1,80.8],[23.3,79.5],[22.4,78.2],[21.6,76.9],[20.9,75.6],[20.1,74.2],[19.4,72.8],[18.7,71.4],[18.0,70.0],[17.3,68.6],[16.7,67.2],[16.0,65.8],[15.4,64.3],[14.8,62.9],[14.2,61.4],[13.7,59.9],[13.3,58.3],[12.8,56.8],[12.5,55.2],[12.2,53.6],[12.0,52.0],[11.9,50.3],[11.8,48.6],[11.8,46.8],[11.9,45.0],[12.0,43.2],[12.1,41.4],[12.3,39.5],[12.6,37.7],[12.9,36.0],[13.2,34.2],[13.6,32.6],[14.0,31.0],[14.4,29.5],[14.9,28.0],[15.4,26.5],[16.0,25.0],[16.6,23.6],[17.2,22.2],[17.9,20.8],[18.7,19.6],[19.4,18.3],[20.2,17.1],[21.1,16.0],[22.0,15.0],[23.0,14.0],[24.0,13.1],[25.1,12.3],[26.2,11.5],[27.4,10.7],[28.6,10.1],[29.8,9.4],[31.0,8.9],[32.3,8.3],[33.5,7.8],[34.8,7.4],[36.0,7.0],[37.2,6.6],[38.5,6.3],[39.7,6.1],[41.0,5.9],[42.3,5.7],[43.6,5.6],[44.8,5.5],[46.1,5.5],[47.4,5.5],[48.6,5.6],[49.8,5.8],[51.0,6.0],[52.2,6.3],[53.3,6.6],[54.5,7.0],[55.7,7.5],[56.8,8.0],[57.9,8.6],[59.0,9.2],[60.1,9.9],[61.1,10.6],[62.1,11.3],[63.1,12.1],[64.0,13.0],[64.9,13.9],[65.7,14.9],[66.5,15.9],[67.3,16.9],[68.1,18.0],[68.8,19.2],[69.5,20.4],[70.1,21.6],[70.7,22.9],[71.2,24.2],[71.6,25.6],[72.0,27.0],[72.3,28.5],[72.5,30.0],[72.7,31.6],[72.7,33.3],[72.8,35.0],[72.8,36.8],[72.7,38.5],[72.6,40.3],[72.5,42.0],[72.3,43.7],[72.2,45.4],[72.0,47.0],[71.8,48.6],[71.6,50.2],[71.3,51.7],[71.0,53.3],[70.7,54.8],[70.3,56.4],[69.9,57.9],[69.6,59.4],[69.2,60.8],[68.8,62.3],[68.4,63.6],[68.0,65.0],[67.6,66.3],[67.2,67.7],[66.8,69.0],[66.4,70.3],[66.0,71.5],[65.6,72.8],[65.1,73.9],[64.7,75.1],[64.3,76.2],[63.8,77.2],[63.4,78.1],[63.0,79.0],[62.5,79.8],[62.0,80.5],[61.5,81.2],[60.9,81.9],[60.4,82.4],[59.8,82.9],[59.3,83.4],[58.9,83.8],[58.5,84.2],[58.2,84.5],[58.0,84.8],[58.0,85.0],[58.1,85.2],[58.3,85.2],[58.7,85.2],[59.1,85.1],[59.6,85.0],[60.2,84.9],[60.8,84.7],[61.4,84.5],[62.1,84.3],[62.8,84.2],[63.4,84.1],[64.0,84.0],[64.6,84.0],[65.2,84.0],[65.9,84.0],[66.6,84.0],[67.3,84.0],[68.0,84.0],[68.7,84.0],[69.4,84.0],[70.1,84.0],[70.8,84.0],[71.4,84.0],[72.0,84.0],[72.6,83.9],[73.2,83.9],[73.8,83.8],[74.4,83.7],[74.9,83.6],[75.5,83.5],[76.0,83.4],[76.5,83.3],[77.0,83.2],[77.4,83.1],[77.7,83.1],[78,83]] },
        { letra: "E", puntos: [[58,28],[52,22],[44,20],[37,23],[33,29],[33,36],[37,41],[44,43],[50,42],[45,45],[38,50],[34,57],[33,65],[36,73],[42,79],[50,81],[57,79],[62,74]] },
        { letra: "I", puntos: [[46,22],[52,20],[57,22],[58,27],[54,30],[48,29],[50,35],[51,45],[51.5,55],[51.5,65],[50.5,73],[47,79],[42,81],[38,78],[37,73]] },
        { letra: "O", puntos: [[50,20],[42,22],[36,28],[32,36],[31,46],[33,56],[38,64],[45,69],[53,70],[60,66],[65,58],[67,48],[65,38],[60,29],[53,22],[50,20],[58,25],[64,30]] },
        { letra: "U", puntos: [[6.0,46.0],[6.6,44.5],[7.3,42.4],[8.2,39.9],[9.1,37.1],[10.2,34.1],[11.3,31.0],[12.4,27.9],[13.5,24.9],[14.6,22.1],[15.5,19.6],[16.3,17.5],[17.0,16.0],[17.5,14.8],[18.0,13.9],[18.4,13.1],[18.8,12.6],[19.1,12.3],[19.3,12.1],[19.5,12.2],[19.7,12.5],[19.8,13.0],[19.9,13.8],[20.0,14.8],[20.0,16.0],[20.0,17.6],[19.9,19.6],[19.7,22.1],[19.5,24.8],[19.2,27.8],[18.9,30.9],[18.7,34.0],[18.4,37.2],[18.2,40.2],[18.0,43.1],[18.0,45.7],[18.0,48.0],[18.1,50.0],[18.3,51.8],[18.5,53.6],[18.7,55.1],[19.0,56.6],[19.4,58.1],[19.7,59.4],[20.1,60.7],[20.6,62.0],[21.0,63.3],[21.5,64.6],[22.0,66.0],[22.5,67.4],[23.1,68.9],[23.7,70.4],[24.4,71.9],[25.0,73.4],[25.8,74.9],[26.5,76.2],[27.2,77.5],[27.9,78.7],[28.6,79.6],[29.3,80.4],[30.0,81.0],[30.7,81.4],[31.3,81.7],[32.0,81.9],[32.7,82.0],[33.4,81.9],[34.1,81.8],[34.7,81.4],[35.4,80.9],[36.1,80.2],[36.7,79.3],[37.4,78.3],[38.0,77.0],[38.6,75.5],[39.3,73.6],[39.9,71.6],[40.6,69.3],[41.2,66.8],[41.9,64.2],[42.5,61.6],[43.1,58.8],[43.6,56.0],[44.1,53.3],[44.6,50.6],[45.0,48.0],[45.3,45.3],[45.5,42.5],[45.7,39.5],[45.7,36.4],[45.8,33.3],[45.8,30.2],[45.9,27.2],[45.9,24.4],[46.1,21.8],[46.3,19.5],[46.6,17.6],[47.0,16.0],[47.6,14.8],[48.3,13.8],[49.1,13.0],[50.1,12.4],[51.1,12.1],[52.1,12.0],[53.1,12.1],[54.0,12.4],[54.9,13.0],[55.8,13.8],[56.5,14.8],[57.0,16.0],[57.4,17.6],[57.6,19.6],[57.8,21.9],[57.9,24.6],[57.9,27.5],[57.8,30.5],[57.8,33.6],[57.7,36.7],[57.7,39.8],[57.7,42.8],[57.8,45.5],[58.0,48.0],[58.3,50.3],[58.6,52.6],[58.9,54.8],[59.3,56.9],[59.7,59.0],[60.1,61.0],[60.6,63.0],[61.0,64.9],[61.5,66.8],[62.0,68.6],[62.5,70.3],[63.0,72.0],[63.5,73.7],[64.0,75.4],[64.6,77.1],[65.1,78.8],[65.7,80.4],[66.3,82.0],[66.9,83.4],[67.5,84.7],[68.1,85.9],[68.8,86.8],[69.4,87.5],[70.0,88.0],[70.6,88.2],[71.3,88.1],[72.0,87.8],[72.7,87.3],[73.4,86.6],[74.1,85.8],[74.8,84.8],[75.4,83.9],[76.1,82.8],[76.8,81.8],[77.4,80.9],[78.0,80.0],[78.6,79.1],[79.2,78.1],[79.8,77.0],[80.4,75.9],[80.9,74.7],[81.5,73.5],[82.0,72.4],[82.5,71.3],[83.0,70.2],[83.4,69.4],[83.7,68.6],[84,68]] }
      ]
    },

    // 21 --------------------------------------------------------
    {
      id: "s21", tipo: "completar",
      titulo: "Completamos con vocales (A y E)",
      instruccion: "Mirá el dibujo, escuchá la palabra y elegí la vocal que falta.",
      audio: "audio/s21_instruccion.mp3",
      items: [
        { palabra: "MANZANA", partes: ["M", "NZANA"], correcta: "A", icono: "🍎", img: "manzana", audio: "audio/s21_manzana.mp3" },
        { palabra: "TAZA", partes: ["T", "ZA"], correcta: "A", icono: "☕", img: "taza", audio: "audio/s21_taza.mp3" },
        { palabra: "CAMA", partes: ["C", "M", ""], correcta: "A", icono: "🛏️", img: "cama", audio: "audio/s21_cama.mp3" },
        { palabra: "PALA", partes: ["P", "LA"], correcta: "A", icono: "🥄", img: "pala", audio: "audio/s21_pala.mp3" },
        { palabra: "MESA", partes: ["M", "SA"], correcta: "E", icono: "🪑", img: "mesa", audio: "audio/s21_mesa.mp3" },
        { palabra: "PERA", partes: ["P", "RA"], correcta: "E", icono: "🍐", img: "pera", audio: "audio/s21_pera.mp3" },
        { palabra: "ABEJA", partes: ["AB", "JA"], correcta: "E", icono: "🐝", img: "abeja", audio: "audio/s21_abeja.mp3" },
        { palabra: "VELA", partes: ["V", "LA"], correcta: "E", icono: "🕯️", img: "vela", audio: "audio/s21_vela.mp3" }
      ],
      opciones: ["A", "E", "I", "O", "U"]
    },

    // 22 --------------------------------------------------------
    {
      id: "s22", tipo: "completar",
      titulo: "Completamos con vocales (I y U)",
      instruccion: "Mirá el dibujo, escuchá la palabra y elegí la vocal que falta.",
      audio: "audio/s22_instruccion.mp3",
      items: [
        { palabra: "PIZZA", partes: ["P", "ZZA"], correcta: "I", icono: "🍕", img: "pizza", audio: "audio/s22_pizza.mp3" },
        { palabra: "PIE", partes: ["P", "E"], correcta: "I", icono: "🦶", img: "pie_humano", audio: "audio/s22_pie.mp3" },
        { palabra: "SILLA", partes: ["S", "LLA"], correcta: "I", icono: "🪑", img: "silla", audio: "audio/s22_silla.mp3" },
        { palabra: "PIPA", partes: ["P", "PA"], correcta: "I", icono: "🎷", img: "pipa_burbujas", audio: "audio/s22_pipa.mp3" },
        { palabra: "LUNA", partes: ["L", "NA"], correcta: "U", icono: "🌙", img: "luna", audio: "audio/s22_luna.mp3" },
        { palabra: "CUNA", partes: ["C", "NA"], correcta: "U", icono: "🛏️", img: "cuna", audio: "audio/s22_cuna.mp3" },
        { palabra: "PUMA", partes: ["P", "MA"], correcta: "U", icono: "🐆", img: "puma", audio: "audio/s22_puma.mp3" },
        { palabra: "JUGO", partes: ["J", "GO"], correcta: "U", icono: "🧃", img: "jugo", audio: "audio/s22_jugo.mp3" }
      ],
      opciones: ["A", "E", "I", "O", "U"]
    },

    // 23 --------------------------------------------------------
    {
      id: "s23", tipo: "completar",
      titulo: "Completamos los animalitos",
      instruccion: "Mirá el dibujo, escuchá la palabra y elegí la vocal que falta.",
      audio: "audio/s23_instruccion.mp3",
      items: [
        { palabra: "AUTO", partes: ["", "UTO"], correcta: "A", icono: "🚗", img: "auto", audio: "audio/s23_auto.mp3" },
        { palabra: "SAPO", partes: ["S", "PO"], correcta: "A", icono: "🐸", img: "sapo", audio: "audio/s23_sapo.mp3" },
        { palabra: "GATO", partes: ["G", "TO"], correcta: "A", icono: "🐱", img: "gato", audio: "audio/s23_gato.mp3" },
        { palabra: "MONO", partes: ["M", "NO"], correcta: "O", icono: "🐵", img: "mono", audio: "audio/s23_mono.mp3" },
        { palabra: "LORO", partes: ["L", "RO"], correcta: "O", icono: "🦜", img: "loro", audio: "audio/s23_loro.mp3" },
        { palabra: "PERRO", partes: ["P", "RRO"], correcta: "E", icono: "🐶", img: "perro", audio: "audio/s23_perro.mp3" }
      ],
      opciones: ["A", "E", "I", "O", "U"]
    },

    // 24 --------------------------------------------------------
    {
      id: "s24", tipo: "oraciones",
      titulo: "Completamos oraciones",
      instruccion: "Escuchá la oración y elegí la palabra que falta.",
      audio: "audio/s24_instruccion.mp3",
      items: [
        { antes: "El", despues: "salta.", correcta: "sapo", opciones: ["sapo", "gato", "mono", "perro"], icono: "🐸", img: "sapo", audio: "audio/s24_o1.mp3", oracionAudio: "audio/s24_o1_completa.mp3" },
        { antes: "El", despues: "toma leche.", correcta: "gato", opciones: ["gato", "sapo", "mono", "pez"], icono: "🐱", img: "gato", audio: "audio/s24_o2.mp3", oracionAudio: "audio/s24_o2_completa.mp3" },
        { antes: "El", despues: "come bananas.", correcta: "mono", opciones: ["mono", "gato", "sapo", "perro"], icono: "🐵", img: "mono", audio: "audio/s24_o3.mp3", oracionAudio: "audio/s24_o3_completa.mp3" },
        { antes: "El", despues: "ladra fuerte.", correcta: "perro", opciones: ["perro", "gato", "sapo", "mono"], icono: "🐶", img: "perro", audio: "audio/s24_o4.mp3", oracionAudio: "audio/s24_o4_completa.mp3" },
        { antes: "Me gustan las", despues: ".", correcta: "uvas", opciones: ["uvas", "peras", "tazas", "sillas"], icono: "🍇", img: "uvas", audio: "audio/s24_o5.mp3", oracionAudio: "audio/s24_o5_completa.mp3" }
      ]
    },

    // 27 (cierre) -------------------------------------------------
    {
      id: "s27", tipo: "cierre",
      titulo: "¡Terminamos!",
      audio: "audio/s27_cierre.mp3",
      img: "chicos_festejando",
      textoAudio: "¡Muy bien! Terminaste todas las actividades. Estás aprendiendo cada día un poquito más."
    }
  ]
};
