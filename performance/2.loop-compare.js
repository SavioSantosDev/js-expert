import Benchmark from 'benchmark';
import database from './database.js';

class Product {
  description;
  name;
  price;
  tmpProperty;
  activePromoId;

  constructor(product) {
    Object.assign(this, product);
  }
}

class CartWithMultipleLoops {
  constructor({ products }) {
    this.products = this.#removeUndefinedProps(products);
    this.total = this.#getCartPrice();
  }

  #removeUndefinedProps(products) {
    const productsEntities = products
      .filter((product) => !!Reflect.ownKeys(product).length)
      .map((product) => new Product(product));

    // o stringify remove propriedades undefined
    return JSON.parse(JSON.stringify(productsEntities));
  }

  #getCartPrice() {
    return this.products.map((product) => product.price).reduce((sum, price) => sum + price, 0);
  }
}

class CartWithSingleLoopAndObjectAssign {
  total;
  products = [];

  constructor({ products }) {
    for (const product of products) {
      if (!!Reflect.ownKeys(product).length) {
        this.total += product.price;
        this.products.push(new Product(product));
      }
    }
  }
}

// console.log(new CartWithSingleLoopAndObjectAssign(database));

const runSuites = true;
if (runSuites) {
  const suite = new Benchmark.Suite();

  suite
    .add('#CartWithMultipleLoops', () => {
      new CartWithMultipleLoops(database);
    })
    .add('#CartWithSingleLoopAndObjectAssign', () => {
      new CartWithSingleLoopAndObjectAssign(database);
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function () {
      console.log(`Fastest is ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });
}
