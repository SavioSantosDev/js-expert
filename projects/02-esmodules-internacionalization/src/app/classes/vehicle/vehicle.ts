export default class Vehicle {
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

  constructor(clazz: Vehicle) {
    Object.assign(this, clazz);
  }

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
