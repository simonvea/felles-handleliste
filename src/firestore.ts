import { db } from './db';

const collection = db.collection('todos');

let todos = [];

let newTask = '';

async function addTodo(e: any) {
  e.preventDefault();

  const todo = {
    task: newTask,
    done: false,
  };

  const ref = await collection.add(todo);

  const newTodo = {
    ...todo,
    id: ref.id,
  };
  todos = [...todos, newTodo];
  newTask = '';
}

export const updateTodoFirestore = async (todo: any) => {
  await collection.doc(todo.id).update({ task: todo.task, done: todo.done });
  console.info('Updated todo: ', todo.task);
};

function toggleDone(id: string) {
  const index = todos.findIndex((todo) => todo.id === id);
  todos[index].done = !todos[index].done;
  updateTodoFirestore(todos[index]);
}

export async function fetchTodos() {
  const querysnapshot = await collection.orderBy('done').get();
  const downloadedTodos = [];
  querysnapshot.forEach((doc) => {
    const data = doc.data();

    const todo = {
      id: doc.id,
    } as {
      id: string;
      task: string;
      done: boolean;
    };

    if ('task' in data) {
      todo.task = data.task;
    }
    if ('done' in data) {
      todo.done = data.done;
    }

    downloadedTodos.push(todo);
  });
  return downloadedTodos;
}
