<template>
  <div :class="containerClass">
    <h1 class="text-4xl font-bold mb-6 text-center">숫자 선택</h1>
    <div class="mb-4">
      <input v-model="inputNumber" type="number" :min="minNumber" :max="maxNumber"
        :placeholder="`${minNumber}-${maxNumber} 사이의 숫자`" :class="inputClass" />
    </div>
    <div class="flex space-x-4 mb-6">
      <button @click="addNumber" :class="addButtonClass">
        추가
      </button>
      <button @click="excludeNumber" :class="addButtonClass">
        제외
      </button>
    </div>
    <div class="mb-4">
      <p class="font-semibold text-xl">선택된 숫자:</p>
      <p :class="textClass">
        <span v-for="num in selectedNumbers" :key="num" class="number-item selected" @click="removeNumber(num)">
          {{ num }}
        </span>
      </p>
      <p class="font-semibold text-xl">제외된 숫자:</p>
      <p :class="textClass">
        <span v-for="num in excludedNumbers" :key="num" class="number-item excluded" @click="removeExcludedNumber(num)">
          {{ num }}
        </span>
      </p>
    </div>
    <button @click="goToStart" :class="nextButtonClass">
      다음
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

const inputNumber = ref('')
const selectedNumbers = ref([])
const excludedNumbers = ref([])

// 최소 번호와 최대 번호를 쿼리 파라미터에서 가져오기
const minNumber = Number(route.query.min) || 1; // 기본값 1
const maxNumber = Number(route.query.max) || 250; // 기본값 250

const containerClass = computed(() => props.isDarkMode ? 'bg-black text-white p-10 rounded-lg shadow-md w-[600px]' : 'bg-white p-10 rounded-lg shadow-md w-[600px]')
const inputClass = computed(() => props.isDarkMode ? 'w-full px-4 py-3 text-xl border rounded-md bg-gray-800 text-white border-gray-600' : 'w-full px-4 py-3 text-xl border rounded-md')
const addButtonClass = computed(() => props.isDarkMode ? 'w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 mb-6 text-xl' : 'w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 mb-6 text-xl')
const nextButtonClass = computed(() => props.isDarkMode ? 'w-full bg-green-700 text-white py-3 rounded-md hover:bg-green-800 text-xl' : 'w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 text-xl')
const textClass = computed(() => props.isDarkMode ? 'text-xl text-white' : 'text-xl')

// 숫자를 추가하는 함수
const addNumber = () => {
  const num = parseInt(inputNumber.value);

  // NaN 방지 및 범위 체크
  if (isNaN(num) || num < minNumber || num > maxNumber) {
    alert(`입력한 숫자는 ${minNumber}와 ${maxNumber} 사이여야 합니다.`);
    return; // 범위를 초과할 경우 함수 종료
  }

  if (!selectedNumbers.value.includes(num) && !excludedNumbers.value.includes(num)) {
    selectedNumbers.value.push(num); // 선택된 숫자에 추가
  } else {
    alert('이미 선택된 숫자이거나 제외된 숫자입니다.');
  }

  inputNumber.value = ''; // 입력 필드 초기화
}

// 숫자를 제외하는 함수
const excludeNumber = () => {
  const num = parseInt(inputNumber.value);

  // NaN 방지 및 범위 체크
  if (isNaN(num) || num < minNumber || num > maxNumber) {
    alert(`입력한 숫자는 ${minNumber}와 ${maxNumber} 사이여야 합니다.`);
    return; // 범위를 초과할 경우 함수 종료
  }

  if (!excludedNumbers.value.includes(num) && !selectedNumbers.value.includes(num)) {
    excludedNumbers.value.push(num); // 제외된 숫자에 추가
  } else {
    alert('이미 제외된 숫자이거나 선택된 숫자입니다.');
  }

  inputNumber.value = ''; // 입력 필드 초기화
}

const removeNumber = (num) => {
  selectedNumbers.value = selectedNumbers.value.filter(n => n !== num);
}

// 제외된 숫자를 제거하는 함수
const removeExcludedNumber = (num) => {
  excludedNumbers.value = excludedNumbers.value.filter(n => n !== num);
}

const goToStart = () => {
  router.push({
    name: 'start',
    query: {
      numbers: selectedNumbers.value.join(','),
      excluded: excludedNumbers.value.join(',')
    }
  })
}
</script>

<style scoped>
.number-item {
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
}

.selected {
  background-color: #4caf50;
  color: white;
}

.excluded {
  background-color: #f44336;
  color: white;
}
</style>