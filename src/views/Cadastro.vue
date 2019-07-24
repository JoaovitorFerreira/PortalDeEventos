<template>
    <div class = "cadastro">
        <h3> Cadastro</h3>
        <p>Complete aqui o seu cadastro!</p>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Senha"><br>
        <button @click="cadastro" >Cadastre-se</button><br>
        <span>ou volte para a tela de <router-link to="/login">login</router-link></span>
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
                        this.$router.replace('home')
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