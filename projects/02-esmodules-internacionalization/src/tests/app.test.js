import { expect } from 'chai';
import sinon from 'sinon';
import { beforeEach, describe, it } from 'mocha';
import App from '../app/app.js';
import readline from 'readline';
import PrinterComponent from '../app/classes/printer-component/printer-component.js';
import Dialog from '../app/constants/dialog.js';
import TerminalController from '../app/classes/terminal-controller/terminal-controller.js';

describe('Vehicles Catalog App', () => {
  let app;
  let sandbox;

  let printWelcomeMessageSpy;
  let questionSpy;

  let printerComponent;
  let terminalController;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    printerComponent = new PrinterComponent();
    terminalController = new TerminalController();

    printWelcomeMessageSpy = sandbox.stub(printerComponent, 'printWelcomeMessage');
    questionSpy = sandbox.stub(terminalController, 'question').callsFake(async (tes) => 'null');

    app = new App({
      printerComponent,
      terminalController: { question: console.log },
    });
  });

  afterEach(() => {
    // Necessário fazer o restore quando usamos o sinon para fazer o stub e spy
    sandbox.restore();
  });

  describe('Given the app inicialization', () => {
    beforeEach(() => {
      app.initialize();
    });

    // it('Should ask for the username', () => {
    //   expect(questionSpy.calledOnceWith(Dialog.ASK_BY_NAME)).to.be.true;
    // });

    describe('When the user answer his name', () => {
      const username = 'User Mock';

      // Sem o async/await dá problema pois o it é executado antes da função verdadeira no componente
      // com isso o spy tem contagem de chamadas igual a 0
      beforeEach(() => {
        // questionSpy.rejects('username');
      });

      it('Should print a welcome message to the user', () => {
        console.log('it (teste)');
        expect(printWelcomeMessageSpy.calledOnceWith(username)).to.be.true;
      });
    });
  });

  // describe('Given an user that initialized the app', () => {
  //   const user = 'User Mock';

  //   beforeEach(async () => {
  //     app.initialize();
  //     await readlineInterfaceMock.questionResponse(user);
  //   });

  //   it('Should show the menu options and question what option the user should chosen', () => {
  //     expect(questionSpy.calledOnceWith(Dialog.LIST_MENU_AND_ASK_BY_OPTION)).to.be.true;
  //   });

  //   describe('When chosen option 1: "Exibir catálogo de veículos"', () => {
  //     describe('If has no vehicles in database', () => {
  //       it('Should print a message that has no vehicles available', () => {
  //         expect();
  //       });
  //     });

  //     describe('If has vehicles in database', () => {
  //       it('Should print, formatted, the list of vehicles', () => {});
  //     });
  //   });

  //   describe('When chosen option Q: Sair', () => {
  //     it('Should close the terminal', () => {});
  //   });
  // });
});
