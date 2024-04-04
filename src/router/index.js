import { createRouter, createWebHashHistory } from 'vue-router';
import MainView from '../views/MainView.vue';
import AddHabitView from '../views/AddHabitView.vue';
import CategoryManager from '../views/CategoryManager.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/day/' + new Date().toISOString().split('T')[0],
  },
  {
    path: '/day/:date',
    name: 'day',
    component: MainView,
    props: true,
  },
  {
    path: '/add-habit',
    name: 'addHabit',
    component: AddHabitView,
  },
  {
    path: '/categories',
    component: CategoryManager,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
