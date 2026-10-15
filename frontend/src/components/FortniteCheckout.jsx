import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ImagePlus, Twitch, XCircle } from 'lucide-react';
import { formatFortniteMoney } from '../lib/fortnite-pricing';
import PaymentMethodDialog from './PaymentMethodDialog';

const VBUCKS_ACCOUNTS = ['gatozz1', 'gatozz2', 'gatozz3', 'gatozz4', 'gatozz5'];

export default function FortniteCheckout({
  country,
  social = {},
  hasTestProducts,
  subtotal,
  total,
  creatorDiscountAmount,
  initialForm,
  initialPayment,
  showVbucksAccounts,
  creatorCodeAvailable,
  creatorCodeApplied,
  appliedCreatorCode,
  onApplyCreatorCode,
  onBack,
  onContinue
}) {
  const [form, setForm] = useState({
    epicId: initialForm?.epicId || '',
    vbucksAccounts: initialForm?.vbucksAccounts || []
  });
  const [paymentMethod, setPaymentMethod] = useState(initialPayment?.paymentMethodId || '');
  const [voucher, setVoucher] = useState(initialPayment?.voucher || null);
  const [creatorCode, setCreatorCode] = useState(creatorCodeApplied ? appliedCreatorCode : '');
  const [creatorCodeStatus, setCreatorCodeStatus] = useState(creatorCodeApplied ? 'success' : null);
  const [modalMethod, setModalMethod] = useState(null);
  const [error, setError] = useState('');
  const methods = window.KTX_STORE_CONFIG?.paymentMethods?.[country.code] || [];
  const toggleAccount = (account) => {
    setForm((current) => ({
      ...current,
      vbucksAccounts: current.vbucksAccounts.includes(account)
        ? current.vbucksAccounts.filter((selected) => selected !== account)
        : [...current.vbucksAccounts, account]
    }));
  };

  const applyCode = (event) => {
    event.preventDefault();
    const applied = onApplyCreatorCode(creatorCode);
    setCreatorCodeStatus(applied ? 'success' : 'error');
    if (!applied) setError('');
  };

  const upload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('El comprobante debe ser JPG, PNG o WEBP.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('El comprobante no puede superar 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setVoucher({ name: file.name, dataUrl: reader.result });
    reader.onerror = () => setError('No se pudo leer el comprobante. Intenta de nuevo.');
    reader.readAsDataURL(file);
    setError('');
  };

  const completeOrder = (skipVoucher = false) => {
    if (!form.epicId.trim()) return setError('Escribe el usuario de Fortnite (Epic ID).');
    if (!paymentMethod) return setError('Selecciona un método de pago.');
    if (!voucher && !skipVoucher) return setError('Sube tu comprobante para continuar.');
    if (hasTestProducts) {
      return setError('Este producto es de prueba: no permite un pago real.');
    }
    const selectedMethod = methods.find((method) => method.id === paymentMethod);
    if (!selectedMethod) return setError('El método de pago seleccionado no está disponible para este país.');
    const submittedForm = showVbucksAccounts ? form : { ...form, vbucksAccounts: [] };
    onContinue(
      { ...submittedForm, epicId: form.epicId.trim() },
      { paymentMethod: selectedMethod.name, paymentMethodId: selectedMethod.id, voucher: skipVoucher ? null : voucher }
    );
  };

  const submit = (event) => {
    event.preventDefault();
    completeOrder();
  };

  return <>
    <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-white/10 bg-[#15131f] p-6">
      <section aria-labelledby="fortnite-checkout-total">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Resumen de compra</p>
        <h2 id="fortnite-checkout-total" className="mt-2 text-2xl font-bold text-white">Total a pagar</h2>
        {creatorCodeApplied && <p className="mt-2 text-sm text-slate-400">Subtotal: {formatFortniteMoney(subtotal, country.currency)}</p>}
        <p data-testid="fortnite-checkout-total-value" className="mt-2 text-3xl font-black text-cyan-300">{formatFortniteMoney(total, country.currency)}</p>
        {creatorCodeApplied && <div role="status" className="coupon-success mt-3 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-200">
          <p className="flex items-center gap-2 text-base font-black"><CheckCircle2 className="h-5 w-5 shrink-0" />¡Cupón aplicado!</p>
          <p className="mt-1 text-sm">{appliedCreatorCode} aplicado: ahorras <strong>{formatFortniteMoney(creatorDiscountAmount, country.currency)}</strong> (10%).</p>
          <p className="mt-2 text-xs text-emerald-100/80">Este cupón solo aplica en artículos de <strong>Vía regalo</strong> y <strong>Club de Fortnite</strong>.</p>
        </div>}
      </section>

      {creatorCodeAvailable && <section aria-labelledby="fortnite-checkout-code" className="border-t border-white/10 pt-5">
        <h3 id="fortnite-checkout-code" className="font-bold text-white">Cupón de descuento</h3>
        <div className="mt-3 flex gap-2">
          <input
            data-testid="creator-code-input"
            aria-label="Cupón de descuento"
            value={creatorCode}
            onChange={(event) => { setCreatorCode(event.target.value); setCreatorCodeStatus(null); }}
            disabled={creatorCodeApplied}
            aria-invalid={creatorCodeStatus === 'error'}
            className={`min-w-0 flex-1 rounded-xl border bg-black/20 px-3 py-2 text-white disabled:opacity-60 ${creatorCodeStatus === 'error' ? 'coupon-error-shake border-red-400 ring-2 ring-red-400/30' : 'border-white/15'}`}
          />
          <button type="button" data-testid="creator-code-apply" onClick={applyCode} disabled={creatorCodeApplied} className="rounded-xl bg-cyan-400 px-4 py-2 font-bold text-slate-950 disabled:opacity-60">Aplicar</button>
        </div>
        {creatorCodeStatus === 'error' && <p role="alert" className="mt-2 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200"><XCircle className="h-5 w-5 shrink-0" />Cupón no válido. Verifica el código e inténtalo otra vez.</p>}
        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm font-bold text-white">¿Dónde consigo cupones de descuento?</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">En los streams de Twitch se regalan cupones a los seguidores, o también en nuestro Discord.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="https://www.twitch.tv/kristalyz08" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-purple-500"><Twitch className="h-4 w-4" />Twitch</a>
            <a href={social.discord || 'https://discord.gg/We2N7EADfY'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-indigo-500"><img src="https://static.vecteezy.com/system/resources/thumbnails/023/741/066/small/discord-logo-icon-social-media-icon-free-png.png" alt="" className="h-4 w-4 object-contain" />Discord</a>
          </div>
        </div>
      </section>}

      <fieldset className="border-t border-white/10 pt-5">
        <legend className="font-bold text-white">Método de pago</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {methods.map((method) => <button
            key={method.id}
            type="button"
            data-testid={`checkout-payment-${method.id}`}
            aria-pressed={paymentMethod === method.id}
            onClick={() => { setPaymentMethod(method.id); setModalMethod(method); }}
            className="flex items-center gap-3 rounded-xl border border-white/15 p-4 text-left font-semibold shadow-sm transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            style={country.code === 'PE' && method.brandColor ? { backgroundColor: method.brandColor, color: method.textColor || '#FFFFFF', borderColor: method.brandColor } : undefined}
          >{country.code === 'PE' && method.iconUrl
            ? <img src={method.iconUrl} alt="" className="h-10 w-10 rounded-lg bg-white p-1 object-contain" />
            : method.icon && <span className="mr-1">{method.icon}</span>}{method.name}</button>)}
          {methods.length === 0 && <p className="text-sm text-slate-400">No hay métodos de pago disponibles para este país.</p>}
        </div>
      </fieldset>

      {showVbucksAccounts && <section aria-labelledby="vbucks-accounts-title" className="border-t border-white/10 pt-5">
        <h3 id="vbucks-accounts-title" className="font-bold text-white">Cuentas de V-Bucks agregadas</h3>
        <p className="mt-1 text-sm text-slate-400">Selecciona las cuentas de V-Bucks que tienes agregadas</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {VBUCKS_ACCOUNTS.map((account) => {
            const selected = form.vbucksAccounts.includes(account);
            return <button
              key={account}
              type="button"
              data-testid={`vbucks-account-${account}`}
              aria-pressed={selected}
              onClick={() => toggleAccount(account)}
              className={`rounded-xl border px-4 py-2 font-semibold transition ${selected ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200' : 'border-white/15 bg-black/20 text-slate-200'}`}
            >{account}</button>;
          })}
        </div>
      </section>}

      <label className="block border-t border-white/10 pt-5 text-sm font-bold text-white">
        ¿A qué usuario de Fortnite enviamos los artículos?
        <input
          required
          data-testid="fortnite-epic-id"
          value={form.epicId}
          onChange={(event) => setForm((current) => ({ ...current, epicId: event.target.value }))}
          autoComplete="username"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white"
        />
      </label>

      <label className="block border-t border-white/10 pt-5 text-sm font-bold text-white">Comprobante JPG, PNG o WEBP (máx. 2 MB)
        <span className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-pink-400/50 p-4 text-slate-300">
          <ImagePlus className="h-5 w-5 text-pink-300" />
          <input data-testid="voucher-upload" type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} className="sr-only" />
          {voucher ? voucher.name : 'Seleccionar imagen'}
        </span>
      </label>
      <button type="button" data-testid="continue-without-voucher" onClick={() => completeOrder(true)} disabled={hasTestProducts} className="w-full rounded-xl border border-white/15 px-4 py-3 font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50">Aún no realicé el pago</button>

      {error && <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
      <div className="flex justify-between gap-3 border-t border-white/10 pt-5">
        <button type="button" onClick={onBack} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-slate-200"><ArrowLeft className="h-4 w-4" />Atrás</button>
        <button type="submit" disabled={hasTestProducts} className="rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">Generar pedido</button>
      </div>
    </form>

    <PaymentMethodDialog method={modalMethod} onClose={() => setModalMethod(null)} countryCode={country.code} cartTotal={total} currency={country.currency} />
  </>;
}
