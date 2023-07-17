import { Observable } from 'rxjs';
import { writeFile, readFile } from 'fs/promises';
import { VehicleService } from '../../models';
import { Vehicle } from '../../classes';
import database from '../../../database/vehicles.json';

export class VehicleServiceImpl implements VehicleService {
  listAllVehicles(): Vehicle[] {
    return database.map((item) => new Vehicle(item));
  }

  // export const save = async (data) => {
  //   // Não tem __filename e __dirname

  //   const { pathname: databaseFile } = new URL('./../database.json', import.meta.url);
  //   const currentData = JSON.parse(await readFile(databaseFile));
  //   currentData.push(data);

  //   await writeFile(databaseFile, JSON.stringify(currentData));
  // };
}
