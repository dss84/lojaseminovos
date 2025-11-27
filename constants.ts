import { Car, CarType, FuelType, Transmission } from './types';

export const INITIAL_CARS: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Corolla Cross XRE',
    year: 2023,
    price: 158900,
    mileage: 12500,
    type: CarType.SUV,
    fuel: FuelType.HYBRID,
    transmission: Transmission.CVT,
    color: 'Branco Lunar',
    description: 'Veículo em estado de zero km. Único dono, todas as revisões feitas na concessionária. Garantia de fábrica ativa. Economia e conforto para sua família.',
    images: [
      'https://picsum.photos/id/111/800/600',
      'https://picsum.photos/id/183/800/600',
      'https://picsum.photos/id/133/800/600'
    ],
    features: ['Ar condicionado digital', 'Bancos em couro', 'Sensor de estacionamento', 'Câmera de ré', 'Multimídia 10"'],
    sellerId: 'admin',
    createdAt: Date.now(),
    location: 'São Paulo, SP'
  },
  {
    id: '2',
    make: 'Jeep',
    model: 'Compass Longitude',
    year: 2021,
    price: 125000,
    mileage: 45000,
    type: CarType.SUV,
    fuel: FuelType.FLEX,
    transmission: Transmission.AUTOMATIC,
    color: 'Cinza Granito',
    description: 'O SUV médio mais vendido do Brasil. Motor turbo potente, interior refinado e tecnologia de ponta. Pneus novos.',
    images: [
      'https://picsum.photos/id/1071/800/600',
      'https://picsum.photos/id/655/800/600'
    ],
    features: ['Teto solar', 'Tração 4x2', 'Start/Stop', 'Chave presencial'],
    sellerId: 'admin',
    createdAt: Date.now() - 10000000,
    location: 'Belo Horizonte, MG'
  },
  {
    id: '3',
    make: 'Honda',
    model: 'Civic Touring',
    year: 2020,
    price: 139900,
    mileage: 38000,
    type: CarType.SEDAN,
    fuel: FuelType.GASOLINE,
    transmission: Transmission.CVT,
    color: 'Preto Cristal',
    description: 'Elegância e esportividade. Versão topo de linha com motor Turbo 1.5. Teto solar e sistema de som premium.',
    images: [
      'https://picsum.photos/id/1072/800/600',
      'https://picsum.photos/id/111/800/600'
    ],
    features: ['Teto solar', 'Lane Watch', 'Bancos elétricos', 'GPS Nativo'],
    sellerId: 'admin',
    createdAt: Date.now() - 20000000,
    location: 'Curitiba, PR'
  }
];

export const MAKES = ['Toyota', 'Honda', 'Jeep', 'Volkswagen', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Hyundai', 'Fiat'];
