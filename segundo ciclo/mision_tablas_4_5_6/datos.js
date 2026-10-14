/* MISIÓN ESPACIAL — Las tablas del 4, del 5 y del 6 · 4.º grado
   Juego en formato videojuego · QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
  meta: {
    titulo: 'Misión espacial', subtitulo: 'Las tablas del 4, del 5 y del 6', area: '🔢 Matemática · 4.º grado',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar', mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg', fotoMini: 'profe_mini.jpg', frase: 'Menos prisa, más vida 🧉🫂', puntosPorAcierto: 10, revision: false
  },
  // curiosidad: el «¿Sabías que…?» que aparece al llegar a cada planeta
  // 5 misiones · 10 asteroides cada una (sin repetir). tipo 'producto' (4 × 6) o 'falta' (4 × ? = 24). seg: lo que tarda un asteroide en cruzar la pantalla
  tramos: [
    { id: 1, curiosidad: 'En la Luna no hay viento: por eso las huellas de los astronautas siguen ahí desde hace más de 50 años.', nombre: 'La Luna', destino: 'luna', tabla: [4], tipo: 'producto', seg: 9, intro: 'Primera misión: la tabla del 4. ¡Tocá el asteroide con el resultado correcto!' },
    { id: 2, curiosidad: 'En Marte hay un volcán tres veces más alto que el Aconcagua.', nombre: 'Marte', destino: 'marte', tabla: [5], tipo: 'producto', seg: 8.5, intro: 'Segunda misión: la tabla del 5. ¡Rumbo a Marte!' },
    { id: 3, curiosidad: 'Júpiter es tan grande que adentro entrarían más de 1.000 planetas Tierra.', nombre: 'Júpiter', destino: 'jupiter', tabla: [6], tipo: 'producto', seg: 8.5, intro: 'Tercera misión: la tabla del 6. ¡Cuidado con los asteroides!' },
    { id: 4, curiosidad: 'Saturno es tan liviano que, en una pileta gigante, flotaría.', nombre: 'Saturno', destino: 'saturno', tabla: [4, 5, 6], tipo: 'producto', seg: 8, intro: 'Cuarta misión: se mezclan las tablas del 4, del 5 y del 6. ¡Atención!' },
    { id: 5, curiosidad: 'En Neptuno sopla el viento más fuerte del sistema solar: ¡más de 2.000 kilómetros por hora!', nombre: 'Neptuno', destino: 'neptuno', tabla: [4, 5, 6], tipo: 'falta', seg: 10, intro: 'Última misión: ahora falta un número. ¿Qué número multiplicado da el resultado?' }
  ]
};
