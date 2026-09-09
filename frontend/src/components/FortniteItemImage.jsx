import React, { useState } from 'react';
import { Axe, CarFront, ImageOff, Package, Shirt, Sparkles } from 'lucide-react';

export function resolveFortniteImage(item) {
  const renderImages = item?.newDisplayAsset?.renderImages;
  const renderImage = Array.isArray(renderImages)
    ? renderImages.map((entry) => (typeof entry === 'string' ? entry : entry?.image)).find(Boolean)
    : null;
  const displayAsset = Array.isArray(item?.displayAssets) ? item.displayAssets[0] : item?.displayAssets;
  const candidates = [
    item?.image,
    item?.bundle?.image,
    renderImage,
    item?.images?.featured,
    item?.images?.icon,
    item?.brItems?.[0]?.images?.featured,
    item?.brItems?.[0]?.images?.icon,
    displayAsset?.full_background,
    displayAsset?.background,
    displayAsset?.url
  ];
  return candidates.find((candidate) => typeof candidate === 'string' && candidate.trim()) || null;
}

function categoryIcon(category) {
  if (category === 'Lotes') return Package;
  if (category === 'Picos') return Axe;
  if (category === 'Vehículos') return CarFront;
  if (category === 'Gestos') return Sparkles;
  if (category === 'Trajes') return Shirt;
  return ImageOff;
}

export default function FortniteItemImage({ item, category, className = '', testIdPrefix = 'fortnite-item-image', forCanvas = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const image = resolveFortniteImage(item);
  const Icon = categoryIcon(category);
  const fallbackId = item?.id || 'unknown';

  if (!image || failed) {
    return <div data-testid={`${testIdPrefix}-${fallbackId}`} className={`aspect-[4/3] w-full ${className}`}><div data-testid={`fortnite-image-fallback-${fallbackId}`} className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-yellow-900/40 bg-[#111111] px-3 text-center text-slate-400"><Icon className="mb-2 h-8 w-8 text-yellow-600" aria-hidden="true" /><span className="line-clamp-2 text-sm font-semibold text-white">{item?.name || 'Artículo Fortnite'}</span><span className="mt-1 text-xs">Imagen no disponible</span></div></div>;
  }

  return <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-yellow-900/40 bg-[#111111] ${className}`}><div className={`absolute inset-0 animate-pulse bg-white/5 ${loaded ? 'hidden' : 'block'}`} aria-hidden="true" /><img data-testid={`${testIdPrefix}-${fallbackId}`} src={image} alt={item?.name || 'Artículo Fortnite'} crossOrigin={forCanvas ? 'anonymous' : undefined} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`} loading="lazy" /></div>;
}
