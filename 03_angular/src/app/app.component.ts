import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

const KEY = 'todos'

type TodoItem = {
  done: boolean
  description: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todo: string = ''
  todos: TodoItem[] = []

  ngOnInit(): void {
    this.loadState()
  }

  saveState() {
    localStorage.setItem(KEY, JSON.stringify(this.todos))
  }

  loadState() {
    const todos = localStorage.getItem(KEY)

    if (todos) {
      this.todos = [...JSON.parse(todos)]
    }
  }

  addTodo(event?: Event) {
    event?.preventDefault()

    const newTodo: TodoItem = {
      done: false,
      description: this.todo
    }

    this.todos = [...this.todos, newTodo]

    this.todo = ''

    this.saveState()
  }

  removeItem(todoItem: TodoItem) {
    const idx = this.todos.indexOf(todoItem)

    if (idx >= 0) {
      this.todos.splice(idx, 1)
    }

    this.saveState()
  }
}
