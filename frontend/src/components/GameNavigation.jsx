import React from 'react';
import { Gamepad2, Crosshair, Crown, Flame, Target, Shield, Sparkles } from 'lucide-react';

const icons = { Gamepad2, Crosshair, Crown, Flame, Target, Shield, Sparkles };

export default function GameNavigation({ games, activeGame, onSelect }) {
  return <nav aria-label="Juegos" className="flex gap-2 overflow-x-auto pb-2" data-testid="game-navigation">
    {games.map((game) => {
      const Icon = icons[game.icon] || Gamepad2;
      return <button key={game.id} type="button" data-testid={`game-${game.id}`} onClick={() => !game.comingSoon && onSelect(game.id)} disabled={game.comingSoon} className={`flex min-w-max items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition ${activeGame === game.id ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200' : 'border-white/10 bg-white/5 text-slate-300 hover:border-pink-400/60'} ${game.comingSoon ? 'cursor-not-allowed opacity-60' : ''}`}>
        <Icon className="h-4 w-4" />{game.shortName}{game.comingSoon && <span className="text-xs text-pink-300">Próximamente</span>}
      </button>;
    })}
  </nav>;
}
