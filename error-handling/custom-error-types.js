import { createServer } from 'http';

class BaseError extends Error {
  constructor({ name, message }) {
    super(message);
    this.name = name;
  }
}

class BusinessError extends BaseError {
  constructor(message) {
    super({ name: BusinessError.name, message });
  }
}

function validateHero(hero) {
  if (hero.age < 20) {
    throw new BusinessError('age must be higher that 20!');
  }

  if (hero.name?.length < 4) {
    throw new BusinessError('name lenght must be higher than 4!');
  }

  // Simulando outro erro, por exemplo de banco de dados
  if (Reflect.has(hero, 'connectionError')) {
    throw new Error('Error connecting to DB!');
  }
}

async function handler(request, response) {
  try {
    for await (const data of request) {
      const hero = JSON.parse(data);
      validateHero(hero);

      response.writeHead(200);
    }
  } catch (error) {
    if (error instanceof BusinessError) {
      response.writeHead(400);
      response.write(error.message);
    } else {
      console.error({ internalServerError: error });
      response.writeHead(500);
    }
  } finally {
    response.end();
  }
}

createServer(handler).listen(3000, () => console.log('running at 3000 and process ', process.pid));

/**
 * curl -i localhost:3000 -X POST -- data '{ "name": "Vingador", "age": 58 }'
 */
