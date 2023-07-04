import { stdin as input, stdout as output } from 'node:process';
import readline from 'readline';
import PrinterComponent from './classes/printer-component/printer-component';
import TerminalController from './classes/terminal-controller/terminal-controller';
import { Observable, take, tap } from 'rxjs';

export default class App {
  constructor(
    private readonly printerComponent: PrinterComponent,
    private readonly terminalController: TerminalController
  ) {
    this.handleWelcomeMessage()
      .pipe(take(1))
      .subscribe({
        complete: () => this.terminalController.close(),
      });
  }

  private handleWelcomeMessage(): Observable<string> {
    return this.askAQuestion('Qual o seu nome? ').pipe(tap(this.print));
  }

  private askAQuestion(question: string): Observable<string> {
    return this.terminalController.question(question);
  }

  private print = (text: string): void => {
    this.printerComponent.printWelcomeMessage(text);
  };
}

const printerComponent = new PrinterComponent();

// Estava tendo um problema do valor sendo imprimido duas vezes no terminal, com terminal: false resolveu!
// private readonly terminal = readline.createInterface({ input, output, terminal: false });
const terminal = readline.createInterface({ input, output, terminal: false });
const terminalController = new TerminalController(terminal);

const app = new App(printerComponent, terminalController);

// Para funcionar essa sintaxe de chamar o await fora do async deve utilizar a flag --experimental-top-level-await no package.json
// await app.initialize();
