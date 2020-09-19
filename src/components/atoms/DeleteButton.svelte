<script lang="ts">
  import TrashIcon from './TrashIcon.svelte';

  export let onClick: () => void;
</script>

<button type="button" on:click={onClick}>
  <TrashIcon />
</button>
