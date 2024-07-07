import { createServer } from 'http';
import { MongoClient } from 'mongodb';
import { setTimeout } from 'timers/promises';
import { promisify } from 'util';

async function dbConnect() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  console.log('mongodb is connected!');

  const db = client.db('comics');
  return {
    collections: { heroes: db.collection('heroes') },
    client,
  };
}

const { client, collections } = await dbConnect();

async function handler(request, response) {
  try {
    for await (const data of request) {
      const hero = JSON.parse(data);

      await collections.heroes.insertOne({ ...hero, updatedAt: new Date().toISOString() });
      const heroes = await collections.heroes.find().toArray();

      await setTimeout(5000);

      response.writeHead(200);
      response.write(JSON.stringify(heroes));
    }
  } catch (error) {
    console.log({ error });
    response.writeHead(500);
    response.write(JSON.stringify({ message: 'internal server error!' }));
  } finally {
    response.end();
  }
}

/**
 * curl -i localhost:3000 -X POST --data '{ "name": "Batman", "age": 80 }' | json
 * npm i -g json
 */
const server = createServer(handler).listen(3000, () => console.log('Running at 3000 and process', process.pid));

async function onStop(signal) {
  console.info(`\n${signal} signal received`);

  console.log('Closing http server');
  // Fecha o servidor para novas conexões e espera os processos existentes finalizarem.
  await promisify(server.close.bind(server))();
  console.log('Http server has closed!');

  await client.close();
  console.log('Mongo connection has closed.');

  // 0 - Tudo certo
  // 1 - Erro
  process.exit(0);
}

/**
 * SIGINT -> Ctrl C
 * SIGTERM -> kill
 */

process.on('SIGINT', onStop);
process.on('SIGTERM', onStop);

process.on('uncaughtException', (e) => {
  console.log({ uncaughtException: e });
});
