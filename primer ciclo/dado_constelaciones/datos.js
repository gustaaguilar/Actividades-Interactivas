/* El dado de las constelaciones — Matemática · Nivel Inicial, sala de 5
   Juego · QueSepanTodos.com · Profe Gustavo Aguilar
   Se tira un dado de constelaciones (puntos, sin números) y se pinta en la grilla la misma cantidad de puntitos,
   hasta completar la grilla entera. Basado en el dado de goma eva y la hoja de puntos que se usan en la sala. */
window.DATOS = {
  meta: {
    titulo: 'El dado de las constelaciones', subtitulo: 'Tirá el dado y pintá la misma cantidad de puntitos',
    area: '🔢 Matemática · Nivel Inicial · Sala de 5', grado: 'Matemática · Nivel Inicial · Sala de 5',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar', mail: 'profegustaaguilar@gmail.com',
    fuente: 'Basado en el dado de las constelaciones que se usa en la sala',
    foto: 'profe.jpg', fotoMini: 'profe_mini.jpg', frase: 'Menos prisa, más vida 🧉🫂', puntosPorAcierto: 10
  },
  // color de los puntos de cada cara (como el dado de goma eva: fondo violeta, borde verde)
  colores: { 1: '#ffd60a', 2: '#ff70a6', 3: '#e0457b', 4: '#ffafcc', 5: '#ffd60a', 6: '#fb8500' },
  // color con que se encierra cada grupo en la grilla (uno distinto por tirada)
  encierros: ['#e63946', '#3a86ff', '#2a9d8f', '#8338ec', '#fb8500', '#06a77d', '#d81159', '#118ab2', '#f4a259', '#6a4c93'],
  niveles: [
    { id: 1, nombre: 'Nivel 1', cols: 4, filas: 5, ico: '🌙' },   // 20 puntitos
    { id: 2, nombre: 'Nivel 2', cols: 5, filas: 6, ico: '🌟' }    // 30 puntitos
  ],
  // textos de los audios (la lista para el script de Colab se arma desde acá)
  audios: {
    portada: 'El dado de las constelaciones. Tocá el dado, mirá la constelación que salió y pintá la misma cantidad de puntitos. ¡Vamos a jugar!',
    t1: 'Nivel uno. Tocá el dado para tirarlo.',
    t2: 'Nivel dos. ¡Ahora hay más puntitos! Tocá el dado para tirarlo.',
    tira: '¡Tirá el dado!',
    s1: '¡Salió la constelación del uno! Pintá la misma cantidad de puntitos y tocá listo.',
    s2: '¡Salió la constelación del dos! Pintá la misma cantidad de puntitos y tocá listo.',
    s3: '¡Salió la constelación del tres! Pintá la misma cantidad de puntitos y tocá listo.',
    s4: '¡Salió la constelación del cuatro! Pintá la misma cantidad de puntitos y tocá listo.',
    s5: '¡Salió la constelación del cinco! Pintá la misma cantidad de puntitos y tocá listo.',
    s6: '¡Salió la constelación del seis! Pintá la misma cantidad de puntitos y tocá listo.',
    n1: 'uno', n2: 'dos', n3: 'tres', n4: 'cuatro', n5: 'cinco', n6: 'seis', n7: 'siete', n8: 'ocho', n9: 'nueve',
    b1: '¡Muy bien! Encerramos un puntito, como la constelación del uno.',
    b2: '¡Muy bien! Encerramos dos puntitos, como la constelación del dos.',
    b3: '¡Muy bien! Encerramos tres puntitos, como la constelación del tres.',
    b4: '¡Muy bien! Encerramos cuatro puntitos, como la constelación del cuatro.',
    b5: '¡Muy bien! Encerramos cinco puntitos, como la constelación del cinco.',
    b6: '¡Muy bien! Encerramos seis puntitos, como la constelación del seis.',
    falta: 'Te faltan puntitos. Contemos juntos los del dado.',
    sobra: 'Pintaste de más. Contemos juntos los del dado. Para despintar, tocá un puntito pintado.',
    l1: '¡Completaste la grilla de veinte puntitos!',
    l2: '¡Completaste la grilla de treinta puntitos!',
    tr1: 'Ganaste el trofeo de bronce.', tr2: 'Ganaste el trofeo de plata.', tr3: 'Ganaste el trofeo de oro.', tr4: '¡Ganaste el trofeo de diamante!',
    cierre: '¡Terminaste el juego! Pintaste todas las grillas con las constelaciones del dado.'
  }
};
