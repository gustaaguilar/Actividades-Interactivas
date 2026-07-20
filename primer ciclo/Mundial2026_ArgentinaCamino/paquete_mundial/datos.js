// ============================================================
// DATOS - El camino de Argentina, Mundial 2026 (Segundo Ciclo)
// ============================================================

const PORTADA_MUN = {
  imagen: "imagenes/00_portada_mundial.jpg",
  titulo: "El camino de Argentina",
  subtitulo: "Mundial 2026",
  audioBienvenida: "audios/00_bienvenida_mundial.mp3"
};

// Palabras de las 7 frases-valor (banco compartido)
const P = {
  un:"audios/palabra_un.mp3", buen:"audios/palabra_buen.mp3", comienzo:"audios/palabra_comienzo.mp3",
  se:"audios/palabra_se.mp3", construye:"audios/palabra_construye.mp3", entre:"audios/palabra_entre.mp3",
  todos:"audios/palabra_todos.mp3", el:"audios/palabra_el.mp3", esfuerzo:"audios/palabra_esfuerzo.mp3",
  de:"audios/palabra_de.mp3", cada:"audios/palabra_cada.mp3", dia:"audios/palabra_dia.mp3",
  nos:"audios/palabra_nos.mp3", hace:"audios/palabra_hace.mp3", mejores:"audios/palabra_mejores.mp3",
  cuando:"audios/palabra_cuando.mp3", juegan:"audios/palabra_juegan.mp3", ganan:"audios/palabra_ganan.mp3",
  la:"audios/palabra_la.mp3", perseverancia:"audios/palabra_perseverancia.mp3", vence:"audios/palabra_vence.mp3",
  al:"audios/palabra_al.mp3", cansancio:"audios/palabra_cansancio.mp3", nunca:"audios/palabra_nunca.mp3",
  hay:"audios/palabra_hay.mp3", que:"audios/palabra_que.mp3", bajar:"audios/palabra_bajar.mp3",
  los:"audios/palabra_los.mp3", brazos:"audios/palabra_brazos.mp3", uno:"audios/palabra_uno.mp3",
  suma:"audios/palabra_suma.mp3", su:"audios/palabra_su.mp3", parte:"audios/palabra_parte.mp3",
  equipo:"audios/palabra_equipo.mp3", experiencia:"audios/palabra_experiencia.mp3", guia:"audios/palabra_guia.mp3",
  y:"audios/palabra_y.mp3", responde:"audios/palabra_responde.mp3",
  perder:"audios/palabra_perder.mp3", con:"audios/palabra_con.mp3", orgullo:"audios/palabra_orgullo.mp3",
  tambien:"audios/palabra_tambien.mp3", es:"audios/palabra_es.mp3", una:"audios/palabra_una.mp3",
  forma:"audios/palabra_forma.mp3", ganar:"audios/palabra_ganar.mp3"
};

function frase(texto, claves){
  const palabras = texto.split(" ");
  return palabras.map((p,i)=>({
    texto: (i === palabras.length-1) ? p + "." : p,
    audio: P[claves[i]]
  }));
}

const MALVINAS = {
  imagen: "imagenes/09_malvinas.jpg",
  titulo: "Las Malvinas",
  audioConsigna: "audios/consigna_malvinas.mp3",
  audioFinal: "audios/malvinas_final.mp3",
  juego: { tipo:"rompecabezas", filas:2, columnas:3 }
};

// ---- LOS 7 PARTIDOS ----
const PARTIDOS = [
  {
    id: 1,
    titulo: "Argentina 3 - 0 Argelia",
    subtitulo: "Fase de grupos",
    imagen: "imagenes/01_argelia.jpg",
    audioConsigna: "audios/consigna_a_01.mp3",
    audioNarracion: "audios/narracion_01.mp3",
    juego: { tipo:"rompecabezas", filas:2, columnas:3 },
    fraseValor: frase("Un buen comienzo se construye entre todos", ["un","buen","comienzo","se","construye","entre","todos"])
  },
  {
    id: 2,
    titulo: "Argentina 2 - 0 Austria",
    subtitulo: "Fase de grupos",
    imagen: "imagenes/02_austria.jpg",
    audioConsigna: "audios/consigna_a_02.mp3",
    audioNarracion: "audios/narracion_02.mp3",
    juego: {
      tipo:"identificacion",
      opciones:[
        {texto:"Lionel Messi marcó los dos goles", correcta:true, audio:"audios/opcion_austria_1.mp3"},
        {texto:"Julián Álvarez marcó los goles", correcta:false, audio:"audios/opcion_austria_2.mp3"},
        {texto:"Enzo Fernández marcó los goles", correcta:false, audio:"audios/opcion_austria_3.mp3"}
      ]
    },
    fraseValor: frase("El esfuerzo de cada dia nos hace mejores", ["el","esfuerzo","de","cada","dia","nos","hace","mejores"])
  },
  {
    id: 3,
    titulo: "Argentina 3 - 1 Jordania",
    subtitulo: "Fase de grupos",
    imagen: "imagenes/03_jordania.jpg",
    audioConsigna: "audios/consigna_a_03.mp3",
    audioNarracion: "audios/narracion_03.mp3",
    juego: {
      tipo:"asociacion",
      pares:[
        {a:"Lo Celso", audioA:"audios/jugador_locelso.mp3", b:"Primer gol del partido", audioB:"audios/gol_locelso.mp3"},
        {a:"Lautaro Martínez", audioA:"audios/jugador_lautaro_j.mp3", b:"Convirtió un penal", audioB:"audios/gol_lautaro_j.mp3"},
        {a:"Messi", audioA:"audios/jugador_messi_j.mp3", b:"Cerró el marcador con un tiro libre", audioB:"audios/gol_messi_j.mp3"}
      ]
    },
    fraseValor: frase("Cuando todos juegan todos ganan", ["cuando","todos","juegan","todos","ganan"])
  },
  {
    id: 4,
    titulo: "Argentina 3 - 2 Cabo Verde",
    subtitulo: "Dieciseisavos de final",
    imagen: "imagenes/04_caboverde.jpg",
    audioConsigna: "audios/consigna_a_04.mp3",
    audioNarracion: "audios/narracion_04.mp3",
    juego: { tipo:"sopa", palabras:["PRORROGA","CORNER","ROMERO","MESSI","REMONTADA"] },
    fraseValor: frase("La perseverancia vence al cansancio", ["la","perseverancia","vence","al","cansancio"])
  },
  {
    id: 5,
    titulo: "Argentina 3 - 2 Egipto",
    subtitulo: "Octavos de final",
    imagen: "imagenes/05_egipto.jpg",
    audioConsigna: "audios/consigna_a_05.mp3",
    audioNarracion: "audios/narracion_05.mp3",
    juego: {
      tipo:"memoria",
      pares:[
        {id:1, texto:"Cuti Romero: primer gol de la remontada", audio:"audios/par_romero_egipto.mp3"},
        {id:2, texto:"Messi: gol del empate", audio:"audios/par_messi_egipto.mp3"},
        {id:3, texto:"Enzo Fernández: gol de la clasificación", audio:"audios/par_enzo_egipto.mp3"}
      ]
    },
    fraseValor: frase("Nunca hay que bajar los brazos", ["nunca","hay","que","bajar","los","brazos"])
  },
  {
    id: 6,
    titulo: "Argentina 3 - 1 Suiza",
    subtitulo: "Cuartos de final",
    imagen: "imagenes/06_suiza.jpg",
    audioConsigna: "audios/consigna_a_06.mp3",
    audioNarracion: "audios/narracion_06.mp3",
    juego: { tipo:"rompecabezas", filas:2, columnas:3 },
    fraseValor: frase("Cada uno suma su parte al equipo", ["cada","uno","suma","su","parte","al","equipo"])
  },
  {
    id: 7,
    titulo: "Argentina 2 - 1 Inglaterra",
    subtitulo: "Semifinal",
    imagen: "imagenes/07_inglaterra.jpg",
    audioConsigna: "audios/consigna_a_07.mp3",
    audioNarracion: "audios/narracion_07.mp3",
    juego: {
      tipo:"asociacion",
      pares:[
        {a:"Enzo Fernández", audioA:"audios/jugador_enzo_i.mp3", b:"Puso el empate", audioB:"audios/gol_enzo_i.mp3"},
        {a:"Lautaro Martínez", audioA:"audios/jugador_lautaro_i.mp3", b:"Gol de la clasificación a la final", audioB:"audios/gol_lautaro_i.mp3"},
        {a:"Messi", audioA:"audios/jugador_messi_i.mp3", b:"Dio las dos asistencias", audioB:"audios/gol_messi_i.mp3"}
      ]
    },
    fraseValor: frase("La experiencia guia y el equipo responde", ["la","experiencia","guia","y","el","equipo","responde"])
  },
  {
    id: 8,
    titulo: "España 1 - Argentina 0",
    subtitulo: "Final (tiempo suplementario)",
    imagen: "imagenes/08_final.jpg",
    audioConsigna: "audios/consigna_a_08.mp3",
    audioNarracion: "audios/narracion_08.mp3",
    juego: { tipo:"sopa", palabras:["ESFUERZO","ORGULLO","CORAZON","EQUIPO","FINAL"] },
    fraseValor: frase("Perder con orgullo tambien es una forma de ganar", ["perder","con","orgullo","tambien","es","una","forma","de","ganar"])
  }
];

const AUDIO_CONSIGNA_FRASE = "audios/consigna_frase.mp3";
const AUDIO_CIERRE = "audios/despedida_final.mp3";
const IMAGEN_CIERRE = "imagenes/10_gracias_campeones.jpg";
