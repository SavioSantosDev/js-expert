const http = require('http');

const DEFAULT_USER = {
  username: 'SavioSantos',
  password: '123',
};

const routes = {
  '/contact:get': (request, response) => {
    response.write('Contact us page');
    return response.end();
  },

  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);

      if (user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
        response.writeHead(401);
        response.write('Logging failed!');
        return response.end();
      }

      response.write('Logging has succeeded!');
      return response.end();
    }
  },

  default: (request, response) => {
    response.write('Hello World!');
    return response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chose = routes[routeKey] || routes.default;

  response.writeHead(200, { 'Content-Type': 'text/html' });
  return chose(request, response);
};

const app = http.createServer(handler).listen(3000, () => console.log('App running at', 3000));

module.exports = app;
