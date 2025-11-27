import React, { useState } from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  setView: (view: ViewState) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, setView, isAuthenticated, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: ViewState | string) => {
    if (typeof view === 'string') {
      // É uma âncora
      window.location.hash = view;
    } else {
      setView(view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => {
                setView({ name: 'home' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img 
                src="/LOGO-LUCAS-SEMINOVOS.png" 
                alt="Lucas Seminovos Premium" 
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <a 
                href="#estoque"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Estoque
              </a>
              
              <button 
                onClick={() => setView({ name: 'about' })}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Sobre Nós
              </button>
              
              <button 
                onClick={() => setView({ name: 'contact' })}
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Contato
              </button>
              
              <a 
                href="#vender"
                className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                Vender Seu Carro
              </a>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-300">
                  <button 
                    onClick={() => setView({ name: 'dashboard' })}
                    className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Painel
                  </button>
                  <button 
                    onClick={onLogout}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Sair
                  </button>
                  <button 
                    onClick={() => setView({ name: 'edit' })}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm"
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Anunciar
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setView({ name: 'login' })}
                  className="flex items-center text-slate-700 hover:text-blue-600 font-medium border border-slate-300 rounded-full px-4 py-1.5 transition-all hover:border-blue-600 ml-2"
                >
                  <i className="fa-regular fa-user mr-2"></i>
                  Entrar
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4">
              <nav className="flex flex-col space-y-3">
                <a 
                  href="#estoque"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <i className="fa-solid fa-car mr-2"></i>
                  Estoque
                </a>
                
                <button 
                  onClick={() => handleNavClick({ name: 'about' })}
                  className="text-left text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <i className="fa-solid fa-building mr-2"></i>
                  Sobre Nós
                </button>
                
                <button 
                  onClick={() => handleNavClick({ name: 'contact' })}
                  className="text-left text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <i className="fa-solid fa-envelope mr-2"></i>
                  Contato
                </button>
                
                <a 
                  href="#vender"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <i className="fa-solid fa-handshake mr-2"></i>
                  Vender Seu Carro
                </a>

                <div className="border-t border-slate-200 pt-3 mt-3">
                  {isAuthenticated ? (
                    <>
                      <button 
                        onClick={() => handleNavClick({ name: 'dashboard' })}
                        className="w-full text-left text-slate-600 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <i className="fa-solid fa-gauge mr-2"></i>
                        Painel
                      </button>
                      <button 
                        onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                        className="w-full text-left text-red-500 hover:text-red-700 font-medium px-4 py-2 hover:bg-red-50 rounded-lg transition-colors mt-2"
                      >
                        <i className="fa-solid fa-right-from-bracket mr-2"></i>
                        Sair
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleNavClick({ name: 'login' })}
                      className="w-full text-left text-slate-700 hover:text-blue-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <i className="fa-regular fa-user mr-2"></i>
                      Entrar
                    </button>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Lucas Seminovos</h3>
              <p className="text-slate-400 text-sm">
                Sua loja de veículos de qualidade e com procedência! Vendas de seminovos, consignação e consultoria especializada.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => setView({name: 'home'})} className="hover:text-white transition">Estoque</button></li>
                <li><button onClick={() => setView({name: 'about'})} className="hover:text-white transition">Sobre Nós</button></li>
                <li><button onClick={() => setView({name: 'contact'})} className="hover:text-white transition">Contato</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Contato</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><i className="fa-brands fa-whatsapp mr-2"></i> (48) 99906-7726</li>
                <li><i className="fa-solid fa-envelope mr-2"></i> contato@lucasseminovos.com.br</li>
                <li><i className="fa-solid fa-location-dot mr-2"></i> Rua Waldemar Ouriques, 207 - Florianópolis/SC</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Redes Sociais</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com/lucas.seminovos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            &copy; 2025 Lucas Seminovos. Todos os direitos reservados. | Desenvolvido por Siditech Digital
          </div>
        </div>
      </footer>
    </div>
  );
};