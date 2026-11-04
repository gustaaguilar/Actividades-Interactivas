/* El tren de las rimas — Lengua · 1.° y 2.° grado (alfabetización inicial)
   Juego en formato videojuego · QueSepanTodos.com · Profe Gustavo Aguilar
   Basado en la sección «Rimas» (págs. 5 a 9) del cuadernillo «Alfabetización inicial, primer y segundo grado»
   del portal educativo de la Dirección General de Escuelas de Mendoza.
   Las palabras van siempre en imprenta minúscula. */
window.DATOS = {
  meta: {
    titulo: 'El tren de las rimas', subtitulo: 'Escuchá y encontrá las palabras que riman', area: '🔤 Lengua · 1.° y 2.° grado',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar', mail: 'profegustaaguilar@gmail.com',
    fuente: 'Basado en el material del portal educativo de la Dirección General de Escuelas de Mendoza',
    foto: 'profe.jpg', fotoMini: 'profe_mini.jpg', frase: 'Menos prisa, más vida 🧉🫂', puntosPorAcierto: 10
  },
  // dibujos (imagen en img/<palabra>.jpg y audio en audio/w_<palabra>.mp3); el emoji se usa solo si falta la imagen
  palabras: {
    soldado: '💂', candado: '🔒', banana: '🍌', ventana: '🪟', plato: '🍽️', pato: '🦆', sombrero: '👒', florero: '💐',
    escuela: '🏫', vela: '🕯️', gallina: '🐔', cortina: '', avion: '✈️', raton: '🐭', pelota: '⚽', bota: '👢',
    rana: '🐸', mono: '🐒', cono: '', lana: '🧶', cuchillo: '🔪', castillo: '🏰', martillo: '🔨', manzana: '🍎',
    casa: '🏠', masa: '', gato: '🐱', camion: '🚚', limon: '🍋', luna: '🌙', cuna: '', cepillo: '🪥',
    aceituna: '🫒', ladrillo: '🧱'
  },
  // cómo se escribe cada palabra en pantalla (con tilde)
  escritura: { avion: 'avión', raton: 'ratón', camion: 'camión', limon: 'limón' },
  tramos: [
    { id: 1, ico: '🌳', estacion: 'Parque General San Martín', tipo: 'cual', cielo: ['#8ecae6', '#e3f4ff'],
      intro: '¿Qué palabra rima? Escuchá el dibujo de la locomotora y tocá el que rima.',
      curiosidad: 'El Parque General San Martín tiene un lago para pasear en bote y, arriba del Cerro de la Gloria, un monumento al Ejército de los Andes.',
      // pág. 5: rodea del mismo color los dibujos que riman
      rondas: [['soldado', 'candado'], ['banana', 'ventana'], ['plato', 'pato'], ['sombrero', 'florero'], ['escuela', 'vela'], ['gallina', 'cortina']] },
    { id: 2, ico: '🫒', estacion: 'Maipú', tipo: 'cual', cielo: ['#a2d2ff', '#eaf4ff'],
      intro: 'Seguimos viaje. Tocá el dibujo que rima con el de la locomotora.',
      curiosidad: 'Maipú es tierra de olivos: con las aceitunas se hace aceite de oliva. También tiene muchas bodegas.',
      // págs. 6 y 8: une los dibujos que riman
      rondas: [['avion', 'raton'], ['pelota', 'bota'], ['mono', 'cono'], ['casa', 'masa'], ['gato', 'pato'], ['camion', 'limon']] },
    { id: 3, ico: '🏞️', estacion: 'San Rafael', tipo: 'grupos', cielo: ['#90cdf4', '#fdf0d5'],
      intro: 'Ahora hay dos vagones. Mirá el dibujo y llevalo al vagón con el que rima.',
      curiosidad: 'En San Rafael está el Cañón del Atuel, con rocas de muchos colores. Por su río se hace rafting.',
      // págs. 7 y 9: recorta y pega los dibujos según con qué riman
      grupos: [{ modelos: ['lana', 'cuchillo'], dibujos: [['ventana', 0], ['manzana', 0], ['rana', 0], ['castillo', 1], ['martillo', 1]] },
               { modelos: ['martillo', 'luna'], dibujos: [['cepillo', 0], ['ladrillo', 0], ['cuna', 1], ['aceituna', 1]] }] },
    { id: 4, ico: '🍇', estacion: 'Fiesta de la Vendimia', tipo: 'parejas', cielo: ['#3d348b', '#f7b267'],
      intro: '¡Última estación! Tocá dos dibujos que rimen para formar una pareja.',
      curiosidad: 'La Fiesta de la Vendimia celebra la cosecha de la uva. Su gran espectáculo se hace en el teatro griego Frank Romero Day, en el Parque.',
      // pág. 5 y 8: parejas que riman (se forman tableros de 4 parejas)
      tableros: [[['soldado', 'candado'], ['gato', 'pato'], ['luna', 'cuna'], ['casa', 'masa']],
                 [['escuela', 'vela'], ['camion', 'limon'], ['lana', 'rana'], ['martillo', 'castillo']]] }
  ]
};
