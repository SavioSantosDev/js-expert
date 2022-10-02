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

### Escopos diferentes em uma mesma função

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
