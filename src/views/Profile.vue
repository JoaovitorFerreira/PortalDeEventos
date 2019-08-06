<template>
  <div class="profile">
      <div id="profileUser">          
          <h1>Perfil do Usuário</h1>
         <div class="center-align">
             <br><br>
          <button class="btn waves-effect waves-light red" @click="deleteUser">Deletar Usuário</button>
      </div>
      </div>
  </div>
</template>


<script>
    import firebase from 'firebase'
    import Navbar from '@/components/Navbar'
    export default {
        name:'profile',
        components: {
        },
        methods:{
            deleteUser(){
                 if(confirm('Tem certeza?')){
                var user = firebase.auth().currentUser;
                var userEmail = firebase.auth().currentUser.email;
                user.delete().then((user) =>{
                    alert(`A conta de ${userEmail} foi excluída!`);
                    this.$router.replace('login')
                    location.reload();
                }).catch(function(error) {

                });
            }
            }

        }
    }
</script>