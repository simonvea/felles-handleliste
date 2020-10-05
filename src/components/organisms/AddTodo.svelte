<script lang="ts">
  import { addTodo } from '../../store/Todos';
  import type { Todo } from '../../types';
  import { API } from '../../api';
  import Button from '../atoms/Button.svelte';
  import TodoInput from '../atoms/TodoInput.svelte';

  async function onSubmit(e: any) {
    e.preventDefault();

    if (!task) throw new Error('No Task!');

    const todo: Omit<Todo, 'id'> = {
      task,
      done: false,
    };
    const ref = await API.add(todo);

    task = '';
    (e.target.querySelector('textarea') as HTMLInputElement).focus();
  }

  let task = '';
</script>

<form
  on:submit={onSubmit}
  class="flex justify-center items-center rounded shadow bg-teal-100">
  <TodoInput bind:value={task} border={true} />
  <Button type="submit">Legg til</Button>
</form>
