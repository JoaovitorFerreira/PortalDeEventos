<template>
    <div class = "login container center-align">
        <h3>Login</h3>
        <input type="text" v-model="email" placeholder="Email" class="validate"><br>
        <input type="password" v-model="password" placeholder="Senha" class="validate"><br><br>
        <button class="btn waves-effect waves-light blue" @click="login" >Login
            <i class="material-icons right">send</i>
        </button>
        <p>Sem conta? Não se preocupe, clique no link abaixo e una-se a nossa rede!</p>
        <router-link to="/Cadastro" class="btn waves-effect waves-light green">Cadastre aqui!     
         <i class="material-icons right">edit</i></router-link>
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
