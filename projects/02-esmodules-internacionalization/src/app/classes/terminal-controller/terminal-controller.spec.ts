import { createInterface, Interface } from 'readline';
import TerminalController from './terminal-controller';
import { stdin as input, stdout as output } from 'node:process';
import { Abortable } from 'events';

describe(TerminalController.name, () => {
  let terminalController: TerminalController;

  let readlineInterface: Interface;

  beforeEach(() => {
    readlineInterface = createInterface({ input });

    terminalController = new TerminalController(readlineInterface);
  });

  afterEach(() => readlineInterface.close());

  describe('Given a question', () => {
    const question = 'Whats your name?';

    let questionResponse: string;
    let questionSpy: jest.SpyInstance;
    let questionCallback: (answer: string) => void;

    beforeEach(() => {
      questionCallback = () => null;
      questionSpy = (jest.spyOn(readlineInterface, 'question') as jest.SpyInstance).mockImplementation(
        (_, cb) => (questionCallback = cb)
      );

      terminalController.question(question).subscribe({ next: (q) => (questionResponse = q) });
    });

    it('Should call the "question" method of readline interface', () => {
      expect(questionSpy).toBeCalledTimes(1);
      expect(questionSpy).toBeCalledWith(question, expect.any(Function));
    });

    describe('When the question is answered', () => {
      const answer = 'My name is Foo!';

      beforeEach(() => {
        questionCallback(answer);
      });

      it('Should return the answer', () => {
        expect(questionResponse).toBe(answer);
      });
    });
  });
});
