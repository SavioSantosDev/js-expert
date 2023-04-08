import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { CarCategory, Renting } from './models';
import { CarService, TransactionService } from './services';

type RequestListenerFn = (request: IncomingMessage, response: ServerResponse) => Promise<void>;

const DEFAULT_PORT = 3000;
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export class Api {
  constructor(private readonly carService: CarService, private readonly transactionService: TransactionService) {}

  initialize(port = DEFAULT_PORT): Server {
    const server = createServer(this.requestListener);
    return server.listen(port);
  }

  private requestListener: RequestListenerFn = (request, response) => {
    const { url, method } = request;
    const routeKey = `${url}:${method?.toLowerCase()}`;

    const route = this.routes[routeKey] || this.defultRoute;

    response.writeHead(200, DEFAULT_HEADERS);

    return route(request, response);
  };

  private get routes(): { [key: string]: RequestListenerFn } {
    return {
      [`${Api.Routes.GET_AVAILABLE_CAR}:post`]: this.getAvailableCar,
      [`${Api.Routes.GENERATE_TRANSACTION_RECEIPT}:post`]: this.generateTransactionReceipt,
    };
  }

  private getAvailableCar: RequestListenerFn = async (request, response) => {
    for await (const data of request) {
      try {
        const carCategory: CarCategory = JSON.parse(data);
        // alguma validacao top aqui

        const result = await this.carService.getAvailableCar(carCategory);
        this.returnSuccess(response, result);
      } catch (error) {
        this.returnError(response, error);
      }
    }
  };

  private generateTransactionReceipt: RequestListenerFn = async (request, response) => {
    for await (const data of request) {
      try {
        const renting: Renting = JSON.parse(data);
        // alguma validacao top aqui

        const result = await this.transactionService.calculateTransactionByRenting(renting);
        this.returnSuccess(response, result);
      } catch (error) {
        console.error(error);
        this.returnError(response, error);
      }
    }
  };

  private returnSuccess<R>(response: ServerResponse<IncomingMessage>, result: R) {
    response.writeHead(200, DEFAULT_HEADERS);
    response.write(JSON.stringify(result));
    response.end();
  }

  private returnError<E>(response: ServerResponse<IncomingMessage>, error: E) {
    // console.error('[Error]', error);
    response.writeHead(500, DEFAULT_HEADERS);
    response.write(JSON.stringify({ error: 'Deu Ruim!' }));
    response.end();
  }

  private defultRoute: RequestListenerFn = async (_, response) => {
    response.write(JSON.stringify({ success: 'Hello World!' }));
    response.end();
  };
}

export namespace Api {
  export enum Routes {
    GET_AVAILABLE_CAR = '/get-available-car',
    GENERATE_TRANSACTION_RECEIPT = '/generate-transaction-receipt',
  }
}
