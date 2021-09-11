<script>
  import { onMount } from 'svelte'

  const KEY = 'todos'

  let todo = ''
  let todos = []

  const saveState = () => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }

  const loadState = () => {
    const stateTodos = localStorage.getItem(KEY)

    if (stateTodos) {
      todos = JSON.parse(stateTodos)
    }
  }

  const addTodo = () => {
    const newTodoItem = {
      done: false,
      description: todo
    }

    todos = [...todos, newTodoItem]

    todo = ''

    saveState()
  }

  const removeTodo = (todoItem) => {
    const idx = todos.indexOf(todoItem)

    if (idx >= 0) {
      todos.splice(idx, 1)
      todos = todos
    }

    saveState()
  }

  onMount(() => {
    loadState()
  })
</script>

<div class="site">
  <form class="todo-form" on:submit|preventDefault={addTodo}>
    <label for="todo-input" class="todo-form__label">What do you want to do?</label>
    <input id="todo-input" type="text" class="todo-form__input" name="todo" required bind:value={todo}>
    <button type="submit" class="todo-form__submit btn">Add to list</button>
  </form>

  <main class="todo-section">
    <ul class="todo-list">
      {#each todos as todoItem}
        <li class="todo-list__item">
          <label class="todo-list__label">
            <input
              bind:checked={todoItem.done}
              on:input={saveState}
              type="checkbox"
              class="todo-list__checkbox">
            <span
              class:todo-list__description--done={todoItem.done}
              class="todo-list__description"
            >{todoItem.description}</span>
          </label>
          <button
            on:click={removeTodo(todoItem)}
            class="todo-list__remove btn btn--danger">Remove</button>
        </li>
      {/each}
    </ul>
  </main>
</div>