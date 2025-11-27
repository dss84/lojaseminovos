import React from 'react';

export const ServicesSection: React.FC = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Sua loja de veículos de qualidade e com procedência!
          </h2>
        </div>
        
        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Serviço 1 */}
          <div className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <i className="fa-solid fa-handshake text-3xl text-blue-600 group-hover:text-white transition-colors"></i>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Vendas de seminovos</h3>
            <p className="text-slate-600 text-sm">Veículos selecionados com qualidade garantida</p>
          </div>

          {/* Serviço 2 */}
          <div className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <i className="fa-solid fa-car text-3xl text-blue-600 group-hover:text-white transition-colors"></i>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Consignação de veículos</h3>
            <p className="text-slate-600 text-sm">Anunciamos e vendemos seu carro com segurança</p>
          </div>

          {/* Serviço 3 */}
          <div className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <i className="fa-solid fa-comments-dollar text-3xl text-blue-600 group-hover:text-white transition-colors"></i>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Consultoria de compra e venda</h3>
            <p className="text-slate-600 text-sm">Orientação especializada em todas as etapas</p>
          </div>

          {/* Serviço 4 */}
          <div className="group bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <i className="fa-solid fa-clipboard-check text-3xl text-blue-600 group-hover:text-white transition-colors"></i>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-2">Avaliação de Veículos</h3>
            <p className="text-slate-600 text-sm">Avaliação justa e transparente do seu veículo</p>
          </div>
        </div>
      </div>
    </div>
  );
};
