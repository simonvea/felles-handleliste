<script lang="ts">
  import type firebase from 'firebase/app';
  import { API } from './api';
  import Auth from './auth';
  import Button from './components/atoms/Button.svelte';
  import SecondaryButton from './components/atoms/SecondaryButton.svelte';
  import { todos } from './store/Todos';
  import Login from './views/Login.svelte';
  import Todos from './views/Todos.svelte';

  let currentUser: firebase.User;

  Auth.addListener((user) => {
    currentUser = user;
    if (!user) {
      API.clearListeners();
    }
  });

  async function logout() {
    await Auth.logout();
  }

  function hideFinishedTodos() {
    todos.hideFinished();
  }
</script>

<header class="m-3 mb-6 flex justify-center items-center flex-col">
  {#if currentUser}
    <section>
      <h1 class="text-xl text-center">
        Simon og Linn Jeanette sin handleliste
      </h1>
    </section>
    <section class="flex justify-between items-center">
      <SecondaryButton onClick={hideFinishedTodos}>
        Fjern fullførte
      </SecondaryButton>
      <Button color="warning" onClick={logout}>Logg ut</Button>
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
