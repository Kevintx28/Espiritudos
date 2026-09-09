import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Globe } from 'lucide-react';
import GameNavigation from './components/GameNavigation';
import StoreCatalog from './components/StoreCatalog';
import GameCart from './components/GameCart';
import RedeemTutorial from './components/RedeemTutorial';
import DynamicOrderForm from './components/DynamicOrderForm';
import PaymentVoucher from './components/PaymentVoucher';
import OrderReceiptGenerator from './components/OrderReceiptGenerator';
import OrderCompletion from './components/OrderCompletion';
import FloatingCart from './components/FloatingCart';
import CartDrawer from './components/CartDrawer';
import { calculateCartTotals } from './lib/cart-calculations';

const keys = { country: 'ktxstore:selectedCountry', carts: 'ktxstore:cartByGame', draft: 'ktxstore:checkoutDraft', pending: 'ktxstore:pendingOrder' };
const config = () => window.KTX_STORE_CONFIG || { identity: { name: 'KTXStore', tagline: '' }, games: [], products: [], countries: [] };
const read = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* La sesión sigue funcionando sin persistencia. */ } };
const remove = (key) => { try { localStorage.removeItem(key); } catch { /* La sesión sigue funcionando sin persistencia. */ } };
const countryByCode = (code) => config().countries.find((country) => country.code === code);
const orderCode = () => `KTX-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

function App() {
  const store = config();
  const [country, setCountry] = useState(() => countryByCode(read(keys.country, 'PE')) || store.countries[0]);
  const [gameId, setGameId] = useState('roblox');
  const [carts, setCarts] = useState(() => read(keys.carts, {}));
  const [step, setStep] = useState('catalog');
  const [form, setForm] = useState(() => read(keys.draft, null)?.form || null);
  const [payment, setPayment] = useState(() => read(keys.draft, null)?.payment || null);
  const [order, setOrder] = useState(() => read(keys.pending, null));
  const [imageUrl, setImageUrl] = useState(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const game = store.games.find((item) => item.id === gameId) || store.games[0];
  const items = useMemo(() => carts[gameId] || [], [carts, gameId]);
  const products = store.products.filter((product) => product.gameId === gameId);
  const calculations = useMemo(() => calculateCartTotals(items), [items]);
  const { totalMoney: total, totalUnits: itemCount } = calculations;

  useEffect(() => { write(keys.carts, carts); }, [carts]);
  useEffect(() => { if (order) write(keys.pending, order); }, [order]);

  const selectCountry = (next) => { setCountry(next); write(keys.country, next.code); setCountryOpen(false); };
  const addProduct = (product) => setCarts((current) => { const existing = current[gameId] || []; const found = existing.find((item) => item.product.id === product.id); return { ...current, [gameId]: found ? existing.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...existing, { product, quantity: 1 }] }; });
  const changeQuantity = (product, quantity) => setCarts((current) => ({ ...current, [gameId]: quantity > 0 ? (current[gameId] || []).map((item) => item.product.id === product.id ? { ...item, quantity } : item) : (current[gameId] || []).filter((item) => item.product.id !== product.id) }));
  const clearCart = () => setCarts((current) => ({ ...current, [gameId]: [] }));
  const saveDraft = (nextForm, nextPayment) => write(keys.draft, { gameId, form: nextForm, payment: nextPayment });
  const finish = () => { setCarts((current) => ({ ...current, [gameId]: [] })); remove(keys.pending); remove(keys.draft); setOrder(null); setForm(null); setPayment(null); setImageUrl(null); setStep('catalog'); };
  const makeOrder = (nextPayment) => { const nextOrder = { id: orderCode(), date: new Date().toLocaleString('es-PE'), country, game, items, calculations, total, form, paymentMethod: nextPayment.paymentMethod, testOnly: items.some(({ product }) => product.testOnly) }; setPayment(nextPayment); setOrder(nextOrder); saveDraft(form, nextPayment); setStep('receipt'); };
  const continueCheckout = () => { setCartOpen(false); setStep('tutorial'); };
  const steps = ['Catálogo', 'Carrito', 'Instrucciones', 'Datos', 'Pago', 'Comprobante'];
  const stepIds = ['catalog', 'cart', 'tutorial', 'form', 'payment', 'receipt'];

  return <div className="App min-h-screen text-slate-100">
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#09090b]/90 px-4 py-4 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl flex-col gap-4"><div className="flex items-center justify-between gap-4"><div><div className="text-2xl font-black tracking-tight text-gradient">{store.identity.name}</div><p className="text-xs text-slate-400">{store.identity.tagline}</p></div><button type="button" onClick={() => setCountryOpen(true)} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200"><Globe className="h-4 w-4 text-cyan-300" />{country?.flag} {country?.name}</button></div><GameNavigation games={store.games} activeGame={gameId} onSelect={(next) => { setGameId(next); setStep('catalog'); setCartOpen(false); }} /><div className="flex gap-2 overflow-x-auto text-xs text-slate-500">{steps.map((label, index) => <span key={label} className={step === stepIds[index] ? 'font-bold text-cyan-300' : ''}>{index + 1}. {label}</span>)}</div></div></header>
    <main className={`mx-auto max-w-7xl px-4 py-8 ${itemCount ? 'pb-28 sm:pb-8' : ''}`}>
      {step === 'catalog' && <><section className="mb-8 max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-pink-300">Gaming store / entrega clara</p><h1 className="text-4xl font-black text-white md:text-6xl">Compra para jugar. <span className="text-gradient">Sin credenciales.</span></h1><p className="mt-4 text-slate-400">Códigos, recargas y coordinación manual. Validamos cada pedido antes de entregarlo.</p></section><div className="grid gap-8 lg:grid-cols-[1fr_340px]"><StoreCatalog game={game} products={products} onAdd={addProduct} /><GameCart items={items} calculations={calculations} onChange={changeQuantity} onClear={clearCart} onContinue={continueCheckout} /></div></>}
      {step === 'tutorial' && <RedeemTutorial game={game} onBack={() => setStep('catalog')} onContinue={() => setStep('form')} />}
      {step === 'form' && <DynamicOrderForm game={game} initialValue={form} onBack={() => setStep('tutorial')} onContinue={(next) => { setForm(next); saveDraft(next, payment); setStep('payment'); }} />}
      {step === 'payment' && <PaymentVoucher country={country} game={game} items={items} form={form} initialValue={payment} onBack={() => setStep('form')} onContinue={makeOrder} />}
      {step === 'receipt' && order && <><OrderReceiptGenerator order={order} onGenerated={setImageUrl} /><div className="mx-auto max-w-2xl"><p className="mb-4 text-center text-sm text-slate-400">Generando comprobante local...</p>{imageUrl && <OrderCompletion order={order} imageUrl={imageUrl} onFinish={finish} />}</div></>}
      {step === 'cart' && <GameCart items={items} calculations={calculations} onChange={changeQuantity} onClear={clearCart} onContinue={continueCheckout} />}
    </main>
    {itemCount > 0 && <FloatingCart calculations={calculations} onOpen={() => setCartOpen(true)} />}
    {cartOpen && <CartDrawer items={items} calculations={calculations} onChange={changeQuantity} onClear={clearCart} onContinue={continueCheckout} onClose={() => setCartOpen(false)} />}
    {countryOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"><div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#15131f] p-6"><h2 className="text-2xl font-bold text-white">Selecciona tu país</h2><p className="mt-2 text-sm text-slate-400">Los precios se muestran en PEN/S/. Para otros países de LatAm, consulta métodos disponibles por WhatsApp.</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{store.countries.map((item) => <button key={item.code} type="button" data-testid={`country-${item.code}`} onClick={() => selectCountry(item)} className={`rounded-xl border p-4 text-left ${country?.code === item.code ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10'}`}><span className="text-2xl">{item.flag}</span><span className="mt-2 block text-sm font-bold text-white">{item.name}</span></button>)}</div><button type="button" onClick={() => setCountryOpen(false)} className="mt-5 text-sm text-slate-400 underline">Cerrar</button></div></div>}
  </div>;
}

export default App;
