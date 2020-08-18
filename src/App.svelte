<script lang="ts">
  import { db } from "./db";
  import { onMount } from "svelte";

  const name = "Handleliste";
  const collection = db.collection("todos");

  let todos = [
    {
      id: "1",
      task: "Hello",
      done: false
    },
    { id: "2", task: "Whats up", done: false }
  ];

  let newTask = "";

  async function addTodo(e: any) {
    e.preventDefault();

    const todo = {
      task: newTask,
      done: false
    };

    const ref = await collection.add(todo);

    const newTodo = {
      ...todo,
      id: ref.id
    };
    todos = [...todos, newTodo];
    newTask = "";
  }

  function deleteTodo(id: string) {
    todos = todos.filter(todo => todo.id !== id);
  }

  const updateTodo = async (newTodo: any) => {
    const index = todos.findIndex(todo => todo.id === newTodo.id);
    if (index !== -1) {
      todos.splice(index, 1, newTodo);
    }
  };

  async function updateTodoAsync(todo) {}

  const updateTodoFirestore = async (todo: any) => {
    const updatedTodo = {
      ...todo
    };

    delete updatedTodo.id;

    await collection.doc(todo.id).update(updatedTodo);
    console.info("Updated todo: ", todo.task);
  };

  function toggleDone(id: string) {
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].done = !todos[index].done;
    updateTodoFirestore(todos[index]);
  }

  async function fetchTodos() {
    const querysnapshot = await collection.orderBy("done").get();
    const downloadedTodos = [];
    querysnapshot.forEach(doc => {
      const data = doc.data();

      const todo = {
        id: doc.id
      } as {
        id: string;
        task: string;
        done: boolean;
      };

      if ("task" in data) {
        todo.task = data.task;
      }
      if ("done" in data) {
        todo.done = data.done;
      }

      downloadedTodos.push(todo);
    });
    todos = downloadedTodos;
  }
  onMount(fetchTodos);

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
  }

  .add-todo {
    display: grid;
    place-items: center;
  }
</style>

<main>
  <section class="handleliste">
    <h1 class="title">{name}</h1>
    <ul class="handleliste__liste">
      {#each todos as todo (todo.id)}
        <li>
          <input
            type="checkbox"
            checked={todo.done}
            on:click={() => toggleDone(todo.id)} />
          <input bind:value={todo.task} />
          <button type="button" on:click={() => deleteTodo(todo.id)}>
            Slett
          </button>
          <span>Done: {todo.done}</span>
        </li>
      {/each}
    </ul>
  </section>
  <section class="add-todo">
    <form on:submit={addTodo}>
      <input type="text" bind:value={newTask} />
      <button type="submit">Legg til</button>
    </form>
  </section>
</main>
