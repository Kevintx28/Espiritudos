export function calculateCartTotals(items = []) {
  const lines = items.map(({ product, quantity }) => {
    const safeQuantity = Number(quantity) || 0;
    const unitPrice = Number(product.price) || 0;
    const fulfillmentAmount = Number.isFinite(Number(product.fulfillmentAmount))
      ? Number(product.fulfillmentAmount)
      : null;
    return {
      product,
      quantity: safeQuantity,
      unitPrice,
      subtotal: unitPrice * safeQuantity,
      fulfillmentAmount,
      fulfillmentTotal: fulfillmentAmount === null ? null : fulfillmentAmount * safeQuantity,
      fulfillmentLabel: product.fulfillmentLabel || null
    };
  });

  const fulfillmentTotals = lines.reduce((totals, line) => {
    if (line.fulfillmentTotal === null || !line.fulfillmentLabel) return totals;
    totals[line.fulfillmentLabel] = (totals[line.fulfillmentLabel] || 0) + line.fulfillmentTotal;
    return totals;
  }, {});
  const fulfillmentLabels = Object.keys(fulfillmentTotals);

  return {
    lines,
    lineCount: lines.length,
    totalUnits: lines.reduce((sum, line) => sum + line.quantity, 0),
    totalMoney: lines.reduce((sum, line) => sum + line.subtotal, 0),
    fulfillmentTotals,
    fulfillmentTotal: fulfillmentLabels.length === 1 ? fulfillmentTotals[fulfillmentLabels[0]] : null,
    fulfillmentLabel: fulfillmentLabels.length === 1 ? fulfillmentLabels[0] : null
  };
}

export function formatFulfillmentSummary(calculations) {
  if (!calculations?.fulfillmentLabel) return 'Cantidad por confirmar';
  return `${calculations.fulfillmentTotal} ${calculations.fulfillmentLabel}`;
}
