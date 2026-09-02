# ============================================================
# Generar imágenes - "Escuchar, escribir y pintar"
# Pegá esto en UNA celda de Colab y corré. No hace falta subir
# ningún archivo: los prompts ya están adentro del script.
#
# Usa Gemini (Google), no OpenAI: el modelo de generación de imágenes
# "gemini-2.5-flash-image" (alias "Nano Banana"), a través de una API key
# de Gemini (la sacás gratis en https://aistudio.google.com/apikey — es
# distinta de una cuenta de Google Cloud/Vertex, no hace falta eso).
#
# OJO: generar imágenes con este modelo es pago (no tiene nivel gratis),
# así que la cuenta de Google AI Studio donde saques la key tiene que
# tener facturación habilitada (con algo de crédito cargado). Sale
# alrededor de USD 0,04 por imagen.
#
# Esta lista quedó recortada a lo que hace falta después de la
# tercera ronda de ajustes: portada, frutas, parral, escenas de las
# oraciones de "armar oración" y los 4 íconos de concordancia YA están
# generados y están bien — no hace falta volver a pedírselos a la IA.
# Lo único que falta son estas 8 imágenes del bloque de dictado (una
# por oración), que aparecen recién al terminar de armar y escuchar
# cada oración completa, como premio (no son una pista previa). Ahora
# mismo son un dibujo simple generado por código (un cartel de color
# con el texto de la oración), para que el paquete funcione mientras
# tanto sin ningún 404 — por eso conviene reemplazarlas.
#
# CADA PROMPT REPRESENTA LA ORACIÓN COMPLETA que se arma en esa
# pantalla (no solo el objeto suelto), para que la imagen tenga que
# ver con lo que el alumno acaba de leer:
#   dic_monedas.jpg -> "Las monedas son redondas."
#   dic_pomos.jpg   -> "Los pomos son largos."
#   dic_masa.jpg    -> "La masa es blanca."
#   dic_palo.jpg    -> "El palo es duro."
#   dic_foca.jpg    -> "La foca es negra."
#   dic_fideos.jpg  -> "Los fideos son largos."
#   dic_foco.jpg    -> "El foco es amarillo."
#   dic_falda.jpg   -> "La falda es celeste."
# Y NINGUNO de los 8 prompts pide que la oración (ni ninguna otra
# palabra) quede escrita dentro de la imagen: la oración ya se ve
# armada y escrita en la pantalla cuando aparece esta imagen como
# premio, así que repetirla adentro de la imagen sería redundante (y
# el modelo a veces la escribe mal). Por eso, además de describir la
# escena, cada prompt lleva la instrucción SIN_TEXTO de más abajo.
#
# Si en algún momento agregás una pantalla nueva con una imagen
# nueva, `node build_manifests.js` la va a listar en
# `manifest_imagenes.json`, y de ahí la agregás acá a mano.
#
# OJO también: estos archivos NO se generan con IA, no los agregues a
# esta lista:
#  - "escena_manzanas.jpg" y "manzana_verde.png": tienen coordenadas
#    exactas (zonas clickeables en datos.js) y ya están generadas por
#    código — si las generás con IA, las manzanas van a quedar en otro
#    lugar y la actividad se rompe.
#  - "billete_10.jpg", "billete_20.jpg", "billete_50.jpg" y
#    "billete_100.jpg": son fotos reales de pesos argentinos que
#    aportó el docente.
#  - "profe.jpg": es una foto real del docente.
# ============================================================
!pip install -q -U google-genai pillow

from google import genai
from google.genai import types
from google.colab import files
from PIL import Image
import os, time, shutil, io

# Instrucción común para evitar dos problemas típicos de este modelo:
# mete texto/carteles dentro de la imagen, o agrega elementos que no
# se pidieron. En estas 8 imágenes no hay "respuesta" que se pueda
# arruinar (aparecen recién DESPUÉS de resolver la oración), pero
# igual conviene que salgan limpias, sin texto ni marcas de agua.
SIN_TEXTO = (" Muy importante: la imagen NO debe tener ningún texto, "
             "letra, palabra, número, cartel ni globo de diálogo.")

# (nombre_archivo, prompt) — cada prompt describe la ESCENA de la
# oración completa (objeto + la característica que dice la oración),
# nunca solo el sustantivo suelto.
IMAGENES = [
    # "Las monedas son redondas."
    ("dic_monedas.jpg", "Ilustración simple y cálida de varias monedas apiladas y desparramadas sobre una superficie, mostrando bien clara la forma redonda de cada una, para un cuadernillo de alfabetización inicial (sirve tanto para adultos como para chicos). Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
    # "Los pomos son largos."
    ("dic_pomos.jpg", "Ilustración simple y cálida de varios pomos (tubos) de crema, alargados y finos, apoyados en fila de manera que se note bien que son largos, para un cuadernillo de alfabetización inicial. Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
    # "La masa es blanca."
    ("dic_masa.jpg", "Ilustración simple y cálida de un bollo de masa de pan recién amasada sobre una mesada, de un blanco bien parejo y visible, para un cuadernillo de alfabetización inicial. Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
    # "El palo es duro." — se pide un palo grueso y firme (no uno
    # delgado o flexible como una ramita), para que la escena transmita
    # dureza y no solo forma.
    ("dic_palo.jpg", "Ilustración simple y cálida de un palo de madera grueso, firme y macizo, apoyado de pie contra una pared o clavado en el piso, con aspecto sólido y resistente, transmitiendo que es duro, para un cuadernillo de alfabetización inicial. Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
    # "La foca es negra."
    ("dic_foca.jpg", "Ilustración simple y cálida de una foca de cuerpo completamente negro y brillante, apoyada sobre una roca, para un cuadernillo de alfabetización inicial. Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
    # "Los fideos son largos."
    ("dic_fideos.jpg", "Ilustración simple y cálida de un plato con fideos largos y finos, algunos colgando por el borde del plato o del tenedor para que se note bien su longitud, para un cuadernillo de alfabetización inicial. Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
    # "El foco es amarillo."
    ("dic_foco.jpg", "Ilustración simple y cálida de un foco (lamparita) encendido, con la luz y el vidrio de un amarillo bien intenso y luminoso, para un cuadernillo de alfabetización inicial. Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
    # "La falda es celeste."
    ("dic_falda.jpg", "Ilustración simple y cálida de una falda de color celeste bien visible, colgada de una percha o extendida prolijamente, para un cuadernillo de alfabetización inicial. Fondo blanco o neutro liso, estilo amigable." + SIN_TEXTO),
]

# Pegá tu Gemini API key acá adentro, entre las comillas (la sacás gratis
# en https://aistudio.google.com/apikey). Ojo: si vas a compartir este
# archivo con alguien más, sacá la key antes — queda escrita en texto
# plano.
API_KEY = "PEGÁ-TU-GEMINI-API-KEY-ACÁ"

client = genai.Client(api_key=API_KEY)

def generar_imagen(prompt, ruta):
    respuesta = client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=prompt,
        config=types.GenerateContentConfig(response_modalities=["IMAGE"]),
    )
    for parte in respuesta.candidates[0].content.parts:
        if parte.inline_data is not None:
            # Gemini devuelve PNG; lo pasamos a JPEG (fondo blanco si hay
            # transparencia) para que coincida con la extensión .jpg del
            # nombre de archivo y pese menos.
            img = Image.open(io.BytesIO(parte.inline_data.data))
            if img.mode in ("RGBA", "P"):
                fondo = Image.new("RGB", img.size, (255, 255, 255))
                fondo.paste(img.convert("RGBA"), mask=img.convert("RGBA").split()[3])
                img = fondo
            else:
                img = img.convert("RGB")
            img.save(ruta, "JPEG", quality=90)
            return
    raise RuntimeError("La respuesta no trajo ninguna imagen (puede que el modelo haya rechazado el prompt).")

os.makedirs("assets/img", exist_ok=True)

errores = []
for i, (nombre, prompt) in enumerate(IMAGENES):
    ruta = os.path.join("assets/img", nombre)
    # Salteamos el archivo si ya existe Y no es uno de los placeholders
    # generados por código (que pesan muy poco, menos de 30 KB) — así
    # no hace falta borrar nada a mano.
    if os.path.exists(ruta) and os.path.getsize(ruta) > 30000:
        continue
    try:
        generar_imagen(prompt, ruta)
        print(f"[{i+1}/{len(IMAGENES)}] OK  {nombre}")
    except Exception as e:
        print(f"[{i+1}/{len(IMAGENES)}] ERROR {nombre}: {e}")
        errores.append(nombre)
    time.sleep(0.5)

print()
print("Errores (volvé a correr esta celda para reintentar, no se repite lo ya generado):" if errores else "Sin errores.")
for e in errores:
    print(" -", e)

shutil.make_archive("imagenes_generadas", "zip", root_dir=".", base_dir="assets/img")
files.download("imagenes_generadas.zip")
