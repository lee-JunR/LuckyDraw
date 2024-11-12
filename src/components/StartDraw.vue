<template>
  <div :class="containerClass">
    <router-link :to="{ name: 'select', query: { min: minNumber, max: maxNumber } }">
      <h1 class="text-4xl font-bold mb-6 text-center cursor-pointer">🍀 럭키 드로우 🍀</h1>
    </router-link>
    <div class="mb-6">
      <label for="minNumber" class="block text-xl mb-2">최소 번호:</label>
      <input id="minNumber" v-model="minNumber" type="number" :class="inputClass" placeholder="최소 번호" />
    </div>
    <div class="mb-6">
      <label for="maxNumber" class="block text-xl mb-2">최대 번호:</label>
      <input id="maxNumber" v-model="maxNumber" type="number" :class="inputClass" placeholder="최대 번호" />
    </div>
    <div class="mb-6">
      <label for="drawCount" class="block text-xl mb-2">뽑을 인원 수:</label>
      <input id="drawCount" v-model="drawCount" type="number" :min="1" :max="maxNumber" :class="inputClass"
        placeholder="범위 내의 숫자" />
    </div>
    <p class="mb-6 text-center text-xl">추첨을 시작하려면 아래 버튼을 클릭하세요.</p>
    <button @click="startDraw" :class="buttonClass" :disabled="!isValidDrawCount">
      추첨 시작
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  isDarkMode: Boolean
})

const router = useRouter()
const route = useRoute()

const minNumber = ref(1)  // 최소 번호 기본값
const maxNumber = ref(250) // 최대 번호 기본값
const drawCount = ref(10)  // 기본값을 10으로 설정

const isValidDrawCount = computed(() => {
  const count = Number(drawCount.value)
  return count >= 1 && count <= maxNumber.value && Number.isInteger(count)
})

const containerClass = computed(() => props.isDarkMode ? 'bg-black text-white p-10 rounded-lg shadow-md w-[600px]' : 'bg-white p-10 rounded-lg shadow-md w-[600px]')
const inputClass = computed(() => props.isDarkMode ? 'w-full px-4 py-3 text-xl border rounded-md bg-gray-800 text-white border-gray-600' : 'w-full px-4 py-3 text-xl border rounded-md')
const buttonClass = computed(() => props.isDarkMode ? 'w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 text-xl' : 'w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 text-xl')

const startDraw = () => {
  if (!isValidDrawCount.value) return;

  const selectedNumbers = route.query.numbers ? route.query.numbers.split(',').map(Number) : [];
  const excludedNumbers = route.query.excluded ? route.query.excluded.split(',').map(Number) : [];

  // availableNumbers에서 excludedNumbers를 제외
  const availableNumbers = Array.from({ length: maxNumber.value }, (_, i) => i + 1)
    .filter(num => !selectedNumbers.includes(num) && !excludedNumbers.includes(num));

  const count = Math.min(Number(drawCount.value), maxNumber.value - selectedNumbers.length);
  const randomNumbers = [];

  // 기존 결과를 localStorage에서 가져오기
  const drawHistory = JSON.parse(localStorage.getItem('drawHistory')) || [];
  // drawHistory의 각 항목에서 numbers 배열을 추출하여 평탄화
  const existingNumbers = drawHistory.flatMap(draw => draw.numbers);

  // 새로 뽑을 숫자 생성
  for (let i = 0; i < count - selectedNumbers.length; i++) {
    // availableNumbers가 없거나, 모든 availableNumbers가 existingNumbers에 포함될 경우 루프 종료
    if (availableNumbers.length === 0 || availableNumbers.every(num => existingNumbers.includes(num))) break;

    let randomIndex;
    let newNumber;

    do {
      randomIndex = Math.floor(Math.random() * availableNumbers.length);
      newNumber = availableNumbers[randomIndex];
    } while (existingNumbers.includes(newNumber) && availableNumbers.length > 1);

    // 새로운 번호가 existingNumbers에 포함되지 않는 경우만 추가
    if (!existingNumbers.includes(newNumber)) {
      randomNumbers.push(newNumber);
      existingNumbers.push(newNumber); // 기존 번호 목록에 새로 뽑은 번호 추가
      availableNumbers.splice(randomIndex, 1); // availableNumbers에서 해당 번호 제거
    }
  }

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const result = shuffleArray([...selectedNumbers, ...randomNumbers]);

  router.push({
    name: 'reveal',
    query: {
      result: result.join(','),
      excluded: route.query.excluded,
      count: count,
      start: minNumber.value,
      end: maxNumber.value
    }
  });
}
</script>