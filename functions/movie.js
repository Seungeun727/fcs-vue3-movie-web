// Node.js 환경에서 동작하는 js는 require와 exports로 관리해야 함.
const axios = require('axios');
const { OMDB_API_KEY } = process.env;

exports.handler = async function(event) {
  console.log("event", event);
  console.log("event only body", event.body); // 객체 데이터
  const payload = JSON.parse(event.body);  
  console.log("payload", payload); 
  const { title, type, year, page, id } = payload;
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  try {
    const { data } = await axios.get(url)
    if(data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)  // data는 객체 데이터로 문자 데이터로 반환한다.
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}