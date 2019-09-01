<template>
    <nav>  
        <div class="nav-wrapper blue">           
              <div class="container">
              <span v-if="usuarioEstaLogado"><router-link to="/profile">{{usuarioLogado}}</router-link></span>
              <span class="brand-logo" v-else>Portal de Festas Unirio</span>    
              <ul id="nav-mobile" class="right hide-on-med-and-down">          
              <li v-if="usuarioEstaLogado"><router-link to="/profile">Profile</router-link></li>
              <li v-if="usuarioEstaLogado"><router-link to="/home">Home</router-link></li>
              <li v-if="usuarioEstaLogado"><router-link to="/listaEventos">Gerenciador de Eventos</router-link></li>
              <li v-if="usuarioEstaLogado"><a v-on:click="logout" class="waves-effect waves-light btn red">Logout</a></li>
            </ul>
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