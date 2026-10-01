import React, { useEffect } from 'react';
import './HalloweenEffects.css';

const HALLOWEEN_START = new Date('2026-10-01T00:00:00-05:00').getTime();
const HALLOWEEN_END = new Date('2026-11-01T00:00:00-05:00').getTime();

export default function HalloweenEffects() {
  useEffect(() => {
    const updateSeason = () => {
      const now = Date.now();
      document.documentElement.classList.toggle('ktx-halloween-active', now >= HALLOWEEN_START && now < HALLOWEEN_END);
    };
    updateSeason();
    const intervalId = window.setInterval(updateSeason, 60000);
    return () => {
      window.clearInterval(intervalId);
      document.documentElement.classList.remove('ktx-halloween-active');
    };
  }, []);

  return <div className="ktx-halloween-effects" aria-hidden="true">
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--one">🎃</span>
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--two">🎃</span>
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--three">🎃</span>
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--four">🎃</span>
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--five">🎃</span>
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--six">🎃</span>
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--seven">🎃</span>
    <span className="ktx-halloween-pumpkin ktx-halloween-pumpkin--eight">🎃</span>
    <span className="ktx-halloween-web ktx-halloween-web--left" />
    <span className="ktx-halloween-web ktx-halloween-web--right" />
  </div>;
}