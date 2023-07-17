import { stdin as input, stdout as output } from 'node:process';
import readline from 'readline';
import { PrinterServiceImpl, TerminalServiceImpl, VehicleServiceImpl } from './services';
import { VehiclesCatalogComponent } from './components';

const printerService = new PrinterServiceImpl();

// Estava tendo um problema do valor sendo imprimido duas vezes no terminal, com terminal: false resolveu!
// private readonly terminal = readline.createInterface({ input, output, terminal: false });
const terminal = readline.createInterface({ input, output, terminal: false });
const terminalService = new TerminalServiceImpl(terminal);
const vechicleService = new VehicleServiceImpl();

const component = new VehiclesCatalogComponent(printerService, terminalService, vechicleService);
component.initialize();
