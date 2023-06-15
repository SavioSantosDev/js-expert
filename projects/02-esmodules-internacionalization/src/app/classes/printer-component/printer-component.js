import chalk from 'chalk';

export default class PrinterComponent {
  #LINE_WIDTH = 100;

  printWelcomeMessage(username) {
    this.#printLines();
    console.log(`Seja muito bem vindo: ${chalk.bold.blue(username)}`);
    this.#printLines();
  }

  // printHighlight(msg) {
  //   this.#printLines();
  //   console.log(`Seja muito bem vindo: ${chalk.bold.blue(msg)}`);
  //   this.#printLines();
  // }

  #printLines() {
    const lines = chalk.bold(Array(this.#LINE_WIDTH).join('-'));
    console.log('\n' + lines + '\n');
  }
}
