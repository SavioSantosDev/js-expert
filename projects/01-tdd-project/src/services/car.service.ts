import { Car, CarCategory } from '../models';
import { BaseRepository } from '../repository';

export class CarService {
  constructor(private carRepository: BaseRepository<Car>) {}

  async getAvailableCar(carCategory: CarCategory): Promise<Car | undefined> {
    if (!carCategory.carIds.length) {
      throw new Error('No car available!');
    }

    return this.carRepository.findById(this.getRandomCarId(carCategory));
  }

  private getRandomCarId(carCategory: CarCategory): string {
    return carCategory.carIds[this.getRandomPositionFromArray(carCategory.carIds)];
  }

  private getRandomPositionFromArray<T>(array: T[]): number {
    return Math.floor(Math.random() * array.length);
  }
}
