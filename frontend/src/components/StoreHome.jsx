import React from 'react';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import { storeFeaturedGames, storeMoreGames } from '../data/storeCatalog';

function GameTile({ game, onSelect, featured = false }) {
  return <button type="button" onClick={() => onSelect(game.id)} className={`group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#15131f] text-left shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-yellow-400/70 focus:outline-none focus:ring-2 focus:ring-cyan-300 ${featured ? 'sm:aspect-[16/10]' : ''}`}>
    {game.image ? <div className="aspect-[16/9] overflow-hidden bg-[#11101a]"><img src={game.image} alt={game.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" /></div> : <div className="flex aspect-[16/9] items-center justify-center bg-[#11101a]"><Gamepad2 className="h-10 w-10 text-yellow-500" /></div>}
    <div className="flex items-center justify-between gap-3 p-4"><div><h3 className="text-lg font-bold text-white">{game.name}</h3>{game.status === 'coming-soon' && <p className="mt-1 text-xs text-slate-400">Estamos preparando esta categoría</p>}</div><ArrowRight className="h-5 w-5 shrink-0 text-cyan-300 transition group-hover:translate-x-1" /></div>
  </button>;
}

export default function StoreHome({ onSelect }) {
  return <section aria-labelledby="store-home-title" className="space-y-10"><div className="max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-yellow-500">Tienda</p><h1 id="store-home-title" className="text-4xl font-black text-white md:text-6xl">Explora KTXStore</h1><p className="mt-4 text-slate-400">Elige tu juego y encuentra recargas, códigos y entregas disponibles.</p></div><section aria-labelledby="featured-games-title"><h2 id="featured-games-title" className="mb-5 text-2xl font-black text-white">Juegos destacados</h2><div className="grid gap-4 md:grid-cols-3">{storeFeaturedGames.map((game) => <GameTile key={game.id} game={game} featured onSelect={onSelect} />)}</div></section><section aria-labelledby="more-games-title"><h2 id="more-games-title" className="mb-5 text-2xl font-black text-white">Más juegos</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{storeMoreGames.map((game) => <GameTile key={game.id} game={game} onSelect={onSelect} />)}</div></section></section>;
}
