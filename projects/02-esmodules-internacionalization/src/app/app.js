// import Draftlog from 'draftlog';
import ChalkTable from 'chalk-table';
import readline from 'readline';
// import database from '../database.json' assert { type: 'json' };
// import Person from './classes/person/person.js';
import { stdin as input, stdout as output } from 'node:process';
import PrinterComponent from './classes/printer-component/printer-component.js';
import Dialog from './constants/dialog.js';

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
  constructor({ printerComponent, terminalController }) {
    this.printerComponent = printerComponent;
    this.terminalController = terminalController;
  }

  async initialize() {
    const nome = this.terminalController.question(msg);
    console.log({ nome });
    this.printerComponent.printWelcomeMessage(nome);

    // return this.menuLopp();
  }

  // async #question(msg) {
  //   await this.terminalController.question(msg);
  // }

  // async menuLopp() {
  //   const response = await this.#question(Dialog.LIST_MENU_AND_ASK_BY_OPTION);
  //   console.log({ response });

  //   if (Number(response) === 1) {
  //     showVehiclesCatalog();
  //   }

  //   if (response.toLowerCase() === 'q') {
  //     terminal.close();
  //     return;
  //   }

  //   return menuLopp();
  // }
}

// Para funcionar essa sintaxe de chamar o await fora do async deve utilizar a flag --experimental-top-level-await no package.json
// const printerComponent = new PrinterComponent();
// const app = new App(printerComponent);
// await app.initialize();
