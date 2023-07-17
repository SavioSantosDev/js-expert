import { Chalk } from 'chalk';

export interface TableOptions {
  leftPad: number;
  columns: {
    field: string;
    name: string;
  }[];
}
