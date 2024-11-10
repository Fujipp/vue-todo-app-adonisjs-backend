<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AddTodoForm from './components/AddTodoForm.vue';
import TodoList from './components/TodoList.vue';
import Background from './components/Background.vue';
import { API_BASE_URL } from './config.js';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todos = ref<Todo[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/todos`);
    todos.value = response.data.map((todo: any) => ({
      ...todo,
      completed: Boolean(todo.completed),
    }));
    console.log('Todos after fetching:', todos.value);
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
});


async function addTodo(newTodo: string) {
  if (newTodo.trim()) {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        text: newTodo,
        completed: false,
      });
      todos.value.push(response.data);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }
}

async function removeTodo(id: number) {
  try {
    await axios.delete(`${API_BASE_URL}/todos/${id}`);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error('Error removing todo:', error);
  }
}

async function toggleTodoStatus(id: number) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/todos/${id}/toggle`);
    const updatedTodo = response.data;
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = updatedTodo.completed;
    }
  } catch (error) {
    console.error('Error toggling todo status:', error);
  }
}
</script>

<template>
  <div class="min-h-screen p-6">
    <h1 class="text-3xl font-bold text-center mb-6">My Todo List</h1>
    <AddTodoForm @add-todo="addTodo" />
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodoStatus"
      @remove-todo="removeTodo"
    />
  </div>
  <Background />
</template>


<style scoped>
</style>
