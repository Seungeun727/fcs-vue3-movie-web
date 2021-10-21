export default{
  // module
  namespaced: true,

  // 상태
  state: () => ({
    movies: []
  }),
  
  // computed
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbUID)
    }
  },

  // methods
  mutations: {
    resetMovies(state) {
      return state.movies = []
    }
  },

  // 비동기 처리
  actions: {

  },
}