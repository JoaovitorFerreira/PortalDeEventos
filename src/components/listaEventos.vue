<template>
    <div id="listaEventos">         
         <ul class="collection with-header">
             <li class="collection-header"><h4>Eventos</h4></li>
             <li v-for="evento in eventos"
             v-bind:key="evento.id" class="collection-item">
             {{evento.nome}}

             <router-link class="secondary-content" v-bind:to="{name: 'verEvento', params:{id_evento: evento.id_evento}}">
                 <i class="fa fa-eye"></i>
             </router-link>
             </li>
        </ul>
         
        
     
     <div class="fixed-action-btn">
         <router-link to="/new" class = "btn-floating btn-large red">
         <i class="fa fa-plus"></i>
</router-link>
    </div>
     </div>
</template>

<script>
    import firebase from 'firebase'
    import Navbar from './Navbar'
    import db from './firebaseInit'

export default{
    name: "listaEventos",
        data() {
            return {
                usuarioEstaLogado: false,
                usuarioLogado: false,
                eventos: []
            }
        },
        created(){
            if(firebase.auth().currentUser){
                this.usuarioEstaLogado = true;
                this.usuarioLogado = firebase.auth().currentUser.email;
            }
            db.collection('eventos').orderBy('nome').get().then(querrySnapshot =>{
                querrySnapshot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'id_evento':doc.data().id_evento,
                        'nome':doc.data().nome,
                        'local':doc.data().local,
                        'tipo':doc.data().tipo

                    }
                    this.eventos.push(data)
                })
            })
        },
    

}
</script>

<style scoped>

</style>