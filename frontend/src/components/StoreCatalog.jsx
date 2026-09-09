import React from 'react';
import ProductCard from './ProductCard';
import { Clock } from 'lucide-react';
import FortniteShop from './FortniteShop';

export default function StoreCatalog({ game, products, onAdd }) {
  if (game.comingSoon) return <div className="rounded-2xl border border-dashed border-pink-400/40 bg-pink-400/5 p-10 text-center"><Clock className="mx-auto mb-4 h-10 w-10 text-pink-300" /><h2 className="text-2xl font-bold text-white">League of Legends RP</h2><p className="mt-2 text-slate-400">Próximamente, visible sin opción de compra.</p></div>;
  return <section aria-labelledby="catalog-title"><div className="mb-5"><p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Catálogo</p><h2 id="catalog-title" className="text-2xl font-bold text-white">{game.name}</h2></div>{game.id === 'fortnite' ? <FortniteShop onAdd={onAdd} /> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div>}</section>;
}
