import { Observable, concat, map, of, reduce, switchMap, takeWhile, tap } from 'rxjs';
import { Vehicle } from '../../classes';
import { Dialog } from '../../constants';
import { PrinterService, TerminalService, VehicleCatalogMenu, VehicleService } from '../../models';

export class VehiclesCatalogComponent {
  constructor(
    private readonly printerService: PrinterService,
    private readonly terminalService: TerminalService,
    private readonly vehicleService: VehicleService
  ) {}

  initialize(): void {
    this.handleWelcomeMessage()
      .pipe(switchMap(this.showListMenuAndExecuteActionByOptionSelected))
      .subscribe({
        complete: () => this.terminalService.close(),
      });
  }

  private handleWelcomeMessage(): Observable<string> {
    return this.terminalService
      .question(Dialog.ASK_BY_NAME)
      .pipe(tap((name) => this.printerService.printWelcomeMessage(name)));
  }

  private showListMenuAndExecuteActionByOptionSelected = (): Observable<void> => {
    return this.terminalService.question(Dialog.LIST_MENU_AND_ASK_BY_OPTION).pipe(
      map(this.normalizeOption),
      takeWhile((option) => option !== VehicleCatalogMenu.CLOSE),
      switchMap(this.executeCallbackByOption),
      switchMap(() => this.showListMenuAndExecuteActionByOptionSelected())
    );
  };

  private normalizeOption = (optionSelected: string): string => (optionSelected || '').toLowerCase();

  private executeCallbackByOption = (optionSelected: string): Observable<void> => {
    const options: { [key in VehicleCatalogMenu]: () => Observable<void> } = {
      [VehicleCatalogMenu.LIST]: this.list,
      [VehicleCatalogMenu.ADD]: this.add,
      [VehicleCatalogMenu.UPDATE]: () => of(undefined),
      [VehicleCatalogMenu.DELETE]: () => of(undefined),
      [VehicleCatalogMenu.CLOSE]: () => of(undefined),
    };

    return optionSelected in options
      ? options[optionSelected as VehicleCatalogMenu]().pipe(switchMap(() => of(undefined)))
      : of(undefined);
  };

  private list = (): Observable<void> => {
    return this.vehicleService.listAllVehicles().pipe(
      map((vehicles) => vehicles.map((vehicle) => vehicle.format('pt-br'))),
      tap((vehicles) =>
        vehicles.length
          ? this.printerService.printTable(Vehicle.tableOptions, vehicles)
          : this.printerService.printNormalMessage(Dialog.VEHICLE_EMPTY_LIST_MESSAGE)
      ),
      map(() => undefined)
    );
  };

  private add = (): Observable<void> => {
    return concat(
      this.askByVehicleName(),
      this.askByVehicleColors(),
      this.askByVehicleKmTravalled(),
      this.askByVehicleManufacturingDate()
    ).pipe(
      reduce<Partial<Vehicle>, Partial<Vehicle>>((vehicleDto, answer) => ({ ...vehicleDto, ...answer }), {}),
      switchMap(this.confirmAndSaveVehicle),
      map(() => undefined)
    );
  };

  private askByVehicleName(): Observable<Partial<Vehicle>> {
    return this.terminalService.question(Dialog.RegisterVehicle.ASK_BY_NAME).pipe(map((name) => ({ name })));
  }

  private askByVehicleColors(): Observable<Partial<Vehicle>> {
    return this.terminalService
      .question(Dialog.RegisterVehicle.ASK_BY_COLORS)
      .pipe(map((colors) => ({ colors: colors.split(',') })));
  }

  private askByVehicleKmTravalled(): Observable<Partial<Vehicle>> {
    return this.terminalService.question(Dialog.RegisterVehicle.ASK_BY_KM_TRAVALLED).pipe(
      map(Number),
      map((kmTravelled) => ({ kmTravelled }))
    );
  }

  private askByVehicleManufacturingDate(): Observable<Partial<Vehicle>> {
    return this.terminalService
      .question(Dialog.RegisterVehicle.ASK_BY_MANUFACTURING_DATE)
      .pipe(map((manufacturingDate) => ({ manufacturingDate: new Date(manufacturingDate) })));
  }

  private confirmAndSaveVehicle = (vehicleDto: Partial<Vehicle>) => {
    return this.terminalService.confirm(Dialog.RegisterVehicle.CONFIRM).pipe(
      takeWhile((confirmed) => !!confirmed),
      switchMap(() => this.vehicleService.save(new Vehicle(vehicleDto))),
      tap((vehicle) => this.printerService.printTable(Vehicle.tableOptions, [vehicle.format('pt-br')]))
    );
  };
}
