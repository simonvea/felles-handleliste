<script lang="typescript">
  import DeleteButton from '../atoms/DeleteButton.svelte';
  import { todos } from '../../store/Todos';
  import type { Todo } from '../../types';
  import CheckBox from '../atoms/CheckBox.svelte';
  import TodoInput from '../atoms/TodoInput.svelte';

  export let todo: Todo;

  async function deleteTodo(id: string) {
    todos.remove(id);
  }

  function updateTodoAsync(id: string, task: string) {
    todos.update(id, { task });
  }

  function toggleDone(id: string, prevDone: boolean) {
    todos.update(id, { done: !prevDone });
  }
</script>

<article class="flex items-center">
  <CheckBox
    checked={todo.done}
    onClick={() => toggleDone(todo.id, todo.done)}
  />
  <TodoInput
    value={todo.task}
    onInput={({ target }) => updateTodoAsync(todo.id, target.value)}
  />
  <DeleteButton onClick={() => deleteTodo(todo.id)} />
</article>
