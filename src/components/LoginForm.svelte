<script lang="ts">
  import Auth from '../auth';

  let loggingIn = false;
  let error = '';
  let email = '';
  let password = '';

  async function login(e) {
    e.preventDefault();
    loggingIn = true;
    try {
      await Auth.login(email, password);
    } catch (err) {
      error = err.message;
    } finally {
      loggingIn = false;
    }
  }
</script>

<style>
  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    width: 280px;
  }

  .login-form__field {
    font-size: 1.4em;
    display: flex;
    flex-direction: column;
  }

  .login-form__field label {
    font-size: 1.6em;
  }

  .login-form__field input {
    padding-left: 10px;
  }

  .login-form__submit-btn {
    font-size: 1.6em;
    background-color: lightgreen;
    margin: 1em;
    padding: 0.5em;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border: none;
  }

  .login-form__submit-btn:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
</style>

<form class="login-form" on:submit={login}>
  {#if loggingIn}
    <p>Logger inn...</p>
  {:else if error}
    <p>error</p>
  {:else}
    <div class="login-form__field login-form__field--email">
      <label for="email">Epost:</label>
      <input id="email" type="email" bind:value={email} />
    </div>
    <div class="login-form__field login-form__field--password">
      <label for="password">Passord:</label>
      <input id="password" type="password" bind:value={password} />
    </div>
    <button type="submit" class="login-form__submit-btn">Logg inn</button>
  {/if}
</form>
