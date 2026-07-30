import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

const PavosModal = ({ isOpen, onClose }) => {
  const config = window.APP_CONFIG || {};
  const imageUrl = config.pavos?.image;
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setZoomed(false);
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
      data-testid="pavos-modal-overlay"
    >
      <div
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
        data-testid="pavos-modal"
      >
        {/* Close */}
        <button
          data-testid="pavos-modal-close"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-purple-500 hover:bg-purple-600 text-white flex items-center justify-center transition-colors neon-glow"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="bg-[#18181b] border border-purple-500/30 rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.3)' }}
        >
          <div className="p-6 md:p-8 border-b border-white/10">
            <h2
              className="text-3xl md:text-4xl font-bold text-gradient tracking-tight"
              style={{ fontFamily: 'Unbounded, sans-serif' }}
            >
              Venta de Pavos
            </h2>
            <p className="text-slate-400 mt-2">Toca la imagen para verla en grande</p>
          </div>

          <div
            className={`relative overflow-auto flex items-center justify-center p-4 md:p-6 ${
              zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setZoomed((z) => !z)}
            data-testid="pavos-image-container"
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Venta de Pavos"
                data-testid="pavos-image"
                className="select-none transition-transform duration-300"
                style={{
                  maxWidth: zoomed ? 'none' : '100%',
                  maxHeight: 'none',
                  transform: zoomed ? 'scale(1.8)' : 'scale(1)',
                  transformOrigin: 'center center',
                }}
                draggable={false}
              />
            )}

            <div className="absolute bottom-6 right-6 pointer-events-none bg-black/70 backdrop-blur-md rounded-full p-3 border border-white/10">
              {zoomed ? (
                <ZoomOut className="w-5 h-5 text-white" />
              ) : (
                <ZoomIn className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PavosModal;
