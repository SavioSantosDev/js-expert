'use strict';

const { watch, promises } = require('fs');

/**
 * watch, __filename e readFile
 */
// watch(__filename, async (event, filename) => {
//   console.log((await promises.readFile(filename)).toString());
// });

/**
 * call vs apply
 */

// class HelloWorld {
//   print(...params) {
//     console.log(this.getHelloWord(), ...params);
//   }

//   getHelloWord() {
//     return 'Hello World!';
//   }
// }

// const helloWorld = new HelloWorld();
// helloWorld.print(1, 2, 3);
// helloWorld.print.call({ getHelloWord: () => 'Batatinha!' }, 1, 2, 3);
// helloWorld.print.apply(helloWorld, [1, 2, 3]);

/**
 * this e bind
 */

class File1 {
  watch(event, filename) {
    console.log('this', this);
    console.log('arguments', Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await promises.readFile(filename)).toString());
  }
}

class File2 {
  watch = (event, filename) => {
    console.log('this', this);
    // console.log('arguments', Array.prototype.slice.call(arguments)); aruments now allowed in arrow functions, only in functions or class methods
    this.showContent(filename);
  };

  async showContent(filename) {
    console.log((await promises.readFile(filename)).toString());
  }
}

const file = new File1();
// dessa forma, ele ignora o 'this' da classe File
// herda o this do watch!
// watch(__filename, file.watch);

// alternativa para nao herdar o this da funcao
// mas fica feio!
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explicito qual é o contexto que a funçao deve seguir
// o bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
// watch(__filename, file.watch.bind(file))
