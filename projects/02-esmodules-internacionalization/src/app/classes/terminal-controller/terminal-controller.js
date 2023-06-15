import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

export default class TerminalController {
  #terminal;

  constructor() {
    this.#initializeTerminal();
  }

  // Estava tendo um problema do valor sendo imprimido duas vezes no terminal, com terminal: false resolveu!
  #initializeTerminal() {
    this.#terminal = readline.createInterface({ input, output, terminal: false });
  }

  async question(msg) {
    return new Promise((resolve) => this.#terminal.question(msg, resolve));
  }
}
