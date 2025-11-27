import React, { useState } from 'react';
import { Car } from '../types';

interface CarDetailsProps {
  car: Car;
  onBack: () => void;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car, onBack }) => {
  const [activeImage, setActiveImage] = useState(car.images[0]);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Vi o anúncio do ${car.make} ${car.model} (${car.year}) na Lucas Seminovos e gostaria de mais detalhes.`);
    // Using a demo number. In a real app, this would be car.sellerPhone
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-blue-600 font-medium transition-colors"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Voltar para busca
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery Hero */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-1">
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 mb-2 relative group">
              <img 
                src={activeImage} 
                alt={car.model} 
                className="w-full h-full object-cover transition-all duration-500" 
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto p-2 scrollbar-hide">
              {car.images.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-24 object-cover rounded-lg cursor-pointer hover:opacity-100 transition-all border-2 ${activeImage === img ? 'border-blue-600 opacity-100' : 'border-transparent opacity-70'}`}
                  alt={`${car.model} view ${i + 1}`} 
                />
              ))}
            </div>
          </div>

          {/* Description & Features */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Sobre o Veículo</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line mb-8">
              {car.description}
            </p>
            
            <h3 className="font-bold text-slate-800 mb-4">Opcionais e Acessórios</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {car.features.map((feat, i) => (
                <div key={i} className="flex items-center text-slate-600 text-sm">
                  <i className="fa-solid fa-check text-green-500 mr-2"></i>
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 sticky top-24">
            <div className="mb-6">
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">{car.make}</p>
              <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-2">{car.model}</h1>
              <div className="flex items-center text-slate-500 text-sm">
                <i className="fa-solid fa-location-dot mr-1.5 text-blue-500"></i> {car.location}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-500 mb-1">Preço à vista</p>
              <p className="text-3xl font-bold text-blue-700">R$ {car.price.toLocaleString('pt-BR')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-white border border-slate-100 p-3 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">Ano</p>
                <p className="font-semibold text-slate-700">{car.year}</p>
              </div>
              <div className="bg-white border border-slate-100 p-3 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">Km</p>
                <p className="font-semibold text-slate-700">{car.mileage.toLocaleString('pt-BR')} km</p>
              </div>
              <div className="bg-white border border-slate-100 p-3 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">Câmbio</p>
                <p className="font-semibold text-slate-700">{car.transmission}</p>
              </div>
              <div className="bg-white border border-slate-100 p-3 rounded-lg">
                <p className="text-slate-400 text-xs mb-1">Combustível</p>
                <p className="font-semibold text-slate-700">{car.fuel}</p>
              </div>
            </div>

            <button 
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center mb-3"
            >
              <i className="fa-brands fa-whatsapp text-xl mr-2"></i>
              Falar com Vendedor
            </button>
            
            {/* 
            <button className="w-full bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-bold py-3 rounded-xl transition-all">
              Simular Financiamento
            </button> 
            */}
          </div>
        </div>
      </div>
    </div>
  );
};