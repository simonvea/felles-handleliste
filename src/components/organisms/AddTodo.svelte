<script lang="ts">
  import { addTodo } from '../../store/Todos';
  import type { Todo } from '../../types';
  import { API } from '../../api';
  import Button from '../atoms/Button.svelte';

  async function onSubmit(e: any) {
    e.preventDefault();
    console.log('Hei');

    const todo: Omit<Todo, 'id'> = {
      task,
      done: false,
    };
    const ref = await API.add(todo);

    if (ref) {
      addTodo({ id: ref.id, ...todo });
    }

    task = '';
    (e.target.querySelector('input') as HTMLInputElement).focus();
  }

  let task = '';

  let showField = false;

  const onAddTodo = () => {
    toggleField();
    setTimeout(
      () =>
        (document.querySelector(
          '#add-todo__field'
        ) as HTMLInputElement).focus(),
      0
    );
  };

  const toggleField = () => (showField = !showField);
</script>

<section>
  {#if !showField}
    <button
      class="w-16 h-16 rounded-full bg-blue-400 shadow border-none fixed
      bottom-0 right-0 m-4"
      on:click={onAddTodo}>
      +
    </button>
  {:else}
    <form
      on:submit={onSubmit}
      class="flex justify-center items-center fixed bottom-0 my-2 left-0
      max-w-screen-xl w-full">
      <input
        id="add-todo__field"
        type="text"
        bind:value={task}
        class="text-2xl m-4" />
      <Button type="submit" disabled={!task}>Legg til</Button>
    </form>
  {/if}
</section>
