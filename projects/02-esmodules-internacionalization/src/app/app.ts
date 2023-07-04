import { stdin as input, stdout as output } from 'node:process';
import readline from 'readline';
import VehiclesCatalogComponent from './components/vehicles-catalog/vehicles-catalog.component';
import { PrinterServiceImpl, TerminalServiceImpl } from './services';

const printerService = new PrinterServiceImpl();

// Estava tendo um problema do valor sendo imprimido duas vezes no terminal, com terminal: false resolveu!
// private readonly terminal = readline.createInterface({ input, output, terminal: false });
const terminal = readline.createInterface({ input, output, terminal: false });
const terminalService = new TerminalServiceImpl(terminal);

new VehiclesCatalogComponent(printerService, terminalService);
