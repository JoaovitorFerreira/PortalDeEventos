<template>
    <div class = "login">
        <h3> Login</h3>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Senha"><br>
        <button @click="login" >Login</button>
        <p>sem conta? não se preocupe, clique no link abaixo e se una a nossa rede!</p>
        <router-link to="/Cadastro">Cadastre aqui!</router-link>
    </div>

</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "Login",
        data(){
            return {
                email:'',
                password:''
            };
        },
        methods: {
            login: function () {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) =>{
                        this.$router.replace('home')
                    },
                    (err) => {
                        alert('Opa! '+err.message)
                    }
                );
            }
        }
    }
</script>
