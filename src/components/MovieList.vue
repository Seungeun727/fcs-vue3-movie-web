<template>
  <div class="container">
    <div class="inner">
      <MovieItem v-for="movie in movies" :key="movie.imdbID" />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    MovieItem
  },
  data() {
    return {
      movies: []
    }
  }
}
</script>

<style>

</style>