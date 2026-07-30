import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const RARITIES = [
  { value: 'all', label: 'Todos', color: 'gray' },
  { value: 'legendary', label: 'Legendario', color: '#f59e0b' },
  { value: 'epic', label: 'Épico', color: '#a855f7' },
  { value: 'rare', label: 'Raro', color: '#3b82f6' },
  { value: 'uncommon', label: 'Poco Común', color: '#22c55e' },
  { value: 'common', label: 'Común', color: '#94a3b8' }
];

const INITIAL_VISIBLE = 12;
const LOAD_STEP = 12;

const SpiritsCatalog = ({ country, initialQuantities = {}, onUpdate, onContinue }) => {
  const spirits = window.SPIRITS || [];
  const categoriesCfg = window.SPIRIT_CATEGORIES || [];
  const getPrice = window.getSpiritPrice || ((s, c) => c?.pricePerSpirit || 0);

  const [quantities, setQuantities] = useState(initialQuantities);
  const [selectedRarity, setSelectedRarity] = useState('all');
  // Cantidad visible por categoría
  const [visibleByCategory, setVisibleByCategory] = useState(() => {
    const state = {};
    categoriesCfg.forEach((cat) => {
      state[cat.key] = INITIAL_VISIBLE;
    });
    return state;
  });

  const handleQuantityChange = (spiritId, change) => {
    setQuantities((prev) => {
      const current = prev[spiritId] || 0;
      const newValue = Math.max(0, current + change);
      let next;
      if (newValue === 0) {
        const { [spiritId]: _, ...rest } = prev;
        next = rest;
      } else {
        next = { ...prev, [spiritId]: newValue };
      }
      if (onUpdate) onUpdate(next);
      return next;
    });
  };

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleContinue = () => {
    if (totalItems > 0) onContinue(quantities);
  };

  const showMore = (categoryKey, total) => {
    setVisibleByCategory((prev) => ({
      ...prev,
      [categoryKey]: Math.min((prev[categoryKey] || INITIAL_VISIBLE) + LOAD_STEP, total),
    }));
  };

  const showLess = (categoryKey) => {
    setVisibleByCategory((prev) => ({
      ...prev,
      [categoryKey]: INITIAL_VISIBLE,
    }));
  };

  // Filtrar spirits por rareza seleccionada
  const filterByRarity = (list) =>
    selectedRarity === 'all' ? list : list.filter((s) => s.rarity === selectedRarity);

  // Agrupar spirits por categoría (respetando el orden en SPIRIT_CATEGORIES)
  const categorized = categoriesCfg.map((cat) => ({
    ...cat,
    items: filterByRarity(spirits.filter((s) => s.category === cat.key)),
  }));

  // Card individual (mismo diseño que antes)
  const renderCard = (spirit) => {
    const quantity = quantities[spirit.id] || 0;
    const price = getPrice(spirit, country);
    const rarityMeta = RARITIES.find((r) => r.value === spirit.rarity);
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
                backgroundColor: `${rarityMeta?.color}20`,
                color: rarityMeta?.color,
              }}
            >
              {rarityMeta?.label}
            </span>
          </div>

          <h3 className="text-white font-bold text-lg mb-2">{spirit.name}</h3>
          {spirit.description && (
            <p className="text-slate-400 text-sm mb-4">{spirit.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl">
              {country.symbol}
              {price.toFixed(2)}
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
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
          Catálogo de Spirits
        </h2>

        {/* Filtros de rareza */}
        <div className="flex flex-wrap gap-3 mb-8">
          {RARITIES.map((rarity) => (
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
                borderColor:
                  rarity.value === selectedRarity && rarity.color !== 'gray'
                    ? rarity.color
                    : 'transparent',
                borderWidth: '2px',
              }}
            >
              {rarity.label}
            </button>
          ))}
        </div>
      </div>

      {/* Secciones por categoría */}
      <div className={`space-y-12 ${totalItems > 0 ? 'pb-32 md:pb-24' : ''}`}>
        {categorized.map((cat) => {
          const total = cat.items.length;
          if (total === 0) return null;
          const visible = visibleByCategory[cat.key] || INITIAL_VISIBLE;
          const itemsToShow = cat.items.slice(0, visible);
          const canShowMore = visible < total;
          const canShowLess = visible > INITIAL_VISIBLE;

          return (
            <div key={cat.key} data-testid={`category-${cat.key}`}>
              {/* Encabezado de categoría */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  {cat.highlight && (
                    <Sparkles className="w-7 h-7 text-yellow-400 animate-pulse-glow" />
                  )}
                  <h3
                    className={`text-2xl md:text-3xl font-bold tracking-tight ${
                      cat.highlight ? 'text-gradient' : 'text-white'
                    }`}
                    style={{ fontFamily: 'Unbounded, sans-serif' }}
                  >
                    {cat.label}
                  </h3>
                  <span className="text-sm text-slate-500 bg-black/30 px-3 py-1 rounded-full border border-white/10">
                    {total}
                  </span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {itemsToShow.map((spirit) => renderCard(spirit))}
              </div>

              {/* Controles Ver más / Ver menos */}
              {(canShowMore || canShowLess) && (
                <div className="flex items-center justify-center gap-3 mt-8">
                  {canShowMore && (
                    <button
                      data-testid={`show-more-${cat.key}`}
                      onClick={() => showMore(cat.key, total)}
                      className="btn-gaming px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500 text-white font-semibold flex items-center gap-2 hover:bg-purple-500/30 transition-all"
                    >
                      <ChevronDown className="w-5 h-5" />
                      Ver más ({total - visible})
                    </button>
                  )}
                  {canShowLess && (
                    <button
                      data-testid={`show-less-${cat.key}`}
                      onClick={() => showLess(cat.key)}
                      className="px-6 py-3 rounded-full bg-gray-800 border border-white/10 text-slate-300 font-semibold flex items-center gap-2 hover:bg-gray-700 transition-all"
                    >
                      <ChevronUp className="w-5 h-5" />
                      Ver menos
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón Continuar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 glass-effect border-t border-white/10">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-white text-center sm:text-left">
              <div className="text-xs sm:text-sm text-slate-400">Total de items</div>
              <div className="text-xl sm:text-2xl font-bold">
                {totalItems} {totalItems === 1 ? 'Spirit' : 'Spirits'}
              </div>
            </div>

            <button
              data-testid="continue-to-summary"
              onClick={handleContinue}
              className="btn-gaming w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              Continuar al Resumen
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpiritsCatalog;
