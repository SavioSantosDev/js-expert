import { BaseDto } from './base.model';

export interface CarCategoryDto extends BaseDto {
  carIds: string[];
}

export class CarCategory implements CarCategoryDto {
  id!: string;
  name!: string;
  carIds!: string[];

  constructor(dto: CarCategoryDto) {
    Object.assign(this, dto);
  }
}
