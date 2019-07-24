import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false;

let app ='';

const firebaseConfig = {
  apiKey: "AIzaSyAvagxI_0z8D3JCh-u-M4DVF7ewZFOYQ7s",
  authDomain: "portal-de-eventos.firebaseapp.com",
  databaseURL: "https://portal-de-eventos.firebaseio.com",
  projectId: "portal-de-eventos",
  storageBucket: "",
  messagingSenderId: "374776665206",
  appId: "1:374776665206:web:145895fff72e179a"
};
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render:h => {
        return h(App);
      }
    }).$mount('#app');
  }
});

