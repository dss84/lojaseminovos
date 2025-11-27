import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Filters } from './components/Filters';
import { CarCard } from './components/CarCard';
import { CarForm } from './components/CarForm';
import { CarDetails } from './components/CarDetails';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { SellCarForm } from './components/SellCarForm';
import { MapSection } from './components/MapSection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { UserManagement } from './components/UserManagement';
import { ContactForm } from './components/ContactForm';
import { Car, FilterState, ViewState } from './types';
import { getCars, getCarById, deleteCar } from './services/storageService';
import { validateCredentials, getUserName } from './config/authorizedUsers';
import { fetchCarsFromSupabase, deleteCarFromSupabase } from './services/supabaseStorage';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ name: 'home' });
  const [cars, setCars] = useState<Car[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string>('');
  const [showUserManagement, setShowUserManagement] = useState(false);
  
  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    make: '',
    minPrice: 0,
    maxPrice: 1000000,
    minYear: 2010,
    maxYear: 2025,
    type: ''
  });

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Initial Load & Auth Check
  useEffect(() => {
    loadCars();
    const auth = localStorage.getItem('autopremium_auth');
    const userEmail = localStorage.getItem('autopremium_user');
    if (auth === 'true' && userEmail) {
      setIsAuthenticated(true);
      setCurrentUser(getUserName(userEmail));
    }
  }, []);

  const loadCars = async () => {
    try {
      // Tentar carregar do Supabase primeiro
      const supabaseCars = await fetchCarsFromSupabase();
      console.log('📦 Carros carregados:', supabaseCars.length);
      setCars(supabaseCars);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
      // Fallback para localStorage
      const localCars = getCars();
      console.log('💾 Usando localStorage, carros:', localCars.length);
      setCars(localCars);
    }
  };

  const refreshCars = async () => {
    await loadCars();
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      if (filters.make && car.make !== filters.make) return false;
      if (filters.type && car.type !== filters.type) return false;
      if (car.price < filters.minPrice || car.price > filters.maxPrice) return false;
      if (car.year < filters.minYear || car.year > filters.maxYear) return false;
      return true;
    });
  }, [cars, filters]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (validateCredentials(loginEmail, loginPass)) {
      localStorage.setItem('autopremium_auth', 'true');
      localStorage.setItem('autopremium_user', loginEmail);
      setIsAuthenticated(true);
      setCurrentUser(getUserName(loginEmail));
      setView({ name: 'dashboard' });
    } else {
      setLoginError('Email ou senha incorretos. Acesso negado.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('autopremium_auth');
    localStorage.removeItem('autopremium_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setView({ name: 'home' });
    setLoginEmail('');
    setLoginPass('');
    setLoginError('');
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este anúncio?")) {
      // Deletar do Supabase
      await deleteCarFromSupabase(id);
      
      // Deletar do localStorage
      deleteCar(id);
      
      // Recarregar lista
      await refreshCars();
    }
  };

  // --- Views ---

  const renderHome = () => (
    <>
      <Hero />
      <ServicesSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="estoque">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <Filters filters={filters} setFilters={setFilters} totalResults={filteredCars.length} />
          </aside>
            
          {/* Car Grid */}
          <div className="flex-1">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onClick={() => setView({ name: 'details', carId: car.id })} 
                  />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-100">
              <i className="fa-solid fa-car-tunnel text-4xl text-slate-300 mb-4"></i>
              <h3 className="text-lg font-medium text-slate-600">Nenhum veículo encontrado</h3>
              <p className="text-slate-400">Tente ajustar seus filtros de busca.</p>
            </div>
          )}
        </div>
      </div>
      </div>
      <SellCarForm />
      <MapSection />
    </>
  );

  const renderDetails = () => {
    if (view.name !== 'details') return null;
    // Buscar carro do state em vez do localStorage
    const car = cars.find(c => c.id === view.carId);
    if (!car) return <div className="p-8 text-center">Veículo não encontrado</div>;
    
    return <CarDetails car={car} onBack={() => setView({ name: 'home' })} />;
  };

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fa-solid fa-handshake text-3xl"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Sobre a Lucas Seminovos</h2>
        <p className="text-slate-600 mb-6 leading-relaxed text-lg">
          Somos especializados na venda de veículos seminovos de qualidade e com procedência garantida. 
          Nossa missão é proporcionar a melhor experiência, com transparência, 
          segurança e atendimento personalizado para cada cliente.
        </p>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Oferecemos vendas, consignação, consultoria de compra e venda, e avaliação de veículos. 
          Conte com nossa experiência para encontrar o carro ideal ou vender o seu com segurança.
        </p>
        <button 
          onClick={() => setView({ name: 'home' })}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Ver Estoque
        </button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-50 rounded-xl mb-4 text-blue-600">
            <i className="fa-solid fa-lock text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Acesso Restrito</h2>
          <p className="text-slate-500 mt-2">Área exclusiva para vendedores autorizados.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {loginError}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="vendedor@lucasseminovos.com.br"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input 
              type="password" 
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={loginPass}
              onChange={e => setLoginPass(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentUser && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <i className="fa-solid fa-user-check mr-2"></i>
            Bem-vindo, <strong>{currentUser}</strong>!
          </p>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Meu Estoque</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowUserManagement(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-200"
          >
            <i className="fa-solid fa-users-gear mr-2"></i> Gerenciar Usuários
          </button>
          <button 
            onClick={() => setView({ name: 'edit' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-200"
          >
            <i className="fa-solid fa-plus mr-2"></i> Novo Anúncio
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Veículo</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Ano</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {cars.map(car => (
                <tr key={car.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-800">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-slate-200 mr-3 overflow-hidden">
                        <img src={car.images[0]} className="w-full h-full object-cover" alt="" />
                      </div>
                      {car.make} {car.model}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">R$ {car.price.toLocaleString('pt-BR')}</td>
                  <td className="p-4 text-slate-600">{car.year}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Ativo</span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      onClick={() => setView({ name: 'edit', carId: car.id })}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded transition-colors"
                      title="Editar"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                      title="Excluir"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cars.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              Você ainda não tem veículos cadastrados.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Layout 
        setView={setView} 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
      >
        {view.name === 'home' && renderHome()}
        {view.name === 'details' && renderDetails()}
        {view.name === 'login' && renderLogin()}
        {view.name === 'about' && renderAbout()}
        {view.name === 'contact' && <ContactForm />}
        {view.name === 'dashboard' && (isAuthenticated ? renderDashboard() : renderLogin())}
        {view.name === 'edit' && (
          <div className="py-8 px-4">
            <CarForm 
              editId={view.carId} 
              onClose={() => setView({ name: 'dashboard' })} 
              onSave={() => { refreshCars(); setView({ name: 'dashboard' }); }} 
            />
          </div>
        )}
      </Layout>
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
      
      {/* User Management Modal */}
      {showUserManagement && (
        <UserManagement onClose={() => setShowUserManagement(false)} />
      )}
    </>
  );
};

export default App;