const https = require('https');

const Planet = require('./planet');

class Service {
  async getPlanet(url) {
    const data = await this.makeRequest(url);
    return new Planet(data);
  }

  async makeRequest(url) {
    return new Promise((resolve, reject) =>
      https.get(url, (res) => {
        res.on('data', (data) => resolve(JSON.parse(data)));
        res.on('error', reject);
      })
    );
  }
}

module.exports = Service;
