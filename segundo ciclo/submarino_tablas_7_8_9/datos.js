/* EXPEDICIÓN SUBMARINA — Las tablas del 7, del 8 y del 9 · 4.º grado
   Juego en formato videojuego · QueSepanTodos.com · Profe Gustavo Aguilar */
window.DATOS = {
  meta: {
    titulo: 'Expedición submarina', subtitulo: 'Las tablas del 7, del 8 y del 9', area: '🔢 Matemática · 4.º grado',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar', mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg', fotoMini: 'profe_mini.jpg', frase: 'Menos prisa, más vida 🧉🫂', puntosPorAcierto: 10, revision: false
  },
  // 5 zonas · 10 peces cada una (sin repetir). tipo 'producto' (7 × 8) o 'falta' (8 × ? = 56).
  // seg: lo que tarda un pez en cruzar la pantalla · desde/hasta: profundidad en metros · ico: el animal de la zona (álbum)
  tramos: [
    { id: 1, a: 'al arrecife', nombre: 'El arrecife', ico: '🐙', tabla: [7], tipo: 'producto', seg: 10, desde: 0, hasta: 50,
      intro: 'Primera zona: la tabla del 7. ¡Sacale una foto al pez con el resultado correcto!',
      curiosidad: 'El pulpo tiene tres corazones.' },
    { id: 2, a: 'a mar abierto', nombre: 'Mar abierto', ico: '🐬', tabla: [8], tipo: 'producto', seg: 10, desde: 50, hasta: 200,
      intro: 'Segunda zona: la tabla del 8. ¡Seguí bajando!',
      curiosidad: 'Los delfines duermen con la mitad del cerebro despierta.' },
    { id: 3, a: 'a la zona de las ballenas', nombre: 'Zona de las ballenas', ico: '🐋', tabla: [9], tipo: 'producto', seg: 10, desde: 200, hasta: 1000,
      intro: 'Tercera zona: la tabla del 9. ¡Atención, se acercan las ballenas!',
      curiosidad: 'El corazón de la ballena azul es del tamaño de un auto chico.' },
    { id: 4, a: 'a la zona oscura', nombre: 'La zona oscura', ico: '🐟', tabla: [7, 8, 9], tipo: 'producto', seg: 9.5, desde: 1000, hasta: 4000,
      intro: 'Cuarta zona: se mezclan las tablas del 7, del 8 y del 9. ¡Prendé la linterna!',
      curiosidad: 'El pez linterna lleva su propia luz para ver en la oscuridad.' },
    { id: 5, a: 'a la fosa más profunda', nombre: 'La fosa más profunda', ico: '🌊', tabla: [7, 8, 9], tipo: 'falta', seg: 11, desde: 4000, hasta: 11000,
      intro: 'Última zona: ahora falta un número. ¿Qué número multiplicado da el resultado?',
      curiosidad: 'Si metiéramos el Aconcagua en la Fosa de las Marianas, todavía le quedarían 4 kilómetros de agua encima.' }
  ]
};
