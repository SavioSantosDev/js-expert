const Service = require('./service');
const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json'),
};

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';

(async () => {
  // {
  //   const service = new Service();
  //   // const responseWithoutStub = await service.makeRequiest(BASE_URL_1);
  //   const responseWithoutStub = await service.makeRequiest(BASE_URL_2);
  //   console.log(JSON.stringify(responseWithoutStub));
  // }

  {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);

    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
    stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

    {
      const expected = {
        name: 'Tatooine',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/4/',
          'https://swapi.dev/api/films/5/',
          'https://swapi.dev/api/films/6/',
        ],
        created: '2014-12-09T13:50:49.641000Z',
      };
      const response = await service.getPlanets(BASE_URL_1);
      deepStrictEqual(response, expected);
    }

    {
      const expected = {
        name: 'Alderaan',
        films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
        created: '2014-12-10T11:35:48.479000Z',
      };
      const response = await service.getPlanets(BASE_URL_2);
      deepStrictEqual(response, expected);
    }
  }
})();
