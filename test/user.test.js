const {
  login,
  addNewUser,
  logout,
  getNewAccessToken,
} = require('../controller/user');
const { validUser } = require('./mocks/user');
const supertest = require('supertest');
const app = require('../index');
const api = supertest(app);

describe('functions are declerd', () => {
  test('login function is declerd', () => {
    expect(login).toBeDefined();
  });
  test('addNewUser function is declerd', () => {
    expect(addNewUser).toBeDefined();
  });
  test('logout function is declerd', () => {
    expect(logout).toBeDefined();
  });
  test('getNewAccessToken function is declerd', () => {
    expect(getNewAccessToken).toBeDefined();
  });
});
describe('add user tests', () => {
  test('valid user can be added', async () => {
    await api.post('/user/register').send(validUser).expect(201);
  });
});

afterAll(() => {
  app.close();
});
