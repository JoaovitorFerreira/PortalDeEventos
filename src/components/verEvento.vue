<template>
  <div id="verEvento">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{nome}}</h4>
      </li>
      <li class="collection-item">ID do Evento: {{id_evento}}</li>
      <li class="collection-item">Local do Evento: {{local}}</li>
      <li class="collection-item">Tipo do Evento: {{tipo}}</li>
      <li class="collection-item">Link formulário inscrição: <a v-bind:href="form" target="_blank">{{form}}</a></li>
    </ul>
    <router-link v-bind:to="{name: 'listaDeMusicas', params:{id_evento:id_evento}}" class="btn">Lista de Músicas</router-link><br><br>
    <router-link to="../listaEventos" class="btn grey">Voltar</router-link>
    <button v-if="usuarioDono" @click="deletarEvento" class="btn red">Deletar</button>

    <div v-if="usuarioDono" class="fixed-action-btn">
      <router-link        
        v-bind:to="{name: 'editarEvento', params:{id_evento:id_evento}}"
        class="btn-floating btn-large blue"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>

    
  </div>
</template>

<script>
import db from './firebaseInit';
import firebase from 'firebase';
var user;
export default {
  name: "verEvento",
  data() {
    return {
      id_evento: null,
      nome: null,
      local: null,
      tipo: null,
      form: null,
      id_criador: null,
      usuarioDono:false
    };
  },
  beforeRouteEnter(to, from, next) {
    user = firebase.auth().currentUser
    db.collection("eventos")
      .where("id_evento", "==", to.params.id_evento)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.id_evento = doc.data().id_evento;
            vm.nome = doc.data().nome;
            vm.local = doc.data().local;
            vm.tipo = doc.data().tipo;
            vm.form = doc.data().form;
            vm.id_criador = doc.data().id_criador;
              if(vm.id_criador == user.uid){
              vm.usuarioDono = true;
              }
          });
        });
      }
      )
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
                    // colocar um v-if="usuarioDono" no botão de editar
/* usuarioDono(){  // (\/ não estou conseguindo referenciar o evento de maneira correta)
      if( this.eventos.id_criador == firebase.auth().currentUser.uid) 
        return true;
      else
        return false;
    }, */

    fetchData() {
      db.collection("eventos")
        .where("id_evento", "==", this.$route.params.id_evento)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id_evento = doc.data().id_evento;
            this.nome = doc.data().nome;
            this.local = doc.data().local;
            this.tipo = doc.data().tipo;
            this.form = doc.data().form;
            this.id_criador = doc.data().id_criador;           
        
          });
        }
        )
        
    },
    deletarEvento() {
      if (confirm("Tem certeza?")) {
        db.collection("eventos")
          .where("id_evento", "==", this.$route.params.id_evento)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("../listaEventos");
            });
          });
      }
    }
  }
};
</script>

<style scoped>
</style>