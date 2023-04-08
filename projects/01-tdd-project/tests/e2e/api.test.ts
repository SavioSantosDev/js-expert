import { expect } from 'chai';
import { Server } from 'http';
import { before, beforeEach, describe, it } from 'mocha';
import { join, resolve } from 'path';
import Sinon from 'sinon';
import request from 'supertest';
import { Api } from '../../src/api';
import { Tax } from '../../src/classes';
import { Car, CarCategory, Customer, Renting, Transaction } from '../../src/models';
import { BaseRepository } from '../../src/repository';
import { CarService, TransactionService } from '../../src/services';
import { Mocks } from '../mocks';

describe('E2E Api suite test', () => {
  let api: Api;
  let server: Server;
  let carService: CarService;
  let transactionService: TransactionService;

  let sandbox: Sinon.SinonSandbox;
  let response: request.Response;

  const SERVER_TEST_PORT = 4000;
  const carRepository = new BaseRepository<Car>({
    filePath: resolve(join(__dirname, '../', '../', 'database', 'cars.json')),
  });
  const carCategoryRepository = new BaseRepository<CarCategory>({
    filePath: resolve(join(__dirname, '../', '../', 'database', 'carCategories.json')),
  });
  const customerRepository = new BaseRepository<Customer>({
    filePath: resolve(join(__dirname, '../', '../', 'database', 'customers.json')),
  });

  beforeEach(() => {
    carService = new CarService(carRepository);
    transactionService = new TransactionService(carRepository, carCategoryRepository, customerRepository);

    api = new Api(carService, transactionService);
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

  describe('Given a customer who chose a car of an category in a specific date', () => {
    const customer = Mocks.getCustomerWithAge(50);
    const carSelected = Mocks.car1;
    const carCategory = Mocks.getCarCategoryWithPrice(37.6);
    const startDate = new Date(2020, 10, 5);

    const tax = 1.3;

    let carRepositoryFindByIdSpy: Sinon.SinonStub;
    let carCategoryRepositoryFindByIdSpy: Sinon.SinonStub;
    let customerRepositoryFindByIdSpy: Sinon.SinonStub;

    beforeEach(() => {
      carRepositoryFindByIdSpy = sandbox.stub(carRepository, 'findById').resolves(carSelected);
      carCategoryRepositoryFindByIdSpy = sandbox.stub(carCategoryRepository, 'findById').resolves(carCategory);
      customerRepositoryFindByIdSpy = sandbox.stub(customerRepository, 'findById').resolves(customer);
      sandbox.stub(Tax, 'getTaxByAge').returns(tax);
    });

    describe('When generate the transaction receipt', () => {
      let transactionCalculated: Transaction;

      beforeEach(async () => {
        const renting: Renting = {
          carCategoryId: carCategory.id,
          carSelectedId: carSelected.id,
          customerId: customer.id,
          days: 5,
          startDate,
        };
        response = await request(server).post(Api.Routes.GENERATE_TRANSACTION_RECEIPT).send(renting);
        transactionCalculated = response.body;
      });

      it('Should find car, car category and customer by respective ids', () => {
        expect(carRepositoryFindByIdSpy.calledOnceWith(carSelected.id)).to.be.ok;
        expect(carCategoryRepositoryFindByIdSpy.calledOnceWith(carCategory.id)).to.be.ok;
        expect(customerRepositoryFindByIdSpy.calledOnceWith(customer.id)).to.be.ok;
      });

      it('Should contains the customer data and car selected', () => {
        expect(response.status).to.be.equal(200);
        expect(transactionCalculated.customer).to.be.deep.equal(customer);
        expect(transactionCalculated.carSelected).to.be.deep.equal(carSelected);
      });

      it('Should contains the due date in Brasilian format', () => {
        expect(transactionCalculated.dueDate).to.equal('10 de novembro de 2020');
      });

      it('Should contains the final price with a tax of his age to the car category price in Brasilian Format', () => {
        const expected = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(244.4);
        expect(transactionCalculated.finalPrice).to.equal(expected);
      });
    });
  });
});
