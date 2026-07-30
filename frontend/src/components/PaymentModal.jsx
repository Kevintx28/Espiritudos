import React, { useEffect } from 'react';
import { X, CreditCard, Send, Users, MessageCircle, Phone, CheckCircle2, FileCheck, Download as DownloadIcon } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onFinish, country }) => {
  const config = window.APP_CONFIG || {};
  const paymentMethods = window.PAYMENT_METHODS?.[country?.code] || [];

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
      data-testid="payment-modal-overlay"
    >
      <div
        className="relative bg-[#18181b] border border-purple-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
        data-testid="payment-modal"
      >
        {/* Close button */}
        <button
          data-testid="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-pulse-glow">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: 'Unbounded, sans-serif' }}>
              ¡Imagen Descargada!
            </h2>
            <p className="text-slate-400">
              Sigue estos pasos para completar tu compra
            </p>
          </div>

          {/* PASO 1 - Métodos de pago */}
          <div className="mb-8" data-testid="modal-step-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500 text-purple-400 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Realiza el pago</h3>
              </div>
            </div>
            <p className="text-slate-400 mb-4 ml-14">
              Utiliza uno de los siguientes métodos de pago disponibles:
            </p>
            <div className="ml-14 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  data-testid={`modal-payment-${method.id}`}
                  className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-center gap-2"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-white font-semibold text-sm">{method.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PASO 2 - Envíanos */}
          <div className="mb-8" data-testid="modal-step-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500 text-purple-400 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Envíanos</h3>
              </div>
            </div>
            <div className="ml-14 space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-white/10">
                <DownloadIcon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-white">La imagen descargada</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-black/30 border border-white/10">
                <FileCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-white">El comprobante de pago</span>
              </div>
            </div>
          </div>

          {/* PASO 3 - Únete a la comunidad */}
          <div className="mb-8" data-testid="modal-step-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500 text-purple-400 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Únete a nuestra comunidad</h3>
              </div>
            </div>
            <div className="ml-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={config.social?.discord || '#'}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="modal-discord-btn"
                className="btn-gaming p-5 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold flex items-center justify-center gap-3 transition-all"
              >
                <MessageCircle className="w-7 h-7" />
                <span className="text-lg">Discord</span>
              </a>
              <a
                href={config.social?.whatsapp || '#'}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="modal-whatsapp-btn"
                className="btn-gaming p-5 rounded-2xl bg-[#25D366] hover:bg-[#1FAD52] text-white font-bold flex items-center justify-center gap-3 transition-all"
              >
                <Phone className="w-7 h-7" />
                <span className="text-lg">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Botón Finalizar */}
          <button
            data-testid="modal-finish-btn"
            onClick={onFinish}
            className="w-full btn-gaming py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg"
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
