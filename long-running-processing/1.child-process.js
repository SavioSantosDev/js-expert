import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';
import { createServer } from 'http';
import { pipeline } from 'stream/promises';

createServer(async (request, response) => {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(request, createWriteStream(fileName));

  response.end('upload with success!');
}).listen(3000, () => console.log('running 3000'));
