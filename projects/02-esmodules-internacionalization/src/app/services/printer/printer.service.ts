import chalk from 'chalk';
import { PrinterService } from 'src/app/models';

export class PrinterServiceImpl implements PrinterService {
  private readonly LINE_WIDTH = 100;
  private readonly CHAR_LINES = '-';

  printHighlightMessage(username: string) {
    this.printLines();
    console.log(`Seja muito bem vindo: ${chalk.bold.blue(username)}`);
    this.printLines();
  }

  private printLines(): void {
    const lines = chalk.bold(Array(this.LINE_WIDTH).join(this.CHAR_LINES));
    console.log('\n' + lines + '\n');
  }
}
