const { readFile } = require('fs/promises');
const User = require('./user');
const { error } = require('./constants');

class File {
  static DEFAULT_VALIDATION_OPTIONS = {
    max_lines: 3,
    fields: ['id', 'name', 'profession', 'age'],
  };

  static async csvToJson(filePath) {
    const csvString = await File.getFileContent(filePath);
    const validation = await File.isValid(csvString);

    if (!validation.valid) throw new Error(validation.error);

    const users = File.parseCSVToJSON(csvString);

    return users;
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString('utf8');
  }

  static async isValid(csvString, options = File.DEFAULT_VALIDATION_OPTIONS) {
    const { header, fileWithoutHeader } = File.getHeaderAndContent(csvString);
    const isHeaderValid = header === options.fields.join(',');

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    const fileWithoutHeaderLength = (fileWithoutHeader || []).filter((value) => !!value).length;
    const isContentLengthAccepted = fileWithoutHeaderLength > 0 && fileWithoutHeaderLength <= options.max_lines;
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { error: null, valid: true };
  }

  static getHeaderAndContent(csvString) {
    const [header, ...fileWithoutHeader] = csvString.split('\n');
    return { header, fileWithoutHeader };
  }

  static parseCSVToJSON(csvString) {
    const { header, fileWithoutHeader } = File.getHeaderAndContent(csvString);
    const headerFields = header.split(',');

    return fileWithoutHeader
      .map((line) =>
        line.split(',').reduce(
          (users, column, index) => ({
            ...users,
            [headerFields[index]]: column,
          }),
          {}
        )
      )
      .map((user) => new User(user));
  }
}

// (async () => {
//   // const result = await File.csvToJson('./../mocks/four-items-invalid.csv');
//   // const result = await File.csvToJson('./../mocks/invalid-header.csv');
//   const result = await File.csvToJson('./../mocks/three-items-valid.csv');
//   // const result = await File.csvToJson('./../mocks/empty-file-invalid.csv');
// })();

module.exports = File;
