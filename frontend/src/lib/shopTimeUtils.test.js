import { formatCompactCountdown, formatCountdown, getFortniteItemCountdown, getFortniteShopCycleKey, getNextFortniteShopReset, getTimeRemaining } from './shopTimeUtils';

describe('Fortnite Lima shop clock', () => {
  it('calculates the next reset at 7:01 PM in Lima', () => {
    const beforeReset = new Date('2026-09-09T23:59:00.000Z');
    const reset = getNextFortniteShopReset(beforeReset);
    expect(reset.toISOString()).toBe('2026-09-10T00:01:00.000Z');
    expect(formatCountdown(getTimeRemaining(reset, beforeReset))).toBe('00 : 02 : 00');
  });

  it('schedules the next day after the 7:01 PM reset has passed', () => {
    const afterReset = new Date('2026-09-10T00:02:00.000Z');
    expect(getNextFortniteShopReset(afterReset).toISOString()).toBe('2026-09-11T00:01:00.000Z');
  });

  it('uses a real item end date before falling back to the shop reset', () => {
    const now = new Date('2026-09-09T18:00:00.000Z');
    const item = getFortniteItemCountdown({ endDate: '2026-09-10T18:00:00.000Z' }, now, getNextFortniteShopReset(now));
    const fallback = getFortniteItemCountdown({}, now, getNextFortniteShopReset(now));
    expect(item.hasIndividualEnd).toBe(true);
    expect(item.remaining.days).toBe(1);
    expect(fallback.hasIndividualEnd).toBe(false);
    expect(fallback.remaining.hours).toBe(6);
  });

  it('formats compact card countdowns without unnecessary zero units', () => {
    expect(formatCompactCountdown({ days: 3, hours: 5, minutes: 20 })).toBe('3d 5h');
    expect(formatCompactCountdown({ days: 0, hours: 4, minutes: 35 })).toBe('4h 35m');
    expect(formatCompactCountdown({ days: 0, hours: 0, minutes: 35 })).toBe('35m');
  });

  it('changes the daily deal cycle at 7:01 PM in Lima', () => {
    expect(getFortniteShopCycleKey(new Date('2026-11-25T23:59:59.000Z'))).toBe('2026-11-24');
    expect(getFortniteShopCycleKey(new Date('2026-11-26T00:00:59.000Z'))).toBe('2026-11-24');
    expect(getFortniteShopCycleKey(new Date('2026-11-26T00:01:00.000Z'))).toBe('2026-11-25');
  });
});
