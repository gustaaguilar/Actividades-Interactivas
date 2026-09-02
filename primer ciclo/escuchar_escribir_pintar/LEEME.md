# Escuchar, escribir y pintar — Primer ciclo, Alfabetización inicial

Paquete interactivo armado con el motor genérico (`datos.js` + `motor.js`),
contextualizado en Lavalle (melón, uva, tomate, cosecha, parral).
Pensado para publicarse como material de alfabetización de primer ciclo,
válido tanto para adultos como para chicos que están aprendiendo a leer y
escribir. 30 pantallas en 7 bloques: dictado armando la oración, escuchar y
pintar, colorear discriminando (solo las manzanas), billetes de pesos
argentinos (5 pantallas), armar oraciones (cosecha/parral/tomate), sopas de
letras (intercaladas después de cada bloque relacionado) y concordancia
(unir con flecha).

## Qué hay en esta carpeta

- `index.html`, `motor.js`, `datos.js` — el paquete en sí. Se abre
  `index.html` y ya funciona.
- `assets/img/` — **todas las imágenes ya son definitivas**, incluidas
  las 8 del bloque de dictado (se generaron con Gemini a partir de los
  prompts de `generar_imagenes_colab.py` y ya están integradas) — ver
  "Estado de las imágenes" más abajo.
- `assets/audio/` — **todo es locución real, no quedan placeholders de
  silencio** — ver "Estado del audio" más abajo.
- `manifest_audio.json` / `manifest_imagenes.json` — la lista exacta y
  actualizada de cada archivo de audio (con el texto a locutar) y de
  imagen (con la descripción/prompt), generada automáticamente desde
  `datos.js` por `build_manifests.js`. Son la fuente de verdad: si cambiás
  algo en `datos.js`, corré `node build_manifests.js` de nuevo y estos dos
  JSON (y los scripts de Colab, ver abajo) se actualizan solos.
- `generar_audio_colab.py` y `generar_imagenes_colab.py` — dos scripts
  autocontenidos, pensados para pegar cada uno en UNA sola celda de Colab
  y correr (no hace falta subir ningún archivo: el texto/los prompts ya
  están adentro). El de audio usa gTTS (voz es/com.ar) y comprime cada mp3
  a mono 40kbps con ffmpeg. El de imágenes usa Gemini (modelo
  `gemini-2.5-flash-image`, alias "Nano Banana") — la API key de Gemini se
  pega directo en la variable `API_KEY` al principio del script (la sacás
  gratis en aistudio.google.com/apikey, pero esa cuenta necesita tener
  facturación habilitada porque generar imágenes es pago, unos USD 0,04
  por imagen). Si vas a compartir el archivo con alguien, sacale la key
  antes de mandarlo. Los dos **saltean los archivos que ya existan de
  verdad** (los placeholders pesan poco y se detectan por tamaño, así que
  se regeneran solos sin que haga falta borrar nada a mano), así que
  podés correrlos las veces que hagan falta sin repetir lo ya generado.
  Cada uno descarga su `.zip` al final, para descomprimir sobre
  `assets/audio/` y `assets/img/` respectivamente.
- `build_manifests.js` — regenera `manifest_audio.json` y
  `manifest_imagenes.json` (y de ahí podés volver a generar las listas de
  los scripts de Colab, ver "Si cambiás contenido" más abajo) a partir de
  `datos.js`.
- `generar_placeholders.py` — genera por código (Python + Pillow) las
  imágenes que **tienen que quedarse siempre así**, nunca reemplazarse por
  IA: la escena de manzanas (`escena_manzanas.jpg`) y el óvalo verde que se
  superpone al pintar cada una (`manzana_verde.png`), porque las "zonas"
  clickeables de `datos.js` dependen de coordenadas exactas en esa imagen.
  **Ojo**: correr `generar_placeholders.py` completo (su `main()`) también
  regenera portada, cierre, foto del docente y las frutas con
  placeholders de baja calidad — si volvés a correrlo, hacelo con cuidado
  de no pisar las imágenes definitivas.
- `test_e2e.js` — script de prueba automática (Playwright) que recorre las
  30 pantallas simulando la interacción real de un alumno (arma cada
  oración, pinta, resuelve billetes, une las flechas de concordancia,
  etc.) y chequea que no haya errores en la consola del navegador. Se usó
  para validar este armado; no hace falta correrlo de nuevo salvo que
  cambies el motor.

## Estado del audio: completo

Los 173 archivos que pide `manifest_audio.json` ya son locución real,
incluidos los 8 nuevos de la CUARTA ronda de ajustes (ya integrados):

- `dictado_instr_repeat.mp3` — la consigna corta de las pantallas de
  dictado que no son la primera del bloque, ahora todavía más corta
  (se sacó la explicación de "a medida que acertés vas a escuchar..."
  porque ya se dijo una sola vez en la primera pantalla y sonaba
  repetitiva al escucharse 8 veces).
- `billetes_aviso.mp3` — se escucha una sola vez, al entrar a la
  primera pantalla del bloque de billetes: aclara que los montos son
  bajos a propósito (un ejemplo para practicar la mecánica, no
  precios reales ni actualizados).
- `billete40_titulo.mp3` / `billete40_contexto.mp3`,
  `billete90_titulo.mp3` / `billete90_contexto.mp3` y
  `billete160_titulo.mp3` / `billete160_contexto.mp3` — título y
  contexto de las 3 pantallas de billetes nuevas (ver bloque 4 más
  abajo).

No queda ningún placeholder de silencio pendiente. `generar_audio_colab.py`
sigue funcionando igual si en el futuro agregás contenido nuevo a
`datos.js` (ver "Si cambiás contenido" más abajo): solo genera lo que
falte, saltea lo que ya existe.

`assets/audio/error.mp3` (dos tonos descendentes) y
`assets/audio/acierto.mp3` (dos tonos ascendentes) son sonidos cortos
generados con ffmpeg directamente, no locución — no están en el
manifiesto de audio porque no se generan con gTTS/Colab. Reemplazan al
viejo audio hablado de "¡Correcto!".

Si en algún momento agregás o cambiás contenido en `datos.js`, corré
`node build_manifests.js` de nuevo: te va a mostrar en la consola
cuántos archivos nuevos aparecen en `manifest_audio.json`, y de ahí los
agregás a mano a la lista `AUDIOS` de `generar_audio_colab.py` para
generarlos.

## Estado de las imágenes: completo

Las 8 imágenes del bloque de dictado — `dic_monedas.jpg`,
`dic_pomos.jpg`, `dic_masa.jpg`, `dic_palo.jpg`, `dic_foca.jpg`,
`dic_fideos.jpg`, `dic_foco.jpg` y `dic_falda.jpg` — ya se generaron
con Gemini a partir de los prompts de `generar_imagenes_colab.py` y
están integradas. Cada una representa la ORACIÓN COMPLETA de esa
pantalla (no solo el objeto suelto) — por ejemplo, para "El palo es
duro" se pidió un palo grueso y firme (no cualquier palo), para "Las
monedas son redondas" que se note bien la forma redonda, etc. — y
ninguna tiene la oración (ni ninguna palabra) escrita adentro, porque
ya se ve escrita en la pantalla cuando la imagen aparece como premio.
El mapeo oración → imagen queda comentado arriba de la lista
`IMAGENES` en `generar_imagenes_colab.py`, por si en algún momento
querés regenerar o ajustar alguna.

Todo lo demás sigue siendo la versión final: portada, frutas
(contorno/color), parral y las escenas de "armar oración" salieron de
una generación con IA anterior; los 4 íconos de concordancia
(`ic_sandia.jpg`, `ic_zapato.jpg`, `ic_arboles.jpg`, `ic_casas.jpg`) se
generaron con Gemini en la ronda pasada; los billetes son fotos reales
de pesos argentinos que aportaste; la foto del docente es tu foto
real; y `escena_manzanas.jpg`/`manzana_verde.png` están generadas por
código a propósito (ver más arriba, no tocar).

**Una aclaración sobre cómo pedirle imágenes a Gemini**: cuando el prompt
menciona la oración completa entre comillas (por ejemplo, para pedirle un
dibujo de "El pomelo es amarillo"), a veces el modelo entiende que tiene
que escribir esa frase dentro de la imagen, como si fuera un cartel — y en
alguna prueba hasta agregó un crayón o una paleta ya con el color
correcto, lo cual le arruina la sorpresa a la actividad de pintar. Por eso
los prompts de este script no citan ninguna oración textual y agregan una
instrucción explícita de "sin texto". Si en algún momento pedís más
ilustraciones de este estilo, conviene seguir ese mismo cuidado.

## Los 7 bloques de actividades (y su orden en el paquete)

Cada sopa de letras va intercalada justo después de su bloque
relacionado (no todas juntas al final), para que no sea tan tedioso.

1. **Dictado** (8 pantallas) — se arma la oración tocando las palabras
   mezcladas, sin ninguna pista de audio previa. Cada palabra bien ubicada
   agrega un renglón nuevo (de arriba hacia abajo) y se escucha la oración
   tal como va quedando, cada vez más larga, hasta el renglón final
   completo. Si te equivocás, suena el error y la palabra se queda en el
   banco para reintentar. No lleva imagen de fondo mientras se arma (para
   que no se adivine la respuesta), pero al terminarla y escucharla
   entera aparece una imagen que la representa, y recién ahí se habilita
   "Siguiente". La primera pantalla del bloque (las monedas) tiene la
   consigna completa, con el recordatorio "la primera palabra va con
   mayúscula y la última tiene el punto final" y la explicación de cómo
   se va armando la oración; las otras 7 tienen una consigna bien corta
   ("Tocá las palabras en el orden correcto para armar la oración."),
   para no repetir dos veces la misma explicación larga.
   → **Sopa de letras: palabras del dictado** (1 pantalla) — al
   encontrar cada palabra se escucha la oración completa de esa palabra
   (la misma del dictado, no una definición aparte): por ejemplo, al
   encontrar "foca" se escucha "La foca es negra."
2. **Escuchar y pintar** (6 pantallas) — mismo mecanismo que el dictado
   para armar la oración (sin audio de las oraciones hasta completarlas,
   para que lean); al terminarla se habilita, como premio, la paleta de
   colores para elegir el color correcto y "pintar" el dibujo (cambia a
   la versión coloreada). Apenas aparece la paleta se escucha "Ahora
   elegí el color y pintá". En pantallas anchas (notebook) la paleta
   queda al costado de la oración en vez de abajo, para evitar el
   scroll vertical. El recordatorio de mayúscula/punto final se escucha
   solo en la primera pantalla del bloque (el pomelo).
   → **Sopa de letras: colores** (1 pantalla).
3. **Colorear discriminando** (1 pantalla) — la escena arranca con todas
   las frutas sin pintar (estilo dibujo para colorear); cada manzana
   acertada se pinta de verde de verdad, en su lugar exacto. Tocar otra
   fruta suena el error y no pasa nada más, se puede seguir intentando.
4. **Billetes** (5 pantallas: $70, $130, $40, $90 y $160) — armar un
   monto exacto combinando billetes reales de $10, $20, $50 y $100 (más
   grandes y con forma rectangular, como un billete real, sin el "+"
   adelante del valor para que no confunda con una operación), con
   bandeja, desglose en vivo, botón para sacar el último billete si se
   equivocan, y "Verificar". Al entrar a la PRIMERA pantalla del bloque
   se escucha, antes que nada, un aviso aclarando que los montos son
   bajos a propósito — un ejemplo para practicar la mecánica de armar
   un monto, no precios reales ni actualizados. Después, en cada
   pantalla, se escucha primero su título en particular (por ejemplo
   "Armá 70 pesos: un cajón de duraznos"), después la consigna genérica
   de cómo se juega, y por último el contexto ("En la feria de
   Lavalle..." con el monto a armar, diciendo "pesos", nunca
   "dólares"), con parlante para volver a escuchar el contexto. Al
   verificar, se escucha una devolución completa armada en el momento —
   "Correcto, armaste setenta pesos" o "Te pasaste, llevás noventa
   pesos, son veinte de más", por ejemplo — con la voz del propio
   navegador (no se puede grabar de antemano un audio para cada
   combinación posible de billetes). Los 3 contextos nuevos: un kilo de
   tomates ($40), atar los sarmientos del parral una mañana ($90) y una
   bolsa de melones ($160).
   → **Sopa de letras: el dinero** (1 pantalla).
5. **Armar oraciones** (3 pantallas: cosecha, parral, tomate) — mismo
   mecanismo que el dictado, con imagen de la escena siempre visible. El
   recordatorio de mayúscula/punto final se escucha solo en la primera
   pantalla del bloque (la cosecha).
   → **Sopa de letras: frutas de la cosecha** (1 pantalla).
6. **Sopas de letras** (4 pantallas, una después de cada bloque
   relacionado — ver arriba) — grilla de 10×10 con letras más grandes,
   vocabulario del paquete ubicado horizontal, vertical o en diagonal
   (subiendo o bajando) pero **nunca de derecha a izquierda**. En
   pantallas anchas el panel de palabras a buscar queda al costado de la
   grilla en vez de abajo. Cada sopa anuncia su tema con audio propio al
   entrar, y cada palabra encontrada se escucha junto con su definición.
7. **Concordancia — unir con flecha** (1 pantalla) — se unen con una línea
   el artículo, el sustantivo (con dibujo), el verbo y el predicado (que
   ahora lleva el punto final por escrito), eligiendo género y número
   correcto, hasta armar las 4 oraciones completas ("La sandía es redonda
   y calada.", etc.). Cada nodo se escucha al tocarlo, sin el sonido de
   "Correcto" en cada unión parcial (quedaba confuso mezclado con las
   palabras); ese sonido ahora suena una sola vez, al completar cada
   oración entera, seguido de su audio completo. Si tocás una palabra que
   no concuerda, se escucha esa misma palabra (en vez de un sonido de
   error genérico) y vuelve a la selección anterior, para que quede claro
   cuál no encajó. Los recuadros son más chicos y las columnas tienen más
   separación, para que las líneas de unión se vean con claridad. Cada
   oración se traza con un color de línea distinto (uno de 4 colores
   fijos), para poder distinguir de un vistazo qué tramos pertenecen a
   cuál oración cuando hay varias ya armadas. **Se corrigió además el bug
   real de la línea del medio que no se trazaba**: el mecanismo pedía
   tocar dos veces el nodo compartido (sustantivo, verbo) — una vez para
   cerrar la unión anterior y otra para abrir la siguiente —, así que si
   tocabas los 4 nodos de una oración en una sola pasada (artículo,
   sustantivo, verbo, predicado, un toque cada uno), se armaban las
   uniones 1-2 y 3-4 pero la del medio (2-3) quedaba siempre sin
   trazar, y recién se completaba al repetir la unión del medio a
   mano. Ahora, apenas se cierra una unión, el nodo que la cierra queda
   automáticamente seleccionado para continuar la cadena — así, tocar
   los 4 nodos de la oración una sola vez, en orden, arma las 3 uniones
   sin pasos extra. También funciona el otro estilo de uso (tocar cada
   par explícitamente, incluido volver a tocar el nodo compartido):
   ahora tocar de nuevo un nodo ya seleccionado no lo cancela, solo
   repite su audio. "Siguiente" se habilita apenas se completan las 4
   oraciones, sin depender de que termine ningún audio.

La pantalla de **cierre** (después del bloque 7) no lleva ninguna imagen a
propósito: como el paquete se usa tanto con adultos como con chicos, queda
solo el resultado (aciertos, errores, porcentaje), el botón para jugar de
nuevo y tu foto de perfil, que se agranda en un lightbox al tocarla. Los
números del resultado (aciertos/errores/porcentaje) ahora se ven más
grandes, para que se lean bien de un vistazo.

## Cómo seguir

1. Abrí `index.html` para revisar el contenido y el orden de las
   actividades (o serví la carpeta con cualquier servidor estático).
2. Si querés cambiar textos, oraciones o el orden de las pantallas, se
   edita directamente `datos.js`.
3. Corré `node build_manifests.js` para que `manifest_audio.json` y
   `manifest_imagenes.json` reflejen el cambio.
4. Si eso agregó audio nuevo (todo el actual ya está grabado, esto es
   solo para cambios futuros): agregá las entradas nuevas a la lista
   `AUDIOS` de `generar_audio_colab.py` (mismo formato: pares de
   nombre de archivo y texto), pegalo en una celda de Colab, corré, y
   descomprimí el zip sobre `assets/audio/` (va a saltear los archivos
   que ya existan de verdad y solo generar los nuevos).
5. Si agregó imágenes nuevas (todas las actuales ya están generadas,
   también es solo para cambios futuros): sumalas a la lista
   `IMAGENES` de `generar_imagenes_colab.py`, describiendo la escena
   completa (no solo el objeto) y sin pedir texto dentro de la imagen,
   pegalo en Colab, corré, y descomprimí ese zip sobre `assets/img/`.
6. Subilo a tu sitio como siempre.

Cualquier ajuste de contenido, actividades o textos, decímelo y lo edito
directo en `datos.js`.
