<script lang="ts">
  import { addTodo } from '../store/Todos';
  import type { Todo } from '../types';
  import api from '../api';

  async function onSubmit(e: any) {
    e.preventDefault();

    const todo: Omit<Todo, 'id'> = {
      task,
      done: false,
    };
    const ref = await api.add(todo);

    if (ref) {
      addTodo({ id: ref.id, task, done: false });
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
          '.add-todo__field'
        ) as HTMLInputElement).focus(),
      0
    );
  };

  const toggleField = () => (showField = !showField);
</script>

<style>
  .add-todo {
    display: grid;
    place-items: center;
  }

  .add-todo__add-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: lightblue;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
    font-size: 40px;
    border: none;
    position: fixed;
    bottom: 1em;
    right: 1em;
  }

  .add-todo__form {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0.5em;
    left: 0;
    width: 100%;
    max-width: 100vw;
  }

  .add-todo__field {
    font-size: 1.6em;
    margin: 1em;
  }
</style>

<section class="add-todo">
  {#if !showField}
    <button class="add-todo__add-btn" on:click={onAddTodo}>+</button>
  {:else}
    <form on:submit={onSubmit} class="add-todo__form">
      <input
        type="text"
        bind:value={task}
        on:blur={toggleField}
        class="add-todo__field" />
      <button type="submit" disabled={!task}>Legg til</button>
    </form>
  {/if}
</section>
