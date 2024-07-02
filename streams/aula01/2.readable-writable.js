import { createWriteStream } from 'fs';
import { Readable, Transform, Writable } from 'stream';

// Fonte de dados
const readable = Readable({
  read() {
    const tamanho = 1e6;

    // For é bloqueante
    for (let index = 0; index < tamanho; index++) {
      const person = { id: Date.now() + index, name: `Person-${index}` };
      const data = JSON.stringify(person);
      this.push(data);
    }

    // informa que os dados acabaram
    this.push(null);
  },
});

// Processamento dos dados
const mapFields = Transform({
  transform(chunk, encoding, cb) {
    const data = JSON.parse(chunk);
    const result = `${data.id},${data.name}\n`;

    // cb(erro, sucesso)
    cb(null, result);
  },
});

const mapHeaders = Transform({
  transform(chunk, encoding, cb) {
    this.counter = this.counter ?? 0;
    if (this.counter) {
      return cb(null, chunk);
    }

    this.counter += 1;
    cb(null, 'id,name\n'.concat(chunk));
  },
});

// Saída de dados
const writable = Writable({
  write(chunk, encoding, cb) {
    console.log(chunk.toString());
    cb();
  },
});

readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(writable);
  .pipe(createWriteStream('my.csv'))
  .on('end', () => console.log('Acabou'));
