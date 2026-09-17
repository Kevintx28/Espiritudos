import React from 'react';
import { Download, MessageCircle, CheckCircle2 } from 'lucide-react';
import { calculateCartTotals, formatFulfillmentSummary } from '../lib/cart-calculations';

export default function OrderCompletion({ order, imageUrl, onFinish }) {
  const config = window.KTX_STORE_CONFIG?.social || window.APP_CONFIG?.social || {};
  const calculations = order.calculations || calculateCartTotals(order.items);
  const download = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${order.id}.png`;
    link.click();
  };
  const whatsappMessage = `Hola Bro, realicé el pedido ${order.id} por S/ ${calculations.totalMoney.toFixed(2)}. Te envío adjunta la imagen de mi pedido y comprobante para validación.`;
  const whatsappHref = `${config.whatsapp || 'https://wa.me/51968788328'}${(config.whatsapp || 'https://wa.me/51968788328').includes('?') ? '&' : '?'}text=${encodeURIComponent(whatsappMessage)}`;
  return <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#15131f] p-6 text-center">
    <CheckCircle2 className="mx-auto h-12 w-12 text-cyan-300" />
    <h2 className="mt-3 text-2xl font-bold text-white">Pedido listo para enviar</h2>
    <p className="mt-2 text-slate-400">Pendiente de verificación. Descarga la imagen y adjúntala manualmente por WhatsApp.</p>
    <div className="mx-auto mt-5 max-w-sm rounded-xl border border-white/10 bg-black/20 p-4 text-left text-sm"><p className="font-bold text-white">Resumen del pedido</p><p className="mt-2 text-slate-300">Total a recibir: <b className="text-cyan-300">{formatFulfillmentSummary(calculations)}</b></p><p className="text-slate-300">Total a pagar: <b className="text-cyan-300">S/ {calculations.totalMoney.toFixed(2)}</b></p></div>
    {imageUrl && <img src={imageUrl} alt="Comprobante visual del pedido" className="mx-auto mt-6 max-h-96 rounded-xl border border-white/10" />}
    <div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" data-testid="download-order-image" onClick={download} disabled={!imageUrl} className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 disabled:cursor-wait disabled:opacity-50"><Download className="h-4 w-4" />Descargar PNG</button><a data-testid="contact-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-bold text-white"><MessageCircle className="h-4 w-4" />Enviar por WhatsApp</a></div>
    <button type="button" onClick={onFinish} className="mt-4 text-sm text-slate-400 underline">Nuevo pedido</button>
  </section>;
}
