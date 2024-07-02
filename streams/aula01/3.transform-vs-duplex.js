import { Duplex } from 'stream';

let count = 0;
const server = new Duplex({
  objectMode: true, // Faz não precisar trabalhar com buffer => gasta mais memória
  encoding: 'utf-8',
  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Person[${count}]\n`);
        return;
      }
      clearInterval(intervalContext);
      this.push(null);
    };

    setInterval(() => everySecond(this));
  },

  // é como se fosse um objeto completamente diferente!
  write(chunk, encoding, cb) {
    console.log(`[Writable] saving\n`, chunk);
    cb();
  },
});

// Provar que são canais de comunicação diferentes!
// Aciona o write do Duple
server.write('[duplex] hey this is a writabe!\n');
// on data -> loga o que rolou no .push do read
// server.on('data', (msg) => console.log(`[readable]${msg}`));

// O push deixa enviar mais dados
server.push(`[duplex] hey this is also a readable!\n`);

server.pipe(process.stdout);
