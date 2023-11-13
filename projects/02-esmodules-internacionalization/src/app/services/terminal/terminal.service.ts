import { Interface } from 'readline';
import { Observable, map } from 'rxjs';
import { TerminalService } from '../../models';

export class TerminalServiceImpl implements TerminalService {
  constructor(private readonly terminal: Interface) {}

  question(msg: string): Observable<string> {
    return new Observable((observer) => {
      this.terminal.question(msg, (response) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  confirm(msg: string): Observable<boolean> {
    return this.question(msg).pipe(map((answer) => answer === 's'));
  }

  close(): void {
    this.terminal.close();
  }
}
