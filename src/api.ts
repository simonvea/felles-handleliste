import { app } from './firebase';
import type { Todo } from './types';

const db = app.firestore();
db.enablePersistence().catch(function (err) {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

class TodoAPI {
  constructor(
    private collection: firebase.firestore.CollectionReference<
      firebase.firestore.DocumentData
    >
  ) {}

  addListener(cb: (snap: firebase.firestore.QuerySnapshot) => void) {
    return this.collection.onSnapshot(cb);
  }

  public getTodosFromSnapshot(snap: firebase.firestore.QuerySnapshot) {
    let todos: Todo[] = [];
    snap.forEach((doc) => {
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
    return todos;
  }

  async fetchTodos() {
    let todos: Todo[] = [];
    try {
      const querysnapshot = await this.collection.get();
      todos = this.getTodosFromSnapshot(querysnapshot);
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
    try {
      const ref = await this.collection.add(todo);
      return ref || false;
    } catch (err) {
      console.error(err);
    }
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

export default new TodoAPI(collection);
