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
  { id: 'nuevo-1',  name: 'ESPÍRITU DE JOHN WICK',  rarity: 'legendary', category: 'nuevos', image: 'https://i.imgur.com/upiKEUW.png',  specialPrice: { PE: 0.50, US: 0.18, AR: 160, MX: 2.50, ES: 0.15, CL: 140 } },
  { id: 'nuevo-2',  name: 'ESPÍRITU DEL PUNTO CERO CUBO',  rarity: 'legendary', category: 'nuevos', image: 'https://i.imgur.com/kGfqeCI.png',  specialPrice: { PE: 0.50, US: 0.18, AR: 160, MX: 2.50, ES: 0.15, CL: 140 } },
  { id: 'nuevo-3',  name: 'ESPÍRITU DEL PUNTO CERO HOLOGRAFICO',  rarity: 'legendary', category: 'nuevos', image: 'https://i.imgur.com/7JQDGiU.png',  specialPrice: { PE: 0.50, US: 0.18, AR: 160, MX: 2.50, ES: 0.15, CL: 140 } },
  { id: 'nuevo-4',  name: 'ESPÍRITU DE PARCA HOLOGRAFICO',  rarity: 'legendary',      category: 'nuevos', image: 'https://i.imgur.com/bY5YOmS.png',  specialPrice: { PE: 0.50, US: 0.18, AR: 160, MX: 2.50, ES: 0.15, CL: 140 } },

  { id: 'nuevo-5',  name: 'ESPÍRITU DE TIERRA DE PATITO',  rarity: 'epic',      category: 'nuevos', image: 'https://i.imgur.com/WIuUWWj.png',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },
  { id: 'nuevo-6',  name: 'ESPÍRITU DE FUEGO DE PATITO',  rarity: 'epic',      category: 'nuevos', image: 'https://i.imgur.com/4HI303x.png',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },
  { id: 'nuevo-7',  name: 'ESPÍRITU DE AGUA DE PATITO',  rarity: 'epic',      category: 'nuevos', image: 'https://i.imgur.com/l5YEqOC.png',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },
  { id: 'nuevo-8',  name: 'ESPÍRITU DE PUNTO CERO PATITO',  rarity: 'epic',      category: 'nuevos', image: 'https://i.imgur.com/uw6bbXT.png',  specialPrice: { PE: 0.45, US: 0.16, AR: 140, MX: 2.20, ES: 0.13, CL: 120 } },

  { id: 'nuevo-9',  name: 'ESPÍRITU DE LLAMA BOTIN DORADO',  rarity: 'rare',      category: 'nuevos', image: 'https://i.imgur.com/DUys8Gm.png',  specialPrice: { PE: 0.40, US: 0.14, AR: 120, MX: 1.90, ES: 0.11, CL: 100 } },
  { id: 'nuevo-10', name: 'ESPIRITU DE LLAMA BOTIN DE GOLOSINA', rarity: 'rare',      category: 'nuevos', image: 'https://i.imgur.com/b1Y3a3c.png', specialPrice: { PE: 0.40, US: 0.14, AR: 120, MX: 1.90, ES: 0.11, CL: 100 } },
  { id: 'nuevo-11', name: 'ESPÍRITU DE LLAMA BOTIN GALACTICO', rarity: 'rare',      category: 'nuevos', image: 'https://i.imgur.com/me64sjT.png', specialPrice: { PE: 0.40, US: 0.14, AR: 120, MX: 1.90, ES: 0.11, CL: 100 } },
  { id: 'nuevo-12', name: 'ESPÍRITU DE LLAMA BOTIN DE GEMA', rarity: 'rare',  category: 'nuevos', image: 'https://i.imgur.com/fsAG8PU.png', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },

  { id: 'nuevo-13', name: 'ESPÍRITU DE BANANIN RADAR DORADO', rarity: 'rare',  category: 'nuevos', image: 'https://i.imgur.com/OHLx9Cd.png', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },
  { id: 'nuevo-14', name: 'ESPÍRITU DE BANANIN RADAR DE GOLOSINA', rarity: 'rare',  category: 'nuevos', image: 'https://i.imgur.com/yezApiX.png', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },
  { id: 'nuevo-15', name: 'ESPÍRITU DE BANANIN RADAR GALACTICO', rarity: 'rare',    category: 'nuevos', image: 'https://i.imgur.com/hiVvRlU.png', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },
  { id: 'nuevo-16', name: 'ESPÍRITU DE BANANIN RADAR HOLOGRAFICO', rarity: 'rare',    category: 'nuevos', image: 'https://i.imgur.com/41ParY2.png', specialPrice: { PE: 0.35, US: 0.12, AR: 110, MX: 1.70, ES: 0.10, CL: 95 } },

  { id: 'nuevo-17', name: 'ESPÍRITU DE LLAMA BOTIN', rarity: 'common',    category: 'nuevos', image: 'https://i.imgur.com/YRkFNR2.png', specialPrice: { PE: 0.32, US: 0.11, AR: 105, MX: 1.60, ES: 0.09, CL: 90 } },
  { id: 'nuevo-18', name: 'ESPÍRITU DE BANANIN RADAR ', rarity: 'common',    category: 'nuevos', image: 'https://i.imgur.com/FL8Sho8.png', specialPrice: { PE: 0.32, US: 0.11, AR: 105, MX: 1.60, ES: 0.09, CL: 90 } },
];

// ---------- CATEGORÍA: CLÁSICOS (93 casillas) ----------
// Estos usan el precio por defecto del país (definido en prices.js)
const CLASSIC_SPIRITS = [
  // Legendarios (10)
  { id: 'clasico-1',  name: 'ESPÍRITU DEL PUNTO CERO',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/o2U5tiN.png'  },
  { id: 'clasico-2',  name: 'ESPÍRITU DEL PUNTO CERO DORADO',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/VGBoin4.png'  },
  { id: 'clasico-3',  name: 'ESPÍRITU DEL PUNTO CERO GOLOSINA',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/ax0Xl5b.png'  },
  { id: 'clasico-4',  name: 'ESPÍRITU DEL PUNTO CERO GALACTICO',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/MwNoA1I.png'  },

  { id: 'clasico-5',  name: 'ESPÍRITU SINIESTRO DORADO',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/GrGEeh4.png'  },
  { id: 'clasico-6',  name: 'ESPÍRITU SINIESTRO DE GOLOSINA',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/5Xbxreh.png'  },
  { id: 'clasico-7',  name: 'ESPÍRITU SINIESTRO GALACTICO',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/7LrLJou.png'  },
  { id: 'clasico-8',  name: 'ESPÍRITU SINIESTRO CUBICO',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/LoduojK.png'  },

  { id: 'clasico-9',  name: 'ESPÍRITU SINIESTRO',  rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/Y7J99Sx.png'  },
  { id: 'clasico-10', name: 'ESPÍRITU DE POLLO', rarity: 'legendary', category: 'clasicos', image: 'https://i.imgur.com/ptWFqgS.png' },
  // Épicos (18)
  { id: 'clasico-11', name: 'ESPÍRITU DE VINI JR.', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/x7HoCZN.png'  },
  { id: 'clasico-12', name: 'ESPÍRITU THEBURNTPEAUT', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/po5d5Fx.png'  },

  { id: 'clasico-13', name: 'ESPÍRITU DE BATMAN', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/ObBO9so.png'  },
  { id: 'clasico-14', name: 'ESPÍRITU DE BATMAN DORADO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/6xaUVH2.png'  },
  { id: 'clasico-15', name: 'ESPÍRITU DE BATMAN GOMITA', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/2hDubfA.png'  },
  { id: 'clasico-16', name: 'ESPÍRITU DE BATMAN GALACTICO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/GzdrHWg.png'  },
  { id: 'clasico-17', name: 'ESPÍRITU DE BATMAN CUBICO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/AsI3xkE.png'  },
  { id: 'clasico-18', name: 'ESPÍRITU DE BATMAN HOLOGRAFICO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/8Kcqzhh.png'  },

  { id: 'clasico-19', name: 'ESPÍRITU DE LOS SIETE', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/jFJfO2H.png'  },
  { id: 'clasico-20', name: 'ESPÍRITU DE LOS SIETE DORADO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/iM7lZfy.png' },
  { id: 'clasico-21', name: 'ESPÍRITU DE LOS SIETE GOLOSINA', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/chBD8Jg.png' },
  { id: 'clasico-22', name: 'ESPÍRITU DE LOS SIETE GALACTICO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/T6ubDe3.png' },
  { id: 'clasico-23', name: 'ESPÍRITU DE LOS SIETE HOLOGRAFICO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/QsJW72U.png' },

  { id: 'clasico-24', name: 'ESPÍRITU JEFE', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/RTLeVrO.png' },
  { id: 'clasico-25', name: 'ESPÍRITU JEFE DORADO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/U5ZRCvl.png' },
  { id: 'clasico-26', name: 'ESPÍRITU JEFE GOLOSINA', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/dgpEhpH.png' },
  { id: 'clasico-27', name: 'ESPÍRITU JEFE GALACTICO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/9RFQjJ4.png' },
  { id: 'clasico-28', name: 'ESPÍRITU JEFE CUBO', rarity: 'epic', category: 'clasicos', image: 'https://i.imgur.com/nPu5pTR.png' },
  // Raros (25)
  { id: 'clasico-29', name: 'ESPÍRITU PUNK', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/lE5O7gT.png'  },
  { id: 'clasico-30', name: 'ESPÍRITU PUNK DORADO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/GxcfiM5.png'  },
  { id: 'clasico-31', name: 'ESPÍRITU PUNK DE GOLOSINA', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/pgoNYbI.png'  },
  { id: 'clasico-32', name: 'ESPÍRITU PUNK GALACTICO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/3djIqQU.png'  },
  { id: 'clasico-33', name: 'ESPÍRITU PUNK CUBICO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/jhVtyvB.png'  },

  { id: 'clasico-34', name: 'ESPÍRITU DORMILON', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/znc84OA.png'  },
  { id: 'clasico-35', name: 'ESPÍRITU DORMILON DORADO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/5QqEvkL.png'  },
  { id: 'clasico-36', name: 'ESPÍRITU DORMILON DE GOMITA', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/7cOI0TG.png'  },
  { id: 'clasico-37', name: 'ESPÍRITU DORMILON GALACTICO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/eg56TGo.png'  },
  { id: 'clasico-38', name: 'ESPÍRITU DORMILON CUBICO ', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/8HQ6iBm.png' },

  { id: 'clasico-39', name: 'ESPÍRITU GOLEADOR', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/RdpwCky.png' },
  { id: 'clasico-40', name: 'ESPÍRITU GOLEADOR DORADO ', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/Dd94Uto.png' },
  { id: 'clasico-41', name: 'ESPÍRITU GOLEADOR DE GOLOSINA', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/4EN3YTf.png' },
  { id: 'clasico-42', name: 'ESPÍRITU GOLEADOR GALACTICO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/SMG8Rz9.png' },
  { id: 'clasico-43', name: 'ESPÍRITU HOLOGRAFICO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/0U6fVaJ.png' },

  { id: 'clasico-44', name: 'ESPÍRITU DE AURA', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/qVTNUDo.png' },
  { id: 'clasico-45', name: 'ESPÍRITU DE AURA DORADO ', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/MRcRQJr.png' },
  { id: 'clasico-46', name: 'ESPÍRITU DE AURA DE GOLOSINA', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/KtLgTx0.png' },
  { id: 'clasico-47', name: 'ESPÍRITU DE AURA GALACTICO ', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/PzKDE4Q.png' },

  { id: 'clasico-48', name: 'ESPÍRITU MONARCA', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/LLrdt6A.png' },
  { id: 'clasico-49', name: 'ESPÍRITU MONARCA DORADO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/0g1uJ6T.png' },
  { id: 'clasico-50', name: 'ESPÍRITU MONARCA DE GOLOSINA', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/Xt4Bmma.png' },
  { id: 'clasico-51', name: 'ESPÍRITU MONARCA GALACTICO', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/gbxP9T2.png' },
  { id: 'clasico-52', name: 'ESPÍRITU MONARCA DE HOLOFOIL', rarity: 'rare', category: 'clasicos', image: 'https://i.imgur.com/IpiifLe.png' },
// Poco Comunes (25)
  { id: 'clasico-53', name: 'ESPÍRITU DEMONIACO ', rarity: 'uncommon', category: 'clasicos', image: 'https://i.imgur.com/MXIbcgu.png' },
  { id: 'clasico-54', name: 'ESPÍRITU DEMONIACO DORADO', rarity: 'uncommon', category: 'clasicos', image: 'https://i.imgur.com/cchSzut.png'  },
  { id: 'clasico-55', name: 'ESPÍRITU DEMONIACO DE GOLOSINA', rarity: 'uncommon', category: 'clasicos', image: 'https://i.imgur.com/bBFbHSV.png'  },
  { id: 'clasico-56', name: 'ESPÍRITU DEMONIACO GALACTICO', rarity: 'uncommon', category: 'clasicos', image: 'https://i.imgur.com/49IQxVa.png'  },

  { id: 'clasico-58', name: 'ESPÍRITU FANTASMA', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+5'  },
  { id: 'clasico-59', name: 'ESPÍRITU FANTASMA DORADO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+6'  },
  { id: 'clasico-60', name: 'ESPÍRITU FANTASMA DE GOMITA', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+7'  },
  { id: 'clasico-61', name: 'ESPÍRITU FANTASMA GALACTICO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+8'  },
  { id: 'clasico-62', name: 'ESPÍRITU FANTASMA DE HOLOFOIL', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+9'  },

  { id: 'clasico-63', name: 'ESPÍRITU DE PATITO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+10' },
  { id: 'clasico-64', name: 'ESPÍRITU DE PATITO DORADO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+11' },
  { id: 'clasico-65', name: 'ESPÍRITU DE PATITO DE GOLOSINA', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+12' },
  { id: 'clasico-66', name: 'ESPÍRITU DE PATITO GALACTICO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+13' },

  { id: 'clasico-67', name: 'ESPÍRITU DE AIRE', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+14' },
  { id: 'clasico-68', name: 'ESPÍRITU DE AIRE DORADO ', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+15' },
  { id: 'clasico-69', name: 'ESPÍRITU DE AIRE DE GOLOSINA', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+16' },
  { id: 'clasico-70', name: 'ESPÍRITU DE AIRE GALACTICO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+17' },
  { id: 'clasico-71', name: 'ESPÍRITU DE AIRE HOLOGRAFICO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+18' },

  { id: 'clasico-72', name: 'ESPÍRITU DE PALITO DE PEZ', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+19' },
  { id: 'clasico-73', name: 'ESPÍRITU DE PALITO DE PEZ DORADO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+20' },
  { id: 'clasico-74', name: 'ESPÍRITU DE PALITO DE PEZ DE GOLOSINA', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+21' },
  { id: 'clasico-75', name: 'ESPÍRITU DE PALITO DE PEZ GALACTICO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+22' },
  { id: 'clasico-76', name: 'ESPÍRITU DE PALITO DE PEZ CUBICO', rarity: 'uncommon', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+23' },
 // Comunes (15)
  { id: 'clasico-77', name: 'ESPÍRITU DE FUEGO ', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+24' },
  { id: 'clasico-78', name: 'ESPÍRITU DE FUEGO DORADO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/22c55e?text=PocoComun+25' },
  { id: 'clasico-79', name: 'ESPÍRITU DE FUEGO DE GOLOSINA', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+1'  },
  { id: 'clasico-80', name: 'ESPÍRITU DE FUEGO GALACTICO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+2'  },
  { id: 'clasico-81', name: 'ESPÍRITU DE FUEGO CUBICO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+3'  },
  { id: 'clasico-82', name: 'ESPÍRITU DE FUEGO HOLOFOIL', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+4'  },

  { id: 'clasico-83', name: 'ESPÍRITU DE TIERRA', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+5'  },
  { id: 'clasico-84', name: 'ESPÍRITU DE TIERRA DORADO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+6'  },
  { id: 'clasico-85', name: 'ESPÍRITU DE TIERRA DE GOLOSINA', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+7'  },
  { id: 'clasico-86', name: 'ESPÍRITU DE TIERRA GALACTICO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+8'  },
  { id: 'clasico-87', name: 'ESPÍRITU DE TIERRA CUBICO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+9'  },

  { id: 'clasico-88', name: 'ESPÍRITU DE AGUA ', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+10' },
  { id: 'clasico-89', name: 'ESPÍRITU DE AGUA DORADO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+11' },
  { id: 'clasico-90', name: 'ESPÍRITU DE AGUA DE GOLOSINA', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+12' },
  { id: 'clasico-91', name: 'ESPÍRITU DE AGUA GALACTICO', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+13' },
  { id: 'clasico-92', name: 'ESPÍRITU DE HOLOFOIL', rarity: 'common', category: 'clasicos', image: 'https://placehold.co/400x400/09090b/94a3b8?text=Comun+14' },

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
