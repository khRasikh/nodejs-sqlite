const request = require('supertest');
const baseURL = 'http://localhost:3000';

describe('Should GET & POST all data', () => {
  let pid;
  const MockDemo = {
    BASE_CODE: 'USD',
    USD: 1,
    EUR: 1.920637,
    GBP: 1.80947,
    CNY: 6.87264,
    created_at: new Date().toLocaleDateString(),
    updated_at: new Date().toLocaleDateString(),
  };

  it('should post data successfully', async () => {
    const response = await request(baseURL).post('/api/rate').send(MockDemo);
    pid = response.body.id;
    expect(response.body.message).toBe('success');
    expect(response.body.id).toBeGreaterThan(1);
    expect(response.statusCode).toBe(200);
  });

  it('should return all rates persisted in the local database', async () => {
    const response = await request(baseURL).get('/api/rates');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data[0].BASE_CODE).toBe('USD');
    expect(response.body.data[0].USD).toBe(1);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should fetch the current rates', async () => {
    const response = await request(baseURL).get('/api/rate/now');
    expect(response.statusCode).toBe(200);
    expect(response.statusCode).not.toBe(404);
    expect(response.body.message).toBe('success');
    expect(response.body.data.BASE_CODE).toBe('USD');
    expect(response.body.data).not.toBe(null);
    expect(response.body.data).not.toBe(undefined);
    expect(response.body.data).not.toBe(undefined);
  });

  it('rates should be updateable', async () => {
    const response = await request(baseURL)
      .put('/api/rate/' + pid)
      .send(MockDemo);
    expect(response.statusCode).toBe(200);
    expect(response.statusCode).not.toBe(404);
    expect(response.body.message).toBe('success');
    expect(response.body.data.BASE_CODE).toBe('USD');
    expect(response.body.data).not.toBe(null);
    expect(response.body.data).not.toBe(undefined);
    expect(response.body.data).not.toBe(undefined);
  });

  it('should delete a rate by defining an ID', async () => {
    const response = await request(baseURL).delete('/api/rate/' + pid);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('deleted');
    expect(response.body.changes).toBe(1);
  });
});
