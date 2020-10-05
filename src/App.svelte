<script lang="ts">
  import type { User } from 'firebase';
  import { API } from './api';
  import Auth from './auth';
  import Button from './components/atoms/Button.svelte';
  import SecondaryButton from './components/atoms/SecondaryButton.svelte';
  import { todos } from './store/Todos';
  import Login from './views/Login.svelte';
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

  function deleteFinishedTodos() {
    $todos.forEach((todo) => {
      if (todo.done) {
        API.delete(todo.id);
      }
    });
  }
</script>

<header class="m-3">
  {#if currentUser}
    <section>
      <h1 class="text-xl">Simon og Linn Jeanette sin handleliste</h1>
    </section>
    <section class="relative h-12">
      <SecondaryButton onClick={deleteFinishedTodos}>
        Fjern fullførte
      </SecondaryButton>
      <Button class="absolute right-0 mx-8" color="warning" onClick={logout}>
        Logg ut
      </Button>
    </section>
  {/if}
</header>
<main class="max-w-full p-5 flex flex-col justify-center items-center">
  {#if !currentUser}
    <Login />
  {/if}
  {#if currentUser}
    <Todos />
  {/if}
</main>
