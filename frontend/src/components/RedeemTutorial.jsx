import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Twitch, XCircle } from 'lucide-react';

export default function RedeemTutorial({ onBack, onContinue, showCreatorCode = false, onApplyCreatorCode, social = {} }) {
	const [creatorCode, setCreatorCode] = useState('');
	const [creatorCodeStatus, setCreatorCodeStatus] = useState(null);
	const [appliedCreatorCode, setAppliedCreatorCode] = useState('');
	const applyCreatorCode = (event) => {
		event.preventDefault();
		const applied = onApplyCreatorCode(creatorCode);
		setCreatorCodeStatus(applied ? 'success' : 'error');
		if (applied) setAppliedCreatorCode(creatorCode.trim().toUpperCase());
	};

	return <section className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#15131f] p-6">
		{showCreatorCode && <form onSubmit={applyCreatorCode} className="relative mb-6">
			<label htmlFor="creator-code" className="mb-2 block text-sm font-bold text-white">Cupón de descuento</label>
			<div className="flex gap-2">
				<input id="creator-code" data-testid="creator-code-input" aria-label="Cupón de descuento" aria-invalid={creatorCodeStatus === 'error'} value={creatorCode} onChange={(event) => setCreatorCode(event.target.value)} disabled={creatorCodeStatus === 'success'} className={`min-w-0 flex-1 rounded-xl border bg-black/20 px-3 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60 ${creatorCodeStatus === 'error' ? 'coupon-error-shake border-red-400 ring-2 ring-red-400/30' : 'border-white/15'}`} />
				<button type="submit" data-testid="creator-code-apply" disabled={creatorCodeStatus === 'success'} className="rounded-xl bg-cyan-400 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">Aplicar</button>
			</div>
			{creatorCodeStatus === 'success' && <>
				<div className="creator-code-celebration" aria-hidden="true"><span>🎃</span><span>🎃</span><span>✨</span><span>🎃</span></div>
				<div role="status" className="coupon-success mt-3 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-emerald-200">
					<p className="flex items-center gap-2 font-black"><CheckCircle2 className="h-5 w-5" />¡Cupón aplicado!</p>
					<p className="mt-1 text-sm">{appliedCreatorCode} aplicado: añade un 10% de descuento en productos elegibles.</p>
					<p className="mt-2 text-xs text-emerald-100/80">Este cupón solo aplica en artículos de <strong>Vía regalo</strong> y <strong>Club de Fortnite</strong>.</p>
				</div>
			</>}
			{creatorCodeStatus === 'error' && <p role="alert" className="coupon-error-shake mt-2 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200"><XCircle className="h-5 w-5 shrink-0" />Cupón no válido. Verifica el código e inténtalo otra vez.</p>}
			<div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
				<p className="text-sm font-bold text-white">¿Dónde consigo cupones de descuento?</p>
				<p className="mt-1 text-xs leading-relaxed text-slate-300">En los streams de Twitch se regalan cupones a los seguidores, o también en nuestro Discord.</p>
				<div className="mt-3 flex flex-wrap gap-2">
					<a href="https://www.twitch.tv/kristalyz08" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-purple-500"><Twitch className="h-4 w-4" />Twitch</a>
					<a href={social.discord || 'https://discord.gg/We2N7EADfY'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-indigo-500"><img src="https://static.vecteezy.com/system/resources/thumbnails/023/741/066/small/discord-logo-icon-social-media-icon-free-png.png" alt="" className="h-4 w-4 object-contain" />Discord</a>
				</div>
			</div>
		</form>}
		<div className="flex justify-between gap-3"><button type="button" onClick={onBack} className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-slate-200"><ArrowLeft className="h-4 w-4" />Atrás</button><button type="button" onClick={onContinue} className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950">Datos <ArrowRight className="h-4 w-4" /></button></div>
	</section>;
}
