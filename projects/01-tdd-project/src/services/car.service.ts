import { Car, CarCategory } from '../models';
import { BaseRepository } from '../repository';

export class CarService {
  private readonly carRepository: BaseRepository<Car>;

  constructor(carsFilePath: string) {
    this.carRepository = new BaseRepository<Car>({ filePath: carsFilePath });
  }

  async getAvailableCar(carCategory: CarCategory): Promise<Car | undefined> {
    return this.carRepository.findById(this.getRandomCarId(carCategory));
  }

  private getRandomCarId(carCategory: CarCategory): string {
    return carCategory.carIds[this.getRandomPositionFromArray(carCategory.carIds)];
  }

  private getRandomPositionFromArray<T>(array: T[]): number {
    const listLength = array.length;
    return Math.floor(Math.random() * listLength);
  }
}
