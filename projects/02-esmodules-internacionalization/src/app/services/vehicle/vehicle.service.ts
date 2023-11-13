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
    return this.readFile().pipe(map(({ vehicles }) => vehicles.map((item) => new Vehicle(item))));
  }

  save(vehicle: Vehicle): Observable<Vehicle> {
    return this.readFile().pipe(
      tap((database) => (vehicle.id = database.sequence + 1)),
      tap((currentData) => currentData.vehicles.push(vehicle)),
      switchMap(this.writeFile),
      take(1),
      map(() => vehicle)
    );
  }

  private getNexId(database: Database): number {
    return database.sequence + 1;
  }

  private readFile(): Observable<Database> {
    return from(readFile(this.dataBasePath)).pipe(map((file) => JSON.parse(file as any)));
  }

  private writeFile = (database: Database): Promise<void> => {
    database.sequence++;
    return writeFile(this.dataBasePath, JSON.stringify(database));
  };
}
