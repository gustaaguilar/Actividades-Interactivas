/* ESCALANDO EL ACONCAGUA — Las tablas del 2 y del 3 · 3.er grado
   Juego en formato videojuego · QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
  meta: {
    titulo: 'Escalando el Aconcagua', subtitulo: 'Las tablas del 2 y del 3', area: '🔢 Matemática · 3.er grado',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar', mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg', fotoMini: 'profe_mini.jpg', frase: 'Menos prisa, más vida 🧉🫂', puntosPorAcierto: 10, revision: false
  },
  // 4 tramos de la subida · 10 saltos cada uno (sin repetir). tipo 'producto' (3 × 4) o 'falta' (3 × ? = 12)
  tramos: [
    { id: 1, ico: '⛺', curiosidad: 'En Plaza de Mulas los andinistas se quedan varios días antes de seguir subiendo: así su cuerpo se acostumbra a la altura.', nombre: 'Plaza de Mulas', tabla: [2], tipo: 'producto', desde: 2800, hasta: 4300, cielo: ['#8ecae6', '#d9f2ff'],
      intro: 'Primer tramo: la tabla del 2. ¡Tocá el número correcto y a subir!' },
    { id: 2, ico: '🦅', curiosidad: 'El cóndor andino es una de las aves voladoras más grandes del mundo: con las alas abiertas mide más de 3 metros.', nombre: 'Nido de Cóndores', tabla: [3], tipo: 'producto', desde: 4300, hasta: 5500, cielo: ['#74b3e0', '#cfe9fb'],
      intro: 'Segundo tramo: la tabla del 3. ¡Seguí subiendo!' },
    { id: 3, ico: '🛖', curiosidad: 'Allá arriba el aire tiene la mitad de oxígeno que abajo. Por eso los andinistas caminan muy despacito.', nombre: 'Refugio Independencia', tabla: [2, 3], tipo: 'producto', desde: 5500, hasta: 6400, cielo: ['#5b8fc9', '#c3dcf5'],
      intro: 'Tercer tramo: se mezclan la tabla del 2 y la del 3. ¡Atención!' },
    { id: 4, ico: '🇦🇷', curiosidad: 'El Aconcagua es la montaña más alta de toda América, y del mundo fuera de Asia.', nombre: 'La cumbre', tabla: [2, 3], tipo: 'falta', desde: 6400, hasta: 6961, cielo: ['#3d5a99', '#b6cdee'],
      intro: 'Último tramo: ahora falta un número. ¿Qué número multiplicado da el resultado?' }
  ]
};
