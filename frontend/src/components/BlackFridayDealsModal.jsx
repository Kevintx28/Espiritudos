import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ProductCard from './ProductCard';

export default function BlackFridayDealsModal({ products, onAdd, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 backdrop-blur-sm sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="black-friday-modal-title" className="flex max-h-[95vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-yellow-400/50 bg-[#111111] shadow-2xl shadow-yellow-950/40">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-yellow-900/50 bg-gradient-to-r from-red-950/70 to-yellow-950/50 p-4 sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">Solo por tiempo limitado</p>
          <h2 id="black-friday-modal-title" className="mt-1 text-xl font-black text-white sm:text-3xl">Las {products.length} ofertas de Black Friday</h2>
          <p className="mt-1 text-sm text-slate-300">El precio tachado es el original; el precio destacado ya incluye el descuento.</p>
        </div>
        <button type="button" aria-label="Cerrar ofertas de Black Friday" onClick={onClose} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-200 hover:border-yellow-300 hover:text-white"><X className="h-5 w-5" aria-hidden="true" /></button>
      </header>
      <div className="overflow-y-auto p-3 sm:p-6">
        <p className="mb-4 text-sm font-bold text-yellow-200">{products.length} ofertas disponibles hoy</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} isFortnite isDailyDeal onAdd={onAdd} />)}</div>
      </div>
    </section>
  </div>;
}
