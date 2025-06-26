const request = require('supertest');
const app = require('./server');

describe('REST API Tests', () => {
  
  test('GET /items returns empty array', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /items creates item', async () => {
    const response = await request(app)
      .post('/items')
      .send({ name: 'test item' });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('test item');
    expect(response.body.id).toBe(1);
  });

  test('POST without name fails', async () => {
    const response = await request(app)
      .post('/items')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('name required');
  });

  test('GET /items/:id works', async () => {
    await request(app).post('/items').send({ name: 'test item' });
    
    const response = await request(app).get('/items/1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('test item');
  });

  test('GET nonexistent item returns 404', async () => {
    const response = await request(app).get('/items/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('not found');
  });

  test('PUT updates item', async () => {
    await request(app).post('/items').send({ name: 'old name' });
    
    const response = await request(app)
      .put('/items/1')
      .send({ name: 'new name' });
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('new name');
  });

  test('PUT nonexistent item fails', async () => {
    const response = await request(app)
      .put('/items/999')
      .send({ name: 'new name' });
    
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('not found');
  });

  test('PUT without name fails', async () => {
    await request(app).post('/items').send({ name: 'test' });
    
    const response = await request(app)
      .put('/items/1')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('name required');
  });

  test('DELETE removes item', async () => {
    await request(app).post('/items').send({ name: 'test item' });
    
    const response = await request(app).delete('/items/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('deleted');
  });

  test('DELETE nonexistent item fails', async () => {
    const response = await request(app).delete('/items/999');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('not found');
  });
});