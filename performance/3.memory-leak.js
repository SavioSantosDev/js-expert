import Events from 'events';
import { createServer } from 'http';

// const items = [];
// while (true) {
//   items.push(items);
// }
// node --max-old-space-size=64

// process.memoryUsage()

const myEvent = new Events();

function onData() {
  const items = [];
  setInterval(function myInterval() {
    items.push(Date.now());
  });
}

createServer(function handler(request, response) {
  myEvent.on('data', onData);
  myEvent.emit('data', Date.now());

  response.end('ok');
}).listen(3000, () => console.log('running at 3000'));
