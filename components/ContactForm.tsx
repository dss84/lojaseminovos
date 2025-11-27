import React, { useState } from 'react';
import { CONTACT_CONFIG } from '../config/contactConfig';

interface ContactFormProps {
  onClose?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formatar mensagem para WhatsApp
    const whatsappMessage = `
*CONTATO DO SITE*

*Nome:* ${formData.name}
*Telefone:* ${formData.phone}
*Email:* ${formData.email}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}
    `.trim();

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
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ficou com alguma dúvida? Preencha o formulário abaixo e entraremos em contato o mais breve possível.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              <i className="fa-solid fa-envelope mr-3 text-blue-600"></i>
              Envie sua Mensagem
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Assunto *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Dúvidas sobre veículos">Dúvidas sobre veículos</option>
                  <option value="Agendar visita">Agendar visita</option>
                  <option value="Financiamento">Financiamento</option>
                  <option value="Avaliação de veículo">Avaliação de veículo</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite sua mensagem aqui..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <i className="fa-brands fa-whatsapp text-2xl mr-2"></i>
                Enviar via WhatsApp
              </button>

              <p className="text-xs text-slate-500 text-center">
                Ao clicar em enviar, você será redirecionado para o WhatsApp.
              </p>
            </form>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                <i className="fa-solid fa-info-circle mr-3 text-blue-600"></i>
                Outras Formas de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-brands fa-whatsapp text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">WhatsApp</h4>
                    <p className="text-slate-600">{CONTACT_CONFIG.phone}</p>
                    <p className="text-sm text-slate-500 mt-1">Respondemos rapidamente</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-phone text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Telefone</h4>
                    <p className="text-slate-600">{CONTACT_CONFIG.phone}</p>
                    <p className="text-sm text-slate-500 mt-1">{CONTACT_CONFIG.businessHours.weekdays}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-envelope text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <p className="text-slate-600">{CONTACT_CONFIG.email}</p>
                    <p className="text-sm text-slate-500 mt-1">Resposta em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-location-dot text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Endereço</h4>
                    <p className="text-slate-600">
                      {CONTACT_CONFIG.address.street}<br />
                      {CONTACT_CONFIG.address.neighborhood}, {CONTACT_CONFIG.address.city} - {CONTACT_CONFIG.address.state}<br />
                      CEP: {CONTACT_CONFIG.address.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-clock text-orange-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Horário de Atendimento</h4>
                    <p className="text-slate-600">
                      {CONTACT_CONFIG.businessHours.weekdays}<br />
                      {CONTACT_CONFIG.businessHours.saturday}<br />
                      {CONTACT_CONFIG.businessHours.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Box de destaque */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">
                <i className="fa-solid fa-headset mr-2"></i>
                Atendimento Personalizado
              </h3>
              <p className="text-slate-300 mb-4">
                Nossa equipe está pronta para tirar suas dúvidas e encontrar o veículo perfeito para você.
              </p>
              <div className="flex items-center space-x-2 text-slate-300">
                <i className="fa-solid fa-check-circle"></i>
                <span>Resposta rápida</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 mt-2">
                <i className="fa-solid fa-check-circle"></i>
                <span>Consultores especializados</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300 mt-2">
                <i className="fa-solid fa-check-circle"></i>
                <span>Atendimento humanizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
