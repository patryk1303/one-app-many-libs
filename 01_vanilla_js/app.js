const form = document.querySelector('.todo-form')
const formInput = document.querySelector('.todo-form__input')
const list = document.querySelector('.todo-list')

const KEY = 'todos'

const todos = []

const renderAll = (todos, add = true) => {
  list.innerHTML = ''

  for(const todo of todos) {
    addTodo(todo.description, todo.done, add)
  }
}

const loadStore = () => {
  const todoString = localStorage.getItem(KEY)

  if (todoString) {
    const todos = JSON.parse(todoString)

    renderAll(todos)
  }
}

const saveStore = () => {
  const todoString = JSON.stringify(todos)

  localStorage.setItem(KEY, todoString)
}

const bindTodoEvents = (todoItem, todoObject) => {
  const checkbox = todoItem.querySelector('.todo-list__checkbox')
  /**
   * @type HTMLSpanElement
   */
  const description = todoItem.querySelector('.todo-list__description')
  const removeButton = todoItem.querySelector('.todo-list__remove')

  checkbox.addEventListener('input', e => {
    const { checked } = checkbox

    description.classList.toggle('todo-list__description--done', checked)

    todoObject.done = checked
    saveStore()
  })

  removeButton.addEventListener('click', e => {
    const idx = todos.findIndex(todo => {
      return todo.description === todoObject.description
    })

    if (idx >= 0) {
      todos.splice(idx, 1)
  
      renderAll(todos, false)
    }
  })
}

const addTodo = (description, done = false, add = true) => {
  const newTodo = {
    done,
    description
  }

  if (add) {
    todos.push(newTodo)
  }

  const newTodoItem = document.createElement('li')
  newTodoItem.classList.add('todo-list__item')

  newTodoItem.innerHTML = `
    <label class="todo-list__label">
      <input type="checkbox" class="todo-list__checkbox" ${done ? 'checked' : ''}>
      <span class="todo-list__description ${done ? 'todo-list__description--done' : ''}">
        ${newTodo.description}
      </span>
    </label>
    <button class="todo-list__remove btn btn--danger">Remove</button>
  `

  bindTodoEvents(newTodoItem, newTodo)

  list.appendChild(newTodoItem)

  formInput.value = ''

  saveStore()
}

form.addEventListener('submit', e => {
  e.preventDefault()

  const data = new FormData(form)
  const todo = data.get('todo')

  addTodo(todo)
})

loadStore()