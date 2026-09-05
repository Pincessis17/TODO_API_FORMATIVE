const taskModel = require('../models/taskModel');

async function createTask(req, res) {
  try {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'A non-empty "title" string is required' });
    }

    const id = await taskModel.createTask(title.trim());
    return res.status(201).json({ id });
  } catch (err) {
    console.error('Error creating task:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await taskModel.getAllTasks();
    const formatted = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      is_completed: !!task.is_completed
    }));
    return res.status(200).json({ tasks: formatted });
  } catch (err) {
    console.error('Error listing tasks:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getTaskById(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(404).json({ error: 'There is no task at that id' });
    }

    const task = await taskModel.getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: 'There is no task at that id' });
    }

    return res.status(200).json({
      id: task.id,
      title: task.title,
      is_completed: !!task.is_completed
    });
  } catch (err) {
    console.error('Error fetching task:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateTask(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(404).json({ error: 'There is no task at that id' });
    }

    const existing = await taskModel.getTaskById(id);
    if (!existing) {
      return res.status(404).json({ error: 'There is no task at that id' });
    }

    const { title, is_completed } = req.body;
    const newTitle = title !== undefined && title !== null ? String(title).trim() : existing.title;
    const newIsCompleted = is_completed !== undefined && is_completed !== null ? Boolean(is_completed) : !!existing.is_completed;

    if (!newTitle) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    await taskModel.updateTask(id, newTitle, newIsCompleted);
    return res.status(204).send();
  } catch (err) {
    console.error('Error updating task:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteTask(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id)) {
      await taskModel.deleteTask(id);
    }
    return res.status(204).send();
  } catch (err) {
    console.error('Error deleting task:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };