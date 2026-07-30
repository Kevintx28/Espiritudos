// Configuración de precios por país
const COUNTRIES = [
  {
    code: 'PE',
    name: 'Perú',
    currency: 'PEN',
    symbol: 'S/',
    pricePerSpirit: 0.30,
    flag: '🇵🇪'
  },
  {
    code: 'US',
    name: 'Estados Unidos',
    currency: 'USD',
    symbol: '$',
    pricePerSpirit: 0.10,
    flag: '🇺🇸'
  },
  {
    code: 'AR',
    name: 'Argentina',
    currency: 'ARS',
    symbol: '$',
    pricePerSpirit: 100,
    flag: '🇦🇷'
  },
  {
    code: 'MX',
    name: 'México',
    currency: 'MXN',
    symbol: '$',
    pricePerSpirit: 1.55,
    flag: '🇲🇽'
  },
  {
    code: 'ES',
    name: 'España',
    currency: 'EUR',
    symbol: '€',
    pricePerSpirit: 0.08,
    flag: '🇪🇸'
  },
  {
    code: 'CL',
    name: 'Chile',
    currency: 'CLP',
    symbol: '$',
    pricePerSpirit: 85,
    flag: '🇨🇱'
  }
];

// Exponer al window para acceso desde React
if (typeof window !== 'undefined') {
  window.COUNTRIES = COUNTRIES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = COUNTRIES;
}