import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cadastro from "./views/Cadastro"
import Profile from './views/Profile'
import GerenciadordeEventos from './views/GerenciadordeEventos'
import firebase from "firebase";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/Cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/GerenciadordeEventos',
      name: 'GerenciadordeEventos',
      component: GerenciadordeEventos,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '*',
      redirect:'/login'
    },

    {
      path:'/',
      redirect: '/login'

    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
});

router.beforeEach((to, from, next) =>{
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;