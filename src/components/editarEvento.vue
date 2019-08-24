<template>
    <div id="editarEvento">
        <h3>Editar Evento</h3>
        <div class="row">
        <form @submit.prevent="updateEvento" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                <input disabled type="text" v-model="id_evento" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="nome" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="local" required>
                </div>    
            </div>
             <div class="row">
                <div class="input-field col s12">
                <input type="text" v-model="tipo" required>
                </div>    
            </div>
            <div class="row">
                <div class="input-field col s12">
                <input type="url" v-model="form" required>
                </div>    
            </div>
             <router-link to="../listaEventos" class="btn grey">Cancel</router-link>
            <button type="submit" class="btn">Submit</button>           
            </form>
        </div>
    </div>
</template>

<script>
    import db from './firebaseInit'
    export default{
    name: 'editarEvento',
    data(){
       return {
            id_evento: null,
            nome:null,
            local:null,
            tipo:null,
            form:null
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('eventos').where('id_evento','==',to.params.id_evento).get().then(querySnapshot =>{
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.id_evento = doc.data().id_evento
                    vm.nome = doc.data().nome
                    vm.local = doc.data().local
                    vm.tipo = doc.data().tipo
                    vm.form = doc.data().form
                })
            })
        })
    },
    watch:{
        '$route': 'fetchData'
    },
    methods: {
        fetchData(){
            db.collection('eventos').where('id_evento','==',this.$route.params.id_evento).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.id_evento = doc.data().id_evento
                this.nome = doc.data().nome
                this.local = doc.data().local
                this.tipo = doc.data().tipo
                this.form = doc.data().form
            })
            })
        },
        updateEvento(){
            db.collection('eventos').where('id_evento','==',this.$route.params.id_evento).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
               doc.ref.update({
                   id_evento: this.id_evento,
                   nome: this.nome,
                   local: this.local,
                   tipo: this.tipo,
                   form: this.form
               })
               .then(
                   () =>
                   this.$router.push({name: 'verEvento', params: {id_Evento:this.id_evento}})
               )
            })
            })
        }
    
    }
  
}
</script>

<style scoped>

</style>