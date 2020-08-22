<script lang="ts">
  import type { User } from 'firebase';
  import API from './api';
  import Auth from './auth';
  import LoginForm from './components/LoginForm.svelte';
  import { todos } from './store/Todos';
  import Todos from './views/Todos.svelte';

  let unsubscribe;
  let currentUser: User;

  todos.set([
    { id: '2', task: 'tets', done: false },
    { id: '5', task: 'Denne er ferdig', done: true },
  ]);

  Auth.addListener((user) => {
    currentUser = user;
    if (user) {
      unsubscribe = API.addListener((snap) => {
        todos.set(API.getTodosFromSnapshot(snap));
      });
    } else if (unsubscribe) {
      unsubscribe();
    }
  });

  async function logout() {
    await Auth.logout();
  }
</script>

<style>
  .header {
    width: calc(100vw - 20px);
    margin: 10px;
    height: calc(20vh - 20px);
  }

  .header__toolbar {
    position: relative;
    height: 40px;
  }

  .logout-btn {
    position: absolute;
    right: 20px;
  }

  .main-container {
    width: calc(100vw - 40px);
    padding: 20px;
    height: calc(80vh - 40px);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }
</style>

<header class="header">
  {#if currentUser}
    <section class="header__title">
      <h1>Simon og Linn Jeanette sin handleliste</h1>
    </section>
    <section class="header__toolbar">
      <button class="logout-btn" on:click={logout}>Logg ut</button>
    </section>
  {/if}
</header>
<main class="main-container">
  {#if !currentUser}
    <LoginForm />
  {/if}
  {#if currentUser}
    <Todos />
  {/if}
</main>
