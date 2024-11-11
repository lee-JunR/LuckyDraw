<template>
  <div :class="containerClass">
    <h1 class="text-4xl font-bold mb-6 text-center">숫자 선택</h1>
    <div class="mb-4">
      <input v-model="inputNumber" type="number" min="1" max="250" placeholder="1-250 사이의 숫자" :class="inputClass" />
    </div>
    <button @click="addNumber" :class="addButtonClass">
      추가
    </button>
    <div class="mb-4">
      <p class="font-semibold text-xl">선택된 숫자:</p>
      <p :class="textClass">{{ selectedNumbers.join(', ') }}</p>
    </div>
    <button @click="goToStart" :class="nextButtonClass">
      다음
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isDarkMode: Boolean
})

const router = useRouter()
const inputNumber = ref('')
const selectedNumbers = ref([])

const containerClass = computed(() => props.isDarkMode ? 'bg-black text-white p-10 rounded-lg shadow-md w-[600px]' : 'bg-white p-10 rounded-lg shadow-md w-[600px]')
const inputClass = computed(() => props.isDarkMode ? 'w-full px-4 py-3 text-xl border rounded-md bg-gray-800 text-white border-gray-600' : 'w-full px-4 py-3 text-xl border rounded-md')
const addButtonClass = computed(() => props.isDarkMode ? 'w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 mb-6 text-xl' : 'w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 mb-6 text-xl')
const nextButtonClass = computed(() => props.isDarkMode ? 'w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 text-xl' : 'w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 text-xl')
const textClass = computed(() => props.isDarkMode ? 'text-xl text-white' : 'text-xl')

const addNumber = () => {
  const num = parseInt(inputNumber.value)
  if (num >= 1 && num <= 250 && !selectedNumbers.value.includes(num)) {
    selectedNumbers.value.push(num)
    inputNumber.value = ''
  }
}

const goToStart = () => {
  router.push({
    name: 'start',
    query: { numbers: selectedNumbers.value.join(',') }
  })
}
</script>