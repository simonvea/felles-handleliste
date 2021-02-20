<script lang="ts">
  import { todosToShow } from '../../store/Todos';
  import TodoItem from '../organisms/TodoItem.svelte';
</script>

<ul
  class="flex flex-col flex-wrap justify-center m-auto list-none rounded shadow p-5"
>
  {#each $todosToShow as todo (todo.id)}
    <li class="border-b border-grey p-2">
      <TodoItem {todo} />
    </li>
  {/each}
</ul>
