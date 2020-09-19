<script lang="typescript">
  export let value: string;
  export let onInput: ({ target: HTMLTextAreaElement }) => void;

  function handleInput({ target }) {
    setElementHeightToScrollHeight(target);
    onInput(target);
  }

  function setElementHeightToScrollHeight(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }
</script>

<textarea
  class="flex flex-grow border-none resize-none overflow-hidden p-3 text-lg"
  {value}
  on:input={handleInput} />
