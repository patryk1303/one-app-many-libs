import { useEffect, useState } from 'react'

const KEY = 'todos'

function App() {
  const [todos, setTodos] = useState([])
  const [todoString, setTodoString] = useState('')

  useEffect(() => {
    loadState()
  }, [])

  useEffect(() => {
    saveState()
  }, [todos])

  const saveState = () => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }
  
  const loadState = () => {
    const localTodos = localStorage.getItem(KEY, JSON.stringify(todos))

    if (localTodos) {
      const parsedTodos = JSON.parse(localTodos)
      setTodos(parsedTodos)
    }
  }

  const addTodo = e => {
    e.preventDefault()

    const newTodoItem = {
      done: false,
      description: todoString
    }
    
    setTodos([...todos.concat(newTodoItem)])
    setTodoString('')
  }

  return (
    <div className="site">
      <form className="todo-form" onSubmit={addTodo}>
        <label htmlFor="todo-input" className="todo-form__label">What do you want to do?</label>
        <input
          id="todo-input"
          type="text"
          className="todo-form__input"
          name="todo"
          required
          value={todoString}
          onChange={e => { setTodoString(e.target.value) }}
        />
        <button type="submit" className="todo-form__submit btn">Add to list</button>
      </form>

      <main className="todo-section">
        <ul className="todo-list">
          {todos.map(todo => {
            return <li key={todo.description} className="todo-list__item">
              <label className="todo-list__label">
                <input
                  type="checkbox"
                  className="todo-list__checkbox"
                  checked={todo.done}
                  onChange={e => {
                  const idx = todos.findIndex(localTodo => todo.description === localTodo.description)
                  if (idx >= 0) {
                    const clonedTodos = [...todos]
                    clonedTodos.splice(idx, 1)
                    todo.done = e.target.checked
                    clonedTodos.splice(idx, 0, todo)
                    setTodos(clonedTodos)
                  }
                }} />
                <span
                  className={`todo-list__description ${todo.done ? 'todo-list__description--done' : ''}`}>{todo.description}</span>
              </label>
              <button className="todo-list__remove btn btn--danger" onClick={e => {
                const idx = todos.findIndex(localTodo => todo.description === localTodo.description)
                if (idx >= 0) {
                  setTodos(todos.filter((_el, localIdx) => localIdx !== idx))
                }
              }}>Remove</button>
            </li>
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
