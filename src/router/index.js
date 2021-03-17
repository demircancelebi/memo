import { createRouter, createWebHistory } from 'vue-router';
import Home1 from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home1,
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import('../views/Questions.vue'),
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import('../views/Play.vue'),
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
