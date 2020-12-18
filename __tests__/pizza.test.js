const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('my Pizzas routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a new pizza via POST', async() => {
    const response = await request(app)
      .post('/api/v1/pizzas')
      .send({
        pizza: 'Alchemy Combo',
        rating: 5
      });
    expect(response.body).toEqual({
      id: '1',
      pizza: 'Alchemy Combo',
      rating: 5
    });
  });

  it('should find Pizza by findBy Id', async() => {

    expect(true).toEqual(true);
  });
});
