// Catálogo de Spirits de Fortnite
const SPIRITS = [
  {
    id: 'legendary-1',
    name: 'Spirit Legendario Dorado',
    rarity: 'legendary',
    image: 'https://images.unsplash.com/photo-1763021225760-1f9101fd3b38?w=300&h=300&fit=crop',
    description: 'Un spirit extremadamente raro con poder legendario'
  },
  {
    id: 'legendary-2',
    name: 'Spirit Legendario Púrpura',
    rarity: 'legendary',
    image: 'https://images.unsplash.com/photo-1668987523075-24cf28946d05?w=300&h=300&fit=crop',
    description: 'Spirit legendario con energía cósmica'
  },
  {
    id: 'epic-1',
    name: 'Spirit Épico Cristalino',
    rarity: 'epic',
    image: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=300&h=300&fit=crop',
    description: 'Spirit épico con cristales brillantes'
  },
  {
    id: 'epic-2',
    name: 'Spirit Épico Neón',
    rarity: 'epic',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=300&h=300&fit=crop',
    description: 'Spirit épico con efectos neón'
  },
  {
    id: 'rare-1',
    name: 'Spirit Raro Azul',
    rarity: 'rare',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop',
    description: 'Spirit raro con aura azul'
  },
  {
    id: 'rare-2',
    name: 'Spirit Raro Eléctrico',
    rarity: 'rare',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop',
    description: 'Spirit raro con energía eléctrica'
  },
  {
    id: 'uncommon-1',
    name: 'Spirit Poco Común Verde',
    rarity: 'uncommon',
    image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=300&h=300&fit=crop',
    description: 'Spirit poco común con brillo verde'
  },
  {
    id: 'uncommon-2',
    name: 'Spirit Poco Común Esmeralda',
    rarity: 'uncommon',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=300&h=300&fit=crop',
    description: 'Spirit poco común esmeralda'
  },
  {
    id: 'common-1',
    name: 'Spirit Común Gris',
    rarity: 'common',
    image: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=300&h=300&fit=crop',
    description: 'Spirit común básico'
  },
  {
    id: 'common-2',
    name: 'Spirit Común Plata',
    rarity: 'common',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop',
    description: 'Spirit común plateado'
  }
];

// Exponer al window para acceso desde React
if (typeof window !== 'undefined') {
  window.SPIRITS = SPIRITS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SPIRITS;
}