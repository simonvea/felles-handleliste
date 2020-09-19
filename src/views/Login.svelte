<script lang="typescript">
  import LoginForm from '../components/ui/LoginForm.svelte';
  import Auth from '../auth';

  let loggingIn = false;
  let error = '';

  async function login(email: string, password: string) {
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

{#if loggingIn}
  <p>Logger inn...</p>
{:else if error}
  <p>error</p>
{:else}
  <LoginForm onSubmit={login} />
{/if}
