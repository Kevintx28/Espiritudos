import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import FortniteCheckout from './components/FortniteCheckout';
import OrderReceiptGenerator from './components/OrderReceiptGenerator';
import PaymentVoucher from './components/PaymentVoucher';
import ContactFloaters from './components/ContactFloaters';

const peruPaymentMethods = [
  { id: 'yape', name: 'Yape', icon: 'Y', brandColor: '#6C3B9B', iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjgVIwiC-m-NzaYDBHXHaJxrwXeLg4Vl1Nsk5D8QuBTfpyYhxoEI62gY&s=10', paymentDetails: { number: '917 039 670', holder: 'Kevin Naiyel. T. C.', qr: 'https://i.imgur.com/hWGfhvX.png' } },
  { id: 'plin', name: 'Plin', icon: 'P', brandColor: '#00A86B', iconUrl: 'https://images.seeklogo.com/logo-png/38/2/plin-logo-png_seeklogo-386806.png', paymentDetails: { number: '917 039 670', holder: 'Kevin Naiyel. T. C.', qr: 'https://i.imgur.com/aZx3gTj.png' } },
  { id: 'lemon-cash', name: 'Lemon Cash', icon: 'L', brandColor: '#F5C518', textColor: '#171717', iconUrl: 'https://play-lh.googleusercontent.com/Wyrfg68_89zjJFajzuLeVwS1ULlISOzlQA-85Sfd2kJNkxOxVmppVgLdPF1Ov12cVF78CTRLHko8XTMEVbRf=w240-h480-rw', paymentDetails: { number: '917 039 670', lemontag: 'kevintx28', holder: 'Kevin Naiyel. T. C.', qr: 'https://i.imgur.com/zKIItla.png' } },
  { id: 'prexpe', name: 'Prexpe', icon: 'P', brandColor: '#0057FF', iconUrl: 'https://play-lh.googleusercontent.com/47BLMND75NlvL_ujHFt1O8ZhqYOfSoOxewC2EF11AUZRnM5_5v8XYMXNbc1gbi35ZhuuyPk_Fn8Chx0hgRx7', paymentDetails: { number: '917 039 670', holder: 'Kevin Naiyel. T. C.', qr: 'https://i.imgur.com/j5QisZ7.png' } },
  { id: 'pago-efectivo', name: 'Pago Efectivo', icon: 'E', brandColor: '#E31C25', iconUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/96c17b70532225.Y3JvcCw4MDgsNjMyLDAsMA.jpg', paymentDetails: { qr: 'https://i.imgur.com/riUjunw.png', instructions: 'Puedes pagar en efectivo en agentes y bodegas', cip: true } },
  { id: 'binance-pay', name: 'Binance Pay', icon: 'B', brandColor: '#F0B90B', textColor: '#171717', iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIAt0R1AQ14RAAEgcJL9JW6zUDYYWVU9Icu87B62Y_mS5c5Y9LiPIRFpx&s=10', paymentDetails: { user: 'User-e5319', qr: 'https://i.imgur.com/yIhJ8Da.jpeg' } }
];

const storeConfig = {
  identity: { name: 'KTXStore', tagline: 'Tienda' },
  social: { discord: 'https://discord.test' },
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
  paymentMethods: { PE: peruPaymentMethods, MX: [{ id: 'mercadopago', name: 'Mercado Pago', icon: 'M' }, { id: 'paypal', name: 'PayPal', icon: 'P' }] },
  dLocalGo: { enabled: false }
};

let container;
let root;
let originalFetch;
let originalClipboard;

describe('KTXStore flow', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    originalFetch = global.fetch;
    originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    localStorage.clear();
    window.KTX_STORE_CONFIG = storeConfig;
    window.APP_CONFIG = { social: { whatsapp: 'https://wa.test', discord: 'https://discord.test' } };
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    localStorage.clear();
    global.fetch = originalFetch;
    if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
    else delete navigator.clipboard;
  });

  it('persists the selected country', () => {
    act(() => root.render(<App />));
    act(() => container.querySelector('header button').click());
    act(() => container.querySelector('[data-testid="country-MX"]')?.click());
    expect(localStorage.getItem('ktxstore:selectedCountry')).toBe('"MX"');
  });

  it('includes selected V-Bucks accounts, Epic ID, payment, discount and country currency in the order image', () => {
    const order = {
      id: 'KTX-TEST',
      date: '12/10/2026',
      country: { name: 'México', currency: 'MXN' },
      game: { id: 'fortnite', name: 'Fortnite' },
      items: [],
      calculations: { lines: [], totalUnits: 0, totalMoney: 120, fulfillmentLabel: null },
      total: 108,
      creatorDiscountAmount: 12,
      creatorCodeApplied: true,
      creatorCode: 'OMARS4',
      form: { epicId: 'EpicPlayer', vbucksAccounts: ['gatozz1', 'gatozz3'] },
      paymentMethod: 'Yape',
      voucher: null
    };
    act(() => root.render(<OrderReceiptGenerator order={order} onGenerated={() => {}} />));

    const receipt = container.querySelector('.ktx-halloween-receipt').textContent;
    expect(receipt).toContain('gatozz1, gatozz3');
    expect(receipt).toContain('Usuario de Fortnite: EpicPlayer');
    expect(receipt).toContain('Método de pago: Yape');
    expect(receipt).toContain('$ 108.00 MXN');
    expect(receipt).toContain('Código de creador OMARS4 aplicado: -10% ($ 12.00 MXN)');
  });

  it('prints daily deal sale price and regular price distinctly in the generated order image', () => {
    const product = {
      id: 'FN-daily-test',
      gameId: 'fortnite',
      name: 'Artículo diario',
      price: 24.3,
      originalPrice: 27,
      discountPercent: 10,
      currency: 'PEN',
      fulfillmentAmount: 1500,
      fulfillmentLabel: 'V-Bucks'
    };
    const order = {
      id: 'KTX-DAILY',
      date: '15/10/2026',
      country: storeConfig.countries[0],
      game: { id: 'fortnite', name: 'Fortnite' },
      items: [{ product, quantity: 1 }],
      calculations: {
        lines: [{ product, quantity: 1, fulfillmentTotal: 1500, fulfillmentLabel: 'V-Bucks', subtotal: 24.3 }],
        totalUnits: 1,
        totalMoney: 24.3,
        fulfillmentTotal: 1500,
        fulfillmentLabel: 'V-Bucks'
      },
      total: 24.3,
      form: { epicId: 'EpicPlayer', vbucksAccounts: ['gatozz1'] },
      paymentMethod: 'Yape',
      voucher: null
    };

    act(() => root.render(<OrderReceiptGenerator order={order} onGenerated={() => {}} />));
    const receipt = container.querySelector('.ktx-halloween-receipt').textContent;
    expect(receipt).toContain('Precio diario (-10%): S/ 24.30');
    expect(receipt).toContain('Precio normal: S/ 27.00');
    expect(receipt).toContain('Subtotal: S/ 24.30');
  });

  it('requires at least one V-Bucks account only when the account selector is enabled', () => {
    const onContinue = jest.fn();
    const checkoutProps = {
      country: storeConfig.countries[0],
      hasTestProducts: false,
      subtotal: 19.99,
      total: 19.99,
      creatorDiscountAmount: 0,
      initialForm: { epicId: 'EpicPlayer', vbucksAccounts: [] },
      initialPayment: null,
      showVbucksAccounts: true,
      creatorCodeAvailable: false,
      creatorCodeApplied: false,
      appliedCreatorCode: '',
      onApplyCreatorCode: () => false,
      onBack: () => {},
      onContinue
    };
    act(() => root.render(<FortniteCheckout {...checkoutProps} />));
    expect(container.textContent).toContain('al menos 48 horas antes');
    expect(container.textContent).toContain('máximo 5 artículos por cuenta');
    expect(container.textContent).toContain('a las 5 cuentas');
    act(() => container.querySelector('[data-testid="checkout-payment-yape"]').click());
    expect(container.querySelector('[data-testid="checkout-payment-yape"]').getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelector('[data-testid="checkout-payment-yape"]').textContent).toContain('Seleccionado');
    act(() => container.querySelector('[aria-label="Cerrar modal de pago"]').click());
    act(() => container.querySelector('[data-testid="continue-without-voucher"]').click());
    expect(container.querySelector('[role="alert"]').textContent).toContain('Debes seleccionar al menos una cuenta de V-Bucks');
    expect(container.querySelector('[role="alert"]').textContent).toContain('48 horas');
    expect(onContinue).not.toHaveBeenCalled();

    act(() => container.querySelector('[data-testid="vbucks-account-gatozz1"]').click());
    expect(container.querySelector('[role="alert"]')).toBeNull();
    act(() => container.querySelector('[data-testid="continue-without-voucher"]').click());
    expect(onContinue).toHaveBeenCalledWith(
      { epicId: 'EpicPlayer', vbucksAccounts: ['gatozz1'] },
      { paymentMethod: 'Yape', paymentMethodId: 'yape', voucher: null }
    );
  });

  it('shows Peruvian payment details, copy actions and an expandable QR', async () => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: jest.fn().mockResolvedValue(undefined) } });
    act(() => root.render(<PaymentVoucher country={storeConfig.countries[0]} game={{ id: 'roblox' }} items={[{ product: { price: 25 }, quantity: 1 }, { product: { price: 10 }, quantity: 2 }]} onBack={() => {}} onContinue={() => {}} />));
    expect(Array.from(container.querySelectorAll('input[name="payment"]')).map((input) => input.value)).toEqual([
      'yape', 'plin', 'lemon-cash', 'prexpe', 'pago-efectivo', 'binance-pay'
    ]);
    const peruMethods = Array.from(container.querySelectorAll('input[name="payment"]')).map((input) => input.closest('label'));
    expect(peruMethods.every((method) => method.querySelector('img') && method.style.backgroundColor)).toBe(true);

    act(() => container.querySelector('input[value="lemon-cash"]').click());
    expect(container.querySelector('[role="dialog"]').textContent).toContain('Lemon Cash');
    expect(container.querySelector('[role="dialog"]').textContent).toContain('917 039 670');
    expect(container.querySelector('[role="dialog"]').textContent).toContain('kevintx28');
    expect(container.querySelector('[role="dialog"]').textContent).toContain('Kevin Naiyel. T. C.');
    expect(Array.from(container.querySelectorAll('[role="dialog"] button')).filter((button) => button.textContent === 'Copiar')).toHaveLength(2);
    expect(container.querySelector('[role="dialog"] img[alt=""]').getAttribute('src')).toBe(peruPaymentMethods[2].iconUrl);
    expect(container.querySelector('[role="dialog"] [class*="select-none"]').style.userSelect).toBe('none');
    expect(container.querySelector('[role="dialog"] img[alt^="QR de pago"]').getAttribute('src')).toBe('https://i.imgur.com/zKIItla.png');
    expect(container.querySelectorAll('[role="dialog"] button')).toHaveLength(5);

    await act(async () => {
      Array.from(container.querySelectorAll('[role="dialog"] button')).find((button) => button.textContent === 'Copiar').click();
      await Promise.resolve();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('917 039 670');
    expect(container.querySelector('[role="status"]').textContent).toContain('copiado');
    act(() => container.querySelector('[aria-label="Ampliar QR de Lemon Cash"]').click());
    expect(container.querySelector('[aria-label="QR ampliado de Lemon Cash"]')).not.toBeNull();
    act(() => container.querySelector('[aria-label="Cerrar QR ampliado"]').click());
    act(() => container.querySelector('[aria-label="Cerrar modal de pago"]').click());
    act(() => container.querySelector('input[value="pago-efectivo"]').click());
    expect(container.querySelector('[role="dialog"]').textContent).toContain('Puedes pagar en efectivo en agentes y bodegas');
    expect(container.querySelector('[role="dialog"] img[alt^="QR de pago"]').getAttribute('src')).toBe('https://i.imgur.com/riUjunw.png');
    const cipLink = container.querySelector('[data-testid="payment-cip-whatsapp"]');
    expect(cipLink.textContent).toBe('Solicitar código CIP por WhatsApp');
    expect(cipLink.getAttribute('target')).toBe('_blank');
    const [whatsappNumber, encodedMessage] = cipLink.href.split('?text=');
    expect(whatsappNumber).toBe('https://wa.me/51968788328');
    expect(decodeURIComponent(encodedMessage)).toBe([
      'Hola, acabo de solicitar un pago con Pago Efectivo.',
      'Monto a pagar: S/ 45.00',
      'Por favor envíame el código CIP. Gracias.',
      'Aqui tambien adjunto la imagen generada en la pagina con los articulos que deseo.'
    ].join('\n'));
  });

  it('keeps non-Peru payment methods and does not expose Peru payment data there', () => {
    act(() => root.render(<PaymentVoucher country={storeConfig.countries[1]} game={{ id: 'roblox' }} items={[]} onBack={() => {}} onContinue={() => {}} />));
    expect(Array.from(container.querySelectorAll('input[name="payment"]')).map((input) => input.value)).toEqual(['mercadopago', 'paypal']);
    expect(container.querySelector('[data-testid="checkout-payment-yape"]')).toBeNull();
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it('shows branded WhatsApp and Discord logos in the floating contact buttons', () => {
    act(() => root.render(<ContactFloaters social={{ whatsapp: 'https://wa.test', discord: 'https://discord.test' }} />));
    expect(container.querySelector('[aria-label="Escribir por WhatsApp a KTXStore"] img').getAttribute('src')).toContain('img.magnific.com');
    expect(container.querySelector('[aria-label="Unirse al Discord de KTXStore"] img').getAttribute('src')).toContain('vecteezy.com');
    expect(container.querySelector('[aria-label="Escribir por WhatsApp a KTXStore"]').getAttribute('href')).toBe('https://wa.test');
    expect(container.querySelector('[aria-label="Unirse al Discord de KTXStore"]').getAttribute('href')).toBe('https://discord.test');
  });

  it('shows Mexican Fortnite prices in MXN through the product and cart', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { shop: { entries: [] } } }) });
    act(() => root.render(<App />));
    act(() => container.querySelector('header button').click());
    act(() => container.querySelector('[data-testid="country-MX"]').click());
    act(() => container.querySelector('[data-testid="game-fortnite"]').click());
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
    act(() => Array.from(container.querySelectorAll('nav[aria-label="Subcategorías de Fortnite"] button')).find((button) => button.textContent.trim() === 'Pases de Fortnite').click());

    expect(container.textContent).toContain('$ 108.00 MXN');
    act(() => container.querySelector('[data-testid="add-FN-PASS-BATTLE"]').click());
    expect(container.querySelector('[data-testid="floating-cart-total"]').textContent).toContain('$ 108.00 MXN');
    act(() => container.querySelector('[data-testid="floating-cart"]').click());
    expect(container.querySelector('[data-testid="cart-drawer"]').textContent).toContain('Moneda: MXN');
    expect(container.querySelector('[data-testid="cart-drawer"]').textContent).toContain('$ 108.00 MXN');
  });

  it('generates a Fortnite order without a voucher when payment has not been made', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { shop: { entries: [] } } }) });
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-fortnite"]').click());
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
    act(() => Array.from(container.querySelectorAll('nav[aria-label="Subcategorías de Fortnite"] button')).find((button) => button.textContent.trim() === 'Pases de Fortnite').click());
    act(() => container.querySelector('[data-testid="add-FN-PASS-BATTLE"]').click());
    act(() => container.querySelector('[data-testid="floating-cart"]').click());
    act(() => container.querySelector('[data-testid="cart-drawer-checkout"]').click());
    act(() => container.querySelector('[data-testid="checkout-payment-yape"]').click());
    act(() => container.querySelector('[role="dialog"] button').click());

    const epicIdInput = container.querySelector('[data-testid="fortnite-epic-id"]');
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(epicIdInput, 'EpicPlayer');
    act(() => epicIdInput.dispatchEvent(new Event('input', { bubbles: true })));
    act(() => container.querySelector('[data-testid="vbucks-account-gatozz2"]').click());
    act(() => container.querySelector('[data-testid="continue-without-voucher"]').click());

    const savedOrder = JSON.parse(localStorage.getItem('ktxstore:pendingOrder'));
    expect(savedOrder.voucher).toBeNull();
    expect(savedOrder.paymentMethod).toBe('Yape');
    expect(savedOrder.form.epicId).toBe('EpicPlayer');
    expect(savedOrder.form.vbucksAccounts).toEqual(['gatozz2']);
    expect(container.querySelector('.ktx-halloween-receipt').textContent).toContain('No se adjuntó comprobante.');
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
    expect(container.querySelector('[data-testid="vbucks-account-gatozz1"]')).not.toBeNull();
    act(() => container.querySelector('[data-testid="vbucks-account-gatozz1"]').click());
    act(() => container.querySelector('[data-testid="vbucks-account-gatozz3"]').click());
    expect(container.querySelector('[data-testid="vbucks-account-gatozz1"]').getAttribute('aria-pressed')).toBe('true');
    expect(container.querySelector('[data-testid="vbucks-account-gatozz3"]').getAttribute('aria-pressed')).toBe('true');
    const setInputValue = (value) => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(codeInput, value);
      codeInput.dispatchEvent(new Event('input', { bubbles: true }));
    };
    act(() => { setInputValue('INVALID'); container.querySelector('[data-testid="creator-code-apply"]').click(); });
    expect(container.querySelector('[role="alert"]').textContent).toContain('Cupón no válido');
    expect(container.querySelector('[data-testid="creator-code-input"]').getAttribute('aria-invalid')).toBe('true');
    expect(container.querySelector('h3#fortnite-checkout-code').textContent).toBe('Cupón de descuento');
    expect(Array.from(container.querySelectorAll('[href]')).some((link) => link.href === 'https://www.twitch.tv/kristalyz08')).toBe(true);
    expect(Array.from(container.querySelectorAll('[href]')).some((link) => link.href.startsWith('https://discord.test'))).toBe(true);
    act(() => { setInputValue('KRIS08'); container.querySelector('[data-testid="creator-code-apply"]').click(); });
    expect(container.querySelector('[role="status"]').textContent).toContain('KRIS08 aplicado');
    expect(container.querySelector('[role="status"]').textContent).toContain('¡Cupón aplicado!');
    expect(container.querySelector('[role="status"]').textContent).toContain('ahorras S/ 5.13');
    expect(container.querySelector('[role="status"]').textContent).toContain('Vía regalo');
    expect(container.querySelector('[role="status"]').textContent).toContain('Club de Fortnite');
    expect(container.querySelector('[data-testid="fortnite-checkout-total-value"]').textContent).toContain('S/ 46.17');
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
    expect(container.querySelector('[data-testid="vbucks-account-gatozz1"]')).toBeNull();
    act(() => container.querySelector('[data-testid="checkout-payment-yape"]').click());
    expect(container.querySelector('[role="dialog"]').textContent).toContain('Yape');
    expect(container.querySelector('[role="dialog"]').textContent).toContain('917 039 670');
    expect(container.querySelector('[role="dialog"] img[alt^="QR de pago"]').getAttribute('src')).toBe('https://i.imgur.com/hWGfhvX.png');
    act(() => container.querySelector('[aria-label="Cerrar modal de pago"]').click());
    expect(container.querySelector('[data-testid="fortnite-epic-id"]')).not.toBeNull();
    act(() => Array.from(container.querySelectorAll('button')).find((button) => button.textContent.includes('Atrás')).click());
    selectFortniteTab('Pases de Fortnite');
    openCheckout();
    expect(container.querySelector('[data-testid="creator-code-input"]')).toBeNull();
    expect(container.querySelectorAll('[data-testid^="vbucks-account-"]')).toHaveLength(5);
  });

  it('applies OMARS4 to Fortnite Club only and preserves fixed V-Bucks top-up pricing', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ data: { shop: { entries: [] } } }) });
    act(() => root.render(<App />));
    act(() => container.querySelector('[data-testid="game-fortnite"]').click());
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
    act(() => Array.from(container.querySelectorAll('nav[aria-label="Subcategorías de Fortnite"] button')).find((button) => button.textContent.trim() === 'Vía cuenta').click());
    act(() => container.querySelector('[data-testid="add-FN-VBUCKS-800"]').click());
    act(() => container.querySelector('[data-testid="floating-cart"]').click());
    act(() => container.querySelector('[data-testid="cart-drawer-checkout"]').click());
    expect(container.querySelector('[data-testid="creator-code-input"]')).toBeNull();
    expect(container.querySelector('[data-testid="vbucks-account-gatozz1"]')).toBeNull();
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
    act(() => { setInputValue('OMARS4'); container.querySelector('[data-testid="creator-code-apply"]').click(); });
    expect(container.querySelector('[role="status"]').textContent).toContain('OMARS4 aplicado');
    act(() => Array.from(container.querySelectorAll('button')).find((button) => button.textContent.includes('Atrás')).click());
    expect(container.querySelector('[data-testid="floating-cart-total"]').textContent).toContain('S/ 37.98');
    act(() => container.querySelector('[data-testid="floating-cart"]').click());
    expect(container.querySelector('[data-testid="cart-drawer"]').textContent).toContain('OMARS4 (-10%)');
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
