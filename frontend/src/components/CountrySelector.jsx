import React from 'react';
import { Globe } from 'lucide-react';

const CountrySelector = ({ selectedCountry, onCountryChange }) => {
  const countries = window.COUNTRIES || [];

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">Selecciona tu país</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {countries.map((country) => (
            <button
              key={country.code}
              data-testid={`country-${country.code}`}
              onClick={() => onCountryChange(country)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCountry?.code === country.code
                  ? 'border-purple-500 bg-purple-500/10 neon-glow'
                  : 'border-white/10 bg-black/20 hover:border-purple-500/50'
              }`}
            >
              <div className="text-4xl mb-2">{country.flag}</div>
              <div className="text-white font-semibold">{country.name}</div>
              <div className="text-sm text-slate-400 mt-1">
                {country.symbol}{country.pricePerSpirit.toFixed(2)} / Spirit
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;