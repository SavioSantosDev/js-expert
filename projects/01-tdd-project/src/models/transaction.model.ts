import { CarCategory } from './car-category.model';
import { Car } from './car.model';
import { Customer } from './customer.model';

export interface Transaction {
  carSelected: Car;
  carCategory: CarCategory;
  customer: Customer;
  dueDate: string;
  finalPrice: string;
}
