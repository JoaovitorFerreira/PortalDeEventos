<template>
    <div class = "cadastro container center-align">
        <h3>Cadastro</h3>
        <p>Complete aqui o seu cadastro!</p>
        <input type="text" v-model="email" placeholder="Email" class="validate"><br>
        <input type="password" v-model="password" placeholder="Senha" class="validate"><br><br>
        <button  class="btn waves-effect waves-light blue" @click="cadastro">Cadastre-se
           <i class="material-icons right">send</i> </button><br><br>
      <router-link class = "btn waves-effect waves-light red" to="/login">Voltar</router-link>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "cadastro",
        data(){
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            cadastro: function () {
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) =>{
                        this.$router.push('login')
                        location.reload();

                    },
                    function (err) {
                        alert('Espere! ' + err.message)
                    }
                );
            }
        }
    }

</script>

<style scoped>

</style>