import { Base } from './base.model';

export interface CarCategoryDto extends Base {
  carIds: string[];
}

export class CarCategory implements CarCategoryDto {
  id!: string;
  name!: string;
  carIds!: string[];
  pricePerDay!: number;

  constructor(dto: CarCategoryDto) {
    Object.assign(this, dto);
  }
}
