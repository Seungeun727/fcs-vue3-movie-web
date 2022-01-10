import { shallowMount } from '@vue/test-utils'
import router from '~/routes'
import store from '~/store'
import Header from '~/components/Header'


// 단위 테스트에서 얕게, 하위 컴포넌트를 렌더링 하지 않는 방식을 권장함
describe('components/Header.vue', () => {
  let wrapper
  beforeEach(async () => {
    window.scrollTo = jest.fn();
    router.push('/movie/tt1234567')
    await router.isReady();
    wrapper = shallowMount(Header, {
      global: {  // 전역환경에서 플러그인이 동작하는 함수 등록함 
        plugins: [
          router,
          store
        ]
      }
    })
  })
  test('경로 정규표현식이 없는 경우 일치하지 않습니다', () => {
    const regExp = undefined; 
    // vm = this키워드와 같음
    expect(wrapper.vm.isMatch(regExp)).toBe(false); 
  })

  test('경로 정규표현식과 일치해야 합니다', () => {
    const regExp = /^\/movie/;
    expect(wrapper.vm.isMatch(regExp)).toBe(true);
  })

  test('경로 정규표현식과 일치하지 않아야 합니다', () => {
    const regExp = /^\/heropy/;
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  })
})