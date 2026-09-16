import React from 'react';
import { Plus, Clock } from 'lucide-react';
import FortniteItemImage from './FortniteItemImage';
import { formatCompactCountdown, formatLimaDate, getFortniteItemCountdown } from '../lib/shopTimeUtils';

export default function ProductCard({ product, isFortnite = false, isFeatured = false, isBundle = false, shopNow, nextReset, onAdd }) {
  const testOnly = product.testOnly;
  const isClubFortnite = product.gameId === 'club-fortnite' || product.subcategory === 'club';
  const itemCountdown = isFortnite ? getFortniteItemCountdown(product, shopNow, nextReset) : null;
  const countdownLabel = itemCountdown ? (itemCountdown.hasIndividualEnd ? `Disponible hasta: ${formatLimaDate(itemCountdown.endDate)}` : `Próx. cambio: ${formatCompactCountdown(itemCountdown.remaining)}`) : '';
  return <article className={`flex min-w-0 flex-col justify-between rounded-2xl border border-white/10 bg-[#15131f] p-3 shadow-lg shadow-purple-950/20 sm:p-5 ${isFortnite ? 'h-full' : ''}`} data-testid={`product-card-${product.id}`}>
    <div>{isFortnite ? <div className="relative"> <FortniteItemImage item={product} category={product.category} />{itemCountdown && <span data-testid={`fortnite-item-countdown-${product.id}`} title={countdownLabel} aria-label={countdownLabel} className={`absolute bottom-2 right-2 inline-flex max-w-[calc(100%-1rem)] items-center rounded-full border border-yellow-900/70 bg-[#111111]/90 px-1.5 py-1 text-[9px] font-semibold text-yellow-200 shadow-sm sm:px-2 sm:text-[10px] ${isBundle ? 'text-yellow-300' : ''}`}><Clock className="mr-1 h-3 w-3 shrink-0" aria-hidden="true" />{formatCompactCountdown(itemCountdown.remaining)}</span>}</div> : product.image && <div className="mb-3 aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-[#111111]"><img src={product.image} alt={product.name} className="h-full w-full object-contain object-center" loading="lazy" /></div>}
      {isClubFortnite && <span className="mb-2 inline-flex max-w-full rounded-full border border-yellow-600/60 bg-yellow-400 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-black sm:mb-3 sm:px-3 sm:text-xs">{product.badge || 'Club de Fortnite'}</span>}
      {isFeatured && <span className="mb-2 inline-flex max-w-full rounded-full border border-yellow-600/60 bg-yellow-400 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-black sm:mb-3 sm:px-3 sm:text-xs">Destacado</span>}
      {product.discountPercent && <span className="mb-2 inline-flex max-w-full rounded-full border border-emerald-500/60 bg-emerald-400 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-slate-950 sm:mb-3 sm:px-3 sm:text-xs">-{product.discountPercent}%</span>}
      {isBundle && <span className="mb-2 inline-flex max-w-full rounded-full border border-yellow-600/60 bg-yellow-400 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-black sm:mb-3 sm:px-3 sm:text-xs">Lote</span>}
      {!isFortnite && <div className="mb-3 flex min-w-0 items-start justify-between gap-2"><span className="truncate rounded-lg bg-purple-500/15 px-2 py-1 text-[10px] font-bold text-purple-200 sm:text-xs">{product.id}</span>{testOnly && <span className="text-[10px] font-bold text-amber-300 sm:text-xs">PRUEBA</span>}</div>}
      <h3 className="break-words text-sm font-bold text-white sm:text-lg">{product.name}</h3>
      {isClubFortnite && <><p className="mt-2 text-sm font-bold text-cyan-200">Duración: {product.duration}</p><p className="mt-2 text-sm leading-6 text-slate-300">{product.description}</p></>}
      {product.deliveryLabel && <p className="mt-2 text-sm font-bold text-cyan-200">Método: {product.deliveryLabel}</p>}
      {product.originalVbucks !== undefined && <p className="mt-2 text-sm font-bold text-white">{product.originalVbucks} V-Bucks{product.type ? ` · ${product.type}` : ''}</p>}
      {isFortnite && product.type && <p className="mt-2 text-sm text-slate-300">{product.type}</p>}
      {!isFortnite && product.rarity && <p className="mt-1 text-xs text-slate-400">Rareza: {product.rarity}</p>}
      {product.oldPrice && <p className="mt-3 text-sm text-slate-500 line-through">S/ {product.oldPrice.toFixed(2)}</p>}
      {product.originalPrice !== undefined && <p className="mt-3 text-sm text-slate-500 line-through">Precio normal: S/ {product.originalPrice.toFixed(2)}</p>}
      <p className="mt-1 text-lg font-black text-cyan-300 sm:text-2xl">{product.price === null ? 'Precio por definir' : `S/ ${product.price.toFixed(2)}`} </p>
      {product.note && <p className="mt-3 text-xs text-amber-200">{product.note}</p>}
    </div>
    <button type="button" data-testid={`add-${product.id}`} onClick={() => onAdd(product)} className="btn-gaming mt-4 flex items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-2 py-2 text-xs font-bold text-white sm:mt-5 sm:gap-2 sm:px-4 sm:py-3 sm:text-base"><Plus className="h-4 w-4" />Añadir</button>
  </article>;
}
