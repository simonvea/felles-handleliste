<script lang="typescript">
  import DeleteButton from '../atoms/DeleteButton.svelte';
  import { API } from '../../api';
  import { todos, removeTodo, updateTodo } from '../../store/Todos';
  import type { Todo } from '../../types';
  import CheckBox from '../atoms/CheckBox.svelte';
  import TodoInput from '../atoms/TodoInput.svelte';
  import AddTodo from './AddTodo.svelte';

  export let todo: Todo;

  let timer = 0;

  async function deleteTodo(id: string) {
    await API.delete(id);
    removeTodo(id);
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

  function drag(e: DragEvent, id: string) {
    e.dataTransfer.setData('text', id);
    console.log('drar', id);
  }

  function onDragover(e: DragEvent) {
    e.preventDefault();
    const element = e.target;
    (element as HTMLElement).classList.add('dragover');
  }

  function onDragLeave(e) {
    e.target.classList.remove('dragover');
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    console.log('motok id', id);
  }
</script>

<style>
  .dragover {
    height: 5rem;
    border: lightgray dashed 1px;
  }
</style>

<article class="flex items-center flex-col">
  <div
    class="h-1 w-full dragover"
    on:dragover={onDragover}
    on:drop={onDrop}
    on:dragleave={onDragLeave} />
  <div
    class="flex items-center"
    draggable="true"
    on:dragstart={(e) => drag(e, todo.id)}
    on:dragover={(e) => e.preventDefault()}>
    <CheckBox
      checked={todo.done}
      onClick={() => toggleDone(todo.id, todo.done)}
      on:dragover={(e) => e.preventDefault()} />
    <TodoInput
      value={todo.task}
      onInput={({ target }) => updateTodoAsync(todo.id, target.value)} />
    <DeleteButton onClick={() => deleteTodo(todo.id)} />
  </div>
</article>
