import React from 'react';

export default function ContactFloaters({ social = {}, hasCart = false }) {
  const whatsapp = social.whatsapp || 'https://wa.me/51968788328';
  const discord = social.discord || 'https://discord.gg/We2N7EADfY';
  return <div className={`fixed right-4 z-20 flex flex-col gap-3 ${hasCart ? 'bottom-28 sm:bottom-28' : 'bottom-5'}`} aria-label="Canales de contacto">
    <a href={discord} target="_blank" rel="noreferrer" aria-label="Unirse al Discord de KTXStore" className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo-300/50 bg-[#5865F2] text-indigo-200 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:border-indigo-200">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/023/741/066/small/discord-logo-icon-social-media-icon-free-png.png" alt="" className="h-9 w-9 object-contain" />
    </a>
    <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp a KTXStore" className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 p-1 text-white shadow-xl transition hover:-translate-y-1 hover:bg-green-400">
      <img src="https://img.magnific.com/vector-premium/vector-whatsapp-logotipo-redes-sociales_1093524-447.jpg?semt=ais_hybrid&w=740&q=80" alt="" className="h-11 w-11 rounded-full bg-white object-cover" />
    </a>
  </div>;
}
