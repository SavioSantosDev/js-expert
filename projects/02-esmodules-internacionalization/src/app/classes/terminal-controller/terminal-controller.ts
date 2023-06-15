import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { Observable } from 'rxjs';

export default class TerminalController {
  // Estava tendo um problema do valor sendo imprimido duas vezes no terminal, com terminal: false resolveu!
  private readonly terminal = readline.createInterface({ input, output, terminal: false });

  question(msg: string): Observable<string> {
    return new Observable((observer) => {
      this.terminal.question(msg, (response) => {
        observer.next(response);
        observer.complete();
      });
    });
  }
}
