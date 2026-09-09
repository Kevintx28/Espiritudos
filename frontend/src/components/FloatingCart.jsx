import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function FloatingCart({ itemCount, total, onOpen }) {
  if (!itemCount) return null;

  return (
    <button
      type="button"
      data-testid="floating-cart"
      aria-label={`Ver carrito, ${itemCount} artículo${itemCount === 1 ? '' : 's'}`}
      onClick={onOpen}
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-30 flex items-center justify-between gap-3 rounded-2xl border border-cyan-300/40 bg-[#171222]/95 px-4 py-3 text-left shadow-2xl shadow-purple-950/50 backdrop-blur-xl transition hover:border-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:min-w-[220px] sm:justify-start"
    >
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 text-white">
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        <span data-testid="floating-cart-count" className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-cyan-300 px-1 text-xs font-black text-slate-950">
          {itemCount}
        </span>
      </span>
      <span className="min-w-0">
        <span className="hidden text-sm font-bold text-white sm:block">Ver carrito</span>
        <span className="block truncate text-xs text-slate-300 sm:hidden">Carrito · {itemCount} art.</span>
        <span data-testid="floating-cart-total" className="block text-base font-black text-cyan-300">S/ {total.toFixed(2)}</span>
      </span>
    </button>
  );
}
