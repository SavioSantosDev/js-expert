import { VehicleService } from '../models';

export class VehicleServiceMock implements VehicleService {
  readonly listAllVehicles = jest.fn().mockImplementation(() => null);
}
