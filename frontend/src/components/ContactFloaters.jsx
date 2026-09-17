import React from 'react';
import { MessageCircle, MessagesSquare } from 'lucide-react';

export default function ContactFloaters({ social = {}, hasCart = false }) {
  const whatsapp = social.whatsapp || 'https://wa.me/51968788328';
  const discord = social.discord || 'https://discord.gg/We2N7EADfY';
  return <div className={`fixed right-4 z-20 flex flex-col gap-3 ${hasCart ? 'bottom-28 sm:bottom-28' : 'bottom-5'}`} aria-label="Canales de contacto">
    <a href={discord} target="_blank" rel="noreferrer" aria-label="Unirse al Discord de KTXStore" className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-300/50 bg-[#15131f]/95 text-indigo-200 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:border-indigo-200">
      <MessagesSquare className="h-5 w-5" aria-hidden="true" />
    </a>
    <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp a KTXStore" className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:-translate-y-1 hover:bg-green-400">
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  </div>;
}
