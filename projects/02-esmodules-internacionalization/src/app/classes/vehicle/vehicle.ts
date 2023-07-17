import chalk from 'chalk';
import { TableOptions } from 'src/app/models';

interface VehicleDto {
  id: number;
  name: string;
  colors: string[];
  kmTravelled: number;
  manufacturingDate: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  version: number;
}

export class Vehicle {
  id?: number;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
  version?: number;

  name!: string;
  colors!: string[];
  kmTravelled!: number;
  manufacturingDate!: Date;

  constructor(dto: VehicleDto) {
    Object.assign(this, dto);
  }

  static readonly tableOptions: TableOptions = {
    leftPad: 2,
    columns: [
      { field: 'id', name: chalk.cyan('ID') },
      { field: 'name', name: chalk.magenta('Nome') },
      { field: 'colors', name: chalk.magenta('Cores disponíveis') },
      { field: 'kmTravelled', name: chalk.white('KM Viajados') },
      { field: 'manufacturingDate', name: chalk.red('Data de fabricação') },
    ],
  };

  // formatted(language) {
  //   const { formatToDate, formatToKilometer, unionValues } = new FormatUtil(language);

  //   return {
  //     id: Number(this.id),
  //     vehicles: unionValues(this.vehicles),
  //     kmTravelled: formatToKilometer(this.kmTravelled),
  //     from: formatToDate(this.from),
  //     to: formatToDate(this.to),
  //   };
  // }
}
