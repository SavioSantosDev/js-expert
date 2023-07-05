import { PrinterService } from '../models';

export class PrinterServiceMock implements PrinterService {
  readonly printWelcomeMessage = jest.fn().mockImplementation(() => null);
}
