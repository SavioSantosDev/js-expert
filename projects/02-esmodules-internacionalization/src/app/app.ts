import process from 'node:process';
import path from 'path';
import readline from 'readline';
import { VehiclesCatalogComponent } from './components';
import { PrinterServiceImpl, TerminalServiceImpl, VehicleServiceImpl } from './services';

const printerService = new PrinterServiceImpl();

// Estava tendo um problema do valor sendo imprimido duas vezes no terminal, com terminal: false resolveu!
// private readonly terminal = readline.createInterface({ input, output, terminal: false });
const terminal = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const terminalService = new TerminalServiceImpl(terminal);

const databaseFile = path.join(__dirname, 'database-mock.json');
const vechicleService = new VehicleServiceImpl(databaseFile);

const component = new VehiclesCatalogComponent(printerService, terminalService, vechicleService);
component.initialize();
