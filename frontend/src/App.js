import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CountrySelector from './components/CountrySelector';
import SpiritsCatalog from './components/SpiritsCatalog';
import CartSummary from './components/CartSummary';
import UserForm from './components/UserForm';
import OrderConfirmation from './components/OrderConfirmation';
import ImageGenerator from './components/ImageGenerator';
import NextSteps from './components/NextSteps';
import ThankYou from './components/ThankYou';
import ReviewsSection from './components/ReviewsSection';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedSpirits, setSelectedSpirits] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  // Auto-detectar país al cargar
  useEffect(() => {
    detectCountry();
  }, []);

  const detectCountry = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || navigator.userLanguage;
    const defaultCode = window.APP_CONFIG?.defaultCountry || 'PE';
    
    let countryCode = null;
    
    // Detectar por zona horaria (más confiable)
    if (timezone.includes('America/Lima')) countryCode = 'PE';
    else if (timezone.includes('America/Argentina')) countryCode = 'AR';
    else if (timezone.includes('America/Mexico_City')) countryCode = 'MX';
    else if (timezone.includes('Europe/Madrid')) countryCode = 'ES';
    else if (timezone.includes('America/Santiago')) countryCode = 'CL';
    else if (timezone.includes('America/New_York') || timezone.includes('America/Los_Angeles') || timezone.includes('America/Chicago')) countryCode = 'US';
    // Solo detectar por idioma si es español específico
    else if (language.startsWith('es-PE')) countryCode = 'PE';
    else if (language.startsWith('es-AR')) countryCode = 'AR';
    else if (language.startsWith('es-MX')) countryCode = 'MX';
    else if (language.startsWith('es-ES')) countryCode = 'ES';
    else if (language.startsWith('es-CL')) countryCode = 'CL';

    // Si no se detectó nada, usar el default de config
    if (!countryCode) {
      countryCode = defaultCode;
    }

    const country = window.COUNTRIES?.find(c => c.code === countryCode);
    setSelectedCountry(country || window.COUNTRIES?.find(c => c.code === defaultCode) || window.COUNTRIES?.[0]);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const handleSpiritsSelection = (spirits) => {
    setSelectedSpirits(spirits);
    setCurrentStep(3);
  };

  const handleUpdateSpirits = (spirits) => {
    setSelectedSpirits(spirits);
  };

  const handleContinueToForm = () => {
    setCurrentStep(4);
  };

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    setCurrentStep(5);
  };

  const handleGenerateImage = () => {
    setCurrentStep(6);
  };

  const handleImageGenerated = (imageUrl) => {
    setGeneratedImage(imageUrl);
    setCurrentStep(7);
  };

  const handleFinish = () => {
    setCurrentStep(8);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setSelectedSpirits({});
    setUserInfo(null);
    setGeneratedImage(null);
  };

  if (!selectedCountry) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#09090b]">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        currentStep={currentStep}
        country={selectedCountry}
      />

      <main className="relative z-10">
        {currentStep === 1 && (
          <>
            <section className="container mx-auto px-4 py-12">
              <div className="text-center mb-12">
                {window.APP_CONFIG?.logo && (
                  <img
                    src={window.APP_CONFIG.logo}
                    alt="Espiritudos"
                    className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 rounded-full animate-pulse-glow"
                    data-testid="hero-logo"
                  />
                )}
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-gradient" style={{ fontFamily: 'Unbounded, sans-serif' }}>
                  {window.APP_CONFIG?.name || 'Espiritudos'}
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  {window.APP_CONFIG?.tagline || 'Compra los mejores Spirits de Fortnite de forma rápida y segura'}
                </p>
              </div>

              <CountrySelector 
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
              />
            </section>

            <SpiritsCatalog 
              country={selectedCountry}
              initialQuantities={selectedSpirits}
              onUpdate={handleUpdateSpirits}
              onContinue={handleSpiritsSelection}
            />

            <ReviewsSection />
          </>
        )}

        {currentStep === 3 && (
          <CartSummary 
            selectedSpirits={selectedSpirits}
            country={selectedCountry}
            onBack={() => setCurrentStep(1)}
            onContinue={handleContinueToForm}
          />
        )}

        {currentStep === 4 && (
          <UserForm 
            country={selectedCountry}
            onBack={() => setCurrentStep(3)}
            onSubmit={handleUserInfoSubmit}
          />
        )}

        {currentStep === 5 && (
          <OrderConfirmation 
            selectedSpirits={selectedSpirits}
            userInfo={userInfo}
            country={selectedCountry}
            onBack={() => setCurrentStep(4)}
            onGenerateImage={handleGenerateImage}
          />
        )}

        {currentStep === 6 && (
          <ImageGenerator 
            selectedSpirits={selectedSpirits}
            userInfo={userInfo}
            country={selectedCountry}
            onImageGenerated={handleImageGenerated}
          />
        )}

        {currentStep === 7 && (
          <NextSteps 
            imageUrl={generatedImage}
            country={selectedCountry}
            onFinish={handleFinish}
          />
        )}

        {currentStep === 8 && (
          <ThankYou onStartOver={handleStartOver} />
        )}
      </main>
    </div>
  );
}

export default App;
