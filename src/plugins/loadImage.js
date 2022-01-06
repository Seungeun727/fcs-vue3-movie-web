export default {
  install(app) {
    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          // 이미지가 완료되었을 때 resolve 실행
          resolve()
        })
      })
    }
  }
}