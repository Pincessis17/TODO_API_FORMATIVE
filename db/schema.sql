-- Run this script to create the database and the tasks table.

CREATE DATABASE IF NOT EXISTS task_api;

USE task_api;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE
);