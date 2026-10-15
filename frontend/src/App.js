import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Globe } from 'lucide-react';
import HalloweenEffects from './components/HalloweenEffects';
import GameNavigation from './components/GameNavigation';
import StoreCatalog from './components/StoreCatalog';
import GameCart from './components/GameCart';
import RedeemTutorial from './components/RedeemTutorial';
import DynamicOrderForm from './components/DynamicOrderForm';
import FortniteCheckout from './components/FortniteCheckout';
import PaymentVoucher from './components/PaymentVoucher';
import OrderReceiptGenerator from './components/OrderReceiptGenerator';
import OrderCompletion from './components/OrderCompletion';
import FloatingCart from './components/FloatingCart';
import CartDrawer from './components/CartDrawer';
import ContactFloaters from './components/ContactFloaters';
import StoreFooter from './components/StoreFooter';
import { calculateCartTotals } from './lib/cart-calculations';
import { fortniteManualProducts } from './data/fortniteCatalog';
import { resolveFortniteProduct, roundFortnitePrice } from './lib/fortnite-pricing';
import StoreHome from './components/StoreHome';

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
  const [step, setStep] = useState('home');
  const [fortniteSubcategory, setFortniteSubcategory] = useState('gift-shop');
  const [form, setForm] = useState(() => read(keys.draft, null)?.form || null);
  const [payment, setPayment] = useState(() => read(keys.draft, null)?.payment || null);
  const [order, setOrder] = useState(() => read(keys.pending, null));
  const [imageUrl, setImageUrl] = useState(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [appliedCreatorCode, setAppliedCreatorCode] = useState('');
  const game = store.games.find((item) => item.id === gameId) || store.games[0];
  const items = useMemo(() => carts[gameId] || [], [carts, gameId]);
  const displayItems = useMemo(() => gameId === 'fortnite'
    ? items.map((item) => ({ ...item, product: resolveFortniteProduct(item.product, country) }))
    : items, [items, gameId, country]);
  const hasCreatorCodeItems = items.some(({ product }) => product.creatorCodeEligible === true && (
    (fortniteSubcategory === 'gift-shop' && (product.creatorCodeScope === 'gift-shop' || (!product.creatorCodeScope && product.originalVbucks !== undefined))) ||
    (fortniteSubcategory === 'account-topups' && product.creatorCodeScope === 'account-club')
  ));
  const creatorCodeAvailable = gameId === 'fortnite' && hasCreatorCodeItems;
  const creatorCodeActive = Boolean(appliedCreatorCode) && creatorCodeAvailable;
  const checkoutItems = useMemo(() => creatorCodeActive ? displayItems.map((item) => {
    const price = Number(item.product.price);
    if (!item.product.creatorCodeEligible || !Number.isFinite(price)) return item;
    return { ...item, product: { ...item.product, price: gameId === 'fortnite' ? roundFortnitePrice(price * 0.9, item.product.currency) : Number((price * 0.9).toFixed(2)) } };
  }) : displayItems, [displayItems, creatorCodeActive, gameId]);
  const products = gameId === 'fortnite'
    ? [...store.products.filter((product) => product.gameId === gameId), ...fortniteManualProducts]
    : store.products.filter((product) => product.gameId === gameId);
  const catalogProducts = gameId === 'fortnite' ? products.map((product) => resolveFortniteProduct(product, country)) : products;
  const calculations = useMemo(() => calculateCartTotals(checkoutItems), [checkoutItems]);
  const { totalMoney: total, totalUnits: itemCount } = calculations;

  useEffect(() => { write(keys.carts, carts); }, [carts]);
  useEffect(() => { if (order) write(keys.pending, order); }, [order]);

  const selectCountry = (next) => { setCountry(next); write(keys.country, next.code); setCountryOpen(false); };
  const addProduct = (product) => setCarts((current) => { const existing = current[gameId] || []; const found = existing.find((item) => item.product.id === product.id); return { ...current, [gameId]: found ? existing.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...existing, { product, quantity: 1 }] }; });
  const changeQuantity = (product, quantity) => { if (quantity <= 0 && product.creatorCodeEligible && !items.some((item) => item.product.id !== product.id && item.product.creatorCodeEligible)) setAppliedCreatorCode(''); setCarts((current) => ({ ...current, [gameId]: quantity > 0 ? (current[gameId] || []).map((item) => item.product.id === product.id ? { ...item, quantity } : item) : (current[gameId] || []).filter((item) => item.product.id !== product.id) })); };
  const clearCart = () => { setAppliedCreatorCode(''); setCarts((current) => ({ ...current, [gameId]: [] })); };
  const saveDraft = (nextForm, nextPayment) => write(keys.draft, { gameId, form: nextForm, payment: nextPayment });
  const finish = () => { setAppliedCreatorCode(''); setCarts((current) => ({ ...current, [gameId]: [] })); remove(keys.pending); remove(keys.draft); setOrder(null); setForm(null); setPayment(null); setImageUrl(null); setStep('catalog'); };
  const makeOrder = (nextPayment, nextForm = form) => { const baseCalculations = calculateCartTotals(displayItems); const nextOrder = { id: orderCode(), date: new Date().toLocaleString('es-PE'), country, game, items: displayItems, calculations: baseCalculations, total, creatorDiscountAmount: baseCalculations.totalMoney - total, form: nextForm, paymentMethod: nextPayment.paymentMethod, voucher: nextPayment.voucher, creatorCodeApplied: creatorCodeActive, creatorCode: appliedCreatorCode, testOnly: checkoutItems.some(({ product }) => product.testOnly) }; setForm(nextForm); setPayment(nextPayment); setOrder(nextOrder); saveDraft(nextForm, nextPayment); setStep('receipt'); };
  const continueCheckout = () => { setCartOpen(false); setStep(gameId === 'fortnite' ? 'fortnite-checkout' : creatorCodeAvailable ? 'tutorial' : 'form'); };
  const applyCreatorCode = (code) => { const normalizedCode = code.trim().toUpperCase(); const isValid = creatorCodeAvailable && ['KRIS08', 'OMARS4'].includes(normalizedCode); setAppliedCreatorCode(isValid ? normalizedCode : ''); return isValid; };
  const selectFortniteSubcategory = (subcategory) => { setFortniteSubcategory(subcategory); setAppliedCreatorCode(''); };
  const selectGame = (next) => { setAppliedCreatorCode(''); setGameId(next); setFortniteSubcategory('gift-shop'); setStep('catalog'); setCartOpen(false); };
  const goHome = () => { setStep('home'); setCartOpen(false); };
  const fortniteTabs = [{ id: 'passes', label: 'Pases de Fortnite' }, { id: 'account-topups', label: 'Vía cuenta' }];

  return <div className="App min-h-screen text-slate-100">
    <HalloweenEffects />
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#09090b]/90 px-4 py-4 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl flex-col gap-4"><div className="flex items-center justify-between gap-4"><div><div className="text-2xl font-black tracking-tight text-gradient">{store.identity.name}</div><p className="text-xs text-slate-400">{store.identity.tagline}</p></div><button type="button" onClick={() => setCountryOpen(true)} className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200"><Globe className="h-4 w-4 text-cyan-300" />{country?.flag} {country?.name}</button></div><GameNavigation games={store.games} activeGame={gameId} homeActive={step === 'home'} onHome={goHome} onSelect={selectGame} />{step === 'catalog' && gameId === 'fortnite' && <nav aria-label="Subcategorías de Fortnite" className="flex gap-2 overflow-x-auto pb-2"><button type="button" onClick={() => selectFortniteSubcategory('gift-shop')} className={`flex min-w-max items-center rounded-xl border px-4 py-3 text-sm font-bold transition ${fortniteSubcategory === 'gift-shop' ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200' : 'border-white/10 bg-white/5 text-slate-300 hover:border-pink-400/60'}`}>Vía regalo</button>{fortniteTabs.map((tab) => <button key={tab.id} type="button" onClick={() => selectFortniteSubcategory(tab.id)} className={`flex min-w-max items-center rounded-xl border px-4 py-3 text-sm font-bold transition ${fortniteSubcategory === tab.id ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200' : 'border-white/10 bg-white/5 text-slate-300 hover:border-pink-400/60'}`}>{tab.label}</button>)}</nav>}</div></header>
    <main className={`mx-auto max-w-7xl px-4 py-8 ${itemCount ? 'pb-28 sm:pb-8' : ''}`}>
      {step === 'home' && <StoreHome onSelect={selectGame} />}
      {step === 'catalog' && <div className={gameId === 'fortnite' ? '' : 'grid gap-8 lg:grid-cols-[1fr_340px]'}><StoreCatalog key={gameId} game={game} products={catalogProducts} country={country} fortniteSubcategory={fortniteSubcategory} onAdd={addProduct} />{gameId !== 'fortnite' && <GameCart items={items} calculations={calculations} onChange={changeQuantity} onClear={clearCart} onContinue={continueCheckout} />}</div>}
      {step === 'tutorial' && <RedeemTutorial game={game} social={store.social} showCreatorCode={creatorCodeAvailable} onApplyCreatorCode={applyCreatorCode} onBack={() => setStep('catalog')} onContinue={() => setStep('form')} />}
      {step === 'fortnite-checkout' && <FortniteCheckout country={country} social={store.social} hasTestProducts={checkoutItems.some(({ product }) => product.testOnly)} subtotal={calculateCartTotals(displayItems).totalMoney} total={calculations.totalMoney} creatorDiscountAmount={calculateCartTotals(displayItems).totalMoney - calculations.totalMoney} initialForm={form} initialPayment={payment} showVbucksAccounts={fortniteSubcategory === 'gift-shop' || fortniteSubcategory === 'passes'} creatorCodeAvailable={creatorCodeAvailable} creatorCodeApplied={creatorCodeActive} appliedCreatorCode={appliedCreatorCode} onApplyCreatorCode={applyCreatorCode} onBack={() => setStep('catalog')} onContinue={(nextForm, nextPayment) => makeOrder(nextPayment, nextForm)} />}
      {step === 'form' && <DynamicOrderForm game={game} initialValue={form} onBack={() => setStep(creatorCodeAvailable ? 'tutorial' : 'catalog')} onContinue={(next) => { setForm(next); saveDraft(next, payment); setStep('payment'); }} />}
      {step === 'payment' && <PaymentVoucher country={country} game={game} items={checkoutItems} form={form} initialValue={payment} onBack={() => setStep('form')} onContinue={makeOrder} />}
      {step === 'receipt' && order && <><OrderReceiptGenerator order={order} onGenerated={setImageUrl} /><div className="mx-auto max-w-2xl"><p className="mb-4 text-center text-sm text-slate-400">Generando comprobante local...</p>{imageUrl && <OrderCompletion order={order} imageUrl={imageUrl} onFinish={finish} />}</div></>}
      {step === 'cart' && <GameCart items={displayItems} calculations={calculations} onChange={changeQuantity} onClear={clearCart} onContinue={continueCheckout} currency={gameId === 'fortnite' ? country.currency : 'PEN'} />}
    </main>
    <StoreFooter social={store.social} />
    <ContactFloaters social={store.social} hasCart={itemCount > 0} />
    {itemCount > 0 && <FloatingCart calculations={calculations} currency={gameId === 'fortnite' ? country.currency : 'PEN'} onOpen={() => setCartOpen(true)} />}
    {cartOpen && <CartDrawer items={displayItems} calculations={calculations} currency={gameId === 'fortnite' ? country.currency : 'PEN'} creatorCodeApplied={creatorCodeActive} appliedCreatorCode={appliedCreatorCode} onChange={changeQuantity} onClear={clearCart} onContinue={continueCheckout} onClose={() => setCartOpen(false)} />}
    {countryOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"><div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#15131f] p-6"><h2 className="text-2xl font-bold text-white">Selecciona tu país</h2><p className="mt-2 text-sm text-slate-400">Los precios de Fortnite se muestran en la moneda del país seleccionado.</p><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">{store.countries.map((item) => <button key={item.code} type="button" data-testid={`country-${item.code}`} onClick={() => selectCountry(item)} className={`rounded-xl border p-4 text-left ${country?.code === item.code ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10'}`}><span className="text-2xl">{item.flag}</span><span className="mt-2 block text-sm font-bold text-white">{item.name}</span></button>)}</div><button type="button" onClick={() => setCountryOpen(false)} className="mt-5 text-sm text-slate-400 underline">Cerrar</button></div></div>}
  </div>;
}

export default App;
