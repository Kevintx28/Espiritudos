import React from 'react';
import { Download, CreditCard, Send, FileCheck, MessageCircle, UserPlus, RefreshCcw, CheckCircle2, ArrowRight } from 'lucide-react';

const NextSteps = ({ imageUrl, country, onFinish }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `fortnite-spirits-pedido-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const steps = [
    {
      number: 1,
      icon: <Download className="w-8 h-8" />,
      title: 'Descarga la imagen',
      description: 'Descarga la imagen generada de tu pedido'
    },
    {
      number: 2,
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Realiza el pago',
      description: 'Utiliza alguno de los métodos de pago disponibles'
    },
    {
      number: 3,
      icon: <FileCheck className="w-8 h-8" />,
      title: 'Envía la imagen',
      description: 'Envíanos la imagen generada del pedido'
    },
    {
      number: 4,
      icon: <Send className="w-8 h-8" />,
      title: 'Envía el comprobante',
      description: 'Envía el comprobante del pago realizado'
    },
    {
      number: 5,
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Envíanos ambos archivos',
      description: 'Por Discord o WhatsApp'
    },
    {
      number: 6,
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: 'Verificaremos el pago',
      description: 'Nuestro equipo verificará tu pago'
    },
    {
      number: 7,
      icon: <UserPlus className="w-8 h-8" />,
      title: 'Te agregaremos',
      description: 'Te agregaremos a Fortnite'
    },
    {
      number: 8,
      icon: <RefreshCcw className="w-8 h-8" />,
      title: 'Intercambio',
      description: 'Realizaremos el intercambio de Spirits'
    },
    {
      number: 9,
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: '¡Disfruta!',
      description: 'Disfruta tu colección de Spirits'
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            ¡Imagen Generada!
          </h2>
          <p className="text-xl text-slate-400">
            Sigue estos pasos para completar tu compra
          </p>
        </div>

        {/* Imagen generada */}
        <div className="mb-12">
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8">
            <img
              src={imageUrl}
              alt="Pedido generado"
              className="w-full rounded-xl shadow-2xl"
              data-testid="generated-image"
            />
            <button
              data-testid="download-image-btn"
              onClick={handleDownload}
              className="w-full mt-6 btn-gaming py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg flex items-center justify-center gap-3"
            >
              <Download className="w-6 h-6" />
              Descargar Imagen
            </button>
          </div>
        </div>

        {/* Siguientes pasos */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Siguientes Pasos
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                data-testid={`next-step-${step.number}`}
                className="bg-[#18181b] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <div className="text-purple-400 mb-2">
                      {step.icon}
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">{step.title}</h4>
                    <p className="text-slate-400 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Finalizar */}
        <button
          data-testid="finish-btn"
          onClick={onFinish}
          className="w-full btn-gaming py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg flex items-center justify-center gap-3"
        >
          Finalizar
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default NextSteps;