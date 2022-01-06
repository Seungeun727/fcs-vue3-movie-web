exports.handler = async function (event, context) {
  return {
    statusCode: 200,  // 정상적인 응답 
    body: JSON.stringify({
      name: 'NoSeungEun',
      age: '2',
      email: 'seun2230@gmail.com'
    })
  }   
}