
<template>
  <div id="listaDeMusicas"></div>
</template>
<script>
import db from "./firebaseInit.js";
export default {
  name: "listaDeMusicas",
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
    }
  }
};
</script>
<style scoped>
</style>