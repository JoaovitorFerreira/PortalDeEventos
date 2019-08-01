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
             <router-link to="/" class="btn grey">Cancel</router-link>
            <button type="submit" class="btn">Submit</button>           
            </form>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit'
export default{
    name: 'novoEvento',
    data(){
        return {
            id_evento: null,
            nome:null,
            local:null,
            tipo:null
        }
    },
    methods: {
        salvarEvento(){
            db.collection('eventos').add({
                id_evento: this.id_evento,
                nome: this.nome,
                local: this.local,
                tipo: this.tipo
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