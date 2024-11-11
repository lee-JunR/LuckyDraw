<template>
  <div :class="containerClass">
    <h1 class="text-4xl font-bold mb-6 text-center">🎊 추첨 내역 🎊</h1>
    <div v-if="drawHistory.length === 0" class="text-center">추첨 내역이 없습니다.</div>
    <table v-else class="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr :class="tableHeaderClass">
          <th class="border border-gray-300 p-2 text-left">번호</th>
          <th class="border border-gray-300 p-2 text-left">추첨된 숫자</th>
          <th class="border border-gray-300 p-2 text-left">시작 번호</th>
          <th class="border border-gray-300 p-2 text-left">끝 번호</th>
          <th class="border border-gray-300 p-2 text-left">인원 수</th>
          <th class="border border-gray-300 p-2 text-left">삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(draw, index) in drawHistory" :key="index" :class="tableRowClass">
          <td class="border border-gray-300 p-2">{{ index + 1 }}</td>
          <td class="border border-gray-300 p-2">
            <span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-md mr-1"
              v-for="(num, numIndex) in draw.numbers" :key="numIndex">
              {{ num }}
            </span>
          </td>
          <td class="border border-gray-300 p-2">{{ draw.start }}</td>
          <td class="border border-gray-300 p-2">{{ draw.end }}</td>
          <td class="border border-gray-300 p-2">{{ draw.count }}</td>
          <td class="border border-gray-300 p-2">
            <button @click="deleteRow(index)" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              Ⓧ
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="goToStart" :class="buttonClass" class="mt-6">
      처음으로
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isDarkMode: Boolean
})

const drawHistory = ref([]);
const router = useRouter();

onMounted(() => {
  const history = JSON.parse(localStorage.getItem('drawHistory')) || [];
  drawHistory.value = history;
});

const containerClass = computed(() => props.isDarkMode ? 'bg-black text-white p-10 rounded-lg shadow-md w-[600px]' : 'bg-white p-10 rounded-lg shadow-md w-[600px]')
const tableHeaderClass = computed(() => props.isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black')
const tableRowClass = computed(() => props.isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black')
const buttonClass = computed(() => props.isDarkMode ? 'w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 text-xl' : 'w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 text-xl')

const deleteRow = (index) => {
  drawHistory.value.splice(index, 1);
  localStorage.setItem('drawHistory', JSON.stringify(drawHistory.value));
};

const goToStart = () => {
  router.push({ name: 'start' }); // StartDraw 컴포넌트로 이동
}
</script>