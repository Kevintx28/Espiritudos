import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function RedeemTutorial({ onBack, onContinue, showCreatorCode = false, onApplyCreatorCode }) {
	const [creatorCode, setCreatorCode] = useState('');
	const [creatorCodeStatus, setCreatorCodeStatus] = useState(null);
	const applyCreatorCode = (event) => {
		event.preventDefault();
		setCreatorCodeStatus(onApplyCreatorCode(creatorCode) ? 'success' : 'error');
	};

	return <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#15131f] p-6">
		{showCreatorCode && <form onSubmit={applyCreatorCode} className="relative mb-6">
			<label htmlFor="creator-code" className="mb-2 block text-sm font-bold text-white">¿Tienes un código de creador?</label>
			<div className="flex gap-2">
				<input id="creator-code" data-testid="creator-code-input" value={creatorCode} onChange={(event) => setCreatorCode(event.target.value)} disabled={creatorCodeStatus === 'success'} className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60" />
				<button type="submit" data-testid="creator-code-apply" disabled={creatorCodeStatus === 'success'} className="rounded-xl bg-cyan-400 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">Aplicar</button>
			</div>
			{creatorCodeStatus === 'success' && <>
				<div className="creator-code-celebration" aria-hidden="true"><span>🎃</span><span>🎃</span><span>✨</span><span>🎃</span></div>
				<p role="status" className="mt-2 text-sm text-emerald-300">Código aplicado. KRIS08 de Chris añade un 10% adicional en artículos de Vía regalo.</p>
			</>}
			{creatorCodeStatus === 'error' && <p role="alert" className="mt-2 text-sm text-red-300">Código no válido. Verifica e inténtalo otra vez.</p>}
		</form>}
		<div className="flex justify-between gap-3"><button type="button" onClick={onBack} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-slate-200"><ArrowLeft className="h-4 w-4" />Atrás</button><button type="button" onClick={onContinue} className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950">Datos <ArrowRight className="h-4 w-4" /></button></div>
	</section>;
}
