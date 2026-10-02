import React, { useEffect, useMemo, useState } from 'react';
import { Clock, Search, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { getFortniteLayoutAnchor, getFortniteProductAnchor, getFortniteSearchResults, groupFortniteLayoutProducts, useFortniteShopProducts } from './FortniteShop';
import { fortniteCatalog } from '../data/fortniteCatalog';
import { formatCountdown, getTimeRemaining, useFortniteShopClock } from '../lib/shopTimeUtils';

function matchesId(product, configuredId) {
  return [product.id, product.sourceId, product.layoutId, product.id?.replace(/^FN-/, '')].includes(configuredId);
}

function selectConfiguredProducts(products, ids, limit) {
  return ids.map((id) => products.find((product) => matchesId(product, id))).filter(Boolean).filter((product, index, all) => all.findIndex((candidate) => candidate.id === product.id) === index).slice(0, limit);
}

function selectDailyDeals(products, currentShopHash) {
  const storageKey = 'ktxstore:fortnite:daily-deals';
  let storedIds = fortniteCatalog.dailyDealApiIds;
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (stored?.shopHash === currentShopHash && Array.isArray(stored.ids)) storedIds = stored.ids;
  } catch {
    storedIds = fortniteCatalog.dailyDealApiIds;
  }
  const configured = selectConfiguredProducts(products, storedIds, 8);
  const target = Math.min(8, products.length);
  const remaining = products.filter((product) => !configured.some((selected) => selected.id === product.id));
  const dayNumber = Math.floor(Date.now() / 86400000);
  const offset = remaining.length ? dayNumber % remaining.length : 0;
  const rotated = remaining.slice(offset).concat(remaining.slice(0, offset));
  const selected = configured.concat(rotated).slice(0, target);
  try {
    localStorage.setItem(storageKey, JSON.stringify({ shopHash: currentShopHash, ids: selected.map((product) => product.id) }));
  } catch {
  }
  return selected.map((product) => ({ ...product, originalPrice: product.price, price: Number((product.price * (1 - fortniteCatalog.dailyDealDiscount)).toFixed(2)), discountPercent: fortniteCatalog.dailyDealDiscount * 100 }));
}

function ShopRefreshCounter({ nextExpiration, status }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);
  const remaining = nextExpiration ? getTimeRemaining(nextExpiration, now) : null;
  const pad = (value) => String(value).padStart(2, '0');
  const label = remaining && remaining.totalSeconds > 0 && status !== 'loading' ? `La tienda se actualiza en: ${pad(remaining.hours)}:${pad(remaining.minutes)}:${pad(remaining.seconds)}` : 'Actualizando tienda…';
  return <section data-testid="fortnite-shop-countdown" className="mb-8 rounded-2xl border border-yellow-900/40 bg-[#15131f] px-4 py-4 text-center"><p className="text-sm font-bold uppercase tracking-[0.15em] text-yellow-500">{label}</p></section>;
}

function DynamicGrid({ products, onAdd, isFeatured = false, layoutName, idPrefix }) {
  const addGiftProduct = (product) => onAdd({ ...product, creatorCodeEligible: true, creatorCodeScope: 'gift-shop' });
  return <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">{products.map((product) => <div key={product.id} id={layoutName ? getFortniteProductAnchor(layoutName, product.id) : idPrefix ? `${idPrefix}-${product.id}` : undefined} className="min-w-0"><ProductCard product={product} isFortnite isFeatured={isFeatured} isBundle={product.isBundle} onAdd={addGiftProduct} /></div>)}</div>;
}

function ManualGrid({ products, onAdd }) {
  return <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>;
}

function SectionHeading({ eyebrow, title, id, rightContent }) {
  return <div className="mb-4 border-b border-yellow-900/40 pb-3"><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">{eyebrow}</p>{rightContent ? <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2"><h3 id={id} className="text-2xl font-black text-white">{title}</h3>{rightContent}</div> : <h3 id={id} className="text-2xl font-black text-white">{title}</h3>}</div>;
}

function EmptyPackSlots() {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{fortniteCatalog.packSlots.map((slot) => <div key={slot} className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Próximamente</div>)}</div>;
}

function GiftShop({ products, onAdd, status, shopHash, nextExpiration }) {
  const deals = useMemo(() => selectDailyDeals(products, shopHash), [products, shopHash]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { remaining: shopResetRemaining } = useFortniteShopClock();
  if (status === 'loading' && !products.length) return <div><ShopRefreshCounter nextExpiration={nextExpiration} status={status} /><div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">Cargando tienda actual de Fortnite...</div></div>;
  if (status === 'error' && !products.length) return <div><ShopRefreshCounter nextExpiration={nextExpiration} status={status} /><div role="alert" className="rounded-2xl border border-red-500/40 bg-red-950/20 p-8 text-center text-red-200">No se pudo cargar la tienda de Fortnite. Intenta más tarde.</div></div>;
  if (!products.length) return <div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">La tienda de Fortnite no tiene ofertas disponibles ahora.</div>;
  const featured = selectConfiguredProducts(products, fortniteCatalog.featuredApiIds, 8);
  const newProducts = featured.length ? featured : products.slice(0, 4);
  const groups = groupFortniteLayoutProducts(products);
  const searchResults = getFortniteSearchResults(groups, searchQuery);
  const scrollToTarget = (targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSearchOpen(false);
  };
  const dealsSectionId = 'fortnite-offers-of-day';

  return <div className="space-y-10">
    <ShopRefreshCounter nextExpiration={nextExpiration} status={status} />
    <section aria-labelledby="fortnite-new-title"><SectionHeading eyebrow="Selección de la tienda" title="Lo nuevo de hoy" id="fortnite-new-title" /><DynamicGrid products={newProducts} isFeatured onAdd={onAdd} idPrefix="fortnite-featured-item" /></section>
    <section id={dealsSectionId} aria-labelledby="fortnite-deals-title"><SectionHeading eyebrow="Promoción diaria" title="Ofertas del día" id="fortnite-deals-title" rightContent={<span data-testid="fortnite-daily-deals-reset-countdown" aria-label={`La tienda se reinicia a las 7:00 p. m., hora de Perú. Faltan ${formatCountdown(shopResetRemaining)}`} title="Reinicio de tienda: 7:00 p. m., hora de Perú" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-yellow-900/70 bg-[#111111]/80 px-2.5 py-1 text-[10px] font-bold tabular-nums text-yellow-200 sm:text-xs"><Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{formatCountdown(shopResetRemaining)}</span>} /><DynamicGrid products={deals} onAdd={onAdd} idPrefix="fortnite-deal-item" /></section>
    <section aria-labelledby="fortnite-gift-title">
      <SectionHeading eyebrow="Tienda de Fortnite" title="Tienda vía regalo" id="fortnite-gift-title" />
      <div className="space-y-10">{groups.map(([section, sectionProducts]) => <section key={section} id={getFortniteLayoutAnchor(section)} aria-labelledby={`${getFortniteLayoutAnchor(section)}-title`}><h4 id={`${getFortniteLayoutAnchor(section)}-title`} className="mb-4 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{section} <span className="text-xs font-normal text-slate-500">({sectionProducts.length})</span></h4><DynamicGrid products={sectionProducts} onAdd={onAdd} layoutName={section} /></section>)}</div>
    </section>
    <button type="button" aria-label={searchOpen ? 'Cerrar búsqueda' : 'Buscar ítems o sets'} aria-expanded={searchOpen} onClick={() => { setSearchOpen((open) => !open); setSearchQuery(''); }} className="fixed right-4 top-1/2 z-40 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#15131f]/95 text-white shadow-xl backdrop-blur hover:border-cyan-400/60"><Search className="h-5 w-5" aria-hidden="true" /></button>
    {searchOpen && <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-xl border border-white/10 bg-[#15131f]/95 p-3 shadow-2xl backdrop-blur sm:bottom-8 sm:p-4">
      <div className="relative">
        <input type="search" autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Buscar ítem o set..." aria-label="Buscar por nombre de ítem o set" className="h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 pr-10 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60" />
        <button type="button" aria-label="Cerrar búsqueda" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center text-slate-400 hover:text-white"><X className="h-4 w-4" aria-hidden="true" /></button>
      </div>
      {searchQuery.trim() && <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-1" role="listbox" aria-label="Resultados de búsqueda">
        {searchResults.length ? searchResults.map((result) => <button key={`${result.type}-${result.targetId}`} type="button" role="option" aria-selected="false" onClick={() => scrollToTarget(result.targetId)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-white/10"><span className="block truncate text-sm font-semibold text-white">{result.label}</span><span className="block truncate text-xs text-slate-400">{result.detail}</span></button>) : <p className="px-3 py-2 text-sm text-slate-400">Sin resultados</p>}
      </div>}
    </div>}
  </div>;
}

export default function FortniteCatalog({ products, subcategory, onAdd }) {
  const { products: apiProducts, status, shopHash, nextExpiration } = useFortniteShopProducts();
  const passes = products.filter((product) => product.subcategory === 'passes');
  const accountTopups = products.filter((product) => product.subcategory === 'account-topups');
  const club = products.filter((product) => product.subcategory === 'club');
  if (subcategory === 'gift-shop') return <GiftShop products={apiProducts} status={status} shopHash={shopHash} nextExpiration={nextExpiration} onAdd={onAdd} />;
  if (subcategory === 'passes') return <section aria-labelledby="fortnite-passes-title"><SectionHeading eyebrow="Fortnite" title="Pases de Fortnite" id="fortnite-passes-title" /><ManualGrid products={passes} onAdd={onAdd} /></section>;
  return <div className="space-y-10"><section aria-labelledby="fortnite-account-title"><SectionHeading eyebrow="Fortnite" title="Vía cuenta" id="fortnite-account-title" /><h4 className="mb-4 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Recargas de pavos</h4><ManualGrid products={accountTopups} onAdd={onAdd} /><h4 className="mb-4 mt-10 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Club de Fortnite</h4><ManualGrid products={club} onAdd={(product) => onAdd({ ...product, creatorCodeEligible: true, creatorCodeScope: 'account-club' })} /><h4 className="mb-4 mt-10 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Packs de Fortnite</h4><EmptyPackSlots /></section></div>;
}
