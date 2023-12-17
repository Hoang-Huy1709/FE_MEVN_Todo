import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TodosPage from '../views/TodosPage.vue'
import SettingPage from '../views/SettingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import BlogsPage from '../views/BlogsPage.vue'
import CreatePage from '../views/createBlogPage.vue'
import BlogDetail from '../views/BlogDetail.vue'
import TestPage from '../views/TestPage.vue'
import auth from '../store/auth';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodosPage
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: BlogsPage
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePage
  },
  {
    path: '/id=:id',
    name: 'BlogDetail',
    component: BlogDetail,
    props: true,
  },
  {
    path: '/test',
    name: 'test',
    component: TestPage
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  // Kiểm tra xem route hiện tại có yêu cầu đăng nhập không
  if (to.meta.requiresAuth) {
    // Kiểm tra trạng thái đăng nhập của người dùng
    if (!auth.state.isLoggedIn) {
      // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
      next('/login');
    } else {
      // Nếu đã đăng nhập, cho phép truy cập
      next();
    }
  } else {
    // Nếu không yêu cầu đăng nhập, cho phép truy cập
    next();
  }
});



export default router
