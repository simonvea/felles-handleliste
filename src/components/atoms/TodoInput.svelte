<script lang="typescript">
  export let value: string;
  export let onInput: ({ target: HTMLTextAreaElement }) => void = ({
    target,
  }) => (value = target.value);
  export let border: boolean = false;

  function handleInput(e) {
    setElementHeightToScrollHeight(e.target as HTMLTextAreaElement);
    onInput(e);
  }

  function setElementHeightToScrollHeight(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }

  function submitOnEnterKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      (e.target as any).form?.dispatchEvent(
        new Event('submit', { cancelable: true })
      );
      e.preventDefault();
    }
  }
</script>

<textarea
  class="flex flex-grow resize-none overflow-hidden p-3 text-lg {border ? 'border border-gray-300 m-2' : 'border-none'}"
  {value}
  on:input={handleInput}
  on:keydown={submitOnEnterKey} />
