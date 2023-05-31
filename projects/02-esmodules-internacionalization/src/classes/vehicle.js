export default class Vehicle {
  constructor({
    id,
    name,
    colors,
    kmTravelled,
    manufacturingDate,
    createdDate,
    createdBy,
    modifiedDate,
    modifiedBy,
    version,
  }) {
    this.id = id;
    this.name = name;
    this.colors = colors;
    this.kmTravelled = kmTravelled;
    this.createdDate = createdDate;
    this.manufacturingDate = manufacturingDate;
    this.createdBy = createdBy;
    this.modifiedDate = modifiedDate;
    this.modifiedBy = modifiedBy;
    this.version = version;
  }
}
