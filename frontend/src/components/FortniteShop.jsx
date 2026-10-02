import React, { useCallback, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { resolveFortniteImage } from './FortniteItemImage';
import { formatCountdown, getFortniteItemCountdown, getTimeRemaining, useFortniteShopClock } from '../lib/shopTimeUtils';
import { FORTNITE_VBUCKS_RATE, fortniteCatalog } from '../data/fortniteCatalog';

const SHOP_URL = 'https://fortnite-api.com/v2/shop?language=es-419';
const SHOP_CACHE_KEY = 'ktxstore:fortnite:shop-cache';

function shopHash(entries) {
  let hash = 2166136261;
  const value = JSON.stringify(entries);
  for (let index = 0; index < value.length; index += 1) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  return (hash >>> 0).toString(16);
}

function readShopCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(SHOP_CACHE_KEY) || 'null');
    if (cached?.products?.length) return cached;
  } catch {
    return null;
  }
  return null;
}

function nextExpiration(products) {
  const dates = products.map((product) => new Date(product.endDate).getTime()).filter((date) => Number.isFinite(date) && date > Date.now());
  return dates.length ? Math.min(...dates) : null;
}

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
    price: Number(((vbucks / 100) * FORTNITE_VBUCKS_RATE).toFixed(2)),
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
    layoutName: displayValue(entry.layout?.name) || entry.layoutId || sectionName,
    layoutRank: entry.layout?.rank !== null && entry.layout?.rank !== undefined && entry.layout?.rank !== '' && Number.isFinite(Number(entry.layout.rank)) ? Number(entry.layout.rank) : null,
    sortPriority: entry.sortPriority ?? entry.layout?.sortPriority ?? null,
    sourceOrder: index,
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

export function groupFortniteLayoutProducts(products) {
  const groups = new Map();
  products.forEach((product, index) => {
    const name = product.layoutName || product.layoutId || product.section || product.category || 'Destacados / Otros';
    if (!groups.has(name)) {
      groups.set(name, {
        rank: null,
        sourceOrder: Number.isFinite(product.sourceOrder) ? product.sourceOrder : index,
        products: []
      });
    }

    const group = groups.get(name);
    const rank = product.layoutRank === null || product.layoutRank === undefined || product.layoutRank === '' ? NaN : Number(product.layoutRank);
    if (Number.isFinite(rank) && (!Number.isFinite(group.rank) || rank > group.rank)) group.rank = rank;
    group.products.push({ product, index });
  });

  const groupsByRank = [...groups.entries()].map(([name, group]) => {
    const orderedProducts = group.products.sort((left, right) => {
      const bundleDifference = Number(Boolean(right.product.isBundle)) - Number(Boolean(left.product.isBundle));
      if (bundleDifference) return bundleDifference;

      const leftPriority = left.product.sortPriority === null || left.product.sortPriority === undefined || left.product.sortPriority === '' ? NaN : Number(left.product.sortPriority);
      const rightPriority = right.product.sortPriority === null || right.product.sortPriority === undefined || right.product.sortPriority === '' ? NaN : Number(right.product.sortPriority);
      if (Number.isFinite(leftPriority) && Number.isFinite(rightPriority) && leftPriority !== rightPriority) return leftPriority - rightPriority;
      if (Number.isFinite(leftPriority) !== Number.isFinite(rightPriority)) return Number.isFinite(leftPriority) ? -1 : 1;
      return left.index - right.index;
    }).map(({ product }) => product);

    return [name, orderedProducts, group.rank, group.sourceOrder];
  });

  return groupsByRank
    .sort((left, right) => {
      const leftRank = Number.isFinite(left[2]) ? left[2] : Number.NEGATIVE_INFINITY;
      const rightRank = Number.isFinite(right[2]) ? right[2] : Number.NEGATIVE_INFINITY;
      return rightRank - leftRank || left[3] - right[3];
    })
    .map(([name, groupedProducts]) => [name, groupedProducts]);
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

export function useFortniteShopProducts() {
  const [state, setState] = useState(() => readShopCache() || { products: [], status: 'loading', shopHash: null, nextExpiration: null });
  const fetchShop = useCallback(async () => {
    setState((current) => ({ ...current, status: 'loading' }));
    try {
      const response = await fetch(SHOP_URL);
      if (!response.ok) throw new Error(`Fortnite shop request failed: ${response.status}`);
      const payload = await response.json();
      const entries = payload?.data?.shop?.entries || payload?.data?.entries || payload?.shop?.entries || [];
      const products = entries.filter((entry) => !isExcludedEntry(entry)).map(normalizeEntry).filter(Boolean);
      const nextState = { products, status: 'ready', shopHash: shopHash(entries), nextExpiration: nextExpiration(products) };
      localStorage.setItem(SHOP_CACHE_KEY, JSON.stringify(nextState));
      setState(nextState);
    } catch {
      setState((current) => ({ ...current, status: current.products.length ? 'stale' : 'error', nextExpiration: null }));
    }
  }, []);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (state.status !== 'loading' && state.nextExpiration && Date.now() >= state.nextExpiration) fetchShop();
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [fetchShop, state.nextExpiration, state.status]);

  return { ...state, refresh: fetchShop };
}

export default function FortniteShop({ onAdd }) {
  const { products, status } = useFortniteShopProducts();
  const { now, nextReset, remaining, justReset } = useFortniteShopClock();

  if (status === 'loading') return <div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">Cargando tienda actual de Fortnite...</div>;
  if (status === 'error') return <div role="alert" className="rounded-2xl border border-red-500/40 bg-red-950/20 p-8 text-center text-red-200">No se pudo cargar la tienda de Fortnite. Intenta más tarde.</div>;
  if (!products.length) return <div className="rounded-2xl border border-white/10 bg-[#15131f] p-8 text-center text-slate-300">La tienda de Fortnite no tiene ofertas disponibles ahora.</div>;

  const featuredIds = fortniteCatalog.featuredApiIds;
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
