const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user-model')
const expressApp = require('../server').app;

const TIMEOUT = 10000;
let mongoServer;
let serverInstance;

beforeAll(async () => {
    await mongoose.disconnect();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    serverInstance = expressApp.listen();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await new Promise((resolve) => serverInstance.close(resolve));
});

describe('Login Test', () => {
    const loginTestUser = {
        userName: 'loginTestUser',
        firstName: 'Login',
        lastName: 'Test',
        email: 'logintest@example.com',
        password: 'loginTestPass123!',
        passwordVerify: 'loginTestPass123!'
    };
    describe('Login', () => {
        afterAll(async () => {
            await User.deleteMany({ userName: loginTestUser.userName });
        });

        beforeAll(async () => {
            await User.deleteMany({ userName: loginTestUser.userName });
            await request(app).post('/auth/register').send(loginTestUser);

        });
        afterEach(async () => {
            if (await User.exists({ userName:  loginTestUser.userName  })) {
                await User.deleteMany({ userName:  loginTestUser.userName  });
            }
            if (await User.exists({ userName:  loginTestUser.userName  })) {
                await User.deleteMany({ userName:  loginTestUser.userName });
            }
        });
        it(
            'should log in a registered user',
            async () => {
                const response = await request(app).post('/auth/login').send({ userName: loginTestUser.userName, password: loginTestUser.password }).expect(200);
                expect(response.body.loggedIn).toBe(true);
                expect(response.body.user.userName).toBe(loginTestUser.userName);
            },
            TIMEOUT
        );

        it(
            'should fail if required fields are missing',
            async () => {
                const response = await request(app).post('/auth/login').send({ userName: loginTestUser.userName }).expect(400);
                expect(response.body.errorMessage).toBe('Please enter all required fields');
            },
            TIMEOUT
        );

        it(
            'should fail with incorrect username',
            async () => {
                const response = await request(app).post('/auth/login').send({ userName: 'nonexistentUser', password: loginTestUser.password }).expect(401);
                expect(response.body.errorMessage).toBe('Wrong username or password provided');
            },
            TIMEOUT
        );

        it(
            'should fail with incorrect password',
            async () => {
                const response = await request(app).post('/auth/login').send({ userName: loginTestUser.userName, password: 'incorrectPassword' }).expect(401);
                expect(response.body.errorMessage).toBe('Wrong username or password provided');
            },
            TIMEOUT
        );
    });
});
