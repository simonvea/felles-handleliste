import { db } from './db';
import type { Todo } from './types';

class API {
  constructor(
    private collection: firebase.firestore.CollectionReference<
      firebase.firestore.DocumentData
    >
  ) {}

  async fetchTodos() {
    let todos: Todo[] = [];
    try {
      const querysnapshot = await this.collection.orderBy('done').get();
      querysnapshot.forEach((doc) => {
        const data = doc.data();

        const todo = {
          id: doc.id,
        } as Todo;

        if ('task' in data) {
          todo.task = data.task;
        }
        if ('done' in data) {
          todo.done = data.done;
        }

        todos.push(todo);
      });
    } catch (err) {
      console.error(err);
    }

    return todos;
  }

  async update(todo: Todo) {
    try {
      await this.collection
        .doc(todo.id)
        .update({ task: todo.task, done: todo.done });
    } catch (err) {
      console.error(err);
    }
  }

  async add(todo: Omit<Todo, 'id'>) {
    let ref;
    try {
      ref = await this.collection.add(todo);
    } catch (err) {
      console.error(err);
    }
    return ref || false;
  }

  async delete(id: string) {
    try {
      await this.collection.doc(id).delete();
    } catch (err) {
      console.error(err);
    }
  }
}

const collection = db.collection('todos');

export default new API(collection);
