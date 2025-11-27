import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/99c90b1da12374f776fd.jpg)',
        }}
      >
        {/* Overlay escuro com transparência */}
        <div className="absolute inset-0 bg-slate-900 bg-opacity-60"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Encontre o Veículo dos Seus Sonhos
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8">
              Veículos selecionados com garantia e procedência. Sua próxima jornada começa aqui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#estoque" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-2xl text-center"
              >
                <i className="fa-solid fa-car mr-2"></i>
                Ver Estoque
              </a>
              <a 
                href="#vender" 
                className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all border-2 border-white text-center"
              >
                <i className="fa-solid fa-handshake mr-2"></i>
                Vender Meu Carro
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#estoque" className="text-white opacity-75 hover:opacity-100 transition-opacity">
          <i className="fa-solid fa-chevron-down text-3xl"></i>
        </a>
      </div>
    </div>
  );
};
