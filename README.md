✅ Prerequisites (install once only)
Before starting, ensure:
Node.js is installed. Run:

 bash
CopyEdit
node -v
npm -v


Git Bash and VS Code are installed.


Open Git Bash in your desired project folder.



🔧 Step 1: Create Project Folder & Initialize
bash
CopyEdit
mkdir to-do-list
cd to-do-list
npm init -y


📦 Step 2: Install Required Dependencies
bash
CopyEdit
npm install express body-parser
npm install --save-dev typescript ts-node @types/node @types/express nodemon


🔧 Step 3: Create TypeScript Configuration
bash
CopyEdit
npx tsc --init

This creates tsconfig.json. Now open it and modify these 3 options:
json
CopyEdit
"target": "ES6",
"module": "CommonJS",
"esModuleInterop": true,


📁 Step 4: Create Project Files
Create a file named index.ts inside the folder.
You can do this via Git Bash:
bash
CopyEdit
touch index.ts

Or from VS Code: Right-click > New File > index.ts

✨ Step 5: Add the To-Do List Code
Paste this code into index.ts:
ts
CopyEdit
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





🧠 Step 6: Add Scripts to package.json
Open your package.json and add this under "scripts":
json
CopyEdit
"scripts": {
  "start": "ts-node index.ts",
  "dev": "nodemon index.ts"
}

This allows you to run your app using:
npm start → Run once


npm run dev → Auto-restart on changes



▶️ Step 7: Run the Server
To run it once:
bash
CopyEdit
npm start

Or, to auto-restart on file changes:
bash
CopyEdit
npm run dev

You should see:
arduino
CopyEdit
Server running at http://localhost:3000

