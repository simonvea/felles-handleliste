<script lang="ts">
  import Button from '../atoms/Button.svelte';

  export let onSubmit: (email: string, password: string) => void;

  let email = '';
  let password = '';

  function handleSubmit(e: Event) {
    e.preventDefault();
    onSubmit(email, password);
  }
</script>

<form
  class="flex flex-col justify-between items-center h-32 w-56"
  on:submit={handleSubmit}>
  <div class="flex flex-col">
    <label for="email" class="text-xl">Epost:</label>
    <input id="email" type="email" class="pl-3 text-xl" bind:value={email} />
  </div>
  <div class="text-lg flex flex-col">
    <label for="password" class="text-xl">Passord:</label>
    <input
      id="password"
      type="password"
      class="pl-3 text-xl"
      bind:value={password} />
  </div>
  <Button type="submit">Logg inn</Button>
</form>
