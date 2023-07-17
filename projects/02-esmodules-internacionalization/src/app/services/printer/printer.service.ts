import chalk from 'chalk';
// @ts-ignore
import ChalkTable from 'chalk-table';
import { PrinterService } from '../../models';
import DraftLog from 'draftlog';

export class PrinterServiceImpl implements PrinterService {
  private readonly LINE_WIDTH = 100;
  private readonly CHAR_LINES = '-';

  constructor() {
    DraftLog(console).addLineListener(process.stdin);
  }

  printWelcomeMessage(username: string) {
    this.printLines();
    console.log(`Seja muito bem vindo: ${chalk.bold.blue(username)}`);
    this.printLines();
  }

  private printLines(): void {
    const lines = chalk.bold(Array(this.LINE_WIDTH).join(this.CHAR_LINES));
    console.log('\n' + lines + '\n');
  }

  printNormalMessage(message: string): void {
    this.printLines();
    console.log(message);
    this.printLines();
  }

  printTable<T>(tableOptions: any, list: T[]): void {
    const table = ChalkTable(tableOptions, list);
    console.draft(table); // draft() injetado pelo Draftlog
  }
}
