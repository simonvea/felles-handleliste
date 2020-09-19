<script lang="typescript">
  export let type = 'button';
  export let disabled: boolean = false;
  export let onClick: () => void = () => {};
</script>

<button
  {type}
  {disabled}
  on:click={onClick}
  class="text-xl bg-green-500 m-4 p-2 shadow-md border-none rounded {$$props.class}">
  <slot />
</button>
