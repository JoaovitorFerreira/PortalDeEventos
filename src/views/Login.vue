<template>
    <div class = "login">
        <h3> Login</h3>
        <input type="text" v-model="email" placeholder="email"><br>
        <input type="password" v-model="password" placeholder="senha"><br>
        <button @click="login" >Login</button>
        <p>sem conta? não se preocupe, clique no link abaixo e se una a nossa rede!</p>
        <router-link to="/Cadastro">Cadastre aqui!</router-link>
    </div>

</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "login",
        data(){
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user)=>{
                        alert(`Você logou como ${this.email}`);
                        this.$router.replace('home')
                        location.reload();
                    },
                    (err) => {
                        alert('Opa! '+err.message)
                    }
                );

            }
        }
    }
</script>
