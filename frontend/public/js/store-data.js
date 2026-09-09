const KTX_STORE_CONFIG = {
  identity: {
    name: 'KTXStore',
    tagline: 'Recargas, códigos y entregas manuales para tus juegos favoritos.',
    accent: '#a855f7'
  },
  dlocalGo: { enabled: false },
  countries: [
    { code: 'PE', name: 'Perú', currency: 'PEN', symbol: 'S/', flag: '🇵🇪' },
    { code: 'MX', name: 'México', currency: 'MXN', symbol: '$', flag: '🇲🇽' },
    { code: 'US', name: 'Estados Unidos', currency: 'USD', symbol: '$', flag: '🇺🇸' },
    { code: 'ES', name: 'España', currency: 'EUR', symbol: '€', flag: '🇪🇸' },
    { code: 'AR', name: 'Argentina', currency: 'ARS', symbol: '$', flag: '🇦🇷' },
    { code: 'CL', name: 'Chile', currency: 'CLP', symbol: '$', flag: '🇨🇱' }
  ],
  games: [
    { id: 'roblox', name: 'Roblox', shortName: 'Roblox', icon: 'Gamepad2', deliveryType: 'redeem_code' },
    { id: 'fortnite', name: 'Fortnite', shortName: 'Fortnite', icon: 'Crosshair', deliveryType: 'manual_gift' },
    { id: 'club-fortnite', name: 'Club Fortnite', shortName: 'Club', icon: 'Crown', deliveryType: 'manual_fulfillment' },
    { id: 'free-fire', name: 'Free Fire', shortName: 'Free Fire', icon: 'Flame', deliveryType: 'player_id' },
    { id: 'blood-strike', name: 'Blood Strike', shortName: 'Blood Strike', icon: 'Target', deliveryType: 'account_id' },
    { id: 'marvel-rivals', name: 'Marvel Rivals', shortName: 'Marvel', icon: 'Shield', deliveryType: 'numeric_uid' },
    { id: 'lol-rp', name: 'League of Legends RP', shortName: 'LoL RP', icon: 'Sparkles', comingSoon: true }
  ],
  products: [
    { id: 'RBX-50', gameId: 'roblox', name: '50 Robux', price: 1.99, currency: 'PEN' },
    { id: 'RBX-100', gameId: 'roblox', name: '100 Robux', price: 3.55, currency: 'PEN' },
    { id: 'RBX-150', gameId: 'roblox', name: '150 Robux', price: 5.50, currency: 'PEN' },
    { id: 'RBX-200', gameId: 'roblox', name: '200 Robux', price: 7.10, currency: 'PEN' },
    { id: 'RBX-300', gameId: 'roblox', name: '300 Robux', price: 10.49, currency: 'PEN' },
    { id: 'RBX-400', gameId: 'roblox', name: '400 Robux', price: 14.29, currency: 'PEN' },
    { id: 'RBX-500', gameId: 'roblox', name: '500 Robux', price: 16.99, currency: 'PEN' },
    { id: 'RBX-600', gameId: 'roblox', name: '600 Robux', price: 20.39, currency: 'PEN' },
    { id: 'RBX-800', gameId: 'roblox', name: '800 Robux', price: 27.99, currency: 'PEN' },
    { id: 'RBX-1000', gameId: 'roblox', name: '1000 Robux', price: 33.99, currency: 'PEN' },
    { id: 'RBX-1200', gameId: 'roblox', name: '1200 Robux', price: 40.99, currency: 'PEN' },
    { id: 'RBX-1300', gameId: 'roblox', name: '1300 Robux', price: 44.49, currency: 'PEN' },
    { id: 'RBX-1500', gameId: 'roblox', name: '1500 Robux', price: 51.59, currency: 'PEN' },
    { id: 'RBX-1700', gameId: 'roblox', name: '1700 Robux', price: 58.69, currency: 'PEN' },
    { id: 'RBX-2000', gameId: 'roblox', name: '2000 Robux', price: 69.19, currency: 'PEN' },
    { id: 'RBX-2500', gameId: 'roblox', name: '2500 Robux', price: 86.19, currency: 'PEN' },
    { id: 'RBX-3000', gameId: 'roblox', name: '3000 Robux', price: 103.19, currency: 'PEN' },
    { id: 'RBX-3500', gameId: 'roblox', name: '3500 Robux', price: 120.19, currency: 'PEN' },
    { id: 'RBX-4000', gameId: 'roblox', name: '4000 Robux', price: 137.19, currency: 'PEN' },
    { id: 'RBX-4500', gameId: 'roblox', name: '4500 Robux', price: 154.19, currency: 'PEN' },
    { id: 'RBX-5000', gameId: 'roblox', name: '5000 Robux', price: 171.19, currency: 'PEN' },
    { id: 'RBX-7500', gameId: 'roblox', name: '7500 Robux', price: 255.99, currency: 'PEN' },
    { id: 'RBX-10000', gameId: 'roblox', name: '10000 Robux', price: 341.99, currency: 'PEN' },
    { id: 'FN-100-REFERENCE', gameId: 'fortnite', name: '100 Pavos — precio de referencia', price: 2, currency: 'PEN', note: 'Confirma disponibilidad y modalidad de entrega antes de pagar.' },
    { id: 'FN-CLUB-1M', gameId: 'club-fortnite', name: '1 mes', price: 19.99, oldPrice: 25, currency: 'PEN' },
    { id: 'FN-CLUB-3M', gameId: 'club-fortnite', name: '3 meses', price: 54.99, oldPrice: 70, currency: 'PEN' },
    { id: 'FN-CLUB-6M', gameId: 'club-fortnite', name: '6 meses', price: 99.99, oldPrice: 120, currency: 'PEN' },
    { id: 'FF-TEST', gameId: 'free-fire', name: 'Diamantes Free Fire — precio por definir', price: null, currency: 'PEN', testOnly: true },
    { id: 'BS-TEST', gameId: 'blood-strike', name: 'Oro Blood Strike — precio por definir', price: null, currency: 'PEN', testOnly: true },
    { id: 'MR-TEST', gameId: 'marvel-rivals', name: 'Lattice Marvel Rivals — precio por definir', price: null, currency: 'PEN', testOnly: true }
  ],
  deliveryInstructions: {
    redeem_code: { title: 'Canjea tu código', steps: ['Ingresa a la página oficial de canje de Roblox.', 'Inicia sesión en la cuenta donde usarás el código.', 'Ingresa el código recibido.', 'Confirma el canje y revisa tu saldo.'], note: 'Los códigos se entregan después de verificar el pago.' },
    manual_gift: { title: 'Entrega manual', steps: ['Verifica tu nombre visible de Epic.', 'Añade los detalles del artículo en la nota.', 'Tras la validación del pago, KTXStore coordinará la entrega manual si es elegible y está disponible.'], note: 'Confirma disponibilidad y modalidad de entrega antes de pagar.' },
    manual_fulfillment: { title: 'Plan de Club Fortnite', steps: ['Indica tu nombre visible de Epic.', 'Comparte un contacto para coordinar.', 'Validaremos el pedido y la disponibilidad antes de procesarlo.'], note: 'Nunca solicitamos tu contraseña ni acceso a tu cuenta.' },
    player_id: { title: 'Recarga por Player ID', steps: ['Abre tu perfil de Free Fire y copia tu Player ID.', 'Escribe el ID en el formulario.', 'Validaremos el pedido antes de cualquier entrega.'], note: 'Este producto está en prueba y no debe pagarse.' },
    account_id: { title: 'Recarga por ID de cuenta', steps: ['Copia tu ID de cuenta de Blood Strike.', 'Escríbelo en el formulario.', 'Validaremos el pedido antes de cualquier entrega.'], note: 'Este producto está en prueba y no debe pagarse.' },
    numeric_uid: { title: 'Recarga por UID', steps: ['Copia tu UID de Marvel Rivals.', 'Escribe únicamente números.', 'Validaremos el pedido antes de cualquier entrega.'], note: 'Este producto está en prueba y no debe pagarse.' }
  },
  paymentMethods: {
    PE: [{ id: 'yape', name: 'Yape', icon: 'Y' }, { id: 'plin', name: 'Plin', icon: 'P' }, { id: 'paypal', name: 'PayPal', icon: 'P' }, { id: 'binance', name: 'Binance Pay', icon: 'B' }],
    MX: [{ id: 'mercadopago', name: 'Mercado Pago', icon: 'M' }, { id: 'paypal', name: 'PayPal', icon: 'P' }],
    US: [{ id: 'paypal', name: 'PayPal', icon: 'P' }, { id: 'binance', name: 'Binance Pay', icon: 'B' }],
    ES: [{ id: 'paypal', name: 'PayPal', icon: 'P' }, { id: 'bizum', name: 'Bizum', icon: 'B' }],
    AR: [{ id: 'mercadopago', name: 'Mercado Pago', icon: 'M' }, { id: 'paypal', name: 'PayPal', icon: 'P' }],
    CL: [{ id: 'cuentarut', name: 'Cuenta RUT', icon: 'C' }, { id: 'paypal', name: 'PayPal', icon: 'P' }]
  }
};

if (typeof window !== 'undefined') {
  window.KTX_STORE_CONFIG = KTX_STORE_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) module.exports = KTX_STORE_CONFIG;
