import React from 'react';
import { Globe, X, Check } from 'lucide-react';

const CountrySelector = ({
  selectedCountry,
  onCountryChange,
  isModal = false,
  isRequired = false,
  isOpen = true,
  onConfirm,
  onClose,
  title = 'Selecciona tu país',
  description = 'Elige el país en el que quieres ver y pagar los precios.'
}) => {
  const countries = window.COUNTRIES || [];

  if (!isOpen) return null;

  const renderCountryButton = (country) => (
    <button
      key={country.code}
      type="button"
      data-testid={`country-${country.code}`}
      onClick={() => onCountryChange && onCountryChange(country)}
      className={`p-4 rounded-xl border-2 transition-all text-left ${
        selectedCountry?.code === country.code
          ? 'border-purple-500 bg-purple-500/10 neon-glow'
          : 'border-white/10 bg-black/20 hover:border-purple-500/50'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-4xl mb-2">{country.flag}</div>
          <div className="text-white font-semibold">{country.name}</div>
          <div className="text-sm text-slate-400 mt-1">
            {country.symbol}{country.pricePerSpirit.toFixed(2)} / Spirit
          </div>
        </div>
        {selectedCountry?.code === country.code && (
          <span className="inline-flex items-center justify-center rounded-full bg-purple-500 text-white w-7 h-7 mt-1">
            <Check className="w-4 h-4" />
          </span>
        )}
      </div>
    </button>
  );

  if (!isModal) {
    return (
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {countries.map(renderCountryButton)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 bg-black/70 backdrop-blur-md">
      <div className="absolute inset-0" />
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#111827]/90 shadow-2xl shadow-purple-950/30">
        {!isRequired && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-slate-300 transition hover:border-purple-500 hover:text-white"
            aria-label="Cerrar selector de moneda"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">{title}</h3>
          </div>

          <p className="mb-6 text-sm sm:text-base text-slate-300">{description}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {countries.map(renderCountryButton)}
          </div>

          <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            {!isRequired && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/10 bg-black/20 text-slate-200 font-semibold hover:border-white/20 transition"
              >
                Cancelar
              </button>
            )}
            <button
              type="button"
              onClick={onConfirm}
              disabled={!selectedCountry}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              Confirmar moneda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountrySelector;