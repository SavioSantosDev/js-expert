import { Interface } from 'readline';
import { Observable } from 'rxjs';
import { TerminalService } from 'src/app/models';

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

  close(): void {
    this.terminal.close();
  }
}
