import { Base } from './base.model';

export interface CustomerDto extends Base {
  age: number;
}

export class Customer implements CustomerDto {
  id!: string;
  name!: string;
  age!: number;

  constructor(dto: CustomerDto) {
    Object.assign(this, dto);
  }
}
