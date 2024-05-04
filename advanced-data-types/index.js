const database = Array.from(Array(100)).forEach((_, index) => ({
  id: index + 1,
}));

// Cenário em que tem uma lista da mesma entidade, mas em listas diferentes.

class Store {
  items = new Map();

  constructor(objectKey = 'id') {}

  addItems(...items) {}

  removeByKey(key) {}

  clearAll() {}

  getByKey(key) {}

  get size() {
    return this.items.size;
  }
}

class StoreGroup {
  storeList = new WeakMap();

  setGroups(keys) {
    keys.forEach((key) => this.storeList.set(key, new Store()));
  }
}

const map = new WeakMap();
let obj = { id: 123 };

map.set('a', 1);
map.set(true, false);
map.set(false, true);
map.set(obj, 'objeto 1');
map.set({ id: 123 }, 'objeto 2');
map.set(undefined, 'Valor nulo');

// console.log([...map.entries()]);
obj.id = 'abc';
obj = { batatinha: '123' };
console.log(map.get(obj));
