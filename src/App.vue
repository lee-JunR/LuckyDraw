<template>
  <div :style="darkModeStyle" class="min-h-screen flex items-center justify-center bg-gray-100">
    <button @click="toggleDarkMode" class="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded">
      {{ isDarkMode ? '라이트 모드' : '다크 모드' }}
    </button>
    <router-view :is-dark-mode="isDarkMode"></router-view>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}

const darkModeStyle = computed(() => {
  return isDarkMode.value
    ? {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      padding: '1rem',
      transition: 'all 0.3s ease',
    }
    : {
      backgroundColor: '#f9f9f9',
      color: '#333',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      transition: 'all 0.3s ease',
    }
})
</script>