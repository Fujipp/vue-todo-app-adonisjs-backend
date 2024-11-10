<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col mb-4">
    <div class="flex">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new task"
        maxlength="50"
        class="flex-1 border rounded-l-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-800">
        Add
      </button>
    </div>
    <div class="text-right text-sm text-gray-500 mt-1">
      {{ newTodo.length }}/50 characters
    </div>
    <!-- Toast notification -->
    <div v-if="showToast" :class="['fixed bottom-4 right-4 text-white px-4 py-2 rounded shadow', toastType === 'success' ? 'bg-green-500' : 'bg-red-500']">
      {{ toastMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newTodo = ref<string>('');
const showToast = ref<boolean>(false);
const toastMessage = ref<string>('');
const toastType = ref<'success' | 'error'>('success');

const emit = defineEmits<{
  (e: 'add-todo', newTodo: string): void;
}>();

function handleSubmit() {
  if (newTodo.value.trim() && newTodo.value.length <= 50) {
    emit('add-todo', newTodo.value);
    newTodo.value = ''; // ล้างค่าช่อง input หลังจากเพิ่มรายการ

    // แสดง Toast notification สำเร็จ
    toastMessage.value = 'Task added successfully!';
    toastType.value = 'success';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false; // ซ่อน Toast หลังจาก 3 วินาที
    }, 3000);
  } else {
    // แสดง Toast notification กรณีไม่มีชื่อ
    toastMessage.value = 'Please enter a task name!';
    toastType.value = 'error';
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false; // ซ่อน Toast หลังจาก 3 วินาที
    }, 3000);
  }
}
</script>

<style scoped>
/* สไตล์สำหรับ Toast notification */
.fixed {
  position: fixed;
  z-index: 50; /* ให้ Toast อยู่ด้านบนสุด */
}
</style>
