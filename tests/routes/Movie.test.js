import { shallowMount } from '@vue/test-utils'
import Movie from '~/routes/Movie.vue'
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'

// 여러 test를 하나의 그룹으로 묶어주는 단위
describe('components/Movie.vue', () => {
  let wrapper;

  // 반복되는 로직 처리
  beforeEach(async () => {
    window.scrollTo = jest.fn();  // 페이지 이동 전 모의 함수 생성
    router.push('/movie/tt1234567');
    await router.isReady();   // 페이지 준비되면 Movie Component 연결
    wrapper = shallowMount(Movie, {
      global: {  // 전역환경에서 플러그인이 동작하는 함수 등록함 
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    });
  })

  test('최초 접속한 URL의 파라미터를 확인합니다..', () => {
   // console.log("params id", wrapper.vm.$route.params.id);  
    expect(wrapper.vm.$route.params.id).toBe('tt1234567');
  })

  test('지정한 이미지 크기로 URL 변경합니다.', () => {
    const url = 'https://google.com/sample_image_SX300.jpg';
    expect(wrapper.vm.requestDiffSizeImage(url)).toContain('SX700'); // 해당 문자가 포함되어 있는지 확인 
    expect(wrapper.vm.requestDiffSizeImage(url, 900)).toContain('SX900');
  })


  test('정상적인 이미지 주소 아닌 경우 공백 문자를 반환합니다', () => {
    expect(wrapper.vm.requestDiffSizeImage()).toBe('');
    expect(wrapper.vm.requestDiffSizeImage('N/A')).toBe('');

  })
})