import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

const SpiritsCatalog = ({ country, onContinue }) => {
  const spirits = window.SPIRITS || [];
  const [quantities, setQuantities] = useState({});
  const [selectedRarity, setSelectedRarity] = useState('all');

  const rarities = [
    { value: 'all', label: 'Todos', color: 'gray' },
    { value: 'legendary', label: 'Legendario', color: '#f59e0b' },
    { value: 'epic', label: 'Épico', color: '#a855f7' },
    { value: 'rare', label: 'Raro', color: '#3b82f6' },
    { value: 'uncommon', label: 'Poco Común', color: '#22c55e' },
    { value: 'common', label: 'Común', color: '#94a3b8' }
  ];

  const filteredSpirits = selectedRarity === 'all' 
    ? spirits 
    : spirits.filter(s => s.rarity === selectedRarity);

  const handleQuantityChange = (spiritId, change) => {
    setQuantities(prev => {
      const current = prev[spiritId] || 0;
      const newValue = Math.max(0, current + change);
      if (newValue === 0) {
        const { [spiritId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [spiritId]: newValue };
    });
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleContinue = () => {
    if (totalItems > 0) {
      onContinue(quantities);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
          Catálogo de Spirits
        </h2>
        
        {/* Filtros de rareza */}
        <div className="flex flex-wrap gap-3 mb-8">
          {rarities.map((rarity) => (
            <button
              key={rarity.value}
              data-testid={`filter-${rarity.value}`}
              onClick={() => setSelectedRarity(rarity.value)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedRarity === rarity.value
                  ? 'bg-purple-500 text-white neon-glow'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              style={{
                borderColor: rarity.value === selectedRarity && rarity.color !== 'gray' ? rarity.color : 'transparent',
                borderWidth: '2px'
              }}
            >
              {rarity.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Spirits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredSpirits.map((spirit) => {
          const quantity = quantities[spirit.id] || 0;
          return (
            <div
              key={spirit.id}
              data-testid={`spirit-${spirit.id}`}
              className={`spirit-card rarity-${spirit.rarity} bg-[#18181b] border-2 rounded-xl overflow-hidden ${
                quantity > 0 ? 'selected' : ''
              }`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={spirit.image}
                  alt={spirit.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  crossOrigin="anonymous"
                />
                {quantity > 0 && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg neon-glow">
                    {quantity}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: `${rarities.find(r => r.value === spirit.rarity)?.color}20`,
                      color: rarities.find(r => r.value === spirit.rarity)?.color
                    }}
                  >
                    {rarities.find(r => r.value === spirit.rarity)?.label}
                  </span>
                </div>
                
                <h3 className="text-white font-bold text-lg mb-2">{spirit.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{spirit.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-white font-bold text-xl">
                    {country.symbol}{(country.pricePerSpirit).toFixed(2)}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      data-testid={`decrease-${spirit.id}`}
                      onClick={() => handleQuantityChange(spirit.id, -1)}
                      disabled={quantity === 0}
                      className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    
                    <button
                      data-testid={`increase-${spirit.id}`}
                      onClick={() => handleQuantityChange(spirit.id, 1)}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all neon-glow"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botón Continuar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 glass-effect border-t border-white/10">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-white">
              <div className="text-sm text-slate-400">Total de items</div>
              <div className="text-2xl font-bold">{totalItems} Spirits</div>
            </div>
            
            <button
              data-testid="continue-to-summary"
              onClick={handleContinue}
              className="btn-gaming px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-6 h-6" />
              Continuar al Resumen
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpiritsCatalog;