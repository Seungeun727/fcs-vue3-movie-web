import { fetchMovieTitle } from './example'
import axios from 'axios'

// 모의 함수
// 1. 테스트 외부 요인 제거 => 신뢰도 높임, 빠른 속도
// 2. axios.get을 모의함수로 설정하여 원하는 데이터 반환하여 출력한다.

describe('비동기 테스트', () => {
  test('영화 제목 변환', async () => {
    // 모의 함수
    axios.get = jest.fn(() => {
      return new Promise(resolve => {  
        resolve({  // 임의로 정한 데이터 반환
          data: {
            Title: 'Frozen II'
          }
        })
      }) 
    })
    const title = await fetchMovieTitle()
    expect(title).toBe('Frozen ii')
  })
})