<template>
  <div class="flex items-center justify-between border-b p-3">
    <div class="flex flex-col items-start select-none text-dark ">
      <div class="flex items-center">
        <div class="relative cursor-pointer" @click.stop="toggleTodo">
          <input
            type="checkbox"
            v-model="todo.completed"
            class="peer sr-only"
          />
          <div
            class="block h-8 w-14 rounded-full bg-gray-800 dark:bg-gray-700 peer-checked:bg-blue-600 transition"
          ></div>
          <div
            class="absolute left-1 top-1 flex items-center justify-center w-6 h-6 transition bg-white rounded-full dot dark:bg-gray-500 peer-checked:translate-x-full peer-checked:dark:bg-white"
          ></div>
        </div>
        <span class="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300 truncate max-w-[150px] sm:max-w-[250px] md:max-w-none">
          {{ todo.text }}
          <span v-if="todo.completed" class="text-green-500 hidden sm:inline">complete</span>
        </span>
      </div>
      <span v-if="todo.completed" class="text-green-500 text-sm mt-1 block sm:hidden">
        complete
      </span>
    </div>
    <button
      @click="removeTodo"
      class="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-lg group"
    >
      <span
        class="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-600 rounded-full group-hover:w-56 group-hover:h-56"
      ></span>
      <span
        class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"
      ></span>
      <span class="relative text-sm font-semibold">Delete</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: 'toggle-todo', id: number): void;
  (e: 'remove-todo', id: number): void;
}>();

function toggleTodo() {
  emit('toggle-todo', props.todo.id);
}

function removeTodo() {
  emit('remove-todo', props.todo.id);
}
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
