import Draftlog from 'draftlog';
import Chalk from 'chalk';
import ChalkTable from 'chalk-table';
import readline from 'readline';
import database from '../database.json' assert { type: 'json' };
import Person from './person/person.js';

const DEFAULT_LANGUAGE = 'pt-BR';

// Inicializando Draftlog
Draftlog(console).addLineListener(process.stdin);

const tableOptions = {
  leftPad: 2,
  columns: [
    { field: 'id', name: Chalk.cyan('ID') },
    { field: 'vehicles', name: Chalk.magenta('Vehicles') },
    { field: 'kmTravelled', name: Chalk.white('KM Travelled') },
    { field: 'from', name: Chalk.red('From') },
    { field: 'to', name: Chalk.blue('To') },
  ],
};

const table = ChalkTable(
  tableOptions,
  database.map((item) => new Person(item).formatted(DEFAULT_LANGUAGE))
);
console.draft(table); // draft() injetado pelo Draftlog

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const terminalController = new TerminalController();

async function mainLoop() {
  try {
    const answer = await terminalController.question('What');
    console.log({ answer });
  } catch (error) {
    console.error({ error });
  }
}

// Para funcionar essa sintaxe de chamar o await fora do async deve utilizar a flag --experimental-top-level-await no package.json
await mainLoop();
