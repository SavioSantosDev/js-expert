import { Vehicle } from '../classes';

export namespace VehicleMock {
  export const withId: Vehicle = { id: 1 } as Vehicle;

  export const withName: Vehicle = { id: 2, name: 'Foo Bar' } as Vehicle;

  export function getList(length: number): Vehicle[] {
    return Array.from(Array(length)).map(
      (_, index) =>
        new Vehicle({
          ...withId,
          id: index,
          colors: ['foo', 'bar'],
          kmTravelled: 1,
          manufacturingDate: new Date(),
          name: 'Foo Bar',
        })
    );
  }
}
