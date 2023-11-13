import { Subject, take } from 'rxjs';
import { Vehicle } from '../classes';
import { VehicleService } from '../models';

export class VehicleServiceMock implements VehicleService {
  readonly listAllVehicles$ = new Subject<Vehicle[]>();
  readonly listAllVehicles = jest.fn(() => this.listAllVehicles$.pipe(take(1)));

  readonly save$ = new Subject<Vehicle>();
  readonly save = jest.fn(() => this.save$.pipe(take(1)));
}
