import { isExcludedEntry, normalizeEntry, normalizeFortniteCategory } from './FortniteShop';
import { resolveFortniteImage } from './FortniteItemImage';

describe('Fortnite dynamic shop', () => {
  it('normalizes an API offer to the existing cart product format', () => {
    const product = normalizeEntry({
      offerId: 'offer-123',
      finalPrice: 1500,
      section: { displayName: 'Featured' },
      items: [{
        name: 'Traje de prueba',
        type: { displayValue: 'Outfit' },
        rarity: { displayValue: 'Epic' },
          images: { featured: 'https://cdn.test/featured.png' }
      }]
    }, 0);

    expect(product).toMatchObject({
      id: 'FN-offer-123',
      gameId: 'fortnite',
      name: 'Traje de prueba',
      price: 30,
      currency: 'PEN',
      fulfillmentAmount: 1500,
      fulfillmentLabel: 'V-Bucks',
      image: 'https://cdn.test/featured.png',
      type: 'Outfit',
      rarity: 'Epic',
      originalVbucks: 1500,
      section: 'Featured',
      note: 'Entrega manual por sistema de regalos de Fortnite'
    });
  });

  it('excludes LEGO and JUNO shop categories', () => {
    expect(isExcludedEntry({ section: { displayName: 'LEGO Fortnite' } })).toBe(true);
    expect(isExcludedEntry({ section: { displayName: 'Juno' } })).toBe(true);
    expect(isExcludedEntry({ section: { displayName: 'Daily Items' } })).toBe(false);
  });

  it('uses a short bundle title and display asset image', () => {
    const product = normalizeEntry({
      offerId: 'bundle-123',
      finalPrice: 2800,
      bundle: { name: 'Lote Mechagodzilla y Kong' },
      newDisplayAsset: { renderImages: ['https://cdn.test/bundle.png'] },
      section: { displayName: 'Godzilla' },
      brItems: [
        { name: 'Mechagodzilla', type: { displayValue: 'Outfit' } },
        { name: 'Hacha de batalla', type: { displayValue: 'Pico' } }
      ]
    }, 0);

    expect(product.name).toBe('Lote Mechagodzilla y Kong');
    expect(product.type).toBe('Lote');
    expect(product.image).toBe('https://cdn.test/bundle.png');
    expect(product.name).not.toContain('Hacha de batalla');
  });

  it('resolves the real renderImages object and category fields', () => {
    const rawItem = {
      name: 'Traje real',
      type: { displayValue: 'Outfit' },
      images: { icon: 'https://cdn.test/icon.png' }
    };
    const product = normalizeEntry({
      offerId: 'render-object',
      finalPrice: 800,
      brItems: [rawItem],
      newDisplayAsset: { renderImages: [{ image: 'https://cdn.test/render.png' }] }
    }, 0);

    expect(resolveFortniteImage({ newDisplayAsset: { renderImages: [{ image: 'https://cdn.test/render.png' }] } })).toBe('https://cdn.test/render.png');
    expect(product.image).toBe('https://cdn.test/render.png');
    expect(normalizeFortniteCategory(product)).toBe('Trajes');
  });

  it('skips an offer without a real name, type, or recoverable image', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(normalizeEntry({ offerId: 'empty-offer', finalPrice: 500 }, 181)).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('empty-offer'));
    warn.mockRestore();
  });

  it('keeps the API end date for the shared item countdown', () => {
    const product = normalizeEntry({
      offerId: 'dated-offer',
      finalPrice: 800,
      outDate: '2026-09-10T00:00:00.000Z',
      brItems: [{ name: 'Artículo con fecha', type: { displayValue: 'Outfit' } }]
    }, 0);
    expect(product.endDate).toBe('2026-09-10T00:00:00.000Z');
  });
});
