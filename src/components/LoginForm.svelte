<script lang="ts">
  import { login as loginAuth } from '../auth';

  let loggingIn = false;
  let error = '';
  let email = '';
  let password = '';

  async function login(e) {
    e.preventDefault();
    loggingIn = true;
    try {
      await loginAuth(email, password);
    } catch (err) {
      error = err.message;
    } finally {
      loggingIn = false;
    }
  }
</script>

<style>
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

<form class="login-form" on:submit={login}>
  {#if loggingIn}
    <p>Logger inn...</p>
  {:else if error}
    <p>error</p>
  {:else}
    <label class="login-form__field">
      Epost:
      <input type="email" bind:value={email} />
    </label>
    <label class="login-form__field">
      Passord:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit" class="login-form__submit-btn">Logg inn</button>
  {/if}
</form>
