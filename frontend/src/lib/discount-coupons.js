export const DISCOUNT_COUPONS = Object.freeze({
  OMARS4: 10,
  KRIS08: 10,
  BF28: 10,
  TAYLER: 10,
  LUCASPRO: 10,
  TOKEN: 8,
  HOLAHOLAPASAPASA: 5,
  '67': 6.7
});

export function normalizeDiscountCoupon(code) {
  return String(code || '').trim().toUpperCase();
}

export function getDiscountCoupon(code) {
  const normalizedCode = normalizeDiscountCoupon(code);
  const percent = DISCOUNT_COUPONS[normalizedCode];
  return percent === undefined ? null : { code: normalizedCode, percent };
}

export function getDiscountCouponPercent(code) {
  return getDiscountCoupon(code)?.percent || 0;
}
