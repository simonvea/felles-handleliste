<script lang="ts">
  import TodoList from '../components/ui/TodoList.svelte';
  import AddTodo from '../components/organisms/AddTodo.svelte';
  import { todos, remainingTodos } from '../store/Todos';

  let error = '';
</script>

<section class="relative max-w-md">
  <section class="text-center">
    <p>{$remainingTodos.length} gjenstår.</p>
  </section>
  {#if todos}
    <TodoList />
  {:else if error}
    <p>{error}</p>
  {:else}
    <p>Henter todos...</p>
  {/if}
  <AddTodo />
</section>
