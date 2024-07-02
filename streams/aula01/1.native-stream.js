// process.stdin.pipe(process.stdout);
// Pega o que foi digitado (stdin) e imprime no terminal (stdout)

// As NodeJS Streams herdam a classe Events do Node
// process.stdin
//   .pipe(process.stdout)
//   .on('data', (buffer) => console.log({ buffer, message: buffer.toString() }))
//   .on('end', () => console.log('end'))
//   .on('close', () => console.log('close'));

// Criando stream de dados entre dois terminais
// Terminal 1: node -e "require('net').createServer(socket => socket.pipe(process.stdout)).listen(1338)"
// Terminal 2: node -e "process.stdin.pipe(require('net').connect(1338))"
// O que for digitado no terminal1, será printado no terminal 1.
// node -e, é node evaluate, basicamente vai ler o código que está entre string.

// Gerar arquivo grande (1e7 significa 1 com 7 zeros)
// node -e "process.stdout.write(crypto.randomBytes(1e7))" > big.file

//*** má prática para processar grandes arquivos pois lê arquivo em memória */

// import { readFileSync } from 'fs';
// import http from 'http';
// http
//   .createServer((req, res) => {
//     // const file = readFileSync('big.file');
//     const file = readFileSync('big.file').toString(); // Converte o buffer inteiro para string e vai dar erro dependendo do tamanho do arquivo.
//     res.write(file);
//     res.end();
//   })
//   .listen(3000, () => console.log('running at 3000'));
// curl localhost:3000 -o output.txt

/*** */
import { createReadStream } from 'fs';
import http from 'http';
http
  .createServer((req, res) => {
    createReadStream('big.file').pipe(res);
  })
  .listen(3000, () => console.log('running at 3000'));
