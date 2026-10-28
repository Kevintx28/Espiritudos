import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { formatFortniteMoney } from '../lib/fortnite-pricing';

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Fall back to the legacy clipboard API when browser permissions block clipboard access.
    }
  }

  const input = document.createElement('textarea');
  input.value = value;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }
  input.remove();
  return copied;
}

export default function PaymentMethodDialog({ method, onClose, countryCode, cartTotal = 0, currency = 'PEN' }) {
  const [enlarged, setEnlarged] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [qrError, setQrError] = useState(false);
  const details = method?.paymentDetails;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (enlarged) setEnlarged(false);
        else onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enlarged, onClose]);

  if (!method) return null;
  const copyField = async (label, value) => {
    const copied = await copyText(value);
    setCopyStatus(copied ? `${label} copiado.` : `No se pudo copiar ${label.toLowerCase()}.`);
  };

  if (countryCode !== 'PE') {
    if (!details) {
      return <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
        <section role="dialog" aria-modal="true" aria-labelledby="payment-method-dialog-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#15131f] p-6" onClick={(event) => event.stopPropagation()}>
          <h2 id="payment-method-dialog-title" className="text-xl font-bold text-white">Pago con {method.name}</h2>
          <p className="mt-3 text-sm text-slate-300">Los datos de pago de este método se añadirán en la siguiente actualización.</p>
          <button type="button" autoFocus onClick={onClose} className="mt-5 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950">Entendido</button>
        </section>
      </div>;
    }

    return <>
      <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
        <section role="dialog" aria-modal="true" aria-labelledby="payment-method-dialog-title" className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#15131f] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <button type="button" aria-label="Cerrar modal de pago" onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
          <div className="flex items-center gap-3 pr-10">
            {method.iconUrl && <img src={method.iconUrl} alt="" className="h-11 w-11 rounded-lg bg-white p-1 object-contain" />}
            <h2 id="payment-method-dialog-title" className="text-xl font-bold text-white">Pago con {method.name}</h2>
          </div>
          <div className="mt-5 space-y-3">
            {(details.fields || []).map(({ label, value }) => <div key={label} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="min-w-0"><p className="text-xs text-slate-400">{label}</p><p className="break-all font-semibold text-white">{value}</p></div>
              <button type="button" onClick={() => copyField(label, value)} className="shrink-0 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950">Copiar</button>
            </div>)}
            {details.instructions && <p className="text-sm text-slate-300">{details.instructions}</p>}
            {details.qrPlaceholder && <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-white/20 bg-black/20 text-sm text-slate-400">{details.qrPlaceholder}</div>}
            {details.qr && <div className="text-center">
              {qrError
                ? <p role="alert" className="rounded-xl border border-red-400/30 p-4 text-sm text-red-200">No se pudo cargar el QR. Comprueba tu conexión e inténtalo de nuevo.</p>
                : <button type="button" aria-label={`Ampliar QR de ${method.name}`} onClick={() => setEnlarged(true)} className="group inline-flex rounded-xl border border-white/10 bg-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                  <img src={details.qr} alt={`QR de pago de ${method.name}. Haz clic para ampliar.`} onError={() => setQrError(true)} className="h-56 w-56 object-contain transition group-hover:scale-[1.02]" />
                </button>}
              {!qrError && <p className="mt-2 text-xs text-slate-400">Haz clic en el QR para ampliarlo</p>}
            </div>}
            {details.link && <a href={details.link} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-bold text-slate-950">{details.linkLabel || 'Abrir enlace de pago'}</a>}
            {copyStatus && <p role="status" aria-live="polite" className="text-sm text-emerald-300">{copyStatus}</p>}
          </div>
          <button type="button" autoFocus onClick={onClose} className="mt-5 w-full rounded-xl border border-white/15 px-4 py-3 font-semibold text-slate-200 hover:border-cyan-400/60">Cerrar</button>
        </section>
      </div>
      {enlarged && details.qr && <div role="presentation" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={() => setEnlarged(false)}>
        <div role="dialog" aria-modal="true" aria-label={`QR ampliado de ${method.name}`} className="relative max-h-[95vh] max-w-[95vw]" onClick={(event) => event.stopPropagation()}>
          <button type="button" aria-label="Cerrar QR ampliado" onClick={() => setEnlarged(false)} className="absolute -right-3 -top-3 z-10 rounded-full bg-[#15131f] p-2 text-white"><X className="h-5 w-5" /></button>
          <img src={details.qr} alt={`QR ampliado de pago de ${method.name}`} className="max-h-[90vh] max-w-[90vw] rounded-xl bg-white object-contain p-2" />
        </div>
      </div>}
    </>;
  }
  if (!details) {
    return <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="payment-method-dialog-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#15131f] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <h2 id="payment-method-dialog-title" className="text-xl font-bold text-white">Pago con {method.name}</h2>
        <p className="mt-3 text-sm text-slate-300">Los datos de pago de este método se añadirán en la siguiente actualización.</p>
        <button type="button" autoFocus onClick={onClose} className="mt-5 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950">Entendido</button>
      </section>
    </div>;
  }
  const fields = [
    details.number && { label: 'Número', value: details.number },
    details.lemontag && { label: '$lemontag', value: details.lemontag },
    details.user && { label: 'User', value: details.user }
  ].filter(Boolean);
  const cipMessage = [
    'Hola, acabo de solicitar un pago con Pago Efectivo.',
    `Monto a pagar: ${formatFortniteMoney(cartTotal, currency)}`,
    'Por favor envíame el código CIP. Gracias.',
    'Aqui tambien adjunto la imagen generada en la pagina con los articulos que deseo.'
  ].join('\n');
  const cipWhatsAppUrl = `https://wa.me/51968788328?text=${encodeURIComponent(cipMessage)}`;

  return <>
    <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="payment-method-dialog-title" className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-[#15131f] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" aria-label="Cerrar modal de pago" onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white"><X className="h-5 w-5" /></button>
        <div className="flex items-center gap-3 pr-10">
          {method.iconUrl && <img src={method.iconUrl} alt="" className="h-11 w-11 rounded-lg bg-white p-1 object-contain" />}
          <h2 id="payment-method-dialog-title" className="text-xl font-bold text-white">Pago con {method.name}</h2>
        </div>
        <div className="mt-5 space-y-3">
          {fields.map(({ label, value }) => <div key={label} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="min-w-0"><p className="text-xs text-slate-400">{label}</p><p className="break-all font-semibold text-white">{value}</p></div>
            <button type="button" onClick={() => copyField(label, value)} className="shrink-0 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-bold text-slate-950">Copiar</button>
          </div>)}
          {details.instructions && <p className="text-sm text-slate-300">{details.instructions}</p>}
          {details.holder && <p onCopy={(event) => event.preventDefault()} className="select-none text-sm text-slate-300" style={{ userSelect: 'none', WebkitUserSelect: 'none' }}><span className="font-semibold text-white">Titular:</span> {details.holder}</p>}
          {details.qr && <div className="text-center">
            {qrError
              ? <p role="alert" className="rounded-xl border border-red-400/30 p-4 text-sm text-red-200">No se pudo cargar el QR. Comprueba tu conexión e inténtalo de nuevo.</p>
              : <button type="button" aria-label={`Ampliar QR de ${method.name}`} onClick={() => setEnlarged(true)} className="group inline-flex rounded-xl border border-white/10 bg-white p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <img src={details.qr} alt={`QR de pago de ${method.name}. Haz clic para ampliar.`} onError={() => setQrError(true)} className="h-56 w-56 object-contain transition group-hover:scale-[1.02]" />
              </button>}
            {!qrError && <p className="mt-2 text-xs text-slate-400">Haz clic en el QR para ampliarlo</p>}
          </div>}
          {details.cip && <a data-testid="payment-cip-whatsapp" href={cipWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl bg-cyan-400 px-4 py-3 text-center font-bold text-slate-950">Solicitar código CIP por WhatsApp</a>}
          {copyStatus && <p role="status" aria-live="polite" className="text-sm text-emerald-300">{copyStatus}</p>}
        </div>
        <button type="button" autoFocus onClick={onClose} className="mt-5 w-full rounded-xl border border-white/15 px-4 py-3 font-semibold text-slate-200 hover:border-cyan-400/60">Cerrar</button>
      </section>
    </div>
    {enlarged && <div role="presentation" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={() => setEnlarged(false)}>
      <div role="dialog" aria-modal="true" aria-label={`QR ampliado de ${method.name}`} className="relative max-h-[95vh] max-w-[95vw]" onClick={(event) => event.stopPropagation()}>
        <button type="button" aria-label="Cerrar QR ampliado" onClick={() => setEnlarged(false)} className="absolute -right-3 -top-3 z-10 rounded-full bg-[#15131f] p-2 text-white"><X className="h-5 w-5" /></button>
        <img src={details.qr} alt={`QR ampliado de pago de ${method.name}`} className="max-h-[90vh] max-w-[90vw] rounded-xl bg-white object-contain p-2" />
      </div>
    </div>}
  </>;
}
