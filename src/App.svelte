<script lang="ts">
  import { onMount } from 'svelte';
  import API from './firestore';
  import TodoList from './components/TodoList.svelte';
  import type { Todo } from './types';

  let todos: Todo[] = [];

  let newTask = '';

  async function addTodo(e: any) {
    e.preventDefault();

    const todo = {
      task: newTask,
      done: false,
    };
    const ref = await API.add(todo);

    todos = todos.concat({
      ...todo,
      id: ref.id,
    });

    newTask = '';
  }

  $: remaining = todos.filter((t) => !t.done).length;

  onMount(async () => {
    todos = await API.fetchTodos();
  });
</script>

<style>
  .title {
    font-size: 30px;
    text-align: center;
  }

  .handleliste {
    position: relative;
  }

  .add-todo {
    display: grid;
    place-items: center;
  }

  .handleliste__remaining {
    text-align: center;
  }
</style>

<main>
  <section class="handleliste">
    <h1 class="title">Handleliste</h1>
    <section class="handleliste__remaining">
      <p>{remaining} gjenstår.</p>
    </section>
    <TodoList bind:todos />
  </section>
  <section class="add-todo">
    <form on:submit={addTodo}>
      <input type="text" bind:value={newTask} />
      <button type="submit">Legg til</button>
    </form>
  </section>
</main>
