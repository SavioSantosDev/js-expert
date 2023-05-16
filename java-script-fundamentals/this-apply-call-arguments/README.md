# This, apply, call, arguments

### Função que monitora as alterações no arquivo atual e printa o conteúdo do arquivo

```javascript
const { watch, promises } = require('fs');

// __filename = é o caminho para o arquivo atual
// watch = Recebe o path do arquivo ou diretório a ser monitorado e a função que será executada a cada evento

watch(__filename, async (event, filename) => {
  console.log((await promises.readFile(filename)).toString());
});
```

### "Mockar" métodos de uma função

```javascript
class HelloWorld {
  print(...params) {
    console.log(this.getHelloWord(), ...params);
  }

  getHelloWord() {
    return 'Hello World!';
  }
}

const helloWorld = new HelloWorld();
helloWorld.print(1, 2, 3); // Hello World! 1 2 3
helloWorld.print.call({ getHelloWord: () => 'Batatinha!' }, 1, 2, 3); // Batatinha! 1 2 3
helloWorld.print.apply(helloWorld, [1, 2, 3]); // Hello World! 1 2 3
```

No exemplo acima, basicamente estamos chamando `print.call` e modificando a referência de `this`. O `apply` faz a mesma coisa, a diferença é que passamos os parâmetros em um array ao invés de separar por vírgula.

### Contexto do this e bind

```javascript
class File {
  watch(event, filename) {
    console.log('this', this);
    console.log('arguments', Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await promises.readFile(filename)).toString());
  }
}

const file = new File();

// Dessa forma, ele ignora o 'this' da classe File e herda o this do watch
watch(__filename, file.watch);

// Alternativa para nao herdar o this da função
watch(__filename, (event, filename) => file.watch(event, filename));

// Podemos deixar explicito qual é o contexto que a funçao deve seguir
// o bind retorna uma função com o 'this' que se mantém de file, ignorando o watch
watch(__filename, file.watch.bind(file));

// Outra forma seria converter o método "watch" da classe para uma arrow function:
class File {
  watch = (event, filename) => {
    console.log('this', this);
    // console.log('arguments', Array.prototype.slice.call(arguments));
    // arguments só está disponível em métodos de classe ou em funções (function())
    this.showContent(filename);
  };

  async showContent(filename) {
    console.log((await promises.readFile(filename)).toString());
  }
}

const file = new File();

// Dessa forma, o this se refere a classe File!
watch(__filename, file.watch);
```
