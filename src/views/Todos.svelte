<script lang="ts">
  import TodoList from '../components/TodoList.svelte';
  import AddTodo from '../components/AddTodo.svelte';
  import { todos, remainingTodos } from '../store/Todos';

  let error = '';
</script>

<style>
  .handleliste {
    position: relative;
    max-width: 600px;
  }

  .handleliste__remaining {
    text-align: center;
  }
</style>

<section class="handleliste">
  <section class="handleliste__remaining">
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
