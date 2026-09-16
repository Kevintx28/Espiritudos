import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { calculateCartTotals, formatFulfillmentSummary } from '../lib/cart-calculations';
import { resolveFortniteImage } from './FortniteItemImage';

function productImage(product) {
  return product.gameId === 'fortnite' ? resolveFortniteImage(product) : product.image;
}

function ReceiptProductImage({ product }) {
  const image = productImage(product);
  if (!image) return <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-[#242034] p-2 text-center text-[11px] text-slate-300">{product.name}</div>;
  return <div className="relative h-20 w-20 shrink-0"><img data-receipt-image src={image} alt={product.name} crossOrigin="anonymous" loading="eager" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'flex'; }} className="h-20 w-20 rounded-lg border border-white/20 bg-[#111111] object-contain object-center" /><div className="absolute inset-0 hidden items-center justify-center rounded-lg border border-white/20 bg-[#242034] p-2 text-center text-[11px] text-slate-300">{product.name}</div></div>;
}

function waitForImages(root) {
  const images = Array.from(root.querySelectorAll('img[data-receipt-image]'));
  return Promise.all(images.map((image) => new Promise((resolve) => {
    if (image.complete) return resolve();
    image.addEventListener('load', resolve, { once: true });
    image.addEventListener('error', resolve, { once: true });
  })));
}

export default function OrderReceiptGenerator({ order, onGenerated }) {
  const ref = useRef(null);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(true);
  const calculations = order.calculations || calculateCartTotals(order.items);
  const voucher = order.voucher || order.payment?.voucher;

  useEffect(() => {
    let active = true;
    const generate = async () => {
      setGenerating(true);
      setError('');
      try {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await waitForImages(ref.current);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: '#0b0812', logging: false, useCORS: true, allowTaint: false });
        if (active) onGenerated(canvas.toDataURL('image/png'));
      } catch {
        if (active) setError('No se pudo generar la imagen local. Intenta de nuevo.');
      } finally {
        if (active) setGenerating(false);
      }
    };
    generate();
    return () => { active = false; };
  }, [onGenerated, order]);

  return <>
    {generating && <p className="mb-4 text-center text-sm text-slate-400">Generando imagen…</p>}
    {error && <p role="alert" className="text-red-200">{error}</p>}
    <div ref={ref} className="fixed -left-[9999px] top-0 w-[900px] bg-[#0b0812] p-12 font-sans text-white">
      <h1 className="text-5xl font-black text-purple-300">KTXStore</h1>
      <p className="mt-2 text-xl text-cyan-300">Pedido {order.id}</p>
      <p className="text-slate-400">{order.date} · {order.country.name}</p>
      <div className="mt-8 rounded-2xl bg-[#171222] p-6"><h2 className="text-2xl font-bold">{order.game.name}</h2>{calculations.lines.map(({ product, quantity, fulfillmentTotal, fulfillmentLabel, subtotal }) => <div key={product.id} className="mt-4 flex gap-4"><ReceiptProductImage product={product} /><div><p>{quantity} × {product.name}</p><p className="text-slate-300">{fulfillmentTotal === null ? 'Cantidad por confirmar' : `${fulfillmentTotal} ${fulfillmentLabel}`} · Subtotal: {product.price === null ? 'Precio por definir' : `S/ ${subtotal.toFixed(2)}`}</p></div></div>)}<div className="mt-6 border-t border-white/10 pt-4"><p>Unidades seleccionadas: {calculations.totalUnits}</p><p>Total a recibir: {formatFulfillmentSummary(calculations)}</p><p className="mt-2 text-3xl font-black text-cyan-300">Total a pagar: S/ {calculations.totalMoney.toFixed(2)}</p></div></div>
      <div className="mt-6 rounded-2xl bg-[#171222] p-6"><p>Nombre: {order.form.name}</p><p>Contacto: {order.form.contact}</p>{order.form.identifier && <p>Identificador: {order.form.identifier.replace(/.(?=.{3})/g, '*')}</p>}<p>Método: {order.paymentMethod}</p><p className="mt-4 font-bold text-amber-300">Estado: Pendiente de verificación</p>{order.testOnly && <p className="mt-3 font-black text-red-300">PRUEBA — NO PAGAR</p>}</div>
      <div className="mt-6 rounded-2xl bg-[#171222] p-6"><h2 className="text-2xl font-bold">Comprobante adjunto</h2>{voucher?.dataUrl ? <div className="mt-4"><img data-receipt-image src={voucher.dataUrl} alt={voucher.name || 'Comprobante adjunto'} crossOrigin="anonymous" loading="eager" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.nextElementSibling.style.display = 'flex'; }} className="max-h-[360px] max-w-full object-contain object-center" /><div className="hidden h-40 w-full items-center justify-center rounded-lg border border-white/20 bg-[#242034] text-slate-300">{voucher.name || 'Comprobante adjunto'}</div></div> : <p className="mt-4 text-slate-300">No se adjuntó comprobante.</p>}</div>
      <p className="mt-8 text-lg text-slate-300">Envía esta imagen y tu comprobante a KTXStore para procesar tu pedido.</p>
    </div>
  </>;
}
