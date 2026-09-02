# ============================================================
# Generar audio - "Escuchar, escribir y pintar"
# Pegá esto en UNA celda de Colab y corré. No hace falta subir
# ningún archivo: el texto ya está adentro del script.
#
# Todo el audio de rondas anteriores (recordatorios, consignas de
# billetes, títulos y definiciones de las 4 sopas, "pintar_paleta.mp3",
# etc.) ya está grabado y no hace falta tocarlo.
#
# Esta lista quedó recortada a los 8 audios nuevos de la CUARTA ronda
# de ajustes:
#  - "dictado_instr_repeat.mp3": la consigna corta que se escucha en
#    las pantallas de dictado que NO son la primera del bloque, ahora
#    todavía más corta (se sacó la explicación de "a medida que
#    acertés vas a escuchar..." porque ya se dijo una sola vez en la
#    primera pantalla y se volvía repetitiva al escucharse 8 veces).
#  - "billetes_aviso.mp3": aclara, una sola vez al entrar al bloque de
#    billetes, que los montos son bajos a propósito (un ejemplo para
#    practicar, no precios reales ni actualizados).
#  - "billete40_titulo.mp3" / "billete40_contexto.mp3",
#    "billete90_titulo.mp3" / "billete90_contexto.mp3" y
#    "billete160_titulo.mp3" / "billete160_contexto.mp3": título y
#    contexto de las 3 pantallas de billetes nuevas (un kilo de
#    tomates, atar los sarmientos del parral, una bolsa de melones),
#    que se suman a las dos que ya había ($70 y $130).
#
# Si en algún momento cambiás datos.js y agregás contenido nuevo, corré
# `node build_manifests.js` y fijate en manifest_audio.json qué
# archivos nuevos aparecen, para agregarlos acá a mano.
# ============================================================
!pip install -q gTTS
!apt-get -qq install -y ffmpeg > /dev/null

from gtts import gTTS
from google.colab import files
import os, time, subprocess, shutil

# (nombre_archivo, texto a locutar)
AUDIOS = [
    ("billete160_contexto.mp3", "En la feria de Lavalle, una bolsa de melones cuesta 160 pesos. Armá el monto de 160 pesos."),
    ("billete160_titulo.mp3", "Armá 160 pesos: una bolsa de melones."),
    ("billete40_contexto.mp3", "En la feria de Lavalle, un kilo de tomates cuesta 40 pesos. Armá el monto de 40 pesos."),
    ("billete40_titulo.mp3", "Armá 40 pesos: un kilo de tomates."),
    ("billete90_contexto.mp3", "Atar los sarmientos del parral una mañana se paga 90 pesos. Armá el monto de 90 pesos."),
    ("billete90_titulo.mp3", "Armá 90 pesos: atar los sarmientos."),
    ("billetes_aviso.mp3", "Los montos que usamos en esta actividad son bajos a propósito: son solo un ejemplo para practicar cómo armar un monto con billetes, no reflejan precios reales ni actualizados."),
    ("dictado_instr_repeat.mp3", "Tocá las palabras en el orden correcto para armar la oración."),
]

os.makedirs("assets/audio", exist_ok=True)
os.makedirs("assets/audio_crudo", exist_ok=True)

errores = []
for i, (nombre, texto) in enumerate(AUDIOS):
    ruta_final = os.path.join("assets/audio", nombre)
    ruta_cruda = os.path.join("assets/audio_crudo", nombre)

    # Salteamos el archivo si ya existe Y no es uno de los placeholders
    # de silencio (que pesan muy poco, menos de 3 KB) — así se
    # regeneran solos los 3 que había que volver a grabar, sin que
    # haga falta borrarlos a mano primero.
    if os.path.exists(ruta_final) and os.path.getsize(ruta_final) > 3000:
        continue

    try:
        tts = gTTS(text=texto, lang="es", tld="com.ar")
        tts.save(ruta_cruda)
        subprocess.run(
            ["ffmpeg", "-y", "-i", ruta_cruda, "-ac", "1", "-b:a", "40k", ruta_final],
            check=True, capture_output=True,
        )
        print(f"[{i+1}/{len(AUDIOS)}] OK  {nombre}  ->  \"{texto}\"")
    except Exception as e:
        print(f"[{i+1}/{len(AUDIOS)}] ERROR {nombre}: {e}")
        errores.append(nombre)
    time.sleep(0.3)

print()
print("Errores (volvé a correr esta celda para reintentar, no se repite lo ya generado):" if errores else "Sin errores.")
for e in errores:
    print(" -", e)

shutil.make_archive("audio_generado", "zip", root_dir=".", base_dir="assets/audio")
files.download("audio_generado.zip")
