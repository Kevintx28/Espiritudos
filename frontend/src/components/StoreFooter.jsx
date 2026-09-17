import React from 'react';
import { Facebook, Instagram, MessageCircle, MessagesSquare } from 'lucide-react';

const links = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'discord', label: 'Discord', Icon: MessagesSquare },
  { key: 'whatsappGroup', label: 'Grupo de WhatsApp', Icon: MessageCircle }
];

export default function StoreFooter({ social = {} }) {
  return <footer className="mt-12 border-t border-white/10 bg-black/20 px-4 py-8">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
      <p>© {new Date().getFullYear()} KTXStore</p>
      <nav aria-label="Redes sociales" className="flex flex-wrap items-center justify-center gap-4">
        {links.filter(({ key }) => social[key]).map(({ key, label, Icon }) => <a key={key} href={social[key]} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-cyan-300"><Icon className="h-4 w-4" aria-hidden="true" />{label}</a>)}
      </nav>
    </div>
  </footer>;
}
