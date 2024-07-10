import Benchmark from 'benchmark';
import { randomUUID } from 'crypto';
import { v4 as uuid } from 'uuid';

class WithUUID {
  constructor() {
    this.id = uuid();
  }
}

class WithCrypto {
  constructor() {
    this.id = randomUUID();
  }
}

const suite = new Benchmark.Suite();

suite
  .add('#WithUUID', () => {
    new WithUUID();
  })
  .add('#WithCrypto', () => {
    new WithCrypto();
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
