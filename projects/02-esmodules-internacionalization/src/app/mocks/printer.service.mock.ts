import { PrinterService } from '../models';

export class PrinterServiceMock implements PrinterService {
  readonly printWelcomeMessage = jest.fn().mockImplementation(() => null);

  readonly printNormalMessage = jest.fn().mockImplementation(() => null);

  readonly printTable = jest.fn().mockImplementation(() => null);
}
