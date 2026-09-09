import React from 'react';
import { Plus, Clock } from 'lucide-react';
import FortniteItemImage from './FortniteItemImage';
import { formatCompactCountdown, formatLimaDate, getFortniteItemCountdown } from '../lib/shopTimeUtils';

export default function ProductCard({ product, isFortnite = false, isFeatured = false, isBundle = false, shopNow, nextReset, onAdd }) {
  const testOnly = product.testOnly;
  const itemCountdown = isFortnite ? getFortniteItemCountdown(product, shopNow, nextReset) : null;
  const countdownLabel = itemCountdown ? (itemCountdown.hasIndividualEnd ? `Disponible hasta: ${formatLimaDate(itemCountdown.endDate)}` : `Próx. cambio: ${formatCompactCountdown(itemCountdown.remaining)}`) : '';
  return <article className={`flex flex-col justify-between rounded-2xl border border-white/10 bg-[#15131f] p-5 shadow-lg shadow-purple-950/20 ${isFortnite ? 'h-full' : ''}`} data-testid={`product-card-${product.id}`}>
    <div>{isFortnite ? <div className="relative"> <FortniteItemImage item={product} category={product.category} />{itemCountdown && <span data-testid={`fortnite-item-countdown-${product.id}`} title={countdownLabel} aria-label={countdownLabel} className={`absolute bottom-2 right-2 inline-flex max-w-[calc(100%-1rem)] items-center rounded-full border border-yellow-900/70 bg-[#111111]/90 px-2 py-1 text-[10px] font-semibold text-yellow-200 shadow-sm ${isBundle ? 'text-yellow-300' : ''}`}><Clock className="mr-1 h-3 w-3 shrink-0" aria-hidden="true" />{formatCompactCountdown(itemCountdown.remaining)}</span>}</div> : product.image && <img src={product.image} alt={product.name} className="mb-4 aspect-[4/3] w-full rounded-xl border border-white/10 object-cover" loading="lazy" />}
      {isFeatured && <span className="mb-3 inline-flex rounded-full border border-yellow-600/60 bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-black">Destacado</span>}
      {isBundle && <span className="mb-3 inline-flex rounded-full border border-yellow-600/60 bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-black">Lote</span>}
      {!isFortnite && <div className="mb-4 flex items-start justify-between gap-3"><span className="rounded-lg bg-purple-500/15 px-2 py-1 text-xs font-bold text-purple-200">{product.id}</span>{testOnly && <span className="text-xs font-bold text-amber-300">PRUEBA</span>}</div>}
      <h3 className="text-lg font-bold text-white">{product.name}</h3>
      {product.originalVbucks !== undefined && <p className="mt-2 text-sm font-bold text-white">{product.originalVbucks} V-Bucks{product.type ? ` · ${product.type}` : ''}</p>}
      {isFortnite && product.type && <p className="mt-2 text-sm text-slate-300">{product.type}</p>}
      {!isFortnite && product.rarity && <p className="mt-1 text-xs text-slate-400">Rareza: {product.rarity}</p>}
      {product.oldPrice && <p className="mt-3 text-sm text-slate-500 line-through">S/ {product.oldPrice.toFixed(2)}</p>}
      <p className="mt-1 text-2xl font-black text-cyan-300">{product.price === null ? 'Precio por definir' : `S/ ${product.price.toFixed(2)}`} </p>
      {product.note && <p className="mt-3 text-xs text-amber-200">{product.note}</p>}
    </div>
    <button type="button" data-testid={`add-${product.id}`} onClick={() => onAdd(product)} className="btn-gaming mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 font-bold text-white"><Plus className="h-4 w-4" />Añadir</button>
  </article>;
}
