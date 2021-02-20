<script lang="typescript">
  export let checked: boolean;
  export let onClick: () => void;
</script>

<input
  class="m-4 p-4 transform scale-150"
  type="checkbox"
  {checked}
  on:click={onClick}
/>
