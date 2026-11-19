// ============================================================
//  EL MOTOR DE NUESTRO CUERPO: NUTRICIÓN Y ENERGÍA
//  Evaluación integradora · Ciencias Naturales y Lengua · 7° grado
//  QueSepanTodos.com · © 2026 Gustavo Aguilar · CC BY-NC-ND 4.0
// ============================================================
var DATOS = {
  meta: {
    titulo: "El motor de nuestro cuerpo",
    subtitulo: "Evaluación integradora de Ciencias Naturales y Lengua: nutrición y energía",
    etiqueta: "Cs. Naturales y Lengua · Segundo Ciclo · 7° grado",
    grado: "7.° grado · Cs. Naturales y Lengua",
    parte: "Evaluación integradora",
    portada: "img/portada.jpg",
    cierreImg: "img/cierre.jpg",
    firma: "💻 Informática Educativa · Profe Gustavo Aguilar",
    mail: "profegustaaguilar@gmail.com",
    foto: "img/profe.jpg",
    fotoMini: "img/profe_mini.jpg",
    audioPortada: "Evaluación integradora de Ciencias Naturales y Lengua. El motor de nuestro cuerpo: nutrición y energía. Primero vas a leer un texto, y después vas a resolver las actividades. Tocá Comenzar.",
    revision: false
  },

  // Texto completo para releer con el botón 📖 (igual al de la evaluación)
  texto: '<h2>"El motor de nuestro cuerpo: nutrición y energía"</h2>' +
    '<p>El ser humano necesita incorporar diariamente una gran variedad de alimentos para garantizar el correcto funcionamiento de su organismo. Este proceso biológico, conocido como <b>nutrición</b>, abarca mucho más que saciar el apetito: implica transformar los alimentos en nutrientes esenciales mediante la digestión.</p>' +
    '<p>Los <b>macronutrientes</b> cumplen roles fundamentales. Por un lado, los hidratos de carbono —presentes en cereales, legumbres y frutas— actúan como el combustible principal que otorga la energía inmediata necesaria para estudiar, correr y realizar actividades cotidianas. Por otro lado, las proteínas permiten el crecimiento corporal y la reparación de tejidos dañados. Asimismo, las vitaminas y los minerales regulan los procesos metabólicos internos, previniendo diversas enfermedades.</p>' +
    '<p>Sin embargo, en la actualidad, el consumo excesivo de productos ultraprocesados altera este delicado equilibrio. Una dieta desequilibrada genera consecuencias negativas a largo plazo. Por este motivo, los especialistas recomiendan <b>rehidratar</b> el cuerpo constantemente con agua segura y priorizar alimentos frescos. <b>Reorganizar</b> nuestros hábitos alimentarios no solo mejora el rendimiento físico, sino que también potencia la agudeza mental de cada estudiante en el aula.</p>',

  globales: {
    error: "Mmm, esa no es. Volvé a pensarlo y probá otra vez.",
    cruciMal: "Alguna letra no va. Leé otra vez la pista y probá de nuevo.",
    cierre: "¡Terminaste la evaluación integradora! Repasaste la nutrición, los macronutrientes y la importancia del agua segura, y también las clases de palabras, los prefijos y el análisis de oraciones. Ahora enviale tu tarea a tu docente."
  },

  pantallas: [

    // ================= LECTURA =================
    {
      id: "lectura", tipo: "narracion", img: "img/lectura.jpg", esTexto: true,
      titulo: "📖 El motor de nuestro cuerpo",
      inst: "Leé con atención el texto. Después vas a poder releerlo cuando quieras con el botón 📖 Texto.",
      pasos: [
        { ico: "🍽️", etq: "La nutrición", texto: "El ser humano necesita incorporar diariamente una gran variedad de alimentos para garantizar el correcto funcionamiento de su organismo. Este proceso biológico, conocido como nutrición, abarca mucho más que saciar el apetito: implica transformar los alimentos en nutrientes esenciales mediante la digestión." },
        { ico: "🌾", etq: "Hidratos de carbono", texto: "Los macronutrientes cumplen roles fundamentales. Por un lado, los hidratos de carbono —presentes en cereales, legumbres y frutas— actúan como el combustible principal que otorga la energía inmediata necesaria para estudiar, correr y realizar actividades cotidianas." },
        { ico: "💪", etq: "Proteínas", texto: "Por otro lado, las proteínas permiten el crecimiento corporal y la reparación de tejidos dañados." },
        { ico: "🥦", etq: "Vitaminas y minerales", texto: "Asimismo, las vitaminas y los minerales regulan los procesos metabólicos internos, previniendo diversas enfermedades." },
        { ico: "⚠️", etq: "Ultraprocesados", texto: "Sin embargo, en la actualidad, el consumo excesivo de productos ultraprocesados altera este delicado equilibrio. Una dieta desequilibrada genera consecuencias negativas a largo plazo." },
        { ico: "💧", etq: "Agua y hábitos", texto: "Por este motivo, los especialistas recomiendan rehidratar el cuerpo constantemente con agua segura y priorizar alimentos frescos. Reorganizar nuestros hábitos alimentarios no solo mejora el rendimiento físico, sino que también potencia la agudeza mental de cada estudiante en el aula." }
      ]
    },

    // ================= 1) OPCIONES MÚLTIPLES =================
    {
      id: "opciones", tipo: "trivia", img: "img/energia.jpg",
      titulo: "1️⃣ Opciones múltiples",
      inst: "Leé cada pregunta y tocá la respuesta correcta según el texto.",
      preguntas: [
        { q: "¿Cuál es la función principal de los hidratos de carbono según el texto?",
          ops: ["Reparar tejidos dañados.", "Otorgar energía inmediata para las actividades cotidianas.", "Regular los procesos metabólicos internos."], ok: 1,
          conf: "¡Muy bien! Los hidratos de carbono, presentes en cereales, legumbres y frutas, son el combustible principal: dan la energía inmediata para estudiar, correr y hacer las actividades de todos los días." },
        { q: "¿Qué consecuencia genera una dieta desequilibrada basada en productos ultraprocesados según el texto?",
          ops: ["Mejora inmediata del rendimiento físico y mental.", "Consecuencias negativas a largo plazo en el organismo.", "Un incremento acelerado de los hidratos de carbono."], ok: 1,
          conf: "¡Exacto! El consumo excesivo de ultraprocesados altera el equilibrio, y una dieta desequilibrada genera consecuencias negativas a largo plazo." },
        { q: "¿Qué beneficio directo aporta rehidratar el cuerpo constantemente con agua segura y priorizar alimentos frescos?",
          ops: ["Únicamente saciar la sed durante las clases de educación física.", "Mejorar el rendimiento físico y potenciar la agudeza mental en el aula.", "Evitar por completo la necesidad de consumir hidratos de carbono."], ok: 1,
          conf: "¡Correcto! Tomar agua segura, comer alimentos frescos y reorganizar los hábitos mejora el rendimiento físico y potencia la agudeza mental en el aula." }
      ]
    },

    // ================= 2) VERDADERO O FALSO =================
    {
      id: "vf", tipo: "vf", img: "img/frescos_ultra.jpg",
      titulo: "2️⃣ Verdadero o falso",
      inst: "Leé cada afirmación y decidí si es verdadera o falsa.",
      afirmaciones: [
        { t: "El proceso de nutrición abarca únicamente la acción de saciar el apetito biológico.", v: false,
          conf: "¡Falso! Según el texto, la nutrición abarca mucho más que saciar el apetito: implica transformar los alimentos en nutrientes esenciales." },
        { t: "Las vitaminas y los minerales cumplen la función principal de otorgar energía inmediata para correr y estudiar.", v: false,
          conf: "¡Falso! La energía inmediata la dan los hidratos de carbono. Las vitaminas y los minerales regulan los procesos metabólicos internos y previenen enfermedades." },
        { t: "Los productos ultraprocesados ayudan a mantener un equilibrio saludable y potencian la agudeza mental en el aula.", v: false,
          conf: "¡Falso! El consumo excesivo de ultraprocesados altera el equilibrio. Lo que potencia la agudeza mental es el agua segura, los alimentos frescos y los buenos hábitos." },
        { t: "Las palabras \"rehidratar\" y \"reorganizar\" emplean un prefijo que indica repetición o acción hacia atrás o nuevamente.", decir: "Las palabras rehidratar y reorganizar emplean un prefijo que indica repetición, o acción hacia atrás o nuevamente.", v: true,
          conf: "¡Verdadero! El prefijo re indica repetición: rehidratar es volver a hidratar, y reorganizar es volver a organizar." },
        { t: "El proceso de nutrición implica transformar los alimentos en nutrientes esenciales mediante la digestión.", v: true,
          conf: "¡Verdadero! Así lo dice el texto: la nutrición transforma los alimentos en nutrientes esenciales mediante la digestión." }
      ]
    },

    // ================= 3) UNIR CON FLECHAS =================
    {
      id: "unir", tipo: "asociar", img: "img/macronutrientes.jpg",
      titulo: "3️⃣ Unir con flechas",
      inst: "Tocá un nutriente de la izquierda y después su función, a la derecha.",
      pares: [
        { a: "Proteínas", b: "Permiten el crecimiento corporal y la reparación de tejidos.", conf: "Las proteínas permiten el crecimiento corporal y la reparación de los tejidos dañados." },
        { a: "Vitaminas y minerales", b: "Regulan los procesos metabólicos internos.", conf: "Las vitaminas y los minerales regulan los procesos metabólicos internos y previenen enfermedades." },
        { a: "Hidratos de carbono", b: "Actúan como combustible principal de energía.", conf: "Los hidratos de carbono actúan como el combustible principal: dan energía inmediata." }
      ]
    },

    // ================= 4) COMPLETAR LOS ESPACIOS =================
    {
      id: "completar", tipo: "trivia", img: "img/organismo.jpg",
      titulo: "4️⃣ Completar los espacios en blanco",
      inst: "Leé cada oración del texto y tocá la palabra que completa el espacio en blanco.",
      preguntas: [
        { frase: "\"El ser humano necesita incorporar diariamente una gran variedad de alimentos para garantizar el correcto funcionamiento de su _____.\"",
          q: "¿Qué palabra completa la oración?",
          decir: "El ser humano necesita incorporar diariamente una gran variedad de alimentos para garantizar el correcto funcionamiento de su ______. ¿Qué palabra completa la oración?",
          ops: ["organismo", "apetito", "equilibrio", "aula"], ok: 0,
          conf: "¡Muy bien! Organismo: los alimentos garantizan el correcto funcionamiento de todo nuestro cuerpo." },
        { frase: "\"Los hidratos de carbono actúan como el combustible principal que otorga la energía _____ necesaria para estudiar, correr y realizar actividades cotidianas.\"",
          q: "¿Qué palabra completa la oración?",
          decir: "Los hidratos de carbono actúan como el combustible principal que otorga la energía ______ necesaria para estudiar, correr y realizar actividades cotidianas. ¿Qué palabra completa la oración?",
          ops: ["inmediata", "lenta", "mental", "negativa"], ok: 0,
          conf: "¡Exacto! Energía inmediata: la que el cuerpo puede usar enseguida para estudiar y correr." },
        { frase: "\"Por otro lado, las proteínas permiten el crecimiento corporal y la reparación de _____ dañados.\"",
          q: "¿Qué palabra completa la oración?",
          decir: "Por otro lado, las proteínas permiten el crecimiento corporal y la reparación de ______ dañados. ¿Qué palabra completa la oración?",
          ops: ["tejidos", "cereales", "nutrientes", "hábitos"], ok: 0,
          conf: "¡Correcto! Tejidos: las proteínas reparan los tejidos dañados del cuerpo." }
      ]
    },

    // ================= 5) MARCAR LA RESPUESTA CORRECTA =================
    {
      id: "clases", tipo: "trivia", img: "img/lengua.jpg",
      titulo: "5️⃣ Clases de palabras",
      inst: "Mirá la palabra resaltada en cada oración y tocá qué clase de palabra es.",
      preguntas: [
        { frase: "\"Los hidratos de carbono <b>actúan</b> como el combustible principal.\"",
          q: "¿Qué clase de palabra es la resaltada?",
          decir: "En la oración: Los hidratos de carbono actúan como el combustible principal. ¿Qué clase de palabra es la palabra actúan?",
          ops: ["Adjetivo", "Sustantivo común", "Verbo"], ok: 2,
          conf: "¡Muy bien! Actúan es un verbo: indica una acción y está conjugado. Lo hacen los hidratos de carbono." },
        { frase: "\"El ser humano necesita incorporar diariamente una gran variedad de <b>alimentos</b>…\"",
          q: "¿Qué clase de palabra es la resaltada?",
          decir: "En la oración: El ser humano necesita incorporar diariamente una gran variedad de alimentos. ¿Qué clase de palabra es la palabra alimentos?",
          ops: ["Adjetivo", "Verbo", "Sustantivo"], ok: 2,
          conf: "¡Exacto! Alimentos es un sustantivo común: nombra cosas, y está en plural." }
      ]
    },

    // ================= 6) ANÁLISIS SINTÁCTICO =================
    {
      id: "sintaxis", tipo: "trivia", img: "img/sintaxis.jpg",
      titulo: "6️⃣ Análisis sintáctico",
      inst: "Leé cada oración y respondé sobre su análisis sintáctico.",
      preguntas: [
        { frase: "\"El ser humano necesita incorporar diariamente una gran variedad de alimentos.\"",
          q: "Seleccioná cuál es el núcleo del sujeto:",
          decir: "En la oración: El ser humano necesita incorporar diariamente una gran variedad de alimentos. Seleccioná cuál es el núcleo del sujeto.",
          ops: ["necesita", "ser", "incorporar"], ok: 1,
          conf: "¡Muy bien! El sujeto es: el ser humano. Su núcleo es el sustantivo ser; el y humano son modificadores directos. Necesita es el núcleo del predicado." },
        { frase: "\"Los hidratos de carbono actúan como el combustible principal.\"",
          q: "¿Cuál es el núcleo del sujeto expreso simple en esta oración?",
          decir: "En la oración: Los hidratos de carbono actúan como el combustible principal. ¿Cuál es el núcleo del sujeto expreso simple?",
          ops: ["actúan", "combustible", "hidratos"], ok: 2,
          conf: "¡Exacto! El núcleo del sujeto es hidratos. Los es modificador directo y de carbono, modificador indirecto." },
        { frase: "\"Las proteínas permiten <b>el crecimiento corporal</b>.\"",
          q: "¿Qué función sintáctica cumple \"el crecimiento corporal\" dentro del predicado?",
          decir: "En la oración: Las proteínas permiten el crecimiento corporal. ¿Qué función sintáctica cumple el crecimiento corporal, dentro del predicado?",
          ops: ["Objeto directo (O.D.)", "Objeto indirecto (O.I.)", "Predicativo obligatorio"], ok: 0,
          conf: "¡Correcto! Es objeto directo: se puede reemplazar por el pronombre lo. Las proteínas lo permiten." },
        { frase: "\"Una dieta desequilibrada genera consecuencias negativas a largo plazo.\"",
          q: "Señalá cuál es el núcleo del predicado verbal simple:",
          decir: "En la oración: Una dieta desequilibrada genera consecuencias negativas a largo plazo. Señalá cuál es el núcleo del predicado verbal simple.",
          ops: ["dieta", "genera", "consecuencias"], ok: 1,
          conf: "¡Muy bien! El núcleo del predicado es el verbo conjugado genera. Consecuencias negativas es el objeto directo." }
      ]
    },

    // ================= 7) CRUCIGRAMA =================
    {
      id: "crucigrama", tipo: "crucigrama",
      titulo: "7️⃣ Crucigrama: nutrición, salud y lenguaje",
      inst: "Tocá un casillero o un número y escribí con el teclado. Sin tildes.",
      palabras: [
        { w: "SUSTANTIVO", dir: "V", f: 0, c: 1, pista: "Categoría de palabras a la que pertenecen términos como \"humano\", \"alimentos\" o \"energía\".",
          conf: "¡Sustantivo! Humano, alimentos y energía son sustantivos." },
        { w: "ULTRAPROCESADOS", dir: "V", f: 0, c: 6, pista: "Alimentos procesados cuyo consumo excesivo altera el equilibrio nutricional y genera consecuencias negativas.",
          conf: "¡Ultraprocesados! Su consumo excesivo altera el equilibrio nutricional." },
        { w: "NUCLEO", dir: "V", f: 0, c: 9, pista: "Elemento principal de una construcción: en el predicado, es el verbo conjugado.",
          conf: "¡Núcleo! El núcleo del predicado es el verbo conjugado." },
        { w: "PROTEINAS", dir: "V", f: 0, c: 11, pista: "Macronutrientes esenciales que permiten el crecimiento corporal y la reparación de tejidos.",
          conf: "¡Proteínas! Permiten el crecimiento corporal y la reparación de tejidos." },
        { w: "NUTRICION", dir: "H", f: 2, c: 4, pista: "Proceso biológico mediante el cual transformamos los alimentos en nutrientes esenciales gracias a la digestión.",
          conf: "¡Nutrición! Transforma los alimentos en nutrientes esenciales." },
        { w: "AGUA", dir: "V", f: 4, c: 4, pista: "Sustancia líquida, segura y fundamental que debemos priorizar para beber y mantenernos saludables.",
          conf: "¡Agua! Siempre agua segura para mantenernos saludables." },
        { w: "HIDRATOS", dir: "H", f: 7, c: 0, pista: "Componentes fundamentales que otorgan energía inmediata; se encuentran en cereales y frutas.",
          conf: "¡Hidratos! Los hidratos de carbono dan energía inmediata." },
        { w: "PREFIJO", dir: "H", f: 9, c: 4, pista: "Parte invariable de la palabra que se añade antes de la raíz para modificar su significado (como re- en reorganizar).",
          conf: "¡Prefijo! Se agrega antes de la raíz, como re en reorganizar." },
        { w: "REHIDRATAR", dir: "H", f: 12, c: 2, pista: "Acción que se recomienda hacer constantemente con agua segura para mantener el cuerpo hidratado.",
          conf: "¡Rehidratar! Volver a hidratar el cuerpo con agua segura." },
        { w: "TEJIDOS", dir: "H", f: 14, c: 0, pista: "Estructuras biológicas que las proteínas permiten reparar cuando sufren daños en el organismo.",
          conf: "¡Tejidos! Las proteínas reparan los tejidos dañados." }
      ],
      fin: "¡Completaste el crucigrama! Nutrición, salud y lenguaje, todo en un mismo cuadro."
    }
  ]
};
