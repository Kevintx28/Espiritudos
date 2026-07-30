import React from 'react';
import { MessageCircle, Facebook, Phone, RotateCcw } from 'lucide-react';

const ThankYou = ({ onStartOver }) => {
  const config = window.APP_CONFIG || {};

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 flex items-center justify-center animate-pulse-glow">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            ¡Gracias!
          </h1>
          <p className="text-2xl text-slate-400 mb-8">
            Tu pedido ha sido procesado exitosamente
          </p>
          <p className="text-lg text-slate-500">
            Envíanos la imagen y el comprobante para completar tu compra
          </p>
        </div>

        {/* Botones de redes sociales */}
        <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Únete a Nuestra Comunidad
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href={config.social?.discord || '#'}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-discord"
              className="btn-gaming p-6 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold flex flex-col items-center gap-3 transition-all"
            >
              <MessageCircle className="w-10 h-10" />
              <span>Discord</span>
            </a>
            
            <a
              href={config.social?.whatsapp || '#'}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-whatsapp"
              className="btn-gaming p-6 rounded-xl bg-[#25D366] hover:bg-[#1FAD52] text-white font-bold flex flex-col items-center gap-3 transition-all"
            >
              <Phone className="w-10 h-10" />
              <span>WhatsApp</span>
            </a>
            
            <a
              href={config.social?.facebook || '#'}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-facebook"
              className="btn-gaming p-6 rounded-xl bg-[#1877F2] hover:bg-[#145DBF] text-white font-bold flex flex-col items-center gap-3 transition-all"
            >
              <Facebook className="w-10 h-10" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Botón para volver a empezar */}
        <button
          data-testid="start-over-btn"
          onClick={onStartOver}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Hacer Otra Compra
        </button>
      </div>
    </section>
  );
};

export default ThankYou;