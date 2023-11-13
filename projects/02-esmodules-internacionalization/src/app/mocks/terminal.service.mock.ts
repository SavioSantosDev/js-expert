import { Subject, take } from 'rxjs';
import { TerminalService } from '../models';

export class TerminalServiceMock implements TerminalService {
  readonly question$ = new Subject<string>();
  readonly question = jest.fn((q: string) => this.question$.pipe(take(1)));

  readonly confirm$ = new Subject<boolean>();
  readonly confirm = jest.fn((q: string) => this.confirm$.pipe(take(1)));

  readonly close = jest.fn(() => null);
}
