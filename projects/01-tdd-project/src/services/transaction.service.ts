import { Tax } from '../classes';
import { Car, CarCategory, Customer, Renting, Transaction } from '../models';
import { BaseRepository } from '../repository';

export class TransactionService {
  private readonly currencyFormat = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });

  constructor(
    private carRepository: BaseRepository<Car>,
    private carCategoryRepository: BaseRepository<CarCategory>,
    private customerRepository: BaseRepository<Customer>
  ) {}

  async calculateTransactionByRenting(renting: Renting): Promise<Transaction> {
    const { carCategoryId, carSelectedId, customerId, startDate, days } = renting;
    const carCategory = await this.carCategoryRepository.findById(carCategoryId);
    const carSelected = await this.carRepository.findById(carSelectedId);
    const customer = await this.customerRepository.findById(customerId);

    if (carCategory && carSelected && customer) {
      return {
        carCategory,
        carSelected,
        customer,
        dueDate: this.calculateDueDate(startDate, days),
        finalPrice: this.calculateFinalPrice(carCategory.pricePerDay, customer.age, days),
      };
    }

    throw new Error('Invalid renting!');
  }

  private calculateFinalPrice(pricePerDay: number, customerAge: number, days: number): string {
    const finalPrice = pricePerDay * Tax.getTaxByAge(customerAge) * days;
    return this.currencyFormat.format(finalPrice);
  }

  private calculateDueDate(startDate: Date, days: number): string {
    const dueDate = new Date(startDate);
    dueDate.setDate(new Date(startDate).getDate() + days);
    return dueDate.toLocaleDateString('pt-bt', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
