import { Interface } from 'readline';
import { Observable } from 'rxjs';

export default class TerminalController {
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
