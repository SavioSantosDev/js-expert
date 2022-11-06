- database
- seed
  - index.js (faker, Car, CarCategory, Customer)
- test
  - useCases
- src
  - entities
    - base
      - base.js (id, name)
    - car.js (base, releaseYear, available, gasAvailable)
    - car-category.js (base, carIds, price)
    - customer.js (base, age)
- package.json

Criar o arquivo story.md com as especificações

inicializar projeto node

criar pasta seed (padrão para criar base dados) e a pasta database

criar script para rodar seed (dentro da pasta vai ter um arquivo index.js)

instalar faker e utilizar no index.js em seed

Dentro de seeder vai ser criado um mecanismo para popular a base de dados

---

instalar mocha@8 nyc@15 sinon@9 chai@4
