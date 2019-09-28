<template>
    <div id="novoEvento">
        <h3>Novo Evento</h3>
        <div class="row">
        <form @submit.prevent="salvarEvento" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="id_evento" required>
                <label>ID do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="nome" required>
                <label>Nome do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="local" required>
                <label>Local do Evento:</label>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="tipo" required>
                <label>Tipo do Evento:</label>
                </div>    
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input type="url" v-model="form" required>
                <label>Link formulário inscrição:</label>
                </div>    
            </div>
             <router-link to="/" class="btn grey">Cancel</router-link>
            <a class= "btn btn-info" role="button" href = https://docs.google.com/forms/d/14H645C0kXDhAG0-EsxdhwM2yRGCine2gKjmNOyJLQAk/copy target="_blank">Link para formulário base</a>
            <button type="submit" class="btn">Submit</button>           
            </form>
            
        </div>
    </div>
    
</template>

<script>
    import db from './firebaseInit'
    import firebase from 'firebase'

export default{
    name: 'novoEvento',
    data(){
        return {
            id_evento: null,
            nome:null,
            local:null,
            tipo:null,
            form: null,
            id_criador: null
        }
    },
    methods: {
        salvarEvento(){
            db.collection('eventos').add({
                id_evento: this.id_evento,
                nome: this.nome,
                local: this.local,
                tipo: this.tipo,
                form: this.form,
                id_criador: firebase.auth().currentUser.uid
            })
            .then(docRef=> {
                this.$router.push('/listaEventos')
            })
            .catch(error => {
                console.log(err)
            })
        }
    }
  
}
</script>

<style scoped>

</style>