import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Crown } from 'lucide-react';

const ClubFortniteModal = ({ isOpen, onClose }) => {
  const config = window.APP_CONFIG || {};
  const plans = config.clubFortnite?.plans || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center py-8 px-4 animate-in fade-in duration-200 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      data-testid="club-modal-overlay"
    >
      <div
        className="relative bg-[#18181b] border border-purple-500/30 rounded-3xl max-w-6xl w-full"
        style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
        data-testid="club-modal"
      >
        {/* Close */}
        <button
          data-testid="club-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center animate-pulse-glow">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-gradient tracking-tight"
                style={{ fontFamily: 'Unbounded, sans-serif' }}
              >
                Club Fortnite
              </h2>
              <p className="text-slate-400 mt-1">Elige tu plan de suscripción</p>
            </div>
          </div>

          {/* Grid de planes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                data-testid={`club-plan-${plan.id}`}
                className="spirit-card bg-[#0f0f11] border-2 border-purple-500/40 rounded-2xl overflow-hidden hover:border-purple-500 transition-all"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {plan.oldPrice && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full neon-glow-pink">
                      Oferta
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3
                    className="text-white font-bold text-lg mb-3"
                    style={{ fontFamily: 'Unbounded, sans-serif' }}
                  >
                    {plan.title}
                  </h3>

                  <div className="flex flex-col gap-1">
                    {plan.oldPrice && (
                      <span className="text-slate-500 line-through text-sm">
                        Antes {plan.oldPrice}
                      </span>
                    )}
                    <span
                      className={`font-bold ${
                        plan.oldPrice
                          ? 'text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                          : 'text-2xl text-white'
                      }`}
                    >
                      {plan.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ClubFortniteModal;
