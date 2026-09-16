import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { useFortniteShopProducts } from './FortniteShop';
import { fortniteCatalog } from '../data/fortniteCatalog';

function matchesId(product, configuredId) {
  return [product.id, product.sourceId, product.layoutId, product.id?.replace(/^FN-/, '')].includes(configuredId);
}

function selectConfiguredProducts(products, ids, limit) {
  return ids.map((id) => products.find((product) => matchesId(product, id))).filter(Boolean).filter((product, index, all) => all.findIndex((candidate) => candidate.id === product.id) === index).slice(0, limit);
}

function selectDailyDeals(products) {
  const today = new Date().toISOString().slice(0, 10);
  const storageKey = 'ktxstore:fortnite:daily-deals';
  let storedIds = fortniteCatalog.dailyDealApiIds;
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (stored?.date === today && Array.isArray(stored.ids)) storedIds = stored.ids;
  } catch {
    storedIds = fortniteCatalog.dailyDealApiIds;
  }
  const configured = selectConfiguredProducts(products, storedIds, 6);
  const target = Math.min(6, Math.max(4, products.length));
  const remaining = products.filter((product) => !configured.some((selected) => selected.id === product.id));
  const dayNumber = Math.floor(Date.now() / 86400000);
  const offset = remaining.length ? dayNumber % remaining.length : 0;
  const rotated = remaining.slice(offset).concat(remaining.slice(0, offset));
  const selected = configured.concat(rotated).slice(0, target);
  try {
    localStorage.setItem(storageKey, JSON.stringify({ date: today, ids: selected.map((product) => product.id) }));
  } catch {
  }
  return selected.map((product) => ({ ...product, originalPrice: product.price, price: Number((product.price * (1 - fortniteCatalog.dailyDealDiscount)).toFixed(2)), discountPercent: fortniteCatalog.dailyDealDiscount * 100 }));
}

function DynamicGrid({ products, onAdd, isFeatured = false }) {
  return <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} isFortnite isFeatured={isFeatured} isBundle={product.isBundle} onAdd={onAdd} />)}</div>;
}

function ManualGrid({ products, onAdd }) {
  return <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>;
}

function SectionHeading({ eyebrow, title, id }) {
  return <div className="mb-4 border-b border-yellow-900/40 pb-3"><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">{eyebrow}</p><h3 id={id} className="text-2xl font-black text-white">{title}</h3></div>;
}

function EmptyPackSlots() {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{fortniteCatalog.packSlots.map((slot) => <div key={slot} className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Próximamente</div>)}</div>;
}

function getSectionGroups(products) {
  const groups = products.reduce((result, product) => {
    const section = product.section || product.category || 'Destacados / Otros';
    result[section] = result[section] || [];
    result[section].push(product);
    return result;
  }, {});
  return Object.entries(groups).sort(([left], [right]) => {
    const rank = (name) => {
      const index = fortniteCatalog.sectionOrder.findIndex((configured) => name.toLowerCase().includes(configured.toLowerCase()));
      return index === -1 ? fortniteCatalog.sectionOrder.length : index;
    };
    return rank(left) - rank(right) || left.localeCompare(right);
  });
}

function GiftShop({ products, onAdd, status }) {
  const deals = useMemo(() => selectDailyDeals(products), [products]);
  if (status === 'loading') return <div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">Cargando tienda actual de Fortnite...</div>;
  if (status === 'error') return <div role="alert" className="rounded-2xl border border-red-500/40 bg-red-950/20 p-8 text-center text-red-200">No se pudo cargar la tienda de Fortnite. Intenta más tarde.</div>;
  if (!products.length) return <div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">La tienda de Fortnite no tiene ofertas disponibles ahora.</div>;
  const featured = selectConfiguredProducts(products, fortniteCatalog.featuredApiIds, 8);
  const newProducts = featured.length ? featured : products.slice(0, 4);
  const groups = getSectionGroups(products);
  return <div className="space-y-10"><section aria-labelledby="fortnite-new-title"><SectionHeading eyebrow="Selección de la tienda" title="Lo nuevo de hoy" id="fortnite-new-title" /><DynamicGrid products={newProducts} isFeatured onAdd={onAdd} /></section><section aria-labelledby="fortnite-deals-title"><SectionHeading eyebrow="Promoción diaria" title="Ofertas del día" id="fortnite-deals-title" /><DynamicGrid products={deals} onAdd={onAdd} /></section><section aria-labelledby="fortnite-gift-title"><SectionHeading eyebrow="Tienda de Fortnite" title="Tienda vía regalo" id="fortnite-gift-title" /><nav aria-label="Secciones de la tienda vía regalo" className="mb-6 flex gap-2 overflow-x-auto pb-2">{groups.map(([section]) => <a key={section} href={`#fortnite-api-${section.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="min-w-max rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-300 hover:border-cyan-400/60">{section}</a>)}</nav><div className="space-y-10">{groups.map(([section, sectionProducts]) => <section key={section} id={`fortnite-api-${section.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} aria-labelledby={`fortnite-api-title-${section}`}><h4 id={`fortnite-api-title-${section}`} className="mb-4 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{section} <span className="text-xs font-normal text-slate-500">({sectionProducts.length})</span></h4><DynamicGrid products={sectionProducts} onAdd={onAdd} /></section>)}</div></section></div>;
}

export default function FortniteCatalog({ products, subcategory, onAdd }) {
  const { products: apiProducts, status } = useFortniteShopProducts();
  const passes = products.filter((product) => product.subcategory === 'passes');
  const accountTopups = products.filter((product) => product.subcategory === 'account-topups');
  const club = products.filter((product) => product.subcategory === 'club');
  if (subcategory === 'gift-shop') return <GiftShop products={apiProducts} status={status} onAdd={onAdd} />;
  if (subcategory === 'passes') return <section aria-labelledby="fortnite-passes-title"><SectionHeading eyebrow="Fortnite" title="Pases de Fortnite" id="fortnite-passes-title" /><ManualGrid products={passes} onAdd={onAdd} /></section>;
  return <div className="space-y-10"><section aria-labelledby="fortnite-account-title"><SectionHeading eyebrow="Fortnite" title="Vía cuenta" id="fortnite-account-title" /><h4 className="mb-4 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Recargas de pavos</h4><ManualGrid products={accountTopups} onAdd={onAdd} /><h4 className="mb-4 mt-10 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Club de Fortnite</h4><ManualGrid products={club} onAdd={onAdd} /><h4 className="mb-4 mt-10 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Packs de Fortnite</h4><EmptyPackSlots /></section></div>;
}
