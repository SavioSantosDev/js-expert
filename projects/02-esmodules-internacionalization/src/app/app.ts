import { stdin as input, stdout as output } from 'node:process';
import readline from 'readline';
import PrinterComponent from './classes/printer-component/printer-component';

export default class App {
  constructor(private readonly printerComponent: PrinterComponent) {}

  async initialize() {
    const terminal = readline.createInterface({ input, output, terminal: false });
    const question = (msg: string) => {
      return new Promise((resolve) => terminal.question(msg, resolve));
    };

    const nome = await question('Qual o seu nome? ');
    this.printerComponent.printWelcomeMessage(nome);
  }
}

// Para funcionar essa sintaxe de chamar o await fora do async deve utilizar a flag --experimental-top-level-await no package.json
const printerComponent = new PrinterComponent();
const app = new App(printerComponent);
await app.initialize();
