import { Observable } from 'rxjs';
import { Vehicle } from '../classes';

export interface VehicleService {
  listAllVehicles(): Observable<Vehicle[]>;

  save(vehicle: Vehicle): Observable<Vehicle>;

  delete(vehicleId: number): Observable<Vehicle | false>;
}
