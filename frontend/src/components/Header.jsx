import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Header = ({ currentStep, country, onCountryChange }) => {
  const config = window.APP_CONFIG || {};
  const steps = [
    { number: 1, name: 'Catálogo' },
    { number: 3, name: 'Resumen' },
    { number: 4, name: 'Datos' },
    { number: 5, name: 'Confirmación' },
    { number: 6, name: 'Imagen' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {config.logo ? (
              <img
                src={config.logo}
                alt={config.name || 'Espiritudos'}
                className="w-14 h-14 rounded-full object-cover neon-glow"
                data-testid="header-logo"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                {config.name || 'Espiritudos'}
              </h2>
              {country && (
                <p className="text-sm text-slate-400">
                  {country.flag} {country.name}
                </p>
              )}
            </div>
          </div>

          {currentStep <= 6 && currentStep !== 7 && currentStep !== 8 && (
            <div className="hidden md:flex items-center gap-2">
              {steps.map((step, idx) => (
                <React.Fragment key={step.number}>
                  <div
                    data-testid={`step-${step.number}`}
                    className={`step-node flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      currentStep >= step.number
                        ? 'bg-purple-500/20 border border-purple-500 text-white'
                        : 'bg-gray-800 border border-gray-700 text-gray-500'
                    } ${currentStep === step.number ? 'active' : ''}`}
                  >
                    <span className="font-bold">{step.number}</span>
                    <span className="text-sm">{step.name}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      currentStep > step.number ? 'bg-purple-500' : 'bg-gray-700'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;