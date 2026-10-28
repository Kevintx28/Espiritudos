const VBUCKS_PRICE_PER_100 = {
  PE: 1.8,
  CO: 1700,
  MX: 10,
  US: 0.55,
  ES: 0.5,
  EU: 0.5,
  AR: 800,
  EC: 0.55,
  CL: 520
};

const FIXED_PRICES = {
  'FN-PASS-BATTLE': { PE: 19.99, CO: 18750.5, MX: 108, US: 5.9, ES: 5.2, EU: 5.2, AR: 8850, EC: 5.9, CL: 5700 },
  'FN-PASS-ORIGINS': { PE: 22, CO: 20600, MX: 120, US: 6.45, ES: 5.75, EU: 5.75, AR: 9750, EC: 6.45, CL: 6265 },
  'FN-PASS-LEGO': { PE: 28, CO: 26300, MX: 150, US: 8.2, ES: 7.3, EU: 7.3, AR: 12400, EC: 8.2, CL: 7990 },
  'FN-PASS-MUSIC': { PE: 28, CO: 26300, MX: 150, US: 8.2, ES: 7.3, EU: 7.3, AR: 12400, EC: 8.2, CL: 7990 },
  'FN-VBUCKS-800': { PE: 19.99, CO: 18750.5, MX: 108, US: 5.9, ES: 5.2, EU: 5.2, AR: 8850, EC: 5.9, CL: 5700 },
  'FN-VBUCKS-2400': { PE: 54.99, CO: 51600, MX: 295, US: 16.1, ES: 14.4, EU: 14.4, AR: 24400, EC: 16.1, CL: 15660 },
  'FN-VBUCKS-4500': { PE: 84.99, CO: 79750, MX: 455, US: 24.9, ES: 22.2, EU: 22.2, AR: 37650, EC: 24.9, CL: 24200 },
  'FN-VBUCKS-12500': { PE: 189.99, CO: 177000, MX: 1020, US: 55.2, ES: 49.5, EU: 49.5, AR: 84000, EC: 55.2, CL: 54100 },
  'FN-CLUB-1M': { PE: 19.99, CO: 18750.5, MX: 108, US: 5.9, ES: 5.2, EU: 5.2, AR: 8850, EC: 5.9, CL: 5700 },
  'FN-CLUB-3M': { PE: 54.99, CO: 51600, MX: 295, US: 16.1, ES: 14.4, EU: 14.4, AR: 24400, EC: 16.1, CL: 15660 },
  'FN-CLUB-6M': { PE: 99.99, CO: 93800, MX: 535, US: 29.2, ES: 26, EU: 26, AR: 44250, EC: 29.2, CL: 28500 }
};

const CURRENCY_BY_COUNTRY = {
  PE: 'PEN',
  CO: 'COP',
  MX: 'MXN',
  US: 'USD',
  ES: 'EUR',
  EU: 'EUR',
  AR: 'ARS',
  EC: 'USD',
  CL: 'CLP',
  OTHER: 'USDT'
};

const CURRENCY_SYMBOLS = {
  PEN: 'S/',
  COP: '$',
  MXN: '$',
  USD: '$',
  USDT: '$',
  EUR: '€',
  ARS: '$',
  CLP: '$'
};

function fractionDigits(currency) {
  return currency === 'CLP' || currency === 'ARS' ? 0 : 2;
}

export function roundFortnitePrice(price, currency) {
  const digits = fractionDigits(currency);
  if (currency === 'PEN') return Number(price.toFixed(digits));
  const factor = 10 ** digits;
  const scaledPrice = price * factor;
  return Math.round(scaledPrice + Number.EPSILON * Math.abs(scaledPrice)) / factor;
}

function formatNumber(amount, currency) {
  const digits = fractionDigits(currency);
  const fixed = Number(amount).toFixed(digits);
  const [integer, fraction] = fixed.split('.');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (fraction === undefined) return grouped;
  return `${grouped}${currency === 'COP' ? ',' : '.'}${fraction}`;
}

export function formatFortniteMoney(amount, currency = 'PEN') {
  if (currency === 'PEN') return `S/ ${Number(amount).toFixed(2)}`;
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const value = formatNumber(amount, currency);
  return `${symbol} ${value} ${currency}`;
}

export function resolveFortniteProduct(product, country) {
  if (product?.gameId !== 'fortnite') return product;

  const countryCode = country?.code || 'PE';
  const currency = country?.currency || CURRENCY_BY_COUNTRY[countryCode] || product.currency || 'USD';
  const fixedPrice = FIXED_PRICES[product.id];
  let price = product.price;

  if (fixedPrice) {
    price = fixedPrice[countryCode] ?? fixedPrice.US;
  } else if (product.id === 'FN-100-REFERENCE') {
    price = VBUCKS_PRICE_PER_100[countryCode] ?? 0.55;
  } else if (Number.isFinite(Number(product.originalVbucks))) {
    const rate = VBUCKS_PRICE_PER_100[countryCode] ?? 0.55;
    price = (Number(product.originalVbucks) / 100) * rate;
  }

  if (!Number.isFinite(Number(price))) {
    return { ...product, currency };
  }

  const originalPrice = roundFortnitePrice(price, currency);
  const hasDiscount = Number.isFinite(Number(product.discountPercent)) && Number(product.discountPercent) > 0;
  return {
    ...product,
    currency,
    price: hasDiscount ? roundFortnitePrice(originalPrice * (1 - Number(product.discountPercent) / 100), currency) : originalPrice,
    ...(hasDiscount ? { originalPrice } : {}),
    oldPrice: countryCode === 'PE' ? product.oldPrice : undefined
  };
}
