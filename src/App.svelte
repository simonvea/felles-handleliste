<script lang="ts">
  import { onMount } from 'svelte';
  import API from './firestore';
  import TodoList from './components/TodoList.svelte';
  import type { Todo } from './types';
  import user, { isLoggedin } from './userstore';
  import { init, login as loginAuth, logout } from './db';

  isLoggedin.subscribe(async (value) => {
    if (value) {
      todos = await API.fetchTodos();
    }
  });

  let todos: Todo[] = [];

  let newTask = '';

  function login(e) {
    e.preventDefault();
    loginAuth(email, password);
  }

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

  let email = '';
  let password = '';

  onMount(async () => {
    init();
    if ($isLoggedin) {
      todos = await API.fetchTodos();
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

  .login-form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 2px;
    position: absolute;
    bottom: 10vh;
  }

  .login-form__field {
    grid-column: span 2;
  }

  .login-form__submit-btn {
    grid-column: 2 / 4;
    grid-row: 2;
  }
</style>

<main>
  {#if !$isLoggedin}
    <form class="login-form" on:submit={login}>
      <label class="login-form__field">
        Epost:
        <input type="email" bind:value={email} />
      </label>
      <label class="login-form__field">
        Passord:
        <input type="password" bind:value={password} />
      </label>
      <button type="submit" class="login-form__submit-btn">Logg inn</button>
    </form>
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
      <TodoList bind:todos />
    </section>
    <section class="add-todo">
      <form on:submit={addTodo}>
        <input type="text" bind:value={newTask} />
        <button type="submit">Legg til</button>
      </form>
    </section>
  {/if}
</main>
