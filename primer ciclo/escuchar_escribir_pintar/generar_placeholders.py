#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera imágenes placeholder FUNCIONALES para el paquete "Escuchar, escribir
y pintar". No son las imágenes finales (el usuario las va a reemplazar con
las que genere en Colab), pero permiten que el paquete se vea y funcione
correctamente ya mismo, con los mismos nombres de archivo.
"""

import math
import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(BASE, "assets", "img")
os.makedirs(IMG_DIR, exist_ok=True)

FONT_DIR = "/usr/share/fonts/truetype/dejavu"


def font(size, bold=False):
    name = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size)


def texto_centrado(draw, xy, texto, fnt, fill):
    x, y = xy
    bbox = draw.textbbox((0, 0), texto, font=fnt)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.text((x - w / 2, y - h / 2 - bbox[1]), texto, font=fnt, fill=fill)


# ------------------------------------------------------------
# PORTADA Y CIERRE
# ------------------------------------------------------------
def gen_portada():
    w, h = 1000, 560
    img = Image.new("RGB", (w, h), "#f3ead9")
    d = ImageDraw.Draw(img)
    for i in range(h):
        t = i / h
        r = int(0xc9 * (1 - t) + 0x7a * t)
        g = int(0x8a * (1 - t) + 0x24 * t)
        b = int(0x3b * (1 - t) + 0x18 * t)
        d.line([(0, i), (w, i)], fill=(r, g, b))
    # frutas decorativas simples
    d.ellipse([60, 380, 180, 500], fill="#e8792e")     # naranja
    d.ellipse([850, 60, 960, 170], fill="#c0392b")      # tomate
    for cx, cy in [(760, 420), (800, 460), (740, 470), (780, 500)]:
        d.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], fill="#7a4fa0")  # uvas
    texto_centrado(d, (w / 2, h / 2 - 40), "Escuchar, escribir y pintar", font(54, bold=True), "white")
    texto_centrado(d, (w / 2, h / 2 + 30), "Dictado, colores y billetes — Costa de Araujo", font(28), "#f3ead9")
    img.save(os.path.join(IMG_DIR, "portada.jpg"), quality=88)


def gen_cierre():
    w, h = 1000, 320
    img = Image.new("RGB", (w, h), "#3f7d4a")
    d = ImageDraw.Draw(img)
    texto_centrado(d, (w / 2, h / 2), "¡Muy bien! 🎉", font(46, bold=True), "white")
    img.save(os.path.join(IMG_DIR, "cierre.jpg"), quality=88)


def gen_profe():
    w, h = 300, 300
    img = Image.new("RGB", (w, h), "#c98a3b")
    d = ImageDraw.Draw(img)
    d.ellipse([70, 50, 230, 210], fill="#f3ead9")
    d.ellipse([90, 190, 210, 300], fill="#f3ead9")
    texto_centrado(d, (w / 2, h - 30), "Profe", font(24, bold=True), "#7a2418")
    img.save(os.path.join(IMG_DIR, "profe.jpg"), quality=88)


# ------------------------------------------------------------
# FRUTAS PARA "PINTAR" (contorno + color) — dibujo simple tipo ícono
# ------------------------------------------------------------
def _lienzo():
    w, h = 500, 400
    img = Image.new("RGB", (w, h), "white")
    return img, ImageDraw.Draw(img), w, h


def _guardar_par(nombre, dibujar_forma, color_hex, etiqueta):
    # Contorno: fondo blanco, forma solo con borde gris.
    img, d, w, h = _lienzo()
    dibujar_forma(d, w, h, fill=None, outline="#999999", width=6)
    texto_centrado(d, (w / 2, h - 28), etiqueta, font(22), "#666666")
    img.save(os.path.join(IMG_DIR, f"{nombre}_contorno.jpg"), quality=90)

    # Color: forma rellena del color correcto.
    img2, d2, w2, h2 = _lienzo()
    dibujar_forma(d2, w2, h2, fill=color_hex, outline="#555555", width=4)
    texto_centrado(d2, (w2 / 2, h2 - 28), etiqueta, font(22), "#444444")
    img2.save(os.path.join(IMG_DIR, f"{nombre}_color.jpg"), quality=90)


def forma_pomelo(d, w, h, fill, outline, width):
    cx, cy, r = w / 2, h / 2 - 10, 130
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline=outline, width=width)
    d.line([cx, cy - r + 20, cx, cy + r - 20], fill=outline, width=3)
    d.line([cx - r + 20, cy, cx + r - 20, cy], fill=outline, width=3)


def forma_uva(d, w, h, fill, outline, width):
    cx, cy = w / 2, h / 2
    centros = [(-40, -60), (0, -70), (40, -60), (-55, -10), (-15, -15),
               (25, -15), (55, -10), (-35, 40), (5, 45), (40, 40)]
    for dx, dy in centros:
        d.ellipse([cx + dx - 32, cy + dy - 32, cx + dx + 32, cy + dy + 32],
                  fill=fill, outline=outline, width=width)
    # hoja (siempre verde, sea o no la versión coloreada)
    hx, hy = cx, cy - 130
    color_hoja = "#5cb85c" if fill else None
    d.polygon([(hx, hy - 30), (hx + 45, hy), (hx, hy + 30), (hx - 45, hy)],
              outline=outline, width=width, fill=color_hoja)


def forma_melon(d, w, h, fill, outline, width):
    cx, cy, rx, ry = w / 2, h / 2 - 10, 150, 115
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=fill, outline=outline, width=width)
    for i in range(-2, 3):
        d.arc([cx - rx, cy - ry, cx + rx, cy + ry], start=0, end=360, fill=outline, width=1)
    for off in (-70, -35, 0, 35, 70):
        d.line([cx + off, cy - ry + 8, cx + off * 0.6, cy + ry - 8], fill=outline, width=2)


def forma_naranja(d, w, h, fill, outline, width):
    cx, cy, r = w / 2, h / 2 - 10, 130
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline=outline, width=width)
    d.ellipse([cx - 14, cy - r - 6, cx + 14, cy - r + 18], fill="#5a8a4a", outline=outline, width=2)


def forma_tomate(d, w, h, fill, outline, width):
    cx, cy, r = w / 2, h / 2, 130
    d.ellipse([cx - r, cy - r + 15, cx + r, cy + r + 15], fill=fill, outline=outline, width=width)
    for ang in range(0, 360, 60):
        rad = math.radians(ang)
        x2 = cx + 34 * math.cos(rad)
        y2 = cy - r + 15 + 10 * math.sin(rad)
        d.line([cx, cy - r + 15, x2, y2], fill="#4a8a4a", width=5)


def forma_parral(d, w, h, fill, outline, width):
    # estructura simple: enrejado + hojas + racimos colgando
    for y in (60, 120):
        d.line([40, y, w - 40, y], fill="#8a6a4a", width=6)
    for x in range(60, w - 40, 90):
        d.line([x, 40, x, 160], fill="#8a6a4a", width=6)
    color_hojas = fill if fill else None
    for cx in range(90, w - 60, 90):
        d.ellipse([cx - 45, 140, cx + 45, 230], fill=color_hojas, outline=outline, width=width)
        # racimo de uvas colgando
        for dy in (0, 30, 60):
            d.ellipse([cx - 15, 235 + dy, cx + 15, 265 + dy], fill="#7a4fa0", outline=outline, width=2)


FRUTAS = [
    ("fruta_pomelo", forma_pomelo, "#f3d33f", "pomelo"),
    ("fruta_uva", forma_uva, "#8e5fb0", "uva"),
    ("fruta_melon", forma_melon, "#5cb85c", "melón"),
    ("fruta_naranja", forma_naranja, "#e8792e", "naranja"),
    ("fruta_tomate", forma_tomate, "#c0392b", "tomate"),
    ("parral", forma_parral, "#5cb85c", "parral"),
]


# ------------------------------------------------------------
# ESCENA PARA "DISCRIMINAR" — manzanas entre otras frutas.
# Las coordenadas (%) deben coincidir con las "zonas" de datos.js.
# ------------------------------------------------------------
ZONAS_MANZANAS = [
    (14, 24, True), (34, 62, True), (58, 20, True), (82, 58, True),
    (24, 82, False), (46, 40, False), (70, 82, False), (90, 22, False),
]


def gen_escena_manzanas():
    # Escena SIN PINTAR (estilo dibujo para colorear): todas las frutas
    # van solo de contorno, para que se note el cambio cuando cada
    # manzana se "pinta" de verde al tocarla (superposición aparte,
    # ver gen_manzana_verde_overlay). Las coordenadas de ZONAS_MANZANAS
    # son las mismas que las "zonas" de datos.js — no tocar sin
    # actualizar también ahí.
    w, h = 900, 600
    img = Image.new("RGB", (w, h), "#fbf8f0")
    d = ImageDraw.Draw(img)

    def manzana_contorno(cx, cy, r=55):
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline="#7a2418", width=4)
        d.line([cx, cy - r, cx, cy - r - 18], fill="#7a5a3a", width=5)
        d.polygon([(cx + 3, cy - r - 6), (cx + 30, cy - r - 22), (cx + 14, cy - r + 4)], outline="#3f7d4a", width=3)

    def naranja(cx, cy, r=52):
        d.ellipse([cx - r, cy - r, cx + r, cy + r], outline="#a8551c", width=4)

    def limon(cx, cy, r=48):
        d.ellipse([cx - r, cy - r * 0.8, cx + r, cy + r * 0.8], outline="#a8a020", width=4)

    def pera(cx, cy, r=50):
        d.ellipse([cx - r * 0.7, cy - r * 0.3, cx + r * 0.7, cy + r], outline="#7a8a20", width=4)
        d.ellipse([cx - r * 0.45, cy - r, cx + r * 0.45, cy], outline="#7a8a20", width=4)

    distractor_forms = [naranja, limon, pera, naranja]
    di = 0
    for xp, yp, correcta in ZONAS_MANZANAS:
        cx, cy = w * xp / 100, h * yp / 100
        if correcta:
            manzana_contorno(cx, cy)
        else:
            distractor_forms[di % len(distractor_forms)](cx, cy)
            di += 1

    img.save(os.path.join(IMG_DIR, "escena_manzanas.jpg"), quality=90)


def gen_manzana_verde_overlay():
    # Manzana YA PINTADA de verde, recortada con fondo transparente,
    # para superponer exactamente sobre cada manzana acertada de
    # escena_manzanas.jpg (mismo tamaño/forma que manzana_contorno,
    # r=55, en un lienzo de 160x160 centrado en (80, 95)).
    size = 160
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy, r = 80, 95, 55
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill="#3f9c4a", outline="#2a6b32", width=4)
    d.line([cx, cy - r, cx, cy - r - 18], fill="#5a3a20", width=5)
    d.polygon([(cx + 3, cy - r - 6), (cx + 30, cy - r - 22), (cx + 14, cy - r + 4)], fill="#2a6b32")
    img.save(os.path.join(IMG_DIR, "manzana_verde.png"))


# ------------------------------------------------------------
# BILLETES
# ------------------------------------------------------------
def gen_billete(valor, color):
    w, h = 300, 140
    img = Image.new("RGB", (w, h), color)
    d = ImageDraw.Draw(img)
    d.rectangle([6, 6, w - 6, h - 6], outline="white", width=4)
    texto_centrado(d, (w / 2, h / 2 - 10), f"$ {valor}", font(46, bold=True), "white")
    texto_centrado(d, (w / 2, h - 24), "Costa de Araujo", font(14), "white")
    img.save(os.path.join(IMG_DIR, f"billete_{valor}.png"))


# ------------------------------------------------------------
# IMÁGENES DECORATIVAS PARA "ORDENAR" (bloque de Costa de Araujo)
# ------------------------------------------------------------
def gen_escena_simple(nombre, color_fondo, dibujar):
    w, h = 900, 380
    img = Image.new("RGB", (w, h), color_fondo)
    d = ImageDraw.Draw(img)
    dibujar(d, w, h)
    img.save(os.path.join(IMG_DIR, nombre), quality=88)


def dibujar_cosecha(d, w, h):
    d.rectangle([0, h - 90, w, h], fill="#c9a25a")
    for cx in (150, 300, 450, 600, 750):
        d.ellipse([cx - 55, h - 190, cx + 55, h - 80], fill="#c7d84a", outline="#7a8a20", width=4)
    texto_centrado(d, (w / 2, 60), "La cosecha de melón", font(34, bold=True), "#4a3222")


def dibujar_parral_oracion(d, w, h):
    for y in (60, 140):
        d.line([40, y, w - 40, y], fill="#8a6a4a", width=8)
    for x in range(60, w - 40, 110):
        d.line([x, 30, x, 200], fill="#8a6a4a", width=8)
    for cx in range(110, w - 60, 110):
        d.ellipse([cx - 50, 150, cx + 50, 250], fill="#5cb85c", outline="#3f7d4a", width=3)
        for dy in (0, 35, 70):
            d.ellipse([cx - 18, 255 + dy, cx + 18, 290 + dy], fill="#7a4fa0", outline="#4a2a5a", width=2)
    texto_centrado(d, (w / 2, h - 30), "Las uvas del parral", font(34, bold=True), "#4a3222")


def dibujar_tomate_oracion(d, w, h):
    for cx in (200, 420, 640, 780):
        cy = 200
        d.ellipse([cx - 60, cy - 60, cx + 60, cy + 60], fill="#c0392b", outline="#7a2418", width=4)
        d.line([cx, cy - 60, cx, cy - 80], fill="#4a8a4a", width=5)
    texto_centrado(d, (w / 2, 60), "El tomate maduro", font(34, bold=True), "#4a3222")


# ------------------------------------------------------------
# ÍCONOS PARA "CONCORDANCIA" (unir con flecha) — un dibujo simple
# por sustantivo, igual de placeholder que el resto: la IA los
# reemplaza después vía Colab (están en manifest_imagenes.json).
# ------------------------------------------------------------
def _icono_simple(nombre, dibujar, color_fondo="#f3ead9"):
    w, h = 300, 300
    img = Image.new("RGB", (w, h), color_fondo)
    d = ImageDraw.Draw(img)
    dibujar(d, w, h)
    img.save(os.path.join(IMG_DIR, nombre), quality=88)


def _dibujar_sandia(d, w, h):
    cx, cy, r = w / 2, h / 2, 110
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill="#3f9c4a", outline="#2a6b32", width=5)
    for i in range(-2, 3):
        d.line([cx + i * 25, cy - r + 15, cx + i * 25, cy + r - 15], fill="#2a6b32", width=4)


def _dibujar_zapato(d, w, h):
    d.rounded_rectangle([60, 170, 240, 220], radius=18, fill="#3a3a3a", outline="#1a1a1a", width=4)
    d.polygon([(60, 200), (60, 130), (150, 130), (190, 170), (60, 200)], fill="#3a3a3a", outline="#1a1a1a", width=4)
    d.line([100, 145, 140, 175], fill="#eee", width=4)
    d.line([115, 140, 155, 170], fill="#eee", width=4)


def _dibujar_arboles(d, w, h):
    for cx in (90, 160, 230):
        d.rectangle([cx - 8, 190, cx + 8, 240], fill="#7a5a3a")
        d.polygon([(cx, 90), (cx - 55, 200), (cx + 55, 200)], fill="#3f7d4a", outline="#2a5a32", width=3)


def _dibujar_casas(d, w, h):
    for cx in (95, 210):
        d.rectangle([cx - 55, 160, cx + 55, 240], fill="#e8d9b8", outline="#7a5a3a", width=4)
        d.polygon([(cx - 65, 160), (cx, 100), (cx + 65, 160)], fill="#a8551c", outline="#7a2418", width=4)
        d.rectangle([cx - 15, 195, cx + 15, 240], fill="#7a5a3a")


def main():
    gen_portada()
    gen_cierre()
    gen_profe()
    for nombre, forma, color, etiqueta in FRUTAS:
        _guardar_par(nombre, forma, color, etiqueta)
    gen_escena_manzanas()
    gen_manzana_verde_overlay()
    gen_escena_simple("img_cosecha.jpg", "#f3ead9", dibujar_cosecha)
    gen_escena_simple("img_parral_oracion.jpg", "#eef6ea", dibujar_parral_oracion)
    gen_escena_simple("img_tomate_oracion.jpg", "#f3ead9", dibujar_tomate_oracion)
    _icono_simple("ic_sandia.jpg", _dibujar_sandia)
    _icono_simple("ic_zapato.jpg", _dibujar_zapato)
    _icono_simple("ic_arboles.jpg", _dibujar_arboles, "#eef6ea")
    _icono_simple("ic_casas.jpg", _dibujar_casas, "#eef6ea")
    print("Listo. Imágenes generadas en", IMG_DIR)


if __name__ == "__main__":
    main()
