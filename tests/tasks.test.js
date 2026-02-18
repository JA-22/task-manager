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

  it('PUT /tasks/:id debería marcar tarea como completada', async () => {
  // Crear tarea primero
  const createRes = await request(app)
    .post('/tasks')
    .send({ title: 'Task to complete' });

  const taskId = createRes.body.id;

  // Ejecutar PUT
  const res = await request(app)
    .put(`/tasks/${taskId}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.completed).toBe(true);
});


it('PUT /tasks/:id inexistente debería devolver 404', async () => {
  const res = await request(app)
    .put('/tasks/999');

  expect(res.statusCode).toBe(404);
});


it('DELETE /tasks/:id debería eliminar tarea', async () => {
  // Crear tarea primero
  const createRes = await request(app)
    .post('/tasks')
    .send({ title: 'Task to delete' });

  const taskId = createRes.body.id;

  // Ejecutar DELETE
  const res = await request(app)
    .delete(`/tasks/${taskId}`);

  expect(res.statusCode).toBe(204);
});


it('DELETE /tasks/:id inexistente debería devolver 204 igual', async () => {
  const res = await request(app)
    .delete('/tasks/999');

  expect(res.statusCode).toBe(204);
});


});
