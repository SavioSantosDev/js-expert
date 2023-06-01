import chalk from 'chalk';

export default class PrinterComponent {
  #LINE_WIDTH = 100;

  #log;

  constructor() {
    this.#log = console.log;
  }

  printHighlight(msg) {
    this.#printLines();
    this.#log(`Seja muito bem vindo: ${chalk.bold.blue(msg)}`);
    this.#printLines();
  }

  #printLines() {
    const lines = chalk.bold(Array(this.#LINE_WIDTH).join('-'));
    this.#log('\n' + lines + '\n');
  }
}
