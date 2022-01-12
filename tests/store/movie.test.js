import movieStore from '~/store/movie.js'
import _cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'

describe('store/movie.js', () => {
  // 전역변수 선언 
  let store; 
  
  // 반복되는 로직 처리
  beforeEach(() => {
    // movieStore는 참조 데이터이므로 원본 데이터가 수정되지 않아야 한다.
    store = _cloneDeep(movieStore);     // 깊은 복사
    store.state = store.state();
    console.log("함수", store.state);
    store.commit = (name, payload) => {  // name: 변이 메소드 
      store.mutations[name] (store.state, payload)
      console.log("store.mutations", store.mutations[name]);
    }
    store.dispatch = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch
      }
      // actions 비동기함수이므로 return 으로 반환해야한다.
      console.log("store.actions", store.actions[name]);
      return store.actions[name](context, payload)
      
    }
  })

  test('영화 데이터를 초기화합니다.', async () => {
    // this.$store.commit('movie/resetMovies');
    store.commit('updateState', {
      movies: [{ imdbID: '1'}],
      message: 'Hello World',
      loading: true
    })
    store.commit('resetMovies');

    // 객체의 내용이 같은지 확인할 때 toEqual 사용함
    expect(store.state.movies).toEqual([]);
    expect(store.state.message).toBe('Search for the movie title!');
    expect(store.state.loading).toBe(false);
  })

  test('영화 목록을 가져온 경우 데이터를 확인합니다.', async () => {
    const res = { 
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    };

    // axios.post = jest.fn(() => {   // 모의 함수로 생성
    //   return new Promise(resolve => {
    //     resolve(res); // 임의로 정한 데이터 반환한다.
    //   })
    // })
    
    // mockResolvedValue(): 비동기 함수 모의에 유용함
    axios.post = jest.fn().mockResolvedValue(res);

    await store.dispatch('searchMovies');
    expect(store.state.movies).toEqual(res.data.Search);
  }),

  test('영화 목록을 가져오지 못한 경우 에러 매세지를 확인합니다.', async() => {
    const errorMessage = 'Network Error';
    axios.post = jest.fn().mockRejectedValue(new Error(errorMessage));
    await store.dispatch('searchMovies');
    console.log('message test', store.state.message);
    expect(store.state.message).toBe(errorMessage);
  })

  test('영화 아이템이 중복인 경우 고유하게 처리합니다.', async () => {
    const res = { 
      data: {
        totalResults: '',
        Search: [
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'Hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    };
    axios.post = jest.fn().mockResolvedValue(res);
    await store.dispatch('searchMovies');

    expect(store.state.movies.length).toBe(1);
  })

  test('단일 영화 상세 정보만 불러온 경우 데이터를 확인합니다.', async () => {
    const res = {
      data: {
        imdbID: '1',
        Title: 'Frozen',
        Poster: 'Frozen.jpg',
        Year: '2021'
      }
    }

    axios.post = jest.fn().mockResolvedValue(res);
    await store.dispatch('searchMovieWithId');
    // themMovie {}이므로 toEqual()이용함
    expect(store.state.theMovie).toEqual(res.data);
  })

})