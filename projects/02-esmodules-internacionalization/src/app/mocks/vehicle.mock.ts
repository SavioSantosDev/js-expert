import { Vehicle } from '../classes';

export namespace VehicleMock {
  export const withId: Vehicle = { id: 1 } as Vehicle;

  export function getList(length: number): Vehicle[] {
    return Array.from(Array(length)).map((_, index) => ({ ...withId, id: index }));
  }
}
