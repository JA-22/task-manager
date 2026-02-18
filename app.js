const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];
let id = 1;

app.get("/tasks", (req, res) => {
  res.status(500).json({ error: "Internal error" });
});


app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = { id: id++, title, completed: false };
  tasks.push(task);

  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = true;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).send();
});

module.exports = app;

