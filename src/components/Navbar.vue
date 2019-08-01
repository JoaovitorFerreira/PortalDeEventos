<template>
    <nav>  
        <div class="nav-wrap blue">
            <div class="container">
                <p v-if="usuarioEstaLogado"><span>{{usuarioLogado}}</span></p>                
                <p v-if="usuarioEstaLogado"><router-link to="/profile">Profile</router-link></p>
                <p v-if="usuarioEstaLogado"><router-link to="/home">Home</router-link></p>
                <p v-if="usuarioEstaLogado"><router-link to="/listaEventos">Gerenciador de Eventos</router-link></p>
                <p v-if="usuarioEstaLogado"><button v-on:click="logout">Logout</button></p>
    </div>
        </div>
    </nav>    
   
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "Navbar",
        data() {
            return {
                usuarioEstaLogado: false,
                usuarioLogado: false
            }
        },
        created(){
            if(firebase.auth().currentUser){
                this.usuarioEstaLogado = true;
                this.usuarioLogado = firebase.auth().currentUser.email;
            }
        },

        methods:{
            logout: function () {
                firebase.auth().signOut().then(() =>{
                    this.$router.replace('/login')
                    location.reload();
                });

            }
        }



    }
</script>

<style scoped>
    .email {
        padding-right: 10px;
    }
</style>