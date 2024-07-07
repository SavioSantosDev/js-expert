import http from 'http';

let count = 1;
async function handler(request, response) {
  count++;
  try {
    /**
     * Com node v14 (mesma do vídeo) fazendo a requisição "curl -i -X POST -d '{}' localhost:3000"
     * Não foi capturado o erro dentro do for mas o que está fora sim.
     * Na versão 18 do node, ambos os erros foram capturados normalmente.
     *
     * Sendo mais preciso, isso foi corrigido na versão 17: https://github.com/nodejs/node/issues/38262
     */
    await Promise.reject('error dentro do handler');

    for await (const data of request) {
      await Promise.reject('error dentro do for');
      // response.end();
    }
  } catch (error) {
    console.log({ serverError: error });
    response.writeHead(500);
    response.write(JSON.stringify({ message: 'internat server error!', error }));
    // response.end();
  } finally {
    response.end();
  }
}

http.createServer(handler).listen(3000, () => console.log('Running at 3000'));
