## Anotações

- O comando `npm i` instala as dependências olhando apenas para o arquivo `package.json`
- O comando `npm ci` restaura as dependências olhando para o arquivo `package-lock.json`, com isso, os pacotes serão instalados exatamente na versão que está no repositório remoto.

#### Publicar pacote no NPM

- Criar conta em https://www.npmjs.com
- No package.json, incluir nome do usuário no `name` por exemplo `"name": "@savio-santos-dev/fluentsql"`. Mais questão de boa prática do que regra.
- No terminal, rodar `npm login`.
- `npm publish --access=public`. Parece que tem que pagar pra ser privado.
- Com pacote publicado, basta instalar em algum projeto e utilizar.

Publicar nova versão

- Feito as alterações na biblioteca, rodar o comando `npm publish`. Importante atualizar a versão no package.json.
- Na aplicação, pode rodar `npm outdated` para ver versões disponíveis e `npm update` para atualizar dependências.
- No package estava assim: ` "@savio-santos-dev/fluentsql": "1.0.0"` e o update não fazia nada. Após adicionar o `^` antes do 1, passou a funcionar.

Versão
Major.Minor.Patch
