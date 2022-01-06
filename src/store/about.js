export default {
  namespaced: true,
  // state 함수로 쓰는 이유?
  // 객체 데이터 즉 참조형 데이터로 '데이터 불변성' 유지해야 한다.
  state: () => ({
    name: 'NoSeungEun',
    email: 'seun2230@gmail.com',
    blog: 'https://heropy.blog',
    phone: '+82-10-1234-5678',
    image: 'https://cdn.pixabay.com/photo/2018/04/05/23/30/sky-3294543_960_720.jpg'
  })
}