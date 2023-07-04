import chalk from 'chalk';

export default class PrinterComponent {
  private readonly LINE_WIDTH = 100;
  private readonly CHAR_LINES = '-';

  printWelcomeMessage(username: string) {
    this.printLines();
    console.log(`Seja muito bem vindo: ${chalk.bold.blue(username)}`);
    this.printLines();
  }

  private printLines(): void {
    const lines = chalk.bold(Array(this.LINE_WIDTH).join(this.CHAR_LINES));
    console.log('\n' + lines + '\n');
  }
}
