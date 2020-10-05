import { writable, derived } from 'svelte/store';
import type { Todo } from '../types';

export const todos = writable<Todo[]>([]);

export const addTodo = (todo: Todo) => {
  todos.update((todos) => [...todos, todo]);
};

export const removeTodo = (id: string) =>
  todos.update((todos) => todos.filter((todo) => todo.id !== id));

export const updateTodo = (id: string, change: Partial<Todo>) =>
  todos.update((todos) =>
    todos.map((todo) => (todo.id === id ? { ...todo, ...change } : todo))
  );

export const setTodos = (newTodos: Todo[]) => todos.set(newTodos);

export const remainingTodos = derived(todos, ($todos) =>
  $todos.filter((todo) => !todo.done)
);

export const removeFinishedTodos = () =>
  todos.update((todos) => todos.filter((todo) => !todo.done));
