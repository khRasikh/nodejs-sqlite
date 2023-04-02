const request = require('supertest');
const baseURL = 'http://localhost:3000';
const db = require('../rates/rates.db');

describe('Should GET & POST all data', () => {
  const MockDemo = {
    BASE_CODE: 'USD',
    USD: 1,
    EUR: 1.920637,
    GBP: 1.80947,
    CNY: 6.87264,
    created_at: new Date().toLocaleDateString(),
    updated_at: new Date().toLocaleDateString(),
  };

  it('should return all rates persisted in the local database', async () => {
    const response = await request(baseURL).get('/api/rates');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data[0].BASE_CODE).toBe('USD');
    expect(response.body.data[0].USD).toBe(1);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should post data successfully', async () => {
    await request(baseURL).delete('/api/rates');
    const response = await request(baseURL).post('/api/rate').send(MockDemo);
    expect(response.statusCode).toBe(200);
  });
});
