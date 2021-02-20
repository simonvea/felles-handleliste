<script lang="ts">
  import { todos } from '../../store/Todos';
  import type { Todo } from '../../types';
  import Auth from '../../auth';
  import Button from '../atoms/Button.svelte';
  import TodoInput from '../atoms/TodoInput.svelte';

  async function onSubmit(e: any) {
    e.preventDefault();

    if (!task) throw new Error('No Task!');

    const user = Auth.currentUser;

    const todo: Omit<Todo, 'id'> = {
      task,
      created: new Date(),
      createdByEmail: user.email,
      hide: false,
      lastChanged: new Date(),
      done: false,
    };

    todos.add(todo);

    task = '';
    (e.target.querySelector('textarea') as HTMLTextAreaElement).focus();
  }

  let task = '';
</script>

<form
  on:submit={onSubmit}
  class="flex justify-center items-center rounded shadow bg-green-200"
>
  <TodoInput bind:value={task} border={true} />
  <Button type="submit">Legg til</Button>
</form>
