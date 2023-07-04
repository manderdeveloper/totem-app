
import RoomContainer from '../components/RoomContainer.vue'
import GameContainer from '../components/GameContainer.vue'
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'RoomContainer',
    component: RoomContainer
  },
  {
    path: '/room/:uuid',
    name: 'GameContainer',
    component: GameContainer
  }
];



const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
