import TodoListView from '../views/TodoListView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    { path: '/todolist', name: 'todolist', component: TodoListView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
  ],
});

export default router;
