const sinon = require('sinon');
const assert = require('assert');

const Service = require('./service');
const Planet = require('./planet');

const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderaan: require('./mocks/alderaan.json'),
};

(async () => {
  const service = new Service();

  // Requisição sem stub
  {
    const url = 'https://swapi.dev/api/planets/1/';
    const response = JSON.stringify(await service.makeRequest(url));
    const expected = JSON.stringify(mocks.tatooine);

    assert.deepStrictEqual(response, expected);
  }

  // Com stub
  {
    const stub = sinon.stub(service, service.makeRequest.name);

    {
      const url = 'https://swapi.dev/api/planets/1/';
      stub.withArgs(url).resolves(mocks.tatooine);

      const response = await service.getPlanet(url);
      const expected = new Planet(mocks.tatooine);

      assert.deepStrictEqual(JSON.stringify(response), JSON.stringify(expected));
    }

    {
      const url = 'https://swapi.dev/api/planets/2/';
      stub.withArgs(url).resolves(mocks.alderaan);

      const response = await service.getPlanet(url);
      const expected = new Planet(mocks.alderaan);

      assert.deepStrictEqual(JSON.stringify(response), JSON.stringify(expected));
    }
  }
})();
