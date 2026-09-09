import React from 'react';
import { Plus, Clock } from 'lucide-react';

export default function ProductCard({ product, onAdd }) {
  const testOnly = product.testOnly;
  return <article className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#15131f] p-5 shadow-lg shadow-purple-950/20" data-testid={`product-card-${product.id}`}>
    <div><div className="mb-4 flex items-start justify-between gap-3"><span className="rounded-lg bg-purple-500/15 px-2 py-1 text-xs font-bold text-purple-200">{product.id}</span>{testOnly && <span className="text-xs font-bold text-amber-300">PRUEBA</span>}</div>
      <h3 className="text-lg font-bold text-white">{product.name}</h3>
      {product.oldPrice && <p className="mt-3 text-sm text-slate-500 line-through">S/ {product.oldPrice.toFixed(2)}</p>}
      <p className="mt-1 text-2xl font-black text-cyan-300">{product.price === null ? 'Precio por definir' : `S/ ${product.price.toFixed(2)}`} </p>
      {product.note && <p className="mt-3 text-xs text-amber-200">{product.note}</p>}
    </div>
    <button type="button" data-testid={`add-${product.id}`} onClick={() => onAdd(product)} className="btn-gaming mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-bold text-white"><Plus className="h-4 w-4" />Añadir</button>
  </article>;
}
