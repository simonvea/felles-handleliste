<script lang="ts">
  import { db } from "./db";
  import { onMount } from "svelte";
  import { updateTodoFirestore, fetchTodos } from "./firestore";
  import TodoList from "./components/TodoList.svelte";

  const collection = db.collection("todos");

  let todos = [];

  let newTask = "";

  async function addTodo(e: any) {
    e.preventDefault();

    const todo = {
      task: newTask,
      done: false
    };
    const ref = await collection.add(todo);

    todos = todos.concat({
      ...todo,
      id: ref.id
    });

    newTask = "";
  }

  const updateTodo = async (newTodo: any) => {
    const index = todos.findIndex(todo => todo.id === newTodo.id);
    if (index !== -1) {
      todos[index] = newTodo;
    }
  };

  $: remaining = todos.filter(t => !t.done).length;

  onMount(async () => (todos = await fetchTodos()));

  // TODO: Create store and subscribe to changes? Update firestore in subscription.
  // Alternatively, update periodically (with only changes, if there are any)
  // A separate "changed" list, conataining changed todos?
</script>

<style>
  .title {
    font-size: 30px;
    text-align: center;
  }

  .handleliste {
    position: relative;
  }

  .add-todo {
    display: grid;
    place-items: center;
  }
</style>

<main>
  <section class="handleliste">
    <h1 class="title">Handleliste</h1>
    <TodoList {todos} />
  </section>
  <section>
    <p>{remaining} gjenstår.</p>
  </section>
  <section class="add-todo">
    <form on:submit={addTodo}>
      <input type="text" bind:value={newTask} />
      <button type="submit">Legg til</button>
    </form>
  </section>
</main>
