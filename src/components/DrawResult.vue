<template>
  <div :class="containerClass">
    <canvas id="confetti-canvas" class="fixed inset-0 w-full h-full pointer-events-none"></canvas>
    <h1 class="text-4xl font-bold mb-6 text-center">추첨 결과</h1>
    <p class="text-2xl mb-4 text-center">선택된 인원: {{ count }}명</p>
    <div class="grid grid-cols-5 gap-4 mb-6">
      <div v-for="(number, index) in result" :key="index" class="p-4 text-center rounded-md text-2xl"
        :class="selectedNumbers.includes(number) ? (isDarkMode ? 'bg-green-700 text-white' : 'bg-green-200 text-black') : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200')">
        {{ number }}
      </div>
    </div>
    <button @click="resetDraw" class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 text-xl">
      처음으로
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import confetti from 'canvas-confetti'


const props = defineProps({
  isDarkMode: Boolean
})

const containerClass = computed(() => props.isDarkMode ? 'bg-black text-white p-10 rounded-lg shadow-md w-[600px]' : 'bg-white p-10 rounded-lg shadow-md w-[600px]')

const router = useRouter()
const route = useRoute()

const selectedNumbers = computed(() =>
  route.query.numbers ? route.query.numbers.split(',').map(Number) : []
)

const result = computed(() =>
  route.query.result ? route.query.result.split(',').map(Number) : []
)

const count = computed(() =>
  route.query.count ? Number(route.query.count) : 0
)

const resetDraw = () => {
  router.push({ name: 'start' })
}

const launchConfetti = () => {
  const canvas = document.getElementById('confetti-canvas')
  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  })

  const duration = 5 * 1000
  const end = Date.now() + duration

  const launchRandomConfetti = () => {
    const timeLeft = end - Date.now()

    myConfetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      shapes: ['circle'],
    })

    myConfetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      shapes: ['circle'],
    })

    if (timeLeft > 0) {
      requestAnimationFrame(launchRandomConfetti)
    }
  }

  launchRandomConfetti()
}

onMounted(() => {
  launchConfetti()
})
</script>