import { Vehicle, VehicleFormatted } from '../classes';

export interface VehicleService {
  listAllVehicles(): VehicleFormatted[];
}
