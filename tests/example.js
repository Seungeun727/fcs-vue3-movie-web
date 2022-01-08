import axios from "axios"
import _upperFirst from 'lodash/upperFirst'
import _toLower from 'lodash/toLower'

// 네트워크 오류 등 외부요인에 의해 테스트가 실패할 수 있다.
export async function fetchMovieTitle() {
  const res = await axios.get('https://omdbapi.com?apikey=7035c60c&i=tt4520988')
  return _upperFirst(_toLower(res.data.Title))  // Frozen II => Frozen ii
}