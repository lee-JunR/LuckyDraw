<template>
  <div class="bg-white p-10 rounded-lg shadow-md w-[600px]">
    <h1 class="text-4xl font-bold mb-6 text-center">조작 숫자 선택</h1>
    <div class="mb-4">
      <input v-model="inputNumber" type="number" min="1" max="250" placeholder="1-250 사이의 숫자"
        class="w-full px-4 py-3 text-xl border rounded-md" />
    </div>
    <button @click="addNumber" class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 mb-6 text-xl">
      추가
    </button>
    <div class="mb-4">
      <p class="font-semibold text-xl">선택된 숫자:</p>
      <p class="text-xl">{{ selectedNumbers.join(', ') }}</p>
    </div>
    <button @click="goToStart" class="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 text-xl">
      다음
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputNumber = ref('')
const selectedNumbers = ref([])

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