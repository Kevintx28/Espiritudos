import { calculateCartTotals, formatFulfillmentSummary } from './cart-calculations';

const robux = (id, amount, price) => ({ id, name: `${amount} Robux`, fulfillmentAmount: amount, fulfillmentLabel: 'Robux', price });

describe('cart calculations', () => {
  it('calculates 2 x 150 Robux as 300 Robux and S/ 11.00', () => {
    const totals = calculateCartTotals([{ product: robux('RBX-150', 150, 5.5), quantity: 2 }]);
    expect(totals.lineCount).toBe(1);
    expect(totals.totalUnits).toBe(2);
    expect(totals.fulfillmentTotal).toBe(300);
    expect(formatFulfillmentSummary(totals)).toBe('300 Robux');
    expect(totals.totalMoney).toBe(11);
  });

  it('sums content across different Roblox products', () => {
    const totals = calculateCartTotals([
      { product: robux('RBX-50', 50, 1.99), quantity: 1 },
      { product: robux('RBX-150', 150, 5.5), quantity: 1 }
    ]);
    expect(totals.lineCount).toBe(2);
    expect(totals.totalUnits).toBe(2);
    expect(totals.fulfillmentTotal).toBe(200);
    expect(totals.totalMoney).toBeCloseTo(7.49);
  });

  it('updates content and money when one unit is removed', () => {
    const product = robux('RBX-150', 150, 5.5);
    const totals = calculateCartTotals([{ product, quantity: 2 }]);
    const afterRemoval = calculateCartTotals([{ product, quantity: 1 }]);
    expect(totals.fulfillmentTotal).toBe(300);
    expect(afterRemoval.fulfillmentTotal).toBe(150);
    expect(afterRemoval.totalMoney).toBe(5.5);
  });

  it('does not invent content totals for test products', () => {
    const totals = calculateCartTotals([{ product: { id: 'TEST', price: null, testOnly: true }, quantity: 2 }]);
    expect(totals.fulfillmentTotal).toBeNull();
    expect(formatFulfillmentSummary(totals)).toBe('Cantidad por confirmar');
  });
});
