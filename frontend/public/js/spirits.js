// ============================================================
// CATÁLOGO DE SPIRITS - Editable manualmente
// ============================================================
// Cada Spirit tiene:
//   id           -> Identificador único (string)
//   name         -> Nombre del Spirit (string)
//   rarity       -> 'legendary' | 'epic' | 'rare' | 'uncommon' | 'common'
//   category     -> 'nuevos' | 'clasicos' (o cualquier otro nombre)
//   image        -> URL de la imagen (string) - REEMPLAZAR MANUALMENTE
//   specialPrice -> (Opcional) Precio especial por país. Si no está,
//                   se usa el precio por defecto del país.
// ============================================================

// ---------- CATEGORÍA: NUEVOS ESPIRITUS! (17 casillas) ----------
// Precio especial por Spirit por país. Editar manualmente.
const NEW_SPIRITS = [
  { id: 'nuevo-1',  name: 'John Wick',  rarity: 'legendary', category: 'nuevos', image: 'https://i.imgur.com/upiKEUW.png',  specialPrice: { PE: 0.50, US: 0.18, AR: 160, MX: 2.50, ES: 0.15, CL: 140 } },
  { id: 'nuevo-2',  name: 'Nuevo Spirit 2',  rarity: 'legendary', category: 'nuevos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Nuevo+2',  specialPrice: { PE: 0.50, US: 0.18, AR: 160, MX: 2.50, ES: 0.15, CL: 140 } },
  { id: 'nuevo-3',  name: 'Nuevo Spirit 3',  rarity: 'legendary', category: 'nuevos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Nuevo+3',  specialPrice: { PE: 0.50, US: 0.18, AR: 160, MX: 2.50, ES: 0.15, CL: 140 } },
  { id: 'nuevo-4',  name: 'Nuevo Spirit 4',  rarity: 'epic',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Nuevo+4',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },
  { id: 'nuevo-5',  name: 'Nuevo Spirit 5',  rarity: 'epic',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Nuevo+5',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },
  { id: 'nuevo-6',  name: 'Nuevo Spirit 6',  rarity: 'epic',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Nuevo+6',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },
  { id: 'nuevo-7',  name: 'Nuevo Spirit 7',  rarity: 'epic',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Nuevo+7',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },
  { id: 'nuevo-8',  name: 'Nuevo Spirit 8',  rarity: 'rare',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Nuevo+8',  specialPrice: { PE: 0.40, US: 0.14, AR: 120, MX: 1.90, ES: 0.11, CL: 100 } },
  { id: 'nuevo-9',  name: 'Nuevo Spirit 9',  rarity: 'rare',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Nuevo+9',  specialPrice: { PE: 0.40, US: 0.14, AR: 120, MX: 1.90, ES: 0.11, CL: 100 } },
  { id: 'nuevo-10', name: 'Nuevo Spirit 10', rarity: 'rare',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Nuevo+10', specialPrice: { PE: 0.40, US: 0.14, AR: 120, MX: 1.90, ES: 0.11, CL: 100 } },
  { id: 'nuevo-11', name: 'Nuevo Spirit 11', rarity: 'rare',      category: 'nuevos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Nuevo+11', specialPrice: { PE: 0.40, US: 0.14, AR: 120, MX: 1.90, ES: 0.11, CL: 100 } },
  { id: 'nuevo-12', name: 'Nuevo Spirit 12', rarity: 'uncommon',  category: 'nuevos', image: 'https://placehold.co/400x400/09090b/22c55e?text=Nuevo+12', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },
  { id: 'nuevo-13', name: 'Nuevo Spirit 13', rarity: 'uncommon',  category: 'nuevos', image: 'https://placehold.co/400x400/09090b/22c55e?text=Nuevo+13', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },
  { id: 'nuevo-14', name: 'Nuevo Spirit 14', rarity: 'uncommon',  category: 'nuevos', image: 'https://placehold.co/400x400/09090b/22c55e?text=Nuevo+14', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },
  { id: 'nuevo-15', name: 'Nuevo Spirit 15', rarity: 'common',    category: 'nuevos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Nuevo+15', specialPrice: { PE: 0.32, US: 0.11, AR: 105, MX: 1.60, ES: 0.09, CL: 90 } },
  { id: 'nuevo-16', name: 'Nuevo Spirit 16', rarity: 'common',    category: 'nuevos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Nuevo+16', specialPrice: { PE: 0.32, US: 0.11, AR: 105, MX: 1.60, ES: 0.09, CL: 90 } },
  { id: 'nuevo-17', name: 'Nuevo Spirit 17', rarity: 'common',    category: 'nuevos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Nuevo+17', specialPrice: { PE: 0.32, US: 0.11, AR: 105, MX: 1.60, ES: 0.09, CL: 90 } },
];

// ---------- CATEGORÍA: CLÁSICOS (93 casillas) ----------
// Estos usan el precio por defecto del país (definido en prices.js)
const CLASSIC_SPIRITS = [
  // Legendarios (10)
  { id: 'clasico-1',  name: 'Spirit Clásico 1',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+1'  },
  { id: 'clasico-2',  name: 'Spirit Clásico 2',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+2'  },
  { id: 'clasico-3',  name: 'Spirit Clásico 3',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+3'  },
  { id: 'clasico-4',  name: 'Spirit Clásico 4',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+4'  },
  { id: 'clasico-5',  name: 'Spirit Clásico 5',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+5'  },
  { id: 'clasico-6',  name: 'Spirit Clásico 6',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+6'  },
  { id: 'clasico-7',  name: 'Spirit Clásico 7',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+7'  },
  { id: 'clasico-8',  name: 'Spirit Clásico 8',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+8'  },
  { id: 'clasico-9',  name: 'Spirit Clásico 9',  rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+9'  },
  { id: 'clasico-10', name: 'Spirit Clásico 10', rarity: 'legendary', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/f59e0b?text=Legendario+10' },
  // Épicos (18)
  { id: 'clasico-11', name: 'Spirit Clásico 11', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+1'  },
  { id: 'clasico-12', name: 'Spirit Clásico 12', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+2'  },
  { id: 'clasico-13', name: 'Spirit Clásico 13', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+3'  },
  { id: 'clasico-14', name: 'Spirit Clásico 14', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+4'  },
  { id: 'clasico-15', name: 'Spirit Clásico 15', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+5'  },
  { id: 'clasico-16', name: 'Spirit Clásico 16', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+6'  },
  { id: 'clasico-17', name: 'Spirit Clásico 17', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+7'  },
  { id: 'clasico-18', name: 'Spirit Clásico 18', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+8'  },
  { id: 'clasico-19', name: 'Spirit Clásico 19', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+9'  },
  { id: 'clasico-20', name: 'Spirit Clásico 20', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+10' },
  { id: 'clasico-21', name: 'Spirit Clásico 21', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+11' },
  { id: 'clasico-22', name: 'Spirit Clásico 22', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+12' },
  { id: 'clasico-23', name: 'Spirit Clásico 23', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+13' },
  { id: 'clasico-24', name: 'Spirit Clásico 24', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+14' },
  { id: 'clasico-25', name: 'Spirit Clásico 25', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+15' },
  { id: 'clasico-26', name: 'Spirit Clásico 26', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+16' },
  { id: 'clasico-27', name: 'Spirit Clásico 27', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+17' },
  { id: 'clasico-28', name: 'Spirit Clásico 28', rarity: 'epic', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/a855f7?text=Epico+18' },
  // Raros (25)
  { id: 'clasico-29', name: 'Spirit Clásico 29', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+1'  },
  { id: 'clasico-30', name: 'Spirit Clásico 30', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+2'  },
  { id: 'clasico-31', name: 'Spirit Clásico 31', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+3'  },
  { id: 'clasico-32', name: 'Spirit Clásico 32', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+4'  },
  { id: 'clasico-33', name: 'Spirit Clásico 33', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+5'  },
  { id: 'clasico-34', name: 'Spirit Clásico 34', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+6'  },
  { id: 'clasico-35', name: 'Spirit Clásico 35', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+7'  },
  { id: 'clasico-36', name: 'Spirit Clásico 36', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+8'  },
  { id: 'clasico-37', name: 'Spirit Clásico 37', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+9'  },
  { id: 'clasico-38', name: 'Spirit Clásico 38', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+10' },
  { id: 'clasico-39', name: 'Spirit Clásico 39', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+11' },
  { id: 'clasico-40', name: 'Spirit Clásico 40', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+12' },
  { id: 'clasico-41', name: 'Spirit Clásico 41', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+13' },
  { id: 'clasico-42', name: 'Spirit Clásico 42', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+14' },
  { id: 'clasico-43', name: 'Spirit Clásico 43', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+15' },
  { id: 'clasico-44', name: 'Spirit Clásico 44', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+16' },
  { id: 'clasico-45', name: 'Spirit Clásico 45', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+17' },
  { id: 'clasico-46', name: 'Spirit Clásico 46', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+18' },
  { id: 'clasico-47', name: 'Spirit Clásico 47', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+19' },
  { id: 'clasico-48', name: 'Spirit Clásico 48', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+20' },
  { id: 'clasico-49', name: 'Spirit Clásico 49', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+21' },
  { id: 'clasico-50', name: 'Spirit Clásico 50', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+22' },
  { id: 'clasico-51', name: 'Spirit Clásico 51', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+23' },
  { id: 'clasico-52', name: 'Spirit Clásico 52', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+24' },
  { id: 'clasico-53', name: 'Spirit Clásico 53', rarity: 'rare', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/3b82f6?text=Raro+25' },
  // Poco Comunes (25)
  { id: 'clasico-54', name: 'Spirit Clásico 54', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+1'  },
  { id: 'clasico-55', name: 'Spirit Clásico 55', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+2'  },
  { id: 'clasico-56', name: 'Spirit Clásico 56', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+3'  },
  { id: 'clasico-57', name: 'Spirit Clásico 57', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+4'  },
  { id: 'clasico-58', name: 'Spirit Clásico 58', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+5'  },
  { id: 'clasico-59', name: 'Spirit Clásico 59', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+6'  },
  { id: 'clasico-60', name: 'Spirit Clásico 60', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+7'  },
  { id: 'clasico-61', name: 'Spirit Clásico 61', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+8'  },
  { id: 'clasico-62', name: 'Spirit Clásico 62', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+9'  },
  { id: 'clasico-63', name: 'Spirit Clásico 63', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+10' },
  { id: 'clasico-64', name: 'Spirit Clásico 64', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+11' },
  { id: 'clasico-65', name: 'Spirit Clásico 65', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+12' },
  { id: 'clasico-66', name: 'Spirit Clásico 66', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+13' },
  { id: 'clasico-67', name: 'Spirit Clásico 67', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+14' },
  { id: 'clasico-68', name: 'Spirit Clásico 68', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+15' },
  { id: 'clasico-69', name: 'Spirit Clásico 69', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+16' },
  { id: 'clasico-70', name: 'Spirit Clásico 70', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+17' },
  { id: 'clasico-71', name: 'Spirit Clásico 71', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+18' },
  { id: 'clasico-72', name: 'Spirit Clásico 72', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+19' },
  { id: 'clasico-73', name: 'Spirit Clásico 73', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+20' },
  { id: 'clasico-74', name: 'Spirit Clásico 74', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+21' },
  { id: 'clasico-75', name: 'Spirit Clásico 75', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+22' },
  { id: 'clasico-76', name: 'Spirit Clásico 76', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+23' },
  { id: 'clasico-77', name: 'Spirit Clásico 77', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+24' },
  { id: 'clasico-78', name: 'Spirit Clásico 78', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+25' },
  // Comunes (15)
  { id: 'clasico-79', name: 'Spirit Clásico 79', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+1'  },
  { id: 'clasico-80', name: 'Spirit Clásico 80', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+2'  },
  { id: 'clasico-81', name: 'Spirit Clásico 81', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+3'  },
  { id: 'clasico-82', name: 'Spirit Clásico 82', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+4'  },
  { id: 'clasico-83', name: 'Spirit Clásico 83', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+5'  },
  { id: 'clasico-84', name: 'Spirit Clásico 84', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+6'  },
  { id: 'clasico-85', name: 'Spirit Clásico 85', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+7'  },
  { id: 'clasico-86', name: 'Spirit Clásico 86', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+8'  },
  { id: 'clasico-87', name: 'Spirit Clásico 87', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+9'  },
  { id: 'clasico-88', name: 'Spirit Clásico 88', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+10' },
  { id: 'clasico-89', name: 'Spirit Clásico 89', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+11' },
  { id: 'clasico-90', name: 'Spirit Clásico 90', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+12' },
  { id: 'clasico-91', name: 'Spirit Clásico 91', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+13' },
  { id: 'clasico-92', name: 'Spirit Clásico 92', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+14' },
  { id: 'clasico-93', name: 'Spirit Clásico 93', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+15' },
];

// ---------- CONFIGURACIÓN DE CATEGORÍAS (orden y etiqueta) ----------
// El orden aquí determina cómo se muestran en el catálogo.
const SPIRIT_CATEGORIES = [
  { key: 'nuevos',   label: '¡Nuevos Espiritus!', highlight: true  },
  { key: 'clasicos', label: 'Catálogo Completo',  highlight: false },
];

// Concatenar todos los spirits
const SPIRITS = [...NEW_SPIRITS, ...CLASSIC_SPIRITS];

// Helper: obtener precio real de un spirit según país (respeta specialPrice)
function getSpiritPrice(spirit, country) {
  if (!spirit || !country) return 0;
  const special = spirit.specialPrice && spirit.specialPrice[country.code];
  return typeof special === 'number' ? special : country.pricePerSpirit;
}

// Exponer al window para acceso desde React
if (typeof window !== 'undefined') {
  window.SPIRITS = SPIRITS;
  window.SPIRIT_CATEGORIES = SPIRIT_CATEGORIES;
  window.getSpiritPrice = getSpiritPrice;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SPIRITS, SPIRIT_CATEGORIES, getSpiritPrice };
}
