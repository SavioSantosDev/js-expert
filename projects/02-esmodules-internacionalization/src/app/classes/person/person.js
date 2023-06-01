import FormatUtil from '../../utils/format-util/format-util.js';

export default class Person {
  constructor({ id, vehicles, kmTravelled, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTravelled = kmTravelled;
    this.from = from;
    this.to = to;
  }

  formatted(language) {
    const { formatToDate, formatToKilometer, unionValues } = new FormatUtil(language);

    return {
      id: Number(this.id),
      vehicles: unionValues(this.vehicles),
      kmTravelled: formatToKilometer(this.kmTravelled),
      from: formatToDate(this.from),
      to: formatToDate(this.to),
    };
  }
}
