import timers from 'timers/promises';

/**
 * O catch externo não consegue capturar erros lançados dentro do setTimout
 * por isso foi adicionado um try/catch interno.
 */
// try {
//   setTimeout(() => { // setTimout padrão do js
//     try {
//       throw new Error('Erro dentro do setTimeout');
//     } catch (error) {
//       console.log({ error: error.message });
//     }
//   }, 1000);
// } catch (error) {
//   console.log({ error: error.message });
// }

/**
 * Sem o "await Promise.all", vai logar o startProcess, o results como sendo um array de promises e depois o restante.
 * Com o "await Promise.all", vai logar o startProcess, os logs internos e por fim os results.
 */
// const results = ['1', '2'].map(async (item) => {
//   console.log('Starting process');
//   await timers.setTimeout(500);

//   console.log({ item });
//   console.log(await Promise.resolve('This is a async call'));

//   await timers.setTimeout(500);
//   console.count('debug');

//   return parseInt(item) * 2;
// });

// console.log({ results: await Promise.all(results) });

/**
 * Como vai dar um erro no meio do código, o restante não será executado.
 * O erro pode ser ouvido pelo evento: uncaughtException
 */
// setTimeout(async () => {
//   console.log('Starting process');
//   await timers.setTimeout(500);

//   console.log({ item }); // item não existe, vai dar um erro aqui.
//   console.log(await Promise.resolve('This is a async call'));

//   await timers.setTimeout(500);
//   console.count('debug');
// }, 1000);

// process.on('uncaughtException', (e) => {
//   console.log({ uncaughtException: e.message || e });
// });

setTimeout(async () => {
  console.log('Starting process');
  await timers.setTimeout(500);

  console.log(await Promise.resolve('This is a async call'));

  await timers.setTimeout(500);
  console.count('debug');

  await Promise.reject('This is a error!');
}, 1000);

process.on('unhandledRejection', (e) => {
  console.log({ unhandledRejection: e.message || e });
});
