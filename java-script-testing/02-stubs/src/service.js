const https = require('https');

class Service {
  async getPlanets(url) {
    const response = await this.makeRequest(url);

    return {
      name: response.name,
      films: response.films,
      created: response.created,
    };
  }

  async makeRequest(url) {
    return new Promise((resolve, reject) =>
      https.get(url, (response) => {
        response.on('data', (data) => resolve(JSON.parse(data)));
        response.on('error', reject);
      })
    );
  }
}

// (async () => {
//   const response = await new Service().makeRequiest('https://swapi.dev/api/planets/1/');
//   console.log('response', response);
// })();

module.exports = Service;
