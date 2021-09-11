<template>
  <div class="site">
    <form class="todo-form" @submit.prevent="addTodo">
      <label for="todo-input" class="todo-form__label">What do you want to do?</label>
      <input id="todo-input" type="text" class="todo-form__input" name="todo" required v-model="todo">
      <button type="submit" class="todo-form__submit btn">Add to list</button>
    </form>

    <main class="todo-section">
      <ul class="todo-list">
        <li
          v-for="todoItem in todos"
          :key="todoItem.description"
          class="todo-list__item">
          <label class="todo-list__label">
            <input
              v-model="todoItem.done"
              @change="saveState"
              type="checkbox"
              class="todo-list__checkbox">
            <span
              :class="[todoItem.done ? 'todo-list__description--done' : '']"
              class="todo-list__description"
            >{{todoItem.description}}</span>
          </label>
          <button
            @click="removeTodo(todoItem)"
            class="todo-list__remove btn btn--danger">Remove</button>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'

const KEY = 'todos'

export default {
  name: 'App',
  data() {
    return {
      todo: '',
      todos: []
    }
  },
  mounted() {
    this.loadState()
  },
  methods: {
    saveState() {
      localStorage.setItem(KEY, JSON.stringify(this.todos))
    },
    loadState() {
      const storeTodos = localStorage.getItem(KEY)

      if (storeTodos) {
        Vue.set(this, 'todos', JSON.parse(storeTodos))
      }
    },
    addTodo() {
      const newTodo = {
        done: false,
        description: this.todo
      }

      this.todos.push(newTodo)

      this.todo = ''

      this.saveState()
    },
    removeTodo(todoItem) {
      const idx = this.todos.indexOf(todoItem)

      if (idx >= 0) {
        this.todos.splice(idx, 1)
      }

      this.saveState()
    }
  }
}
</script>
