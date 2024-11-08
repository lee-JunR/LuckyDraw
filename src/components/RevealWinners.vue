<template>
  <div class="bg-white p-10 rounded-lg shadow-md w-[600px]">
    <div v-if="showDrum" class="flex flex-col items-center justify-center h-[400px]">
      <div class="tenor-gif-embed" data-postid="17543249" data-share-method="host" data-aspect-ratio="1"
        data-width="100%">
        <a href="https://tenor.com/view/drum-joypixels-snare-drum-drummer-performance-gif-17543249">Drum Joypixels
          Sticker</a>
      </div>
      <button @click="revealWinner" class="mt-4 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 text-xl"
        style="z-index: 1000;">
        {{ currentIndex === -1 ? '당첨자 보여주기' : '당첨자 확인하기' }}
      </button>
    </div>
    <div v-else>
      <h1 class="text-4xl font-bold mb-6 text-center">당첨자 발표</h1>
      <div class="flex flex-col items-center justify-center mb-6">
        <div class="text-9xl font-bold mb-4">{{ currentNumber }}</div>
        <p class="text-2xl mb-2">{{ currentIndex + 1 }} / {{ result.length }}</p>
      </div>
      <div class="flex justify-between mb-4">
        <button @click="redrawWinner" class="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 text-lg">
          다시 뽑기
        </button>
        <button v-if="currentIndex < result.length - 1" @click="showNextDrum"
          class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-lg">
          다음 당첨자
        </button>
        <button v-else @click="showAllResults"
          class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 text-lg">
          전체 결과 보기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const showDrum = ref(true)
const currentIndex = ref(-1)
const result = ref([])

const selectedNumbers = computed(() =>
  route.query.numbers ? route.query.numbers.split(',').map(Number) : []
)

const availableNumbers = computed(() => {
  return Array.from({ length: 250 }, (_, i) => i + 1)
    .filter(num => !selectedNumbers.value.includes(num) && !result.value.includes(num))
})

const currentNumber = computed(() => result.value[currentIndex.value])

onMounted(() => {
  result.value = route.query.result ? route.query.result.split(',').map(Number) : []
  loadGifScript()
})

const loadGifScript = () => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://tenor.com/embed.js'
  script.async = true
  document.body.appendChild(script)
}

watch(currentIndex, (newIndex) => {
  if (newIndex !== -1) {
    loadGifScript()
  }
})

const revealWinner = () => {
  showDrum.value = false
  if (currentIndex.value === -1) {
    currentIndex.value = 0
  }
}

const showNextDrum = () => {
  if (currentIndex.value < result.value.length - 1) {
    currentIndex.value++
    showDrum.value = true
  }
}

const redrawWinner = () => {
  if (availableNumbers.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.value.length)
    const newNumber = availableNumbers.value[randomIndex]
    result.value[currentIndex.value] = newNumber
  }
}

const showAllResults = () => {
  router.push({
    name: 'result',
    query: {
      numbers: route.query.numbers,
      result: result.value.join(','),
      count: route.query.count
    }
  })
}
</script>

<style scoped>
.tenor-gif-embed {
  width: 100%;
  height: 100%;
}
</style>