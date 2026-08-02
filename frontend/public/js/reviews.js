// Reseñas de clientes (imágenes)
const REVIEWS = [
  {
    id: 1,
    image: 'https://i.imgur.com/kYS4PTi.png',
    alt: 'Reseña de cliente satisfecho 1'
  },
  {
    id: 2,
    image: 'https://i.imgur.com/ppsWqr8.png',
    alt: 'Reseña de cliente satisfecho 2'
  },
  {
    id: 3,
    image: 'https://i.imgur.com/04umMaz.png',
    alt: 'Reseña de cliente satisfecho 3'
  },
  {
    id: 4,
    image: 'https://i.imgur.com/8s4k1uE.png',
    alt: 'Reseña de cliente satisfecho 4'
  },
  {
    id: 5,
    image: 'https://i.imgur.com/xP6stPH.png',
    alt: 'Reseña de cliente satisfecho 5'
  }
];

// Exponer al window para acceso desde React
if (typeof window !== 'undefined') {
  window.REVIEWS = REVIEWS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = REVIEWS;
}