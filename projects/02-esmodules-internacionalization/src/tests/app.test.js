import { expect } from 'chai';
import sinon from 'sinon';
import { beforeEach, describe, it } from 'mocha';
import App from '../app/app.js';
import readline from 'readline';
import PrinterComponent from '../app/classes/printer-component/printer-component.js';

class ReadlineInterfaceMock {
  questionResponse;

  question = (msg, cb) => {
    this.questionResponse = cb;
  };
}

describe('Vehicles Catalog App', () => {
  let app;

  let sandbox;
  let readlineInterfaceMock;
  let questionSpy;
  let printHighlightSpy;

  const stupReadline = () => {
    readlineInterfaceMock = new ReadlineInterfaceMock();
    sandbox.stub(readline, 'createInterface').returns(readlineInterfaceMock);
    questionSpy = sandbox.spy(readlineInterfaceMock, 'question');
  };

  let printerComponent;

  beforeEach(() => {
    printerComponent = new PrinterComponent();

    sandbox = sinon.createSandbox();
    stupReadline();
    printHighlightSpy = sandbox.stub(printerComponent, 'printHighlight');

    app = new App(printerComponent);
  });

  afterEach(() => {
    // Necessário fazer o restore quando usamos o sinon para fazer o stub e spy
    sandbox.restore();
  });

  describe('Given the app inicialization', () => {
    beforeEach(() => {
      app.initialize();
    });

    it('Should ask for the username', () => {
      expect(questionSpy.calledOnceWith('Qual o seu nome? ')).to.be.true;
    });

    describe('When the user answer his name', () => {
      const username = 'User Mock';

      // Sem o async/await dá problema pois o it é executado antes da função verdadeira no componente
      // com isso o printHighlightSpy tem contagem de chamadas igual a 0
      beforeEach(async () => {
        await readlineInterfaceMock.questionResponse(username);
      });

      it('Should print a welcome message to the user', () => {
        expect(printHighlightSpy.calledOnce).to.be.true;
      });
    });
  });
});
