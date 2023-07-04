import { createInterface, Interface } from 'readline';
import TerminalService from './terminal.service';
import { stdin as input } from 'node:process';

describe(TerminalService.name, () => {
  let terminalController: TerminalService;

  let readlineInterface: Interface;

  beforeEach(() => {
    readlineInterface = createInterface({ input });

    terminalController = new TerminalService(readlineInterface);
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

      terminalController.question(question).subscribe({ next: (r) => (questionResponse = r) });
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
