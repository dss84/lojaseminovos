import { Car } from '../types';
import { INITIAL_CARS } from '../constants';

const STORAGE_KEY = 'autopremium_cars';

export const getCars = (): Car[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CARS));
    return INITIAL_CARS;
  }
  return JSON.parse(stored);
};

export const getCarById = (id: string): Car | undefined => {
  const cars = getCars();
  return cars.find(c => c.id === id);
};

export const saveCar = (car: Car): void => {
  const cars = getCars();
  const index = cars.findIndex(c => c.id === car.id);
  
  if (index >= 0) {
    cars[index] = car;
  } else {
    cars.unshift(car); // Add to top
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
};

export const deleteCar = (id: string): void => {
  const cars = getCars();
  const newCars = cars.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newCars));
};
