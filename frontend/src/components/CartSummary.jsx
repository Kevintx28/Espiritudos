import React from 'react';
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react';

const CartSummary = ({ selectedSpirits, country, onBack, onContinue }) => {
  const spirits = window.SPIRITS || [];
  const discounts = window.APP_CONFIG?.discounts || [];

  const items = Object.entries(selectedSpirits).map(([id, quantity]) => {
    const spirit = spirits.find(s => s.id === id);
    return {
      ...spirit,
      quantity,
      unitPrice: country.pricePerSpirit,
      subtotal: quantity * country.pricePerSpirit
    };
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  
  // Calcular descuento por cantidad
  const discountConfig = discounts.find(d => totalQuantity >= d.min && totalQuantity <= d.max);
  const discountPercentage = discountConfig?.percentage || 0;
  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal - discountAmount;

  return (
    <section className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            data-testid="back-to-catalog"
            onClick={onBack}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al catálogo
          </button>
          
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Resumen de tu Pedido
          </h2>
        </div>

        <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8 mb-8">
          {/* Lista de items */}
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                  crossOrigin="anonymous"
                />
                
                <div className="flex-1">
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-slate-400 text-sm capitalize">{item.rarity}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold">x{item.quantity}</div>
                  <div className="text-slate-400 text-sm">
                    {country.symbol}{item.unitPrice.toFixed(2)} c/u
                  </div>
                </div>
                
                <div className="text-white font-bold text-xl">
                  {country.symbol}{item.subtotal.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="border-t border-white/10 pt-6 space-y-3">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal ({totalQuantity} spirits)</span>
              <span>{country.symbol}{subtotal.toFixed(2)}</span>
            </div>
            
            {discountPercentage > 0 && (
              <div className="flex justify-between text-green-400 items-center">
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Descuento por cantidad ({discountPercentage}%)
                </span>
                <span>-{country.symbol}{discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-white text-2xl font-bold pt-3 border-t border-white/10">
              <span>Total</span>
              <span data-testid="cart-total" className="text-gradient">
                {country.symbol}{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          data-testid="continue-to-form"
          onClick={onContinue}
          className="w-full btn-gaming py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg flex items-center justify-center gap-3"
        >
          Continuar con mis Datos
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default CartSummary;