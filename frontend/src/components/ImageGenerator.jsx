import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Loader2 } from 'lucide-react';

const ImageGenerator = ({ selectedSpirits, userInfo, country, onImageGenerated }) => {
  const imageRef = useRef(null);
  const spirits = window.SPIRITS || [];
  const discounts = window.APP_CONFIG?.discounts || [];
  const paymentMethods = window.PAYMENT_METHODS?.[country.code] || [];
  const config = window.APP_CONFIG || {};

  const items = Object.entries(selectedSpirits).map(([id, quantity]) => {
    const spirit = spirits.find(s => s.id === id);
    return {
      ...spirit,
      quantity,
      unitPrice: country.pricePerSpirit,
      subtotal: quantity * country.pricePerSpirit
    };
  });

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const discountConfig = discounts.find(d => totalQuantity >= d.min && totalQuantity <= d.max);
  const discountPercentage = discountConfig?.percentage || 0;
  const discountAmount = subtotal * (discountPercentage / 100);
  const total = subtotal - discountAmount;
  const paymentMethod = paymentMethods.find(m => m.id === userInfo.paymentMethod);

  useEffect(() => {
    const generateImage = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(imageRef.current, {
          backgroundColor: '#09090b',
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true
        });

        const imageUrl = canvas.toDataURL('image/png');
        onImageGenerated(imageUrl);
      } catch (error) {
        console.error('Error generando imagen:', error);
      }
    };

    generateImage();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Loader2 className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white">Generando tu Imagen...</h2>
        <p className="text-slate-400 mt-2">Por favor espera un momento</p>
      </div>

      {/* Contenedor para html2canvas - OCULTO */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <div 
          ref={imageRef} 
          style={{
            width: '1200px',
            padding: '60px',
            backgroundColor: '#09090b',
            fontFamily: 'Inter, sans-serif',
            color: '#ffffff'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            {config.logo && (
              <img
                src={config.logo}
                alt="Logo"
                crossOrigin="anonymous"
                style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover' }}
              />
            )}
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              marginBottom: '10px',
              background: 'linear-gradient(to right, #a78bfa, #ec4899, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {config.name || 'Espiritudos'}
            </h1>
            <div style={{ fontSize: '18px', color: '#94a3b8' }}>Pedido de Spirits</div>
          </div>

          {/* Información del Cliente */}
          <div style={{ 
            backgroundColor: '#18181b', 
            padding: '30px', 
            borderRadius: '20px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Datos del Cliente</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '16px' }}>
              <div>
                <div style={{ color: '#94a3b8', marginBottom: '5px' }}>Nombre:</div>
                <div style={{ fontWeight: '600' }}>{userInfo.name}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', marginBottom: '5px' }}>Epic ID:</div>
                <div style={{ fontWeight: '600' }}>{userInfo.epicId}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', marginBottom: '5px' }}>Fecha de Entrega:</div>
                <div style={{ fontWeight: '600' }}>
                  {new Date(userInfo.date).toLocaleDateString('es-ES', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', marginBottom: '5px' }}>Hora de Entrega:</div>
                <div style={{ fontWeight: '600' }}>{userInfo.time}</div>
              </div>
            </div>
          </div>

          {/* Lista de Spirits */}
          <div style={{ 
            backgroundColor: '#18181b', 
            padding: '30px', 
            borderRadius: '20px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Spirits Seleccionados</h2>
            <table style={{ width: '100%', fontSize: '16px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '10px', color: '#94a3b8' }}>Spirit</th>
                  <th style={{ textAlign: 'center', padding: '10px', color: '#94a3b8' }}>Cantidad</th>
                  <th style={{ textAlign: 'right', padding: '10px', color: '#94a3b8' }}>Precio Unit.</th>
                  <th style={{ textAlign: 'right', padding: '10px', color: '#94a3b8' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px', fontWeight: '600' }}>{item.name}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>{country.symbol}{item.unitPrice.toFixed(2)}</td>
                    <td style={{ padding: '15px', textAlign: 'right', fontWeight: '600' }}>{country.symbol}{item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totales */}
            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#94a3b8' }}>
                <span>Subtotal ({totalQuantity} spirits):</span>
                <span>{country.symbol}{subtotal.toFixed(2)}</span>
              </div>
              {discountPercentage > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#22c55e' }}>
                  <span>Descuento ({discountPercentage}%):</span>
                  <span>-{country.symbol}{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '32px', 
                fontWeight: 'bold',
                paddingTop: '15px',
                borderTop: '2px solid rgba(255,255,255,0.1)'
              }}>
                <span>TOTAL:</span>
                <span style={{ 
                  background: 'linear-gradient(to right, #a78bfa, #ec4899, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {country.symbol}{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Método de Pago */}
          <div style={{ 
            backgroundColor: '#18181b', 
            padding: '30px', 
            borderRadius: '20px',
            marginBottom: '30px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ color: '#94a3b8', marginBottom: '10px' }}>Método de Pago:</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {paymentMethod?.icon} {paymentMethod?.name}
            </div>
          </div>

          {/* Redes Sociales */}
          <div style={{ 
            backgroundColor: '#18181b', 
            padding: '30px', 
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Contáctanos</h3>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.8' }}>
              <div>Discord: {config.social?.discord || 'discord.gg/yourserver'}</div>
              <div>WhatsApp: {config.social?.whatsapp || 'wa.me/51999999999'}</div>
              <div>Facebook: {config.social?.facebook || 'facebook.com/yourpage'}</div>
              <div>Web: {config.social?.website || 'yourwebsite.com'}</div>
            </div>
          </div>

          {/* Instrucción */}
          <div style={{ 
            marginTop: '40px', 
            padding: '30px',
            backgroundColor: '#8b5cf6',
            borderRadius: '20px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Después de realizar el pago, envía esta imagen junto con tu comprobante para procesar tu pedido.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGenerator;