import React from 'react';
import { CONTACT_CONFIG } from '../config/contactConfig';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber
}) => {
  const whatsappNumber = phoneNumber || CONTACT_CONFIG.whatsapp.number;
  
  const handleClick = () => {
    const message = encodeURIComponent(CONTACT_CONFIG.whatsapp.defaultMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all hover:scale-110 animate-pulse hover:animate-none group"
      title="Fale conosco no WhatsApp"
    >
      <i className="fa-brands fa-whatsapp text-3xl"></i>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco!
      </span>
      
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping" style={{ animationDuration: '2s' }}></span>
    </button>
  );
};
