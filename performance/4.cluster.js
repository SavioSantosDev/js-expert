import cluster from 'cluster';
import { appendFile } from 'fs/promises';
import { createServer } from 'http';
import os from 'os';

function initializeServer() {
  createServer(async (request, response) => {
    await appendFile('./log.txt', `processed by ${process.pid} \n`);

    const result = Array.from({ length: 1e3 }, (_) => Math.floor(Math.random() * 40)).reduce(
      (result, current) => result + current,
      0
    );

    response.end(result.toString());
  }).listen(3000, () => console.log(`Server running at 3000 and pid ${process.pid}`));

  setTimeout(() => {
    process.exit(1);
  }, Math.random() * 1e4);
}

(() => {
  // Se não for o processo main, o orquestrador ele pode criar novas cópias
  if (!cluster.isPrimary) {
    initializeServer();
    return;
  }
  const cpusNumber = os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking server for ${cpusNumber} CPU\n`);

  for (let index = 0; index < cpusNumber; index++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
})();
