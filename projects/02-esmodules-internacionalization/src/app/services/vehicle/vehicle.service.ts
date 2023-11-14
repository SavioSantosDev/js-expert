import { readFile, writeFile } from 'fs/promises';
import { Observable, from, map, switchMap, take, tap } from 'rxjs';
import { Vehicle } from '../../classes';
import { VehicleService } from '../../models';

interface Database {
  sequence: number;
  vehicles: Vehicle[];
}
export class VehicleServiceImpl implements VehicleService {
  constructor(private readonly dataBasePath: string) {}

  listAllVehicles(): Observable<Vehicle[]> {
    return this.readDatabase().pipe(map(({ vehicles }) => vehicles.map((item) => new Vehicle(item))));
  }

  save(vehicle: Vehicle): Observable<Vehicle> {
    return this.readDatabase().pipe(
      tap((database) => (vehicle.id = database.sequence + 1)),
      tap((currentData) => currentData.vehicles.push(vehicle)),
      tap((database) => database.sequence++),
      switchMap(this.saveDatabase),
      take(1),
      map(() => vehicle)
    );
  }

  private readDatabase(): Observable<Database> {
    return from(readFile(this.dataBasePath)).pipe(map((file) => JSON.parse(file as any)));
  }

  private saveDatabase = (database: Database): Promise<void> => {
    return writeFile(this.dataBasePath, JSON.stringify(database));
  };

  delete(vehicleId: number): Observable<Vehicle | false> {
    let vehicleRemoved: Vehicle;

    return this.readDatabase().pipe(
      map((database) => ({
        ...database,
        vehicles: database.vehicles.filter((vehicle) => {
          const isVehicleToRemove = vehicle.id === vehicleId;
          if (isVehicleToRemove) {
            vehicleRemoved = vehicle;
          }
          return !isVehicleToRemove;
        }),
      })),
      switchMap(this.saveDatabase),
      map(() => vehicleRemoved || false)
    );
  }
}
