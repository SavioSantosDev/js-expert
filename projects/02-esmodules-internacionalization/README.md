# Projeto 02: ES Modules e Internacionalization

Projeto de linha de comando onde o usuário submete os valores no terminal, imprimimos as informações em formato de tabela e salvamos em um arquivo json.

- Deve Utilizar a API de internacionalization para formatar dados de moedas, datas, conjuntos de dados...
- Utilizar EcmaScript modules. Necessário Node.js versão 14.3 ou superior

## Vehicles Catalog

Desenvolver aplicação via linha de comando para permitir o usuário cadastrar veiculos em um arquivo .json.

Cada veículo deve ter: Id, Nome, Cores disponíveis, Data de fabricação, KM rodados e atributos de controle (quem e quando foi criado).

1 - Deve inicializar perguntando o nome do usuário.
2 - Após digitar o nome, deve imprimir uma mensagem de boas vindas.

Após inicializado a aplicação, deve, a toda pergunta, exibir uma lista de opções:

### 1: Exibir lista de veículos

- Se não houverem dados, exibir a mensagem: "Nenhum veículo cadastrado. Digite "2" para cadastrar um novo veículo.
- Se houverem dados, exibir em formato de tabelas todas as informações formatadas.

### 2: Salvar um novo registro

- Deve perguntar o Nome, Cores disponíveis (separado por vírgula), Data de fabricação (DD/MM/YYYY ou DD-MM-YYYY) e KM rodados
- Todos os campos são obrigatórios, caso tecle enter com um campo vazio, deve perguntar novamente o campo.
- Após preencher todos os campos, deve perguntar: "Confirma o cadastro do veículo com nome {{ nome digitado }}? [S - Sim] [N - Não]"
- Confirmando a operação, deve printar uma mensagem "Veículo cadastrado com sucesso:" e uma tabela apenas com o registro salvo.
- Exibir as opções novamente.

### 3: Editar um registro existente

- Deve perguntar: "Qual o ID do veículo que deseja editar?"
- Imprimir mensagem "Veículo não encontrado com ID { id }" caso não exista o veículo
- Exibir os mesmos campos de cadastro e a linha de confirmação perguntando: "Confirma as alterações feitas? [S - Sim] [N - Não]"

### 4: Excluir

- Deve perguntar: "Qual o ID do veículo que deseja excluir?"
- Imprimir mensagem "Veículo não encontrado com ID { id }" caso não exista o veículo
- Deve imprimir o veículo localizado e uma mensagem de confirmação: "Confirma exclusão do veículo acima? [S - Sim] [N - Não]"

### Q: Sair

Imprime uma mensagem de agradecimento e finaliza a aplicação

## Dependências

- [draftlog](https://github.com/ivanseidel/node-draftlog): Create mutable log lines into the terminal, and give life to your logs!
- [chalk](https://github.com/chalk/chalk): Terminal string styling done right.
- [chalk-table](https://github.com/baeyun/chalk-table): A mini terminal table tool with chalk support out of the box.

## Anotações

Não conseguimos utilizar a sintaxe `import` em arquivos que não são módulos. Para dizer que o arquivo é um modulo, deve adicionar a linha `"type": "module"` ao `package.json`.

Não aconteceu no vídeo, mas para importar o arquivo json foi necessário fazer da seguinte forma: `import database from '../database.json' assert { type: 'json' };`

`readline` que recebe o input do usuário via terminal

[Intl.ListFormat](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)

```javascript
const list = ['Moto', 'Ônibus', 'Carro'];

console.log(new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(list));
// > Moto, Ônibus e Carro

console.log(new Intl.ListFormat('pt-BR', { style: 'short', type: 'disjunction' }).format(list));
// > Moto, Ônibus ou Carro

console.log(new Intl.ListFormat('pt-BR', { style: 'narrow', type: 'unit' }).format(list));
// > Moto Ônibus Carro
```

[Intl.NumberFormat](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

```javascript
const numero = 123456.789;

// informando um formato de moeda
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(numero));
// → 123.456,79 €

// o yen japonês não tem uma unidade menor
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(numero));
// → ￥123,457

// limitando a três dígitos significativos
console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(numero));
// → 1,23,000
```

Para funcionar essa sintaxe de chamar o await fora do async deve utilizar a flag `--experimental-top-level-await` no package.json

```javascript
async function mainLoop() {
  try {
    console.log('Hello World!');
  } catch (error) {
    console.error({ error });
  }
}
await mainLoop();
```

Para que o nyc entenda o ES Modules e gere o code coverage, é necessário instalar uma outra dependência o "reify" que vai por debaixo dos panos gerar o código java script em common js
