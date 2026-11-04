/* Rumbo al Cristo Redentor — Armamos palabras con sílabas · 1.er grado
   Juego en formato videojuego: una camioneta 4×4 sube por la ruta 7 hasta el Túnel Internacional.
   QueSepanTodos.com · Profe Gustavo Aguilar
   Las palabras van siempre en imprenta minúscula. Sílabas separadas con guion. */
window.DATOS = {
  meta: {
    titulo: 'Rumbo al Cristo Redentor', subtitulo: 'Armamos palabras con sílabas', area: '🔤 Lengua · 1.er grado',
    autor: '💻 Informática Educativa · Profe Gustavo Aguilar', mail: 'profegustaaguilar@gmail.com',
    foto: 'profe.jpg', fotoMini: 'profe_mini.jpg', frase: 'Menos prisa, más vida 🧉🫂',
    puntosPorAcierto: 10, porTramo: 6, revision: false
  },
  // modo 'armar': tocar las sílabas en orden · modo 'falta': elegir la sílaba que falta · extra: botones de más
  tramos: [
    { id: 1, ico: '💧', nombre: 'Potrerillos', modo: 'armar', extra: 2, cielo: ['#8ecae6', '#e3f4ff'],
      curiosidad: 'El dique Potrerillos guarda el agua del río Mendoza. Sirve para dar agua potable a la ciudad y para producir electricidad.',
      intro: 'Escuchá la palabra y tocá las sílabas en orden. Cada sílaba suena al tocarla.',
      palabras: [['ca-sa', '🏠'], ['lu-na', '🌙'], ['ga-to', '🐱'], ['va-ca', '🐄'], ['pa-to', '🦆'], ['da-do', '🎲'], ['mo-no', '🐒'], ['pe-ra', '🍐'],
        ['u-va', '🍇'], ['o-so', '🐻'], ['ro-sa', '🌹'], ['bo-ta', '👢'], ['ca-ma', '🛏️'], ['lo-bo', '🐺'], ['nu-be', '☁️'], ['ma-pa', '🗺️']] },
    { id: 2, ico: '🌳', nombre: 'Uspallata', modo: 'armar', extra: 2, cielo: ['#7fbde6', '#dcefff'],
      curiosidad: 'Uspallata es un valle rodeado de cerros, en el camino que va de Mendoza a Chile.',
      intro: 'Ahora las palabras tienen tres sílabas. ¡Tocalas en orden!',
      palabras: [['pe-lo-ta', '⚽'], ['to-ma-te', '🍅'], ['co-ne-jo', '🐰'], ['pa-lo-ma', '🕊️'], ['za-pa-to', '👞'], ['ca-mi-sa', '👕'], ['ba-na-na', '🍌'], ['gu-sa-no', '🐛']] },
    { id: 3, ico: '🏞️', nombre: 'Punta de Vacas', modo: 'falta', extra: 2, cielo: ['#6aa5d8', '#d2e8fb'],
      curiosidad: 'En Punta de Vacas se juntan los ríos Tupungato y Cuevas, y ahí nace el río Mendoza.',
      intro: 'A cada palabra le falta una sílaba. ¿Cuál es?',
      palabras: [['he-la-do', '🍦'], ['ra-tón', '🐭'], ['li-món', '🍋'], ['ca-ba-llo', '🐴'], ['ga-lli-na', '🐔'], ['ti-je-ra', '✂️'], ['pe-pi-no', '🥒'], ['re-ga-lo', '🎁'],
        ['lá-piz', '✏️'], ['ba-lle-na', '🐳'], ['ca-me-llo', '🐫'], ['ve-la', '🕯️'], ['pi-no', '🌲'], ['na-riz', '👃']] },
    { id: 4, ico: '🌉', nombre: 'Puente del Inca', modo: 'armar', extra: 3, cielo: ['#5b8fc9', '#c8def5'],
      curiosidad: 'El Puente del Inca es un puente natural de piedra. Abajo pasa el río Cuevas, y las aguas termales lo pintaron de amarillo y naranja.',
      intro: '¡Más sílabas para elegir! Escuchá bien cada una.',
      palabras: [['co-he-te', '🚀'], ['a-be-ja', '🐝'], ['ce-re-za', '🍒'], ['ji-ra-fa', '🦒'], ['co-ro-na', '👑'], ['ga-lle-ta', '🍪'], ['cu-cha-ra', '🥄'], ['pa-ya-so', '🤡']] },
    { id: 5, ico: '⛰️', nombre: 'Túnel Internacional', modo: 'armar', extra: 2, cielo: ['#3d5a99', '#b6cdee'],
      curiosidad: 'El túnel Cristo Redentor cruza la cordillera por adentro de la montaña y une Argentina con Chile. Arriba, en la cumbre, está la estatua del Cristo Redentor.',
      intro: '¡Último tramo! Palabras largas: armalas sílaba por sílaba.',
      palabras: [['ma-ri-po-sa', '🦋'], ['ca-la-ba-za', '🎃'], ['cho-co-la-te', '🍫'], ['ca-ra-me-lo', '🍬'], ['za-pa-ti-lla', '👟'], ['te-lé-fo-no', '☎️'], ['me-dia-lu-na', '🥐'],
        ['ca-mio-ne-ta', '🚙'], ['co-co-dri-lo', '🐊']] }
  ]
};
