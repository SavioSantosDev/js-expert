import chalk from 'chalk';
import { TableOptions } from 'src/app/models';
import { FormatUtil } from '../../utils/format-util';

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

export interface VehicleFormatted {
  id: number;
  name: string;
  colors: string;
  kmTravelled: string;
  manufacturingDate: string;
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
    Object.assign(this, { ...dto, manufacturingDate: new Date(dto.manufacturingDate) });
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

  format(language: string): VehicleFormatted {
    const { formatToDate, formatToKilometer, unionValues, capitalize } = new FormatUtil(language);

    return {
      id: Number(this.id),
      name: capitalize(this.name),
      colors: unionValues(this.colors),
      kmTravelled: formatToKilometer(this.kmTravelled),
      manufacturingDate: formatToDate(this.manufacturingDate),
    };
  }
}
