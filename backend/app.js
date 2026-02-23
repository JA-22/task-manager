const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

app.use(express.json());

let tasks = [];
let id = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
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

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: "Task deleted" });
});



module.exports = app;

