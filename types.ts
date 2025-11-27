export enum CarType {
  SUV = 'SUV',
  SEDAN = 'Sedan',
  HATCHBACK = 'Hatchback',
  PICKUP = 'Picape',
  COUPE = 'Coupé',
  CONVERTIBLE = 'Conversível'
}

export enum FuelType {
  GASOLINE = 'Gasolina',
  ETHANOL = 'Etanol',
  DIESEL = 'Diesel',
  HYBRID = 'Híbrido',
  ELECTRIC = 'Elétrico',
  FLEX = 'Flex'
}

export enum Transmission {
  AUTOMATIC = 'Automático',
  MANUAL = 'Manual',
  CVT = 'CVT'
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  type: CarType;
  fuel: FuelType;
  transmission: Transmission;
  color: string;
  description: string;
  images: string[];
  features: string[];
  sellerId: string;
  createdAt: number;
  location: string;
}

export interface FilterState {
  make: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  type: CarType | '';
}

export type ViewState = 
  | { name: 'home' }
  | { name: 'details'; carId: string }
  | { name: 'login' }
  | { name: 'dashboard' }
  | { name: 'edit'; carId?: string }
  | { name: 'about' }
  | { name: 'contact' };