// Genera manifest_audio.json y manifest_imagenes.json a partir de datos.js,
// para que los nombres de archivo coincidan siempre exactamente con lo que
// usa el paquete. Correr con: node build_manifests.js

global.window = undefined;
const fs = require("fs");
const path = require("path");

const codigo = fs.readFileSync(path.join(__dirname, "datos.js"), "utf-8");
// eslint-disable-next-line no-eval
eval(codigo);

const audio = {}; // ruta -> texto a locutar
const imagenes = {}; // ruta -> descripción / prompt

function addAudio(ruta, texto) {
  if (!ruta) return;
  if (audio[ruta] && audio[ruta] !== texto) {
    console.warn(`AVISO: "${ruta}" ya tenía texto distinto:\n  antes: ${audio[ruta]}\n  ahora: ${texto}`);
  }
  audio[ruta] = texto;
}

function addImagen(ruta, descripcion) {
  if (!ruta) return;
  imagenes[ruta] = descripcion;
}

function quitarPuntoFinal(s) {
  return s.replace(/\.$/, "");
}

// Texto acumulado de una oración armada de a palabras: "El", "El foco",
// "El foco es", "El foco es amarillo." — usado por dictado, pintar y
// ordenar, que arman la oración tocando palabras mezcladas y van leyendo
// cada renglón cada vez más largo.
function textosAcumulados(items) {
  const res = [];
  for (let i = 0; i < items.length; i++) {
    res.push(items.slice(0, i + 1).map((it) => it.texto).join(" "));
  }
  return res;
}

// DATOS.meta.audioCorrecto y DATOS.meta.audioError son sonidos (tonos de
// acierto/error), no voz locutada por gTTS/Colab — se generan aparte (ver
// LEEME.md) y por eso NO entran en este manifiesto.

// DATOS.meta.audioPaleta SÍ es locución (gTTS), se agrega acá una sola
// vez porque es un audio compartido por todas las pantallas de "pintar",
// no algo por pantalla.
if (DATOS.meta && DATOS.meta.audioPaleta) {
  addAudio(DATOS.meta.audioPaleta, "Ahora elegí el color y pintá.");
}

DATOS.pantallas.forEach((p) => {
  switch (p.tipo) {
    case "portada":
      addImagen(p.imagen, `Portada ilustrada para un cuadernillo interactivo de alfabetización inicial. Título: "${p.titulo}". Subtítulo: "${p.subtitulo}". Estilo cálido, cercano, con elementos de una zona rural productora de melón, uva y tomate (Lavalle, Mendoza, Argentina). Sin texto generado por IA superpuesto (el texto lo agrega el motor aparte).`);
      break;

    case "dictado": {
      addAudio(p.audio, p.consigna);
      // Palabra suelta (banco de palabras mezcladas, antes de ubicarlas).
      p.items.forEach((it) => addAudio(it.audio, quitarPuntoFinal(it.texto)));
      // Renglón acumulado: se escucha cada vez que se ubica una palabra
      // en el lugar correcto, leyendo la oración tal como va quedando.
      const acumulados = textosAcumulados(p.items);
      p.audiosLinea.forEach((ruta, i) => addAudio(ruta, acumulados[i]));
      addAudio(p.oracionAudio, acumulados[acumulados.length - 1]);
      // Imagen que representa la oración, recién visible al terminar de
      // armarla y escucharla completa (no es una pista previa).
      if (p.imagen) {
        addImagen(p.imagen, `Ilustración simple y cálida que representa la oración "${quitarPuntoFinal(acumulados[acumulados.length - 1])}", para un cuadernillo de alfabetización inicial (sirve tanto para adultos como para chicos). Fondo blanco o neutro liso, estilo amigable, sin texto ni marcas de agua en la imagen.`);
      }
      break;
    }

    case "pintar": {
      addAudio(p.audio, p.consigna);
      // En pintar, los "items" (banco de palabras) usan directamente el
      // audio acumulado del renglón (mismo archivo que audiosLinea) — no
      // hay pista de audio por palabra suelta, a propósito, para que se
      // lea la oración completa recién al llegar a cada renglón.
      const acumuladosPintar = textosAcumulados(p.items);
      p.items.forEach((it, i) => addAudio(it.audio, acumuladosPintar[i]));
      p.audiosLinea.forEach((ruta, i) => addAudio(ruta, acumuladosPintar[i]));
      addAudio(p.oracionAudio, p.oracionTexto);
      p.opciones.forEach((op) => addAudio(op.audio, op.nombre));
      addImagen(p.imagenContorno, `Ilustración simple, tipo dibujo para colorear (solo contorno en blanco y negro, sin relleno de color), de: ${quitarPuntoFinal(p.oracionTexto)}. Fondo blanco liso, estilo amigable para alfabetización inicial (sirve tanto para adultos como para chicos), sin texto ni marcas de agua.`);
      addImagen(p.imagenColor, `La misma ilustración, ya coloreada correctamente según la oración "${p.oracionTexto}". Fondo blanco liso, mismo estilo y encuadre que la versión de contorno, sin texto ni marcas de agua.`);
      break;
    }

    case "discriminar":
      addAudio(p.audio, p.consigna);
      // El texto "textoConsigna" se muestra sin audio a propósito (según
      // la consigna del docente), así que NO se agrega al manifiesto de audio.
      // OJO: tanto "imagen" (la escena) como "imagenPintada" (el óvalo
      // verde que se superpone sobre cada manzana acertada) tienen
      // geometría EXACTA (las "zonas" x/y de datos.js dependen de que
      // coincidan pixel a pixel). Van generadas por código
      // (generar_placeholders.py, ya están en assets/img/), NO por IA —
      // si se regeneran con IA las posiciones no van a coincidir y la
      // actividad queda rota. Por eso NO se agregan al manifiesto de
      // imágenes para IA.
      break;

    case "billetes":
      // Aviso de que los montos son bajos a propósito (solo está
      // presente en la primera pantalla del bloque).
      if (p.avisoAudio && p.avisoAudioTexto) addAudio(p.avisoAudio, p.avisoAudioTexto);
      // Audio del título de ESTA pantalla en particular (el monto y el
      // contexto), además de la consigna genérica de cómo se juega.
      if (p.audioTitulo && p.tituloAudioTexto) addAudio(p.audioTitulo, p.tituloAudioTexto);
      // Si hay una versión del texto pensada para locutarse (sin "$",
      // para que gTTS diga "pesos" y no "dólares"), se usa esa; si no,
      // se usa el texto que se ve en pantalla.
      addAudio(p.audio, p.consignaAudioTexto || p.consigna);
      if (p.audioContexto) {
        addAudio(p.audioContexto, p.contextoAudioTexto || p.contexto);
      }
      // Los billetes son fotos reales de pesos argentinos que aportó el
      // docente (no se generan con IA), así que NO se agregan al
      // manifiesto de imágenes.
      break;

    case "ordenar": {
      addAudio(p.audio, p.consigna);
      const ordenados = p.items.slice().sort((a, b) => a.orden - b.orden);
      const acumuladosOrdenar = textosAcumulados(ordenados);
      p.audiosLinea.forEach((ruta, i) => addAudio(ruta, acumuladosOrdenar[i]));
      addAudio(p.oracionAudio, acumuladosOrdenar[acumuladosOrdenar.length - 1]);
      addImagen(p.imagen, `Ilustración simple y cálida que representa la escena de la oración "${acumuladosOrdenar[acumuladosOrdenar.length - 1]}", ambientada en Lavalle (Mendoza, Argentina), zona de cultivo de melón, tomate y vid. Sin texto en la imagen. Sin personas adultas solas en la escena: este material se usa tanto con adultos como con chicos, así que la imagen no debe quedar asociada a un solo público — mejor sin ninguna persona (solo el paisaje y los frutos), o si hay gente, que se vea una familia con chicos y grandes por igual.`);
      break;
    }

    case "sopa":
      addAudio(p.audio, p.consigna);
      // Audio del título de esta sopa en particular (además de la
      // consigna genérica), para anunciar la temática al entrar.
      if (p.audioTitulo && p.tituloAudioTexto) addAudio(p.audioTitulo, p.tituloAudioTexto);
      p.palabras.forEach((pal) => {
        // El audio de cada palabra pronuncia la palabra en sí (se
        // escucha al encontrarla en la sopa). "textoAudio" permite
        // locutar una variante distinta de cómo se ve en la grilla
        // (por ejemplo con tilde), si hace falta.
        addAudio(pal.audio, pal.textoAudio || pal.palabra);
        // "audioDef" locuta la definición que aparece en el panel,
        // justo después de la palabra, al encontrarla.
        if (pal.audioDef) addAudio(pal.audioDef, pal.definicion);
      });
      // La grilla de la sopa de letras se arma en el momento por código
      // (motor.js), no hay imagen que generar.
      break;

    case "concordancia":
      addAudio(p.audio, p.consigna);
      p.nodos.forEach((columna) => {
        columna.forEach((nodo) => {
          addAudio(nodo.audio, nodo.texto);
          if (nodo.imagen) {
            addImagen(nodo.imagen, `Icono simple y claro, tipo pictograma para material educativo de alfabetización inicial, de: "${nodo.texto}". Fondo blanco liso, sin texto, colores planos y contorno definido.`);
          }
        });
      });
      p.oraciones.forEach((or) => addAudio(or.audio, or.texto));
      break;

    case "cierre":
      // Igual que en billetes: si hay una versión hablada sin "$", se
      // usa esa para que gTTS diga "pesos" y no "dólares".
      addAudio(p.audio, p.textoAudio || p.texto);
      // Sin imagen a propósito (el paquete se usa con adultos y con
      // chicos): si en el futuro se le vuelve a poner una, va acá.
      if (p.imagen) {
        addImagen(p.imagen, "Imagen de cierre festiva y cálida para un cuadernillo de alfabetización, celebrando haber completado las actividades. Sin texto en la imagen.");
      }
      break;

    default:
      console.warn("Tipo sin manejar en el manifiesto:", p.tipo);
  }
});

// meta.foto (foto del profe / avatar) — es una foto real, no se genera con
// IA, así que NO se agrega al manifiesto de imágenes.

const manifestAudio = Object.keys(audio).sort().map((ruta) => ({ archivo: ruta, texto: audio[ruta] }));
const manifestImagenes = Object.keys(imagenes).sort().map((ruta) => ({ archivo: ruta, prompt: imagenes[ruta] }));

fs.writeFileSync(path.join(__dirname, "manifest_audio.json"), JSON.stringify(manifestAudio, null, 2), "utf-8");
fs.writeFileSync(path.join(__dirname, "manifest_imagenes.json"), JSON.stringify(manifestImagenes, null, 2), "utf-8");

console.log(`Audio: ${manifestAudio.length} archivos -> manifest_audio.json`);
console.log(`Imágenes: ${manifestImagenes.length} archivos -> manifest_imagenes.json`);
