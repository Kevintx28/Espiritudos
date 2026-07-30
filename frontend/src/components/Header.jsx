import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Header = ({ currentStep, country }) => {
  const config = window.APP_CONFIG || {};
  // Mapea el paso real de la app al índice mostrado en el stepper (1..5)
  const stepMap = { 1: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
  const displayStep = stepMap[currentStep] || 0;
  const steps = [
    { display: 1, name: 'Catálogo' },
    { display: 2, name: 'Resumen' },
    { display: 3, name: 'Datos' },
    { display: 4, name: 'Confirmación' },
    { display: 5, name: 'Imagen' }
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
                <React.Fragment key={step.display}>
                  <div
                    data-testid={`step-${step.display}`}
                    className={`step-node flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      displayStep >= step.display
                        ? 'bg-purple-500/20 border border-purple-500 text-white'
                        : 'bg-gray-800 border border-gray-700 text-gray-500'
                    } ${displayStep === step.display ? 'active' : ''}`}
                  >
                    <span className="font-bold">{step.display}</span>
                    <span className="text-sm">{step.name}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      displayStep > step.display ? 'bg-purple-500' : 'bg-gray-700'
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