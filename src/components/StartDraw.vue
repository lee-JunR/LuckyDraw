<template>
  <div class="bg-white p-10 rounded-lg shadow-md w-[600px]">
    <h1 class="text-4xl font-bold mb-6 text-center">럭키 드로우</h1>
    <div class="mb-6">
      <label for="minNumber" class="block text-xl mb-2">최소 번호:</label>
      <input id="minNumber" v-model="minNumber" type="number" class="w-full px-4 py-3 text-xl border rounded-md"
        placeholder="최소 번호" />
    </div>
    <div class="mb-6">
      <label for="maxNumber" class="block text-xl mb-2">최대 번호:</label>
      <input id="maxNumber" v-model="maxNumber" type="number" class="w-full px-4 py-3 text-xl border rounded-md"
        placeholder="최대 번호" />
    </div>
    <div class="mb-6">
      <label for="drawCount" class="block text-xl mb-2">뽑을 인원 수:</label>
      <input id="drawCount" v-model="drawCount" type="number" :min="1" :max="maxNumber"
        class="w-full px-4 py-3 text-xl border rounded-md" placeholder="범위 내의 숫자" />
    </div>
    <p class="mb-6 text-center text-xl">추첨을 시작하려면 아래 버튼을 클릭하세요.</p>
    <button @click="startDraw" class="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 text-xl"
      :disabled="!isValidDrawCount">
      추첨 시작
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const minNumber = ref(1)  // 최소 번호 기본값
const maxNumber = ref(250) // 최대 번호 기본값
const drawCount = ref(10)  // 기본값을 10으로 설정

const isValidDrawCount = computed(() => {
  const count = Number(drawCount.value)
  return count >= 1 && count <= maxNumber.value && Number.isInteger(count)
})

const startDraw = () => {
  if (!isValidDrawCount.value) return

  const selectedNumbers = route.query.numbers ? route.query.numbers.split(',').map(Number) : []
  const availableNumbers = Array.from({ length: maxNumber.value }, (_, i) => i + 1)
    .filter(num => !selectedNumbers.includes(num))

  const count = Math.min(Number(drawCount.value), maxNumber.value - selectedNumbers.length)
  const randomNumbers = []
  for (let i = 0; i < count - selectedNumbers.length; i++) {
    if (availableNumbers.length === 0) break
    const randomIndex = Math.floor(Math.random() * availableNumbers.length)
    randomNumbers.push(availableNumbers[randomIndex])
    availableNumbers.splice(randomIndex, 1)
  }

  const result = [...selectedNumbers, ...randomNumbers].sort((a, b) => a - b)

  router.push({
    name: 'reveal',
    query: {
      numbers: selectedNumbers.join(','),
      result: result.join(','),
      count: count
    }
  })
}
</script>