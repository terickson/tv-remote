import { createRouter, createWebHistory } from 'vue-router'
import RoomView from '@/views/RoomView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/room/:roomId',
      name: 'Room',
      component: RoomView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/room/family-room',
    },
  ],
})

export default router
