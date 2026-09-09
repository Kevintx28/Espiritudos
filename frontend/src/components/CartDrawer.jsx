import React, { useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';

export default function CartDrawer({ items, total, onChange, onClear, onContinue, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleClear = () => {
    if (window.confirm('¿Vaciar el carrito de este juego?')) onClear();
  };

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title" data-testid="cart-drawer">
      <button type="button" aria-label="Cerrar carrito" onClick={onClose} className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#11101a] shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 id="cart-drawer-title" className="flex items-center gap-2 text-xl font-bold text-white"><ShoppingCart className="h-5 w-5 text-cyan-300" />Carrito</h2>
          <button type="button" data-testid="cart-drawer-close" aria-label="Cerrar carrito" onClick={onClose} className="rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="mb-5 flex justify-end"><button type="button" data-testid="cart-drawer-clear" onClick={handleClear} className="flex items-center gap-1 text-xs font-bold text-red-300 transition hover:text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"><Trash2 className="h-4 w-4" />Vaciar carrito</button></div>
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3"><p className="text-sm font-bold text-white">{product.name}</p><p className="shrink-0 text-sm font-bold text-cyan-300">{product.price === null ? 'Prueba' : `S/ ${(product.price * quantity).toFixed(2)}`}</p></div>
                <div className="mt-3 flex items-center gap-2"><button type="button" aria-label={`Disminuir cantidad de ${product.name}`} onClick={() => onChange(product, quantity - 1)} className="rounded-lg border border-white/20 p-2 text-slate-200 hover:border-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><Minus className="h-4 w-4" /></button><span className="min-w-8 text-center text-sm font-bold text-white">{quantity}</span><button type="button" aria-label={`Aumentar cantidad de ${product.name}`} onClick={() => onChange(product, quantity + 1)} className="rounded-lg border border-white/20 p-2 text-slate-200 hover:border-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><Plus className="h-4 w-4" /></button><span className="ml-auto text-xs text-slate-500">Unitario: {product.price === null ? 'Precio por definir' : `S/ ${product.price.toFixed(2)}`}</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 bg-[#15131f] p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]"><div className="flex items-center justify-between text-lg font-black text-white"><span>Total</span><span className="text-cyan-300">S/ {total.toFixed(2)}</span></div><p className="mt-1 text-xs text-slate-500">Moneda: PEN (S/)</p><button type="button" data-testid="cart-drawer-checkout" onClick={onContinue} className="mt-4 w-full rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950 transition hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">Continuar compra</button></div>
      </aside>
    </div>
  );
}
