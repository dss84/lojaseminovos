import React from 'react';
import { FilterState, CarType } from '../types';
import { MAKES } from '../constants';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, totalResults }) => {
  const handleChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center">
          <i className="fa-solid fa-filter mr-2 text-blue-600"></i>
          Filtros
        </h2>
        {/* Clear Filters Button */}
        {(filters.make || filters.type || filters.maxPrice < 1000000 || filters.minYear > 2010) && (
          <button 
            onClick={() => setFilters({
              make: '',
              minPrice: 0,
              maxPrice: 1000000,
              minYear: 2010,
              maxYear: 2025,
              type: ''
            })}
            className="text-xs font-bold text-red-500 hover:text-red-700"
          >
            Limpar
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Results Count */}
        <div className="text-sm text-slate-500 text-center bg-slate-50 py-2 rounded-lg font-medium">
          {totalResults} veículos encontrados
        </div>

        {/* Make */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Marca</label>
          <select 
            className="w-full border-slate-300 rounded-lg text-sm p-3 border focus:ring-blue-500 focus:border-blue-500"
            value={filters.make}
            onChange={(e) => handleChange('make', e.target.value)}
          >
            <option value="">Todas as Marcas</option>
            {MAKES.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Categoria</label>
          <select 
            className="w-full border-slate-300 rounded-lg text-sm p-3 border focus:ring-blue-500 focus:border-blue-500"
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            {Object.values(CarType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">
            Preço Máximo
          </label>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
             <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-500">R$ 20k</span>
                <span className="text-sm font-bold text-blue-700">R$ {(filters.maxPrice / 1000).toFixed(0)}k</span>
             </div>
             <input 
              type="range" 
              min="20000" 
              max="1000000" 
              step="10000"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Year Range */}
        <div>
           <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Ano</label>
           <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] text-slate-400 mb-1">Mínimo</p>
              <input 
                type="number"
                value={filters.minYear}
                onChange={(e) => handleChange('minYear', Number(e.target.value))}
                className="w-full border-slate-300 rounded-lg p-2.5 text-sm border"
              />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 mb-1">Máximo</p>
              <input 
                type="number"
                value={filters.maxYear}
                onChange={(e) => handleChange('maxYear', Number(e.target.value))}
                className="w-full border-slate-300 rounded-lg p-2.5 text-sm border"
              />
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};