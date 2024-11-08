import { createRouter, createWebHistory } from 'vue-router'
// import SelectNumbers from '../components/SelectNumbers.vue'
import SelectNumbers from '@/components/SelectNumbers.vue'
import StartDraw from '@/components/StartDraw.vue'
import DrawResult from '@/components/DrawResult.vue'
import RevealWinners from '@/components/RevealWinners.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/select',
      name: 'select',
      component: SelectNumbers,
    },
    {
      path: '/',
      name: 'start',
      component: StartDraw,
    },
    {
      path: '/result',
      name: 'result',
      component: DrawResult,
    },
    {
      path: '/reveal',
      name: 'reveal',
      component: RevealWinners,
    }
  ],
})

export default router