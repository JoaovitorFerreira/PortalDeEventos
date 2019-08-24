import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Cadastro from "./views/Cadastro"
import Profile from './views/Profile'
import listaEventos from '@/components/listaEventos'
import editarEvento from '@/components/editarEvento'
import novoEvento from '@/components/novoEvento'
import verEvento from '@/components/verEvento'
import listaDeMusicas from '@/components/listaDeMusicas'
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
      path: '/cadastro',
      name: 'Cadastro',
      component: Cadastro
    },
    {
      path: '/listaEventos',
      name: 'listaEventos',
      component: listaEventos,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/listaDeMusicas/:id_evento',
      name: 'listaDeMusicas',
      component: listaDeMusicas,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editarEvento/:id_evento',
      name: 'editarEvento',
      component: editarEvento,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/verEvento/:id_evento',
      name: 'verEvento',
      component: verEvento,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new',
      name: 'novoEvento',
      component: novoEvento,
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
      redirect: '/login'
    },

    {
      path: '/',
      redirect: '/login'

    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;