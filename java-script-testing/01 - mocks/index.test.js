const { error } = require('./src/constants');
const File = require('./src/file');
const User = require('./src/user');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  {
    const filePath = './mocks/empty-file-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/four-items-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/invalid-header.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/three-items-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      new User({ id: 123, name: 'Antonio Sávio', profession: 'Dev Front-end', age: 21 }),
      new User({ id: 321, name: 'Joãozinho da Silva', profession: 'Product Manage', age: 42 }),
      new User({ id: 213, name: 'Maria dos Santos', profession: 'Designer', age: 23 }),
    ];
    deepStrictEqual(result, expected);
  }
})();
