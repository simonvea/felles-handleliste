<script lang="typescript">
  export let type = 'button';
  export let disabled: boolean = false;
  export let onClick: () => void = () => {};
  export let color: 'success' | 'warning' = 'success';

  const SUCCESS_COLOR = 'bg-green-500';
  const WARNING_COLOR = 'bg-red-500';

  let cssColor = '';

  switch (color) {
    case 'success':
      cssColor = SUCCESS_COLOR;
      break;
    case 'warning':
      cssColor = WARNING_COLOR;
      break;
  }
</script>

<button
  {type}
  {disabled}
  on:click={onClick}
  class="text-xl m-4 p-2 shadow-md border-none rounded {cssColor}
  {$$props.class}">
  <slot />
</button>
