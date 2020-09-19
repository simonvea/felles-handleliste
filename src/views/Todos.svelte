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
    <section class="mb-24">
      <TodoList />
    </section>
  {:else if error}
    <p>{error}</p>
  {:else}
    <p>Henter todos...</p>
  {/if}
  <section
    class="flex justify-center items-center w-full fixed bottom-0 my-2 left-0">
    <AddTodo />
  </section>
</section>
