window.DATOS = {
  meta: { titulo: "Armando Palabras", subtitulo: "Primer Ciclo", area: "Prácticas del Lenguaje", mail: "profegustaaguilar@gmail.com", foto: "profe.jpg", fotoMini: "profe_mini.jpg", puntosPorAcierto: 10, revision: false },
  audios: {
    portada: "¡Hola! Vamos a armar palabras. ¡Empecemos!",
    a1_instr: "Hacé clic sobre el nombre del dibujo.",
    a1_ok: "¡Muy bien!",
    a1_err: "Ese no es el nombre. Volvé a intentar.",
    a2_instr: "Armá la palabra tocando las sílabas en orden.",
    a2_ok: "¡Excelente!",
    a2_err: "Ese no es el orden. Volvé a intentar.",
    a3_instr: "Escribí el nombre del dibujo usando las letras. Cuando termines, presioná verificar.",
    a3_ok: "¡Muy bien! Escribiste la palabra correctamente.",
    a3_err: "Todavía no es. Revisá las letras y volvé a intentar.",
    cierre: "¡Muy bien! Terminaste de armar todas las palabras. ¡Hasta la próxima!",
    
    // Audios originales
    pato: "pato", luna: "luna", sopa: "sopa", vela: "vela", lata: "lata", nube: "nube", gato: "gato", sapo: "sapo", vaca: "vaca",
    helado: "helado", conejo: "conejo", titere: "títere", tetera: "tetera", maceta: "maceta", tijera: "tijera",
    gusano: "gusano", pecera: "pecera", mamadera: "mamadera", lapiz: "lápiz", abeja: "abeja", limon: "limón",
    muy_bien: "¡Muy bien!"
  },
  pantallas: [
    { tipo: "portada" },
    { 
      tipo: "opcionMultiple", audioInstr: "a1_instr", 
      items: [
        { imagen: "img/pato.gif", opciones: ["mato","pato","gato"], correcta: "pato", audioOk: "pato", audioErr: "a1_err" },
        { imagen: "img/luna.gif", opciones: ["puma","luna","lupa"], correcta: "luna", audioOk: "luna", audioErr: "a1_err" },
        { imagen: "img/sopa.gif", opciones: ["sapo","sopa","saco"], correcta: "sopa", audioOk: "sopa", audioErr: "a1_err" },
        { imagen: "img/vela.gif", opciones: ["vida","vela","veta"], correcta: "vela", audioOk: "vela", audioErr: "a1_err" },
        { imagen: "img/lata.gif", opciones: ["mata","lata","nata"], correcta: "lata", audioOk: "lata", audioErr: "a1_err" },
        { imagen: "img/nube.gif", opciones: ["sube","nube","tuve"], correcta: "nube", audioOk: "nube", audioErr: "a1_err" },
        { imagen: "img/gato.gif", opciones: ["mato","gato","pato"], correcta: "gato", audioOk: "gato", audioErr: "a1_err" },
        { imagen: "img/sapo.gif", opciones: ["saco","sapo","sopa"], correcta: "sapo", audioOk: "sapo", audioErr: "a1_err" },
        { imagen: "img/vaca.gif", opciones: ["bata","vaca","vaso"], correcta: "vaca", audioOk: "vaca", audioErr: "a1_err" }
      ]
    },
    { 
      tipo: "ordenar", audioInstr: "a2_instr", 
      items: [
        { imagen: "img/helado.gif", palabras: ["he","la","do"], oracionAudio: "helado", audioErr: "a2_err" },
        { imagen: "img/conejo.gif", palabras: ["co","ne","jo"], oracionAudio: "conejo", audioErr: "a2_err" },
        { imagen: "img/titere.gif", palabras: ["tí","te","re"], oracionAudio: "titere", audioErr: "a2_err" },
        { imagen: "img/tetera.gif", palabras: ["te","te","ra"], oracionAudio: "tetera", audioErr: "a2_err" },
        { imagen: "img/maceta.gif", palabras: ["ma","ce","ta"], oracionAudio: "maceta", audioErr: "a2_err" },
        { imagen: "img/tijera.gif", palabras: ["ti","je","ra"], oracionAudio: "tijera", audioErr: "a2_err" }
      ]
    },
    { 
      tipo: "escribirPalabra", audioInstr: "a3_instr", 
      items: [
        { imagen: "img/gusano.gif", palabra: "gusano", audioPregunta: "gusano", audioOk: "a3_ok", audioErr: "a3_err" },
        { imagen: "img/pecera.gif", palabra: "pecera", audioPregunta: "pecera", audioOk: "a3_ok", audioErr: "a3_err" },
        { imagen: "img/mamadera.gif", palabra: "mamadera", audioPregunta: "mamadera", audioOk: "a3_ok", audioErr: "a3_err" },
        { imagen: "img/lapiz.gif", palabra: "lápiz", audioPregunta: "lapiz", audioOk: "a3_ok", audioErr: "a3_err" },
        { imagen: "img/abeja.gif", palabra: "abeja", audioPregunta: "abeja", audioOk: "a3_ok", audioErr: "a3_err" },
        { imagen: "img/limon.gif", palabra: "limón", audioPregunta: "limon", audioOk: "a3_ok", audioErr: "a3_err" }
      ]
    },
    { tipo: "cierre" }
  ]
};