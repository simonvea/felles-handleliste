<script lang="ts">
  import type { Todo } from '../types';
  import API from '../api';
  export let todos: Todo[];

  let timer = 0;
  // TODO: Changing todos here does not change todos in parent. So when adding new

  async function deleteTodo(id: string) {
    todos = todos.filter((todo) => todo.id !== id);
    await API.delete(id);
  }

  function updateTodoAsync(id: string, task: string) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], task };
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      API.update({ ...todos[index], task });
    }, 1000);
  }

  function toggleDone(id: string) {
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].done = !todos[index].done;
    API.update(todos[index]);
  }
</script>

<style>
  .handleliste__liste {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    padding-left: 0;
    list-style: none;
  }

  .handleliste__checkbox {
    /* Double-sized Checkboxes */
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
    transform: scale(2);
    padding: 10px;
    margin: 10px;
  }
</style>

<ul class="handleliste__liste">
  {#each todos as todo (todo.id)}
    <li>
      <input
        class="handleliste__checkbox"
        type="checkbox"
        checked={todo.done}
        on:click={() => toggleDone(todo.id)} />
      <textarea
        value={todo.task}
        on:input={({ target }) => updateTodoAsync(todo.id, target.value)} />
      <button type="button" on:click={() => deleteTodo(todo.id)}>Slett</button>
    </li>
  {/each}

</ul>
