import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

// movie store 내 변수
const _defaultMessage = 'Search for the movie title!';

export default {
  // module
  namespaced: true,

  // 상태
  state: () => ({
    movies: [], 
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  
  // computed
  getters: {
    // movieIds(state) {  
    //   return state.movies.map(m => m.imdbUID)
    // }
  },

  // methods
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      // 객체의 데이터를 가지고 새로운 배열 생성함.
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]; 
      })
    },

    // assignMovies (state, Search) {
    //   state.movies = Search
    // },

    resetMovies(state) {
      state.movies = [];
      state.message = _defaultMessage;
      state.loading = false;
    }
  },

  // 비동기 처리
  actions: {
    async searchMovies({ state, commit }, payload) { 
      if (state.loading) {  
        return 
      }
      // 검색전 메시지 초기화
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
        const res = await _fetchMovie({ 
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data 
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults);  // 268=> 27
        console.log(typeof totalResults);  // String

        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);

        // 추가 요청 전송
        // page가 number보다 크면 break로 빠지고 
        // 다음 axios로 받아온게 실행이 안됨
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page+= 1) {
            if (page > (payload.number / 10)) break
            
            const res = await _fetchMovie({ 
              ...payload,
              page
            })
            // const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)    
            const { Search } = res.data
            commit('updateState', {
              movies: [ 
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')  // 중복되는 ID 제거
              ]
            }) 
          }
        }
      } catch ({ message }) {  // error.message에서 구조 분해
        commit('updateState', {
          // 검색된 내용이 error 발생 시 화면에 안보임.
          movies: [],
          message: message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) {
      // const { id } = payload;
      if(state.loading) return 

      commit('updateState', {
        theMovie: {}, 
        loading: true
      })
      try {
        const res = await _fetchMovie(payload);
        console.log("Searched Movie", res.data);
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}
