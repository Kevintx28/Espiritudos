// Reseñas de clientes (imágenes)
const REVIEWS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1573383104533-84fbfd3c10d0?w=600&h=400&fit=crop',
    alt: 'Reseña de cliente satisfecho 1'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1644353224392-7e532d7b8f4b?w=600&h=400&fit=crop',
    alt: 'Reseña de cliente satisfecho 2'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    alt: 'Reseña de cliente satisfecho 3'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    alt: 'Reseña de cliente satisfecho 4'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&h=400&fit=crop',
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