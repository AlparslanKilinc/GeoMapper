const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user-model')

const TIMEOUT = 10000;
let mongoServer;

beforeAll(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  await new Promise((resolve) => server.close(resolve));
});

describe('Registration', () => {
  let registrationUserDetails;
  beforeEach(async () => {
      registrationUserDetails = {
          userName: `test${Date.now()}`,
          firstName: `First${Date.now()}`,
          lastName: `Last${Date.now()}`,
          email: `test${Date.now()}@gmail.com`,
          password: 'test12345!',
          passwordVerify: 'test12345!'
      };
  });

  describe('Registration', () => {
      afterEach(async () => {
          await User.deleteMany({ userName: registrationUserDetails.userName });
      });

      it(
      'should register a new user',
      async () => {
        const response = await request(app).post('/auth/register').send(registrationUserDetails).expect(200);
        expect(response.body.user.userName).toBe(registrationUserDetails.userName);
      },
      TIMEOUT
    );

    it(
      'should fail if required fields are missing',
      async () => {
        delete registrationUserDetails.email;
        const response = await request(app).post('/auth/register').send(registrationUserDetails).expect(400);
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe('Please enter all required fields');
      },
      TIMEOUT
    );

    it(
      'should fail if password is too short',
      async () => {
        registrationUserDetails.password = 'short';
        registrationUserDetails.passwordVerify = 'short';
        const response = await request(app).post('/auth/register').send(registrationUserDetails).expect(400);
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe('Please enter a password of at least 8 characters');
      },
      TIMEOUT
    );

    it(
      'should fail if passwords do not match',
      async () => {
        registrationUserDetails.passwordVerify = 'different';
        const response = await request(app).post('/auth/register').send(registrationUserDetails).expect(400);
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe('Please enter the same password twice');
      },
      TIMEOUT
    );

    it(
      'should fail if username is already taken',
      async () => {
        await request(app).post('/auth/register').send(registrationUserDetails).expect(200);
        registrationUserDetails.email = `new${Date.now()}@gmail.com`;
        const response = await request(app).post('/auth/register').send(registrationUserDetails).expect(400);
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe('An account with this username already exists');
      },
      TIMEOUT
    );

    it(
      'should fail if email is already taken',
      async () => {
        await request(app).post('/auth/register').send(registrationUserDetails).expect(200);
        registrationUserDetails.userName = `newtest${Date.now()}`;
        const response = await request(app).post('/auth/register').send(registrationUserDetails).expect(400);
        expect(response.status).toBe(400);
        expect(response.body.errorMessage).toBe('An account with this email address already exists');
      },
      TIMEOUT
    );
  });
});
