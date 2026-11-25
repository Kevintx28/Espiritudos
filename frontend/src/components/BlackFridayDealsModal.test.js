import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import BlackFridayDealsModal from './BlackFridayDealsModal';

let container;
let root;

describe('Black Friday deals modal', () => {
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('shows all discounted products with original and sale prices', () => {
    const products = Array.from({ length: 28 }, (_, index) => ({
      id: `FN-black-friday-modal-${index}`,
      gameId: 'fortnite',
      name: `Artículo ${index + 1}`,
      price: 9,
      originalPrice: 10,
      discountPercent: 10,
      currency: 'PEN'
    }));

    act(() => root.render(<BlackFridayDealsModal products={products} onAdd={() => {}} onClose={() => {}} />));

    expect(container.querySelectorAll('[data-testid^="product-card-"]')).toHaveLength(28);
    expect(container.textContent).toContain('S/ 10.00');
    expect(container.textContent).toContain('S/ 9.00');
  });

  it('closes on Escape and lets users add a product', () => {
    const product = { id: 'FN-black-friday-modal', gameId: 'fortnite', name: 'Artículo', price: 9, originalPrice: 10, discountPercent: 10, currency: 'PEN' };
    const onAdd = jest.fn();
    const onClose = jest.fn();

    act(() => root.render(<BlackFridayDealsModal products={[product]} onAdd={onAdd} onClose={onClose} />));
    act(() => container.querySelector('[data-testid="add-FN-black-friday-modal"]').click());
    act(() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })));

    expect(onAdd).toHaveBeenCalledWith(product);
    expect(onClose).toHaveBeenCalled();
  });
});
