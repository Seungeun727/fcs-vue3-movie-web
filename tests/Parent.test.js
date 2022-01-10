import { shallowMount } from '@vue/test-utils'
import Parent from './Parent'

test('TEST', () => {
  const wrapper = shallowMount(Parent);
  expect(wrapper.html()).toBe('');
})