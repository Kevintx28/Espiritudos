import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { resolveFortniteImage } from './FortniteItemImage';
import { formatCountdown, getFortniteItemCountdown, useFortniteShopClock } from '../lib/shopTimeUtils';

const SHOP_URL = 'https://fortnite-api.com/v2/shop?language=es-419';

function displayValue(value) {
  if (typeof value === 'string') return value;
  return value?.displayValue || value?.name || '';
}

export function normalizeEntry(entry, index) {
  const items = Array.isArray(entry.brItems)
    ? entry.brItems
    : (Array.isArray(entry.items) ? entry.items : []);
  const firstItem = items[0] || {};
  const vbucks = Number(entry.finalPrice);
  if (!Number.isFinite(vbucks) || vbucks < 0) return null;

  const section = entry.section || {};
  const sectionName = displayValue(section.displayName || section.name || entry.sectionName) || 'Tienda Fortnite';
  const itemNames = items.map((item) => item.name || item.displayName).filter(Boolean);
  const itemTypes = items.map((item) => displayValue(item.type)).filter(Boolean);
  const rarities = items.map((item) => displayValue(item.rarity)).filter(Boolean);
  const image = resolveFortniteImage({ ...entry, brItems: items });
  const offerId = entry.offerId || entry.devName || itemNames.join('-');
  const bundleName = entry.bundle?.name || entry.bundle?.displayName;
  const isBundle = Boolean(entry.bundle || items.length > 1);
  const realName = isBundle
    ? (bundleName || displayValue(entry.layout?.name) || itemNames[0])
    : (itemNames[0] || entry.name || entry.displayName || displayValue(entry.layout?.name));
  const realType = itemTypes[0] || displayValue(entry.type);
  if (!realName || (!realType && !image)) {
    if (process.env.NODE_ENV !== 'production') console.warn(`[FortniteShop] Oferta descartada por datos incompletos: ${entry.offerId || entry.devName || `índice-${index}`}`);
    return null;
  }
  const uniqueName = isBundle
    ? realName
    : realName;

  return {
    id: `FN-${offerId}`,
    gameId: 'fortnite',
    name: uniqueName,
    price: Number(((vbucks / 100) * 2).toFixed(2)),
    currency: 'PEN',
    fulfillmentAmount: vbucks,
    fulfillmentLabel: 'V-Bucks',
    image,
    type: isBundle ? 'Lote' : realType,
    rarity: isBundle ? '' : rarities[0] || '',
    isBundle,
    category: normalizeFortniteCategory({ isBundle, type: isBundle ? 'Lote' : itemTypes[0] || '' }),
    originalVbucks: vbucks,
    section: sectionName,
    sourceId: entry.offerId,
    layoutId: entry.layoutId || entry.layout?.id,
    endDate: entry.endDate || entry.availableUntil || entry.shopEndDate || entry.outDate || items[0]?.endDate || items[0]?.availableUntil,
    note: 'Entrega manual por sistema de regalos de Fortnite'
  };
}

export function normalizeFortniteCategory(item) {
  if (item?.isBundle || String(item?.type || '').toLowerCase().includes('lote')) return 'Lotes';
  const type = String(item?.type || '').toLowerCase();
  if (type.includes('outfit') || type.includes('traje') || type.includes('skin')) return 'Trajes';
  if (type.includes('back bling') || type.includes('backpack') || type.includes('mochila')) return 'Mochilas retro';
  if (type.includes('pickaxe') || type.includes('pico')) return 'Picos';
  if (type.includes('glider') || type.includes('planeador')) return 'Planeadores';
  if (type.includes('emote') || type.includes('gesture') || type.includes('gesto')) return 'Gestos';
  if (type.includes('wrap') || type.includes('envoltorio') || type.includes('envoltorios')) return 'Envoltorios';
  if (type.includes('vehicle') || type.includes('carro') || type.includes('vehículo') || type.includes('vehiculo')) return 'Vehículos';
  return 'Destacados / Otros';
}

export function isExcludedEntry(entry) {
  const section = entry.section || {};
  const categoryText = [
    section.displayName,
    section.name,
    entry.sectionName,
    entry.category,
    entry.devName
  ].map(displayValue).join(' ').toLowerCase();
  return categoryText.includes('lego') || categoryText.includes('juno');
}

export default function FortniteShop({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const { now, nextReset, remaining, justReset } = useFortniteShopClock();

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    fetch(SHOP_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Fortnite shop request failed: ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const entries = payload?.data?.shop?.entries || payload?.data?.entries || payload?.shop?.entries || [];
        const dynamicProducts = entries
          .filter((entry) => !isExcludedEntry(entry))
          .map(normalizeEntry)
          .filter(Boolean);
        setProducts(dynamicProducts);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });
    return () => controller.abort();
  }, []);

  if (status === 'loading') return <div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">Cargando tienda actual de Fortnite...</div>;
  if (status === 'error') return <div role="alert" className="rounded-2xl border border-red-500/40 bg-red-950/20 p-8 text-center text-red-200">No se pudo cargar la tienda de Fortnite. Intenta más tarde.</div>;
  if (!products.length) return <div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">La tienda de Fortnite no tiene ofertas disponibles ahora.</div>;

  const featuredIds = window.KTX_STORE_CONFIG?.featuredFortniteProductIds || [];
  const featuredProducts = products.filter((product) => featuredIds.includes(product.id) || featuredIds.includes(product.sourceId) || featuredIds.includes(product.layoutId)).slice(0, 6);
  const categoryOrder = ['Lotes', 'Trajes', 'Mochilas retro', 'Picos', 'Planeadores', 'Gestos', 'Envoltorios', 'Vehículos', 'Destacados / Otros'];
  const productsBySection = products.reduce((groups, product) => {
    const section = product.category || normalizeFortniteCategory(product);
    groups[section] = groups[section] || [];
    groups[section].push(product);
    return groups;
  }, {});

  const orderedSections = categoryOrder.filter((section) => productsBySection[section]).map((section) => [section, productsBySection[section]]);
  return <div className="space-y-10">
    <section data-testid="fortnite-shop-countdown" className="mx-auto max-w-md py-2 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">LA TIENDA SE ACTUALIZA EN</p><p className="mt-1 text-2xl font-black tracking-wider text-white sm:text-3xl">{formatCountdown(remaining)}</p><p data-testid="fortnite-shop-reset-label" className="mt-1 text-[11px] text-slate-400">7:00 PM · Hora de Perú</p>{justReset && <p className="mt-1 text-[11px] text-yellow-200">La tienda se ha reiniciado. Actualiza el catálogo cuando se sincronicen los nuevos artículos.</p>}</section>
    {featuredProducts.length > 0 && <section data-testid="fortnite-featured-section" aria-labelledby="fortnite-featured-title"><div className="mb-4 border-b border-yellow-900/40 pb-3"><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">Selección de la tienda</p><h3 id="fortnite-featured-title" className="text-2xl font-black text-white">Destacados de KTXStore</h3></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featuredProducts.map((product) => <div key={`featured-${product.id}`} data-testid={`fortnite-featured-${product.id}`}><ProductCard product={product} isFortnite isFeatured shopNow={now} nextReset={nextReset} onAdd={onAdd} /></div>)}</div></section>}
    {orderedSections.map(([section, sectionProducts]) => <section key={section} aria-labelledby={`fortnite-section-${section}`} data-testid={section === 'Lotes' ? 'fortnite-bundles-section' : `fortnite-category-${section.toLowerCase().replace(/\s+\/\s+|\s+/g, '-')}`}><h3 id={`fortnite-section-${section}`} className="mb-4 border-b border-yellow-900/40 pb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{section} <span className="text-xs font-normal text-slate-500">({sectionProducts.length})</span></h3><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{sectionProducts.map((product) => <div key={product.id} data-testid={section === 'Lotes' ? `fortnite-bundle-${product.id}` : undefined}><ProductCard product={product} isFortnite isBundle={section === 'Lotes'} shopNow={now} nextReset={nextReset} onAdd={onAdd} /></div>)}</div></section>)}
  </div>;
}
