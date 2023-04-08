# JavaScript Testing

## 01 - Mocks

### Utilize mocks apropriados para cada teste

- Caso seja necessário testar cenários diferentes utilize mocks diferentes para testar diferentes comportamentos. Isso evita testes repetitivos ou testes de alta dependência.

### Clousore - Uma função que se alta executa

```javascript
(async () => {
  // Será executada automaticamente
})();
```

### Contextos diferentes em um mesmo escopo

```javascript
export function fooBar() {
  {
    const user = 'Foo';
    console.log(user);
  }

  {
    const user = 'Bar';
    console.log(user);
  }
}
```

## 02 - Stubs

### Nossos testes NÃO devem depender de serviços externos ou internet.

Por isso utilizamos os stups para substituir o comportamento de alguma função ou classe pelo resultado que queremos.

### Comando para criar um arquivo a partir do retorno de outro

node service.test.js > mocks/tatooine.json
