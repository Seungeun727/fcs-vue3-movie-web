import  { mount } from '@vue/test-utils'
import Test from './Test'

test('메시지를 변경합니다.', async () => {
  // mount(컴포넌트, 옵션)
  // 옵션 생략 가능함
  const wrapper = mount(Test)
  // wrapper.vm === this;
  expect(wrapper.vm.msg).toBe('Hello Vue test utils!')
  // wrapper.vm.msg = 'Hello HEROPY!'
  await wrapper.setData({
    msg: 'Hello HEROPY!'
  })
  expect(wrapper.vm.msg).toBe('Hello HEROPY!')
  expect(wrapper.find('div').text()).toBe('Hello HEROPY!')
})