import { openStdin } from 'node:process';
import { Observable, map, of, repeat, switchAll, switchMap, take, takeWhile, tap } from 'rxjs';
import { PrinterService, TerminalService, VehicleCatalogMenu, VehicleService } from '../../models';
import { Dialog } from '../../constants';
import { Vehicle } from '../../classes';

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

  private showListMenuAndExecuteActionByOptionSelected = () => {
    return of(null).pipe(
      switchMap(() => this.terminalService.question(Dialog.LIST_MENU_AND_ASK_BY_OPTION)),
      repeat(),
      map(this.normalizeOption),
      takeWhile((option) => option !== VehicleCatalogMenu.CLOSE),
      tap(this.executeCallbackByOption)
    );
  };

  private normalizeOption = (optionSelected: string): string => (optionSelected || '').toLowerCase();

  private executeCallbackByOption = (optionSelected: string) => {
    const options: { [key in VehicleCatalogMenu]: () => void } = {
      [VehicleCatalogMenu.LIST]: this.list,
      [VehicleCatalogMenu.ADD]: () => null,
      [VehicleCatalogMenu.UPDATE]: () => null,
      [VehicleCatalogMenu.DELETE]: () => null,
      [VehicleCatalogMenu.CLOSE]: () => null,
    };

    optionSelected in options && options[optionSelected as VehicleCatalogMenu]();
  };

  private list = () => {
    const vehicles = this.vehicleService.listAllVehicles() || [];

    vehicles.length
      ? this.printerService.printTable(Vehicle.tableOptions, vehicles)
      : this.printerService.printNormalMessage(Dialog.VEHICLE_EMPTY_LIST_MESSAGE);
  };
}
