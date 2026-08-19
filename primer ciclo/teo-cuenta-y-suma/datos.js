// ============================================================
// TEO CUENTA Y SUMA — Primer Grado — Numeración, sumas y pictogramas
// QueSepanTodos.com — Profe Gustavo Aguilar
// ============================================================

const PERFIL = {
  foto: "img/perfil.jpg",
  nombre: "💻 Informática Educativa · Profe Gustavo Aguilar",
  mail: "profegustaaguilar@gmail.com",
  tagline: "Menos prisa, más vida 🧉🫂"
};

const PACKAGE = {
  titulo: "Teo cuenta y suma",
  audioConteo: n => `audio/conteo_${n}.mp3`, // "uno", "dos", "tres"... hasta 20
  portada: {
    imagen: "img/portada.jpg",
    audio: "audio/portada.mp3",
    titulo: "Teo cuenta y suma",
    subtitulo: "Numeración, sumas y pictogramas — Primer grado"
  },
  cierre: {
    imagen: "img/cierre.jpg",
    audio: "audio/cierre.mp3"
  },
  pantallas: [

    // ---------------- DEMO: CÓMO SE JUEGA EL CAMINO ----------------
    {
      id: "demoCamino", tipo: "demoCamino",
      pasosDemo: 3,
      iconoAnimalito: "img/icono_perro.png",
      audioIntro: "audio/demoCamino_intro.mp3",
      audioCorrecto: "audio/demoCamino_correcto.mp3"
    },

    // ---------------- BLOQUE 1: JUEGO DE LA OCA DE TEO ----------------
    {
      id: "camino1", tipo: "camino",
      animalito: "Perro", iconoAnimalito: "img/icono_perro.png",
      pasos: 6,
      imagenFondo: "img/camino_perro.jpg",
      audioConsigna: "audio/camino1_consigna.mp3",
      audioCorrecto: "audio/camino1_correcto.mp3",
      audioIncorrecto: "audio/camino1_incorrecto.mp3"
    },
    {
      id: "camino2", tipo: "camino",
      animalito: "Gato", iconoAnimalito: "img/icono_gato.png",
      pasos: 9,
      imagenFondo: "img/camino_gato.jpg",
      audioConsigna: "audio/camino2_consigna.mp3",
      audioCorrecto: "audio/camino2_correcto.mp3",
      audioIncorrecto: "audio/camino2_incorrecto.mp3"
    },
    {
      id: "camino3", tipo: "camino",
      animalito: "Pájaro", iconoAnimalito: "img/icono_pajaro.png",
      pasos: 4,
      imagenFondo: "img/camino_pajaro.jpg",
      audioConsigna: "audio/camino3_consigna.mp3",
      audioCorrecto: "audio/camino3_correcto.mp3",
      audioIncorrecto: "audio/camino3_incorrecto.mp3"
    },
    {
      id: "camino4", tipo: "camino",
      animalito: "Conejo", iconoAnimalito: "img/icono_conejo.png",
      pasos: 7,
      imagenFondo: "img/camino_conejo.jpg",
      audioConsigna: "audio/camino4_consigna.mp3",
      audioCorrecto: "audio/camino4_correcto.mp3",
      audioIncorrecto: "audio/camino4_incorrecto.mp3"
    },
    {
      id: "camino5", tipo: "camino",
      animalito: "Tortuga", iconoAnimalito: "img/icono_tortuga.png",
      espejarIcono: true,
      pasos: 12,
      imagenFondo: "img/camino_tortuga.jpg",
      audioConsigna: "audio/camino5_consigna.mp3",
      audioCorrecto: "audio/camino5_correcto.mp3",
      audioIncorrecto: "audio/camino5_incorrecto.mp3"
    },

    // ---------------- DEMO: CÓMO SE CUENTA Y SE ELIGE LA RESPUESTA ----------------
    {
      id: "demoConteo", tipo: "demoConteo",
      imagen: "img/num1_bloques.jpg",
      audioIntro: "audio/demoConteo_intro.mp3",
      audioCorrecto: "audio/demoConteo_correcto.mp3",
      opciones: [
        { texto: "14", correcta: true },
        { texto: "41", correcta: false },
        { texto: "4", correcta: false },
        { texto: "10", correcta: false }
      ],
      puntosConteo: [
        { x: 22.0, y: 85.7 }, { x: 22.0, y: 79.3 }, { x: 22.0, y: 72.9 }, { x: 22.0, y: 66.5 },
        { x: 22.0, y: 60.0 }, { x: 22.0, y: 53.6 }, { x: 22.0, y: 47.2 }, { x: 22.0, y: 40.8 },
        { x: 22.0, y: 34.3 }, { x: 22.0, y: 27.9 },
        { x: 56.6, y: 38.8 }, { x: 79.3, y: 38.1 }, { x: 57.7, y: 78.3 }, { x: 76.3, y: 79.5 }
      ]
    },

    // ---------------- BLOQUE 2: NUMERACIÓN ----------------
    {
      id: "num1", tipo: "opcionMultiple",
      pregunta: "Teo formó este número con decenas y unidades. ¿Cuál es?",
      imagenPregunta: "img/num1_bloques.jpg",
      audioConsigna: "audio/num1_consigna.mp3",
      opciones: [
        { texto: "14", correcta: true, audio: "audio/num1_op_14.mp3" },
        { texto: "41", correcta: false },
        { texto: "4", correcta: false },
        { texto: "10", correcta: false }
      ],
      audioCorrecto: "audio/num1_correcto.mp3",
      audioIncorrecto: "audio/num1_incorrecto.mp3"
    },
    {
      id: "num2", tipo: "opcionMultiple",
      pregunta: "Teo formó otro número. ¿Cuál es?",
      imagenPregunta: "img/num2_bloques.jpg",
      audioConsigna: "audio/num2_consigna.mp3",
      opciones: [
        { texto: "28", correcta: true, audio: "audio/num2_op_28.mp3" },
        { texto: "82", correcta: false },
        { texto: "8", correcta: false },
        { texto: "20", correcta: false }
      ],
      audioCorrecto: "audio/num2_correcto.mp3",
      audioIncorrecto: "audio/num2_incorrecto.mp3"
    },
    {
      id: "num3", tipo: "compararNumeros",
      modo: "mayor",
      pregunta: "Tocá el número MAYOR de cada pareja",
      imagenDecorativa: "img/num3_teo.jpg",
      audioConsigna: "audio/num3_consigna.mp3",
      audioCorrecto: "audio/num3_correcto.mp3",
      audioIncorrecto: "audio/num3_incorrecto.mp3",
      pares: [[13,17],[9,15],[20,18],[6,11]]
    },
    {
      id: "num4", tipo: "compararNumeros",
      modo: "menor",
      pregunta: "Tocá el número MENOR de cada pareja",
      imagenDecorativa: "img/num4_teo.jpg",
      audioConsigna: "audio/num4_consigna.mp3",
      audioCorrecto: "audio/num4_correcto.mp3",
      audioIncorrecto: "audio/num4_incorrecto.mp3",
      pares: [[12,14],[19,9],[16,6],[10,20]]
    },
    {
      id: "num5", tipo: "ordenar",
      pregunta: "Tocá los números en orden, del menor al mayor",
      imagenDecorativa: "img/num5_teo.jpg",
      audioConsigna: "audio/num5_consigna.mp3",
      audioCorrecto: "audio/num5_correcto.mp3",
      audioError: "audio/num5_error.mp3",
      numeros: [15, 3, 19, 8, 12]
    },
    {
      id: "num6", tipo: "opcionMultiple",
      pregunta: "El número 16 se puede formar así:",
      imagenPregunta: "img/num6_bloques.jpg",
      audioConsigna: "audio/num6_consigna.mp3",
      opciones: [
        { texto: "10 + 6", correcta: true, audio: "audio/num6_op_a.mp3" },
        { texto: "1 + 6", correcta: false },
        { texto: "10 + 16", correcta: false },
        { texto: "6 + 10 + 10", correcta: false }
      ],
      audioCorrecto: "audio/num6_correcto.mp3",
      audioIncorrecto: "audio/num6_incorrecto.mp3"
    },

    // ---------------- BLOQUE 3: SUMAS SIMPLES ----------------
    {
      id: "suma1", tipo: "opcionMultiple",
      pregunta: "Teo juntó 5 manzanas y le regalaron 3 más. ¿Cuántas tiene?",
      imagenPregunta: "img/suma1_manzanas.jpg",
      audioConsigna: "audio/suma1_consigna.mp3",
      opciones: [
        { texto: "8", correcta: true, audio: "audio/suma1_op_8.mp3" },
        { texto: "7", correcta: false },
        { texto: "9", correcta: false },
        { texto: "2", correcta: false }
      ],
      audioCorrecto: "audio/suma1_correcto.mp3",
      audioIncorrecto: "audio/suma1_incorrecto.mp3"
    },
    {
      id: "suma2", tipo: "opcionMultiple",
      pregunta: "7 + 6 = ?",
      imagenPregunta: "img/suma2_apoyo.jpg",
      audioConsigna: "audio/suma2_consigna.mp3",
      opciones: [
        { texto: "13", correcta: true, audio: "audio/suma2_op_13.mp3" },
        { texto: "12", correcta: false },
        { texto: "14", correcta: false },
        { texto: "1", correcta: false }
      ],
      audioCorrecto: "audio/suma2_correcto.mp3",
      audioIncorrecto: "audio/suma2_incorrecto.mp3"
    },
    {
      id: "suma3", tipo: "opcionMultiple",
      pregunta: "9 + 4 = ?",
      imagenPregunta: "img/suma3_apoyo.jpg",
      audioConsigna: "audio/suma3_consigna.mp3",
      opciones: [
        { texto: "13", correcta: true, audio: "audio/suma3_op_13.mp3" },
        { texto: "12", correcta: false },
        { texto: "5", correcta: false },
        { texto: "14", correcta: false }
      ],
      audioCorrecto: "audio/suma3_correcto.mp3",
      audioIncorrecto: "audio/suma3_incorrecto.mp3"
    },
    {
      id: "suma4", tipo: "opcionMultiple",
      pregunta: "12 + 5 = ?",
      imagenPregunta: "img/suma4_apoyo.jpg",
      audioConsigna: "audio/suma4_consigna.mp3",
      opciones: [
        { texto: "17", correcta: true, audio: "audio/suma4_op_17.mp3" },
        { texto: "16", correcta: false },
        { texto: "7", correcta: false },
        { texto: "18", correcta: false }
      ],
      audioCorrecto: "audio/suma4_correcto.mp3",
      audioIncorrecto: "audio/suma4_incorrecto.mp3"
    },
    {
      id: "suma5", tipo: "opcionMultiple",
      pregunta: "8 + 8 = ?",
      imagenPregunta: "img/suma5_apoyo.jpg",
      audioConsigna: "audio/suma5_consigna.mp3",
      opciones: [
        { texto: "16", correcta: true, audio: "audio/suma5_op_16.mp3" },
        { texto: "15", correcta: false },
        { texto: "17", correcta: false },
        { texto: "0", correcta: false }
      ],
      audioCorrecto: "audio/suma5_correcto.mp3",
      audioIncorrecto: "audio/suma5_incorrecto.mp3"
    },
    {
      id: "suma6", tipo: "opcionMultiple",
      pregunta: "6 + 9 = ?",
      imagenPregunta: "img/suma6_apoyo.jpg",
      audioConsigna: "audio/suma6_consigna.mp3",
      opciones: [
        { texto: "15", correcta: true, audio: "audio/suma6_op_15.mp3" },
        { texto: "14", correcta: false },
        { texto: "16", correcta: false },
        { texto: "3", correcta: false }
      ],
      audioCorrecto: "audio/suma6_correcto.mp3",
      audioIncorrecto: "audio/suma6_incorrecto.mp3"
    },
    {
      id: "suma7", tipo: "opcionMultiple",
      pregunta: "Teo juntó 8 piedritas y luego encontró 5 más. ¿Cuántas piedritas tiene?",
      imagenPregunta: "img/suma7_piedritas.jpg",
      audioConsigna: "audio/suma7_consigna.mp3",
      opciones: [
        { texto: "13", correcta: true, audio: "audio/suma7_op_13.mp3" },
        { texto: "12", correcta: false },
        { texto: "14", correcta: false },
        { texto: "3", correcta: false }
      ],
      audioCorrecto: "audio/suma7_correcto.mp3",
      audioIncorrecto: "audio/suma7_incorrecto.mp3"
    },

    // ---------------- BLOQUE 4: PICTOGRAMAS ----------------
    {
      id: "pict1", tipo: "opcionMultiple",
      pregunta: "Observá el gráfico. ¿Qué animalito visitó MÁS veces el consultorio?",
      imagenPregunta: "img/pict1_grafico_animalitos.jpg",
      audioConsigna: "audio/pict1_consigna.mp3",
      opciones: [
        { texto: "Pájaro", correcta: true, audio: "audio/pict1_op_pajaro.mp3", icono: "img/icono_pajaro.png" },
        { texto: "Conejo", correcta: false, icono: "img/icono_conejo.png" },
        { texto: "Gato", correcta: false, icono: "img/icono_gato.png" },
        { texto: "Perro", correcta: false, icono: "img/icono_perro.png" }
      ],
      audioCorrecto: "audio/pict1_correcto.mp3",
      audioIncorrecto: "audio/pict1_incorrecto.mp3"
    },
    {
      id: "pict2", tipo: "opcionMultiple",
      pregunta: "En el mismo gráfico, ¿qué animalito visitó MENOS veces el consultorio?",
      imagenPregunta: "img/pict1_grafico_animalitos.jpg",
      audioConsigna: "audio/pict2_consigna.mp3",
      opciones: [
        { texto: "Conejo", correcta: true, audio: "audio/pict2_op_conejo.mp3", icono: "img/icono_conejo.png" },
        { texto: "Pájaro", correcta: false, icono: "img/icono_pajaro.png" },
        { texto: "Gato", correcta: false, icono: "img/icono_gato.png" },
        { texto: "Tortuga", correcta: false, icono: "img/icono_tortuga.png" }
      ],
      audioCorrecto: "audio/pict2_correcto.mp3",
      audioIncorrecto: "audio/pict2_incorrecto.mp3"
    },
    {
      id: "pict3", tipo: "opcionMultiple",
      pregunta: "Mirá la Encuesta de frutas. ¿Cuál fue la fruta MÁS votada?",
      imagenPregunta: "img/pict3_grafico_frutas.jpg",
      audioConsigna: "audio/pict3_consigna.mp3",
      opciones: [
        { texto: "Bananas", correcta: true, audio: "audio/pict3_op_bananas.mp3", icono: "img/icono_banana.png" },
        { texto: "Uvas", correcta: false, icono: "img/icono_uva.png" },
        { texto: "Naranjas", correcta: false, icono: "img/icono_naranja.png" },
        { texto: "Duraznos", correcta: false, icono: "img/icono_durazno.png" }
      ],
      audioCorrecto: "audio/pict3_correcto.mp3",
      audioIncorrecto: "audio/pict3_incorrecto.mp3"
    },
    {
      id: "pict4_perros", tipo: "pictogramaCompletar",
      pregunta: "Contá los perros y colocá el número exacto",
      audioConsigna: "audio/pict4_consigna.mp3",
      audioCorrecto: "audio/pict4_correcto.mp3",
      audioIncorrecto: "audio/pict4_incorrecto.mp3",
      categorias: [
        { nombre: "Perros", icono: "img/icono_perro.png", cantidad: 6 }
      ]
    },
    {
      id: "pict4_gatos", tipo: "pictogramaCompletar",
      pregunta: "Contá los gatos y colocá el número exacto",
      audioConsigna: "audio/pict4_consigna.mp3",
      audioCorrecto: "audio/pict4_correcto.mp3",
      audioIncorrecto: "audio/pict4_incorrecto.mp3",
      categorias: [
        { nombre: "Gatos", icono: "img/icono_gato.png", cantidad: 5 }
      ]
    },
    {
      id: "pict4_pajaros", tipo: "pictogramaCompletar",
      pregunta: "Contá los pájaros y colocá el número exacto",
      audioConsigna: "audio/pict4_consigna.mp3",
      audioCorrecto: "audio/pict4_correcto.mp3",
      audioIncorrecto: "audio/pict4_incorrecto.mp3",
      categorias: [
        { nombre: "Pájaros", icono: "img/icono_pajaro.png", cantidad: 3 }
      ]
    },
    {
      id: "pict4_conejos", tipo: "pictogramaCompletar",
      pregunta: "Contá los conejos y colocá el número exacto",
      audioConsigna: "audio/pict4_consigna.mp3",
      audioCorrecto: "audio/pict4_correcto.mp3",
      audioIncorrecto: "audio/pict4_incorrecto.mp3",
      categorias: [
        { nombre: "Conejos", icono: "img/icono_conejo.png", cantidad: 4 }
      ]
    },
    {
      id: "pict4_tortugas", tipo: "pictogramaCompletar",
      pregunta: "Contá las tortugas y colocá el número exacto",
      audioConsigna: "audio/pict4_consigna.mp3",
      audioCorrecto: "audio/pict4_correcto.mp3",
      audioIncorrecto: "audio/pict4_incorrecto.mp3",
      categorias: [
        { nombre: "Tortugas", icono: "img/icono_tortuga.png", cantidad: 5 }
      ]
    },
    {
      id: "pict5", tipo: "opcionMultiple",
      pregunta: "Según el gráfico que armaste, ¿cuántos perros hay más que pájaros?",
      imagenPregunta: "img/pict5_comparar.jpg",
      audioConsigna: "audio/pict5_consigna.mp3",
      opciones: [
        { texto: "3", correcta: true, audio: "audio/pict5_op_3.mp3" },
        { texto: "2", correcta: false },
        { texto: "9", correcta: false },
        { texto: "6", correcta: false }
      ],
      audioCorrecto: "audio/pict5_correcto.mp3",
      audioIncorrecto: "audio/pict5_incorrecto.mp3"
    }  ]
};
