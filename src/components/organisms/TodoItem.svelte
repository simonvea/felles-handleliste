<script lang="typescript">
  import DeleteButton from '../atoms/DeleteButton.svelte';
  import { API } from '../../api';
  import { todos, removeTodo, updateTodo } from '../../store/Todos';
  import type { Todo } from '../../types';
  import CheckBox from '../atoms/CheckBox.svelte';
  import TodoInput from '../atoms/TodoInput.svelte';

  export let todo: Todo;

  let timer = 0;

  async function deleteTodo(id: string) {
    await API.delete(id);
    removeTodo(id);
  }

  function updateTodoAsync(id: string, task: string) {
    updateTodo(id, { task });
    const todo = $todos.find((todo) => todo.id === id);
    clearTimeout(timer);
    timer = setTimeout(() => {
      API.update({ ...todo, task });
    }, 1000);
  }

  function toggleDone(id: string, prevDone: boolean) {
    updateTodo(id, { done: !prevDone });
    const todo = $todos.find((todo) => todo.id === id);
    API.update({ ...todo, done: !prevDone });
  }
</script>

<article class="flex items-center">
  <CheckBox
    checked={todo.done}
    onClick={() => toggleDone(todo.id, todo.done)} />
  <TodoInput
    value={todo.task}
    onInput={({ target }) => updateTodoAsync(todo.id, target.value)} />
  <DeleteButton onClick={() => deleteTodo(todo.id)} />
</article>
