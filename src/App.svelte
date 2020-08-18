<script lang="ts">
  import { db } from "./db";
  import { onMount } from "svelte";
  import { updateTodoFirestore, fetchTodos } from "./firestore";

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

  async function deleteTodo(id: string) {
    todos = todos.filter(todo => todo.id !== id);
    await collection.doc(id).delete();
  }

  const updateTodo = async (newTodo: any) => {
    const index = todos.findIndex(todo => todo.id === newTodo.id);
    if (index !== -1) {
      todos[index] = newTodo;
    }
  };

  function toggleDone(id: string) {
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].done = !todos[index].done;
    console.log("hei");
    updateTodoFirestore(todos[index]);
  }

  let timer = 0;
  function updateTodoAsync(id: string, task: string) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], task };
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateTodoFirestore({ ...todos[index], task });
    }, 1000);
  }

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

  .handleliste__liste {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    padding-left: 0;
    list-style: none;
  }

  .add-todo {
    display: grid;
    place-items: center;
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

<main>
  <section class="handleliste">
    <h1 class="title">Handleliste</h1>
    <ul class="handleliste__liste">
      {#each todos as todo (todo.id)}
        <li>
          <input
            class="handleliste__checkbox"
            type="checkbox"
            checked={todo.done}
            on:click={() => toggleDone(todo.id)} />
          <input
            value={todo.task}
            on:input={({ target }) => updateTodoAsync(todo.id, target.value)} />
          <button type="button" on:click={() => deleteTodo(todo.id)}>
            Slett
          </button>
          <span>Done: {todo.done}</span>
        </li>
      {/each}
    </ul>
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
