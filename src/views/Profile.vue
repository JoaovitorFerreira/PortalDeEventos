<template>
  <div class="profile">
      <div id="profileUser">
          <h1>ola mundo</h1>
          <button @click="deleteUser">Deletar Usuário</button>
      </div>
  </div>
</template>


<script>
    import firebase from 'firebase'
    export default {
        name:'profile',
        components: {
        },
        methods:{
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