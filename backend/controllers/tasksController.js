// In-memory storage (simple example, replace with DB/service as needed)
const tasks = [];
let nextId = 1;

exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const task = { id: nextId++, title, completed: false };
  tasks.push(task);

  res.status(201).json(task);
};

exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = true;
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex(t => t.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
  }

  // The tests expect a 200 response even if the task did not exist.
  res.json({ message: 'Task deleted' });
};
