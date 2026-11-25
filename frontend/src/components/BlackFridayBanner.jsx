import React from 'react';

export default function BlackFridayBanner({ onAction, actionLabel, offerCount = 28 }) {
  return <section aria-label="Evento Black Friday" className="black-friday-banner relative overflow-hidden rounded-2xl border border-yellow-300/50 bg-gradient-to-r from-red-950 via-yellow-950 to-red-950 p-5 shadow-xl shadow-red-950/40 sm:p-7">
    <span aria-hidden="true" className="black-friday-sparkle absolute right-8 top-3 text-3xl text-yellow-200">✦</span>
    <span aria-hidden="true" className="black-friday-sparkle black-friday-sparkle--delay absolute bottom-4 right-1/3 text-xl text-amber-200">✦</span>
    <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-200">Evento especial · Fortnite vía regalo</p>
        <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Ofertas de Black Friday!</h2>
        <p className="mt-2 max-w-xl text-sm text-yellow-50/90">{offerCount} artículos con descuento, renovados cada día a las 7:01 p. m. (hora de Perú).</p>
      </div>
      {onAction && <button type="button" onClick={onAction} className="btn-gaming shrink-0 rounded-xl border border-yellow-200/50 bg-yellow-300 px-5 py-3 text-sm font-black text-red-950 shadow-lg shadow-yellow-950/30">{actionLabel}</button>}
    </div>
  </section>;
}
