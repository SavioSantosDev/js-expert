import { Subject, take } from 'rxjs';
import { TerminalService } from '../models';

export class TerminalServiceMock implements TerminalService {
  readonly question$ = new Subject<string>();
  readonly question = jest.fn().mockImplementation(() => this.question$.pipe(take(1)));

  readonly close = jest.fn().mockImplementation(() => null);
}
