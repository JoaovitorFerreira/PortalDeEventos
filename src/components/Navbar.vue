<template>
    <div id="Navbar">
        <div id="nav">
            <ul>
                <li v-if="usuarioEstaLogado"><span class="email black-text">{{currentUser}}</span></li>
                <li v-if="usuarioEstaLogado"><router-link to="/profile">Profile</router-link></li>
                <li v-if="!usuarioEstaLogado"><router-link  to="/login">Login</router-link></li>
                <li v-if="usuarioEstaLogado"><button v-on:click="logout" class="btn black">Logout</button></li>
            </ul>
        </div>
        <router-view/>
    </div>
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
                    this.$router.push('/login')
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