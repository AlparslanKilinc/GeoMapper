const request = require('supertest');
const app = require('../server');

const TIMEOUT = 10000;

describe('Authentication Service', () => {
    let newUserDetails;

    beforeEach(() => {
        newUserDetails = {
            userName: `test${Date.now()}`,
            // TODO: firstName and lastName should not be checked for uniqueness.
            // Multiple users with the same firstName and lastName should be allowed.
            firstName: `${Date.now()}`,
            lastName: `${Date.now()}`,
            email: `test${Date.now()}@gmail.com`,
            password: 'test12345!',
            passwordVerify: 'test12345!'
        };
    });

    describe('Registration', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send(newUserDetails)
                .expect(200);

            expect(response.body.user.userName).toBe(newUserDetails.userName);
            expect(response.body.user.firstName).toBe(newUserDetails.firstName);
            expect(response.body.user.lastName).toBe(newUserDetails.lastName);
            expect(response.body.user.email).toBe(newUserDetails.email);
        }, TIMEOUT);
    });

    describe('Login', () => {
        it('should log in a registered user', async () => {
            await request(app)
                .post('/auth/register')
                .send(newUserDetails)
                .expect(200);

            const loginDetails = {
                userName: newUserDetails.userName,
                password: newUserDetails.password,
            };

            const response = await request(app)
                .post('/auth/login')
                .send(loginDetails)
                .expect(200);

            expect(response.body.loggedIn).toBe(true);
            expect(response.body.user.userName).toBe(newUserDetails.userName);
            expect(response.body.user.firstName).toBe(newUserDetails.firstName);
            expect(response.body.user.lastName).toBe(newUserDetails.lastName);
            expect(response.body.user.email).toBe(newUserDetails.email);
        }, TIMEOUT);
    });
});
