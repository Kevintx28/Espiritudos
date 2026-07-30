import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ReviewsSection = () => {
  const reviews = window.REVIEWS || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else {
      setCurrentIndex(prev => Math.min(reviews.length - 1, prev + 1));
    }
  };

  if (reviews.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Reseñas de Nuestros Clientes
        </h2>
        <p className="text-slate-400 text-lg">
          Mira lo que dicen nuestros clientes satisfechos
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            ref={scrollRef}
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-full flex-shrink-0"
                data-testid={`review-${review.id}`}
              >
                <div className="bg-[#18181b] border border-white/10 rounded-2xl overflow-hidden">
                  <img
                    src={review.image}
                    alt={review.alt}
                    className="w-full h-96 object-cover"
                    loading="lazy"
                    crossOrigin="anonymous"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            data-testid="review-prev"
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all neon-glow"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                data-testid={`review-indicator-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          <button
            data-testid="review-next"
            onClick={() => scroll('right')}
            disabled={currentIndex === reviews.length - 1}
            className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center hover:bg-purple-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all neon-glow"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;