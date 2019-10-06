<template>
  <div class="container mb-3">
    <div class="d-flex mb-3">
      <div class="mr-auto">
        <h3>Search Results for "{{ reformattedSearchString }}"</h3>
      </div>
      <div class="btn-group ml-auto" role="group">
        <button
          @click="changeDisplayMode('grid')"
          type="button"
          class="btn btn-outline-secondary"
          v-bind:class="{ active: displayMode === 'grid' }"
        >
          <i class="fa fa-th"></i>
        </button>
        <button
          @click="changeDisplayMode('list')"
          type="button"
          class="btn btn-outline-secondary"
          v-bind:class="{ active: displayMode === 'list' }"
        >
          <i class="fa fa-list"></i>
        </button>
      </div>
    </div>

    <div class="card-columns" v-if="displayMode === 'grid'">
      <div class="card" v-bind:key="video.id.videoId" v-for="video in videos">
        <VideoGridItem v-bind:video="video"/>
        <button @click="addToPlaylist(video.id.videoId)" class = btn green>Adicionar</button>
        <h5>{{video.id.videoId}}</h5>
      </div>
    </div>
    <div v-else>
      <div class="card mb-2" v-bind:key="video.id.videoId" v-for="video in videos">
        <VideoListItem v-bind:video="video"/>
      </div>
    </div>
  </div>
</template>

<script>
import VideoListItem from './VideoListItem';
import VideoGridItem from './VideoGridItem';
import firebase from 'firebase';
import db from './firebaseInit';

export default {
  name: 'SearchResults',
  components: {
    VideoListItem,
    VideoGridItem
  },
  data() {
    var YOUR_API_KEY = 'AIzaSyCB467L1bXQLzKGddy9ReRSmhXsyZ9k5is';
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

      title: 'Search Results',
      displayMode: 'grid',
      video: video,
      id_evento: null,
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
                });
              });
            });
  },
  watch: {
    $route: "fetchData"
  },

  methods: {
    changeDisplayMode(displayMode) {
      this.displayMode = displayMode;
    },
    fetchData() {
      db.collection("eventos")
              .where("id_evento", "==", this.$route.params.id_evento)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.id_evento = doc.data().id_evento;
                });
              });
    },

    addToPlaylist(key){
      console.log(id_evento)
      console.log("Atualizado com sucesso")
      console.log(key)

      db.collection("eventos").doc().collection("playlist").add({
                link: 'https://www.youtube.com/watch?v='+key,
            }).then(function(){
              console.log("Atualizado com sucesso")
              console.log(this.id_evento)
              console.log(key)

      })
    },
  },
  props: ['videos', 'reformattedSearchString']
};
</script>

<style scoped>
button:focus {
  box-shadow: none !important;
}
</style>