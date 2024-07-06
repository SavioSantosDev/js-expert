import { pipeline } from 'stream/promises';
import { setTimeout } from 'timers/promises';

async function* myCustomReadable() {
  yield Buffer.from('this is my');
  await setTimeout(100);
  yield Buffer.from('custom readable');
}

async function* myCustomWritable(stream) {
  for await (const chunk of stream) {
    console.log({ writable: chunk.toString() });
  }
}

await pipeline(myCustomReadable, myCustomWritable);

console.log('Process finished!');
