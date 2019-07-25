<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">Logout</button>
    <button @click="deleteUser">Deletar Usuário</button>
  </div>
</template>

<script>

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from 'firebase'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods:{
    logout() {
      firebase.auth().signOut().then((user) =>{
        this.$router.replace('login')
      });
    },
    deleteUser(){
      var user = firebase.auth().currentUser;
      var userEmail = firebase.auth().currentUser.email;

      user.delete().then((user) =>{
        alert(`A conta de ${userEmail} foi excluída!`);
        this.$router.replace('login')
      }).catch(function(error) {
        
      });
    }
    
  }
}
</script>
