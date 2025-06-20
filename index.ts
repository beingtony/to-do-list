// index.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];

// Create a todo
app.post('/todo', (req: Request, res: Response) => {
  const newTodo: Todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get all todos
app.get('/todo', (_req: Request, res: Response) => {
  res.json(todos);
});

// Update a todo
app.put('/todo/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).send('Todo not found');

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

// Delete a todo
app.delete('/todo/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
