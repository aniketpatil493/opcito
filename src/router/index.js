import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['Login'];
  const requiresAuth = !publicPages.includes(to.name);
  let loginData = JSON.parse(localStorage.getItem("loginData"));
  if(requiresAuth && (!loginData || !loginData.isLoggedIn || !parseInt(loginData.isLoggedIn))) {
    if(to.name) {
      localStorage.setItem('redirectAfterLogin', to.name)
    }                    
    next("/");
  } 

  next();
});

export default router
