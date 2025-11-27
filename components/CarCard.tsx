import React from 'react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-slate-200">
        <img 
          src={car.images[0]} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 shadow-sm">
          {car.year}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <p className="text-xs text-blue-600 font-semibold uppercase">{car.make}</p>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{car.model}</h3>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center">
            <i className="fa-solid fa-gauge-high mr-1.5 text-slate-400"></i>
            {car.mileage.toLocaleString('pt-BR')} km
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-gas-pump mr-1.5 text-slate-400"></i>
            {car.fuel}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400">Preço à vista</p>
            <p className="text-xl font-bold text-blue-700">R$ {car.price.toLocaleString('pt-BR')}</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
