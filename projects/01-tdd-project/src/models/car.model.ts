import { BaseDto } from './base.model';

export interface CarDto extends BaseDto {
  available: boolean;
}

export class Car implements CarDto {
  id!: string;
  name!: string;
  available!: boolean;

  constructor(dto: CarDto) {
    Object.assign(this, dto);
  }
}
