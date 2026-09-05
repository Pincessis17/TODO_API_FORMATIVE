const pool = require('../db/db');

async function createTask(title) {
  const [result] = await pool.query(
    'INSERT INTO tasks (title, is_completed) VALUES (?, ?)',
    [title, false]
  );
  return result.insertId;
}

async function getAllTasks() {
  const [rows] = await pool.query(
    'SELECT id, title, is_completed FROM tasks ORDER BY id ASC'
  );
  return rows;
}

async function getTaskById(id) {
  const [rows] = await pool.query(
    'SELECT id, title, is_completed FROM tasks WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

async function updateTask(id, title, isCompleted) {
  const [result] = await pool.query(
    'UPDATE tasks SET title = ?, is_completed = ? WHERE id = ?',
    [title, isCompleted, id]
  );
  return result.affectedRows;
}

async function deleteTask(id) {
  const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };