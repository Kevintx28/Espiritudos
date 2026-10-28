import { formatFortniteMoney, resolveFortniteProduct, roundFortnitePrice } from './fortnite-pricing';

const countries = {
  PE: { code: 'PE', currency: 'PEN' },
  CO: { code: 'CO', currency: 'COP' },
  MX: { code: 'MX', currency: 'MXN' },
  US: { code: 'US', currency: 'USD' },
  ES: { code: 'ES', currency: 'EUR' },
  EU: { code: 'EU', currency: 'EUR' },
  AR: { code: 'AR', currency: 'ARS' },
  EC: { code: 'EC', currency: 'USD' },
  CL: { code: 'CL', currency: 'CLP' },
  OTHER: { code: 'OTHER', currency: 'USDT' }
};

const fixedPrices = {
  'FN-PASS-BATTLE': [19.99, 18750.5, 108, 5.9, 5.2, 5.2, 8850, 5.9, 5700],
  'FN-PASS-ORIGINS': [22, 20600, 120, 6.45, 5.75, 5.75, 9750, 6.45, 6265],
  'FN-PASS-LEGO': [28, 26300, 150, 8.2, 7.3, 7.3, 12400, 8.2, 7990],
  'FN-PASS-MUSIC': [28, 26300, 150, 8.2, 7.3, 7.3, 12400, 8.2, 7990],
  'FN-VBUCKS-800': [19.99, 18750.5, 108, 5.9, 5.2, 5.2, 8850, 5.9, 5700],
  'FN-VBUCKS-2400': [54.99, 51600, 295, 16.1, 14.4, 14.4, 24400, 16.1, 15660],
  'FN-VBUCKS-4500': [84.99, 79750, 455, 24.9, 22.2, 22.2, 37650, 24.9, 24200],
  'FN-VBUCKS-12500': [189.99, 177000, 1020, 55.2, 49.5, 49.5, 84000, 55.2, 54100],
  'FN-CLUB-1M': [19.99, 18750.5, 108, 5.9, 5.2, 5.2, 8850, 5.9, 5700],
  'FN-CLUB-3M': [54.99, 51600, 295, 16.1, 14.4, 14.4, 24400, 16.1, 15660],
  'FN-CLUB-6M': [99.99, 93800, 535, 29.2, 26, 26, 44250, 29.2, 28500]
};

describe('Fortnite country pricing', () => {
  it('uses the supplied fixed price for every pass, top-up and Club plan', () => {
    const countryCodes = ['PE', 'CO', 'MX', 'US', 'ES', 'EU', 'AR', 'EC', 'CL'];

    Object.entries(fixedPrices).forEach(([id, expectedPrices]) => {
      countryCodes.forEach((code, index) => {
        const result = resolveFortniteProduct({ id, gameId: 'fortnite', price: 1, currency: 'PEN' }, countries[code]);
        expect(result.price).toBe(expectedPrices[index]);
        expect(result.currency).toBe(countries[code].currency);
      });
    });
  });

  it('uses US fixed prices in USDT for the Other Countries option', () => {
    expect(resolveFortniteProduct({ id: 'FN-PASS-BATTLE', gameId: 'fortnite', price: 19.99 }, countries.OTHER)).toMatchObject({ price: 5.9, currency: 'USDT' });
  });

  it('uses the country V-Bucks reference rate for 100 V-Bucks', () => {
    const reference = { id: 'FN-100-REFERENCE', gameId: 'fortnite', price: 1.8, currency: 'PEN' };
    expect(resolveFortniteProduct(reference, countries.PE).price).toBe(1.8);
    expect(resolveFortniteProduct(reference, countries.CO).price).toBe(1700);
    expect(resolveFortniteProduct(reference, countries.MX).price).toBe(10);
    expect(resolveFortniteProduct(reference, countries.US).price).toBe(0.55);
    expect(resolveFortniteProduct(reference, countries.OTHER)).toMatchObject({ price: 0.55, currency: 'USDT' });
  });

  it('prices gift shop V-Bucks from each country rate and reapplies the daily discount in that currency', () => {
    const item = { id: 'FN-shop-item', gameId: 'fortnite', price: 27, currency: 'PEN', originalVbucks: 1500 };

    expect(resolveFortniteProduct(item, countries.PE).price).toBe(27);
    expect(resolveFortniteProduct(item, countries.CO).price).toBe(25500);
    expect(resolveFortniteProduct(item, countries.MX).price).toBe(150);
    expect(resolveFortniteProduct(item, countries.US).price).toBe(8.25);
    expect(resolveFortniteProduct({ ...item, discountPercent: 10 }, countries.US)).toMatchObject({ price: 7.43, originalPrice: 8.25, currency: 'USD' });
    expect(resolveFortniteProduct({ ...item, discountPercent: 10 }, countries.CL)).toMatchObject({ price: 7020, originalPrice: 7800, currency: 'CLP' });
  });

  it('formats the selected currency while preserving the exact Peru display', () => {
    expect(formatFortniteMoney(19.99, 'PEN')).toBe('S/ 19.99');
    expect(formatFortniteMoney(18750.5, 'COP')).toBe('$ 18.750,50 COP');
    expect(formatFortniteMoney(108, 'MXN')).toBe('$ 108.00 MXN');
    expect(formatFortniteMoney(2.75, 'USDT')).toBe('$ 2.75 USDT');
    expect(formatFortniteMoney(5.2, 'EUR')).toBe('€ 5.20 EUR');
    expect(formatFortniteMoney(5700, 'CLP')).toBe('$ 5.700 CLP');
  });

  it('rounds creator-code discounts to each currency minor unit', () => {
    expect(roundFortnitePrice(5.9 * 0.9, 'USD')).toBe(5.31);
    expect(roundFortnitePrice(18750.5 * 0.9, 'COP')).toBe(16875.45);
    expect(roundFortnitePrice(5700 * 0.9, 'CLP')).toBe(5130);
  });

  it('does not reprice products outside Fortnite', () => {
    const product = { id: 'RBX-100', gameId: 'roblox', price: 3.55, currency: 'PEN' };
    expect(resolveFortniteProduct(product, countries.MX)).toBe(product);
  });
});
