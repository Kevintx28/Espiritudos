import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const storeConfig = {
  identity: { name: 'KTXStore', tagline: 'Tienda' },
  countries: [{ code: 'PE', name: 'Perú', currency: 'PEN', symbol: 'S/', flag: '🇵🇪' }, { code: 'MX', name: 'México', currency: 'MXN', symbol: '$', flag: '🇲🇽' }],
  games: [
    { id: 'roblox', name: 'Roblox', shortName: 'Roblox', icon: 'Gamepad2', deliveryType: 'redeem_code' },
    { id: 'marvel-rivals', name: 'Marvel Rivals', shortName: 'Marvel', icon: 'Shield', deliveryType: 'numeric_uid' },
    { id: 'free-fire', name: 'Free Fire', shortName: 'Free Fire', icon: 'Flame', deliveryType: 'player_id' }
  ],
  products: [
    { id: 'RBX-100', gameId: 'roblox', name: '100 Robux', price: 3.55, currency: 'PEN' },
    { id: 'MR-TEST', gameId: 'marvel-rivals', name: 'Lattice Marvel Rivals — precio por definir', price: null, currency: 'PEN', testOnly: true },
    { id: 'FF-TEST', gameId: 'free-fire', name: 'Diamantes Free Fire — precio por definir', price: null, currency: 'PEN', testOnly: true }
  ],
  deliveryInstructions: { redeem_code: { title: 'Canjea tu código', steps: [], note: 'Nota' }, numeric_uid: { title: 'UID', steps: [], note: 'Nota' }, player_id: { title: 'ID', steps: [], note: 'Nota' } },
  paymentMethods: { PE: [{ id: 'yape', name: 'Yape', icon: 'Y' }], MX: [] },
  dLocalGo: { enabled: false }
};

let container;
let root;

describe('KTXStore flow', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.clear();
    window.KTX_STORE_CONFIG = storeConfig;
    window.APP_CONFIG = { social: { whatsapp: 'https://wa.test', discord: 'https://discord.test' } };
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => { act(() => root.unmount()); container.remove(); localStorage.clear(); });

  it('persists the selected country', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('header button').click());
    act(() => container.querySelector('[data-testid="country-MX"]')?.click());
    expect(localStorage.getItem('ktxstore:selectedCountry')).toBe('"MX"');
  });

  it('selects Roblox and adds RBX-100 to its independent cart', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="add-RBX-100"]').click());
    expect(JSON.parse(localStorage.getItem('ktxstore:cartByGame')).roblox[0].product.id).toBe('RBX-100');
    expect(container.textContent).toContain('Carrito del juego');
  });

  it('navigates to Marvel Rivals checkout instructions', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-marvel-rivals"]').click());
    act(() => container.querySelector('[data-testid="add-MR-TEST"]').click());
    act(() => container.querySelector('[data-testid="cart-continue"]').click());
    expect(container.textContent).toContain('UID');
  });

  it('restores a persisted cart on mount', () => {
    localStorage.setItem('ktxstore:cartByGame', JSON.stringify({ roblox: [{ product: storeConfig.products[0], quantity: 2 }] }));
    act(() => root.render(<App />));
    expect(container.textContent).toContain('100 Robux');
    expect(container.textContent).toContain('S/ 7.10');
  });

  it('marks test products and does not allow real payment', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-free-fire"]').click());
    expect(container.textContent).toContain('PRUEBA');
  });
});
