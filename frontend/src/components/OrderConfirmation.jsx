import React from 'react';
import { ArrowLeft, Image as ImageIcon, CheckCircle } from 'lucide-react';

const OrderConfirmation = ({ selectedSpirits, userInfo, country, onBack, onGenerateImage }) => {
  const spirits = window.SPIRITS || [];
  const discounts = window.APP_CONFIG?.discounts || [];
  const paymentMethods = window.PAYMENT_METHODS?.[country.code] || [];
  const getPrice = window.getSpiritPrice || ((s, c) => c?.pricePerSpirit || 0);

  const items = Object.entries(selectedSpirits).map(([id, quantity]) => {
    const spirit = spirits.find(s => s.id === id);
    const unitPrice = getPrice(spirit, country);
    return {
      ...spirit,
      quantity,
      unitPrice,
      subtotal: quantity * unitPrice
    };
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const discountConfig = discounts.find(d => totalQuantity >= d.min && totalQuantity <= d.max);
  const discountPercentage = discountConfig?.percentage || 0;
  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal - discountAmount;

  const paymentMethod = paymentMethods.find(m => m.id === userInfo.paymentMethod);

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            data-testid="back-to-form"
            onClick={onBack}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a editar datos
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-10 h-10 text-green-400" />
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Confirmación del Pedido
            </h2>
          </div>
          <p className="text-slate-400">
            Revisa que todo esté correcto antes de generar la imagen
          </p>
        </div>

        <div className="space-y-6">
          {/* Datos del Cliente */}
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Tus Datos</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-slate-400 text-sm">Nombre</div>
                <div className="text-white font-semibold">{userInfo.name}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Epic ID</div>
                <div className="text-white font-semibold">{userInfo.epicId}</div>
              </div>
              {userInfo.discord && (
                <div>
                  <div className="text-slate-400 text-sm">Discord</div>
                  <div className="text-white font-semibold">{userInfo.discord}</div>
                </div>
              )}
              {userInfo.whatsapp && (
                <div>
                  <div className="text-slate-400 text-sm">WhatsApp</div>
                  <div className="text-white font-semibold">{userInfo.whatsapp}</div>
                </div>
              )}
              <div>
                <div className="text-slate-400 text-sm">Fecha de Entrega</div>
                <div className="text-white font-semibold">
                  {new Date(userInfo.date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Hora de Entrega</div>
                <div className="text-white font-semibold">{userInfo.time}</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Método de Pago</div>
                <div className="text-white font-semibold flex items-center gap-2">
                  <span>{paymentMethod?.icon}</span>
                  {paymentMethod?.name}
                </div>
              </div>
              {userInfo.comments && (
                <div className="md:col-span-2">
                  <div className="text-slate-400 text-sm">Comentarios</div>
                  <div className="text-white">{userInfo.comments}</div>
                </div>
              )}
            </div>
          </div>

          {/* Resumen de Spirits */}
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Spirits Seleccionados</h3>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                      crossOrigin="anonymous"
                    />
                    <div>
                      <div className="text-white font-semibold">{item.name}</div>
                      <div className="text-slate-400 text-sm">Cantidad: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-white font-bold">
                    {country.symbol}{item.subtotal.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{country.symbol}{subtotal.toFixed(2)}</span>
              </div>
              {discountPercentage > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Descuento ({discountPercentage}%)</span>
                  <span>-{country.symbol}{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-white text-2xl font-bold pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-gradient">{country.symbol}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          data-testid="generate-image-btn"
          onClick={onGenerateImage}
          className="w-full mt-8 btn-gaming py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg flex items-center justify-center gap-3"
        >
          <ImageIcon className="w-6 h-6" />
          Generar Imagen del Pedido
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmation;