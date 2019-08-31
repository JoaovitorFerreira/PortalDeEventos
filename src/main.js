import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import firebase from 'firebase'
import moment from 'moment'

Vue.config.productionTip = false;

let app ='';

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

Vue.filter('formatDate', function (value) {
  if (!value) return ''
  return moment(value.toString()).format('MM/DD/YYYY hh:mm')
})

