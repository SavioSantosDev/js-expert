import { Vehicle } from '../classes';

export interface VehicleService {
  listAllVehicles(): Vehicle[];
}
