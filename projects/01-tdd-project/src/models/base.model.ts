export interface BaseDto {
  id: string;
  name: string;
}

export class Base {
  constructor(private readonly baseDto: BaseDto) {}
}
