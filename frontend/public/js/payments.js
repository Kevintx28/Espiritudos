// Métodos de pago por país
const PAYMENT_METHODS = {
  PE: [
    { id: 'yape', name: 'Yape', icon: '📱' },
    { id: 'plin', name: 'Plin', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'binance', name: 'Binance Pay', icon: '🟡' },
    { id: 'usdt', name: 'USDT', icon: '💵' }
  ],
  US: [
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'binance', name: 'Binance Pay', icon: '🟡' },
    { id: 'usdt', name: 'USDT', icon: '💵' }
  ],
  AR: [
    { id: 'mercadopago', name: 'Mercado Pago', icon: '💙' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'binance', name: 'Binance Pay', icon: '🟡' }
  ],
  MX: [
    { id: 'mercadopago', name: 'Mercado Pago', icon: '💙' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'binance', name: 'Binance Pay', icon: '🟡' }
  ],
  ES: [
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'bizum', name: 'Bizum', icon: '💰' },
    { id: 'binance', name: 'Binance Pay', icon: '🟡' }
  ],
  CL: [
    { id: 'cuentarut', name: 'Cuenta RUT', icon: '🏦' },
    { id: 'mach', name: 'MACH', icon: '📱' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' }
  ]
};

// Exponer al window para acceso desde React
if (typeof window !== 'undefined') {
  window.PAYMENT_METHODS = PAYMENT_METHODS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PAYMENT_METHODS;
}