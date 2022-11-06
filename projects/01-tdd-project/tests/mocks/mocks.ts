import { Car, CarCategory } from '../../src/models';

export namespace Mocks {
  export const car1: Car = { id: '8023dc45-16e8-4175-8cbf-5f84eee26a98', name: 'Grand Caravan', available: true };
  export const car2: Car = { id: 'afb6b0ab-a2b3-49a1-a83e-da3c78f38920', name: 'Aventador', available: true };
  export const car3: Car = { id: 'c557930b-1394-4e9f-93d4-4c7f158db139', name: 'Model X', available: true };

  export const carCategoryWithOnlyCar1Available: CarCategory = {
    id: 'a9a3bf0d-3b45-4925-8b0f-1b29dd3ddf94',
    name: 'Roadster',
    carIds: [car1.id],
  };
}
