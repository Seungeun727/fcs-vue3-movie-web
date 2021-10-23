import axios from 'axios'

export default {
  // module
  namespaced: true,

  // 상태
  state: () => ({
    movies: [], 
    message: '',
    loading: false
  }),
  
  // computed
  getters: {
    movieIds(state) {  
      return state.movies.map(m => m.imdbUID)
    }
  },

  // methods
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      // 객체의 데이터를 가지고 새로운 배열 생성함.
      Object.keys(payload).forEach(key => {
        state[key] = payload[key] 
      })
    },

    assignMovies (state, Search) {
      state.movies = Search
    },

    resetMovies(state) {
      state.movies = []
    }
  },

  // 비동기 처리
  actions: {
    async searchMovies({commit}, payload) {
      const { title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const { Search, totalResults } = res.data 
      commit('updateState', {
        movies: Search,
      })
      console.log(totalResults)  // 268=> 27
      console.log(typeof totalResults)  // String

      const total = parseInt(totalResults, 10)
      const pageLength = Math.ceil(total / 10)

      // 추가 요청 전송
      // page가 number보다 크면 break로 빠지고 
      // 다음 axios로 받아온게 실행이 안됨
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page+= 1) {
          if (page > (number / 10)) break
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)    
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ...Search]
          }) 
        }
      }
      //console.log(res)
    }
  }
}