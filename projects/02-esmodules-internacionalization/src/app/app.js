// import Draftlog from 'draftlog';
// import ChalkTable from 'chalk-table';
import readline from 'readline';
// import database from '../database.json' assert { type: 'json' };
// import Person from './classes/person/person.js';
import { stdin as input, stdout as output } from 'node:process';
import PrinterComponent from './classes/printer-component/printer-component.js';

// import Vehicle from './classes/vehicle/vehicle.js';

// const terminalController = new TerminalController();

// Estava tendo um problema do valor sendo imprimido duas vezes no terminal, com terminal: false resolveu!
// const terminal = readline.createInterface({ input, output, terminal: false });
// const question = (msg) => {
//   return new Promise((resolve) => terminal.question(msg, resolve));
// };

// const log = console.log;

// async function mainLoop() {
//   try {
//     // const nome = await question('Qual o seu nome? ');

//     // log(chalk.bold('---------------------------'));
//     // log(`\nSeja muito bem vindo: ${chalk.bold.blue(nome)}\n`);
//     // log(chalk.bold('---------------------------'));

//     return menuLopp();
//   } catch (error) {
//     console.error({ error });
//   }
// }

// async function menuLopp() {
//   const response = await question(`
//   Selecione uma das opções abaixo:
//   [1] - Exibir catálogo de veículos
//   [2] - Adicionar veículo ao catálogo
//   [3] - Editar veículo existente
//   [4] - Excluir um veículo do catálogo
//   [Q] - Sair

//   : `);

//   if (Number(response) === 1) {
//     showVehiclesCatalog();
//   }

//   if (response.toLowerCase() === 'q') {
//     terminal.close();
//     return;
//   }

//   return menuLopp();
// }

// const DEFAULT_LANGUAGE = 'pt-BR';

// // Inicializando Draftlog
// Draftlog(console).addLineListener(process.stdin);

// const tableOptions = {
//   leftPad: 2,
//   columns: [
//     { field: 'id', name: chalk.cyan('ID') },
//     { field: 'name', name: chalk.magenta('Nome') },
//     { field: 'colors', name: chalk.magenta('Cores disponíveis') },
//     { field: 'kmTravelled', name: chalk.white('KM Viajados') },
//     { field: 'manufacturingDate', name: chalk.red('Data de fabricação') },
//   ],
// };

// // black
// // red
// // green
// // yellow
// // blue
// // magenta
// // cyan
// // white
// // blackBright (alias: gray, grey)
// // redBright
// // greenBright
// // yellowBright
// // blueBright
// // magentaBright
// // cyanBright
// // whiteBright

// function showVehiclesCatalog() {
//   const vehicles = database.map((item) => new Vehicle(item));

//   if (vehicles.length) {
//     const table = ChalkTable(tableOptions, vehicles);
//     console.draft(table); // draft() injetado pelo Draftlog
//     return;
//   }

//   log('Sem veículos');
// }

export default class App {
  constructor(printerComponent) {
    this.printerComponent = printerComponent;
  }

  async initialize() {
    const terminal = readline.createInterface({ input, output, terminal: false });
    const question = (msg) => {
      return new Promise((resolve) => terminal.question(msg, resolve));
    };

    const nome = await question('Qual o seu nome? ');
    this.printerComponent.printHighlight(nome);
  }
}

// Para funcionar essa sintaxe de chamar o await fora do async deve utilizar a flag --experimental-top-level-await no package.json
// const printerComponent = new PrinterComponent();
// const app = new App(printerComponent);
// await app.initialize();
