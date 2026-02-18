const request = require('supertest');
const app = require('../app');

describe('Tasks API', () => {

  it('GET /tasks debería devolver lista vacía', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /tasks debería crear una tarea', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body.completed).toBe(false);
  });

  it('POST /tasks sin title debería fallar', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({});

    expect(res.statusCode).toBe(400);
  });

});
