import { PrinterServiceMock, TerminalServiceMock } from 'src/app/mocks';
import { VehiclesCatalogComponent } from './vehicles-catalog.component';
import { Dialog } from 'src/app/constants';

describe('VehiclesCatalogComponent', () => {
  let component: VehiclesCatalogComponent;

  let printerServiceMock: PrinterServiceMock;
  let terminalServiceMock: TerminalServiceMock;

  beforeEach(() => {
    printerServiceMock = new PrinterServiceMock();
    terminalServiceMock = new TerminalServiceMock();

    component = new VehiclesCatalogComponent(printerServiceMock, terminalServiceMock);
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should ask for the user name', () => {
    expect(terminalServiceMock.question).toBeCalledTimes(1);
    expect(terminalServiceMock.question).toBeCalledWith(Dialog.ASK_BY_NAME);
  });

  describe('When the user anwser his name', () => {
    const username = 'User First Name';

    beforeEach(() => {
      terminalServiceMock.question$.next(username);
    });

    it('Should print a highlight welcome message to the user', () => {
      expect(printerServiceMock.printWelcomeMessage).toBeCalledTimes(1);
      expect(printerServiceMock.printWelcomeMessage).toBeCalledWith(username);
    });
  });
});
