import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const buildCountries = () => [
  { code: 'PE', name: 'Perú', currency: 'PEN', symbol: 'S/', pricePerSpirit: 0.3, flag: '🇵🇪' },
  { code: 'US', name: 'Estados Unidos', currency: 'USD', symbol: '$', pricePerSpirit: 0.1, flag: '🇺🇸' },
  { code: 'MX', name: 'México', currency: 'MXN', symbol: '$', pricePerSpirit: 1.55, flag: '🇲🇽' }
];

let container;
let root;

describe('App currency flow', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
    window.COUNTRIES = buildCountries();
    window.APP_CONFIG = { name: 'Espiritudos', defaultCountry: 'PE', discounts: [], logo: '', tagline: 'Tienda' };
    window.SPIRITS = [];
    window.SPIRIT_CATEGORIES = [{ key: 'clasicos', label: 'Catálogo', highlight: false }];
    window.PAYMENT_METHODS = { PE: [], MX: [], US: [] };
    window.REVIEWS = [];
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    localStorage.clear();
  });

  it('shows the currency modal when there is no saved selection', () => {
    act(() => {
      root.render(<App />);
    });

    expect(container.textContent).toContain('¿En qué moneda deseas ver los precios?');
  });

  it('loads the saved currency without showing the modal again', () => {
    localStorage.setItem('currency', 'MX');

    act(() => {
      root.render(<App />);
    });

    expect(container.textContent).toContain('Catálogo de Spirits');
    expect(container.textContent).not.toContain('¿En qué moneda deseas ver los precios?');
  });
});
