<template>
  <div>
    <div v-if="todos.length === 0" class="text-center text-gray-500">
      No todos yet. Add a new task!
    </div>
    <div v-else>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-todo="toggleTodo"
        @remove-todo="removeTodo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const props = defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits<{
  (e: 'toggle-todo', id: number): void;
  (e: 'remove-todo', id: number): void;
}>();

function toggleTodo(id: number) {
  emit('toggle-todo', id);
}

function removeTodo(id: number) {
  emit('remove-todo', id);
}
</script>

<style scoped>
</style>
