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
  ],
  pavos: {
    image: 'https://i.imgur.com/YIH99ww.png'
  },
  clubFortnite: {
    plans: [
      {
        id: 'club-1m',
        title: '1 mes de Club',
        oldPrice: 'S/ 30.00',
        price: 'S/ 24.99',
        image: 'https://wsrv.nl/?url=https%3A%2F%2Fcdn1.epicgames.com%2Foffer%2Ffn%2FFNECO_41-10_July_Crew_Lineup_EGS_Launcher_Blade_1200x1600_1200x1600-5949baa92bdf4080bc576b11ff67e264&w=512&q=90&output=webp'
      },
      {
        id: 'club-3m',
        title: '3 meses de Club',
        oldPrice: null,
        price: 'S/ 49.99',
        image: 'https://wsrv.nl/?url=https%3A%2F%2Fcdn1.epicgames.com%2Foffer%2Ffn%2FFNECO_41-10_July_Crew_Lineup_EGS_Launcher_Blade_1200x1600_1200x1600-5949baa92bdf4080bc576b11ff67e264&w=512&q=90&output=webp'
      },
      {
        id: 'club-4m',
        title: '4 meses de Club',
        oldPrice: null,
        price: 'S/ 56.99',
        image: 'https://wsrv.nl/?url=https%3A%2F%2Fcdn1.epicgames.com%2Foffer%2Ffn%2FFNECO_41-10_July_Crew_Lineup_EGS_Launcher_Blade_1200x1600_1200x1600-5949baa92bdf4080bc576b11ff67e264&w=512&q=90&output=webp'
      },
      {
        id: 'club-6m',
        title: '6 meses de Club',
        oldPrice: 'S/ 80.00',
        price: 'S/ 69.99',
        image: 'https://wsrv.nl/?url=https%3A%2F%2Fcdn1.epicgames.com%2Foffer%2Ffn%2FFNECO_41-10_July_Crew_Lineup_EGS_Launcher_Blade_1200x1600_1200x1600-5949baa92bdf4080bc576b11ff67e264&w=512&q=90&output=webp'
      }
    ]
  }
};

// Exponer al window para acceso desde React
if (typeof window !== 'undefined') {
  window.APP_CONFIG = APP_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}