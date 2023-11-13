import { Vehicle, VehicleDto } from '../classes';

export namespace VehicleMock {
  export const withId: VehicleDto = { id: 1 } as VehicleDto;

  export function getList(length: number): Vehicle[] {
    return Array.from(Array(length)).map(
      (_, index) =>
        new Vehicle({
          ...withId,
          id: index,
          colors: ['foo', 'bar'],
          kmTravelled: 1,
          manufacturingDate: new Date().toJSON(),
          name: 'Foo Bar',
        })
    );
  }
}
