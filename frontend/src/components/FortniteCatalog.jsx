import React from 'react';
import ProductCard from './ProductCard';
import FortniteShop from './FortniteShop';

const packSlots = ['pack-1', 'pack-2', 'pack-3', 'pack-4'];

function StaticProducts({ products, onAdd }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>;
}

function EmptyPackSlots() {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{packSlots.map((slot) => <div key={slot} className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Próximamente</div>)}</div>;
}

export default function FortniteCatalog({ products, subcategory, onAdd }) {
  if (subcategory === 'gift-shop') {
    return <div className="space-y-10"><section aria-labelledby="fortnite-gift-title"><div className="mb-4 border-b border-yellow-900/40 pb-3"><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">Tienda de Fortnite</p><h3 id="fortnite-gift-title" className="text-2xl font-black text-white">Vía regalo</h3></div><FortniteShop onAdd={onAdd} /></section><section aria-labelledby="fortnite-passes-gift-title"><div className="mb-4 border-b border-yellow-900/40 pb-3"><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">Contenido adicional</p><h3 id="fortnite-passes-gift-title" className="text-xl font-black text-white">Pases de Fortnite · Vía regalo</h3></div><StaticProducts products={products.filter((product) => product.subcategory === 'passes')} onAdd={onAdd} /></section></div>;
  }

  if (subcategory === 'packs') return <section aria-labelledby="fortnite-packs-title"><div className="mb-4 border-b border-yellow-900/40 pb-3"><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">Contenido adicional</p><h3 id="fortnite-packs-title" className="text-2xl font-black text-white">Packs de Fortnite</h3></div><EmptyPackSlots /></section>;

  const title = subcategory === 'passes' ? 'Pases de Fortnite' : subcategory === 'account-topups' ? 'Recargas dentro de la cuenta' : 'Club de Fortnite';
  const sectionProducts = products.filter((product) => product.subcategory === subcategory);
  return <section aria-labelledby="fortnite-subcategory-title"><div className="mb-4 border-b border-yellow-900/40 pb-3"><p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-500">Fortnite</p><h3 id="fortnite-subcategory-title" className="text-2xl font-black text-white">{title}</h3></div><StaticProducts products={sectionProducts} onAdd={onAdd} /></section>;
}
