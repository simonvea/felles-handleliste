<script lang="ts">
  import { todos } from '../../store/Todos';
  import TodoItem from '../organisms/TodoItem.svelte';
</script>

<ul class="flex flex-col justify-center m-auto list-none rounded shadow p-5">
  {#each $todos as todo (todo.id)}
    <li class="border-b border-grey p-2">
      <TodoItem {todo} />
    </li>
  {/each}
</ul>
