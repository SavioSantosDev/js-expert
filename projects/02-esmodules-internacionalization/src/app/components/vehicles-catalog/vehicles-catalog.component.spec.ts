import { PrinterServiceMock, TerminalServiceMock, VehicleMock, VehicleServiceMock } from 'src/app/mocks';
import { VehiclesCatalogComponent } from './vehicles-catalog.component';
import { Dialog } from 'src/app/constants';
import exp from 'constants';
import { VehicleCatalogMenu } from 'src/app/models';
import { Vehicle } from 'src/app/classes';

describe('VehiclesCatalogComponent', () => {
  let component: VehiclesCatalogComponent;

  let printerServiceMock: PrinterServiceMock;
  let terminalServiceMock: TerminalServiceMock;
  let vehicleServiceMock: VehicleServiceMock;

  beforeEach(() => {
    printerServiceMock = new PrinterServiceMock();
    terminalServiceMock = new TerminalServiceMock();
    vehicleServiceMock = new VehicleServiceMock();

    component = new VehiclesCatalogComponent(printerServiceMock, terminalServiceMock, vehicleServiceMock);
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Given the component inicialization', () => {
    beforeEach(() => {
      component.initialize();
    });

    it('Should ask for the user name', () => {
      expect(terminalServiceMock.question).toBeCalledTimes(1);
      expect(terminalServiceMock.question).toBeCalledWith(Dialog.ASK_BY_NAME);
    });

    describe('When the user anwser his name', () => {
      const username = 'User First Name';

      beforeEach(() => {
        terminalServiceMock.question.mockClear();
        terminalServiceMock.question$.next(username);
      });

      it('Should print a highlight welcome message to the user', () => {
        expect(printerServiceMock.printWelcomeMessage).toBeCalledTimes(1);
        expect(printerServiceMock.printWelcomeMessage).toBeCalledWith(username);
      });

      it('Should display the list of available options', () => {
        expect(terminalServiceMock.question).toBeCalledTimes(1);
        expect(terminalServiceMock.question).toBeCalledWith(Dialog.LIST_MENU_AND_ASK_BY_OPTION);
      });
    });
  });

  describe('Given the list of available options', () => {
    const username = 'User First Name';

    beforeEach(() => {
      component.initialize();
      terminalServiceMock.question$.next(username);
    });

    describe('When the user list vehicles', () => {
      let vehicles: Vehicle[];

      beforeEach(() => {
        terminalServiceMock.question.mockClear();

        vehicleServiceMock.listAllVehicles.mockReturnValue(vehicles);
        terminalServiceMock.question$.next(VehicleCatalogMenu.LIST);
      });

      it('Should list the vehicles registered', () => {
        expect(vehicleServiceMock.listAllVehicles).toBeCalledTimes(1);
      });

      describe('If dont have any vehicle registered', () => {
        beforeAll(() => {
          vehicles = [];
        });

        it('Should display an empty list message', () => {
          expect(printerServiceMock.printNormalMessage).toBeCalledTimes(1);
          expect(printerServiceMock.printNormalMessage).toBeCalledWith(Dialog.VEHICLE_EMPTY_LIST_MESSAGE);
        });

        it('Should display the options list again', () => {
          expect(terminalServiceMock.question).toBeCalledTimes(1);
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.LIST_MENU_AND_ASK_BY_OPTION);
        });
      });

      describe('If there are registered vehicles', () => {
        beforeAll(() => {
          vehicles = VehicleMock.getList(10);
        });

        it('Should display the table of all vehicles registered', () => {
          expect(printerServiceMock.printTable).toBeCalledTimes(1);
          expect(printerServiceMock.printTable).toBeCalledWith(Vehicle.tableOptions, vehicles);
        });

        it('Should display the options list again', () => {
          expect(terminalServiceMock.question).toBeCalledTimes(1);
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.LIST_MENU_AND_ASK_BY_OPTION);
        });
      });
    });

    describe('When close de app', () => {
      beforeEach(() => {
        printerServiceMock.printWelcomeMessage.mockClear();

        terminalServiceMock.question$.next(VehicleCatalogMenu.CLOSE);
      });

      it('Should close the terminal', () => {
        expect(terminalServiceMock.close).toBeCalledTimes(1);
      });

      it('Should complete all subscriptions', () => {
        terminalServiceMock.question$.next(VehicleCatalogMenu.LIST);
        expect(printerServiceMock.printNormalMessage).not.toBeCalled();
        expect(printerServiceMock.printTable).not.toBeCalled();
        expect(printerServiceMock.printWelcomeMessage).not.toBeCalled();
      });
    });
  });
});
