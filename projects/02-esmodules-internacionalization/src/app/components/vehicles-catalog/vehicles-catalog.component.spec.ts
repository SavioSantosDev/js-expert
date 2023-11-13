import { Subject, take } from 'rxjs';
import { Vehicle } from 'src/app/classes';
import { Dialog } from 'src/app/constants';
import { PrinterServiceMock, TerminalServiceMock, VehicleMock, VehicleServiceMock } from 'src/app/mocks';
import { VehicleCatalogMenu } from 'src/app/models';
import { VehiclesCatalogComponent } from './vehicles-catalog.component';

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
      beforeEach(() => {
        terminalServiceMock.question.mockClear();
        terminalServiceMock.question$.next(VehicleCatalogMenu.LIST);
      });

      it('Should list the vehicles registered', () => {
        expect(vehicleServiceMock.listAllVehicles).toBeCalledTimes(1);
      });

      describe('If dont have any vehicle registered', () => {
        beforeEach(() => {
          vehicleServiceMock.listAllVehicles$.next([]);
        });

        it('Should display an empty list message, and, display the options list again', () => {
          expect(printerServiceMock.printNormalMessage).toBeCalledTimes(1);
          expect(printerServiceMock.printNormalMessage).toBeCalledWith(Dialog.VEHICLE_EMPTY_LIST_MESSAGE);

          expect(terminalServiceMock.question).toBeCalledTimes(1);
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.LIST_MENU_AND_ASK_BY_OPTION);
        });
      });

      describe('If there are registered vehicles', () => {
        const vehicles = VehicleMock.getList(10);

        beforeEach(() => {
          vehicleServiceMock.listAllVehicles$.next(vehicles);
        });

        it('Should display the table of all vehicles registered, and, display the options list again', () => {
          expect(printerServiceMock.printTable).toBeCalledTimes(1);
          expect(printerServiceMock.printTable).toBeCalledWith(
            Vehicle.tableOptions,
            vehicles.map((v) => v.format('pt-br'))
          );

          expect(terminalServiceMock.question).toBeCalledTimes(1);
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.LIST_MENU_AND_ASK_BY_OPTION);
        });
      });
    });

    describe('When the user register an vehicle', () => {
      let questions: Subject<string>[];

      beforeEach(() => {
        questions = [];

        terminalServiceMock.question.mockClear();
        terminalServiceMock.question.mockImplementation((q) => {
          const question = new Subject<string>();
          questions.push(question);
          return question.pipe(take(1));
        });

        terminalServiceMock.question$.next(VehicleCatalogMenu.ADD);
      });

      describe('And answer all questions correctly', () => {
        const [name, colors, kmTravelled, manufacturingDate] = ['Mercedez', 'Branco, Preto', '20', '01-01-2023'];

        const vehicleRegistered = new Vehicle({
          name,
          colors: ['Branco', 'Preto'],
          kmTravelled: 20,
          manufacturingDate: '01-01-2023',
          ...({} as any),
        });

        beforeEach(() => {
          questions[0].next(name);
          questions[1].next(colors);
          questions[2].next(kmTravelled);
          questions[3].next(manufacturingDate);

          terminalServiceMock.confirm$.next(true);

          vehicleServiceMock.save$.next(vehicleRegistered);
        });

        it('Should request the all vehicle properties', () => {
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.RegisterVehicle.ASK_BY_NAME);
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.RegisterVehicle.ASK_BY_COLORS);
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.RegisterVehicle.ASK_BY_KM_TRAVALLED);
          expect(terminalServiceMock.question).toBeCalledWith(Dialog.RegisterVehicle.ASK_BY_MANUFACTURING_DATE);
          expect(terminalServiceMock.confirm).toBeCalledWith(Dialog.RegisterVehicle.CONFIRM);
        });

        it('Should display the vehicle registered and list the options again', () => {
          expect(vehicleServiceMock.save).toBeCalledTimes(1);
          expect(vehicleServiceMock.save).toBeCalledWith(expect.any(Vehicle));

          expect(printerServiceMock.printTable).toBeCalledWith(Vehicle.tableOptions, [
            vehicleRegistered.format('pt-br'),
          ]);

          expect(terminalServiceMock.question).toBeCalledWith(Dialog.LIST_MENU_AND_ASK_BY_OPTION);
        });
      });
    });

    describe('When close the app', () => {
      beforeEach(() => {
        printerServiceMock.printWelcomeMessage.mockClear();

        terminalServiceMock.question$.next(VehicleCatalogMenu.CLOSE);
      });

      it('Should close the terminal nad complete all subscriptions', () => {
        expect(terminalServiceMock.close).toBeCalledTimes(1);

        terminalServiceMock.question$.next(VehicleCatalogMenu.LIST);
        expect(printerServiceMock.printNormalMessage).not.toBeCalled();
        expect(printerServiceMock.printTable).not.toBeCalled();
        expect(printerServiceMock.printWelcomeMessage).not.toBeCalled();
      });
    });
  });
});
