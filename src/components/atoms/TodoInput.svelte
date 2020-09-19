<script lang="typescript">
  export let value: string;
  export let onInput: ({ target: HTMLTextAreaElement }) => void = ({
    target,
  }) => (value = target.value);
  export let border: boolean = false;

  function handleInput(e) {
    setElementHeightToScrollHeight(e.target);
    onInput(e);
  }

  function setElementHeightToScrollHeight(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }
</script>

<textarea
  class="flex flex-grow resize-none overflow-hidden p-3 text-lg {border ? 'border border-gray-300 m-2' : 'border-none'}"
  {value}
  on:input={handleInput} />
