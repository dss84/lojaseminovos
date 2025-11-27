import React from 'react';
import { CONTACT_CONFIG } from '../config/contactConfig';

export const MapSection: React.FC = () => {
  return (
    <div className="bg-slate-100 py-16" id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            <i className="fa-solid fa-location-dot mr-3 text-blue-600"></i>
            Onde Estamos
          </h2>
          <p className="text-xl text-slate-600">
            Venha nos visitar e conhecer nosso showroom
          </p>
        </div>

        {/* Mapa */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[500px]">
          <iframe
            src={CONTACT_CONFIG.address.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Lucas Seminovos"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
