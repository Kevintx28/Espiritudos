// Configuración general de la aplicación
const APP_CONFIG = {
  name: 'Espiritudos',
  tagline: 'Tu Tienda de Spirits de Fortnite',
  logo: 'https://customer-assets-7cd3h4nn.emergentagent.net/job_spirit-marketplace-6/artifacts/iqm2w1sd_8945742a-0bf2-48e0-9e30-f0a269e3f347.png',
  defaultCountry: 'PE',
  social: {
    discord: 'https://discord.gg/ASRjmbTFDb',
    whatsapp: 'https://chat.whatsapp.com/BZL3ousKoX7IkSi86mdDfM',
    facebook: 'https://facebook.com/yourpage',
    website: 'https://espiritudos.com'
  },
  discounts: [
    { min: 1, max: 4, percentage: 0 },
    { min: 5, max: 9, percentage: 5 },
    { min: 10, max: 14, percentage: 10 },
    { min: 15, max: 999, percentage: 15 }
  ]
};

// Exponer al window para acceso desde React
if (typeof window !== 'undefined') {
  window.APP_CONFIG = APP_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}