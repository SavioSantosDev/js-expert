import { stdin as input } from 'node:process';
import { createInterface, Interface } from 'readline';
import { Subject } from 'rxjs';
import { TerminalService } from '../../models';
import { TerminalServiceImpl } from './terminal.service';

describe(TerminalServiceImpl.name, () => {
  let terminalService: TerminalService;

  let readlineInterface: Interface;

  beforeEach(() => {
    readlineInterface = createInterface({ input });

    terminalService = new TerminalServiceImpl(readlineInterface);
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

      terminalService.question(question).subscribe({ next: (r) => (questionResponse = r) });
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

  describe('Given a confirmation question', () => {
    const question = 'Confirm? [S | N]';

    let question$: Subject<string>;
    let confirmationSpy: jest.Mock;

    beforeEach(() => {
      question$ = new Subject();
      jest.spyOn(terminalService, 'question').mockImplementation(() => question$);

      confirmationSpy = jest.fn();
      terminalService.confirm(question).subscribe({ next: confirmationSpy });
    });

    describe('When confirm', () => {
      beforeEach(() => {
        question$.next('s');
      });

      it('Should return true', () => {
        expect(confirmationSpy).toBeCalledTimes(1);
        expect(confirmationSpy).toBeCalledWith(true);
      });
    });

    describe('When decline', () => {
      beforeEach(() => {
        question$.next('n');
      });

      it('Should return false', () => {
        expect(confirmationSpy).toBeCalledTimes(1);
        expect(confirmationSpy).toBeCalledWith(false);
      });
    });
  });
});
