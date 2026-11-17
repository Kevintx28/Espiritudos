import { getDiscountCoupon, getDiscountCouponPercent, normalizeDiscountCoupon } from './discount-coupons';

describe('discount coupons', () => {
  it('keeps existing coupon percentages and adds the new coupons', () => {
    expect(getDiscountCouponPercent('OMARS4')).toBe(10);
    expect(getDiscountCouponPercent('KRIS08')).toBe(10);
    expect(getDiscountCouponPercent('TAYLER')).toBe(10);
    expect(getDiscountCouponPercent('LUCASPRO')).toBe(10);
    expect(getDiscountCouponPercent('TOKEN')).toBe(8);
    expect(getDiscountCouponPercent('HOLAHOLAPASAPASA')).toBe(5);
    expect(getDiscountCouponPercent('67')).toBe(6.7);
  });

  it('normalizes coupon names without changing existing behavior', () => {
    expect(normalizeDiscountCoupon('  tayler  ')).toBe('TAYLER');
    expect(getDiscountCoupon('lucaspro')).toEqual({ code: 'LUCASPRO', percent: 10 });
    expect(getDiscountCoupon('Token')).toEqual({ code: 'TOKEN', percent: 8 });
    expect(getDiscountCoupon('holaholapasapasa')).toEqual({ code: 'HOLAHOLAPASAPASA', percent: 5 });
    expect(getDiscountCoupon('67')).toEqual({ code: '67', percent: 6.7 });
  });

  it('rejects unknown coupons', () => {
    expect(getDiscountCoupon('INVALID')).toBeNull();
  });
});
