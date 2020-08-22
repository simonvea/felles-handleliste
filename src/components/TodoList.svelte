<script lang="ts">
  import type { Todo } from '../types';
  import API from '../api';
  import { todos, removeTodo, updateTodo } from '../store/Todos';
  import TrashIcon from './TrashIcon.svelte';

  let timer = 0;

  async function deleteTodo(id: string) {
    removeTodo(id);
    await API.delete(id);
  }

  function handleInput(target: HTMLTextAreaElement, id: string) {
    setElementHeightToScrollHeight(target);
    updateTodoAsync(id, target.value);
  }

  function setElementHeightToScrollHeight(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }

  function updateTodoAsync(id: string, task: string) {
    updateTodo(id, { task });
    const todo = $todos.find((todo) => todo.id === id);
    clearTimeout(timer);
    timer = setTimeout(() => {
      API.update({ ...todo, task });
    }, 1000);
  }

  function toggleDone(id: string, prevDone: boolean) {
    updateTodo(id, { done: !prevDone });
    const todo = $todos.find((todo) => todo.id === id);
    API.update({ ...todo, done: !prevDone });
  }
</script>

<style>
  .handleliste__liste {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0;
    list-style: none;
  }

  .handleliste__card {
    border-radius: 2px;
    padding: 4px 8px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    margin: 2px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  /* On mouse-over, add a deeper shadow */
  .handleliste__card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
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

  .handleliste__todo {
    font-size: 1.3em;
    flex-grow: 4;
    border: none;
    background-color: transparent;
    resize: none;
    overflow: hidden;
    padding: 10px;
    min-height: 40px;
    max-height: 80px;
  }

  button {
    all: unset;
  }
</style>

<ul class="handleliste__liste">
  {#each $todos as todo (todo.id)}
    <li class="handleliste__card">
      <input
        class="handleliste__checkbox"
        type="checkbox"
        checked={todo.done}
        on:click={() => toggleDone(todo.id, todo.done)} />
      <textarea
        class="handleliste__todo"
        value={todo.task}
        on:input={({ target }) => handleInput(target, todo.id)} />
      <button type="button" on:click={() => deleteTodo(todo.id)}>
        <TrashIcon />
      </button>
    </li>
  {/each}
</ul>
