<script lang="ts">
  import { addTodo } from '../../store/Todos';
  import type { Todo } from '../../types';
  import { API } from '../../api';
  import Button from '../atoms/Button.svelte';
  import TodoInput from '../atoms/TodoInput.svelte';

  async function onSubmit(e: any) {
    e.preventDefault();

    if (!task) throw new Error('No Task!');

    console.log('hei!');

    const todo: Omit<Todo, 'id'> = {
      task,
      done: false,
    };
    const ref = await API.add(todo);

    // Since the store listens to API changes, this will duplicate the addition.
    // if (ref) {
    //   addTodo({ id: ref.id, ...todo });
    // }

    task = '';
    (e.target.querySelector('textarea') as HTMLInputElement).focus();
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

<form
  on:submit={onSubmit}
  class="flex justify-center items-center rounded shadow bg-teal-100">
  <TodoInput bind:value={task} border={true} />
  <Button type="submit">Legg til</Button>
</form>
