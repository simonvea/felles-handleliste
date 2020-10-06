<script lang="ts">
  import TodoList from '../components/ui/TodoList.svelte';
  import AddTodo from '../components/organisms/AddTodo.svelte';
  import { todos, remainingTodos } from '../store/Todos';
</script>

<section class="relative max-w-md">
  <section class="text-center">
    <p>{$remainingTodos.length} gjenstår.</p>
  </section>
  {#if $todos.length > 0}
    <section class="mb-24">
      <TodoList />
    </section>
  {:else}
    <p>Legg til noe å kjøpe! =)</p>
  {/if}
  <section
    class="flex justify-center items-center w-full fixed bottom-0 my-2 left-0">
    <AddTodo />
  </section>
</section>
