
<template>
  <div id="listaDeMusicas">

    <form class="mb-5">
      <div class="input-group">
        <input
                v-model="searchString"
                @keydown.13.prevent="parseSearchString"
                type="text"
                class="form-control"
                placeholder="Search ..."
        >
        <div class="input-group-append">
          <button @click="parseSearchString" class="btn btn-outline-secondary" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>




  </div>
</template>
<script>
import db from "./firebaseInit.js";
export default {
  name: "listaDeMusicas",
  data() {
    var YOUR_API_KEY = AIzaSyCB467L1bXQLzKGddy9ReRSmhXsyZ9k5is;
    return {
      videos:[],
      reformattedSearchString:'',
      api:{
        baseUrl: 'https://www.googleapis.com/youtube/v3/search?',
        part: 'snippet',
        type: 'video',
        order: 'viewCount',
        maxResults: 12,
        q: '',
        key: YOUR_API_KEY,
        prevPageToken: '',
        nextPageToken: ''
      },
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
    search(searchParams) {
      this.reformattedSearchString = searchParams.join(' ');
      this.api.q = searchParams.join('+');
      const { baseUrl, part, type, order, maxResults, q, key } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}`;
      this.getData(apiUrl);
    },

    prevPage() {
      const { baseUrl, part, type, order, maxResults, q, key, prevPageToken } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${prevPageToken}`;
      this.getData(apiUrl);
    },

    nextPage() {
      const { baseUrl, part, type, order, maxResults, q, key, nextPageToken } = this.api;
      const apiUrl = `${baseUrl}part=${part}&type=${type}&order=${order}&q=${q}&maxResults=${maxResults}&key=${key}&pageToken=${nextPageToken}`;
      this.getData(apiUrl);
    },

    getData(apiUrl) {
      axios
              .get(apiUrl)
              .then(res => {
                this.videos = res.data.items;
                this.api.prevPageToken = res.data.prevPageToken;
                this.api.nextPageToken = res.data.nextPageToken;
              })
              .catch(error => console.log(error));
    }
  }
};
</script>
<style scoped>

  input,
  button {
    box-shadow: none !important;
  }

  .form-control {
    border-color: #6c757d;
  }


</style>