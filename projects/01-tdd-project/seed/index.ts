import { faker } from '@faker-js/faker';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Car, CarCategory, Customer } from '../src/models';

const CARS_AMOUNT = 3;
const CUSTOMERS_AMOUNT = 2;

// Build categories
const carCategory = new CarCategory({ id: faker.datatype.uuid(), name: faker.vehicle.model(), carIds: [] });

// Build cars and set carCategories carIds
const cars = Array.from(Array(CARS_AMOUNT)).map(() => {
  const car = new Car({ id: faker.datatype.uuid(), name: faker.vehicle.model(), available: true });
  carCategory.carIds.push(car.id);

  return car;
});

// Build Customers
const customers = Array.from(Array(CUSTOMERS_AMOUNT)).map(
  () =>
    new Customer({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      age: faker.datatype.number({ min: 18, max: 60 }),
    })
);

// Set database
(async () => {
  const seederBaseFolder = join(__dirname, '../', 'database');
  const write = (filename: string, data: any) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

  await write('cars.json', cars);
  await write('customers.json', customers);
  await write('carCategories.json', [carCategory]);

  console.log('cars', cars);
  console.log('carCategory', carCategory);
  console.log('customers', customers);
})();
