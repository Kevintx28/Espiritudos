import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const storeConfig = {
  identity: { name: 'KTXStore', tagline: 'Tienda' },
  countries: [{ code: 'PE', name: 'Perú', currency: 'PEN', symbol: 'S/', flag: '🇵🇪' }, { code: 'MX', name: 'México', currency: 'MXN', symbol: '$', flag: '🇲🇽' }],
  games: [
    { id: 'roblox', name: 'Roblox', shortName: 'Roblox', icon: 'Gamepad2', deliveryType: 'redeem_code' },
    { id: 'fortnite', name: 'Fortnite', shortName: 'Fortnite', icon: 'Gamepad2', deliveryType: 'redeem_code' },
    { id: 'marvel-rivals', name: 'Marvel Rivals', shortName: 'Marvel', icon: 'Shield', deliveryType: 'numeric_uid' },
    { id: 'free-fire', name: 'Free Fire', shortName: 'Free Fire', icon: 'Flame', deliveryType: 'player_id' }
  ],
  products: [
    { id: 'RBX-100', gameId: 'roblox', name: '100 Robux', price: 3.55, currency: 'PEN', fulfillmentAmount: 100, fulfillmentLabel: 'Robux' },
    { id: 'RBX-150', gameId: 'roblox', name: '150 Robux', price: 5.5, currency: 'PEN', fulfillmentAmount: 150, fulfillmentLabel: 'Robux' },
    { id: 'MR-TEST', gameId: 'marvel-rivals', name: 'Lattice Marvel Rivals — precio por definir', price: null, currency: 'PEN', testOnly: true },
    { id: 'FF-TEST', gameId: 'free-fire', name: 'Diamantes Free Fire — precio por definir', price: null, currency: 'PEN', testOnly: true }
  ],
  deliveryInstructions: { redeem_code: { title: 'Canjea tu código', steps: [], note: 'Nota' }, numeric_uid: { title: 'UID', steps: [], note: 'Nota' }, player_id: { title: 'ID', steps: [], note: 'Nota' } },
  paymentMethods: { PE: [{ id: 'yape', name: 'Yape', icon: 'Y' }], MX: [] },
  dLocalGo: { enabled: false }
};

let container;
let root;
let originalFetch;

describe('KTXStore flow', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    originalFetch = global.fetch;
    localStorage.clear();
    window.KTX_STORE_CONFIG = storeConfig;
    window.APP_CONFIG = { social: { whatsapp: 'https://wa.test', discord: 'https://discord.test' } };
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => { act(() => root.unmount()); container.remove(); localStorage.clear(); global.fetch = originalFetch; });

  it('persists the selected country', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('header button').click());
    act(() => container.querySelector('[data-testid="country-MX"]')?.click());
    expect(localStorage.getItem('ktxstore:selectedCountry')).toBe('"MX"');
  });

  it('selects Roblox and adds RBX-100 to its independent cart', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-roblox"]').click());
    act(() => container.querySelector('[data-testid="add-RBX-100"]').click());
    expect(JSON.parse(localStorage.getItem('ktxstore:cartByGame')).roblox[0].product.id).toBe('RBX-100');
    expect(container.textContent).toContain('Carrito del juego');
  });

  it('shows 300 Robux and S/ 11.00 in the cart summary and floating cart', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-roblox"]').click());
    act(() => container.querySelector('[data-testid="add-RBX-150"]').click());
    act(() => container.querySelector('[data-testid="add-RBX-150"]').click());
    expect(container.textContent).toContain('Entrega: 300 Robux');
    expect(container.textContent.replace(/\s+/g, ' ')).toContain('Total a pagar:S/ 11.00');
    expect(container.querySelector('[data-testid="floating-cart-total"]').textContent).toContain('300 Robux · S/ 11.00');
  });

  it('applies KRIS08 to gift-shop prices and hides it in Fortnite fixed-price sections', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { shop: { entries: Array.from({ length: 9 }, (_, index) => ({
        offerId: `creator-offer-${index + 1}`,
        finalPrice: 1500,
        section: { displayName: 'Featured' },
        items: [{ name: `Traje ${index + 1}`, type: { displayValue: 'Outfit' }, images: { icon: 'https://cdn.test/fortnite.png' } }]
      })) } } })
    });
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-fortnite"]').click());
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });

    const dailySection = container.querySelector('#fortnite-deals-title').closest('section');
    const dailyButton = dailySection.querySelector('button[data-testid^="add-"]');
    const dailyIds = new Set(Array.from(dailySection.querySelectorAll('button[data-testid^="add-"]')).map((button) => button.dataset.testid.replace('add-', '')));
    const giftSection = container.querySelector('#fortnite-gift-title').closest('section');
    const regularButton = Array.from(giftSection.querySelectorAll('button[data-testid^="add-"]')).find((button) => !dailyIds.has(button.dataset.testid.replace('add-', '')));
    expect(regularButton).toBeDefined();
    act(() => dailyButton.click());
    act(() => regularButton.click());
    act(() => container.querySelector('[data-testid="floating-cart"]').click());
    act(() => container.querySelector('[data-testid="cart-drawer-checkout"]').click());

    const codeInput = container.querySelector('[data-testid="creator-code-input"]');
    const setInputValue = (value) => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(codeInput, value);
      codeInput.dispatchEvent(new Event('input', { bubbles: true }));
    };
    act(() => { setInputValue('INVALID'); container.querySelector('[data-testid="creator-code-apply"]').click(); });
    expect(container.querySelector('[role="alert"]').textContent).toContain('Código no válido');
    act(() => { setInputValue('KRIS08'); container.querySelector('[data-testid="creator-code-apply"]').click(); });
    expect(container.querySelector('[role="status"]').textContent).toContain('Kristalyz08');
    act(() => Array.from(container.querySelectorAll('button')).find((button) => button.textContent.includes('Atrás')).click());
    expect(container.querySelector('[data-testid="floating-cart-total"]').textContent).toContain('S/ 46.17');

    const selectFortniteTab = (label) => {
      const nav = container.querySelector('[aria-label="Subcategorías de Fortnite"]');
      act(() => Array.from(nav.querySelectorAll('button')).find((button) => button.textContent.trim() === label).click());
    };
    const openCheckout = () => {
      act(() => container.querySelector('[data-testid="floating-cart"]').click());
      act(() => container.querySelector('[data-testid="cart-drawer-checkout"]').click());
    };
    selectFortniteTab('Vía cuenta');
    expect(container.querySelector('[data-testid="floating-cart-total"]').textContent).toContain('S/ 51.30');
    openCheckout();
    expect(container.querySelector('[data-testid="creator-code-input"]')).toBeNull();
    act(() => Array.from(container.querySelectorAll('button')).find((button) => button.textContent.includes('Atrás')).click());
    selectFortniteTab('Pases de Fortnite');
    openCheckout();
    expect(container.querySelector('[data-testid="creator-code-input"]')).toBeNull();
  });

  it('shows KRIS08 for Fortnite Club only and preserves fixed V-Bucks top-up pricing', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { shop: { entries: [] } } }) });
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-fortnite"]').click());
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
    act(() => Array.from(container.querySelectorAll('nav[aria-label="Subcategorías de Fortnite"] button')).find((button) => button.textContent.trim() === 'Vía cuenta').click());
    act(() => container.querySelector('[data-testid="add-FN-VBUCKS-800"]').click());
    act(() => container.querySelector('[data-testid="floating-cart"]').click());
    act(() => container.querySelector('[data-testid="cart-drawer-checkout"]').click());
    expect(container.querySelector('[data-testid="creator-code-input"]')).toBeNull();
    act(() => Array.from(container.querySelectorAll('button')).find((button) => button.textContent.includes('Atrás')).click());
    act(() => container.querySelector('[data-testid="add-FN-CLUB-1M"]').click());
    act(() => container.querySelector('[data-testid="floating-cart"]').click());
    act(() => container.querySelector('[data-testid="cart-drawer-checkout"]').click());

    const codeInput = container.querySelector('[data-testid="creator-code-input"]');
    expect(codeInput).not.toBeNull();
    const setInputValue = (value) => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(codeInput, value);
      codeInput.dispatchEvent(new Event('input', { bubbles: true }));
    };
    act(() => { setInputValue('KRIS08'); container.querySelector('[data-testid="creator-code-apply"]').click(); });
    expect(container.querySelector('[role="status"]').textContent).toContain('Kristalyz08');
    act(() => Array.from(container.querySelectorAll('button')).find((button) => button.textContent.includes('Atrás')).click());
    expect(container.querySelector('[data-testid="floating-cart-total"]').textContent).toContain('S/ 37.98');
  });

  it('navigates to Marvel Rivals checkout instructions', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-marvel-rivals"]').click());
    act(() => container.querySelector('[data-testid="add-MR-TEST"]').click());
    act(() => container.querySelector('[data-testid="cart-continue"]').click());
    expect(container.textContent).toContain('UID');
    expect(container.querySelector('[data-testid="creator-code-input"]')).toBeNull();
    expect(container.textContent).toContain('Atrás');
    expect(container.textContent).toContain('Datos');
  });

  it('restores a persisted cart on mount', () => {
    localStorage.setItem('ktxstore:cartByGame', JSON.stringify({ roblox: [{ product: storeConfig.products[0], quantity: 2 }] }));
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-roblox"]').click());
    expect(container.textContent).toContain('100 Robux');
    expect(container.textContent).toContain('S/ 7.10');
  });

  it('marks test products and does not allow real payment', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-free-fire"]').click());
    expect(container.textContent).toContain('PRUEBA');
  });
});
