import { createServer } from 'http';

class BaseError extends Error {
  constructor({ name, message }) {
    super(message);
    this.name = name;
  }
}

class BusinessError extends BaseError {
  constructor(message) {
    super({ name: BusinessError.name, message });
  }
}

class NotificationContext {
  constructor() {
    this.notifications = [];
  }

  hasNotifications() {
    return this.notifications.length > 0;
  }

  addNotification(notification) {
    this.notifications.push(notification);
  }
}

class HeroEntity extends NotificationContext {
  constructor({ name, age }) {
    super();
    this.name = name;
    this.age = age;
  }

  isValid() {
    if (this.age < 20) {
      this.addNotification('age must be higher that 20!');
    }

    if (this.name?.length < 4) {
      this.addNotification('name lenght must be higher than 4!');
    }

    return !this.hasNotifications();
  }
}

async function handler(request, response) {
  try {
    for await (const data of request) {
      const parsedData = JSON.parse(data);

      const hero = new HeroEntity(parsedData);
      if (!hero.isValid()) {
        response.writeHead(400);
        response.write(hero.notifications.join('\n'));
        continue;
      }

      response.writeHead(200);
    }
  } catch (error) {
    console.error({ internalServerError: error });
    response.writeHead(500);
    response.write('Internal server error!');
  } finally {
    response.end();
  }
}

createServer(handler).listen(3000, () => console.log('running at 3000 and process ', process.pid));

/**
 * curl -i localhost:3000 -X POST -- data '{ "name": "Vingador", "age": 58 }'
 */
