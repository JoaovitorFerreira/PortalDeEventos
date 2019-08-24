<template>
  <div id="verEvento">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{nome}}</h4>
      </li>
      <li class="collection-item">ID do Evento: {{id_evento}}</li>
      <li class="collection-item">Local do Evento: {{local}}</li>
      <li class="collection-item">Tipo do Evento: {{tipo}}</li>
      <li class="collection-item">Link formulário inscrição: {{form}}</li>
    </ul>
    <router-link to="../listaEventos" class="btn grey">Back</router-link>
    <button @click="deletarEvento" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name: 'editarEvento', params:{id_evento:id_evento}}"
        class="btn-floating btn-large blue"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>

    <router-link v-bind:to="{name: 'listaDeMusicas', params:{id_evento:id_evento}}" class="btn">Lista de Músicas</router-link>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "verEvento",
  data() {
    return {
      id_evento: null,
      nome: null,
      local: null,
      tipo: null,
      form: null
    };
  },
  beforeRouteEnter(to, from, next) {
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
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
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
          });
        });
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