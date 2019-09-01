<template>
  <div class="container blue">
    <nav class="blue">
      <ul class>
        <li class="left" v-bind:class="{ disabled: prevPageToken === undefined }">
          <a @click="prevPage" class="page-link" href="#">Anterior</a>
        </li>
        <li class="right" v-bind:class="{ disabled: nextPageToken === undefined }">
          <a @click="nextPage" class="page-link" href="#">Próximo</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['prevPageToken', 'nextPageToken'],
  methods: {
    prevPage() {
      this.$emit('prev-page');
    },
    nextPage() {
      this.$emit('next-page');
    }
  }
};
</script>

<style scoped>
.page-link {
  box-shadow: none !important;
}
</style>