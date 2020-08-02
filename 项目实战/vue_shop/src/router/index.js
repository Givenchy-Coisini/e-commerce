import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
    path: '/home',
    component: Home,
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users }
    ],
      redirect: '/welcome'
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径中来
  // next 是一个函数,表示放行
  // next()  next('/login)强制跳转
  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login')// 如果没有token 就是没有登录直接跳转到登录页
  next()// 否则就是登录了直接放行就行
})
export default router
