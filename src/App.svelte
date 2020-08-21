<script lang="ts">
  import { onMount } from 'svelte';
  import API from './api';
  import TodoList from './components/TodoList.svelte';
  import type { Todo } from './types';
  import user, { isLoggedin } from './userstore';
  import { init, login as loginAuth, logout } from './auth';
  import LoginForm from './components/LoginForm.svelte';

  let unsubscribe;
  let error = '';

  isLoggedin.subscribe(async (value) => {
    if (value) {
      unsubscribe = API.addListener((snap) => {
        todos = API.getTodosFromSnapshot(snap);
      });
    } else if (unsubscribe) {
      unsubscribe();
    }
  });

  let todos: Todo[] = [];

  let newTask = '';

  async function addTodo(e: any) {
    e.preventDefault();

    const todo = {
      task: newTask,
      done: false,
    };
    const ref = await API.add(todo);

    if (ref) {
      todos = todos.concat({
        ...todo,
        id: ref.id,
      });
    }

    newTask = '';
  }

  $: remaining = todos.filter((t) => !t.done).length;

  onMount(async () => {
    init();
    if ($isLoggedin) {
      try {
        todos = await API.fetchTodos();
      } catch (err) {
        console.error(err);
        error = `Klarte ikke hente todos. Status ${err.status}: ${err.message}.`;
      }
    }
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
  {#if !$isLoggedin}
    <LoginForm />
  {/if}
  {#if $isLoggedin}
    <section>
      <button on:click={logout}>Logg ut</button>
    </section>
    <section class="handleliste">
      <h1 class="title">Handleliste</h1>
      <section class="handleliste__remaining">
        <p>{remaining} gjenstår.</p>
      </section>
      {#if todos}
        <TodoList bind:todos />
      {:else if error}
        <p>{error}</p>
      {:else}
        <p>Henter todos...</p>
      {/if}
    </section>
    <section class="add-todo">
      <form on:submit={addTodo}>
        <input type="text" bind:value={newTask} maxlength="14" />
        <button type="submit">Legg til</button>
      </form>
    </section>
  {/if}
</main>
