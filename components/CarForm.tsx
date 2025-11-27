import React, { useState, useEffect } from 'react';
import { Car, CarType, FuelType, Transmission } from '../types';
import { MAKES } from '../constants';
import { generateCarDescription } from '../services/geminiService';
import { saveCar, getCarById } from '../services/storageService';
import { saveCarToSupabase } from '../services/supabaseStorage';

interface CarFormProps {
  editId?: string;
  onClose: () => void;
  onSave: () => void;
}

export const CarForm: React.FC<CarFormProps> = ({ editId, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [customMake, setCustomMake] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Car>>({
    make: MAKES[0],
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    type: CarType.SEDAN,
    fuel: FuelType.FLEX,
    transmission: Transmission.AUTOMATIC,
    color: '',
    description: '',
    features: [],
    images: [],
    location: 'São Paulo, SP'
  });

  const [featureInput, setFeatureInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    if (editId) {
      const car = getCarById(editId);
      if (car) setFormData(car);
    }
  }, [editId]);

  const handleGenerateDescription = async () => {
    if (!formData.make || !formData.model) {
      alert("Por favor, preencha pelo menos a Marca e o Modelo.");
      return;
    }
    setGenerating(true);
    const desc = await generateCarDescription(formData);
    setFormData(prev => ({ ...prev, description: desc }));
    setGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const carToSave: Car = {
        ...formData as Car,
        id: editId || crypto.randomUUID(),
        sellerId: 'admin',
        createdAt: formData.createdAt || Date.now(),
        // Ensure at least one placeholder if no images
        images: formData.images && formData.images.length > 0 ? formData.images : ['https://picsum.photos/800/600'],
      };
      
      // Tentar salvar no Supabase primeiro
      const savedToSupabase = await saveCarToSupabase(carToSave);
      
      // Sempre salvar no localStorage como backup
      saveCar(carToSave);
      
      if (savedToSupabase) {
        console.log('✅ Carro salvo no Supabase e localStorage');
      } else {
        console.log('⚠️ Carro salvo apenas no localStorage (Supabase não configurado)');
      }
      
      setLoading(false);
      onSave();
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
      setLoading(false);
      alert('Erro ao salvar veículo. Tente novamente.');
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...(prev.features || []), featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Converter imagens para base64
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setFormData(prev => ({ 
            ...prev, 
            images: [...(prev.images || []), base64String] 
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">
          {editId ? 'Editar Veículo' : 'Novo Anúncio'}
        </h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Informações Básicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Marca</label>
              {!customMake ? (
                <div className="flex gap-2">
                  <select 
                    className="flex-1 p-2 border border-slate-300 rounded-lg"
                    value={formData.make}
                    onChange={e => setFormData({...formData, make: e.target.value})}
                  >
                    {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <button
                    type="button"
                    onClick={() => setCustomMake(true)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium"
                    title="Digitar marca personalizada"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    className="flex-1 p-2 border border-slate-300 rounded-lg"
                    value={formData.make}
                    onChange={e => setFormData({...formData, make: e.target.value})}
                    placeholder="Digite a marca"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCustomMake(false);
                      setFormData({...formData, make: MAKES[0]});
                    }}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium"
                    title="Voltar para lista"
                  >
                    <i className="fa-solid fa-list"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Modelo</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
                placeholder="Ex: Corolla XEi 2.0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Ano</label>
              <input 
                type="number" required
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.year}
                onChange={e => setFormData({...formData, year: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Preço (R$)</label>
              <input 
                type="number" required
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.price}
                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Quilometragem</label>
              <input 
                type="number" required
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.mileage}
                onChange={e => setFormData({...formData, mileage: Number(e.target.value)})}
              />
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Ficha Técnica</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as CarType})}
              >
                {Object.values(CarType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Combustível</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.fuel}
                onChange={e => setFormData({...formData, fuel: e.target.value as FuelType})}
              >
                {Object.values(FuelType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Câmbio</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.transmission}
                onChange={e => setFormData({...formData, transmission: e.target.value as Transmission})}
              >
                {Object.values(Transmission).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cor</label>
              <input 
                type="text" required
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.color}
                onChange={e => setFormData({...formData, color: e.target.value})}
              />
            </div>
          </div>
        </section>

        {/* Description & AI */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Descrição do Veículo</h3>
            <button 
              type="button"
              onClick={handleGenerateDescription}
              disabled={generating}
              className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold hover:bg-purple-200 transition-colors flex items-center"
            >
              {generating ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> Gerando...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Criar com IA
                </>
              )}
            </button>
          </div>
          <textarea 
            rows={5}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="Descreva os detalhes do veículo ou use a IA para gerar..."
          ></textarea>
        </section>

        {/* Features */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Opcionais</h3>
          <div className="flex space-x-2 mb-3">
            <input 
              type="text"
              className="flex-grow p-2 border border-slate-300 rounded-lg"
              placeholder="Ex: Teto Solar, Banco de Couro..."
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <button 
              type="button" 
              onClick={addFeature}
              className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 font-medium"
            >
              Adicionar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features?.map((feat, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                {feat}
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({...prev, features: prev.features?.filter((_, i) => i !== idx)}))}
                  className="ml-2 text-blue-400 hover:text-blue-900"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* Images */}
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Fotos</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={addImage}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <i className="fa-solid fa-cloud-arrow-up text-3xl text-slate-400 mb-2"></i>
            <p className="text-slate-500">Clique ou arraste fotos aqui</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {formData.images?.map((img, idx) => (
              <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => setFormData(prev => ({...prev, images: prev.images?.filter((_, i) => i !== idx)}))}
                  className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-100">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center"
          >
            {loading && <i className="fa-solid fa-circle-notch fa-spin mr-2"></i>}
            Salvar Anúncio
          </button>
        </div>
      </form>
    </div>
  );
};