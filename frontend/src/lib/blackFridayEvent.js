import { useEffect, useState } from 'react';
import { fortniteCatalog } from '../data/fortniteCatalog';

const STARTS_AT = new Date(fortniteCatalog.blackFridayEvent.startsAt).getTime();
const ENDS_AT = new Date(fortniteCatalog.blackFridayEvent.endsAt).getTime();

export function isBlackFridayEventActive(now = new Date()) {
  const timestamp = new Date(now).getTime();
  return timestamp >= STARTS_AT && timestamp < ENDS_AT;
}

export function useBlackFridayEventActive() {
  const [active, setActive] = useState(() => isBlackFridayEventActive());

  useEffect(() => {
    const intervalId = window.setInterval(() => setActive(isBlackFridayEventActive()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return active;
}
