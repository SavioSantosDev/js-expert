import { Observable, take, tap } from 'rxjs';
import { Dialog } from 'src/app/constants';
import { PrinterService, TerminalService } from 'src/app/models';

export class VehiclesCatalogComponent {
  constructor(private readonly printerService: PrinterService, private readonly terminalService: TerminalService) {
    this.handleWelcomeMessage()
      .pipe(take(1))
      .subscribe({
        complete: () => this.terminalService.close(),
      });
  }

  private handleWelcomeMessage(): Observable<string> {
    return this.terminalService
      .question(Dialog.ASK_BY_NAME)
      .pipe(tap((name) => this.printerService.printWelcomeMessage(name)));
  }
}
