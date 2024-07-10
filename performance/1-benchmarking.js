import { v4 as uuid } from 'uuid';
import database from './database.js';

class Product {
  constructor({ description, name, price, tmpProperty, activePromoId }) {
    this.description = description;
    this.name = name;
    this.price = price;
    this.tmpProperty = tmpProperty;
    this.activePromoId = activePromoId;
  }
}

class Cart {
  constructor({ at, products }) {
    this.id = uuid();

    this.at = at;
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

const cart = new Cart(database);

console.log(cart);
console.log(cart.total);
