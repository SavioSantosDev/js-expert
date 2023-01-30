import { expect } from 'chai';
import { Server } from 'http';
import { before, beforeEach, describe, it } from 'mocha';
import { join, resolve } from 'path';
import Sinon from 'sinon';
import request from 'supertest';
import { Api } from '../../src/api';
import { CarCategory } from '../../src/models';
import { CarService } from '../../src/services';
import { Mocks } from '../mocks';

describe('E2E Api suite test', () => {
  let api: Api;
  let server: Server;
  let carService: CarService;

  let sandbox: Sinon.SinonSandbox;
  let response: request.Response;

  const SERVER_TEST_PORT = 4000;

  beforeEach(() => {
    carService = new CarService(resolve(join(__dirname, '../', '../', 'database', 'cars.json')));
    api = new Api(carService);
    server = api.initialize(SERVER_TEST_PORT);

    sandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    server.close();
    sandbox.restore();
  });

  describe('Given the method that returns an available car of a car category', () => {
    let carCategory: CarCategory;

    beforeEach(async () => {
      response = await request(server).post(Api.Routes.GET_AVAILABLE_CAR).send(carCategory);
    });

    describe('When it been called from a car category with no car available', () => {
      before(() => {
        carCategory = Mocks.carCategoryWithNoCarAvailable;
      });

      it('Should throw an error', () => {
        expect(response.status).to.be.equal(500);
      });
    });

    describe('When it been called from a car category with one car available', () => {
      before(() => {
        carCategory = Mocks.carCategoryWithOneCarAvailable;
      });

      it('Should return the unique available car', () => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(Mocks.car1);
      });
    });

    describe('When it been called from a car category with three car available', () => {
      before(() => {
        carCategory = Mocks.carCategoryWithThreeCarAvailable;
      });

      it('Should return a random car from the car category', () => {
        const { car1, car2, car3 } = Mocks;
        expect(response.status).to.be.equal(200);
        expect([car1, car2, car3]).to.be.deep.include(response.body);
      });
    });
  });
});
