import { TableOptions } from './table-options.model';

export interface PrinterService {
  printWelcomeMessage(name: string): void;

  printNormalMessage(message: string): void;

  printTable<T>(tableOptions: TableOptions, list: T[]): void;
}
