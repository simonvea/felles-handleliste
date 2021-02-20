import { writable, derived, get } from 'svelte/store';
import { API } from '../api';
import type { Todo } from '../types';
import type { Readable } from 'svelte/store';

const mockTodos = [
  {
    id: '2',
    task: 'test',
    created: new Date(),
    lastChanged: new Date(),
    hide: false,
    createdByEmail: 'simon.opheim@gmail.com',
    done: false,
  },
  {
    id: '5',
    task: 'Denne er ferdig',
    created: new Date(),
    lastChanged: new Date(),
    hide: false,
    createdByEmail: 'simon.opheim@gmail.com',
    done: true,
  },
];

const createId = () => (Math.random() * 10).toString(30).substr(2);

interface TodosStore extends Readable<Todo[]> {
  add: (todo: Omit<Todo, 'id'>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  update: (id: string, change: Partial<Todo>) => Promise<void>;
  hideFinished: () => void;
}

function createTodos(mockTodos: Todo[] = []): TodosStore {
  const { update, subscribe } = writable<Todo[]>(mockTodos);

  const add = async (todo: Omit<Todo, 'id'>) => {
    const id = createId();
    const newTodo = { ...todo, id };
    update((todos) => [...todos, newTodo]);
  };

  const remove = async (id: string) =>
    update((todos) => todos.filter((todo) => todo.id !== id));

  const updateTodo = async (id: string, change: Partial<Todo>) =>
    update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...change, lastChanged: new Date() } : todo
      )
    );

  const hideFinished = () =>
    update((todos) =>
      todos.map((todo) => (todo.done ? { ...todo, hide: true } : todo))
    );

  return {
    subscribe,
    add,
    remove,
    update: updateTodo,
    hideFinished,
  };
}

function onlineTodos(): TodosStore {
  const { update, subscribe, set } = writable<Todo[]>([]);

  let timer;

  // THis is nice, but increases lag.. Should probably do it async, while keeping local state local. Stale while revalidate or some
  API.addListener((snapshot) => {
    set(API.getTodosFromSnapshot(snapshot));
  });

  const add = async (todo: Omit<Todo, 'id'>) => {
    update((todos) => [...todos, { ...todo, id: createId() }]);
    await API.add(todo);
  };

  const remove = async (id: string) => {
    update((todos) => todos.filter((t) => t.id !== id));
    await API.delete(id);
  };

  const updateTodo = async (id: string, change: Partial<Todo>) => {
    update((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          const changedTodo = { ...todo, ...change, lastChanged: new Date() };

          clearTimeout(timer);
          timer = setTimeout(() => {
            API.update(changedTodo);
          }, 1000);

          return changedTodo;
        }

        return todo;
      })
    );
  };

  const hideFinished = () => {
    const todosToUpdateAsync = [];
    update((todos) =>
      todos.map((todo) => {
        if (todo.done) {
          const updatedTodo = { ...todo, hide: true };

          todosToUpdateAsync.push(updatedTodo);

          return updatedTodo;
        }
        return todo;
      })
    );

    todosToUpdateAsync.forEach((t) => API.update(t));
  };

  return {
    subscribe,
    add,
    remove,
    update: updateTodo,
    hideFinished,
  };
}

const dev = false;

export const todos = dev ? createTodos(mockTodos) : onlineTodos();

export const todosToShow = derived(todos, ($todos) =>
  $todos.filter((t) => !t.hide)
);

export const remainingTodos = derived(todos, ($todos) =>
  $todos.filter((todo) => !todo.done)
);
