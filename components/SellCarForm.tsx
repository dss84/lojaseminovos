import React, { useState } from 'react';
import { CONTACT_CONFIG } from '../config/contactConfig';

interface SellCarFormProps {
  onClose?: () => void;
}

export const SellCarForm: React.FC<SellCarFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    carMake: '',
    carModel: '',
    carYear: '',
    mileage: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formatar mensagem para WhatsApp
    const whatsappMessage = `
*PROPOSTA DE VENDA DE VEÍCULO*

*Dados do Proprietário:*
Nome: ${formData.name}
Telefone: ${formData.phone}
Email: ${formData.email}

*Dados do Veículo:*
Marca: ${formData.carMake}
Modelo: ${formData.carModel}
Ano: ${formData.carYear}
Km: ${formData.mileage}

*Mensagem:*
${formData.message || 'Sem mensagem adicional'}
    `.trim();

    // Número do WhatsApp da loja (substitua pelo número real)
    const whatsappNumber = CONTACT_CONFIG.whatsapp.number;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpar formulário
    setFormData({
      name: '',
      phone: '',
      email: '',
      carMake: '',
      carModel: '',
      carYear: '',
      mileage: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-slate-900 py-16" id="vender">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <i className="fa-solid fa-handshake mr-3"></i>
            Quer Vender Seu Veículo?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Entre em contato conosco! Fazemos uma avaliação justa e a compra é rápida e segura.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="João Silva"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Telefone/WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="joao@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Marca do Veículo *
                </label>
                <input
                  type="text"
                  name="carMake"
                  value={formData.carMake}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Toyota"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Corolla"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ano *
                </label>
                <input
                  type="text"
                  name="carYear"
                  value={formData.carYear}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 2020"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Quilometragem *
                </label>
                <input
                  type="text"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: 50000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mensagem Adicional
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Conte-nos mais sobre o veículo, estado de conservação, acessórios, etc."
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <i className="fa-brands fa-whatsapp text-2xl mr-2"></i>
                Enviar via WhatsApp
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              Ao clicar em enviar, você será redirecionado para o WhatsApp com a mensagem preenchida.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
